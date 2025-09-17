var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// scripts/common/const.mjs
var exports_const = {};
__export(exports_const, {
  MODULE_SETTINGS: () => MODULE_SETTINGS,
  MEDIA_VALIDATORS: () => MEDIA_VALIDATORS,
  MEDIA_TYPES: () => MEDIA_TYPES,
  MEDIA_SETTINGS_VALIDATORS: () => MEDIA_SETTINGS_VALIDATORS,
  MEDIA_SETTINGS: () => MEDIA_SETTINGS,
  MEDIA_HOOKS: () => MEDIA_HOOKS,
  MEDIA_HISTORY_SETTINGS: () => MEDIA_HISTORY_SETTINGS,
  MEDIA_ACTIONS: () => MEDIA_ACTIONS,
  LAYERS_OPTIONS: () => LAYERS_OPTIONS,
  LAYERS_MODES: () => LAYERS_MODES,
  ICONS: () => ICONS,
  ENTITY_SETTINGS: () => ENTITY_SETTINGS
});
var LAYERS_MODES = {
  popout: "popout",
  fullscreen: "fullscreen",
  scene: "scene"
};
var LAYERS_OPTIONS = {
  usersAll: {
    name: "users",
    value: "all"
  },
  usersSelection: {
    name: "users",
    value: "selection"
  },
  displayFit: {
    name: "display",
    value: "fit"
  },
  displayFill: {
    name: "display",
    value: "fill"
  }
};
var MEDIA_TYPES = {
  img: "img",
  video: "video"
};
var MODULE_SETTINGS = {
  dataVersion: "dataVersion",
  mediaHistory: "mediaHistory",
  mediaSettings: "mediaSettings",
  mediaSidebarSettings: "mediaSidebarSettings",
  blacklistSettings: "blacklistSettings",
  entitySharingSettings: "entitySharingSettings"
};
var MEDIA_SETTINGS = {
  [LAYERS_MODES.popout]: { darkness: Boolean(true) },
  [LAYERS_MODES.fullscreen]: { immersive: Boolean(false), controls: Boolean(true), darkness: Boolean(true) },
  [MEDIA_TYPES.video]: { loop: Boolean(false), mute: Boolean(false) }
};
var MEDIA_HISTORY_SETTINGS = {
  enabled: Boolean(true),
  gmOnly: Boolean(false),
  layers: {
    [LAYERS_MODES.popout]: Boolean(true),
    [LAYERS_MODES.fullscreen]: Boolean(true),
    [LAYERS_MODES.scene]: Boolean(true)
  }
};
var ENTITY_SETTINGS = {
  actors: { sheet: Boolean(true), hud: Boolean(true), caption: Boolean(true) },
  items: { sheet: Boolean(true), caption: Boolean(true) },
  tiles: { hud: Boolean(true) }
};
var MEDIA_HOOKS = [
  { on: "renderJournalEntrySheet", htmlContext: [".journal-entry-page:not(form)"] },
  { on: "renderActorSheetV2", htmlContext: [".editor-content:not(.ProseMirror)"] },
  { on: "renderItemSheetV2", htmlContext: [".editor-content:not(.ProseMirror)"] },
  { on: "renderJournalSheet", htmlContext: [".journal-entry-page:not(form)"] },
  { on: "renderActorSheet", htmlContext: [".editor-content:not(.ProseMirror)"] },
  { on: "renderItemSheet", htmlContext: [".editor-content:not(.ProseMirror)"] },
  { on: "renderItemSheet5e", htmlContext: [".editor-content:not(.ProseMirror)"] }
];
var MEDIA_VALIDATORS = {
  [MEDIA_TYPES.img]: (element) => element.complete && element.naturalWidth !== 0,
  [MEDIA_TYPES.video]: (element) => element.readyState >= 2
};
var MEDIA_ACTIONS = {
  [LAYERS_MODES.popout]: [
    { mode: LAYERS_MODES.popout, optionName: LAYERS_OPTIONS.usersAll.name, optionValue: LAYERS_OPTIONS.usersAll.value, i18nKey: "popoutAll" },
    { mode: LAYERS_MODES.popout, optionName: LAYERS_OPTIONS.usersSelection.name, optionValue: LAYERS_OPTIONS.usersSelection.value, i18nKey: "popoutSelection" }
  ],
  [LAYERS_MODES.fullscreen]: [
    { mode: LAYERS_MODES.fullscreen, optionName: LAYERS_OPTIONS.usersAll.name, optionValue: LAYERS_OPTIONS.usersAll.value, i18nKey: "fullscreenAll" },
    { mode: LAYERS_MODES.fullscreen, optionName: LAYERS_OPTIONS.usersSelection.name, optionValue: LAYERS_OPTIONS.usersSelection.value, i18nKey: "fullscreenSelection" }
  ],
  [LAYERS_MODES.scene]: [
    { mode: LAYERS_MODES.scene, optionName: LAYERS_OPTIONS.displayFit.name, optionValue: LAYERS_OPTIONS.displayFit.value, i18nKey: "sceneFit" },
    { mode: LAYERS_MODES.scene, optionName: LAYERS_OPTIONS.displayFill.name, optionValue: LAYERS_OPTIONS.displayFill.value, i18nKey: "sceneFill" }
  ]
};
var MEDIA_SETTINGS_VALIDATORS = {
  [LAYERS_MODES.popout]: (_element) => true,
  [LAYERS_MODES.fullscreen]: (_element) => true,
  [MEDIA_TYPES.video]: (element) => game.modules.shareMedia.utils.isVideo(element)
};
var ICONS = {
  validate: "fas fa-check",
  cancel: "fas fa-ban",
  settings: "far fa-ellipsis",
  popoutAll: "far fa-window-flip",
  popoutSelection: "far fa-screen-users",
  fullscreenAll: "far fa-display",
  fullscreenSelection: "far fa-screen-users",
  sceneFit: "far fa-game-board",
  sceneFill: "far fa-frame",
  darkness: "fas fa-moon",
  immersive: "far fa-film",
  controls: "fas fa-computer-mouse",
  loop: "far fa-repeat",
  mute: "far fa-volume-xmark",
  dismiss: "fas fa-xmark",
  minimize: "fas fa-window-minimize",
  maximize: "fas fa-window-maximize",
  sidebar: "fas fa-rectangle-history",
  clear: "fas fa-trash",
  play: "fas fa-circle-play",
  loading: "fas fa-circle-notch fa-spin",
  jumpToBottom: "fas fa-arrow-down",
  usersInfo: "fas fa-user",
  noUsers: "fas fa-user-slash",
  shareAgain: "fas fa-share",
  shareLink: "fas fa-link",
  mediaLayer: "fas fa-images"
};
// scripts/common/utils.mjs
var exports_utils = {};
__export(exports_utils, {
  registerHandlebarsPartials: () => registerHandlebarsPartials,
  nextAnimationFrames: () => nextAnimationFrames,
  isVideo: () => isVideo,
  getMediaSource: () => getMediaSource,
  getMediaSettings: () => getMediaSettings,
  getAvailableAreas: () => getAvailableAreas,
  escapeSource: () => escapeSource,
  applySettingsToMediaOptions: () => applySettingsToMediaOptions
});
var registerHandlebarsPartials = () => {
  foundry.applications.handlebars.loadTemplates({
    "share-media.media": "modules/share-media/templates/partials/media.hbs"
  });
};
var nextAnimationFrames = async (count = 1) => {
  const promises = Array.from({ length: count }, () => new Promise((resolve) => requestAnimationFrame(resolve)));
  await Promise.all(promises);
};
var getMediaSource = (element) => {
  if (!["IMG", "VIDEO"].includes(element?.tagName))
    return null;
  return element.getAttribute("src") || element.querySelector("source[src]")?.getAttribute("src") || null;
};
var escapeSource = (url) => {
  const urlObj = new URL(url, "http://relative.url");
  return encodeURIComponent(urlObj.pathname + urlObj.search + urlObj.hash).replace(/\./g, "-");
};
var isVideo = (source) => {
  return foundry.helpers.media.VideoHelper.hasVideoExtension(source);
};
var applySettingsToMediaOptions = (mode, options, settings) => {
  if (Object.keys(settings).length === 0)
    return;
  options.mode = mode;
  const propMap = new Map(Object.entries(options.settings).flatMap(([section, settings2]) => Object.keys(settings2).map((prop) => [prop, section])));
  for (const [prop, value] of Object.entries(settings)) {
    const otherModes = Object.keys(CONFIG.shareMedia.CONST.LAYERS_MODES).filter((m) => m !== mode);
    const existsInOtherMode = otherModes.some((m) => (prop in (options.settings[m] || {})));
    const section = prop in (options.settings[mode] || {}) ? mode : !existsInOtherMode ? propMap.get(prop) : null;
    if (section && options.settings[section]) {
      options.settings[section][prop] = value;
      continue;
    }
    options[prop] = value;
  }
};
var getMediaSettings = (src, mode, settings) => {
  return Object.entries(settings).reduce((acc, [key, value]) => {
    if (key === mode)
      Object.assign(acc, value);
    else if (!Object.values(CONFIG.shareMedia.CONST.LAYERS_MODES).includes(key)) {
      const validator = CONFIG.shareMedia.CONST.MEDIA_SETTINGS_VALIDATORS[key];
      if (validator && validator(src)) {
        Object.assign(acc, value);
      }
    }
    return acc;
  }, {});
};
var getAvailableAreas = () => {
  if (!game.canvas)
    return [];
  const regions = game.canvas.regions.placeables.filter((region) => region.document.shapes.length > 0 && region.document.behaviors.some((behavior) => behavior.type === CONFIG.shareMedia.canvas.ShareRegionBehaviorType.type && !behavior.disabled)).map((region) => region.document);
  const tiles = game.canvas.tiles.placeables.filter((tile) => tile.document.getFlag("share-media", game.modules.shareMedia.canvas.layer.constructor.MEDIA_TILE_ENABLED)).map((tile) => tile.document);
  return [...regions, ...tiles];
};
// scripts/settings/settings-cache.mjs
class SettingsCache {
  static #cache = new Map;
  static get(key) {
    if (!this.#cache.has(key)) {
      this.#cache.set(key, game.settings.get("share-media", key));
    }
    return structuredClone(this.#cache.get(key));
  }
  static async set(key, value) {
    await game.settings.set("share-media", key, value);
    this.#cache.set(key, value);
  }
}
// scripts/settings/apps/media-settings.mjs
var { HandlebarsApplicationMixin, ApplicationV2 } = foundry.applications.api;
var { reloadConfirm } = foundry.applications.settings.SettingsConfig;
var { expandObject: expandObject2 } = foundry.utils;

class MediaSettings extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "shm-media-settings",
    tag: "form",
    window: {
      get title() {
        return `share-media.settings.${CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSettings}.label`;
      },
      contentClasses: ["standard-form"]
    },
    position: {
      width: 500,
      height: 600
    },
    form: {
      handler: MediaSettings.#onSubmit,
      closeOnSubmit: true
    }
  };
  static PARTS = {
    form: {
      template: "modules/share-media/templates/settings/media-settings.hbs",
      root: true
    }
  };
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS,
      description: `${CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSettings}.description`,
      mediaSettings: game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSettings)
    };
  }
  static async#onSubmit(_event, _form, formData) {
    const mediaSettings = expandObject2(formData.object);
    await game.modules.shareMedia.settings.set(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSettings, mediaSettings);
    await reloadConfirm({ world: true });
  }
}
// scripts/settings/apps/media-sidebar-settings.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin2, ApplicationV2: ApplicationV22 } = foundry.applications.api;
var { reloadConfirm: reloadConfirm2 } = foundry.applications.settings.SettingsConfig;
var { expandObject: expandObject3 } = foundry.utils;

class MediaSidebarSettings extends HandlebarsApplicationMixin2(ApplicationV22) {
  static DEFAULT_OPTIONS = {
    id: "shm-media-history-sidebar-settings",
    tag: "form",
    window: {
      get title() {
        return `share-media.settings.${CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSidebarSettings}.label`;
      },
      contentClasses: ["standard-form"]
    },
    position: {
      width: 500,
      height: 600
    },
    form: {
      handler: MediaSidebarSettings.#onSubmit,
      closeOnSubmit: true
    }
  };
  static PARTS = {
    form: {
      template: "modules/share-media/templates/settings/media-sidebar-settings.hbs",
      root: true
    }
  };
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS,
      description: `${CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSidebarSettings}.description`,
      mediaSidebarSettings: game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSidebarSettings)
    };
  }
  static async#onSubmit(_event, _form, formData) {
    const historySettings = expandObject3(formData.object);
    game.modules.shareMedia.settings.set(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSidebarSettings, historySettings);
    await reloadConfirm2({ world: true });
  }
}
// scripts/settings/apps/entity-sharing-settings.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin3, ApplicationV2: ApplicationV23 } = foundry.applications.api;
var { reloadConfirm: reloadConfirm3 } = foundry.applications.settings.SettingsConfig;

class EntitySharingSettings extends HandlebarsApplicationMixin3(ApplicationV23) {
  static DEFAULT_OPTIONS = {
    id: "shm-entity-sharing-settings",
    tag: "form",
    window: {
      get title() {
        return `share-media.settings.${CONFIG.shareMedia.CONST.MODULE_SETTINGS.entitySharingSettings}.label`;
      },
      contentClasses: ["standard-form"]
    },
    position: {
      width: 500,
      height: 600
    },
    form: {
      handler: EntitySharingSettings.#onSubmit,
      closeOnSubmit: true
    }
  };
  static PARTS = {
    form: {
      template: "modules/share-media/templates/settings/entity-sharing-settings.hbs",
      root: true
    }
  };
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS,
      description: `${CONFIG.shareMedia.CONST.MODULE_SETTINGS.entitySharingSettings}.description`,
      entitySharingSettings: game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.entitySharingSettings),
      categoryLabels: this.#prepareCategoryLabels()
    };
  }
  #prepareCategoryLabels() {
    return Object.keys(game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.entitySharingSettings)).reduce((obj, category) => {
      obj[category] = "DOCUMENT." + category.charAt(0).toUpperCase() + category.slice(1);
      return obj;
    }, {});
  }
  static async#onSubmit(_event, _form, formData) {
    const entitySharingSettings = expandObject(formData.object);
    await game.modules.shareMedia.settings.set(CONFIG.shareMedia.CONST.MODULE_SETTINGS.entitySharingSettings, entitySharingSettings);
    await reloadConfirm3({ world: true });
  }
}
// scripts/settings/apps/blacklist-settings.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin4, ApplicationV2: ApplicationV24 } = foundry.applications.api;
var { reloadConfirm: reloadConfirm4 } = foundry.applications.settings.SettingsConfig;

