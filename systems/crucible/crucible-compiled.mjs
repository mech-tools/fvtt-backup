/**
 * The primary attributes which are called abilities.
 * @type {{
 *   strength: {id: string, label: string, abbreviation: string},
 *   toughness: {id: string, label: string, abbreviation: string},
 *   dexterity: {id: string, label: string, abbreviation: string},
 *   intellect: {id: string, label: string, abbreviation: string},
 *   presence: {id: string, label: string, abbreviation: string},
 *   wisdom: {id: string, label: string, abbreviation: string}
 * }}
 */
const ABILITIES = Object.freeze({
  wisdom: {
    id: "wisdom",
    label: "ABILITIES.Wisdom",
    abbreviation: "ABILITIES.WisdomAbbr",
    type: "mental",
    group: "power",
    color: Color.from("#e420fb"),
    sheetOrder: 2,
    nodeId: "wis"
  },
  presence: {
    id: "presence",
    label: "ABILITIES.Presence",
    abbreviation: "ABILITIES.PresenceAbbr",
    type: "mental",
    group: "resilience",
    color: Color.from("#5977fd"),
    sheetOrder: 4,
    nodeId: "pre"
  },
  intellect: {
    id: "intellect",
    label: "ABILITIES.Intellect",
    abbreviation: "ABILITIES.IntellectAbbr",
    type: "mental",
    group: "speed",
    color: Color.from("#0aedec"),
    sheetOrder: 6,
    nodeId: "int"
  },
  strength: {
    id: "strength",
    label: "ABILITIES.Strength",
    abbreviation: "ABILITIES.StrengthAbbr",
    type: "physical",
    group: "power",
    color: Color.from("#da1206"),
    sheetOrder: 1,
    nodeId: "str"
  },
  toughness: {
    id: "toughness",
    label: "ABILITIES.Toughness",
    abbreviation: "ABILITIES.ToughnessAbbr",
    type: "physical",
    group: "resilience",
    color: Color.from("#f4b71e"),
    sheetOrder: 3,
    nodeId: "tou"
  },
  dexterity: {
    id: "dexterity",
    label: "ABILITIES.Dexterity",
    abbreviation: "ABILITIES.DexterityAbbr",
    type: "physical",
    group: "speed",
    color: Color.from("#56eb09"),
    sheetOrder: 5,
    nodeId: "dex"
  }
});

/* -------------------------------------------- */

/**
 * Define the top level damage categories.
 * @enum {{id: string, label: string}}
 */
const DAMAGE_CATEGORIES = Object.freeze({
  physical: {
    id: "physical",
    label: "DAMAGE.Physical"
  },
  elemental: {
    id: "elemental",
    label: "DAMAGE.Elemental"
  },
  spiritual: {
    id: "spiritual",
    label: "DAMAGE.Spiritual"
  }
});

/* -------------------------------------------- */

/**
 * Define the individual damage types within each damage category.
 * @enum {{id: string, label: string, type: string}}
 */
const DAMAGE_TYPES = Object.freeze({
  bludgeoning: {
    id: "bludgeoning",
    label: "DAMAGE.Bludgeoning",
    type: "physical"
  },
  corruption: {
    id: "corruption",
    label: "DAMAGE.Corruption",
    type: "spiritual"
  },
  piercing: {
    id: "piercing",
    label: "DAMAGE.Piercing",
    type: "physical"
  },
  slashing: {
    id: "slashing",
    label: "DAMAGE.Slashing",
    type: "physical"
  },
  poison: {
    id: "poison",
    label: "DAMAGE.Poison",
    type: "physical"
  },
  acid: {
    id: "acid",
    label: "DAMAGE.Acid",
    type: "elemental"
  },
  fire: {
    id: "fire",
    label: "DAMAGE.Fire",
    type: "elemental"
  },
  cold: {
    id: "cold",
    label: "DAMAGE.Cold",
    type: "elemental"
  },
  electricity: {
    id: "electricity",
    label: "DAMAGE.Electricity",
    type: "elemental"
  },
  psychic: {
    id: "psychic",
    label: "DAMAGE.Psychic",
    type: "spiritual"
  },
  radiant: {
    id: "radiant",
    label: "DAMAGE.Radiant",
    type: "spiritual"
  },
  void: {
    id: "void",
    label: "DAMAGE.Void",
    type: "spiritual"
  }
});


/* -------------------------------------------- */

/**
 * @typedef {Object}  CrucibleResource    A resource pool available to an Actor within the system
 * @property {string} id                  The resource id
 * @property {string} label               The localized full label for the resource
 * @property {string} abbreviation        The localized abbreviation for the resource
 * @property {string} type                The type of resource, "active" or "reserve"
 * @property {string} tooltip             The tooltip formula for the resource
 * @property {{high: number, low: number, heal: number}} color  Displayed colors for the resource
 */

/**
 * Define the resource pools which are tracked for each character
 * @enum {CrucibleResource}
 */
const RESOURCES = Object.freeze({
  health: {
    id: "health",
    label: "RESOURCES.HEALTH",
    type: "active",
    tooltip: "(6 &times; Level) + (4 &times; Toughness) + (2 &times; Strength)",
    color: {
      high: Color.from("#d72828"),
      low: Color.from("#5e0000"),
      heal: Color.from("#48c248")
    },
  },
  wounds: {
    id: "wounds",
    label: "RESOURCES.WOUNDS",
    type: "reserve",
    tooltip: "Health &times; 1.5",
    color: {
      high: Color.from("#d72828"),
      low: Color.from("#5e0000"),
      heal: Color.from("#48c248")
    },
  },
  morale: {
    id: "morale",
    label: "RESOURCES.MORALE",
    type: "active",
    tooltip: "(6 &times; Level) + (4 &times; Presence) + (2 &times; Wisdom)",
    color: {
      high: Color.from("#7550ff"),
      low: Color.from("#3c037e"),
      heal: Color.from("#cd4fff")
    }
  },
  madness: {
    id: "madness",
    label: "RESOURCES.MADNESS",
    tooltip: "Morale &times; 1.5",
    type: "reserve",
    color: {
      high: Color.from("#7550ff"),
      low: Color.from("#3c037e"),
      heal: Color.from("#cd4fff")
    }
  },
  action: {
    id: "action",
    label: "RESOURCES.ACTION",
    tooltip: "3 + Action Bonus",
    type: "active",
    color: Color.from("#FF9900"),
    max: 12
  },
  focus: {
    id: "focus",
    label: "RESOURCES.FOCUS",
    tooltip: "(Wisdom + Presence + Intellect) / 2",
    type: "active",
    color: Color.from("#3385ff"),
    max: 24
  },
  heroism: {
    id: "heroism",
    label: "RESOURCES.HEROISM",
    tooltip: "Maximum 3",
    type: "active",
    color: Color.from("#ff0059"),
    max: 3
  }
});

/* -------------------------------------------- */

/**
 * The base threshold for passive checks onto which bonuses are added.
 * @type {number}
 */
const PASSIVE_BASE = 12;

/* -------------------------------------------- */

/**
 * The defense types which can be used to counter an attack roll.
 * @type {object}
 */
const DEFENSES = {
  physical: {
    id: "physical",
    label: "DEFENSES.Physical",
    type: "physical"
  },
  armor: {
    id: "armor",
    label: "DEFENSES.Armor",
    type: "physical"
  },
  block: {
    id: "block",
    label: "DEFENSES.Block",
    type: "physical"
  },
  dodge: {
    id: "dodge",
    label: "DEFENSES.Dodge",
    type: "physical"
  },
  parry: {
    id: "parry",
    label: "DEFENSES.Parry",
    type: "physical"
  },
  fortitude: {
    id: "fortitude",
    label: "DEFENSES.Fortitude",
    abilities: ["strength", "wisdom"],
    tooltip: `${PASSIVE_BASE} + ((Strength + Wisdom) / 4)`,
    type: "save"
  },
  willpower: {
    id: "willpower",
    label: "DEFENSES.Willpower",
    abilities: ["toughness", "presence"],
    tooltip: `${PASSIVE_BASE} + ((Toughness + Presence) / 4)`,
    type: "save"
  },
  reflex: {
    id: "reflex",
    label: "DEFENSES.Reflex",
    abilities: ["dexterity", "intellect"],
    tooltip: `${PASSIVE_BASE} + ((Dexterity + Intellect) / 4)`,
    type: "save"
  },
  wounds: {
    id: "wounds",
    label: "DEFENSES.Wounds",
    tooltip: `${PASSIVE_BASE} + (Wounds / 10)`,
    type: "threshold"
  },
  madness: {
    id: "madness",
    label: "DEFENSES.Madness",
    tooltip: `${PASSIVE_BASE} + (Madness / 10)`,
    type: "threshold"
  }
};/**
 * The thematic categories of skills. Each skill belongs to one of these categories.
 * @type {Record<string, {label: string, hint: string, defaultIcon: string, color: Color}>}
 */
const CATEGORIES$4 = {
  "exp": {
    label: "SKILL.CATEGORY.EXPLORATION.label",
    hint: "SKILL.CATEGORY.EXPLORATION.hint",
    defaultIcon: "icons/skills/no-exp.jpg",
    color: Color.from("#81cc44")
  },
  "kno": {
    label: "SKILL.CATEGORY.KNOWLEDGE.label",
    hint: "SKILL.CATEGORY.KNOWLEDGE.hint",
    defaultIcon: "icons/skills/no-kno.jpg",
    color: Color.from("#6c6cff")
  },
  "soc": {
    label: "SKILL.CATEGORY.SOCIAL.label",
    hint: "SKILL.CATEGORY.SOCIAL.hint",
    defaultIcon: "icons/skills/no-soc.jpg",
    color: Color.from("#ab3fe8")
  }
};

/**
 * @typedef CrucibleSkillConfig
 * @property {string} id
 * @property {string} label
 * @property {string} category
 * @property {[string, string]} abilities
 * @property {Record<1|2|3|4, string>} talents
 */

/**
 * The skills configured for the system.
 * @type {Record<string, CrucibleSkillConfig>}
 */
const SKILLS = Object.freeze({

  // Exploration Skills
  athletics: {
    id: "athletics",
    label: "SKILL.LABELS.athletics",
    icon: "systems/crucible/icons/skills/athletics.jpg",
    category: "exp",
    abilities: ["strength", "dexterity"],
    talents: {
      1: "Compendium.crucible.talent.Item.athleticsNovice0",
      2: "Compendium.crucible.talent.Item.athleticsJourney",
      3: "Compendium.crucible.talent.Item.athleticsAdept00",
      4: "Compendium.crucible.talent.Item.athleticsMaster0"
    }
  },
  awareness: {
    id: "awareness",
    label: "SKILL.LABELS.awareness",
    icon: "systems/crucible/icons/skills/awareness.jpg",
    category: "exp",
    abilities: ["intellect", "wisdom"],
    talents: {
      1: "Compendium.crucible.talent.Item.awarenessNovice0",
      2: "Compendium.crucible.talent.Item.athleticsJourney",
      3: "Compendium.crucible.talent.Item.athleticsAdept00",
      4: "Compendium.crucible.talent.Item.athleticsAdept00"
    }
  },
  stealth: {
    id: "stealth",
    label: "SKILL.LABELS.stealth",
    icon: "systems/crucible/icons/skills/stealth.jpg",
    category: "exp",
    abilities: ["dexterity", "intellect"],
    talents: {
      1: "Compendium.crucible.talent.Item.stealthNovice000",
      2: "Compendium.crucible.talent.Item.stealthJourneyma",
      3: "Compendium.crucible.talent.Item.stealthAdept0000",
      4: "Compendium.crucible.talent.Item.stealthMaster000"
    }
  },
  wilderness: {
    id: "wilderness",
    label: "SKILL.LABELS.wilderness",
    icon: "systems/crucible/icons/skills/wilderness.jpg",
    category: "exp",
    abilities: ["toughness", "wisdom"],
    talents: {
      1: "Compendium.crucible.talent.Item.wildernessNovice",
      2: "Compendium.crucible.talent.Item.wildernessJourne",
      3: "Compendium.crucible.talent.Item.wildernessAdept0",
      4: "Compendium.crucible.talent.Item.wildernessMaster"
    }
  },

  // Knowledge Skills
  arcana: {
    id: "arcana",
    label: "SKILL.LABELS.arcana",
    icon: "systems/crucible/icons/skills/arcana.jpg",
    category: "kno",
    abilities: ["presence", "intellect"],
    talents: {
      1: "Compendium.crucible.talent.Item.arcanaNovice0000",
      2: "Compendium.crucible.talent.Item.arcanaJourneyman",
      3: "Compendium.crucible.talent.Item.arcanaAdept00000",
      4: "Compendium.crucible.talent.Item.arcanaMaster0000"
    }
  },
  medicine: {
    id: "medicine",
    label: "SKILL.LABELS.medicine",
    icon: "systems/crucible/icons/skills/medicine.jpg",
    category: "kno",
    abilities: ["wisdom", "intellect"],
    talents: {
      1: "Compendium.crucible.talent.Item.medicineNovice00",
      2: "Compendium.crucible.talent.Item.medicineJourneym",
      3: "Compendium.crucible.talent.Item.medicineAdept000",
      4: "Compendium.crucible.talent.Item.medicineMaster00"
    }
  },
  science: {
    id: "science",
    label: "SKILL.LABELS.science",
    icon: "systems/crucible/icons/skills/science.jpg",
    category: "kno",
    abilities: ["intellect", "wisdom"],
    talents: {
      1: "Compendium.crucible.talent.Item.scienceNovice000",
      2: "Compendium.crucible.talent.Item.scienceJourneyma",
      3: "Compendium.crucible.talent.Item.scienceAdept0000",
      4: "Compendium.crucible.talent.Item.scienceMaster000"
    }
  },
  society: {
    id: "society",
    label: "SKILL.LABELS.society",
    icon: "systems/crucible/icons/skills/society.jpg",
    category: "kno",
    abilities: ["wisdom", "presence"],
    talents: {
      1: "Compendium.crucible.talent.Item.societyNovice000",
      2: "Compendium.crucible.talent.Item.societyJourneyma",
      3: "Compendium.crucible.talent.Item.societyAdept0000",
      4: "Compendium.crucible.talent.Item.societyMaster000"
    }
  },

  // Social Skills
  deception: {
    id: "deception",
    label: "SKILL.LABELS.deception",
    icon: "systems/crucible/icons/skills/deception.jpg",
    category: "soc",
    abilities: ["intellect", "presence"],
    talents: {
      1: "Compendium.crucible.talent.Item.deceptionNovice0",
      2: "Compendium.crucible.talent.Item.deceptionJourney",
      3: "Compendium.crucible.talent.Item.deceptionAdept00",
      4: "Compendium.crucible.talent.Item.deceptionMaster0"
    }
  },
  diplomacy: {
    id: "diplomacy",
    label: "SKILL.LABELS.diplomacy",
    icon: "systems/crucible/icons/skills/diplomacy.jpg",
    category: "soc",
    abilities: ["wisdom", "presence"],
    talents: {
      1: "Compendium.crucible.talent.Item.diplomacyNovice0",
      2: "Compendium.crucible.talent.Item.diplomacyJourney",
      3: "Compendium.crucible.talent.Item.diplomacyAdept00",
      4: "Compendium.crucible.talent.Item.diplomacyMaster0"
    }
  },
  intimidation: {
    id: "intimidation",
    label: "SKILL.LABELS.intimidation",
    icon: "systems/crucible/icons/skills/intimidation.jpg",
    category: "soc",
    abilities: ["presence", "toughness"],
    talents: {
      1: "Compendium.crucible.talent.Item.intimidationNovi",
      2: "Compendium.crucible.talent.Item.intimidationJour",
      3: "Compendium.crucible.talent.Item.intimidationAdep",
      4: "Compendium.crucible.talent.Item.intimidationMast"
    }
  },
  performance: {
    id: "performance",
    label: "SKILL.LABELS.performance",
    icon: "systems/crucible/icons/skills/performance.jpg",
    category: "soc",
    abilities: ["presence", "dexterity"],
    talents: {
      1: "Compendium.crucible.talent.Item.performanceNovic",
      2: "Compendium.crucible.talent.Item.performanceJourn",
      3: "Compendium.crucible.talent.Item.performanceAdept",
      4: "Compendium.crucible.talent.Item.performanceMaste"
    }
  }
});

/**
 * The UUID of the journal entry which provides skill definitions to the system.
 * @type {string}
 */
let JOURNAL_ID = "Compendium.crucible.rules.JournalEntry.CrucibleSkills00";

/**
 * @typedef CrucibleKnowledgeConfig
 * @property {string} id
 * @property {string} label
 * @property {string} skill
 */

/**
 * The knowledge topics configured for the system.
 * @type {Record<string, CrucibleKnowledgeConfig>}
 */
const DEFAULT_KNOWLEDGE = Object.freeze({
  alchemy: {label: "Alchemy", skill: "arcana"},
  ancients: {label: "Ancients", skill: "society"},
  artifacts: {label: "Artifacts", skill: "society"},
  arts: {label: "Arts", skill: "performance"},
  beasts: {label: "Beasts", skill: "wilderness"},
  celestials: {label: "Celestials", skill: "arcana"},
  cosmology: {label: "Cosmology", skill: "science"},
  crafts: {label: "Crafts", skill: "society"},
  crime: {label: "Crime", skill: "society"},
  dragons: {label: "Dragons", skill: "medicine"},
  elementals: {label: "Elementals", skill: "arcana"},
  fey: {label: "Fey", skill: "arcana"},
  fiends: {label: "Fiends", skill: "arcana"},
  forensics: {label: "Forensics", skill: "awareness"},
  gods: {label: "Gods", skill: "arcana"},
  intrigue: {label: "Intrigue", skill: "deception"},
  legends: {label: "Legends", skill: "society"},
  machines: {label: "Machines", skill: "science"},
  monsters: {label: "Monsters", skill: "medicine"},
  outsiders: {label: "Outsiders", skill: "arcana"},
  plants: {label: "Plants", skill: "wilderness"},
  politics: {label: "Politics", skill: "diplomacy"},
  rituals: {label: "Rituals", skill: "arcana"},
  seafaring: {label: "Seafaring", skill: "wilderness"},
  souls: {label: "Souls", skill: "arcana"},
  subterranea: {label: "Subterranea", skill: "wilderness"},
  tracking: {label: "Tracking", skill: "awareness"},
  trade: {label: "Trade", skill: "society"},
  undeath: {label: "Undeath", skill: "medicine"},
  warfare: {label: "Warfare", skill: "intimidation"},
  weather: {label: "Weather", skill: "science"}
});var SKILL=/*#__PURE__*/Object.freeze({__proto__:null,CATEGORIES:CATEGORIES$4,DEFAULT_KNOWLEDGE:DEFAULT_KNOWLEDGE,JOURNAL_ID:JOURNAL_ID,SKILLS:SKILLS});/**
 * An object structure used for an enum with keys, values, and labels.
 * TODO deprecate this
 * @template {any} ValueType
 */
class Enum {
  constructor(values) {
    Object.defineProperty(this, "labels", {value: {}});
    for ( const [key, {value, label}] of Object.entries(values) ) {
      Object.defineProperty(this, key, {value: value, writable: false, enumerable: true});
      this.labels[key] = label;
      this.#values[value] = key;
    }
    Object.freeze(this);
    Object.freeze(this.#values);
  }

  /**
   * An internal registry of enum values.
   * @type {Record<string, ValueType>}
   */
  #values = {};

  /**
   * A registry of value labels.
   * @type {Record<string, string>}
   */
  labels;

  /**
   * Provide the label for an enum entry by its key or by its value.
   * @param {string|ValueType} keyOrValue
   * @returns {string}
   */
  label(keyOrValue) {
    const key = keyOrValue in this.labels ? keyOrValue : this.#values[keyOrValue];
    return this.labels[key];
  }

  /**
   * The enum expressed as an object of choices suitable for a <select> input or similar use case.
   * @returns {Record<ValueType, string>}
   */
  get choices() {
    return Object.entries(this.#values).reduce((obj, [k, v]) => {
      obj[k] = this.labels[v];
      return obj;
    }, {});
  }
}

/* -------------------------------------------- */

/**
 * Deep freeze an enumeration, ensuring it has certain required properties.
 * @returns {Record<string, object>}
 */
function freezeEnum(record) {
  for ( const [k, v] of Object.entries(record) ) {
    v.id = k;
    v.label ??= k;
    Object.freeze(v);
  }
  Object.defineProperty(record, "choices", {
    get() {
      Object.values(this).map(v => ({value: v.id, label: v.label, group: v.group}));
    }
  });
  Object.freeze(record);
  return record;
}const {DialogV2: DialogV2$1} = foundry.applications.api;

/**
 * Prompt the user to perform a Standard Check.
 * @extends {DialogV2}
 */
class StandardCheckDialog extends DialogV2$1 {
  constructor({request=false, roll, rollMode, ...options}={}) {
    super(options);
    this.request = request && game.user.isGM;
    this.roll = roll;
    this.rollMode = rollMode;
    if ( this.roll.actor ) this.#requestActors.add(this.roll.actor);
  }

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["crucible", "dialog", "dice-roll", "themed", "theme-dark"],
    window: {
      contentTag: "form",
      contentClasses: ["standard-check", "standard-form"]
    },
    actions: {
      requestToggle: StandardCheckDialog.#onRequestToggle,
      requestClear: StandardCheckDialog.#onRequestClear,
      requestParty: StandardCheckDialog.#onRequestParty,
      requestRemove: StandardCheckDialog.#onRequestRemove,
      rollMode: StandardCheckDialog.#onChangeRollMode,
      requestSubmit: StandardCheckDialog.#requestSubmit,
    },
    position: {
      width: "auto",
      height: "auto"
    }
  };

  /**
   * The template path used to render the Dialog.
   * @type {string}
   */
  static TEMPLATE = "systems/crucible/templates/dice/standard-check-dialog.hbs";

  /**
   * Display the dialog in request mode.
   * @type {boolean}
   */
  request;

  /**
   * The actors who will be requested to roll.
   * @type {Set<CrucibleActor>}
   */
  #requestActors = new Set();

  /**
   * A StandardCheck dice pool instance which organizes the data for this dialog
   * @type {StandardCheck}
   */
  roll;

  /**
   * The selected roll mode for this particular roll.
   * @type {string}
   */
  rollMode;

  /** @override */
  get title() {
    if ( this.options.window.title ) return this.options.window.title;
    const type = this.roll.data.type;
    const skill = SYSTEM.SKILLS[type];
    let label = skill ? `${skill.label} Skill Check` : "Standard Check";
    const actor = this.#requestActors.first();
    if ( actor && (this.#requestActors.size === 1) ) label += `: ${actor.name}`;
    else if ( this.request ) label += `: Request Rolls`;
    return label;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _initializeApplicationOptions(options) {
    delete options.position?.width; // Ignore default dialog width
    options = super._initializeApplicationOptions(options);
    options.buttons = {
      roll: {action: "roll", label: "Roll", icon: "fa-solid fa-dice-d8", callback: this._onRoll.bind(this)},
    };
    return options;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preFirstRender(context, options) {
    await foundry.applications.handlebars.getTemplate(this.constructor.TEMPLATE);
    await super._preFirstRender(context, options);
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const data = this.roll.data;
    const rollMode = this.rollMode || game.settings.get("core", "rollMode");
    return Object.assign({}, data, {
      buttons: this.#prepareButtons(),
      dice: this.roll.dice.map(d => `d${d.faces}`),
      difficulty: this._getDifficulty(data.dc),
      difficulties: Object.entries(SYSTEM.dice.checkDifficulties).map(d => ({dc: d[0], label: `${d[1]} (DC ${d[0]})`})),
      isGM: game.user.isGM,
      request: this.#prepareRequest(),
      rollModes:  Object.entries(CONFIG.Dice.rollModes).map(([action, { label, icon }]) => {
        return {icon, label, action, active: action === rollMode};
      }),
      showDetails: data.totalBoons + data.totalBanes > 0,
      canIncreaseBoons: data.totalBoons < SYSTEM.dice.MAX_BOONS,
      canDecreaseBoons: data.totalBoons > 0,
      canIncreaseBanes: data.totalBanes < SYSTEM.dice.MAX_BOONS,
      canDecreaseBanes: data.totalBanes > 0
    });
  }

  /* -------------------------------------------- */

  #prepareButtons() {
    const buttons = [];
    for ( const b of Object.values(this.options.buttons) ) buttons.push({type: "submit", ...b});
    if ( this.request ) buttons.push(
      {type: "button", action: "requestSubmit", icon: "fa-solid fa-dice-d8", label: "Request"},
      {type: "button", action: "requestClear", cssClass: "icon fa-solid fa-ban", tooltip: "Clear Request"},
      {type: "button", action: "requestParty", cssClass: "icon fa-solid fa-users", tooltip: "Add Party"},
    );
    else buttons.push({type: "button", action: "requestToggle", cssClass: "icon fa-solid fa-chevrons-right", tooltip: "Request Rolls"});
    return buttons;
  }

  /* -------------------------------------------- */

  #prepareRequest() {
    if ( !this.request ) return null;
    const actors = [];
    for ( const actor of this.#requestActors ) {
      actors.push({id: actor.id, name: actor.name, img: actor.img, tags: actor.getTags("short")});
    }
    return {actors};
  }

  /* -------------------------------------------- */

  /** @override */
  async _renderHTML(context, _options) {
    return foundry.applications.handlebars.renderTemplate(this.constructor.TEMPLATE, context);
  }

  /* -------------------------------------------- */

  /** @override */
  _replaceHTML(result, content, _options) {
    content.innerHTML = result;
  }

  /* -------------------------------------------- */

  /**
   * Get the text label for a roll DC.
   * @param {number} dc    The difficulty check for the test
   * @return {{dc: number, label: string, tier: number}}
   * @private
   */
  _getDifficulty(dc) {
    let label = "";
    let tier = 0;
    for ( let [d, l] of Object.entries(SYSTEM.dice.checkDifficulties) ) {
      if ( dc >= d ) {
        tier = d;
        label = `${l} (DC ${d})`;
      }
      else break;
    }
    return {dc, label, tier};
  }

  /* -------------------------------------------- */

  /** @override */
  _onRender(_context, _options) {
    const form = this.element.querySelector("form.window-content");
    form.addEventListener("submit", event => this._onSubmit(event.submitter, event));
    form.classList.toggle("roll-request", this.request);
    if ( this.request ) {
      const dropZone = this.element.querySelector(".requested-actors");
      dropZone?.addEventListener("drop", this.#onDropActor.bind(this));
    }
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Resolve dialog submission to enact a Roll.
   * @returns {StandardCheck}
   * @protected
   */
  _onRoll(_event, _button, _dialog) {
    this.roll.data.rollMode = this.rollMode;
    return this.roll;
  }

  /* -------------------------------------------- */

  async _submitRequest() {
    debugger;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onChangeForm(formConfig, event) {
    // Difficulty Tier
    if ( event.target.name === "difficultyTier" ) {
      const dc = Number(event.target.value) || null;
      if ( Number.isNumeric(dc) ) {
        event.target.parentElement.querySelector(`input[name="dc"]`).value = dc;
        this.roll.data.dc = dc;
      }
    }

    // Difficulty Class
    else if ( event.target.name === "dc" ) {
      event.target.parentElement.querySelector(`select[name="difficultyTier"]`).value = "";
      this.roll.data.dc = event.target.valueAsNumber;
    }
    super._onChangeForm(formConfig, event);
  }

  /* -------------------------------------------- */

  /** @override */
  _onClickAction(event, target) {
    const action = target.dataset.action;
    this.element.querySelector("form");
    const rollData = this.roll.data;
    switch ( action ) {
      case "boon-add":
        this.roll.initialize({boons: StandardCheckDialog.#modifyBoons(rollData.boons, 1)});
        return this.render(false, {height: "auto"});
      case "boon-subtract":
        this.roll.initialize({boons: StandardCheckDialog.#modifyBoons(rollData.boons, -1)});
        return this.render(false, {height: "auto"});
      case "bane-add":
        this.roll.initialize({banes: StandardCheckDialog.#modifyBoons(rollData.banes, 1)});
        return this.render(false, {height: "auto"});
      case "bane-subtract":
        this.roll.initialize({banes: StandardCheckDialog.#modifyBoons(rollData.banes, -1)});
        return this.render(false, {height: "auto"});
    }
  }

  /* -------------------------------------------- */

  /**
   * Update the boons or banes object by changing the number of "special" boons applied to the roll.
   * @param {Object<string, DiceBoon>} boons    The initial configuration of boons
   * @param {number} delta                      The requested delta change in special boons
   * @returns {Object<string, DiceBoon>}        The updated boons object
   */
  static #modifyBoons(boons, delta) {
    boons.special ||= {label: "Special", number: 0};
    const total = Object.values(boons).reduce((t, b) => t + (b.id === "special" ? 0 : b.number), 0);
    boons.special.number = Math.clamp(boons.special.number + delta, 0, SYSTEM.dice.MAX_BOONS - total);
    return boons;
  }

  /* -------------------------------------------- */

  /**
   * Handle changes to the difficulty tier select input
   * TODO support this
   * @param {Event} event           The event which triggers on select change
   * @private
   */
  _onChangeDifficultyTier(event) {
    event.preventDefault();
    event.stopPropagation();
    this._updatePool({dc: parseInt(event.target.value)});
    return this.render();
  }

  /* -------------------------------------------- */

  /**
   * Handle updating the StandardCheck dice pool
   * @param {HTMLFormElement} form    The updated form HTML
   * @param {object} updates          Additional data updates
   * @private
   */
  _updatePool(form, updates={}) {
    const fd = new FormDataExtended(form);
    updates = foundry.utils.mergeObject(fd.object, updates);
    this.roll.initialize(updates);
  }

  /* -------------------------------------------- */

  /**
   * Handle dropping an Actor in the roll request drop-zone.
   * @param {DragEvent} event
   * @returns {Promise<void>}
   */
  async #onDropActor(event) {
    const data = CONFIG.ux.TextEditor.getDragEventData(event);
    if ( data.type !== "Actor" ) return;
    const actor = await fromUuid(data.uuid);
    if ( actor.pack ) return;
    const toAdd = actor.type === "group" ? actor.system.members.map(m => m.actor) : [actor];
    for ( const actor of toAdd ) {
      if ( actor.pack ) continue;
      this.#requestActors.add(actor);
    }
    await this.render({window: {title: this.title}});
  }

  /* -------------------------------------------- */

  static async #onRequestToggle(event) {
    this.request = game.user.isGM;
    await this.render({window: {title: this.title}});
  }

  /* -------------------------------------------- */

  static async #onRequestClear(event) {
    this.#requestActors.clear();
    await this.render({window: {title: this.title}});
  }

  /* -------------------------------------------- */

  static async #onRequestParty(event) {
    if ( !crucible.party ) return;
    for ( const member of crucible.party.system.members ) {
      if ( member.actor ) this.#requestActors.add(member.actor);
    }
    await this.render({window: {title: this.title}});
  }

  /* -------------------------------------------- */

  static async #onRequestRemove(_event, target) {
    const actorId = target.closest(".line-item").dataset.actorId;
    const actor = game.actors.get(actorId);
    this.#requestActors.delete(actor);
    await this.render({window: {title: this.title}});
  }

  /* -------------------------------------------- */

  /**
   * Handle clicks to request rolls made by other players.
   * @this {StandardCheckDialog}
   */
  static async #requestSubmit(_event, _target) {
    const activeUsers = game.users.filter(u => u.active && !u.isSelf);
    const requested = {};
    const unrequested = [];
    const promises = [];
    for ( const actor of this.#requestActors ) {
      let user = activeUsers.find(u => !u.isSelf && (u.character === actor) );
      user ||= activeUsers.find(u => !u.isSelf && actor.testUserPermission(u, "OWNER"));
      if ( user ) {
        requested[actor.name] = user.name;
        promises.push(this.roll.request({user, title: this.title, actorId: actor.id}));
      }
      else unrequested.push(actor.name);
    }

    // Notify
    if ( !foundry.utils.isEmpty(requested) ) {
      let n = "<div><p>Sent roll requests to the following users:<p><ul>";
      for ( const [actorName, userName] of Object.entries(requested) ) {
        n += `<li>Roll for <strong>${actorName}</strong> requested from <strong>${userName}</strong>`;
      }
      n += "<ul></div>";
      // Display as a progress bar as requests are completed?
      ui.notifications.info(n, {clean: false, console: true, permanent: true});
    }
    if ( unrequested.length ) {
      let n = "<div><p>No users present who can handle rolls for the following actors:</p><ul>";
      for ( const actorName of unrequested ) n += `<li><strong>${actorName}</strong></li>`;
      n += "</ul></div>";
      ui.notifications.error(n, {clean: false, console: true, permanent: true});
    }

    // Wait for results - for now do nothing else
    // TODO await all rolls and then confirm their chat messages in bulk
    await Promise.all(promises);
  }

  /* -------------------------------------------- */

  /**
   * Handle clicks on a roll mode selection button.
   * @this {StandardCheckDialog}
   */
  static async #onChangeRollMode(_event, target) {
    this.rollMode = target.dataset.rollMode;
    for ( const button of target.parentElement.children ) {
      button.setAttribute("aria-pressed", button.dataset.rollMode === this.rollMode);
    }
  }

  /* -------------------------------------------- */
  /*  Factory Methods                             */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static async prompt(config={}) {
    config.rejectClose = false;
    return super.prompt(config);
  }
}/**
 * @typedef {Object} DiceBoon
 * @property {string} [id]                    An identifier for the source of boon or bane. This is auto-populated.
 * @property {string} label                   A string label for the source of the boon or bane.
 * @property {number} number                  The number of boons or banes applied by this source.
 */

/**
 * @typedef {Object} DiceCheckBonuses
 * @property {Object<string, DiceBoon>} [boons] An object of advantageous boons applied to the roll.
 *                                            Keys of the object are identifiers for sources of boons.
 * @property {Object<string, DiceBoon>} [banes] An object of disadvantageous banes applied to the roll.
 *                                            Keys of the object are identifiers for sources of banes.
 * @property {number} [ability=0]             The ability score which modifies the roll, up to a maximum of 12
 * @property {number} [skill=0]               The skill bonus which modifies the roll, up to a maximum of 12
 * @property {number} [enchantment=0]         An enchantment bonus which modifies the roll, up to a maximum of 6
 * @property {string} [rollMode]              The rollMode which should be used if this check is displayed in chat
 */

/**
 * @typedef {DiceCheckBonuses} StandardCheckData
 * @property {string} actorId                 The ID of the actor rolling the check
 * @property {number} dc                      The target difficulty of the check
 * @property {string} type                    The type of check being performed
 * @property {number} totalBoons              The computed total number of boons applied to the roll
 * @property {number} totalBanes              The computed total number of banes applied to the roll
 */

/**
 * The standard 3d8 dice pool check used by the system.
 * The rolled formula is determined by:
 *
 * @param {string|StandardCheckData} formula  This parameter is ignored
 * @param {StandardCheckData} [data]          An object of roll data, containing the following optional fields
 */
class StandardCheck extends Roll {
  constructor(formula, data) {
    if ( typeof formula === "object" ) {
      data = formula;
      formula = ""; // Replaced later
    }
    super(formula, data);
    this.actor = game.actors.get(this.data.actorId);
  }

  /* -------------------------------------------- */

  /**
   * Define the default data attributes for this type of Roll
   * @type {object}
   */
  static defaultData = {
    actorId: null,
    ability: 0,
    banes: {},
    boons: {},
    dc: 20,
    enchantment: 0,
    skill: 0,
    type: "general",
    criticalSuccessThreshold: undefined,
    criticalFailureThreshold: undefined,
    rollMode: undefined
  };

  /* -------------------------------------------- */

  /**
   * Which Dialog subclass should display a prompt for this Roll type?
   * @type {StandardCheckDialog}
   */
  static dialogClass = StandardCheckDialog;

  /* -------------------------------------------- */

  /**
   * The HTML template path used to render dice checks of this type
   * @type {string}
   */
  static CHAT_TEMPLATE = "systems/crucible/templates/dice/standard-check-chat.hbs";

  /* -------------------------------------------- */

  /**
   * The Actor performing the check.
   * @type {CrucibleActor}
   */
  actor;

  /* -------------------------------------------- */

  /**
   * Did this check result in a success?
   * @returns {boolean}
   */
  get isSuccess() {
    if ( !this._evaluated ) return undefined;
    return this.total > this.data.dc;
  }

  /* -------------------------------------------- */

  /**
   * Did this check result in a critical success?
   * @returns {boolean}
   */
  get isCriticalSuccess() {
    if ( !this._evaluated ) return undefined;
    return this.total > (this.data.dc + (this.data.criticalSuccessThreshold ?? 6));
  }

  /* -------------------------------------------- */

  /**
   * Did this check result in a failure?
   * @returns {boolean}
   */
  get isFailure() {
    if ( !this._evaluated ) return undefined;
    return this.total <= this.data.dc;
  }

  /* -------------------------------------------- */

  /**
   * Did this check result in a critical failure?
   * @returns {boolean}
   */
  get isCriticalFailure() {
    if ( !this._evaluated ) return undefined;
    return this.total <= (this.data.dc - (this.data.criticalFailureThreshold ?? 6));
  }

  /* -------------------------------------------- */
  /*  Roll Configuration                          */
  /* -------------------------------------------- */

  /** @override */
  _prepareData(data={}) {
    if ( ("boons" in data) && (typeof data.boons !== "object") ) {
      console.warn("StandardCheck received boons passed as a number instead of an object");
      data.boons = {special: {label: "Special", number: Number.isNumeric(data.boons) ? data.boons : 0}};
    }
    if ( ("banes" in data) && (typeof data.banes !== "object") ) {
      data.banes = {special: {label: "Special", number: Number.isNumeric(data.banes) ? data.banes : 0}};
      console.warn("StandardCheck received boons passed as a number instead of an object");
    }
    const current = this.data || foundry.utils.deepClone(this.constructor.defaultData);
    for ( let [k, v] of Object.entries(data) ) {
      if ( v === undefined ) delete data[k];
    }
    data = foundry.utils.mergeObject(current, data, {insertKeys: false});
    StandardCheck.#configureData(data);
    return data;
  }

  /* -------------------------------------------- */

  /**
   * Configure the provided data used to customize this type of Roll
   * @param {object} data     The initially provided data object
   * @returns {object}        The configured data object
   */
  static #configureData(data) {

    // Bonuses
    data.dc = Math.max(data.dc, 0);
    data.ability = Math.clamp(data.ability, 0, 12);
    data.skill = Math.clamp(data.skill, -4, 12);
    data.enchantment = Math.clamp(data.enchantment, 0, 6);

    // Boons and Banes
    data.totalBoons = StandardCheck.#prepareBoons(data.boons);
    data.totalBanes = StandardCheck.#prepareBoons(data.banes);
  }

  /* -------------------------------------------- */

  /**
   * Prepare an object of boons or banes to compute the total which apply to the roll.
   * @param {Object<string, DiceBoon>} boons    Boons applied to the roll
   * @returns {number}                          The total number of applied boons
   */
  static #prepareBoons(boons) {
    let total = 0;
    for ( const [id, boon] of Object.entries(boons) ) {
      boon.id = id;
      boon.number ??= 1;
      if ( (total + boon.number) > SYSTEM.dice.MAX_BOONS ) {
        boon.number = SYSTEM.dice.MAX_BOONS - total;
      }
      total += boon.number;
    }
    return total;
  }

  /* -------------------------------------------- */

  /** @override */
  static parse(_, data) {

    // Configure the pool
    const pool = [8, 8, 8];

    // Apply boons from the left
    let d = 0;
    for (let i = 0; i < data.totalBoons; i++) {
      pool[d] = pool[d] + SYSTEM.dice.DIE_STEP;
      if (pool[d] === SYSTEM.dice.MAX_DIE) d++;
    }

    // Apply banes from the right
    d = 2;
    for (let i = 0; i < data.totalBanes; i++) {
      pool[d] = pool[d] - SYSTEM.dice.DIE_STEP;
      if (pool[d] === SYSTEM.dice.MIN_DIE) d--;
    }

    // Construct the formula
    const terms = pool.map(p => `1d${p}`).concat([data.ability, data.skill]);
    if ( data.enchantment > 0 ) terms.push(data.enchantment);
    const formula = terms.join(" + ");
    return super.parse(formula, data);
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareChatRenderContext({flavor, isPrivate=false}={}) {
    const cardData = {
      cssClass: [SYSTEM.id, "dice-roll", "standard-check"],
      data: this.data,
      defenseType: "DC",
      defenseValue: this.data.dc,
      diceTotal: this.dice.reduce((t, d) => t + d.total, 0),
      isPrivate,
      isGM: game.user.isGM,
      flavor,
      formula: this.formula,
      outcome: "Unknown",
      pool: this.dice.map(d => ({denom: `d${d.faces}`, result: d.total})),
      total: this.total
    };

    // Successes and Failures
    if ( this.data.dc ) {
      if ( this.isSuccess ) {
        cardData.outcome = "Success";
        cardData.cssClass.push("success");
        if ( this.isCriticalSuccess ) {
          cardData.outcome = "Critical " + cardData.outcome;
          cardData.cssClass.push("critical");
        }
      }
      else {
        cardData.outcome = "Failure";
        cardData.cssClass.push("failure");
        if ( this.isCriticalFailure ) {
          cardData.outcome = "Critical " + cardData.outcome;
          cardData.cssClass.push("critical");
        }
      }
    }

    // Damage Resistance or Vulnerability
    if ( Number.isNumeric(this.data.damage?.total) ) {
      cardData.resistanceLabel = this.data.damage.resistance < 0 ? "DICE.DamageVulnerability": "DICE.DamageResistance";
      cardData.resistanceValue = Math.abs(this.data.damage.resistance);
    }
    cardData.cssClass = cardData.cssClass.join(" ");
    return cardData;
  }

  /* -------------------------------------------- */

  /**
   * Used to re-initialize the pool with different data
   * @param {object} data
   */
  initialize(data) {
    this.data = this._prepareData(data);
    this.terms = this.constructor.parse("", this.data);
  }

  /* -------------------------------------------- */

  /**
   * Present a Dialog instance for this pool
   * @param {string} title      The title of the roll request
   * @param {string} flavor     Any flavor text attached to the roll
   * @param {boolean} request   Display the request tray
   * @param {string} rollMode   The requested roll mode
   * @returns {Promise<{roll:StandardCheck, rollMode: string}|null>}
   */
  async dialog({title, flavor, request, rollMode}={}) {
    return this.constructor.dialogClass.prompt({
      window: {title},
      flavor,
      request,
      rollMode,
      roll: this
    });
  }

  /* -------------------------------------------- */

  /**
   * Construct a StandardCheck instance from a CrucibleAction which involves dice rolls.
   * @param {CrucibleAction} action   The action from which to construct the check
   * @returns {StandardCheck}         The constructed check instance
   */
  static fromAction(action) {
    let {boons, banes, bonuses} = action.usage;
    return new this({boons, banes, ...bonuses});
  }

  /* -------------------------------------------- */
  /*  Saving and Loading                          */
  /* -------------------------------------------- */

  /** @inheritdoc */
  toJSON() {
    const data = super.toJSON();
    data.data = foundry.utils.deepClone(this.data);
    return data;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async toMessage(messageData, options={}) {
    options.rollMode = options.rollMode || this.data.rollMode;
    messageData.content ||= "";
    this.#addDiceSoNiceEffects();
    return super.toMessage(messageData, options);
  }

  /* -------------------------------------------- */

  /**
   * Augment the Roll with custom DiceSoNice module effects.
   */
  #addDiceSoNiceEffects() {
    for ( const die of this.dice ) {
      if ( die.faces > 8 ) die.options.sfx = {
        specialEffect: "PlayAnimationBright",
        options: {muteSound: true}
      };
      if ( die.faces < 8 ) die.options.sfx = {
        specialEffect: "PlayAnimationDark",
        options: {muteSound: true}
      };
    }
  }

  /* -------------------------------------------- */
  /*  Socket Interactions                         */
  /* -------------------------------------------- */

  /**
   * Dispatch a request to perform a roll
   * @param {string} title      The title of the roll request
   * @param {string} flavor     Any flavor text attached to the roll
   * @param {User} user         The user making the request
   * @param {User} actorId      The actor ID for whom the check is being requested (defaults to the current roll actor)
   */
  request({user, title, flavor, actorId}={}) {
    const data = foundry.utils.deepClone(this.data);
    if ( actorId ) data.actorId = actorId;
    return user.query('rollSkillRequest', {title, flavor, check: data});
  }

  /* -------------------------------------------- */

  /**
   * Handle a request to roll a standard check
   * @param {string} title              The title of the roll request
   * @param {string} flavor             Any flavor text attached to the roll
   * @param {StandardCheckData} check   Data for the handled check request
   */
  static async handle({title, flavor, check}={}) {
    const actor = game.actors.get(check.actorId);
    if ( actor.testUserPermission(game.user, "OBSERVER") ) {
      const pool = new this(check);
      const response = await pool.dialog({title, flavor});
      if ( response === null ) return;
      return pool.toMessage({flavor});
    }
  }
}

StandardCheck.PARTS = ["3d8", "@ability", "@skill", "@enchantment"];
StandardCheck.FORMULA = StandardCheck.PARTS.join(" + ");/**
 * Prompt the user to activate an action which may involve the rolling of a standard dice pool.
 * @extends {StandardCheckDialog}
 */
class ActionUseDialog extends StandardCheckDialog {
  constructor({action, actor, targets, ...options}) {
    super(options);
    this.action = action;
    this.actor = actor;
    this.targets = targets;
    this.#weaponChoice = action.usage.weapon?.id || "";
  }

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["action-roll"],
    position: {
      width: 400
    },
    window: {
      minimizable: true
    },
    actions: {
      placeTemplate: ActionUseDialog.#onPlaceTemplate
    }
  };

  /** @override */
  static TEMPLATE = "systems/crucible/templates/dice/action-use-dialog.hbs";

  /**
   * Track data related to a MeasuredTemplate preview for this Action.
   * @type {{object: MeasuredTemplate, activeLayer: CanvasLayer, minimizedSheets: Application[], config: object}}
   */
  #targetTemplate = {
    activeLayer: undefined,
    document: undefined,
    object: undefined,
    minimizedSheets: [],
    config: undefined,
    targets: undefined
  }

  /**
   * Is a MeasuredTemplate required before this dialog can be submitted?
   * @type {boolean}
   */
  #requiresTemplate = false;

  /**
   * The Action being performed
   * @type {CrucibleAction}
   */
  action;

  /**
   * The Actor performing the action.
   * @type {CrucibleActor}
   */
  actor;

  /**
   * The Tokens which are targeted by the action.
   * @type {CrucibleToken[]}
   */
  targets;

  /**
   * The current weapon choice made by the user
   * @type {string}
   */
  #weaponChoice;

  /* -------------------------------------------- */

  /** @override */
  get title() {
    return `[${this.actor.name}] ${this.action.name}`
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const tags = this._getTags();
    const targetConfig = SYSTEM.ACTION.TARGET_TYPES[this.action.target.type];
    this.#requiresTemplate = !!targetConfig?.template && !this.action.template;
    return foundry.utils.mergeObject(context, {
      action: this.action,
      actor: this.actor,
      tags,
      hasActionTags: !tags.action.empty,
      hasContextTags: !tags.context.empty,
      hasDice: this.action.usage.hasDice ?? false,
      hasTargets: !["self", "none"].includes(this.action.target.type),
      requiresTemplate: this.#requiresTemplate,
      weaponChoice: this.#prepareWeaponChoice(),
      targets: this.#prepareTargets()
    });
  }

  /* -------------------------------------------- */

  /**
   * Prepare the field and value for choosing which weapon to use if the action supports weapon choice.
   * @returns {{field: StringField, value: string}|null}
   */
  #prepareWeaponChoice() {
    if ( !this.action.allowWeaponChoice ) return null;
    const {mainhand: mh, offhand: oh, natural} = this.action.actor.equipment.weapons;
    const choices = {};
    if ( mh ) {
      const mainhandId = mh.id || "mainhandUnarmed";
      choices[mainhandId] = `${mh.name} (${SYSTEM.WEAPON.SLOTS.labels.MAINHAND})`;
    }
    if ( oh ) {
      const offhandId = oh.id || "mainhandUnarmed";
      choices[offhandId] = `${oh.name} (${SYSTEM.WEAPON.SLOTS.labels.OFFHAND})`;
    }
    for ( const n of natural ) {
      choices[n.id] = `${n.name} (${SYSTEM.WEAPON.PROPERTIES.natural.label})`;
    }
    const weapon = new foundry.data.fields.StringField({blank: true, required: true, choices,
      label: "Weapon", hint: "You may choose which weapon to use for this Action."});
    weapon.name = "weapon";
    return {field: weapon, value: this.#weaponChoice};
  }

  /* -------------------------------------------- */

  /**
   *
   * @returns {ActionUseTarget[]}
   */
  #prepareTargets() {
    const targets = this.#targetTemplate.targets ?? this.action.acquireTargets({strict: false});
    for ( const t of targets ) {
      t.cssClass = t.error ? "unmet" : "";
      t.tooltip = t.error ?? null;
    }
    return targets;
  }

  /* -------------------------------------------- */

  /**
   * Get the tags that apply to this dialog.
   * @returns {ActionTags}
   * @protected
   */
  _getTags() {
    return this.action.getTags();
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _onChangeForm(formConfig, event) {
    super._onChangeForm(formConfig, event);
    if ( event.target.name === "weapon" ) {
      const weapons = this.action.actor.equipment.weapons;
      const c = this.#weaponChoice = event.target.value;
      let weapon;
      if ( c === "mainhandUnarmed" ) weapon = weapons.mainhand;
      else if ( c === "offhandUnarmed" ) weapon = weapons.offhand;
      else weapon = this.action.actor.items.get(c);
      this.action.usage.weapon = weapon;
      this.action.reset();
      this.render();
    }
  }

  /* -------------------------------------------- */

  /**
   * Resolve dialog submission to enact a Roll.
   * @returns {StandardCheck}
   * @protected
   */
  _onRoll(_event, _button, _dialog) {
    this.action.usage.rollMode = this.rollMode;
    if ( "special" in this.roll.data.boons ) this.action.usage.boons.special = this.roll.data.boons.special;
    if ( "special" in this.roll.data.banes ) this.action.usage.banes.special = this.roll.data.banes.special;
    return this.action;
  }

  /* -------------------------------------------- */
  /*  Target Management                           */
  /* -------------------------------------------- */

  /**
   * Respond when the set of User Targets changes by re-rendering currently visible action use apps.
   */
  static debounceChangeTarget = foundry.utils.debounce(() => {
    for ( const app of foundry.applications.instances.values() ) {
      if ( app instanceof ActionUseDialog ) app.render();
    }
  }, 20);

  /* -------------------------------------------- */
  /*  Measured Template Management                */
  /* -------------------------------------------- */

  /**
   * Handle left-click events to begin the template targeting workflow
   * @this {ActionUseDialog}
   * @param {Event} event
   * @returns {Promise<void>}
   */
  static async #onPlaceTemplate(event) {

    // Deactivate any previous template preview
    this.#deactivateTemplate(event);

    // Reference required data
    const {range, token, target} = this.action;
    const targetConfig = SYSTEM.ACTION.TARGET_TYPES[target.type]?.template;
    if ( !targetConfig ) return;
    const activeLayer = canvas.activeLayer;

    // TODO find a better place for this?
    if ( (target.type === "summon") && this.action.usage.summons.length ) {
      const summon1 = await fromUuid(this.action.usage.summons[0].actorUuid);
      if ( summon1 ) target.size = summon1.size;
    }

    // Create a temporary Measured Template document and PlaceableObject
    const templateData = await this.#getTemplateData(token.object, range, target, targetConfig);
    const template = await canvas.templates._createPreview(templateData, {renderSheet: false});
    template.document._object = template; // FIXME this is a bit of a hack

    // Minimize open windows
    const minimizedWindows = [];
    for ( const app of Object.values(ui.windows) ) {
      if ( !app.minimized ) {
        app.minimize();
        minimizedWindows.push(app);
      }
    }
    for ( const app of foundry.applications.instances.values() ) {
      if ( !app.minimized ) {
        app.minimize();
        minimizedWindows.push(app);
      }
    }

    // Store preview template data
    this.#targetTemplate = {
      activeLayer,
      config: Object.assign({}, targetConfig, target),
      document: template.document,
      object: template,
      origin: {x: template.document.x, y: template.document.y},
      minimizedWindows
    };
    this.#activateTemplate(template);
  }

  /* -------------------------------------------- */

  /**
   * Prepare Measured Template data for a certain candidate action
   */
  #getTemplateData(token, range, target, targetTemplateConfig) {
    const {x, y} = token?.center ?? canvas.dimensions.rect.center;
    const {id: userId, color: fillColor} = game.user;

    // Prepare Template Data
    let maxRange = range.maximum ?? 0;
    let addRange = 0;
    if ( token && targetTemplateConfig.addSize ) addRange = (token.actor.size / 2);
    const templateData = {user: userId, x, y, fillColor, ...targetTemplateConfig};

    // Shape Specific Overrides
    switch ( targetTemplateConfig.t ) {
      case "circle":
        templateData.distance = (target.size ?? maxRange) + addRange;
        break;
      case "cone":
        templateData.distance = (target.size ?? maxRange) + addRange;
        break;
      case "ray":
        templateData.distance = maxRange + addRange;
        templateData.width = target.size ?? targetTemplateConfig.width;
        break;
      case "rect":
        templateData.distance = Math.sqrt(2) * ((target.size ?? 1) + addRange);
        break;
    }
    return templateData;
  }

  /* -------------------------------------------- */

  /**
   * Register interactivity for the preview template placement
   */
  #activateTemplate() {
    this.#targetTemplate.events = {
      contextmenu: this.#cancelTemplate.bind(this),
      mousedown: this.#confirmTemplate.bind(this),
      mousemove: this.#moveTemplate.bind(this),
    };
    canvas.stage.on("mousemove", this.#targetTemplate.events.mousemove);
    canvas.stage.on("mousedown", this.#targetTemplate.events.mousedown);
    canvas.app.view.addEventListener("contextmenu", this.#targetTemplate.events.contextmenu);
  }

  /* -------------------------------------------- */

  /**
   * Deactivate the preview template placement workflow.
   * @param {Event} event     An initiating event that leads to workflow deactivation
   */
  #deactivateTemplate(event) {
    const {document, object, events, activeLayer} = this.#targetTemplate;
    if ( !object ) return;
    canvas.templates._onDragLeftCancel(event);
    document._object = object; // FIXME workaround

    // Deactivate mouse events
    canvas.stage.off("mousemove", events.mousemove);
    canvas.stage.off("mousedown", events.mousedown);
    canvas.app.view.removeEventListener("contextmenu", events.contextmenu);

    // Restore the original canvas layer
    activeLayer.activate(event);

    // Maximize prior UI windows
    for ( const app of this.#targetTemplate.minimizedWindows ) app.maximize();
  }

  /* -------------------------------------------- */

  /**
   * Cancel the template placement workflow on right-click.
   * @param {Event} event     The contextmenu event
   */
  #cancelTemplate(event) {
    event.preventDefault();
    this.#deactivateTemplate(event);
  }

  /* -------------------------------------------- */

  /**
   * Conclude the template placement workflow on left-click.
   * @param {Event} event     The mousedown event
   */
  #confirmTemplate(event) {
    event.stopPropagation();
    this.action.template = this.#targetTemplate.document;
    const targets = this.#targetTemplate.targets = this.action.acquireTargets({strict: false});
    if ( targets.length ) {
      for ( const [i, {token}] of targets.entries() ) {
        token.setTarget(true, {releaseOthers: i === 0, groupSelection: i < targets.length - 1});
      }
    } else game.user.targets.clear();
    this.#deactivateTemplate(event);
    this.render();
  }

  /* -------------------------------------------- */

  /**
   * Move the position of the template during mousemove
   * @param {Event} event     The mousemove event
   */
  #moveTemplate(event) {
    event.stopPropagation();
    const {config, moveTime, object, origin} = this.#targetTemplate;
    const s = canvas.dimensions.size;
    const update = {};

    // Apply a 16ms throttle
    const now = Date.now();
    if ( now - (moveTime || 0) <= 16 ) return;
    this.#targetTemplate.moveTime = now;

    // Identify the mouse cursor position
    let cursor = event.getLocalPosition(canvas.templates);
    const ray = new Ray(origin, {x: cursor.x, y: cursor.y});
    if ( Number.isNumeric(config.distance) ) {
      const maxDistance = (config.distance * s);
      if ( ray.distance > maxDistance ) cursor = ray.project((config.distance * s) / ray.distance);
    }

    // Identify the resulting template coordinates
    let p;
    if ( config.anchor === "vertex" ) p = canvas.grid.getTopLeftPoint(cursor);
    else if ( config.anchor === "center" ) p = canvas.grid.getCenterPoint(cursor);
    if ( p !== undefined ) Object.assign(update, p);

    // Update the pending template and re-render
    if ( config.directionDelta ) update.direction = Math.toDegrees(ray.angle).toNearest(config.directionDelta);
    object.document.updateSource(update);
    object.renderFlags.set({refresh: true});
  }

  /* -------------------------------------------- */

  /**
   * Expose an internal method that subclasses can use to clear a target template.
   * @internal
   */
  _clearTargetTemplate() {
    if ( this.action.template ) {
      this.#targetTemplate = {};
      this.action.template = null;
      game.user.targets.clear();
    }
  }
}/**
 * @typedef {StandardCheckData} AttackRollData
 * @param {string} [itemId]                   The id of the Item being used to make the attack
 * @param {string} [defenseType=physical]     The defense type being attacked, a value in SYSTEM.DEFENSES
 * @param {number} [result]                   The result code in AttackRoll.RESULT_TYPES, undefined before evaluation
 * @param {DamageData} [damage]               The resolved damage of the roll, undefined before evaluation
 */

/**
 * @typedef {Object} DamageData
 * @property {number} overflow                The attack check result in excess of the defense threshold
 * @property {number} multiplier              The overflow multiplier value
 * @property {number} base                    The base damage amount
 * @property {number} bonus                   An additive damage bonus
 * @property {number} resistance              A subtracted resistance threshold
 * @property {string} type                    The type of damage
 * @property {number} [resource]              The resource targeted
 * @property {boolean} [restoration]          Is this damage applied as restoration?
 */

/**
 * A special case of the 3d8 dice pool that is used to make attacks against a target defense value.
 * @extends {StandardCheck}
 *
 * @param {string|StandardCheckData} formula  This parameter is ignored
 * @param {StandardCheckData} [data]          An object of roll data, containing the following optional fields
 */
class AttackRoll extends StandardCheck {

  /** @override */
  static defaultData = foundry.utils.mergeObject(StandardCheck.defaultData, {
    target: undefined,
    defenseType: "physical",
    result: undefined,
    damage: undefined,
    index: undefined,
    newTarget: false  // TODO it would be good to handle this a different way
  });

  /**
   * Which Dialog subclass should display a prompt for this Roll type?
   * @type {ActionUseDialog}
   */
  static dialogClass = ActionUseDialog;

  /**
   * The possible result types which can occur from an attack roll
   * @enum {number}
   */
  static RESULT_TYPES = {
    MISS: 0,
    DODGE: 1,
    PARRY: 2,
    BLOCK: 3,
    ARMOR: 4,
    RESIST: 5,
    GLANCE: 6,
    HIT: 7
  };

  /**
   * The localization labels used for each result in RESULT_TYPES
   * @enum {string}
   */
  static RESULT_TYPE_LABELS = {
    [this.RESULT_TYPES.MISS]: "ATTACK.RESULT_TYPES.MISS",
    [this.RESULT_TYPES.DODGE]: "ATTACK.RESULT_TYPES.DODGE",
    [this.RESULT_TYPES.PARRY]: "ATTACK.RESULT_TYPES.PARRY",
    [this.RESULT_TYPES.BLOCK]: "ATTACK.RESULT_TYPES.BLOCK",
    [this.RESULT_TYPES.ARMOR]: "ATTACK.RESULT_TYPES.ARMOR",
    [this.RESULT_TYPES.RESIST]: "ATTACK.RESULT_TYPES.RESIST",
    [this.RESULT_TYPES.GLANCE]: "ATTACK.RESULT_TYPES.GLANCE",
    [this.RESULT_TYPES.HIT]: "ATTACK.RESULT_TYPES.HIT",
  }

  /**
   * The overflow damage amount produced by this attack roll
   * @returns {number}
   */
  get overflow() {
    return this.total - this.data.dc;
  }

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /** @inheritdoc */
  async _prepareChatRenderContext({flavor, isPrivate=false}={}) {
    const cardData = await super._prepareChatRenderContext();
    cardData.cssClass += ` ${this.#getResultClass()}`;

    // Target
    if ( this.data.target ) {
      const target = fromUuidSync(this.data.target);
      cardData.target = {uuid: this.data.target, name: target?.name ?? "Unknown"};
    }

    // Defense label
    const dt = this.data.defenseType;
    if ( dt in SYSTEM.DEFENSES ) cardData.defenseType = SYSTEM.DEFENSES[dt].label;
    else if ( dt in SYSTEM.SKILLS ) cardData.defenseType = SYSTEM.SKILLS[dt].label;
    else cardData.defenseType = "DC";

    // Outcome label
    cardData.outcome = game.i18n.localize(this.constructor.RESULT_TYPE_LABELS[this.data.result]);

    // Damage type
    const damage = this.data.damage || {};
    damage.display = (damage.total > 0) || Number.isNumeric(damage.overflow);
    if ( damage.display ) {
      cardData.damageLabel = game.i18n.localize(damage.restoration ? "DICE.Healing" : "DICE.Damage");
      cardData.baseLabel = game.i18n.format("DICE.DamageBase", {type: cardData.damageLabel});
      if ( damage.restoration ) cardData.damageType = SYSTEM.RESOURCES[damage.resource].label;
      else if ( damage.type ) cardData.damageType = SYSTEM.DAMAGE_TYPES[damage.type].label;
    }
    cardData.hasMultiplier = damage?.multiplier !== 1;
    return cardData;
  }

  /* -------------------------------------------- */

  /**
   * Get the attack roll result CSS class.
   * @returns {string}
   */
  #getResultClass() {
    const results = this.constructor.RESULT_TYPES;
    const result = Object.entries(results).find(e => e[1] === this.data.result);
    if ( (result[1] === results.GLANCE) && !this.data.damage.total )  return "miss";
    else return result[0].toLowerCase();
  }
}/**
 * An Item subclass which handles system specific logic for the Item document type.
 */
class CrucibleItem extends foundry.documents.Item {

  /* -------------------------------------------- */
  /*  Item Attributes                             */
  /* -------------------------------------------- */

  /**
   * If this item belongs to a configured category, report the category identifier.
   * @returns {string}
   */
  get category() {
    return this.system.config?.category?.id || "";
  }

  /**
   * Item-specific configuration data which is constructed before any additional data preparation steps.
   * @type {object}
   */
  get config() {
    return this.system.config;
  }

  /**
   * An array of actions that this Item provides.
   * @type {CrucibleAction[]}
   */
  get actions() {
    return this.system.actions;
  }

  /**
   * Current talent rank for this Item
   * @type {TalentRankData}
   */
  get rank() {
    return this.system.currentRank;
  }

  /* -------------------------------------------- */
  /*  Database Workflows                          */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);

    // Create Identifier
    if ( this.system.schema?.has("identifier") && !data.system?.identifier ) {
      this.system.updateSource({"identifier": crucible.api.methods.generateId(this.name ?? this._id)});
    }

    // Handle Owned Item Creation
    if ( this.isOwned ) {
      switch (data.type) {
        case "ancestry":
          if ( this.parent.type === "hero" ) await this.parent.system.applyAncestry(this);
          return false;   // Prevent creation
        case "archetype":
          if ( this.parent.type === "adversary" ) await this.parent.system.applyArchetype(this);
          return false;   // Prevent creation
        case "background":
          if ( this.parent.type === "hero" ) await this.parent.system.applyBackground(this);
          return false;   // Prevent creation
        case "spell":
          try {
            this.parent.canLearnIconicSpell(this);
          } catch(err) {
            return false;
          }
          options.keepId = true;
          break;
        case "talent":
          options.keepId = true;
          options.keepEmbeddedIds = true;
          break;          // Allow creation
        case "taxonomy":
          if ( this.parent.type === "adversary" ) await this.parent.system.applyTaxonomy(this);
          return false;   // Prevent creation
      }
    }
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _onUpdate(data, options, userId) {
    this._displayScrollingStatus(data);
    return super._onUpdate(data, options, userId);
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Provide an array of detail tags which are shown in each item description
   * @param {string} [scope="full"]       The scope of tags being retrieved, "full" or "short"
   * @returns {Record<string, string>}    The tags which describe this Item
   */
  getTags(scope="full") {
    return this.system.getTags?.(scope) || {};
  }

  /* -------------------------------------------- */

  /**
   * Render the Item as HTML for tooltip card display, if supported by its item type subclass.
   * @returns {Promise<string>}
   */
  async renderCard() {
    if ( this.system.renderCard instanceof Function ) return this.system.renderCard();
    return "";
  }

  /* -------------------------------------------- */

  /**
   * Render the Item as HTML for inline display, if supported by its item type subclass.
   * @returns {Promise<string>}
   */
  async renderInline() {
    if ( this.system.renderInline instanceof Function ) return this.system.renderInline();
    return "";
  }

  /* -------------------------------------------- */

  /**
   * Display changes to the Item as scrolling combat text.
   * @private
   */
  _displayScrollingStatus(changed) {
    if ( !this.isOwned ) return;
    if ( !["armor", "weapon"].includes(this.type) ) return;
    const tokens = this.actor.getActiveTokens(true);

    // Equipment changes
    if ( changed.system?.equipped !== undefined ) {
      const text = `${changed.system.equipped ? "+" : "-"}(${this.name})`;
      for ( let token of tokens ) {
        canvas.interface.createScrollingText(token.center, text, {
          anchor: CONST.TEXT_ANCHOR_POINTS.CENTER,
          direction: CONST.TEXT_ANCHOR_POINTS[changed.system.equipped ? "TOP" : "BOTTOM"],
          fontSize: 36,
          stroke: 0x000000,
          strokeThickness: 4
        });
      }
    }
  }
}const {api: api$3} = foundry.applications;

/**
 * A configuration application used to configure an Action inside a Talent.
 * This application is used to configure an Action that is owned by an Item.
 * @extends {DocumentSheetV2}
 * @mixes {HandlebarsApplication}
 */
class CrucibleActionConfig extends api$3.HandlebarsApplicationMixin(api$3.DocumentSheetV2) {
  constructor({action, ...options}={}) {
    const document = action.item;
    if ( !(document instanceof CrucibleItem) ) {
      throw new Error("You may only use the CrucibleActionConfig sheet to configure an Action that belongs to an Item.");
    }
    super({document, ...options});
    this.action = action;
    this.talent = action.parent; // TODO is this right? What about actions on Weapons?
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["crucible", "action", "standard-form"],
    tag: "form",
    position: {width: 600, height: "auto"},
    actions: {
      addEffect: CrucibleActionConfig.#onAddEffect,
      deleteEffect: CrucibleActionConfig.#onDeleteEffect,
      addHook: CrucibleActionConfig.#onAddHook,
      deleteHook: CrucibleActionConfig.#onDeleteHook
    },
    form: {
      submitOnChange: true
    },
    sheetConfig: false
  };

  /**
   * A template partial used for rendering an Active Effect inside an Action.
   * @type {string}
   */
  static ACTIVE_EFFECT_PARTIAL = "systems/crucible/templates/sheets/action/effect.hbs";

  /**
   * A template partial used for rendering a Hook inside an Action.
   * @type {string}
   */
  static HOOK_PARTIAL = "systems/crucible/templates/sheets/action/hook.hbs";

  /** @override */
  static PARTS = {
    header: {
      id: "header",
      template: "systems/crucible/templates/sheets/action/header.hbs",
    },
    tabs: {
      id: "tabs",
      template: "templates/generic/tab-navigation.hbs"
    },
    description: {
      id: "description",
      template: "systems/crucible/templates/sheets/action/description.hbs",
    },
    usage: {
      id: "usage",
      template: "systems/crucible/templates/sheets/action/usage.hbs",
    },
    target: {
      id: "target",
      template: "systems/crucible/templates/sheets/action/target.hbs",
    },
    effects: {
      id: "effects",
      template: "systems/crucible/templates/sheets/action/effects.hbs",
      templates: [CrucibleActionConfig.ACTIVE_EFFECT_PARTIAL]
    },
    hooks: {
      id: "hooks",
      template: "systems/crucible/templates/sheets/action/hooks.hbs",
      templates: [CrucibleActionConfig.HOOK_PARTIAL]
    }
  };

  /**
   * Define the structure of tabs used by this Action Sheet.
   * @type {Record<string, Array<Record<string, ApplicationTab>>>}
   */
  static TABS = {
    sheet: [
      {id: "description", group: "sheet", icon: "fa-solid fa-book", label: "ACTION.TABS.DESCRIPTION"},
      {id: "usage", group: "sheet", icon: "fa-solid fa-cogs", label: "ACTION.TABS.USAGE"},
      {id: "target", group: "sheet", icon: "fa-solid fa-bullseye", label: "ACTION.TABS.TARGET"},
      {id: "effects", group: "sheet", icon: "fa-solid fa-hourglass-clock", label: "ACTION.TABS.EFFECTS"},
      {id: "hooks", group: "sheet", icon: "fa-solid fa-code", label: "ACTION.TABS.HOOKS"}
    ]
  }

  /** @override */
  tabGroups = {
    sheet: "description"
  };

  /* -------------------------------------------- */
  /** @override */
  get title() {
    return `${game.i18n.localize("ACTION.SHEET.TITLE")}: ${this.action.name}`;
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preRender(context, options) {
    await super._preRender(context, options);
    const hookPartial = await foundry.applications.handlebars.getTemplate(this.constructor.HOOK_PARTIAL);
    Handlebars.registerPartial(this.constructor.HOOK_PARTIAL, hookPartial, {preventIndent: true});
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(_options) {
    const action = this.action.toObject();
    action.name ||= this.document.name;
    action.img ||= this.document.img;
    const disableHooks = !game.user.isGM;
    return {
      action,
      editable: this.isEditable,
      actionHookChoices: Object.entries(SYSTEM.ACTION_HOOKS).reduce((obj, [k, v]) => {
        if ( !v.deprecated ) obj[k] = k;
        return obj;
      }, {}),
      disableHooks,
      actionHooksHTML: await this.#renderActionHooksHTML(disableHooks),
      fields: this.action.constructor.schema.fields,
      tabs: this.#prepareTabs().sheet,
      headerTags: this.action.tags.map(t => SYSTEM.ACTION.TAGS[t]),
      tags: this.#prepareTags(),
      targetTypes: SYSTEM.ACTION.TARGET_TYPES,
      targetScopes: SYSTEM.ACTION.TARGET_SCOPES.choices,
      effectsHTML: await this.#renderEffectsHTML(),
      hookPartial: CrucibleActionConfig.HOOK_PARTIAL
    }
  }

  /* -------------------------------------------- */

  /**
   * Configure the tabs used by this sheet.
   * @returns {Record<string, Record<string, ApplicationTab>>}
   */
  #prepareTabs() {
    const tabs = {};
    for ( const [groupId, config] of Object.entries(this.constructor.TABS) ) {
      const group = {};
      for ( const t of config ) {
        const active = this.tabGroups[t.group] === t.id;
        group[t.id] = Object.assign({active, cssClass: active ? "active" : ""}, t);
      }
      tabs[groupId] = group;
    }
    if ( !game.user.isGM ) delete tabs.sheet.hooks;
    return tabs;
  }

  /* -------------------------------------------- */

  /**
   * Prepare tag options and selections for the Action.
   * @returns {FormSelectOption[]>}
   */
  #prepareTags() {
    const tags = [];
    for ( const t of Object.values(SYSTEM.ACTION.TAGS) ) {
      if ( t.internal ) continue;
      const cat = SYSTEM.ACTION.TAG_CATEGORIES[t.category];
      const group = cat?.label;
      const selected = this.action.tags.has(t.tag);
      tags.push({value: t.tag, label: t.label, group, selected});
    }
    return tags;
  }

  /* -------------------------------------------- */

  /**
   * Render HTML used for the action hooks tab.
   * We do this rendering in JavaScript and pass the rendered string into the template to avoid the undesirable
   * auto-indenting caused by rendering this normally as a Handlebars Partial.
   * See https://github.com/handlebars-lang/handlebars.js/issues/858
   * @returns {Promise<string>}
   */
  async #renderActionHooksHTML(disableHooks) {
    const hookHTML = [];
    for ( const [i, h] of this.action.actionHooks.entries() ) {
      const cfg = SYSTEM.ACTION_HOOKS[h.hook];
      const label = this.#getHookLabel(h.hook, cfg);
      const ctx = {i, hook: {label, ...h}, disableHooks};
      const html = await foundry.applications.handlebars.renderTemplate(this.constructor.HOOK_PARTIAL, ctx);
      hookHTML.push(html);
    }
    return hookHTML.join("");
  }

  /* -------------------------------------------- */

  /**
   * Prepare effects data attached to the action.
   * @returns {Promise<string>}
   */
  async #renderEffectsHTML() {
    const effectHTML = [];
    for ( const [i, e] of this.action.effects.entries() ) {
      const html = await this.#renderEffectHTML(i, e);
      effectHTML.push(html);
    }
    return effectHTML.join("");
  }

  /* -------------------------------------------- */

  /**
   * Render HTML for a single effect.
   * @param {number} i
   * @param {ActiveEffectData} effect
   * @returns {Promise<string>}
   */
  async #renderEffectHTML(i, effect) {
    const ctx = {i, effect, statuses: CONFIG.statusEffects, targetScopes: SYSTEM.ACTION.TARGET_SCOPES.choices};
    return foundry.applications.handlebars.renderTemplate(this.constructor.ACTIVE_EFFECT_PARTIAL, ctx);
  }

  /* -------------------------------------------- */

  #getHookLabel(hookId, cfg) {
    const argLabels = ["this: CrucibleAction", ...cfg.argLabels].join(", ");
    return `${cfg.async ? "async " : ""}${hookId}(${argLabels})`;
  }

  /* -------------------------------------------- */
  /*  Form Submission                             */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _onChangeForm(formConfig, event) {
    if ( !event.target.name ) return;
    return super._onChangeForm(formConfig, event);
  }

  /* -------------------------------------------- */

  /** @override */
  _prepareSubmitData(event, form, formData, updateData) {

    // Construct action update
    const submitData = foundry.utils.expandObject(formData.object);
    submitData.actionHooks = Object.values(submitData.actionHooks || {});
    submitData.effects = Object.values(submitData.effects || {});
    foundry.utils.mergeObject(submitData, updateData);

    // Validate action update
    let actionData;
    try {
      const a = this.action.clone();
      a.updateSource(submitData);
      actionData = a.toObject();
    } catch(err) {
      throw new Error("Invalid Action Update", {cause: err});
    }

    // Return the full action object
    return actionData;
  }

  /* -------------------------------------------- */

  /** @override */
  async _processSubmitData(event, form, submitData) {

    // Prepare actions array
    const actions = this.document.system.toObject().actions;
    const idx = actions.findIndex(a => a.id === this.action.id);
    if ( idx === -1 ) {
      throw new Error(`Action "${this.action.id}" not identified in the actions array for Item "${this.document.id}"`);
    }
    actions[idx] = submitData;

    // Update actions array
    await this.document.update({[`system.actions`]: actions}, {diff: false});
    // Updating the Item has re-constructed the CrucibleAction object
    // For continuity of this sheet instance, we update the source of this.action so we can re-render accordingly.
    this.action = this.document.actions[idx];
    await this.render();
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Add a status effect to the Action.
   * @this {CrucibleActionConfig}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onAddEffect(_event, target) {
    const html = await this.#renderEffectHTML(foundry.utils.randomID(), {
      scope: SYSTEM.ACTION.TARGET_SCOPES.ENEMIES,
      placeholder: this.action.name,
      duration: {
        turns: 1
      },
    });
    const section = target.parentElement;
    section.insertAdjacentHTML("beforeend", html);
    const submit = new Event("submit");
    this.element.dispatchEvent(submit);
  }

  /* -------------------------------------------- */

  /**
   * Delete a status effect from the Action.
   * @this {CrucibleActionConfig}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onDeleteEffect(_event, target) {
    const fieldset = target.closest("fieldset.effect");
    fieldset.remove();
    const submit = new Event("submit");
    this.element.dispatchEvent(submit);
  }

  /* -------------------------------------------- */

  /**
   * Add a new hook function to the Action.
   * @this {ActionConfig}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onAddHook(_event, target) {
    const hookId = target.previousElementSibling.value;
    const html = await foundry.applications.handlebars.renderTemplate(this.constructor.HOOK_PARTIAL, {
      i: foundry.utils.randomID(), // Could be anything
      hook: {
        label: this.#getHookLabel(hookId, SYSTEM.ACTION_HOOKS[hookId]),
        hook: hookId,
        fn: "// Hook code here"
      }
    });
    const section = target.closest("fieldset");
    section.insertAdjacentHTML("beforebegin", html);
    const submit = new Event("submit");
    this.element.dispatchEvent(submit);
  }

  /* -------------------------------------------- */

  /**
   * Delete a hook function from the Action.
   * @this {ActionConfig}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onDeleteHook(_event, target) {
    const hook = target.closest(".hook");
    hook.remove();
    const submit = new Event("submit");
    this.element.dispatchEvent(submit);
  }
}/**
 * @typedef {Object} ActionContext
 * @property {string} label                 A string label providing context info
 * @property {string} icon                  A font awesome icon used to annotate the context
 * @property {Record<string, string>} tags  A record of tags which describe the context
 */

/**
 * @typedef {Object} ActionRange
 * @property {number} [minimum]             A minimum distance in feet at which the action may be used
 * @property {number} [maximum]             A maximum distance in feet at which the action may be used
 * @property {boolean} weapon               Enforce the maximum range of the used weapon
 */

/**
 * @typedef {Object} ActionTarget
 * @property {string} type                  The type of target for the action in ACTION.TARGET_TYPES
 * @property {number} [number]              The number of targets affected or size of target template
 * @property {number} [distance]            The allowed distance between the actor and the target(s)
 * @property {number} [limit]               Limit the effect to a certain number of targets.
 * @property {number} [scope]               The scope of creatures affected by an action
 * @property {MeasuredTemplate} [template]  A temporary template document that helps to identify AOE targets
 */

/**
 * @typedef ActionUsage
 * @property {object} actorStatus           Actor status updates applied when the action is confirmed
 * @property {object} actorUpdates          Other non-status actor data updates applied when this action is confirmed
 * @property {object} actorFlags            Actor flag updates applied when this action is used (not confirmed)
 * @property {Record<string, DiceBoon>} boons  Boons applied to this action
 * @property {Record<string, DiceBoon>} banes  Banes applied to this action
 * @property {DiceCheckBonuses} bonuses     Roll bonuses applied to this action
 * @property {ActionContext} context        Action usage context
 * @property {boolean} hasDice              Does this action involve the rolling a dice check?
 * @property {string} [rollMode]            A dice roll mode to apply to the message
 * @property {string} [defenseType]         A special defense type being targeted
 * @property {string} [skillId]             A skill ID that is being used
 * @property {CrucibleItem} [weapon]        A specific weapon item being used
 * @property {CrucibleItem} [consumable]    A specific consumable item being used
 * @property {boolean} [selfTarget]         Default to self-target if no other targets are selected
 * @property {ActionSummonConfiguration[]} [summons]  Creatures summoned by this action
 */

/**
 * @typedef ActionSummonConfiguration
 * @property {string} actorUuid
 * @property {string} [templateUuid]
 * @property {object} [tokenData={}]
 * @property {boolean} [combatant=true]
 * @property {number} [initiative=1]
 * @property {boolean} [permanent=true]     Is this summoned creature permanent until killed? Otherwise, a corresponding
 *                                          active effect must exist to track its duration.
 */

/**
 * @typedef {Object} ActionCost
 * @property {number} action                The cost in action points
 * @property {number} focus                 The cost in focus points
 * @property {number} [hands]               A number of free hands required
 */

/**
 * @typedef {Object} ActionTags
 * @property {Object<string, string>} activation
 * @property {Object<string, string>} action
 * @property {Object<string, string>} context
 */

/**
 * @typedef {Object} ActionEffect
 * @property {string} [name]
 * @property {number} scope
 * @property {string[]} statuses
 * @property {{rounds: number, turns: number}} [duration]
 */

/**
 * @typedef CrucibleActionOutcome
 * @property {CrucibleActor} target       The outcome target
 * @property {boolean} self               Is this outcome target the action actor?
 * @property {ActionUsage} [usage]        Outcome-specific usage data
 * @property {AttackRoll[]} rolls         Any AttackRoll instances which apply to this outcome
 * @property {object} resources           Resource changes to apply to the target Actor in the form of deltas
 * @property {object} actorUpdates        Data updates to apply to the target Actor
 * @property {object} metadata            Fallback storage for miscellaneous data that persists throughout the action lifecycle
 * @property {ActionEffect[]} effects     ActiveEffect data to create on the target Actor
 * @property {ActionSummonConfiguration[]} [summons]  Creatures summoned by this action
 * @property {boolean} [weakened]         Did the target become weakened?
 * @property {boolean} [broken]           Did the target become broken?
 * @property {boolean} [incapacitated]    Did the target become incapacitated?
 * @property {boolean} [criticalSuccess]  Did the damage contain a Critical Hit
 * @property {boolean} [criticalFailure]  Did the damage contain a Critical Miss
 * @property {object[]} [statusText]      Optional status text displayed above the outcome target
 */

/**
 * @typedef CrucibleActionUsageOptions
 * @property {CrucibleTokenObject} [token]  A specific Token which is performing the action
 * @property {boolean} [dialog]             Present the user with an action configuration dialog?
 * @property {string} [rollMode]            Which roll mode to apply to the resulting message?
 */


/**
 * @typedef CrucibleActionHistoryEntry      A logged Action within the Actor's action history flag
 * @property {string} id                    The Action ID that was performed
 * @property {string|null} messageId        The ChatMessage ID that contains full action details
 * @property {({id: string}|CombatHistoryData)|null} combat The Combat state at the time the action occurred
 */

/**
 * @typedef CrucibleActionData
 */

/**
 * @typedef {Map<CrucibleActor,CrucibleActionOutcome>} CrucibleActionOutcomes
 */

/**
 * An object used to represent a set of tags.
 */
class ActionTagGroup {
  constructor({icon, tooltip}) {
    Object.defineProperties(this, {
      icon: {value: icon},
      tooltip: {value: tooltip}
    });
  }

  get empty() {
    return foundry.utils.isEmpty(this);
  }
}

/* -------------------------------------------- */

/**
 * A special Set that sorts action tags in priority order.
 */
class CrucibleActionTags extends Set {
  constructor(values, action) {
    super();
    this.#action = action;
    if ( values ) {
      for ( const v of values ) this.add(v);
    }
    this.#sorted = [];
    this.#sort();
  }

  /**
   * The action that owns this set of tags.
   * @type {CrucibleAction}
   */
  #action;

  /**
   * The set tags in sorted order.
   * @type {string[]}
   */
  #sorted;

  /** @override */
  *tags() {
    for ( const tag of this.#sorted ) yield SYSTEM.ACTION.TAGS[tag];
  }

  /* -------------------------------------------- */

  #sort() {
    if ( !this.#sorted ) return;
    const TAGS = SYSTEM.ACTION.TAGS;
    this.#sorted = Array.from(this).sort((a, b) => TAGS[a].priority - TAGS[b].priority);
  }

  /* -------------------------------------------- */

  add(value) {
    if ( this.has(value) ) return;
    const tag = SYSTEM.ACTION.TAGS[value];
    if ( !tag ) {
      let msg = `Unrecognized tag "${value}" in Action "${this.#action.id}"`;
      if ( this.#action.actor ) msg += ` for Actor "${this.#action.actor.name}" [${this.#action.actor.uuid}]`;
      console.warn(msg);
      return;
    }
    super.add(value);
    if ( tag.propagate ) {
      for ( const p of tag.propagate ) this.add(p);
    }
    this.#sort();
  }

  /* -------------------------------------------- */

  delete(value) {
    super.delete(value);
    this.#sort();
  }

  /* -------------------------------------------- */

  clear() {
    super.clear();
    this.#sort();
  }
}

/* -------------------------------------------- */

/**
 * The data schema used for an Action within a talent Item
 * @property {string} id                    The action identifier
 * @property {string} name                  The action name
 * @property {string} img                   An image for the action
 * @property {string} condition             An optional condition which must be met in order for the action to be used
 * @property {string} description           Text description of the action
 * @property {ActionRange} range            Range data for the action
 * @property {ActionTarget} target          Target data for the action
 * @property {ActionCost} cost              Cost data for the action
 * @property {Set<string>} tags             A set of tags in ACTION.TAGS which apply to this action
 */
class CrucibleAction extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      id: new fields.StringField({required: true, blank: false}),
      name: new fields.StringField(),
      img: new fields.FilePathField({categories: ["IMAGE"]}),
      condition: new fields.StringField(),
      description: new fields.HTMLField({required: false, initial: undefined}),
      cost: new fields.SchemaField({
        action: new fields.NumberField({required: true, nullable: false, integer: true, initial: 0}),
        focus: new fields.NumberField({required: true, nullable: false, integer: true, initial: 0}),
        heroism: new fields.NumberField({required: true, nullable: false, integer: true, initial: 0}),
        weapon: new fields.BooleanField({initial: false})
      }),
      range: new fields.SchemaField({
        minimum: new fields.NumberField({required: true, nullable: true, integer: true, min: 1, initial: null}),
        maximum: new fields.NumberField({required: true, nullable: true, integer: true, min: 1, initial: null}),
        weapon: new fields.BooleanField({initial: false})
      }),
      target: new fields.SchemaField({
        type: new fields.StringField({required: true, choices: SYSTEM.ACTION.TARGET_TYPES, initial: "single"}),
        number: new fields.NumberField({required: true, nullable: false, integer: true, min: 0, initial: 1}),
        size: new fields.NumberField({required: false, nullable: false, integer: true, min: 1, initial: undefined}),
        multiple: new fields.NumberField({required: false, nullable: false, integer: true, min: 1, initial: undefined}),
        scope: new fields.NumberField({required: true, initial: SYSTEM.ACTION.TARGET_SCOPES.ALL,
          choices: SYSTEM.ACTION.TARGET_SCOPES.choices}),
        limit: new fields.NumberField({required: false, nullable: false, initial: undefined, integer: true, min: 1}),
        self: new fields.BooleanField()
      }),
      effects: new fields.ArrayField(new fields.ObjectField()),
      tags: new fields.SetField(new fields.StringField({required: true, blank: false})),
      actionHooks: new fields.ArrayField(new fields.SchemaField({
        hook: new fields.StringField({required: true, blank: false, choices: SYSTEM.ACTION_HOOKS}),
        fn: new fields.JavaScriptField({async: true, gmOnly: true})
      }))
    }
  }

  /**
   * A set of localization prefix paths which are used by this data model.
   * @type {string[]}
   */
  static LOCALIZATION_PREFIXES = ["ACTION"];

  /**
   * The Handlebars template used to render this Action as a line item for tooltips or as a partial.
   * @type {string}
   */
  static TOOLTIP_TEMPLATE = "systems/crucible/templates/tooltips/tooltip-action.hbs";

  /**
   * Configure the Dialog class that provides the user with an interface to configure this Action.
   * @type {typeof ActionUseDialog}
   */
  static dialogClass = ActionUseDialog;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The specific Actor to whom this Action is bound. May be undefined if the Action is unbound.
   * @type {CrucibleActor}
   */
  actor = this.actor; // Defined during constructor

  /**
   * The specific Item which contributed this Action. May be undefined if the Action did not originate from an Item.
   * @type {CrucibleItem}
   */
  item = this.item; // Defined during constructor

  /**
   * A specific Token that is performing this Action in the context of a Scene.
   * @type {CrucibleToken}
   */
  token = this.token; // Defined during constructor

  /**
   * A temporary MeasuredTemplate object used to establish targets for this action.
   * @type {MeasuredTemplateDocument|null}
   */
  template = this.template; // Defined during constructor

  /**
   * A mapping of outcomes which occurred from this action, arranged by target.
   * @type {CrucibleActionOutcomes}
   */
  outcomes = new Map();

  /**
   * A sheet used to configure this Action.
   * @returns {*}
   */
  get sheet() {
    this.#sheet ||= new CrucibleActionConfig({action: this});
    return this.#sheet;
  }

  #sheet;

  /**
   * Has this action been prepared for a given Actor to use?
   * @internal
   */
  _prepared = this._prepared ?? false;

  /**
   * Is this Action a favorite of the Actor which owns it?
   * @type {boolean}
   */
  get isFavorite() {
    return this.actor?.system.favorites.has(this.id);
  }

  /**
   * Does this Action require a Template target
   * @type {boolean}
   */
  get requiresTemplate() {
    return !!SYSTEM.ACTION.TARGET_TYPES[this.target.type]?.template;
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * One-time configuration of the CrucibleAction as part of construction.
   * @param {object} [options]            Options passed to the constructor context
   * @param {CrucibleActor} [options.actor]   A specific Actor to whom this Action is bound
   * @param {CrucibleItem} [options.item]     A specific Item that provided this Action
   * @param {MeasuredTemplateDocument} [options.template] A specific MeasuredTemplate that belongs to this Action
   * @param {CrucibleTokenObject} [options.token]  A specific token performing this Action
   * @param {ActionUsage} [options.usage]     Pre-configured action usage data
   * @inheritDoc */
  _configure({actor=null, item=null, template=null, token=null, usage={}, ...options}) {
    super._configure(options);
    Object.defineProperty(this, "actor", {value: actor, writable: false, configurable: true});
    Object.defineProperty(this, "item", {value: item ?? this.parent?.parent, writable: false, configurable: true});
    Object.defineProperty(this, "token", {value: token, writable: false, configurable: true});
    this.template = template instanceof foundry.documents.MeasuredTemplateDocument ? template : null;

    /**
     * Dice roll bonuses which modify the usage of this action.
     * Usage data is *shared* across all clones of the same Action owned by a certain Actor.
     * This object is only initialized once and retained through future initialization workflows.
     * @type {ActionUsage}
     */
    Object.defineProperty(this, "usage", {value: foundry.utils.mergeObject(usage, {
      actorFlags: {},
      actorStatus: {},
      actorUpdates: {},
      bonuses: {ability: 0, skill: 0, enchantment: 0, damageBonus: 0, multiplier: 1},
      boons: {},
      banes: {},
      context: {label: undefined, icon: undefined, tags: {}},
      isAttack: false,
      isRanged: false,
      isMelee: false,
      hasDice: false
    }, {inplace: true, overwrite: false})});
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _initialize(options={}) {
    super._initialize(options);

    // Prepare base data
    this._prepareData();

    /**
     * Configured hook functions invoked by the action.
     * @type {Readonly<Record<string, AsyncFunction|Function>>}
     */
    Object.defineProperty(this, "hooks", {
      value: CrucibleAction.#prepareHooks(this.id, this.actionHooks),
      configurable: true
    });

    // Prepare action for actor
    if ( !options.lazy ) this.prepare();
  }

  /* -------------------------------------------- */

  /**
   * Prepare Hook functions for this Action.
   * @param {string} actionId
   * @param {string[]} inlineHooks
   * @returns {Record<string, AsyncFunction|Function>}
   */
  static #prepareHooks(actionId, inlineHooks) {
    const hooks = {};

    // Inline script hooks
    for ( const {hook, fn} of inlineHooks ) {
      const config = SYSTEM.ACTION_HOOKS[hook];
      if ( config.deprecated ) {
        console.warn(`Deprecated Action hook "${hook}" used by Action "${actionId}"`);
        continue;
      }      const fnClass = config.async ? foundry.utils.AsyncFunction : Function;
      if ( config ) hooks[hook] = new fnClass(...config.argNames, fn);
      else console.warn(`Invalid Action hook "${hook}" defined by Action "${actionId}"`);
    }

    // Pre-configured module hooks
    const cfg = crucible.api.hooks.action[actionId];
    if ( cfg ) {
      for ( const hookName in SYSTEM.ACTION_HOOKS ) {
        if ( cfg[hookName] instanceof Function ) hooks[hookName] = cfg[hookName];
      }
    }
    return Object.freeze(hooks);
  }

  /* -------------------------------------------- */

  /**
   * Prepare data for the Action.
   * @protected
   */
  _prepareData() {
    const talent = this.item;
    if ( talent ) {
      this.name ||= talent.name;
      this.img ||= talent.img;
      if ( !this.description && this.parent ) this.description = this.parent.description.public;
    }

    // Propagate and sort tags
    this.tags = new CrucibleActionTags(this._source.tags, this);

    // Prepare Cost
    this.cost.hands = 0; // Number of free hands required

    // Prepare Effects
    for ( const effect of this.effects ) {
      effect.name ||= this.name;
      effect.img ||= this.img;
      effect.tags = {
        scope: `Affects ${SYSTEM.ACTION.TARGET_SCOPES.label(effect.scope || this.target.scope)}`
      };
      if ( effect.duration ) {
        if ( effect.duration.turns ) effect.tags.duration = `${effect.duration.turns}T`;
        else if ( effect.duration.rounds ) effect.tags.duration = `${effect.duration.rounds}R`;
        else effect.tags.duration = "Until Ended";
      }
    }

    // Reset bonuses
    Object.assign(this.usage.bonuses, {
      ability: 0,
      skill: 0,
      enchantment: 0,
      damageBonus: 0,
      multiplier: 1
    });
  }

  /* -------------------------------------------- */

  /**
   * Bind an existing Action to a specific Actor.
   * This is an alternative to constructing a new Action instance in cases where the existing instance can be reused.
   * @param {CrucibleActor} actor     A specific Actor to whom this Action is bound
   * @returns {CrucibleAction}        This action, for chaining
   */
  bind(actor) {
    Object.defineProperty(this, "actor", {value: actor, writable: false});
    this.reset();
    return this;
  }

  /* -------------------------------------------- */

  /** @override */
  clone(updateData={}, context={}) {
    const actionData = foundry.utils.mergeObject(this.toObject(), updateData, {
      insertKeys: false,
      performDeletions: true,
      inplace: true
    });
    context.parent = this.parent;
    context.usage = this.usage;
    context.actor ??= this.actor;
    context.token ??= this.token;
    context.template ??= this.template;
    const clone = new this.constructor(actionData, context);

    // When cloning a single action, we need to run through "prepareActions" actor hooks on the clone
    if ( this.actor && !context.lazy ) this.actor.callActorHooks("prepareActions", {[clone.id]: clone});
    return clone;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the Action to be used by an Actor.
   * Happens automatically in _initialize unless the document is being constructed lazily.
   */
  prepare() {
    if ( !this.actor ) return;
    this._configureUsage();
    this._prepare();
    this._prepared = true;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  toObject(source) {
    const obj = super.toObject();
    // Preserve final tags
    if ( source === false ) obj.tags = Array.from(this.tags);
    return obj;
  }

  /* -------------------------------------------- */
  /*  Action Execution Methods                    */
  /* -------------------------------------------- */

  /**
   * Display a configuration prompt which customizes the Action usage.
   * @param {object[]} targets            Currently selected targets
   * @returns {Promise<object|null>}      The results of the configuration dialog
   */
  async configureDialog(targets) {
    const roll = StandardCheck.fromAction(this);
    const response = await this.constructor.dialogClass.prompt({
      action: this,
      actor: this.actor,
      roll,
      targets
    });
    return response || null;
  }

  /* -------------------------------------------- */

  /**
   * Configure the outcomes requested for the Action.
   * Invoke the configure Action hook, updating the usage or roll data for each individual outcome.
   * This method is tolerant, it captures errors in hooks and allows the rest of the action workflow to proceed.
   *
   * @param {ActionUseTarget[]} targets       The array of targets designated for the action
   */
  configureOutcomes(targets) {
    this.outcomes.clear();

    // Create outcomes for each target and for self
    for ( const {actor, token} of targets ) {
      const outcome = this.#createOutcome(actor, token?.document || null);
      this.outcomes.set(actor, outcome);
      this.actor._configureActorOutcome(this, outcome);
      actor._configureTargetOutcome(this, outcome);
    }
    if ( !this.outcomes.has(this.actor) ) this.outcomes.set(this.actor, this.#createOutcome(this.actor, this.token));

    // Configure outcomes
    for ( const test of this._tests() ) {
      if ( test.configure instanceof Function ) {
        try {
          test.configure.call(this, targets);
        } catch(err) {
          console.error(new Error(`Failed usage configuration for Action "${this.id}"`, {cause: err}));
        }
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Execute an Action.
   * The action is cloned so that its data may be transformed throughout the workflow.
   * @param {CrucibleActionUsageOptions} [options]    Options which modify action usage
   * @returns {Promise<CrucibleActionOutcomes|undefined>}
   */
  async use({token, ...options}={}) {
    if ( !this._prepared ) throw new Error("A CrucibleAction must be prepared for an Actor before it can be used.");

    // Redirect to spellcasting
    if ( this.id === "cast" ) {
      const spell = crucible.api.models.CrucibleSpellAction.getDefault(this.actor);
      return spell.use({token, ...options});
    }

    // Infer the Token performing the Action
    if ( !token ) {
      let tokens = this.actor.getActiveTokens();
      if ( tokens.length > 1 ) tokens = tokens.filter(t => t.controlled);
      if ( tokens.length === 1 ) token = tokens[0]?.document;
      if ( tokens.length > 1 ) {
        throw new Error(`Multiple tokens controlled for Actor "${this.actor.name}"`);
      }
    }

    // Use a clone of the Action
    const action = this.clone({}, {parent: this.parent, actor: this.actor, token});
    return action.#use(options);
  }

  /* -------------------------------------------- */

  /**
   * Execute the cloned action.
   * @param {object} [options]                      Options which modify action usage
   * @param {boolean} [options.dialog]              Present the user with an action configuration dialog?
   * @param {object} [options.chatMessageOptions]   Options which are passed to Action#toMessage
   * @returns {Promise<CrucibleActionOutcomes|null>}
   */
  async #use({chatMessageOptions={}, dialog=true}={}) {

    // Assert that the action could possibly be used based on its tags
    try {
      this._canUse();
    } catch(err) {
      ui.notifications.warn(err);
      return null;
    }

    // TODO this.usage should be frozen from this point onwards and everything from here onwards uses outcome.usage
    // TODO wrap this.usage as a getter around this.#usage which warns if it is accessed after this point?

    // Acquire initial targets non-strictly and set up initial outcomes
    let targets = this.acquireTargets({strict: false});
    this.configureOutcomes(targets);

    // Prompt for action configuration
    if ( dialog ) {
      const configuration = await this.configureDialog(targets);
      if ( configuration === null ) return null;  // Dialog closed
      try {
        targets = this.acquireTargets({strict: true});  // Re-acquire configured targets, strictly
      } catch(err) {
        ui.notifications.warn(err);
        return null;
      }
      this.configureOutcomes(targets);
    }

    // Pre-execution steps, possibly preventing activation
    try {
      await this._preActivate(targets);
    } catch(err) {
      ui.notifications.warn(err);
      return null;
    }

    // Iterate over designated targets
    for ( const target of targets ) {
      const outcome = this.outcomes.get(target.actor);
      try {
        await this._roll(outcome);
      } catch(err) {
        ui.notifications.warn(err);
        return null;
      }
    }

    // Finalize all outcomes
    for ( const outcome of this.outcomes.values() ) {
      this.#updateOutcome(outcome);
      await this._post(outcome);
      this.#finalizeOutcome(outcome);
    }

    // Create any Measured Template for the action
    if ( this.template ) {
      const templateData = this.template.toObject();
      delete templateData._id;
      const cls = getDocumentClass("MeasuredTemplate");
      this.template = await cls.create(templateData, {parent: canvas.scene});
      await this.template.object.draw();
    }

    // Record action history and create a ChatMessage to confirm the action
    const message = await this.toMessage(targets, {
      ...chatMessageOptions,
      confirmed: false,
      rollMode: this.usage.rollMode
    });

    // Persist action usage flags immediately rather than waiting for action confirmation
    this.#recordActionHistory(message);
    await this.actor.update({"flags.crucible": this.usage.actorFlags});
    return this.outcomes;
  }

  /* -------------------------------------------- */

  /**
   * Record this action usage to action history for the Actor.
   * @param {ChatMessage} message           The created ChatMessage that records the Action
   * @returns {CrucibleActionHistoryEntry}
   */
  #recordActionHistory(message) {
    const lastAction = {
      id: this.id,
      messageId: message?.id || null,
      combat: this.actor.inCombat ? {id: game.combat.id, ...game.combat.current} : null
    };
    const history = (this.actor.flags.crucible?.actionHistory || []).slice(0, 99); // Maximum 100 history items
    history.unshift(lastAction);
    this.usage.actorFlags.actionHistory = history;
    return lastAction;
  }

  /* -------------------------------------------- */

  /**
   * @typedef {Object} ActionUseTarget
   * @property {CrucibleToken} token
   * @property {CrucibleActor} actor
   * @property {string} name
   * @property {string} uuid
   * @property {string} [error]
   */

  /**
   * Acquire the targets for an action activation. For each target track both the Token and the Actor.
   * @param {object} [options]      Options which affect target acquisition
   * @param {boolean} [options.strict]  Validate that targets conform to the allowed number for the action?
   * @returns {ActionUseTarget[]}
   */
  acquireTargets({strict=true}={}) {
    let targets;
    let targetType = this.target.type;
    const targetCfg = SYSTEM.ACTION.TARGET_TYPES[targetType];
    if ( targetType === "summon" ) return [];

    // Acquire Template Targets
    if ( !!targetCfg.template ) {
      targets = canvas.ready ? this.#acquireTargetsFromTemplate() : [];
    }

    // Other Target Types
    else {
      if ( (targetType === "single") && this.target.self && !game.user.targets.some(t => t !== this.token) ) {
        targetType = "self";
      }
      switch ( targetType ) {
        case "none":
          return []
        case "self":
          const tokenTargets = this.actor.getActiveTokens(true).map(CrucibleAction.#getTargetFromToken);
          targets = tokenTargets.length
            ? [tokenTargets[0]]
            : [{actor: this.actor, uuid: this.actor.uuid, name: this.actor.name, token: null}];
          break;
        case "single":
          targets = canvas.ready ? this.#acquireSingleTargets(strict) : [];
          break;
        default:
          ui.notifications.warn(`Automation for target type ${this.target.type} for action ${this.name} is not 
            yet supported, you must manually target affected tokens.`);
          targets = Array.from(game.user.targets).map(CrucibleAction.#getTargetFromToken);
          break;
      }
    }

    // Throw an error if any target had an error
    for ( const target of targets ) {
      if ( target.error && strict ) throw new Error(target.error);
    }
    return targets;
  }

  /* -------------------------------------------- */

  /**
   * Convert a Token into a ActionUseTarget data structure.
   * @param {Token} token
   * @returns {ActionUseTarget}
   */
  static #getTargetFromToken(token) {
    return {token, actor: token.actor, uuid: token.actor.uuid, name: token.name};
  }

  /* -------------------------------------------- */

  /**
   * Acquire target tokens using a temporary measured template.
   * @returns {ActionUseTarget[]}
   */
  #acquireTargetsFromTemplate() {
    const template = this.template;
    if ( !template ) return [];
    const {bounds, shape} = template.object;
    const shapePoly = shape instanceof PIXI.Polygon ? shape : shape.toPolygon();

    // Get targets from quadtree
    const {x, y} = template;
    const targetDispositions = this.#getTargetDispositions();
    const tokens = canvas.tokens.quadtree.getObjects(bounds, {collisionTest: ({t: token}) => {
      if ( token.actor === this.actor ) return false;
      if ( !targetDispositions.includes(token.document.disposition) ) return false;
      const hit = token.getHitRectangle();
      hit.x -= x;
      hit.y -= y;
      const ix = shapePoly.intersectRectangle(hit);
      return ix.points.length > 0;
    }});

    // Convert to target data structure
    const targets = Array.from(tokens).map(CrucibleAction.#getTargetFromToken);

    // Unlimited targets
    if ( !this.target.limit ) return targets;

    // If the target type is limited in the number of enemies it can affect, sort on proximity to the template origin
    for ( const t of targets ) t._distance = new Ray({x, y}, t.token.center).distance;
    targets.sort((a, b) => a._distance - b._distance);
    return targets.slice(0, this.target.limit);
  }

  /* -------------------------------------------- */

  /**
   * Acquire and validate the targets for a Single target action.
   * @param {boolean} strict
   * @returns {ActionUseTarget[]}
   */
  #acquireSingleTargets(strict) {
    const tokens = game.user.targets;
    let errorAll;

    // Too few targets
    if ( tokens.size < 1 ) {
      if ( strict ) throw new Error(game.i18n.format("ACTION.WarningInvalidTarget", {
        number: this.target.number,
        type: this.target.type,
        action: this.name
      }));
      return [];
    }

    // Too many targets
    if ( tokens.size > this.target.number ) {
      errorAll = game.i18n.format("ACTION.WarningIncorrectTargets", {
        number: this.target.number,
        type: this.target.type,
        action: this.name
      });
    }

    // Test each target
    const targets = [];
    for ( const token of tokens ) {
      const t = CrucibleAction.#getTargetFromToken(token);
      if ( errorAll ) t.error = errorAll;
      targets.push(t);
      if ( !this.token ) continue;
      if ( (token === this.token) && !this.damage?.restoration ) {
        t.error = game.i18n.localize("ACTION.WarningCannotTargetSelf");
        continue;
      }
      const range = crucible.api.canvas.grid.getLinearRangeCost(this.token.object, token);
      if ( this.range.minimum && (range < this.range.minimum) ) {
        t.error ||= game.i18n.format("ACTION.WarningMinimumRange", {min: this.range.minimum});
      }
      if ( this.range.maximum && (range > this.range.maximum) ) {
        t.error ||= game.i18n.format("ACTION.WarningMaximumRange", {max: this.range.maximum});
      }
    }
    return targets;
  }

  /* -------------------------------------------- */

  /**
   * Identify whether an action can be auto-confirmed by the Actor (User) who initiated it.
   * Actions are considered to affect another actor if they contain successful rolls or cause effects.
   * @returns {boolean}                           Can it be auto-confirmed?
   */
  canAutoConfirm() {
    const autoConfirm = game.settings.get("crucible", "autoConfirm");

    // No Auto-Confirm or not GM
    if ( !game.user.isGM || !autoConfirm ) return false;

    // All Actions
    if ( autoConfirm === 2 ) return true;

    // Non-Offensive Actions Only
    for ( const outcome of this.outcomes.values() ) {
      if ( outcome.target === this.actor ) continue;
      return false;
    }
    return true;
  }

  /* -------------------------------------------- */

  /**
   * Classify Token dispositions into allied and enemy groups.
   * @returns {{ally: number[], enemy: number[]}}
   */
  #getTargetDispositions() {
    const D = CONST.TOKEN_DISPOSITIONS;
    const S = SYSTEM.ACTION.TARGET_SCOPES;
    const scope = this.target.scope;

    // Some dispositions are universal
    if ( [S.NONE, S.SELF].includes(scope) ) return [];
    if ( S.ALL === scope ) return [D.FRIENDLY, D.NEUTRAL, D.HOSTILE];

    // Determine the Actor's disposition
    let disposition = this.actor.getActiveTokens(true, true)[0]?.disposition ?? this.actor.prototypeToken.disposition;

    // Hostile actors
    if ( disposition === D.HOSTILE ) {
      if ( S.ALLIES === scope ) return [D.HOSTILE];
      else return [D.FRIENDLY, D.NEUTRAL];
    }

    // Non-hostile actors
    if ( S.ALLIES === scope ) return [D.NEUTRAL, D.FRIENDLY];
    else return [D.HOSTILE];
  }

  /* -------------------------------------------- */
  /*  Action Outcome Management                   */
  /* -------------------------------------------- */

  /**
   * Translate the action usage result into an outcome to be persisted.
   * @param {CrucibleActor} actor
   * @param {CrucibleToken} token
   * @returns {CrucibleActionOutcome}
   */
  #createOutcome(actor, token) {
    const outcome = {
      target: actor,
      token: token,
      rolls: [],
      effects: [],
      resources: {},
      actorUpdates: {},
      metadata: {},
      self: actor === this.actor,
      statusText: [],
    };

    // Non-enumerable outcome specific usage
    Object.defineProperty(outcome, "usage", {value: {
      boons: {},
      banes: {}
    }});
    return outcome;
  }

  /* -------------------------------------------- */

  /**
   * Update a target outcome to apply rolls and effects attributed to that outcome.
   * @param {CrucibleActionOutcome} outcome
   */
  #updateOutcome(outcome) {
    if ( outcome.target === this.actor ) return this.#updateSelfOutcome(outcome);
    this.#attachOutcomeEffects(outcome);
  }

  /* -------------------------------------------- */

  #updateSelfOutcome(outcome) {
    const u = outcome.actorUpdates;
    foundry.utils.mergeObject(u, foundry.utils.expandObject(this.usage.actorUpdates));
    u.system ||= {};
    if ( u.system.status ) {
      console.error(`Crucible | "system.status" key present in action.usage.actorUpdates: ${this.name}`);
    }
    u.system.status = Object.assign(u.system.status || {}, {lastAction: this.id},
      foundry.utils.expandObject(this.usage.actorStatus));

    // Attach summons to the self-outcome
    if ( Array.isArray(this.usage.summons) ) outcome.summons = this.usage.summons;

    // Incur resource cost
    for ( const [k, v] of Object.entries(this.cost) ) {
      outcome.resources[k] = (outcome.resources[k] || 0) - v;
    }

    // Determine whether to apply effects
    let applyEffects = Array.from(this.outcomes.keys()).length === 1; // Only self-outcome
    for ( const outcome of this.outcomes.values() ) {
      if ( outcome.target === this.actor ) continue;
      if ( !outcome.rolls.length || outcome.rolls.some(r => r.isSuccess) ) applyEffects = true;
    }
    if ( applyEffects ) this.#attachOutcomeEffects(outcome);
  }

  /* -------------------------------------------- */

  /**
   * Apply the effects caused by an Action to targeted Actors when the result is confirmed.
   * @param {CrucibleActionOutcome} outcome     The outcome being prepared
   * @returns {object[]}                        An array of Active Effect data to attach to the outcome
   */
  #attachOutcomeEffects(outcome) {
    const target = outcome.target;
    const scopes = SYSTEM.ACTION.TARGET_SCOPES;
    for ( let {scope, ...effectData} of this.effects ) {
      scope ??= this.target.scope;
      if ( scope === scopes.NONE ) continue;
      effectData.name ||= this.name;

      // Self target
      if ( target === this.actor ) {
        if ( ![scopes.SELF, scopes.ALL].includes(scope) ) continue;
      }

      // Target other
      else {
        if ( scope === scopes.SELF ) continue;
        if ( outcome.rolls.length && !outcome.rolls.some(r => r.isSuccess) ) continue;
      }

      // Add effect
      const effect = foundry.utils.mergeObject({
        _id: SYSTEM.EFFECTS.getEffectId(this.id),
        description: this.description,
        icon: this.img,
        origin: this.actor.uuid
      }, effectData);
      outcome.effects.push(effect);
    }
  }

  /* -------------------------------------------- */

  /**
   * Apply final flags to the outcome after post-roll workflows have occurred.
   * @param {CrucibleActionOutcome} outcome     The outcome being finalized
   */
  #finalizeOutcome(outcome) {
    for ( const roll of outcome.rolls ) {
      const damage = roll.data.damage || {};
      const resource = damage.resource ?? "health";
      outcome.resources[resource] ??= 0;
      outcome.resources[resource] += (damage.total ?? 0) * (damage.restoration ? 1 : -1);
      if ( roll.isCriticalSuccess ) outcome.criticalSuccess = true;
      else if ( roll.isCriticalFailure) outcome.criticalFailure = true;
    }
  }

  /* -------------------------------------------- */

  /**
   * Compute the amount of damage dealt by a certain action
   * @param {DamageData} damage     The component details of the damage dealt
   * @returns {number}              The total damage dealt
   */
  static computeDamage({overflow=1, multiplier=1, base=0, bonus=0, resistance=0, restoration=false}={}) {

    // Compute damage before any mitigation
    if ( overflow < 0 ) multiplier = Math.max(multiplier, 1); // You cannot have an increased multiplier on misses
    const preMitigation = (overflow * multiplier) + base + bonus;
    if ( preMitigation <= 1 ) return 1; // Never do less than 1 damage

    // Resistance and Vulnerability does not apply to Restoration
    const postMitigation = restoration ? preMitigation : preMitigation - resistance;

    // Constrain total damage between 1 and 2x the pre-mitigation value
    return Math.clamp(postMitigation, 1, 2 * preMitigation);
  }

  /* -------------------------------------------- */
  /*  Action Lifecycle Methods                    */
  /* -------------------------------------------- */

  /**
   * A generator which provides the test conditions for action lifecycle.
   * @returns {Generator<Object|*, void, *>}
   * @protected
   */
  * _tests() {
    yield* this.tags.tags();
    yield this.hooks;
  }

  /* -------------------------------------------- */

  /**
   * Configure aspects of action usage before the action is prepared.
   * @protected
   */
  _configureUsage() {
    for ( const test of this._tests() ) {
      if ( test.initialize instanceof Function ) {
        try {
          test.initialize.call(this);
        } catch(err) {
          console.error(new Error(`Failed initialize hook for Action "${this.id}"`, {cause: err}));
        }
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Preparation, the first step in the Action life-cycle.
   * @protected
   */
  _prepare() {

    // Global preparation rules
    if ( this.actor.statuses.has("disoriented") && this.cost.focus ) this.cost.focus += 1;

    // Action-specific preparation
    for ( const test of this._tests() ) {
      if ( test.prepare instanceof Function ) {
        try {
          test.prepare.call(this);
        } catch(err) {
          console.error(new Error(`Failed prepare hook for Action "${this.id}"`, {cause: err}));
        }
      }
    }
    this.actor?.callActorHooks("prepareAction", this);
  }

  /* -------------------------------------------- */

  /**
   * Test whether an action can be performed before it has been fully configured.
   * This test should provide an early rejection that prevents the configuration dialog from being presented.
   * This test can only rely on initially known tags, for example preventing a reaction from occurring on your own turn.
   * @throws {Error}                          An error if the action cannot be taken
   * @protected
   */
  _canUse() {
    const r = this.actor.system.resources;
    const statuses = this.actor.statuses;

    // Cannot spend action
    if ( this.cost.action && this.actor.isIncapacitated ) {
      throw new Error(game.i18n.format("ACTION.WarningCannotSpendAction", {
        name: this.actor.name
      }))
    }

    // Cannot spend focus
    if ( this.cost.focus ) {
      let focusBlock = "";
      if ( statuses.has("broken") ) focusBlock = "broken";
      else if ( statuses.has("enraged") && !this.actor.talentIds.has("iramancer0000000") ) focusBlock = "enraged";
      if ( focusBlock ) throw new Error(game.i18n.format("ACTION.WarningCannotSpendFocus", {
        name: this.actor.name,
        status: game.i18n.localize(`ACTIVE_EFFECT.STATUSES.${focusBlock.titleCase()}`)
      }));
    }

    // Cannot afford action cost
    if ( this.cost.action > r.action.value ) {
      throw new Error(game.i18n.format("ACTION.WarningCannotAffordCost", {
        name: this.actor.name,
        resource: SYSTEM.RESOURCES.action.label,
        action: this.name
      }));
    }

    // Cannot afford focus cost
    if ( this.cost.focus > r.focus.value ) {
      throw new Error(game.i18n.format("ACTION.WarningCannotAffordCost", {
        name: this.actor.name,
        resource: SYSTEM.RESOURCES.focus.label,
        action: this.name
      }));
    }

    // Cannot afford heroism cost
    if ( this.cost.heroism > r.heroism.value ) {
      throw new Error(game.i18n.format("ACTION.WarningCannotAffordCost", {
        name: this.actor.name,
        resource: SYSTEM.RESOURCES.heroism.label,
        action: this.name
      }));
    }

    // Test each action tag
    for ( const test of this._tests() ) {
      if ( !(test.canUse instanceof Function) ) continue;
      let errorReason;
      let errorOptions = {};
      try {
        const can = test.canUse.call(this);
        if ( can === false ) errorReason = `with tag ${test.label}`;
      } catch(err) {
        errorReason = err.message;
        errorOptions = {cause: err};
      }
      if ( errorReason ) {
        throw new Error(game.i18n.format("ACTION.WarningCannotUse", {
          name: this.actor.name,
          action: this.name,
          reason: errorReason
        }, errorOptions));
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Should this Action be displayed on a character sheet as available for use?
   * @returns {boolean}                 Should the action be displayed?
   * @internal
   */
  _displayOnSheet() {
    try {
      for ( const test of this._tests() ) {
        if ( !(test.canUse instanceof Function) ) continue;
        if ( test.canUse.call(this) === false ) return false;
      }
    } catch(err) {
      return false;
    }
    return true;
  }

  /* -------------------------------------------- */

  /**
   * An action hook that fires whenever the targets of the action change.
   * This happens immediately when the action is designated for use and again when targets change during configuration.
   * It happens a final time after configuration is confirmed and targets are finalized.
   * Workflows performed in this hook must be idempotent since the hook can be called multiple times.
   *
   * @param {ActionUseTarget[]} targets       The array of targets affected by the action
   * @protected
   */
  async _acquireTargets(targets) {
    for ( const test of this._tests() ) {
      if ( test.preActivate instanceof Function ) await test.acquireTargets.call(this, targets);
    }
    this.actor.callActorHooks("acquireActionTargets", this, targets);
  }

  /* -------------------------------------------- */

  /**
   * Pre-activation steps which happen after dialog configuration of the action but before the action is evaluated.
   * This could be used to mutate the array of targets which are affected by the action.
   *
   * This is also the ideal lifecycle event within which to throw an error which prevents action usage conditional
   * on the selected array of targets.
   *
   * @param {ActionUseTarget[]} targets       The array of targets affected by the action
   * @throws {Error}                          An error which prevents action activation
   * @protected
   */
  async _preActivate(targets) {
    for ( const test of this._tests() ) {
      if ( test.preActivate instanceof Function ) await test.preActivate.call(this, targets);
    }
    this.actor.callActorHooks("preActivateAction", this, targets);
  }

  /* -------------------------------------------- */

  /**
   * Handle execution of dice rolls associated with the Action.
   * @param {CrucibleActionOutcome} outcome
   * @protected
   */
  async _roll(outcome) {
    for ( const test of this._tests() ) {
      if ( test.roll instanceof Function ) {
        await test.roll.call(this, outcome);
      }
    }
    this.actor.callActorHooks("rollAction", this, outcome);
  }

  /* -------------------------------------------- */

  /**
   * Handle post-roll modification of the Rolls array
   * @param {CrucibleActionOutcome} outcome
   * @returns {Promise<void>}
   * @protected
   */
  async _post(outcome) {
    for ( const test of this._tests() ) {
      if ( test.postActivate instanceof Function ) {
        await test.postActivate.call(this, outcome);
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Confirm action outcomes, applying actor and active effect changes as a result.
   * This method is factored out so that it may be called directly in cases where the action can be auto-confirmed.
   * @param {object} [options]                  Options which affect the confirmation workflow
   * @param {boolean} [options.reverse]           Reverse the action instead of applying it?
   * @returns {Promise<void>}
   */
  async confirm({reverse=false}={}) {
    if ( !this._prepared ) throw new Error("A CrucibleAction must be prepared for an Actor before it can be confirmed.");
    if ( !this.outcomes ) throw new Error(`Cannot confirm Action ${this.id} which has no configured outcomes.`)

    // Custom Action confirmation steps
    for ( const test of this._tests() ) {
      if ( !(test.confirm instanceof Function) ) continue
      try {
        await test.confirm.call(this, reverse);
      } catch(err) {
        console.error(new Error(`"${this.id}" action confirmation failed`, {cause: err}));
      }
    }

    // Additional Actor-specific consequences
    this.actor.onDealDamage(this, this.outcomes);

    // Delete any Measured Template that was placed
    if ( this.template ) await this.template.delete();

    // Apply outcomes
    for ( const outcome of this.outcomes.values() ) {
      await outcome.target.applyActionOutcome(this, outcome, {reverse});
    }

    // Record heroism
    try {
      await this.#recordHeroism(reverse);
    } catch(err) {
      console.error(new Error(`Failed to record Heroism from Action "${this.id}"`, {cause: err}));
    }
  }

  /* -------------------------------------------- */

  /**
   * Record actions which generate heroism.
   * @param {boolean} reverse
   */
  async #recordHeroism(reverse) {
    if ( !this.#canGenerateHeroism() ) return;
    const h = game.combat.system.heroism;
    const delta = this.cost.action * (reverse ? -1 : 1);
    const actions = h.actions + delta;

    // Update Combat
    const combatUpdate = {system: {heroism: {actions}}};
    let award = 0;
    if ( (actions >= h.next) && (actions > h.awarded) ) {
      combatUpdate.system.heroism.awarded = actions;
      award = 1;
    }
    else if ( (actions < h.previous) && (actions < h.awarded) ) {
      combatUpdate.system.heroism.awarded = actions;
      award = -1;
    }
    await game.combat.update(combatUpdate);

    // Award Heroism
    if ( award === 0 ) return;
    for ( const {actor} of game.combat.combatants ) {
      if ( actor?.type !== "hero" ) continue;
      await actor.alterResources({heroism: award});
    }
  }

  /* -------------------------------------------- */

  /**
   * Can this Action generate heroism?
   * @returns {boolean}
   */
  #canGenerateHeroism() {
    if ( !this.actor.inCombat ) return false;
    for ( const outcome of this.outcomes.values() ) {
      if ( outcome.target === this.actor ) continue;
      if ( outcome.effects.length ) return true;
      for ( const [k, v] of Object.entries(outcome.resources) ) {
        if ( !(k in SYSTEM.RESOURCES) ) continue;
        const isRestoration = !!this.damage?.restoration;
        if ( isRestoration && (v > 0) ) return true;
        else if ( !isRestoration && (v < 0) ) return true;
      }
    }
    return false;
  }

  /* -------------------------------------------- */
  /*  VFX Integration                             */
  /* -------------------------------------------- */

  /**
   * Configure a VFXEffect instance for this Action.
   * @returns {foundry.vfx.VFXEffect|null}
   */
  configureVFXEffect() {
    if ( !crucible.vfxEnabled ) return null;
    if ( this.tags.has("strike") ) return crucible.api.canvas.vfx.strikes.configureStrikeVFXEffect(this);
    return null;
  }

  /* -------------------------------------------- */

  /**
   * Construct and play a configured VFXEffect on every client after the Action is confirmed.
   * @param {VFXEffectConfig} vfxConfig
   * @param {Record<string, any>} references
   * @returns {Promise<void>}
   */
  async playVFXEffect(vfxConfig, references) {
    if ( !crucible.vfxEnabled ) return;
    if ( !this.token?.parent.isView ) return;

    // Construct the VFXEffect instance
    let vfxEffect;
    try {
      vfxEffect = new foundry.vfx.VFXEffect(vfxConfig);
    } catch(cause) {
      console.warn(new Error(`Failed to construct provided Action VFX config for Action "${this.id}"`));
      return;
    }

    // Always include the action actor and token
    references.actor ??= this.actor;
    references.token ??= this.token;

    // Pass 1 - resolve UUID references that start with @
    for ( const [k, v] of Object.entries(references) ) {
      if ( (typeof v === "string") && (v[0] === "@") ) {
        references[k] = fromUuidSync(v.slice(1));
      }
    }

    // Pass 2 - resolve indirect references that start with ^
    for ( const [k, v] of Object.entries(references) ) {
      if ( (typeof v === "string") && (v[0] === "^") ) {
        references[k] = foundry.utils.getProperty(references, v.slice(1)) ?? null;
      }
    }

    // Play the effect
    return vfxEffect.play(references);
  }

  /* -------------------------------------------- */
  /*  Display and Formatting Methods              */
  /* -------------------------------------------- */

  /**
   * Does this Action require a weapon to be chosen before it can be used?
   * @returns {boolean}
   */
  get allowWeaponChoice() {
    if ( !this.actor ) return false;
    const original = this.actor.actions[this.id];
    if ( !original ) return false;
    const {cost, tags} = original._source;
    if ( !cost.weapon ) return false;
    if ( ["mainhand", "offhand", "twohand", "natural"].some(t => tags.includes(t)) ) return false;
    return this.actor?.equipment.weapons.hasChoice;
  }

  /* -------------------------------------------- */

  /**
   * Obtain an object of tags which describe the Action.
   * @returns {ActionTags}
   */
  getTags() {
    const tags = {
      activation: new ActionTagGroup({icon: "fa-solid fa-banner", tooltip: "Activation Tags"}),
      action: new ActionTagGroup({icon: "fa-solid fa-lightning-bolt", tooltip: "Action Tags"}),
      context: new ActionTagGroup({icon: "fa-solid fa-bullseye", tooltip: "Context Tags"}),
    };

    // Action Tags
    for (let t of this.tags) {
      const tag = SYSTEM.ACTION.TAGS[t];
      if ( tag.internal ) continue;
      else tags.action[tag.tag] = game.i18n.localize(tag.label);
    }

    // Context Tags
    const ctx = this.usage.context;
    tags.context = new ActionTagGroup({icon: ctx.icon || "fa-solid fa-bullseye", tooltip: ctx.label || "Context Tags"});
    for ( const [k, v] of Object.entries(ctx.tags) ) {
      tags.context[k] = v;
    }

    // Target
    if ( this.target.type !== "none" ) {
      const parts = [SYSTEM.ACTION.TARGET_TYPES[this.target.type].label];
      if ( this.target.number > 1 ) parts.unshift(this.target.number);
      if ( this.range.maximum ) {
        let r = `${this.range.maximum}ft`;
        if ( this.range.weapon && !this.actor ) r = `+${r}`;
        parts.push(r);
      }
      if ( this.target.limit > 0 ) parts.push(`Limit ${this.target.limit}`);
      if ( this.target.multiple > 1 ) parts.push(`x${this.target.multiple}`);
      tags.activation.target = parts.join(" ");
    }

    // Cost
    const cost = this._trueCost || this.cost;
    let ap = cost.action ?? 0;
    if ( this.cost.weapon && !this.usage.strikes?.length ) { // Strike sequence not yet determined
      if ( ap > 0 ) tags.activation.ap = `W+${ap}A`;
      else if ( ap < 0 ) tags.activation.ap = `W${ap}A`;
      else tags.activation.ap = "W";
    }
    else tags.activation.ap = `${ap}A`;
    if ( Number.isFinite(cost.focus) && (cost.focus !== 0) ) tags.activation.fp = `${cost.focus}F`;
    if ( Number.isFinite(cost.heroism) && cost.heroism ) tags.activation.hp = `${cost.heroism}H`;
    if ( Number.isFinite(cost.health) && (cost.health !== 0) ) tags.activation.health = `${cost.health}HP`; // e.g. Blood Magic
    if ( !(tags.activation.ap || tags.activation.fp || tags.activation.hp || tags.activation.health) ) tags.activation.ap = "Free";
    if ( cost.hands ) tags.activation.hands = cost.hands > 1 ? `${cost.hands} Hands` : `1 Hand`;
    return tags;
  }

  /* -------------------------------------------- */

  /**
   * Render this Action as HTML for a tooltip card.
   * @returns {Promise<string>}
   */
  async renderCard() {
    await foundry.applications.handlebars.loadTemplates([this.constructor.TOOLTIP_TEMPLATE]);
    return foundry.applications.handlebars.renderTemplate(this.constructor.TOOLTIP_TEMPLATE, {
      action: this,
      tags: this.getTags()
    });
  }

  /* -------------------------------------------- */

  /**
   * Render the action to a chat message including contained rolls and results
   * @param {ActionUseTarget[]} targets           Targets affected by this action usage
   * @param {object} options                      Context options for ChatMessage creation
   * @param {boolean} [options.confirmed]           Were the outcomes auto-confirmed?
   * @returns {Promise<ChatMessage>}              The created ChatMessage document
   */
  async toMessage(targets, {confirmed=false, ...options}={}) {

    // Prepare action data
    const actionData = {
      actor: this.actor.uuid,
      action: this.toObject(false), // Finalized action data rather than source
      confirmed,
      outcomes: [],
    };
    if ( this.item ) actionData.item = this.item.uuid;
    if ( this.template ) actionData.template = this.template.uuid;
    if ( this.token ) actionData.token = this.token.uuid;
    actionData.vfxConfig = this.configureVFXEffect();

    // Record outcomes
    const rolls = [];
    const hasMultipleTargets = Array.from(this.outcomes.values()).filter(o => o.rolls.length).length > 1;
    for ( const outcome of this.outcomes.values() ) {
      const {target, token, rolls: outcomeRolls, ...outcomeData} = outcome;
      outcomeData.target = target.uuid;
      outcomeData.token = token?.uuid || null;
      outcomeData.rolls = outcomeRolls.map((roll, i) => {
        roll.data.newTarget = hasMultipleTargets && (i === 0);
        roll.data.index = rolls.length;
        rolls.push(roll);
        return roll.data.index;
      });
      actionData.outcomes.push(outcomeData);
    }

    // Render HTML template
    const tags = this.getTags();
    const templatePath = "systems/crucible/templates/dice/action-use-chat.hbs";
    const content = await foundry.applications.handlebars.renderTemplate(templatePath, {
      action: this,
      actor: this.actor,
      context: this.usage.context,
      hasActionTags: !tags.action.empty,
      hasContextTags: !tags.context.empty,
      hasTargets: !["self", "none"].includes(this.target.type),
      outcomes: this.outcomes,
      tags,
      targets,
      template: this.template
    });

    // Create chat message
    return ChatMessage.create({
      content: content,
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      rolls: rolls,
      flags: {crucible: actionData}
    }, options);
  }

  /* -------------------------------------------- */

  /**
   * Confirm the result of an Action that was recorded as a ChatMessage.
   * @param {CrucibleChatMessage} message
   * @param {object} options
   * @param {CrucibleAction} [options.action]
   * @param {boolean} [options.reverse=false]
   */
  static async confirmMessage(message, {action, reverse=false}={}) {
    action ||= this.fromChatMessage(message);
    await message.update({flags: {crucible: {confirmed: !reverse}}}); // Mark the message as confirmed *first*
    await action.confirm({reverse}); // Then perform the confirmation effects
  }

  /* -------------------------------------------- */

  /**
   * Reconstitute an Action from a ChatMessage which contains it.
   * The reconstituted Action is constructed lazily and has not been prepared for a particular Actor.
   * @param {ChatMessage} message     The ChatMessage instance containing a used Action
   * @returns {CrucibleAction|null}   The reconstituted Action instance
   */
  static fromChatMessage(message) {
    const {
      actor: actorUuid,
      item: itemUuid,
      token: tokenUuid,
      action: actionData,
      template: templateUuid,
      outcomes
    } = message.flags.crucible || {};
    if ( !actionData ) throw new Error(`ChatMessage ${message.id} does not contain CrucibleAction data`);

    const actor = fromUuidSync(actorUuid) || ChatMessage.getSpeakerActor(message.speaker);
    const item = fromUuidSync(itemUuid);
    const template = fromUuidSync(templateUuid);
    const token = fromUuidSync(tokenUuid);

    // Rebuild action from explicit data
    const actionId = actionData.id;
    const actionContext = {parent: item?.system, actor, item, token, template, lazy: true};
    let action;
    if ( actionId in actor.actions ) action = actor.actions[actionId].clone({}, actionContext);
    else if ( actionId.startsWith("spell.") ) {
      action = new game.system.api.models.CrucibleSpellAction(actionData, actionContext);
    }
    else action = new this(actionData, actionContext);
    action.prepare();

    // Reconstruct outcomes
    for ( const {target: targetUuid, token: tokenUuid, rolls: outcomeRolls, ...outcome} of outcomes ) {
      outcome.target = fromUuidSync(targetUuid);
      if ( outcome.target.isToken ) outcome.token = outcome.target.token;
      else outcome.token = fromUuidSync(tokenUuid);
      outcome.rolls = outcomeRolls.map(i => message.rolls[i]);
      action.outcomes.set(outcome.target, outcome);
    }
    return action;
  }

  /* -------------------------------------------- */

  /**
   * Delete a measured template if the chat message which originated it is deleted.
   * @param {ChatMessage} message     The ChatMessage document that will be deleted
   * @param {object} options          Options which modify message deletion
   * @param {string} userId           The ID of the deleting user
   * @returns {Promise<void>}
   */
  static async onDeleteChatMessage(message, options, userId) {
    const template = message.flags.crucible?.template;
    if ( !template ) return;
    const templateDoc = await fromUuid(template);
    if ( templateDoc ) await templateDoc.delete();
  }

  /* -------------------------------------------- */

  /**
   * Create an environmental hazard action.
   * @param {CrucibleActor} actor
   * @param {object} actionData
   * @param {string[]} tags
   * @param {number} [hazard=0]
   * @returns {CrucibleAction}
   */
  static createHazard(actor, {hazard=0, tags, ...actionData}={}) {
    actor ||= new Actor.implementation({name: "Environment", type: "adversary"});
    tags = Array.isArray(tags) ? tags : [];
    tags.unshift("hazard");
    return new this({
      id: "environmentAttack",
      name: "Environmental Hazard",
      img: "icons/skills/wounds/injury-body-pain-gray.webp",
      description: "",
      target: {type: "single", scope: 4, self: true},
      ...actionData,
      tags
    }, {actor, usage: {hazard}});
  }
}/**
 * The scope of creatures affected by an action.
 * @enum {number}
 */
const TARGET_SCOPES = new Enum({
  NONE: {value: 0, label: "None"},
  SELF: {value: 1, label: "Self"},
  ALLIES: {value: 2, label: "Allies"},
  ENEMIES: {value: 3, label: "Enemies"},
  ALL: {value: 4, label: "All"}
});

/**
 * The allowed target types which an Action may have.
 * @enum {{label: string}}
 */
const TARGET_TYPES = Object.freeze({
  none: {
    label: "None",
    template: null,
    scope: TARGET_SCOPES.NONE
  },
  self: {
    label: "Self",
    template: null,
    scope: TARGET_SCOPES.SELF
  },
  single: {
    label: "Single",
    template: null,
    scope: TARGET_SCOPES.ALL
  },
  cone: {
    label: "Cone",
    template: {
      t: "cone",
      angle: 60,
      directionDelta: 15,
      anchor: "self",
      addSize: true
    },
    scope: TARGET_SCOPES.ALL
  },
  fan: {
    label: "Fan",
    template: {
      t: "cone",
      angle: 210,
      directionDelta: 45,
      anchor: "self",
      addSize: true
    },
    scope: TARGET_SCOPES.ALL
  },
  pulse: {
    label: "Pulse",
    template: {
      t: "circle",
      anchor: "self",
      addSize: true
    },
    scope: TARGET_SCOPES.ALL
  },
  blast: {
    label: "Blast",
    template: {
      t: "circle",
      anchor: "vertex"
    },
    scope: TARGET_SCOPES.ALL
  },
  ray: {
    label: "Ray",
    template: {
      t: "ray",
      width: 1,
      directionDelta: 3,
      anchor: "self",
      addSize: true
    },
    scope: TARGET_SCOPES.ALL
  },
  summon: {
    label: "Summon",
    template: {
      t: "rect",
      direction: 45, // Square
      size: 3,
      anchor: "vertex"
    },
    scope: TARGET_SCOPES.SELF
  },
  wall: {
    label: "Wall",
    template: {
      t: "ray",
      width: 2,
      anchor: "center"
    },
    scope: TARGET_SCOPES.ALL
  }
});

/* -------------------------------------------- */

/**
 * @typedef ActionTag
 * @property {string} tag
 * @property {string} label
 * @property {string[]} propagate     Propagate this tag to also apply other tags
 * @property {number} [priority]      A priority that this tag should be resolved in. Lower values are higher priority
 * @property {Function} [prepare]
 * @property {Function} [can]
 * @property {Function} [pre]
 * @property {Function} [roll]
 * @property {Function} [post]
 */

/**
 * Categories of action tags which are supported by the system.
 * @type {Readonly<Object<string, {label: string}>>}
 */
const TAG_CATEGORIES = Object.freeze({
  attack: {label: "ACTION.TAG_CATEGORIES.ATTACK"},
  requirements: {label: "ACTION.TAG_CATEGORIES.REQUIREMENTS"},
  context: {label: "ACTION.TAG_CATEGORIES.CONTEXT"},
  modifiers: {label: "ACTION.TAG_CATEGORIES.MODIFIERS"},
  defenses: {label: "ACTION.TAG_CATEGORIES.DEFENSES"},
  damage: {label: "ACTION.TAG_CATEGORIES.DAMAGE"},
  scaling: {label: "ACTION.TAG_CATEGORIES.SCALING"},
  resources: {label: "ACTION.TAG_CATEGORIES.RESOURCES"},
  skills: {label: "ACTION.TAG_CATEGORIES.SKILLS"},
  special: {label: "ACTION.TAG_CATEGORIES.SPECIAL"},
});

/* -------------------------------------------- */

/**
 * Define special logic for action tag types
 * @enum {ActionTag}
 */
const TAGS = {

  /* -------------------------------------------- */
  /*  Required Equipment                          */
  /* -------------------------------------------- */

  // Requires Dual-Wield
  dualwield: {
    tag: "dualwield",
    label: "ACTION.TagDualWield",
    tooltip: "ACTION.TagDualWieldTooltip",
    category: "requirements",
    canUse() {
      return this.actor.equipment.weapons.dualWield;
    }
  },

  // Requires One-Handed weapon
  onehand: {
    tag: "onehand",
    label: "ACTION.TagOneHand",
    tooltip: "ACTION.TagOneHandTooltip",
    category: "requirements",
    canUse() {
      return !this.actor.equipment.weapons.twoHanded;
    }
  },

  // Requires Dexterity Weapon
  finesse: {
    tag: "finesse",
    label: "ACTION.TagFinesse",
    tooltip: "ACTION.TagFinesseTooltip",
    category: "requirements",
    canUse() {
      if ( !this.usage.strikes.every(w => w.config.category.scaling.includes("dexterity")) ) {
        throw new Error("Every weapon used in this action must scale using dexterity.");
      }
    }
  },

  // Requires Strength Weapon
  brute: {
    tag: "brute",
    label: "ACTION.TagBrute",
    tooltip: "ACTION.TagBruteTooltip",
    category: "requirements",
    priority: 5,
    canUse() {
      if ( !this.usage.strikes.every(w => w.config.category.scaling.includes("strength")) ) {
        throw new Error("Every weapon used in this action must scale using strength.");
      }
    }
  },

  // Requires a Projectile Weapon
  projectile: {
    tag: "projectile",
    label: "ACTION.TagProjectile",
    tooltip: "ACTION.TagProjectileTooltip",
    category: "requirements",
    propagate: ["ranged"],
    canUse() {
      const {mainhand: mh, offhand: oh} = this.actor.equipment.weapons;
      if ( this.tags.has("offhand") ) return ["projectile1", "projectile2"].includes(oh.category);
      else return ["projectile1", "projectile2"].includes(mh.category);
    }
  },

  // Requires a Mechanical Weapon
  mechanical: {
    tag: "mechanical",
    label: "ACTION.TagMechanical",
    tooltip: "ACTION.TagMechanicalTooltip",
    category: "requirements",
    propagate: ["ranged"],
    canUse() {
      const {mainhand: mh, offhand: oh} = this.actor.equipment.weapons;
      if ( this.tags.has("offhand") ) return ["mechanical1", "mechanical2"].includes(oh.category);
      else return ["mechanical1", "mechanical2"].includes(mh.category);
    }
  },

  // Requires Shield
  shield: {
    tag: "shield",
    label: "ACTION.TagShield",
    tooltip: "ACTION.TagShieldTooltip",
    category: "requirements",
    canUse() {
      return this.actor.equipment.weapons.shield;
    }
  },

  // Requires Unarmed
  unarmed: {
    tag: "unarmed",
    label: "ACTION.TagUnarmed",
    tooltip: "ACTION.TagUnarmedTooltip",
    category: "requirements",
    propagate: ["melee"],
    canUse() {
      return this.actor.equipment.weapons.unarmed;
    }
  },

  // Requires Unarmored
  unarmored: {
    tag: "unarmored",
    label: "ACTION.TagUnarmored",
    tooltip: "ACTION.TagUnarmoredTooltip",
    category: "requirements",
    canUse() {
      return this.actor.equipment.unarmored;
    }
  },

  // Requires Free Hand
  freehand: {
    tag: "freehand",
    label: "ACTION.TagFreehand",
    tooltip: "ACTION.TagFreehandTooltip",
    category: "requirements",
    canUse() {
      const weapons = this.actor.equipment.weapons;
      if ( weapons.twoHanded && this.actor.talentIds.has("stronggrip000000") ) return true;
      return weapons.freeHands > 0;
    }
  },

  // After a Basic Strike
  afterStrike: {
    tag: "afterStrike",
    label: "ACTION.TagAfterStrike",
    tooltip: "ACTION.TagActorStrikeTooltip",
    category: "requirements",
    canUse() {
      const lastAction = this.actor.lastConfirmedAction;
      if ( lastAction?.id !== "strike" ) {
        throw new Error(`You may only perform the ${this.name} action after a basic Strike action.`);
      }
      for ( const outcome of lastAction.outcomes.values() ) {
        if ( outcome.target === this.actor ) continue;
        if ( outcome.rolls.some(r => r.isCriticalFailure) ) {
          throw new Error(`You may only perform ${this.name} after a basic Strike which did not critically miss.`);
        }
      }
    }
  },

  /* -------------------------------------------- */
  /*  Context Requirements                        */
  /* -------------------------------------------- */

  // Involves Movement
  movement: {
    tag: "movement",
    label: "ACTION.TagMovement",
    tooltip: "ACTION.TagMovementTooltip",
    category: "context",
    canUse() {
      if ( this.actor.statuses.has("restrained") ) throw new Error("You may not move while Restrained!");
    },
    prepare() {
      const stride = this.actor.system.movement.stride;
      const movement = this.usage.movement || this.actor.getMovementActionCost(stride);
      this.cost.action = movement.cost;
      this.usage.actorStatus ||= {};
      this.usage.actorStatus.hasMoved = true;
      this.usage.actorStatus.lastMovementId = movement.id || null;
    },
    async confirm() {
      if ( this.actor.statuses.has("prone") ) {
        await this.actor.toggleStatusEffect("prone", {active: false});
      }
    }
  },

  // Requires Reaction
  reaction: {
    tag: "reaction",
    label: "ACTION.TagReaction",
    tooltip: "ACTION.TagReactionTooltip",
    category: "context",
    canUse() {
      if ( !this.actor.inCombat ) return false;
      if ( this.actor.statuses.has("unaware") ) throw new Error("You may not use a reaction while Unaware!");
      return this.actor !== game.combat?.combatant?.actor;
    },
    prepare() {
      const a = this.actor;
      const canFreeReact = a.talentIds.has("gladiator0000000") && !a.system.status.gladiator
        && (this.tags.has("mainhand") || this.tags.has("offhand"));
      if ( canFreeReact ) {
        this.cost.focus = -Infinity;
        this.usage.actorStatus.gladiator = true;
      }
    }
  },

  // Non-Combat Actions
  noncombat: {
    tag: "noncombat",
    label: "ACTION.TagNonCombat",
    tooltip: "ACTION.TagNonCombatTooltip",
    category: "context",
    canUse() {
      if ( this.actor.inCombat ) throw new Error(`You may not use ${this.name} during Combat.`);
    },
  },

  // Requires a Flanked Opponent
  flanking: {
    tag: "flanking",
    label: "ACTION.TagFlanking",
    tooltip: "ACTION.TagFlankingTooltip",
    category: "context",
    preActivate(targets) {
      for ( const {actor} of targets ) {
        if ( !actor.statuses.has("flanked") ) {
          throw new Error(`${this.name} requires a flanked target. Target "${actor.name}" is not flanked.`);
        }
      }
    },
  },

  // Consumables
  consume: {
    tag: "consume",
    label: "ACTION.TagConsume",
    tooltip: "ACTION.TagConsumeTooltip",
    category: "special",
    initialize() {
      if ( this.item?.type === "consumable" ) this.usage.consumable = this.item;
    },
    canUse() {
      const item = this.usage.consumable;
      if ( !item ) throw new Error(`No consumable Item identified for Action "${this.id}"`);
      if ( item.system.isDepleted ) {
        throw new Error(`Consumable item "${item.name}" has no uses remaining for Action "${this.id}"`);
      }
    },
    async confirm(reverse) {
      await this.usage.consumable.system.consume(reverse ? -1 : 1);
    }
  },

  /* -------------------------------------------- */
  /*  Spellcasting Tags                           */
  /* -------------------------------------------- */

  spell: {
    tag: "spell",
    label: "ACTION.TagSpell",
    tooltip: "ACTION.TagSpellTooltip",
    category: "attack",
    initialize() {
      Object.assign(this.usage.context, {
        type: "spell",
        label: "Spell Tags",
        icon: "fa-solid fa-sparkles",
        tags: {}
      });
      if ( this.composition === 0 ) return;
      this.usage.context.tags.rune = `Rune: ${this.rune.name}`;
      this.usage.context.tags.gesture = `Gesture: ${this.gesture.name}`;
      if ( this.inflection ) this.usage.context.tags.gesture = this.inflection.name;
      this.usage.actorFlags.lastSpell = this.id;
      this.usage.actorStatus.hasCast = true;
      this.usage.isAttack = true;
      this.usage.isRanged = (this.gesture.target.type !== "self") && (this.range.maximum > 1);
    },
    canUse() {
      if ( this.cost.hands > this.actor.equipment.weapons.spellHands ) {
        throw new Error(`A Spell using the ${this.gesture.name} gesture requires ${this.cost.hands} free hands for spellcraft.`);
      }
    },
    async roll(outcome) {
      const roll = await this.actor.spellAttack(this, outcome);
      if ( roll ) outcome.rolls.push(roll);
    }
  },

  // Iconic Spell
  iconicSpell: {
    tag: "iconicSpell",
    label: "ACTION.TagIconicSpell",
    tooltip: "ACTION.TagSpellTooltip",
    prepare() {
      for ( const gestureId of this.parent.gestures ) {
        const gesture = SYSTEM.SPELL.GESTURES[gestureId];
        this.cost.hands = Math.max(this.cost.hands, gesture.hands);
      }
      this.usage.actorStatus.hasCast = true;
    },
    canUse() {
      if ( this.cost.hands > this.actor.equipment.weapons.spellHands ) {
        throw new Error(`The ${this.name} spell requires ${this.cost.hands} free hands for spellcraft.`);
      }
    }
  },

  summon: {
    tag: "summon",
    label: "ACTION.TagSummon",
    tooltip: "ACTION.TagSummonTooltip",
    category: "special",
    async postActivate(outcome) {
      if ( (outcome.target !== this.actor) || !outcome.summons?.length ) return;
      for ( const summon of outcome.summons ) {
        const position = this.template || this.token;
        summon.tokenData ||= {};
        summon.tokenData.x ??= position.x;
        summon.tokenData.y ??= position.y;
        if ( (summon.permanent === false) && !outcome.effects.length ) throw new Error(`ActiveEffect data must be 
          defined to track the non-permanent summon created by the action "${this.id}"`);
      }
    },
    async confirm(reverse) {
      if ( reverse ) return; // TODO support reverse
      if ( !this.token ) return; // No token acting  TODO eventually this shouldn't be required?
      const self = this.outcomes.get(this.actor);
      if ( !self.summons?.length ) return;

      // Create summoned tokens
      const summonedTokens = [];
      for ( const summon of self.summons ) {

        // Get or create a world level Actor for the summons
        const sourceActor = await fromUuid(summon.actorUuid);
        const ownership = this.actor.hasPlayerOwner ? {default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER} : {};
        let worldActor = game.actors.get(sourceActor.id);
        if ( !worldActor ) {
          worldActor = await game.actors.importFromCompendium(sourceActor.collection, sourceActor.id, {ownership},
            {keepId: true});
        }
        else await worldActor.update({ownership});

        // Create Token
        const tokenName = worldActor.name;
        const tokenData = foundry.utils.mergeObject({
          name: tokenName,
          disposition: this.actor.prototypeToken.disposition,
          delta: {
            name: tokenName,
            system: {
              resources: {
                "health.value": worldActor.resources.health.max,
                "morale.value": worldActor.resources.morale.max,
                "action.value": worldActor.resources.action.max,
                "focus.value": worldActor.resources.focus.max
              },
            }
          }
        }, summon.tokenData || {});
        Object.assign(tokenData, {actorId: worldActor.id, actorLink: false});
        const preparedToken = await worldActor.getTokenDocument(tokenData, {parent: this.token.parent});
        const token = await TokenDocument.implementation.create(preparedToken, {parent: this.token.parent});
        summonedTokens.push(token.uuid);

        // Create a Combatant
        if ( this.actor.inCombat ) {
          await game.combat.createEmbeddedDocuments("Combatant", [{
            tokenId: token.id,
            sceneId: canvas.scene.id,
            actorId: worldActor.id,
            initiative: 1
          }]);
        }
      }

      // Update Active Effect
      const ae = self.effects?.[0];
      if ( ae ) foundry.utils.setProperty(ae, "flags.crucible.summons",  summonedTokens);
    }
  },

  /* -------------------------------------------- */
  /*  Attack Rolls                                */
  /* -------------------------------------------- */

  // Perform a Strike sequence
  strike: {
    tag: "strike",
    priority: Infinity, // Last
    internal: true,
    initialize() {
      this.usage.strikes = []; // Reset strike sequence
    },
    prepare() {
      const {strikes, weapon} = this.usage;

      // Default weapon-based strikes
      if ( !strikes.length && weapon ) strikes.push(weapon);
      if ( !strikes?.length ) return;

      // Record usage properties
      this.usage.actorStatus.hasAttacked = true;
      this.usage.hasDice = true;
      this.usage.isAttack = true;
      this.usage.isRanged = this.tags.has("ranged") || strikes.every(w => w.config.category.ranged);
      this.usage.isMelee = this.tags.has("melee") || strikes.every(w => !w.config.category.ranged);
      this.usage.defenseType ??= "physical";

      // Prepare cost and range for the base strike sequence
      let weaponRange = 0;
      const contextTags = {};
      for ( const [i, weapon] of strikes.entries() ) {
        if ( this.cost.weapon ) this.cost.action += (weapon.system.actionCost || 0);
        if ( this.range.weapon ) {
          if ( !weaponRange ) weaponRange = weapon.system.range;
          else weaponRange = Math.min(weaponRange, weapon.system.range);
        }
        if ( i === 0 ) Object.assign(this.usage.bonuses, weapon.system.actionBonuses);
      }

      // Repeat the sequence if multiple attacks are performed
      const n = this.target.multiple ?? 1;
      if ( n > 1 ) {
        const baseSequence = [...strikes];
        for ( let i=1; i<n; i++ ) {
          strikes.push(...baseSequence);
        }
      }

      // Context tags
      Object.assign(this.usage.context, {label: "Strikes", icon: "fa-solid fa-swords", tags: {}});
      for ( const v of Object.values(contextTags) ) {
        this.usage.context.tags[`weapon.${v.id}`] = v.count > 1 ? `${v.name} (x${v.count})` : v.name;
      }

      // Configure action range
      if ( this.range.weapon ) {
        const baseMaximum = this._source.range.maximum ?? 0;
        this.range.maximum = Math.max(this.range.maximum ?? 0, baseMaximum + weaponRange);
      }
    },
    async roll(outcome) {
      for ( const [i, weapon] of this.usage.strikes.entries() ) {
        const roll = await this.actor.weaponAttack(this, weapon, outcome);
        roll.data.strike = i; // TODO handle this better?
        outcome.rolls.push(roll);
      }
    }
  },

  // Requires a Melee Weapon
  melee: {
    tag: "melee",
    label: "ACTION.TagMelee",
    tooltip: "ACTION.TagMeleeTooltip",
    category: "attack",
    propagate: ["strike"],
    priority: 1,
    canUse() {
      if ( !this.actor.equipment.weapons.melee ) {
        throw new Error("You must have melee weapons equipped to use this action.");
      }
    },
    prepare() {
      if ( !this.usage.weapon ) {
        const {mainhand: mh, offhand: oh, natural} = this.actor.equipment.weapons;
        if ( mh && !mh.system.config.category.ranged ) this.usage.weapon = mh;
        else if ( oh && !oh.system.config.category.ranged ) this.usage.weapon = oh;
        else {
          for ( const n of natural ) {
            if ( !n.system.config.category.ranged ) {
              this.usage.weapon = n;
              break;
            }
          }
        }
      }
    }
  },

  // Requires a Ranged Weapon
  ranged: {
    tag: "ranged",
    label: "ACTION.TagRanged",
    tooltip: "ACTION.TagRangedTooltip",
    category: "attack",
    propagate: ["strike"],
    priority: 1,
    canUse() {
      if ( !this.actor.equipment.weapons.ranged ) {
        throw new Error("This action requires a ranged weapon equipped.");
      }
      if ( this.usage.strikes.some(w => w.config.category.reload && !w.system.loaded && !this.tags.has("reload")) ) {
        throw new Error("Your weapon requires reloading in order to use this action.");
      }
    },
    prepare() {
      this.usage.actorStatus.rangedAttack = true;
      if ( !this.usage.weapon ) {
        const {mainhand: mh, offhand: oh, natural} = this.actor.equipment.weapons;
        if ( mh && mh.system.config.category.ranged ) this.usage.weapon = mh;
        else if ( oh && oh.system.config.category.ranged ) this.usage.weapon = oh;
        else {
          for ( const n of natural ) {
            if ( n.system.config.category.ranged ) {
              this.usage.weapon = n;
              break;
            }
          }
        }
      }
    },
    preActivate(_targets) {
      for ( const w of this.usage.strikes ) {
        if ( w.config.category.reload ) {
          this.usage.actorUpdates.items ||= [];
          this.usage.actorUpdates.items.push({_id: w.id, "system.loaded": false});
        }
      }
    }
  },

  mainhand: {
    tag: "mainhand",
    label: "ACTION.TagMainHand",
    tooltip: "ACTION.TagMainHandTooltip",
    category: "attack",
    propagate: ["strike"],
    priority: 9,
    prepare() {
      this.usage.strikes ||= [];
      const mh = this.actor.equipment.weapons.mainhand;
      if ( mh ) this.usage.strikes.push(mh);
    }
  },

  twohand: {
    tag: "twohand",
    label: "ACTION.TagTwoHanded",
    tooltip: "ACTION.TagTwoHandedTooltip",
    category: "attack",
    propagate: ["strike"],
    priority: 9,
    prepare() {
      this.usage.strikes ||= [];
      const mh = this.actor.equipment.weapons.mainhand;
      if ( mh ) this.usage.strikes.push(mh);
    },
    canUse() {
      if ( !this.actor.equipment.weapons.twoHanded ) {
        throw new Error("This action requires a two-handed weapon equipped.");
      }
    }
  },

  offhand: {
    tag: "offhand",
    label: "ACTION.TagOffHand",
    tooltip: "ACTION.TagOffHandTooltip",
    category: "attack",
    propagate: ["strike"],
    priority: 9,
    prepare() {
      this.usage.strikes ||= [];
      const oh = this.actor.equipment.weapons.offhand;
      if ( oh ) this.usage.strikes.push(oh);
    },
    canUse() {
      if ( !this.actor.equipment.weapons.offhand ) {
        throw new Error("This action requires an offhand weapon equipped.");
      }
    }
  },

  thrown: {
    tag: "thrown",
    label: "ACTION.TagThrown",
    tooltip: "ACTION.TagThrownTooltip",
    category: "attack",
    propagate: ["melee"],
    canUse() {
      for ( const w of this.usage.strikes ) {
        if ( !w.system.canThrow() ) throw new Error("You cannot throw this weapon.");
      }
    },
    prepare() {
      this.range.maximum ??= 10;
      this.range.weapon = false;
    },
    preActivate(_targets) {
      if ( !this.usage.strikes?.length ) return;
      for ( const weapon of this.usage.strikes ) {
        if ( !weapon.system.canThrow() ) throw new Error("You cannot throw this weapon.");
        this.usage.actorUpdates.items ||= [];
        this.usage.actorUpdates.items.push({_id: weapon.id, system: {dropped: true, equipped: false}});
        if ( !weapon.system.properties.has("thrown") ) this.usage.banes[this.id] = {label: this.name, number: 2};
      }
    }
  },

  natural: {
    tag: "natural",
    category: "attack",
    label: "ACTION.TagNatural",
    tooltip: "ACTION.TagNaturalTooltip",
    propagate: ["melee"],
    priority: 9,
    canUse() {
      if ( !this.usage.strikes.every(w => w.system.properties.has("natural")) ) {
        throw new Error("This action requires use of a natural weapon.");
      }
    },
    prepare() {
      this.usage.strikes ||= [];
      const w = this.usage.weapon ?? this.actor.equipment.weapons.natural[0];
      if ( w ) this.usage.strikes.push(w);
    }
  },

  hazard: {
    tag: "hazard",
    category: "attack",
    priority: 0,
    internal: true,
    initialize() {
      Object.assign(this.usage, {hasDice: true, defenseType: "physical", resource: "health"});
      this.usage.bonuses.ability = this.usage.hazard;
    },
    async roll(outcome) {
      const n = this.target.multiple ?? 1;
      for ( let i=0; i<n; i++ ) {
        const roll = await outcome.target.receiveAttack(this);
        outcome.rolls.push(roll);
      }
    }
  },

  /* -------------------------------------------- */
  /*  Special Actions                             */
  /* -------------------------------------------- */

  generic: {
    tag: "generic",
    label: "ACTION.TagGeneric",
    tooltip: "ACTION.TagGenericTooltip",
    category: "special",
    priority: 9,
    prepare() {
      this.usage.hasDice = true;
      this.usage.bonuses.enchantment = this.item.system.config?.enchantment.bonus || 0;
      this.usage.defenseType ??= "physical";
      this.usage.resource ??= "health";
      this.usage.damageType ??= "void";
    },
    async roll(outcome) {
      const {bonuses, damageType, defenseType, resource} = this.usage; // TODO outcome.usage?
      const target = outcome.target;

      // Create and evaluate a generic roll
      const roll = new AttackRoll({
        actorId: this.id,
        target: target.uuid,
        ability: bonuses.ability ?? 0,
        skill: bonuses.skill ?? 0,
        enchantment: bonuses.enchantment,
        defenseType,
        dc: target.defenses[defenseType].total
      });
      await roll.evaluate();

      // Compute the final result against defenses
      const r = roll.data.result = target.testDefense(defenseType, roll);
      if ( r < AttackRoll.RESULT_TYPES.GLANCE ) return roll;
      roll.data.damage = {
        overflow: roll.overflow,
        multiplier: 1,
        base: 0,
        bonus: 0,
        resistance: target.getResistance(resource, damageType),
        type: damageType,
        resource: resource,
        restoration: false
      };
      roll.data.damage.total = CrucibleAction.computeDamage(roll.data.damage);
      outcome.rolls.push(roll);
    }
  },

  /* -------------------------------------------- */

  reload: {
    tag: "reload",
    label: "ACTION.TagReload",
    tooltip: "ACTION.TagReloadTooltip",
    category: "special",
    canUse() {
      const {mainhand: m, offhand: o, reload} = this.actor.equipment.weapons;
      if ( !reload || (m.system.loaded && (!o || o.system.loaded)) ) {
        throw new Error("Your weapons do not require reloading");
      }
    },
    prepare() {
      const {mainhand: m, offhand: o} = this.actor.equipment.weapons;
      this.usage.actorUpdates.items ||= [];
      if (m.config.category.reload && !m.system.loaded) {
        this.usage.actorUpdates.items.push({_id: m.id, "system.loaded": true});
      }
      else if (o?.config.category.reload && !o.system.loaded) {
        this.usage.actorUpdates.items.push({_id: o.id, "system.loaded": true});
      }
    }
  },

  /* -------------------------------------------- */

  disarm: {
    tag: "disarm",
    label: "ACTION.TagDisarm",
    tooltip: "ACTION.TagDisarmTooltip",
    category: "special",
    postActivate(outcome) {
      if ( outcome.target === this.actor ) return;
      if ( outcome.rolls.every(r => r.isSuccess) ) {
        const {mainhand} = outcome.target.equipment.weapons; // TODO - allow usage customization?
        if ( !mainhand?.id ) return;
        outcome.actorUpdates.items ||= [];
        outcome.actorUpdates.items.push({_id: mainhand.id, system: {dropped: true, equipped: false}});
        outcome.statusText.push({text: "Disarmed!", fontSize: 64});
      }
    }
  },

  /* -------------------------------------------- */
  /*  Attack Modifiers                            */
  /* -------------------------------------------- */

  deadly: {
    tag: "deadly",
    label: "ACTION.TagDeadly",
    tooltip: "ACTION.TagDeadlyTooltip",
    category: "modifiers",
    prepare() {
      this.usage.bonuses.multiplier += 1;
    },
  },

  difficult: {
    tag: "difficult",
    label: "ACTION.TagDifficult",
    tooltip: "ACTION.TagDifficultTooltip",
    category: "modifiers",
    prepare() {
      this.usage.banes.difficult = {label: "ACTION.TagDifficult", number: 1};
    }
  },

  empowered: {
    tag: "empowered",
    label: "ACTION.TagEmpowered",
    tooltip: "ACTION.TagEmpoweredTooltip",
    category: "modifiers",
    prepare() {
      this.usage.bonuses.damageBonus += 6;
    },
  },
  accurate: {
    tag: "accurate",
    label: "ACTION.TagAccurate",
    tooltip: "ACTION.TagAccurateTooltip",
    category: "modifiers",
    prepare() {
      this.usage.boons.accurate = {label: "ACTION.TagAccurate", number: 2};
    }
  },
  harmless: {
    tag: "harmless",
    label: "ACTION.TagHarmless",
    tooltip: "ACTION.TagHarmlessTooltip",
    category: "modifiers",
    async postActivate(outcome) {
      for ( const roll of outcome.rolls ) {
        if ( roll.data.damage ) roll.data.damage.total = 0;
      }
    }
  },
  weakened: {
    tag: "weakened",
    label: "ACTION.TagWeakened",
    tooltip: "ACTION.TagWeakenedTooltip",
    category: "modifiers",
    prepare() {
      this.usage.bonuses.damageBonus -= 6;
    }
  },

  /* -------------------------------------------- */
  /*  Defense Modifiers                           */
  /* -------------------------------------------- */

  // Target Fortitude
  fortitude: {
    tag: "fortitude",
    label: "Fortitude",
    category: "defenses",
    prepare() {
      this.usage.defenseType = "fortitude";
    },
  },

  // Target Reflex
  reflex: {
    tag: "reflex",
    label: "Reflex",
    category: "defenses",
    prepare() {
      this.usage.defenseType = "reflex";
    },
  },

  // Target Willpower
  willpower: {
    tag: "willpower",
    label: "Willpower",
    category: "defenses",
    prepare() {
      this.usage.defenseType = "willpower";
    },
  },

  /* -------------------------------------------- */
  /*  Healing Actions                             */
  /* -------------------------------------------- */

  healing: {
    tag: "healing",
    label: "ACTION.TagHealing",
    tooltip: "ACTION.TagHealingTooltip",
    category: "damage",
    prepare() {
      this.usage.resource = "health";
      this.usage.defenseType = "wounds";
      this.usage.restoration = true;
    }
  },

  rallying: {
    tag: "rallying",
    label: "ACTION.TagRallying",
    tooltip: "ACTION.TagRallyingTooltip",
    category: "damage",
    prepare() {
      this.usage.resource = "morale";
      this.usage.defenseType = "madness";
      this.usage.restoration = true;
    }
  }
};

/* -------------------------------------------- */
/*  Specialized Damage Type                     */
/* -------------------------------------------- */

for ( const {id, label} of Object.values(DAMAGE_TYPES) ) {
  TAGS[id] = {
    tag: id,
    label: label,
    category: "damage",
    initialize() {
      this.usage.damageType = id;
    }
  };
}

/* -------------------------------------------- */
/*  Specialized Scaling                         */
/* -------------------------------------------- */

for ( const {id, label} of Object.values(ABILITIES) ) {
  TAGS[id] = {
    tag: id,
    label,
    category: "scaling",
    initialize() {
      this.usage.bonuses.ability = this.actor.getAbilityBonus([id]);
    }
  };
}

/* -------------------------------------------- */
/*  Target Resources                            */
/* -------------------------------------------- */

for ( const {id, label} of Object.values(RESOURCES) ) {
  TAGS[id] = {
    tag: id,
    label: label,
    category: "resources",
    initialize() {
      this.usage.resource = id;
    }
  };
}

/* -------------------------------------------- */
/*  Skill Attacks                               */
/* -------------------------------------------- */

// All Skill Attacks
TAGS.skill = {
  tag: "skill",
  label: "Skill",
  category: "skills"
};

// Specific Skills
for ( const {id, label} of Object.values(SKILLS) ) {
  TAGS[id] = {
    tag: id,
    label,
    category: "skills",
    propagate: ["skill"],
    initialize() {
      this.usage.skillId = id;
      const skill = this.actor.skills[id];
      this.usage.hasDice = true;
      Object.assign(this.usage.bonuses, {
        ability: skill.abilityBonus,
        skill: skill.skillBonus,
        enchantment: skill.enchantmentBonus
      });
      Object.assign(this.usage.context, {type: "skill", label: "Skill Tags", icon: "fa-solid fa-cogs"});
      this.usage.context.tags.skill = SKILLS[id].label;
    },
    async roll(outcome) {
      const roll = await this.actor.skillAttack(this, outcome);
      outcome.rolls.push(roll);
    }
  };
}

/* -------------------------------------------- */

/**
 * The default actions that every character can perform regardless of their attributes or talents.
 * @type {object[]}
 */
const DEFAULT_ACTIONS = Object.freeze([

  // Cast Spell
  {
    id: "cast",
    name: "Cast Spell",
    img: "icons/magic/air/air-smoke-casting.webp",
    description: "Weave arcana to create a work of spellcraft.",
    tags: [],
    target: {
      type: "none",
    }
  },

  // Basic Movement
  {
    id: "move",
    name: "Move",
    img: "icons/skills/movement/arrow-upward-yellow.webp",
    description: "Move a distance by spending an amount of Action that depends on your Stride and which movement action is used.",
    target: {
      type: "none",
      number: 0,
      scope: 1
    },
    tags: ["movement"]
  },

  // Defend
  {
    id: "defend",
    name: "Defend",
    img: "icons/magic/defensive/shield-barrier-deflect-teal.webp",
    description: "You concentrate effort on avoiding harm, heightening your physical defense. You gain the "
      + "<strong>Guarded</strong> condition until the start of your next Turn.",
    target: {
      type: "self",
      number: 0,
      scope: 1
    },
    cost: {
      action: 2
    },
    effects: [
      {
        duration: { rounds: 1 },
        statuses: ["guarded"]
      }
    ]
  },

  // Delay
  {
    id: "delay",
    name: "Delay",
    img: "icons/magic/time/clock-analog-gray.webp",
    description: "You delay your action until a later point in the Combat round. Choose an Initiative between 1 and "
      + "the Initiative value of the combatant after you. You will act at this new Initiative value. You may only "
      + "delay your turn once per round.",
    target: {
      type: "self",
      scope: 1
    }
  },

  // Reactive Strike
  {
    id: "reactiveStrike",
    name: "Reactive Strike",
    img: "icons/skills/melee/blade-tip-orange.webp",
    description: "Perform a strike when an enemy leaves your engagement and you are not fully engaged.",
    cost: {
      action: -1,
      focus: 1,
      weapon: true
    },
    range: {
      weapon: true
    },
    target: {
      type: "single",
      number: 1,
      scope: 3
    },
    tags: ["reaction"], // Added to in #prepareDefaultActions
  },

  // Throw Weapon
  {
    id: "throwWeapon",
    name: "Throw Weapon",
    img: "icons/skills/ranged/dagger-thrown-jeweled-green.webp",
    description: "Throw your equipped melee weapon to Strike at a nearby target. The attack suffers from +2 <strong>Banes</strong> and weapon becomes <strong>Dropped</strong>.",
    cost: {
      weapon: true
    },
    target: {
      type: "single",
      number: 1,
      scope: 3
    },
    tags: ["thrown"]
  },

  // Recover
  {
    id: "recover",
    name: "Recover",
    img: "icons/magic/life/cross-area-circle-green-white.webp",
    description: "Spend 10 minutes outside of Combat recovering from exertion to fully restore Health, Morale, Action, and Focus.",
    target: {
      type: "self",
      number: 0,
      scope: 1
    },
    cost: {
      action: 0
    },
    tags: ["noncombat"]
  },

  // Refocus
  {
    id: "refocus",
    name: "Recover Focus",
    img: "icons/magic/light/orb-shadow-blue.webp",
    description: "Use your equipped Talisman to recover Focus.",
    target: {
      type: "self",
      scope: 1
    },
    cost: {
      action: 2
    }
  },

  // Reload
  {
    id: "reload",
    name: "Reload Weapon",
    img: "icons/skills/ranged/arrow-flying-broadhead-metal.webp",
    description: "Reload a ranged weapon which features a reloading time.",
    cost: {
      action: 2
    },
    tags: ["reload"],
    target: {
      type: "self",
    }
  },

  // Rest
  {
    id: "rest",
    name: "Rest",
    img: "icons/magic/time/arrows-circling-green.webp",
    description: "Spend ten hours to fully rest, including time to eat, sleep, tend to wounds, and recover resources.",
    target: {
      type: "self",
      number: 0,
      scope: 1
    },
    cost: {
      action: 0
    },
    tags: ["noncombat"]
  },

  // Basic Strike
  {
    id: "strike",
    name: "Strike",
    img: "icons/skills/melee/blade-tip-orange.webp",
    description: "Attack a single creature or object with one of your equipped weapon.",
    range: {
      weapon: true
    },
    target: {
      type: "single",
      number: 1,
      scope: 3
    },
    cost: {
      action: 0,
      weapon: true
    }
  }
]);var ACTION=/*#__PURE__*/Object.freeze({__proto__:null,DEFAULT_ACTIONS:DEFAULT_ACTIONS,TAGS:TAGS,TAG_CATEGORIES:TAG_CATEGORIES,TARGET_SCOPES:TARGET_SCOPES,TARGET_TYPES:TARGET_TYPES});/**
 * @typedef CrucibleItemCategory            A category of weapon which can exist in the system
 * @property {string} id            The category id
 * @property {string} label         The localized label for the category
 */

/**
 * @typedef ItemQualityTier
 * @property {string} id            The quality tier id
 * @property {string} label         A localized label for the quality tier
 * @property {number} bonus         The numeric bonus for this quality tier
 * @property {number} rarity        The rarity modifier for this quality tier
 */

/**
 * @typedef ItemEnchantmentTier
 * @property {string} id            The enchantment tier id
 * @property {string} label         A localized label for the enchantment tier
 * @property {number} bonus         The numeric bonus for this enchantment tier
 * @property {number} rarity        The rarity modifier for this enchantment tier
 */

/**
 * @typedef ItemProperty
 * @property {string} id            The category id
 * @property {string} label         The localized label for the category
 * @property {number} [rarity]      A rarity modifier that this property adds
 */

/**
 * The possible quality tiers that a physical item can possess.
 * @enum {ItemQualityTier}
 */
const QUALITY_TIERS = {
  shoddy: {
    id: "shoddy",
    label: "ITEM.QualityShoddy",
    bonus: -2,
    rarity: -1
  },
  standard: {
    id: "standard",
    label: "ITEM.QualityStandard",
    bonus: 0,
    rarity: 0
  },
  fine: {
    id: "fine",
    label: "ITEM.QualityFine",
    bonus: 1,
    rarity: 1
  },
  superior: {
    id: "superior",
    label: "ITEM.QualitySuperior",
    bonus: 2,
    rarity: 2
  },
  masterwork: {
    id: "masterwork",
    label: "ITEM.QualityMasterwork",
    bonus: 3,
    rarity: 4
  }
};

/**
 * The possible enchantment tiers that a physical item can possess.
 * @enum {ItemEnchantmentTier}
 */
const ENCHANTMENT_TIERS = {
  mundane: {
    id: "mundane",
    label: "ITEM.EnchantmentMundane",
    bonus: 0,
    rarity: 0
  },
  minor: {
    id: "minor",
    label: "ITEM.EnchantmentMinor",
    bonus: 1,
    rarity: 2
  },
  major: {
    id: "major",
    label: "ITEM.EnchantmentMajor",
    bonus: 2,
    rarity: 4
  },
  legendary: {
    id: "legendary",
    label: "ITEM.EnchantmentLegendary",
    bonus: 3,
    rarity: 6
  }
};

/**
 * Standard physical item properties
 * @type {Record<string, ItemProperty>}
 */
const PROPERTIES$4 = Object.freeze({
  investment: {
    id: "investment",
    label: "ITEM.PROPERTIES.INVESTMENT"
  },
  stackable: {
    id: "stackable",
    label: "ITEM.PROPERTIES.STACKABLE"
  }
});

/**
 * The categories of "loot" items which are allowed.
 * @enum {CrucibleItemCategory}
 */
const LOOT_CATEGORIES = {
  treasure: {
    id: "treasure",
    label: "LOOT.CATEGORIES.TREASURE"
  },
  ingredient: {
    id: "ingredient",
    label: "LOOT.CATEGORIES.INGREDIENT"
  },
  other: {
    id: "other",
    label: "LOOT.CATEGORIES.OTHER"
  }
};

/**
 * The item types which are physical items.
 * @type {Set<string>}
 */
const PHYSICAL_ITEM_TYPES = new Set(["accessory", "armor", "consumable", "loot", "schematic", "weapon"]);

/**
 * The item types which can be equipped.
 * @type {Set<string>}
 */
const EQUIPABLE_ITEM_TYPES = new Set(["accessory", "armor", "consumable", "weapon"]);

/**
 * The categories of "schematic" items which are allowed.
 * These categories map 1:1 to the tradecraft skills which are available in the system.
 * @enum {CrucibleItemCategory}
 */
const SCHEMATIC_CATEGORIES = {
  alchemy: {id: "alchemy", label: "SCHEMATIC.CATEGORIES.ALCHEMY"},
  cooking: {id: "cooking", label: "SCHEMATIC.CATEGORIES.COOKING"},
  enchanting: {id: "enchanting", label: "SCHEMATIC.CATEGORIES.ENCHANTING"},
  fletching: {id: "fletching", label: "SCHEMATIC.CATEGORIES.FLETCHING"},
  jewelcraft: {id: "jewelcraft", label: "SCHEMATIC.CATEGORIES.JEWELCRAFT"},
  runeweaving: {id: "runeweaving", label: "SCHEMATIC.CATEGORIES.RUNEWEAVING"},
  smithing: {id: "smithing", label: "SCHEMATIC.CATEGORIES.SMITHING"},
  tailoring: {id: "tailoring", label: "SCHEMATIC.CATEGORIES.TAILORING"}
};

/**
 * The boolean properties that a "schematic" is able to have.
 * @type {Record<string, ItemProperty>}
 */
const SCHEMATIC_PROPERTIES = {
  common: {id: "common", label: "SCHEMATIC.PROPERTIES.COMMON"}
};var ITEM=/*#__PURE__*/Object.freeze({__proto__:null,ENCHANTMENT_TIERS:ENCHANTMENT_TIERS,EQUIPABLE_ITEM_TYPES:EQUIPABLE_ITEM_TYPES,LOOT_CATEGORIES:LOOT_CATEGORIES,PHYSICAL_ITEM_TYPES:PHYSICAL_ITEM_TYPES,PROPERTIES:PROPERTIES$4,QUALITY_TIERS:QUALITY_TIERS,SCHEMATIC_CATEGORIES:SCHEMATIC_CATEGORIES,SCHEMATIC_PROPERTIES:SCHEMATIC_PROPERTIES});/**
 * @import {CrucibleItemCategory} from "./items.mjs";
 */

/**
 * @typedef {CrucibleItemCategory} CrucibleArmorCategory
 * @property {string} id
 * @property {string} label
 * @property {{min: number, max: number}} armor
 * @property {{scaling: number, base: (number) => number}} dodge
 */

/**
 * Named armor categories which are allowed by the system
 * @enum {CrucibleArmorCategory}
 */
const CATEGORIES$3 = {
  unarmored: {
    id: "unarmored",
    label: "ARMOR.CATEGORIES.UNARMORED",
    armor: {min: 0, max: 0},
    dodge: {scaling: 0, base: _a => 8}
  },
  light: {
    id: "light",
    label: "ARMOR.CATEGORIES.LIGHT",
    armor: {min: 4, max: 8},
    dodge: {scaling: 4, base: a => 10 - Math.floor(a / 2)}
  },
  medium: {
    id: "medium",
    label: "ARMOR.CATEGORIES.MEDIUM",
    armor: {min: 9, max: 13},
    dodge: {scaling: 6, base: a => 10 - Math.floor((a+1) / 2)}
  },
  heavy: {
    id: "heavy",
    label: "ARMOR.CATEGORIES.HEAVY",
    armor: {min: 14, max: 18},
    dodge: {scaling: 8, base: a => 10 - Math.floor((a+2) / 2)}
  },
  natural: {
    id: "natural",
    label: "ARMOR.CATEGORIES.NATURAL",
    armor: {min: 4, max: 18},
    dodge: {scaling: 2, base: a => 10 - Math.floor(a / 2)}
  }
};

/**
 * The boolean properties which a piece of Armor can have.
 * @type {Record<string, {label: string, [rarity]: number}>}
 */
const PROPERTIES$3 = {
  ...foundry.utils.deepClone(PROPERTIES$4),
  bulky: {
    label: "ARMOR.PROPERTIES.BULKY"
  },
  organic: {
    label: "ARMOR.PROPERTIES.ORGANIC"
  },
  noisy: {
    label: "ARMOR.PROPERTIES.NOISY"
  }
};

/**
 * Data representing the default "unarmored" armor item.
 * @type {ItemData}
 */
const UNARMORED_DATA = {
  name: "Unarmored",
  img: "icons/equipment/chest/shirt-simple-white.webp",
  type: "armor",
  system: {
    category: "unarmored",
    armor: 0
  }
};var ARMOR=/*#__PURE__*/Object.freeze({__proto__:null,CATEGORIES:CATEGORIES$3,PROPERTIES:PROPERTIES$3,UNARMORED_DATA:UNARMORED_DATA});/**
 * @import {CrucibleItemCategory} from "./items.mjs";
 */

/**
 * Named accessory categories which are allowed by the system.
 * @enum {CrucibleItemCategory}
 */
const CATEGORIES$2 = {
  ammunition: {
    id: "ammunition",
    label: "CONSUMABLE.CATEGORIES.AMMUNITION"
  },
  bomb: {
    id: "bomb",
    label: "CONSUMABLE.CATEGORIES.BOMB"
  },
  flask: {
    id: "flask",
    label: "CONSUMABLE.CATEGORIES.FLASK"
  },
  kit: {
    id: "kit",
    label: "CONSUMABLE.CATEGORIES.KIT"
  },
  other: {
    id: "other",
    label: "CONSUMABLE.CATEGORIES.OTHER"
  }
};

/**
 * Item properties that accessory Items can have.
 * @enum {CrucibleItemCategory}
 */
const PROPERTIES$2 = {
  ...PROPERTIES$4,
  thrown: {
    label: "WEAPON.TAGS.Thrown",
    tooltip: "WEAPON.TAGS.ThrownTooltip"
  },
};var CONSUMABLE=/*#__PURE__*/Object.freeze({__proto__:null,CATEGORIES:CATEGORIES$2,PROPERTIES:PROPERTIES$2});const checkDifficulties = {
  10: "Trivial",
  15: "Easy",
  20: "Moderate",
  25: "Challenging",
  30: "Difficult",
  35: "Formidable",
  45: "Impossible"
};



const passiveCheck = 10;


const MAX_BOONS = 6;
const MAX_BANES = 6;
const DIE_STEP = 2;
const MIN_DIE = 4;
const MAX_DIE = 12;var dice$1=/*#__PURE__*/Object.freeze({__proto__:null,DIE_STEP:DIE_STEP,MAX_BANES:MAX_BANES,MAX_BOONS:MAX_BOONS,MAX_DIE:MAX_DIE,MIN_DIE:MIN_DIE,checkDifficulties:checkDifficulties,passiveCheck:passiveCheck});/**
 * @typedef CrucibleDoTConfig
 * @property {string} [ability]
 * @property {number} [amount]
 * @property {string} [damageType]
 * @property {number} [turns=3]
 * @property {CrucibleActor} [target]
 */

/**
 * Get a standardized 16 character ID that can be used for the ActiveEffect.
 * @param {string} label    The active effect label
 * @returns {string}        The standardized ID
 */
function getEffectId(label) {
  return label.slugify({replacement: "", lowercase: false, strict: true}).slice(0, 16).padEnd(16, "0");
}

/**
 * Generate a standardized bleeding effect.
 * Bleeding deals dexterity in damage to Health.
 * @param {CrucibleActor} actor
 * @param {CrucibleDoTConfig} options
 * @returns {Partial<ActiveEffectData>}
 */
function bleeding(actor, {ability="dexterity", amount, turns=3, damageType="piercing"}={}) {
  amount ??= actor.system.abilities[ability].value;
  return {
    _id: getEffectId("Bleeding"),
    name: "Bleeding",
    icon: "icons/skills/wounds/blood-spurt-spray-red.webp",
    duration: {turns},
    origin: actor.uuid,
    statuses: ["bleeding"],
    flags: {
      crucible: {
        dot: {
          health: amount,
          damageType
        }
      }
    }
  }
}

/**
 * Generate a standardized burning effect.
 * Burning deals half intellect in damage to both Health and Morale.
 * @param {CrucibleActor} actor
 * @param {CrucibleDoTConfig} options
 * @returns {Partial<ActiveEffectData>}
 */
function burning(actor, {ability="intellect", amount, turns=3}={}) {
  amount ??= Math.ceil(actor.system.abilities[ability].value / 2);
  return {
    _id: getEffectId("Burning"),
    name: "Burning",
    icon: "icons/magic/fire/projectile-smoke-swirl-red.webp",
    duration: {turns},
    origin: actor.uuid,
    statuses: ["burning"],
    flags: {
      crucible: {
        dot: {
          health: amount,
          morale: amount,
          damageType: "fire"
        }
      }
    }
  }
}

/**
 * Generate a standardized freezing effect.
 * Freezing deals half wisdom in damage to Health and also causes slowed.
 * @param {CrucibleActor} actor
 * @param {CrucibleDoTConfig} options
 * @returns {Partial<ActiveEffectData>}
 */
function freezing(actor, {ability="wisdom", amount, turns=1}={}) {
  amount ??= Math.ceil(actor.system.abilities[ability].value / 2);
  return {
    _id: getEffectId("Freezing"),
    name: "Freezing",
    icon: "icons/magic/water/orb-ice-web.webp",
    duration: {turns},
    origin: actor.uuid,
    statuses: ["freezing", "slowed"],
    flags: {
      crucible: {
        dot: {
          health: amount,
          damageType: "cold"
        }
      }
    }
  }
}

/**
 * Generate a standardized confused effect.
 * Confused deals half intellect in damage to Morale and inflicts the Disoriented condition.
 * @param {CrucibleActor} actor
 * @param {CrucibleDoTConfig} options
 * @returns {Partial<ActiveEffectData>}
 */
function confused(actor, {ability="intellect", amount, turns=2}={}) {
  amount ??= Math.ceil(actor.system.abilities[ability].value / 2);
  return {
    _id: getEffectId("Confused"),
    name: "Confused",
    icon: "icons/magic/air/air-burst-spiral-pink.webp",
    duration: {turns},
    origin: actor.uuid,
    statuses: ["confused", "disoriented"],
    flags: {
      crucible: {
        dot: {
          morale: amount,
          damageType: "psychic"
        }
      }
    }
  }
}

/**
 * Generate a standardized corroding effect.
 * Corroding deals half wisdom in damage to Health.
 * @param {CrucibleActor} actor
 * @param {CrucibleDoTConfig} options
 * @returns {Partial<ActiveEffectData>}
 */
function corroding(actor, {ability="wisdom", amount, turns=3}={}) {
  amount ??= actor.system.abilities[ability].value;
  return {
    _id: getEffectId("Corroding"),
    name: "Corroding",
    icon: "icons/magic/earth/orb-stone-smoke-teal.webp",
    duration: {turns},
    origin: actor.uuid,
    flags: {
      crucible: {
        dot: {health: amount, damageType: "acid"}
      }
    }
  }
}

// TODO as above
function decay(actor) {
  return {
    _id: getEffectId("Decaying"),
    name: "Decaying",
    icon: "icons/magic/unholy/strike-beam-blood-red-purple.webp",
    duration: {turns: 3},
    origin: actor.uuid,
    flags: {
      crucible: {
        dot: {
          health: actor.system.abilities.intellect.value,
          damageType: "corruption"
        }
      }
    }
  }
}

// TODO as above
function entropy(actor) {
  return {
    _id: getEffectId("Entropy"),
    name: "Entropy",
    icon: "icons/magic/unholy/orb-swirling-teal.webp",
    duration: {turns: 1},
    origin: actor.uuid,
    statuses: ["frightened"],
    flags: {
      crucible: {
        dot: {
          health: Math.floor(actor.system.abilities.presence.value / 2),
          damageType: "void"
        }
      }
    }
  }
}

// TODO as above
function irradiated(actor) {
  return {
    _id: getEffectId("Irradiated"),
    name: "Irradiated",
    icon: "icons/magic/light/beams-rays-orange-purple-large.webp",
    duration: {turns: 1},
    origin: actor.uuid,
    flags: {
      crucible: {
        dot: {
          health: actor.system.abilities.presence.value,
          morale: actor.system.abilities.presence.value,
          damageType: "radiant"
        }
      }
    }
  }
}

// TODO as above
function mending(actor, target) {
  return {
    _id: getEffectId("Mending"),
    name: "Mending",
    icon: "icons/magic/life/cross-beam-green.webp",
    duration: {turns: 1},
    origin: actor.uuid,
    flags: {
      crucible: {
        dot: {
          health: -actor.system.abilities.wisdom.value
        }
      }
    }
  }
}

// TODO as above
function inspired(actor, target) {
  return {
    _id: getEffectId("Inspired"),
    name: "Inspired",
    icon: "icons/magic/light/explosion-star-glow-silhouette.webp",
    duration: {turns: 1},
    origin: actor.uuid,
    flags: {
      crucible: {
        dot: {
          morale: -actor.system.abilities.presence.value
        }
      }
    }
  }
}

/**
 * Generate a standardized poisoned effect.
 * Poisoned deals the creatures toughness value in damage to Health.
 * @param {CrucibleActor} actor
 * @param {CrucibleDoTConfig} options
 * @returns {Partial<ActiveEffectData>}
 */
function poisoned(actor, {ability="toughness", amount, turns=6}={}) {
  amount ??= actor.system.abilities[ability].value;
  return {
    _id: getEffectId("Poisoned"),
    name: "Poisoned",
    icon: "icons/magic/unholy/orb-smoking-green.webp",
    duration: {turns},
    origin: actor.uuid,
    statuses: ["poisoned"],
    flags: {
      crucible: {
        dot: {
          health: amount,
          damageType: "poison"
        }
      }
    }
  }
}

/**
 * Generate a standardized shocked effect.
 * Freezing deals half wisdom in damage to Health.
 * @param {CrucibleActor} actor
 * @param {CrucibleDoTConfig} options
 * @returns {Partial<ActiveEffectData>}
 */
function shocked(actor, {ability="intellect", amount, turns=3}={}) {
  amount ??= actor.system.abilities[ability].value;
  return {
    _id: getEffectId("Shocked"),
    name: "Shocked",
    icon: "icons/magic/lightning/bolt-strike-forked-blue.webp",
    duration: {turns},
    origin: actor.uuid,
    statuses: ["shocked"],
    flags: {
      crucible: {
        dot: {
          morale: amount,
          damageType: "electricity"
        }
      }
    }
  }
}

// TODO as above
function staggered(actor, target) {
  return {
    _id: getEffectId("Staggered"),
    name: "Staggered",
    icon: "icons/skills/melee/strike-hammer-destructive-orange.webp",
    duration: {turns: 1},
    origin: actor.uuid,
    statuses: ["staggered"]
  }
}var EFFECTS=/*#__PURE__*/Object.freeze({__proto__:null,bleeding:bleeding,burning:burning,confused:confused,corroding:corroding,decay:decay,entropy:entropy,freezing:freezing,getEffectId:getEffectId,inspired:inspired,irradiated:irradiated,mending:mending,poisoned:poisoned,shocked:shocked,staggered:staggered});const NAME_FORMATS = Object.freeze({
  NOUN: 1,
  ADJ: 2
});

/**
 * The Arcane Runes which exist in the Crucible spellcraft system.
 * These config objects are instantiated as CrucibleSpellcraftRune instances during system initialization.
 * @enum {object}
 */
const RUNES = Object.seal({
  death: {
    id: "death",
    name: "SPELL.RUNES.Death",
    img: "icons/magic/unholy/hand-claw-fire-blue.webp",
    resource: "health",
    damageType: "corruption",
    opposed: "life",
    defense: "fortitude",
    scaling: "intellect",
    nameFormat: NAME_FORMATS.NOUN
  },
  earth: {
    id: "earth",
    name: "SPELL.RUNES.Earth",
    img: "icons/magic/earth/projectile-boulder-debris.webp",
    resource: "health",
    damageType: "acid",
    opposed: "lightning",
    defense: "reflex",
    scaling: "wisdom",
    nameFormat: NAME_FORMATS.ADJ
  },
  flame: {
    id: "flame",
    name: "SPELL.RUNES.Flame",
    img: "icons/magic/fire/barrier-wall-flame-ring-yellow.webp",
    resource: "health",
    damageType: "fire",
    opposed: "frost",
    defense: "reflex",
    scaling: "intellect",
    nameFormat: NAME_FORMATS.NOUN
  },
  frost: {
    id: "frost",
    name: "SPELL.RUNES.Frost",
    img: "icons/magic/water/snowflake-ice-snow-white.webp",
    resource: "health",
    damageType: "cold",
    opposed: "flame",
    defense: "fortitude",
    scaling: "wisdom",
    nameFormat: NAME_FORMATS.NOUN
  },
  illumination: {
    id: "illumination",
    name: "SPELL.RUNES.Illumination",
    img: "icons/magic/light/projectile-beam-yellow.webp",
    resource: "health",
    damageType: "radiant",
    opposed: "shadow",
    defense: "willpower",
    scaling: "presence",
    nameFormat: NAME_FORMATS.ADJ
  },
  kinesis: {
    id: "kinesis",
    name: "SPELL.RUNES.Kinesis",
    img: "icons/magic/movement/pinwheel-turning-blue.webp",
    resource: "health",
    damageType: "physical",
    opposed: "stasis",
    defense: "physical",
    scaling: "presence",
    nameFormat: NAME_FORMATS.ADJ
  },
  life: {
    id: "life",
    name: "SPELL.RUNES.Life",
    img: "icons/magic/life/heart-shadow-red.webp",
    resource: "health",
    restoration: true,
    damageType: "poison",
    opposed: "death",
    defense: "fortitude",
    scaling: "wisdom",
    nameFormat: NAME_FORMATS.NOUN
  },
  lightning: {
    id: "lightning",
    name: "SPELL.RUNES.Lightning",
    img: "icons/magic/lightning/bolt-strike-blue.webp",
    resource: "health",
    damageType: "electricity",
    opposed: "earth",
    defense: "reflex",
    scaling: "intellect",
    nameFormat: NAME_FORMATS.ADJ
  },
  control: {
    id: "control",
    name: "SPELL.RUNES.Control",
    img: "icons/magic/control/hypnosis-mesmerism-eye.webp",
    resource: "morale",
    damageType: "psychic",
    opposed: "spirit",
    defense: "willpower",
    scaling: "intellect",
    nameFormat: NAME_FORMATS.NOUN
  },
  shadow: {
    id: "shadow",
    name: "SPELL.RUNES.Shadow",
    img: "icons/magic/unholy/orb-rays-blue.webp",
    resource: "morale",
    damageType: "void",
    opposed: "illumination",
    defense: "fortitude",
    scaling: "presence",
    nameFormat: NAME_FORMATS.ADJ
  },
  spirit: {
    id: "spirit",
    name: "SPELL.RUNES.Spirit",
    img: "icons/magic/control/fear-fright-white.webp",
    resource: "morale",
    restoration: true,
    damageType: "psychic",
    opposed: "control",
    defense: "willpower",
    scaling: "presence",
    nameFormat: NAME_FORMATS.NOUN
  },
  stasis: {
    id: "stasis",
    name: "SPELL.RUNES.Stasis",
    img: "icons/magic/time/clock-spinning-gold-pink.webp",
    resource: "morale",
    damageType: "physical",
    opposed: "kinesis",
    defense: "willpower",
    scaling: "wisdom",
    nameFormat: NAME_FORMATS.ADJ
  }
});

/**
 * The Somatic Gestures which exist in the Crucible spellcraft system.
 * These config objects are instantiated as CrucibleSpellcraftGesture instances during system initialization.
 * @enum {object}
 */
const GESTURES = Object.seal({
  arrow: {
    id: "arrow",
    name: "SPELL.GESTURES.Arrow",
    cost: {
      action: 3,
      focus: 1
    },
    damage: {
      base: 8
    },
    hands: 1,
    range: {
      minimum: 1,
      maximum: 60
    },
    scaling: "intellect",
    target: {
      type: "single",
      number: 1
    }
  },
  aspect: {
    id: "aspect",
    name: "SPELL.GESTURES.Aspect",
    cost: {
      action: 2,
      focus: 1
    },
    hands: 1,
    nameFormat: NAME_FORMATS.NOUN,
    scaling: "wisdom",
    target: {
      type: "self"
    }
  },
  create: {
    id: "create",
    name: "SPELL.GESTURES.Create",
    cost: {
      action: 4,
      focus: 1
    },
    hands: 2,
    range: {
      maximum: 10
    },
    nameFormat: NAME_FORMATS.ADJ,
    scaling: "wisdom",
    target: {
      type: "summon"
    }
  },
  fan: {
    id: "fan",
    name: "SPELL.GESTURES.Fan",
    cost: {
      action: 3,
      focus: 1
    },
    damage: {
      base: 6
    },
    hands: 1,
    range: {
      maximum: 6
    },
    scaling: "intellect",
    target: {
      type: "fan"
    }
  },
  influence: {
    id: "influence",
    name: "SPELL.GESTURES.Influence",
    cost: {
      action: 3,
      focus: 1
    },
    damage: {
      base: 10
    },
    hands: 1,
    range: {
      maximum: 1
    },
    nameFormat: NAME_FORMATS.ADJ,
    scaling: "presence",
    target: {
      type: "single"
    }
  },
  pulse: {
    id: "pulse",
    name: "SPELL.GESTURES.Pulse",
    cost: {
      action: 4,
      focus: 1
    },
    damage: {
      base: 6
    },
    hands: 2,
    range: {
      maximum: 0
    },
    scaling: "presence",
    target: {
      type: "pulse",
      size: 6
    }
  },
  ray: {
    id: "ray",
    name: "SPELL.GESTURES.Ray",
    cost: {
      action: 4,
      focus: 1
    },
    damage: {
      base: 6
    },
    hands: 1,
    range: {
      maximum: 30
    },
    scaling: "wisdom",
    target: {
      type: "ray",
      size: 1
    }
  },
  step: {
    id: "step",
    name: "SPELL.GESTURES.Step",
    cost: {
      action: 1,
      focus: 1
    },
    damage: {
      base: 2
    },
    hands: 0,
    range: {
      maximum: 0
    },
    nameFormat: NAME_FORMATS.ADJ,
    scaling: "dexterity",
    target: {
      type: "ray",
      distance: 20
    }
  },
  strike: {
    id: "strike",
    name: "SPELL.GESTURES.Strike",
    cost: {
      action: 0,
      focus: 1,
      weapon: true
    },
    damage: {},
    hands: 0,
    range: {
      weapon: true
    },
    nameFormat: NAME_FORMATS.ADJ,
    scaling: "strength",
    target: {
      type: "single"
    }
  },
  touch: {
    id: "touch",
    name: "SPELL.GESTURES.Touch",
    img: "icons/magic/light/hand-sparks-smoke-teal.webp",
    description: "<p>Touch is one of the most universal somatic gestures. This gesture is easily performed and is typically the first gesture learned by novice spellcasters.</p><p>Touch-based spells cause a small amount of damage or healing, but can be performed quickly requiring less Action than more complex gestures.</p>",
    cost: {
      action: 2,
      focus: 1
    },
    damage: {
      base: 6
    },
    hands: 1,
    range: {
      maximum: 1
    },
    scaling: "dexterity",
    target: {
      type: "single"
    }
  },
  ward: {
    id: "ward",
    name: "SPELL.GESTURES.Ward",
    cost: {
      action: 2,
      focus: 1
    },
    damage: {
      base: 6
    },
    hands: 1,
    scaling: "toughness",
    target: {
      type: "self"
    }
  }
});

/**
 * The Metamagic Inflections which exist in the Crucible spellcraft system.
 * These config objects are instantiated as CrucibleSpellcraftInflection instances during system initialization.
 * Until that occurs, this object can be mutated by downstream modules to register additional inflection types.
 * After initialization, this record becomes frozen and can no longer be extended.
 * @type {Record<string, object>}
 */
const INFLECTIONS = {
  compose: {
    id: "compose",
    name: "SPELL.INFLECTIONS.Compose",
    cost: {
      action: 1,
      focus: -1
    }
  },
  determine: {
    id: "determine",
    name: "SPELL.INFLECTIONS.Determine",
    cost: {
      focus: 1
    }
  },
  quicken: {
    id: "quicken",
    name: "SPELL.INFLECTIONS.Quicken",
    cost: {
      action: -1,
      focus: 1
    }
  },
  extend: {
    id: "extend",
    name: "SPELL.INFLECTIONS.Extend",
    cost: {
      action: 1,
      focus: 1
    }
  },
  eluding: {
    id: "eluding",
    name: "SPELL.INFLECTIONS.Elude",
    cost: {
      focus: 1
    }
  },
  negate: {
    id: "negate",
    name: "SPELL.INFLECTIONS.Negate",
    cost: {
      focus: 1
    }
  },
  pull: {
    id: "pull",
    name: "SPELL.INFLECTIONS.Pull",
    cost: {
      focus: 1
    }
  },
  push: {
    id: "push",
    name: "SPELL.INFLECTIONS.Push",
    cost: {
      focus: 1
    }
  },
  reshape: {
    id: "reshape",
    name: "SPELL.INFLECTIONS.Reshape",
    cost: {
      focus: 2
    },
    hooks: {
      prepare() {
        if ( this.damage.restoration ) this.target.scope = SYSTEM.ACTION.TARGET_SCOPES.ALLIES;
        else this.target.scope = SYSTEM.ACTION.TARGET_SCOPES.ENEMIES;
      }
    }
  }
};


const CREATION_SUMMONS =  {
  death: "Compendium.crucible.summons.Actor.56puGK932Qc0cowe",
  earth: "Compendium.crucible.summons.Actor.xTFgTg5Rh2s0s5gZ",
  flame: "Compendium.crucible.summons.Actor.RuNh1bFGiHKdHeKI",
  frost: "Compendium.crucible.summons.Actor.me5glbOshiijlVUH",
  lightning: "Compendium.crucible.summons.Actor.Ne25xsSqYijgcrm0",
  fallback: "Compendium.crucible.summons.Actor.RuNh1bFGiHKdHeKI" // FIXME temporary
};var SPELL=/*#__PURE__*/Object.freeze({__proto__:null,CREATION_SUMMONS:CREATION_SUMMONS,GESTURES:GESTURES,INFLECTIONS:INFLECTIONS,NAME_FORMATS:NAME_FORMATS,RUNES:RUNES});/**
 * @typedef {"talisman"|"heavy"|"light"|"mechanical"|"natural"|"projectile"|"shield"|"simple"|"unarmed"} WeaponTrainingTypes
 */

/**
 * Training categories which apply to weapons.
 * @type {Record<WeaponTrainingTypes, {label: string}>}
 **/
const TRAINING$1 = Object.freeze({
  talisman: {label: "WEAPON.CATEGORIES.TALISMAN"},
  heavy: {label: "WEAPON.CATEGORIES.HEAVY"},
  light: {label: "WEAPON.CATEGORIES.LIGHT"},
  mechanical: {label: "WEAPON.CATEGORIES.MECHANICAL"},
  natural: {label: "WEAPON.TAGS.Natural"},
  projectile: {label: "WEAPON.CATEGORIES.PROJECTILE"},
  shield: {label: "WEAPON.CATEGORIES.SHIELD"},
  simple: {label: "WEAPON.CATEGORIES.SIMPLE"},
  unarmed: {label: "WEAPON.CATEGORIES.UNARMED"}
});

// Helper function for labeling categories
const label = (category, hands) => {
  category = game.i18n.localize(category);
  return game.i18n.format("WEAPON.CATEGORIES.CATEGORY_HANDS", {category, hands});
};

/**
 * Enumerate the weapon categories which are allowed by the system.
 * Record certain mechanical metadata which applies to weapons in each category.
 * @type {Record<string, WeaponCategory>}
 */
const CATEGORIES$1 = Object.freeze({

  // One-Handed Melee
  unarmed: {
    id: "unarmed",
    label: "WEAPON.CATEGORIES.UNARMED",
    hands: 1,
    main: true,
    off: true,
    scaling: "strength.dexterity",
    actionCost: 2,
    damage: 3,
    range: 1,
    training: ["unarmed"]
  },
  light1: {
    id: "light1",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.LIGHT", 1),
    hands: 1,
    main: true,
    off: true,
    scaling: "dexterity",
    actionCost: 2,
    damage: 3,
    range: 1,
    training: ["light"]
  },
  simple1: {
    id: "simple1",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.SIMPLE", 1),
    hands: 1,
    main: true,
    off: true,
    scaling: "strength",
    damage: 4,
    actionCost: 2,
    range: 1,
    training: ["heavy"]
  },
  balanced1: {
    id: "balanced1",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.BALANCED", 1),
    hands: 1,
    main: true,
    off: true,
    scaling: "strength.dexterity",
    damage: 5,
    actionCost: 2,
    range: 2,
    training: ["heavy", "light"]
  },
  heavy1: {
    id: "heavy1",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.HEAVY", 1),
    hands: 1,
    main: true,
    off: false,
    scaling: "strength",
    damage: 6,
    actionCost: 3,
    range: 2,
    training: ["heavy"]
  },

  // Two-Handed Melee
  simple2: {
    id: "simple2",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.SIMPLE", 2),
    hands: 2,
    main: true,
    off: false,
    scaling: "strength",
    actionCost: 3,
    damage: 6,
    range: 2,
    training: ["heavy"]
  },
  balanced2: {
    id: "balanced2",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.BALANCED", 2),
    hands: 2,
    main: true,
    off: false,
    scaling: "strength.dexterity",
    damage: 7,
    actionCost: 3,
    range: 3,
    training: ["light", "heavy"]
  },
  heavy2: {
    id: "heavy2",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.HEAVY", 2),
    hands: 2,
    main: true,
    off: false,
    scaling: "strength",
    damage: 8,
    actionCost: 4,
    range: 3,
    training: ["heavy"]
  },

  // One-Handed Ranged
  projectile1: {
    id: "projectile1",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.PROJECTILE", 1),
    hands: 1,
    main: true,
    off: true,
    ranged: true,
    scaling: "strength.dexterity",
    actionCost: 2,
    damage: 4,
    range: 60,
    training: ["projectile"]
  },
  talisman1: {
    id: "talisman1",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.TALISMAN", 1),
    hands: 1,
    main: true,
    off: true,
    ranged: true,
    scaling: "presence",
    actionCost: 2,
    damage: 2,
    range: 30,
    training: ["talisman"]
  },
  mechanical1: {
    id: "mechanical1",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.MECHANICAL", 1),
    hands: 1,
    main: true,
    off: true,
    ranged: true,
    reload: true,
    scaling: "dexterity",
    actionCost: 2,
    damage: 4,
    range: 60,
    training: ["mechanical"]
  },

  // Two-Handed Ranged
  projectile2: {
    id: "projectile2",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.PROJECTILE", 2),
    hands: 2,
    main: true,
    off: false,
    ranged: true,
    scaling: "strength.dexterity",
    actionCost: 3,
    damage: 6,
    range: 120,
    training: ["projectile"]
  },
  talisman2: {
    id: "talisman2",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.TALISMAN", 2),
    hands: 2,
    main: true,
    off: false,
    ranged: true,
    scaling: "presence",
    actionCost: 3,
    damage: 3,
    range: 30,
    training: ["talisman"]
  },
  mechanical2: {
    id: "mechanical2",
    label: label.bind(globalThis, "WEAPON.CATEGORIES.MECHANICAL", 2),
    hands: 2,
    main: true,
    off: false,
    ranged: true,
    reload: true,
    scaling: "dexterity",
    actionCost: 2,
    damage: 6,
    range: 120,
    training: ["mechanical"]
  },

  // Shields
  shieldLight: {
    id: "shieldLight",
    label: "WEAPON.CATEGORIES.SHIELD_LIGHT",
    hands: 1,
    main: false,
    off: true,
    ranged: false,
    scaling: "dexterity",
    actionCost: 2,
    damage: 2,
    defense: {
      block: 2
    },
    range: 1,
    training: ["shield"]
  },
  shieldHeavy: {
    id: "shieldHeavy",
    label: "WEAPON.CATEGORIES.SHIELD_HEAVY",
    hands: 1,
    main: false,
    off: true,
    ranged: false,
    scaling: "strength",
    actionCost: 2,
    damage: 3,
    range: 1,
    defense: {
      block: 4
    },
    training: ["shield"]
  }
});

/**
 * The boolean properties which a Weapon may have.
 * @enum {{label: string, tooltip: string, [rarity]: number}}
 */
const PROPERTIES$1 = {
  ...foundry.utils.deepClone(PROPERTIES$4),
  ambush: {
    label: "WEAPON.TAGS.Ambush",
    tooltip: "WEAPON.TAGS.AmbushTooltip"
  },
  blocking: {
    label: "WEAPON.TAGS.Blocking",
    tooltip: "WEAPON.TAGS.BlockingTooltip"
  },
  engaging: {
    label: "WEAPON.TAGS.Engaging",
    tooltip: "WEAPON.TAGS.EngagingTooltip"
  },
  keen: {
    label: "WEAPON.TAGS.Keen",
    tooltip: "WEAPON.TAGS.KeenTooltip",
    rarity: 1
  },
  natural: {
    label: "WEAPON.TAGS.Natural",
    tooltip: "WEAPON.TAGS.NaturalTooltip",
  },
  oversized: {
    label: "WEAPON.TAGS.Oversized",
    tooltip: "WEAPON.TAGS.OversizedTooltip"
  },
  parrying: {
    label: "WEAPON.TAGS.Parrying",
    tooltip: "WEAPON.TAGS.ParryingTooltip"
  },
  reach: {
    label: "WEAPON.TAGS.Reach",
    tooltip: "WEAPON.TAGS.ReachTooltip"
  },
  reliable: {
    label: "WEAPON.TAGS.Reliable",
    tooltip: "WEAPON.TAGS.ReliableTooltip",
    rarity: 1
  },
  returning: {
    label: "WEAPON.TAGS.Returning",
    tooltip: "WEAPON.TAGS.ReturningTooltip",
    rarity: 1
  },
  thrown: {
    label: "WEAPON.TAGS.Thrown",
    tooltip: "WEAPON.TAGS.ThrownTooltip"
  },
  versatile: {
    label: "WEAPON.TAGS.Versatile",
    tooltip: "WEAPON.TAGS.VersatileTooltip"
  }
};

/**
 * Designate which equipped slot the weapon is used in.
 * @type {Enum<number>}
 */
const SLOTS = new Enum({
  EITHER: {value: 0, label: "WEAPON.SLOTS.EITHER"},
  MAINHAND: {value: 1, label: "WEAPON.SLOTS.MAINHAND"},
  OFFHAND: {value: 2, label: "WEAPON.SLOTS.OFFHAND"},
  TWOHAND: {value: 3, label: "WEAPON.SLOTS.TWOHAND"}
});

/**
 * The configuration of the default unarmed Weapon.
 * @type {object}
 */
const UNARMED_DATA = {
  name: "Unarmed",
  type: "weapon",
  img: "icons/skills/melee/unarmed-punch-fist.webp",
  system: {
    category: "unarmed",
    quality: "standard",
    enchantment: "mundane",
    damageType: "bludgeoning"
  }
};

/**
 * A special weapon configuration used for Nosferatu bite attack.
 * @type {CrucibleWeaponItem}
 */
const VAMPIRE_BITE = {
  name: "Vampire Bite",
  type: "weapon",
  img: "icons/magic/death/mouth-bite-fangs-vampire.webp",
  system: {
    category: "balanced1",
    quality: "superior",
    enchantment: "mundane",
    damageType: "piercing",
    properties: ["natural"]
  }
};var WEAPON=/*#__PURE__*/Object.freeze({__proto__:null,CATEGORIES:CATEGORIES$1,PROPERTIES:PROPERTIES$1,SLOTS:SLOTS,TRAINING:TRAINING$1,UNARMED_DATA:UNARMED_DATA,VAMPIRE_BITE:VAMPIRE_BITE});/**
 * @import {CrucibleItemCategory} from "./items.mjs";
 */

/**
 * Named accessory categories which are allowed by the system.
 * @enum {CrucibleItemCategory}
 */
const CATEGORIES = {
  clothing: {
    id: "clothing",
    label: "ACCESSORY.CATEGORIES.CLOTHING"
  },
  jewelry: {
    id: "jewelry",
    label: "ACCESSORY.CATEGORIES.JEWELRY"
  },
  trinket: {
    id: "trinket",
    label: "ACCESSORY.CATEGORIES.TRINKET"
  },
  other: {
    id: "other",
    label: "ACCESSORY.CATEGORIES.OTHER"
  }
};

/**
 * Item properties that accessory Items can have.
 * @enum {CrucibleItemCategory}
 */
const PROPERTIES = {
  ...foundry.utils.deepClone(PROPERTIES$4),
};var ACCESSORY=/*#__PURE__*/Object.freeze({__proto__:null,CATEGORIES:CATEGORIES,PROPERTIES:PROPERTIES});/**
 * Creature types supported by the system.
 * @type {Record<string, {label: string, skill: string, knowledge: string}>}
 */
const CREATURE_CATEGORIES = {
  beast: {
    label: "TAXONOMY.CATEGORIES.BEAST",
    skill: "medicine",
    knowledge: "beasts"
  },
  celestial: {
    label: "TAXONOMY.CATEGORIES.CELESTIAL",
    skill: "arcana",
    knowledge: "celestials"
  },
  construct: {
    label: "TAXONOMY.CATEGORIES.CONSTRUCT",
    skill: "science",
    knowledge: "machines"
  },
  dragon: {
    label: "TAXONOMY.CATEGORIES.DRAGON",
    skill: "arcana",
    knowledge: "dragons"
  },
  elemental: {
    label: "TAXONOMY.CATEGORIES.ELEMENTAL",
    skill: "arcana",
    knowledge: "elementals"
  },
  giant: {
    label: "TAXONOMY.CATEGORIES.GIANT",
    skill: "society",
    knowledge: "legends"
  },
  humanoid: {
    label: "TAXONOMY.CATEGORIES.HUMANOID",
    skill: "society",
    knowledge: null
  },
  monstrosity: {
    label: "TAXONOMY.CATEGORIES.MONSTROSITY",
    skill: "medicine",
    knowledge: "monsters"
  },
  ooze: {
    label: "TAXONOMY.CATEGORIES.OOZE",
    skill: "science",
    knowledge: null
  },
  outsider: {
    label: "TAXONOMY.CATEGORIES.OUTSIDER",
    skill: "arcana",
    knowledge: "outsiders"
  },
  undead: {
    label: "TAXONOMY.CATEGORIES.UNDEAD",
    skill: "arcana",
    knowledge: "undeath"
  }
};

/**
 * @typedef CrucibleCurrencyDenomination
 * @property {string} label                 A human-readable and localized label for the denomination
 * @property {string} abbreviation          A short abbreviation for the denomination
 * @property {number} multiplier            A numerical multiplier that quantifies the value of this denomination
 *                                          relative to base currency units
 * @property {string} [icon]                An optional image icon for the denomination.
 *                                          Recommended size is 48px square or smaller
 */

/**
 * Configure the set of currency denominations that are supported by the system.
 * The keys of this object are unique abbreviations which are used to parse currency strings.
 *
 * Each denomination specifies a multiplier which defines how valuable that denomination is.
 * Currency is stored as an integer value of the lowest denomination (multiplier=1).
 *
 * There should be at least one denomination which has a multiplier of 1 to ensure that a raw currency amount can be
 * fully allocated.
 *
 * @type {Record{string, CrucibleCurrencyDenomination}
 */
const CURRENCY_DENOMINATIONS = {
  cp: {
    label: "CURRENCY_DENOMINATIONS.CP.label",
    abbreviation: "CURRENCY_DENOMINATIONS.CP.abbreviation",
    icon: "systems/crucible/icons/currency/cp.webp",
    multiplier: 1
  },
  sp: {
    label: "CURRENCY_DENOMINATIONS.SP.label",
    abbreviation: "CURRENCY_DENOMINATIONS.SP.abbreviation",
    icon: "systems/crucible/icons/currency/sp.webp",
    multiplier: 10
  },
  gp: {
    label: "CURRENCY_DENOMINATIONS.GP.label",
    abbreviation: "CURRENCY_DENOMINATIONS.GP.abbreviation",
    icon: "systems/crucible/icons/currency/gp.webp",
    multiplier: 100
  },
  pp: {
    label: "CURRENCY_DENOMINATIONS.PP.label",
    abbreviation: "CURRENCY_DENOMINATIONS.PP.abbreviation",
    icon: "systems/crucible/icons/currency/pp.webp",
    multiplier: 1000
  }
};

/**
 * Level advancement
 * @type {Record<number, {level: number, milestones: {start: number, required: number, next: number}}>}
 */
const LEVELS = {
  0: {level: 0, milestones: {start: 0, required: 0, next: 0}},
  1: {level: 1, milestones: {required: 2}},
  2: {level: 2, milestones: {required: 3}},
  3: {level: 3, milestones: {required: 4}},
  4: {level: 4, milestones: {required: 4}},
  5: {level: 5, milestones: {required: 5}},
  6: {level: 6, milestones: {required: 5}},
  7: {level: 7, milestones: {required: 5}},
  8: {level: 8, milestones: {required: 6}},
  9: {level: 9, milestones: {required: 6}},
  10: {level: 10, milestones: {required: 6}},
  11: {level: 11, milestones: {required: 6}},
  12: {level: 12, milestones: {required: 7}},
  13: {level: 13, milestones: {required: 7}},
  14: {level: 14, milestones: {required: 7}},
  15: {level: 15, milestones: {required: 7}},
  16: {level: 16, milestones: {required: 7}},
  17: {level: 17, milestones: {required: 8}},
  18: {level: 18, milestones: {required: 8}},
};
for ( const l of Object.values(LEVELS) ) {
  if ( l.level === 0 ) continue;
  const p = LEVELS[l.level - 1];
  l.milestones.start = p.milestones.next;
  l.milestones.next = l.milestones.start + l.milestones.required;
}
foundry.utils.deepFreeze(LEVELS);

/**
 * The travel paces which are possible for group actors.
 * @type {Record<"hidden"|"slow"|"normal"|"fast"|"reckless", Partial<TokenMovementActionConfig>>}
 */
const TRAVEL_PACES = freezeEnum({
  hidden: {
    order: 1,
    label: "TRAVEL_PACES.HIDDEN",
    costMultiplier: 4,
    speedMultiplier: 0.25,
    icon: "fa-solid fa-backward-fast"
  },
  slow: {
    order: 2,
    label: "TRAVEL_PACES.SLOW",
    costMultiplier: 2,
    speedMultiplier: 0.5,
    icon: "fa-solid fa-backward"
  },
  normal: {
    order: 3,
    label: "TRAVEL_PACES.NORMAL",
    costMultiplier: 1,
    speedMultiplier: 1,
    icon: "fa-solid fa-equals"
  },
  fast: {
    order: 4,
    label: "TRAVEL_PACES.FAST",
    costMultiplier: 0.66,
    speedMultiplier: 1.5,
    icon: "fa-solid fa-forward"
  },
  reckless: {
    order: 5,
    label: "TRAVEL_PACES.RECKLESS",
    costMultiplier: 0.5,
    speedMultiplier: 2,
    icon: "fa-solid fa-forward-fast"
  }
});

/**
 * Categories a language can (optionally) belong to
 * @type {Record<string, {label: string}>}
 */
const LANGUAGE_CATEGORIES = {
  nonSpoken: {
    label: "LANGUAGE_CATEGORIES.NONSPOKEN"
  },
  spoken: {
    label: "LANGUAGE_CATEGORIES.SPOKEN"
  }
};

/**
 * Languages a creature can know
 * @type {Record<string, {label: string, category?: string}>}}
 */
const LANGUAGES = {
  common: {
    label: "LANGUAGES.COMMON",
    category: "spoken"
  },
  sign: {
    label: "LANGUAGES.SIGN",
    category: "nonSpoken"
  }
};

/* -------------------------------------------- */

/**
 * Define the actor preparation hooks which are supported for Talent configuration.
 * @enum {{signature: string, argNames: string[]}}
 */
const HOOKS$3 = Object.freeze({

  // Action Usage
  prepareAction: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action"]
  },
  preActivateAction: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action", "targets"]
  },
  rollAction: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action", "target", "rolls"]
  },
  confirmActionOutcome: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action", "outcome", "options"]
  },
  prepareStandardCheck: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["rollData"]
  },
  prepareWeaponAttack: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action", "target", "rollData"]
  },
  applyCriticalEffects: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action", "outcome", "self"]
  },
  defendSkillAttack: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action", "origin", "rollData"]
  },
  defendSpellAttack: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["spell", "origin", "rollData"]
  },
  defendWeaponAttack: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action", "origin", "rollData"]
  },
  receiveAttack: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action", "roll"]
  },

  prepareSkillCheck: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["skill", "rollData"]
  },
  prepareSkillAttack: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["action", "target", "rollData"]
  },
  prepareSpellAttack: {
    group: "TALENT.HOOKS.GROUP_ACTION",
    argNames: ["spell", "target", "rollData"]
  },

  // Data Preparation
  prepareActions: {
    group: "TALENT.HOOKS.GROUP_PREPARATION",
    argNames: ["actions"]
  },
  prepareResources: {
    group: "TALENT.HOOKS.GROUP_PREPARATION",
    argNames: ["resources"]
  },
  prepareDefenses: {
    group: "TALENT.HOOKS.GROUP_PREPARATION",
    argNames: ["defenses"]
  },
  prepareInitiativeCheck: {
    group: "TALENT.HOOKS.GROUP_PREPARATION",
    argNames: ["rollData"]
  },
  prepareMovement: {
    group: "TALENT.HOOKS.GROUP_PREPARATION",
    argNames: ["movement"]
  },
  prepareResistances: {
    group: "TALENT.HOOKS.GROUP_PREPARATION",
    argNames: ["resistances"]
  },

  // Turn Events
  startTurn: {
    group: "TALENT.HOOKS.GROUP_COMBAT",
    argNames: ["turnStartConfig"]
  },
  endTurn: {
    group: "TALENT.HOOKS.GROUP_COMBAT",
    argNames: ["turnEndConfig"]
  }
});var ACTOR=/*#__PURE__*/Object.freeze({__proto__:null,CREATURE_CATEGORIES:CREATURE_CATEGORIES,CURRENCY_DENOMINATIONS:CURRENCY_DENOMINATIONS,HOOKS:HOOKS$3,LANGUAGES:LANGUAGES,LANGUAGE_CATEGORIES:LANGUAGE_CATEGORIES,LEVELS:LEVELS,TRAVEL_PACES:TRAVEL_PACES});/**
 * Training categories which apply to tradecraft.
 * @type {Record<string, {label: string}>}
 **/
const TRAINING = Object.freeze({
  alchemy: {label: "SKILL.LABELS.alchemy"},
  cooking: {label: "SKILL.LABELS.cooking"},
  enchanting: {label: "SKILL.LABELS.enchanting"},
  fletching: {label: "SKILL.LABELS.fletching"},
  jewelcraft: {label: "SKILL.LABELS.jewelcraft"},
  runeweaving: {label: "SKILL.LABELS.runeweaving"},
  smithing: {label: "SKILL.LABELS.smithing"},
  tailoring: {label: "SKILL.LABELS.tailoring"}
});/**
 * The types of talent nodes which are supported.
 * @type {Readonly<Record<string, {label: string, style: string, icon: string, [passive]: boolean}>>}
 */
const NODE_TYPES = Object.freeze({
  origin: {label: "TALENT.NODES.ORIGIN", style: "originHex", icon: "GlyphOrigin", passive: false},
  attack: {label: "TALENT.NODES.ATTACK", style: "rect", icon: "GlyphMelee", passive: false},
  melee: {label: "TALENT.NODES.MELEE", style: "rect", icon: "GlyphMelee", passive: false},
  ranged: {label: "TALENT.NODES.RANGED", style: "rect", icon: "GlyphRanged", passive: false},
  magic: {label: "TALENT.NODES.MAGIC", style: "rect", icon: "GlyphMagic", passive: false},
  defense: {label: "TALENT.NODES.DEFENSE", style: "rect", icon: "GlyphDefense"},
  heal: {label: "TALENT.NODES.HEAL", style: "rect", icon: "GlyphHealing"},
  spell: {label: "TALENT.NODES.SPELL", style: "rect", icon: "GlyphSpellcraft"},
  move: {label: "TALENT.NODES.MOVEMENT", style: "rect", icon: "GlyphMovement"},
  utility: {label: "TALENT.NODES.UTILITY", style: "rect", icon: "GlyphUtility"},
  skill: {label: "TALENT.NODES.SKILL", style: "rect", icon: "GlyphSkill"},
  signature: {label: "TALENT.NODES.SIGNATURE", style: "largeHex", icon: "GlyphSignature", passive: false},
  training: {label: "TALENT.NODES.TRAINING", style: "hex", icon: "GlyphTraining", passive: true}
});

/**
 * Configuration for each tier of the tree.
 * @type {Readonly<Record<"root"|number, {level: number, ability: number}>>}
 */
const NODE_TIERS = Object.freeze({
  "root": {level: 0, ability: 0},
  0: {level: 0, ability: 2},
  1: {level: 0, ability: 3},
  2: {level: 2, ability: 4},
  3: {level: 3, ability: 5},
  4: {level: 4, ability: 5},
  5: {level: 5, ability: 6},
  6: {level: 6, ability: 6},
  7: {level: 7, ability: 7},
  8: {level: 8, ability: 7},
  9: {level: 9, ability: 8},
  10: {level: 10, ability: 8},
  11: {level: 11, ability: 9},
  12: {level: 12, ability: 9},
  13: {level: 13, ability: 10},
  14: {level: 14, ability: 10},
  15: {level: 15, ability: 11},
  16: {level: 16, ability: 11},
  17: {level: 17, ability: 12},
  18: {level: 18, ability: 12}
});

/**
 * The types of training which are available in the system.
 * @type {Readonly<Record<string, {group: string, label: string}>>}
 */
const TRAINING_TYPES = Object.freeze({
  ...Object.entries(SKILLS).reduce((obj, [id, cfg]) => {
    obj[id] = {group: "TALENT.TRAINING.SKILL", label: cfg.label};
    return obj;
  }, {}),
  ...Object.entries(TRAINING$1).reduce((obj, [id, cfg]) => {
    obj[id] = {group: "TALENT.TRAINING.WEAPON", label: cfg.label};
    return obj;
  }, {}),
  ...Object.entries(TRAINING).reduce((obj, [id, cfg]) => {
    obj[id] = {group: "TALENT.TRAINING.CRAFT", label: cfg.label};
    return obj;
  }, {})
});


/**
 * @typedef CrucibleTrainingRank
 * @property {string} id
 * @property {number} rank
 * @property {string} label
 * @property {number} bonus
 */

/**
 * The possible training ranks.
 * @type {Readonly<Record<string, CrucibleTrainingRank>>}
 */
const TRAINING_RANKS = Object.freeze({
  untrained: {
    id: "untrained",
    rank: 0,
    label: "TALENT.RANKS.UNTRAINED",
    bonus: -4
  },
  trained: {
    id: "trained",
    rank: 1,
    label: "TALENT.RANKS.TRAINED",
    bonus: 0
  },
  proficient: {
    id: "proficient",
    rank: 2,
    label: "TALENT.RANKS.PROFICIENT",
    bonus: 1,
  },
  expert: {
    id: "expert",
    rank: 3,
    label: "TALENT.RANKS.EXPERT",
    bonus: 2
  },
  master: {
    id: "master",
    rank: 4,
    label: "TALENT.RANKS.MASTER",
    bonus: 3
  }
});

/**
 * A reverse mapping of training rank integers to rank IDs.
 * @type {Readonly<Record<0|1|2|3|4, CrucibleTrainingRank>>}
 */
const TRAINING_RANK_VALUES = Object.freeze(Object.values(TRAINING_RANKS)).reduce((obj, e) => {
  obj[e.rank] = e;
  return obj;
}, {});var TALENT=/*#__PURE__*/Object.freeze({__proto__:null,NODE_TIERS:NODE_TIERS,NODE_TYPES:NODE_TYPES,TRAINING_RANKS:TRAINING_RANKS,TRAINING_RANK_VALUES:TRAINING_RANK_VALUES,TRAINING_TYPES:TRAINING_TYPES});const SYSTEM_ID = "crucible";

/* -------------------------------------------- */

/**
 * The amount of damage resistance granted by ancestries.
 * @type {object}
 */
const ANCESTRIES = {
  primaryAbilityStart: 3,
  secondaryAbilityStart: 2,
  resistanceAmount: 3
};

/* -------------------------------------------- */

/**
 * The compendium pack IDs which should be used as the source for character creation materials.
 * Modules that want to configure base system behavior should define `crucible.CONFIG.packs` instead.
 * @enum {string}
 */
const COMPENDIUM_PACKS = Object.freeze({
  ancestry: "crucible.ancestry",
  archetype: "crucible.archetype",
  background: "crucible.background",
  spell: "crucible.spells",
  talent: "crucible.talent",
  taxonomy: "crucible.taxonomy"
});

/* -------------------------------------------- */

/**
 * The threat ranks that an adversary may have.
 * @enum {number}
 */
const THREAT_RANKS = {
  minion: {
    id: "minion",
    actionMax: 4,
    label: "ADVERSARY.THREAT_RANKS.MINION",
    scaling: 0.5,
    icon: "fa-solid fa-chevron-down"
  },
  normal: {
    id: "normal",
    actionMax: 6,
    label: "ADVERSARY.THREAT_RANKS.NORMAL",
    scaling: 1.0,
    icon: "fa-solid fa-chevron-up"
  },
  elite: {
    id: "elite",
    actionMax: 8,
    label: "ADVERSARY.THREAT_RANKS.ELITE",
    scaling: 1.5,
    icon: "fa-solid fa-chevrons-up"
  },
  boss: {
    id: "boss",
    actionMax: 10,
    label: "ADVERSARY.THREAT_RANKS.BOSS",
    scaling: 2.0,
    icon: "fa-solid fa-skull"
  }
};

/* -------------------------------------------- */

/**
 * Define the Action life-cycle hooks which are supported for an Action.
 * @enum {Readonly<Object<{argNames: string[]}>>}
 */
const ACTION_HOOKS = Object.freeze({
  initialize: {
    argNames: [],
    argLabels: []
  },
  prepare: {
    argNames: [],
    argLabels: []
  },
  displayOnSheet: {
    argNames: [],
    argLabels: [],
    deprecated: true /** @deprecated */
  },
  canUse: {
    argNames: [],
    argLabels: [],
  },
  configure: {
    argNames: [],
    argLabels: []
  },
  preActivate: {
    argNames: ["targets"],
    argLabels: ["targets: ActionTarget[]"],
    async: true
  },
  roll: {
    argNames: ["outcome"],
    argLabels: ["outcome: CrucibleActionOutcome"],
    async: true
  },
  postActivate: {
    argNames: ["outcome"],
    argLabels: ["outcome: CrucibleActionOutcome"],
    async: true
  },
  confirm: {
    argNames: ["reverse"],
    argLabels: ["reverse: boolean"],
    async: true
  },
  summon: {
    argNames: ["reverse"],
    argLabels: ["reverse: boolean"],
    async: true
  }
});

/* -------------------------------------------- */

/**
 * Configuration how long certain actions in Crucible take to perform.
 * @type {{restSeconds: number, roundSeconds: number, recoverSeconds: number}}
 */
const TIME = Object.freeze({
  roundSeconds: 10,
  recoverSeconds: 60 * 10,
  restSeconds: 60 * 60 * 10
});

/* -------------------------------------------- */

/**
 * Include all constant definitions within the SYSTEM global export
 * @type {Object}
 */
const SYSTEM$1 = {
  id: SYSTEM_ID,
  ABILITIES: ABILITIES,
  ACCESSORY,
  ACTION,
  ACTOR,
  ACTION_HOOKS,
  ANCESTRIES,
  ARMOR,
  COMPENDIUM_PACKS,
  CONSUMABLE,
  DAMAGE_CATEGORIES: DAMAGE_CATEGORIES,
  DAMAGE_TYPES: DAMAGE_TYPES,
  DEFENSES: DEFENSES,
  EFFECTS,
  ITEM,
  PASSIVE_BASE: PASSIVE_BASE,
  RESOURCES: RESOURCES,
  SKILL,
  SKILLS: SKILLS, // alias
  SPELL,
  TALENT,
  THREAT_RANKS,
  TIME,
  WEAPON,
  activeCheckFormula: "3d8",
  dice: dice$1
};/** @import {FormInputConfig} from "@common/data/_types.mjs"; */

/**
 * A custom HTML element for configuring the price of an Item or an amount of currency owned by an Actor.
 * @extends {AbstractFormInputElement<number>}
 */
class HTMLCrucibleCurrencyElement extends foundry.applications.elements.AbstractFormInputElement {

  /** @override */
  static tagName = "crucible-currency";

  /**
   * The named input elements used internally by this element.
   * @type {Record<string, HTMLInputElement>}
   */
  #inputs = {};

  /* -------------------------------------------- */

  /** @override */
  _buildElements() {

    // Initialize existing raw value
    this._value = Number(this.getAttribute("value") || 0);
    this.removeAttribute("value");

    // Create input fields for each denomination
    const elements = [];
    const ds = Object.entries(crucible.CONFIG.currency).toSorted((a, b) => b[1].multiplier - a[1].multiplier);
    for ( const [k, v] of ds ) {

      // Number input
      const i = document.createElement("input");
      if ( this.id ) i.id = `${this.id}-${k}`;
      i.type = "text"; // Use text so we can support delta values like "+12"
      i.placeholder = v.abbreviation;
      i.dataset.denomination = k;
      this.#inputs[k] = i;

      // Icon or string label
      const l = document.createElement("label");
      l.setAttribute("for", i.id);
      if ( v.icon ) {
        const img = document.createElement("img");
        img.src = v.icon;
        img.alt = v.label;
        img.setAttribute("aria-label", v.label);
        img.toggleAttribute("data-tooltip", true);
        l.appendChild(img);
      }
      else l.innerText = v.abbreviation;
      elements.push(l, i);
    }
    return elements;
  }

  /* -------------------------------------------- */

  /** @override */
  _refresh() {
    const isReadonly = this.hasAttribute("readonly");
    const amounts = crucible.api.documents.CrucibleActor.allocateCurrency(this._value);
    for ( const [k, v] of Object.entries(amounts) ) {
      const i = this.#inputs[k];
      i.value = v;
      // Hide zero inputs for readonly elements
      i.toggleAttribute("readonly", isReadonly);
      const isHidden = isReadonly && (v === 0);
      i.classList.toggle("hidden", isHidden);
      i.previousElementSibling.classList.toggle("hidden", isHidden);
    }
  }

  /* -------------------------------------------- */

  /** @override */
  _toggleDisabled(disabled) {
    for ( const i of Object.values(this.#inputs) ) i.disabled = disabled;
  }

  /* -------------------------------------------- */

  /** @override */
  _activateListeners() {
    const onChange = this.#onChangeInput.bind(this);
    for ( const i of Object.values(this.#inputs) ) {
      i.addEventListener("change", onChange);
      i.addEventListener("focus", e => e.target.select());
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle changes to a currency input value.
   */
  #onChangeInput(event) {
    const input = event.target;
    const d = input.dataset.denomination;
    const cfg = crucible.CONFIG.currency[d];
    const amounts = crucible.api.documents.CrucibleActor.allocateCurrency(this._value);

    // Support signed delta values like "+12" or "-5"
    let value = Number(input.value);
    let delta;
    if ( input.value[0] === "=" ) value = Number(input.value.substr(1));
    else if ( input.value[0] === "+" ) delta = Number(input.value.substr(1));
    else if ( input.value[0] === "-" ) delta = Number(input.value);

    // Apply delta
    if ( delta ) {
      if ( !Number.isFinite(delta) ) {
        input.value = amounts[d];
        return;
      }
      const d = crucible.api.documents.CrucibleActor.convertCurrency({[input.dataset.denomination]: delta});
      if ( (this._value + d) < 0 ) {
        ui.notifications.warn(`Insufficient currency to deduct ${delta} ${cfg.label}.`);
        input.value = amounts[d];
        return;
      }
      this._value = Math.max(this._value + d, 0);
    }

    // Apply total
    else {
      if ( !Number.isFinite(value) ) {
        input.value = amounts[d];
        return;
      }
      amounts[d] = value;
      this._value = crucible.api.documents.CrucibleActor.convertCurrency(amounts);
    }

    // Dispatch change
    this.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
    this._refresh();
  }

  /* -------------------------------------------- */

  /**
   * Create a HTMLCrucibleCurrencyElement using provided configuration data.
   * @param {FormInputConfig<string> & FilePickerInputConfig} config
   */
  static create(config) {
    const picker = document.createElement(this.tagName);
    picker.name = config.name;
    picker.setAttribute("value", config.value || "0");
    foundry.applications.fields.setInputAttributes(picker, config);
    return picker;
  }
}var _module$3=/*#__PURE__*/Object.freeze({__proto__:null,HTMLCrucibleCurrencyElement:HTMLCrucibleCurrencyElement});const {api: api$2, sheets: sheets$2} = foundry.applications;

/**
 * A base ActorSheet built on top of ApplicationV2 and the Handlebars rendering backend.
 */
class CrucibleBaseActorSheet extends api$2.HandlebarsApplicationMixin(sheets$2.ActorSheetV2) {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["crucible", "actor", "standard-form", "themed", "theme-dark"],
    tag: "form",
    position: {
      width: 900,
      height: 760
    },
    actions: {
      actionFavorite: CrucibleBaseActorSheet.#onActionFavorite,
      actionEdit: CrucibleBaseActorSheet.#onActionEdit,
      actionUse: CrucibleBaseActorSheet.#onActionUse,
      itemCreate: CrucibleBaseActorSheet.#onItemCreate,
      itemDrop: CrucibleBaseActorSheet.#onItemDrop,
      itemEdit: CrucibleBaseActorSheet.#onItemEdit,
      itemEquip: CrucibleBaseActorSheet.#onItemEquip,
      itemDelete: CrucibleBaseActorSheet.#onItemDelete,
      effectCreate: CrucibleBaseActorSheet.#onEffectCreate,
      effectEdit: CrucibleBaseActorSheet.#onEffectEdit,
      effectDelete: CrucibleBaseActorSheet.#onEffectDelete,
      effectToggle: CrucibleBaseActorSheet.#onEffectToggle,
      expandSection: CrucibleBaseActorSheet.#onExpandSection,
      skillRoll: CrucibleBaseActorSheet.#onSkillRoll
    },
    form: {
      submitOnChange: true
    },
    actor: {
      type: undefined, // Defined by subclass
    }
  };

  /** @override */
  static PARTS = {
    main: {
      id: "main",
      template: "systems/crucible/templates/sheets/actor/main.hbs",
      root: true
    },
    sidebar: {
      id: "sidebar",
      template: "systems/crucible/templates/sheets/actor/sidebar.hbs"
    },
    tabs: {
      id: "tabs",
      template: "systems/crucible/templates/sheets/actor/tabs.hbs"
    },
    header: {
      id: "header",
      template: undefined  // Defined during _initializeActorSheetClass
    },
    attributes: {
      id: "attributes",
      template: undefined  // Defined during _initializeActorSheetClass
    },
    actions:{
      id: "actions",
      template: "systems/crucible/templates/sheets/actor/actions.hbs"
    },
    inventory: {
      id: "inventory",
      template: "systems/crucible/templates/sheets/actor/inventory.hbs"
    },
    skills: {
      id: "skills",
      template: "systems/crucible/templates/sheets/actor/skills.hbs"
    },
    talents: {
      id: "talents",
      template: "systems/crucible/templates/sheets/actor/talents.hbs"
    },
    spells: {
      id: "spells",
      template: "systems/crucible/templates/sheets/actor/spells.hbs"
    },
    effects:{
      id: "effects",
      template: "systems/crucible/templates/sheets/actor/effects.hbs"
    },
    biography: {
      id: "biography",
      template: undefined  // Defined during _initializeActorSheetClass
    }
  };

  /**
   * Define the structure of tabs used by this Item Sheet.
   * @type {Record<string, Record<string, ApplicationTab>>}
   */
  static TABS = {
    sheet: [
      {id: "attributes", group: "sheet", label: "ACTOR.TABS.ATTRIBUTES"},
      {id: "actions", group: "sheet", label: "ACTOR.TABS.ACTIONS"},
      {id: "inventory", group: "sheet", label: "ACTOR.TABS.INVENTORY"},
      {id: "talents", group: "sheet", label: "ACTOR.TABS.TALENTS"},
      {id: "skills", group: "sheet", label: "ACTOR.TABS.SKILLS"},
      {id: "spells", group: "sheet", label: "ACTOR.TABS.SPELLS"},
      {id: "effects", group: "sheet", label: "ACTOR.TABS.EFFECTS"},
      {id: "biography", group: "sheet", label: "ACTOR.TABS.BIOGRAPHY"}
    ]
  }

  /** @override */
  tabGroups = {
    sheet: "attributes"
  };

  /* -------------------------------------------- */

  /**
   * A method which can be called by subclasses in a static initialization block to refine configuration options at the
   * class level.
   */
  static _initializeActorSheetClass() {
    const actor = this.DEFAULT_OPTIONS.actor;
    this.PARTS = foundry.utils.deepClone(this.PARTS);
    this.PARTS.header.template = `systems/crucible/templates/sheets/actor/${actor.type}-header.hbs`;
    this.PARTS.attributes.template = `systems/crucible/templates/sheets/actor/${actor.type}-attributes.hbs`;
    this.PARTS.biography.template = `systems/crucible/templates/sheets/actor/${actor.type}-biography.hbs`;
    this.TABS = foundry.utils.deepClone(this.TABS);
    this.DEFAULT_OPTIONS.classes = [actor.type];
  }

  /* -------------------------------------------- */
  /*  Sheet Rendering                             */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const tabGroups = this.#getTabs();
    const {inventory, talents, iconicSpells} = this.#prepareItems();
    const {sections: actions, favorites: favoriteActions} = this.#prepareActions();
    return {
      abilityScores: this.#prepareAbilities(),
      actions,
      actor: this.document,
      biography: await this.#prepareBiography(),
      canPurchaseTalents: true,
      defenses: this.#prepareDefenses(),
      effects: this.#prepareActiveEffects(),
      favoriteActions,
      featuredEquipment: this.#prepareFeaturedEquipment(),
      fieldDisabled: this.isEditable ? "" : "disabled",
      fields: this.document.system.schema.fields,
      incomplete: {},
      inventory,
      isEditable: this.isEditable,
      languages: this.#prepareLanguageOptions(),
      resistances: this.#prepareResistances(),
      resources: this.#prepareResources(),
      skillCategories: this.#prepareSkills(),
      source: this.document.toObject(),
      spells: this.#prepareSpells(iconicSpells),
      tabGroups,
      tabs: tabGroups.sheet,
      talents
    };
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _attachFrameListeners() {
    super._attachFrameListeners();
    this.element.addEventListener("focusin", this.#onFocusIn.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Configure the tabs used by this sheet.
   * @returns {Record<string, Record<string, ApplicationTab>>}
   */
  #getTabs() {
    const tabs = {};
    for ( const [groupId, config] of Object.entries(this.constructor.TABS) ) {
      const group = {};
      for ( const t of config ) {
        const active = this.tabGroups[t.group] === t.id;
        const icon = `systems/crucible/ui/tabs/${t.id}.webp`;
        group[t.id] = Object.assign({active, cssClass: active ? "active" : "", icon}, t);
      }
      tabs[groupId] = group;
    }
    return tabs;
  }

  /* -------------------------------------------- */

  /**
   * Prepare formatted ability scores for display on the Actor sheet.
   * @return {object[]}
   */
  #prepareAbilities() {
    const a = this.actor.system.abilities;
    const abilities = Object.values(SYSTEM.ABILITIES).map(cfg => {
      const ability = foundry.utils.deepClone(cfg);
      ability.value = a[ability.id].value;
      ability.canIncrease = this.actor.canPurchaseAbility(ability.id, 1);
      ability.canDecrease = this.actor.canPurchaseAbility(ability.id, -1);
      return ability;
    });
    abilities.sort((a, b) => a.sheetOrder - b.sheetOrder);
    return abilities;
  }

  /* -------------------------------------------- */

  /**
   * Prepare enriched biography HTML for the actor.
   * @returns {Promise<{object}>}
   */
  async #prepareBiography() {
    const fields = this.document.system.schema.fields.details.fields.biography.fields;
    const {appearance: appearanceSrc, public: publicSrc, private: privateSrc} = this.document.system.details.biography;
    const context = {relativeTo: this.document, secrets: this.document.isOwner};
    const editorCls = CONFIG.ux.TextEditor;
    return {
      appearanceField: fields.appearance,
      appearanceSrc,
      appearanceHTML: await editorCls.enrichHTML(appearanceSrc, context),
      appearanceClass: appearanceSrc ? "appearance" : "appearance empty",
      publicField: fields.public,
      publicSrc,
      publicHTML: await editorCls.enrichHTML(publicSrc, context),
      publicClass: publicSrc ? "public-biography" : "public-biography empty",
      privateField: fields.private,
      privateSrc,
      privateHTML: await editorCls.enrichHTML(privateSrc, context),
      privateClass: privateSrc ? "private-biography" : "private-biography empty"
    }
  }

  /* -------------------------------------------- */

  /**
   * Prepare and structure data used to render defenses.
   * @returns {Record<string, object>}
   */
  #prepareDefenses() {
    const data = this.document.system.defenses;

    // Physical defenses
    const defenses = {
      physical: {
        value: data.physical.total,
        label: SYSTEM.DEFENSES.physical.label,
        subtitle: this.actor.equipment.armor.name,
        components: {
          armor: {
            value: data.armor.total,
            label: SYSTEM.DEFENSES.armor.label,
            pct: Math.round(data.armor.total * 100 / data.physical.total),
            cssClass: data.armor.total > 0 ? "active" : "inactive",
            separator: "="
          },
          dodge: {
            value: data.dodge.total,
            label: SYSTEM.DEFENSES.dodge.label,
            pct: Math.round(data.dodge.total * 100 / data.physical.total),
            cssClass: data.dodge.total > 0 ? "active" : "inactive",
            separator: "+"
          },
          parry: {
            value: data.parry.total,
            label: SYSTEM.DEFENSES.parry.label,
            pct: Math.round(data.parry.total * 100 / data.physical.total),
            cssClass: data.parry.total > 0 ? "active" : "inactive",
            separator: "+"
          },
          block: {
            value: data.block.total,
            label: SYSTEM.DEFENSES.block.label,
            pct: Math.round(data.block.total * 100 / data.physical.total),
            cssClass: data.block.total > 0 ? "active" : "inactive",
            separator: "+"
          }
        }
      },
    };

    // Non-physical defenses
    for ( const [id, defense] of Object.entries(SYSTEM.DEFENSES) ) {
      if ( defense.type === "physical" ) continue;
      const d = foundry.utils.mergeObject(defense, data[id], {inplace: false});
      d.id = id;
      if ( d.bonus !== 0 ) {
        const sign = d.bonus > 0 ? "+" : "-";
        d.tooltip += ` ${sign} ${Math.abs(d.bonus)}`;
      }
      if ( ["wounds", "madness"].includes(id) ) d.tooltip = `${d.label}<br>${d.tooltip}`;
      defenses[id] = d;
    }
    return defenses;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the items of equipment which are showcased at the top of the sidebar.
   * @returns {{name: string, img: string, tags: string[]}[]}
   */
  #prepareFeaturedEquipment() {
    const featuredEquipment = [];
    const {armor, weapons} = this.actor.equipment;
    const {mainhand: mh, offhand: oh, natural} = weapons;

    // Up to three weapons
    if ( mh ) {
      const mhTags = mh.getTags("short");
      featuredEquipment.push({name: mh.name, type: mh.type, uuid: mh.uuid, img: mh.img, tags: [mhTags.damage, mhTags.range]});
    }
    if ( oh?.id ) {
      const ohTags = oh.getTags("short");
      featuredEquipment.push({name: oh.name, type: oh.type, uuid: oh.uuid, img: oh.img, tags: [ohTags.damage, ohTags.range]});
    }
    if ( natural.length ) {
      for ( let i=0; i<3-featuredEquipment.length; i++ ) {
        const n = natural[i];
        if ( n ) {
          const tags = n.getTags("short");
          featuredEquipment.push({name: n.name, type: n.type, uuid: n.uuid, img: n.img, tags: [tags.damage, tags.range]});
        }
      }
    }

    // Equipped Armor
    if ( armor.id || (this.actor.system.usesEquipment !== false) ) {
      const armorTags = armor.getTags();
      featuredEquipment.push({name: armor.name, type: armor.type, uuid: armor.uuid, img: armor.img, tags: [armorTags.armor, armorTags.dodge]});
    }
    return featuredEquipment;
  }

  /* -------------------------------------------- */

  /**
   * Prepare rendering data for items owned by the Actor.
   */
  #prepareItems() {
    const {accessorySlots, consumableSlots} = this.actor.equipment;
    const sections = {
      talents: {
        signature: {label: "Signature Talents", items: []},
        active: {label: "Active Abilities", items: []},
        passive: {label: "Passive Talents", items: []},
        training: {label: "Training Talents", items: []},
        spell: {label: "Spellcraft Talents", items: []}
      },
      inventory: {
        weapon: {label: "Weapons", items: [], empty: game.i18n.localize("ACTOR.LABELS.WEAPONS_HINT")},
        armor: {label: "Armor", items: [], empty: game.i18n.localize("ACTOR.LABELS.ARMOR_HINT")},
        accessory: {label: "Accessories", items: [], counter: accessorySlots, empty: game.i18n.format("ACTOR.LABELS.ACCESSORIES_HINT", {slots: accessorySlots})},
        consumable: {label: "Consumables", items: [], counter: consumableSlots, empty: game.i18n.format("ACTOR.LABELS.CONSUMABLES_HINT", {slots: consumableSlots})},
        backpack: {label: "Backpack", items: [], empty: game.i18n.localize("ACTOR.LABELS.BACKPACK_HINT")}
      },
      iconicSpells: {label: game.i18n.localize("SPELL.IconicPl"), items: []}
    };

    // Iterate over items and organize them
    for ( const i of this.document.items ) {
      const d = {id: i.id, name: i.name, img: i.img, tags: i.getTags(), uuid: i.uuid, actions: [], sort: Infinity};
      let section;
      let category = SYSTEM.ITEM.PHYSICAL_ITEM_TYPES.has(i.type) ? "physical" : i.type;
      switch ( category ) {
        case "base":
          section = sections.inventory.backpack;
          break;
        case "physical":
          const canEquip = SYSTEM.ITEM.EQUIPABLE_ITEM_TYPES.has(i.type);
          this.#preparePhysicalItem(i, d, canEquip);
          if ( canEquip && i.system.equipped ) section = sections.inventory[i.type];
          else section = sections.inventory.backpack;
          break;
        case "talent":
          d.tier = i.system.node?.tier || 0;
          const action = i.actions.at(0);
          const spellComp = i.system.rune || i.system.gesture || i.system.inflection;
          if ( i.system.isSignature ) section = sections.talents.signature;
          if ( action ) {
            const tags = action.getTags();
            d.tags = Object.assign({}, tags.action, tags.activation);
            section ||= sections.talents.active;
          }
          else if ( spellComp ) section ||= sections.talents.spell;
          else if ( i.system.training.type ) section ||= sections.talents.training;
          else section ||= sections.talents.passive;
          break;
        case "spell":
          d.isItem = true;
          section = sections.iconicSpells;
          break;
      }
      if ( section ) section.items.push(d);
    }

    // Remove unused sections
    if ( this.actor.system.usesEquipment === false ) {
      if ( !sections.inventory.accessory.items.length ) delete sections.inventory.accessory;
      if ( !sections.inventory.consumable.items.length ) delete sections.inventory.consumable;
    }

    // Sort inventory
    for ( const heading of Object.values(sections.inventory) ) {
      if ( heading.counter ) heading.label += ` (${heading.items.length}/${heading.counter})`;
      heading.items.sort((a, b) => (a.sort - b.sort) || a.name.localeCompare(b.name));
    }

    // Sort talents
    for ( const [id, heading] of Object.entries(sections.talents) ) {
      if ( !heading.items.length ) delete sections.talents[id];
      heading.items.sort((a, b) => (a.tier - b.tier) || a.name.localeCompare(b.name));
    }
    return sections;
  }

  /* -------------------------------------------- */

  /**
   * Standard preparation steps for all physical item types.
   * @param {CrucibleItem} item
   * @param {object} config
   * @param {boolean} canEquip
   */
  #preparePhysicalItem(item, config, canEquip) {
    const sortOrder = {weapon: 1, armor: 2, accessory: 3, consumable: 4};
    config.quantity = item.system.quantity;
    config.showStack = item.system.quantity > 1;
    config.sort = sortOrder[item.type] ?? Infinity;
    if ( canEquip ) this.#prepareEquipableItem(item, config);
  }

  /* -------------------------------------------- */

  /**
   * Additional preparation for items that can be equipped.
   * @param {CrucibleItem} item
   * @param {object} config
   */
  #prepareEquipableItem(item, config) {
    config.dropped = item.system.dropped;
    config.equipped = item.system.equipped;
    config.cssClass = item.system.equipped ? "equipped" : "unequipped";
    const typeLabel = game.i18n.localize(CONFIG.Item.typeLabels[item.type]);
    let equipAction;
    if ( item.system.dropped ) {
      config.cssClass += " dropped";
      equipAction = {action: "itemEquip", icon: "fa-solid fa-hand-back-fist", tooltip: `Recover ${typeLabel}`};
    }
    else equipAction = item.system.equipped ?
      {action: "itemEquip", icon: "fa-solid fa-shield-minus", tooltip: `Un-equip ${typeLabel}`} :
      {action: "itemEquip", icon: "fa-solid fa-shield-plus", tooltip: `Equip ${typeLabel}`};
    config.actions.push(equipAction);
    if ( (item.type === "weapon") && !item.system.dropped ) {
      config.actions.unshift({action: "itemDrop", icon: "fa-solid fa-hand-point-down", tooltip: "Drop Weapon"});
    }
  }

  /* -------------------------------------------- */

  /**
   * Prepare data for the set of actions that are displayed on the Available Actions portion of the sheet.
   * @returns {{sections: Record<string, {label: string, actions: object[]}>, favorites: object[]}}
   */
  #prepareActions() {
    const sections = {
      attack: {label: "Attack Actions", actions: []},
      spell: {label: "Spellcraft Actions", actions: []},
      reaction: {label: "Reactions", actions: []},
      movement: {label: "Movement Actions", actions: []},
      general: {label: "General Actions", actions: []}
    };
    const favorites = [];

    // Iterate over all Actions
    for ( const [actionId, action] of Object.entries(this.actor.actions) ) {
      const a = {
        id: actionId,
        name: action.name,
        img: action.img,
        tags: action.getTags().activation,
        canEdit: !!action.parent,
        favorite: action.isFavorite ? {icon: "fa-solid fa-star", tooltip: "Remove Favorite"} :
          {icon: "fa-regular fa-star", tooltip: "Add Favorite"}
      };

      // Classify actions
      let section = "general";
      const tagMapping = {
        strike: "attack",
        reaction: "reaction",
        spell: "spell",
        iconicSpell: "spell",
        movement: "movement"
      };
      for ( const [tag, sectionId] of Object.entries(tagMapping) ) {
        if ( action.tags.has(tag) ) {
          section = sectionId;
          break;
        }
      }
      sections[section].actions.push(a);

      // Favorite actions which are able to be currently used
      if ( action.isFavorite && action._displayOnSheet() ) favorites.push(a);
    }

    // Sort each section
    for ( const [k, section] of Object.entries(sections) ) {
      if ( !section.actions.length ) delete sections[k];
      else section.actions.sort((a, b) => a.name.localeCompare(b.name));
    }
    favorites.sort((a, b) => a.name.localeCompare(b.name));
    return {sections, favorites};
  }

  /* -------------------------------------------- */

  /**
   * Format ActiveEffect data required for rendering the sheet
   * @returns {Record<string, {label: string, effects: object[]}>}
   */
  #prepareActiveEffects() {
    const sections = {
      temporary: {label: "Temporary Effects", effects: []},
      persistent: {label: "Persistent Effects", effects: []},
      disabled: {label: "Disabled Effects", effects: []}
    };

    // Categorize and prepare effects
    for ( const effect of this.actor.effects ) {
      const tags = effect.getTags();

      // Add effect to section
      const e = {
        id: effect.id,
        icon: effect.img,
        name: effect.name,
        tags: tags,
        uuid: effect.uuid,
        disabled: effect.disabled ? {icon: "fa-solid fa-toggle-off", tooltip: "Enable Effect"}
          : {icon: "fa-solid fa-toggle-on", tooltip: "Disable Effect"},
      };
      sections[tags.context.section].effects.push(e);
    }

    // Sort
    for ( const [k, section] of Object.entries(sections) ) {
      if ( !section.effects.length ) delete sections[k];
      else section.effects.sort((a, b) => (a.tags.context.t - b.tags.context.t) || (a.name.localeCompare(b.name)));
    }
    return sections;
  }

  /* -------------------------------------------- */

  /**
   * Format categories of the spells tab.
   * @param {{label: string, items: CrucibleItem[]}} iconicSpells
   * @returns {{
   *  runes: {label: string, known: Set<CrucibleSpellcraftRune>},
   *  inflections: {label: string, known: Set<CrucibleSpellcraftInflection>},
   *  gestures: {label: string, known: Set<CrucibleSpellcraftGesture>}
   * }}
   */
  #prepareSpells(iconicSpells) {
    const {runes, gestures, inflections, iconicSlots} = this.actor.grimoire;
    const spells = {
      runes: {
        label: game.i18n.localize("SPELL.COMPONENTS.RunePl"),
        known: runes,
        emptyLabel: game.i18n.localize("SPELL.COMPONENTS.RuneNone")
      },
      gestures: {
        label: game.i18n.localize("SPELL.COMPONENTS.GesturePl"),
        known: gestures,
        emptyLabel: game.i18n.localize("SPELL.COMPONENTS.GestureNone")
      },
      inflections: {
        label: game.i18n.localize("SPELL.COMPONENTS.InflectionPl"),
        known: inflections,
        emptyLabel: game.i18n.localize("SPELL.COMPONENTS.InflectionNone")
      },
      iconicSpells: {
        label: iconicSpells.label,
        known: iconicSpells.items,
        emptyLabel: game.i18n.localize("SPELL.IconicNone")
      }
    };

    // Placeholder Iconic Slots
    if ( iconicSlots > iconicSpells.items.length ) {
      for ( let i=iconicSpells.items.length; i<iconicSlots; i++ ) {
        const spell = {
          id: `iconicSlot${i}`,
          name: "Available Slot",
          img: "icons/magic/symbols/question-stone-yellow.webp",
          cssClass: "iconic-slot",
          tags: {},
          isItem: false
        };
        spells.iconicSpells.known.push(spell);
      }
    }
    return spells;
  }

  /* -------------------------------------------- */

  /**
   * Prepare options provided to a multi-select element for which languages the character may know.
   * @returns {FormSelectOption[]}
   */
  #prepareLanguageOptions() {
    const categories = crucible.CONFIG.languageCategories;
    const options = [];
    for ( const [value, {label, category}] of Object.entries(crucible.CONFIG.languages) ) {
      options.push({value, label, group: categories[category]?.label});
    }
    return options;
  }

  /* -------------------------------------------- */

  /**
   * Prepare and format resistance data for rendering.
   * @return {{physical: object[], elemental: object[], spiritual: object[]}}
   */
  #prepareResistances() {
    const resistances = foundry.utils.deepClone(SYSTEM.DAMAGE_CATEGORIES);
    for ( const c of Object.values(resistances) ) c.resistances = [];
    const rs = this.document.system.resistances;
    const barCap = Math.max(this.document.level, 3);
    for ( const [id, d] of Object.entries(SYSTEM.DAMAGE_TYPES) ) {
      const r = Object.assign({}, d, rs[id]);
      r.cssClass = r.total < 0 ? "vuln" : (r.total > 0 ? "res" : "none");
      const p = Math.clamp(Math.abs(r.total) / barCap, 0, 1);
      r.barPct = `${p * 50}%`;
      resistances[d.type].resistances.push(r);
    }
    return resistances;
  }

  /* -------------------------------------------- */

  /**
   * Prepare and format the display of resource attributes on the actor sheet.
   * @returns {Record<string, {id: string, pct: number, color: {bg: string, fill: string}}>}
   */
  #prepareResources() {
    const resources = {};
    const rs = this.document.system.resources;

    // Pools
    for ( const [id, resource] of Object.entries(rs) ) {
      const r = foundry.utils.mergeObject(SYSTEM.RESOURCES[id], resource, {inplace: false});
      r.id = id;
      r.pct = Math.round(r.value * 100 / r.max);
      r.cssPct = `--resource-pct: ${100 - r.pct}%`;
      resources[r.id] = r;
    }

    // Action
    resources.action.pips = [];
    const maxAction = Math.min(resources.action.max, 6);
    for ( let i=1; i<=maxAction; i++ ) {
      const full = resources.action.value >= i;
      const double = (resources.action.value - 6) >= i;
      const cssClass = [full ? "full" : "", double ? "double" : ""].filterJoin(" ");
      resources.action.pips.push({full, double, cssClass});
    }

    // Focus
    resources.focus.pips = [];
    const maxFocus = Math.min(resources.focus.max, 12);
    for ( let i=1; i<=maxFocus; i++ ) {
      const full = resources.focus.value >= i;
      const double = (resources.focus.value - 12) >= i;
      const cssClass = [full ? "full" : "", double ? "double" : ""].filterJoin(" ");
      resources.focus.pips.push({full, double, cssClass});
    }

    // Heroism
    resources.heroism.pips = [];
    for ( let i=1; i<=3; i++ ) {
      const full = resources.heroism.value >= i;
      const cssClass = full ? "full" : "";
      resources.heroism.pips.push({full, double: false, cssClass});
    }
    return resources;
  }

  /* -------------------------------------------- */

  /**
   * Organize skills by category in alphabetical order.
   * @return {Record<string, {
   *   label: string,
   *   defaultIcon: string,
   *   color: Color,
   *   abilityAbbrs: [string, string],
   *   pips: [string, string, string, string, string],
   *   css: string,
   *   canIncrease: boolean,
   *   canDecrease: boolean,
   *   rankName: string,
   *   pathName: string,
   *   tooltips: {value: string, passive: string},
   * }>}
   */
  #prepareSkills() {
    const skills = this.document.system.skills;
    const categories = foundry.utils.deepClone(SYSTEM.SKILL.CATEGORIES);
    for ( const skill of Object.values(SYSTEM.SKILLS) ) {
      const s = foundry.utils.mergeObject(skill, skills[skill.id], {inplace: false});
      const category = categories[skill.category];
      const a1 = SYSTEM.ABILITIES[skill.abilities[0]];
      const a2 = SYSTEM.ABILITIES[skill.abilities[1]];

      // Skill data
      s.abilityAbbrs = [a1.abbreviation, a2.abbreviation];
      s.pips = Array.fromRange(4).map((v, i) => i < s.rank ? "trained" : "untrained");

      // Specialization status
      const rank = SYSTEM.TALENT.TRAINING_RANK_VALUES[s.rank];
      s.rankTags = [rank.label];
      s.hexClass = skill.abilities.sort().join("-");

      // Tooltips
      s.tooltips = {
        value: game.i18n.format("SKILL.TooltipCheck", {a1: a1.label, a2: a2.label}),
        passive: game.i18n.localize("SKILL.TooltipPassive")
      };

      // Add to category
      category.skills ||= {};
      category.skills[skill.id] = s;
    }
    return categories;
  }

  /* -------------------------------------------- */
  /*  Action Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * Select input text when the element is focused.
   * @param {FocusEvent} event
   */
  #onFocusIn(event) {
    if ( (event.target.tagName === "INPUT") && (event.target.type === "number") ) {
      event.target.type = "text";
      event.target.classList.add("number-input");
      event.target.select();
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onChangeForm(formConfig, event) {

    // Support relative input for number fields
    if ( event.target.name && event.target.classList.contains("number-input") ) {
      if ( ["+", "-"].includes(event.target.value[0]) ) {
        const v0 = foundry.utils.getProperty(this.document, event.target.name);
        const delta = Number(event.target.value);
        event.target.type = "number";
        event.target.valueAsNumber = v0 + delta;
      }
      else if ( event.target.value[0] === "=" ) {
        const value = Number(event.target.value.slice(1));
        event.target.type = "number";
        event.target.valueAsNumber = value;
      }
    }
    super._onChangeForm(formConfig, event);
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onActionEdit(_event, target) {
    const actionId = target.closest(".action").dataset.actionId;
    const action = this.actor.actions[actionId];
    if ( !action.parent ) return;
    await action.sheet.render({force: true});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onActionFavorite(_event, target) {
    const actionId = target.closest(".action").dataset.actionId;
    const action = this.actor.actions[actionId];
    if ( !action ) return;

    // Restrict favorites to actions which still exist
    const priorFavorites = this.actor.system.favorites;
    const favorites = new Set();
    for ( const action of Object.values(this.actor.actions) ) {
      if ( priorFavorites.has(action.id) ) favorites.add(action.id);
    }

    // Toggle favorite state for this action
    if ( favorites.has(action.id) ) favorites.delete(action.id);
    else favorites.add(action.id);
    await this.actor.update({"system.favorites": favorites});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onActionUse(_event, target) {
    const actionId = target.closest(".action").dataset.actionId;
    await this.actor.useAction(actionId);
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onItemCreate(event) {
    const cls = getDocumentClass("Item");
    await cls.createDialog({type: "weapon"}, {parent: this.document, pack: this.document.pack});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onItemDelete(event, target) {
    const item = this.#getEventItem(event, target);
    await item.deleteDialog();
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onItemDrop(event, target) {
    const item = this.#getEventItem(event, target);
    await this.actor.equipItem(item.id, {equipped: false, dropped: true});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onItemEdit(event, target) {
    const item = this.#getEventItem(event, target);
    await item.sheet.render({force: true});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onItemEquip(event, target) {
    const item = this.#getEventItem(event, target);
    try {
      await this.actor.equipItem(item, {equipped: !item.system.equipped});
    } catch(err) {
      ui.notifications.warn(err.message);
    }
  }

  /* -------------------------------------------- */

  /**
   * Get the Item document associated with an action event.
   * @param {PointerEvent} event
   * @returns {CrucibleItem}
   */
  #getEventItem(_event, target) {
    const itemId = target.closest(".line-item")?.dataset.itemId;
    return this.actor.items.get(itemId, {strict: true});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onEffectCreate(event) {
    const cls = getDocumentClass("ActiveEffect");
    await cls.createDialog({}, {parent: this.document, pack: this.document.pack});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onEffectDelete(event, target) {
    const effect = this.#getEventEffect(event, target);
    await effect.deleteDialog();
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onEffectEdit(event, target) {
    const effect = this.#getEventEffect(event, target);
    await effect.sheet.render({force: true});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onEffectToggle(event, target) {
    const effect = this.#getEventEffect(event, target);
    await effect.update({disabled: !effect.disabled});
  }

  /* -------------------------------------------- */

  /**
   * Get the ActiveEffect document associated with an action event.
   * @param {PointerEvent} event
   * @returns {ActiveEffect}
   */
  #getEventEffect(_event, target) {
    const effectId = target.closest(".effect")?.dataset.effectId;
    return this.actor.effects.get(effectId, {strict: true});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onExpandSection(_event, target) {
    const section = target.closest(".sheet-section");
    const wasExpanded = section.classList.contains("expanded");
    if ( wasExpanded ) {
      for ( const s of section.parentElement.children ) s.classList.remove("expanded", "collapsed");
      return;
    }
    for ( const s of section.parentElement.children ) {
      s.classList.toggle("expanded", s === section);
      s.classList.toggle("collapsed", s !== section);
    }
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseActorSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onSkillRoll(_event, target) {
    return this.actor.rollSkill(target.closest(".skill").dataset.skill, {dialog: true});
  }

  /* -------------------------------------------- */
  /*  Drag and Drop                               */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onDragStart(event) {
    super._onDragStart(event);
    const li = event.currentTarget;
    let dragData;

    // Action
    if ( li.classList.contains("action-drag") ) {
      const actionId = li.closest(".action").dataset.actionId;
      const action = this.actor.actions[actionId];
      if ( !action ) return;
      dragData = {
        type: "crucible.action",
        macroData: {
          type: "script",
          scope: "actor",
          name: action.name,
          img: action.img,
          command: `game.system.api.documents.CrucibleActor.macroAction(actor, "${actionId}");`
        }
      };
    }

    // Set data transfer
    if ( dragData ) event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }

  /* -------------------------------------------- */

  /** @override */
  async _onDropItem(event, item) {
    if ( !this.actor.isOwner ) return;
    const section = event.target.closest("[data-inventory-section]")?.dataset.inventorySection;

    // Moving already owned items
    if ( this.actor.uuid === item.parent?.uuid ) {
      switch ( section ) {
        case "backpack":
          if ( item.system.equipped ) {
            try {
              await this.actor.equipItem(item, {equipped: false});
            } catch(err) {
              ui.notifications.warn(err.message);
            }
          }
          else await this._onSortItem(event, item);
          break;
        default:
          if ( item.type === section ) {
            try {
              await this.actor.equipItem(item, {equipped: true});
            } catch(err) {
              ui.notifications.warn(err.message);
            }
          }
          break;
      }
      return;
    }

    // Create a new item
    const keepId = !(item.system instanceof crucible.api.models.CruciblePhysicalItem);
    item = item.clone({system: {equipped: false}}, {keepId});
    if ( section === item.type ) { // Attempt equipment
      try {
        const equipResult = this.actor.canEquipItem(item);
        item.updateSource({system: equipResult});
      } catch(err) {
        return ui.notifications.warn(err.message);
      }
    }
    const itemData = this.actor._cleanItemData(item);
    await Item.implementation.create(itemData, {parent: this.actor, keepId});
  }
}const {api: api$1, sheets: sheets$1} = foundry.applications;

/**
 * A base ActorSheet built on top of ApplicationV2 and the Handlebars rendering backend.
 */
class CrucibleGroupActorSheet extends api$1.HandlebarsApplicationMixin(sheets$1.ActorSheetV2) {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["crucible", "actor", "actor-group", "themed", "theme-dark"],
    position: {
      width: 720,
      height: 600
    },
    window: {
      contentClasses: ["standard-form"]
    },
    actions: {
      awardMilestone: CrucibleGroupActorSheet.#onAwardMilestone,
      memberRemove: CrucibleGroupActorSheet.#onMemberRemove,
      memberSheet: CrucibleGroupActorSheet.#onMemberSheet,
      cyclePace: CrucibleGroupActorSheet.#onCyclePace,
      recover: CrucibleGroupActorSheet.#onRecover,
      rest: CrucibleGroupActorSheet.#onRest
    },
    form: {
      submitOnChange: true
    },
  };

  /** @override */
  static PARTS = {
    main: {
      root: true,
      template: "systems/crucible/templates/sheets/group/group.hbs",
      scrollable: [".items-list.scrollable"]
    }
  };

  /* -------------------------------------------- */
  /*  Sheet Rendering                             */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const system = this.actor.system;
    const milestones = system.advancement.milestones;
    const groupLevel = Object.values(SYSTEM.ACTOR.LEVELS).findLast(l => l.milestones.start <= milestones);
    return {
      actor: this.document,
      system,
      isEditable: this.isEditable,
      fields: this.actor.schema.fields,
      members: this.#prepareMembers(),
      systemFields: system.schema.fields,
      tags: this.actor.getTags(),
      pace: SYSTEM.ACTOR.TRAVEL_PACES[system.movement.pace],
      groupLevel
    };
  }

  /* -------------------------------------------- */

  /**
   * Prepare data about each group member.
   * @returns {object[]}
   */
  #prepareMembers() {
    const members = [];
    for ( const member of this.actor.system.members ) {
      const a = member.actor;
      const m = {
        actorId: member.actorId,
        actor: member.actor,
        name: a?.name ?? "[MISSING]",
        img: a?.img ?? CONST.DEFAULT_TOKEN,
        quantity: member.quantity,
        hasQuantity: member.quantity > 1,
        hasResources: false,
        tags: a?.getTags() || {},
      };
      if ( member.actor ) {
        const {health, morale} = member.actor.system.resources;
        const hc = SYSTEM.RESOURCES.health.color;
        const mc = SYSTEM.RESOURCES.morale.color;
        Object.assign(m, {
          hasResources: true,
          health: {
            value: health.value,
            max: health.max,
            color: hc.low.mix(hc.high, health.value / health.max),
            cssPct: `${Math.round(health.value * 100 / health.max)}%`
          },
          morale: {
            value: morale.value,
            max: morale.max,
            color: mc.low.mix(mc.high, health.value / health.max),
            cssPct: `${Math.round(morale.value * 100 / morale.max)}%`
          }
        });
      }
      members.push(m);
    }
    return members;
  }

  /* -------------------------------------------- */
  /*  Drag and Drop                               */
  /* -------------------------------------------- */

  /** @override */
  async _onDropActor(event, actor) {
    await this.actor.system.addMember(actor);
  }

  /* -------------------------------------------- */
  /*  Click Action Handlers                       */
  /* -------------------------------------------- */

  /**
   * @this {CrucibleGroupActorSheet}
   * @type {ApplicationClickAction}
   */
  static async #onAwardMilestone(_event, _target) {
    if ( !game.user.isGM ) return;
    await this.actor.system.awardMilestoneDialog();
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleGroupActorSheet}
   * @type {ApplicationClickAction}
   */
  static async #onMemberRemove(event, target) {
    const li = target.closest("li.member");
    const actorId = li.dataset.actorId;
    await this.actor.system.removeMember(actorId);
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleGroupActorSheet}
   * @type {ApplicationClickAction}
   */
  static async #onMemberSheet(event, target) {
    const li = target.closest("li.member");
    const actorId = li.dataset.actorId;
    const actor = game.actors.get(actorId);
    actor?.sheet?.render({force: true});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleGroupActorSheet}
   * @type {ApplicationClickAction}
   */
  static async #onCyclePace(_event, _target) {
    const paces = SYSTEM.ACTOR.TRAVEL_PACES;
    const current = paces[this.actor.system.movement.pace];
    const next = Object.values(paces).find(p => p.order === current.order + 1) || paces.hidden;
    await this.actor.update({"system.movement.pace": next.id});
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleGroupActorSheet}
   * @type {ApplicationClickAction}
   */
  static async #onRecover(_event, _target) {
    await this.document.system.recover();
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleGroupActorSheet}
   * @type {ApplicationClickAction}
   */
  static async #onRest(_event, _target) {
    await this.document.system.rest();
  }
}/**
 * A CrucibleBaseActorSheet subclass used to configure Actors of the "adversary" type.
 */
class AdversarySheet extends CrucibleBaseActorSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    actor: {
      type: "adversary"
    },
    actions: {
      editArchetype: AdversarySheet.#onEditArchetype,
      editTaxonomy: AdversarySheet.#onEditTaxonomy,
      levelDecrease: AdversarySheet.#onLevelDecrease,
      levelIncrease: AdversarySheet.#onLevelIncrease
    }
  };

  static {
    this._initializeActorSheetClass();
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const {actor: a, source: s, incomplete: i} = context;
    const {threat, level} = a.system.advancement;

    // Expand Context
    Object.assign(context, {
      archetypeName: a.system.details.archetype?.name || game.i18n.localize("ARCHETYPE.SHEET.CHOOSE"),
      taxonomyName: a.system.details.taxonomy?.name || game.i18n.localize("TAXONOMY.SHEET.CHOOSE"),
      canPurchaseTalents: false,
      threats: SYSTEM.THREAT_RANKS,
      threat: SYSTEM.THREAT_RANKS[threat],
      levelDisplay: this.#getLevelDisplay(level),
      canLevelUp: level < 24,
      canLevelDown: level > -5,
    });

    // Incomplete Tasks
    Object.assign(i, {
      taxonomy: !s.system.details.taxonomy?.name,
      archetype: !s.system.details.archetype?.name
    });
    return context;
  }

  /* -------------------------------------------- */

  /**
   * Get the display string for the Adversary level.
   * @param {number} level    The true numerical level
   * @returns {string}        The displayed string level
   */
  #getLevelDisplay(level) {
    if ( level > 0 ) return String(level);
    if ( level === 0 ) return "0";
    return `1/${1 - level}`;
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle click action to choose or edit the Archetype of this Adversary.
   * @this {AdversarySheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onEditArchetype(event) {
    await this.actor._viewDetailItem("archetype", {editable: false});
  }

  /* -------------------------------------------- */

  /**
   * Handle click action to choose or edit the Taxonomy of this Adversary.
   * @this {AdversarySheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onEditTaxonomy(event) {
    await this.actor._viewDetailItem("taxonomy", {editable: false});
  }

  /* -------------------------------------------- */

  /**
   * Handle click action to decrease the level of the Adversary.
   * @this {AdversarySheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onLevelDecrease(event) {
    const l = this.actor.system.advancement.level;
    let next;
    if ( l === 1 ) next = -1;
    else if ( l === -11 ) next = 0;
    else next = Math.max(l - 1, -11);
    return this.actor.update({"system.advancement.level": next});
  }

  /* -------------------------------------------- */

  /**
   * Handle click action to increase the level of the Adversary.
   * @this {AdversarySheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onLevelIncrease(event) {
    const l = this.actor.system.advancement.level;
    let next;
    if ( l === 0 ) next = -11;
    else if ( l === -1 ) next = 1;
    else next = Math.min(l + 1, 24);
    return this.actor.update({"system.advancement.level": next});
  }

  /* -------------------------------------------- */
  /*  Drag and Drop                               */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onDropItem(event, item) {
    if ( !this.actor.isOwner ) return;
    switch (item.type) {
      case "ancestry":
        return this.actor.system.applyTaxonomy(item.system.toTaxonomy());
      case "archetype":
        return this.actor.system.applyArchetype(item);
      case "taxonomy":
        return this.actor.system.applyTaxonomy(item);
    }
    return super._onDropItem(event, item);
  }
}/**
 * A CrucibleBaseActorSheet subclass used to configure Actors of the "hero" type.
 */
class HeroSheet extends CrucibleBaseActorSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    actor: {
      type: "hero"
    },
    actions: {
      editAncestry: HeroSheet.#onEditAncestry,
      editBackground: HeroSheet.#onEditBackground,
      levelUp: HeroSheet.#onLevelUp
    }
  };

  static {
    this._initializeActorSheetClass();
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const {actor: a, source: s, incomplete: i} = context;
    const {isL0} = a;
    const points = context.points = a.system.points;
    Object.assign(i, {isL0});

    // Expand Context
    Object.assign(context, {
      ancestryName: s.system.details.ancestry?.name || game.i18n.localize("ANCESTRY.SHEET.CHOOSE"),
      backgroundName: s.system.details.background?.name || game.i18n.localize("BACKGROUND.SHEET.CHOOSE"),
      capacity: a.system.capacity,
      knowledgeOptions: this.#prepareKnowledgeOptions(),
      knowledge: this.#prepareKnowledge(),
      talentTreeButtonText: game.system.tree.actor === a ? "Close Talent Tree" : "Open Talent Tree",
    });

    // Advancement
    const adv = a.system.advancement;
    i.level = isL0 ? !i.progress : (adv.pct === 100);
    context.advancementTooltip = game.i18n.format("ADVANCEMENT.MilestoneTooltip", adv);

    // Progression Issues
    const issues = [];
    if ( !s.system.details.ancestry?.name ) issues.push("Choose an Ancestry");
    if ( !s.system.details.background?.name ) issues.push("Choose a Background");
    if ( points.ability.available < 0 ) issues.push("Too many Ability Points have been spent");
    else if ( points.ability.requireInput ) issues.push("Spend Ability Points");
    if ( points.talent.available < 0 ) issues.push("Too many Talents have been taken");
    else if ( points.talent.available ) issues.push("Spend Talent Points");
    i.progress = !!issues.length;
    if ( i.progress ) {
      const items = issues.reduce((s, text) => s + `<li>${text}</li>`, "");
      i.progressTooltip = `<h4>Progression Requirements</h4><ol>${items}</ol>`;
    }
    return context;
  }

  /* -------------------------------------------- */

  /**
   * Prepare options provided to a multi-select element for which knowledge areas the character may know.
   * @returns {FormSelectOption[]}
   */
  #prepareKnowledgeOptions() {
    const options = [];
    for ( const [value, {label, skill}] of Object.entries(crucible.CONFIG.knowledge) ) {
      const s = SYSTEM.SKILLS[skill];
      options.push({value, label, group: s?.label});
    }
    return options;
  }

  /**
   * Prepare the user-friendly list of knowledge areas that the actor has.
   * @returns {string[]}
   */
  #prepareKnowledge() {
    const knowledgeNames = [];
    for ( const knowledgeId of this.actor.system.details.knowledge ) {
      if ( crucible.CONFIG.knowledge[knowledgeId] ) {
        knowledgeNames.push(crucible.CONFIG.knowledge[knowledgeId].label);
      }    }    return knowledgeNames;
  };

  /* -------------------------------------------- */

  /** @override */
  async close(options) {
    await super.close(options);
    await this.actor.toggleTalentTree(false);
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @override */
  async _onClickAction(event, target) {
    event.preventDefault();
    event.stopPropagation();
    switch ( target.dataset.action ) {
      case "abilityDecrease":
        return this.actor.purchaseAbility(target.closest(".ability").dataset.ability, -1);
      case "abilityIncrease":
        return this.actor.purchaseAbility(target.closest(".ability").dataset.ability, 1);
      case "talentTree":
        return this.actor.toggleTalentTree();
      case "talentReset":
        return this.actor.resetTalents();
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle click action to level up.
   * @this {HeroSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onLevelUp(event) {
    game.tooltip.deactivate();
    await this.actor.levelUp(1);
  }

  /* -------------------------------------------- */

  /**
   * Handle click action to choose or edit your Ancestry.
   * @this {HeroSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onEditAncestry(event) {
    await this.actor._viewDetailItem("ancestry", {editable: false});
  }

  /* -------------------------------------------- */

  /**
   * Handle click action to choose or edit your Background.
   * @this {HeroSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onEditBackground(event) {
    await this.actor._viewDetailItem("background", {editable: false});
  }

  /* -------------------------------------------- */
  /*  Drag and Drop                               */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onDropItem(event, item) {
    if ( !this.actor.isOwner ) return;
    switch (item.type) {
      case "ancestry":
        await this.actor.system.applyAncestry(item);
        return;
      case "background":
        await this.actor.system.applyBackground(item);
        return;
      case "spell":
        try {
          this.actor.canLearnIconicSpell(item);
        } catch(err) {
          ui.notifications.warn(err.message);
          return;
        }
        break;
      case "talent":
        if ( !crucible.developmentMode ) {
          ui.notifications.error("Talents can only be added to a protagonist Actor via the Talent Tree.");
          return;
        }
    }
    return super._onDropItem(event, item);
  }
}const {ActorSheetV2} = foundry.applications.sheets;
const {HandlebarsApplicationMixin: HandlebarsApplicationMixin$2} = foundry.applications.api;

/**
 * @typedef CrucibleHeroCreationState
 * @property {string} name
 * @property {Record<string, CrucibleHeroCreationItem>} ancestries
 * @property {string} ancestryId
 * @property {Record<string, CrucibleHeroCreationItem>} backgrounds
 * @property {string} backgroundId
 * @property {Set<string>} talents
 */

/**
 * @typedef CrucibleHeroCreationItem
 * @property {CrucibleItem} item
 * @property {string} name
 * @property {string} color
 * @property {string} icon
 * @property {string} summary
 */

/**
 * @typedef CrucibleHeroCreationItemFeature
 * @property {string} label
 * @property {string[]} tags
 * @property {CrucibleItem[]} items
 */

/**
 * An Actor Sheet responsible for managing the Crucible character creation process.
 * @template {CrucibleHeroCreationState} CreationState
 */
class CrucibleHeroCreationSheet extends HandlebarsApplicationMixin$2(ActorSheetV2) {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    id: "crucible-hero-creation",
    tag: "div",
    classes: ["crucible", "crucible-fullscreen", "themed", "theme-dark"],
    window: {
      frame: false,
      positioned: false
    },
    actions: {
      chooseAncestry: CrucibleHeroCreationSheet.#onChooseAncestry,
      chooseBackground: CrucibleHeroCreationSheet.#onChooseBackground,
      restart: CrucibleHeroCreationSheet.#onRestart,
      abilityIncrease: CrucibleHeroCreationSheet.#onAbilityIncrease,
      abilityDecrease: CrucibleHeroCreationSheet.#onAbilityDecrease,
      complete: CrucibleHeroCreationSheet.#onComplete
    }
  };

  /**
   * Define the steps of character creation.
   */
  static STEPS = {
    ancestry: {
      id: "ancestry",
      label: "Ancestry",
      order: 1,
      numeral: "I",
      template: "systems/crucible/templates/sheets/creation/ancestry.hbs",
      initialize: CrucibleHeroCreationSheet.#initializeAncestries,
      prepare: CrucibleHeroCreationSheet.#prepareAncestries,
    },
    background: {
      id: "background",
      label: "Background",
      order: 2,
      numeral: "II",
      template: "systems/crucible/templates/sheets/creation/background.hbs",
      initialize: CrucibleHeroCreationSheet.#initializeBackgrounds,
      prepare: CrucibleHeroCreationSheet.#prepareBackgrounds,
      abilities: true
    },
    talents: {
      id: "talents",
      label: "Talents",
      order: 3,
      numeral: "III",
      template: "systems/crucible/templates/sheets/creation/talents.hbs",
      talents: true
    }
  };

  /** @override */
  static PARTS = {
    header: {
      id: "header",
      template: "systems/crucible/templates/sheets/creation/header.hbs"
    }
    // PARTS from STEPS are defined dynamically in _configureRenderParts
  };

  /**
   * Configuration of application tabs, with an entry per tab group.
   * @type {Record<string, ApplicationTabsConfiguration>}
   */
  static TABS = {
    header: this._defineTabs()
  };

  /* -------------------------------------------- */

  /**
   * A clone of the Actor which the character creation process operates upon.
   * @type {CrucibleActor}
   * @protected
   */
  _clone = this.#createClone();

  /**
   * Data which persists the current state of character creation.
   * @type {Partial<CreationState>}
   * @protected
   */
  _state = {}

  /**
   * Track completed steps.
   * @type {Record<string, boolean>}
   * @protected
   */
  _completed = Object.seal(Object.values(this.constructor.STEPS).reduce((obj, s) => {
    obj[s.id] = false;
    return obj;
  }, {}));

  /**
   * Record when the entire process is complete so we can avoid displaying warnings on close.
   * @type {boolean}
   */
  #complete = false;

  /* -------------------------------------------- */

  get steps() {
    return this.constructor.STEPS;
  }

  get step() {
    return this.tabGroups.header;
  }

  /* -------------------------------------------- */

  /**
   * Dynamically define the structure of TABS given declared STEPS.
   * @returns {{initial, tabs: *[]}}
   * @internal
   */
  static _defineTabs() {
    const tabs = [];
    for ( const s of Object.values(this.STEPS) ) {
      tabs.push({id: s.id, label: s.label});
    }
    return {tabs, initial: tabs[0].id};
  }

  /* -------------------------------------------- */
  /*  Data Initialization                         */
  /* -------------------------------------------- */

  /**
   * Create a clone of the true Actor which is managed by the character creation process.
   * @returns {CrucibleActor}
   */
  #createClone() {
    const actorData = this.document.toObject();
    actorData._id = null;
    return this.document.constructor.fromSource(actorData);
  }

  /* -------------------------------------------- */

  /**
   * Perform one-time initialization of context data that is performed upon the first render.
   * @returns {Promise<void>}
   * @protected
   */
  async _initializeState() {
    this._state.name = this._clone.name;
    this.#complete = false;
    const promises = [];
    for ( const step of Object.values(this.constructor.STEPS) ) {
      if ( step?.initialize instanceof Function ) promises.push(step.initialize.call(this));
    }
    await Promise.all(promises);
  }

  /* -------------------------------------------- */

  /**
   * Initialize data for each of the available Ancestry items which may be chosen.
   * @this CrucibleHeroCreationSheet
   * @returns {Promise<Record<string, CrucibleHeroCreationItem>>}
   */
  static async #initializeAncestries() {
    const packs = crucible.CONFIG.packs.ancestry;
    this._state.ancestries = await CrucibleHeroCreationSheet.#initializeItemOptions("ancestry", packs,
      this._initializeAncestry);
  }

  /* -------------------------------------------- */

  /**
   * Initialize an ancestry option, augmenting it with further functionality.
   * @param {CrucibleHeroCreationItem} ancestry
   * @returns {Promise<void>}
   * @protected
   */
  async _initializeAncestry(ancestry) {
    const {abilities, resistances, movement, talents, schema} = ancestry.item.system;

    // Ability Bonuses
    const primary = SYSTEM$1.ABILITIES[abilities.primary];
    const secondary = SYSTEM$1.ABILITIES[abilities.secondary];
    ancestry.features.push({
      label: schema.getField("abilities").label,
      tags: [
        {text: `${primary.label} ${SYSTEM$1.ANCESTRIES.primaryAbilityStart}`},
        {text: `${secondary.label} ${SYSTEM$1.ANCESTRIES.secondaryAbilityStart}`}
      ]
    });

    // Resistances and Vulnerabilities
    const res = SYSTEM$1.DAMAGE_TYPES[resistances.resistance];
    const vuln = SYSTEM$1.DAMAGE_TYPES[resistances.vulnerability];
    ancestry.features.push({
      label: schema.getField("resistances").label,
      tags: [
        {text: res ? `Resistance: ${res.label} +${SYSTEM$1.ANCESTRIES.resistanceAmount}` : "Resistance: None"},
        {text: res ? `Vulnerability: ${vuln.label} -${SYSTEM$1.ANCESTRIES.resistanceAmount}` : "Vulnerability: None"}
      ]
    });

    // Movement
    const {size, stride} = movement;
    ancestry.features.push({
      label: schema.getField("movement").label,
      tags: [
        {text: `Size ${size}ft`},
        {text: `Stride ${stride}ft`}
      ]
    });

    // Talents
    ancestry.features.push({
      label: schema.getField("talents").label,
      items: await Promise.all(talents.map(uuid => CrucibleHeroCreationSheet._renderFeatureItem(uuid)))
    });
  }

  /* -------------------------------------------- */

  /**
   * Initialize data for each of the available Background items which may be chosen.
   * @this CrucibleHeroCreationSheet
   * @returns {Promise<Record<string, CrucibleHeroCreationItem>>}
   */
  static async #initializeBackgrounds() {
    const packs = crucible.CONFIG.packs.background;
    this._state.backgrounds = await CrucibleHeroCreationSheet.#initializeItemOptions("background", packs,
      this._initializeBackground);
  }

  /* -------------------------------------------- */

  /**
   * Initialize an ancestry option, augmenting it with further functionality.
   * @param {CrucibleHeroCreationItem} background
   * @returns {Promise<void>}
   * @protected
   */
  async _initializeBackground(background) {
    const {knowledge, skills, talents, schema, languages} = background.item.system;

    // Knowledge Areas
    const knowledgeTags = Array.from(knowledge.map(knowledgeId => {
      const k = crucible.CONFIG.knowledge[knowledgeId];
      return {text: `Knowledge: ${k?.label || k}`};
    }));
    if ( knowledgeTags.length ) background.features.push({
      label: schema.getField("knowledge").label,
      tags: knowledgeTags
    });

    // Languages
    const languageTags = Array.from(languages.map(languageId => {
      const l = crucible.CONFIG.languages[languageId];
      return {text: `Language: ${l?.label || l}`};
    }));
    if ( languageTags.length ) background.features.push({
      label: schema.getField("languages").label,
      tags: languageTags
    });

    // Skills
    const skillItems = await Promise.all(skills.map(skillId => {
      const uuid = SYSTEM$1.SKILLS[skillId].talents[1];
      return CrucibleHeroCreationSheet._renderFeatureItem(uuid)
    }));
    if ( skillItems.length ) background.features.push({
      label: schema.getField("skills").label,
      items: skillItems
    });

    // Talents
    const talentItems = await Promise.all(talents.map(uuid => CrucibleHeroCreationSheet._renderFeatureItem(uuid)));
    if ( talentItems.length ) background.features.push({
      label: schema.getField("talents").label,
      items: talentItems
    });
  }

  /* -------------------------------------------- */

  /**
   * Initialize data for each of the available Background items which may be chosen.
   * @this CrucibleHeroCreationSheet
   * @param {string} itemType
   * @param {Set<string>} packs
   * @param {Function} [fn]
   * @returns {Promise<Record<string, CrucibleHeroCreationItem>>}
   */
  static async #initializeItemOptions(itemType, packs, fn) {
    const options = {};
    await Promise.allSettled(Array.from(packs).map(async packId => {
      const pack = game.packs.get(packId);
      if ( !pack ) {
        console.warn(`Compendium pack "${packId}" does not exist as a valid compendium ID`);
        return;
      }
      const items = await pack.getDocuments({type: itemType});
      for ( const item of items ) {
        const identifier = item.system.identifier;
        const option = {
          identifier,
          item,
          name: item.name,
          color: item.system.ui.color ?? "#8a867c",
          icon: item.img,
          summary: await CONFIG.ux.TextEditor.enrichHTML(item.system.description),
          features: []
        };
        if ( fn instanceof Function ) await fn.call(this, option);
        options[identifier] = option;
      }
    }));
    return options;
  }

  /* -------------------------------------------- */

  /**
   * Render partial HTML for an item provided by a character creation feature.
   * @param {string} uuid
   * @returns {Promise<string>}
   * @protected
   */
  static async _renderFeatureItem(uuid) {
    const item = await fromUuid(uuid);
    if ( !item ) return "";
    return item.renderInline();
  }

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {

    // One-time initialization
    if ( options.isFirstRender || foundry.utils.isEmpty(this._state) ) await this._initializeState();

    // Base context preparation
    const context = {
      actor: this.actor,
      abilities: this._prepareAbilityScores(),
      activeStep: this.step,
      charname: this._state.name,
      state: this._state,
      tabs: this._prepareTabs("header")
    };

    // Step-specific preparation
    await this._prepareSteps(context, options);

    // Header Buttons and Tabs
    context.buttons = this._prepareHeaderButtons();
    this._finalizeHeaderTabs(context);
    return context;
  }

  /* -------------------------------------------- */

  /**
   * Prepare fullscreen control buttons displayed in the header.
   * @returns {[{icon: string, tooltip: string, action: string, label: string}]}
   * @protected
   */
  _prepareHeaderButtons() {
    const buttons = [
      {action: "close", icon: "fa-light fa-hexagon-xmark", label: "Exit", tooltip: "Exit Creation"},
      {action: "restart", icon: "fa-light fa-hexagon-exclamation", label: "Restart", tooltip: "Restart Creation"}
    ];
    if ( Object.values(this._completed).every(v => v === true) ) {
      buttons.push({action: "complete", icon: "fa-light fa-hexagon-check", label: "Complete", tooltip: "Complete Creation"});
    }
    return buttons;
  }

  /* -------------------------------------------- */

  /**
   * Finalize the state of each tab on the header navigation based on creation completion state.
   */
  _finalizeHeaderTabs(context) {
    const plurals = new Intl.PluralRules(game.i18n.lang);

    // Default icons and completion state
    for ( const tab of Object.values(context.tabs) ) {
      const step = this.constructor.STEPS[tab.id];
      const completed = !!this._completed[tab.id];
      tab.selectionIcon ||= `systems/crucible/ui/svg/hexagon-${completed ? "checkmark" : "xmark"}.svg`;
      Object.assign(tab, step, {
        completed,
        cssClass: [
          tab.active ? "active" : "",
          completed ? "complete" : "incomplete"
        ].filterJoin(" ")
      });

      // Ability Step
      if ( step.abilities ) {
        const ap = this._clone.points.ability.pool;
        const chosen = context[step.id];
        tab.selectionLabel = (ap || !chosen) ?
          `${ap} ${game.i18n.localize("TALENT.LABELS.Points." + plurals.select(ap))}` :
          chosen.name;
      }

      // Talents
      if ( step.talents ) {
        const tp = this._clone.points.talent.available;
        tab.selectionLabel = tp > 0
          ? `${tp} ${game.i18n.localize("TALENT.LABELS.Talents." + plurals.select(tp))}`
          : "Completed";
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Prepare ability score data.
   * @returns {object}
   * @protected
   */
  _prepareAbilityScores() {
    const abilities = [];
    for ( const [abilityId, cfg] of Object.entries(SYSTEM$1.ABILITIES) ) {
      const {value, base} = this._clone.system.abilities[abilityId];
      abilities.push({
        id: abilityId,
        label: cfg.label,
        group: cfg.group,
        order: cfg.sheetOrder,
        total: value,
        increases: base ? base.signedString() : "",
        canIncrease: this._clone.canPurchaseAbility(abilityId, 1),
        canDecrease: this._clone.canPurchaseAbility(abilityId, -1)
      });
    }
    abilities.sort((a, b) => a.order - b.order);
    return {abilities, points: this._clone.points.ability};
  }

  /* -------------------------------------------- */

  /**
   * Perform one-time initialization of context data that is performed upon the first render.
   * @returns {Promise<void>}
   * @private
   */
  async _prepareSteps(context, options) {
    const promises = [];
    for ( const step of Object.values(this.constructor.STEPS) ) {
      if ( step?.initialize instanceof Function ) promises.push(step.prepare.call(this, context, options));
    }
    await Promise.all(promises);
  }

  /* -------------------------------------------- */

  /**
   * Prepare data for rendering on the ancestry step.
   * @this CrucibleHeroCreationSheet
   * @returns {Promise<void>}
   */
  static async #prepareAncestries(context, _options) {
    const {ancestries, ancestryId} = this._state;
    const t = context.tabs.ancestry;

    // Ancestry options
    context.ancestries = Object.values(ancestries).sort((a, b) => a.name.localeCompare(b.name));
    for ( const a of context.ancestries ) {
      a.selected = a.identifier === ancestryId;
      a.cssClass = a.selected ? "active" : "";
    }

    // Chosen Ancestry
    this._completed.ancestry = ancestryId in ancestries;
    if ( ancestryId ) {
      const a = context.ancestry = ancestries[ancestryId];
      if ( a.color ) t.selectionColor = a.color;
      if ( a.icon ) t.selectionIcon = a.icon;
      t.selectionLabel = a.name;
    }
    else context.ancestry = null;
  }

  /* -------------------------------------------- */

  /**
   * Prepare data for rendering on the background step.
   * @this CrucibleHeroCreationSheet
   * @returns {Promise<void>}
   */
  static async #prepareBackgrounds(context, _options) {
    const {backgrounds, backgroundId} = this._state;
    const t = context.tabs.background;

    // Background options
    context.backgrounds = Object.values(backgrounds).sort((a, b) => a.name.localeCompare(b.name));
    for ( const b of context.backgrounds ) {
      b.selected = b.identifier === backgroundId;
      b.cssClass = b.selected ? "active" : "";
    }

    // Chosen Background
    const spentPoints = this._clone.points.ability.pool === 0;
    this._completed.background = (backgroundId in backgrounds) && spentPoints;
    if ( backgroundId ) {
      const b = context.background = backgrounds[backgroundId];
      if ( b.color ) t.selectionColor = b.color;
      if ( b.icon ) t.selectionIcon = b.icon;
    }
    else context.background = null;
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    if ( !options.isFirstRender ) options.parts.findSplice(p => p === "talents"); // Never re-render talents
    if ( this.element ) this._state.name = this.element.querySelector("#hero-creation-name").value.trim();
  }

  /* -------------------------------------------- */

  /** @override */
  _canRender(_options) {
    super._canRender(_options);
    if ( !this.#complete && ((this.document.type !== "hero") || (this.document.level > 0)) ) {
      throw new Error("You may only use the CrucibleHeroCreationSheet for a hero Actor which is level zero.")
    }
  }

  /* -------------------------------------------- */

  /** @override */
  _configureRenderParts(_options) {
    const parts = foundry.utils.deepClone(this.constructor.PARTS);
    for ( const step of Object.values(this.constructor.STEPS) ) {
      parts[step.id] = {id: step.id, template: step.template};
    }
    return parts;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  changeTab(...args) {
    super.changeTab(...args);
    this.element.dataset.step = this.step;
    crucible.api.audio.playClick();
    this.deactivateTalentTree().then(() => {
      this.render({parts: ["header", this.step]});
    });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async close(options={}) {
    if ( (options.dialog !== false) && !this.#complete ) {
      crucible.api.audio.playClick();
      const confirm = await foundry.applications.api.DialogV2.confirm({
        window: {
          title: "Abandon Creation Progress?",
          icon: "fa-solid fa-circle-x"
        },
        content: "Discard creation progress and exit the creator?",
        modal: true
      });
      if ( !confirm ) return;
    }
    options.animate = false;
    return super.close(options);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    this.element.dataset.step = this.step;
    // Activate talent tree
    if ( this.step === "talents" ) {
      await this.activateTalentTree();
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onClose(options) {
    await this._reset();
    await super._onClose(options);
  }

  /* -------------------------------------------- */
  /*  Public API                                  */
  /* -------------------------------------------- */

  /**
   * Choose an Ancestry.
   * @param {string} ancestryId
   * @returns {Promise<void>}
   */
  async chooseAncestry(ancestryId) {
    if ( !(ancestryId in this._state.ancestries) ) throw new Error(`Invalid Ancestry identifier "${ancestryId}"`);
    const actor = this._clone;
    const ancestryItem = this._state.ancestries[ancestryId].item;

    // Update the Actor clone
    await actor._applyDetailItem(ancestryItem, {type: "ancestry", local: true, notify: false});
    this._state.ancestryId = ancestryId;
    await this.render({parts: ["header", this.step]});
  }

  /* -------------------------------------------- */
  /**
   * Choose a Background.
   * @param {string|CrucibleItem} background
   * @returns {Promise<void>}
   */
  async chooseBackground(background) {
    const actor = this._clone;
    let backgroundId;
    let backgroundItem;

    // Background ID
    if ( typeof background === "string" ) {
      backgroundId = background;
      if ( !(backgroundId in this._state.backgrounds) ) {
        throw new Error(`Invalid Background identifier "${backgroundId}"`);
      }
      backgroundItem = this._state.backgrounds[backgroundId].item;
    }

    // Background Item
    else if ( background instanceof CrucibleItem ) {
      backgroundId = background.system.identifier;
      backgroundItem = background;
    }

    // Remove background
    else {
      backgroundItem = null;
      backgroundId = undefined;
    }

    // Update the Actor clone
    await actor._applyDetailItem(backgroundItem, {type: "background", local: true, notify: false, canClear: true});
    this._state.backgroundId = backgroundId;
    await this.render({parts: ["header", this.step]});
  }

  /* -------------------------------------------- */

  /**
   * Activate the talent tree by embedding it within the character creation application.
   * @returns {Promise<void>}
   */
  async activateTalentTree() {
    const tree = crucible.tree;
    if ( tree.actor === this._clone ) return;
    await tree.open(this._clone, {parentApp: this});
    const tab = this.element.querySelector(".tab[data-tab=talents]");
    tab.replaceChildren(tree.canvas);
  }

  /* -------------------------------------------- */

  /**
   * Deactivate the talent tree by removing it from the character creation interface.
   * @returns {Promise<void>}
   */
  async deactivateTalentTree() {
    if ( crucible.tree.actor === this._clone ) {
      await crucible.tree.close();
      document.body.append(crucible.tree.canvas);
    }
  }

  /* -------------------------------------------- */

  /**
   * Callback logic invoked when the embedded talent tree is updated.
   * @internal
   */
  async _onRefreshTalentTree() {
    this._completed.talents = this._clone.points.talent.available === 0;
    await this.render({parts: ["header"]});
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle click events to choose an Ancestry.
   * @this {CrucibleHeroCreationSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onAbilityIncrease(_event, target) {
    const ability = target.closest(".ability");
    crucible.api.audio.playClick();
    await this._clone.purchaseAbility(ability.dataset.ability, 1);
    await this.render({parts: [this.step, "header"]});
  }
  /* -------------------------------------------- */

  /**
   * Handle click events to choose an Ancestry.
   * @this {CrucibleHeroCreationSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onAbilityDecrease(_event, target) {
    const ability = target.closest(".ability");
    crucible.api.audio.playClick();
    await this._clone.purchaseAbility(ability.dataset.ability, -1);
    await this.render({parts: [this.step, "header"]});
  }

  /* -------------------------------------------- */

  /**
   * Handle click events to choose an Ancestry.
   * @this {CrucibleHeroCreationSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static #onChooseAncestry(_event, target) {
    const choice = target.closest(".option");
    this.chooseAncestry(choice.dataset.ancestryId);
    crucible.api.audio.playClick();
  }

  /* -------------------------------------------- */

  /**
   * Handle click events to choose a Background.
   * @this {CrucibleHeroCreationSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static #onChooseBackground(_event, target) {
    const choice = target.closest(".option");
    this.chooseBackground(choice.dataset.backgroundId);
    crucible.api.audio.playClick();
  }

  /* -------------------------------------------- */

  /**
   * Reset the creation process and restart from the beginning.
   * @this {CrucibleHeroCreationSheet}
   * @returns {Promise<void>}
   */
  static async #onRestart() {
    const confirm = await foundry.applications.api.DialogV2.confirm({
      window: {
        title: "Reset Creation Progress?",
        icon: "fa-solid fa-hexagon-exclamation"
      },
      content: "Discard creation progress and restart from the beginning?",
      modal: true
    });
    if ( !confirm ) return;
    await this._reset();
    await this.render();
  }

  /* -------------------------------------------- */

  /**
   * Conclude the character creation process.
   * @this {CrucibleHeroCreationSheet}
   * @returns {Promise<void>}
   */
  static async #onComplete() {
    this._state.name = this.element.querySelector("#hero-creation-name").value.trim();
    const creationData = this._clone.toObject();
    const creationOptions = {recursive: false, diff: false, noHook: true, render: false};
    await this._finalizeCreationData(creationData, creationOptions);

    // Update the actor and render the regular sheet
    this.#complete = true;
    await this.document.update(creationData, creationOptions);
    await this.close({dialog: false});
  }

  /* -------------------------------------------- */

  /**
   * Finalize the ActorData which will be applied at the end of character creation.
   * @param {ActorData} creationData
   * @param {Partial<DatabaseUpdateOperation>} creationOptions
   * @protected
   */
  async _finalizeCreationData(creationData, creationOptions) {
    creationData.name = this._state.name;
    delete creationData.ownership;
    creationData.flags.core.sheetClass = '';
    creationData.system.advancement.level = 1;
  }

  /* -------------------------------------------- */

  /**
   * Reset the creation process. Used close and restart.
   * @returns {Promise<void>}
   * @protected
   */
  async _reset() {
    await this.deactivateTalentTree();
    this._clone = this.#createClone();
    this._state = {};
    for ( const k in this._completed ) this._completed[k] = false;
    this.tabGroups.header = Object.values(this.constructor.STEPS).find(s => s.order === 1).id;
  }
}const {fields} = foundry.data;

/* -------------------------------------------- */

/**
 * A standardized ArrayField used when an Item contains Actions.
 */
class ItemActionsField extends fields.ArrayField {
  constructor(options, context) {
    super(new fields.EmbeddedDataField(CrucibleAction), options, context);
  }
}

/* -------------------------------------------- */

/**
 * A standardized ArrayField used when an Item contains Actor Hooks.
 */
class ItemActorHooks extends fields.ArrayField {
  constructor(options, context) {
    const hookSchema = new fields.SchemaField({
      hook: new fields.StringField({required: true, blank: false, choices: SYSTEM$1.ACTOR.HOOKS}),
      fn: new fields.JavaScriptField({async: true, gmOnly: true})
    });
    super(hookSchema, options, context);
  }
}

/* -------------------------------------------- */

/**
 * A special StringField subclass used for item identifiers.
 */
class ItemIdentifierField extends fields.StringField {

  /** @inheritdoc */
  static get _defaults() {
    return Object.assign(super._defaults, {
      blank: false,
      nullable: false,
      required: true,
      initial: ItemIdentifierField.#getInitial,
      validate: ItemIdentifierField.#validate
    });
  }

  /* -------------------------------------------- */

  /**
   * The regular expression required for a valid system identifier.
   * @type {RegExp}
   */
  static #IDENTIFIER_REGEX = /^[A-z0-9]+$/;

  /* -------------------------------------------- */

  /**
   * Generate an initial identifier for the item based on provided data.
   * @returns {string}
   */
  static #getInitial() {
    return foundry.utils.randomID(10);
  }

  /* -------------------------------------------- */

  /**
   * Validate that the identifier meets requirements.
   * @param {string} id
   * @returns {boolean}
   */
  static #validate(id) {
    if ( !ItemIdentifierField.#IDENTIFIER_REGEX.test(id) ) {
      throw new Error(`Invalid Crucible identifier value "${id}" which must be alphanumeric without spaces or 
      special characters`);
    }
  }
}var fields$1=/*#__PURE__*/Object.freeze({__proto__:null,ItemActionsField:ItemActionsField,ItemActorHooks:ItemActorHooks,ItemIdentifierField:ItemIdentifierField});/**
 * @import {CrucibleItemCategory, ItemProperty} from "../config/items.mjs";
 */

/**
 * A data structure which is shared by all physical items.
 */
class CruciblePhysicalItem extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      identifier: new ItemIdentifierField(),
      category: new fields.StringField({required: true, choices: this.ITEM_CATEGORIES, initial: this.DEFAULT_CATEGORY}),
      quantity: new fields.NumberField({required: true, nullable: false, integer: true, initial: 1, min: 0}),
      weight: new fields.NumberField({required: true, nullable: false, integer: true, initial: 0, min: 0}),
      price: new fields.NumberField({required: true, nullable: false, integer: true, initial: 0, min: 0}),
      quality: new fields.StringField({required: true, choices: SYSTEM$1.ITEM.QUALITY_TIERS, initial: "standard"}),
      broken: new fields.BooleanField({initial: false}),
      enchantment: new fields.StringField({required: true, choices: SYSTEM$1.ITEM.ENCHANTMENT_TIERS, initial: "mundane"}),
      equipped: new fields.BooleanField(),
      invested: new fields.BooleanField(),
      properties: new fields.SetField(new fields.StringField({required: true, choices: this.ITEM_PROPERTIES})),
      description: new fields.SchemaField({
        public: new fields.HTMLField(),
        private: new fields.HTMLField()
      }),
      actions: new ItemActionsField(),
      actorHooks: new ItemActorHooks()
    }
  }

  /**
   * Allowed categories for this item type.
   * @type {Record<string, CrucibleItemCategory>}
   */
  static ITEM_CATEGORIES = {};

  /**
   * The default category for new items of this type
   * @type {string}
   */
  static DEFAULT_CATEGORY = "";

  /**
   * Define the set of property tags which can be applied to this item type.
   * @type {Record<string, ItemProperty>}
   */
  static ITEM_PROPERTIES = {};

  /** @override */
  static LOCALIZATION_PREFIXES = ["ITEM"];

  /* -------------------------------------------- */

  /**
   * Item configuration data.
   * @type {{category: CrucibleItemCategory, quality: ItemQualityTier, enchantment: ItemEnchantmentTier}}
   */
  config;

  /**
   * Item rarity score.
   * @type {number}
   */
  rarity;

  /**
   * Does this item require investment?
   * @type {boolean}
   */
  get requiresInvestment() {
    return this.properties.has("investment");
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare base data used by all physical items.
   */
  prepareBaseData() {

    // Item Category
    const categories = this.constructor.ITEM_CATEGORIES;
    const category = categories[this.category] || categories[this.constructor.DEFAULT_CATEGORY];

    // Item Quality
    const qualities = SYSTEM$1.ITEM.QUALITY_TIERS;
    const quality = qualities[this.quality] || qualities.standard;

    // Enchantment Level
    const enchantments = SYSTEM$1.ITEM.ENCHANTMENT_TIERS;
    const enchantment = enchantments[this.enchantment] || enchantments.mundane;

    // Item Configuration
    this.config = {category, quality, enchantment};
    this.rarity = quality.rarity + enchantment.rarity;

    // Item Properties
    for ( let p of this.properties ) {
      const prop = this.constructor.ITEM_PROPERTIES[p];
      if ( prop.rarity ) this.rarity += prop.rarity;
    }
  }

  /* -------------------------------------------- */

  /**
   * Prepare derived data used by all physical items.
   */
  prepareDerivedData() {
    this.price = this._preparePrice();
  }

  /* -------------------------------------------- */

  /**
   * Compute the price that would be charged for the item based on its base price and rarity.
   * @returns {number}
   * @protected
   */
  _preparePrice() {
    const rarity = this.rarity;
    if ( rarity < 0 ) return Math.floor(this.price / Math.abs(rarity - 1));
    else return this.price * Math.pow(rarity + 1, 3);
  }

  /* -------------------------------------------- */

  /**
   * Return an object of string formatted tag data which describes this item type.
   * @param {string} [scope="full"]       The scope of tags being retrieved, "full" or "short"
   * @returns {Object<string, string>}    The tags which describe this weapon
   */
  getTags(scope="full") {
    const tags = {};
    tags.category = this.config.category.label;
    if ( this.equipped ) tags.equipped = this.schema.fields.equipped.label;
    if ( this.dropped ) tags.dropped = this.schema.fields.dropped.label;
    if ( this.requiresInvestment ) tags.invested = this.invested ? this.schema.fields.invested.label : "Not Invested";
    return tags;
  }
}const {api, sheets} = foundry.applications;

/**
 * A base ItemSheet built on top of ApplicationV2 and the Handlebars rendering backend.
 */
class CrucibleBaseItemSheet extends api.HandlebarsApplicationMixin(sheets.ItemSheetV2) {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["crucible", "item", "standard-form"],
    tag: "form",
    position: {
      width: 560,
      height: "auto"
    },
    actions: {
      actionAdd: CrucibleBaseItemSheet.#onActionAdd,
      actionDelete: CrucibleBaseItemSheet.#onActionDelete,
      actionEdit: CrucibleBaseItemSheet.#onActionEdit,
      hookAdd: CrucibleBaseItemSheet.#onHookAdd,
      hookDelete: CrucibleBaseItemSheet.#onHookDelete,
      expandSection: CrucibleBaseItemSheet.#onExpandSection
    },
    form: {
      submitOnChange: true
    },
    item: {
      type: undefined, // Defined by subclass
      includesActions: false,
      includesHooks: false,
      hasAdvancedDescription: false
    }
  };

  /**
   * A template path used to render a single action.
   * @type {string}
   */
  static ACTION_PARTIAL = "systems/crucible/templates/sheets/item/included-action.hbs";

  /** @override */
  static PARTS = {
    header: {
      id: "header",
      template: "systems/crucible/templates/sheets/item/item-header.hbs"
    },
    tabs: {
      id: "tabs",
      template: "templates/generic/tab-navigation.hbs"
    },
    description: {
      id: "description",
      template: "systems/crucible/templates/sheets/item/item-description.hbs"
    },
    config: {
      id: "config",
      template: undefined // Populated during _initializeItemSheetClass
    }
  };

  /**
   * Define the structure of tabs used by this Item Sheet.
   * @type {Record<string, Array<Record<string, ApplicationTab>>>}
   */
  static TABS = {
    sheet: [
      {id: "description", group: "sheet", icon: "fa-solid fa-book", label: "ITEM.TABS.DESCRIPTION"},
      {id: "config", group: "sheet", icon: "fa-solid fa-cogs", label: "ITEM.TABS.CONFIGURATION"}
    ]
  }

  /** @override */
  tabGroups = {
    sheet: "description"
  };

  /* -------------------------------------------- */

  /**
   * A method which can be called by subclasses in a static initialization block to refine configuration options at the
   * class level.
   */
  static _initializeItemSheetClass() {
    const item = this.DEFAULT_OPTIONS.item;
    this.PARTS = foundry.utils.deepClone(this.PARTS);
    this.TABS = foundry.utils.deepClone(this.TABS);

    // Item Type Configuration
    this.DEFAULT_OPTIONS.classes = [this.DEFAULT_OPTIONS.item.type];
    this.PARTS.config.template = `systems/crucible/templates/sheets/item/${item.type}-config.hbs`;

    // Includes Actions
    if ( item.includesActions ) {
      this.PARTS.actions = {
        id: "actions",
        template: "systems/crucible/templates/sheets/item/item-actions.hbs",
        templates: [this.ACTION_PARTIAL]
      };
      this.TABS.sheet.push({id: "actions", group: "sheet", icon: "fa-solid fa-bullseye", label: "ITEM.TABS.ACTIONS"});
    }

    // Includes Hooks
    if ( item.includesHooks ) {
      this.PARTS.hooks = {
        id: "hooks",
        template: "systems/crucible/templates/sheets/item/item-hooks.hbs"
      };
      this.TABS.sheet.push({id: "hooks", group: "sheet", icon: "fa-solid fa-cogs", label: "ITEM.TABS.HOOKS"});
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    if ( this.options.item.includesHooks && !game.user.isGM ) {
      options.parts.findSplice(p => p === "hooks");
    }
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const tabGroups = this._getTabs();
    const source = this.document.toObject();
    const context = {
      item: this.document,
      source,
      system: source.system,
      isEditable: this.isEditable,
      fieldDisabled: this.isEditable ? "" : "disabled",
      fields: this.document.system.schema.fields,
      hasAdvancedDescription: this.options.item.hasAdvancedDescription,
      tabGroups,
      tabs: tabGroups.sheet,
      tabsPartial: this.constructor.PARTS.tabs.template,
      tags: this.document.getTags()
    };

    // Physical Items
    if ( this.document.system instanceof CruciblePhysicalItem ) {
      context.propertiesWidget = this.#propertiesWidget.bind(this);
      context.currencyInput = this.#currencyInput.bind(this);
      context.scaledPriceField = new foundry.data.fields.StringField({label: game.i18n.localize("ITEM.SHEET.SCALED_PRICE")});
      context.requiresInvestment = source.system.equipped && this.document.system.properties.has("investment");
    }
    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  async _preparePartContext(partId, context) {
    switch ( partId ) {
      case "actions":
        context.actionPartial = this.constructor.ACTION_PARTIAL;
        context.actions = await this.constructor.prepareActions(this.document);
        break;
      case "description":
        const editorCls = CONFIG.ux.TextEditor;
        const editorOptions = {relativeTo: this.document, secrets: this.document.isOwner};
        if ( this.options.item.hasAdvancedDescription ) {
          const {public: publicSrc, private: privateSrc} = context.source.system.description;
          context.description = {
            tab: context.tabs.description,
            fields: context.fields.description.fields,
            publicSrc,
            publicHTML: await editorCls.enrichHTML(publicSrc, editorOptions),
            publicClass: publicSrc ? "" : "empty",
            privateSrc,
            privateHTML: await editorCls.enrichHTML(privateSrc, editorOptions),
            privateClass: privateSrc ? "" : "empty"
          };
        } else {
          const src = context.source.system.description;
          context.description = {
            tab: context.tabs.description,
            field: context.fields.description,
            publicSrc: src,
            publicHTML: await editorCls.enrichHTML(src, editorOptions)
          };
        }
        break;
      case "hooks":
        context.actorHooks = this.#prepareActorHooks();
        context.actorHookChoices = Object.entries(SYSTEM.ACTOR.HOOKS).map(([hookId, cfg]) => ({
          value: hookId,
          label: hookId,
          group: game.i18n.localize(cfg.group),
          disabled: hookId in context.actorHooks
        }));
        break;
    }
    return context;
  }

  /* -------------------------------------------- */

  /**
   * Prepare data for the actor hooks currently registered by this item.
   * @returns {Record<string, {label: string, signature: string, argNames: string[]}>}
   */
  #prepareActorHooks() {
    const hooks = {};
    for ( const h of this.document.system.actorHooks ) {
      const cfg = SYSTEM.ACTOR.HOOKS[h.hook];
      const label = `${h.hook}(item, ${cfg.argNames.join(", ")})`;
      hooks[h.hook] = {label, ...h};
    }
    return hooks;
  }

  /* -------------------------------------------- */

  /**
   * Render the properties field as a multi-checkboxes element.
   * @returns {HTMLMultiCheckboxElement}
   */
  #propertiesWidget(field, groupConfig, inputConfig) {
    inputConfig.name = field.fieldPath;
    const PROPERTIES = this.document.system.constructor.ITEM_PROPERTIES;
    inputConfig.options = Object.entries(PROPERTIES).map(([k, v]) => ({value: k, label: v.label}));
    inputConfig.type = "checkboxes";
    return foundry.applications.fields.createMultiSelectInput(inputConfig);
  }

  /* -------------------------------------------- */

  /**
   * Render a price field using a HTMLCrucibleCurrencyElement element.
   * @returns {HTMLCrucibleCurrencyElement}
   */
  #currencyInput(field, inputConfig) {
    return crucible.api.applications.elements.HTMLCrucibleCurrencyElement.create(inputConfig);
  }

  /* -------------------------------------------- */

  /**
   * Configure the tabs used by this sheet.
   * @returns {Record<string, Record<string, ApplicationTab>>}
   * @protected
   */
  _getTabs() {
    const tabs = {};
    for ( const [groupId, config] of Object.entries(this.constructor.TABS) ) {
      const group = {};
      for ( const t of config ) {
        const active = this.tabGroups[t.group] === t.id;
        group[t.id] = Object.assign({active, cssClass: active ? "active" : ""}, t);
      }
      tabs[groupId] = group;
    }

    // Description style
    const adv = this.options.item.hasAdvancedDescription;
    tabs.sheet.description.cssClass = [
      tabs.sheet.description.cssClass,
      "biography",
      "description",
      adv ? "description-advanced" : ""
    ].filterJoin(" ");

    // Restrict access to hooks
    if ( !game.user.isGM ) delete tabs.sheet.hooks;
    return tabs;
  }

  /* -------------------------------------------- */

  /**
   * Prepare an array of actions for sheet rendering.
   * @param {CrucibleItem} item         An Item that provides actions
   * @returns {Promise<object[]>}       An object of data suitable for sheet rendering
   */
  static async prepareActions(item) {
    const editorCls = CONFIG.ux.TextEditor;
    const editorOptions = {relativeTo: item, secrets: item.isOwner};
    return Promise.all(item.system.actions.map(async action => ({
      id: action.id,
      name: action.name,
      img: action.img,
      condition: action.condition,
      description: await editorCls.enrichHTML(action.description, editorOptions),
      tags: action.getTags(),
      effects: action.effects
    })));
  }

  /* -------------------------------------------- */
  /*  HTML Rendering Helpers
  /* -------------------------------------------- */

  /**
   * A helper for quickly creating HTML elements.
   * @returns {HTMLElement}
   * @internal
   */
  static _createElement(tagName, {innerText, className}={}) {
    const el = document.createElement(tagName);
    if ( innerText ) el.innerText = innerText;
    if ( className ) el.className = className;
    return el;
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Prepare submission data for the form when needed as a side effect of some other workflow.
   * @param {Event} event
   * @returns {object}
   * @protected
   */
  _getSubmitData(event) {
    const fd = new FormDataExtended(this.element);
    return this._prepareSubmitData(event, this.element, fd);
  }

  /* -------------------------------------------- */

  /** @override */
  _processFormData(event, form, formData) {
    const submitData = foundry.utils.expandObject(formData.object);
    if ( this.options.item.includesHooks ) {
      submitData.system.actorHooks = Object.values(submitData.system.actorHooks || {});
    }
    return submitData;
  }

  /* -------------------------------------------- */

  /**
   * Add a new Action to the Item.
   * @this {CrucibleBaseItemSheet}
   * @param {PointerEvent} event          The initiating click event
   * @returns {Promise<void>}
   */
  static async #onActionAdd(event) {
    const fd = this._getSubmitData(event);
    const actions = this.document.system.toObject().actions;

    // Configure Action data
    const suffix = actions.length ? actions.length + 1 : "";
    const actionData = {id: crucible.api.methods.generateId(this.document.name)};
    if ( actions.length ) {
      actionData.id += suffix;
      actionData.name = `${this.document.name} ${suffix}`;
    }

    // Add data to the actions array
    const action = new crucible.api.models.CrucibleAction(actionData, {parent: this.document.system});
    actions.push(action.toObject());
    fd.system.actions = actions;
    await this.document.update(fd);

    // Render the action configuration sheet
    await action.sheet.render({force: true});
  }

  /* -------------------------------------------- */

  /**
   * Delete an Action from the Item.
   * @this {CrucibleBaseItemSheet}
   * @param {PointerEvent} event          The initiating click event
   * @param {HTMLAnchorElement} button    The clicked button element
   * @returns {Promise<void>}
   */
  static async #onActionDelete(event, button) {
    const actionId = button.closest(".action").dataset.actionId;
    const idx = this.document.system.actions.findIndex(a => a.id === actionId);
    const action = this.document.system.actions[idx];
    if ( !action ) throw new Error(`Invalid Action id "${actionId}" requested for deletion`);

    // Prompt for confirmation
    const confirm = await api.DialogV2.confirm({
      title: game.i18n.format("ACTION.ACTIONS.DELETE", {name: action.name}),
      content: `<p>${game.i18n.format("ACTION.ACTIONS.DELETE_CONFIRM", {
        name: action.name, 
        parent: this.document.name,
        type: game.i18n.localize(CONFIG.Item.typeLabels[this.document.type])
      })}</p>`
    });
    if ( !confirm ) return;
    if ( action.sheet.rendered ) action.sheet.close();

    // Remove the action and save
    const fd = this._getSubmitData(event);
    const actions = this.document.system.toObject().actions;
    actions.splice(idx, 1);
    fd.system.actions = actions;
    await this.document.update(fd);
  }

  /* -------------------------------------------- */

  /**
   * Edit an Action from the Item.
   * @this {CrucibleBaseItemSheet}
   * @param {PointerEvent} event          The initiating click event
   * @param {HTMLAnchorElement} button    The clicked button element
   * @returns {Promise<void>}
   */
  static async #onActionEdit(event, button) {
    const actionId = button.closest(".action").dataset.actionId;
    const action = this.document.system.actions.find(a => a.id === actionId);
    await action.sheet.render(true);
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleBaseItemSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onExpandSection(_event, target) {
    const section = target.closest(".sheet-section");
    const wasExpanded = section.classList.contains("expanded");
    if ( wasExpanded ) {
      for ( const s of section.parentElement.children ) s.classList.remove("expanded", "collapsed");
      return;
    }
    for ( const s of section.parentElement.children ) {
      s.classList.toggle("expanded", s === section);
      s.classList.toggle("collapsed", s !== section);
    }
  }

  /* -------------------------------------------- */

  /**
   * Add a new hooked function to this Talent.
   * @this {CrucibleTalentItemSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onHookAdd(event, target) {
    const hook = target.previousElementSibling.value;
    const submitData = this._getSubmitData(event);
    submitData.system.actorHooks ||= [];
    if ( submitData.system.actorHooks.find(h => h.hook === hook ) ) {
      ui.notifications.warn(`${this.document.name} already declares a function for the "${hook}" hook.`);
      return;
    }
    submitData.system.actorHooks.push({hook, fn: "// Hook code here"});
    await this.document.update(submitData);
  }

  /* -------------------------------------------- */

  /**
   * Delete a hooked function from this Talent.
   * @this {CrucibleTalentItemSheet}
   * @param {PointerEvent} event
   * @returns {Promise<void>}
   */
  static async #onHookDelete(event, target) {
    const hook = target.closest(".hook").querySelector("input[type=hidden]").value;
    const submitData = this._getSubmitData(event);
    submitData.system.actorHooks.findSplice(h => h.hook === hook);
    await this.document.update(submitData);
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "accessory" type.
 */
class CrucibleAccessoryItemSheet extends CrucibleBaseItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "accessory",
      includesActions: true,
      includesHooks: true,
      hasAdvancedDescription: true
    }
  };

  /** @inheritDoc */
  static PARTS = {
    ...super.PARTS,
  };

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }
}/**
 * A common base class for Item types which contribute to Actor details definition:
 * 1. Ancestry
 * 2. Background
 * 3. Archetype
 * 4. Taxonomy
 */
class CrucibleActorDetailsItemSheet extends CrucibleBaseItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    actions: {
      removeEquipment: CrucibleActorDetailsItemSheet.#onRemoveEquipment,
      toggleEquipped: CrucibleActorDetailsItemSheet.#toggleEquipped,
      removeTalent: CrucibleActorDetailsItemSheet.#onRemoveTalent
    }
  };

  /**
   * The template partial used to render an included talent.
   * @type {string}
   */
  static INCLUDED_TALENT_TEMPLATE = "systems/crucible/templates/sheets/item/included-talent.hbs";

  /** @override */
  static PARTS = {
    ...super.PARTS,
    talents: {
      id: "talents",
      template: "systems/crucible/templates/sheets/item/item-talents.hbs",
      templates: [this.INCLUDED_TALENT_TEMPLATE],
      scrollable: [".talents-list"]
    }
  };

  /**
   * Define the structure of tabs used by this Item Sheet.
   * @type {Record<string, Array<Record<string, ApplicationTab>>>}
   */
  static TABS = foundry.utils.deepClone(super.TABS);
  static {
    this.TABS.sheet.push({id: "talents", group: "sheet", icon: "fa-solid fa-bookmark", label: "ITEM.TABS.TALENTS"});
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.talents = await this._prepareTalents();
    context.talentPartial = this.constructor.INCLUDED_TALENT_TEMPLATE;
    return context;
  }

  /* -------------------------------------------- */

  /**
   * Retrieve talents and prepare for rendering.
   * @returns {Promise<object[]>}
   * @protected
   */
  async _prepareTalents() {
    const uuids = this.document.system.talents;
    const promises = [];
    for ( const uuid of uuids ) {
      promises.push(fromUuid(uuid).then(talent => {
        if ( !talent ) return {uuid, name: "INVALID", img: "", description: "", tags: {}};
        return {
          uuid,
          name: talent.name,
          img: talent.img,
          description: talent.system.description,
          tags: talent.getTags()
        }
      }));
    }
    return Promise.all(promises);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    if ( !this.isEditable ) return;
    const dropZone = this.element.querySelector(".talent-drop");
    dropZone?.addEventListener("drop", this.#onDropTalent.bind(this));
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _processSubmitData(event, form, submitData, options) {
    if ( this.document.parent instanceof foundry.documents.Actor ) {
      try {
        const diff = this.document.updateSource(submitData, {dryRun: true, validate: true});
        if ( foundry.utils.isEmpty(diff) ) return;
      } catch(err) {
        ui.notifications.warn(err.message);
        return;
      }

      // Apply the updated detail item
      const item = this.document.clone(submitData);
      await this.document.parent._applyDetailItem(item, {skillTalents: this.document.parent.type === "hero"});

      // Update this document and re-render the sheet
      this.document.updateSource(item.toObject());
      await this.render();
      return;
    }
    return super._processSubmitData(event, form, submitData, options);
  }

  /* -------------------------------------------- */

  /**
   * Handle drop events for a talent added to this sheet.
   * @param {DragEvent} event
   * @returns {Promise<*>}
   */
  async #onDropTalent(event) {
    const data = CONFIG.ux.TextEditor.getDragEventData(event);
    const talents = this.document.system.talents;
    if ( (data.type !== "Item") || talents.has(data.uuid) ) return;
    const talent = await fromUuid(data.uuid);
    if ( talent?.type !== "talent" ) return;
    if ( talent.system.node?.tier && (talent.system.node.tier !== 0 ) ) {
      return ui.notifications.error("BACKGROUND.ERRORS.TALENT_TIER", {localize: true});
    }
    const updateData = {system: {talents: [...talents, data.uuid]}};
    return this._processSubmitData(event, this.form, updateData);
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleActorDetailsItemSheet}
   * @type {ApplicationClickAction}
   */
  static async #onRemoveTalent(event, target) {
    const talent = target.closest(".talent");
    const talents = new Set(this.document.system.talents);
    const uuid = talent.dataset.uuid;
    talents.delete(uuid);
    const updateData = {system: {talents: [...talents]}};
    return this._processSubmitData(event, this.form, updateData);
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleActorDetailsItemSheet}
   * @type {ApplicationClickAction}
   */
  static async #toggleEquipped(event) {
    const item = event.target.closest(".equipment");
    const equipment = this.document.system.equipment;
    const uuid = item.dataset.uuid;
    const existingItem = equipment.find(i => i.item === uuid);
    existingItem.equipped = !existingItem.equipped;
    const updateData = {system: {equipment}};
    return this._processSubmitData(event, this.form, updateData);
  }

  /* -------------------------------------------- */

  /**
   * @this {CrucibleActorDetailsItemSheet}
   * @type {ApplicationClickAction}
   */
  static async #onRemoveEquipment(event) {
    const item = event.target.closest(".equipment");
    const uuid = item.dataset.uuid || null;
    const equipment = this.document.system._source.equipment.filter(i => i.item !== uuid);
    const updateData = {system: {equipment}};
    return this._processSubmitData(event, this.form, updateData);
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "ancestry" type.
 */
class CrucibleAncestryItemSheet extends CrucibleActorDetailsItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "ancestry"
    }
  };

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }

  /* -------------------------------------------- */

  /** @override */
  _processFormData(event, form, formData) {
    const submitData = super._processFormData(event, form, formData);

    // Only allow (primary,secondary) or (resistance,vulnerability) to be submitted if both are defined
    const pairs = [["primary", "secondary"], ["resistance", "vulnerability"]];
    for ( const [a, b] of pairs ) {
      if ( !(submitData.system[a] && submitData.system[b]) ) {
        delete submitData.system[a];
        delete submitData.system[b];
      }
    }
    return submitData;
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "background" type.
 */
class CrucibleBackgroundItemSheet extends CrucibleActorDetailsItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "background"
    }
  };

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return Object.assign(context, {
      languages: this.#prepareLanguageOptions()
    });
  }

  /* -------------------------------------------- */

  #prepareLanguageOptions() {
    const categories = crucible.CONFIG.languageCategories;
    const options = [];
    for ( const [value, {label, category}] of Object.entries(crucible.CONFIG.languages) ) {
      options.push({value, label, group: categories[category]?.label});
    }
    return options;
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "archetype" type.
 */
class CrucibleArchetypeItemSheet extends CrucibleBackgroundItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "archetype"
    }
  };

  /**
   * The template partial used to render an included equipment item.
   * @type {string}
   */
  static INCLUDED_EQUIPMENT_TEMPLATE = "systems/crucible/templates/sheets/item/included-equipment.hbs";

  /** @override */
  static PARTS = {
    ...super.PARTS,
    equipment: {
      id: "equipment",
      template: "systems/crucible/templates/sheets/item/item-equipment.hbs",
      templates: [this.INCLUDED_EQUIPMENT_TEMPLATE],
      scrollable: [".equipment-list"]
    }
  };

  /** @inheritDoc */
  static TABS = foundry.utils.deepClone(super.TABS);
  static {
    this.TABS.sheet.push({id: "equipment", group: "sheet", icon: "fa-solid fa-suitcase", label: "ITEM.TABS.EQUIPMENT"});
  }

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return Object.assign(context, {
      abilities: Object.values(SYSTEM.ABILITIES).map(ability => ({
        field: context.fields.abilities.fields[ability.id],
        id: ability.id,
        label: ability.label,
        value: context.source.system.abilities[ability.id]
      })),
      equipment: await this._prepareEquipment(),
      equipmentPartial: this.constructor.INCLUDED_EQUIPMENT_TEMPLATE
    });
  }

  /* -------------------------------------------- */

  /**
   * Retrieve equipment and prepare for rendering.
   * @returns {Promise<{uuid: string, name: string, img: string, description: string, tags: object[], quantity: number, equipped: boolean}>}
   * @protected
   */
  async _prepareEquipment() {
    const equipment = this.document.system.equipment;
    const promises = [];
    for ( const {item: uuid, quantity, equipped} of equipment ) {
      promises.push(fromUuid(uuid).then(item => {
        if ( !item ) return {uuid, name: "INVALID", img: "", description: "", tags: {}, quantity: 1, equipped: false};
        return {
          uuid,
          name: item.name,
          img: item.img,
          description: item.system.description.public,
          tags: item.getTags(),
          cssClass: [item.type, equipped ? "equipped" : ""].filterJoin(" "),
          quantity,
          equipped
        }
      }));
    }
    return Promise.all(promises);
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    this.#updateAbilitySum();
    if ( !this.isEditable ) return;
    const dropZone = this.element.querySelector(".equipment-drop");
    dropZone?.addEventListener("drop", this.#onDropEquipment.bind(this));
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onChangeForm(formConfig, event) {
    super._onChangeForm(formConfig, event);
    const group = event.target.closest(".form-group");
    if ( group?.classList.contains("abilities") )  this.#updateAbilitySum();
  }

  /* -------------------------------------------- */

  /**
   * Update the indicator for whether the ability configuration for the Archetype is valid.
   */
  #updateAbilitySum() {
    const abilities = this.element.querySelector(".abilities");
    const inputs = abilities.querySelectorAll("input[type=number]");
    const total = Array.from(inputs).reduce((t, input) => t + input.valueAsNumber, 0);
    const valid = total === 12;
    const icon = valid ? "fa-solid fa-check" : "fa-solid fa-times";
    const span = abilities.querySelector(".sum");
    span.innerHTML = `${total} <i class="${icon}"></i>`;
    span.classList.toggle("invalid", !valid);
  }

  /* -------------------------------------------- */

  /**
   * Handle drop events for an equipment item added to this sheet.
   * @param {DragEvent} event
   * @returns {Promise<*>}
   */
  async #onDropEquipment(event) {
    const data = foundry.applications.ux.TextEditor.getDragEventData(event);
    const equipment = this.document.system.equipment;
    if ( (data.type !== "Item") || equipment.map(e => e.item).includes(data.uuid) ) return;
    const item = await fromUuid(data.uuid);
    if ( !(item?.system instanceof crucible.api.models.CruciblePhysicalItem) ) return;

    // Update Actor detail or permanent Item
    const updateData = {system: {equipment: [...equipment, {item: data.uuid, quantity: item.system.quantity ?? 1, equipped: !!item.system.equipped}]}};
    if ( this.document.parent instanceof foundry.documents.Actor ) {
      return this._processSubmitData(event, this.form, updateData);
    }
    return this.document.update(updateData);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _processFormData(event, form, formData) {
    const submitData = super._processFormData(event, form, formData);
    const fields = this.document.system.schema.fields;

    // Handle equipment quantity changes
    if (submitData.system.equipment) {
      const updatedEquipment = [...this.document.system.equipment];
      for (const [idx, changes] of Object.entries(submitData.system.equipment)) {
        foundry.utils.mergeObject(updatedEquipment[idx], changes);
      }
      submitData.system.equipment = updatedEquipment;
    }

    // Force replace ability progression
    if ( fields.abilities.validate(submitData.system.abilities) === undefined ) {
      submitData.system["==abilities"] = submitData.system.abilities;
    }
    delete submitData.system.abilities;
    return submitData;
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "armor" type.
 */
class CrucibleArmorItemSheet extends CrucibleBaseItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "armor",
      includesActions: true,
      includesHooks: true,
      hasAdvancedDescription: true
    }
  };

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "consumable" type.
 */
class CrucibleConsumableItemSheet extends CrucibleBaseItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "consumable",
      includesActions: true,
      includesHooks: false,
      hasAdvancedDescription: true
    }
  };

  /** @inheritDoc */
  static PARTS = {
    ...super.PARTS,
  };

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "consumable" type.
 */
class CrucibleLootItemSheet extends CrucibleBaseItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "loot",
      includesActions: false,
      includesHooks: false,
      hasAdvancedDescription: true
    }
  };

  /** @inheritDoc */
  static PARTS = {...super.PARTS};

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "schematic" type.
 */
class CrucibleSchematicItemSheet extends CrucibleBaseItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "schematic",
      includesActions: false,
      includesHooks: false,
      hasAdvancedDescription: true
    },
    position: {
      width: 640
    },
    actions: {
      inputAdd: CrucibleSchematicItemSheet.#onAddInput,
      inputRemove: CrucibleSchematicItemSheet.#onRemoveInput,
      outputAdd: CrucibleSchematicItemSheet.#onAddOutput,
      outputRemove: CrucibleSchematicItemSheet.#onRemoveOutput,
      itemRemove: CrucibleSchematicItemSheet.#onRemoveItem
    }
  };

  static INPUT_PARTIAL = "systems/crucible/templates/sheets/item/schematic-input.hbs";
  static OUTPUT_PARTIAL = "systems/crucible/templates/sheets/item/schematic-output.hbs";

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
    this.PARTS.components = {
      id: "components",
      template: "systems/crucible/templates/sheets/item/schematic-components.hbs",
      templates: [this.INPUT_PARTIAL, this.OUTPUT_PARTIAL]
    };
    this.TABS.sheet.push({
      id: "components",
      group: "sheet",
      icon: "fa-solid fa-list-ol",
      label: "SCHEMATIC.SHEET.COMPONENTS"
    });
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.inputPartial = this.constructor.INPUT_PARTIAL;
    context.outputPartial = this.constructor.OUTPUT_PARTIAL;
    const {inputs, outputs} = await this.#prepareItems();
    context.inputs = inputs;
    context.outputs = outputs;
    context.inputFields = context.fields.inputs.element.fields;
    context.ingredientFields = context.inputFields.ingredients.element.fields;
    context.outputFields = context.fields.outputs.element.element.fields;
    return context;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the ingredients and outputs rendered in the schematic sheet.
   * @returns {Promise<{inputs: object[], outputs: object[]}>}
   */
  async #prepareItems() {

    // Preload necessary Item documents
    let {inputs, outputs} = this.document.system;
    const uuids = [
      ...inputs.flatMap(i => i.ingredients.map(g => g.item)),
      ...outputs.flatMap(output => output.map(o => o.item))
    ];
    await this.#preloadItems(uuids);

    // Prepare Inputs
    inputs = foundry.utils.deepClone(inputs);
    const templates = [];
    for ( const [i, input] of inputs.entries() ) {
      input.fieldPath = `system.inputs.${i}`;
      input.ingredients = input.ingredients.map((ingredient, j) => this.#prepareIngredient(ingredient, i, j));
      if ( input.mode === "TEMPLATE" ) {
        for ( const i of input.ingredients ) {
          templates.push({...i, name: `${i.name} + ${this.document.name}`, fieldPath: ""});
        }
      }
    }

    // Prepare Outputs
    outputs = foundry.utils.deepClone(outputs).map((outputGroup, i) => {
      return {
        products: outputGroup.map((output, j) => this.#prepareOutput(output, i, j)),
        template: false,
        editable: this.isEditable
      }
    });

    // Include Templates
    if ( templates.length ) outputs.unshift({
      products: templates,
      template: true,
      editable: false
    });
    return {inputs, outputs};
  }

  /* -------------------------------------------- */

  /**
   * Preload Item documents necessary for rendering.
   * @param {string[]} uuids
   * @returns {Promise<void>}
   */
  async #preloadItems(uuids) {
    const toLoad = {};
    for ( const uuid of uuids ) {
      const parsed = foundry.utils.parseUuid(uuid);
      if ( !(parsed.collection instanceof foundry.documents.collections.CompendiumCollection) ) continue;
      const packId = parsed.collection.collection;
      const pack = game.packs.get(packId);
      if ( pack.has(parsed.id) ) continue;
      toLoad[packId] ||= [];
      toLoad[packId].push(parsed.id);
    }
    await Promise.all(Object.entries(toLoad).map(async ([packId, documentIds]) => {
      const pack = game.packs.get(packId);
      return pack.getDocuments({_id__in: documentIds});
    }));
  }

  /* -------------------------------------------- */

  /**
   * Prepare an input ingredient to be rendered in the schematic input partial.
   */
  #prepareIngredient(ingredient, i, j) {
    const item = fromUuidSync(ingredient.item);
    const tags = item.getTags("short");
    delete tags.uses;
    return {
      fieldPath: `system.inputs.${i}.ingredients.${j}`,
      uuid: ingredient.item,
      name: item.name,
      img: item.img,
      tags,
      quantity: ingredient.quantity,
      quality: ingredient.quality,
      consumed: ingredient.consumed
    };
  }

  /* -------------------------------------------- */

  /**
   * Prepare an output product to be rendered in the schematic output partial.
   */
  #prepareOutput(output, i, j) {
    const item = fromUuidSync(output.item);
    const tags = item.getTags();
    tags.quality = SYSTEM.ITEM.QUALITY_TIERS[this.document.system.quality].label;
    return {
      fieldPath: `system.outputs.${i}.${j}`,
      uuid: output.item,
      name: item.name,
      img: item.img,
      tags,
      quantity: output.quantity
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    if ( !this.isEditable ) return;
    const components = this.element.querySelector("section.tab[data-tab=components]");
    components.addEventListener("drop", this.#onDropComponents.bind(this));
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _processFormData(event, form, updateData) {
    const submitData = super._processFormData(event, form, updateData);
    submitData.system.inputs = Object.values(submitData.system.inputs || {}).map(input => {
      input.ingredients = Object.values(input.ingredients || {});
      return input;
    });
    submitData.system.outputs = Object.values(submitData.system.outputs || {}).map(o => Object.values(o));
    return submitData;
  }

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Handle dropping input or output items on the components tab in particular drop zones.
   * @param event
   */
  async #onDropComponents(event) {
    const data = CONFIG.ux.TextEditor.getDragEventData(event);
    const dropZone = event.target.closest(".droppable");
    if ( !dropZone || (data?.type !== "Item") ) return;
    let {field, index} = dropZone.closest("fieldset").dataset;
    index = Number(index);
    const updateData = {system: {}};
    switch ( field ) {
      case "inputs":
        updateData.system.inputs = this.document.system.toObject().inputs;
        updateData.system.inputs[index].ingredients.push({item: data.uuid, quantity: 1});
        break;
      case "outputs":
        updateData.system.outputs = this.document.system.toObject().outputs;
        updateData.system.outputs[index].push({item: data.uuid, quantity: 1});
        break;
    }
    await this.submit({updateData});
  }

  /* -------------------------------------------- */

  /**
   * Handle click actions to add a new input group.
   * @this {CrucibleSchematicItemSheet}
   * @type {ApplicationClickAction}
   */
  static async #onAddInput(event, _target) {
    if ( !this.isEditable ) return;
    const inputs = this.document.system.toObject().inputs;
    const inputSchema = this.document.system.schema.fields.inputs.element;
    inputs.push(inputSchema.clean({}));
    await this.submit({updateData: {system: {inputs}}});
  }

  /* -------------------------------------------- */

  /**
   * Handle click actions to remove an input group.
   * @this {CrucibleSchematicItemSheet}
   * @type {ApplicationClickAction}
   */
  static async #onRemoveInput(event, target) {
    if ( !this.isEditable ) return;
    const idx = Number(target.closest("fieldset").dataset.index);
    const inputs = this.document.system.toObject().inputs;
    inputs.splice(idx, 1);
    await this.submit({updateData: {system: {inputs}}});
  }

  /* -------------------------------------------- */

  /**
   * Handle click actions to add an output group.
   * @this {CrucibleSchematicItemSheet}
   * @type {ApplicationClickAction}
   */
  static async #onAddOutput(event, _target) {
    if ( !this.isEditable ) return;
    const outputs = this.document.system.toObject().outputs;
    outputs.push([]);
    await this.submit({updateData: {system: {outputs}}});
  }

  /* -------------------------------------------- */

  /**
   * Handle click actions to remove an output group.
   * @this {CrucibleSchematicItemSheet}
   * @type {ApplicationClickAction}
   */
  static async #onRemoveOutput(event, target) {
    if ( !this.isEditable ) return;
    const idx = Number(target.closest("fieldset").dataset.index);
    const outputs = this.document.system.toObject().outputs;
    outputs.splice(idx, 1);
    await this.submit({updateData: {system: {outputs}}});
  }

  /* -------------------------------------------- */

  /**
   * Handle click actions to remove a specific ingredient.
   * @this {CrucibleSchematicItemSheet}
   * @type {ApplicationClickAction}
   */
  static async #onRemoveItem(event, target) {
    if ( !this.isEditable ) return;
    const {index, field} = target.closest("fieldset").dataset;
    const i = Number(index);
    const j = Number(target.closest('.line-item').dataset.index);
    const updateData = {system: {}};
    switch ( field ) {
      case "inputs":
        updateData.system.inputs = this.document.system.toObject().inputs;
        updateData.system.inputs[i].ingredients.splice(j, 1);
        break;
      case "outputs":
        updateData.system.outputs = this.document.system.toObject().outputs;
        updateData.system.outputs[i].splice(j, 1);
        break;
    }
    await this.submit({updateData});
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "spell" type.
 */
class CrucibleSpellItemSheet extends CrucibleBaseItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "spell",
      includesActions: true,
      includesHooks: true
    }
  };

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "talent" type.
 */
class CrucibleTalentItemSheet extends CrucibleBaseItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "talent",
      includesActions: true,
      includesHooks: true
    }
  };

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.trainingRanks = Object.values(SYSTEM.TALENT.TRAINING_RANKS).reduce((arr, r) => {
      if ( r.rank > 0 ) arr.push({value: r.rank, label: r.label});
      return arr;
    }, []);
    return context;
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "taxonomy" type.
 */
class CrucibleTaxonomyItemSheet extends CrucibleActorDetailsItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "taxonomy"
    }
  };

  static {
    this._initializeItemSheetClass();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return Object.assign(context, {
      abilities: Object.values(SYSTEM.ABILITIES).map(ability => ({
        field: context.fields.abilities.fields[ability.id],
        id: ability.id,
        label: ability.label,
        value: context.source.system.abilities[ability.id]
      })),
      resistances: Object.values(SYSTEM.DAMAGE_TYPES).map(damage => ({
        field: context.fields.resistances.fields[damage.id],
        id: damage.id,
        label: damage.label,
        value: context.source.system.resistances[damage.id]
      }))
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    this.#updateAbilitySum();
    this.#updateResistanceSum();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onChangeForm(formConfig, event) {
    super._onChangeForm(formConfig, event);
    const group = event.target.closest(".form-group");
    if ( group?.classList.contains("abilities") )  this.#updateAbilitySum();
    else if ( group?.classList.contains("resistances") ) this.#updateResistanceSum();
  }

  /* -------------------------------------------- */

  /**
   * Update the indicator for whether the ability configuration for the Taxonomy is valid.
   */
  #updateAbilitySum() {
    const abilities = this.element.querySelector(".abilities");
    const inputs = abilities.querySelectorAll("input[type=number]");
    const total = Array.from(inputs).reduce((t, input) => t + input.valueAsNumber, 0);
    const valid = total === 12;
    const icon = valid ? "fa-solid fa-check" : "fa-solid fa-times";
    const span = abilities.querySelector(".sum");
    span.innerHTML = `${total} <i class="${icon}"></i>`;
    span.classList.toggle("invalid", !valid);
  }

  /* -------------------------------------------- */

  /**
   * Update the indicator for whether the resistance configuration for the Taxonomy is valid.
   */
  #updateResistanceSum() {
    const resistances = this.element.querySelector(".resistances");
    const inputs = resistances.querySelectorAll("input[type=number]");
    const total = Array.from(inputs).reduce((t, input) => t + input.valueAsNumber, 0);
    const valid = total === 0;
    const icon = valid ? "fa-solid fa-check" : "fa-solid fa-times";
    const span = resistances.querySelector(".sum");
    span.innerHTML = `${total} <i class="${icon}"></i>`;
    span.classList.toggle("invalid", !valid);
  }

  /* -------------------------------------------- */

  /** @override */
  _processFormData(event, form, formData) {
    const submitData = super._processFormData(event, form, formData);
    const fields = this.document.system.schema.fields;
    const {abilities, resistances} = submitData.system;
    if ( fields.abilities.validate(abilities) !== undefined ) return {};
    if ( fields.resistances.validate(resistances) !== undefined ) return {};
    return submitData;
  }
}/**
 * A CrucibleBaseItemSheet subclass used to configure Items of the "weapon" type.
 */
class CrucibleWeaponItemSheet extends CrucibleBaseItemSheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    item: {
      type: "weapon",
      includesActions: true,
      includesHooks: true,
      hasAdvancedDescription: true
    }
  };

  /** @inheritDoc */
  static PARTS = {
    ...super.PARTS,

  };

  // Initialize subclass options
  static {
    this._initializeItemSheetClass();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const allowedSlots = this.document.system.getAllowedEquipmentSlots();
    Object.assign(context, {
      showSlots: this.document.system.equipped && allowedSlots.length,
      equipmentSlots: Object.entries(SYSTEM.WEAPON.SLOTS.choices).reduce((arr, [value, label]) => {
        arr.push({value, label, disabled: !allowedSlots.includes(Number(value))});
        return arr;
      }, []),
      usesReload: this.document.config.category.reload,
    });
    return context;
  }
}/**
 * Define a custom JournalEntrySheet subclass used for the Crucible rules journal entries.
 */
class CrucibleJournalEntrySheet extends foundry.applications.sheets.journal.JournalEntrySheet {

  /** @override */
  static DEFAULT_OPTIONS = {
    position: {
      width: 1080
    },
    classes: ["crucible", "themed", "theme-dark"]
  };

  /** @override */
  get title() {
    let title = super.title;
    if ( this.document.pack === "crucible.rules" ) title = `${game.i18n.localize("CRUCIBLE.Rules")}: ${title}`;
    return title;
  }
}/**
 * Extend and replace the core CombatTracker class to add Crucible-specific UI customizations.
 */
class CrucibleCombatTracker extends foundry.applications.sidebar.tabs.CombatTracker {

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    for ( const i of this.element.querySelectorAll(".combatant-control.roll") ) i.remove();
  }
}/**
 * Override the base TokenHUD class to implement some Crucible-specific presentation.
 * TODO Eventually it will add custom resource management, action HUD, etc...
 */
class CrucibleTokenHUD extends foundry.applications.hud.TokenHUD {

  /** @override */
  _getMovementActionChoices() {
    const choices = super._getMovementActionChoices();
    if ( this.document.actor?.type === "group" ) {
      delete choices[""];
      if ( !this.document._source.movementAction ) Object.assign(choices.normal, {isActive: true, cssClass: "active"});
    }
    return choices;
  }
}// Submodules
var applications=/*#__PURE__*/Object.freeze({__proto__:null,AdversarySheet:AdversarySheet,CrucibleAccessoryItemSheet:CrucibleAccessoryItemSheet,CrucibleActionConfig:CrucibleActionConfig,CrucibleAncestryItemSheet:CrucibleAncestryItemSheet,CrucibleArchetypeItemSheet:CrucibleArchetypeItemSheet,CrucibleArmorItemSheet:CrucibleArmorItemSheet,CrucibleBackgroundItemSheet:CrucibleBackgroundItemSheet,CrucibleBaseActorSheet:CrucibleBaseActorSheet,CrucibleBaseItemSheet:CrucibleBaseItemSheet,CrucibleCombatTracker:CrucibleCombatTracker,CrucibleConsumableItemSheet:CrucibleConsumableItemSheet,CrucibleGroupActorSheet:CrucibleGroupActorSheet,CrucibleHeroCreationSheet:CrucibleHeroCreationSheet,CrucibleJournalSheet:CrucibleJournalEntrySheet,CrucibleLootItemSheet:CrucibleLootItemSheet,CrucibleSchematicItemSheet:CrucibleSchematicItemSheet,CrucibleSpellItemSheet:CrucibleSpellItemSheet,CrucibleTalentItemSheet:CrucibleTalentItemSheet,CrucibleTaxonomyItemSheet:CrucibleTaxonomyItemSheet,CrucibleTokenHUD:CrucibleTokenHUD,CrucibleWeaponItemSheet:CrucibleWeaponItemSheet,HeroSheet:HeroSheet,elements:_module$3});class CrucibleTokenRuler extends foundry.canvas.placeables.tokens.TokenRuler {

  /** @override */
  static WAYPOINT_LABEL_TEMPLATE = "systems/crucible/templates/hud/token-ruler-waypoint-label.hbs";

  /* -------------------------------------------- */

  /** @override */
  _getWaypointLabelContext(waypoint, state) {
    const context = super._getWaypointLabelContext(waypoint, state);
    const actor = this.token.actor;
    if ( !context || !actor ) return context;
    const grid = canvas.scene?.grid;
    if ( !grid || (grid.distance !== 1) || (grid.units !== "ft") ) return;

    // Recover prior cost (potentially across chains)
    state.priorCost ??= actor.getMovementActionCost(waypoint.previous?.measurement.cost || 0).cost;

    // Measure new segment
    const movement = actor.getMovementActionCost(waypoint.measurement.cost);
    const deltaCost =  movement.cost - state.priorCost;
    state.priorCost = movement.cost;

    context.distance.units = grid.units;
    context.cost = {units: "A", delta: deltaCost};
    context.cost.total = Number.isFinite(movement.cost) ? movement.cost : "Impossible";
    context.cost.showTotal = !waypoint.next;
    context.displayElevation = context.elevation && !context.elevation.hidden;
    return context;
  }
}/**
 * @typedef CrucibleTalentIconConfig
 * @property {number} alpha
 * @property {PIXI.ColorSource} backgroundColor
 * @property {number} size
 * @property {string} [text]
 * @property {PIXI.Texture} [texture]
 * @property {PIXI.Texture} [frameTexture]
 * @property {PIXI.ColorSource} frameTint
 * @property {PIXI.ColorSource} iconTint
 * @property {PIXI.ColorSource|null} splooshColor
 * @property {PIXI.ColorSource|null} underglowColor
 * @property {number} underglowSize
 */

class CrucibleTalentIcon extends PIXI.Container {

  /**
   * The shared filter instance used by all inaccessible icons
   * @type {PIXI.filters.ColorMatrixFilter}
   */
  static greyscaleFilter = new PIXI.ColorMatrixFilter();

  /* -------------------------------------------- */

  /**
   * Talent icon configuration
   * @type {CrucibleTalentIconConfig}
   */
  static DEFAULT_CONFIG = {
    alpha: 1.0,
    backgroundColor: 0x000000,
    size: 64,
    text: undefined,
    texture: undefined,
    frameTexture: undefined,
    frameTint: 0xFFFFFF,
    iconTint: 0xFFFFFF,
    splooshColor: null,
    underglowColor: null,
    underglowSize: 128
  };

  /**
   * The current configuration of the icon. Defined at draw-time.
   */
  config;

  /* -------------------------------------------- */

  /**
   * Customize configuration values for the icon being drawn.
   * @param {Partial<CrucibleTalentIconConfig>} config
   * @returns {CrucibleTalentIconConfig}
   * @protected
   */
  _configure(config) {
    return this.config = {...this.constructor.DEFAULT_CONFIG, config};
  }

  /* -------------------------------------------- */

  /**
   * Draw the talent tree icon
   * @param {Partial<CrucibleTalentIconConfig>} config     New configuration values to apply
   * @returns {Promise<void>}
   */
  async draw(config={}) {
    const c = this._configure(config);
    const spritesheet = crucible.tree.spritesheet;
    this.removeChildren().forEach(c => c.destroy());

    // Icon Shape
    this.shape = this._getShape();

    // Background
    this.underglow = this.addChild(new PIXI.Sprite());
    this.bg = this.addChild(new PIXI.Graphics());
    this.sploosh = this.addChild(new PIXI.Sprite());

    // Icon
    this.icon = this.addChild(new PIXI.Sprite());
    this.icon.anchor.set(0.5, 0.5);
    this.icon.mask = this.addChild(new PIXI.Graphics());

    // Border
    this.frame = this.addChild(new PIXI.Sprite());

    // Number
    const textStyle = foundry.canvas.containers.PreciseText.getTextStyle({fontSize: 24});
    this.number = this.addChild(new foundry.canvas.containers.PreciseText("", textStyle));
    this.number.anchor.set(0.5, 0.5);
    this.number.position.set(this.config.size / 3, -this.config.size / 3);

    // Under glow
    this.underglow.texture = spritesheet.BackgroundGradient;
    this.underglow.width = this.underglow.height = c.underglowSize;
    this.underglow.anchor.set(0.5, 0.5);
    this.underglow.tint = c.underglowColor || 0xFFFFFF;
    this.underglow.alpha = 0.75;
    this.underglow.visible = !!c.underglowColor;

    // Background fill
    this.bg.clear().beginFill(this.config.backgroundColor).drawShape(this.shape).endFill();

    // Sploosh
    if ( c.splooshColor ) {
      this.sploosh.texture = spritesheet.BackgroundGradient;
      this.sploosh.width = this.sploosh.height = c.size;
      this.sploosh.anchor.set(0.5, 0.5);
      this.sploosh.tint = c.splooshColor;
      this.sploosh.visible = true;
    }
    else this.sploosh.visible = false;

    // Draw icon
    this.icon.texture = c.texture;
    this.icon.width = this.icon.height = c.size;
    this.icon.tint = c.iconTint ?? 0xFFFFFF;

    this._drawFrame();
    this._drawMask();

    // Number
    this.number.text = c.text ?? "";
    this.number.visible = !!this.number.text;

    // Interactive hit area
    this.hitArea = new PIXI.Rectangle(-c.size/2, -c.size/2, c.size, c.size);
  }

  /* -------------------------------------------- */

  /**
   * Get the icon shape
   * @returns {PIXI.RoundedRectangle|PIXI.Polygon|PIXI.Circle}
   * @protected
   */
  _getShape() {
    const {shape, size, borderRadius: br} = this.config;
    const hs = size / 2;
    switch ( shape ) {
      case "rect":
        return new PIXI.RoundedRectangle(-hs, -hs, size, size, br);
      case "circle":
        return new PIXI.Circle(0, 0, hs);
      case "hex":
        const borders = [[0, 0.5], [0.25, 0], [0.75, 0], [1, 0.5], [0.75, 1], [0.25, 1]];
        const width = size * 2 / Math.sqrt(3);
        const height = size;
        const points = borders.reduce((arr, [ox, oy]) => {
          arr.push((ox * width) - (width / 2));
          arr.push((oy * height) - (height / 2));
          return arr;
        }, []);
        return new PIXI.Polygon(points);
      default:
        return new PIXI.Circle(0, 0, hs);
    }
  }

  /* -------------------------------------------- */

  /**
   * Draw a mask shape for the node icon.
   * @protected
   */
  _drawMask() {
    this.icon.mask.clear().beginFill(0xFFFFFF, 1.0).drawShape(this.shape);
  }

  /* -------------------------------------------- */

  /**
   * Draw border graphics for the node.
   * @protected
   */
  _drawFrame() {
    this.frame.anchor.set(0.5, 0.5);
    const scale = this.config.size / this.config.frameTexture.height;
    this.frame.scale.set(scale, scale);
    this.frame.texture = this.config.frameTexture;
    this.frame.tint = this.config.frameTint;

  }
}
CrucibleTalentIcon.greyscaleFilter.desaturate();class CrucibleTalentTreeTalent extends CrucibleTalentIcon {
  constructor(node, talent, position) {
    super();
    this.node = node;
    this.talent = talent;
    this.position.set(position.x, position.y);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _configure({active, accessible, ...config}={}) {
    config = super._configure(config);
    const spritesheet = crucible.tree.spritesheet;
    const {actions, rune, gesture, inflection, iconicSpells, training} = this.talent.system;
    const nodeColor = this.node.node.color;

    // Defaults
    config.texture = foundry.canvas.getTexture(this.talent.img);
    config.alpha = active ? 1.0 : 0.6;
    config.underglowColor = active ? nodeColor : null;
    config.frameTint = active ? 0xFFFFFF : 0x7f7f7f; // 50%
    config.iconTint = active ? 0xFFFFFF : Color.fromHSL([nodeColor.hsl[0], 0.05, 0.4]);

    // Active Talents
    if ( actions.length ) {
      config.shape = "rect";
      config.borderRadius = this.config.size / 6;
    }

    // Spellcraft Talents
    else if ( rune || gesture || inflection || iconicSpells ) {
      config.shape = "hex";
    }

    // Training Talents
    else if ( training.type && training.rank ) {
      config.shape = "hex";
    }

    // Passive Talents
    else config.shape = "circle";

    // Further configuration based on shape
    let shape = this.config.shape;
    switch (shape ) {
      case "circle":
        config.shape = "circle";
        config.size = 64;
        config.frameTexture = spritesheet.FrameCircleSmallBronzeShadow;
        break;
      case "hex":
        config.shape = "hex";
        config.size = 64;
        config.frameTexture = spritesheet.FrameHexSmallBronzeShadow;
        break;
      case "rect":
        config.shape = "rect";
        config.size = 64;
        config.frameTexture = spritesheet.FrameSquareSmallBronzeShadow;
        break;
    }
    return config;
  }

  /* -------------------------------------------- */

  /** @override */
  async draw(config) {
    await super.draw(config);
    this.icon.filters = config.accessible ? [] : [this.constructor.greyscaleFilter];
    this.#activateInteraction();
  }

  /* -------------------------------------------- */

  #activateInteraction() {
    this.removeAllListeners();
    this.on("pointerover", this.#onPointerOver.bind(this));
    this.on("pointerout", this.#onPointerOut.bind(this));
    this.on("pointerdown", this.#onClickLeft.bind(this));
    this.on("rightdown", this.#onClickRight.bind(this));
    this.eventMode = "static";
    this.cursor = "pointer";
  }

  /* -------------------------------------------- */

  /**
   * Handle left-click events on a Talent icon to add that talent to the Actor.
   * @param {PIXI.InteractionEvent} event
   * @returns {Promise<void>}
   */
  async #onClickLeft(event) {
    event.stopPropagation();
    if ( event.data.originalEvent.button !== 0 ) return; // Only support standard left-click
    const tree = game.system.tree;
    const actor = tree.actor;
    if ( !actor ) return;
    if ( !actor || actor.talentIds.has(this.talent.id) ) return;
    const response = await actor.addTalent(this.talent, {dialog: true, warnUnusable: true});
    if ( response ) crucible.api.audio.playClick();
  }

  /* -------------------------------------------- */
  /**
   * Handle right-click events on a Talent icon to remove that talent from the Actor.
   * @param {PIXI.InteractionEvent} event
   * @returns {Promise<void>}
   */
  async #onClickRight(event) {
    event.stopPropagation();
    const tree = game.system.tree;
    const actor = tree.actor;
    if ( !actor ) return;
    if ( !actor.system.talentIds.has(this.talent.id) || actor.system.permanentTalentIds.has(this.talent.id) ) return;
    const response = await actor.removeTalent(this.talent, {dialog: true});
    if ( response ) crucible.api.audio.playClick();
  }

  /* -------------------------------------------- */

  /**
   * Handle pointer-over events entering a talent icon within an expanded wheel.
   * @param {PIXI.InteractionEvent} event
   */
  #onPointerOver(event) {
    const tree = crucible.tree;
    if ( event.nativeEvent.target !== tree.canvas ) return;
    event.stopPropagation();
    this.scale.set(1.2, 1.2);
    tree.hud.activate(this);
  }

  /* -------------------------------------------- */

  /**
   * Handle pointer-out events leaving a talent icon within an expanded wheel.
   * @param {PIXI.InteractionEvent} event
   */
  #onPointerOut(event) {
    event.stopPropagation();
    this.scale.set(1.0, 1.0);
    game.system.tree.hud.clear();
  }
}/**
 * A canvas UI element which displays a choice wheel for a talent tree node.
 * Only one choice wheel is displayed at a given time. The wheel is a singleton at canvas.tree.wheel.
 */
class CrucibleTalentChoiceWheel extends PIXI.Container {
  constructor() {
    super();

    /**
     * Background graphics for the wheel
     * @type {PIXI.Sprite}
     */
    this.bg = this.addChild(new PIXI.Sprite());

    /**
     * Edges for showing connections
     * @type {PIXI.Graphics}
     */
    this.edges = this.addChild(new PIXI.Graphics());

    /**
     * Talents available within this wheel
     * @type {PIXI.Container}
     */
    this.talents = this.addChild(new PIXI.Container());
  }

  /* -------------------------------------------- */

  /**
   * The node which the wheel is currently bound to, or null
   * @type {CrucibleTalentTreeNode|null}
   */
  node = null;

  /* -------------------------------------------- */

  /**
   * Activate the talent tree choice wheel for a given node
   * @param {CrucibleTalentTreeNode} node
   * @returns {Promise<void>}
   */
  async activate(node) {
    const tree = game.system.tree;

    // Swap the node
    this.node = node;
    tree.nodes.removeChild(node);
    tree.foreground.addChild(node);

    // Set position
    this.position.set(node.x, node.y);
    this.radius = node.config.size + 64;
    this.#drawBackground();
    await this.#drawTalents();
    this.refresh(); // Set initial display
    this.visible = true;
    this.eventMode = "passive";
  }

  /* -------------------------------------------- */

  /**
   * Activate the talent tree choice wheel.
   */
  deactivate() {
    const tree = game.system.tree;
    if ( this.node ) {
      tree.foreground.removeChild(this.node);
      tree.nodes.addChild(this.node);
    }
    this.edges.clear();
    this.talents.removeChildren().forEach(t => t.destroy());
    this.visible = false;
    this.node = null;
  }

  /* -------------------------------------------- */

  /**
   * Draw the wheel background.
   */
  #drawBackground() {
    this.bg.texture = crucible.tree.spritesheet.WheelMinimal;
    this.bg.anchor.set(0.5, 0.5);
    this.bg.width = this.bg.height = this.radius * 2.7; // 2.7 accounts for 35% wheel texture padding
  }

  /* -------------------------------------------- */

  /**
   * Draw TalentIcon containers to the wheel
   * @returns {Promise<void>}
   */
  async #drawTalents() {
    const talents = this.#getNodeTalents();
    const shape = new PIXI.Circle(0, 0, this.radius);
    const a = (2 * Math.PI) / talents.length;
    let i = 0;
    const color = this.node.node.color;
    for ( const talent of talents ) {
      const isOwned = crucible.tree.actor.talentIds.has(talent.id);
      const position = shape.pointAtAngle((i * a) - (Math.PI / 2) + (a/2));
      await foundry.canvas.loadTexture(talent.img);
      const icon = new CrucibleTalentTreeTalent(this.node, talent, position);
      this.talents.addChild(icon);
      i++;

      // Draw connecting line
      this.edges.moveTo(0, 0)
        .lineStyle({color: "#502c1a", width: 12}).lineTo(icon.x, icon.y)
        .lineStyle({color: isOwned ? color : "#24160f", width: 6}).lineTo(0, 0);
    }
  }

  /* -------------------------------------------- */

  /**
   * Get all the unique Talents which appear on this Node.
   * @returns {CrucibleItem[]}
   */
  #getNodeTalents() {
    const actor = game.system.tree.actor;
    const allTalents = [];
    const seen = new Set();

    // Talents configured for the node
    const nodeTalents = this.node.node.talents;
    for ( const t of nodeTalents ) {
      seen.add(t.id);
      allTalents.push(t);
    }

    // Talents that are owned but not ordinarily configured for the node
    const ownedTalents = actor.system.talentNodes[this.node.node.id]?.map(id => actor.items.get(id)) || [];
    for ( const t of ownedTalents ) {
      if ( seen.has(t.id) ) continue;
      allTalents.push(t);
    }
    return allTalents;
  }

  /* -------------------------------------------- */

  /**
   * Refresh the display of the Talent wheel when the Actor's purchased Talents change.
   */
  refresh() {
    const tree = game.system.tree;
    const actor = tree.actor;
    if ( !actor ) return;
    for ( const talentIcon of this.talents.children ) {
      const {node, talent} = talentIcon;
      const active = actor.talentIds.has(talent.id);
      talentIcon.draw({
        accessible: active || (tree.state.get(node.node) && talent.system.assertPrerequisites(actor, false)),
        active
      });
    }
  }
}class CrucibleTalentTreeNode extends CrucibleTalentIcon {
  constructor(node) {
    super();
    this.node = node;
    this.position.set(node.point.x, node.point.y);
  }

  /* -------------------------------------------- */

  /**
   * Is this node currently active?
   * @type {boolean}
   */
  get isActive() {
    return game.system.tree.active === this;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _configure(config) {
    const state = config.state;
    config = super._configure(config);
    const spritesheet = crucible.tree.spritesheet;

    // Defaults
    config.texture = spritesheet[`${this.node.iconPrefix}`];
    config.splooshColor = this.node.color;
    config.underglowColor = null;

    // Purchased Nodes
    if ( state.purchased ) {
      config.underglowColor = this.node.color;
    }

    // Accessible Nodes
    else if ( state.accessible ) {
      config.iconTint = Color.fromHSL([this.node.color.hsl[0], 0.05, 0.4]);
      config.frameTint = 0x7f7f7f; // 50%
      config.splooshColor = this.node.color.multiply(0.5);
    }

    // Inaccessible Nodes
    else {
      config.iconTint = Color.fromHSL([this.node.color.hsl[0], 0.1, 0.2]);
      config.frameTint = 0x3f3f3f; // 25%
      config.splooshColor = Color.fromHSL([this.node.color.hsl[0], 0.33, 0.15]);
    }

    // Further configuration based on node style
    let style = this.node.style;
    if ( (style === "rect") && this.node.isPassive ) style = "circle";
    switch ( style ) {
      case "circle":
        config.shape = "circle";
        config.size = 64;
        config.frameTexture = spritesheet.FrameCircleSmallBronze;
        break;
      case "hex":
        config.shape = "hex";
        config.size = 64;
        config.frameTexture = spritesheet.FrameHexSmallBronze;
        break;
      case "rect":
        config.shape = "rect";
        config.size = 64;
        config.frameTexture = spritesheet.FrameSquareSmallBronze;
        break;
      case "largeHex":
        config.shape = "hex";
        config.size = 128;
        config.frameTexture = spritesheet.FrameHexLargeBronze;
        config.underglowSize = 200;
        break;
      case "originHex":
        config.alpha = 1.0;
        config.shape = "hex";
        config.size = config.borderRadius = 200;
        config.frameTexture = spritesheet.FrameHexOriginHeated;
        config.underglowColor = null;
        break;
    }
    return config;
  }

  /* -------------------------------------------- */

  /** @override */
  async draw(config={}) {
    await super.draw(config);

    // Smaller icons
    this.icon.width = this.icon.height = this.config.size * 0.75;
    this.#activateInteraction();
  }

  /* -------------------------------------------- */

  #activateInteraction() {
    this.removeAllListeners();
    this.on("pointerover", this._onPointerOver.bind(this));
    this.on("pointerout", this._onPointerOut.bind(this));
    this.on("pointerdown", this.#onClickLeft.bind(this));
    this.eventMode = "static";
    this.cursor = "pointer";
  }

  /* -------------------------------------------- */

  #onClickLeft(event) {
    event.stopPropagation();
    if ( event.data.originalEvent.button !== 0 ) return; // Only support standard left-click
    const tree = game.system.tree;
    const ownedTalents = tree.actor.system.talentNodes[this.node.id] || [];
    const nodeTalents = new Set([...this.node.talents, ...ownedTalents]);

    // Toggle node active state
    if ( !nodeTalents.size ) return this.#onToggleEmptyNode();
    if ( this.isActive ) tree.deactivateNode({event, hover: false});
    else tree.activateNode(this, {event});
  }

  /* -------------------------------------------- */

  /** @internal */
  _onPointerOver(event) {
    const tree = crucible.tree;
    if ( !tree.app.renderer.enabled || (event.nativeEvent.target !== tree.canvas) ) return;
    tree.hud.activate(this);
    const s = (this.config.size + 8) / this.config.size;
    this.scale.set(s, s);
    if ( this.node.id !== "origin" ) {
      this.underglow.tint = this.node.color;
      this.underglow.visible = true;
    }
  }

  /* -------------------------------------------- */

  /** @internal */
  _onPointerOut(event) {
    const tree = game.system.tree;
    if ( !tree.app.renderer.enabled || (event.nativeEvent.target !== tree.canvas) ) return;
    tree.hud.clear();
    if ( this.isActive ) return; // Don't un-hover an active node
    this.scale.set(1.0, 1.0);
    this.underglow.visible = !!this.config.underglowColor;
  }

  /* -------------------------------------------- */

  /**
   * Toggle ownership of an empty node.
   * @returns {Promise<void>}
   */
  async #onToggleEmptyNode() {
    if ( this.node.id === "origin" ) return;
    const actor = game.system.tree.actor;
    const purchased = this.node.isPurchased(actor);
    if ( !purchased && !actor.points.talent.available ) return;
    const talents = new Set(actor.system.advancement.talentNodes);
    const msg = purchased ? `<p>Remove point spent on empty node "${this.node.id}"?</p>`
      : `<p>Spend talent point to purchase empty node "${this.node.id}"?</p>`;
    const confirm = await foundry.applications.api.DialogV2.confirm({
      window: {
        title: "Purchase Talent Node?"
      },
      content: msg
    });
    if ( !confirm ) return;
    if ( purchased ) talents.delete(this.node.id);
    else talents.add(this.node.id);
    await actor.update({"system.advancement.talentNodes": talents});
  }
}const ORIGIN = [
  {id: "origin", type: "origin", tier: "root", abilities: ["dexterity", "toughness", "strength", "wisdom", "presence", "intellect"], connected: []}
];

const TIER_0 = [
  {id: "dex0a", abilities: ["dexterity"], type: "training", connected: ["origin"]},
  {id: "dex0b", abilities: ["dexterity"], type: "utility", connected: ["origin"]},
  {id: "tou0a", abilities: ["toughness"], type: "training", connected: ["origin"]},
  {id: "tou0b", abilities: ["toughness"], type: "utility", connected: ["origin"]},
  {id: "str0a", abilities: ["strength"], type: "utility", connected: ["origin"]},
  {id: "str0b", abilities: ["strength"], type: "training", connected: ["origin"]},
  {id: "wis0a", abilities: ["wisdom"], type: "training", connected: ["origin"]},
  {id: "wis0b", abilities: ["wisdom"], type: "spell", connected: ["origin"], style: "hex"},
  {id: "pre0a", abilities: ["presence"], type: "training", connected: ["origin"]},
  {id: "pre0b", abilities: ["presence"], type: "spell", connected: ["origin"], style: "hex"},
  {id: "int0a", abilities: ["intellect"], type: "spell", connected: ["origin"], style: "hex"},
  {id: "int0b", abilities: ["intellect"], type: "training", connected: ["origin"]}
];

const TIER_1A = [
  {id: "dex1a", abilities: ["dexterity"], type: "ranged", connected: ["dex0a"]},
  {id: "dex1b", abilities: ["dexterity"], type: "melee", connected: ["dex0b", "dex1a"]},
  {id: "tou1a", abilities: ["toughness"], type: "melee", connected: ["tou0a"]},
  {id: "tou1b", abilities: ["toughness"], type: "defense", connected: ["tou0b", "tou1a"]},
  {id: "str1a", abilities: ["strength"], type: "melee", connected: ["str0a"]},
  {id: "str1b", abilities: ["strength"], type: "melee", connected: ["str0b", "str1a"]},
  {id: "wis1a", abilities: ["wisdom"], type: "skill", connected: ["wis0a"]},
  {id: "wis1b", abilities: ["wisdom"], type: "spell", connected: ["wis0b", "wis1a"]},
  {id: "pre1a", abilities: ["presence"], type: "skill", connected: ["pre0a"]},
  {id: "pre1b", abilities: ["presence"], type: "spell", connected: ["pre0b", "pre1a"]},
  {id: "int1a", abilities: ["intellect"], type: "spell", connected: ["int0a"]},
  {id: "int1b", abilities: ["intellect"], type: "skill", connected: ["int0b", "int1a"]}
];

const TIER_1B = [
  {id: "intdex1", abilities: ["intellect", "dexterity"], type: "attack", connected: ["int1b", "dex1a"]},
  {id: "dextou1", abilities: ["dexterity", "toughness"], type: "move", connected: ["dex1b", "tou1a"]},
  {id: "toustr1", abilities: ["toughness", "strength"], type: "move", connected: ["tou1b", "str1a"]},
  {id: "strwis1", abilities: ["strength", "wisdom"], type: "melee", connected: ["str1b", "wis1a"]},
  {id: "wispre1", abilities: ["wisdom", "presence"], type: "magic", connected: ["wis1b", "pre1a"]},
  {id: "preint1", abilities: ["presence", "intellect"], type: "magic", connected: ["pre1b", "int1a"]}
];

const TIER_2A = [
  {id: "dex2a", abilities: ["dexterity"], type: "utility", connected: ["dex1a"]},
  {id: "dex2b", abilities: ["dexterity"], type: "spell", connected: ["dex1a", "dex1b", "dex2a"]},
  {id: "dex2c", abilities: ["dexterity"], type: "defense", connected: ["dex1b", "dex2b"]},
  {id: "tou2a", abilities: ["toughness"], type: "melee", connected: ["tou1a"]},
  {id: "tou2b", abilities: ["toughness"], type: "spell", connected: ["tou1a", "tou1b", "tou2a"]},
  {id: "tou2c", abilities: ["toughness"], type: "utility", connected: ["tou1b", "tou2b"]},
  {id: "str2a", abilities: ["strength"], type: "melee", connected: ["str1a"]},
  {id: "str2b", abilities: ["strength"], type: "spell", connected: ["str1a", "str1b", "str2a"]},
  {id: "str2c", abilities: ["strength"], type: "utility", connected: ["str1b", "str2b"]},
  {id: "wis2a", abilities: ["wisdom"], type: "defense", connected: ["wis1a"]},
  {id: "wis2b", abilities: ["wisdom"], type: "utility", connected: ["wis1a", "wis1b", "wis2a"]},
  {id: "wis2c", abilities: ["wisdom"], type: "heal", connected: ["wis1b", "wis2b"]},
  {id: "pre2a", abilities: ["presence"], type: "defense", connected: ["pre1a"]},
  {id: "pre2b", abilities: ["presence"], type: "spell", connected: ["pre1a", "pre1b", "pre2a"]},
  {id: "pre2c", abilities: ["presence"], type: "skill", connected: ["pre1b", "pre2b"]},
  {id: "int2a", abilities: ["intellect"], type: "skill", connected: ["int1a"]},
  {id: "int2b", abilities: ["intellect"], type: "magic", connected: ["int1a", "int1b", "int2a"]},
  {id: "int2c", abilities: ["intellect"], type: "utility", connected: ["int1b", "int2b"]}
];

const TIER_2B = [
  {id: "intdex2", abilities: ["intellect", "dexterity"], type: "utility", connected: ["int2c", "dex2a"]},
  {id: "dextou2", abilities: ["dexterity", "toughness"], type: "utility", connected: ["dex2c", "tou2a"]},
  {id: "toustr2", abilities: ["toughness", "strength"], type: "defense", connected: ["tou2c", "str2a"]},
  {id: "strwis2", abilities: ["strength", "wisdom"], type: "utility", connected: ["str2c", "wis2a"]},
  {id: "wispre2", abilities: ["wisdom", "presence"], type: "spell", connected: ["wis2c", "pre2a"]},
  {id: "preint2", abilities: ["presence", "intellect"], type: "spell", connected: ["pre2c", "int2a"]}
];

const TIER_3A = [
  {id: "dex3a", type: "ranged", abilities: ["dexterity"], tier: 6, connected: ["intdex2", "dex2a", "dex2b"]},
  {id: "dex3b", type: "move", abilities: ["dexterity"], tier: 6, connected: ["dex2b", "dex2c", "dextou2"]},
  {id: "tou3a", type: "defense", abilities: ["toughness"], tier: 6, connected: ["dextou2", "tou2a", "tou2b"]},
  {id: "tou3b", type: "defense", abilities: ["toughness"], tier: 6, connected: ["tou2b", "tou2c", "toustr2"]},
  {id: "str3a", type: "melee", abilities: ["strength"], tier: 6, connected: ["toustr2", "str2a", "str2b"]},
  {id: "str3b", type: "ranged", abilities: ["strength"], tier: 6, connected: ["str2b", "str2c", "strwis2"]},
  {id: "wis3a", type: "magic", abilities: ["wisdom"], tier: 6, connected: ["strwis2", "wis2a", "wis2b"]},
  {id: "wis3b", type: "spell", abilities: ["wisdom"], tier: 6, connected: ["wis2b", "wis2c", "wispre2"]},
  {id: "pre3a", type: "utility", abilities: ["presence"], tier: 6, connected: ["wispre2", "pre2a", "pre2b"]},
  {id: "pre3b", type: "spell", abilities: ["presence"], tier: 6, connected: ["pre2b", "pre2c", "preint2"]},
  {id: "int3a", type: "spell", abilities: ["intellect"], tier: 6, connected: ["preint2", "int2a", "int2b"]},
  {id: "int3b", type: "utility", abilities: ["intellect"], tier: 6, connected: ["int2b", "int2c", "intdex2"]}
];

const TIER_3B = [
  {id: "sig3.dexterity", type: "signature", abilities: ["dexterity"], teleport: true, connected: ["dex3a", "dex3b"]},
  {id: "sig3.dexterity.toughness", type: "signature", abilities: ["dexterity", "toughness"], connected: ["dex3b", "tou3a"]},
  {id: "sig3.toughness", type: "signature", abilities: ["toughness"], teleport: true, connected: ["tou3a", "tou3b"]},
  {id: "sig3.toughness.strength", type: "signature", abilities: ["toughness", "strength"], connected: ["tou3b", "str3a"]},
  {id: "sig3.strength", type: "signature", abilities: ["strength"], connected: ["str3a", "str3b"]},
  {id: "sig3.strength.wisdom", type: "signature", abilities: ["strength", "wisdom"], connected: ["str3b", "wis3a"]},
  {id: "sig3.wisdom", type: "signature", abilities: ["wisdom"], connected: ["wis3a", "wis3b"]},
  {id: "sig3.wisdom.presence", type: "signature", abilities: ["wisdom", "presence"], connected: ["wis3b", "pre3a"]},
  {id: "sig3.presence", type: "signature", abilities: ["presence"], connected: ["pre3a", "pre3b"]},
  {id: "sig3.presence.intellect", type: "signature", abilities: ["presence", "intellect"], connected: ["pre3b", "int3a"]},
  {id: "sig3.intellect", type: "signature", abilities: ["intellect"], connected: ["int3a", "int3b"]},
  {id: "sig3.intellect.dexterity", type: "signature", abilities: ["intellect", "dexterity"], connected: ["int3b", "dex3a"]}
];

const TIER_4A = [
  {id: "dex4a", abilities: ["dexterity"], type: "ranged", connected: ["sig3.intellect.dexterity", "dex3a"]},
  {id: "dex4b", abilities: ["dexterity"], type: "training", connected: ["dex3a", "sig3.dexterity", "dex4a"]},
  {id: "dex4c", abilities: ["dexterity"], type: "utility", connected: ["sig3.dexterity", "dex3b", "dex4b"]},
  {id: "dex4d", abilities: ["dexterity"], type: "melee", connected: ["dex3b", "sig3.dexterity.toughness", "dex4c"]},
  {id: "tou4a", abilities: ["toughness"], type: "attack", connected: ["sig3.dexterity.toughness", "tou3a"]},
  {id: "tou4b", abilities: ["toughness"], type: "training", connected: ["tou3a", "sig3.toughness", "tou4a"]},
  {id: "tou4c", abilities: ["toughness"], type: "attack", connected: ["sig3.toughness", "tou3b", "tou4b"]},
  {id: "tou4d", abilities: ["toughness"], type: "attack", connected: ["tou3b", "sig3.toughness.strength", "tou4c"]},
  {id: "str4a", abilities: ["strength"], type: "utility", connected: ["sig3.toughness.strength", "str3a"]},
  {id: "str4b", abilities: ["strength"], type: "melee", connected: ["str3a", "sig3.strength", "str4a"]},
  {id: "str4c", abilities: ["strength"], type: "training", connected: ["sig3.strength", "str3b", "str4b"]},
  {id: "str4d", abilities: ["strength"], type: "attack", connected: ["str3b", "sig3.strength.wisdom", "str4c"]},
  {id: "wis4a", abilities: ["wisdom"], type: "attack", connected: ["sig3.strength.wisdom", "wis3a"]},
  {id: "wis4b", abilities: ["wisdom"], type: "training", connected: ["wis3a", "sig3.wisdom", "wis4a"]},
  {id: "wis4c", abilities: ["wisdom"], type: "utility", connected: ["sig3.wisdom", "wis3b", "wis4b"]},
  {id: "wis4d", abilities: ["wisdom"], type: "attack", connected: ["wis3b", "sig3.wisdom.presence", "wis4c"]},
  {id: "pre4a", abilities: ["presence"], type: "attack", connected: ["sig3.wisdom.presence", "pre3a"]},
  {id: "pre4b", abilities: ["presence"], type: "training", connected: ["pre3a", "sig3.presence", "pre4a"]},
  {id: "pre4c", abilities: ["presence"], type: "attack", connected: ["sig3.presence", "pre3b", "pre4b"]},
  {id: "pre4d", abilities: ["presence"], type: "attack", connected: ["pre3b", "sig3.presence.intellect", "pre4c"]},
  {id: "int4a", abilities: ["intellect"], type: "attack", connected: ["sig3.presence.intellect", "int3a"]},
  {id: "int4b", abilities: ["intellect"], type: "utility", connected: ["int3a", "sig3.intellect", "int4a"]},
  {id: "int4c", abilities: ["intellect"], type: "training", connected: ["sig3.intellect", "int3b", "int4b"]},
  {id: "int4d", abilities: ["intellect"], type: "attack", connected: ["int3b", "sig3.intellect.dexterity", "int4c"]},
];

const TIER_4B = [
  {id: "intdex4", abilities: ["intellect", "dexterity"], type: "move", connected: ["int4d", "dex4a"]},
  {id: "dextou4", abilities: ["dexterity", "toughness"], type: "attack", connected: ["dex4d", "tou4a"]},
  {id: "toustr4", abilities: ["toughness", "strength"], type: "attack", connected: ["tou4d", "str4a"]},
  {id: "strwis4", abilities: ["strength", "wisdom"], type: "attack", connected: ["str4d", "wis4a"]},
  {id: "wispre4", abilities: ["wisdom", "presence"], type: "spell", connected: ["wis4d", "pre4a"]},
  {id: "preint4", abilities: ["presence", "intellect"], type: "spell", connected: ["pre4d", "int4a"]}
];

var TREE_CONFIG = [
  {nodes: ORIGIN, tier: 0, angleOffset: 0, angleDelta: 0, distance: 0},
  {nodes: TIER_0, tier: 0, angleOffset: 15, angleDelta: 30, distance: 400},
  {nodes: TIER_1A, tier: 1, angleOffset: 20, angleDelta: 20, distance: 600},
  {nodes: TIER_1B, tier: 1, angleOffset: 0, angleDelta: 60, distance: 560},
  {nodes: TIER_2A, tier: 2, angleOffset: 15, angleDelta: 15, distance: 800},
  {nodes: TIER_2B, tier: 2, angleOffset: 0, angleDelta: 60, distance: 760},
  {nodes: TIER_3A, tier: 3, angleOffset: 15, angleDelta: 30, distance: 1000},
  {nodes: TIER_3B, tier: 3, angleOffset: 30, angleDelta: 30, distance: 1020},
  {nodes: TIER_4A, tier: 4, angleOffset: 12, angleDelta: 12, distance: 1260},
  {nodes: TIER_4B, tier: 4, angleOffset: 0, angleDelta: 60, distance: 1260}
];/**
 * @typedef TalentNodeConfig
 * @property {string} id
 * @property {number|"root"} tier
 * @property {string} type
 * @property {string[]} abilities
 * @property {string[]} connected
 * @property {number} distance
 * @property {number} angle
 * @property {string} [style]
 * @property {null|Record<string, {abilities: string[], teleport: string}>} [group=null]
 */

/**
 * A class which manages the data structure for each node on the Crucible talent tree.
 */
class CrucibleTalentNode {
  /**
   * Construct a talent node by providing its configuration data.
   * @param {TalentNodeConfig} config
   */
  constructor(config) {
    if ( CrucibleTalentNode.#nodes.has(config.id) ) {
      throw new Error(`CrucibleTalentNode id "${config.id}" is already defined.`);
    }
    this.#initializeNode(config);
  }

  /* -------------------------------------------- */

  /**
   * A mapping of all nodes in the tree.
   * @returns {Map<string, CrucibleTalentNode>}
   */
  static get nodes() {
    return this.#nodes;
  }

  static #nodes = new Map();

  /* -------------------------------------------- */

  /**
   * Is this node passive?
   * Passive nodes contain no Talents which provide Actions.
   * @type {boolean}
   */
  get isPassive() {
    const nodeType = NODE_TYPES[this.type];
    if ( typeof nodeType.passive === "boolean" ) return nodeType.passive; // Never or always passive
    for ( const t of this.talents ) {
      if ( t.actions.length ) return false;
      const {rune, gesture, inflection} = t.system;
      if ( rune || gesture || inflection ) return false; // Spellcraft components count as active
    }
    return true;
  }

  /* -------------------------------------------- */

  /**
   * Get the valid node identifiers which can be referenced by a Talent.
   * @returns {Record<string, string>}
   */
  static getChoices() {
    const choices = {};
    for ( const {id, groups} of this.#nodes.values() ) {
      if ( groups ) {
        for ( const g of Object.keys(groups) ) {
          choices[g] = g;
        }
      }
      else choices[id] = id;
    }
    return choices;
  }

  /* -------------------------------------------- */

  /**
   * The signature nodes in the tree
   * @type {Set<CrucibleTalentNode>}
   */
  static get signature() {
    return this.#signature;
  }

  static #signature = new Set();

  /* -------------------------------------------- */

  /**
   * The Set of other nodes which are connected to this one
   * @type {Set<CrucibleTalentNode>}
   */
  connected = new Set();

  talents = new Set();

  /**
   * A reference to the icon in the canvas representation of the talent tree that controls this node.
   * @type {CrucibleTalentTreeNode}
   */
  icon;

  connect(node) {
    this.connected.add(node);
    node.connected.add(this);
  }

  /**
   * Initialize all talents from within the designated collection
   */
  static async initialize() {
    for ( const node of this.nodes.values() ) node.talents.clear();
    for ( const packId of crucible.CONFIG.packs.talent ) {
      const pack = game.packs.get(packId);
      if ( !pack ) {
        console.warn(`Invalid compendium pack "${packId}" configured in crucible.CONFIG.packs.talent`);
        continue;
      }
      const talents = await pack.getDocuments();
      for ( const talent of talents ) {
        if ( talent.type !== "talent" ) continue;
        try {
          talent.system.initializeTree();
        } catch(err) {
          console.warn(err);
        }
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Initialize configuration data for the node.
   * @param {TalentNodeConfig} config
   */
  #initializeNode({id, tier=0, type="utility", abilities=[], connected=[], angle, distance, style}={}) {

    // Node type and tier configuration
    const nodeType = SYSTEM.TALENT.NODE_TYPES[type];
    if ( !nodeType ) throw new Error(`Invalid talent node type "${type}" for node "${id}"`);
    const nodeTier = SYSTEM.TALENT.NODE_TIERS[tier];
    if ( !nodeTier ) throw new Error(`Invalid talent node tier "${tier}" for node "${id}"`);

    // Verify connections
    for ( const node of connected ) {
      const n = CrucibleTalentNode.#nodes.get(node);
      if ( !n ) throw new Error(`CrucibleTalentNode parent "${node}" has not yet been defined`);
      n.connect(this);
    }

    // Determine the node position on its hexagonal edge segment
    const point = this.#getPosition(angle, distance);

    // Node color
    let color;
    for ( const ability of abilities ) {
      if ( !color ) color = ABILITIES[ability].color;
      else {
        const c2 = ABILITIES[ability].color.maximize(0.5);
        color = color.mix(c2, 0.5);
      }
    }

    // Define node attributes
    Object.defineProperties(this, {
      id: {value: id, writable: false, enumerable: true},
      tier: {value: tier, writable: false, enumerable: true},
      type: {value: type, writable: false, enumerable: true},
      typeLabel: {value: nodeType.label, writable: false, enumerable: true},
      style: {value: style || nodeType.style, writable: false, enumerable: true},
      iconPrefix: {value: nodeType.icon, writable: false, enumerable: true},
      abilities: {value: new Set(abilities), writable: false, enumerable: true},
      point: {value: point, writable: false, enumerable: true},
      color: {value: color, writable: false, enumerable: true},
    });

    // Define prerequisites
    this.requirements = this.#getRequirements();
    this.prerequisites = CrucibleTalentNode.preparePrerequisites(this.requirements);

    // Standard Nodes
    CrucibleTalentNode.#nodes.set(id, this);
    if ( this.type === "signature" ) CrucibleTalentNode.#signature.add(this);
  }

  /* -------------------------------------------- */

  #getPosition(angle, distance) {
    const w = 1;
    const h = Math.SQRT3 / 2;
    const points = [{x: w, y: 0}, {x: w/2, y: h}, {x: -1/2, y: h}, {x: -1, y: 0}, {x: -1/2, y: -h}, {x: w/2, y: -h}];
    const a0 = angle.toNearest(60, "floor");
    const i = (a0 / 60) % points.length;
    const p0 = points[i];
    const p1 = points[(i+1) % points.length];
    const r = new foundry.canvas.geometry.Ray(
      {x: p0.x * distance, y: p0.y * distance},
      {x: p1.x * distance, y: p1.y * distance}
    );
    const t = (angle - a0) / 60;
    return r.project(t);
  }

  /* -------------------------------------------- */

  #getRequirements() {
    const tierConfig = SYSTEM.TALENT.NODE_TIERS[this.tier];
    const reqs = {"advancement.level": tierConfig.level};
    const discount = (this.abilities.size > 1) && (this.type !== "signature") ? 1 : 0;
    for ( const ability of this.abilities ) {
      reqs[`abilities.${ability}.value`] = Math.max(tierConfig.ability - discount, 1);
    }
    return reqs;
  }

  /* -------------------------------------------- */
  /*  State Testing                               */
  /* -------------------------------------------- */

  /**
   * Test whether a node belongs to a certain special state.
   * This method only verifies node state independent of other nodes.
   * It does not, therefore, know whether a node is accessible.
   * @param {CrucibleActor} actor
   * @param {Object<number,Set<CrucibleTalentItem>>} [signatures]
   * @returns {CrucibleTalentNodeState}
   */
  getState(actor, signatures) {
    signatures ||= CrucibleTalentNode.getSignatureTalents(actor);
    const purchased = this.isPurchased(actor);
    const banned = this.#isBanned(actor, signatures);
    const reqs = crucible.api.models.CrucibleTalentItem.testPrerequisites(actor, this.prerequisites);
    const unlocked = Object.values(reqs).every(r => r.met);
    return {accessible: undefined, purchased, banned, unlocked};
  }

  /* -------------------------------------------- */

  /**
   * Is this Node connected and eligible to be acquired by an Actor?
   * @param {CrucibleActor} actor         The Actor being tested
   * @returns {boolean}                   Is the node connected?
   */
  isConnected(actor) {
    for ( const c of this.connected ) if ( c.isPurchased(actor) ) return true;
    return false;
  }

  /* -------------------------------------------- */

  /**
   * Is a signature node banned because the user has selected some other Signature node which shares an ability score.
   * Nodes which have been purchased have already been categorized as purchased.
   * @param {CrucibleActor} actor
   * @param {Object<number,Set<CrucibleTalentItem>>} signatures
   * @returns {boolean}
   */
  #isBanned(actor, signatures) {
    if ( this.type !== "signature" ) return false;  // Only signature talents get banned
    const purchased = signatures[this.tier];
    if ( purchased.size >= 2 ) return true;         // Already purchased 2 signatures at this tier
    return false;
  }

  /* -------------------------------------------- */

  /**
   * Has this talent node been purchased by an Actor?
   * @param {CrucibleActor} actor
   * @returns {boolean}
   */
  isPurchased(actor) {
    if ( this.id === "origin" ) return true;                    // The origin is always purchased
    if ( actor.system.talentNodes[this.id]?.size ) return true; // Purchased via an owned talent
    return actor.system.advancement.talentNodes.has(this.id);   // Purchased as an empty node
  }

  /* -------------------------------------------- */

  static getSignatureTalents(actor) {
    const tiers = {};
    for ( const node of CrucibleTalentNode.#signature ) {
      tiers[node.tier] ||= new Set();
      for ( const t of node.talents ) {
        if ( actor.talentIds.has(t.id) ) {
          tiers[node.tier].add(t);
        }
      }
    }
    return tiers;
  }

  /* -------------------------------------------- */

  /**
   * Test whether two ability score quadrants are adjacent on the tree.
   * @param ability1
   * @param ability2
   * @returns {-1|0|1} Is ability1 counter-clockwise of ability2 (-1), clockwise of ability2 (1), or not adjacent (0)
   */
  static areAbilitiesAdjacent(ability1, ability2) {
    const abilities = Object.keys(SYSTEM.ABILITIES);
    abilities.push(abilities[0]);
    const idx = abilities.findIndex(a => a === ability1);
    if ( abilities[idx+1] === ability2 ) return 1;
    if ( abilities[idx-1] === ability2 ) return -1;
    return 0;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the data structure of talent prerequisites
   * @param {AdvancementPrerequisites} requirements
   * @returns {AdvancementPrerequisites}
   */
  static preparePrerequisites(requirements={}) {
    return Object.entries(foundry.utils.flattenObject(requirements)).reduce((obj, r) => {
      const [k, v] = r;
      const o = {value: v};
      if ( k.startsWith("abilities.") ) {
        if ( v <= 1 ) return obj;
        o.label = SYSTEM.ABILITIES[k.split(".")[1]].label;
      }
      else if ( k === "advancement.level" ) {
        if ( v <= 1 ) return obj;
        o.label = "Level";
      }
      else if ( k.startsWith("skills.") ) o.label = SYSTEM.SKILLS[k.split(".")[1]].label;
      else if ( k.startsWith("training.") ) o.label = SYSTEM.TALENT.TRAINING_TYPES[k.split(".")[1]].label;
      else o.label = k;
      o.tag = `${o.label} ${o.value}`;
      obj[k] = o;
      return obj;
    }, {});
  }

  /* -------------------------------------------- */

  /**
   * Define the talent tree nodes used by the system.
   */
  static defineTree() {
    const createNodes = (nodes, {tier, angleOffset, angleDelta, distance}) => {
      let ns = -1;
      let sextant = "";
      let angle = 0;
      for ( const n of nodes ) {
        if ( n.abilities[0] !== sextant ) {
          sextant = n.abilities[0];
          ns++;
          angle = (ns * 60) + angleOffset;
        }
        new CrucibleTalentNode({...n, tier, angle, distance});
        angle += angleDelta;
      }
    };
    for ( const {nodes, ...config} of TREE_CONFIG ) createNodes(nodes, config);

    // Empty nodes for each tier to hold placeholder talents
    for ( let i=1; i<=18; i++ ) {
      new CrucibleTalentNode({
        id: `none${i}`,
        type: "utility",
        tier: i,
        abilities: ["dexterity", "toughness", "strength", "wisdom", "presence", "intellect"],
        connected: [],
        angle: 0,
        distance: 0
      });
    }
  }
}/**
 * @typedef {Object} TalentData
 * @property {string[]} nodes
 * @property {string} description
 * @property {CrucibleAction[]} actions   The actions which have been unlocked by this talent
 * @property {string} [rune]
 * @property {string} [gesture]
 * @property {string} [inflection]
 * @property {{hook: string, fn: function}} actorHooks
 */

/**
 * @typedef {Object} TalentRankData
 * @property {string} description
 * @property {number} tier
 * @property {number} cost
 * @property {{[key: string]: number}} requirements
 * @property {CrucibleAction[]} actions
 * @property {object[]} passives
 */

/**
 * @typedef {Object} AdvancementPrerequisite
 * @property {number} value       A numeric value that must be satisfied
 * @property {string} [label]     The string label of the prerequisite type
 * @property {string} [tag]       The formatted display for the prerequisite tag
 * @property {boolean} [met]      Is this prerequisite met for a certain Actor?
 */

/**
 * @typedef {Record<string, AdvancementPrerequisite>} AdvancementPrerequisites
 */

/**
 * The data schema of a Talent type Item in the Crucible system.
 * @mixes {TalentData}
 * @property {TalentRankData} currentRank             The current rank in this talent
 * @property {number} cost                            The action point cost to have obtained the current rank
 * @property {TalentRankData} nextRank                The next rank in this talent
 * @property {AdvancementPrerequisites} prerequisites The derived prerequisites required for this rank
 */
class CrucibleTalentItem extends foundry.abstract.TypeDataModel {

  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    const blankString = {required: true, blank: true, initial: ""};
    return {
      nodes: new fields.SetField(new fields.StringField({required: true, blank: false, choices: () => CrucibleTalentNode.getChoices()})),
      description: new fields.HTMLField(),
      actions: new fields.ArrayField(new fields.EmbeddedDataField(CrucibleAction)),
      rune: new fields.StringField({...blankString, choices: SYSTEM.SPELL.RUNES}),
      gesture: new fields.StringField({...blankString, choices: SYSTEM.SPELL.GESTURES}),
      inflection: new fields.StringField({...blankString, choices: SYSTEM.SPELL.INFLECTIONS}),
      iconicSpells: new fields.NumberField({required: true, nullable: false, initial: 0, integer: true, min: 0}),
      training: new fields.SchemaField({
        type: new fields.StringField({...blankString, choices: SYSTEM.TALENT.TRAINING_TYPES}),
        rank: new fields.NumberField({required: true, nullable: true, initial: null, integer: true, min: 1, max: 4})
      }),
      actorHooks: new fields.ArrayField(new fields.SchemaField({
        hook: new fields.StringField({required: true, blank: false, choices: SYSTEM.ACTOR.HOOKS}),
        fn: new fields.JavaScriptField({async: true, gmOnly: true})
      }))
    }
  }

  /** @override */
  static LOCALIZATION_PREFIXES = ["TALENT"];

  /**
   * The partial template used to render a feature granted item.
   * @type {string}
   */
  static INLINE_TEMPLATE_PATH = "systems/crucible/templates/sheets/item/talent-inline.hbs";

  /**
   * The partial template used to render a feature granted item.
   * @type {string}
   */
  static CARD_TEMPLATE_PATH = "systems/crucible/templates/sheets/item/talent-card.hbs";

  /**
   * Is this a signature talent?
   * @type {boolean}
   */
  isSignature = false;

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Initialize this Talent as belonging to the Talent Tree.
   */
  initializeTree() {
    const talent = this.parent;
    if ( !this.nodes.size ) throw new Error(`Talent "${talent.name}" does not configure any valid tree nodes.`);

    // Register Talents
    for ( const node of this.nodes ) node.talents.add(talent);

    // Update Metadata
    if ( this.rune ) {
      const rune = SYSTEM.SPELL.RUNES[this.rune];
      rune.img = talent.img;
    }
    if ( this.gesture ) {
      const gesture = SYSTEM.SPELL.GESTURES[this.gesture];
      gesture.img = talent.img;
    }
    if ( this.inflection ) {
      const inflection = SYSTEM.SPELL.INFLECTIONS[this.inflection];
      inflection.img = talent.img;
    }
  }

  /* -------------------------------------------- */

  /** @override */
  prepareBaseData() {
    this.nodes.clear();
    for ( const id of this._source.nodes ) {
      const node = CrucibleTalentNode.nodes.get(id);
      if ( node ) this.nodes.add(node);
      if ( node.type === "signature" ) this.isSignature = true;
    }
    this.prerequisites = this.#preparePrerequisites();
  }

  /* -------------------------------------------- */

  /**
   * Customize prerequisites for this specific Talent that may differ from the prerequisites of its Node.
   * @returns {AdvancementPrerequisites}
   */
  #preparePrerequisites() {
    if ( !this.nodes.size ) return {};
    const requirements = {};
    for ( const node of this.nodes ) {
      Object.assign(requirements, foundry.utils.deepClone(node.requirements));
    }
    if ( this.training.rank > 1 ) {
      foundry.utils.setProperty(requirements, `training.${this.training.type}`, this.training.rank - 1);
    }
    return CrucibleTalentNode.preparePrerequisites(requirements);
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Return an object of string formatted tag data which describes this item type.
   * @returns {Object<string, string>}    The tags which describe this Talent
   */
  getTags() {
    const tags = {};
    for ( let [k, v] of Object.entries(this.prerequisites || {}) ) {
      tags[k] = `${v.label} ${v.value}`;
    }
    if ( this.iconicSpells ) {
      tags.iconicSpells = this.iconicSpells === 1 ? game.i18n.localize("SPELL.Iconic")
        : `${this.iconicSpells} ${game.i18n.localize("SPELL.IconicPl")}`;
    }
    return tags;
  }

  /* -------------------------------------------- */

  /**
   * Test each prerequisite for a talent, returning a data structure that describes whether they are met.
   * @param {CrucibleActor} actor                       The Actor to evaluate
   * @param {AdvancementPrerequisites} prerequisites    The prerequisites to test
   * @returns {AdvancementPrerequisites}                An object of tested prerequisites
   */
  static testPrerequisites(actor, prerequisites) {
    const reqs = {};
    for ( let [k, v] of Object.entries(prerequisites) ) {
      const current = foundry.utils.getProperty(actor.system, k);
      reqs[k] = v;
      reqs[k].met = current >= v.value;
    }
    return reqs;
  }

  /* -------------------------------------------- */

  /**
   * Assert that an Actor meets the prerequisites for this Talent.
   * @param {CrucibleActor} actor         The Actor to test
   * @param {boolean} strict              Throw an error if prerequisites are not met, otherwise return a boolean
   * @returns {boolean}                   Only if testing is not strict
   * @throws {Error}                      A formatted error message if the prerequisites are unmet and testing is strict
   */
  assertPrerequisites(actor, strict=true) {

    // Ensure the Talent is not already owned
    if ( actor.items.find(i => (i.type === "talent") && (i.name === this.parent.name)) ) {
      if ( strict ) throw new Error(game.i18n.format("TALENT.WARNINGS.AlreadyOwned", {name: this.parent.name}));
      else return false;
    }

    // Require available talent points
    const points = actor.points.talent;
    if ( points.available < 1 ) {
      if ( strict ) throw new Error(game.i18n.format("TALENT.WARNINGS.CannotAfford", {
        name: this.parent.name,
        cost: 1
      }));
      else return false;
    }

    // Check Node state
    const state = {};
    for ( const node of this.nodes ) {
      const s = node.getState(actor);
      state.accessible ||= ((node.tier === 0) || node.isConnected(actor));
      if ( s.banned && (state.banned !== false) ) state.banned = true;
    }
    if ( state.banned ) {
      if ( strict ) throw new Error(game.i18n.localize("TALENT.WARNINGS.Banned"));
      return false;
    }
    if ( !state.accessible ) {
      if ( strict ) throw new Error(game.i18n.format("TALENT.WARNINGS.Inaccessible", {name: this.parent.name}));
      return false;
    }

    // Require prerequisite stats
    for ( let [k, v] of Object.entries(this.prerequisites) ) {
      const current = foundry.utils.getProperty(actor.system, k) ?? 0;
      if ( current < v.value ) {
        const err = game.i18n.format("TALENT.WARNINGS.Locked", {
          name: this.parent.name,
          requirement: v.label,
          requires: v.value
        });
        if ( strict ) throw new Error(err);
        else return false;
      }
    }
    return true;
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Render this Talent as HTML for inline display.
   * @returns {Promise<string>}
   */
  async renderInline() {
    return foundry.applications.handlebars.renderTemplate(this.constructor.INLINE_TEMPLATE_PATH, {
      talent: this,
      uuid: this.parent.uuid,
      name: this.parent.name,
      img: this.parent.img,
      tags: this.getTags()
    });
  }

  /* -------------------------------------------- */

  /**
   * Render this Talent as HTML for a tooltip card.
   * @param {object} options
   * @param {CrucibleActor} [options.actor]
   * @returns {Promise<string>}
   */
  async renderCard({actor}={}) {

    // Load necessary templates
    await foundry.applications.handlebars.loadTemplates([
      this.constructor.CARD_TEMPLATE_PATH,
      "systems/crucible/templates/sheets/item/talent-summary.hbs"
    ]);

    // Prepare talent data
    const talent = this.parent;
    actor ||= talent.parent;
    const reqs = actor ? CrucibleTalentItem.testPrerequisites(actor, talent.system.prerequisites)
      : talent.system.prerequisites;

    // Render the card
    return foundry.applications.handlebars.renderTemplate(this.constructor.CARD_TEMPLATE_PATH, {
      talent,
      descriptionHTML: await CONFIG.ux.TextEditor.enrichHTML(talent.system.description, {
        relativeTo: talent,
        secrets: talent.isOwner
      }),
      source: talent,
      uuid: talent.uuid,
      name: talent.name,
      img: talent.img,
      actions: await CrucibleTalentItemSheet.prepareActions(talent),
      tags: this.getTags(),
      prerequisites: reqs
    });
  }

  /* -------------------------------------------- */
  /*  Deprecations and Compatibility              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static migrateData(source) {
    super.migrateData(source);
    if ( (typeof source.node === "string") && !source.nodes ) {
      source.nodes = source.node ? [source.node] : [];
      delete source.node;
    }
  }
}const {ApplicationV2: ApplicationV2$1, HandlebarsApplicationMixin: HandlebarsApplicationMixin$1} = foundry.applications.api;

/**
 * An Application instance that renders a HUD tooltip in the CrucibleTalentTree
 */
class CrucibleTalentHUD extends HandlebarsApplicationMixin$1(ApplicationV2$1) {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    id: "crucible-talent-hud",
    classes: ["crucible", "hud"],
    tag: "aside",
    window: {
      frame: false
    }
  }

  /** @override */
  static PARTS = {
    node: {
      template: "systems/crucible/templates/hud/talent-tree-node.hbs"
    },
    talent: {
      template: "systems/crucible/templates/hud/talent-tree-talent.hbs",
      templates: ["systems/crucible/templates/sheets/item/talent-summary.hbs"]
    }
  };

  /**
   * The target of the HUD, either a Node or a Talent
   * @type {CrucibleTalentTreeNode|CrucibleTalentTreeTalent}
   */
  target;

  /* -------------------------------------------- */

  /** @override */
  _configureRenderParts(options) {
    const parts = foundry.utils.deepClone(this.constructor.PARTS);
    if ( this.target instanceof CrucibleTalentTreeNode ) delete parts.talent;
    else delete parts.node;
    return parts;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(_options) {
    if ( this.target instanceof CrucibleTalentTreeNode ) return this.#getNodeContext();
    else return this.#getTalentContext();
  }

  /* -------------------------------------------- */

  /**
   * Prepare rendering context data for a Node.
   * @returns {Promise<object>}
   */
  async #getNodeContext() {
    const actor = game.system.tree.actor;
    const node = this.target.node;
    const state = game.system.tree.state.get(node);
    const tags = [
      {label: `Tier ${node.tier}`},
      {label: game.i18n.localize(`TALENT.NODES.${node.type.toUpperCase()}`)}
    ];
    if ( state.banned ) tags.push({label: "Banned", class: "unmet"});
    else if ( !state.unlocked ) tags.push({label: "Locked", class: "unmet"});
    if ( !node.talents.size ) tags.push({label: "Empty", class: "unmet"});
    const reqs = CrucibleTalentNode.preparePrerequisites(node.requirements);
    return {
      id: node.id,
      tags,
      prerequisites: CrucibleTalentItem.testPrerequisites(actor, reqs)
    };
  }

  /* -------------------------------------------- */

  /**
   * Prepare rendering context data for a Talent.
   * @returns {Promise<object>}
   */
  async #getTalentContext() {
    const actor = game.system.tree.actor;
    const talent = this.target.talent;

    // Talent Tags
    const reqs = CrucibleTalentItem.testPrerequisites(actor, talent.system.prerequisites);

    // Banned Signature
    if ( talent.system.isSignature ) {
      for ( const node of talent.system.nodes ) {
        const state = game.system.tree.state.get(node);
        if ( state.banned && !state.purchased ) reqs.signature = {tag: "Banned", met: false};
      }
    }

    // Return context
    return {
      source: talent.toObject(),
      descriptionHTML: await CONFIG.ux.TextEditor.enrichHTML(talent.system.description, {relativeTo: talent}),
      actions: await CrucibleTalentItemSheet.prepareActions(talent),
      prerequisites: reqs
    }
  }

  /* -------------------------------------------- */

  /** @override */
  _insertElement(element) {
    const existing = document.getElementById(element.id);
    if ( existing ) existing.replaceWith(element);
    const hud = document.getElementById("hud");
    hud.appendChild(element);
  }

  /* -------------------------------------------- */

  /** @override */
  _replaceHTML(result, content, options) {
    const existing = document.getElementById(content.id);
    if ( existing ) {
      content.replaceChildren(); // Always clear
      return super._replaceHTML(result, content, options);
    }
    const hud = document.getElementById("hud");
    hud.appendChild(content);
  }

  /* -------------------------------------------- */

  /** @override */
  _updatePosition({left, top}={}) {
    return {width: "auto", height: "auto", left, top, scale: 1.0};
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);
    this.element.classList.remove("hidden");
  }

  /* -------------------------------------------- */

  /**
   * Activate this HUD element, binding it to a target.
   * @param {CrucibleTalentTreeNode|CrucibleTalentTreeTalent} target    The target for the HUD
   * @returns {Promise<*>}
   */
  async activate(target) {
    this.target = target;
    const position = {
      left: target.x + (target.width / 2) + 10,
      top: target.y + - (target.height / 2)
    };
    if ( target instanceof CrucibleTalentTreeTalent ) {
      position.left += target.node.x;
      position.top += target.node.y;
    }
    return this.render({force: true, position});
  }

  /* -------------------------------------------- */

  /**
   * Temporarily hide the HUD element.
   */
  clear() {
    if ( !this.rendered ) return;
    this.element.classList.add("hidden");
  }
}const {ApplicationV2, HandlebarsApplicationMixin} = foundry.applications.api;
/**
 * An Application instance that renders the talent tree controls UI element.
 */
class CrucibleTalentTreeControls extends HandlebarsApplicationMixin(ApplicationV2) {

  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    id: "crucible-talent-controls",
    window: {
      frame: false,
      positioned: false,
    },
    classes: ['crucible', 'flexrow'],
    actions: {
      reset: this._onReset,
      closeTree: this._onCloseTree
    }
  };

  /** @override */
  static PARTS = {
    controls: {
      root: true,
      template: 'systems/crucible/templates/hud/talent-tree-controls.hbs',
    },
  };

  /* -------------------------------------------- */

  /**
   * A convenience reference to the tree instance.
   * @returns {CrucibleTalentTree}
   */
  get tree() {
    return game.system.tree;
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    return {
      actor: this.tree.actor,
      cssClass: this.options.classes.join(" ")
    };
  }

  /* -------------------------------------------- */

  /** @override */
  _insertElement(element) {
    const existing = document.getElementById(element.id);
    if ( existing ) existing.replaceWith(element);
    else crucible.tree.canvas.insertAdjacentElement("afterend", element);
  }
  
  /* -------------------------------------------- */

  /**
   * @this {CrucibleTalentTreeControls}
   * @type {ApplicationClickAction}
   */
  static _onCloseTree() {
    this.tree.close();
  }

  /**
   * @this {CrucibleTalentTreeControls}
   * @type {ApplicationClickAction}
   */
  static _onReset() {
    this.tree.actor.resetTalents({ dialog: true });
  }
}/**
 * The Crucible Talent Tree, constructed as a subclass of PIXI.Container.
 */
class CrucibleTalentTree extends PIXI.Container {
  constructor() {
    super();
    this.#initialize();
  }

  /**
   * Has the talent tree been drawn yet?
   * @type {boolean}
   */
  #drawn = false;

  /**
   * The canvas element used to draw the tree.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The PIXI Application that controls the secondary canvas.
   * @type {PIXI.Application}
   */
  app;

  /**
   * A reference to the Actor which is currently bound to the talent tree.
   * @type {CrucibleActor|null}
   */
  actor = null;

  /**
   * A reference to the active node
   * @type {CrucibleTalentTreeNode}
   */
  active;

  /**
   * A reference to the talent tree HUD
   * @type {CrucibleTalentHUD}
   */
  hud = new CrucibleTalentHUD();

  /**
   * A reference to the talent tree choice wheel
   * @type {CrucibleTalentChoiceWheel}
   */
  wheel;

  /**
   * A mapping which tracks the current node states
   * @type {Map<CrucibleTalentNode,CrucibleTalentNodeState>}
   */
  state = new CrucibleTalentNodeStates();

  /**
   * Spritesheet textures loaded for use in the tree.
   * @type {Record<string, PIXI.Texture>}
   */
  spritesheet = {};

  /**
   * Is the talent tree currently embedded within some other Application?
   * @type {CrucibleHeroCreationSheet|ApplicationV2|null}
   */
  #parentApp = null;

  /**
   * The dimensions of the talent tree
   * @type {{width: number, height: number}}
   */
  #dimensions = {
    width: 12000,
    height: 12000
  }

  #hudAlignOriginal;

  static #SEXTANT_ABILITIES = ["dexterity", "toughness", "strength", "wisdom", "presence", "intellect"];

  /* -------------------------------------------- */

  get tree() {
    return CrucibleTalentNode.nodes;
  }

  /* -------------------------------------------- */

  /**
   * Initialize the secondary canvas used for the talent tree.
   */
  #initialize() {

    // Create the HTML canvas element
    Object.defineProperty(this, "canvas", {value: document.createElement("canvas"), writable: false});
    this.canvas.id = "crucible-talent-tree";
    this.canvas.hidden = true;
    document.body.appendChild(this.canvas);

    // Create the PIXI Application
    Object.defineProperty(this, "app", {value: new PIXI.Application({
        view: this.canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: false,
        resolution: 1,
        autoDensity: true,
        background: 0x0b0909,
        antialias: false, // Not needed because we use SmoothGraphics
        powerPreference: "high-performance" // Prefer high performance GPU for devices with dual graphics cards
    }), writable: false});
    Object.defineProperty(this, "stage", {value: this.app.stage, writable: false});

    // Create the controls app
    Object.defineProperty(this, "controls", {value: new CrucibleTalentTreeControls(), writable: false});

    // Add this class to the canvas stage
    this.stage.addChild(this);
  }

  /* -------------------------------------------- */
  /*  Drawing                                     */
  /* -------------------------------------------- */

  /**
   * Draw the Talent Tree to the secondary canvas.
   * @returns {Promise<void>}
   */
  async draw() {
    if ( this.#drawn ) return;
    this.background = this.addChild(new PIXI.Container());
    this.foreground = this.addChild(new PIXI.Container());

    // Load Textures
    await this.#loadTextures();

    // Draw Background
    await this.#drawBackground();

    // Background connections
    this.edges = this.background.addChild(new PIXI.Graphics());

    // Active connections
    this.connections = this.background.addChild(new PIXI.Graphics());

    // Draw Ability Scores
    this.abilities = await this.#drawAbilityScores();

    // Draw Nodes and Edges
    this.nodes = this.background.addChild(new PIXI.Container());
    const origin = CrucibleTalentNode.nodes.get("origin");
    const seen = new Set();
    await this.#drawNodes(new Set([origin]), seen);

    // Background fade and filter
    this.background.darken = this.background.addChild(new PIXI.Graphics());
    this.background.blurFilter = new PIXI.BlurFilter(1);
    this.background.filters = [this.background.blurFilter];
    this.background.blurFilter.enabled = false;

    // Create Choice Wheel
    this.wheel = this.foreground.addChild(new CrucibleTalentChoiceWheel());

    // Ensure the main Canvas HUD is rendered
    this.#hudAlignOriginal = canvas.hud.align;
    canvas.hud.align = () => {};
    await canvas.hud.render({force: true});

    // Enable interactivity
    this.#activateInteractivity();

    // Draw initial conditions
    this.refresh();
    this.#drawn = true;
  }

  /* -------------------------------------------- */

  /**
   * Load all necessary textures for rendering the talent tree.
   * @returns {Promise<void[]>}
   */
  async #loadTextures() {
    const toLoad = ["systems/crucible/ui/tree/Tree0.json", "systems/crucible/ui/tree/BackgroundSlate.png"];
    await foundry.canvas.TextureLoader.loader.load(toLoad);
    const spritesheet = foundry.canvas.getTexture(toLoad[0]);
    const spritesheets = [spritesheet, ...spritesheet.linkedSheets];
    for ( const sheet of spritesheets ) {
      for ( const [asset, texture] of Object.entries(sheet.textures) ) {
        this.spritesheet[asset] = texture;
      }
    }
    this.spritesheet.BackgroundSlate = foundry.canvas.getTexture(toLoad[1]);
  }

  /* -------------------------------------------- */

  async #drawAbilityScores() {
    const scores = {};
    const textStyle = CONFIG.canvasTextStyle.clone();
    textStyle.fontFamily = "AwerySmallcaps";
    for ( const [i, abilityId] of CrucibleTalentTree.#SEXTANT_ABILITIES.entries() ) {
      const text = this.addChild(new PreciseText("12", textStyle));
      text.anchor.set(0.5, 0.5);
      const angle = 30 + (i * 60);
      const r = foundry.canvas.geometry.Ray.fromAngle(0, 0, Math.toRadians(angle), 220);
      text.position.set(r.B.x, r.B.y);
      this.background.addChild(text);
      scores[abilityId] = text;
    }
    return scores;
  }

  /* -------------------------------------------- */

  /**
   * Refresh the text labels of ability scores when the Actor changes.
   */
  #refreshAbilityScores() {
    for ( const abilityId of CrucibleTalentTree.#SEXTANT_ABILITIES ) {
      this.abilities[abilityId].text = this.actor.abilities[abilityId].value;
    }
  }

  /* -------------------------------------------- */

  async #drawBackground() {

    // Repeating slate texture
    const {width, height} = this.#dimensions;
    const backdrop = new PIXI.TilingSprite(this.spritesheet.BackgroundSlate, width, height);
    backdrop.position.set(-width/2, -height/2);
    this.background.backdrop = this.background.addChild(backdrop);

    // Core Gradient
    const cg = new PIXI.Sprite(this.spritesheet.CoreGradient);
    cg.scale.set(1.5, 1.5);
    cg.alpha = 0.15;
    this.background.coreGradient = this.background.addChild(cg);

    // Sextant Overlay
    this.background.overlay = this.background.addChild(this.#drawSextantsOverlay());

    // Origin Tattoo
    const originTattoo = new PIXI.Sprite(this.spritesheet.TattooOrigin);
    originTattoo.alpha = 0.4;
    this.background.originTattoo = this.background.addChild(originTattoo);

    // Spokes
    this.background.spokes = [];
    for ( let i=0; i<6; i++ ) {
      const angle = 60 * i;
      const r = foundry.canvas.geometry.Ray.fromAngle(0, 0, Math.toRadians(60 * i), 820);
      const spoke = new PIXI.Sprite(this.spritesheet.TattooSpoke);
      spoke.alpha = 0.4;
      spoke.angle = angle;
      spoke.position.set(r.B.x, r.B.y);
      this.background.spokes.push(this.background.addChild(spoke));
    }

    // Molten Core
    const mc = new PIXI.Sprite(this.spritesheet.CoreMolten);
    this.background.coreMolten = this.background.addChild(mc);

    // Core
    const core = new PIXI.Sprite(this.spritesheet.Core);
    this.background.core = this.background.addChild(core);
  }

  /* -------------------------------------------- */

  /**
   * Draw a graphics overlay for the six sextants of the tree.
   * TODO this could perhaps be replaced by a pure shader approach if we need to squeeze performance.
   */
  #drawSextantsOverlay() {
    const overlay = new PIXI.Graphics();
    for ( const [i, ability] of CrucibleTalentTree.#SEXTANT_ABILITIES.entries() ) {
      const color = SYSTEM.ABILITIES[ability].color;
      const r0 = foundry.canvas.geometry.Ray.fromAngle(0, 0, Math.toRadians(60 * i), 8000);
      const r1 = foundry.canvas.geometry.Ray.fromAngle(0, 0, Math.toRadians((60 * i) + 30), 10000);
      const r2 = foundry.canvas.geometry.Ray.fromAngle(0, 0, Math.toRadians((60 * i) + 60), 8000);
      const polygon = new PIXI.Polygon([0, 0, r0.B.x, r0.B.y, r1.B.x, r1.B.y, r2.B.x, r2.B.y]);
      overlay.beginFill(color, 0.025).drawShape(polygon).endFill();
    }

    // Tier Circles
    overlay.lineStyle({width: 8, color: 0x000000, alpha: 0.25});
    overlay.drawCircle(0, 0, 1600);
    overlay.drawCircle(0, 0, 3200);
    overlay.drawCircle(0, 0, 4800);
    return overlay;
  }

  /* -------------------------------------------- */

  #drawConnections(node, seen) {
    if ( node.id === "origin" ) return; // No connection lines from the origin
    for ( const c of node.connected ) {
      if ( seen.has(c) || (c.tier < 0) || !this.state.get(c).purchased ) continue;
      this.connections.moveTo(node.point.x, node.point.y);
      this.connections.lineStyle({color: "#0e0906", width: 12, alpha: 1.0}).lineTo(c.point.x, c.point.y);
      this.connections.lineStyle({color: c.color, width: 6, alpha: 1.0}).lineTo(node.point.x, node.point.y);
    }
  }

  /* -------------------------------------------- */

  async #drawNodes(nodes, seen=new Set()) {
    const next = [];
    this.edges.lineStyle({color: 0x000000, alpha: 0.25, width: 4, alignment: 0.5});
    for ( const node of nodes ) {
      if ( seen.has(node) ) continue;
      await this.#drawNode(node);
      this.#drawEdges(node, seen);
      seen.add(node);
      next.push(...node.connected);
    }
    if ( next.length ) await this.#drawNodes(next, seen);
  }

  /* -------------------------------------------- */

  async #drawNode(node) {
    const icon = node.icon = new CrucibleTalentTreeNode(node);
    this.nodes.addChild(icon);
  }

  /* -------------------------------------------- */

  #drawEdges(node, seen) {
    if ( node.id === "origin" ) return;
    for ( const c of node.connected ) {
      if ( seen.has(c) ) continue;
      this.edges.moveTo(node.point.x, node.point.y);
      this.edges.lineTo(c.point.x, c.point.y);
    }
  }

  /* -------------------------------------------- */
  /*  Tree Management                             */
  /* -------------------------------------------- */

  /**
   * Open the Talent Tree, binding it to a certain Actor
   * @param {CrucibleActor} actor         The Actor to bind to the talent tree
   * @param {object} [options]            Options which modify how the talent tree is opened
   * @param {boolean} [options.resetView]   Reset the view coordinates of the tree to the center?
   */
  async open(actor, {parentApp=null, resetView=true}={}) {
    if ( !(actor instanceof Actor) ) throw new Error("You must provide an actor to bind to the Talent Tree.");
    this.developmentMode = !!CONFIG.debug.talentTree;
    this.#parentApp = parentApp;
    this.actor = actor;

    // Draw the tree (once only)
    await this.draw();
    for ( const layer of canvas.layers ) layer.hud?.close();
    this.darkenBackground(false);

    // Show Actor sheet
    await actor.sheet.render({force: false, left: 20, top: 20});
    if ( actor.sheet.rendered ) {
      actor.sheet.setPosition({left: 20, top: 20});
      actor.sheet.minimize();
    }

    // Refresh tree state
    this.pan(resetView ? {x: 0, y: 0, scale: 1.0} : {});
    this.refresh();

    // Enable the talent tree canvas
    this.app.renderer.enabled = true;
    canvas.stage.eventMode = "none";
    this.stage.eventMode = "static";
    this.stage.interactiveChildren = true;
    this.canvas.hidden = false;
    if ( this.developmentMode ) this.canvas.style.zIndex = 0;
    else canvas.hud.element.style.zIndex = 9999;  // Move HUD above our canvas
  }

  /* -------------------------------------------- */

  /** @override */
  async close() {
    this.#parentApp = null;

    // Disassociate Actor
    const actor = this.actor;
    this.actor = null;
    await actor?.sheet.render(false);
    actor.sheet.maximize();

    // Deactivate UI
    this.wheel.deactivate();
    this.hud.close();
    this.controls.close();

    // Disable the talent tree canvas
    this.app.renderer.enabled = false;
    this.canvas.hidden = true;
    this.stage.eventMode = "none";
    this.stage.interactiveChildren = false;
    canvas.stage.eventMode = "static";

    // Restore HUD alignment
    canvas.hud.align = this.#hudAlignOriginal;
    canvas.hud.element.style.zIndex = ""; // Move HUD back to normal
    if ( canvas.ready ) canvas.hud.align();
  }

  /* -------------------------------------------- */

  /**
   * Refresh display of the talent tree, incorporating updated data about the Actor's purchased Talents.
   */
  refresh() {
    if ( !this.actor ) return;

    // Draw node changes
    this.getActiveNodes();
    this.connections.clear();
    const seen = new Set();
    for ( const node of CrucibleTalentNode.nodes.values() ) {
      if ( node.tier < 0 ) continue;
      const state = this.state.get(node);
      const nPurchased = state.purchased && node.talents.reduce((n, t) => n + this.actor.talentIds.has(t.id), 0);
      let text = nPurchased > 1 ? nPurchased : "";
      if ( this.developmentMode ) text = node.talents.size;
      node.icon?.draw({state, text});
      if ( state.purchased ) this.#drawConnections(node, seen);
      seen.add(node);
    }

    // Refresh ability scores
    this.#refreshAbilityScores();

    // Refresh talent wheel
    this.wheel.refresh();

    // Refresh controls
    if ( !this.#parentApp ) this.controls.render(true);

    // Refresh parent app
    if ( this.#parentApp?._onRefreshTalentTree instanceof Function ) this.#parentApp._onRefreshTalentTree();
  }

  /* -------------------------------------------- */

  /**
   * Pan the visual position of the talent tree canvas.
   * @param {number} [x]
   * @param {number} [y]
   * @param {number} [scale]
   */
  pan({x, y, scale}={}) {

    // Preserve current values for any unspecified inputs
    x ??= this.stage.pivot.x;
    y ??= this.stage.pivot.y;
    scale ??= this.stage.scale.x;

    // Constrain view
    const {width, height} = this.#dimensions;
    const w2 = width / 2;
    const h2 = height / 2;
    const {innerWidth, innerHeight} = window;
    scale = Math.clamp(scale, innerWidth / width, 1.0);
    const tx = (innerWidth / scale) / 2;
    x = Math.clamp(x, -w2 + tx, w2 - tx);
    const ty = (innerHeight / scale) / 2;
    y = Math.clamp(y, -h2 + ty, h2 - ty);

    // Set scale and pivot
    this.stage.pivot.set(x, y);
    this.stage.scale.set(scale, scale);
    this.#alignHUD();
  }

  /* -------------------------------------------- */
  /*  Talent Management                           */
  /* -------------------------------------------- */

  activateNode(node, {event}={}) {
    if ( this.active ) this.deactivateNode({click: false, event});
    this.active = node;
    this.hud.clear();
    this.wheel.activate(node);
    this.darkenBackground(true);
    crucible.api.audio.playClick();
  }

  /* -------------------------------------------- */

  deactivateNode({click=true, event, hover=true}={}) {
    const node = this.active;
    if ( !node ) return;
    this.active = null;
    if ( hover ) node._onPointerOut(event);
    this.wheel.deactivate();
    this.darkenBackground(false);
    if ( click ) crucible.api.audio.playClick();
  }

  /* -------------------------------------------- */

  darkenBackground(fade=true) {
    this.background.darken.clear();
    const w = this.#dimensions.width;
    if ( fade ) this.background.darken.beginFill(0x000000, 0.5).drawRect(-w/2, -w/2, w, w).endFill();
    this.background.blurFilter.enabled = fade;
  }

  /* -------------------------------------------- */

  /**
   * Traverse the talent tree, acquiring a Set of nodes which are currently accessible.
   * @returns {Map<CrucibleTalentNode, number>}
   */
  getActiveNodes() {
    const state = this.state;
    const actor = this.actor;
    state.clear();

    // Classify the number of signature nodes that have been purchased
    const signatures = CrucibleTalentNode.getSignatureTalents(actor);

    // Recursive testing function
    function updateBatch(nodes, accessible=false) {
      const next = [];
      for ( const node of nodes ) {

        // Record Node state
        if ( state.has(node) ) continue;
        const s = node.getState(actor, signatures);
        s.accessible = accessible && s.unlocked;
        state.set(node, s);

        // Traverse Outwards
        if ( (node.id === "origin") || s.purchased ) next.push(...node.connected);
      }

      // Recursively test
      if ( next.length ) updateBatch(next, true);
    }

    // Explore outwards from the origin node
    updateBatch([CrucibleTalentNode.nodes.get("origin")], true);

    // Specifically record the state of all signature nodes
    updateBatch(CrucibleTalentNode.signature, false);
    return state;
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  #activateInteractivity() {
    this.background.eventMode = "passive";
    this.background.children.forEach(c => c.eventMode = "none");
    this.nodes.eventMode = "passive";       // Capture hover/click events on nodes
    this.background.backdrop.eventMode = "static"; // Capture drag events on the backdrop
    this.foreground.eventMode = "passive";  // Capture hover/click events on the wheel

    // Mouse Interaction Manager
    this.interactionManager = new foundry.canvas.interaction.MouseInteractionManager(this, this, {}, {
      clickLeft: this.#onClickLeft,
      dragRightStart: null,
      dragRightMove: this.#onDragRightMove,
      dragRightDrop: null,
      dragRightCancel: null
    }, {
      application: this.app,
      dragResistance: 25
    }).activate();

    // Window Events
    window.addEventListener("resize", this.#onResize.bind(this));
    window.addEventListener("wheel", this.#onWheel.bind(this), {passive: false});
    this.#onResize();  // set initial dimensions
  }

  /* -------------------------------------------- */

  /**
   * Handle left-click events on the talent tree
   * @param {PIXI.FederatedEvent}   event
   */
  #onClickLeft(event) {
    event.stopPropagation();
    this.deactivateNode({event});
  }

  /* -------------------------------------------- */

  /**
   * Handle right-mouse drag events occurring on the Canvas.
   * @param {PIXI.FederatedEvent} event
   */
  #onDragRightMove(event) {
    const DRAG_SPEED_MODIFIER = 0.8;
    const {origin, destination} = event.interactionData;
    const dx = destination.x - origin.x;
    const dy = destination.y - origin.y;
    this.pan({
      x: this.stage.pivot.x - (dx * DRAG_SPEED_MODIFIER),
      y: this.stage.pivot.y - (dy * DRAG_SPEED_MODIFIER)
    });
  }

  /* -------------------------------------------- */

  /**
   * Handle window resize events.
   */
  #onResize() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    const {width, height} = this.app.renderer.screen;
    this.stage.position.set(width/2, height/2);
    this.pan(this.stage.pivot);
  }

  /* -------------------------------------------- */

  /**
   * Handle mousewheel events on the Talent Tree canvas.
   * @param {WheelEvent} event      The mousewheel event
   */
  #onWheel(event) {
    if ( this.canvas.hidden || (event.target?.id !== "crucible-talent-tree") ) return;
    let dz = ( event.delta < 0 ) ? 1.05 : 0.95;
    this.pan({scale: dz * this.stage.scale.x});
  }

  /* -------------------------------------------- */

  /**
   * Align the position of the HUD layer to the current position of the canvas.
   */
  #alignHUD() {
    const {width, height} = this.#dimensions;
    const hud = canvas.hud.element;
    const {x, y} = this.getGlobalPosition();
    const scale = this.stage.scale.x;
    Object.assign(hud.style, {
      width: `${width}px`,
      height: `${height}px`,
      left: `${x}px`,
      top: `${y}px`,
      transform: `scale(${scale})`
    });
  }
}

/* -------------------------------------------- */

/**
 * @typedef CrucibleTalentNodeState
 * @property {boolean} [accessible]
 * @property {boolean} unlocked
 * @property {boolean} purchased
 * @property {boolean} banned
 */

/**
 * A specialized subclass of Map which falls back for undefined node IDs to an inaccessible state.
 */
class CrucibleTalentNodeStates extends Map {

  /**
   * The default Talent node state.
   * @type {CrucibleTalentNodeState}
   */
  static DEFAULT_STATE = Object.freeze({accessible: false, unlocked: false, purchased: false, banned: false});

  /**
   * @inheritDoc
   * @returns {CrucibleTalentNodeState}
   */
  get(key) {
    /** @type {CrucibleTalentNodeState} */
    const state = super.get(key);
    return state || CrucibleTalentNodeStates.DEFAULT_STATE;
  }
}var _module$2=/*#__PURE__*/Object.freeze({__proto__:null,CrucibleTalentChoiceWheel:CrucibleTalentChoiceWheel,CrucibleTalentHUD:CrucibleTalentHUD,CrucibleTalentIcon:CrucibleTalentIcon,CrucibleTalentTree:CrucibleTalentTree,CrucibleTalentTreeControls:CrucibleTalentTreeControls,CrucibleTalentTreeNode:CrucibleTalentTreeNode,CrucibleTalentTreeTalent:CrucibleTalentTreeTalent});/**
 * Selective grid shader for Crucible:
 * Renders the grid only around up to MAX_POSITIONS controlled tokens with a smooth fall‑off. When the number of
 * controlled tokens exceeds MAX_POSITIONS the shader renders the entire grid.
 */
class CrucibleSelectiveGridShader extends foundry.canvas.rendering.shaders.GridShader {

  /**
   * Maximum number of tokens considered for selective rendering.
   * @type {number}
   */
  static MAX_CONTROLLED = 6;

  /**
   * Maximum number of positions: two points (center + preview) per token.
   * @type {number}
   */
  static MAX_POSITIONS = this.MAX_CONTROLLED * 2;

  /** @override */
  static defaultUniforms = {
    ...super.defaultUniforms,
    positions: new Float32Array(this.MAX_POSITIONS * 2).fill(0), // vec2 per position
    strides: new Float32Array(this.MAX_POSITIONS).fill(0),       // one float per position
    numPositions: 0,
    numControlled: 0,
    falloff: 4
  };

  /* -------------------------------------------- */

  /** @override */
  static _fragmentShader = `
    uniform lowp int style;

    const int MAX_CONTROLLED = ${this.MAX_CONTROLLED};
    const int MAX_POSITIONS = ${this.MAX_POSITIONS};

    uniform int numPositions;
    uniform int numControlled;
    uniform float falloff;
    uniform vec2 positions[MAX_POSITIONS];
    uniform float strides[MAX_POSITIONS];

    ${this.DRAW_GRID_FUNCTION}

    vec4 _main() {
      // No controlled tokens: hide the grid entirely
      if ( numControlled == 0 ) return vec4(0.0);

      vec4 gridColor = drawGrid(vGridCoord, style, thickness, color);

      // Too many tokens: render the full grid
      if ( numControlled > MAX_CONTROLLED ) return gridColor;

      // Blend contribution from each position using its own stride
      float alpha = 0.0;
      for ( int i = 0; i < MAX_POSITIONS; ++i ) {
        if ( i >= numPositions ) break;
        float d = distance(vGridCoord, positions[i]);
        float r = strides[i];
        float a = 1.0 - smoothstep(max(r - falloff, 1.0), r + falloff, d);
        alpha = max(alpha, a);
      }
      return gridColor * alpha;
    }
  `;

  /* -------------------------------------------- */

  /**
   * Push token center positions and individual strides into shader uniforms.
   */
  updatePositions() {
    const tokens = canvas.tokens.controlled;
    const gs = canvas.grid.size;
    const u = this.uniforms;

    u.numControlled = tokens.length;

    let posCount = 0;

    for ( const t of tokens ) {
      if ( posCount >= this.constructor.MAX_POSITIONS ) break;

      // Determine grid reveal radius
      const {size=4, stride=10} = t.actor?.system.movement || {};
      const radius = (size / 2) + stride;

      // Controlled token center
      u.positions[posCount * 2] = t.center.x / gs;
      u.positions[posCount * 2 + 1] = t.center.y / gs;
      u.strides[posCount] = radius;
      posCount++;

      // Preview center, if any
      if ( t.hasPreview && t._preview && (posCount < this.constructor.MAX_POSITIONS) ) {
        u.positions[posCount * 2] = t._preview.center.x / gs;
        u.positions[posCount * 2 + 1] = t._preview.center.y / gs;
        u.strides[posCount] = radius;
        posCount++;
      }
    }

    u.numPositions = posCount;
  }

  /* -------------------------------------------- */

  /** @override */
  _preRender(mesh, renderer) {
    super._preRender(mesh, renderer);
    this.updatePositions();
  }
}/**
 * Render Crucible batched grid-aligned token hitboxes.
 * Rendered just after the Grid and before Tokens interface (ERASE will punch through).
 *
 * aAnimationTypes bit flags:
 *  bit 1 => const int OPT_SOLID_STROKE = 0x01 = 1;
 *  bit 2 => const int OPT_SOLID_FILL = 0x02 = 2;
 *  bit 3 => const int OPT_CELL_FADE_FILL = 0x04 = 4;
 *  bit 4 => const int OPT_GRID_RIPPLES = 0x08 = 8;
 *  bit 5 => const int OPT_RADAR_SWEEP = 0x10 = 16;
 *  All other bits RESERVED for Foundry CORE or CRUCIBLE SYSTEM!
 */
class CrucibleHitBoxShader extends foundry.canvas.rendering.shaders.BaseSamplerShader {

  static classPluginName = "batchCrucibleHitBox";
  static pausable = false;

  static batchGeometry = [
    {id:"aColor", size:4, normalized:true,  type: PIXI.TYPES.UNSIGNED_BYTE},
    {id:"aAnimationTypes", size:1, normalized:false, type: PIXI.TYPES.FLOAT},
    {id:"aDashOffsetPx", size:1, normalized:false, type: PIXI.TYPES.FLOAT},
    {id:"aCenterWorld", size:2, normalized:false, type: PIXI.TYPES.FLOAT},
    {id:"aObjectCells", size:1, normalized:false, type: PIXI.TYPES.FLOAT},
    {id:"aCorner", size:2, normalized:false, type: PIXI.TYPES.FLOAT}
  ];

  static batchVertexSize = 8;

  static batchDefaultUniforms() {
    return {
      time: 0,
      gridSize: 100,
      zoomScale: 1.0,
      cameraPos: [0, 0],
      cameraPivot: [0, 0],
      targetIndicatorColor: [0.4, 1, 0.5, 1],
      thickness: 8,
      dashCount: 12,
      dashNormLength: 0.75,
      dashBlur: 0,
      dashCyclePerSecond: 1,
      dashBorderPixels: 2,
      hoverPulsePx: -10,
      hoverPulseHz:  1.0,
      perimPhasePx: 35 // TODO to refine later
    };
  }

  /**
   * Bitmask options
   * @type {{solidStroke: boolean, solidFill: boolean, cellFadeFill: boolean, gridRipples: boolean, radarSweep: boolean}}
   */
  static STATES = {
    hovered: false,      // 0x01
    controlled: false,   // 0x02
    targeted: false,     // 0x04
    solidFill: false,    // 0x08
    cellFadeFill: false, // 0x10
    gridRipples: false,  // 0x20
    radarSweep: false,   // 0x40
  };

  /* -------------------------------------------- */

  /** @override */
  static _preRenderBatch(batchRenderer) {
    const u = batchRenderer._shader?.uniforms;
    if ( !u ) return;

    const stage = canvas?.stage;
    const grid  = canvas?.grid;

    u.time = canvas.app.ticker.lastTime / 1000;
    u.zoomScale = stage?.scale?.x || 1.0;
    u.cameraPos = [stage?.position?.x ?? 0, stage?.position?.y ?? 0];
    u.cameraPivot = [stage?.pivot?.x ?? 0, stage?.pivot?.y ?? 0];

    let gs = grid?.size ?? (u.gridSize || 100);
    const subdiv = (grid?.micro?.size ?? null) ?? (grid?.subdivisions ?? null);
    if ( typeof grid?.micro?.size === "number" && grid.micro.size > 0 ) gs = grid.micro.size;
    else if ( typeof subdiv === "number" && subdiv > 1 ) gs = gs / subdiv;
    u.gridSize = gs;
  }

  /* -------------------------------------------- */

  /** @override */
  static _packInterleavedGeometry(element, attributeBuffer, indexBuffer, aIndex, iIndex) {
    const {float32View, uint32View} = attributeBuffer;

    const baseVertex = aIndex / this.vertexSize;
    const idx = element.indices;
    for ( let n = 0; n < idx.length; n++ ) indexBuffer[iIndex++] = baseVertex + idx[n];

    const token = element.crucibleToken;
    const hb = token.getHitBoxData();
    const abgr = token.getHitBoxBorderColor();

    const cxWorld = hb.centerX;
    const cyWorld = hb.centerY;
    const objectCells = hb.sizeUnits ?? 4;

    const animationTypes = hb.animationTypes.valueOf() ?? 0;
    const dashOffsetPx = hb.dashOffsetPx ?? 0;

    const corners = [-1, -1, 1, -1, 1, 1, -1, 1];
    const vs = this.vertexSize;

    for ( let i = 0, j = 0; i < corners.length; i += 2, j += vs ) {
      let k = aIndex + j;
      uint32View[k++] = abgr;
      float32View[k++] = animationTypes;
      float32View[k++] = dashOffsetPx;
      float32View[k++] = cxWorld;
      float32View[k++] = cyWorld;
      float32View[k++] = objectCells;
      float32View[k++] = corners[i];
      float32View[k++] = corners[i + 1];
    }
  }

  /* -------------------------------------------- */

  /** @override */
  static get batchVertexShader() {
    return `
    #version 300 es
    precision highp float;
    
    in vec2 aCenterWorld;
    in float aObjectCells;
    in vec4 aColor;
    in vec2 aCorner;
    in float aAnimationTypes;
    in float aDashOffsetPx;
    
    uniform mat3 projectionMatrix;
    uniform vec4 tint;
    uniform float zoomScale;
    uniform vec2 cameraPos;
    uniform vec2 cameraPivot;
    uniform float gridSize;
    
    out vec2 vNormGridExt;
    out vec2 vNormGrid;
    flat out float vObjectCells;
    
    flat out vec4 vVertexColor;
    flat out uint vAnimationTypes;
    flat out float vDashOffsetPx;
    
    out vec2 vLocalPx;
    out vec2 vLocalExPx;
    flat out vec2 vHalfSizePx;
    
    vec2 worldToScreen(in vec2 world){
      return (world - cameraPivot) * zoomScale + cameraPos;
    }
    
    void main(){
      float objectSizeWorld = aObjectCells * gridSize;
      float halfObjectWorld = 0.5 * objectSizeWorld;
      float halfExtendedWorld = halfObjectWorld + 0.5 * gridSize;
    
      vec2 localExtendedWorld = aCorner * halfExtendedWorld;
      vec2 localNormalWorld = aCorner * halfObjectWorld;
    
      vec2 screenExtended = worldToScreen(aCenterWorld + localExtendedWorld);
      gl_Position = vec4((projectionMatrix * vec3(screenExtended, 1.0)).xy, 0.0, 1.0);
    
      vNormGridExt = (localExtendedWorld + halfExtendedWorld) / (objectSizeWorld + gridSize);
      vec2 localRemappedWorld = localExtendedWorld + halfExtendedWorld - vec2(0.5 * gridSize);
      vNormGrid = localRemappedWorld / objectSizeWorld;
    
      vLocalExPx = localExtendedWorld * zoomScale;
      vLocalPx = localNormalWorld * zoomScale;
      vHalfSizePx = vec2(halfObjectWorld * zoomScale);
    
      vVertexColor = aColor * tint;
      vAnimationTypes = uint(round(aAnimationTypes));
      vDashOffsetPx = aDashOffsetPx;
      vObjectCells = aObjectCells;
    }
    `;
  }

  /* -------------------------------------------- */

  /** @override */
  static get batchFragmentShader() {
    return `
    #version 300 es
    precision highp float;     // Note: a lot of uniforms here need high precision => so be it for the whole frag!
    #define texture2D texture
    
    in vec2 vNormGridExt;
    in vec2 vNormGrid;
    flat in float vObjectCells;
    
    in vec2 vLocalPx;
    in vec2 vLocalExPx;
    flat in vec2 vHalfSizePx;
    
    flat in vec4 vVertexColor;
    flat in uint vAnimationTypes;
    flat in float vDashOffsetPx;
    
    uniform float time;
    uniform float zoomScale;
    
    uniform float thickness;
    uniform float dashBorderPixels;
    uniform float dashCount;
    uniform float dashNormLength;
    uniform float dashBlur;
    uniform float dashCyclePerSecond;
    
    uniform float gridSize;
    uniform float perimPhasePx;
    
    uniform vec4 targetIndicatorColor;
    uniform float hoverPulsePx;
    uniform float hoverPulseHz;
    
    // FIXME: Use a dedicated shader generator to avoid this hack
    uniform sampler2D uSamplers[%count%];
    
    out vec4 fragColor;
    
    ${foundry.utils.BitMask.generateShaderBitMaskConstants(Object.keys(this.STATES))}
    
    const float SOLID_ALPHA  = 0.33;
    const float RIPPLE_ALPHA = 0.75;
    
    ${this.CONSTANTS}
    
    float signedDistanceBox(in vec2 p, in vec2 b) {
      vec2 d = abs(p) - b;
      return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    }
      
    float stripeMask(in float s, in float period, in float halfOn, in float phase, in float aa, in float blur) {
      float q = mod(s - phase + 0.5 * period, period) - 0.5 * period;
      float edge = halfOn - abs(q);
      return smoothstep(-aa - blur, aa + blur, edge);
    }
    
    void accumulateOver(inout vec4 acc, in vec3 rgb, in float a) {
      float k = 1.0 - acc.a;
      float w = k * a;
      acc.rgb += rgb * w;
      acc.a += w;
    }
    
    // FIXME: Need to use better hash
    float hash12(in vec2 p) {
      return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
    }
    
    float gridClipMask() {
      vec2 d = min(vNormGrid, 1.0 - vNormGrid);
      vec2 aa = fwidth(vNormGrid);
      vec2 m = smoothstep(vec2(0.0), aa, d);
      return m.x * m.y;
    }
    
    float ringsPerCell(in vec2 ng) {
      vec2 cellCoord = ng * vObjectCells;
      vec2 cellIdx = floor(cellCoord + 1e-6);
      vec2 cellCenter = (cellIdx + 0.5) / vObjectCells;
      float cs = gridSize * zoomScale;
      vec2 delta = (ng - cellCenter) * vObjectCells;
      float r = length(delta) * cs;
      float rMax = 0.5 * cs - 1.0;
      if ( r > rMax ) return 0.0;
      float j = hash12(cellIdx);
      float spacing = max(0.18 * cs, 1.0);
      float speed = 0.20 * cs;
      float phase = (time + j) * speed;
      float saw = abs(mod(r + phase, spacing) - 0.5*spacing);
      float aa = max(fwidth(r), 1e-4);
      float ring = smoothstep(1.0 + aa, 1.0 - aa, saw);
      float edgeFade = 1.0 - smoothstep(rMax - 2.0, rMax, r);
      return ring * edgeFade;
    }
    
    float cellFade(in vec2 ng) {
      vec2 cellIdx = floor(ng * vObjectCells + 1e-6);
      float j = hash12(cellIdx);
      float freq = 0.40 + 0.35 * j;
      float t = fract((time + j) * freq);
      float tri = 1.0 - abs(2.0 * t - 1.0);
      return 0.5 * tri;
    }
       
    struct SideUV {
      float s;
      float aa;
    };
    
    SideUV sidePerimeter(in vec2 p, in vec2 halfPx) {
      float w = halfPx.x;
      float h = halfPx.y;
    
      float dx = w - abs(p.x);
      float dy = h - abs(p.y);
    
      const float cornerTol = 1.0;
      float horizMask = step(dy - dx, cornerTol);
      float vertMask = 1.0 - horizMask;
    
      float topMask = step(0.0, p.y);
      float bottomMask = 1.0 - topMask;
      float rightMask = step(0.0, p.x);
      float leftMask = 1.0 - rightMask;
    
      float sBottom = (p.x + w);
      float sTop = (2.0 * w + 2.0 * h) + (w - p.x);
      float sRight = (2.0 * w) + (p.y + h);
      float sLeft = (2.0 * w + 2.0 * h + 2.0 * w) + (h - p.y);
    
      float sHoriz = bottomMask * sBottom + topMask * sTop;
      float sVert = rightMask  * sRight  + leftMask * sLeft;
    
      float s = horizMask * sHoriz + vertMask * sVert;
      float aaH = max(fwidth(p.x), 1e-4);
      float aaV = max(fwidth(p.y), 1e-4);
      float aa = mix(aaV, aaH, horizMask);
    
      SideUV outv;
      outv.s = s;
      outv.aa = aa;
      return outv;
    }
    
    float lineToPointDistance2D(in vec2 a, in vec2 b, in vec2 p) {
      vec2 pa = p - a;
      vec2 ba = b - a;
      float h = clamp(dot(pa,ba) / max(dot(ba,ba), 1e-6), 0.0, 1.0);
      return length(pa - ba*h);
    }
    
    float ringAntiAlias(in float r, in float r0, in float halfPx) {
      float d = abs(r - r0);
      float aa = max(fwidth(r), 1e-4);
      return smoothstep(halfPx + aa, halfPx - aa, d);
    }
    
    float boxAntiAlias(in float x, in float a, in float b, in float aa) { 
      float enter = smoothstep(a - aa, a + aa, x);
      float exit = 1.0 - smoothstep(b - aa, b + aa, x);
      return clamp(enter * exit, 0.0, 1.0);
    }
    
    float radarBeam() {
      vec2 halfExPx = vHalfSizePx + vec2(0.5 * gridSize * zoomScale);
      float rMax = min(halfExPx.x, halfExPx.y) - 2.0;
    
      vec2 p = vLocalExPx;
      float r = length(p);
      float theta = atan(p.y, p.x);
    
      float head = time * 1.2;
    
      vec2 a = vec2(0.0);
      vec2 b = vec2(cos(head), sin(head)) * rMax;
      float dist = lineToPointDistance2D(a, b, p);
      float aa = max(fwidth(dist), 1e-4);
      float lineWidthPx = 1.8;
      float core = smoothstep(lineWidthPx + aa * 2.0, lineWidthPx - aa * 2.0, dist);
    
      float d = head - theta;
      d = mod(d + PI, TWOPI) - PI;
      float behind = step(0.0, d);
    
      float trailAngle = 0.8;
      float wedge = behind * exp(-d / max(trailAngle, 1e-3));
    
      float inner = smoothstep(0.0, rMax * 0.15, r);
      float outer = 1.0 - smoothstep(rMax - 4.0, rMax + 1.0, r);
      float radial = inner * outer * (r / max(rMax, 1.0));
    
      float rim = ringAntiAlias(r, rMax, 2.5);
      return clamp((0.95 * core + 0.85 * wedge) * radial + 0.85 * rim, 0.0, 1.0);
    }
    
    void main(){
      float clipMask = gridClipMask();
    
      float sdClip = signedDistanceBox(vLocalPx, vHalfSizePx);
      float sdDash = signedDistanceBox(vLocalExPx, vHalfSizePx);
      float aaClip = max(fwidth(sdClip), 1e-4);
      float insideBox = smoothstep(0.0, aaClip, -sdClip);

      bool targeted = ((vAnimationTypes & TARGETED) != 0U);
      bool hovered = ((vAnimationTypes & HOVERED) != 0U);
      bool controlled = ((vAnimationTypes & CONTROLLED) != 0U);
    
      float thicknessPx = max(thickness * zoomScale, 0.0);
      float borderPx = max(dashBorderPixels * zoomScale, 0.0);
      
      float deltaPx = vDashOffsetPx * zoomScale;
      if ( targeted ) {
        float k = (hoverPulsePx * cos(TWOPI * hoverPulseHz * time) + 1.0) * 0.5 * zoomScale;
        deltaPx += k;
      }
      
      float aaDash = max(fwidth(sdDash), 1e-4);
      float eps = aaDash * 0.5;
      float aAll = -deltaPx - thicknessPx;
      float bAll = -deltaPx - (1.0 - step(aaDash, abs(deltaPx))) * eps;
      float bandAll = boxAntiAlias(sdDash, aAll, bAll, aaDash);
    
      float aFill = aAll + borderPx;
      float bFill = bAll - borderPx;
      float bandFill = (thicknessPx > 2.0 * borderPx) ? boxAntiAlias(sdDash, aFill, bFill, aaDash) : 0.0;
    
      float w = vHalfSizePx.x;
      float h = vHalfSizePx.y;
      float perim = 4.0 * (w + h);
    
      SideUV uv = sidePerimeter(vLocalPx, vHalfSizePx);
    
      float N = max(1.0, round(dashCount));
      float period = perim / N;
      float halfOn = 0.5 * clamp(dashNormLength, 0.0, 1.0) * period;
      float phase = perimPhasePx - time * dashCyclePerSecond * period;
      float blur = clamp(dashBlur, 0.0, 0.25) * period;
       
      float tAll = (controlled || hovered) ? 1.0 : stripeMask(uv.s, period, halfOn, phase, uv.aa, blur);
    
      float shrink = clamp(dashNormLength - (2.0 * borderPx) / max(period, 1e-4), 0.0, 1.0);
      float halfOnFill = 0.5 * shrink * period;
      float tFill = (controlled || hovered) ? 1.0 : (halfOnFill > 0.0 ? stripeMask(uv.s, period, halfOnFill, phase, uv.aa, blur) : 0.0);
    
      float dashAll = bandAll * tAll;
      float dashFill = bandFill * tFill;
      float dashOutline = max(dashAll - dashFill, 0.0);
    
      vec4 outColor = vec4(0.0);
      float fxMask = insideBox * clipMask;
    
      // SOLID FILL OPTION
      if ( (vAnimationTypes & SOLIDFILL) != 0U ){
        accumulateOver(outColor, vVertexColor.rgb, vVertexColor.a * SOLID_ALPHA * fxMask);
      }

      // GRID RIPPLES OPTION
      if ( (vAnimationTypes & GRIDRIPPLES) != 0U ){
        float rip = ringsPerCell(vNormGrid) * fxMask;
        accumulateOver(outColor, vVertexColor.rgb, vVertexColor.a * RIPPLE_ALPHA * rip);
        float ripOut = smoothstep(0.4, 0.6, rip);
        accumulateOver(outColor, vec3(0.0), ripOut * fxMask);
      }

      // CELL FADING OPTION
      if ( (vAnimationTypes & CELLFADEFILL) != 0U || (hovered || targeted) ){
        float cA = cellFade(vNormGrid) * fxMask;
        accumulateOver(outColor, vVertexColor.rgb, vVertexColor.a * cA);
      }
    
      // RADAR SWEEP OPTION
      if ( (vAnimationTypes & RADARSWEEP) != 0U ){
        float beam = radarBeam();
        accumulateOver(outColor, targetIndicatorColor.rgb, targetIndicatorColor.a * beam);
      }
    
      float aDashFill = clamp(vVertexColor.a * dashFill, 0.0, 1.0);
      outColor.rgb = mix(outColor.rgb, vVertexColor.rgb, aDashFill);
      outColor.a = max(outColor.a, aDashFill);
    
      float aOutline = clamp(dashOutline, 0.0, 1.0);
      outColor.rgb = mix(outColor.rgb, vec3(0.0), aOutline);
      outColor.a = max(outColor.a, aOutline);
    
      // OUTPUT RESULT
      fragColor = outColor;
    
      // FIXME: Use a dedicated shader generator to avoid this hack
      if ( false ){
        const float vTextureId = 0.0;
        vec4 color = vec4(0.0);
        vec2 vTextureCoord = vec2(0.0);
        %forloop%
      }
    }
    `;
  }
}class CrucibleTokenObject extends foundry.canvas.placeables.Token {

  /** @inheritDoc */
  static RENDER_FLAGS = Object.assign({}, super.RENDER_FLAGS, {
    refreshFlanking: {}
  });

  /**
   * Container to "store" some unused graphics in Crucible.
   * @type {PIXI.Container}
   */
  static #voidContainer = new PIXI.Container();

  /**
   * @typedef {Object} CrucibleTokenEngagement
   * @property {Set<Token>} allies      Allied tokens which are engaged
   * @property {Set<Token>} enemies     Enemy tokens which are engaged
   * @property {Set<Token>} other       Other tokens which are engaged
   * @property {PIXI.Rectangle} [engagementBounds] Your bounds of engagement
   * @property {PIXI.Polygon} [movePolygon] Your current movement polygon
   * @property {number} [flankers]      The number of enemy flankers
   * @property {number} [allyBonus]     The engagement bonus provided by adjacent allies
   * @property {number} [flanked]       The resulting flanked stage
   */

  /**
   * Current engagement status for the Token.
   * @type {CrucibleTokenEngagement}
   */
  engagement = this.#initializeEngagement();

  /**
   * Should the next flanking update be responsible for committing Active Effect changes?
   * @type {boolean}
   */
  #commitFlanking = false;

  /**
   * A Graphics object in the debug layer which displays engagement for this token.
   * @type {PIXI.Graphics}
   */
  #engagementDebug;

  /**
   * Cached hitbox data in screen-space coordinates.
   * Values are recomputed only when token, scene, or camera state changes.
   * @type {{
   *   abgr: number,                // Token disposition color in little endian
   *   hitboxCenterX: number,       // Screen-space center X
   *   hitboxCenterY: number,       // Screen-space center Y
   *   hitboxHalfWidth: number,     // Screen-space half width
   *   hitboxHalfHeight: number,    // Screen-space half height
   *   trLocalID: number,           // Transform local ID
   *   trParentID: number,          // Transform parent ID
   *   gridSize: number,            // Scene grid size
   *   sizeUnits: number,           // Actor movement size
   *   centerX: number,             // Token world center X
   *   centerY: number,             // Token world center Y
   *   abgr: number,                // Token disposition color in little endian
   *   colorRaw: number             // Raw RGBA color
   *   dashOffsetPx: number         // The hitbox offset for this token
   *   animationTypes: number       // A bitmask holding all the animation types active for this token
   * }}
   */
  #hbCache = {
    hitboxCenterX: 0,
    hitboxCenterY: 0,
    hitboxHalfWidth: 0,
    hitboxHalfHeight: 0,
    trLocalID: -1,
    trParentID: -1,
    gridSize: -1,
    sizeUnits: -1,
    centerX: NaN,
    centerY: NaN,
    abgr: 0,
    colorRaw: NaN,
    dashOffsetPx: 0,
    animationTypes: new foundry.utils.BitMask(CrucibleHitBoxShader.STATES)
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _draw(options){
    await super._draw(options);
    if ( !canvas.scene.useMicrogrid ) return;
    CrucibleTokenObject.#voidContainer.visible = false;
    CrucibleTokenObject.#voidContainer.addChild(this.border);
    CrucibleTokenObject.#voidContainer.addChild(this.targetArrows);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _applyRenderFlags(flags) {
    super._applyRenderFlags(flags);
    if ( flags.refreshFlanking ) this.#updateFlanking();
  }

  /* -------------------------------------------- */

  /** @override */
  _refreshBorder() {
    if ( !canvas.scene.useMicrogrid ) super._refreshBorder();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _refreshVisibility() {
    super._refreshVisibility();
    if ( !canvas.scene.useMicrogrid ) return;
    this.#hbCache.animationTypes.toggleState("controlled", this.controlled);
    this.#hbCache.animationTypes.toggleState("hovered", this.hover || this.layer.highlightObjects);
    if ( this.isVisible ) CrucibleTokenObject.visibleTokens.add(this);
    else CrucibleTokenObject.visibleTokens.delete(this);
  }

  /* -------------------------------------------- */

  /** @override */
  _refreshTarget() {
    if ( !canvas.scene.useMicrogrid ) return super._refreshTarget();
    this._drawTargetPips();
    const isTargetedByUser = (this.targeted.size > 0) && this.targeted.has(game.user);
    this.#hbCache.animationTypes.toggleState("targeted", isTargetedByUser);
  }

  /* -------------------------------------------- */

  /** @override */
  drawBars() {
    super.drawBars();
    if ( !this.actor || (this.document.displayBars === CONST.TOKEN_DISPLAY_MODES.NONE) ) return;
    this.#drawResources();
    if ( !this.bars.alphaFilter ) {
      this.bars.alphaFilter = new PIXI.AlphaFilter();
      this.bars.filters = [this.bars.alphaFilter];
    }
    this.bars.alphaFilter.alpha = 0.6;
  }

  /* -------------------------------------------- */

  /** @override */
  _drawBar(number, bar, data) {
    const val = Number(data.value);
    const pct = Math.clamp(val, 0, data.max) / data.max;
    const p = 8;

    // Determine sizing
    const {width, height} = this.document.getSize();
    const bw = width - (p * 2);
    const bh = number === 0 ? 10 : 8;
    const bs = 1;

    // Determine the color to use
    const colors = number === 0 ? SYSTEM.RESOURCES.health.color : SYSTEM.RESOURCES.morale.color;
    const color = colors.low.mix(colors.high, pct);

    // Draw bar
    bar.clear();
    bar.lineStyle(bs, 0x000000, 1.0);
    bar.beginFill(0x000000, 0.5).drawRect(0, 0, bw, bh, 3);
    bar.beginFill(color, 1.0).drawRect(0, 0, pct * bw, bh, 2);

    // Set position
    const posY = (height - p) - (number === 0 ? 10 : 18);
    bar.position.set(p, posY);
    return true;
  }

  /* -------------------------------------------- */

  /**
   * Draw resource pips as part of the token bars.
   */
  #drawResources() {
    if ( !["hero", "adversary"].includes(this.actor?.type) ) return;
    if ( !this.bars.resources ) {
      this.bars.resources = this.bars.addChild(new PIXI.Graphics());
      this.bars.resources.position.set(0, 0);
    }
    const p = 8;
    const r = this.bars.resources;
    r.clear();
    const {action, focus} = this.actor.system.resources;
    const {width, height} = this.document.getSize();

    // Action Pips
    const ac = SYSTEM.RESOURCES.action.color;
    r.beginFill(ac, 1.0).lineStyle({color: 0x000000, width: 1});
    for ( let i=0; i<action.value; i++ ) {
      r.drawCircle((2 * p) + (i * 10), height - p - 10, 3);
    }
    r.endFill();

    // Focus Pips
    const fc = SYSTEM.RESOURCES.focus.color;
    r.beginFill(fc, 1.0).lineStyle({color: 0x000000, width: 1});
    for ( let i=0; i<focus.value; i++ ) {
      r.drawCircle(width - (2 * p) - (i * 10), height - p - 18, 3);
    }
    r.endFill();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onControl(options) {
    super._onControl(options);
    if ( CONFIG.debug.flanking ) this._visualizeEngagement(this.engagement);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onRelease(options) {
    super._onRelease(options);
    this._clearEngagementVisualization();
  }

  /* -------------------------------------------- */
  /*  Movement                                    */
  /* -------------------------------------------- */

  /** @override */
  _getMovementCostFunction(options) {
    const calculateTerrainCost = CONFIG.Token.movement.TerrainData.getMovementCostFunction(this.document, options);
    const actor = this.actor;
    return (from, to, distance, segment) => {

      // Step 1: Apply condition-based cost modifiers
      if ( actor ) {
        const statuses = actor.statuses;
        if ( statuses.has("slowed") ) distance *= 2;
        if ( statuses.has("prone") ) distance *= 2;
        if ( statuses.has("hastened") ) distance /= 2;
        if ( statuses.has("restrained") ) distance = Infinity;
      }

      // Step 2: Apply difficult terrain
      const terrainCost = calculateTerrainCost(from, to, distance, segment);

      // Step 3: Apply movement action
      return terrainCost * (segment.actionConfig.costMultiplier ?? 1);
    };
  }

  /* -------------------------------------------- */

  /** @override */
  _getAnimationMovementSpeed(options) {
    return this.actor ? this.actor.system.movement.stride * 2 : CONFIG.Token.movement.defaultSpeed;
  }

  /* -------------------------------------------- */

  /** @override */
  _modifyAnimationMovementSpeed(speed, options) {
    if ( options.terrain instanceof foundry.data.TerrainData ) speed /= options.terrain.difficulty;
    const actionConfig = CONFIG.Token.movement.actions[options.action];
    return speed * (actionConfig.speedMultiplier ?? 1);
  }

  /* -------------------------------------------- */

  /** @override */
  _getShiftedPosition(dx, dy, dz) {
    if ( !canvas.scene.useMicrogrid ) return super._getShiftedPosition(dx, dy, dz);
    const initial = {...this.getSnappedPosition(), elevation: this.document.elevation};
    const offset = canvas.grid.getOffset(initial);
    const size = this.actor?.size || this.width;
    offset.i += (size * Math.sign(dy));
    offset.j += (size * Math.sign(dx));
    offset.k += (size * Math.sign(dz));
    return canvas.grid.getTopLeftPoint(offset);
  }

  /* -------------------------------------------- */
  /*  Engagement and Flanking                     */
  /* -------------------------------------------- */

  /**
   * Compute the rectangular area which represents a "hit" against this Token.
   * @returns {Rectangle}
   */
  getHitRectangle() {
    const s = canvas.scene.dimensions.size;
    return this.bounds.pad(-s/4);
  }

  /* -------------------------------------------- */

  /**
   * Compute the rectangular area of engagement for the token on a square grid.
   * @param {number} distance
   * @returns {Rectangle}
   */
  getEngagementRectangle(distance=1) {
    const s = canvas.scene.dimensions.size * distance;
    const p0 = canvas.grid.getTopLeftPoint(this.document._source); // Non-animated?
    const {w, h} = this;
    return new PIXI.Rectangle(p0.x - s, p0.y - s, w + (2 * s), h + (2 * s));
  }

  /* -------------------------------------------- */

  /**
   * Compute the current engagement of a Token.
   * This does not update Flanking stage, which is handled later by CrucibleTokenObject.computeFlanking.
   * @returns {CrucibleTokenEngagement}
   */
  #computeEngagement() {
    const enemies = new Set();
    const allies = new Set();
    const other = new Set();
    if ( !canvas.scene.useMicrogrid || !this.actor || this.isPreview ) {
      return {allies, enemies, other};
    }

    // Prepare engagement data
    const {ally, enemy} = this.#getDispositions();
    const value = this.actor.system.movement.engagement;
    const {engagementBounds, movePolygon} = this.#computeEngagementSquareGrid();
    const engagement = {allies, enemies, other, engagementBounds, movePolygon, value};

    // Identify engaged tokens as allies or enemies
    const {elevation, size} = this.document;
    canvas.tokens.quadtree.getObjects(engagementBounds, {
      collisionTest: ({t: token}) => {
        if ( token.id === this.id ) return false; // Ignore yourself
        if ( !token.actor ) return false;         // Ignore non-actors

        // Require elevation overlap
        if ( (elevation + size) < token.document.elevation ) return false;
        if ( elevation > (token.document.elevation + token.document.size) ) return false;

        // Confirm the token can be reached
        const hit = token.getHitRectangle();
        const ix = movePolygon.intersectRectangle(hit); // TODO do something more efficient in the future
        if ( !ix.points.length ) return false;

        // Identify friend and foe
        if ( ally.includes(token.document.disposition) ) allies.add(token);
        else if ( enemy.includes(token.document.disposition) ) enemies.add(token);
        else other.add(token);
      }
    });
    return engagement;
  }

  /* -------------------------------------------- */

  #initializeEngagement() {
    return {allies: new Set(), enemies: new Set(), other: new Set()};
  }

  /* -------------------------------------------- */

  /**
   * Process engagement updates applying them symmetrically to other affected tokens.
   * @param {CrucibleTokenEngagement} oldEngagement   Prior engagement for this Token
   * @param {CrucibleTokenEngagement} newEngagement   New engagement for this Token
   * @returns {Set<CrucibleTokenObject>}              The set of Tokens whose flanking status changed
   */
  #propagateEngagementUpdates(oldEngagement, newEngagement) {
    const updates = new Set();
    for ( const s of ["allies", "enemies", "other"] ) {
      for ( const t of oldEngagement[s] ) {
        updates.add(t);
        t.engagement[s].delete(this);
      }
      for ( const t of newEngagement[s] ) {
        updates.add(t);
        t.engagement[s].add(this);
      }
    }
    return updates;
  }

  /* -------------------------------------------- */

  /**
   * Compute the bounds and eligible polygon for flanking on a square grid.
   * @returns {{engagementBounds: PIXI.Rectangle, movePolygon: PointSourcePolygon}}
   */
  #computeEngagementSquareGrid() {
    const c = this.center;
    const engagementBounds = this.getEngagementRectangle();
    const movePolygon = foundry.canvas.geometry.ClockwiseSweepPolygon.create(c, {
      type: "move",
      boundaryShapes: [engagementBounds]
    });
    return {engagementBounds, movePolygon};
  }

  /* -------------------------------------------- */

  /**
   * Classify Token dispositions into allied and enemy groups.
   * @returns {{ally: number[], enemy: number[]}}
   */
  #getDispositions() {
    const D = CONST.TOKEN_DISPOSITIONS;
    switch ( this.document.disposition ) {
      case D.SECRET:
        return {ally: [], enemy: []}
      case D.HOSTILE:
        return {ally: [D.HOSTILE], enemy: [D.NEUTRAL, D.FRIENDLY]}
      case D.NEUTRAL:
        return {ally: [D.NEUTRAL, D.FRIENDLY], enemy: [D.HOSTILE]}
      case D.FRIENDLY:
        return {ally: [D.NEUTRAL, D.FRIENDLY], enemy: [D.HOSTILE]}
    }
  }

  /* -------------------------------------------- */

  /**
   * Set the render flag to schedule a flanking refresh.
   */
  refreshFlanking(commit) {
    const activeGM = game.users.activeGM;
    commit ??= (activeGM === game.user) && (activeGM?.viewedScene === canvas.id);
    if ( commit ) this.#commitFlanking = true;
    this.renderFlags.set({refreshFlanking: true});
  }

  /* -------------------------------------------- */

  /**
   * Update flanking conditions for all actors affected by a Token change.
   */
  #updateFlanking() {
    if ( !this.actor || (this.actor.type === "group") ) return;

    // Step 1: Update engagement of this token
    const engagement = this.#computeEngagement();

    // Step 2: Update engagement of all engaged tokens
    const toUpdate = this.#propagateEngagementUpdates(this.engagement, engagement);

    // Step 3: Compute flanking of this token
    this.engagement = this.constructor.computeFlanking(engagement);

    // Step 4: Compute flanking stage of all engaged tokens
    for ( const t of toUpdate ) t.engagement = this.constructor.computeFlanking(t.engagement);

    // Debug visualize enemies
    this._visualizeEngagement(engagement);

    // Update other Actors
    if ( !this.#commitFlanking ) return;
    this.#commitFlanking = false;
    for ( const token of toUpdate ) {
      token.actor.commitFlanking(token.engagement);
    }

    // Update our own actor
    this.actor.commitFlanking(this.engagement);
  }

  /* -------------------------------------------- */

  /**
   * Compute the Flanked stage for a certain engagement state.
   * @param {CrucibleTokenEngagement} engagement      The current engagement
   * @returns {CrucibleTokenEngagement}               Updated engagement with computed flanking stage
   */
  static computeFlanking(engagement) {
    engagement.allyBonus = 0;

    // Count the number of enemies who can flank
    let flankers = 0;
    for ( const enemy of engagement.enemies ) {
      const {isBroken, isIncapacitated} = enemy.actor.system;
      if ( !(isBroken || isIncapacitated) ) flankers++;
    }
    engagement.flankers = flankers;

    // Determine the engagement bonus received from allies
    for ( const ally of engagement.allies ) {
      const {isBroken, isIncapacitated} = ally.actor.system;
      if ( isBroken || isIncapacitated ) continue;
      const mutual = ally.engagement.enemies.intersection(engagement.enemies);
      if ( !mutual.size ) continue;
      const allyEngage = ally?.actor.system.movement.engagement ?? 1;
      engagement.allyBonus += Math.min(allyEngage, mutual.size);
    }
    engagement.flanked = Math.max(engagement.flankers - engagement.allyBonus - engagement.value, 0);
    return engagement;
  }

  /* -------------------------------------------- */
  /*  Animated Hitbox                             */
  /* -------------------------------------------- */

  /**
   * The set of visible tokens.
   * @type {Set<CrucibleTokenObject>}
   */
  static visibleTokens = new Set();

  /* -------------------------------------------- */

  /**
   * Get the hitbox border color in little endian format
   * @returns {number}
   */
  getHitBoxBorderColor() {
    const colorRaw = this._getBorderColor();
    const cache = this.#hbCache;
    const same = (cache.colorRaw === colorRaw);
    if ( same ) return cache.abgr;

    // Convert disposition color to little endian
    const cr = (colorRaw >>> 0) || 0;
    const rgba = (cr <= 0xFFFFFF ? ((cr << 8) | 0xFF) : cr) >>> 0;

    // Save and return
    cache.abgr = (
      ((rgba & 0x000000FF) << 24) |
      ((rgba & 0x0000FF00) <<  8) |
      ((rgba & 0x00FF0000) >>> 8) |
      ((rgba & 0xFF000000) >>> 24)
    ) >>> 0;
    cache.colorRaw = colorRaw;
    return cache.abgr;
  }

  /* -------------------------------------------- */

  /**
   * Get the hit box data (which is updated lazily if necessary)
   * @returns {{abgr: number, hitboxCenterX: number, hitboxCenterY: number, hitboxHalfWidth: number, hitboxHalfHeight: number,
   * trLocalID: number, trParentID: number, gridSize: number, sizeUnits: number, centerX: number, centerY: number, colorRaw: number}}
   */
  getHitBoxData() {
    const stage = canvas?.stage;
    const grid = canvas?.grid;
    const cache = this.#hbCache;

    // Verify local ID and parent ID to know if the hitbox data must be recomputed
    const trLocalID = this.transform._localID;
    const trParentID = this.transform._parentID;
    const dirty = (trParentID !== cache.trParentID) || (trLocalID !== cache.trLocalID);
    if ( (dirty === false) || !stage || !grid ) return this.#hbCache;

    cache.gridSize = grid.size || 100;
    const s = cache.sizeUnits = this.actor?.system?.movement?.size ?? 4;
    const uneven = (s % 2 > 0);

    const M = CONST.GRID_SNAPPING_MODES;
    const c = !this.animationContexts.size ? canvas.grid.getSnappedPoint(this.center, {
      mode: uneven ? M.CENTER : M.VERTEX,
      resolution: 1
    }) : this.center;

    cache.centerX = c.x;
    cache.centerY = c.y;

    const st = stage.worldTransform;
    const zoomX = stage.scale.x || 1.0;
    const zoomY = stage.scale.y || 1.0;
    const halfWorld = (cache.sizeUnits * cache.gridSize) * 0.5;

    cache.hitboxHalfWidth  = halfWorld * zoomX;
    cache.hitboxHalfHeight = halfWorld * zoomY;
    cache.hitboxCenterX = st.a * cache.centerX + st.c * cache.centerY + st.tx;
    cache.hitboxCenterY = st.b * cache.centerX + st.d * cache.centerY + st.ty;
    cache.trParentID = trParentID;
    cache.trLocalID = trLocalID;

    return cache;
  }

  /* -------------------------------------------- */

  /**
   * To know whether this token has an active hit box state or can have.
   * @returns {boolean}
   */
  hasNoActiveHitBoxState() {
    return this.#hbCache.animationTypes.valueOf() === 0;
  }

  /* -------------------------------------------- */
  /*  Socket Listeners and Handlers               */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _onCreate(data, options, userId) {
    super._onCreate(data, options, userId);
    if ( !canvas.scene.useMicrogrid ) return;
    this.engagement = this.#initializeEngagement(); // "prior" engagement is nobody
    this.refreshFlanking();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onUpdate(data, options, userId) {
    super._onUpdate(data, options, userId);
    if ( !canvas.scene.useMicrogrid ) return;

    // Flanking Updates
    const flankingChange = ["x", "y", "elevation", "width", "height", "disposition", "actorId", "actorLink"].some(k => k in data);
    if ( flankingChange ) this.refreshFlanking();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onDelete(options, userId) {
    super._onDelete(options, userId);
    if ( !canvas.scene.useMicrogrid ) return;
    CrucibleTokenObject.visibleTokens.delete(this);

    // Apply flanking updates
    const activeGM = game.users.activeGM;
    const commit = (activeGM === game.user) && (activeGM?.viewedScene === canvas.id);

    // Remove engagement from the deleted token
    const newEngagement = this.#initializeEngagement(); // "new" engagement is nobody
    const toUpdate = this.#propagateEngagementUpdates(this.engagement, newEngagement);
    this.engagement = this.constructor.computeFlanking(newEngagement);
    for ( const t of toUpdate ) {
      t.engagement = this.constructor.computeFlanking(t.engagement);
      if ( commit ) t.actor.commitFlanking(t.engagement);
    }
  }

  /* -------------------------------------------- */
  /*  Debugging and Visualization                 */
  /* -------------------------------------------- */

  /**
   * Draw the visualization of Token engagement.
   * @param engagement
   * @internal
   */
  _visualizeEngagement(engagement) {
    if ( !CONFIG.debug.flanking || !canvas.scene?.useMicrogrid ) return;
    const PT = foundry.canvas.containers.PreciseText;
    if ( !this.#engagementDebug ) {
      this.#engagementDebug = canvas.controls.debug.addChild(new PIXI.Graphics());

      // Enemies Text
      this.#engagementDebug.enemies = this.#engagementDebug.addChild(new PT("", PT.getTextStyle({fontSize: 20})));
      this.#engagementDebug.enemies.anchor.set(0.5, 1);

      // Engagement Text
      this.#engagementDebug.engagement = this.#engagementDebug.addChild(new PT("", PT.getTextStyle({fontSize: 20})));
      this.#engagementDebug.engagement.anchor.set(0.5, 0);

      // Flanked Text
      this.#engagementDebug.flanked = this.#engagementDebug.addChild(new PT("", PT.getTextStyle({fontSize: 32})));
      this.#engagementDebug.flanked.anchor.set(0.5, 0.5);
    }
    this._clearEngagementVisualization();
    if ( canvas.tokens.controlled.length !== 1 ) return;
    const e = this.#engagementDebug;

    // Movement polygon
    e.beginFill(0x00FFFF, 0.1).lineStyle({width: 3, color: 0x00FFFF, alpha: 1.0}).drawShape(engagement.movePolygon).endFill();

    // Enemy bounds
    e.beginFill(0xFF0000, 0.1).lineStyle({width: 2, color: 0xFF0000, alpha: 1.0});
    for ( const enemy of engagement.enemies ) e.drawShape(enemy.bounds);
    e.endFill();

    // Ally bounds
    e.beginFill(0x00FF00, 0.1).lineStyle({width: 2, color: 0x00FF00, alpha: 1.0});
    for ( const ally of engagement.allies ) e.drawShape(ally.bounds);
    e.endFill();

    // Flanking State
    const {x, y} = this.document._source;
    const {x: cx, y: cy} = this.getCenterPoint({x, y});
    this.#engagementDebug.enemies.text = `${engagement.enemies.size} Enemies`;
    this.#engagementDebug.enemies.position.set(cx, y);
    this.#engagementDebug.enemies.visible = true;
    this.#engagementDebug.engagement.text = `Engagement ${engagement.value + engagement.allyBonus}`;
    this.#engagementDebug.engagement.position.set(cx, y + this.h);
    this.#engagementDebug.engagement.visible = true;
    this.#engagementDebug.flanked.text = `Flanked ${engagement.flanked}`;
    this.#engagementDebug.flanked.position.set(cx, cy);
    this.#engagementDebug.flanked.visible = true;
  }

  /* -------------------------------------------- */

  /**
   * Clear the visualization of Token engagement.
   * @internal
   */
  _clearEngagementVisualization() {
    if ( !this.#engagementDebug ) return;
    this.#engagementDebug.clear();
    this.#engagementDebug.enemies.visible = false;
    this.#engagementDebug.engagement.visible = false;
    this.#engagementDebug.flanked.visible = false;
  }

  /* -------------------------------------------- */

  /**
   * TODO: figure out how to use this
   * @param g
   * @private
   */
  _visualizeOffensiveRange(g) {
    const c = this.center;
    const mhRange = this.actor.equipment.weapons.mainhand?.system.range ?? 1;
    const r = mhRange + Math.floor(this.actor.size / 2);
    const range = new PIXI.Polygon(canvas.grid.getCircle(c, r));
    const offsets = crucible.api.canvas.grid.getTargetAreaOffsets(c, range);
    g.beginFill(0xFF0000, 0.1);
    const s = canvas.dimensions.size;
    for ( const o of offsets ) {
      const {x, y} = canvas.grid.getTopLeftPoint(o);
      g.drawRect(x, y, s, s);
    }
    g.endFill();
  }
}class CrucibleGridLayer extends foundry.canvas.layers.GridLayer {

  /** @override */
  initializeMesh({style, ...options}={}) {
    if ( !canvas.scene.useMicrogrid ) return super.initializeMesh({style, ...options});
    const {shaderClass, shaderOptions} = CONFIG.Canvas.gridStyles[style] ?? {};
    this.mesh.initialize(options);
    const defaultShader = shaderClass === foundry.canvas.rendering.shaders.GridShader;
    this.mesh.setShaderClass(defaultShader ? CrucibleSelectiveGridShader : shaderClass);
    this.mesh.shader.configure(shaderOptions ?? {});
  }

  /* -------------------------------------------- */

  /** @override */
  render(renderer) {
    super.render(renderer);

    // Microgrid activated for this scene?
    if ( !canvas.scene.useMicrogrid || !this.worldVisible || (this.worldAlpha <= 0) ) return;

    // Get the crucible batched shader plugin
    const plugin = renderer?.plugins?.batchCrucibleHitBox;
    if ( !plugin ) return;

    const anyControlled = canvas.tokens.controlled.length > 0;
    const tokens = CrucibleTokenObject.visibleTokens;

    // Start the plugin manually
    plugin.start();

    // Rendering each hit box
    for ( const t of tokens ) {
      const elem = t.mesh;
      if ( !anyControlled && t.hasNoActiveHitBoxState() ) continue;
      if ( !elem || elem.destroyed ) continue;

      // Update the batch data if not present
      if ( !elem._hitBoxBatchData ) {
        elem._hitBoxBatchData = {
          crucibleToken: t,
          blendMode: PIXI.BLEND_MODES.NORMAL,
          worldAlpha: 1,
          _texture: PIXI.Texture.WHITE,
          vertexData: elem._batchData.vertexData,
          indices: elem._batchData.indices,
          uvs: elem._batchData.uvs
        };
      }
      plugin.render(elem._hitBoxBatchData);
    }

    // Flush and clean
    plugin.flush();
    plugin.stop();
  }
}/**
 * Get the grid offsets of an AOE template shape.
 * @param {Point} origin
 * @param {PIXI.Circle|PIXI.Rectangle|PIXI.Polygon} shape
 * @returns {GridOffset[]}
 */
function getTargetAreaOffsets(origin, shape) {
  const originOffset = canvas.grid.getOffset(origin);
  const k0 = (originOffset.i << 16) | originOffset.j;
  if ( !shape.contains(origin.x, origin.y) ) {
    throw new Error("The origin point must be contained within the shape.");
  }
  const offsets = [originOffset];
  const tested = new Set([k0]);

  const quadrants = [[-1,-1], [1,-1], [1,1], [-1, 1]];
  for ( const [si, sj] of quadrants ) {
    for ( let di=0; di<Infinity; di++ ) {
      const i = originOffset.i + (di * si);
      let hit = false;
      for ( let dj=0; dj<Infinity; dj++ ) {
        const j = originOffset.j + (dj * sj);
        const o = {i,j};
        const k = (i << 16) | j;
        if ( tested.has(k) ) {
          hit = true;
          continue;
        }
        tested.add(k);
        const c = canvas.grid.getCenterPoint(o);
        if ( !shape.contains(c.x, c.y) ) break;
        offsets.push(o);
        offsets.push(o);
        hit = true;
      }
      if ( !hit ) break;
    }
  }
  return offsets;
}

/**
 * Test linear range between an attacker and a target.
 * @param {CrucibleTokenObject} attacker
 * @param {CrucibleTokenObject} target
 * @returns {number} The linear distance between attacker and target
 */
function getLinearRangeCost(attacker, target) {
  const ab = attacker.bounds;
  const {elevation: ae, size: as} = attacker.document;
  const tb = target.bounds;
  const {elevation: te, size: ts} = target.document;

  // Overlapping bounds
  if ( ab.overlaps(tb) ) {
    if ( (ae + as) < te ) return te - (ae + as);
    else if ( ae > (te + ts) ) return (te + ts) - ae;
    else return 0;
  }

  // Determine origin and target points of the ray
  const A = {elevation: ae}; // attacker
  const T = {elevation: te}; // target
  if ( ab.bottom < tb.top ) {
    A.y = ab.bottom;
    T.y = tb.top;
  }
  else if ( ab.top > tb.bottom ) {
    A.y = ab.top;
    T.y = tb.bottom;
  }
  else A.y = T.y = (Math.max(ab.top, tb.top) + Math.min(ab.bottom, tb.bottom)) / 2;
  if ( ab.right < tb.left ) {
    A.x = ab.right;
    T.x = tb.left;
  }
  else if ( ab.left > tb.right ) {
    A.x = ab.left;
    T.x = tb.right;
  }
  else A.x = T.x = (Math.max(ab.left, tb.left) + Math.min(ab.right, tb.right)) / 2;

  // Measure distance
  return canvas.grid.measurePath([A, T]).distance;
}var _module$1=/*#__PURE__*/Object.freeze({__proto__:null,CrucibleGridLayer:CrucibleGridLayer,CrucibleHitBoxShader:CrucibleHitBoxShader,CrucibleSelectiveGridShader:CrucibleSelectiveGridShader,getLinearRangeCost:getLinearRangeCost,getTargetAreaOffsets:getTargetAreaOffsets});/**
 * Configure the data for a VFXEffect
 * @param action
 * @returns {{components: {}, name, timeline: *[]}|null}
 */
function configureStrikeVFXEffect(action) {
  if ( !action.tags.has("strike") ) throw new Error(`The Action ${action.id} does not use the strike tag.`);
  const components = {};
  const timeline = [];
  const references = {tokenMesh: "^token.object.mesh"};

  // Prepare each weapon strike
  let j=1; // Target
  for ( const outcome of action.outcomes.values() ) {
    if ( outcome.target === action.actor ) continue;
    const token = outcome.token;
    const targetTokenReference = `outcome_${j}_token`;
    const targetMeshReference = `outcome_${j}_tokenMesh`;
    Object.assign(references, {
      [targetTokenReference]: `@${token.uuid}`,
      [targetMeshReference]: `^${targetTokenReference}.object.mesh`
    });
    let i=1; // Roll
    for ( const roll of outcome.rolls ) {
      const weapon = action.usage.strikes[outcome.rolls[0].data.strike];
      if ( !["projectile1", "projectile2"].includes(weapon?.category) ) continue;

      // Identify impact location
      const impact = configureImpact(outcome, roll, targetMeshReference);

      // Add the arrow projectile
      const projectileName = `arrowProjectile_${j}_${i}`;
      components[projectileName] = {
        type: "singleAttack",
        path: [{reference: "tokenMesh", deltas: {sort: 1}}, impact.position],
        charge: {
          duration: 1000,
          sound: {
            src: "modules/foundryvtt-vfx/assets/sounds/BowAttack1.ogg",
            align: 2
          }
        },
        projectile: {
          texture: "modules/foundryvtt-vfx/assets/arrow/arrow-wood.png",
          size: 3, // feet
          speed: 150 // feet-per-second
        },
        impact: {
          texture: impact.texture,
          duration: 2000,
          sound: impact.sound ? {src: impact.sound, align: 1} : null
        }
      };
      timeline.push({component: projectileName, position: 0});
      i++;
    }
    j++;
  }
  if ( !timeline.length ) return null;

  // Validate that the effect data parses correctly
  let vfxConfig;
  try {
    const effect = new foundry.vfx.VFXEffect({name: action.id, components, timeline});
    vfxConfig = effect.toObject();
    vfxConfig.references = references;
  } catch(cause) {
    console.error(new Error(`Strike VFX configuration failed for Action "${this.id}"`, {cause}));
  }
  return vfxConfig;
}

/* -------------------------------------------- */

/**
 * Get a referenced impact position for a target Token and a given AttackRoll.
 * @param {CrucibleActionOutcome} outcome
 * @param {AttackRoll} roll
 * @param {string} targetMeshReference
 * @returns {{position: {reference: string, deltas: Record<string, number>}, sound: string|null, texture: string|null}}
 * @internal
 */
function configureImpact(outcome, roll, targetMeshReference) {
  const position = {reference: targetMeshReference, deltas: {sort: 1}};
  let sound = null;
  let texture = null;
  const w = outcome.token.width * canvas.dimensions.size;
  const h = outcome.token.height * canvas.dimensions.size;
  const T = crucible.api.dice.AttackRoll.RESULT_TYPES;
  const randomEntry = arr => arr[Math.floor(Math.random() * arr.length)];

  // Customize the impact depending on the roll result
  let hitRange;
  switch ( roll.data.result ) {
    case T.HIT:
      hitRange = [0, 0.1];
      sound = `modules/foundryvtt-vfx/assets/sounds/${randomEntry(ATTACK_SOUNDS.projectile.hit)}`;
      texture = "modules/foundryvtt-vfx/assets/impact/BloodSplatter1.png";
      break;
    case T.ARMOR:
    case T.BLOCK:
      hitRange = [0, 0.25];
      sound = `modules/foundryvtt-vfx/assets/sounds/${randomEntry(ATTACK_SOUNDS.projectile.block)}`;
      break;
    case T.GLANCE:
      hitRange = [0.25, 0.5];
      sound = `modules/foundryvtt-vfx/assets/sounds/${randomEntry(ATTACK_SOUNDS.projectile.hit)}`;
      texture = "modules/foundryvtt-vfx/assets/impact/BloodSplatter1.png";
      break;
    case T.PARRY:
      hitRange = [0.25, 0.5];
      sound = `modules/foundryvtt-vfx/assets/sounds/${randomEntry(ATTACK_SOUNDS.projectile.block)}`;
      break;
    case T.DODGE:
    case T.MISS:
      hitRange = [0.5, 1.0];
      break;
  }

  // Determine position based on hit range
  position.deltas.x = Math.mix(w * hitRange[0], w * hitRange[1], Math.random()) * (Math.random() > 0.5 ? 1 : -1);
  position.deltas.y = Math.mix(h * hitRange[0], h * hitRange[1], Math.random()) * (Math.random() > 0.5 ? 1 : -1);
  return {position, sound, texture};
}

/* -------------------------------------------- */

const ATTACK_SOUNDS = {
  projectile: {
    block: ["ArrowBlock1.wav", "ArrowBlock2.wav", "ArrowBlock3.wav"],
    hit: ["ArrowHit1.wav", "ArrowHit2.wav", "ArrowHit3.wav", "ArrowHit4.wav"]}
};var strikes=/*#__PURE__*/Object.freeze({__proto__:null,configureStrikeVFXEffect:configureStrikeVFXEffect});var _module=/*#__PURE__*/Object.freeze({__proto__:null,strikes:strikes});function configure() {
  CONFIG.Token.rulerClass = CrucibleTokenRuler;
  CONFIG.Token.hudClass = CrucibleTokenHUD;
  CONFIG.Token.movement.defaultSpeed = 20;

  // Movement Actions
  const coreActions = CONFIG.Token.movement.actions;
  const walkTerrain = ({walk}) => walk;
  const noTerrain = () => 1;
  const groupOnly = token => token.actor?.type === "group";
  const notGroup = token => token.actor?.type !== "group";
  CONFIG.Token.movement.actions = {
    walk: {
      order: 0,
      label: coreActions.walk.label,
      icon: coreActions.walk.icon,
      img: coreActions.walk.img,
      costMultiplier: 1,
      speedMultiplier: 1,
      canSelect: notGroup
    },
    step: {
      order: 1,
      label: "TOKEN.MOVEMENT.ACTIONS.step.label",
      icon: "fa-solid fa-diamond-exclamation",
      img: "icons/svg/hazard.svg",
      costMultiplier: 2,
      speedMultiplier: 0.5,
      deriveTerrainDifficulty: walkTerrain,
      canSelect: notGroup
    },
    crawl: {
      order: 2,
      label: coreActions.crawl.label,
      icon: coreActions.crawl.icon,
      img: coreActions.crawl.img,
      costMultiplier: 2,
      speedMultiplier: 0.25,
      deriveTerrainDifficulty: walkTerrain,
      canSelect: notGroup
    },
    jump: {
      order: 3,
      label: coreActions.jump.label,
      icon: coreActions.jump.icon,
      img: coreActions.jump.img,
      costMultiplier: 2,
      speedMultiplier: 1.5,
      deriveTerrainDifficulty: ({walk, fly}) => Math.max(walk, fly),
      canSelect: notGroup
    },
    climb: {
      order: 4,
      label: coreActions.climb.label,
      icon: coreActions.climb.icon,
      img: coreActions.climb.img,
      costMultiplier: 2,
      speedMultiplier: 0.25,
      deriveTerrainDifficulty: walkTerrain,
      canSelect: notGroup
    },
    swim: {
      order: 5,
      label: coreActions.swim.label,
      icon: coreActions.swim.icon,
      img: coreActions.swim.img,
      costMultiplier: 2,
      speedMultiplier: 0.5,
      canSelect: notGroup
    },
    fly: {
      order: 6,
      label: coreActions.fly.label,
      icon: coreActions.fly.icon,
      img: coreActions.fly.img,
      speedMultiplier: 1.5,
      canSelect: notGroup
    },
    blink: {
      order: 7,
      label: coreActions.blink.label,
      icon: coreActions.blink.icon,
      img: coreActions.blink.img,
      teleport: true,
      speedMultiplier: Infinity,
      deriveTerrainDifficulty: noTerrain,
      canSelect: notGroup
    },

    displace: {
      order: 999,
      label: coreActions.displace.label,
      icon: coreActions.displace.icon,
      img: coreActions.displace.img,
      teleport: true,
      measure: false,
      walls: null,
      visualize: false,
      costMultiplier: 0,
      speedMultiplier: Infinity,
      canSelect: () => false,
      deriveTerrainDifficulty: noTerrain
    }
  };

  // Add party travel options
  for ( const [id, cfg] of Object.entries(TRAVEL_PACES) ) {
    CONFIG.Token.movement.actions[id] = {...cfg, canSelect: groupOnly};
  }
}var canvas$1=/*#__PURE__*/Object.freeze({__proto__:null,CrucibleTokenObject:CrucibleTokenObject,CrucibleTokenRuler:CrucibleTokenRuler,configure:configure,grid:_module$1,tree:_module$2,vfx:_module});/**
 * A special case of StandardCheck used specifically for initiative rolls.
 */
class InitiativeCheck extends StandardCheck {

  /**
   * Define the default data attributes for this type of Roll
   * @type {object}
   */
  static defaultData = {...super.defaultData,
    incapacitated: false,
    unaware: false,
    type: "initiative"
  };

  /* -------------------------------------------- */

  /** @override */
  static parse(_formula, data) {
    if ( data.incapacitated ) return foundry.dice.Roll.parse("0", data);
    else if ( data.unaware ) return foundry.dice.Roll.parse("1", data);
    return super.parse(_formula, data);
  }
}class PassiveCheck extends StandardCheck {

  /** @override */
  static parse(_, data) {
    const base = SYSTEM.PASSIVE_BASE + (data.totalBoons || 0) - (data.totalBanes || 0);
    const terms = [base, data.ability, data.skill];
    if ( data.enchantment > 0 ) terms.push(data.enchantment);
    const formula = terms.join(" + ");
    return foundry.dice.Roll.parse(formula, data);
  }
}/**
 * Prompt the user to configure a spell they wish to cast.
 */
class SpellCastDialog extends ActionUseDialog {

  /** @override */
  static TEMPLATE = "systems/crucible/templates/dice/spell-cast-dialog.hbs";

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const spell = this.action;
    const actor = spell.actor;

    // Spellcraft Components
    const runes = Array.from(actor.grimoire.runes);
    runes.sort((a, b) => a.name.localeCompare(b.name));
    const gestures = Array.from(actor.grimoire.gestures);
    gestures.sort((a, b) => a.name.localeCompare(b.name));
    const inflections = Array.from(actor.grimoire.inflections);
    inflections.sort((a, b) => a.name.localeCompare(b.name));

    // Scaling
    const ability = actor.getAbilityBonus([...spell.scaling]);

    // Merge context
    return foundry.utils.mergeObject(context, {
      ability, runes, gestures, inflections,
      chooseDamageType: spell.rune.damageType === "physical",
      damageTypes: {
        bludgeoning: SYSTEM.DAMAGE_TYPES.bludgeoning.label,
        piercing: SYSTEM.DAMAGE_TYPES.piercing.label,
        slashing: SYSTEM.DAMAGE_TYPES.slashing.label,
      }
    });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onChangeForm(formConfig, event) {
    super._onChangeForm(formConfig, event);
    if ( ["rune", "gesture", "inflection"].includes(event.target.name) ) {
      this.action.updateSource({[event.target.name]: event.target.value});
      this._clearTargetTemplate();
      this.render({window: {title: this.title}});
    }
  }

  /* -------------------------------------------- */

  /** @override */
  _onRoll(event, button, dialog) {
    const form = event.target;
    const {rune, gesture, inflection, damageType} = (new FormDataExtended(form)).object;
    const composition = this.action.constructor.COMPOSITION_STATES.COMPOSED;
    this.action.updateSource({composition, rune, gesture, inflection, damageType});
    return super._onRoll(event, button, dialog);
  }
}var dice=/*#__PURE__*/Object.freeze({__proto__:null,ActionUseDialog:ActionUseDialog,AttackRoll:AttackRoll,InitiativeCheck:InitiativeCheck,PassiveCheck:PassiveCheck,SpellCastDialog:SpellCastDialog,StandardCheck:StandardCheck,StandardCheckDialog:StandardCheckDialog});/**
 * Data and functionality that represents a Spell in the Crucible spellcraft system.
 *
 * @property {CrucibleSpellcraftRune} rune
 * @property {CrucibleSpellcraftGesture} gesture
 * @property {CrucibleSpellcraftInflection} inflection
 * @property {number} composition
 * @property {string} damageType
 */
class CrucibleSpellAction extends CrucibleAction {
  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();
    schema.rune = new fields.StringField({required: true, choices: SYSTEM.SPELL.RUNES});
    schema.gesture = new fields.StringField({required: true, choices: SYSTEM.SPELL.GESTURES});
    schema.inflection = new fields.StringField({required: false, choices: SYSTEM.SPELL.INFLECTIONS});
    schema.composition = new fields.NumberField({choices: Object.values(this.COMPOSITION_STATES)});
    schema.damageType = new fields.StringField({required: false, choices: SYSTEM.DAMAGE_TYPES, initial: undefined});
    return schema;
  }

  /**
   * Spell composition states.
   * @enum {number}
   */
  static COMPOSITION_STATES = {
    NONE: 0,
    COMPOSING: 1,
    COMPOSED: 2
  }

  /** @override */
  static dialogClass = SpellCastDialog;


  /* -------------------------------------------- */
  /*  Action Lifecycle                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  * _tests() {
    if ( this.rune.hooks ) yield this.rune.hooks;
    if ( this.gesture.hooks ) yield this.gesture.hooks;
    if ( this.inflection?.hooks ) yield this.inflection.hooks;
    yield* super._tests();
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _initializeSource(data, options) {
    data = super._initializeSource(data, options);
    data.id = this.getSpellId(data);
    return data;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  updateSource(changes, options) {
    if ( ("rune" in changes) || ("gesture" in changes) || ("inflection" in changes) ) {
      changes.id = this.getSpellId(changes);
    }
    return super.updateSource(changes, options);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _prepareData() {
    super._prepareData();

    // Spell Composition
    this.rune = SYSTEM.SPELL.RUNES[this.rune];
    this.gesture = SYSTEM.SPELL.GESTURES[this.gesture];
    this.inflection = SYSTEM.SPELL.INFLECTIONS[this.inflection];

    // Composed Spell
    if ( this.composition >= CrucibleSpellAction.COMPOSITION_STATES.COMPOSING ) {
      this.nameFormat = this.gesture.nameFormat ?? this.rune.nameFormat;
      this.name = CrucibleSpellAction.#getName(this);
      this.img = this.rune.img;
      this.description = "Weave arcana to create a work of spellcraft."; // TODO make dynamic
    }

    // Derived Spell Attributes
    this.scaling = new Set([this.rune.scaling, this.gesture.scaling]);
    this.cost = CrucibleSpellAction.#prepareCost.call(this);
    this.defense = CrucibleSpellAction.#prepareDefense.call(this);
    this.damage = CrucibleSpellAction.#prepareDamage.call(this);
    this.target = {...this.gesture.target};
    this.range = this.gesture.range;
  }

  /* -------------------------------------------- */

  /**
   * Create the unique identifier that represents this spell as a combination of rune, gesture, and inflection.
   * @param rune
   * @param gesture
   * @param inflection
   * @returns {*}
   */
  getSpellId({rune, gesture, inflection}={}) {
    rune ??= (this.rune?.id || "none");
    gesture ??= (this.gesture?.id || "none");
    inflection ??= (this.inflection?.id || "none");
    return ["spell", rune, gesture, inflection].filterJoin(".");
  }

  /* -------------------------------------------- */

  /**
   * Prepare the cost for the spell from its components.
   * @this {CrucibleSpellAction}  The spell being prepared
   * @returns {ActionCost}        Configured cost data
   */
  static #prepareCost() {
    const cost = {...this.gesture.cost};
    cost.hands = this.gesture.hands;
    if ( this.inflection ) {
      cost.action += this.inflection.cost.action;
      cost.focus += this.inflection.cost.focus;
    }
    return cost;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the defense against which this spell is tested.
   * @this {CrucibleSpellAction}  The spell being prepared
   * @returns {string}            The defense to test
   */
  static #prepareDefense() {
    if ( this.rune.restoration ) return {
      health: "wounds",
      wounds: "wounds",
      morale: "madness",
      madness: "madness"
    }[this.rune.resource];
    else return this.rune.defense;
  }

  /* -------------------------------------------- */

  /**
   * Prepare damage information for the spell from its components.
   * @this {CrucibleSpellAction}  The spell being prepared
   * @returns {DamageData}        Prepared damage data
   */
  static #prepareDamage() {
    return {
      base: this.gesture.damage.base ?? 0,
      bonus: this.gesture.damage.bonus ?? 0,
      multiplier: 1,
      type: this.damageType ?? this.rune.damageType,
      restoration: this.rune.restoration
    };
  }

  /* -------------------------------------------- */

  /**
   * Prepare a default name for the spell if a custom name has not been designated.
   * @type {string}
   */
  static #getName({rune, gesture, inflection, nameFormat}={}) {
    let name = "";
    switch ( nameFormat ) {
      case SYSTEM.SPELL.NAME_FORMATS.NOUN:
        name = game.i18n.format("SPELL.NameFormatNoun", {rune, gesture});
        break;
      case SYSTEM.SPELL.NAME_FORMATS.ADJ:
        name = game.i18n.format("SPELL.NameFormatAdj", {rune: rune.adjective, gesture});
        break;
    }
    if ( inflection ) name = `${inflection.adjective} ${name}`;
    return name;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _prepare() {
    CrucibleSpellAction.#prepareGesture.call(this);
    super._prepare();

    // Add Weapon cost
    if ( this.cost.weapon ) {
      const w = this.actor.equipment.weapons.mainhand;
      this.cost.action += (w?.system.actionCost || 0);
    }

    // Zero cost for un-composed spells
    this._trueCost = {...this.cost};
    if ( this.composition !== CrucibleSpellAction.COMPOSITION_STATES.COMPOSED ) {
      this.cost.action = this.cost.focus = this.cost.health = 0;
    }
  }

  /* -------------------------------------------- */

  /**
   * Customize the spell based on the Gesture used.
   * TODO I think this should be handled as a `prepare` hook on the gesture config itself?
   * @this {CrucibleSpellAction}
   */
  static #prepareGesture() {
    const e = this.actor.equipment;
    const mh = e.weapons.mainhand;
    const t = this.actor.talentIds;
    this.usage.hasDice = true; // Spells involve dice rolls by default
    switch ( this.gesture.id ) {

      /* -------------------------------------------- */
      /*  Gesture: Create                             */
      /* -------------------------------------------- */
      case "create":
        this.tags.add("summon");
        this.usage.hasDice = false;

        // Configure summon active effect
        let effectId = SYSTEM.EFFECTS.getEffectId("create");
        if ( t.has("conjurer00000000") ) { // TODO move this to conjurer talent
          const effectIds = ["conjurercreate1", "conjurercreate2", "conjurercreate3"].map(id => SYSTEM.EFFECTS.getEffectId(id));
          effectId = effectIds.find(id => !this.actor.effects.has(id)) || effectIds[0];
        }
        this.effects.push({_id: effectId, icon: this.img, duration: {rounds: 6}});

        // Configure summon data
        const summonUUIDs = SYSTEM.SPELL.CREATION_SUMMONS;
        const actorUuid = summonUUIDs[this.rune.id] || summonUUIDs.fallback;
        const tokenData = {
          delta: {
            system: {
              details: {
                level: Math.ceil(this.actor.system.advancement.threatLevel / 2),
                rank: "minion"
              }
            }
          }
        };
        this.usage.summons = [{actorUuid, tokenData, effectId}];
        break;

      /* -------------------------------------------- */
      /*  Gesture: Strike                             */
      /* -------------------------------------------- */
      case "strike":
        this.scaling = new Set(mh.config.category.scaling.split("."));
        this.damage.base = mh.system.damage.base;
        break;

      /* -------------------------------------------- */
      /*  Gesture: Ward                               */
      /* -------------------------------------------- */
      case "ward":
        this.usage.hasDice = false;

        // TODO: Enable healing wards
        if ( this.damage.healing ) {
          ui.notifications.warning("Gesture: Ward is not configured for healing Runes yet");
          break;
        }

        // Shield Ward
        if ( t.has("shieldward000000") && e.weapons.shield ) this.cost.hands = 0;

        // Configure Ward effect
        let resistance = this.gesture.damage.base;
        if ( this.actor.talentIds.has("runewarden000000") ) {
          resistance += Math.ceil(this.actor.abilities.wisdom.value / 2);
        }
        this.effects.push({
          _id: SYSTEM.EFFECTS.getEffectId("ward"),
          icon: this.gesture.img,
          duration: {rounds: 1},
          origin: this.actor.uuid,
          changes: [
            {
              key: `system.resistances.${this.damage.type}.bonus`,
              value: resistance,
              mode: CONST.ACTIVE_EFFECT_MODES.ADD
            }
          ]
        });
        break;

      /* -------------------------------------------- */
      /*  Gesture: Aspect                             */
      /* -------------------------------------------- */
      case "aspect":
        // TODO
        if ( this.damage.healing ) {
          ui.notifications.warning("Gesture: Aspect is not configured for healing Runes yet");
          break;
        }
        this.effects.push({
          _id: SYSTEM.EFFECTS.getEffectId("aspect"),
          icon: this.gesture.img,
          duration: {rounds: 6},
          origin: this.actor.uuid,
          changes: [
            {
              key: `system.resistances.${this.damage.type}.bonus`,
              value: 2,
              mode: CONST.ACTIVE_EFFECT_MODES.ADD
            },
            {
              key: `system.rollBonuses.damage.${this.damage.type}`,
              value: 2,
              mode: CONST.ACTIVE_EFFECT_MODES.ADD
            }
          ]
        });
        this.usage.hasDice = false;
        break;
    }
  }

  /* -------------------------------------------- */
  /*  Action Execution Methods                    */
  /* -------------------------------------------- */

  /** @inheritDoc */
  acquireTargets(options={}) {
    if ( this.composition === CrucibleSpellAction.COMPOSITION_STATES.COMPOSING ) options.strict = false;
    return super.acquireTargets(options);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  clone(updateData={}, context) {
    if ( !this.composition ) updateData.composition = CrucibleSpellAction.COMPOSITION_STATES.COMPOSING;
    return super.clone(updateData, context);
  }

  /* -------------------------------------------- */

  /**
   * Prepare the default Cast Spell action, populated with the most recently cast spell components.
   * @param {CrucibleActor} actor       The Actor for whom the spell is being prepared
   * @param {object} spellData          Initial data for the spell
   * @returns {CrucibleSpellAction}     The constructed CrucibleSpellAction
   */
  static getDefault(actor, spellData={}) {

    // Repeat Last Spell
    const lastSpell = actor.flags.crucible?.lastSpell;
    if ( lastSpell ) {
      try {
        const last = this.fromId(lastSpell, {actor});
        last._canUse([]);
        return last;
      } catch(err) {
        console.warn(err);
      }
    }

    // Cast New Spell
    const {runes, gestures} = actor.grimoire;
    const rune = runes.first()?.id;
    const gesture = gestures.first()?.id;
    Object.assign(spellData, {
      rune,
      gesture,
      inflection: undefined,
      composition: this.COMPOSITION_STATES.NONE,
      tags: ["spell"]
    });
    return new this(spellData, {actor});
  }

  /* -------------------------------------------- */

  /**
   * Obtain a Spell instance corresponding to a provided spell ID
   * @param {string} spellId          The provided spell ID in the format spell.{rune}.{gesture}.{inflection}
   * @param {object} [context]        Context data applied to the created spell
   * @returns {CrucibleSpellAction}   The constructed spell instance
   */
  static fromId(spellId, context={}) {
    const [spell, rune, gesture, inflection] = spellId.split(".").map(p => p === "none" ? "" : p);
    if ( spell !== "spell" ) throw new Error(`Invalid Spell ID: "${spellId}"`);
    return new this({
      id: spellId,
      rune,
      gesture,
      inflection,
      composition: this.COMPOSITION_STATES.COMPOSED,
      tags: ["spell"]
    }, context);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async configure(targets) {
    const result = await super.configure(targets);
    this.updateSource({composition: CrucibleSpellAction.COMPOSITION_STATES.COMPOSED});
    return result;
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  getTags() {
    const tags = super.getTags();

    // Variable Cost
    if ( this.composition === CrucibleSpellAction.COMPOSITION_STATES.NONE ) {
      if ( tags.activation.ap ) tags.activation.ap += "+";
      if ( tags.activation.fp ) tags.activation.fp += "+";
      if ( tags.activation.hp ) tags.activation.hp += "+";
    }

    delete tags.action.spell;
    tags.action.scaling = Array.from(this.scaling).map(a => SYSTEM.ABILITIES[a].label).join("/");
    if ( this.damage.healing ) tags.action.healing = "Healing";
    else tags.action.defense = SYSTEM.DEFENSES[this.defense].label;
    tags.action.resource = SYSTEM.RESOURCES[this.rune.resource].label;
    return tags;
  }
}const {DialogV2} = foundry.applications.api;

/**
 * @import {TRAINING_TYPES} from "../config/talents.mjs";
 */

/**
 * @typedef {Object}   ActorRoundStatus
 * @property {boolean} hasMoved
 * @property {boolean} hasAttacked
 * @property {boolean} wasAttacked
 */

/**
 * The Actor document subclass in the Crucible system which extends the behavior of the base Actor class.
 */
class CrucibleActor extends Actor {
  constructor(...args) {
    super(...args);
    this.#updateCachedResources();
  }

  /**
   * The Actions which this Actor has available to use.
   */
  get actions() {
    return this.system.actions;
  }

  /**
   * The ancestry of the Actor.
   * @returns {*}
   */
  get ancestry() {
    return this.system.details.ancestry;
  }

  /**
   * The prepared object of actor attributes
   * @type {object}
   */
  get abilities() {
    return this.system.abilities;
  }

  /**
   * The background of the Actor.
   * @returns {*}
   */
  get background() {
    return this.system.details.background;
  }

  /**
   * If this Actor has a singular Combatant in the current Combat encounter, return it.
   * @type {Combatant|null}
   */
  get combatant() {
    const combatants = game.combat?.getCombatantsByActor(this);
    return combatants.length === 1 ? combatants[0] : null;
  }

  /**
   * The prepared object of actor defenses
   * @type {object}
   */
  get defenses() {
    return this.system.defenses;
  }

  /**
   * Current equipment state for the Actor.
   */
  get equipment() {
    return this.system.equipment;
  }

  /**
   * Known spells and spellcraft components for the Actor.
   */
  get grimoire() {
    return this.system.grimoire;
  }

  /**
   * Actor resources.
   * @returns {Record<string, {value: number, max: number}>}
   */
  get resources() {
    return this.system.resources;
  }

  /** @inheritDoc */
  get inCombat() {
    return super.inCombat && game.combat.started;
  }

  /**
   * Is this actor currently "level zero"
   * @returns {boolean}
   */
  get isL0() {
    return this.system.advancement.level === 0;
  }

  /**
   * Is this Actor incapacitated and unable to act?
   * @type {boolean}
   */
  get isIncapacitated() {
    return this.system.isIncapacitated;
  }

  /**
   * A convenience reference to the Actor level.
   * @type {number}
   */
  get level() {
    return this.system.advancement.level;
  }

  /**
   * Adjusted threat level of this Actor.
   * @type {number}
   */
  get threat() {
    return this.system.advancement.threat;
  }


  get points() {
    return this.system.points;
  }

  /**
   * The prepared object of actor resistances
   * @returns {object}
   */
  get resistances() {
    return this.system.resistances;
  }

  /**
   * The prepared object of actor skills
   * @returns {object}
   */
  get skills() {
    return this.system.skills;
  }

  /**
   * A convenience reference to the size of the Actor.
   * @type {number}
   */
  get size() {
    return this.system.movement.size;
  }

  /**
   * The prepared object of actor status data
   * @returns {ActorRoundStatus}
   */
  get status() {
    return this.system.status;
  }

  /**
   * The IDs of purchased talents.
   * A convenience reference to CrucibleBaseActor#talentIds
   */
  get talentIds() {
    return this.system.talentIds;
  }

  /**
   * The tracked action history for this Actor.
   * The array is ordered with most-recent first.
   * @returns {CrucibleActionHistoryEntry[]}
   */
  get actionHistory() {
    return this.flags.crucible?.actionHistory || [];
  }

  /**
   * The last confirmed action used by this Actor.
   * @type {CrucibleAction|null}
   */
  get lastConfirmedAction() {
    const history = this.flags.crucible?.actionHistory || [];
    for ( const record of history ) {
      const message = game.messages.get(record.messageId);
      if ( !message ) continue;
      const {action, confirmed} = message.flags.crucible;
      if ( action && confirmed ) {
        if ( this.#lastConfirmedAction.messageId !== message.id ) {
          this.#lastConfirmedAction.messageId = message.id;
          this.#lastConfirmedAction
           = {messageId: message.id, action: CrucibleAction.fromChatMessage(message)};
        }
        return this.#lastConfirmedAction.action;
      }
    }
    return null;
  }

  #lastConfirmedAction = {messageId: null, action: null};

  /**
   * Track any groups that this Actor belongs to.
   * This is populated during data preparation of group actors.
   * @type {Set<CrucibleActor>}
   * @internal
   */
  _groups = new Set();

  /**
   * Prior resource values that can be used to establish diffs.
   * This is stored on the Actor because the system data object is reconstructed each time preparation occurs.
   * @type {Record<string, number|boolean>}
   * @internal
   */
  _cachedResources = {};

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritdoc */
  applyActiveEffects() {
    // Before applying active effects, apply data based on prepared embedded Item documents
    const items = this.itemTypes;
    this.system.prepareItems(items);
    super.applyActiveEffects();
  };

  /* -------------------------------------------- */
  /*  Talent Hooks                                */
  /* -------------------------------------------- */

  /**
   * Call all actor hooks registered for a certain event name.
   * Each registered function is called in sequence.
   * @param {string} hook     The hook name to call.
   * @param {...*} args       Arguments passed to the hooked function
   */
  callActorHooks(hook, ...args) {
    const hookConfig = SYSTEM.ACTOR.HOOKS[hook];
    if ( !hookConfig ) throw new Error(`Invalid Actor hook function "${hook}"`);
    const hooks = this.system.actorHooks[hook] ||= [];
    for ( const {item, fn} of hooks ) {
      if ( CONFIG.debug.crucibleHooks ) console.debug(`Calling ${hook} hook for Item ${item.name}`);
      try {
        fn.call(this, item, ...args);
      } catch(err) {
        const msg = `The "${hook}" hook defined by Item "${item.uuid}" failed evaluation in Actor [${this.id}]`;
        console.error(msg, err);
      }
    }
  }

  /* -------------------------------------------- */
  /*  Dice Rolling Methods                        */
  /* -------------------------------------------- */

  /**
   * Compute the ability score bonus for a given scaling mode.
   * @param {string[]} scaling    How is the ability bonus computed?
   * @returns {number}            The ability bonus
   */
  getAbilityBonus(scaling) {
    const abilities = this.system.abilities;
    return Math.round(scaling.reduce((x, t) => x + abilities[t].value, 0) / (scaling.length * 2));
  }

  /* -------------------------------------------- */

  /**
   * Configure a standard set of boons and banes conditional on the actor of an Action.
   * @param {CrucibleAction} action
   * @param {CrucibleActionOutcome} outcome
   * @internal
   */
  _configureActorOutcome(action, outcome) {
    const {boons, banes} = outcome.usage;
    const {isAttack=false} = action.usage;

    // Global conditions
    if ( this.statuses.has("broken") ) banes.broken = {label: "Broken", number: 2};

    // Attack-related conditions
    if ( isAttack ) {
      if ( this.statuses.has("blinded") ) banes.blind = {label: "Blinded", number: 2};
      if ( this.statuses.has("prone") ) banes.prone = {label: "Prone", number: 1};
      if ( this.statuses.has("restrained") ) banes.restrained = {label: "Restrained", number: 2};
    }

    // Temporary boons and banes stored as Actor rollBonuses
    const rollBonuses = this.system.rollBonuses;
    for ( const [id, boon] of Object.entries(rollBonuses.boons) ) {
      if ( id in boons ) boons[id].number = Math.max(boons[id].number, boon.number);
      else boons[id] = boon;
    }
    for ( const [id, bane] of Object.entries(rollBonuses.banes) ) {
      if ( id in banes ) banes[id].number = Math.max(banes[id].number, bane.number);
      else banes[id] = bane;
    }
  }

  /* -------------------------------------------- */

  /**
   * Configure a standard set of boons and banes conditional on the target of an Action.
   * @param {CrucibleAction} action
   * @param {CrucibleActionOutcome} outcome
   * @internal
   */
  _configureTargetOutcome(action, outcome) {
    const {boons, banes} = outcome.usage;
    const {isAttack=false, isRanged=false} = action.usage;

    // Attack-related conditions
    if ( isAttack ) {
      if ( this.statuses.has("blinded") ) boons.blind = {label: "Blinded", number: 2};
      if ( this.statuses.has("guarded") ) banes.guarded = {label: "Guarded", number: 1};
      if ( this.statuses.has("prone") ) {
        if ( isRanged ) banes.prone = {label: "Prone", number: 1};
        else boons.prone = {label: "Prone", number: 1};
      }
      if ( this.statuses.has("flanked") && !isRanged ) {
        const ae = this.effects.get(SYSTEM.EFFECTS.getEffectId("flanked"));
        boons.flanked = {label: "Flanked", number: ae?.getFlag("crucible", "flanked") ?? 1};
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Get a creature's effective resistance against a certain damage type dealt to a certain resource.
   * @param {string} resource       The resource targeted in SYSTEM.RESOURCES
   * @param {string} damageType     The damage type dealt in SYSTEM.DAMAGE_TYPES
   * @param {boolean} [restoration=false] Does the ability cause restoration?
   */
  getResistance(resource, damageType, restoration=false) {
    if ( restoration ) return 0;
    let r = this.resistances[damageType]?.total ?? 0;
    switch ( resource ) {
      case "health":
        if ( this.statuses.has("invulnerable") ) r = Infinity;
        break;
      case "morale":
        if ( this.statuses.has("resolute") || this.statuses.has("asleep") ) r = Infinity;
        break;
    }
    return r;
  }

  /* -------------------------------------------- */

  /**
   * Get the action cost of performing a certain movement.
   * @param {number} costFeet     The cost of the movement in feet, inclusive of difficult terrain and other modifiers.
   * @param {object} options      Options which modify cost calculation
   * @param {boolean} [options.useFreeMove] Consume a free move, if available
   * @returns {{cost: number, useFreeMove: boolean}}
   */
  getMovementActionCost(costFeet, {useFreeMove=true}={}) {
    if ( costFeet <= 0 ) return {distance: costFeet, cost: 0, useFreeMove: false};
    const stride = this.system.movement.stride ?? 8;
    let ap = Math.ceil(costFeet / stride);
    const useFree = useFreeMove && this.system.hasFreeMove;
    if ( useFree ) ap -= 1;
    return {distance: costFeet, cost: ap, useFreeMove: useFree};
  }

  /* -------------------------------------------- */

  /**
   * Use the Movement action to travel a certain measured distance.
   * @param {number} costFeet     The cost of the movement in feet, inclusive of difficult terrain and other modifiers.
   * @param {CrucibleActionUsageOptions} options  Options passed to CrucibleAction#use
   * @param {boolean} [options.useFreeMove]       Consume a free move, if available
   * @param {TokenMovementOperation} [options.movement] A recorded movement ID in Token movement history
   * @param {Set<string>} [options.actions]       The movement actions used as part of this move
   * @returns {CrucibleAction}    The performed Action
   */
  async useMove(costFeet, {useFreeMove=true, movement, actions, ...useOptions}={}) {

    // Annotate movement actions.
    actions ||= new Set(["walk"]);
    const actionLabels = [];
    const actionDescriptions = [];
    for ( const a of actions ) {
      const cfg = CONFIG.Token.movement.actions[a];
      if ( !cfg ) continue;
      const label = game.i18n.localize(cfg.label);
      const desc = game.i18n.localize(`TOKEN.MOVEMENT.ACTIONS.${a}.description`);
      actionLabels.push(label);
      actionDescriptions.push(`<p><strong>${label}:</strong> ${desc}</p>`);
    }

    // Record movement usage
    const usage = {
      id: movement?.id || null,
      actions,
      ...this.getMovementActionCost(costFeet, {useFreeMove})
    };

    // Adjust action name and description
    const move = this.actions.move;
    const action = move.clone({
      name: `${move._source.name} (${actionLabels.join(", ")})`,
      description: `<p>${move._source.description}</p>${actionDescriptions.join("")}`
    });
    action.usage.movement = usage;
    await action.use(useOptions);
  }

  /* -------------------------------------------- */

  /**
   * Create a skill check for the Actor.
   * @param {string} skillId
   * @param {object} options
   * @param [options.banes]
   * @param [options.boons]
   * @param [options.dc]
   * @param [options.passive]
   * @returns {PassiveCheck|StandardCheck}
   */
  getSkillCheck(skillId, {banes=0, boons=0, dc=20, passive=false}={}) {
    const skill = this.system.skills[skillId];
    if ( !skill ) throw new Error(`Invalid skill ID ${skillId}`);
    const {boons: systemBoons={}, banes: systemBanes={}} = this.system.rollBonuses;

    // Prepare check data
    const rollData = {
      passive,
      actorId: this.id,
      banes: {...systemBanes},
      boons: {...systemBoons},
      dc: dc,
      ability: skill.abilityBonus,
      skill: skill.skillBonus,
      enchantment: skill.enchantmentBonus,
      type: skillId
    };
    if ( boons ) rollData.boons.special = {label: "Special", number: boons};
    if ( banes ) rollData.banes.special = {label: "Special", number: banes};

    // Apply talent hooks
    this.callActorHooks("prepareStandardCheck", rollData);
    this.callActorHooks("prepareSkillCheck", skill, rollData);

    // Create Roll
    const rollCls = passive ? crucible.api.dice.PassiveCheck : crucible.api.dice.StandardCheck;
    return new rollCls(rollData);
  }

  /* -------------------------------------------- */

  /**
   * Test whether an Actor has a specific knowledge type.
   * @param {string} knowledgeId
   * @returns {boolean}
   */
  hasKnowledge(knowledgeId) {
    if ( this.type !== "hero" ) return false; // Relax this assumption eventually?
    return this.system.details.background.knowledge.has(knowledgeId);
  }

  /* -------------------------------------------- */

  /**
   * Roll a skill check for a given skill ID.
   *
   * @param {string} skillId      The ID of the skill to roll a check for, for example "stealth"
   * @param {number} [banes]      A number of special banes applied to the roll, default is 0
   * @param {number} [boons]      A number of special boons applied to the roll, default is 0
   * @param {number} [dc]         A known target DC
   * @param {string} [rollMode]   The roll visibility mode to use, default is the current dropdown choice
   * @param {boolean} [dialog]    Display a dialog window to further configure the roll. Default is false.
   *
   * @return {StandardCheck}      The StandardCheck roll instance which was produced.
   */
  async rollSkill(skillId, {banes=0, boons=0, dc, rollMode, dialog=false}={}) {
    const check = this.getSkillCheck(skillId, {banes, boons, dc, passive: false});

    // Prompt the user with a roll dialog
    const flavor = game.i18n.format("SKILL.RollFlavor", {name: this.name, skill: SYSTEM.SKILLS[skillId].label});
    if ( dialog ){
      const response = await check.dialog({flavor, rollMode});
      if ( response === null ) return null;
    }

    // Execute the roll to chat
    await check.toMessage({flavor, flags: {crucible: {skill: skillId}}});
    return check;
  }

  /* -------------------------------------------- */

  /**
   * Test the Actor's defense, determining which defense type is used to avoid an attack.
   * @param {string} defenseType      The defense type to test
   * @param {AttackRoll} roll         The AttackRoll instance
   * @returns {AttackRoll.RESULT_TYPES}
   */
  testDefense(defenseType, roll) {
    const d = this.system.defenses;
    const s = this.system.skills;
    if ( (defenseType !== "physical") && !(defenseType in d) && !(defenseType in s) ) {
      throw new Error(`Invalid defense type "${defenseType}" passed to Actor#testDefense`);
    }
    if ( !(roll instanceof AttackRoll) ) {
      throw new Error("You must pass an AttackRoll instance to Actor#testDefense");
    }
    const results = AttackRoll.RESULT_TYPES;
    let dc;

    // Physical Defense
    if ( defenseType === "physical" ) {
      dc = d.physical.total;

      // Hit
      if ( roll.total > dc ) return results.HIT;

      // Dodge
      const r = foundry.dice.MersenneTwister.random() * d.physical.total;
      const dodge = d.dodge.total;
      if ( r <= dodge ) return results.DODGE;

      // Parry
      const parry = dodge + d.parry.total;
      if ( r <= parry ) return results.PARRY;

      // Block
      const block = dodge + d.block.total;
      if ( r <= block ) return results.BLOCK;

      // Armor
      return roll.isCriticalFailure ? results.ARMOR : results.GLANCE;
    }

    // Other Defenses
    if ( defenseType in s ) dc = s[defenseType].passive;
    else dc = d[defenseType].total;
    if ( roll.total > dc ) return AttackRoll.RESULT_TYPES.HIT;
    else return AttackRoll.RESULT_TYPES.RESIST;
  }

  /* -------------------------------------------- */

  /**
   * Use an available Action.
   * @param {string} actionId     The action to use
   * @param {object} [options]    Options which configure action usage
   * @returns {Promise<Roll[]>}
   */
  async useAction(actionId, options={}) {
    const action = this.actions[actionId];
    if ( !action ) throw new Error(`Action ${actionId} does not exist in Actor ${this.id}`);
    return action.use({dialog: true, ...options, token: this.token});
  }

  /* -------------------------------------------- */

  /**
   * A wrapper around CrucibleActor#useAction which encapsulates some Macro hotbar behaviors.
   * @param {CrucibleActor} actor   The Actor which should take action
   * @param {string} actionId       The Action ID to be performed
   * @returns {Promise<void>}
   */
  static async macroAction(actor, actionId) {
    if ( !actor ) return ui.notifications.warn("You must have a Token controlled to use this Macro");
    let action = actor.actions[actionId];
    if ( !action && actionId.startsWith("spell.") ) action = CrucibleSpellAction.fromId(actionId, {actor});
    if ( !action ) return ui.notifications.warn(`Actor "${actor.name}" does not have the action "${actionId}"`);
    await action.use();
  }

  /* -------------------------------------------- */

  /**
   * Perform a spell attack as part of an action outcome.
   * @param {CrucibleSpellAction} spell
   * @param {CrucibleActionOutcome} outcome
   * @returns {Promise<AttackRoll|null>}
   */
  async spellAttack(spell, outcome) {
    if ( !spell.usage.hasDice ) return null;
    const target = outcome.target;
    if ( !(target instanceof CrucibleActor) ) throw new Error("You must define a target Actor for the spell.");

    // TODO get rid of action.usage here in favor of outcome.usage
    const boons = {...spell.usage.boons, ...outcome.usage.boons};
    const banes = {...spell.usage.banes, ...outcome.usage.banes};
    const defenseType = outcome.usage.defenseType || spell.defense;

    // Prepare Roll Data
    const rollData = {
      actorId: this.id,
      spellId: spell.id,
      target: target.uuid,
      ability: this.getAbilityBonus(Array.from(spell.scaling)),
      skill: 0,
      enchantment: 0,
      banes, boons,
      defenseType,
      dc: target.defenses[defenseType].total
    };

    // Call talent hooks
    this.callActorHooks("prepareStandardCheck", rollData);
    this.callActorHooks("prepareSpellAttack", spell, target, rollData);
    target.callActorHooks("defendSpellAttack", spell, this, rollData); // TODO migrate to defendAttack

    // Create the Attack Roll instance
    const roll = new AttackRoll(rollData);

    // Evaluate the result and record the result
    await roll.evaluate();
    const r = roll.data.result = target.testDefense(defenseType, roll);

    // Structure damage
    if ( r < AttackRoll.RESULT_TYPES.GLANCE ) return roll;
    roll.data.damage = {
      overflow: roll.overflow,
      multiplier: spell.damage.multiplier ?? 1,
      base: spell.damage.base,
      bonus: (spell.damage.bonus ?? 0) + (this.system.rollBonuses.damage?.[spell.damage.type] ?? 0),
      resistance: target.getResistance(spell.rune.resource, spell.damage.type, spell.damage.restoration),
      resource: spell.rune.resource,
      type: spell.damage.type,
      restoration: spell.damage.restoration
    };
    roll.data.damage.total = CrucibleAction.computeDamage(roll.data.damage);
    target.callActorHooks("receiveAttack", spell, roll);
    return roll;
  }

  /* -------------------------------------------- */

  /**
   * Cause this Actor to be the recipient of an environmental hazard attack.
   * @param {object} hazardData
   * @returns {Promise<CrucibleAction>}
   */
  async hazardAttack(hazardData) {
    const action = CrucibleAction.createHazard(this, hazardData);
    return action.use();
  }

  /* -------------------------------------------- */

  /**
   * Cause this actor to receive the effects of an Action.
   * This is used for cases like environmental hazards where the incoming action is not caused by a specific Actor.
   * @param {CrucibleAction} action
   * @returns {Promise<AttackRoll>}
   */
  async receiveAttack(action) {
    if ( !(action instanceof CrucibleAction) ) throw new Error("The provided action must be a CrucibleAction instance");
    const {bonuses, damageType, defenseType, resource} = action.usage;
    const roll = new AttackRoll({
      actorId: this.id,
      target: this.uuid,
      ability: bonuses.ability,
      skill: bonuses.skill,
      enchantment: bonuses.enchantment,
      defenseType,
      dc: this.defenses[defenseType].total
    });
    await roll.evaluate();

    // Structure damage result
    const r = roll.data.result = this.testDefense(defenseType, roll);
    if ( r < AttackRoll.RESULT_TYPES.GLANCE ) return roll;
    roll.data.damage = {
      overflow: roll.overflow,
      multiplier: 1,
      base: 0,
      bonus: 0,
      resistance: this.getResistance(resource, damageType),
      type: damageType,
      resource: resource,
      restoration: false
    };
    roll.data.damage.total = CrucibleAction.computeDamage(roll.data.damage);
    return roll;
  }

  /* -------------------------------------------- */

  /**
   * Perform a Skill Attack targeting a specific creature.
   * @param {CrucibleAction} action           The Skill Attack action being performed
   * @param {CrucibleActionOutcome} outcome   The outcome this attack belongs to
   * @returns {Promise<AttackRoll|null>}      A created AttackRoll instance or null
   */
  async skillAttack(action, outcome) {
    const target = outcome.target;

    // TODO get rid of action.usage here in favor of outcome.usage
    let {bonuses, damageType, restoration, resource, skillId} = action.usage;
    const boons = {...action.usage.boons, ...outcome.usage.boons};
    const banes = {...action.usage.banes, ...outcome.usage.banes};
    let defenseType = outcome.usage.defenseType || action.usage.defenseType;
    let dc;
    if ( defenseType in target.defenses ) dc = target.defenses[defenseType].total;
    else {
      defenseType = skillId;
      dc = action.usage.dc ?? target.skills[skillId].passive;
    }

    // Prepare Roll data
    const rollData = Object.assign({}, bonuses, {
      actorId: this.id,
      type: skillId,
      target: target.uuid,
      boons,
      banes,
      defenseType,
      dc
    });

    // Apply talent hooks
    this.callActorHooks("prepareStandardCheck", rollData);
    this.callActorHooks("prepareSkillAttack", action, target, rollData);
    target.callActorHooks("defendSkillAttack", action, this, rollData); // TODO migrate to "defendAttack"

    // Create and evaluate the skill attack roll
    const roll = new game.system.api.dice.AttackRoll(rollData);
    await roll.evaluate();
    roll.data.result = target.testDefense(defenseType, roll);

    // Create resulting damage
    if ( roll.data.result === AttackRoll.RESULT_TYPES.HIT ) {
      roll.data.damage = {
        overflow: roll.overflow,
        multiplier: bonuses.multiplier,
        base: bonuses.skill + (bonuses.base ?? 0),
        bonus: bonuses.damageBonus,
        resistance: target.getResistance(resource, damageType, restoration),
        type: damageType,
        resource: resource,
        restoration
      };
      roll.data.damage.total = CrucibleAction.computeDamage(roll.data.damage);
    }
    target.callActorHooks("receiveAttack", action, roll);
    return roll;
  }

  /* -------------------------------------------- */

  /**
   * Perform an Action which makes an attack using a Weapon.
   * @param {CrucibleAction} action         The action being performed
   * @param {CrucibleItem} [weapon]         The weapon used in the attack
   * @param {CrucibleActionOutcome} outcome The action outcome this attack belongs to
   * @returns {Promise<AttackRoll|null>}    An evaluated attack roll, or null if no attack is performed
   */
  async weaponAttack(action, weapon, outcome) {
    if ( !(weapon instanceof crucible.api.documents.CrucibleItem) || (weapon?.type !== "weapon") ) {
      throw new Error(`Weapon attack Action "${action.name}" did not specify which weapon is used in the attack`);
    }
    const target = outcome.target;
    // TODO get rid of action.usage here in favor of outcome.usage
    const boons = {...action.usage.boons, ...outcome.usage.boons};
    const banes = {...action.usage.banes, ...outcome.usage.banes};
    const defenseType = outcome.usage.defenseType || action.usage.defenseType || "physical";

    // Compose roll data
    const {ability, skill, enchantment} = weapon.system.actionBonuses;
    const rollData = {
      actorId: this.id,
      itemId: weapon.id,
      target: target.uuid,
      ability,
      skill,
      enchantment,
      banes, boons,
      defenseType,
      dc: target.defenses[defenseType].total,
      criticalSuccessThreshold: weapon.system.properties.has("keen") ? 4 : 6,
      criticalFailureThreshold: weapon.system.properties.has("reliable") ? 4 : 6
    };

    // Call talent hooks
    this.callActorHooks("prepareStandardCheck", rollData);
    this.callActorHooks("prepareWeaponAttack", action, target, rollData);
    target.callActorHooks("defendWeaponAttack", action, this, rollData); // TODO migrate to "defendAttack"

    // Create and evaluate the AttackRoll instance
    const roll = new AttackRoll(rollData);
    await roll.evaluate();
    const r = roll.data.result = target.testDefense(defenseType, roll);

    // Structure damage
    if ( r < AttackRoll.RESULT_TYPES.GLANCE ) return roll;
    roll.data.damage = weapon.system.getDamage(this, action, target, roll);
    roll.data.damage.total = CrucibleAction.computeDamage(roll.data.damage);

    // Finalize the attack and return
    target.callActorHooks("receiveAttack", action, roll);
    return roll;
  }

  /* -------------------------------------------- */

  /**
   * Delay your turn in combat, dropping to a lower initiative value
   * @param {number} initiative       The target initiative to which the actor is delaying
   * @param {object} actorUpdates     Additional actor updates that should be persisted as part of the delay action
   * @returns {Promise<void>}
   */
  async delay(initiative, actorUpdates={}) {
    const combatant = this.combatant;
    if ( !combatant ) throw new Error(`Actor [${this.id}] does not have a single Combatant in the current Combat.`);
    const maximum = combatant.getDelayMaximum();
    if ( !initiative || !Number.isInteger(initiative) || !initiative.between(1, maximum) ) {
      throw new Error(`You may only delay to an initiative value between 1 and ${maximum}`);
    }
    await this.update(foundry.utils.mergeObject(actorUpdates, {"flags.crucible.delay": {
        round: game.combat.round,
        from: combatant.initiative,
        to: initiative
      }
    }));
    await game.combat.update({turn: game.combat.turn, combatants: [{_id: combatant.id, initiative}]}, {diff: false});
  }

  /* -------------------------------------------- */

  /**
   * Perform the Recover action, restoring resource pools.
   * @param {object} [updateData={}]      Additional update data to include in the recover operation
   * @param {object} [options={}]         Options which modify the recover
   * @param {boolean} [options.allowDead=false]   Allow dead actors to recover?
   * @returns {Promise<void>}
   */
  async recover(updateData={}, {allowDead=false}={}) {
    if ( (this.system.isDead || this.system.isInsane) && !allowDead ) return;

    // Expire Active Effects
    const toDeleteEffects = this.effects.reduce((arr, effect) => {
      const s = effect.duration.seconds;
      if ( effect.id === "weakened00000000" ) arr.push(effect.id);
      else if ( effect.id === "broken0000000000" ) arr.push(effect.id);
      else if ( s && (s <= SYSTEM.TIME.recoverSeconds) ) arr.push(effect.id);
      return arr;
    }, []);
    await this.deleteEmbeddedDocuments("ActiveEffect", toDeleteEffects);

    // Recover Resources
    await this.update(foundry.utils.mergeObject(this.#getRecoveryData(), updateData));
  }

  /* -------------------------------------------- */

  /**
   * Restore all resource pools to their maximum value.
   * @param {object} [updateData={}]      Additional update data to include in the rest operation
   * @param {object} [options={}]         Options which modify the rest
   * @param {boolean} [options.allowDead=false]   Allow dead actors to rest?
   * @returns {Promise<void>}
   */
  async rest(updateData={}, {allowDead=false}={}) {
    if ( (this.system.isDead || this.system.isInsane) && !allowDead ) return;

    // Prepare Rest data
    const restData = this.#getRecoveryData();
    if ( this.type === "hero" ) {
      const {wounds, madness} = this.system.resources;
      restData.system.resources.wounds = {value: Math.max(wounds.value - this.level, 0)};
      restData.system.resources.madness = {value: Math.max(madness.value - this.level, 0)};
    }

    // Expire Active Effects
    const toDeleteEffects = this.effects.reduce((arr, effect) => {
      const s = effect.duration.seconds;
      if ( effect.id === "weakened00000000" ) arr.push(effect.id);
      else if ( effect.id === "broken0000000000" ) arr.push(effect.id);
      else if ( !s || (s <= SYSTEM.TIME.restSeconds) ) arr.push(effect.id);
      return arr;
    }, []);
    await this.deleteEmbeddedDocuments("ActiveEffect", toDeleteEffects);

    // Recover Resources
    await this.update(foundry.utils.mergeObject(restData, updateData));
  }

  /* -------------------------------------------- */

  /**
   * Prepare an object that replenishes all resource pools to their current maximum level
   * @returns {object}
   */
  #getRecoveryData() {
    const updates = {system: {resources: {}, status: null}};
    for ( let [id, resource] of Object.entries(this.system.resources) ) {
      const cfg = SYSTEM.RESOURCES[id];
      if ( !cfg || (cfg.type === "reserve") ) continue;
      updates.system.resources[id] = {value: resource.max};
    }
    updates.system.resources.heroism = {value: 0};
    return updates;
  }

  /* -------------------------------------------- */

  /**
   * Alter the resource pools of the actor using an object of change data
   * @param {Object<string, number>} deltas       Changes where the keys are resource names and the values are deltas
   * @param {object} [updates]                    Other Actor updates to make as part of the same transaction
   * @param {object} [options]                    Options which are forwarded to the update method
   * @param {boolean} [options.reverse]             Reverse the direction of change?
   * @param {object[]} [options.statusText]         Custom status text displayed alongside the update
   * @returns {Promise<CrucibleActor>}            The updated Actor document
   */
  async alterResources(deltas, updates={}, {reverse=false, statusText}={}) {
    const r = this.system.resources;

    // Apply resource updates
    const changes = {};
    for ( let [resourceName, delta] of Object.entries(deltas) ) {
      if ( !(resourceName in r) ) continue;
      if ( !(resourceName in changes) ) changes[resourceName] = {value: 0};
      if ( reverse ) delta *= -1;
      let resource = r[resourceName];

      // Handle Infinity
      if ( delta === Infinity ) {
        changes[resourceName] = {value: 999999};
        continue;
      }
      else if ( delta === -Infinity ) {
        changes[resourceName] = {value: -999999};
        continue;
      }

      // Frightened and Diseased
      switch ( resourceName ) {
        case "action":
          if ( this.isIncapacitated ) delta = Math.min(delta, 0);
          break;
        case "health":
          if ( this.statuses.has("diseased") ) delta = Math.min(delta, 0);
          break;
        case "morale":
          if ( this.statuses.has("frightened") ) delta = Math.min(delta, 0);
      }

      // Handle overflow
      const uncapped = resource.value + delta;
      const overflow = Math.min(uncapped, 0);

      // Health overflows into Wounds
      if ( (resourceName === "health") && (overflow !== 0) && ("wounds" in r) ) {
        changes.wounds ||= {value: r.wounds.value};
        changes.wounds.value -= overflow;
      }

      // Morale overflows into Madness
      else if ( (resourceName === "morale") && (overflow !== 0) && ("madness" in r) ) {
        changes.madness ||= {value: r.madness.value};
        changes.madness.value -= overflow;
      }

      // Regular updates
      changes[resourceName].value = uncapped;
    }

    // Constrain and merge changes
    for ( const [id, obj] of Object.entries(changes) ) {
      obj.value = Math.clamp(obj.value, 0, r[id].max);
    }
    updates = foundry.utils.mergeObject(updates, {"system.resources": changes});
    return this.update(updates, {statusText});
  }

  /* -------------------------------------------- */

  /**
   * Toggle a named status active effect for the Actor
   * @param {string} statusId     The status effect ID to toggle
   * @param {boolean} active      Should the effect be active?
   * @param {boolean} overlay     Should the effect be an overlay?
   * @returns {Promise<ActiveEffect|undefined>}
   */
  async toggleStatusEffect(statusId, {active=true, overlay=false}={}) {
    const effectData = CONFIG.statusEffects.find(e => e.id === statusId);
    if ( !effectData ) return;
    const existing = this.effects.find(e => e.statuses.has(effectData.id));

    // No changes needed
    if ( !active && !existing ) return;
    if ( active && existing ) return existing.update({"flags.core.overlay": overlay});

    // Remove an existing effect
    if ( !active && existing ) return existing.delete();

    // Add a new effect
    else if ( active ) {
      const createData = foundry.utils.mergeObject(effectData, {
        _id: SYSTEM.EFFECTS.getEffectId(statusId),
        name: game.i18n.localize(effectData.name),
        statuses: [statusId]
      }, {inplace: false});
      if ( overlay ) createData["flags.core.overlay"] = true;
      await ActiveEffect.create(createData, {parent: this, keepId: true});
    }
  }

  /* -------------------------------------------- */
  /*  Action Outcome Management                   */
  /* -------------------------------------------- */

  /**
   * Deal damage to a target. This method requires ownership of the target Actor.
   * Applies resource changes to both the initiating Actor and to affected Targets.
   * @param {CrucibleAction} action             The Action being applied
   * @param {CrucibleActionOutcome} outcome     The Action outcome
   * @param {object} [options]                  Options which affect how damage is applied
   * @param {boolean} [options.reverse]           Reverse damage instead of applying it
   */
  async applyActionOutcome(action, outcome, {reverse=false}={}) {
    const wasWeakened = this.system.isWeakened;
    const wasBroken = this.system.isBroken;
    const wasIncapacitated = this.isIncapacitated;

    // Prune effects if the attack was unsuccessful
    if ( !reverse && outcome.rolls.length && !outcome.rolls.some(r => r.isSuccess) ) outcome.effects.length = 0;

    // Call outcome confirmation actor hooks
    this.callActorHooks("confirmActionOutcome", action, outcome, {reverse});

    // Apply changes to the Actor
    await this.alterResources(outcome.resources, outcome.actorUpdates, {reverse, statusText: outcome.statusText});
    await this.#applyOutcomeEffects(outcome, reverse);

    // Record target state changes
    if ( this.system.isWeakened && !wasWeakened ) outcome.weakened = true;
    if ( this.system.isBroken && !wasBroken ) outcome.broken = true;
    if ( this.isIncapacitated && !wasIncapacitated ) outcome.incapacitated = true;
  }

  /* -------------------------------------------- */

  /**
   * Apply or reverse ActiveEffect changes occurring through an action outcome.
   * @param {CrucibleActionOutcome} outcome     The action outcome
   * @param {boolean} reverse                   Reverse the effects instead of applying them?
   * @returns {Promise<void>}
   */
  async #applyOutcomeEffects(outcome, reverse=false) {

    // Reverse effects
    if ( reverse ) {
      const deleteEffectIds = outcome.effects.reduce((arr, e) => {
        if ( this.effects.has(e._id) ) arr.push(e._id);
        return arr;
      }, []);
      await this.deleteEmbeddedDocuments("ActiveEffect", deleteEffectIds);
      return;
    }

    // Create new effects or update existing ones
    const toCreate = [];
    const toUpdate = [];
    const toDelete = [];
    for ( const effectData of outcome.effects ) {
      const existing = this.effects.get(effectData._id);
      if ( existing && effectData._delete ) toDelete.push(effectData._id);
      else if ( existing ) toUpdate.push(effectData);
      else toCreate.push(effectData);
    }
    await this.deleteEmbeddedDocuments("ActiveEffect", toDelete);
    await this.updateEmbeddedDocuments("ActiveEffect", toUpdate);
    await this.createEmbeddedDocuments("ActiveEffect", toCreate, {keepId: true});
  }

  /* -------------------------------------------- */

  /**
   * Additional steps taken when this Actor deals damage to other targets.
   * @param {CrucibleAction} action                The action performed
   * @param {CrucibleActionOutcomes} outcomes      The action outcomes that occurred
   */
  onDealDamage(action, outcomes) {
    const self = outcomes.get(this);
    for ( const outcome of outcomes.values() ) {
      if ( outcome === self ) continue;
      if ( outcome.criticalSuccess ) {
        this.callActorHooks("applyCriticalEffects", action, outcome, self);
      }
    }
  }

  /* -------------------------------------------- */
  /*  Combat Encounters and Turn Order            */
  /* -------------------------------------------- */

  /**
   * Actions that occur at the beginning of an Actor's turn in Combat.
   * This method is only called for one User who has ownership permission over the Actor.
   *
   * Turn start workflows proceed in the following order:
   * 1. Damage-Over-Time effects are applied
   * 2. Active Effects are expired or gained
   * 3. Resource recovery occurs
   * @returns {Promise<void>}
   */
  async onStartTurn() {

    // Re-prepare data and re-render the actor sheet
    this.reset();
    this._sheet?.render(false);

    // Skip cases where the actor delayed, and it is now their turn again
    const {round, from, to} = this.flags.crucible?.delay || {};
    if ( from && (round === game.combat.round) && (game.combat.combatant?.initiative === to) ) return;

    // Plan actor changes
    const statusText = [];
    const resourceRecovery = {action: Infinity};
    if ( this.statuses.has("unaware") ) statusText.push({
      text: game.i18n.localize("ACTIVE_EFFECT.STATUSES.Unaware"),
      fillColor: SYSTEM.RESOURCES.action.color.css
    });
    const actorUpdates = {
      system: {status: null},
      flags: {
        crucible: {
          actionHistory: []
        }
      }
    };

    // Identify expiring effects
    const effectChanges = {toCreate: [], toUpdate: [], toDelete: []};
    this.#updateStartTurnEffects(effectChanges);

    // Actor turn start configuration hook
    const turnStartConfig = {resourceRecovery, actorUpdates, effectChanges, statusText};
    this.callActorHooks("startTurn", turnStartConfig);

    // Apply damage-over-time
    await this.applyDamageOverTime().catch(cause => { // TODO integrate this with resourceRecovery?
      console.error(new Error(`Failed to apply turn start damage-over-time effects for Actor ${this.id}.`, {cause}));
    });

    // Remove round-based Active Effects which expire at the start of a turn
    await this.#applyActiveEffectChanges(effectChanges).catch(cause => {
      console.error(new Error(`Failed to apply turn start ActiveEffect changes for Actor ${this.id}.`, {cause}));
    });

    // Recover resources
    await this.alterResources(resourceRecovery, actorUpdates, {statusText}).catch(cause => {
      console.error(new Error(`Failed to apply turn start resource recovery for Actor ${this.id}.`, {cause}));
    });

    // TODO log a turn start summary of resource changes and their sources?
  }

  /* -------------------------------------------- */

  /**
   * Actions that occur at the end of an Actor's turn in Combat.
   * This method is only called for one User who has ownership permission over the Actor.
   *
   * Turn end workflows proceed in the following order:
   * 1. Active Effects are expired or gained
   * 2. Resource recovery occurs
   * @returns {Promise<void>}
   */
  async onEndTurn() {

    // Re-prepare data and re-render the actor sheet
    this.reset();
    this._sheet?.render(false);

    // Skip cases where the turn is over because the actor delayed
    const {round, from, to} = this.flags.crucible?.delay || {};
    if ( from && (round === game.combat.round) && (game.combat.combatant?.initiative > to) ) return;

    // Plan actor changes
    const resourceRecovery = {};
    const actorUpdates = {};
    if ( this.flags.crucible?.delay ) foundry.utils.mergeObject(actorUpdates, {"flags.crucible.-=delay": null});

    // Identify expiring effects
    const effectChanges = {toCreate: [], toUpdate: [], toDelete: []};
    this.#updateEndTurnEffects(effectChanges);

    // Actor turn start configuration hook
    const statusText = [];
    const turnEndConfig = {resourceRecovery, actorUpdates, effectChanges, statusText};
    this.callActorHooks("endTurn", turnEndConfig);

    // Remove active effects which expire at the end of a turn
    await this.#applyActiveEffectChanges(effectChanges).catch(cause => {
      console.error(new Error(`Failed to apply turn end ActiveEffect changes for Actor ${this.id}.`, {cause}));
    });

    // Recover resources
    await this.alterResources(resourceRecovery, actorUpdates, {statusText}).catch(cause => {
      console.error(new Error(`Failed to apply turn end resource recovery for Actor ${this.id}.`, {cause}));
    });

    // TODO turn end summary of resource changes and their sources?
  }

  /* -------------------------------------------- */

  /**
   * Actions that occur when this Actor leaves a Combat encounter.
   * @returns {Promise<void>}
   */
  async onLeaveCombat() {

    // Clear turn delay flags
    if ( this.flags.crucible?.delay ) await this.update({"flags.crucible.-=delay": null});

    // Re-prepare data and re-render the actor sheet
    this.reset();
    this._sheet?.render(false);
  }

  /* -------------------------------------------- */

  /**
   * Apply damage over time effects which are currently active on the Actor.
   * Positive damage-over-time is applied as damage and is mitigated by resistance or amplified by vulnerability.
   * Negative damage-over-time is applied as healing and is unaffected by resistances or vulnerabilities.
   * @returns {Promise<void>}
   */
  async applyDamageOverTime() {
    for ( const effect of this.effects ) {
      const dot = effect.flags.crucible?.dot;
      if ( !dot ) continue;

      // Categorize damage
      const damage = {};
      for ( const r of Object.keys(SYSTEM.RESOURCES) ) {
        let v = dot[r];
        if ( !v ) continue;
        if (  v > 0 ) v = Math.clamp(v - this.resistances[dot.damageType].total, 0, 2 * v);
        damage[r] ||= 0;
        damage[r] -= v;
      }
      const status = {text: effect.label, fillColor: SYSTEM.RESOURCES.health.color.high.css};
      await this.alterResources(damage, {}, {statusText: [status]});
    }
  }

  /* -------------------------------------------- */

  /**
   * Expire active effects whose durations have concluded at the end of the Actor's turn.
   * @param {{toCreate: object[], toUpdate: object[], toDelete: string[]}} [effectChanges]
   * @returns {Promise<void>}
   */
  async #applyActiveEffectChanges({toCreate, toUpdate, toDelete}) {
    if ( toDelete?.length ) await this.deleteEmbeddedDocuments("ActiveEffect", toDelete);
    if ( toUpdate?.length ) await this.updateEmbeddedDocuments("ActiveEffect", toUpdate);
    if ( toCreate?.length ) await this.createEmbeddedDocuments("ActiveEffect", toCreate);
  }

  /* -------------------------------------------- */

  /**
   * Identify changes to ActiveEffects which occur at the start of a Combatant's turn.
   * Effects with a duration specified in Rounds expire at the beginning of the Actor's turn on the subsequent round.
   * @param {{toCreate: object[], toUpdate: object[], toDelete: string[]}} [effectChanges]
   */
  #updateStartTurnEffects(effectChanges) {
    for ( const effect of this.effects ) {
      const {startRound, rounds} = effect.duration;
      if ( !Number.isNumeric(rounds) ) continue; // Must have duration in rounds
      const elapsed = game.combat.round - startRound;
      if ( elapsed > rounds ) effectChanges.toDelete.push(effect.id);
    }
  }

  /* -------------------------------------------- */

  /**
   * Identify changes to ActiveEffects which occur at the start of a Combatant's turn.
   * Effects with a duration specified in Turns expire at the end of the Actor's turn once the duration has elapsed.
   * @param {{toCreate: object[], toUpdate: object[], toDelete: string[]}} [effectChanges]
   */
  #updateEndTurnEffects(effectChanges) {
    for ( const effect of this.effects ) {
      const {startRound, turns} = effect.duration;
      if ( !Number.isNumeric(turns) ) continue; // Must have duration in turns
      const elapsed = game.combat.previous.round - startRound; // Important to reference the previous round
      if ( elapsed >= turns ) effectChanges.toDelete.push(effect.id);
      // Workaround until unaware is more automated - it can only ever last one round
      else if ( effect.id === "unaware000000000" ) effectChanges.toDelete.push(effect.id);
    }
  }

  /* -------------------------------------------- */
  /*  Character Creation Methods                  */
  /* -------------------------------------------- */

  /**
   * Test whether an Actor is able to learn a new Iconic Spell.
   * @param {CrucibleItem} spell    The spell desired to know
   * @throws {Error}                An error if the Actor cannot learn the spell
   */
  canLearnIconicSpell(spell) {
    const {iconicSpells, iconicSlots} = this.grimoire;
    if ( iconicSpells.length >= iconicSlots ) {
      throw new Error(`Actor ${this.name} does not have any available Iconic Spell slots.`)
    }
    if ( this.items.get(spell._id) ) {
      throw new Error(`Actor ${this.name} already knows the ${spell.name} Iconic Spell.`);
    }
    if ( !spell.system.canKnowSpell(this.system.grimoire) ) {
      throw new Error(`Actor ${this.name} does not satisfy the knowledge requirements to learn the ${spell.name} Iconic Spell.`);
    }
  }

  /* -------------------------------------------- */

  /**
   * Toggle display of the Talent Tree.
   */
  async toggleTalentTree(active) {
    if ( this.type !== "hero" ) return;
    const tree = game.system.tree;
    if ( (tree.actor === this) && (active !== true) ) return game.system.tree.close();
    else if ( active !== false ) return game.system.tree.open(this);
  }

  /* -------------------------------------------- */

  /**
   * Reset all Talents for the Actor.
   * @param {object} [options]        Options which modify how talents are reset
   * @param {boolean} [options.dialog]    Present the user with a confirmation dialog?
   * @returns {Promise<void>}         A Promise which resolves once talents are reset or the dialog is declined
   */
  async resetTalents({dialog=true}={}) {

    // Prompt for confirmation
    if ( dialog ) {
      const confirm = await DialogV2.confirm({
        window: {
          title: `Reset Talents: ${this.name}`,
          icon: "fa-solid fa-undo"
        },
        content: `<p>Are you sure you wish to reset all Talents?</p>`,
        yes: {
          default: true
        }
      });
      if ( !confirm ) return;
    }

    // Remove all non-permanent talents
    const deleteIds = this.items.reduce((arr, i) => {
      if ( (i.type === "talent") && !this.system.permanentTalentIds.has(i.id) ) arr.push(i.id);
      return arr;
    }, []);
    await this.deleteEmbeddedDocuments("Item", deleteIds);
  }

  /* -------------------------------------------- */

  /**
   * Re-sync all Talent data on this actor with updated source data.
   * @returns {Promise<void>}
   */
  async syncTalents() {
    const updates = [];
    const packs = [];
    for ( const packId of crucible.CONFIG.packs.talent ) {
      const pack = game.packs.get(packId);
      if ( pack ) packs.push(pack);
    }
    for ( const item of this._source.items ) {
      if ( item.type !== "talent" ) continue;
      for ( const pack of packs ) {
        let talent;
        if ( pack.index.has(item._id) ) talent = await pack.getDocument(item._id);
        else if ( item._stats.compendiumSource ) talent = await fromUuid(item._stats.compendiumSource);
        if ( talent ) updates.push(this._cleanItemData(talent));
      }
    }
    await this.updateEmbeddedDocuments("Item", updates, {diff: false, recursive: false, noHook: true});
    await this.update({"_stats.systemVersion": game.system.version});
  }

  /* -------------------------------------------- */

  /**
   * Handle requests to add a new Talent to the Actor.
   * Confirm that the Actor meets the requirements to add the Talent, and if so create it on the Actor
   * @param {CrucibleItem} talent     The Talent item to add to the Actor
   * @param {object} [options]        Options which configure how the Talent is added
   * @param {boolean} [options.dialog]        Prompt the user with a confirmation dialog?
   * @param {boolean} [options.warnUnusable]  Warn the user in-dialog if the talent would be currently unusable
   * @returns {Promise<CrucibleItem|null>} The created talent Item or null if no talent was added
   */
  async addTalent(talent, {dialog=false, warnUnusable=false}={}) {

    // Confirm that the Actor meets the requirements to add the Talent
    try {
      talent.system.assertPrerequisites(this);
    } catch(err) {
      ui.notifications.warn(err.message);
      return null;
    }

    // Confirmation dialog
    if ( dialog ) {
      let content = game.i18n.format("TALENT.Purchase", {name: talent.name});
      try {
        const canUse = this.canUtilizeTalent(talent);
        if ( (canUse === false) && warnUnusable ) {
          content += `<div class="notification warning">You cannot use this talent.</div>`;
        }
      } catch(err) {
        if ( warnUnusable ) {
          content += `<div class="notification warning">${err.message}</div>`;
        }
      }
      const confirm = await foundry.applications.api.DialogV2.confirm({
        window: {title: `Purchase Talent: ${talent.name}`},
        content,
        yes: {default: true},
        no: {default: false}
      });
      if ( !confirm ) return null;

      // Re-confirm after the dialog has been submitted to prevent queuing up multiple additions
      try {
        talent.system.assertPrerequisites(this);
      } catch(err) {
        ui.notifications.warn(err.message);
        return null;
      }
    }

    // Add temporarily to an ephemeral Actor
    const talentData = this._cleanItemData(talent);
    if ( !this._id ) {
      const talentCopy = talent.constructor.fromSource(talentData, {parent: this});
      this.items.set(talentCopy.id, talentCopy);
      this.reset();
      if ( crucible.tree.actor === this ) crucible.tree.refresh();
      return talentCopy;
    }

    // Add permanently to a persisted Actor
    return talent.constructor.create(talentData, {parent: this, keepId: true});
  }

  /* -------------------------------------------- */

  /**
   * Remove a Talent from this Actor.
   * @param {CrucibleItem} talent     The Talent item to remove from the Actor
   * @param {object} [options]        Options which configure how the Talent is added
   * @param {boolean} [options.dialog]    Prompt the user with a confirmation dialog?
   * @returns {Promise<CrucibleItem|null>} The removed talent Item or null
   */
  async removeTalent(talent, {dialog=false}={}) {
    const ownedTalent = this.items.get(talent.id);
    if ( !ownedTalent ) throw new Error(`Talent "${ownedTalent.id}" is not owned by Actor "${this.id}"`);
    if ( dialog ) {
      const confirm = await foundry.applications.api.DialogV2.confirm({
        window: {title: `Remove Talent: ${ownedTalent.name}`},
        content: `<p>Remove talent <strong>${ownedTalent.name}</strong>, reclaiming 1 Talent Point?</p>`,
        yes: {default: true},
        no: {default: false}
      });
      if ( !confirm ) return null;
    }

    // Remove temporarily from an ephemeral Actor
    if ( !this._id ) {
      this.items.delete(ownedTalent.id);
      this.reset();
      if ( crucible.tree.actor === this ) crucible.tree.refresh();
    }

    // Remove permanently from a persisted Actor
    else await ownedTalent.delete();
    return ownedTalent;
  }

  /* -------------------------------------------- */

  /**
   * Test whether this Actor would be able to use a Talent once purchased
   * @param {CrucibleItem} talent   The Talent item
   * @returns {boolean}             Whether the Talent would be usable
   */
  canUtilizeTalent(talent) {
    // Can't use a Gesture or Inflection without a Rune
    if ( (talent.system.gesture || talent.system.inflection) && !this.items.find(i => (i.type === "talent" && i.system.rune)) ) {
      throw new Error(game.i18n.localize(`TALENT.WARNINGS.RequiresRune${talent.system.inflection ? "Inflection" : "Gesture"}`));
    }

    return true;
  }

  /* -------------------------------------------- */

  /**
   * Advance the Actor a certain number of levels (or decrease level with a negative delta).
   * When advancing in level, resources are restored and advancement progress is reset.
   * @param {number} delta                The number of levels to advance or decrease
   * @returns {Promise<CrucibleActor>}    The modified Actor
   */
  async levelUp(delta=1) {
    if ( delta === 0 ) return;

    // Confirm that character creation is complete
    if ( this.isL0 ) {
      const steps = [
        this.system.details.ancestry?.name,
        this.system.details.background?.name,
        !this.points.ability.requireInput,
        !this.points.talent.available
      ];
      if ( !steps.every(k => k) ) return ui.notifications.warn("WALKTHROUGH.LevelZeroIncomplete", {localize: true});
    }

    // Commit the update
    const level = Math.clamp(this.level + delta, 0, 24);
    const update = {"system.advancement.level": level};
    return this.update(update);
  }

  /* -------------------------------------------- */

  /**
   * Purchase an ability score increase or decrease for the Actor
   * @param {string} ability      The ability id to increase
   * @param {number} delta        A number in [-1, 1] for the direction of the purchase
   * @return {Promise}
   */
  async purchaseAbility(ability, delta=1) {
    delta = Math.sign(delta);
    const a = this.system.abilities[ability];
    if ( !a || !delta ) return;

    // Can the ability be purchased?
    if ( !this.canPurchaseAbility(ability, delta) ) {
      return ui.notifications.warn(`WARNING.AbilityCannot${delta > 0 ? "Increase" : "Decrease"}`, {localize: true});
    }

    // Modify the ability
    let update;
    if ( this.isL0 ) update = {[`system.abilities.${ability}.base`]: Math.max(a.base + delta, 0)};
    else update = {[`system.abilities.${ability}.increases`]: a.increases + delta};

    // Temporary modification for ephemeral Actor
    if ( !this._id ) this.updateSource(update);
    else await this.update(update);
  }

  /* -------------------------------------------- */

  /**
   * Test whether this Actor can modify an ability score in a certain direction.
   * @param {string} ability      A value in ABILITIES
   * @param {number} delta        A number in [-1, 1] for the direction of the purchase
   * @returns {boolean}           Can the ability score be changed?
   */
  canPurchaseAbility(ability, delta=1) {
    if ( !this.system.points ) return false;
    delta = Math.sign(delta);
    const points = this.points.ability;
    const a = this.system.abilities[ability];
    if ( !a || !delta ) return false;

    // Case 1 - Point Buy
    if ( this.isL0 ) {
      if ( (delta > 0) && ((a.base === 3) || (points.pool < 1)) ) return false;
      else if ( (delta < 0) && (a.base === 0) ) return false;
      return true;
    }

    // Case 2 - Regular Increase
    else {
      if ( (delta > 0) && ((a.value === 12) || (points.available < 1)) ) return false;
      else if ( (delta < 0) && (a.increases === 0) ) return false;
      return true;
    }
  }

  /* -------------------------------------------- */


  /**
   * Apply actor detail data.
   * This is an internal helper method not intended for external use.
   * @param {CrucibleItem|null} item          An Item document, object of Item data, or null to clear data
   * @param {object} [options]                Options which affect how details are applied
   * @param {string} [options.type]             Assert a particular type of detail item. Required when clearing
   * @param {boolean} [options.canApply]        Allow new detail data to be applied?
   * @param {boolean} [options.canClear]        Allow the prior data to be cleared if null is passed?
   * @param {boolean} [options.local=false]     Apply the item locally without saving changes to the database
   * @param {boolean} [options.notify=true]     Display a notification about the application result?
   * @returns {Promise<void>}
   * @internal
   */
  async _applyDetailItem(item, {type, canApply=true, canClear=false, local=false, notify=true, skillTalents=true}={}) {
    type ??= item?.type;
    if ( item ) {
      if ( !canApply ) throw new Error(`You are not allowed to apply ${type} data to Actor ${this.name}`);
      const validType = (type === item.type) && (type in this.system.details);
      if ( !validType ) throw new Error(`Incorrect detail item type ${type} for Actor type ${this.type}`);
    }
    else {
      if ( !type ) throw new Error("You must specify the type of detail item to clear.");
      if ( !canClear ) throw new Error(`You are not allowed to clear the ${type} item from Actor ${this.name}`);
    }

    // Remove existing talents
    const existing = this.system.details[type];
    let deleteItemIds = new Set();
    for ( const uuid of (existing?.talents || []) ) {
      const talentId = foundry.utils.parseUuid(uuid)?.documentId;
      if ( this.items.has(talentId) ) deleteItemIds.add(talentId);
    }

    // Remove existing equipment
    for ( const {item: uuid} of (existing?.equipment || []) ) {
      const itemId = foundry.utils.parseUuid(uuid)?.documentId;
      if ( this.items.has(itemId) ) deleteItemIds.add(itemId);
    }

    // Remove skill talents
    if ( skillTalents ) {
      for ( const skillId of (existing?.skills || []) ) {
        const uuid = SYSTEM.SKILLS[skillId]?.talents[1];
        const talentId = foundry.utils.parseUuid(uuid)?.documentId;
        if ( this.items.has(talentId) ) deleteItemIds.add(talentId);
      }
    }

    // Clear the detail data
    const key = `system.details.==${type}`;
    const updateData = {};
    let message;
    if ( !item ) {
      updateData[key] = null;
      message = game.i18n.format("ACTOR.ClearedDetailItem", {type, actor: this.name});
    }

    // Add new detail data
    else {
      const itemData = item.toObject();
      const detail = updateData[key] = Object.assign(itemData.system, {name: itemData.name, img: itemData.img});
      const updateItems = [];

      // Grant Talents
      const talentUuids = [
        ...(detail.talents || []),
        ...(skillTalents ? (detail.skills || []).map(skillId => SYSTEM.SKILLS[skillId]?.talents[1]) : [])
      ];
      for ( const uuid of talentUuids ) {
        const talent = await fromUuid(uuid);
        if ( !talent ) continue;
        if ( this.items.has(talent.id) ) deleteItemIds.delete(talent.id); // Talent already owned
        else updateItems.push(this._cleanItemData(talent));               // Add new Talent
      }

      // Grant Equipment
      for ( const {item: uuid, quantity, equipped} of (detail.equipment || []) ) {
        const item = await fromUuid(uuid);
        if ( !item ) continue;
        const itemData = this._cleanItemData(item);
        Object.assign(itemData.system, {quantity, equipped});
        if ( item.system.requiresInvestment && equipped ) itemData.system.invested = true;
        updateItems.push(itemData); // Always update equipment, even if already owned
      }

      // Include granted items in Actor update
      if ( updateItems.length ) updateData.items = updateItems;
      message = game.i18n.format("ACTOR.AppliedDetailItem", {name: detail.name, type, actor: this.name});
    }

    // Update locally (for example during character creation)
    if ( local ) {
      for ( const itemId of deleteItemIds ) this.items.delete(itemId);
      this.updateSource(updateData);
      return;
    }

    // Commit the update
    await this.deleteEmbeddedDocuments("Item", Array.from(deleteItemIds));
    await this.update(updateData, {keepEmbeddedIds: true});
    if ( message && notify ) ui.notifications.info(message);
  }

  /* -------------------------------------------- */

  /**
   * View actor detail data as an editable item.
   * This is an internal helper method not intended for external use.
   * @param {string} type         The data type, either "archetype" or "taxonomy"
   * @param {object} [options]    Options that configure how the data is viewed
   * @param {boolean} [options.editable]    Is the detail item editable?
   * @returns {Promise<void>}
   * @internal
   */
  async _viewDetailItem(type, {editable=false}={}) {
    if ( !(type in this.system.details) ) {
      throw new Error(`Incorrect detail item type ${type} for Actor type ${this.type}`);
    }
    const data = this.toObject().system.details[type];

    // View current data
    if ( data?.name ) {
      const cls = getDocumentClass("Item");
      const item = new cls({
        name: data.name,
        img: data.img,
        type: type,
        system: foundry.utils.deepClone(data)
      }, {parent: this});
      item.sheet.render(true, {editable});
      return;
    }

    // Browse compendium pack
    if ( this.isL0 || !data?.name ) {
      const pack = game.packs.get(SYSTEM.COMPENDIUM_PACKS[type]);
      pack.render(true);
    }
  }

  /* -------------------------------------------- */

  /**
   * Clean data for an Item that is being added to this Actor.
   * @param {CrucibleItem} item
   * @internal
   */
  _cleanItemData(item) {
    const itemData = game.items.fromCompendium(item, {clearFolder: true, clearOwnership: true, keepId: true});
    delete itemData.ownership;
    return itemData;
  }

  /* -------------------------------------------- */
  /*  Equipment Management Methods                */
  /* -------------------------------------------- */

  /**
   * @typedef CrucibleEquipItemOptions
   * @property {boolean} [dropped]          Has the Item been dropped?
   * @property {boolean} [equipped]         Whether the Item should be equipped (true) or unequipped (false)
   * @property {number} [slot]              A specific equipment slot in SYSTEM.WEAPON.SLOTS
   */

  /**
   * A generic wrapper around various equip methods.
   * @param {CrucibleItem|string} item      The owned Item id to equip
   * @param {CrucibleEquipItemOptions} [options] Options which configure how the Item is equipped
   * @return {Promise}                      A Promise which resolves once the Item has been equipped or un-equipped
   * @throws {Error}                        An Error if the Item cannot be equipped
   */
  async equipItem(item, {slot, dropped=false, equipped=true}={}) {
    if ( typeof item === "string" ) item = this.items.get(item);
    if ( !(item instanceof foundry.documents.Item) || (item.parent !== this) ) {
      throw new Error(`Invalid Item "${item?.uuid}" cannot be equipped`);
    }

    // Verify whether equipment can occur
    const result = this.canEquipItem(item, {slot, dropped, equipped});
    if ( result.equipped === item.system.equipped ) return; // No change needed

    // Configure and use the equipItem action
    slot = equipped ? this.canEquipItem(item, slot) : undefined;
    const action = equipped ? this.#equipItemAction(item, slot) : this.#unequipItemAction(item, dropped);
    if ( this.inCombat ) await action.use();
    else if ( action.usage.actorUpdates.items.length ) {
      await this.updateEmbeddedDocuments("Item", action.usage.actorUpdates.items);
    }
  }

  /* -------------------------------------------- */

  /**
   * Perform an action to un-equip or drop a weapon.
   * @param {CrucibleItem} item         An item being equipped
   * @param {boolean} [dropped]         Has the weapon been dropped?
   * @returns {CrucibleAction|null}
   */
  #unequipItemAction(item, dropped) {
    if ( !item.system.equipped ) return null;
    let ap = dropped ? 0 : 1;
    if ( item.system.properties.has("ambush") ) ap = Math.max(ap - 1, 0);
    const typeLabel = game.i18n.localize(CONFIG.Item.typeLabels[item.type]);
    const action = new CrucibleAction({
      id: "equipItem",
      name: dropped ? `Drop ${typeLabel}` : `Un-equip ${typeLabel}`,
      img: item.img,
      cost: {action: ap},
      description: `${dropped ? "Drop" : "Un-equip"} the ${item.name}.`,
      target: {type: "self", scope: 1}
    }, {actor: this});

    const update = {_id: item.id, system: {equipped: false}};
    if ( dropped ) update.system.dropped = true;
    if ( item.type === "weapon" ) Object.assign(action.usage.actorStatus, {unequippedWeapon: true});
    Object.assign(action.usage.actorUpdates, {items: [update]});
    return action;
  }

  /* -------------------------------------------- */

  /**
   * Perform an action to equip or recover an Item.
   * @param {CrucibleItem} item       An item being equipped
   * @param {number|null} [slot]      A requested equipment slot in SYSTEM.WEAPON.SLOTS or null for natural weapons
   * @returns {CrucibleAction|null}
   */
  #equipItemAction(item, slot) {
    let ap = 1;
    if ( !item.system.dropped && item.system.properties.has("ambush") ) ap -= 1;

    // Create the action
    const typeLabel = game.i18n.localize(CONFIG.Item.typeLabels[item.type]);
    const action = new CrucibleAction({
      id: "equipItem",
      name: item.system.dropped ? `Recover ${typeLabel}` : `Equip ${typeLabel}`,
      img: item.img,
      cost: {action: ap},
      description: `${item.system.dropped ? "Recover the dropped" : "Equip the"} ${item.name}.`,
      target: {type: "self", scope: 1},
      tags: ["freehand"]
    }, {actor: this});

    // Equip the weapon as a follow-up actor update
    action.usage.actorUpdates ||= {};
    action.usage.actorUpdates.items ||= [];
    const update = {_id: item.id, system: {dropped: false, equipped: true}};
    if ( slot !== undefined ) update.slot = slot;
    action.usage.actorUpdates.items.push(update);
    return action;
  }

  /* -------------------------------------------- */

  /**
   * Test whether the Actor is able to equip a certain Item.
   * @param {CrucibleItem} item           The Item to be equipped, unequipped, or dropped
   * @param {CrucibleEquipItemOptions} [options] Options which configure how the Item is equipped
   * @returns {CrucibleEquipItemOptions}  The configured equipment result
   * @throws {Error}                      An error explaining why the weapon cannot be equipped
   */
  canEquipItem(item, {equipped=true, dropped=false, slot}={}) {
    if ( dropped ) equipped = false;
    const result = {equipped, dropped, slot};
    if ( equipped === item.system.equipped ) return result;
    switch ( item.type ) {
      case "weapon":
        if ( item.system.properties.has("natural") ) result.dropped = false;
        if ( equipped ) result.slot = this.#getAvailableWeaponSlot(item, slot);
        return result;
      case "armor":
        const {armor} = this.equipment;
        if ( equipped && armor.id ) {
          throw new Error(game.i18n.format("WARNING.CannotEquipSlotInUse", {
            actor: this.name,
            item: item.name,
            type: game.i18n.localize("TYPES.Item.armor")
          }));
        }
        if ( this.inCombat ) {
          throw new Error(game.i18n.format("WARNING.CannotEquipInCombat", {
            actor: this.name,
            item: item.name
          }));
        }
        result.slot = null;
        return result;
      case "accessory":
        const {accessories, accessorySlots} = this.equipment;
        if ( equipped && (accessories.length >= accessorySlots) ) {
          throw new Error(game.i18n.format("WARNING.CannotEquipSlotInUse", {
            actor: this.name,
            item: item.name,
            type: game.i18n.localize("TYPES.Item.accessory")
          }));
        }
        result.slot = null;
        return result;
      case "consumable":
        const {consumables, consumableSlots} = this.equipment;
        if ( equipped && (consumables.length === consumableSlots) ) {
          throw new Error(game.i18n.format("WARNING.CannotEquipSlotInUse", {
            actor: this.name,
            item: item.name,
            type: game.i18n.localize("TYPES.Item.accessory")
          }));
        }
        result.slot = null;
        return result;
    }
    throw new Error(`Items with type "${item.type}" are not equippable.`);
  }

  /* -------------------------------------------- */

  /**
   * Assert that the Actor is able to currently equip a certain Weapon.
   * @param {CrucibleItem} weapon     A weapon being equipped
   * @param {number} slot             A requested equipment slot in SYSTEM.WEAPON.SLOTS
   * @returns {number|null}           A numbered slot in SYSTEM.WEAPON.SLOTS where the weapon can be equipped.
   * @throws {Error}                  An error explaining why the weapon cannot be equipped
   */
  #getAvailableWeaponSlot(weapon, slot) {
    const category = weapon.config.category;
    const slots = SYSTEM.WEAPON.SLOTS;
    const {mainhand, offhand} = this.equipment.weapons;

    // Natural weapons don't require any slot
    if ( weapon.system.properties.has("natural") ) return null;

    // Identify the target equipment slot
    if ( slot === undefined ) {
      if ( category.hands === 2 ) slot = slots.TWOHAND;
      else if ( category.main ) slot = mainhand.id && category.off ? slots.OFFHAND : slots.MAINHAND;
      else if ( category.off ) slot = slots.OFFHAND;
    }

    // Confirm the target slot is available
    let occupied;
    switch ( slot ) {
      case slots.TWOHAND:
        if ( mainhand?.id ) occupied = mainhand;
        else if ( offhand?.id ) occupied = offhand;
        break;
      case slots.MAINHAND:
        if ( mainhand?.id ) occupied = mainhand;
        break;
      case slots.OFFHAND:
        if ( offhand?.id ) occupied = offhand;
        else if ( mainhand.config.category.hands === 2 ) occupied = mainhand;
        break;
    }

    // Throw an error if equipment is not possible
    if ( occupied ) throw new Error(game.i18n.format("WARNING.CannotEquipSlotInUse", {
      actor: this.name,
      item: weapon.name,
      type: game.i18n.localize(slots.label(slot))
    }));
    return slot;
  }

  /* -------------------------------------------- */
  /*  Flanking and Engagement                     */
  /* -------------------------------------------- */

  /**
   * Update the Flanking state of this Actor given a set of engaged Tokens.
   * @param {CrucibleTokenEngagement} engagement      The enemies and allies which this Actor currently has engaged.
   */
  async commitFlanking(engagement) {
    engagement ||= {flanked: 0};
    const flankedId = SYSTEM.EFFECTS.getEffectId("flanked");
    const flankedStage = engagement.flanked;
    const current = this.effects.get(flankedId);
    if ( flankedStage === current?.flags.crucible.flanked ) return;

    // Add flanked effect
    if ( flankedStage > 0 ) {
      const flankedData = {
        _id: flankedId,
        name: `${game.i18n.localize("ACTIVE_EFFECT.STATUSES.Flanked")} ${flankedStage}`,
        description: game.i18n.localize("ACTIVE_EFFECT.STATUSES.FlankedDescription"),
        icon: "systems/crucible/icons/statuses/flanked.svg",
        statuses: ["flanked"],
        flags: {
          crucible: {
            engagedEnemies: engagement.enemies.size,
            engagedAllies: engagement.allies.size,
            flanked: flankedStage
          }
        }
      };
      if ( current ) {
        if ( flankedData.name !== current.name ) {
          await current.update(flankedData);
          current._displayScrollingStatus(true);
        }
      }
      else await this.createEmbeddedDocuments("ActiveEffect", [flankedData], {keepId: true});
    }

    // Remove flanked effect
    else if ( current )  await current.delete();
  }

  /* -------------------------------------------- */
  /*  Currency Management                         */
  /* -------------------------------------------- */

  /**
   * Convert an amount of currency expressed in configured denominations into a numeric amount for data storage.
   * @param {Record<keyof crucible.CONFIG.currency, number>} amounts
   * @returns {number}
   */
  static convertCurrency(amounts={}) {
    if ( typeof amounts !== "object" ) {
      throw new Error("The amounts passed to CrucibleActor#convertCurrency must be an object");
    }
    let amount = 0;
    for ( const [k, v] of Object.entries(amounts) ) {
      const d = crucible.CONFIG.currency[k];
      if ( !d ) continue;
      amount += Math.round(v * d.multiplier);
    }
    return amount;
  }

  /* -------------------------------------------- */

  /**
   * Allocate an amount of currency into configured denominations, favoring larger denominations over smaller.
   * This function does not guarantee that the entire input amount is allocated. Depending on the configured
   * denominations which are available, there might be some unallocated remainder.
   * @param {number} amount
   * @returns {Record<keyof crucible.CONFIG.currency, number>}
   */
  static allocateCurrency(amount=0) {
    const allocated = {};
    const ds = Object.entries(crucible.CONFIG.currency).toSorted((a, b) => b[1].multiplier - a[1].multiplier);
    for ( const [k, v] of ds ) {
      allocated[k] = Math.floor(amount / v.multiplier);
      amount = (amount % v.multiplier);
    }
    return allocated;
  }

  /* -------------------------------------------- */

  /**
   * Modify the amount of currency owned by this actor by a certain amount.
   * The input amount can be provided either as a raw integer or as an object of currency denominations.
   * Returns the amount of currency that was added or subtracted.
   * @param {number|Record<keyof crucible.CONFIG.currency, number>} amounts
   * @returns {number}
   */
  async modifyCurrency(amounts) {
    const priorAmount = this.system.currency;
    const delta = typeof amounts === "number" ? amounts : this.constructor.convertCurrency(amounts);
    const currency = Math.max(priorAmount + delta, 0);
    await this.update({system: {currency}});
    return currency - priorAmount;
  }

  /* -------------------------------------------- */
  /*  Database Workflows                          */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    const updates = {};

    // Begin Character Creation
    if ( !this.pack && (this.type === "hero") && (this.level === 0) ) {
      foundry.utils.setProperty(updates, "flags.core.sheetClass", `crucible.${crucible.CONFIG.heroCreationSheet.name}`);
    }

    // Automatic Prototype Token configuration
    updates.prototypeToken = {bar1: {attribute: "resources.health"}, bar2: {attribute: "resources.morale"}};
    switch ( data.type ) {
      case "hero":
        Object.assign(updates.prototypeToken, {vision: true, actorLink: true, disposition: 1});
        break;
      case "adversary":
        Object.assign(updates.prototypeToken, {vision: false, actorLink: false, disposition: -1});
        break;
    }
    this.updateSource(updates);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preUpdate(data, options, user) {
    await super._preUpdate(data, options, user);
    if ( !["hero", "adversary"].includes(this.type) ) return;

    // Level changes
    const adv0 = this._source.system.advancement;
    const adv1 = data.system?.advancement;
    const levelChangeKeys = this.type === "hero" ? ["level"] : ["level", "rank"];
    const levelChange = !!adv1 && levelChangeKeys.some(k => (k in adv1) && (adv1[k] !== adv0[k]));

    // Ability score changes
    const abl1 = data.system?.abilities;
    const abilityChange = !!abl1 && Object.keys(SYSTEM.ABILITIES).some(k => !foundry.utils.isEmpty(abl1[k]));

    // Pre-simulate the changes
    if ( levelChange || abilityChange ) {
      const clone = this.clone();
      clone.updateSource(data);

      // Replenish resources
      if ( !this.inCombat ) foundry.utils.mergeObject(data, clone.#getRecoveryData());

      // Constrain milestones
      if ( levelChange && (this.type === "hero") ) {
        const l = SYSTEM.ACTOR.LEVELS[clone.level];
        if ( adv1.level > adv0.level ) adv1.milestones = l.milestones.start;
        else if ( adv1.level < adv0.level ) adv1.milestones = l.milestones.next - 1;
      }
    }
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _onUpdate(data, options, userId) {
    super._onUpdate(data, options, userId);

    // Locally display scrolling status updates
    this.#displayUpdateScrollingStatus(data, options.statusText);

    // Apply follow-up database changes only as the initiating user
    if ( game.userId === userId ) {
      this.#updateSize(data, options);
      this.#updatePace(data, options);
      this.#applyResourceStatuses(data);
    }

    // Update flanking
    if ( this._cachedResources ) {
      const {wasIncapacitated, wasBroken} = this._cachedResources || {};
      if ( (this.isIncapacitated !== wasIncapacitated) || (this.system.isBroken !== wasBroken) ) {
        const tokens = this.getActiveTokens(true);
        const activeGM = game.users.activeGM;
        const commit = (activeGM === game.user) && (activeGM?.viewedScene === canvas.id);
        for ( const token of tokens ) token.refreshFlanking(commit);
      }
      this.#updateCachedResources();
      this.#updateGroups();
    }

    // Refresh display of the active talent tree
    const tree = game.system.tree;
    if ( tree.actor === this ) {
      const talentChange = foundry.utils.hasProperty(data, "system.advancement.level") ||
        foundry.utils.hasProperty(data, "system.advancement.talentNodes") || ("items" in data);
      if ( talentChange ) tree.refresh();
    }
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _onCreateDescendantDocuments(...args) {
    super._onCreateDescendantDocuments(...args);
    const tree = game.system.tree;
    if ( tree.actor === this ) tree.refresh();
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _onDeleteDescendantDocuments(...args) {
    super._onDeleteDescendantDocuments(...args);
    const tree = game.system.tree;
    if ( tree.actor === this ) tree.refresh();
  }

  /* -------------------------------------------- */

  /**
   * Display status text updates above each Token for this Actor upon update.
   * @param {Partial<ActorData>} changed      Data for the Actor which changed
   * @param {Array<object>} statusText        Status text passed as part of updates
   */
  #displayUpdateScrollingStatus(changed, statusText) {
    const resources = changed.system?.resources || {};
    if ( !this._cachedResources ) return;
    const texts = [];

    // Display resource changes
    for ( let [resourceName, prior] of Object.entries(this._cachedResources ) ) {
      if ( resources[resourceName]?.value === undefined ) continue;
      const resource = SYSTEM.RESOURCES[resourceName];
      const attr = this.system.resources[resourceName];
      const delta = attr.value - prior;
      if ( delta === 0 ) continue;
      const text = `${delta.signedString()} ${resource.label}`;
      const pct = Math.clamp(Math.abs(delta) / attr.max, 0, 1);
      const fontSize = 32 + (64 * pct); // Range between [32, 64]
      const healSign = resource.type === "active" ? 1 : -1;
      const colorVariant = Math.sign(delta) === healSign ? "heal" : "high";
      const fillColor = resource.color instanceof Color ? resource.color : resource.color[colorVariant];
      texts.push({text, fontSize, fillColor});
    }

    // Add custom messages last
    if ( Array.isArray(statusText) ) texts.push(...statusText);
    else if ( statusText ) texts.push(statusText);

    // Display scrolling statuses
    this.displayScrollingText(texts);
  }

  /* -------------------------------------------- */

  /**
   * Display scrolling text above all Tokens for this Actor.
   */
  async displayScrollingText(texts, {delayMS=250, jitter=0.5}={}) {
    const tokens = this.getActiveTokens(true);
    if ( !tokens.length ) return;
    if ( !Array.isArray(texts) ) texts = [texts];
    for ( let text of texts ) {
      if ( typeof text === "string" ) text = {text};
      if ( !text.text ) continue;
      for ( const token of tokens ) {
        // noinspection ES6MissingAwait
        canvas.interface.createScrollingText(token.center, text.text, {
          anchor: CONST.TEXT_ANCHOR_POINTS.TOP,
          fontSize: text.fontSize || 32,
          fill: text.fillColor || 0xFFFFFF,
          stroke: 0x000000,
          strokeThickness: 4,
          jitter
        });
      }
      if ( delayMS ) await new Promise(resolve => window.setTimeout(resolve, delayMS));
    }
  }

  /* -------------------------------------------- */

  /**
   * Apply status effect changes when attribute pools change
   * @param {object} data     The data which changed
   * @returns {Promise<void>}
   * @private
   */
  async #applyResourceStatuses(data) {
    const r = data?.system?.resources || {};
    if ( ("health" in r) || ("wounds" in r) ) {
      await this.toggleStatusEffect("weakened", {active: this.system.isWeakened && !this.system.isDead });
      await this.toggleStatusEffect("dead", {active: this.system.isDead});
      await this.toggleStatusEffect("asleep", {active: false});
    }
    if ( ("morale" in r) || ("madness" in r) ) {
      await this.toggleStatusEffect("broken", {active: this.system.isBroken && !this.system.isInsane });
      await this.toggleStatusEffect("insane", {active: this.system.isInsane});
    }
  }

  /* -------------------------------------------- */

  /**
   * Update the size of Tokens for this Actor.
   * If the Actor is an unlinked ActorDelta, we only update it's specific Token.
   * Otherwise, we update the Actor's prototype token as well as all placed instances of the Actor's token.
   */
  async #updateSize(data, options) {
    if ( options._crucibleRelatedUpdate || (this.type === "group") ) return;
    const size = this.size;

    // Unlinked Token Actor
    if ( this.isToken ) {
      const token = this.token;
      if ( (token.width !== size) || (token.height !== size) ) {
        await token.update({width: size, height: size}, {_crucibleRelatedUpdate: true});
      }
      return;
    }

    // Linked Actor
    const pt = this.prototypeToken;
    if ( (pt.width === size) && (pt.height === size) ) return;
    await this.update({prototypeToken: {width: size, height: size}}, {_crucibleRelatedUpdate: true});

    // Update placed Tokens
    const sceneUpdates = {};
    for ( const token of this.getDependentTokens() ) {
      if ( (token.width !== size) || (token.height !== size) ) {
        sceneUpdates[token.parent.id] ||= [];
        sceneUpdates[token.parent.id].push({_id: token.id, width: size, height: size});
      }
    }
    for ( const [sceneId, updates] of Object.entries(sceneUpdates) ) {
      const scene = game.scenes.get(sceneId);
      if ( scene ) await scene.updateEmbeddedDocuments("Token", updates, {_crucibleRelatedUpdate: true});
    }
  }

  /* -------------------------------------------- */

  /**
   * If the travel pace of a group actor changed, update its token placements.
   */
  async #updatePace(data, options) {
    if ( !data.system?.movement?.pace || (this.type !== "group") || options._crucibleRelatedUpdate ) return;
    const pace = this.system.movement.pace;
    const sceneUpdates = {};
    for ( const token of this.getDependentTokens() ) {
      sceneUpdates[token.parent.id] ||= [];
      sceneUpdates[token.parent.id].push({_id: token.id, movementAction: pace});
    }
    for ( const [sceneId, updates] of Object.entries(sceneUpdates) ) {
      const scene = game.scenes.get(sceneId);
      if ( scene ) await scene.updateEmbeddedDocuments("Token", updates, {_crucibleRelatedUpdate: true});
    }
  }

  /* -------------------------------------------- */

  /**
   * Update cached resources for this Actor.
   */
  #updateCachedResources() {
    this._cachedResources ||= {};
    const resources = this.system.schema.get("resources");
    if ( !resources ) return;
    for ( const k in resources.fields ) this._cachedResources[k] = this._source.system.resources[k].value;
    this._cachedResources.wasIncapacitated = this.system.isIncapacitated;
    this._cachedResources.wasBroken = this.system.isBroken;
    return this._cachedResources;
  }

  /* -------------------------------------------- */

  /**
   * Update data for groups this Actor belongs to.
   */
  #updateGroups() {
    for ( const group of this._groups ) {
      if ( !group.system.actors.has(this) ) {
        this._groups.delete(group);
        continue;
      }
      group.sheet.render({force: false});
    }
  }

  /* -------------------------------------------- */
  /*  Rendering Helpers                           */
  /* -------------------------------------------- */

  /**
   * Prepare tags displayed about this Actor.
   * @param {"short"|"full"} scope
   * @returns {Record<string, string>}
   */
  getTags(scope="full") {
    return this.system.getTags?.(scope) || {};
  }

  /* -------------------------------------------- */

  /** @override */
  onEmbed(element) {
    Hooks.callAll("crucible.embedActor", this, element);
  }
}/**
 * An active effect subclass which handles system specific logic for active effects.
 */
class CrucibleActiveEffect extends foundry.documents.ActiveEffect {
  /**
   * The Handlebars template used to render this ActiveEffect as a line item for tooltips or as a partial.
   * @type {string}
   */
  static TOOLTIP_TEMPLATE = "systems/crucible/templates/tooltips/tooltip-active-effect.hbs";

  /* -------------------------------------------- */

  /**
   * Render this ActiveEffect as HTML for a tooltip card.
   * @returns {Promise<string>}
   */
  async renderCard() {
    await foundry.applications.handlebars.loadTemplates([this.constructor.TOOLTIP_TEMPLATE]);
    return foundry.applications.handlebars.renderTemplate(this.constructor.TOOLTIP_TEMPLATE, {
      effect: this,
      tags: this.getTags()
    });
  }

/* -------------------------------------------- */

  /**
   * Obtain an object of tags which describe the Effect.
   * @returns {EffectTags}
   */
  getTags() {
    const {startRound, rounds, turns} = this.duration;
    const elapsed = game.combat ? game.combat.round - startRound : 0;
    const pluralRules = new Intl.PluralRules(game.i18n.lang);
    const tags = {
      context: {section: "persistent"},
      activation: {}
    };
    // Status tooltip tags
    tags.statuses = this.statuses.reduce((obj, conditionId) => {
      const cfg = CONFIG.statusEffects.find(c => c.id === conditionId);
      if (cfg) obj[conditionId] = game.i18n.localize(cfg.name);
      return obj;
    }, {});

    // Turn-based duration
    if (Number.isFinite(turns)) {
      tags.context.section = "temporary";
      const remaining = turns - elapsed;
      tags.context.t = remaining;
      tags.activation.duration = `${remaining} ${game.i18n.localize(`COMBAT.DURATION.TURNS.${pluralRules.select(remaining)}`)}`;
    }

    // Round-based duration
    else if (Number.isFinite(rounds)) {
      tags.context.section = "temporary";
      const remaining = rounds - elapsed;
      tags.context.t = 1000000 * remaining;
      tags.activation.duration = `${remaining} ${game.i18n.localize(`COMBAT.DURATION.ROUNDS.${pluralRules.select(remaining)}`)}`;
    }

    // Persistent
    else {
      tags.context.t = Infinity;
      tags.activation.duration = "∞";
    }

    // Disabled Effects
    if ( this.disabled ) tags.context.section = "disabled";
    return tags;
  }
}/**
 * A ChatMessage document subclass that provides Crucible system-specific enhancements and operations.
 */
class CrucibleChatMessage extends ChatMessage {

  /* -------------------------------------------- */
  /*  Database Operations                         */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _onCreate(data, options, userId) {
    super._onCreate(data, options, userId);
    this.#autoConfirmMessage();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onUpdate(data, options, userId) {
    super._onUpdate(data, options, userId);
    const flags = this.flags.crucible || {};
    if ( flags.action && flags.vfxConfig && (data.flags.crucible.confirmed === true) ) this.#playVFXEffect();
  }

  /* -------------------------------------------- */

  /**
   * Play a VFX animation using data provided by this ChatMessage
   * @returns {Promise<void>}
   */
  async #playVFXEffect() {
    const action = CrucibleAction.fromChatMessage(this);
    if ( this.rolls.length && ("dice3d" in game) ) await game.dice3d.waitFor3DAnimationByMessageID(this.id);
    const {references, ...vfxConfig} = this.flags.crucible.vfxConfig;
    await action.playVFXEffect(vfxConfig, references);
  }

  /* -------------------------------------------- */

  /**
   * As the active GM, auto-confirm a CrucibleAction contained in a ChatMessage.
   * @returns {Promise<void>}
   */
  async #autoConfirmMessage() {
    if ( !game.users.activeGM?.isSelf ) return;
    const flags = this.flags.crucible || {};
    if ( !flags.action || flags.confirmed ) return;
    const action = CrucibleAction.fromChatMessage(this);
    const canConfirm = action?.canAutoConfirm();
    if ( !canConfirm ) return;
    if ( this.rolls.length && ("dice3d" in game) ) await game.dice3d.waitFor3DAnimationByMessageID(this.id);
    await CrucibleAction.confirmMessage(this, {action});
  }

  /* -------------------------------------------- */
  /*  Message Rendering                           */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async renderHTML(options) {
    const html = await super.renderHTML(options);
    if ( this.flags.crucible?.isInitiativeReport ) return html;
    if ( (this.rolls[0] instanceof StandardCheck) && !html.querySelector(".crucible.dice-roll") ) {
      let rollHTML = [];
      for ( const roll of this.rolls ) {
        rollHTML.push(await roll.render({isPrivate: !this.isContentVisible, message: this}));
      }
      const rolls = `<section class="dice-rolls">${rollHTML.join("")}</section>`;
      html.querySelector(".message-content").insertAdjacentHTML("beforeend", rolls);
    }
    return html;
  }

  /* -------------------------------------------- */

  /**
   * Custom alterations to apply when rendering chat message HTML.
   * Currently applied via the renderChatMessageHTML hook
   */
  static onRenderHTML(message, html, _messageData) {
    const flags = message.flags.crucible || {};
    if ( !foundry.utils.isEmpty(flags) || (message.rolls[0] instanceof crucible.api.dice.StandardCheck) ) {
      html.classList.add("crucible");
      html.querySelector(".message-content").classList.add("themed", "theme-dark");
    }

    // Action Cards
    if ( flags.action ) {
      const meta = html.querySelector(".message-metadata");
      if ( flags.confirmed ) {
        const target = html.querySelector(".damage-result .target");
        if ( target ) target.classList.add("applied");
        if ( meta ) meta.insertAdjacentHTML("afterbegin", `<i class="confirmed fa-solid fa-hexagon-check" data-tooltip="ACTION.Confirmed"></i>`);
      }
      else {
        if ( meta ) meta.insertAdjacentHTML("afterbegin", `<i class="unconfirmed fa-solid fa-hexagon-xmark" data-tooltip="ACTION.Unconfirmed"></i>`);
        if ( !game.user.isGM ) return;
        const confirm = foundry.utils.parseHTML(`<button class="confirm frame-brown" type="button"><i class="fas fa-hexagon-check"></i>Confirm</button>`);
        html.appendChild(confirm);
        confirm.addEventListener("click", event => {
          const button = event.currentTarget;
          button.disabled = true;
          button.firstElementChild.className = "fa-solid fa-spinner fa-spin";
          CrucibleAction.confirmMessage(message);
        });
      }
    }

    // Initiative Report
    if ( flags.isInitiativeReport ) {
      crucible.api.models.CrucibleCombatChallenge.onRenderInitiativeReport(message, html);
    }

    // Target Hover
    for ( const el of html.querySelectorAll(".target-link") ) {
      el.addEventListener("pointerover", onChatTargetLinkHover);
      el.addEventListener("pointerout", onChatTargetLinkHover);
    }
  }
}

/* -------------------------------------------- */

/**
 * Hover over chat target links to highlight the token of that target.
 * @param {MouseEvent} event      The originating pointer event
 * @returns {Promise<void>}
 */
async function onChatTargetLinkHover(event) {
  const link = event.currentTarget;
  const isActive = event.type === "pointerover";

  // Get the target Token object;
  const target = await fromUuid(link.dataset.uuid);
  if ( !target ) return; // Target no longer exists

  // Identify the token
  let token;
  if ( target instanceof TokenDocument ) {
    if ( !target.parent.isView ) return;
    token = target.object;
  } else {
    const tokens = target.getActiveTokens(true);
    if ( !tokens.length ) return;
    token = tokens[0];
  }

  // Toggle hover display
  if ( isActive ) token._onHoverIn(event, {hoverOutOthers: false});
  else token._onHoverOut(event);
}/**
 * A specialized subclass of the Combat document which implements system-specific mechanics.
 */
class CrucibleCombat extends foundry.documents.Combat {

  /* -------------------------------------------- */
  /*  Document Methods                            */
  /* -------------------------------------------- */

  /**
   * @override
   * FIXME bugfix for core https://github.com/foundryvtt/foundryvtt/issues/13095
   * This can be deleted when that bug is closed.
   */
  getCombatantsByActor(actor) {
    const isActor = actor instanceof foundry.documents.Actor;
    if ( isActor && actor.isToken ) return this.getCombatantsByToken(actor.token);
    const actorId = isActor ? actor.id : actor;
    return this.combatants.filter(c => c.actor?.id === actorId);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async previousRound() {
    if ( !game.user.isGM ) {
      ui.notifications.warn("COMBAT.WarningCannotChangeRound", {localize: true});
      return this;
    }
    return super.previousRound();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async nextRound() {
    if ( !game.user.isGM ) {
      ui.notifications.warn("COMBAT.WarningCannotChangeRound", {localize: true});
      return this;
    }
    return super.nextRound();
  }

  /* -------------------------------------------- */

  /** @override */
  _sortCombatants(a, b) {

    // Initiative first
    const aValue = Number.isNumeric(a.initiative) ? a.initiative : -Infinity;
    const bValue = Number.isNumeric(b.initiative) ? b.initiative : -Infinity;
    if ( aValue !== bValue ) return bValue - aValue;

    // Modifier second
    const aBonus = a.abilityBonus;
    const bBonus = b.abilityBonus;
    if ( aBonus !== bBonus ) return bBonus - aBonus;

    // Maximum Action
    const aMax = a.actor?.resources.action.max || 0;
    const bMax = b.actor?.resources.action.max || 0;
    if ( aMax !== bMax) return bMax - aMax;

    // Type
    const aType = a.actor?.type === "adversary" ? 1 : 0;
    const bType = b.actor?.type === "adversary" ? 1 : 0;
    return (bType - aType) || a.name.compare(b.name) || a._id.localeCompare(b._id);
  }

  /* -------------------------------------------- */
  /*  Database Update Workflows                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    if ( !("type" in data) ) this.updateSource({type: "combat", "==system": {}});
  }

  /* -------------------------------------------- */

  /** @override */
  async _preUpdate(data, options, user) {
    const advanceRound = ("round" in data) && (data.round > this.current.round);
    await super._preUpdate(data, options, user);
    if ( advanceRound && (this.type === "combat") ) await this.system.preUpdateRoundInitiative(data);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onUpdate(change, options, userId) {
    super._onUpdate(change, options, userId);
    if ( this.type === "combat" ) this.system.constructor.refreshCombatTracker();
  }


  /* -------------------------------------------- */

  /** @inheritDoc */
  _onDelete(options, userId) {
    super._onDelete(options, userId);
    const isGM = game.user.isActiveGM;
    const actorUpdates = [];
    const removeFlanking = [];
    for ( const {actor} of this.combatants ) {
      if ( !actor ) continue;
      if ( isGM ) {
        actorUpdates.push({_id: actor.id, "system.resources.heroism.value": 0});
        if ( actor.statuses.has("flanked") ) removeFlanking.push(actor);
      }
      actor.render(false);
    }
    if ( actorUpdates.length ) Actor.updateDocuments(actorUpdates);
    Promise.allSettled(removeFlanking.map(a => a.commitFlanking()));
  }

  /* -------------------------------------------- */

  /** @override */
  async _onStartTurn(combatant) {
    await super._onStartTurn(combatant);
    // TODO forward turn events to the system subtype
    return combatant.actor.onStartTurn();
  }

  /* -------------------------------------------- */

  /** @override */
  async _onStartRound(context) {
    await super._onStartRound(context);
    if ( this.turns.length < 2 ) return;

    // Identify the first combatant to act in the round
    const firstCombatant = this.turns[0];
    const firstActor = firstCombatant?.actor;

    // Identify the last non-incapacitated combatant to act in the round
    let lastCombatant;
    for ( let i=this.turns.length-1; i>0; i-- ) {
      if ( this.turns[i].actor?.isIncapacitated !== true ) {
        lastCombatant = this.turns[i];
        break;
      }
    }
    const lastActor = lastCombatant?.actor;

    // Impetus
    const impetusId = "impetus000000000";
    if ( firstActor?.talentIds.has(impetusId) ) {
      const impetus = {
        _id: impetusId,
        name: "Impetus",
        icon: "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        statuses: ["hastened"],
        duration: {
          combat: this.id,
          rounds: 1,
        }
      };
      if ( firstActor.effects.has(impetusId) ) await firstActor.updateEmbeddedDocuments("ActiveEffect", [impetus]);
      else await ActiveEffect.create(impetus, {parent: firstActor, keepId: true});
      firstCombatant.updateResource();
    }

    // Focused Anticipation TODO refactor elsewhere
    if ( firstActor?.talentIds.has("focusedanticipat") ) {
      const status = {text: "Focused Anticipation", fillColor: SYSTEM.RESOURCES.focus.color.css};
      await firstActor.alterResources({focus: 1}, {}, {statusText: [status]});
    }

    // Morale Escalation
    if ( this.round > 6 ) {
      await firstActor?.alterResources({morale: this.round}, {}, {statusText: [{text: "Escalation"}]});
      await lastActor?.alterResources({morale: -this.round}, {}, {statusText: [{text: "Escalation"}]});
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _onEndTurn(combatant) {
    await super._onEndTurn(combatant);
    await combatant.actor.onEndTurn();
    // FIXME determine whether these lines are still required
    combatant.updateResource();
    this.debounceSetup(); // TODO wish this wasn't needed
  }
}class CrucibleCombatant extends Combatant {

  /**
   * Conveniently retrieve the ability bonus that modifies a combatant's initiative.
   * @type {number}
   */
  get abilityBonus() {
    return this.actor?.getAbilityBonus(["dexterity", "intellect"]) || 0;
  }

  /* -------------------------------------------- */

  /** @override */
  getInitiativeRoll(formula) {
    const boons = {};
    const banes = {};
    const rollData = {ability: this.abilityBonus, skill: 0, enchantment: 0, boons, banes};
    if ( this.actor ) {
      if ( this.actor.isIncapacitated ) rollData.incapacitated = true;
      else if ( this.actor.statuses.has("unaware") ) rollData.unaware = true;

      // Boons and Banes
      const action = this.actor.system.resources.action.value;
      if ( this.parent.round && action ) boons.action = {label: "Reserved Action", number: action};
      const {weapons, armor} = this.actor.equipment;
      if ( weapons.slow ) banes.slow = {label: "Slow Weaponry", number: weapons.slow};
      if ( this.actor.statuses.has("broken") ) banes.broken = {label: "Broken", number: 2};
      if ( armor.system.properties.has("bulky") ) banes.bulky = {label: "Bulky Armor", number: 2};

      // Adversary Ranks
      if ( this.actor.type === "adversary" ) {
        const r = this.actor.system.advancement.rank;
        if ( r === "elite" ) boons.rank = {label: "Elite", number: 2};
        else if ( r === "boss" ) boons.rank = {label: "Boss", number: 4};
      }

      // Actor Hooks
      this.actor.callActorHooks("prepareStandardCheck", rollData);
      this.actor.callActorHooks("prepareInitiativeCheck", rollData);
    }
    return new InitiativeCheck(rollData);
  }

  /* -------------------------------------------- */

  /**
   * Get the maximum initiative values is eligible as a delay.
   * @returns {number|null}
   */
  getDelayMaximum() {
    const position = this.parent.turns.indexOf(this);
    const nextCombatant = this.parent.turns.find((c, i) => (i > position) && c.initiative);
    return nextCombatant ? nextCombatant.initiative - 1 : null;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onCreate(data, options, userId) {
    super._onCreate(data, options, userId);
    if ( this.actor ) {
      this.actor.reset();
      this.actor._sheet?.render(false);
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onDelete(options, userId) {
    super._onDelete(options, userId);
    if ( this.actor ) this.actor.onLeaveCombat();
  }
}/**
 * A Scene subclass which extends the base Scene document with some Crucible-specific functionalities.
 */
class CrucibleScene extends Scene {

  useMicrogrid = false;

  /** @inheritDoc */
  prepareBaseData() {
    if ( !(this.grid instanceof foundry.grid.BaseGrid) ) {
      const g = this._source.grid;
      if ( (g.type === CONST.GRID_TYPES.SQUARE) && (g.units === "ft") && (g.distance === 5) ) {
        this.useMicrogrid = true;
        this.grid.size = g.size / 5;
        this.grid.distance = 1;
      }
    }
    super.prepareBaseData();
  }

  /* -------------------------------------------- */

  /** @override */
  getDimensions() {
    const dimensions = super.getDimensions();
    if ( !this.useMicrogrid ) return dimensions;

    // Preserve scene positioning and offset using the source grid
    const {grid, width, height, padding} = this._source;
    const sourceGrid = new this.grid.constructor(grid);
    const sourceDimensions = sourceGrid.calculateDimensions(width, height, padding);
    const {x: sx, y: sy, width: sw, height: sh} = sourceDimensions;
    Object.assign(dimensions, {
      rect: new PIXI.Rectangle(0, 0, sw, sh),
      sceneRect: new PIXI.Rectangle(sx, sy, width, height),
      sceneX: sx,
      sceneY: sy
    });
    return dimensions;
  }

  /* -------------------------------------------- */

  /**
   * Assign the default Crucible grid configuration.
   * @returns {Promise<void>}
   */
  async configureDefaultGrid() {
    await this.update({
      grid: {
        distance: 5,
        units: "ft",
        style: "diamondPoints",
        thickness: 4,
        color: "#000000",
        opacity: 0.5
      }
    });
  }
}class CrucibleToken extends foundry.documents.TokenDocument {

  /**
   * Token size in grid squares.
   * @type {number}
   */
  get size() {
    return this.actor?.size ?? this.width;
  }

  /**
   * Does this Token represent a Group actor?
   * @type {boolean}
   */
  get isGroup() {
    return this.actor?.type === "group";
  }

  /** @override */
  static getTrackedAttributes(data, _path=[]) {
    return {
      bar: [
        ["resources", "health"],
        ["resources", "morale"],
        ["resources", "action"],
        ["resources", "focus"]
      ],
      value: []
    }
  }

  /* -------------------------------------------- */

  /** @override */
  _inferMovementAction() {
    return this.isGroup ? "normal" : "walk";
  }

  /* -------------------------------------------- */
  /*  Database Operations                         */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _onUpdate(change, options, userId) {
    super._onUpdate(change, options, userId);
    if ( this.isGroup && ("movementAction" in change) && (game.userId === userId) && !options._crucibleRelatedUpdate ) {
      this.actor.update({"system.movement.pace": change.movementAction}, {_crucibleRelatedUpdate: true});
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preUpdateMovement(movement, operation) {
    await super._preUpdateMovement(movement, operation);
    if ( !this.parent?.useMicrogrid ||          // Must be a crucible 1ft grid scene
      !this.actor?.inCombat ||                  // Must have an Actor in combat
      (movement.method !== "dragging") ||       // Must be a drag action
      movement.chain.length ) return;           // Must be the first segment

    // Verify that the movement cost is affordable and either prevent movement or record the total cost
    const {cost} = this.actor.getMovementActionCost(movement.passed.cost + movement.pending.cost);
    const isUnconstrained = game.user.isGM && ui.controls.controls.tokens.tools.unconstrainedMovement.active;
    if ( (cost > this.actor.resources.action.value) && !isUnconstrained ) {
      ui.notifications.warn(game.i18n.format("ACTION.WarningCannotAffordMove", {name: this.actor.name, cost,
        action: this.actor.actions.move.name}));
      return false;
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onUpdateMovement(movement, operation, user) {
    super._onUpdateMovement(movement, operation, user);
    if ( !user.isSelf ||                        // Must be the user who initiated movement
      !this.parent?.useMicrogrid ||             // Must be a crucible 1ft grid scene
      !this.actor?.inCombat ||                  // Must have an Actor in combat
      (movement.method !== "dragging") ||       // Must be a drag action
      movement.chain.length ) return;           // Must be the first segment
    const actions = new Set();
    for ( const w of movement.passed.waypoints ) actions.add(w.action);
    for ( const w of movement.pending.waypoints ) actions.add(w.action);
    this.actor.useMove(movement.passed.cost + movement.pending.cost, {dialog: false, movement: movement, actions});
  }
}var documents=/*#__PURE__*/Object.freeze({__proto__:null,CrucibleActiveEffect:CrucibleActiveEffect,CrucibleActor:CrucibleActor,CrucibleChatMessage:CrucibleChatMessage,CrucibleCombat:CrucibleCombat,CrucibleCombatant:CrucibleCombatant,CrucibleItem:CrucibleItem,CrucibleScene:CrucibleScene,CrucibleToken:CrucibleToken});/**
 * @typedef CrucibleActorEquipment
 * @property {CrucibleItem} armor
 * @property {CrucibleActorEquippedWeapons} weapons
 * @property {CrucibleItem[]} accessories
 * @property {number} accessorySlots
 * @property {number} consumableSlots
 * @property {boolean} canFreeMove
 * @property {boolean} unarmored
 */

/**
 * @typedef CrucibleActorEquippedWeapons
 * @property {CrucibleItem} mainhand
 * @property {CrucibleItem} offhand
 * @property {number} freeHands
 * @property {number} spellHands
 * @property {boolean} unarmed
 * @property {boolean} shield
 * @property {boolean} twoHanded
 * @property {boolean} melee
 * @property {boolean} ranged
 * @property {boolean} dualWield
 * @property {boolean} dualMelee
 * @property {boolean} dualRanged
 * @property {boolean} slow
 */

/**
 * @typedef CrucibleActorSkill
 * @property {number} rank
 * @property {number} abilityBonus
 * @property {number} skillBonus
 * @property {number} enchantmentBonus
 * @property {number} score
 * @property {number} passive
 */

/**
 * @typedef CrucibleActorGrimoire
 * @property {Set<CrucibleSpellcraftRune>} runes
 * @property {Set<CrucibleSpellcraftGesture>} gestures
 * @property {Set<CrucibleSpellcraftInflection>} inflections
 * @property {number} iconicSlots
 * @property {CrucibleItem[]} iconicSpells
 */

/**
 * This class defines data schema, methods, and properties shared by all Actor subtypes in the Crucible system.
 */
class CrucibleBaseActor extends foundry.abstract.TypeDataModel {

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /**
   * Define shared schema elements used by every Actor sub-type in Crucible.
   * This method is extended by subclasses to add type-specific fields.
   * @override
   */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = {required: true, nullable: false, integer: true};
    const schema = {};

    // Ability Scores
    schema.abilities = new fields.SchemaField(Object.values(SYSTEM.ABILITIES).reduce((obj, ability) => {
      obj[ability.id] = new fields.SchemaField({
        base: new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 3}),
        increases: new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 12}),
        bonus: new fields.NumberField({...requiredInteger, initial: 0, min: 0})
      }, {label: ability.label});
      return obj;
    }, {}));

    // Defenses
    schema.defenses = new fields.SchemaField(Object.values(SYSTEM.DEFENSES).reduce((obj, defense) => {
      if ( defense.id !== "physical" ) obj[defense.id] = new fields.SchemaField({
        bonus: new fields.NumberField({...requiredInteger, initial: 0})
      }, {label: defense.label});
      return obj;
    }, {}));

    // Resistances
    schema.resistances = new fields.SchemaField(Object.values(SYSTEM.DAMAGE_TYPES).reduce((obj, damageType) => {
      obj[damageType.id] = new fields.SchemaField({
        bonus: new fields.NumberField({...requiredInteger, initial: 0})
      }, {label: damageType.label});
      return obj;
    }, {}));

    // Resource Pools
    schema.resources = new fields.SchemaField(Object.values(SYSTEM.RESOURCES).reduce((obj, resource) => {
      obj[resource.id] = new fields.SchemaField({
        value: new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: resource.max})
      }, {label: resource.label});
      return obj
    }, {}));

    // Movement Attributes
    schema.movement = new fields.SchemaField({
      sizeBonus: new fields.NumberField({...requiredInteger, initial: 0}),
      strideBonus: new fields.NumberField({...requiredInteger, initial: 0}),
      engagementBonus: new fields.NumberField({...requiredInteger, initial: 0})
    });

    // Currency
    schema.currency = new fields.NumberField({...requiredInteger, min: 0, initial: 0});

    // Status
    schema.status = new fields.ObjectField({nullable: true, initial: null});
    schema.favorites = new fields.SetField(new fields.StringField({blank: false}));
    return schema;
  }

  /** @override */
  static LOCALIZATION_PREFIXES = ["ACTOR"];

  /* -------------------------------------------- */
  /*  Derived Data Attributes                     */
  /* -------------------------------------------- */

  /**
   * Track the Actions which this Actor has available to use
   * @type {Object<string, CrucibleAction>}
   */
  actions = this["actions"];

  /**
   * Actor hook functions which apply to this Actor.
   * @type {Object<string, {item: CrucibleItem, fn: Function}[]>}
   */
  actorHooks = this["actorHooks"];

  /**
   * Track the Items which are currently equipped for the Actor.
   * @type {CrucibleActorEquipment}
   */
  equipment = this["equipment"];

  /**
   * The grimoire of known spellcraft components.
   * @type {CrucibleActorGrimoire}
   */
  grimoire = this["grimoire"];

  /**
   * A set of Talent IDs which cannot be removed from this Actor because they come from other sources.
   * @type {Set<string>}
   */
  permanentTalentIds = this["permanentTalentIds"];

  /**
   * Temporary roll bonuses this actor has outside the fields of its data model.
   * @type {{[damage]: Object<string, number>, [boons]: Object<string, DiceBoon>, [banes]: Object<string, DiceBoon>}}
   */
  rollBonuses = this["rollBonuses"];

  /**
   * Prepared skill data for the Actor.
   * @type {Record<string, CrucibleActorSkill>}
   */
  skills = this["skills"];

  /**
   * The IDs of purchased talents.
   * @type {Set<string>}
   */
  talentIds = this["talentIds"];

  /**
   * The Talents owned by this Actor, organized according to node of the talent tree.
   * @type {Record<string, Set<string>>}
   */
  talentNodes = this["talentNodes"];

  /**
   * Prepared training data for the Actor.
   * @type {Record<keyof TRAINING_TYPES, 0|1|2|3>}
   */
  training = this["training"];

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Is this Actor weakened?
   * @type {boolean}
   */
  get isWeakened() {
    return this.resources.health.value === 0;
  }

  /**
   * Is this Actor broken?
   * @type {boolean}
   */
  get isBroken() {
    return this.resources.morale.value === 0;
  }

  /**
   * Is this Actor dead?
   * @type {boolean}
   */
  get isDead() {
    return this.resources.wounds.value === this.resources.wounds.max;
  }

  /**
   * Is this Actor incapacitated and unable to act?
   * @type {boolean}
   */
  get isIncapacitated() {
    const statuses = this.parent.statuses;
    return this.isDead || statuses.has("unconscious") || statuses.has("paralyzed") || statuses.has("asleep");
  }

  /**
   * Is this Actor insane?
   * @type {boolean}
   */
  get isInsane() {
    return this.resources.madness.value === this.resources.madness.max;
  }

  /**
   * Does the Actor currently have a free move available?
   * @returns {boolean}
   */
  get hasFreeMove() {
    return this.equipment.canFreeMove && !this.parent.status.hasMoved;
  }

  /* -------------------------------------------- */
  /*  Base Data Preparation                       */
  /* -------------------------------------------- */

  /**
   * Base data preparation workflows for each Actor subtype.
   * @override
   */
  prepareBaseData() {
    this.#clear();
    this._prepareDetails();
    this._prepareAbilities();
    this._prepareBaseMovement();
  }

  /* -------------------------------------------- */

  /**
   * Clear derived Actor data, preserving references to existing objects.
   */
  #clear() {
    const createOrEmpty = name => {
      this[name] ||= {};
      for ( const k in this[name] ) delete this[name][k];
    };
    const objects = ["actions", "actorHooks", "equipment", "rollBonuses", "talentNodes", "training", "skills"];
    for ( const name of objects ) createOrEmpty(name);
    this.talentIds ||= new Set();
    this.talentIds.clear();
    this.grimoire ||= {runes: new Set(), gestures: new Set(), inflections: new Set(), iconicSlots: 0, iconicSpells: []};
    this.grimoire.runes.clear();
    this.grimoire.gestures.clear();
    this.grimoire.inflections.clear();
    this.grimoire.iconicSlots = 0;
    this.grimoire.iconicSpells.length = 0;
    this.permanentTalentIds ||= new Set();
    this.permanentTalentIds.clear();
    Object.assign(this.rollBonuses, {damage: {}, boons: {}, banes: {}});
    if ( this.status === null ) this.status = {};
  }

  /* -------------------------------------------- */

  /**
   * Prepare basic movement attributes for all Actor subtypes.
   * @protected
   */
  _prepareBaseMovement() {}

  /* -------------------------------------------- */

  /**
   * Prepare creature details for all Actor subtypes.
   * @protected
   */
  _prepareDetails() {}

  /* -------------------------------------------- */

  /**
   * Prepare ability scores for all Actor subtypes.
   * @protected
   */
  _prepareAbilities() {}

  /* -------------------------------------------- */
  /*  Embedded Document Preparation               */
  /* -------------------------------------------- */

  /**
   * Prepare data which depends on prepared embedded Item documents for this Actor subtype.
   * @param {Record<string, CrucibleItem[]>} items
   */
  prepareItems(items) {

    // Acquired talents, training, skills, and spellcraft
    this.#prepareTalents(items.talent);
    this._prepareTraining();
    this.#prepareSkills();
    this.#prepareSpells(items.spell);

    // Current equipment
    this._prepareEquipment(items);

    // Defenses based on current equipment
    this.#preparePhysicalDefenses();
    this.#prepareSaveDefenses();
    this.#prepareHealingThresholds();
  }

  /* -------------------------------------------- */

  /**
   * Prepare owned Talent items that the Actor has unlocked
   * @param {CrucibleItem[]} talents
   */
  #prepareTalents(talents) {
    const details = this.details;
    const signatureNames = new Set();

    // Identify permanent talents from a background, taxonomy, archetype, etc...
    const permanentTalentSources = [details.ancestry, details.background, details.taxonomy, details.archetype];
    const maybePermanentTalentIds = new Set();
    for ( const s of permanentTalentSources ) {
      if ( s?.talents ) {
        for ( const uuid of s.talents ) {
          const {documentId} = foundry.utils.parseUuid(uuid);
          maybePermanentTalentIds.add(documentId);
        }
      }
      if ( s?.skills ) {
        for ( const skillId of s.skills ) {
          const {documentId} = foundry.utils.parseUuid(SYSTEM.SKILLS[skillId]?.talents[1]);
          maybePermanentTalentIds.add(documentId);
        }
      }
    }

    // Iterate over talents
    for ( const t of talents ) {
      this.talentIds.add(t.id);
      if ( maybePermanentTalentIds.has(t.id) ) this.permanentTalentIds.add(t.id);
      const {nodes, training, gesture, inflection, rune, iconicSpells} = t.system;

      // Register hooks
      this.#registerActorHooks(t);

      // Register nodes
      for ( const node of nodes ) {
        this.talentNodes[node.id] ||= new Set();
        this.talentNodes[node.id].add(t.id);
        if ( node.type === "signature" ) signatureNames.add(t.name);
      }

      // Register training ranks
      if ( training.type ) {
        this.training[training.type] ??= 0;
        this.training[training.type] = Math.max(this.training[training.type], training.rank ?? 0);
      }

      // Register spellcraft knowledge
      if ( rune ) {
        this.grimoire.runes.add(SYSTEM.SPELL.RUNES[rune]);
        this.grimoire.gestures.add(SYSTEM.SPELL.GESTURES.touch);
      }
      if ( gesture ) this.grimoire.gestures.add(SYSTEM.SPELL.GESTURES[gesture]);
      if ( inflection ) this.grimoire.inflections.add(SYSTEM.SPELL.INFLECTIONS[inflection]);
      if ( iconicSpells ) this.grimoire.iconicSlots += iconicSpells;
    }

    // Compose Signature Name
    details.signatureName = Array.from(signatureNames).sort((a, b) => a.localeCompare(b)).join(" ");
  }

  /* -------------------------------------------- */

  /**
   * Prepare training ranks granted by owned talents or other features.
   * @protected
   */
  _prepareTraining() {}

  /* -------------------------------------------- */

  /**
   * Prepare skills data for all Actor subtypes.
   */
  #prepareSkills() {
    for ( const [skillId, config] of Object.entries(SYSTEM.SKILLS) ) {
      this.skills[skillId] = this.#prepareSkill(config);
    }
  }

  /* -------------------------------------------- */

  /**
   * Prepare iconic spells known by this Actor.
   * @param {CrucibleItem[]} spells
   */
  #prepareSpells(spells) {
    for ( const spell of spells ) {
      spell.system.isKnown = spell.system.canKnowSpell(this.grimoire);
      this.grimoire.iconicSpells.push(spell);
      this.#registerActorHooks(spell);
    }
  }

  /* -------------------------------------------- */

  /**
   * Classify the Items in the Actor's inventory to identify current equipment.
   * @param {Record<string, CrucibleItem[]>} items
   * @protected
   */
  _prepareEquipment(items) {
    this.equipment.accessorySlots ??= 3;
    this.equipment.consumableSlots ??= 3;

    // Prepare and configure equipment
    const armor = this._prepareArmor(items.armor);
    const weapons = this._prepareWeapons(items.weapon);
    const accessories = this._prepareAccessories(items.accessory, this.equipment.accessorySlots);
    const consumables = this._prepareConsumables(items.consumable, this.equipment.consumableSlots);
    const canFreeMove = this.#canFreeMove(armor);
    const unarmored = armor.system.category === "unarmored";
    Object.assign(this.equipment, {armor, weapons, accessories, consumables, canFreeMove, unarmored});

    // Register actor hooks for equipped items
    this.#registerActorHooks(armor);
    if ( weapons.mainhand ) this.#registerActorHooks(weapons.mainhand);
    if ( weapons.offhand ) this.#registerActorHooks(weapons.offhand);
    for ( const a of accessories ) this.#registerActorHooks(a);
  }

  /* -------------------------------------------- */

  /**
   * Prepare the accessory Items that this Actor has equipped.
   * @param {CrucibleItem[]} accessoryItems   The accessory type Items in the Actor's inventory
   * @param {number} slots                    The maximum allowed accessory slots
   * @returns {CrucibleItem[]}                The accessory Items which are equipped
   * @protected
   */
  _prepareAccessories(accessoryItems, slots) {
    let equipped = accessoryItems.filter(i => i.system.equipped);
    if ( equipped.length > slots ) {
      console.warn(`Crucible | Actor [${this.parent.uuid}] ${this.name} has more than ${slots} equipped accessories.`);
      equipped = equipped.slice(0, slots);
    }
    return equipped;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the Armor item that this Actor has equipped.
   * @param {CrucibleItem[]} armorItems       The armor type Items in the Actor's inventory
   * @returns {CrucibleItem}                  The armor Item which is equipped
   * @private
   */
  _prepareArmor(armorItems) {
    let armors = armorItems.filter(i => i.system.equipped);
    if ( armors.length > 1 ) {
      console.warn(`Crucible | Actor [${this.parent.uuid}] ${this.name} has more than one equipped armor.`);
      armors = armors[0];
    }
    return armors[0] || crucible.api.models.CrucibleArmorItem.getUnarmoredArmor(this.parent);
  }

  /* -------------------------------------------- */

  /**
   * Prepare the consumable Items that this Actor has equipped.
   * @param {CrucibleItem[]} consumableItems  The consumable type Items in the Actor's inventory
   * @param {number} slots                    The maximum allowed consumable slots
   * @returns {CrucibleItem[]}                The consumable Items which are equipped
   * @protected
   */
  _prepareConsumables(consumableItems, slots) {
    let equipped = consumableItems.filter(i => i.system.equipped);
    if ( equipped.length > slots ) {
      console.warn(`Crucible | Actor [${this.parent.uuid}] ${this.name} has more than ${slots} equipped consumables.`);
      equipped = equipped.slice(0, slots);
    }
    return equipped;
  }

  /* -------------------------------------------- */

  /**
   * Determine whether the Actor is able to use a free move once per round.
   * @param {CrucibleItem} armor    The equipped Armor item.
   * @returns {boolean}             Can the Actor use a free move?
   */
  #canFreeMove(armor) {
    if ( this.isWeakened ) return false;
    const statuses = this.parent.statuses;
    if ( statuses.has("prone") || statuses.has("slowed") ) return false;
    return (armor.system.category !== "heavy") || this.talentIds.has("armoredefficienc");
  }

  /* -------------------------------------------- */

  /**
   * Prepare the Armor item that this Actor has equipped.
   * @param {CrucibleItem[]} weaponItems      The Weapon type Items in the Actor's inventory
   * @returns {CrucibleActorEquippedWeapons}  The currently equipped weaponry for the Actor
   * @private
   */
  _prepareWeapons(weaponItems) {
    const slotInUse = (item, type) => {
      item.updateSource({"system.equipped": false});
      const w = game.i18n.format("WARNING.CannotEquipSlotInUse", {actor: this.parent.name, item: item.name, type});
      console.warn(w);
    };

    // Identify equipped weapons which may populate weapon slots
    const equippedWeapons = {mh: [], oh: [], either: [], natural: []};
    const slots = SYSTEM.WEAPON.SLOTS;
    for ( let w of weaponItems ) {
      const {equipped, slot, properties} = w.system;
      if ( !equipped ) continue;
      if ( properties.has("natural") ) equippedWeapons.natural.unshift(w);
      else if ( [slots.MAINHAND, slots.TWOHAND].includes(slot) ) equippedWeapons.mh.unshift(w);
      else if ( slot === slots.OFFHAND ) equippedWeapons.oh.unshift(w);
      else if ( slot === slots.EITHER ) equippedWeapons.either.unshift(w);
    }
    equippedWeapons.either.sort((a, b) => b.system.damage.base - a.system.damage.base);
    equippedWeapons.natural.sort((a, b) => b.system.damage.base - a.system.damage.base);

    // Assign weapons to equipment slots
    const weapons = {natural: equippedWeapons.natural};
    let mhOpen = true;
    let ohOpen = true;

    // Mainhand Weapon
    for ( const w of equippedWeapons.mh ) {
      if ( !mhOpen ) slotInUse(w, "mainhand");
      else {
        weapons.mainhand = w;
        mhOpen = false;
        if ( w.system.slot === slots.TWOHAND ) ohOpen = false;
      }
    }

    // Offhand Weapon
    for ( const w of equippedWeapons.oh ) {
      if ( !ohOpen ) slotInUse(w, "offhand");
      else {
        weapons.offhand = w;
        ohOpen = false;
      }
    }

    // Either-hand Weapons
    for ( const w of equippedWeapons.either ) {
      if ( mhOpen ) {
        weapons.mainhand = w;
        w.system.slot = slots.MAINHAND;
        mhOpen = false;
      }
      else if ( ohOpen ) {
        weapons.offhand = w;
        w.system.slot = slots.OFFHAND;
        ohOpen = false;
      }
      else slotInUse(w, "mainhand");
    }

    // Final weapon preparation
    if ( !weapons.mainhand && mhOpen ) weapons.mainhand = this._getUnarmedWeapon();
    const mh = weapons.mainhand;
    const mhCategory = mh?.config.category || {};
    if ( !weapons.offhand && ohOpen ) weapons.offhand =  mhCategory.hands < 2 ? this._getUnarmedWeapon() : null;
    const oh = weapons.offhand;
    const ohCategory = oh?.config.category || {};
    mh?.system.prepareEquippedData();
    oh?.system.prepareEquippedData();
    for ( const n of weapons.natural ) n.system.prepareEquippedData();

    // Weapon Set Metadata
    weapons.shield = (ohCategory.id === "shieldLight") || (ohCategory.id === "shieldHeavy");
    weapons.twoHanded = weapons.mainhand?.system.slot === slots.TWOHAND;
    weapons.melee = !(mhCategory.ranged && ohCategory.ranged);
    weapons.ranged = mhCategory.ranged || ohCategory.ranged;
    weapons.talisman = false;

    // Free Hand or Unarmed
    weapons.unarmed = (mhCategory?.id === "unarmed") && (ohCategory?.id === "unarmed");
    weapons.freeHands = weapons.spellHands = mhOpen + ohOpen;
    if ( ["talisman1", "talisman2"].includes(mhCategory.id) ) {
      weapons.spellHands += mhCategory.hands;
      weapons.talisman = true;
    }
    if ( "talisman1" === ohCategory.id ) {
      weapons.spellHands += 1;
      weapons.talisman = true;
    }

    // Multi weapon properties

    weapons.dualWield = weapons.unarmed || (mh?.id && oh?.id && !weapons.shield);
    weapons.dualMelee = weapons.dualWield && !mhCategory.ranged && !ohCategory.ranged;
    weapons.dualRanged = weapons.dualWield && mhCategory.ranged && ohCategory.ranged;
    weapons.hasChoice = weapons.dualWield || (weapons.natural.length > 0) || (weapons.melee && weapons.ranged);

    // Special Properties
    weapons.reload = mhCategory.reload || ohCategory.reload;
    weapons.slow = mh?.system.properties.has("oversized") ? 1 : 0;
    weapons.slow += oh?.system.properties.has("oversized") ? 1 : 0;
    return weapons;
  }

  /* -------------------------------------------- */

  /**
   * Get the default unarmed weapon used by this Actor if they do not have other weapons equipped.
   * @returns {CrucibleItem}
   */
  _getUnarmedWeapon() {
    const itemCls = getDocumentClass("Item");
    const data = foundry.utils.deepClone(SYSTEM.WEAPON.UNARMED_DATA);
    if ( this.talentIds.has("martialartist000") ) data.system.quality = "fine";
    const unarmed = new itemCls(data, {parent: this.parent});
    unarmed.prepareData(); // Needs to be explicitly called since we are in the middle of Actor preparation
    return unarmed;
  }

  /* -------------------------------------------- */

  /**
   * Prepare Physical Defenses.
   */
  #preparePhysicalDefenses() {
    const {equipment} = this.parent;
    const {abilities, defenses} = this;

    // Armor and Dodge from equipped Armor
    const armorData = equipment.armor.system;
    defenses.armor.base = armorData.armor.base;
    defenses.armor.bonus = armorData.armor.bonus;
    defenses.dodge.base = armorData.dodge.base;
    defenses.dodge.bonus = Math.max(abilities.dexterity.value - armorData.dodge.scaling, 0);
    defenses.dodge.max = defenses.dodge.base + (12 - armorData.dodge.scaling);

    // Block and Parry from equipped Weapons
    const weaponData = [];
    if ( equipment.weapons.mainhand ) weaponData.push(equipment.weapons.mainhand.system);
    if ( equipment.weapons.offhand ) weaponData.push(equipment.weapons.offhand.system);
    defenses.block = {base: 0, bonus: 0};
    defenses.parry = {base: 0, bonus: 0};
    for ( let wd of weaponData ) {
      for ( let d of ["block", "parry"] ) {
        defenses[d].base += wd.defense[d];
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Prepare non-physical defenses.
   */
  #prepareSaveDefenses() {
    const {equipment, talentIds} = this.parent;

    // Defense base is the system passive base of 12
    const base = SYSTEM.PASSIVE_BASE;
    const penalty = Math.min(this.advancement.level, 0);

    // Prepare save defenses
    for ( let [k, sd] of Object.entries(SYSTEM.DEFENSES) ) {
      if ( sd.type !== "save" ) continue;
      let d = this.defenses[k];
      d.base = base;
      if ( !this.parent.isIncapacitated ) d.base += this.parent.getAbilityBonus(sd.abilities);
      d.bonus = penalty;
      if ( (k !== "fortitude") && talentIds.has("monk000000000000") && equipment.unarmored ) d.bonus += 2; // TODO move to talent hooks
    }
  }

  /* -------------------------------------------- */

  /**
   * Prepare healing thresholds for Wounds and Madness.
   */
  #prepareHealingThresholds() {
    const defenses = this.defenses;
    defenses.wounds = {base: SYSTEM.PASSIVE_BASE, bonus: 0};
    defenses.madness = {base: SYSTEM.PASSIVE_BASE, bonus: 0};
  }

  /* -------------------------------------------- */
  /*  Derived Data Preparation                    */
  /* -------------------------------------------- */

  /**
   * Derived data preparation workflows for each Actor subtype.
   * @override
   */
  prepareDerivedData() {

    // Movement and Size
    this._prepareMovement();
    this.parent.callActorHooks("prepareMovement", this.movement);

    // Resource pools
    this._prepareResources();
    this.parent.callActorHooks("prepareResources", this.resources);

    // Defenses
    this.parent.callActorHooks("prepareDefenses", this.defenses);
    this.#prepareTotalDefenses();

    // Resistances
    this.parent.callActorHooks("prepareResistances", this.resistances);
    this.#prepareTotalResistances();

    // Actions
    this.#prepareActions();
    this.parent.callActorHooks("prepareActions", this.actions);
  }

  /* -------------------------------------------- */

  /**
   * Prepare a single Skill.
   * @param {CrucibleSkillConfig} config    System configuration data of the skill being configured
   * @returns {CrucibleActorSkill}
   */
  #prepareSkill(config) {
    const rank = this.training[config.id] ?? 0;
    const abilityBonus = this.parent.getAbilityBonus(config.abilities);
    const skillBonus = SYSTEM.TALENT.TRAINING_RANK_VALUES[rank].bonus;
    const enchantmentBonus = 0;
    const score = abilityBonus + skillBonus + enchantmentBonus;
    const passive = SYSTEM.PASSIVE_BASE + score;
    return {rank, abilityBonus, skillBonus, enchantmentBonus, score, passive};
  }

  /* -------------------------------------------- */

  /**
   * Preparation of resource pools for all Actor subtypes.
   * @protected
   */
  _prepareResources() {
    const {isIncapacitated, isWeakened} = this;
    const statuses = this.parent.statuses;
    const {level, threat, threatFactor, maxAction=6} = this.advancement;
    const r = this.resources;
    const a = this.abilities;

    // Health and Morale
    const levelBase = Math.max(level, 1) * 6;
    const levelMultiplier = level < 1 ? threat : threatFactor;
    r.health.max = Math.ceil((levelBase + (4 * a.toughness.value) + (2 * a.strength.value)) * levelMultiplier);
    r.health.value = Math.clamp(r.health.value, 0, r.health.max);
    r.morale.max = Math.ceil((levelBase + (4 * a.presence.value) + (2 * a.wisdom.value)) * levelMultiplier);
    r.morale.value = Math.clamp(r.morale.value, 0, r.morale.max);

    // Action
    r.action.max = maxAction + (r.action.bonus || 0);
    if ( statuses.has("stunned") ) r.action.max -= 4;
    else if ( statuses.has("staggered") ) r.action.max -= 2;
    if ( statuses.has("hastened") ) r.action.max += 1;
    if ( isWeakened ) r.action.max -= 2;
    if ( isIncapacitated ) r.action.max = 0;
    r.action.max = Math.max(r.action.max, 0);
    r.action.value = Math.clamp(r.action.value, 0, r.action.max);

    // Focus
    const threatFocus = {1.5: 1, 2: 2}[threatFactor] || 0;
    r.focus.max = Math.ceil((a.wisdom.value + a.presence.value + a.intellect.value) / 2) + threatFocus;
    r.focus.value = Math.clamp(r.focus.value, 0, r.focus.max);

    // Heroism
    r.heroism.max = 3;
    r.heroism.value = Math.clamp(r.heroism.value, 0, 3);
  }

  /* -------------------------------------------- */

  /**
   * Compute total defenses as base + bonus.
   */
  #prepareTotalDefenses() {
    const {defenses, resources} = this;
    const {isIncapacitated, statuses} = this.parent;

    // Healing thresholds based on wounds and madness
    const wounds = resources.wounds?.value ?? ((resources.health.max - resources.health.value) * 2);
    const madness = resources.madness?.value ?? ((resources.morale.max - resources.morale.value) * 2);
    defenses.wounds.base += Math.floor(wounds / 10);
    defenses.madness.base += Math.floor(madness / 10);

    // Status effects which affect defenses
    if ( statuses.has("exposed") ) defenses.armor.base = Math.max(defenses.armor.base - 2, 0);

    // Compute defense totals
    for ( const defense of Object.values(defenses) ) {
      defense.total = defense.base + defense.bonus;
    }

    // Cannot parry or block while enraged
    if ( statuses.has("enraged") ) defenses.parry.total = defenses.block.total = 0;
    if ( statuses.has("exhausted") ) {
      defenses.dodge.total = Math.ceil(defenses.dodge.total / 2);
      defenses.reflex.total = Math.ceil(defenses.reflex.total / 2);
    }

    // Cannot dodge, block, or parry while incapacitated
    if ( isIncapacitated ) defenses.dodge.total = defenses.parry.total = defenses.block.total = 0;

    // Aggregate total Physical Defense
    defenses.physical = {
      total: defenses.armor.total + defenses.dodge.total + defenses.parry.total + defenses.block.total
    };
  }

  /* -------------------------------------------- */

  /**
   * Preparation of resistances for all Actor subtypes.
   */
  #prepareTotalResistances() {
    for ( const r of Object.values(this.resistances) ) r.total = r.base + r.bonus;
  }

  /* -------------------------------------------- */

  /**
   * Preparation of derived movement for all Actor subtypes.
   */
  _prepareMovement() {
    const m = this.movement;
    m.size = m.baseSize + m.sizeBonus;
    m.stride = m.baseStride + m.strideBonus;
    m.free = m.stride;
    m.engagement = 1; // Default engagement is size-2 with a minimum of 1.
    const {shield, offhand} = this.parent.equipment.weapons;
    if ( shield && offhand.system.properties.has("engaging") ) m.engagement += 1;
  }

  /* -------------------------------------------- */

  /**
   * Prepare Actions which this Actor may actively use.
   */
  #prepareActions() {
    this.#prepareDefaultActions();
    for ( const item of this.parent.items ) {
      if ( item.system instanceof CruciblePhysicalItem ) this.#registerItemActions(item);
      else if ( (item.type === "talent") || (item.type === "spell") ) this.#registerItemActions(item);
    }
  }

  /* -------------------------------------------- */

  /**
   * Prepare the set of default actions that every Actor can perform.
   */
  #prepareDefaultActions() {
    const w = this.equipment.weapons;
    for ( let ad of SYSTEM.ACTION.DEFAULT_ACTIONS ) {

      // Some actions are only conditionally added
      switch ( ad.id ) {
        case "cast":
          if ( !(this.grimoire.gestures.size && this.grimoire.runes.size) ) continue;
          break;
        case "reload":
          if ( !w.reload ) continue;
          break;
        case "refocus":
          if ( !w.talisman ) continue;
          break;
        case "throwWeapon":
          if ( !(w.mainhand?.system.canThrow() || w.offhand?.system.canThrow()) ) continue;
          break;
      }

      // Action data
      ad = foundry.utils.deepClone(ad);
      ad.tags ||= [];

      // Customize strike tags
      if ( ["strike", "reactiveStrike"].includes(ad.id) ) {
        if ( w.melee ) ad.tags.push("melee");
        if ( w.ranged ) ad.tags.push("ranged");
      }

      // Create the action
      const action = new CrucibleAction(ad, {actor: this.parent});
      action._initialize({});
      this.actions[action.id] = action;
    }
  }

  /* -------------------------------------------- */

  /**
   * Register and bind Actions provided by an Item.
   * @param {CrucibleItem} item
   */
  #registerItemActions(item) {
    if ( !item.system.schema.has("actions") ) return;
    if ( item.system.requiresInvestment && !item.system.invested ) return;
    for ( const action of item.actions ) {
      const actionId = item.type === "consumable" ? `${action.id}.${item.id}` : action.id;
      this.actions[actionId] = action.bind(this.parent);
    }
  }

  /* -------------------------------------------- */
  /*  Actor Hooks                                 */
  /* -------------------------------------------- */

  /**
   * Register actor hooks for a given Item.
   * @param {CrucibleItem} item         The Item registering the hook
   */
  #registerActorHooks(item) {
    const H = SYSTEM.ACTOR.HOOKS;
    if ( item.system.requiresInvestment && !item.system.invested ) return;

    // First register inline hooks
    for ( let {hook, fn} of item.system.actorHooks ) {
      const cfg = H[hook];
      if ( !cfg ) {
        console.error(new Error(`Invalid Actor hook name "${hook}" defined by Item "${item.uuid}"`));
        continue;
      }
      this.actorHooks[hook] ||= [];
      if ( typeof fn === "string" ) {
        try {
          fn = new Function("item", ...cfg.argNames, fn);
        } catch(err) {
          throw new Error(`Failed to parse Hook "${hook}" in Item "${item.uuid}"`, {cause: err});
        }
      }
      if ( !(fn instanceof Function) ) throw new Error(`Hook "${hook}" is not a function.`);
      this.actorHooks[hook].push({item, fn});
    }

    // Next register custom module hooks
    const identifier = item.system.identifier || item.id;
    const hooks = crucible.api.hooks[item.type]?.[identifier];
    if ( hooks ) {
      for ( const [hook, fn] of Object.entries(hooks) ) {
        if ( hook in SYSTEM.ACTOR.HOOKS ) {
          this.actorHooks[hook] ||= [];
          this.actorHooks[hook].push({item, fn});
        }
      }
    }
  }
}/**
 * Define the data schema and functionality of a Taxonomy applied to Adversary creatures.
 */
class CrucibleTaxonomyItem extends foundry.abstract.TypeDataModel {

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    const nullableInteger = {required: true, nullable: true, integer: true};
    const requiredInteger = {required: true, nullable: false, integer: true};
    return {
      description: new fields.HTMLField(),
      identifier: new ItemIdentifierField(),
      category: new fields.StringField({choices: SYSTEM.ACTOR.CREATURE_CATEGORIES, initial: "humanoid"}),
      abilities: new fields.SchemaField(Object.values(SYSTEM.ABILITIES).reduce((obj, ability) => {
        obj[ability.id] = new fields.NumberField({...nullableInteger, initial: 2, min: 0, max: 6});
        return obj;
      }, {}), {validate: CrucibleTaxonomyItem.#validateAbilities}),
      movement: new fields.SchemaField({
        size: new fields.NumberField({...requiredInteger, min: 1, initial: 4}),
        stride: new fields.NumberField({...requiredInteger, min: 1, initial: 10})
      }),
      resistances: new fields.SchemaField(Object.values(SYSTEM.DAMAGE_TYPES).reduce((obj, damageType) => {
        obj[damageType.id] = new fields.NumberField({...requiredInteger, initial: 0, min: -3, max: 3});
        return obj;
      }, {}), {validate: CrucibleTaxonomyItem.#validateResistances}),
      talents: new fields.SetField(new fields.DocumentUUIDField({type: "Item"})),
      characteristics: new fields.SchemaField({
        equipment: new fields.BooleanField(),
        spells: new fields.BooleanField()
      }),
    }
  }

  /** @override */
  static LOCALIZATION_PREFIXES = ["TAXONOMY"];

  /* -------------------------------------------- */

  /**
   * Validate that ability scaling for the Taxonomy is balanced.
   * @param {object} abilities                          Ability choices
   * @param {DataFieldValidationOptions} [options={}]   Options which affect validation
   * @throws {Error}                                    An error if the ability choices are invalid
   */
  static #validateAbilities(abilities, options) {
    if ( options.partial === true ) return;
    const sum = Object.values(abilities).reduce((t, n) => t + n, 0);
    if ( sum !== 12 ) throw new Error(`The sum of initial ability values must equal 12. Currently ${sum}`);
  }

  /* -------------------------------------------- */

  /**
   * Validate that resistance scaling for the Taxonomy is balanced.
   * @param {Object<number>} resistances                Resistance choices
   * @param {DataFieldValidationOptions} [options={}]   Options which affect validation
   * @throws {Error}                                    An error if the resistance choices are invalid
   */
  static #validateResistances(resistances, options) {
    if ( options.partial === true ) return;
    const sum = Object.values(resistances).reduce((t, n) => t + n, 0);
    if ( sum !== 0 ) throw new Error(`The sum of resistance scaling values must equal zero. Currently ${sum}`);
  }

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * A convenience reference to the CrucibleActor to which this Taxonomy belongs.
   * @type {CrucibleActor}
   */
  get actor() {
    return this.parent.parent;
  }

  /* -------------------------------------------- */
  /*  Deprecations and Compatibility              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static migrateData(source) {
    super.migrateData(source);

    const abilities = source.abilities;
    const sum = Object.values(abilities).reduce((t, n) => t + n, 0);
    /** @deprecated since 0.7.3 */
    if ( sum === 18 ) source.abilities = Object.keys(SYSTEM.ABILITIES).reduce((obj, a) => {
      obj[a] = 2;
      return obj;
    }, {});

    /** @deprecated since 0.7.3 */
    if ( source.size && !source.movement?.size ) {
      source.movement ||= {};
      source.movement.size = source.size;
      delete source.size;
    }

    /** @deprecated since 0.7.3 */
    if ( source.stride && !source.movement?.stride ) {
      source.movement ||= {};
      source.movement.stride = source.stride;
      delete source.stride;
    }
  }
}/**
 * Define the data schema and functionality of an Archetype applied to Adversary creatures.
 */
class CrucibleArchetypeItem extends foundry.abstract.TypeDataModel {

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    const nullableInteger = {required: true, nullable: true, integer: true};
    return {
      description: new fields.HTMLField(),
      identifier: new ItemIdentifierField(),
      abilities: new fields.SchemaField(Object.values(SYSTEM.ABILITIES).reduce((obj, ability) => {
        obj[ability.id] = new fields.NumberField({...nullableInteger, initial: 2, min: 0, max: 6});
        return obj;
      }, {}), {validate: CrucibleArchetypeItem.#validateAbilities}),
      talents: new fields.SetField(new fields.DocumentUUIDField({type: "Item"})),
      skills: new fields.SetField(new fields.StringField({required: true, choices: SYSTEM.SKILLS})),
      equipment: new fields.ArrayField(new fields.SchemaField({
        item: new fields.DocumentUUIDField({type: "Item"}),
        quantity: new fields.NumberField({required: true, nullable: false, integer: true, initial: 1}),
        equipped: new fields.BooleanField()
      })),
    }
  }

  /** @override */
  static LOCALIZATION_PREFIXES = ["ARCHETYPE"];

  /* -------------------------------------------- */

  /**
   * Validate that ability scaling for the Archetype is balanced.
   * @param {object} abilities                          Ability choices
   * @param {DataFieldValidationOptions} [options={}]   Options which affect validation
   * @throws {Error}                                    An error if the ability choices are invalid
   */
  static #validateAbilities(abilities, options) {
    if ( options.partial === true ) return;
    const sum = Object.values(abilities).reduce((t, n) => t + n, 0);
    if ( sum !== 12 ) throw new Error(`The sum of ability scaling values must equal 12. Currently ${sum}`);
  }

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * A convenience reference to the CrucibleActor to which this Taxonomy belongs.
   * @type {CrucibleActor}
   */
  get actor() {
    return this.parent.parent;
  }

  /* -------------------------------------------- */
  /*  Deprecations and Compatibility              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static migrateData(source) {
    super.migrateData(source);

    const abilities = source.abilities;
    const sum = Object.values(abilities).reduce((t, n) => t + n, 0);
    /** @deprecated since 0.7.3 */
    if ( sum === 18 ) source.abilities = Object.keys(SYSTEM.ABILITIES).reduce((obj, a) => {
      obj[a] = 2;
      return obj;
    }, {});
  }
}/**
 * Data schema, attributes, and methods specific to Adversary type Actors.
 */
class CrucibleAdversaryActor extends CrucibleBaseActor {

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = {required: true, nullable: false, integer: true};
    const schema = super.defineSchema();

    // Advancement
    schema.advancement = new fields.SchemaField({
      level: new fields.NumberField({...requiredInteger, initial: 1, min: -5, max: 24, label: "ADVANCEMENT.Level"}),
      rank: new fields.StringField({required: true, choices: SYSTEM.THREAT_RANKS, initial: "normal"})
    });

    // Details
    schema.details = new fields.SchemaField({
      archetype: new fields.SchemaField({
        name: new fields.StringField({blank: false}),
        img: new fields.StringField(),
        ...CrucibleArchetypeItem.defineSchema()
      }, {required: true, nullable: true, initial: null}),
      taxonomy: new fields.SchemaField({
        name: new fields.StringField({blank: false}),
        img: new fields.StringField(),
        ...CrucibleTaxonomyItem.defineSchema()
      }, {required: true, nullable: true, initial: null}),
      biography: new fields.SchemaField({
        appearance: new fields.HTMLField(),
        public: new fields.HTMLField(),
        private: new fields.HTMLField()
      }),
      languages: new fields.SetField(new fields.StringField({blank: false}))
    });

    // Adversaries do not track ability advancement
    for ( const abilityField of Object.values(schema.abilities.fields) ) {
      delete abilityField.fields.base;
      delete abilityField.fields.increases;
    }

    // Adversaries only use active resource pools
    for ( const resource of Object.values(SYSTEM.RESOURCES) ) {
      if ( resource.type !== "active" ) delete schema.resources.fields[resource.id];
    }
    return schema;
  }

  /**
   * The Handlebars template path used to render an @Embed block for adversaries.
   */
  static EMBED_TEMPLATE = "systems/crucible/templates/embeds/actor-adversary.hbs";

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** @override */
  get isDead() {
    return this.resources.health.value === 0;
  }

  /** @override */
  get isInsane() {
    return false;
  }

  /**
   * Does this Adversary use physical equipment?
   * @type {boolean}
   */
  get usesEquipment() {
    return !!this.details.taxonomy?.characteristics.equipment;
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @override */
  _prepareBaseMovement() {
    const {size=4, stride=10} = this.details.taxonomy?.movement || {};
    const m = this.movement;
    m.baseSize = size;
    m.baseStride = stride;
  }

  /* -------------------------------------------- */

  /**
   * Prepare character details for the Adversary subtype specifically.
   * @override
   */
  _prepareDetails() {

    // Initialize default archetype and taxonomy data
    let {archetype, taxonomy} = this.details;
    const adv = this.advancement;
    archetype ||= CrucibleArchetypeItem.cleanData();
    taxonomy ||= CrucibleTaxonomyItem.cleanData();

    // Compute threat level
    const threatConfig = SYSTEM.THREAT_RANKS[adv.rank];
    adv.threatFactor = threatConfig?.scaling || 1;
    adv.threatLevel = adv.level < 0 ? 1 / Math.abs(adv.level - 1) : adv.level;
    adv.threat = adv.threatLevel * adv.threatFactor;

    // Automatic training and maximum action configuration
    this.advancement.autoTrainingRank = Math.clamp(1 + Math.floor(adv.threatLevel / 6), 0, 4);
    this.advancement.maxAction = threatConfig.actionMax;

    // Scale attributes
    this.#scaleAbilities(taxonomy, archetype);
    this.#scaleResistances(taxonomy);
  }

  /* -------------------------------------------- */

  /** @override */
  _prepareTraining() {

    // Automatic natural weapon training if the taxonomy does not use equipment
    if ( !this.usesEquipment ) {
      this.training.natural = Math.max(this.training.natural || 0, this.advancement.autoTrainingRank);
    }

    // Automatic skill progression
    const skills = this.details.archetype?.skills || [];
    for ( const skillId of skills ) {
      this.training[skillId] = Math.max(this.training[skillId] || 0, this.advancement.autoTrainingRank);
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _prepareEquipment(items) {
    if ( !this.usesEquipment ) {
      this.equipment.accessorySlots = 0;
      this.equipment.consumableSlots = 0;
    }
    return super._prepareEquipment(items);
  }

  /* -------------------------------------------- */

  /**
   * Scale adversary abilities according to their threat level, taxonomy, and archetype.
   * @param taxonomy
   * @param archetype
   */
  #scaleAbilities(taxonomy, archetype) {
    const {level, threat} = this.advancement;
    let toSpend = level > 0 ? 5 + level : Math.ceil(6 * threat);

    // Assign base Taxonomy ability scores
    for ( const k in SYSTEM.ABILITIES ) {
      const a = this.abilities[k];
      a.base = taxonomy.abilities[k];
      a.increases = 0;
      a.value = a.base;
    }

    // Compute Archetype scaling
    const abilities = {};
    const total = {points: 0};
    for ( const k in SYSTEM.ABILITIES ) {
      const ability = {points: taxonomy.abilities[k] > 0 ? archetype.abilities[k] : 0};
      abilities[k] = ability;
      total.points += ability.points;
    }
    for ( const k in abilities ) abilities[k].weight = abilities[k].points / total.points;

    // Pass 1: Unconstrained Increases
    const nFull = Math.floor(toSpend / total.points);
    if ( nFull > 0 ) {
      for ( const [k, abl] of Object.entries(abilities) ) {
        const a = this.abilities[k];
        a.increases += (abl.points * nFull);
        a.value = a.base + a.increases;
      }
      toSpend -= (nFull * total.points);
    }
    if ( toSpend === 0 ) return;

    // Pass 2: Iterative Assignment
    const allocation = {};
    for ( const k in abilities ) {
      const w = abilities[k].weight;
      const v0 = toSpend * w;
      const t0 = Math.min(v0, (18 - this.abilities[k].value), abilities[k].points);
      const p0 = Math.floor(t0);

      // How many more points are needed to get another +1?
      const t1 = Math.min(v0 + 1, (18 - this.abilities[k].value), abilities[k].points);
      const p1 = Math.floor(t1);
      const needed = (p1 - t0) / w;
      allocation[k] = {w, v0, t0, p0, t1, p1, needed};
    }

    // Unambiguous allocation
    const remainder = [];
    for ( const k in allocation ) {
      const {p0, p1, needed} = allocation[k];
      const a = this.abilities[k];
      a.increases += p0;
      toSpend -= p0;
      a.value = a.base + a.increases;
      if ( (p1 > p0) && Number.isFinite(needed) ) remainder.push({ability: k, needed});
    }
    if ( toSpend === 0 ) return;

    // Sort remainder
    const tiebreaker = {toughness: 1, strength: 2, dexterity: 3, presence: 4, intellect: 5, wisdom: 6};
    remainder.sort((a, b) => {
      return (a.needed - b.needed) ||                                               // Fewest points needed
             (taxonomy.abilities[b.ability] - taxonomy.abilities[a.ability]) ||     // Taxonomy preference
             (tiebreaker[a.ability] - tiebreaker[b.ability]);                       // Heuristic tiebreaker
    });
    for ( const {ability} of remainder.slice(0, toSpend) ) {
      const a = this.abilities[ability];
      a.increases += 1;
      toSpend -= 1;
      a.value = a.base + a.increases;
    }
  }

  /* -------------------------------------------- */

  /**
   * Scale adversary resistances according to their threat level and taxonomy.
   * @param taxonomy
   */
  #scaleResistances(taxonomy) {
    for ( const r of Object.keys(this.resistances) ) {
      const tr = taxonomy.resistances[r] || 0;
      if ( tr === 0 ) {
        this.resistances[r].base = 0;
        continue;
      }
      const perLevel = tr < 0 ? (tr / 3) : (tr * 2 / 3);
      const base = this.advancement.threat * perLevel;
      this.resistances[r].base = base < 0 ? Math.floor(base) : Math.ceil(base);
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _prepareMovement() {
    super._prepareMovement();
    const sizeBonus = Math.ceil(Math.max(this.movement.size - 4, 0) / 2);
    this.movement.engagement += sizeBonus;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _getUnarmedWeapon() {
    if ( !this.details.taxonomy?.characteristics.equipment ) return null;
    return super._getUnarmedWeapon();
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Apply an Archetype item to this Adversary Actor.
   * @param {CrucibleItem|object|null} item    An Item document, object of Item data, or null to clear the archetype
   * @returns {Promise<void>}
   */
  async applyArchetype(item) {
    return this.parent._applyDetailItem(item, {type: "archetype", canApply: true, canClear: true, skillTalents: false});
  }

  /* -------------------------------------------- */

  /**
   * Apply a Taxonomy item to this Adversary Actor.
   * @param {CrucibleItem|object|null} item    An Item document, object of Item data, or null to clear the taxonomy
   * @returns {Promise<void>}
   */
  async applyTaxonomy(item) {
    return this.parent._applyDetailItem(item, {type: "taxonomy", canApply: true, canClear: true});
  }

  /* -------------------------------------------- */

  /**
   * Prepare tags displayed about this adversary Actor.
   * @returns {Record<string, string>}
   */
  getTags(scope="full") {
    const tags = {};
    tags.level = `Threat Level ${this.advancement.threat}`;
    if ( scope === "short" ) return tags;
    tags.taxonomy = this.details.taxonomy?.name || "No Taxonomy";
    tags.archetype = this.details.archetype?.name || "No Archetype";
    return tags;
  }

  /* -------------------------------------------- */

  /** @override */
  async toEmbed(config, _options) {
    const block = new foundry.applications.elements.HTMLDocumentEmbedElement();
    block.className = "block actor";
    config.inline ??= false; // Never use figures

    // Prepare actor data
    const actor = this.parent;
    const rank = actor.system.advancement.rank || "normal";
    const rankName = rank !== "normal" ? SYSTEM.THREAT_RANKS[rank]?.label : "";
    const context = {
      name: actor.name,
      img: config.image === "token" ? actor.prototypeToken.texture.src : actor.img,
      link: actor.toAnchor().outerHTML,
      count: config.count,
      threat: [actor.system.advancement.threatLevel, rankName ? `(${rankName})` : ""].filterJoin(" "),
      subtitle: [this.details.taxonomy?.name || "Unknown", this.details.archetype?.name || "Unknown"].join(" "),
      readaloud: await CONFIG.ux.TextEditor.enrichHTML(this.details.biography.appearance, {
        relativeTo: actor,
        secrets: actor.isOwner
      })
    };

    // Render the Embed
    block.innerHTML = await foundry.applications.handlebars.renderTemplate(this.constructor.EMBED_TEMPLATE, context);
    return block;
  }

  /* -------------------------------------------- */
  /*  Deprecations and Compatibility              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static migrateData(source) {
    super.migrateData(source);
    /** @deprecated since 0.7.3 */
    if ( source.details?.archetype ) crucible.api.models.CrucibleArchetypeItem.migrateData(source.details.archetype);
    /** @deprecated since 0.7.3 */
    if ( source.details?.taxonomy ) crucible.api.models.CrucibleArchetypeItem.migrateData(source.details.taxonomy);
    /** @deprecated since 0.7.4 */
    if ( source.advancement?.threat ) {
      source.advancement.rank = source.advancement.threat;
      delete source.advancement.threat;
    }
  }
}/**
 * Data schema, attributes, and methods specific to Ancestry type Items.
 */
class CrucibleAncestryItem extends foundry.abstract.TypeDataModel {

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    const reqChoice = {required: true, blank: true, initial: ""};
    const reqInt = {required: true, nullable: false, integer: true};
    return {
      abilities: new fields.SchemaField({
        primary: new fields.StringField({...reqChoice, choices: SYSTEM$1.ABILITIES}),
        secondary: new fields.StringField({...reqChoice, choices: SYSTEM$1.ABILITIES})
      }, {validate: CrucibleAncestryItem.#validateAbilities}),
      description: new fields.HTMLField(),
      identifier: new ItemIdentifierField(),
      movement: new fields.SchemaField({
        size: new fields.NumberField({...reqInt, min: 1, initial: 4}),
        stride: new fields.NumberField({...reqInt, min: 1, initial: 10})
      }),
      resistances: new fields.SchemaField({
        resistance: new fields.StringField({...reqChoice, choices: SYSTEM$1.DAMAGE_TYPES}),
        vulnerability: new fields.StringField({...reqChoice, choices: SYSTEM$1.DAMAGE_TYPES})
      }, {validate: CrucibleAncestryItem.#validateResistances}),
      talents: new fields.SetField(new fields.DocumentUUIDField({type: "Item"})),
      ui: new fields.SchemaField({
        color: new fields.ColorField()
      })
    };
  }

  /** @override */
  static LOCALIZATION_PREFIXES = ["ANCESTRY"];

  /* -------------------------------------------- */

  /**
   * Validate that primary and secondary abilities are different.
   * @param {object} abilities    Ability choices
   * @param {DataFieldValidationOptions} [options={}]  Options which affect validation
   * @throws {Error}              An error if the ability choices are invalid
   */
  static #validateAbilities(abilities, options) {
    if ( options.partial === true ) return;
    const {primary, secondary} = abilities;
    if ( !(primary && secondary) ) return;
    if ( primary === secondary ) throw new Error(game.i18n.localize("ANCESTRY.WARNINGS.ABILITIES"));
  }

  /* -------------------------------------------- */

  /**
   * Validate that resistances and vulnerabilities exist and are different.
   * @param {object} resistances  Resistance choices
   * @param {DataFieldValidationOptions} [options={}]  Options which affect validation
   * @throws {Error}              An error if the resistance choices are invalid
   */
  static #validateResistances(resistances, options) {
    if ( options.partial === true ) return;
    const {resistance: res, vulnerability: vuln} = resistances;
    if ( !res && !vuln ) return;
    if ( res === vuln ) throw new Error(game.i18n.localize("ANCESTRY.WARNINGS.RESISTANCES_DIFFERENT"));
    if ( !res !== !vuln ) throw new Error(game.i18n.localize("ANCESTRY.WARNINGS.RESISTANCES_BOTH"));
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Convert the Ancestry to a Taxonomy used for adversary Actors.
   * @returns {CrucibleItem}
   */
  toTaxonomy() {
    const {abilities, description, identifier, movement, resistances, talents} = this.toObject();

    // Determine ability allocation
    const {primary, secondary} = abilities;
    let tertiary;
    if ( ![primary, secondary].includes("toughness") ) tertiary = "toughness";
    else {
      const opposites = {strength: "intellect", wisdom: "dexterity", intellect: "strength", dexterity: "wisdom"};
      tertiary = opposites[primary === "toughness" ? secondary : primary];
    }

    // Prepare system data
    const system = {
      description,
      identifier,
      size: movement.size,
      stride: movement.stride,
      category: "humanoid",
      abilities: Object.values(SYSTEM$1.ABILITIES).reduce((obj, {id}) => {
        if ( id === primary ) obj[id] = 4;
        else if ( id === secondary ) obj[id] = tertiary ? 3: 4;
        else if ( id === tertiary ) obj[id] = 2;
        else obj[id] = 1;
        return obj;
      }, {}),
      resistances: Object.values(SYSTEM$1.DAMAGE_TYPES).reduce((obj, {id}) => {
        if ( id === resistances.resistance ) obj[id] = 1;
        else if ( id === resistances.vulnerability ) obj[id] = -1;
        else obj[id] = 0;
        return obj;
      }, {}),
      characteristics: {
        equipment: true,
        spells: true
      },
      talents
    };
    return this.parent.clone({type: "taxonomy", "==system": system}, {keepId: true, save: false});
  }

  /* -------------------------------------------- */

  /**
   * Return an object of string formatted tag data which describes this item type.
   * @returns {Record<string, string>}    The tags which describe this Ancestry
   */
  getTags() {
    const tags = {};
    if ( this.abilities.primary ) tags.a1 = SYSTEM$1.ABILITIES[this.abilities.primary].label;
    if ( this.abilities.secondary ) tags.a2 = SYSTEM$1.ABILITIES[this.abilities.secondary].label;
    tags.size = `Size ${this.movement.size}`;
    return tags;
  }

  /* -------------------------------------------- */
  /*  Deprecations and Compatibility              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static migrateData(source) {
    super.migrateData(source);

    /** @deprecated since 0.7.0 until 0.8.0 */
    const {primary, secondary, resistance, vulnerability, size, stride} = source;
    if ( !source.abilities && (primary || secondary) ) {
      source.abilities = {primary: primary || "", secondary: secondary || ""};
      delete source.primary;
      delete source.secondary;
    }

    /** @deprecated since 0.7.0 until 0.8.0 */
    if ( !source.resistances && (resistance || vulnerability) ) {
      source.resistances = {resistance: resistance || "", vulnerability: vulnerability || ""};
      delete source.resistance;
      delete source.vulnerability;
    }

    /** @deprecated since 0.7.0 until 0.8.0 */
    if ( !source.movement && (size || stride) ) {
      source.movement = {size, stride};
      delete source.size;
      delete source.stride;
    }
  }
}/**
 * Data schema, attributes, and methods specific to Background type Items.
 */
class CrucibleBackgroundItem extends foundry.abstract.TypeDataModel {

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField({required: true, blank: true}),
      identifier: new ItemIdentifierField(),
      knowledge: new fields.SetField(new fields.StringField({choices: () => crucible.CONFIG.knowledge})),
      languages: new fields.SetField(new fields.StringField()),
      skills: new fields.SetField(new fields.StringField({required: true, choices: SYSTEM.SKILLS})),
      talents: new fields.SetField(new fields.DocumentUUIDField({type: "Item"})),
      ui: new fields.SchemaField({
        color: new fields.ColorField()
      })
    };
  }

  /** @override */
  static LOCALIZATION_PREFIXES = ["BACKGROUND"];
}/**
 * Data schema, attributes, and methods specific to Hero type Actors.
 */
class CrucibleHeroActor extends CrucibleBaseActor {

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = {required: true, nullable: false, integer: true};
    const schema = super.defineSchema();

    // Extra validation for abilities
    for ( const abilityField of Object.values(schema.abilities.fields) ) {
      abilityField.options.validate = CrucibleHeroActor.#validateAttribute;
    }

    // Advancement
    schema.advancement = new fields.SchemaField({
      level: new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 24}),
      milestones: new fields.NumberField({...requiredInteger, initial: 0, min: 0}),
      talentNodes: new fields.SetField(new fields.StringField({required: true, blank: false})) // TODO temporary
    });

    // Details
    schema.details = new fields.SchemaField({
      ancestry: new fields.SchemaField({
        name: new fields.StringField({blank: false}),
        img: new fields.StringField(),
        ...CrucibleAncestryItem.defineSchema()
      }, {required: true, nullable: true, initial: null}),
      background: new fields.SchemaField({
        name: new fields.StringField({blank: false}),
        img: new fields.StringField(),
        ...CrucibleBackgroundItem.defineSchema()
      }, {required: true, nullable: true, initial: null}),
      biography: new fields.SchemaField({
        appearance: new fields.HTMLField(),
        age: new fields.StringField(),
        height: new fields.StringField(),
        pronouns: new fields.StringField(),
        weight: new fields.StringField(),
        public: new fields.HTMLField(),
        private: new fields.HTMLField()
      }),
      knowledge: new fields.SetField(new fields.StringField({blank: false})),
      languages: new fields.SetField(new fields.StringField({blank: false}))
    });
    return schema;
  }

  /* -------------------------------------------- */

  /**
   * Validate an attribute field
   * @param {{base: number, increases: number, bonus: number}} attr     The attribute value
   */
  static #validateAttribute(attr) {
    if ( (attr.base + attr.increases) > 12 ) throw new Error(`Attribute base + bonus cannot exceed 12`);
  }

  /* -------------------------------------------- */
  /*  Derived Attributes                          */
  /* -------------------------------------------- */

  /**
   * Advancement points that are available to spend and have been spent.
   * @type {{
   *   ability: {pool: number, total: number, bought: number, spent: number, available: number},
   *   talent: {total: number, spent: number, available: number}
   * }}
   */
  points;

  /**
   * Carrying capacity for physical equipment.
   * @type {{value: number, max: number}}
   */
  capacity;

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @override */
  prepareBaseData() {
    this.#prepareAdvancement();
    super.prepareBaseData();
  }

  /* -------------------------------------------- */

  /** @override */
  _prepareBaseMovement() {
    const {size=4, stride=10} = this.details.ancestry.movement;
    const m = this.movement;
    m.baseSize = size;
    m.baseStride = stride;
  }

  /* -------------------------------------------- */

  /**
   * Compute the available points which can be spent to advance this character.
   */
  #prepareAdvancement() {
    const adv = this.advancement;
    const effectiveLevel = Math.max(adv.level, 1) - 1;
    this.points = {
      ability: {pool: 9, total: effectiveLevel, bought: 0, spent: 0, available: 0},
      talent: {total: 3 + (effectiveLevel*3), spent: 0, available: 0}
    };
    const level = SYSTEM.ACTOR.LEVELS[adv.level];
    if ( !level ) throw new Error(`Invalid character level ${adv.level} not in SYSTEM.ACTOR.LEVELS`);
    adv.progress = Math.max(adv.milestones - level.milestones.start, 0);
    adv.next = level.milestones.next;
    adv.required = level.milestones.required;
    adv.pct = Math.clamp(Math.round(adv.progress * 100 / Math.max(adv.required, 1)), 0, 100);
  }

  /* -------------------------------------------- */

  /**
   * Prepare character details for the Hero subtype specifically.
   * @override
   */
  _prepareDetails() {

    // Default Ancestry data
    if ( !this.details.ancestry ) {
      const ancestryDefaults = crucible.api.models.CrucibleAncestryItem.schema.getInitialValue();
      this.details.ancestry = this.schema.getField("details.ancestry").initialize(ancestryDefaults);
    }

    // Default Background data
    this.details.background ||= this.schema.getField("details.background").clean({});

    // Add the background data into the main details
    for ( const language of this.details.background.languages ) this.details.languages.add(language);
    for ( const knowledge of this.details.background.knowledge ) this.details.knowledge.add(knowledge);

    // Threat level
    const adv = this.advancement;
    Object.assign(adv, {threatFactor: 1, threatLevel: adv.level, threat: adv.level});

    // Base Resistances
    const res = this.resistances;
    for ( const r of Object.values(res) ) r.base = 0;

    // Ancestry Resistances
    const {resistance, vulnerability} = this.details.ancestry.resistances;
    if ( resistance ) res[resistance].base += SYSTEM.ANCESTRIES.resistanceAmount;
    if ( vulnerability ) res[vulnerability].base -= SYSTEM.ANCESTRIES.resistanceAmount;
  }

  /* -------------------------------------------- */

  /**
   * Prepare abilities data for the Hero subtype specifically.
   * @override
   */
  _prepareAbilities() {
    const points = this.points.ability;
    const {primary, secondary} = this.details.ancestry.abilities;

    // Ability Scores
    let abilityPointsBought = 0;
    let abilityPointsSpent = 0;
    for ( let a in SYSTEM.ABILITIES ) {
      const ability = this.abilities[a];

      // Configure initial value
      ability.initial = 1;
      if ( a === primary ) ability.initial = SYSTEM.ANCESTRIES.primaryAbilityStart;
      else if ( a === secondary ) ability.initial = SYSTEM.ANCESTRIES.secondaryAbilityStart;
      ability.value = Math.clamp(ability.initial + ability.base + ability.increases + ability.bonus, 0, 12);

      // Track points spent
      abilityPointsBought += ability.base;
      abilityPointsSpent += ability.increases;
    }

    // Track spent ability points
    points.bought = abilityPointsBought;
    points.pool = 9 - points.bought;
    points.spent = abilityPointsSpent;
    points.available = points.total - abilityPointsSpent;
    points.requireInput = (this.advancement.level === 0) ? (points.pool > 0) : (points.available !== 0);
  }

  /* -------------------------------------------- */

  /**
   * Preparation of resource pools for the Hero subtype specifically.
   * @inheritDoc
   */
  _prepareResources() {
    super._prepareResources();
    const r = this.resources;

    // Wounds
    r.wounds.max = Math.ceil(1.5 * r.health.max);
    r.wounds.value = Math.clamp(r.wounds.value, 0, r.wounds.max);

    // Madness
    r.madness.max = Math.ceil(1.5 * r.morale.max);
    r.madness.value = Math.clamp(r.madness.value, 0, r.madness.max);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareItems(items) {
    super.prepareItems(items);
    const points = this.points.talent;
    points.spent = Math.max(this.talentIds.size - this.permanentTalentIds.size, 0) + this.advancement.talentNodes.size;
    points.available = points.total - points.spent;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _prepareEquipment(items) {
    super._prepareEquipment(items);
    this._prepareCapacity(items);
  };

  /* -------------------------------------------- */

  /**
   * Accumulates the current carrying weight of the character.
   * Total capacity is determined later after active effects are applied.
   * @protected
   */
  _prepareCapacity(items) {
    this.capacity = {value: 0, max: 0};
    for ( const type of SYSTEM.ITEM.PHYSICAL_ITEM_TYPES ) {
      for ( const item of items[type] ) {
        this.capacity.value += (item.system.weight * item.system.quantity);
      }
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _prepareMovement() {
    super._prepareMovement();
    const c = this.capacity;
    c.max = this.abilities.strength.value * 30;
    c.overflow = c.max - c.value;
    c.pct = Math.clamp(c.value / c.max, 0, 1);
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Apply an Ancestry item to this Hero Actor.
   * @param {CrucibleItem} ancestry         The ancestry Item to apply to the Actor.
   * @param {object} options                Options which customize how the ancestry is applied
   * @param {boolean} [options.force=false]   Force the ancestry to be applied even if criteria are not met
   * @returns {Promise<void>}
   */
  async applyAncestry(ancestry, {force=false}={}) {
    const actor = this.parent;
    await actor._applyDetailItem(ancestry, {
      type: "ancestry",
      canApply: (actor.isL0 && !actor.points.ability.spent) || force,
      canClear: actor.isL0 || force
    });
  }

  /* -------------------------------------------- */

  /**
   * Apply a Background item to this Hero Actor.
   * @param {CrucibleItem} background       The background Item to apply to the Actor.
   * @param {object} options                Options which customize how the background is applied
   * @param {boolean} [options.force=false]   Force the background to be applied even if criteria are not met
   * @returns {Promise<void>}
   */
  async applyBackground(background, {force=false}={}) {
    const actor = this.parent;
    await actor._applyDetailItem(background, {
      type: "background",
      canApply: actor.isL0 || force,
      canClear: actor.isL0 || force
    });
  }

  /* -------------------------------------------- */

  /**
   * Prepare tags displayed about this Hero Actor.
   * @returns {Record<string, string>}
   */
  getTags(scope="full") {
    const tags = {};
    tags.level = `Level ${this.advancement.level}`;
    if ( scope === "short" ) return tags;
    if ( this.details.signatureName ) tags.signatureName = this.details.signatureName;
    return tags;
  }

  /* -------------------------------------------- */
  /*  Deprecations and Compatibility              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static migrateData(source) {
    super.migrateData(source);
    if ( source.details?.ancestry ) CrucibleAncestryItem.migrateData(source.details.ancestry);
  }
}/**
 * Data schema, attributes, and methods specific to Group type Actors.
 */
class CrucibleGroupActor extends foundry.abstract.TypeDataModel {

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = {required: true, nullable: false, integer: true};
    const schema = {};

    // Advancement
    schema.advancement = new fields.SchemaField({
      milestones: new fields.NumberField({...requiredInteger, min: 0, initial: 0})
    });

    // Group Members
    schema.members = new fields.ArrayField(new fields.SchemaField({
      actorId: new fields.DocumentIdField({nullable: false}),
      quantity: new fields.NumberField({...requiredInteger, min: 1, initial: 1})
    }));

    // Movement Attributes
    schema.movement = new fields.SchemaField({
      pace: new fields.StringField({required: true, choices: SYSTEM.ACTOR.TRAVEL_PACES, initial: "normal"}),
      land: new fields.NumberField({required: true, nullable: false, min: 0, initial: 2, step: 0.5}),
      water: new fields.NumberField({required: true, nullable: false, min: 0, initial: 0.5, step: 0.5}),
      air: new fields.NumberField({required: true, nullable: false, min: 0, initial: 0, step: 0.5}),
    });

    // Description
    schema.details = new fields.SchemaField({
      biography: new fields.SchemaField({
        public: new fields.HTMLField(),
        private: new fields.HTMLField()
      })
    });
    return schema;
  }

  /** @override */
  static LOCALIZATION_PREFIXES = ["ACTOR.GROUP"];

  /**
   * The Handlebars template used to render this Action as a line item for tooltips or as a partial.
   * @type {string}
   */
  static TOOLTIP_CHECK_TEMPLATE = "systems/crucible/templates/tooltips/tooltip-group-check.hbs";

  /**
   * The median level of the group
   * @type {number}
   */
  medianLevel;

  /**
   * The IDs of current group members
   * @type {Set<string>}
   */
  memberIds = new Set();

  /**
   * The distinct Actors which belong to this group.
   * @type {Set<CrucibleActor>}
   */
  actors = new Set();

  /* -------------------------------------------- */
  /*  Document Preparation                        */
  /* -------------------------------------------- */

  /** @override */
  prepareItems(items) {}

  /* -------------------------------------------- */

  /**
   * Derived data prepared for group actors.
   * @override
   */
  prepareDerivedData() {
    const levels = [];
    this.actors.clear();
    this.memberIds.clear();
    for ( const m of this.members ) {
      m.actor = game.actors.get(m.actorId);
      if ( !m.actor ) continue;
      m.actor._groups.add(this.parent);
      for ( let i=0; i<m.quantity; i++ ) levels.push(m.actor.level);
      this.memberIds.add(m.actorId);
      this.actors.add(m.actor);
    }

    // Median member level
    const nl = levels.length;
    levels.sort();
    let medianLevel = levels[Math.floor((nl-1) / 2)];
    if ( levels.length % 2 !== 0 ) medianLevel = (medianLevel + levels[Math.ceil((nl-1) / 2)]) / 2;
    this.medianLevel = medianLevel;

    // Member IDs
    Object.defineProperty(this.members, "ids", {value: this.memberIds, enumerable: false, configurable: true});
    Object.defineProperty(this.members, "actors", {value: this.actors, enumerable: false, configurable: true});
  }

  /* -------------------------------------------- */
  /*  Member Management                           */
  /* -------------------------------------------- */

  /**
   * Add a new member to this group.
   * If the new member is a single Actor (hero or adversary), the group gains `quantity` that Actor.
   * If the new member is a group, this group is merged with the membership of the other group.
   * @param {CrucibleActor} actor     The Actor to add
   * @param {number} [quantity=1]     The quantity to add
   * @returns {Promise<void>}         The updated group Actor
   */
  async addMember(actor, quantity=1) {
    if ( !(actor instanceof Actor) || !!actor.pack ) throw new Error("You can only add a World Actor");
    if ( actor === this.parent ) throw new Error("You cannot add your own group!");

    // Prepare operation data
    const toJoin = new Map();
    if ( actor.type === "group" ) {
      for ( const m of actor.system._source.members ) toJoin.set(m.actorId, m);
    }
    else toJoin.set(actor.id, {actorId: actor.id, quantity});
    const operation = actor.type === "group" ? "merge" : "add";

    // Update group members
    const members = this.toObject().members;
    for ( const m of members ) {
      const j = toJoin.get(m.actorId);
      if ( !j ) continue;
      if ( operation === "merge" ) m.quantity = quantity;
      else m.quantity += quantity;
      toJoin.delete(m.actorId);
    }

    // Add new members
    for ( const m of toJoin.values() ) members.push(m);

    // Commit the update
    await this.parent.update({"system.members": members});
    return this.parent;
  }

  /* -------------------------------------------- */

  /**
   * Remove a member from this group.
   * If the member to remove is a single Actor (hero or adversary), the group loses `quantity` of that Actor.
   * If the member to remove is a group, the group loses `quantity` of each Actor in the other group.
   * @param {CrucibleActor|string} actor  The Actor or ID to remove
   * @param {number} [quantity=1]         The quantity to remove
   * @returns {Promise<void>}             The updated group Actor
   */
  async removeMember(actor, quantity=1) {
    if ( !((actor instanceof Actor) || (typeof actor === "string")) ) {
      throw new Error("The Actor to remove must be an Actor document or string ID.")
    }
    if ( actor === this.parent ) throw new Error("You cannot remove your own group!");

    // Prepare operation data
    const toLeave = new Map();
    if ( typeof actor === "string" ) toLeave.set(actor, {actorId: actor, quantity});
    else if ( actor?.type === "group" ) {
      for ( const m of actor.system._source.members ) toLeave.set(m.actorId, m);
    }
    else toLeave.set(actor.id, {actorId: actor.id, quantity});

    // Remove group members
    const members = this.toObject().members.reduce((arr, m) => {
      const l = toLeave.get(m.actorId);
      if ( l ) {
        m.quantity = Math.max(m.quantity - l.quantity, 0);
        if ( m.quantity === 0 ) return arr;
      }
      arr.push(m);
      return arr;
    }, []);

    // Commit the update
    await this.parent.update({"system.members": members});
    return this.parent;
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Award milestones to the members of this group.
   * @param {number} quantity
   * @param {object} options
   * @param {boolean} [options.createMessage=true]
   * @param {string[]} [options.recipientIds]
   * @returns {Promise<void>}
   */
  async awardMilestones(quantity, {createMessage=true, recipientIds}={}) {
    recipientIds ||= Array.from(this.memberIds);
    const recipientHTML = [];
    const updates = recipientIds.reduce((arr, id) => {
      const actor = game.actors.get(id);
      if ( !actor ) return arr;
      recipientHTML.push(`<li>${actor.name}</li>`);
      const starting = actor.system._source.advancement.milestones;
      const milestones = Math.max(starting + quantity, 0);
      arr.push({_id: id, "system.advancement.milestones": milestones});
      return arr;
    }, []);
    const groupMilestones = Math.max(this._source.advancement.milestones + quantity, 0);
    updates.push({_id: this.parent.id, "system.advancement.milestones": groupMilestones});
    await Actor.updateDocuments(updates);
    if ( !createMessage ) return;
    const plurals = new Intl.PluralRules(game.i18n.lang);
    const awardText = `${quantity} ${game.i18n.localize("AWARD.Milestone." + plurals.select(quantity))}`;
    await ChatMessage.implementation.create({
      content: `
      <section class="crucible">
        ${game.i18n.format("AWARD.SUMMARIES.Reward", {award: awardText})}
        <ul class="plain">${recipientHTML.join("")}</ul>
      </section>
      `,
      speaker: ChatMessage.implementation.getSpeaker({actor: this.parent}),
      flags: {crucible: {isAwardSummary: true}}
    });
  }

  /* -------------------------------------------- */

  /**
   * Provide the Gamemaster with a Dialog to award milestone points to the group.
   * @param {number} [baseQuantity=1]               Quantity of milestones to pre-populate the dialog with
   * @param {object} [options]
   * @param {boolean} [options.createMessage=true]  Whether to create a chat message summarizing the award
   * @returns {Promise<void>}
   */
  async awardMilestoneDialog(baseQuantity=1, options={}) {
    if ( !game.user.isGM ) throw new Error("You must be a Gamemaster user to award milestones.");

    // Prepare form data
    const heroes = this.members.reduce((obj, {actor}) => {
      if ( actor?.type === "hero" ) obj[actor.id] = actor.name;
      return obj;
    }, {});

    // Render form HTML
    const {SetField, StringField, NumberField} = foundry.data.fields;
    const quantity = new NumberField({
      integer: true,
      initial: baseQuantity,
      label: "ACTOR.GROUP.FIELDS.advancement.milestones.label",
      hint: "ACTOR.GROUP.FIELDS.advancement.milestones.hint"
    });
    const quantityHTML = quantity.toFormGroup({classes: ["slim"], localize: true}, {name: "quantity"});
    const recipients = new SetField(new StringField({required: true, blank: false, choices: heroes}), {
      label: "Milestone Recipients",
      hint: "Select one or more heroes to receive the milestone."
    });
    const recipientsHTML = recipients.toFormGroup({stacked: true}, {
      name: "recipients",
      type: "checkboxes",
      value: Object.keys(heroes),
      sort: true
    });

    // Create confirmation dialog
    const response = await foundry.applications.api.DialogV2.input({
      window: {title: game.i18n.localize("ADVANCEMENT.MilestoneAward"), icon: "fa-solid fa-arrow-up"},
      ok: {label: "Award", icon: "fa-solid fa-star"},
      content: `${quantityHTML.outerHTML}${recipientsHTML.outerHTML}`
    });
    if ( !response ) return;
    await this.awardMilestones(response.quantity, {...options, recipientIds: response.recipients});
  }

  /* -------------------------------------------- */

  /**
   * Prepare tags displayed about this group Actor.
   * @returns {Record<string, string>}
   */
  getTags() {
    const tags = {};
    const plurals = new Intl.PluralRules(game.i18n.lang);

    // Member Count
    const membersLabel = `ACTOR.GROUP.FIELDS.members.${plurals.select(this.members.length)}`;
    tags.members = `${this.members.length} ${game.i18n.localize(membersLabel)}`;

    // Median Level
    if ( this.members.length ) {
      tags.level = `${game.i18n.localize("ACTOR.GROUP.LABELS.medianLevel")} ${this.medianLevel}`;
    }
    return tags;
  }
  /* -------------------------------------------- */

  /**
   * Perform a group recovery where every member of the group uses the Recovery action and time advances.
   * @fires {preGroupRecover}
   * @returns {Promise<void>}
   */
  async recover() {
    if ( Hooks.call("crucible.preGroupRecover", this) === false ) return;
    const promises = [];
    for ( const actor of this.actors ) {
      promises.push(actor.useAction("recover", {dialog: false}));
    }
    promises.push(game.time.advance(SYSTEM.TIME.recoverSeconds));
    await Promise.allSettled(promises);
  }

  /* -------------------------------------------- */

  /**
   * Perform a group rest where every member of the group uses the Rest action and time advances.
   * @fires {preGroupRest}
   * @returns {Promise<void>}
   */
  async rest() {
    if ( Hooks.call("crucible.preGroupRest", this) === false ) return;
    const promises = [];
    for ( const actor of this.actors ) {
      promises.push(actor.useAction("rest", {dialog: false}));
    }
    promises.push(game.time.advance(SYSTEM.TIME.restSeconds));
    await Promise.allSettled(promises);
  }

  /* -------------------------------------------- */

  /**
   * @callback CrucibleGroupCheckCriteria
   * @param {CrucibleActor} group
   * @param {CrucibleActor} member
   * @returns {Promise<{[roll]: StandardCheck, [success]: boolean}|null>}
   */

  /**
   * Create a group check tooltip.
   * @param {CrucibleGroupCheckCriteria} check
   * @param {object} options
   * @param {string} [options.title]
   * @returns {Promise<string>}
   */
  async renderGroupCheckTooltip(check, {title}={}) {

    // Prepare check results
    const results = [];
    for ( const member of this.members ) {
      if ( !member.actor ) continue;
      const r = await check(this.parent, member.actor);
      if ( r === null ) continue;
      const {roll, success} = r;
      const result = {actor: member.actor, name: member.actor.name, tags: member.actor.getTags()};

      // Roll-based results
      if ( roll ) Object.assign(result, {
        total: roll.total,
        dc: roll.data.dc,
        isSuccess: roll.isSuccess,
        isFailure: roll.isFailure,
        isCriticalSuccess: roll.isCriticalSuccess,
        isCriticalFailure: roll.isCriticalFailure,
        icon: roll.isSuccess ? "fa-light fa-hexagon-check" : "fa-light fa-hexagon-xmark",
        hasValue: true,
      });

      // Binary checks
      else if ( typeof success === "boolean" ) Object.assign(result, {
        isSuccess: success,
        isFailure: !success,
        icon: success ? "fa-light fa-hexagon-check" : "fa-light fa-hexagon-xmark",
        hasValue: false
      });
      else throw new Error("A group check result must either provide a roll or a binary success");

      // Common rules
      result.cssClass = [
        result.isSuccess ? "success" : "",
        result.isFailure ? "failure" : "",
        result.isCriticalSuccess ? "critical-success": "",
        result.isCriticalFailure ? "critical-failure" : ""
      ].filterJoin(" ");
      results.push(result);
    }

    // Render
    return foundry.applications.handlebars.renderTemplate(this.constructor.TOOLTIP_CHECK_TEMPLATE, {title, results});
  }
}/**
 * A system sub-type of the Combat document used for combat challenges.
 */
class CrucibleCombatChallenge extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      heroism: new fields.SchemaField({
        actions: new fields.NumberField({required: true, nullable: false, integer: true, min: 0, initial: 0}),
        awarded: new fields.NumberField({required: true, nullable: false, integer: true, min: 0, initial: 0})
      })
    }
  }

  /* -------------------------------------------- */

  /** @override */
  prepareDerivedData() {
    const h = this.heroism;
    const nHeroes = this.parent.combatants.filter(c => c.actor?.type === "hero")?.length || 1;
    h.required = nHeroes * 4 * 3; // Generation rate: 4A per hero over 3 rounds
    h.previous = Math.floor(h.actions / h.required) * h.required;
    h.next = h.previous + h.required;
    h.pct = (h.actions - h.previous) / h.required;
  }

  /* -------------------------------------------- */
  /*  Initiative and Turn Events                  */
  /* -------------------------------------------- */

  async preUpdateRoundInitiative(data) {
    data.turn = 0; // Force starting at the top of the round, ignoring defeated combatant adjustments
    data.combatants = [];
    const results = [];
    for ( const c of this.parent.combatants ) {
      const roll = c.getInitiativeRoll();
      await roll.evaluate();
      data.combatants.push({_id: c.id, initiative: roll.total});
      const r = c.clone({initiative: roll.total}, {keepId: true});
      r.roll = roll;
      results.push(r);
    }
    await this.postInitiativeMessage(data.round, results);
  }

  /* -------------------------------------------- */

  /**
   * Post a chat message with a summary of initiative rolls for the round.
   * @param {number} round
   * @param {object[]} results
   * @returns {Promise<ChatMessage>}
   */
  postInitiativeMessage(round, results) {
    results.sort(this.parent._sortCombatants);

    // Format table rows
    const rolls = [];
    const rows = results.map(i => {
      rolls.push(i.roll);
      const rd = i.roll.data;
      const boons = Object.values(rd.boons).reduce((t, b) => t + b.number, 0);
      const banes = Object.values(rd.banes).reduce((t, b) => t + b.number, 0);
      const modifiers = [
        boons > 0 ? `<span class="boons"><i class="fa-solid fa-caret-up" inert></i> ${boons}</span>` : "",
        banes > 0 ? `<span class="banes"><i class="fa-solid fa-caret-down" inert></i> ${banes}</span>` : "",
        `(${rd.ability.signedString()})`
      ].filterJoin(" ");
      return `<tr class="combatant" data-combatant-id="${i.id}">
        <td class="initiative-name">${i.name}</td>
        <td class="initiative-modifiers">${modifiers}</td>
        <td class="initiative-value">${i.initiative}</td>
      </tr>`;
    }).join("");

    // Create the Chat Message
    return ChatMessage.create({
      content: `
      <section class="crucible dice-roll initiative">
      <table class="initiative-table" data-combat-id="${this.parent.id}">
        <thead>
          <tr>
              <th class="initiative-name">Combatant</th>
              <th class="initiative-value" colspan="2">Result</th>
          </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
      </table>
      </section>`,
      rolls,
      speaker: {user: game.user, alias: `Initiative - Round ${round}`},
      "flags.crucible.isInitiativeReport": true
    });
  }

  /* -------------------------------------------- */

  static onRenderInitiativeReport(message, html) {

    // Remove rolls
    html.querySelector(".dice-rolls")?.remove();

    // Hide combatants which are not visible
    const table = html.querySelector(".initiative-table");
    const combat = game.combats.get(table?.dataset.combatId);
    if ( !combat ) return;

    // Iterate combatants
    for ( const tr of html.querySelectorAll("tr.combatant") ) {
      const c = combat.combatants.get(tr.dataset.combatantId);
      if ( !c ) continue;
      if ( c.hidden ) {
        if ( game.user.isGM ) tr.classList.add("secret");
        else tr.remove();
      }
    }
  }

  /* -------------------------------------------- */
  /*  Combat Tracker Rendering                    */
  /* -------------------------------------------- */

  /**
   * When the CombatTracker is rendered, add a heroism progress bar.
   */
  static onRenderCombatTracker(app, _html, _options) {
    if ( game.combat?.type !== "combat" ) return;
    const header = app.element.querySelector(".combat-tracker-header");
    const bar = `<div class="heroism-meter"><span class="heroism-bar"></span><span class="heroism-label"></span></div>`;
    header.insertAdjacentHTML("beforeend", bar);
    CrucibleCombatChallenge.refreshCombatTracker();
  }

  /* -------------------------------------------- */

  /**
   * Refresh display of the CombatTracker to update the heroism progress bar.
   */
  static refreshCombatTracker() {
    if ( game.combat?.type !== "combat" ) return;
    const meters = [ui.combat.element.querySelector(".heroism-meter")];
    if ( ui.combat.popout?.rendered ) meters.push(ui.combat.popout.element.querySelector(".heroism-meter"));
    const heroism = game.combat.system.heroism;
    const pct = `${Math.round(heroism.pct * 100)}%`;
    for ( const meter of meters ) {
      const [bar, label] = meter.children;
      bar.style.width = pct;
      label.innerText = `Heroism ${pct}`;
      meter.dataset.tooltip = "Progress to next Heroism point";
    }
  }
}/**
 * A system sub-type of the Combat document used for exploration challenges.
 */
class CrucibleExplorationChallenge extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {}; // Placeholder for now
  }
}/**
 * A system sub-type of the Combat document used for social challenges.
 */
class CrucibleSocialChallenge extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {}; // Placeholder for now
  }
}/**
 * Data schema, attributes, and methods specific to "accessory" type Items.
 */
class CrucibleAccessoryItem extends CruciblePhysicalItem {

  /** @override */
  static ITEM_CATEGORIES = CATEGORIES;

  /** @override */
  static DEFAULT_CATEGORY = "jewelry";

  /** @override */
  static ITEM_PROPERTIES = PROPERTIES;

  /** @override */
  static LOCALIZATION_PREFIXES = ["ITEM", "ACCESSORY"];
}/**
 * Data schema, attributes, and methods specific to Armor type Items.
 */
class CrucibleArmorItem extends CruciblePhysicalItem {

  /** @override */
  static ITEM_CATEGORIES = CATEGORIES$3;

  /** @override */
  static DEFAULT_CATEGORY = "medium";

  /** @override */
  static ITEM_PROPERTIES = PROPERTIES$3;

  /** @override */
  static LOCALIZATION_PREFIXES = ["ITEM", "ARMOR"];

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    return foundry.utils.mergeObject(super.defineSchema(), {
      armor: new fields.SchemaField({
        base: new fields.NumberField({required: true, nullable: false, integer: true, min: 0, max: 18, initial: 0})
      })
    });
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Weapon configuration data.
   * @type {{category: WeaponCategory, quality: ItemQualityTier, enchantment: ItemEnchantmentTier}}
   */
  config;

  /**
   * Item rarity score.
   * @type {number}
   */
  rarity;

  /* -------------------------------------------- */

  /**
   * Prepare derived data specific to the weapon type.
   */
  prepareBaseData() {
    super.prepareBaseData();
    const {category, quality, enchantment} = this.config;

    // Armor Defense
    this.armor.base = Math.clamp(this.armor.base, category.armor.min, category.armor.max);
    this.armor.bonus = quality.bonus;

    // Dodge Defense
    this.dodge ||= {};
    this.dodge.base = category.dodge.base(this.armor.base) + enchantment.bonus;
    this.dodge.scaling = category.dodge.scaling;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    if ( this.broken ) {
      this.armor.base = Math.floor(this.armor.base / 2);
      this.armor.bonus = Math.floor(this.armor.bonus / 2);
      this.rarity -= 2;
    }
    super.prepareDerivedData();
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  getTags(scope="full") {
    const tags = super.getTags(scope);
    const actor = this.parent.parent;

    // Defenses
    tags.armor = `${this.armor.base + this.armor.bonus} Armor`;
    if ( !actor ) tags.dodge = `${this.dodge.base}+ Dodge`;
    else {
      const dodgeBonus = Math.max(actor.system.abilities.dexterity.value - this.dodge.scaling, 0);
      tags.dodge = `${this.dodge.base + dodgeBonus} Dodge`;
      tags.total = `${this.armor.base + this.armor.bonus + this.dodge.base + dodgeBonus} Defense`;
    }

    // Armor Properties
    for ( let p of this.properties ) {
      if ( p === "investment" ) continue;
      tags[p] = PROPERTIES$3[p].label;
    }
    return scope === "short" ? {armor: tags.armor, dodge: tags.dodge} : tags;
  }

  /* -------------------------------------------- */

  /**
   * Get the default unarmored Armor item used by this Actor if they do not have other equipped armor.
   * @param {CrucibleActor} actor
   * @returns {CrucibleItem}
   */
  static getUnarmoredArmor(actor) {
    const itemCls = /** @type Constructor<CrucibleItem> */ getDocumentClass("Item");
    const armor = new itemCls(UNARMORED_DATA, {parent: actor});
    armor.prepareData(); // Needs to be explicitly called since we may be in the midst of Actor preparation.
    return armor;
  }
}/**
 * Data schema, attributes, and methods specific to "consumable" type Items.
 */
class CrucibleConsumableItem extends CruciblePhysicalItem {

  /** @override */
  static ITEM_CATEGORIES = CATEGORIES$2;

  /** @override */
  static DEFAULT_CATEGORY = "flask";

  /** @override */
  static ITEM_PROPERTIES = PROPERTIES$2;

  /** @override */
  static LOCALIZATION_PREFIXES = ["ITEM", "CONSUMABLE"];

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const schema = super.defineSchema();
    delete schema.actorHooks; // Consumables don't have actor hooks
    const fields = foundry.data.fields;
    return foundry.utils.mergeObject(schema, {
      uses: new fields.SchemaField({
        value: new fields.NumberField({required: true, nullable: false, integer: true, min: 0, initial: 1}),
        max: new fields.NumberField({required: true, nullable: false, integer: true, min: 1, initial: 1})
      })
    });
  }

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Is this consumable or consumable stack depleted?
   * @type {boolean}
   */
  get isDepleted() {
    return !this.uses.value || !this.quantity;
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Consume a certain number of uses of the consumable.
   * @param {number} [uses=1]           A number of uses to consume. A negative number will restore uses of the item
   * @returns {Promise<CrucibleItem>}   The updated item
   */
  async consume(uses=1) {
    let {value, max} = this.uses;
    let quantity = this.quantity;
    const currentUses = (max * (quantity - 1)) + value;
    const newUses = Math.max(currentUses - uses, 0);
    const targetQuantity = this.properties.has("stackable") ? Math.ceil(newUses / max) : 1;
    const targetUses = Math.clamp(newUses - (max * (targetQuantity - 1)), 0, max);
    await this.parent.update({system: {quantity: targetQuantity, uses: {value: targetUses}}});
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  getTags(scope="full") {
    const {category, ...parentTags} = super.getTags(scope);
    const tags = {
      category,
      quality: this.config.quality.label,
      ...parentTags
    };
    if ( this.isDepleted ) tags.uses = "Depleted";
    else {
      const {value, max} = this.uses;
      const plurals = new Intl.PluralRules(game.i18n.lang);
      const usesLabel = {one: "Use", other: "Uses"}[plurals.select(max)];
      tags.uses = value === max ? `${value} ${usesLabel}` : `${value}/${max} ${usesLabel}`;
    }
    return tags;
  }
}/**
 * Data schema, attributes, and methods specific to "consumable" type Items.
 */
class CrucibleLootItem extends CruciblePhysicalItem {

  /** @override */
  static ITEM_CATEGORIES = LOOT_CATEGORIES;

  /** @override */
  static DEFAULT_CATEGORY = "other";

  /** @override */
  static ITEM_PROPERTIES = {stackable: PROPERTIES$4.stackable};

  /** @override */
  static LOCALIZATION_PREFIXES = ["ITEM", "LOOT"];

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const schema = super.defineSchema();
    delete schema.actorHooks; // Loot don't have actor hooks
    delete schema.equipped;   // Loot cannot be equipped
    delete schema.invested;   // Loot cannot be invested
    delete schema.actions;    // Loot cannot provide actions
    return schema;
  }
}/**
 * Data schema, attributes, and methods specific to "consumable" type Items.
 *
 * @example Example Schematic System Data
 * {
 *   identifier: "healingElixirRecipe",
 *   category: "alchemy",
 *   quantity: 1,
 *   weight: 1,
 *   price: 1500,
 *   quality: "standard",
 *   properties: ["common"],
 *   description: {
 *     public: "A commonly known recipe for creating a basic healing potion.",
 *     private: "You can turn particular healing herbs found in the wild into a bottled elixir using Alchemists Tools.",
 *   },
 *   inputs: [
 *    {
 *      ingredients: [
 *        {item: healingHerbsUUID, consumed: true, quantity: 1, quality: "standard"},
 *        {item: glassVialUUID, consumed: true, quantity: 1, quality: ""},
 *        {item: alchemistsToolsUUID, consumed: false, quantity: 1, quality: "standard"}
 *      ],
 *      currency: 150,
 *      mode: "AND"
 *    },
*    ],
 *   outputs: [
 *    [{item: healingElixirUUID, quantity: 1}]
*    ],
 *   dc: 15,
 *   hours: 4
 * }
 */
class CrucibleSchematicItem extends CruciblePhysicalItem {

  /** @override */
  static ITEM_CATEGORIES = SCHEMATIC_CATEGORIES;

  /** @override */
  static DEFAULT_CATEGORY = "alchemy";

  /** @override */
  static ITEM_PROPERTIES = SCHEMATIC_PROPERTIES;

  /** @override */
  static LOCALIZATION_PREFIXES = ["ITEM", "SCHEMATIC"];

  /**
   * The operator modes supported for ingredient combination.
   * @type {Record<string, string>}
   */
  static #MODES = {ALL: "SCHEMATIC.MODES.ALL", ANY: "SCHEMATIC.MODES.ANY", TEMPLATE: "SCHEMATIC.MODES.TEMPLATE"};

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const schema = super.defineSchema();

    // Remove fields
    delete schema.actions;      // Schematics cannot provide actions
    delete schema.actorHooks;   // Schematics don't have actor hooks
    delete schema.broken;       // Schematics cannot be broken
    delete schema.equipped;     // Schematics cannot be equipped
    delete schema.enchantment;  // Schematics cannot be enchanted
    delete schema.invested;     // Schematics cannot be invested

    // Add fields
    const fields = foundry.data.fields;
    Object.assign(schema, {
      inputs: new fields.ArrayField(new fields.SchemaField({
        ingredients: new fields.ArrayField(new fields.SchemaField({
          item: new fields.DocumentUUIDField({type: "Item", embedded: false, nullable: false}),
          consumed: new fields.BooleanField({initial: true}),
          quantity: new fields.NumberField({required: true, nullable: false, integer: true, min: 1, initial: 1}),
          quality: new fields.StringField({required: true, blank: true, choices: QUALITY_TIERS}),
        })),
        currency: new fields.NumberField({required: true, nullable: false, integer: true, min: 0, initial: 0}),
        mode: new fields.StringField({required: true, blank: false, choices: CrucibleSchematicItem.#MODES,
          initial: "ALL"})
      })),
      dc: new fields.NumberField({required: true, nullable: false, min: 1, integer: true, initial: PASSIVE_BASE}),
      hours: new fields.NumberField({required: true, nullable: false, min: 0, initial: 0}),
      outputs: new fields.ArrayField(new fields.ArrayField(new fields.SchemaField({
        item: new fields.DocumentUUIDField({type: "Item", embedded: false, nullable: false}),
        quantity: new fields.NumberField({required: true, nullable: false, integer: true, min: 1, initial: 1})
      })))
    });
    return schema;
  }
}/**
 * An Item subtype that defines an Iconic Spell composition.
 */
class CrucibleSpellItem extends foundry.abstract.TypeDataModel {

  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      actions: new fields.ArrayField(new fields.EmbeddedDataField(CrucibleAction)),
      runes: new fields.SetField(new fields.StringField({choices: SYSTEM.SPELL.RUNES})),
      gestures: new fields.SetField(new fields.StringField({choices: SYSTEM.SPELL.GESTURES})),
      inflections: new fields.SetField(new fields.StringField({choices: SYSTEM.SPELL.INFLECTIONS})),
      actorHooks: new fields.ArrayField(new fields.SchemaField({
        hook: new fields.StringField({required: true, blank: false, choices: SYSTEM.ACTOR.HOOKS}),
        fn: new fields.JavaScriptField({async: true, gmOnly: true})
      }))
    }
  }

  /** @override */
  static LOCALIZATION_PREFIXES = ["ITEM", "SPELL"];

  /**
   * The partial template used to render a feature granted item.
   * @type {string}
   */
  static INLINE_TEMPLATE_PATH = "systems/crucible/templates/sheets/item/spell-inline.hbs";

  /**
   * The partial template used to render a feature granted item.
   * @type {string}
   */
  static CARD_TEMPLATE_PATH = "systems/crucible/templates/sheets/item/spell-card.hbs";

  /**
   * Is this Iconic Spell currently known by the Actor which owns it?
   */
  isKnown = false;

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Ensure every Action provided by this item type is tagged as an iconic spell.
   * @inheritDoc
   */
  _initializeSource(source, options) {
    super._initializeSource(source, options);
    for ( const action of source.actions ) {
      action.tags[0] = "iconicSpell"; // Potentially fragile?
    }
    return source;
  }

  /* -------------------------------------------- */

  /**
   * Test whether a spell can be known based on the contents of a grimoire?
   * @param {CrucibleActorGrimoire} grimoire
   * @returns {boolean}
   */
  canKnowSpell(grimoire) {
    for ( const runeId of this.runes ) {
      const rune = SYSTEM.SPELL.RUNES[runeId];
      if ( !grimoire.runes.has(rune) ) return false;
    }
    for ( const gestureId of this.gestures ) {
      const gesture = SYSTEM.SPELL.GESTURES[gestureId];
      if ( !grimoire.gestures.has(gesture) ) return false;
    }
    for ( const inflectionId of this.inflections ) {
      const inflection = SYSTEM.SPELL.INFLECTIONS[inflectionId];
      if ( !grimoire.inflections.has(inflection) ) return false;
    }
    return true;
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Return an object of string formatted tag data which describes this item type.
   * @param {"full"|"short"} [scope="full"]   The scope of tags being retrieved, "full" or "short"
   * @returns {Object<string, string>}        The tags which describe this spell
   */
  getTags(scope="full") {
    const tags = {};
    if ( this.parent.parent && !this.isKnown ) tags.known = "Not Known";
    for ( const runeId of this.runes ) {
      const rune = SYSTEM.SPELL.RUNES[runeId];
      tags[runeId] = rune.name;
    }
    for ( const gestureId of this.gestures ) {
      const gesture = SYSTEM.SPELL.GESTURES[gestureId];
      tags[gestureId] = gesture.name;
    }
    for ( const inflectionId of this.inflections ) {
      const inflection = SYSTEM.SPELL.INFLECTIONS[inflectionId];
      tags[inflectionId] = inflection.name;
    }
    return tags;
  }

  /**
   * Render this Iconic Spell as HTML for inline display.
   * @returns {Promise<string>}
   */
  async renderInline() {
    return foundry.applications.handlebars.renderTemplate(this.constructor.INLINE_TEMPLATE_PATH, {
      spell: this,
      uuid: this.parent.uuid,
      name: this.parent.name,
      img: this.parent.img,
      tags: this.getTags()
    });
  }

  /* -------------------------------------------- */

  /**
   * Render this Iconic Spell as HTML for a tooltip card.
   * @param {object} options
   * @param {CrucibleActor} [options.actor]
   * @returns {Promise<string>}
   */
  async renderCard({actor}={}) {

    // Load necessary templates
    await foundry.applications.handlebars.loadTemplates([
      this.constructor.CARD_TEMPLATE_PATH,
      "systems/crucible/templates/sheets/item/spell-summary.hbs"
    ]);

    // Prepare spell data
    const spell = this.parent;
    actor ||= spell.parent;

    const runeReqs = [...this.runes].map(req => ({
      tag: SYSTEM.SPELL.RUNES[req]?.name ?? req,
      met: actor.itemTypes.talent.some(i => i.system.rune === req)
    }));
    const gestureReqs = [...this.gestures].map(req => ({
      tag: SYSTEM.SPELL.GESTURES[req]?.name ?? req,
      met: actor.itemTypes.talent.some(i => i.system.gesture === req)
    }));
    const inflectionReqs = [...this.inflections].map(req => ({
      tag: SYSTEM.SPELL.INFLECTIONS[req]?.name ?? req,
      met: actor.itemTypes.talent.some(i => i.system.inflection === req)
    }));

    // Render the card
    return foundry.applications.handlebars.renderTemplate(this.constructor.CARD_TEMPLATE_PATH, {
      spell,
      descriptionHTML: await CONFIG.ux.TextEditor.enrichHTML(spell.system.description, {
        relativeTo: spell,
        secrets: spell.isOwner
      }),
      source: spell,
      uuid: spell.uuid,
      name: spell.name,
      img: spell.img,
      actions: await CrucibleSpellItemSheet.prepareActions(spell),
      tags: this.getTags(),
      prerequisites: [...runeReqs, ...gestureReqs, ...inflectionReqs]
    });
  }
}/**
 * Data schema, attributes, and methods specific to Weapon type Items.
 */
class CrucibleWeaponItem extends CruciblePhysicalItem {

  /** @override */
  static ITEM_CATEGORIES = SYSTEM$1.WEAPON.CATEGORIES;

  /** @override */
  static DEFAULT_CATEGORY = "simple1";

  /** @override */
  static ITEM_PROPERTIES = SYSTEM$1.WEAPON.PROPERTIES;

  /** @override */
  static LOCALIZATION_PREFIXES = ["ITEM", "WEAPON"];

  /**
   * The Handlebars template used to render this weapon as a line item for tooltips or as a partial.
   * @type {string}
   */
  static TOOLTIP_TEMPLATE = "systems/crucible/templates/tooltips/tooltip-weapon.hbs";

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    return foundry.utils.mergeObject(super.defineSchema(), {
      damageType: new fields.StringField({required: true, choices: SYSTEM$1.DAMAGE_TYPES, initial: "bludgeoning"}),
      dropped: new fields.BooleanField({required: true, initial: false}),
      loaded: new fields.BooleanField({required: false, initial: undefined}),
      slot: new fields.NumberField({required: true, choices: () => SYSTEM$1.WEAPON.SLOTS.choices, initial: 0})
    });
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Bonuses applied to actions performed with this weapon
   * @type {DiceCheckBonuses}
   */
  actionBonuses;

  /**
   * Weapon Strike action cost.
   * @type {number}
   */
  actionCost;


  /**
   * Weapon damage data.
   * @type {{base: number, quality: number, weapon: number}}
   */
  damage;

  /**
   * Defensive bonuses provided by this weapon
   * @type {{block: number, parry: number}}
   */
  defense;

  /* -------------------------------------------- */

  /**
   * Prepare derived data specific to the weapon type.
   */
  prepareBaseData() {
    super.prepareBaseData();
    const {category, enchantment} = this.config;

    // Equipment Slot
    if ( this.dropped ) this.equipped = false;
    const allowedSlots = this.getAllowedEquipmentSlots();
    if ( !allowedSlots.includes(this.slot) ) this.slot = allowedSlots[0];

    // Weapon Damage
    this.damage = this.#prepareDamage();

    // Weapon Defense
    this.defense = this.#prepareDefense();

    // Weapon Range
    this.range = this.#prepareRange();

    // Action bonuses and cost
    this.actionBonuses = this.parent.actor ? {
      ability: this.parent.actor.getAbilityBonus(category.scaling.split(".")),
      skill: 0,
      enchantment: enchantment.bonus
    } : {};
    this.actionCost = category.actionCost;

    // Versatile Two-Handed
    if ( this.properties.has("versatile") && this.slot === SYSTEM$1.WEAPON.SLOTS.TWOHAND ) {
      this.damage.base += 2;
      this.actionCost += 1;
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    this.damage.weapon = this.damage.base + this.damage.quality;
    if ( this.broken ) {
      this.damage.weapon = Math.floor(this.damage.weapon / 2);
      this.rarity -= 2;
    }
    super.prepareDerivedData();
  }

  /* -------------------------------------------- */

  /**
   * Finalize equipped weapons by preparing data which depends on prepared talents or other Actor data.
   */
  prepareEquippedData() {
    const category = this.config.category;
    const actor = this.parent.actor;

    // Populate equipped skill bonus
    const trainingTypes = this.properties.has("natural") ? ["natural"] : category.training;
    this.actionBonuses.skill = Math.max(...trainingTypes.map(t => actor.system.training[t] || 0));

    // Populate current damage bonus
    const actorBonuses = actor.system.rollBonuses.damage || {};
    let bonus = actorBonuses[this.damageType] ?? 0;
    if ( !category.ranged ) bonus += (actorBonuses.melee ?? 0);
    if ( category.ranged ) bonus += (actorBonuses.ranged ?? 0);
    if ( category.hands === 2 ) bonus += (actorBonuses.twoHanded ?? 0);
    this.damage.bonus = bonus;
  }

  /* -------------------------------------------- */

  /**
   * Prepare damage for the Weapon.
   * @returns {{weapon: number, base: number, quality: number}}
   */
  #prepareDamage() {
    const {category, quality} = this.config;
    const damage = {
      base: category.damage,
      bonus: 0,
      quality: quality.bonus,
      weapon: 0
    };
    if ( this.properties.has("oversized") ) damage.base += 2;
    return damage;
  }

  /* -------------------------------------------- */

  /**
   * Prepare defense for the Weapon.
   * @returns {{block: number, parry: number}}
   */
  #prepareDefense() {

    // Broken weapons cannot defend
    if ( this.broken ) return {block: 0, parry: 0};

    // Base defense for the category
    const category = this.config.category;
    const defense = {
      block: category.defense?.block ?? 0,
      parry: category.defense?.parry ?? 0
    };

    // Parrying and Blocking properties
    if ( this.properties.has("parrying") ) {
      defense.parry += (category.hands + this.config.enchantment.bonus);
    }
    if ( this.properties.has("blocking") ) {
      defense.block += (category.hands + this.config.enchantment.bonus);
    }
    return defense;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the effective range of the Weapon.
   * @returns {number}
   */
  #prepareRange() {
    const category = this.config.category;
    let range = category.range;
    if ( this.properties.has("reach") ) range += category.ranged ? 20 : 2;
    if ( this.properties.has("ambush") ) range = Math.max(range - (category.ranged ? 10 : 1), 1);
    return range;
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * Can this weapon be thrown?
   * @returns {boolean}
   */
  canThrow() {
    const category = this.config.category;
    if ( (category.id === "unarmed") || category.ranged || this.properties.has("natural") ) return false;
    return true;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the effective weapon damage resulting from a weapon attack.
   * @param {CrucibleActor} actor       The actor performing the attack action
   * @param {CrucibleAction} action     The attack action being performed
   * @param {CrucibleActor} target      The target of the attack action
   * @param {AttackRoll} roll           The attack roll performed
   * @returns {DamageData}              Damage data for the roll
   */
  getDamage(actor, action, target, roll) {
    const resource = action.usage.resource || "health";
    const type = action.usage.damageType || this.damageType;
    let {weapon: base, bonus} = this.damage;
    const multiplier = action.usage.bonuses.multiplier ?? 1;
    bonus += (action.usage.bonuses.damageBonus ?? 0);
    const resistance = target.getResistance(resource, type, false);

    // Configure bonus damage
    if ( actor.talentIds.has("weakpoints000000") && this.config.category.scaling.includes("dexterity")
      && (["exposed", "flanked", "unaware"].some(s => target.statuses.has(s))) ) {
      bonus += 2;
    }

    // Return prepare damage data
    return {overflow: roll.overflow, multiplier, base, bonus, resistance, resource, type};
  }

  /* -------------------------------------------- */

  /**
   * Identify which equipment slots are allowed for a certain weapon.
   * @returns {number[]}
   */
  getAllowedEquipmentSlots() {
    const SLOTS = SYSTEM$1.WEAPON.SLOTS;
    const category = this.config.category;
    const slots = [];
    if ( this.properties.has("natural") ) return slots;
    if ( category.main ) {
      if ( category.hands === 2 ) return [SLOTS.TWOHAND];
      if ( category.off ) slots.unshift(SLOTS.EITHER);
      slots.push(SLOTS.MAINHAND);
      if ( this.properties.has("versatile") ) slots.push(SLOTS.TWOHAND);
    }
    if ( category.off ) slots.push(SLOTS.OFFHAND);
    return slots;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  getTags(scope="full") {
    const parentTags = super.getTags(scope);
    const tags = {};

    // Equipment Slot and Type
    if ( this.properties.has("natural") ) tags.natural = SYSTEM$1.WEAPON.PROPERTIES.natural.label;
    else if ( this.equipped ) {
      const slotKey = Object.entries(SYSTEM$1.WEAPON.SLOTS).find(([_k, v]) => v === this.slot)[0];
      tags.slot = game.i18n.localize(`WEAPON.SLOTS.${slotKey}`);
    }
    Object.assign(tags, parentTags);

    // Damage and Range
    let damage = `${this.damage.weapon} Damage`;
    if ( this.config.category.reload && !this.loaded ) damage = "Reload";
    const range = `Range ${this.range}`;

    // Weapon Properties
    if ( this.defense.block ) tags.block = `Block ${this.defense.block}`;
    if ( this.defense.parry ) tags.parry = `Parry ${this.defense.parry}`;
    if ( this.broken ) tags.broken = this.schema.fields.broken.label;

    switch(scope) {
      case "short": return {damage, range};
      case "tooltip": return { activation: { damage, range }, properties: tags };
    }

    return { ...tags, damage, range };
  }

  /* -------------------------------------------- */
  
  /**
   * Render this weapon as HTML for a tooltip card.
   * @param {object} options
   * @param {CrucibleActor} [options.actor]
   * @returns {Promise<string>}
   */
  async renderCard() {
    await foundry.applications.handlebars.loadTemplates([this.constructor.TOOLTIP_TEMPLATE]);
    return foundry.applications.handlebars.renderTemplate(this.constructor.TOOLTIP_TEMPLATE, {
      item: this.parent,
      tags: this.getTags('tooltip'),
    });
  }

  /* -------------------------------------------- */
  /*  Deprecations and Compatibility              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static migrateData(source) {
    super.migrateData(source);

    /** @deprecated since 0.7.3 */
    if ( source.category === "natural" ) {
      source.category = "simple1";
      source.properties ||= [];
      source.properties.push("natural");
    }
  }
}/**
 * The data structure and functionality of an Arcane Rune in the Crucible spellcraft system.
 */
class CrucibleSpellcraftRune extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      id: new fields.StringField({required: true, blank: false}),
      name: new fields.StringField(),
      img: new fields.FilePathField({categories: ["IMAGE"]}),
      damageType: new fields.StringField({required: false, initial: undefined,
        choices: ["physical"].concat(Object.keys(SYSTEM.DAMAGE_TYPES))}),
      resource: new fields.StringField({choices: SYSTEM.RESOURCES, initial: "health"}),
      restoration: new fields.BooleanField({initial: false}),
      opposed: new fields.StringField({required: true, blank: false}),
      defense: new fields.StringField({choices: Object.values(SYSTEM.DEFENSES).reduce((obj, d) => {
        if ( (d.id === "physical") || (d.type === "save") ) obj[d.id] = d.label;
        return obj;
      }, {})}),
      nameFormat: new fields.NumberField({choices: Object.values(SYSTEM.SPELL.NAME_FORMATS)}),
      scaling: new fields.StringField({choices: SYSTEM.ABILITIES})
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _initialize() {
    super._initialize();
    this.adjective = game.i18n.localize(`${this.name}Adj`);
    this.name = game.i18n.localize(this.name);
  }

  /* -------------------------------------------- */

  /**
   * One-time initialization to instantiate SYSTEM.SPELL.RUNES.
   */
  static initialize() {
    const runes = SYSTEM.SPELL.RUNES;
    for ( const [k, v] of Object.entries(runes) ) {
      runes[k] = new CrucibleSpellcraftRune(v);
    }
    Object.freeze(runes);
  }

  /* -------------------------------------------- */

  /** @override */
  toString() {
    return this.name;
  }

  /* -------------------------------------------- */

  /**
   * Tags used to annotate this Rune.
   * @returns {string[]}
   */
  get tags() {
    const tags = [
      SYSTEM.ABILITIES[this.scaling].label,
      SYSTEM.RESOURCES[this.resource].label,
      SYSTEM.DEFENSES[this.defense].label
    ];

    // Damage Type
    if ( this.damageType ) {
      if ( this.damageType === "physical" ) {
        tags.push(`${game.i18n.localize("DAMAGE.Physical")} ${game.i18n.localize("DAMAGE.Damage")}`);
      }
      else {
        const dt = SYSTEM.DAMAGE_TYPES[this.damageType];
        tags.push(`${dt.label} ${game.i18n.localize("DAMAGE.Damage")}`);
      }
    }

    // Restoration
    if ( this.restoration ) {
      tags.push(game.i18n.localize("DAMAGE.Restoration"));
    }
    return tags;
  }
}/**
 * The data structure and functionality of a Somatic Gesture in the Crucible spellcraft system.
 */
class CrucibleSpellcraftGesture extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const actionSchema = CrucibleAction.defineSchema();
    return {
      id: new fields.StringField({required: true, blank: false}),
      name: new fields.StringField(),
      nameFormat: new fields.NumberField({required: false, choices: Object.values(SYSTEM.SPELL.NAME_FORMATS),
        initial: undefined}),
      img: new fields.FilePathField({categories: ["IMAGE"]}),
      description: new fields.HTMLField(),
      cost: actionSchema.cost,
      damage: new fields.SchemaField({
        base: new fields.NumberField({required: true, integer: true, min: 0})
      }),
      hands: new fields.NumberField({required: true, integer: true, min: 0, max: 2}),
      range: actionSchema.range,
      scaling: new fields.StringField({required: true, choices: SYSTEM.ABILITIES}),
      target: actionSchema.target
    }
  }

  /* -------------------------------------------- */
1
  /** @inheritDoc */
  _initialize() {
    super._initialize();
    this.name = game.i18n.localize(this.name);
    this.target.scope = SYSTEM.ACTION.TARGET_TYPES[this.target.type].scope;
  }

  /* -------------------------------------------- */

  /**
   * One-time initialization to instantiate SYSTEM.SPELL.GESTURES.
   */
  static initialize() {
    const gestures = SYSTEM.SPELL.GESTURES;
    for ( const [k, v] of Object.entries(gestures) ) {
      gestures[k] = new CrucibleSpellcraftGesture(v);
    }
    Object.freeze(gestures);
  }

  /* -------------------------------------------- */

  /** @override */
  toString() {
    return this.name;
  }

  /* -------------------------------------------- */

  /**
   * Tags used to annotate this Gesture.
   * @returns {string[]}
   */
  get tags() {
    const tags = [SYSTEM.ABILITIES[this.scaling].label];

    // Damage
    if ( this.damage.base ) tags.push(`${this.damage.base} Damage`);

    // Target
    if ( this.target.type !== "none" ) {
      let target = SYSTEM.ACTION.TARGET_TYPES[this.target.type].label;
      if ( this.target.number > 1 ) target += ` ${this.target.number}`;
      tags.push(target);
    }

    // Range
    if ( this.range.maximum ) tags.push(`Range ${this.range.maximum}`);

    // Cost
    if ( this.cost.action !== 0 ) tags.push(`${this.cost.action}A`);
    if ( this.cost.focus !== 0 ) tags.push(`${this.cost.focus}F`);
    if ( this.cost.heroism !== 0 ) tags.push(`${this.cost.heroism}H`);
    return tags;
  }
}/**
 * The data structure and functionality of a Metamagic Inflection in the Crucible spellcraft system.
 */
class CrucibleSpellcraftInflection extends foundry.abstract.DataModel {
  constructor({hooks={}, ...data}, options) {
    super(data, options);
    this.hooks = Object.freeze(hooks);
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      id: new fields.StringField({required: true, blank: false}),
      name: new fields.StringField(),
      img: new fields.FilePathField({categories: ["IMAGE"]}),
      adjective: new fields.StringField(),
      cost: new fields.SchemaField({
        action: new fields.NumberField({required: true, nullable: false, integer: true, initial: 0}),
        focus: new fields.NumberField({required: true, nullable: false, integer: true, initial: 0})
      })
    }
  }

  /**
   * Action Hooks which applied to spells with this Inflection
   * @type {Record<string, function>}
   */
  hooks;

  /* -------------------------------------------- */

  /** @inheritDoc */
  _initialize() {
    super._initialize();
    this.adjective = game.i18n.localize(`${this.name}Adj`);
    this.name = game.i18n.localize(this.name);
  }

  /* -------------------------------------------- */

  /**
   * One-time initialization to instantiate SYSTEM.SPELL.INFLECTIONS.
   */
  static initialize() {
    const inflections = SYSTEM.SPELL.INFLECTIONS;
    for ( const [k, v] of Object.entries(inflections) ) {
      inflections[k] = new CrucibleSpellcraftInflection(v);
    }
    Object.freeze(inflections);
  }

  /* -------------------------------------------- */

  /** @override */
  toString() {
    return this.name;
  }

  /* -------------------------------------------- */

  /**
   * Tags used to annotate this Gesture.
   * @returns {string[]}
   */
  get tags() {
    const tags = [];
    if ( this.cost.action !== 0 ) tags.push(`${this.cost.action}A`);
    if ( this.cost.focus !== 0 ) tags.push(`${this.cost.focus}F`);
    return tags;
  }
}// Fields
var models=/*#__PURE__*/Object.freeze({__proto__:null,CrucibleAccessoryItem:CrucibleAccessoryItem,CrucibleAction:CrucibleAction,CrucibleAdversaryActor:CrucibleAdversaryActor,CrucibleAncestryItem:CrucibleAncestryItem,CrucibleArchetypeItem:CrucibleArchetypeItem,CrucibleArmorItem:CrucibleArmorItem,CrucibleBackgroundItem:CrucibleBackgroundItem,CrucibleBaseActor:CrucibleBaseActor,CrucibleCombatChallenge:CrucibleCombatChallenge,CrucibleConsumableItem:CrucibleConsumableItem,CrucibleExplorationChallenge:CrucibleExplorationChallenge,CrucibleGroupActor:CrucibleGroupActor,CrucibleHeroActor:CrucibleHeroActor,CrucibleLootItem:CrucibleLootItem,CruciblePhysicalItem:CruciblePhysicalItem,CrucibleSchematicItem:CrucibleSchematicItem,CrucibleSocialChallenge:CrucibleSocialChallenge,CrucibleSpellAction:CrucibleSpellAction,CrucibleSpellItem:CrucibleSpellItem,CrucibleSpellcraftGesture:CrucibleSpellcraftGesture,CrucibleSpellcraftInflection:CrucibleSpellcraftInflection,CrucibleSpellcraftRune:CrucibleSpellcraftRune,CrucibleTalentItem:CrucibleTalentItem,CrucibleTaxonomyItem:CrucibleTaxonomyItem,CrucibleWeaponItem:CrucibleWeaponItem,fields:fields$1});/**
 * The set of sound files used for UI clicks.
 * @type {string[]}
 */
const CLICK_SOUNDS = [
  "systems/crucible/audio/click1.wav",
  "systems/crucible/audio/click2.wav",
  "systems/crucible/audio/click3.wav",
  "systems/crucible/audio/click4.wav",
  "systems/crucible/audio/click5.wav"
];

async function playClick(volume=0.5) {
  const src = CLICK_SOUNDS[Math.floor(Math.random() * CLICK_SOUNDS.length)];
  await game.audio.play(src, {volume, loop: false, context: game.audio.interface});
}var audio=/*#__PURE__*/Object.freeze({__proto__:null,CLICK_SOUNDS:CLICK_SOUNDS,playClick:playClick});const HOOKS$2 = {};

/* -------------------------------------------- */

HOOKS$2.determination = {
  prepareDefenses(item, defenses) {
    const {quality, enchantment} = item.system.config;
    defenses.willpower.bonus += Math.min(quality.bonus, enchantment.bonus);
  }
};

/* -------------------------------------------- */

HOOKS$2.evasion = {
  prepareDefenses(item, defenses) {
    const {quality, enchantment} = item.system.config;
    defenses.dodge.bonus += Math.min(quality.bonus, enchantment.bonus);
  }
};

/* -------------------------------------------- */

HOOKS$2.nimbleness = {
  prepareDefenses(item, defenses) {
    const {quality, enchantment} = item.system.config;
    defenses.reflex.bonus += Math.min(quality.bonus, enchantment.bonus);
  }
};

/* -------------------------------------------- */

HOOKS$2.reinforcement = {
  prepareDefenses(item, defenses) {
    const {quality, enchantment} = item.system.config;
    defenses.armor.bonus += Math.min(quality.bonus, enchantment.bonus);
  }
};

/* -------------------------------------------- */

HOOKS$2.tenacity = {
  prepareDefenses(item, defenses) {
    const {quality, enchantment} = item.system.config;
    defenses.fortitude.bonus += Math.min(quality.bonus, enchantment.bonus);
  }
};const HOOKS$1 = {};

/* -------------------------------------------- */

HOOKS$1.acidSpit = {
  postActivate(outcome) {
    if ( outcome.rolls.some(r => r.isCriticalSuccess) ) {
      const amount = this.actor.abilities.toughness.value;
      outcome.effects.push(SYSTEM.EFFECTS.corroding(this.actor, {amount}));
    }
  }
};

/* -------------------------------------------- */

HOOKS$1.acidSpray = {
  postActivate(outcome) {
    if ( outcome.rolls.some(r => r.isCriticalSuccess) ) {
      const amount = this.actor.abilities.toughness.value;
      outcome.effects.push(SYSTEM.EFFECTS.corroding(this.actor, {amount}));
    }
  }
};

/* -------------------------------------------- */

HOOKS$1.alchemistsFire = {
  prepare() {
    const tiers = {
      shoddy: {duration: 2, amount: 2},
      standard: {duration: 3, amount: 3},
      fine: {duration: 4, amount: 4},
      superior: {duration: 5, amount: 6},
      masterwork: {duration: 6, amount: 8},
    };
    const burning = SYSTEM.EFFECTS.burning(this.actor, tiers[this.item.system.quality]);
    foundry.utils.mergeObject(this.effects[0], burning);
  }
};

/* -------------------------------------------- */

HOOKS$1.antitoxin = {
  async confirm(reverse) {
    if ( reverse ) return; // Eventually would be nice to store the removed toxin effects so this can be reversible
    const tiers = {shoddy: 3, standard: 5, fine: 7, superior: 9, masterwork: 11};
    const neutralizeAmount = tiers[this.item.system.quality];
    const targetSelf = this.outcomes.size === 1;
    for ( const outcome of this.outcomes.values() ) {
      if ( outcome.self && !targetSelf ) continue;
      const effectsToDelete = [];
      for ( const effect of outcome.target.effects ) {
        if ( !effect.statuses.has("poisoned") || !effect.flags.crucible?.dot ) continue;
        const dot = effect.flags.crucible.dot;
        const poisonAmount = (dot.health || 0) + (dot.morale || 0);
        if ( poisonAmount <= neutralizeAmount ) effectsToDelete.push(effect.id);
      }
      if ( effectsToDelete.length ) await outcome.target.deleteEmbeddedDocuments("ActiveEffect", effectsToDelete);
    }
  }
};

/* -------------------------------------------- */

HOOKS$1.assessStrength = {
  configure(targets) {
    const target = targets[0]?.actor;
    if ( !target ) return;
    const targetCategory = SYSTEM.ACTOR.CREATURE_CATEGORIES[target.system.details.taxonomy?.category];
    if ( !targetCategory ) return;
    const {skill, knowledge} = targetCategory;
    SYSTEM.ACTION.TAGS[skill]?.initialize.call(this);
    this.usage.dc = SYSTEM.PASSIVE_BASE + target.level;
    if ( this.actor.hasKnowledge(knowledge) ) {
      const knowledgeLabel = SYSTEM.SKILL.DEFAULT_KNOWLEDGE[knowledge].label;
      this.usage.boons.assessStrength = {label: `Knowledge: ${knowledgeLabel}`, number: 2};
    }
  },
  async roll(outcome) {
    const skill = this.usage.skillId;
    if ( !skill ) return;
    await SYSTEM.ACTION.TAGS[skill]?.roll.call(this, outcome);
  }
};

/* -------------------------------------------- */

HOOKS$1.berserkStrike = {
  prepare() {
    const health = this.actor.resources.health;
    const pct = health.value / health.max;
    let damageBonus = 0;
    if ( pct < 0.25 ) damageBonus = 3;
    else if ( pct < 0.5 ) damageBonus = 2;
    else if ( pct < 0.75 ) damageBonus = 1;
    const weapon = this.usage.strikes[0];
    if ( weapon.config.category.hands === 2 ) damageBonus *= 2;
    if ( damageBonus ) {
      this.usage.bonuses.damageBonus ||= 0;
      this.usage.bonuses.damageBonus += damageBonus;
    }
  }
};

/* -------------------------------------------- */

HOOKS$1.blastFlask = {
  prepare() {
    this.target.size = {shoddy: 3, standard: 4, fine: 6, superior: 8, masterwork: 10}[this.item.system.quality];
  }
};

/* -------------------------------------------- */

HOOKS$1.causticPhial = {
  prepare() {
    const tiers = {
      shoddy: {duration: 2, amount: 2},
      standard: {duration: 3, amount: 3},
      fine: {duration: 4, amount: 4},
      superior: {duration: 5, amount: 6},
      masterwork: {duration: 6, amount: 8},
    };
    const corroding = SYSTEM.EFFECTS.corroding(this.actor, tiers[this.item.system.quality]);
    foundry.utils.mergeObject(this.effects[0], corroding);
  }
};

/* -------------------------------------------- */

HOOKS$1.clarifyIntent = {
  async postActivate(outcome) {
    const roll = outcome.rolls[0];
    if ( roll?.isSuccess ) {
      roll.data.damage.multiplier = 0;
      roll.data.damage.base = roll.data.damage.total = 1;
      roll.data.damage.resource = "focus";
    }

    const effect = outcome.effects[0];
    if ( !effect ) return;
    effect.changes ||= [];
    effect.changes.push(
      {key: "system.rollBonuses.boons.clarifyIntent.number", mode: 5, value: 1},
      {key: "system.rollBonuses.boons.clarifyIntent.label", mode: 5, value: this.name}
    );
  }
};

/* -------------------------------------------- */

HOOKS$1.delay = {
  canUse() {
    if ( game.combat?.combatant?.actor !== this.actor ) {
      throw new Error("You may only use the Delay action on your own turn in combat.");
    }
    if ( this.actor.flags.crucible?.delay ) {
      throw new Error("You may not delay your turn again this combat round.");
    }
  },
  // TODO refactor to roll()?
  async preActivate(targets) {
    const combatant = game.combat.getCombatantByActor(this.actor);
    const maximum = combatant.getDelayMaximum();
    const response = await foundry.applications.api.DialogV2.prompt({
      window: { title: "Delay Turn" },
      content: `<form class="delay-turn" autocomplete="off">
            <div class="form-group">
                <label>Delayed Initiative</label>
                <input name="initiative" type="number" min="1" value="${maximum - 1}" max="${maximum}" step="1">
                <p class="hint">Choose an initiative value between 1 and ${maximum} when you wish to act.</p>
            </div>
        </form>`,
      ok: {
        label: "Delay",
        callback: (event, button, dialog) => button.form.elements.initiative.valueAsNumber
      },
      rejectClose: false
    });
    if ( response ) this.outcomes.get(this.actor).metadata.initiativeDelay = response;
  },
  async confirm() {
    return this.actor.delay(this.outcomes.get(this.actor).metadata.initiativeDelay);
  }
};

/* -------------------------------------------- */

HOOKS$1.feintingStrike = {
  async roll(outcome) {
    this.usage.defenseType = "reflex";
    const deception = await this.actor.skillAttack(this, outcome);
    if ( deception.data.damage ) deception.data.damage.total = 0;
    if ( deception.isSuccess ) {
      this.usage.boons.feintingStrike = {label: "Feinting Strike", number: 2};
      this.usage.bonuses.damageBonus += 6;
    }
    const offhand = this.actor.equipment.weapons.offhand;
    this.usage.defenseType = "physical";
    const attack = await this.actor.weaponAttack(this, offhand, outcome);
    outcome.rolls.push(deception, attack);
  }
};

/* -------------------------------------------- */

HOOKS$1.healingElixir = {
  postActivate(outcome) {
    const quality = this.usage.consumable.config.quality;
    let amount = 6;
    for ( let i=1; i<=(quality.bonus+1); i++ ) amount *= 2;
    outcome.resources.health = (outcome.resources.health || 0) + amount;
  }
};

/* -------------------------------------------- */

HOOKS$1.healingTonic = {
  postActivate(outcome) {
    const quality = this.usage.consumable.config.quality;
    let amount = 2;
    for ( let i=1; i<=(quality.bonus+1); i++ ) amount *= 2;
    const effect = outcome.effects[0];
    effect._id = SYSTEM.EFFECTS.getEffectId(this.id);
    foundry.utils.setProperty(effect, "flags.crucible.dot.health", -amount);
    outcome.resources.health = (outcome.resources.health || 0) + amount;
  }
};

/* -------------------------------------------- */

HOOKS$1.intuitWeakness = {
  configure(targets) {
    const target = targets[0]?.actor;
    if ( !target ) return;
    const targetCategory = SYSTEM.ACTOR.CREATURE_CATEGORIES[target.system.details.taxonomy?.category];
    if ( !targetCategory ) return;
    const {skill, knowledge} = targetCategory;
    SYSTEM.ACTION.TAGS[skill]?.initialize.call(this);
    this.usage.dc = SYSTEM.PASSIVE_BASE + target.level;
    if ( this.actor.hasKnowledge(knowledge) ) {
      const knowledgeLabel = SYSTEM.SKILL.DEFAULT_KNOWLEDGE[knowledge].label;
      this.usage.boons.intuitWeakness = {label: `Knowledge: ${knowledgeLabel}`, number: 2};
    }
  },
  async roll(outcome) {
    const skill = this.usage.skillId;
    if ( !skill ) return;
    await SYSTEM.ACTION.TAGS[skill]?.roll.call(this, outcome);
  }
};

/* -------------------------------------------- */

HOOKS$1.laughingMatter = {
  postActivate(outcome) {
    if ( outcome.target === this.actor ) return;
    const effect = outcome.effects[0];
    effect.changes ||= [];
    effect.changes.push(
      {key: "system.rollBonuses.banes.laughingMatter.number", mode: 5, value: 1},
      {key: "system.rollBonuses.banes.laughingMatter.label", mode: 5, value: this.name},
    );
  }
};

/* -------------------------------------------- */

HOOKS$1.oozeMultiply = {
  postActivate(outcome) {
    outcome.actorUpdates ||= {};
    const newSizeBonus = this.actor.system.movement.sizeBonus + 1;
    const healthAmount = this.actor.abilities.toughness.value;
    foundry.utils.setProperty(outcome.actorUpdates, "system.movement.sizeBonus", newSizeBonus);
    outcome.resources.health = (outcome.resources.health || 0) + healthAmount;
  }
};

/* -------------------------------------------- */

HOOKS$1.oozeSubdivide = {
  prepare() {
    const newHealth = Math.ceil(this.actor.system.resources.health.value / 2);
    const newSize = this.actor.system.movement.sizeBonus - 1;
    const systemData = {
      advancement: {
        rank: this.actor.system.advancement.rank === "minion" ? "minion" : "normal",
      },
      movement: {
        sizeBonus: newSize
      },
      resources: {
        health: {
          value: newHealth
        }
      }
    };

    // Configure summon
    this.usage.summons = [{
      actorUuid: this.actor.uuid,
      tokenData: {
        width: this.actor.size - 1,
        height: this.actor.size - 1,
        delta: {
          system: systemData
        }
      },
      permanent: true
    }];

    // Actor change
    foundry.utils.mergeObject(this.usage.actorUpdates, {system: systemData});
  },
  canUse() {
    if ( this.actor.size < 3 ) throw new Error(`You must be at least size 3 to use ${this.name}`);
  }
};

/* -------------------------------------------- */

HOOKS$1.poisonIngest = {
  prepare() {
    const tiers = {
      shoddy: {amount: 2, duration: 4},
      standard: {amount: 4, duration: 6},
      fine: {amount: 6, duration: 8},
      superior: {amount: 8, duration: 10},
      masterwork: {amount: 10, duration: 12},
    };
    const poisoned = SYSTEM.EFFECTS.poisoned(this.actor, tiers[this.item.system.quality]);
    foundry.utils.mergeObject(this.effects[0], poisoned);
  }
};

/* -------------------------------------------- */

HOOKS$1.pouncingStrike = {
  postActivate(outcome) {
    if ( !outcome.rolls.every(r => r.isCriticalSuccess) ) outcome.effects.length = 0;
  }
};

/* -------------------------------------------- */

HOOKS$1.selfRepair = {
  postActivate(outcome) {
    outcome.resources.health = this.actor.abilities.toughness.value;
  }
};

/* -------------------------------------------- */

HOOKS$1.spellband = {
  postActivate(outcome) {
    const enchantment = this.item.config.enchantment;
    const amount = 2 + (2 * enchantment.bonus);
    outcome.resources.focus = (outcome.resources.focus || 0) + amount;
  }
};

/* -------------------------------------------- */

HOOKS$1.swoopingStrike = {
  postActivate(outcome) {
    if ( !outcome.rolls.every(r => r.isCriticalSuccess) ) outcome.effects.length = 0;
  }
};

/* -------------------------------------------- */

HOOKS$1.rakingTalons = {
  initialize() {
    this.usage.weapon = this.actor.equipment.weapons.natural.find(w => w.system.identifier === "talons");
  },
  canUse() {
    if ( this.usage.weapon?.system.identifier !== "talons" ) {
      throw new Error("Must have a natural weapon identified as \"talons\" to use this action.");
    }
  },
};

/* -------------------------------------------- */

HOOKS$1.rallyingElixir = {
  postActivate(outcome) {
    const quality = this.usage.consumable.config.quality;
    let amount = 6;
    for ( let i=1; i<=(quality.bonus+1); i++ ) amount *= 2;
    outcome.resources.morale = (outcome.resources.morale || 0) + amount;
  }
};

/* -------------------------------------------- */

HOOKS$1.rallyingTonic = {
  postActivate(outcome) {
    const quality = this.usage.consumable.config.quality;
    let amount = 2;
    for ( let i=1; i<=(quality.bonus+1); i++ ) amount *= 2;
    const effect = outcome.effects[0];
    effect._id = SYSTEM.EFFECTS.getEffectId(this.id);
    foundry.utils.setProperty(effect, "flags.crucible.dot.morale", -amount);
    outcome.resources.morale = (outcome.resources.morale || 0) + amount;
  }
};

/* -------------------------------------------- */

HOOKS$1.reactiveStrike = {
  canUse() {
    for ( const s of ["unaware", "flanked"] ) {
      if ( this.actor.statuses.has(s) ) throw new Error(`You may not perform a Reactive Strike while ${s}.`);
    }
  }
};

/* -------------------------------------------- */

HOOKS$1.recover = {
  async confirm() {
    await this.actor.recover();
  }
};

/* -------------------------------------------- */

HOOKS$1.refocus = {
  async confirm() {
    const self = this.outcomes.get(this.actor);
    const {mainhand: mh, offhand: oh} = this.actor.equipment.weapons;
    const talisman = ["talisman1", "talisman2"].includes(mh.system.category) ? mh : oh;
    self.resources.focus = (self.resources.focus || 0) + talisman.system.config.category.hands;
  }
};

/* -------------------------------------------- */

HOOKS$1.reload = {
  prepare() {
    const a = this.actor;
    const {reloaded} = a.system.status;
    if ( a.talentIds.has("pistoleer0000000") && !reloaded ) this.cost.action = 0; // TODO generalize
    this.usage.actorStatus.reloaded = true;
  }
};

/* -------------------------------------------- */

HOOKS$1.repercussiveBlock = {
  postActivate(outcome) {
    if ( outcome.target === this.actor ) return;
    if ( outcome.rolls.every(r => r.isSuccess) ) {
      const {mainhand} = outcome.target.equipment.weapons; // TODO - react to the prior action?
      if ( !mainhand?.id || mainhand.properties.has("natural") ) return;
      outcome.actorUpdates.items ||= [];
      outcome.actorUpdates.items.push({_id: mainhand.id, system: {dropped: true, equipped: false}});
      outcome.statusText.push({text: "Disarmed!", fontSize: 64});
    }
  }
};

/* -------------------------------------------- */

HOOKS$1.rest = {
  async confirm() {
    await this.actor.rest();
  }
};

/* -------------------------------------------- */

HOOKS$1.restrainingChomp = {
  postActivate(outcome) {
    if ( outcome.target.size > this.actor.size ) outcome.effects.length = 0;
  }
};

/* -------------------------------------------- */

HOOKS$1.ruthlessMomentum = {
  prepare() {
    if ( this.actor ) this.range.maximum = this.actor.system.movement.stride;
  }
};

/* -------------------------------------------- */

HOOKS$1.thrash = {
  preActivate(targets) {
    if ( targets.some(target => !target.actor?.statuses.has("restrained")) ) {
      throw new Error("You can only perform Thrash against a target that you have Restrained.");
    }
  }
};

/* -------------------------------------------- */

HOOKS$1.threadTheNeedle = {
  configure(targets) {
    for ( const {actor: target} of targets ) {
      const outcome = this.outcomes.get(target);
      outcome.usage.boons ||= {};
      if ( target.statuses.has("flanked") ) {
        const ae = target.effects.get(SYSTEM.EFFECTS.getEffectId("flanked"));
        outcome.usage.boons.flanked = {label: "Flanked", number: ae?.getFlag("crucible", "flanked") ?? 1};
      }
    }
  }
};

/* -------------------------------------------- */

HOOKS$1.uppercut = {
  preActivate(targets) {
    const lastAction = this.actor.lastConfirmedAction;
    if ( !lastAction.outcomes.has(targets[0].actor) ) {
      throw new Error(`${this.name} must attack the same target as the Strike which it follows.`);
    }
  }
};

/* -------------------------------------------- */

HOOKS$1.venomousBite = {
  postActivate(outcome) {
    if ( outcome.target === this.actor ) return;
    foundry.utils.mergeObject(outcome.effects[0], SYSTEM.EFFECTS.poisoned(this.actor));
  }
};const HOOKS = {};

/* -------------------------------------------- */

HOOKS.arcanearcher0000 = {
  prepareAction(item, action) {
    if ( !action.tags.has("spell") ) return;
    const mh = this.equipment.weapons.mainhand;
    if ( !["projectile1", "projectile2"].includes(mh.category) ) return;

    // Ignore hands for Gesture: Arrow
    if ( action.gesture.id === "arrow" ) {
      action.cost.hands = 0;
      action.range.weapon = true;
      action.range.maximum = mh.system.range;
    }

    // Reduce cost of spell following strike
    const lastAction = this.lastConfirmedAction;
    if ( lastAction?.tags.has("strike") ) action.cost.action -= 1;
  }
};

/* -------------------------------------------- */

HOOKS.armoredShell0000 = {
  prepareDefenses(item, defenses) {
    if ( !this.statuses.has("guarded") ) return;
    const offhand = this.equipment.weapons.offhand;
    if ( offhand.category !== "shieldHeavy" ) return;
    const halfArmor = Math.ceil(defenses.armor.base / 2);
    defenses.armor.base -= halfArmor;
    defenses.block.bonus += halfArmor;
  }
};

/* -------------------------------------------- */

HOOKS.bard000000000000 = {
  prepareSpellAttack(item, spell, _target, rollData) {
    if ( spell.rune.id === "spirit" ) rollData.boons.bard = {label: item.name, number: 2};
  }
};

/* -------------------------------------------- */

HOOKS.bloodmagic000000 = {
  prepareAction(item, action) {
    if ( !action.tags.has("spell") ) return;
    action.cost.health = action.cost.focus * 10;
    action.cost.focus = 0;
  },
  confirmActionOutcome(item, action, outcome, _options) {
    if ( action.target !== this ) return;
    outcome.resources.health = Math.min(outcome.resources.health, -action.cost.health);
  }
};

/* -------------------------------------------- */

HOOKS.bloodSense000000 = {
  prepareWeaponAttack(_item, _action, target, rollData) {
    if ( target.resources.health.value < target.resources.health.max ) delete rollData.banes.blind;
  },
  prepareSkillAttack(_item, _action, target, rollData) {
    if ( target.resources.health.value < target.resources.health.max ) delete rollData.banes.blind;
  }
};

/* -------------------------------------------- */

HOOKS.coldAbsorption00 = {
  prepareResistances(_item, resistances) {
    resistances.cold.base *= 2;
  },
  receiveAttack(_item, _action, roll) {
    const dmg = roll.data.damage;
    if ( (dmg.type !== "cold") || dmg.restoration || (dmg.total > 0) ) return;
    const unmitigatedTotal = crucible.api.models.CrucibleAction.computeDamage({...dmg, resistance: 0});
    dmg.restoration = true;
    dmg.total = dmg.resistance - unmitigatedTotal;
  }
};

/* -------------------------------------------- */

HOOKS.conserveeffort00 = {
  endTurn(item, {resourceRecovery, statusText}) {
    if ( this.resources.action.value ) {
      resourceRecovery.focus = (resourceRecovery.focus || 0) + 1;
      statusText.push({text: "Conserve Effort", fillColor: SYSTEM.RESOURCES.focus.color.css});
    }
  }
};

/* -------------------------------------------- */

HOOKS.irrepressiblespi = {
  startTurn(item, {resourceRecovery}) {
    if ( !this.system.isBroken ) resourceRecovery.morale = (resourceRecovery.morale || 0) + 1;
  }
};

/* -------------------------------------------- */

HOOKS.healer0000000000 = {
  prepareSpellAttack(item, spell, _target, rollData) {
    if ( spell.rune.id === "life" ) rollData.boons.healer = {label: item.name, number: 2};
  }
};

/* -------------------------------------------- */

HOOKS.lesserregenerati = {
  startTurn(item, {resourceRecovery}) {
    if ( !this.system.isWeakened ) resourceRecovery.health = (resourceRecovery.health || 0) + 1;
  }
};

/* -------------------------------------------- */

HOOKS.preparedness0000 = {
  preActivateAction(item, action, _targets) {
    if ( action.id !== "equipWeapon" ) return;
    if ( action.cost.action && !this.system.status.hasMoved ) {
      action.cost.action = 0;
      action.usage.actorStatus.hasMoved = true;
    }
  }
};


/* -------------------------------------------- */

HOOKS.powerfulThrow000 = {
  prepareAction(item, action) {
    if ( action.tags.has("thrown") ) {
      action.range.maximum *= 2;
    }
  }
};

/* -------------------------------------------- */

HOOKS.spellblade000000 = {
  prepareAction(item, action) {
    if ( !action.tags.has("spell") ) return;
    const mh = this.equipment.weapons.mainhand;
    if ( mh.config.category.ranged ) return;

    // Add weapon damage bonus to Strike gesture
    if ( action.gesture.id === "strike" ) {
      action.damage.bonus = (action.damage.bonus ?? 0) + mh.system.damage.bonus;
    }

    // Reduce cost of spell following strike
    const lastAction = this.lastConfirmedAction;
    if ( lastAction?.tags.has("strike") ) action.cost.action -= 1;
  }
};

/* -------------------------------------------- */

HOOKS.spellmute0000000 = {
  defendSpellAttack(item, spell, origin, rollData) {
    rollData.banes.spellmute = {label: item.name, number: 2};
  },
  prepareActions(actions) {
    for ( const [id, action] of Object.entries(actions) ) {
      if ( action.tags.has("spell") ) delete actions[id];
    }
    delete actions.cast;
  }
};

/* -------------------------------------------- */

HOOKS.stronggrip000000 = {
  prepareActions(_actions) {
    const weapons = this.equipment.weapons;
    if ( weapons.twoHanded ) {
      weapons.freeHands += 1;
      weapons.spellHands += 1;
    }
  }
};

/* -------------------------------------------- */

HOOKS.evasiveshot00000 = {
  prepareWeaponAttack(item, action, _target, _rollData) {
    const isRanged = action.usage.strikes.some(w => w.system.config.category.ranged);
    if ( isRanged ) {
      const movementBonus = (this.system.status.movement?.bonus ?? 0) + Math.ceil(this.system.movement.stride / 2);
      foundry.utils.setProperty(action.usage.actorStatus, "movement.bonus", movementBonus);
    }
  }
};const weapon = {};
const armor = {};var hooks=/*#__PURE__*/Object.freeze({__proto__:null,accessory:HOOKS$2,action:HOOKS$1,armor:armor,talent:HOOKS,weapon:weapon});function handleSocketEvent({action=null, data={}}={}) {
  switch (action) {
    case "diceContest":
      return;
    case "diceGroupCheck":
      return;
  }
}/**
 * Register custom text editor enrichers that are applied to Crucible content.
 */
function registerEnrichers() {
  CONFIG.TextEditor.enrichers.push(
    {
      id: "award",
      pattern: /\[\[\/award ([-\w\s]+)]]/g,
      enricher: enrichAward,
      onRender: renderAward
    },
    { // Crucible Hazards
      id: "crucibleHazard",
      pattern: /\[\[\/hazard ([\w\s]+)]](?:{([^}]+)})?/g,
      enricher: enrichHazard,
      onRender: renderHazard
    },
    { // Crucible Skill Checks
      id: "crucibleSkill",
      pattern: /\[\[\/skillCheck ([\w\s]+)]]/g,
      enricher: enrichSkillCheck,
      onRender: renderSkillCheck
    },
    { // Knowledge Test
      id: "crucibleKnowledge",
      pattern: /\[\[\/knowledge (\w+)]]/g,
      enricher: enrichKnowledge
    },
    { // Language Test
      id: "crucibleLanguage",
      pattern: /\[\[\/language (\w+)]]/g,
      enricher: enrichLanguage
    },
    { // D&D5e Skill Checks
      id: "dnd5eSkill",
      pattern: /\[\[\/skill ([\w\s]+)]]/g,
      enricher: enrichDND5ESkill,
      onRender: renderSkillCheck
    },
    {
      id: `crucibleTalent`,
      pattern: /\[\[\/talent ([\w.]+)]]/g,
      enricher: enrichTalent
    },
    {
      id: "crucibleCondition",
      pattern: /@Condition\[(\w+)]/g,
      enricher: enrichCondition
    },
    {
      id: "crucibleSpell",
      pattern: /@Spell\[([\w.]+)]/g,
      enricher: enrichSpell
    },
    {
      id: "milestone",
      pattern: /\[\[\/milestone( \d+)?\]\]/g,
      enricher: enrichMilestone,
      onRender: renderMilestone
    },
    {
      id: "reference",
      pattern: /@ref\[([\w.]+)](?:{([^}]+)})?/g,
      enricher: enrichRef
    }
  );
}

/* -------------------------------------------- */

const DND5E_SKILL_MAPPING = {
  "acr": "athletics",
  "acrobatics": "athletics",
  "ani": "wilderness",
  "animalHandling": "wilderness",
  "arc": "arcana",
  "arcana": "arcana",
  "ath": "athletics",
  "athletics": "athletics",
  "dec": "deception",
  "deception": "deception",
  "his": "society",
  "history": "society",
  "ins": "deception",
  "insight": "deception",
  "itm": "intimidation",
  "intimidation": "intimidation",
  "inv": "awareness",
  "investigation": "awareness",
  "med": "medicine",
  "medicine": "medicine",
  "nat": "wilderness",
  "nature": "wilderness",
  "prc": "awareness",
  "perception": "awareness",
  "prf": "performance",
  "performance": "performance",
  "per": "diplomacy",
  "persuasion": "diplomacy",
  "rel": "arcana",
  "religion": "arcana",
  "slt": "stealth",
  "sleightOfHand": "stealth",
  "ste": "stealth",
  "stealth": "stealth",
  "sur": "wilderness",
  "survival": "wilderness"
};

function enrichDND5ESkill([match, terms]) {
  let [skillId, dc, ...rest] = terms.split(" ");
  if ( !(skillId in DND5E_SKILL_MAPPING) ) return new Text(match);
  const skill = SYSTEM.SKILLS[DND5E_SKILL_MAPPING[skillId]];
  const passive = rest.includes("passive");
  const tag = createSkillCheckElement(skill, dc, {passive, group: false});
  tag.classList.add("dnd5e-skill-check");
  return tag;
}

/* -------------------------------------------- */
/*  Awards                                      */
/* -------------------------------------------- */

/**
 * Parse an award's terms into an object representing what should be gained
 * @param {string} terms
 * @returns {{currency: Record<string, string>, each: boolean}}
 * @throws {Error}
 */
function parseAwardTerms(terms) {
  const pattern = new RegExp(/^(.+?)(\D+)$/);
  const currency = {};
  const invalid = [];
  let each = false;
  for ( const part of terms.split(" ") ) {
    if ( !part ) continue;
    let [, amount, label] = part.match(pattern) ?? [];
    label = label?.toLowerCase();
    try {
      if ( part === "each" ) each = true;
      else if ( !Roll.validate(amount) ) throw new Error();
      else if ( label in crucible.CONFIG.currency ) currency[label] = amount;
      else throw new Error();
    } catch(err) {
      invalid.push(part);
    }
  }

  if ( invalid.length ) throw new Error(game.i18n.format("AWARD.WARNINGS.InvalidTerms", {
    terms: game.i18n.getListFormatter().format(invalid.map(i => `"${i}"`))
  }));

  return { currency, each }
}

/* -------------------------------------------- */

/**
 * Transform a currency object (currency key to amount) into a list of HTML entries for well-formatted display
 * @param {Record<string, string>} currency Currency object
 * @param {boolean} [forcePositive=false]   Whether to return positive-formatted text (to avoid double-negatives)
 * @returns
 */
function formatAwardEntries(currency, forcePositive=false) {
  const entries = [];
  for ( const [currencyKey, amount] of Object.entries(currency) ) {
    const {icon, abbreviation} = crucible.CONFIG.currency[currencyKey];
    if ( icon ) {
      const i = `<i class="currency ${currencyKey}" style="background-image: url(${icon});"></i>`;
      entries.push(i, forcePositive ? Math.abs(amount) : amount);
    } else entries.push(forcePositive ? Math.abs(amount) : amount, abbreviation);
  }
  return entries;
}

/* -------------------------------------------- */

/**
 * Enrich an Award with the format [[/award {...awards}]]
 * @param {string} match
 * @param {string} terms
 */
function enrichAward([match, terms]) {
  let parsed;
  try {
    parsed = parseAwardTerms(terms);
  } catch(err) {
    return new Text(match);
  }
  const {currency, each} = parsed;
  const dataset = {};

  // Award Currency
  for ( const [currencyKey, amount] of Object.entries(currency) ) dataset[`currency.${currencyKey}`] = amount;
  dataset.each = each;
  const entries = formatAwardEntries(currency);
  if ( entries.length && each ) entries.push(game.i18n.localize("AWARD.Each"));

  // Return the enriched content tag
  const tag = document.createElement("enriched-content");
  tag.classList.add("award");
  tag.classList.add("currencies-inline");
  Object.assign(tag.dataset, dataset);
  tag.innerHTML = entries.join(" ");
  tag.setAttribute("aria-label", game.i18n.localize("AWARD.TOOLTIPS.Currency"));
  tag.toggleAttribute("data-tooltip", true);
  return tag;
}

/* -------------------------------------------- */

/**
 * Add interactivity to a rendered award enrichment.
 * @param {HTMLElement} element
 */
function renderAward(element) {
  element.addEventListener("click", onClickAward);
}

/* -------------------------------------------- */

async function onClickAward(event) {
  event.preventDefault();
  if ( !game.user.isGM ) return ui.notifications.warn("AWARD.WARNINGS.RequiresGM", { localize: true });

  const { currency, each: eachString } = foundry.utils.expandObject({...event.currentTarget.dataset});
  const each = eachString === "true";

  const rolls = [];

  for ( const [key, formula] of Object.entries(currency) ) {
    const roll = await new Roll(`${formula}[${crucible.CONFIG.currency[key]?.label ?? key}]`).evaluate();
    currency[key] = roll.total;
    if ( !roll.isDeterministic ) rolls.push(roll);
  }

  let currencyEach = crucible.api.documents.CrucibleActor.convertCurrency(currency);

  // TODO: Consider pulling this logic out and using it for both hazard & award
  const partyMembers = crucible.party?.system.members || [];
  const partyMemberInput = foundry.applications.fields.createMultiSelectInput({
    name: "partyMember",
    type: "checkboxes",
    options: partyMembers.reduce((arr, m) => {
      if ( m.actor ) arr.push({value: m.actorId, label: m.actor.name, selected: true});
      return arr;
    }, [])
  });
  const partyMember = foundry.applications.fields.createFormGroup({
    label: "Party Members",
    hint: "Choose characters in the active party.",
    stacked: true,
    input: partyMemberInput
  });
  const anyActorInput = foundry.applications.elements.HTMLDocumentTagsElement.create({
    type: "Actor",
    name: "anyActor",
  });
  const anyActor = foundry.applications.fields.createFormGroup({
    label: "Any Actor",
    hint: "Alternatively, choose any Actors.",
    input: anyActorInput
  });
  const response = await foundry.applications.api.DialogV2.input({
    window: {title: game.i18n.localize(`AWARD.Title${currencyEach < 0 ? "Cost" : "Reward"}`), icon: "fa-solid fa-trophy"},
    content: `\
    ${partyMember.outerHTML}${anyActor.outerHTML}
    `,
  });

  if (!response) return;

  // Iterate over actor targets
  const targets = new Set([...response.partyMember, ...response.anyActor]);
  if ( !each ) currencyEach = Math.floor(currencyEach / targets.size);
  if ( currencyEach < 0 ) {
    const cannotAfford = targets.map(id => game.actors.get(id)).filter(a => a.system.currency < -currencyEach).map(a => a.name);
    if ( cannotAfford.size ) return ui.notifications.warn(game.i18n.format("AWARD.WARNINGS.CannotAfford", {actors: Array.from(cannotAfford).join(", ")}));
  }
  for ( const actorId of targets ) {
    const actor = game.actors.get(actorId);
    const startingCurrency = actor.system.currency;
    const newCurrency = Math.max(startingCurrency + currencyEach, 0);
    actor.update({
      "system.currency": newCurrency
    });
  }

  const currencyEntries = formatAwardEntries(currency, true);
  const rollsHTML = await Promise.all(rolls.map(r => r.render()));
  await ChatMessage.implementation.create({
    content: `
    <section class="crucible">
      <div class="currencies-inline">
        ${game.i18n.format(`AWARD.SUMMARIES.${(currencyEach < 0) ? "Cost" : "Reward"}${each ? "" : "Split"}`, {award: currencyEntries.join(" ")})}
      </div>
      <ul class="plain">${Array.from(targets.map(t => `<li>${game.actors.get(t).name}</li>`)).join("")}</ul>
    </section>
    `.concat(rollsHTML.join("")),
    rolls,
    speaker: {user: game.user},
    flags: {crucible: {isAwardSummary: true}}
  });
}

/* -------------------------------------------- */
/*  Milestones                                  */
/* -------------------------------------------- */

/**
 * Enrich a Milestone award with the format [[/milestone]] or [[/milestone {quantity}]].
 * @param {RegExpMatchArray} terms
 * @returns {HTMLEnrichedContentElement}
 */
function enrichMilestone([_match, term]) {
  const quantity = Number.isNumeric(term) ? Number(term) : 1;
  const plurals = new Intl.PluralRules(game.i18n.lang);
  const tag = document.createElement("enriched-content");
  tag.classList.add("award", "milestone");
  tag.dataset.quantity = String(quantity);
  tag.innerHTML = `${quantity} ${game.i18n.localize("AWARD.Milestone." + plurals.select(quantity))}`;
  tag.setAttribute("aria-label", game.i18n.localize("AWARD.TOOLTIPS.Milestone"));
  tag.toggleAttribute("data-tooltip", true);
  return tag;
}

/* -------------------------------------------- */

/**
 * Add interactivity to a rendered milestone enrichment.
 * @param {HTMLElement} element
 */
function renderMilestone(element) {
  element.addEventListener("click", onClickMilestone);
}

/* -------------------------------------------- */

async function onClickMilestone(event) {
  event.preventDefault();
  if ( !crucible.party ) return ui.notifications.warn("WARNING.NoParty", { localize: true });

  const quantity = event.currentTarget.dataset.quantity;
  await crucible.party.system.awardMilestoneDialog(quantity);
}

/* -------------------------------------------- */
/*  Hazard Tests                                */
/* -------------------------------------------- */

/**
 * Enrich a hazard test with the format [[/hazard {level} {...tags}]]
 * @param {string} match
 * @param {string} terms
 * @param {string} name
 */
function enrichHazard([match, terms, name]) {
  const [hazard, ...tags] = terms.split(" ");
  const action = crucible.api.models.CrucibleAction.createHazard(undefined, {hazard: Number(hazard), tags});

  // Construct label
  const hazardRank = `Hazard ${hazard}`;
  const tooltip = `${hazardRank} vs. ${SYSTEM.DEFENSES[action.usage.defenseType]?.label} dealing
  ${SYSTEM.DAMAGE_TYPES[action.usage.damageType]?.label} damage to ${SYSTEM.RESOURCES[action.usage.resource]?.label}`;

  // Return the enriched content tag
  const tag = document.createElement("enriched-content");
  tag.classList.add("hazard-check");
  tag.dataset.hazard = hazard;
  tag.dataset.tags = tags;
  tag.innerHTML = name ? `${name} (${hazardRank})` : hazardRank;
  tag.dataset.tooltip = tooltip;
  return tag;
}

/* -------------------------------------------- */

/**
 * Add interactivity to a rendered hazard enrichment.
 * @param {HTMLElement} element
 */
function renderHazard(element) {
  element.addEventListener("click", onClickHazard);
}

/* -------------------------------------------- */

async function onClickHazard(event) {
  event.preventDefault();

  // Select a target
  let actor = inferEnricherActor();
  const partyMembers = crucible.party?.system.members || [];
  if ( !actor ) {
    const partyMemberInput = foundry.applications.fields.createMultiSelectInput({
      name: "partyMember",
      type: "checkboxes",
      options: partyMembers.reduce((arr, m) => {
        if ( m.actor ) arr.push({value: m.actorId, label: m.actor.name});
        return arr;
      }, [])
    });
    const partyMember = foundry.applications.fields.createFormGroup({
      label: "Party Members",
      hint: "Choose characters in the active party.",
      stacked: true,
      input: partyMemberInput
    });
    const anyActorInput = foundry.applications.elements.HTMLDocumentTagsElement.create({
      type: "Actor",
      name: "anyActor",
    });
    const anyActor = foundry.applications.fields.createFormGroup({
      label: "Any Actor",
      hint: "Alternatively, choose any Actors.",
      input: anyActorInput
    });
    const response = await foundry.applications.api.DialogV2.input({
      window: {title: "Choose Target", icon: "fa-solid fa-bullseye"},
      content: `\
      ${partyMember.outerHTML}${anyActor.outerHTML}
      `,
    });

    // Iterate over actor targets
    const element = event.target;
    const {hazard, tags} = element.dataset;
    const targets = new Set([...response.partyMember, ...response.anyActor]);
    for ( const actorId of targets ) {
      const actor = game.actors.get(actorId);
      const action = crucible.api.models.CrucibleAction.createHazard(actor, {
        name: element.innerText,
        hazard: Number(hazard),
        tags: tags.split(",")
      });
      // noinspection ES6MissingAwait
      action.use();
    }
  }
}

/* -------------------------------------------- */
/*  Conditions                                  */
/* -------------------------------------------- */

function enrichCondition([match, conditionId]) {
  const cfg = CONFIG.statusEffects.find(c => c.id === conditionId);
  if ( !cfg ) return new Text(match);
  const tag = document.createElement("enriched-content");
  tag.innerHTML = game.i18n.localize(cfg.name);
  tag.dataset.crucibleTooltip = "condition";
  tag.dataset.condition = conditionId;
  tag.classList.add("condition");
  return tag;
}

/* -------------------------------------------- */
/*  Spells                                      */
/* -------------------------------------------- */

function enrichSpell([match, spellId]) {
  let spell;
  if ( !spellId.startsWith("spell.") ) spellId = `spell.${spellId}`;
  try {
    spell = crucible.api.models.CrucibleSpellAction.fromId(spellId);
  } catch(err) {
    return new Text(match);
  }
  const tag = document.createElement("enriched-content");
  tag.innerHTML = spell.name;
  tag.dataset.spellId = spell.id;
  tag.classList.add("spell");
  tag.dataset.tooltip = "Spell tooltips are still TO-DO."; // TODO
  return tag;
}

/* -------------------------------------------- */
/*  Skill Checks                                */
/* -------------------------------------------- */

function enrichSkillCheck([match, terms]) {
  let [skillId, dc, ...rest] = terms.split(" ");
  if ( skillId in DND5E_SKILL_MAPPING ) skillId = DND5E_SKILL_MAPPING[skillId];
  const skill = SYSTEM.SKILLS[skillId];
  if ( !skill ) return new Text(match);
  const passive = rest.includes("passive");
  const group = rest.includes("group");
  return createSkillCheckElement(skill, dc, {passive, group});
}

/* -------------------------------------------- */

function createSkillCheckElement(skill, dc, {passive=false, group=false}={}) {
  const tag = document.createElement("enriched-content");
  tag.classList.add("skill-check", skill.category);
  if ( group ) tag.classList.add("group-check");
  tag.dataset.skillId = skill.id;
  tag.dataset.dc = dc;
  let dcLabel = `DC ${dc}`;

  // Passive checks only
  if ( passive ) {
    dcLabel += `, Passive`;
    tag.classList.add("passive-check");
    tag.dataset.crucibleTooltip = "passiveCheck";
  }

  // Group checks only
  if ( group ) dcLabel += `, Group`;

  // Create label
  tag.innerHTML = `${skill.label} (${dcLabel})`;
  return tag;
}

/* -------------------------------------------- */

/**
 * Enrich a knowledge check with format [[/knowledge {knowledgeId}]]
 * @param {string} match              The full matched string
 * @param {string} knowledgeId        The matched knowledge ID
 * @returns {HTMLSpanElement|string}
 */
function enrichKnowledge([match, knowledgeId]) {
  const knowledge = crucible.CONFIG.knowledge[knowledgeId];
  if ( !knowledge ) return new Text(match);
  const tag = document.createElement("enriched-content");
  tag.classList.add("knowledge-check", "passive-check", "group-check");
  tag.dataset.crucibleTooltip = "knowledgeCheck";
  tag.dataset.knowledgeId = knowledgeId;
  tag.innerHTML = `Knowledge: ${knowledge.label}`;
  return tag;
}

/* -------------------------------------------- */

/**
 * Enrich a talent check with format [[/talent {talentUuid}]]
 * @param {string} match        The full matched string
 * @param {string} talentUuid   The matched talent UUID
 * @returns {HTMLSpanElement|string}
 */
function enrichTalent([match, talentUuid]) {
  const talentIndex = fromUuidSync(talentUuid); // We only need the index
  if ( !talentIndex ) return new Text(match);
  const tag = document.createElement("enriched-content");
  tag.classList.add("talent-check", "passive-check", "group-check");
  tag.dataset.crucibleTooltip = "talentCheck";
  tag.dataset.talentUuid = talentUuid;
  tag.innerHTML = `Talent: ${talentIndex.name}`;
  return tag;
}
/* -------------------------------------------- */

/**
 * Enrich a language check with format [[/language {languageId}]]
 * @param {string} match              The full matched string
 * @param {string} knowledgeId        The matched knowledge ID
 * @returns {HTMLSpanElement|string}
 */
function enrichLanguage([match, languageId]) {
  const language = crucible.CONFIG.languages[languageId];
  if ( !language ) return new Text(match);
  const tag = document.createElement("enriched-content");
  tag.classList.add("language-check", "passive-check", "group-check");
  tag.dataset.crucibleTooltip = "languageCheck";
  tag.dataset.languageId = languageId;
  tag.innerHTML = `Language: ${language.label}`;
  return tag;
}

/* -------------------------------------------- */
/*  Helpers                                     */
/* -------------------------------------------- */

function renderSkillCheck(element) {
  element.addEventListener("click", onClickSkillCheck);
}

/* -------------------------------------------- */

function onClickSkillCheck(event) {
  event.preventDefault();
  const element = event.currentTarget;
  const {skillId, dc} = element.dataset;
  const actor = inferEnricherActor();
  const check = actor ? actor.getSkillCheck(skillId, {dc}) : new crucible.api.dice.StandardCheck({type: skillId, dc});
  check.dialog({request: game.user.isGM && !actor});
}

/* -------------------------------------------- */

function inferEnricherActor() {
  if ( canvas.ready && (canvas.tokens.controlled.length === 1) ) {
    const controlledToken = canvas.tokens.controlled[0];
    if ( controlledToken.actor?.isOwner && !controlledToken.document.isGroup ) return controlledToken.actor;
  }
  else if ( !game.user.isGM && game.user.character ) {
    if ( game.user.character?.isOwner ) return game.user.character;
  }
  return null;
}

/* -------------------------------------------- */
/*  Journal Helpers                             */
/* -------------------------------------------- */

function enrichRef([match, path, fallback], options) {
  const doc = options.relativeTo;
  if ( !doc ) return new Text(fallback || match);
  const attr = foundry.utils.getProperty(doc, path);
  return new Text(attr || fallback || match);
}function addChatMessageContextOptions(html, options)  {
  if ( !game.user.isGM ) return;

  // Assign difficulty for skill checks
  options.push({
    name: game.i18n.localize("DICE.SetDifficulty"),
    icon: '<i class="fas fa-bullseye"></i>',
    condition: li => {
      const message = game.messages.get(li.dataset.messageId);
      const flags = message.flags.crucible || {};
      return message.isRoll && flags.skill;
    },
    callback: async li => {
      const message = game.messages.get(li.dataset.messageId);
      const roll = message.rolls[0];
      const formData = await foundry.applications.api.DialogV2.input({
        window: {title: game.i18n.localize("DICE.SetDifficulty")},
        content: `\
        <div class="form-group slim">
            <label>DC Target</label>
            <div class="form-fields">
                <input type="number" name="dc" value="${roll.data.dc ?? 15}" autofocus>
            </div>
        </div>`
      });
      for ( const r of message.rolls ) r.data.dc = formData.dc;
      await message.update({rolls: message.rolls}, {diff: false});
    }
  });

  // Confirm Action usage
  options.push({
    name: game.i18n.localize("DICE.Confirm"),
    icon: '<i class="fas fa-hexagon-check"></i>',
    condition: li => {
      const message = game.messages.get(li.dataset.messageId);
      const flags = message.flags.crucible || {};
      return flags.action && !flags.confirmed;
    },
    callback: async li => {
      const message = game.messages.get(li.dataset.messageId);
      return CrucibleAction.confirmMessage(message);
    }
  });

  // Reverse damage
  options.push({
    name: game.i18n.localize("DICE.Reverse"),
    icon: '<i class="fas fa-hexagon-xmark"></i>',
    condition: li => {
      const message = game.messages.get(li.dataset.messageId);
      const flags = message.flags.crucible || {};
      return flags.action && flags.confirmed;
    },
    callback: async li => {
      const message = game.messages.get(li.dataset.messageId);
      return CrucibleAction.confirmMessage(message, {reverse: true});
    }
  });
  return options;
}


/* -------------------------------------------- */

/**
 * Handle keybinding actions to confirm the most recent action in the chat log.
 * @param {KeyboardEventContext} context    The context data of the event
 */
async function onKeyboardConfirmAction(context) {
  const messageIds = Array.from(game.messages.keys()).reverse();
  const now = Date.now();
  const toConfirm = [];
  for ( const id of messageIds ) {
    const message = game.messages.get(id);
    const seconds = (now - message.timestamp) / 1000;
    if ( seconds > 60 ) break;
    const {action, confirmed} = message.flags.crucible || {};
    if ( action && !confirmed ) toConfirm.unshift(message);
  }
  if ( toConfirm.length ) return CrucibleAction.confirmMessage(toConfirm[0]);
}var chat=/*#__PURE__*/Object.freeze({__proto__:null,addChatMessageContextOptions:addChatMessageContextOptions,onKeyboardConfirmAction:onKeyboardConfirmAction});/**
 * Handle pointer enter events to take control over crucible dynamic system tooltips.
 * @param {PointerEvent} event
 */
function onPointerEnter(event) {
  if ( !("crucibleTooltip" in event.target.dataset) ) return;
  if ( "tooltipHtml" in event.target.dataset ) return; // Don't double-render
  switch ( event.target.dataset.crucibleTooltip ) {
    case "action":
      return displayActionTooltip(event);
    case "condition":
      return displayCondition(event);
    case "activeEffect":
    case "spell":
    case "talent":
    case "weapon":
      return displayFromUuid(event);
    case "knowledgeCheck":
      return displayKnowledgeCheck(event);
    case "talentCheck":
      return displayTalentCheck(event);
    case "languageCheck":
      return displayLanguageCheck(event);
    case "passiveCheck":
      return displayPassiveCheck(event);
  }
}

/* -------------------------------------------- */

/**
 * Handle pointer leave events to remove the crucible tooltip so it is later regenerated.
 * @param {PointerEvent} event
 */
function onPointerLeave(event) {
  const element = event.target;
  if ( "crucibleTooltip" in element.dataset ) {
    window.setTimeout(() => {
      if ( (game.tooltip.element === element) || element.matches(":hover") ) return;
      delete element.dataset.tooltipHtml;
    }, 2000);
  }
}

/* -------------------------------------------- */

/**
 * Display an action card as a tooltip.
 * @param {PointerEvent} event
 * @returns {Promise<void>}
 */
async function displayActionTooltip(event) {
  const element = event.target;
  const owner = await fromUuid(element.dataset.uuid);
  let action;
  if ( owner instanceof Actor ) action = owner.actions[element.dataset.actionId];
  else if ( owner instanceof Item ) action = owner.actions.find(a => a.id === element.dataset.actionId);
  if ( !action ) return;
  event.stopImmediatePropagation();

  element.dataset.tooltipHtml = ""; // Placeholder to prevent double-activation
  element.dataset.tooltipHtml = await action.renderCard();
  element.dataset.tooltipClass = "crucible crucible-tooltip";
  const pointerover = new event.constructor(event.type, event);
  element.dispatchEvent(pointerover);
}

/* -------------------------------------------- */

/**
 * On pointerenter, display a dynamic tooltip for the group passive check.
 * @param {PointerEvent} event
 * @returns {Promise<void>}
 */
async function displayPassiveCheck(event) {
  if ( !crucible.party ) return;
  const element = event.target;
  event.stopImmediatePropagation();
  element.dataset.tooltipHtml = ""; // Placeholder to prevent double-activation

  // Define the passive check
  const skillId = element.dataset.skillId;
  const dc = Number(element.dataset.dc);
  const check = async (_group, actor) => {
    const roll = actor.getSkillCheck(skillId, {dc, passive: true});
    await roll.evaluate();
    return {roll};
  };

  // Construct the tooltip
  element.dataset.tooltipHtml = await crucible.party.system.renderGroupCheckTooltip(check, {title: element.innerText});
  element.dataset.tooltipClass = "crucible crucible-tooltip wide";
  const pointerover = new event.constructor(event.type, event);
  element.dispatchEvent(pointerover);
}

/* -------------------------------------------- */

/**
 * On pointerenter, display a dynamic tooltip for the group knowledge check.
 * @param {PointerEvent} event
 * @returns {Promise<void>}
 */
async function displayKnowledgeCheck(event) {
  const element = event.target;
  const knowledgeId = element.dataset.knowledgeId;
  const knowledge = crucible.CONFIG.knowledge[knowledgeId];
  if ( !knowledge || !crucible.party ) return;
  event.stopImmediatePropagation();
  element.dataset.tooltipHtml = ""; // Placeholder to prevent double-activation

  const check = async (group, actor) => ({success: actor.hasKnowledge(knowledgeId)});
  element.dataset.tooltipHtml = await crucible.party.system.renderGroupCheckTooltip(check, {title: element.innerText});
  element.dataset.tooltipClass = "crucible crucible-tooltip wide";
  const pointerover = new event.constructor(event.type, event);
  element.dispatchEvent(pointerover);
}

/* -------------------------------------------- */

/**
 * On pointerenter, display a tooltip for which group members have a specific talent.
 * @param {PointerEvent} event
 * @returns {Promise<void>}
 */
async function displayTalentCheck(event) {
  const element = event.target;
  if ( !crucible.party ) return;
  event.stopImmediatePropagation();
  element.dataset.tooltipHtml = ""; // Placeholder to prevent double-activation

  const parsed = foundry.utils.parseUuid(element.dataset.talentUuid);
  if ( !parsed?.id ) return;
  const check = async (group, actor) => ({success: actor.talentIds.has(parsed.id)});
  element.dataset.tooltipHtml = await crucible.party.system.renderGroupCheckTooltip(check, {title: element.innerText});
  element.dataset.tooltipClass = "crucible crucible-tooltip wide";
  const pointerover = new event.constructor(event.type, event);
  element.dispatchEvent(pointerover);
}

/* -------------------------------------------- */

/**
 * On pointerenter, display a dynamic tooltip for the group language check.
 * @param {PointerEvent} event
 * @returns {Promise<void>}
 */
async function displayLanguageCheck(event) {
  const element = event.target;
  const languageId = element.dataset.languageId;
  const language = crucible.CONFIG.languages[languageId];
  if ( !language || !crucible.party ) return;
  event.stopImmediatePropagation();
  element.dataset.tooltipHtml = ""; // Placeholder to prevent double-activation

  const check = async (group, actor) => ({success: actor.system.details.languages.has(languageId)});
  element.dataset.tooltipHtml = await crucible.party.system.renderGroupCheckTooltip(check, {title: element.innerText});
  element.dataset.tooltipClass = "crucible crucible-tooltip wide";
  const pointerover = new event.constructor(event.type, event);
  element.dispatchEvent(pointerover);
}

/* -------------------------------------------- */

/**
 * Display condition tooltip descriptions.
 * @param {PointerEvent} event
 * @returns {Promise<void>}
 */
async function displayCondition(event) {
  const element = event.target;
  const cfg = CONFIG.statusEffects.find(c => c.id === element.dataset.condition);
  if ( !cfg ) return;
  event.stopImmediatePropagation();
  element.dataset.tooltipHtml = ""; // Placeholder to prevent double-activation

  const page = await fromUuid(cfg.page);
  if ( !page ) return;
  const html = `<h3 class="tooltip-title divider">${page.name}</h3>${page.text.content}`;
  element.dataset.tooltipHtml = await CONFIG.ux.TextEditor.enrichHTML(html);
  element.dataset.tooltipClass = "crucible crucible-tooltip";
  const pointerover = new event.constructor(event.type, event);
  element.dispatchEvent(pointerover);
}

/* -------------------------------------------- */

/**
 * Display any element retrievable by an uuid which exposes a renderCard function.
 * @param {PointerEvent} event
 * @returns {Promise<void>}
 */
async function displayFromUuid(event) {
  const element = event.target;
  const item = await fromUuid(element.dataset.uuid);
  if ( typeof item?.renderCard !== "function" ) return;
  event.stopImmediatePropagation();

  element.dataset.tooltipHtml = ""; // Placeholder to prevent double-activation
  element.dataset.tooltipHtml = await item.renderCard();
  element.dataset.tooltipClass = "crucible crucible-tooltip";
  const pointerover = new event.constructor(event.type, event);
  element.dispatchEvent(pointerover);
}

/* -------------------------------------------- */var interaction=/*#__PURE__*/Object.freeze({__proto__:null,onPointerEnter:onPointerEnter,onPointerLeave:onPointerLeave});const nonGroupTypes = {actorTypes: ["hero", "adversary"]};


const statusEffects = [
  {
    id: "weakened",
    name: "ACTIVE_EFFECT.STATUSES.Weakened",
    img: "systems/crucible/icons/statuses/weakened.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.weakened00000000",
  },
  {
    id: "dead",
    name: "ACTIVE_EFFECT.STATUSES.Dead",
    img: "icons/svg/skull.svg",
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.dead000000000000"
  },
  {
    id: "broken",
    name: "ACTIVE_EFFECT.STATUSES.Broken",
    img: "systems/crucible/icons/statuses/broken.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.broken0000000000"
  },
  {
    id: "insane",
    name: "ACTIVE_EFFECT.STATUSES.Insane",
    img: "systems/crucible/icons/statuses/insane.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.insane0000000000"
  },
  {
    id: "staggered",
    name: "ACTIVE_EFFECT.STATUSES.Staggered",
    img: "systems/crucible/icons/statuses/staggered.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.staggered0000000"
  },
  {
    id: "stunned",
    name: "ACTIVE_EFFECT.STATUSES.Stunned",
    img: "icons/svg/daze.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.stunned000000000"
  },
  {
    id: "prone",
    name: "ACTIVE_EFFECT.STATUSES.Prone",
    img: "icons/svg/falling.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.prone00000000000"
  },
  {
    id: "restrained",
    name: "ACTIVE_EFFECT.STATUSES.Restrained",
    img: "icons/svg/net.svg",
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.restrained000000"
  },
  {
    id: "slowed",
    name: "ACTIVE_EFFECT.STATUSES.Slowed",
    img: "systems/crucible/icons/statuses/slowed.svg",
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.slowed0000000000"
  },
  {
    id: "hastened",
    name: "ACTIVE_EFFECT.STATUSES.Hastened",
    img: "systems/crucible/icons/statuses/hastened.svg",
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.hastened00000000"
  },
  {
    id: "disoriented",
    name: "ACTIVE_EFFECT.STATUSES.Disoriented",
    img: "systems/crucible/icons/statuses/disoriented.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.disoriented00000"
  },
  {
    id: "exhausted",
    name: "ACTIVE_EFFECT.STATUSES.Exhausted",
    img: "systems/crucible/icons/statuses/exhausted.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.exhausted0000000"
  },

  {
    id: "blinded",
    name: "ACTIVE_EFFECT.STATUSES.Blind",
    img: "icons/svg/blind.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.blinded000000000"
  },
  {
    id: "deafened",
    name: "ACTIVE_EFFECT.STATUSES.Deaf",
    img: "icons/svg/deaf.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.deafened00000000"
  },
  {
    id: "silenced",
    name: "ACTIVE_EFFECT.STATUSES.Mute",
    img: "icons/svg/silenced.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.silenced00000000"
  },
  {
    id: "enraged",
    name: "ACTIVE_EFFECT.STATUSES.Enraged",
    img: "systems/crucible/icons/statuses/enraged.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.enraged000000000"
  },
  {
    id: "frightened",
    name: "ACTIVE_EFFECT.STATUSES.Fear",
    img: "icons/svg/terror.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.frightened000000"
  },
  {
    id: "invisible",
    name: "ACTIVE_EFFECT.STATUSES.Invisible",
    img: "icons/svg/invisible.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.invisible0000000"
  },
  {
    id: "resolute",
    name: "ACTIVE_EFFECT.STATUSES.Resolute",
    img: "systems/crucible/icons/statuses/resolute.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.resolute00000000"
  },
  {
    id: "guarded",
    name: "ACTIVE_EFFECT.STATUSES.Guarded",
    img: "systems/crucible/icons/statuses/guarded.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.guarded000000000"
  },
  {
    id: "exposed",
    name: "ACTIVE_EFFECT.STATUSES.Exposed",
    img: "systems/crucible/icons/statuses/exposed.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.exposed000000000"
  },
  {
    id: "flanked",
    name: "ACTIVE_EFFECT.STATUSES.Flanked",
    img: "systems/crucible/icons/statuses/flanked.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.flanked000000000"
  },
  {
    id: "diseased",
    name: "ACTIVE_EFFECT.STATUSES.Diseased",
    img: "icons/svg/acid.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.diseased00000000"
  },
  {
    id: "paralyzed",
    name: "ACTIVE_EFFECT.STATUSES.Paralyzed",
    img: "icons/svg/paralysis.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.paralyzed0000000"
  },
  {
    id: "asleep",
    name: "ACTIVE_EFFECT.STATUSES.Asleep",
    img: "icons/svg/sleep.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.asleep0000000000"
  },
  {
    id: "incapacitated",
    name: "ACTIVE_EFFECT.STATUSES.Incapacitated",
    img: "icons/svg/unconscious.svg",
    hud: nonGroupTypes,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.incapacitated000"
  },
  {
    id: "unaware",
    name: "ACTIVE_EFFECT.STATUSES.Unaware",
    img: "systems/crucible/icons/statuses/unaware.svg",
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.unaware000000000"
  },

  // Damage Over Time
  {
    id: "bleeding",
    name: "Bleeding",
    img: "icons/skills/wounds/blood-spurt-spray-red.webp",
    hud: false,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.bleeding00000000"
  },
  {
    id: "burning",
    name: "Burning",
    img: "icons/magic/fire/projectile-smoke-swirl-red.webp",
    hud: false,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.burning000000000"
  },
  {
    id: "freezing",
    name: "Freezing",
    img: "icons/magic/water/orb-ice-web.webp",
    hud: false,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.freezing00000000"
  },
  {
    id: "confused",
    name: "Confused",
    img: "icons/magic/air/air-burst-spiral-pink.webp",
    hud: false
    // page: TODO
  },
  {
    id: "corroding",
    name: "Corroding",
    img: "icons/magic/earth/orb-stone-smoke-teal.webp",
    hud: false,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.corroding0000000"
  },
  {
    id: "decaying",
    name: "Corroding",
    img: "icons/magic/unholy/strike-beam-blood-red-purple.webp",
    hud: false,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.decaying00000000"
  },
  {
    id: "entropy",
    name: "Entropy",
    img: "icons/magic/unholy/orb-swirling-teal.webp",
    hud: false
    // page: TODO
  },
  {
    id: "irradiated",
    name: "Irradiated",
    img: "icons/magic/light/beams-rays-orange-purple-large.webp",
    hud: false,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.irradiated000000"
  },
  {
    id: "mending",
    name: "Mending",
    img: "icons/magic/life/cross-beam-green.webp",
    hud: false
    // page: TODO
  },
  {
    id: "inspired",
    name: "Inspired",
    img: "icons/magic/light/explosion-star-glow-silhouette.webp",
    hud: false
    // page: TODO
  },
  {
    id: "poisoned",
    name: "Poisoned",
    img: "icons/magic/unholy/orb-smoking-green.webp",
    hud: false,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.poisoned00000000"
  },
  {
    id: "shocked",
    name: "Shocked",
    img: "icons/magic/lightning/bolt-strike-forked-blue.webp",
    hud: false,
    page: "Compendium.crucible.rules.JournalEntry.crucibleConditio.JournalEntryPage.shocked000000000"
  },
];/**
 * Crucible Game System
 * Author: Atropos of Foundry Virtual Tabletop
 * Software License: MIT
 * Repository: https://github.com/foundryvtt/crucible
 */

globalThis.SYSTEM = SYSTEM$1;

// Party
let party = null;

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function() {
  console.log(`Initializing Crucible Game System`);
  const crucible = globalThis.crucible = game.system;
  crucible.CONST = SYSTEM$1;
  CrucibleTalentNode.defineTree();
  crucible.developmentMode = game.data.options.debug;
  crucible.vfxEnabled = !!game.modules.get("foundryvtt-vfx")?.active;

  // Expose the system API
  crucible.api = {
    applications,
    audio,
    canvas: canvas$1,
    dice,
    interaction,
    models,
    documents,
    methods: {
      generateId,
      packageCompendium,
      resetAllActorTalents,
      standardizeItemIds,
      syncTalents
    },
    talents: {
      CrucibleTalentNode,
      nodes: CrucibleTalentNode.nodes
    },
    hooks
  };

  /**
   * Configurable properties of the system which affect its behavior.
   */
  crucible.CONFIG = {
    /**
     * Configured setting-specific currency denominations.
     * @type {Record{string, CrucibleCurrencyDenomination}
     * @see @link{SYSTEM.ACTOR.CURRENCY_DENOMINATIONS}
     */
    currency: foundry.utils.deepClone(SYSTEM$1.ACTOR.CURRENCY_DENOMINATIONS),

    /**
     * Configuration of compendium packs which are used as sources for system workflows.
     * @type {Record<string, Set<string>>}
     */
    packs: {
      ancestry: new Set([SYSTEM$1.COMPENDIUM_PACKS.ancestry]),
      background: new Set([SYSTEM$1.COMPENDIUM_PACKS.background]),
      spell: new Set([SYSTEM$1.COMPENDIUM_PACKS.spell]),
      talent: new Set([SYSTEM$1.COMPENDIUM_PACKS.talent]),
    },
    /**
     * The character creation sheet class which should be registered
     * @type {typeof applications.CrucibleHeroCreationSheet}
     */
    heroCreationSheet: CrucibleHeroCreationSheet,

    /**
     * The knowledge topics configured for the system.
     * @type {Record<string, CrucibleKnowledgeConfig>}
     */
    knowledge: foundry.utils.deepClone(SYSTEM$1.SKILL.DEFAULT_KNOWLEDGE),

    /**
     * The categories a language can belong to.
     * @type {Record<string, {label: string}}
     */
    languageCategories: foundry.utils.deepClone(SYSTEM$1.ACTOR.LANGUAGE_CATEGORIES),

    /**
     * The languages a creature can know.
     * @type {Record<string, {label: string, category?: string}>}
     */
    languages: foundry.utils.deepClone(SYSTEM$1.ACTOR.LANGUAGES)
  };
  /** @deprecated */
  crucible.CONFIG.ancestryPacks = crucible.CONFIG.packs.ancestry;

  /**
   * The primary party of player characters.
   * @type {CrucibleActor|null}
   */
  Object.defineProperty(crucible, "party", {
    get() {
      return party;
    }
  });

  // Active Effect document configuration
  CONFIG.ActiveEffect.documentClass = CrucibleActiveEffect;

  // Actor document configuration
  CONFIG.Actor.documentClass = CrucibleActor;
  CONFIG.Actor.dataModels = {
    adversary: CrucibleAdversaryActor,
    hero: CrucibleHeroActor,
    group: CrucibleGroupActor
  };

  // Combat document configuration
  CONFIG.Combat.documentClass = CrucibleCombat;
  CONFIG.Combat.dataModels = {
    combat: CrucibleCombatChallenge,
    exploration: CrucibleExplorationChallenge,
    social: CrucibleSocialChallenge
  };

  // Item document configuration
  CONFIG.Item.documentClass = CrucibleItem;
  CONFIG.Item.dataModels = {
    accessory: CrucibleAccessoryItem,
    ancestry: CrucibleAncestryItem,
    archetype: CrucibleArchetypeItem,
    armor: CrucibleArmorItem,
    background: CrucibleBackgroundItem,
    consumable: CrucibleConsumableItem,
    loot: CrucibleLootItem,
    schematic: CrucibleSchematicItem,
    spell: CrucibleSpellItem,
    talent: CrucibleTalentItem,
    taxonomy: CrucibleTaxonomyItem,
    weapon: CrucibleWeaponItem
  };
  CONFIG.Item.compendiumIndexFields = ["system.identifier"];

  // Other Document Configuration
  CONFIG.ChatMessage.documentClass = CrucibleChatMessage;
  CONFIG.Combatant.documentClass = CrucibleCombatant;
  CONFIG.Scene.documentClass = CrucibleScene;
  CONFIG.Token.documentClass = CrucibleToken;
  CONFIG.Token.objectClass = CrucibleTokenObject;

  // Time
  CONFIG.time.roundTime = SYSTEM$1.TIME.roundSeconds;

  // Sheet Registrations
  const sheets = foundry.applications.apps.DocumentSheetConfig;
  sheets.unregisterSheet(Actor, "core", foundry.appv1.sheets.ActorSheet);
  sheets.registerSheet(Actor, SYSTEM$1.id, HeroSheet, {types: ["hero"], label: "CRUCIBLE.SHEETS.Hero", makeDefault: true});
  sheets.registerSheet(Actor, SYSTEM$1.id, AdversarySheet, {types: ["adversary"], label: "CRUCIBLE.SHEETS.Adversary", makeDefault: true});
  sheets.registerSheet(Actor, SYSTEM$1.id, CrucibleGroupActorSheet, {types: ["group"], label: "CRUCIBLE.SHEETS.Group", makeDefault: true});

  sheets.unregisterSheet(Item, "core", foundry.appv1.sheets.ItemSheet);
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleAccessoryItemSheet, {types: ["accessory"], label: "CRUCIBLE.SHEETS.Accessory", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleAncestryItemSheet, {types: ["ancestry"], label: "CRUCIBLE.SHEETS.Ancestry", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleArchetypeItemSheet, {types: ["archetype"], label: "CRUCIBLE.SHEETS.Archetype", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleArmorItemSheet, {types: ["armor"], label: "CRUCIBLE.SHEETS.Armor", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleBackgroundItemSheet, {types: ["background"], label: "CRUCIBLE.SHEETS.Background", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleConsumableItemSheet, {types: ["consumable"], label: "CRUCIBLE.SHEETS.Consumable", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleLootItemSheet, {types: ["loot"], label: "CRUCIBLE.SHEETS.Loot", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleTaxonomyItemSheet, {types: ["taxonomy"], label: "CRUCIBLE.SHEETS.Taxonomy", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleWeaponItemSheet, {types: ["weapon"], label: "CRUCIBLE.SHEETS.Weapon", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleSchematicItemSheet, {types: ["schematic"], label: "CRUCIBLE.SHEETS.Schematic", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleSpellItemSheet, {types: ["spell"], label: "CRUCIBLE.SHEETS.Spell", makeDefault: true});
  sheets.registerSheet(Item, SYSTEM$1.id, CrucibleTalentItemSheet, {types: ["talent"], label: "CRUCIBLE.SHEETS.Talent", makeDefault: true});

  sheets.registerSheet(JournalEntry, SYSTEM$1.id, CrucibleJournalEntrySheet, {label: "CRUCIBLE.SHEETS.Journal"});

  // Core Application Overrides
  CONFIG.ui.combat = CrucibleCombatTracker;

  // Custom HTML Elements
  for ( const element of Object.values(_module$3) ) {
    window.customElements.define(element.tagName, element);
  }

  // Font Definitions
  CONFIG.fontDefinitions["AwerySmallcaps"] = {
    editor: true,
    fonts: [{urls: ["systems/crucible/fonts/AwerySmallcaps/AwerySmallcaps.ttf"]}]
  };

  // Rich Text Enrichers
  registerEnrichers();

  // Dice system configuration
  CONFIG.Dice.rolls.push(StandardCheck, AttackRoll, PassiveCheck, InitiativeCheck);

  // Queries
  CONFIG.queries.rollSkillRequest = StandardCheck.handle.bind(StandardCheck);

  // Status Effects
  CONFIG.statusEffects = statusEffects;
  CONFIG.specialStatusEffects.BLIND = "blinded";

  // Canvas Configuration
  configure();

  game.settings.register("crucible", "autoConfirm", {
    name: "SETTINGS.AutoConfirmName",
    hint: "SETTINGS.AutoConfirmHint",
    scope: "world",
    config: true,
    type: Number,
    choices: {
      0: "SETTINGS.AutoConfirmNone",
      1: "SETTINGS.AutoConfirmSelf",
      2: "SETTINGS.AutoConfirmAll"
    },
  });

  // Primary party
  game.settings.register("crucible", "party", {
    name: "SETTINGS.CruciblePartyLabel",
    hint: "SETTINGS.CruciblePartyHint",
    scope: "world",
    config: true,
    type: new foundry.data.fields.ForeignDocumentField(CrucibleActor,
      {required: false, idOnly: true, choices: () => game.actors.reduce((obj, a) => {
        if ( a.type === "group" ) obj[a.id] = a.name;
        return obj;
      }, {"": "-- None -- "})
    }),
    default: null,
    onChange: actorId => party = game.actors.get(actorId)
  });

  game.settings.register("crucible", "welcome", {
    scope: "client",
    config: false,
    type: Boolean,
    default: false
  });

  // Register keybindings
  game.keybindings.register("crucible", "confirm", {
    name: "KEYBINDINGS.ConfirmAction",
    hint: "KEYBINDINGS.ConfirmActionHint",
    editable: [{key: "KeyX"}],
    restricted: true,
    onDown: onKeyboardConfirmAction
  });

  // Patch door sound radius - can we do this better elsewhere?
  Object.defineProperty(foundry.canvas.placeables.Wall.prototype, "soundRadius", {
    get() {
      const scene = globalThis.canvas.scene;
      if ( !scene ) return 0;
      return scene.useMicrogrid ? 60 : globalThis.canvas.dimensions.distance * 12;
    }
  });

  // Activate socket handler
  game.socket.on(`system.${SYSTEM$1.id}`, handleSocketEvent);

  // System Debugging Flags
  CONFIG.debug.talentTree = false;
  CONFIG.debug.flanking = false;
  if ( crucible.developmentMode ) registerDevelopmentHooks();

  // Replace core layer class with custom grid layer class
  CONFIG.Canvas.layers.grid.layerClass = CrucibleGridLayer;
});

/* -------------------------------------------- */
/*  Config                                      */
/* -------------------------------------------- */

Hooks.once("canvasConfig", () => {
  CrucibleHitBoxShader.registerPlugin();
});

/* -------------------------------------------- */
/*  Localization                                */
/* -------------------------------------------- */

Hooks.once("i18nInit", function() {

  // Apply localizations
  const toLocalize = [
    ["ABILITIES", ["abbreviation", "label"]],
    "ACCESSORY.CATEGORIES", "ACCESSORY.PROPERTIES",
    "ACTOR.CREATURE_CATEGORIES",
    "ARMOR.CATEGORIES", "ARMOR.PROPERTIES",
    "CONSUMABLE.CATEGORIES", "CONSUMABLE.PROPERTIES",
    "DAMAGE_CATEGORIES", "DEFENSES",
    "ITEM.QUALITY_TIERS", "ITEM.ENCHANTMENT_TIERS", "ITEM.LOOT_CATEGORIES", "ITEM.SCHEMATIC_CATEGORIES",
    "ITEM.SCHEMATIC_PROPERTIES",
    "RESOURCES", "THREAT_RANKS",
    "WEAPON.CATEGORIES", "WEAPON.PROPERTIES", "WEAPON.TRAINING", "WEAPON.SLOTS"
  ];
  for ( let c of toLocalize ) {
    let key = c;
    let attrs = ["label"];
    if ( Array.isArray(c) ) [key, attrs] = c;
    const conf = foundry.utils.getProperty(SYSTEM$1, key);

    // Special handling for enums
    if ( conf instanceof Enum ) {
      for ( const [k, l] of Object.entries(conf.labels) ) conf.labels[k] = game.i18n.localize(l);
      Object.freeze(conf.labels);
      continue;
    }

    // Other objects
    for ( let [k, v] of Object.entries(conf) ) {
      if ( typeof v === "object" ) {
        for ( const attr of attrs ) {
          if ( typeof v[attr] === "function" ) v[attr] = v[attr]();
          else if ( typeof v[attr] === "string" ) v[attr] = game.i18n.localize(v[attr]);
        }
        Object.freeze(v);
      }
      else {
        if ( typeof v === "function" ) conf[k] = v();
        else if ( typeof v === "string" ) conf[k] = game.i18n.localize(v);
      }
    }
  }

  // Localize models
  foundry.helpers.Localization.localizeDataModel(CrucibleAction);

  // Pre-localize configuration objects
  preLocalizeConfig();

  // Initialize Spellcraft Components
  CrucibleSpellcraftGesture.initialize();
  CrucibleSpellcraftInflection.initialize();
  CrucibleSpellcraftRune.initialize();

  // Preload Handlebars Templates
  foundry.applications.handlebars.loadTemplates([
    `systems/${SYSTEM$1.id}/templates/dice/partials/action-use-header.hbs`,
    `systems/${SYSTEM$1.id}/templates/dice/partials/standard-check-roll.hbs`,
    `systems/${SYSTEM$1.id}/templates/dice/partials/standard-check-details.hbs`,
    `systems/${SYSTEM$1.id}/templates/sheets/item/talent-summary.hbs`
  ]);
});

/* -------------------------------------------- */

/**
 * Perform one-time configuration of system configuration objects.
 */
function preLocalizeConfig() {
  const localizeConfigObject = (obj, keys, freeze=true) => {
    for ( let o of Object.values(obj) ) {
      for ( let k of keys ) {
        const v = o[k];
        if ( typeof v === "function" ) o[k] = v();
        else if ( typeof v === "string" ) o[k] = game.i18n.localize(v);
      }
      if ( freeze ) Object.freeze(o);
    }
  };
  localizeConfigObject(SYSTEM$1.ACTION.TAGS, ["label", "tooltip"]);
  localizeConfigObject(SYSTEM$1.ACTION.TAG_CATEGORIES, ["label"]);
  localizeConfigObject(SYSTEM$1.DAMAGE_TYPES, ["label", "abbreviation"]);
  localizeConfigObject(SYSTEM$1.SKILL.CATEGORIES, ["label", "hint"]);
  localizeConfigObject(SYSTEM$1.SKILL.SKILLS, ["label"], false);
  localizeConfigObject(SYSTEM$1.TALENT.NODE_TYPES, ["label"]);
  localizeConfigObject(SYSTEM$1.TALENT.TRAINING_TYPES, ["group", "label"]);
  localizeConfigObject(SYSTEM$1.TALENT.TRAINING_RANKS, ["label"]);

  // Config objects
  localizeConfigObject(crucible.CONFIG.currency, ["label", "abbreviation"], false);
  localizeConfigObject(crucible.CONFIG.languageCategories, ["label"]);
  localizeConfigObject(crucible.CONFIG.languages, ["label"]);
}

/* -------------------------------------------- */
/*  Ready Hooks                                 */
/* -------------------------------------------- */

/**
 * On game setup, configure document data.
 */
Hooks.once("setup", function() {

  // Deferred registration of the hero creation sheet
  const sheets = foundry.applications.apps.DocumentSheetConfig;
  sheets.registerSheet(Actor, SYSTEM$1.id, crucible.CONFIG.heroCreationSheet, {types: ["hero"],
    label: "CRUCIBLE.SHEETS.HeroCreation", makeDefault: false, canBeDefault: false, canConfigure: false});

  // Initialize Party
  party = game.actors.get(game.settings.get("crucible", "party")) || null;

  // Initialize Talent tree data
  CrucibleTalentNode.initialize();

  // Create Talent Tree canvas
  crucible.tree = new CrucibleTalentTree();
});

/* -------------------------------------------- */

/**
 * On game ready, display the welcome journal if the user has not yet seen it.
 */
Hooks.once("ready", async function() {
  const welcome = game.settings.get("crucible", "welcome");
  if ( !welcome ) {
    const entry = await fromUuid("Compendium.crucible.rules.JournalEntry.5SgXrAKS2EnqVggJ");
    await entry.sheet.render({force: true});
    await game.settings.set("crucible", "welcome", true);
    await _initializePrototypeTokenSettings();
  }

  // FIXME bring this back with a migration version
  // if ( game.user === game.users.activeGM ) await syncTalents();

  // System-specific interaction
  document.body.addEventListener("pointerenter", onPointerEnter, true);
  document.body.addEventListener("pointerleave", onPointerLeave, true);
});

/* -------------------------------------------- */

/**
 * One time initialization of prototype token override preferences.
 * @returns {Promise<void>}
 */
async function _initializePrototypeTokenSettings() {
  if ( !game.user.isGM ) return;
  const overrides = game.settings.get("core", foundry.data.PrototypeTokenOverrides.SETTING);
  overrides.updateSource({
    base: {
      displayName: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
    },
    hero: {
      displayBars: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
      sight: {
        enabled: true
      }
    },
    adversary: {
      displayBars: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
      sight: {
        enabled: false
      }
    }
  });
  await game.settings.set("core", foundry.data.PrototypeTokenOverrides.SETTING, overrides.toObject());
}

/* -------------------------------------------- */
/*  Rendering Hooks                             */
/* -------------------------------------------- */

Hooks.on("getChatMessageContextOptions", addChatMessageContextOptions);
Hooks.on("renderChatMessageHTML", CrucibleChatMessage.onRenderHTML);
Hooks.on("targetToken", ActionUseDialog.debounceChangeTarget);
Hooks.on("preDeleteChatMessage", CrucibleAction.onDeleteChatMessage);
Hooks.on("getSceneControlButtons", controls => {
  const flankingTool = {
    name: "debugFlanking",
    title: "Visualize Flanking",
    icon: "fa-solid fa-circles-overlap",
    toggle: true,
    active: false
  };
  flankingTool.onChange = (_event, active) => {
    CONFIG.debug.flanking = active;
    for ( const token of globalThis.canvas.tokens.controlled ) {
      if ( active ) token._visualizeEngagement(token.engagement);
      else token._clearEngagementVisualization();
    }
  };
  controls.tokens.tools.debugFlanking = flankingTool;
});
Hooks.on("renderCombatTracker", CrucibleCombatChallenge.onRenderCombatTracker);

/* -------------------------------------------- */
/*  Canvas Hooks                                */
/* -------------------------------------------- */

/**
 * Actions to take when the main game canvas is re-rendered.
 * Re-open the talent tree if it was previously open for a certain Actor.
 */
Hooks.on("canvasReady", () => {
  if ( crucible.tree.actor ) crucible.tree.open(crucible.tree.actor, {resetView: false});
  for ( const token of globalThis.canvas.tokens.placeables ) token.renderFlags.set({refreshFlanking: true}); // No commit
});

Hooks.on("hotbarDrop", async (bar, data, slot) => {
  if ( data.type === "crucible.action" ) {
    const macro = await Macro.create(data.macroData);
    await game.user.assignHotbarMacro(macro, slot);
  }
});



/* -------------------------------------------- */
/*  Convenience Functions                       */
/* -------------------------------------------- */

/**
 * Package all documents of a certain type into their appropriate Compendium pack
 * @param {string} documentName
 * @param {string} packName
 * @param {Folder|string} folder
 * @returns {Promise<void>}
 */
async function packageCompendium(documentName, packName, folder) {
  const pack = game.packs.get(`crucible.${packName}`);
  if ( typeof folder === "string" ) {
    folder = game.folders.find(f => (f.type === documentName) && (f.name === folder));
  }
  if ( !(folder instanceof Folder) || (folder.type !== documentName) ) {
    throw new Error("Invalid folder provided to the packageCompendium method");
  }

  // Unlock the pack for editing
  await pack.configure({locked: false});

  // Delete all existing documents in the pack
  const cls = getDocumentClass(documentName);
  await pack.getDocuments();
  await cls.deleteDocuments([], {pack: pack.collection, deleteAll: true});
  await Folder.deleteDocuments(Array.from(pack.folders.keys()), {pack: pack.collection});

  // Export all children of the target folder
  await folder.exportToCompendium(pack, {keepId: true, keepFolders: true});

  // Re-lock the pack
  await pack.configure({locked: true});
}

/* -------------------------------------------- */

/**
 * Generate a Crucible-standardized document ID given a provided string title.
 * @param {string} title      An input string title
 * @param {number} [length]   A maximum ID length
 * @returns {string}          A standardized camel-case ID
 */
function generateId(title, length) {
  const id = title.split(" ").map((w, i) => {
    const p = w.slugify({replacement: "", strict: true});
    return i ? p.titleCase() : p;
  }).join("");
  return Number.isNumeric(length) ? id.slice(0, length).padEnd(length, "0") : id;
}

/* -------------------------------------------- */

/**
 * Standardize all World item IDs
 * @returns {Promise<void>}
 */
async function standardizeItemIds() {
  const creations = [];
  const deletions = [];
  for ( const item of game.items ) {
    const standardId = generateId(item.name, 16);
    if ( item.id === standardId ) continue;
    if ( game.items.has(standardId) ) throw new Error(`Standardized system ID ${standardId} is already in use`);
    deletions.push(item.id);
    creations.push(Object.assign(item.toObject(), {_id: standardId}));
  }
  await Item.deleteDocuments(deletions);
  await Item.createDocuments(creations, {keepId: true});
}

function registerDevelopmentHooks() {
  Hooks.on("preCreateItem", (item, data, options, _user) => {
    if ( options.keepId === false ) return;

    // Maintain IDs when importing from a compendium
    // TODO this can be removed in V14
    if ( options.fromCompendium ) {
      const {id} = foundry.utils.parseUuid(item._stats.compendiumSource);
      if ( id ) {
        item.updateSource({_id: id});
        options.keepId = true;
      }
      return;
    }

    // Keep existing _id while exporting into a compendium pack
    // TODO this can be removed in V14
    if ( item.pack && !item.parent && item.id ) {
      options.keepId = true;
      return;
    }

    // Generate a new ID
    if ( !item.parent && !item.id ) {
      item.updateSource({_id: generateId(item.name, 16)});
      options.keepId = true;
    }
  });

  Hooks.on("updateItem", async (item, _change, _options, _user) => {
    if ( crucible.CONFIG.packs.talent.has(item.pack) ) {
      await CrucibleTalentNode.initialize();
      crucible.tree.refresh();
    }
  });

  // Standardized IDs for Rules journal entry pages
  Hooks.on("preCreateJournalEntryPage", (page, data, options, _user) => {
    if ( (page.parent?.pack === "crucible.rules") && (options.keepId !== false) ) {
      page.updateSource({_id: generateId(page.name, 16)});
      options.keepId = true;
    }
  });
}

/* -------------------------------------------- */

/**
 * Sync talent data across all actors in the world if their synchronized version is stale.
 * @param {boolean} [force]   Force syncing even if the actor stats are current
 * @returns {Promise<void>}
 */
async function syncTalents(force=false) {
  console.groupCollapsed("Crucible | Talent Data Synchronization");
  const total = game.actors.size;
  let n = 0;
  let synced = 0;
  for ( const actor of game.actors ) {
    n++;
    if ( force || foundry.utils.isNewerVersion(crucible.version, actor._stats.systemVersion) ) {
      try {
        await actor.syncTalents();
        console.log(`Crucible | Synchronized talents for Actor "${actor.name}"`);
        synced++;
      } catch(err) {
        console.warn(`Crucible | Talent synchronization failed for Actor "${actor.name}": ${err.message}`);
      }
      SceneNavigation.displayProgressBar({label: "Synchronizing Talent Data", pct: Math.round(n * 100 / total)});
    }
  }
  if ( synced ) SceneNavigation.displayProgressBar({label: "Synchronizing Talent Data", pct: 100});
  console.log(`Crucible | Complete talent synchronization for ${synced} Actors`);
  console.groupEnd();
  foundry.utils.debouncedReload();
}

/* -------------------------------------------- */

async function resetAllActorTalents() {
  for ( const actor of game.actors ) {
    const deleteIds = [];
    for ( const item of actor.items ) {
      if ( item.type !== "talent" ) continue;
      if ( actor.system.details.ancestry?.talents?.has(item.id) ) continue;
      if ( actor.system.details.background?.talents?.has(item.id) ) continue;
      if ( actor.system.details.archetype?.talents?.has(item.id) ) continue;
      if ( actor.system.details.taxonomy?.talents?.has(item.id) ) continue;
      deleteIds.add(item.id);
    }
    await actor.deleteEmbeddedDocuments("Item", deleteIds);
  }
}export{SYSTEM$1 as SYSTEM,applications,audio,canvas$1 as canvas,chat,dice,documents,models};