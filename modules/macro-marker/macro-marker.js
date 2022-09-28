/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/utils/constants.ts
const CONSTANTS = Object.freeze({
    module: {
        name: 'macro-marker',
        title: 'Macro Marker'
    },
    hooks: {
        markerUpdated: 'macro-marker.markerUpdated'
    }
});
/* harmony default export */ var constants = (CONSTANTS);

// CONCATENATED MODULE: ./src/macros/macroMarkerFlags.ts

class Identifiable {
}
class macroMarkerFlags_MacroMarkerFlags {
    constructor(logger, macro) {
        this.logger = logger;
        this.macro = macro;
        this.key = 'markers';
    }
    addMarker(entity, isActive) {
        const existingMarkers = this.getMarkers();
        if (existingMarkers.type !== entity.markerType) {
            existingMarkers.markers = {};
            existingMarkers.type = entity.markerType;
        }
        existingMarkers.markers[entity.id] = isActive;
        return this.setMarkers(existingMarkers);
    }
    setMarkers(data) {
        this.logger.debug('Setting Marker', this.macro, data);
        return this.macro.setFlag(constants.module.name, this.key, data);
    }
    getMarkers() {
        const flags = this.macro.getFlag(constants.module.name, this.key) || { markers: {} };
        return duplicate(flags);
    }
    unsetMarkers() {
        return this.macro.unsetFlag(constants.module.name, this.key);
    }
}

// CONCATENATED MODULE: ./src/markerConfiguration/markerConfigurationFlags.ts

class markerConfigurationFlags_MarkerConfigurationFlags {
    constructor(logger, macro) {
        this.logger = logger;
        this.macro = macro;
        this.key = 'activeData';
    }
    getData() {
        const flags = this.macro.getFlag(constants.module.name, this.key) || {};
        return duplicate(flags);
    }
    setData(data) {
        return this.macro.setFlag(constants.module.name, this.key, data);
    }
}

// CONCATENATED MODULE: ./src/utils/logger.ts

class NotifiedLogger {
    constructor(logger) {
        this.logger = logger;
    }
    error(...message) {
        ui.notifications.error('Macro Marker: An error occurred, please check the console (F12).');
        this.logger.error(...message);
    }
    warn(...message) {
        ui.notifications.warn('Macro Marker: Warning! Please check the console (F12).');
        this.logger.warn(...message);
    }
    info(...message) {
        this.logger.info(...message);
    }
    debug(...message) {
        this.logger.debug(...message);
    }
}
class logger_ConsoleLogger {
    constructor() {
        this.prefix = `${constants.module.title} |`;
    }
    error(...message) {
        console.error.apply(null, [this.prefix, ...message]);
    }
    warn(...message) {
        console.warn.apply(null, [this.prefix, ...message]);
    }
    info(...message) {
        console.info.apply(null, [this.prefix, ...message]);
    }
    debug(...message) {
        console.debug.apply(null, [this.prefix, ...message]);
    }
}

// CONCATENATED MODULE: ./src/remoteExecutor.ts



