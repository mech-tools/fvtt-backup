import { ActiveEffectCounter, EffectCounter, CounterTypes } from "./api.js";
import { HudContextMenu } from "./hudContextMenu.js";

/**
 * The currently hovered token HUD entity and status icon element.
 */
var activeEffectHud, activeEffectHudIcon;

/**
 * Flag used to block multiple asynchronous create operations.
 */
var creationState = new Set();

/**
 * Applies keybinds to the given entity to change status counters. Which 
 *  methods are used depends on the configuration. Previously registered 
 *  handlers are unregistered wherever necessary.
 * @param {TokenHUD} entity The Foundry entity associated with the element.
 * @param {jQuery} html The HTML code of the element.
 */
export const registerKeybinds = function (entity, html) {
    let effectHud = html.find(".status-effects");
    if (!effectHud.length) return;

    if (game.settings.get("statuscounter", "rebindMouseButtons")) {
        effectHud.off("click contextmenu", ".effect-control");
        effectHud.on("click.statuscounter", ".effect-control", onEffectClick.bind(entity))
            .on("contextmenu.statuscounter", ".effect-control", onEffectRightClick.bind(entity));
    }

    onFirst(effectHud, "click.statuscounter", ".effect-control", onEffectCtrlClick);

    if (game.settings.get("statuscounter", "rebindNumberKeys")) {
        effectHud.on("mouseover.statuscounter", ".effect-control", onEffectMouseOver.bind(entity))
            .on("mouseout.statuscounter", ".effect-control", onEffectMouseOut.bind(entity));
    }

    createContextMenu(entity.object.document, html);
}

/**
 * Binds an event handler so that it is executed before other handlers on the
 *  same element. Note that handlers defined in the DOM can still run before it.
 * @param {jQuery} element The parent jQuery element to bind the listeners on.
 * @param {String} eventName The name and namespace of the event.
 * @param {String} selector The selector that the event will be active for.
 * @param {Function} eventHandler The handler of the event.
 */
function onFirst(element, eventName, selector, eventHandler) {
    element.on(eventName, selector, eventHandler);

    let handlers = jQuery._data(element[0]).events[eventName.split('.')[0]];
    handlers.unshift(handlers.pop());
}

/**
 * Add a custom context menu to the effect HUD. The menu contains an entry for
 *  each known counter type, allowing the user to change it.
 * @param {TokenDocument} token The token document associated with the HUD.
 * @param {jQuery} effectHud The jQuery element of the HUD.
 */
function createContextMenu(token, effectHud) {
    let entries = [];
    for (let counterType of Object.keys(CounterTypes.types)) {
        entries.push(
            {
                name: counterType,
                icon: "",
                condition: function (contextElement) {
                    let counter = EffectCounter.findCounter(token, contextElement.attr("src"));
                    if (!counter || !counter.allowType(counterType)) return false;

                    this.icon = counter.type === this.name
                        ? "<span class='current-counter-type' style='visibility: inherit;'>&bull;</span>"
                        : "<span class='current-counter-type'>&bull;</span>";
                    return true;
                },
                callback: function (contextElement) {
                    let counter = EffectCounter.findCounter(token, contextElement.attr("src"));
                    if (counter && counter.type !== this.name) {
                        counter.changeType(this.name, token);
                    }
                }
            });
    }

    new HudContextMenu(effectHud, ".effect-control.active", entries, { eventName: "ctrl-click" });
}

/**
 * Handles the click event on a status icon when the CTRL key is pressed by
 *  redrecting the event to a custom "ctrl-click" name and stopping propagation.
 * @param {jQuery.Event} event The mouse click event triggered by jQuery.
 */
function onEffectCtrlClick(event) {
    if (event.ctrlKey || event.metaKey) {
        $(event.currentTarget).trigger("ctrl-click");
        event.stopImmediatePropagation();
        event.preventDefault();
    }
}

/**
 * Handles the click event on a status icon. If the shift key is pressed, the 
 *  status is applied as overlay. Otherwise, the status counter is incremented 
 *  by 1 and the token is updated accordingly.
 * @param {jQuery.Event} event The mouse click event triggered by jQuery.
 */
function onEffectClick(event) {
    if (event.shiftKey) {
        const iconPath = findIconPath(event);
        const isActive = hasOverlay(this.object.document, iconPath);
        const tokens = getUniqueSelectedTokens(this.object);
        for (const token of tokens) {
            if (token === this.object || isActive === hasOverlay(token.document, iconPath)) {
                toggleEffect(token, event, true);
            }
        }
    } else if (event.altKey) {
        const iconPath = findIconPath(event);
        const effect = CONFIG.statusEffects.find(e => e.icon === iconPath);
        const statusName = effect
            ? game.i18n.localize(effect.name ?? effect.label)
            : iconPath.split("\\").pop().split("/").pop().split(".").shift();
        const valuePrompt = new Dialog({
            title: game.i18n.localize("statuscounter.stackInput.title"),
            content: `<p>${game.i18n.format("statuscounter.stackInput.content", { status: statusName })}</p>
                <p><input type="number" name="statusCount" value="1"/></p>`,
            buttons: {
                ok: {
                    icon: '<i class="fas fa-check"></i>',
                    label: game.i18n.localize("statuscounter.stackInput.button"),
                    callback: html => {
                        const input = html[0].querySelector("input[name='statusCount']");
                        changeIconCounter(event, this, input.valueAsNumber, false);
                    }
                }
            },
            default: "ok"
        });
        valuePrompt.render(true);
    } else {
        changeIconCounter(event, this, 1, true);
    }
}

