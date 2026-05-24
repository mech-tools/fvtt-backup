const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

// Register forms and forms contents
export function registerForms() {
  game.settings.register("cleenmain-roidesgobelins", "impactobsform", {
    name: "Impacts dirigeable Obsidienne",
    type: ImpactObsForm,
    config: false,
    default: false,
    scope: "world",
  });
  game.settings.register("cleenmain-roidesgobelins", "impactmarbreform", {
    name: "Impacts dirigeable Marbre",
    type: ImpactMarbreForm,
    config: false,
    default: false,
    scope: "world",
  });
  game.settings.register("cleenmain-roidesgobelins", "jaugealerteform", {
    name: "Jauge d'alerte scénario 3",
    type: JaugeAlerteForm,
    config: false,
    default: false,
    scope: "world",
  });
  game.settings.register("cleenmain-roidesgobelins", "jaugealertebisform", {
    name: "Jauge d'alerte bis scénario 3",
    type: JaugeAlerteBisForm,
    config: false,
    default: false,
    scope: "world",
  });
  game.settings.register("cleenmain-roidesgobelins", "jaugerenfortsform", {
    name: "Jauge renforts scénario 3",
    type: JaugeRenfortsForm,
    config: false,
    default: false,
    scope: "world",
  });
  game.settings.register("cleenmain-roidesgobelins", "dechargerbutinform", {
    name: "Jauge renforts scénario 3",
    type: DechargerButinForm,
    config: false,
    default: false,
    scope: "world",
  });
  game.settings.register("cleenmain-roidesgobelins", "dechargerbutinbonusform", {
    name: "Jauge renforts scénario 3",
    type: DechargerButinBonusForm,
    config: false,
    default: false,
    scope: "world",
  });
  game.settings.register("cleenmain-roidesgobelins", "bilansform", {
    name: "Bilan des scénarios",
    type: BilansForm,
    config: false,
    default: false,
    scope: "world",
  });
  game.settings.register("cleenmain-roidesgobelins", "objectifsform", {
    name: "Suivi des objectifs",
    type: ObjectifsForm,
    config: false,
    default: false,
    scope: "world",
  });

  ImpactMarbreForm.registerDefault();
  ImpactObsForm.registerDefault();
  DechargerButinForm.registerDefault();
  DechargerButinBonusForm.registerDefault();
  BilansForm.registerDefault();
  JaugeAlerteForm.registerDefault();
  JaugeAlerteBisForm.registerDefault();
  JaugeRenfortsForm.registerDefault();
  ObjectifsForm.registerDefault();
}

export class PresentationForm extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    classes: ["roidesgobelins-mod", "roidesgobelins-forms", "scrollable"],
    tag: "form",
    form: {
      submitOnChange: false,
      closeOnSubmit: true,
    },
    window: {
      resizable: true,
      icon: "fas fa-gear",
    },
    position: { width: 900 },
    actions: {
      toggleLockMode: this._toggleLockMode,
    },
  };

  unLockForm = false;

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    
    context.document = this.document;
    context.system = game.system.id;

    context.unlocked = this.unLockForm;
    return context;
  }
  /* -------------------------------------------------- */
  /*   Actions                                          */
  /* -------------------------------------------------- */

  /**
   * Toggle Lock vs. Unlock sheet
   *
   * @this
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   */
  static async _toggleLockMode(event, target) {
    this.unLockForm = !this.unLockForm;
    this.render();
  }
};

export class SuiviSmallForm extends PresentationForm {
static DEFAULT_OPTIONS = {
    position: { width: 400, height: 200 },
      id: "suivi-small-form",
    };

