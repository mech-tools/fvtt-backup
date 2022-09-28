const MODULE_NAME = "one-journal"; // TODO: Better handling
var settings;
(function (settings) {
    settings["OPEN_BUTTON_IN_DIRECTORY"] = "openButtonInSidebarDirectory";
    settings["USE_ONE_JOURNAL"] = "useOneJournal";
    settings["SIDEBAR_MODE"] = "sideBarMode";
    settings["GM_ONLY"] = "gmOnly";
    settings["SYNC_SIDEBAR"] = "sidebarSync";
    settings["FOLDER_SELECTOR"] = "folderSelector";
    settings["NO_DUPLICATE_HISTORY"] = "noDuplicateHistory";
    settings["SIDEBAR_FOLDER_COLOR"] = "sideBarFolderColor";
    settings["SIDEBAR_DISABLE_PLAYER"] = "sideBarDisablePlayer";
    settings["SIDEBAR_COLLAPSED"] = "sideBarCollapsed";
    settings["USE_BROWSER_HISTORY"] = "useBrowserHistory";
    settings["DBL_CLICK_EDIT"] = "dblClickEdit";
    settings["SIDEBAR_WIDTH"] = "sidebarWidth";
    settings["SIDEBAR_COMPACT"] = "sidebarCompact";
})(settings || (settings = {}));
const moduleSettings = [
    {
        setting: settings.USE_ONE_JOURNAL,
        name: "ONEJOURNAL.SettingsUseOneJournal",
        hint: "ONEJOURNAL.SettingsUseOneJournalHint",
        type: Boolean,
        default: true,
    },
    {
        setting: settings.OPEN_BUTTON_IN_DIRECTORY,
        name: "ONEJOURNAL.SettingsOpenButtonInSidebarDirectory",
        hint: "ONEJOURNAL.SettingsOpenButtonInSidebarDirectoryHint",
        type: Boolean,
        default: false,
    },
    {
        setting: settings.SIDEBAR_MODE,
        name: "ONEJOURNAL.SettingsSidebarMode",
        hint: "ONEJOURNAL.SettingsSidebarModeHint",
        type: String,
        choices: {
            right: "ONEJOURNAL.SettingsSidebarModeRight",
            left: "ONEJOURNAL.SettingsSidebarModeLeft",
        },
        default: "right",
    },
    {
        setting: settings.SIDEBAR_COLLAPSED,
        name: "Sidebar is collapsed",
        hint: "This option should not show up in the settings window",
        type: Boolean,
        default: false,
        config: false, // Doesn't show up in config
    },
    {
        setting: settings.SIDEBAR_FOLDER_COLOR,
        name: "ONEJOURNAL.SettingsSidebarFolderColor",
        hint: "ONEJOURNAL.SettingsSidebarFolderColorHint",
        type: Boolean,
        default: false,
    },
    {
        setting: settings.SYNC_SIDEBAR,
        name: "ONEJOURNAL.SettingsSidebarSync",
        hint: "ONEJOURNAL.SettingsSidebarSyncHint",
        type: Boolean,
        default: true,
    },
    {
        setting: settings.SIDEBAR_WIDTH,
        name: "ONEJOURNAL.SettingsSidebarWidth",
        hint: "ONEJOURNAL.SettingsSidebarWidthHint",
        type: Number,
        choices: {
            150: "ONEJOURNAL.SettingsSidebarWidthTiny",
            230: "ONEJOURNAL.SettingsSidebarWidthSmall",
            275: "ONEJOURNAL.SettingsSidebarWidthReduced",
            300: "ONEJOURNAL.SettingsSidebarWidthNormal",
            336: "ONEJOURNAL.SettingsSidebarWidthWide",
        },
        default: 300,
    },
    {
        setting: settings.SIDEBAR_COMPACT,
        name: "ONEJOURNAL.SettingsSidebarCompact",
        hint: "ONEJOURNAL.SettingsSidebarCompactHint",
        type: Boolean,
        default: false,
    },
    {
        setting: settings.FOLDER_SELECTOR,
        name: "ONEJOURNAL.SettingsFolderSelector",
        hint: "ONEJOURNAL.SettingsFolderSelectorHint",
        type: Boolean,
        default: false,
    },
    {
        setting: settings.DBL_CLICK_EDIT,
        name: "ONEJOURNAL.SettingsDblClickEdit",
        hint: "ONEJOURNAL.SettingsDblClickEditHint",
        type: Boolean,
        default: true,
    },
    {
        setting: settings.NO_DUPLICATE_HISTORY,
        name: "ONEJOURNAL.SettingsNoDuplicateHistory",
        hint: "ONEJOURNAL.SettingsNoDuplicateHistoryHint",
        type: Boolean,
        default: false,
    },
    {
        setting: settings.USE_BROWSER_HISTORY,
        name: "ONEJOURNAL.SettingsUseBrowserHistoryExperimental",
        hint: "ONEJOURNAL.SettingsUseBrowserHistoryHint",
        type: Boolean,
        default: false,
    },
    {
        setting: settings.SIDEBAR_DISABLE_PLAYER,
        name: "ONEJOURNAL.SettingsSidebarDisablePlayer",
        hint: "ONEJOURNAL.SettingsSidebarDisablePlayerHint",
        type: Boolean,
        default: false,
        scope: "world",
    },
    {
        setting: settings.GM_ONLY,
        name: "ONEJOURNAL.SettingsGMOnly",
        hint: "ONEJOURNAL.SettingsGMOnlyHint",
        type: Boolean,
        default: false,
        scope: "world",
    },
];
function registerSetting(callbacks, { setting, ...options }) {
    game.settings.register(MODULE_NAME, setting, {
        config: true,
        scope: "client",
        ...options,
        onChange: callbacks[setting],
    });
}
function registerSettings(callbacks = {}) {
    moduleSettings.forEach((item) => {
        registerSetting(callbacks, item);
    });
}
function getSetting(setting) {
    return game.settings.get(MODULE_NAME, setting);
}
function setSetting(setting, value) {
    return game.settings.set(MODULE_NAME, setting, value);
}

