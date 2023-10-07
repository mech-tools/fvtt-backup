function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire84b7"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire84b7"] = parcelRequire;
}
parcelRequire.register("UVJLm", function(module, exports) {

$parcel$export(module.exports, "OverlayConfig", () => OverlayConfig);
$parcel$export(module.exports, "FILTERS", () => FILTERS);

var $fTuKG = parcelRequire("fTuKG");

var $aEqt1 = parcelRequire("aEqt1");

var $64r9a = parcelRequire("64r9a");

var $1mRWy = parcelRequire("1mRWy");

var $hAn2A = parcelRequire("hAn2A");

var $1v9Gt = parcelRequire("1v9Gt");

var $b2HDo = parcelRequire("b2HDo");

var $129cf = parcelRequire("129cf");
class OverlayConfig extends FormApplication {
    constructor(config11, callback11, id11, token11){
        super({}, {});
        this.config = config11 ?? {};
        this.config.id = id11;
        this.callback = callback11;
        this.token = canvas.tokens.get(token11._id);
        this.previewConfig = deepClone(this.config);
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-overlay-config",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/overlayConfig.html",
            resizable: false,
            minimizable: false,
            title: "Overlay Settings",
            width: 500,
            height: "auto",
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".content",
                    initial: "misc"
                }
            ]
        });
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.find(".reticle").on("click", (event11)=>{
            const icons11 = this.getPreviewIcons();
            if (icons11.length) (0, $129cf.Reticle).activate({
                tvaOverlay: icons11[0].icon,
                app: this,
                config: this.previewConfig
            });
        });
        const imgLinkDisable = function(disabled11) {
            html.find(".img-link-disable").prop("disabled", disabled11);
        };
        html.find(".image-link").on("click", (event11)=>{
            const chkBox11 = $(event11.target).closest(".form-group").find('[name="imgLinked"]');
            const button11 = $(event11.target).closest("button");
            if (chkBox11.is(":checked")) {
                chkBox11.prop("checked", false);
                button11.removeClass("active");
                imgLinkDisable(false);
            } else {
                chkBox11.prop("checked", true);
                button11.addClass("active");
                imgLinkDisable(true);
            }
        });
        imgLinkDisable(Boolean(this.config.imgLinked));
        html.find(".repeat").on("change", (event11)=>{
            const fieldset11 = $(event11.target).closest("fieldset");
            const content11 = fieldset11.find(".content");
            if (event11.target.checked) {
                content11.show();
                fieldset11.addClass("active");
            } else {
                content11.hide();
                fieldset11.removeClass("active");
            }
            this.setPosition();
        });
        // Insert Controls to the Shape Legend
        const shapeLegends = html.find(".shape-legend");
        let config = this.config;
        shapeLegends.each(function(i31) {
            const legend11 = $(this);
            legend11.append(`&nbsp;<a class="cloneShape" data-index="${i31}" title="Clone"><i class="fas fa-clone"></i></a>
         &nbsp;<a class="deleteShape" data-index="${i31}" title="Remove"><i class="fas fa-trash-alt"></i></a>`);
            if (i31 != 0) legend11.append(`&nbsp;<a class="moveShapeUp" data-index="${i31}" title="Move Up"><i class="fas fa-arrow-up"></i></a>`);
            if (i31 != shapeLegends.length - 1) legend11.append(`&nbsp;<a class="moveShapeDown" data-index="${i31}" title="Move Down"><i class="fas fa-arrow-down"></i></a>`);
            legend11.append(`<input class="shape-legend-input" type="text" name="shapes.${i31}.label" value="${config.shapes?.[i31]?.label ?? ""}">`);
        });
        // Shape listeners
        html.find(".addShape").on("click", this._onAddShape.bind(this));
        html.find(".addEvent").on("click", this._onAddEvent.bind(this));
        html.find(".deleteShape").on("click", this._onDeleteShape.bind(this));
        html.find(".deleteEvent").on("click", this._onDeleteEvent.bind(this));
        html.find(".moveShapeUp").on("click", this._onMoveShapeUp.bind(this));
        html.find(".moveShapeDown").on("click", this._onMoveShapeDown.bind(this));
        html.find(".cloneShape").on("click", this._onCloneShape.bind(this));
        html.find("input,select").on("change", this._onInputChange.bind(this));
        html.find("textarea").on("input", this._onInputChange.bind(this));
        const parentId = html.find('[name="parentID"]');
        parentId.on("change", (event11)=>{
            if (event11.target.value === "TOKEN") html.find(".token-specific-fields").show();
            else html.find(".token-specific-fields").hide();
            this.setPosition();
        });
        parentId.trigger("change");
        html.find('[name="ui"]').on("change", (event11)=>{
            if (parentId.val() === "TOKEN") {
                if (event11.target.checked) html.find(".ui-hide").hide();
                else html.find(".ui-hide").show();
                this.setPosition();
            }
        }).trigger("change");
        html.find('[name="filter"]').on("change", (event11)=>{
            html.find(".filterOptions").empty();
            const filterOptions11 = $(genFilterOptionControls(event11.target.value));
            html.find(".filterOptions").append(filterOptions11);
            this.setPosition({
                height: "auto"
            });
            this.activateListeners(filterOptions11);
        });
        html.find(".token-variants-image-select-button").click((event11)=>{
            (0, $hAn2A.showArtSelect)(this.token?.name ?? "overlay", {
                searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN,
                callback: (imgSrc11, imgName11)=>{
                    if (imgSrc11) $(event11.target).closest(".form-group").find("input").val(imgSrc11).trigger("change");
                }
            });
        });
        html.find(".presetImport").on("click", (event11)=>{
            const presetName11 = $(event11.target).closest(".form-group").find(".tmfxPreset").val();
            if (presetName11) {
                const preset11 = TokenMagic.getPreset(presetName11);
                if (preset11) $(event11.target).closest(".form-group").find("textarea").val(JSON.stringify(preset11, null, 2)).trigger("input");
            }
        });
        // Controls for locking scale sliders together
        let scaleState = {
            locked: true
        };
        // Range inputs need to be triggered when slider moves to initiate preview
        html.find(".range-value").siblings('[type="range"]').on("change", (event11)=>{
            $(event11.target).siblings(".range-value").val(event11.target.value).trigger("change");
        });
        const lockButtons = $(html).find(".scaleLock > a");
        const sliderScaleWidth = $(html).find('[name="scaleX"]');
        const sliderScaleHeight = $(html).find('[name="scaleY"]');
        const sliderWidth = html.find(".scaleX");
        const sliderHeight = html.find(".scaleY");
        lockButtons.on("click", function() {
            scaleState.locked = !scaleState.locked;
            lockButtons.html(scaleState.locked ? '<i class="fas fa-link"></i>' : '<i class="fas fa-unlink"></i>');
        });
        sliderScaleWidth.on("change", function() {
            if (scaleState.locked && sliderScaleWidth.val() !== sliderScaleHeight.val()) {
                sliderScaleHeight.val(sliderScaleWidth.val()).trigger("change");
                sliderHeight.val(sliderScaleWidth.val());
            }
        });
        sliderScaleHeight.on("change", function() {
            if (scaleState.locked && sliderScaleWidth.val() !== sliderScaleHeight.val()) {
                sliderScaleWidth.val(sliderScaleHeight.val()).trigger("change");
                sliderWidth.val(sliderScaleHeight.val());
            }
        });
        html.on("change", ".scaleX", ()=>{
            sliderScaleWidth.trigger("change");
        });
        html.on("change", ".scaleY", ()=>{
            sliderScaleHeight.trigger("change");
        });
        html.find(".me-edit-json").on("click", async (event)=>{
            const textarea = $(event.target).closest(".form-group").find("textarea");
            let params;
            try {
                params = eval(textarea.val());
            } catch (e) {
                console.warn("TVA |", e);
            }
            if (params) {
                let param;
                if (Array.isArray(params)) {
                    if (params.length === 1) param = params[0];
                    else {
                        let i = await promptParamChoice(params);
                        if (i < 0) return;
                        param = params[i];
                    }
                } else param = params;
                if (param) game.modules.get("multi-token-edit").api.showGenericForm(param, param.filterType ?? "TMFX", {
                    inputChangeCallback: (selected11)=>{
                        mergeObject(param, selected11, {
                            inplace: true
                        });
                        textarea.val(JSON.stringify(params, null, 2)).trigger("input");
                    }
                });
            }
        });
        const underlay = html.find('[name="underlay"]');
        const top = html.find('[name="top"]');
        const bottom = html.find('[name="bottom"]');
        underlay.change(function() {
            if (this.checked) top.prop("checked", false);
            else bottom.prop("checked", false);
        });
        top.change(function() {
            if (this.checked) {
                underlay.prop("checked", false);
                bottom.prop("checked", false);
            }
        });
        bottom.change(function() {
            if (this.checked) {
                underlay.prop("checked", true);
                top.prop("checked", false);
            }
        });
        const linkScale = html.find('[name="linkScale"]');
        const linkDimensions = html.find('[name="linkDimensionsX"], [name="linkDimensionsY"]');
        const linkStageScale = html.find('[name="linkStageScale"]');
        linkScale.change(function() {
            if (this.checked) {
                linkDimensions.prop("checked", false);
                linkStageScale.prop("checked", false);
            }
        });
        linkDimensions.change(function() {
            if (this.checked) {
                linkScale.prop("checked", false);
                linkStageScale.prop("checked", false);
            }
        });
        linkStageScale.change(function() {
            if (this.checked) {
                linkScale.prop("checked", false);
                linkDimensions.prop("checked", false);
            }
        });
        // Setting border color for property expression
        const limitOnProperty = html.find('[name="limitOnProperty"]');
        limitOnProperty.on("input", (event11)=>{
            const input11 = $(event11.target);
            if (input11.val() === "") {
                input11.removeClass("tvaValid");
                input11.removeClass("tvaInvalid");
            } else if (input11.val().match((0, $aEqt1.VALID_EXPRESSION))) {
                input11.addClass("tvaValid");
                input11.removeClass("tvaInvalid");
            } else {
                input11.addClass("tvaInvalid");
                input11.removeClass("tvaValid");
            }
        });
        limitOnProperty.trigger("input");
        html.find(".create-variable").on("click", this._onCreateVariable.bind(this));
        html.find(".delete-variable").on("click", this._onDeleteVariable.bind(this));
    }
    _onDeleteVariable(event11) {
        let index11 = $(event11.target).closest("tr").data("index");
        if (index11 != null) {
            this.config = this._getSubmitData();
            if (!this.config.variables) this.config.variables = [];
            this.config.variables.splice(index11, 1);
            this.render(true);
        }
    }
    _onCreateVariable(event11) {
        this.config = this._getSubmitData();
        if (!this.config.variables) this.config.variables = [];
        this.config.variables.push({
            name: "",
            value: ""
        });
        this.render(true);
    }
    _onAddShape(event11) {
        let shape11 = $(event11.target).siblings("select").val();
        shape11 = deepClone((0, $fTuKG.OVERLAY_SHAPES)[shape11]);
        shape11 = mergeObject(deepClone((0, $fTuKG.CORE_SHAPE)), {
            shape: shape11
        });
        this.config = this._getSubmitData();
        if (!this.config.shapes) this.config.shapes = [];
        this.config.shapes.push(shape11);
        this.render(true);
    }
    _onAddEvent(event11) {
        let listener11 = $(event11.target).siblings("select").val();
        this.config = this._getSubmitData();
        if (!this.config.interactivity) this.config.interactivity = [];
        this.config.interactivity.push({
            listener: listener11,
            macro: "",
            script: ""
        });
        this.render(true);
    }
    _onDeleteShape(event11) {
        const index11 = $(event11.target).closest(".deleteShape").data("index");
        if (index11 == null) return;
        this.config = this._getSubmitData();
        if (!this.config.shapes) this.config.shapes = [];
        this.config.shapes.splice(index11, 1);
        this.render(true);
    }
    _onDeleteEvent(event11) {
        const index11 = $(event11.target).closest(".deleteEvent").data("index");
        if (index11 == null) return;
        this.config = this._getSubmitData();
        if (!this.config.interactivity) this.config.interactivity = [];
        this.config.interactivity.splice(index11, 1);
        this.render(true);
    }
    _onCloneShape(event11) {
        const index11 = $(event11.target).closest(".cloneShape").data("index");
        if (!index11 && index11 != 0) return;
        this.config = this._getSubmitData();
        if (!this.config.shapes) return;
        const nShape11 = deepClone(this.config.shapes[index11]);
        if (nShape11.label) nShape11.label = nShape11.label + " - Copy";
        this.config.shapes.push(nShape11);
        this.render(true);
    }
    _onMoveShapeUp(event11) {
        const index11 = $(event11.target).closest(".moveShapeUp").data("index");
        if (!index11) return;
        this.config = this._getSubmitData();
        if (!this.config.shapes) this.config.shapes = [];
        if (this.config.shapes.length >= 2) this._swapShapes(index11, index11 - 1);
        this.render(true);
    }
    _onMoveShapeDown(event11) {
        const index11 = $(event11.target).closest(".moveShapeDown").data("index");
        if (!index11 && index11 != 0) return;
        this.config = this._getSubmitData();
        if (!this.config.shapes) this.config.shapes = [];
        if (this.config.shapes.length >= 2) this._swapShapes(index11, index11 + 1);
        this.render(true);
    }
    _swapShapes(i111, i211) {
        let temp11 = this.config.shapes[i111];
        this.config.shapes[i111] = this.config.shapes[i211];
        this.config.shapes[i211] = temp11;
    }
    _convertColor(colString11) {
        try {
            const c11 = Color.fromString(colString11);
            const rgba11 = c11.rgb;
            rgba11.push(1);
            return rgba11;
        } catch (e11) {
            return [
                1,
                1,
                1,
                1
            ];
        }
    }
    async _onInputChange(event11) {
        this.previewConfig = this._getSubmitData();
        if (event11.target.type === "color") {
            const color11 = $(event11.target).siblings(".color");
            color11.val(event11.target.value).trigger("change");
            return;
        }
        this._applyPreviews();
    }
    getPreviewIcons() {
        if (!this.config.id) return [];
        const tokens11 = this.token ? [
            this.token
        ] : canvas.tokens.placeables;
        const previewIcons11 = [];
        for (const tkn11 of tokens11)if (tkn11.tvaOverlays) {
            for (const c11 of tkn11.tvaOverlays)if (c11.overlayConfig && c11.overlayConfig.id === this.config.id) {
                // Effect icon found, however if we're in global preview then we need to take into account
                // a token/actor specific mapping which may override the global one
                if (this.token) previewIcons11.push({
                    token: tkn11,
                    icon: c11
                });
                else if (!(0, $b2HDo.getFlagMappings)(tkn11).find((m11)=>m11.id === this.config.id)) previewIcons11.push({
                    token: tkn11,
                    icon: c11
                });
            }
        }
        return previewIcons11;
    }
    async _applyPreviews() {
        const targets11 = this.getPreviewIcons();
        for (const target11 of targets11){
            const preview11 = (0, $64r9a.evaluateOverlayExpressions)(deepClone(this.previewConfig), target11.token, {
                overlayConfig: this.previewConfig
            });
            target11.icon.refresh(preview11, {
                preview: true,
                previewTexture: await (0, $64r9a.genTexture)(target11.token, preview11)
            });
        }
    }
    async _removePreviews() {
        const targets11 = this.getPreviewIcons();
        for (const target11 of targets11)target11.icon.refresh();
    }
    async getData(options11) {
        const data11 = super.getData(options11);
        data11.filters = Object.keys(PIXI.filters);
        data11.filters.push("OutlineOverlayFilter");
        data11.filters.sort();
        data11.tmfxActive = game.modules.get("tokenmagic")?.active;
        if (data11.tmfxActive) {
            data11.tmfxPresets = TokenMagic.getPresets().map((p11)=>p11.name);
            data11.filters.unshift("Token Magic FX");
        }
        data11.filters.unshift("NONE");
        const settings11 = mergeObject((0, $fTuKG.DEFAULT_OVERLAY_CONFIG), this.config, {
            inplace: false
        });
        data11.ceActive = game.modules.get("dfreds-convenient-effects")?.active;
        if (data11.ceActive) data11.ceEffects = game.dfreds.effects.all.map((ef11)=>ef11.name);
        data11.macros = game.macros.map((m11)=>m11.name);
        if (settings11.filter !== "NONE") {
            const filterOptions11 = genFilterOptionControls(settings11.filter, settings11.filterOptions);
            if (filterOptions11) settings11.filterOptions = filterOptions11;
            else settings11.filterOptions = null;
        } else settings11.filterOptions = null;
        data11.users = game.users.map((u11)=>{
            return {
                id: u11.id,
                name: u11.name,
                selected: settings11.limitedUsers.includes(u11.id)
            };
        });
        data11.fonts = Object.keys(CONFIG.fontDefinitions);
        const allMappings11 = (0, $aEqt1.getAllEffectMappings)(this.token, true).filter((m11)=>m11.id !== this.config.id);
        const [_11, groupedMappings11] = (0, $1v9Gt.sortMappingsToGroups)(allMappings11);
        data11.parents = groupedMappings11;
        if (!data11.parentID) data11.parentID = "TOKEN";
        if (!data11.anchor) data11.anchor = {
            x: 0.5,
            y: 0.5
        };
        // Cache Partials
        for (const shapeName11 of Object.keys((0, $fTuKG.OVERLAY_SHAPES)))await getTemplate(`modules/token-variants/templates/partials/shape${shapeName11}.html`);
        await getTemplate("modules/token-variants/templates/partials/repeating.html");
        await getTemplate("modules/token-variants/templates/partials/interpolateColor.html");
        data11.allShapes = Object.keys((0, $fTuKG.OVERLAY_SHAPES));
        data11.textAlignmentOptions = [
            {
                value: "left",
                label: "Left"
            },
            {
                value: "center",
                label: "Center"
            },
            {
                value: "right",
                label: "Right"
            },
            {
                value: "justify",
                label: "Justify"
            }
        ];
        // linkDimensions has been converted to linkDimensionsX and linkDimensionsY
        // Make sure we're using the latest fields
        // 20/07/2023
        if (!("linkDimensionsX" in settings11) && settings11.linkDimensions) {
            settings11.linkDimensionsX = true;
            settings11.linkDimensionsY = true;
        }
        return mergeObject(data11, settings11);
    }
    _getHeaderButtons() {
        const buttons11 = super._getHeaderButtons();
        buttons11.unshift({
            label: "Core Variables",
            class: ".core-variables",
            icon: "fas fa-file-import fa-fw",
            onclick: ()=>{
                let content11 = `
        <table>
          <tr><th>Variable</th><th>Description</th></tr>
          <tr><td>@hp</td><td>Actor Health</td></tr>
          <tr><td>@hpMax</td><td>Actor Health (Max)</td></tr>
          <tr><td>@gridSize</td><td>Grid Size (Pixels)</td></tr>
          <tr><td>@label</td><td>Mapping's Label Field</td></tr>
        </table>
        `;
                new Dialog({
                    title: `Core Variables`,
                    content: content11,
                    buttons: {}
                }).render(true);
            }
        });
        return buttons11;
    }
    async close(options11 = {}) {
        super.close(options11);
        this._removePreviews();
    }
    _getSubmitData() {
        let formData11 = super._getSubmitData();
        formData11 = expandObject(formData11);
        if (!formData11.repeating) delete formData11.repeat;
        if (!formData11.text.repeating) delete formData11.text.repeat;
        if (formData11.shapes) {
            formData11.shapes = Object.values(formData11.shapes);
            formData11.shapes.forEach((shape11)=>{
                if (!shape11.repeating) delete shape11.repeat;
            });
        }
        if (formData11.interactivity) formData11.interactivity = Object.values(formData11.interactivity).map((e11)=>{
            e11.macro = e11.macro.trim();
            e11.script = e11.script.trim();
            if (e11.tmfxPreset) e11.tmfxPreset = e11.tmfxPreset.trim();
            if (e11.ceEffect) e11.ceEffect = e11.ceEffect.trim();
            return e11;
        }).filter((e11)=>e11.macro || e11.script || e11.ceEffect || e11.tmfxPreset);
        else formData11.interactivity = [];
        if (formData11.variables) {
            formData11.variables = Object.values(formData11.variables);
            formData11.variables = formData11.variables.filter((v11)=>v11.name.trim() && v11.value.trim());
        }
        if (formData11.limitedUsers) {
            if (getType(formData11.limitedUsers) === "string") formData11.limitedUsers = [
                formData11.limitedUsers
            ];
            formData11.limitedUsers = formData11.limitedUsers.filter((uid11)=>uid11);
        } else formData11.limitedUsers = [];
        formData11.limitOnEffect = formData11.limitOnEffect.trim();
        formData11.limitOnProperty = formData11.limitOnProperty.trim();
        if (formData11.parentID === "TOKEN") formData11.parentID = "";
        if (formData11.filter === "OutlineOverlayFilter" && "filterOptions.outlineColor" in formData11) formData11["filterOptions.outlineColor"] = this._convertColor(formData11["filterOptions.outlineColor"]);
        else if (formData11.filter === "BevelFilter") {
            if ("filterOptions.lightColor" in formData11) formData11["filterOptions.lightColor"] = Number(Color.fromString(formData11["filterOptions.lightColor"]));
            if ("filterOptions.shadowColor" in formData11) formData11["filterOptions.shadowColor"] = Number(Color.fromString(formData11["filterOptions.shadowColor"]));
        } else if ([
            "DropShadowFilter",
            "GlowFilter",
            "OutlineFilter",
            "FilterFire"
        ].includes(formData11.filter)) {
            if ("filterOptions.color" in formData11) formData11["filterOptions.color"] = Number(Color.fromString(formData11["filterOptions.color"]));
        }
        return formData11;
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event11, formData11) {
        if (this.callback) this.callback(formData11);
    }
}
const FILTERS = {
    OutlineOverlayFilter: {
        defaultValues: {
            outlineColor: [
                0,
                0,
                0,
                1
            ],
            trueThickness: 1,
            animate: false
        },
        controls: [
            {
                type: "color",
                name: "outlineColor"
            },
            {
                type: "range",
                label: "Thickness",
                name: "trueThickness",
                min: 0,
                max: 5,
                step: 0.01
            },
            {
                type: "boolean",
                label: "Oscillate",
                name: "animate"
            }
        ],
        argType: "args"
    },
    AlphaFilter: {
        defaultValues: {
            alpha: 1
        },
        controls: [
            {
                type: "range",
                name: "alpha",
                min: 0,
                max: 1,
                step: 0.01
            }
        ],
        argType: "args"
    },
    BlurFilter: {
        defaultValues: {
            strength: 8,
            quality: 4
        },
        controls: [
            {
                type: "range",
                name: "strength",
                min: 0,
                max: 20,
                step: 1
            },
            {
                type: "range",
                name: "quality",
                min: 0,
                max: 20,
                step: 1
            }
        ],
        argType: "args"
    },
    BlurFilterPass: {
        defaultValues: {
            horizontal: false,
            strength: 8,
            quality: 4
        },
        controls: [
            {
                type: "boolean",
                name: "horizontal"
            },
            {
                type: "range",
                name: "strength",
                min: 0,
                max: 20,
                step: 1
            },
            {
                type: "range",
                name: "quality",
                min: 0,
                max: 20,
                step: 1
            }
        ],
        argType: "args"
    },
    NoiseFilter: {
        defaultValues: {
            noise: 0.5,
            seed: 4475160954091
        },
        controls: [
            {
                type: "range",
                name: "noise",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "seed",
                min: 0,
                max: 100000,
                step: 1
            }
        ],
        argType: "args"
    },
    AdjustmentFilter: {
        defaultValues: {
            gamma: 1,
            saturation: 1,
            contrast: 1,
            brightness: 1,
            red: 1,
            green: 1,
            blue: 1,
            alpha: 1
        },
        controls: [
            {
                type: "range",
                name: "gamma",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "saturation",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "contrast",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "brightness",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "red",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "green",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "blue",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "alpha",
                min: 0,
                max: 1,
                step: 0.01
            }
        ],
        argType: "options"
    },
    AdvancedBloomFilter: {
        defaultValues: {
            threshold: 0.5,
            bloomScale: 1,
            brightness: 1,
            blur: 8,
            quality: 4
        },
        controls: [
            {
                type: "range",
                name: "threshold",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "bloomScale",
                min: 0,
                max: 5,
                step: 0.01
            },
            {
                type: "range",
                name: "brightness",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "blur",
                min: 0,
                max: 20,
                step: 1
            },
            {
                type: "range",
                name: "quality",
                min: 0,
                max: 20,
                step: 1
            }
        ],
        argType: "options"
    },
    AsciiFilter: {
        defaultValues: {
            size: 8
        },
        controls: [
            {
                type: "range",
                name: "size",
                min: 0,
                max: 20,
                step: 0.01
            }
        ],
        argType: "args"
    },
    BevelFilter: {
        defaultValues: {
            rotation: 45,
            thickness: 2,
            lightColor: 0xffffff,
            lightAlpha: 0.7,
            shadowColor: 0x000000,
            shadowAlpha: 0.7
        },
        controls: [
            {
                type: "range",
                name: "rotation",
                min: 0,
                max: 360,
                step: 1
            },
            {
                type: "range",
                name: "thickness",
                min: 0,
                max: 20,
                step: 0.01
            },
            {
                type: "color",
                name: "lightColor"
            },
            {
                type: "range",
                name: "lightAlpha",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "color",
                name: "shadowColor"
            },
            {
                type: "range",
                name: "shadowAlpha",
                min: 0,
                max: 1,
                step: 0.01
            }
        ],
        argType: "options"
    },
    BloomFilter: {
        defaultValues: {
            blur: 2,
            quality: 4
        },
        controls: [
            {
                type: "range",
                name: "blur",
                min: 0,
                max: 20,
                step: 1
            },
            {
                type: "range",
                name: "quality",
                min: 0,
                max: 20,
                step: 1
            }
        ],
        argType: "args"
    },
    BulgePinchFilter: {
        defaultValues: {
            radius: 100,
            strength: 1
        },
        controls: [
            {
                type: "range",
                name: "radius",
                min: 0,
                max: 500,
                step: 1
            },
            {
                type: "range",
                name: "strength",
                min: -1,
                max: 1,
                step: 0.01
            }
        ],
        argType: "options"
    },
    CRTFilter: {
        defaultValues: {
            curvature: 1,
            lineWidth: 1,
            lineContrast: 0.25,
            verticalLine: false,
            noise: 0.3,
            noiseSize: 1,
            seed: 0,
            vignetting: 0.3,
            vignettingAlpha: 1,
            vignettingBlur: 0.3,
            time: 0
        },
        controls: [
            {
                type: "range",
                name: "curvature",
                min: 0,
                max: 20,
                step: 0.01
            },
            {
                type: "range",
                name: "lineWidth",
                min: 0,
                max: 20,
                step: 0.01
            },
            {
                type: "range",
                name: "lineContrast",
                min: 0,
                max: 5,
                step: 0.01
            },
            {
                type: "boolean",
                name: "verticalLine"
            },
            {
                type: "range",
                name: "noise",
                min: 0,
                max: 2,
                step: 0.01
            },
            {
                type: "range",
                name: "noiseSize",
                min: 0,
                max: 20,
                step: 0.01
            },
            {
                type: "range",
                name: "seed",
                min: 0,
                max: 100000,
                step: 1
            },
            {
                type: "range",
                name: "vignetting",
                min: 0,
                max: 20,
                step: 0.01
            },
            {
                type: "range",
                name: "vignettingAlpha",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "vignettingBlur",
                min: 0,
                max: 5,
                step: 0.01
            },
            {
                type: "range",
                name: "time",
                min: 0,
                max: 10000,
                step: 1
            }
        ],
        argType: "options"
    },
    DotFilter: {
        defaultValues: {
            scale: 1,
            angle: 5
        },
        controls: [
            {
                type: "range",
                name: "scale",
                min: 0,
                max: 50,
                step: 1
            },
            {
                type: "range",
                name: "angle",
                min: 0,
                max: 360,
                step: 0.1
            }
        ],
        argType: "args"
    },
    DropShadowFilter: {
        defaultValues: {
            rotation: 45,
            distance: 5,
            color: 0x000000,
            alpha: 0.5,
            shadowOnly: false,
            blur: 2,
            quality: 3
        },
        controls: [
            {
                type: "range",
                name: "rotation",
                min: 0,
                max: 360,
                step: 0.1
            },
            {
                type: "range",
                name: "distance",
                min: 0,
                max: 100,
                step: 0.1
            },
            {
                type: "color",
                name: "color"
            },
            {
                type: "range",
                name: "alpha",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "boolean",
                name: "shadowOnly"
            },
            {
                type: "range",
                name: "blur",
                min: 0,
                max: 20,
                step: 0.1
            },
            {
                type: "range",
                name: "quality",
                min: 0,
                max: 20,
                step: 1
            }
        ],
        argType: "options"
    },
    EmbossFilter: {
        defaultValues: {
            strength: 5
        },
        controls: [
            {
                type: "range",
                name: "strength",
                min: 0,
                max: 20,
                step: 1
            }
        ],
        argType: "args"
    },
    GlitchFilter: {
        defaultValues: {
            slices: 5,
            offset: 100,
            direction: 0,
            fillMode: 0,
            seed: 0,
            average: false,
            minSize: 8,
            sampleSize: 512
        },
        controls: [
            {
                type: "range",
                name: "slices",
                min: 0,
                max: 50,
                step: 1
            },
            {
                type: "range",
                name: "distance",
                min: 0,
                max: 1000,
                step: 1
            },
            {
                type: "range",
                name: "direction",
                min: 0,
                max: 360,
                step: 0.1
            },
            {
                type: "select",
                name: "fillMode",
                options: [
                    {
                        value: 0,
                        label: "TRANSPARENT"
                    },
                    {
                        value: 1,
                        label: "ORIGINAL"
                    },
                    {
                        value: 2,
                        label: "LOOP"
                    },
                    {
                        value: 3,
                        label: "CLAMP"
                    },
                    {
                        value: 4,
                        label: "MIRROR"
                    }
                ]
            },
            {
                type: "range",
                name: "seed",
                min: 0,
                max: 10000,
                step: 1
            },
            {
                type: "boolean",
                name: "average"
            },
            {
                type: "range",
                name: "minSize",
                min: 0,
                max: 500,
                step: 1
            },
            {
                type: "range",
                name: "sampleSize",
                min: 0,
                max: 1024,
                step: 1
            }
        ],
        argType: "options"
    },
    GlowFilter: {
        defaultValues: {
            distance: 10,
            outerStrength: 4,
            innerStrength: 0,
            color: 0xffffff,
            quality: 0.1,
            knockout: false
        },
        controls: [
            {
                type: "range",
                name: "distance",
                min: 1,
                max: 50,
                step: 1
            },
            {
                type: "range",
                name: "outerStrength",
                min: 0,
                max: 20,
                step: 1
            },
            {
                type: "range",
                name: "innerStrength",
                min: 0,
                max: 20,
                step: 1
            },
            {
                type: "color",
                name: "color"
            },
            {
                type: "range",
                name: "quality",
                min: 0,
                max: 5,
                step: 0.1
            },
            {
                type: "boolean",
                name: "knockout"
            }
        ],
        argType: "options"
    },
    GodrayFilter: {
        defaultValues: {
            angle: 30,
            gain: 0.5,
            lacunarity: 2.5,
            parallel: true,
            time: 0,
            alpha: 1.0
        },
        controls: [
            {
                type: "range",
                name: "angle",
                min: 0,
                max: 360,
                step: 0.1
            },
            {
                type: "range",
                name: "gain",
                min: 0,
                max: 5,
                step: 0.01
            },
            {
                type: "range",
                name: "lacunarity",
                min: 0,
                max: 5,
                step: 0.01
            },
            {
                type: "boolean",
                name: "parallel"
            },
            {
                type: "range",
                name: "time",
                min: 0,
                max: 10000,
                step: 1
            },
            {
                type: "range",
                name: "alpha",
                min: 0,
                max: 1,
                step: 0.01
            }
        ],
        argType: "options"
    },
    KawaseBlurFilter: {
        defaultValues: {
            blur: 4,
            quality: 3,
            clamp: false
        },
        controls: [
            {
                type: "range",
                name: "blur",
                min: 0,
                max: 20,
                step: 0.1
            },
            {
                type: "range",
                name: "quality",
                min: 0,
                max: 20,
                step: 1
            },
            {
                type: "boolean",
                name: "clamp"
            }
        ],
        argType: "args"
    },
    OldFilmFilter: {
        defaultValues: {
            sepia: 0.3,
            noise: 0.3,
            noiseSize: 1.0,
            scratch: 0.5,
            scratchDensity: 0.3,
            scratchWidth: 1.0,
            vignetting: 0.3,
            vignettingAlpha: 1.0,
            vignettingBlur: 0.3
        },
        controls: [
            {
                type: "range",
                name: "sepia",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "noise",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "noiseSize",
                min: 0,
                max: 5,
                step: 0.01
            },
            {
                type: "range",
                name: "scratch",
                min: 0,
                max: 5,
                step: 0.01
            },
            {
                type: "range",
                name: "scratchDensity",
                min: 0,
                max: 5,
                step: 0.01
            },
            {
                type: "range",
                name: "scratchWidth",
                min: 0,
                max: 20,
                step: 0.01
            },
            {
                type: "range",
                name: "vignetting",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "vignettingAlpha",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "vignettingBlur",
                min: 0,
                max: 5,
                step: 0.01
            }
        ],
        argType: "options"
    },
    OutlineFilter: {
        defaultValues: {
            thickness: 1,
            color: 0x000000,
            quality: 0.1
        },
        controls: [
            {
                type: "range",
                name: "thickness",
                min: 0,
                max: 20,
                step: 0.1
            },
            {
                type: "color",
                name: "color"
            },
            {
                type: "range",
                name: "quality",
                min: 0,
                max: 1,
                step: 0.01
            }
        ],
        argType: "args"
    },
    PixelateFilter: {
        defaultValues: {
            size: 1
        },
        controls: [
            {
                type: "range",
                name: "size",
                min: 1,
                max: 100,
                step: 1
            }
        ],
        argType: "args"
    },
    RGBSplitFilter: {
        defaultValues: {
            red: [
                -10,
                0
            ],
            green: [
                0,
                10
            ],
            blue: [
                0,
                0
            ]
        },
        controls: [
            {
                type: "point",
                name: "red",
                min: 0,
                max: 50,
                step: 1
            },
            {
                type: "point",
                name: "green",
                min: 0,
                max: 50,
                step: 1
            },
            {
                type: "point",
                name: "blue",
                min: 0,
                max: 50,
                step: 1
            }
        ],
        argType: "args"
    },
    RadialBlurFilter: {
        defaultValues: {
            angle: 0,
            center: [
                0,
                0
            ],
            radius: -1
        },
        controls: [
            {
                type: "range",
                name: "angle",
                min: 0,
                max: 360,
                step: 1
            },
            {
                type: "point",
                name: "center",
                min: 0,
                max: 1000,
                step: 1
            },
            {
                type: "range",
                name: "radius",
                min: -1,
                max: 1000,
                step: 1
            }
        ],
        argType: "args"
    },
    ReflectionFilter: {
        defaultValues: {
            mirror: true,
            boundary: 0.5,
            amplitude: [
                0,
                20
            ],
            waveLength: [
                30,
                100
            ],
            alpha: [
                1,
                1
            ],
            time: 0
        },
        controls: [
            {
                type: "boolean",
                name: "mirror"
            },
            {
                type: "range",
                name: "boundary",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "point",
                name: "amplitude",
                min: 0,
                max: 100,
                step: 1
            },
            {
                type: "point",
                name: "waveLength",
                min: 0,
                max: 500,
                step: 1
            },
            {
                type: "point",
                name: "alpha",
                min: 0,
                max: 1,
                step: 0.01
            },
            {
                type: "range",
                name: "time",
                min: 0,
                max: 10000,
                step: 1
            }
        ],
        argType: "options"
    },
    DisplacementFilter: {
        defaultValues: {
            sprite: "",
            textureScale: 1,
            displacementScale: 1
        },
        controls: [
            {
                type: "text",
                name: "sprite"
            },
            {
                type: "range",
                name: "textureScale",
                min: 0,
                max: 100,
                step: 0.1
            },
            {
                type: "range",
                name: "displacementScale",
                min: 0,
                max: 100,
                step: 0.1
            }
        ],
        argType: "options"
    },
    "Token Magic FX": {
        defaultValues: {
            params: []
        },
        controls: [
            {
                type: "tmfxPreset",
                name: "tmfxPreset"
            },
            {
                type: "json",
                name: "params"
            }
        ]
    }
};
function genFilterOptionControls(filterName11, filterOptions11 = {}) {
    if (!(filterName11 in FILTERS)) return;
    const options11 = mergeObject(FILTERS[filterName11].defaultValues, filterOptions11);
    const values11 = getControlValues(filterName11, options11);
    const controls11 = FILTERS[filterName11].controls;
    let controlsHTML11 = "<fieldset><legend>Options</legend>";
    for (const control11 of controls11)controlsHTML11 += genControl(control11, values11);
    controlsHTML11 += "</fieldset>";
    return controlsHTML11;
}
function getControlValues(filterName11, options11) {
    if (filterName11 === "OutlineOverlayFilter") options11.outlineColor = Color.fromRGB(options11.outlineColor).toString();
    else if (filterName11 === "BevelFilter") {
        options11.lightColor = Color.from(options11.lightColor).toString();
        options11.shadowColor = Color.from(options11.shadowColor).toString();
    } else if ([
        "DropShadowFilter",
        "GlowFilter",
        "OutlineFilter"
    ].includes(filterName11)) options11.color = Color.from(options11.color).toString();
    return options11;
}
function genControl(control11, values11) {
    const val11 = values11[control11.name];
    const name11 = control11.name;
    const label11 = control11.label ?? name11.charAt(0).toUpperCase() + name11.slice(1);
    const type11 = control11.type;
    if (type11 === "color") return `
<div class="form-group">
  <label>${label11}</label>
  <div class="form-fields">
      <input class="color" type="text" name="filterOptions.${name11}" value="${val11}">
      <input type="color" value="${val11}" data-edit="filterOptions.${name11}">
  </div>
</div>
`;
    else if (type11 === "range") return `
<div class="form-group">
  <label>${label11}</label>
  <div class="form-fields">
      <input type="range" name="filterOptions.${name11}" value="${val11}" min="${control11.min}" max="${control11.max}" step="${control11.step}">
      <span class="range-value">${val11}</span>
  </div>
</div>
`;
    else if (type11 === "boolean") return `
<div class="form-group">
  <label>${label11}</label>
  <div class="form-fields">
      <input type="checkbox" name="filterOptions.${name11}" data-dtype="Boolean" value="${val11}" ${val11 ? "checked" : ""}>
  </div>
</div>
    `;
    else if (type11 === "select") {
        let select11 = `
    <div class="form-group">
    <label>${label11}</label>
    <div class="form-fields">
      <select name="${name11}">
`;
        for (const opt11 of control11.options)select11 += `<option value="${opt11.value}" ${val11 === opt11.value ? 'selected="selected"' : ""}>${opt11.label}</option>`;
        select11 += `</select></div></div>`;
        return select11;
    } else if (type11 === "point") return `
<div class="form-group">
  <label>${label11}</label>
  <div class="form-fields">
      <input type="range" name="filterOptions.${name11}" value="${val11[0]}" min="${control11.min}" max="${control11.max}" step="${control11.step}">
      <span class="range-value">${val11[0]}</span>
  </div>
  <div class="form-fields">
    <input type="range" name="filterOptions.${name11}" value="${val11[1]}" min="${control11.min}" max="${control11.max}" step="${control11.step}">
    <span class="range-value">${val11[1]}</span>
  </div>
</div>
`;
    else if (type11 === "json") {
        let control11 = `
<div class="form-group">
  <label>${label11}</label>
  <div class="form-fields">
      <textarea style="width: 450px; height: 200px;" name="filterOptions.${name11}">${val11}</textarea>
  </div>`;
        if (game.modules.get("multi-token-edit")?.api.showGenericForm) control11 += `
  <div style="text-align: right; color: orangered;">
      <a> <i class="me-edit-json fas fa-edit" title="Show Generic Form"></i></a>
  </div>`;
        control11 += `</div>`;
        return control11;
    } else if (type11 === "text") return `
<div class="form-group">
  <label>${label11}</label>
  <div class="form-fields">
      <input type="text" name="filterOptions.${name11}" value="${val11}">
  </div>
</div>
`;
    else if (type11 === "tmfxPreset" && game.modules.get("tokenmagic")?.active) return `
      <div class="form-group">
        <label>Preset <span class="units">(TMFX)</span></label>
        <div class="form-fields">
          <input list="tmfxPresets" class="tmfxPreset">
          <button type="button" class="presetImport"><i class="fas fa-download"></i></button>
        </div>
      `;
    return "";
}
async function promptParamChoice(params11) {
    return new Promise((resolve11, reject11)=>{
        const buttons11 = {};
        for(let i31 = 0; i31 < params11.length; i31++){
            const label11 = params11[i31].filterType ?? params11[i31].filterId;
            buttons11[label11] = {
                label: label11,
                callback: ()=>{
                    resolve11(i31);
                }
            };
        }
        const dialog11 = new Dialog({
            title: "Select Filter To Edit",
            content: "",
            buttons: buttons11,
            close: ()=>resolve11(-1)
        });
        dialog11.render(true);
    });
}

});
parcelRequire.register("fTuKG", function(module, exports) {

$parcel$export(module.exports, "DEFAULT_ACTIVE_EFFECT_CONFIG", () => $b923d8c554f68fde$export$49d6e2dab8292a11);
$parcel$export(module.exports, "DEFAULT_OVERLAY_CONFIG", () => $b923d8c554f68fde$export$c702aa0e0c4769fd);
$parcel$export(module.exports, "OVERLAY_SHAPES", () => $b923d8c554f68fde$export$7ce049e9aaa9e189);
$parcel$export(module.exports, "CORE_SHAPE", () => $b923d8c554f68fde$export$90019cfa1f313e2c);
const $b923d8c554f68fde$export$49d6e2dab8292a11 = {
    id: "",
    label: "",
    expression: "",
    codeExp: "",
    imgName: "",
    imgSrc: "",
    priority: 50,
    config: null,
    overlay: false,
    alwaysOn: false,
    tokens: undefined,
    disabled: false,
    overlayConfig: null,
    targetActors: null,
    group: "Default"
};
const $b923d8c554f68fde$export$c702aa0e0c4769fd = {
    img: "",
    imgLinked: false,
    alpha: 1,
    scaleX: 1,
    scaleY: 1,
    offsetX: 0,
    offsetY: 0,
    angle: 0,
    filter: "NONE",
    filterOptions: {},
    inheritTint: false,
    top: false,
    bottom: false,
    underlay: false,
    linkRotation: true,
    linkMirror: true,
    linkOpacity: false,
    linkScale: true,
    linkDimensionX: false,
    linkDimensionY: false,
    linkStageScale: false,
    mirror: false,
    tint: null,
    loop: true,
    playOnce: false,
    animation: {
        rotate: false,
        duration: 5000,
        clockwise: true,
        relative: false
    },
    limitedUsers: [],
    limitedToOwner: false,
    limitOnProperty: "",
    alwaysVisible: false,
    text: {
        text: "",
        align: CONFIG.canvasTextStyle.align,
        fontSize: CONFIG.canvasTextStyle.fontSize,
        fontFamily: CONFIG.canvasTextStyle.fontFamily,
        fill: CONFIG.canvasTextStyle.fill,
        dropShadow: CONFIG.canvasTextStyle.dropShadow,
        strokeThickness: CONFIG.canvasTextStyle.strokeThickness,
        stroke: CONFIG.canvasTextStyle.stroke,
        curve: {
            angle: 0,
            radius: 0,
            invert: false
        },
        letterSpacing: CONFIG.canvasTextStyle.letterSpacing,
        repeating: false,
        wordWrap: false,
        wordWrapWidth: 200,
        breakWords: false,
        maxHeight: 0
    },
    parentID: "",
    id: null,
    anchor: {
        x: 0.5,
        y: 0.5
    },
    shapes: [],
    variables: [],
    interactivity: [],
    ui: false
};
const $b923d8c554f68fde$export$7ce049e9aaa9e189 = {
    Rectangle: {
        type: "rectangle",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        radius: 0,
        repeating: false
    },
    Ellipse: {
        type: "ellipse",
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        repeating: false
    },
    Polygon: {
        type: "polygon",
        x: 0,
        y: 0,
        points: "0,1,0.95,0.31,0.59,-0.81,-0.59,-0.81,-0.95,0.31",
        scale: 50,
        repeating: false
    },
    Torus: {
        type: "torus",
        x: 0,
        y: 0,
        innerRadius: 50,
        outerRadius: 100,
        startAngle: 0,
        endAngle: 180,
        repeating: false
    }
};
const $b923d8c554f68fde$export$90019cfa1f313e2c = {
    line: {
        width: 1,
        color: "#000000",
        alpha: 1
    },
    fill: {
        color: "#ffffff",
        color2: "",
        prc: "",
        alpha: 1
    }
};

});

parcelRequire.register("aEqt1", function(module, exports) {

$parcel$export(module.exports, "registerEffectMappingHooks", () => registerEffectMappingHooks);
$parcel$export(module.exports, "updateWithEffectMapping", () => updateWithEffectMapping);
$parcel$export(module.exports, "getTokenEffects", () => getTokenEffects);
$parcel$export(module.exports, "getAllEffectMappings", () => getAllEffectMappings);
$parcel$export(module.exports, "setOverlayVisibility", () => setOverlayVisibility);
$parcel$export(module.exports, "toggleTemplate", () => toggleTemplate);
$parcel$export(module.exports, "toggleTemplateOnSelected", () => toggleTemplateOnSelected);
$parcel$export(module.exports, "getTokenHP", () => getTokenHP);
$parcel$export(module.exports, "VALID_EXPRESSION", () => VALID_EXPRESSION);
$parcel$export(module.exports, "evaluateComparator", () => evaluateComparator);

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");

var $64r9a = parcelRequire("64r9a");

var $iJML9 = parcelRequire("iJML9");

var $etBGd = parcelRequire("etBGd");
const EXPRESSION_MATCH_RE = /(\\\()|(\\\))|(\|\|)|(\&\&)|(\\\!)/g;
const PF2E_ITEM_TYPES = [
    "condition",
    "effect",
    "weapon",
    "equipment"
];
const ITEM_TYPES = [
    "equipment",
    "weapon"
];
const feature_id = "EffectMappings";
function registerEffectMappingHooks() {
    if (!(0, $b2HDo.FEATURE_CONTROL)[feature_id]) {
        [
            "canvasReady",
            "createActiveEffect",
            "deleteActiveEffect",
            "preUpdateActiveEffect",
            "updateActiveEffect",
            "createCombatant",
            "deleteCombatant",
            "preUpdateCombat",
            "updateCombat",
            "deleteCombat",
            "preUpdateToken",
            "preUpdateActor",
            "updateActor",
            "updateToken",
            "createToken",
            "preUpdateItem",
            "updateItem",
            "createItem",
            "deleteItem"
        ].forEach((name11)=>(0, $iJML9.unregisterHook)(feature_id, name11));
        return;
    }
    if (game.user.isGM) {
        (0, $iJML9.registerHook)(feature_id, "canvasReady", _refreshTokenMappings);
        _refreshTokenMappings();
    }
    (0, $iJML9.registerHook)(feature_id, "createActiveEffect", (activeEffect11, options11, userId11)=>{
        if (!activeEffect11.parent || activeEffect11.disabled || game.userId !== userId11) return;
        const effectName11 = activeEffect11.name ?? activeEffect11.label;
        _updateImageOnEffectChange(effectName11, activeEffect11.parent, true);
    });
    (0, $iJML9.registerHook)(feature_id, "deleteActiveEffect", (activeEffect11, options11, userId11)=>{
        if (!activeEffect11.parent || activeEffect11.disabled || game.userId !== userId11) return;
        const effectName11 = activeEffect11.name ?? activeEffect11.label;
        _updateImageOnEffectChange(effectName11, activeEffect11.parent, false);
    });
    (0, $iJML9.registerHook)(feature_id, "preUpdateActiveEffect", _preUpdateActiveEffect);
    (0, $iJML9.registerHook)(feature_id, "updateActiveEffect", _updateActiveEffect);
    (0, $iJML9.registerHook)(feature_id, "preUpdateToken", _preUpdateToken);
    (0, $iJML9.registerHook)(feature_id, "preUpdateActor", _preUpdateActor);
    (0, $iJML9.registerHook)(feature_id, "updateActor", _updateActor);
    (0, $iJML9.registerHook)(feature_id, "updateToken", _updateToken);
    (0, $iJML9.registerHook)(feature_id, "createToken", _createToken);
    (0, $iJML9.registerHook)(feature_id, "createCombatant", _createCombatant);
    (0, $iJML9.registerHook)(feature_id, "deleteCombatant", (combatant11, options11, userId11)=>{
        if (game.userId !== userId11) return;
        _deleteCombatant(combatant11);
    });
    (0, $iJML9.registerHook)(feature_id, "preUpdateCombat", _preUpdateCombat);
    (0, $iJML9.registerHook)(feature_id, "updateCombat", _updateCombat);
    (0, $iJML9.registerHook)(feature_id, "deleteCombat", (combat11, options11, userId11)=>{
        if (game.userId !== userId11) return;
        combat11.combatants.forEach((combatant11)=>{
            _deleteCombatant(combatant11);
        });
    });
    const applicable_item_types11 = game.system.id === "pf2e" ? PF2E_ITEM_TYPES : ITEM_TYPES;
    // Want to track condition/effect previous name so that the config can be reverted for it
    (0, $iJML9.registerHook)(feature_id, "preUpdateItem", (item11, change11, options11, userId11)=>{
        if (game.user.id === userId11 && applicable_item_types11.includes(item11.type)) options11["token-variants-old-name"] = item11.name;
        _preUpdateAssign(item11.parent, change11, options11);
    });
    (0, $iJML9.registerHook)(feature_id, "createItem", (item11, options11, userId11)=>{
        if (game.userId !== userId11 || !applicable_item_types11.includes(item11.type) || !item11.parent) return;
        _updateImageOnEffectChange(item11.name, item11.parent, true);
    });
    (0, $iJML9.registerHook)(feature_id, "deleteItem", (item11, options11, userId11)=>{
        if (game.userId !== userId11 || !applicable_item_types11.includes(item11.type) || !item11.parent || item11.disabled) return;
        _updateImageOnEffectChange(item11.name, item11.parent, false);
    });
    // Status Effects can be applied "stealthily" on item equip/un-equip
    (0, $iJML9.registerHook)(feature_id, "updateItem", _updateItem);
}
async function _refreshTokenMappings() {
    for (const tkn11 of canvas.tokens.placeables)await updateWithEffectMapping(tkn11);
}
function _createCombatant(combatant11, options11, userId11) {
    if (game.userId !== userId11) return;
    const token11 = combatant11._token || canvas.tokens.get(combatant11.tokenId);
    if (!token11 || !token11.actor) return;
    updateWithEffectMapping(token11, {
        added: [
            "token-variants-combat"
        ]
    });
}
function _preUpdateActiveEffect(activeEffect11, change11, options11, userId11) {
    if (!activeEffect11.parent || game.userId !== userId11) return;
    if ("label" in change11) options11["token-variants-old-name"] = activeEffect11.label;
}
function _updateActiveEffect(activeEffect11, change11, options11, userId11) {
    if (!activeEffect11.parent || game.userId !== userId11) return;
    const added11 = [];
    const removed11 = [];
    if ("disabled" in change11) {
        if (change11.disabled) removed11.push(activeEffect11.label);
        else added11.push(activeEffect11.label);
    }
    if ("label" in change11) {
        removed11.push(options11["token-variants-old-name"]);
        added11.push(change11.label);
    }
    if (added11.length || removed11.length) _updateImageOnMultiEffectChange(activeEffect11.parent, added11, removed11);
}
function _preUpdateToken(token11, change11, options11, userId11) {
    if (game.user.id !== userId11 || change11.actorId) return;
    const preUpdateEffects11 = getTokenEffects(token11, true);
    if (preUpdateEffects11.length) setProperty(options11, "token-variants.preUpdateEffects", preUpdateEffects11);
    if (game.system.id === "dnd5e" && token11.actor?.isPolymorphed) setProperty(options11, "token-variants.wasPolymorphed", true);
}
async function _updateToken(token11, change11, options11, userId11) {
    if (game.user.id !== userId11 || change11.actorId) return;
    const addedEffects11 = [];
    const removedEffects11 = [];
    const preUpdateEffects11 = getProperty(options11, "token-variants.preUpdateEffects") || [];
    const postUpdateEffects11 = getTokenEffects(token11, true);
    (0, $1mRWy.determineAddedRemovedEffects)(addedEffects11, removedEffects11, postUpdateEffects11, preUpdateEffects11);
    if (addedEffects11.length || removedEffects11.length || "actorLink" in change11) updateWithEffectMapping(token11, {
        added: addedEffects11,
        removed: removedEffects11
    });
    else if (getProperty(options11, "token-variants.wasPolymorphed") && !token11.actor?.isPolymorphed) updateWithEffectMapping(token11);
    if (game.userId === userId11 && "hidden" in change11) updateWithEffectMapping(token11, {
        added: change11.hidden ? [
            "token-variants-visibility"
        ] : [],
        removed: !change11.hidden ? [
            "token-variants-visibility"
        ] : []
    });
}
function _preUpdateActor(actor11, change11, options11, userId11) {
    if (game.user.id !== userId11) return;
    _preUpdateAssign(actor11, change11, options11);
}
async function _updateActor(actor11, change11, options11, userId11) {
    if (game.user.id !== userId11) return;
    if ("flags" in change11 && "token-variants" in change11.flags) {
        const tokenVariantFlags11 = change11.flags["token-variants"];
        if ("effectMappings" in tokenVariantFlags11 || "-=effectMappings" in tokenVariantFlags11) {
            const tokens11 = actor11.token ? [
                actor11.token
            ] : (0, $1mRWy.getAllActorTokens)(actor11, true, !(0, $b2HDo.TVA_CONFIG).mappingsCurrentSceneOnly);
            tokens11.forEach((tkn11)=>updateWithEffectMapping(tkn11));
            for (const tkn11 of tokens11)if (tkn11.object && (0, $b2HDo.TVA_CONFIG).filterEffectIcons) await tkn11.object.drawEffects();
        }
    }
    _preUpdateCheck(actor11, options11);
}
function _preUpdateAssign(actor11, change11, options11) {
    if (!actor11) return;
    // Determine which comparators are applicable so that we can compare after the
    // actor update
    const tokens11 = actor11.token ? [
        actor11.token
    ] : (0, $1mRWy.getAllActorTokens)(actor11, true, !(0, $b2HDo.TVA_CONFIG).mappingsCurrentSceneOnly);
    if ((0, $b2HDo.TVA_CONFIG).internalEffects.hpChange.enabled && tokens11.length) applyHpChangeEffect(actor11, change11, tokens11);
    for (const tkn11 of tokens11){
        const preUpdateEffects11 = getTokenEffects(tkn11, true);
        if (preUpdateEffects11.length) setProperty(options11, "token-variants." + tkn11.id + ".preUpdateEffects", preUpdateEffects11);
    }
}
function _preUpdateCheck(actor11, options11, pAdded11 = [], pRemoved11 = []) {
    if (!actor11) return;
    const tokens11 = actor11.token ? [
        actor11.token
    ] : (0, $1mRWy.getAllActorTokens)(actor11, true, !(0, $b2HDo.TVA_CONFIG).mappingsCurrentSceneOnly);
    for (const tkn11 of tokens11){
        // Check if effects changed by comparing them against the ones calculated in preUpdate*
        const added11 = [
            ...pAdded11
        ];
        const removed11 = [
            ...pRemoved11
        ];
        const postUpdateEffects11 = getTokenEffects(tkn11, true);
        const preUpdateEffects11 = getProperty(options11, "token-variants." + tkn11.id + ".preUpdateEffects") ?? [];
        (0, $1mRWy.determineAddedRemovedEffects)(added11, removed11, postUpdateEffects11, preUpdateEffects11);
        if (added11.length || removed11.length) updateWithEffectMapping(tkn11, {
            added: added11,
            removed: removed11
        });
    }
}
function _createToken(token11, options11, userId11) {
    if (userId11 && userId11 === game.user.id) updateWithEffectMapping(token11);
}
function _preUpdateCombat(combat11, round11, options11, userId11) {
    if (game.userId !== userId11) return;
    options11["token-variants"] = {
        combatantId: combat11?.combatant?.token?.id,
        nextCombatantId: combat11?.nextCombatant?.token?.id
    };
}
function _updateCombat(combat11, round11, options11, userId11) {
    if (game.userId !== userId11) return;
    const previousCombatantId11 = options11["token-variants"]?.combatantId;
    const previousNextCombatantId11 = options11["token-variants"]?.nextCombatantId;
    const currentCombatantId11 = combat11?.combatant?.token?.id;
    const currentNextCombatantId11 = combat11?.nextCombatant?.token?.id;
    const updateCombatant11 = function(id11, added11 = [], removed11 = []) {
        if (game.user.isGM) {
            const token11 = canvas.tokens.get(id11);
            if (token11) updateWithEffectMapping(token11, {
                added: added11,
                removed: removed11
            });
        } else {
            const message11 = {
                handlerName: "effectMappings",
                args: {
                    tokenId: id11,
                    sceneId: canvas.scene.id,
                    added: added11,
                    removed: removed11
                },
                type: "UPDATE"
            };
            game.socket?.emit("module.token-variants", message11);
        }
    };
    if (previousCombatantId11 !== currentCombatantId11) {
        if (previousCombatantId11) updateCombatant11(previousCombatantId11, [], [
            "combat-turn"
        ]);
        if (currentCombatantId11) updateCombatant11(currentCombatantId11, [
            "combat-turn"
        ], []);
    }
    if (previousNextCombatantId11 !== currentNextCombatantId11) {
        if (previousNextCombatantId11) updateCombatant11(previousNextCombatantId11, [], [
            "combat-turn-next"
        ]);
        if (currentNextCombatantId11) updateCombatant11(currentNextCombatantId11, [
            "combat-turn-next"
        ], []);
    }
}
function _updateItem(item11, change11, options11, userId11) {
    const added11 = [];
    const removed11 = [];
    if (game.user.id === userId11) {
        // Handle condition/effect name change
        if (options11["token-variants-old-name"] !== item11.name) {
            added11.push(item11.name);
            removed11.push(options11["token-variants-old-name"]);
        }
        _preUpdateCheck(item11.parent, options11, added11, removed11);
    }
}
let EFFECT_M_QUEUES = {};
let EFFECT_M_TIMER;
async function updateWithEffectMapping(token11, { added: added11 = [], removed: removed11 = [] } = {}) {
    const callUpdateWithEffectMapping11 = function() {
        for (const id11 of Object.keys(EFFECT_M_QUEUES)){
            const m11 = EFFECT_M_QUEUES[id11];
            _updateWithEffectMapping(m11.token, m11.opts.added, m11.opts.removed);
        }
        EFFECT_M_QUEUES = {};
    };
    clearTimeout(EFFECT_M_TIMER);
    if (token11.id in EFFECT_M_QUEUES) {
        const opts11 = EFFECT_M_QUEUES[token11.id].opts;
        added11.forEach((a11)=>opts11.added.add(a11));
        removed11.forEach((a11)=>opts11.removed.add(a11));
    } else EFFECT_M_QUEUES[token11.id] = {
        token: token11,
        opts: {
            added: new Set(added11),
            removed: new Set(removed11)
        }
    };
    EFFECT_M_TIMER = setTimeout(callUpdateWithEffectMapping11, 100);
}
async function _updateWithEffectMapping(token11, added11, removed11) {
    const placeable11 = token11.object ?? token11._object ?? token11;
    token11 = token11.document ?? token11;
    const tokenImgName11 = token11.getFlag("token-variants", "name") || (0, $1mRWy.getFileName)(token11.texture.src);
    let tokenDefaultImg11 = token11.getFlag("token-variants", "defaultImg");
    const animate11 = !(0, $b2HDo.TVA_CONFIG).disableTokenUpdateAnimation;
    const tokenUpdateObj11 = {};
    const hadActiveHUD11 = token11.object?.hasActiveHUD;
    const toggleStatus11 = canvas.tokens.hud.object?.id === token11.id ? canvas.tokens.hud._statusEffects : false;
    let effects11 = getTokenEffects(token11);
    // If effect is included in `added` or `removed` we need to:
    // 1. Insert it into `effects` if it's not there in case of 'added' and place it on top of the list
    // 2. Remove it in case of 'removed'
    for (const ef31 of added11){
        const i31 = effects11.findIndex((s11)=>s11 === ef31);
        if (i31 === -1) effects11.push(ef31);
        else if (i31 < effects11.length - 1) {
            effects11.splice(i31, 1);
            effects11.push(ef31);
        }
    }
    for (const ef31 of removed11){
        const i31 = effects11.findIndex((s11)=>s11 === ef31);
        if (i31 !== -1) effects11.splice(i31, 1);
    }
    const mappings11 = getAllEffectMappings(token11);
    // 3. Configurations may contain effect names in a form of a logical expressions
    //    We need to evaluate them and insert them into effects/added/removed if needed
    for (const mapping11 of mappings11)evaluateMappingExpression(mapping11, effects11, token11, added11, removed11);
    // Accumulate all scripts that will need to be run after the update
    const executeOnCallback11 = [];
    const deferredUpdateScripts11 = [];
    for (const ef31 of removed11){
        const script11 = mappings11.find((m11)=>m11.id === ef31)?.config?.tv_script;
        if (script11) {
            if (script11.onRemove) {
                if (script11.onRemove.includes("tvaUpdate")) deferredUpdateScripts11.push(script11.onRemove);
                else executeOnCallback11.push({
                    script: script11.onRemove,
                    token: token11
                });
            }
            if (script11.tmfxPreset) executeOnCallback11.push({
                tmfxPreset: script11.tmfxPreset,
                token: token11,
                action: "remove"
            });
            if (script11.ceEffect?.name) executeOnCallback11.push({
                ceEffect: script11.ceEffect,
                token: token11,
                action: "remove"
            });
            if (script11.macroOnApply) executeOnCallback11.push({
                macro: script11.macroOnApply,
                token: token11
            });
        }
    }
    for (const ef31 of added11){
        const script11 = mappings11.find((m11)=>m11.id === ef31)?.config?.tv_script;
        if (script11) {
            if (script11.onApply) {
                if (script11.onApply.includes("tvaUpdate")) deferredUpdateScripts11.push(script11.onApply);
                else executeOnCallback11.push({
                    script: script11.onApply,
                    token: token11
                });
            }
            if (script11.tmfxPreset) executeOnCallback11.push({
                tmfxPreset: script11.tmfxPreset,
                token: token11,
                action: "apply"
            });
            if (script11.ceEffect?.name) executeOnCallback11.push({
                ceEffect: script11.ceEffect,
                token: token11,
                action: "apply"
            });
            if (script11.macroOnRemove) executeOnCallback11.push({
                macro: script11.macroOnRemove,
                token: token11
            });
        }
    }
    // Next we're going to determine what configs need to be applied and in what order
    // Filter effects that do not have a mapping and sort based on priority
    effects11 = mappings11.filter((m11)=>effects11.includes(m11.id)).sort((ef111, ef211)=>ef111.priority - ef211.priority);
    // Check if image update should be prevented based on module settings
    let disableImageUpdate11 = false;
    if ((0, $b2HDo.TVA_CONFIG).disableImageChangeOnPolymorphed && token11.actor?.isPolymorphed) disableImageUpdate11 = true;
    else if ((0, $b2HDo.TVA_CONFIG).disableImageUpdateOnNonPrototype && token11.actor?.prototypeToken?.texture?.src !== token11.texture.src) {
        disableImageUpdate11 = true;
        const tknImg11 = token11.texture.src;
        for (const m11 of mappings11)if (m11.imgSrc === tknImg11) {
            disableImageUpdate11 = false;
            break;
        }
    }
    if (disableImageUpdate11) tokenDefaultImg11 = "";
    let updateCall11;
    if (effects11.length > 0) {
        // Some effect mappings may not have images, find a mapping with one if it exists
        const newImg11 = {
            imgSrc: "",
            imgName: ""
        };
        if (!disableImageUpdate11) {
            for(let i31 = effects11.length - 1; i31 >= 0; i31--)if (effects11[i31].imgSrc) {
                let iSrc11 = effects11[i31].imgSrc;
                if (iSrc11.includes("*") || iSrc11.includes("{") && iSrc11.includes("}")) // wildcard image, if this effect hasn't been newly applied we do not want to randomize the image again
                {
                    if (!added11.has(effects11[i31].overlayConfig?.effect)) {
                        newImg11.imgSrc = token11.texture.src;
                        newImg11.imgName = (0, $1mRWy.getFileName)(newImg11.imgSrc);
                        break;
                    }
                }
                newImg11.imgSrc = effects11[i31].imgSrc;
                newImg11.imgName = effects11[i31].imgName;
                break;
            }
        }
        // Collect custom configs to be applied to the token
        let config11;
        if ((0, $b2HDo.TVA_CONFIG).stackStatusConfig) {
            config11 = {};
            for (const ef31 of effects11)config11 = mergeObject(config11, ef31.config);
        } else {
            for(let i31 = effects11.length - 1; i31 >= 0; i31--)if (effects11[i31].config && Object.keys(effects11[i31].config).length !== 0) {
                config11 = effects11[i31].config;
                break;
            }
        }
        // Use or update the default (original) token image
        if (!newImg11.imgSrc && tokenDefaultImg11) {
            delete tokenUpdateObj11.flags?.["token-variants"]?.defaultImg;
            setProperty(tokenUpdateObj11, "flags.token-variants.-=defaultImg", null);
            newImg11.imgSrc = tokenDefaultImg11.imgSrc;
            newImg11.imgName = tokenDefaultImg11.imgName;
        } else if (!tokenDefaultImg11 && newImg11.imgSrc) setProperty(tokenUpdateObj11, "flags.token-variants.defaultImg", {
            imgSrc: token11.texture.src,
            imgName: tokenImgName11
        });
        updateCall11 = ()=>(0, $1mRWy.updateTokenImage)(newImg11.imgSrc ?? null, {
                token: token11,
                imgName: newImg11.imgName ? newImg11.imgName : tokenImgName11,
                tokenUpdate: tokenUpdateObj11,
                callback: _postTokenUpdateProcessing.bind(null, token11, hadActiveHUD11, toggleStatus11, executeOnCallback11),
                config: config11,
                animate: animate11
            });
    }
    // If no mapping has been found and the default image (image prior to effect triggered update) is different from current one
    // reset the token image back to default
    if (effects11.length === 0 && tokenDefaultImg11) {
        delete tokenUpdateObj11.flags?.["token-variants"]?.defaultImg;
        setProperty(tokenUpdateObj11, "flags.token-variants.-=defaultImg", null);
        updateCall11 = ()=>(0, $1mRWy.updateTokenImage)(tokenDefaultImg11.imgSrc, {
                token: token11,
                imgName: tokenDefaultImg11.imgName,
                tokenUpdate: tokenUpdateObj11,
                callback: _postTokenUpdateProcessing.bind(null, token11, hadActiveHUD11, toggleStatus11, executeOnCallback11),
                animate: animate11
            });
    // If no default image exists but a custom effect is applied, we still want to perform an update to
    // clear it
    } else if (effects11.length === 0 && token11.getFlag("token-variants", "usingCustomConfig")) updateCall11 = ()=>(0, $1mRWy.updateTokenImage)(token11.texture.src, {
            token: token11,
            imgName: tokenImgName11,
            tokenUpdate: tokenUpdateObj11,
            callback: _postTokenUpdateProcessing.bind(null, token11, hadActiveHUD11, toggleStatus11, executeOnCallback11),
            animate: animate11
        });
    if (updateCall11) {
        if (deferredUpdateScripts11.length) {
            for(let i31 = 0; i31 < deferredUpdateScripts11.length; i31++)if (i31 === deferredUpdateScripts11.length - 1) await (0, $1mRWy.tv_executeScript)(deferredUpdateScripts11[i31], {
                token: token11,
                tvaUpdate: ()=>{
                    updateCall11();
                }
            });
            else await (0, $1mRWy.tv_executeScript)(deferredUpdateScripts11[i31], {
                token: token11,
                tvaUpdate: ()=>{}
            });
        } else updateCall11();
    } else if (executeOnCallback11.length || deferredUpdateScripts11.length) {
        _postTokenUpdateProcessing(token11, hadActiveHUD11, toggleStatus11, executeOnCallback11);
        _postTokenUpdateProcessing(token11, hadActiveHUD11, toggleStatus11, deferredUpdateScripts11);
    }
    (0, $64r9a.broadcastOverlayRedraw)(placeable11);
}
async function _postTokenUpdateProcessing(token11, hadActiveHUD11, toggleStatus11, scripts11) {
    if (hadActiveHUD11 && token11.object) {
        canvas.tokens.hud.bind(token11.object);
        if (toggleStatus11) canvas.tokens.hud._toggleStatusEffects(true);
    }
    for (const scr11 of scripts11){
        if (scr11.script) await (0, $1mRWy.tv_executeScript)(scr11.script, {
            token: scr11.token
        });
        else if (scr11.tmfxPreset) await (0, $1mRWy.applyTMFXPreset)(scr11.token, scr11.tmfxPreset, scr11.action);
        else if (scr11.ceEffect) await (0, $1mRWy.applyCEEffect)(scr11.token, scr11.ceEffect, scr11.action);
        else if (scr11.macro) await (0, $1mRWy.executeMacro)(scr11.macro, token11);
    }
}
function getAllEffectMappings(token11 = null, includeDisabled11 = false) {
    let allMappings11 = (0, $b2HDo.getFlagMappings)(token11);
    const unique11 = new Set();
    // TODO: replace with a setting
    allMappings11.forEach((m11)=>unique11.add((0, $b2HDo.TVA_CONFIG).mergeGroup ? m11.group : m11.label));
    // Sort out global mappings that do not apply to this actor
    let applicableGlobal11 = (0, $b2HDo.TVA_CONFIG).globalMappings;
    if (token11?.actor?.type) {
        const actorType11 = token11.actor.type;
        applicableGlobal11 = applicableGlobal11.filter((m11)=>{
            if (!m11.targetActors || m11.targetActors.includes(actorType11)) return !unique11.has((0, $b2HDo.TVA_CONFIG).mergeGroup ? m11.group : m11.label);
            return false;
        });
    }
    allMappings11 = allMappings11.concat(applicableGlobal11);
    if (!includeDisabled11) allMappings11 = allMappings11.filter((m11)=>!m11.disabled);
    return allMappings11;
}
async function setOverlayVisibility({ userName: userName11 = null, userId: userId11 = null, label: label11 = null, group: group11 = null, token: token11 = null, visible: visible11 = true } = {}) {
    if (!label11 && !group11) return;
    if (userName11) userId11 = game.users.find((u11)=>u11.name === userName11)?.id;
    if (!userId11) return;
    let tokenMappings11 = (0, $b2HDo.getFlagMappings)(token11);
    let globalMappings11 = (0, $b2HDo.TVA_CONFIG).globalMappings;
    let updateToken11 = false;
    let updateGlobal11 = false;
    const updateMappings11 = function(mappings11) {
        mappings11 = mappings11.filter((m11)=>m11.overlay && (m11.label === label11 || m11.group === group11));
        let found11 = false;
        if (mappings11.length) found11 = true;
        mappings11.forEach((m11)=>{
            const overlayConfig11 = m11.overlayConfig;
            if (visible11) {
                if (!overlayConfig11.limitedUsers) overlayConfig11.limitedUsers = [];
                if (!overlayConfig11.limitedUsers.find((u11)=>u11 === userId11)) overlayConfig11.limitedUsers.push(userId11);
            } else if (overlayConfig11.limitedUsers) overlayConfig11.limitedUsers = overlayConfig11.limitedUsers.filter((u11)=>u11 !== userId11);
        });
        return found11;
    };
    updateToken11 = updateMappings11(tokenMappings11);
    updateGlobal11 = updateMappings11(globalMappings11);
    if (updateGlobal11) await (0, $b2HDo.updateSettings)({
        globalMappings: globalMappings11
    });
    if (updateToken11) {
        const actor11 = game.actors.get(token11.document.actorId);
        if (actor11) await actor11.setFlag("token-variants", "effectMappings", tokenMappings11);
    }
    if (updateToken11 || updateGlobal11) (0, $64r9a.drawOverlays)(token11);
}
function _getTemplateMappings(templateName11) {
    return ((0, $b2HDo.TVA_CONFIG).templateMappings.find((t11)=>t11.name === templateName11) ?? (0, $etBGd.CORE_TEMPLATES).find((t11)=>t11.name === templateName11))?.mappings;
}
async function applyTemplate(token11, templateName11 = null, mappings11 = null) {
    if (templateName11) mappings11 = _getTemplateMappings(templateName11);
    if (!token11 || !mappings11) return;
    const actor11 = game.actors.get(token11.actor.id);
    if (!actor11) return;
    const templateMappings11 = deepClone(mappings11);
    templateMappings11.forEach((tm11)=>tm11.tokens = [
            token11.id
        ]);
    const actMappings11 = (0, $1mRWy.mergeMappings)(templateMappings11, (0, $b2HDo.getFlagMappings)(actor11));
    await actor11.setFlag("token-variants", "effectMappings", actMappings11);
    await updateWithEffectMapping(token11);
    (0, $64r9a.drawOverlays)(token11);
}
async function removeTemplate(token11, templateName11 = null, mappings11 = null) {
    if (templateName11) mappings11 = _getTemplateMappings(templateName11);
    if (!token11 || !mappings11) return;
    const actor11 = game.actors.get(token11.actor.id);
    if (!actor11) return;
    let actMappings11 = (0, $b2HDo.getFlagMappings)(actor11);
    mappings11.forEach((m11)=>{
        let i31 = actMappings11.findIndex((m211)=>m211.id === m11.id);
        if (i31 !== -1) {
            actMappings11[i31].tokens = actMappings11[i31].tokens.filter((t11)=>t11 !== token11.id);
            if (actMappings11[i31].tokens.length === 0) actMappings11.splice(i31, 1);
        }
    });
    if (actMappings11.length) await actor11.setFlag("token-variants", "effectMappings", actMappings11);
    else await actor11.unsetFlag("token-variants", "effectMappings");
    await updateWithEffectMapping(token11);
    (0, $64r9a.drawOverlays)(token11);
}
function toggleTemplate(token11, templateName11 = null, mappings11 = null) {
    if (templateName11) mappings11 = _getTemplateMappings(templateName11);
    if (!token11 || !mappings11) return;
    const actor11 = game.actors.get(token11.actor.id);
    if (!actor11) return;
    const actMappings11 = (0, $b2HDo.getFlagMappings)(actor11);
    if (actMappings11.some((m11)=>mappings11.some((m211)=>m211.id === m11.id && m11.tokens?.includes(token11.id)))) removeTemplate(token11, null, mappings11);
    else applyTemplate(token11, null, mappings11);
}
function toggleTemplateOnSelected(templateName11 = null, mappings11 = null) {
    canvas.tokens.controlled.forEach((t11)=>toggleTemplate(t11, templateName11, mappings11));
}
function getHPChangeEffect(token11, effects11) {
    const internals11 = token11.actor?.getFlag("token-variants", "internalEffects") || {};
    const delta11 = getProperty(token11, `${isNewerVersion("11", game.version) ? "actorData" : "delta"}.flags.token-variants.internalEffects`);
    if (delta11) mergeObject(internals11, delta11);
    if (internals11["hp--"] != null) effects11.push("hp--");
    if (internals11["hp++"] != null) effects11.push("hp++");
}
function applyHpChangeEffect(actor11, change11, tokens11) {
    let duration11 = Number((0, $b2HDo.TVA_CONFIG).internalEffects.hpChange.duration);
    const newHpValue11 = getProperty(change11, `system.${(0, $b2HDo.TVA_CONFIG).systemHpPath}.value`);
    if (newHpValue11 != null) {
        const [currentHpVal11, _11] = getTokenHP(tokens11[0]);
        if (currentHpVal11 !== newHpValue11) {
            if (currentHpVal11 < newHpValue11) {
                setProperty(change11, "flags.token-variants.internalEffects.-=hp--", null);
                setProperty(change11, "flags.token-variants.internalEffects.hp++", newHpValue11 - currentHpVal11);
                if (duration11) setTimeout(()=>{
                    actor11.update({
                        "flags.token-variants.internalEffects.-=hp++": null
                    });
                }, duration11 * 1000);
            } else {
                setProperty(change11, "flags.token-variants.internalEffects.-=hp++", null);
                setProperty(change11, "flags.token-variants.internalEffects.hp--", newHpValue11 - currentHpVal11);
                if (duration11) setTimeout(()=>{
                    actor11.update({
                        "flags.token-variants.internalEffects.-=hp--": null
                    });
                }, duration11 * 1000);
            }
        }
    }
}
function getTokenEffects(token11, includeExpressions11 = false) {
    const data11 = token11.document ?? token11;
    let effects11 = [];
    // TVA Effects
    const tokenInCombat11 = game.combats.some((combat11)=>{
        return combat11.combatants.some((c11)=>c11.tokenId === token11.id);
    });
    if (tokenInCombat11) effects11.push("token-variants-combat");
    if (game.combat?.started) {
        if (game.combat?.combatant?.token?.id === token11.id) effects11.push("combat-turn");
        else if (game.combat?.nextCombatant?.token?.id === token11.id) effects11.push("combat-turn-next");
    }
    if (data11.hidden) effects11.push("token-variants-visibility");
    if ((0, $b2HDo.TVA_CONFIG).internalEffects.hpChange.enabled) getHPChangeEffect(data11, effects11);
    // Actor/Token effects
    if (data11.actorLink) getEffectsFromActor(token11.actor, effects11);
    else if (game.system.id === "pf2e") (data11.delta?.items || []).forEach((item11)=>{
        if (_activePF2EItem(item11)) effects11.push(item11.name);
    });
    else {
        (data11.effects || []).filter((ef31)=>!ef31.disabled && !ef31.isSuppressed).forEach((ef31)=>effects11.push(ef31.label));
        getEffectsFromActor(token11.actor, effects11);
    }
    // Expression/Mapping effects
    evaluateComparatorEffects(token11, effects11);
    evaluateStateEffects(token11, effects11);
    // Include mappings marked as always applicable
    // as well as the ones defined as logical expressions if needed
    const mappings11 = getAllEffectMappings(token11);
    for (const m11 of mappings11){
        if (m11.tokens?.length && !m11.tokens.includes(data11.id)) continue;
        if (m11.alwaysOn) effects11.unshift(m11.id);
        else if (includeExpressions11) {
            const evaluation11 = evaluateMappingExpression(m11, effects11, token11);
            if (evaluation11) effects11.unshift(m11.id);
        }
    }
    return effects11;
}
function getEffectsFromActor(actor11, effects11 = []) {
    if (!actor11) return effects11;
    if (game.system.id === "pf2e") (actor11.items || []).forEach((item11, id11)=>{
        if (_activePF2EItem(item11)) effects11.push(item11.name);
    });
    else {
        (actor11.effects || []).forEach((activeEffect11, id11)=>{
            if (!activeEffect11.disabled && !activeEffect11.isSuppressed) effects11.push(activeEffect11.name ?? activeEffect11.label);
        });
        (actor11.items || []).forEach((item11)=>{
            if (ITEM_TYPES.includes(item11.type) && item11.system.equipped) effects11.push(item11.name ?? item11.label);
        });
    }
    return effects11;
}
function _activePF2EItem(item11) {
    if (PF2E_ITEM_TYPES.includes(item11.type)) {
        if ("active" in item11) return item11.active;
        else if ("isEquipped" in item11) return item11.isEquipped;
        else return true;
    }
    return false;
}
const VALID_EXPRESSION = new RegExp('([a-zA-Z\\-\\.\\+]+)([><=]+)(".*"|-?\\d+)(%{0,1})');
function evaluateComparator(token11, expression11) {
    const match11 = expression11.match(VALID_EXPRESSION);
    if (match11) {
        const property11 = match11[1];
        let currVal11;
        let maxVal11;
        if (property11 === "hp") [currVal11, maxVal11] = getTokenHP(token11);
        else if (property11 === "hp++" || property11 === "hp--") {
            [currVal11, maxVal11] = getTokenHP(token11);
            currVal11 = getProperty(token11, `actor.flags.token-variants.internalEffects.${property11}`) ?? 0;
        } else currVal11 = getProperty(token11, property11);
        if (currVal11 == null) currVal11 = 0;
        const sign11 = match11[2];
        let val11 = Number(match11[3]);
        if (isNaN(val11)) {
            val11 = match11[3].substring(1, match11[3].length - 1);
            if (val11 === "true") val11 = true;
            if (val11 === "false") val11 = false;
            // Convert currVal to a truthy/falsy one if this is a bool check
            if (val11 === true || val11 === false) {
                if (isEmpty(currVal11)) currVal11 = false;
                else currVal11 = Boolean(currVal11);
            }
        }
        const isPercentage11 = Boolean(match11[4]);
        if (property11 === "rotation") maxVal11 = 360;
        else if (maxVal11 == null) maxVal11 = 999999;
        const toCompare11 = isPercentage11 ? currVal11 / maxVal11 * 100 : currVal11;
        let passed11 = false;
        if (sign11 === "=") passed11 = toCompare11 == val11;
        else if (sign11 === ">") passed11 = toCompare11 > val11;
        else if (sign11 === "<") passed11 = toCompare11 < val11;
        else if (sign11 === ">=") passed11 = toCompare11 >= val11;
        else if (sign11 === "<=") passed11 = toCompare11 <= val11;
        else if (sign11 === "<>") passed11 = toCompare11 < val11 || toCompare11 > val11;
        return passed11;
    }
    return false;
}
function evaluateComparatorEffects(token11, effects11 = []) {
    token11 = token11.document ?? token11;
    const mappings11 = getAllEffectMappings(token11);
    const matched11 = new Set();
    for (const m11 of mappings11){
        const expressions11 = m11.expression.split(EXPRESSION_MATCH_RE).filter(Boolean).map((exp11)=>exp11.trim()).filter(Boolean);
        for(let i31 = 0; i31 < expressions11.length; i31++)if (evaluateComparator(token11, expressions11[i31])) matched11.add(expressions11[i31]);
    }
    // Remove duplicate expressions and insert into effects
    matched11.forEach((exp11)=>effects11.unshift(exp11));
    return effects11;
}
function evaluateStateEffects(token11, effects11) {
    if (game.system.id === "pf2e") {
        const deathIcon11 = game.settings.get("pf2e", "deathIcon");
        if ((token11.document ?? token11).overlayEffect === deathIcon11) effects11.push("Dead");
    }
}
/**
 * Replaces {1,a,5,b} type string in the expressions with (1|a|5|b)
 * @param {*} exp
 * @returns
 */ function _findReplaceBracketWildcard(exp11) {
    let nExp11 = "";
    let lIndex11 = 0;
    while(lIndex11 >= 0){
        let i111 = exp11.indexOf("\\\\\\{", lIndex11);
        if (i111 !== -1) {
            let i211 = exp11.indexOf("\\\\\\}", i111);
            if (i211 !== -1) {
                nExp11 += exp11.substring(lIndex11, i111);
                nExp11 += "(" + exp11.substring(i111 + 4, i211).split(",").join("|") + ")";
            }
            lIndex11 = i211 + 4;
        } else return nExp11 + exp11.substring(lIndex11, exp11.length);
    }
    return nExp11 ?? exp11;
}
function _testRegExEffect(effect11, effects11) {
    let re11 = effect11.replace(/[/\-\\^$+?.()|[\]{}]/g, "\\$&").replaceAll("\\\\*", ".*");
    re11 = _findReplaceBracketWildcard(re11);
    re11 = new RegExp("^" + re11 + "$");
    return effects11.find((ef31)=>re11.test(ef31));
}
function evaluateMappingExpression(mapping, effects, token, added = new Set(), removed = new Set()) {
    let arrExpression = mapping.expression.split(EXPRESSION_MATCH_RE).filter(Boolean).map((s11)=>s11.trim()).filter(Boolean);
    let temp = "";
    let hasAdded = false;
    let hasRemoved = false;
    for (let exp of arrExpression){
        if ((0, $1mRWy.EXPRESSION_OPERATORS).includes(exp)) {
            temp += exp.replace("\\", "");
            continue;
        }
        if (/\\\*|\\{.*\\}/g.test(exp)) {
            let rExp = _testRegExEffect(exp, effects);
            if (rExp) temp += "true";
            else temp += "false";
            if (_testRegExEffect(exp, added)) hasAdded = true;
            else if (_testRegExEffect(exp, removed)) hasRemoved = true;
            continue;
        } else if (effects.includes(exp)) temp += "true";
        else temp += "false";
        if (!hasAdded && added.has(exp)) hasAdded = true;
        if (!hasRemoved && removed.has(exp)) hasRemoved = true;
    }
    try {
        let evaluation = eval(temp);
        // Evaluate JS code
        if (mapping.codeExp) try {
            token = token.document ?? token;
            if (!eval(mapping.codeExp)) evaluation = false;
            else if (!mapping.expression) evaluation = true;
        } catch (e) {
            evaluation = false;
        }
        if (evaluation) {
            if (hasAdded || hasRemoved) {
                added.add(mapping.id);
                effects.push(mapping.id);
            } else effects.unshift(mapping.id);
        } else if (hasRemoved || hasAdded) removed.add(mapping.id);
        return evaluation;
    } catch (e) {}
    return false;
}
function _getTokenHPv11(token11) {
    let attributes11;
    if (token11.actorLink) attributes11 = getProperty(token11.actor?.system, (0, $b2HDo.TVA_CONFIG).systemHpPath);
    else attributes11 = mergeObject(getProperty(token11.actor?.system, (0, $b2HDo.TVA_CONFIG).systemHpPath) || {}, getProperty(token11.delta?.system) || {}, {
        inplace: false
    });
    return [
        attributes11?.value,
        attributes11?.max
    ];
}
function getTokenHP(token11) {
    if (!isNewerVersion("11", game.version)) return _getTokenHPv11(token11);
    let attributes11;
    if (token11.actorLink) attributes11 = getProperty(token11.actor.system, (0, $b2HDo.TVA_CONFIG).systemHpPath);
    else attributes11 = mergeObject(getProperty(token11.actor.system, (0, $b2HDo.TVA_CONFIG).systemHpPath) || {}, getProperty(token11.actorData?.system) || {}, {
        inplace: false
    });
    return [
        attributes11?.value,
        attributes11?.max
    ];
}
async function _updateImageOnEffectChange(effectName11, actor11, added11 = true) {
    const tokens11 = actor11.token ? [
        actor11.token
    ] : (0, $1mRWy.getAllActorTokens)(actor11, true, !(0, $b2HDo.TVA_CONFIG).mappingsCurrentSceneOnly);
    for (const token11 of tokens11)await updateWithEffectMapping(token11, {
        added: added11 ? [
            effectName11
        ] : [],
        removed: !added11 ? [
            effectName11
        ] : []
    });
}
async function _updateImageOnMultiEffectChange(actor11, added11 = [], removed11 = []) {
    if (!actor11) return;
    const tokens11 = actor11.token ? [
        actor11.token
    ] : (0, $1mRWy.getAllActorTokens)(actor11, true, !(0, $b2HDo.TVA_CONFIG).mappingsCurrentSceneOnly);
    for (const token11 of tokens11)await updateWithEffectMapping(token11, {
        added: added11,
        removed: removed11
    });
}
async function _deleteCombatant(combatant11) {
    const token11 = combatant11._token || canvas.tokens.get(combatant11.tokenId);
    if (!token11 || !token11.actor) return;
    await updateWithEffectMapping(token11, {
        removed: [
            "token-variants-combat"
        ]
    });
}

});
parcelRequire.register("b2HDo", function(module, exports) {

$parcel$export(module.exports, "TVA_CONFIG", () => $80a1ba809e7abfcb$export$ab258e1978c780a6);
$parcel$export(module.exports, "FEATURE_CONTROL", () => $80a1ba809e7abfcb$export$b055032cc483774b);
$parcel$export(module.exports, "registerSettings", () => $80a1ba809e7abfcb$export$6628c94500a3bf7b);
$parcel$export(module.exports, "migrateMappings", () => $80a1ba809e7abfcb$export$ddc69df64ec0f5ef);
$parcel$export(module.exports, "updateSettings", () => $80a1ba809e7abfcb$export$f558026a994b6051);
$parcel$export(module.exports, "getFlagMappings", () => $80a1ba809e7abfcb$export$cb45a5664e48b54e);
$parcel$export(module.exports, "exportSettingsToJSON", () => $80a1ba809e7abfcb$export$fa17ec2953e9bd4a);
$parcel$export(module.exports, "importSettingsFromJSON", () => $80a1ba809e7abfcb$export$1144645bfcc7effc);
$parcel$export(module.exports, "getSearchOptions", () => $80a1ba809e7abfcb$export$1474fedcea3afc96);

var $1mRWy = parcelRequire("1mRWy");

var $6GTsc = parcelRequire("6GTsc");

var $cs1Zo = parcelRequire("cs1Zo");

var $6CrZR = parcelRequire("6CrZR");

var $6Aufe = parcelRequire("6Aufe");

var $2eOJK = parcelRequire("2eOJK");

var $g3wZB = parcelRequire("g3wZB");

var $iJML9 = parcelRequire("iJML9");

var $ebtiN = parcelRequire("ebtiN");
const $80a1ba809e7abfcb$export$ab258e1978c780a6 = {
    debug: false,
    disableNotifs: false,
    searchPaths: [
        {
            text: "modules/caeora-maps-tokens-assets/assets/tokens",
            cache: true,
            source: typeof ForgeAPI === "undefined" ? "data" : "forge-bazaar",
            types: [
                "Portrait",
                "Token",
                "PortraitAndToken"
            ]
        }
    ],
    forgeSearchPaths: {},
    worldHud: {
        displayOnlySharedImages: false,
        disableIfTHWEnabled: false,
        includeKeywords: false,
        updateActorImage: false,
        useNameSimilarity: false,
        includeWildcard: true,
        showFullPath: false,
        animate: true
    },
    hud: {
        enableSideMenu: true,
        displayAsImage: true,
        imageOpacity: 50
    },
    keywordSearch: true,
    excludedKeywords: "and,for",
    runSearchOnPath: false,
    searchFilters: {},
    algorithm: {
        exact: false,
        fuzzy: true,
        fuzzyLimit: 100,
        fuzzyThreshold: 0.3,
        fuzzyArtSelectPercentSlider: true
    },
    tokenConfigs: [],
    randomizer: {
        actorCreate: false,
        tokenCreate: false,
        tokenCopyPaste: false,
        tokenName: true,
        keywords: false,
        shared: false,
        wildcard: false,
        representedActorDisable: false,
        linkedActorDisable: true,
        popupOnDisable: false,
        diffImages: false,
        syncImages: false
    },
    popup: {
        disableAutoPopupOnActorCreate: true,
        disableAutoPopupOnTokenCreate: true,
        disableAutoPopupOnTokenCopyPaste: true,
        twoPopups: false,
        twoPopupsNoDialog: false
    },
    imgurClientId: "",
    stackStatusConfig: true,
    mergeGroup: false,
    staticCache: false,
    staticCacheFile: "modules/token-variants/token-variants-cache.json",
    tilesEnabled: true,
    compendiumMapper: {
        missingOnly: false,
        diffImages: false,
        showImages: true,
        cache: false,
        autoDisplayArtSelect: true,
        syncImages: false,
        overrideCategory: false,
        category: "Token",
        missingImages: [
            {
                document: "all",
                image: CONST.DEFAULT_TOKEN
            }
        ],
        searchOptions: {}
    },
    permissions: {
        popups: {
            1: false,
            2: false,
            3: true,
            4: true
        },
        portrait_right_click: {
            1: false,
            2: false,
            3: true,
            4: true
        },
        image_path_button: {
            1: false,
            2: false,
            3: true,
            4: true
        },
        hud: {
            1: true,
            2: true,
            3: true,
            4: true
        },
        hudFullAccess: {
            1: false,
            2: false,
            3: true,
            4: true
        },
        statusConfig: {
            1: false,
            2: false,
            3: true,
            4: true
        }
    },
    globalMappings: [],
    templateMappings: [],
    customImageCategories: [],
    displayEffectIconsOnHover: false,
    disableEffectIcons: false,
    filterEffectIcons: false,
    filterCustomEffectIcons: true,
    filterIconList: [],
    updateTokenProto: false,
    imgNameContainsDimensions: false,
    imgNameContainsFADimensions: false,
    playVideoOnHover: true,
    pauseVideoOnHoverOut: false,
    disableImageChangeOnPolymorphed: false,
    disableImageUpdateOnNonPrototype: false,
    disableTokenUpdateAnimation: false,
    mappingsCurrentSceneOnly: false,
    invisibleImage: "",
    systemHpPath: "",
    internalEffects: {
        hpChange: {
            enabled: false,
            duration: null
        }
    },
    hideElevationTooltip: false,
    hideTokenBorder: false
};
const $80a1ba809e7abfcb$export$b055032cc483774b = {
    EffectMappings: true,
    EffectIcons: true,
    Overlays: true,
    UserMappings: true,
    Wildcards: true,
    PopUpAndRandomize: true,
    HUD: true,
    HideElement: true
};
function $80a1ba809e7abfcb$export$6628c94500a3bf7b() {
    game.settings.register("token-variants", "featureControl", {
        scope: "world",
        config: false,
        type: Object,
        default: $80a1ba809e7abfcb$export$b055032cc483774b,
        onChange: async (val)=>{
            mergeObject($80a1ba809e7abfcb$export$b055032cc483774b, val);
            (0, $iJML9.registerAllHooks)();
            (0, $ebtiN.registerAllWrappers)();
        }
    });
    mergeObject($80a1ba809e7abfcb$export$b055032cc483774b, game.settings.get("token-variants", "featureControl"));
    game.settings.registerMenu("token-variants", "settings", {
        name: "Configure Settings",
        hint: "Configure Token Variant Art settings",
        label: "Settings",
        scope: "world",
        icon: "fas fa-cog",
        type: (0, $2eOJK.default),
        restricted: true
    });
    const systemHpPaths = {
        "cyberpunk-red-core": "derivedStats.hp",
        lfg: "health",
        worldbuilding: "health",
        twodsix: "hits"
    };
    $80a1ba809e7abfcb$export$ab258e1978c780a6.systemHpPath = systemHpPaths[game.system.id] ?? "attributes.hp";
    game.settings.register("token-variants", "effectMappingToggleGroups", {
        scope: "world",
        config: false,
        type: Object,
        default: {
            Default: true
        }
    });
    game.settings.register("token-variants", "settings", {
        scope: "world",
        config: false,
        type: Object,
        default: $80a1ba809e7abfcb$export$ab258e1978c780a6,
        onChange: async (val)=>{
            // Generate a diff, it will be required when doing post-processing of the modified settings
            const diff = $80a1ba809e7abfcb$export$be92d635d4f8ae80($80a1ba809e7abfcb$export$ab258e1978c780a6, val);
            // Check image re-cache required due to permission changes
            let requiresImageCache = false;
            if ("permissions" in diff) {
                if (!(0, $1mRWy.userRequiresImageCache)($80a1ba809e7abfcb$export$ab258e1978c780a6.permissions) && (0, $1mRWy.userRequiresImageCache)(val.permissions)) requiresImageCache = true;
            }
            // Update live settings
            mergeObject($80a1ba809e7abfcb$export$ab258e1978c780a6, val);
            if ($80a1ba809e7abfcb$export$ab258e1978c780a6.filterEffectIcons && ("filterCustomEffectIcons" in diff || "filterIconList" in diff)) for (const tkn of canvas.tokens.placeables)(0, $1mRWy.waitForTokenTexture)(tkn, (token)=>{
                token.drawEffects();
            });
            // Check image re-cache required due to search path changes
            if ("searchPaths" in diff || "forgeSearchPaths" in diff) {
                if ((0, $1mRWy.userRequiresImageCache)($80a1ba809e7abfcb$export$ab258e1978c780a6.permissions)) requiresImageCache = true;
            }
            // Cache/re-cache images if necessary
            if (requiresImageCache) await (0, $g3wZB.cacheImages)();
            if (diff.staticCache) {
                const cacheFile = diff.staticCacheFile ? diff.staticCacheFile : $80a1ba809e7abfcb$export$ab258e1978c780a6.staticCacheFile;
                (0, $g3wZB.saveCache)(cacheFile);
            }
            $80a1ba809e7abfcb$export$ab258e1978c780a6.hud = game.settings.get("token-variants", "hudSettings");
            (0, $iJML9.registerAllHooks)();
            (0, $ebtiN.registerAllWrappers)();
            if ("displayEffectIconsOnHover" in diff) {
                for (const tkn of canvas.tokens.placeables)if (tkn.effects) tkn.effects.visible = !diff.displayEffectIconsOnHover;
            }
            if ("hideElevationTooltip" in diff) {
                for (const tkn of canvas.tokens.placeables)if (tkn.tooltip) tkn.tooltip.text = tkn._getTooltipText();
            }
            if ("hideTokenBorder" in diff) {
                for (const tkn of canvas.tokens.placeables)if (tkn.border) tkn.border.visible = !diff.hideTokenBorder;
            }
            if ("filterEffectIcons" in diff || "disableEffectIcons" in diff) for (const tkn of canvas.tokens.placeables)tkn.drawEffects();
        }
    });
    game.settings.register("token-variants", "debug", {
        scope: "world",
        config: false,
        type: Boolean,
        default: $80a1ba809e7abfcb$export$ab258e1978c780a6.debug,
        onChange: (val)=>$80a1ba809e7abfcb$export$ab258e1978c780a6.debug = val
    });
    if (typeof ForgeAPI !== "undefined") game.settings.registerMenu("token-variants", "forgeSearchPaths", {
        name: game.i18n.localize("token-variants.settings.forge-search-paths.Name"),
        hint: game.i18n.localize("token-variants.settings.forge-search-paths.Hint"),
        icon: "fas fa-search",
        type: (0, $6GTsc.ForgeSearchPaths),
        scope: "client",
        restricted: false
    });
    game.settings.register("token-variants", "tokenConfigs", {
        scope: "world",
        config: false,
        type: Array,
        default: $80a1ba809e7abfcb$export$ab258e1978c780a6.tokenConfigs,
        onChange: (val)=>$80a1ba809e7abfcb$export$ab258e1978c780a6.tokenConfigs = val
    });
    game.settings.registerMenu("token-variants", "tokenHUDSettings", {
        name: game.i18n.localize("token-variants.settings.token-hud.Name"),
        hint: game.i18n.localize("token-variants.settings.token-hud.Hint"),
        scope: "client",
        icon: "fas fa-images",
        type: (0, $cs1Zo.default),
        restricted: false
    });
    game.settings.registerMenu("token-variants", "compendiumMapper", {
        name: game.i18n.localize("token-variants.settings.compendium-mapper.Name"),
        hint: game.i18n.localize("token-variants.settings.compendium-mapper.Hint"),
        scope: "world",
        icon: "fas fa-cogs",
        type: (0, $6CrZR.default),
        restricted: true
    });
    game.settings.register("token-variants", "compendiumMapper", {
        scope: "world",
        config: false,
        type: Object,
        default: $80a1ba809e7abfcb$export$ab258e1978c780a6.compendiumMapper,
        onChange: (val)=>$80a1ba809e7abfcb$export$ab258e1978c780a6.compendiumMapper = val
    });
    game.settings.register("token-variants", "hudSettings", {
        scope: "client",
        config: false,
        type: Object,
        default: $80a1ba809e7abfcb$export$ab258e1978c780a6.hud,
        onChange: (val)=>$80a1ba809e7abfcb$export$ab258e1978c780a6.hud = val
    });
    game.settings.registerMenu("token-variants", "importExport", {
        name: `Import/Export`,
        hint: game.i18n.localize("token-variants.settings.import-export.Hint"),
        scope: "world",
        icon: "fas fa-toolbox",
        type: (0, $6Aufe.default),
        restricted: true
    });
    // Read settings
    const settings = game.settings.get("token-variants", "settings");
    mergeObject($80a1ba809e7abfcb$export$ab258e1978c780a6, settings);
    if (isEmpty($80a1ba809e7abfcb$export$ab258e1978c780a6.searchFilters)) (0, $1mRWy.BASE_IMAGE_CATEGORIES).forEach((cat)=>{
        $80a1ba809e7abfcb$export$ab258e1978c780a6.searchFilters[cat] = {
            include: "",
            exclude: "",
            regex: ""
        };
    });
    for(let uid in $80a1ba809e7abfcb$export$ab258e1978c780a6.forgeSearchPaths)$80a1ba809e7abfcb$export$ab258e1978c780a6.forgeSearchPaths[uid].paths = $80a1ba809e7abfcb$export$ab258e1978c780a6.forgeSearchPaths[uid].paths.map((p)=>{
        if (!p.source) p.source = "forgevtt";
        if (!p.types) {
            if (p.tiles) p.types = [
                "Tile"
            ];
            else p.types = [
                "Portrait",
                "Token",
                "PortraitAndToken"
            ];
        }
        return p;
    });
    // 20/07/2023 Convert globalMappings to a new format
    if (getType(settings.globalMappings) === "Object") Hooks.once("ready", ()=>{
        $80a1ba809e7abfcb$export$ab258e1978c780a6.globalMappings = $80a1ba809e7abfcb$export$ddc69df64ec0f5ef(settings.globalMappings);
        setTimeout(()=>$80a1ba809e7abfcb$export$f558026a994b6051({
                globalMappings: $80a1ba809e7abfcb$export$ab258e1978c780a6.globalMappings
            }), 10000);
    });
    // Read client settings
    $80a1ba809e7abfcb$export$ab258e1978c780a6.hud = game.settings.get("token-variants", "hudSettings");
}
function $80a1ba809e7abfcb$export$ddc69df64ec0f5ef(mappings, globalMappings = []) {
    if (!mappings) return [];
    if (getType(mappings) === "Object") {
        let nMappings = [];
        for (const [effect, mapping] of Object.entries(mappings)){
            if (!mapping.label) mapping.label = effect.replaceAll("\xb6", ".");
            if (!mapping.expression) mapping.expression = effect.replaceAll("\xb6", ".");
            if (!mapping.id) mapping.id = randomID(8);
            delete mapping.effect;
            if (mapping.overlayConfig) mapping.overlayConfig.id = mapping.id;
            delete mapping.overlayConfig?.effect;
            nMappings.push(mapping);
        }
        // Convert parents to parentIDs
        let combMappings = nMappings.concat(globalMappings);
        for (const mapping of nMappings)if (mapping.overlayConfig?.parent) {
            if (mapping.overlayConfig.parent === "Token (Placeable)") mapping.overlayConfig.parentID = "TOKEN";
            else {
                const parent = combMappings.find((m)=>m.label === mapping.overlayConfig.parent);
                if (parent) mapping.overlayConfig.parentID = parent.id;
                else mapping.overlayConfig.parentID = "";
            }
            delete mapping.overlayConfig.parent;
        }
        return nMappings;
    }
    return mappings;
}
function $80a1ba809e7abfcb$export$cb45a5664e48b54e(object) {
    if (!object) return [];
    let doc = object.document ?? object;
    const actorId = doc.actor?.id;
    if (actorId) {
        doc = game.actors.get(actorId);
        if (!doc) return [];
    }
    // 23/07/2023
    let mappings = doc.getFlag("token-variants", "effectMappings") ?? [];
    if (getType(mappings) === "Object") {
        mappings = $80a1ba809e7abfcb$export$ddc69df64ec0f5ef(mappings, $80a1ba809e7abfcb$export$ab258e1978c780a6.globalMappings);
        doc.setFlag("token-variants", "effectMappings", mappings);
    }
    return mappings;
}
function $80a1ba809e7abfcb$export$fa17ec2953e9bd4a() {
    const settings = deepClone($80a1ba809e7abfcb$export$ab258e1978c780a6);
    const filename = `token-variants-settings.json`;
    saveDataToFile(JSON.stringify(settings, null, 2), "text/json", filename);
}
async function $80a1ba809e7abfcb$export$1144645bfcc7effc(json) {
    if (typeof json === "string") json = JSON.parse(json);
    if (json.forgeSearchPaths) for(let uid in json.forgeSearchPaths)json.forgeSearchPaths[uid].paths = json.forgeSearchPaths[uid].paths.map((p)=>{
        if (!p.source) p.source = "forgevtt";
        if (!p.types) {
            if (p.tiles) p.types = [
                "Tile"
            ];
            else p.types = [
                "Portrait",
                "Token",
                "PortraitAndToken"
            ];
        }
        return p;
    });
    // 09/07/2022 Convert filters to new format if old one is still in use
    if (json.searchFilters && json.searchFilters.portraitFilterInclude != null) {
        const filters = json.searchFilters;
        json.searchFilters = {
            Portrait: {
                include: filters.portraitFilterInclude ?? "",
                exclude: filters.portraitFilterExclude ?? "",
                regex: filters.portraitFilterRegex ?? ""
            },
            Token: {
                include: filters.tokenFilterInclude ?? "",
                exclude: filters.tokenFilterExclude ?? "",
                regex: filters.tokenFilterRegex ?? ""
            },
            PortraitAndToken: {
                include: filters.generalFilterInclude ?? "",
                exclude: filters.generalFilterExclude ?? "",
                regex: filters.generalFilterRegex ?? ""
            }
        };
        if (json.compendiumMapper) delete json.compendiumMapper.searchFilters;
    }
    // Global Mappings need special merge
    if (json.globalMappings) {
        const nMappings = $80a1ba809e7abfcb$export$ddc69df64ec0f5ef(json.globalMappings);
        for (const m of nMappings){
            const i = $80a1ba809e7abfcb$export$ab258e1978c780a6.globalMappings.findIndex((mapping)=>m.label === mapping.label);
            if (i === -1) $80a1ba809e7abfcb$export$ab258e1978c780a6.globalMappings.push(m);
            else $80a1ba809e7abfcb$export$ab258e1978c780a6.globalMappings[i] = m;
        }
        json.globalMappings = $80a1ba809e7abfcb$export$ab258e1978c780a6.globalMappings;
    }
    $80a1ba809e7abfcb$export$f558026a994b6051(json);
}
function $80a1ba809e7abfcb$var$_refreshFilters(filters, customCategories, updateTVAConfig = false) {
    const categories = (0, $1mRWy.BASE_IMAGE_CATEGORIES).concat(customCategories ?? $80a1ba809e7abfcb$export$ab258e1978c780a6.customImageCategories);
    for(const filter in filters)if (!categories.includes(filter)) {
        delete filters[filter];
        if (updateTVAConfig) delete $80a1ba809e7abfcb$export$ab258e1978c780a6.searchFilters[filter];
    }
    for (const category of customCategories)if (filters[category] == null) filters[category] = {
        include: "",
        exclude: "",
        regex: ""
    };
}
async function $80a1ba809e7abfcb$export$f558026a994b6051(newSettings) {
    const settings = mergeObject(deepClone($80a1ba809e7abfcb$export$ab258e1978c780a6), newSettings, {
        insertKeys: false
    });
    // Custom image categories might have changed, meaning we may have filters that are no longer relevant
    // or need to be added
    if ("customImageCategories" in newSettings) {
        $80a1ba809e7abfcb$var$_refreshFilters(settings.searchFilters, newSettings.customImageCategories, true);
        if (settings.compendiumMapper?.searchOptions?.searchFilters != null) {
            $80a1ba809e7abfcb$var$_refreshFilters(settings.compendiumMapper.searchOptions.searchFilters, newSettings.customImageCategories);
            $80a1ba809e7abfcb$export$ab258e1978c780a6.compendiumMapper.searchOptions.searchFilters = settings.compendiumMapper.searchOptions.searchFilters;
        }
    }
    await game.settings.set("token-variants", "settings", settings);
}
function $80a1ba809e7abfcb$export$be92d635d4f8ae80(original, other, { inner: inner = false } = {}) {
    function _difference(v0, v1) {
        let t0 = getType(v0);
        let t1 = getType(v1);
        if (t0 !== t1) return [
            true,
            v1
        ];
        if (t0 === "Array") return [
            !$80a1ba809e7abfcb$var$_arrayEquality(v0, v1),
            v1
        ];
        if (t0 === "Object") {
            if (isEmpty(v0) !== isEmpty(v1)) return [
                true,
                v1
            ];
            let d = $80a1ba809e7abfcb$export$be92d635d4f8ae80(v0, v1, {
                inner: inner
            });
            return [
                !isEmpty(d),
                d
            ];
        }
        return [
            v0 !== v1,
            v1
        ];
    }
    // Recursively call the _difference function
    return Object.keys(other).reduce((obj, key)=>{
        if (inner && !(key in original)) return obj;
        let [isDifferent, difference] = _difference(original[key], other[key]);
        if (isDifferent) obj[key] = difference;
        return obj;
    }, {});
}
function $80a1ba809e7abfcb$var$_arrayEquality(a1, a2) {
    if (!(a2 instanceof Array) || a2.length !== a1.length) return false;
    return a1.every((v, i)=>{
        if (getType(v) === "Object") return Object.keys($80a1ba809e7abfcb$export$be92d635d4f8ae80(v, a2[i])).length === 0;
        return a2[i] === v;
    });
}
function $80a1ba809e7abfcb$export$1474fedcea3afc96() {
    return {
        keywordSearch: $80a1ba809e7abfcb$export$ab258e1978c780a6.keywordSearch,
        excludedKeywords: $80a1ba809e7abfcb$export$ab258e1978c780a6.excludedKeywords,
        runSearchOnPath: $80a1ba809e7abfcb$export$ab258e1978c780a6.runSearchOnPath,
        algorithm: $80a1ba809e7abfcb$export$ab258e1978c780a6.algorithm,
        searchFilters: $80a1ba809e7abfcb$export$ab258e1978c780a6.searchFilters
    };
}

});
parcelRequire.register("1mRWy", function(module, exports) {

$parcel$export(module.exports, "EXPRESSION_OPERATORS", () => $0ff1b08dd7313f2c$export$313cceabf063c648);
$parcel$export(module.exports, "SEARCH_TYPE", () => $0ff1b08dd7313f2c$export$71ce8fbad5957261);
$parcel$export(module.exports, "BASE_IMAGE_CATEGORIES", () => $0ff1b08dd7313f2c$export$bb3b35fb4fbd121a);
$parcel$export(module.exports, "startBatchUpdater", () => $0ff1b08dd7313f2c$export$a9fe6b4c86ebbf2c);
$parcel$export(module.exports, "updateTokenImage", () => $0ff1b08dd7313f2c$export$9a81af9500bcd927);
$parcel$export(module.exports, "getFileName", () => $0ff1b08dd7313f2c$export$1396dd911f86baee);
$parcel$export(module.exports, "updateActorImage", () => $0ff1b08dd7313f2c$export$853901ce27596d97);
$parcel$export(module.exports, "keyPressed", () => $0ff1b08dd7313f2c$export$e09b512eecac7579);
$parcel$export(module.exports, "registerKeybinds", () => $0ff1b08dd7313f2c$export$2e69de36ed96343);
$parcel$export(module.exports, "getTokenConfig", () => $0ff1b08dd7313f2c$export$cf2a4e460992a64b);
$parcel$export(module.exports, "setTokenConfig", () => $0ff1b08dd7313f2c$export$99dcb6b6e71c8ec3);
$parcel$export(module.exports, "decodeURISafely", () => $0ff1b08dd7313f2c$export$205603ad3b38424c);
$parcel$export(module.exports, "getFileNameWithExt", () => $0ff1b08dd7313f2c$export$4569d268217979d8);
$parcel$export(module.exports, "getFilePath", () => $0ff1b08dd7313f2c$export$a8ae171f556d108c);
$parcel$export(module.exports, "simplifyName", () => $0ff1b08dd7313f2c$export$1cb6eb118298c3f6);
$parcel$export(module.exports, "simplifyPath", () => $0ff1b08dd7313f2c$export$7a9d66609c223fd8);
$parcel$export(module.exports, "decodeURIComponentSafely", () => $0ff1b08dd7313f2c$export$245a8ae5fac6ab9);
$parcel$export(module.exports, "parseKeywords", () => $0ff1b08dd7313f2c$export$b7039c4b5522f566);
$parcel$export(module.exports, "isImage", () => $0ff1b08dd7313f2c$export$fb85bc5d6d9ef19b);
$parcel$export(module.exports, "isVideo", () => $0ff1b08dd7313f2c$export$ac5608bbe92d6fdc);
$parcel$export(module.exports, "callForgeVTT", () => $0ff1b08dd7313f2c$export$a3fc2fee1fd32b75);
$parcel$export(module.exports, "getFilters", () => $0ff1b08dd7313f2c$export$1933a9fe712fc1fd);
$parcel$export(module.exports, "userRequiresImageCache", () => $0ff1b08dd7313f2c$export$e97747128355dc59);
$parcel$export(module.exports, "waitForTokenTexture", () => $0ff1b08dd7313f2c$export$81af53b76c17cdd8);
$parcel$export(module.exports, "flattenSearchResults", () => $0ff1b08dd7313f2c$export$1a1482e70c3f8ffc);
$parcel$export(module.exports, "tv_executeScript", () => $0ff1b08dd7313f2c$export$da928b76213541d1);
$parcel$export(module.exports, "executeMacro", () => $0ff1b08dd7313f2c$export$4efd75b42b486b4d);
$parcel$export(module.exports, "applyTMFXPreset", () => $0ff1b08dd7313f2c$export$e43fe9e17895939b);
$parcel$export(module.exports, "toggleTMFXPreset", () => $0ff1b08dd7313f2c$export$961a6e71d6289ec6);
$parcel$export(module.exports, "applyCEEffect", () => $0ff1b08dd7313f2c$export$8a36ba247bf4b0d0);
$parcel$export(module.exports, "toggleCEEffect", () => $0ff1b08dd7313f2c$export$6fc760b2ad2335ff);
$parcel$export(module.exports, "determineAddedRemovedEffects", () => $0ff1b08dd7313f2c$export$5afaac5d3dad358c);
$parcel$export(module.exports, "nameForgeRandomize", () => $0ff1b08dd7313f2c$export$c60cd2bc191c0655);
$parcel$export(module.exports, "uploadTokenImage", () => $0ff1b08dd7313f2c$export$7c70b8725990bcc9);
$parcel$export(module.exports, "getAllActorTokens", () => $0ff1b08dd7313f2c$export$1bad3b5e11592c24);
$parcel$export(module.exports, "string2Hex", () => $0ff1b08dd7313f2c$export$2b4b146f5cd9519c);
$parcel$export(module.exports, "mergeMappings", () => $0ff1b08dd7313f2c$export$488134d4acacca33);

var $b2HDo = parcelRequire("b2HDo");

var $hAn2A = parcelRequire("hAn2A");

var $1v9Gt = parcelRequire("1v9Gt");

var $6CrZR = parcelRequire("6CrZR");

var $eSPJO = parcelRequire("eSPJO");
const $0ff1b08dd7313f2c$var$simplifyRegex = new RegExp(/[^A-Za-z0-9/\\]/g);
const $0ff1b08dd7313f2c$export$6d117a2f25d7dc54 = [
    "rotation",
    "elevation"
];
const $0ff1b08dd7313f2c$export$313cceabf063c648 = [
    "\\(",
    "\\)",
    "&&",
    "||",
    "\\!"
];
const $0ff1b08dd7313f2c$export$71ce8fbad5957261 = {
    PORTRAIT: "Portrait",
    TOKEN: "Token",
    PORTRAIT_AND_TOKEN: "PortraitAndToken",
    TILE: "Tile",
    ITEM: "Item",
    JOURNAL: "JournalEntry",
    MACRO: "Macro"
};
const $0ff1b08dd7313f2c$export$bb3b35fb4fbd121a = [
    "Portrait",
    "Token",
    "PortraitAndToken",
    "Tile",
    "Item",
    "JournalEntry",
    "Macro",
    "RollTable"
];
const $0ff1b08dd7313f2c$export$b9f1c298ac3e67 = {
    popupOverride: false,
    config: false
};
const $0ff1b08dd7313f2c$var$BATCH_UPDATES = {
    TOKEN: [],
    TOKEN_CALLBACKS: [],
    TOKEN_CONTEXT: {
        animate: true
    },
    ACTOR: [],
    ACTOR_CONTEXT: null
};
function $0ff1b08dd7313f2c$export$a9fe6b4c86ebbf2c() {
    canvas.app.ticker.add(()=>{
        if ($0ff1b08dd7313f2c$var$BATCH_UPDATES.TOKEN.length) {
            canvas.scene.updateEmbeddedDocuments("Token", $0ff1b08dd7313f2c$var$BATCH_UPDATES.TOKEN, $0ff1b08dd7313f2c$var$BATCH_UPDATES.TOKEN_CONTEXT).then(()=>{
                for (const cb of $0ff1b08dd7313f2c$var$BATCH_UPDATES.TOKEN_CALLBACKS)cb();
                $0ff1b08dd7313f2c$var$BATCH_UPDATES.TOKEN_CALLBACKS = [];
            });
            $0ff1b08dd7313f2c$var$BATCH_UPDATES.TOKEN = [];
        }
        if ($0ff1b08dd7313f2c$var$BATCH_UPDATES.ACTOR.length !== 0) {
            if ($0ff1b08dd7313f2c$var$BATCH_UPDATES.ACTOR_CONTEXT) Actor.updateDocuments($0ff1b08dd7313f2c$var$BATCH_UPDATES.ACTOR, $0ff1b08dd7313f2c$var$BATCH_UPDATES.ACTOR_CONTEXT);
            else Actor.updateDocuments($0ff1b08dd7313f2c$var$BATCH_UPDATES.ACTOR);
            $0ff1b08dd7313f2c$var$BATCH_UPDATES.ACTOR = [];
            $0ff1b08dd7313f2c$var$BATCH_UPDATES.ACTOR_CONTEXT = null;
        }
    });
}
function $0ff1b08dd7313f2c$export$2ab69819310737f7(id, update, callback = null, animate = true) {
    update._id = id;
    $0ff1b08dd7313f2c$var$BATCH_UPDATES.TOKEN.push(update);
    $0ff1b08dd7313f2c$var$BATCH_UPDATES.TOKEN_CONTEXT = {
        animate: animate
    };
    if (callback) $0ff1b08dd7313f2c$var$BATCH_UPDATES.TOKEN_CALLBACKS.push(callback);
}
function $0ff1b08dd7313f2c$export$fbec16849efa95ca(id, update, context = null) {
    update._id = id;
    $0ff1b08dd7313f2c$var$BATCH_UPDATES.ACTOR.push(update);
    $0ff1b08dd7313f2c$var$BATCH_UPDATES.ACTOR_CONTEXT = context;
}
async function $0ff1b08dd7313f2c$export$9a81af9500bcd927(imgSrc, { token: token = null, actor: actor = null, imgName: imgName = null, tokenUpdate: tokenUpdate = {}, actorUpdate: actorUpdate = {}, pack: pack = "", callback: callback = null, config: config, animate: animate = true, update: update = null, applyDefaultConfig: applyDefaultConfig = true } = {}) {
    if (!(token || actor)) {
        console.warn(game.i18n.localize("token-variants.notifications.warn.update-image-no-token-actor"));
        return;
    }
    token = token?.document ?? token;
    // Check if it's a wildcard image
    if (imgSrc && imgSrc.includes("*") || imgSrc.includes("{") && imgSrc.includes("}")) {
        const images = await $0ff1b08dd7313f2c$export$b62bf063b9928bd7(imgSrc);
        if (images.length) imgSrc = images[Math.floor(Math.random() * images.length)];
    }
    if (!actor && token.actor) actor = game.actors.get(token.actor.id);
    const getDefaultConfig = (token, actor)=>{
        let configEntries = [];
        if (token) configEntries = token.getFlag("token-variants", "defaultConfig") || [];
        else if (actor) {
            const tokenData = actor.prototypeToken;
            if ("token-variants" in tokenData.flags && "defaultConfig" in tokenData["token-variants"]) configEntries = tokenData["token-variants"]["defaultConfig"];
        }
        return expandObject(Object.fromEntries(configEntries));
    };
    const constructDefaultConfig = (origData, customConfig)=>{
        const flatOrigData = flattenObject(origData);
        $0ff1b08dd7313f2c$export$7fe60b94e2075390.dataToForm(flatOrigData);
        const flatCustomConfig = flattenObject(customConfig);
        let filtered = filterObject(flatOrigData, flatCustomConfig);
        // Flags need special treatment as once set they are not removed via absence of them in the update
        for (let [k, v] of Object.entries(flatCustomConfig)){
            if (k.startsWith("flags.")) {
                if (!(k in flatOrigData)) {
                    let splitK = k.split(".");
                    splitK[splitK.length - 1] = "-=" + splitK[splitK.length - 1];
                    filtered[splitK.join(".")] = null;
                }
            }
        }
        return Object.entries(filtered);
    };
    let tokenUpdateObj = tokenUpdate;
    if (imgSrc) {
        setProperty(tokenUpdateObj, "texture.src", imgSrc);
        if (imgName && $0ff1b08dd7313f2c$export$1396dd911f86baee(imgSrc) === imgName) setProperty(tokenUpdateObj, "flags.token-variants.-=name", null);
        else setProperty(tokenUpdateObj, "flags.token-variants.name", imgName);
    }
    const tokenCustomConfig = mergeObject($0ff1b08dd7313f2c$export$f5cd0e7fffe879fe(imgSrc || token?.texture.src, imgName, token), config ?? {});
    const usingCustomConfig = token?.getFlag("token-variants", "usingCustomConfig");
    const defaultConfig = getDefaultConfig(token);
    if (!isEmpty(tokenCustomConfig) || usingCustomConfig) tokenUpdateObj = $0ff1b08dd7313f2c$export$defc74b45e490df8(tokenUpdateObj, defaultConfig);
    if (!isEmpty(tokenCustomConfig)) {
        if (token) {
            setProperty(tokenUpdateObj, "flags.token-variants.usingCustomConfig", true);
            let doc = token.document ?? token;
            const tokenData = doc.toObject ? doc.toObject() : deepClone(doc);
            const defConf = constructDefaultConfig(mergeObject(tokenData, defaultConfig), tokenCustomConfig);
            setProperty(tokenUpdateObj, "flags.token-variants.defaultConfig", defConf);
        } else if (actor && !token) {
            setProperty(tokenUpdateObj, "flags.token-variants.usingCustomConfig", true);
            const tokenData = actor.prototypeToken instanceof Object ? actor.prototypeToken : actor.prototypeToken.toObject();
            const defConf = constructDefaultConfig(tokenData, tokenCustomConfig);
            setProperty(tokenUpdateObj, "flags.token-variants.defaultConfig", defConf);
        }
        // Fix, an empty flag may be passed which would overwrite any current flags in the updateObj
        // Remove it before doing the merge
        if (!tokenCustomConfig.flags) delete tokenCustomConfig.flags;
        tokenUpdateObj = $0ff1b08dd7313f2c$export$defc74b45e490df8(tokenUpdateObj, tokenCustomConfig);
    } else if (usingCustomConfig) {
        setProperty(tokenUpdateObj, "flags.token-variants.-=usingCustomConfig", null);
        delete tokenUpdateObj?.flags?.["token-variants"]?.defaultConfig;
        setProperty(tokenUpdateObj, "flags.token-variants.-=defaultConfig", null);
    }
    if (!applyDefaultConfig) {
        setProperty(tokenUpdateObj, "flags.token-variants.-=usingCustomConfig", null);
        delete tokenUpdateObj?.flags?.["token-variants"]?.defaultConfig;
        setProperty(tokenUpdateObj, "flags.token-variants.-=defaultConfig", null);
    }
    if (!isEmpty(tokenUpdateObj)) {
        if (actor && !token) {
            $0ff1b08dd7313f2c$export$7fe60b94e2075390.formToData(actor.prototypeToken, tokenUpdateObj);
            actorUpdate.token = tokenUpdateObj;
            if (pack) $0ff1b08dd7313f2c$export$fbec16849efa95ca(actor.id, actorUpdate, {
                pack: pack
            });
            else await (actor.document ?? actor).update(actorUpdate);
        }
        if (token) {
            $0ff1b08dd7313f2c$export$7fe60b94e2075390.formToData(token, tokenUpdateObj);
            if ((0, $b2HDo.TVA_CONFIG).updateTokenProto && token.actor) {
                if (update) mergeObject(update, {
                    token: tokenUpdateObj
                });
                else // Timeout to prevent race conditions with other modules namely MidiQOL
                // this is a low priority update so it should be Ok to do
                if (token.actorLink) setTimeout(()=>$0ff1b08dd7313f2c$export$fbec16849efa95ca(token.actor.id, {
                        token: tokenUpdateObj
                    }), 500);
                else setTimeout(()=>token.actor.update({
                        token: tokenUpdateObj
                    }), 500);
            }
            if (update) mergeObject(update, tokenUpdateObj);
            else if (token.object) $0ff1b08dd7313f2c$export$2ab69819310737f7(token.id, tokenUpdateObj, callback, animate);
            else {
                await token.update(tokenUpdateObj, {
                    animate: animate
                });
                callback();
            }
        }
    }
}
async function $0ff1b08dd7313f2c$export$853901ce27596d97(actor, imgSrc, directUpdate = true, pack = "") {
    if (!actor) return;
    if (directUpdate) await (actor.document ?? actor).update({
        img: imgSrc
    });
    else $0ff1b08dd7313f2c$export$fbec16849efa95ca(actor.id, {
        img: imgSrc
    }, pack ? {
        pack: pack
    } : null);
}
async function $0ff1b08dd7313f2c$var$showTileArtSelect() {
    for (const tile of canvas.tiles.controlled){
        const tileName = tile.document.getFlag("token-variants", "tileName") || tile.id;
        (0, $hAn2A.showArtSelect)(tileName, {
            callback: async function(imgSrc, name) {
                tile.document.update({
                    img: imgSrc
                });
            },
            searchType: $0ff1b08dd7313f2c$export$71ce8fbad5957261.TILE
        });
    }
}
function $0ff1b08dd7313f2c$export$e09b512eecac7579(key) {
    if (key === "v") return game.keyboard.downKeys.has("KeyV");
    return $0ff1b08dd7313f2c$export$b9f1c298ac3e67[key];
}
function $0ff1b08dd7313f2c$export$2e69de36ed96343() {
    game.keybindings.register("token-variants", "popupOverride", {
        name: "Popup Override",
        hint: "When held will trigger popups even when they are disabled.",
        editable: [
            {
                key: "ShiftLeft"
            }
        ],
        onDown: ()=>{
            $0ff1b08dd7313f2c$export$b9f1c298ac3e67.popupOverride = true;
        },
        onUp: ()=>{
            $0ff1b08dd7313f2c$export$b9f1c298ac3e67.popupOverride = false;
        },
        restricted: false,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register("token-variants", "config", {
        name: "Config",
        hint: "When held during a mouse Left-Click of an Image or an Active Affect will display a configuration window.",
        editable: [
            {
                key: "ShiftLeft"
            }
        ],
        onDown: ()=>{
            $0ff1b08dd7313f2c$export$b9f1c298ac3e67.config = true;
        },
        onUp: ()=>{
            $0ff1b08dd7313f2c$export$b9f1c298ac3e67.config = false;
        },
        restricted: false,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register("token-variants", "showArtSelectPortrait", {
        name: "Show Art Select: Portrait",
        hint: "Brings up an Art Select pop-up to change the portrait images of the selected tokens.",
        editable: [
            {
                key: "Digit1",
                modifiers: [
                    "Shift"
                ]
            }
        ],
        onDown: ()=>{
            for (const token of canvas.tokens.controlled){
                const actor = token.actor;
                if (!actor) continue;
                (0, $hAn2A.showArtSelect)(actor.name, {
                    callback: async function(imgSrc, name) {
                        await $0ff1b08dd7313f2c$export$853901ce27596d97(actor, imgSrc);
                    },
                    searchType: $0ff1b08dd7313f2c$export$71ce8fbad5957261.PORTRAIT,
                    object: actor
                });
            }
            if ((0, $b2HDo.TVA_CONFIG).tilesEnabled && canvas.tokens.controlled.length === 0) $0ff1b08dd7313f2c$var$showTileArtSelect();
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register("token-variants", "showArtSelectToken", {
        name: "Show Art Select: Token",
        hint: "Brings up an Art Select pop-up to change the token images of the selected tokens.",
        editable: [
            {
                key: "Digit2",
                modifiers: [
                    "Shift"
                ]
            }
        ],
        onDown: ()=>{
            for (const token of canvas.tokens.controlled)(0, $hAn2A.showArtSelect)(token.name, {
                callback: async function(imgSrc, imgName) {
                    $0ff1b08dd7313f2c$export$9a81af9500bcd927(imgSrc, {
                        actor: token.actor,
                        imgName: imgName,
                        token: token
                    });
                },
                searchType: $0ff1b08dd7313f2c$export$71ce8fbad5957261.TOKEN,
                object: token
            });
            if ((0, $b2HDo.TVA_CONFIG).tilesEnabled && canvas.tokens.controlled.length === 0) $0ff1b08dd7313f2c$var$showTileArtSelect();
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register("token-variants", "showArtSelectGeneral", {
        name: "Show Art Select: Portrait+Token",
        hint: "Brings up an Art Select pop-up to change both Portrait and Token images of the selected tokens.",
        editable: [
            {
                key: "Digit3",
                modifiers: [
                    "Shift"
                ]
            }
        ],
        onDown: ()=>{
            for (const token of canvas.tokens.controlled){
                const actor = token.actor;
                (0, $hAn2A.showArtSelect)(token.name, {
                    callback: async function(imgSrc, imgName) {
                        if (actor) await $0ff1b08dd7313f2c$export$853901ce27596d97(actor, imgSrc);
                        $0ff1b08dd7313f2c$export$9a81af9500bcd927(imgSrc, {
                            actor: token.actor,
                            imgName: imgName,
                            token: token
                        });
                    },
                    searchType: $0ff1b08dd7313f2c$export$71ce8fbad5957261.PORTRAIT_AND_TOKEN,
                    object: token
                });
            }
            if ((0, $b2HDo.TVA_CONFIG).tilesEnabled && canvas.tokens.controlled.length === 0) $0ff1b08dd7313f2c$var$showTileArtSelect();
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register("token-variants", "openGlobalMappings", {
        name: "Open Global Effect Configurations",
        hint: "Brings up the settings window for Global Effect Configurations",
        editable: [
            {
                key: "KeyG",
                modifiers: [
                    "Shift"
                ]
            }
        ],
        onDown: ()=>{
            const setting = game.settings.get("core", DefaultTokenConfig.SETTING);
            const data = new foundry.data.PrototypeToken(setting);
            const token = new TokenDocument(data, {
                actor: null
            });
            new (0, $1v9Gt.default)(token, {
                globalMappings: true
            }).render(true);
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register("token-variants", "compendiumMapper", {
        name: "Compendium Mapper",
        hint: "Opens Compendium Mapper",
        editable: [
            {
                key: "KeyM",
                modifiers: [
                    "Shift"
                ]
            }
        ],
        onDown: ()=>{
            new (0, $6CrZR.default)().render(true);
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register("token-variants", "toggleTemplate", {
        name: "Toggle Template Dialog",
        hint: "Brings up a dialog from which you can toggle templates on currently selected tokens.",
        editable: [],
        onDown: (0, $eSPJO.toggleTemplateDialog),
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
}
function $0ff1b08dd7313f2c$export$cf2a4e460992a64b(imgSrc, imgName) {
    if (!imgName) imgName = $0ff1b08dd7313f2c$export$1396dd911f86baee(imgSrc);
    const tokenConfigs = ((0, $b2HDo.TVA_CONFIG).tokenConfigs || []).flat();
    return tokenConfigs.find((config)=>config.tvImgSrc == imgSrc && config.tvImgName == imgName) ?? {};
}
function $0ff1b08dd7313f2c$export$f5cd0e7fffe879fe(imgSrc, imgName, token) {
    if (!imgSrc) return {};
    let tokenConfig = {};
    for (const path of (0, $b2HDo.TVA_CONFIG).searchPaths)if (path.config && imgSrc.startsWith(path.text)) mergeObject(tokenConfig, path.config);
    let imgConfig = $0ff1b08dd7313f2c$export$cf2a4e460992a64b(imgSrc, imgName ?? $0ff1b08dd7313f2c$export$1396dd911f86baee(imgSrc));
    if (!isEmpty(imgConfig)) {
        imgConfig = deepClone(imgConfig);
        delete imgConfig.tvImgSrc;
        delete imgConfig.tvImgName;
        if (token) $0ff1b08dd7313f2c$export$7fe60b94e2075390.formToData(token, imgConfig);
        for(var key in imgConfig)if (!key.startsWith("tvTab_")) tokenConfig[key] = imgConfig[key];
    }
    if ((0, $b2HDo.TVA_CONFIG).imgNameContainsDimensions || (0, $b2HDo.TVA_CONFIG).imgNameContainsFADimensions) $0ff1b08dd7313f2c$export$5a727c8601678802(imgSrc, tokenConfig);
    return tokenConfig;
}
function $0ff1b08dd7313f2c$export$99dcb6b6e71c8ec3(imgSrc, imgName, tokenConfig) {
    const tokenConfigs = ((0, $b2HDo.TVA_CONFIG).tokenConfigs || []).flat();
    const tcIndex = tokenConfigs.findIndex((config)=>config.tvImgSrc == imgSrc && config.tvImgName == imgName);
    let deleteConfig = !tokenConfig || Object.keys(tokenConfig).length === 0;
    if (!deleteConfig) {
        tokenConfig["tvImgSrc"] = imgSrc;
        tokenConfig["tvImgName"] = imgName;
    }
    if (tcIndex != -1 && !deleteConfig) tokenConfigs[tcIndex] = tokenConfig;
    else if (tcIndex != -1 && deleteConfig) tokenConfigs.splice(tcIndex, 1);
    else if (!deleteConfig) tokenConfigs.push(tokenConfig);
    (0, $b2HDo.updateSettings)({
        tokenConfigs: tokenConfigs
    });
    return !deleteConfig;
}
function $0ff1b08dd7313f2c$export$1396dd911f86baee(path) {
    if (!path) return "";
    return $0ff1b08dd7313f2c$export$205603ad3b38424c(path).split("\\").pop().split("/").pop().split(".").slice(0, -1).join(".");
}
function $0ff1b08dd7313f2c$export$4569d268217979d8(path) {
    if (!path) return "";
    return $0ff1b08dd7313f2c$export$205603ad3b38424c(path).split("\\").pop().split("/").pop();
}
function $0ff1b08dd7313f2c$export$a8ae171f556d108c(path) {
    return $0ff1b08dd7313f2c$export$205603ad3b38424c(path).match(/(.*)[\/\\]/)[1] || "";
}
function $0ff1b08dd7313f2c$export$1cb6eb118298c3f6(name) {
    return name.replace($0ff1b08dd7313f2c$var$simplifyRegex, "").toLowerCase();
}
function $0ff1b08dd7313f2c$export$7a9d66609c223fd8(path) {
    return $0ff1b08dd7313f2c$export$245a8ae5fac6ab9(path).replace($0ff1b08dd7313f2c$var$simplifyRegex, "").toLowerCase();
}
function $0ff1b08dd7313f2c$export$b7039c4b5522f566(keywords) {
    return keywords.split(/\W/).map((word)=>$0ff1b08dd7313f2c$export$1cb6eb118298c3f6(word)).filter((word)=>word != "");
}
function $0ff1b08dd7313f2c$export$fb85bc5d6d9ef19b(path) {
    var extension = path.split(".");
    extension = extension[extension.length - 1].toLowerCase();
    return [
        "jpg",
        "jpeg",
        "png",
        "svg",
        "webp",
        "gif"
    ].includes(extension);
}
function $0ff1b08dd7313f2c$export$ac5608bbe92d6fdc(path) {
    var extension = path.split(".");
    extension = extension[extension.length - 1].toLowerCase();
    return [
        "mp4",
        "ogg",
        "webm",
        "m4v"
    ].includes(extension);
}
async function $0ff1b08dd7313f2c$export$a3fc2fee1fd32b75(path, apiKey) {
    return new Promise(async (resolve, reject)=>{
        if (typeof ForgeVTT === "undefined" || !ForgeVTT.usingTheForge) return resolve({});
        const url = `${ForgeVTT.FORGE_URL}/api/assets/browse`;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", url);
        xhr.setRequestHeader("Access-Key", apiKey);
        xhr.setRequestHeader("X-XSRF-TOKEN", await ForgeAPI.getXSRFToken());
        xhr.responseType = "json";
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState !== 4) return;
            resolve(xhr.response);
        };
        xhr.onerror = (err)=>{
            resolve({
                code: 500,
                error: err.message
            });
        };
        let formData = {
            path: path,
            options: {
                recursive: true
            }
        };
        formData = JSON.stringify(formData);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(formData);
    });
}
function $0ff1b08dd7313f2c$export$1933a9fe712fc1fd(searchType, filters) {
    // Select filters based on type of search
    filters = filters ? filters : (0, $b2HDo.TVA_CONFIG).searchFilters;
    if (filters[searchType]) filters = filters[searchType];
    else filters = {
        include: "",
        exclude: "",
        regex: ""
    };
    if (filters.regex) filters.regex = new RegExp(filters.regex);
    return filters;
}
function $0ff1b08dd7313f2c$export$e97747128355dc59(perm) {
    const permissions = perm ? perm : (0, $b2HDo.TVA_CONFIG).permissions;
    const role = game.user.role;
    return permissions.popups[role] || permissions.portrait_right_click[role] || permissions.image_path_button[role] || permissions.hudFullAccess[role];
}
async function $0ff1b08dd7313f2c$export$81af53b76c17cdd8(token, callback, checks = 40) {
    // v10/v9 compatibility
    if (!token.mesh || !token.mesh.texture) {
        checks--;
        if (checks > 1) new Promise((resolve)=>setTimeout(resolve, 1)).then(()=>$0ff1b08dd7313f2c$export$81af53b76c17cdd8(token, callback, checks));
        return;
    }
    callback(token);
}
function $0ff1b08dd7313f2c$export$1a1482e70c3f8ffc(results) {
    let flattened = [];
    if (!results) return flattened;
    results.forEach((images)=>{
        flattened = flattened.concat(images);
    });
    return flattened;
}
function $0ff1b08dd7313f2c$export$defc74b45e490df8(original, other = {}, { insertKeys: insertKeys = true, insertValues: insertValues = true, overwrite: overwrite = true, recursive: recursive = true, inplace: inplace = true, enforceTypes: enforceTypes = false } = {}, _d = 0) {
    other = other || {};
    if (!(original instanceof Object) || !(other instanceof Object)) throw new Error("One of original or other are not Objects!");
    const options = {
        insertKeys: insertKeys,
        insertValues: insertValues,
        overwrite: overwrite,
        recursive: recursive,
        inplace: inplace,
        enforceTypes: enforceTypes
    };
    // Special handling at depth 0
    if (_d === 0) {
        if (!inplace) original = deepClone(original);
        if (Object.keys(original).some((k)=>/\./.test(k))) original = expandObject(original);
        if (Object.keys(other).some((k)=>/\./.test(k))) other = expandObject(other);
    }
    // Iterate over the other object
    for (let k of Object.keys(other)){
        const v = other[k];
        if (original.hasOwnProperty("-=" + k)) {
            original[k] = original["-=" + k];
            delete original["-=" + k];
        }
        if (original.hasOwnProperty(k)) $0ff1b08dd7313f2c$var$_modMergeUpdate(original, k, v, options, _d + 1);
        else $0ff1b08dd7313f2c$var$_modMergeInsert(original, k, v, options, _d + 1);
    }
    return original;
}
/**
 * A helper function for merging objects when the target key does not exist in the original
 * @private
 */ function $0ff1b08dd7313f2c$var$_modMergeInsert(original, k, v, { insertKeys: insertKeys, insertValues: insertValues } = {}, _d) {
    // Recursively create simple objects
    if (v?.constructor === Object) {
        original[k] = $0ff1b08dd7313f2c$export$defc74b45e490df8({}, v, {
            insertKeys: true,
            inplace: true
        });
        return;
    }
    // Delete a key
    // if (k.startsWith('-=')) {
    //   delete original[k.slice(2)];
    //   return;
    // }
    // Insert a key
    const canInsert = _d <= 1 && insertKeys || _d > 1 && insertValues;
    if (canInsert) original[k] = v;
}
/**
 * A helper function for merging objects when the target key exists in the original
 * @private
 */ function $0ff1b08dd7313f2c$var$_modMergeUpdate(original, k, v, { insertKeys: insertKeys, insertValues: insertValues, enforceTypes: enforceTypes, overwrite: overwrite, recursive: recursive } = {}, _d) {
    const x = original[k];
    const tv = getType(v);
    const tx = getType(x);
    // Recursively merge an inner object
    if (tv === "Object" && tx === "Object" && recursive) return $0ff1b08dd7313f2c$export$defc74b45e490df8(x, v, {
        insertKeys: insertKeys,
        insertValues: insertValues,
        overwrite: overwrite,
        inplace: true,
        enforceTypes: enforceTypes
    }, _d);
    // Overwrite an existing value
    if (overwrite) {
        if (tx !== "undefined" && tv !== tx && enforceTypes) throw new Error(`Mismatched data types encountered during object merge.`);
        original[k] = v;
    }
}
async function $0ff1b08dd7313f2c$export$da928b76213541d1(script, { actor: actor, token: token, tvaUpdate: tvaUpdate } = {}) {
    // Add variables to the evaluation scope
    const speaker = ChatMessage.getSpeaker();
    const character = game.user.character;
    token = token?.object || token || (canvas.ready ? canvas.tokens.get(speaker.token) : null);
    actor = actor || token?.actor || game.actors.get(speaker.actor);
    // Attempt script execution
    const AsyncFunction = (async function() {}).constructor;
    try {
        const fn = AsyncFunction("speaker", "actor", "token", "character", "tvaUpdate", `${script}`);
        await fn.call(null, speaker, actor, token, character, tvaUpdate);
    } catch (err) {
        ui.notifications.error(`There was an error in your script syntax. See the console (F12) for details`);
        console.error(err);
    }
}
async function $0ff1b08dd7313f2c$export$4efd75b42b486b4d(macroName, token) {
    token = token?.object || token;
    game.macros.find((m)=>m.name === macroName)?.execute({
        token: token
    });
}
async function $0ff1b08dd7313f2c$export$e43fe9e17895939b(token, presetName, action = "apply") {
    token = token.object ?? token;
    if (game.modules.get("tokenmagic")?.active && token.document) {
        const preset = TokenMagic.getPreset(presetName);
        if (preset) {
            if (action === "apply") await TokenMagic.addUpdateFilters(token, preset);
            else if (action === "remove") await TokenMagic.deleteFilters(token, presetName);
        }
    }
}
async function $0ff1b08dd7313f2c$export$961a6e71d6289ec6(token, presetName) {
    token = token.object ?? token;
    if (game.modules.get("tokenmagic")?.active && token.document) {
        if (TokenMagic.hasFilterId(token, presetName)) $0ff1b08dd7313f2c$export$e43fe9e17895939b(token, presetName, "remove");
        else $0ff1b08dd7313f2c$export$e43fe9e17895939b(token, presetName, "apply");
    }
}
async function $0ff1b08dd7313f2c$export$8a36ba247bf4b0d0(tokenDoc, ceEffect, action = "apply") {
    if (game.modules.get("dfreds-convenient-effects")?.active) {
        if (!ceEffect.apply && !ceEffect.remove) return;
        else if (!ceEffect.apply || !ceEffect.remove) {
            if (action === "apply") {
                if (ceEffect.remove) action = "remove";
            } else return;
        }
        let uuid = tokenDoc.actor?.uuid;
        if (uuid) {
            if (action === "apply") await game.dfreds.effectInterface.addEffect({
                effectName: ceEffect.name,
                uuid: uuid,
                origin: "token-variants",
                overlay: false
            });
            else await game.dfreds.effectInterface.removeEffect({
                effectName: ceEffect.name,
                uuid: uuid
            });
        }
    }
}
async function $0ff1b08dd7313f2c$export$6fc760b2ad2335ff(token, effectName) {
    if (game.modules.get("dfreds-convenient-effects")?.active) {
        let uuid = (token.document ?? token).actor?.uuid;
        await game.dfreds.effectInterface.toggleEffect(effectName, {
            uuids: [
                uuid
            ],
            overlay: false
        });
    }
}
class $0ff1b08dd7313f2c$export$7fe60b94e2075390 {
    static dataToForm(data) {
        if ("texture.scaleX" in data) {
            data.scale = Math.abs(data["texture.scaleX"]);
            data.mirrorX = data["texture.scaleX"] < 0;
        }
        if ("texture.scaleY" in data) {
            data.scale = Math.abs(data["texture.scaleY"]);
            data.mirrorY = data["texture.scaleY"] < 0;
        }
    }
    static formToData(token, formData) {
        // Scale/mirroring
        if ("scale" in formData || "mirrorX" in formData || "mirrorY" in formData) {
            const doc = token.document ? token.document : token;
            if (!("scale" in formData)) formData.scale = Math.abs(doc.texture.scaleX);
            if (!("mirrorX" in formData)) formData.mirrorX = doc.texture.scaleX < 0;
            if (!("mirrorY" in formData)) formData.mirrorY = doc.texture.scaleY < 0;
            setProperty(formData, "texture.scaleX", formData.scale * (formData.mirrorX ? -1 : 1));
            setProperty(formData, "texture.scaleY", formData.scale * (formData.mirrorY ? -1 : 1));
            [
                "scale",
                "mirrorX",
                "mirrorY"
            ].forEach((k)=>delete formData[k]);
        }
    }
}
function $0ff1b08dd7313f2c$export$5afaac5d3dad358c(addedEffects, removedEffects, newEffects, oldEffects) {
    for (const ef of newEffects)if (!oldEffects.includes(ef)) addedEffects.push(ef);
    for (const ef of oldEffects)if (!newEffects.includes(ef)) removedEffects.push(ef);
}
async function $0ff1b08dd7313f2c$export$b62bf063b9928bd7(imgSrc) {
    let source = "data";
    const browseOptions = {
        wildcard: true
    };
    // Support non-user sources
    if (/\.s3\./.test(imgSrc)) {
        source = "s3";
        const { bucket: bucket, keyPrefix: keyPrefix } = FilePicker.parseS3URL(imgSrc);
        if (bucket) {
            browseOptions.bucket = bucket;
            imgSrc = keyPrefix;
        }
    } else if (imgSrc.startsWith("icons/")) source = "public";
    // Retrieve wildcard content
    try {
        const content = await FilePicker.browse(source, imgSrc, browseOptions);
        return content.files;
    } catch (err) {}
    return [];
}
async function $0ff1b08dd7313f2c$export$c60cd2bc191c0655(randomizerSettings) {
    const nameForgeSettings = randomizerSettings.nameForge;
    if (nameForgeSettings?.randomize && nameForgeSettings?.models) {
        const nameForge = game.modules.get("nameforge");
        if (nameForge?.active) {
            const randomNames = [];
            for (const modelKey of nameForgeSettings.models){
                const modelProp = getProperty(nameForge.models, modelKey);
                if (modelProp) {
                    const model = await nameForge.api.createModel(modelProp);
                    if (model) randomNames.push(nameForge.api.generateName(model)[0]);
                }
            }
            return randomNames[Math.floor(Math.random() * randomNames.length)];
        }
    }
    return null;
}
async function $0ff1b08dd7313f2c$export$7c70b8725990bcc9(token, options) {
    let renderTexture = $0ff1b08dd7313f2c$var$captureToken(token, options);
    if (renderTexture) {
        const b64 = canvas.app.renderer.extract.base64(renderTexture, "image/webp", 1);
        let res = await fetch(b64);
        let blob = await res.blob();
        const filename = options.name + `.webp`;
        let file = new File([
            blob
        ], filename, {
            type: "image/webp"
        });
        await FilePicker.upload("data", options.path, file, {});
    }
}
/**
 * Modified version of 'dev7355608' captureCanvas function. Captures combined Token and Overlay image
 */ function $0ff1b08dd7313f2c$var$captureToken(token, { scale: scale = 3, width: width = null, height: height = null } = {}) {
    if (!canvas.ready || !token) return;
    width = width ?? token.texture.width;
    height = height ?? token.texture.height;
    scale = scale * Math.min(width / token.texture.width, height / token.texture.height);
    const renderer = canvas.app.renderer;
    const viewPosition = {
        ...canvas.scene._viewPosition
    };
    renderer.resize(width ?? renderer.screen.width, height ?? renderer.screen.height);
    width = canvas.screenDimensions[0] = renderer.screen.width;
    height = canvas.screenDimensions[1] = renderer.screen.height;
    canvas.stage.position.set(width / 2, height / 2);
    canvas.pan({
        x: token.center.x,
        y: token.center.y,
        scale: scale
    });
    const renderTexture = PIXI.RenderTexture.create({
        width: width,
        height: height,
        resolution: token.texture.resolution
    });
    const cacheParent = canvas.stage.enableTempParent();
    canvas.stage.updateTransform();
    canvas.stage.disableTempParent(cacheParent);
    let spritesToRender = [
        token.mesh
    ];
    if (token.tvaOverlays) spritesToRender = spritesToRender.concat(token.tvaOverlays);
    spritesToRender.sort((sprite)=>sprite.sort);
    for (const sprite of spritesToRender)renderer.render(sprite, {
        renderTexture: renderTexture,
        skipUpdateTransform: true,
        clear: false
    });
    canvas._onResize();
    canvas.pan(viewPosition);
    return renderTexture;
}
function $0ff1b08dd7313f2c$export$1bad3b5e11592c24(actor, linked = false, document = false) {
    if (actor.isToken) {
        if (document) return [
            actor.token
        ];
        else if (actor.token.object) return [
            actor.token.object
        ];
        else return [];
    }
    const tokens = [];
    game.scenes.forEach((scene)=>scene.tokens.forEach((token)=>{
            if (token.actorId === actor.id) {
                if (linked && token.actorLink) tokens.push(token);
                else if (!linked) tokens.push(token);
            }
        }));
    if (document) return tokens;
    else return tokens.map((token)=>token.object).filter((token)=>token);
}
function $0ff1b08dd7313f2c$export$5a727c8601678802(img, dimensions = {}) {
    const name = $0ff1b08dd7313f2c$export$1396dd911f86baee(img);
    let scale;
    if ((0, $b2HDo.TVA_CONFIG).imgNameContainsDimensions) {
        const height = name.match(/_height(.*)_/)?.[1];
        if (height) dimensions.height = parseFloat(height);
        const width = name.match(/_width(.*)_/)?.[1];
        if (width) dimensions.width = parseFloat(width);
        scale = name.match(/_scale(.*)_/)?.[1];
        if (scale) scale = Math.max(parseFloat(scale), 0.2);
    }
    if ((0, $b2HDo.TVA_CONFIG).imgNameContainsFADimensions) {
        scale = name.match(/_Scale(\d+)_/)?.[1];
        if (scale) scale = Math.max(parseInt(scale) / 100, 0.2);
    }
    if (scale) {
        dimensions["texture.scaleX"] = scale;
        dimensions["texture.scaleY"] = scale;
    }
    return dimensions;
}
function $0ff1b08dd7313f2c$export$2b4b146f5cd9519c(hexString) {
    return PIXI.utils.string2hex(hexString);
}
function $0ff1b08dd7313f2c$export$205603ad3b38424c(uri) {
    try {
        return decodeURI(uri);
    } catch (e) {
        console.warn("URI Component not decodable: " + uri);
        return uri;
    }
}
function $0ff1b08dd7313f2c$export$245a8ae5fac6ab9(uri) {
    try {
        return decodeURIComponent(uri);
    } catch (e) {
        console.warn("URI Component not decodable: " + uri);
        return uri;
    }
}
function $0ff1b08dd7313f2c$export$488134d4acacca33(from, to) {
    const changedIDs = {};
    for (const m of from){
        const i = to.findIndex((mapping)=>mapping.label === m.label && mapping.group === m.group);
        if (i === -1) to.push(m);
        else {
            changedIDs[to.id] = m.id;
            if (to[i].tokens?.length) {
                if (!m.tokens) m.tokens = [];
                to[i].tokens.forEach((id)=>{
                    if (!m.tokens.includes(id)) m.tokens.push(id);
                });
            }
            to[i] = m;
        }
    }
    // If parent's id has been changed we need to update all the children
    to.forEach((m)=>{
        let pID = m.overlayConfig?.parentID;
        if (pID && pID in changedIDs) m.overlayConfig.parentID = changedIDs[pID];
    });
    return to;
}

});
parcelRequire.register("hAn2A", function(module, exports) {

$parcel$export(module.exports, "isInitialized", () => $4a77324b7f4a575a$export$3f95c6f800b78024);
$parcel$export(module.exports, "showArtSelect", () => $4a77324b7f4a575a$export$7515bad222171dd9);

var $b2HDo = parcelRequire("b2HDo");

var $5JxHT = parcelRequire("5JxHT");

var $1mRWy = parcelRequire("1mRWy");

var $64r9a = parcelRequire("64r9a");

var $aEqt1 = parcelRequire("aEqt1");

var $g3wZB = parcelRequire("g3wZB");

var $iJML9 = parcelRequire("iJML9");

var $ebtiN = parcelRequire("ebtiN");

var $lotAj = parcelRequire("lotAj");

var $eSPJO = parcelRequire("eSPJO");
// Tracks if module has been initialized
let $4a77324b7f4a575a$var$MODULE_INITIALIZED = false;
function $4a77324b7f4a575a$export$3f95c6f800b78024() {
    return $4a77324b7f4a575a$var$MODULE_INITIALIZED;
}
let $4a77324b7f4a575a$var$onInit = [];
/**
 * Initialize the Token Variants module on Foundry VTT init
 */ async function $4a77324b7f4a575a$var$initialize() {
    // Initialization should only be performed once
    if ($4a77324b7f4a575a$var$MODULE_INITIALIZED) return;
    // Font Awesome need to be loaded manually on FireFox
    (0, $64r9a.FONT_LOADING).loading = FontConfig.loadFont("fontAwesome", {
        editor: false,
        fonts: [
            {
                urls: [
                    "fonts/fontawesome/webfonts/fa-solid-900.ttf"
                ]
            }
        ]
    });
    // Want this to be executed once the module has initialized
    $4a77324b7f4a575a$var$onInit.push(()=>{
        // Need to wait for icons do be drawn first however I could not find a way
        // to wait until that has occurred. Instead we'll just wait for some static
        // amount of time.
        new Promise((resolve)=>setTimeout(resolve, 500)).then(()=>{
            for (const tkn of canvas.tokens.placeables){
                (0, $64r9a.drawOverlays)(tkn); // Draw Overlays
                // Disable effect icons
                if ((0, $b2HDo.TVA_CONFIG).disableEffectIcons) (0, $1mRWy.waitForTokenTexture)(tkn, (token)=>{
                    token.effects.removeChildren().forEach((c)=>c.destroy());
                    token.effects.bg = token.effects.addChild(new PIXI.Graphics());
                    token.effects.overlay = null;
                });
                else if ((0, $b2HDo.TVA_CONFIG).filterEffectIcons) (0, $1mRWy.waitForTokenTexture)(tkn, (token)=>{
                    token.drawEffects();
                });
            }
        });
    });
    if ((0, $1mRWy.userRequiresImageCache)()) (0, $g3wZB.cacheImages)();
    // Register ALL Hooks
    (0, $iJML9.registerAllHooks)();
    // Startup ticker that will periodically call 'updateEmbeddedDocuments' with all the accrued updates since the last tick
    (0, $1mRWy.startBatchUpdater)();
    (0, $iJML9.registerHook)("Search", "renderArtSelect", ()=>{
        (0, $5JxHT.ArtSelect).executing = false;
    });
    // Handle broadcasts
    game.socket?.on(`module.token-variants`, (message)=>{
        if (message.handlerName === "forgeSearchPaths" && message.type === "UPDATE") {
            // Workaround for forgeSearchPaths setting to be updated by non-GM clients
            if (!game.user.isGM) return;
            const isResponsibleGM = !game.users.filter((user)=>user.isGM && (user.active || user.isActive)).some((other)=>other.id < game.user.id);
            if (!isResponsibleGM) return;
            (0, $b2HDo.updateSettings)({
                forgeSearchPaths: message.args
            });
        } else if (message.handlerName === "drawOverlays" && message.type === "UPDATE") {
            if (message.args.all) {
                if (canvas.scene.id !== message.args.sceneId) for (const tkn of canvas.tokens.placeables)(0, $64r9a.drawOverlays)(tkn);
            } else if (message.args.actorId) {
                const actor = game.actors.get(message.args.actorId);
                if (actor) actor.getActiveTokens(true)?.forEach((tkn)=>(0, $64r9a.drawOverlays)(tkn));
            } else if (message.args.tokenId) {
                const tkn = canvas.tokens.get(message.args.tokenId);
                if (tkn) (0, $64r9a.drawOverlays)(tkn);
            }
        } else if (message.handlerName === "effectMappings") {
            if (!game.user.isGM) return;
            const isResponsibleGM = !game.users.filter((user)=>user.isGM && (user.active || user.isActive)).some((other)=>other.id < game.user.id);
            if (!isResponsibleGM) return;
            const args = message.args;
            const token = game.scenes.get(args.sceneId)?.tokens.get(args.tokenId);
            if (token) (0, $aEqt1.updateWithEffectMapping)(token, {
                added: args.added,
                removed: args.removed
            });
        }
    });
    $4a77324b7f4a575a$var$MODULE_INITIALIZED = true;
    for (const cb of $4a77324b7f4a575a$var$onInit)cb();
    $4a77324b7f4a575a$var$onInit = [];
}
async function $4a77324b7f4a575a$export$7515bad222171dd9(search, { callback: callback = null, searchType: searchType = (0, $1mRWy.SEARCH_TYPE).PORTRAIT_AND_TOKEN, object: object = null, force: force = false, preventClose: preventClose = false, image1: image1 = "", image2: image2 = "", displayMode: displayMode = (0, $5JxHT.ArtSelect).IMAGE_DISPLAY.NONE, multipleSelection: multipleSelection = false, searchOptions: searchOptions = {}, allImages: allImages = null } = {}) {
    if ((0, $g3wZB.isCaching)()) return;
    const artSelects = Object.values(ui.windows).filter((app)=>app instanceof (0, $5JxHT.ArtSelect));
    if ((0, $5JxHT.ArtSelect).executing || !force && artSelects.length !== 0) {
        (0, $5JxHT.addToArtSelectQueue)(search, {
            callback: callback,
            searchType: searchType,
            object: object,
            preventClose: preventClose,
            searchOptions: searchOptions,
            allImages: allImages
        });
        return;
    }
    (0, $5JxHT.ArtSelect).executing = true;
    if (!allImages) allImages = await (0, $g3wZB.doImageSearch)(search, {
        searchType: searchType,
        searchOptions: searchOptions
    });
    new (0, $5JxHT.ArtSelect)(search, {
        allImages: allImages,
        searchType: searchType,
        callback: callback,
        object: object,
        preventClose: preventClose,
        image1: image1,
        image2: image2,
        displayMode: displayMode,
        multipleSelection: multipleSelection,
        searchOptions: searchOptions
    }).render(true);
}
// Initialize module
(0, $iJML9.registerHook)("main", "ready", $4a77324b7f4a575a$var$initialize, {
    once: true
});
// Register API and Keybinds
(0, $iJML9.registerHook)("main", "init", function() {
    (0, $b2HDo.registerSettings)();
    (0, $ebtiN.registerAllWrappers)();
    (0, $1mRWy.registerKeybinds)();
    const api = {
        cacheImages: $g3wZB.cacheImages,
        doImageSearch: $g3wZB.doImageSearch,
        doRandomSearch: $g3wZB.doRandomSearch,
        getTokenEffects: $aEqt1.getTokenEffects,
        showArtSelect: $4a77324b7f4a575a$export$7515bad222171dd9,
        updateTokenImage: $1mRWy.updateTokenImage,
        exportSettingsToJSON: $b2HDo.exportSettingsToJSON,
        assignUserSpecificImage: $lotAj.assignUserSpecificImage,
        assignUserSpecificImageToSelected: $lotAj.assignUserSpecificImageToSelected,
        unassignUserSpecificImage: $lotAj.unassignUserSpecificImage,
        unassignUserSpecificImageFromSelected: $lotAj.unassignUserSpecificImageFromSelected,
        setOverlayVisibility: $aEqt1.setOverlayVisibility,
        toggleTemplateDialog: $eSPJO.toggleTemplateDialog,
        toggleTemplate: $aEqt1.toggleTemplate,
        toggleTemplateOnSelected: $aEqt1.toggleTemplateOnSelected,
        TVA_CONFIG: $b2HDo.TVA_CONFIG
    };
    Object.defineProperty(api, "hooks", {
        get () {
            return deepClone((0, $iJML9.REGISTERED_HOOKS));
        },
        configurable: true
    });
    Object.defineProperty(api, "wrappers", {
        get () {
            return deepClone((0, $ebtiN.REGISTERED_WRAPPERS));
        },
        configurable: true
    });
    game.modules.get("token-variants").api = api;
});

});
parcelRequire.register("5JxHT", function(module, exports) {

$parcel$export(module.exports, "addToArtSelectQueue", () => $42cb4d37fd6d0401$export$9627cb8e26eb867b);
$parcel$export(module.exports, "ArtSelect", () => $42cb4d37fd6d0401$export$ccc8aa552c95ef88);
$parcel$export(module.exports, "addToQueue", () => $42cb4d37fd6d0401$export$30665681cb9a2b60);
$parcel$export(module.exports, "renderFromQueue", () => $42cb4d37fd6d0401$export$abbc2a15ff9ed201);
$parcel$export(module.exports, "insertArtSelectButton", () => $42cb4d37fd6d0401$export$746cd8e50fad2f01);

var $cQdfX = parcelRequire("cQdfX");

var $1mRWy = parcelRequire("1mRWy");

var $hAn2A = parcelRequire("hAn2A");

var $b2HDo = parcelRequire("b2HDo");
function $42cb4d37fd6d0401$export$9627cb8e26eb867b(search, options) {
    $42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.push({
        search: search,
        options: options
    });
    $("button#token-variant-art-clear-queue").html(`Clear Queue (${$42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.length})`).show();
}
function $42cb4d37fd6d0401$export$30665681cb9a2b60(search, options) {
    $42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.push({
        search: search,
        options: options
    });
}
function $42cb4d37fd6d0401$export$abbc2a15ff9ed201(force = false) {
    if (!force) {
        const artSelects = Object.values(ui.windows).filter((app)=>app instanceof $42cb4d37fd6d0401$export$ccc8aa552c95ef88);
        if (artSelects.length !== 0) {
            if ($42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.length !== 0) $("button#token-variant-art-clear-queue").html(`Clear Queue (${$42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.length})`).show();
            return;
        }
    }
    let callData = $42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.shift();
    if (callData?.options.execute) {
        callData.options.execute();
        callData = $42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.shift();
    }
    if (callData) (0, $hAn2A.showArtSelect)(callData.search, callData.options);
}
function $42cb4d37fd6d0401$var$delay(fn, ms) {
    let timer = 0;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), ms || 0);
    };
}
class $42cb4d37fd6d0401$export$ccc8aa552c95ef88 extends FormApplication {
    static queue = [];
    static instance = null;
    // showArtSelect(...) can take a while to fully execute and it is possible for it to be called
    // multiple times in very quick succession especially if copy pasting tokens or importing actors.
    // This variable set early in the function execution is used to queue additional requests rather
    // than continue execution
    static executing = false;
    static IMAGE_DISPLAY = {
        NONE: 0,
        PORTRAIT: 1,
        TOKEN: 2,
        PORTRAIT_TOKEN: 3,
        IMAGE: 4
    };
    constructor(search, { preventClose: preventClose = false, object: object = null, callback: callback = null, searchType: searchType = null, allImages: allImages = null, image1: image1 = "", image2: image2 = "", displayMode: displayMode = $42cb4d37fd6d0401$export$ccc8aa552c95ef88.IMAGE_DISPLAY.NONE, multipleSelection: multipleSelection = false, searchOptions: searchOptions = {} } = {}){
        let title = game.i18n.localize("token-variants.windows.art-select.select-variant");
        if (searchType === (0, $1mRWy.SEARCH_TYPE).TOKEN) title = game.i18n.localize("token-variants.windows.art-select.select-token-art");
        else if (searchType === (0, $1mRWy.SEARCH_TYPE).PORTRAIT) title = game.i18n.localize("token-variants.windows.art-select.select-portrait-art");
        super({}, {
            closeOnSubmit: false,
            width: $42cb4d37fd6d0401$export$ccc8aa552c95ef88.WIDTH || 500,
            height: $42cb4d37fd6d0401$export$ccc8aa552c95ef88.HEIGHT || 500,
            left: $42cb4d37fd6d0401$export$ccc8aa552c95ef88.LEFT,
            top: $42cb4d37fd6d0401$export$ccc8aa552c95ef88.TOP,
            title: title
        });
        this.search = search;
        this.allImages = allImages;
        this.callback = callback;
        this.doc = object;
        this.preventClose = preventClose;
        this.image1 = image1;
        this.image2 = image2;
        this.displayMode = displayMode;
        this.multipleSelection = multipleSelection;
        this.searchType = searchType;
        this.searchOptions = mergeObject(searchOptions, (0, $b2HDo.getSearchOptions)(), {
            overwrite: false
        });
        $42cb4d37fd6d0401$export$ccc8aa552c95ef88.instance = this;
        const constructorName = `ArtSelect`;
        Object.defineProperty($42cb4d37fd6d0401$export$ccc8aa552c95ef88.prototype.constructor, "name", {
            value: constructorName
        });
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-art-select",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/artSelect.html",
            resizable: true,
            minimizable: false
        });
    }
    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        buttons.unshift({
            label: "FilePicker",
            class: "file-picker",
            icon: "fas fa-file-import fa-fw",
            onclick: ()=>{
                new FilePicker({
                    type: "imagevideo",
                    callback: (path)=>{
                        if (!this.preventClose) this.close();
                        if (this.callback) this.callback(path, (0, $1mRWy.getFileName)(path));
                    }
                }).render();
            }
        });
        buttons.unshift({
            label: "Image Category",
            class: "type",
            icon: "fas fa-swatchbook",
            onclick: ()=>{
                if ($42cb4d37fd6d0401$export$ccc8aa552c95ef88.instance) $42cb4d37fd6d0401$export$ccc8aa552c95ef88.instance._typeSelect();
            }
        });
        return buttons;
    }
    _typeSelect() {
        const categories = (0, $1mRWy.BASE_IMAGE_CATEGORIES).concat((0, $b2HDo.TVA_CONFIG).customImageCategories);
        const buttons = {};
        for (const c of categories){
            let label = c;
            if (c === this.searchType) label = "<b>>>> " + label + " <<<</b>";
            buttons[c] = {
                label: label,
                callback: ()=>{
                    if (this.searchType !== c) {
                        this.searchType = c;
                        this._performSearch(this.search, true);
                    }
                }
            };
        }
        new Dialog({
            title: `Select Image Category and Filter`,
            content: `<style>.dialog .dialog-button {flex: 0 0 auto;}</style>`,
            buttons: buttons
        }).render(true);
    }
    async getData(options) {
        const data = super.getData(options);
        if (this.doc instanceof Item) {
            data.item = true;
            data.description = this.doc.system?.description?.value ?? "";
        }
        const searchOptions = this.searchOptions;
        const algorithm = searchOptions.algorithm;
        //
        // Create buttons
        //
        const tokenConfigs = ((0, $b2HDo.TVA_CONFIG).tokenConfigs || []).flat();
        const fuzzySearch = algorithm.fuzzy;
        let allButtons = new Map();
        let artFound = false;
        const genLabel = function(str, indices, start = "<mark>", end = "</mark>", fillChar = null) {
            if (!indices) return str;
            let fillStr = fillChar ? fillChar.repeat(str.length) : str;
            let label = "";
            let lastIndex = 0;
            for (const index of indices){
                label += fillStr.slice(lastIndex, index[0]);
                label += start + str.slice(index[0], index[1] + 1) + end;
                lastIndex = index[1] + 1;
            }
            label += fillStr.slice(lastIndex, fillStr.length);
            return label;
        };
        const genTitle = function(obj) {
            if (!fuzzySearch) return obj.path;
            let percent = Math.ceil((1 - obj.score) * 100) + "%";
            if (searchOptions.runSearchOnPath) return percent + "\n" + genLabel(obj.path, obj.indices, "", "", "-") + "\n" + obj.path;
            return percent;
        };
        this.allImages.forEach((images, search)=>{
            const buttons = [];
            images.forEach((imageObj)=>{
                artFound = true;
                const vid = (0, $1mRWy.isVideo)(imageObj.path);
                const img = (0, $1mRWy.isImage)(imageObj.path);
                buttons.push({
                    path: imageObj.path,
                    img: img,
                    vid: vid,
                    type: vid || img,
                    name: imageObj.name,
                    label: fuzzySearch && !searchOptions.runSearchOnPath ? genLabel(imageObj.name, imageObj.indices) : imageObj.name,
                    title: genTitle(imageObj),
                    hasConfig: this.searchType === (0, $1mRWy.SEARCH_TYPE).TOKEN || this.searchType === (0, $1mRWy.SEARCH_TYPE).PORTRAIT_AND_TOKEN ? Boolean(tokenConfigs.find((config)=>config.tvImgSrc == imageObj.path && config.tvImgName == imageObj.name)) : false
                });
            });
            allButtons.set(search, buttons);
        });
        if (artFound) data.allImages = allButtons;
        data.search = this.search;
        data.queue = $42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.length;
        data.image1 = this.image1;
        data.image2 = this.image2;
        data.displayMode = this.displayMode;
        data.multipleSelection = this.multipleSelection;
        data.displaySlider = algorithm.fuzzy && algorithm.fuzzyArtSelectPercentSlider;
        data.fuzzyThreshold = algorithm.fuzzyThreshold;
        if (data.displaySlider) {
            data.fuzzyThreshold = 100 - data.fuzzyThreshold * 100;
            data.fuzzyThreshold = data.fuzzyThreshold.toFixed(0);
        }
        data.autoplay = !(0, $b2HDo.TVA_CONFIG).playVideoOnHover;
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        const callback = this.callback;
        const close = ()=>this.close();
        const object = this.doc;
        const preventClose = this.preventClose;
        const multipleSelection = this.multipleSelection;
        const boxes = html.find(`.token-variants-grid-box`);
        boxes.hover(function() {
            if ((0, $b2HDo.TVA_CONFIG).playVideoOnHover) {
                const vid = $(this).siblings("video");
                if (vid.length) {
                    vid[0].play();
                    $(this).siblings(".fa-play").hide();
                }
            }
        }, function() {
            if ((0, $b2HDo.TVA_CONFIG).pauseVideoOnHoverOut) {
                const vid = $(this).siblings("video");
                if (vid.length) {
                    vid[0].pause();
                    vid[0].currentTime = 0;
                    $(this).siblings(".fa-play").show();
                }
            }
        });
        boxes.map((box)=>{
            boxes[box].addEventListener("click", async function(event) {
                if ((0, $1mRWy.keyPressed)("config")) {
                    if (object) new (0, $cQdfX.default)(object, {}, event.target.dataset.name, event.target.dataset.filename).render(true);
                } else {
                    if (!preventClose) close();
                    if (callback) callback(event.target.dataset.name, event.target.dataset.filename);
                }
            });
            if (multipleSelection) boxes[box].addEventListener("contextmenu", async function(event) {
                $(event.target).toggleClass("selected");
            });
        });
        let searchInput = html.find("#custom-art-search");
        searchInput.focus();
        searchInput[0].selectionStart = searchInput[0].selectionEnd = 10000;
        searchInput.on("input", $42cb4d37fd6d0401$var$delay((event)=>{
            this._performSearch(event.target.value);
        }, 350));
        html.find(`button#token-variant-art-clear-queue`).on("click", (event)=>{
            $42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue = $42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.filter((callData)=>callData.options.execute);
            $(event.target).hide();
        });
        $(html).find('[name="fuzzyThreshold"]').change((e)=>{
            $(e.target).siblings(".token-variants-range-value").html(`${parseFloat(e.target.value).toFixed(0)}%`);
            this.searchOptions.algorithm.fuzzyThreshold = (100 - e.target.value) / 100;
        }).change($42cb4d37fd6d0401$var$delay((event)=>{
            this._performSearch(this.search, true);
        }, 350));
        if (multipleSelection) {
            html.find(`button#token-variant-art-return-selected`).on("click", ()=>{
                if (callback) {
                    const images = [];
                    html.find(`.token-variants-grid-box.selected`).siblings(".token-variants-grid-image").each(function() {
                        images.push(this.getAttribute("src"));
                    });
                    callback(images);
                }
                close();
            });
            html.find(`button#token-variant-art-return-all`).on("click", ()=>{
                if (callback) {
                    const images = [];
                    html.find(`.token-variants-grid-image`).each(function() {
                        images.push(this.getAttribute("src"));
                    });
                    callback(images);
                }
                close();
            });
        }
    }
    _performSearch(search, force = false) {
        if (!force && this.search.trim() === search.trim()) return;
        (0, $hAn2A.showArtSelect)(search, {
            callback: this.callback,
            searchType: this.searchType,
            object: this.doc,
            force: true,
            image1: this.image1,
            image2: this.image2,
            displayMode: this.displayMode,
            multipleSelection: this.multipleSelection,
            searchOptions: this.searchOptions,
            preventClose: this.preventClose
        });
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        if (formData && formData.search != this.search) this._performSearch(formData.search);
        else this.close();
    }
    setPosition(options = {}) {
        if (options.width) $42cb4d37fd6d0401$export$ccc8aa552c95ef88.WIDTH = options.width;
        if (options.height) $42cb4d37fd6d0401$export$ccc8aa552c95ef88.HEIGHT = options.height;
        if (options.top) $42cb4d37fd6d0401$export$ccc8aa552c95ef88.TOP = options.top;
        if (options.left) $42cb4d37fd6d0401$export$ccc8aa552c95ef88.LEFT = options.left;
        super.setPosition(options);
    }
    async close(options = {}) {
        let callData = $42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.shift();
        if (callData?.options.execute) {
            callData.options.execute();
            callData = $42cb4d37fd6d0401$export$ccc8aa552c95ef88.queue.shift();
        }
        if (callData) {
            callData.options.force = true;
            (0, $hAn2A.showArtSelect)(callData.search, callData.options);
        } else {
            // For some reason there might be app instances that have not closed themselves by this point
            // If there are, close them now
            const artSelects = Object.values(ui.windows).filter((app)=>app instanceof $42cb4d37fd6d0401$export$ccc8aa552c95ef88).filter((app)=>app.appId !== this.appId);
            for (const app of artSelects)app.close();
            return super.close(options);
        }
    }
}
function $42cb4d37fd6d0401$export$746cd8e50fad2f01(html, target, { search: search = "", searchType: searchType = (0, $1mRWy.SEARCH_TYPE).TOKEN } = {}) {
    const button = $(`<button 
      class="token-variants-image-select-button" 
      type="button"
      data-type="imagevideo"
      data-target="${target}"
      title="${game.i18n.localize("token-variants.windows.art-select.select-variant")}">
        <i class="fas fa-images"></i>
      </button>`);
    button.on("click", ()=>{
        (0, $hAn2A.showArtSelect)(search, {
            callback: (imgSrc, name)=>{
                button.siblings(`[name="${target}"]`).val(imgSrc);
            },
            searchType: searchType
        });
    });
    const input = html.find(`[name="${target}"]`);
    input.after(button);
    return Boolean(input.length);
}

});
parcelRequire.register("cQdfX", function(module, exports) {

$parcel$export(module.exports, "default", () => $95949fcf105f01db$export$2e2bcd8739ae039);

var $1mRWy = parcelRequire("1mRWy");
class $95949fcf105f01db$export$2e2bcd8739ae039 extends TokenConfig {
    constructor(object, options, imgSrc, imgName, callback, config){
        let token;
        if (object instanceof Actor) token = new TokenDocument(object.token, {
            actor: object
        });
        else token = new TokenDocument(object.document, {
            actor: game.actors.get(object.actorId)
        });
        super(token, options);
        this.imgSrc = imgSrc;
        this.imgName = imgName;
        this.callback = callback;
        this.config = config;
        if (this.config) {
            this.flags = this.config.flags;
            this.tv_script = this.config.tv_script;
        }
    }
    _getSubmitData(updateData = {}) {
        if (!this.form) throw new Error("The FormApplication subclass has no registered form element");
        const fd = new FormDataExtended(this.form, {
            editors: this.editors
        });
        let data = fd.object;
        if (updateData) data = foundry.utils.flattenObject(foundry.utils.mergeObject(data, updateData));
        // Clear detection modes array
        if (!("detectionModes.0.id" in data)) data.detectionModes = [];
        // Treat "None" as null for bar attributes
        data["bar1.attribute"] ||= null;
        data["bar2.attribute"] ||= null;
        return data;
    }
    async _updateObject(event, formData) {
        const filtered = {};
        const form = $(event.target).closest("form");
        form.find(".form-group").each(function(_) {
            const tva_checkbox = $(this).find(".tva-config-checkbox > input");
            if (tva_checkbox.length && tva_checkbox.is(":checked")) $(this).find("[name]").each(function(_) {
                const name = $(this).attr("name");
                filtered[name] = formData[name];
            });
        });
        if (this.tv_script) filtered.tv_script = this.tv_script;
        if (this.config) {
            let config = expandObject(filtered);
            config.flags = config.flags ? mergeObject(this.flags || {}, config.flags) : this.flags;
            if (this.callback) this.callback(config);
        } else {
            const saved = (0, $1mRWy.setTokenConfig)(this.imgSrc, this.imgName, filtered);
            if (this.callback) this.callback(saved);
        }
    }
    applyCustomConfig() {
        const tokenConfig = flattenObject(this.config || (0, $1mRWy.getTokenConfig)(this.imgSrc, this.imgName));
        const form = $(this.form);
        for (const key of Object.keys(tokenConfig)){
            const el = form.find(`[name="${key}"]`);
            if (el.is(":checkbox")) el.prop("checked", tokenConfig[key]);
            else el.val(tokenConfig[key]);
            el.trigger("change");
        }
    }
    // *************
    // consider moving html injection to:
    // _replaceHTML | _injectHTML
    async activateListeners(html) {
        await super.activateListeners(html);
        // Disable image path controls
        $(html).find(".token-variants-image-select-button").prop("disabled", true);
        $(html).find(".file-picker").prop("disabled", true);
        $(html).find(".image").prop("disabled", true);
        // Remove 'Assign Token' button
        $(html).find(".assign-token").remove();
        // Add checkboxes to control inclusion of specific tabs in the custom config
        const tokenConfig = this.config || (0, $1mRWy.getTokenConfig)(this.imgSrc, this.imgName);
        this.tv_script = tokenConfig.tv_script;
        $(html).on("change", ".tva-config-checkbox", this._onCheckboxChange);
        const processFormGroup = function(formGroup) {
            // Checkbox is not added for the Image Path group
            if (!$(formGroup).find('[name="img"]').length) {
                let savedField = false;
                if (tokenConfig) {
                    const flatConfig = flattenObject(tokenConfig);
                    $(formGroup).find("[name]").each(function(_) {
                        const name = $(this).attr("name");
                        if (name in flatConfig) savedField = true;
                    });
                }
                const checkbox = $(`<div class="tva-config-checkbox"><input type="checkbox" data-dtype="Boolean" ${savedField ? 'checked=""' : ""}></div>`);
                if ($(formGroup).find("p.hint").length) $(formGroup).find("p.hint").before(checkbox);
                else $(formGroup).append(checkbox);
                checkbox.find("input").trigger("change");
            }
        };
        // Add checkboxes to each form-group to control highlighting and which fields will are to be saved
        $(html).find(".form-group").each(function(index) {
            processFormGroup(this);
        });
        // Add 'update' and 'remove' config buttons
        $(html).find(".sheet-footer > button").remove();
        $(html).find(".sheet-footer").append('<button type="submit" value="1"><i class="far fa-save"></i> Save Config</button>');
        if (tokenConfig) {
            $(html).find(".sheet-footer").append('<button type="button" class="remove-config"><i class="fas fa-trash"></i> Remove Config</button>');
            html.find(".remove-config").click(this._onRemoveConfig.bind(this));
        }
        // Pre-select image or appearance tab
        $(html).find('.tabs > .item[data-tab="image"] > i').trigger("click");
        $(html).find('.tabs > .item[data-tab="appearance"] > i').trigger("click");
        document.activeElement.blur(); // Hack fix for key UP/DOWN effects not registering after config has been opened
        // TokenConfig might be changed by some modules after activateListeners is processed
        // Look out for these updates and add checkboxes for any newly added form-groups
        const mutate = (mutations)=>{
            mutations.forEach((mutation)=>{
                mutation.addedNodes.forEach((node)=>{
                    if (node.nodeName === "DIV" && node.className === "form-group") {
                        processFormGroup(node);
                        this.applyCustomConfig();
                    }
                });
            });
        };
        const observer = new MutationObserver(mutate);
        observer.observe(html[0], {
            characterData: false,
            attributes: false,
            childList: true,
            subtree: true
        });
        // On any field being changed we want to automatically select the form-group to be included in the update
        $(html).on("change", "input, select", $95949fcf105f01db$var$onInputChange);
        $(html).on("click", "button", $95949fcf105f01db$var$onInputChange);
        this.applyCustomConfig();
    }
    async _onCheckboxChange(event) {
        const checkbox = $(event.target);
        checkbox.closest(".form-group").css({
            "outline-color": checkbox.is(":checked") ? "green" : "#ffcc6e",
            "outline-width": "2px",
            "outline-style": "dotted",
            "margin-bottom": "5px"
        });
        checkbox.closest(".tva-config-checkbox").css({
            "outline-color": checkbox.is(":checked") ? "green" : "#ffcc6e",
            "outline-width": "2px",
            "outline-style": "solid"
        });
    }
    async _onRemoveConfig(event) {
        if (this.config) {
            if (this.callback) this.callback({});
        } else {
            const saved = (0, $1mRWy.setTokenConfig)(this.imgSrc, this.imgName, null);
            if (this.callback) this.callback(saved);
        }
        this.close();
    }
    get id() {
        return `token-custom-config-${this.object.id}`;
    }
    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        return buttons;
    }
}
// Toggle checkbox if input has been detected inside it's form-group
async function $95949fcf105f01db$var$onInputChange(event) {
    if (event.target.parentNode.className === "tva-config-checkbox") return;
    $(event.target).closest(".form-group").find(".tva-config-checkbox input").prop("checked", true);
}

});


parcelRequire.register("64r9a", function(module, exports) {

$parcel$export(module.exports, "FONT_LOADING", () => FONT_LOADING);
$parcel$export(module.exports, "drawOverlays", () => drawOverlays);
$parcel$export(module.exports, "evaluateOverlayExpressions", () => evaluateOverlayExpressions);
$parcel$export(module.exports, "genTexture", () => genTexture);
$parcel$export(module.exports, "removeMarkedOverlays", () => removeMarkedOverlays);
$parcel$export(module.exports, "interpolateColor", () => interpolateColor);
$parcel$export(module.exports, "broadcastOverlayRedraw", () => broadcastOverlayRedraw);

var $b2HDo = parcelRequire("b2HDo");

var $ecMWg = parcelRequire("ecMWg");

var $1mRWy = parcelRequire("1mRWy");

var $aEqt1 = parcelRequire("aEqt1");
const FONT_LOADING = {};
async function drawOverlays(token11) {
    if (token11.tva_drawing_overlays) return;
    token11.tva_drawing_overlays = true;
    const mappings11 = (0, $aEqt1.getAllEffectMappings)(token11);
    const effects11 = (0, $aEqt1.getTokenEffects)(token11, true);
    let processedMappings11 = mappings11.filter((m31)=>m31.overlay && effects11.includes(m31.id)).sort((m111, m211)=>(m111.priority - m111.overlayConfig?.parentID ? 0 : 999) - (m211.priority - m211.overlayConfig?.parentID ? 0 : 999));
    // See if the whole stack or just top of the stack should be used according to settings
    if (processedMappings11.length) processedMappings11 = (0, $b2HDo.TVA_CONFIG).stackStatusConfig ? processedMappings11 : [
        processedMappings11[processedMappings11.length - 1]
    ];
    // Process strings as expressions
    const overlays11 = processedMappings11.map((m31)=>evaluateOverlayExpressions(deepClone(m31.overlayConfig), token11, m31));
    if (overlays11.length) (0, $1mRWy.waitForTokenTexture)(token11, async (token11)=>{
        if (!token11.tvaOverlays) token11.tvaOverlays = [];
        // Temporarily mark every overlay for removal.
        // We'll only keep overlays that are still applicable to the token
        _markAllOverlaysForRemoval(token11);
        // To keep track of the overlay order
        let overlaySort11 = 0;
        let underlaySort11 = 0;
        for (const ov11 of overlays11){
            let sprite11 = _findTVAOverlay(ov11.id, token11);
            if (sprite11) {
                const diff11 = diffObject(sprite11.overlayConfig, ov11);
                // Check if we need to create a new texture or simply refresh the overlay
                if (!isEmpty(diff11)) {
                    if (ov11.img?.includes("*") || ov11.img?.includes("{") && ov11.img?.includes("}")) sprite11.refresh(ov11);
                    else if (diff11.img || diff11.text || diff11.shapes || diff11.repeat) sprite11.setTexture(await genTexture(token11, ov11), {
                        configuration: ov11
                    });
                    else if (diff11.parentID) {
                        sprite11.parent?.removeChild(sprite11)?.destroy();
                        sprite11 = null;
                    } else sprite11.refresh(ov11);
                } else if (diff11.text?.text || diff11.shapes) sprite11.setTexture(await genTexture(token11, ov11), {
                    configuration: ov11
                });
                if ("ui" in diff11) {
                    sprite11.parent.removeChild(sprite11);
                    const layer11 = ov11.ui ? canvas.tokens : canvas.primary;
                    sprite11 = layer11.addChild(sprite11);
                }
            }
            if (!sprite11) {
                if (ov11.parentID) {
                    const parent11 = _findTVAOverlay(ov11.parentID, token11);
                    if (parent11 && !parent11.tvaRemove) sprite11 = parent11.addChildAuto(new (0, $ecMWg.TVAOverlay)(await genTexture(token11, ov11), token11, ov11));
                } else {
                    const layer11 = ov11.ui ? canvas.tokens : canvas.primary;
                    sprite11 = layer11.addChild(new (0, $ecMWg.TVAOverlay)(await genTexture(token11, ov11), token11, ov11));
                }
                if (sprite11) token11.tvaOverlays.push(sprite11);
            }
            // If the sprite has a parent confirm that the parent has not been removed
            if (sprite11?.overlayConfig.parentID) {
                const parent11 = _findTVAOverlay(sprite11.overlayConfig.parentID, token11);
                if (!parent11 || parent11.tvaRemove) sprite11 = null;
            }
            if (sprite11) {
                sprite11.tvaRemove = false; // Sprite in use, do not remove
                // Assign order to the overlay
                if (sprite11.overlayConfig.underlay) {
                    underlaySort11 -= 0.01;
                    sprite11.overlaySort = underlaySort11;
                } else {
                    overlaySort11 += 0.01;
                    sprite11.overlaySort = overlaySort11;
                }
            }
        }
        removeMarkedOverlays(token11);
        token11.tva_drawing_overlays = false;
    });
    else {
        _removeAllOverlays(token11);
        token11.tva_drawing_overlays = false;
    }
}
async function genTexture(token11, conf11) {
    const img11 = conf11.imgLinked ? token11.document.texture.src : conf11.img?.trim();
    if (img11) return await generateImage(token11, conf11, img11);
    else if (conf11.text?.text != null) return await generateTextTexture(token11, conf11);
    else if (conf11.shapes?.length) return await generateShapeTexture(token11, conf11.shapes);
    else if (conf11.html?.template) return {
        html: true,
        texture: await loadTexture("modules\\token-variants\\img\\html_bg.webp")
    };
    else return {
        texture: await loadTexture("modules/token-variants/img/token-images.svg")
    };
}
async function generateImage(token11, conf11, img11) {
    if (img11.includes("*") || img11.includes("{") && img11.includes("}")) {
        const images11 = await wildcardImageSearch(img11);
        if (images11.length) {
            if (images11.length) img11 = images11[Math.floor(Math.random() * images11.length)];
        }
    }
    let texture11 = await loadTexture(img11, {
        fallback: "modules/token-variants/img/token-images.svg"
    });
    // Repeat image if needed
    // Repeating the shape if necessary
    if (conf11.repeating && conf11.repeat) {
        const repeat11 = conf11.repeat;
        let numRepeats11;
        if (repeat11.isPercentage) numRepeats11 = Math.ceil(repeat11.value / repeat11.maxValue / (repeat11.increment / 100));
        else numRepeats11 = Math.ceil(repeat11.value / repeat11.increment);
        let n11 = 0;
        let rows11 = 0;
        const maxRows11 = repeat11.maxRows ?? Infinity;
        let xOffset11 = 0;
        let yOffset11 = 0;
        const paddingX11 = repeat11.paddingX ?? 0;
        const paddingY11 = repeat11.paddingY ?? 0;
        let container11 = new PIXI.Container();
        while(numRepeats11 > 0){
            let img11 = new PIXI.Sprite(texture11);
            img11.x = xOffset11;
            img11.y = yOffset11;
            container11.addChild(img11);
            xOffset11 += texture11.width + paddingX11;
            numRepeats11--;
            n11++;
            if (numRepeats11 != 0 && n11 >= repeat11.perRow) {
                rows11 += 1;
                if (rows11 >= maxRows11) break;
                yOffset11 += texture11.height + paddingY11;
                xOffset11 = 0;
                n11 = 0;
            }
        }
        texture11 = _renderContainer(container11, texture11.resolution);
    }
    return {
        texture: texture11
    };
}
function _renderContainer(container11, resolution11, { width: width11 = null, height: height11 = null } = {}) {
    const bounds11 = container11.getLocalBounds();
    const matrix11 = new PIXI.Matrix();
    matrix11.tx = -bounds11.x;
    matrix11.ty = -bounds11.y;
    const renderTexture11 = PIXI.RenderTexture.create({
        width: width11 ?? bounds11.width,
        height: height11 ?? bounds11.height,
        resolution: resolution11
    });
    if (isNewerVersion("11", game.version)) canvas.app.renderer.render(container11, renderTexture11, true, matrix11, false);
    else canvas.app.renderer.render(container11, {
        renderTexture: renderTexture11,
        clear: true,
        transform: matrix11,
        skipUpdateTransform: false
    });
    renderTexture11.destroyable = true;
    return renderTexture11;
}
// Return width and height of the drawn shape
function _drawShape(graphics11, shape11, xOffset11 = 0, yOffset11 = 0) {
    if (shape11.type === "rectangle") {
        graphics11.drawRoundedRect(shape11.x + xOffset11, shape11.y + yOffset11, shape11.width, shape11.height, shape11.radius);
        return [
            shape11.width,
            shape11.height
        ];
    } else if (shape11.type === "ellipse") {
        graphics11.drawEllipse(shape11.x + xOffset11 + shape11.width, shape11.y + yOffset11 + shape11.height, shape11.width, shape11.height);
        return [
            shape11.width * 2,
            shape11.height * 2
        ];
    } else if (shape11.type === "polygon") graphics11.drawPolygon(shape11.points.split(",").map((p11, i11)=>Number(p11) * shape11.scale + (i11 % 2 === 0 ? shape11.x : shape11.y)));
    else if (shape11.type === "torus") {
        drawTorus(graphics11, shape11.x + xOffset11 + shape11.outerRadius, shape11.y + yOffset11 + shape11.outerRadius, shape11.innerRadius, shape11.outerRadius, Math.toRadians(shape11.startAngle), shape11.endAngle >= 360 ? Math.PI * 2 : Math.toRadians(shape11.endAngle));
        return [
            shape11.outerRadius * 2,
            shape11.outerRadius * 2
        ];
    }
}
async function generateShapeTexture(token11, shapes11) {
    let graphics11 = new PIXI.Graphics();
    for (const obj11 of shapes11){
        graphics11.beginFill(interpolateColor(obj11.fill.color, obj11.fill.interpolateColor), obj11.fill.alpha);
        graphics11.lineStyle(obj11.line.width, (0, $1mRWy.string2Hex)(obj11.line.color), obj11.line.alpha);
        const shape11 = obj11.shape;
        // Repeating the shape if necessary
        if (obj11.repeating && obj11.repeat) {
            const repeat11 = obj11.repeat;
            let numRepeats11;
            if (repeat11.isPercentage) numRepeats11 = Math.ceil(repeat11.value / repeat11.maxValue / (repeat11.increment / 100));
            else numRepeats11 = Math.ceil(repeat11.value / repeat11.increment);
            let n11 = 0;
            let rows11 = 0;
            const maxRows11 = repeat11.maxRows ?? Infinity;
            let xOffset11 = 0;
            let yOffset11 = 0;
            const paddingX11 = repeat11.paddingX ?? 0;
            const paddingY11 = repeat11.paddingY ?? 0;
            while(numRepeats11 > 0){
                const [width11, height11] = _drawShape(graphics11, shape11, xOffset11, yOffset11);
                xOffset11 += width11 + paddingX11;
                numRepeats11--;
                n11++;
                if (numRepeats11 != 0 && n11 >= repeat11.perRow) {
                    rows11 += 1;
                    if (rows11 >= maxRows11) break;
                    yOffset11 += height11 + paddingY11;
                    xOffset11 = 0;
                    n11 = 0;
                }
            }
        } else _drawShape(graphics11, shape11);
    }
    // Store original graphics dimensions as these may change when children are added
    graphics11.shapesWidth = Number(graphics11.width);
    graphics11.shapesHeight = Number(graphics11.height);
    return {
        texture: PIXI.Texture.EMPTY,
        shapes: graphics11
    };
}
function drawTorus(graphics11, x11, y11, innerRadius11, outerRadius11, startArc11 = 0, endArc11 = Math.PI * 2) {
    if (Math.abs(endArc11 - startArc11) >= Math.PI * 2) return graphics11.drawCircle(x11, y11, outerRadius11).beginHole().drawCircle(x11, y11, innerRadius11).endHole();
    graphics11.finishPoly();
    graphics11.arc(x11, y11, innerRadius11, endArc11, startArc11, true).arc(x11, y11, outerRadius11, startArc11, endArc11, false).finishPoly();
}
function interpolateColor(minColor11, interpolate11, rString11 = false) {
    if (!interpolate11 || !interpolate11.color2 || !interpolate11.prc) return rString11 ? minColor11 : (0, $1mRWy.string2Hex)(minColor11);
    if (!PIXI.Color) return _interpolateV10(minColor11, interpolate11, rString11);
    const percentage11 = interpolate11.prc;
    minColor11 = new PIXI.Color(minColor11);
    const maxColor11 = new PIXI.Color(interpolate11.color2);
    let minHsv11 = rgb2hsv(minColor11.red, minColor11.green, minColor11.blue);
    let maxHsv11 = rgb2hsv(maxColor11.red, maxColor11.green, maxColor11.blue);
    let deltaHue11 = maxHsv11[0] - minHsv11[0];
    let deltaAngle11 = deltaHue11 + (Math.abs(deltaHue11) > 180 ? deltaHue11 < 0 ? 360 : -360 : 0);
    let targetHue11 = minHsv11[0] + deltaAngle11 * percentage11;
    let targetSaturation11 = (1 - percentage11) * minHsv11[1] + percentage11 * maxHsv11[1];
    let targetValue11 = (1 - percentage11) * minHsv11[2] + percentage11 * maxHsv11[2];
    let result11 = new PIXI.Color({
        h: targetHue11,
        s: targetSaturation11 * 100,
        v: targetValue11 * 100
    });
    return rString11 ? result11.toHex() : result11.toNumber();
}
function _interpolateV10(minColor11, interpolate11, rString11 = false) {
    const percentage11 = interpolate11.prc;
    minColor11 = PIXI.utils.hex2rgb((0, $1mRWy.string2Hex)(minColor11));
    const maxColor11 = PIXI.utils.hex2rgb((0, $1mRWy.string2Hex)(interpolate11.color2));
    let minHsv11 = rgb2hsv(minColor11[0], minColor11[1], minColor11[2]);
    let maxHsv11 = rgb2hsv(maxColor11[0], maxColor11[1], maxColor11[2]);
    let deltaHue11 = maxHsv11[0] - minHsv11[0];
    let deltaAngle11 = deltaHue11 + (Math.abs(deltaHue11) > 180 ? deltaHue11 < 0 ? 360 : -360 : 0);
    let targetHue11 = minHsv11[0] + deltaAngle11 * percentage11;
    let targetSaturation11 = (1 - percentage11) * minHsv11[1] + percentage11 * maxHsv11[1];
    let targetValue11 = (1 - percentage11) * minHsv11[2] + percentage11 * maxHsv11[2];
    let result11 = Color.fromHSV([
        targetHue11 / 360,
        targetSaturation11,
        targetValue11
    ]);
    return rString11 ? result11.toString() : Number(result11);
}
/**
 * Converts a color from RGB to HSV space.
 * Source: https://stackoverflow.com/questions/8022885/rgb-to-hsv-color-in-javascript/54070620#54070620
 */ function rgb2hsv(r11, g11, b11) {
    let v11 = Math.max(r11, g11, b11), c11 = v11 - Math.min(r11, g11, b11);
    let h11 = c11 && (v11 == r11 ? (g11 - b11) / c11 : v11 == g11 ? 2 + (b11 - r11) / c11 : 4 + (r11 - g11) / c11);
    return [
        60 * (h11 < 0 ? h11 + 6 : h11),
        v11 && c11 / v11,
        v11
    ];
}
const CORE_VARIABLES = {
    "@hp": (token11)=>(0, $aEqt1.getTokenHP)(token11)?.[0],
    "@hpMax": (token11)=>(0, $aEqt1.getTokenHP)(token11)?.[1],
    "@gridSize": ()=>canvas.grid?.size,
    "@label": (_11, conf11)=>conf11.label
};
function _evaluateString(str11, token11, conf11) {
    let variables11 = conf11.overlayConfig?.variables;
    const re211 = new RegExp("@\\w+", "gi");
    str11 = str11.replace(re211, function replace11(match11) {
        let name11 = match11.substr(1, match11.length);
        let v11 = variables11?.find((v11)=>v11.name === name11);
        if (v11) return v11.value;
        else if (match11 in CORE_VARIABLES) return CORE_VARIABLES[match11](token11, conf11);
        return match11;
    });
    const re11 = new RegExp("{{.*?}}", "gi");
    str11 = str11.replace(re11, function replace11(match11) {
        const property11 = match11.substring(2, match11.length - 2);
        if (conf11 && property11 === "effect") return conf11.expression;
        if (token11 && property11 === "hp") return (0, $aEqt1.getTokenHP)(token11)?.[0];
        else if (token11 && property11 === "hpMax") return (0, $aEqt1.getTokenHP)(token11)?.[1];
        const val11 = getProperty(token11.document ?? token11, property11);
        return val11 === undefined ? match11 : val11;
    }).replace("\\n", "\n");
    return str11;
}
function _executeString(evalString, token) {
    try {
        const actor = token.actor; // So that actor is easily accessible within eval() scope
        const result = eval(evalString);
        if (getType(result) === "Object") evalString;
        return result;
    } catch (e) {}
    return evalString;
}
function evaluateOverlayExpressions(obj11, token11, conf11) {
    for (const [k11, v11] of Object.entries(obj11))if (![
        "label",
        "interactivity",
        "variables",
        "id",
        "parentID",
        "limitedUsers",
        "filter",
        "limitOnProperty"
    ].includes(k11)) obj11[k11] = _evaluateObjExpressions(v11, token11, conf11);
    return obj11;
}
// Evaluate provided object values substituting in {{path.to.property}} with token properties, and performing eval() on strings
function _evaluateObjExpressions(obj11, token11, conf11) {
    const t11 = getType(obj11);
    if (t11 === "string") {
        const str11 = _evaluateString(obj11, token11, conf11);
        return _executeString(str11, token11);
    } else if (t11 === "Array") for(let i11 = 0; i11 < obj11.length; i11++)obj11[i11] = _evaluateObjExpressions(obj11[i11], token11, conf11);
    else if (t11 === "Object") {
        for (const [k11, v11] of Object.entries(obj11))// Exception for text overlay
        if (k11 === "text" && getType(v11) === "string" && v11) {
            const evalString11 = _evaluateString(v11, token11, conf11);
            const result11 = _executeString(evalString11, token11);
            if (getType(result11) !== "string") obj11[k11] = evalString11;
            else obj11[k11] = result11;
        } else obj11[k11] = _evaluateObjExpressions(v11, token11, conf11);
    }
    return obj11;
}
async function generateTextTexture(token11, conf11) {
    await FONT_LOADING.loading;
    let label11 = conf11.text.text;
    // Repeating the string if necessary
    if (conf11.text.repeating && conf11.text.repeat) {
        let tmp11 = "";
        const repeat11 = conf11.text.repeat;
        let numRepeats11;
        if (repeat11.isPercentage) numRepeats11 = Math.ceil(repeat11.value / repeat11.maxValue / (repeat11.increment / 100));
        else numRepeats11 = Math.ceil(repeat11.value / repeat11.increment);
        let n11 = 0;
        let rows11 = 0;
        let maxRows11 = repeat11.maxRows ?? Infinity;
        while(numRepeats11 > 0){
            tmp11 += label11;
            numRepeats11--;
            n11++;
            if (numRepeats11 != 0 && n11 >= repeat11.perRow) {
                rows11 += 1;
                if (rows11 >= maxRows11) break;
                tmp11 += "\n";
                n11 = 0;
            }
        }
        label11 = tmp11;
    }
    let style11 = PreciseText.getTextStyle({
        ...conf11.text,
        fontFamily: [
            conf11.text.fontFamily,
            "fontAwesome"
        ].join(","),
        fill: interpolateColor(conf11.text.fill, conf11.text.interpolateColor, true)
    });
    const text11 = new PreciseText(label11, style11);
    text11.updateText(false);
    const texture11 = text11.texture;
    const height11 = conf11.text.maxHeight ? Math.min(texture11.height, conf11.text.maxHeight) : null;
    const curve11 = conf11.text.curve;
    if (!height11 && !curve11?.radius && !curve11?.angle) {
        texture11.textLabel = label11;
        return {
            texture: texture11
        };
    }
    const container11 = new PIXI.Container();
    if (curve11?.radius || curve11?.angle) {
        // Curve the text
        const letterSpacing11 = conf11.text.letterSpacing ?? 0;
        const radius11 = curve11.angle ? (texture11.width + letterSpacing11) / (Math.PI * 2) / (curve11.angle / 360) : curve11.radius;
        const maxRopePoints11 = 100;
        const step11 = Math.PI / maxRopePoints11;
        let ropePoints11 = maxRopePoints11 - Math.round(texture11.width / (radius11 * Math.PI) * maxRopePoints11);
        ropePoints11 /= 2;
        const points11 = [];
        for(let i11 = maxRopePoints11 - ropePoints11; i11 > ropePoints11; i11--){
            const x11 = radius11 * Math.cos(step11 * i11);
            const y11 = radius11 * Math.sin(step11 * i11);
            points11.push(new PIXI.Point(x11, curve11.invert ? y11 : -y11));
        }
        const rope11 = new PIXI.SimpleRope(texture11, points11);
        container11.addChild(rope11);
    } else container11.addChild(new PIXI.Sprite(texture11));
    const renderTexture11 = _renderContainer(container11, 2, {
        height: height11
    });
    text11.destroy();
    renderTexture11.textLabel = label11;
    return {
        texture: renderTexture11
    };
}
function _markAllOverlaysForRemoval(token11) {
    for (const child11 of token11.tvaOverlays)if (child11 instanceof (0, $ecMWg.TVAOverlay)) child11.tvaRemove = true;
}
function removeMarkedOverlays(token11) {
    const sprites11 = [];
    for (const child11 of token11.tvaOverlays)if (child11.tvaRemove) child11.parent?.removeChild(child11)?.destroy();
    else sprites11.push(child11);
    token11.tvaOverlays = sprites11;
}
function _findTVAOverlay(id11, token11) {
    for (const child11 of token11.tvaOverlays){
        if (child11.overlayConfig?.id === id11) return child11;
    }
    return null;
}
function _removeAllOverlays(token11) {
    if (token11.tvaOverlays) for (const child11 of token11.tvaOverlays)child11.parent?.removeChild(child11)?.destroy();
    token11.tvaOverlays = null;
}
function broadcastOverlayRedraw(token11) {
    // Need to broadcast to other users to re-draw the overlay
    if (token11) drawOverlays(token11);
    const actorId11 = token11.document?.actorLink ? token11.actor?.id : null;
    const message11 = {
        handlerName: "drawOverlays",
        args: {
            tokenId: token11.id,
            actorId: actorId11
        },
        type: "UPDATE"
    };
    game.socket?.emit("module.token-variants", message11);
}

});
parcelRequire.register("ecMWg", function(module, exports) {

$parcel$export(module.exports, "TVAOverlay", () => TVAOverlay);

var $UVJLm = parcelRequire("UVJLm");

var $aEqt1 = parcelRequire("aEqt1");

var $fLgy1 = parcelRequire("fLgy1");

var $fTuKG = parcelRequire("fTuKG");

var $64r9a = parcelRequire("64r9a");

var $1mRWy = parcelRequire("1mRWy");

var $1uKlC = parcelRequire("1uKlC");
class TVAOverlay extends TokenMesh {
    constructor(pTexture11, token11, config11){
        super(token11);
        if (pTexture11.shapes) pTexture11.shapes = this.addChild(pTexture11.shapes);
        this.pseudoTexture = pTexture11;
        this.texture = pTexture11.texture;
        //this.setTexture(pTexture, { refresh: false });
        this.ready = false;
        this.overlaySort = 0;
        this.overlayConfig = mergeObject((0, $fTuKG.DEFAULT_OVERLAY_CONFIG), config11, {
            inplace: false
        });
        if (pTexture11.html) this.addHTMLOverlay();
        // linkDimensions has been converted to linkDimensionsX and linkDimensionsY
        // Make sure we're using the latest fields
        // 20/07/2023
        if (!("linkDimensionsX" in this.overlayConfig) && this.overlayConfig.linkDimensions) {
            this.overlayConfig.linkDimensionsX = true;
            this.overlayConfig.linkDimensionsY = true;
        }
        this._registerHooks(this.overlayConfig);
        this._tvaPlay().then(()=>this.refresh());
        // Workaround needed for v11 visible property
        Object.defineProperty(this, "visible", {
            get: this._customVisible,
            set: function() {},
            configurable: true
        });
        this.eventMode = "passive";
        this.enableInteractivity(this.overlayConfig);
    }
    enableInteractivity() {
        if (this.mouseInteractionManager && !this.overlayConfig.interactivity?.length) {
            this.removeAllListeners();
            this.mouseInteractionManager = null;
            this.cursor = null;
            this.eventMode = "passive";
            return;
        } else if (this.mouseInteractionManager || !this.overlayConfig.interactivity?.length) return;
        if (!this.overlayConfig.ui) {
            if (canvas.primary.eventMode === "passive") canvas.primary.eventMode = "passive";
        }
        this.eventMode = "static";
        this.cursor = "pointer";
        const token11 = this.object;
        const sprite11 = this;
        const runInteraction11 = function(event11, listener11) {
            sprite11.overlayConfig.interactivity.forEach((i11)=>{
                if (i11.listener === listener11) {
                    event11.preventDefault();
                    event11.stopPropagation();
                    if (i11.script) (0, $1mRWy.tv_executeScript)(i11.script, {
                        token: token11
                    });
                    if (i11.macro) (0, $1mRWy.executeMacro)(i11.macro, token11);
                    if (i11.ceEffect) (0, $1mRWy.toggleCEEffect)(token11, i11.ceEffect);
                    if (i11.tmfxPreset) (0, $1mRWy.toggleTMFXPreset)(token11, i11.tmfxPreset);
                }
            });
        };
        const permissions11 = {
            hoverIn: ()=>true,
            hoverOut: ()=>true,
            clickLeft: ()=>true,
            clickLeft2: ()=>true,
            clickRight: ()=>true,
            clickRight2: ()=>true,
            dragStart: ()=>false
        };
        const callbacks11 = {
            hoverIn: (event11)=>runInteraction11(event11, "hoverIn"),
            hoverOut: (event11)=>runInteraction11(event11, "hoverOut"),
            clickLeft: (event11)=>runInteraction11(event11, "clickLeft"),
            clickLeft2: (event11)=>runInteraction11(event11, "clickLeft2"),
            clickRight: (event11)=>runInteraction11(event11, "clickRight"),
            clickRight2: (event11)=>runInteraction11(event11, "clickRight2"),
            dragLeftStart: null,
            dragLeftMove: null,
            dragLeftDrop: null,
            dragLeftCancel: null,
            dragRightStart: null,
            dragRightMove: null,
            dragRightDrop: null,
            dragRightCancel: null,
            longPress: null
        };
        const options11 = {
            target: null
        };
        // Create the interaction manager
        const mgr11 = new MouseInteractionManager(this, canvas.stage, permissions11, callbacks11, options11);
        this.mouseInteractionManager = mgr11.activate();
    }
    _customVisible() {
        const ov11 = this.overlayConfig;
        if (!this.ready || !(this.object.visible || ov11.alwaysVisible)) return false;
        if (ov11.limitedToOwner && !this.object.owner) return false;
        if (ov11.limitedUsers?.length && !ov11.limitedUsers.includes(game.user.id)) return false;
        if (ov11.limitOnEffect || ov11.limitOnProperty) {
            const speaker11 = ChatMessage.getSpeaker();
            let token11 = canvas.ready ? canvas.tokens.get(speaker11.token) : null;
            if (!token11) return false;
            if (ov11.limitOnEffect) {
                if (!(0, $aEqt1.getTokenEffects)(token11).includes(ov11.limitOnEffect)) return false;
            }
            if (ov11.limitOnProperty) {
                if (!(0, $aEqt1.evaluateComparator)(token11.document, ov11.limitOnProperty)) return false;
            }
        }
        if (ov11.limitOnHover || ov11.limitOnControl || ov11.limitOnHighlight || ov11.limitOnHUD) {
            if (ov11.limitOnHover && canvas.controls.ruler._state === Ruler.STATES.INACTIVE && this.object.hover) return true;
            if (ov11.limitOnControl && this.object.controlled) return true;
            if (ov11.limitOnHighlight && (canvas.tokens.highlightObjects ?? canvas.tokens._highlight)) return true;
            if (ov11.limitOnHUD && this.object.hasActiveHUD) return true;
            return false;
        }
        return true;
    }
    // Overlays have the same sort order as the parent
    get sort() {
        return this.object.document.sort || 0;
    }
    get _lastSortedIndex() {
        return (this.object.mesh._lastSortedIndex || 0) + this.overlaySort;
    }
    get elevation() {
        let elevation11 = this.object.mesh?.data.elevation;
        if (this.overlayConfig.top) elevation11 += 9999;
        else if (this.overlayConfig.bottom) elevation11 -= 9999;
        return elevation11;
    }
    set _lastSortedIndex(val11) {}
    async _tvaPlay() {
        // Ensure playback state for video
        const source11 = foundry.utils.getProperty(this.texture, "baseTexture.resource.source");
        if (source11 && source11.tagName === "VIDEO") {
            // Detach video from others
            const s11 = source11.cloneNode();
            if (this.overlayConfig.playOnce) s11.onended = ()=>{
                this.alpha = 0;
                this.tvaVideoEnded = true;
            };
            await new Promise((resolve11)=>s11.oncanplay = resolve11);
            this.texture = PIXI.Texture.from(s11, {
                resourceOptions: {
                    autoPlay: false
                }
            });
            const options11 = {
                loop: this.overlayConfig.loop && !this.overlayConfig.playOnce,
                volume: 0,
                offset: 0,
                playing: true
            };
            game.video.play(s11, options11);
        }
    }
    addChildAuto(...children11) {
        if (this.pseudoTexture?.shapes) return this.pseudoTexture.shapes.addChild(...children11);
        else return this.addChild(...children11);
    }
    setTexture(pTexture11, { preview: preview11 = false, refresh: refresh11 = true, configuration: configuration11 = null } = {}) {
        // Text preview handling
        if (preview11) {
            this._swapChildren(pTexture11);
            if (this.originalTexture) this._destroyTexture();
            else {
                this.originalTexture = this.pseudoTexture;
                if (this.originalTexture.shapes) this.removeChild(this.originalTexture.shapes);
            }
            this.pseudoTexture = pTexture11;
            this.texture = pTexture11.texture;
            if (pTexture11.shapes) pTexture11.shapes = this.addChild(pTexture11.shapes);
        } else if (this.originalTexture) {
            this._swapChildren(this.originalTexture);
            this._destroyTexture();
            this.pseudoTexture = this.originalTexture;
            this.texture = this.originalTexture.texture;
            if (this.originalTexture.shapes) this.pseudoTexture.shapes = this.addChild(this.originalTexture.shapes);
            delete this.originalTexture;
        } else {
            this._swapChildren(pTexture11);
            this._destroyTexture();
            this.pseudoTexture = pTexture11;
            this.texture = pTexture11.texture;
            if (pTexture11.shapes) this.pseudoTexture.shapes = this.addChild(pTexture11.shapes);
        }
        if (refresh11) this.refresh(configuration11, {
            fullRefresh: !preview11
        });
    }
    refresh(configuration11, { preview: preview11 = false, fullRefresh: fullRefresh11 = true, previewTexture: previewTexture11 = null } = {}) {
        if (!this.overlayConfig || !this.texture) return;
        // Text preview handling
        if (previewTexture11 || this.originalTexture) this.setTexture(previewTexture11, {
            preview: Boolean(previewTexture11),
            refresh: false
        });
        // Register/Unregister hooks that should refresh this overlay
        if (configuration11) this._registerHooks(configuration11);
        const config11 = mergeObject(this.overlayConfig, configuration11 ?? {}, {
            inplace: !preview11
        });
        this.enableInteractivity(config11);
        if (fullRefresh11) {
            const source11 = foundry.utils.getProperty(this.texture, "baseTexture.resource.source");
            if (source11 && source11.tagName === "VIDEO") {
                if (!source11.loop && config11.loop) game.video.play(source11);
                else if (source11.loop && !config11.loop) game.video.stop(source11);
                source11.loop = config11.loop;
            }
        }
        const shapes11 = this.pseudoTexture.shapes;
        // Scale the image using the same logic as the token
        const dimensions11 = shapes11 ?? this.texture;
        if (config11.linkScale && !config11.parentID) {
            const scale11 = this.scale;
            const aspect11 = dimensions11.width / dimensions11.height;
            if (aspect11 >= 1) {
                scale11.x = this.object.w * this.object.document.texture.scaleX / dimensions11.width;
                scale11.y = Number(scale11.x);
            } else {
                scale11.y = this.object.h * this.object.document.texture.scaleY / dimensions11.height;
                scale11.x = Number(scale11.y);
            }
        } else if (config11.linkStageScale) {
            this.scale.x = 1 / canvas.stage.scale.x;
            this.scale.y = 1 / canvas.stage.scale.y;
        } else if (config11.linkDimensionsX || config11.linkDimensionsY) {
            if (config11.linkDimensionsX) this.scale.x = this.object.document.width;
            if (config11.linkDimensionsY) this.scale.y = this.object.document.height;
        } else {
            this.scale.x = config11.width ? config11.width / dimensions11.width : 1;
            this.scale.y = config11.height ? config11.height / dimensions11.height : 1;
        }
        // Adjust scale according to config
        this.scale.x = this.scale.x * config11.scaleX;
        this.scale.y = this.scale.y * config11.scaleY;
        // Check if mirroring should be inherited from the token and if so apply it
        if (config11.linkMirror && !config11.parentID) {
            this.scale.x = Math.abs(this.scale.x) * (this.object.document.texture.scaleX < 0 ? -1 : 1);
            this.scale.y = Math.abs(this.scale.y) * (this.object.document.texture.scaleY < 0 ? -1 : 1);
        }
        if (this.anchor) {
            if (!config11.anchor) this.anchor.set(0.5, 0.5);
            else this.anchor.set(config11.anchor.x, config11.anchor.y);
        }
        let xOff11 = 0;
        let yOff11 = 0;
        if (shapes11) {
            shapes11.position.x = -this.anchor.x * shapes11.width;
            shapes11.position.y = -this.anchor.y * shapes11.height;
            if (config11.animation.relative) {
                this.pivot.set(0, 0);
                shapes11.pivot.set((0.5 - this.anchor.x) * shapes11.width, (0.5 - this.anchor.y) * shapes11.height);
                xOff11 = shapes11.pivot.x * this.scale.x;
                yOff11 = shapes11.pivot.y * this.scale.y;
            }
        } else if (config11.animation.relative) {
            xOff11 = (0.5 - this.anchor.x) * this.width;
            yOff11 = (0.5 - this.anchor.y) * this.height;
            this.pivot.set((0.5 - this.anchor.x) * this.texture.width, (0.5 - this.anchor.y) * this.texture.height);
        }
        // Position
        const pOffsetX11 = config11.pOffsetX || 0;
        const pOffsetY11 = config11.pOffsetY || 0;
        if (config11.parentID) {
            const anchor11 = this.parent.anchor ?? {
                x: 0,
                y: 0
            };
            const pWidth11 = (this.parent.shapesWidth ?? this.parent.width) / this.parent.scale.x;
            const pHeight11 = (this.parent.shapesHeight ?? this.parent.height) / this.parent.scale.y;
            this.position.set(pOffsetX11 + -config11.offsetX * pWidth11 - anchor11.x * pWidth11 + pWidth11 / 2, pOffsetY11 + -config11.offsetY * pHeight11 - anchor11.y * pHeight11 + pHeight11 / 2);
        } else if (config11.animation.relative) this.position.set(this.object.document.x + this.object.w / 2 + pOffsetX11 + -config11.offsetX * this.object.w + xOff11, this.object.document.y + this.object.h / 2 + pOffsetY11 + -config11.offsetY * this.object.h + yOff11);
        else {
            this.position.set(this.object.document.x + this.object.w / 2, this.object.document.y + this.object.h / 2);
            this.pivot.set(-pOffsetX11 / this.scale.x + config11.offsetX * this.object.w / this.scale.x, -pOffsetY11 / this.scale.y + config11.offsetY * this.object.h / this.scale.y);
        }
        // Set alpha but only if playOnce is disabled and the video hasn't
        // finished playing yet. Otherwise we want to keep alpha as 0 to keep the video hidden
        if (!this.tvaVideoEnded) this.alpha = config11.linkOpacity ? this.object.document.alpha : config11.alpha;
        // Angle in degrees
        if (fullRefresh11) {
            if (config11.linkRotation) this.angle = this.object.document.rotation + config11.angle;
            else this.angle = config11.angle;
        } else if (!config11.animation.rotate) {
            if (config11.linkRotation) this.angle = this.object.document.rotation + config11.angle;
        }
        // Apply color tinting
        const tint11 = config11.inheritTint ? this.object.document.texture.tint : (0, $64r9a.interpolateColor)(config11.tint, config11.interpolateColor, true);
        this.tint = tint11 ? Color.from(tint11) : 0xffffff;
        if (shapes11) {
            shapes11.tint = this.tint;
            shapes11.alpha = this.alpha;
        }
        if (fullRefresh11) {
            if (config11.animation.rotate) this.animate(config11);
            else this.stopAnimation();
        }
        // Apply filters
        if (fullRefresh11) this._applyFilters(config11);
        //if (fullRefresh) this.filters = this._getFilters(config);
        if (preview11 && this.children) this.children.forEach((ch11)=>{
            if (ch11 instanceof TVAOverlay) ch11.refresh(null, {
                preview: true
            });
        });
        if (this.htmlOverlay) // this.htmlOverlay.setPosition({
        //   left: this.x + shapes.x,
        //   top: this.y + shapes.y,
        //   width: dimensions.width * this.scale.x,
        //   height: dimensions.height * this.scale.y,
        //   angle: this.angle,
        // });
        this.htmlOverlay.setPosition({
            left: this.x - this.pivot.x * this.scale.x - this.width * this.anchor.x,
            top: this.y - this.pivot.y * this.scale.y - this.height * this.anchor.y,
            width: this.width,
            height: this.height,
            angle: this.angle
        });
        this.ready = true;
    }
    _activateTicker() {
        this._deactivateTicker();
        canvas.app.ticker.add(this.updatePosition, this, PIXI.UPDATE_PRIORITY.HIGH);
    }
    _deactivateTicker() {
        canvas.app.ticker.remove(this.updatePosition, this);
    }
    updatePosition() {
        let coord11 = canvas.canvasCoordinatesFromClient({
            x: window.innerWidth / 2 + this.overlayConfig.offsetX * window.innerWidth,
            y: window.innerHeight / 2 + this.overlayConfig.offsetY * window.innerHeight
        });
        this.position.set(coord11.x, coord11.y);
    }
    async _applyFilters(config11) {
        const filterName11 = config11.filter;
        const FilterClass11 = PIXI.filters[filterName11];
        const options11 = mergeObject((0, $UVJLm.FILTERS)[filterName11]?.defaultValues || {}, config11.filterOptions);
        let filter11;
        if (FilterClass11) {
            if ((0, $UVJLm.FILTERS)[filterName11]?.argType === "args") {
                let args11 = [];
                const controls11 = (0, $UVJLm.FILTERS)[filterName11]?.controls;
                if (controls11) controls11.forEach((c11)=>args11.push(options11[c11.name]));
                filter11 = new FilterClass11(...args11);
            } else if ((0, $UVJLm.FILTERS)[filterName11]?.argType === "options") filter11 = new FilterClass11(options11);
            else filter11 = new FilterClass11();
        } else if (filterName11 === "OutlineOverlayFilter") {
            filter11 = OutlineFilter.create(options11);
            filter11.thickness = options11.trueThickness ?? 1;
            filter11.animate = options11.animate ?? false;
        } else if (filterName11 === "Token Magic FX") {
            this.applyTVAFilters(await constructTMFXFilters(options11.params || [], this));
            return;
        }
        if (filter11) {
            this.applyTVAFilters([
                filter11
            ]);
            this.filters = [
                filter11
            ];
        } else this.removeTVAFilters();
        if (this.overlayConfig.ui && this.overlayConfig.bottom) this.applyReverseMask();
        else this.removeReverseMask();
    }
    applyReverseMask() {
        if (!this.filters?.find((f11)=>f11.tvaReverse)) {
            const filters11 = this.filters || [];
            const reverseMask11 = ReverseMaskFilter.create({
                uMaskSampler: canvas.primary.tokensRenderTexture,
                channel: "a"
            });
            reverseMask11.tvaReverse = true;
            filters11.push(reverseMask11);
            this.filters = filters11;
        }
        if (!this.filters) filters = [];
    }
    removeReverseMask() {
        if (this.filters?.length) this.filters = this.filters.filter((f11)=>!f11.tvaReverse);
    }
    applyTVAFilters(filters11) {
        if (filters11?.length) {
            this.removeTVAFilters();
            this.filters = (this.filters || []).concat(filters11);
        }
    }
    removeTVAFilters() {
        if (this.filters) this.filters = this.filters.filter((f11)=>!f11.tvaFilter);
    }
    async stopAnimation() {
        if (this.animationName) CanvasAnimation.terminateAnimation(this.animationName);
    }
    async animate(config11) {
        if (!this.animationName) this.animationName = this.object.sourceId + "." + randomID(5);
        let newAngle11 = this.angle + (config11.animation.clockwise ? 360 : -360);
        const rotate11 = [
            {
                parent: this,
                attribute: "angle",
                to: newAngle11
            }
        ];
        const completed11 = await CanvasAnimation.animate(rotate11, {
            duration: config11.animation.duration,
            name: this.animationName
        });
        if (completed11) this.animate(config11);
    }
    _registerHooks(configuration11) {
        if (configuration11.linkStageScale) (0, $fLgy1.registerOverlayRefreshHook)(this, "canvasPan");
        else (0, $fLgy1.unregisterOverlayRefreshHooks)(this, "canvasPan");
    }
    _swapChildren(to11) {
        const from11 = this.pseudoTexture;
        if (from11.shapes) {
            this.removeChild(this.pseudoTexture.shapes);
            const children11 = from11.shapes.removeChildren();
            if (to11?.shapes) children11.forEach((c11)=>to11.shapes.addChild(c11)?.refresh());
            else children11.forEach((c11)=>this.addChild(c11)?.refresh());
        } else if (to11?.shapes) {
            const children11 = this.removeChildren();
            children11.forEach((c11)=>to11.shapes.addChild(c11)?.refresh());
        }
    }
    _destroyTexture() {
        if (this.texture.textLabel || this.texture.destroyable) this.texture.destroy(true);
        if (this.pseudoTexture?.shapes) {
            this.removeChild(this.pseudoTexture.shapes);
            this.pseudoTexture.shapes.destroy();
        }
    }
    destroy() {
        this.stopAnimation();
        (0, $fLgy1.unregisterOverlayRefreshHooks)(this);
        if (this.children) {
            for (const ch11 of this.children)if (ch11 instanceof TVAOverlay) ch11.tvaRemove = true;
            (0, $64r9a.removeMarkedOverlays)(this.object);
            if (this.pseudoTexture.shapes) {
                this.pseudoTexture.shapes.children.forEach((c11)=>c11.destroy());
                this.removeChild(this.pseudoTexture.shapes)?.destroy();
            //  this.pseudoTexture.shapes.destroy();
            }
        }
        if (this.texture.textLabel || this.texture.destroyable) return super.destroy(true);
        else if (this.texture?.baseTexture.resource?.source?.tagName === "VIDEO") this.texture.baseTexture.destroy();
        if (this.htmlOverlay) this.htmlOverlay.remove();
        super.destroy();
    }
    // Foundry BUG Fix
    calculateTrimmedVertices() {
        return PIXI.Sprite.prototype.calculateTrimmedVertices.call(this);
    }
    addHTMLOverlay() {
        this.htmlOverlay = new (0, $1uKlC.HTMLOverlay)(this.overlayConfig, this.object);
    }
}
async function constructTMFXFilters(paramsArray, sprite) {
    if (typeof TokenMagic === "undefined") return [];
    try {
        paramsArray = eval(paramsArray);
    } catch (e) {
        return [];
    }
    if (!Array.isArray(paramsArray)) paramsArray = TokenMagic.getPreset(paramsArray);
    if (!(paramsArray instanceof Array && paramsArray.length > 0)) return [];
    let filters = [];
    for (const params of paramsArray){
        if (!params.hasOwnProperty("filterType") || !TMFXFilterTypes.hasOwnProperty(params.filterType)) // one invalid ? all rejected.
        return [];
        if (!params.hasOwnProperty("rank")) params.rank = 5000;
        if (!params.hasOwnProperty("filterId") || params.filterId == null) params.filterId = randomID();
        if (!params.hasOwnProperty("enabled") || !(typeof params.enabled === "boolean")) params.enabled = true;
        params.filterInternalId = randomID();
        const gms = game.users.filter((user11)=>user11.isGM);
        params.filterOwner = gms.length ? gms[0].id : game.data.userId;
        // params.placeableType = placeable._TMFXgetPlaceableType();
        params.updateId = randomID();
        const filterClass = await getTMFXFilter(params.filterType);
        if (filterClass) {
            filterClass.prototype.assignPlaceable = function() {
                this.targetPlaceable = sprite.object;
                this.placeableImg = sprite;
            };
            filterClass.prototype._TMFXsetAnimeFlag = async function() {};
            const filter = new filterClass(params);
            if (filter) {
                // Patch fixes
                filter.placeableImg = sprite;
                filter.targetPlaceable = sprite.object;
                // end of fixes
                filter.tvaFilter = true;
                filters.unshift(filter);
            }
        }
    }
    return filters;
}
async function getTMFXFilter(id11) {
    if (id11 in TMFXFilterTypes) {
        if (id11 in LOADED_TMFXFilters) return LOADED_TMFXFilters[id11];
        else try {
            const className11 = TMFXFilterTypes[id11];
            let fxModule11 = await import(`../../../tokenmagic/fx/filters/${className11}.js`);
            if (fxModule11 && fxModule11[className11]) {
                LOADED_TMFXFilters[id11] = fxModule11[className11];
                return fxModule11[className11];
            }
        } catch (e11) {}
    }
    return null;
}
const LOADED_TMFXFilters = {};
const TMFXFilterTypes = {
    adjustment: "FilterAdjustment",
    distortion: "FilterDistortion",
    oldfilm: "FilterOldFilm",
    glow: "FilterGlow",
    outline: "FilterOutline",
    bevel: "FilterBevel",
    xbloom: "FilterXBloom",
    shadow: "FilterDropShadow",
    twist: "FilterTwist",
    zoomblur: "FilterZoomBlur",
    blur: "FilterBlur",
    bulgepinch: "FilterBulgePinch",
    zapshadow: "FilterRemoveShadow",
    ray: "FilterRays",
    fog: "FilterFog",
    xfog: "FilterXFog",
    electric: "FilterElectric",
    wave: "FilterWaves",
    shockwave: "FilterShockwave",
    fire: "FilterFire",
    fumes: "FilterFumes",
    smoke: "FilterSmoke",
    flood: "FilterFlood",
    images: "FilterMirrorImages",
    field: "FilterForceField",
    xray: "FilterXRays",
    liquid: "FilterLiquid",
    xglow: "FilterGleamingGlow",
    pixel: "FilterPixelate",
    web: "FilterSpiderWeb",
    ripples: "FilterSolarRipples",
    globes: "FilterGlobes",
    transform: "FilterTransform",
    splash: "FilterSplash",
    polymorph: "FilterPolymorph",
    xfire: "FilterXFire",
    sprite: "FilterSprite",
    replaceColor: "FilterReplaceColor",
    ddTint: "FilterDDTint"
};
class OutlineFilter extends OutlineOverlayFilter {
    /** @inheritdoc */ static createFragmentShader() {
        return `
    varying vec2 vTextureCoord;
    varying vec2 vFilterCoord;
    uniform sampler2D uSampler;
    
    uniform vec2 thickness;
    uniform vec4 outlineColor;
    uniform vec4 filterClamp;
    uniform float alphaThreshold;
    uniform float time;
    uniform bool knockout;
    uniform bool wave;
    
    ${this.CONSTANTS}
    ${this.WAVE()}
    
    void main(void) {
        float dist = distance(vFilterCoord, vec2(0.5)) * 2.0;
        vec4 ownColor = texture2D(uSampler, vTextureCoord);
        vec4 wColor = wave ? outlineColor * 
                             wcos(0.0, 1.0, dist * 75.0, 
                                  -time * 0.01 + 3.0 * dot(vec4(1.0), ownColor)) 
                             * 0.33 * (1.0 - dist) : vec4(0.0);
        float texAlpha = smoothstep(alphaThreshold, 1.0, ownColor.a);
        vec4 curColor;
        float maxAlpha = 0.;
        vec2 displaced;
        for ( float angle = 0.0; angle <= TWOPI; angle += ${this.#quality.toFixed(7)} ) {
            displaced.x = vTextureCoord.x + thickness.x * cos(angle);
            displaced.y = vTextureCoord.y + thickness.y * sin(angle);
            curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));
            curColor.a = clamp((curColor.a - 0.6) * 2.5, 0.0, 1.0);
            maxAlpha = max(maxAlpha, curColor.a);
        }
        float resultAlpha = max(maxAlpha, texAlpha);
        vec3 result = (ownColor.rgb + outlineColor.rgb * (1.0 - texAlpha)) * resultAlpha;
        gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);
    }
    `;
    }
    static get #quality() {
        switch(canvas.performance.mode){
            case CONST.CANVAS_PERFORMANCE_MODES.LOW:
                return Math.PI * 2 / 10;
            case CONST.CANVAS_PERFORMANCE_MODES.MED:
                return Math.PI * 2 / 20;
            default:
                return Math.PI * 2 / 30;
        }
    }
}

});
parcelRequire.register("fLgy1", function(module, exports) {

$parcel$export(module.exports, "registerOverlayHooks", () => $b79814d0e4eb37c4$export$dfc93b4a68593ad7);
$parcel$export(module.exports, "registerOverlayRefreshHook", () => $b79814d0e4eb37c4$export$eb523686b30ccac9);
$parcel$export(module.exports, "unregisterOverlayRefreshHooks", () => $b79814d0e4eb37c4$export$83fe15bb1b8a7c6e);

var $b2HDo = parcelRequire("b2HDo");

var $1uKlC = parcelRequire("1uKlC");

var $ecMWg = parcelRequire("ecMWg");

var $64r9a = parcelRequire("64r9a");

var $iJML9 = parcelRequire("iJML9");
const $b79814d0e4eb37c4$var$feature_id = "Overlays";
function $b79814d0e4eb37c4$export$dfc93b4a68593ad7() {
    if (!(0, $b2HDo.FEATURE_CONTROL)[$b79814d0e4eb37c4$var$feature_id]) {
        [
            "refreshToken",
            "destroyToken",
            "updateActor",
            "renderCombatTracker",
            "updateToken",
            "createToken",
            "renderHeadsUpDisplay"
        ].forEach((id)=>(0, $iJML9.unregisterHook)($b79814d0e4eb37c4$var$feature_id, id));
        return;
    }
    (0, $iJML9.registerHook)($b79814d0e4eb37c4$var$feature_id, "createToken", async function(token) {
        if (token.object) (0, $64r9a.drawOverlays)(token.object);
    });
    (0, $iJML9.registerHook)($b79814d0e4eb37c4$var$feature_id, "updateToken", async function(token) {
        if (token.object) (0, $64r9a.drawOverlays)(token.object);
    });
    (0, $iJML9.registerHook)($b79814d0e4eb37c4$var$feature_id, "refreshToken", (token)=>{
        if (token.tvaOverlays) {
            for (const child of token.tvaOverlays)if (child instanceof (0, $ecMWg.TVAOverlay)) child.refresh(null, {
                preview: false,
                fullRefresh: false
            });
        }
    });
    (0, $iJML9.registerHook)($b79814d0e4eb37c4$var$feature_id, "destroyToken", (token)=>{
        if (token.tvaOverlays) for (const child of token.tvaOverlays)child.parent?.removeChild(child)?.destroy();
    });
    (0, $iJML9.registerHook)($b79814d0e4eb37c4$var$feature_id, "updateActor", async function(actor) {
        if (actor.getActiveTokens) actor.getActiveTokens(true).forEach((token)=>{
            (0, $64r9a.drawOverlays)(token);
        });
    });
    (0, $iJML9.registerHook)($b79814d0e4eb37c4$var$feature_id, "renderCombatTracker", function() {
        for (const tkn of canvas.tokens.placeables)(0, $64r9a.drawOverlays)(tkn);
    });
    (0, $iJML9.registerHook)($b79814d0e4eb37c4$var$feature_id, "renderHeadsUpDisplay", ()=>{
        (0, $1uKlC.HTMLOverlay).hudRendered();
    });
}
const $b79814d0e4eb37c4$var$REFRESH_HOOKS = {};
function $b79814d0e4eb37c4$export$eb523686b30ccac9(tvaOverlay, hookName) {
    if (!(hookName in $b79814d0e4eb37c4$var$REFRESH_HOOKS)) {
        (0, $iJML9.registerHook)("TVAOverlayRefresh", hookName, ()=>{
            $b79814d0e4eb37c4$var$REFRESH_HOOKS[hookName]?.forEach((s)=>s.refresh());
        });
        $b79814d0e4eb37c4$var$REFRESH_HOOKS[hookName] = [
            tvaOverlay
        ];
    } else if (!$b79814d0e4eb37c4$var$REFRESH_HOOKS[hookName].find((s)=>s == tvaOverlay)) $b79814d0e4eb37c4$var$REFRESH_HOOKS[hookName].push(tvaOverlay);
}
function $b79814d0e4eb37c4$export$83fe15bb1b8a7c6e(tvaOverlay, hookName = null) {
    const unregister = function(hook) {
        if ($b79814d0e4eb37c4$var$REFRESH_HOOKS[hook]) {
            let index = $b79814d0e4eb37c4$var$REFRESH_HOOKS[hook].findIndex((s)=>s == tvaOverlay);
            if (index > -1) {
                $b79814d0e4eb37c4$var$REFRESH_HOOKS[hook].splice(index, 1);
                if (!$b79814d0e4eb37c4$var$REFRESH_HOOKS[hook].length) {
                    (0, $iJML9.unregisterHook)("TVAOverlayRefresh", hook);
                    delete $b79814d0e4eb37c4$var$REFRESH_HOOKS[hook];
                }
            }
        }
    };
    if (hookName) unregister(hookName);
    else Object.keys($b79814d0e4eb37c4$var$REFRESH_HOOKS).forEach((k)=>unregister(k));
}

});
parcelRequire.register("1uKlC", function(module, exports) {

$parcel$export(module.exports, "HTMLOverlay", () => $116c8b764ae3388d$export$af8ff934ea6cd37c);
class $116c8b764ae3388d$export$af8ff934ea6cd37c {
    static container = null;
    static renderQueue = [];
    static hudReady = false;
    static hudRendered() {
        $116c8b764ae3388d$export$af8ff934ea6cd37c.hudReady = true;
        $116c8b764ae3388d$export$af8ff934ea6cd37c.renderQueue.forEach((ov)=>ov._render());
        $116c8b764ae3388d$export$af8ff934ea6cd37c.renderQueue = [];
    }
    constructor(overlayConfig, token){
        this.overlayConfig = overlayConfig;
        this.token = token;
        if ($116c8b764ae3388d$export$af8ff934ea6cd37c.hudReady) this._render();
        else $116c8b764ae3388d$export$af8ff934ea6cd37c.renderQueue.push(this);
    }
    _render() {
        if (!$116c8b764ae3388d$export$af8ff934ea6cd37c.container) {
            $116c8b764ae3388d$export$af8ff934ea6cd37c.container = $('<div id="tva-html-overlays"></div>');
            $("#hud").append($116c8b764ae3388d$export$af8ff934ea6cd37c.container);
        }
        this.element = $($116c8b764ae3388d$var$renderTemplate(this.overlayConfig, this.getData()));
        $116c8b764ae3388d$export$af8ff934ea6cd37c.container.append(this.element);
        this.setPosition();
    }
    remove() {
        this.element.remove();
    }
    getData(options = {}) {
        const data = this.token.document.toObject();
        return foundry.utils.mergeObject(data, {
            isGM: game.user.isGM
        });
    }
    setPosition({ left: left, top: top, width: width, height: height, scale: scale, angle: angle, origin: origin } = {}) {
        if (!$116c8b764ae3388d$export$af8ff934ea6cd37c.hudReady) return;
        const ratio = canvas.dimensions.size / 100;
        const position = {
            width: width || this.token.document.width * 100,
            height: height || this.token.document.height * 100,
            left: left ?? this.token.document.x,
            top: top ?? this.token.document.y
        };
        if (ratio !== 1) position.transform = `scale(${ratio})`;
        this.element.css(position);
        if (angle != null) this.element.css({
            transform: "rotate(" + angle + "deg)"
        });
        if (origin != null) this.element.css({
            "transform-origin": origin.x + "px " + origin.y + "px"
        });
    }
    /** @override */ activateListeners(html) {}
}
const $116c8b764ae3388d$var$_templateCache = {};
function $116c8b764ae3388d$var$constructTemplate(ovConfig) {
    if (!$116c8b764ae3388d$var$_templateCache.hasOwnProperty(ovConfig.id)) {
        const compiled = Handlebars.compile('<form class="tva-html-overlay"><section class="window-content">' + ovConfig.html.template + "</section></form>");
        Handlebars.registerPartial(ovConfig.id, compiled);
        $116c8b764ae3388d$var$_templateCache[ovConfig.id] = compiled;
    }
    return $116c8b764ae3388d$var$_templateCache[ovConfig.id];
}
function $116c8b764ae3388d$var$renderTemplate(ovConfig, data) {
    const template = $116c8b764ae3388d$var$constructTemplate(ovConfig);
    return template(data || {}, {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    });
}

});

parcelRequire.register("iJML9", function(module, exports) {

$parcel$export(module.exports, "REGISTERED_HOOKS", () => $da42409838d2627d$export$886510d4c7ede60a);
$parcel$export(module.exports, "registerHook", () => $da42409838d2627d$export$d94509b1766d8915);
$parcel$export(module.exports, "unregisterHook", () => $da42409838d2627d$export$edf411798a018b13);
$parcel$export(module.exports, "registerAllHooks", () => $da42409838d2627d$export$bcab441347d0cde);

var $ffqs5 = parcelRequire("ffqs5");

var $jGCgD = parcelRequire("jGCgD");

var $fLgy1 = parcelRequire("fLgy1");

var $aEqt1 = parcelRequire("aEqt1");

var $hWwS1 = parcelRequire("hWwS1");

var $8fgfk = parcelRequire("8fgfk");

var $kVAPI = parcelRequire("kVAPI");

var $3m94m = parcelRequire("3m94m");

var $b2HDo = parcelRequire("b2HDo");
const $da42409838d2627d$export$886510d4c7ede60a = {};
function $da42409838d2627d$export$d94509b1766d8915(feature_id, name, fn, { once: once = false } = {}) {
    if (!(feature_id in $da42409838d2627d$export$886510d4c7ede60a)) $da42409838d2627d$export$886510d4c7ede60a[feature_id] = {};
    if (name in $da42409838d2627d$export$886510d4c7ede60a[feature_id]) return;
    if ((0, $b2HDo.TVA_CONFIG).debug) console.info(`TVA | Registering Hook`, {
        feature_id: feature_id,
        name: name,
        fn: fn,
        once: once
    });
    const num = Hooks.on(name, fn, {
        once: once
    });
    $da42409838d2627d$export$886510d4c7ede60a[feature_id][name] = num;
}
function $da42409838d2627d$export$edf411798a018b13(feature_id, name) {
    if (feature_id in $da42409838d2627d$export$886510d4c7ede60a && name in $da42409838d2627d$export$886510d4c7ede60a[feature_id]) {
        if ((0, $b2HDo.TVA_CONFIG).debug) console.info(`TVA | Un-Registering Hook`, {
            feature_id: feature_id,
            name: name,
            id: $da42409838d2627d$export$886510d4c7ede60a[feature_id][name]
        });
        Hooks.off(name, $da42409838d2627d$export$886510d4c7ede60a[feature_id][name]);
        delete $da42409838d2627d$export$886510d4c7ede60a[feature_id][name];
    }
}
function $da42409838d2627d$export$bcab441347d0cde() {
    // Hide effect icons
    (0, $ffqs5.registerEffectIconHooks)();
    // Display overlays
    (0, $fLgy1.registerOverlayHooks)();
    // Insert Art Select buttons and contextmenu listeners
    (0, $jGCgD.registerArtSelectButtonHooks)();
    // Effect Mapping related listening for state changes and applying configurations
    (0, $aEqt1.registerEffectMappingHooks)();
    // Display HUD buttons for Tokens and Tiles
    (0, $hWwS1.registerHUDHooks)();
    // Default Wildcard image controls
    (0, $kVAPI.registerWildcardHooks)();
    // User to Image mappings for Tile and Tokens
    (0, $8fgfk.registerUserMappingHooks)();
    // Handle pop-ups and randomization on token/actor create
    (0, $3m94m.registerPopRandomizeHooks)();
}

});
parcelRequire.register("ffqs5", function(module, exports) {

$parcel$export(module.exports, "registerEffectIconHooks", () => $b19cc68853b71653$export$2d8503e635b61305);

var $b2HDo = parcelRequire("b2HDo");

var $iJML9 = parcelRequire("iJML9");
const $b19cc68853b71653$var$feature_id = "EffectIcons";
function $b19cc68853b71653$export$2d8503e635b61305() {
    // OnHover settings specific hooks
    if ((0, $b2HDo.FEATURE_CONTROL)[$b19cc68853b71653$var$feature_id] && (0, $b2HDo.TVA_CONFIG).displayEffectIconsOnHover) (0, $iJML9.registerHook)($b19cc68853b71653$var$feature_id, "hoverToken", (token, hoverIn)=>{
        if (token.effects) token.effects.visible = hoverIn;
    });
    else (0, $iJML9.unregisterHook)($b19cc68853b71653$var$feature_id, "hoverToken");
    if ((0, $b2HDo.FEATURE_CONTROL)[$b19cc68853b71653$var$feature_id] && (0, $b2HDo.TVA_CONFIG).displayEffectIconsOnHover) (0, $iJML9.registerHook)($b19cc68853b71653$var$feature_id, "highlightObjects", (active)=>{
        if (canvas.tokens.active) {
            for (const tkn of canvas.tokens.placeables)if (tkn.effects) tkn.effects.visible = active || tkn.hover;
        }
    });
    else (0, $iJML9.unregisterHook)($b19cc68853b71653$var$feature_id, "highlightObjects");
}

});

parcelRequire.register("jGCgD", function(module, exports) {

$parcel$export(module.exports, "registerArtSelectButtonHooks", () => $e54f9fa29a3b441c$export$802e6d785977eba8);

var $5JxHT = parcelRequire("5JxHT");

var $hAn2A = parcelRequire("hAn2A");

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");

var $iJML9 = parcelRequire("iJML9");
const $e54f9fa29a3b441c$var$feature_id = "ArtSelect";
function $e54f9fa29a3b441c$export$802e6d785977eba8() {
    // Insert right-click listeners to open up ArtSelect forms from various contexts
    if ((0, $b2HDo.TVA_CONFIG).permissions.portrait_right_click[game.user.role]) {
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderActorSheet", $e54f9fa29a3b441c$var$_modActorSheet);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderItemSheet", $e54f9fa29a3b441c$var$_modItemSheet);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderItemActionSheet", $e54f9fa29a3b441c$var$_modItemSheet);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderJournalSheet", $e54f9fa29a3b441c$var$_modJournalSheet);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderRollTableConfig", $e54f9fa29a3b441c$var$_modRollTableSheet);
    } else [
        "renderActorSheet",
        "renderItemSheet",
        "renderItemActionSheet",
        "renderJournalSheet",
        "renderRollTableConfig"
    ].forEach((name)=>(0, $iJML9.unregisterHook)($e54f9fa29a3b441c$var$feature_id, name));
    // Insert buttons
    if ((0, $b2HDo.TVA_CONFIG).permissions.image_path_button[game.user.role]) {
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderTileConfig", $e54f9fa29a3b441c$var$_modTileConfig);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderMeasuredTemplateConfig", $e54f9fa29a3b441c$var$_modTemplateConfig);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderTokenConfig", $e54f9fa29a3b441c$var$_modTokenConfig);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderDrawingConfig", $e54f9fa29a3b441c$var$_modDrawingConfig);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderNoteConfig", $e54f9fa29a3b441c$var$_modNoteConfig);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderSceneConfig", $e54f9fa29a3b441c$var$_modSceneConfig);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderMacroConfig", $e54f9fa29a3b441c$var$_modMacroConfig);
        (0, $iJML9.registerHook)($e54f9fa29a3b441c$var$feature_id, "renderActiveEffectConfig", $e54f9fa29a3b441c$var$_modActiveEffectConfig);
    } else [
        "renderTileConfig",
        "renderMeasuredTemplateConfig",
        "renderTokenConfig",
        "renderDrawingConfig",
        "renderNoteConfig",
        "renderSceneConfig",
        `renderActiveEffectConfig`
    ].forEach((name)=>(0, $iJML9.unregisterHook)($e54f9fa29a3b441c$var$feature_id, name));
}
function $e54f9fa29a3b441c$var$_modTokenConfig(config, html) {
    (0, $5JxHT.insertArtSelectButton)(html, "texture.src", {
        search: config.object.name,
        searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN
    });
}
function $e54f9fa29a3b441c$var$_modTemplateConfig(config, html) {
    (0, $5JxHT.insertArtSelectButton)(html, "texture", {
        search: "Template",
        searchType: (0, $1mRWy.SEARCH_TYPE).TILE
    });
}
function $e54f9fa29a3b441c$var$_modDrawingConfig(config, html) {
    (0, $5JxHT.insertArtSelectButton)(html, "texture", {
        search: "Drawing",
        searchType: (0, $b2HDo.TVA_CONFIG).customImageCategories.includes("Drawing") ? "Drawing" : (0, $1mRWy.SEARCH_TYPE).TILE
    });
}
function $e54f9fa29a3b441c$var$_modNoteConfig(config, html) {
    (0, $5JxHT.insertArtSelectButton)(html, "icon.custom", {
        search: "Note",
        searchType: (0, $b2HDo.TVA_CONFIG).customImageCategories.includes("Note") ? "Note" : (0, $1mRWy.SEARCH_TYPE).ITEM
    });
}
function $e54f9fa29a3b441c$var$_modSceneConfig(config, html) {
    (0, $5JxHT.insertArtSelectButton)(html, "background.src", {
        search: config.object.name,
        searchType: (0, $b2HDo.TVA_CONFIG).customImageCategories.includes("Scene") ? "Scene" : (0, $1mRWy.SEARCH_TYPE).TILE
    });
    (0, $5JxHT.insertArtSelectButton)(html, "foreground", {
        search: config.object.name,
        searchType: (0, $b2HDo.TVA_CONFIG).customImageCategories.includes("Scene") ? "Scene" : (0, $1mRWy.SEARCH_TYPE).TILE
    });
    (0, $5JxHT.insertArtSelectButton)(html, "fogOverlay", {
        search: config.object.name,
        searchType: (0, $b2HDo.TVA_CONFIG).customImageCategories.includes("Fog") ? "Fog" : (0, $1mRWy.SEARCH_TYPE).TILE
    });
}
function $e54f9fa29a3b441c$var$_modTileConfig(tileConfig, html) {
    (0, $5JxHT.insertArtSelectButton)(html, "texture.src", {
        search: tileConfig.object.getFlag("token-variants", "tileName") || "Tile",
        searchType: (0, $1mRWy.SEARCH_TYPE).TILE
    });
}
function $e54f9fa29a3b441c$var$_modActiveEffectConfig(effectConfig, html) {
    const inserted = (0, $5JxHT.insertArtSelectButton)(html, "icon", {
        search: effectConfig.object.name || "Active Effect",
        searchType: (0, $b2HDo.TVA_CONFIG).customImageCategories.includes("Active Effect") ? "Active Effect" : (0, $1mRWy.SEARCH_TYPE).ITEM
    });
    if (!inserted) {
        const img = $(html).find(".effect-icon");
        img.on("contextmenu", ()=>{
            (0, $hAn2A.showArtSelect)(effectConfig.object?.name ?? "Active Effect", {
                searchType: (0, $1mRWy.SEARCH_TYPE).ITEM,
                callback: (imgSrc)=>img.attr("src", imgSrc)
            });
        });
    }
}
function $e54f9fa29a3b441c$var$_modItemSheet(itemSheet, html, options) {
    $(html).find('img.profile, .profile-img, [data-edit="img"]').on("contextmenu", ()=>{
        const item = itemSheet.object;
        if (!item) return;
        (0, $hAn2A.showArtSelect)(item.name, {
            searchType: (0, $1mRWy.SEARCH_TYPE).ITEM,
            callback: (imgSrc)=>item.update({
                    img: imgSrc
                })
        });
    });
}
function $e54f9fa29a3b441c$var$_modMacroConfig(macroConfig, html, options) {
    const img = $(html).find(".sheet-header > img");
    img.on("contextmenu", ()=>{
        (0, $hAn2A.showArtSelect)(macroConfig.object?.name ?? "Macro", {
            searchType: (0, $1mRWy.SEARCH_TYPE).MACRO,
            callback: (imgSrc)=>img.attr("src", imgSrc)
        });
    });
}
function $e54f9fa29a3b441c$var$_modJournalSheet(journalSheet, html, options) {
    $(html).find(".header-button.entry-image").on("contextmenu", ()=>{
        const journal = journalSheet.object;
        if (!journal) return;
        (0, $hAn2A.showArtSelect)(journal.name, {
            searchType: (0, $1mRWy.SEARCH_TYPE).JOURNAL,
            callback: (imgSrc)=>journal.update({
                    img: imgSrc
                })
        });
    });
}
function $e54f9fa29a3b441c$var$_modRollTableSheet(sheet, html) {
    $(html).find(".result-image").on("contextmenu", (event)=>{
        const table = sheet.object;
        if (!table) return;
        const img = $(event.target).closest(".result-image").find("img");
        (0, $hAn2A.showArtSelect)(table.name, {
            searchType: (0, $b2HDo.TVA_CONFIG).customImageCategories.includes("RollTable") ? "RollTable" : (0, $1mRWy.SEARCH_TYPE).ITEM,
            callback: (imgSrc)=>{
                img.attr("src", imgSrc);
                sheet._onSubmit(event);
            }
        });
    });
}
/**
 * Adds right-click listener to Actor Sheet profile image to open up
 * the 'Art Select' screen.
 */ function $e54f9fa29a3b441c$var$_modActorSheet(actorSheet, html, options) {
    if (options.editable && (0, $b2HDo.TVA_CONFIG).permissions.portrait_right_click[game.user.role]) {
        let profile = null;
        let profileQueries = {
            all: [
                ".profile",
                ".profile-img",
                ".profile-image"
            ],
            pf2e: [
                ".player-image",
                ".actor-icon",
                ".sheet-header img",
                ".actor-image"
            ]
        };
        for (let query of profileQueries.all){
            profile = html[0].querySelector(query);
            if (profile) break;
        }
        if (!profile && game.system.id in profileQueries) for (let query of profileQueries[game.system.id]){
            profile = html[0].querySelector(query);
            if (profile) break;
        }
        if (!profile) {
            console.warn("TVA |", game.i18n.localize("token-variants.notifications.warn.profile-image-not-found"));
            return;
        }
        profile.addEventListener("contextmenu", function(ev) {
            (0, $hAn2A.showArtSelect)(actorSheet.object.name, {
                callback: (imgSrc, name)=>(0, $1mRWy.updateActorImage)(actorSheet.object, imgSrc),
                searchType: (0, $1mRWy.SEARCH_TYPE).PORTRAIT,
                object: actorSheet.object
            });
        }, false);
    }
}

});

parcelRequire.register("hWwS1", function(module, exports) {

$parcel$export(module.exports, "registerHUDHooks", () => $d10159cb4ad0cbc7$export$c5e0f603443ce4af);

var $eqe26 = parcelRequire("eqe26");

var $k05qb = parcelRequire("k05qb");

var $b2HDo = parcelRequire("b2HDo");

var $iJML9 = parcelRequire("iJML9");
const $d10159cb4ad0cbc7$var$feature_id = "HUD";
function $d10159cb4ad0cbc7$export$c5e0f603443ce4af() {
    if ((0, $b2HDo.FEATURE_CONTROL)[$d10159cb4ad0cbc7$var$feature_id] && (0, $b2HDo.TVA_CONFIG).tilesEnabled) (0, $iJML9.registerHook)($d10159cb4ad0cbc7$var$feature_id, "renderTileHUD", (0, $eqe26.renderTileHUD));
    else (0, $iJML9.unregisterHook)($d10159cb4ad0cbc7$var$feature_id, "renderTileHUD");
    if ((0, $b2HDo.FEATURE_CONTROL)[$d10159cb4ad0cbc7$var$feature_id] && ((0, $b2HDo.TVA_CONFIG).permissions.hudFullAccess[game.user.role] || (0, $b2HDo.TVA_CONFIG).permissions.hud[game.user.role])) (0, $iJML9.registerHook)($d10159cb4ad0cbc7$var$feature_id, "renderTokenHUD", (0, $k05qb.renderTokenHUD));
    else (0, $iJML9.unregisterHook)($d10159cb4ad0cbc7$var$feature_id, "renderTokenHUD");
}

});
parcelRequire.register("eqe26", function(module, exports) {

$parcel$export(module.exports, "renderTileHUD", () => $a7fe610aa655d973$export$1ae1322ef97d28bb);

var $1mRWy = parcelRequire("1mRWy");

var $b2HDo = parcelRequire("b2HDo");

var $7ymXi = parcelRequire("7ymXi");

var $g3wZB = parcelRequire("g3wZB");

var $i3Lk1 = parcelRequire("i3Lk1");
async function $a7fe610aa655d973$export$1ae1322ef97d28bb(hud, html, tileData, searchText = "", fp_files = null) {
    const tile = hud.object;
    const hudSettings = (0, $b2HDo.TVA_CONFIG).hud;
    if (!hudSettings.enableSideMenu || !(0, $b2HDo.TVA_CONFIG).tilesEnabled) return;
    const button = $(`
  <div class="control-icon" data-action="token-variants-side-selector">
    <img
      id="token-variants-side-button"
      src="modules/token-variants/img/token-images.svg"
      width="36"
      height="36"
      title="${game.i18n.localize("token-variants.windows.art-select.select-variant")}"
    />
  </div>
`);
    html.find("div.right").last().append(button);
    html.find("div.right").click($a7fe610aa655d973$var$_deactivateTokenVariantsSideSelector);
    button.click((event)=>$a7fe610aa655d973$var$_onButtonClick(event, tile));
    button.contextmenu((event)=>$a7fe610aa655d973$var$_onButtonRightClick(event, tile));
}
async function $a7fe610aa655d973$var$_onButtonClick(event, tile) {
    if ((0, $1mRWy.keyPressed)("config")) {
        $a7fe610aa655d973$var$setNameDialog(tile);
        return;
    }
    const button = $(event.target).closest(".control-icon");
    // De-activate 'Status Effects'
    button.closest("div.right").find("div.control-icon.effects").removeClass("active");
    button.closest("div.right").find(".status-effects").removeClass("active");
    // Remove contextmenu
    button.find(".contextmenu").remove();
    // Toggle variants side menu
    button.toggleClass("active");
    let variantsWrap = button.find(".token-variants-wrap");
    if (button.hasClass("active")) {
        if (!variantsWrap.length) {
            variantsWrap = await $a7fe610aa655d973$var$renderSideSelect(tile);
            if (variantsWrap) button.find("img").after(variantsWrap);
            else return;
        }
        variantsWrap.addClass("active");
    } else variantsWrap.removeClass("active");
}
function $a7fe610aa655d973$var$_onButtonRightClick(event, tile) {
    // Display side menu if button is not active yet
    const button = $(event.target).closest(".control-icon");
    if (!button.hasClass("active")) // button.trigger('click');
    button.addClass("active");
    if (button.find(".contextmenu").length) {
        // Contextmenu already displayed. Remove and activate images
        button.find(".contextmenu").remove();
        button.removeClass("active").trigger("click");
    //button.find('.token-variants-wrap.images').addClass('active');
    } else {
        // Contextmenu is not displayed. Hide images, create it and add it
        button.find(".token-variants-wrap.images").removeClass("active");
        const contextMenu = $(`
    <div class="token-variants-wrap contextmenu active">
      <div class="token-variants-context-menu active">
        <input class="token-variants-side-search" type="text" />
        <button class="flags" type="button"><i class="fab fa-font-awesome-flag"></i><label>Flags</label></button>
        <button class="file-picker" type="button"><i class="fas fa-file-import fa-fw"></i><label>Browse Folders</label></button>
      </div>
    </div>
      `);
        button.append(contextMenu);
        // Register contextmenu listeners
        contextMenu.find(".token-variants-side-search").on("keydown", (event)=>$a7fe610aa655d973$var$_onImageSearchKeyUp(event, tile)).on("click", (event)=>{
            event.preventDefault();
            event.stopPropagation();
        });
        contextMenu.find(".flags").click((event)=>{
            event.preventDefault();
            event.stopPropagation();
            new (0, $7ymXi.default)(tile).render(true);
        });
        contextMenu.find(".file-picker").click(async (event)=>{
            event.preventDefault();
            event.stopPropagation();
            new FilePicker({
                type: "folder",
                callback: async (path, fp)=>{
                    const content = await FilePicker.browse(fp.activeSource, fp.result.target);
                    let files = content.files.filter((f)=>(0, $1mRWy.isImage)(f) || (0, $1mRWy.isVideo)(f));
                    if (files.length) {
                        button.find(".token-variants-wrap").remove();
                        const sideSelect = await $a7fe610aa655d973$var$renderSideSelect(tile, null, files);
                        if (sideSelect) {
                            sideSelect.addClass("active");
                            button.append(sideSelect);
                        }
                    }
                }
            }).render(true);
        });
    }
}
function $a7fe610aa655d973$var$_deactivateTokenVariantsSideSelector(event) {
    const controlIcon = $(event.target).closest(".control-icon");
    const dataAction = controlIcon.attr("data-action");
    switch(dataAction){
        case "effects":
            break; // Effects button
        case "thwildcard-selector":
            break; // Token HUD Wildcard module button
        default:
            return;
    }
    $(event.target).closest("div.right").find('.control-icon[data-action="token-variants-side-selector"]').removeClass("active");
    $(event.target).closest("div.right").find(".token-variants-wrap").removeClass("active");
}
async function $a7fe610aa655d973$var$renderSideSelect(tile, searchText = null, fp_files = null) {
    const hudSettings = (0, $b2HDo.TVA_CONFIG).hud;
    const worldHudSettings = (0, $b2HDo.TVA_CONFIG).worldHud;
    const FULL_ACCESS = (0, $b2HDo.TVA_CONFIG).permissions.hudFullAccess[game.user.role];
    let images = [];
    let variants = [];
    let imageDuplicates = new Set();
    const pushImage = (img)=>{
        if (imageDuplicates.has(img.path)) {
            if (!images.find((obj)=>obj.path === img.path && obj.name === img.name)) images.push(img);
        } else {
            images.push(img);
            imageDuplicates.add(img.path);
        }
    };
    if (!fp_files) {
        if (searchText !== null && !searchText) return;
        if (!searchText) {
            variants = tile.document.getFlag("token-variants", "variants") || [];
            variants.forEach((variant)=>{
                for (const name of variant.names)pushImage({
                    path: variant.imgSrc,
                    name: name
                });
            });
            // Parse directory flag and include the images
            const directoryFlag = tile.document.getFlag("token-variants", "directory");
            if (directoryFlag) {
                let dirFlagImages;
                try {
                    let path = directoryFlag.path;
                    let source = directoryFlag.source;
                    let bucket = "";
                    if (source.startsWith("s3:")) {
                        bucket = source.substring(3, source.length);
                        source = "s3";
                    }
                    const content = await FilePicker.browse(source, path, {
                        type: "imagevideo",
                        bucket: bucket
                    });
                    dirFlagImages = content.files;
                } catch (err) {
                    dirFlagImages = [];
                }
                dirFlagImages.forEach((f)=>{
                    if ((0, $1mRWy.isImage)(f) || (0, $1mRWy.isVideo)(f)) pushImage({
                        path: f,
                        name: (0, $1mRWy.getFileName)(f)
                    });
                });
            }
        }
        // Perform the search if needed
        const search = searchText ?? tile.document.getFlag("token-variants", "tileName");
        const noSearch = !search || !searchText && worldHudSettings.displayOnlySharedImages;
        let artSearch = noSearch ? null : await (0, $g3wZB.doImageSearch)(search, {
            searchType: (0, $1mRWy.SEARCH_TYPE).TILE,
            searchOptions: {
                keywordSearch: worldHudSettings.includeKeywords
            }
        });
        if (artSearch) artSearch.forEach((results)=>{
            images.push(...results);
        });
    } else images = fp_files.map((f)=>{
        return {
            path: f,
            name: (0, $1mRWy.getFileName)(f)
        };
    });
    // Retrieving the possibly custom name attached as a flag to the token
    let tileImageName = tile.document.getFlag("token-variants", "name");
    if (!tileImageName) tileImageName = (0, $1mRWy.getFileName)(tile.document.texture.src);
    let imagesParsed = [];
    for (const imageObj of images){
        const img = (0, $1mRWy.isImage)(imageObj.path);
        const vid = (0, $1mRWy.isVideo)(imageObj.path);
        let shared = false;
        if (game.user.isGM) variants.forEach((variant)=>{
            if (variant.imgSrc === imageObj.path && variant.names.includes(imageObj.name)) shared = true;
        });
        const userMappings = tile.document.getFlag("token-variants", "userMappings") || {};
        const [title, style] = $a7fe610aa655d973$var$genTitleAndStyle(userMappings, imageObj.path, imageObj.name);
        imagesParsed.push({
            route: imageObj.path,
            name: imageObj.name,
            used: imageObj.path === tile.document.texture.src && imageObj.name === tileImageName,
            img: img,
            vid: vid,
            unknownType: !img && !vid,
            shared: shared,
            hasConfig: false,
            title: title,
            style: game.user.isGM && style ? "box-shadow: " + style + ";" : null
        });
    }
    //
    // Render
    //
    const imageDisplay = hudSettings.displayAsImage;
    const imageOpacity = hudSettings.imageOpacity / 100;
    const sideSelect = $(await renderTemplate("modules/token-variants/templates/sideSelect.html", {
        imagesParsed: imagesParsed,
        imageDisplay: imageDisplay,
        imageOpacity: imageOpacity,
        autoplay: !(0, $b2HDo.TVA_CONFIG).playVideoOnHover
    }));
    // Activate listeners
    sideSelect.find("video").hover(function() {
        if ((0, $b2HDo.TVA_CONFIG).playVideoOnHover) {
            this.play();
            $(this).siblings(".fa-play").hide();
        }
    }, function() {
        if ((0, $b2HDo.TVA_CONFIG).pauseVideoOnHoverOut) {
            this.pause();
            this.currentTime = 0;
            $(this).siblings(".fa-play").show();
        }
    });
    sideSelect.find(".token-variants-button-select").click((event)=>$a7fe610aa655d973$var$_onImageClick(event, tile));
    if (FULL_ACCESS) sideSelect.find(".token-variants-button-select").on("contextmenu", (event)=>$a7fe610aa655d973$var$_onImageRightClick(event, tile));
    return sideSelect;
}
async function $a7fe610aa655d973$var$_onImageClick(event, tile) {
    event.preventDefault();
    event.stopPropagation();
    if (!tile) return;
    const imgButton = $(event.target).closest(".token-variants-button-select");
    const imgSrc = imgButton.attr("data-name");
    const name = imgButton.attr("data-filename");
    if (imgSrc) {
        canvas.tiles.hud.clear();
        await tile.document.update({
            img: imgSrc
        });
        try {
            if ((0, $1mRWy.getFileName)(imgSrc) !== name) await tile.document.setFlag("token-variants", "name", name);
        } catch (e) {}
    }
}
async function $a7fe610aa655d973$var$_onImageRightClick(event, tile) {
    event.preventDefault();
    event.stopPropagation();
    if (!tile) return;
    const imgButton = $(event.target).closest(".token-variants-button-select");
    const imgSrc = imgButton.attr("data-name");
    const name = imgButton.attr("data-filename");
    if (!imgSrc || !name) return;
    if ((0, $1mRWy.keyPressed)("config") && game.user.isGM) {
        const regenStyle = (tile, img)=>{
            const mappings = tile.document.getFlag("token-variants", "userMappings") || {};
            const name = imgButton.attr("data-filename");
            const [title, style] = $a7fe610aa655d973$var$genTitleAndStyle(mappings, img, name);
            imgButton.closest(".token-variants-wrap").find(`.token-variants-button-select[data-name='${img}']`).css("box-shadow", style).prop("title", title);
        };
        new (0, $i3Lk1.default)(tile, imgSrc, regenStyle).render(true);
        return;
    }
    let variants = tile.document.getFlag("token-variants", "variants") || [];
    // Remove selected variant if present in the flag, add otherwise
    let del = false;
    let updated = false;
    for (let variant of variants)if (variant.imgSrc === imgSrc) {
        let fNames = variant.names.filter((name)=>name !== name);
        if (fNames.length === 0) del = true;
        else if (fNames.length === variant.names.length) fNames.push(name);
        variant.names = fNames;
        updated = true;
        break;
    }
    if (del) variants = variants.filter((variant)=>variant.imgSrc !== imgSrc);
    else if (!updated) variants.push({
        imgSrc: imgSrc,
        names: [
            name
        ]
    });
    // Set shared variants as a flag
    tile.document.unsetFlag("token-variants", "variants");
    if (variants.length > 0) tile.document.setFlag("token-variants", "variants", variants);
    imgButton.find(".fa-share").toggleClass("active"); // Display green arrow
}
async function $a7fe610aa655d973$var$_onImageSearchKeyUp(event, tile) {
    if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        if (event.target.value.length >= 3) {
            const button = $(event.target).closest(".control-icon");
            button.find(".token-variants-wrap").remove();
            const sideSelect = await $a7fe610aa655d973$var$renderSideSelect(tile, event.target.value);
            if (sideSelect) {
                sideSelect.addClass("active");
                button.append(sideSelect);
            }
        }
        return false;
    }
}
function $a7fe610aa655d973$var$genTitleAndStyle(mappings, imgSrc, name) {
    let title = (0, $b2HDo.TVA_CONFIG).worldHud.showFullPath ? imgSrc : name;
    let style = "";
    let offset = 2;
    for (const [userId, img] of Object.entries(mappings))if (img === imgSrc) {
        const user = game.users.get(userId);
        if (!user) continue;
        if (style.length === 0) style = `inset 0 0 0 ${offset}px ${user.color}`;
        else style += `, inset 0 0 0 ${offset}px ${user.color}`;
        offset += 2;
        title += `\nDisplayed to: ${user.name}`;
    }
    return [
        title,
        style
    ];
}
function $a7fe610aa655d973$var$setNameDialog(tile) {
    const tileName = tile.document.getFlag("token-variants", "tileName") || tile.id;
    new Dialog({
        title: `Assign a name to the Tile (3+ chars)`,
        content: `<table style="width:100%"><tr><th style="width:50%"><label>Tile Name</label></th><td style="width:50%"><input type="text" name="input" value="${tileName}"/></td></tr></table>`,
        buttons: {
            Ok: {
                label: `Save`,
                callback: (html)=>{
                    const name = html.find("input").val();
                    if (name) {
                        canvas.tiles.hud.clear();
                        tile.document.setFlag("token-variants", "tileName", name);
                    }
                }
            }
        }
    }).render(true);
}

});
parcelRequire.register("7ymXi", function(module, exports) {

$parcel$export(module.exports, "default", () => $57fd83dd264eb5b9$export$2e2bcd8739ae039);
class $57fd83dd264eb5b9$export$2e2bcd8739ae039 extends FormApplication {
    constructor(obj){
        super({}, {});
        if (obj instanceof Tile) {
            this.objectToFlag = obj.document;
            this.isTile = true;
        } else this.objectToFlag = game.actors.get(obj.document.actorId) || obj.document;
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-token-flags",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/flagsConfig.html",
            resizable: true,
            minimizable: false,
            title: "Flags",
            width: 500
        });
    }
    async getData(options) {
        const data = super.getData(options);
        const popups = this.objectToFlag.getFlag("token-variants", "popups");
        const disableNameSearch = this.objectToFlag.getFlag("token-variants", "disableNameSearch");
        const directory = this.objectToFlag.getFlag("token-variants", "directory") || {};
        return mergeObject(data, {
            popups: popups,
            popupsSetFlag: popups != null,
            disableNameSearch: disableNameSearch,
            disableNameSearchSetFlag: disableNameSearch != null,
            directory: directory.path,
            directorySource: directory.source,
            directorySetFlag: !isEmpty(directory),
            tile: this.isTile
        });
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.find(".controlFlag").click((e)=>{
            $(e.target).siblings(".flag").prop("disabled", !e.target.checked);
        });
        html.find(".directory-fp").click((event)=>{
            new FilePicker({
                type: "folder",
                activeSource: "data",
                callback: (path, fp)=>{
                    html.find('[name="directory"]').val(fp.result.target);
                    $(event.target).closest("button").attr("title", "Directory: " + fp.result.target);
                    const sourceEl = html.find('[name="directorySource"]');
                    if (fp.activeSource === "s3") sourceEl.val(`s3:${fp.result.bucket}`);
                    else sourceEl.val(fp.activeSource);
                }
            }).render(true);
        });
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        if ("directory" in formData) formData.directory = {
            path: formData.directory,
            source: formData.directorySource
        };
        [
            "popups",
            "disableNameSearch",
            "directory"
        ].forEach((flag)=>{
            if (flag in formData) this.objectToFlag.setFlag("token-variants", flag, formData[flag]);
            else this.objectToFlag.unsetFlag("token-variants", flag);
        });
    }
}

});

parcelRequire.register("g3wZB", function(module, exports) {

$parcel$export(module.exports, "isCaching", () => $bb0684cddf271f09$export$ee0468762b49c68b);
$parcel$export(module.exports, "doImageSearch", () => $bb0684cddf271f09$export$4f3cb237ec0aee8a);
$parcel$export(module.exports, "doRandomSearch", () => $bb0684cddf271f09$export$54814896b5b3f706);
$parcel$export(module.exports, "doSyncSearch", () => $bb0684cddf271f09$export$829ee1305b7ab4f9);
$parcel$export(module.exports, "findImagesFuzzy", () => $bb0684cddf271f09$export$78c2454638ec157e);
$parcel$export(module.exports, "saveCache", () => $bb0684cddf271f09$export$7a1d85371c4f69);
$parcel$export(module.exports, "cacheImages", () => $bb0684cddf271f09$export$10bf6393bd6f131d);

var $hAn2A = parcelRequire("hAn2A");

var $bkXWx = parcelRequire("bkXWx");

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");
// True if in the middle of caching image paths
let $bb0684cddf271f09$var$caching = false;
function $bb0684cddf271f09$export$ee0468762b49c68b() {
    return $bb0684cddf271f09$var$caching;
}
// Cached images
let $bb0684cddf271f09$var$CACHED_IMAGES = {};
async function $bb0684cddf271f09$export$4f3cb237ec0aee8a(search, { searchType: searchType = SEARCH_TYPE.PORTRAIT_AND_TOKEN, simpleResults: simpleResults = false, callback: callback = null, searchOptions: searchOptions = {} } = {}) {
    if ($bb0684cddf271f09$var$caching) return;
    searchOptions = mergeObject(searchOptions, (0, $b2HDo.getSearchOptions)(), {
        overwrite: false
    });
    search = search.trim();
    if ((0, $b2HDo.TVA_CONFIG).debug) console.info("TVA | STARTING: Art Search", search, searchType, searchOptions);
    let searches = [
        search
    ];
    let allImages = new Map();
    const keywords = (0, $1mRWy.parseKeywords)(searchOptions.excludedKeywords);
    if (searchOptions.keywordSearch) searches = searches.concat(search.split(/[_\- :,\|\(\)\[\]]/).filter((word)=>word.length > 2 && !keywords.includes(word.toLowerCase())).reverse());
    let usedImages = new Set();
    for (const search of searches){
        if (allImages.get(search) !== undefined) continue;
        let results = await $bb0684cddf271f09$var$findImages(search, searchType, searchOptions);
        results = results.filter((pathObj)=>!usedImages.has(pathObj));
        allImages.set(search, results);
        results.forEach(usedImages.add, usedImages);
    }
    if ((0, $b2HDo.TVA_CONFIG).debug) console.info("TVA | ENDING: Art Search");
    if (simpleResults) allImages = Array.from(usedImages).map((obj)=>obj.path);
    if (callback) callback(allImages);
    return allImages;
}
async function $bb0684cddf271f09$export$54814896b5b3f706(search, { searchType: searchType = SEARCH_TYPE.PORTRAIT_AND_TOKEN, actor: actor = null, callback: callback = null, randomizerOptions: randomizerOptions = {}, searchOptions: searchOptions = {} } = {}) {
    if ($bb0684cddf271f09$var$caching) return null;
    const results = (0, $1mRWy.flattenSearchResults)(await $bb0684cddf271f09$var$_randSearchUtil(search, {
        searchType: searchType,
        actor: actor,
        randomizerOptions: randomizerOptions,
        searchOptions: searchOptions
    }));
    if (results.length === 0) return null;
    // Pick random image
    let randImageNum = Math.floor(Math.random() * results.length);
    if (callback) callback([
        results[randImageNum].path,
        results[randImageNum].name
    ]);
    return [
        results[randImageNum].path,
        results[randImageNum].name
    ];
}
async function $bb0684cddf271f09$export$829ee1305b7ab4f9(search, target, { searchType: searchType = SEARCH_TYPE.TOKEN, actor: actor = null, randomizerOptions: randomizerOptions = {} } = {}) {
    if ($bb0684cddf271f09$var$caching) return null;
    const results = (0, $1mRWy.flattenSearchResults)(await $bb0684cddf271f09$var$_randSearchUtil(search, {
        searchType: searchType,
        actor: actor,
        randomizerOptions: randomizerOptions
    }));
    // Find the image with the most similar name
    const fuse = new (0, $bkXWx.Fuse)(results, {
        keys: [
            "name"
        ],
        minMatchCharLength: 1,
        ignoreLocation: true,
        threshold: 0.4
    });
    const fResults = fuse.search(target);
    if (fResults && fResults.length !== 0) return [
        fResults[0].item.path,
        fResults[0].item.name
    ];
    else return null;
}
async function $bb0684cddf271f09$var$_randSearchUtil(search, { searchType: searchType = SEARCH_TYPE.PORTRAIT_AND_TOKEN, actor: actor = null, randomizerOptions: randomizerOptions = {}, searchOptions: searchOptions = {} } = {}) {
    const randSettings = mergeObject(randomizerOptions, (0, $b2HDo.TVA_CONFIG).randomizer, {
        overwrite: false
    });
    if (!(randSettings.tokenName || randSettings.actorName || randSettings.keywords || randSettings.shared || randSettings.wildcard)) return null;
    // Randomizer settings take precedence
    searchOptions.keywordSearch = randSettings.keywords;
    // Swap search to the actor name if need be
    if (randSettings.actorName && actor) search = actor.name;
    // Gather all images
    let results = randSettings.actorName || randSettings.tokenName || randSettings.keywords ? await $bb0684cddf271f09$export$4f3cb237ec0aee8a(search, {
        searchType: searchType,
        searchOptions: searchOptions
    }) : new Map();
    if (!randSettings.tokenName && !randSettings.actorName) results.delete(search);
    if (randSettings.shared && actor) {
        let sharedVariants = actor.getFlag("token-variants", "variants") || [];
        if (sharedVariants.length != 0) {
            const sv = [];
            sharedVariants.forEach((variant)=>{
                variant.names.forEach((name)=>{
                    sv.push({
                        path: variant.imgSrc,
                        name: name
                    });
                });
            });
            results.set("variants95436723", sv);
        }
    }
    if (randSettings.wildcard && actor) {
        let protoImg = actor.prototypeToken.texture.src;
        if (protoImg.includes("*") || protoImg.includes("{") && protoImg.includes("}")) {
            // Modified version of Actor.getTokenImages()
            const getTokenImages = async (actor)=>{
                if (actor._tokenImages) return actor._tokenImages;
                let source = "data";
                const browseOptions = {
                    wildcard: true
                };
                // Support non-user sources
                if (/\.s3\./.test(protoImg)) {
                    source = "s3";
                    const { bucket: bucket, keyPrefix: keyPrefix } = FilePicker.parseS3URL(protoImg);
                    if (bucket) {
                        browseOptions.bucket = bucket;
                        protoImg = keyPrefix;
                    }
                } else if (protoImg.startsWith("icons/")) source = "public";
                // Retrieve wildcard content
                try {
                    const content = await FilePicker.browse(source, protoImg, browseOptions);
                    return content.files;
                } catch (err) {
                    return [];
                }
            };
            const wildcardImages = (await getTokenImages(actor)).filter((img)=>!img.includes("*") && ((0, $1mRWy.isImage)(img) || (0, $1mRWy.isVideo)(img))).map((variant)=>{
                return {
                    path: variant,
                    name: (0, $1mRWy.getFileName)(variant)
                };
            });
            results.set("variants95436623", wildcardImages);
        }
    }
    return results;
}
/**
 * Recursive image search through a directory
 * @param {*} path starting path
 * @param {*} options.apiKey ForgeVTT AssetLibrary API key
 * @param {*} found_images all the images found
 * @returns void
 */ async function $bb0684cddf271f09$var$walkFindImages(path, { apiKey: apiKey = "" } = {}, found_images) {
    let files = {};
    if (!path.source) path.source = "data";
    const typeKey = path.types.sort().join(",");
    try {
        if (path.source.startsWith("s3:")) files = await FilePicker.browse("s3", path.text, {
            bucket: path.source.replace("s3:", "")
        });
        else if (path.source.startsWith("forgevtt")) {
            if (apiKey) {
                const response = await (0, $1mRWy.callForgeVTT)(path.text, apiKey);
                files.files = response.files.map((f)=>f.url);
            } else files = await FilePicker.browse("forgevtt", path.text, {
                recursive: true
            });
        } else if (path.source.startsWith("forge-bazaar")) files = await FilePicker.browse("forge-bazaar", path.text, {
            recursive: true
        });
        else if (path.source.startsWith("imgur")) {
            await fetch("https://api.imgur.com/3/gallery/album/" + path.text, {
                headers: {
                    Authorization: "Client-ID " + ((0, $b2HDo.TVA_CONFIG).imgurClientId ? (0, $b2HDo.TVA_CONFIG).imgurClientId : "df9d991443bb222"),
                    Accept: "application/json"
                }
            }).then((response)=>response.json()).then(async function(result) {
                if (!result.success) return;
                result.data.images.forEach((img)=>{
                    const rtName = img.title ?? img.description ?? (0, $1mRWy.getFileName)(img.link);
                    $bb0684cddf271f09$var$_addToFound({
                        path: (0, $1mRWy.decodeURISafely)(img.link),
                        name: rtName
                    }, typeKey, found_images);
                });
            }).catch((error)=>console.warn("TVA |", error));
            return;
        } else if (path.source.startsWith("rolltable")) {
            const table = game.tables.contents.find((t)=>t.name === path.text);
            if (!table) {
                const rollTableName = path.text;
                ui.notifications.warn(game.i18n.format("token-variants.notifications.warn.invalid-table", {
                    rollTableName: rollTableName
                }));
            } else for (let baseTableData of table.results){
                const rtPath = baseTableData.img;
                const rtName = baseTableData.text || (0, $1mRWy.getFileName)(rtPath);
                $bb0684cddf271f09$var$_addToFound({
                    path: (0, $1mRWy.decodeURISafely)(rtPath),
                    name: rtName
                }, typeKey, found_images);
            }
            return;
        } else if (path.source.startsWith("json")) {
            await fetch(path.text, {
                headers: {
                    Accept: "application/json"
                }
            }).then((response)=>response.json()).then(async function(result) {
                if (!result.length > 0) return;
                result.forEach((img)=>{
                    const rtName = img.name ?? (0, $1mRWy.getFileName)(img.path);
                    $bb0684cddf271f09$var$_addToFound({
                        path: (0, $1mRWy.decodeURISafely)(img.path),
                        name: rtName,
                        tags: img.tags
                    }, typeKey, found_images);
                });
            }).catch((error)=>console.warn("TVA |", error));
            return;
        } else files = await FilePicker.browse(path.source, path.text);
    } catch (err) {
        console.warn(`TVA | ${game.i18n.localize("token-variants.notifications.warn.path-not-found")} ${path.source}:${path.text}`);
        return;
    }
    if (files.target == ".") return;
    if (files.files) files.files.forEach((tokenSrc)=>{
        $bb0684cddf271f09$var$_addToFound({
            path: (0, $1mRWy.decodeURISafely)(tokenSrc),
            name: (0, $1mRWy.getFileName)(tokenSrc)
        }, typeKey, found_images);
    });
    // ForgeVTT requires special treatment
    // Bazaar paths fail recursive search if one level above root
    if (path.source.startsWith("forgevtt")) return;
    else if (path.source.startsWith("forge-bazaar") && ![
        "modules",
        "systems",
        "worlds",
        "assets"
    ].includes(path.text.replaceAll(/[\/\\]/g, ""))) return;
    for (let f_dir of files.dirs)await $bb0684cddf271f09$var$walkFindImages({
        text: f_dir,
        source: path.source,
        types: path.types
    }, {
        apiKey: apiKey
    }, found_images);
}
function $bb0684cddf271f09$var$_addToFound(img, typeKey, found_images) {
    if ((0, $1mRWy.isImage)(img.path) || (0, $1mRWy.isVideo)(img.path)) {
        if (found_images[typeKey] == null) found_images[typeKey] = [
            img
        ];
        else found_images[typeKey].push(img);
    }
}
/**
 * Recursive walks through all paths exposed to the module and caches them
 * @param {*} searchType
 * @returns
 */ async function $bb0684cddf271f09$var$walkAllPaths(searchType) {
    const found_images = {};
    const paths = $bb0684cddf271f09$var$_filterPathsByType((0, $b2HDo.TVA_CONFIG).searchPaths, searchType);
    for (const path of paths)if (path.cache && $bb0684cddf271f09$var$caching || !path.cache && !$bb0684cddf271f09$var$caching) await $bb0684cddf271f09$var$walkFindImages(path, {}, found_images);
    // ForgeVTT specific path handling
    const userId = typeof ForgeAPI !== "undefined" ? await ForgeAPI.getUserId() : "";
    for(const uid in (0, $b2HDo.TVA_CONFIG).forgeSearchPaths){
        const apiKey = (0, $b2HDo.TVA_CONFIG).forgeSearchPaths[uid].apiKey;
        const paths = $bb0684cddf271f09$var$_filterPathsByType((0, $b2HDo.TVA_CONFIG).forgeSearchPaths[uid].paths, searchType);
        if (uid === userId) {
            for (const path of paths)if (path.cache && $bb0684cddf271f09$var$caching || !path.cache && !$bb0684cddf271f09$var$caching) await $bb0684cddf271f09$var$walkFindImages(path, {}, found_images);
        } else if (apiKey) for (const path of paths){
            if (path.cache && $bb0684cddf271f09$var$caching || !path.cache && !$bb0684cddf271f09$var$caching) {
                if (path.share) await $bb0684cddf271f09$var$walkFindImages(path, {
                    apiKey: apiKey
                }, found_images);
            }
        }
    }
    return found_images;
}
function $bb0684cddf271f09$var$_filterPathsByType(paths, searchType) {
    if (!searchType) return paths;
    return paths.filter((p)=>p.types.includes(searchType));
}
async function $bb0684cddf271f09$export$78c2454638ec157e(name, searchType, searchOptions, forceSearchName = false) {
    if ((0, $b2HDo.TVA_CONFIG).debug) console.info("TVA | STARTING: Fuzzy Image Search", name, searchType, searchOptions, forceSearchName);
    const filters = (0, $1mRWy.getFilters)(searchType, searchOptions.searchFilters);
    const fuse = new (0, $bkXWx.Fuse)([], {
        keys: [
            !forceSearchName && searchOptions.runSearchOnPath ? "path" : "name",
            "tags"
        ],
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 1,
        ignoreLocation: true,
        threshold: searchOptions.algorithm.fuzzyThreshold
    });
    const found_images = await $bb0684cddf271f09$var$walkAllPaths(searchType);
    for (const container of [
        $bb0684cddf271f09$var$CACHED_IMAGES,
        found_images
    ])for(const typeKey in container){
        const types = typeKey.split(",");
        if (types.includes(searchType)) {
            for (const imgObj of container[typeKey])if ($bb0684cddf271f09$var$_imagePassesFilter(imgObj.name, imgObj.path, filters, searchOptions.runSearchOnPath)) fuse.add(imgObj);
        }
    }
    let results;
    if (name === "") results = fuse.getIndex().docs.slice(0, searchOptions.algorithm.fuzzyLimit);
    else {
        results = fuse.search(name).slice(0, searchOptions.algorithm.fuzzyLimit);
        results = results.map((r)=>{
            r.item.indices = r.matches[0].indices;
            r.item.score = r.score;
            return r.item;
        });
    }
    if ((0, $b2HDo.TVA_CONFIG).debug) console.info("TVA | ENDING: Fuzzy Image Search", results);
    return results;
}
async function $bb0684cddf271f09$var$findImagesExact(name, searchType, searchOptions) {
    if ((0, $b2HDo.TVA_CONFIG).debug) console.info("TVA | STARTING: Exact Image Search", name, searchType, searchOptions);
    const found_images = await $bb0684cddf271f09$var$walkAllPaths(searchType);
    const simpleName = (0, $1mRWy.simplifyName)(name);
    const filters = (0, $1mRWy.getFilters)(searchType, searchOptions.searchFilters);
    const matchedImages = [];
    for (const container of [
        $bb0684cddf271f09$var$CACHED_IMAGES,
        found_images
    ])for(const typeKey in container){
        const types = typeKey.split(",");
        if (types.includes(searchType)) {
            for (const imgOBj of container[typeKey])if ($bb0684cddf271f09$var$_exactSearchMatchesImage(simpleName, imgOBj.path, imgOBj.name, filters, searchOptions.runSearchOnPath)) matchedImages.push(imgOBj);
        }
    }
    if ((0, $b2HDo.TVA_CONFIG).debug) console.info("TVA | ENDING: Exact Image Search", matchedImages);
    return matchedImages;
}
async function $bb0684cddf271f09$var$findImages(name, searchType = "", searchOptions = {}) {
    const sOptions = mergeObject(searchOptions, (0, $b2HDo.getSearchOptions)(), {
        overwrite: false
    });
    if (sOptions.algorithm.exact) return await $bb0684cddf271f09$var$findImagesExact(name, searchType, sOptions);
    else return await $bb0684cddf271f09$export$78c2454638ec157e(name, searchType, sOptions);
}
/**
 * Checks if image path and name match the provided search text and filters
 * @param imagePath image path
 * @param imageName image name
 * @param filters filters to be applied
 * @returns true|false
 */ function $bb0684cddf271f09$var$_exactSearchMatchesImage(simplifiedSearch, imagePath, imageName, filters, runSearchOnPath) {
    // Is the search text contained in the name/path
    const simplified = runSearchOnPath ? (0, $1mRWy.simplifyPath)(imagePath) : (0, $1mRWy.simplifyName)(imageName);
    if (!simplified.includes(simplifiedSearch)) return false;
    if (!filters) return true;
    return $bb0684cddf271f09$var$_imagePassesFilter(imageName, imagePath, filters, runSearchOnPath);
}
function $bb0684cddf271f09$var$_imagePassesFilter(imageName, imagePath, filters, runSearchOnPath) {
    // Filters are applied to path depending on the 'runSearchOnPath' setting, and actual or custom rolltable name
    let text;
    if (runSearchOnPath) text = (0, $1mRWy.decodeURIComponentSafely)(imagePath);
    else if ((0, $1mRWy.getFileName)(imagePath) === imageName) text = (0, $1mRWy.getFileNameWithExt)(imagePath);
    else text = imageName;
    if (filters.regex) return filters.regex.test(text);
    if (filters.include) {
        if (!text.includes(filters.include)) return false;
    }
    if (filters.exclude) {
        if (text.includes(filters.exclude)) return false;
    }
    return true;
}
async function $bb0684cddf271f09$export$7a1d85371c4f69(cacheFile) {
    const data = {};
    const caches = Object.keys($bb0684cddf271f09$var$CACHED_IMAGES);
    for (const c of caches){
        if (!(c in data)) data[c] = [];
        for (const img of $bb0684cddf271f09$var$CACHED_IMAGES[c]){
            if (img.tags) data[c].push([
                img.path,
                img.name,
                img.tags
            ]);
            else if ((0, $1mRWy.getFileName)(img.path) === img.name) data[c].push(img.path);
            else data[c].push([
                img.path,
                img.name
            ]);
        }
    }
    let file = new File([
        JSON.stringify(data)
    ], (0, $1mRWy.getFileNameWithExt)(cacheFile), {
        type: "text/plain"
    });
    FilePicker.upload("data", (0, $1mRWy.getFilePath)(cacheFile), file);
}
async function $bb0684cddf271f09$export$10bf6393bd6f131d({ staticCache: staticCache = (0, $b2HDo.TVA_CONFIG).staticCache, staticCacheFile: staticCacheFile = (0, $b2HDo.TVA_CONFIG).staticCacheFile } = {}) {
    if ($bb0684cddf271f09$var$caching) return;
    $bb0684cddf271f09$var$caching = true;
    if (!(0, $hAn2A.isInitialized)() && staticCache) {
        if (await $bb0684cddf271f09$var$_readCacheFromFile(staticCacheFile)) {
            $bb0684cddf271f09$var$caching = false;
            return;
        }
    }
    if (!(0, $b2HDo.TVA_CONFIG).disableNotifs) ui.notifications.info(game.i18n.format("token-variants.notifications.info.caching-started"));
    if ((0, $b2HDo.TVA_CONFIG).debug) console.info("TVA | STARTING: Token Caching");
    const found_images = await $bb0684cddf271f09$var$walkAllPaths();
    $bb0684cddf271f09$var$CACHED_IMAGES = found_images;
    if ((0, $b2HDo.TVA_CONFIG).debug) console.info("TVA | ENDING: Token Caching");
    $bb0684cddf271f09$var$caching = false;
    if (!(0, $b2HDo.TVA_CONFIG).disableNotifs) ui.notifications.info(game.i18n.format("token-variants.notifications.info.caching-finished", {
        imageCount: Object.keys($bb0684cddf271f09$var$CACHED_IMAGES).reduce((count, types)=>count + $bb0684cddf271f09$var$CACHED_IMAGES[types].length, 0)
    }));
    if (staticCache && game.user.isGM) $bb0684cddf271f09$export$7a1d85371c4f69(staticCacheFile);
}
async function $bb0684cddf271f09$var$_readCacheFromFile(fileName) {
    $bb0684cddf271f09$var$CACHED_IMAGES = {};
    try {
        await jQuery.getJSON(fileName, (json)=>{
            for(let category in json){
                $bb0684cddf271f09$var$CACHED_IMAGES[category] = [];
                for (const img of json[category])if (Array.isArray(img)) {
                    if (img.length === 3) $bb0684cddf271f09$var$CACHED_IMAGES[category].push({
                        path: img[0],
                        name: img[1],
                        tags: img[2]
                    });
                    else $bb0684cddf271f09$var$CACHED_IMAGES[category].push({
                        path: img[0],
                        name: img[1]
                    });
                } else $bb0684cddf271f09$var$CACHED_IMAGES[category].push({
                    path: img,
                    name: (0, $1mRWy.getFileName)(img)
                });
            }
            if (!(0, $b2HDo.TVA_CONFIG).disableNotifs) ui.notifications.info(`Token Variant Art: Using Static Cache (${Object.keys($bb0684cddf271f09$var$CACHED_IMAGES).reduce((count, c)=>count + $bb0684cddf271f09$var$CACHED_IMAGES[c].length, 0)} images)`);
        });
    } catch (error) {
        ui.notifications.warn(`Token Variant Art: Static Cache not found`);
        $bb0684cddf271f09$var$CACHED_IMAGES = {};
        return false;
    }
    return true;
}

});
parcelRequire.register("bkXWx", function(module, exports) {

$parcel$export(module.exports, "Fuse", () => $84100f6a37fe0f58$export$93605f466b8506d8);
/**
 * Fuse.js v6.5.3 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2021 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */ function $84100f6a37fe0f58$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $84100f6a37fe0f58$var$_objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? $84100f6a37fe0f58$var$ownKeys(Object(source), !0).forEach(function(key) {
            $84100f6a37fe0f58$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $84100f6a37fe0f58$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $84100f6a37fe0f58$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $84100f6a37fe0f58$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $84100f6a37fe0f58$var$_typeof(obj);
}
function $84100f6a37fe0f58$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $84100f6a37fe0f58$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $84100f6a37fe0f58$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $84100f6a37fe0f58$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $84100f6a37fe0f58$var$_defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function $84100f6a37fe0f58$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $84100f6a37fe0f58$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    Object.defineProperty(subClass, "prototype", {
        value: Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        }),
        writable: false
    });
    if (superClass) $84100f6a37fe0f58$var$_setPrototypeOf(subClass, superClass);
}
function $84100f6a37fe0f58$var$_getPrototypeOf(o) {
    $84100f6a37fe0f58$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $84100f6a37fe0f58$var$_getPrototypeOf(o);
}
function $84100f6a37fe0f58$var$_setPrototypeOf(o, p) {
    $84100f6a37fe0f58$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $84100f6a37fe0f58$var$_setPrototypeOf(o, p);
}
function $84100f6a37fe0f58$var$_isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function $84100f6a37fe0f58$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $84100f6a37fe0f58$var$_possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) return call;
    else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return $84100f6a37fe0f58$var$_assertThisInitialized(self);
}
function $84100f6a37fe0f58$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $84100f6a37fe0f58$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = $84100f6a37fe0f58$var$_getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $84100f6a37fe0f58$var$_getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $84100f6a37fe0f58$var$_possibleConstructorReturn(this, result);
    };
}
function $84100f6a37fe0f58$var$_toConsumableArray(arr) {
    return $84100f6a37fe0f58$var$_arrayWithoutHoles(arr) || $84100f6a37fe0f58$var$_iterableToArray(arr) || $84100f6a37fe0f58$var$_unsupportedIterableToArray(arr) || $84100f6a37fe0f58$var$_nonIterableSpread();
}
function $84100f6a37fe0f58$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $84100f6a37fe0f58$var$_arrayLikeToArray(arr);
}
function $84100f6a37fe0f58$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $84100f6a37fe0f58$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $84100f6a37fe0f58$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $84100f6a37fe0f58$var$_arrayLikeToArray(o, minLen);
}
function $84100f6a37fe0f58$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $84100f6a37fe0f58$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $84100f6a37fe0f58$var$isArray(value) {
    return !Array.isArray ? $84100f6a37fe0f58$var$getTag(value) === "[object Array]" : Array.isArray(value);
} // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js
var $84100f6a37fe0f58$var$INFINITY = 1 / 0;
function $84100f6a37fe0f58$var$baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == "string") return value;
    var result = value + "";
    return result == "0" && 1 / value == -$84100f6a37fe0f58$var$INFINITY ? "-0" : result;
}
function $84100f6a37fe0f58$var$toString(value) {
    return value == null ? "" : $84100f6a37fe0f58$var$baseToString(value);
}
function $84100f6a37fe0f58$var$isString(value) {
    return typeof value === "string";
}
function $84100f6a37fe0f58$var$isNumber(value) {
    return typeof value === "number";
} // Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js
function $84100f6a37fe0f58$var$isBoolean(value) {
    return value === true || value === false || $84100f6a37fe0f58$var$isObjectLike(value) && $84100f6a37fe0f58$var$getTag(value) == "[object Boolean]";
}
function $84100f6a37fe0f58$var$isObject(value) {
    return $84100f6a37fe0f58$var$_typeof(value) === "object";
} // Checks if `value` is object-like.
function $84100f6a37fe0f58$var$isObjectLike(value) {
    return $84100f6a37fe0f58$var$isObject(value) && value !== null;
}
function $84100f6a37fe0f58$var$isDefined(value) {
    return value !== undefined && value !== null;
}
function $84100f6a37fe0f58$var$isBlank(value) {
    return !value.trim().length;
} // Gets the `toStringTag` of `value`.
// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js
function $84100f6a37fe0f58$var$getTag(value) {
    return value == null ? value === undefined ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
var $84100f6a37fe0f58$var$EXTENDED_SEARCH_UNAVAILABLE = "Extended search is not available";
var $84100f6a37fe0f58$var$INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
var $84100f6a37fe0f58$var$LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = function LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key) {
    return "Invalid value for key ".concat(key);
};
var $84100f6a37fe0f58$var$PATTERN_LENGTH_TOO_LARGE = function PATTERN_LENGTH_TOO_LARGE(max) {
    return "Pattern length exceeds max of ".concat(max, ".");
};
var $84100f6a37fe0f58$var$MISSING_KEY_PROPERTY = function MISSING_KEY_PROPERTY(name) {
    return "Missing ".concat(name, " property in key");
};
var $84100f6a37fe0f58$var$INVALID_KEY_WEIGHT_VALUE = function INVALID_KEY_WEIGHT_VALUE(key) {
    return "Property 'weight' in key '".concat(key, "' must be a positive integer");
};
var $84100f6a37fe0f58$var$hasOwn = Object.prototype.hasOwnProperty;
var $84100f6a37fe0f58$var$KeyStore = /*#__PURE__*/ function() {
    function KeyStore(keys) {
        var _this = this;
        $84100f6a37fe0f58$var$_classCallCheck(this, KeyStore);
        this._keys = [];
        this._keyMap = {};
        var totalWeight = 0;
        keys.forEach(function(key) {
            var obj = $84100f6a37fe0f58$var$createKey(key);
            totalWeight += obj.weight;
            _this._keys.push(obj);
            _this._keyMap[obj.id] = obj;
            totalWeight += obj.weight;
        }); // Normalize weights so that their sum is equal to 1
        this._keys.forEach(function(key) {
            key.weight /= totalWeight;
        });
    }
    $84100f6a37fe0f58$var$_createClass(KeyStore, [
        {
            key: "get",
            value: function get(keyId) {
                return this._keyMap[keyId];
            }
        },
        {
            key: "keys",
            value: function keys() {
                return this._keys;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return JSON.stringify(this._keys);
            }
        }
    ]);
    return KeyStore;
}();
function $84100f6a37fe0f58$var$createKey(key) {
    var path = null;
    var id = null;
    var src = null;
    var weight = 1;
    if ($84100f6a37fe0f58$var$isString(key) || $84100f6a37fe0f58$var$isArray(key)) {
        src = key;
        path = $84100f6a37fe0f58$var$createKeyPath(key);
        id = $84100f6a37fe0f58$var$createKeyId(key);
    } else {
        if (!$84100f6a37fe0f58$var$hasOwn.call(key, "name")) throw new Error($84100f6a37fe0f58$var$MISSING_KEY_PROPERTY("name"));
        var name = key.name;
        src = name;
        if ($84100f6a37fe0f58$var$hasOwn.call(key, "weight")) {
            weight = key.weight;
            if (weight <= 0) throw new Error($84100f6a37fe0f58$var$INVALID_KEY_WEIGHT_VALUE(name));
        }
        path = $84100f6a37fe0f58$var$createKeyPath(name);
        id = $84100f6a37fe0f58$var$createKeyId(name);
    }
    return {
        path: path,
        id: id,
        weight: weight,
        src: src
    };
}
function $84100f6a37fe0f58$var$createKeyPath(key) {
    return $84100f6a37fe0f58$var$isArray(key) ? key : key.split(".");
}
function $84100f6a37fe0f58$var$createKeyId(key) {
    return $84100f6a37fe0f58$var$isArray(key) ? key.join(".") : key;
}
function $84100f6a37fe0f58$var$get(obj, path) {
    var list = [];
    var arr = false;
    var deepGet = function deepGet(obj, path, index) {
        if (!$84100f6a37fe0f58$var$isDefined(obj)) return;
        if (!path[index]) // If there's no path left, we've arrived at the object we care about.
        list.push(obj);
        else {
            var key = path[index];
            var value = obj[key];
            if (!$84100f6a37fe0f58$var$isDefined(value)) return;
             // If we're at the last value in the path, and if it's a string/number/bool,
            // add it to the list
            if (index === path.length - 1 && ($84100f6a37fe0f58$var$isString(value) || $84100f6a37fe0f58$var$isNumber(value) || $84100f6a37fe0f58$var$isBoolean(value))) list.push($84100f6a37fe0f58$var$toString(value));
            else if ($84100f6a37fe0f58$var$isArray(value)) {
                arr = true; // Search each item in the array.
                for(var i = 0, len = value.length; i < len; i += 1)deepGet(value[i], path, index + 1);
            } else if (path.length) // An object. Recurse further.
            deepGet(value, path, index + 1);
        }
    }; // Backwards compatibility (since path used to be a string)
    deepGet(obj, $84100f6a37fe0f58$var$isString(path) ? path.split(".") : path, 0);
    return arr ? list : list[0];
}
var $84100f6a37fe0f58$var$MatchOptions = {
    // Whether the matches should be included in the result set. When `true`, each record in the result
    // set will include the indices of the matched characters.
    // These can consequently be used for highlighting purposes.
    includeMatches: false,
    // When `true`, the matching function will continue to the end of a search pattern even if
    // a perfect match has already been located in the string.
    findAllMatches: false,
    // Minimum number of characters that must be matched before a result is considered a match
    minMatchCharLength: 1
};
var $84100f6a37fe0f58$var$BasicOptions = {
    // When `true`, the algorithm continues searching to the end of the input even if a perfect
    // match is found before the end of the same input.
    isCaseSensitive: false,
    // When true, the matching function will continue to the end of a search pattern even if
    includeScore: false,
    // List of properties that will be searched. This also supports nested properties.
    keys: [],
    // Whether to sort the result list, by score
    shouldSort: true,
    // Default sort function: sort by ascending score, ascending index
    sortFn: function sortFn(a, b) {
        return a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1;
    }
};
var $84100f6a37fe0f58$var$FuzzyOptions = {
    // Approximately where in the text is the pattern expected to be found?
    location: 0,
    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
    // (of both letters and location), a threshold of '1.0' would match anything.
    threshold: 0.6,
    // Determines how close the match must be to the fuzzy location (specified above).
    // An exact letter match which is 'distance' characters away from the fuzzy location
    // would score as a complete mismatch. A distance of '0' requires the match be at
    // the exact location specified, a threshold of '1000' would require a perfect match
    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
    distance: 100
};
var $84100f6a37fe0f58$var$AdvancedOptions = {
    // When `true`, it enables the use of unix-like search commands
    useExtendedSearch: false,
    // The get function to use when fetching an object's properties.
    // The default will search nested paths *ie foo.bar.baz*
    getFn: $84100f6a37fe0f58$var$get,
    // When `true`, search will ignore `location` and `distance`, so it won't matter
    // where in the string the pattern appears.
    // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
    ignoreLocation: false,
    // When `true`, the calculation for the relevance score (used for sorting) will
    // ignore the field-length norm.
    // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
    ignoreFieldNorm: false,
    // The weight to determine how much field length norm effects scoring.
    fieldNormWeight: 1
};
var $84100f6a37fe0f58$var$Config = $84100f6a37fe0f58$var$_objectSpread2($84100f6a37fe0f58$var$_objectSpread2($84100f6a37fe0f58$var$_objectSpread2($84100f6a37fe0f58$var$_objectSpread2({}, $84100f6a37fe0f58$var$BasicOptions), $84100f6a37fe0f58$var$MatchOptions), $84100f6a37fe0f58$var$FuzzyOptions), $84100f6a37fe0f58$var$AdvancedOptions);
var $84100f6a37fe0f58$var$SPACE = /[^ ]+/g; // Field-length norm: the shorter the field, the higher the weight.
// Set to 3 decimals to reduce index size.
function $84100f6a37fe0f58$var$norm() {
    var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var mantissa = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var cache = new Map();
    var m = Math.pow(10, mantissa);
    return {
        get: function get(value) {
            var numTokens = value.match($84100f6a37fe0f58$var$SPACE).length;
            if (cache.has(numTokens)) return cache.get(numTokens);
             // Default function is 1/sqrt(x), weight makes that variable
            var norm = 1 / Math.pow(numTokens, 0.5 * weight); // In place of `toFixed(mantissa)`, for faster computation
            var n = parseFloat(Math.round(norm * m) / m);
            cache.set(numTokens, n);
            return n;
        },
        clear: function clear() {
            cache.clear();
        }
    };
}
var $84100f6a37fe0f58$var$FuseIndex = /*#__PURE__*/ function() {
    function FuseIndex() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, _ref$getFn = _ref.getFn, getFn = _ref$getFn === void 0 ? $84100f6a37fe0f58$var$Config.getFn : _ref$getFn, _ref$fieldNormWeight = _ref.fieldNormWeight, fieldNormWeight = _ref$fieldNormWeight === void 0 ? $84100f6a37fe0f58$var$Config.fieldNormWeight : _ref$fieldNormWeight;
        $84100f6a37fe0f58$var$_classCallCheck(this, FuseIndex);
        this.norm = $84100f6a37fe0f58$var$norm(fieldNormWeight, 3);
        this.getFn = getFn;
        this.isCreated = false;
        this.setIndexRecords();
    }
    $84100f6a37fe0f58$var$_createClass(FuseIndex, [
        {
            key: "setSources",
            value: function setSources() {
                var docs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                this.docs = docs;
            }
        },
        {
            key: "setIndexRecords",
            value: function setIndexRecords() {
                var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                this.records = records;
            }
        },
        {
            key: "setKeys",
            value: function setKeys() {
                var _this = this;
                var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                this.keys = keys;
                this._keysMap = {};
                keys.forEach(function(key, idx) {
                    _this._keysMap[key.id] = idx;
                });
            }
        },
        {
            key: "create",
            value: function create() {
                var _this2 = this;
                if (this.isCreated || !this.docs.length) return;
                this.isCreated = true; // List is Array<String>
                if ($84100f6a37fe0f58$var$isString(this.docs[0])) this.docs.forEach(function(doc, docIndex) {
                    _this2._addString(doc, docIndex);
                });
                else // List is Array<Object>
                this.docs.forEach(function(doc, docIndex) {
                    _this2._addObject(doc, docIndex);
                });
                this.norm.clear();
            }
        },
        {
            key: "add",
            value: function add(doc) {
                var idx = this.size();
                if ($84100f6a37fe0f58$var$isString(doc)) this._addString(doc, idx);
                else this._addObject(doc, idx);
            }
        },
        {
            key: "removeAt",
            value: function removeAt(idx) {
                this.records.splice(idx, 1); // Change ref index of every subsquent doc
                for(var i = idx, len = this.size(); i < len; i += 1)this.records[i].i -= 1;
            }
        },
        {
            key: "getValueForItemAtKeyId",
            value: function getValueForItemAtKeyId(item, keyId) {
                return item[this._keysMap[keyId]];
            }
        },
        {
            key: "size",
            value: function size() {
                return this.records.length;
            }
        },
        {
            key: "_addString",
            value: function _addString(doc, docIndex) {
                if (!$84100f6a37fe0f58$var$isDefined(doc) || $84100f6a37fe0f58$var$isBlank(doc)) return;
                var record = {
                    v: doc,
                    i: docIndex,
                    n: this.norm.get(doc)
                };
                this.records.push(record);
            }
        },
        {
            key: "_addObject",
            value: function _addObject(doc, docIndex) {
                var _this3 = this;
                var record = {
                    i: docIndex,
                    $: {}
                }; // Iterate over every key (i.e, path), and fetch the value at that key
                this.keys.forEach(function(key, keyIndex) {
                    var value = _this3.getFn(doc, key.path);
                    if (!$84100f6a37fe0f58$var$isDefined(value)) return;
                    if ($84100f6a37fe0f58$var$isArray(value)) (function() {
                        var subRecords = [];
                        var stack = [
                            {
                                nestedArrIndex: -1,
                                value: value
                            }
                        ];
                        while(stack.length){
                            var _stack$pop = stack.pop(), nestedArrIndex = _stack$pop.nestedArrIndex, _value = _stack$pop.value;
                            if (!$84100f6a37fe0f58$var$isDefined(_value)) continue;
                            if ($84100f6a37fe0f58$var$isString(_value) && !$84100f6a37fe0f58$var$isBlank(_value)) {
                                var subRecord = {
                                    v: _value,
                                    i: nestedArrIndex,
                                    n: _this3.norm.get(_value)
                                };
                                subRecords.push(subRecord);
                            } else if ($84100f6a37fe0f58$var$isArray(_value)) _value.forEach(function(item, k) {
                                stack.push({
                                    nestedArrIndex: k,
                                    value: item
                                });
                            });
                        }
                        record.$[keyIndex] = subRecords;
                    })();
                    else if (!$84100f6a37fe0f58$var$isBlank(value)) {
                        var subRecord = {
                            v: value,
                            n: _this3.norm.get(value)
                        };
                        record.$[keyIndex] = subRecord;
                    }
                });
                this.records.push(record);
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    keys: this.keys,
                    records: this.records
                };
            }
        }
    ]);
    return FuseIndex;
}();
function $84100f6a37fe0f58$var$createIndex(keys, docs) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}, _ref2$getFn = _ref2.getFn, getFn = _ref2$getFn === void 0 ? $84100f6a37fe0f58$var$Config.getFn : _ref2$getFn, _ref2$fieldNormWeight = _ref2.fieldNormWeight, fieldNormWeight = _ref2$fieldNormWeight === void 0 ? $84100f6a37fe0f58$var$Config.fieldNormWeight : _ref2$fieldNormWeight;
    var myIndex = new $84100f6a37fe0f58$var$FuseIndex({
        getFn: getFn,
        fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys.map($84100f6a37fe0f58$var$createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex;
}
function $84100f6a37fe0f58$var$parseIndex(data) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref3$getFn = _ref3.getFn, getFn = _ref3$getFn === void 0 ? $84100f6a37fe0f58$var$Config.getFn : _ref3$getFn, _ref3$fieldNormWeight = _ref3.fieldNormWeight, fieldNormWeight = _ref3$fieldNormWeight === void 0 ? $84100f6a37fe0f58$var$Config.fieldNormWeight : _ref3$fieldNormWeight;
    var keys = data.keys, records = data.records;
    var myIndex = new $84100f6a37fe0f58$var$FuseIndex({
        getFn: getFn,
        fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex;
}
function $84100f6a37fe0f58$var$computeScore$1(pattern) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref$errors = _ref.errors, errors = _ref$errors === void 0 ? 0 : _ref$errors, _ref$currentLocation = _ref.currentLocation, currentLocation = _ref$currentLocation === void 0 ? 0 : _ref$currentLocation, _ref$expectedLocation = _ref.expectedLocation, expectedLocation = _ref$expectedLocation === void 0 ? 0 : _ref$expectedLocation, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? $84100f6a37fe0f58$var$Config.distance : _ref$distance, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? $84100f6a37fe0f58$var$Config.ignoreLocation : _ref$ignoreLocation;
    var accuracy = errors / pattern.length;
    if (ignoreLocation) return accuracy;
    var proximity = Math.abs(expectedLocation - currentLocation);
    if (!distance) // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy;
    return accuracy + proximity / distance;
}
function $84100f6a37fe0f58$var$convertMaskToIndices() {
    var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $84100f6a37fe0f58$var$Config.minMatchCharLength;
    var indices = [];
    var start = -1;
    var end = -1;
    var i = 0;
    for(var len = matchmask.length; i < len; i += 1){
        var match = matchmask[i];
        if (match && start === -1) start = i;
        else if (!match && start !== -1) {
            end = i - 1;
            if (end - start + 1 >= minMatchCharLength) indices.push([
                start,
                end
            ]);
            start = -1;
        }
    } // (i-1 - start) + 1 => i - start
    if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([
        start,
        i - 1
    ]);
    return indices;
}
// Machine word size
var $84100f6a37fe0f58$var$MAX_BITS = 32;
function $84100f6a37fe0f58$var$search(text, pattern, patternAlphabet) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}, _ref$location = _ref.location, location = _ref$location === void 0 ? $84100f6a37fe0f58$var$Config.location : _ref$location, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? $84100f6a37fe0f58$var$Config.distance : _ref$distance, _ref$threshold = _ref.threshold, threshold = _ref$threshold === void 0 ? $84100f6a37fe0f58$var$Config.threshold : _ref$threshold, _ref$findAllMatches = _ref.findAllMatches, findAllMatches = _ref$findAllMatches === void 0 ? $84100f6a37fe0f58$var$Config.findAllMatches : _ref$findAllMatches, _ref$minMatchCharLeng = _ref.minMatchCharLength, minMatchCharLength = _ref$minMatchCharLeng === void 0 ? $84100f6a37fe0f58$var$Config.minMatchCharLength : _ref$minMatchCharLeng, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? $84100f6a37fe0f58$var$Config.includeMatches : _ref$includeMatches, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? $84100f6a37fe0f58$var$Config.ignoreLocation : _ref$ignoreLocation;
    if (pattern.length > $84100f6a37fe0f58$var$MAX_BITS) throw new Error($84100f6a37fe0f58$var$PATTERN_LENGTH_TOO_LARGE($84100f6a37fe0f58$var$MAX_BITS));
    var patternLen = pattern.length; // Set starting location at beginning text and initialize the alphabet.
    var textLen = text.length; // Handle the case when location > text.length
    var expectedLocation = Math.max(0, Math.min(location, textLen)); // Highest score beyond which we give up.
    var currentThreshold = threshold; // Is there a nearby exact match? (speedup)
    var bestLocation = expectedLocation; // Performance: only computer matches when the minMatchCharLength > 1
    // OR if `includeMatches` is true.
    var computeMatches = minMatchCharLength > 1 || includeMatches; // A mask of the matches, used for building the indices
    var matchMask = computeMatches ? Array(textLen) : [];
    var index; // Get all exact matches, here for speed up
    while((index = text.indexOf(pattern, bestLocation)) > -1){
        var score = $84100f6a37fe0f58$var$computeScore$1(pattern, {
            currentLocation: index,
            expectedLocation: expectedLocation,
            distance: distance,
            ignoreLocation: ignoreLocation
        });
        currentThreshold = Math.min(score, currentThreshold);
        bestLocation = index + patternLen;
        if (computeMatches) {
            var i = 0;
            while(i < patternLen){
                matchMask[index + i] = 1;
                i += 1;
            }
        }
    } // Reset the best location
    bestLocation = -1;
    var lastBitArr = [];
    var finalScore = 1;
    var binMax = patternLen + textLen;
    var mask = 1 << patternLen - 1;
    for(var _i = 0; _i < patternLen; _i += 1){
        // Scan for the best match; each iteration allows for one more error.
        // Run a binary search to determine how far from the match location we can stray
        // at this error level.
        var binMin = 0;
        var binMid = binMax;
        while(binMin < binMid){
            var _score2 = $84100f6a37fe0f58$var$computeScore$1(pattern, {
                errors: _i,
                currentLocation: expectedLocation + binMid,
                expectedLocation: expectedLocation,
                distance: distance,
                ignoreLocation: ignoreLocation
            });
            if (_score2 <= currentThreshold) binMin = binMid;
            else binMax = binMid;
            binMid = Math.floor((binMax - binMin) / 2 + binMin);
        } // Use the result from this iteration as the maximum for the next.
        binMax = binMid;
        var start = Math.max(1, expectedLocation - binMid + 1);
        var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen; // Initialize the bit array
        var bitArr = Array(finish + 2);
        bitArr[finish + 1] = (1 << _i) - 1;
        for(var j = finish; j >= start; j -= 1){
            var currentLocation = j - 1;
            var charMatch = patternAlphabet[text.charAt(currentLocation)];
            if (computeMatches) // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
            matchMask[currentLocation] = +!!charMatch;
             // First pass: exact match
            bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch; // Subsequent passes: fuzzy match
            if (_i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
            if (bitArr[j] & mask) {
                finalScore = $84100f6a37fe0f58$var$computeScore$1(pattern, {
                    errors: _i,
                    currentLocation: currentLocation,
                    expectedLocation: expectedLocation,
                    distance: distance,
                    ignoreLocation: ignoreLocation
                }); // This match will almost certainly be better than any existing match.
                // But check anyway.
                if (finalScore <= currentThreshold) {
                    // Indeed it is
                    currentThreshold = finalScore;
                    bestLocation = currentLocation; // Already passed `loc`, downhill from here on in.
                    if (bestLocation <= expectedLocation) break;
                     // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
                    start = Math.max(1, 2 * expectedLocation - bestLocation);
                }
            }
        } // No hope for a (better) match at greater error levels.
        var _score = $84100f6a37fe0f58$var$computeScore$1(pattern, {
            errors: _i + 1,
            currentLocation: expectedLocation,
            expectedLocation: expectedLocation,
            distance: distance,
            ignoreLocation: ignoreLocation
        });
        if (_score > currentThreshold) break;
        lastBitArr = bitArr;
    }
    var result = {
        isMatch: bestLocation >= 0,
        // Count exact matches (those with a score of 0) to be "almost" exact
        score: Math.max(0.001, finalScore)
    };
    if (computeMatches) {
        var indices = $84100f6a37fe0f58$var$convertMaskToIndices(matchMask, minMatchCharLength);
        if (!indices.length) result.isMatch = false;
        else if (includeMatches) result.indices = indices;
    }
    return result;
}
function $84100f6a37fe0f58$var$createPatternAlphabet(pattern) {
    var mask = {};
    for(var i = 0, len = pattern.length; i < len; i += 1){
        var _char = pattern.charAt(i);
        mask[_char] = (mask[_char] || 0) | 1 << len - i - 1;
    }
    return mask;
}
var $84100f6a37fe0f58$var$BitapSearch = /*#__PURE__*/ function() {
    function BitapSearch(pattern) {
        var _this = this;
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref$location = _ref.location, location = _ref$location === void 0 ? $84100f6a37fe0f58$var$Config.location : _ref$location, _ref$threshold = _ref.threshold, threshold = _ref$threshold === void 0 ? $84100f6a37fe0f58$var$Config.threshold : _ref$threshold, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? $84100f6a37fe0f58$var$Config.distance : _ref$distance, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? $84100f6a37fe0f58$var$Config.includeMatches : _ref$includeMatches, _ref$findAllMatches = _ref.findAllMatches, findAllMatches = _ref$findAllMatches === void 0 ? $84100f6a37fe0f58$var$Config.findAllMatches : _ref$findAllMatches, _ref$minMatchCharLeng = _ref.minMatchCharLength, minMatchCharLength = _ref$minMatchCharLeng === void 0 ? $84100f6a37fe0f58$var$Config.minMatchCharLength : _ref$minMatchCharLeng, _ref$isCaseSensitive = _ref.isCaseSensitive, isCaseSensitive = _ref$isCaseSensitive === void 0 ? $84100f6a37fe0f58$var$Config.isCaseSensitive : _ref$isCaseSensitive, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? $84100f6a37fe0f58$var$Config.ignoreLocation : _ref$ignoreLocation;
        $84100f6a37fe0f58$var$_classCallCheck(this, BitapSearch);
        this.options = {
            location: location,
            threshold: threshold,
            distance: distance,
            includeMatches: includeMatches,
            findAllMatches: findAllMatches,
            minMatchCharLength: minMatchCharLength,
            isCaseSensitive: isCaseSensitive,
            ignoreLocation: ignoreLocation
        };
        this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
        this.chunks = [];
        if (!this.pattern.length) return;
        var addChunk = function addChunk(pattern, startIndex) {
            _this.chunks.push({
                pattern: pattern,
                alphabet: $84100f6a37fe0f58$var$createPatternAlphabet(pattern),
                startIndex: startIndex
            });
        };
        var len = this.pattern.length;
        if (len > $84100f6a37fe0f58$var$MAX_BITS) {
            var i = 0;
            var remainder = len % $84100f6a37fe0f58$var$MAX_BITS;
            var end = len - remainder;
            while(i < end){
                addChunk(this.pattern.substr(i, $84100f6a37fe0f58$var$MAX_BITS), i);
                i += $84100f6a37fe0f58$var$MAX_BITS;
            }
            if (remainder) {
                var startIndex = len - $84100f6a37fe0f58$var$MAX_BITS;
                addChunk(this.pattern.substr(startIndex), startIndex);
            }
        } else addChunk(this.pattern, 0);
    }
    $84100f6a37fe0f58$var$_createClass(BitapSearch, [
        {
            key: "searchIn",
            value: function searchIn(text) {
                var _this$options = this.options, isCaseSensitive = _this$options.isCaseSensitive, includeMatches = _this$options.includeMatches;
                if (!isCaseSensitive) text = text.toLowerCase();
                 // Exact match
                if (this.pattern === text) {
                    var _result = {
                        isMatch: true,
                        score: 0
                    };
                    if (includeMatches) _result.indices = [
                        [
                            0,
                            text.length - 1
                        ]
                    ];
                    return _result;
                } // Otherwise, use Bitap algorithm
                var _this$options2 = this.options, location = _this$options2.location, distance = _this$options2.distance, threshold = _this$options2.threshold, findAllMatches = _this$options2.findAllMatches, minMatchCharLength = _this$options2.minMatchCharLength, ignoreLocation = _this$options2.ignoreLocation;
                var allIndices = [];
                var totalScore = 0;
                var hasMatches = false;
                this.chunks.forEach(function(_ref2) {
                    var pattern = _ref2.pattern, alphabet = _ref2.alphabet, startIndex = _ref2.startIndex;
                    var _search = $84100f6a37fe0f58$var$search(text, pattern, alphabet, {
                        location: location + startIndex,
                        distance: distance,
                        threshold: threshold,
                        findAllMatches: findAllMatches,
                        minMatchCharLength: minMatchCharLength,
                        includeMatches: includeMatches,
                        ignoreLocation: ignoreLocation
                    }), isMatch = _search.isMatch, score = _search.score, indices = _search.indices;
                    if (isMatch) hasMatches = true;
                    totalScore += score;
                    if (isMatch && indices) allIndices = [].concat($84100f6a37fe0f58$var$_toConsumableArray(allIndices), $84100f6a37fe0f58$var$_toConsumableArray(indices));
                });
                var result = {
                    isMatch: hasMatches,
                    score: hasMatches ? totalScore / this.chunks.length : 1
                };
                if (hasMatches && includeMatches) result.indices = allIndices;
                return result;
            }
        }
    ]);
    return BitapSearch;
}();
var $84100f6a37fe0f58$var$BaseMatch = /*#__PURE__*/ function() {
    function BaseMatch(pattern) {
        $84100f6a37fe0f58$var$_classCallCheck(this, BaseMatch);
        this.pattern = pattern;
    }
    $84100f6a37fe0f58$var$_createClass(BaseMatch, [
        {
            key: "search",
            value: function /*text*/ search() {}
        }
    ], [
        {
            key: "isMultiMatch",
            value: function isMultiMatch(pattern) {
                return $84100f6a37fe0f58$var$getMatch(pattern, this.multiRegex);
            }
        },
        {
            key: "isSingleMatch",
            value: function isSingleMatch(pattern) {
                return $84100f6a37fe0f58$var$getMatch(pattern, this.singleRegex);
            }
        }
    ]);
    return BaseMatch;
}();
function $84100f6a37fe0f58$var$getMatch(pattern, exp) {
    var matches = pattern.match(exp);
    return matches ? matches[1] : null;
}
var $84100f6a37fe0f58$var$ExactMatch = /*#__PURE__*/ function(_BaseMatch) {
    $84100f6a37fe0f58$var$_inherits(ExactMatch, _BaseMatch);
    var _super = $84100f6a37fe0f58$var$_createSuper(ExactMatch);
    function ExactMatch(pattern) {
        $84100f6a37fe0f58$var$_classCallCheck(this, ExactMatch);
        return _super.call(this, pattern);
    }
    $84100f6a37fe0f58$var$_createClass(ExactMatch, [
        {
            key: "search",
            value: function search(text) {
                var isMatch = text === this.pattern;
                return {
                    isMatch: isMatch,
                    score: isMatch ? 0 : 1,
                    indices: [
                        0,
                        this.pattern.length - 1
                    ]
                };
            }
        }
    ], [
        {
            key: "type",
            get: function get() {
                return "exact";
            }
        },
        {
            key: "multiRegex",
            get: function get() {
                return /^="(.*)"$/;
            }
        },
        {
            key: "singleRegex",
            get: function get() {
                return /^=(.*)$/;
            }
        }
    ]);
    return ExactMatch;
}($84100f6a37fe0f58$var$BaseMatch);
var $84100f6a37fe0f58$var$InverseExactMatch = /*#__PURE__*/ function(_BaseMatch) {
    $84100f6a37fe0f58$var$_inherits(InverseExactMatch, _BaseMatch);
    var _super = $84100f6a37fe0f58$var$_createSuper(InverseExactMatch);
    function InverseExactMatch(pattern) {
        $84100f6a37fe0f58$var$_classCallCheck(this, InverseExactMatch);
        return _super.call(this, pattern);
    }
    $84100f6a37fe0f58$var$_createClass(InverseExactMatch, [
        {
            key: "search",
            value: function search(text) {
                var index = text.indexOf(this.pattern);
                var isMatch = index === -1;
                return {
                    isMatch: isMatch,
                    score: isMatch ? 0 : 1,
                    indices: [
                        0,
                        text.length - 1
                    ]
                };
            }
        }
    ], [
        {
            key: "type",
            get: function get() {
                return "inverse-exact";
            }
        },
        {
            key: "multiRegex",
            get: function get() {
                return /^!"(.*)"$/;
            }
        },
        {
            key: "singleRegex",
            get: function get() {
                return /^!(.*)$/;
            }
        }
    ]);
    return InverseExactMatch;
}($84100f6a37fe0f58$var$BaseMatch);
var $84100f6a37fe0f58$var$PrefixExactMatch = /*#__PURE__*/ function(_BaseMatch) {
    $84100f6a37fe0f58$var$_inherits(PrefixExactMatch, _BaseMatch);
    var _super = $84100f6a37fe0f58$var$_createSuper(PrefixExactMatch);
    function PrefixExactMatch(pattern) {
        $84100f6a37fe0f58$var$_classCallCheck(this, PrefixExactMatch);
        return _super.call(this, pattern);
    }
    $84100f6a37fe0f58$var$_createClass(PrefixExactMatch, [
        {
            key: "search",
            value: function search(text) {
                var isMatch = text.startsWith(this.pattern);
                return {
                    isMatch: isMatch,
                    score: isMatch ? 0 : 1,
                    indices: [
                        0,
                        this.pattern.length - 1
                    ]
                };
            }
        }
    ], [
        {
            key: "type",
            get: function get() {
                return "prefix-exact";
            }
        },
        {
            key: "multiRegex",
            get: function get() {
                return /^\^"(.*)"$/;
            }
        },
        {
            key: "singleRegex",
            get: function get() {
                return /^\^(.*)$/;
            }
        }
    ]);
    return PrefixExactMatch;
}($84100f6a37fe0f58$var$BaseMatch);
var $84100f6a37fe0f58$var$InversePrefixExactMatch = /*#__PURE__*/ function(_BaseMatch) {
    $84100f6a37fe0f58$var$_inherits(InversePrefixExactMatch, _BaseMatch);
    var _super = $84100f6a37fe0f58$var$_createSuper(InversePrefixExactMatch);
    function InversePrefixExactMatch(pattern) {
        $84100f6a37fe0f58$var$_classCallCheck(this, InversePrefixExactMatch);
        return _super.call(this, pattern);
    }
    $84100f6a37fe0f58$var$_createClass(InversePrefixExactMatch, [
        {
            key: "search",
            value: function search(text) {
                var isMatch = !text.startsWith(this.pattern);
                return {
                    isMatch: isMatch,
                    score: isMatch ? 0 : 1,
                    indices: [
                        0,
                        text.length - 1
                    ]
                };
            }
        }
    ], [
        {
            key: "type",
            get: function get() {
                return "inverse-prefix-exact";
            }
        },
        {
            key: "multiRegex",
            get: function get() {
                return /^!\^"(.*)"$/;
            }
        },
        {
            key: "singleRegex",
            get: function get() {
                return /^!\^(.*)$/;
            }
        }
    ]);
    return InversePrefixExactMatch;
}($84100f6a37fe0f58$var$BaseMatch);
var $84100f6a37fe0f58$var$SuffixExactMatch = /*#__PURE__*/ function(_BaseMatch) {
    $84100f6a37fe0f58$var$_inherits(SuffixExactMatch, _BaseMatch);
    var _super = $84100f6a37fe0f58$var$_createSuper(SuffixExactMatch);
    function SuffixExactMatch(pattern) {
        $84100f6a37fe0f58$var$_classCallCheck(this, SuffixExactMatch);
        return _super.call(this, pattern);
    }
    $84100f6a37fe0f58$var$_createClass(SuffixExactMatch, [
        {
            key: "search",
            value: function search(text) {
                var isMatch = text.endsWith(this.pattern);
                return {
                    isMatch: isMatch,
                    score: isMatch ? 0 : 1,
                    indices: [
                        text.length - this.pattern.length,
                        text.length - 1
                    ]
                };
            }
        }
    ], [
        {
            key: "type",
            get: function get() {
                return "suffix-exact";
            }
        },
        {
            key: "multiRegex",
            get: function get() {
                return /^"(.*)"\$$/;
            }
        },
        {
            key: "singleRegex",
            get: function get() {
                return /^(.*)\$$/;
            }
        }
    ]);
    return SuffixExactMatch;
}($84100f6a37fe0f58$var$BaseMatch);
var $84100f6a37fe0f58$var$InverseSuffixExactMatch = /*#__PURE__*/ function(_BaseMatch) {
    $84100f6a37fe0f58$var$_inherits(InverseSuffixExactMatch, _BaseMatch);
    var _super = $84100f6a37fe0f58$var$_createSuper(InverseSuffixExactMatch);
    function InverseSuffixExactMatch(pattern) {
        $84100f6a37fe0f58$var$_classCallCheck(this, InverseSuffixExactMatch);
        return _super.call(this, pattern);
    }
    $84100f6a37fe0f58$var$_createClass(InverseSuffixExactMatch, [
        {
            key: "search",
            value: function search(text) {
                var isMatch = !text.endsWith(this.pattern);
                return {
                    isMatch: isMatch,
                    score: isMatch ? 0 : 1,
                    indices: [
                        0,
                        text.length - 1
                    ]
                };
            }
        }
    ], [
        {
            key: "type",
            get: function get() {
                return "inverse-suffix-exact";
            }
        },
        {
            key: "multiRegex",
            get: function get() {
                return /^!"(.*)"\$$/;
            }
        },
        {
            key: "singleRegex",
            get: function get() {
                return /^!(.*)\$$/;
            }
        }
    ]);
    return InverseSuffixExactMatch;
}($84100f6a37fe0f58$var$BaseMatch);
var $84100f6a37fe0f58$var$FuzzyMatch = /*#__PURE__*/ function(_BaseMatch) {
    $84100f6a37fe0f58$var$_inherits(FuzzyMatch, _BaseMatch);
    var _super = $84100f6a37fe0f58$var$_createSuper(FuzzyMatch);
    function FuzzyMatch(pattern) {
        var _this;
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref$location = _ref.location, location = _ref$location === void 0 ? $84100f6a37fe0f58$var$Config.location : _ref$location, _ref$threshold = _ref.threshold, threshold = _ref$threshold === void 0 ? $84100f6a37fe0f58$var$Config.threshold : _ref$threshold, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? $84100f6a37fe0f58$var$Config.distance : _ref$distance, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? $84100f6a37fe0f58$var$Config.includeMatches : _ref$includeMatches, _ref$findAllMatches = _ref.findAllMatches, findAllMatches = _ref$findAllMatches === void 0 ? $84100f6a37fe0f58$var$Config.findAllMatches : _ref$findAllMatches, _ref$minMatchCharLeng = _ref.minMatchCharLength, minMatchCharLength = _ref$minMatchCharLeng === void 0 ? $84100f6a37fe0f58$var$Config.minMatchCharLength : _ref$minMatchCharLeng, _ref$isCaseSensitive = _ref.isCaseSensitive, isCaseSensitive = _ref$isCaseSensitive === void 0 ? $84100f6a37fe0f58$var$Config.isCaseSensitive : _ref$isCaseSensitive, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? $84100f6a37fe0f58$var$Config.ignoreLocation : _ref$ignoreLocation;
        $84100f6a37fe0f58$var$_classCallCheck(this, FuzzyMatch);
        _this = _super.call(this, pattern);
        _this._bitapSearch = new $84100f6a37fe0f58$var$BitapSearch(pattern, {
            location: location,
            threshold: threshold,
            distance: distance,
            includeMatches: includeMatches,
            findAllMatches: findAllMatches,
            minMatchCharLength: minMatchCharLength,
            isCaseSensitive: isCaseSensitive,
            ignoreLocation: ignoreLocation
        });
        return _this;
    }
    $84100f6a37fe0f58$var$_createClass(FuzzyMatch, [
        {
            key: "search",
            value: function search(text) {
                return this._bitapSearch.searchIn(text);
            }
        }
    ], [
        {
            key: "type",
            get: function get() {
                return "fuzzy";
            }
        },
        {
            key: "multiRegex",
            get: function get() {
                return /^"(.*)"$/;
            }
        },
        {
            key: "singleRegex",
            get: function get() {
                return /^(.*)$/;
            }
        }
    ]);
    return FuzzyMatch;
}($84100f6a37fe0f58$var$BaseMatch);
var $84100f6a37fe0f58$var$IncludeMatch = /*#__PURE__*/ function(_BaseMatch) {
    $84100f6a37fe0f58$var$_inherits(IncludeMatch, _BaseMatch);
    var _super = $84100f6a37fe0f58$var$_createSuper(IncludeMatch);
    function IncludeMatch(pattern) {
        $84100f6a37fe0f58$var$_classCallCheck(this, IncludeMatch);
        return _super.call(this, pattern);
    }
    $84100f6a37fe0f58$var$_createClass(IncludeMatch, [
        {
            key: "search",
            value: function search(text) {
                var location = 0;
                var index;
                var indices = [];
                var patternLen = this.pattern.length; // Get all exact matches
                while((index = text.indexOf(this.pattern, location)) > -1){
                    location = index + patternLen;
                    indices.push([
                        index,
                        location - 1
                    ]);
                }
                var isMatch = !!indices.length;
                return {
                    isMatch: isMatch,
                    score: isMatch ? 0 : 1,
                    indices: indices
                };
            }
        }
    ], [
        {
            key: "type",
            get: function get() {
                return "include";
            }
        },
        {
            key: "multiRegex",
            get: function get() {
                return /^'"(.*)"$/;
            }
        },
        {
            key: "singleRegex",
            get: function get() {
                return /^'(.*)$/;
            }
        }
    ]);
    return IncludeMatch;
}($84100f6a37fe0f58$var$BaseMatch);
var $84100f6a37fe0f58$var$searchers = [
    $84100f6a37fe0f58$var$ExactMatch,
    $84100f6a37fe0f58$var$IncludeMatch,
    $84100f6a37fe0f58$var$PrefixExactMatch,
    $84100f6a37fe0f58$var$InversePrefixExactMatch,
    $84100f6a37fe0f58$var$InverseSuffixExactMatch,
    $84100f6a37fe0f58$var$SuffixExactMatch,
    $84100f6a37fe0f58$var$InverseExactMatch,
    $84100f6a37fe0f58$var$FuzzyMatch
];
var $84100f6a37fe0f58$var$searchersLen = $84100f6a37fe0f58$var$searchers.length; // Regex to split by spaces, but keep anything in quotes together
var $84100f6a37fe0f58$var$SPACE_RE = / +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;
var $84100f6a37fe0f58$var$OR_TOKEN = "|"; // Return a 2D array representation of the query, for simpler parsing.
// Example:
// "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
function $84100f6a37fe0f58$var$parseQuery(pattern) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return pattern.split($84100f6a37fe0f58$var$OR_TOKEN).map(function(item) {
        var query = item.trim().split($84100f6a37fe0f58$var$SPACE_RE).filter(function(item) {
            return item && !!item.trim();
        });
        var results = [];
        for(var i = 0, len = query.length; i < len; i += 1){
            var queryItem = query[i]; // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
            var found = false;
            var idx = -1;
            while(!found && ++idx < $84100f6a37fe0f58$var$searchersLen){
                var searcher = $84100f6a37fe0f58$var$searchers[idx];
                var token = searcher.isMultiMatch(queryItem);
                if (token) {
                    results.push(new searcher(token, options));
                    found = true;
                }
            }
            if (found) continue;
             // 2. Handle single query matches (i.e, once that are *not* quoted)
            idx = -1;
            while(++idx < $84100f6a37fe0f58$var$searchersLen){
                var _searcher = $84100f6a37fe0f58$var$searchers[idx];
                var _token = _searcher.isSingleMatch(queryItem);
                if (_token) {
                    results.push(new _searcher(_token, options));
                    break;
                }
            }
        }
        return results;
    });
}
// to a singl match
var $84100f6a37fe0f58$var$MultiMatchSet = new Set([
    $84100f6a37fe0f58$var$FuzzyMatch.type,
    $84100f6a37fe0f58$var$IncludeMatch.type
]);
/**
 * Command-like searching
 * ======================
 *
 * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
 * search in a given text.
 *
 * Search syntax:
 *
 * | Token       | Match type                 | Description                            |
 * | ----------- | -------------------------- | -------------------------------------- |
 * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
 * | `=scheme`   | exact-match                | Items that are `scheme`                |
 * | `'python`   | include-match              | Items that include `python`            |
 * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
 * | `^java`     | prefix-exact-match         | Items that start with `java`           |
 * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
 * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
 * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
 *
 * A single pipe character acts as an OR operator. For example, the following
 * query matches entries that start with `core` and end with either`go`, `rb`,
 * or`py`.
 *
 * ```
 * ^core go$ | rb$ | py$
 * ```
 */ var $84100f6a37fe0f58$var$ExtendedSearch = /*#__PURE__*/ function() {
    function ExtendedSearch(pattern) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref$isCaseSensitive = _ref.isCaseSensitive, isCaseSensitive = _ref$isCaseSensitive === void 0 ? $84100f6a37fe0f58$var$Config.isCaseSensitive : _ref$isCaseSensitive, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? $84100f6a37fe0f58$var$Config.includeMatches : _ref$includeMatches, _ref$minMatchCharLeng = _ref.minMatchCharLength, minMatchCharLength = _ref$minMatchCharLeng === void 0 ? $84100f6a37fe0f58$var$Config.minMatchCharLength : _ref$minMatchCharLeng, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? $84100f6a37fe0f58$var$Config.ignoreLocation : _ref$ignoreLocation, _ref$findAllMatches = _ref.findAllMatches, findAllMatches = _ref$findAllMatches === void 0 ? $84100f6a37fe0f58$var$Config.findAllMatches : _ref$findAllMatches, _ref$location = _ref.location, location = _ref$location === void 0 ? $84100f6a37fe0f58$var$Config.location : _ref$location, _ref$threshold = _ref.threshold, threshold = _ref$threshold === void 0 ? $84100f6a37fe0f58$var$Config.threshold : _ref$threshold, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? $84100f6a37fe0f58$var$Config.distance : _ref$distance;
        $84100f6a37fe0f58$var$_classCallCheck(this, ExtendedSearch);
        this.query = null;
        this.options = {
            isCaseSensitive: isCaseSensitive,
            includeMatches: includeMatches,
            minMatchCharLength: minMatchCharLength,
            findAllMatches: findAllMatches,
            ignoreLocation: ignoreLocation,
            location: location,
            threshold: threshold,
            distance: distance
        };
        this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
        this.query = $84100f6a37fe0f58$var$parseQuery(this.pattern, this.options);
    }
    $84100f6a37fe0f58$var$_createClass(ExtendedSearch, [
        {
            key: "searchIn",
            value: function searchIn(text) {
                var query = this.query;
                if (!query) return {
                    isMatch: false,
                    score: 1
                };
                var _this$options = this.options, includeMatches = _this$options.includeMatches, isCaseSensitive = _this$options.isCaseSensitive;
                text = isCaseSensitive ? text : text.toLowerCase();
                var numMatches = 0;
                var allIndices = [];
                var totalScore = 0; // ORs
                for(var i = 0, qLen = query.length; i < qLen; i += 1){
                    var searchers = query[i]; // Reset indices
                    allIndices.length = 0;
                    numMatches = 0; // ANDs
                    for(var j = 0, pLen = searchers.length; j < pLen; j += 1){
                        var searcher = searchers[j];
                        var _searcher$search = searcher.search(text), isMatch = _searcher$search.isMatch, indices = _searcher$search.indices, score = _searcher$search.score;
                        if (isMatch) {
                            numMatches += 1;
                            totalScore += score;
                            if (includeMatches) {
                                var type = searcher.constructor.type;
                                if ($84100f6a37fe0f58$var$MultiMatchSet.has(type)) allIndices = [].concat($84100f6a37fe0f58$var$_toConsumableArray(allIndices), $84100f6a37fe0f58$var$_toConsumableArray(indices));
                                else allIndices.push(indices);
                            }
                        } else {
                            totalScore = 0;
                            numMatches = 0;
                            allIndices.length = 0;
                            break;
                        }
                    } // OR condition, so if TRUE, return
                    if (numMatches) {
                        var result = {
                            isMatch: true,
                            score: totalScore / numMatches
                        };
                        if (includeMatches) result.indices = allIndices;
                        return result;
                    }
                } // Nothing was matched
                return {
                    isMatch: false,
                    score: 1
                };
            }
        }
    ], [
        {
            key: "condition",
            value: function condition(_, options) {
                return options.useExtendedSearch;
            }
        }
    ]);
    return ExtendedSearch;
}();
var $84100f6a37fe0f58$var$registeredSearchers = [];
function $84100f6a37fe0f58$var$register() {
    $84100f6a37fe0f58$var$registeredSearchers.push.apply($84100f6a37fe0f58$var$registeredSearchers, arguments);
}
function $84100f6a37fe0f58$var$createSearcher(pattern, options) {
    for(var i = 0, len = $84100f6a37fe0f58$var$registeredSearchers.length; i < len; i += 1){
        var searcherClass = $84100f6a37fe0f58$var$registeredSearchers[i];
        if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
    }
    return new $84100f6a37fe0f58$var$BitapSearch(pattern, options);
}
var $84100f6a37fe0f58$var$LogicalOperator = {
    AND: "$and",
    OR: "$or"
};
var $84100f6a37fe0f58$var$KeyType = {
    PATH: "$path",
    PATTERN: "$val"
};
var $84100f6a37fe0f58$var$isExpression = function isExpression(query) {
    return !!(query[$84100f6a37fe0f58$var$LogicalOperator.AND] || query[$84100f6a37fe0f58$var$LogicalOperator.OR]);
};
var $84100f6a37fe0f58$var$isPath = function isPath(query) {
    return !!query[$84100f6a37fe0f58$var$KeyType.PATH];
};
var $84100f6a37fe0f58$var$isLeaf = function isLeaf(query) {
    return !$84100f6a37fe0f58$var$isArray(query) && $84100f6a37fe0f58$var$isObject(query) && !$84100f6a37fe0f58$var$isExpression(query);
};
var $84100f6a37fe0f58$var$convertToExplicit = function convertToExplicit(query) {
    return $84100f6a37fe0f58$var$_defineProperty({}, $84100f6a37fe0f58$var$LogicalOperator.AND, Object.keys(query).map(function(key) {
        return $84100f6a37fe0f58$var$_defineProperty({}, key, query[key]);
    }));
}; // When `auto` is `true`, the parse function will infer and initialize and add
// the appropriate `Searcher` instance
function $84100f6a37fe0f58$var$parse(query, options) {
    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}, _ref3$auto = _ref3.auto, auto = _ref3$auto === void 0 ? true : _ref3$auto;
    var next = function next(query) {
        var keys = Object.keys(query);
        var isQueryPath = $84100f6a37fe0f58$var$isPath(query);
        if (!isQueryPath && keys.length > 1 && !$84100f6a37fe0f58$var$isExpression(query)) return next($84100f6a37fe0f58$var$convertToExplicit(query));
        if ($84100f6a37fe0f58$var$isLeaf(query)) {
            var key = isQueryPath ? query[$84100f6a37fe0f58$var$KeyType.PATH] : keys[0];
            var pattern = isQueryPath ? query[$84100f6a37fe0f58$var$KeyType.PATTERN] : query[key];
            if (!$84100f6a37fe0f58$var$isString(pattern)) throw new Error($84100f6a37fe0f58$var$LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
            var obj = {
                keyId: $84100f6a37fe0f58$var$createKeyId(key),
                pattern: pattern
            };
            if (auto) obj.searcher = $84100f6a37fe0f58$var$createSearcher(pattern, options);
            return obj;
        }
        var node = {
            children: [],
            operator: keys[0]
        };
        keys.forEach(function(key) {
            var value = query[key];
            if ($84100f6a37fe0f58$var$isArray(value)) value.forEach(function(item) {
                node.children.push(next(item));
            });
        });
        return node;
    };
    if (!$84100f6a37fe0f58$var$isExpression(query)) query = $84100f6a37fe0f58$var$convertToExplicit(query);
    return next(query);
}
function $84100f6a37fe0f58$var$computeScore(results, _ref) {
    var _ref$ignoreFieldNorm = _ref.ignoreFieldNorm, ignoreFieldNorm = _ref$ignoreFieldNorm === void 0 ? $84100f6a37fe0f58$var$Config.ignoreFieldNorm : _ref$ignoreFieldNorm;
    results.forEach(function(result) {
        var totalScore = 1;
        result.matches.forEach(function(_ref2) {
            var key = _ref2.key, norm = _ref2.norm, score = _ref2.score;
            var weight = key ? key.weight : null;
            totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
        });
        result.score = totalScore;
    });
}
function $84100f6a37fe0f58$var$transformMatches(result, data) {
    var matches = result.matches;
    data.matches = [];
    if (!$84100f6a37fe0f58$var$isDefined(matches)) return;
    matches.forEach(function(match) {
        if (!$84100f6a37fe0f58$var$isDefined(match.indices) || !match.indices.length) return;
        var indices = match.indices, value = match.value;
        var obj = {
            indices: indices,
            value: value
        };
        if (match.key) obj.key = match.key.src;
        if (match.idx > -1) obj.refIndex = match.idx;
        data.matches.push(obj);
    });
}
function $84100f6a37fe0f58$var$transformScore(result, data) {
    data.score = result.score;
}
function $84100f6a37fe0f58$var$format(results, docs) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? $84100f6a37fe0f58$var$Config.includeMatches : _ref$includeMatches, _ref$includeScore = _ref.includeScore, includeScore = _ref$includeScore === void 0 ? $84100f6a37fe0f58$var$Config.includeScore : _ref$includeScore;
    var transformers = [];
    if (includeMatches) transformers.push($84100f6a37fe0f58$var$transformMatches);
    if (includeScore) transformers.push($84100f6a37fe0f58$var$transformScore);
    return results.map(function(result) {
        var idx = result.idx;
        var data = {
            item: docs[idx],
            refIndex: idx
        };
        if (transformers.length) transformers.forEach(function(transformer) {
            transformer(result, data);
        });
        return data;
    });
}
var $84100f6a37fe0f58$var$Fuse$1 = /*#__PURE__*/ function() {
    function Fuse(docs) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var index = arguments.length > 2 ? arguments[2] : undefined;
        $84100f6a37fe0f58$var$_classCallCheck(this, Fuse);
        this.options = $84100f6a37fe0f58$var$_objectSpread2($84100f6a37fe0f58$var$_objectSpread2({}, $84100f6a37fe0f58$var$Config), options);
        this.options.useExtendedSearch;
        this._keyStore = new $84100f6a37fe0f58$var$KeyStore(this.options.keys);
        this.setCollection(docs, index);
    }
    $84100f6a37fe0f58$var$_createClass(Fuse, [
        {
            key: "setCollection",
            value: function setCollection(docs, index) {
                this._docs = docs;
                if (index && !(index instanceof $84100f6a37fe0f58$var$FuseIndex)) throw new Error($84100f6a37fe0f58$var$INCORRECT_INDEX_TYPE);
                this._myIndex = index || $84100f6a37fe0f58$var$createIndex(this.options.keys, this._docs, {
                    getFn: this.options.getFn,
                    fieldNormWeight: this.options.fieldNormWeight
                });
            }
        },
        {
            key: "add",
            value: function add(doc) {
                if (!$84100f6a37fe0f58$var$isDefined(doc)) return;
                this._docs.push(doc);
                this._myIndex.add(doc);
            }
        },
        {
            key: "remove",
            value: function remove() {
                var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function() /* doc, idx */ {
                    return false;
                };
                var results = [];
                for(var i = 0, len = this._docs.length; i < len; i += 1){
                    var doc = this._docs[i];
                    if (predicate(doc, i)) {
                        this.removeAt(i);
                        i -= 1;
                        len -= 1;
                        results.push(doc);
                    }
                }
                return results;
            }
        },
        {
            key: "removeAt",
            value: function removeAt(idx) {
                this._docs.splice(idx, 1);
                this._myIndex.removeAt(idx);
            }
        },
        {
            key: "getIndex",
            value: function getIndex() {
                return this._myIndex;
            }
        },
        {
            key: "search",
            value: function search(query) {
                var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? -1 : _ref$limit;
                var _this$options = this.options, includeMatches = _this$options.includeMatches, includeScore = _this$options.includeScore, shouldSort = _this$options.shouldSort, sortFn = _this$options.sortFn, ignoreFieldNorm = _this$options.ignoreFieldNorm;
                var results = $84100f6a37fe0f58$var$isString(query) ? $84100f6a37fe0f58$var$isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
                $84100f6a37fe0f58$var$computeScore(results, {
                    ignoreFieldNorm: ignoreFieldNorm
                });
                if (shouldSort) results.sort(sortFn);
                if ($84100f6a37fe0f58$var$isNumber(limit) && limit > -1) results = results.slice(0, limit);
                return $84100f6a37fe0f58$var$format(results, this._docs, {
                    includeMatches: includeMatches,
                    includeScore: includeScore
                });
            }
        },
        {
            key: "_searchStringList",
            value: function _searchStringList(query) {
                var searcher = $84100f6a37fe0f58$var$createSearcher(query, this.options);
                var records = this._myIndex.records;
                var results = []; // Iterate over every string in the index
                records.forEach(function(_ref2) {
                    var text = _ref2.v, idx = _ref2.i, norm = _ref2.n;
                    if (!$84100f6a37fe0f58$var$isDefined(text)) return;
                    var _searcher$searchIn = searcher.searchIn(text), isMatch = _searcher$searchIn.isMatch, score = _searcher$searchIn.score, indices = _searcher$searchIn.indices;
                    if (isMatch) results.push({
                        item: text,
                        idx: idx,
                        matches: [
                            {
                                score: score,
                                value: text,
                                norm: norm,
                                indices: indices
                            }
                        ]
                    });
                });
                return results;
            }
        },
        {
            key: "_searchLogical",
            value: function _searchLogical(query) {
                var _this = this;
                var expression = $84100f6a37fe0f58$var$parse(query, this.options);
                var evaluate = function evaluate(node, item, idx) {
                    if (!node.children) {
                        var keyId = node.keyId, searcher = node.searcher;
                        var matches = _this._findMatches({
                            key: _this._keyStore.get(keyId),
                            value: _this._myIndex.getValueForItemAtKeyId(item, keyId),
                            searcher: searcher
                        });
                        if (matches && matches.length) return [
                            {
                                idx: idx,
                                item: item,
                                matches: matches
                            }
                        ];
                        return [];
                    }
                    var res = [];
                    for(var i = 0, len = node.children.length; i < len; i += 1){
                        var child = node.children[i];
                        var result = evaluate(child, item, idx);
                        if (result.length) res.push.apply(res, $84100f6a37fe0f58$var$_toConsumableArray(result));
                        else if (node.operator === $84100f6a37fe0f58$var$LogicalOperator.AND) return [];
                    }
                    return res;
                };
                var records = this._myIndex.records;
                var resultMap = {};
                var results = [];
                records.forEach(function(_ref3) {
                    var item = _ref3.$, idx = _ref3.i;
                    if ($84100f6a37fe0f58$var$isDefined(item)) {
                        var expResults = evaluate(expression, item, idx);
                        if (expResults.length) {
                            // Dedupe when adding
                            if (!resultMap[idx]) {
                                resultMap[idx] = {
                                    idx: idx,
                                    item: item,
                                    matches: []
                                };
                                results.push(resultMap[idx]);
                            }
                            expResults.forEach(function(_ref4) {
                                var _resultMap$idx$matche;
                                var matches = _ref4.matches;
                                (_resultMap$idx$matche = resultMap[idx].matches).push.apply(_resultMap$idx$matche, $84100f6a37fe0f58$var$_toConsumableArray(matches));
                            });
                        }
                    }
                });
                return results;
            }
        },
        {
            key: "_searchObjectList",
            value: function _searchObjectList(query) {
                var _this2 = this;
                var searcher = $84100f6a37fe0f58$var$createSearcher(query, this.options);
                var _this$_myIndex = this._myIndex, keys = _this$_myIndex.keys, records = _this$_myIndex.records;
                var results = []; // List is Array<Object>
                records.forEach(function(_ref5) {
                    var item = _ref5.$, idx = _ref5.i;
                    if (!$84100f6a37fe0f58$var$isDefined(item)) return;
                    var matches = []; // Iterate over every key (i.e, path), and fetch the value at that key
                    keys.forEach(function(key, keyIndex) {
                        matches.push.apply(matches, $84100f6a37fe0f58$var$_toConsumableArray(_this2._findMatches({
                            key: key,
                            value: item[keyIndex],
                            searcher: searcher
                        })));
                    });
                    if (matches.length) results.push({
                        idx: idx,
                        item: item,
                        matches: matches
                    });
                });
                return results;
            }
        },
        {
            key: "_findMatches",
            value: function _findMatches(_ref6) {
                var key = _ref6.key, value = _ref6.value, searcher = _ref6.searcher;
                if (!$84100f6a37fe0f58$var$isDefined(value)) return [];
                var matches = [];
                if ($84100f6a37fe0f58$var$isArray(value)) value.forEach(function(_ref7) {
                    var text = _ref7.v, idx = _ref7.i, norm = _ref7.n;
                    if (!$84100f6a37fe0f58$var$isDefined(text)) return;
                    var _searcher$searchIn2 = searcher.searchIn(text), isMatch = _searcher$searchIn2.isMatch, score = _searcher$searchIn2.score, indices = _searcher$searchIn2.indices;
                    if (isMatch) matches.push({
                        score: score,
                        key: key,
                        value: text,
                        idx: idx,
                        norm: norm,
                        indices: indices
                    });
                });
                else {
                    var text = value.v, norm = value.n;
                    var _searcher$searchIn3 = searcher.searchIn(text), isMatch = _searcher$searchIn3.isMatch, score = _searcher$searchIn3.score, indices = _searcher$searchIn3.indices;
                    if (isMatch) matches.push({
                        score: score,
                        key: key,
                        value: text,
                        norm: norm,
                        indices: indices
                    });
                }
                return matches;
            }
        }
    ]);
    return Fuse;
}();
$84100f6a37fe0f58$var$Fuse$1.version = "6.5.3";
$84100f6a37fe0f58$var$Fuse$1.createIndex = $84100f6a37fe0f58$var$createIndex;
$84100f6a37fe0f58$var$Fuse$1.parseIndex = $84100f6a37fe0f58$var$parseIndex;
$84100f6a37fe0f58$var$Fuse$1.config = $84100f6a37fe0f58$var$Config;
$84100f6a37fe0f58$var$Fuse$1.parseQuery = $84100f6a37fe0f58$var$parse;
$84100f6a37fe0f58$var$register($84100f6a37fe0f58$var$ExtendedSearch);
var $84100f6a37fe0f58$export$93605f466b8506d8 = $84100f6a37fe0f58$var$Fuse$1;

});


parcelRequire.register("i3Lk1", function(module, exports) {

$parcel$export(module.exports, "default", () => $d25d36f78dd348f1$export$2e2bcd8739ae039);

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");

var $5JxHT = parcelRequire("5JxHT");
class $d25d36f78dd348f1$export$2e2bcd8739ae039 extends FormApplication {
    constructor(object, img, regenStyle){
        super({}, {});
        this.object = object;
        this.img = img;
        this.regenStyle = regenStyle;
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-user-list",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/userList.html",
            resizable: false,
            minimizable: false,
            title: "User To Image",
            width: 300
        });
    }
    async getData(options) {
        const data = super.getData(options);
        const mappings = this.object.document.getFlag("token-variants", "userMappings") || {};
        let users = [];
        game.users.forEach((user)=>{
            users.push({
                avatar: user.avatar,
                name: user.name,
                apply: user.id in mappings && mappings[user.id] === this.img,
                userId: user.id,
                color: user.color
            });
        });
        data.users = users;
        data.invisibleImage = (0, $b2HDo.TVA_CONFIG).invisibleImage;
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        (0, $5JxHT.insertArtSelectButton)(html, "invisibleImage", {
            search: "Invisible Image",
            searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN
        });
    }
    async _updateObject(event, formData) {
        const mappings = this.object.document.getFlag("token-variants", "userMappings") || {};
        if (formData.invisibleImage !== (0, $b2HDo.TVA_CONFIG).invisibleImage) (0, $b2HDo.updateSettings)({
            invisibleImage: (0, $1mRWy.decodeURISafely)(formData.invisibleImage)
        });
        delete formData.invisibleImage;
        const affectedImages = [
            this.img
        ];
        for (const [userId, apply] of Object.entries(formData)){
            if (apply) {
                if (mappings[userId] && mappings[userId] !== this.img) affectedImages.push(mappings[userId]);
                mappings[userId] = this.img;
            } else if (mappings[userId] === this.img) {
                delete mappings[userId];
                mappings["-=" + userId] = null;
            }
        }
        if (Object.keys(mappings).filter((userId)=>!userId.startsWith("-=")).length === 0) await this.object.document.unsetFlag("token-variants", "userMappings");
        else await this.object.document.setFlag("token-variants", "userMappings", mappings);
        for (const img of affectedImages)this.regenStyle(this.object, img);
    }
}

});


parcelRequire.register("k05qb", function(module, exports) {

$parcel$export(module.exports, "TOKEN_HUD_VARIANTS", () => $e8f8034e87beca45$export$584c9acde3dd56ba);
$parcel$export(module.exports, "renderTokenHUD", () => $e8f8034e87beca45$export$42b0bd17e532cdc8);

var $1mRWy = parcelRequire("1mRWy");

var $cQdfX = parcelRequire("cQdfX");

var $1v9Gt = parcelRequire("1v9Gt");

var $b2HDo = parcelRequire("b2HDo");

var $i3Lk1 = parcelRequire("i3Lk1");

var $7ymXi = parcelRequire("7ymXi");

var $BiYHP = parcelRequire("BiYHP");

var $g3wZB = parcelRequire("g3wZB");
const $e8f8034e87beca45$export$584c9acde3dd56ba = {
    variants: null,
    actor: null
};
async function $e8f8034e87beca45$export$42b0bd17e532cdc8(hud, html, token, searchText = "", fp_files = null) {
    $e8f8034e87beca45$var$activateStatusEffectListeners(token);
    const hudSettings = (0, $b2HDo.TVA_CONFIG).hud;
    const FULL_ACCESS = (0, $b2HDo.TVA_CONFIG).permissions.hudFullAccess[game.user.role];
    const PARTIAL_ACCESS = (0, $b2HDo.TVA_CONFIG).permissions.hud[game.user.role];
    // Check if the HUD button should be displayed
    if (!hudSettings.enableSideMenu || !PARTIAL_ACCESS && !FULL_ACCESS || token.flags["token-variants"]?.disableHUDButton) return;
    const tokenActor = game.actors.get(token.actorId);
    // Disable button if Token HUD Wildcard is enabled and appropriate setting is set
    if ((0, $b2HDo.TVA_CONFIG).worldHud.disableIfTHWEnabled && game.modules.get("token-hud-wildcard")?.active) {
        if (tokenActor && tokenActor.prototypeToken.randomImg) return;
    }
    const button = $(`
  <div class="control-icon" data-action="token-variants-side-selector">
    <img
      id="token-variants-side-button"
      src="modules/token-variants/img/token-images.svg"
      width="36"
      height="36"
      title="Left-click: Image Menu&#013;Right-click: Search & Additional settings"
    />
  </div>
`);
    html.find("div.right").last().append(button);
    html.find("div.right").click($e8f8034e87beca45$var$_deactivateTokenVariantsSideSelector);
    button.click((event)=>$e8f8034e87beca45$var$_onButtonClick(event, token));
    if (FULL_ACCESS) button.contextmenu((event)=>$e8f8034e87beca45$var$_onButtonRightClick(event, hud, html, token));
}
async function $e8f8034e87beca45$var$_onButtonClick(event, token) {
    const button = $(event.target).closest(".control-icon");
    // De-activate 'Status Effects'
    button.closest("div.right").find("div.control-icon.effects").removeClass("active");
    button.closest("div.right").find(".status-effects").removeClass("active");
    // Remove contextmenu
    button.find(".contextmenu").remove();
    // Toggle variants side menu
    button.toggleClass("active");
    let variantsWrap = button.find(".token-variants-wrap");
    if (button.hasClass("active")) {
        if (!variantsWrap.length) {
            variantsWrap = await $e8f8034e87beca45$var$renderSideSelect(token);
            if (variantsWrap) button.find("img").after(variantsWrap);
            else return;
        }
        variantsWrap.addClass("active");
    } else variantsWrap.removeClass("active");
}
function $e8f8034e87beca45$var$_onButtonRightClick(event, hud, html, token) {
    // Display side menu if button is not active yet
    const button = $(event.target).closest(".control-icon");
    if (!button.hasClass("active")) // button.trigger('click');
    button.addClass("active");
    if (button.find(".contextmenu").length) {
        // Contextmenu already displayed. Remove and activate images
        button.find(".contextmenu").remove();
        button.removeClass("active").trigger("click");
    //button.find('.token-variants-wrap.images').addClass('active');
    } else {
        // Contextmenu is not displayed. Hide images, create it and add it
        button.find(".token-variants-wrap.images").removeClass("active");
        const contextMenu = $(`
    <div class="token-variants-wrap contextmenu active">
      <div class="token-variants-context-menu active">
        <input class="token-variants-side-search" type="text" />
        <button class="flags" type="button"><i class="fab fa-font-awesome-flag"></i><label>Flags</label></button>
        <button class="file-picker" type="button"><i class="fas fa-file-import fa-fw"></i><label>Browse Folders</label></button>
        <button class="effectConfig" type="button"><i class="fas fa-sun"></i><label>Mappings</label></button>
        <button class="randomizerConfig" type="button"><i class="fas fa-dice"></i><label>Randomizer</label></button>
      </div>
    </div>
      `);
        button.append(contextMenu);
        // Register contextmenu listeners
        contextMenu.find(".token-variants-side-search").on("keyup", (event)=>$e8f8034e87beca45$var$_onImageSearchKeyUp(event, token)).on("click", (event)=>{
            event.preventDefault();
            event.stopPropagation();
        });
        contextMenu.find(".flags").click((event)=>{
            const tkn = canvas.tokens.get(token._id);
            if (tkn) {
                event.preventDefault();
                event.stopPropagation();
                new (0, $7ymXi.default)(tkn).render(true);
            }
        });
        contextMenu.find(".file-picker").click(async (event)=>{
            event.preventDefault();
            event.stopPropagation();
            new FilePicker({
                type: "imagevideo",
                callback: async (path, fp)=>{
                    const content = await FilePicker.browse(fp.activeSource, fp.result.target);
                    let files = content.files.filter((f)=>(0, $1mRWy.isImage)(f) || (0, $1mRWy.isVideo)(f));
                    if (files.length) {
                        button.find(".token-variants-wrap").remove();
                        const sideSelect = await $e8f8034e87beca45$var$renderSideSelect(token, "", files);
                        if (sideSelect) {
                            sideSelect.addClass("active");
                            button.append(sideSelect);
                        }
                    }
                }
            }).render(true);
        });
        contextMenu.find(".effectConfig").click((event)=>{
            new (0, $1v9Gt.default)(token).render(true);
        });
        contextMenu.find(".randomizerConfig").click((event)=>{
            new (0, $BiYHP.default)(token).render(true);
        });
    }
}
function $e8f8034e87beca45$var$_deactivateTokenVariantsSideSelector(event) {
    const controlIcon = $(event.target).closest(".control-icon");
    const dataAction = controlIcon.attr("data-action");
    switch(dataAction){
        case "effects":
            break; // Effects button
        case "thwildcard-selector":
            break; // Token HUD Wildcard module button
        default:
            return;
    }
    $(event.target).closest("div.right").find('.control-icon[data-action="token-variants-side-selector"]').removeClass("active");
    $(event.target).closest("div.right").find(".token-variants-wrap").removeClass("active");
}
async function $e8f8034e87beca45$var$renderSideSelect(token, searchText = "", fp_files = null) {
    const hudSettings = (0, $b2HDo.TVA_CONFIG).hud;
    const worldHudSettings = (0, $b2HDo.TVA_CONFIG).worldHud;
    const FULL_ACCESS = (0, $b2HDo.TVA_CONFIG).permissions.hudFullAccess[game.user.role];
    const PARTIAL_ACCESS = (0, $b2HDo.TVA_CONFIG).permissions.hud[game.user.role];
    const tokenActor = game.actors.get(token.actorId);
    let images = [];
    let actorVariants = [];
    let imageDuplicates = new Set();
    const pushImage = (img)=>{
        if (imageDuplicates.has(img.path)) {
            if (!images.find((obj)=>obj.path === img.path && obj.name === img.name)) images.push(img);
        } else {
            images.push(img);
            imageDuplicates.add(img.path);
        }
    };
    actorVariants = $e8f8034e87beca45$var$getVariants(tokenActor);
    if (!fp_files) {
        if (!searchText) {
            // Insert current token image
            if (token.texture?.src && token.texture?.src !== CONST.DEFAULT_TOKEN) pushImage({
                path: (0, $1mRWy.decodeURISafely)(token.texture.src),
                name: token.flags?.["token-variants"]?.name ?? (0, $1mRWy.getFileName)(token.texture.src)
            });
            if (tokenActor) {
                // Insert default token image
                const defaultImg = tokenActor.prototypeToken?.flags["token-variants"]?.["randomImgDefault"] || tokenActor.prototypeToken?.flags["token-hud-wildcard"]?.["default"] || "";
                if (defaultImg) pushImage({
                    path: (0, $1mRWy.decodeURISafely)(defaultImg),
                    name: (0, $1mRWy.getFileName)(defaultImg)
                });
                if (FULL_ACCESS || PARTIAL_ACCESS) actorVariants.forEach((variant)=>{
                    for (const name of variant.names)pushImage({
                        path: (0, $1mRWy.decodeURISafely)(variant.imgSrc),
                        name: name
                    });
                });
                // Parse directory flag and include the images
                if (FULL_ACCESS || PARTIAL_ACCESS) {
                    const directoryFlag = tokenActor.getFlag("token-variants", "directory");
                    if (directoryFlag) {
                        let dirFlagImages;
                        try {
                            let path = directoryFlag.path;
                            let source = directoryFlag.source;
                            let bucket = "";
                            if (source.startsWith("s3:")) {
                                bucket = source.substring(3, source.length);
                                source = "s3";
                            }
                            const content = await FilePicker.browse(source, path, {
                                type: "imagevideo",
                                bucket: bucket
                            });
                            dirFlagImages = content.files;
                        } catch (err) {
                            dirFlagImages = [];
                        }
                        dirFlagImages = dirFlagImages.forEach((f)=>{
                            if ((0, $1mRWy.isImage)(f) || (0, $1mRWy.isVideo)(f)) pushImage({
                                path: (0, $1mRWy.decodeURISafely)(f),
                                name: (0, $1mRWy.getFileName)(f)
                            });
                        });
                    }
                }
                if ((FULL_ACCESS || PARTIAL_ACCESS) && worldHudSettings.includeWildcard && !worldHudSettings.displayOnlySharedImages) {
                    // Merge wildcard images
                    const protoImg = tokenActor.prototypeToken.texture.src;
                    if (tokenActor.prototypeToken.randomImg) (await tokenActor.getTokenImages()).filter((img)=>!img.includes("*")).forEach((img)=>{
                        pushImage({
                            path: (0, $1mRWy.decodeURISafely)(img),
                            name: (0, $1mRWy.getFileName)(img)
                        });
                    });
                    else if (protoImg.includes("*") || protoImg.includes("{") || protoImg.includes("}")) {
                        // Modified version of Actor.getTokenImages()
                        const getTokenImages = async ()=>{
                            if (tokenActor._tokenImages) return tokenActor._tokenImages;
                            let source = "data";
                            let pattern = tokenActor.prototypeToken.texture.src;
                            const browseOptions = {
                                wildcard: true
                            };
                            // Support non-user sources
                            if (/\.s3\./.test(pattern)) {
                                source = "s3";
                                const { bucket: bucket, keyPrefix: keyPrefix } = FilePicker.parseS3URL(pattern);
                                if (bucket) {
                                    browseOptions.bucket = bucket;
                                    pattern = keyPrefix;
                                }
                            } else if (pattern.startsWith("icons/")) source = "public";
                            // Retrieve wildcard content
                            try {
                                const content = await FilePicker.browse(source, pattern, browseOptions);
                                tokenActor._tokenImages = content.files;
                            } catch (err) {
                                tokenActor._tokenImages = [];
                            }
                            return tokenActor._tokenImages;
                        };
                        (await getTokenImages()).filter((img)=>!img.includes("*") && ((0, $1mRWy.isImage)(img) || (0, $1mRWy.isVideo)(img))).forEach((variant)=>{
                            pushImage({
                                path: (0, $1mRWy.decodeURISafely)(variant),
                                name: (0, $1mRWy.getFileName)(variant)
                            });
                        });
                    }
                }
            }
        }
        // Perform image search if needed
        if (FULL_ACCESS) {
            let search;
            if (searchText) search = searchText.length > 2 ? searchText : null;
            else {
                if (worldHudSettings.displayOnlySharedImages || tokenActor?.getFlag("token-variants", "disableNameSearch")) ;
                else if (token.name.length > 2) search = token.name;
            }
            if (search) {
                let artSearch = await (0, $g3wZB.doImageSearch)(search, {
                    searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN,
                    searchOptions: {
                        keywordSearch: worldHudSettings.includeKeywords
                    }
                });
                // Merge full search, and keywords into a single array
                if (artSearch) artSearch.forEach((results)=>{
                    results.forEach((img)=>pushImage(img));
                });
            }
        }
    } else images = fp_files.map((f)=>{
        return {
            path: (0, $1mRWy.decodeURISafely)(f),
            name: (0, $1mRWy.getFileName)(f)
        };
    });
    // Retrieving the possibly custom name attached as a flag to the token
    let tokenImageName = "";
    if (token.flags["token-variants"] && token.flags["token-variants"]["name"]) tokenImageName = token.flags["token-variants"]["name"];
    else tokenImageName = (0, $1mRWy.getFileName)(token.texture.src);
    let imagesParsed = [];
    const tokenConfigs = ((0, $b2HDo.TVA_CONFIG).tokenConfigs || []).flat();
    const tkn = canvas.tokens.get(token._id);
    const userMappings = tkn.document.getFlag("token-variants", "userMappings") || {};
    for (const imageObj of images){
        const img = (0, $1mRWy.isImage)(imageObj.path);
        const vid = (0, $1mRWy.isVideo)(imageObj.path);
        const hasConfig = Boolean(tokenConfigs.find((config)=>config.tvImgSrc === imageObj.path && config.tvImgName === imageObj.name));
        let shared = false;
        if ((0, $b2HDo.TVA_CONFIG).permissions.hudFullAccess[game.user.role]) actorVariants.forEach((variant)=>{
            if (variant.imgSrc === imageObj.path && variant.names.includes(imageObj.name)) shared = true;
        });
        const [title, style] = $e8f8034e87beca45$var$genTitleAndStyle(userMappings, imageObj.path, imageObj.name);
        imagesParsed.push({
            route: imageObj.path,
            name: imageObj.name,
            used: imageObj.path === token.texture.src && imageObj.name === tokenImageName,
            img: img,
            vid: vid,
            unknownType: !img && !vid,
            shared: shared,
            hasConfig: hasConfig,
            title: title,
            style: game.user.isGM && style ? "box-shadow: " + style + ";" : null
        });
    }
    //
    // Render
    //
    const imageDisplay = hudSettings.displayAsImage;
    const imageOpacity = hudSettings.imageOpacity / 100;
    const sideSelect = $(await renderTemplate("modules/token-variants/templates/sideSelect.html", {
        imagesParsed: imagesParsed,
        imageDisplay: imageDisplay,
        imageOpacity: imageOpacity,
        tokenHud: true
    }));
    // Activate listeners
    sideSelect.find("video").hover(function() {
        if ((0, $b2HDo.TVA_CONFIG).playVideoOnHover) {
            this.play();
            $(this).siblings(".fa-play").hide();
        }
    }, function() {
        if ((0, $b2HDo.TVA_CONFIG).pauseVideoOnHoverOut) {
            this.pause();
            this.currentTime = 0;
            $(this).siblings(".fa-play").show();
        }
    });
    sideSelect.find(".token-variants-button-select").click((event)=>$e8f8034e87beca45$var$_onImageClick(event, token._id));
    if (FULL_ACCESS) sideSelect.find(".token-variants-button-select").on("contextmenu", (event)=>$e8f8034e87beca45$var$_onImageRightClick(event, token._id));
    return sideSelect;
}
async function $e8f8034e87beca45$var$_onImageClick(event, tokenId) {
    event.preventDefault();
    event.stopPropagation();
    const token = canvas.tokens.controlled.find((t)=>t.document.id === tokenId);
    if (!token) return;
    const worldHudSettings = (0, $b2HDo.TVA_CONFIG).worldHud;
    const imgButton = $(event.target).closest(".token-variants-button-select");
    const imgSrc = imgButton.attr("data-name");
    const name = imgButton.attr("data-filename");
    if (!imgSrc || !name) return;
    if ((0, $1mRWy.keyPressed)("config") && game.user.isGM) {
        const toggleCog = (saved)=>{
            const cog = imgButton.find(".fa-cog");
            if (saved) cog.addClass("active");
            else cog.removeClass("active");
        };
        new (0, $cQdfX.default)(token, {}, imgSrc, name, toggleCog).render(true);
    } else if (token.document.texture.src === imgSrc) {
        let tokenImageName = token.document.getFlag("token-variants", "name");
        if (!tokenImageName) tokenImageName = (0, $1mRWy.getFileName)(token.document.texture.src);
        if (tokenImageName !== name) {
            await (0, $1mRWy.updateTokenImage)(imgSrc, {
                token: token,
                imgName: name,
                animate: worldHudSettings.animate
            });
            if (token.actor && worldHudSettings.updateActorImage) {
                if (worldHudSettings.useNameSimilarity) $e8f8034e87beca45$var$updateActorWithSimilarName(imgSrc, name, token.actor);
                else (0, $1mRWy.updateActorImage)(token.actor, imgSrc, {
                    imgName: name
                });
            }
        }
    } else {
        await (0, $1mRWy.updateTokenImage)(imgSrc, {
            token: token,
            imgName: name,
            animate: worldHudSettings.animate
        });
        if (token.actor && worldHudSettings.updateActorImage) {
            if (worldHudSettings.useNameSimilarity) $e8f8034e87beca45$var$updateActorWithSimilarName(imgSrc, name, token.actor);
            else (0, $1mRWy.updateActorImage)(token.actor, imgSrc, {
                imgName: name
            });
        }
    }
}
async function $e8f8034e87beca45$var$_onImageRightClick(event, tokenId) {
    event.preventDefault();
    event.stopPropagation();
    let token = canvas.tokens.controlled.find((t)=>t.document.id === tokenId);
    if (!token) return;
    const imgButton = $(event.target).closest(".token-variants-button-select");
    const imgSrc = imgButton.attr("data-name");
    const name = imgButton.attr("data-filename");
    if (!imgSrc || !name) return;
    if ((0, $1mRWy.keyPressed)("config") && game.user.isGM) {
        const regenStyle = (token, img)=>{
            const mappings = token.document.getFlag("token-variants", "userMappings") || {};
            const name = imgButton.attr("data-filename");
            const [title, style] = $e8f8034e87beca45$var$genTitleAndStyle(mappings, img, name);
            imgButton.closest(".token-variants-wrap").find(`.token-variants-button-select[data-name='${img}']`).css("box-shadow", style).prop("title", title);
        };
        new (0, $i3Lk1.default)(token, imgSrc, regenStyle).render(true);
    } else if (token.actor) {
        let tokenActor = game.actors.get(token.actor.id);
        let variants = $e8f8034e87beca45$var$getVariants(tokenActor);
        // Remove selected variant if present in the flag, add otherwise
        let del = false;
        let updated = false;
        for (let variant of variants)if (variant.imgSrc === imgSrc) {
            let fNames = variant.names.filter((name)=>name !== name);
            if (fNames.length === 0) del = true;
            else if (fNames.length === variant.names.length) fNames.push(name);
            variant.names = fNames;
            updated = true;
            break;
        }
        if (del) variants = variants.filter((variant)=>variant.imgSrc !== imgSrc);
        else if (!updated) variants.push({
            imgSrc: imgSrc,
            names: [
                name
            ]
        });
        // Set shared variants as an actor flag
        $e8f8034e87beca45$var$setVariants(tokenActor, variants);
        imgButton.find(".fa-share").toggleClass("active"); // Display green arrow
    }
}
async function $e8f8034e87beca45$var$_onImageSearchKeyUp(event, token) {
    event.preventDefault();
    event.stopPropagation();
    if (event.key === "Enter" || event.keyCode === 13) {
        if (event.target.value.length >= 3) {
            const button = $(event.target).closest(".control-icon");
            button.find(".token-variants-wrap").remove();
            const sideSelect = await $e8f8034e87beca45$var$renderSideSelect(token, event.target.value);
            if (sideSelect) {
                sideSelect.addClass("active");
                button.append(sideSelect);
            }
        }
    }
}
function $e8f8034e87beca45$var$genTitleAndStyle(mappings, imgSrc, name) {
    let title = (0, $b2HDo.TVA_CONFIG).worldHud.showFullPath ? imgSrc : name;
    let style = "";
    let offset = 2;
    for (const [userId, img] of Object.entries(mappings))if (img === imgSrc) {
        const user = game.users.get(userId);
        if (!user) continue;
        if (style.length === 0) style = `inset 0 0 0 ${offset}px ${user.color}`;
        else style += `, inset 0 0 0 ${offset}px ${user.color}`;
        offset += 2;
        title += `\nDisplayed to: ${user.name}`;
    }
    return [
        title,
        style
    ];
}
async function $e8f8034e87beca45$var$updateActorWithSimilarName(imgSrc, imgName, actor) {
    const results = await (0, $g3wZB.findImagesFuzzy)(imgName, (0, $1mRWy.SEARCH_TYPE).PORTRAIT, {
        algorithm: {
            fuzzyThreshold: 0.4,
            fuzzyLimit: 50
        }
    }, true);
    if (results && results.length !== 0) (0, $1mRWy.updateActorImage)(actor, results[0].path, {
        imgName: results[0].name
    });
    else (0, $1mRWy.updateActorImage)(actor, imgSrc, {
        imgName: imgName
    });
}
function $e8f8034e87beca45$var$activateStatusEffectListeners(token) {
    if ((0, $b2HDo.TVA_CONFIG).permissions.statusConfig[game.user.role] && token.actorId && game.actors.get(token.actorId)) {
        $('.control-icon[data-action="effects"]').find("img:first").click((event)=>{
            event.preventDefault();
            if ((0, $1mRWy.keyPressed)("config")) {
                event.stopPropagation();
                new (0, $1v9Gt.default)(token).render(true);
            }
        });
        $('.control-icon[data-action="visibility"]').find("img").click((event)=>{
            event.preventDefault();
            if ((0, $1mRWy.keyPressed)("config")) {
                event.stopPropagation();
                new (0, $1v9Gt.default)(token, {
                    createMapping: {
                        label: "In Combat",
                        expression: "token-variants-visibility"
                    }
                }).render(true);
            }
        });
        $('.control-icon[data-action="combat"]').find("img").click((event)=>{
            event.preventDefault();
            if ((0, $1mRWy.keyPressed)("config")) {
                event.stopPropagation();
                new (0, $1v9Gt.default)(token, {
                    createMapping: {
                        label: "In Combat",
                        expression: "token-variants-combat"
                    }
                }).render(true);
            }
        });
        $(".status-effects").find("img").click((event)=>{
            event.preventDefault();
            if ((0, $1mRWy.keyPressed)("config")) {
                event.stopPropagation();
                let effectName = event.target.getAttribute("title");
                if (game.system.id === "pf2e") effectName = $(event.target).closest("picture").attr("title");
                new (0, $1v9Gt.default)(token, {
                    createMapping: {
                        label: effectName,
                        expression: effectName
                    }
                }).render(true);
            }
        });
    }
}
function $e8f8034e87beca45$var$getVariants(actor) {
    if ($e8f8034e87beca45$export$584c9acde3dd56ba.variants) return $e8f8034e87beca45$export$584c9acde3dd56ba.variants;
    else return actor?.getFlag("token-variants", "variants") || [];
}
function $e8f8034e87beca45$var$setVariants(actor, variants) {
    $e8f8034e87beca45$export$584c9acde3dd56ba.variants = variants;
    $e8f8034e87beca45$export$584c9acde3dd56ba.actor = actor;
}

});
parcelRequire.register("1v9Gt", function(module, exports) {

$parcel$export(module.exports, "default", () => $118032bdc5483761$export$2e2bcd8739ae039);
$parcel$export(module.exports, "sortMappingsToGroups", () => $118032bdc5483761$export$94ded7fcdb9fe2e4);

var $hAn2A = parcelRequire("hAn2A");

var $1mRWy = parcelRequire("1mRWy");

var $cQdfX = parcelRequire("cQdfX");

var $b2HDo = parcelRequire("b2HDo");

var $7EDVf = parcelRequire("7EDVf");

var $cG87R = parcelRequire("cG87R");

var $UVJLm = parcelRequire("UVJLm");

var $eSPJO = parcelRequire("eSPJO");

var $fTuKG = parcelRequire("fTuKG");

var $aEqt1 = parcelRequire("aEqt1");

var $64r9a = parcelRequire("64r9a");

var $6P9Lm = parcelRequire("6P9Lm");
// Persist group toggles across forms
let $118032bdc5483761$var$TOGGLED_GROUPS;
const $118032bdc5483761$var$NO_IMAGE = "modules\\token-variants\\img\\empty.webp";
class $118032bdc5483761$export$2e2bcd8739ae039 extends FormApplication {
    constructor(token, { globalMappings: globalMappings = false, callback: callback = null, createMapping: createMapping = null } = {}){
        super({}, {
            title: (globalMappings ? "GLOBAL " : "ACTOR  ") + "Mappings"
        });
        this.token = token;
        if (globalMappings) this.globalMappings = deepClone((0, $b2HDo.TVA_CONFIG).globalMappings).filter(Boolean);
        if (!globalMappings) this.objectToFlag = game.actors.get(token.actorId);
        this.callback = callback;
        $118032bdc5483761$var$TOGGLED_GROUPS = game.settings.get("token-variants", "effectMappingToggleGroups") || {
            Default: true
        };
        this.createMapping = createMapping;
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-active-effect-config",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/effectMappingForm.html",
            resizable: true,
            minimizable: false,
            closeOnSubmit: false,
            width: 1020,
            height: "auto",
            scrollY: [
                "ol.token-variant-table"
            ]
        });
    }
    _processConfig(mapping) {
        if (!mapping.config) mapping.config = {};
        let hasTokenConfig = Object.keys(mapping.config).filter((k)=>mapping.config[k]).length;
        if (mapping.config.flags) hasTokenConfig--;
        if (mapping.config.tv_script) hasTokenConfig--;
        return {
            id: mapping.id || randomID(8),
            label: mapping.label,
            expression: mapping.expression,
            codeExp: mapping.codeExp,
            hasCodeExp: Boolean(mapping.codeExp),
            highlightedExpression: $118032bdc5483761$var$highlightOperators(mapping.expression),
            imgName: mapping.imgName,
            imgSrc: mapping.imgSrc,
            isVideo: mapping.imgSrc ? (0, $1mRWy.isVideo)(mapping.imgSrc) : false,
            priority: mapping.priority,
            hasConfig: mapping.config ? !isEmpty(mapping.config) : false,
            hasScript: mapping.config && mapping.config.tv_script,
            hasTokenConfig: hasTokenConfig > 0,
            config: mapping.config,
            overlay: mapping.overlay,
            alwaysOn: mapping.alwaysOn,
            tokens: mapping.tokens,
            tokensString: mapping.tokens?.join(",") ?? "",
            tokenIDs: mapping.tokens?.length ? "Assigned Tokens\n" + mapping.tokens.join("\n") + "\n\n[CLICK TO UNASSIGN]" : "",
            disabled: mapping.disabled,
            overlayConfig: mapping.overlayConfig,
            targetActors: mapping.targetActors,
            group: mapping.group,
            parentID: mapping.overlayConfig?.parentID
        };
    }
    async getData(options) {
        const data = super.getData(options);
        data.NO_IMAGE = $118032bdc5483761$var$NO_IMAGE;
        let mappings = [];
        if (this.object.mappings) mappings = this.object.mappings.map(this._processConfig);
        else {
            const effectMappings = this.globalMappings ?? (0, $b2HDo.getFlagMappings)(this.objectToFlag);
            mappings = effectMappings.map(this._processConfig);
            if (this.createMapping && !effectMappings.find((m)=>m.expression === this.createMapping.expression)) mappings.push(this._processConfig(this._getNewEffectConfig(this.createMapping)));
            this.createMapping = null;
        }
        mappings = mappings.sort((m1, m2)=>{
            if (!m1.label && m2.label) return -1;
            else if (m1.label && !m2.label) return 1;
            if (!m1.overlayConfig?.parentID && m2.overlayConfig?.parentID) return -1;
            else if (m1.overlayConfig?.parentID && !m2.overlayConfig?.parentID) return 1;
            let priorityDiff = m1.priority - m2.priority;
            if (priorityDiff === 0) return m1.label.localeCompare(m2.label);
            return priorityDiff;
        });
        const [sMappings, groupedMappings] = $118032bdc5483761$export$94ded7fcdb9fe2e4(mappings);
        data.groups = Object.keys(groupedMappings);
        this.object.mappings = sMappings;
        data.groupedMappings = groupedMappings;
        data.global = Boolean(this.globalMappings);
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.find(".delete-mapping").click(this._onRemove.bind(this));
        html.find(".clone-mapping").click(this._onClone.bind(this));
        html.find(".create-mapping").click(this._onCreate.bind(this));
        html.find(".save-mappings").click(this._onSaveMappings.bind(this));
        if ((0, $b2HDo.TVA_CONFIG).permissions.image_path_button[game.user.role]) {
            html.find(".mapping-image img").click(this._onImageClick.bind(this));
            html.find(".mapping-image img").mousedown(this._onImageMouseDown.bind(this));
            html.find(".mapping-image video").click(this._onImageClick.bind(this));
            html.find(".mapping-target").click(this._onConfigureApplicableActors.bind(this));
        }
        html.find(".mapping-image img").contextmenu(this._onImageRightClick.bind(this));
        html.find(".mapping-image video").contextmenu(this._onImageRightClick.bind(this));
        html.find(".mapping-config i.config").click(this._onConfigClick.bind(this));
        html.find(".mapping-config i.config-edit").click(this._onConfigEditClick.bind(this));
        html.find(".mapping-config i.config-script").click(this._onConfigScriptClick.bind(this));
        html.find(".mapping-overlay i.overlay-config").click(this._onOverlayConfigClick.bind(this));
        html.on("contextmenu", ".mapping-overlay i.overlay-config", this._onOverlayConfigRightClick.bind(this));
        html.find(".mapping-overlay input").on("change", this._onOverlayChange).trigger("change");
        html.find(".div-input").on("input paste focus click", this._onExpressionChange);
        const app = this;
        html.find(".group-toggle > a").on("click", this._onGroupToggle.bind(this)).each(function() {
            const group = $(this).closest(".group-toggle");
            const groupName = group.data("group");
            if (!$118032bdc5483761$var$TOGGLED_GROUPS[groupName]) $(this).trigger("click");
        });
        this.setPosition({
            width: 1020
        });
        html.find(".mapping-disable > input").on("change", this._onDisable.bind(this));
        html.find(".group-disable > a").on("click", this._onGroupDisable.bind(this));
        html.find(".group-delete").on("click", this._onGroupDelete.bind(this));
        html.find(".mapping-group > input").on("change", this._onGroupChange.bind(this));
        html.find(".expression-switch").on("click", this._onExpressionSwitch.bind(this));
        html.find(".expression-code textarea").focus((event)=>$(event.target).animate({
                height: "10em"
            }, 500, ()=>this.setPosition())).focusout((event)=>$(event.target).animate({
                height: "1em"
            }, 500, ()=>{
                if (this._state === Application.RENDER_STATES.RENDERED) this.setPosition();
            }));
        html.find(".tokens").on("click", this._onTokensRemove.bind(this));
    }
    async _onTokensRemove(event) {
        await this._onSubmit(event);
        const li = event.currentTarget.closest(".table-row");
        const mapping = this.object.mappings[li.dataset.index];
        mapping.tokens = undefined;
        this.render();
    }
    _onExpressionSwitch(event) {
        const container = $(event.target).closest(".expression-container");
        const divInput = container.find(".div-input");
        const codeExp = container.find(".expression-code");
        if (codeExp.hasClass("hidden")) {
            codeExp.removeClass("hidden");
            divInput.addClass("hidden");
        } else {
            codeExp.addClass("hidden");
            divInput.removeClass("hidden");
        }
    }
    async _onDisable(event) {
        const groupName = $(event.target).closest(".table-row").data("group");
        const disableGroupToggle = $(event.target).closest(".token-variant-table").find(`.group-disable[data-group="${groupName}"]`);
        const checkboxes = $(event.target).closest(".token-variant-table").find(`[data-group="${groupName}"] > .mapping-disable`);
        const numChecked = checkboxes.find("input:checked").length;
        if (checkboxes.length !== numChecked) disableGroupToggle.addClass("active");
        else disableGroupToggle.removeClass("active");
    }
    async _onGroupDisable(event) {
        const group = $(event.target).closest(".group-disable");
        const groupName = group.data("group");
        const chks = $(event.target).closest("form").find(`[data-group="${groupName}"]`).find(".mapping-disable > input");
        if (group.hasClass("active")) {
            group.removeClass("active");
            chks.prop("checked", true);
        } else {
            group.addClass("active");
            chks.prop("checked", false);
        }
    }
    async _onGroupDelete(event) {
        const group = $(event.target).closest(".group-delete");
        const groupName = group.data("group");
        await this._onSubmit(event);
        this.object.mappings = this.object.mappings.filter((m)=>m.group !== groupName);
        this.render();
    }
    async _onGroupChange(event) {
        const input = $(event.target);
        let group = input.val().trim();
        if (!group) group = "Default";
        input.val(group);
        await this._onSubmit(event);
        this.render();
    }
    _onGroupToggle(event) {
        const group = $(event.target).closest(".group-toggle");
        const groupName = group.data("group");
        const form = $(event.target).closest("form");
        form.find(`li[data-group="${groupName}"]`).toggle();
        if (group.hasClass("active")) {
            group.removeClass("active");
            group.find("i").addClass("fa-rotate-180");
            $118032bdc5483761$var$TOGGLED_GROUPS[groupName] = false;
        } else {
            group.addClass("active");
            group.find("i").removeClass("fa-rotate-180");
            $118032bdc5483761$var$TOGGLED_GROUPS[groupName] = true;
        }
        game.settings.set("token-variants", "effectMappingToggleGroups", $118032bdc5483761$var$TOGGLED_GROUPS);
        this.setPosition({
            height: "auto"
        });
    }
    async _onExpressionChange(event) {
        var el = event.target;
        // Update the hidden input field so that the text entered in the div will be submitted via the form
        $(el).siblings("input").val(event.target.innerText);
        // The rest of the function is to handle operator highlighting and management of the caret position
        if (!el.childNodes.length) return;
        // Calculate the true/total caret offset within the div
        const sel = window.getSelection();
        const focusNode = sel.focusNode;
        let offset = sel.focusOffset;
        for (const ch of el.childNodes){
            if (ch === focusNode || ch.childNodes[0] === focusNode) break;
            offset += ch.nodeName === "SPAN" ? ch.innerText.length : ch.length;
        }
        // Highlight the operators and update the div
        let text = $118032bdc5483761$var$highlightOperators(event.target.innerText);
        $(event.target).html(text);
        // Set the new caret position with the div
        $118032bdc5483761$var$setCaretPosition(el, offset);
    }
    async _onOverlayChange(event) {
        if (event.target.checked) $(event.target).siblings("a").show();
        else $(event.target).siblings("a").hide();
    }
    async _onOverlayConfigClick(event) {
        const li = event.currentTarget.closest(".table-row");
        const mapping = this.object.mappings[li.dataset.index];
        new (0, $UVJLm.OverlayConfig)(mapping.overlayConfig, (config)=>{
            mapping.overlayConfig = config;
            const gear = $(li).find(".mapping-overlay > a");
            if (config?.parentID && config.parentID !== "TOKEN") {
                gear.addClass("child");
                gear.attr("title", "Child Of: " + config.parentID);
            } else {
                gear.removeClass("child");
                gear.attr("title", "");
            }
        }, mapping.id, this.token).render(true);
    }
    async _onOverlayConfigRightClick(event) {
        const li = event.currentTarget.closest(".table-row");
        const mapping = this.object.mappings[li.dataset.index];
        (0, $eSPJO.showOverlayJsonConfigDialog)(mapping.overlayConfig, (config)=>mapping.overlayConfig = config);
    }
    async _toggleActiveControls(event) {
        const li = event.currentTarget.closest(".table-row");
        const mapping = this.object.mappings[li.dataset.index];
        const tokenConfig = $(event.target).closest(".mapping-config").find(".config");
        const configEdit = $(event.target).closest(".mapping-config").find(".config-edit");
        const scriptEdit = $(event.target).closest(".mapping-config").find(".config-script");
        let hasTokenConfig = Object.keys(mapping.config).filter((k)=>mapping.config[k]).length;
        if (mapping.config.flags) hasTokenConfig--;
        if (mapping.config.tv_script) hasTokenConfig--;
        if (hasTokenConfig) tokenConfig.addClass("active");
        else tokenConfig.removeClass("active");
        if (Object.keys(mapping.config).filter((k)=>mapping.config[k]).length) configEdit.addClass("active");
        else configEdit.removeClass("active");
        if (mapping.config.tv_script) scriptEdit.addClass("active");
        else scriptEdit.removeClass("active");
    }
    async _onConfigScriptClick(event) {
        const li = event.currentTarget.closest(".table-row");
        const mapping = this.object.mappings[li.dataset.index];
        new (0, $cG87R.default)(mapping.config?.tv_script, (script)=>{
            if (!mapping.config) mapping.config = {};
            if (script) mapping.config.tv_script = script;
            else delete mapping.config.tv_script;
            this._toggleActiveControls(event);
        }).render(true);
    }
    async _onConfigEditClick(event) {
        const li = event.currentTarget.closest(".table-row");
        const mapping = this.object.mappings[li.dataset.index];
        new (0, $7EDVf.default)(mapping.config, (config)=>{
            mapping.config = config;
            this._toggleActiveControls(event);
        }).render(true);
    }
    async _onConfigClick(event) {
        const li = event.currentTarget.closest(".table-row");
        const mapping = this.object.mappings[li.dataset.index];
        new (0, $cQdfX.default)(this.token, {}, null, null, (config)=>{
            if (!config || isEmpty(config)) {
                config = {};
                config.tv_script = mapping.config.tv_script;
                config.flags = mapping.config.flags;
            }
            mapping.config = config;
            this._toggleActiveControls(event);
        }, mapping.config ? mapping.config : {}).render(true);
    }
    _removeImage(event) {
        const vid = $(event.target).closest(".mapping-image").find("video");
        const img = $(event.target).closest(".mapping-image").find("img");
        vid.add(img).attr("src", "").attr("title", "");
        vid.hide();
        img.show();
        img.attr("src", $118032bdc5483761$var$NO_IMAGE);
        $(event.target).siblings(".imgSrc").val("");
        $(event.target).siblings(".imgName").val("");
    }
    async _onImageMouseDown(event) {
        if (event.which === 2) this._removeImage(event);
    }
    async _onImageClick(event) {
        if ((0, $1mRWy.keyPressed)("config")) {
            this._removeImage(event);
            return;
        }
        let search = this.token.name;
        if (search === "Unknown") {
            const li = event.currentTarget.closest(".table-row");
            const mapping = this.object.mappings[li.dataset.index];
            search = mapping.label;
        }
        (0, $hAn2A.showArtSelect)(search, {
            searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN,
            callback: (imgSrc, imgName)=>{
                const vid = $(event.target).closest(".mapping-image").find("video");
                const img = $(event.target).closest(".mapping-image").find("img");
                vid.add(img).attr("src", imgSrc).attr("title", imgName);
                if ((0, $1mRWy.isVideo)(imgSrc)) {
                    vid.show();
                    img.hide();
                } else {
                    vid.hide();
                    img.show();
                }
                $(event.target).siblings(".imgSrc").val(imgSrc);
                $(event.target).siblings(".imgName").val(imgName);
            }
        });
    }
    async _onImageRightClick(event) {
        if ((0, $1mRWy.keyPressed)("config")) {
            this._removeImage(event);
            return;
        }
        const li = event.currentTarget.closest(".table-row");
        const mapping = this.object.mappings[li.dataset.index];
        new FilePicker({
            type: "imagevideo",
            current: mapping.imgSrc,
            callback: (path)=>{
                const vid = $(event.target).closest(".mapping-image").find("video");
                const img = $(event.target).closest(".mapping-image").find("img");
                vid.add(img).attr("src", path).attr("title", (0, $1mRWy.getFileName)(path));
                if ((0, $1mRWy.isVideo)(path)) {
                    vid.show();
                    img.hide();
                } else {
                    vid.hide();
                    img.show();
                }
                $(event.target).siblings(".imgSrc").val(path);
                $(event.target).siblings(".imgName").val((0, $1mRWy.getFileName)(path));
            }
        }).render();
    }
    async _onRemove(event) {
        event.preventDefault();
        await this._onSubmit(event);
        const li = event.currentTarget.closest(".table-row");
        this.object.mappings.splice(li.dataset.index, 1);
        this.render();
    }
    async _onClone(event) {
        event.preventDefault();
        await this._onSubmit(event);
        const li = event.currentTarget.closest(".table-row");
        const clone = deepClone(this.object.mappings[li.dataset.index]);
        clone.label = clone.label + " - Copy";
        clone.id = randomID(8);
        this.object.mappings.push(clone);
        this.render();
    }
    async _onCreate(event) {
        event.preventDefault();
        await this._onSubmit(event);
        this.object.mappings.push(this._getNewEffectConfig());
        this.render();
    }
    _getNewEffectConfig({ label: label = "", expression: expression = "" } = {}) {
        // if (textOverlay) {
        //   TOGGLED_GROUPS['Text Overlays'] = true;
        //   return {
        //     id: randomID(8),
        //     label: label,
        //     expression: label,
        //     highlightedExpression: highlightOperators(label),
        //     imgName: '',
        //     imgSrc: '',
        //     priority: 50,
        //     overlay: false,
        //     alwaysOn: false,
        //     disabled: false,
        //     group: 'Text Overlays',
        //     overlay: true,
        //     overlayConfig: mergeObject(
        //       DEFAULT_OVERLAY_CONFIG,
        //       {
        //         img: '',
        //         linkScale: false,
        //         linkRotation: false,
        //         linkMirror: false,
        //         offsetY: 0.5 + Math.round(Math.random() * 0.3 * 100) / 100,
        //         offsetX: 0,
        //         scaleX: 0.68,
        //         scaleY: 0.68,
        //         text: {
        //           text: '{{effect}}',
        //           fontFamily: CONFIG.defaultFontFamily,
        //           fontSize: 36,
        //           fill: new Color(Math.round(Math.random() * 16777215)).toString(),
        //           stroke: '#000000',
        //           strokeThickness: 2,
        //           dropShadow: false,
        //           curve: {
        //             radius: 160,
        //             invert: false,
        //           },
        //         },
        //         animation: {
        //           rotate: true,
        //           duration: 10000 + Math.round(Math.random() * 14000) + 10000,
        //           clockwise: true,
        //         },
        //       },
        //       { inplace: false }
        //     ),
        //   };
        // } else {
        $118032bdc5483761$var$TOGGLED_GROUPS["Default"] = true;
        return mergeObject(deepClone((0, $fTuKG.DEFAULT_ACTIVE_EFFECT_CONFIG)), {
            label: label,
            expression: expression,
            id: randomID(8)
        });
    // }
    }
    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        buttons.unshift({
            label: "Export",
            class: "token-variants-export",
            icon: "fas fa-file-export",
            onclick: (ev)=>this._exportConfigs(ev)
        });
        buttons.unshift({
            label: "Import",
            class: "token-variants-import",
            icon: "fas fa-file-import",
            onclick: (ev)=>this._importConfigs(ev)
        });
        buttons.unshift({
            label: "Templates",
            class: "token-variants-templates",
            icon: "fa-solid fa-book",
            onclick: async (ev)=>{
                new (0, $6P9Lm.Templates)({
                    mappings: this.globalMappings ?? (0, $b2HDo.getFlagMappings)(this.objectToFlag),
                    callback: (templateName, mappings)=>{
                        this._insertMappings(ev, mappings);
                    }
                }).render(true);
            }
        });
        if (this.globalMappings) return buttons;
        buttons.unshift({
            label: "Copy Global Config",
            class: "token-variants-copy-global",
            icon: "fas fa-globe",
            onclick: (ev)=>this._copyGlobalConfig(ev)
        });
        buttons.unshift({
            label: "Open Global",
            class: "token-variants-open-global",
            icon: "fas fa-globe",
            onclick: async (ev)=>{
                await this.close();
                new $118032bdc5483761$export$2e2bcd8739ae039(this.token, {
                    globalMappings: true
                }).render(true);
            }
        });
        buttons.unshift({
            label: "",
            class: "token-variants-print-token",
            icon: "fa fa-print",
            onclick: ()=>(0, $eSPJO.showTokenCaptureDialog)(canvas.tokens.get(this.token._id))
        });
        return buttons;
    }
    async _exportConfigs(event) {
        let mappings;
        let filename = "";
        if (this.globalMappings) {
            mappings = {
                globalMappings: deepClone((0, $b2HDo.TVA_CONFIG).globalMappings)
            };
            filename = "token-variants-global-mappings.json";
        } else {
            mappings = {
                globalMappings: deepClone((0, $b2HDo.getFlagMappings)(this.objectToFlag))
            };
            let actorName = this.objectToFlag.name ?? "Actor";
            actorName = actorName.replace(/[/\\?%*:|"<>]/g, "-");
            filename = "token-variants-" + actorName + ".json";
        }
        if (mappings && !isEmpty(mappings)) saveDataToFile(JSON.stringify(mappings, null, 2), "text/json", filename);
    }
    async _importConfigs(event) {
        const content = await renderTemplate("templates/apps/import-data.html", {
            entity: "token-variants",
            name: "settings"
        });
        let dialog = new Promise((resolve, reject)=>{
            new Dialog({
                title: "Import Effect Configurations",
                content: content,
                buttons: {
                    import: {
                        icon: '<i class="fas fa-file-import"></i>',
                        label: game.i18n.localize("token-variants.common.import"),
                        callback: (html)=>{
                            const form = html.find("form")[0];
                            if (!form.data.files.length) return ui.notifications?.error("You did not upload a data file!");
                            readTextFromFile(form.data.files[0]).then((json)=>{
                                json = JSON.parse(json);
                                if (!json || !("globalMappings" in json)) return ui.notifications?.error("No mappings found within the file!");
                                this._insertMappings(event, (0, $b2HDo.migrateMappings)(json.globalMappings));
                                resolve(true);
                            });
                        }
                    },
                    no: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: (html)=>resolve(false)
                    }
                },
                default: "import"
            }, {
                width: 400
            }).render(true);
        });
        return await dialog;
    }
    _copyGlobalConfig(event) {
        (0, $eSPJO.showMappingSelectDialog)((0, $b2HDo.TVA_CONFIG).globalMappings, {
            title1: "Global Mappings",
            title2: "Select Mappings to Copy:",
            buttonTitle: "Copy",
            callback: (mappings)=>{
                this._insertMappings(event, mappings);
            }
        });
    }
    async _insertMappings(event, mappings) {
        const cMappings = deepClone(mappings).map(this._processConfig);
        await this._onSubmit(event);
        (0, $1mRWy.mergeMappings)(cMappings, this.object.mappings);
        this.render();
    }
    _onConfigureApplicableActors(event) {
        const li = event.currentTarget.closest(".table-row");
        const mapping = this.object.mappings[li.dataset.index];
        let actorTypes = (game.system.entityTypes ?? game.system.documentTypes)["Actor"];
        let actors = [];
        for (const t of actorTypes){
            const label = CONFIG["Actor"]?.typeLabels?.[t] ?? t;
            actors.push({
                id: t,
                label: game.i18n.has(label) ? game.i18n.localize(label) : t,
                enabled: !mapping.targetActors || mapping.targetActors.includes(t)
            });
        }
        let content = '<form style="overflow-y: scroll; height:250x;">';
        for (const act of actors)content += `
      <div class="form-group">
        <label>${act.label}</label>
        <div class="form-fields">
            <input type="checkbox" name="${act.id}" data-dtype="Boolean" ${act.enabled ? "checked" : ""}>
        </div>
      </div>
      `;
        content += `</form><div class="form-group"><button type="button" class="select-all">Select all</div>`;
        new Dialog({
            title: `Configure Applicable Actors`,
            content: content,
            buttons: {
                Ok: {
                    label: `Save`,
                    callback: async (html)=>{
                        let targetActors = [];
                        html.find('input[type="checkbox"]').each(function() {
                            if (this.checked) targetActors.push(this.name);
                        });
                        mapping.targetActors = targetActors;
                    }
                }
            },
            render: (html)=>{
                html.find(".select-all").click(()=>{
                    html.find('input[type="checkbox"]').prop("checked", true);
                });
            }
        }).render(true);
    }
    // TODO fix this spaghetti code related to globalMappings...
    async _onSaveMappings(event) {
        await this._onSubmit(event);
        if (this.objectToFlag || this.globalMappings) {
            // First filter out empty mappings
            let mappings = this.object.mappings;
            mappings = mappings.filter((m)=>Boolean(m.label?.trim()) || Boolean(m.expression?.trim()));
            // Make sure a priority is assigned
            for (const mapping of mappings){
                mapping.priority = mapping.priority ? mapping.priority : 50;
                mapping.overlayConfig = mapping.overlayConfig ?? {};
                mapping.overlayConfig.label = mapping.label;
            }
            if (mappings.length !== 0) {
                const effectMappings = mappings.map((m)=>mergeObject((0, $fTuKG.DEFAULT_ACTIVE_EFFECT_CONFIG), m, {
                        inplace: false,
                        insertKeys: false,
                        recursive: false
                    }));
                if (this.globalMappings) (0, $b2HDo.updateSettings)({
                    globalMappings: effectMappings
                });
                else await this.objectToFlag.setFlag("token-variants", "effectMappings", effectMappings);
            } else if (this.globalMappings) (0, $b2HDo.updateSettings)({
                globalMappings: []
            });
            else await this.objectToFlag.unsetFlag("token-variants", "effectMappings");
            const tokens = this.globalMappings ? canvas.tokens.placeables : this.objectToFlag.getActiveTokens();
            for (const tkn of tokens){
                if ((0, $b2HDo.TVA_CONFIG).filterEffectIcons) await tkn.drawEffects();
                await (0, $aEqt1.updateWithEffectMapping)(tkn);
                (0, $64r9a.drawOverlays)(tkn);
            }
            // Instruct users on other scenes to refresh the overlays
            const message = {
                handlerName: "drawOverlays",
                args: {
                    all: true,
                    sceneId: canvas.scene.id
                },
                type: "UPDATE"
            };
            game.socket?.emit("module.token-variants", message);
        }
        if (this.callback) this.callback();
        this.close();
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        const mappings = expandObject(formData).mappings ?? {};
        // Merge form data with internal mappings
        for(let i = 0; i < this.object.mappings.length; i++){
            const m1 = mappings[i];
            const m2 = this.object.mappings[i];
            m2.id = m1.id;
            m2.label = m1.label.replaceAll(String.fromCharCode(160), " ");
            m2.expression = m1.expression.replaceAll(String.fromCharCode(160), " ");
            m2.codeExp = m1.codeExp?.trim();
            m2.imgSrc = m1.imgSrc;
            m2.imgName = m1.imgName;
            m2.priority = m1.priority;
            m2.overlay = m1.overlay;
            m2.alwaysOn = m1.alwaysOn;
            m2.tokens = m1.tokens?.split(",");
            m2.disabled = m1.disabled;
            m2.group = m1.group;
        }
    }
}
// Insert <span/> around operators
function $118032bdc5483761$var$highlightOperators(text) {
    // text = text.replaceAll(' ', '&nbsp;');
    const re = new RegExp('([a-zA-Z\\.\\-\\|\\+]+)([><=]+)(".*?"|-?\\d+)(%{0,1})', `gi`);
    text = text.replace(re, function replace(match) {
        return '<span class="hp-expression">' + match + "</span>";
    });
    for (const op of [
        "\\(",
        "\\)",
        "&&",
        "||",
        "\\!",
        "\\*",
        "\\{",
        "\\}"
    ])text = text.replaceAll(op, `<span>${op}</span>`);
    return text;
}
// Move caret to a specific point in a DOM element
function $118032bdc5483761$var$setCaretPosition(el, pos) {
    for (var node of el.childNodes)// Check if it's a text node
    if (node.nodeType == 3) {
        if (node.length >= pos) {
            var range = document.createRange(), sel = window.getSelection();
            range.setStart(node, pos);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return -1; // We are done
        } else pos -= node.length;
    } else {
        pos = $118032bdc5483761$var$setCaretPosition(node, pos);
        if (pos == -1) return -1; // No need to finish the for loop
    }
    return pos;
}
function $118032bdc5483761$export$94ded7fcdb9fe2e4(mappings) {
    mappings.sort((m1, m2)=>{
        if (!m1.label && m2.label) return -1;
        else if (m1.label && !m2.label) return 1;
        if (!m1.overlayConfig?.parentID && m2.overlayConfig?.parentID) return -1;
        else if (m1.overlayConfig?.parentID && !m2.overlayConfig?.parentID) return 1;
        let priorityDiff = m1.priority - m2.priority;
        if (priorityDiff === 0) return m1.label.localeCompare(m2.label);
        return priorityDiff;
    });
    let groupedMappings = {
        Default: {
            list: [],
            active: false
        }
    };
    mappings.forEach((mapping, index)=>{
        mapping.i = index; // assign so that we can reference the mapping inside of an array
        if (!mapping.group || !mapping.group.trim()) mapping.group = "Default";
        if (!(mapping.group in groupedMappings)) groupedMappings[mapping.group] = {
            list: [],
            active: false
        };
        if (!mapping.disabled) groupedMappings[mapping.group].active = true;
        groupedMappings[mapping.group].list.push(mapping);
    });
    return [
        mappings,
        groupedMappings
    ];
}

});
parcelRequire.register("7EDVf", function(module, exports) {

$parcel$export(module.exports, "default", () => $592b3c905243e424$export$2e2bcd8739ae039);
class $592b3c905243e424$export$2e2bcd8739ae039 extends FormApplication {
    constructor(config, callback){
        super({}, {});
        this.config = config;
        this.callback = callback;
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-config-json-edit",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/configJsonEdit.html",
            resizable: true,
            minimizable: false,
            title: "Edit Token Configuration",
            width: 400,
            height: 380
        });
    }
    async getData(options) {
        const data = super.getData(options);
        data.hasConfig = this.config != null && Object.keys(this.config).length !== 0;
        data.config = JSON.stringify(data.hasConfig ? this.config : {}, null, 2);
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.on("input", ".command textarea", this._validateJSON.bind(this));
        // Override 'Tab' key to insert spaces
        html.on("keydown", ".command textarea", function(e) {
            if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "  " + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 2;
                return false;
            }
        });
        html.find(".remove").click(this._onRemove.bind(this));
        html.find(".format").click(this._onFormat.bind(this));
    }
    async _validateJSON(event) {
        const controls = $(event.target).closest("form").find('button[type="submit"], button.format');
        try {
            this.config = JSON.parse(event.target.value);
            this.config = expandObject(this.config);
            this.flag = this.config.flag;
            controls.prop("disabled", false);
        } catch (e) {
            controls.prop("disabled", true);
        }
    }
    async _onRemove(event) {
        this.config = {};
        this.submit();
    }
    async _onFormat(event) {
        $(event.target).closest("form").find('textarea[name="config"]').val(JSON.stringify(this.config, null, 2));
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        if (this.callback) this.callback(this.config);
    }
}

});

parcelRequire.register("cG87R", function(module, exports) {

$parcel$export(module.exports, "default", () => $93afb5e004d3188a$export$2e2bcd8739ae039);
class $93afb5e004d3188a$export$2e2bcd8739ae039 extends FormApplication {
    constructor(script, callback){
        super({}, {});
        this.script = script;
        this.callback = callback;
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-config-script-edit",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/configScriptEdit.html",
            resizable: true,
            minimizable: false,
            title: "Scripts",
            width: 640,
            height: 640
        });
    }
    async getData(options) {
        const data = super.getData(options);
        const script = this.script ? this.script : {};
        data.hasScript = !isEmpty(script);
        data.onApply = script.onApply;
        data.onRemove = script.onRemove;
        data.macroOnApply = script.macroOnApply;
        data.macroOnRemove = script.macroOnRemove;
        data.tmfxPreset = script.tmfxPreset;
        data.tmfxActive = game.modules.get("tokenmagic")?.active;
        if (data.tmfxActive) data.tmfxPresets = TokenMagic.getPresets().map((p)=>p.name);
        data.ceActive = game.modules.get("dfreds-convenient-effects")?.active;
        if (data.ceActive) {
            data.ceEffect = script.ceEffect ?? {
                apply: true,
                remove: true
            };
            data.ceEffects = game.dfreds.effects.all.map((ef)=>ef.name);
        }
        data.macros = game.macros.map((m)=>m.name);
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        // Override 'Tab' key to insert spaces
        html.on("keydown", ".command textarea", function(e) {
            if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "  " + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 2;
                return false;
            }
        });
        html.find(".remove").click(this._onRemove.bind(this));
    }
    async _onRemove(event) {
        if (this.callback) this.callback(null);
        this.close();
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        formData = expandObject(formData);
        [
            "onApply",
            "onRemove",
            "macroOnApply",
            "macroOnRemove"
        ].forEach((k)=>{
            formData[k] = formData[k].trim();
        });
        if (formData.ceEffect?.name) formData.ceEffect.name = formData.ceEffect.name.trim();
        if (!formData.onApply && !formData.onRemove && !formData.tmfxPreset && !formData.ceEffect.name && !formData.macroOnApply && !formData.macroOnRemove) {
            if (this.callback) this.callback(null);
        } else if (this.callback) this.callback(formData);
    }
}

});

parcelRequire.register("eSPJO", function(module, exports) {

$parcel$export(module.exports, "showOverlayJsonConfigDialog", () => $ad5e3de8ff9836a3$export$d4bc2f83b9e95fdf);
$parcel$export(module.exports, "showPathSelectCategoryDialog", () => $ad5e3de8ff9836a3$export$184d7e04bfe8244d);
$parcel$export(module.exports, "showPathSelectConfigForm", () => $ad5e3de8ff9836a3$export$1d34adfb3ae1b);
$parcel$export(module.exports, "showTokenCaptureDialog", () => $ad5e3de8ff9836a3$export$e032b3f67a64b8e9);
$parcel$export(module.exports, "showMappingSelectDialog", () => $ad5e3de8ff9836a3$export$398865504eddc155);
$parcel$export(module.exports, "showUserTemplateCreateDialog", () => $ad5e3de8ff9836a3$export$667fc7c48dd97753);
$parcel$export(module.exports, "toggleTemplateDialog", () => $ad5e3de8ff9836a3$export$51c95b54ea3e6a53);

var $aEqt1 = parcelRequire("aEqt1");
parcelRequire("etBGd");

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");

var $1v9Gt = parcelRequire("1v9Gt");

var $6P9Lm = parcelRequire("6P9Lm");

var $cQdfX = parcelRequire("cQdfX");
function $ad5e3de8ff9836a3$export$d4bc2f83b9e95fdf(overlayConfig, callback) {
    const config = deepClone(overlayConfig || {});
    delete config.effect;
    let content = `<div style="height: 300px;" class="form-group stacked command"><textarea style="height: 300px;" class="configJson">${JSON.stringify(config, null, 2)}</textarea></div>`;
    new Dialog({
        title: `Overlay Configuration`,
        content: content,
        buttons: {
            yes: {
                icon: "<i class='fas fa-save'></i>",
                label: "Save",
                callback: (html)=>{
                    let json = $(html).find(".configJson").val();
                    if (json) try {
                        json = JSON.parse(json);
                    } catch (e) {
                        console.warn(`TVA |`, e);
                        json = {};
                    }
                    else json = {};
                    callback(json);
                }
            }
        },
        default: "yes"
    }).render(true);
}
async function $ad5e3de8ff9836a3$export$184d7e04bfe8244d(event) {
    event.preventDefault();
    const typesInput = $(event.target).closest(".path-category").find("input");
    const selectedTypes = typesInput.val().split(",");
    const categories = (0, $1mRWy.BASE_IMAGE_CATEGORIES).concat((0, $b2HDo.TVA_CONFIG).customImageCategories);
    let content = '<div class="token-variants-popup-settings">';
    // Split into rows of 4
    const splits = [];
    let currSplit = [];
    for(let i = 0; i < categories.length; i++){
        if (i > 0 && i + 1 != categories.length && i % 4 == 0) {
            splits.push(currSplit);
            currSplit = [];
        }
        currSplit.push(categories[i]);
    }
    if (currSplit.length) splits.push(currSplit);
    for (const split of splits){
        content += '<header class="table-header flexrow">';
        for (const type of split)content += `<label>${type}</label>`;
        content += '</header><ul class="setting-list"><li class="setting form-group"><div class="form-fields">';
        for (const type of split)content += `<input class="category" type="checkbox" name="${type}" data-dtype="Boolean" ${selectedTypes.includes(type) ? "checked" : ""}>`;
        content += "</div></li></ul>";
    }
    content += "</div>";
    new Dialog({
        title: `Image Categories/Filters`,
        content: content,
        buttons: {
            yes: {
                icon: "<i class='fas fa-save'></i>",
                label: "Apply",
                callback: (html)=>{
                    const types = [];
                    $(html).find(".category").each(function() {
                        if ($(this).is(":checked")) types.push($(this).attr("name"));
                    });
                    typesInput.val(types.join(","));
                }
            }
        },
        default: "yes"
    }).render(true);
}
async function $ad5e3de8ff9836a3$export$1d34adfb3ae1b(event) {
    event.preventDefault();
    const configInput = $(event.target).closest(".path-config").find("input");
    let config = {};
    try {
        config = JSON.parse(configInput.val());
    } catch (e) {}
    const setting = game.settings.get("core", DefaultTokenConfig.SETTING);
    const data = new foundry.data.PrototypeToken(setting);
    const token = new TokenDocument(data, {
        actor: null
    });
    new (0, $cQdfX.default)(token, {}, null, null, (conf)=>{
        if (!conf) conf = {};
        if (conf.flags == null || isEmpty(conf.flags)) delete conf.flags;
        configInput.val(JSON.stringify(conf));
        const cog = configInput.siblings(".select-config");
        if (isEmpty(conf)) cog.removeClass("active");
        else cog.addClass("active");
    }, config).render(true);
}
async function $ad5e3de8ff9836a3$export$e032b3f67a64b8e9(token) {
    if (!token) return;
    let content = `<form>
<div class="form-group">
  <label>Image Name</label>
  <input type="text" name="name" value="${token.name}">
</div>
<div class="form-group">
  <label>Image Path</label>
    <div class="form-fields">
      <input type="text" name="path" value="modules/token-variants/">
      <button type="button" class="file-picker" data-type="folder" data-target="path" title="Browse Folders" tabindex="-1">
        <i class="fas fa-file-import fa-fw"></i>
      </button>
    </div>
</div>
<div class="form-group slim">
  <label>Width <span class="units">(pixels)</span></label>
  <div class="form-fields">
      <input type="number" step="1" name="width" value="${token.mesh.texture.width}">
  </div>
</div>
<div class="form-group slim">
  <label>Height <span class="units">(pixels)</span></label>
  <div class="form-fields">
      <input type="number" step="1" name="height" value="${token.mesh.texture.height}">
  </div>
</div>
<div class="form-group slim">
  <label>Scale</label>
  <div class="form-fields">
    <input type="number" step="any" name="scale" value="3">
  </div>
</div>
</form>`;
    new Dialog({
        title: `Save Token/Overlay Image`,
        content: content,
        buttons: {
            yes: {
                icon: "<i class='fas fa-save'></i>",
                label: "Save",
                callback: (html)=>{
                    const options = {};
                    $(html).find("[name]").each(function() {
                        let val = parseFloat(this.value);
                        if (isNaN(val)) val = this.value;
                        options[this.name] = val;
                    });
                    (0, $1mRWy.uploadTokenImage)(token, options);
                }
            }
        },
        render: (html)=>{
            html.find(".file-picker").click(()=>{
                new FilePicker({
                    type: "folder",
                    current: html.find('[name="path"]').val(),
                    callback: (path)=>{
                        html.find('[name="path"]').val(path);
                    }
                }).render();
            });
        },
        default: "yes"
    }).render(true);
}
function $ad5e3de8ff9836a3$export$398865504eddc155(mappings, { title1: title1 = "Mappings", title2: title2 = "Select Mappings", buttonTitle: buttonTitle = "Confirm", callback: callback = null } = {}) {
    if (!mappings || !mappings.length) return;
    let content = `<form style="overflow-y: scroll; height:400px;"><h2>${title2}</h2>`;
    const [_, mappingGroups] = (0, $1v9Gt.sortMappingsToGroups)(mappings);
    for (const [group, obj] of Object.entries(mappingGroups))if (obj.list.length) {
        content += `<h4 style="text-align:center;"><b>${group}</b></h4>`;
        for (const mapping of obj.list)content += `
        <div class="form-group">
          <label>${mapping.label}</label>
          <div class="form-fields">
              <input type="checkbox" name="${mapping.id}" data-dtype="Boolean">
          </div>
        </div>
        `;
    }
    content += `</form><div class="form-group"><button type="button" class="select-all">Select all</div>`;
    new Dialog({
        title: title1,
        content: content,
        buttons: {
            Ok: {
                label: buttonTitle,
                callback: async (html)=>{
                    if (!callback) return;
                    const selectedMappings = [];
                    html.find('input[type="checkbox"]').each(function() {
                        if (this.checked) {
                            const mapping = mappings.find((m)=>m.id === this.name);
                            if (mapping) {
                                const cMapping = deepClone(mapping);
                                selectedMappings.push(cMapping);
                                delete cMapping.targetActors;
                            }
                        }
                    });
                    callback(selectedMappings);
                }
            }
        },
        render: (html)=>{
            html.find(".select-all").click(()=>{
                html.find('input[type="checkbox"]').prop("checked", true);
            });
        }
    }).render(true);
}
function $ad5e3de8ff9836a3$export$667fc7c48dd97753(mappings) {
    let content = `
<div class="form-group">
  <label>Template Name</label>
  <div class="form-fields">
    <input type="text" name="templateName" data-dtype="String" value="">
  </div>
</div>
<div class="form-group">
  <label>Hover Text (optional)</label>
  <div class="form-fields">
    <input type="text" name="templateHint" data-dtype="String" value="">
  </div>
</div>
<div class="form-group">
  <label>Hover Image (optional)</label>
  <div class="form-fields">
    <input type="text" name="img" data-dtype="String" value="">
  </div>
</div>`;
    let dialog;
    dialog = new Dialog({
        title: "Mapping Templates",
        content: content,
        buttons: {
            create: {
                label: "Create Template",
                callback: (html)=>{
                    const name = html.find('[name="templateName"]').val().trim();
                    const hint = html.find('[name="templateHint"]').val().trim();
                    const img = html.find('[name="img"]').val().trim();
                    if (name.trim()) {
                        (0, $b2HDo.TVA_CONFIG).templateMappings.push({
                            id: randomID(),
                            name: name,
                            hint: hint,
                            img: img,
                            mappings: deepClone(mappings)
                        });
                        (0, $b2HDo.updateSettings)({
                            templateMappings: (0, $b2HDo.TVA_CONFIG).templateMappings
                        });
                    }
                }
            },
            cancel: {
                label: "Cancel"
            }
        },
        default: "cancel"
    });
    dialog.render(true);
}
function $ad5e3de8ff9836a3$export$51c95b54ea3e6a53() {
    new (0, $6P9Lm.Templates)({
        callback: (templateName, mappings)=>(0, $aEqt1.toggleTemplateOnSelected)(templateName, mappings)
    }).render(true);
}

});
parcelRequire.register("etBGd", function(module, exports) {

$parcel$export(module.exports, "CORE_TEMPLATES", () => $a8a1008dd65d9c97$export$8af7a3ae7ecba113);
const $a8a1008dd65d9c97$export$8af7a3ae7ecba113 = [
    {
        name: "Tint Red when HP is bellow 10%",
        hint: "Tint token red when HP falls bellow 10%",
        img: "https://user-images.githubusercontent.com/7693704/243428871-c52130b3-2f12-4de7-a86e-fabc67e865a9.png",
        group: "Health",
        mappings: [
            {
                id: "MmLSOlJx",
                label: "Tint Red",
                expression: "hp<=10%",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {
                    texture: {
                        tint: "#ff0000"
                    }
                },
                overlay: false,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    label: "Tint Red"
                },
                group: "Low HP",
                i: 0
            }
        ],
        id: "Ob9LP35K"
    },
    {
        name: "Health State Text Overlay",
        hint: `Displays text overlay based on percentage health. \n0% < hp <= 25% : Critical\n25% < hp <= 50% : Bloodied\n50% < hp <= 75% : Wounded\n75% < hp : Healthy`,
        img: "https://user-images.githubusercontent.com/7693704/243426356-ceab629c-c16c-42b3-9004-af7dafb62eb7.png",
        group: "Health",
        mappings: [
            {
                id: "jqaFdwkQ",
                label: "Bloodied",
                expression: "hp>25% && hp<=50%",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    parent: "",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionX: false,
                    linkDimensionY: false,
                    linkOpacity: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0.51,
                    scaleX: 0.76,
                    scaleY: 0.76,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Bloodied",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#ff5900",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: null
                        }
                    },
                    label: "Bloodied",
                    id: "jqaFdwkQ"
                },
                group: "Health State Overlay",
                i: 0
            },
            {
                id: "m4GQVz5O",
                label: "Critical",
                expression: "hp>0 && hp<=25%",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    parent: "",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionX: false,
                    linkDimensionY: false,
                    linkOpacity: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0.51,
                    scaleX: 0.76,
                    scaleY: 0.76,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Critical",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#ff0000",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: null
                        }
                    },
                    label: "Critical",
                    id: "m4GQVz5O"
                },
                group: "Health State Overlay",
                i: 1
            },
            {
                id: "H1wrS5N1",
                label: "Healthy",
                expression: "hp>75%",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    parent: "",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionX: false,
                    linkDimensionY: false,
                    linkOpacity: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0.51,
                    scaleX: 0.76,
                    scaleY: 0.76,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Healthy",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#2bff00",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: null
                        }
                    },
                    label: "Healthy",
                    id: "H1wrS5N1"
                },
                group: "Health State Overlay",
                i: 2
            },
            {
                id: "IojJZS7v",
                label: "Wounded",
                expression: "hp>50% && hp<=75%",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    parent: "",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionX: false,
                    linkDimensionY: false,
                    linkOpacity: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0.51,
                    scaleX: 0.76,
                    scaleY: 0.76,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Wounded",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#ffbb00",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: null
                        }
                    },
                    label: "Wounded",
                    id: "IojJZS7v"
                },
                group: "Health State Overlay",
                i: 3
            }
        ],
        id: "JNClkgGU"
    },
    {
        name: "Health State Text Overlay - Passed Check",
        hint: "Same as Health State Text Overlay except also requiring the Token actor to have Reveal Health active effect applied to it.",
        img: "https://user-images.githubusercontent.com/7693704/243429385-f62b111c-3d9c-4cd8-9c27-f5b13e09fea2.png",
        group: "Health",
        mappings: [
            {
                id: "k0XbFE7a",
                label: "Bloodied",
                expression: "Reveal Health && hp>25% && hp<=50%",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    parent: "",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionX: false,
                    linkDimensionY: false,
                    linkOpacity: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0.51,
                    scaleX: 0.76,
                    scaleY: 0.76,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Bloodied",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#ff5900",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: null
                        }
                    },
                    label: "Bloodied",
                    id: "k0XbFE7a"
                },
                group: "Health State Overlay - Passed Check",
                i: 0
            },
            {
                id: "a1VxhnWK",
                label: "Critical",
                expression: "Reveal Health && hp>0 && hp<=25%",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    parent: "",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionX: false,
                    linkDimensionY: false,
                    linkOpacity: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0.51,
                    scaleX: 0.76,
                    scaleY: 0.76,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Critical",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#ff0000",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: null
                        }
                    },
                    label: "Critical",
                    id: "a1VxhnWK"
                },
                group: "Health State Overlay - Passed Check",
                i: 1
            },
            {
                id: "DNuBTXe8",
                label: "Healthy",
                expression: "Reveal Health && hp>75%",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    parent: "",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionX: false,
                    linkDimensionY: false,
                    linkOpacity: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0.51,
                    scaleX: 0.76,
                    scaleY: 0.76,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Healthy",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#2bff00",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: null
                        }
                    },
                    label: "Healthy",
                    id: "DNuBTXe8"
                },
                group: "Health State Overlay - Passed Check",
                i: 2
            },
            {
                id: "ROPjrvLu",
                label: "Wounded",
                expression: "Reveal Health && hp>50% && hp<=75%",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    parent: "",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionX: false,
                    linkDimensionY: false,
                    linkOpacity: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0.51,
                    scaleX: 0.76,
                    scaleY: 0.76,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Wounded",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#ffbb00",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: null
                        }
                    },
                    label: "Wounded",
                    id: "ROPjrvLu"
                },
                group: "Health State Overlay - Passed Check",
                i: 3
            }
        ],
        id: "0ZJQiOdD"
    },
    {
        name: "Fancy Nameplate",
        hint: "Displays a curved red nameplate underneath the token.",
        img: "https://user-images.githubusercontent.com/7693704/244439674-12510686-2f72-44b3-8a1d-e6cc7fbb00c6.png",
        mappings: [
            {
                id: "DTbwvQiG",
                label: "Token Nameplate",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    parent: "",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionX: false,
                    linkDimensionY: false,
                    linkOpacity: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: -0.51,
                    scaleX: 0.68,
                    scaleY: 0.68,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "{{name}}",
                        fontFamily: "Modesto Condensed",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#ff0000",
                        dropShadow: "true",
                        strokeThickness: 3,
                        stroke: "#111111",
                        curve: {
                            radius: 450,
                            invert: true
                        }
                    },
                    shapes: [
                        {
                            line: {
                                width: 1,
                                color: "#111111",
                                alpha: 1
                            },
                            fill: {
                                color: "#111111",
                                alpha: 1
                            }
                        }
                    ],
                    label: "Token Nameplate"
                },
                group: "Nameplate",
                i: 0
            }
        ],
        id: "Ik1uNcWU"
    },
    {
        name: "Info Box #1",
        hint: "Displays information about the token/actor when hovering over or controlling them. This box will adjust to canvas zoom.",
        img: "https://user-images.githubusercontent.com/7693704/244441852-b50f3ca6-e0c3-4ce0-b498-ddd00edcbdca.png",
        system: "dnd5e",
        group: "Info",
        mappings: [
            {
                id: "W8BPK9hv",
                label: "Box Background",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "W8BPK9hv",
                    parentID: "",
                    ui: true,
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: true,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.55,
                    offsetY: 0,
                    scaleX: 0.73,
                    scaleY: 0.73,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "DropShadowFilter",
                    filterOptions: {
                        rotation: 45,
                        distance: 16.9,
                        color: "#000000",
                        alpha: 0.52,
                        shadowOnly: false,
                        blur: 2,
                        quality: 3
                    },
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: true,
                    limitOnHighlight: false,
                    limitOnControl: true,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "rectangle",
                                x: "0",
                                y: "0",
                                width: "450",
                                height: "200",
                                radius: "0"
                            },
                            label: "",
                            line: {
                                width: 2,
                                color: "#ffffff",
                                alpha: 1
                            },
                            fill: {
                                color: "#508fe2",
                                color2: "",
                                prc: "",
                                alpha: 0.55
                            }
                        }
                    ],
                    effect: "",
                    label: "Box Background"
                },
                group: "Info Box",
                i: 0
            },
            {
                id: "bkoP4Qpo",
                label: "Legendary Actions",
                expression: "actor.system.resources.legact.max>0",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    id: "bkoP4Qpo",
                    parentID: "W8BPK9hv",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.47,
                    offsetY: -0.02,
                    scaleX: 0.5,
                    scaleY: 0.5,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Legendary: Action {{actor.system.resources.legact.value}}/{{actor.system.resources.legact.max}} Resistance {{actor.system.resources.legres.value}}/{{actor.system.resources.legres.max}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Legendary Actions"
                },
                group: "Info Box",
                i: 1
            },
            {
                id: "OvcWUW13",
                label: "Mods",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "OvcWUW13",
                    parentID: "W8BPK9hv",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: -0.38,
                    scaleX: 0.57,
                    scaleY: 0.57,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "STR {{actor.system.abilities.str.mod}}  DEX {{actor.system.abilities.dex.mod}}  CON {{actor.system.abilities.con.mod}}  INT {{actor.system.abilities.int.mod}}  WIS {{actor.system.abilities.wis.mod}}  CHA {{actor.system.abilities.cha.mod}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Mods"
                },
                group: "Info Box",
                i: 2
            },
            {
                id: "jybTYLTB",
                label: "Token Name",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 51,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "jybTYLTB",
                    parentID: "W8BPK9hv",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.47,
                    offsetY: 0.35,
                    scaleX: 0.77,
                    scaleY: 0.77,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Name: {{name}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Token Name"
                },
                group: "Info Box",
                i: 3
            },
            {
                id: "bGbHPbw6",
                label: "HP",
                expression: "hp>40%",
                imgName: "",
                imgSrc: "",
                priority: 52,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    id: "bGbHPbw6",
                    parentID: "W8BPK9hv",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.47,
                    offsetY: 0.23,
                    scaleX: 0.82,
                    scaleY: 0.82,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "HP: {{actor.system.attributes.hp.value}}/{{actor.system.attributes.hp.max}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#6b6b6b",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "HP"
                },
                group: "Info Box",
                i: 4
            },
            {
                id: "S9gXdyGY",
                label: "Low HP",
                expression: "hp<=40%",
                imgName: "",
                imgSrc: "",
                priority: 52,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    id: "S9gXdyGY",
                    parentID: "W8BPK9hv",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.47,
                    offsetY: 0.23,
                    scaleX: 0.82,
                    scaleY: 0.82,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "HP: {{actor.system.attributes.hp.value}}/{{actor.system.attributes.hp.max}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#ff0000",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#6b6b6b",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Low HP"
                },
                group: "Info Box",
                i: 5
            },
            {
                id: "k9Ws74Hc",
                label: "Actor AC",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 53,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "k9Ws74Hc",
                    parentID: "W8BPK9hv",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.25,
                    offsetY: 0.46,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "AC: {{actor.system.attributes.ac.value}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Actor AC"
                },
                group: "Info Box",
                i: 6
            },
            {
                id: "eIxjLZmy",
                label: "Movement Label",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 54,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "eIxjLZmy",
                    parentID: "W8BPK9hv",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.25,
                    offsetY: 0.2,
                    scaleX: 0.61,
                    scaleY: 0.61,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Movement",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Movement Label"
                },
                group: "Info Box",
                i: 7
            },
            {
                id: "k5xYpZAZ",
                label: "Movement Walk",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 55,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "k5xYpZAZ",
                    parentID: "W8BPK9hv",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.36,
                    offsetY: -0.03,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "{{actor.system.attributes.movement.walk}}ft",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Movement Walk"
                },
                group: "Info Box",
                i: 8
            },
            {
                id: "dHHZRQXG",
                label: "Movement Fly",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 56,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "dHHZRQXG",
                    parentID: "W8BPK9hv",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.36,
                    offsetY: -0.16,
                    scaleX: 0.33,
                    scaleY: 0.33,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Fly {{actor.system.attributes.movement.fly}}, Swim {{actor.system.attributes.movement.swim}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Movement Fly"
                },
                group: "Info Box",
                i: 9
            }
        ],
        id: "wuMcLy3T"
    },
    {
        name: "Info Box #2",
        hint: "Displays information about the token/actor when hovering over or controlling them. This box will adjust to canvas zoom.",
        img: "https://user-images.githubusercontent.com/7693704/244750685-81988600-5153-4d29-acb0-2c62111bed14.png",
        system: "dnd5e",
        mappings: [
            {
                id: "f0pV6Pnl",
                label: "Box Background",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "f0pV6Pnl",
                    parentID: "",
                    ui: true,
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: true,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.55,
                    offsetY: 0,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: true,
                    limitOnHighlight: false,
                    limitOnControl: true,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "rectangle",
                                x: "0",
                                y: "0",
                                width: "200",
                                height: "300",
                                radius: "0"
                            },
                            label: "",
                            line: {
                                width: 2,
                                color: "#ffffff",
                                alpha: 1
                            },
                            fill: {
                                color: "#2e5a94",
                                color2: "",
                                prc: "",
                                alpha: 0.9
                            }
                        }
                    ],
                    effect: "",
                    label: "Box Background"
                },
                group: "Info Box #2",
                i: 0
            },
            {
                id: "n2Adi1fi",
                label: "HP",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 51,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "n2Adi1fi",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.45,
                    offsetY: 0.42,
                    scaleX: 0.84,
                    scaleY: 0.84,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "HP: {{actor.system.attributes.hp.value}}/{{actor.system.attributes.hp.max}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "HP"
                },
                group: "Info Box #2",
                i: 1
            },
            {
                id: "hCKVzw3Z",
                label: " AC",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 52,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "hCKVzw3Z",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.45,
                    offsetY: 0.31,
                    scaleX: 0.84,
                    scaleY: 0.84,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "AC: {{actor.system.attributes.ac.value}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: " AC"
                },
                group: "Info Box #2",
                i: 2
            },
            {
                id: "2nYmUTwu",
                label: " Speed",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 53,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "2nYmUTwu",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.45,
                    offsetY: 0.2,
                    scaleX: 0.84,
                    scaleY: 0.84,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Speed: {{actor.system.attributes.movement.walk}}ft",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: " Speed"
                },
                group: "Info Box #2",
                i: 3
            },
            {
                id: "s1NtDiUV",
                label: "Perception",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 54,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "s1NtDiUV",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0.15,
                    scaleX: 0.84,
                    scaleY: 0.84,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Perception",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Perception"
                },
                group: "Info Box #2",
                i: 4
            },
            {
                id: "jYeRIoG2",
                label: "Passive Perception",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 55,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "jYeRIoG2",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.47,
                    offsetY: 0,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Passive: {{actor.system.skills.prc.passive}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Passive Perception"
                },
                group: "Info Box #2",
                i: 5
            },
            {
                id: "KYMdkTVI",
                label: "Active Perception",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 56,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "KYMdkTVI",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.48,
                    offsetY: 0,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 1,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Active: {{actor.system.skills.prc.total}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Active Perception"
                },
                group: "Info Box #2",
                i: 6
            },
            {
                id: "Ewbg54II",
                label: "CHA",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "Ewbg54II",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.31,
                    offsetY: -0.3,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "CHA\\n{{actor.system.abilities.cha.mod}} {{actor.system.abilities.cha.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "CHA"
                },
                group: "Info Box #2",
                i: 7
            },
            {
                id: "2le1Nagp",
                label: "CON",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "2le1Nagp",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.31,
                    offsetY: -0.11,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "CON\\n{{actor.system.abilities.con.mod}} {{actor.system.abilities.con.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "CON"
                },
                group: "Info Box #2",
                i: 8
            },
            {
                id: "ahKmjzLj",
                label: "DEX",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "ahKmjzLj",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: -0.11,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "DEX\\n{{actor.system.abilities.dex.mod}} {{actor.system.abilities.dex.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "DEX"
                },
                group: "Info Box #2",
                i: 9
            },
            {
                id: "gQzyq0zm",
                label: "INT",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "gQzyq0zm",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.32,
                    offsetY: -0.3,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "INT\\n{{actor.system.abilities.int.mod}} {{actor.system.abilities.int.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "INT"
                },
                group: "Info Box #2",
                i: 10
            },
            {
                id: "hYGg1oAt",
                label: "STR",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "hYGg1oAt",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.32,
                    offsetY: -0.11,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "STR\\n{{actor.system.abilities.str.mod}} {{actor.system.abilities.str.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "STR"
                },
                group: "Info Box #2",
                i: 11
            },
            {
                id: "uQ5zS3K6",
                label: "WIS",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "uQ5zS3K6",
                    parentID: "f0pV6Pnl",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: -0.3,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "WIS\\n{{actor.system.abilities.wis.mod}} {{actor.system.abilities.wis.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "WIS"
                },
                group: "Info Box #2",
                i: 12
            }
        ],
        id: "Wtq9HDsX"
    },
    {
        name: "Info Box #3",
        hint: "Displays information about the token/actor when hovering over or controlling them. This box will adjust to canvas zoom.",
        img: "https://user-images.githubusercontent.com/7693704/244750246-794625b9-9e1d-4322-9265-fc295f02ca2b.png",
        system: "dnd5e",
        mappings: [
            {
                id: "Gt11vjXV",
                label: "Box Background",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "Gt11vjXV",
                    parentID: "",
                    ui: true,
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: true,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.55,
                    offsetY: 0,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: true,
                    limitOnHighlight: false,
                    limitOnControl: true,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "rectangle",
                                x: "0",
                                y: "0",
                                width: "240",
                                height: "300",
                                radius: "0"
                            },
                            label: "",
                            line: {
                                width: 2,
                                color: "#ffffff",
                                alpha: 1
                            },
                            fill: {
                                color: "#2e5a94",
                                color2: "",
                                prc: "",
                                alpha: 0.9
                            }
                        }
                    ],
                    effect: "",
                    label: "Box Background"
                },
                group: "Info Box #3",
                i: 0
            },
            {
                id: "o4XWzdDM",
                label: "HP",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 51,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "o4XWzdDM",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.44,
                    offsetY: 0.42,
                    scaleX: 0.84,
                    scaleY: 0.84,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: " {{actor.system.attributes.hp.value}}/{{actor.system.attributes.hp.max}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "HP"
                },
                group: "Info Box #3",
                i: 1
            },
            {
                id: "eAv2dSV6",
                label: "AC",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 52,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "eAv2dSV6",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.43,
                    offsetY: 0.28,
                    scaleX: 0.84,
                    scaleY: 0.84,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: " {{actor.system.attributes.ac.value}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "AC"
                },
                group: "Info Box #3",
                i: 2
            },
            {
                id: "SCfkWTni",
                label: "Fly Speed",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 53,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "SCfkWTni",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.04,
                    offsetY: 0.13,
                    scaleX: 0.84,
                    scaleY: 0.84,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: " {{actor.system.attributes.movement.fly}}ft",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Fly Speed"
                },
                group: "Info Box #3",
                i: 3
            },
            {
                id: "e5LPzVta",
                label: "Walk Speed",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 53,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "e5LPzVta",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.45,
                    offsetY: 0.13,
                    scaleX: 0.84,
                    scaleY: 0.84,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: " {{actor.system.attributes.movement.walk}}ft",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Walk Speed"
                },
                group: "Info Box #3",
                i: 4
            },
            {
                id: "XlopagaT",
                label: "Passive Perception",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 55,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "XlopagaT",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.45,
                    offsetY: -0.02,
                    scaleX: 0.83,
                    scaleY: 0.83,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: " {{actor.system.skills.prc.passive}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Passive Perception"
                },
                group: "Info Box #3",
                i: 5
            },
            {
                id: "CeXgVxA0",
                label: "Active Perception",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 56,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "CeXgVxA0",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.03,
                    offsetY: -0.02,
                    scaleX: 0.83,
                    scaleY: 0.83,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: " {{actor.system.skills.prc.total}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Active Perception"
                },
                group: "Info Box #3",
                i: 6
            },
            {
                id: "0WWf1iGM",
                label: "CHA",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "0WWf1iGM",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.31,
                    offsetY: -0.3,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "CHA\\n{{actor.system.abilities.cha.mod}}  {{actor.system.abilities.cha.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "CHA"
                },
                group: "Info Box #3",
                i: 7
            },
            {
                id: "AU8tTXat",
                label: "CON",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "AU8tTXat",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.31,
                    offsetY: -0.11,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "CON\\n{{actor.system.abilities.con.mod}}  {{actor.system.abilities.con.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "CON"
                },
                group: "Info Box #3",
                i: 8
            },
            {
                id: "JZKNmgvY",
                label: "DEX",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "JZKNmgvY",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: -0.11,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "DEX\\n{{actor.system.abilities.dex.mod}}  {{actor.system.abilities.dex.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "DEX"
                },
                group: "Info Box #3",
                i: 9
            },
            {
                id: "AUGurJtx",
                label: "INT",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "AUGurJtx",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.32,
                    offsetY: -0.3,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "INT\\n{{actor.system.abilities.int.mod}}  {{actor.system.abilities.int.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "INT"
                },
                group: "Info Box #3",
                i: 10
            },
            {
                id: "z0PMTFxo",
                label: "STR",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "z0PMTFxo",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0.32,
                    offsetY: -0.11,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "STR\\n{{actor.system.abilities.str.mod}}  {{actor.system.abilities.str.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "STR"
                },
                group: "Info Box #3",
                i: 11
            },
            {
                id: "YXUiGPBv",
                label: "WIS",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 57,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "YXUiGPBv",
                    parentID: "Gt11vjXV",
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: true,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: -0.3,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "WIS\\n{{actor.system.abilities.wis.mod}}  {{actor.system.abilities.wis.save}}",
                        fontFamily: "Signika",
                        fontSize: 36,
                        letterSpacing: 0,
                        fill: "#FFFFFF",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "WIS"
                },
                group: "Info Box #3",
                i: 12
            }
        ],
        id: "vQJ3coCJ"
    },
    {
        name: "Facing Direction",
        hint: "Displays an arrow in the top-right corner of the token showing the direction it is facing.",
        img: "https://user-images.githubusercontent.com/7693704/244647284-2213caf5-6d49-4413-ab5f-83901ffbc8e6.png",
        mappings: [
            {
                id: "9UEOkJ1J",
                label: "Arrow",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "9UEOkJ1J",
                    parentID: "",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: true,
                    animation: {
                        relative: true,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.5,
                    offsetY: 0.5,
                    scaleX: 0.51,
                    scaleY: 0.51,
                    angle: 90,
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "➢",
                        fontFamily: "Signika",
                        fontSize: 63,
                        letterSpacing: 0,
                        fill: "#ff0000",
                        dropShadow: null,
                        strokeThickness: 3,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Arrow"
                },
                group: "Facing Direction",
                i: 0
            }
        ],
        id: "Z8CTgmOg"
    },
    {
        name: "Combat Markers",
        hint: "Displays rotating markers for tokens in combat.",
        img: "https://user-images.githubusercontent.com/7693704/257478593-81b9192d-1ffe-4f0b-8e5d-806218d7e25f.png",
        mappings: [
            {
                id: "9R3glzOK",
                label: "Your Turn is Next!",
                expression: "combat-turn-next",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    label: "Your Turn is Next!",
                    parent: "",
                    underlay: true,
                    bottom: true,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: true,
                        duration: 30000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: false,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0,
                    scaleX: 1.6,
                    scaleY: 1.6,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "Next Turn  =  = =  =  =  = Next turn =  =  =  =  = ",
                        fontFamily: "Signika",
                        fontSize: 41,
                        letterSpacing: 0,
                        fill: "#e6a800",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 125,
                            invert: false
                        }
                    },
                    effect: ""
                },
                group: "Combat",
                i: 0
            },
            {
                id: "qoWG5AD0",
                label: "Your Turn!",
                expression: "combat-turn",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    label: "Your Turn!",
                    parent: "",
                    underlay: true,
                    bottom: true,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: true,
                        duration: 30000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: true,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: false,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: 0,
                    offsetY: 0,
                    scaleX: 1.6,
                    scaleY: 1.6,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "= Your Turn  =  = =  =  =  = Your turn =  =  =  =  =  ",
                        fontFamily: "Signika",
                        fontSize: 41,
                        letterSpacing: 0,
                        fill: "#00ace6",
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 125,
                            invert: false
                        }
                    },
                    effect: ""
                },
                group: "Combat",
                i: 1
            }
        ],
        id: "YpoX5zxO"
    },
    {
        name: "Disposition Markers",
        hint: "Displays circles underneath tokens coloured based on their disposition.",
        img: "https://user-images.githubusercontent.com/7693704/246497702-5de47dc9-21ef-43a1-86db-b3f85eb8ddb1.png",
        mappings: [
            {
                id: "TzP6MBC1",
                label: "Friendly",
                expression: "disposition=1",
                codeExp: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    id: "TzP6MBC1",
                    parentID: "",
                    underlay: true,
                    bottom: true,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: "5000",
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    imgLinked: false,
                    repeating: false,
                    alpha: "1",
                    tint: "#1acb2f",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    width: "",
                    height: "",
                    scaleX: "0.24",
                    scaleY: "0.24",
                    angle: "0",
                    pOffsetX: "",
                    pOffsetY: "",
                    offsetX: "0",
                    offsetY: "0",
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedToOwner: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnHUD: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#FFFFFF",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: "36",
                        align: "center",
                        letterSpacing: "0",
                        dropShadow: "true",
                        strokeThickness: "1",
                        stroke: "#111111",
                        wordWrap: false,
                        wordWrapWidth: "200",
                        breakWords: false,
                        maxHeight: "0",
                        curve: {
                            angle: "0",
                            radius: "0",
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "ellipse",
                                x: "0",
                                y: "0",
                                width: "{{object.w}} * @scale",
                                height: "{{object.h}} * @scale"
                            },
                            label: "",
                            line: {
                                width: "0",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ffffff",
                                alpha: "0.75",
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "ellipse",
                                x: "{{object.w}} * @inner",
                                y: "{{object.w}} * @inner",
                                width: "{{object.w}} * @scale - {{object.w}} * @inner",
                                height: "{{object.h}} * @scale - {{object.h}} * @inner"
                            },
                            label: "",
                            line: {
                                width: "0",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#b8b8b8",
                                alpha: "0.7",
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        }
                    ],
                    variables: [
                        {
                            name: "scale",
                            value: "2.3"
                        },
                        {
                            name: "inner",
                            value: "0.3"
                        }
                    ],
                    effect: "",
                    interactivity: [],
                    label: "Friendly"
                },
                group: "Disposition Markers",
                i: 2
            },
            {
                id: "oIsQWISB",
                label: "Hostile",
                expression: "disposition=-1",
                codeExp: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    id: "oIsQWISB",
                    parentID: "",
                    underlay: true,
                    bottom: true,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: "5000",
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    imgLinked: false,
                    repeating: false,
                    alpha: "1",
                    tint: "#eb0000",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    width: "",
                    height: "",
                    scaleX: "0.24",
                    scaleY: "0.24",
                    angle: "0",
                    pOffsetX: "",
                    pOffsetY: "",
                    offsetX: "0",
                    offsetY: "0",
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedToOwner: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnHUD: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#FFFFFF",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: "36",
                        align: "center",
                        letterSpacing: "0",
                        dropShadow: "true",
                        strokeThickness: "1",
                        stroke: "#111111",
                        wordWrap: false,
                        wordWrapWidth: "200",
                        breakWords: false,
                        maxHeight: "0",
                        curve: {
                            angle: "0",
                            radius: "0",
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "ellipse",
                                x: "0",
                                y: "0",
                                width: "{{object.w}} * @scale",
                                height: "{{object.h}} * @scale"
                            },
                            label: "",
                            line: {
                                width: "0",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ffffff",
                                alpha: "0.75",
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "ellipse",
                                x: "{{object.w}} * @inner",
                                y: "{{object.w}} * @inner",
                                width: "{{object.w}} * @scale - {{object.w}} * @inner",
                                height: "{{object.h}} * @scale - {{object.h}} * @inner"
                            },
                            label: "",
                            line: {
                                width: "0",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#b8b8b8",
                                alpha: "0.7",
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        }
                    ],
                    variables: [
                        {
                            name: "scale",
                            value: "2.3"
                        },
                        {
                            name: "inner",
                            value: "0.3"
                        }
                    ],
                    effect: "",
                    interactivity: [],
                    label: "Hostile"
                },
                group: "Disposition Markers",
                i: 3
            },
            {
                id: "fYxJ9Bbc",
                label: "Neutral",
                expression: "disposition=0",
                codeExp: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    id: "fYxJ9Bbc",
                    parentID: "",
                    underlay: true,
                    bottom: true,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: "5000",
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    imgLinked: false,
                    repeating: false,
                    alpha: "1",
                    tint: "",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    width: "",
                    height: "",
                    scaleX: "0.24",
                    scaleY: "0.24",
                    angle: "0",
                    pOffsetX: "",
                    pOffsetY: "",
                    offsetX: "0",
                    offsetY: "0",
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedToOwner: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnHUD: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#FFFFFF",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: "36",
                        align: "center",
                        letterSpacing: "0",
                        dropShadow: "true",
                        strokeThickness: "1",
                        stroke: "#111111",
                        wordWrap: false,
                        wordWrapWidth: "200",
                        breakWords: false,
                        maxHeight: "0",
                        curve: {
                            angle: "0",
                            radius: "0",
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "ellipse",
                                x: "0",
                                y: "0",
                                width: "{{object.w}} * @scale",
                                height: "{{object.h}} * @scale"
                            },
                            label: "",
                            line: {
                                width: "0",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ffffff",
                                alpha: "0.75",
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "ellipse",
                                x: "{{object.w}} * @inner",
                                y: "{{object.w}} * @inner",
                                width: "{{object.w}} * @scale - {{object.w}} * @inner",
                                height: "{{object.h}} * @scale - {{object.h}} * @inner"
                            },
                            label: "",
                            line: {
                                width: "0",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#b8b8b8",
                                alpha: "0.7",
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        }
                    ],
                    variables: [
                        {
                            name: "scale",
                            value: "2.3"
                        },
                        {
                            name: "inner",
                            value: "0.3"
                        }
                    ],
                    effect: "",
                    interactivity: [],
                    label: "Neutral"
                },
                group: "Disposition Markers",
                i: 4
            },
            {
                id: "PyEXXb5J",
                label: "Secret",
                expression: "disposition=-2",
                codeExp: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: false,
                disabled: false,
                overlayConfig: {
                    id: "PyEXXb5J",
                    parentID: "",
                    underlay: true,
                    bottom: true,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: "5000",
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    imgLinked: false,
                    repeating: false,
                    alpha: "1",
                    tint: "#ba24ff",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    width: "",
                    height: "",
                    scaleX: "0.24",
                    scaleY: "0.24",
                    angle: "0",
                    pOffsetX: "",
                    pOffsetY: "",
                    offsetX: "0",
                    offsetY: "0",
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedToOwner: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnHUD: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#FFFFFF",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: "36",
                        align: "center",
                        letterSpacing: "0",
                        dropShadow: "true",
                        strokeThickness: "1",
                        stroke: "#111111",
                        wordWrap: false,
                        wordWrapWidth: "200",
                        breakWords: false,
                        maxHeight: "0",
                        curve: {
                            angle: "0",
                            radius: "0",
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "ellipse",
                                x: "0",
                                y: "0",
                                width: "{{object.w}} * @scale",
                                height: "{{object.h}} * @scale"
                            },
                            label: "",
                            line: {
                                width: "0",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ffffff",
                                alpha: "0.75",
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "ellipse",
                                x: "{{object.w}} * @inner",
                                y: "{{object.w}} * @inner",
                                width: "{{object.w}} * @scale - {{object.w}} * @inner",
                                height: "{{object.h}} * @scale - {{object.h}} * @inner"
                            },
                            label: "",
                            line: {
                                width: "0",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#b8b8b8",
                                alpha: "0.7",
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        }
                    ],
                    variables: [
                        {
                            name: "scale",
                            value: "2.3"
                        },
                        {
                            name: "inner",
                            value: "0.3"
                        }
                    ],
                    effect: "",
                    interactivity: [],
                    label: "Secret"
                },
                group: "Disposition Markers",
                i: 5
            }
        ],
        id: "yjqfAagB"
    },
    {
        name: "Health Bar",
        hint: "A recreation of the standard health bar using Overlays.",
        img: "https://user-images.githubusercontent.com/7693704/257246890-d41894a0-7f40-4e91-a47a-bc10d6f198e6.png",
        group: "Health",
        mappings: [
            {
                id: "dgIBKbcU",
                label: "Health Bar",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "dgIBKbcU",
                    parentID: "",
                    ui: true,
                    underlay: true,
                    bottom: true,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    repeating: false,
                    alpha: 1,
                    tint: "",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    offsetX: 0,
                    offsetY: -0.5,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#FFFFFF",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: 36,
                        align: "left",
                        letterSpacing: 0,
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "rectangle",
                                x: "0",
                                y: "0",
                                width: "{{object.w}}",
                                height: "{{object.h}} * @height",
                                radius: "3"
                            },
                            label: "",
                            line: {
                                width: 1,
                                color: "#000000",
                                alpha: 1
                            },
                            fill: {
                                color: "#5c5c5c",
                                alpha: 0.65,
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "rectangle",
                                x: "0",
                                y: "0",
                                width: "{{object.w}} * ( {{hp}} / {{hpMax}} )",
                                height: "{{object.h}} * @height",
                                radius: "3"
                            },
                            label: "",
                            line: {
                                width: 1,
                                color: "#000000",
                                alpha: 1
                            },
                            fill: {
                                color: "#ff0000",
                                alpha: 1,
                                interpolateColor: {
                                    color2: "#74da0e",
                                    prc: "{{hp}} / {{hpMax}}"
                                }
                            },
                            repeating: false
                        }
                    ],
                    variables: [
                        {
                            name: "height",
                            value: "0.079"
                        }
                    ],
                    effect: "",
                    label: "Health Bar"
                },
                group: "Health Bar",
                i: 0
            }
        ],
        id: "GDyvkEB4"
    },
    {
        name: "Health Ring",
        hint: "A ring shaped health bar.",
        img: "https://user-images.githubusercontent.com/7693704/257246432-a339394f-489a-4436-9d4b-427c285d4f27.png",
        group: "Health",
        mappings: [
            {
                id: "erOTHzIc",
                label: "Health Ring",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "erOTHzIc",
                    parentID: "",
                    ui: true,
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    repeating: false,
                    alpha: 1,
                    tint: "",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    offsetX: 0,
                    offsetY: 0,
                    scaleX: 1.02,
                    scaleY: 1.02,
                    angle: -90,
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#ffffff",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: 36,
                        align: "left",
                        letterSpacing: 0,
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "{{object.w}} / @ringScale * @innerRadius",
                                outerRadius: "{{object.w}} / @ringScale * @outerRadius",
                                startAngle: "0",
                                endAngle: "360"
                            },
                            label: "Background",
                            line: {
                                width: 0,
                                color: "#000000",
                                alpha: 1
                            },
                            fill: {
                                color: "#b0b0b0",
                                alpha: 0.6,
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "{{object.w}} / @ringScale * @innerRadius",
                                outerRadius: "{{object.w}} / @ringScale * @outerRadius",
                                startAngle: "0",
                                endAngle: "{{hp}} / {{hpMax}} * 360"
                            },
                            label: "Health Tracker",
                            line: {
                                width: 0,
                                color: "#000000",
                                alpha: 1
                            },
                            fill: {
                                color: "#ff0000",
                                alpha: 1,
                                interpolateColor: {
                                    color2: "#74da0e",
                                    prc: "{{hp}} / {{hpMax}}"
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "{{object.w}} / @ringScale * @innerRadius",
                                outerRadius: "{{object.w}} / @ringScale * @outerRadius",
                                startAngle: "0",
                                endAngle: "360"
                            },
                            label: "Outline",
                            line: {
                                width: 1,
                                color: "#000000",
                                alpha: 1
                            },
                            fill: {
                                color: "#b0b0b0",
                                alpha: 0,
                                interpolateColor: {
                                    color2: "",
                                    prc: ""
                                }
                            },
                            repeating: false
                        }
                    ],
                    variables: [
                        {
                            name: "ringScale",
                            value: "1.8"
                        },
                        {
                            name: "innerRadius",
                            value: "0.9"
                        },
                        {
                            name: "outerRadius",
                            value: "1.0"
                        }
                    ],
                    effect: "",
                    label: "Health Ring"
                },
                group: "Health Ring",
                i: 0
            }
        ],
        id: "yITi94hC"
    },
    {
        name: "Health Hearts",
        hint: "Displays up to 10 hearts to the right of the token based on their current health. Each heart is representative of 10% of the health.",
        img: "https://user-images.githubusercontent.com/7693704/257349483-1864d4ca-a2de-468d-872d-6d8c2847434a.png",
        group: "Health",
        mappings: [
            {
                id: "4uCpbtHY",
                label: "Hearts",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "4uCpbtHY",
                    parentID: "",
                    ui: true,
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: true,
                    linkDimensionsY: true,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    alpha: 1,
                    tint: "",
                    offsetX: -0.53,
                    offsetY: 0.5,
                    scaleX: 0.5,
                    scaleY: 0.5,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: " ",
                        repeating: true,
                        repeat: {
                            value: "{{hp}}",
                            increment: "10",
                            isPercentage: true,
                            maxValue: "{{hpMax}}",
                            perRow: "2",
                            maxRows: ""
                        },
                        fontFamily: "Signika",
                        fill: "#ff0000",
                        fontSize: 36,
                        align: "left",
                        letterSpacing: 0,
                        dropShadow: null,
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    effect: "",
                    label: "Hearts"
                },
                group: "Health Hearts",
                i: 0
            }
        ],
        id: "T2DrD0Em"
    },
    {
        name: "Health Circles",
        hint: "Displays up to 10 circles to the right of the token based on their current health. Each circle is representative of 10% of the health.",
        img: "https://user-images.githubusercontent.com/7693704/257476414-c42bdbc0-c57b-4367-8207-3e2e4273094f.png",
        group: "Health",
        mappings: [
            {
                id: "0vETg18v",
                label: "Health Circles",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "0vETg18v",
                    parentID: "",
                    ui: true,
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: true,
                    linkDimensionsY: true,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    repeating: false,
                    alpha: 1,
                    tint: "",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    offsetX: -0.52,
                    offsetY: 0.6,
                    scaleX: 0.46,
                    scaleY: 0.46,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#ffffff",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: 36,
                        align: "left",
                        letterSpacing: 0,
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "ellipse",
                                x: "0",
                                y: "0",
                                width: "25",
                                height: "25"
                            },
                            label: "",
                            line: {
                                width: 1,
                                color: "#000000",
                                alpha: 1
                            },
                            fill: {
                                color: "#ff0000",
                                alpha: 1,
                                interpolateColor: {
                                    color2: "#74da0e",
                                    prc: "{{hp}} / {{hpMax}}"
                                }
                            },
                            repeating: true,
                            repeat: {
                                value: "{{hp}}",
                                increment: "10",
                                isPercentage: true,
                                maxValue: "{{hpMax}}",
                                perRow: "2",
                                maxRows: "",
                                paddingX: "3",
                                paddingY: "3"
                            }
                        }
                    ],
                    effect: "",
                    label: "Health Circles"
                },
                group: "Health Circles",
                i: 0
            }
        ],
        id: "kJ0Fi54w"
    },
    {
        name: "Health Squares",
        hint: "Displays up to 10 squares to the right of the token based on their current health. Each square is representative of 10% of the health.",
        img: "https://user-images.githubusercontent.com/7693704/257477099-689cd23a-0e4a-4d9a-aaa2-bf88b169ede8.png",
        group: "Health",
        mappings: [
            {
                id: "0vETg18v",
                label: "Health Squares",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "0vETg18v",
                    parentID: "",
                    ui: true,
                    underlay: false,
                    bottom: false,
                    top: false,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: 5000,
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: true,
                    linkDimensionsY: true,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    repeating: false,
                    alpha: 1,
                    tint: "",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    offsetX: -0.52,
                    offsetY: 0.6,
                    scaleX: 0.46,
                    scaleY: 0.46,
                    angle: 0,
                    anchor: {
                        x: 0,
                        y: 0
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedUsers: [],
                    limitOnHover: false,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#ffffff",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: 36,
                        align: "left",
                        letterSpacing: 0,
                        dropShadow: "true",
                        strokeThickness: 1,
                        stroke: "#111111",
                        curve: {
                            radius: 0,
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "rectangle",
                                x: "0",
                                y: "0",
                                width: "50",
                                height: "50",
                                radius: "0"
                            },
                            label: "",
                            line: {
                                width: 1,
                                color: "#000000",
                                alpha: 1
                            },
                            fill: {
                                color: "#ff0000",
                                alpha: 1,
                                interpolateColor: {
                                    color2: "#74da0e",
                                    prc: "{{hp}} / {{hpMax}}"
                                }
                            },
                            repeating: true,
                            repeat: {
                                value: "{{hp}}",
                                increment: "10",
                                isPercentage: true,
                                maxValue: "{{hpMax}}",
                                perRow: "2",
                                maxRows: "",
                                paddingX: "3",
                                paddingY: "3"
                            }
                        }
                    ],
                    effect: "",
                    label: "Health Squares"
                },
                group: "Health Squares",
                i: 0
            }
        ],
        id: "zzeRhmmk"
    },
    {
        name: "Spell Slot Ring",
        hint: "Remaining spell slots represented as a ring.",
        img: "https://user-images.githubusercontent.com/7693704/261663740-444d86b9-ee9f-4a2f-963f-6886a2af29cc.png",
        system: "dnd5e",
        mappings: [
            {
                id: "1SS3KhwM",
                label: "Spell Slot Ring",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 50,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "1SS3KhwM",
                    parentID: "",
                    ui: true,
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: "5000",
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    repeating: false,
                    alpha: "1",
                    tint: "",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    width: "{{object.w}} * @Scale",
                    height: "{{object.w}} * @Scale",
                    scaleX: "1",
                    scaleY: "1",
                    angle: "0",
                    offsetX: "0",
                    offsetY: "0",
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedToOwner: true,
                    limitedUsers: [],
                    limitOnHover: true,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#ffffff",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: "36",
                        align: "left",
                        letterSpacing: "0",
                        dropShadow: "true",
                        strokeThickness: "1",
                        stroke: "#111111",
                        wordWrap: false,
                        wordWrapWidth: "200",
                        breakWords: false,
                        maxHeight: "0",
                        curve: {
                            angle: "0",
                            radius: "0",
                            invert: false
                        }
                    },
                    shapes: [
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer ",
                                startAngle: "0",
                                endAngle: "360"
                            },
                            label: "BaseLayer",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#3b3b3b",
                                alpha: "1",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90",
                                endAngle: "-90 + ( {{actor.system.spells.spell1.value}} * @Tick )"
                            },
                            label: "1st level",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff0000",
                                alpha: "1",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 4 * @Tick )",
                                endAngle: "-90 + ( 4 * @Tick ) + ( {{actor.system.spells.spell2.value}} * @Tick )"
                            },
                            label: "2nd Level",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff8800",
                                alpha: "1",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 7 * @Tick )",
                                endAngle: "-90 + ( 7 * @Tick ) + ( {{actor.system.spells.spell3.value}} * @Tick )"
                            },
                            label: "3rd Level",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ffdd00",
                                alpha: "1",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 10 * @Tick )",
                                endAngle: "-90 + ( 10 * @Tick ) + ( {{actor.system.spells.spell4.value}} * @Tick )"
                            },
                            label: "4th Level",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#37ff00",
                                alpha: "1",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 13 * @Tick )",
                                endAngle: "-90 + ( 13 * @Tick ) + ( {{actor.system.spells.spell5.value}} * @Tick )"
                            },
                            label: "5th Level",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#00ffcc",
                                alpha: "0.95",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 16 * @Tick )",
                                endAngle: "-90 + ( 16 * @Tick ) + ( {{actor.system.spells.spell6.value}} * @Tick )"
                            },
                            label: "6th Level",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#00b3ff",
                                alpha: "1",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 18 * @Tick )",
                                endAngle: "-90 + ( 18 * @Tick ) + ( {{actor.system.spells.spell7.value}} * @Tick )"
                            },
                            label: "7th Level",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#001eff",
                                alpha: "1",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 20 * @Tick )",
                                endAngle: "-90 + ( 20 * @Tick ) + ( {{actor.system.spells.spell8.value}} * @Tick )"
                            },
                            label: "8th Level",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ae00ff",
                                alpha: "1",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 21 * @Tick )",
                                endAngle: "-90 + ( 21 * @Tick ) + ( {{actor.system.spells.spell9.value}} * @Tick )"
                            },
                            label: "9th Level - Copy",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "1",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90",
                                endAngle: "-90 + ( 1 * @Tick )"
                            },
                            label: "Outline 1",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 1 * @Tick )",
                                endAngle: "-90 + ( 2 * @Tick )"
                            },
                            label: "Outline 2",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 2 * @Tick )",
                                endAngle: "-90 + ( 3 * @Tick )"
                            },
                            label: "Outline 3",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 3 * @Tick )",
                                endAngle: "-90 + ( 4 * @Tick )"
                            },
                            label: "Outline 4",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 4 * @Tick )",
                                endAngle: "-90 + ( 5 * @Tick )"
                            },
                            label: "Outline 5",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 5 * @Tick )",
                                endAngle: "-90 + ( 6 * @Tick )"
                            },
                            label: "Outline 6",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 6 * @Tick )",
                                endAngle: "-90 + ( 7 * @Tick )"
                            },
                            label: "Outline 7",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 7 * @Tick )",
                                endAngle: "-90 + ( 8 * @Tick )"
                            },
                            label: "Outline 8",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 8 * @Tick )",
                                endAngle: "-90 + ( 9 * @Tick )"
                            },
                            label: "Outline 9",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 9 * @Tick )",
                                endAngle: "-90 + ( 10 * @Tick )"
                            },
                            label: "Outline 10",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 10 * @Tick )",
                                endAngle: "-90 + ( 11 * @Tick )"
                            },
                            label: "Outline 11",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 11 * @Tick )",
                                endAngle: "-90 + ( 12 * @Tick )"
                            },
                            label: "Outline 12",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 12 * @Tick )",
                                endAngle: "-90 + ( 13 * @Tick )"
                            },
                            label: "Outline 13",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 13 * @Tick )",
                                endAngle: "-90 + ( 14 * @Tick )"
                            },
                            label: "Outline 14",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 14 * @Tick )",
                                endAngle: "-90 + ( 15 * @Tick )"
                            },
                            label: "Outline 15",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 15 * @Tick )",
                                endAngle: "-90 + ( 16 * @Tick )"
                            },
                            label: "Outline 16",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 16 * @Tick )",
                                endAngle: "-90 + ( 17 * @Tick )"
                            },
                            label: "Outline 17",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 17 * @Tick )",
                                endAngle: "-90 + ( 18 * @Tick )"
                            },
                            label: "Outline 18",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 18 * @Tick )",
                                endAngle: "-90 + ( 19 * @Tick )"
                            },
                            label: "Outline 19",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 19 * @Tick )",
                                endAngle: "-90 + ( 20 * @Tick )"
                            },
                            label: "Outline 20",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 20 * @Tick )",
                                endAngle: "-90 + ( 21 * @Tick )"
                            },
                            label: "Outline 21",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        },
                        {
                            shape: {
                                type: "torus",
                                x: "0",
                                y: "0",
                                innerRadius: "@Inner",
                                outerRadius: "@Outer",
                                startAngle: "-90 + ( 21 * @Tick )",
                                endAngle: "-90 + ( 22 * @Tick )"
                            },
                            label: "Outline 22",
                            line: {
                                width: "1",
                                color: "#000000",
                                alpha: "1"
                            },
                            fill: {
                                color: "#ff00ea",
                                alpha: "0",
                                interpolateColor: {
                                    color2: "#ffffff",
                                    prc: ""
                                }
                            },
                            repeating: false
                        }
                    ],
                    variables: [
                        {
                            name: "Tick",
                            value: "16.3636363636363636"
                        },
                        {
                            name: "Inner",
                            value: "66"
                        },
                        {
                            name: "Outer",
                            value: "80"
                        },
                        {
                            name: "Scale",
                            value: "1.8"
                        }
                    ],
                    effect: "",
                    label: "Spell Slot Ring"
                },
                group: "Spell Slot Ring",
                i: 0
            },
            {
                id: "3IAo8ZUu",
                label: "Spell Slot Numbers",
                expression: "",
                imgName: "",
                imgSrc: "",
                priority: 60,
                config: {},
                overlay: true,
                alwaysOn: true,
                disabled: false,
                overlayConfig: {
                    id: "3IAo8ZUu",
                    parentID: "",
                    underlay: false,
                    bottom: false,
                    top: true,
                    inheritTint: false,
                    linkRotation: false,
                    animation: {
                        relative: false,
                        rotate: false,
                        duration: "5000",
                        clockwise: true
                    },
                    linkMirror: false,
                    linkScale: false,
                    linkDimensionsX: false,
                    linkDimensionsY: false,
                    linkOpacity: false,
                    linkStageScale: false,
                    loop: true,
                    playOnce: false,
                    img: "",
                    repeating: false,
                    alpha: "1",
                    tint: "",
                    interpolateColor: {
                        color2: "",
                        prc: ""
                    },
                    width: "{{object.w}} * @Scale",
                    height: "{{object.w}} * @Scale",
                    scaleX: "1",
                    scaleY: "1",
                    angle: "1",
                    offsetX: "0",
                    offsetY: "0.009",
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    filter: "NONE",
                    alwaysVisible: false,
                    limitedToOwner: true,
                    limitedUsers: [],
                    limitOnHover: true,
                    limitOnHighlight: false,
                    limitOnControl: false,
                    limitOnEffect: "",
                    limitOnProperty: "",
                    text: {
                        text: "4455566778911112223334",
                        repeating: false,
                        fontFamily: "Signika",
                        fill: "#ffffff",
                        interpolateColor: {
                            color2: "",
                            prc: ""
                        },
                        fontSize: "45",
                        align: "left",
                        letterSpacing: "41.5",
                        dropShadow: null,
                        strokeThickness: "4",
                        stroke: "#111111",
                        wordWrap: false,
                        wordWrapWidth: "200",
                        breakWords: false,
                        maxHeight: "0",
                        curve: {
                            angle: "360",
                            radius: "220",
                            invert: false
                        }
                    },
                    variables: [
                        {
                            name: "Scale",
                            value: "1.85"
                        }
                    ],
                    effect: "",
                    label: "Spell Slot Numbers"
                },
                group: "Spell Slot Ring",
                i: 1
            }
        ],
        id: "FeFzTjjE"
    }
];

});

parcelRequire.register("6P9Lm", function(module, exports) {

$parcel$export(module.exports, "Templates", () => $4f7f142f232c908d$export$b78c417a59fec2a7);

var $etBGd = parcelRequire("etBGd");

var $b2HDo = parcelRequire("b2HDo");

var $eSPJO = parcelRequire("eSPJO");
class $4f7f142f232c908d$export$b78c417a59fec2a7 extends FormApplication {
    constructor({ mappings: mappings = null, callback: callback = null } = {}){
        super({}, {});
        this.mappings = mappings;
        this.callback = callback;
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-templates",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/templates.html",
            resizable: false,
            minimizable: false,
            title: "Mapping Templates",
            width: 500,
            height: "auto"
        });
    }
    async getData(options) {
        const data = super.getData(options);
        if (!this.category) this.category = (0, $b2HDo.TVA_CONFIG).templateMappings?.length ? "user" : "core";
        if (this.category === "user") this.templates = (0, $b2HDo.TVA_CONFIG).templateMappings;
        else if (this.category === "core") this.templates = (0, $etBGd.CORE_TEMPLATES);
        else this.templates = await $4f7f142f232c908d$var$communityTemplates();
        for (const template of this.templates)template.hint = template.hint?.replace(/(\r\n|\n|\r)/gm, "<br>");
        data.category = this.category;
        data.templates = this.templates;
        data.allowDelete = this.category === "user";
        data.allowCreate = this.category === "user";
        data.allowCopy = this.category === "community" || this.category === "core";
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        // Position tooltip
        const appWindow = html.closest("#token-variants-templates");
        html.find(".template").on("mouseover", (event)=>{
            const template = $(event.target).closest(".template");
            const pos = template.position();
            const tooltip = template.find(".tooltiptext");
            const windowPos = appWindow.position();
            tooltip.css("top", windowPos.top + pos.top).css("left", windowPos.left + pos.left);
            // Lazy load image
            const img = template.find("img");
            if (!img.attr("src")) img.attr("src", img.data("src"));
        });
        if (this.callback) html.find(".template").on("click", async (event)=>{
            const li = $(event.target).closest(".template");
            const id = li.data("id");
            const url = li.data("url");
            let mappings;
            let templateName;
            if (url) {
                const template = await $4f7f142f232c908d$var$getTemplateFromFileURL(url);
                if (template) mappings = template.mappings;
            } else if (id) {
                const template = this.templates.find((t)=>t.id === id);
                if (template) {
                    templateName = template.name;
                    mappings = template.mappings;
                }
            }
            if (mappings) this.callback(templateName, mappings);
        });
        html.find(".search").on("input", ()=>{
            const filter = html.find(".search").val().trim().toLowerCase();
            html.find(".template-list li").each(function() {
                const li = $(this);
                const description = li.find(".description").text().trim().toLowerCase();
                const name = li.data("name").trim().toLowerCase();
                const createdBy = li.data("creator").trim().toLowerCase();
                if (name.includes(filter) || description.includes(filter) || createdBy.includes(filter)) li.show();
                else li.hide();
            });
        });
        html.find('[name="category"]').on("change", (event)=>{
            this.category = event.target.value;
            this.render(true);
        });
        html.find(".delete").on("click", async (event)=>{
            event.preventDefault();
            event.stopPropagation();
            const id = $(event.target).closest(".template").data("id");
            if (id) {
                await (0, $b2HDo.updateSettings)({
                    templateMappings: (0, $b2HDo.TVA_CONFIG).templateMappings.filter((m)=>m.id !== id)
                });
                this.render(true);
            }
        });
        html.find(".copy").on("click", async (event)=>{
            event.preventDefault();
            event.stopPropagation();
            const id = $(event.target).closest(".template").data("id");
            if (id) {
                let template;
                if (this.category === "core") template = deepClone((0, $etBGd.CORE_TEMPLATES).find((t)=>t.id === id));
                else {
                    const fileURL = $(event.target).closest(".template").data("url");
                    if (fileURL) template = await $4f7f142f232c908d$var$getTemplateFromFileURL(fileURL);
                }
                if (template) {
                    (0, $b2HDo.TVA_CONFIG).templateMappings.push(template);
                    await (0, $b2HDo.updateSettings)({
                        templateMappings: (0, $b2HDo.TVA_CONFIG).templateMappings
                    });
                    ui.notifications.info(`Template {${template.name}} copied to User templates.`);
                    this.render(true);
                }
            }
        });
        html.find(".create").on("click", ()=>{
            (0, $eSPJO.showMappingSelectDialog)(this.mappings, {
                title1: "Create Template",
                callback: (selectedMappings)=>{
                    if (selectedMappings.length) (0, $eSPJO.showUserTemplateCreateDialog)(selectedMappings);
                }
            });
        });
    }
    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        buttons.unshift({
            label: "Upload Template",
            class: ".token-variants-submit-template",
            icon: "fa-solid fa-cloud-arrow-up",
            onclick: ()=>{
                new $4f7f142f232c908d$var$TemplateSubmissionForm().render(true);
            }
        });
        return buttons;
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {}
}
class $4f7f142f232c908d$var$TemplateSubmissionForm extends FormApplication {
    constructor(){
        super({}, {});
    }
    static apiKey = "AIzaSyCJpwIkpjrG10jaHwcpllvSChxRPawcMXE";
    static get pk() {
        const k2 = "AIzaSyCJpw";
        const k1 = "IkpjrG10jaHwcpllv";
        const k3 = "SChxRPawcMXE";
        return k2 + k1 + k3;
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-template-submission",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/templateSubmission.html",
            resizable: true,
            minimizable: false,
            closeOnSubmit: false,
            title: "Upload Template",
            width: 500,
            height: "auto"
        });
    }
    async getData(options) {
        const data = super.getData(options);
        data.systemID = game.system.id;
        data.systemTitle = game.system.title;
        data.templates = (0, $b2HDo.TVA_CONFIG).templateMappings;
        return data;
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        if (!formData.template) return;
        let template = (0, $b2HDo.TVA_CONFIG).templateMappings.find((t)=>t.id === formData.template);
        if (!template) return;
        const name = formData.name.trim() || template.name;
        const hint = formData.hint.trim() || template.hint?.trim();
        const createdBy = formData.createdBy.trim();
        const system = formData.system;
        const id = randomID();
        const img = formData.img.trim();
        const result = $4f7f142f232c908d$var$submitTemplate({
            id: id,
            name: name,
            hint: hint,
            img: img,
            createdBy: createdBy,
            system: system,
            mappings: template.mappings
        });
        if (result) this.close();
    }
}
function $4f7f142f232c908d$var$_setStringField(template, fields, field) {
    if (template[field] && template[field] !== "") fields[field] = {
        stringValue: template[field]
    };
}
async function $4f7f142f232c908d$var$submitTemplate(template) {
    const fields = {};
    [
        "name",
        "hint",
        "img",
        "id",
        "createdBy",
        "system"
    ].forEach((field)=>$4f7f142f232c908d$var$_setStringField(template, fields, field));
    fields.mappings = {
        stringValue: JSON.stringify(template.mappings)
    };
    fields.createTime = {
        integerValue: new Date().getTime()
    };
    fields.approved = {
        booleanValue: false
    };
    const response = await fetch(`https://firestore.googleapis.com/v1/projects/tva---templates/databases/(default)/documents/templates?key=${$4f7f142f232c908d$var$TemplateSubmissionForm.pk}`, {
        method: "POST",
        body: JSON.stringify({
            fields: fields
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    if (response.ok && response.status === 200) {
        ui.notifications.info("Template submission completed.");
        return true;
    } else {
        ui.notifications.warn("Template submission failed.");
        return false;
    }
}
const $4f7f142f232c908d$var$SEARCH_QUERY = {
    structuredQuery: {
        select: {
            fields: [
                {
                    fieldPath: "id"
                },
                {
                    fieldPath: "name"
                },
                {
                    fieldPath: "hint"
                },
                {
                    fieldPath: "createdBy"
                },
                {
                    fieldPath: "img"
                },
                {
                    fieldPath: "system"
                }
            ]
        },
        where: {
            fieldFilter: {
                field: {
                    fieldPath: "approved"
                },
                op: "EQUAL",
                value: {
                    booleanValue: true
                }
            }
        },
        from: [
            {
                collectionId: "templates"
            }
        ],
        orderBy: [
            {
                field: {
                    fieldPath: "createTime"
                }
            }
        ],
        offset: 0,
        limit: 50
    }
};
async function $4f7f142f232c908d$var$communityTemplates(search = null) {
    const response = await fetch(`https://firestore.googleapis.com/v1/projects/tva---templates/databases/(default)/documents:runQuery?key=${$4f7f142f232c908d$var$TemplateSubmissionForm.pk}`, {
        method: "POST",
        body: JSON.stringify($4f7f142f232c908d$var$SEARCH_QUERY),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const templates = [];
    if (response.ok && response.status === 200) {
        const documents = await response.json();
        for (let doc of documents)if ("document" in doc) templates.push($4f7f142f232c908d$var$_docToTemplate(doc.document));
    } else ui.notifications.warn("Failed to retrieve Community templates.");
    return templates;
}
function $4f7f142f232c908d$var$_docToTemplate(doc) {
    const template = {};
    [
        "id",
        "name",
        "mappings",
        "createdBy",
        "img",
        "hint",
        "system"
    ].forEach((f)=>{
        template[f] = doc.fields[f]?.stringValue || "";
    });
    if (template.mappings) template.mappings = JSON.parse(template.mappings);
    else template.fileURL = doc.name;
    if (!template.createdBy) template.createdBy = "Anonymous";
    return template;
}
async function $4f7f142f232c908d$var$getTemplateFromFileURL(fileURL) {
    const response = await fetch(`https://firestore.googleapis.com/v1/${fileURL}?key=${$4f7f142f232c908d$var$TemplateSubmissionForm.pk}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    if (response.ok && response.status === 200) {
        const doc = await response.json();
        return $4f7f142f232c908d$var$_docToTemplate(doc);
    }
    return null;
}

});



parcelRequire.register("BiYHP", function(module, exports) {

$parcel$export(module.exports, "default", () => $07022d7a23e922dd$export$2e2bcd8739ae039);
class $07022d7a23e922dd$export$2e2bcd8739ae039 extends FormApplication {
    constructor(obj){
        super({}, {});
        this.actor = game.actors.get(obj.actorId);
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-token-flags",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/randomizerConfig.html",
            resizable: true,
            minimizable: false,
            title: "Randomizer",
            width: 500
        });
    }
    async getData(options) {
        const data = super.getData(options);
        const settings = this.actor.getFlag("token-variants", "randomizerSettings") || {};
        data.randomizer = settings;
        data.hasSettings = !isEmpty(settings);
        data.nameForgeActive = game.modules.get("nameforge")?.active;
        if (data.randomizer.nameForge?.models && Array.isArray(data.randomizer.nameForge.models)) data.randomizer.nameForge.models = data.randomizer.nameForge.models.join(",");
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.find(".selectNameForgeModels").click(this._selectNameForgeModels.bind(this));
        // Can't have both tokenName and actorName checkboxes checked at the same time
        const tokenName = html.find('input[name="randomizer.tokenName"]');
        const actorName = html.find('input[name="randomizer.actorName"]');
        tokenName.change(()=>{
            if (tokenName.is(":checked")) actorName.prop("checked", false);
        });
        actorName.change(()=>{
            if (actorName.is(":checked")) tokenName.prop("checked", false);
        });
    }
    _selectNameForgeModels(event) {
        const inputSelected = $(event.target).siblings("input");
        const selected = inputSelected.val().split(",");
        const genCheckbox = function(name, value) {
            return `
      <div class="form-group">
        <label>${name}</label>
        <div class="form-fields">
            <input type="checkbox" name="model" value="${value}" data-dtype="Boolean" ${selected?.find((v)=>v === value) ? "checked" : ""}>
        </div>
      </div>
      `;
        };
        let content = '<form style="overflow-y: scroll; height:400px;">';
        const models = game.modules.get("nameforge").models;
        for (const [k, v] of Object.entries(models.defaultModels))content += genCheckbox(v.name, "defaultModels." + k);
        for (const [k, v] of Object.entries(models.userModels))content += genCheckbox(v.name, "userModels." + k);
        content += `</form>`;
        new Dialog({
            title: `Name Forge Models`,
            content: content,
            buttons: {
                Ok: {
                    label: `Select`,
                    callback: async (html)=>{
                        const selectedModels = [];
                        html.find('input[type="checkbox"]').each(function() {
                            if (this.checked) selectedModels.push(this.value);
                        });
                        inputSelected.val(selectedModels.join(","));
                    }
                }
            }
        }).render(true);
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        if (event.submitter.value === "remove") await this.actor.unsetFlag("token-variants", "randomizerSettings");
        else {
            const expanded = expandObject(formData);
            if (expanded.randomizer.nameForge?.models) expanded.randomizer.nameForge.models = expanded.randomizer.nameForge.models.split(",");
            this.actor.setFlag("token-variants", "randomizerSettings", expanded.randomizer);
        }
    }
}

});



parcelRequire.register("8fgfk", function(module, exports) {

$parcel$export(module.exports, "registerUserMappingHooks", () => $600c5396d82bd4e7$export$891f7c0c71a87222);

var $b2HDo = parcelRequire("b2HDo");

var $iJML9 = parcelRequire("iJML9");
const $600c5396d82bd4e7$var$feature_id = "UserMappings";
function $600c5396d82bd4e7$export$891f7c0c71a87222() {
    if (!(0, $b2HDo.FEATURE_CONTROL)[$600c5396d82bd4e7$var$feature_id]) {
        [
            "updateToken",
            "updateTile",
            "sightRefresh"
        ].forEach((id)=>(0, $iJML9.unregisterHook)($600c5396d82bd4e7$var$feature_id, id));
        return;
    }
    (0, $iJML9.registerHook)($600c5396d82bd4e7$var$feature_id, "updateToken", $600c5396d82bd4e7$var$_updateToken);
    (0, $iJML9.registerHook)($600c5396d82bd4e7$var$feature_id, "updateTile", $600c5396d82bd4e7$var$_updateTile);
    (0, $iJML9.registerHook)($600c5396d82bd4e7$var$feature_id, "sightRefresh", $600c5396d82bd4e7$var$_sightRefresh);
}
async function $600c5396d82bd4e7$var$_updateToken(token, change) {
    // Update User Specific Image
    if (change.flags?.["token-variants"]) {
        if ("userMappings" in change.flags["token-variants"] || "-=userMappings" in change.flags["token-variants"]) {
            const t = canvas.tokens.get(token.id);
            if (t) {
                await t.draw();
                canvas.effects.visibility.restrictVisibility();
            }
        }
    }
}
async function $600c5396d82bd4e7$var$_updateTile(tile, change) {
    // Update User Specific Image
    if (change.flags?.["token-variants"]) {
        if ("userMappings" in change.flags["token-variants"] || "-=userMappings" in change.flags["token-variants"]) {
            const t = canvas.tiles.get(tile.id);
            if (t) {
                await t.draw();
                canvas.effects.visibility.restrictVisibility();
            }
        }
    }
}
function $600c5396d82bd4e7$var$_sightRefresh() {
    if (!game.user.isGM) {
        for (let t of canvas.tokens.placeables)if ($600c5396d82bd4e7$var$_isInvisible(t)) t.visible = false;
        for (let t of canvas.tiles.placeables)if ($600c5396d82bd4e7$var$_isInvisible(t)) t.visible = false;
    }
}
function $600c5396d82bd4e7$var$_isInvisible(obj) {
    const img = (obj.document.getFlag("token-variants", "userMappings") || {})?.[game.userId];
    return img === (0, $b2HDo.TVA_CONFIG).invisibleImage;
}

});

parcelRequire.register("kVAPI", function(module, exports) {

$parcel$export(module.exports, "registerWildcardHooks", () => $f3c5b3cc5ec2bb71$export$ca2abc1047677dc9);

var $5JxHT = parcelRequire("5JxHT");

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");

var $iJML9 = parcelRequire("iJML9");
const $f3c5b3cc5ec2bb71$var$feature_id = "Wildcards";
function $f3c5b3cc5ec2bb71$export$ca2abc1047677dc9() {
    if (!(0, $b2HDo.FEATURE_CONTROL)[$f3c5b3cc5ec2bb71$var$feature_id]) {
        [
            "renderTokenConfig",
            "preCreateToken"
        ].forEach((name)=>(0, $iJML9.unregisterHook)($f3c5b3cc5ec2bb71$var$feature_id, name));
        return;
    }
    // Insert default random image field
    (0, $iJML9.registerHook)($f3c5b3cc5ec2bb71$var$feature_id, "renderTokenConfig", $f3c5b3cc5ec2bb71$var$_renderTokenConfig);
    // Set Default Wildcard images if needed
    (0, $iJML9.registerHook)($f3c5b3cc5ec2bb71$var$feature_id, "preCreateToken", $f3c5b3cc5ec2bb71$var$_preCreateToken);
}
async function $f3c5b3cc5ec2bb71$var$_renderTokenConfig(config, html) {
    const checkboxRandomize = html.find('input[name="randomImg"]');
    if (checkboxRandomize.length && !html.find(".token-variants-proto").length) {
        const defaultImg = config.actor?.prototypeToken?.flags["token-variants"]?.["randomImgDefault"] || config.actor?.prototypeToken?.flags["token-hud-wildcard"]?.["default"] || "";
        const field = await renderTemplate("/modules/token-variants/templates/protoTokenElement.html", {
            defaultImg: defaultImg,
            disableHUDButton: config.object?.getFlag("token-variants", "disableHUDButton")
        });
        checkboxRandomize.closest(".form-group").after(field);
        const tvaFieldset = html.find(".token-variants-proto");
        tvaFieldset.find("button").click((event)=>{
            event.preventDefault();
            const input = tvaFieldset.find("input");
            new FilePicker({
                current: input.val(),
                field: input[0]
            }).browse(defaultImg);
        });
        (0, $5JxHT.insertArtSelectButton)(tvaFieldset, "flags.token-variants.randomImgDefault", {
            search: config.object.name,
            searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN
        });
        // Hide/Show Default Img Form Group
        const rdmImgFormGroup = tvaFieldset.find(".imagevideo").closest(".form-group");
        const showHideGroup = function(checked) {
            if (checked) rdmImgFormGroup.show();
            else rdmImgFormGroup.hide();
            config.setPosition();
        };
        checkboxRandomize.on("click", (event)=>showHideGroup(event.target.checked));
        showHideGroup(checkboxRandomize.is(":checked"));
    }
}
function $f3c5b3cc5ec2bb71$var$_preCreateToken(tokenDocument, data, options, userId) {
    if (game.user.id !== userId) return;
    const update = {};
    if (tokenDocument.actor?.prototypeToken?.randomImg) {
        const defaultImg = tokenDocument.actor?.prototypeToken?.flags["token-variants"]?.["randomImgDefault"] || tokenDocument.actor?.prototypeToken?.flags["token-hud-wildcard"]?.["default"] || "";
        if (defaultImg) update["texture.src"] = defaultImg;
    }
    if ((0, $b2HDo.TVA_CONFIG).imgNameContainsDimensions || (0, $b2HDo.TVA_CONFIG).imgNameContainsFADimensions) (0, $1mRWy.updateTokenImage)(update["texture.src"] ?? tokenDocument.texture.src, {
        token: tokenDocument,
        update: update
    });
    if (!isEmpty(update)) tokenDocument.updateSource(update);
}

});

parcelRequire.register("3m94m", function(module, exports) {

$parcel$export(module.exports, "registerPopRandomizeHooks", () => $271a762475b57f89$export$419d00c58c7e40a5);

var $hAn2A = parcelRequire("hAn2A");

var $g3wZB = parcelRequire("g3wZB");

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");

var $iJML9 = parcelRequire("iJML9");
const $271a762475b57f89$var$feature_id = "PopUpAndRandomize";
function $271a762475b57f89$export$419d00c58c7e40a5() {
    if ((0, $b2HDo.FEATURE_CONTROL)[$271a762475b57f89$var$feature_id]) {
        (0, $iJML9.registerHook)($271a762475b57f89$var$feature_id, "createActor", $271a762475b57f89$var$_createActor);
        (0, $iJML9.registerHook)($271a762475b57f89$var$feature_id, "createToken", $271a762475b57f89$var$_createToken);
    } else [
        "createActor",
        "createToken"
    ].forEach((name)=>(0, $iJML9.unregisterHook)($271a762475b57f89$var$feature_id, name));
}
async function $271a762475b57f89$var$_createToken(token, options, userId) {
    if (userId && game.user.id != userId) return;
    // Check if random search is enabled and if so perform it
    const actorRandSettings = game.actors.get(token.actorId)?.getFlag("token-variants", "randomizerSettings");
    const randSettings = mergeObject((0, $b2HDo.TVA_CONFIG).randomizer, actorRandSettings ?? {}, {
        inplace: false,
        recursive: false
    });
    let vDown = (0, $1mRWy.keyPressed)("v");
    const flagTarget = token.actor ? game.actors.get(token.actor.id) : token.document ?? token;
    const popupFlag = flagTarget.getFlag("token-variants", "popups");
    if (vDown && randSettings.tokenCopyPaste || !vDown && randSettings.tokenCreate) {
        let performRandomSearch = true;
        if (!actorRandSettings) {
            if (randSettings.representedActorDisable && token.actor) performRandomSearch = false;
            if (randSettings.linkedActorDisable && token.actorLink) performRandomSearch = false;
            if ($271a762475b57f89$var$_disableRandomSearchForType(randSettings, token.actor)) performRandomSearch = false;
        } else performRandomSearch = Boolean(actorRandSettings);
        if (performRandomSearch) {
            // Randomize Token Name if need be
            const randomName = await (0, $1mRWy.nameForgeRandomize)(randSettings);
            if (randomName) token.update({
                name: randomName
            });
            const img = await (0, $g3wZB.doRandomSearch)(token.name, {
                searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN,
                actor: token.actor,
                randomizerOptions: randSettings
            });
            if (img) await (0, $1mRWy.updateTokenImage)(img[0], {
                token: token,
                actor: token.actor,
                imgName: img[1]
            });
            if (!img) return;
            if (randSettings.diffImages) {
                let imgPortrait;
                if (randSettings.syncImages) imgPortrait = await (0, $g3wZB.doSyncSearch)(token.name, img[1], {
                    actor: token.actor,
                    searchType: (0, $1mRWy.SEARCH_TYPE).PORTRAIT,
                    randomizerOptions: randSettings
                });
                else imgPortrait = await (0, $g3wZB.doRandomSearch)(token.name, {
                    searchType: (0, $1mRWy.SEARCH_TYPE).PORTRAIT,
                    actor: token.actor,
                    randomizerOptions: randSettings
                });
                if (imgPortrait) await (0, $1mRWy.updateActorImage)(token.actor, imgPortrait[0]);
            } else if (randSettings.tokenToPortrait) await (0, $1mRWy.updateActorImage)(token.actor, img[0]);
            return;
        }
        if (popupFlag == null && !randSettings.popupOnDisable) return;
    } else if (randSettings.tokenCreate || randSettings.tokenCopyPaste) return;
    // Check if pop-up is enabled and if so open it
    if (!(0, $b2HDo.TVA_CONFIG).permissions.popups[game.user.role]) return;
    let dirKeyDown = (0, $1mRWy.keyPressed)("popupOverride");
    if (vDown && (0, $b2HDo.TVA_CONFIG).popup.disableAutoPopupOnTokenCopyPaste) return;
    if (!dirKeyDown || dirKeyDown && vDown) {
        if ((0, $b2HDo.TVA_CONFIG).popup.disableAutoPopupOnTokenCreate && !vDown) return;
        else if (popupFlag == null && $271a762475b57f89$var$_disablePopupForType(token.actor)) return;
        else if (popupFlag != null && !popupFlag) return;
    }
    (0, $hAn2A.showArtSelect)(token.name, {
        callback: async function(imgSrc, imgName) {
            if ((0, $b2HDo.TVA_CONFIG).popup.twoPopups) {
                await (0, $1mRWy.updateActorImage)(token.actor, imgSrc);
                $271a762475b57f89$var$_twoPopupPrompt(token.actor, imgSrc, imgName, token);
            } else (0, $1mRWy.updateTokenImage)(imgSrc, {
                actor: token.actor,
                imgName: imgName,
                token: token
            });
        },
        searchType: (0, $b2HDo.TVA_CONFIG).popup.twoPopups ? (0, $1mRWy.SEARCH_TYPE).PORTRAIT : (0, $1mRWy.SEARCH_TYPE).TOKEN,
        object: token,
        preventClose: (0, $b2HDo.TVA_CONFIG).popup.twoPopups && (0, $b2HDo.TVA_CONFIG).popup.twoPopupsNoDialog
    });
}
async function $271a762475b57f89$var$_createActor(actor, options, userId) {
    if (userId && game.user.id != userId) return;
    // Check if random search is enabled and if so perform it
    const randSettings = (0, $b2HDo.TVA_CONFIG).randomizer;
    if (randSettings.actorCreate) {
        let performRandomSearch = true;
        if (randSettings.linkedActorDisable && actor.prototypeToken.actorLink) performRandomSearch = false;
        if ($271a762475b57f89$var$_disableRandomSearchForType(randSettings, actor)) performRandomSearch = false;
        if (performRandomSearch) {
            const img = await (0, $g3wZB.doRandomSearch)(actor.name, {
                searchType: (0, $1mRWy.SEARCH_TYPE).PORTRAIT,
                actor: actor
            });
            if (img) await (0, $1mRWy.updateActorImage)(actor, img[0]);
            if (!img) return;
            if (randSettings.diffImages) {
                let imgToken;
                if (randSettings.syncImages) imgToken = await (0, $g3wZB.doSyncSearch)(actor.name, img[1], {
                    actor: actor
                });
                else imgToken = await (0, $g3wZB.doRandomSearch)(actor.name, {
                    searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN,
                    actor: actor
                });
                if (imgToken) await (0, $1mRWy.updateTokenImage)(imgToken[0], {
                    actor: actor,
                    imgName: imgToken[1]
                });
            }
            return;
        }
        if (!randSettings.popupOnDisable) return;
    }
    // Check if pop-up is enabled and if so open it
    if (!(0, $b2HDo.TVA_CONFIG).permissions.popups[game.user.role]) return;
    if ((0, $b2HDo.TVA_CONFIG).popup.disableAutoPopupOnActorCreate && !(0, $1mRWy.keyPressed)("popupOverride")) return;
    else if ($271a762475b57f89$var$_disablePopupForType(actor)) return;
    (0, $hAn2A.showArtSelect)(actor.name, {
        callback: async function(imgSrc, name) {
            const actTokens = actor.getActiveTokens();
            const token = actTokens.length === 1 ? actTokens[0] : null;
            await (0, $1mRWy.updateActorImage)(actor, imgSrc);
            if ((0, $b2HDo.TVA_CONFIG).popup.twoPopups) $271a762475b57f89$var$_twoPopupPrompt(actor, imgSrc, name, token);
            else (0, $1mRWy.updateTokenImage)(imgSrc, {
                actor: actor,
                imgName: name,
                token: token
            });
        },
        searchType: (0, $b2HDo.TVA_CONFIG).popup.twoPopups ? (0, $1mRWy.SEARCH_TYPE).PORTRAIT : (0, $1mRWy.SEARCH_TYPE).PORTRAIT_AND_TOKEN,
        object: actor,
        preventClose: (0, $b2HDo.TVA_CONFIG).popup.twoPopups && (0, $b2HDo.TVA_CONFIG).popup.twoPopupsNoDialog
    });
}
function $271a762475b57f89$var$_disableRandomSearchForType(randSettings, actor) {
    if (!actor) return false;
    return randSettings[`${actor.type}Disable`] ?? false;
}
function $271a762475b57f89$var$_disablePopupForType(actor) {
    if (!actor) return false;
    return (0, $b2HDo.TVA_CONFIG).popup[`${actor.type}Disable`] ?? false;
}
function $271a762475b57f89$var$_twoPopupPrompt(actor, imgSrc, imgName, token) {
    if ((0, $b2HDo.TVA_CONFIG).popup.twoPopups && (0, $b2HDo.TVA_CONFIG).popup.twoPopupsNoDialog) (0, $hAn2A.showArtSelect)((token ?? actor.prototypeToken).name, {
        callback: (imgSrc, name)=>(0, $1mRWy.updateTokenImage)(imgSrc, {
                actor: actor,
                imgName: name,
                token: token
            }),
        searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN,
        object: token ? token : actor,
        force: true
    });
    else if ((0, $b2HDo.TVA_CONFIG).popup.twoPopups) {
        let d = new Dialog({
            title: "Portrait -> Token",
            content: `<p>${game.i18n.localize("token-variants.windows.art-select.apply-same-art")}</p>`,
            buttons: {
                one: {
                    icon: '<i class="fas fa-check"></i>',
                    callback: ()=>{
                        (0, $1mRWy.updateTokenImage)(imgSrc, {
                            actor: actor,
                            imgName: imgName,
                            token: token
                        });
                        const artSelects = Object.values(ui.windows).filter((app)=>app instanceof ArtSelect);
                        for (const app of artSelects)app.close();
                    }
                },
                two: {
                    icon: '<i class="fas fa-times"></i>',
                    callback: ()=>{
                        (0, $hAn2A.showArtSelect)((token ?? actor.prototypeToken).name, {
                            callback: (imgSrc, name)=>(0, $1mRWy.updateTokenImage)(imgSrc, {
                                    actor: actor,
                                    imgName: name,
                                    token: token
                                }),
                            searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN,
                            object: token ? token : actor,
                            force: true
                        });
                    }
                }
            },
            default: "one"
        });
        d.render(true);
    }
}

});





parcelRequire.register("ebtiN", function(module, exports) {

$parcel$export(module.exports, "REGISTERED_WRAPPERS", () => $a538d296a86b8091$export$fc1d449abe42f670);
$parcel$export(module.exports, "registerWrapper", () => $a538d296a86b8091$export$4e224afa9c6f52f3);
$parcel$export(module.exports, "unregisterWrapper", () => $a538d296a86b8091$export$d52c0d8a14cf2845);
$parcel$export(module.exports, "registerAllWrappers", () => $a538d296a86b8091$export$84e6c54a990a03d8);

var $b9NaT = parcelRequire("b9NaT");

var $2krar = parcelRequire("2krar");

var $8o6uD = parcelRequire("8o6uD");

var $lotAj = parcelRequire("lotAj");
const $a538d296a86b8091$export$fc1d449abe42f670 = {};
function $a538d296a86b8091$export$4e224afa9c6f52f3(feature_id, name, fn, method = "WRAPPER") {
    if (typeof libWrapper !== "function") return;
    if (!(feature_id in $a538d296a86b8091$export$fc1d449abe42f670)) $a538d296a86b8091$export$fc1d449abe42f670[feature_id] = {};
    if (name in $a538d296a86b8091$export$fc1d449abe42f670[feature_id]) return;
    $a538d296a86b8091$export$fc1d449abe42f670[feature_id][name] = libWrapper.register("token-variants", name, fn, method);
}
function $a538d296a86b8091$export$d52c0d8a14cf2845(feature_id, name) {
    if (typeof libWrapper !== "function") return;
    if (feature_id in $a538d296a86b8091$export$fc1d449abe42f670 && name in $a538d296a86b8091$export$fc1d449abe42f670[feature_id]) {
        libWrapper.unregister("token-variants", $a538d296a86b8091$export$fc1d449abe42f670[feature_id][name]);
        delete $a538d296a86b8091$export$fc1d449abe42f670[feature_id][name];
    }
}
function $a538d296a86b8091$export$84e6c54a990a03d8() {
    // User to Image mappings for Tile and Tokens
    (0, $lotAj.registerUserMappingWrappers)();
    // Hide effect icons
    (0, $b9NaT.registerEffectIconWrappers)();
    // Token HUD Variants Management
    (0, $8o6uD.registerHUDWrappers)();
    // Hide Core Token Elements
    (0, $2krar.registerHideElementWrappers)();
}

});
parcelRequire.register("b9NaT", function(module, exports) {

$parcel$export(module.exports, "registerEffectIconWrappers", () => $81f6ae0f74e30fe1$export$3a8ef264ac3111f8);

var $aEqt1 = parcelRequire("aEqt1");

var $b2HDo = parcelRequire("b2HDo");

var $ebtiN = parcelRequire("ebtiN");
const $81f6ae0f74e30fe1$var$feature_id = "EffectIcons";
function $81f6ae0f74e30fe1$export$3a8ef264ac3111f8() {
    (0, $ebtiN.unregisterWrapper)($81f6ae0f74e30fe1$var$feature_id, "Token.prototype.drawEffects");
    (0, $ebtiN.unregisterWrapper)($81f6ae0f74e30fe1$var$feature_id, "CombatTracker.prototype.getData");
    if (!(0, $b2HDo.FEATURE_CONTROL)[$81f6ae0f74e30fe1$var$feature_id]) return;
    if (!(0, $b2HDo.TVA_CONFIG).disableEffectIcons && (0, $b2HDo.TVA_CONFIG).filterEffectIcons && ![
        "pf1e",
        "pf2e"
    ].includes(game.system.id)) (0, $ebtiN.registerWrapper)($81f6ae0f74e30fe1$var$feature_id, "Token.prototype.drawEffects", $81f6ae0f74e30fe1$var$_drawEffects, "OVERRIDE");
    else if ((0, $b2HDo.TVA_CONFIG).disableEffectIcons) (0, $ebtiN.registerWrapper)($81f6ae0f74e30fe1$var$feature_id, "Token.prototype.drawEffects", $81f6ae0f74e30fe1$var$_drawEffects_fullReplace, "OVERRIDE");
    else if ((0, $b2HDo.TVA_CONFIG).displayEffectIconsOnHover) (0, $ebtiN.registerWrapper)($81f6ae0f74e30fe1$var$feature_id, "Token.prototype.drawEffects", $81f6ae0f74e30fe1$var$_drawEffects_hoverOnly, "WRAPPER");
    if ((0, $b2HDo.TVA_CONFIG).disableEffectIcons || (0, $b2HDo.TVA_CONFIG).filterCustomEffectIcons) (0, $ebtiN.registerWrapper)($81f6ae0f74e30fe1$var$feature_id, "CombatTracker.prototype.getData", $81f6ae0f74e30fe1$var$_combatTrackerGetData, "WRAPPER");
}
async function $81f6ae0f74e30fe1$var$_drawEffects_hoverOnly(wrapped, ...args) {
    let result = await wrapped(...args);
    this.effects.visible = this.hover;
    return result;
}
async function $81f6ae0f74e30fe1$var$_drawEffects_fullReplace(...args) {
    this.effects.removeChildren().forEach((c)=>c.destroy());
    this.effects.bg = this.effects.addChild(new PIXI.Graphics());
    this.effects.overlay = null;
}
async function $81f6ae0f74e30fe1$var$_combatTrackerGetData(wrapped, ...args) {
    let data = await wrapped(...args);
    if (data && data.combat && data.turns) {
        const combat = data.combat;
        for (const turn of data.turns){
            const combatant = combat.combatants.find((c)=>c.id === turn.id);
            if (combatant) {
                if ((0, $b2HDo.TVA_CONFIG).disableEffectIcons) turn.effects = new Set();
                else if ((0, $b2HDo.TVA_CONFIG).filterEffectIcons) {
                    const restrictedEffects = $81f6ae0f74e30fe1$var$_getRestrictedEffects(combatant.token);
                    // Copied from CombatTracker.getData(...)
                    turn.effects = new Set();
                    if (combatant.token) {
                        combatant.token.effects.forEach((e)=>turn.effects.add(e));
                        if (combatant.token.overlayEffect) turn.effects.add(combatant.token.overlayEffect);
                    }
                    // modified to filter restricted effects
                    if (combatant.actor) for (const effect of combatant.actor.temporaryEffects){
                        if (effect.statuses.has(CONFIG.specialStatusEffects.DEFEATED)) ;
                        else if (effect.icon && !restrictedEffects.includes(effect.name ?? effect.label)) turn.effects.add(effect.icon);
                    }
                // end of copy
                }
            }
        }
    }
    return data;
}
async function $81f6ae0f74e30fe1$var$_drawEffects(...args) {
    this.effects.renderable = false;
    this.effects.removeChildren().forEach((c)=>c.destroy());
    this.effects.bg = this.effects.addChild(new PIXI.Graphics());
    this.effects.overlay = null;
    // Categorize new effects
    let tokenEffects = this.document.effects;
    let actorEffects = this.actor?.temporaryEffects || [];
    let overlay = {
        src: this.document.overlayEffect,
        tint: null
    };
    // Modified from the original token.drawEffects
    if ((0, $b2HDo.TVA_CONFIG).displayEffectIconsOnHover) this.effects.visible = this.hover;
    if (tokenEffects.length || actorEffects.length) {
        const restrictedEffects = $81f6ae0f74e30fe1$var$_getRestrictedEffects(this.document);
        actorEffects = actorEffects.filter((ef)=>!restrictedEffects.includes(ef.name ?? ef.label));
        tokenEffects = tokenEffects.filter(// check if it's a string here
        // for tokens without representing actors effects are just stored as paths to icons
        (ef)=>typeof ef === "string" || !restrictedEffects.includes(ef.name ?? ef.label));
    }
    // End of modifications
    // Draw status effects
    if (tokenEffects.length || actorEffects.length) {
        const promises = [];
        // Draw actor effects first
        for (let f of actorEffects){
            if (!f.icon) continue;
            const tint = Color.from(f.tint ?? null);
            if (f.getFlag("core", "overlay")) {
                overlay = {
                    src: f.icon,
                    tint: tint
                };
                continue;
            }
            promises.push(this._drawEffect(f.icon, tint));
        }
        // Next draw token effects
        for (let f of tokenEffects)promises.push(this._drawEffect(f, null));
        await Promise.all(promises);
    }
    // Draw overlay effect
    this.effects.overlay = await this._drawOverlay(overlay.src, overlay.tint);
    this._refreshEffects();
    this.effects.renderable = true;
}
function $81f6ae0f74e30fe1$var$_getRestrictedEffects(tokenDoc) {
    let restrictedEffects = (0, $b2HDo.TVA_CONFIG).filterIconList;
    if ((0, $b2HDo.TVA_CONFIG).filterCustomEffectIcons) {
        const mappings = (0, $aEqt1.getAllEffectMappings)(tokenDoc);
        if (mappings) restrictedEffects = restrictedEffects.concat(mappings.map((m)=>m.expression));
    }
    return restrictedEffects;
}

});

parcelRequire.register("2krar", function(module, exports) {

$parcel$export(module.exports, "registerHideElementWrappers", () => $1b2285e5cb652662$export$ad041355fd382ef2);

var $b2HDo = parcelRequire("b2HDo");

var $ebtiN = parcelRequire("ebtiN");
const $1b2285e5cb652662$var$feature_id = "HideElement";
function $1b2285e5cb652662$export$ad041355fd382ef2() {
    (0, $ebtiN.unregisterWrapper)($1b2285e5cb652662$var$feature_id, "Token.prototype._getTooltipText");
    if ((0, $b2HDo.FEATURE_CONTROL)[$1b2285e5cb652662$var$feature_id] && (0, $b2HDo.TVA_CONFIG).hideElevationTooltip) (0, $ebtiN.registerWrapper)($1b2285e5cb652662$var$feature_id, "Token.prototype._getTooltipText", $1b2285e5cb652662$var$_getTooltipText, "WRAPPER");
    (0, $ebtiN.unregisterWrapper)($1b2285e5cb652662$var$feature_id, "Token.prototype._refreshBorder");
    if ((0, $b2HDo.FEATURE_CONTROL)[$1b2285e5cb652662$var$feature_id] && (0, $b2HDo.TVA_CONFIG).hideTokenBorder) (0, $ebtiN.registerWrapper)($1b2285e5cb652662$var$feature_id, "Token.prototype._refreshBorder", $1b2285e5cb652662$var$_refreshVisibility, "OVERRIDE");
}
function $1b2285e5cb652662$var$_getTooltipText(wrapped, ...args) {
    wrapped(...args);
    return "";
}
function $1b2285e5cb652662$var$_refreshVisibility(...args) {}

});

parcelRequire.register("8o6uD", function(module, exports) {

$parcel$export(module.exports, "registerHUDWrappers", () => $61b599ff8d35f2fa$export$4ed4ca6a96642941);

var $k05qb = parcelRequire("k05qb");

var $129cf = parcelRequire("129cf");

var $b2HDo = parcelRequire("b2HDo");

var $ebtiN = parcelRequire("ebtiN");
const $61b599ff8d35f2fa$var$feature_id = "HUD";
function $61b599ff8d35f2fa$export$4ed4ca6a96642941() {
    (0, $ebtiN.unregisterWrapper)($61b599ff8d35f2fa$var$feature_id, "TokenHUD.prototype.clear");
    if ((0, $b2HDo.FEATURE_CONTROL)[$61b599ff8d35f2fa$var$feature_id]) (0, $ebtiN.registerWrapper)($61b599ff8d35f2fa$var$feature_id, "TokenHUD.prototype.clear", $61b599ff8d35f2fa$var$_clear, "MIXED");
}
function $61b599ff8d35f2fa$var$_clear(wrapped, ...args) {
    $61b599ff8d35f2fa$var$_applyVariantFlags();
    // HUD should not close if we're in assisted overlay positioning mode
    if ((0, $129cf.Reticle).active && (0, $129cf.Reticle).mode === "hud") return;
    return wrapped(...args);
}
async function $61b599ff8d35f2fa$var$_applyVariantFlags() {
    const { actor: actor, variants: variants } = (0, $k05qb.TOKEN_HUD_VARIANTS);
    if (actor) {
        if (!variants?.length) actor.unsetFlag("token-variants", "variants");
        else actor.setFlag("token-variants", "variants", variants);
    }
    (0, $k05qb.TOKEN_HUD_VARIANTS).actor = null;
    (0, $k05qb.TOKEN_HUD_VARIANTS).variants = null;
}

});
parcelRequire.register("129cf", function(module, exports) {

$parcel$export(module.exports, "Reticle", () => $0c0d1c9ce08f0c26$export$9d1b0e5bb156c053);

var $1v9Gt = parcelRequire("1v9Gt");

var $UVJLm = parcelRequire("UVJLm");

var $ecMWg = parcelRequire("ecMWg");

var $64r9a = parcelRequire("64r9a");
class $0c0d1c9ce08f0c26$export$9d1b0e5bb156c053 {
    static app;
    static fields;
    static reticleOverlay;
    static active = false;
    static hitTest;
    static token = null;
    static dialog = null;
    // Offset calculation controls
    static mode = "tooltip";
    static increment = 1;
    static _onReticleMove(event) {
        if (this.reticleOverlay.isMouseDown) {
            let pos = event.data.getLocalPosition(this.reticleOverlay);
            this.config.pOffsetX = 0;
            this.config.pOffsetY = 0;
            this.config.offsetX = 0;
            this.config.offsetY = 0;
            if (this.mode === "token") {
                this.config.linkRotation = true;
                this.config.linkMirror = true;
            }
            this.tvaOverlay.refresh(this.config, {
                preview: true
            });
            const tCoord = {
                x: this.tvaOverlay.x,
                y: this.tvaOverlay.y
            };
            if (this.tvaOverlay.overlayConfig.parentID) {
                let parent = this.tvaOverlay;
                do {
                    parent = parent.parent;
                    tCoord.x += parent.x;
                    tCoord.y += parent.y;
                }while (!(parent instanceof (0, $ecMWg.TVAOverlay)));
            }
            let dx = pos.x - tCoord.x;
            let dy = pos.y - tCoord.y;
            let angle = 0;
            if (!this.config.animation.relative) {
                angle = this.config.angle;
                if (this.config.linkRotation) angle += this.tvaOverlay.object.document.rotation;
            }
            [dx, dy] = $0c0d1c9ce08f0c26$var$rotate(0, 0, dx, dy, angle);
            dx = $0c0d1c9ce08f0c26$var$round(dx, this.increment);
            dy = $0c0d1c9ce08f0c26$var$round(dy, this.increment);
            // let lPos = event.data.getLocalPosition(this.tvaOverlay);
            // console.log(lPos);
            // // let dx = lPos.x;
            // // let dy = lPos.y;
            if (this.mode === "static") {
                this.config.pOffsetX = dx;
                this.config.pOffsetY = dy;
            } else if (this.mode === "token") {
                this.config.offsetX = -dx / this.tvaOverlay.object.w;
                this.config.offsetY = -dy / this.tvaOverlay.object.h;
            } else {
                let token = this.tvaOverlay.object;
                let pWidth;
                let pHeight;
                if (this.tvaOverlay.overlayConfig.parentID) {
                    pWidth = (this.tvaOverlay.parent.shapesWidth ?? this.tvaOverlay.parent.width) / this.tvaOverlay.parent.scale.x;
                    pHeight = (this.tvaOverlay.parent.shapesHeight ?? this.tvaOverlay.parent.height) / this.tvaOverlay.parent.scale.y;
                } else {
                    pWidth = token.w;
                    pHeight = token.h;
                }
                if (this.mode === "tooltip") {
                    if (Math.abs(dx) >= pWidth / 2) {
                        this.config.offsetX = 0.5 * (dx < 0 ? 1 : -1);
                        dx += pWidth / 2 * (dx < 0 ? 1 : -1);
                    } else {
                        this.config.offsetX = -dx / this.tvaOverlay.object.w;
                        dx = 0;
                    }
                    if (Math.abs(dy) >= pHeight / 2) {
                        this.config.offsetY = 0.5 * (dy < 0 ? 1 : -1);
                        dy += pHeight / 2 * (dy < 0 ? 1 : -1);
                    } else {
                        this.config.offsetY = -dy / this.tvaOverlay.object.h;
                        dy = 0;
                    }
                } else {
                    if (Math.abs(dx) >= pWidth / 2) {
                        this.config.offsetX = 0.5 * (dx < 0 ? 1 : -1);
                        dx += pWidth / 2 * (dx < 0 ? 1 : -1);
                    } else if (Math.abs(dy) >= pHeight / 2) {
                        this.config.offsetY = 0.5 * (dy < 0 ? 1 : -1);
                        dy += pHeight / 2 * (dy < 0 ? 1 : -1);
                    } else {
                        this.config.offsetX = -dx / this.tvaOverlay.object.w;
                        dx = 0;
                        this.config.offsetY = -dy / this.tvaOverlay.object.h;
                        dy = 0;
                    }
                }
                this.config.pOffsetX = dx;
                this.config.pOffsetY = dy;
            }
            this.tvaOverlay.refresh(this.config, {
                preview: true
            });
        }
    }
    static minimizeApps() {
        Object.values(ui.windows).forEach((app)=>{
            if (app instanceof (0, $UVJLm.OverlayConfig) || app instanceof (0, $1v9Gt.default)) app.minimize();
        });
    }
    static maximizeApps() {
        Object.values(ui.windows).forEach((app)=>{
            if (app instanceof (0, $UVJLm.OverlayConfig) || app instanceof (0, $1v9Gt.default)) app.maximize();
        });
    }
    static activate({ tvaOverlay: tvaOverlay = null, config: config = {} } = {}) {
        if (this.deactivate() || !canvas.ready) return false;
        if (!tvaOverlay || !config) return false;
        if (this.reticleOverlay) this.reticleOverlay.destroy(true);
        const interaction = canvas.app.renderer.plugins.interaction;
        if (!interaction.cursorStyles["reticle"]) interaction.cursorStyles["reticle"] = "url('modules/token-variants/img/reticle.webp'), auto";
        this.tvaOverlay = tvaOverlay;
        this.minimizeApps();
        this.config = (0, $64r9a.evaluateOverlayExpressions)(deepClone(config), this.tvaOverlay.object, {
            overlayConfig: config
        });
        // Setup the overlay to be always visible while we're adjusting its position
        this.config.alwaysVisible = true;
        this.active = true;
        // Create the reticle overlay
        this.reticleOverlay = new PIXI.Container();
        this.reticleOverlay.hitArea = canvas.dimensions.rect;
        this.reticleOverlay.cursor = "reticle";
        this.reticleOverlay.interactive = true;
        this.reticleOverlay.zIndex = Infinity;
        const stopEvent = function(event) {
            event.preventDefault();
        // event.stopPropagation();
        };
        this.reticleOverlay.on("mousedown", (event)=>{
            event.preventDefault();
            if (event.data.originalEvent.which != 2 && event.data.originalEvent.nativeEvent.which != 2) {
                this.reticleOverlay.isMouseDown = true;
                this._onReticleMove(event);
            }
        });
        this.reticleOverlay.on("pointermove", (event)=>{
            event.preventDefault();
            // event.stopPropagation();
            this._onReticleMove(event);
        });
        this.reticleOverlay.on("mouseup", (event)=>{
            event.preventDefault();
            this.reticleOverlay.isMouseDown = false;
        });
        this.reticleOverlay.on("click", (event)=>{
            event.preventDefault();
            if (event.data.originalEvent.which == 2 || event.data.originalEvent.nativeEvent.which == 2) this.deactivate();
        });
        canvas.stage.addChild(this.reticleOverlay);
        this.dialog = $0c0d1c9ce08f0c26$var$displayControlDialog();
        return true;
    }
    static deactivate() {
        if (this.active) {
            if (this.reticleOverlay) this.reticleOverlay.parent?.removeChild(this.reticleOverlay);
            this.active = false;
            this.tvaOverlay = null;
            if (this.dialog && this.dialog._state !== Application.RENDER_STATES.CLOSED) this.dialog.close(true);
            this.dialog = null;
            this.maximizeApps();
            const app = Object.values(ui.windows).find((app)=>app instanceof (0, $UVJLm.OverlayConfig));
            if (!app) {
                this.config = null;
                return;
            }
            const form = $(app.form);
            [
                "pOffsetX",
                "pOffsetY",
                "offsetX",
                "offsetY"
            ].forEach((field)=>{
                if (field in this.config) form.find(`[name="${field}"]`).val(this.config[field]);
            });
            if (this.mode === "token") {
                [
                    "linkRotation",
                    "linkMirror"
                ].forEach((field)=>{
                    form.find(`[name="${field}"]`).prop("checked", true);
                });
                [
                    "linkDimensionsX",
                    "linkDimensionsY"
                ].forEach((field)=>{
                    form.find(`[name="${field}"]`).prop("checked", false);
                });
            } else [
                "linkRotation",
                "linkMirror"
            ].forEach((field)=>{
                form.find(`[name="${field}"]`).prop("checked", false);
            });
            if (this.mode === "hud") form.find('[name="ui"]').prop("checked", true).trigger("change");
            form.find('[name="anchor.x"]').val(this.config.anchor.x);
            form.find('[name="anchor.y"]').val(this.config.anchor.y).trigger("change");
            this.config = null;
            return true;
        }
    }
}
function $0c0d1c9ce08f0c26$var$displayControlDialog() {
    const d = new Dialog({
        title: "Set Overlay Position",
        content: `
      <style>
        .images { display: flex; }
        .images a { flex: 20%; width: 50px; margin: 2px; }
        .images a.active img { border-color: orange; border-width: 2px; }
        .anchorlbl {margin: auto; display: table; }
      </style>
      <div class="images">
        <a data-id="token"><img src="modules/token-variants/img/token_mode.png"></img></a>
        <a data-id="tooltip"><img src="modules/token-variants/img/tooltip_mode.png"></img></a>
        <a data-id="hud"><img src="modules/token-variants/img/hud_mode.png"></img></a>
        <a data-id="static"><img src="modules/token-variants/img/static_mode.png"></img></a>
      </div>
     <br>
      <label class="anchorlbl">Anchor</label>
      <div class="tva-anchor">
        <input type="radio" class="top left" name="anchor">
        <input type="radio" class="top center" name="anchor">
        <input type="radio" class="top right" name="anchor">
        <input type="radio" class="mid left" name="anchor">
        <input type="radio" class="mid center" name="anchor">
        <input type="radio" class="mid right" name="anchor">
        <input type="radio" class="bot left" name="anchor">
        <input type="radio" class="bot center" name="anchor">
        <input type="radio" class="bot right" name="anchor">
      </div>
      <div class="form-group">
        <label>Step Size</label>
        <div class="form-fields">
          <input type="number" name="step" min="0" step="1" value="${$0c0d1c9ce08f0c26$export$9d1b0e5bb156c053.increment}">
        </div>
      </div>
      <p class="notes"><b>Left-Click</b> to move the overlay</p>
      <p class="notes"><b>Middle-Click</b> or <b>Close Dialog</b> to exit overlay positioning</p>
     `,
        buttons: {},
        render: (html)=>{
            // Mode Images
            const images = html.find(".images a");
            html.find(".images a").on("click", (event)=>{
                images.removeClass("active");
                const target = $(event.target).closest("a");
                target.addClass("active");
                $0c0d1c9ce08f0c26$export$9d1b0e5bb156c053.mode = target.data("id");
            });
            html.find(`[data-id="${$0c0d1c9ce08f0c26$export$9d1b0e5bb156c053.mode}"]`).addClass("active");
            // Anchor
            let anchorX = $0c0d1c9ce08f0c26$export$9d1b0e5bb156c053.config?.anchor?.x || 0;
            let anchorY = $0c0d1c9ce08f0c26$export$9d1b0e5bb156c053.config?.anchor?.y || 0;
            let classes = "";
            if (anchorX < 0.5) classes += ".left";
            else if (anchorX > 0.5) classes += ".right";
            else classes += ".center";
            if (anchorY < 0.5) classes += ".top";
            else if (anchorY > 0.5) classes += ".bot";
            else classes += ".mid";
            html.find(".tva-anchor").find(classes).prop("checked", true);
            // end -  Pre-select anchor
            html.find('input[name="anchor"]').on("change", (event)=>{
                const anchor = $(event.target);
                let x;
                let y;
                if (anchor.hasClass("left")) x = 0;
                else if (anchor.hasClass("center")) x = 0.5;
                else x = 1;
                if (anchor.hasClass("top")) y = 0;
                else if (anchor.hasClass("mid")) y = 0.5;
                else y = 1;
                $0c0d1c9ce08f0c26$export$9d1b0e5bb156c053.config.anchor.x = x;
                $0c0d1c9ce08f0c26$export$9d1b0e5bb156c053.config.anchor.y = y;
            });
            html.find('[name="step"]').on("input", (event)=>{
                $0c0d1c9ce08f0c26$export$9d1b0e5bb156c053.increment = $(event.target).val() || 1;
            });
        },
        close: ()=>$0c0d1c9ce08f0c26$export$9d1b0e5bb156c053.deactivate()
    });
    d.render(true);
    setTimeout(()=>d.setPosition({
            left: 200,
            top: window.innerHeight / 2,
            height: "auto"
        }), 100);
    return d;
}
function $0c0d1c9ce08f0c26$var$round(number, increment, offset = 0) {
    return Math.ceil((number - offset) / increment) * increment + offset;
}
function $0c0d1c9ce08f0c26$var$rotate(cx, cy, x, y, angle) {
    var radians = Math.PI / 180 * angle, cos = Math.cos(radians), sin = Math.sin(radians), nx = cos * (x - cx) + sin * (y - cy) + cx, ny = cos * (y - cy) - sin * (x - cx) + cy;
    return [
        nx,
        ny
    ];
}

});


parcelRequire.register("lotAj", function(module, exports) {

$parcel$export(module.exports, "registerUserMappingWrappers", () => $f932c9c7a27f349d$export$1a9a3a33e776f780);
$parcel$export(module.exports, "assignUserSpecificImage", () => $f932c9c7a27f349d$export$649a7855fe41be7);
$parcel$export(module.exports, "unassignUserSpecificImage", () => $f932c9c7a27f349d$export$b035d326d57db09a);
$parcel$export(module.exports, "assignUserSpecificImageToSelected", () => $f932c9c7a27f349d$export$c27a4515fabd8fad);
$parcel$export(module.exports, "unassignUserSpecificImageFromSelected", () => $f932c9c7a27f349d$export$779b84c2df9c577f);

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");

var $ebtiN = parcelRequire("ebtiN");
const $f932c9c7a27f349d$var$feature_id = "UserMappings";
function $f932c9c7a27f349d$export$1a9a3a33e776f780() {
    (0, $ebtiN.registerWrapper)($f932c9c7a27f349d$var$feature_id, "Tile.prototype.draw", $f932c9c7a27f349d$var$_draw);
    (0, $ebtiN.registerWrapper)($f932c9c7a27f349d$var$feature_id, "Token.prototype.draw", $f932c9c7a27f349d$var$_draw);
}
async function $f932c9c7a27f349d$var$_draw(wrapped, ...args) {
    let result;
    // If the Token/Tile has a UserToImage mappings momentarily set document.texture.src to it
    // so that it's texture gets loaded instead of the actual Token image
    const mappings = this.document.getFlag("token-variants", "userMappings") || {};
    const img = mappings[game.userId];
    let previous;
    if (img) {
        previous = this.document.texture.src;
        this.document.texture.src = img;
        this.tva_iconOverride = img;
        result = await wrapped(...args);
        this.document.texture.src = previous;
        $f932c9c7a27f349d$var$overrideVisibility(this, img);
    } else {
        $f932c9c7a27f349d$var$overrideVisibility(this);
        result = await wrapped(...args);
    }
    return result;
}
/**
 * If the img is the same as TVA_CONFIG.invisibleImage then we'll override the isVisible
 * getter to return false of this client if it's not a GM. Reset it to default if not.
 * @param {*} obj object whose isVisible is to be overriden
 * @param {*} img UserToImage mapping
 */ function $f932c9c7a27f349d$var$overrideVisibility(obj, img) {
    if (img && (0, $1mRWy.decodeURISafely)(img) === (0, $b2HDo.TVA_CONFIG).invisibleImage && !obj.tva_customVisibility) {
        const originalIsVisible = $f932c9c7a27f349d$var$_getIsVisibleDescriptor(obj).get;
        Object.defineProperty(obj, "isVisible", {
            get: function() {
                const isVisible = originalIsVisible.call(this);
                if (isVisible && !game.user.isGM) return false;
                return isVisible;
            },
            configurable: true
        });
        obj.tva_customVisibility = true;
    } else if (!img && obj.tva_customVisibility) {
        Object.defineProperty(obj, "isVisible", $f932c9c7a27f349d$var$_getIsVisibleDescriptor(obj));
        delete obj.tva_customVisibility;
    }
}
function $f932c9c7a27f349d$var$_getIsVisibleDescriptor(obj) {
    let iObj = Object.getPrototypeOf(obj);
    let descriptor = null;
    while(iObj){
        descriptor = Object.getOwnPropertyDescriptor(iObj, "isVisible");
        if (descriptor) break;
        iObj = Object.getPrototypeOf(iObj);
    }
    return descriptor;
}
function $f932c9c7a27f349d$export$649a7855fe41be7(token, img, { userName: userName = null, userId: userId = null } = {}) {
    if (!img) return $f932c9c7a27f349d$export$b035d326d57db09a(token, {
        userName: userName,
        userId: userId
    });
    if (userName instanceof Array) {
        for (const name of userName)$f932c9c7a27f349d$export$649a7855fe41be7(token, img, {
            userName: name
        });
        return;
    }
    if (userId instanceof Array) {
        for (const id of userId)$f932c9c7a27f349d$export$649a7855fe41be7(token, img, {
            userId: id
        });
        return;
    }
    let id = userId;
    if (!id && userName) id = game.users.find((u)=>u.name === userName)?.id;
    if (!id) return;
    const doc = token.document ?? token;
    const mappings = doc.getFlag("token-variants", "userMappings") || {};
    mappings[id] = img;
    doc.setFlag("token-variants", "userMappings", mappings);
}
function $f932c9c7a27f349d$export$c27a4515fabd8fad(img, opts = {}) {
    const selected = [
        ...canvas.tokens.controlled
    ];
    for (const t of selected)$f932c9c7a27f349d$export$649a7855fe41be7(t, img, opts);
}
function $f932c9c7a27f349d$export$b035d326d57db09a(token, { userName: userName = null, userId: userId = null } = {}) {
    if (userName instanceof Array) {
        for (const name of userName)$f932c9c7a27f349d$export$b035d326d57db09a(token, {
            userName: name
        });
        return;
    }
    if (userId instanceof Array) {
        for (const id of userId)$f932c9c7a27f349d$export$b035d326d57db09a(token, {
            userId: id
        });
        return;
    }
    let id = userId;
    if (!id && userName) id = game.users.find((u)=>u.name === userName)?.id;
    if (!id) {
        if (!userName && !userId) (token.document ?? token).unsetFlag("token-variants", "userMappings");
    } else {
        const update = {};
        update["flags.token-variants.userMappings.-=" + id] = null;
        (token.document ?? token).update(update);
    }
}
function $f932c9c7a27f349d$export$779b84c2df9c577f(opts = {}) {
    const selected = [
        ...canvas.tokens.controlled
    ];
    for (const t of selected)$f932c9c7a27f349d$export$b035d326d57db09a(t, opts);
}

});



parcelRequire.register("6CrZR", function(module, exports) {

$parcel$export(module.exports, "default", () => $4d1c0243ffcefb00$export$2e2bcd8739ae039);

var $hAn2A = parcelRequire("hAn2A");

var $1mRWy = parcelRequire("1mRWy");

var $5JxHT = parcelRequire("5JxHT");

var $b2HDo = parcelRequire("b2HDo");

var $2eOJK = parcelRequire("2eOJK");

var $8KXhm = parcelRequire("8KXhm");

var $g3wZB = parcelRequire("g3wZB");
async function $4d1c0243ffcefb00$var$autoApply(actor, image1, image2, formData, typeOverride) {
    let portraitFound = formData.ignorePortrait;
    let tokenFound = formData.ignoreToken;
    if (formData.diffImages) {
        let results = [];
        if (!formData.ignorePortrait) {
            results = await (0, $g3wZB.doImageSearch)(actor.name, {
                searchType: typeOverride ?? (0, $1mRWy.SEARCH_TYPE).PORTRAIT,
                simpleResults: true,
                searchOptions: formData.searchOptions
            });
            if ((results ?? []).length != 0) {
                portraitFound = true;
                await (0, $1mRWy.updateActorImage)(actor, results[0], false, formData.compendium);
            }
        }
        if (!formData.ignoreToken) {
            results = await (0, $g3wZB.doImageSearch)(actor.prototypeToken.name, {
                searchType: (0, $1mRWy.SEARCH_TYPE).TOKEN,
                simpleResults: true,
                searchOptions: formData.searchOptions
            });
            if ((results ?? []).length != 0) {
                tokenFound = true;
                (0, $1mRWy.updateTokenImage)(results[0], {
                    actor: actor,
                    pack: formData.compendium,
                    applyDefaultConfig: false
                });
            }
        }
    } else {
        let results = await (0, $g3wZB.doImageSearch)(actor.name, {
            searchType: typeOverride ?? (0, $1mRWy.SEARCH_TYPE).PORTRAIT_AND_TOKEN,
            simpleResults: true,
            searchOptions: formData.searchOptions
        });
        if ((results ?? []).length != 0) {
            portraitFound = tokenFound = true;
            (0, $1mRWy.updateTokenImage)(results[0], {
                actor: actor,
                actorUpdate: {
                    img: results[0]
                },
                pack: formData.compendium,
                applyDefaultConfig: false
            });
        }
    }
    if (!(tokenFound && portraitFound) && formData.autoDisplayArtSelect) $4d1c0243ffcefb00$var$addToArtSelectQueue(actor, image1, image2, formData, typeOverride);
}
function $4d1c0243ffcefb00$var$addToArtSelectQueue(actor, image1, image2, formData, typeOverride) {
    if (formData.diffImages) {
        if (!formData.ignorePortrait && !formData.ignoreToken) (0, $5JxHT.addToQueue)(actor.name, {
            searchType: typeOverride ?? (0, $1mRWy.SEARCH_TYPE).PORTRAIT,
            object: actor,
            preventClose: true,
            image1: image1,
            image2: image2,
            displayMode: (0, $5JxHT.ArtSelect).IMAGE_DISPLAY.PORTRAIT,
            searchOptions: formData.searchOptions,
            callback: async function(imgSrc, _) {
                await (0, $1mRWy.updateActorImage)(actor, imgSrc);
                (0, $hAn2A.showArtSelect)(actor.prototypeToken.name, {
                    searchType: typeOverride ?? (0, $1mRWy.SEARCH_TYPE).TOKEN,
                    object: actor,
                    force: true,
                    image1: imgSrc,
                    image2: image2,
                    displayMode: (0, $5JxHT.ArtSelect).IMAGE_DISPLAY.TOKEN,
                    searchOptions: formData.searchOptions,
                    callback: (imgSrc, name)=>(0, $1mRWy.updateTokenImage)(imgSrc, {
                            actor: actor,
                            imgName: name,
                            applyDefaultConfig: false
                        })
                });
            }
        });
        else if (formData.ignorePortrait) (0, $5JxHT.addToQueue)(actor.name, {
            searchType: typeOverride ?? (0, $1mRWy.SEARCH_TYPE).TOKEN,
            object: actor,
            image1: image1,
            image2: image2,
            displayMode: (0, $5JxHT.ArtSelect).IMAGE_DISPLAY.TOKEN,
            searchOptions: formData.searchOptions,
            callback: async function(imgSrc, name) {
                (0, $1mRWy.updateTokenImage)(imgSrc, {
                    actor: actor,
                    imgName: name,
                    applyDefaultConfig: false
                });
            }
        });
        else if (formData.ignoreToken) (0, $5JxHT.addToQueue)(actor.name, {
            searchType: typeOverride ?? (0, $1mRWy.SEARCH_TYPE).PORTRAIT,
            object: actor,
            image1: image1,
            image2: image2,
            displayMode: (0, $5JxHT.ArtSelect).IMAGE_DISPLAY.PORTRAIT,
            searchOptions: formData.searchOptions,
            callback: async function(imgSrc, name) {
                await (0, $1mRWy.updateActorImage)(actor, imgSrc);
            }
        });
    } else (0, $5JxHT.addToQueue)(actor.name, {
        searchType: typeOverride ?? (0, $1mRWy.SEARCH_TYPE).PORTRAIT_AND_TOKEN,
        object: actor,
        image1: image1,
        image2: image2,
        displayMode: (0, $5JxHT.ArtSelect).IMAGE_DISPLAY.PORTRAIT_TOKEN,
        searchOptions: formData.searchOptions,
        callback: async function(imgSrc, name) {
            await (0, $1mRWy.updateActorImage)(actor, imgSrc);
            (0, $1mRWy.updateTokenImage)(imgSrc, {
                actor: actor,
                imgName: name,
                applyDefaultConfig: false
            });
        }
    });
}
class $4d1c0243ffcefb00$export$2e2bcd8739ae039 extends FormApplication {
    constructor(){
        super({}, {});
        this.searchOptions = deepClone((0, $b2HDo.getSearchOptions)());
        mergeObject(this.searchOptions, deepClone((0, $b2HDo.TVA_CONFIG).compendiumMapper.searchOptions));
        this._fixSearchPaths();
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-compendium-map-config",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/compendiumMap.html",
            resizable: false,
            minimizable: false,
            title: game.i18n.localize("token-variants.settings.compendium-mapper.Name"),
            width: 500
        });
    }
    async getData(options) {
        let data = super.getData(options);
        data = mergeObject(data, (0, $b2HDo.TVA_CONFIG).compendiumMapper);
        const supportedPacks = [
            "Actor",
            "Cards",
            "Item",
            "Macro",
            "RollTable"
        ];
        data.supportedPacks = supportedPacks.join(", ");
        const packs = [];
        game.packs.forEach((pack)=>{
            if (!pack.locked && supportedPacks.includes(pack.documentName)) packs.push({
                title: pack.title,
                id: pack.collection,
                type: pack.documentName
            });
        });
        data.compendiums = packs;
        data.compendium = (0, $b2HDo.TVA_CONFIG).compendiumMapper.compendium;
        data.categories = (0, $1mRWy.BASE_IMAGE_CATEGORIES).concat((0, $b2HDo.TVA_CONFIG).customImageCategories);
        data.category = (0, $b2HDo.TVA_CONFIG).compendiumMapper.category;
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.find(".token-variants-override-category").change(this._onCategoryOverride).trigger("change");
        html.find(".token-variants-auto-apply").change(this._onAutoApply);
        html.find(".token-variants-diff-images").change(this._onDiffImages);
        html.find(`.token-variants-search-options`).on("click", this._onSearchOptions.bind(this));
        html.find(`.token-variants-missing-images`).on("click", this._onMissingImages.bind(this));
        $(html).find('[name="compendium"]').change(this._onCompendiumSelect.bind(this)).trigger("change");
    }
    async _onAutoApply(event) {
        $(event.target).closest("form").find(".token-variants-auto-art-select").prop("disabled", !event.target.checked);
    }
    async _onCategoryOverride(event) {
        $(event.target).closest("form").find(".token-variants-category").prop("disabled", !event.target.checked);
    }
    async _onDiffImages(event) {
        $(event.target).closest("form").find(".token-variants-tp-ignore").prop("disabled", !event.target.checked);
    }
    async _onCompendiumSelect(event) {
        const compendium = game.packs.get($(event.target).val());
        if (compendium) $(event.target).closest("form").find(".token-specific").css("visibility", compendium.documentName === "Actor" ? "visible" : "hidden");
    }
    _fixSearchPaths() {
        if (!this.searchOptions.searchPaths?.length) this.searchOptions.searchPaths = deepClone((0, $b2HDo.TVA_CONFIG).searchPaths);
    }
    async _onSearchOptions(event) {
        this._fixSearchPaths();
        new (0, $2eOJK.default)(this.searchOptions, {
            searchPaths: true,
            searchFilters: true,
            searchAlgorithm: true,
            randomizer: false,
            features: false,
            popup: false,
            permissions: false,
            worldHud: false,
            misc: false,
            activeEffects: false
        }).render(true);
    }
    async _onMissingImages(event) {
        new (0, $8KXhm.default)().render(true);
    }
    async startMapping(formData) {
        if (formData.diffImages && formData.ignoreToken && formData.ignorePortrait) return;
        const originalSearchPaths = (0, $b2HDo.TVA_CONFIG).searchPaths;
        if (formData.searchOptions.searchPaths?.length) (0, $b2HDo.TVA_CONFIG).searchPaths = formData.searchOptions.searchPaths;
        if (formData.cache || !(0, $1mRWy.userRequiresImageCache)() || formData.searchOptions.searchPaths?.length) await (0, $g3wZB.cacheImages)();
        const endMapping = function() {
            if (formData.searchOptions.searchPaths?.length) {
                (0, $b2HDo.TVA_CONFIG).searchPaths = originalSearchPaths;
                (0, $g3wZB.cacheImages)();
            }
        };
        const compendium = game.packs.get(formData.compendium);
        let missingImageList = (0, $b2HDo.TVA_CONFIG).compendiumMapper.missingImages.filter((mi)=>mi.document === "all" || mi.document === compendium.documentName).map((mi)=>mi.image);
        const typeOverride = formData.overrideCategory ? formData.category : null;
        let artSelectDisplayed = false;
        let processItem;
        if (compendium.documentName === "Actor") processItem = async function(item) {
            const actor = await compendium.getDocument(item._id);
            if (actor.name === "#[CF_tempEntity]") return; // Compendium Folders module's control entity
            let hasPortrait = actor.img !== CONST.DEFAULT_TOKEN && !missingImageList.includes(actor.img);
            let hasToken = actor.prototypeToken.texture.src !== CONST.DEFAULT_TOKEN && !missingImageList.includes(actor.prototypeToken.texture.src);
            if (formData.syncImages && hasPortrait !== hasToken) {
                if (hasPortrait) await (0, $1mRWy.updateTokenImage)(actor.img, {
                    actor: actor,
                    applyDefaultConfig: false
                });
                else await (0, $1mRWy.updateActorImage)(actor, actor.prototypeToken.texture.src);
                hasPortrait = hasToken = true;
            }
            let includeThisActor = !(formData.missingOnly && hasPortrait) && !formData.ignorePortrait;
            let includeThisToken = !(formData.missingOnly && hasToken) && !formData.ignoreToken;
            const image1 = formData.showImages ? actor.img : "";
            const image2 = formData.showImages ? actor.prototypeToken.texture.src : "";
            if (includeThisActor || includeThisToken) {
                if (formData.autoApply) await $4d1c0243ffcefb00$var$autoApply(actor, image1, image2, formData, typeOverride);
                else {
                    artSelectDisplayed = true;
                    $4d1c0243ffcefb00$var$addToArtSelectQueue(actor, image1, image2, formData, typeOverride);
                }
            }
        };
        else processItem = async function(item) {
            const doc = await compendium.getDocument(item._id);
            if (doc.name === "#[CF_tempEntity]") return; // Compendium Folders module's control entity
            let defaultImg = "";
            if (doc.schema.fields.img || doc.schema.fields.texture) defaultImg = (doc.schema.fields.img ?? doc.schema.fields.texture).initial();
            const hasImage = doc.img != null && doc.img !== defaultImg && !missingImageList.includes(doc.img);
            let imageFound = false;
            if (formData.missingOnly && hasImage) return;
            if (formData.autoApply) {
                let results = await (0, $g3wZB.doImageSearch)(doc.name, {
                    searchType: typeOverride ?? compendium.documentName,
                    simpleResults: true,
                    searchOptions: formData.searchOptions
                });
                if ((results ?? []).length != 0) {
                    imageFound = true;
                    await (0, $1mRWy.updateActorImage)(doc, results[0], false, formData.compendium);
                }
            }
            if (!formData.autoApply || formData.autoDisplayArtSelect && !imageFound) {
                artSelectDisplayed = true;
                (0, $5JxHT.addToQueue)(doc.name, {
                    searchType: typeOverride ?? compendium.documentName,
                    object: doc,
                    image1: formData.showImages ? doc.img : "",
                    displayMode: (0, $5JxHT.ArtSelect).IMAGE_DISPLAY.IMAGE,
                    searchOptions: formData.searchOptions,
                    callback: async function(imgSrc, name) {
                        await (0, $1mRWy.updateActorImage)(doc, imgSrc);
                    }
                });
            }
        };
        const allItems = [];
        compendium.index.forEach((k)=>{
            allItems.push(k);
        });
        if (formData.autoApply) {
            let processing = true;
            let stopProcessing = false;
            let processed = 0;
            let counter = $(`<p>CACHING 0/${allItems.length}</p>`);
            let d;
            const startProcessing = async function() {
                while(processing && processed < allItems.length){
                    await new Promise((resolve, reject)=>{
                        setTimeout(async ()=>{
                            await processItem(allItems[processed]);
                            resolve();
                        }, 10);
                    });
                    processed++;
                    counter.html(`${processed}/${allItems.length}`);
                }
                if (stopProcessing || processed === allItems.length) {
                    d?.close(true);
                    (0, $5JxHT.addToQueue)("DUMMY", {
                        execute: endMapping
                    });
                    (0, $5JxHT.renderFromQueue)();
                }
            };
            d = new Dialog({
                title: `Mapping: ${compendium.title}`,
                content: `
        <div style="text-align:center;" class="fa-3x"><i class="fas fa-spinner fa-pulse"></i></div>
        <div style="text-align:center;" class="counter"></div>
        <button style="width:100%;" class="pause"><i class="fas fa-play-circle"></i> Pause/Start</button>`,
                buttons: {
                    cancel: {
                        icon: '<i class="fas fa-stop-circle"></i>',
                        label: "Cancel"
                    }
                },
                default: "cancel",
                render: (html)=>{
                    html.find(".counter").append(counter);
                    const spinner = html.find(".fa-spinner");
                    html.find(".pause").on("click", ()=>{
                        if (processing) {
                            processing = false;
                            spinner.removeClass("fa-pulse");
                        } else {
                            processing = true;
                            startProcessing();
                            spinner.addClass("fa-pulse");
                        }
                    });
                    setTimeout(async ()=>startProcessing(), 1000);
                },
                close: ()=>{
                    if (!stopProcessing) {
                        stopProcessing = true;
                        if (!processing) startProcessing();
                        else processing = false;
                    }
                }
            });
            d.render(true);
        } else {
            const tasks = allItems.map(processItem);
            Promise.all(tasks).then(()=>{
                (0, $5JxHT.addToQueue)("DUMMY", {
                    execute: endMapping
                });
                (0, $5JxHT.renderFromQueue)();
                if (formData.missingOnly && !artSelectDisplayed) ui.notifications.warn("Token Variant Art: No documents found containing missing images.");
            });
        }
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        // If search paths are the same, remove them from searchOptions
        if (!this.searchOptions.searchPaths?.length || isEmpty(diffObject(this.searchOptions.searchPaths, (0, $b2HDo.TVA_CONFIG).searchPaths))) this.searchOptions.searchPaths = [];
        formData.searchOptions = this.searchOptions;
        await (0, $b2HDo.updateSettings)({
            compendiumMapper: formData
        });
        if (formData.compendium) this.startMapping(formData);
    }
}

});
parcelRequire.register("2eOJK", function(module, exports) {

$parcel$export(module.exports, "default", () => $1a143edcaeb509aa$export$2e2bcd8739ae039);

var $g3wZB = parcelRequire("g3wZB");

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");

var $1v9Gt = parcelRequire("1v9Gt");

var $eSPJO = parcelRequire("eSPJO");
class $1a143edcaeb509aa$export$2e2bcd8739ae039 extends FormApplication {
    constructor(dummySettings, { searchPaths: searchPaths = true, searchFilters: searchFilters = true, searchAlgorithm: searchAlgorithm = true, randomizer: randomizer = true, popup: popup = true, permissions: permissions = true, worldHud: worldHud = true, misc: misc = true, activeEffects: activeEffects = true, features: features = false } = {}){
        super({}, {});
        this.enabledTabs = {
            searchPaths: searchPaths,
            searchFilters: searchFilters,
            searchAlgorithm: searchAlgorithm,
            randomizer: randomizer,
            features: features,
            popup: popup,
            permissions: permissions,
            worldHud: worldHud,
            misc: misc,
            activeEffects: activeEffects
        };
        this.settings = foundry.utils.deepClone((0, $b2HDo.TVA_CONFIG));
        if (dummySettings) {
            this.settings = mergeObject(this.settings, dummySettings, {
                insertKeys: false
            });
            this.dummySettings = dummySettings;
        }
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-configure-settings",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/configureSettings.html",
            resizable: false,
            minimizable: false,
            title: "Configure Settings",
            width: 700,
            height: "auto",
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".content",
                    initial: "searchPaths"
                }
            ]
        });
    }
    async getData(options) {
        const data = super.getData(options);
        const settings = this.settings;
        data.enabledTabs = this.enabledTabs;
        // === Search Paths ===
        const paths = settings.searchPaths.map((path)=>{
            const r = {};
            r.text = path.text;
            r.icon = this._pathIcon(path.source || "");
            r.cache = path.cache;
            r.source = path.source || "";
            r.types = path.types.join(",");
            r.config = JSON.stringify(path.config ?? {});
            r.hasConfig = path.config && !isEmpty(path.config);
            return r;
        });
        data.searchPaths = paths;
        // === Search Filters ===
        data.searchFilters = settings.searchFilters;
        for(const filter in data.searchFilters)data.searchFilters[filter].label = filter;
        // === Algorithm ===
        data.algorithm = deepClone(settings.algorithm);
        data.algorithm.fuzzyThreshold = 100 - data.algorithm.fuzzyThreshold * 100;
        // === Randomizer ===
        // Get all actor types defined by the game system
        data.randomizer = deepClone(settings.randomizer);
        const actorTypes = (game.system.entityTypes ?? game.system.documentTypes)["Actor"];
        data.randomizer.actorTypes = actorTypes.reduce((obj, t)=>{
            const label = CONFIG["Actor"]?.typeLabels?.[t] ?? t;
            obj[t] = {
                label: game.i18n.has(label) ? game.i18n.localize(label) : t,
                disable: settings.randomizer[`${t}Disable`] ?? false
            };
            return obj;
        }, {});
        data.randomizer.tokenToPortraitDisabled = !(settings.randomizer.tokenCreate || settings.randomizer.tokenCopyPaste) || data.randomizer.diffImages;
        // === Pop-up ===
        data.popup = deepClone(settings.popup);
        // Get all actor types defined by the game system
        data.popup.actorTypes = actorTypes.reduce((obj, t)=>{
            const label = CONFIG["Actor"]?.typeLabels?.[t] ?? t;
            obj[t] = {
                type: t,
                label: game.i18n.has(label) ? game.i18n.localize(label) : t,
                disable: settings.popup[`${t}Disable`] ?? false
            };
            return obj;
        }, {});
        // Split into arrays of max length 3
        let allTypes = [];
        let tempTypes = [];
        let i = 0;
        for (const [key, value] of Object.entries(data.popup.actorTypes)){
            tempTypes.push(value);
            i++;
            if (i % 3 == 0) {
                allTypes.push(tempTypes);
                tempTypes = [];
            }
        }
        if (tempTypes.length > 0) allTypes.push(tempTypes);
        data.popup.actorTypes = allTypes;
        // === Permissions ===
        data.permissions = settings.permissions;
        // === Token HUD ===
        data.worldHud = deepClone(settings.worldHud);
        data.worldHud.tokenHUDWildcardActive = game.modules.get("token-hud-wildcard")?.active;
        // === Internal Effects ===
        data.internalEffects = deepClone(settings.internalEffects);
        // === Misc ===
        data.keywordSearch = settings.keywordSearch;
        data.excludedKeywords = settings.excludedKeywords;
        data.systemHpPath = settings.systemHpPath;
        data.runSearchOnPath = settings.runSearchOnPath;
        data.imgurClientId = settings.imgurClientId;
        data.enableStatusConfig = settings.enableStatusConfig;
        data.disableNotifs = settings.disableNotifs;
        data.staticCache = settings.staticCache;
        data.staticCacheFile = settings.staticCacheFile;
        data.stackStatusConfig = settings.stackStatusConfig;
        data.mergeGroup = settings.mergeGroup;
        data.customImageCategories = settings.customImageCategories.join(",");
        data.disableEffectIcons = settings.disableEffectIcons;
        data.displayEffectIconsOnHover = settings.displayEffectIconsOnHover;
        data.filterEffectIcons = settings.filterEffectIcons;
        data.hideElevationTooltip = settings.hideElevationTooltip;
        data.hideTokenBorder = settings.hideTokenBorder;
        data.filterCustomEffectIcons = settings.filterCustomEffectIcons;
        data.filterIconList = settings.filterIconList.join(",");
        data.tilesEnabled = settings.tilesEnabled;
        data.updateTokenProto = settings.updateTokenProto;
        data.imgNameContainsDimensions = settings.imgNameContainsDimensions;
        data.imgNameContainsFADimensions = settings.imgNameContainsFADimensions;
        data.playVideoOnHover = settings.playVideoOnHover;
        data.pauseVideoOnHoverOut = settings.pauseVideoOnHoverOut;
        data.disableImageChangeOnPolymorphed = settings.disableImageChangeOnPolymorphed;
        data.disableImageUpdateOnNonPrototype = settings.disableImageUpdateOnNonPrototype;
        data.disableTokenUpdateAnimation = settings.disableTokenUpdateAnimation;
        data.mappingsCurrentSceneOnly = settings.mappingsCurrentSceneOnly;
        // Controls
        data.pathfinder = [
            "pf1e",
            "pf2e"
        ].includes(game.system.id);
        data.dnd5e = game.system.id === "dnd5e";
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        // Search Paths
        super.activateListeners(html);
        html.find("a.create-path").click(this._onCreatePath.bind(this));
        html.on("input", ".searchSource", this._onSearchSourceTextChange.bind(this));
        $(html).on("click", "a.delete-path", this._onDeletePath.bind(this));
        $(html).on("click", "a.convert-imgur", this._onConvertImgurPath.bind(this));
        $(html).on("click", "a.convert-json", this._onConvertJsonPath.bind(this));
        $(html).on("click", ".path-image.source-icon a", this._onBrowseFolder.bind(this));
        $(html).on("click", "a.select-category", (0, $eSPJO.showPathSelectCategoryDialog).bind(this));
        $(html).on("click", "a.select-config", (0, $eSPJO.showPathSelectConfigForm).bind(this));
        // Search Filters
        html.on("input", "input.filterRegex", this._validateRegex.bind(this));
        // Active Effects
        const disableEffectIcons = html.find('[name="disableEffectIcons"]');
        const filterEffectIcons = html.find('[name="filterEffectIcons"]');
        disableEffectIcons.on("change", (e)=>{
            if (e.target.checked) filterEffectIcons.prop("checked", false);
        }).trigger("change");
        filterEffectIcons.on("change", (e)=>{
            if (e.target.checked) disableEffectIcons.prop("checked", false);
        });
        // Algorithm
        const algorithmTab = $(html).find('div[data-tab="searchAlgorithm"]');
        algorithmTab.find(`input[name="algorithm.exact"]`).change((e)=>{
            $(e.target).closest("form").find('input[name="algorithm.fuzzy"]').prop("checked", !e.target.checked);
        });
        algorithmTab.find(`input[name="algorithm.fuzzy"]`).change((e)=>{
            $(e.target).closest("form").find('input[name="algorithm.exact"]').prop("checked", !e.target.checked);
        });
        algorithmTab.find('input[name="algorithm.fuzzyThreshold"]').change((e)=>{
            $(e.target).siblings(".token-variants-range-value").html(`${e.target.value}%`);
        });
        // Randomizer
        const tokenCreate = html.find('input[name="randomizer.tokenCreate"]');
        const tokenCopyPaste = html.find('input[name="randomizer.tokenCopyPaste"]');
        const tokenToPortrait = html.find('input[name="randomizer.tokenToPortrait"]');
        const _toggle = ()=>{
            tokenToPortrait.prop("disabled", !(tokenCreate.is(":checked") || tokenCopyPaste.is(":checked")));
        };
        tokenCreate.change(_toggle);
        tokenCopyPaste.change(_toggle);
        const diffImages = html.find('input[name="randomizer.diffImages"]');
        const syncImages = html.find('input[name="randomizer.syncImages"]');
        diffImages.change(()=>{
            syncImages.prop("disabled", !diffImages.is(":checked"));
            tokenToPortrait.prop("disabled", diffImages.is(":checked"));
        });
        // Token HUD
        html.find('input[name="worldHud.updateActorImage"]').change((event)=>{
            $(event.target).closest("form").find('input[name="worldHud.useNameSimilarity"]').prop("disabled", !event.target.checked);
        });
        // Static Cache
        html.find("button.token-variants-cache-images").click((event)=>{
            const tab = $(event.target).closest(".tab");
            const staticOn = tab.find('input[name="staticCache"]');
            const staticFile = tab.find('input[name="staticCacheFile"]');
            (0, $g3wZB.cacheImages)({
                staticCache: staticOn.is(":checked"),
                staticCacheFile: staticFile.val()
            });
        });
        // Global Mappings
        html.find("button.token-variants-global-mapping").click(()=>{
            const setting = game.settings.get("core", DefaultTokenConfig.SETTING);
            const data = new foundry.data.PrototypeToken(setting);
            const token = new TokenDocument(data, {
                actor: null
            });
            new (0, $1v9Gt.default)(token, {
                globalMappings: true
            }).render(true);
        });
    }
    /**
   * Validates regex entered into Search Filter's RegEx input field
   */ async _validateRegex(event) {
        if (this._validRegex(event.target.value)) event.target.style.backgroundColor = "";
        else event.target.style.backgroundColor = "#ff7066";
    }
    _validRegex(val) {
        if (val) try {
            new RegExp(val);
        } catch (e) {
            return false;
        }
        return true;
    }
    /**
   * Open a FilePicker so the user can select a local folder to use as an image source
   */ async _onBrowseFolder(event) {
        const pathInput = $(event.target).closest(".table-row").find(".path-text input");
        const sourceInput = $(event.target).closest(".table-row").find(".path-source input");
        let activeSource = sourceInput.val() || "data";
        let current = pathInput.val();
        if (activeSource.startsWith("s3:")) {
            const bucketName = activeSource.replace("s3:", "");
            current = `${game.data.files.s3?.endpoint.protocol}//${bucketName}.${game.data.files.s3?.endpoint.host}/${current}`;
        } else if (activeSource.startsWith("rolltable")) {
            let content = `<select style="width: 100%;" name="table-name" id="output-tableKey">`;
            game.tables.forEach((rollTable)=>{
                content += `<option value='${rollTable.name}'>${rollTable.name}</option>`;
            });
            content += `</select>`;
            new Dialog({
                title: `Select a Rolltable`,
                content: content,
                buttons: {
                    yes: {
                        icon: "<i class='fas fa-check'></i>",
                        label: "Select",
                        callback: (html)=>{
                            pathInput.val();
                            const tableName = html.find("select[name='table-name']").val();
                            pathInput.val(tableName);
                        }
                    }
                },
                default: "yes"
            }).render(true);
            return;
        }
        if (activeSource === "json") new FilePicker({
            type: "text",
            activeSource: "data",
            current: current,
            callback: (path, fp)=>{
                pathInput.val(path);
            }
        }).render(true);
        else new FilePicker({
            type: "folder",
            activeSource: activeSource,
            current: current,
            callback: (path, fp)=>{
                pathInput.val(fp.result.target);
                if (fp.activeSource === "s3") sourceInput.val(`s3:${fp.result.bucket}`);
                else sourceInput.val(fp.activeSource);
            }
        }).render(true);
    }
    /**
   * Converts Imgur path to a rolltable
   */ async _onConvertImgurPath(event) {
        event.preventDefault();
        const pathInput = $(event.target).closest(".table-row").find(".path-text input");
        const sourceInput = $(event.target).closest(".table-row").find(".path-source input");
        const albumHash = pathInput.val();
        const imgurClientId = (0, $b2HDo.TVA_CONFIG).imgurClientId === "" ? "df9d991443bb222" : (0, $b2HDo.TVA_CONFIG).imgurClientId;
        fetch("https://api.imgur.com/3/gallery/album/" + albumHash, {
            headers: {
                Authorization: "Client-ID " + imgurClientId,
                Accept: "application/json"
            }
        }).then((response)=>response.json()).then((async function(result) {
            if (!result.success && location.hostname === "localhost") {
                ui.notifications.warn(game.i18n.format("token-variants.notifications.warn.imgur-localhost"));
                return;
            }
            const data = result.data;
            let resultsArray = [];
            data.images.forEach((img, i)=>{
                resultsArray.push({
                    type: 0,
                    text: img.title ?? img.description ?? "",
                    weight: 1,
                    range: [
                        i + 1,
                        i + 1
                    ],
                    collection: "Text",
                    drawn: false,
                    img: img.link
                });
            });
            await RollTable.create({
                name: data.title,
                description: "Token Variant Art auto generated RollTable: https://imgur.com/gallery/" + albumHash,
                results: resultsArray,
                replacement: true,
                displayRoll: true,
                img: "modules/token-variants/img/token-images.svg"
            });
            pathInput.val(data.title);
            sourceInput.val("rolltable").trigger("input");
        }).bind(this)).catch((error)=>console.warn("TVA | ", error));
    }
    /**
   * Converts Json path to a rolltable
   */ async _onConvertJsonPath(event) {
        event.preventDefault();
        const pathInput = $(event.target).closest(".table-row").find(".path-text input");
        const sourceInput = $(event.target).closest(".table-row").find(".path-source input");
        const jsonPath = pathInput.val();
        fetch(jsonPath, {
            headers: {
                Accept: "application/json"
            }
        }).then((response)=>response.json()).then((async function(result) {
            if (!result.length > 0) {
                ui.notifications.warn(game.i18n.format("token-variants.notifications.warn.json-localhost"));
                return;
            }
            const data = result;
            data.title = (0, $1mRWy.getFileName)(jsonPath);
            let resultsArray = [];
            data.forEach((img, i)=>{
                resultsArray.push({
                    type: 0,
                    text: img.name ?? "",
                    weight: 1,
                    range: [
                        i + 1,
                        i + 1
                    ],
                    collection: "Text",
                    drawn: false,
                    img: img.path
                });
            });
            await RollTable.create({
                name: data.title,
                description: "Token Variant Art auto generated RollTable: " + jsonPath,
                results: resultsArray,
                replacement: true,
                displayRoll: true,
                img: "modules/token-variants/img/token-images.svg"
            });
            pathInput.val(data.title);
            sourceInput.val("rolltable").trigger("input");
        }).bind(this)).catch((error)=>console.warn("TVA | ", error));
    }
    /**
   * Generates a new search path row
   */ async _onCreatePath(event) {
        event.preventDefault();
        const table = $(event.currentTarget).closest(".token-variant-table");
        let row = `
    <li class="table-row flexrow">
        <div class="path-image source-icon">
            <a><i class="${this._pathIcon("")}"></i></a>
        </div>
        <div class="path-source">
          <input class="searchSource" type="text" name="searchPaths.source" value="" placeholder="data"/>
        </div>
        <div class="path-text">
            <input class="searchPath" type="text" name="searchPaths.text" value="" placeholder="Path to folder"/>
        </div>
        <div class="imgur-control">
            <a class="convert-imgur" title="Convert to Rolltable"><i class="fas fa-angle-double-left"></i></a>
        </div>
        <div class="json-control">
          <a class="convert-json" title="Convert to Rolltable"><i class="fas fa-angle-double-left"></i></a>
        </div>
        <div class="path-category">
            <a class="select-category" title="Select image categories/filters"><i class="fas fa-swatchbook"></i></a>
            <input type="hidden" name="searchPaths.types" value="Portrait,Token,PortraitAndToken">
        </div>
        <div class="path-config">
          <a class="select-config" title="Apply configuration to images under this path."><i class="fas fa-cog fa-lg"></i></a>
          <input type="hidden" name="searchPaths.config" value="{}">
         </div>
        <div class="path-cache">
            <input type="checkbox" name="searchPaths.cache" data-dtype="Boolean" checked/>
        </div>
        <div class="path-controls">
            <a class="delete-path" title="Delete path"><i class="fas fa-trash"></i></a>
        </div>
    </li>
  `;
        table.append(row);
        this._reIndexPaths(table);
        this.setPosition(); // Auto-resize window
    }
    async _reIndexPaths(table) {
        table.find(".path-source").find("input").each(function(index) {
            $(this).attr("name", `searchPaths.${index}.source`);
        });
        table.find(".path-text").find("input").each(function(index) {
            $(this).attr("name", `searchPaths.${index}.text`);
        });
        table.find(".path-cache").find("input").each(function(index) {
            $(this).attr("name", `searchPaths.${index}.cache`);
        });
        table.find(".path-category").find("input").each(function(index) {
            $(this).attr("name", `searchPaths.${index}.types`);
        });
        table.find(".path-config").find("input").each(function(index) {
            $(this).attr("name", `searchPaths.${index}.config`);
        });
    }
    async _onDeletePath(event) {
        event.preventDefault();
        const li = event.currentTarget.closest(".table-row");
        li.remove();
        const table = $(event.currentTarget).closest(".token-variant-table");
        this._reIndexPaths(table);
        this.setPosition(); // Auto-resize window
    }
    async _onSearchSourceTextChange(event) {
        const image = this._pathIcon(event.target.value);
        const imgur = image === "fas fa-info";
        const json = image === "fas fa-brackets-curly";
        const imgurControl = $(event.currentTarget).closest(".table-row").find(".imgur-control");
        if (imgur) imgurControl.addClass("active");
        else imgurControl.removeClass("active");
        const jsonControl = $(event.currentTarget).closest(".table-row").find(".json-control");
        if (json) jsonControl.addClass("active");
        else jsonControl.removeClass("active");
        $(event.currentTarget).closest(".table-row").find(".path-image i").attr("class", image);
    }
    // Return icon appropriate for the path provided
    _pathIcon(source) {
        if (source.startsWith("s3")) return "fas fa-database";
        else if (source.startsWith("rolltable")) return "fas fa-dice";
        else if (source.startsWith("forgevtt") || source.startsWith("forge-bazaar")) return "fas fa-hammer";
        else if (source.startsWith("imgur")) return "fas fa-info";
        else if (source.startsWith("json")) return "fas fa-brackets-curly";
        return "fas fa-folder";
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        const settings = this.settings;
        formData = expandObject(formData);
        // Search Paths
        settings.searchPaths = formData.hasOwnProperty("searchPaths") ? Object.values(formData.searchPaths) : [];
        settings.searchPaths.forEach((path)=>{
            if (!path.source) path.source = "data";
            if (path.types) path.types = path.types.split(",");
            else path.types = [];
            if (path.config) try {
                path.config = JSON.parse(path.config);
            } catch (e) {
                delete path.config;
            }
            else delete path.config;
        });
        // Search Filters
        for(const filter in formData.searchFilters)if (!this._validRegex(formData.searchFilters[filter].regex)) formData.searchFilters[filter].regex = "";
        mergeObject(settings.searchFilters, formData.searchFilters);
        // Algorithm
        formData.algorithm.fuzzyLimit = parseInt(formData.algorithm.fuzzyLimit);
        if (isNaN(formData.algorithm.fuzzyLimit) || formData.algorithm.fuzzyLimit < 1) formData.algorithm.fuzzyLimit = 50;
        formData.algorithm.fuzzyThreshold = (100 - formData.algorithm.fuzzyThreshold) / 100;
        mergeObject(settings.algorithm, formData.algorithm);
        // Randomizer
        mergeObject(settings.randomizer, formData.randomizer);
        // Pop-up
        mergeObject(settings.popup, formData.popup);
        // Permissions
        mergeObject(settings.permissions, formData.permissions);
        // Token HUD
        mergeObject(settings.worldHud, formData.worldHud);
        // Internal Effects
        mergeObject(settings.internalEffects, formData.internalEffects);
        // Misc
        mergeObject(settings, {
            keywordSearch: formData.keywordSearch,
            excludedKeywords: formData.excludedKeywords,
            systemHpPath: formData.systemHpPath?.trim(),
            runSearchOnPath: formData.runSearchOnPath,
            imgurClientId: formData.imgurClientId,
            enableStatusConfig: formData.enableStatusConfig,
            disableNotifs: formData.disableNotifs,
            staticCache: formData.staticCache,
            staticCacheFile: formData.staticCacheFile,
            tilesEnabled: formData.tilesEnabled,
            stackStatusConfig: formData.stackStatusConfig,
            mergeGroup: formData.mergeGroup,
            customImageCategories: (formData.customImageCategories || "").split(",").map((t)=>t.trim()).filter((t)=>t),
            disableEffectIcons: formData.disableEffectIcons,
            displayEffectIconsOnHover: formData.displayEffectIconsOnHover,
            filterEffectIcons: formData.filterEffectIcons,
            hideElevationTooltip: formData.hideElevationTooltip,
            hideTokenBorder: formData.hideTokenBorder,
            filterCustomEffectIcons: formData.filterCustomEffectIcons,
            filterIconList: (formData.filterIconList || "").split(",").map((t)=>t.trim()).filter((t)=>t),
            updateTokenProto: formData.updateTokenProto,
            imgNameContainsDimensions: formData.imgNameContainsDimensions,
            imgNameContainsFADimensions: formData.imgNameContainsFADimensions,
            playVideoOnHover: formData.playVideoOnHover,
            pauseVideoOnHoverOut: formData.pauseVideoOnHoverOut,
            disableImageChangeOnPolymorphed: formData.disableImageChangeOnPolymorphed,
            disableImageUpdateOnNonPrototype: formData.disableImageUpdateOnNonPrototype,
            disableTokenUpdateAnimation: formData.disableTokenUpdateAnimation,
            mappingsCurrentSceneOnly: formData.mappingsCurrentSceneOnly
        });
        // Global Mappings
        settings.globalMappings = (0, $b2HDo.TVA_CONFIG).globalMappings;
        // Save Settings
        if (this.dummySettings) $1a143edcaeb509aa$export$a503acf01ac4867a(this.dummySettings, settings, {
            insertKeys: false
        });
        else (0, $b2HDo.updateSettings)(settings);
    }
}
function $1a143edcaeb509aa$export$a503acf01ac4867a(original, other = {}, { insertKeys: insertKeys = true, insertValues: insertValues = true, overwrite: overwrite = true, recursive: recursive = true, inplace: inplace = true, enforceTypes: enforceTypes = false } = {}, _d = 0) {
    other = other || {};
    if (!(original instanceof Object) || !(other instanceof Object)) throw new Error("One of original or other are not Objects!");
    const options = {
        insertKeys: insertKeys,
        insertValues: insertValues,
        overwrite: overwrite,
        recursive: recursive,
        inplace: inplace,
        enforceTypes: enforceTypes
    };
    // Special handling at depth 0
    if (_d === 0) {
        if (!inplace) original = deepClone(original);
        if (Object.keys(original).some((k)=>/\./.test(k))) original = expandObject(original);
        if (Object.keys(other).some((k)=>/\./.test(k))) other = expandObject(other);
    }
    // Iterate over the other object
    for (let k of Object.keys(other)){
        const v = other[k];
        if (original.hasOwnProperty(k)) $1a143edcaeb509aa$var$_mergeUpdate(original, k, v, options, _d + 1);
        else $1a143edcaeb509aa$var$_mergeInsertFix(original, k, v, options, _d + 1);
    }
    return original;
}
function $1a143edcaeb509aa$var$_mergeInsertFix(original, k, v, { insertKeys: insertKeys, insertValues: insertValues } = {}, _d) {
    // Recursively create simple objects
    if (v?.constructor === Object && insertKeys) {
        original[k] = $1a143edcaeb509aa$export$a503acf01ac4867a({}, v, {
            insertKeys: true,
            inplace: true
        });
        return;
    }
    // Delete a key
    if (k.startsWith("-=")) {
        delete original[k.slice(2)];
        return;
    }
    // Insert a key
    const canInsert = _d <= 1 && insertKeys || _d > 1 && insertValues;
    if (canInsert) original[k] = v;
}
function $1a143edcaeb509aa$var$_mergeUpdate(original, k, v, { insertKeys: insertKeys, insertValues: insertValues, enforceTypes: enforceTypes, overwrite: overwrite, recursive: recursive } = {}, _d) {
    const x = original[k];
    const tv = getType(v);
    const tx = getType(x);
    // Recursively merge an inner object
    if (tv === "Object" && tx === "Object" && recursive) return $1a143edcaeb509aa$export$a503acf01ac4867a(x, v, {
        insertKeys: insertKeys,
        insertValues: insertValues,
        overwrite: overwrite,
        inplace: true,
        enforceTypes: enforceTypes
    }, _d);
    // Overwrite an existing value
    if (overwrite) {
        if (tx !== "undefined" && tv !== tx && enforceTypes) throw new Error(`Mismatched data types encountered during object merge.`);
        original[k] = v;
    }
}

});

parcelRequire.register("8KXhm", function(module, exports) {

$parcel$export(module.exports, "default", () => $66009a2c9bd04e15$export$2e2bcd8739ae039);

var $b2HDo = parcelRequire("b2HDo");

var $1mRWy = parcelRequire("1mRWy");

var $hAn2A = parcelRequire("hAn2A");
class $66009a2c9bd04e15$export$2e2bcd8739ae039 extends FormApplication {
    constructor(){
        super({}, {});
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-missing-images",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/missingImageConfig.html",
            resizable: true,
            minimizable: false,
            title: "Define Missing Images",
            width: 560,
            height: "auto"
        });
    }
    async getData(options) {
        const data = super.getData(options);
        if (!this.missingImages) this.missingImages = deepClone((0, $b2HDo.TVA_CONFIG).compendiumMapper.missingImages);
        data.missingImages = this.missingImages;
        data.documents = [
            "all",
            "Actor",
            "Cards",
            "Item",
            "Macro",
            "RollTable"
        ];
        return data;
    }
    _processFormData(formData) {
        if (!Array.isArray(formData.document)) {
            formData.document = [
                formData.document
            ];
            formData.image = [
                formData.image
            ];
        }
        const missingImages = [];
        for(let i = 0; i < formData.document.length; i++)missingImages.push({
            document: formData.document[i],
            image: formData.image[i]
        });
        return missingImages;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.on("click", ".add-row", ()=>{
            const formData = this._getSubmitData();
            this.missingImages = this._processFormData(formData);
            this.missingImages.push({
                document: "all",
                image: CONST.DEFAULT_TOKEN
            });
            this.render();
        });
        html.on("click", ".delete-row", (event)=>{
            const formData = this._getSubmitData();
            this.missingImages = this._processFormData(formData);
            const index = $(event.target).closest("li")[0].dataset.index;
            this.missingImages.splice(index, 1);
            this.render();
        });
        html.on("click", ".file-picker", (event)=>{
            new FilePicker({
                type: "imagevideo",
                callback: (path)=>{
                    $(event.target).closest("li").find('[name="image"]').val(path);
                    $(event.target).closest("li").find("img").attr("src", path);
                }
            }).render();
        });
        html.on("click", ".duplicate-picker", (event)=>{
            let content = `<select style="width: 100%;" name="compendium">`;
            game.packs.forEach((pack)=>{
                content += `<option value='${pack.collection}'>${pack.title}</option>`;
            });
            content += `</select>`;
            new Dialog({
                title: `Compendiums`,
                content: content,
                buttons: {
                    yes: {
                        icon: "<i class='far fa-search'></i>",
                        label: "Search for Duplicates",
                        callback: (html)=>{
                            const found = new Set();
                            const duplicates = new Set();
                            const compendium = game.packs.get(html.find("[name='compendium']").val());
                            compendium.index.forEach((k)=>{
                                if (found.has(k.img)) duplicates.add(k.img);
                                found.add(k.img);
                            });
                            if (!duplicates.size) ui.notifications.info("No duplicates found in: " + compendium.title);
                            const images = Array.from(duplicates).map((img)=>{
                                return {
                                    path: img,
                                    name: (0, $1mRWy.getFileName)(img)
                                };
                            });
                            const allImages = new Map();
                            allImages.set("Duplicates", images);
                            (0, $hAn2A.showArtSelect)("Duplicates", {
                                allImages: allImages,
                                callback: (img)=>{
                                    $(event.target).closest("li").find('[name="image"]').val(img);
                                    $(event.target).closest("li").find("img").attr("src", img);
                                }
                            });
                        }
                    }
                },
                default: "yes"
            }).render(true);
        });
    }
    async _updateObject(event, formData) {
        (0, $b2HDo.updateSettings)({
            compendiumMapper: {
                missingImages: this._processFormData(formData)
            }
        });
    }
}

});



parcelRequire.register("6GTsc", function(module, exports) {

$parcel$export(module.exports, "ForgeSearchPaths", () => $4df1ae46f699f88f$export$5713be0477a7b0d8);

var $b2HDo = parcelRequire("b2HDo");

var $eSPJO = parcelRequire("eSPJO");
class $4df1ae46f699f88f$export$5713be0477a7b0d8 extends FormApplication {
    constructor(){
        super({}, {});
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-search-paths",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/forgeSearchPaths.html",
            resizable: true,
            minimizable: false,
            closeOnSubmit: false,
            title: game.i18n.localize("token-variants.settings.search-paths.Name"),
            width: 592,
            height: "auto",
            scrollY: [
                "ol.token-variant-table"
            ],
            dragDrop: [
                {
                    dragSelector: null,
                    dropSelector: null
                }
            ]
        });
    }
    async getData(options) {
        if (!this.object.paths) this.object.paths = await this._getPaths();
        const paths = this.object.paths.map((path)=>{
            const r = {};
            r.text = path.text;
            r.cache = path.cache;
            r.share = path.share;
            r.types = path.types.join(",");
            r.config = JSON.stringify(path.config ?? {});
            return r;
        });
        const data = super.getData(options);
        data.paths = paths;
        data.apiKey = this.apiKey;
        return data;
    }
    async _getPaths() {
        const forgePaths = deepClone((0, $b2HDo.TVA_CONFIG).forgeSearchPaths) || {};
        this.userId = typeof ForgeAPI !== "undefined" ? await ForgeAPI.getUserId() : "tempUser"; // TODO
        this.apiKey = forgePaths[this.userId]?.apiKey;
        return forgePaths[this.userId]?.paths || [];
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.find("a.create-path").click(this._onCreatePath.bind(this));
        $(html).on("click", "a.select-category", (0, $eSPJO.showPathSelectCategoryDialog).bind(this));
        $(html).on("click", "a.select-config", (0, $eSPJO.showPathSelectConfigForm).bind(this));
        html.find("a.delete-path").click(this._onDeletePath.bind(this));
        html.find("button.reset").click(this._onReset.bind(this));
        html.find("button.update").click(this._onUpdate.bind(this));
        $(html).on("click", ".path-image.source-icon a", this._onBrowseFolder.bind(this));
    }
    /**
   * Open a FilePicker so the user can select a local folder to use as an image source
   */ async _onBrowseFolder(event1) {
        const pathInput = $(event1.target).closest(".table-row").find(".path-text input");
        new FilePicker({
            type: "folder",
            activeSource: "forgevtt",
            current: pathInput.val(),
            callback: (path, fp)=>{
                if (fp.activeSource !== "forgevtt") ui.notifications.warn("Token Variant Art: Only 'Assets Library' paths are supported");
                else pathInput.val(fp.result.target);
            }
        }).render(true);
    }
    async _onCreatePath(event1) {
        event1.preventDefault();
        await this._onSubmit(event1);
        this.object.paths.push({
            text: "",
            cache: true,
            share: true,
            types: [
                "Portrait",
                "Token",
                "PortraitAndToken"
            ]
        });
        this.render();
    }
    async _onDeletePath(event1) {
        event1.preventDefault();
        await this._onSubmit(event1);
        const li = event1.currentTarget.closest(".table-row");
        this.object.paths.splice(li.dataset.index, 1);
        this.render();
    }
    _onReset(event1) {
        event1.preventDefault();
        this.object.paths = this._getPaths();
        this.render();
    }
    async _onUpdate(event1) {
        event1.preventDefault();
        await this._onSubmit(event1);
        this._updatePaths();
    }
    async _updateObject(event1, formData) {
        const expanded = expandObject(formData);
        expanded.paths = expanded.hasOwnProperty("paths") ? Object.values(expanded.paths) : [];
        expanded.paths.forEach((path, index)=>{
            this.object.paths[index] = {
                text: path.text,
                cache: path.cache,
                share: path.share,
                source: path.source,
                types: path.types.split(",")
            };
            if (path.config) try {
                path.config = JSON.parse(path.config);
                if (!isEmpty(path.config)) this.object.paths[index].config = path.config;
            } catch (e) {}
        });
        this.apiKey = expanded.apiKey;
    }
    _cleanPaths() {
        // Cleanup empty and duplicate paths
        let uniquePaths = new Set();
        let paths = this.object.paths.filter((path)=>{
            if (!path.text || uniquePaths.has(path.text)) return false;
            uniquePaths.add(path.text);
            return true;
        });
        return paths;
    }
    _updatePaths() {
        if (this.userId) {
            const forgePaths = deepClone((0, $b2HDo.TVA_CONFIG).forgeSearchPaths) || {};
            forgePaths[this.userId] = {
                paths: this._cleanPaths(),
                apiKey: this.apiKey
            };
            if (game.user.isGM) (0, $b2HDo.updateSettings)({
                forgeSearchPaths: forgePaths
            });
            else {
                // Workaround for forgeSearchPaths setting to be updated by non-GM clients
                const message = {
                    handlerName: "forgeSearchPaths",
                    args: forgePaths,
                    type: "UPDATE"
                };
                game.socket?.emit("module.token-variants", message);
            }
        }
    }
    async close(options = {}) {
        await this._onSubmit(event);
        this._updatePaths();
        return super.close(options);
    }
}

});

parcelRequire.register("cs1Zo", function(module, exports) {

$parcel$export(module.exports, "default", () => $9109a4939abde6f4$export$2e2bcd8739ae039);

var $b2HDo = parcelRequire("b2HDo");
class $9109a4939abde6f4$export$2e2bcd8739ae039 extends FormApplication {
    constructor(){
        super({}, {
            title: `Token HUD Settings`
        });
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-hud-settings",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/tokenHUDClientSettings.html",
            resizable: false,
            minimizable: false,
            title: "",
            width: 500
        });
    }
    async getData(options) {
        const data = super.getData(options);
        return mergeObject(data, (0, $b2HDo.TVA_CONFIG).hud);
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        game.settings.set("token-variants", "hudSettings", mergeObject((0, $b2HDo.TVA_CONFIG).hud, formData));
    }
}

});

parcelRequire.register("6Aufe", function(module, exports) {

$parcel$export(module.exports, "default", () => $4cbd90d024958cd4$export$2e2bcd8739ae039);

var $b2HDo = parcelRequire("b2HDo");
class $4cbd90d024958cd4$export$2e2bcd8739ae039 extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "token-variants-import-export",
            classes: [
                "sheet"
            ],
            template: "modules/token-variants/templates/importExport.html",
            resizable: false,
            minimizable: false,
            title: "Import/Export",
            width: 250
        });
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.find(".import").click(this._importFromJSONDialog.bind(this));
        html.find(".export").click(()=>{
            (0, $b2HDo.exportSettingsToJSON)();
            this.close();
        });
    }
    async _importFromJSONDialog() {
        const content = await renderTemplate("templates/apps/import-data.html", {
            entity: "token-variants",
            name: "settings"
        });
        let dialog = new Promise((resolve, reject)=>{
            new Dialog({
                title: game.i18n.localize("token-variants.settings.import-export.window.import-dialog"),
                content: content,
                buttons: {
                    import: {
                        icon: '<i class="fas fa-file-import"></i>',
                        label: game.i18n.localize("token-variants.common.import"),
                        callback: (html)=>{
                            const form = html.find("form")[0];
                            if (!form.data.files.length) return ui.notifications?.error("You did not upload a data file!");
                            readTextFromFile(form.data.files[0]).then((json)=>{
                                (0, $b2HDo.importSettingsFromJSON)(json);
                                resolve(true);
                            });
                        }
                    },
                    no: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: (html)=>resolve(false)
                    }
                },
                default: "import"
            }, {
                width: 400
            }).render(true);
        });
        this.close();
        return await dialog;
    }
}

});





parcelRequire("hAn2A");

//# sourceMappingURL=bundle.js.map
