'use strict';

const rootStyle = document.querySelector(':root').style;

const debouncedReload = debounce(() => window.location.reload(), 100);

class MinimalUICamera {
    static initSettings() {
        game.settings.register("minimal-ui", "hidePlayerCameras", {
            name: game.i18n.localize("MinimalUI.HidePlayerCameraName"),
            hint: game.i18n.localize("MinimalUI.HidePlayerCameraHint"),
            scope: "world",
            config: true,
            default: "default",
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.SettingsDefault"),
                "hidden": game.i18n.localize("MinimalUI.HidePlayerCameraSetting")
            },
            onChange: debouncedReload
        });
    }

    static initHooks() {
        Hooks.on('renderCameraViews', async function () {
            switch (game.settings.get('minimal-ui', 'hidePlayerCameras')) {
                case 'hidden': {
                    $("#camera-views > div").each(function (i, box) {
                        if (!game.users.get($(box).attr("data-user")).isGM) {
                            $(box).remove();
                        }
                    });
                }
            }
        });
    }
}

class MinimalUIControls {

    static controlsLocked = false;
    static fakeDisabled = false;
    static cssControlsLastPos = '0px';

    static controlToolsHoverTransition;

    static cssControlsStartVisible = '0px';
    static cssControlsHiddenPositionSmall = '-36px';
    static cssControlsHiddenPositionStandard = '-46px';

    static cssControlsSubMenuSmall = '50px';
    static cssControlsSubMenuStandard = '60px';
    static cssControlsSubMenuDndUi = '65px';

    static cssControlsPaddingDefault = '7px';
    static cssControlsPaddingHidden = '26px';

    static cssControlsStandardWidth = '36px';
    static cssControlsStandardHeight = '30px';
    static cssControlsStandardLineHeight = '30px';
    static cssControlsStandardFontSize = '24px';

    static cssControlsSmallWidth = '25px';
    static cssControlsSmallHeight = '24px';
    static cssControlsSmallLineHeight = '25px';
    static cssControlsSmallFontSize = '15px';

