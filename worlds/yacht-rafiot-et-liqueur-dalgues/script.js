// ProseMirror highlight button
Hooks.on("getProseMirrorMenuItems", (editor, items) => {
    items.unshift({
        action: "toggleMark",
        title: "Highlight",
        icon: '<i class="fa-solid fa-highlighter-line"></i>',
        scope: ProseMirror.ProseMirrorMenu._MENU_ITEM_SCOPES.TEXT,
        cmd: ProseMirror.commands.toggleMark(ProseMirror.defaultSchema.marks.mark)
      });
});

Hooks.once("ready", () => { 
    // Always show date
    if (!game.settings.get('smalltime', 'date-showing')) {
        game.settings.set('smalltime', 'date-showing', true);
    }

    // No pause
    if (game.users.current.isGM) {
        if (game.paused) game.togglePause(false, true);
    }
        
    // Always show map notes
    game.settings.set("core", NotesLayer.TOGGLE_SETTING, true);
});

