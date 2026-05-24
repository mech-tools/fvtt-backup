import MonkeysNews from "./monkeys-news.mjs";
import ModuleManagement from "./module-management.mjs";
import * as SETTINGS from "./constants.mjs";

import { registerForms } from "./applications/forms.mjs";
import * as applications from "./applications/_module.mjs";

let moduleManagement = await new ModuleManagement().withModuleId(SETTINGS.MODULE_ID).withModuleVersion(SETTINGS.MODULE_VERSION).withSystems(SETTINGS.SYSTEMS);

let monkeysMessage = new MonkeysNews().withModuleId(SETTINGS.MODULE_ID);

/*
 * INIT HOOK
 */
Hooks.once("init", async () => {
  console.log(SETTINGS.LOG_HEADER + "Début de l'initialisation du module " + SETTINGS.MODULE_NAME);

  moduleManagement.registerSettings();

  monkeysMessage.registerSettings();

  /* Partie spécifique au module */

  foundry.applications.handlebars.loadTemplates([
    "modules/cleenmain-roidesgobelins/templates/forms/partials/bilanscen1.hbs",
    "modules/cleenmain-roidesgobelins/templates/forms/partials/bilanscen2.hbs",
    "modules/cleenmain-roidesgobelins/templates/forms/partials/bilanscen3.hbs",
    "modules/cleenmain-roidesgobelins/templates/forms/partials/bilanscen4.hbs",
    "modules/cleenmain-roidesgobelins/templates/forms/partials/pointsdeconspiration.hbs",
    "modules/cleenmain-roidesgobelins/templates/sidebar-menu.hbs",
  ]);

  // Register Handlebars Helpers
  registerModHandlebarsHelpers();

  registerForms();

  // Add a custom sidebar tab
  CONFIG.ui.sidebar.TABS.roidesgobelins = {
    icon: "far fa-crown",
    tooltip: "Roi des gobelins"
  };
  CONFIG.ui.roidesgobelins = applications.RoiSidebarMenu;

  console.log(SETTINGS.LOG_HEADER + "Fin de l'initialisation du module " + SETTINGS.MODULE_NAME);
});

Hooks.on("ready", () => {
  // Si le module est activé pour la première fois, affiche la fenêtre d'importation de l'aventure
  if (!game.settings.get(SETTINGS.MODULE_ID, SETTINGS.SETTING_IMPORTED) && game.user.isGM) {
    moduleManagement.moduleImport(game.system.id);
  } else if (game.user.isGM) {
    let installedModuleVersion = game.settings.get(SETTINGS.MODULE_ID, SETTINGS.SETTING_MODULE_VERSION);
    // Si le module a déjà été installé et que c'est une nouvelle version, mise à jour du module
    if (game.settings.get(SETTINGS.MODULE_ID, SETTINGS.SETTING_IMPORTED) && foundry.utils.isNewerVersion(SETTINGS.MODULE_VERSION, installedModuleVersion)) {
      moduleManagement.updateModule(game.system.id);
    }
  }
  /* Partie spécifique au module */
  //update user list for secret goals
  updateUserList();

  monkeysMessage.sendChatMessage();
  console.log(SETTINGS.LOG_HEADER + "Module " + SETTINGS.MODULE_NAME + " prêt !");
});

/*
 * IMPORT ADVENTURE HOOK
 */
Hooks.on("importAdventure", (adventure, created, updated) => {
  /* Partie spécifique au module */
  if (created || updated) {
  }

  // Import de l'avventure
  moduleManagement.adventureImport(game.system.id, adventure, created, updated);
});

const registerModHandlebarsHelpers = function () {
  // If is not equal
  Handlebars.registerHelper("ifne", function (v1, v2, options) {
    if (v1 !== v2) return options.fn(this);
    else return options.inverse(this);
  });

  // if not
  Handlebars.registerHelper("ifn", function (v1, options) {
    if (!v1) return options.fn(this);
    else return options.inverse(this);
  });

  // if equal
  Handlebars.registerHelper("ife", function (v1, v2, options) {
    if (v1 === v2) return options.fn(this);
    else return options.inverse(this);
  });
  
	Handlebars.registerHelper('gmTest', function(gmOnly) {
		return (game.user.isGM || !gmOnly);
	});
};

async function updateUserList() {
  let formdata = game.settings.get("cleenmain-roidesgobelins", "objectifs");
  let modified = false;
  //add new users
  for (let user of game.users) {
    if (user.role === 1) {
      if (!formdata.user[user._id]) {
        formdata.user[user._id] = {
          name: user.name,
          id: user._id,
          pc: 0,
          scenario1: { objectif: "Aucun", charname: "", boxes: {} },
          scenario2: { objectif: "Aucun", charname: "", boxes: {} },
          scenario3: { objectif: "Aucun", charname: "", boxes: {} },
          scenario4: { objectif: "Aucun", charname: "", boxes: {} },
          scenario5: { objectif: "Aucun", charname: "", boxes: {} },
        };
        modified = true;
      }
    }
  }
  //delete user if they don't exist anymore
  for (let user in formdata.user) {
    if (!game.users.get(user)) {
      delete formdata.user[user];
    }
  }

  if (modified) {
    await game.settings.set("cleenmain-roidesgobelins", "objectifs", formdata);
  }
  return;
}
