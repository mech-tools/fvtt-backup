import { libWrapper } from "./shim.js";
/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
//Hooks.once('setup', function() {});
/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', function () {
    libWrapper.register('foundry-filepicker-favorites', 'FilePicker.prototype._onSearchFilter', function (wrapped, event, query, rgx, html) {
        if (this.activeSource == 'search') {
        }
        else {
            return wrapped(event, query, rgx, html);
        }
    }, 'MIXED');
    libWrapper.register('foundry-filepicker-favorites', 'FilePicker.prototype.source', function (wrapped) {
        if (this.activeSource == 'search') {
            return searchSource(this);
        }
        else {
            return wrapped();
        }
    }, 'MIXED');
    libWrapper.register('foundry-filepicker-favorites', 'FilePicker.prototype.getData', function (wrapped, options) {
        let prom = wrapped(options);
        let fp = this;
        return prom.then(async function (res) {
            res.sources = Object.assign({ search: searchSource(fp) }, res.sources);
            return res;
        });
    }, 'WRAPPER');
    function searchSource(fp) {
        let s = fp;
        if (!s.searchSource) {
            s.searchSource = {
                target: "",
                label: "Search",
                icon: "fas fa-search"
            };
        }
        return s.searchSource;
    }
    libWrapper.register('foundry-filepicker-favorites', 'FilePicker._manageFiles', async function (wrapped, data, options) {
        if (data.storage === 'search') {
            let maximumResults = game.settings.get("foundry-filepicker-favorites", "search-max-results");
            let results = [];
            let term = data.target.trim().toLowerCase().split((/\s+/));
            term = term.filter(n => n);
            if (term.length > 0) {
                for (const f of ALL_FILES) {
                    if (term.every(t => f.name.includes(t))) {
                        if (maximumResults > 0 && results.length >= maximumResults) {
                            ui.notifications.info(`More than ${maximumResults} results for '${data.target}'`);
                            break;
                        }
                        results.push(f.file);
                    }
                }
            }
            return {
                "target": data.target,
                "private": true,
                "dirs": [],
                "privateDirs": [],
                "files": results,
                "extensions": options.extensions
            };
        }
        else {
            return await wrapped(data, options);
        }
    }, 'MIXED');
});
class SearchFile {
}
var ALL_FILES = [];
Hooks.once('ready', async function () {
    let excludes = game.settings.get("foundry-filepicker-favorites", "search-excludes");
    let usingForge = typeof (ForgeVTT) !== "undefined" && ForgeVTT.usingTheForge;
    let fp = new FilePicker({ type: 'imagevideo' });
    let options = {
        extensions: fp.extensions,
        wildcard: false,
        recursive: true
    };
    let promises = [];
    for (const [key, value] of Object.entries(fp.sources)) {
        promises.push(collectFiles(key, [value.target], options));
    }
    Promise.all(promises).then((values) => {
        console.log("foundry-filepicker-favorites | Finished indexing, indexed " + ALL_FILES.length + " images");
    });
    async function collectFiles(storage, roots, options) {
        var _a, _b;
        if (game.world && !((_a = game.user) === null || _a === void 0 ? void 0 : _a.can("FILES_BROWSE")))
            return;
        let counter = 0;
        let open = [...roots];
        let target;
        while ((target = open.pop()) !== undefined) {
            if (excludes.includes(target)) {
                console.log("foundry-filepicker-favorites | Skipping " + target + " because it is excluded");
                continue;
            }
            try {
                let search = await FilePicker.browse(storage, target, options);
                if (search.private && !((_b = game.user) === null || _b === void 0 ? void 0 : _b.hasRole('GAMEMASTER')))
                    continue;
                //if not using the shortcut on the forge (recursive option)
                if (!(usingForge && (storage === "forgevtt" || (storage === 'forge-bazaar' && (target.match(/\//g) || []).length > 0)))) {
                    open.push(...search.dirs);
                }
                for (const f of search.files) {
                    ALL_FILES.push({ file: f, name: f.toLowerCase() });
                    counter++;
                }
            }
            catch (error) {
                // if this folder is not accessible (e.g. private) fail silently
            }
        }
        console.log("foundry-filepicker-favorites | Indexed " + counter + " images from " + storage);
    }
});