    static revealControls() {
        rootStyle.setProperty('--controlspad', MinimalUIControls.cssControlsPaddingDefault);
        rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsStartVisible);
    }

    static revealControlTools() {
        if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
            rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsSubMenuSmall);
        } else {
            rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsSubMenuStandard);
        }
        // Special compatibility DnD-UI
        if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
            rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsSubMenuDndUi);
        }
        // ---
    }

    static hideControls() {
        rootStyle.setProperty('--controlspad', MinimalUIControls.cssControlsPaddingHidden);
        if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
            rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsHiddenPositionSmall);
        } else {
            rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsHiddenPositionStandard);
        }
    }

    static hideControlTools() {
        if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
            rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsHiddenPositionSmall);
        } else {
            rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsHiddenPositionStandard);
        }
    }

    static lockControls(unlock) {
        const sidebarLock = $("#sidebar-lock > i");
        if (!MinimalUIControls.controlsLocked) {
            MinimalUIControls.controlsLocked = true;
            MinimalUIControls.cssControlsLastPos = rootStyle.getPropertyValue('--controlsxpos');
            MinimalUIControls.revealControls();
            MinimalUIControls.revealControlTools();
            sidebarLock.removeClass("fa-lock-open");
            sidebarLock.addClass("fa-lock");
        } else if (unlock) {
            MinimalUIControls.controlsLocked = false;
            sidebarLock.removeClass("fa-lock");
            sidebarLock.addClass("fa-lock-open");
            MinimalUIControls.hideControls();
            MinimalUIControls.hideControlTools();
        }
    }

    static positionSidebar() {
        let availableHeight = parseInt($("#board").css('height'));
        switch (true) {
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'top' || game.settings.get('minimal-ui', 'controlsStyle') === 'column'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight / 3) - (availableHeight / 9) - (availableHeight / 9)) + 'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'center'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight / 3) - (availableHeight / 9)) + 'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'lower'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight / 3)) + 'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'bottom'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight / 3) + (availableHeight / 9)) + 'px');
                break;
            }
        }
    }

    static addLockButton() {
        const locked = MinimalUIControls.controlsLocked ? 'fa-lock' : 'fa-lock-open';
        const SidebarLockButton =
            $(`
            <li id="sidebar-lock" class="scene-control"
            title="${game.i18n.localize("MinimalUI.PinSidebar")}">
            <i class="fas ${locked} minui-lock"></i>
            </li>
            `);
        if (game.settings.get('minimal-ui', 'controlsBehaviour') === 'autohide') {
            SidebarLockButton
                .click(() => MinimalUIControls.lockControls(true))
                .appendTo("#controls");
        }
    }

    static sizeControls() {
        if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
            rootStyle.setProperty('--controlsw', MinimalUIControls.cssControlsSmallWidth);
            rootStyle.setProperty('--controlsh', MinimalUIControls.cssControlsSmallHeight);
            rootStyle.setProperty('--controlslh', MinimalUIControls.cssControlsSmallLineHeight);
            rootStyle.setProperty('--controlsfs', MinimalUIControls.cssControlsSmallFontSize);
        } else {
            rootStyle.setProperty('--controlsw', MinimalUIControls.cssControlsStandardWidth);
            rootStyle.setProperty('--controlsh', MinimalUIControls.cssControlsStandardHeight);
            rootStyle.setProperty('--controlslh', MinimalUIControls.cssControlsStandardLineHeight);
            rootStyle.setProperty('--controlsfs', MinimalUIControls.cssControlsStandardFontSize);
        }
        MinimalUIControls.positionSidebar();
        const controlSettings = game.settings.get('minimal-ui', 'controlsBehaviour');
        if (MinimalUIControls.controlsLocked) {
            MinimalUIControls.revealControls();
            MinimalUIControls.revealControlTools();
        } else if (controlSettings === 'autohide') {
            MinimalUIControls.hideControls();
            MinimalUIControls.hideControlTools();
        }
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'controlsBehaviour', {
            name: game.i18n.localize("MinimalUI.ControlsBehaviourName"),
            hint: game.i18n.localize("MinimalUI.ControlsBehaviourHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "always": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide")
            },
            default: "autohide",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'controlsSize', {
            name: game.i18n.localize("MinimalUI.ControlsSizeName"),
            hint: game.i18n.localize("MinimalUI.ControlsSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "small",
            onChange: MinimalUIControls.sizeControls
        });

        game.settings.register('minimal-ui', 'controlsStyle', {
            name: game.i18n.localize("MinimalUI.ControlsStyleName"),
            hint: game.i18n.localize("MinimalUI.ControlsStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.ControlsStyleExpandRight"),
                "column": game.i18n.localize("MinimalUI.ControlsStyleSingleColumn")
            },
            default: "default",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'controlsPosition', {
            name: game.i18n.localize("MinimalUI.ControlsPositionName"),
            hint: game.i18n.localize("MinimalUI.ControlsPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "top": game.i18n.localize("MinimalUI.ControlsPositionTopLeft"),
                "center": game.i18n.localize("MinimalUI.ControlsPositionUpperLeft"),
                "lower": game.i18n.localize("MinimalUI.ControlsPositionLowerLeft"),
                "bottom": game.i18n.localize("MinimalUI.ControlsPositionBottomLeft")
            },
            default: "center",
            onChange: MinimalUIControls.positionSidebar
        });

    }

    static initHooks() {
        Hooks.once('ready', function () {
            MinimalUIControls.positionSidebar();
        });

        Hooks.once('renderSceneControls', function () {
            MinimalUIControls.sizeControls();

            switch (game.settings.get('minimal-ui', 'controlsStyle')) {
                case 'default': {
                    rootStyle.setProperty('--controlssubstyle', 'block');
                    break;
                }
                case 'column': {
                    rootStyle.setProperty('--controlssubstyle', 'contents');
                    break;
                }
            }

        });

        Hooks.on('renderSceneControls', async function () {

            const controls = $("#controls");
            const controlSettings = game.settings.get('minimal-ui', 'controlsBehaviour');

            // Hide controls altogether when they're disabled
            if (!MinimalUIControls.fakeDisabled && controls.hasClass('disabled')) {
                controls.hide();
            } else {
                controls.show();
            }

            if (controlSettings === 'autohide') {
                controls.hover(
                    function () {
                        if (!MinimalUIControls.controlsLocked) {
                            MinimalUIControls.revealControls();
                            MinimalUIControls.revealControlTools();
                            clearTimeout(MinimalUIControls.controlToolsHoverTransition);
                        }
                    },
                    function () {
                        if (!MinimalUIControls.controlsLocked) {
                            MinimalUIControls.controlToolsHoverTransition = setTimeout(function () {
                                MinimalUIControls.hideControls();
                                MinimalUIControls.hideControlTools();
                            }, 500);
                        }
                    }
                );
            }

            if (controlSettings === 'autohide' && !MinimalUIControls.controlsLocked) {
                MinimalUIControls.hideControls();
                MinimalUIControls.hideControlTools();
            } else {
                MinimalUIControls.revealControls();
                MinimalUIControls.revealControlTools();
            }

            MinimalUIControls.addLockButton();

            // --------------- COMPATIBILITY SECTION ------------------
            // Here we add workarounds for minimal UI to work well with modules that affect UI components

            // Give a little time for other modules to add their controls first, and reapply changes
            await new Promise(waitABit => setTimeout(waitABit, 1));

            $("#controls > li.scene-control").on('click', function () {
                MinimalUIControls.lockControls(false);
                $("#controls > li.scene-control.active > ol > li").on('click', function () {
                    MinimalUIControls.lockControls(false);
                });
            });
            $("#controls > li.scene-control.active > ol > li").on('click', function () {
                MinimalUIControls.lockControls(false);
            });

            // Delete and add lock button if needed, so the lock is always at the bottom
            const controlsList = $("#controls > li");
            const sidebarLock = $("#sidebar-lock");
            if (controlsList.index(sidebarLock) !== controlsList.length) {
                sidebarLock.remove();
                MinimalUIControls.addLockButton();
            }

            // Support for Simple Dice Roller
            if (game.modules.has('simple-dice-roller') && game.modules.get('simple-dice-roller').active) {
                $("#controls > li.scene-control.sdr-scene-control").click(function () {
                    let olControl = $("#controls > li.scene-control.sdr-scene-control.active > ol")[0];
                    if (olControl) {
                        olControl.style.setProperty('display', 'inherit');
                    }
                });
            }

            // ----------------------------------------------------------------------

        });
    }

}