class BlacklistSettings extends HandlebarsApplicationMixin4(ApplicationV24) {
  static DEFAULT_OPTIONS = {
    id: "shm-blacklist",
    tag: "form",
    window: {
      get title() {
        return `share-media.settings.${CONFIG.shareMedia.CONST.MODULE_SETTINGS.blacklistSettings}.label`;
      },
      contentClasses: ["standard-form"]
    },
    position: {
      width: 400,
      height: "auto"
    },
    form: {
      handler: BlacklistSettings.#onSubmit,
      closeOnSubmit: true
    }
  };
  static PARTS = {
    form: { template: "modules/share-media/templates/settings/blacklist-settings.hbs", root: true }
  };
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS,
      description: `${CONFIG.shareMedia.CONST.MODULE_SETTINGS.blacklistSettings}.description`,
      users: this.#prepareUsers()
    };
  }
  #prepareUsers() {
    const blacklistSettings = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.blacklistSettings);
    return game.users.map((user) => ({
      id: user.id,
      name: user.name,
      color: user.color,
      blacklisted: blacklistSettings.includes(user.id)
    }));
  }
  static async#onSubmit(_event, _form, formData) {
    const users = Object.keys(formData.object).filter((key) => formData.object[key]);
    await game.modules.shareMedia.settings.set(CONFIG.shareMedia.CONST.MODULE_SETTINGS.blacklistSettings, users);
    await reloadConfirm4({ world: true });
  }
}
// scripts/settings/settings.mjs
var { ObjectField, ArrayField, StringField, TypedObjectField } = foundry.data.fields;
var initializeSettings = () => {
  registerSettings();
  registerMenus();
};
var registerSettings = () => {
  const settings = CONFIG.shareMedia.CONST.MODULE_SETTINGS;
  game.settings.register("share-media", settings.dataVersion, {
    config: false,
    scope: CONST.SETTING_SCOPES.WORLD,
    type: new StringField({ gmOnly: true })
  });
  game.settings.register("share-media", settings.mediaSettings, {
    config: false,
    scope: CONST.SETTING_SCOPES.WORLD,
    type: new ObjectField({ initial: CONFIG.shareMedia.CONST.MEDIA_SETTINGS, gmOnly: true })
  });
  game.settings.register("share-media", settings.mediaHistory, {
    config: false,
    scope: CONST.SETTING_SCOPES.WORLD,
    type: new TypedObjectField(new ObjectField, { initial: {} })
  });
  game.settings.register("share-media", settings.mediaSidebarSettings, {
    config: false,
    scope: CONST.SETTING_SCOPES.WORLD,
    type: new ObjectField({ initial: CONFIG.shareMedia.CONST.MEDIA_HISTORY_SETTINGS })
  });
  game.settings.register("share-media", settings.entitySharingSettings, {
    config: false,
    scope: CONST.SETTING_SCOPES.WORLD,
    type: new ObjectField({ initial: CONFIG.shareMedia.CONST.ENTITY_SETTINGS })
  });
  game.settings.register("share-media", settings.blacklistSettings, {
    config: false,
    scope: CONST.SETTING_SCOPES.WORLD,
    type: new ArrayField(new StringField, { initial: [], gmOnly: true })
  });
};
var registerMenus = () => {
  const settings = CONFIG.shareMedia.CONST.MODULE_SETTINGS;
  game.settings.registerMenu("share-media", settings.mediaSettings, {
    label: `share-media.settings.${settings.mediaSettings}.label`,
    name: `share-media.settings.${settings.mediaSettings}.name`,
    hint: `share-media.settings.${settings.mediaSettings}.hint`,
    restricted: true,
    type: MediaSettings
  });
  game.settings.registerMenu("share-media", settings.mediaSidebarSettings, {
    label: `share-media.settings.${settings.mediaSidebarSettings}.label`,
    name: `share-media.settings.${settings.mediaSidebarSettings}.name`,
    hint: `share-media.settings.${settings.mediaSidebarSettings}.hint`,
    restricted: true,
    type: MediaSidebarSettings
  });
  game.settings.registerMenu("share-media", settings.entitySharingSettings, {
    label: `share-media.settings.${settings.entitySharingSettings}.label`,
    name: `share-media.settings.${settings.entitySharingSettings}.name`,
    hint: `share-media.settings.${settings.entitySharingSettings}.hint`,
    restricted: true,
    type: EntitySharingSettings
  });
  game.settings.registerMenu("share-media", settings.blacklistSettings, {
    label: `share-media.settings.${settings.blacklistSettings}.label`,
    name: `share-media.settings.${settings.blacklistSettings}.name`,
    hint: `share-media.settings.${settings.blacklistSettings}.hint`,
    restricted: true,
    type: BlacklistSettings
  });
};
// scripts/settings/migrations.mjs
var { isNewerVersion } = foundry.utils;
var MIGRATIONS = [];
var runMigrations = async () => {
  if (!game.users.current.isGM)
    return;
  const currentVersion = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.dataVersion);
  if (!currentVersion) {
    const latestVersion = MIGRATIONS.at(-1)?.version ?? "1.0.0";
    await game.modules.shareMedia.settings.set(CONFIG.shareMedia.CONST.MODULE_SETTINGS.dataVersion, latestVersion);
    return;
  }
  const toRun = MIGRATIONS.filter((migration) => isNewerVersion(migration.version, currentVersion));
  if (!toRun.length)
    return;
  for (const migration of toRun) {
    await migration.handler();
    await game.modules.shareMedia.settings.set(CONFIG.shareMedia.CONST.MODULE_SETTINGS.dataVersion, migration.version);
  }
};
// scripts/ui/_module.mjs
var exports__module2 = {};
__export(exports__module2, {
  registerMediaSidebar: () => registerMediaSidebar,
  MediaSidebar: () => MediaSidebar,
  MediaOverlay: () => MediaOverlay,
  MediaDetector: () => MediaDetector
});

// scripts/ui/media-detector.mjs
var { ApplicationV2: ApplicationV25 } = foundry.applications.api;
var { isSubclass } = foundry.utils;

class MediaDetector {
  constructor() {
    if (!game.users.current.isGM)
      return {};
    if (game.modules.shareMedia.ui.detector)
      throw new Error("You may not re-construct the singleton MediaDetector.");
    this.#activateHooks();
  }
  element = null;
  #activateHooks() {
    for (const hook of CONFIG.shareMedia.CONST.MEDIA_HOOKS) {
      Hooks.on(hook.on, this.#activateEventListeners.bind(this, hook));
    }
  }
  #activateEventListeners(hook, ...args) {
    const { application, element, options } = this.#parseHooksArgs(...args);
    if (!options.isFirstRender)
      return;
    element.addEventListener("pointerenter", this.#onPointerEnter.bind(this, hook, application), true);
    element.addEventListener("pointerleave", this.#onPointerLeave.bind(this), true);
  }
  #onPointerEnter(hook, application, event) {
    const { target: element, relatedTarget: previousElement } = event;
    if (game.modules.shareMedia.ui.overlay.element?.contains(previousElement))
      return;
    if (!element.parentElement?.closest(hook.htmlContext.join()))
      return;
    if (!this.#isValidMedia(element))
      return;
    this.enter(element, application, hook);
  }
  async enter(element, application, hook) {
    this.element = element;
    await game.modules.shareMedia.ui.overlay.activate(element, application, hook.htmlContext);
  }
  #onPointerLeave(event) {
    const { target: element, relatedTarget: nextElement } = event;
    if (!this.element || element !== this.element && !game.modules.shareMedia.ui.overlay.element?.contains(element) || game.modules.shareMedia.ui.overlay.element?.contains(nextElement) || nextElement === this.element)
      return;
    this.leave();
  }
  async leave() {
    this.element = null;
    await game.modules.shareMedia.ui.overlay.deactivate();
  }
  #parseHooksArgs(...args) {
    const [application] = args;
    const isV2 = application instanceof ApplicationV25;
    if (isV2) {
      const [, element, , options] = args;
      return { application, element, options };
    }
    const [, html] = args;
    return {
      application,
      element: html[0],
      options: { isFirstRender: application._priorState <= 0 }
    };
  }
  #isValidMedia(element) {
    const tagName = element.tagName.toLowerCase();
    const validator = CONFIG.shareMedia.CONST.MEDIA_VALIDATORS[tagName];
    return validator ? validator(element) : false;
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.ui.MediaDetector;
    if (!isSubclass(Class, MediaDetector)) {
      console.warn("Configured MediaDetector override must be a subclass of MediaDetector.");
      Class = MediaDetector;
    }
    return Class;
  }
}
// scripts/ui/media-overlay.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin5, ApplicationV2: ApplicationV26 } = foundry.applications.api;
var { isSubclass: isSubclass2, getProperty, mergeObject } = foundry.utils;

class MediaOverlay extends HandlebarsApplicationMixin5(ApplicationV26) {
  constructor(options = {}) {
    if (!game.users.current.isGM)
      return {};
    if (game.modules.shareMedia.ui.overlay)
      throw new Error("You may not re-construct the singleton MediaOverlay.");
    super(options);
  }
  targetElement = null;
  targetApplication = null;
  htmlContext = null;
  static OVERLAY_MARGIN_PX = 5;
  static MINIMUM_AVAILABLE_SPACE = 250;
  static DEFAULT_OPTIONS = {
    tag: "aside",
    id: "shm-overlay",
    classes: ["shm"],
    window: {
      positioned: false,
      frame: false
    },
    actions: {
      configureSetting: MediaOverlay.#onConfigureSetting,
      share: MediaOverlay.#onShare
    }
  };
  static PARTS = {
    overlay: { template: "modules/share-media/templates/ui/media-overlay.hbs", root: true }
  };
  #active = false;
  #stylesAndRectsCache = null;
  #onHideListener = null;
  #settingsKey = "settings";
  get isNotRenderable() {
    return this.rendered && this.element && !this.element.isConnected;
  }
  get isAlive() {
    return this.targetElement && this.targetApplication && this.element && this.element.isConnected;
  }
  get targetElementSource() {
    if (!this.targetElement)
      return null;
    return game.modules.shareMedia.utils.getMediaSource(this.targetElement);
  }
  get targetElementEscapedSource() {
    if (!this.targetElement)
      return null;
    return game.modules.shareMedia.utils.escapeSource(this.targetElementSource);
  }
  get targetElementSettings() {
    if (!this.targetElement || !this.targetApplication)
      return { key: "", settings: {} };
    const flag = this.targetApplication.document.getFlag("share-media", this.#settingsKey) ?? {};
    const key = this.targetElementEscapedSource;
    const storedSettings = getProperty(flag, key) ?? {};
    const mediaSettings = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSettings);
    const settings2 = mergeObject(mediaSettings, storedSettings, { inplace: false });
    return { key, settings: settings2 };
  }
  async activate(element, application, context) {
    this.targetElement = element;
    this.targetApplication = application;
    this.htmlContext = context;
    if (this.isNotRenderable) {
      await this.close({ animate: false });
      return await this.activate(element, application, context);
    }
    await this.render(true);
    await this.#show();
    Hooks.callAll("shareMedia.activateOverlay", this, element, application, context);
    return this;
  }
  async deactivate() {
    if (!this.isAlive) {
      return await this.close({ animate: false });
    }
    await this.#hide();
    Hooks.callAll("shareMedia.deactivateOverlay", this);
    return this;
  }
  async#show() {
    if (this.#active || !this.isAlive)
      return;
    this.#clearHidingListener();
    this.#active = true;
    this.element.classList.add("active");
    await game.modules.shareMedia.utils.nextAnimationFrames();
    this.element.classList.add("show");
  }
  async#hide() {
    if (!this.#active || !this.isAlive)
      return;
    this.#active = false;
    this._resetState();
    this.element.classList.remove("show");
    this.#onHideListener = this.#createOnHideListener();
    this.element.addEventListener("transitionend", this.#onHideListener, { once: true });
  }
  #createOnHideListener() {
    return () => {
      if (!this.#active && this.element) {
        this.element.classList.remove("active");
        document.body.append(this.element);
      }
      this._resetAll();
    };
  }
  #clearHidingListener() {
    if (this.#onHideListener) {
      this.element?.removeEventListener("transitionend", this.#onHideListener);
      this.#onHideListener = null;
    }
  }
  async _prepareContext(options) {
    const { parentElementRect, targetElementRect, targetElementPaddingLeft } = this.#getStylesAndRects();
    const availableSpace = parentElementRect.right - (targetElementRect.left + targetElementPaddingLeft);
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS,
      rightToLeft: availableSpace <= this.constructor.MINIMUM_AVAILABLE_SPACE,
      mediaActions: this.#prepareActions(),
      mediaSettings: this.#prepareSettings()
    };
  }
  #prepareActions() {
    const actions = CONFIG.shareMedia.CONST.MEDIA_ACTIONS;
    return Object.entries(actions).reduce((acc, [mode, items]) => {
      acc[mode] = items.map((item) => {
        item.label = `${item.i18nKey}.label`;
        item.description = `${item.i18nKey}.description`;
        item.icon = item.i18nKey;
        return item;
      });
      return acc;
    }, {});
  }
  #prepareSettings() {
    const settings2 = this.targetElementSettings.settings;
    return Object.entries(settings2).reduce((acc, [category, options]) => {
      const validator = CONFIG.shareMedia.CONST.MEDIA_SETTINGS_VALIDATORS[category];
      if (!validator)
        throw new Error(`Missing validator for setting "${category}".`);
      const isVisible = validator(this.targetElementSource);
      acc[category] = {
        category,
        label: `categories.${category}`,
        isVisible
      };
      acc[category].options = Object.entries(options).map(([name, value]) => ({
        name,
        value,
        icon: name,
        label: `${name}.label`,
        description: `${name}.description`
      }));
      return acc;
    }, {});
  }
  static async#onConfigureSetting(_event, target) {
    if (!this.targetElement || !this.targetApplication)
      return;
    const dataset = target.dataset;
    const { key, settings: settings2 } = this.targetElementSettings;
    const setting = getProperty(settings2, `${dataset.category}.${dataset.setting}`) ?? false;
    const updateKey = `flags.share-media.${this.#settingsKey}.${key}.${dataset.category}.${dataset.setting}`;
    await this.targetApplication.document.update({ [updateKey]: !setting }, { render: false });
    target.classList.toggle("active", !setting);
  }
  static async#onShare(_event, target) {
    const settings2 = this.targetElementSettings.settings;
    const mode = target.dataset.mode;
    const optionsSettings = game.modules.shareMedia.utils.getMediaSettings(this.targetElementSource, mode, settings2);
    const options = {
      src: this.targetElementSource,
      mode,
      optionName: target.dataset.optionName,
      optionValue: target.dataset.optionValue,
      ...optionsSettings
    };
    await game.modules.shareMedia.shareables.manager.dispatch(options);
  }
  _canRender(options) {
    if (!this.targetApplication || !this.targetElement) {
      this._resetAll();
      return false;
    }
    const isV2 = this.targetApplication instanceof ApplicationV26;
    const applicationElement = isV2 ? this.targetApplication.element : this.targetApplication._element[0];
    if (!applicationElement?.isConnected || !this.targetElement?.isConnected) {
      this._resetAll();
      return false;
    }
    return super._canRender(options);
  }
  async _onRender(context, options) {
    super._onRender(context, options);
    const {
      parentElement,
      parentElementStyles,
      parentElementRect,
      targetElementRect,
      targetElementPaddingTop,
      targetElementPaddingLeft,
      targetElementPaddingRight
    } = this.#getStylesAndRects();
    if (!parentElement)
      return this._resetAll();
    parentElement.append(this.element);
    if (parentElementStyles.position === "static") {
      parentElement.style.position = "relative";
      const editButton = parentElement.parentElement.querySelector(":scope > .editor-edit");
      if (editButton)
        editButton.style.zIndex = "1";
    }
    let top, horizontalProperty, horizontalPosition;
    top = targetElementRect.top - parentElementRect.top + targetElementPaddingTop + parentElement.scrollTop;
    if (context.rightToLeft) {
      horizontalProperty = "right";
      horizontalPosition = parentElementRect.right - targetElementRect.right + targetElementPaddingRight + parentElement.scrollLeft;
    } else {
      horizontalProperty = "left";
      horizontalPosition = targetElementRect.left - parentElementRect.left + targetElementPaddingLeft + parentElement.scrollLeft;
    }
    top = top < 0 ? 0 : top;
    horizontalPosition = horizontalPosition < 0 ? 0 : horizontalPosition;
    top += this.constructor.OVERLAY_MARGIN_PX;
    horizontalPosition += this.constructor.OVERLAY_MARGIN_PX;
    this.element.style.setProperty("top", `${top}px`, "important");
    this.element.style.setProperty(horizontalProperty, `${horizontalPosition}px`, "important");
    this.element.style.removeProperty(horizontalProperty === "left" ? "right" : "left");
  }
  _onClose(options) {
    super._onClose(options);
    this._resetAll();
  }
  _resetAll() {
    this._resetState();
    this._resetDOM();
  }
  _resetState() {
    this.targetElement = null;
    this.targetApplication = null;
    this.htmlContext = null;
    this.#stylesAndRectsCache = null;
    this.#active = false;
  }
  _resetDOM() {
    this.#clearHidingListener();
    if (this.element)
      this.element.classList.value = "shm";
  }
  #getStylesAndRects() {
    if (this.#stylesAndRectsCache) {
      return this.#stylesAndRectsCache;
    }
    const parentElement = this.targetElement.closest(this.htmlContext.join()) ?? this.targetElement.parentElement;
    const parentElementStyles = getComputedStyle(parentElement);
    const parentElementRect = parentElement.getBoundingClientRect();
    const targetElementStyles = getComputedStyle(this.targetElement);
    const targetElementRect = this.targetElement.getBoundingClientRect();
    const targetElementPaddingTop = parseInt(targetElementStyles.paddingTop, 10) || 0;
    const targetElementPaddingLeft = parseInt(targetElementStyles.paddingLeft, 10) || 0;
    const targetElementPaddingRight = parseInt(targetElementStyles.paddingRight, 10) || 0;
    this.#stylesAndRectsCache = {
      parentElement,
      parentElementStyles,
      parentElementRect,
      targetElementStyles,
      targetElementRect,
      targetElementPaddingTop,
      targetElementPaddingLeft,
      targetElementPaddingRight
    };
    return this.#stylesAndRectsCache;
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.ui.MediaOverlay;
    if (!isSubclass2(Class, MediaOverlay)) {
      console.warn("Configured MediaOverlay override must be a subclass of MediaOverlay.");
      Class = MediaOverlay;
    }
    return Class;
  }
}
// scripts/ui/media-sidebar.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin6, DialogV2 } = foundry.applications.api;
var { AbstractSidebarTab } = foundry.applications.sidebar;
var { isSubclass: isSubclass3, Semaphore, timeSince, Collection } = foundry.utils;
var { renderTemplate } = foundry.applications.handlebars;

