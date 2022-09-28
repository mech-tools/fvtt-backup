import { ActiveEffectCounter, EffectCounter, CounterTypes } from "./api.js";

/**
 * Initializes the active effect multiplier type.
 */
export const registerMultiplier = function() {
    CounterTypes.addType("statuscounter.multiplier",
        null, setMultiplierValue, canSelectMultiplier);
}

/**
 * Determines if the multiplier type can be selected for the given counter.
 * @param {EffectCounter} counter The counter to determine the menu entry visibility for.
 * @param {Token | ActiveEffect} parent The parent entity of the counter.
 * @returns {boolean} True if the active effect of the counter has a numeric change (which is any
 *  active effect change with mode ADD or MULTIPLY), false otherwise.
 */
function canSelectMultiplier(counter, parent) {
    if (!(counter instanceof ActiveEffectCounter)) return false;
    if (!(parent.changes && parent.changes.length > 0)) return false;

    let hasNumericChange = false;
    const modes = CONST.ACTIVE_EFFECT_MODES;
    for (let change of parent.changes) {
        if (change.mode === modes.ADD || change.mode === modes.MULTIPLY) {
            hasNumericChange = true;
            break;
        }
    }

    return hasNumericChange;
}

/**
 * Sets the value by which numeric active effects will be multiplied.
 * @param {EffectCounter} counter The counter to set the value on.
 * @param {number} value The multiplier to set.
 * @param {ActiveEffect} effect The parent entity of the counter.
 */
function setMultiplierValue(counter, value, effect) {
    if (value <= 0) return null;
    counter.value = value;
    counter.visible = true;

    const modes = CONST.ACTIVE_EFFECT_MODES;
    for (let change of effect.changes) {
        if (typeof(change.value) !== "number" || change.value === 0) continue;

        // Ignore custom, override, upgrade and downgrade
        switch (change.mode) {
            case modes.ADD:
                if (!change.originalValue) change.originalValue = change.value;
                change.value = change.originalValue * counter.value;
                break;
            case modes.MULTIPLY:
                if (!change.originalValue) change.originalValue = change.value;
                let anchor = change.value > 0 ? 1 : -1;
                let diff = change.value - anchor;
                change.value = anchor + diff * counter.value;
                break;
        }
    }

    return true;
}