class MinimalUIHotbar {

    static hotbarLocked = false;

    static cssHotbarHidden = '-43px';
    static cssHotbarReveal = '1px';
    static cssHotbarShown = '10px';

    static cssHotbarLeftControlsLineHeight = '24px';
    static cssHotbarRightControlsLineHeight = '12px';
    static cssHotbarRightControlsLineHeightDnDUi = '10px';
    static cssHotbarControlsAutoHideHeight = '100%';
    static cssHotbarAutoHideHeight = '1px';
    static cssHotbarAutoHideShadow = '-1px';
    static cssHotbarControlsMargin = '0px';

    static htmlHotbarLockButton =
        `
        <a class="minui-lock" id="bar-lock">
          <i class="fas fa-lock-open"></i>
        </a>
        `

    static async collapseHotbar(toggleId) {
        await ui.hotbar.collapse();
    }

    static lockHotbar(unlock) {
        const barLock = $("#bar-lock > i");
        if (MinimalUIHotbar.hotbarLocked && unlock) {
            rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarHidden);
            barLock.removeClass("fa-lock");
            barLock.addClass("fa-lock-open");
            MinimalUIHotbar.hotbarLocked = false;
        } else {
            rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarReveal);
            barLock.removeClass("fa-lock-open");
            barLock.addClass("fa-lock");
            MinimalUIHotbar.hotbarLocked = true;
        }
    }

    static positionHotbar() {
        let availableWidth = canvas.app.screen.width;
        switch (game.settings.get('minimal-ui', 'hotbarPosition')) {
            case 'default': {
                rootStyle.setProperty('--hotbarxpos', '220px');
                break;
            }
            case 'left': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) - (availableWidth / 9) - (availableWidth / 9)) + 'px');
                break;
            }
            case 'center': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) - (availableWidth / 9)) + 'px');
                break;
            }
            case 'right': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5)) + 'px');
                break;
            }
            case 'manual': {
                rootStyle.setProperty('--hotbarxpos', game.settings.get('minimal-ui', 'hotbarPixelPosition') + 'px');
                break;
            }
        }
    }

    static setHotbarSlots() {
        switch (game.settings.get('minimal-ui', 'hotbarSize')) {
            case "slots_3": {
                $("#macro-list > li").each(function (i, slot) {
                    if (i > 2) {
                        rootStyle.setProperty('--hotbarwf', '152px');
                        $(slot).remove();
                    }
                });
                break;
            }
            case "slots_6": {
                $("#macro-list > li").each(function (i, slot) {
                    if (i > 5) {
                        rootStyle.setProperty('--hotbarwf', '302px');
                        $(slot).remove();
                    }
                });
                break;
            }
        }
    }

    static configureHotbar() {
        switch (game.settings.get('minimal-ui', 'hotbar')) {
            case 'collapsed': {
                MinimalUIHotbar.collapseHotbar("bar-toggle");
                if (game.modules.has("custom-hotbar") && game.modules.get('custom-hotbar').active) {
                    MinimalUIHotbar.collapseHotbar("custom-bar-toggle");
                }
                break;
            }
            case 'autohide': {
                if (!(game.modules.has("custom-hotbar") && game.modules.get('custom-hotbar').active)) {
                    rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarHidden);
                    rootStyle.setProperty('--hotbarlh1', MinimalUIHotbar.cssHotbarLeftControlsLineHeight);
                    rootStyle.setProperty('--hotbarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeight);
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        rootStyle.setProperty('--hotbarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeightDnDUi);
                    }
                    rootStyle.setProperty('--hotbarmg', MinimalUIHotbar.cssHotbarControlsMargin);
                    rootStyle.setProperty('--hotbarhh', MinimalUIHotbar.cssHotbarControlsAutoHideHeight);
                    rootStyle.setProperty('--hotbarhv', MinimalUIHotbar.cssHotbarAutoHideHeight);
                    rootStyle.setProperty('--hotbarshp', MinimalUIHotbar.cssHotbarAutoHideShadow);
                    $("#hotbar-directory-controls").append(MinimalUIHotbar.htmlHotbarLockButton);
                    $("#macro-directory").click(function () {
                        MinimalUIHotbar.lockHotbar(false);
                    });
                    $("#bar-lock").click(function () {
                        MinimalUIHotbar.lockHotbar(true);
                    });
                    if (MinimalUIHotbar.hotbarLocked) {
                        MinimalUIHotbar.lockHotbar(false);
                    }
                }
                $("#bar-toggle").remove();
                break;
            }
        }
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'hotbar', {
            name: game.i18n.localize("MinimalUI.HotbarStyleName"),
            hint: game.i18n.localize("MinimalUI.HotbarStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed"),
                "onlygm": game.i18n.localize("MinimalUI.SettingsOnlyGM"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "autohide",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'hotbarSize', {
            name: game.i18n.localize("MinimalUI.HotbarSizeName"),
            hint: game.i18n.localize("MinimalUI.HotbarSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "slots_3": game.i18n.localize("MinimalUI.HotbarSlots3"),
                "slots_6": game.i18n.localize("MinimalUI.HotbarSlots6"),
                "slots_10": game.i18n.localize("MinimalUI.HotbarSlots10")
            },
            default: "slots_10",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'hotbarPosition', {
            name: game.i18n.localize("MinimalUI.HotbarPositionName"),
            hint: game.i18n.localize("MinimalUI.HotbarPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.SettingsDefault"),
                "left": game.i18n.localize("MinimalUI.HotbarPositionCenterLeft"),
                "center": game.i18n.localize("MinimalUI.HotbarPositionCenter"),
                "right": game.i18n.localize("MinimalUI.HotbarPositionCenterRight"),
                "manual": game.i18n.localize("MinimalUI.HotbarPositionManual")
            },
            default: "center",
            onChange: MinimalUIHotbar.positionHotbar
        });

        game.settings.register('minimal-ui', 'hotbarPixelPosition', {
            name: game.i18n.localize("MinimalUI.HotbarPPositionName"),
            hint: game.i18n.localize("MinimalUI.HotbarPPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            default: "400",
            onChange: MinimalUIHotbar.positionHotbar
        });
    }

    static initHooks() {
        Hooks.on('ready', async function() {
            ui.hotbar.element.hide();
            MinimalUIHotbar.positionHotbar();
            if (game.settings.get('minimal-ui', 'hotbar') !== 'hidden') {
                const gmCondition = game.settings.get('minimal-ui', 'hotbar') === 'onlygm';
                if (gmCondition) {
                    if (game.user.isGM)
                        rootStyle.setProperty('--hotbarvis', 'visible');
                } else
                    rootStyle.setProperty('--hotbarvis', 'visible');
            }
            // Give time to auto-hide initial animations to finish
            if (game.settings.get('minimal-ui', 'playerList') === 'autohide')
                await new Promise(waitABit => setTimeout(waitABit, 50));
            ui.hotbar.element.show();
        });

        Hooks.on('renderHotbar', function () {
            MinimalUIHotbar.configureHotbar();
            MinimalUIHotbar.setHotbarSlots();
        });

    }

}

class MinimalUILogo {

    static hiddenInterface = false;

    static hideAll() {
        $('#logo').click(_ => {
            let alsoChat;
            switch (game.settings.get('minimal-ui', 'foundryLogoBehaviour')) {
                case 'toggleAll': {
                    alsoChat = true;
                    break;
                }
                case 'toggleButChat': {
                    alsoChat = false;
                    break;
                }
            }
            if (!MinimalUILogo.hiddenInterface) {
                if (alsoChat) {
                    $('#sidebar').hide();
                }
                $('#navigation').hide();
                $('#controls').hide();
                $('#players').hide();
                $('#hotbar').hide();
                MinimalUILogo.hiddenInterface = true;
            } else {
                if (alsoChat) {
                    $('#sidebar').show();
                }
                $('#navigation').show();
                $('#controls').show();
                $('#players').show();
                $('#hotbar').show();
                MinimalUILogo.hiddenInterface = false;
            }
        });
    }

    static updateImageSrc(srcimg) {
        const logoSetting = game.settings.get('minimal-ui', 'foundryLogoSize');
        if (!game.modules.get('mytab')?.active && logoSetting !== 'hidden') {
            $("#logo")
                .attr('src', srcimg)
                .on('error', function () {
                    if (game.user.isGM)
                        ui.notifications.warn(
                            "Minimal UI: Your Logo Image could not be found. Restoring to Default Foundry Logo"
                        );
                    MinimalUILogo.updateImageSrc("icons/fvtt.png");
                });
        }
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'foundryLogoSize', {
            name: game.i18n.localize("MinimalUI.LogoStyleName"),
            hint: game.i18n.localize("MinimalUI.LogoStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "hidden": game.i18n.localize("MinimalUI.SettingsHide"),
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "hidden",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'foundryLogoBehaviour', {
            name: game.i18n.localize("MinimalUI.LogoBehaviourName"),
            hint: game.i18n.localize("MinimalUI.LogoBehaviourHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "toggleAll": game.i18n.localize("MinimalUI.LogoBehaviourToggle"),
                "toggleButChat": game.i18n.localize("MinimalUI.LogoBehaviourToggleNoChat")
            },
            default: "toggleButChat"
        });

        game.settings.register('minimal-ui', 'foundryLogoImage', {
            name: game.i18n.localize("MinimalUI.LogoImageName"),
            hint: game.i18n.localize("MinimalUI.LogoImageHint"),
            scope: 'world',
            config: true,
            type: String,
            default: "icons/fvtt.png",
            onChange: _ => {
                MinimalUILogo.updateImageSrc(game.settings.get('minimal-ui', 'foundryLogoImage'));
            }
        });
    }

    static initHooks() {

        Hooks.once('renderSceneNavigation', async function () {
            MinimalUILogo.updateImageSrc(game.settings.get('minimal-ui', 'foundryLogoImage'));
        });

        Hooks.once('ready', async function () {

            if (game.settings.get('minimal-ui', 'foundryLogoSize') !== 'hidden') {
                MinimalUILogo.hideAll();
            }

            switch (game.settings.get('minimal-ui', 'foundryLogoSize')) {
                case 'small': {
                    rootStyle.setProperty('--logovis', 'visible');
                    rootStyle.setProperty('--logoh', '25px');
                    rootStyle.setProperty('--logow', '50px');
                    break;
                }
                case 'standard': {
                    rootStyle.setProperty('--logovis', 'visible');
                    break;
                }
            }

            // Compatibility Workaround for bullseye module
            if (game.modules.has('bullseye') && game.modules.get('bullseye').active) {
                rootStyle.setProperty('--logovis', 'visible');
                rootStyle.setProperty('--logoh', '50px');
                rootStyle.setProperty('--logow', '100px');
            }

        });

    }

}

class MinimalUINavigation {

    static cssSceneNavNoLogoStart = '5px';
    static cssSceneNavSmallLogoStart = '75px';
    static cssSceneNavBullseyeStart = '125px';

    static async collapseNavigation() {
        await ui.nav.collapse();
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'sceneNavigation', {
            name: game.i18n.localize("MinimalUI.NavigationStyleName"),
            hint: game.i18n.localize("MinimalUI.NavigationStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsStartVisible"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "shown",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'sceneNavigationSize', {
            name: game.i18n.localize("MinimalUI.NavigationSizeName"),
            hint: game.i18n.localize("MinimalUI.NavigationSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard"),
                "big": game.i18n.localize("MinimalUI.SettingsBig")
            },
            default: "small",
            onChange: debouncedReload
        });

    }

    static initHooks() {

        Hooks.once('ready', async function () {
            switch (game.settings.get('minimal-ui', 'foundryLogoSize')) {
                case 'small': {
                    rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavSmallLogoStart);
                    break;
                }
            }

            // Compatibility Workaround for bullseye module
            if (game.modules.has('bullseye') && game.modules.get('bullseye').active) {
                rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavBullseyeStart);
            }
        });

        Hooks.once('renderSceneNavigation', async function () {

            switch (game.settings.get('minimal-ui', 'sceneNavigation')) {
                case 'collapsed': {
                    MinimalUINavigation.collapseNavigation();
                    rootStyle.setProperty('--navivis', 'visible');
                    break;
                }
                case 'shown': {
                    rootStyle.setProperty('--navivis', 'visible');
                    break;
                }
            }

            switch (game.settings.get('minimal-ui', 'sceneNavigationSize')) {
                case 'standard': {
                    rootStyle.setProperty('--navilh', '32px');
                    rootStyle.setProperty('--navifs', '16px');
                    rootStyle.setProperty('--navilisttop', '24px');
                    rootStyle.setProperty('--navibuttonsize', '34px');
                    break;
                }
                case 'big': {
                    rootStyle.setProperty('--navilh', '40px');
                    rootStyle.setProperty('--navifs', '20px');
                    rootStyle.setProperty('--navilisttop', '30px');
                    rootStyle.setProperty('--navibuttonsize', '43px');
                    break;
                }
            }

        });

        Hooks.on('renderSceneNavigation', async function () {

            switch (game.settings.get('minimal-ui', 'foundryLogoSize')) {
                case 'hidden': {
                    rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavNoLogoStart);
                    break;
                }
                case 'small': {
                    rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavSmallLogoStart);
                    break;
                }
            }

            // Compatibility Workaround for bullseye module
            if (game.modules.has('bullseye') && game.modules.get('bullseye').active) {
                rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavBullseyeStart);
            }

        });

    }

}

