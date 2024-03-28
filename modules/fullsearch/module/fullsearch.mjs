import * as SETTINGS from "./constants.mjs";
import { SearchChat } from "./search.mjs";
import { initControlButtons, initSearchChatBar } from "./entryinterface.mjs";
import registerModuleSettings from "./settings.mjs";

export default class FullsearchJournalSheet extends JournalSheet {}

/*
 * INIT HOOK
 */
Hooks.once("init", async () => {
  console.log(SETTINGS.LOG_HEADER + "Module initialization");

  Journal.registerSheet(game.system.id, FullsearchJournalSheet, { makeDefault: false });
  registerModuleSettings();
  preloadTemplates();

  const entryMethodSetting = game.settings.get("fullsearch", "entryMethod");
  if (entryMethodSetting === "chatBar") {
    /* Add the search chat bar */
    initSearchChatBar();
  } else {
    /* Add the search button */
    initControlButtons();
    console.log("entryMethodSetting : ", entryMethodSetting);
  }
  console.log(SETTINGS.LOG_HEADER + "Module initialization finished");
});

/*
 * READY HOOK
 */
Hooks.on("ready", async () => {
  if (game.user.isGM) {
    const searchMessages = game.messages.filter((m) => m.flags.world?.type === "searchPage");
    for (const message of searchMessages) {
      await SearchChat.updateMessage(message._id, true);
    }
  }
  console.log(SETTINGS.LOG_HEADER + "Module ready !");
});

/*
 * RENDER CHAT MESSAGE HOOK
 */
Hooks.on("renderChatMessage", (message, html, data) => {
  if (game.user.isGM) {
    console.debug("renderChatMessage", message, html, data);
    const typeMessage = data.message.flags.world?.type;
    if (typeMessage === "searchPage") {
      const messageId = data.message._id;
      html.find("#highlight").click(async (event) => await SearchChat.toggleEnricher(event, data.message.flags.world?.searchPattern, messageId));
    }
  }
});

async function preloadTemplates() {
  const templatePaths = [
    "modules/fullsearch/templates/chat/chatbar.hbs",
    "modules/fullsearch/templates/chat/search-result.hbs",
    "modules/fullsearch/templates/search/search-dialog.hbs",
  ];

  return loadTemplates(templatePaths);
}
