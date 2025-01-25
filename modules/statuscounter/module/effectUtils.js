import { DurationType } from "./durationType.js";

/**
 * Returns the first effect with the given image path for the given actor.
 * @param {Actor} actor The actor to read the effects from.
 * @param {string} img The image path of the status to retrieve.
 * @param {number?} index The amount of previous effects with that image. Defaults to 0 to return the first match.
 * @returns {ActiveEffect?} The n-th actor effect with the given image.
 */
export function findEffectByImg(actor, img, index = 0) {
    if (!actor) return null;

    const effects = [...actor.effects, ...actor.temporaryEffects];
    if (game.system.id === "sfrpg") effects.push(...actor.items.filter(item => item.type === "effect"));
    for (const effect of effects) {
        if (effect.img !== img) continue;
        if (index <= 0) return effect;
        index--;
    }

    return null;
}

/**
 * Returns the first effect with the given status id for the given actor.
 * @param {Actor} actor The actor to read the effects from.
 * @param {string} statusId The id of the status to retrieve.
 * @returns {ActiveEffect?}
 */
export function findEffectById(actor, statusId) {
    if (!actor) return null;
    let effect = actor.effects.find(effect => effect.statuses.has(statusId));
    if (game.system.id === "sfrpg") effect ??= actor.items.find(item => item.type === "effect" && item.name.toLowerCase() === statusId);
    effect ??= actor.temporaryEffects.find(effect => effect.statuses.has(statusId));
    return effect;
}

/**
 * Creates a duration for use in an ActiveEffect.
 * @param {number} value The duration to initialize.
 * @param {DurationType} type The type of the duration.
 * @returns {object} An effect duration object representing the value.
 */
export function createDuration(value, type) {
    const duration = {};
    if (type === DurationType.Round) {
        duration.rounds = value;
        duration.turns = 0;
    } else {
        duration.rounds = 0;
        duration.turns = value;
    }

    // Set start round and turn to current combat state.
    const combat = game.combat;
    if (combat && combat.active && combat.round !== 0) {
        duration.combat = combat._id;

        duration.startRound = combat.round ?? 1;
        duration.startTurn = combat.turn ?? 0;
    } else {
        duration.startRound = 1;
        duration.startTurn = 0;
    }

    return duration;
}