class MinimalUIPlayers {

    static cssPlayersHiddenWidth = '28px';
    static cssPlayersSmallFontSize = '12px';
    static cssPlayersSmallWidth = '175px';
    static cssPlayersStandardFontSize = 'inherit';
    static cssPlayersStandardWidth = '200px';

    static initSettings() {
        game.settings.register('minimal-ui', 'playerList', {
            name: game.i18n.localize("MinimalUI.PlayersBehaviourName"),
            hint: game.i18n.localize("MinimalUI.PlayersBehaviourHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "autohide",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'playerListSize', {
            name: game.i18n.localize("MinimalUI.PlayersSizeName"),
            hint: game.i18n.localize("MinimalUI.PlayersSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "small",
            onChange: debouncedReload
        });

        // Ping Logger compatibility setting
        if (game.modules.get('ping-logger')?.active) {
            game.settings.register('minimal-ui', 'playerShowPing', {
                name: game.i18n.localize("MinimalUI.PlayersShowPingName"),
                hint: game.i18n.localize("MinimalUI.PlayersShowPingHint"),
                scope: 'world',
                config: true,
                type: String,
                choices: {
                    "showPing": game.i18n.localize("MinimalUI.PlayersShowPing"),
                    "hidePing": game.i18n.localize("MinimalUI.PlayersHidePing"),
                },
                default: "hidePing",
                onChange: debouncedReload
            });
        }
    }

    static initHooks() {

        Hooks.on('renderPlayerList', async function () {
            const players = $("#players");

            players[0].val = "";
            const plSize = game.settings.get('minimal-ui', 'playerListSize');

            switch (game.settings.get('minimal-ui', 'playerList')) {
                case 'default': {
                    if (plSize === 'small') {
                        rootStyle.setProperty('--playerfsize', MinimalUIPlayers.cssPlayersSmallFontSize);
                        rootStyle.setProperty('--playerwidth', MinimalUIPlayers.cssPlayersSmallWidth);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersSmallWidth);
                    } else {
                        rootStyle.setProperty('--playerfsize', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerwidth', MinimalUIPlayers.cssPlayersStandardWidth);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
                    }
                    rootStyle.setProperty('--playervis', 'visible');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        rootStyle.setProperty('--playerwidth', '200px');
                    }
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'inline');
                    // ---
                    break;
                }
                case 'autohide': {
                    if (plSize === 'small') {
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersSmallFontSize);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersSmallWidth);
                    } else {
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
                    }
                    rootStyle.setProperty('--playervis', 'visible');
                    rootStyle.setProperty('--playerslh', '2px');
                    rootStyle.setProperty('--playerh3w', '0%');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        players.css('border-image', 'none');
                        players.css('border-color', 'black');
                        players.hover(
                            function () {
                                players.css('border-image', '');
                                players.css('border-color', '');
                            },
                            function () {
                                players.css('border-image', 'none');
                                players.css('border-color', 'black');
                            }
                        );
                    }
                    // Compatibility for Raise Hand module
                    let playerWidthPixel = parseInt(MinimalUIPlayers.cssPlayersHiddenWidth);

                    if (game.modules.has('raise-my-hand') && game.modules.get('raise-my-hand').active) {
                        playerWidthPixel += 14;
                        rootStyle.setProperty('--playerslh', '20px');
                    }
                    // Compatibility for Ping Logger module
                    if (game.modules.get('ping-logger')?.active) {
                        if (game.settings.get('minimal-ui', 'playerShowPing') === "showPing") {
                            // Increase width and height to display ping
                            rootStyle.setProperty('--playerpingdisplay', 'initial');
                            rootStyle.setProperty('--playerslh', '20px');
                            playerWidthPixel += 36;
                        } else {
                            // Hide the ping, and only display on hover
                            rootStyle.setProperty('--playerpingdisplay', 'none');
                            players.hover(
                                function () {
                                    $(".pingLogger_pingSpan").show();
                                },
                                function () {
                                    $(".pingLogger_pingSpan").hide();
                                }
                            );
                        }
                    }

                    rootStyle.setProperty('--playerwidth', `${playerWidthPixel}px`);
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'none');
                    if (game.system.data.name === 'swade') {
                        players.hover(
                            function () {
                                $(".bennies-count").show();
                            },
                            function () {
                                $(".bennies-count").hide();
                            }
                        );
                    }
                    // ---
                    break;
                }
            }
            if (game.settings.get('minimal-ui', 'hotbar') === 'autohide') {
                rootStyle.setProperty('--playerbot', '2px');
            }
            // DnD UI Special Compatibility
            if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
            }
            // ---
        });

    }

}

