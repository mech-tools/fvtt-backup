const { HandlebarsApplicationMixin } = foundry.applications.api;
const { AbstractSidebarTab } = foundry.applications.sidebar;
import * as SETTINGS from "../constants.mjs";

export default class RoiSidebarMenu extends HandlebarsApplicationMixin(AbstractSidebarTab) {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    window: {
      title: "roidesgobelins.sidebar.title",
    },
    actions: {
      openForm: this._onOpenForm,
      openJournal: this._onOpenJournal,
    },
  };

  /** @override */
  static tabName = "roidesgobelins";

  /** @override */
  static PARTS = {
    roidesgobelins: {
      template: "modules/cleenmain-roidesgobelins/templates/sidebar-menu.hbs",
      root: true, // Permet d'avoir plusieurs sections dans le hbs
    },
  };

  static async _onOpenForm(event) {
    let calledForm = await game.settings.get("cleenmain-roidesgobelins", event.target.dataset.setting);
    calledForm.render(true);
  }
  static async _onOpenJournal(event) {
    let journal = game.journal.get(event.target.dataset.journal);
    if (journal) journal.sheet.render(true, { pageId: event.target.dataset.page, sheetMode: "text" });
  }

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    return Object.assign(context, {
      version: "Version " + (await game.settings.get(SETTINGS.MODULE_ID, SETTINGS.SETTING_MODULE_VERSION)),
      sidebarActions: SETTINGS.SIDEBAR_ACTIONS,
      moduleName: SETTINGS.MODULE_NAME
    });
  }
}
