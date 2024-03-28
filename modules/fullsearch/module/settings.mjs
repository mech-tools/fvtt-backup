import * as SETTINGS from "./constants.mjs";

export default function registerModuleSettings() {
  game.settings.register("fullsearch", "entryMethod", {
    config: true,
    scope: "world",
    name: "FULLSEARCH.settings.entryMethodName",
    hint: "FULLSEARCH.settings.entryMethodHint",
    type: String,
    choices: {
      chatBar: "FULLSEARCH.settings.chatBar",
      controlButton: "FULLSEARCH.settings.controlButton",
    },
    default: "chatBar",
    requiresReload: true,
  });
}
