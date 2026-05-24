export const SETTING_IMPORTED = "imported";
export const SETTING_MODULE_VERSION = "moduleVersion";
export const SETTING_ADVENTURE_VERSION = "adventureVersion";
export const SETTING_MONKEYS_MESSAGE_VERSION = "monkeysMessageVersion";

export const LOG_HEADER = "LE ROI DES GOBELINS | ";
export const LOG_HEADER_UPDATE_MODULE = "Mise à jour du module vers la version ";

export const MODULE_ID = "cleenmain-roidesgobelins";
export const MODULE_NAME = "Le roi des gobelins";

export const ADVENTURE_ID = "pKieWRe8DYI5OJ5N";

export const MODULE_VERSION = "3.1.0";
export const ADVENTURE_VERSION = "1.1.0";

export const SYSTEMS = {
  cleenmain: {
    adventurePackName: "cleenmain-roidesgobelins.cleenmain_roidesgobelins",
    adventureId: ADVENTURE_ID,
    systemName: "Clé en main",
    adventureVersion: ADVENTURE_VERSION,
    adventurePackLabel: MODULE_NAME,
    welcomeJournalEntryId: "iQEwwJsE5huOgQwl", // The Id a journal entry to display after import.
  },
};

export const MESSAGE_URL = "https://raw.githubusercontent.com/12-Monkeys-Developers/news-messages/main/messages.json";

export const SIDEBAR_ACTIONS = {
  reglesCem: {
    action: "openJournal",
    journalId: "EOOAGdLL3LgnKAi5",
    pageId: "cZQwHDWFAcWywTUz",
    icon: "fas fa-book-reader",
    tooltip: "cleenmain-roidesgobelins.gmtools.regles",
    section: "help",
    gmOnly: false
  },
  objectifsform: {
    action: "openForm",
    setting: "objectifsform",
    icon: "fal fa-bullseye-arrow",
    tooltip: "cleenmain-roidesgobelins.gmtools.objectifsform",
    section: "forms",
    gmOnly: false
  },
  bilansform: {
    action: "openForm",
    setting: "bilansform",
    icon: "fas fa-file-spreadsheet",
    tooltip: "cleenmain-roidesgobelins.gmtools.bilan_title",
    section: "forms",
    gmOnly: true
  },
};
