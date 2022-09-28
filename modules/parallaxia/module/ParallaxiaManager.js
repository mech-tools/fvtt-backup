import {paraldbg, paralerr, parallog} from "./logging.js";
import {makeTiling} from "./ParallaxiaTile.js";

export class ParallaxiaManager {
    constructor() {
        this.layerKeys = ["foreground", "background"]
        this.targets = null;
        this.err = null;
        this.isPaused = false;

        return this;
    }

    tileFromId(tile_id) {
        let tile = null;
        for (const lk in this.layerKeys) {
            tile = canvas[lk].get(tile_id);
            if (tile) return tile;
        }
    }

    refresh(delta) {
        const t = Date.now(); // TODO: add synchronized Foundry Time!
        this.gather_targets();

        // canvas.scene.tiles has the documents
        // canvas.foreground/background etc. has the actual entity/thing
        // we need both - the document to push to the server, the instance for display updates

        // assuming this lookup is fast, not going to cache the result
        this.targets.forEach(tile => {
            if (!tile.hasOwnProperty("isParallaxia")) {
                if (!tile.conversion_attempted) {
                    this.makeParallaxia(tile);
                } else {
                    paraldbg("Failed tile repeated attempts");
                }
                return
            }

            if (tile.isParallaxia) {
                tile._advanceState(t);
                if (tile._updating) {
                    paraldbg('Update in progress, not updating tile position')
                } else {
                    tile._applyState(tile.data.parallaxia.current);
                    if (!tile._refreshed) tile.refresh();
                }
            }
        })
    }

    remove_target = (tile_id) => {
        this.targets = this.targets.filter(tile => tile.id !== tile_id);
    }

    gather_targets = () => {
        this.targets = [];
        this.layerKeys.forEach(lk => {
            canvas[lk].placeables.forEach(tile => {
                if (tile.data.flags.parallaxia?.isTarget) {
                    this.targets.push(tile);
                }
            })
        });
        return this.targets;
    }

    async makeParallaxia(tile) {
        tile.conversion_attempted = true;
        if (tile.isParallaxia) return;
        parallog(`Turning base tile ${tile.id} into Parallaxia target`);

        const tr = await makeTiling(tile);
        if (!tr) {
            paralerr(`Manager Tile upgrade aborted: ${tr}`);
            return;
        }

        tile.isParallaxia = true;

        if (!tile.data.flags.parallaxia?.isTarget) {
            await tile.document.setFlag('parallaxia', 'isTarget', true);
        }

        parallog(`Upgrade of tile ${tile.id} complete!`);
        return tile;
    }

    add_target(tile) {
        if (!this.targets.includes(tile)) this.targets.push(tile);
    }

    play() {
        parallog('Manager play loop start');
        canvas.app.ticker.add(this.refresh.bind(this));
    };

    clearTile = async (tile) => {
        await tile.document.update({"flags.-=parallaxia": null});
        await tile.document.setFlag("core", "isTilingSprite", false);
        tile.isParallaxia = false;
        tile.conversion_attempted = false;
        tile.draw();
    };

    clearAllTiles = () => {
        let d = new Dialog({
            title: "Clear all Tiles",
            content: "<p>Are you sure you want to reset all tiles in the scene to base tiles and redraw the scene?</p>",
            buttons: {
                one: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Yes",
                    callback: this._clearLayerTiles
                },
                two: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Cancel",
                }
            },
            default: "two",
        });
        d.render(true);
    }

    _clearLayerTiles = async () => {
        parallog('Removing Parallaxia states from all tiles on layer...')
        // we could step through targets, but we want to make sure that we catch every tile
        // that may have been touched by parallaxia in case the targets list gets borked.
        for (const tile of canvas.activeLayer.placeables) {
            await this.clearTile(tile);
        }

        // await canvas.draw(); // reload/redraw the canvas to properly reset any client-side leftovers

    }
}