const i18n = (name) => game.i18n.localize(`ONEJOURNAL.${name}`);

class JournalShell extends Application {
    constructor() {
        super({
            id: "OneJournalShell",
            template: "modules/one-journal/templates/shell.html",
            title: "OneJournal",
            classes: [`oj-${game.system.id}`],
            popOut: true,
            resizable: true,
            width: 850,
            height: 600,
        });
        this.attachedId = -1;
        this.history = [];
        this.historyFwd = [];
        this.historySeq = 0;
        this.detachedJournals = new Set();
        this.swappingJournals = new Set();
        window.onhashchange = () => {
            if (getSetting(settings.USE_BROWSER_HISTORY) !== true)
                return;
            const hash = window.location.hash;
            const i = this.history.findIndex((item) => item.hash === hash);
            if (i !== -1) {
                this.goToHistoryByIndex(i);
            }
            else {
                const i = this.historyFwd.findIndex((item) => item.hash === hash);
                if (i === -1)
                    return;
                this.goToHistoryFwdByIndex(i);
            }
        };
        this.directory = new OneJournalDirectory(this);
    }
    get document() {
        return this.element.get(0).ownerDocument;
    }
    get state() {
        return this._state;
    }
    open(attachApp) {
        if (attachApp && this.detachedJournals.has(attachApp.entity.uuid)) {
            return;
        }
        this.render(true, { attachApp });
    }
    render(force, options = {}) {
        const { attachApp, ...rest } = options;
        if (this._state <= 0) {
            Hooks.once("render" + this.constructor.name, () => {
                Hooks.once("render" + this.directory.constructor.name, () => {
                    return this.onRenderComplete(attachApp);
                });
            });
            return super.render(force, rest);
        }
        else {
            if (attachApp) {
                this.attach(attachApp);
            }
        }
        return this;
    }
    toggleSidebar() {
        this.element.toggleClass("sidebar-mode-none");
        setSetting(settings.SIDEBAR_COLLAPSED, !getSetting(settings.SIDEBAR_COLLAPSED));
    }
    async onRenderComplete(attachApp) {
        if (attachApp) {
            this.attach(attachApp);
        }
        const sidebarDisabled = !game.user.isGM && getSetting(settings.SIDEBAR_DISABLE_PLAYER);
        if (sidebarDisabled) {
            this.element.find(".one-journal-shell > .sidebar-toggle").remove();
            this.element.addClass("sidebar-disabled");
        }
        else {
            this.element
                .find(".one-journal-shell > .sidebar-toggle")
                .click(() => this.toggleSidebar());
        }
        if (getSetting(settings.SIDEBAR_COLLAPSED) === true || sidebarDisabled) {
            this.element.addClass("sidebar-mode-none");
        }
    }
    async close() {
        const attachedClose = ui.windows[this.attachedId]?.close();
        this.restoreMaximized();
        await Promise.all([
            attachedClose,
            this.directory.close({ force: true }),
            super.close(),
        ]);
    }
    async minimize() {
        this.restoreMaximized();
        return super.minimize();
    }
    activateListeners(html) {
        const header = this.element.children(".window-header");
        const close = header.find(".close");
        close.attr("title", i18n("ApplicationExitTitle"));
        close.contents().last().replaceWith(i18n("ApplicationExit"));
        header.children().wrapAll(`<div class="one-journal-header" />`);
        this.directory.render(true);
        this.element
            .find(".history-navigation .forward")
            .click(() => this.forward());
        this.element
            .find(".history-navigation .backward")
            .click(() => this.backward());
        this.changeSidebarMode(getSetting(settings.SIDEBAR_MODE));
        this.setSidebarWidth(getSetting(settings.SIDEBAR_WIDTH));
        this._historyContextMenu(html);
    }
    attach(app) {
        if (app.appId == this.attachedId ||
            this.detachedJournals.has(app.entity.uuid)) {
            return;
        }
        if (this.attachedId != -1) {
            ui.windows[this.attachedId]?.close();
        }
        this.attachedId = app.appId;
        this.attachedUid = app.entity.uuid;
        this.element.addClass("journal-attached");
        if (getSetting(settings.FOLDER_SELECTOR) === true) {
            this.element.addClass("show-folder-select");
        }
        app.element.addClass("one-journal-attached");
        // Check if element is open in another window (PopOut!)
        if (this.document != document) {
            this.document.adoptNode(app.element.get(0));
        }
        this.element.find(".shell-content").append(app.element);
        const headerContents = app.element
            .find(".window-header > *")
            .detach();
        if (headerContents.length > 0) {
            const header = this.element.children(".window-header");
            header.children(":not(.one-journal-header)").remove();
            header.prepend(headerContents);
            header
                .children(".header-button")
                .removeClass("header-button")
                .addClass("journal-header-button")
                .on("click", (e) => {
                //@ts-ignore
                const buttons = app._getHeaderButtons();
                e.preventDefault();
                const button = buttons.find((b) => e.currentTarget.classList.contains(b.class));
                button.onclick(e);
            });
        }
        this.directory.selected(this.attachedUid);
        this.navigated(app);
        // @ts-ignore
        if (app._minimized) {
            app.maximize();
            this.minimize();
        }
    }
    detach(app) {
        if (!this.swappingJournals.delete(app.entity.uuid)) {
            if (this.detachedJournals.delete(app.entity.uuid)) {
                this.directory.render(true);
            }
        }
        if (this.attachedId === app.appId) {
            this.element.removeClass("journal-attached");
            this.element
                .children(".window-header")
                .children(":not(.one-journal-header)")
                .remove();
            app.close();
            this.attachedId = -1;
            this.directory.deselected();
        }
    }
    async openDetached(uuid) {
        if (this.attachedUid === uuid) {
            ui.windows[this.attachedId]?.close();
            await new Promise((r) => setTimeout(r, 300));
            this.detachedJournals.add(uuid);
        }
        else {
            this.detachedJournals.add(uuid);
        }
        this.directory.render(true);
        const e = (await fromUuid(uuid));
        e.sheet.render(true);
    }
    fullScreen() {
        if (this.element.hasClass("maximized")) {
            this.element.removeClass("maximized");
            this.element.find(".maximize-toggle").contents().last()[0].textContent =
                i18n("ApplicationMaximize");
            this.element
                .find(".maximize-toggle i")
                .removeClass("fa-compress-arrows-alt")
                .addClass("fa-expand-arrows-alt");
            $(document.body).removeClass("one-journal-sub-mode");
        }
        else {
            this.element.addClass("maximized");
            this.element.find(".maximize-toggle").contents().last()[0].textContent =
                i18n("ApplicationRestore");
            this.element
                .find(".maximize-toggle i")
                .removeClass("fa-expand-arrows-alt")
                .addClass("fa-compress-arrows-alt");
        }
    }
    restoreMaximized() {
        if (this.element.hasClass("maximized")) {
            this.fullScreen();
        }
    }
    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        buttons.unshift({
            label: i18n("ApplicationMaximize"),
            class: "maximize-toggle",
            icon: "fas fa-expand-arrows-alt",
            onclick: async () => {
                this.fullScreen();
            },
        });
        return buttons;
    }
    pushWindowHistory(item) {
        if (getSetting(settings.USE_BROWSER_HISTORY) !== true)
            return;
        window.location.hash = item.hash;
    }
    // History
    navigated(app) {
        const navigatedTo = app.entity.uuid;
        if (this.history.length !== 0) {
            if (this.history[this.history.length - 1].id === navigatedTo) {
                // Already last in history
                return;
            }
            else {
                // Reset forward stack
                this.historyFwd.length = 0;
            }
        }
        if (getSetting(settings.NO_DUPLICATE_HISTORY) !== true &&
            getSetting(settings.USE_BROWSER_HISTORY) !== true) {
            this.history = this.history.filter((h) => h.id !== navigatedTo);
        }
        this.history.push({
            id: navigatedTo,
            title: app.title,
            hash: `#OJ${this.historySeq++}`,
        });
        this.pushWindowHistory(this.history[this.history.length - 1]);
        this.updatedHistory();
    }
    async backward() {
        if (getSetting(settings.USE_BROWSER_HISTORY) === true) {
            if (this.history.length > 1)
                window.history.back();
            return;
        }
        if (this.history.length <= 1) {
            this.updatedHistory();
            return;
        }
        if (this.attachedId !== -1) {
            this.historyFwd.push(this.history.pop());
        }
        const entity = (await fromUuid(this.history[this.history.length - 1].id));
        if (entity === null) {
            // Remove and retry
            this.history.pop();
            await this.backward();
        }
        else {
            entity.sheet.render(true);
            this.updatedHistory();
        }
    }
    async forward() {
        if (getSetting(settings.USE_BROWSER_HISTORY) === true) {
            if (this.historyFwd.length != 0)
                window.history.forward();
            return;
        }
        if (this.historyFwd.length == 0) {
            this.updatedHistory();
            return;
        }
        this.history.push(this.historyFwd.pop());
        const entity = (await fromUuid(this.history[this.history.length - 1].id));
        if (entity === null) {
            // Remove and retry
            this.history.pop();
            this.forward();
        }
        else {
            entity.sheet.render(true);
            this.updatedHistory();
        }
    }
    async goToHistoryByIndex(index) {
        const entity = (await fromUuid(this.history[index].id));
        while (this.history.length > index + 1) {
            this.historyFwd.push(this.history.pop());
        }
        entity.sheet.render(true);
        this.updatedHistory();
    }
    async goToHistoryFwdByIndex(index) {
        const entity = (await fromUuid(this.historyFwd[index].id));
        while (this.historyFwd.length > index) {
            this.history.push(this.historyFwd.pop());
        }
        entity.sheet.render(true);
        this.updatedHistory();
    }
    clearHistory() {
        this.history.length = 0;
        this.historyFwd.length = 0;
        this.updatedHistory();
    }
    updatedHistory() {
        const historyItems = this.history.map((item, idx) => {
            return {
                name: item.title,
                icon: `<i class="fas fa-arrow-left"></i>`,
                callback: () => {
                    if (getSetting(settings.USE_BROWSER_HISTORY) === true) {
                        for (let i = 0; i < this.history.length - 1 - idx; i++) {
                            window.history.back();
                        }
                        return;
                    }
                    this.goToHistoryByIndex(idx);
                },
            };
        });
        const historyFwdItems = this.historyFwd.map((item, idx) => {
            return {
                name: item.title,
                icon: `<i class="fas fa-arrow-right"></i>`,
                callback: () => {
                    if (getSetting(settings.USE_BROWSER_HISTORY) === true) {
                        for (let i = 0; i < this.historyFwd.length - idx; i++) {
                            window.history.forward();
                        }
                        return;
                    }
                    this.goToHistoryFwdByIndex(idx);
                },
            };
        });
        if (historyItems.length > 0) {
            historyItems[historyItems.length - 1].icon = `<i class="fas fa-circle"></i>`;
        }
        this.contextMenu.menuItems = [
            ...historyItems,
            ...historyFwdItems.reverse(),
        ].reverse();
        if (getSetting(settings.USE_BROWSER_HISTORY) !== true) {
            this.contextMenu.menuItems.unshift({
                name: i18n("HistoryClearHistory"),
                icon: '<i class="fas fa-trash"></i>',
                callback: () => {
                    this.clearHistory();
                },
            });
        }
        else {
            this.contextMenu.menuItems.unshift({
                name: i18n("HistoryUsingBrowserHistory"),
                icon: "",
                callback: () => {
                    return;
                },
            });
        }
        if (this.history.length > 1) {
            this.element.find(".history-navigation .backward").addClass("active");
        }
        else {
            this.element.find(".history-navigation .backward").removeClass("active");
        }
        if (this.historyFwd.length !== 0) {
            this.element.find(".history-navigation .forward").addClass("active");
        }
        else {
            this.element.find(".history-navigation .forward").removeClass("active");
        }
    }
    changeSidebarMode(mode) {
        if (mode === "left") {
            this.element.addClass("sidebar-mode-left");
        }
        else {
            this.element.removeClass("sidebar-mode-left");
        }
    }
    setSidebarWidth(width) {
        document.documentElement.style.setProperty("--ojSidebarWidth", `${width}px`);
    }
    _historyContextMenu(html) {
        this.contextMenu = new ContextMenu(html, ".history-navigation", [
            {
                name: i18n("HistoryClearHistory"),
                icon: '<i class="fas fa-trash"></i>',
                callback: () => {
                    this.clearHistory();
                },
            },
        ]);
    }
}
class OneJournalDirectory extends JournalDirectory {
    constructor(shell, options) {
        super(options);
        this.shell = shell;
        // Record the directory as an application of the collection
        OneJournalDirectory.collection.apps.push(this);
    }
    get element() {
        return super.element;
    }
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = "OneJournalDirectory";
        options.template = "templates/sidebar/journal-directory.html";
        options.popOut = true;
        return options;
    }
    static get collection() {
        return game.journal;
    }
    render(force, options) {
        if (this.shell.state <= 0) {
            return;
        }
        return super.render(force, options);
    }
    close({ force }) {
        if (force) {
            return Application.prototype.close.call(this);
        }
        // Close the entire shell if someone tries to close directory
        return this.shell.close();
    }
    selected(uuid) {
        const [, id] = uuid.split(".");
        this.element.find("li.selected").removeClass("selected");
        const selected = this.element.find(`li[data-entity-id="${id}"]`);
        selected.addClass("selected");
        if (getSetting(settings.SYNC_SIDEBAR) === false) {
            return;
        }
        this.expandFolderTree(selected);
        selected.get(0).scrollIntoView({ block: "nearest" });
    }
    deselected() {
        this.element.find("li.selected").removeClass("selected");
    }
    expandFolderTree(target) {
        target.parents(".folder").removeClass("collapsed");
    }
    expand(id, expanded) {
        const li = this.element.find(`li[data-folder-id="${id}"]`);
        if (expanded) {
            li.removeClass("collapsed");
        }
        else {
            li.addClass("collapsed");
            li.find(".folder").addClass("collapsed");
        }
        const expandedFolders = this.element.find(".directory-list > .folder:not(.collapsed)");
        if (expandedFolders.length === 0) {
            this.element.removeClass("has-expanded-journals");
        }
        else {
            this.element.addClass("has-expanded-journals");
        }
    }
    activateListeners(html) {
        super.activateListeners(html);
        this.shell.element.find(".shell-sidebar").append(this.element);
        if (this.shell.attachedId !== -1 && this.shell.attachedUid) {
            this.selected(this.shell.attachedUid);
        }
        let toggleSibling = this.element.find(".header-actions .create-folder");
        if (toggleSibling.length === 0) {
            toggleSibling = this.element.find(".header-search .collapse-all");
        }
        toggleSibling.after(`<div class="sidebar-toggle" title="${i18n("SidebarCollapse")}"><i class="far fa-window-maximize"></i></div>`);
        this.element.find(".sidebar-toggle").click(() => {
            this.shell.toggleSidebar();
        });
        if (getSetting(settings.SIDEBAR_FOLDER_COLOR) === true) {
            this.element.find("header.folder-header").each((i, el) => {
                if (el.style.backgroundColor) {
                    el.nextElementSibling.style.borderColor =
                        el.style.backgroundColor;
                }
            });
        }
        this.setSidebarCompact(getSetting(settings.SIDEBAR_COMPACT));
        this.element.find(".entity-name .fa-external-link-alt").remove();
        this.shell.detachedJournals.forEach((uuid) => {
            const [, id] = uuid.split(".");
            this.element
                .find(`[data-entity-id="${id}"]`)
                .addClass("journal-detached")
                .find(`h4`)
                .attr("title", i18n("JournalEntryDetached"))
                .append(`<i class="fas fa-external-link-alt"></i>`);
        });
    }
    setSidebarCompact(on) {
        if (on) {
            this.element.addClass("compact");
        }
        else {
            this.element.removeClass("compact");
        }
    }
    _getEntryContextOptions() {
        const options = super._getEntryContextOptions();
        return options.concat([
            {
                name: "ONEJOURNAL.OptionOpenDetached",
                icon: `<i class="fas fa-external-link-alt"></i>`,
                callback: (li) => {
                    const entry = game.journal.get(li.data("entity-id"));
                    this.shell.openDetached(entry.uuid);
                },
            },
        ]);
    }
}

