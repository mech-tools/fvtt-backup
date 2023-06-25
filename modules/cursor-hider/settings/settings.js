import extraTypes from '../../settings-extender/settings-extender.js';
import {migrate, MigrationResult} from './migration.js';
import Constants from '../constants.js';



/**
 * May only be called after the foundry game.settings object is fully initialized
 * @returns {Promise<GuiOptions>}
 */
export default async function setupSettings(foundryGame) {
	const settings = {};
	registerCursorHiderSettings(foundryGame, settings);
	const migrationResult = await migrate(foundryGame);
	if (migrationResult === MigrationResult.FAILED) {
		alert('The settings of the "Cursor Hider" module could not be updated after you or your GM installed a new ' +
			'version. If you encounter any issues or this message keeps showing up, please disable the module ' +
			'and contact me on Discord (AzzuriteTV) or file an issue at ' +
			'https://gitlab.com/foundry-azzurite/cursor-hider/issues. An error description should be in your browser ' +
			'console, please include it when filing the issue.');
	} else if (typeof migrationResult === 'string' && migrationResult !== 'firstRun') {
		ChatMessage.create({
			speaker: {alias: 'Cursor Hider Module Notification'},
			content: `You have updated the Cursor Hider module to v${migrationResult}. The module settings ` +
				'structure has changed, so the settings were successfully migrated. You may have to reload this ' +
				'page for the settings menu to work correctly.',
			whisper: [foundryGame.user.id],
			timestamp: Date.now()
		});
	}
	return settings;
}

function isFirstRun(foundryGame) {
	foundryGame.settings.register(Constants.MODULE_NAME, Constants.LAST_VERSION, {
		config: false,
		scope: 'client',
		type: String,
		default: ''
	});
	return !foundryGame.settings.get(Constants.MODULE_NAME, Constants.LAST_VERSION);
}

function registerCursorHiderSettings(foundryGame, settings) {

	function register(key, data) {
		const dataWithDefaults = {
			scope: 'client',
			type: String,
			config: true,
			...data
		};
		defineSetting(key, dataWithDefaults.type);
		foundryGame.settings.register(Constants.MODULE_NAME, key, dataWithDefaults);
	}

	function defineSetting(key, type) {
		const get = () => foundryGame.settings.get(Constants.MODULE_NAME, key);
		const set = (val) => foundryGame.settings.set(Constants.MODULE_NAME, key, val);
		let getset;
		if (type.parse && Object.values(extraTypes).includes(type)) {
			getset = {
				get: () => type.parse(get()),
				set: (val) => set(type.format(val))
			};
		} else {
			getset = {
				get,
				set
			};
		}
		if (!settings.hasOwnProperty(key)) Object.defineProperty(settings, key, getset);
	}

	const choices = Object.entries(CONST.USER_ROLES)
		.filter(([key, val]) => val !== 0)
		.reduce((choices, [permission, val]) => {
			choices[val] = permission;
			return choices;
		}, {});
	register(Constants.MINIMUM_PERMISSION, {
		name: foundryGame.i18n.localize('CURSOR-HIDER.minimumPermission.title'),
		hint: foundryGame.i18n.localize('CURSOR-HIDER.minimumPermission.hint'),
		default: 1,
		isSelect: true,
		choices: choices,
		type: Number,
		scope: "world",
		onChange() {
			if (!foundryGame.user.hasRole(CONST.USER_ROLES.GAMEMASTER)) {
				window.location.reload();
			}
		}
	});

	const minPermission = settings[Constants.MINIMUM_PERMISSION];
	if (foundryGame.user.hasRole(minPermission)) {
		register('toggleCursor', {
			name: foundryGame.i18n.localize('CURSOR-HIDER.toggleCursor.title'),
			hint: foundryGame.i18n.localize('CURSOR-HIDER.toggleCursor.hint'),
			default: 'Alt + c',
			type: extraTypes.KeyBinding
		});
		register('hideByDefault', {
			name: foundryGame.i18n.localize('CURSOR-HIDER.hideByDefault.title'),
			hint: foundryGame.i18n.localize('CURSOR-HIDER.hideByDefault.hint'),
			default: false,
			type: Boolean
		})
	}
	register('showIconAlways', {
		name: foundryGame.i18n.localize('CURSOR-HIDER.showIconAlways.title'),
		hint: foundryGame.i18n.localize('CURSOR-HIDER.showIconAlways.hint'),
		default: false,
		type: Boolean
	});

}