  static PARTS = {
    smallform: {
      template: "modules/cleenmain-roidesgobelins/templates/forms/suivismallform.hbs",
    }
  };
  get title() {
    return this.settingTitle;
  };
  //settingName = "suiviRef";
  settingTitle = game.i18n.localize("cleenmain-roidesgobelins.gmtools.suivi_small");

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return context;
  }
  _onRender(context, options) {
    const actionCheckBoxes = this.element.querySelectorAll("input[name='boxelement']");
    for (const actionCheckBox of actionCheckBoxes) {
      actionCheckBox.addEventListener("click", async (ev) => {
        this._changeCheckbox(ev);
      });
    }
  }

  async _changeCheckbox(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let modifiedBox = event.currentTarget.dataset.field;
    let reference = await game.settings.get("cleenmain-roidesgobelins", this.settingName);
    reference.boxes[modifiedBox].value = !reference.boxes[modifiedBox].value;
    await game.settings.set("cleenmain-roidesgobelins", this.settingName, reference);
    this.render();
  }
};

export class ImpactObsForm extends SuiviSmallForm {
  settingName = "impact_obs";
  settingTitle = "Impacts dirigeable Obsidienne";

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    let oldData= game.settings.get("cleenmain-roidesgobelins", "impact_obs");
    let numberOfPlayers = game.settings.get("cleenmain", "numberOfPlayers");
    let hits = 25;
    switch (numberOfPlayers) {
      case "two":
        hits = 10;
        break;
      case "three":
        hits = 15;
        break;
      case "four":
        hits = 20;
        break;
    }
    context.reference = {
      title: oldData.formdata.title,
      boxes: {},
    };
    for (let i = 0; i < hits; i++) {
      let boxname = "box" + (i + 1).toString();
      context.reference.boxes[boxname] = oldData.formdata.boxes[boxname];
    }
    return context;
  }
  static registerDefault() {
    game.settings.register("cleenmain-roidesgobelins", "impact_obs", {
      name: "Suivi des impacts du dirigeable Obsidienne",
      type: null,
      config: false,
      scope: "world",
      default: {
        title: "Suivi des impacts du dirigeable Obsidienne",
        boxes: {
          box1: { name: "box1", value: false },
          box2: { name: "box2", value: false },
          box3: { name: "box3", value: false },
          box4: { name: "box4", value: false },
          box5: { name: "box5", value: false },
          box6: { name: "box6", value: false },
          box7: { name: "box7", value: false },
          box8: { name: "box8", value: false },
          box9: { name: "box9", value: false },
          box10: { name: "box10", value: false },
          box11: { name: "box11", value: false },
          box12: { name: "box12", value: false },
          box13: { name: "box13", value: false },
          box14: { name: "box14", value: false },
          box15: { name: "box15", value: false },
          box16: { name: "box16", value: false },
          box17: { name: "box17", value: false },
          box18: { name: "box18", value: false },
          box19: { name: "box19", value: false },
          box20: { name: "box20", value: false },
          box21: { name: "box21", value: false },
          box22: { name: "box22", value: false },
          box23: { name: "box23", value: false },
          box24: { name: "box24", value: false },
          box25: { name: "box25", value: false },
        },
      },
    });
  }
}
export class ImpactMarbreForm extends SuiviSmallForm {
  settingName = "impact_marbre";
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.formdata= game.settings.get("cleenmain-roidesgobelins", "impact_marbre");
    return context;
  }
  static registerDefault() {
    game.settings.register("cleenmain-roidesgobelins", "impact_marbre", {
      name: "Suivi des impacts du dirigeable Marbre",
      type: null,
      config: false,
      scope: "world",
      default: {
        title: "Suivi des impacts du dirigeable Marbre",
        boxes: {
          box1: { name: "box1", value: false },
          box2: { name: "box2", value: false },
          box3: { name: "box3", value: false },
          box4: { name: "box4", value: false },
          box5: { name: "box5", value: false },
          box6: { name: "box6", value: false },
          box7: { name: "box7", value: false },
          box8: { name: "box8", value: false },
          box9: { name: "box9", value: false },
          box10: { name: "box10", value: false },
        },
      },
    });
  }
}
export class JaugeAlerteForm extends SuiviSmallForm {
  settingName = "jauge_alerte";
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.formdata= game.settings.get("cleenmain-roidesgobelins", "jauge_alerte");
    return context;
  }
  static registerDefault() {
    game.settings.register("cleenmain-roidesgobelins", "jauge_alerte", {
      name: "Jauge d'alerte du scénario 3",
      type: null,
      config: false,
      scope: "world",
      default: {
        title: "Jauge d'alerte Scénario 3",
        boxes: {
          box1: { name: "box1", value: false },
          box2: { name: "box2", value: false },
          box3: { name: "box3", value: false },
          box4: { name: "box4", value: false },
          box5: { name: "box5", value: false },
          box6: { name: "box6", value: false },
          box7: { name: "box7", value: false },
          box8: { name: "box8", value: false },
          box9: { name: "box9", value: false },
          box10: { name: "box10", value: false },
          box11: { name: "box11", value: false },
          box12: { name: "box12", value: false },
        },
      },
    });
  }
}
export class JaugeAlerteBisForm extends SuiviSmallForm {
  settingName = "jauge_alertebis";
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.formdata= game.settings.get("cleenmain-roidesgobelins", "jauge_alertebis");
    return context;
  }
  static registerDefault() {
    game.settings.register("cleenmain-roidesgobelins", "jauge_alertebis", {
      name: "Alerte bis",
      type: null,
      config: false,
      scope: "world",
      default: {
        title: "Alerte bis",
        boxes: {
          box1: { name: "box1", value: false },
          box2: { name: "box2", value: false },
          box3: { name: "box3", value: false },
          box4: { name: "box4", value: false },
          box5: { name: "box5", value: false },
          box6: { name: "box6", value: false },
          box7: { name: "box7", value: false },
          box8: { name: "box8", value: false },
        },
      },
    });
  }
}
export class JaugeRenfortsForm extends SuiviSmallForm {
  settingName = "jauge_renforts";
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.formdata= game.settings.get("cleenmain-roidesgobelins", "jauge_renforts");
    return context;
  }
  static registerDefault() {
    game.settings.register("cleenmain-roidesgobelins", "jauge_renforts", {
      name: "Renforts Tour de pierre",
      type: null,
      config: false,
      scope: "world",
      default: {
        title: "Arrivée du chef de horde en renfort",
        boxes: {
          box1: { name: "box1", value: false },
          box2: { name: "box2", value: false },
          box3: { name: "box3", value: false },
          box4: { name: "box4", value: false },
          box5: { name: "box5", value: false },
          box6: { name: "box6", value: false },
          box7: { name: "box7", value: false },
          box8: { name: "box8", value: false },
        },
      },
    });
  }
}
export class DechargerButinForm extends SuiviSmallForm {
  settingName = "decharger_butin";
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.formdata= game.settings.get("cleenmain-roidesgobelins", "decharger_butin");
    return context;
  }
  static registerDefault() {
    game.settings.register("cleenmain-roidesgobelins", "decharger_butin", {
      name: "Rounds de déchargement du butin",
      type: null,
      config: false,
      scope: "world",
      default: {
        title: "Rounds de déchargement du butin",
        boxes: {
          box1: { name: "box1", value: false },
          box2: { name: "box2", value: false },
          box3: { name: "box3", value: false },
          box4: { name: "box4", value: false },
          box5: { name: "box5", value: false },
        },
      },
    });
  }
}
export class DechargerButinBonusForm extends SuiviSmallForm {
  settingName = "decharger_butin_bonus";
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.formdata= game.settings.get("cleenmain-roidesgobelins", "decharger_butin_bonus");
    return context;
  }
  static registerDefault() {
    game.settings.register("cleenmain-roidesgobelins", "decharger_butin_bonus", {
      name: "Rounds bonus pour décharger le butin",
      type: null,
      config: false,
      scope: "world",
      default: {
        title: "Rounds bonus pour décharger le butin",
        boxes: {
          box1: { name: "box1", value: false },
          box2: { name: "box2", value: false },
          box3: { name: "box3", value: false },
          box4: { name: "box4", value: false },
          box5: { name: "box5", value: false },
          box6: { name: "box6", value: false },
          box7: { name: "box7", value: false },
          box8: { name: "box8", value: false },
          box9: { name: "box9", value: false },
          box10: { name: "box10", value: false },
        },
      },
    });
  }
}
export class BilansForm extends PresentationForm {
  static DEFAULT_OPTIONS = {
    position: { width: 700, height: 600 },
    id: "bilansform",
  };

