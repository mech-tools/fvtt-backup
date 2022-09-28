import { libWrapper } from "./shim.js";
Hooks.once('ready', function () {
    FilePicker.prototype._onClickFavorite = function (event) {
        event.preventDefault();
        let clicked = event.target;
        this.activeSource = clicked.dataset.source;
        this.browse(clicked.dataset.path);
    };
    libWrapper.register('foundry-filepicker-favorites', 'FilePicker.prototype.activateListeners', function (wrapped, ...args) {
        wrapped(...args);
        let html = args[0];
        html.find(".filepicker-favorites button").click(this._onClickFavorite.bind(this));
        return;
    }, 'WRAPPER');
    libWrapper.register('foundry-filepicker-favorites', 'FilePicker.prototype._renderInner', function (wrapped, ...args) {
        let prom = wrapped(...args);
        return prom.then(async function (html) {
            let root = html[0];
            let inner = (await renderTemplate("modules/foundry-filepicker-favorites/templates/filepicker.html", await getAccessible()));
            let node = $(inner)[0];
            root.insertBefore(node, root.firstChild);
            return html;
        });
    }, 'WRAPPER');
    let accessibleCache;
    async function getAccessible() {
        var _a;
        if (accessibleCache) {
            return accessibleCache;
        }
        let favorites = game.settings.get("foundry-filepicker-favorites", "favorites-location");
        let accessible = [];
        for (const fav of favorites) {
            try {
                let search = await FilePicker.browse(fav.source, fav.path, {});
                if (!search.private || ((_a = game.user) === null || _a === void 0 ? void 0 : _a.hasRole('GAMEMASTER'))) {
                    accessible.push(fav);
                }
            }
            catch (error) {
                // if this folder is not accessible (e.g. private) fail silently
                console.log("foundry-filepicker-favorites | Could not browse to  " + fav.path, error);
            }
        }
        accessibleCache = accessible;
        return accessible;
    }
});
