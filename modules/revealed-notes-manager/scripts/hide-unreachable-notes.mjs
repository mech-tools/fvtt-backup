//
// Handle correct visibility of Notes on a Scene
//

import {libWrapper} from './libwrapper-shim.js'

const MODULE_NAME = "revealed-notes-manager";
const USE_PIN_REVEALED = "usePinRevealed";
const PIN_IS_REVEALED  = "pinIsRevealed";
const FLAG_IS_REVEALED  = `flags.${MODULE_NAME}.${PIN_IS_REVEALED}`;
const FLAG_USE_REVEALED = `flags.${MODULE_NAME}.${USE_PIN_REVEALED}`;
const CONFIG_TINT_REACHABLE_LINK   = "tintReachableLink";
const CONFIG_TINT_UNREACHABLE_LINK = "tintUnreachableLink";
const CONFIG_TINT_UNREVEALED = "tintUnrevealed";
const CONFIG_TINT_REVEALED   = "tintRevealed";

/**
 * Wraps the default Note#isVisible to allow the visibility of scene Notes to be controlled by the reveal
 * state stored in the Note (overriding the default visibility which is based on link accessibility).
 * @param {function} [wrapped] The wrapper function provided by libWrapper
 * @param {Object}   [args]    The arguments for Note#refresh
 * @return [Note]    This Note
 */
function Note_isVisible(wrapped, ...args) {
/*
We only want to change the check of testUserPermission here
Note#isVisible()
    const accessTest = this.page ? this.page : this.entry;
    const access = accessTest?.testUserPermission(game.user, "LIMITED") ?? true;
    if ( (access === false) || !canvas.effects.visibility.tokenVision || this.document.global ) return access;
    const point = {x: this.document.x, y: this.document.y};
    const tolerance = this.document.iconSize / 4;
    return canvas.effects.visibility.testVisibility(point, {tolerance, object: this});
*/	
	// See if reveal state is enabled for this note.
	if (!this.document.getFlag(MODULE_NAME, USE_PIN_REVEALED)) return wrapped(...args);

	// Replace the testUserPermission test of Note#isVisible
	const access = this.document.getFlag(MODULE_NAME, PIN_IS_REVEALED);
	// Standard version of Note#isVisible
    if ( (access === false) || !canvas.effects.visibility.tokenVision || this.document.global ) return access;
    const point = {x: this.document.x, y: this.document.y};
    const tolerance = this.document.iconSize / 4;
    return canvas.effects.visibility.testVisibility(point, {tolerance, object: this});
}

/**
 * Wraps the default Note#_drawControlIcon so that we can override the stored icon tint based
 * on whether the link is accessible for the current player (or not). This is only done for links which
 * are using the "revealed" flag.
 * @param {function} [wrapped] The wrapper function provided by libWrapper
 * @param {Object}   [args]    The arguments for Note#_drawControlIcon
 * @return [Note]    This Note
 */

function Note_drawControlIcon(wrapped, ...args) {
	if (!this.document.getFlag(MODULE_NAME, USE_PIN_REVEALED)) return wrapped(...args);
	
	const value = this.document.getFlag(MODULE_NAME, PIN_IS_REVEALED);
	if (value == undefined) return wrapped(...args);

	const is_linked = this.entry?.testUserPermission(game.user, CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED);
	const colour = game.settings.get(MODULE_NAME, is_linked ? CONFIG_TINT_REACHABLE_LINK : CONFIG_TINT_UNREACHABLE_LINK);
	if (!colour?.length) return wrapped(...args);
	
	// Temporarily set the icon tint
	const saved = this.document.texture.tint;
	this.document.texture.tint = colour;
	const result = wrapped(...args);
	this.document.texture.tint = saved;
	return result;
}

// Replacement for Note#_drawControlIcon for GMs, to show which pins are revealed.
function Note_drawControlIconGM(wrapped, ...args) {
	if (!this.document.getFlag(MODULE_NAME, USE_PIN_REVEALED)) return wrapped(...args);
	
	const is_revealed = this.document.getFlag(MODULE_NAME, PIN_IS_REVEALED);
	if (is_revealed == undefined) return wrapped(...args);

	const colour = game.settings.get(MODULE_NAME, is_revealed ? CONFIG_TINT_REVEALED : CONFIG_TINT_UNREVEALED);
	if (!colour?.length) return wrapped(...args);
	
	// Temporarily set the icon tint
	const saved = this.document.texture.tint;
	this.document.texture.tint = colour;
	const result = wrapped(...args);
	this.document.texture.tint = saved;
	return result;
}

/**
 * Sets whether this Note is revealed (visible) to players; overriding the default FoundryVTT rules.
 * The iconTint will also be set on the Note based on whether there is a link that the player can access.
 * If this function is never called then the default FoundryVTT visibility rules will apply
 * @param [NoteData] [notedata] The NoteData whose visibility is to be set (can be used before the Note has been created)
 * @param {Boolean}  [visible]  pass in true if the Note should be revealed to players
 */
export function setNoteRevealed(notedata,visible) {
	// notedata might not exist as a Note, so setFlag is not available
	setProperty(notedata, FLAG_USE_REVEALED, true);
	setProperty(notedata, FLAG_IS_REVEALED,  visible);
}

