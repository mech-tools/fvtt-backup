import { SearchDialog, SearchChat } from "./search.mjs";

//add the search icon in left menu
export function initControlButtons() {
  CONFIG.Canvas.layers.fullsearch = { layerClass: ControlsLayer, group: "primary" };

  Hooks.on("getSceneControlButtons", (btns) => {
    const userSearchSetting = game.settings.get("fullsearch", "userSearch");
    let menu = [];
    if (game.user.isGM || userSearchSetting) {
      menu.push({
        name: "fullsearch",
        title: "FULLSEARCH.dialog_title",
        icon: "fas fa-magnifying-glass",
        button: true,
        onClick: async () => {
          let searchDialog = await new SearchDialog().render(true);
        },
      });
      btns.push({
        name: "fullsearch",
        title: "FULLSEARCH.dialog_title",
        icon: "fas fa-magnifying-glass",
        layer: "fullsearch",
        tools: menu,
      });
    }
  });
}

//add the search icon in left menu
export function initSearchChatBar() {
  Hooks.on("renderSidebarTab", async (app, html, data) => {
    const userSearchSetting = game.settings.get("fullsearch", "userSearch");
    if (game.user.isGM || userSearchSetting) {
      if (app.tabName !== "chat") return;
      let $chat_form = html.find("#chat-form");
      const content = await renderTemplate("modules/fullsearch/templates/chat/chatbar.hbs");

      if (content.length > 0) {
        let $content = $(content);
        $chat_form.after($content);
        $content.find(".startsearch").on("click", async (html) => {
          let searchPattern = $content.find("[name=searchtext]")[0].value;
          if (searchPattern) {
            let search = await new SearchChat().create(searchPattern);
            await search.searchWorld();
            await search.display();
          }
        });
        $content.find(".chatsearchtextbar").on("change", async (html) => {
          let searchPattern = $content.find("[name=searchtext]")[0].value;
          if (searchPattern) {
            let search = await new SearchChat().create(searchPattern);
            await search.searchWorld();
            await search.display();
          }
        });
      }
    }
  });
}
