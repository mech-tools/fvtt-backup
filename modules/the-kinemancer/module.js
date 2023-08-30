const module = "";
const CONSTANTS = {
  MODULE_NAME: "the-kinemancer",
  BEHAVIORS: {
    STILL: "still",
    STILL_HIDDEN: "still-hidden",
    LOOP: "loop",
    ONCE_NEXT: "once-next",
    ONCE_PREVIOUS: "once-previous",
    ONCE_PREVIOUS_ACTIVE: "once-previous-active",
    ONCE_SPECIFIC: "once-specific",
    RANDOM: "random",
    RANDOM_IF: "random-if"
  },
  START: {
    START: "start",
    MID: "mid",
    PREV: "prev",
    END: "end"
  },
  END: {
    NEXT: "next",
    MID: "mid",
    END: "end"
  },
  NUMBER_TYPES: {
    FRAMES: "frames",
    MILLISECONDS: "milliseconds",
    SECONDS: "seconds"
  }
};
CONSTANTS.HOOKS = {
  RENDER_UI: `${CONSTANTS.MODULE_NAME}.renderUI`
};
CONSTANTS.SOCKET_NAME = `module.${CONSTANTS.MODULE_NAME}`;
CONSTANTS.MODULE_LOCATION = `modules/${CONSTANTS.MODULE_NAME}/`;
CONSTANTS.FLAG_KEYS = {
  PREVIOUS_STATE: "previousState",
  CURRENT_STATE: "currentState",
  QUEUED_STATE: "queuedState",
  UPDATED: "updated",
  STATES: "states",
  NUMBER_TYPE: "numberType",
  FPS: "fps",
  DELEGATED_STATEFUL_VIDEOS: "delegatedStatefulVideos"
};
CONSTANTS.STATE_FLAGS = {
  id: null,
  name: null,
  icon: "",
  default: false,
  start: 0,
  end: "",
  behavior: CONSTANTS.BEHAVIORS.STILL,
  nextState: null,
  randomState: null,
  randomStart: null,
  randomEnd: null
};
CONSTANTS.FLAGS = `flags.${CONSTANTS.MODULE_NAME}`;
CONSTANTS.PREVIOUS_STATE_FLAG = `flags.${CONSTANTS.MODULE_NAME}.${CONSTANTS.FLAG_KEYS.PREVIOUS_STATE}`;
CONSTANTS.CURRENT_STATE_FLAG = `flags.${CONSTANTS.MODULE_NAME}.${CONSTANTS.FLAG_KEYS.CURRENT_STATE}`;
CONSTANTS.QUEUED_STATE_FLAG = `flags.${CONSTANTS.MODULE_NAME}.${CONSTANTS.FLAG_KEYS.QUEUED_STATE}`;
CONSTANTS.UPDATED_FLAG = `flags.${CONSTANTS.MODULE_NAME}.${CONSTANTS.FLAG_KEYS.UPDATED}`;
CONSTANTS.STATES_FLAG = `flags.${CONSTANTS.MODULE_NAME}.${CONSTANTS.FLAG_KEYS.STATES}`;
CONSTANTS.NUMBER_TYPE_FLAG = `flags.${CONSTANTS.MODULE_NAME}.${CONSTANTS.FLAG_KEYS.NUMBER_TYPE}`;
CONSTANTS.FPS_FLAG = `flags.${CONSTANTS.MODULE_NAME}.${CONSTANTS.FLAG_KEYS.FPS}`;
CONSTANTS.DELEGATED_STATEFUL_VIDEOS_FLAG = `flags.${CONSTANTS.MODULE_NAME}.${CONSTANTS.FLAG_KEYS.DELEGATED_STATEFUL_VIDEOS}`;
CONSTANTS.TRANSLATED_BEHAVIORS = {
  [CONSTANTS.BEHAVIORS.STILL]: "Still",
  [CONSTANTS.BEHAVIORS.STILL_HIDDEN]: "Still (hidden)",
  [CONSTANTS.BEHAVIORS.LOOP]: "Loop",
  [CONSTANTS.BEHAVIORS.ONCE_NEXT]: "Once, then next state",
  [CONSTANTS.BEHAVIORS.ONCE_PREVIOUS]: "Once, then previous state",
  [CONSTANTS.BEHAVIORS.ONCE_PREVIOUS_ACTIVE]: "Once, then previous active state",
  [CONSTANTS.BEHAVIORS.ONCE_SPECIFIC]: "Once, then specific state",
  [CONSTANTS.BEHAVIORS.RANDOM]: "Random",
  [CONSTANTS.BEHAVIORS.RANDOM_IF]: "Random if"
};
CONSTANTS.BEHAVIOR_COLOR = {
  [CONSTANTS.BEHAVIORS.STILL]: "rgb(125, 125, 125)",
  [CONSTANTS.BEHAVIORS.STILL_HIDDEN]: "rgb(125, 125, 125)",
  [CONSTANTS.BEHAVIORS.LOOP]: "rgb(0,179,210)",
  [CONSTANTS.BEHAVIORS.ONCE_NEXT]: "rgb(183,32,32)",
  [CONSTANTS.BEHAVIORS.ONCE_PREVIOUS]: "rgb(183,32,32)",
  [CONSTANTS.BEHAVIORS.ONCE_PREVIOUS_ACTIVE]: "rgb(183,32,32)",
  [CONSTANTS.BEHAVIORS.ONCE_SPECIFIC]: "rgb(183,32,32)",
  [CONSTANTS.BEHAVIORS.RANDOM]: "rgb(166,70,234)",
  [CONSTANTS.BEHAVIORS.RANDOM_IF]: "rgb(166,70,234)"
};
CONSTANTS.COLOR_CODE = {
  "none": "background: repeating-conic-gradient(#888 0% 25%, #333 0% 50%) 50% / 40px 40px;",
  "night": "background: url('modules/the-kinemancer/assets/color-night.svg');",
  "day": "background: url('modules/the-kinemancer/assets/color-day.svg');",
  "spring": "background: url('modules/the-kinemancer/assets/color-spring.svg');",
  "summer": "background: url('modules/the-kinemancer/assets/color-summer.svg');",
  "autumn": "background: url('modules/the-kinemancer/assets/color-autumn.svg');",
  "winter": "background: url('modules/the-kinemancer/assets/color-winter.svg');",
  "frozen": "background: url('modules/the-kinemancer/assets/color-winter.svg');",
  "cold": "background: url('modules/the-kinemancer/assets/color-winter.svg');",
  "fireflies": "background: url('modules/the-kinemancer/assets/color-fireflies.svg');",
  "blood": "background: url('modules/the-kinemancer/assets/color-massacre.svg');",
  "wounded": "background: url('modules/the-kinemancer/assets/color-massacre.svg');",
  "massacre": "background: url('modules/the-kinemancer/assets/color-massacre.svg');",
  "fae": "background: url('modules/the-kinemancer/assets/color-fae.svg');",
  "fire": "background: url('modules/the-kinemancer/assets/color-fire.svg');",
  "burning": "background: url('modules/the-kinemancer/assets/color-fire.svg');",
  "damaged": "background: url('modules/the-kinemancer/assets/color-damaged.svg');",
  "old": "background: url('modules/the-kinemancer/assets/color-damaged.svg');",
  "cracked": "background: url('modules/the-kinemancer/assets/color-damaged.svg');",
  "rusty": "background: url('modules/the-kinemancer/assets/color-rusty.svg');",
  "dirty": "background: url('modules/the-kinemancer/assets/color-dirty.svg');",
  "blue": "background-color: #0085fa;",
  "blue dark": "background-color: #0037fa;",
  "blue light": "background-color: #1ad7ff;",
  "brown": "background-color: #a2633f;",
  "brown dark": "background-color: #68422c;",
  "brown light": "background-color: #c8a384;",
  "green": "background-color: #12ff05;",
  "green dark": "background-color: #00944b;",
  "green light": "background-color: #86ff6b;",
  "green yellow": "background-color: #bbff0f;",
  "grey": "background-color: #7d7d7d;",
  "grey dark": "background-color: #4f4f4f;",
  "grey light": "background-color: #c2c2c2;",
  "pink": "background-color: #ff57f4;",
  "pink dark": "background-color: #bd00a8;",
  "pink light": "background-color: #ffb3fa;",
  "purple": "background-color: #cf57ff;",
  "purple dark": "background-color: #8a00c2;",
  "purple light": "background-color: #e9b3ff;",
  "orange": "background-color: #ff9a00;",
  "orange dark": "background-color: #db6000;",
  "orange light": "background-color: #ffc46b;",
  "red": "background-color: #ff4c47;",
  "red dark": "background-color: #c70500;",
  "red light": "background-color: #ff8d8a;",
  "yellow": "background-color: #fff633;",
  "yellow dark": "background-color: #e6db00;",
  "yellow light": "background-color: #fffa8a;",
  "gold": "background-color: #d4af37;",
  "white": "background-color: #ffffff;",
  "black": "background-color: #000000;",
  "dark": "background-color: #303030;",
  "light": "background-color: #ededed;",
  "multicolor": `background: linear-gradient(
      90deg,
      rgba(255, 0, 0, 1) 0%,
      rgba(255, 154, 0, 1) 10%,
      rgba(208, 222, 33, 1) 20%,
      rgba(79, 220, 74, 1) 30%,
      rgba(63, 218, 216, 1) 40%,
      rgba(47, 201, 226, 1) 50%,
      rgba(28, 127, 238, 1) 60%,
      rgba(95, 21, 242, 1) 70%,
      rgba(186, 12, 248, 1) 80%,
      rgba(251, 7, 217, 1) 90%,
      rgba(255, 0, 0, 1) 100%
  );`
};
CONSTANTS.COLOR_NAME = {
  "none": "Default",
  "night": "Night",
  "day": "Day",
  "spring": "Spring",
  "summer": "Summer",
  "autumn": "Autumn",
  "winter": "Winter",
  "frozen": "Frozen",
  "cold": "Cold",
  "fireflies": "Fireflies",
  "blood": "Blood",
  "wounded": "Wounded",
  "massacre": "Massacre",
  "fae": "Fae",
  "fire": "Fire",
  "burning": "Burning",
  "damaged": "Damaged",
  "old": "Old",
  "cracked": "Cracked",
  "rusty": "Rusty",
  "dirty": "Dirty",
  "blue": "Blue",
  "blue dark": "Dark Blue",
  "blue light": "Light Blue",
  "brown": "Brown",
  "brown dark": "Dark Brown",
  "brown light": "Light Brown",
  "green": "Green",
  "green dark": "Dark Green",
  "green light": "Light Green",
  "green yellow": "Yellow Green",
  "grey": "Grey",
  "grey dark": "Dark Grey",
  "grey light": "Light Grey",
  "pink": "Pink",
  "pink dark": "Dark Pink",
  "pink light": "Light Pink",
  "purple": "Purple",
  "purple dark": "Dark Purple",
  "purple light": "Light Purple",
  "orange": "Orange",
  "orange dark": "Dark Orange",
  "orange light": "Light Orange",
  "red": "Red",
  "red dark": "Dark Red",
  "red light": "Light Red",
  "yellow": "Yellow",
  "yellow dark": "Dark Yellow",
  "yellow light": "Light Yellow",
  "gold": "Gold",
  "white": "White",
  "black": "Black",
  "dark": "Dark",
  "light": "Light",
  "multicolor": "Multicolor"
};
function isActiveGM(user) {
  return user.active && user.isGM;
}
function getActiveGMs() {
  return game.users.filter(isActiveGM);
}
function getActiveUsers() {
  return game.users.filter((user) => user.active);
}
function isResponsibleGM() {
  if (!game.user.isGM) {
    return false;
  }
  return !getResponsibleGM();
}
function getResponsibleGM() {
  return getActiveGMs().find((other) => other.id < game.user.id);
}
function isGMConnected() {
  return !!Array.from(game.users).find((user) => user.isGM && user.active);
}
function getSceneDelegator() {
  const activeUsers = getActiveUsers().filter((user) => {
    return user.viewedScene === game.user.viewedScene;
  });
  activeUsers.sort((a, b) => {
    return (getProperty(b, CONSTANTS.UPDATED_FLAG) ?? 0) - (getProperty(a, CONSTANTS.UPDATED_FLAG) ?? 0);
  });
  activeUsers.sort((a, b) => b.isGM - a.isGM);
  return activeUsers[0];
}
function isRealNumber(n) {
  const num = Number(n);
  return typeof num == "number" && !isNaN(num) && isFinite(num);
}
function randomFloatBetween(min, max) {
  const _max = Math.max(max, min);
  const _min = Math.min(max, min);
  return Math.random() * (_max - _min) + _min;
}
function randomIntegerBetween(min, max) {
  return Math.floor(randomFloatBetween(min, max));
}
function transformNumber(num) {
  const flippedNum = 1 - num;
  const transformedNum = 1 - Math.pow(2, -flippedNum);
  return 1 - transformedNum;
}
async function getWildCardFiles(inFile) {
  if (!inFile)
    return false;
  let source = "data";
  const browseOptions = { wildcard: true };
  if (/\.s3\./.test(inFile)) {
    source = "s3";
    const { bucket, keyPrefix } = FilePicker.parseS3URL(inFile);
    if (bucket) {
      browseOptions.bucket = bucket;
      inFile = keyPrefix;
    }
  }
  try {
    return (await FilePicker.browse(source, inFile, browseOptions)).files;
  } catch (err) {
    return false;
  }
}
function getVideoDuration(src) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = function() {
      resolve(video.duration);
    };
    video.src = src;
  });
}
function validateStates(states) {
  const errors = [];
  for (const [index, state] of states.entries()) {
    if (!(isRealNumber(state.start) || Object.values(CONSTANTS.START).some((val) => val === state.start))) {
      errors.push(`State "${state.name}" has an invalid value in its "start" setting`);
    }
    if (!(isRealNumber(state.end) || Object.values(CONSTANTS.END).some((val) => val === state.end))) {
      if (state.behavior === CONSTANTS.BEHAVIORS.STILL || state.behavior === CONSTANTS.BEHAVIORS.STILL_HIDDEN) {
        state.end = "";
      } else {
        errors.push(`State "${state.name}" has an invalid value in its "end" setting`);
      }
    }
    switch (state.behavior) {
      case CONSTANTS.BEHAVIORS.ONCE_PREVIOUS:
        if (index === 0) {
          errors.push(`State "${state.name}" cannot have "once, previous" behavior because it is the first state`);
        }
        break;
      case CONSTANTS.BEHAVIORS.ONCE_NEXT:
        if (index === states.length - 1) {
          errors.push(`State "${state.name}" cannot have "once, next" behavior because it is the last state`);
        }
        break;
    }
    if (state.start === CONSTANTS.START.PREV) {
      const previousState = states?.[index - 1];
      if (previousState) {
        if (!isRealNumber(previousState.end)) {
          errors.push(`State "${state.name}" cannot have "prev" as its start time, because state "${previousState.name}" does not end at a specific time`);
        }
      } else {
        errors.push(`State "${state.name}" cannot have "prev" as its start time, because it is the first state`);
      }
    }
    if (state.end === CONSTANTS.END.NEXT) {
      const nextState = states?.[index + 1];
      if (nextState) {
        if (!isRealNumber(nextState.start)) {
          errors.push(`State "${state.name}" cannot have "next" as its end time, because state "${nextState.name}" does not start at a specific time`);
        }
      } else {
        errors.push(`State "${state.name}" cannot have "next" as its end time, because it is the last state`);
      }
    }
  }
  return errors;
}
function determineFileColor(inFile) {
  const lowerCaseFile = decodeURI(inFile.toLowerCase());
  for (const [colorName, color] of Object.entries(CONSTANTS.COLOR_CODE)) {
    if (lowerCaseFile.endsWith(`__${colorName}.webm`)) {
      return { colorName, color, tooltip: CONSTANTS.COLOR_NAME[colorName] };
    }
  }
  return {
    colorName: false,
    color: CONSTANTS.COLOR_CODE["none"],
    tooltip: CONSTANTS.COLOR_NAME["none"]
  };
}
function getThumbnailVariations(url) {
  return Object.keys(CONST.IMAGE_FILE_EXTENSIONS).map((ext) => url.replace(".webm", "." + ext));
}
function getVideoJsonPath(placeableDocument) {
  return decodeURI(placeableDocument.texture.src).split("  ")[0].replace(".webm", "") + ".json";
}
function createJsonFile(placeableDocument, inData) {
  const path = getVideoJsonPath(placeableDocument);
  const splitPath = path.split("/");
  const serializedData = JSON.stringify(inData);
  const blob = new Blob([serializedData], { type: "application/json" });
  const file = new File([blob], splitPath.pop());
  return FilePicker.upload("data", splitPath.join("/"), file, {}, { notify: false });
}
const lib = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createJsonFile,
  determineFileColor,
  getActiveGMs,
  getActiveUsers,
  getResponsibleGM,
  getSceneDelegator,
  getThumbnailVariations,
  getVideoDuration,
  getVideoJsonPath,
  getWildCardFiles,
  isActiveGM,
  isGMConnected,
  isRealNumber,
  isResponsibleGM,
  randomFloatBetween,
  randomIntegerBetween,
  transformNumber,
  validateStates
}, Symbol.toStringTag, { value: "Module" }));
class SocketHandler {
  static UPDATE_PLACEABLE_DOCUMENT = "update-placeable-document";
  static handlers = {
    [this.UPDATE_PLACEABLE_DOCUMENT]: this._updatePlaceableDocument
  };
  static initialize() {
    game.socket.on(CONSTANTS.SOCKET_NAME, (data) => {
      if (this.handlers[data.type]) {
        this.handlers[data.type](data.payload);
      }
    });
  }
  static emit(handler, data) {
    game.socket.emit(CONSTANTS.SOCKET_NAME, {
      type: handler,
      payload: data
    });
  }
  static async _updatePlaceableDocument(data) {
    const { uuid, update, userId } = data;
    if (userId !== game.user.id)
      return;
    const placeableDocument = fromUuidSync(uuid);
    return placeableDocument.update(update);
  }
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
Promise.resolve();
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const statefulVideoHudMap = /* @__PURE__ */ new Map();
const managedStatefulVideos = /* @__PURE__ */ new Map();
let currentDelegator = false;
let delegateDebounce = false;
const copiedData = writable(false);
const hudScale = writable(0);
class StatefulVideo {
  constructor(document2, texture) {
    this.document = document2;
    this.uuid = this.document.uuid;
    this.flags = new Flags(this.document);
    this.offset = this.flags.offset;
    this.texture = texture;
    this.video = this.texture.baseTexture.resource.source;
    this.timeout = null;
    this.still = false;
    this.nextButton = false;
    this.prevButton = false;
    this.select = false;
    this.newCurrentTime = null;
    this.randomTimers = {};
    this.ready = !!currentDelegator;
  }
  static setAllReady() {
    this.getAll().forEach((statefulVideo) => {
      if (!statefulVideo.ready) {
        statefulVideo.ready = true;
        statefulVideo.flags.updateData();
        statefulVideo.setupRandomTimers();
        game.video.play(statefulVideo.video);
      }
    });
  }
  static determineCurrentDelegator() {
    if (delegateDebounce)
      delegateDebounce();
    delegateDebounce = foundry.utils.debounce(async () => {
      const newDelegator = getSceneDelegator();
      if (!game.user.isGM && newDelegator !== game.user && isGMConnected()) {
        await game.user.unsetFlag(CONSTANTS.MODULE_NAME, CONSTANTS.FLAG_KEYS.DELEGATED_STATEFUL_VIDEOS);
      }
      if (newDelegator !== currentDelegator && !newDelegator.isGM && newDelegator === game.user && !isGMConnected()) {
        let updates = {};
        StatefulVideo.getAll().forEach((statefulVideo) => {
          updates[CONSTANTS.DELEGATED_STATEFUL_VIDEOS_FLAG + "." + statefulVideo.delegationUuid] = statefulVideo.flags.getData();
        });
        currentDelegator = newDelegator;
        await game.user.update(updates);
      }
      currentDelegator = newDelegator;
      StatefulVideo.setAllReady();
    }, 100);
  }
  static registerHooks() {
    Hooks.on("userConnected", () => {
      this.determineCurrentDelegator();
    });
    Hooks.on("getSceneNavigationContext", () => {
      this.determineCurrentDelegator();
    });
    let firstUpdate = true;
    Hooks.on("updateUser", (user, data) => {
      if (!hasProperty(data, CONSTANTS.DELEGATED_STATEFUL_VIDEOS_FLAG))
        return;
      const statefulVideos = getProperty(data, CONSTANTS.DELEGATED_STATEFUL_VIDEOS_FLAG);
      if (!statefulVideos)
        return;
      if (currentDelegator.isGM)
        return;
      Object.keys(statefulVideos).forEach((key) => {
        const statefulVideo = StatefulVideo.get(`Scene.${key.split("_").join(".")}`);
        if (!statefulVideo)
          return;
        StatefulVideo.onUpdate(
          statefulVideo.document,
          // Construct a similar diff as normal video updates would create
          foundry.utils.mergeObject({
            [CONSTANTS.FLAGS]: statefulVideos[key]
          }, {}),
          firstUpdate
        );
      });
      firstUpdate = false;
    });
    Hooks.on("renderBasePlaceableHUD", (app, html) => {
      statefulVideoHudMap.set(app.object.document.uuid, app);
      StatefulVideo.renderStatefulVideoHud(app, html);
    });
    Hooks.on("preUpdateTile", (placeableDoc, data) => {
      StatefulVideo.onPreUpdate(placeableDoc, data);
    });
    Hooks.on("updateTile", (placeableDoc, data) => {
      StatefulVideo.onUpdate(placeableDoc, data);
    });
    Hooks.on("createTile", (placeableDoc) => {
      const path = getVideoJsonPath(placeableDoc);
      fetch(path).then((response) => response.json()).then((result) => {
        setTimeout(() => {
          placeableDoc.update(result);
        }, 500);
      }).catch((err) => {
      });
    });
    Hooks.on("preUpdateToken", (placeableDoc, data) => {
      StatefulVideo.onPreUpdate(placeableDoc, data);
    });
    Hooks.on("updateToken", (placeableDoc, data) => {
      StatefulVideo.onUpdate(placeableDoc, data);
    });
    Hooks.on("createToken", (placeableDoc) => {
      const path = getVideoJsonPath(placeableDoc);
      fetch(path).then((response) => response.json()).then((result) => {
        placeableDoc.update(result);
      }).catch((err) => {
      });
    });
    let firstUserGesture = false;
    let canvasReady = false;
    Hooks.once("canvasFirstUserGesture", () => {
      firstUserGesture = true;
      if (canvasReady) {
        StatefulVideo.canvasReady();
      }
    });
    Hooks.on("canvasReady", () => {
      canvasReady = true;
      if (firstUserGesture) {
        StatefulVideo.canvasReady();
      } else {
        StatefulVideo.canvasNotReady();
      }
    });
    Hooks.on("canvasPan", () => {
      hudScale.set(canvas.stage.scale.x);
    });
    hudScale.subscribe(() => {
      StatefulVideo.getAll().forEach((statefulVideo) => statefulVideo.updateHudScale());
    });
    const refreshDebounce = foundry.utils.debounce((statefulVideo) => {
      if (game?.video && statefulVideo.video) {
        statefulVideo.updateVideo();
        game.video.play(statefulVideo.video);
      }
    }, 200);
    Hooks.on("refreshTile", (placeableObject) => {
      if (!placeableObject.isVideo || !getProperty(placeableObject.document, CONSTANTS.STATES_FLAG)?.length)
        return;
      const statefulVideo = StatefulVideo.make(placeableObject.document, placeableObject.texture);
      if (!statefulVideo)
        return;
      statefulVideo.evaluateVisibility();
      refreshDebounce(statefulVideo);
    });
    Hooks.on("refreshToken", (placeableObject) => {
      if (!placeableObject.isVideo || !getProperty(placeableObject.document, CONSTANTS.STATES_FLAG)?.length)
        return;
      const statefulVideo = StatefulVideo.make(placeableObject.document, placeableObject.texture);
      if (!statefulVideo)
        return;
      statefulVideo.evaluateVisibility();
      refreshDebounce(statefulVideo);
    });
  }
  static getValidPlaceables() {
    return [...canvas.tiles.placeables, canvas.tokens.placeables].filter((placeable) => {
      return placeable.isVideo && getProperty(placeable.document, CONSTANTS.STATES_FLAG)?.length;
    });
  }
  static canvasReady() {
    hudScale.set(canvas.stage.scale.x);
    for (const placeable of this.getValidPlaceables()) {
      const statefulVideo = this.make(placeable.document, placeable.texture);
      if (!statefulVideo)
        return;
      if (game?.video && statefulVideo.video) {
        game.video.play(statefulVideo.video);
      }
    }
  }
  static canvasNotReady() {
    for (const placeable of this.getValidPlaceables()) {
      placeable.renderable = false;
      placeable.mesh.renderable = false;
    }
  }
  static getAll() {
    return managedStatefulVideos;
  }
  static get(uuid) {
    return managedStatefulVideos.get(uuid) || false;
  }
  static make(document2, texture) {
    const existingStatefulVideo = this.get(document2.uuid);
    if (existingStatefulVideo)
      return existingStatefulVideo;
    const newStatefulVideo = new this(document2, texture);
    managedStatefulVideos.set(newStatefulVideo.uuid, newStatefulVideo);
    if (currentDelegator) {
      newStatefulVideo.flags.updateData();
    }
    return newStatefulVideo;
  }
  get duration() {
    return this.video.duration * 1e3 - this.flags.singleFrameDuration;
  }
  static tearDown(uuid) {
    const statefulVideo = StatefulVideo.get(uuid);
    if (!statefulVideo)
      return;
    if (statefulVideo.timeout)
      clearTimeout(statefulVideo.timeout);
    statefulVideo.clearRandomTimers();
    managedStatefulVideos.delete(uuid);
  }
  static makeHudButton(tooltip, icon, style = "") {
    return $(`<div class="ats-hud-control-icon ats-stateful-video-ui-button" style="${style}" data-tooltip-direction="UP" data-tooltip="${tooltip}">
      <i class="fas ${icon}"></i>
    </div>`);
  }
  /**
   * Adds additional control elements to the tile HUD relating to Animated Tile States
   *
   * @param app
   * @param html
   */
  static async renderStatefulVideoHud(app, html) {
    const placeable = app.object;
    const placeableDocument = placeable.document;
    const statefulVideo = StatefulVideo.get(placeableDocument.uuid);
    const root = $("<div class='ats-hud'></div>");
    const selectContainer = $("<div class='ats-hud-select-container'></div>");
    if (statefulVideo) {
      for (const [index, state] of statefulVideo.flags.states.entries()) {
        if (!state.icon)
          continue;
        const stateBtn = StatefulVideo.makeHudButton(state.name, state.icon);
        stateBtn.on("pointerdown", () => {
          statefulVideo.changeState({ state: index, fast: true });
        });
        selectContainer.append(stateBtn);
      }
      if (statefulVideo.flags.states.length) {
        const select = $("<select class='ats-stateful-video-ui-button'></select>");
        select.on("change", function() {
          statefulVideo.changeState({ state: Number($(this).val()), fast: true });
        });
        for (const [index, state] of statefulVideo.flags.states.entries()) {
          select.append(`<option ${index === statefulVideo.flags.currentStateIndex ? "selected" : ""} value="${index}">${state.name}</option>`);
        }
        selectContainer.append(select);
        statefulVideo.select = select;
      }
    }
    const statefulVideoColor = determineFileColor(placeableDocument.texture?.src || "");
    const selectButtonContainer = $("<div></div>");
    const selectColorButton = $(`<div class="ats-hud-control-icon ats-stateful-video-ui-button" data-tooltip-direction="UP" data-tooltip="Change Color">
      ${statefulVideoColor.icon ? `<i class="fas ${statefulVideoColor.icon}"></i>` : ""}
      ${statefulVideoColor.color ? `<div class="ats-color-button" style="${statefulVideoColor.color}"></div>` : ""}
    </div>`);
    const baseFile = decodeURI(placeableDocument.texture.src).split("__")[0].replace(".webm", "") + "*.webm";
    await getWildCardFiles(baseFile).then((results) => {
      if (results.length <= 1)
        return;
      const selectColorContainer = $(`<div class="ats-color-container"></div>`);
      selectColorButton.on("pointerdown", () => {
        const newState = selectColorContainer.css("visibility") === "hidden" ? "visible" : "hidden";
        selectColorContainer.css("visibility", newState);
      });
      selectButtonContainer.append(selectColorButton);
      selectButtonContainer.append(selectColorContainer);
      selectContainer.append(selectButtonContainer);
      const width = Math.min(204, results.length * 34);
      selectColorContainer.css({ left: width * -0.37, width });
      for (const filePath of results) {
        const { colorName, color, tooltip } = determineFileColor(filePath);
        const button = $(`<div class="ats-color-button" style="${color}" data-tooltip="${tooltip}"></div>`);
        if (!colorName) {
          selectColorContainer.prepend(button);
        } else {
          selectColorContainer.append(button);
        }
        button.on("pointerdown", async () => {
          selectColorButton.html(`<div class="ats-color-button" style="${color}"></div>`);
          selectColorButton.trigger("pointerdown");
          await placeableDocument.update({
            img: filePath
          });
          const hud = placeable instanceof Token ? canvas.tokens.hud : canvas.tokens.tiles;
          placeable.control();
          hud.bind(placeable);
        });
      }
    });
    if (statefulVideo || selectButtonContainer.children().length) {
      root.append(selectContainer);
    }
    if (statefulVideo) {
      statefulVideo.updateHudScale();
    }
    Hooks.call(CONSTANTS.HOOKS.RENDER_UI, app, root, placeableDocument, statefulVideo);
    if (root.children().length) {
      html.find(".col.middle").append(root);
    }
  }
  updateVideo() {
    if (!this.document.object)
      return;
    this.texture = this.document.object.texture;
    this.video = this.document.object.texture.baseTexture.resource.source;
  }
  updateHudScale() {
    if (!this.select)
      return;
    const scale = get_store_value(hudScale) + 0.25;
    const fontSize = scale >= 1 ? 1 : Math.min(1, Math.max(0.25, transformNumber(scale)));
    this.select.children().css("font-size", `${fontSize}rem`);
  }
  updateSelect() {
    if (!this.select?.length)
      return;
    this.select.empty();
    for (const [index, state] of this.flags.states.entries()) {
      this.select.append(`<option ${index === this.flags.currentStateIndex ? "selected" : ""} value="${index}">${state.name}</option>`);
    }
    this.updateHudScale();
  }
  static onPreUpdate(placeableDoc, changes) {
    let statefulVideo = StatefulVideo.get(placeableDoc.uuid);
    if (hasProperty(changes, "texture.src") && statefulVideo) {
      statefulVideo.newCurrentTime = statefulVideo.video.currentTime * 1e3;
    }
  }
  static onUpdate(placeableDoc, changes, firstUpdate = false) {
    let statefulVideo = StatefulVideo.get(placeableDoc.uuid);
    if (hasProperty(changes, "texture.src") && statefulVideo) {
      setTimeout(() => {
        statefulVideo.texture = placeableDoc.object.texture;
        statefulVideo.video = placeableDoc.object.texture.baseTexture.resource.source;
        statefulVideo.still = false;
        statefulVideo.playing = false;
        clearTimeout(statefulVideo.timeout);
        game.video.play(statefulVideo.video);
      }, 100);
    }
    if (!hasProperty(changes, CONSTANTS.FLAGS))
      return;
    if (!statefulVideo) {
      if (!placeableDoc.object.isVideo || !getProperty(placeableDoc, CONSTANTS.STATES_FLAG)?.length)
        return;
      statefulVideo = StatefulVideo.make(placeableDoc, placeableDoc.object.texture);
    }
    statefulVideo.flags.updateData();
    Hooks.call("ats.updateState", placeableDoc, statefulVideo.flags.data, changes);
    if (!statefulVideo.flags.states.length) {
      this.tearDown(placeableDoc.uuid);
      statefulVideoHudMap.get(placeableDoc.uuid)?.render(true);
      return;
    }
    statefulVideo.offset = Number(Date.now()) - statefulVideo.flags.updated;
    if (hasProperty(changes, CONSTANTS.STATES_FLAG)) {
      statefulVideoHudMap.get(placeableDoc.uuid)?.render(true);
      statefulVideo.still = false;
      statefulVideo.playing = false;
      statefulVideo.clearRandomTimers();
      statefulVideo.setupRandomTimers();
      clearTimeout(statefulVideo.timeout);
      game.video.play(statefulVideo.video);
      statefulVideo.flags.data.queuedState = statefulVideo.flags.determineNextStateIndex();
      return placeableDoc.update({
        [CONSTANTS.QUEUED_STATE_FLAG]: statefulVideo.flags.data.queuedState
      });
    }
    statefulVideo.updateSelect();
    if (hasProperty(changes, CONSTANTS.CURRENT_STATE_FLAG) || firstUpdate) {
      statefulVideo.setupRandomTimers();
      if (statefulVideo.nextButton) {
        statefulVideo.nextButton.removeClass("active");
      }
      if (statefulVideo.prevButton) {
        statefulVideo.prevButton.removeClass("active");
      }
      statefulVideo.still = false;
      statefulVideo.playing = false;
      game.video.play(statefulVideo.video);
    }
  }
  static async changeVideoState(uuid, { state = null, step = 1, queue = false } = {}) {
    const placeableDoc = fromUuidSync(uuid);
    if (!placeableDoc)
      return false;
    const flags = new Flags(placeableDoc);
    flags.updateData();
    if (!flags.states.length) {
      return false;
    }
    if (state !== null && !queue) {
      if (!isRealNumber(state)) {
        return false;
      }
      return placeableDoc.update({
        [CONSTANTS.UPDATED_FLAG]: Number(Date.now()),
        [CONSTANTS.PREVIOUS_STATE_FLAG]: flags.currentStateIndex,
        [CONSTANTS.CURRENT_STATE_FLAG]: state,
        [CONSTANTS.QUEUED_STATE_FLAG]: flags.determineNextStateIndex()
      });
    }
    if (!isRealNumber(step)) {
      return false;
    }
    if (queue && !isRealNumber(state)) {
      return false;
    }
    return placeableDoc.update({
      [CONSTANTS.UPDATED_FLAG]: Number(Date.now()),
      [CONSTANTS.QUEUED_STATE_FLAG]: queue ? state : flags.getStateIndexFromSteps(step)
    });
  }
  static isDataValid(flags, data) {
    return data?.[CONSTANTS.PREVIOUS_STATE_FLAG] !== void 0 && flags.data[CONSTANTS.FLAG_KEYS.PREVIOUS_STATE] !== data?.[CONSTANTS.PREVIOUS_STATE_FLAG] || data?.[CONSTANTS.CURRENT_STATE_FLAG] !== void 0 && flags.data[CONSTANTS.FLAG_KEYS.CURRENT_STATE] !== data?.[CONSTANTS.CURRENT_STATE_FLAG] || data?.[CONSTANTS.QUEUED_STATE_FLAG] !== void 0 && flags.data[CONSTANTS.FLAG_KEYS.QUEUED_STATE] !== data?.[CONSTANTS.QUEUED_STATE_FLAG];
  }
  async update(data) {
    if (game.user !== currentDelegator)
      return;
    if (StatefulVideo.isDataValid(this.flags, data)) {
      data[CONSTANTS.UPDATED_FLAG] = Number(Date.now());
    } else {
      return;
    }
    if (game.user.isGM) {
      return this.document.update(data);
    } else if (getResponsibleGM()) {
      return SocketHandler.emit(SocketHandler.UPDATE_PLACEABLE_DOCUMENT, {
        uuid: this.uuid,
        update: data,
        userId: getResponsibleGM().id
      });
    }
    const deconstructedData = Object.fromEntries(Object.entries(data).map(([key2, value]) => {
      const newKey = key2.split(".");
      return [newKey[newKey.length - 1], value];
    }));
    const key = `${this.document.parent.id}_${this.document.documentName}_${this.document.id}`;
    return game.user.update({
      [`${CONSTANTS.DELEGATED_STATEFUL_VIDEOS_FLAG}.${key}`]: deconstructedData
    });
  }
  async queueState(newState) {
    const updates = {
      [CONSTANTS.QUEUED_STATE_FLAG]: newState
    };
    if (Hooks.call("ats.preUpdateQueuedState", this.document, this.flags.data, updates) === false) {
      return;
    }
    return this.update(updates);
  }
  async updateState(stateIndex) {
    const updates = {
      [CONSTANTS.PREVIOUS_STATE_FLAG]: this.flags.currentStateIndex,
      [CONSTANTS.CURRENT_STATE_FLAG]: stateIndex,
      [CONSTANTS.QUEUED_STATE_FLAG]: this.flags.determineNextStateIndex(stateIndex)
    };
    if (Hooks.call("ats.preUpdateCurrentState", this.document, this.flags.data, updates) === false) {
      return;
    }
    return this.update(updates);
  }
  async changeState({ state = null, step = 1, fast = false } = {}) {
    if (this.nextButton) {
      this.nextButton.removeClass("active");
    }
    if (this.prevButton) {
      this.prevButton.removeClass("active");
    }
    this.clearRandomTimers();
    if (!fast && this.flags.currentState.behavior !== CONSTANTS.BEHAVIORS.STILL) {
      if (this.nextButton && this.prevButton && state === null) {
        this[step > 0 ? "nextButton" : "prevButton"].addClass("active");
      }
      return this.queueState(state ?? this.flags.currentStateIndex + step);
    }
    clearTimeout(this.timeout);
    this.timeout = null;
    return this.updateState(state ?? this.flags.currentStateIndex + step);
  }
  setupRandomTimers() {
    if (game.user !== currentDelegator)
      return;
    for (const stateIndex of this.flags.determineNextRandomStates()) {
      if (this.randomTimers[stateIndex])
        continue;
      const state = this.flags.states[stateIndex];
      const delayStart = Number(state.randomStart) * 1e3;
      const delayEnd = Number(state.randomEnd) * 1e3;
      const delay = randomIntegerBetween(delayStart, delayEnd);
      let timerId = null;
      timerId = setTimeout(() => {
        delete this.randomTimers[stateIndex];
        if (this.flags.currentStateIsRandom)
          return;
        if (this.flags.currentStateIsStill) {
          this.updateState(stateIndex);
        } else if (this.flags.currentStateIsLoop) {
          this.queueState(stateIndex);
        }
      }, delay);
      this.randomTimers[stateIndex] = timerId;
    }
  }
  clearRandomTimers() {
    Object.values(this.randomTimers).forEach((timerId) => clearTimeout(timerId));
    this.randomTimers = {};
  }
  determineStartTime(stateIndex) {
    const currState = this.flags.states?.[stateIndex];
    const currStart = isRealNumber(currState?.start) ? Number(currState?.start) * this.flags.durationMultiplier : currState?.start ?? 0;
    switch (currStart) {
      case CONSTANTS.START.START:
        return 0;
      case CONSTANTS.START.END:
        return this.duration;
      case CONSTANTS.START.MID:
        return Math.floor(this.duration / 2);
      case CONSTANTS.START.PREV:
        return this.determineEndTime(stateIndex - 1);
    }
    return currStart;
  }
  determineEndTime(stateIndex) {
    const currState = this.flags.states?.[stateIndex];
    const currEnd = isRealNumber(currState?.end) ? Number(currState?.end) * this.flags.durationMultiplier : currState?.end ?? this.duration;
    switch (currEnd) {
      case CONSTANTS.END.END:
        return this.duration;
      case CONSTANTS.END.MID:
        return Math.floor(this.duration / 2);
      case CONSTANTS.END.NEXT:
        return this.determineStartTime(stateIndex + 1);
    }
    return currEnd;
  }
  evaluateVisibility() {
    const hidden = this.flags.currentState.behavior === CONSTANTS.BEHAVIORS.STILL_HIDDEN;
    this.document.object.renderable = !hidden || game.user.isGM;
    this.document.object.mesh.alpha = hidden ? game.user.isGM ? 0.5 : 0 : this.document.alpha;
    return hidden;
  }
  getVideoPlaybackState() {
    if (!this.ready) {
      return {
        playing: false,
        loop: false,
        offset: 0
      };
    }
    if (!this.flags?.states?.length || !this.document?.object)
      return;
    const startTime = this.newCurrentTime ?? this.determineStartTime(this.flags.currentStateIndex) ?? 0;
    const endTime = this.determineEndTime(this.flags.currentStateIndex) ?? this.duration;
    this.newCurrentTime = null;
    this.evaluateVisibility();
    this.still = false;
    this.playing = true;
    this.texture.update();
    switch (this.flags.currentState.behavior) {
      case CONSTANTS.BEHAVIORS.STILL:
      case CONSTANTS.BEHAVIORS.STILL_HIDDEN:
        return this.handleStillBehavior(startTime);
      case CONSTANTS.BEHAVIORS.LOOP:
        return this.handleLoopBehavior(startTime, endTime);
      default:
        return this.handleOnceBehavior(startTime, endTime);
    }
  }
  setTimeout(callback, waitDuration) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.timeout = null;
      callback();
    }, Math.ceil(waitDuration));
  }
  handleStillBehavior(startTime) {
    this.still = true;
    const fn = () => {
      this.video.removeEventListener("seeked", fn);
      this.texture.update();
    };
    this.video.addEventListener("seeked", fn);
    this.video.play();
    this.video.currentTime = (startTime ?? 0) / 1e3;
    this.video.pause();
    return false;
  }
  handleLoopBehavior(startTime, endTime = 0) {
    let loopDuration = endTime - startTime + this.flags.singleFrameDuration;
    if (startTime + loopDuration > this.duration) {
      loopDuration = this.duration - startTime;
    }
    const offsetLoopTime = (this.offset ?? 0) % loopDuration;
    const offsetStartTime = startTime + offsetLoopTime;
    this.offset = 0;
    this.setTimeout(() => {
      this.playing = false;
      if (this.flags.queuedStateIndexIsDifferent) {
        return this.updateState(this.flags.queuedStateIndex);
      }
      game.video.play(this.video);
      this.setupRandomTimers();
    }, loopDuration - offsetLoopTime);
    return {
      playing: true,
      loop: false,
      offset: offsetStartTime / 1e3
    };
  }
  handleOnceBehavior(startTime, endTime) {
    if (!this.flags.currentStateIsRandom) {
      this.clearRandomTimers();
    }
    this.setTimeout(async () => {
      let queuedState = this.flags.queuedStateIndex;
      if (queuedState === null) {
        queuedState = this.flags.determineNextStateIndex();
      }
      this.playing = false;
      this.video.pause();
      return this.updateState(queuedState);
    }, endTime - startTime);
    this.offset = 0;
    return {
      playing: true,
      loop: false,
      offset: startTime / 1e3
    };
  }
}
class Flags {
  constructor(doc) {
    this.doc = doc;
    this.uuid = doc.uuid;
    this.delegationUuid = this.uuid.split(".").slice(1).join("_");
    this._data = false;
  }
  get data() {
    if (!this._data) {
      this._data = this.getData();
    }
    return this._data;
  }
  get states() {
    return this.data?.states ?? [];
  }
  get offset() {
    return Number(Date.now()) - this.updated - this.singleFrameDuration;
  }
  get updated() {
    return this.data?.updated ?? 0;
  }
  get previousState() {
    return this.states[this.previousStateIndex];
  }
  get previousStateIndex() {
    return Math.max(0, Math.min(this.data.previousState ?? this.currentStateIndex, this.data.states.length - 1));
  }
  get currentState() {
    return this.states[this.currentStateIndex];
  }
  get currentStateIsStill() {
    return this.currentState.behavior === CONSTANTS.BEHAVIORS.STILL || this.currentState.behavior === CONSTANTS.BEHAVIORS.STILL_HIDDEN;
  }
  get currentStateIsLoop() {
    return this.currentState.behavior === CONSTANTS.BEHAVIORS.LOOP;
  }
  get currentStateIsRandom() {
    return this.currentState.behavior === CONSTANTS.BEHAVIORS.RANDOM || this.currentState.behavior === CONSTANTS.BEHAVIORS.RANDOM_IF;
  }
  get currentStateIndex() {
    const defaultStateIndex = this.data.states.findIndex((state) => state.default) ?? 0;
    return Math.max(0, Math.min(this.data.currentState ?? defaultStateIndex, this.data.states.length - 1));
  }
  get queuedState() {
    return this.states[this.queuedStateIndex];
  }
  get queuedStateIndex() {
    return this.data.queuedState > -1 ? this.data.queuedState : null;
  }
  get durationMultiplier() {
    switch (this.data?.numberType ?? CONSTANTS.NUMBER_TYPES.FRAMES) {
      case CONSTANTS.NUMBER_TYPES.MILLISECONDS:
        return 1;
      case CONSTANTS.NUMBER_TYPES.SECONDS:
        return 1e3;
      case CONSTANTS.NUMBER_TYPES.FRAMES:
        return 1e3 / this.fps;
    }
  }
  get fps() {
    return this.data?.fps || 24;
  }
  get singleFrameDuration() {
    return 1e3 / this.fps;
  }
  get queuedStateIndexIsDifferent() {
    return this.queuedStateIndex !== null && this.queuedStateIndex !== this.currentStateIndex;
  }
  getData() {
    const documentFlags = getProperty(this.doc, CONSTANTS.FLAGS);
    if (currentDelegator && !currentDelegator.isGM) {
      const userFlags = getProperty(currentDelegator, CONSTANTS.DELEGATED_STATEFUL_VIDEOS_FLAG + "." + this.delegationUuid);
      if (userFlags?.updated && documentFlags?.updated && userFlags?.updated > documentFlags?.updated) {
        return userFlags;
      }
    }
    return documentFlags;
  }
  copyData() {
    copiedData.set({
      [CONSTANTS.STATES_FLAG]: this.data.states,
      [CONSTANTS.NUMBER_TYPE_FLAG]: this.data.numberType,
      [CONSTANTS.FPS_FLAG]: this.data.fps,
      [CONSTANTS.CURRENT_STATE_FLAG]: this.currentStateIndex
    });
    ui.notifications.notify("The Kinemancer | Copied video state data");
  }
  pasteData() {
    const localCopyData = get_store_value(copiedData);
    if (!localCopyData)
      return;
    if (foundry.utils.isEmpty(localCopyData))
      return;
    this.doc.update({
      ...foundry.utils.deepClone(localCopyData)
    });
    ui.notifications.notify("The Kinemancer | Pasted video state data");
  }
  updateData() {
    this._data = this.getData();
  }
  getStateById(id) {
    const index = this.states.findIndex((state) => state.id === id);
    return index >= 0 ? index : false;
  }
  getStateIndexFromSteps(steps = 1) {
    return Math.max(0, Math.min(this.currentStateIndex + steps, this.data.states.length - 1));
  }
  determineNextRandomStates(stateIndex = null) {
    stateIndex ??= this.currentStateIndex;
    const state = this.states[stateIndex];
    const nextStates = this.states.filter((s) => {
      return s.behavior === CONSTANTS.BEHAVIORS.RANDOM || s.behavior === CONSTANTS.BEHAVIORS.RANDOM_IF && s.randomState === state.id;
    }).map((s) => this.states.indexOf(s));
    if (nextStates.length) {
      return nextStates;
    }
    return [Math.max(0, Math.min(stateIndex, this.states.length - 1))];
  }
  determineNextStateIndex(stateIndex = null) {
    stateIndex ??= this.currentStateIndex;
    const state = this.states[stateIndex];
    const index = Math.max(0, Math.min(stateIndex, this.states.length - 1));
    const defaultIndex = this.states.findIndex((s) => s.default);
    switch (state?.behavior) {
      case CONSTANTS.BEHAVIORS.ONCE_NEXT:
        return this.states[index + 1] ? index + 1 : defaultIndex;
      case CONSTANTS.BEHAVIORS.ONCE_PREVIOUS:
        return this.states[index - 1] ? index - 1 : defaultIndex;
      case CONSTANTS.BEHAVIORS.ONCE_PREVIOUS_ACTIVE:
      case CONSTANTS.BEHAVIORS.RANDOM:
        return this.currentStateIndex;
      case CONSTANTS.BEHAVIORS.RANDOM_IF:
        const nextSpecific = this.getStateById(state.randomState);
        return nextSpecific >= 0 ? nextSpecific : defaultIndex;
      case CONSTANTS.BEHAVIORS.ONCE_SPECIFIC:
        const nextIndex = this.getStateById(state.nextState);
        return nextIndex >= 0 ? nextIndex : defaultIndex;
    }
    return index;
  }
}
Hooks.once("init", async function() {
  registerLibwrappers();
  SocketHandler.initialize();
  StatefulVideo.registerHooks();
  game.thekinemancer = {
    updateState: (uuid, options) => StatefulVideo.changeVideoState(uuid, options),
    StatefulVideo,
    CONSTANTS,
    copiedData,
    lib
  };
});
Hooks.once("ready", async function() {
  setTimeout(() => {
    StatefulVideo.determineCurrentDelegator();
  }, 250);
  document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
      StatefulVideo.getAll().forEach((statefulVideo) => {
        statefulVideo.video.pause();
      });
    } else {
      StatefulVideo.getAll().forEach((statefulVideo) => {
        statefulVideo.offset = Number(Date.now()) - statefulVideo.flags.updated;
        game.video.play(statefulVideo.video);
      });
    }
  });
});
Hooks.on("renderFilePicker", (filePicker, html) => {
  const regex = new RegExp(/^.*?the-kinemancer\/.+__(.+).webm$/, "g");
  html.find('[data-src="icons/svg/video.svg"]:visible').each((idx, imgElem) => {
    const img = $(imgElem);
    const parent = img.closest("[data-path]");
    const path = parent.data("path");
    const width = img.attr("width");
    const height = img.attr("height");
    if (path.match(regex)) {
      parent.remove();
      return;
    }
    new Promise(async (resolve) => {
      let found = false;
      const splitPath = path.split("/");
      const file_name = splitPath.pop();
      const variationPath = splitPath.join("/") + "/stills/" + file_name.replace(".webm", ".webp");
      try {
        await FilePicker.browse("data", variationPath).then(() => {
          found = true;
          setTimeout(() => {
            img.attr("src", variationPath);
          }, 150);
        });
      } catch (err) {
      }
      resolve();
    });
    const video = $(`<video class="fas video-preview" loop width="${width}" height="${height}"></video>`);
    video.hide();
    parent.append(video);
    const videoElem = video.get(0);
    let playTimeout = null;
    parent.addClass("video-parent");
    parent.on("mouseenter", () => {
      if (!videoElem.src) {
        parent.addClass(" -loading");
        videoElem.addEventListener("loadeddata", () => {
          parent.removeClass("-loading");
        }, false);
        videoElem.src = path;
      }
      img.hide();
      video.show();
      playTimeout = setTimeout(() => {
        videoElem.currentTime = 0;
        videoElem.play().catch((e) => console.error(e));
      }, !!videoElem.src ? 0 : 750);
    }).on("mouseleave", () => {
      clearTimeout(playTimeout);
      videoElem.pause();
      videoElem.currentTime = 0;
      video.hide();
      img.show();
    });
  });
});
function registerLibwrappers() {
  libWrapper.register(CONSTANTS.MODULE_NAME, "Tile.prototype._destroy", function(wrapped) {
    if (this.isVideo) {
      StatefulVideo.tearDown(this.document.uuid);
    }
    return wrapped();
  }, "MIXED");
  libWrapper.register(CONSTANTS.MODULE_NAME, "Token.prototype._destroy", function(wrapped) {
    if (this.isVideo) {
      StatefulVideo.tearDown(this.document.uuid);
    }
    return wrapped();
  }, "MIXED");
  libWrapper.register(CONSTANTS.MODULE_NAME, "VideoHelper.prototype.play", async function(wrapped, video, options) {
    for (const statefulVideo of StatefulVideo.getAll().values()) {
      if (video === statefulVideo.video) {
        if (this.locked || statefulVideo.destroyed || statefulVideo.playing || statefulVideo.still)
          return;
        if (window.document.hidden)
          return video.pause();
        const newOptions = statefulVideo.getVideoPlaybackState();
        if (!newOptions)
          return;
        return wrapped(video, newOptions);
      }
    }
    return wrapped(video, options);
  }, "MIXED");
  libWrapper.register(CONSTANTS.MODULE_NAME, "VideoHelper.prototype._onFirstGesture", async function(wrapped, event) {
    Hooks.callAll("canvasFirstUserGesture");
    return wrapped(event);
  }, "MIXED");
}
//# sourceMappingURL=module.js.map