const scope = `module.${constants.module.name}`;
class remoteExecutor_RemoteExecutor {
    constructor(logger, socket, currentUser, users) {
        this.logger = logger;
        this.socket = socket;
        this.currentUser = currentUser;
        this.users = users;
        this.pendingMessages = {};
    }
    static init(logger) {
        game.socket.on(scope, message => {
            const executor = remoteExecutor_RemoteExecutor.create(logger);
            executor.onMessage(message);
        });
    }
    static create(logger) {
        if (!remoteExecutor_RemoteExecutor._instance)
            remoteExecutor_RemoteExecutor._instance = new remoteExecutor_RemoteExecutor(logger, game.socket, game.user, game.users.entities);
        return remoteExecutor_RemoteExecutor._instance;
    }
    onMessage(message) {
        this.logger.debug('New/pending messages', message, Object.keys(this.pendingMessages));
        if (message.type === 'markerUpdated' && message.id in this.pendingMessages) {
            this.resolveUpdateMarkerRequest(message);
        }
        else if (message.type === 'updateMarker') {
            this.processUpdateMarkerRequest(message);
        }
    }
    updateMarker(macroId, isActive, flag) {
        const messageId = this.generateId();
        const executingGM = this.chooseExecutingGM();
        if (!executingGM) {
            this.logger.error('No GM online to update the marker.');
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            const message = {
                type: 'updateMarker',
                macroId: macroId,
                isActive: isActive,
                entity: {
                    type: flag.markerType,
                    id: flag.id
                },
                id: messageId,
                forGM: executingGM
            };
            const timeOut = setTimeout(() => {
                this.logger.error('Remote Execution | No response received after time-out.', messageId);
                delete this.pendingMessages[messageId];
                reject();
            }, 30000);
            function clearRes(res) {
                return (value) => {
                    clearTimeout(timeOut);
                    res(value);
                };
            }
            this.pendingMessages[messageId] = {
                resolve: clearRes(resolve),
                reject: clearRes(reject)
            };
            this.socket.emit(scope, message);
        });
    }
    resolveUpdateMarkerRequest(message) {
        if (message.error)
            this.pendingMessages[message.id].reject(message.error);
        else
            this.pendingMessages[message.id].resolve();
        delete this.pendingMessages[message.id];
    }
    processUpdateMarkerRequest(message) {
        const msg = message;
        if (!this.isExecutingGM(msg))
            return;
        const macro = game.macros.get(msg.macroId);
        if (!macro) {
            this.logger.error('Executing as GM | Macro not found', msg.macroId);
            this.confirmUpdate(msg, 'Macro not found');
            return;
        }
        const entity = { id: msg.entity.id, markerType: msg.entity.type };
        const logger = new NotifiedLogger(new logger_ConsoleLogger());
        const marker = new macroMarkerFlags_MacroMarkerFlags(logger, macro);
        marker.addMarker(entity, msg.isActive).then(() => this.confirmUpdate(msg));
    }
    confirmUpdate(message, error) {
        this.socket.emit(scope, Object.assign(Object.assign({}, message), { error, type: 'markerUpdated' }));
    }
    isExecutingGM(msg) {
        return game.user.id === msg.forGM;
    }
    chooseExecutingGM() {
        const gmIds = game.users.filter(u => u.isGM && u.active).map(u => u.id);
        const randIndex = Math.floor(Math.random() * gmIds.length);
        return gmIds[randIndex];
    }
    generateId(len = 8) {
        function dec2hex(dec) {
            return dec < 10
                ? '0' + String(dec)
                : dec.toString(16);
        }
        const arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, dec2hex).join('');
    }
}