class MediaSidebar extends HandlebarsApplicationMixin6(AbstractSidebarTab) {
  constructor(options = {}) {
    super(options);
    if (!this.isPopout)
      this._registerUserQueries();
  }
  static BATCH_SIZE = 10;
  static UPDATE_TIMESTAMP_FREQUENCY = 1000 * 60;
  static DEFAULT_OPTIONS = {
    classes: ["directory", "flexcol"],
    position: {
      top: 15
    },
    window: {
      title: "share-media.ui.sidebar.label",
      get icon() {
        return CONFIG.shareMedia.CONST.ICONS.sidebar;
      }
    },
    actions: {
      shareLink: MediaSidebar.#onShareLink,
      clearHistory: MediaSidebar.#onClearHistory,
      clearMedia: MediaSidebar.#onClearMedia,
      showMedia: MediaSidebar.#onShowMedia,
      shareMedia: MediaSidebar.#onShareMedia,
      jumpToBottom: MediaSidebar.#onJumpToBottom
    }
  };
  static tabName = "shm-media-sidebar";
  static PARTS = {
    sidebar: { template: "modules/share-media/templates/ui/media-sidebar.hbs", root: true }
  };
  #sidebarSettings = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSidebarSettings);
  #firstViewed = false;
  #mediaLog = null;
  #mediaLoadingMessage = null;
  #isAtBottom = true;
  #jumpToBottom = null;
  #lastId = null;
  #renderingQueue = new Semaphore(1);
  #renderingBatch = false;
  get mediaCollection() {
    return game.modules.shareMedia.collections.media;
  }
  async storeMedia(src, targetUsers = [], settings2 = {}) {
    if (!game.users.current.isGM)
      return;
    const collection = new Collection(this.mediaCollection.entries());
    const key = game.modules.shareMedia.utils.escapeSource(src);
    const players = targetUsers.filter((userId) => !game.users.get(userId).isGM);
    let media;
    if (collection.has(key)) {
      media = { ...collection.get(key) };
      media.timestamp = Date.now();
      media.targetUsers = [...new Set([...media.targetUsers, ...players])];
      media.settings = settings2;
      collection.delete(key);
    } else {
      media = {
        id: key,
        timestamp: Date.now(),
        src,
        targetUsers: players,
        settings: settings2
      };
    }
    collection.set(key, media);
    await this.#setRemoteStorage(collection);
    Hooks.callAll("shareMedia.storeMedia", media, collection);
    const users = game.users.reduce((acc, user) => {
      if (!user.active)
        return acc;
      if (user.isGM || media.targetUsers.includes(user.id))
        acc.push(user.id);
      return acc;
    }, []);
    for (const userId of users) {
      game.users.get(userId).query("share-media.addMedia", media);
    }
  }
  async deleteMedia(id) {
    if (!game.users.current.isGM)
      return;
    if (!this.mediaCollection.has(id))
      return;
    const collection = new Collection(this.mediaCollection.entries());
    const targetUsers = [...this.mediaCollection.get(id).targetUsers];
    collection.delete(id);
    await this.#setRemoteStorage(collection);
    Hooks.callAll("shareMedia.deleteMedia", id, collection);
    const users = game.users.reduce((acc, user) => {
      if (!user.active)
        return acc;
      if (user.isGM || targetUsers.includes(user.id))
        acc.push(user.id);
      return acc;
    }, []);
    for (const userId of users) {
      game.users.get(userId).query("share-media.removeMedia", { id, options: { animate: true } });
    }
  }
  async deleteHistory() {
    if (!game.users.current.isGM)
      return;
    await this.#setRemoteStorage(new Collection([]));
    Hooks.callAll("shareMedia.deleteHistory");
    const users = game.users.reduce((acc, user) => {
      if (user.active)
        acc.push(user.id);
      return acc;
    }, []);
    for (const userId of users) {
      game.users.get(userId).query("share-media.flushMedia");
    }
  }
  async#setRemoteStorage(value) {
    if (!game.users.current.isGM)
      return;
    return game.settings.set("share-media", CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaHistory, Object.fromEntries(value.entries()));
  }
  _registerUserQueries() {
    CONFIG.queries["share-media.addMedia"] = this._addMedia.bind(this);
    CONFIG.queries["share-media.removeMedia"] = this._removeMedia.bind(this);
    CONFIG.queries["share-media.flushMedia"] = this._flushMedia.bind(this);
  }
  async _addMedia(media) {
    if (!this.isPopout && this.mediaCollection.has(media.id))
      this.mediaCollection.delete(media.id);
    if (!this.isPopout)
      this.mediaCollection.set(media.id, media);
    if (!this.#sidebarSettings.enabled)
      return;
    if (this.#sidebarSettings.gmOnly && !game.users.current.isGM)
      return;
    return this.#renderingQueue.add(async () => {
      await this.#doRemoveMedia(media.id);
      await this.#doAddMedia(media);
    });
  }
  async#doAddMedia(media) {
    if (!this.rendered)
      return;
    if (!this.#lastId)
      this.#lastId = media.id;
    const doc = await this._processAndRenderMedia([media]);
    const wasAtBottom = this.#isAtBottom;
    this.#mediaLog.append(...doc.body.childNodes);
    if (wasAtBottom)
      this.scrollBottom();
    this.popout?._addMedia(media);
    if (this.isPopout)
      this.setPosition();
  }
  async _removeMedia({ id, options = {} }) {
    if (!this.isPopout && this.mediaCollection.has(id))
      this.mediaCollection.delete(id);
    if (!this.#sidebarSettings.enabled)
      return;
    if (this.#sidebarSettings.gmOnly && !game.users.current.isGM)
      return;
    return this.#renderingQueue.add(this.#doRemoveMedia.bind(this), id, options);
  }
  async#doRemoveMedia(id, { animate = false } = {}) {
    if (!this.rendered)
      return;
    const li = this.#mediaLog.querySelector(`li[data-media-id="${id}"]`);
    if (li) {
      if (id === this.#lastId)
        this.#lastId = li.nextElementSibling?.dataset.mediaId ?? null;
      const removeAndScroll = () => {
        li.remove();
        this.#onScrollLog();
        if (this.isPopout)
          this.setPosition();
      };
      if (animate) {
        li.classList.add("deleting");
        li.animate({ height: [`${li.getBoundingClientRect().height}px`, "0"] }, { duration: 250, easing: "ease" }).finished.then(() => {
          removeAndScroll();
        });
      } else {
        removeAndScroll();
      }
    }
    this.popout?._removeMedia({ id, options: { animate } });
  }
  async _flushMedia() {
    if (!this.isPopout)
      this.mediaCollection.clear();
    if (!this.#sidebarSettings.enabled)
      return;
    if (this.#sidebarSettings.gmOnly && !game.users.current.isGM)
      return;
    return this.#renderingQueue.add(this.#doFlushMedia.bind(this));
  }
  async#doFlushMedia() {
    if (!this.rendered)
      return;
    this.#mediaLog.innerHTML = "";
    this.popout?._flushMedia();
    if (this.isPopout)
      this.setPosition();
  }
  async _renderBatch(size) {
    if (this.#renderingBatch)
      return;
    if (!this.#sidebarSettings.enabled)
      return;
    if (this.#sidebarSettings.gmOnly && !game.users.current.isGM)
      return;
    this.#renderingBatch = true;
    return this.#renderingQueue.add(this.#doRenderBatch.bind(this), size);
  }
  async#doRenderBatch(size) {
    if (!this.rendered) {
      this.#renderingBatch = false;
      return;
    }
    const mediaList = game.users.current.isGM ? this.mediaCollection.contents : this.mediaCollection.contents.filter((media) => media.targetUsers.includes(game.users.current.id));
    let lastIdx = mediaList.findIndex((media) => media.id === this.#lastId);
    lastIdx = lastIdx > -1 ? lastIdx : mediaList.length;
    if (!lastIdx) {
      this.#renderingBatch = false;
      return;
    }
    setTimeout(() => {
      if (this.#renderingBatch)
        this.#mediaLoadingMessage.removeAttribute("hidden");
    }, 50);
    const targetIdx = Math.max(lastIdx - size, 0);
    const mediaListBatched = mediaList.slice(targetIdx, lastIdx);
    const doc = await this._processAndRenderMedia(mediaListBatched);
    this.#mediaLog.prepend(...doc.body.childNodes);
    this.#mediaLoadingMessage.setAttribute("hidden", "");
    this.#lastId = mediaListBatched.at(0).id;
    this.#renderingBatch = false;
  }
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS
    };
  }
  static async#onShareLink(_event, _target) {
    await new game.modules.shareMedia.shareables.apps.shareSelector({ link: true }).render({
      force: true
    });
  }
  static async#onClearHistory(_event, _target) {
    if (!game.users.current.isGM)
      return;
    const confirm = await DialogV2.confirm({
      window: {
        title: "share-media.ui.sidebar.label",
        icon: CONFIG.shareMedia.CONST.ICONS.clear
      },
      content: `<p>${game.i18n.localize("share-media.ui.sidebar.header.clear.description")}</p>`
    });
    if (confirm) {
      this.deleteHistory();
    }
  }
  static #onClearMedia(_event, target) {
    if (!game.users.current.isGM)
      return;
    const { mediaId } = target.closest("[data-media-id]")?.dataset ?? {};
    const media = this.mediaCollection.get(mediaId);
    if (media)
      this.deleteMedia(media.id);
  }
  static async#onShowMedia(_event, target) {
    const { mediaId } = target.dataset ?? {};
    const media = this.mediaCollection.get(mediaId);
    if (!media)
      return;
    const mode = Object.keys(CONFIG.shareMedia.CONST.LAYERS_MODES).at(0);
    const settings2 = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSettings);
    game.modules.shareMedia.utils.applySettingsToMediaOptions(mode, { settings: settings2 }, media.settings);
    const optionsSettings = game.modules.shareMedia.utils.getMediaSettings(media.src, mode, settings2);
    const layer = new game.modules.shareMedia.layers[mode]({
      src: media.src,
      ...optionsSettings
    });
    await layer.render({ force: true });
  }
  static async#onShareMedia(_event, target) {
    if (!game.users.current.isGM)
      return;
    const li = target.closest(".media-item[data-media-id]");
    const media = this.mediaCollection.get(li?.dataset?.mediaId);
    if (!media?.id)
      return;
    await new game.modules.shareMedia.shareables.apps.shareSelector({
      src: media.src,
      settings: media.settings
    }).render({ force: true });
  }
  static async#onJumpToBottom(_event, _target) {
    this.scrollBottom();
  }
  #onScrollLog(event) {
    if (!this.rendered)
      return;
    const log = event?.currentTarget ?? this.#mediaLog;
    const pct = log.scrollTop / (log.scrollHeight - log.clientHeight);
    this.#isAtBottom = pct > 0.99 || Number.isNaN(pct);
    this.#jumpToBottom.toggleAttribute("hidden", this.#isAtBottom);
    log.classList.toggle("scrolled", !this.#isAtBottom);
    const top = log.querySelector("li.media-item");
    if (pct < 0.01) {
      this._renderBatch(this.constructor.BATCH_SIZE).then(() => {
        if (top)
          log.scrollTop = top.offsetTop;
      });
    }
  }
  #updateTimestamps(element) {
    for (const li of element.querySelectorAll(".media-item[data-media-id]")) {
      const media = this.mediaCollection.get(li?.dataset?.mediaId);
      if (!media?.timestamp)
        return;
      const stamp = li.querySelector(".media-timestamp");
      if (stamp)
        stamp.textContent = timeSince(media.timestamp);
    }
  }
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    if (this.rendered)
      options.parts = [];
  }
  async _onFirstRender(context, options) {
    await super._onFirstRender(context, options);
    this.#mediaLog = this.element.querySelector(".media-log");
    this.#mediaLoadingMessage = this.element.querySelector(".loading");
    this.#jumpToBottom = this.element.querySelector(".jump-to-bottom");
    this.#mediaLog.addEventListener("scroll", this.#onScrollLog.bind(this), { passive: true });
    if (!this.isPopout) {
      setInterval(this.#updateTimestamps.bind(this, document), this.constructor.UPDATE_TIMESTAMP_FREQUENCY);
    }
  }
  async _postRender(context, options) {
    await super._postRender(context, options);
    if (options.isFirstRender && this.isPopout) {
      this._renderBatch(this.constructor.BATCH_SIZE).then(() => this.scrollBottom());
    }
  }
  _onClose(options) {
    super._onClose(options);
    this.#mediaLog = null;
    this.#mediaLoadingMessage = null;
    this.#jumpToBottom = null;
    this.#lastId = null;
  }
  _onActivate() {
    super._onActivate();
    if (!this.#firstViewed && !this.isPopout) {
      this.#firstViewed = true;
      this._renderBatch(this.constructor.BATCH_SIZE).then(() => this.scrollBottom());
    }
  }
  scrollBottom() {
    if (!this.rendered)
      return;
    setTimeout(async () => {
      await game.modules.shareMedia.utils.nextAnimationFrames();
      this.#mediaLog.scrollHeight;
      await game.modules.shareMedia.utils.nextAnimationFrames();
      this.#mediaLog.scrollTop = 2147483583;
    }, 10);
  }
  async _processAndRenderMedia(mediaList) {
    const enrichedMediaList = mediaList.map((media) => ({
      ...media,
      isVideo: game.modules.shareMedia.utils.isVideo(media.src),
      targetUsers: game.users.current.isGM ? media.targetUsers.map((userId) => {
        const user = game.users.get(userId);
        return { color: user.color, name: user.name };
      }) : media.targetUsers
    }));
    const template = await renderTemplate("modules/share-media/templates/ui/media-sidebar-list.hbs", {
      isGM: game.users.current.isGM,
      icons: CONFIG.shareMedia.CONST.ICONS,
      mediaList: enrichedMediaList
    });
    const doc = await this.#parseAndPreloadTemplate(template);
    this.#updateTimestamps(doc);
    return doc;
  }
  async#parseAndPreloadTemplate(template) {
    const doc = new DOMParser().parseFromString(template, "text/html");
    const mediaElements = doc.body.querySelectorAll("img, video");
    const loadPromises = [];
    for (const media of mediaElements) {
      const src = media.dataset.src;
      if (!src)
        continue;
      const isVideo2 = media.tagName === "VIDEO";
      const preloader = isVideo2 ? document.createElement("video") : new Image;
      if (isVideo2)
        preloader.preload = "metadata";
      const loadPromise = new Promise((resolve) => {
        preloader[isVideo2 ? "onloadedmetadata" : "onload"] = resolve;
        preloader.onerror = resolve;
        preloader.src = src;
      });
      loadPromises.push(loadPromise);
      media.src = src;
      delete media.dataset.src;
    }
    await Promise.all(loadPromises);
    return doc;
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.ui.MediaSidebar;
    if (!isSubclass3(Class, MediaSidebar)) {
      console.warn("Configured MediaSidebar override must be a subclass of MediaSidebar.");
      Class = MediaSidebar;
    }
    return Class;
  }
}

