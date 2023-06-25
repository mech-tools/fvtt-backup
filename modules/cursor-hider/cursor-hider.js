import {KeyBinding} from '../settings-extender/settings-extender.js';
import Const from './constants.js';

const hiddenUsers = new Set();

function addCursorHiderBehavior(foundryGame, settings) {
	patchControlsLayer(hiddenUsers);

	Net.onUserHidden((userId) => {
		addHiddenUser(hiddenUsers, userId);
		hideCanvasCursor(userId);
	});
	Net.onUserShown((userId) => {
		deleteHiddenUser(hiddenUsers, userId);
	});
	window.addEventListener('keydown', (e) => {
		if (isAnElementFocused()) {
			return;
		}

		const binding = settings.toggleCursor;
		const noPermission = !binding;
		if (noPermission || !KeyBinding.eventIsForBinding(e, binding)) {
			return;
		}

		toggleCursor();
	});
	updatePlayerListControls(foundryGame, settings, $(`#player-list`));
	Hooks.on('renderPlayerList', (playerList, $html, data) => {
		updatePlayerListControls(foundryGame, settings, $html);
	});
	setInterval(() => {
		if (hiddenUsers.has(foundryGame.user.id)) {
			Net.hideCursor();
		}
	}, 5000);

	if (settings.hideByDefault) {
		hideCursor(hiddenUsers);
	}
}

function updatePlayerListControls(foundryGame, settings, $html) {
	$html.find(`.cursorhider`).remove();
	$html.find(`.player`).each((idx, elem) => {
		const userId = elem.dataset.userId;
		const isHidden = hiddenUsers.has(userId);
		const styles = `flex:0 0 17px;width:17px;height:16px;border:0`;
		const src = isHidden ? `modules/cursor-hider/img/nocursor.png` : `modules/cursor-hider/img/cursor.png`;
		const alt = isHidden ? `Cursor is being hidden` : `Cursor is being shown`;
		const $img = $(`<img class=cursorhider style="${styles}" src="${src}" alt="${alt}" title="${alt}" />`);
		if (!settings.showIconAlways) {
			$img.css(`visibility`, `hidden`);
			$html.on(`mouseenter`, () => {
				$img.css(`visibility`, `visible`);
			})
			$html.on(`mouseleave`, () => {
				$img.css(`visibility`, `hidden`);
			})
		}
		if (userId === foundryGame.user.id && foundryGame.user.hasRole(settings[Const.MINIMUM_PERMISSION])) {
			$img.css(`cursor`, `pointer`);
			$img.on(`click`, toggleCursor);
		}
		$(elem).append($img);
	});
}

function isAnElementFocused() {
	return !!$(':focus').length;
}

function hideCursor() {
	Net.hideCursor();
	addHiddenUser(hiddenUsers, game.user.id);
}

function showCursor() {
	Net.showCursor();
	deleteHiddenUser(hiddenUsers, game.user.id);
	Net.broadcastCursorPos();
}

function toggleCursor() {
	if (hiddenUsers.has(game.user.id)) {
		showCursor(hiddenUsers);
	} else {
		hideCursor(hiddenUsers);
	}
}

function addHiddenUser(hiddenUsers, userId) {
	hiddenUsers.add(userId);
	ui.players.render();
}
function deleteHiddenUser(hiddenUsers, userId) {
	hiddenUsers.delete(userId);
	ui.players.render();
}

function getMousePos(){
	const mouse = canvas.app.renderer.events.pointer.global;
	const t = canvas.controls.worldTransform;
	function calcCoord(axis) {
		return (mouse[axis] - t['t' + axis]) / canvas.stage.scale[axis];
	}
	return {
		x: calcCoord('x'),
		y: calcCoord('y')
	};
}

function hideCanvasCursor(userId) {
	const cursor = canvas.controls._cursors[userId];
	if (cursor) {
		cursor.visible = false;
	}
}

function patchControlsLayer(hiddenUsers) {
	libWrapper.register(Const.MODULE_NAME, 'ControlsLayer.prototype.updateCursor', (wrapped, ...args) => {
		const user = args[0];
		if (hiddenUsers.has(user.id)) return;
		wrapped(...args);
	}, 'MIXED');

	libWrapper.register(Const.MODULE_NAME, 'ControlsLayer.prototype._onMouseMove', (wrapped, ...args) => {
		if (hiddenUsers.has(game.user.id)) return;
		wrapped(...args);
	}, 'MIXED')
}

class Net {
	static get SOCKET_NAME() {
		return 'module.cursor-hider';
	}

	static _emit(...args) {
		game.socket.emit(Net.SOCKET_NAME, ...args)
	}

	static hideCursor() {
		Net._emit({
			cmd: 'hideCursor',
			userId: game.user.id
		});
	}

	static showCursor() {
		Net._emit({
			cmd: 'showCursor',
			userId: game.user.id
		});
	}

	static onUserHidden(func) {
		game.socket.on(Net.SOCKET_NAME, (data) => {
			if (data.cmd !== 'hideCursor') return;
			func(data.userId);
		});
	}

	static onUserShown(func) {
		game.socket.on(Net.SOCKET_NAME, (data) => {
			if (data.cmd !== 'showCursor') return;
			func(data.userId);
		});
	}

	static broadcastCursorPos() {
		canvas.controls._onMouseMove({
			getLocalPosition() { return getMousePos(); }
		});
	}
}

export {
	showCursor,
	hideCursor,
	toggleCursor,
	addCursorHiderBehavior
}
