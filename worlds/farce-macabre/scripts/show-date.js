// Show Smalltime date
Hooks.once("ready", () => { 
    if (!game.settings.get('smalltime', 'date-showing')) {
        game.settings.set('smalltime', 'date-showing', true);
    }
});
