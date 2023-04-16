// Add hightlight button
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

// Share actor button
Hooks.on("getActorSheetHeaderButtons", (app, buttons) => {
    if (!game.users.current.isGM) return;
    if (buttons.find(button => button.class === 'coc-share-players')) return;
    if (app instanceof DocumentSheet) {
        const actor = app.document;
        buttons.unshift({
            icon: 'fas fa-handshake fa-fw',
            label: 'Introduce',
            class: 'coc-share-players',
            onclick: () => {
                Dialog.confirm({
                    title: `Partager l'acteur : ${actor.name} ?`,
                    content: `Êtes-vous sûr de vouloir partager l'acteur : ${actor.name} ?`,
                    yes: () => {
			const api = game.modules.get('introduce-me').api;
			api.introduceMe(actor._source.token, actor);
		    },
                    defaultYes: true
                });
            }
        });
    }
});