// CONCATENATED MODULE: ./src/macros/macroMarker.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class macroMarker_MacroMarker {
    constructor(logger, user, listControlledTokens) {
        this.logger = logger;
        this.user = user;
        this.listControlledTokens = listControlledTokens;
    }
    getMarker(macro, token) {
        if (!macro) {
            this.logger.error('Get Marker | Macro is undefined.');
            return;
        }
        const entity = this.getLinkedEntity(token);
        const collection = new macroMarkerFlags_MacroMarkerFlags(this.logger, macro).getMarkers();
        switch (collection.type) {
            case 'Macro':
                return collection.markers[macro.id];
            case 'Token':
                return entity && collection.markers[entity.id];
            case 'User':
                return collection.markers[this.user.id];
        }
    }
    toggleTokenMacro(macro, token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.warn('toggleTokenMacro is deprecated and will soon be removed. Use `MacroMarker.toggle(macro, { entity: token })` instead.');
            return this._toggleTokenMacro(macro, token);
        });
    }
    toggleUserMacro(macro, user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.warn('toggleUserMacro is deprecated and will soon be removed. Use `MacroMarker.toggle(macro, { entity: user })` instead.');
            return this._toggleUserMacro(macro, user);
        });
    }
    toggleMacro(macro) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.warn('toggleMacro is deprecated and will soon be removed. Use `MacroMarker.toggle(macro)` instead.');
            return this._toggleWorldMacro(macro);
        });
    }
    isActive(macro, data) {
        return this.isActiveWithColour(macro, data).isActive;
    }
    isActiveWithColour(macro, data) {
        var _a;
        if (!macro) {
            this.logger.warn('IsActive | macro is undefined');
            return { isActive: false };
        }
        const trigger = this.evaluateTrigger(macro);
        if (trigger !== null)
            return trigger;
        const token = (data === null || data === void 0 ? void 0 : data.token) || (((_a = data === null || data === void 0 ? void 0 : data.entity) === null || _a === void 0 ? void 0 : _a.markerType) === 'Token' ? data.entity : undefined);
        const isActive = this.getMarker(macro, token) || false;
        return { isActive };
    }
    toggle(macro, data) {
        var _a;
        if (!macro) {
            this.logger.warn('Toggle | macro is undefined');
            return Promise.reject();
        }
        if ((data === null || data === void 0 ? void 0 : data.token) && data.user) {
            this.logger.warn('Markers cannot be set on both tokens and users.');
            Promise.reject();
        }
        if ((data === null || data === void 0 ? void 0 : data.token) || (data === null || data === void 0 ? void 0 : data.user)) {
            this.logger.warn('`toggle(macro, { token } and { user })` are deprecated and will soon be removed. Please use `MacroMarker.toggle(macro, { entity: token })` or `MacroMarker.toggle(macro, { entity: user })` instead.');
        }
        if (data && !(data === null || data === void 0 ? void 0 : data.entity)) {
            data.entity = (data === null || data === void 0 ? void 0 : data.token) || (data === null || data === void 0 ? void 0 : data.user);
        }
        const type = (_a = data === null || data === void 0 ? void 0 : data.entity) === null || _a === void 0 ? void 0 : _a.markerType;
        if ((data === null || data === void 0 ? void 0 : data.entity) && type === 'Token')
            return this._toggleTokenMacro(macro, data.entity);
        else if ((data === null || data === void 0 ? void 0 : data.entity) && type === 'User')
            return this._toggleUserMacro(macro, data.entity);
        return this._toggleWorldMacro(macro);
    }
    activate(macro, data) {
        if (!macro) {
            this.logger.warn('Activate | macro is undefined');
            return Promise.reject();
        }
        if (this.isActive(macro, data))
            return Promise.resolve(macro);
        return this.toggle(macro, data);
    }
    deactivate(macro, data) {
        if (!macro) {
            this.logger.warn('Deactivate | macro is undefined');
            return Promise.reject();
        }
        if (!this.isActive(macro, data))
            return Promise.resolve(macro);
        return this.toggle(macro, data);
    }
    getLinkedEntity(token) {
        return (token === null || token === void 0 ? void 0 : token.data.actorLink) && token.actor
            ? token.actor
            : token;
    }
    _toggleTokenMacro(macro, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!macro)
                this.logger.error('Toggle Token | Macro is undefined.');
            if (!token)
                this.logger.error('Toggle Token | Token is undefined.');
            if (!token || !macro)
                return Promise.reject();
            const entity = token.data.actorLink && token.actor
                ? token.actor
                : token;
            return this._toggleMacro(macro, entity);
        });
    }
    _toggleUserMacro(macro, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!macro)
                this.logger.error('Toggle User | Macro is undefined.');
            if (!user)
                this.logger.error('Toggle User | User is undefined.');
            if (!user || !macro)
                return Promise.reject();
            return this._toggleMacro(macro, user);
        });
    }
    _toggleWorldMacro(macro) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!macro) {
                this.logger.error('Toggle Macro | Macro is undefined.');
                return Promise.reject();
            }
            return this._toggleMacro(macro, macro);
        });
    }
    _toggleMacro(macro, flaggable) {
        return __awaiter(this, void 0, void 0, function* () {
            const flags = new macroMarkerFlags_MacroMarkerFlags(this.logger, macro);
            const existingMarker = flags.getMarkers().markers[flaggable.id];
            if (macro.hasPerm(game.user, CONST.ENTITY_PERMISSIONS.OWNER))
                return flags.addMarker(flaggable, !existingMarker)
                    .then(updatedFlaggable => {
                    Hooks.callAll(constants.hooks.markerUpdated, macro, flags.getMarkers()[macro.id]);
                    return updatedFlaggable;
                });
            const gm = remoteExecutor_RemoteExecutor.create(this.logger);
            return gm.updateMarker(macro.id, !existingMarker, flaggable)
                .then(() => {
                this.logger.debug('Remote execution completed.');
                Hooks.callAll(constants.hooks.markerUpdated, macro, flags.getMarkers()[macro.id]);
                return flaggable;
            });
        });
    }
    evaluateTrigger(macro) {
        const config = new markerConfigurationFlags_MarkerConfigurationFlags(this.logger, macro).getData();
        const selectedToken = this.listControlledTokens()[0];
        if (!config.trigger) {
            return null;
        }
        const trigger = Function(`return function(token, actor, character) { ${config.trigger} }`)();
        try {
            const result = trigger.call(macro, selectedToken, selectedToken === null || selectedToken === void 0 ? void 0 : selectedToken.actor, game.user.character);
            const isActive = !!result;
            const colour = typeof result === 'string' ? result : undefined;
            return { isActive, colour };
        }
        catch (error) {
            this.logger.error('Evaluate Trigger |', error);
            this.logger.info('Evaluate Trigger | Falling back to flags');
            return null;
        }
    }
}