// scripts/ui/_module.mjs
var registerMediaSidebar = async () => {
  const mediaSidebarSettings = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSidebarSettings);
  const blacklistSettings = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.blacklistSettings);
  const { Collection: Collection2 } = foundry.utils;
  game["shm-media-collection"] = new Collection2(Object.entries(game.settings.get("share-media", CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaHistory)));
  if (mediaSidebarSettings.enabled && !blacklistSettings.includes(game.userId)) {
    CONFIG.ui.sidebar.TABS = Object.entries(CONFIG.ui.sidebar.TABS).reduce((acc, [tabName, obj]) => {
      if (tabName === "settings") {
        acc["shm-media-sidebar"] = {
          icon: CONFIG.shareMedia.CONST.ICONS.sidebar,
          tooltip: "share-media.ui.sidebar.label",
          gmOnly: mediaSidebarSettings.gmOnly
        };
      }
      acc[tabName] = obj;
      return acc;
    }, {});
  }
  CONFIG.ui["shm-media-sidebar"] = CONFIG.shareMedia.ui.MediaSidebar.implementation;
};

// scripts/canvas/_module.mjs
var exports__module4 = {};
__export(exports__module4, {
  registerTileConfiguration: () => registerTileConfiguration,
  registerRegionBehaviors: () => registerRegionBehaviors,
  registerMediaLayer: () => registerMediaLayer,
  apps: () => exports__module3,
  TileSprite: () => TileSprite,
  ShareRegionBehaviorType: () => ShareRegionBehaviorType,
  RegionSprite: () => RegionSprite,
  MediaSprite: () => MediaSprite,
  MediaLayer: () => MediaLayer
});

// scripts/canvas/media-layer.mjs
var { InteractionLayer } = foundry.canvas.layers;
var { isSubclass: isSubclass4, fromUuid, mergeObject: mergeObject2 } = foundry.utils;

class MediaLayer extends InteractionLayer {
  constructor() {
    super();
    this._activateHooks();
  }
  sprites = new Map;
  static get layerOptions() {
    return mergeObject2(super.layerOptions, {
      name: "shm-media-layer",
      zIndex: 100
    });
  }
  static MEDIA_TILE_ENABLED = "enabled";
  static MEDIA_TILE_NAME = "name";
  static SORT_FLAG_KEY = "sort";
  static MEDIA_FLAG_KEY = "media";
  async _draw(options) {
    super._draw(options);
    this.objects = this.addChild(new PIXI.Container);
    this.objects.sortableChildren = true;
    for (const region of game.canvas.regions.placeables) {
      const flag = region.document.getFlag("share-media", this.constructor.MEDIA_FLAG_KEY);
      if (flag)
        this.addSprite({ targetArea: region.document.uuid, ...flag });
    }
    for (const tile of game.canvas.tiles.placeables) {
      const flag = tile.document.getFlag("share-media", this.constructor.MEDIA_FLAG_KEY);
      if (flag)
        this.addSprite({ targetArea: tile.document.uuid, ...flag });
    }
  }
  _onClickLeft(_event) {
    if (game.settings.get("core", "leftClickRelease") && !game.modules.shareMedia.canvas.mediaSprite.hovered && game.modules.shareMedia.canvas.mediaSprite.controlled)
      game.modules.shareMedia.canvas.mediaSprite.controlled.release();
  }
  _onDragLeftDrop(_event) {
    if (game.modules.shareMedia.canvas.mediaSprite.controlled)
      game.modules.shareMedia.canvas.mediaSprite.controlled.release();
  }
  _deactivate() {
    if (game.modules.shareMedia.canvas.mediaSprite.controlled)
      game.modules.shareMedia.canvas.mediaSprite.controlled.release();
    ui.controls.controls.tokens.tools["toggle-shm-media-layer"].active = false;
  }
  async _tearDown(options) {
    for (const sprite of this.sprites.values()) {
      sprite.destroy();
    }
    this.sprites.clear();
    return super._tearDown(options);
  }
  async addSprite(options) {
    const { src = null, targetArea = null, ...additionalOptions } = options;
    const area = await fromUuid(targetArea);
    if (!area)
      return;
    if (this.sprites.has(targetArea))
      await this.deleteSprite(area.uuid);
    const spriteClass = this._getSpriteClass(area);
    if (!spriteClass)
      return;
    const sprite = new spriteClass(src, area, additionalOptions);
    await sprite.initialize();
    sprite.addToCanvas();
    this.sprites.set(area.uuid, sprite);
    Hooks.callAll("shareMedia.renderSceneSprite", sprite, area);
    return sprite;
  }
  _getSpriteClass(area) {
    switch (area.documentName) {
      case CONFIG.Region.documentClass.documentName:
        if (!area.shapes.length || !area.behaviors.some((behavior) => behavior.type === CONFIG.shareMedia.canvas.ShareRegionBehaviorType.type && !behavior.disabled))
          return;
        return game.modules.shareMedia.canvas.regionSprite;
      case CONFIG.Tile.documentClass.documentName:
        if (!area.getFlag("share-media", this.constructor.MEDIA_TILE_ENABLED))
          return;
        return game.modules.shareMedia.canvas.tileSprite;
    }
  }
  async deleteSprite(targetArea, { unsetFlag = false } = {}) {
    const sprite = this.sprites.get(targetArea);
    if (!sprite)
      return;
    sprite.destroy();
    this.sprites.delete(targetArea);
    if (unsetFlag && game.users.current.isGM) {
      const area = await fromUuid(targetArea);
      if (!area)
        return;
      await area.unsetFlag("share-media", this.constructor.MEDIA_FLAG_KEY);
      Hooks.callAll("shareMedia.deleteSceneSprite", area);
    }
  }
  async createAreaMediaData(targetArea, data) {
    const area = await fromUuid(targetArea);
    if (!area)
      return null;
    const updates = { [`flags.share-media.${this.constructor.MEDIA_FLAG_KEY}`]: data };
    if (!area.getFlag("share-media", this.constructor.SORT_FLAG_KEY)) {
      let sort = 0;
      for (const area2 of game.modules.shareMedia.utils.getAvailableAreas()) {
        sort = Math.max(sort, (area2.getFlag("share-media", this.constructor.SORT_FLAG_KEY) ?? 0) + 1);
      }
      updates[`flags.share-media.${this.constructor.SORT_FLAG_KEY}`] = sort;
    }
    return await area.update(updates, { diff: false });
  }
  async sendToBackOrBringToFront(targetArea, front) {
    const area = await fromUuid(targetArea);
    if (!area)
      return;
    let target = front ? -Infinity : Infinity;
    for (const document2 of game.modules.shareMedia.utils.getAvailableAreas()) {
      if (document2.uuid === targetArea)
        continue;
      const flag = document2.getFlag("share-media", this.constructor.SORT_FLAG_KEY);
      if (flag === undefined)
        continue;
      target = (front ? Math.max : Math.min)(target, flag);
    }
    if (!Number.isFinite(target))
      return;
    target += front ? 1 : -1;
    await area.setFlag("share-media", this.constructor.SORT_FLAG_KEY, target);
  }
  _activateHooks() {
    Hooks.on("updateRegion", this.#onUpdateArea.bind(this));
    Hooks.on("updateTile", this.#onUpdateArea.bind(this));
    Hooks.on("deleteRegion", this.#onDeleteArea.bind(this));
    Hooks.on("deleteTile", this.#onDeleteArea.bind(this));
    Hooks.on("createRegionBehavior", this.#onCreateRegionBehavior.bind(this));
    Hooks.on("updateRegionBehavior", this.#onUpdateRegionBehavior.bind(this));
    Hooks.on("deleteRegionBehavior", this.#onDeleteRegionBehavior.bind(this));
  }
  #onUpdateArea(document2, _changed, _options, _userId) {
    const flag = document2.getFlag("share-media", this.constructor.MEDIA_FLAG_KEY);
    if (flag)
      this.addSprite({ targetArea: document2.uuid, ...flag });
    else
      this.deleteSprite(document2.uuid);
  }
  #onDeleteArea(document2, _options, _userId) {
    this.deleteSprite(document2.uuid);
  }
  #onCreateRegionBehavior(document2, _options, _userId) {
    if (document2.type !== CONFIG.shareMedia.canvas.ShareRegionBehaviorType.type)
      return;
    document2 = document2.parent;
    const flag = document2.getFlag("share-media", this.constructor.MEDIA_FLAG_KEY);
    if (flag)
      this.addSprite({ targetArea: document2.uuid, ...flag });
  }
  #onUpdateRegionBehavior(document2, _changed, _options, _userId) {
    if (document2.type !== CONFIG.shareMedia.canvas.ShareRegionBehaviorType.type)
      return;
    document2 = document2.parent;
    const flag = document2.getFlag("share-media", this.constructor.MEDIA_FLAG_KEY);
    if (flag)
      this.addSprite({ targetArea: document2.uuid, ...flag });
  }
  #onDeleteRegionBehavior(document2, _options, _userId) {
    if (document2.type !== CONFIG.shareMedia.canvas.ShareRegionBehaviorType.type)
      return;
    document2 = document2.parent;
    const flag = document2.getFlag("share-media", this.constructor.MEDIA_FLAG_KEY);
    if (flag)
      this.addSprite({ targetArea: document2.uuid, ...flag });
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.canvas.MediaLayer;
    if (!isSubclass4(Class, MediaLayer)) {
      console.warn("Configured MediaLayer override must be a subclass of MediaLayer.");
      Class = MediaLayer;
    }
    return Class;
  }
}
// scripts/canvas/media-sprite.mjs
var { PrimarySpriteMesh } = foundry.canvas.primary;
var { MouseInteractionManager } = foundry.canvas.interaction;
var { loadTexture } = foundry.canvas;
var { isSubclass: isSubclass5 } = foundry.utils;

class MediaSprite {
  constructor(src, area, options) {
    if (!src || !area)
      throw new Error('You must pass a valid "src" and "area document uuid" to instantiate the class "SpriteMesh".');
    this.src = src;
    this.area = area;
    Object.assign(this.options, options);
  }
  src = null;
  area = null;
  options = {
    display: CONFIG.shareMedia.CONST.LAYERS_OPTIONS.displayFit.value,
    loop: false,
    mute: false
  };
  static SORT_LAYER = 250;
  static #textureRefCount = new Map;
  static hovered = null;
  static controlled = null;
  static lastControlled = null;
  static hud = null;
  _mesh = null;
  _mask = null;
  _frame = null;
  _border = null;
  #videoEndedHandler = null;
  #mouseInteractionManager = null;
  get fitMode() {
    if (!this.options.optionName)
      return "contain";
    return this.options.optionValue === CONFIG.shareMedia.CONST.LAYERS_OPTIONS.displayFit.value ? "contain" : "cover";
  }
  get hovered() {
    return MediaSprite.hovered;
  }
  set hovered(value) {
    if (!(value instanceof this.constructor) && value !== null)
      throw new Error('Wrong type passed to hovered "MediaSprite"');
    MediaSprite.hovered = value;
  }
  get controlled() {
    return MediaSprite.controlled;
  }
  set controlled(value) {
    if (!(value instanceof this.constructor) && value !== null)
      throw new Error('Wrong type passed to controlled "MediaSprite"');
    MediaSprite.controlled = value;
  }
  get isControlled() {
    return MediaSprite.controlled === this;
  }
  get hud() {
    if (!MediaSprite.hud)
      MediaSprite.hud = new game.modules.shareMedia.canvas.apps.hud;
    return MediaSprite.hud;
  }
  async initialize() {
    await this.#createMesh();
    this.#createMask();
    this.#createFrame();
    this.#createBorder();
    this.#createInteractionManager();
    return this;
  }
  async#createMesh() {
    this.src = `${this.src}?share-media-texture`;
    const texture = await loadTexture(this.src);
    if (!texture)
      throw new Error(`Failed to load texture from ${this.src}`);
    MediaSprite.#incrementTextureRef(this.src);
    this._mesh = new PrimarySpriteMesh(texture);
    this._createMesh();
    this._mesh.sortLayer = MediaSprite.SORT_LAYER;
    this._mesh.sort = this.area.getFlag("share-media", game.modules.shareMedia.canvas.layer.constructor.SORT_FLAG_KEY) ?? 1;
  }
  _createMesh() {
    throw new Error("_createMesh must be implemented by subclass");
  }
  #createMask() {
    this._mask = new PIXI.Graphics;
    this._createMask();
    this._mesh.mask = this._mask;
  }
  _createMask() {
    throw new Error("_createMask must be implemented by subclass");
  }
  #createFrame() {
    this._frame = this._mask.clone();
    this._frame.alpha = 0;
    this._frame.cursor = "pointer";
  }
  #createBorder() {
    this._border = new PIXI.Graphics;
    this._border.eventMode = "none";
    this._border.visible = false;
    this._createBorder();
  }
  _createBorder() {
    throw new Error("_createBorder must be implemented by subclass");
  }
  #createInteractionManager() {
    const permissions = {
      hoverIn: () => game.users.current.isGM,
      hoverOut: () => game.users.current.isGM,
      clickLeft: () => game.users.current.isGM,
      clickRight: () => game.users.current.isGM,
      dragStart: () => false,
      dragLeftStart: () => false,
      dragRightStart: () => false
    };
    const callbacks = {
      hoverIn: this._onHoverIn.bind(this),
      hoverOut: this._onHoverOut.bind(this),
      clickLeft: this._onClickLeft.bind(this),
      clickRight: this._onClickRight.bind(this)
    };
    this.#mouseInteractionManager = new MouseInteractionManager(this._frame, game.canvas.stage, permissions, callbacks);
    this.#mouseInteractionManager.activate();
  }
  _onHoverIn(event) {
    if (event.buttons & 3)
      return;
    this.hovered = this;
    if (this.isControlled)
      return;
    this._border.visible = true;
    this._border.tint = CONFIG.Canvas.dispositionColors.FRIENDLY;
  }
  _onHoverOut(_event) {
    this.hovered = null;
    if (this.isControlled)
      return;
    this._border.visible = false;
  }
  _onClickLeft(_event) {
    this.control();
  }
  _onClickRight(_event) {
    this.control();
    this.hud.bind(this);
  }
  control() {
    if (this.isControlled)
      return;
    if (!this.isControlled)
      this.controlled?.release();
    this.controlled = this;
    MediaSprite.lastControlled = this.area.uuid;
    this._border.visible = true;
    this._border.tint = CONFIG.Canvas.dispositionColors.CONTROLLED;
  }
  release() {
    if (!this.isControlled)
      return;
    this.controlled = null;
    this.hud.close();
    this._border.visible = false;
  }
  addToCanvas() {
    if (!game.canvas)
      return;
    game.canvas.masks.addChild(this._mask);
    game.canvas.primary.addChild(this._mesh);
    game.modules.shareMedia.canvas.layer.objects.addChild(this._frame);
    game.modules.shareMedia.canvas.layer.objects.addChild(this._border);
    const video = game.video.getVideoSource(this._mesh);
    if (video) {
      if (!this.options.mute)
        game.canvas.primary.videoMeshes.add(this._mesh);
      if (!this.options.loop) {
        this.#videoEndedHandler = () => game.modules.shareMedia.canvas.layer.deleteSprite(this.area.uuid, { unsetFlag: true });
        video.addEventListener("ended", this.#videoEndedHandler);
      }
      game.video.play(video, {
        loop: this.options.loop,
        volume: this.options.mute ? 0 : game.settings.get("core", "globalAmbientVolume")
      });
    }
    if (game.modules.shareMedia.canvas.layer.active) {
      if (MediaSprite.lastControlled === this.area.uuid)
        this.control();
      if (game.modules.shareMedia.canvas.apps.hud.lastSprite === this.area.uuid)
        this.hud.bind(this);
    }
  }
  destroy() {
    if (!game.canvas)
      return;
    if (this.isControlled)
      this.release();
    if (this.hovered)
      this.hovered = null;
    const video = game.video.getVideoSource(this._mesh);
    if (video) {
      if (this.#videoEndedHandler) {
        video.removeEventListener("ended", this.#videoEndedHandler);
        this.#videoEndedHandler = null;
      }
      if (game.canvas.primary.videoMeshes.has(this._mesh))
        game.canvas.primary.videoMeshes.delete(this._mesh);
      game.video.stop(video);
    }
    this.#mouseInteractionManager.cancel();
    if (this._mesh.parent)
      this._mesh.parent.removeChild(this._mesh);
    if (this._mask.parent)
      this._mask.parent.removeChild(this._mask);
    if (this._frame.parent)
      this._frame.parent.removeChild(this._frame);
    if (this._border.parent)
      this._border.parent.removeChild(this._border);
    if (!this._mesh.destroyed)
      this._mesh.destroy();
    if (!this._mask.destroyed)
      this._mask.destroy();
    if (!this._frame.destroyed)
      this._frame.destroy();
    if (!this._border.destroyed)
      this._border.destroy();
    this.area = null;
    this._mesh = null;
    this._mask = null;
    this._frame = null;
    this._border = null;
    this.#mouseInteractionManager = null;
    MediaSprite.#decrementTextureRef(this.src);
  }
  static #incrementTextureRef(src) {
    if (!src)
      return;
    const count = MediaSprite.#textureRefCount.get(src) || 0;
    MediaSprite.#textureRefCount.set(src, count + 1);
  }
  static async#decrementTextureRef(src) {
    if (!src)
      return;
    const count = MediaSprite.#textureRefCount.get(src) || 0;
    if (count <= 1) {
      MediaSprite.#textureRefCount.delete(src);
      await PIXI.Assets.unload(src).catch(() => {});
    } else {
      MediaSprite.#textureRefCount.set(src, count - 1);
    }
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.canvas.MediaSprite;
    if (!isSubclass5(Class, MediaSprite)) {
      console.warn("Configured MediaSprite override must be a subclass of MediaSprite.");
      Class = MediaSprite;
    }
    return Class;
  }
}
// scripts/canvas/region-sprite.mjs
var { isSubclass: isSubclass6 } = foundry.utils;

