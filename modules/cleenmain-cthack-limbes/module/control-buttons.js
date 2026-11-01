export default function initControlButtons() {
  CONFIG.Canvas.layers.limbes = { layerClass: ControlsLayer, group: "primary" };

  Hooks.on("getSceneControlButtons", (btns) => {
    let menu = [];

    if (game.user.isGM) {
      if (game.system.id === "cleenmain") {
        menu.push(
          {
            name: "aides",
            title: "Règles",
            icon: "fas fa-book-reader",
            button: true,
            onClick: () => {
              let journal = game.journal.get("EOOAGdLL3LgnKAi5");
              if (journal) journal.sheet.render(true, { pageId: "cZQwHDWFAcWywTUz", sheetMode: "text" });
            }
          }
        );        
      }
      menu.push(
        {
          name: "Suivi des APs",
          title: "Suivi des APs",
          icon: "fas fa-snowflake",
          button: true,
          onClick: () => {
            let calledForm = game.settings.get("cleenmain-cthack-limbes", "suiviapform");
            calledForm.render(true);
          }
        },
        {
          name: "Suivi de remplissage du chaudron",
          title: "Suivi de remplissage du chaudron",
          icon: "fas fa-cauldron",
          button: true,
          onClick: () => {
            let calledForm = game.settings.get("cleenmain-cthack-limbes", "suivichaudronform");
            calledForm.render(true);
          }
        },
        {
          name: "Suivi du rituel de Clémentine",
          title: "Suivi du rituel de Clémentine",
          icon: "far fa-book-dead",
          button: true,
          onClick: () => {
            let calledForm = game.settings.get("cleenmain-cthack-limbes", "suivirituelclementineform");
            calledForm.render(true);
          }
        },
        {
          name: "Bilan des scénarios",
          title: "Bilans",
          icon: "fas fa-fog",
          button: true,
          onClick: () => {
            let calledForm = game.settings.get("cleenmain-cthack-limbes", "bilansform");
            calledForm.render(true);
          }
        }
      );
      btns.push({
        name: "limbes",
        title: "Limbes",
        icon: "fas fa-fog",
        layer: "limbes",
        tools: menu
      });
    }
  });
}
