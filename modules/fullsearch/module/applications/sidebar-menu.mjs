const { HandlebarsApplicationMixin } = foundry.applications.api;
const { AbstractSidebarTab } = foundry.applications.sidebar;
import { SearchDialog, SearchChat } from "../search.mjs";

export default class FullsearchSidebarMenu extends HandlebarsApplicationMixin(AbstractSidebarTab) {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    window: {
      title: "FULLSEARCH.sidebar.title",
    },
    actions: {
      openDialog: this._onOpenSearchDialog,
    },
  };

  /** @override */
  static tabName = "fullsearch";

  /** @override */
  static PARTS = {
    limbes: {
      template: "modules/fullsearch/templates/sidebar-menu.hbs",
      root: true, // Permet d'avoir plusieurs sections dans le hbs
    },
  };

  /**
   * Actions performed after any render of the Application.
   * Post-render steps are not awaited by the render process.
   * @param {ApplicationRenderContext} context      Prepared context data
   * @param {RenderOptions} options                 Provided render options
   * @protected
   */
  _onRender(context, options) {
    const actionInputtexts = this.element.querySelectorAll("input[name='inputtext']");
    for (const actionInputtext of actionInputtexts) {
      actionInputtext.addEventListener("change", async (ev) => {
        this._changeInput(ev);
      });
    }
  }

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const userSearchSetting = game.settings.get("fullsearch", "userSearch");

    return Object.assign(context, {
      showToUser: game.user.isGM || userSearchSetting,
    });
  }

  async _changeInput(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let searchPattern = event.currentTarget.value;
    //console.log("newValue", newValue);
    if (searchPattern) {
      let search = await new SearchChat().create(searchPattern);
      await search.searchWorld();
      await search.display();
    }
    this.render();
  }

  static async _onOpenSearchDialog(event) {
    let searchDialog = new SearchDialog().render(true);
  }
}