  static PARTS = {
    header: {
      template: "modules/cleenmain-roidesgobelins/templates/forms/partials/bilanheader.hbs",
    },
    bilanscen1: {
      template: "modules/cleenmain-roidesgobelins/templates/forms/partials/bilanscen1.hbs",
    },
    bilanscen2: {
      template: "modules/cleenmain-roidesgobelins/templates/forms/partials/bilanscen2.hbs",
    },
    bilanscen3: {
      template: "modules/cleenmain-roidesgobelins/templates/forms/partials/bilanscen3.hbs",
    },
    bilanscen4: {
      template: "modules/cleenmain-roidesgobelins/templates/forms/partials/bilanscen4.hbs",
    },
    pointsdeconspiration: {
      template: "modules/cleenmain-roidesgobelins/templates/forms/partials/pointsdeconspiration.hbs",
    }
  };
  get title() {
    return game.i18n.localize("cleenmain-roidesgobelins.gmtools.bilan_title");
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.system = game.system.id;

    context.formdata= game.settings.get("cleenmain-roidesgobelins", "bilans");
    context.formdata.pc_obsidienne_consolide = context.formdata.pc_obsidienne + parseInt(context.formdata.pc_obsidienne_free);
    context.formdata.pc_basalte_consolide = context.formdata.pc_basalte + parseInt(context.formdata.pc_basalte_free);
    context.formdata.pc_granit_consolide = context.formdata.pc_granit + parseInt(context.formdata.pc_granit_free);

    context.formdata.objectifs=game.settings.get("cleenmain-roidesgobelins", "objectifs");

  context.tabs = this._getTabs(["bilanscen1", "bilanscen2", "bilanscen3", "bilanscen4", "pointsdeconspiration"], "bilanscen1");
    return context;
  }
  /**
   * Generates the data for the generic tab navigation template
   * @param {string[]} parts An array of named template parts to render
   * @param {string} defaultTab the name of the starting tab
   * @returns {Record<string, Partial<ApplicationTab>>}
   * @protected
   */
  _getTabs(parts, defaultTab) {
    const tabGroup = "primary";
    // Default tab for first time it's rendered this session
    if (!this.tabGroups[tabGroup]) this.tabGroups[tabGroup] = defaultTab;
    return parts.reduce((tabs, partId) => {
      const tab = {
        cssClass: "",
        group: tabGroup,
        // Matches tab property to
        id: "",
        // FontAwesome Icon, if you so choose
        icon: "",
        // Run through localization
        tooltip: "cleenmain-roidesgobelins.gmtools.tabs.",
        active: false,
      };
      switch (partId) {
        case "header":
        case "tabs":
          return tabs;
        case "bilanscen1":
          tab.id = "bilanscen1";
          tab.tooltip += "bilanscen1";
          tab.icon = "fa-solid fa-house-turret";
          break;
        case "bilanscen2":
          tab.id = "bilanscen2";
          tab.tooltip += "bilanscen2";
          tab.icon = "fa-solid fa-landmark";
          break;
        case "bilanscen3":
          tab.id = "bilanscen3";
          tab.tooltip += "bilanscen3";
          tab.icon = "fa-regular fa-crown";
          break;
        case "bilanscen4":
          tab.id = "bilanscen4";
          tab.tooltip += "bilanscen4";
          tab.icon = "fa-solid fa-mountains";
          break;
        case "pointsdeconspiration":
          tab.id = "pointsdeconspiration";
          tab.tooltip += "pointsdeconspiration";
          tab.icon = "fa-regular fa-book-user";
          break;
      }
      if (this.tabGroups[tabGroup] === tab.id) {
        tab.cssClass = "active";
        tab.active = true;
      }
      tabs[partId] = tab;
      return tabs;
    }, {});
  }

