import { MonksActiveTiles, log, error, setting, i18n, makeid } from '../monks-active-tiles.js';
import { ActionConfig } from "../apps/action-config.js";
import { TileHistory } from './tile-history.js';
import { TileVariables } from './tile-variables.js';

class ActiveTileContextMenu extends ContextMenu {
    constructor(...args) {
        super(...args);
    }

    _setPosition(html, target) {
        super._setPosition(html, target);

        let container = target.closest('.item-list');
        let y = container.position().top + target.position().top - 65; //(target.position().top - container.scrollTop());// - 55;// - $(html).height();

        html.removeClass("expand-down").css({ "top": `${y}px` }).insertAfter(target.closest('.action-items'));
    }
}

export const WithActiveTileConfig = (TileConfig) => {
    class ActiveTileConfig extends TileConfig {
        constructor(...args) {
            super(...args);

            if (getProperty(this.object, "flags.monks-active-tiles") == undefined) {
                this.object.flags = mergeObject(this.object.flags, {
                    'monks-active-tiles': {
                        active: true,
                        trigger: setting('default-trigger'),
                        vision: true,
                        chance: 100,
                        restriction: setting('default-restricted'),
                        controlled: setting('default-controlled'),
                        actions: []
                    }
                });
            }
        }

        static get defaultOptions() {
            let data = MonksActiveTiles.mergeArray(super.defaultOptions, {
                classes: ["monks-active-tiles"],
                scrollY: ["ol.item-list"],
                dragDrop: [
                    { dragSelector: ".items-list .item-list .item", dropSelector: ".items-list .item-list" },
                    { dragSelector: ".files-list .file-list .item", dropSelector: ".files-list .file-list" }
                ],
                tabs: [{ navSelector: '.tabs[data-group="triggers"]', contentSelector: '.tab[data-tab="triggers"]', initial: "trigger-setup" }]
            });
            data.tabs[0].navSelector = ".sheet-tabs:not(.trigger-tabs)";

            return data;
        }

        getData(options) {
            let data = super.getData(options);
            //data.usingAlpha = ["click", "dblclick", "rightclick"].includes(data.data.flags["monks-active-tiles"]?.trigger);

            data.triggerValues = this.object.getFlag("monks-active-tiles", "trigger");
            data.triggerValues = data.triggerValues instanceof Array ? data.triggerValues : [data.triggerValues];
            if (data.triggerValues.includes("both")) {
                data.triggerValues.push("enter", "exit");
                data.triggerValues.findSplice(t => t == "both");
            }
            if (data.triggerValues.includes("hover")) {
                data.triggerValues.push("hoverin", "hoverout");
                data.triggerValues.findSplice(t => t == "hover");
            }

            data.triggerNames = data.triggerValues.map(t => {
                return Object.keys(MonksActiveTiles.triggerModes).includes(t) ? { id: t, name: MonksActiveTiles.triggerModes[t] } : null;
            }).filter(t => !!t);

            data.triggers = Object.entries(MonksActiveTiles.triggerModes).map(([k, v]) => {
                return {
                    id: k,
                    name: v,
                    selected: data.triggerValues.includes(k)
                }
            });

            data.preventPaused = setting("prevent-when-paused");
            let fileindex = this.object.getFlag("monks-active-tiles", "fileindex");
            data.index = (fileindex != undefined ? fileindex + 1 : '');
            return data;
        }

        async close(options = {}) {
            let result = await super.close(options);

            if (this.actionconfig && this.actionconfig.rendered)
                this.actionconfig.close();

            return result;
        }

        get actions() {
            return this.object.getFlag("monks-active-tiles", "actions") || [];
        }

        get files() {
            return this.object.getFlag("monks-active-tiles", "files") || [];
        }

        async _renderInner(data) {
            let html = await super._renderInner(data);

            if ($('.sheet-tabs a[data-tab="triggers"]', html).length == 0)
                $('.sheet-tabs', html).append($('<a>').addClass('item').attr('data-tab', "triggers").html(`<i class="fas fa-running"></i> ${i18n("MonksActiveTiles.Triggers")}`));
            if ($('.sheet-tabs .tab[data-tab="triggers"]', html).length == 0) {
                let tab = $('<div>').addClass('tab').attr('data-tab', "triggers").css({ "position": "relative" }).insertAfter($('div[data-tab="animation"]', html));

                let template = "modules/monks-active-tiles/templates/tile-config.html";
                const tiledata = mergeObject({ 'data.flags.monks-active-tiles.minrequired': 0 }, data);

                tiledata.triggerModes = MonksActiveTiles.triggerModes;
                tiledata.triggerRestriction = { 'all': i18n("MonksActiveTiles.restrict.all"), 'player': i18n("MonksActiveTiles.restrict.player"), 'gm': i18n("MonksActiveTiles.restrict.gm") };
                tiledata.triggerControlled = { 'all': i18n("MonksActiveTiles.control.all"), 'player': i18n("MonksActiveTiles.control.player"), 'gm': i18n("MonksActiveTiles.control.gm") };

                tiledata.actions = await Promise.all((this.object.getFlag('monks-active-tiles', 'actions') || [])
                    .map(async (a) => {
                        if (a) {
                            let trigger = MonksActiveTiles.triggerActions[a.action];
                            let content = (trigger == undefined ? 'Unknown' : i18n(trigger.name));
                            if (trigger?.content) {
                                try {
                                    content = await trigger.content(trigger, a, this.actions);
                                } catch (e) {
                                    error(e);
                                }
                            }

                            let result = {
                                id: a.id,
                                action: a.action,
                                data: a.data,
                                content: content,
                                disabled: trigger?.visible === false
                            }

                            if (a.action == "activate" && a.data?.activate == "deactivate" && (a.data?.entity?.id == this.object.id || a.data?.entity == ""))
                                result.deactivated = "on";
                            if (a.action == "anchor")
                                result.deactivated = "off";

                            return result;
                        }
                    }).filter(a => !!a));

                if (setting("show-landing")) {
                    let landings = [];
                    let currentLanding = 0;
                    for (let a of tiledata.actions) {
                        if (a.action == "anchor") {
                            if (a.data.stop) {
                                landings = [];
                            }

                            landings.push(++currentLanding);
                            a.marker = currentLanding;
                            a.landingStop = a.data.stop;
                        }
                        a.landings = duplicate(landings);
                    }
                }

                let disabled = false;
                for (let a of tiledata.actions) {
                    if (a.deactivated == "off")
                        disabled = false;
                    if (disabled)
                        a.disabled = true;
                    if (a.deactivated == "on")
                        disabled = true;
                }

                tiledata.sounds = Object.entries(this.object.soundeffect || {}).filter(([k, v]) => !!v.src).map(([k, v]) => {
                    let filename = v.src.split('\\').pop().split('/').pop();
                    return {
                        id: k,
                        name: filename
                    };
                });

                let index = this.object.getFlag('monks-active-tiles', 'fileindex') || 0;
                tiledata.files = (this.object.getFlag('monks-active-tiles', 'files') || []).map((f, idx) => {
                    f.selected = (index == idx);
                    return f;
                });

                let renderhtml = await renderTemplate(template, tiledata);
                tab.append(renderhtml);
            }

            return html;
        }

        _onChangeTab(event, tabs, active) {
            if (active == "triggers") {
                this._tabs[1].activate(this._tabs[1].active);
            }
            super._onChangeTab.bind(this, event, tabs, active)();
        }

        _onDragStart(event) {
            let li = event.currentTarget.closest(".item");
            let list = event.currentTarget.closest(".items-list");
            if (list) {
                const dragData = {
                    type: this.object.constructor.documentName,
                    tileId: this.object.id,
                    collection: list.dataset.collection,
                    id: li.dataset.id
                };
                event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
                this._dragType = dragData.type;
            }
        }

        _canDragStart(selector) {
            return true;
        }

        async _onDrop(event) {
            const cls = this.constructor.documentName;

            // Try to extract the data
            let data;
            try {
                data = JSON.parse(event.dataTransfer.getData('text/plain'));
            }
            catch (err) {
                return false;
            }

            // Identify the drop target
            let target = event.target.closest(".item") || null;
            const list = event.target.closest(".items-list") || null;

            if (data.tileId != this.object.id) {
                if (data.collection == list.dataset.collection) {
                    let src = canvas.scene.tiles.get(data.tileId);
                    let action = getProperty(src, "flags.monks-active-tiles.actions")?.find(a => a.id == data.id);

                    if (action) {
                        let newAction = duplicate(action);
                        newAction.id = makeid();
                        let items = duplicate(this[list.dataset.collection]);
                        if (items.length && !target)
                            target = $(`li[data-id="${items[0].id}"]`, this.element).get(0);
                        let to = items.findIndex(a => a.id == target?.dataset.id) || 0;
                        items.splice(to, 0, newAction);
                        this.object.flags["monks-active-tiles"][list.dataset.collection] = items;

                        let element = $(`.action-items li[data-id="${data.id}"]`).clone();
                        if (target)
                            $(element).attr('data-id', newAction.id).insertBefore(target);
                        else
                            $('.item-list', list).append(element);
                        $('.action-edit', element).click(this._editAction.bind(this));
                        $('.action-delete', element).click(this._deleteAction.bind(this));
                        element[0].addEventListener("dragstart", this._onDragStart.bind(this));
                        this.setPosition({ height: 'auto' });
                    }
                }
            } else {
                // Call the drop handler
                if (target && target.dataset.id) {
                    let items = duplicate(this[list.dataset.collection]);

                    if (data.id === target.dataset.id) return; // Don't drop on yourself

                    let from = items.findIndex(a => a.id == data.id);
                    let to = items.findIndex(a => a.id == target.dataset.id);
                    log('from', from, 'to', to);
                    items.splice(to, 0, items.splice(from, 1)[0]);

                    this.object.flags["monks-active-tiles"][list.dataset.collection] = items;
                    if (from < to)
                        $('.item[data-id="' + data.id + '"]', this.element).insertAfter(target);
                    else
                        $('.item[data-id="' + data.id + '"]', this.element).insertBefore(target);
                }
            }
        }

        async _onActionHoverIn(event) {
            event.preventDefault();
            if (!canvas.ready) return;
            const li = event.currentTarget;

            let action = this.actions.find(a => a.id == li.dataset.id);
            if (action && action.data.entity && !['tile', 'token', 'players', 'within', 'controlled', 'previous'].includes(action.data.entity.id)) {
                let entity = await fromUuid(action.data.entity.id);
                if (entity && entity._object) {
                    entity._object._onHoverIn(event);
                    this._highlighted = entity;
                }
            }
        }

        _onActionHoverOut(event) {
            event.preventDefault();
            if (this._highlighted) this._highlighted._object._onHoverOut(event);
            this._highlighted = null;
        }

        _getSubmitData(updateData = {}) {
            let data = super._getSubmitData(updateData);
            data["flags.monks-active-tiles.actions"] = (this.object.getFlag("monks-active-tiles", "actions") || []);
            data["flags.monks-active-tiles.files"] = (this.object.getFlag("monks-active-tiles", "files") || []);

            if (data["flags.monks-active-tiles.fileindex"] != '')
                data["flags.monks-active-tiles.fileindex"] = data["flags.monks-active-tiles.fileindex"] - 1;

            if (typeof data["flags.monks-active-tiles.trigger"] == "string")
                data["flags.monks-active-tiles.trigger"] = data["flags.monks-active-tiles.trigger"].split(",");

            return data;
        }

        async _updateObject(event, formData) {
            this.object._images = await MonksActiveTiles.getTileFiles(this.object.flags["monks-active-tiles"].files || []);

            if (!this.object.id && this.object._images.length) {
                let fileindex = Math.clamped(this.object.flags["monks-active-tiles"].fileindex, 0, this.object._images.length - 1);
                if (this.object._images[fileindex] != this.object.texture.src) {
                    formData["texture.src"] = this.object._images[fileindex];
                }
                if (fileindex != this.object.flags["monks-active-tiles"].fileindex) {
                    formData["flags.monks-active-tiles.fileindex"] = fileindex;
                }
            }

            await super._updateObject(event, formData);

            if (this.object.id && this.object._images.length) {
                let fileindex = Math.clamped(this.object.flags["monks-active-tiles"].fileindex, 0, this.object._images.length - 1);
                if (this.object._images[fileindex] != this.object.texture.src) {
                    await this.object.update({ texture: { src: this.object._images[fileindex] } });
                }
                if (fileindex != this.object.flags["monks-active-tiles"].fileindex) {
                    await this.object.setFlag("monks-active-tiles", "fileindex", fileindex);
                }
            }
        }

        activateListeners(html) {
            super.activateListeners(html);
            var that = this;

            const contextOptions = this._getContextOptions();
            Hooks.call(`getActiveTileConfigContext`, html, contextOptions);
            new ActiveTileContextMenu($(html), ".action-items .item", contextOptions);

            $('.action-create', html).click(this._createAction.bind(this, -1));
            $('.action-edit', html).click(this._editAction.bind(this));
            $('.action-delete', html).click(this._deleteAction.bind(this));
            $('.action-stop', html).click(this._stopSound.bind(this));
            $('.view-history', html).click(function () {
                new TileHistory(that.object).render(true);
            });
            $('.view-variables', html).click(function () {
                new TileVariables(that.object).render(true);
            });

            $('.record-history', html).click(this.checkRecordHistory.bind(this));
            $('.per-token', html).click(this.checkPerToken.bind(this));

            /*
            $('select[name="flags.monks-active-tiles.trigger"]', html).change(function () {
                $('.usealpha', html).toggle(["click", "dblclick", "rightclick"].includes($(this).val()));
                that.setPosition();
            });
            */

            //$('div[data-tab="triggers"] .item-list li.item', html).hover(this._onActionHoverIn.bind(this), this._onActionHoverOut.bind(this));
            $('.browse-files', html).on("click", this.browseFiles.bind(this));
            $('.browse-folder', html).on("click", this.browseFolders.bind(this));
            $('.add-image', html).on("click", this._activateFilePicker.bind(this, "file"));
            $('.add-folder', html).on("click", this._activateFilePicker.bind(this, "folder"));
            $('.filepath', html).on("change", this.addToFileList.bind(this));
            $('.folderpath', html).on("change", this.addToFolderList.bind(this));
            $('.file-list .edit-file', html).on("click", this.browseFiles.bind(this));
            $('.file-list .delete-file', html).on("click", this.removeFile.bind(this));
            $('.file-list .item', html).on("dblclick", this.selectFile.bind(this));

            $('.multiple-dropdown-select', html).click((event) => {
                $('.multiple-dropdown-select .dropdown-list', this.element).toggleClass('open');
                event.preventDefault();
                event.stopPropagation();
            });
            $(html).click(() => { $('.multiple-dropdown-select .dropdown-list', this.element).removeClass('open'); });
            $('.multiple-dropdown-select .remove-option', html).on("click", this.removeTrigger.bind(this));
            $('.multiple-dropdown-select .multiple-dropdown-item', html).on("click", this.selectTrigger.bind(this));
        }

        selectTrigger(event) {
            event.preventDefault();
            event.stopPropagation();
            // if this item is already in the list, then remove it, otherwise add it

            let id = $(event.currentTarget).attr("value");
            let triggers = $('input[name="flags.monks-active-tiles.trigger"]', this.element).val().split(",");
            if (triggers.includes(id)) {
                // remove trigger
                triggers.findSplice(t => t === id);
                $(`.multiple-dropdown-item.selected[value="${id}"]`, this.element).removeClass("selected");
                $(`.multiple-dropdown-option[data-id="${id}"]`, this.element).remove();
            } else {
                // add trigger
                triggers.push(id);
                $(`.multiple-dropdown-item[value="${id}"]`, this.element).addClass("selected");
                $('.multiple-dropdown-content', this.element).append(
                    $("<div>").addClass("multiple-dropdown-option flexrow").attr("data-id", id)
                        .append($("<span>").html(MonksActiveTiles.triggerModes[id]))
                        .append($("<div>").addClass("remove-option").html("&times;").on("click", this.removeTrigger.bind(this)))
                );
            }
            $('input[name="flags.monks-active-tiles.trigger"]', this.element).val(triggers.join(","));
            $('.multiple-dropdown-select .dropdown-list', this.element).removeClass('open');
        }

        removeTrigger(event) {
            event.preventDefault();
            event.stopPropagation();
            // remove trigger from the list
            let li = event.currentTarget.closest(".multiple-dropdown-option");
            let id = li.dataset.id;
            let triggers = $('input[name="flags.monks-active-tiles.trigger"]', this.element).val().split(",");
            triggers.findSplice(t => t === id);
            $('input[name="flags.monks-active-tiles.trigger"]', this.element).val(triggers.join(","));
            li.remove();
            $(`.multiple-dropdown-item.selected[value="${id}"]`, this.element).removeClass("selected");
        }

        browseFiles(event) {
            event.preventDefault();
            $(event.currentTarget).next().click();
        }

        browseFolders(event) {
            event.preventDefault();
            $(event.currentTarget).next().click();
        }

        _activateFilePicker(type, event) {
            if (event == undefined) {
                event = type;
                type = null;
            }
            event?.preventDefault();
            const options = this._getFilePickerOptions(event);
            if (type == "folder")
                options.type = type
            options.wildcard = true;
            options.fileid = event.currentTarget.closest('.item')?.dataset?.id;
            const fp = new FilePicker(options);
            this.filepickers.push(fp);
            return fp.browse();
        }

        addToFileList(event) {
            let filename = $(event.currentTarget).val();
            if (filename != '') {
                let id = $(event.currentTarget).parent().get(0)?.dataset.id;

                let result = this.addFile(id, filename);
                $(event.currentTarget).val('');
                if (result) {
                    let files = duplicate(this.files);
                    files.push(result);
                    mergeObject(this.object.flags, {
                        "monks-active-tiles": { files: files }
                    });
                }
                this.setPosition({ height: 'auto' });
            }
        }

        async addToFolderList(event) {
            let id = $(event.currentTarget).parent().get(0)?.dataset.id;
            let source = "data";
            let pattern = $(event.currentTarget).val();
            const browseOptions = {};

            if (typeof ForgeVTT != "undefined" && ForgeVTT.usingTheForge) {
                source = "forgevtt";
            }

            // Support S3 matching
            if (/\.s3\./.test(pattern)) {
                source = "s3";
                const { bucket, keyPrefix } = FilePicker.parseS3URL(pattern);
                if (bucket) {
                    browseOptions.bucket = bucket;
                    pattern = keyPrefix;
                }
            }

            // Retrieve wildcard content
            try {
                const content = await FilePicker.browse(source, pattern, browseOptions);
                let files = duplicate(this.files);
                for (let file of content.files) {
                    let ext = file.substr(file.lastIndexOf('.') + 1);
                    if (CONST.IMAGE_FILE_EXTENSIONS[ext] != undefined) {
                        let result = this.addFile(id, file);
                        if (result)
                            files.push(result);
                    }
                }
                mergeObject(this.object.flags, {
                    "monks-active-tiles": { files: files }
                });
                this.setPosition({ height: 'auto' });
            } catch (err) {
                error(err);
            }
        }

        addFile(id, filename) {
            if (filename != '') {
                if (id) {
                    let file = this.files.find(f => f.id == id);
                    file.name = filename;
                    $(`.item[data-id="${id}"] .image-name`, this.element).html(filename);
                } else {
                    id = makeid();
                    $('.file-list', this.element).append($('<li>').attr('data-id', id).attr('draggable', 'true').attr('data-collection', 'files')
                        .addClass('flexrow file-row item')
                        .append($('<input>').addClass("filepath").attr({ 'type': 'hidden', 'name': `files.${id}.name` }).val(filename).change(this.addToFileList.bind(this)))
                        .append($('<div>').attr('title', filename).addClass('image-name').html(filename))
                        .append($('<a>').addClass('edit-file').html('<i class="fas fa-edit fa-sm"></i>').click(this.browseFiles.bind(this)))
                        .append($('<button>').addClass("add-image").attr('type', 'button').attr("data-target", `files.${id}.name`).hide().click(this._activateFilePicker.bind(this)))
                        .append($('<a>').addClass('delete-file').html('<i class="fas fa-trash fa-sm"></i>').click(this.removeFile.bind(this))));
                    return { id: id, name: filename, selected: false };
                }
            }
        }

        selectFile(event) {
            let id = event.currentTarget.closest('.file-row').dataset["id"];
            let idx = this.files.findIndex(f => f.id == id);

            $(`input[name="flags.monks-active-tiles.fileindex"]`, this.element).val(idx);

            mergeObject(this.object.flags, {
                "monks-active-tiles": { fileindex: idx }
            });
        }

        removeFile(event) {
            let id = event.currentTarget.closest('.file-row').dataset["id"];
            let files = duplicate(this.files);
            files.findSplice(i => i.id == id);
            mergeObject(this.object.flags, {
                "monks-active-tiles": { files: files }
            });

            $(`.file-list li[data-id="${id}"]`, this.element).remove();
            this.setPosition({ height: 'auto' });
        }

        _createAction(index, event) {
            let action = { };
            //if (this.object.getFlag("monks-active-tiles", "actions") == undefined)
            //    this.object.setFlag("monks-active-tiles", "actions", []);
            this.actionconfig = new ActionConfig(action, { parent: this, index }).render(true);
        }

        _editAction(event) {
            let item = event.currentTarget.closest('.item');
            let action = this.actions.find(obj => obj.id == item.dataset.id);
            if (action != undefined)
                this.actionconfig = new ActionConfig(action, { parent: this }).render(true);
        }

        _deleteAction(event) {
            let item = event.currentTarget.closest('.item');
            this.deleteAction(item.dataset.id);
        }

        deleteAction(id) {
            let actions = duplicate(this.actions);
            actions.findSplice(i => i.id == id);
            mergeObject(this.object.flags, {
                "monks-active-tiles": { actions: actions }
            });
            //this.object.setFlag("monks-active-tiles", "actions", actions);
            $(`li[data-id="${id}"]`, this.element).remove();
            this.setPosition({ height: 'auto' });
        }

        _stopSound(event) {
            let id = event.currentTarget.closest('.item').dataset.id;
            if (this.object.soundeffect[id]) {
                this.object.soundeffect[id].stop();
                delete this.object.soundeffect[id];
            }
            MonksActiveTiles.emit('stopsound', {
                tileid: this.object.uuid,
                type: 'tile',
                userId: null,
                actionid: id
            });
            this.render();
        }

        cloneAction(id) {
            let actions = duplicate(this.actions);
            let idx = actions.findIndex(obj => obj.id == id);
            if (idx == -1)
                return;

            let action = actions[idx];
            if (!action)
                return;

            let clone = duplicate(action);
            clone.id = makeid();
            actions.splice(idx + 1, 0, clone);
            //if (this.object.id) {
            //    this.object.setFlag("monks-active-tiles", "actions", actions);
            //} else {
            setProperty(this.object, "flags.monks-active-tiles.actions", actions);
            this.render();
            //}
        }

        checkRecordHistory(event) {
            // if turning off record-history, then also turn off per token
            if (!$('.record-history', this.element).prop("checked"))
                $('.per-token', this.element).prop("checked", false);
        }

        checkPerToken(event) {
            // if turning on per token, then also turn on record-history
            if ($('.per-token', this.element).prop("checked"))
                $('.record-history', this.element).prop("checked", true);
        }

        resetPerToken() {
            this.object.resetPerToken();
        }

        _getContextOptions() {
            return [
                {
                    name: "Insert Above",
                    icon: '<i class="far fa-objects-align-top"></i>',
                    condition: () => game.user.isGM,
                    callback: elem => {
                        let li = $(elem).closest('.item');
                        let idx = li.index();
                        this._createAction.call(this, idx);
                    }
                },
                {
                    name: "Insert Below",
                    icon: '<i class="far fa-objects-align-bottom"></i>',
                    condition: () => game.user.isGM,
                    callback: elem => {
                        let li = $(elem).closest('.item');
                        let idx = li.index();
                        this._createAction.call(this, idx + 1);
                    }
                },
                {
                    name: "SIDEBAR.Duplicate",
                    icon: '<i class="far fa-copy"></i>',
                    condition: () => game.user.isGM,
                    callback: elem => {
                        let li = $(elem).closest('.item');
                        const id = li.data("id");
                        return this.cloneAction(id);
                    }
                },
                {
                    name: "SIDEBAR.Delete",
                    icon: '<i class="fas fa-trash"></i>',
                    condition: () => game.user.isGM,
                    callback: elem => {
                        let li = $(elem).closest('.item');
                        const id = li.data("id");
                        Dialog.confirm({
                            title: `${game.i18n.localize("SIDEBAR.Delete")} action`,
                            content: game.i18n.format("SIDEBAR.DeleteWarning", { type: 'action' }),
                            yes: this.deleteAction.bind(this, id),
                            options: {
                                top: Math.min(li[0].offsetTop, window.innerHeight - 350),
                                left: window.innerWidth - 720
                            }
                        });
                    }
                }
            ];
        }
    }

    const constructorName = "ActiveTileConfig";
    Object.defineProperty(ActiveTileConfig.prototype.constructor, "name", { value: constructorName });
    return ActiveTileConfig;
};