// CONCATENATED MODULE: ./src/hotbar/markerToggler.ts

class markerToggler_MarkerToggler {
    constructor(macros, logger, settings, marker) {
        this.macros = macros;
        this.logger = logger;
        this.settings = settings;
        this.marker = marker;
        this.markerClass = 'macro-marker';
    }
    showMarkers(hotbar, token) {
        const slots = hotbar.querySelectorAll('li.macro');
        this.setCssVariables();
        for (const slot of [...slots]) {
            const macroId = slot.getAttribute('data-macro-id');
            const macro = macroId && this.macros.get(macroId);
            if (!macro)
                continue;
            this.updateMacroAppearance(macro, slot, token);
        }
    }
    showTooltip(li, token) {
        if (li.classList.contains('inactive'))
            return;
        const macroId = li.getAttribute('data-macro-id');
        if (!macroId) {
            this.logger.error('Show Tooltip | Cannot find data attribute on hotbar slot', li);
            return;
        }
        const macro = this.macros.get(macroId);
        if (!macro) {
            this.logger.error('Show Tooltip | Cannot find macro', macroId);
            return;
        }
        const isActive = this.marker.isActive(macro, { entity: token });
        const dataFlags = new markerConfigurationFlags_MarkerConfigurationFlags(this.logger, macro);
        if (!isActive)
            return;
        const tooltip = document.querySelector(`.macro.active[data-macro-id="${macroId}"] .tooltip`);
        tooltip.innerText = dataFlags.getData().tooltip || macro.name;
    }
    updateMacroAppearance(macro, slot, selectedToken) {
        const { isActive, colour } = this.marker.isActiveWithColour(macro, { entity: selectedToken });
        const configuration = new markerConfigurationFlags_MarkerConfigurationFlags(this.logger, macro).getData();
        if (colour)
            configuration.colour = colour;
        const img = slot.querySelector('img.macro-icon');
        const key = slot.querySelector('span.macro-key');
        if (isActive) {
            this.showMarker(macro, slot, configuration, img, key);
        }
        else {
            this.hideMarker(macro, slot, img, key);
        }
    }
    hideMarker(macro, slot, img, key) {
        slot.classList.remove(this.markerClass);
        slot.style.setProperty('color', 'black');
        if (img) {
            img.src = macro.data.img;
            img.style.setProperty('filter', `brightness(${this.settings.dimInactive || 100}%)`);
            this.fixSlotZIndex(slot, img, key);
        }
    }
    showMarker(macro, slot, configuration, img, key) {
        if (!slot.classList.contains(this.markerClass))
            slot.classList.add(this.markerClass);
        const colour = (configuration === null || configuration === void 0 ? void 0 : configuration.colour) && configuration.colour !== '#000000'
            ? configuration.colour
            : 'var(--macro-marker-color)';
        slot.style.setProperty('color', colour);
        if (img) {
            const inactiveImg = macro.data.img;
            const icon = configuration.icon;
            img.src = icon ? icon : inactiveImg;
            img.style.setProperty('filter', 'brightness(100%)');
            this.fixSlotZIndex(slot, img, key);
        }
    }
    fixSlotZIndex(slot, img, key) {
        slot.style.setProperty('z-index', img.style.getPropertyValue('z-index') + 1);
        if (key)
            key.style.setProperty('z-index', img.style.getPropertyValue('z-index') + 2);
    }
    setCssVariables() {
        document.documentElement.style.setProperty('--macro-marker-width', this.settings.borderWidth + 'px');
        document.documentElement.style.setProperty('--macro-marker-speed', this.settings.animationSpeed + 's');
        document.documentElement.style.setProperty('--macro-marker-color', this.settings.defaultColour);
    }
}