  /** @override */
  async _preparePartContext(partId, context, options) {
    await super._preparePartContext(partId, context, options);
    switch (partId) {
      case "bilanscen1":
        context.tab = context.tabs[partId];
        break;
      case "bilanscen2":
        context.tab = context.tabs[partId];
        break;
      case "bilanscen3":
        context.tab = context.tabs[partId];
        break;
      case "bilanscen4":
        context.tab = context.tabs[partId];
        break;
      case "pointsdeconspiration":
        context.tab = context.tabs[partId];
        break;
    }
    return context;
  }


  
  static registerDefault() {
    game.settings.register("cleenmain-roidesgobelins", "bilans", {
      name: "Bilan des scénarios",
      type: null,
      config: false,
      scope: "world",
      default: {
        pc_basalte: 0,
        pc_obsidienne: 0,
        pc_granit: 0,
        pc_basalte_free: 0,
        pc_obsidienne_free: 0,
        pc_granit_free: 0,
        scenario1: {
          box1: {
            value: false,
            pc_obsidienne: 5,
          },
          box2: {
            value: false,
            pc_obsidienne: 5,
          },
          box3: {
            value: false,
            pc_obsidienne: 2,
          },
          box4: {
            value: false,
            pc_obsidienne: 2,
          },
          box5: {
            value: false,
            pc_obsidienne: 5,
          },
          box6: {
            value: false,
          },
          box7: {
            value: false,
            pc_obsidienne: 2,
          },
          box8: {
            value: false,
            pc_obsidienne: 2,
          },
        },
        scenario2: {
          box1: {
            value: false,
            pc_basalte: 5,
          },
          box2: {
            value: false,
          },
          box3: {
            value: false,
            pc_basalte: 2,
          },
          box4: {
            value: false,
            pc_basalte: 5,
          },
          box5: {
            value: false,
            pc_basalte: 5,
          },
          box6: {
            value: false,
            pc_basalte: 5,
          },
          box7: {
            value: false,
            pc_basalte: 2,
          },
        },
        scenario3: {
          box1: {
            value: false,
            pc_obsidienne: 5,
          },
          box2: {
            value: false,
          },
          box3: {
            value: false,
            pc_obsidienne: 5,
          },
          box4: {
            value: false,
            pc_obsidienne: 2,
          },
          box5: {
            value: false,
            pc_obsidienne: 10,
          },
          box6: {
            value: false,
            pc_basalte: 10,
          },
        },
        scenario4: {
          box1: {
            value: false,
            pc_granit: 5,
          },
          box2: {
            value: false,
            pc_granit: 5,
          },
          box3: {
            value: false,
            pc_granit: 10,
          },
          box4: {
            value: false,
          },
        },
      },
    });
  }

