import { DarknessPointDisplay } from "./display.js";

Hooks.once("init", () => {
  DarknessPointDisplay.initialize();
});

Hooks.on("updateUser", async () => {
  DarknessPointDisplay.update();
});

Hooks.on("getSceneControlButtons", (controls) => {
  let group = controls.find((b) => b.name == "token");
  group.tools.push({
    name: "display",
    title: "show-button-label",
    icon: "fas fa-moon",
    buttons: true,
    onClick: () => {
      DarknessPointDisplay.update();
      DarknessPointDisplay.render();
    },
  });
});