class RegionSprite extends MediaSprite {
  _createMesh() {
    const { x, y, width, height } = this.area.bounds;
    this._mesh.resize(width, height, { fit: this.fitMode });
    this._mesh.x = x + (width - this._mesh.width) / 2;
    this._mesh.y = y + (height - this._mesh.height) / 2;
  }
  _createMask() {
    const polygons = this.area.polygons;
    if (polygons?.length) {
      this._mask.beginFill(16777215, 1);
      for (const polygon of polygons) {
        if (polygon.isPositive) {
          this._mask.drawPolygon(polygon);
        } else {
          this._mask.beginHole();
          this._mask.drawPolygon(polygon);
          this._mask.endHole();
        }
      }
      this._mask.endFill();
    }
  }
  _createBorder() {
    const thickness = CONFIG.Canvas.objectBorderThickness * game.canvas.dimensions.uiScale;
    for (const lineStyle of [
      { width: thickness, color: 0, join: PIXI.LINE_JOIN.ROUND, alignment: 0.75 },
      { width: thickness / 2, color: 16777215, join: PIXI.LINE_JOIN.ROUND, alignment: 1 }
    ]) {
      this._border.lineStyle(lineStyle);
      const polygonsTree = this.area.polygonTree;
      for (const node of polygonsTree) {
        if (node.isHole)
          continue;
        this._border.drawShape(node.polygon);
        this._border.beginHole();
        for (const hole of node.children)
          this._border.drawShape(hole.polygon);
        this._border.endHole();
      }
    }
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.canvas.RegionSprite;
    if (!isSubclass6(Class, RegionSprite)) {
      console.warn("Configured RegionSprite override must be a subclass of RegionSprite.");
      Class = RegionSprite;
    }
    return Class;
  }
}
// scripts/canvas/tile-sprite.mjs
var { isSubclass: isSubclass7 } = foundry.utils;

class TileSprite extends MediaSprite {
  _createMesh() {
    const { x, y, width, height } = this.area;
    this._mesh.anchor.set(0.5);
    this._mesh.rotation = Math.toRadians(this.area.rotation);
    this._mesh.resize(width, height, { fit: this.fitMode });
    this._mesh.x = x + width / 2;
    this._mesh.y = y + height / 2;
  }
  _createMask() {
    const { x, y, width, height } = this.area;
    this._mask.beginFill(16777215, 1);
    this._mask.drawRect(x, y, width, height);
    this._mask.endFill();
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    this._mask.pivot.set(centerX, centerY);
    this._mask.x = centerX;
    this._mask.y = centerY;
    this._mask.rotation = Math.toRadians(this.area.rotation);
  }
  _createBorder() {
    const thickness = CONFIG.Canvas.objectBorderThickness * game.canvas.dimensions.uiScale;
    for (const lineStyle of [
      { width: thickness, color: 0, join: PIXI.LINE_JOIN.ROUND, alignment: 0.75 },
      { width: thickness / 2, color: 16777215, join: PIXI.LINE_JOIN.ROUND, alignment: 1 }
    ]) {
      this._border.lineStyle(lineStyle);
      this._border.drawRect(this.area.x, this.area.y, this.area.width, this.area.height);
      this._border.pivot.set(this.area.x + this.area.width / 2, this.area.y + this.area.height / 2);
      this._border.x = this.area.x + this.area.width / 2;
      this._border.y = this.area.y + this.area.height / 2;
      this._border.rotation = Math.toRadians(this.area.rotation);
    }
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.canvas.TileSprite;
    if (!isSubclass7(Class, TileSprite)) {
      console.warn("Configured TileSprite override must be a subclass of TileSprite.");
      Class = TileSprite;
    }
    return Class;
  }
}
// scripts/canvas/share-region-behavior.mjs
var { RegionBehaviorType } = foundry.data.regionBehaviors;
var { isSubclass: isSubclass8 } = foundry.utils;

class ShareRegionBehaviorType extends RegionBehaviorType {
  static type = "share-media.ShareRegion";
  static defineSchema() {
    return {};
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.canvas.ShareRegionBehaviorType;
    if (!isSubclass8(Class, ShareRegionBehaviorType)) {
      console.warn("Configured ShareRegionBehaviorType override must be a subclass of ShareRegionBehaviorType.");
      Class = ShareRegionBehaviorType;
    }
    return Class;
  }
}
// scripts/canvas/apps/_module.mjs
var exports__module3 = {};
__export(exports__module3, {
  MediaHUD: () => MediaHUD
});

// scripts/canvas/apps/media-hud.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin7, ApplicationV2: ApplicationV27 } = foundry.applications.api;
var { isSubclass: isSubclass9 } = foundry.utils;

class MediaHUD extends HandlebarsApplicationMixin7(ApplicationV27) {
  static DEFAULT_OPTIONS = {
    id: "shm-media-hud",
    classes: ["placeable-hud"],
    tag: "form",
    window: {
      frame: false,
      positioned: true
    },
    actions: {
      sortMedia: MediaHUD.#onSortMedia,
      clearMedia: MediaHUD.#onClearMedia
    },
    position: {}
  };
  static PARTS = {
    hud: { template: "modules/share-media/templates/canvas/media-hud.hbs", root: true }
  };
  static lastSprite = null;
  #sprite = null;
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    const { sprite } = options;
    if (!sprite)
      return;
    this.#sprite = sprite;
    this.constructor.lastSprite = this.#sprite.area.uuid;
  }
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS,
      controlIcons: CONFIG.controlIcons
    };
  }
  _updatePosition(position) {
    const s = game.canvas.dimensions.uiScale;
    const { x: left, y: top, width, height } = this.#sprite._frame.getLocalBounds();
    Object.assign(position, { left, top, width: width / s, height: height / s });
    position.scale = s;
    return position;
  }
  async _preClose(options) {
    super._preClose(options);
    options.animate = false;
  }
  async _onClose(options) {
    super._onClose(options);
    this.#sprite = null;
  }
  _insertElement(element) {
    const parent = document.getElementById("hud");
    parent.append(element);
  }
  async bind(sprite) {
    await this.render({ force: true, position: true, sprite });
  }
  static async#onSortMedia(_event, target) {
    const up = target.dataset.direction === "up";
    await game.modules.shareMedia.canvas.layer.sendToBackOrBringToFront(this.#sprite.area.uuid, up);
  }
  static #onClearMedia(_event, _target) {
    game.modules.shareMedia.canvas.layer.deleteSprite(this.#sprite.area.uuid, { unsetFlag: true });
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.canvas.apps.MediaHUD;
    if (!isSubclass9(Class, MediaHUD)) {
      console.warn("Configured MediaHUD override must be a subclass of MediaHUD.");
      Class = MediaHUD;
    }
    return Class;
  }
}
// scripts/canvas/_module.mjs
var registerRegionBehaviors = () => {
  const config = CONFIG.shareMedia;
  const shareRegionBehaviorType = config.canvas.ShareRegionBehaviorType;
  CONFIG.RegionBehavior.dataModels[shareRegionBehaviorType.type] = shareRegionBehaviorType.implementation;
  CONFIG.RegionBehavior.typeIcons[shareRegionBehaviorType.type] = config.CONST.ICONS.sceneFit;
};
var registerTileConfiguration = () => {
  Hooks.on("renderTileConfig", (application, element, _context, _option) => {
    if (!game.users.current.isGM)
      return;
    const { MEDIA_TILE_ENABLED, MEDIA_TILE_NAME } = game.modules.shareMedia.canvas.layer.constructor;
    const enabled = application.document.getFlag("share-media", MEDIA_TILE_ENABLED) ?? false;
    const name = application.document.getFlag("share-media", MEDIA_TILE_NAME) || game.i18n.localize("share-media.canvas.layer.tile.name.default");
    const html = `
      <fieldset>
        <legend>${game.i18n.localize("share-media.canvas.layer.tile.label")}</legend>
        <div class="form-group">
          <label for="flags.share-media.${MEDIA_TILE_ENABLED}">${game.i18n.localize("share-media.canvas.layer.tile.enabled.label")}</label>
          <div class="shm form-fields">
            <input type="checkbox" name="flags.share-media.${MEDIA_TILE_ENABLED}" id="flags.share-media.${MEDIA_TILE_ENABLED}" ${enabled ? "checked" : ""}>
          </div>
          <p class="hint">${game.i18n.localize("share-media.canvas.layer.tile.enabled.description")}</p>
        </div>
        <div class="form-group">
          <label for="flags.share-media.${MEDIA_TILE_NAME}">${game.i18n.localize("share-media.canvas.layer.tile.name.label")}</label>
          <div class="form-fields">
            <input type="text" name="flags.share-media.${MEDIA_TILE_NAME}" id="flags.share-media.${MEDIA_TILE_NAME}" value="${name}">
          </div>
          <p class="hint">${game.i18n.localize("share-media.canvas.layer.tile.name.description")}</p>
        </div>
      </fieldset>
    `;
    const tab = element.querySelector('.tab[data-tab="appearance"]');
    if (!tab)
      return;
    tab.insertAdjacentHTML("beforeend", html);
  });
};
var registerMediaLayer = () => {
  const blacklistSettings = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.blacklistSettings);
  if (!blacklistSettings.includes(game.userId)) {
    CONFIG.Canvas.layers["shm-media-layer"] = {
      group: "interface",
      layerClass: CONFIG.shareMedia.canvas.MediaLayer.implementation
    };
    Hooks.on("getSceneControlButtons", (controls) => {
      controls.tokens.tools["toggle-shm-media-layer"] = {
        name: "toggle-shm-media-layer",
        title: "share-media.canvas.layer.tool.label",
        icon: CONFIG.shareMedia.CONST.ICONS.mediaLayer,
        toggle: true,
        visible: game.users.current.isGM,
        active: (() => {
          if (!game.modules.shareMedia.canvas.layer)
            return false;
          return game.modules.shareMedia.canvas.layer.active;
        })(),
        onChange: (_event, active) => {
          if (active) {
            if (game.modules.shareMedia.canvas.layer.sprites.size < 1)
              ui.notifications.info(game.i18n.localize("share-media.canvas.layer.tool.zero"));
            game.modules.shareMedia.canvas.layer.activate();
          } else
            game.canvas.tokens.activate();
        }
      };
    });
  }
};