class OneJournal {
    // Listen to changes of mode swapping to support detached windows
    hookSwapMode() {
        //@ts-ignore
        const oldOnSwapMode = JournalSheet.prototype._onSwapMode;
        //@ts-ignore
        JournalSheet.prototype._onSwapMode = function (event, mode) {
            if ((mode === "image" && this._sheetMode === "text") ||
                (mode === "text" && this._sheetMode === "image")) {
                window.oneJournal?.shell.swappingJournals.add(this.entity.uuid);
            }
            return oldOnSwapMode.call(this, event, mode);
        };
    }
    onRenderJournalShell(app, html) {
        this._onJournalAdded(app);
        if (getSetting(settings.DBL_CLICK_EDIT) === true) {
            html.find(".editor").dblclick((evt) => {
                if (evt.target.closest(".editor-content")) {
                    $(app.element).find(".editor-edit").click();
                }
            });
        }
    }
    init() {
        this.shell = new JournalShell();
        this.hookSwapMode();
        Hooks.on("closeJournalSheet", (app) => {
            this._onJournalRemoved(app);
        });
    }
    _onJournalAdded(sheet) {
        if (getSetting(settings.USE_ONE_JOURNAL) === false) {
            return;
        }
        this.shell.open(sheet);
    }
    _onJournalRemoved(app) {
        this.shell.detach(app);
    }
    toggleOpenButton(show) {
        if (show) {
            window.oneJournal.openButton.css("display", "block");
        }
        else {
            window.oneJournal.openButton.css("display", "none");
        }
    }
    userPermitted() {
        return !(getSetting(settings.GM_ONLY) === true && !game.user.isGM);
    }
}
Hooks.on("renderJournalSheet", (app, html) => {
    if (!app.popOut) {
        // GM Screen Renders journalSheets without popOut
        return;
    }
    window.oneJournal?.onRenderJournalShell(app, html);
});
Hooks.once("init", async function () {
    registerSettings({
        [settings.SIDEBAR_MODE]: (val) => {
            window.oneJournal.shell.changeSidebarMode(val);
        },
        [settings.OPEN_BUTTON_IN_DIRECTORY]: (val) => {
            window.oneJournal.toggleOpenButton(val);
        },
        [settings.SIDEBAR_WIDTH]: (val) => {
            window.oneJournal?.shell?.setSidebarWidth(val);
        },
        [settings.SIDEBAR_COMPACT]: (val) => {
            window.oneJournal?.shell?.directory?.setSidebarCompact(val);
        },
        [settings.FOLDER_SELECTOR]: (val) => {
            if (val) {
                window.oneJournal?.shell?.element?.addClass("show-folder-select");
            }
            else {
                window.oneJournal?.shell?.element?.removeClass("show-folder-select");
            }
        },
    });
    CONFIG.TinyMCE.css?.push("/modules/one-journal/editor.css");
    if (typeof CONFIG.TinyMCE.content_css === "object") {
        CONFIG.TinyMCE.content_css?.push("/modules/one-journal/editor.css");
    }
    window.oneJournal = window.oneJournal || new OneJournal();
    // Button in sidebar directory
    Hooks.on("renderJournalDirectory", (app, html) => {
        if (!window.oneJournal.userPermitted() ||
            html.closest("#OneJournalDirectory").length != 0) {
            return;
        }
        window.oneJournal.openButton = $(`<button class="one-journal-open">${i18n("OpenButton")}</button>`);
        window.oneJournal.openButton.click(() => {
            window.oneJournal.shell.render(true);
        });
        html.find(".directory-footer").append(window.oneJournal.openButton);
        window.oneJournal.toggleOpenButton(getSetting(settings.OPEN_BUTTON_IN_DIRECTORY));
    });
    // Patch links for opening detached
    {
        // Entity links in enriched html
        //@ts-ignore
        const oldOnClickEntityLink = TextEditor._onClickEntityLink;
        const onClickEntityLink = async function (event) {
            const a = event.currentTarget;
            if (!event.shiftKey) {
                oldOnClickEntityLink(event);
                return;
            }
            let uuid = "";
            if (a.dataset.pack &&
                game.packs.get(a.dataset.pack)?.entity === "JournalEntry") {
                uuid = `Compendium.${a.dataset.pack}.${a.dataset.id}`;
            }
            else if (a.dataset.entity === "JournalEntry") {
                uuid = `${a.dataset.entity}.${a.dataset.id}`;
            }
            else {
                oldOnClickEntityLink(event);
                return;
            }
            event.preventDefault();
            window.oneJournal.shell.openDetached(uuid);
        };
        //@ts-ignore
        TextEditor._onClickEntityLink = onClickEntityLink;
        // Journal sidebar link handler
        //@ts-ignore
        JournalDirectory._onClickEntityName;
        const onClickEntityName = function (event) {
            event.preventDefault();
            const element = event.currentTarget;
            const entityId = element.parentElement.dataset.entityId;
            const entity = game.journal.get(entityId);
            if (event.shiftKey) {
                window.oneJournal.shell.openDetached(entity.uuid);
                return;
            }
            const sheet = entity.sheet;
            // @ts-ignore
            if (sheet._minimized)
                return sheet.maximize();
            else
                return sheet.render(true);
        };
        //@ts-ignore
        JournalDirectory.prototype._onClickEntityName = onClickEntityName;
    }
});
Hooks.once("ready", function () {
    console.log("One Journal | Initializing One Journal");
    if (!window.oneJournal.userPermitted()) {
        window.oneJournal.openButton?.css("display", "none");
        console.log("One Journal | disabled for user");
        return;
    }
    window.oneJournal.init();
    if (game.modules.get("popout")) {
        popOutHacks();
    }
});
// Hacks for popout module
function popOutHacks() {
    // Opening journals from inside the popout should not act as a dialog
    Object.defineProperty(JournalSheet.prototype, "options", {
        get: function () {
            const detaching = window.oneJournal?.shell.detachedJournals.has(this.entity?.uuid);
            this._options.popOutModuleDisable = !detaching;
            return this._options;
        },
        set: function (value) {
            this._options = value;
        },
    });
}
//# sourceMappingURL=one-journal.js.map