// CONCATENATED MODULE: ./src/controller.ts
var controller_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function renderMarkers(hotbar) {
    const logger = new NotifiedLogger(new logger_ConsoleLogger());
    const token = canvas.tokens.controlled[0];
    const hotbarMarker = new markerToggler_MarkerToggler(game.macros, logger, settings_Settings._load(), new macroMarker_MacroMarker(logger, game.user, () => canvas.tokens.controlled));
    hotbarMarker.showMarkers(hotbar, token);
    return true;
}
function renderHotbars() {
    const hotbar = document.getElementById('action-bar');
    const customHotbar = document.getElementById('custom-action-bar');
    [hotbar, customHotbar].filter(x => x).map(renderMarkers);
    return true;
}
function saveMacroConfiguration(macro, activeData) {
    const logger = new NotifiedLogger(new logger_ConsoleLogger());
    const flags = new markerConfigurationFlags_MarkerConfigurationFlags(logger, macro);
    const oldData = flags.getData();
    flags.setData(Object.assign(oldData, activeData));
    return true;
}
function updateColour(colour) {
    var _a;
    if (colour.startsWith('#'))
        return colour;
    const ctx = (_a = document.createElement('canvas')) === null || _a === void 0 ? void 0 : _a.getContext('2d');
    ctx.fillStyle = colour;
    const newColour = ctx.fillStyle;
    if (newColour.startsWith('#'))
        game.settings.set(constants.module.name, settings_Settings.keys.defaultColour, newColour);
    else
        ui.notifications.warn(`Macro Marker: Default colour '${colour}' is not a valid colour.`);
    return colour;
}
const timers = {};
function delayCallback(callback, ...args) {
    if (timers[callback.name])
        window.clearTimeout(timers[callback.name]);
    timers[callback.name] = window.setTimeout(() => callback(...args), 100);
}
function removeTokenFlags(id) {
    return controller_awaiter(this, void 0, void 0, function* () {
        for (const macro of game.macros.entities) {
            const flags = new macroMarkerFlags_MacroMarkerFlags(new logger_ConsoleLogger(), macro);
            const markers = flags.getMarkers();
            if (!(id in markers.markers))
                continue;
            delete markers.markers[id];
            yield flags.setMarkers(markers);
        }
    });
}

// CONCATENATED MODULE: ./src/utils/settings.ts


class settings_Settings {
    load(s) {
        this.animationSpeed = this.getSetting(s, settings_Settings.keys.animationSpeed);
        this.borderWidth = this.getSetting(s, settings_Settings.keys.borderWidth);
        this.defaultColour = this.getSetting(s, settings_Settings.keys.defaultColour);
        this.dimInactive = this.getSetting(s, settings_Settings.keys.dimInactiveMacros);
        return this;
    }
    static _load() {
        return new settings_Settings().load(game.settings);
    }
    getSetting(settings, key) {
        return settings.get(constants.module.name, key);
    }
}
settings_Settings.keys = {
    animationSpeed: 'animationSpeed',
    borderWidth: 'borderWidth',
    defaultColour: 'defaultColour',
    dimInactiveMacros: 'dimInactive'
};
function registerSettings() {
    game.settings.register(constants.module.name, settings_Settings.keys.dimInactiveMacros, {
        name: 'Inactive macro brightness',
        hint: 'Makes inactive macros on the hotbar less bright. Set to 100 to disable the effect.',
        scope: 'world',
        config: true,
        default: 65,
        type: Number,
        range: { min: 50, max: 100, step: 5 },
        onChange: renderHotbars
    });
    game.settings.register(constants.module.name, settings_Settings.keys.defaultColour, {
        name: 'Default colour',
        hint: 'The default colour for active macros. Must be a valid CSS colour (e.g. hex, rgba or named).',
        scope: 'world',
        config: true,
        default: '#ff0000',
        type: String,
        onChange: colour => {
            updateColour(colour);
            renderHotbars();
        }
    });
    game.settings.register(constants.module.name, settings_Settings.keys.borderWidth, {
        name: 'Border width',
        hint: 'The width for the active macro border.',
        scope: 'world',
        config: true,
        default: 2,
        type: Number,
        range: { min: 1, max: 4, step: 1 },
        onChange: renderHotbars
    });
    game.settings.register(constants.module.name, settings_Settings.keys.animationSpeed, {
        name: 'Animation speed',
        hint: 'The number of second it takes to complete a single animation. Use 0 to turn off animations.',
        scope: 'client',
        config: true,
        default: 3,
        type: Number,
        range: { min: 0, max: 10, step: 0.5 },
        onChange: renderHotbars
    });
}

