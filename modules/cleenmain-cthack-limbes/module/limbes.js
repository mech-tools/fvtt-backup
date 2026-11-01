import MonkeysNews from "./monkeys-news.js";
import ModuleManagement from "./module-management.js";
import * as SETTINGS from "./constants.js";

import { registerForms } from "./forms.js";
import initControlButtons from "./control-buttons.js";

let moduleManagement = await new ModuleManagement().withModuleId(SETTINGS.MODULE_ID).withModuleVersion(SETTINGS.MODULE_VERSION).withSystems(SETTINGS.SYSTEMS);

let monkeysMessage = new MonkeysNews().withModuleId(SETTINGS.MODULE_ID);

Hooks.once("init", async () => {
  console.log(SETTINGS.LOG_HEADER + "Début de l'initialisation du module " + SETTINGS.MODULE_NAME);

  moduleManagement.registerSettings();

  monkeysMessage.registerSettings();

  /* Partie spécifique au module */  
  loadTemplates([]);
  // Add (or replace) prototype functions for integration in to the system

  // game.settings.register

  // Register Handlebars Helpers
  registerModHandlebarsHelpers();

  registerForms();

  initControlButtons();

  console.log(SETTINGS.LOG_HEADER + "Fin de l'initialisation du module " + SETTINGS.MODULE_NAME);
});

/*
 * READY HOOK
 */
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
};