  _onRender(context, options) {
    const actionButtons = this.element.querySelectorAll("input[name='jaugebox']");
    for (const actionButton of actionButtons) {
      actionButton.addEventListener("click", async (ev) => {
        this._changeCheckbox(ev);
      });
    }
    const actionInputtexts = this.element.querySelectorAll("input[name='inputtext']");
    for (const actionInputtext of actionInputtexts) {
      actionInputtext.addEventListener("change", async (ev) => {
        this._changeInput(ev);
      });
    }
    const actionInputPc = this.element.querySelectorAll("input[name='inputpc']");
    for (const actionInputtext of actionInputtexts) {
      actionInputtext.addEventListener("change", async (ev) => {
        this._changeInputPc(ev);
      });
    }
  }

  async _changeCheckbox(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let modifiedGroup = event.currentTarget.dataset.group;
    let modifiedBox = event.currentTarget.dataset.field;
    let reference = game.settings.get("cleenmain-roidesgobelins", "bilans");
    reference[modifiedGroup][modifiedBox].value = !reference[modifiedGroup][modifiedBox].value;
    if (reference[modifiedGroup][modifiedBox].pc_basalte) {
      reference.pc_basalte += reference[modifiedGroup][modifiedBox].pc_basalte * (reference[modifiedGroup][modifiedBox].value ? 1 : -1);
    }
    if (reference[modifiedGroup][modifiedBox].pc_obsidienne) {
      reference.pc_obsidienne += reference[modifiedGroup][modifiedBox].pc_obsidienne * (reference[modifiedGroup][modifiedBox].value ? 1 : -1);
    }
    if (reference[modifiedGroup][modifiedBox].pc_granit) {
      reference.pc_granit += reference[modifiedGroup][modifiedBox].pc_granit * (reference[modifiedGroup][modifiedBox].value ? 1 : -1);
    }
    await game.settings.set("cleenmain-roidesgobelins", "bilans", reference);
    this.render();
  }