class MinimalUISidebar {

    static initSettings() {

        game.settings.register('minimal-ui', 'rightcontrolsBehaviour', {
            name: game.i18n.localize("MinimalUI.SidebarStyleName"),
            hint: game.i18n.localize("MinimalUI.SidebarStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsStartVisible"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed")
            },
            default: "collapsed"
        });
    }

    static initHooks() {
        Hooks.once('renderChatLog', async function () {
            switch (game.settings.get('minimal-ui', 'rightcontrolsBehaviour')) {
                case 'shown': {
                    rootStyle.setProperty('--controlsvis', 'visible');
                    break;
                }
                case 'collapsed': {
                    ui.sidebar.element.hide();
                    ui.sidebar.collapse();
                    // wait for animation to finish
                    await new Promise(waitABit => setTimeout(waitABit, 600));
                    rootStyle.setProperty('--controlsvis', 'visible');
                    ui.sidebar.element.fadeIn('slow');
                    break;
                }
                default: {
                    rootStyle.setProperty('--controlsvis', 'visible');
                    break;
                }
            }
        });

    }
}

class MinimalUITheme {

    static initSettings() {
        new window.Ardittristan.ColorSetting("minimal-ui", "borderColor", {
            name: game.i18n.localize("MinimalUI.BorderColorName"),
            hint: game.i18n.localize("MinimalUI.BorderColorHint"),
            label: game.i18n.localize("MinimalUI.ColorPicker"),
            scope: "world",
            restricted: true,
            defaultColor: "#ff490080",
            onChange: _ => {
                rootStyle.setProperty('--bordercolor', game.settings.get('minimal-ui', 'borderColor'));
                if (game.modules.get('minimal-window-controls')?.active) {
                    rootStyle.setProperty('--wcbordercolor', game.settings.get('minimal-ui', 'borderColor'));
                }
                if (game.modules.get('scene-preview')?.active) {
                    rootStyle.setProperty('--spbordercolor', game.settings.get('minimal-ui', 'borderColor'));
                }
            }
        });

        new window.Ardittristan.ColorSetting("minimal-ui", "shadowColor", {
            name: game.i18n.localize("MinimalUI.ShadowColorName"),
            hint: game.i18n.localize("MinimalUI.ShadowColorHint"),
            label: game.i18n.localize("MinimalUI.ColorPicker"),
            scope: "world",
            restricted: true,
            defaultColor: "#ff000060",
            type: String,
            onChange: _ => {
                rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
                if (game.modules.get('minimal-window-controls')?.active) {
                    rootStyle.setProperty('--wcshadowcolor', game.settings.get('minimal-ui', 'borderColor'));
                }
                if (game.modules.get('scene-preview')?.active) {
                    rootStyle.setProperty('--spshadowcolor', game.settings.get('minimal-ui', 'borderColor'));
                }
            }
        });

        game.settings.register("minimal-ui", "shadowStrength", {
            name: game.i18n.localize("MinimalUI.ShadowStrengthName"),
            hint: game.i18n.localize("MinimalUI.ShadowStrengthHint"),
            scope: "world",
            config: true,
            default: "5",
            type: String,
            onChange: _ => {
                rootStyle.setProperty('--shadowstrength', game.settings.get('minimal-ui', 'shadowStrength') + 'px');
                if (game.modules.get('minimal-window-controls')?.active) {
                    rootStyle.setProperty('--wcshadowstrength', game.settings.get('minimal-ui', 'borderColor'));
                }
                if (game.modules.get('scene-preview')?.active) {
                    rootStyle.setProperty('--spshadowstrength', game.settings.get('minimal-ui', 'borderColor'));
                }
            }
        });

        game.settings.register("minimal-ui", "transparencyPercentage", {
            name: game.i18n.localize("MinimalUI.TransparencyPercentageName"),
            hint: game.i18n.localize("MinimalUI.TransparencyPercentageHint"),
            scope: "world",
            config: true,
            default: 75,
            type: Number,
            onChange: _ => {
                const transparency = game.settings.get('minimal-ui', 'transparencyPercentage');
                if (transparency >= 0 && transparency <= 100) {
                    rootStyle.setProperty('--opacity', transparency.toString() + '%');
                }
            }
        });
    }