/**
 * Handles the contextmenu event on a status icon by decrementing the status 
 *  counter by 1 and updating the token accordingly.
 * @param {jQuery.Event} event The mouse right click event triggered by jQuery.
 */
function onEffectRightClick(event) {
    if (ui.context) ui.context.close();
    changeIconCounter(event, this, -1, true);
}

/**
 * Handles the mouseover event onto a status icon to store the active entity so 
 *  that it can be accessed by the global key event handler.
 * @param {jQuery.Event} event The mouse over event triggered by jQuery.
 */
function onEffectMouseOver(event) {
    activeEffectHud = this;
    activeEffectHudIcon = event.currentTarget;
}

/**
 * Handles the mouseout event off a status icon to reset the active entity so 
 *  that it can no longer be accessed by the global key event handler.
 */
function onEffectMouseOut() {
    if (activeEffectHud === this) {
        activeEffectHud = activeEffectHudIcon = null;
    }
}

/**
 * Handles the keydown event for the currently active status icon HUD element. 
 *  If none is active or the key is not a digit, this handler returns 
 *  immediately. Otherwise, the pressed digit is set as the counter for the 
 *  active status icon and the associated token is updated accordingly.
 *  Note that this handler modifies the event target and stops propagation if 
 *  any counters are changed.
 * @param {jQuery.Event} event The key down event triggered by jQuery.
 */
export const onEffectKeyDown = function (event) {
    if (!activeEffectHud || !activeEffectHud.object.visible) return;

    let keyValue = parseInt(event.key);
    if (Number.isNaN(keyValue)) return;

    event.currentTarget = activeEffectHudIcon;
    event.stopPropagation();
    changeIconCounter(event, activeEffectHud, keyValue, false);
}

/**
 * Attempts to retreive the source image path from the event target.
 * @param {jQuery.Event} event The event triggered by jQuery.
 */
function findIconPath(event) {
    return $(event.currentTarget).attr("src");
}

/**
 * Modifies a status counter by adding, subtracting or setting the new value 
 *  based on the element associated with the event. If the status is inactive, 
 *  it is toggled or applied as an overlay (replicating the default Foundry 
 *  behavior).
 * @param {jQuery.Event} event The event triggered by jQuery.
 * @param {TokenHUD} tokenHud The Foundry entity associated with the event.
 * @param {Number} value The counter value to apply. This can be negative for incremental usage.
 * @param {Boolean} incremental Flag to indicate whether the value should be set or added.
 */
function changeIconCounter(event, tokenHud, value, incremental) {
    // Don't increment by 0
    if (incremental && value == 0) return;

    const iconPath = findIconPath(event);
    const tokenDocs = getUniqueSelectedTokens(tokenHud.object).map(t => t.document);
    let baseHasOverlay;
    for (const tokenDoc of tokenDocs) {
        const effectIsActive = tokenDoc.effects.includes(iconPath);
        let effectCounter = EffectCounter.findCounter(tokenDoc, iconPath);

        // Don't initialize with negative or 0 values
        if (value <= 0 && !effectCounter) {
            if (effectIsActive) toggleEffect(tokenDoc.object, event, false);
            else if (incremental && (tokenDoc === tokenHud.object.document
                || (baseHasOverlay ??= hasOverlay(tokenHud.object.document, iconPath)) === hasOverlay(tokenDoc, iconPath))) {
                toggleEffect(tokenDoc.object, event, true);
            }
            continue;
        }

        if (!effectCounter) {
            // Do not allow parallel execution of effect creation to prevent inconsistent data.
            if (creationState.has(tokenDoc.id)) {
                console.warn("statuscounter | Prevented parallel effect creation.");
                continue;
            }

            effectCounter = event.currentTarget.dataset.statusId
                ? new ActiveEffectCounter(value, iconPath, tokenDoc)
                : new EffectCounter(value, iconPath, tokenDoc);
            creationState.add(tokenDoc.id);
            effectCounter.update(tokenDoc).finally(() => creationState.delete(tokenDoc.id));
        } else {
            const newValue = incremental ? (value + effectCounter.getValue(tokenDoc) ?? 0) : value;
            effectCounter.setValue(newValue, tokenDoc);
        }
    }

    return false;
}

/**
 * Toggles an effect using FoundryVTT workflows regardless of whether a HUD is currently active.
 * @param {Token} token The token to toggle the effect on.
 * @param {jQuery.Event} event The event that triggered the toggle.
 * @param {boolean} overlay Indicates whether the effect should be an overlay.
 * @returns {Promise} A promise representing the operation.
 */
function toggleEffect(token, event, overlay) {
    return TokenHUD.prototype._onToggleEffect.apply({ object: token }, [event, { overlay }]);
}

/**
 * Returns tokens to consider for input operations. If the multi select setting is enabled, this returns all selected
 * tokens that have a unique actor. Otherwise, it returns the reference token.
 * @param {Token} token The reference token.
 * @returns {Token[]} Associated tokens that have a unique actor.
 */
function getUniqueSelectedTokens(token) {
    return game.settings.get("statuscounter", "multiSelect")
        ? [...new Map(canvas.tokens.controlled.map(t => [t.actor?.id, t])).values()]
        : [token];
}

/**
 * Checks if the given token document has an overlay effect matching the given icon path.
 * @param {TokenDocument} tokenDoc The token document to check.
 * @param {string} icon The icon path of the effect.
 * @returns {boolean} True if the effect exists as an overlay, false otherwise.
 */
function hasOverlay(tokenDoc, icon) {
    return tokenDoc.overlayEffect === icon
        || tokenDoc.actor.effects.some(e => e.flags.core?.overlay && e.icon === icon);
}