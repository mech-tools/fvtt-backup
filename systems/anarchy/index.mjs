var vt = Object.defineProperty;
var Rt = (r, e, t) => e in r ? vt(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var _ = (r, e, t) => Rt(r, typeof e != "symbol" ? e + "" : e, t);
const o = {
  TYPES: {
    Actor: {
      character: "TYPES.Actor.character",
      vehicle: "TYPES.Actor.vehicle",
      device: "TYPES.Actor.device",
      sprite: "TYPES.Actor.sprite",
      ic: "TYPES.Actor.ic"
    },
    Item: {
      contact: "TYPES.Item.contact",
      cyberdeck: "TYPES.Item.cyberdeck",
      gear: "TYPES.Item.gear",
      metatype: "TYPES.Item.metatype",
      quality: "TYPES.Item.quality",
      shadowamp: "TYPES.Item.shadowamp",
      skill: "TYPES.Item.skill",
      weapon: "TYPES.Item.weapon"
    }
  },
  settings: {
    defaultCssClass: {
      name: "ANARCHY.settings.defaultCssClass.name",
      hint: "ANARCHY.settings.defaultCssClass.hint"
    },
    anarchyHack: {
      name: "ANARCHY.settings.anarchyHack.name",
      hint: "ANARCHY.settings.anarchyHack.hint"
    },
    skillSet: {
      name: "ANARCHY.settings.skillSet.name",
      hint: "ANARCHY.settings.skillSet.hint"
    },
    gmDifficulty: {
      name: "ANARCHY.settings.gmDifficulty.name",
      hint: "ANARCHY.settings.gmDifficulty.hint",
      default: "ANARCHY.settings.gmDifficulty.default",
      chatMessage: "ANARCHY.settings.gmDifficulty.chatMessage"
    },
    damageMode: {
      name: "ANARCHY.settings.damageMode.name",
      hint: "ANARCHY.settings.damageMode.hint",
      values: {
        resistanceArmorMonitor: "ANARCHY.settings.damageMode.values.resistanceArmorMonitor",
        armorResistanceMonitor: "ANARCHY.settings.damageMode.values.armorResistanceMonitor",
        armorGivesResistance: "ANARCHY.settings.damageMode.values.armorGivesResistance",
        armorGiveResistanceHitsAvoid: "ANARCHY.settings.damageMode.values.armorGiveResistanceHitsAvoid"
      }
    }
  },
  gmManager: {
    title: "ANARCHY.gmManager.title",
    playerChangedAnarchy: "ANARCHY.gmManager.playerChangedAnarchy",
    gmReceivedAnarchy: "ANARCHY.gmManager.gmReceivedAnarchy",
    gmConvergence: "ANARCHY.gmManager.gmConvergence"
  },
  chat: {
    blindMessageToGM: "ANARCHY.chat.blindMessageToGM",
    sufferedDrain: "ANARCHY.chat.sufferedDrain",
    noDrain: "ANARCHY.chat.noDrain",
    defendAttack: "ANARCHY.chat.defendAttack",
    defendPilotAttack: "ANARCHY.chat.defendPilotAttack",
    partiallyDefended: "ANARCHY.chat.partiallyDefended",
    fullyDefended: "ANARCHY.chat.fullyDefended",
    applyDamage: "ANARCHY.chat.applyDamage"
  },
  user: {
    selectedTokenActors: "ANARCHY.user.selectedTokenActors"
  },
  common: {
    newEntry: "ANARCHY.common.newEntry",
    newName: "ANARCHY.common.newName",
    cancel: "ANARCHY.common.cancel",
    add: "ANARCHY.common.add",
    edit: "ANARCHY.common.edit",
    activate: "ANARCHY.common.activate",
    del: "ANARCHY.common.del",
    favorite: "ANARCHY.common.favorite",
    addFavorite: "ANARCHY.common.addFavorite",
    delFavorite: "ANARCHY.common.delFavorite",
    attach: "ANARCHY.common.attach",
    attachCopy: "ANARCHY.common.attachCopy",
    matrix: {
      connectionMode: "ANARCHY.common.matrix.connectionMode"
    },
    roll: {
      button: "ANARCHY.common.roll.button",
      title: "ANARCHY.common.roll.title",
      attribute: "ANARCHY.common.roll.attribute",
      attribute2: "ANARCHY.common.roll.attribute2",
      modifiers: {
        edge: "ANARCHY.common.roll.modifiers.edge",
        specialization: "ANARCHY.common.roll.modifiers.specialization",
        poolModifiers: "ANARCHY.common.roll.modifiers.poolModifiers",
        social: {
          credibility: "ANARCHY.common.roll.modifiers.social.credibility",
          rumor: "ANARCHY.common.roll.modifiers.social.rumor"
        },
        anarchyDisposition: "ANARCHY.common.roll.modifiers.anarchyDisposition",
        anarchyRisk: "ANARCHY.common.roll.modifiers.anarchyRisk",
        glitch: "ANARCHY.common.roll.modifiers.glitch",
        drain: "ANARCHY.common.roll.modifiers.drain",
        convergence: "ANARCHY.common.roll.modifiers.convergence",
        wounds: "ANARCHY.common.roll.modifiers.wounds",
        weaponRange: "ANARCHY.common.roll.modifiers.weaponRange",
        weaponArea: "ANARCHY.common.roll.modifiers.weaponArea",
        other: "ANARCHY.common.roll.modifiers.other",
        virtualReality: "ANARCHY.common.roll.modifiers.virtualReality",
        reduced: "ANARCHY.common.roll.modifiers.reduced",
        reroll: "ANARCHY.common.roll.modifiers.reroll",
        rerollForced: "ANARCHY.common.roll.modifiers.rerollForced",
        opponentReroll: "ANARCHY.common.roll.modifiers.opponentReroll",
        opponentPool: "ANARCHY.common.roll.modifiers.opponentPool"
      },
      rollTheme: {
        dicePool: "ANARCHY.common.roll.rollTheme.dicePool",
        reroll: "ANARCHY.common.roll.rollTheme.reroll",
        removed: "ANARCHY.common.roll.rollTheme.removed",
        rerollRemoved: "ANARCHY.common.roll.rollTheme.rerollRemoved",
        glitch: "ANARCHY.common.roll.rollTheme.glitch",
        drain: "ANARCHY.common.roll.rollTheme.drain",
        convergence: "ANARCHY.common.roll.rollTheme.convergence",
        anarchyRisk: "ANARCHY.common.roll.rollTheme.anarchyRisk"
      },
      opponentRoll: "ANARCHY.common.roll.opponentRoll",
      totalSuccess: "ANARCHY.common.roll.totalSuccess",
      success: "ANARCHY.common.roll.success",
      risk: {
        prowess: "ANARCHY.common.roll.risk.prowess",
        nothing: "ANARCHY.common.roll.risk.nothing",
        mixed: "ANARCHY.common.roll.risk.mixed",
        glitch: "ANARCHY.common.roll.risk.glitch"
      },
      rerollSuccess: "ANARCHY.common.roll.rerollSuccess",
      rerollForcedLoss: "ANARCHY.common.roll.rerollForcedLoss",
      rerollForcedSuccess: "ANARCHY.common.roll.rerollForcedSuccess"
    },
    confirmation: {
      del: "ANARCHY.common.confirmation.del",
      delItem: "ANARCHY.common.confirmation.delItem",
      delOwner: "ANARCHY.common.confirmation.delOwner",
      attach: "ANARCHY.common.confirmation.attach",
      attachOrCopy: "ANARCHY.common.confirmation.attachOrCopy"
    },
    selection: {
      actorSettingMarks: "ANARCHY.common.selection.actorSettingMarks"
    },
    errors: {
      insufficient: "ANARCHY.common.errors.insufficient",
      outOfRange: "ANARCHY.common.errors.outOfRange",
      onlyGM: "ANARCHY.common.errors.onlyGM",
      noEdgeForActor: "ANARCHY.common.errors.noEdgeForActor",
      expectedType: "ANARCHY.common.errors.expectedType",
      ignoredTargets: "ANARCHY.common.errors.ignoredTargets",
      noTargetSelected: "ANARCHY.common.errors.noTargetSelected",
      maxTargetsExceedeed: "ANARCHY.common.errors.maxTargetsExceedeed",
      noDefenseOnWeapon: "ANARCHY.common.errors.noDefenseOnWeapon",
      noTokenActor: "ANARCHY.common.errors.noTokenActor",
      noValidPilotForVehicle: "ANARCHY.common.errors.noValidPilotForVehicle",
      cannotUseEdgeAnymore: "ANARCHY.common.errors.cannotUseEdgeAnymore",
      actorCannotApplyDamage: "ANARCHY.common.errors.actorCannotApplyDamage",
      actorCannotReceiveDamage: "ANARCHY.common.errors.actorCannotReceiveDamage",
      actorDoesNotHaveDefense: "ANARCHY.common.errors.actorDoesNotHaveDefense"
    },
    sourceReference: "ANARCHY.common.sourceReference",
    sourceReferenceHelp: "ANARCHY.common.sourceReferenceHelp",
    description: "ANARCHY.common.description",
    gmnotes: "ANARCHY.common.gmnotes"
  },
  actor: {
    characterSheet: "ANARCHY.actor.characterSheet",
    characterTabbedSheet: "ANARCHY.actor.characterTabbedSheet",
    characterEnhancedSheet: "ANARCHY.actor.characterEnhancedSheet",
    vehicleSheet: "ANARCHY.actor.vehicleSheet",
    deviceSheet: "ANARCHY.actor.deviceSheet",
    spriteSheet: "ANARCHY.actor.spriteSheet",
    icSheet: "ANARCHY.actor.icSheet",
    characterNPCSheet: "ANARCHY.actor.characterNPCSheet",
    actorName: "ANARCHY.actor.actorName",
    genre: "ANARCHY.actor.genre",
    noMetatype: "ANARCHY.actor.noMetatype",
    celebrity: "ANARCHY.actor.celebrity",
    tabs: {
      main: "ANARCHY.actor.tabs.main",
      equipment: "ANARCHY.actor.tabs.equipment",
      biography: "ANARCHY.actor.tabs.biography"
    },
    words: {
      keywords: "ANARCHY.actor.words.keywords",
      cues: "ANARCHY.actor.words.cues",
      dispositions: "ANARCHY.actor.words.dispositions"
    },
    essence: {
      adjustments: "ANARCHY.actor.essence.adjustments",
      adjustShort: "ANARCHY.actor.essence.adjustShort"
    },
    counters: {
      essence: "ANARCHY.actor.counters.essence",
      karma: "ANARCHY.actor.counters.karma",
      karmaTotal: "ANARCHY.actor.counters.karmaTotal",
      edge: "ANARCHY.actor.counters.edge",
      anarchy: "ANARCHY.actor.counters.anarchy",
      sceneAnarchy: "ANARCHY.actor.counters.sceneAnarchy",
      plot: "ANARCHY.actor.counters.plot",
      social: {
        credibility: "ANARCHY.actor.counters.social.credibility",
        rumor: "ANARCHY.actor.counters.social.rumor"
      }
    },
    monitors: {
      conditionMonitors: "ANARCHY.actor.monitors.conditionMonitors",
      overflow: "ANARCHY.actor.monitors.overflow",
      noMatrixMonitor: "ANARCHY.actor.monitors.noMatrixMonitor",
      physical: "ANARCHY.actor.monitors.physical",
      stun: "ANARCHY.actor.monitors.stun",
      matrix: "ANARCHY.actor.monitors.matrix",
      armor: "ANARCHY.actor.monitors.armor",
      structure: "ANARCHY.actor.monitors.structure",
      resistance: "ANARCHY.actor.monitors.resistance",
      marks: "ANARCHY.actor.monitors.marks",
      convergence: "ANARCHY.actor.monitors.convergence"
    },
    vehicle: {
      moves: "ANARCHY.actor.vehicle.moves",
      attacks: "ANARCHY.actor.vehicle.attacks",
      stealth: "ANARCHY.actor.vehicle.stealth",
      category: "ANARCHY.actor.vehicle.category",
      skill: "ANARCHY.actor.vehicle.skill"
    },
    ownership: {
      owner: "ANARCHY.actor.ownership.owner",
      unknown: "ANARCHY.actor.ownership.unknown",
      owned: "ANARCHY.actor.ownership.owned"
    }
  },
  actorType: {
    character: "ANARCHY.actorType.character",
    vehicle: "ANARCHY.actorType.vehicle",
    device: "ANARCHY.actorType.device",
    sprite: "ANARCHY.actorType.sprite",
    ic: "ANARCHY.actorType.ic"
  },
  item: {
    sheet: "ANARCHY.item.sheet",
    tabs: {
      main: "ANARCHY.item.tabs.main",
      modifiers: "ANARCHY.item.tabs.modifiers"
    },
    common: {
      inactive: "ANARCHY.item.common.inactive"
    },
    skill: {
      code: "ANARCHY.item.skill.code",
      copyDefault: "ANARCHY.item.skill.useDefault",
      isKnowledge: "ANARCHY.item.skill.isKnowledge",
      attribute: "ANARCHY.item.skill.attribute",
      value: "ANARCHY.item.skill.value",
      specialization: "ANARCHY.item.skill.specialization",
      hasDrain: "ANARCHY.item.skill.isSocial",
      hasDrain: "ANARCHY.item.skill.hasDrain",
      hasConvergence: "ANARCHY.item.skill.hasConvergence",
      specializationHelp: "ANARCHY.item.skill.specializationHelp"
    },
    quality: {
      positive: "ANARCHY.item.quality.positive"
    },
    shadowamp: {
      category: "ANARCHY.item.shadowamp.category",
      capacity: "ANARCHY.item.shadowamp.capacity",
      level: "ANARCHY.item.shadowamp.level",
      essence: "ANARCHY.item.shadowamp.essence",
      levelShort: "ANARCHY.item.shadowamp.levelShort",
      essenceShort: "ANARCHY.item.shadowamp.essenceShort"
    },
    weapon: {
      skill: "ANARCHY.item.weapon.skill",
      damage: "ANARCHY.item.weapon.damage",
      strength: "ANARCHY.item.weapon.strength",
      defense: "ANARCHY.item.weapon.defense",
      area: "ANARCHY.item.weapon.area",
      noArmor: "ANARCHY.item.weapon.noArmor",
      withArmor: "ANARCHY.item.weapon.withArmor",
      damageShort: "ANARCHY.item.weapon.damageShort",
      areaShort: "ANARCHY.item.weapon.areaShort",
      noArmorShort: "ANARCHY.item.weapon.noArmorShort",
      weaponWithoutActor: "ANARCHY.item.weapon.weaponWithoutActor",
      range: {
        max: "ANARCHY.item.weapon.range.max"
      }
    },
    cyberdeck: {
      programs: "ANARCHY.item.cyberdeck.programs",
      processing: "ANARCHY.item.cyberdeck.processing",
      processingHelp: "ANARCHY.item.cyberdeck.processingHelp"
    }
  },
  itemType: {
    singular: {
      metatype: "ANARCHY.itemType.singular.metatype",
      skill: "ANARCHY.itemType.singular.skill",
      quality: "ANARCHY.itemType.singular.quality",
      shadowamp: "ANARCHY.itemType.singular.shadowamp",
      weapon: "ANARCHY.itemType.singular.weapon",
      gear: "ANARCHY.itemType.singular.gear",
      cyberdeck: "ANARCHY.itemType.singular.cyberdeck",
      contact: "ANARCHY.itemType.singular.contact"
    },
    plural: {
      metatype: "ANARCHY.itemType.plural.metatype",
      skill: "ANARCHY.itemType.plural.skill",
      quality: "ANARCHY.itemType.plural.quality",
      shadowamp: "ANARCHY.itemType.plural.shadowamp",
      weapon: "ANARCHY.itemType.plural.weapon",
      gear: "ANARCHY.itemType.plural.gear",
      cyberdeck: "ANARCHY.itemType.plural.cyberdeck",
      contact: "ANARCHY.itemType.plural.contact"
    }
  },
  capacity: {
    mundane: "ANARCHY.capacity.mundane",
    awakened: "ANARCHY.capacity.awakened",
    emerged: "ANARCHY.capacity.emerged"
  },
  monitor: {
    physical: "ANARCHY.monitor.physical",
    stun: "ANARCHY.monitor.stun",
    matrix: "ANARCHY.monitor.matrix",
    marks: "ANARCHY.monitor.marks"
  },
  monitorLetter: {
    physical: "ANARCHY.monitorLetter.physical",
    stun: "ANARCHY.monitorLetter.stun",
    matrix: "ANARCHY.monitorLetter.matrix",
    marks: "ANARCHY.monitorLetter.marks"
  },
  shadowampCategory: {
    adeptPower: "ANARCHY.shadowampCategory.adeptPower",
    bioware: "ANARCHY.shadowampCategory.bioware",
    complexForm: "ANARCHY.shadowampCategory.complexForm",
    cyberdeck: "ANARCHY.shadowampCategory.cyberdeck",
    cyberware: "ANARCHY.shadowampCategory.cyberware",
    drone: "ANARCHY.shadowampCategory.drone",
    equipment: "ANARCHY.shadowampCategory.equipment",
    focus: "ANARCHY.shadowampCategory.focus",
    program: "ANARCHY.shadowampCategory.program",
    spell: "ANARCHY.shadowampCategory.spell",
    special: "ANARCHY.shadowampCategory.special"
  },
  attributes: {
    noAttribute: "ANARCHY.attributes.noAttributes",
    strength: "ANARCHY.attributes.strength",
    agility: "ANARCHY.attributes.agility",
    willpower: "ANARCHY.attributes.willpower",
    logic: "ANARCHY.attributes.logic",
    charisma: "ANARCHY.attributes.charisma",
    edge: "ANARCHY.attributes.edge",
    autopilot: "ANARCHY.attributes.autopilot",
    handling: "ANARCHY.attributes.handling",
    firewall: "ANARCHY.attributes.firewall",
    system: "ANARCHY.attributes.system",
    knowledge: "ANARCHY.attributes.knowledge"
  },
  attributeAction: {
    defense: "ANARCHY.attributeAction.defense",
    judgeIntentions: "ANARCHY.attributeAction.judgeIntentions",
    perception: "ANARCHY.attributeAction.perception",
    resistTorture: "ANARCHY.attributeAction.resistTorture",
    composure: "ANARCHY.attributeAction.composure",
    memory: "ANARCHY.attributeAction.memory",
    catch: "ANARCHY.attributeAction.catch",
    lift: "ANARCHY.attributeAction.lift",
    matrixDefense: "ANARCHY.attributeAction.matrixDefense",
    astralDefense: "ANARCHY.attributeAction.astralDefense"
  },
  defense: {
    physicalDefense: "ANARCHY.defense.physicalDefense",
    physicalResistance: "ANARCHY.defense.physicalResistance",
    socialDefense: "ANARCHY.defense.socialDefense",
    matrixDefense: "ANARCHY.defense.matrixDefense",
    mentalResistance: "ANARCHY.defense.mentalResistance"
  },
  skill: {
    athletics: "ANARCHY.skill.athletics",
    acrobatics: "ANARCHY.skill.acrobatics",
    closeCombat: "ANARCHY.skill.closeCombat",
    projectileWeapons: "ANARCHY.skill.projectileWeapons",
    firearms: "ANARCHY.skill.firearms",
    heavyWeapons: "ANARCHY.skill.heavyWeapons",
    vehicleWeapons: "ANARCHY.skill.vehicleWeapons",
    stealth: "ANARCHY.skill.stealth",
    pilotingGround: "ANARCHY.skill.pilotingGround",
    pilotingOther: "ANARCHY.skill.pilotingOther",
    escapeArtist: "ANARCHY.skill.escapeArtist",
    astralCombat: "ANARCHY.skill.astralCombat",
    conjuring: "ANARCHY.skill.conjuring",
    sorcery: "ANARCHY.skill.sorcery",
    survival: "ANARCHY.skill.survival",
    biotech: "ANARCHY.skill.biotech",
    electronics: "ANARCHY.skill.electronics",
    hacking: "ANARCHY.skill.hacking",
    engineering: "ANARCHY.skill.engineering",
    tracking: "ANARCHY.skill.tracking",
    tasking: "ANARCHY.skill.tasking",
    con: "ANARCHY.skill.con",
    intimidation: "ANARCHY.skill.intimidation",
    negotiation: "ANARCHY.skill.negotiation",
    disguise: "ANARCHY.skill.disguise",
    animals: "ANARCHY.skill.animals",
    etiquette: "ANARCHY.skill.etiquette",
    knowledge: "ANARCHY.skill.knowledge"
  },
  area: {
    none: "ANARCHY.area.none",
    shotgun: "ANARCHY.area.shotgun",
    circle: "ANARCHY.area.circle",
    cone: "ANARCHY.area.cone",
    rect: "ANARCHY.area.rect",
    ray: "ANARCHY.area.ray"
  },
  range: {
    short: "ANARCHY.range.short",
    medium: "ANARCHY.range.medium",
    long: "ANARCHY.range.long"
  },
  connectionMode: {
    disconnected: "ANARCHY.connectionMode.disconnected",
    augmented: "ANARCHY.connectionMode.augmented",
    virtual: "ANARCHY.connectionMode.virtual"
  },
  vehicleCategory: {
    miniDrone: "ANARCHY.vehicleCategory.miniDrone",
    smallDrone: "ANARCHY.vehicleCategory.smallDrone",
    mediumDrone: "ANARCHY.vehicleCategory.mediumDrone",
    largeDrone: "ANARCHY.vehicleCategory.largeDrone",
    motorcycle: "ANARCHY.vehicleCategory.motorcycle",
    smallCar: "ANARCHY.vehicleCategory.smallCar",
    largeCar: "ANARCHY.vehicleCategory.largeCar",
    van: "ANARCHY.vehicleCategory.van",
    truck: "ANARCHY.vehicleCategory.truck",
    aircraft: "ANARCHY.vehicleCategory.aircraft",
    boat: "ANARCHY.vehicleCategory.boat"
  },
  modifier: {
    column: {
      group: "ANARCHY.modifier.column.group",
      effect: "ANARCHY.modifier.column.effect",
      value: "ANARCHY.modifier.column.value",
      category: "ANARCHY.modifier.column.category",
      subCategory: "ANARCHY.modifier.column.subCategory",
      target: "ANARCHY.modifier.column.target",
      condition: "ANARCHY.modifier.column.condition"
    },
    group: {
      roll: "ANARCHY.modifier.group.roll",
      attribute: "ANARCHY.modifier.group.attribute",
      monitor: "ANARCHY.modifier.group.monitor",
      other: "ANARCHY.modifier.group.other"
    },
    roll: {
      effect: {
        pool: "ANARCHY.modifier.roll.effect.pool",
        reroll: "ANARCHY.modifier.roll.effect.reroll",
        glitch: "ANARCHY.modifier.roll.effect.glitch",
        successReroll: "ANARCHY.modifier.roll.effect.successReroll",
        opponentPool: "ANARCHY.modifier.roll.effect.opponentPool",
        opponentReroll: "ANARCHY.modifier.roll.effect.opponentReroll"
      },
      category: {
        attribute: "ANARCHY.modifier.roll.category.attribute",
        skill: "ANARCHY.modifier.roll.category.skill",
        attributeAction: "ANARCHY.modifier.roll.category.attributeAction"
      }
    },
    monitor: {
      effect: {
        armor: "ANARCHY.modifier.monitor.effect.armor",
        structure: "ANARCHY.modifier.monitor.effect.structure",
        stun: "ANARCHY.modifier.monitor.effect.stun",
        physical: "ANARCHY.modifier.monitor.effect.physical",
        matrix: "ANARCHY.modifier.monitor.effect.matrix"
      },
      category: {
        max: "ANARCHY.modifier.monitor.category.max",
        resistance: "ANARCHY.modifier.monitor.category.resistance"
      }
    },
    other: {
      effect: {
        ignoreWounds: "ANARCHY.modifier.other.effect.ignoreWounds",
        damageArmor: "ANARCHY.modifier.other.effect.damageArmor",
        sceneAnarchy: "ANARCHY.modifier.other.effect.sceneAnarchy",
        locationAnarchy: "ANARCHY.modifier.other.effect.locationAnarchy",
        essenceAdjustment: "ANARCHY.modifier.other.effect.essenceAdjustment",
        initiative: "ANARCHY.modifier.other.effect.initiative",
        celebrity: "ANARCHY.modifier.other.effect.celebrity"
      },
      category: {}
    },
    condition: {
      always: "ANARCHY.modifier.condition.always"
    }
  }
}, z = class z {
  static ascending(e = (t) => t) {
    return (t, a) => z.sortingBy(e(t), e(a));
  }
  static descending(e = (t) => t) {
    return (t, a) => z.sortingBy(e(a), e(t));
  }
  static sortingBy(e, t) {
    return e > t ? 1 : e < t ? -1 : 0;
  }
  static bySortedArray(e) {
    return (t) => e.indexOf(t);
  }
  static ascendingBySortedArray(e) {
    return z.ascending(z.bySortedArray(e));
  }
  static sortedMap(e, t = (a, s) => 0) {
    return Object.keys(e).sort(t).reduce(
      (a, s) => (a[s] = e[s], a),
      {}
    );
  }
  static reindexIds(e) {
    let t = 1;
    return e.forEach((a) => a.id = t++), e;
  }
  static distinct(e) {
    return [...new Set(e)];
  }
  static sum() {
    return (e, t) => e + t;
  }
  static sumValues(e, t = (a) => a) {
    return e.map(t).filter((a) => a != null).reduce(z.sum(), 0);
  }
  static divint(e, t) {
    return Math.floor(e / t);
  }
  static divup(e, t) {
    return Math.ceil(e / t);
  }
  static join(e, t = "") {
    return e.reduce(z.joiner(t));
  }
  static joiner(e = "") {
    return (t, a) => t + e + a;
  }
  static classify(e, t = (a) => a.type) {
    let a = {};
    return z.classifyInto(a, e, t), a;
  }
  static classifyFirst(e, t) {
    let a = {};
    for (const s of e) {
      const i = t(s);
      a[i] || (a[i] = s);
    }
    return a;
  }
  static classifyInto(e, t, a = (s) => s.type) {
    for (const s of t) {
      const i = a(s);
      let n = e[i];
      n || (n = [], e[i] = n), n.push(s);
    }
  }
  static showControlWhen(e, t) {
    t ? e.show() : e.hide();
  }
  static minmax(e, t, a) {
    return Math.max(t, Math.min(e, a));
  }
};
_(z, "isString", (e) => typeof e == "string" || e instanceof String);
let f = z;
const et = {
  keyword: "keywords",
  disposition: "dispositions",
  cue: "cues"
}, p = class p {
  // this method is the place to add settings-based entries in the enums
  static init() {
    p.hbsAttributes = p.mapObjetToKeyValue(o.attributes).filter((e) => e.value != "knowledge" && e.value != "noAttribute"), p.hbsItemTypes = p.mapObjetToKeyValue(o.itemType), p.hbsCapacities = p.mapObjetToKeyValue(o.capacity), p.hbsMonitors = p.mapObjetToKeyValue(o.monitor), p.hbsMonitorLetters = p.mapObjetToKeyValue(o.monitorLetter), p.hbsShadowampCategories = p.mapObjetToKeyValue(o.shadowampCategory), p.hbsAreas = p.mapObjetToKeyValue(o.area), p.hbsRanges = p.mapObjetToKeyValue(o.range), p.hbsVehicleCategories = p.mapObjetToKeyValue(o.vehicleCategory), p.sortedAttributeKeys = Object.keys(o.attributes), p.registerHandleBarHelpers();
  }
  static registerHandleBarHelpers() {
    Handlebars.registerHelper("sortedAttributes", (e) => f.sortedMap(e, f.ascendingBySortedArray(p.sortedAttributeKeys)));
  }
  static getEnums(e = (a) => !0, t = !1) {
    return {
      attributes: p.getAttributes(e),
      itemTypes: p.hbsItemTypes,
      capacities: p.hbsCapacities,
      monitors: p.hbsMonitors,
      shadowampCategories: p.hbsShadowampCategories,
      skills: game.system.anarchy.skills.getSkills({ withKnowledge: t }).map((a) => ({ value: a.code, label: game.i18n.localize(a.labelkey), labelkey: a.labelkey })),
      areas: p.hbsAreas,
      ranges: p.hbsRanges,
      vehicleCategories: p.hbsVehicleCategories
    };
  }
  static getAttributes(e = (t) => !0) {
    return p.hbsAttributes.filter((t) => e(t.value));
  }
  static getActorWordTypes() {
    return et;
  }
  static getMonitors() {
    return p.hbsMonitors;
  }
  static getMonitorLetters() {
    return p.hbsMonitorLetters;
  }
  static getActorWordTypePlural(e) {
    return et[e];
  }
  static localizeAttribute(e) {
    return o.attributes[e] ? game.i18n.localize(o.attributes[e]) : game.i18n.localize(o.attributes.noAttribute);
  }
  static getFromList(e, t, a = "value", s = "labelkey") {
    const i = e.find((n) => n[a] == t);
    return i ? i[s] : void 0;
  }
  static mapObjetToKeyValue(e, t = "value", a = "labelkey") {
    return Object.entries(e).map(
      (s) => {
        const i = {};
        return i[t] = s[0], i[a] = s[1], i;
      }
    );
  }
};
_(p, "ENUMS"), _(p, "hbsAttributes"), _(p, "hbsItemTypes"), _(p, "hbsCapacities"), _(p, "hbsMonitors"), _(p, "hbsMonitorLetters"), _(p, "hbsShadowampCategories"), _(p, "hbsAreas"), _(p, "hbsRanges"), _(p, "sortedAttributeKeys");
let S = p;
const g = "anarchy", ie = "Anarchy", Ge = `system.${g}`, L = g, ue = `systems/${g}`, pt = `${ue}/style`, h = `systems/${g}/templates`, G = `${ue}/icons`, k = `${G}/skills`, P = "Anarchy | ", Mt = 3, Ht = 2, St = 6, Nt = 5, Tt = 4, ft = 8, c = {
  actorTypes: {
    character: "character",
    vehicle: "vehicle",
    device: "device",
    sprite: "sprite",
    ic: "ic"
  },
  itemType: {
    metatype: "metatype",
    skill: "skill",
    quality: "quality",
    shadowamp: "shadowamp",
    weapon: "weapon",
    gear: "gear",
    cyberdeck: "cyberdeck",
    contact: "contact"
  },
  attributes: {
    agility: "agility",
    strength: "strength",
    willpower: "willpower",
    logic: "logic",
    charisma: "charisma",
    edge: "edge",
    autopilot: "autopilot",
    handling: "handling",
    firewall: "firewall",
    system: "system",
    knowledge: "knowledge"
  },
  capacities: {
    mundane: "mundane",
    awakened: "awakened",
    emerged: "emerged"
  },
  monitors: {
    stun: "stun",
    armor: "armor",
    physical: "physical",
    structure: "structure",
    matrix: "matrix",
    marks: "marks",
    convergence: "convergence",
    anarchy: "anarchy",
    plot: "plot",
    sceneAnarchy: "sceneAnarchy"
  },
  counters: {
    edge: "edge",
    social: {
      celebrity: "celebrity",
      credibility: "credibility",
      rumor: "rumor"
    }
  },
  area: {
    none: "none",
    shotgun: "shotgun",
    circle: "circle",
    cone: "cone",
    rect: "rect",
    ray: "ray"
  }
}, E = {
  rollType: {
    attributeAction: "attributeAction",
    defense: "defense",
    defensePilot: "defensePilot",
    attribute: "attribute",
    skill: "skill",
    weapon: "weapon"
  },
  actions: {
    defense: "defense",
    resistTorture: "resistTorture",
    judgeIntentions: "judgeIntentions",
    perception: "perception",
    composure: "composure",
    memory: "memory",
    catch: "catch",
    lift: "lift",
    matrixDefense: "matrixDefense",
    astralDefense: "astralDefense"
  },
  defenses: {
    physicalDefense: "physicalDefense",
    physicalResistance: "physicalResistance",
    socialDefense: "socialDefense",
    matrixDefense: "matrixDefense",
    mentalResistance: "mentalResistance"
  },
  fixedDefenseCode: {
    // fix for old incorrect defense codes
    mentalDefense: "physicalResistance",
    astralDefense: "mentalResistance"
  }
};
globalThis.ANARCHY_CONSTANTS = {
  SYSTEM_NAME: g,
  SYSTEM_DESCRIPTION: ie,
  SYSTEM_SOCKET: Ge,
  SYSTEM_SCOPE: L,
  SYSTEM_PATH: ue,
  STYLE_PATH: pt,
  TEMPLATES_PATH: h,
  ICONS_PATH: G,
  ICONS_SKILLS_PATH: k,
  LOG_HEAD: P,
  ANARCHY_DICE_BONUS: Mt,
  SPECIALIZATION_BONUS: Ht,
  PLAYER_MAX_ANARCHY: St,
  TARGET_SUCCESS: Nt,
  TARGET_SUCCESS_EDGE: Tt,
  BASE_MONITOR: ft,
  TEMPLATE: c,
  ANARCHY_SYSTEM: E
};
class K {
  static checkSufficient(e, t, a) {
    if (t > a) {
      const s = game.i18n.format(o.common.errors.insufficient, {
        resource: game.i18n.localize(e),
        required: t,
        available: a
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkOutOfRange(e, t, a, s) {
    if (t < a || t > s) {
      const i = game.i18n.format(o.common.errors.outOfRange, {
        resource: game.i18n.localize(e),
        value: t,
        min: a,
        max: s
      });
      throw ui.notifications.error(i), i;
    }
  }
  static checkUserGM() {
    if (!game.user.isGM) {
      const e = game.i18n.localize(o.common.errors.onlyGM);
      throw ui.notifications.error(e), e;
    }
  }
  static checkItemType(e, t) {
    if (e.type != t) {
      const a = game.i18n.format(o.common.errors.expectedType, {
        type: game.i18n.localize(e.type ? o.itemType.singular[e.type] : e.type),
        expectedType: game.i18n.localize(t)
      });
      throw ui.notifications.error(a), a;
    }
  }
  static checkActorCanReceiveDamage(e, t, a) {
    if (!t) {
      const s = game.i18n.format(o.common.errors.actorCannotReceiveDamage, {
        actor: a.name,
        damageType: game.i18n.format("ANARCHY.actor.monitors." + e)
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkWeaponDefense(e, t) {
    if (!e.getDefense()) {
      const s = game.i18n.format(o.common.errors.noDefenseOnWeapon, { actor: t.name, weapon: e.name });
      throw ui.notifications.error(s), s;
    }
  }
  static checkTargetsCount(e, t, a) {
    if (e > 0 && t.length > e) {
      const s = game.i18n.format(o.common.errors.maxTargetsExceedeed, {
        weapon: this.name,
        area: game.i18n.localize(o.area[a]),
        count: t.length,
        max: e
      });
      throw ui.notifications.error(s), s;
    }
  }
  static checkMatrixMonitor(e) {
    if (!e.hasMatrixMonitor()) {
      const t = game.i18n.format(o.actor.monitors.noMatrixMonitor, {
        actor: e.name
      });
      throw ui.notifications.warn(t), t;
    }
  }
  static checkActorDefenseAction(e, t, a) {
    if (!e) {
      const s = game.i18n.format(o.common.errors.actorDoesNotHaveDefense, {
        actor: t.name,
        defense: game.i18n.localize(a.labelkey),
        actorType: game.i18n.localize(o.actorType[t.type])
      });
      throw ui.notifications.error(s), s;
    }
  }
}
const tt = "Users.blindMessageToGM";
class I {
  static init() {
    j.register(tt, {
      callback: (e) => I.blindMessageToGM(e),
      condition: (e) => e.isGM
    });
  }
  static blindMessageToGM(e) {
    j.call(tt, e) || ChatMessage.create({
      user: e.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      content: game.i18n.format(o.chat.blindMessageToGM, {
        user: game.user.name,
        message: e.content
      })
    });
  }
  static getUsers(e = (t) => !0) {
    return (game.version ? game.users : game.users.entities).filter(e);
  }
  static firstConnectedGM() {
    return I.getUsers((e) => e.isGM && e.active).sort(f.ascending((e) => e.id)).at(0) ?? {};
  }
  /**
   * @returns true pour un seul utilisateur: le premier GM connecté par ordre d'id
   */
  static isUniqueConnectedGM(e = game.user) {
    return e.id == I.firstConnectedGM().id;
  }
  static firstResponsible(e) {
    if (e.testUserPermission)
      return I.getUsers((t) => t.active && e.testUserPermission(t, CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER)) == game.user;
  }
  static getTargetTokens(e) {
    return Array.from(e.targets);
  }
  static getSelectedTokens(e) {
    return Array.from(canvas.tokens.controlled);
  }
  static getSelectedActors() {
    return Array.from(canvas.tokens.controlled).map((e) => e.actor);
  }
  static getPlayerActor() {
    return game.user.character;
  }
}
class j {
  constructor() {
    this.remoteCalls = {}, game.socket.on(Ge, async (e) => this.onSocketMessage(e));
  }
  static async register(e, t) {
    game.system.anarchy.remoteCall._register(e, t);
  }
  async _register(e, t) {
    if (this.remoteCalls[e])
      throw `RemoteCall msg ${e} is already registered`;
    foundry.utils.mergeObject(t, {
      callback: (a) => {
        console.log(P + "RemoteCall [", e, "] (", a, ")");
      },
      condition: (a) => !0,
      multiple: !1
      /* true if multiple users should handle the message */
    }, { overwrite: !1 }), this.remoteCalls[e] = t, console.log(P + "RemoteCall registered", e);
  }
  static call(e, t) {
    return game.system.anarchy.remoteCall._remoteCall(e, t);
  }
  _remoteCall(e, t) {
    const a = this.remoteCalls[e];
    return !a || a.condition(game.user) || !a.multiple && I.isUniqueConnectedGM() ? !1 : (game.socket.emit(Ge, { msg: e, data: t }), !0);
  }
  async onSocketMessage(e) {
    const t = this.remoteCalls[e.msg];
    if (t) {
      const a = t.condition(game.user), s = t.multiple, i = I.isUniqueConnectedGM();
      a && (s || i) ? t.callback(e.data) : console.log(P + "RemoteCall.onSocketMessage(", e, ") ignored :", a, s, i);
    } else
      console.log(P + "RemoteCall: No callback registered for", e);
  }
}
const Ve = "parent-message-id", me = "message-data", ze = "can-use-edge", Be = "owning-actor", at = "ChatManager.removeChatMessage", st = "ChatManager.removeChatMessageFamily", Et = [
  { selector: ".anarchy-button.click-edge-reroll", controlVisibility: !0, handler: async (r, e) => await M.edgeReroll(r) },
  { selector: ".anarchy-button.click-defend-attack", controlVisibility: !0, handler: async (r, e) => await M.defendAttack(r) },
  { selector: ".anarchy-button.click-defend-pilot-attack", controlVisibility: !0, handler: async (r, e) => await M.defendPilotAttack(r) },
  { selector: ".anarchy-button.click-apply-attack-damage", controlVisibility: !0, handler: async (r, e) => await M.applyAttack(r) },
  { selector: "img.open-actor-sheet", controlVisibility: !1, handler: async (r, e) => await M.openActorSheet(r, e) }
];
class M {
  static async init() {
    Hooks.on("renderChatMessage", async (e, t, a) => await M.onRenderChatMessage(e, t, a)), j.register(st, {
      callback: (e) => this.removeFamily(e),
      condition: (e) => e.isGM
    }), j.register(at, {
      callback: (e) => M.removeChatMessage(e),
      condition: (e) => e.isGM
    });
  }
  static async onRenderChatMessage(e, t, a) {
    const s = M.getChatMessageFromHtml(t), i = M.hasRight(s);
    Et.forEach((n) => {
      const l = t.find(n.selector);
      !n.controlVisibility || i ? (l.show(), l.click(async (m) => await n.handler(M.getChatMessage(m), m))) : (l.hide(), l.click(async (m) => {
      }));
    });
  }
  static async openActorSheet(e, t) {
    var n;
    const a = $(t.currentTarget).closest("img.open-actor-sheet"), s = a.attr("data-token-id");
    if (s) {
      const l = canvas.tokens.get(s);
      if (l != null && l.actor) {
        l.actor.sheet.render(!0);
        return;
      }
    }
    const i = a.attr("data-actor-id");
    return (n = game.actors.get(i)) == null ? void 0 : n.sheet.render(!0);
  }
  static async edgeReroll(e) {
    if (e.getFlag(L, ze)) {
      const t = e.getFlag(L, me);
      await game.system.anarchy.rollManager.edgeReroll(t), M.removeFamily(e.id);
    } else
      ui.notifications.info(game.i18n.localize(o.common.errors.cannotUseEdgeAnymore));
  }
  static defendAttack(e) {
    return game.system.anarchy.combatManager.onClickDefendAttack(e.getFlag(L, me));
  }
  static defendPilotAttack(e) {
    return game.system.anarchy.combatManager.onClickPilotDefendAttack(e.getFlag(L, me));
  }
  static applyAttack(e) {
    return game.system.anarchy.combatManager.onClickApplyAttackDamage(e.getFlag(L, me));
  }
  static getChatMessage(e) {
    const t = $(e.currentTarget).closest(".chat-message").attr("data-message-id");
    return game.messages.get(t);
  }
  static getChatMessageFromHtml(e) {
    const t = $(e).closest(".chat-message").attr("data-message-id");
    return game.messages.get(t);
  }
  /**
   * Method in charge of preparing ANARCHY flags to be set on Document, for ChatMessage
   */
  static prepareFlag(e, t, a) {
    e[L] == null ? e[L] = { [t]: a } : e[L][t] = a;
  }
  static removeFamily(e) {
    var t;
    j.call(st, e) || (game.messages.filter((a) => a.getFlag(L, Ve) == e).forEach((a) => a.delete()), (t = game.messages.get(e)) == null || t.delete());
  }
  static removeChatMessage(e) {
    var t;
    j.call(at, e) || (t = game.messages.get(e)) == null || t.delete();
  }
  static messageActorRights(e, t = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    var a;
    return {
      actorId: e == null ? void 0 : e.id,
      tokenId: (a = e == null ? void 0 : e.token) == null ? void 0 : a.id,
      right: t ?? CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER
    };
  }
  static readActorRights(e) {
    const t = e.tokenId ? M.getToken(e.tokenId) : void 0;
    return {
      actor: (t == null ? void 0 : t.actor) ?? game.actors.get(e.actorId),
      token: t,
      right: e.right
    };
  }
  static hasRight(e, t = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    const a = e.getFlag(L, Be);
    if (a) {
      const s = M.readActorRights(a);
      if (s)
        return s.actor ? s.actor.testUserPermission(game.user, Math.min(s.right, t)) : !0;
    }
    return !1;
  }
  static getToken(e) {
    return e ? game.scenes.map((t) => t.tokens.find((a) => a.id == e)).find((t) => t != null) : void 0;
  }
}
const Dt = [
  "fas fa-dice",
  "fas fa-dice-one",
  "fas fa-dice-two",
  "fas fa-dice-three",
  "fas fa-dice-four",
  "fas fa-dice-five",
  "fas fa-dice-six"
];
class u {
  static fontAwesome(e) {
    return `<i class="${e}"></i>`;
  }
  static iconSystemPath(e, t) {
    return u.iconPath(`${pt}/${e}`, t);
  }
  static iconPath(e, t) {
    return `<img class="${t}" src="${e}" />`;
  }
  static iconD6(e) {
    if (e < 0 || e > 6)
      throw `Dice ${e} is out of dice range [1..6] or 0 for multidice`;
    return u.fontAwesome(Dt[e]);
  }
}
globalThis.ANARCHY_ICONS = u;
const ae = o.actor.monitors, oe = o.actor.counters, Ke = {
  armor: {
    path: "system.monitors.armor.value",
    monitor: (r) => r.system.monitors.armor,
    iconChecked: u.fontAwesome("fas fa-shield-slash"),
    iconUnchecked: u.fontAwesome("fas fa-shield-alt"),
    iconHit: u.fontAwesome("fas fa-bahai"),
    resource: ae.armor
  },
  stun: {
    path: "system.monitors.stun.value",
    monitor: (r) => r.system.monitors.stun,
    iconChecked: u.fontAwesome("fas fa-grimace"),
    iconUnchecked: u.fontAwesome("far fa-smile"),
    iconHit: u.fontAwesome("fas fa-bahai"),
    resource: ae.stun,
    overflow: (r) => c.monitors.physical,
    useArmor: !0
  },
  physical: {
    path: "system.monitors.physical.value",
    monitor: (r) => r.system.monitors.physical,
    iconChecked: u.fontAwesome("fas fa-heartbeat"),
    iconUnchecked: u.fontAwesome("far fa-heart"),
    iconHit: u.fontAwesome("fas fa-bahai"),
    resource: ae.physical,
    useArmor: !0
  },
  structure: {
    path: "system.monitors.structure.value",
    monitor: (r) => r.system.monitors.structure,
    iconChecked: u.fontAwesome("fas fa-car-crash"),
    iconUnchecked: u.fontAwesome("fas fa-car-alt"),
    iconHit: u.fontAwesome("fas fa-bahai"),
    resource: ae.structure
  },
  matrix: {
    path: "system.monitors.matrix.value",
    monitor: (r) => r.getMatrixMonitor(),
    iconChecked: u.fontAwesome("fas fa-laptop-medical"),
    iconUnchecked: u.fontAwesome("fas fa-laptop"),
    iconHit: u.fontAwesome("fas fa-laptop-code"),
    overflow: (r) => r.getMatrixOverflow(),
    recomputeOverflow: (r) => 3,
    resource: ae.matrix
  },
  marks: {
    path: void 0,
    monitor: (r) => ({ value: 0, max: 5 }),
    iconChecked: u.fontAwesome("fas fa-bookmark"),
    iconUnchecked: u.fontAwesome("far fa-bookmark"),
    iconHit: u.fontAwesome("fas fa-fingerprint"),
    resource: ae.marks
  },
  convergence: {
    path: void 0,
    monitor: (r) => ({ value: 0, max: 5 }),
    iconChecked: u.fontAwesome("far fa-eye"),
    iconUnchecked: u.fontAwesome("fas fa-eye-slash"),
    iconHit: u.fontAwesome("fas fa-eye"),
    resource: ae.convergence
  },
  anarchy: {
    path: "system.counters.anarchy.value",
    monitor: (r) => ({
      value: r.system.counters.anarchy.value,
      max: 6
    }),
    iconChecked: u.iconSystemPath("anarchy-point.webp", "checkbar-img"),
    iconUnchecked: u.iconSystemPath("anarchy-point-off.webp", "checkbar-img"),
    resource: oe.anarchy
  },
  plot: {
    path: "system.counters.anarchy.value",
    monitor: (r) => {
      const e = r.system.counters.anarchy.value;
      return { value: e, max: e + 1 };
    },
    iconChecked: u.iconSystemPath("danger-point.webp", "checkbar-img"),
    iconUnchecked: u.iconSystemPath("danger-point-off.webp", "checkbar-img"),
    resource: oe.anarchy
  },
  sceneAnarchy: {
    path: "system.counters.sceneAnarchy.value",
    monitor: (r) => ({ value: r.system.counters.sceneAnarchy.value, max: 3 }),
    iconChecked: u.iconSystemPath("anarchy-point-scene.webp", "checkbar-img"),
    iconUnchecked: u.iconSystemPath("anarchy-point-off.webp", "checkbar-img"),
    resource: oe.sceneAnarchy
  },
  edge: {
    path: "system.counters.edge.value",
    monitor: (r) => ({
      value: r.system.counters.edge.value,
      max: r.getAttributeValue(c.attributes.edge)
    }),
    iconChecked: u.fontAwesome("fas fa-star"),
    iconUnchecked: u.fontAwesome("far fa-star"),
    resource: oe.edge
  },
  credibility: {
    path: "system.counters.social.credibility.value",
    monitor: (r) => ({
      value: r.system.counters.social.credibility.value,
      max: r.system.counters.social.credibility.max
    }),
    iconChecked: u.fontAwesome("fas fa-handshake"),
    iconUnchecked: u.fontAwesome("far fa-handshake"),
    resource: oe.social.credibility
  },
  rumor: {
    path: "system.counters.social.rumor.value",
    monitor: (r) => ({
      value: r.system.counters.social.rumor.value,
      max: r.system.counters.social.rumor.max
    }),
    iconChecked: u.fontAwesome("fas fa-grimace"),
    iconUnchecked: u.fontAwesome("far fa-grimace"),
    resource: oe.social.rumor
  }
}, U = foundry.utils.mergeObject(Ke, {});
class d {
  static init() {
    Handlebars.registerHelper("iconCheckbar", d.iconCheckbar), Handlebars.registerHelper("iconCheckbarHit", d.iconHit);
  }
  static hackCheckbars(e) {
    if (e) {
      const t = foundry.utils.mergeObject(Ke, {});
      foundry.utils.mergeObject(t, e, { recursive: !0 }), foundry.utils.mergeObject(U, t, { overwrite: !0 });
    }
  }
  static iconCheckbar(e, t) {
    return t ? d.iconChecked(e) : d.iconUnchecked(e);
  }
  static iconChecked(e) {
    var t;
    return (t = U[e]) == null ? void 0 : t.iconChecked;
  }
  static iconUnchecked(e) {
    var t;
    return (t = U[e]) == null ? void 0 : t.iconUnchecked;
  }
  static iconHit(e) {
    var t, a;
    return ((t = U[e]) == null ? void 0 : t.iconHit) ?? ((a = U[e]) == null ? void 0 : a.iconChecked);
  }
  static useArmor(e) {
    var t;
    return (t = U[e]) == null ? void 0 : t.useArmor;
  }
  static max(e, t) {
    var s;
    const a = (s = U[t]) == null ? void 0 : s.monitor(e);
    return ((a == null ? void 0 : a.max) ?? 0) + ((a == null ? void 0 : a.maxBonus) ?? 0);
  }
  static value(e, t) {
    var s;
    const a = (s = U[t]) == null ? void 0 : s.monitor(e);
    return (a == null ? void 0 : a.value) ?? 0;
  }
  static resistance(e, t) {
    var s;
    const a = (s = U[t]) == null ? void 0 : s.monitor(e);
    return ((a == null ? void 0 : a.resistance) ?? 0) + ((a == null ? void 0 : a.resistanceBonus) ?? 0);
  }
  static newValue(e, t) {
    return e + (t ? 0 : 1);
  }
  static async switchMonitorCheck(e, t, a, s, i = void 0, n = void 0) {
    await d.setCounter(e, t, d.newValue(a, s), i, n);
  }
  static async addCounter(e, t, a, s = void 0) {
    if (a != 0) {
      const i = d.getCounterValue(e, t, s) ?? 0;
      await d.setCounter(e, t, i + a, s);
    }
  }
  static async setCounter(e, t, a, s = void 0, i = void 0) {
    switch (t) {
      case c.monitors.marks:
        return await d.setActorMarks(e, a, s, i);
      case c.monitors.matrix:
        return K.checkMatrixMonitor(e), await d.setCheckbar(e, t, a, i);
      case c.monitors.convergence:
        return await d.setActorConvergence(e, a);
      case c.monitors.anarchy:
        return await d.setAnarchy(e, a);
      case c.monitors.sceneAnarchy:
        return await d.setSceneAnarchy(e, a);
    }
    return await d.setCheckbar(e, t, a);
  }
  static getCounterValue(e, t, a) {
    switch (t) {
      case c.monitors.marks:
        return d.getActorMarks(e, a);
      case c.monitors.convergence:
        return d.getActorConvergence(e);
      case c.monitors.anarchy:
        return d.getAnarchy(e, t);
    }
    return d.value(e, t);
  }
  static async setCheckbar(e, t, a) {
    if (a == d.getCounterValue(e, t))
      return;
    const s = U[t];
    if (s.path) {
      const i = d.max(e, t);
      if (i <= 0)
        return;
      await d._manageOverflow(s, e, t, a, i), a = Math.min(a, i), K.checkOutOfRange(s.resource, a, 0, i), await e.setCheckbarValue(s.path, a);
    }
  }
  static async _manageOverflow(e, t, a, s, i) {
    if (s > i) {
      const n = e.overflow ? e.overflow(t) : void 0, l = e.recomputeOverflow ? e.recomputeOverflow(s - i) : s - i;
      n && l > 0 && (d._notifyOverflow(t, a, l, n), await d.addCounter(t, n, l));
    }
  }
  static _notifyOverflow(e, t, a, s) {
    ui.notifications.warn(game.i18n.format(o.actor.monitors.overflow, {
      actor: e.name,
      monitor: game.i18n.format("ANARCHY.actor.monitors." + t),
      overflow: a,
      overflowMonitor: game.i18n.format("ANARCHY.actor.monitors." + s)
    }));
  }
  static async _manageStunOverflow(e, t, a) {
    await d.addCounter(e, c.monitors.physical, t - a);
  }
  static async _manageMatrixOverflow(e, t, a) {
    await d.addCounter(e, c.monitors.stun, t - a);
  }
  static async setAnarchy(e, t) {
    if (e.hasOwnAnarchy()) {
      if (e.hasGMAnarchy()) {
        await game.system.anarchy.gmAnarchy.setAnarchy(t), e.render();
        return;
      }
      await d._setAnarchyMonitor(e, c.monitors.anarchy, t);
    }
  }
  static async setSceneAnarchy(e, t) {
    await d._setAnarchyMonitor(e, c.monitors.sceneAnarchy, t);
  }
  static async _setAnarchyMonitor(e, t, a) {
    const s = d.value(e, t);
    await d.setCheckbar(e, t, a), game.user.isGM || d.notifyAnarchyChange(e, t, s, a);
  }
  static getAnarchy(e, t) {
    return !game.user.isGM && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) || t == oe.anarchy && (!e.hasOwnAnarchy() || e.hasGMAnarchy()) ? 0 : d.value(e, t);
  }
  static notifyAnarchyChange(e, t, a, s) {
    I.blindMessageToGM({
      from: game.user.id,
      content: game.i18n.format(
        o.gmManager.playerChangedAnarchy,
        {
          user: game.user.name,
          actor: e.name,
          monitor: game.i18n.localize(o.actor.counters[t]),
          from: a,
          to: s
        }
      )
    });
  }
  static getActorMarks(e, t) {
    var a;
    return ((a = d._findActorMarks(e.getMatrixMarks(), t)) == null ? void 0 : a.marks) ?? 0;
  }
  static async addActorMark(e, t, a = void 0) {
    const s = d._findActorMarks(e.getMatrixMarks(), t);
    d.setActorMarks(e, (s.marks ?? 0) + 1, t, a);
  }
  static async setActorMarks(e, t, a, s = void 0) {
    if (e.canReceiveMarks()) {
      let i = deepClone(e.getMatrixMarks());
      K.checkOutOfRange(U.marks.resource, t, 0, d.max(e, "marks"));
      const n = d._findActorMarks(i, a);
      n.marks == null && i.push(n), n.marks = Math.max(0, t), i = i.filter((l) => l.marks > 0), await e.setCheckbarValue("system.monitors.matrix.marks", i);
    }
  }
  static _findActorMarks(e, t) {
    return e.find((a) => a.actorId == t) ?? { actorId: t };
  }
  static getActorConvergence(e) {
    game.system.anarchy.gmConvergence.getConvergence(e);
  }
  static async setActorConvergence(e, t) {
    await game.system.anarchy.gmConvergence.setConvergence(e, t);
  }
}
const Ie = "anarchy-gm", Yt = "scene-anarchy-gm", rt = "GMAnarchy.addAnarchy";
class Ot {
  constructor() {
    game.settings.register(g, Ie, {
      scope: "world",
      config: !1,
      default: 1,
      type: Number
    }), game.settings.register(g, Yt, {
      scope: "world",
      config: !1,
      default: 0,
      type: Number
    }), j.register(rt, {
      callback: (e) => game.system.anarchy.gmAnarchy.addAnarchy(e),
      condition: (e) => e.isGM
    }), this.anarchy = game.settings.get(g, Ie);
  }
  getAnarchy() {
    return {
      isGM: !0,
      value: this.anarchy,
      max: this.anarchy + 1,
      scene: 0
    };
  }
  async actorGivesAnarchyToGM(e, t) {
    t > 0 && (ChatMessage.create({
      user: game.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      content: game.i18n.format(
        o.gmManager.gmReceivedAnarchy,
        {
          anarchy: t,
          actor: e.name
        }
      )
    }), await this.addAnarchy(t));
  }
  async npcConsumesAnarchy(e, t) {
    await this.addAnarchy(-t);
  }
  async addAnarchy(e) {
    j.call(rt, e) || (K.checkSufficient(o.actor.counters.plot, -e, this.anarchy), await this.setAnarchy(this.anarchy + e));
  }
  async setAnarchy(e) {
    this.anarchy = e, game.settings.set(g, Ie, e), await this._rebuild(), this._syncGMAnarchySheets();
  }
  async activateListeners(e) {
    this.toolbar = e.find(".gm-anarchy-bar"), await this._rebuild();
  }
  async _rebuild() {
    this.toolbar.find(".checkbar-root").replaceWith(await this._renderBar()), this.toolbar.find("a.click-checkbar-element").click(async (e) => await this._onClickAnarchyCheckbar(e));
  }
  async _onClickAnarchyCheckbar(e) {
    const t = Number.parseInt($(e.currentTarget).attr("data-index")), a = $(e.currentTarget).attr("data-checked") == "true", s = d.newValue(t, a);
    await this.setAnarchy(s);
  }
  async _renderBar() {
    return await renderTemplate("systems/anarchy/templates/monitors/anarchy.hbs", {
      code: "plot",
      rowlength: 6,
      value: this.getAnarchy().value,
      max: this.getAnarchy().max,
      scene: 0,
      labelkey: o.actor.counters.plot
    });
  }
  _syncGMAnarchySheets() {
    var a, s;
    const e = game.actors.filter((i) => !i.token || i.token.isLinked), t = (((s = (a = game.canvas) == null ? void 0 : a.tokens) == null ? void 0 : s.getDocuments()) ?? []).filter((i) => !i.isLinked).map((i) => i.actor);
    e.concat(t).filter((i) => !i.hasPlayerOwner).forEach((i) => i.render());
  }
}
class It {
  constructor(e, t) {
    this.getDocElement = e, this.initial = t.initial ?? { left: 200, top: 200 }, this.maxPos = t.maxPos ?? { left: 200, top: 100 }, this.minPos = t.minPos ?? { left: 2, top: 2 }, this.settings = t.settings, game.settings.register(this.settings.system, this.settings.keyPosition, {
      scope: "client",
      config: !1,
      default: this.initial,
      type: Object
    }), this.position = game.settings.get(this.settings.system, this.settings.keyPosition), this._initDrag();
  }
  _initDrag() {
    this.drag = {
      topPos: 0,
      leftPos: 0,
      topEvent: 0,
      leftEvent: 0
    };
  }
  _savePosition(e) {
    this.position = e, game.settings.set(this.settings.system, this.settings.keyPosition, this.position);
  }
  onMouseDown(e) {
    this.isRightMouseButton(e) ? this.handleMoveRightClick() : this.handleMoveDrag(e);
  }
  isRightMouseButton(e) {
    return e = e || window.event, "which" in e ? e.which == 3 : "button" in e ? e.button == 2 : !1;
  }
  handleMoveRightClick(e) {
    e.preventDefault(), this._savePosition(this.initial);
  }
  handleMoveDrag(e) {
    e.preventDefault(), this._initDrag(), this._dragElement(this.getDocElement(document));
  }
  _dragElement(e) {
    e.onmousedown = (t) => this._dragMouseDown(e, t);
  }
  _dragMouseDown(e, t) {
    t = t || window.event, t.preventDefault(), this.drag.leftEvent = t.clientX, this.drag.topEvent = t.clientY, document.onmouseup = (a) => this._closeDragElement(e, a), document.onmousemove = (a) => this._elementDrag(e, a);
  }
  _elementDrag(e, t) {
    t = t || window.event, t.preventDefault(), this.drag.leftPos = this.drag.leftEvent - t.clientX, this.drag.topPos = this.drag.topEvent - t.clientY, this.drag.leftEvent = t.clientX, this.drag.topEvent = t.clientY, this._setPositionStyle(e, {
      top: e.offsetTop - this.drag.topPos,
      left: e.offsetLeft - this.drag.leftPos
    });
  }
  _closeDragElement(e, t) {
    e.onmousedown = null, document.onmouseup = null, document.onmousemove = null;
    const a = {
      top: e.offsetTop - this.drag.topPos,
      left: e.offsetLeft - this.drag.leftPos
    };
    let s = this._constrain(a);
    (s.left != this.drag.leftPos || s.top != this.drag.topPos) && this._setPositionStyle(e, s), this._savePosition(s);
  }
  setPosition(e) {
    e = e ?? this.position;
    let t = this;
    return new Promise((a) => {
      function s() {
        let i = t.getDocElement(document);
        i ? (t._setPositionStyle(i, t._constrain(e)), a()) : setTimeout(s, 30);
      }
      s();
    });
  }
  _setPositionStyle(e, t) {
    e.style.bottom = void 0, e.style.top = t.top + "px", e.style.left = t.left + "px";
  }
  _constrain(e) {
    return {
      left: Math.max(this.minPos.left, Math.min(window.innerWidth - this.maxPos.left, e.left)),
      top: Math.max(this.minPos.top, Math.min(window.innerHeight - this.maxPos.top, e.top))
    };
  }
}
const Ue = "gm-difficulty-pools", _t = `${g}.${Ue}`;
class xt {
  constructor() {
    Hooks.on("updateSetting", async (e, t, a, s) => this.onUpdateSetting(e, t, a, s)), Hooks.once("ready", () => this.onReady());
  }
  onReady() {
    game.settings.register(g, Ue, {
      scope: "world",
      name: game.i18n.localize(o.settings.gmDifficulty.name),
      hint: game.i18n.localize(o.settings.gmDifficulty.hint),
      config: !0,
      default: game.i18n.localize(o.settings.gmDifficulty.default),
      type: String
    }), this.loadDifficultySettings();
  }
  async onUpdateSetting(e, t, a, s) {
    game.user.isGM && e.key == _t && (this.loadDifficultySettings(), this._rebuild(), game.system.anarchy.gmManager.render(!1));
  }
  loadDifficultySettings() {
    const e = game.settings.get(g, Ue);
    this.difficultyPools = e.split(",").map((t) => {
      const a = t.split(":");
      return a[1] ? { difficulty: a[0], pool: a[1] } : { pool: Number(a[0]) };
    });
  }
  getDifficultyData() {
    return this.difficultyPools;
  }
  async activateListeners(e) {
    this.toolbar = e.find(".gm-difficulty-bar"), await this._rebuild();
  }
  async _rebuild() {
    this.toolbar.find(".gm-difficulty-bar").replaceWith(await this._renderBar()), this.toolbar.find("a.click-roll-difficuty-pool").click(async (e) => await this._onClickDifficulty(e));
  }
  async _renderBar() {
    return await renderTemplate("systems/anarchy/templates/app/gm-difficulty-buttons.hbs", {
      difficultyPools: this.difficultyPools
    });
  }
  async _onClickDifficulty(e) {
    const t = $(e.currentTarget).attr("data-pool"), a = $(e.currentTarget).attr("data-difficulty"), s = new Roll(`${t}d6cs>=5`);
    await s.evaluate();
    const i = game.i18n.format(o.settings.gmDifficulty.chatMessage, {
      pool: t,
      difficulty: a ?? t,
      success: s.total
    }), n = await s.toMessage({ flavor: i }, { create: !1 });
    ChatMessage.create(n);
  }
}
const Pt = "gm-manager", $t = "gm-manager-position", Lt = { top: 200, left: 200 }, Gt = "systems/anarchy/templates/app/gm-manager.hbs";
class Vt extends Application {
  constructor(e, t) {
    super(), this.gmAnarchy = e, this.gmConvergence = t, this.gmDifficulty = new xt(), this.handleDrag = new It(
      (a) => a.getElementById("gm-manager"),
      {
        initial: Lt,
        maxPos: { left: 200, top: 100 },
        settings: {
          system: g,
          keyPosition: $t
        }
      }
    ), Hooks.once("ready", () => this.onReady()), Hooks.on("renderChatLog", async (a, s, i) => {
      const n = "systems/anarchy/templates/app/chat-tools.hbs", l = {
        title: game.i18n.localize("ANARCHY.gmManager.title"),
        rollDice: game.i18n.localize("ANARCHY.chat_actions.rollDice.title"),
        isGM: game.user.isGM
      }, m = await renderTemplate(n, l), y = $(m);
      $(s).find("form.chat-form").append(y[0]), $(s).find("form.chat-form .rolldice").on("click", (le) => {
        le.preventDefault(), new Dialog({
          title: game.i18n.localize("ANARCHY.chat_actions.rollDice.title"),
          content: '<div style="display:flex;margin:4px 0 8px 0;align-items:center;gap:8px">' + game.i18n.localize("ANARCHY.chat_actions.rollDice.instruction") + '<input class="roll-dice-value" name="macro-roll-count-dice" type="number" value="3" /></div>',
          buttons: {
            cancel: { label: game.i18n.localize("ANARCHY.common.cancel"), icon: '<i class="fas fa-times"></i>' },
            submit: {
              label: game.i18n.localize("ANARCHY.common.roll.button"),
              icon: '<i class="fas fa-dice"></i>',
              callback: async (Ce) => {
                const J = $(Ce).find('input[name="macro-roll-count-dice"]').val();
                if (!J || isNaN(J) || J <= 0) {
                  ui.notifications.warn(game.i18n.localize("ANARCHY.chat_actions.rollDice.error"));
                  return;
                }
                const te = new Roll(`${J}d6cs>4`);
                await te.evaluate({ async: !0 });
                const bt = te.terms[0].results.filter((wt) => wt.result == 1).length, Ct = game.i18n.format("ANARCHY.chat_actions.rollDice.result", {
                  count: J,
                  success: te.total,
                  ones: bt
                }), kt = await te.toMessage({ flavor: Ct }, { create: !1 });
                ChatMessage.create(kt);
              }
            }
          },
          default: "submit"
        }).render(!0);
      }), $(s).find("form.chat-form .gmmanager").on("click", (le) => {
        le.preventDefault(), this._element ? this.close() : this.render(!0);
      });
    });
  }
  onReady() {
    game.user.isGM && this.render(!0);
  }
  /* -------------------------------------------- */
  static get defaultOptions() {
    let e = super.defaultOptions;
    return e.id = Pt, e.title = game.i18n.localize(o.gmManager.title), e.template = Gt, e.popOut = !1, e.resizable = !1, e.height = "auto", e.width = "auto", e;
  }
  async render(e, t) {
    game.user.isGM && await super.render(e, t);
  }
  getData() {
    return this.handleDrag.setPosition(), {
      anarchy: this.gmAnarchy.getAnarchy(),
      convergences: this.gmConvergence.getConvergences(),
      difficultyPools: this.gmDifficulty.getDifficultyData(),
      ANARCHY: o,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      }
    };
  }
  async activateListeners(e) {
    super.activateListeners(e), e.find(".app-title-bar").mousedown((t) => this.handleDrag.onMouseDown(t)), e.find(".gm-manager-hide-button").mousedown((t) => this.close()), this.gmAnarchy.activateListeners(e), this.gmConvergence.activateListeners(e), this.gmDifficulty.activateListeners(e);
  }
}
function V(r, e, t, a, s, i = (n) => !0) {
  return {
    code: r,
    labelkey: o.attributeAction[r],
    attributeFunction1: e ?? ((n) => {
    }),
    attributeFunction2: t ?? ((n) => {
    }),
    icon: a,
    actorTypes: s,
    condition: i
  };
}
function he(r, e) {
  return {
    code: r,
    labelkey: o.defense[r],
    actionCode: e
  };
}
const N = c.attributes, D = c.actorTypes, O = E.actions, ge = E.defenses, _e = [
  V(O.defense, (r) => N.agility, (r) => N.logic, u.fontAwesome("fas fa-shield-alt"), [D.character]),
  V(O.defense, (r) => N.autopilot, (r) => N.handling, u.fontAwesome("fas fa-tachometer-alt"), [D.vehicle]),
  // TODO: add a way to pilot a vehicle to fallback defense of controled vehicle
  V(O.resistTorture, (r) => N.strength, (r) => N.willpower, u.fontAwesome("fas fa-angry"), [D.character]),
  V(O.perception, (r) => N.logic, (r) => N.willpower, u.fontAwesome("fas fa-eye"), [D.character]),
  V(O.perception, (r) => N.autopilot, void 0, u.fontAwesome("fas fa-video"), [D.vehicle]),
  V(O.perception, (r) => r.getMatrixLogic(), (r) => r.getMatrixLogic(), u.fontAwesome("fas fa-video"), [D.device, D.sprite, D.ic]),
  V(O.composure, (r) => N.charisma, (r) => N.willpower, u.fontAwesome("fas fa-meh"), [D.character]),
  V(O.judgeIntentions, (r) => N.charisma, (r) => N.charisma, u.fontAwesome("fas fa-theater-masks"), [D.character]),
  V(O.memory, (r) => N.logic, (r) => N.logic, u.fontAwesome("fas fa-brain"), [D.character]),
  V(O.catch, (r) => N.agility, (r) => N.agility, u.fontAwesome("fas fa-baseball-ball"), [D.character]),
  V(O.lift, (r) => N.strength, (r) => N.strength, u.fontAwesome("fas fa-dumbbell"), [D.character]),
  V(O.matrixDefense, (r) => r.getMatrixLogic(), (r) => r.getMatrixFirewall(), u.fontAwesome("fas fa-shield-virus"), [D.character, D.sprite, D.ic, D.device, D.vehicle]),
  V(O.astralDefense, (r) => N.logic, (r) => N.willpower, u.fontAwesome("fas fa-shield-virus"), [D.character])
], ke = [
  he(ge.physicalDefense, O.defense),
  he(ge.physicalResistance, O.resistTorture),
  he(ge.socialDefense, O.composure),
  he(ge.matrixDefense, O.matrixDefense),
  he(ge.mentalResistance, O.perception)
];
class Y {
  static init() {
    Handlebars.registerHelper("fixedDefenseCode", (e) => Y.fixedDefenseCode(e));
  }
  static all(e = void 0) {
    return e ? _e.filter(e) : _e;
  }
  static getActorActions(e) {
    return _e.filter((t) => t.actorTypes.includes(e.type) && t.condition(e));
  }
  static fixedDefenseCode(e) {
    return E.fixedDefenseCode[e] ?? e;
  }
  static getActorDefenses(e) {
    return ke.map((t) => {
      const a = Y.getActorAction(e, t.actionCode);
      return Y._convertToDefense(a, t);
    }).filter((t) => t == null ? void 0 : t.code);
  }
  static getDefenseAttributeAction(e) {
    var t;
    return (t = ke.find((a) => a.code == e)) == null ? void 0 : t.actionCode;
  }
  static getActorAction(e, t) {
    return Y.getActorActions(e).find((a) => a.code == t);
  }
  static getActorDefense(e, t) {
    t = Y.fixedDefenseCode(t);
    const a = ke.find((i) => i.code == t), s = Y.getActorAction(e, a.actionCode);
    return K.checkActorDefenseAction(s, e, a), Y._convertToDefense(s, a);
  }
  static _convertToDefense(e, t) {
    return e ? foundry.utils.mergeObject(
      t,
      e ?? {},
      { overwrite: !1, inplace: !1 }
    ) : void 0;
  }
  static getDefenses() {
    return ke;
  }
  static prepareShortcut(e, t) {
    const a = Y.getActorActions(e).find((s) => s.code == t);
    if (a)
      return {
        icon: a.icon,
        label: game.i18n.localize(a.labelkey),
        callback: (s) => s.actor.rollAttributeAction(t)
      };
  }
}
const qe = {
  canMark: !1,
  marks: [],
  value: 0,
  max: 0,
  resistance: 0
}, x = {
  connectionMode: {
    disconnected: "disconnected",
    augmented: "augmented",
    virtual: "virtual"
  }
};
class ye {
  static resolveConnectionMode(e) {
    switch (e) {
      case x.connectionMode.disconnected:
      case x.connectionMode.augmented:
      case x.connectionMode.virtual:
        return e;
      case void 0:
      default:
        return x.connectionMode.disconnected;
    }
  }
  static getNextConnectionMode(e) {
    switch (e) {
      case x.connectionMode.disconnected:
        return x.connectionMode.augmented;
      case x.connectionMode.augmented:
        return x.connectionMode.virtual;
      default:
      case x.connectionMode.virtual:
        return x.connectionMode.disconnected;
    }
  }
}
const it = [c.itemType.shadowamp, c.itemType.weapon, c.itemType.cyberdeck];
class A {
  constructor() {
    this.modifiers = {
      groups: S.mapObjetToKeyValue(o.modifier.group, "key", "label"),
      roll: A._buildGroupOptions("roll"),
      attribute: A._buildGroupOptions("attribute"),
      monitor: A._buildGroupOptions("monitor"),
      other: A._buildGroupOptions("other")
    }, Hooks.once("ready", () => this.onReady());
  }
  static _buildGroupOptions(e) {
    switch (e) {
      case "attribute":
        return {
          label: o.modifier.group[e],
          effects: S.hbsAttributes.map((t) => ({ key: t.value, label: t.labelkey })),
          categories: []
        };
    }
    return {
      label: o.modifier.group[e],
      effects: S.mapObjetToKeyValue(o.modifier[e].effect, "key", "label"),
      categories: S.mapObjetToKeyValue(o.modifier[e].category, "key", "label")
    };
  }
  async onReady() {
    Handlebars.registerHelper("modifierHasSubCategory", (e, t, a) => this.hasSubCategory(e, t, a)), Handlebars.registerHelper("modifierSelectOption", (e, t) => this.getSelectOptions(e, t));
  }
  hasSubCategory(e, t, a) {
    switch (e) {
      case "roll":
        return !0;
    }
    return !1;
  }
  getSelectOptions(e, t) {
    var a, s;
    switch (e) {
      case "group":
        return this.modifiers.groups;
      case "effect":
        return (a = this.modifiers[t.hash.group]) == null ? void 0 : a.effects;
      case "category":
        return (s = this.modifiers[t.hash.group]) == null ? void 0 : s.categories;
      case "subCategory":
        switch (t.hash.group) {
          case "roll":
            return this.getSelectRollSubCategories(t.hash.category);
        }
        return [];
    }
    return [];
  }
  getSelectRollSubCategories(e) {
    switch (e) {
      case "attribute":
        return S.getAttributes().map((a) => ({ key: a.value, label: a.labelkey }));
      case "skill":
        return game.system.anarchy.skills.getSkills().map((a) => ({ key: a.code, label: a.labelkey }));
      case "attributeAction":
        const t = Y.all().map((a) => ({ key: a.code, label: a.labelkey }));
        return f.distinct(t.map((a) => a.key)).map((a) => t.find((s) => s.key == a));
    }
    return [];
  }
  getEnums() {
    return { modifiers: this.modifiers };
  }
  static buildRollModifiersFilter(e, t) {
    return (a) => {
      var s;
      if (a.group == "roll" && a.effect == t)
        switch (a.category) {
          case "attribute":
            return [e.attribute1, e.attribute2].includes(a.subCategory);
          case "skill":
            return a.subCategory == ((s = e.skill) == null ? void 0 : s.system.code);
          case "attributeAction":
            return a.subCategory == e.attributeAction || a.subCategory == Y.getDefenseAttributeAction(e.defenseAction);
        }
      return !1;
    };
  }
  static computeRollModifiers(e, t, a) {
    const s = A.buildRollModifiersFilter(t, a), i = (y) => y.group == "roll" && y.effect == a && s(y), n = A._activeItems(e).map((y) => A.itemModifiers(y, i)).reduce((y, W) => y.concat(W), []).sort(f.descending((y) => y.modifier.value)), l = A.$sumShadowampModifiers(n.filter((y) => it.includes(y.item.type)).map((y) => y.modifier.value)), m = f.sumValues(n.filter((y) => !it.includes(y.item.type)).map((y) => y.modifier.value));
    return {
      value: l + m,
      sources: n
    };
  }
  static $sumShadowampModifiers(e) {
    const t = e.find((i) => i > 3) ?? 0, a = f.sumValues(e.filter((i) => i < 0)), s = Math.min(3, f.sumValues(e.filter((i) => i > 0 && i <= 3)));
    return a + Math.max(s, t);
  }
  static computeModifiers(e, t, a = void 0, s = void 0) {
    const i = A._createFilter(t, a, s), n = A._activeItems(e).map((m) => A.itemModifiers(m, i)).reduce((m, y) => m.concat(y), []);
    return {
      value: f.sumValues(n, (m) => m.modifier.value),
      sources: n
    };
  }
  static sumMonitorModifiers(e, t, a) {
    return A.sumModifiers(A._activeItems(e), "monitor", t, a);
  }
  static sumModifiers(e, t, a, s) {
    const i = A._createFilter(t, a, s), n = A._activeItems(e).map((l) => A.itemModifiers(l, i)).reduce((l, m) => l.concat(m), []);
    return f.sumValues(n, (l) => l.modifier.value);
  }
  static _createFilter(e, t, a) {
    return (s) => s.group == e && s.effect == (t ?? s.effect) && s.category == (a ?? s.category);
  }
  static countModifiers(e, t, a = void 0, s = void 0) {
    const i = A._createFilter(t, a, s);
    return A._activeItems(e).map((l) => A.itemModifiers(l, i)).reduce((l, m) => l.concat(m), []).count;
  }
  static itemModifiers(e, t) {
    return A._listItemModifiers(e, t).map((a) => A._itemModifier(e, a));
  }
  static _listItemModifiers(e, t = (a) => !0) {
    return (e.system.modifiers ?? []).filter(t);
  }
  static _itemModifier(e, t) {
    return {
      item: e,
      modifier: t
    };
  }
  static _activeItems(e) {
    return e.filter((t) => t.isActive());
  }
}
const ot = {
  highlighted: ["far fa-times-circle", "fas fa-dice-one", "fas fa-dice-two", "fas fa-dice-three", "fas fa-dice-four", "fas fa-dice-five", "fas fa-dice-six"],
  dimmed: ["far fa-times-circle", "far fa-dice-one", "far fa-dice-two", "far fa-dice-three", "far fa-dice-four", "far fa-dice-five", "far fa-dice-six"]
};
class B {
  static init() {
    Hooks.once("ready", async () => await this.onReady()), Handlebars.registerHelper("dice-cursor-array", (e, t) => B.array(e ?? 0, t ?? 5)), Handlebars.registerHelper("dice-cursor-fas", (e, t) => B.fasClass(e, t)), Handlebars.registerHelper("dice-cursor-active", (e, t) => B.activeClass(e, t)), Handlebars.registerHelper("dice-cursor-color", (e, t) => B.colorClass(e, t));
  }
  static async onReady() {
    await loadTemplates([
      "systems/anarchy/templates/roll/parts/dice-cursor.hbs"
    ]);
  }
  static array(e, t) {
    if (e > t) throw `min>max: ${e} > ${t}`;
    return Array(t - e + 1).fill().map((a, s) => e + s);
  }
  static isActive(e, t) {
    return t <= e && e < 0 || 0 < e && e <= t;
  }
  static activeClass(e, t) {
    return B.isActive(e, t) ? "active" : "inactive";
  }
  static fasClass(e, t) {
    const a = B.isActive(e, t) ? ot.highlighted : ot.dimmed;
    return B.$getFas(a, Math.abs(e));
  }
  static colorClass(e, t) {
    return e == 0 || !t ? e < 0 ? "fixed-dice-malus" : "fixed-dice-bonus" : e < 0 ? "variable-dice-malus" : "variable-dice-bonus";
  }
  static $getFas(e, t) {
    return e[t > 6 ? t % 6 : t];
  }
  static async diceCursor({ value: e, min: t, max: a, editable: s }) {
    return await renderTemplate("systems/anarchy/templates/roll/parts/dice-cursor.hbs", {
      value: e,
      min: t,
      max: a,
      editable: s
    });
  }
}
class Ut {
  static getMalus(e, t) {
    return Math.min(0, -Math.floor((7 - t) / 2));
  }
}
const b = {
  /**
   * Hook to declare template data migrations
   */
  DECLARE_MIGRATIONS: "anarchy-declareMigration",
  /**
   * Hook used to declare additional styles available
   */
  REGISTER_STYLES: "anarchy-registerStyles",
  /**
   * Hook allowing to register additional roll parameters
   */
  REGISTER_ROLL_PARAMETERS: "anarchy-registerRollParameters",
  /**
   * Hook allowing to modify some parameters (from Anarchy hacks modules).
   * Setting property ignore=true allows to remove the parameter.
   */
  MODIFY_ROLL_PARAMETER: "anarchy-forbidRollParameter",
  /**
   * Hook allowing to provide alternate skill sets for Anarchy hack modules
   */
  PROVIDE_SKILL_SET: "anarchy-provideSkillSet",
  /**
   * Hook allowing to provide alternate way to apply damages for Anarchy hack modules
   */
  PROVIDE_DAMAGE_MODE: "anarchy-provideDamageMode",
  /**
   * Hook allowing to define base essence
   */
  PROVIDE_BASE_ESSENCE: "anarchy-provideBaseEssence",
  /**
   * Hook allowing to define base essence
   */
  PROVIDE_MALUS_ESSENCE: "anarchy-provideMalusEssence",
  /**
   * Hook allowing to provide alternate anarchy hack (TODO: document)
   */
  ANARCHY_HACK: "anarchy-hack"
}, At = `${g}.${b.ANARCHY_HACK}`, pe = {
  id: g,
  name: "Standard Shadowrun Anarchy",
  hack: {
    checkbars: () => U
  }
};
globalThis.ANARCHY_HOOKS = b;
globalThis.SETTING_KEY_ANARCHY_HACK = At;
globalThis.SHADOWRUN_ANARCHY_NO_HACK = pe;
class Z {
  constructor() {
    this.hooks = [], this.hacks = {}, this.hackNames = {}, this.hookMethods = {}, this._register(b.ANARCHY_HACK), this._register(b.PROVIDE_BASE_ESSENCE), Hooks.on(b.ANARCHY_HACK, (e) => e(pe)), Hooks.on(b.PROVIDE_BASE_ESSENCE, (e) => e(pe, (t) => 6)), Hooks.on(b.PROVIDE_MALUS_ESSENCE, (e) => e(pe, (t, a) => Ut.getMalus(t, a))), Hooks.on("updateSetting", async (e, t, a, s) => this.onUpdateSetting(e, t, a, s)), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(b.ANARCHY_HACK, (e) => {
      this.hacks[e.id] = e, this.hackNames[e.id] = e.name;
    }), game.settings.register(g, b.ANARCHY_HACK, {
      scope: "world",
      name: game.i18n.localize(o.settings.anarchyHack.name),
      hint: game.i18n.localize(o.settings.anarchyHack.hint),
      config: !0,
      default: pe.id,
      choices: this.hackNames,
      type: String
    }), this.applySelectedAnarchyHack();
  }
  async onUpdateSetting(e, t, a, s) {
    e.key == At && this.applySelectedAnarchyHack();
  }
  applySelectedAnarchyHack() {
    const e = this.getSelectedHack();
    e && (d.hackCheckbars(e.hack.checkbars()), [
      b.PROVIDE_BASE_ESSENCE,
      b.PROVIDE_MALUS_ESSENCE
    ].forEach((a) => this.selectHookMethod(e, a)));
  }
  selectHookMethod(e, t) {
    Hooks.callAll(t, (a, s) => {
      a == e && (this.hookMethods[t] = s);
    });
  }
  getSelectedHack() {
    return this.hacks[game.settings.get(g, b.ANARCHY_HACK)];
  }
  getHookMethod(e, t) {
    return this.hookMethods[e] ?? t;
  }
  callHookMethod(e, ...t) {
    const a = this.hookMethods[e];
    return a ? a(...t) : void 0;
  }
  static instance() {
    return game.system.anarchy.hooks;
  }
  static register(e) {
    Z.instance()._register(e);
  }
  _register(e) {
    if (console.log(P + "HooksManager.register", e), !e.startsWith(g + "-"))
      throw "For safety Anarchy Hooks names must be prefixed by anarchy'-'";
    this.hooks.push(e);
  }
}
const C = {
  pool: "pool",
  reroll: "reroll",
  rerollForced: "rerollForced",
  successReroll: "successReroll",
  glitch: "glitch",
  drain: "drain",
  convergence: "convergence",
  edge: "edge",
  risk: "risk",
  opponentPool: "opponentPool",
  opponentReroll: "opponentReroll"
}, Ft = [
  // attribute1
  {
    code: "attribute1",
    options: {
      order: 1,
      category: C.pool,
      hbsTemplateRoll: `${h}/roll/parts/select-attribute.hbs`
    },
    condition: (r) => Object.values(E.rollType).includes(r.mode),
    isUsed: (r) => !0,
    factory: (r) => {
      var t;
      const e = r.attribute1 ?? ((t = r.skill) == null ? void 0 : t.system.attribute);
      return {
        labelkey: e ? o.attributes[e] : o.attributes.noAttributes,
        value: r.actor.getAttributeValue(e, r.activeItem),
        flags: { editable: r.skill },
        selected: e,
        choices: S.getAttributes((a) => r.attributes.includes(a))
      };
    }
  },
  // attribute2
  {
    code: "attribute2",
    options: {
      order: 1,
      category: C.pool,
      hbsTemplateRoll: `${h}/roll/parts/select-attribute.hbs`,
      hbsTemplateChat: `${h}/chat/parts/pool-attribute2.hbs`
    },
    condition: (r) => [E.rollType.attribute, E.rollType.attributeAction, E.rollType.defense].includes(r.mode),
    isUsed: (r) => r.used,
    onChecked: (r, e) => r.used = !!e,
    factory: (r) => {
      const e = r.attribute2;
      return {
        labelkey: e ? o.attributes[e] : o.attributes.noAttributes,
        value: r.actor.getAttributeValue(e, r.activeItem),
        flags: { editable: E.rollType.attribute == r.mode },
        selected: e,
        choices: S.getAttributes((t) => r.attributes.includes(t))
      };
    }
  },
  // skill
  {
    code: "skill",
    options: {
      flags: {},
      order: 3,
      category: C.pool,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`
    },
    condition: (r) => ["skill", "weapon"].includes(r.mode),
    factory: (r) => {
      var e, t;
      return {
        label: (e = r.skill) == null ? void 0 : e.name,
        value: ((t = r.skill) == null ? void 0 : t.system.value) ?? 0
      };
    }
  },
  // specialization
  {
    code: "specialization",
    options: {
      flags: { optional: !0 },
      value: 2,
      order: 4,
      category: C.pool,
      hbsTemplateRoll: `${h}/roll/parts/check-option.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => {
      var e;
      return r.mode == "skill" && r.specialization || r.mode == "weapon" && ((e = r.skill) == null ? void 0 : e.system.specialization);
    },
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 2 : 0;
    },
    factory: (r) => ({
      label: r.specialization ?? r.skill.system.specialization,
      used: r.specialization != null,
      value: 2
    })
  },
  // credibility usage
  {
    code: "credibility",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 5,
      category: C.pool,
      value: 0,
      labelkey: o.common.roll.modifiers.social.credibility,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`
    },
    condition: (r) => {
      var e;
      return ((e = r.skill) == null ? void 0 : e.system.isSocial) && r.actor.getCredibilityValue() > 0;
    },
    factory: (r) => ({
      min: 0,
      max: Math.min(r.actor.getCredibilityValue(), 3)
    })
  },
  // modifiers bonus
  {
    code: "poolModifiers",
    options: {
      flags: { editDice: !0, editable: !0 },
      labelkey: o.common.roll.modifiers.poolModifiers,
      order: 5,
      category: C.pool,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 4
    },
    factory: (r) => ne.computeRollModifiers(C.pool, r)
  },
  // wounds
  {
    code: "wounds",
    options: {
      flags: { optional: !0 },
      order: 10,
      category: C.pool,
      labelkey: o.common.roll.modifiers.wounds,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => r.actor.getWounds(),
    onChecked: (r, e) => {
      r.used = e, r.value = e ? -r.wounds : 0;
    },
    factory: (r) => {
      const e = r.actor.getWounds();
      return {
        wounds: e,
        min: -e,
        max: 0,
        value: -e,
        used: !0
      };
    }
  },
  // modifier for deckers/technomancers connected in virtual reality
  {
    code: "virtualReality",
    options: {
      flags: { editDice: !1, editable: !1 },
      order: 24,
      category: C.pool,
      value: 1,
      labelkey: o.common.roll.modifiers.virtualReality,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      min: 1,
      max: 1
    },
    condition: (r) => r.actor.isMatrixSkill(r.skill) && r.actor.isMatrixConnected(x.connectionMode.virtual),
    factory: (r) => ({
      flags: { used: r.actor.isMatrixSkill(r.skill) && r.actor.isMatrixConnected(x.connectionMode.virtual) }
    })
  },
  // other modifiers
  {
    code: "other",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 25,
      category: C.pool,
      value: 0,
      labelkey: o.common.roll.modifiers.other,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 5
    }
  },
  // Drain
  {
    code: "drain",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 40,
      category: C.drain,
      labelkey: o.common.roll.modifiers.drain,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 6
    },
    condition: (r) => {
      var e;
      return (r.mode == "skill" || r.mode == "weapon") && ((e = r.skill) == null ? void 0 : e.system.hasDrain);
    },
    factory: (r) => ({
      value: r.mode == "weapon" && r.weapon.hasDrain ? r.weapon.system.drain : 1
    })
  },
  // convergence
  {
    code: "convergence",
    options: {
      flags: { editDice: !1, optional: !0, used: !0, hideParameter: !0 },
      order: 40,
      category: C.convergence,
      value: 1,
      labelkey: o.common.roll.modifiers.convergence,
      hbsTemplateRoll: `${h}/roll/parts/check-option.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => {
      var e;
      return (r.mode == "skill" || r.mode == "weapon") && ((e = r.skill) == null ? void 0 : e.system.hasConvergence);
    },
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 1 : 0;
    }
  },
  // glitch
  {
    code: "glitch",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 50,
      category: C.glitch,
      labelkey: o.common.roll.modifiers.glitch,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${h}/chat/parts/glitch.hbs`,
      min: 0,
      max: 5
    },
    isUsed: (r) => r.value > 0,
    factory: (r) => {
      const e = r.actor.getWounds(), t = ne.computeRollModifiers(C.glitch, r);
      return {
        value: (e == 0 ? 0 : 1) + (r.glitch ?? 0) + t.value
      };
    }
  },
  // social rumor
  {
    code: "rumor",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 50,
      category: C.glitch,
      value: 0,
      labelkey: o.common.roll.modifiers.social.rumor,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      hbsTemplateChat: `${h}/chat/parts/glitch.hbs`,
      min: 0,
      max: 1
    },
    condition: (r) => {
      var e;
      return ((e = r.skill) == null ? void 0 : e.system.isSocial) && r.actor.getRumorValue() > 0;
    }
  },
  // rerolls
  {
    code: "reroll",
    options: {
      flags: { editDice: !0, editable: !0 },
      order: 30,
      category: C.reroll,
      labelkey: o.common.roll.modifiers.reroll,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (r) => ne.computeRollModifiers(C.reroll, r)
  },
  // reduction from opponent
  {
    code: "reduced",
    options: {
      order: 29,
      category: C.pool,
      labelkey: o.common.roll.modifiers.reduced,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      min: -4,
      max: 0
    },
    condition: (r) => {
      var e;
      return (((e = r.attackRoll) == null ? void 0 : e.param.opponentPool) ?? 0) != 0;
    },
    factory: (r) => {
      var t;
      const e = -(((t = r.attackRoll) == null ? void 0 : t.param.opponentPool) ?? 0);
      return {
        flags: { editDice: !0, used: !0 },
        value: e
      };
    }
  },
  // forced success rerolls
  {
    code: "rerollForced",
    options: {
      order: 31,
      category: C.rerollForced,
      labelkey: o.common.roll.modifiers.rerollForced,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      min: -5,
      max: 0
    },
    factory: (r) => {
      var t;
      const e = ne.computeRollModifiers(C.successReroll, r);
      return e.value = -e.value - (((t = r.attackRoll) == null ? void 0 : t.param.opponentReroll) ?? 0), foundry.utils.mergeObject(e, {
        flags: { editDice: !0, used: !0, editable: !0 }
      });
    }
  },
  // anarchy dispositions
  {
    code: "anarchyDisposition",
    options: {
      flags: { optional: !0, isAnarchy: !0, forceDisplay: !0 },
      order: 70,
      category: C.pool,
      value: 0,
      min: 0,
      max: 3,
      labelkey: o.common.roll.modifiers.anarchyDisposition,
      hbsTemplateRoll: `${h}/roll/parts/check-option.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => r.actor.getAnarchyValue() > 0,
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 3 : 0;
    }
  },
  // anarchy take risks
  {
    code: "anarchyRisk",
    options: {
      flags: { optional: !0, isAnarchy: !0, forceDisplay: !0 },
      order: 70,
      category: C.risk,
      value: 0,
      labelkey: o.common.roll.modifiers.anarchyRisk,
      hbsTemplateRoll: `${h}/roll/parts/check-option.hbs`,
      hbsTemplateChat: `${h}/chat/parts/anarchy-risk.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => r.actor.getAnarchyValue() > 0,
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 1 : 0;
    }
  },
  // edge
  {
    code: "edge",
    options: {
      flags: { optional: !0, forceDisplay: !0 },
      value: 0,
      order: 70,
      category: C.edge,
      labelkey: o.common.roll.modifiers.edge,
      hbsTemplateRoll: `${h}/roll/parts/check-option.hbs`
    },
    isUsed: (r) => r.used,
    condition: (r) => r.options.canUseEdge && r.actor.getRemainingEdge(),
    onChecked: (r, e) => {
      r.used = e, r.value = e ? 1 : 0;
    }
  },
  // reduce opponent pool
  {
    code: "opponentPool",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: C.opponentPool,
      labelkey: o.common.roll.modifiers.opponentPool,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (r) => ne.computeRollModifiers(C.opponentPool, r),
    condition: (r) => !r.attributeAction
  },
  // force opponent rerolls
  {
    code: "opponentReroll",
    options: {
      flags: { editDice: !0, editable: !0, forceDisplay: !0 },
      order: 100,
      category: C.opponentReroll,
      value: 0,
      labelkey: o.common.roll.modifiers.opponentReroll,
      hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
      min: 0,
      max: 4
    },
    factory: (r) => ne.computeRollModifiers(C.opponentReroll, r),
    condition: (r) => !r.attributeAction
  }
];
class ne {
  constructor() {
    this.registeredParameters = {}, Z.register(b.REGISTER_ROLL_PARAMETERS), Z.register(b.MODIFY_ROLL_PARAMETER), Hooks.on(b.MODIFY_ROLL_PARAMETER, (e) => this._validate(e)), Hooks.once(b.REGISTER_ROLL_PARAMETERS, (e) => Ft.forEach(
      (t) => e(t)
    )), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(b.REGISTER_ROLL_PARAMETERS, async (t) => {
      Hooks.callAll(b.MODIFY_ROLL_PARAMETER, t), t.ignore || await this._register(t);
    });
    const e = f.distinct([].concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateRoll)).concat(Object.values(this.registeredParameters).map((t) => t.options.hbsTemplateChat)).filter((t) => t != null));
    await loadTemplates(f.distinct(e)), await loadTemplates([`${h}/roll/parts/parameter-label.hbs`]);
  }
  _validate(e) {
    e.code || (console.error(`${P} RollParameter does not have a code`, e), e.ignore = !0);
  }
  async _register(e) {
    if (this.registeredParameters[e.code]) {
      console.error(`${P} RollParameter ${e.code} is already registered`, e);
      return;
    }
    e.onChecked || (e.onChecked = (t, a) => t.used = a), e.onValue = (t, a) => t.value = a, this.registeredParameters[e.code] = e;
  }
  async _optionalLoadTemplate(e) {
    e && await loadTemplates([e]);
  }
  build(e) {
    return Object.values(this.registeredParameters).filter((t) => !t.condition || t.condition(e)).map((t) => this._computeParameter(t, e));
  }
  compute(e) {
    const t = e.filter((i) => this.isParameterUsed(i)), a = f.classify(t, (i) => i.category), s = {};
    return Object.values(a).forEach((i) => s[i[0].category] = f.sumValues(i, (n) => n.value ?? (n.optional ? 1 : 0))), s;
  }
  isParameterUsed(e) {
    const t = this.findParameter(e.code);
    return (t == null ? void 0 : t.isUsed) != null ? t.isUsed(e) : e.value != null ? e.value != 0 : (console.error(`registered parameter ${t.code} does not have isUsed method`, t), !1);
  }
  findParameter(e) {
    return this.registeredParameters[e];
  }
  _computeParameter(e, t) {
    const a = {
      code: e.code,
      onChecked: e.onChecked,
      onValue: e.onValue,
      isUsed: e.isUsed
    };
    return foundry.utils.mergeObject(a, e.options), e.factory && foundry.utils.mergeObject(a, e.factory(t, e.options)), foundry.utils.mergeObject(a, {
      used: a.used || a.value,
      min: a.min ?? 0,
      max: a.max ?? a.value ?? 0
    }), a;
  }
  static computeRollModifiers(e, t) {
    const a = (i) => i.type != c.itemType.weapon || t.weapon && i.id == t.weapon.id, s = t.actor.items.filter(a);
    return A.computeRollModifiers(s, t, e);
  }
}
class R extends Dialog {
  static init() {
    Hooks.once("ready", async () => await this.onReady());
  }
  static async onReady() {
    await loadTemplates([
      "systems/anarchy/templates/roll/roll-parameters-category.hbs",
      "systems/anarchy/templates/roll/parts/generic.hbs",
      "systems/anarchy/templates/roll/parts/image-attribute.hbs",
      "systems/anarchy/templates/roll/parts/image-attributeAction.hbs",
      "systems/anarchy/templates/roll/parts/image-defense.hbs",
      "systems/anarchy/templates/roll/parts/image-skill.hbs",
      "systems/anarchy/templates/roll/parts/image-weapon.hbs"
    ]);
  }
  static prepareActorRoll(e, t = void 0) {
    var a;
    return {
      actor: e,
      tokenId: (a = e.token) == null ? void 0 : a.id,
      attributes: e.getUsableAttributes(t),
      options: {
        canUseEdge: e.canUseEdge()
      }
    };
  }
  static async rollAttribute(e, t) {
    const a = foundry.utils.mergeObject(R.prepareActorRoll(e), {
      mode: E.rollType.attribute,
      attribute1: t
    });
    await R.create(a);
  }
  static async rollAttributeAction(e, t) {
    const a = foundry.utils.mergeObject(R.prepareActorRoll(e), {
      mode: E.rollType.attributeAction,
      attributeAction: t.code,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e)
    });
    await R.create(a);
  }
  static async rollAttribute(e, t) {
    const a = foundry.utils.mergeObject(R.prepareActorRoll(e), {
      mode: E.rollType.attribute,
      attribute1: t
    });
    await R.create(a);
  }
  static async rollSkill(e, t, a) {
    const s = foundry.utils.mergeObject(R.prepareActorRoll(e), {
      mode: E.rollType.skill,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? c.attributes.agility,
      specialization: a
    });
    await R.create(s);
  }
  static async rollWeapon(e, t, a, s) {
    const i = foundry.utils.mergeObject(R.prepareActorRoll(e), {
      mode: E.rollType.weapon,
      weapon: a,
      skill: t,
      attribute1: (t == null ? void 0 : t.system.attribute) ?? e.getPhysicalAgility(),
      specialization: t == null ? void 0 : t.system.specialization,
      targeting: s
    });
    await R.create(i);
  }
  static async rollDefense(e, t, a, s = void 0) {
    const i = foundry.utils.mergeObject(R.prepareActorRoll(e), {
      mode: E.rollType.defense,
      attribute1: t.attributeFunction1(e),
      attribute2: t.attributeFunction2(e),
      defenseAction: t.code,
      attackRoll: a.attackRoll,
      tokenId: a.defenderTokenId,
      choiceChatMessageId: a.choiceChatMessageId
    });
    await R.create(i);
  }
  static async itemAttributeRoll(e, t) {
    const a = foundry.utils.mergeObject(R.prepareActorRoll(e.actor), {
      mode: E.rollType.attribute,
      item: e,
      attribute1: t,
      attributes: e.actor.getUsableAttributes(e)
    });
    await R.create(a);
  }
  static async create(e) {
    const t = game.system.anarchy.rollParameters.build(e).sort(f.ascending((i) => i.order ?? 200));
    foundry.utils.mergeObject(e, {
      ENUMS: S.getEnums((i) => e.attributes.includes(i)),
      ANARCHY: o,
      parameters: t
    });
    const a = await renderTemplate(`${h}/roll/roll-dialog-title.hbs`, e), s = await renderTemplate(`${h}/roll/roll-dialog.hbs`, e);
    new R(a, s, e).render(!0);
  }
  constructor(e, t, a) {
    const s = {
      title: e,
      content: t,
      default: "roll",
      buttons: {
        roll: {
          label: game.i18n.localize(o.common.roll.button),
          callback: async () => await game.system.anarchy.rollManager.roll(a)
        }
      }
    }, i = {
      classes: [game.system.anarchy.styles.selectCssClass(), "anarchy-dialog"],
      width: 500,
      height: "fit-content",
      "z-index": 99999
    };
    super(s, i), this.roll = a;
  }
  activateListeners(e) {
    super.activateListeners(e), this.html = e, this.bringToTop(), this.html.find(".select-attribute-parameter").change(async (t) => {
      const a = this._getRollParameter(t), s = this._getEventItem(t, this.roll.actor), i = t.currentTarget.value, n = this.roll.actor.getAttributeValue(i, s);
      this.roll[a.code] = i, await this._setParameterSelectedOption(a, i, n);
    }), this.html.find(".check-optional").click(async (t) => {
      const a = this._getRollParameter(t);
      a.onChecked(a, t.currentTarget.checked), a.category == C.pool && await this._updateParameterValue(a, a.value);
    }), this.activateDiceParameterClick(), this.html.find("input.parameter-value:not(:disabled)").on("input", async (t) => {
      const a = this._getRollParameter(t), s = Number.parseInt(t.currentTarget.value) ?? 0;
      await this._updateParameterValue(a, s);
    }), this.html.find(".select-option-parameter").change(async (t) => {
      const a = this._getRollParameter(t), s = t.currentTarget.value, i = Number.parseInt(s);
      await this._setParameterSelectedOption(a, s, i);
    });
  }
  activateDiceParameterClick() {
    this.html.find(".input-cursor-parameter a").click(async (e) => {
      var a;
      const t = this._getRollParameter(e);
      if ((a = t.flags) != null && a.editDice) {
        const s = Number.parseInt(this.html.find(e.currentTarget).attr("data-dice")) ?? 0, i = t.value != s || s == 0 ? s : s > 0 ? s - 1 : s + 1;
        await this._updateParameterValue(t, i);
      }
    });
  }
  async _setParameterSelectedOption(e, t, a) {
    e.onChecked(e, t), e.max = a, await this._updateParameterValue(e, a);
  }
  async _updateParameterValue(e, t) {
    e.onValue(e, t), this.html.find(`.parameter[data-parameter-code='${e.code}'] .parameter-value`).text(t);
    const a = await this.renderDiceCursor(e);
    this.html.find(`.parameter[data-parameter-code='${e.code}'] .input-cursor-parameter`).empty().append(a), this.activateDiceParameterClick(), this.html.find(`.parameter[data-parameter-code='${e.code}'] input.parameter-value`).val(e.value);
  }
  async renderDiceCursor(e) {
    var t;
    return await B.diceCursor({ value: e.value, min: e.min, max: e.max, editable: (t = e.flags) == null ? void 0 : t.editDice });
  }
  _getSelectedOption(e) {
    return this.html.find(`.parameter[data-parameter-code='${e.code}'] select.select-option-parameter option:selected`).text();
  }
  _getEventItem(e, t) {
    const a = this.html.find(e.currentTarget).closest(".parameter").attr("data-item-id");
    return a ? t.items.get(a) : void 0;
  }
  _getRollParameter(e) {
    const t = this.html.find(e.currentTarget).closest(".parameter").attr("data-parameter-code");
    return this.roll.parameters.find((a) => a.code == t);
  }
}
const Re = "selected-skill-list", jt = `${g}.${Re}`, w = c.attributes, se = E.defenses, xe = "shadowrun-anarchy-en", nt = { code: "knowledge", attribute: w.knowledge, icon: `${k}/knowledge.svg` }, de = [
  { code: "athletics", attribute: w.strength, icon: `${k}/athletics.svg` },
  { code: "acrobatics", attribute: w.agility, icon: `${k}/escape-artist.svg`, lang: "fr" },
  { code: "closeCombat", attribute: w.agility, icon: `${k}/close-combat.svg`, defense: se.physicalDefense },
  { code: "projectileWeapons", attribute: w.agility, icon: `${k}/projectile-weapons.svg`, defense: se.physicalDefense },
  { code: "firearms", attribute: w.agility, icon: `${k}/firearms.svg`, defense: se.physicalDefense },
  { code: "heavyWeapons", attribute: w.agility, icon: `${k}/heavy-weapons.svg`, defense: se.physicalDefense },
  { code: "vehicleWeapons", attribute: w.agility, icon: `${k}/vehicle-weapons.svg`, defense: se.physicalDefense },
  { code: "stealth", attribute: w.agility, icon: `${k}/stealth.svg` },
  { code: "pilotingGround", attribute: w.agility, icon: `${k}/piloting-ground-steering-wheel.svg` },
  { code: "pilotingOther", attribute: w.agility, icon: `${k}/piloting-other.svg` },
  { code: "escapeArtist", attribute: w.agility, icon: `${k}/escape-artist.svg`, lang: "en" },
  { code: "conjuring", attribute: w.willpower, hasDrain: !0, icon: `${k}/conjuring.svg` },
  { code: "sorcery", attribute: w.willpower, hasDrain: !0, icon: `${k}/sorcery.svg` },
  { code: "astralCombat", attribute: w.willpower, icon: `${k}/astral-combat.svg`, defense: se.astralDefense },
  { code: "survival", attribute: w.willpower, icon: `${k}/survival.svg` },
  { code: "biotech", attribute: w.logic, icon: `${k}/biotech.svg` },
  { code: "hacking", attribute: w.logic, hasConvergence: !0, icon: `${k}/hacking.svg`, defense: se.matrixDefense },
  { code: "electronics", attribute: w.logic, icon: `${k}/electronics.svg` },
  { code: "engineering", attribute: w.logic, icon: `${k}/engineering.svg` },
  { code: "tasking", attribute: w.logic, hasDrain: !0, icon: `${k}/tasking.svg` },
  { code: "tracking", attribute: w.logic, icon: `${k}/tracking.svg` },
  { code: "animals", attribute: w.charisma, icon: `${k}/animals.svg`, lang: "fr" },
  { code: "con", attribute: w.charisma, isSocial: !0, icon: `${k}/con-art.svg` },
  { code: "etiquette", attribute: w.charisma, isSocial: !0, icon: `${k}/etiquette.svg`, lang: "fr" },
  { code: "intimidation", attribute: w.charisma, isSocial: !0, icon: `${k}/intimidation.svg` },
  { code: "negotiation", attribute: w.charisma, isSocial: !0, icon: `${k}/negotiation.svg` },
  { code: "disguise", attribute: w.charisma, icon: `${k}/disguise.svg`, lang: "en" }
], Wt = ["tasking", "hacking"];
class zt {
  constructor() {
    this.skillSets = {}, Z.register(b.PROVIDE_SKILL_SET), Hooks.on(
      b.PROVIDE_SKILL_SET,
      (e) => e(xe, "Shadowrun Anarchy EN", de.filter((t) => !t.lang || t.lang == "en"), { lang: "en" })
    ), Hooks.on(
      b.PROVIDE_SKILL_SET,
      (e) => e("shadowrun-anarchy-fr", "Shadowrun Anarchy FR", de.filter((t) => !t.lang || t.lang == "fr"), { lang: "fr" })
    ), Hooks.on("updateSetting", async (e, t, a, s) => this.onUpdateSetting(e, t, a, s)), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    this.$prepareSkill(nt), Hooks.callAll(b.PROVIDE_SKILL_SET, (t, a, s, i) => {
      const n = this.$prepareSkillSet(t, a, s, i);
      n && (this.skillSets[n.id] = n);
    });
    const e = Object.fromEntries(Object.values(this.skillSets).map((t) => [t.id, t.name]));
    game.settings.register(g, Re, {
      scope: "world",
      name: game.i18n.localize(o.settings.skillSet.name),
      hint: game.i18n.localize(o.settings.skillSet.hint),
      config: !0,
      default: xe,
      choices: e,
      type: String
    }), this.selectedSkills = game.settings.get(g, Re);
  }
  async onUpdateSetting(e, t, a, s) {
    e.key == jt && (this.selectedSkills = game.settings.get(g, Re));
  }
  get(e) {
    return this.getSkills({ withKnowledge: !0 }).find((t) => t.code == e);
  }
  getSkills(e = { withKnowledge: !1 }) {
    const t = this.$getConfiguredSkills().sort(f.ascending((a) => a.label));
    return e.withKnowledge ? [nt, ...t] : t;
  }
  $getConfiguredSkills() {
    return (this.skillSets[this.selectedSkills] ?? this.skillSets[xe]).skills;
  }
  $prepareSkillSet(e, t, a, s) {
    const i = foundry.utils.mergeObject({ id: e, name: t, skills: a }, s);
    if (this.$validateSkillSet(i))
      return i.skills.forEach((n) => {
        this.$prepareSkill(n);
      }), i;
  }
  $prepareSkill(e) {
    e.labelkey = e.labelkey ?? o.skill[e.code], e.icon = e.icon ?? `${ue}/icons/skills/skills.svg`;
  }
  $validateSkillSet(e) {
    function t(a, s = "") {
      if (!a)
        throw s;
    }
    try {
      t(e.id && e.name, "Skills list does not have an id or name");
      const a = this.skillSets[e.id];
      t(!a, `Skills list ${e.id} is already registered under name ${a == null ? void 0 : a.name}`), t(Array.isArray(e.skills), "Missing skills array"), e.skills.forEach((i) => {
        t(i.code, `Missing skill code for ${i} in ${e.id}`), t(i.labelkey || o.skill[i.code], `Missing skill localization key for ${i.code}`), t(i.attribute, `Missing skill attribute for ${i.code}`);
      });
      const s = e.skills.map((i) => i.code);
      return t(e.skills.length == f.distinct(s).length, `Duplicate skill codes in ${s}`), !0;
    } catch (a) {
      return console.warn(a + (e.id ? ` in list ${e.id}` : " in unidentified list"), e), !1;
    }
  }
}
const Fe = "damage-mode", Bt = `${g}.${Fe}`, we = {}, Pe = {};
class v {
  static init() {
    Z.register(b.PROVIDE_DAMAGE_MODE), Hooks.on("updateSetting", async (e, t, a, s) => v.onUpdateSetting(e, t, a, s)), Hooks.on(b.PROVIDE_DAMAGE_MODE, (e) => {
      e("resistanceArmorMonitor", o.settings.damageMode.values.resistanceArmorMonitor, v.sufferDamageResistanceArmorMonitor), e("armorResistanceMonitor", o.settings.damageMode.values.armorResistanceMonitor, v.sufferDamageArmorResistanceMonitor), e("armorGivesResistance", o.settings.damageMode.values.armorGivesResistance, v.sufferDamageArmorAsResistance_Earthdawn), e("armorGiveResistanceHitsAvoid", o.settings.damageMode.values.armorGiveResistanceHitsAvoid, v.sufferDamageArmorAsResistance_Cyberpunk);
    }), Hooks.once("ready", () => v.onReady());
  }
  static onReady() {
    v._registerDamageModeSetting(), v._selectDamageMode();
  }
  static _registerDamageModeSetting() {
    Hooks.callAll(b.PROVIDE_DAMAGE_MODE, (e, t, a) => {
      we[e] = game.i18n.localize(t), Pe[e] = a;
    }), game.settings.register(g, Fe, {
      scope: "world",
      name: game.i18n.localize(o.settings.damageMode.name),
      hint: game.i18n.localize(o.settings.damageMode.hint),
      config: !0,
      default: Object.keys(we)[0],
      choices: we,
      type: String
    });
  }
  static async onUpdateSetting(e, t, a, s) {
    e.key == Bt && v._selectDamageMode();
  }
  static _selectDamageMode() {
    let e = game.settings.get(g, Fe);
    Pe[e] || (e = Object.keys(we)[0]), v.damageModeCode = e, v.damageModeMethod = Pe[e];
  }
  static async sufferDamage(e, t, a, s, i, n, l) {
    const m = e.getDamageMonitor(t);
    K.checkActorCanReceiveDamage(t, m, e), await (v.damageModeMethod ?? v.sufferDamageResistanceArmorMonitor)(e, m, a, s, i, n), await e.applyArmorDamage(t, A.sumModifiers([l], "other", "damageArmor"));
  }
  static async sufferMarks(e, t) {
    await d.addCounter(e, c.monitors.marks, 1, t.id);
  }
  static async sufferDamageResistanceArmorMonitor(e, t, a, s, i, n) {
    if (t == c.monitors.marks) {
      await v.sufferMarks(e, n);
      return;
    }
    const l = d.resistance(e, t);
    let m = 0;
    if (i) {
      const y = Math.min(l, a), W = Math.min(l - y, s);
      m = a - y, d.useArmor(t) && (m -= await v.damageToArmor(e, m)), m += s - W;
    } else
      m = a + s - l, d.useArmor(t) && (m -= await v.damageToArmor(e, m));
    m > 0 && await d.addCounter(e, t, m);
  }
  static async sufferDamageArmorResistanceMonitor(e, t, a, s, i, n) {
    if (t == c.monitors.marks) {
      await v.sufferMarks(e, n);
      return;
    }
    let l = 0;
    return d.useArmor(t) ? i ? (a -= await v.damageToArmor(e, a), l = s + a) : (l = s + a, l -= await v.damageToArmor(e, l)) : l = a + s, l -= d.resistance(e, t), l > 0 && await d.addCounter(e, t, l), l;
  }
  static async sufferDamageArmorAsResistance_Cyberpunk(e, t, a, s, i, n) {
    if (t == c.monitors.marks) {
      await v.sufferMarks(e, n);
      return;
    }
    let l = a + s;
    if (d.useArmor(t) && l > 0) {
      const m = i ? s : 0, y = Math.max(0, v._computeArmorResistance(e) - m);
      y > 0 && (await d.addCounter(e, "armor", 1), l -= y);
    }
    return l -= d.resistance(e, t), l > 0 && await d.addCounter(e, t, l), Math.max(l, 0);
  }
  static async sufferDamageArmorAsResistance_Earthdawn(e, t, a, s, i, n) {
    if (t == c.monitors.marks) {
      await v.sufferMarks(e, n);
      return;
    }
    let l = a + s;
    if (d.useArmor(t) && !i && l > 0) {
      const m = v._computeArmorResistance(e);
      m > 0 && (await d.addCounter(e, "armor", 1), l -= m);
    }
    return l -= v._computeStrengthResistance(e, t), l -= d.resistance(e, t), l > 0 && await d.addCounter(e, t, l), l;
  }
  static async damageToArmor(e, t) {
    if (t > 0) {
      const a = d.max(e, c.monitors.armor), s = d.getCounterValue(e, c.monitors.armor), i = Math.min(a - s, t), n = d.resistance(e, c.monitors.armor), l = Math.max(0, i - n);
      return l > 0 && await d.addCounter(e, c.monitors.armor, l), i;
    } else
      return 0;
  }
  static _computeArmorResistance(e) {
    const t = d.max(e, "armor"), a = d.getCounterValue(e, "armor"), s = Math.max(0, t - a);
    return Math.max(0, Math.ceil(s / 3));
  }
  static _computeStrengthResistance(e, t) {
    switch (t) {
      case c.monitors.matrix:
        return 0;
    }
    const a = e.getAttributeValue(c.attributes.strength);
    return Math.max(0, Math.floor(a / 4));
  }
}
class H extends Actor {
  static init() {
    Hooks.on("updateActor", (e, t, a, s) => {
      var i;
      return (i = I.firstResponsible(e)) == null ? void 0 : i.onUpdateActor(t, a);
    });
  }
  constructor(e, t = {}) {
    var a;
    if (!((a = t.anarchy) != null && a.ready)) {
      const s = game.system.anarchy.actorClasses[e.type];
      if (foundry.utils.mergeObject(t, { anarchy: { ready: !0 } }), s)
        return e.img || (e.img = s.defaultIcon), new s(e, t);
    }
    t.anarchy = void 0, super(e, t);
  }
  static get initiative() {
    return "2d6 + @modifiers.initiative";
  }
  static get defaultIcon() {
  }
  static padWordListToMin(e, t) {
    for (let a = e.length; a < t; a++)
      e.push({
        word: "",
        id: a + 1,
        audio: "",
        no_delete: !1
      });
    for (let a = 0; a < t; a++)
      e[a].no_delete = !0;
    return e;
  }
  static sortSkills(e, t) {
    return t ? t.sort((a, s) => {
      const i = a.system.code === "knowledge" || a.system.attribute === "knowledge", n = s.system.code === "knowledge" || s.system.attribute === "knowledge";
      if (i && !n) return 1;
      if (!n && i) return -1;
      if (i && n)
        return a.name > s.name ? 1 : a.name > s.name ? -1 : 0;
      const l = e.getAttributeValue(a.system.attribute) + a.system.value, m = e.getAttributeValue(s.system.attribute) + s.system.value;
      return l > m ? -1 : l < m ? 1 : 0;
    }) : [];
  }
  static sortQualities(e) {
    return e ? e.sort((t, a) => t.system.positive === a.system.positive ? t.name > a.name ? 1 : t.name < a.name ? -1 : 0 : t.system.positive ? -1 : a.system.positive ? 1 : 0) : [];
  }
  static sortShadowamps(e) {
    return e ? e.sort((t, a) => t.system.level > a.system.level ? -1 : t.system.level < a.system.level || t.name > a.name ? 1 : t.name < a.name ? -1 : 0) : [];
  }
  static sortAttributeButton(e) {
    return e ? e.sort((t, a) => game.i18n.localize(t.labelkey) > game.i18n.localize(a.labelkey) ? 1 : game.i18n.localize(t.labelkey) < game.i18n.localize(a.labelkey) ? -1 : 0) : [];
  }
  getAllowedUsers(e = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    return game.users.filter((t) => this.testUserPermission(t, e));
  }
  getAllowedUserIds(e = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER) {
    return this.getAllowedUsers(e).map((t) => t.id);
  }
  getRightToDefend() {
    return CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
  }
  hasOwnAnarchy() {
    return !1;
  }
  hasGMAnarchy() {
    return !this.hasPlayerOwner;
  }
  isVehicle() {
    return this.type == c.actorTypes.vehicle;
  }
  prepareData() {
    super.prepareData(), this.cleanupFavorites();
  }
  prepareDerivedData() {
    this.prepareMatrixMonitor(), this.system.modifiers = {
      initiative: A.sumModifiers(this.items, "other", "initiative")
    }, this.system.monitors && Object.entries(this.system.monitors).forEach((e) => {
      e[1].maxBonus = A.sumMonitorModifiers(this.items, e[0], "max"), e[1].resistanceBonus = A.sumMonitorModifiers(this.items, e[0], "resistance");
    }), this.system.attributes && Object.entries(this.system.attributes).forEach((e) => e[1].total = this.getAttributeValue(e[0])), this.system.state = this.computeState();
  }
  getAttributes() {
    return [];
  }
  getPhysicalAgility() {
  }
  getCorrespondingAttribute(e) {
    if (this.getAttributes().includes(e))
      return e;
  }
  prepareMatrixMonitor() {
    const e = this.getMatrixDetails();
    e.hasMatrix && (this.system.monitors.matrix.max = this._getMonitorMax(e.logic), this.system.monitors.matrix.canMark = !0);
  }
  async onUpdateActor(e, t) {
    var a, s;
    ((a = e.system) == null ? void 0 : a.monitors) != null && ((s = e.system) == null ? void 0 : s.state) == null && this.update({ "system.state": this.computeState() });
  }
  computeState() {
    return {
      matrix: this.computeMatrixState(),
      physical: this.computePhysicalState()
    };
  }
  computePhysicalState() {
    return { value: 0, max: 0 };
  }
  computeMatrixState() {
    const e = this.getMatrixDetails();
    return e.hasMatrix ? {
      value: e.monitor.max - e.monitor.value,
      max: e.monitor.max
    } : { value: 0, max: 0 };
  }
  getMatrixDetails() {
    return {
      hasMatrix: !1,
      logic: void 0,
      firewall: void 0,
      monitor: qe,
      overflow: void 0
    };
  }
  getMatrixLogic() {
    return this.getMatrixDetails().logic;
  }
  getMatrixFirewall() {
    return this.getMatrixDetails().firewall;
  }
  getMatrixMonitor() {
    return this.getMatrixDetails().monitor;
  }
  getMatrixMarks() {
    var e;
    return ((e = this.getMatrixDetails().monitor) == null ? void 0 : e.marks) ?? [];
  }
  getMatrixOverflow() {
    return this.getMatrixDetails().overflow;
  }
  hasMatrixMonitor() {
    return this.getMatrixDetails().hasMatrix;
  }
  isMatrixConnected(e = void 0) {
    return !1;
  }
  isMatrixSkill(e) {
    return Wt.includes(e == null ? void 0 : e.system.code);
  }
  async nextConnectionMode(e) {
  }
  async defSetMatrixMonitor(e, t) {
    this.getMatrixDetails().hasMatrix ? await this.update({ [e]: t }) : game.system.anarchy.hacks.i18n.format(o.actor.monitors.noMatrixMonitor, { actor: this.name });
  }
  async setCheckbarValue(e, t) {
    if (e.startsWith("system.monitors.matrix.")) {
      const a = this.getMatrixDetails();
      return a.setMatrixMonitor ? await a.setMatrixMonitor(e, t) : await this.defSetMatrixMonitor(e, t);
    }
    return await this.update({ [e]: t });
  }
  _getMonitorMax(e) {
    const t = this.getAttributeValue(e);
    return t == 0 ? 0 : ft + f.divup(t, 2);
  }
  getAttributeActions() {
    return Y.getActorActions(this);
  }
  getUsableAttributes(e = void 0) {
    const t = (e ? [e] : this.items).map((s) => s.getUsableAttributes()).reduce((s, i) => s.concat(i), []), a = f.distinct(this.getAttributes().concat(t));
    return a.sort(f.ascendingBySortedArray(S.sortedAttributeKeys)), a;
  }
  getAttributeValue(e, t = void 0) {
    let a = 0;
    if (e = this.getCorrespondingAttribute(e), e) {
      if (this.getAttributes().includes(e))
        a = this.system.attributes[e].value;
      else if (t) {
        if (this.isEmerged() && e == c.attributes.firewall)
          return this.getAttributeValue(c.attributes.logic);
        a = (t == null ? void 0 : t.getAttributeValue(e)) ?? 0;
      } else {
        const s = this.items.filter((i) => i.isActive() && i.getAttributes().includes(e));
        if (s.length > 0) {
          const i = s.map((n) => n.getAttributeValue(e) ?? 0);
          a = Math.max(...i);
        }
      }
      a += A.sumModifiers(this.items, "attribute", e);
    }
    return a;
  }
  getDamageMonitor(e) {
    switch (e) {
      case c.monitors.matrix:
      case c.monitors.marks:
        return e;
    }
  }
  async applyArmorDamage(e, t = 0) {
    switch (e) {
      case c.monitors.physical:
      case c.monitors.stun:
        await v.damageToArmor(this, t);
    }
  }
  async rollAttribute(e) {
    await R.rollAttribute(this, e);
  }
  async rollAttributeAction(e) {
    const t = Y.getActorAction(this, e);
    await R.rollAttributeAction(this, t);
  }
  async rollSkill(e, t) {
    await R.rollSkill(this, e, t);
  }
  async rollWeapon(e) {
    var i, n, l;
    K.checkWeaponDefense(e, this);
    const t = (i = e.validateTargets(this)) == null ? void 0 : i.map((m) => m.id), a = {
      attackerTokenId: (l = (n = game.scenes.current) == null ? void 0 : n.tokens.find((m) => {
        var y;
        return ((y = m.actor) == null ? void 0 : y.id) == this.id;
      })) == null ? void 0 : l.id,
      targetedTokenIds: t
    }, s = this.items.find((m) => e.isWeaponSkill(m));
    await R.rollWeapon(this, s, e, a);
  }
  async rollDefense(e) {
    const t = e.attack.defense, a = Y.getActorDefense(this, t);
    await R.rollDefense(this, a, e);
  }
  async rollPilotDefense(e) {
  }
  async rollDrain(e) {
  }
  async rollConvergence(e) {
  }
  async switchMonitorCheck(e, t, a, s = void 0) {
    await d.switchMonitorCheck(this, e, t, a, s);
  }
  async addCounter(e, t, a = void 0) {
    await d.addCounter(this, e, t, a);
  }
  async setCounter(e, t, a = void 0) {
    await d.setCounter(this, e, t, a);
  }
  canPilotVehicle() {
    return !1;
  }
  canSetMarks() {
    return !1;
  }
  getCyberdeck() {
  }
  canReceiveMarks() {
    var e, t;
    return (t = (e = this.system.monitors) == null ? void 0 : e.matrix) == null ? void 0 : t.canMark;
  }
  canApplyDamage(e) {
    switch (e) {
      case c.monitors.matrix:
      case c.monitors.marks:
        return this.hasMatrixMonitor();
      case c.monitors.physical:
      case c.monitors.stun:
        return this.getDamageMonitor(e) != null;
    }
    return !1;
  }
  canReceiveDamage(e) {
    return this.canApplyDamage(e);
  }
  isEmerged() {
    return !1;
  }
  async addActorMark(e) {
    await d.addActorMark(this, e);
  }
  getActorMarks(e) {
    var t;
    return (t = d.getActorMarks(this, e)) == null ? void 0 : t.marks;
  }
  async onEnterCombat() {
    const e = A.sumModifiers(this.items, "other", "sceneAnarchy");
    e > 0 && await d.setCounter(this, c.monitors.sceneAnarchy, e);
  }
  async onLeaveCombat() {
    await d.setCounter(this, c.monitors.sceneAnarchy, 0);
  }
  getCelebrityValue() {
    return 0;
  }
  getCredibilityValue() {
    return 0;
  }
  getRumorValue() {
    return 0;
  }
  getAnarchy() {
    const e = this.hasGMAnarchy() ? game.system.anarchy.gmAnarchy.getAnarchy() : {
      isGM: !1,
      value: 0,
      max: 0
    };
    return e.scene = this.getAnarchyScene(), e;
  }
  getAnarchyScene() {
    return 0;
  }
  getAnarchyValue() {
    return this.getAnarchy().value ?? 0;
  }
  async spendCredibility(e) {
    await d.addCounter(this, c.counters.social.credibility, -e);
  }
  async spendRumor(e) {
    await d.addCounter(this, c.counters.social.rumor, -e);
  }
  async spendAnarchy(e) {
    e && !this.hasPlayerOwner && await game.system.anarchy.gmAnarchy.npcConsumesAnarchy(this, e);
  }
  getRemainingEdge() {
    var e, t;
    return ((t = (e = this.system.counters) == null ? void 0 : e.edge) == null ? void 0 : t.value) ?? 0;
  }
  canUseEdge() {
    return this.getAttributes().includes(c.attributes.edge);
  }
  async spendEdge(e) {
    if (e != 0) {
      if (!this.canUseEdge()) {
        const t = game.system.anarchy.hacks.i18n.localize(o.common.errors.noEdgeForActor, {
          actor: this.name,
          actorType: game.system.anarchy.hacks.i18n.localize(o.actorType[this.type])
        });
        throw ui.notifications.warn(t), o.common.errors.noEdgeForActor + t;
      }
      await d.addCounter(this, c.counters.edge, -e);
    }
  }
  getSkillValue(e, t = void 0) {
    const a = this.items.get(e), s = this.getAttributeValue(a.system.attribute);
    return a.system.value + s + (t && a.system.specialization ? 2 : 0);
  }
  getWounds() {
    return 0;
  }
  async removeOtherMetatype(e) {
    const t = this.items.filter((a) => a.isMetatype() && a.id != (e == null ? void 0 : e.id)).map((a) => a.id);
    this.deleteEmbeddedDocuments("Item", t);
  }
  /**
   * @param ownerActor the Actor who becomes the owner of this Actor
   */
  async attachToOwnerActor(e = void 0, t = "attach") {
    if ((e == null ? void 0 : e.id) == this.id)
      return;
    e != null && e.hasPlayerOwner;
    let a = this;
    if (t == "copy") {
      const s = this.clone();
      a = (await Actor.createDocuments([s]))[0];
    }
    await a.update({ "system.ownerId": (e == null ? void 0 : e.id) ?? "" }), e == null || e.render(), this.render();
  }
  getOwnerActor() {
    if (this.system.ownerId)
      return game.actors.get(this.system.ownerId);
  }
  getOwnedActors() {
    return game.actors.filter((e) => e.system.ownerId == this.id);
  }
  hasFavorite(e, t) {
    const a = H._prepareFavorite(e, t);
    return !!this.system.favorites.find((s) => H._isSameFavorite(a, s));
  }
  static _prepareFavorite(e, t) {
    return { type: e, id: t };
  }
  static _isSameFavorite(e, t) {
    return e.id == t.id && e.type == t.type;
  }
  async switchFavorite(e, t, a) {
    const s = H._prepareFavorite(t, a), i = this.system.favorites.filter((n) => !H._isSameFavorite(s, n));
    e && i.push(s), this.update({ "system.favorites": i });
  }
  async cleanupFavorites() {
    const e = this.computeShortcuts().filter((t) => !t.callback);
    e.length < this.system.favorites && this.update({ "system.favorites": e });
  }
  getShortcuts() {
    return this.computeShortcuts().filter((e) => e.label && e.callback);
  }
  computeShortcuts() {
    return this.system.favorites ? this.system.favorites.map((e) => this.getShortcut(e.type, e.id)) : [];
  }
  getShortcut(e, t) {
    var s;
    const a = H._prepareFavorite(e, t);
    if (e == "attributeAction") {
      const i = Y.prepareShortcut(this, t);
      if (i)
        return foundry.utils.mergeObject(i, a);
    } else if (Object.values(c.itemType).includes(e)) {
      const i = (s = this.items.get(t)) == null ? void 0 : s.prepareShortcut();
      if (i)
        return foundry.utils.mergeObject(i, a);
    }
    return a;
  }
}
class $e {
  static async confirmDeleteItem(e, t = () => {
  }) {
    new Dialog({
      title: game.i18n.localize(o.common.confirmation.del),
      content: game.i18n.format(o.common.confirmation.delItem, {
        name: e.name,
        type: game.i18n.localize(o.itemType.singular[e.type])
      }),
      buttons: {
        delete: {
          icon: u.fontAwesome("fas fa-check"),
          label: game.i18n.localize(o.common.del),
          callback: t
        },
        cancel: {
          icon: u.fontAwesome("fas fa-times"),
          label: game.i18n.localize(o.common.cancel)
        }
      },
      default: "cancel"
    }).render(!0);
  }
  static async confirmDetachOwnerActor(e, t, a = () => {
  }) {
    new Dialog({
      title: game.i18n.localize(o.common.confirmation.del),
      content: game.i18n.format(o.common.confirmation.delOwner, {
        name: e.name
      }),
      buttons: {
        delete: {
          icon: u.fontAwesome("fas fa-check"),
          label: game.i18n.localize(o.common.del),
          callback: a
        },
        cancel: {
          icon: u.fontAwesome("fas fa-times"),
          label: game.i18n.localize(o.common.cancel)
        }
      },
      default: "cancel"
    }).render(!0);
  }
  static async confirmAttachOrCopy(e, t, a = () => {
  }, s = () => {
  }) {
    new Dialog({
      title: game.i18n.localize(o.common.confirmation.attach),
      content: game.i18n.format(o.common.confirmation.attachOrCopy, {
        ownerName: e.name,
        ownerType: game.i18n.localize(o.actorType[e.type]),
        ownedName: t.name,
        ownedType: game.i18n.localize(o.actorType[t.type])
      }),
      buttons: {
        attach: {
          icon: u.fontAwesome("fas fa-user-tag"),
          label: game.i18n.localize(o.common.attach),
          callback: a
        },
        attachCopy: {
          icon: u.fontAwesome("fas fa-user-plus"),
          label: game.i18n.localize(o.common.attachCopy),
          callback: s
        },
        cancel: {
          icon: u.fontAwesome("fas fa-times"),
          label: game.i18n.localize(o.common.cancel)
        }
      },
      default: "cancel"
    }).render(!0);
  }
}
class Xe extends Dialog {
  static async selectActor(e, t, a = async (i) => {
  }, s = async () => {
  }) {
    let i = { classes: ["select-actor"], width: 300, height: 300, "z-index": 99999 }, n = {
      title: e,
      content: await renderTemplate(`${h}/dialog/select-actor.hbs`, {
        actors: t
      }),
      buttons: {
        cancel: {
          icon: u.fontAwesome("fas fa-times"),
          label: game.i18n.localize(o.common.cancel),
          callback: async () => {
            await s();
          }
        }
      },
      default: "cancel"
    };
    new Xe(n, i, t, a).render(!0);
  }
  constructor(e, t, a, s) {
    super(e, t), this.actors = a, this.onActorSelected = s;
  }
  /* -------------------------------------------- */
  activateListeners(e) {
    super.activateListeners(e), e.find(".click-select-actor").click((t) => this.onSelectActor(t));
  }
  async onSelectActor(e) {
    const t = $(e.currentTarget).attr("data-actor-id"), a = this.actors.find((s) => s.id == t);
    a && (this.onActorSelected(a), this.close());
  }
}
class Ae extends ActorSheet {
  get template() {
    return `${h}/actor/${this.actor.type}.hbs`;
  }
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      isGM: game.user.isGM,
      dragDrop: [{ dragSelector: ".item ", dropSelector: null }],
      classes: [game.system.anarchy.styles.selectCssClass(), "sheet", "actor"]
    });
  }
  getData(e) {
    let t = foundry.utils.mergeObject(
      super.getData(e),
      {
        items: {},
        anarchy: this.actor.getAnarchy(),
        ownerActor: this.actor.getOwnerActor(),
        ownedActors: this.actor.getOwnedActors(),
        options: {
          limited: this.document.limited,
          owner: this.document.isOwner,
          cssClass: this.isEditable ? "editable" : "locked"
        },
        ENUMS: foundry.utils.mergeObject({ attributeAction: this.actor.getAttributeActions() }, S.getEnums()),
        ANARCHY: o
      }
    );
    return t.options.classes.push(`actor-${this.actor.type}`), t.options.classes = f.distinct(t.options.classes), t.system = this.actor.system, f.classifyInto(t.items, this.actor.items), t;
  }
  activateListeners(e) {
    super.activateListeners(e), e.find(".click-item-add").click(async (t) => {
      t.stopPropagation(), await this.createNewItem(this.getEventItemType(t));
    }), e.find(".click-item-edit").click(async (t) => {
      var a;
      t.stopPropagation(), (a = this.getEventItem(t)) == null || a.sheet.render(!0);
    }), e.find(".click-item-activate").click(async (t) => {
      t.stopPropagation();
      const a = this.getEventItem(t), s = a.system.inactive;
      await a.update({ "system.inactive": !s });
    }), e.find("a.click-matrix-connectionMode").click(async (t) => {
      t.stopPropagation(), await this.actor.nextConnectionMode(this.getEventItem(t));
    }), e.find(".click-item-delete").click(async (t) => {
      t.stopPropagation();
      const a = this.getEventItem(t);
      $e.confirmDeleteItem(a, async () => {
        await this.actor.deleteEmbeddedDocuments("Item", [a.id]);
      });
    }), e.find(".click-favorite").click(async (t) => {
      t.stopPropagation(), this.onClickFavorite({
        skillId: $(t.currentTarget).attr("data-skill-id"),
        specialization: $(t.currentTarget).attr("data-specialization"),
        weaponId: $(t.currentTarget).attr("data-weapon-id"),
        attributeAction: $(t.currentTarget).attr("data-attributeAction"),
        isFavorite: $(t.currentTarget).attr("data-isFavorite")
      });
    }), e.find(".click-owner-actor-unlink").click(async (t) => {
      t.stopPropagation(), this.detachFromOwner(this.actor.getOwnerActor(), this.actor);
    }), e.find(".click-owned-actor-view").click(async (t) => {
      var a;
      t.stopPropagation(), (a = this.getEventOwnedActor(t)) == null || a.sheet.render(!0);
    }), e.find(".click-owned-actor-unlink").click(async (t) => {
      t.stopPropagation(), this.detachFromOwner(this.actor, this.getEventOwnedActor(t));
    }), e.find("a.click-checkbar-element").click(async (t) => {
      t.stopPropagation();
      const a = this.getEventItem(t), s = a ?? this.actor, i = this.getEventMonitorCode(t), n = i == "marks" ? $(t.currentTarget).closest(".anarchy-marks").attr("data-actor-id") : void 0;
      await s.switchMonitorCheck(
        i,
        this.getEventIndex(t),
        this.isEventChecked(t),
        n,
        a
      );
    }), e.find("a.click-add-mark-actor").click(async (t) => {
      t.stopPropagation(), this.onClickAddMark();
    }), e.find(".click-skill-roll").click(async (t) => {
      t.stopPropagation(), this.actor.rollSkill(
        this.getEventItem(t),
        this.getEventSkillSpecialization(t)
      );
    }), e.find(".click-roll-attribute").click(async (t) => {
      t.stopPropagation(), (this.getEventItem(t) ?? this.actor).rollAttribute(
        $(t.currentTarget).closest(".anarchy-attribute").attr("data-attribute")
      );
    }), e.find(".click-roll-attribute-action").click(async (t) => {
      t.stopPropagation(), this.actor.rollAttributeAction(this.getEventActionCode(t));
    }), e.find(".click-weapon-roll").click(async (t) => {
      t.stopPropagation(), this.actor.rollWeapon(this.getEventItem(t));
    });
  }
  getEventItemType(e) {
    return $(e.currentTarget).closest(".define-item-type").attr("data-item-type");
  }
  getEventItem(e) {
    const t = $(e.currentTarget).closest(".item").attr("data-item-id") ?? $(e.currentTarget).closest(".anarchy-metatype").attr("data-item-id");
    return this.actor.items.get(t);
  }
  isEventChecked(e) {
    return $(e.currentTarget).attr("data-checked") == "true";
  }
  getEventSkillSpecialization(e) {
    return $(e.currentTarget).closest(".click-skill-roll").attr("data-item-specialization");
  }
  getEventActionCode(e) {
    return $(e.currentTarget).attr("data-action-code");
  }
  getEventMonitorCode(e) {
    return $(e.currentTarget).closest(".click-checkbar-element").attr("data-monitor-code");
  }
  getEventIndex(e) {
    return Number.parseInt($(e.currentTarget).attr("data-index"));
  }
  getEventOwnedActor(e) {
    const t = $(e.currentTarget).closest(".define-owned-actor").attr("data-actor-id");
    return game.actors.get(t);
  }
  async createNewItem(e) {
    const t = game.i18n.format(o.common.newName, { type: game.i18n.localize(o.itemType.singular[e]) });
    await this.actor.createEmbeddedDocuments("Item", [{ name: t, type: e }], { renderSheet: !0 });
  }
  async onClickFavorite(e) {
    const t = e.isFavorite != "true";
    e.skillId ? await this.actor.switchFavorite(t, c.itemType.skill, e.skillId, e.specialization) : e.weaponId ? await this.actor.switchFavorite(t, c.itemType.weapon, e.weaponId) : e.attributeAction ? await this.actor.switchFavorite(t, "attributeAction", e.attributeAction) : console.warn("Favorite not supported", e);
  }
  detachFromOwner(e, t) {
    $e.confirmDetachOwnerActor(e, t, async () => {
      await t.attachToOwnerActor(), this.render(!0);
    });
  }
  async _onDropActor(e, t) {
    const a = fromUuidSync(t.uuid);
    (a == null ? void 0 : a.id) != this.actor.id && $e.confirmAttachOrCopy(
      this.actor,
      a,
      async () => await a.attachToOwnerActor(this.actor),
      async () => await a.attachToOwnerActor(this.actor, "copy")
    ), super._onDropActor(e, t);
  }
  async onClickAddMark() {
    if (this.actor.canReceiveMarks()) {
      const e = game.i18n.format(o.common.selection.actorSettingMarks, { name: this.actor.name });
      await Xe.selectActor(
        e,
        game.actors.filter((t) => !this.actor.getActorMarks(t.id) && t.canSetMarks()),
        (t) => this.actor.addActorMark(t.id)
      );
    }
  }
}
class Ye extends Ae {
  get template() {
    return `${h}/actor/character.hbs`;
  }
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 720,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
    });
  }
  getData(e) {
    this.viewMode == null && (this.viewMode = !0);
    const t = this.actor.computeEssence();
    return foundry.utils.mergeObject(
      super.getData(e),
      {
        essence: {
          value: t,
          adjust: this.actor.computeMalusEssence(t)
        },
        options: {
          viewMode: this.viewMode
        }
      }
    );
  }
  toggleViewMode() {
    this.viewMode = !this.viewMode, this.render();
  }
  activateListeners(e) {
    super.activateListeners(e), e.find(".click-toggle-view-mode").click(async (t) => this.toggleViewMode()), e.find(".click-word-add").click(async (t) => {
      t.stopPropagation(), this.createNewWord(this.getEventWordType(t));
    }), e.find(".click-word-say").click(async (t) => {
      t.stopPropagation(), this.actor.sayWord(
        this.getEventWordType(t),
        this.getEventWordId(t)
      );
    }), e.find(".change-word-value").click(async (t) => {
      t.stopPropagation();
    }), e.find(".change-word-value").change(async (t) => {
      t.stopPropagation();
      const a = t.currentTarget.value;
      await this.actor.updateWord(
        this.getEventWordType(t),
        this.getEventWordId(t),
        a
      );
    }), e.find(".click-word-delete").click(async (t) => {
      t.stopPropagation(), this.actor.deleteWord(
        this.getEventWordType(t),
        this.getEventWordId(t)
      );
    }), e.find(".click-celebrity-roll").click(async (t) => {
      t.stopPropagation(), this.actor.rollCelebrity();
    });
  }
  createNewWord(e) {
    const t = game.i18n.localize(o.common.newEntry);
    this.actor.createWord(e, t);
  }
  getEventWordType(e) {
    return $(e.currentTarget).closest(".define-wordType").attr("data-word-type");
  }
  getEventWordId(e) {
    return $(e.currentTarget).closest(".define-wordType").attr("data-word-id");
  }
}
class je extends Ye {
  get template() {
    return `${h}/actor/character-enhanced.hbs`;
  }
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 800,
      height: 700
    });
  }
  activateListeners(e) {
    super.activateListeners(e);
    const t = this.actor._id;
    e.find(".click-section").on("click", function() {
      const a = $(this).data("class");
      e.find(`.${a}`).toggleClass("closed"), localStorage.setItem(`${t}-${a}`, e.find(`.${a}`).hasClass("closed") ? "closed" : null);
    });
  }
  static ifTabClosed(e, t, a) {
    return localStorage.getItem(`${e}-section-${t}`) === "closed" ? a.fn(this) : a.inverse(this);
  }
  static actorTabClosed(e, t, a) {
    return localStorage.getItem(`${e}-section-${t}`) === "closed" ? "closed" : "";
  }
}
class Kt {
  static monitor(e) {
    return game.i18n.localize(S.getFromList(S.getMonitors(), e) ?? "");
  }
  static letter(e) {
    return game.i18n.localize(S.getFromList(S.getMonitorLetters(), e) ?? "");
  }
}
class qt {
  static toLowerCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "");
  }
  static toUpperCaseNoAccent(e) {
    return e == null ? void 0 : e.normalize("NFD").toUpperCase().replace(/[\u0300-\u036f]/g, "");
  }
}
class q extends Item {
  static init() {
    Hooks.on("createItem", (e, t, a) => e.onCreateItem(t, a));
  }
  async onCreateItem(e, t) {
  }
  constructor(e, t = {}) {
    var a;
    if (!((a = t.anarchy) != null && a.ready)) {
      foundry.utils.mergeObject(t, { anarchy: { ready: !0 } });
      const s = game.system.anarchy.itemClasses[e.type];
      if (s)
        return e.img || (e.img = s.defaultIcon), new s(e, t);
    }
    t.anarchy = void 0, super(e, t);
  }
  static get defaultIcon() {
  }
  getAttributes() {
    return [];
  }
  getUsableAttributes() {
    return this.isActive() ? this.getAttributes() : [];
  }
  getAttributeValue(e) {
    var t;
    return this.system.attributes ? ((t = this.system.attributes[e]) == null ? void 0 : t.value) ?? 0 : 0;
  }
  hasOwnAnarchy() {
    return !1;
  }
  hasGMAnarchy() {
    return !1;
  }
  hasMatrixMonitor() {
    return !1;
  }
  getMatrixMonitor() {
    return qe;
  }
  async nextConnectionMode() {
  }
  async setCheckbarValue(e, t) {
    return await this.update({ [e]: t });
  }
  isMetatype() {
    return this.type == c.itemType.metatype;
  }
  isCyberdeck() {
    return this.type == c.itemType.cyberdeck;
  }
  isWeapon() {
    return this.type == c.itemType.weapon;
  }
  isActive() {
    return !this.system.inactive;
  }
  canReceiveMarks() {
    var e, t;
    return (t = (e = this.system.monitors) == null ? void 0 : e.matrix) == null ? void 0 : t.canMark;
  }
  async rollAttribute(e) {
    this.parent && await R.itemAttributeRoll(this, e);
  }
  async switchMonitorCheck(e, t, a, s = void 0) {
    await d.switchMonitorCheck(this.parent, e, t, a, s, this);
  }
  async setCounter(e, t) {
    await d.setCounter(this, e, t);
  }
  async addActorMark(e) {
    await d.addActorMark(this, e);
  }
  async createModifier(e = {}) {
    e = foundry.utils.mergeObject(e, {
      group: "roll",
      effect: "pool",
      category: "skill",
      subCategory: "",
      value: 0,
      condition: ""
    }), this._mutateModifiers((t) => t.concat([e]));
  }
  async deleteModifier(e) {
    await this._mutateModifiers((t) => t.filter((a) => a.id != e));
  }
  async changeModifierSelection(e, t, a) {
    let s = this._computeModifierImpact(t, a);
    this._applyModifierUpdate(e, s);
  }
  _computeModifierImpact(e, t) {
    switch (e) {
      case "group":
        return (a) => {
          a.group != t && (a.group = t, a.effect = "", a.category = "", a.subCategory = "");
        };
      case "effect":
        return (a) => a.effect = t;
      case "category":
        return (a) => {
          a.category != t && (a.category = t, a.subCategory = "");
        };
      case "subCategory":
        return (a) => a.subCategory = t;
    }
    return (a) => {
    };
  }
  async changeModifierValue(e, t) {
    this._applyModifierUpdate(e, (a) => a.value = Number(t));
  }
  async changeModifierCondition(e, t) {
    this._applyModifierUpdate(e, (a) => a.condition = t);
  }
  async _applyModifierUpdate(e, t = (a) => {
  }) {
    await this._mutateModifiers((a) => a.map((s) => (s.id == e && t(s), s)));
  }
  async _mutateModifiers(e = (t) => t) {
    const t = e(this.system.modifiers);
    f.reindexIds(t), await this.update({ "system.modifiers": t });
  }
  prepateShortcut() {
  }
}
class Qe extends q {
  static get defaultIcon() {
    return `${G}/skills/skills.svg`;
  }
  static prepareSkill(e) {
    const t = game.system.anarchy.skills.get(e);
    if (!t)
      return {
        img: this.defaultIcon,
        system: {
          code: e,
          attribute: "",
          hasDrain: !1,
          hasConvergence: !1
        }
      };
    const a = {
      img: t.icon,
      system: {
        code: t.code,
        attribute: t.attribute,
        hasDrain: !!t.hasDrain,
        hasConvergence: !!t.hasConvergence
      }
    };
    return t.code != "knowledge" && (a.name = game.i18n.localize(t.labelkey)), a;
  }
  isKnowledgeSkill() {
    return this.system.code == "knowledge";
  }
  isGeneralSkill() {
    return this.system.code != "knowledge";
  }
  prepareShortcut() {
    return {
      img: this.img,
      label: this.system.specialization ? `${this.name}: ${this.system.specialization}` : this.name,
      callback: (e) => e.actor.rollSkill(this, this.system.specialization)
    };
  }
}
const ct = {
  none: { targets: 1, adjust: [0] },
  shotgun: { targets: 2, adjust: [0, -2] },
  circle: { targets: void 0 },
  cone: { targets: void 0 },
  rect: { targets: void 0 },
  ray: { targets: void 0 }
}, Xt = {
  code: "weapon-range",
  options: {
    flags: { editable: !0 },
    order: 20,
    category: C.pool,
    labelkey: o.common.roll.modifiers.weaponRange,
    hbsTemplateRoll: `${h}/roll/parts/select-option.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (r) => !0,
  condition: (r) => r.weapon,
  factory: (r) => {
    const e = r.weapon.getRanges(), t = e.map((a) => a.value);
    return {
      value: e[0].value,
      min: Math.min(...t),
      max: Math.max(...t),
      choices: e,
      selected: game.i18n.localize(e[0].labelkey)
    };
  }
}, Qt = {
  code: "weapon-area",
  options: {
    used: !0,
    order: 20,
    category: C.pool,
    labelkey: o.common.roll.modifiers.weaponArea,
    hbsTemplateRoll: `${h}/roll/parts/input-numeric.hbs`,
    hbsTemplateChat: void 0
    //``
  },
  isUsed: (r) => r.used,
  condition: (r) => r.weapon && r.weapon.getArea() != c.area.none,
  factory: (r) => {
    var a;
    const e = ((a = r.targeting.targetedTokenIds) == null ? void 0 : a.length) ?? 1, t = r.weapon.getAreaModifier(e);
    return {
      value: t,
      min: Math.min(0, t),
      max: Math.max(0, t),
      used: e > 1
    };
  }
};
class Q extends q {
  static init() {
    Hooks.once(b.REGISTER_ROLL_PARAMETERS, (e) => {
      e(Qt), e(Xt);
    });
  }
  static get defaultIcon() {
    return `${G}/weapons/mac-10.svg`;
  }
  isWeaponSkill(e) {
    return e.type == "skill" && e.system.code === this.system.skill;
  }
  get hasDrain() {
    return this.getWeaponSkill().system.hasDrain;
  }
  get hasConvergence() {
    return this.getWeaponSkill().system.hasConvergence;
  }
  getWeaponSkill() {
    var a;
    const e = (a = this.actor) == null ? void 0 : a.items.find((s) => this.isWeaponSkill(s));
    if (e)
      return e;
    const t = game.items.find((s) => this.isWeaponSkill(s));
    return t || Qe.prepareSkill(this.system.skill);
  }
  getDefense() {
    return Y.fixedDefenseCode(this.system.defense);
  }
  getDamage() {
    if (!this.parent)
      return;
    const e = this.system.damageAttribute ? this.parent.getAttributeValue(this.system.damageAttribute) ?? 0 : 0;
    return {
      value: Q.damageValue(
        this.system.monitor,
        this.system.damage,
        this.system.damageAttribute,
        e
      ),
      monitor: this.system.monitor,
      noArmor: this.system.noArmor,
      armorMode: Q.armorMode(this.system.monitor, this.system.noArmor)
    };
  }
  static damageValue(e, t, a, s) {
    if (e == c.monitors.marks)
      return 1;
    if (t = Number(t), a)
      if (s !== void 0)
        t = t + Math.ceil(Number(s) / 2);
      else
        return console.warn("Weapon not attached to an actor"), game.i18n.localize(o.item.weapon.weaponWithoutActor);
    return t;
  }
  getDamageCode() {
    return Q.damageCode(
      this.system.monitor,
      this.system.damage,
      this.system.damageAttribute
    );
  }
  static damageCode(e, t, a) {
    if (e == c.monitors.marks)
      return "1";
    let s = "";
    return a && o.attributes[a] && (s += game.i18n.localize(o.attributes[a]).substring(0, 3).toUpperCase() + "/2 + "), s += String(t), s;
  }
  static armorMode(e, t) {
    return d.useArmor(e) ? t ? "noArmor" : "withArmor" : "";
  }
  getRanges() {
    let e = [
      this._getRange("short")
    ];
    return this.system.range.max != "short" && e.push(this._getRange("medium")), this.system.range.max == "long" && e.push(this._getRange("long")), e;
  }
  _getRange(e) {
    return { value: this.system.range[e], labelkey: S.getFromList(S.getEnums().ranges, e) };
  }
  prepareShortcut() {
    return {
      img: this.img,
      label: this.name,
      callback: (e) => e.actor.rollWeapon(this)
    };
  }
  validateTargets(e) {
    var n;
    const t = (n = this.getDamage()) == null ? void 0 : n.monitor, a = I.getTargetTokens(game.user), s = a.filter((l) => {
      var m;
      return (m = l.actor) == null ? void 0 : m.canReceiveDamage(t);
    }), i = a.filter((l) => {
      var m;
      return !((m = l.actor) != null && m.canReceiveDamage(t));
    }).map((l) => l.name);
    return i.length > 0 && ui.notifications.info(game.i18n.format(o.common.errors.ignoredTargets, {
      targets: i.reduce(f.joiner(", "))
    })), s.length == 0 ? ui.notifications.info(game.i18n.format(o.common.errors.noTargetSelected, {
      weapon: this.name ?? game.i18n.localize(o.itemType.singular.weapon)
    })) : this.checkWeaponTargetsCount(s), s;
  }
  checkWeaponTargetsCount(e) {
    const t = this.system.area, a = ct[t] ?? {};
    K.checkTargetsCount(a.targets ?? 0, e, t);
  }
  getAreaModifier(e) {
    const t = this.getArea(), a = ct[t] ?? {};
    return a.targets && a.adjust && e <= a.targets ? a.adjust[e - 1] ?? 0 : 0;
  }
  getArea() {
    return this.system.area == "" ? c.area.none : this.system.area ?? c.area.none;
  }
}
const Zt = [
  // -- monitors
  "systems/anarchy/templates/monitors/anarchy-actor.hbs",
  "systems/anarchy/templates/monitors/armor.hbs",
  "systems/anarchy/templates/monitors/edge.hbs",
  "systems/anarchy/templates/actor/parts/matrix-cyberdeck.hbs",
  "systems/anarchy/templates/monitors/matrix.hbs",
  "systems/anarchy/templates/monitors/physical.hbs",
  "systems/anarchy/templates/monitors/social-credibility.hbs",
  "systems/anarchy/templates/monitors/social-rumor.hbs",
  "systems/anarchy/templates/monitors/structure.hbs",
  "systems/anarchy/templates/monitors/stun.hbs",
  "systems/anarchy/templates/actor/character/name.hbs",
  // character
  "systems/anarchy/templates/actor/character/capacity.hbs",
  "systems/anarchy/templates/actor/character/description.hbs",
  "systems/anarchy/templates/actor/character/essence.hbs",
  "systems/anarchy/templates/actor/character/genre.hbs",
  "systems/anarchy/templates/actor/character/karma.hbs",
  "systems/anarchy/templates/actor/character/metatype.hbs",
  "systems/anarchy/templates/actor/character/social-celebrity.hbs",
  // character parts
  "systems/anarchy/templates/actor/character-limited.hbs",
  "systems/anarchy/templates/actor/parts/words.hbs",
  "systems/anarchy/templates/actor/parts/contact.hbs",
  "systems/anarchy/templates/actor/parts/contacts.hbs",
  "systems/anarchy/templates/actor/parts/gear.hbs",
  "systems/anarchy/templates/actor/parts/gears.hbs",
  // character enhanced
  "systems/anarchy/templates/actor/character-enhanced/metatype.hbs",
  "systems/anarchy/templates/actor/character-enhanced/attributes.hbs",
  "systems/anarchy/templates/actor/character-enhanced/capacity.hbs",
  "systems/anarchy/templates/actor/character-enhanced/attribute.hbs",
  "systems/anarchy/templates/actor/character-enhanced/karma.hbs",
  "systems/anarchy/templates/actor/character-enhanced/hexabox.hbs",
  "systems/anarchy/templates/actor/character-enhanced/words.hbs",
  "systems/anarchy/templates/actor/character-enhanced/skills.hbs",
  "systems/anarchy/templates/actor/character-enhanced/skill.hbs",
  "systems/anarchy/templates/actor/character-enhanced/shadowamp.hbs",
  "systems/anarchy/templates/actor/character-enhanced/shadowamps.hbs",
  "systems/anarchy/templates/actor/character-enhanced/quality.hbs",
  "systems/anarchy/templates/actor/character-enhanced/qualities.hbs",
  "systems/anarchy/templates/actor/character-enhanced/monitors.hbs",
  "systems/anarchy/templates/actor/character-enhanced/armor.hbs",
  "systems/anarchy/templates/actor/character-enhanced/stun.hbs",
  "systems/anarchy/templates/actor/character-enhanced/physical.hbs",
  "systems/anarchy/templates/actor/character-enhanced/checkbar.hbs",
  "systems/anarchy/templates/actor/character-enhanced/check-element.hbs",
  "systems/anarchy/templates/actor/character-enhanced/anarchy-actor.hbs",
  "systems/anarchy/templates/actor/character-enhanced/social-credibility.hbs",
  "systems/anarchy/templates/actor/character-enhanced/social-rumor.hbs",
  "systems/anarchy/templates/actor/character-enhanced/edge.hbs",
  "systems/anarchy/templates/actor/character-enhanced/actions.hbs",
  "systems/anarchy/templates/actor/character-enhanced/attributebutton.hbs",
  "systems/anarchy/templates/actor/character-enhanced/attributebuttons.hbs",
  "systems/anarchy/templates/actor/character-enhanced/gears.hbs",
  "systems/anarchy/templates/actor/character-enhanced/gear.hbs",
  "systems/anarchy/templates/actor/character-enhanced/cyberdecks.hbs",
  "systems/anarchy/templates/actor/character-enhanced/cyberdeck.hbs",
  "systems/anarchy/templates/actor/character-enhanced/weapons.hbs",
  "systems/anarchy/templates/actor/character-enhanced/weapon.hbs",
  "systems/anarchy/templates/actor/character-enhanced/damage-code.hbs",
  "systems/anarchy/templates/actor/character-enhanced/damage-armor.hbs",
  "systems/anarchy/templates/actor/character-enhanced/story.hbs",
  "systems/anarchy/templates/actor/character-enhanced/equipments.hbs",
  "systems/anarchy/templates/actor/character-enhanced/contact.hbs",
  "systems/anarchy/templates/actor/character-enhanced/contacts.hbs",
  "systems/anarchy/templates/actor/character-enhanced/gmnotes.hbs",
  "systems/anarchy/templates/actor/character-enhanced/description.hbs",
  "systems/anarchy/templates/actor/character-enhanced/owned-actor.hbs",
  "systems/anarchy/templates/actor/character-enhanced/owned-actors.hbs",
  // actor common
  "systems/anarchy/templates/actor/parts/attributebutton.hbs",
  "systems/anarchy/templates/actor/parts/attributebuttons.hbs",
  "systems/anarchy/templates/actor/parts/attribute.hbs",
  "systems/anarchy/templates/actor/parts/attributes.hbs",
  "systems/anarchy/templates/actor/parts/description.hbs",
  "systems/anarchy/templates/actor/parts/gmnotes.hbs",
  "systems/anarchy/templates/actor/parts/owned-actor.hbs",
  "systems/anarchy/templates/actor/parts/owned-actors.hbs",
  "systems/anarchy/templates/monitors/marks-actor.hbs",
  "systems/anarchy/templates/monitors/marks.hbs",
  "systems/anarchy/templates/actor/parts/ownership.hbs",
  "systems/anarchy/templates/actor/parts/qualities.hbs",
  "systems/anarchy/templates/actor/parts/quality.hbs",
  "systems/anarchy/templates/actor/parts/shadowamp.hbs",
  "systems/anarchy/templates/actor/parts/shadowamps.hbs",
  "systems/anarchy/templates/actor/parts/item-attribute.hbs",
  "systems/anarchy/templates/actor/parts/cyberdeck.hbs",
  "systems/anarchy/templates/actor/parts/cyberdecks.hbs",
  "systems/anarchy/templates/actor/parts/skill.hbs",
  "systems/anarchy/templates/actor/parts/skills.hbs",
  "systems/anarchy/templates/actor/parts/weapon-range.hbs",
  "systems/anarchy/templates/actor/parts/weapon.hbs",
  "systems/anarchy/templates/actor/parts/weapons.hbs",
  //-- NPC
  "systems/anarchy/templates/actor/npc-parts/quality.hbs",
  "systems/anarchy/templates/actor/npc-parts/qualities.hbs",
  "systems/anarchy/templates/actor/npc-parts/shadowamp.hbs",
  "systems/anarchy/templates/actor/npc-parts/shadowamps.hbs",
  "systems/anarchy/templates/actor/npc-parts/skill.hbs",
  "systems/anarchy/templates/actor/npc-parts/skills.hbs",
  "systems/anarchy/templates/actor/npc-parts/weapon.hbs",
  "systems/anarchy/templates/actor/npc-parts/weapons.hbs",
  // Vehicles
  "systems/anarchy/templates/actor/vehicle/vehicle-attributes.hbs",
  "systems/anarchy/templates/actor/vehicle/vehicle-category.hbs",
  "systems/anarchy/templates/actor/vehicle/vehicle-skill.hbs",
  // item
  "systems/anarchy/templates/item/parts/inactive.hbs",
  "systems/anarchy/templates/item/parts/itemname.hbs",
  "systems/anarchy/templates/item/parts/modifier.hbs",
  "systems/anarchy/templates/item/parts/modifiers.hbs",
  "systems/anarchy/templates/item/parts/references.hbs",
  // common&technical partials
  "systems/anarchy/templates/monitors/anarchy.hbs",
  "systems/anarchy/templates/monitors/anarchy-scene.hbs",
  "systems/anarchy/templates/common/view-mode.hbs",
  "systems/anarchy/templates/common/check-element.hbs",
  "systems/anarchy/templates/common/checkbar.hbs",
  "systems/anarchy/templates/common/label.hbs",
  "systems/anarchy/templates/common/damage-code.hbs",
  "systems/anarchy/templates/common/damage-armor.hbs",
  "systems/anarchy/templates/common/enum-value-label.hbs",
  "systems/anarchy/templates/common/favorite.hbs",
  "systems/anarchy/templates/common/item-control-add.hbs",
  "systems/anarchy/templates/common/item-control-activate.hbs",
  "systems/anarchy/templates/common/item-controls.hbs",
  "systems/anarchy/templates/common/control-connectionMode.hbs",
  "systems/anarchy/templates/common/actor-reference.hbs",
  // dialogs
  "systems/anarchy/templates/dialog/roll-modifier.hbs",
  // apps
  "systems/anarchy/templates/app/gm-anarchy.hbs",
  "systems/anarchy/templates/app/gm-difficulty.hbs",
  "systems/anarchy/templates/app/gm-difficulty-buttons.hbs"
];
class Ne {
  constructor() {
    Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    this.registerBasicHelpers(), await loadTemplates(f.distinct(Zt));
  }
  registerBasicHelpers() {
    Handlebars.registerHelper("concat", (...e) => f.join(e.slice(0, -1))), Handlebars.registerHelper("substring", (e, t, a) => e == null ? void 0 : e.substring(t, a)), Handlebars.registerHelper("toUpperCase", qt.toUpperCaseNoAccent), Handlebars.registerHelper("weaponDamageLetter", Kt.letter), Handlebars.registerHelper("weaponDamageCode", Q.damageCode), Handlebars.registerHelper("weaponDamageValue", Q.damageValue), Handlebars.registerHelper("weaponArmorMode", Q.armorMode), Handlebars.registerHelper("skillValue", (e, t) => e.getSkillValue(t, !1)), Handlebars.registerHelper("specializationValue", (e, t) => e.getSkillValue(t, !0)), Handlebars.registerHelper("for", Ne.hbsForLoop), Handlebars.registerHelper("modulo", (e, t) => e % t), Handlebars.registerHelper("divint", f.divint), Handlebars.registerHelper("divup", f.divup), Handlebars.registerHelper("sum", (e, t) => e + t), Handlebars.registerHelper("times", (e, t) => e * t), Handlebars.registerHelper("diff", (e, t) => e - t), Handlebars.registerHelper("min", (e, t) => Math.min(e, t)), Handlebars.registerHelper("max", (e, t) => Math.max(e, t)), Handlebars.registerHelper("either", (e, t) => e || t), Handlebars.registerHelper("isInteger", (e) => e !== void 0 && Number.isInteger(e)), Handlebars.registerHelper("actorAttribute", (e, t, a = void 0) => t.getAttributeValue(e, a)), Handlebars.registerHelper("localizeAttribute", S.localizeAttribute), Handlebars.registerHelper("iconFA", u.fontAwesome), Handlebars.registerHelper("iconSrc", u.iconSystemPath), Handlebars.registerHelper("iconPath", u.iconPath), Handlebars.registerHelper("iconD6", u.iconD6), Handlebars.registerHelper("getActor", (e) => game.actors.get(e)), Handlebars.registerHelper("actorHasFavorite", (e, t) => Ne.checkHasFavorite(e, t)), Handlebars.registerHelper("padWordListToMin", H.padWordListToMin), Handlebars.registerHelper("sortSkills", H.sortSkills), Handlebars.registerHelper("sortShadowamps", H.sortShadowamps), Handlebars.registerHelper("sortQualities", H.sortQualities), Handlebars.registerHelper("sortAttributeButton", H.sortAttributeButton), Handlebars.registerHelper("range", function(e, t) {
      let a = [];
      for (let s = e; s <= t; s++)
        a.push(s);
      return a;
    }), Handlebars.registerHelper("ifGte", function(e, t, a) {
      return e >= t ? a.fn(this) : a.inverse(this);
    }), Handlebars.registerHelper("ifTabClosed", je.ifTabClosed), Handlebars.registerHelper("actorTabClosed", je.actorTabClosed), Handlebars.registerHelper("length", function(e) {
      return (e == null ? void 0 : e.length) || 0;
    });
  }
  static hbsForLoop(e, t, a) {
    let s = "";
    for (let i = e; i < t; ++i)
      s += a.fn(i);
    return s;
  }
  static checkHasFavorite(e, t) {
    const a = game.actors.get(e);
    return a == null ? void 0 : a.hasFavorite(t.hash.type, t.hash.id);
  }
}
const lt = "default-css-class", We = "style-anarchy-shadowrun", Jt = [
  { name: "Shadowrun Anarchy", cssClass: We },
  { name: "Dark", cssClass: "style-dark" },
  { name: "Dark glass", cssClass: "style-darkglass" }
];
class ea {
  constructor() {
    this.availableStyles = {}, Z.register(b.REGISTER_STYLES), Hooks.once(b.REGISTER_STYLES, (e) => Jt.forEach((t) => e(t.cssClass, t.name))), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    Hooks.callAll(b.REGISTER_STYLES, (e, t) => this.availableStyles[e] = t), console.log(P + "Loaded styles", this.availableStyles), game.settings.register(g, lt, {
      scope: "world",
      name: game.i18n.localize(o.settings.defaultCssClass.name),
      hint: game.i18n.localize(o.settings.defaultCssClass.hint),
      config: !0,
      default: We,
      choices: this.availableStyles,
      type: String
    });
  }
  selectCssClass() {
    const e = game.settings.get(g, lt);
    return this.availableStyles[e] ? e : We;
  }
}
const Te = "glitch", fe = "risk", mt = "reroll", dt = "rerollRemoved", ta = "removed", Ee = `${ue}/style/danger-point.webp`, ve = `${ue}/style/anarchy-point.webp`, X = class X {
  static init() {
    CONFIG.Dice.terms[Me.DENOMINATION] = Me, CONFIG.Dice.terms[He.DENOMINATION] = He, Hooks.once("diceSoNiceReady", (e) => X.diceSoNiceReady(e)), Hooks.once("ready", () => X.onReady());
  }
  static onReady() {
    var e;
    X.COLORSETS = X.loadColorsets(), (e = game.modules.get("dice-so-nice")) != null && e.active && game.settings.get("core", "noCanvas") && ui.notifications.warn("Dice So Nice! will not display dice due to Foundry option 'Disable Game Canvas' ");
  }
  static loadColorsets() {
    return {
      [mt]: {
        name: mt,
        description: game.i18n.localize(o.common.roll.rollTheme.reroll),
        category: ie
      },
      [ta]: {
        name: fe,
        description: game.i18n.localize(o.common.roll.rollTheme.removed),
        category: ie
      },
      [dt]: {
        name: dt,
        description: game.i18n.localize(o.common.roll.rollTheme.rerollRemoved),
        category: ie
      },
      [Te]: {
        name: Te,
        description: game.i18n.localize(o.common.roll.rollTheme.glitch),
        category: ie,
        foreground: "white",
        background: "#5c0a5c",
        outline: "none",
        edge: "none",
        texture: "poison",
        material: "metal"
      },
      [fe]: {
        name: fe,
        description: game.i18n.localize(o.common.roll.rollTheme.anarchyRisk),
        category: ie,
        foreground: "#faecd1",
        background: "#040101",
        outline: "none",
        edge: "none",
        texture: "fire",
        material: "metal"
      }
    };
  }
  static diceSoNiceReady(e) {
    X.dice3d = e, game.settings.set("dice-so-nice", "enabledSimultaneousRollForMessage", !1), e.addSystem({ id: g, name: ie }), Object.values(X.COLORSETS).forEach((t) => e.addColorset(t)), e.addDicePreset(Me.diceSoNiceData()), e.addDicePreset(He.diceSoNiceData());
  }
  static img(e) {
    return `<img src="${e}" />`;
  }
};
_(X, "dice3d");
let ce = X;
class Me extends Die {
  constructor(e) {
    e.faces = 6, super(e);
  }
  /** @override */
  getResultLabel(e) {
    switch (e.result) {
      case "1":
        return ce.img(Ee);
    }
    return e.result.toString();
  }
  static diceSoNiceData() {
    return {
      type: "dg",
      labels: [Ee, "2", "3", "4", "5", "6"],
      colorset: Te,
      system: g
    };
  }
}
/** @override */
_(Me, "DENOMINATION", "g");
class He extends Die {
  constructor(e) {
    e.faces = 6, super(e);
  }
  /** @override */
  getResultLabel(e) {
    switch (e.result) {
      case "1":
        return ce.img(Ee);
      case "5":
        return ce.img(ve);
      case "6":
        return ce.img(ve);
    }
    return e.result.toString();
  }
  static diceSoNiceData() {
    return {
      type: "dr",
      labels: [Ee, "2", "3", "4", ve, ve],
      colorset: fe,
      system: g
    };
  }
}
_(He, "DENOMINATION", "r");
const re = {}, aa = {
  riskProwess: 0,
  riskGlitch: 0,
  riskOutcome: "nothing",
  glitch: 0,
  glitchOutcome: "nothing",
  totalGlitch: 0,
  drain: 0,
  total: 0,
  subrolls: {
    roll: void 0,
    reroll: void 0,
    removed: void 0,
    rerollForced: void 0,
    risk: void 0,
    glitch: void 0
  }
};
class Oe {
  static init() {
    Hooks.once("ready", () => Oe.onReady());
  }
  static onReady() {
    Object.entries(o.common.roll.rollTheme).forEach((e) => {
      re[e[0]] = game.i18n.localize(e[1]);
    });
  }
  /**
   * @param {*} param : { pool: 1, reroll: 0, risk: 0, rerollForced: 0, target: 5 }
   */
  constructor(e) {
    this.param = e, this.param.pool = Math.max(this.param.pool ?? 0, 0), this.param.reroll = Math.max(this.param.reroll ?? 0, 0), this.param.rerollForced = Math.abs(this.param.rerollForced ?? 0), this.param.glitch = Math.max(this.param.glitch ?? 0, 0), this.param.risk = Math.max(this.param.risk ?? 0, 0), this.param.edge = Math.max(this.param.edge ?? 0, 0), this.param.target = this.param.edge > 0 ? 4 : this.param.target ?? 5, foundry.utils.mergeObject(this, aa);
  }
  async evaluate() {
    await this.rollPool(), await this.rollRerolls(), await this.rollRerollForced(), await this.rollGlitchDice(), await this.rollAnarchyRisk();
  }
  async rollPool() {
    this.subrolls.pool = new Roll(`${this.param.pool}d6cs>=${this.param.target}[${re.dicePool}]`), await this.subrolls.pool.evaluate({ async: !0 }), this.total = this.subrolls.pool.total;
  }
  async rollRerolls() {
    const e = Math.min(this.param.pool - this.total, this.param.reroll);
    e > 0 && (this.subrolls.reroll = new Roll(`${e}d6cs>=${this.param.target}[${re.reroll}]`), await this.subrolls.reroll.evaluate({ async: !0 }), this.total += this.subrolls.reroll.total);
  }
  async rollRerollForced() {
    const e = Math.min(this.total, this.param.rerollForced);
    e > 0 && (this.subrolls.removed = new Roll(`-${e}d1cf=1[${re.removed}]`), await this.subrolls.removed.evaluate({ async: !0 }), this.subrolls.rerollForced = new Roll(`${e}d6cs>=${this.param.target}[${re.rerollRemoved}]`), await this.subrolls.rerollForced.evaluate({ async: !0 }), this.total -= e, this.total += this.subrolls.rerollForced.total);
  }
  async rollGlitchDice() {
    this.param.glitch > 0 && (this.subrolls.glitch = new Roll(`${this.param.glitch}d6cf=1[${re.glitch}]`), await this.subrolls.glitch.evaluate({ async: !0 }), this.subrolls.glitch.dice[0].options.appearance = { colorset: Te }, this.glitch = this.subrolls.glitch.terms[0].results.filter((e) => e.result == 1).length, this.glitchOutcome = this.glitch > 0 ? "glitch" : "nothing", this.totalGlitch += this.glitch);
  }
  async rollAnarchyRisk() {
    this.param.risk > 0 && (this.subrolls.risk = new Roll(`${this.param.risk}drcs>=5[${re.anarchyRisk}]`), await this.subrolls.risk.evaluate({ async: !0 }), this.subrolls.risk.dice[0].options.appearance = { colorset: fe }, this.riskGlitch = this.subrolls.risk.terms[0].results.filter((e) => e.result == 1).length, this.riskProwess += this.subrolls.risk.terms[0].results.filter((e) => e.result >= 5).length, this.subrolls.risk.total > 0 && this.total++, this.riskOutcome = this.riskProwess > 0 ? "prowess" : this.riskGlitch > 0 ? "glitch" : "nothing", this.totalGlitch += this.riskGlitch);
  }
  async toMessage(e, t) {
    return t = foundry.utils.mergeObject(t ?? {}, { create: !0 }), await this.toGroupedRoll().toMessage(e, t);
  }
  toGroupedRoll() {
    let e = 1, t = [];
    return this._addRoll(t, this.subrolls.pool), this._addRoll(t, this.subrolls.reroll), this._addRoll(t, this.subrolls.removed), this._addRoll(t, this.subrolls.rerollForced), this._addRoll(t, this.subrolls.risk), this._addRoll(t, this.subrolls.glitch), t.forEach((a) => a.dice[0].options.rollOrder = e++), Roll.fromTerms([PoolTerm.fromRolls(t)]);
  }
  _addRoll(e, t) {
    t && e.push(t);
  }
  async _displayDice(e) {
    var t;
    e && ((t = game.dice3d) == null || t.showForRoll(e));
  }
  get hits() {
    return this.total;
  }
  get pool() {
    var e;
    return ((e = this.param) == null ? void 0 : e.pool) ?? 0;
  }
}
const Le = "systemMigrationVersion";
class F {
  get code() {
    return "sample";
  }
  get version() {
    return "0.0.0";
  }
  async migrate() {
    return () => {
    };
  }
  async applyItemsUpdates(e) {
    await game.actors.forEach(async (a) => {
      const s = e(a.items);
      s.length > 0 && (console.log(this.code, `Applying updates on actor ${a.name} items`, s), await a.updateEmbeddedDocuments("Item", s));
    });
    const t = e(game.items);
    t.length > 0 && (console.log(this.code, "Applying updates on items", t), await Item.updateDocuments(t));
  }
}
class sa extends F {
  get version() {
    return "0.3.1";
  }
  get code() {
    return "move-words-in-objects";
  }
  async migrate() {
    game.actors.forEach(async (e) => {
      await e.update({
        "system.keywords": this._createWordObject(e.system.keywords),
        "system.cues": this._createWordObject(e.system.cues),
        "system.dispositions": this._createWordObject(e.system.dispositions)
      });
    });
  }
  _createWordObject(e) {
    return f.reindexIds((e ?? []).map((t) => this._keywordToObject(t)));
  }
  _keywordToObject(e) {
    return e instanceof String ? { word: e } : e;
  }
}
class ra extends F {
  get version() {
    return "0.3.8";
  }
  get code() {
    return "migrate-weapons-strength-damage";
  }
  async migrate() {
    const e = (a) => a.type == c.itemType.weapon && a.system.strength, t = (a) => ({
      _id: a.id,
      "system.damageAttribute": c.attributes.strength,
      "system.strength": void 0
    });
    this.applyItemsUpdates((a) => a.filter(e).map(t));
  }
}
class ia extends F {
  get version() {
    return "0.3.14";
  }
  get code() {
    return "migrate-skill-drain-convergence";
  }
  async migrate() {
    const e = de.filter((m) => m.hasDrain).map((m) => m.code), t = (m) => m.type == c.itemType.skill && e.includes(m.system.code), a = (m) => ({ _id: m.id, "system.hasDrain": !0 }), s = de.filter((m) => m.hasConvergence).map((m) => m.code), i = (m) => m.type == c.itemType.skill && s.includes(m.system.code), n = (m) => ({ _id: m.id, "system.hasConvergence": !0 }), l = (m) => m.filter(t).map(a).concat(m.filter(i).map(n));
    await this.applyItemsUpdates(l);
  }
}
class oa extends F {
  get version() {
    return "0.4.0";
  }
  get code() {
    return "migrate-select-weapon-defense";
  }
  async migrate() {
    const e = (a) => de.find((s) => s.defense && s.code == a.system.skill), t = (a) => {
      var s;
      return {
        _id: a.id,
        "system.defense": Y.fixedDefenseCode((s = e(a)) == null ? void 0 : s.defense)
      };
    };
    await this.applyItemsUpdates((a) => a.filter((s) => s.isWeapon()).filter(e).map(t));
  }
}
class na extends F {
  get version() {
    return "0.5.0";
  }
  get code() {
    return "base-resistance-is-zero";
  }
  async migrate() {
    game.actors.forEach(async (e) => await e.update(this._resistanceUpdates(e)));
  }
  _resistanceUpdates(e) {
    const t = {};
    return Object.entries(e.system.monitors).forEach(
      (a) => {
        a[1].resistance && (t[`system.monitors.${a[0]}.resistance`] = 0);
      }
    ), t;
  }
}
class ca extends F {
  get version() {
    return "0.6.0";
  }
  get code() {
    return "migrate-skill-social";
  }
  async migrate() {
    const e = de.filter((s) => s.isSocial).map((s) => s.code), t = (s) => s.type == c.itemTypeskill && e.includes(s.system.code), a = (s) => ({ _id: s.id, "system.isSocial": !0 });
    await this.applyItemsUpdates((s) => s.filter(t).map(a));
  }
}
class la extends F {
  get version() {
    return "11.1.0";
  }
  get code() {
    return "migrate-defense-roll-modifiers";
  }
  constructor() {
    super(), this.isDefenseModifier = (e) => e.group == "roll" && e.category == "defense", this.isCorrespondingActionModifier = (e, t) => e.group == "roll" && e.effect == t.effect && e.category == "attributeAction" && e.subCategory == t.subCategory, this.hasDefenseModifiers = (e) => (e.system.modifiers ?? []).filter(this.isDefenseModifier).length > 0;
  }
  async migrate() {
    const e = [];
    await this.applyItemsUpdates((t) => t.filter(this.hasDefenseModifiers).map((s) => this.getItemModifiersUpdate(s, e))), e.length > 0 && ChatMessage.create({
      whisper: ChatMessage.getWhisperRecipients("GM"),
      content: `${this.version} - Migration of defense modifiers:<ul>` + e.reduce((t, a) => t + a) + "</ul></li>"
    });
  }
  getItemModifiersUpdate(e, t) {
    const a = [];
    function s(n, l, m) {
      a.push(`<li> ${n}: ${l.group}/${l.effect}/${l.subCategory} : ${l.category}/${l.value} ${l.condition} => ${m.category}/${m.value} ${m.condition}</li>`);
    }
    const i = {};
    return e.system.modifiers.forEach((n) => i[n.id] = duplicate(n)), Object.values(i).filter((n) => this.isDefenseModifier(n)).forEach((n) => {
      const l = duplicate(n);
      let m = Object.values(i).filter((y) => this.isCorrespondingActionModifier(y, n));
      switch (m.length) {
        case 0: {
          n.category = E.rollType.attributeAction, s("Changed category", l, n);
          break;
        }
        case 1: {
          const y = m[0];
          foundry.utils.mergeObject(y, {
            value: Math.max(n.value, y.value),
            condition: y.condition ? y.condition + (n.condition ?? "") : n.condition
          }, { overwrite: !0 }), delete i[n.id], s("Merged with existing", n, y);
          break;
        }
        default: {
          delete i[n.id], s("Removed", n, { category: "-", value: "-", condition: "-" });
          break;
        }
      }
    }), a.length > 0 && t.push(`<li> ${e.actor ? e.actor.name : "-standalone-"} Item ${e.name} modifiers changed:
        <ul>${a.reduce(f.joiner())}</ul>
        </li>`), { _id: e.id, "system.modifiers": Object.values(i) };
  }
}
class ma extends F {
  get version() {
    return "11.1.9";
  }
  get code() {
    return "migrate-vehicle-handling";
  }
  async migrate() {
    game.actors.filter((e) => e.isVehicle()).forEach(async (e) => await e._migrateHandlingToAttribute());
  }
}
class da extends F {
  get version() {
    return "11.1.12";
  }
  get code() {
    return "migrate-back-words";
  }
  async migrate() {
    game.actors.forEach(async (e) => {
      await e.update({
        "system.keywords": this._migrateBackWords(e.system.keywords),
        "system.cues": this._migrateBackWords(e.system.cues),
        "system.dispositions": this._migrateBackWords(e.system.dispositions)
      });
    });
  }
  _migrateBackWords(e) {
    return e ? f.reindexIds(e.map((t) => this._migrateBackWord(t))) : [];
  }
  _migrateBackWord(e) {
    for (; e.word != null && !f.isString(e.word); )
      e = e.word;
    return e;
  }
}
class ua extends F {
  get version() {
    return "11.1.16";
  }
  get code() {
    return "migrate-skills-attributes";
  }
  async migrate() {
    this.applyItemsUpdates((e) => e.filter((t) => t.type == c.itemType.skill).filter((t) => t.system.attribute == "" || t.system.code == "").map((t) => ({
      _id: t.id,
      "system.attribute": "",
      "system.code": c.attributes.knowledge
    })));
  }
}
class ha extends F {
  get version() {
    return "12.0.1";
  }
  get code() {
    return "migrate-chatmessage-flags-messagedata";
  }
  async migrate() {
    await Promise.all(
      game.messages.map(async (e) => {
        const t = e.getFlag(SYSTEM_SCOPE, MESSAGE_DATA);
        t && await e.setFlag(SYSTEM_SCOPE, MESSAGE_DATA, JSON.parse(t));
      })
    );
  }
}
class ga extends F {
  get version() {
    return "12.0.2";
  }
  get code() {
    return "migrate-weapon-drain";
  }
  async migrate() {
    this.applyItemsUpdates((e) => e.filter((t) => t.type = c.itemType.weapon).filter((t) => t.hasDrain).map((t) => ({
      _id: t.id,
      "system.drain": 1
    })));
  }
}
class ya {
  constructor() {
    Z.register(b.DECLARE_MIGRATIONS), Hooks.once(b.DECLARE_MIGRATIONS, (e) => e(
      new sa(),
      new ra(),
      new ia(),
      new oa(),
      new na(),
      new ca(),
      new la(),
      new ma(),
      new da(),
      new ua(),
      new ha(),
      new ga()
    )), game.settings.register(g, Le, {
      name: "System Migration Version",
      scope: "world",
      config: !1,
      type: String,
      default: "0.0.0"
    });
  }
  migrate() {
    const e = game.settings.get(g, Le);
    if (foundry.utils.isNewerVersion(game.system.version, e)) {
      let t = [];
      Hooks.callAll(
        b.DECLARE_MIGRATIONS,
        (...a) => t = t.concat(a.filter((s) => foundry.utils.isNewerVersion(s.version, e)))
      ), Hooks.off(b.DECLARE_MIGRATIONS, () => {
      }), t.length > 0 ? (t.sort((a, s) => foundry.utils.isNewerVersion(a.version, s.version) ? 1 : foundry.utils.isNewerVersion(s.version, a.version) ? -1 : 0), t.forEach(async (a) => {
        ui.notifications.info(`Executing migration ${a.code}: version ${e} is lower than ${a.version}`), await a.migrate();
      }), ui.notifications.info(`Migrations done, version will change to ${game.system.version}`)) : console.log(P + `No migration needeed, version will change to ${game.system.version}`), game.settings.set(g, Le, game.system.version);
    } else
      console.log(P + "No system version changed");
  }
}
const pa = `${h}/chat/celebrity-roll.hbs`;
class De extends Dialog {
  static async create(e) {
    const t = {
      actor: e,
      celebrity: {
        labelkey: o.actor.celebrity,
        value: e.getCelebrityValue()
      },
      modifiers: foundry.utils.mergeObject(
        { labelkey: o.item.tabs.modifiers },
        A.computeModifiers(e.items, "other", "celebrity")
      ),
      other: {
        labelkey: o.common.roll.modifiers.other,
        value: 0
      },
      ANARCHY: o
    }, a = await renderTemplate(`${h}/dialog/roll-celebrite-title.hbs`, t), s = await renderTemplate(`${h}/dialog/roll-celebrite.hbs`, t);
    new De(a, s, t).render(!0);
  }
  constructor(e, t, a) {
    const s = {
      title: e,
      content: t,
      default: "roll",
      buttons: {
        roll: {
          label: game.i18n.localize(o.common.roll.button),
          callback: async () => De.doRoll(a)
        }
      }
    }, i = {
      classes: [game.system.anarchy.styles.selectCssClass(), "anarchy-dialog"],
      width: 400,
      height: "fit-content",
      "z-index": 99999
    };
    super(s, i);
  }
  activateListeners(e) {
    super.activateListeners(e), this.bringToTop(), e.find(".input-celebrity-other").on("input", (t) => {
      this.roll.other.value = Number.parseInt(t.currentTarget.value) ?? 0;
    });
  }
  static async doRoll(e) {
    const t = [
      e.celebrity,
      e.modifiers,
      e.other
    ], a = f.sumValues(t, (l) => l.value), s = {
      actor: e.actor,
      parameters: t,
      pool: a,
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      },
      ANARCHY: o
    }, i = new Roll(`${a}d6cs>=5`);
    await i.evaluate();
    const n = await renderTemplate(pa, s);
    await i.toMessage({ flavor: n });
  }
  // async roll() {
  //   const parameters = [
  //     this.roll.celebrity,
  //     this.roll.modifiers,
  //     this.roll.other
  //   ];
  //   const pool = Misc.sumValues(parameters, it => it.value);
  //   const hbsCelebrityRoll = {
  //     actor: this.roll.actor,
  //     parameters: parameters,
  //     pool: pool,
  //     options: {
  //       classes: [game.system.anarchy.styles.selectCssClass()]
  //     },
  //     ANARCHY: ANARCHY
  //   }
  //   const roll = new Roll(`${pool}d6cs>=5`);
  //   await roll.evaluate();
  //   const flavor = await renderTemplate(HBS_TEMPLATE_CHAT_CELEBRITY_ROLL, hbsCelebrityRoll);
  //   await roll.toMessage({ flavor: flavor });
  // }
}
const fa = `${h}/chat/actor-drain.hbs`, Aa = `${h}/chat/actor-say-word.hbs`;
class ba extends H {
  static get initiative() {
    return H.initiative + " + max(@attributes.agility.value, @attributes.logic.value)";
  }
  hasOwnAnarchy() {
    return this.hasPlayerOwner;
  }
  prepareDerivedData() {
    this.system.monitors.physical.max = this._getMonitorMax(c.attributes.strength), this.system.monitors.stun.max = this._getMonitorMax(c.attributes.willpower), super.prepareDerivedData(), this.system.ignoreWounds = A.sumModifiers(this.items, "other", "ignoreWounds");
  }
  computePhysicalState() {
    const e = Math.max(this.system.monitors.physical.max, this.system.monitors.stun.max) + this.system.monitors.armor.max, t = this.system.monitors.physical.value == this.system.monitors.physical.max, a = this.system.monitors.stun.max == this.system.monitors.stun.value, s = t || a ? e : Math.max(this.system.monitors.physical.value, this.system.monitors.stun.value) + this.system.monitors.armor.value;
    return {
      max: e,
      value: e - s
    };
  }
  computeEssence() {
    const e = game.system.anarchy.hooks.callHookMethod(b.PROVIDE_BASE_ESSENCE, this), t = f.sumValues(this.items.filter((s) => s.type == "shadowamp").map((s) => Math.abs(s.system.essence))), a = A.sumModifiers(this.items, "other", "essenceAdjustment");
    return e + a - Math.max(0, t);
  }
  computeMalusEssence(e = void 0) {
    return game.system.anarchy.hooks.callHookMethod(b.PROVIDE_MALUS_ESSENCE, this, e ?? this.computeEssence());
  }
  getAttributes() {
    return [
      c.attributes.strength,
      c.attributes.agility,
      c.attributes.willpower,
      c.attributes.logic,
      c.attributes.charisma,
      c.attributes.edge
    ];
  }
  getPhysicalAgility() {
    return c.attributes.agility;
  }
  getCorrespondingAttribute(e) {
    return c.attributes.firewall == e ? c.attributes.firewall : super.getCorrespondingAttribute(e);
  }
  getMatrixDetails() {
    const e = this.getCyberdeck();
    return e != null && e.isConnected() ? {
      hasMatrix: !0,
      logic: c.attributes.logic,
      firewall: c.attributes.firewall,
      monitor: e.system.monitors.matrix,
      overflow: e.getMatrixOverflow(),
      setMatrixMonitor: async (t, a) => e.setMatrixMonitor(t, a)
    } : this.isEmerged() ? {
      hasMatrix: !0,
      logic: c.attributes.logic,
      firewall: c.attributes.logic,
      monitor: this.system.monitors.stun,
      overflow: c.monitors.physical,
      setMatrixMonitor: async (t, a) => {
        if (t == Ke.matrix.path)
          return await d.setCheckbar(this, c.monitors.stun, a);
      }
    } : {
      hasMatrix: !1,
      logic: c.attributes.logic,
      firewall: void 0,
      monitor: qe,
      overflow: void 0
    };
  }
  isMatrixConnected(e = void 0) {
    e = ye.resolveConnectionMode(e);
    let t;
    const a = this.getCyberdeck();
    return a != null && a.isConnected() && (t = a.getConnectionMode()), !t && this.isEmerged() && (t = this.system.connectionMode), e == null ? ye.resolveConnectionMode(t) != x.connectionMode.disconnected : ye.resolveConnectionMode(t) == e;
  }
  async nextConnectionMode(e) {
    if (e)
      await e.nextConnectionMode();
    else if (this.isEmerged()) {
      const t = ye.getNextConnectionMode(this.system.connectionMode);
      await this.update({ "system.connectionMode": t });
    }
  }
  prepareMatrixMonitor() {
    const e = this.getCyberdeck();
    e && (e.system.monitors.matrix.maxBonus = A.sumMonitorModifiers(this.items, "matrix", "max"), e.system.monitors.matrix.resistanceBonus = A.sumMonitorModifiers(this.items, "matrix", "resistance"));
  }
  getDamageMonitor(e) {
    switch (e) {
      case c.monitors.stun:
      case c.monitors.physical:
        return e;
    }
    return super.getDamageMonitor(e);
  }
  async createWord(e, t) {
    this._mutateWords(e, (a) => a.concat([{ word: t, audio: "" }]));
  }
  async sayWord(e, t) {
    var s, i;
    const a = (s = this.getWord(e, t)) == null ? void 0 : s.word;
    a && ChatMessage.create({
      speaker: { alias: ((i = this.token) == null ? void 0 : i.name) ?? this.name },
      content: await renderTemplate(
        Aa,
        {
          actor: this,
          wordsToSay: a
        }
      )
    });
  }
  getWord(e, t) {
    return e ? this.system[e].find((a) => a.id == t) : void 0;
  }
  async updateWord(e, t, a) {
    this._applyWordUpdate(e, t, (s) => foundry.utils.mergeObject(s, { word: a }, { overwrite: !0 }));
  }
  async _applyWordUpdate(e, t, a) {
    this._mutateWords(e, (s) => s.map((i) => (i.id == t && a(i), i)));
  }
  async deleteWord(e, t) {
    this._mutateWords(e, (a) => a.filter((s) => s.id != t));
  }
  async _mutateWords(e, t = (a) => a) {
    if (!e)
      return;
    let a = t(this.system[e]);
    f.reindexIds(a), await this.update({ [`system.${e}`]: a });
  }
  getCelebrityValue() {
    return this.system.counters.social.celebrity.value;
  }
  getCredibilityValue() {
    return this.system.counters.social.credibility.value;
  }
  getRumorValue() {
    return this.system.counters.social.rumor.value;
  }
  getAnarchy() {
    return this.hasOwnAnarchy() ? {
      value: this.system.counters.anarchy.value,
      max: this.system.counters.anarchy.max,
      scene: this.getAnarchyScene()
    } : super.getAnarchy();
  }
  getAnarchyScene() {
    return this.system.counters.sceneAnarchy.value ?? 0;
  }
  async spendAnarchy(e) {
    if (e > 0) {
      const t = this.getAnarchyScene(), a = this.getAnarchyValue();
      K.checkSufficient(o.actor.counters.anarchy, e, a + t);
      const s = Math.min(t, e), i = e - s;
      s > 0 && d.addCounter(this, c.monitors.sceneAnarchy, -s), this.hasPlayerOwner ? (await game.system.anarchy.gmAnarchy.actorGivesAnarchyToGM(this, e), d.addCounter(this, c.monitors.anarchy, -i)) : i > 0 && super.spendAnarchy(i);
    }
  }
  canUseEdge() {
    return !0;
  }
  getWounds() {
    const e = f.divint(this.system.monitors.stun.value, 3) + f.divint(this.system.monitors.physical.value, 3);
    return Math.max(0, e - this.system.ignoreWounds);
  }
  canPilotVehicle() {
    return !0;
  }
  canSetMarks() {
    var e;
    return ((e = this.getCyberdeck()) == null ? void 0 : e.isConnected()) || this.isEmerged();
  }
  canReceiveMarks() {
    var e;
    return (e = this.getCyberdeck()) == null ? void 0 : e.isConnected();
  }
  isEmerged() {
    return this.system.capacity == c.capacities.emerged;
  }
  getCyberdeck() {
    return this.items.find((e) => e.isActive() && e.isCyberdeck());
  }
  async rollDrain(e) {
    if (e) {
      const t = new Roll(`${e}dgcf=1[${game.i18n.localize(o.common.roll.rollTheme.drain)}]`);
      await t.evaluate({ async: !0 }), await this.sufferDrain(t.total);
      const a = await renderTemplate(fa, {
        ANARCHY: o,
        actor: this,
        drain: t.total,
        options: {
          classes: game.system.anarchy.styles.selectCssClass()
        }
      });
      await t.toMessage({ flavor: a });
    }
  }
  async sufferDrain(e) {
    e != 0 && await this.addCounter(c.monitors.stun, e);
  }
  async rollConvergence(e) {
    e && game.system.anarchy.gmConvergence.rollConvergence(this.id, e);
  }
  async rollCelebrity() {
    await De.create(this);
  }
}
const Ca = [
  c.attributes.system,
  c.attributes.firewall
];
class ka extends H {
  static get defaultIcon() {
    return `${G}/actors/cctv-camera.svg`;
  }
  static get initiative() {
    return H.initiative + " + @attributes.system.value";
  }
  getMatrixDetails() {
    return {
      hasMatrix: !0,
      logic: c.attributes.system,
      firewall: c.attributes.firewall,
      monitor: this.system.monitors.matrix,
      overflow: void 0
    };
  }
  getAttributes() {
    return Ca;
  }
}
const wa = [
  c.attributes.autopilot,
  c.attributes.handling,
  c.attributes.firewall,
  c.attributes.system
];
class va extends H {
  static get defaultIcon() {
    return `${G}/shadowamps/drone.svg`;
  }
  static get initiative() {
    return H.initiative + " + max(@attributes.system.value, @attributes.autopilot.value)";
  }
  prepareDerivedData() {
    this.system.monitors.matrix.max = this._getMonitorMax(c.attributes.system), super.prepareDerivedData();
  }
  computePhysicalState() {
    return {
      max: this.system.monitors.structure.max,
      value: this.system.monitors.structure.max - this.system.monitors.structure.value
    };
  }
  getMatrixDetails() {
    return {
      hasMatrix: !0,
      logic: c.attributes.system,
      firewall: c.attributes.firewall,
      monitor: this.system.monitors.matrix,
      overflow: void 0
    };
  }
  getAttributes() {
    return wa;
  }
  getPhysicalAgility() {
    return c.attributes.autopilot;
  }
  getDamageMonitor(e) {
    switch (e) {
      case c.monitors.physical:
        return c.monitors.structure;
      case c.monitors.stun:
        return;
    }
    return super.getDamageMonitor(e);
  }
  getRightToDefend() {
    return CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER;
  }
  async rollPilotDefense(e) {
    const t = I.getSelectedActors();
    K.checkOutOfRange(o.user.selectedTokenActors, t.length, 0, 1);
    const a = I.getPlayerActor(game.user), s = this.getOwnerActor(), i = [...t, a, s].filter((n) => n == null ? void 0 : n.testUserPermission(game.user, this.getRightToDefend())).find((n) => n == null ? void 0 : n.canPilotVehicle());
    if (i)
      return await i.rollDefense(e);
    ui.notifications.warn(
      game.i18n.localize(o.common.errors.noValidPilotForVehicle, {
        vehicle: this.name
      })
    );
  }
  async _migrateHandlingToAttribute(e) {
    var s;
    const t = ((s = this.system.attributes.handling) == null ? void 0 : s.value) ?? 0, a = this.system.handling;
    a && t < a && await this.update({
      "system.-=handling": null,
      "system.attributes.handling.value": a
    });
  }
}
class Ra extends Ye {
  get template() {
    return `${h}/actor/character.hbs`;
  }
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 720,
      height: 700
    });
  }
}
class Ma extends Ae {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 450,
      height: 550
    });
  }
  getData(e) {
    return foundry.utils.mergeObject(
      super.getData(e),
      {}
    );
  }
  activateListeners(e) {
    super.activateListeners(e);
  }
}
class Ha extends Ae {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 450,
      height: 550
    });
  }
  getData(e) {
    return foundry.utils.mergeObject(
      super.getData(e),
      {}
    );
  }
  activateListeners(e) {
    super.activateListeners(e);
  }
}
class Sa extends Ye {
  get template() {
    return `${h}/actor/npc-sheet.hbs`;
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 450,
      height: 550
    });
  }
  getData(e) {
    let t = super.getData(e);
    return t.options.classes.push("npc-sheet"), t;
  }
}
class Na extends q {
  static get defaultIcon() {
    return `${G}/vitruvian-man.svg`;
  }
  async onCreateItem(e, t) {
    var a;
    (a = this.parent) == null || a.removeOtherMetatype(this);
  }
}
class Ta extends q {
  static get defaultIcon() {
    return `${G}/shadowamps/cyberdeck.svg`;
  }
  getAttributes() {
    return [
      c.attributes.firewall
    ];
  }
  async setMatrixMonitor(e, t) {
    await this.update({ [e]: t });
  }
  hasMatrixMonitor() {
    return !0;
  }
  getMatrixMonitor() {
    return this.system.monitors.matrix;
  }
  getMatrixOverflow() {
    switch (this.system.connectionMode) {
      case x.connectionMode.virtual:
        return c.monitors.physical;
      case x.connectionMode.augmented:
        return c.monitors.stun;
    }
  }
  isConnected() {
    return this.getMatrixOverflow() != null;
  }
  getConnectionMode() {
    return this.system.connectionMode;
  }
  async nextConnectionMode() {
    const e = ye.getNextConnectionMode(this.system.connectionMode);
    await this.update({ "system.connectionMode": e });
  }
}
class ee extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      isGM: game.user.isGM,
      dragDrop: [{ dragSelector: ".item ", dropSelector: null }],
      classes: [game.system.anarchy.styles.selectCssClass(), "sheet", "item-sheet"],
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
    });
  }
  get title() {
    return game.i18n.localize(o.itemType.singular[this.item.type]) + ": " + this.item.name;
  }
  get template() {
    return `${h}/item/${this.object.type}.hbs`;
  }
  getData(e) {
    var n;
    const t = (n = this.item.actor) == null ? void 0 : n.getAttributes(this.item), a = this.item.actor ? (l) => t.includes(l) : (l) => !0, s = this.item.type == c.itemType.skill;
    let i = foundry.utils.mergeObject(
      super.getData(e),
      {
        options: {
          isGM: game.user.isGM,
          owner: this.document.isOwner,
          isOwned: this.actor != null,
          editable: this.isEditable,
          cssClass: this.isEditable ? "editable" : "locked"
        },
        ENUMS: foundry.utils.mergeObject(S.getEnums(a, s), game.system.anarchy.modifiers.getEnums()),
        ANARCHY: o
      }
    );
    return i.system = this.item.system, i;
  }
  activateListeners(e) {
    super.activateListeners(e), e.find("a.click-checkbar-element").click(
      async (t) => await this.onClickMonitor(t)
    ), e.find(".click-modifier-add").click(
      async (t) => await this.item.createModifier()
    ), e.find(".click-modifier-delete").click(
      async (t) => await this.item.deleteModifier(this.getEventModifierId(t))
    ), e.find(".input-modifier-value").change(
      async (t) => await this.item.changeModifierValue(
        this.getEventModifierId(t),
        t.currentTarget.value
      )
    ), e.find(".input-modifier-condition").change(
      async (t) => await this.item.changeModifierCondition(
        this.getEventModifierId(t),
        t.currentTarget.value
      )
    ), e.find(".select-modifier-change").change(
      async (t) => await this.item.changeModifierSelection(
        this.getEventModifierId(t),
        this.getEventModifierSelect(t),
        t.currentTarget.value
      )
    );
  }
  async onClickMonitor(e) {
    if (this.item.parent) {
      const t = this.getEventMonitorCode(e), a = t == "marks" ? $(e.currentTarget).closest(".anarchy-marks").attr("data-actor-id") : void 0;
      await this.item.parent.switchMonitorCheck(
        t,
        this.getEventMonitorIndex(e),
        this.isEventMonitorChecked(e),
        a,
        item
      );
    }
  }
  getEventMonitorCode(e) {
    return $(e.currentTarget).closest(".checkbar-root").attr("data-monitor-code");
  }
  getEventMonitorIndex(e) {
    return Number.parseInt($(e.currentTarget).attr("data-index"));
  }
  isEventMonitorChecked(e) {
    return $(e.currentTarget).attr("data-checked") == "true";
  }
  getEventModifierId(e) {
    return $(e.currentTarget).closest(".define-modifier").attr("data-modifier-id");
  }
  getEventModifierSelect(e) {
    return $(e.currentTarget).attr("data-modifier-select");
  }
}
class Ea extends ee {
  getData(e) {
    return super.getData(e);
  }
  activateListeners(e) {
    super.activateListeners(e);
  }
}
class Da extends ee {
  getData(e) {
    return super.getData(e);
  }
  activateListeners(e) {
    e.find("a.click-matrix-connectionMode").click(async (t) => {
      await this.item.nextConnectionMode();
    }), super.activateListeners(e);
  }
}
class Ya extends ee {
  getData(e) {
    return super.getData(e);
  }
  activateListeners(e) {
    super.activateListeners(e);
  }
}
class Oa extends ee {
  getData(e) {
    return super.getData(e);
  }
  activateListeners(e) {
    super.activateListeners(e);
  }
}
class Ia extends ee {
  getData(e) {
    return super.getData(e);
  }
  activateListeners(e) {
    super.activateListeners(e);
  }
}
class _a extends ee {
  getData(e) {
    return super.getData(e);
  }
  activateListeners(e) {
    super.activateListeners(e);
  }
}
class xa extends ee {
  activateListeners(e) {
    super.activateListeners(e), e.find(".select-skill-code").change(async (t) => {
      const a = t.currentTarget.value, s = Qe.prepareSkill(a);
      s && await this.object.update(s);
    });
  }
}
class Pa extends ee {
  getData(e) {
    let t = super.getData(e);
    return t.ENUMS = foundry.utils.mergeObject({ defenses: Y.getDefenses() }, t.ENUMS), t.hasDrain = this.item.hasDrain, t.hasConvergence = this.item.hasConvergence, t;
  }
  activateListeners(e) {
    super.activateListeners(e), e.find(".select-weapon-skill").change(async (t) => {
      const a = t.currentTarget.value, s = game.system.anarchy.skills.get(a);
      s && await this.object.update({ "system.defense": s.defense }, { render: !1 });
    });
  }
}
class $a extends q {
  static get defaultIcon() {
    return `${G}/contacts/contact.svg`;
  }
}
class La extends q {
  static get defaultIcon() {
    return `${G}/gear/gear.svg`;
  }
}
class Ga extends q {
  static get defaultIcon() {
    return `${G}/quality-positive.svg`;
  }
}
class Va extends q {
  static get defaultIcon() {
    return `${G}/shadowamps/other.svg`;
  }
}
const Se = "convergences", Ua = `${g}.${Se}`, ut = "GMConvergence.rollConvergence", Fa = `${h}/app/gm-convergence.hbs`, ht = `${h}/app/gm-convergence-actors.hbs`;
class ja {
  constructor() {
    game.settings.register(g, Se, {
      scope: "world",
      config: !1,
      default: [],
      type: Array
    }), this.convergences = [], Hooks.on("updateSetting", async (e, t, a, s) => this.onUpdateSetting(e, t, a, s)), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    await loadTemplates([
      Fa,
      ht
    ]), this.convergences = game.settings.get(g, Se).filter((e) => game.actors.get(e.actorId)), await j.register(ut, {
      callback: (e) => this.rollConvergence(e.actorId, e.convergence),
      condition: (e) => e.isGM
    });
  }
  getConvergences() {
    return this.convergences;
  }
  async rollConvergence(e, t) {
    j.call(ut, { actorId: e, convergence: t }) || await this._gmRollConvergence(t, e);
  }
  async _gmRollConvergence(e, t) {
    const a = game.actors.get(t), s = new Roll(`${e}dgcf=1[${game.i18n.localize(o.common.roll.rollTheme.convergence)}]`);
    await s.evaluate({ async: !0 }), this.addConvergence(a, s.total), s.toMessage({
      user: game.user,
      whisper: ChatMessage.getWhisperRecipients("GM"),
      blind: !0,
      flavor: `Convergence for ${a.name}: ${s.total}`
    }, { rollType: "blindroll" });
  }
  async addConvergence(e, t) {
    !game.user.isGM || !t || await this.setActorConvergence(e, this.getConvergence(e) + t);
  }
  getConvergence(e) {
    var t;
    return game.user.isGM ? ((t = this.convergences.find((a) => a.actorId == e.id)) == null ? void 0 : t.convergence) ?? 0 : 0;
  }
  async setActorConvergence(e, t) {
    let a = this.convergences.find((s) => s.actorId == e.id);
    a || (a = { actorId: e.id }, this.convergences.push(a)), a.convergence = t, this.convergences = this.convergences.filter((s) => s.convergence > 0), game.settings.set(g, Se, this.convergences);
  }
  async activateListeners(e) {
    this.toolbar = e.find(".gm-convergence-bar"), await this._rebuild();
  }
  async onUpdateSetting(e, t, a, s) {
    game.user.isGM && e.key == Ua && await this._rebuild();
  }
  async _rebuild() {
    this.toolbar.find(".gm-convergence-content").replaceWith(await this._renderBar()), this.toolbar.find("a.click-checkbar-element").click(async (e) => await this._onClickConvergence(e));
  }
  async _onClickConvergence(e) {
    $(e.currentTarget).closest(".checkbar-root").attr("data-monitor-code");
    const t = $(e.currentTarget).closest(".actor-convergence").attr("data-actor-id"), a = Number.parseInt($(e.currentTarget).attr("data-index")), s = $(e.currentTarget).attr("data-checked") == "true", i = d.newValue(a, s), n = game.actors.get(t);
    await this.setActorConvergence(n, i);
  }
  async _renderBar() {
    const e = {
      convergences: this.convergences.map((a) => ({
        actor: game.actors.get(a.actorId),
        convergence: a.convergence
      }))
    };
    return await renderTemplate(ht, e);
  }
}
class gt extends Combat {
  static init() {
    Hooks.on("createCombatant", async (e, t, a) => await e.combat.onCreateCombatant(e, t, a)), Hooks.on("deleteCombatant", async (e, t, a) => await e.combat.onDeleteCombatant(e, t, a)), Hooks.on("deleteCombat", async (e, t, a) => await e.onDeleteCombat(t, a));
  }
  get initiative() {
    return { formula: "2d6" };
  }
  async rollInitiative(e, t) {
    const a = e.map((i) => this.combatants.find((n) => n.id == i)), s = f.classify(a, (i) => i.actor.type);
    Object.entries(s).forEach(async ([i, n]) => {
      const l = game.system.anarchy.actorClasses[i], m = n.map((W) => W.id), y = foundry.utils.mergeObject({ formula: l.initiative }, t ?? {});
      await super.rollInitiative(m, y);
    });
  }
  async onCreateCombatant(e, t, a) {
    var s;
    I.isUniqueConnectedGM() && await ((s = e.actor) == null ? void 0 : s.onEnterCombat());
  }
  async onDeleteCombatant(e, t, a) {
    I.isUniqueConnectedGM() && await this._leaveCombat(e);
  }
  async onDeleteCombat(e, t) {
    I.isUniqueConnectedGM() && this.combatants.forEach(async (a) => await this._leaveCombat(a));
  }
  async _leaveCombat(e) {
    var t;
    return await ((t = e.actor) == null ? void 0 : t.onLeaveCombat());
  }
}
class Wa extends Ae {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 450,
      height: 550
    });
  }
  getData(e) {
    return foundry.utils.mergeObject(
      super.getData(e),
      {}
    );
  }
  activateListeners(e) {
    super.activateListeners(e);
  }
}
class za extends Ae {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 450,
      height: 550
    });
  }
  getData(e) {
    return foundry.utils.mergeObject(
      super.getData(e),
      {}
    );
  }
  activateListeners(e) {
    super.activateListeners(e);
  }
}
const Ba = [
  c.attributes.logic,
  c.attributes.edge
];
class Ka extends H {
  static get defaultIcon() {
    return `${G}/misc/rss.svg`;
  }
  static get initiative() {
    return H.initiative + " + @attributes.logic.value";
  }
  getMatrixDetails() {
    return {
      hasMatrix: !0,
      logic: c.attributes.logic,
      firewall: c.attributes.logic,
      monitor: this.system.monitors.matrix,
      overflow: void 0
    };
  }
  getAttributes() {
    return Ba;
  }
  isEmerged() {
    return !0;
  }
}
const qa = [
  c.attributes.logic,
  c.attributes.firewall
];
class Xa extends H {
  static get defaultIcon() {
    return `${G}/misc/rub-el-hizb.svg`;
  }
  static get initiative() {
    return H.initiative + " + @attributes.logic.value";
  }
  getMatrixDetails() {
    return {
      hasMatrix: !0,
      logic: c.attributes.logic,
      firewall: c.attributes.firewall,
      monitor: this.system.monitors.matrix,
      overflow: void 0
    };
  }
  canSetMarks() {
    return !1;
  }
  getAttributes() {
    return qa;
  }
}
const yt = `${h}/token/hud-shortcuts.hbs`;
class Qa {
  constructor() {
    Hooks.on("renderTokenHUD", async (e, t, a) => await this.addExtensionHud(e, t, a._id)), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    await loadTemplates([
      yt
    ]);
  }
  /* -------------------------------------------- */
  async removeExtensionHud(e, t, a) {
    t.find(".control-icon.anarchy-shortcuts").remove();
  }
  async addExtensionHud(e, t, a) {
    e.hasExtension = !0;
    const s = await this._renderShortcuts(a);
    t.find(".control-icon[data-action=combat]").after(s);
  }
  async _renderShortcuts(e) {
    const t = canvas.tokens.get(e), a = {
      tokenId: e,
      shortcuts: t.actor.getShortcuts(),
      options: {
        classes: [game.system.anarchy.styles.selectCssClass()]
      }
    }, s = await renderTemplate(yt, a), i = $(s), n = i.find(".anarchy-shortcuts-list");
    return this._toggleHudActive(i, n), i.find(".anarchy-shortcuts-toggle").click((l) => {
      this._toggleHudActive(i, n);
    }), n.find(".anarchy-shortcut-button").click((l) => {
      const m = $(l.currentTarget).closest(".anarchy-shortcuts-list").attr("data-token-id"), y = $(l.currentTarget).attr("data-shortcut-type"), W = $(l.currentTarget).attr("data-shortcut-id");
      this.onClickShortcutButton(m, y, W);
    }), i;
  }
  onClickShortcutButton(e, t, a) {
    const s = canvas.tokens.get(e), i = s == null ? void 0 : s.actor;
    if (i) {
      const n = i == null ? void 0 : i.getShortcut(t, a);
      n == null || n.callback(s);
    } else
      ui.notifications.warn(game.i18.localize(o.common.errors.noTokenActor));
  }
  _toggleHudActive(e, t) {
    e.toggleClass("active"), f.showControlWhen(t, e.hasClass("active"));
  }
}
class Za {
  static getToken(e) {
    var a;
    if (e == null)
      return;
    let t = (a = game.scenes.current) == null ? void 0 : a.tokens.get(e);
    if (t)
      return t;
    for (let s of game.scenes)
      if (t = s.tokens.find((i) => i.id == e), t)
        return t;
    console.warn("No token found in any scene with id", e);
  }
}
const Ja = `${h}/chat/anarchy-roll.hbs`, es = [
  `${h}/chat/risk-outcome.hbs`,
  `${h}/chat/edge-reroll-button.hbs`,
  `${h}/chat/anarchy-roll-title.hbs`,
  `${h}/chat/parts/actor-image.hbs`,
  `${h}/chat/parts/generic-parameter.hbs`,
  `${h}/chat/parts/result-mode-weapon.hbs`
];
class T {
  constructor() {
    Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    await loadTemplates(f.distinct(es));
  }
  async roll(e) {
    var t, a;
    e.parameters.forEach((s) => {
      s.isUsed != null && (s.used = s.isUsed(s));
    }), e.param = game.system.anarchy.rollParameters.compute(e.parameters), e.param.edge = e.parameters.find((s) => s.category == C.edge && s.used) ? 1 : 0, e.param.anarchy = e.parameters.filter((s) => {
      var i;
      return ((i = s.flags) == null ? void 0 : i.isAnarchy) && s.used;
    }).length, e.options.canUseEdge = e.options.canUseEdge && !e.param.edge, e.param.social = {
      credibility: ((t = e.parameters.find((s) => s.code == "credibility" && s.used)) == null ? void 0 : t.value) ?? 0,
      rumor: ((a = e.parameters.find((s) => s.code == "rumor" && s.used)) == null ? void 0 : a.value) ?? 0
    }, await e.actor.spendAnarchy(e.param.anarchy), await e.actor.spendEdge(e.param.edge), await e.actor.spendCredibility(e.param.social.credibility), await e.actor.spendRumor(e.param.social.rumor), await this._roll(e);
  }
  async edgeReroll(e) {
    e = T.inflateAnarchyRoll(e), e.options.canUseEdge = !1, await e.actor.spendEdge(1), e.param[C.convergence] = void 0, e.param[C.drain] = void 0, await this._roll(e);
  }
  async _roll(e) {
    e.roll = new Oe(e.param), await e.roll.evaluate(), await this._displayRollInChat(e), await e.actor.rollDrain(e.param.drain), await e.actor.rollConvergence(e.param.convergence), await game.system.anarchy.combatManager.manageCombat(e);
  }
  async _displayRollInChat(e) {
    e.options.classes = [game.system.anarchy.styles.selectCssClass()];
    const t = {};
    M.prepareFlag(t, me, T.deflateAnarchyRoll(e)), M.prepareFlag(t, ze, e.options.canUseEdge), M.prepareFlag(t, Be, M.messageActorRights(e.actor));
    const a = await renderTemplate(Ja, e), s = await e.roll.toMessage({ flavor: a, flags: t });
    e.chatMessageId = s.id;
  }
  static deflateAnarchyRoll(e) {
    return e && (e = deepClone(e), e.actor = T._reduceToId(e.actor), e.skill = T._reduceToId(e.skill), e.skill = T._reduceToId(e.skill), e.weapon = T._reduceToId(e.weapon), e.item = T._reduceToId(e.item), e.parameters = T._reduceParameters(e.parameters), e.attackData = void 0, e.attributes = void 0, e.ANARCHY = void 0, e.ENUMS = void 0), e;
  }
  static inflateAnarchyRoll(e) {
    return e && (e = deepClone(e), e.actor = T._reloadActorFromId(e.actor, e.tokenId), e.skill = T._reloadItemFromId(e.actor, e.skill), e.item = T._reloadItemFromId(e.actor, e.item), e.weapon = T._reloadItemFromId(e.actor, e.weapon), e.attributes = e.actor.getUsableAttributes(e.item), e.parameters = T._reloadParameters(e, e.parameters), e.ANARCHY = o, e.ENUMS = S.getEnums()), e;
  }
  static _reduceToId(e) {
    return e ? { id: e.id } : void 0;
  }
  static _reloadActorFromId(e, t) {
    const a = Za.getToken(t);
    return a ? a.actor : e != null && e.id ? game.actors.get(e.id) : void 0;
  }
  static _reloadItemFromId(e, t) {
    return e && (t != null && t.id) ? e.items.get(t.id) : void 0;
  }
  static _reduceParameters(e) {
    return e.filter((t) => t.used).map((t) => ({
      code: t.code,
      value: t.value
    }));
  }
  static _reloadParameters(e, t) {
    if (!t)
      return t;
    const a = game.system.anarchy.rollParameters.build(e);
    return t.map((s) => {
      const i = a.find((n) => n.code == s.code) ?? {};
      return foundry.utils.mergeObject(s, i, { overwrite: !1 });
    });
  }
}
const ts = `${h}/combat/inform-defender.hbs`;
class as {
  async manageCombat(e) {
    var t;
    switch (e.mode) {
      case E.rollType.weapon:
        if (!e.targeting || e.roll.total == 0)
          return;
        (t = e.targeting.targetedTokenIds) == null || t.forEach(
          async (a) => await this.onAttack(a, e)
        );
        break;
      case E.rollType.defense:
        await this.onDefense(e);
        break;
      case E.rollType.defensePilot:
        await this.onDefensePilot(e);
    }
  }
  async onAttack(e, t) {
    var s;
    const a = (s = t.targeting) == null ? void 0 : s.attackerTokenId;
    e && a && await this.displayDefenseChoice(e, t);
  }
  async displayDefenseChoice(e, t, a = void 0, s = void 0) {
    var Ce, J, te;
    const i = (Ce = t.targeting) == null ? void 0 : Ce.attackerTokenId, n = this.getTokenActor(e), l = t.roll.total, m = (a == null ? void 0 : a.roll.total) ?? (s == null ? void 0 : s.roll.total) ?? 0, y = {
      attackerTokenId: i,
      defenderTokenId: e,
      attackRoll: T.deflateAnarchyRoll(t),
      defenseRoll: T.deflateAnarchyRoll(a),
      defensePilotRoll: T.deflateAnarchyRoll(s),
      attack: {
        isHit: l > 0 && l >= m,
        defense: t.weapon.getDefense(),
        pilotCanDefend: n == null ? void 0 : n.isVehicle(),
        success: Math.max(0, l - m),
        damage: t.weapon.getDamage()
      }
    }, W = [
      (J = y.defenseRoll) == null ? void 0 : J.chatMessageId,
      (te = y.defensePilotRoll) == null ? void 0 : te.chatMessageId,
      y.attackRoll.chatMessageId
    ], be = {};
    M.prepareFlag(be, Be, M.messageActorRights(n, n.getRightToDefend())), M.prepareFlag(be, Ve, W.find((Je) => Je != null));
    const le = await ChatMessage.create({
      user: game.user.id,
      whisper: n.getAllowedUserIds(n.getRightToDefend()),
      content: await renderTemplate(ts, foundry.utils.mergeObject(
        {
          ANARCHY: o,
          options: { classes: [game.system.anarchy.styles.selectCssClass()] },
          attacker: this.getTokenActor(y.attackerTokenId),
          defender: n,
          weapon: y.attackRoll.weapon
        },
        y
      )),
      flags: be
    });
    y.choiceChatMessageId = le.id, le.setFlag(L, me, y);
  }
  async onDefense(e) {
    this._preventObsoleteChoices(e);
    const t = T.inflateAnarchyRoll(e.attackRoll);
    await this.displayDefenseChoice(e.tokenId, t, e);
  }
  async onDefensePilot(e) {
    this._preventObsoleteChoices(e);
    const t = T.inflateAnarchyRoll(e.attackRoll);
    await this.displayDefenseChoice(e.tokenId, t, e);
  }
  _preventObsoleteChoices(e) {
    const t = game.messages.get(e.choiceChatMessageId);
    if (t) {
      const a = t.getFlag(L, Ve) ?? "", s = game.messages.get(a);
      s == null || s.setFlag(L, ze, !1), M.removeChatMessage(e.choiceChatMessageId);
    }
  }
  async onClickDefendAttack(e) {
    await this.getTokenActor(e.defenderTokenId).rollDefense(e);
  }
  async onClickPilotDefendAttack(e) {
    await this.getTokenActor(e.defenderTokenId).rollPilotDefense(e);
  }
  async onClickApplyAttackDamage(e) {
    const t = this.getTokenActor(e.attackerTokenId), a = this.getTokenActor(e.defenderTokenId), s = T.inflateAnarchyRoll(e.attackRoll);
    await v.sufferDamage(
      a,
      e.attack.damage.monitor,
      e.attack.damage.value,
      e.attack.success,
      e.attack.damage.noArmor,
      t,
      s.weapon
    ), this._preventObsoleteChoices(e);
  }
  getTokenActor(e) {
    var t;
    return (t = canvas.tokens.get(e)) == null ? void 0 : t.actor;
  }
}
class ss extends Ye {
  get template() {
    return `${h}/actor/character-tabbed.hbs`;
  }
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 720,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
    });
  }
  getData(e) {
    let t = super.getData(e);
    return t.options.classes.push("tabbed-sheet"), t;
  }
}
class Ze {
  static start() {
    const e = new Ze();
    Hooks.once("init", async () => await e.onInit());
  }
  async onInit() {
    console.log(P + "AnarchySystem.onInit"), game.system.anarchy = this, this.remoteCall = new j(), this.actorClasses = {
      character: ba,
      vehicle: va,
      device: ka,
      sprite: Ka,
      ic: Xa
    }, this.itemClasses = {
      contact: $a,
      cyberdeck: Ta,
      gear: La,
      metatype: Na,
      quality: Ga,
      shadowamp: Va,
      skill: Qe,
      weapon: Q
    }, this.hooks = new Z(), this.styles = new ea(), this.handlebarsManager = new Ne(), this.gmAnarchy = new Ot(), this.gmConvergence = new ja(), S.init(), this.skills = new zt(), this.modifiers = new A(), this.rollParameters = new ne(), this.rollManager = new T(), this.hudShortcuts = new Qa(), this.combatManager = new as(), console.log(P + "AnarchySystem.onInit | loading system"), CONFIG.ANARCHY = o, CONFIG.Combat.documentClass = gt, CONFIG.Combat.initiative = { formula: "2d6" }, CONFIG.Actor.documentClass = H, CONFIG.Item.documentClass = q, d.init(), this.loadActorSheets(), this.loadItemSheets(), Q.init(), B.init(), R.init(), Y.init(), gt.init(), I.init(), ce.init(), Oe.init(), q.init(), H.init(), v.init(), M.init(), this.gmManager = new Vt(this.gmAnarchy, this.gmConvergence), console.log(P + "AnarchySystem.onInit | done"), Hooks.once("ready", () => this.onReady());
  }
  async onReady() {
    console.log(P + "AnarchySystem.onReady"), game.user.isGM && new ya().migrate();
  }
  loadActorSheets() {
    Actors.unregisterSheet("core", ActorSheet), Actors.registerSheet(g, Ra, {
      label: game.i18n.localize(o.actor.characterSheet),
      makeDefault: !1,
      types: ["character"]
    }), Actors.registerSheet(g, Sa, {
      label: game.i18n.localize(o.actor.characterNPCSheet),
      makeDefault: !1,
      types: ["character"]
    }), Actors.registerSheet(g, ss, {
      label: game.i18n.localize(o.actor.characterTabbedSheet),
      makeDefault: !1,
      types: ["character"]
    }), Actors.registerSheet(g, je, {
      label: game.i18n.localize(o.actor.characterEnhancedSheet),
      makeDefault: !0,
      types: ["character"]
    }), Actors.registerSheet(g, Ha, {
      label: game.i18n.localize(o.actor.vehicleSheet),
      makeDefault: !0,
      types: ["vehicle"]
    }), Actors.registerSheet(g, Ma, {
      label: game.i18n.localize(o.actor.deviceSheet),
      makeDefault: !0,
      types: ["device"]
    }), Actors.registerSheet(g, za, {
      label: game.i18n.localize(o.actor.spriteSheet),
      makeDefault: !0,
      types: ["sprite"]
    }), Actors.registerSheet(g, Wa, {
      label: game.i18n.localize(o.actor.icSheet),
      makeDefault: !0,
      types: ["ic"]
    });
  }
  loadItemSheets() {
    Items.unregisterSheet("core", ItemSheet), Items.registerSheet(g, Ea, { types: ["contact"], makeDefault: !0 }), Items.registerSheet(g, Da, { types: ["cyberdeck"], makeDefault: !0 }), Items.registerSheet(g, Ya, { types: ["gear"], makeDefault: !0 }), Items.registerSheet(g, Oa, { types: ["metatype"], makeDefault: !0 }), Items.registerSheet(g, Ia, { types: ["quality"], makeDefault: !0 }), Items.registerSheet(g, _a, { types: ["shadowamp"], makeDefault: !0 }), Items.registerSheet(g, xa, { types: ["skill"], makeDefault: !0 }), Items.registerSheet(g, Pa, { types: ["weapon"], makeDefault: !0 });
  }
}
Ze.start();
//# sourceMappingURL=index.mjs.map
