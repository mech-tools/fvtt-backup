Hooks.on("ready", () => {
  // Check if module is available and activated
  if (game.modules.get("better-entity-link").active && game.modules.get("share-media").active) {
    // Register an action for Scene document link
    game.modules.get("better-entity-link").registerActorAction({
      name: "Share media",
      icon: "fas fa-square-share-nodes fa-fw",
      condition: (uuid, data) => game.user.isGM,
      callback: async (entity) =>
        game.modules.get("share-media").API.sharePopoutMediaToAll(entity.img)
    });

    // Register an action for Scene document link
    game.modules.get("better-entity-link").registerItemAction({
      name: "Share media",
      icon: "fas fa-square-share-nodes fa-fw",
      condition: (uuid, data) => game.user.isGM,
      callback: async (entity) =>
        game.modules.get("share-media").API.sharePopoutMediaToAll(entity.img)
    });
  }
});

