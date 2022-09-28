import {paraldbg, parallog, paralerr, paralwarn} from "./logging.js";
import {NOOP, blendModes, blendModesString} from "./util.js";

// TODO:
// - follow Tile API for frame, tile and texture
// - on the fly swap of texture triggering Sprite texture swap

export const makeTiling = async function (tile) {
    parallog(`Upgrading tile ${tile.id}`);

    if (!tile.texture) {
        ui.notifications.error("Can't convert - Tile is missing a texture.");
        return;
    }

    // tile states
    // initial lives as copy in flag space, current and next only in client space
    tile.data.parallaxia = {
        initial: null,
        current: null,
        previous: null,
        ptransform: '',
        ptransform_active: false,
        _refreshed: false,
        _updating: false,
        _last_update: 0
    };

    /* -------------------------------------------- */
    /** @override */
    tile._onUpdate = (data, options = {}, userID) => {
        parallog('_onUpdate data', data);
        const changed_keys = new Set(Object.keys(data));
        parallog('_onUpdate changed', changed_keys);

        let saveRequired = false;
        let redrawRequired = false;

        // Release control if the Tile was locked
        if (data.locked) tile.release();

        // Swap the overhead state and set up occlusion stuff which normally would happen on draw call
        if ("overhead" in data) {
            tile.swapLayer();
            redrawRequired = true;
        }

        if ( foundry.utils.hasProperty(data, "occlusion.mode") || tile.isRoof ) {
            // canvas.perception.schedule({lighting: {refresh: true}}); // not sure, leaving it off for now
        }

        // store the new initial state in document flags
        if ("initial" in data) {
            paraldbg("New Initial Keys!!!!", data.initial);
            foundry.utils.mergeObject(tile.data.parallaxia.initial, data.initial);
            saveRequired = true;
            paraldbg("Post-merge:", tile.data.parallaxia.initial);
        }

        // Updates coming from BaseTile modifications, e.g. moving the tile on the canvas or
        // rotating with the mousewheel etc.
        // We still want to react to these changes and integrate them
        if ("x" in data) tile.data.parallaxia.initial.position.x = data.x;
        if ("y" in data) tile.data.parallaxia.initial.position.y = data.y;
        if ("z" in data) tile.zIndex = parseInt(data.z) || 0;
        if ("rotation" in data) tile.data.parallaxia.initial.rotation.z = Math.toRadians(data.rotation);
        if (["x", "y", "z", "rotation"].some(k => k in data)) {
            saveRequired = true;
        }

        // if image path has changed, swap out the texture!
        if ("img" in data) parallog("WE SHOULD BE REACTING TO IMAGE PATH CHANGES HERE!");
        // tile.draw();

        // TODO: There's something borked here in how we compare if a swap is required/executed!!!
        if ("initial" in data && data.initial.texture?.path) {
            if (tile.data.img !== data.initial.texture.path) {
                paraldbg(`Swapping "${tile.data.img}" to "${data.initial.texture.path}".`);
                this.data.img = data.initial.texture.path;
                redrawRequired = true;
            }
        }

        if (saveRequired && game.user.isGM) {
            paraldbg('Saving initial state changes:', tile.data.parallaxia.initial);
            const texPath = data.initial?.texture?.path;
            if (texPath && tile.data.img !== texPath) tile.document.update({img: texPath});
            tile._saveInitialState();
        }

        if (redrawRequired) tile.draw();
        tile._resetCurrentState();
        tile._advanceState(Date.now());

        // TODO: This refresh here is fishy...
        if (!redrawRequired) tile.refresh();

        if ('ptransform' in data) {
            paraldbg('Custom tile update function changed _onUpdate!');
            tile._ptransformSetup(data['ptransform']);
            if (game.user.isGM) tile.document.setFlag('parallaxia', 'ptransform', data.ptransform);
        }

        // Update the sheet if it's visible. In contrast to the current values being updated, this
        // completely re-renders, updating also the initial state and other fields.
        if (tile.sheet && tile.sheet.rendered) tile.sheet.render();
    };

    /**
     * Set up the  transformation function that is called once per frame for each parallaxia tile
     * to advance the state of the tile in response to other variables like time, flags etc.
     * @param {string} [script] The custom script to run
     */
    tile._ptransformSetup = (script) => {
        tile.data.parallaxia.ptransform = script;
        if (script == null) tile.ptransform = NOOP;
        else {
            try {
                tile.ptransform = new Function('tile', 't', 'delta', 'initial', 'current', 'next', script);
                tile.ptransform_active = true;
            } catch (e) {
                ui.notifications.error('Custom transform function creation failed. See console.', e);
                console.error('Parallaxia | Custom function creation failed:', e);
                tile.ptransform = NOOP;
                tile.ptransform_active = false;
            }
        }
    };

    /**
     * Per-frame lock-step update of the current Tile state to the next tile state
     * @param {number} [currentTime] Unix epoch timestamp
     */
    tile._advanceState = (currentTime) => {
        let delta = canvas.app.ticker.deltaMS * 0.001;

        // lock-step calculate the next state
        try {
            const initial = tile.data.parallaxia.initial;
            const current = tile.data.parallaxia.current;
            if (current.paused) return;
            if (current.pauseOnPause && game.paused) return;

            const next = duplicate(current);

            next.tDelta = delta;

            // tile position
            next.position.x += current.position.dx * delta;
            next.position.y += current.position.dy * delta;
            next.position.z += current.position.dz * delta;

            // next.rotation.x += current.rotation.dx * delta;
            // next.rotation.y += current.rotation.dy * delta;  // these don't really do anything
            next.rotation.z += current.rotation.dz * delta;

            // texture tiling offset
            let tw = tile.texture.baseTexture.width * current.tiling.sx;
            let th = tile.texture.baseTexture.height * current.tiling.sy;
            next.tiling.x = (current.tiling.x + current.tiling.dx * delta) % tw;
            next.tiling.y = (current.tiling.y + current.tiling.dy * delta) % th;

            next.tiling.sx += current.tiling.sdx * delta;
            next.tiling.sy += current.tiling.sdy * delta;
            next.texture.width = tile.texture.baseTexture.width;
            next.texture.height = tile.texture.baseTexture.height;


            // run custom transformations script
            if (tile.ptransform_active && tile.ptransform) {
                try {
                    tile.ptransform(tile, currentTime, delta, initial, current, next);
                } catch (e) {
                    let tn = tile.data._id + (current.name ? `(${current.name})` : '');
                    ui.notifications.error(`Custom function of tile ${tn} failed to execute. See console.`);
                    paralerr(`Custom function of tile ${tn} failed to execute:`, e)
                    tile.ptransform_active = false;
                }
            }

            // store next state as current state
            tile.data.parallaxia.previous = current;
            tile.data.parallaxia.current = next;
        } catch (error) {
            paralerr(error);
        }
    };

    // load state from flags
    // tile._loadInitialState = async () => {
    //     paraldbg(`Loading initial state of tile ${tile.id}`);
    //     const initial_flags = mergeObject(defaultState, await tile.document.getFlag('parallaxia', 'initial'));
    //     return ParallaxiaTileState.fromFlags(initial_flags);
    // };

    /**
     * Save a new initial state to the flags (and with that, to the server and other clients)
     * @param {ParallaxiaTileState} [state] Unix epoch timestamp
     */
    tile._saveInitialState = async (state = null) => {
        parallog("Saving Initial State of tile", tile)
        if (!state && tile.data.parallaxia.initial) {
            state = tile.data.parallaxia.initial;
        }
        await tile.document.setFlag('parallaxia', 'initial', state);
        await tile.document.setFlag('parallaxia', 'ptransform', tile.data.parallaxia.ptransform);
    };

    /**
     * Reset the derived Tile states [current, next] to the [initial] state of the tile object.
     * Note that this does NOT restore the derived states or the initial state from the document flags, but
     * the local state copies on the object itself.
     */
    tile._resetCurrentState = () => {
        paraldbg(`Resetting tile ${tile.id} state to initial.`);
        tile.data.parallaxia.current = duplicate(tile.data.parallaxia.initial);
        tile.data.parallaxia.previous = duplicate(tile.data.parallaxia.initial);
    };

    /**
     * Apply a state to the Placeable object, updating the relevant parameters like position, width etc.
     * @param {ParallaxiaTileState} [state] Unix epoch timestamp
     */
    tile._applyState = (state) => {
        tile._updating = true;

        const img = tile.tile;
        if (tile.data.img !== state.texture.path) {
            console.log('state path difference.')
        }
        tile.position.set(state.position.x, state.position.y);

        // if width, height or rotation change, we need to recalculate the bounds
        // so perhaps trigger a full refresh
        // though we have a memory leak in the refresh right now...

        if (img.width !== state.width || img.height !== state.height || tile.rotation !== state.rotation.z) {
            img.width = state.width;
            img.height = state.height;
            img.rotation = state.rotation.z;
            // todo: recalculate hit area/bounds
        }

        if (img.blendMode !== blendModesString[state.blendMode]) {
            img.blendMode = blendModesString[state.blendMode];
        }
        img.tilePosition.set(state.tiling.x, state.tiling.y);
        img.tileScale.set(state.tiling.sx, state.tiling.sy);

        img.tint = colorStringToHex(state.tint);

        img.alpha = game.user.isGM ? Math.max(0.2, !tile.data.hidden ? state.alpha : 0.2) : state.alpha;
        tile._updating = false;
    };

    tile.toFile = (content, fileName, contentType) => {
        const a = document.createElement("a");
        const file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    /* -------------------------------------------- */
    /** @override */
    tile.refresh = () => {
        let current = tile.data.parallaxia.current;
        // paraldbg('Tile refresh', current);
        tile.position.set(current.position.x, current.position.y);
        const aw = Math.abs(current.width);
        const ah = Math.abs(current.height);

        // todo: that is irritating for rotation tiles - best just ignore?
        const rotation = current.rotation.z;

        if (tile.tile) {  // this check isn't really appropriate in our case?
            tile.tile.width = aw;
            tile.tile.height = ah;

            tile.tile.anchor.set(0.5, 0.5);
            tile.tile.position.set(aw / 2, ah / 2);
            tile.tile.rotation = current.rotation.z;

            // have it always visible for DM
            tile.tile.alpha = tile.data.hidden ? Math.min(0.5, current.alpha) : Math.max(0.2, current.alpha);
            // TODO: tint

            if ( tile.bg ) {
                tile.bg.clear().beginFill(0xFFFFFF, 0.5).drawRect(0, 0, tile.data.width, tile.data.height).endFill();
            }
        }

        // do the bounds stuff
        let bounds = (current.width === current.height) ?
            new NormalizedRectangle(0, 0, current.width, current.height) : // Square tiles
            NormalizedRectangle.fromRotation(0, 0, current.width, current.height, rotation); // Non-square tiles
        // let bounds = new NormalizedRectangle(0, 0, current.width, current.height);

        // padding for handles and frame
        tile.hitArea = tile._controlled ? bounds.clone().pad(20) : bounds;
        tile._refreshBorder(bounds);
        tile._refreshHandle(bounds);

        // TODO: Something ain't right with the alpha settings for hidden/unhidden
        // tile.alpha = 1.0;
        // tile.visible = current.visible || game.user.isGM;
        tile.visible = !tile.data.hidden || game.user.isGM;
        tile._refreshed = true;
        return tile;

    };

    // Initialize the tile state for a new or reinitialized instance
    // If the document already as the initial flag data, start from there
    // else start from scratch just off the base Tile properties

    // this needs to await, else it's null...
    paraldbg('Trying to load existing flags');
    const initial_flag = await tile.document.getFlag("parallaxia", "initial")
    if (initial_flag) {
        paraldbg(`Creating tile state ${tile.id} from flags`);
        tile.data.parallaxia.initial = ParallaxiaTileState.fromFlags(initial_flag);
        // tile.data.parallaxia.initial = tile._loadInitialState()
    } else {
        parallog('New tile state from base Tile data');
        tile.data.parallaxia.initial = ParallaxiaTileState.fromTile(tile);
    }

    if (!tile.data.parallaxia.current) tile.data.parallaxia.current = foundry.utils.duplicate(tile.data.parallaxia.initial);
    if (!tile.data.parallaxia.previous) tile.data.parallaxia.previous = foundry.utils.duplicate(tile.data.parallaxia.initial);

    // if this tile was created we need to store the flags on the server
    // note that this triggers an update, which reads some of the above.
    if (game.user.isGM) {
        if (!tile.document.data.parallaxia?.initial) {
            paraldbg(`Setting initial flag for tile ${tile.id}`);
            await tile.document.setFlag('parallaxia', 'initial', tile.data.parallaxia.initial)
        }
        if (tile.document.data.parallaxia?.ptransform)
            await tile.document.setFlag('parallaxia', 'ptransform', '')
    }

    // create the custom update function
    const ptransform = await tile.document.getFlag("parallaxia", "ptransform");
    tile._ptransformSetup(ptransform);

    // setup new tile stuff
    paraldbg("Setting tile texture to tiling for ", tile);
    await tile.document.setFlag("core", "isTilingSprite", true)
    await tile.draw();

    return tile;
};

export const defaultState = {
    texture: {
        path: null,
        width: 0,
        height: 0
    },
    name: null,
    position: {
        x: 0,
        y: 0,
        z: 0,
        dx: 0,
        dy: 0,
        dz: 0
    },
    zIndex: 0,
    tiling: {
        x: 0,
        y: 0,
        dx: -50,
        dy: 0,
        sx: 1.,
        sy: 1.,
        sdx: 0,
        sdy: 0,
    },
    rotation: {
        x: 0,
        y: 0,
        z: 0,
        dx: 0,
        dy: 0,
        dz: 0
    },
    scale: {
        x: 1.,
        y: 1.,
        z: 1.
    },
    filters: [],
    blendMode: "NORMAL",
    weight: 0,
    width: 1,
    height: 1,
    alpha: 1.,
    tint: '#ffffff',
    visible: true,
    paused: false,
    pauseOnPause: false,
    flags: {},
    _frameN: 0,
    _lastTimestamp: 0,
    tDelta: 0,
};

export class ParallaxiaTileState {
    constructor() {
        return foundry.utils.duplicate(defaultState)
    }

    static fromFlags(flags) {
        paraldbg('Creating ParallaxiaState from flags:', flags);
        let state = new ParallaxiaTileState();
        if (flags === undefined) {
            paraldbg('Returning default state on flag load!');
            return state;
        }
        foundry.utils.mergeObject(state, flags);

        // some migration
        if (!isNaN(state.blendMode)) state.blendMode = blendModes[parseInt(state.blendMode)];
        return state;
    }

    static fromTile(tile) {
        paraldbg('State from tile:', tile);

        let state = new ParallaxiaTileState();
        state.name = '';
        state.texture.path = tile.data.img;
        state.texture.width = tile.texture.baseTexture.width;
        state.texture.height = tile.texture.baseTexture.height;
        state.zIndex = tile.zIndex;
        state.position.x = tile.position.x;
        state.position.y = tile.position.y;
        state.width = tile.tile.width;
        state.height = tile.tile.height;
        state.rotation.z = Math.toRadians(tile.rotation);
        state.alpha = tile.alpha;

        return state;
    }
}