// CONCATENATED MODULE: ./src/markerConfiguration/macroMarkerConfig.ts
var macroMarkerConfig_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class macroMarkerConfig_MacroMarkerConfigTab {
    static init() {
        Hooks.on('renderMacroConfig', (_, jhtml, data) => {
            const macro = game.macros.get(data.entity._id);
            const dialog = jhtml[0];
            const formParent = dialog.tagName.toLowerCase() === 'form' ? dialog.parentElement : dialog;
            if (formParent)
                macroMarkerConfig_MacroMarkerConfigTab.renderConfig(settings_Settings._load(), formParent, macro);
            return true;
        });
    }
    static renderConfig(settings, formParent, macro) {
        return macroMarkerConfig_awaiter(this, void 0, void 0, function* () {
            const logger = new logger_ConsoleLogger();
            const dataFlags = new markerConfigurationFlags_MarkerConfigurationFlags(logger, macro);
            const data = dataFlags.getData();
            data['module'] = constants.module.name;
            data.colour = data.colour || settings.defaultColour;
            data.icon = data.icon || macro.data.img;
            data.tooltip = data.tooltip || macro.data.name;
            const template = yield renderTemplate('modules/macro-marker/templates/macro-marker-config.html', data);
            macroMarkerConfig_MacroMarkerConfigTab.addTab(formParent, template);
        });
    }
    static addTab(formParent, template) {
        var _a, _b;
        const nav = document.createElement('nav');
        nav.classList.add('tabs');
        const macroNav = document.createElement('a');
        macroNav.classList.add('item', 'active');
        macroNav.setAttribute('data-tab', 'macro');
        macroNav.text = 'Macro';
        const markerNav = document.createElement('a');
        markerNav.classList.add('item');
        markerNav.setAttribute('data-tab', constants.module.name);
        markerNav.text = 'Marker';
        nav.append(macroNav, markerNav);
        const content = document.createElement('section');
        content.classList.add('tab-content');
        const macroTab = document.createElement('div');
        macroTab.classList.add('tab', 'flexcol');
        macroTab.setAttribute('data-tab', 'macro');
        const macroInputs = formParent.querySelectorAll('form>*');
        for (const macroInput of macroInputs) {
            macroTab.appendChild(macroInput);
        }
        const markerTab = document.createElement('div');
        markerTab.classList.add('tab', 'flexcol');
        markerTab.setAttribute('data-tab', constants.module.name);
        markerTab.innerHTML = template;
        content.append(macroTab, markerTab);
        (_a = formParent.querySelector('form')) === null || _a === void 0 ? void 0 : _a.append(content);
        (_b = formParent.querySelector('form')) === null || _b === void 0 ? void 0 : _b.before(nav);
        const tabs = new TabsV2({ navSelector: '.tabs', contentSelector: '.tab-content', initial: 'macro', callback: () => { } });
        tabs.bind(formParent);
        const iconInput = markerTab.querySelector('input[type="hidden"]');
        const iconImg = markerTab.querySelector('.sheet-header img');
        const fileBrowser = FilePicker.fromButton(iconInput, {});
        iconImg.addEventListener('click', () => {
            fileBrowser.render(true);
        });
        iconInput.addEventListener('change', () => {
            iconImg.src = iconInput.value;
        });
    }
}