    static initHooks() {
        Hooks.once('renderSceneControls', async function () {
            rootStyle.setProperty('--bordercolor', game.settings.get('minimal-ui', 'borderColor'));
            rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
            rootStyle.setProperty('--shadowstrength', game.settings.get('minimal-ui', 'shadowStrength') + 'px');
            const transparency = game.settings.get('minimal-ui', 'transparencyPercentage');
            if (transparency >= 0 && transparency <= 100) {
                rootStyle.setProperty('--opacity', transparency.toString() + '%');
            }
        });
    }
}

class MinimalUIPatch {

    static initSettings() {

    }

    static initHooks() {
        Hooks.on('changeSidebarTab', function (app) {
            const target = Object.values(ui.windows).find(a => a.tabName === app.tabName);
            if (target && target._minimized)
                target.maximize();
            else if (target)
                target.bringToTop();
        });

        Hooks.once('ready', async function () {
            $("#sidebar-tabs > a:nth-child(n)").click(function (eve) {
                if (eve.currentTarget.classList.contains('collapse')) return;
                const tabName = jQuery(eve.currentTarget).attr('data-tab');
                if (ui.sidebar._collapsed) {
                    ui.sidebar.activateTab(tabName);
                }
            });
        });
    }

}

class MinimalUI {
    static noColorSettings = false;
}

