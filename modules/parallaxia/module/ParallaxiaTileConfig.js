import {paraldbg, paralerr, parallog} from "./logging.js";
import {blendModes, blendModesString} from "./util.js";

Hooks.on('renderParallaxiaTileConfig', (sheet, html) => {
    paraldbg('Render Hook for ParallaxiaTileConfig');
    // Fuck it, we'll do it live somehow?
    // check if basic tab active. if so, switch to parallaxia
    // console.log(sheet);
    if (sheet.object._object.isParallaxia) {
        // $('div[data-tab="basic"]', html).removeClass("active");
        // $('div[data-tab="parallaxia"]', html).addClass("active"); // doesn't resize the sheet
        // sheet._tabs[0].activate("parallaxia"); // doesn't resize the sheet either
        // sheet.activate_parallaxia_tab(); // doesn't resize on change either
        // sheet.render(true);
        // const nav = $('a[data-tab="parallaxia"]', html);
        // console.log(nav);
        // nav.trigger("click");
        // sheet.resize();
    }
});

export const WithParallaxiaTileConfig = (TileConfig) => {
    class ParallaxiaTileConfig extends TileConfig {
        constructor(...args) {
            super(...args);
            this.interval = null;
            // this._ptransformHelpSheet = new CustomFunctionHelp();
        }

        /** @override */
        static get defaultOptions() {
            paraldbg("ParallaxiaTileConfig get defaultOptions");
            return foundry.utils.mergeObject(super.defaultOptions, {
                classes: ["parallaxia-tile-sheet", "sheet"],
            });
        }

        async activate_parallaxia_tab() {
            paraldbg("Activating parallaxia tab");
            try {
                this._tabs[0].activate("parallaxia");
            } catch (ex) {
                paraldbg("tab activation failed");
            }
        }

        async _renderInner(data) {
            paraldbg("FORM _renderInner");
            let html = await super._renderInner(data);

            if (!this.document.id) return html;

            // Add parallaxia nav bar entry
            let nav_tab = $('<a>').addClass('item').attr('data-tab', "parallaxia")
                .html(`<i class="fas fa-running"></i> Parallaxia`)
                .insertAfter($('a[data-tab="basic"]', html));

            // Add parallaxia form section/tab content container
            let tab = $('<div>').addClass('tab').attr('data-tab', "parallaxia")
                .insertAfter($('div[data-tab="basic"]', html));

            let template = "modules/parallaxia/templates/parallaxia-tile-config-compact.html";

            if (data.document._object.isParallaxia) {
                // Hide the Basic tab nav entry, we'll use ours instead!
                // $('a[data-tab="basic"]', html)[0].style.display = "none";
            } else {
                template = "modules/parallaxia/templates/non-parallaxia-tile-config.html";
            }

            const rendered = await renderTemplate(template, data);
            tab.append(rendered);

            return html;
        }

        _getSubmitData(updateData = {}) {
            let data = super._getSubmitData(updateData);
            paraldbg("FORM _getSubmitData");
            return data;
        }

        /** @override */
        getData(options) {
            paraldbg("SHEET GET DATA");
            const context = super.getData(options);

            if (!context.document.object.isParallaxia) return context;

            this.interval = setInterval(this._update_current, 200, this);
            context.document = this.document;
            context.tileData = context.document.object.data;
            context.parallaxia = context.tileData.parallaxia;
            context.options = this.options;
            context.submitText = this.options.preview ? "Create" : "Save";
            context.options.submitOnClose = true;
            context.options.submitOnChange = true;
            context.options.closeOnSubmit = false;
            context.options.resizable = true;
            context.options.tabs[0].initial = "parallaxia";
            context.blendModes = blendModes;
            context.currentBlendMode = context.tileData.parallaxia.initial.blendMode;
            return context;
        }

        /* -------------------------------------------- */

        // /** @override */
        // async _updateObject(event, formData) {
        //     await super._updateObject(event, formData);
        //     if (!game.user.isGM) throw "You do not have the permission to configure a Parallaxia object.";
        //
        //     paraldbg('_updateObject', formData);
        //     if (this.document.id) {
        //         paraldbg("Updating document");
        //         return this.document.update(formData);
        //     } else return this.document.constructor.create(formData, {
        //         parent: this.document.parent,
        //         pack: this.document.pack
        //     });
        // }

        /* -------------------------------------------- */

        /** @override */
        // when form input fields have changed, trigger an update as a preview
        // NOTE: We are here updating the CURRENT, not the INITIAL for the preview.
        // This might be unexpected for the user.
        async _onChangeInput(event) {
            const fd = new FormDataExtended(this.form); //event.currentTarget
            paraldbg('onChangeInput', fd);
            if (!this.document.object.isParallaxia) return;

            for (let [form_key, form_value] of fd.entries()) {
                let field = this.document.data.parallaxia;
                let accessors = form_key.split('.');
                if (accessors[0] === 'initial') {
                    // console.log('FD:', form_key, form_value, accessors);
                    accessors.forEach((ks, ns) => {
                        if (!ns) {  // debug override, writing to current while previewing from the dialog
                            field = field['current'];
                        } else if (ns < accessors.length - 1) {
                            field = field[ks];
                        } else {
                            field[ks] = fd.dtypes[form_key] === "Number" ? parseFloat(form_value) : form_value;
                        }
                    })
                }
            }
            this.document.object._ptransformSetup(this.form.ptransform.value); //event.currentTarget
            this.document.object.refresh();
        }

        /** Updates the TileConfig sheet, called regularly to keep responsive to live changes */
        _update_current(sheet) {
            if (!sheet.rendered || !sheet.object._object.isParallaxia) return;

            const form = sheet.form;
            const initial = sheet.document.data.parallaxia.initial;
            const current = sheet.document.data.parallaxia.current;
            const previous = sheet.document.data.parallaxia.previous;

            form.curr_x.value = current.position.x.toFixed(1);
            form.curr_y.value = current.position.y.toFixed(1);

            // position change rate
            form.curr_dx.value = ((current.position.x - previous.position.x) / current.tDelta).toFixed(2);
            form.curr_dy.value = ((current.position.y - previous.position.y) / current.tDelta).toFixed(2);

            form.curr_width.value = current.width.toFixed(1);
            form.curr_height.value = current.height.toFixed(1);

            form.initial_rotation_z_deg.value = (initial.rotation.z * 180 / Math.PI).toFixed(2) + '°';
            form.curr_rotation_z.value = (current.rotation.z).toFixed(2);
            form.curr_rotation_z_deg.value = (current.rotation.z * 180 / Math.PI).toFixed(2) + '°';

            form.initial_rotation_dz_deg.value = (form["initial.rotation.dz"].value * 180 / Math.PI).toFixed(2) + '°';
            form.current_rotation_dz.value = (current.rotation.dz).toFixed(2);
            form.current_rotation_dz_deg.value = (current.rotation.dz * 180 / Math.PI).toFixed(2) + '°';

            form.curr_tint_str.value = current.tint;
            form.curr_alpha.value = current.alpha.toFixed(1);

            // texture scale
            form.curr_scale_x.value = current.tiling.sx.toFixed(2);
            form.curr_scale_y.value = current.tiling.sy.toFixed(2);

            // texture scale change rate
            form.curr_speed_sx.value = ((current.tiling.sx - previous.tiling.sx) / current.tDelta).toFixed(2);
            form.curr_speed_sy.value = ((current.tiling.sy - previous.tiling.sy) / current.tDelta).toFixed(2);

            // texture offset
            form.curr_tiling_x.value = current.tiling.x.toFixed(2);
            form.curr_tiling_y.value = current.tiling.y.toFixed(2);

            // texture offset change rate
            form.curr_speed_x.value = ((current.tiling.x - previous.tiling.x) / current.tDelta).toFixed(2);
            form.curr_speed_y.value = ((current.tiling.y - previous.tiling.y) / current.tDelta).toFixed(2);
        }

        /**
         * Activate event listeners using the prepared sheet HTML
         * @param html {HTML}  The prepared HTML object ready to be rendered into the DOM
         */
        activateListeners(html) {
            // Handle default listeners last so system listeners are triggered first
            super.activateListeners(html);

            // This shouldn't happen here, but I can't figure out how else to make it work
            paraldbg("Activating listeners");
            $('.parallaxia-btnLoad', html).on("click", function () {
                $('#parallaxia-inputFile', html).trigger("click");
            });
            $('#parallaxia-inputFile', html).change(this.loadTileConfig.bind(this));

            $('.parallaxia-btnSave', html).click(this.saveTileConfig.bind(this));

            $('.btn_make_parallaxia').click(this.makeParallaxia.bind(this));

            // if (this.document.object.isParallaxia) {
            //     if ($('div[data-tab="basic"]', html).hasClass("active")) {
            //         $('a[data-tab="basic"]', html).removeClass("active");
            //         $('div[data-tab="basic"]', html).removeClass("active");
            //
            //         $('a[data-tab="parallaxia"]', html).addClass("active")
            //         $('div[data-tab="parallaxia"]', html).addClass("active");
            //     }
            // }
        }

        /** @override */
        async close(options) {
            await super.close(options);
            const layer = this.object.layer;
            layer.preview?.removeChildren();
            this.options.preview = false;
            clearInterval(this.interval);
        }

        /**
         * Convert tile document to JSON and download as file
         * @param event {EVENT}
         */
        saveTileConfig(event) {
            paraldbg("Save Tile Config");
            const str = JSON.stringify(this.object.data, null, 2);
            const a = document.createElement("a");
            const file = new Blob([str], {type: 'text/plain'});
            a.href = URL.createObjectURL(file);

            a.download = `fvtt_parallaxiaTile_${this.object.id}.json`;
            a.click();
            URL.revokeObjectURL(a.href);
        }

        async makeParallaxia(event) {
            await canvas.parallaxiaManager.makeParallaxia(this.document.object);
            await canvas.parallaxiaManager.add_target(this.document.object.id);

            // redraw HUD in case it needs a refresh of parallaxia button state
            if (canvas.activeLayer.hud.rendered) canvas.activeLayer.hud.render();
        }

        /**
         * Load tile config from json
         * TODO: Verify that what comes in actually makes any sense?
         * @param event {EVENT}  The file picker event
         */
        async loadTileConfig(event) {
            event.preventDefault();
            await this.close([]);
            paraldbg("Load Tile Config");
            paraldbg(event.target.files);
            const reader = new FileReader();
            reader.onload = (event) => {
                const tileData = JSON.parse(event.target.result);
                tileData._id = this.document.id;
                console.log(tileData);
                canvas.scene.updateEmbeddedDocuments("Tile", [tileData]);
            };
            reader.readAsText(event.target.files[0]);
            this.data.object.refresh();
        }
    }

    const constructorName = "TileConfig";
    Object.defineProperty(ParallaxiaTileConfig.prototype.constructor, "name", {value: constructorName});
    return ParallaxiaTileConfig;
}