Hooks.once('canvasInit', () => {
	// This is only required for Players, not GMs (game.user accessible from 'ready' event but not 'init' event)
	if (!game.user.isGM) {
		libWrapper.register(MODULE_NAME, 'Note.prototype.isVisible',        Note_isVisible,       libWrapper.MIXED);
		libWrapper.register(MODULE_NAME, 'Note.prototype._drawControlIcon', Note_drawControlIcon, libWrapper.WRAPPER);
	} else {
		libWrapper.register(MODULE_NAME, 'Note.prototype._drawControlIcon', Note_drawControlIconGM, libWrapper.WRAPPER);
	}
})

//
// Update NoteConfig to handle REVEALED state
//

/**
 * Update Note config window with a text box to allow entry of GM-text.
 * Also replace single-line of "Text Label" with a textarea to allow multi-line text.
 * @param {NoteConfig} app    The Application instance being rendered (NoteConfig)
 * @param {jQuery} html       The inner HTML of the document that will be displayed and may be modified
 * @param {object] data       The object of data used when rendering the application (from NoteConfig#getData)
 */
Hooks.on("renderNoteConfig", async function (app, html, data) {
	// Check box to control use of REVEALED state
	let checked = (data.document.getFlag(MODULE_NAME, PIN_IS_REVEALED) ?? true) ? "checked" : "";
	let revealed_control = $(`<div class='form-group'><label>Revealed to Players</label><div class='form-fields'><input type='checkbox' name='${FLAG_IS_REVEALED}' ${checked}></div></div>`)
	html.find("select[name='entryId']").parent().parent().after(revealed_control);
	
	// Check box for REVEALED state
	let use_reveal = (data.document.getFlag(MODULE_NAME, USE_PIN_REVEALED) ?? false) ? "checked" : "";
	let mode_control = $(`<div class='form-group'><label>Use Reveal State</label><div class='form-fields'><input type='checkbox' name='${FLAG_USE_REVEALED}' ${use_reveal}></div></div>`)
	html.find("select[name='entryId']").parent().parent().after(mode_control);
	
	// Force a recalculation of the height
	if (!app._minimized) {
		let pos = app.position;
		pos.height = 'auto'
		app.setPosition(pos);
	}
})

Hooks.on("renderSettingsConfig", (app, html, data) => {
	// Add colour pickers to the Configure Game Settings: Module Settings menu
	let name,colour;
	name   = `${MODULE_NAME}.${CONFIG_TINT_REACHABLE_LINK}`;
	colour = game.settings.get(MODULE_NAME, CONFIG_TINT_REACHABLE_LINK);
	$('<input>').attr('type', 'color').attr('data-edit', name).val(colour).insertAfter($(`input[name="${name}"]`, html).addClass('color'));
	
	name   = `${MODULE_NAME}.${CONFIG_TINT_UNREACHABLE_LINK}`;
	colour = game.settings.get(MODULE_NAME, CONFIG_TINT_UNREACHABLE_LINK);
	$('<input>').attr('type', 'color').attr('data-edit', name).val(colour).insertAfter($(`input[name="${name}"]`, html).addClass('color'));
	
	name   = `${MODULE_NAME}.${CONFIG_TINT_REVEALED}`;
	colour = game.settings.get(MODULE_NAME, CONFIG_TINT_REVEALED);
	$('<input>').attr('type', 'color').attr('data-edit', name).val(colour).insertAfter($(`input[name="${name}"]`, html).addClass('color'));
	
	name   = `${MODULE_NAME}.${CONFIG_TINT_UNREVEALED}`;
	colour = game.settings.get(MODULE_NAME, CONFIG_TINT_UNREVEALED);
	$('<input>').attr('type', 'color').attr('data-edit', name).val(colour).insertAfter($(`input[name="${name}"]`, html).addClass('color'));
})

function refresh () {
	if (canvas?.ready) {
		console.warn('NOTES:refresh called');
		canvas.notes.placeables.forEach(note => note.draw());
		//for (let note of canvas.notes.objects) note.draw();
	}
}

Hooks.once('init', () => {
	globalThis.setNoteRevealed = setNoteRevealed;
    game.settings.register(MODULE_NAME, CONFIG_TINT_REACHABLE_LINK, {
		name: "Linked Icon Tint",
		hint: "For PLAYERs, the RGB value to be used to tint scene Notes if they have a reachable link (if left blank then the tint, if any, will remain unchanged).",
		scope: "world",
		type:  String,
		default: '#7CFC00',
		config: true,
		onChange: () => refresh()
	});
    game.settings.register(MODULE_NAME, CONFIG_TINT_UNREACHABLE_LINK, {
		name: "Not-linked Icon Tint",
		hint: "For PLAYERs, the RGB value to be used to tint scene Notes if they do not have a reachable link (if left blank then the tint, if any, will remain unchanged).",
		scope: "world",
		type:  String,
		default: '#c000c0',
		config: true,
		onChange: () => refresh()
	});
    game.settings.register(MODULE_NAME, CONFIG_TINT_REVEALED, {
		name: "Revealed Icon Tint",
		hint: "For GMs, the RGB value to be used to tint scene Notes if they have been revealed to players (if left blank then the tint, if any, will remain unchanged)",
		scope: "world",
		type:  String,
		default: '#ffff00',
		config: true,
		onChange: () => refresh()
	});
    game.settings.register(MODULE_NAME, CONFIG_TINT_UNREVEALED, {
		name: "Not-revealed Icon Tint",
		hint: "For GMs, the RGB value to be used to tint scene Notes if they have not been revealed to players (if left blank then the tint, if any, will remain unchanged)",
		scope: "world",
		type:  String,
		default: '#ff0000',
		config: true,
		onChange: () => refresh()
	});
})