// scripts/layers/_module.mjs
var exports__module6 = {};
__export(exports__module6, {
  mixins: () => exports__module5,
  PopoutLayer: () => PopoutLayer,
  FullscreenLayer: () => FullscreenLayer
});

// scripts/layers/popout-layer.mjs
var { ImagePopout } = foundry.applications.apps;
var { isSubclass: isSubclass10 } = foundry.utils;

class PopoutLayer extends ImagePopout {
  static DEFAULT_OPTIONS = {
    id: "shm-popout-{id}",
    window: {
      contentClasses: ["shm"]
    }
  };
  static PARTS = { media: { template: "modules/share-media/templates/layers/[layer]-media.hbs" } };
  _prepareHookContext() {
    return {
      caption: this.options.caption
    };
  }
  _getHeaderControls() {
    return [];
  }
  async _postRender(context, options) {
    await super._postRender(context, options);
    this.setPosition({
      height: this.position.height + this.getVerticalSize(this.element.querySelector(".window-header")) + this.getVerticalSize(this.element.querySelector(".window-content"), { height: false }) + this.getVerticalSize(this.element.querySelector("figure"), { height: false }) + this.getVerticalSize(this.element.querySelector("figcaption"))
    });
    Hooks.callAll("shareMedia.renderPopout", this, this.mediaElement, this._prepareHookContext());
  }
  async minimize() {
    await super.minimize();
    if (this.isVideo)
      this.mediaElement.pause();
  }
  async maximize() {
    await super.maximize();
    if (this.isVideo)
      this.mediaElement.play();
  }
  getVerticalSize(element, {
    height = true,
    paddingTop = true,
    paddingBottom = true,
    marginTop = true,
    marginBottom = true,
    borderTop = true,
    borderBottom = true
  } = {}) {
    if (!element)
      return 0;
    const options = {
      height,
      paddingTop,
      paddingBottom,
      marginTop,
      marginBottom,
      borderTop,
      borderBottom
    };
    const toNum = (value) => parseFloat(value) || 0;
    const style = getComputedStyle(element);
    return Object.entries(options).filter(([_, include]) => include).reduce((total, [prop]) => {
      if (prop === "height")
        return total + element.offsetHeight;
      if (prop.startsWith("border"))
        return total + toNum(style[prop + "Width"]);
      return total + toNum(style[prop]);
    }, 0);
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.layers.PopoutLayer;
    if (!isSubclass10(Class, PopoutLayer)) {
      console.warn("Configured PopoutLayer override must be a subclass of PopoutLayer.");
      Class = PopoutLayer;
    }
    const { MediaMixin, DarknessMixin } = CONFIG.shareMedia.layers.mixins;
    return MediaMixin(DarknessMixin(Class));
  }
}
// scripts/layers/fullscreen-layer.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin8, ApplicationV2: ApplicationV28 } = foundry.applications.api;
var { isSubclass: isSubclass11 } = foundry.utils;

class FullscreenLayer extends HandlebarsApplicationMixin8(ApplicationV28) {
  constructor(options) {
    super(options);
    if (FullscreenLayer._instance?.rendered)
      FullscreenLayer._instance.close({ animate: false });
    FullscreenLayer._instance = this;
  }
  static {
    CONFIG.queries["share-media.closeFullscreen"] = FullscreenLayer.close;
  }
  folded = false;
  static IMMERSIVE_ZINDEX = 9998;
  static _instance = null;
  static DEFAULT_OPTIONS = {
    tag: "dialog",
    id: "shm-fullscreen",
    classes: ["shm"],
    window: {
      positioned: false,
      frame: false
    },
    actions: {
      dismiss: FullscreenLayer.#onDismiss,
      toggleFolded: FullscreenLayer.#toggleFolded
    },
    caption: "",
    immersive: false,
    controls: false
  };
  static PARTS = {
    actions: { template: "modules/share-media/templates/layers/fullscreen-actions.hbs" },
    media: { template: "modules/share-media/templates/layers/[layer]-media.hbs" }
  };
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      caption: this.options.caption
    };
  }
  async _preparePartContext(partId, context, _options) {
    switch (partId) {
      case "actions":
        context.icons = CONFIG.shareMedia.CONST.ICONS;
        context.isGM = game.user.isGM;
        context.controls = game.user.isGM || this.options.controls;
        context.folded = this.folded;
        break;
    }
    return context;
  }
  _prepareHookContext() {
    return {
      caption: this.options.caption,
      immersive: this.options.immersive,
      controls: this.options.controls
    };
  }
  static #onDismiss(_event, _target) {
    if (!game.user.isGM)
      return;
    const users = game.users.reduce((acc, user) => {
      if (user.active)
        acc.push(user.id);
      return acc;
    }, []);
    for (const userId of users) {
      game.users.get(userId).query("share-media.closeFullscreen");
    }
  }
  static async#toggleFolded(_event, _target) {
    this.folded = !this.folded;
    if (this.isVideo)
      this.folded ? this.mediaElement.pause() : this.mediaElement.play();
    this.element.classList.toggle("folded", this.folded);
    await this.render({ parts: ["actions"] });
  }
  static async close() {
    if (!FullscreenLayer._instance?.rendered)
      return;
    await FullscreenLayer._instance.close({ animate: false });
  }
  async _onFirstRender(context, options) {
    await super._onFirstRender(context, options);
    if (this.options.immersive)
      this.element.style.zIndex = String(this.constructor.IMMERSIVE_ZINDEX);
  }
  async _postRender(context, options) {
    await super._postRender(context, options);
    Hooks.callAll("shareMedia.renderFullscreen", this, this.mediaElement, this._prepareHookContext());
  }
  _onClose(options) {
    super._onClose(options);
    if (FullscreenLayer._instance === this)
      FullscreenLayer._instance = null;
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.layers.FullscreenLayer;
    if (!isSubclass11(Class, FullscreenLayer)) {
      console.warn("Configured FullscreenLayer override must be a subclass of FullscreenLayer.");
      Class = FullscreenLayer;
    }
    const { MediaMixin, DarknessMixin } = CONFIG.shareMedia.layers.mixins;
    return MediaMixin(DarknessMixin(Class));
  }
}
// scripts/layers/mixins/_module.mjs
var exports__module5 = {};
__export(exports__module5, {
  MediaMixin: () => MediaMixin,
  DarknessMixin: () => DarknessMixin
});