Hooks.once('init', () => {

    /** Initialize settings for Theme Functionality */
    if (game.modules.get('colorsettings')?.active) {
        MinimalUITheme.initSettings();
        MinimalUITheme.initHooks();
    } else {
        MinimalUI.noColorSettings = true;
    }
    /** ------------------------- */

    /** Initialize settings for Core Component Functionality */
    MinimalUILogo.initSettings();
    MinimalUINavigation.initSettings();
    MinimalUIControls.initSettings();
    MinimalUIHotbar.initSettings();
    MinimalUISidebar.initSettings();
    MinimalUIPlayers.initSettings();
    MinimalUICamera.initSettings();
    /** ------------------------- */

    /** Initialize hooks for Core Component Functionality */
    MinimalUILogo.initHooks();
    MinimalUINavigation.initHooks();
    MinimalUIControls.initHooks();
    MinimalUIHotbar.initHooks();
    MinimalUISidebar.initHooks();
    MinimalUIPlayers.initHooks();
    MinimalUICamera.initHooks();
    /** ------------------------- */

    /** Initialize Foundry UI Patches */
    MinimalUIPatch.initSettings();
    MinimalUIPatch.initHooks();
    /** ------------------------- */

});

Hooks.once('ready', () => {

    if (MinimalUI.noColorSettings && game.user.isGM)
        ui.notifications.error("Minimal UI: Disabled color features because 'lib - colorsettings' module is not active.");

});
