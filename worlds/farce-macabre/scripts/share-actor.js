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