// scripts/layers/mixins/darkness-mixin.mjs
var { hasProperty } = foundry.utils;
function DarknessMixin(Base) {
  return class extends Base {
    darknessOverlay = null;
    static DEFAULT_OPTIONS = {
      darkness: false,
      sceneId: null
    };
    #darknessSceneId = null;
    #sceneHookId = null;
    #canvasHookId = null;
    #previousCanvasDarknessLevel = null;
    #darknessAnimation = null;
    get canDisplayDarkness() {
      return this.options.darkness && game.scenes.get(this.#darknessSceneId);
    }
    async#updateDarkness(document2, changed, options, _userId) {
      if (document2.id !== this.#darknessSceneId || !hasProperty(changed, "environment.darknessLevel"))
        return;
      if (this.minimized) {
        if (this.#darknessAnimation)
          this.#darknessAnimation.cancel();
        this.darknessOverlay.style.opacity = changed.environment.darknessLevel;
        return;
      }
      if (this.#darknessAnimation) {
        this.#darknessAnimation.commitStyles();
        this.#darknessAnimation.cancel();
      }
      const initialOpacity = parseFloat(getComputedStyle(this.darknessOverlay).opacity);
      this.#darknessAnimation = this.darknessOverlay.animate([{ opacity: initialOpacity }, { opacity: changed.environment.darknessLevel }], { duration: options?.animateDarkness ?? 0, fill: "forwards" });
      await this.#darknessAnimation.finished.catch((_error) => null);
      if (this.#darknessAnimation?.playState === "finished") {
        if (this.minimized)
          this.darknessOverlay.style.opacity = changed.environment.darknessLevel;
        else
          this.#darknessAnimation.commitStyles();
        this.#darknessAnimation.cancel();
        this.#darknessAnimation = null;
      }
    }
    #onCanvasEnvironmentChange(config) {
      if (game.canvas.scene.id !== this.#darknessSceneId)
        return;
      const darknessLevel = config.environment?.darknessLevel;
      if (!darknessLevel && darknessLevel !== 0)
        return;
      if (!this.#previousCanvasDarknessLevel) {
        this.#previousCanvasDarknessLevel = darknessLevel;
        return;
      }
      if (this.#previousCanvasDarknessLevel === darknessLevel)
        return;
      const direction = this.#previousCanvasDarknessLevel < darknessLevel ? 1 : 0;
      const duration = Math.abs(direction - darknessLevel) * CONFIG.Canvas.darknessToDaylightAnimationMS;
      this.#updateDarkness(game.scenes.get(this.#darknessSceneId), { environment: { darknessLevel: direction } }, { animateDarkness: duration });
      Hooks.off("configureCanvasEnvironment", this.#canvasHookId);
      this.#canvasHookId = null;
    }
    async _prepareContext(options) {
      return {
        ...await super._prepareContext(options),
        ...this.canDisplayDarkness && {
          darkness: this.canDisplayDarkness,
          darknessColor: new Color(CONFIG.Canvas.darknessColor).css,
          initialOpacity: game.scenes.get(this.#darknessSceneId)?.environment.darknessLevel ?? 0
        }
      };
    }
    _prepareHookContext() {
      return {
        ...super._prepareHookContext(),
        darkness: this.options.darkness
      };
    }
    _configureRenderOptions(options) {
      super._configureRenderOptions(options);
      this.#darknessSceneId = this.options.sceneId ?? game.canvas.scene?.id ?? null;
    }
    async _onFirstRender(context, options) {
      await super._onFirstRender(context, options);
      if (this.canDisplayDarkness) {
        this.#sceneHookId = Hooks.on("updateScene", this.#updateDarkness.bind(this));
        this.#canvasHookId = Hooks.on("configureCanvasEnvironment", this.#onCanvasEnvironmentChange.bind(this));
      }
    }
    async _onRender(context, options) {
      await super._onRender(context, options);
      if (this.canDisplayDarkness)
        this.darknessOverlay = this.element.querySelector(".darkness");
    }
    async _postRender(context, options) {
      await super._postRender(context, options);
      if (this.canDisplayDarkness) {
        setTimeout(() => {
          if (this.#canvasHookId) {
            Hooks.off("configureCanvasEnvironment", this.#canvasHookId);
            this.#canvasHookId = null;
          }
        }, 100);
      }
    }
    _onClose(options) {
      super._onClose(options);
      this._resetDarknessState();
      this._resetDarknessDOM();
    }
    _resetDarknessState() {
      if (this.#sceneHookId)
        Hooks.off("updateScene", this.#sceneHookId);
      this.#sceneHookId = null;
      if (this.#canvasHookId)
        Hooks.off("configureCanvasEnvironment", this.#canvasHookId);
      this.#canvasHookId = null;
      this.#darknessSceneId = null;
      this.#previousCanvasDarknessLevel = null;
    }
    _resetDarknessDOM() {
      if (this.#darknessAnimation)
        this.#darknessAnimation.cancel();
      this.#darknessAnimation = null;
      this.darknessOverlay = null;
    }
  };
}
// scripts/layers/mixins/media-mixin.mjs
function MediaMixin(Base) {
  return class extends Base {
    mediaElement = null;
    static DEFAULT_OPTIONS = {
      src: null,
      loop: false,
      mute: false
    };
    #videoElementListener = null;
    #volumeHookId = null;
    get isVideo() {
      return game.modules.shareMedia.utils.isVideo(this.options.src);
    }
    async _prepareContext(options) {
      return {
        ...await super._prepareContext(options),
        isVideo: this.isVideo,
        media: this.options.src
      };
    }
    _prepareHookContext() {
      return {
        ...super._prepareHookContext(),
        src: this.options.src,
        ...this.isVideo && { loop: this.options.loop, mute: this.options.mute }
      };
    }
    async _onFirstRender(context, options) {
      await super._onFirstRender(context, options);
      if (this.isVideo && !this.options.mute) {
        this.#volumeHookId = Hooks.on("globalInterfaceVolumeChanged", (volume) => this.mediaElement.volume = volume);
      }
    }
    async _onRender(context, options) {
      await super._onRender(context, options);
      this.mediaElement = this.element.querySelector("img, video");
      if (this.isVideo && !this.options.mute)
        this.mediaElement.volume = game.settings.get("core", "globalInterfaceVolume");
    }
    async _postRender(context, options) {
      await super._postRender(context, options);
      if (this.isVideo) {
        this.mediaElement.muted = this.options.mute;
        this.mediaElement.loop = this.options.loop;
        if (!this.options.loop) {
          this.#videoElementListener = () => this.close({ animate: this.options.window.frame });
          this.mediaElement.addEventListener("ended", this.#videoElementListener);
        }
      }
    }
    _onClose(options) {
      super._onClose(options);
      this._resetMediaState();
      this._resetMediaDOM();
    }
    _resetMediaState() {
      if (this.#volumeHookId)
        Hooks.off("globalInterfaceVolumeChanged", this.#volumeHookId);
    }
    _resetMediaDOM() {
      if (this.isVideo && this.#videoElementListener)
        this.mediaElement?.removeEventListener("ended", this.#videoElementListener);
      this.#videoElementListener = null;
      this.mediaElement = null;
    }
  };
}
// scripts/shareables/_module.mjs
var exports__module9 = {};
__export(exports__module9, {
  mixins: () => exports__module8,
  apps: () => exports__module7,
  applyEntitySharingSettings: () => applyEntitySharingSettings,
  ShareablesManager: () => ShareablesManager
});

// scripts/shareables/shareables-manager.mjs
var { isSubclass: isSubclass12 } = foundry.utils;

class ShareablesManager {
  constructor() {
    if (game.modules.shareMedia.shareables.manager)
      throw new Error("You may not re-construct the singleton ShareablesManager.");
    this._registerUserQueries();
  }
  static PIPELINE_STEPS = [
    { name: "is-gm", condition: (_options) => true },
    {
      name: "all-users",
      condition: (options) => options.optionName === CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersAll.name && options.optionValue === CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersAll.value || options.mode === CONFIG.shareMedia.CONST.LAYERS_MODES.scene
    },
    { name: "user-selection", condition: (options) => options.optionName === CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersSelection.name && options.optionValue === CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersSelection.value },
    {
      name: "blacklist-filter",
      condition: (options) => options.mode !== CONFIG.shareMedia.CONST.LAYERS_MODES.scene
    },
    {
      name: "area-selection",
      condition: (options) => options.mode === CONFIG.shareMedia.CONST.LAYERS_MODES.scene
    },
    {
      name: "has-darkness",
      condition: (options) => options.darkness && options.mode !== CONFIG.shareMedia.CONST.LAYERS_MODES.scene
    },
    { name: "create-area-flag", condition: (options) => options.mode === CONFIG.shareMedia.CONST.LAYERS_MODES.scene },
    { name: "create-layer", condition: (options) => options.mode !== CONFIG.shareMedia.CONST.LAYERS_MODES.scene },
    { name: "store-media", condition: (_options) => true }
  ];
  static PIPELINE_HANDLERS = {
    "is-gm": ShareablesManager._handleIsGm,
    "all-users": ShareablesManager._handleAllUsers,
    "user-selection": ShareablesManager._handleUserSelection,
    "blacklist-filter": ShareablesManager._handleBlackListFilter,
    "area-selection": ShareablesManager._handleAreaSelection,
    "has-darkness": ShareablesManager._handleHasDarkness,
    "create-area-flag": ShareablesManager._handleCreateAreaFlag,
    "create-layer": ShareablesManager._handleCreatelayer,
    "store-media": ShareablesManager._handleStoreMedia
  };
  async dispatch(options = {}) {
    if (!this._validateOptions(options))
      return;
    const pipeline = this.#createExecutionPipeline(options);
    const result = await this.#executePipeline(pipeline, options);
    return !!result;
  }
  _validateOptions(options = {}) {
    const actions = CONFIG.shareMedia.CONST.MEDIA_ACTIONS;
    if (!options.src)
      throw new Error('You must pass a valid "options.src" option to "ShareablesManager.shareMedia".');
    if (!options.mode || !Object.values(actions).flat().map((action) => action.mode).includes(options.mode))
      throw new Error('You must pass a valid "options.mode" option to "ShareablesManager.shareMedia".');
    const hasMatchingOption = actions[options.mode].some(({ optionName, optionValue }) => optionName === options.optionName && optionValue === options.optionValue);
    if (!hasMatchingOption)
      throw new Error('You must pass a valid "optionName" and "optionValue" to "ShareablesManager.shareMedia".');
    return true;
  }
  #createExecutionPipeline(options) {
    return this.constructor.PIPELINE_STEPS.filter((step) => step.condition(options)).map((step) => ({
      type: step.name,
      handler: this.#getHandler(step.name)
    }));
  }
  async#executePipeline(pipeline, options) {
    let context = { ...options };
    for (const step of pipeline) {
      context = await step.handler(context);
      if (!context)
        break;
    }
    Hooks.callAll("share-media.executePipeline", pipeline, options);
    return context;
  }
  #getHandler(stepName) {
    const handler = this.constructor.PIPELINE_HANDLERS[stepName];
    if (!handler)
      throw new Error(`No handler found for step: ${stepName}`);
    return (context) => handler.call(this, context);
  }
  static async _handleIsGm(context) {
    if (!game.users.current.isGM) {
      ui.notifications.warn("Only Gamemasters are able to share media!");
      return null;
    }
    return context;
  }
  static async _handleAllUsers(context) {
    const targetUsers = game.users.filter((u) => u.active).map((u) => u.id);
    return { ...context, targetUsers };
  }
  static async _handleUserSelection(context) {
    const targetUsers = await game.modules.shareMedia.shareables.apps.userSelector.wait();
    if (!targetUsers)
      return null;
    return { ...context, targetUsers };
  }
  static async _handleBlackListFilter(context) {
    const { targetUsers, ...data } = context;
    if (!targetUsers || !targetUsers.length)
      return context;
    const blacklistSettings = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.blacklistSettings);
    const allowedUsers = targetUsers.filter((user) => !blacklistSettings.includes(user));
    if (!allowedUsers.length)
      return null;
    return { ...data, targetUsers: allowedUsers };
  }
  static async _handleAreaSelection(context) {
    if (!game.canvas) {
      ui.notifications.warn('An active scene is needed to share with "scene" mode!');
      return null;
    }
    const availableAreas = game.modules.shareMedia.utils.getAvailableAreas();
    if (availableAreas.length === 1) {
      return { ...context, targetArea: availableAreas[0].uuid };
    }
    const options = {};
    if (context.targetArea)
      options.targetArea = context.targetArea;
    const targetArea = await game.modules.shareMedia.shareables.apps.areaSelector.wait(options);
    if (!targetArea)
      return null;
    return { ...context, targetArea };
  }
  static async _handleHasDarkness(context) {
    if (!game.canvas)
      return null;
    context.sceneId = game.canvas.scene?.id ?? null;
    return context;
  }
  static async _handleCreateAreaFlag(context) {
    const { users: _users, mode: _mode, targetArea, ...data } = context;
    const result = await game.modules.shareMedia.canvas.layer.createAreaMediaData(targetArea, data);
    return result ? context : null;
  }
  static async _handleCreatelayer(context) {
    const { users: _users, targetUsers, ...data } = context;
    if (!targetUsers || !targetUsers.length)
      return null;
    for (const userId of targetUsers) {
      game.users.get(userId).query("share-media.renderLayer", data);
    }
    return context;
  }
  static async _handleStoreMedia(context) {
    const { src, targetUsers, ...settings2 } = context;
    const mediaSidebarSettings = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSidebarSettings);
    if (mediaSidebarSettings.layers[settings2.mode])
      game.modules.shareMedia.ui.sidebar.storeMedia(src, targetUsers, settings2);
    return context;
  }
  _registerUserQueries() {
    CONFIG.queries["share-media.renderLayer"] = this._renderLayer.bind(this);
  }
  _renderLayer(data) {
    const { mode, ...options } = data;
    const LayerClass = game.modules.shareMedia.layers[mode];
    if (!LayerClass)
      throw new Error(`Unknown layer mode received via query: ${mode}`);
    const layer = new LayerClass(options);
    layer.render({ force: true });
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.shareables.ShareablesManager;
    if (!isSubclass12(Class, ShareablesManager)) {
      console.warn("Configured ShareablesManager override must be a subclass of ShareablesManager.");
      Class = ShareablesManager;
    }
    return Class;
  }
}
// scripts/shareables/apps/_module.mjs
var exports__module7 = {};
__export(exports__module7, {
  UserSelector: () => UserSelector,
  ShareSelector: () => ShareSelector,
  AreaSelector: () => AreaSelector
});

// scripts/shareables/apps/user-selector.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin9, ApplicationV2: ApplicationV29 } = foundry.applications.api;
var { isSubclass: isSubclass13 } = foundry.utils;

class UserSelector extends HandlebarsApplicationMixin9(ApplicationV29) {
  static DEFAULT_OPTIONS = {
    id: "shm-user-selector-{id}",
    tag: "form",
    window: {
      get title() {
        return "share-media.shareables.selector.user.label";
      },
      contentClasses: ["standard-form"]
    },
    position: {
      width: 400,
      height: "auto"
    },
    form: {
      handler: UserSelector.#onSubmit,
      closeOnSubmit: true
    }
  };
  static PARTS = {
    form: { template: "modules/share-media/templates/shareables/user-selector.hbs", root: true }
  };
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS,
      users: this.#prepareUsers()
    };
  }
  #prepareUsers() {
    return game.users.filter((user) => user.active).map((user) => ({
      id: user.id,
      name: user.name,
      color: user.color,
      isGM: user.isGM
    }));
  }
  static async#onSubmit(_event, _form, formData) {
    return Object.entries(formData.object).filter(([_, value]) => value === true).map(([key]) => key);
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.shareables.apps.UserSelector;
    if (!isSubclass13(Class, UserSelector)) {
      console.warn("Configured UserSelector override must be a subclass of UserSelector.");
      Class = UserSelector;
    }
    const { WaitableMixin } = CONFIG.shareMedia.shareables.mixins;
    return WaitableMixin(Class);
  }
}
// scripts/shareables/apps/area-selector.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin10, ApplicationV2: ApplicationV210 } = foundry.applications.api;
var { isSubclass: isSubclass14, fromUuid: fromUuid2 } = foundry.utils;

class AreaSelector extends HandlebarsApplicationMixin10(ApplicationV210) {
  static DEFAULT_OPTIONS = {
    id: "shm-area-selector-{id}",
    tag: "form",
    window: {
      title: "share-media.shareables.selector.area.label",
      contentClasses: ["standard-form"]
    },
    position: {
      width: 400,
      height: "auto"
    },
    form: {
      handler: AreaSelector.#onSubmit,
      closeOnSubmit: true
    },
    actions: {}
  };
  static PARTS = {
    form: {
      template: "modules/share-media/templates/shareables/area-selector.hbs",
      root: true
    }
  };
  #activeWindow = null;
  #tileHighlight = null;
  #canvasTearDownHookId = null;
  async _activateArea(uuid) {
    const area = await fromUuid2(uuid);
    const object = game.canvas[area?.collectionName].get(area?.id);
    if (!area || !object)
      return;
    switch (area.documentName) {
      case CONFIG.Region.documentClass.documentName:
        if (area.visibility === CONST.REGION_VISIBILITY.LAYER)
          object.visible = true;
        break;
      case CONFIG.Tile.documentClass.documentName:
        if (!this.#tileHighlight) {
          this.#tileHighlight = game.canvas.tiles.addChild(new PIXI.Graphics);
          this.#tileHighlight.eventMode = "none";
          this.#tileHighlight.visible = false;
        }
        this.#tileHighlight.clear();
        this.#tileHighlight.visible = true;
        this.#tileHighlight.beginFill(area.texture.tint, 0.5);
        this.#tileHighlight.drawRect(object.bounds.x, object.bounds.y, object.bounds.width, object.bounds.height);
        this.#tileHighlight.endFill();
        break;
    }
  }
  async _deactivateArea(uuid) {
    const area = await fromUuid2(uuid);
    const object = game.canvas[area?.collectionName].get(area?.id);
    if (!area || !object)
      return;
    switch (area.documentName) {
      case CONFIG.Region.documentClass.documentName:
        if (area.visibility === CONST.REGION_VISIBILITY.LAYER)
          object.visible = false;
        break;
      case CONFIG.Tile.documentClass.documentName:
        if (this.#tileHighlight)
          this.#tileHighlight.clear();
        break;
    }
  }
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS,
      areas: this.#prepareAreas()
    };
  }
  #prepareAreas() {
    const areas = game.modules.shareMedia.utils.getAvailableAreas().map((area) => ({
      uuid: area.uuid,
      name: area.name ?? area.getFlag("share-media", game.modules.shareMedia.canvas.layer.constructor.MEDIA_TILE_NAME),
      color: area.color ?? area.texture.tint,
      checked: area.uuid === this.options.targetArea
    }));
    if (areas.length && !areas.some((area) => area.checked))
      areas.at(0).checked = true;
    return areas;
  }
  static async#onSubmit(_event, _form, formData) {
    if (!Object.keys(formData.object).length)
      return null;
    return formData.object.area;
  }
  #onPointerOver(event) {
    const target = event.target;
    const previousTarget = event.relatedTarget;
    const areaElement = target.closest("[data-area-uuid]");
    if (!areaElement || areaElement.contains(previousTarget))
      return;
    this._activateArea(areaElement.dataset.areaUuid);
  }
  #onPointerOut(event) {
    const target = event.target;
    const nextTarget = event.relatedTarget;
    const areaElement = target.closest("[data-area-uuid]");
    if (!areaElement || areaElement.contains(nextTarget))
      return;
    this._deactivateArea(areaElement.dataset.areaUuid);
  }
  _attachFrameListeners() {
    super._attachFrameListeners();
    this.element.addEventListener("pointerover", this.#onPointerOver.bind(this));
    this.element.addEventListener("pointerout", this.#onPointerOut.bind(this));
  }
  async _preFirstRender(context, options) {
    super._preFirstRender(context, options);
    if (ui.activeWindow && !ui.activeWindow.minimized) {
      this.#activeWindow = ui.activeWindow;
      this.#activeWindow.minimize();
    }
  }
  async _onFirstRender(context, options) {
    await super._onFirstRender(context, options);
    this.#canvasTearDownHookId = Hooks.once("canvasTearDown", this.close.bind(this));
  }
  _onClose(options) {
    super._onClose(options);
    if (this.#canvasTearDownHookId)
      Hooks.off("canvasTearDown", this.#canvasTearDownHookId);
    this.#canvasTearDownHookId = null;
    if (this.#tileHighlight) {
      this.#tileHighlight.parent.removeChild(this.#tileHighlight);
      this.#tileHighlight.destroy();
    }
    this.#tileHighlight = null;
    if (this.#activeWindow)
      this.#activeWindow.maximize();
    this.#activeWindow = null;
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.shareables.apps.AreaSelector;
    if (!isSubclass14(Class, AreaSelector)) {
      console.warn("Configured AreaSelector override must be a subclass of AreaSelector.");
      Class = AreaSelector;
    }
    const { WaitableMixin } = CONFIG.shareMedia.shareables.mixins;
    return WaitableMixin(Class);
  }
}
// scripts/shareables/apps/share-selector.mjs
var { HandlebarsApplicationMixin: HandlebarsApplicationMixin11, ApplicationV2: ApplicationV211 } = foundry.applications.api;
var { isSubclass: isSubclass15, debounce } = foundry.utils;

class ShareSelector extends HandlebarsApplicationMixin11(ApplicationV211) {
  constructor(options = {}) {
    if (!options.link && (!options.src || typeof options.src !== "string"))
      throw new Error('You may note create a ShareSelector application without or with a malformated "options.src" option.');
    super(options);
  }
  static DEFAULT_OPTIONS = {
    id: "shm-share-selector-{id}",
    tag: "form",
    window: {
      get title() {
        return "share-media.shareables.selector.share.label";
      },
      contentClasses: ["shm"]
    },
    position: {
      width: 460,
      height: "auto",
      top: 100
    },
    form: {
      handler: ShareSelector.#onSubmit
    },
    actions: {
      configureMode: ShareSelector.#onConfigureMode,
      configureSetting: ShareSelector.#onConfigureSetting
    },
    src: null,
    link: false,
    settings: {}
  };
  static PARTS = {
    link: { template: "modules/share-media/templates/shareables/share-selector-link.hbs" },
    media: { template: "modules/share-media/templates/partials/media.hbs" },
    form: { template: "modules/share-media/templates/shareables/share-selector-form.hbs" }
  };
  #shareOptions = {
    src: null,
    mode: null,
    optionName: null,
    optionValue: null,
    settings: game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.mediaSettings)
  };
  #linkElement = null;
  #linkListener = null;
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    if (options.isFirstRender) {
      if (this.options.link && !this.options.src)
        options.parts = ["link"];
      else
        options.parts = ["media", "form"];
      this.#shareOptions.src = this.options.src || null;
      game.modules.shareMedia.utils.applySettingsToMediaOptions(this.options.settings.mode, this.#shareOptions, this.options.settings);
    }
    if (options.src)
      this.#shareOptions.src = options.src;
  }
  async _prepareContext(options) {
    return {
      ...await super._prepareContext(options),
      icons: CONFIG.shareMedia.CONST.ICONS
    };
  }
  async _preparePartContext(partId, context, _options) {
    switch (partId) {
      case "media":
        context.src = this.#shareOptions.src;
        context.isVideo = game.modules.shareMedia.utils.isVideo(this.#shareOptions.src);
        if (context.isVideo)
          context.videoIcon = CONFIG.shareMedia.CONST.ICONS.play;
        if (context.isVideo)
          context.metadata = true;
        break;
      case "form":
        context.mediaActions = this.#prepareActions();
        context.mediaSettings = this.#prepareSettings();
        break;
    }
    return context;
  }
  #prepareActions() {
    const actions = CONFIG.shareMedia.CONST.MEDIA_ACTIONS;
    return Object.entries(actions).reduce((acc, [mode, items]) => {
      acc[mode] = items.map((item) => {
        item.label = `${item.i18nKey}.label`;
        item.description = `${item.i18nKey}.description`;
        item.icon = item.i18nKey;
        item.active = item.mode === this.#shareOptions.mode && this.#shareOptions.optionName === item.optionName && this.#shareOptions.optionValue === item.optionValue;
        return item;
      });
      return acc;
    }, {});
  }
  #prepareSettings() {
    return Object.entries(this.#shareOptions.settings).reduce((acc, [category, options]) => {
      const validator = CONFIG.shareMedia.CONST.MEDIA_SETTINGS_VALIDATORS[category];
      if (!validator)
        throw new Error(`Missing validator for setting "${category}".`);
      const isVisible = validator(this.#shareOptions.src) && (category === this.#shareOptions.mode || !Object.hasOwn(CONFIG.shareMedia.CONST.LAYERS_MODES, category));
      acc[category] = {
        category,
        label: `categories.${category}`,
        isVisible
      };
      acc[category].options = Object.entries(options).map(([name, value]) => ({
        name,
        value,
        icon: name,
        label: `${name}.label`,
        description: `${name}.description`
      }));
      return acc;
    }, {});
  }
  async _onRender(context, options) {
    await super._onRender(context, options);
    if (this.options.link)
      this.#linkElement = this.element.querySelector("#link");
  }
  async _postRender(context, options) {
    await super._postRender(context, options);
    if (this.options.link) {
      this.#linkListener = debounce(this.#parseMediaLink.bind(this), 300);
      this.#linkElement.addEventListener("input", this.#linkListener);
    }
  }
  async _onClose(options) {
    super._onClose(options);
    if (this.#linkListener)
      this.#linkElement.removeEventListener("input", this.#linkListener);
    this.#linkListener = null;
    this.#linkElement = null;
  }
  static async#onConfigureMode(_event, target) {
    const { mode, optionName, optionValue } = target.dataset ?? {};
    if (!mode || !optionName || !optionValue)
      return;
    Object.assign(this.#shareOptions, { mode, optionName, optionValue });
    await this.render({ parts: ["form"] });
  }
  static async#onConfigureSetting(_event, target) {
    const { category, setting } = target.dataset ?? {};
    if (!category || !setting)
      return;
    this.#shareOptions.settings[category][setting] = !this.#shareOptions.settings[category][setting];
    await this.render({ parts: ["form"] });
  }
  static async#onSubmit(_event, _form, _formData) {
    if (!this.#shareOptions.mode || !this.#shareOptions.optionName || !this.#shareOptions.optionValue)
      return;
    const optionsSettings = game.modules.shareMedia.utils.getMediaSettings(this.#shareOptions.src, this.#shareOptions.mode, this.#shareOptions.settings);
    const { settings: _settings, ...shareOptions } = this.#shareOptions;
    const options = {
      src: this.#shareOptions.src,
      ...shareOptions,
      ...optionsSettings
    };
    const result = await game.modules.shareMedia.shareables.manager.dispatch(options);
    if (result)
      this.close();
    return result;
  }
  #parseMediaLink(event) {
    const value = event.target.value;
    try {
      new URL(value);
    } catch (_error) {
      return;
    }
    this.render({ parts: ["media", "form"], src: value, force: true });
  }
  static get implementation() {
    let Class = CONFIG.shareMedia.shareables.apps.ShareSelector;
    if (!isSubclass15(Class, ShareSelector)) {
      console.warn("Configured ShareSelector override must be a subclass of ShareSelector.");
      Class = ShareSelector;
    }
    return Class;
  }
}
// scripts/shareables/mixins/_module.mjs
var exports__module8 = {};
__export(exports__module8, {
  WaitableMixin: () => WaitableMixin
});

// scripts/shareables/mixins/waitable-mixin.mjs
function WaitableMixin(Base) {
  return class extends Base {
    static async wait(options) {
      return new Promise((resolve) => {
        const originalSubmit = this.DEFAULT_OPTIONS.form.handler;
        const selector = new this.implementation({
          ...options,
          form: {
            handler: async (event, form, formData) => {
              const result = await originalSubmit.call(this, event, form, formData);
              resolve(result);
            }
          }
        });
        selector.addEventListener("close", () => {
          resolve(null);
        }, { once: true });
        selector.render({ force: true });
      });
    }
  };
}
// scripts/shareables/_module.mjs
var applyEntitySharingSettings = () => {
  const entitySharingSettings = game.modules.shareMedia.settings.get(CONFIG.shareMedia.CONST.MODULE_SETTINGS.entitySharingSettings);
  for (const [entity, config] of Object.entries(entitySharingSettings)) {
    const baseName = entity.slice(0, -1);
    const baseConfig = CONFIG[baseName.charAt(0).toUpperCase() + baseName.slice(1)];
    const documentName = baseConfig.documentClass.documentName;
    const options = {
      settings: {
        mode: CONFIG.shareMedia.CONST.LAYERS_MODES.popout,
        optionName: CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersAll.name,
        optionValue: CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersAll.value
      }
    };
    if (config.sheet) {
      const hookName = `get${documentName}ContextOptions`;
      Hooks.on(hookName, (_application, menuItems) => {
        const entry = {
          name: "share-media.shareables.selector.entities.label",
          icon: `<i class="${CONFIG.shareMedia.CONST.ICONS.shareAgain}"></i>`,
          condition: (li) => {
            if (!game.users.current.isGM)
              return false;
            const document2 = game[entity].get(li.dataset.entryId);
            const { img } = document2.constructor.getDefaultArtwork(document2._source);
            return document2.img !== img;
          },
          callback: (li) => {
            const document2 = game[entity].get(li.dataset.entryId);
            options.src = document2.img;
            if (config.caption)
              options.settings.caption = document2.name;
            new game.modules.shareMedia.shareables.apps.shareSelector(options).render({
              force: true
            });
          }
        };
        menuItems.splice(0, 0, entry);
      });
    }
    if (config.hud) {
      const entityName = entity === "actors" ? "Token" : documentName;
      const hookName = `render${entityName}HUD`;
      Hooks.on(hookName, (application, element, _context, _options) => {
        if (!game.users.current.isGM)
          return;
        if (!application.object.document.texture.src)
          return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "control-icon";
        button.dataset.tooltipClass = "shm";
        button.dataset.tooltipHtml = game.i18n.localize("share-media.shareables.selector.entities.label");
        if (application.object[baseName]) {
          button.dataset.tooltipHtml += "<br>" + game.i18n.localize("share-media.shareables.selector.entities.contextmenu");
        }
        button.innerHTML = `<i class="${CONFIG.shareMedia.CONST.ICONS.shareAgain}" inert></i>`;
        button.addEventListener("click", () => {
          options.src = application.object.document.texture.src;
          if (config.caption)
            options.settings.caption = application.object.document.name;
          new game.modules.shareMedia.shareables.apps.shareSelector(options).render({
            force: true
          });
        });
        if (application.object[baseName]) {
          button.addEventListener("contextmenu", () => {
            options.src = application.object[baseName].img;
            if (config.caption)
              options.settings.caption = application.object[baseName].name;
            new game.modules.shareMedia.shareables.apps.shareSelector(options).render({
              force: true
            });
          });
        }
        const leftCol = element.querySelector(".col.left");
        if (leftCol)
          leftCol.appendChild(button);
      });
    }
  }
};

// scripts/api.mjs
class Api {
  static share(src, settings2 = {}) {
    if (!game.users.current.isGM)
      return;
    const shareSelector = new game.modules.shareMedia.shareables.apps.shareSelector({
      src,
      settings: settings2
    });
    return shareSelector.render({ force: true });
  }
  static popoutToAllUsers(options = {}) {
    if (!game.users.current.isGM)
      return;
    options.mode = CONFIG.shareMedia.CONST.LAYERS_MODES.popout;
    options.optionName = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersAll.name;
    options.optionValue = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersAll.value;
    return game.modules.shareMedia.shareables.manager.dispatch(options);
  }
  static popoutToSomeUsers(options = {}) {
    if (!game.users.current.isGM)
      return;
    options.mode = CONFIG.shareMedia.CONST.LAYERS_MODES.popout;
    options.optionName = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersSelection.name;
    options.optionValue = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersSelection.value;
    return game.modules.shareMedia.shareables.manager.dispatch(options);
  }
  static fullscreenToAllUsers(options = {}) {
    if (!game.users.current.isGM)
      return;
    options.mode = CONFIG.shareMedia.CONST.LAYERS_MODES.fullscreen;
    options.optionName = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersAll.name;
    options.optionValue = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersAll.value;
    return game.modules.shareMedia.shareables.manager.dispatch(options);
  }
  static fullscreenToSomeUsers(options = {}) {
    if (!game.users.current.isGM)
      return;
    options.mode = CONFIG.shareMedia.CONST.LAYERS_MODES.fullscreen;
    options.optionName = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersSelection.name;
    options.optionValue = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.usersSelection.value;
    return game.modules.shareMedia.shareables.manager.dispatch(options);
  }
  static sceneFit(options = {}) {
    if (!game.users.current.isGM)
      return;
    options.mode = CONFIG.shareMedia.CONST.LAYERS_MODES.scene;
    options.optionName = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.displayFit.name;
    options.optionValue = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.displayFit.value;
    return game.modules.shareMedia.shareables.manager.dispatch(options);
  }
  static sceneFill(options = {}) {
    if (!game.users.current.isGM)
      return;
    options.mode = CONFIG.shareMedia.CONST.LAYERS_MODES.scene;
    options.optionName = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.displayFill.name;
    options.optionValue = CONFIG.shareMedia.CONST.LAYERS_OPTIONS.displayFill.value;
    return game.modules.shareMedia.shareables.manager.dispatch(options);
  }
}

// scripts/module.mjs
Hooks.once("init", () => {
  CONFIG.shareMedia = {
    CONST: exports_const,
    settings: SettingsCache,
    utils: exports_utils,
    ui: exports__module2,
    canvas: exports__module4,
    layers: exports__module6,
    shareables: exports__module9,
    api: Api
  };
  initializeSettings();
  Hooks.callAll("shareMedia.init", CONFIG.shareMedia);
  Object.defineProperty(game.modules, "shareMedia", {
    get: () => game.modules.get("share-media"),
    configurable: false,
    enumerable: false
  });
  Object.defineProperties(game.modules.shareMedia, {
    settings: { value: CONFIG.shareMedia.settings, enumerable: true },
    utils: { value: CONFIG.shareMedia.utils, enumerable: true },
    ui: { value: {}, enumerable: true },
    canvas: { value: { apps: {} }, enumerable: true },
    layers: { value: {}, enumerable: true },
    shareables: { value: { apps: {} }, enumerable: true },
    collections: { value: { apps: {} }, enumerable: true },
    api: { value: CONFIG.shareMedia.api, enumerable: true }
  });
  CONFIG.shareMedia.canvas.registerRegionBehaviors();
  CONFIG.shareMedia.canvas.registerTileConfiguration();
  CONFIG.shareMedia.canvas.registerMediaLayer();
  CONFIG.shareMedia.ui.registerMediaSidebar();
  CONFIG.shareMedia.shareables.applyEntitySharingSettings();
  CONFIG.shareMedia.utils.registerHandlebarsPartials();
});
Hooks.once("ready", async () => {
  const config = CONFIG.shareMedia;
  const module = game.modules.shareMedia;
  await runMigrations();
  module.ui.detector = new config.ui.MediaDetector.implementation;
  module.ui.overlay = new config.ui.MediaOverlay.implementation;
  module.ui.sidebar = window.ui["shm-media-sidebar"];
  module.collections.media = game["shm-media-collection"];
  module.canvas.mediaSprite = config.canvas.MediaSprite.implementation;
  module.canvas.regionSprite = config.canvas.RegionSprite.implementation;
  module.canvas.tileSprite = config.canvas.TileSprite.implementation;
  module.canvas.apps.hud = config.canvas.apps.MediaHUD.implementation;
  module.canvas.layer = game.canvas["shm-media-layer"];
  module.layers.popout = config.layers.PopoutLayer.implementation;
  module.layers.fullscreen = config.layers.FullscreenLayer.implementation;
  module.shareables.manager = new config.shareables.ShareablesManager.implementation;
  module.shareables.apps.userSelector = config.shareables.apps.UserSelector.implementation;
  module.shareables.apps.areaSelector = config.shareables.apps.AreaSelector.implementation;
  module.shareables.apps.shareSelector = config.shareables.apps.ShareSelector.implementation;
  Hooks.callAll("shareMedia.ready", module);
});
