import setupSettings from './settings/settings.js';
import {addCursorHiderBehavior, hideCursor, showCursor} from './cursor-hider.js';

async function preRequisitesReady() {
	return Promise.all([areSettingsLoaded(), isCanvasReady()]);
}

async function areSettingsLoaded() {
	return new Promise(resolve => {
		Hooks.once('ready', () => {
			resolve(setupSettings(game));
		});
	});
}

async function isCanvasReady() {
	return new Promise(resolve => {
		Hooks.once('canvasReady', resolve);
	});
}

(async () => {
	const [settings] = await preRequisitesReady();
	window.Azzu = window.Azzu || {};
	addCursorHiderBehavior(game, settings);
	window.Azzu.CursorHider = {};
	window.Azzu.CursorHider.showCursor = showCursor;
	window.Azzu.CursorHider.hideCursor = hideCursor;
})();
