import Constants from './constants.js';
import { ItemEffectsToChat5e } from './item-effects-to-chat-5e.js';

/**
 * Handles setting up all handlebar helpers
 */
export default class HandlebarHelpers {
    /**
     * Registers the handlebar helpers
     */
    registerHelpers() {
        this._registerDurationLabelHelper();
        this._registerHideNameDetector();
        this._registerIfCond()
    }

    _registerDurationLabelHelper() {
        Handlebars.registerHelper(
            'durationLabel',
            (effect, item, _options) => {
                let duration;

                if (effect.duration?.rounds && effect.duration?.rounds > 0) {
                    duration = `${effect.duration?.rounds}rounds`;
                } else if (effect.duration?.turns && effect.duration?.turns > 0) {
                    duration = `${effect.duration?.turns}turns`;
                } else if (effect.duration?.seconds && effect.duration?.seconds > 0) {
                    duration = effect.duration?.seconds;
                } else if (game.modules.get('dae')?.active && item.data?.data?.duration?.units && item.data?.data?.duration?.value && item.data?.data?.duration?.value > 0) {
                    switch (item.data.data.duration?.units) {
                        case 'round':
                            duration = `${item.data.data.duration.value}rounds`;
                            break;
                        case 'turn':
                            duration = `${item.data.data.duration.value}turns`;
                            break;
                        case 'minute':
                            duration = item.data.data.duration.value * 60;
                            break;
                        case 'hour':
                            duration = item.data.data.duration.value * 3600;
                            break;
                        case 'day':
                            duration = item.data.data.duration.value * 3600 * 24;
                            break;
                        case 'month':
                            duration = item.data.data.duration.value * 3600 * 24 * 30;
                            break;
                        case 'year':
                            duration = item.data.data.duration.value * 3600 * 24 * 365;
                            break;
                        default:
                            break;
                    }
                } else {
                    duration = Infinity;
                }

                if (duration == Infinity) {
                    return game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.UNLIMITED`);
                } else if (/^1turns$/.test(duration)) {
                    return `1 ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.ONE_TURN`)}`
                } else if (/^([0-9]+)turns$/.test(duration)) {
                    return `${duration.match(/^([0-9]+)turns$/)[1]} ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.MULTIPLE_TURNS`)}`
                } else if (/^1rounds$/.test(duration)) {
                    return `1 ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.ONE_ROUND`)}`
                } else if (/^([0-9]+)rounds$/.test(duration)) {
                    return `${duration.match(/^([0-9]+)rounds$/)[1]} ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.MULTIPLE_ROUNDS`)}`
                } else if (duration >= Constants.SECONDS.IN_TWO_YEARS) {
                    return `${Math.floor(
                        duration / Constants.SECONDS.IN_ONE_YEAR
                    )} ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.MULTIPLE_YEARS`)}`;
                } else if (duration >= Constants.SECONDS.IN_ONE_YEAR) {
                    return `1 ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.ONE_YEAR`)}`;
                } else if (duration >= Constants.SECONDS.IN_TWO_WEEKS) {
                    return `${Math.floor(
                        duration / Constants.SECONDS.IN_ONE_WEEK
                    )} ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.MULTIPLE_WEEKS`)}`;
                } else if (duration > Constants.SECONDS.IN_ONE_WEEK) {
                    return `1 ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.ONE_WEEK`)}`;
                } else if (duration >= Constants.SECONDS.IN_TWO_DAYS) {
                    return `${Math.floor(
                        duration / Constants.SECONDS.IN_ONE_DAY
                    )} ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.MULTIPLE_DAYS`)}`;
                } else if (duration > Constants.SECONDS.IN_TWO_HOURS) {
                    return `${Math.floor(
                        duration / Constants.SECONDS.IN_ONE_HOUR
                    )} ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.MULTIPLE_HOURS`)}`;
                } else if (duration > Constants.SECONDS.IN_TWO_MINUTES) {
                    return `${Math.floor(
                        duration / Constants.SECONDS.IN_ONE_MINUTE
                    )} ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.MULTIPLE_MINUTES`)}`;
                } else if (duration >= 2) {
                    return `${duration} ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.MULTIPLE_SECONDS`)}`;
                } else if (duration === 1) {
                    return `1 ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.ONE_SECOND`)}`;
                } else {
                    return game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.DURATION.UNLIMITED`);
                }
            }
        );
    }

    _registerHideNameDetector() {
        Handlebars.registerHelper(
            'hideNameDetector',
            (token, _options) => {
                if (game.modules.get('combat-utility-belt')?.active &&
                    !game.user.isGM &&
                    game.settings.get('combat-utility-belt', 'enableHideNPCNames') &&
                    game.cub.hideNames.constructor.shouldReplaceName(token.actor)
                ) {
                    return game.cub.hideNames.constructor.getReplacementName(token.actor)
                } else {
                    return token.data.name;
                }
            }
        );
    }

    _registerIfCond() {
        Handlebars.registerHelper('isSelf', function(effect, options) {
            if(
                (effect.parent?.data?.data?.target?.type === "self" && !effect.data?.flags?.[ItemEffectsToChat5e.MODULE_NAME].target) ||
                effect.data?.flags?.[ItemEffectsToChat5e.MODULE_NAME].self
            ) {
              return options.fn(this);
            }
            return options.inverse(this);
          });
    }
}