  async _changeInput(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let reference = game.settings.get("cleenmain-roidesgobelins", "bilans");
    let modifiedValue = event.currentTarget.dataset.field;
    let newValue = event.currentTarget.value;
    reference[modifiedValue] = newValue;

    await game.settings.set("cleenmain-roidesgobelins", "bilans", reference);
    this.render();
  }

  async _changeInputPc(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let reference = game.settings.get("cleenmain-roidesgobelins", "objectifs");
    let userId = event.currentTarget.dataset.id;
    let newValue = event.currentTarget.value;
    reference.user[userId].pc = newValue;
    await game.settings.set("cleenmain-roidesgobelins", "objectifs", reference);
    this.render();
  }
}
export class ObjectifsForm extends PresentationForm {
  static DEFAULT_OPTIONS = {
    
      id: "objectifsform",
    position: { width: 700,
      height: 600 },
  };

  static PARTS = {
    suivi_objectifs: {
      template: "modules/cleenmain-roidesgobelins/templates/forms/suivi_objectifs.hbs",
    },
  };
  get title() {
    return "Suivi des objectifs";
  }
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.formdata= game.settings.get("cleenmain-roidesgobelins", "objectifs");
    context.formdata.isGM = game.user.isGM;
    return context;
  }
  async _updateObject(event, formdata) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (game.user.isGM) {
      let reference = game.settings.get("cleenmain-roidesgobelins", "objectifs");
      foundry.utils.mergeObject(reference, formdata);
      await game.settings.set("cleenmain-roidesgobelins", "objectifs", reference);
      this.render();
    }
  }
  static registerDefault() {
    game.settings.register("cleenmain-roidesgobelins", "objectifs", {
      name: "Suivi des objectifs",
      type: null,
      config: false,
      scope: "world",
      default: {
        title: "Suivi des objectifs",
        user: {},
      },
    });
  }
  _onRender(context, options) {
    const actionButtons = this.element.querySelectorAll(".button");
    for (const actionButton of actionButtons) {
      actionButton.addEventListener("click", async (ev) => {
        this._clickButton(ev);
      });
    }
    const actionInputtexts = this.element.querySelectorAll("input[name='inputtext']");
    for (const actionInputtext of actionInputtexts) {
      actionInputtext.addEventListener("change", async (ev) => {
        this._changeInput(ev);
      });
    }
  }

  async _changeInput(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (game.user.isGM) {
      let reference = game.settings.get("cleenmain-roidesgobelins", "objectifs");
      let modifiedGroup = event.currentTarget.dataset.group;
      let modifiedValue = event.currentTarget.dataset.field;
      let userId = event.currentTarget.dataset.id;
      let newValue = event.currentTarget.value;
      reference.user[userId][modifiedGroup][modifiedValue] = newValue;
      await game.settings.set("cleenmain-roidesgobelins", "objectifs", reference);
      this.render();
    }
  }

  async _clickButton(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (game.user.isGM) {
      let playerNumber = game.users.size -1;
      let reference = game.settings.get("cleenmain-roidesgobelins", "objectifs");
      let modifiedScenario = event.currentTarget.dataset.field;
      let table = game.tables.get("O4F55LRZD1zrGX3M");
      await table.resetResults();
      let r = new Roll("1d"+playerNumber.toString());
      let result = await table.drawMany(playerNumber, {roll: r});
      await table.resetResults();
      let i = 0;
      for (let user of game.users) {
        if (user.role === 1) {
          reference.user[user._id][modifiedScenario].objectif = result.results[i].name;
          i++;
        }
      }
      await game.settings.set("cleenmain-roidesgobelins", "objectifs", reference);
      this.render();
    }
  }
}