// CONCATENATED MODULE: ./src/utils/foundry.ts
class Extensions {
    static addEntityMarkerTypes() {
        if (Actor.prototype['markerType']) {
            console.warn('Macro Marker | Actor already had a property or method named "markerType"');
        }
        Actor.prototype['markerType'] = 'Token';
        if (User.prototype['markerType']) {
            console.warn('Macro Marker | User already had a property or method named "markerType"');
        }
        User.prototype['markerType'] = 'User';
        if (Macro.prototype['markerType']) {
            console.warn('Macro Marker | Macro already had a property or method named "markerType"');
        }
        Macro.prototype['markerType'] = 'Macro';
        if (Token.prototype['markerType']) {
            console.warn('Macro Marker | Token already had a property or method named "markerType"');
        }
        Token.prototype['markerType'] = 'Token';
    }
}

// CONCATENATED MODULE: ./src/hotbar/overrides.ts




function overrideMacroHover(hotbar) {
    if (!hotbar)
        return;
    const original_onHoverMacro = hotbar._onHoverMacro;
    function _onHoverMacro(event, ...args) {
        original_onHoverMacro.call(hotbar, event, ...args);
        if (event.type !== 'mouseenter')
            return;
        const li = event.currentTarget;
        const logger = new NotifiedLogger(new logger_ConsoleLogger());
        const settings = settings_Settings._load();
        const marker = new macroMarker_MacroMarker(logger, game.user, () => canvas.tokens.controlled);
        new markerToggler_MarkerToggler(game.macros, logger, settings, marker).showTooltip(li, canvas.tokens.controlled[0]);
    }
    hotbar._onHoverMacro = _onHoverMacro;
}

// CONCATENATED MODULE: ./src/main.ts









Hooks.on('init', () => {
    Extensions.addEntityMarkerTypes();
    registerSettings();
});
Hooks.on('ready', () => {
    const logger = new NotifiedLogger(new logger_ConsoleLogger());
    overrideMacroHover(ui.hotbar);
    macroMarkerConfig_MacroMarkerConfigTab.init();
    remoteExecutor_RemoteExecutor.init(logger);
    window['MacroMarker'] = new macroMarker_MacroMarker(logger, game.user, () => canvas.tokens.controlled);
});
Hooks.once('renderCustomHotbar', () => overrideMacroHover(ui.customHotbar));
Hooks.on('canvasReady', () => delayCallback(renderHotbars));
Hooks.on('controlToken', () => delayCallback(renderHotbars));
Hooks.on('renderHotbar', (_, hotbar) => delayCallback(renderMarkers, hotbar[0]));
Hooks.on('renderCustomHotbar', (_, hotbar) => delayCallback(renderMarkers, hotbar[0]));
Hooks.on('preUpdateMacro', (macro, data) => {
    const activeData = data[constants.module.name];
    if (!activeData)
        return;
    saveMacroConfiguration(macro, activeData);
    return true;
});
Hooks.on('updateMacro', (macro, data) => {
    var _a;
    if ((_a = data.flags) === null || _a === void 0 ? void 0 : _a[constants.module.name])
        delayCallback(renderHotbars);
});
Hooks.on('updateActor', (actor, data) => {
    var _a;
    if (!((_a = data.flags) === null || _a === void 0 ? void 0 : _a[constants.module.name]))
        delayCallback(renderHotbars);
});
Hooks.on('updateToken', (scene, tokenData, updateData) => {
    var _a;
    if ((_a = updateData.flags) === null || _a === void 0 ? void 0 : _a[constants.module.name])
        return;
    if (!updateData.actorData)
        return;
    delayCallback(renderHotbars);
});
Hooks.on('preDeleteToken', (scene, data) => {
    if (!game.user.isGM)
        return;
    if (game.users.filter(u => u.active && u.isGM)[0].id !== game.user.id)
        return;
    removeTokenFlags(data._id);
});
Hooks.on('preDeleteActor', (actor) => {
    if (!game.user.isGM)
        return;
    if (game.users.filter(u => u.active && u.isGM)[0].id !== game.user.id)
        return;
    removeTokenFlags(actor.id);
});


/***/ })
/******/ ]);