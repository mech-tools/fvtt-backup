import {ParallaxiaManager} from "./ParallaxiaManager.js";
import {paraldbg, parallog, paralerr} from "./logging.js";
import {ParallaxiaTileState, defaultState} from "./ParallaxiaTile.js";
import {WithParallaxiaTileConfig} from './ParallaxiaTileConfig.js';

CONFIG.debug.parallaxia = true;
CONFIG.ParallaxiaTile = {
    ParallaxiaTileState: ParallaxiaTileState,
    defaultState: defaultState,
    documentClass: TileDocument,
    layerClass: MapLayer,
    objectClass: Tile,
    // sheetClass: ParallaxiaTileConfig
};

export class Parallaxia {
    static _oldSheetClass;

    constructor() {
    }

    static async init() {
        parallog("Initializing...")
        game.Parallaxia = this;
        Parallaxia.ParallaxiaTile = {
            ParallaxiaTileState: ParallaxiaTileState,
            defaultState: defaultState,
            documentClass: TileDocument,
            layerClass: MapLayer,
            objectClass: Tile,
            // sheetClass: ParallaxiaTileConfig
        };
    }
}

class ParallaxiaHUDButtons {
    static async addParallaxiaButton(app, html, data) {
        paraldbg("Adding HUD buttons");

        let tiles = canvas.activeLayer.controlled;
        if (tiles === undefined || !tiles.length) return

        // expected UX for selected tiles:
        // none parallaxia -> indicator inactive, upgrade all
        // some parallaxia -> indicator partially active, upgrade those not yet
        // all parallaxia  -> indicator active, downgrade all

        // check if all controlled tiles are parallaxia tiles, only then is the button indicated as active
        function someNotParallaxia() {
            const numParallaxia = tiles.filter(t => t.isParallaxia).length;
            if (tiles.length === numParallaxia) {   // all
                return 2
            }
            else if (numParallaxia) {               // some
                return 1
            }
            else {                                  // none
                return 0
            }
        }

        // Make parallaxia HUD button
        let isBtnActive = "";
        const some = someNotParallaxia();
        if (some) {
            isBtnActive = some === 1 ? "active partial" : "active";
        }

        let btn_div = $(`<div class="control-icon ${isBtnActive}" data-action="parallaxia">
                            <img src="icons/svg/waterfall.svg" width="36" height="36"
                                 title="Make Parallaxia Tile" alt="Toggle parallaxia"/>
                         </div>`);

        html.find('div.col.right').append(btn_div);
        btn_div.find('img').click(async (ev) => {
            const all = someNotParallaxia() === 2;
            for (const tile of tiles) {
                if (all) {
                    paraldbg(`Requested to de-parallaxify tile ${tile}:`);
                    await canvas.parallaxiaManager.clearTile(tile);
                    canvas.parallaxiaManager.remove_target(tile.data._id);
                } else {
                    paraldbg(`Requested to parallaxify tile ${tile}:`);
                    const tr = await canvas.parallaxiaManager.makeParallaxia(tile);
                    if (!tr) {
                        paralerr('HUD Tile upgrade aborted.');
                        continue;
                    }
                    if (tile.sheet.rendered) await tile.sheet.close();
                    await tile.sheet.render(true);

                    await tile.sheet.activate_parallaxia_tab();
                    canvas.parallaxiaManager.add_target(tile.data._id);
                }
            }

            const some = someNotParallaxia();
            btn_div.removeClass("active");
            btn_div.removeClass("partial");
            if (some) {
                btn_div.addClass("active");
                if (some < 2) {
                    btn_div.addClass("partial");
                }
            }
        });
    }
}

Hooks.once("init", async () => {
    await Parallaxia.init();
});


Hooks.once("canvasInit", async (canvas) => {
    parallog('Initializing ParallaxiaManager');
    canvas.parallaxiaManager = new ParallaxiaManager();
    canvas.parallaxiaManager.play();
});


Hooks.on("canvasReady", async (canvas) => {
    parallog('Canvas Ready for ParallaxiaManager');
    canvas.parallaxiaManager.isPaused = game.paused;
    let num_targets = canvas.parallaxiaManager.gather_targets().length;
    paraldbg(`Found ${num_targets} targets in scene.`)

    // force a single update tick on scene start to set up tiles even if paused
    if (canvas.parallaxiaManager.isPaused) canvas.parallaxiaManager.refresh(0);
});


Hooks.on('ready', async () => {
    paraldbg('Ready!');
    Parallaxia._oldSheetClass = CONFIG.Tile.sheetClasses.base['core.TileConfig'].cls;
    CONFIG.Tile.sheetClasses.base['core.TileConfig'].cls = WithParallaxiaTileConfig(CONFIG.Tile.sheetClasses.base['core.TileConfig'].cls);
});


Hooks.on('renderTileHUD', (app, html, data) => {
    if (!game.user.isGM) return;
    ParallaxiaHUDButtons.addParallaxiaButton(app, html, data);
});
