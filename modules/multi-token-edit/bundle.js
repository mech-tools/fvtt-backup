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

var parcelRequire = $parcel$global["parcelRequire94c2"];
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

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}
parcelRequire.register("kn5Qf", function(module, exports) {
module.exports = import("./jquery-ui.3eaa8b4e.js?" + Date.now()).then(()=>parcelRequire("6NmQU"));

});


class $59fc6fe4c07de9fd$var$PlaylistSoundDataAdapter {
    static formToData(obj, formData) {
        if ("lvolume" in formData) {
            formData["volume"] = AudioHelper.inputToVolume(formData["lvolume"]);
            delete formData["lvolume"];
        }
    }
    static dataToForm(note, data) {
        data["lvolume"] = (note.document ?? note).volume;
    }
    static updateToForm(update) {
        if ("volume" in update) {
            update["lvolume"] = AudioHelper.volumeToInput(update["volume"]);
            delete update.volume;
        }
    }
}
class $59fc6fe4c07de9fd$var$TileDataAdapter {
    static formToData(tile, formData) {
        if ("massedit.scale" in formData) {
            formData.width = (tile.document ?? tile).width * formData["massedit.scale"];
            formData.height = (tile.document ?? tile).height * formData["massedit.scale"];
            delete formData["massedit.scale"];
        }
        if ("massedit.texture.scale" in formData) {
            formData["texture.scaleX"] = formData["massedit.texture.scale"];
            formData["texture.scaleY"] = formData["massedit.texture.scale"];
            delete formData["massedit.texture.scale"];
        }
    }
}
class $59fc6fe4c07de9fd$var$NoteDataAdapter {
    static formToData(obj, formData) {
        if ("icon.selected" in formData || "icon.custom" in formData) {
            formData["texture.src"] = formData["icon.selected"] || formData["icon.custom"];
            delete formData["icon.selected"];
            delete formData["icon.custom"];
        }
    }
    static dataToForm(note, data) {
        const doc = note.document ?? note;
        if (doc.texture?.src != null) {
            data["icon.selected"] = doc.texture.src;
            data["icon.custom"] = doc.texture.src;
        }
    }
}
class $59fc6fe4c07de9fd$export$7fe60b94e2075390 {
    static updateToForm(update) {
        if ("texture.scaleX" in update) {
            update.mirrorX = update["texture.scaleX"] < 0;
            update.scale = Math.abs(update["texture.scaleX"]);
        }
        if ("texture.scaleY" in update) {
            update.mirrorY = update["texture.scaleY"] < 0;
            update.scale = Math.abs(update["texture.scaleY"]);
        }
    }
    static dataToForm(token, data) {
        const doc = token.document ?? token;
        if (doc.texture?.scaleX != null) data.scale = Math.abs(doc.texture.scaleX);
        if (doc.texture?.scaleX != null) data.mirrorX = doc.texture.scaleX < 0;
        if (doc.texture?.scaleY != null) data.mirrorY = doc.texture.scaleY < 0;
    }
    static formToData(token, formData) {
        const doc = token.document ?? token;
        // Scale/mirroring
        if ("scale" in formData || "mirrorX" in formData || "mirrorY" in formData) {
            if (!("scale" in formData)) formData.scale = Math.abs(doc.texture.scaleX);
            if (!("mirrorX" in formData)) formData.mirrorX = doc.texture.scaleX < 0;
            if (!("mirrorY" in formData)) formData.mirrorY = doc.texture.scaleY < 0;
            formData["texture.scaleX"] = formData.scale * (formData.mirrorX ? -1 : 1);
            formData["texture.scaleY"] = formData.scale * (formData.mirrorY ? -1 : 1);
            [
                "scale",
                "mirrorX",
                "mirrorY"
            ].forEach((k)=>delete formData[k]);
        }
        // Detection modes
        $59fc6fe4c07de9fd$export$7fe60b94e2075390.correctDetectionModes(doc, formData);
    }
    static correctDetectionModeOrder(data, randomizeFields) {
        const indexMap = {};
        let i = 0;
        for (const [k, v] of Object.entries(data))if (k.startsWith("detectionModes")) {
            const comps = k.split(".");
            if (!(comps[1] in indexMap)) {
                indexMap[comps[1]] = i;
                i++;
            }
            const newKey = `detectionModes.${indexMap[comps[1]]}.${comps[2]}`;
            delete data[k];
            data[newKey] = v;
            if (randomizeFields && k in randomizeFields) {
                const rVal = randomizeFields[k];
                delete randomizeFields[k];
                randomizeFields[newKey] = rVal;
            }
        }
    }
    static detectionModeMatch(searchModes, tokenModes) {
        for (const m1 of searchModes){
            if (!("id" in m1)) continue; // Ignore mode search attempts without ids as they can't be matched up
            for (const m2 of tokenModes)if (m1.id === m2.id) {
                if ("enabled" in m1 && m1.enabled !== m2.enabled) return false;
                if ("range" in m1 && m1.range !== m2.range) return false;
                break;
            }
        }
        return true;
    }
    static correctDetectionModes(token, data) {
        const detectionModes = [];
        const indexMap = {};
        let i = 0;
        for (const [k, v] of Object.entries(data))if (k.startsWith("detectionModes")) {
            const comps = k.split(".");
            if (!(comps[1] in indexMap)) {
                indexMap[comps[1]] = i;
                detectionModes.push({});
                i++;
            }
            const dm = detectionModes[indexMap[comps[1]]];
            dm[comps[2]] = v;
            // data[`${comps[0]}.${indexMap[comps[1]]}.${comps[2]}`] = v;
            delete data[k];
        }
        if (!detectionModes.length) return;
        // Merge current detectionModes assigned to the token and the new ones being added
        const mergedModes = foundry.utils.deepClone(token.detectionModes).filter((d)=>d.id);
        for (const dm of detectionModes){
            if (dm.id == null) continue;
            let found = false;
            for (const tdm of mergedModes)if (tdm.id === dm.id) {
                foundry.utils.mergeObject(tdm, dm);
                found = true;
                break;
            }
            if (!found) mergedModes.push(foundry.utils.mergeObject({
                id: "",
                range: 0,
                enabled: true
            }, dm));
        }
        data.detectionModes = mergedModes;
    }
    static modifyPresetData(app, data) {
        const pModes = Object.values(foundry.utils.expandObject(data)?.detectionModes || {});
        if (!pModes.length) return;
        const modes = Object.values(foundry.utils.expandObject(app._getSubmitData())?.detectionModes || {});
        const dataClone = foundry.utils.deepClone(data);
        const randomize = data["mass-edit-randomize"] ?? {};
        const addSubtract = data["mass-edit-addSubtract"] ?? {};
        const modCustomFields = function(fields, key, i, k, data) {
            if (`detectionModes.${i}.${k}` in fields) {
                delete fields[`detectionModes.${i}.${k}`];
                fields[`detectionModes.${j}.${k}`] = data[key][`detectionModes.${i}.${k}`];
            }
        };
        const startingModeLength = modes.length;
        for(let i = 0; i < pModes.length; i++){
            if (!("id" in pModes[i])) continue;
            let found = false;
            for(let j1 = 0; j1 < startingModeLength; j1++)if (pModes[i].id === modes[j1].id) {
                found = true;
                Object.keys(pModes[i]).forEach((k)=>{
                    delete data[`detectionModes.${i}.${k}`];
                    data[`detectionModes.${j1}.${k}`] = dataClone[`detectionModes.${i}.${k}`];
                    modCustomFields(randomize, "mass-edit-randomize", i, k, dataClone);
                    modCustomFields(addSubtract, "mass-edit-addSubtract", i, k, dataClone);
                });
            }
            if (!found) {
                modes.push({
                    id: "",
                    range: 0,
                    enabled: true
                });
                Object.keys(pModes[i]).forEach((k)=>{
                    delete data[`detectionModes.${i}.${k}`];
                    data[`detectionModes.${modes.length - 1}.${k}`] = dataClone[`detectionModes.${i}.${k}`];
                    if (`detectionModes.${i}.${k}` in randomize) {
                        delete randomize[`detectionModes.${i}.${k}`];
                        randomize[`detectionModes.${modes.length - 1}.${k}`] = dataClone["mass-edit-randomize"][`detectionModes.${i}.${k}`];
                    }
                    if (`detectionModes.${i}.${k}` in addSubtract) {
                        delete addSubtract[`detectionModes.${i}.${k}`];
                        addSubtract[`detectionModes.${modes.length - 1}.${k}`] = dataClone["mass-edit-addSubtract"][`detectionModes.${i}.${k}`];
                    }
                });
            }
        }
        if (startingModeLength !== modes.length) {
            app._previewChanges({
                detectionModes: modes
            });
            app.render();
            return true;
        }
    }
}
const $59fc6fe4c07de9fd$var$ADAPTERS = {
    Token: $59fc6fe4c07de9fd$export$7fe60b94e2075390,
    PlaylistSound: $59fc6fe4c07de9fd$var$PlaylistSoundDataAdapter,
    Note: $59fc6fe4c07de9fd$var$NoteDataAdapter,
    Tile: $59fc6fe4c07de9fd$var$TileDataAdapter
};
class $59fc6fe4c07de9fd$export$d5bbc12fef4eed7f {
    static formToData(docName, obj, formData) {
        const adapter = $59fc6fe4c07de9fd$var$ADAPTERS[docName];
        if (adapter && adapter.formToData) adapter.formToData(obj, formData);
    }
    static dataToForm(docName, obj, formData) {
        const adapter = $59fc6fe4c07de9fd$var$ADAPTERS[docName];
        if (adapter && adapter.dataToForm) adapter.dataToForm(obj, formData);
    }
    static updateToForm(docName, update) {
        const adapter = $59fc6fe4c07de9fd$var$ADAPTERS[docName];
        if (adapter && adapter.updateToForm) adapter.updateToForm(update);
    }
}




function $2d0c7cad90c7ba3c$export$6171357ef4337306(allData, documentName, customControls, pins = true) {
    const nav = {
        dataGroup: "main",
        items: [],
        tabs: []
    };
    const tabSelectors = [
        {
            navSelector: '.tabs[data-group="main"]',
            contentSelector: "form",
            initial: "me-pinned"
        }
    ];
    // Limit the form to just the keys marked as editable
    let editableKeys;
    // if (documentName === 'Actor') {
    //   editableKeys = ['name', 'img', 'system', 'data', 'folder', 'flags'];
    // }
    let object = {};
    if (!editableKeys) object = allData;
    else {
        for (const k of editableKeys)if (k in allData) object[k] = allData[k];
    }
    const pinned = documentName ? game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "pinnedFields")[documentName] || {} : {};
    $2d0c7cad90c7ba3c$var$_constructControls(nav, object, tabSelectors, "", pinned, customControls, pins);
    const pinned_groups = [];
    const flatObject = foundry.utils.flattenObject(object);
    for (const [k, v] of Object.entries(pinned)){
        const value = k in flatObject ? flatObject[k] : v.value;
        let control = $2d0c7cad90c7ba3c$var$genControl(foundry.utils.getType(value), v.label, value, k, {}, true, customControls, pins);
        control.pinned = true;
        pinned_groups.push(control);
    }
    if (pinned_groups.length) {
        // No tabs constructed means this is not a nested object, however since we have pinned fields
        // we need to separate main object fields from the pinned ones
        if (!nav.items.length) {
            nav.items.push({
                dataTab: "main-me-main",
                label: "Main"
            });
            nav.tabs.push({
                dataTab: "main-me-main",
                groups: nav.groups
            });
            delete nav.groups;
        }
        nav.items.unshift({
            dataTab: "me-pinned",
            dataTab: "me-pinned",
            label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("generic-form.pinned")
        });
        nav.tabs.unshift({
            dataTab: "me-pinned",
            groups: pinned_groups
        });
    }
    return [
        nav,
        tabSelectors
    ];
}
function $2d0c7cad90c7ba3c$var$_constructControls(nav, data, tabSelectors, name, pinned, customControls, pins) {
    const groups = [];
    let containsNav = false;
    for (const [k, v] of Object.entries(data)){
        const name2 = name ? name + "." + k : k;
        if (v !== null) {
            let t = foundry.utils.getType(v);
            let control;
            if (t === "Object") {
                if ($2d0c7cad90c7ba3c$var$_hasNonNullKeys(v)) {
                    nav.items.push({
                        dataTab: name2,
                        label: $2d0c7cad90c7ba3c$var$_genLabel(k)
                    });
                    const newNav = {
                        dataGroup: name2,
                        items: [],
                        tabs: []
                    };
                    nav.tabs.push({
                        dataTab: name2,
                        nav: newNav
                    });
                    tabSelectors.push({
                        navSelector: `.tabs[data-group="${name2}"]`,
                        contentSelector: `.tab[data-tab="${name2}"]`,
                        initial: k + "-me-main"
                    });
                    $2d0c7cad90c7ba3c$var$_constructControls(newNav, v, tabSelectors, name2, pinned, customControls, pins);
                    containsNav = true;
                }
            } else control = $2d0c7cad90c7ba3c$var$genControl(t, $2d0c7cad90c7ba3c$var$_genLabel(k), v, name2, pinned, false, customControls, pins);
            if (control) groups.push(control);
        }
    }
    if (groups.length) {
        if (containsNav) {
            nav.items.unshift({
                dataTab: nav.dataGroup + "-me-main",
                label: "Main"
            });
            nav.tabs.unshift({
                dataTab: nav.dataGroup + "-me-main",
                groups: groups
            });
        } else nav.groups = groups;
    }
}
function $2d0c7cad90c7ba3c$var$_hasNonNullKeys(obj) {
    if (foundry.utils.isEmpty(obj)) return false;
    for (const [k, v] of Object.entries(obj)){
        if (foundry.utils.getType(v) === "Object") {
            if ($2d0c7cad90c7ba3c$var$_hasNonNullKeys(v)) return true;
        } else if (v != null) return true;
    }
    return false;
}
function $2d0c7cad90c7ba3c$var$_genLabel(key) {
    if (key.length <= 3) return key.toUpperCase();
    return key.charAt(0).toUpperCase() + key.slice(1);
}
const $2d0c7cad90c7ba3c$var$IMAGE_FIELDS = [
    "img",
    "image",
    "src",
    "texture"
];
const $2d0c7cad90c7ba3c$var$COLOR_FIELDS = [
    "tint"
];
function $2d0c7cad90c7ba3c$export$3bc23beea9300df4(name) {
    name = name.split(".").pop();
    return $2d0c7cad90c7ba3c$var$COLOR_FIELDS.includes(name) || name.toLowerCase().includes("color");
}
function $2d0c7cad90c7ba3c$var$genControl(type, label, value, name, pinned, editableLabel = false, customControls = {}, pins) {
    const allowedArrayElTypes = [
        "number",
        "string"
    ];
    let control = {
        label: label,
        value: value,
        name: name,
        editableLabel: editableLabel,
        pins: pins
    };
    if (getProperty(customControls, name)) control = foundry.utils.mergeObject(control, getProperty(customControls, name));
    else if (type === "number") {
        control.number = true;
        const varName = name.split(".").pop();
        if ($2d0c7cad90c7ba3c$export$3bc23beea9300df4(varName)) {
            control.colorPickerNumber = true;
            try {
                control.colorValue = new Color(value).toString();
            } catch (e) {}
        }
    } else if (type === "string") {
        control.text = true;
        const varName = name.split(".").pop();
        if ($2d0c7cad90c7ba3c$var$IMAGE_FIELDS.includes(varName) || varName.toLowerCase().includes("image") || varName.toLowerCase().includes("path")) control.filePicker = true;
        else if ($2d0c7cad90c7ba3c$export$3bc23beea9300df4(varName)) control.colorPicker = true;
    } else if (type === "boolean") control.boolean = true;
    else if (type === "Array" && value.every((el)=>allowedArrayElTypes.includes(foundry.utils.getType(el)))) {
        control.value = value.join(", ");
        control.array = true;
    } else if (type === "Array") {
        control.jsonArray = true;
        control.value = JSON.stringify(value, null, 2);
    } else {
        control.disabled = true;
        control.text = true;
        control.editableLabel = false;
    }
    if (control && name in pinned) {
        control.pinned = true;
        control.disabled = true;
        control.name = null;
    }
    return control;
}



function $58452d6efd8a00ed$export$3e5fd86f5f868a08(app) {
    const docName = (0, $32e43d7a62aba58c$export$c29f08336649747)(app.meObjects[0]);
    // Only the following docs necessitate hidden field
    if (![
        "AmbientLight",
        "AmbientSound"
    ].includes(docName)) return;
    const form = $(app.form);
    const isInjected = form.find('input[name="hidden"]');
    if (isInjected.length) return;
    const hidden = app.object.hidden;
    const newHtml = `
  <div class="form-group">
    <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)(`Hidden`, false)}</label>
    <div class="form-fields">
        <input type="checkbox" name="hidden" ${hidden ? "checked" : ""}>
    </div>
  </div>
`;
    const tabs = form.find("div.tab");
    if (tabs.length) tabs.first().append(newHtml);
    else form.find(".form-group").last().after(newHtml);
    app.setPosition({
        height: "auto"
    });
}
async function $58452d6efd8a00ed$export$6c8d0b561bdc4d96(app) {
    var resolve, item, event, event1, html, ev;
    // Disable for now, until duplicate value fix is found
    return;
}


/*global app*/ function $526640c45cded75e$var$isVowel(c) {
    return c === "a" || c === "e" || c === "i" || c === "o" || c === "u";
}
const $526640c45cded75e$var$names = {
    vileAndCrude: {
        small: [
            "ach",
            "adz",
            "ak",
            "ark",
            "az",
            "balg",
            "bilg",
            "blid",
            "blig",
            "blok",
            "blot",
            "bolg",
            "bot",
            "bug",
            "burk",
            "dokh",
            "drik",
            "driz",
            "duf",
            "flug",
            "ga",
            "gad",
            "gag",
            "gah",
            "gak",
            "gar",
            "gat",
            "gaz",
            "ghag",
            "ghak",
            "git",
            "glag",
            "glak",
            "glat",
            "glig",
            "gliz",
            "glok",
            "gnat",
            "gog",
            "grak",
            "grat",
            "guk",
            "hig",
            "irk",
            "kak",
            "khad",
            "krig",
            "lag",
            "lak",
            "lig",
            "likk",
            "loz",
            "luk",
            "mak",
            "maz",
            "miz",
            "mub",
            "nad",
            "nag",
            "naz",
            "nig",
            "nikk",
            "nogg",
            "nok",
            "nukk",
            "rag",
            "rak",
            "rat",
            "rok",
            "shrig",
            "shuk",
            "skrag",
            "skug",
            "slai",
            "slig",
            "slog",
            "sna",
            "snag",
            "snark",
            "snat",
            "snig",
            "snik",
            "snit",
            "sog",
            "spik",
            "stogg",
            "tog",
            "urf",
            "vark",
            "yad",
            "yagg",
            "yak",
            "yark",
            "yarp",
            "yig",
            "yip",
            "zat",
            "zib",
            "zit",
            "ziz"
        ],
        medium: [
            "ag",
            "aug",
            "bad",
            "bag",
            "bakh",
            "bash",
            "baz",
            "blag",
            "brag",
            "brog",
            "bruz",
            "dag",
            "dakk",
            "darg",
            "dob",
            "dog",
            "drab",
            "dug",
            "dur",
            "gash",
            "ghaz",
            "glakh",
            "glaz",
            "glob",
            "glol",
            "gluf",
            "glur",
            "gnarl",
            "gnash",
            "gnub",
            "gob",
            "gokh",
            "gol",
            "golk",
            "gor",
            "grakh",
            "grash",
            "grath",
            "graz",
            "grot",
            "grub",
            "grud",
            "gud",
            "gut",
            "hag",
            "hakk",
            "hrat",
            "hrog",
            "hrug",
            "khag",
            "khar",
            "krag",
            "krud",
            "lakh",
            "lash",
            "lob",
            "lub",
            "lud",
            "luf",
            "luk",
            "molk",
            "muk",
            "muz",
            "nar",
            "ogg",
            "olg",
            "rag",
            "rash",
            "rogg",
            "rorg",
            "rot",
            "rud",
            "ruft",
            "rug",
            "rut",
            "shad",
            "shag",
            "shak",
            "shaz",
            "shog",
            "skar",
            "skulg",
            "slur",
            "snar",
            "snorl",
            "snub",
            "snurr",
            "sod",
            "stulg",
            "thak",
            "trog",
            "ug",
            "umsh",
            "ung",
            "uth",
            "yakh",
            "yash",
            "yob",
            "zahk",
            "zog"
        ],
        large: [
            "argh",
            "barsh",
            "bog",
            "burz",
            "dof",
            "drok",
            "drub",
            "drug",
            "dub",
            "dug",
            "dul",
            "dursh",
            "dush",
            "duz",
            "faug",
            "fug",
            "ghakh",
            "ghar",
            "ghash",
            "ghol",
            "ghor",
            "ghukk",
            "ghul",
            "glub",
            "glud",
            "glug",
            "gluz",
            "gom",
            "grad",
            "grash",
            "grob",
            "grogg",
            "grok",
            "grol",
            "gru",
            "gruf",
            "gruk",
            "grul",
            "grum",
            "grumf",
            "grut",
            "gruz",
            "guhl",
            "gulv",
            "hai",
            "hrung",
            "hur",
            "hurg",
            "kai",
            "klob",
            "krod",
            "kug",
            "kulk",
            "kur",
            "lorg",
            "lug",
            "lukh",
            "lum",
            "lurz",
            "lush",
            "luz",
            "makh",
            "maug",
            "molg",
            "mud",
            "mug",
            "mul",
            "murk",
            "muzd",
            "nakh",
            "narg",
            "obb",
            "rolb",
            "rukh",
            "ruz",
            "sharg",
            "shruf",
            "shud",
            "shug",
            "shur",
            "shuz",
            "slub",
            "slud",
            "slug",
            "snad",
            "snog",
            "thrag",
            "thulk",
            "thurk",
            "trug",
            "ulg",
            "ur",
            "urd",
            "urgh",
            "urkh",
            "uz",
            "yug",
            "yur",
            "zud",
            "zug"
        ]
    },
    primitive: {
        names: [
            "ahg",
            "baod",
            "beegh",
            "bohr",
            "bul",
            "buli",
            "burh",
            "buri",
            "chah",
            "dhak",
            "digri",
            "dum",
            "eghi",
            "ehm",
            "faogh",
            "feehm",
            "ghad",
            "ghah",
            "gham",
            "ghan",
            "ghat",
            "ghaw",
            "ghee",
            "ghish",
            "ghug",
            "giree",
            "gonkh",
            "goun",
            "goush",
            "guh",
            "gunri",
            "hah",
            "hani",
            "haogh",
            "hatoo",
            "heghi",
            "heh",
            "hoo",
            "houm",
            "hree",
            "ig",
            "kham",
            "khan",
            "khaz",
            "khee",
            "khem",
            "khuri",
            "logh",
            "lugh",
            "maoh",
            "meh",
            "mogh",
            "mouh",
            "mugh",
            "naoh",
            "naroo",
            "nham",
            "nuh",
            "ob",
            "oli",
            "orf",
            "ough",
            "ouh",
            "peh",
            "pogh",
            "pugh",
            "puh",
            "quagi",
            "rahoo",
            "rhoo",
            "rifoo",
            "ronkh",
            "rouk",
            "saom",
            "saori",
            "shehi",
            "shlo",
            "shom",
            "shour",
            "shul",
            "snaoh",
            "suhi",
            "suth",
            "teb",
            "thom",
            "toudh",
            "tregh",
            "tuhli",
            "ub",
            "urush",
            "ush",
            "vuh",
            "wah",
            "wuh",
            "yaum",
            "yauth",
            "yeeh",
            "yih",
            "yuh",
            "zham"
        ],
        suffixes: [
            "doh",
            "rei",
            "mih",
            "fah",
            "soh",
            "lah",
            "tih",
            "daoh"
        ]
    },
    doughty: {
        syllabes: [
            "bal",
            "durn",
            "na",
            "bord",
            "from",
            "nor",
            "born",
            "fror",
            "nord",
            "brim",
            "fuld",
            "orm",
            "brod",
            "fund",
            "skand",
            "brokk",
            "gim",
            "skond",
            "brom",
            "glo",
            "storn",
            "bru",
            "gond",
            "strom",
            "bur",
            "gord",
            "stur",
            "burl",
            "gorm",
            "sturl",
            "da",
            "grad",
            "sund",
            "dal",
            "grim",
            "thor",
            "dolg",
            "grod",
            "thorn",
            "dor",
            "grom",
            "thra",
            "dorm",
            "guld",
            "thro",
            "dral",
            "gund",
            "throl",
            "drim",
            "gur",
            "thror",
            "drom",
            "hord",
            "thru",
            "dur",
            "horn",
            "thrur",
            "durm",
            "hra",
            "thund"
        ],
        maleSuffixes: [
            "bor",
            "din",
            "in",
            "in",
            "in",
            "ir",
            "li",
            "li",
            "lin",
            "nir",
            "or",
            "ri",
            "ri",
            "rin",
            "rok",
            "ror",
            "rur",
            "vi",
            "vir",
            "vor"
        ],
        femaleSuffixes: [
            "bis",
            "da",
            "dis",
            "dis",
            "dis",
            "dis",
            "ga",
            "hild",
            "is",
            "is",
            "lif",
            "lind",
            "lis",
            "na",
            "nis",
            "ris",
            "rith",
            "run",
            "run",
            "vis"
        ]
    },
    homely: {
        syllabes: [
            "ad",
            "blanc",
            "falc",
            "mil",
            "adel",
            "boff",
            "ferd",
            "mung",
            "adr",
            "bomb",
            "frob",
            "od",
            "ail",
            "bram",
            "fulb",
            "oth",
            "alb",
            "bung",
            "gam",
            "sab",
            "alm",
            "droc",
            "hald",
            "sam",
            "amb",
            "drog",
            "ham",
            "seg",
            "band",
            "durl",
            "hasc",
            "serl",
            "bard",
            "emm",
            "hod",
            "tob",
            "ben",
            "erd",
            "hug",
            "wan",
            "biff",
            "ern",
            "iv",
            "wig",
            "bild",
            "ever",
            "mark",
            "wyd"
        ],
        maleSuffixes: [
            "ald",
            "ard",
            "ert",
            "fast",
            "o",
            "o",
            "o",
            "o",
            "o",
            "old",
            "win",
            "wise"
        ],
        femaleSuffixes: [
            "a",
            "a",
            "a",
            "a",
            "a",
            "ia",
            "ia",
            "ice",
            "ily",
            "ina",
            "wina",
            "wisa"
        ]
    },
    familyName: {
        english: [
            "Adshead",
            "Akers",
            "Antell",
            "Applegarth",
            "Babb",
            "Babbs",
            "Baffin",
            "Bagg",
            "Baggett",
            "Bagnall",
            "Baldey",
            "Bamber",
            "Bark",
            "Barling",
            "Barnstable",
            "Barraclough",
            "Bastable",
            "Bastin",
            "Bather",
            "Batkin",
            "Batt",
            "Bazley",
            "Bebb",
            "Beddall",
            "Beeby",
            "Beecroft",
            "Beedell",
            "Bellis",
            "Belsey",
            "Berridge",
            "Besley",
            "Bibby",
            "Bickle",
            "Biddle",
            "Biddulph",
            "Bigg",
            "Binks",
            "Binns",
            "Bisp",
            "Biss",
            "Blenk",
            "Blenkin",
            "Boam",
            "Bobo",
            "Boddington",
            "Boffey",
            "Bonger",
            "Bonney",
            "Bonser",
            "Borrett",
            "Bossey",
            "Botterill",
            "Botting",
            "Bottom",
            "Bottomley",
            "Botwright",
            "Bowser",
            "Bracher",
            "Brasnett",
            "Brayley",
            "Breary",
            "Brickwood",
            "Brindley",
            "Broadfoot",
            "Broadribb",
            "Brocksopp",
            "Broster",
            "Buckmaster",
            "Budge",
            "Buffard",
            "Bugg",
            "Buggy",
            "Bulger",
            "Bulman",
            "Bunce",
            "Bunt",
            "Burrow",
            "Bushby",
            "Buss",
            "Cade",
            "Cadwaller",
            "Cantrill",
            "Cardno",
            "Catlow",
            "Cattermole",
            "Chaffe",
            "Chaffer",
            "Chard",
            "Chettle",
            "Chilcott",
            "Chitty",
            "Chivers",
            "Chubb",
            "Chugg",
            "Clewes",
            "Coaker",
            "Cobden",
            "Cobley",
            "Coggan",
            "Coggins",
            "Collop",
            "Coney",
            "Coote",
            "Copp",
            "Coppard",
            "Cornock",
            "Cossey",
            "Cottle",
            "Coultip",
            "Crang",
            "Crimp",
            "Croom",
            "Crowles",
            "Cubitt",
            "Cullimore",
            "Cuss",
            "Custance",
            "Cuthbert",
            "Dabbin",
            "Dabbing",
            "Dabbs",
            "Dagg",
            "Dainty",
            "Deeley",
            "Derrick",
            "Dibb",
            "Dibble",
            "Diccox",
            "Diggins",
            "Diggle",
            "Diggles",
            "Digweed",
            "Dimmock",
            "Dinsdale",
            "Dipple",
            "Dobbie",
            "Dobby",
            "Doggett",
            "Dorey",
            "Drabble",
            "Draycott",
            "Dring",
            "Drudge",
            "Duffield",
            "Dufty",
            "Duggan",
            "Duggleby",
            "Dumbrell",
            "Dunkley",
            "Eatwell",
            "Eggins",
            "Entwistle",
            "Erlam",
            "Etchells",
            "Fairclough",
            "Felgate",
            "Fensome",
            "Fenton",
            "Fidge",
            "Fidoe",
            "Figg",
            "Filer",
            "Fincham",
            "Firkins",
            "Flann",
            "Flanner",
            "Flippance",
            "Flook",
            "Flunder",
            "Followes",
            "Fooks",
            "Fremlin",
            "Frisby",
            "Frogley",
            "Frohock",
            "Froome",
            "Frow",
            "Fuggle",
            "Furse",
            "Furze",
            "Gabb",
            "Gaffey",
            "Gagg",
            "Gander",
            "Garbutt",
            "Garlick",
            "Garn",
            "Gazard",
            "Gedge",
            "Giblett",
            "Giddy",
            "Gigg",
            "Gilliat",
            "Gimble",
            "Gimson",
            "Ginger",
            "Gipps",
            "Girdler",
            "Gissing",
            "Gleave",
            "Goggin",
            "Gollogly",
            "Gomm",
            "Goodier",
            "Gook",
            "Gorringe",
            "Gorwyn",
            "Gosden",
            "Gribble",
            "Grigg",
            "Griggs",
            "Grill",
            "Grimble",
            "Grimes",
            "Grimshaw",
            "Grist",
            "Grubb",
            "Guckeen",
            "Guckian",
            "Guild",
            "Gull",
            "Gully",
            "Gumbold",
            "Gummer",
            "Gummidge",
            "Gurden",
            "Haffenden",
            "Hales",
            "Halse",
            "Harpham",
            "Hartle",
            "Hatch",
            "Hayhurst",
            "Hearle",
            "Henley",
            "Henwood",
            "Heppell",
            "Herrick",
            "Herring",
            "Hesketh",
            "Hext",
            "Hicken",
            "Hickmott",
            "Higman",
            "Hinchcliffe",
            "Hindmarsh",
            "Hobley",
            "Hoddy",
            "Hogben",
            "Holdom",
            "Hollick",
            "Holtom",
            "Honeysett",
            "Hook",
            "Hopley",
            "Hopps",
            "Horrocks",
            "Horsfall",
            "Horwood",
            "Hotten",
            "Housely",
            "Howie",
            "Huff",
            "Huffam",
            "Hutton",
            "Huxtable",
            "Icke",
            "Idden",
            "Inskip",
            "Iveson",
            "Izzard",
            "Jaggs",
            "Jellis",
            "Jepson",
            "Jesty",
            "Keel",
            "Keetley",
            "Kerkin",
            "Kerslake",
            "Kettley",
            "Killick",
            "Kinch",
            "Knaggs",
            "Kneebone",
            "Knopp",
            "Knott",
            "Lagden",
            "Laslett",
            "Laverick",
            "Leaper",
            "Leggett",
            "Liddane",
            "Liddy",
            "Liggan",
            "Lithgoe",
            "Lobb",
            "Lodder",
            "Looby",
            "Loody",
            "Lubbock",
            "Luff",
            "Lugard",
            "Lugg",
            "Lumsden",
            "Lyle",
            "Mabb",
            "Mabbitt",
            "Mabbot",
            "Mabbs",
            "Mabbutt",
            "Maffey",
            "Mallam",
            "Mangold",
            "Mapp",
            "Mappin",
            "Marfell",
            "Matthams",
            "Maunder",
            "Maxted",
            "Mayo",
            "Meech",
            "Meeson",
            "Meggison",
            "Meggitt",
            "Meggs",
            "Mellings",
            "Merrikin",
            "Metherell",
            "Mew",
            "Miggles",
            "Miggs",
            "Milsom",
            "Milson",
            "Minchin",
            "Minns",
            "Mobbs",
            "Moberly",
            "Mockler",
            "Mogford",
            "Mogg",
            "Moggs",
            "Morkam",
            "Morphett",
            "Mossman",
            "Mossop",
            "Mottershead",
            "Moulds",
            "Muddle",
            "Muddock",
            "Mudge",
            "Mullock",
            "Murch",
            "Murfin",
            "Murfitt",
            "Musson",
            "Mustill",
            "Mutter",
            "Mutton",
            "Nance",
            "Napper",
            "Neep",
            "Negus",
            "Netherway",
            "Newitt",
            "Niblett",
            "Nickless",
            "Noad",
            "Nobbs",
            "Noblet",
            "Nosworthy",
            "Nottage",
            "Nutt",
            "Offen",
            "Oram",
            "Orcutt",
            "Ord",
            "Orpe",
            "Paddock",
            "Paddon",
            "Pannell",
            "Parham",
            "Pavey",
            "Peay",
            "Peever",
            "Pegg",
            "Pegge",
            "Pegler",
            "Pegrum",
            "Pelly",
            "Pelter",
            "Pendle",
            "Petch",
            "Petcher",
            "Petchey",
            "Pettipher",
            "Philp",
            "Phippen",
            "Phippin",
            "Pickersgill",
            "Pickley",
            "Pickwell",
            "Pidduck",
            "Pigg",
            "Pilkington",
            "Pimblett",
            "Pingree",
            "Pinch",
            "Pinn",
            "Pither",
            "Pochin",
            "Poggs",
            "Polkinghorne",
            "Pomeroy",
            "Pomfret",
            "Postlethwaite",
            "Potticary",
            "Poxon",
            "Pring",
            "Pringle",
            "Prisk",
            "Proudfoot",
            "Puddicombe",
            "Pudding",
            "Puddy",
            "Pugsley",
            "Purslove",
            "Pym",
            "Quaife",
            "Quain",
            "Quenby",
            "Quibell",
            "Quigg",
            "Raddle",
            "Ranby",
            "Rapkins",
            "Ratter",
            "Reakes",
            "Reeson",
            "Riddle",
            "Rix",
            "Roddis",
            "Rosser",
            "Ruddle",
            "Ruffle",
            "Rugg",
            "Rumming",
            "Rump",
            "Sadd",
            "Samways",
            "Sankey",
            "Scantlebury",
            "Scoones",
            "Scouse",
            "Scragg",
            "Scrimgeour",
            "Scroggs",
            "Scruby",
            "Scutt",
            "Sefton",
            "Selth",
            "Semmens",
            "Seward",
            "Shalloo",
            "Sharples",
            "Siggers",
            "Sirett",
            "Skeels",
            "Skerrett",
            "Slee",
            "Sluggett",
            "Smedley",
            "Snoddy",
            "Snuggs",
            "Sparrow",
            "Sparrowhawke",
            "Spink",
            "Spinks",
            "Spriggs",
            "Springett",
            "Sproat",
            "Sprunt",
            "Spurle",
            "Spurrett",
            "Spurrier",
            "Squance",
            "Squarey",
            "Squibb",
            "Squirrel",
            "Staines",
            "Steggal",
            "Stelfox",
            "Stirk",
            "Stith",
            "Strag",
            "Straw",
            "Strutt",
            "Stubbins",
            "Stuppies",
            "Suggett",
            "Swaffer",
            "Swaffield",
            "Swarbrick",
            "Symes",
            "Tabor",
            "Tagg",
            "Tapping",
            "Tarr",
            "Tassell",
            "Teale",
            "Thew",
            "Thick",
            "Thornber",
            "Thwaites",
            "Tibbins",
            "Tibbits",
            "Tibbles",
            "Tibbotts",
            "Tink",
            "Tippell",
            "Tipping",
            "Tippins",
            "Tippling",
            "Tipton",
            "Tisser",
            "Tittmuss",
            "Tobitt",
            "Tonks",
            "Topping",
            "Towse",
            "Toye",
            "Tozer",
            "Trafford",
            "Treasure",
            "Tremlett",
            "Trett",
            "Trible",
            "Tricker",
            "Tripe",
            "Trippe",
            "Tripper",
            "Trist",
            "Troake",
            "Trotter",
            "Trouncer",
            "Trumble",
            "Tudge",
            "Tuffin",
            "Tufley",
            "Tulk",
            "Tully",
            "Tumman",
            "Tunks",
            "Tunnah",
            "Tunnicliffe",
            "Turnock",
            "Tween",
            "Tyrer",
            "Unsworth",
            "Uttley",
            "Varney",
            "Vooght",
            "Wackrill",
            "Waddilove",
            "Waddilow",
            "Walthew",
            "Waltho",
            "Walwin",
            "Wanless",
            "Wann",
            "Waple",
            "Waring",
            "Warrilow",
            "Welburn",
            "Wenden",
            "Werrett",
            "Wescott",
            "Whinnett",
            "Whiskard",
            "Whisker",
            "Whitefoot",
            "Whitlow",
            "Wibberley",
            "Widdicombe",
            "Widdows",
            "Widdup",
            "Wigg",
            "Wigley",
            "Wilberforce",
            "Wilmer",
            "Wintle",
            "Witherden",
            "Witney",
            "Witter",
            "Wolnoth",
            "Woodhead",
            "Wookey",
            "Woolland",
            "Woombill",
            "Worrel",
            "Worsley",
            "Wortley",
            "Wragg",
            "Wrixon",
            "Yeandle",
            "Yeend",
            "Yemm",
            "Yould"
        ],
        scottish: [
            "Aiken",
            "Aitken",
            "Baikie",
            "Baillie",
            "Bainbridge",
            "Baird",
            "Bairnsfeather",
            "Balios",
            "Balnaves",
            "Barbour",
            "Barclay",
            "Barrie",
            "Beattie",
            "Beilby",
            "Bell",
            "Bellenden",
            "Berwick",
            "Blackie",
            "Blackwood",
            "Blaikie",
            "Blair",
            "Bogue",
            "Boyce",
            "Braid",
            "Brechin",
            "Brisbane",
            "Brough",
            "Brougham",
            "Brown",
            "Brownlee",
            "Brymner",
            "Cairns",
            "Calderwood",
            "Candlish",
            "Cardus",
            "Cargill",
            "Caven",
            "Christison",
            "Clyde",
            "Cochran",
            "Cochrane",
            "Cockburn",
            "Colomb",
            "Crockett",
            "Cronin",
            "Cruden",
            "Cunningham",
            "Cushny",
            "Dalziel",
            "Deems",
            "Dempster",
            "Dinwiddie",
            "Doohan",
            "Doone",
            "Dunbar",
            "Dundas",
            "Dundee",
            "Dunn",
            "Dunning",
            "Eccles",
            "Eckford",
            "Edmonstone",
            "Elder",
            "Fairbairn",
            "Falconer",
            "Fenwick",
            "Ferrier",
            "Gairdner",
            "Galloway",
            "Galt",
            "Geddes",
            "Geikie",
            "Glass",
            "Glendon",
            "Graham",
            "Gregory",
            "Guthrie",
            "Haig",
            "Halkett",
            "Herdman",
            "Hogg",
            "Imey",
            "Inchbald",
            "Inglis",
            "Irvine",
            "Ivory",
            "Jebb",
            "Kerr",
            "Kircaldy",
            "Kirk",
            "Kirkbride",
            "Laird",
            "Laughlin",
            "Lawson",
            "Legge",
            "Lillie",
            "Lipton",
            "Lockhart",
            "Lorimer",
            "Lyall",
            "Lyte",
            "Masson",
            "Melrose",
            "Mill",
            "Miller",
            "Milligan",
            "Milner",
            "Moffat",
            "Mollison",
            "Moncrief",
            "Montrose",
            "Motherwell",
            "Muir",
            "Muirhead",
            "Murray",
            "Nairn",
            "Naysmith",
            "Nesbit",
            "Nisbet",
            "No\xebl",
            "Orchardson",
            "Pasley",
            "Paterson",
            "Pender",
            "Preston",
            "Primrose",
            "Pringle",
            "Quiller",
            "Raeburn",
            "Ransay",
            "Redpath",
            "Renfrew",
            "Rennie",
            "Renwick",
            "Sanderson",
            "Semphill",
            "Smiles",
            "Smollett",
            "Smybert",
            "Spenlove",
            "Sterling",
            "Stirling",
            "Strang",
            "Strange",
            "Strangeways",
            "Tait",
            "Tannahill",
            "Tassie",
            "Thom",
            "Tolmie",
            "Urquhart",
            "Wardlaw",
            "Wedderburn",
            "Whearty",
            "Wilkie",
            "Wiseheart",
            "Wishart",
            "Yarrow"
        ]
    },
    fairAndNoble: {
        elfprefixes: [
            "an",
            "im",
            "ar",
            "in",
            "cal",
            "ir",
            "car",
            "ist",
            "cel",
            "lar",
            "cir",
            "lir",
            "clar",
            "lor",
            "el",
            "mar",
            "elb",
            "mel",
            "er",
            "mer",
            "erl",
            "mir",
            "est",
            "nim",
            "far",
            "nin",
            "fin",
            "nir",
            "gal",
            "ral",
            "gan",
            "ran",
            "gar",
            "rel",
            "gel",
            "ril",
            "gil",
            "rin",
            "ilm",
            "rim"
        ],
        alternativeElfPrefixes: [
            "aeg",
            "lith",
            "ael",
            "maeg",
            "aer",
            "mind",
            "aes",
            "mith",
            "aeth",
            "nith",
            "bel",
            "rael",
            "ber",
            "rind",
            "cael",
            "saer",
            "caer",
            "sar",
            "cris",
            "seld",
            "ear",
            "ser",
            "elth",
            "sil",
            "eol",
            "silm",
            "faer",
            "sind",
            "fean",
            "thael",
            "find",
            "thaer",
            "ith",
            "thal",
            "laeg",
            "thel",
            "lend",
            "ther",
            "lind",
            "thir"
        ],
        middle: [
            "ad",
            "al",
            "am",
            "an",
            "ar",
            "as",
            "eb",
            "ed",
            "el",
            "em",
            "en",
            "er",
            "es",
            "ev",
            "il",
            "in",
            "ir",
            "ol",
            "thal",
            "thon"
        ],
        maleSuffixes: [
            "ad",
            "dan",
            "del",
            "dil",
            "dir",
            "fal",
            "ion",
            "ion",
            "lad",
            "las",
            "lin",
            "nar",
            "or",
            "orn",
            "ras",
            "rior",
            "rod",
            "rond",
            "ros",
            "thir"
        ],
        femaleSuffixes: [
            "edel",
            "el",
            "eth",
            "ian",
            "iel",
            "iel",
            "ien",
            "loth",
            "mir",
            "rial",
            "rian",
            "riel",
            "riel",
            "rien",
            "ril",
            "ro\xebl",
            "sil",
            "w\xeb",
            "wen",
            "wen"
        ]
    },
    faerykind: {
        prefixes: [
            "dex",
            "gliss",
            "tink",
            "flax",
            "goss",
            "tiss",
            "flim",
            "hex",
            "trill",
            "fliss",
            "liss",
            "trist",
            "flix",
            "min",
            "twill",
            "foss",
            "misk",
            "twiss",
            "frisk",
            "raff",
            "twisp",
            "friss",
            "ress",
            "twix",
            "gess",
            "riff",
            "weft",
            "glan",
            "rill",
            "wesk",
            "glax",
            "saff",
            "winn",
            "glim",
            "shim",
            "wisp"
        ],
        maleSuffixes: [
            "aldo",
            "allo",
            "amo",
            "ando",
            "aroll",
            "aron",
            "asto",
            "endo",
            "eroll",
            "eron",
            "esto",
            "ondo"
        ],
        femaleSuffixes: [
            "afer",
            "amer",
            "anel",
            "arel",
            "asti",
            "efer",
            "enti",
            "erel",
            "ifer",
            "imer",
            "inel",
            "irel"
        ]
    },
    alternativeFaerykind: {
        prefixes: [
            "bris",
            "iphil",
            "opal",
            "cryl",
            "ispel",
            "oris",
            "elsi",
            "istle",
            "orif",
            "ember",
            "jat",
            "peri",
            "esk",
            "jost",
            "sarm",
            "feris",
            "jus",
            "sprin",
            "frimi",
            "lirra",
            "stith",
            "gan",
            "mali",
            "tansi",
            "glink",
            "mink",
            "tirra",
            "hal",
            "mirra",
            "trump",
            "hel",
            "mistle",
            "whis",
            "hist",
            "ninka",
            "zando"
        ],
        maleSuffixes: [
            "bik",
            "brix",
            "frell",
            "fret",
            "kin",
            "mist",
            "mit",
            "rix",
            "tross",
            "twik",
            "win",
            "zisk"
        ],
        femaleSuffixes: [
            "dee",
            "kiss",
            "la",
            "liss",
            "mee",
            "niss",
            "nyx",
            "ree",
            "riss",
            "sa",
            "tiss",
            "ynx"
        ]
    },
    elegantEvil: {
        prefixesDarkElves: [
            "bal",
            "myr",
            "ber",
            "ne",
            "char",
            "nel",
            "de",
            "nil",
            "div",
            "no",
            "dri",
            "nyl",
            "dul",
            "rel",
            "eil",
            "rha",
            "ek",
            "ru",
            "im",
            "sab",
            "ins",
            "sin",
            "ist",
            "sul",
            "jeg",
            "sus",
            "jer",
            "tel",
            "jys",
            "tul",
            "lil",
            "ver",
            "mar",
            "vil",
            "mer",
            "vir",
            "mez",
            "vril",
            "mor",
            "yas"
        ],
        prefixesAlternateDarkElves: [
            "bur",
            "olg",
            "chor",
            "on",
            "col",
            "or",
            "dol",
            "org",
            "dor",
            "oth",
            "drom",
            "pan",
            "dur",
            "pel",
            "en",
            "por",
            "er",
            "sek",
            "gon",
            "sol",
            "gul",
            "sun",
            "jend",
            "ten",
            "kil",
            "thal",
            "lul",
            "tor",
            "mab",
            "torm",
            "maz",
            "vek",
            "mol",
            "vol",
            "nor",
            "vor",
            "noth",
            "yel",
            "ol",
            "yol"
        ],
        middle: [
            "dyl",
            "el",
            "en",
            "er",
            "id",
            "il",
            "is",
            "lav",
            "len",
            "lev",
            "lin",
            "liv",
            "pel",
            "pir",
            "ra",
            "ral",
            "ril",
            "rin",
            "sin",
            "syl"
        ],
        maleSuffixes: [
            "ald",
            "eld",
            "id",
            "ild",
            "ird",
            "lim",
            "naz",
            "nid",
            "nil",
            "nim",
            "red",
            "rid",
            "rim",
            "riv",
            "ul",
            "uld",
            "vid",
            "vim",
            "vir",
            "viz"
        ],
        femaleSuffixes: [
            "bra",
            "dra",
            "dril",
            "ene",
            "hel",
            "ia",
            "il",
            "iln",
            "ira",
            "istra",
            "ith",
            "iza",
            "lin",
            "na",
            "ra",
            "rin",
            "sil",
            "tra",
            "vra",
            "vril"
        ]
    },
    malevolent: {
        prefixes: [
            "aag",
            "karg",
            "ulthu",
            "alur",
            "khark",
            "urz",
            "arak",
            "krau",
            "uti",
            "az",
            "kriv",
            "uznid",
            "azik",
            "kuaz",
            "virn",
            "bral",
            "kudu",
            "vlaaj",
            "braz",
            "luri",
            "vlag",
            "bruh",
            "mulk",
            "vlash",
            "draan",
            "nau",
            "vluk",
            "drulg",
            "nid",
            "vluzak",
            "guz",
            "ninj",
            "vraz",
            "haug",
            "nul",
            "vulk",
            "idru",
            "nym",
            "xau",
            "jhaal",
            "ranag",
            "xid",
            "jid",
            "rilthu",
            "xul",
            "jiu",
            "ruk",
            "xuraj",
            "jur",
            "rulk",
            "zauv",
            "jurg",
            "ruz",
            "zug",
            "jurz",
            "saag",
            "zuldu",
            "kaaz",
            "skaur",
            "zuv"
        ],
        maleSuffixes: [
            "arag",
            "bru",
            "drul",
            "inu",
            "lank",
            "lun",
            "lurr",
            "lurug",
            "nal",
            "rul",
            "ruzuk",
            "salk",
            "sul",
            "suruk",
            "ull",
            "undak",
            "uvik",
            "xulg",
            "zu",
            "zuk"
        ],
        femaleSuffixes: [
            "anil",
            "bau",
            "diu",
            "dusla",
            "giu",
            "ija",
            "izil",
            "jiul",
            "lihyl",
            "lin",
            "lyrr",
            "nalu",
            "rhyl",
            "rula",
            "skiu",
            "sula",
            "ulla",
            "xhiu",
            "zihyl",
            "ziu"
        ]
    },
    draconic: {
        prefixes: [
            "abra",
            "har",
            "phrixu",
            "adastra",
            "helio",
            "porphyro",
            "adra",
            "huro",
            "pyra",
            "anca",
            "iul",
            "rhada",
            "andra",
            "jalan",
            "rhe",
            "arag",
            "jarzem",
            "rhodo",
            "archo",
            "jazra",
            "rau",
            "atra",
            "jurga",
            "sar",
            "bar",
            "keruxa",
            "sarcu",
            "bara",
            "kralka",
            "sarda",
            "beru",
            "lazulo",
            "scarva",
            "bhakri",
            "majuri",
            "sidereo",
            "bia",
            "malacho",
            "skhia",
            "bra",
            "mar",
            "sulchru",
            "brado",
            "marmora",
            "tchalcedo",
            "brima",
            "melkar",
            "tchazar",
            "cadra",
            "orgra",
            "trocho",
            "chro",
            "ouro",
            "vra",
            "chryso",
            "perido",
            "zalar",
            "glau",
            "phoro",
            "zerul"
        ],
        suffixes: [
            "bazius",
            "boros",
            "bradax",
            "calchax",
            "cordax",
            "lagon",
            "malax",
            "mandros",
            "manthys",
            "mordax",
            "nadral",
            "nalux",
            "neriax",
            "phylax",
            "vorax",
            "vorung",
            "xenor",
            "zuthrax",
            "zzebrax",
            "zzemal"
        ]
    },
    infernal: {
        softs: [
            "alu",
            "alz",
            "avu",
            "azaz",
            "baph",
            "baz",
            "cha",
            "fraz",
            "garl",
            "garu",
            "gla",
            "hra",
            "mal",
            "nahu",
            "nal",
            "nasu",
            "paz",
            "raz",
            "tha",
            "thalu",
            "bre",
            "dre",
            "gel",
            "gle",
            "gre",
            "hez",
            "rez",
            "rezu",
            "tze",
            "gzi",
            "hriz",
            "hzi",
            "idrau",
            "itha",
            "ixu",
            "lilu",
            "riz",
            "yil",
            "dromu",
            "gro",
            "lol",
            "moz",
            "olth",
            "oxu",
            "sco",
            "tho",
            "bu",
            "bul",
            "buz",
            "chru",
            "dru",
            "ghu",
            "gura",
            "guz",
            "hruz",
            "huz",
            "kul",
            "lurhz",
            "muz",
            "ru",
            "shu",
            "ssu",
            "szul",
            "thu",
            "ulchru",
            "utu",
            "vul",
            "zu",
            "zul",
            "baal",
            "ghaa",
            "kraa",
            "phaal",
            "raal",
            "saa",
            "bial",
            "oazo",
            "soaz",
            "ruaz",
            "gya",
            "yaa",
            "bael",
            "nee",
            "ziel",
            "yee",
            "aiaz",
            "shai",
            "reoz",
            "duoi",
            "drau",
            "ghau",
            "glau",
            "mau",
            "sau",
            "tzau",
            "iuz",
            "juu",
            "rhuu",
            "vuul",
            "zuu"
        ],
        dulls: [
            "agh",
            "alg",
            "barg",
            "chag",
            "ghad",
            "glab",
            "grag",
            "hrag",
            "kag",
            "kwarg",
            "mag",
            "nalb",
            "sag",
            "tharg",
            "brelg",
            "dergh",
            "dregh",
            "drelb",
            "felg",
            "heg",
            "kleg",
            "igg",
            "rigg",
            "blog",
            "drog",
            "grolb",
            "kolg",
            "krolg",
            "lolg",
            "mog",
            "morg",
            "nog",
            "obb",
            "ogg",
            "olb",
            "rogg",
            "strog",
            "thog",
            "trob",
            "tzolg",
            "vogt",
            "bub",
            "bulg",
            "druj",
            "durg",
            "frub",
            "fulg",
            "gub",
            "hrud",
            "hurg",
            "jub",
            "julb",
            "nud",
            "nug",
            "nulb",
            "rung",
            "shub",
            "stug",
            "sug",
            "szug",
            "trulg",
            "ulb",
            "urb",
            "vub",
            "vulb",
            "xub",
            "zub",
            "zug",
            "zugt",
            "aab",
            "aag",
            "glaag",
            "haag",
            "naag",
            "raag",
            "boaj",
            "moab",
            "uag",
            "leegh",
            "yeb",
            "yeeg",
            "aig",
            "yibb",
            "iog",
            "droog",
            "nyog",
            "aug",
            "baug",
            "daurg",
            "draug",
            "gaub",
            "laug",
            "maug",
            "naug",
            "raug",
            "saug",
            "thaug",
            "iub",
            "iug",
            "ruug"
        ],
        sharps: [
            "ach",
            "akk",
            "ash",
            "azt",
            "bahor",
            "bar",
            "bas",
            "brax",
            "charn",
            "dak",
            "hrax",
            "lach",
            "lazt",
            "mat",
            "nam",
            "nazt",
            "ralk",
            "rhast",
            "sark",
            "slarv",
            "tash",
            "thak",
            "thalur",
            "thalk",
            "vach",
            "vap",
            "dek",
            "ech",
            "fesh",
            "gek",
            "hrek",
            "lech",
            "met",
            "ner",
            "ter",
            "blik",
            "gith",
            "igm",
            "inax",
            "irsch",
            "kir",
            "lis",
            "lisk",
            "lith",
            "nilv",
            "nirr",
            "tlizit",
            "bor",
            "chon",
            "goch",
            "gor",
            "goth",
            "hoth",
            "khor",
            "kos",
            "loch",
            "lok",
            "loth",
            "moch",
            "moth",
            "noc",
            "och",
            "oth",
            "rolk",
            "roth",
            "sot",
            "soth",
            "vrok",
            "dun",
            "gur",
            "hun",
            "luth",
            "muth",
            "nur",
            "rutt",
            "sut",
            "sutt",
            "szut",
            "tur",
            "urt",
            "utuk",
            "uzt",
            "krych",
            "nyth",
            "slyth",
            "gaan",
            "xaas",
            "boak",
            "ruaak",
            "yalm",
            "haerx",
            "iex",
            "draum",
            "gaur",
            "glaur",
            "rauk",
            "saur",
            "duum",
            "nuur",
            "ruun"
        ]
    },
    empyreal: {
        prefixes: [
            "adan",
            "asan",
            "jasan",
            "palant",
            "sarnat",
            "valmar",
            "adrast",
            "asarn",
            "jasarm",
            "palor",
            "solar",
            "valnar",
            "alant",
            "astar",
            "javral",
            "raman",
            "talan",
            "valnor",
            "amad",
            "atar",
            "kalad",
            "ranal",
            "talar",
            "valon",
            "aman",
            "atlan",
            "kalar",
            "ranar",
            "talas",
            "valor",
            "amar",
            "avar",
            "kalas",
            "rasan",
            "talon",
            "vanar",
            "amars",
            "avlant",
            "kalast",
            "ravan",
            "taran",
            "varal",
            "amart",
            "avral",
            "kasal",
            "samar",
            "taval",
            "varam",
            "ansam",
            "jalan",
            "katarn",
            "saran",
            "valant",
            "varan",
            "arad",
            "jalkar",
            "kaval",
            "sarat",
            "valar",
            "varat",
            "aram",
            "jaran",
            "klaron",
            "sardan",
            "valdor",
            "vardar",
            "aran",
            "jasal",
            "palad",
            "sardar",
            "valkar",
            "voltar"
        ],
        maleSuffixes: [
            "al",
            "an",
            "ar",
            "as",
            "at",
            "ath",
            "ath",
            "ath",
            "anth",
            "athal",
            "athar",
            "athas"
        ],
        femaleSuffixes: [
            "el",
            "en",
            "er",
            "es",
            "et",
            "eth",
            "eth",
            "eth",
            "enth",
            "eleth",
            "ereth",
            "eseth"
        ],
        titles: [
            "ar-",
            "sar-",
            "tar-",
            "var-",
            "jal-",
            "kal-",
            "pal-",
            "ral-",
            "tal-"
        ]
    }
};
const $526640c45cded75e$export$3e8081ff43ae4e53 = {
    getGoblinName: function() {
        return $526640c45cded75e$var$names.vileAndCrude.small[Math.floor(Math.random() * $526640c45cded75e$var$names.vileAndCrude.small.length)].capitalize() + $526640c45cded75e$var$names.vileAndCrude.small[Math.floor(Math.random() * $526640c45cded75e$var$names.vileAndCrude.small.length)];
    },
    getOrcName: function() {
        return $526640c45cded75e$var$names.vileAndCrude.medium[Math.floor(Math.random() * $526640c45cded75e$var$names.vileAndCrude.medium.length)].capitalize() + $526640c45cded75e$var$names.vileAndCrude.medium[Math.floor(Math.random() * $526640c45cded75e$var$names.vileAndCrude.medium.length)];
    },
    getOgreName: function() {
        return $526640c45cded75e$var$names.vileAndCrude.large[Math.floor(Math.random() * $526640c45cded75e$var$names.vileAndCrude.large.length)].capitalize() + $526640c45cded75e$var$names.vileAndCrude.large[Math.floor(Math.random() * $526640c45cded75e$var$names.vileAndCrude.large.length)];
    },
    getMaleCavemenName: function() {
        var d10 = Math.floor(Math.random() * 10) + 1, name = $526640c45cded75e$var$names.primitive.names[Math.floor(Math.random() * $526640c45cded75e$var$names.primitive.names.length)].capitalize();
        if (d10 > 3) name += "-" + $526640c45cded75e$var$names.primitive.names[Math.floor(Math.random() * $526640c45cded75e$var$names.primitive.names.length)].capitalize();
        if (d10 > 8) name += "-" + $526640c45cded75e$var$names.primitive.names[Math.floor(Math.random() * $526640c45cded75e$var$names.primitive.names.length)].capitalize();
        return name;
    },
    getFemaleCavemenName: function() {
        var name = $526640c45cded75e$var$names.primitive.names[Math.floor(Math.random() * $526640c45cded75e$var$names.primitive.names.length)].capitalize();
        if (Math.random() >= 0.5) name += "-" + $526640c45cded75e$var$names.primitive.names[Math.floor(Math.random() * $526640c45cded75e$var$names.primitive.names.length)].capitalize();
        name += "-" + $526640c45cded75e$var$names.primitive.suffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.primitive.suffixes.length)].capitalize();
        return name;
    },
    getMaleDwarfName: function() {
        var name = $526640c45cded75e$var$names.doughty.syllabes[Math.floor(Math.random() * $526640c45cded75e$var$names.doughty.syllabes.length)].capitalize();
        if (Math.random() > 0.8) name += $526640c45cded75e$var$isVowel(name.slice(-1)) ? "r" : "i";
        else name += $526640c45cded75e$var$names.doughty.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.doughty.maleSuffixes.length)];
        return name;
    },
    getFemaleDwarfName: function() {
        var name = $526640c45cded75e$var$names.doughty.syllabes[Math.floor(Math.random() * $526640c45cded75e$var$names.doughty.syllabes.length)].capitalize();
        if (Math.random() > 0.8) name += $526640c45cded75e$var$isVowel(name.slice(-1)) ? "ra" : "a";
        else name += $526640c45cded75e$var$names.doughty.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.doughty.femaleSuffixes.length)];
        return name;
    },
    getMaleHalflingName: function() {
        var name = $526640c45cded75e$var$names.homely.syllabes[Math.floor(Math.random() * $526640c45cded75e$var$names.homely.syllabes.length)].capitalize() + $526640c45cded75e$var$names.homely.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.homely.maleSuffixes.length)];
        if (Math.random() > 0.7) name += " " + $526640c45cded75e$var$names.familyName.english[Math.floor(Math.random() * $526640c45cded75e$var$names.familyName.english.length)];
        return name;
    },
    getFemaleHalflingName: function() {
        var name = $526640c45cded75e$var$names.homely.syllabes[Math.floor(Math.random() * $526640c45cded75e$var$names.homely.syllabes.length)].capitalize() + $526640c45cded75e$var$names.homely.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.homely.femaleSuffixes.length)];
        if (Math.random() > 0.7) name += " " + $526640c45cded75e$var$names.familyName.english[Math.floor(Math.random() * $526640c45cded75e$var$names.familyName.english.length)];
        return name;
    },
    getMaleGnomeName: function() {
        var name = $526640c45cded75e$var$names.doughty.syllabes[Math.floor(Math.random() * $526640c45cded75e$var$names.doughty.syllabes.length)].capitalize();
        if ($526640c45cded75e$var$isVowel(name.slice(-1))) name += "l";
        name += $526640c45cded75e$var$names.homely.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.homely.maleSuffixes.length)];
        if (Math.random() > 0.7) name += " " + $526640c45cded75e$var$names.familyName.scottish[Math.floor(Math.random() * $526640c45cded75e$var$names.familyName.scottish.length)];
        return name;
    },
    getFemaleGnomeName: function() {
        var name = $526640c45cded75e$var$names.doughty.syllabes[Math.floor(Math.random() * $526640c45cded75e$var$names.doughty.syllabes.length)].capitalize();
        if ($526640c45cded75e$var$isVowel(name.slice(-1))) name += "l";
        name += $526640c45cded75e$var$names.homely.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.homely.femaleSuffixes.length)];
        if (Math.random() > 0.7) name += " " + $526640c45cded75e$var$names.familyName.scottish[Math.floor(Math.random() * $526640c45cded75e$var$names.familyName.scottish.length)];
        return name;
    },
    getMaleElfName: function() {
        return $526640c45cded75e$var$names.fairAndNoble.elfprefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.elfprefixes.length)].capitalize() + $526640c45cded75e$var$names.fairAndNoble.middle[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.middle.length)] + $526640c45cded75e$var$names.fairAndNoble.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.maleSuffixes.length)];
    },
    getFemaleElfName: function() {
        return $526640c45cded75e$var$names.fairAndNoble.elfprefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.elfprefixes.length)].capitalize() + $526640c45cded75e$var$names.fairAndNoble.middle[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.middle.length)] + $526640c45cded75e$var$names.fairAndNoble.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.femaleSuffixes.length)];
    },
    getAlternateMaleElfName: function() {
        return $526640c45cded75e$var$names.fairAndNoble.alternativeElfPrefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.alternativeElfPrefixes.length)].capitalize() + $526640c45cded75e$var$names.fairAndNoble.middle[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.middle.length)] + $526640c45cded75e$var$names.fairAndNoble.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.femaleSuffixes.length)];
    },
    getAlternateFemaleElfName: function() {
        return $526640c45cded75e$var$names.fairAndNoble.alternativeElfPrefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.alternativeElfPrefixes.length)].capitalize() + $526640c45cded75e$var$names.fairAndNoble.middle[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.middle.length)] + $526640c45cded75e$var$names.fairAndNoble.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.fairAndNoble.maleSuffixes.length)];
    },
    getMaleFaerykindName: function() {
        return $526640c45cded75e$var$names.faerykind.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.faerykind.prefixes.length)].capitalize() + $526640c45cded75e$var$names.faerykind.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.faerykind.maleSuffixes.length)];
    },
    getFemaleFaerykindName: function() {
        return $526640c45cded75e$var$names.faerykind.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.faerykind.prefixes.length)].capitalize() + $526640c45cded75e$var$names.faerykind.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.faerykind.femaleSuffixes.length)];
    },
    getAlternateMaleFaerykindName: function() {
        return $526640c45cded75e$var$names.alternativeFaerykind.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.alternativeFaerykind.prefixes.length)].capitalize() + $526640c45cded75e$var$names.alternativeFaerykind.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.alternativeFaerykind.maleSuffixes.length)];
    },
    getAlternateFemaleFaerykindName: function() {
        return $526640c45cded75e$var$names.alternativeFaerykind.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.alternativeFaerykind.prefixes.length)].capitalize() + $526640c45cded75e$var$names.alternativeFaerykind.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.alternativeFaerykind.femaleSuffixes.length)];
    },
    getMaleDarkElfName: function() {
        var name = $526640c45cded75e$var$names.elegantEvil.prefixesDarkElves[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.prefixesDarkElves.length)].capitalize();
        if (Math.random() > 1 / 6) name += $526640c45cded75e$var$names.elegantEvil.middle[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.middle.length)];
        name += $526640c45cded75e$var$names.elegantEvil.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.maleSuffixes.length)];
        return name;
    },
    getFemaleDarkElfName: function() {
        var name = $526640c45cded75e$var$names.elegantEvil.prefixesDarkElves[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.prefixesDarkElves.length)].capitalize();
        if (Math.random() > 1 / 6) name += $526640c45cded75e$var$names.elegantEvil.middle[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.middle.length)];
        name += $526640c45cded75e$var$names.elegantEvil.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.femaleSuffixes.length)];
        return name;
    },
    getAlternateMaleDarkElfName: function() {
        var name = $526640c45cded75e$var$names.elegantEvil.prefixesAlternateDarkElves[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.prefixesAlternateDarkElves.length)].capitalize();
        if (Math.random() > 1 / 6) name += $526640c45cded75e$var$names.elegantEvil.middle[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.middle.length)];
        name += $526640c45cded75e$var$names.elegantEvil.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.maleSuffixes.length)];
        return name;
    },
    getAlternateFemaleDarkElfName: function() {
        var name = $526640c45cded75e$var$names.elegantEvil.prefixesAlternateDarkElves[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.prefixesAlternateDarkElves.length)].capitalize();
        if (Math.random() > 1 / 6) name += $526640c45cded75e$var$names.elegantEvil.middle[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.middle.length)];
        name += $526640c45cded75e$var$names.elegantEvil.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.elegantEvil.femaleSuffixes.length)];
        return name;
    },
    getMaleHalfDemonName: function() {
        return $526640c45cded75e$var$names.malevolent.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.malevolent.prefixes.length)].capitalize() + $526640c45cded75e$var$names.malevolent.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.malevolent.maleSuffixes.length)];
    },
    getFemaleHalfDemonName: function() {
        return $526640c45cded75e$var$names.malevolent.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.malevolent.prefixes.length)].capitalize() + $526640c45cded75e$var$names.malevolent.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.malevolent.femaleSuffixes.length)];
    },
    getMaleDragonName: function() {
        return $526640c45cded75e$var$names.draconic.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.draconic.prefixes.length)].capitalize() + $526640c45cded75e$var$names.draconic.suffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.draconic.suffixes.length)];
    },
    getFemaleDragonName: function() {
        var name = $526640c45cded75e$var$names.draconic.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.draconic.prefixes.length)].capitalize(), suffix = $526640c45cded75e$var$names.draconic.suffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.draconic.suffixes.length)];
        if (suffix === "bazius") suffix = "bazia";
        else if (suffix.slice(-2) === "os") {
            suffix = suffix.slice(0, -2);
            suffix += "ossa";
        } else suffix += "is";
        return name + suffix;
    },
    getDemonName: function() {
        var d6 = Math.floor(Math.random() * 6) + 1, name;
        if (d6 === 1) name = $526640c45cded75e$var$names.infernal.softs[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.softs.length)].capitalize() + $526640c45cded75e$var$names.infernal.dulls[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.dulls.length)];
        else if (d6 === 2) name = $526640c45cded75e$var$names.infernal.softs[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.softs.length)].capitalize() + $526640c45cded75e$var$names.infernal.sharps[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.sharps.length)];
        else if (d6 === 3) name = $526640c45cded75e$var$names.infernal.dulls[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.dulls.length)].capitalize() + $526640c45cded75e$var$names.infernal.softs[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.softs.length)];
        else if (d6 === 4) name = $526640c45cded75e$var$names.infernal.dulls[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.dulls.length)].capitalize() + $526640c45cded75e$var$names.infernal.sharps[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.sharps.length)];
        else if (d6 === 5) name = $526640c45cded75e$var$names.infernal.sharps[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.sharps.length)].capitalize() + $526640c45cded75e$var$names.infernal.softs[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.softs.length)];
        else name = $526640c45cded75e$var$names.infernal.sharps[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.sharps.length)].capitalize() + $526640c45cded75e$var$names.infernal.dulls[Math.floor(Math.random() * $526640c45cded75e$var$names.infernal.dulls.length)];
        return name;
    },
    getMaleAngelName: function() {
        var name = $526640c45cded75e$var$names.empyreal.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.empyreal.prefixes.length)].capitalize();
        if (Math.random() <= 1 / 12) {
            if (name.slice(-2) !== "ar" && name.slice(-2) !== "al") name = $526640c45cded75e$var$names.empyreal.titles[Math.floor(Math.random() * $526640c45cded75e$var$names.empyreal.titles.length)].capitalize() + name;
            else if (name.slice(-2) === "ar") name = $526640c45cded75e$var$names.empyreal.titles[Math.floor(Math.random() * 4) + 4].capitalize() + name;
            else name = $526640c45cded75e$var$names.empyreal.titles[Math.floor(Math.random() * 4)].capitalize() + name;
        } else name += $526640c45cded75e$var$names.empyreal.maleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.empyreal.maleSuffixes.length)];
        return name;
    },
    getFemaleAngelName: function() {
        var name = $526640c45cded75e$var$names.empyreal.prefixes[Math.floor(Math.random() * $526640c45cded75e$var$names.empyreal.prefixes.length)].capitalize();
        if (Math.random() <= 1 / 12) {
            name = name.substr(0, name.lastIndexOf("a")) + "e" + name.substr(name.lastIndexOf("a") + 1); // Replace the last 'a' by a 'e' for female
            if (name.slice(-2) !== "ar" && name.slice(-2) !== "al") name = $526640c45cded75e$var$names.empyreal.titles[Math.floor(Math.random() * $526640c45cded75e$var$names.empyreal.titles.length)].capitalize() + name;
            else if (name.slice(-2) === "ar") name = $526640c45cded75e$var$names.empyreal.titles[Math.floor(Math.random() * 4)].capitalize() + name;
            else name = $526640c45cded75e$var$names.empyreal.titles[Math.floor(Math.random() * 4) + 4].capitalize() + name;
        } else name += $526640c45cded75e$var$names.empyreal.femaleSuffixes[Math.floor(Math.random() * $526640c45cded75e$var$names.empyreal.femaleSuffixes.length)];
        return name;
    }
};


var $7d7c02f63df4accb$var$names = [
    // One syllabe
    [
        "Aind",
        "Ainn",
        "Airk",
        "Aitze",
        "Ald",
        "Ance",
        "Anxe",
        "Ard",
        "Ashf",
        "Aulg",
        "Aun",
        "Aure",
        "Authe",
        "Baelt",
        "Bakh",
        "Bal",
        "Balt",
        "Balthe",
        "Barg",
        "Barll",
        "Bauce",
        "Baysc",
        "Beek",
        "Beele",
        "Berl",
        "Bersch",
        "Beyn",
        "Bhozt",
        "Birme",
        "Birr",
        "Bjanc",
        "Blaen",
        "Blize",
        "Blouch",
        "Blurk",
        "Blynze",
        "Bokk",
        "Borl",
        "Borse",
        "Brahl",
        "Brakk",
        "Bralk",
        "Brang",
        "Brann",
        "Branth",
        "Brem",
        "Bress",
        "Breun",
        "Briint",
        "Brill",
        "Brize",
        "Brod",
        "Broik",
        "Brolt",
        "Bront",
        "Broozh",
        "Brosck",
        "Broud",
        "Brud",
        "Brule",
        "Brun",
        "Bulse",
        "Bunth",
        "Byar",
        "Byst",
        "Caer",
        "Cail",
        "Canth",
        "Carn",
        "Cayrl",
        "Ceyt",
        "Chaeng",
        "Chail",
        "Chaith",
        "Chal",
        "Chalm",
        "Charg",
        "Charn",
        "Chave",
        "Chayle",
        "Chaze",
        "Cheal",
        "Cheev",
        "Chel",
        "Chern",
        "Cherze",
        "Chezl",
        "Chilk",
        "Chlenk",
        "Choalg",
        "Choje",
        "Chor",
        "Chorl",
        "Chorsk",
        "Chounce",
        "Chraq",
        "Chrarr",
        "Chrem",
        "Chrent",
        "Chriyb",
        "Chroad",
        "Chud",
        "Chuz",
        "Claed",
        "Clart",
        "Clesh",
        "Cloup",
        "Clour",
        "Clowr",
        "Coll",
        "Corb",
        "Corje",
        "Corm",
        "Corme",
        "Crade",
        "Creeg",
        "Croold",
        "Croyn",
        "Cthon",
        "Cush",
        "Daalx",
        "Dahr",
        "Daig",
        "Dal",
        "Darm",
        "Darsh",
        "Darze",
        "Dashf",
        "Dask",
        "Datz",
        "Daug",
        "Dawl",
        "Deelth",
        "Deerch",
        "Derd",
        "Derle",
        "Dest",
        "Deuth",
        "Dex",
        "Dhaant",
        "Dherl",
        "Dhoul",
        "Dhuul",
        "Dhuur",
        "Dinz",
        "Dlak",
        "Dlask",
        "Dlir",
        "Doag",
        "Dolc",
        "Dorse",
        "Dralg",
        "Dram",
        "Dran",
        "Drance",
        "Drath",
        "Drax",
        "Draygg",
        "Dreact",
        "Dreed",
        "Dreeg",
        "Dreen",
        "Dreev",
        "Drelm",
        "Drelth",
        "Drerle",
        "Drewm",
        "Drilm",
        "Drinn",
        "Drism",
        "Drissth",
        "Drix",
        "Droale",
        "Drojj",
        "Drom",
        "Droxe",
        "Droy",
        "Drun",
        "Drust",
        "Druuth",
        "Dryle",
        "Drynn",
        "Drythe",
        "Dvarch",
        "Dwesk",
        "Dzairn",
        "Dzij",
        "Dzym",
        "Eeb",
        "Eenthe",
        "Elb",
        "Emp",
        "Ence",
        "Ench",
        "Eng",
        "Enz",
        "Ept",
        "Erd",
        "Esk",
        "Faig",
        "Falthe",
        "Fanch",
        "Faoth",
        "Fard",
        "Faum",
        "Faz",
        "Feant",
        "Feej",
        "Felg",
        "Fernsh",
        "Fesk",
        "Fess",
        "Feth",
        "Fimth",
        "Fize",
        "Flast",
        "Flatch",
        "Flayre",
        "Flerd",
        "Flersh",
        "Flisp",
        "Florn",
        "Fompt",
        "Fousk",
        "Fraine",
        "Frakk",
        "Fralg",
        "Frast",
        "Fregg",
        "Frem",
        "Fresk",
        "Fretch",
        "Frex",
        "Frike",
        "Frile",
        "Frism",
        "Frold",
        "Frone",
        "Fronx",
        "Frook",
        "Frool",
        "Froy",
        "Frush",
        "Fryx",
        "Fulm",
        "Fyahn",
        "Fyast",
        "Fyorb",
        "Fzek",
        "Fzron",
        "Gair",
        "Galthz",
        "Gand",
        "Gane",
        "Gann",
        "Gart",
        "Gath",
        "Gault",
        "Gawle",
        "Gax",
        "Genze",
        "Gerd",
        "Gez",
        "Gharl",
        "Ghea",
        "Ghenz",
        "Ghorl",
        "Ghorx",
        "Gilft",
        "Gilm",
        "Gire",
        "Glaar",
        "Glain",
        "Glarch",
        "Glaux",
        "Gleeth",
        "Gleev",
        "Gleft",
        "Glekke",
        "Glem",
        "Glice",
        "Glip",
        "Glish",
        "Glith",
        "Gloard",
        "Gloob",
        "Gloorsh",
        "Glosk",
        "Glund",
        "Glyre",
        "Glyth",
        "Gnarre",
        "Golm",
        "Gond",
        "Gorm",
        "Gosp",
        "Goste",
        "Graal",
        "Grall",
        "Greel",
        "Greeld",
        "Greelp",
        "Grend",
        "Grilf",
        "Grimp",
        "Groad",
        "Grond",
        "Groolsh",
        "Gruon",
        "Grux",
        "Gthuu",
        "Gurze",
        "Gwisp",
        "Gwith",
        "Gwosk",
        "Gyorr",
        "Gyz",
        "Haag",
        "Haar",
        "Haask",
        "Hade",
        "Hadj",
        "Halk",
        "Halm",
        "Hane",
        "Harb",
        "Harch",
        "Harg",
        "Harx",
        "Hauke",
        "Haux",
        "Hawlx",
        "Hax",
        "Heerf",
        "Hersh",
        "Hetz",
        "Hezz",
        "Hisk",
        "Hize",
        "Hjorr",
        "Hlare",
        "Hlor",
        "Hoag",
        "Hob",
        "Horl",
        "Horm",
        "Hosh",
        "Hraak",
        "Hrailk",
        "Hreen",
        "Hrine",
        "Hroon",
        "Hrume",
        "Hruse",
        "Huxx",
        "Hythe",
        "Ingg",
        "Jaarge",
        "Jad",
        "Jaerth",
        "Jaig",
        "Jairn",
        "Jal",
        "Jalth",
        "Jance",
        "Jand",
        "Jant",
        "Janx",
        "Jard",
        "Jark",
        "Jarn",
        "Jask",
        "Jath",
        "Jauce",
        "Jaus",
        "Jauth",
        "Jaze",
        "Jeel",
        "Jekk",
        "Jend",
        "Jenx",
        "Jerd",
        "Jern",
        "Jexx",
        "Jhang",
        "Jhaulk",
        "Jhor",
        "Jhure",
        "Jinch",
        "Jind",
        "Jinz",
        "Jirle",
        "Joorm",
        "Jorm",
        "Jorn",
        "Jrond",
        "Jurze",
        "Jusk",
        "Juzz",
        "Jyfe",
        "Jyin",
        "Kaerr",
        "Kaid",
        "Kal",
        "Kamn",
        "Kand",
        "Kang",
        "Kank",
        "Karn",
        "Karth",
        "Karze",
        "Kaune",
        "Kedj",
        "Keek",
        "Keig",
        "Kell",
        "Kelph",
        "Kerce",
        "Kerm",
        "Kerst",
        "Kesp",
        "Keth",
        "Kez",
        "Khaiz",
        "Khal",
        "Khand",
        "Kharb",
        "Kharsp",
        "Khern",
        "Khif",
        "Khond",
        "Kh\xf4r",
        "Khorst",
        "Khrev",
        "Kinch",
        "Kish",
        "Kiv",
        "Kjeld",
        "Klaff",
        "Klaz",
        "Kleed",
        "Kloob",
        "Kloohn",
        "Klyne",
        "Kmool",
        "Knaar",
        "Knut",
        "Kolff",
        "Kolg",
        "Konv",
        "Koss",
        "Koul",
        "Krake",
        "Krall",
        "Kranj",
        "Krax",
        "Kreel",
        "Krej",
        "Kremp",
        "Krey",
        "Krile",
        "Krinch",
        "Kroff",
        "Kroll",
        "Krompf",
        "Kuest",
        "Kull",
        "Kulm",
        "Kuon",
        "Kuum",
        "Kvon",
        "Kwask",
        "Kwaz",
        "Kyre",
        "Lach",
        "Laev",
        "Lan",
        "Lantz",
        "Larnste",
        "Lartz",
        "Laur",
        "Lawrg",
        "Layje",
        "Leet",
        "Lenx",
        "Leth",
        "Liln",
        "Liss",
        "Lod",
        "Loec",
        "Lonn",
        "Loord",
        "Loosk",
        "Lound",
        "Luhr",
        "Lumbb",
        "Lurs",
        "Lyrr",
        "Lysk",
        "Maarth",
        "Maec",
        "Maelv",
        "Magh",
        "Mald",
        "Mant",
        "Manth",
        "Mantz",
        "Marb",
        "Mard",
        "Mayxe",
        "Meand",
        "Meeth",
        "Melg",
        "Meln",
        "Merrt",
        "Merzh",
        "Mesp",
        "Mirsp",
        "Mirx",
        "Miskt",
        "Ml\xf6",
        "Mointh",
        "Mool",
        "Moork",
        "Moorthe",
        "Mord",
        "Morl",
        "Moskt",
        "Mox",
        "Mulse",
        "Murlk",
        "Murste",
        "Myrrhne",
        "Naall",
        "Naar",
        "Naaz",
        "Naer",
        "Naik",
        "Naine",
        "Nairx",
        "Nalm",
        "Nanx",
        "Naois",
        "Naphk",
        "Nar",
        "Narct",
        "Narrm",
        "Naulk",
        "Naxx",
        "Naze",
        "Nelq",
        "Nem",
        "Nemn",
        "Nerrz",
        "Ngal",
        "Nime",
        "Nirft",
        "Nisp",
        "Nithe",
        "Noerth",
        "Nolgh",
        "Nool",
        "Noom",
        "Norb",
        "Norle",
        "Noth",
        "Nraeve",
        "Nulth",
        "Nurb",
        "Nuss",
        "Nyalg",
        "Nyalk",
        "Nym",
        "Nynx",
        "Olth",
        "Omm",
        "Omn",
        "Ooon",
        "Ord",
        "Orld",
        "Ornce",
        "Oth",
        "Ounde",
        "Ourne",
        "Paaz",
        "Palch",
        "Parn",
        "Parth",
        "Parzt",
        "Path",
        "Pelk",
        "Pell",
        "Pesm",
        "Phad",
        "Phairn",
        "Phant",
        "Phlarn",
        "Phong",
        "Photz",
        "Phral",
        "Phul",
        "Pirz",
        "Pjanth",
        "Plange",
        "Plaz",
        "Plegg",
        "Plind",
        "Plomb",
        "Plorze",
        "Plumf",
        "Pluun",
        "Pnidd",
        "Poile",
        "Pome",
        "Pould",
        "Praige",
        "Presk",
        "Prike",
        "Prokk",
        "Prook",
        "Prya",
        "Pryle",
        "Prynne",
        "Psarn",
        "Ptenx",
        "Pulge",
        "Pume",
        "Quaan",
        "Quaar",
        "Quagh",
        "Quaild",
        "Quaisth",
        "Qual",
        "Qualt",
        "Quanst",
        "Quanz",
        "Quaoph",
        "Quarl",
        "Quast",
        "Quech",
        "Qued",
        "Quelg",
        "Quelm",
        "Querk",
        "Quigg",
        "Quilg",
        "Quol",
        "Quonj",
        "Quool",
        "Quorze",
        "Quune",
        "Quynd",
        "Raask",
        "Rahm",
        "Raine",
        "Raisth",
        "Ralce",
        "Rald",
        "Rast",
        "Raunt",
        "Raupt",
        "Rax",
        "Raxt",
        "Rayche",
        "Raz",
        "Reelce",
        "Reendt",
        "Relth",
        "Relz",
        "Rez",
        "Rhath",
        "Rhaze",
        "Rhiss",
        "Rhom",
        "Rhorn",
        "Rhyll",
        "Rifk",
        "Rilm",
        "Rilx",
        "Rimsk",
        "Rimth",
        "Riss",
        "Rith",
        "Rix",
        "Rodr",
        "Rodst",
        "Roen",
        "Rogg",
        "Rolm",
        "Rolx",
        "Roult",
        "Rull",
        "Rulm",
        "Rult",
        "Rumche",
        "Runce",
        "Ruor",
        "Ruusque",
        "Ruz",
        "Ryke",
        "Rynx",
        "Ryond",
        "Rythe",
        "Saar",
        "Saech",
        "Saedd",
        "Sairgh",
        "San",
        "Sange",
        "Sarg",
        "Sark",
        "Sarl",
        "Sarn",
        "Sarpt",
        "Skroine",
        "Scroot",
        "Scrylte",
        "Scryme",
        "Sculp",
        "Scuss",
        "Scyrth",
        "Sdor",
        "Seelt",
        "Seif",
        "Sen",
        "Senthe",
        "Sfite",
        "Shad",
        "Shar",
        "Sharg",
        "Sharm",
        "Sharn",
        "Sheb",
        "Sheel",
        "Shenn",
        "Shenx",
        "Sherth",
        "Shilm",
        "Shind",
        "Shont",
        "Shren",
        "Shune",
        "Shurm",
        "Shuuth",
        "Shyang",
        "Skarn",
        "Skart",
        "Skeen",
        "Skerr",
        "Skorle",
        "Skraf",
        "Skrafe",
        "Skrib",
        "Skrift",
        "Skroi",
        "Skyre",
        "Slaar",
        "Slanc",
        "Slark",
        "Slarm",
        "Slask",
        "Slaunce",
        "Slaur",
        "Sleer",
        "Slemt",
        "Slike",
        "Slith",
        "Sloif",
        "Slorg",
        "Slorn",
        "Sluff",
        "Slynd",
        "Smeke",
        "Smete",
        "Smink",
        "Smold",
        "Snabe",
        "Snard",
        "Snarr",
        "Sneath",
        "Snurch",
        "Soick",
        "Solm",
        "Sool",
        "Soorve",
        "Sorl",
        "Sorm",
        "Sorn",
        "Sosz",
        "Sounx",
        "Sparll",
        "Splynd",
        "Sprake",
        "Squalj",
        "Sran",
        "Srend",
        "Sroon",
        "Stalb",
        "Starl",
        "Stelk",
        "Strangg",
        "Strix",
        "Strom",
        "Strowl",
        "Stuhr",
        "Styche",
        "Styre",
        "Suntz",
        "Suule",
        "Suusht",
        "Svinse",
        "Swaerk",
        "Swyst",
        "Syle",
        "Syoll",
        "Taede",
        "Tael",
        "Tak",
        "Tal",
        "Tanj",
        "Targ",
        "Targh",
        "Tark",
        "Tarl",
        "Tath",
        "Taus",
        "Tavv",
        "Taze",
        "Tchel",
        "Tcherm",
        "Tchoum",
        "Tebs",
        "Teelk",
        "Teern",
        "Teirn",
        "Telg",
        "Telk",
        "Terb",
        "Terre",
        "Tez",
        "Thaad",
        "Thaarn",
        "Thad",
        "Thaed",
        "Tham",
        "Thand",
        "Thang",
        "Thapp",
        "Thard",
        "Thark",
        "Thask",
        "Thaugh",
        "Thaum",
        "Thaurn",
        "Thawn",
        "Thax",
        "Theed",
        "Thesk",
        "Thevv",
        "Theyz",
        "Thirrf",
        "Tholk",
        "Thorm",
        "Thosk",
        "Thoure",
        "Thrak",
        "Thralf",
        "Thrand",
        "Thrasp",
        "Thrawl",
        "Thrawn",
        "Thrax",
        "Thrilce",
        "Thrizz",
        "Throck",
        "Thromb",
        "Throsp",
        "Thull",
        "Thuu",
        "Tl\xf6n",
        "Toal",
        "Tog",
        "Tol",
        "Tolg",
        "Tolm",
        "Tooz",
        "Torb",
        "Torje",
        "Torm",
        "Torr",
        "Torsk",
        "Torth",
        "Trahl",
        "Treel",
        "Treesk",
        "Trell",
        "Trem",
        "Treys",
        "Trild",
        "Trilse",
        "Trinx",
        "Trojj",
        "Tronf",
        "Trost",
        "Troyne",
        "Trulm",
        "Tsai",
        "Tsang",
        "Tselm",
        "Tsleg",
        "Tspoy",
        "Tsrome",
        "Tthann",
        "Tull",
        "Tvash",
        "Twez",
        "Twillx",
        "Tyae",
        "Tyfe",
        "Tyog",
        "Tzank",
        "Tzoy",
        "Ulm",
        "Urst",
        "Vaar",
        "Vaersl",
        "Vaist",
        "Valg",
        "Valtch",
        "Vand",
        "Vansh",
        "Var",
        "Vard",
        "Varl",
        "Vask",
        "Vass",
        "Vath",
        "Vaulx",
        "Vaus",
        "Vaxx",
        "Vayze",
        "Veb",
        "Veed",
        "Veeth",
        "Vegg",
        "Vek",
        "Velb",
        "Venk",
        "Venth",
        "Verle",
        "Vesp",
        "Veth",
        "Vilt",
        "Vipt",
        "Virl",
        "Virx",
        "Visk",
        "Viss",
        "Vist",
        "Vith",
        "Vlack",
        "Vlax",
        "Vleft",
        "Vloongh",
        "Vohm",
        "Volg",
        "Vool",
        "Voon",
        "Voor",
        "Vor",
        "Vorg",
        "Vorl",
        "Vorque",
        "Vorse",
        "Vort",
        "Vrahk",
        "Vrain",
        "Vramp",
        "Vreng",
        "Vrilx",
        "Vrosk",
        "Vroyce",
        "Vuul",
        "Wertz",
        "Wheld",
        "Whimk",
        "Whirx",
        "Whoord",
        "Wix",
        "Woise",
        "Wome",
        "Woorn",
        "Worrb",
        "Wrahz",
        "Wraime",
        "Wrax",
        "Wrhye",
        "Wrold",
        "Wrost",
        "Wurlp",
        "Wyast",
        "Wye",
        "Wynv",
        "Wyrn",
        "Xaayr",
        "Xaen",
        "Xaif",
        "Xain",
        "Xalm",
        "Xan",
        "Xarle",
        "Xas",
        "Xau",
        "Xean",
        "Xelb",
        "Xenve",
        "Xerth",
        "Xill",
        "Xin",
        "Xinsce",
        "Xis",
        "Xive",
        "Xix",
        "Xord",
        "Xoth",
        "Xush",
        "Xyle",
        "Xysc",
        "Yad",
        "Yagre",
        "Yaim",
        "Yand",
        "Yarl",
        "Yauce",
        "Yeb",
        "Yeerk",
        "Yend",
        "Yenj",
        "Yest",
        "Yhalm",
        "Yhe",
        "Yhem",
        "Yifth",
        "Yilb",
        "Yivv",
        "Yoort",
        "Yoth",
        "Yrr",
        "Yund",
        "Yush",
        "Yuun",
        "Zaar",
        "Zahn",
        "Zaidh",
        "Zaift",
        "Zaile",
        "Zaive",
        "Zand",
        "Zanq",
        "Zao",
        "Zaon",
        "Zaoth",
        "Zar",
        "Zash",
        "Zeft",
        "Zeige",
        "Zek",
        "Zell",
        "Zelm",
        "Zelth",
        "Zend",
        "Zha",
        "Zhash",
        "Zhayce",
        "Zherl",
        "Zhirth",
        "Zhool",
        "Zhorm",
        "Zhuul",
        "Zil",
        "Zilge",
        "Zinn",
        "Zixt",
        "Zlante",
        "Zlaque",
        "Zlar",
        "Zold",
        "Zook",
        "Zool",
        "Zoor",
        "Zor",
        "Zorl",
        "Zorn",
        "Zoth",
        "Zoul",
        "Zreethe",
        "Zull",
        "Zusque",
        "Zwerl",
        "Zynx",
        "Zyx"
    ],
    // Two syllabes
    [
        "Aahdret",
        "Aarlen",
        "Aasren",
        "Aastrasl",
        "Aban",
        "Abbith",
        "Ablif",
        "Aboas",
        "Abrance",
        "Abrax",
        "Abryn",
        "Abyok",
        "Acear",
        "Acfyst",
        "Achekk",
        "Achelse",
        "Achlarg",
        "Achren",
        "Achriss",
        "Ackvold",
        "Acram",
        "Acu",
        "Adaon",
        "Addanc",
        "Adeil",
        "Adire",
        "Adlay",
        "Adlen",
        "Adlon",
        "Admel",
        "Adoin",
        "Adon",
        "Adrek",
        "Adreln",
        "Adrich",
        "Adrilc",
        "Adurthe",
        "Aduush",
        "Aealim",
        "Aeddan",
        "Aedha",
        "Aedir",
        "Aedlynx",
        "Aeiran",
        "Aelis",
        "Aelma",
        "Aemon",
        "Aenet",
        "Aenthu",
        "Aeprox",
        "Aeren",
        "Aerind",
        "Aerkoon",
        "Aerkour",
        "Aerlithe",
        "Aeron",
        "Aeryle",
        "Aethlyr",
        "Aethon",
        "Afenk",
        "Affraig",
        "Afraaj",
        "Agburz",
        "Ageen",
        "Aghil",
        "Aghill",
        "Aglin",
        "Agroth",
        "Agwyn",
        "Agyorl",
        "Ahmr\xe9",
        "Aia",
        "Aiaia",
        "Aibmab",
        "Aidajn",
        "Aiden",
        "Aidon",
        "Aigol",
        "Ailcaer",
        "Aink\xe9",
        "Ainzu",
        "Airmid",
        "Aislinn",
        "Aislithe",
        "Aiza",
        "Aizan",
        "Ajaak",
        "Ajnaic",
        "Akaal",
        "Akar",
        "Akem",
        "Akhtar",
        "Akif",
        "Akii",
        "Akir",
        "Aklo",
        "Akon",
        "Akoorb",
        "Akrain",
        "Akshooth",
        "Akthrain",
        "Akvar",
        "Alao",
        "Alarre",
        "Albaize",
        "Albin",
        "Albrif",
        "Aldende",
        "Aldlor",
        "Aldlum",
        "Aldon",
        "Aldor",
        "Aldreb",
        "Aldred",
        "Aldren",
        "Aldryn",
        "Aldtas",
        "Alenthe",
        "Alfan",
        "Algus",
        "Alif",
        "Aling",
        "Aljic",
        "Aljric",
        "Allaire",
        "Allar",
        "Almaer",
        "Almeir",
        "Almen",
        "Alodd",
        "Alsob",
        "Altin",
        "Altur",
        "Alver",
        "Alya",
        "Amact",
        "Amair",
        "Ambard",
        "Ambeln",
        "Ambril",
        "Ameste",
        "Amfik",
        "Amkir",
        "Ammdar",
        "Ammek",
        "Amoyl",
        "Amphoth",
        "Amrath",
        "Amren",
        "Amyrg",
        "Amzar",
        "Anach",
        "Anar",
        "Anaz",
        "Ancharl",
        "Anclaar",
        "Anctash",
        "Andell",
        "Andjez",
        "Andon",
        "Andore",
        "Andorh",
        "Andrad",
        "Andreth",
        "Androlg",
        "Andrys",
        "Andval",
        "Anghra",
        "Anglame",
        "Angleem",
        "Anglock",
        "Anglor",
        "Angmor",
        "Angtai",
        "Anhlaw",
        "Anigg",
        "Anin",
        "Anjak",
        "Anjos",
        "Anken",
        "Ansher",
        "Ansoj",
        "Anson",
        "Antar",
        "Antarn",
        "Anthor",
        "Antrim",
        "Antriq",
        "Antrisp",
        "Anvar",
        "Anvyen",
        "Anxrin",
        "Anzire",
        "Aopharz",
        "Aophim",
        "Aquill",
        "Ara",
        "Araar",
        "Aradh",
        "Arak",
        "Aran",
        "Araste",
        "Araz",
        "Arbal",
        "Archam",
        "Archech",
        "Archite",
        "Arcus",
        "Ardann",
        "Ardesh",
        "Ardlen",
        "Ardoth",
        "Ardune",
        "Ardwar",
        "Ardwil",
        "Ardwile",
        "Areest",
        "Arell",
        "Argin",
        "Argorm",
        "Argrath",
        "Arhnaal",
        "Aribe",
        "Arick",
        "Arjhag",
        "Arkal",
        "Arkharn",
        "Arklow",
        "Arkrog",
        "Arlan",
        "Arlbeth",
        "Arldon",
        "Arlya",
        "Armast",
        "Armorn",
        "Armyze",
        "Arna",
        "Arnhor",
        "Arnid",
        "Arnlor",
        "Arnrost",
        "Aroinz",
        "Arrah",
        "Arrhod",
        "Arshel",
        "Artheen",
        "Arthex",
        "Artor",
        "Artus",
        "Arun",
        "Arvel",
        "Arvilk",
        "Arvol",
        "Arvox",
        "Arweld",
        "Aryem",
        "Aryft",
        "Aryon",
        "Aryph",
        "Aryus",
        "Arzang",
        "Arzi",
        "Asberl",
        "Ascelle",
        "Aschar",
        "Aschka",
        "Asco",
        "\xc4s\xeb",
        "Asgar",
        "Asgorn",
        "Ashan",
        "Ashane",
        "Ashbarl",
        "Ashed",
        "Ashild",
        "Ashlann",
        "Ashnyn",
        "Ashord",
        "Ashtah",
        "Ashur",
        "Askar",
        "Aspand",
        "Asrai",
        "Astei",
        "Astem",
        "Astha",
        "Astran",
        "Astrin",
        "Atang",
        "Atar",
        "Atdeel",
        "Ateng",
        "Athald",
        "Athar",
        "Athcroj",
        "Athlas",
        "Athlos",
        "Athmar",
        "Athquom",
        "Atlampt",
        "Atlank",
        "Atmaas",
        "Atmeh",
        "Atmog",
        "Atox",
        "Atraaf",
        "Atrend",
        "Atsal",
        "Attor",
        "Atyar",
        "Atyre",
        "Auchstyr",
        "Auchur",
        "Aucir",
        "Audric",
        "Aundan",
        "Aunxar",
        "Aurawn",
        "Aureth",
        "Auxid",
        "Avane",
        "Avarr",
        "Averq",
        "Avoon",
        "Avorn",
        "Awndale",
        "Axaane",
        "Axos",
        "Aya",
        "Aydras",
        "Ayen",
        "Ayin",
        "Ayir",
        "Ayla",
        "Aylmer",
        "Ayrish",
        "Ayshun",
        "Ayshung",
        "Azal",
        "Azash",
        "Azeal",
        "Azen",
        "Azgoth",
        "Azhrarn",
        "Azlon",
        "Azlyn",
        "Azmael",
        "Azorn",
        "Azoth",
        "Azra",
        "Azraq",
        "Azrean",
        "Azreck",
        "Azter",
        "Azzay",
        "Babdar",
        "Baccruz",
        "Baelil",
        "Bahar",
        "Baiar",
        "Baiern",
        "Baikaen",
        "Baiposk",
        "Bakan",
        "Bakra",
        "Balain",
        "Balaz",
        "Baldhur",
        "Baldrim",
        "Balgurr",
        "Balkar",
        "Balok",
        "Balour",
        "Banek",
        "Banffoge",
        "Bannheld",
        "Bannor",
        "Baraell",
        "Bardel",
        "Barduy",
        "Baren",
        "Barim",
        "Barind",
        "Barldsy",
        "Barlom",
        "Barlon",
        "Barltan",
        "Barnar",
        "Barood",
        "Baros",
        "Barrenc",
        "Barrin",
        "Bartain",
        "Basfric",
        "Basim",
        "Basmol",
        "Bassinth",
        "Bassto",
        "Bastarre",
        "Batrosque",
        "Bayven",
        "Bayzell",
        "Bazan",
        "Bazit",
        "Beclaan",
        "Bedane",
        "Bedese",
        "Beejlam",
        "Begnus",
        "Belan",
        "Belaz",
        "Belcoir",
        "Beleth",
        "Belgaun",
        "Belic",
        "Beljan",
        "Bellin",
        "Bellom",
        "Belmul",
        "Belnarth",
        "Belor",
        "Belorn",
        "Belot",
        "Belrain",
        "Belstos",
        "Belthan",
        "Belthis",
        "Belwilg",
        "Bengol",
        "B\xebol",
        "Beolj",
        "Beras",
        "Berclad",
        "Bercol",
        "Berik",
        "Berild",
        "Berim",
        "Berith",
        "Berlyne",
        "Berrec",
        "Bersem",
        "Bershar",
        "Bertrenk",
        "Berzik",
        "Bethmel",
        "Beyash",
        "Beyus",
        "Bezgrael",
        "Bezpar",
        "Bhoorva",
        "Biferb",
        "Biilar",
        "Bildesh",
        "Billosh",
        "Bilmar",
        "Bindle",
        "Biraad",
        "Birain",
        "Bireln",
        "Birta",
        "Bisel",
        "Bjanni",
        "Blauthike",
        "Bleran",
        "Bleskran",
        "Blonjerg",
        "Blorvind",
        "Blunyc",
        "Bodvar",
        "Bo\xebd",
        "Boggrah",
        "Bolaoz",
        "Bolthorn",
        "Borale",
        "Boren",
        "Borgald",
        "Borin",
        "Borlaith",
        "Borlas",
        "Borlid",
        "Borlo",
        "Borngah",
        "Borzer",
        "Boshan",
        "Bothar",
        "Botro",
        "Bouphar",
        "Bowjen",
        "Boyarl",
        "Braagen",
        "Bracca",
        "Braeklarn",
        "Bragen",
        "Brahan",
        "Brakkon",
        "Brala",
        "Brali",
        "Brallu",
        "Bralma",
        "Brandar",
        "Brandec",
        "Brangwej",
        "Branthu",
        "Brantys",
        "Branvaol",
        "Branzan",
        "Brascand",
        "Brasslin",
        "Braxen",
        "Braxtor",
        "Brealij",
        "Bredhal",
        "Breedast",
        "Bregem",
        "Brehen",
        "Breitsoj",
        "Brelkrov",
        "Brenen",
        "Brenlan",
        "Brestej",
        "Brethil",
        "Bretta",
        "Brevlyn",
        "Brevta",
        "Brielle",
        "Brindax",
        "Brindence",
        "Brintu",
        "Brinys",
        "Brislyn",
        "Brithael",
        "Brithric",
        "Brobal",
        "Brohnin",
        "Brona",
        "Broosin",
        "Broxus",
        "Brufod",
        "Brundelx",
        "Bryapka",
        "Brynit",
        "Buckrald",
        "Bulvet",
        "Burcan",
        "Burrgaut",
        "Bwermolc",
        "Byeloor",
        "Bylys",
        "Byrkast",
        "Byzar",
        "Cadairn",
        "Caddax",
        "Cadel",
        "Cadfrel",
        "Cadrach",
        "Cadreth",
        "Caecyn",
        "Caedfer",
        "Caelis",
        "Caerron",
        "Caillean",
        "Caiphul",
        "Cairon",
        "Caldel",
        "Calensch",
        "Calkdaev",
        "Calmic",
        "Calnor",
        "Calunn",
        "Calyz",
        "Calzan",
        "Camain",
        "Cambree",
        "Camdlon",
        "Camsar",
        "Candla",
        "Candrak",
        "Canelb",
        "Cangmor",
        "Canthar",
        "Cantrasc",
        "Caopha",
        "Caostri",
        "Caranth",
        "Carbrod",
        "Cardelv",
        "Carfheen",
        "Carlasc",
        "Carlinx",
        "Carnax",
        "Carnly",
        "Carnool",
        "Caroin",
        "Carquel",
        "Carthis",
        "Caskeil",
        "Castlon",
        "Cathlaid",
        "Caveesm",
        "Cavorn",
        "Cavosse",
        "Cavris",
        "Caynarv",
        "Cayrin",
        "Cazberr",
        "Cazyach",
        "Cedrim",
        "Cedrisk",
        "Ceilerse",
        "Celbarb",
        "Cemtruo",
        "Cenyth",
        "Ceraik",
        "Cercyon",
        "Cerdun",
        "Cerlint",
        "Cermor",
        "Cernon",
        "Cerra",
        "Cessair",
        "Cevir",
        "Ceylinn",
        "Chadan",
        "Chadlor",
        "Chadzik",
        "Chaemor",
        "Chagor",
        "Chalar",
        "Challem",
        "Challeth",
        "Chalvir",
        "Chambarr",
        "Changtsai",
        "Chanoth",
        "Chanti",
        "Cha\xf6l",
        "Charatze",
        "Charnyx",
        "Charresh",
        "Charyd",
        "Chaska",
        "Chaulet",
        "Chavir",
        "Chayim",
        "Chazane",
        "Chazgel",
        "Cheldor",
        "Chelim",
        "Chelprey",
        "Chelshrike",
        "Chendil",
        "Chenean",
        "Chenoa",
        "Cherla",
        "Chessene",
        "Chevonde",
        "Chezil",
        "Chial",
        "Chian",
        "Chigran",
        "Chimu",
        "Chimzil",
        "Chirril",
        "Chirthiz",
        "Chitrind",
        "Chlangi",
        "Chlodig",
        "Chlorild",
        "Chordash",
        "Chorrin",
        "Chrezel",
        "Chungaez",
        "Chunjan",
        "Chyvil",
        "Cidran",
        "Cilmar",
        "Cinctraic",
        "Ciraf",
        "Cirkin",
        "Cirnak",
        "Cista",
        "Civar",
        "Ciwan",
        "Clafaug",
        "Clarinn",
        "Cleedis",
        "Clendlim",
        "Clenvred",
        "Cligra",
        "Cloosag",
        "Cloralt",
        "Co\xe4x",
        "Cobord",
        "Cobrynth",
        "Coddry",
        "Cogarn",
        "Coimarn",
        "Colgrim",
        "Colyss",
        "Comnlan",
        "Conjerb",
        "Conjin",
        "Coram",
        "Corbrod",
        "Cordin",
        "Corem",
        "Coreme",
        "Corill",
        "Corince",
        "Cormast",
        "Corrysm",
        "Corsolle",
        "Couran",
        "Coyzan",
        "Cramog",
        "Craxan",
        "Craydarth",
        "Craye",
        "Creidah",
        "Crennex",
        "Crestarl",
        "Crestry",
        "Creydai",
        "Crezel",
        "Crilayth",
        "Crixbine",
        "Crochell",
        "Crolas",
        "Cromough",
        "Croquarne",
        "Cuddry",
        "Cuhaid",
        "Cullyn",
        "Curik",
        "Curin",
        "Curlask",
        "Cusheal",
        "Cusheth",
        "Cuttray",
        "Cyanril",
        "Cydace",
        "Cylenn",
        "Cynquil",
        "Cyrand",
        "Cyrib",
        "Cyrvemth",
        "Czarai",
        "Dabthan",
        "Dacil",
        "Daeglev",
        "Daelden",
        "Dafor",
        "Daghand",
        "Dagharz",
        "Dagir",
        "Dahiil",
        "Daikoon",
        "Dailenn",
        "Dakul",
        "Dakvon",
        "Dalain",
        "Dalanc",
        "Dalcraw",
        "Dalga",
        "Dalgirth",
        "Dalith",
        "Dalman",
        "Dalraev",
        "Dalsar",
        "Dalvai",
        "Dalvoc",
        "Dalwyn",
        "Damaal",
        "Damar",
        "Damesk",
        "Damrir",
        "Danchel",
        "Dandar",
        "Dandroan",
        "Danfis",
        "Dangrim",
        "Dankin",
        "Dantlee",
        "Daotar",
        "Daphrin",
        "Daplurn",
        "Dara",
        "Darach",
        "Darake",
        "Daran",
        "Darax",
        "Darbeel",
        "Darcer",
        "Darga",
        "Darglin",
        "Darinth",
        "Darjek",
        "Darjii",
        "Darlist",
        "Darlith",
        "Darmont",
        "Darmore",
        "Darnath",
        "Darnein",
        "Darnime",
        "Daron",
        "Darool",
        "Darsid",
        "Darsiiv",
        "Darsin",
        "Darvane",
        "Darven",
        "Darzed",
        "Darzha",
        "Dashgu",
        "Dasig",
        "Dastor",
        "Dastryn",
        "Daugas",
        "Daulaz",
        "Davar",
        "Daveld",
        "Davix",
        "Davlit",
        "Davras",
        "Davrou",
        "Davrune",
        "Dawfoke",
        "Daxon",
        "Dayko",
        "Daysase",
        "Daytar",
        "Deaclynd",
        "Debfin",
        "Dechru",
        "Deenos",
        "Delaur",
        "Delcold",
        "Deldrak",
        "Deleea",
        "Delente",
        "Delgath",
        "Delgaun",
        "Delmar",
        "Delna",
        "Delrean",
        "Delser",
        "Demgris",
        "Deneth",
        "Dengar",
        "Denlorn",
        "Derdain",
        "Derfel",
        "Dergast",
        "Derild",
        "Derlin",
        "Derlor",
        "Deroh",
        "Deron",
        "Derroll",
        "Dersarre",
        "Derthark",
        "Devolt",
        "Devreed",
        "Dhakos",
        "Dhornen",
        "Dhoumene",
        "Dhranak",
        "Dhyana",
        "Dialn",
        "Dibdrek",
        "Dilfar",
        "Dilgid",
        "Dilquay",
        "Dilvak",
        "Dinoor",
        "Diorne",
        "Diran",
        "Dirim",
        "Dirkalt",
        "Dirmalk",
        "Dirrach",
        "Dirrahk",
        "Dirvus",
        "Distar",
        "Disten",
        "Distran",
        "Ditrenth",
        "Divos",
        "Djarmon",
        "Djehla",
        "Djelha",
        "Djira",
        "Djola",
        "Dolljan",
        "Dolthar",
        "Dolvith",
        "Domede",
        "Domen",
        "Domin",
        "Domnux",
        "Domon",
        "Domvit",
        "Domwren",
        "Donet",
        "Donlaze",
        "Doran",
        "Dorath",
        "Dorgand",
        "Dorgath",
        "Dorhar",
        "Dorin",
        "Dornath",
        "Dornbain",
        "Dorok",
        "Dorsan",
        "Dorspaich",
        "Dortoom",
        "Dorvai",
        "Dostaan",
        "Doussa",
        "Dowflox",
        "Dozrig",
        "Dozthuk",
        "Drabsnar",
        "Dradoi",
        "Dradus",
        "Draegra",
        "Drakhor",
        "Drakhri",
        "Drakirn",
        "Drakkan",
        "Dralar",
        "Dramah",
        "Dramfer",
        "Draogat",
        "Drassonne",
        "Drauphor",
        "Draven",
        "Draxok",
        "Drayley",
        "Drayven",
        "Drazvec",
        "Drebyss",
        "Dreezhan",
        "Drefest",
        "Dreggol",
        "Dreintor",
        "Drellefe",
        "Drenfust",
        "Drengar",
        "Drethlec",
        "Drevark",
        "Dreynel",
        "Drezael",
        "Drezaem",
        "Drilant",
        "Drimmis",
        "Drinda",
        "Dringle",
        "Drion",
        "Drissa",
        "Dristirk",
        "Drocolg",
        "Drogan",
        "Drohulse",
        "Droilfin",
        "Drokoag",
        "Dronasp",
        "Druchor",
        "Drunal",
        "Drusilf",
        "Dryduos",
        "Duarn",
        "Duergan",
        "Dulith",
        "Dulkarn",
        "Dulkast",
        "Dunry",
        "Durnik",
        "Durzin",
        "Duskim",
        "Duubown",
        "Dvorast",
        "Dwendlim",
        "Dwyvach",
        "Dygard",
        "Dylenx",
        "Dymnash",
        "Dynqua",
        "Dynroth",
        "Dyoni",
        "Dyshim",
        "Dyskrahn",
        "Dytheus",
        "Dyvim",
        "Dyzant",
        "Dzoraug",
        "Easval",
        "Ebane",
        "Ebur",
        "Echael",
        "Echross",
        "Eclane",
        "Edcyl",
        "Eddar",
        "Eddax",
        "Eddor",
        "Edeth",
        "Edhil",
        "Edrun",
        "Eduu",
        "Eehatt",
        "Eelek",
        "Eelgren",
        "Eerban",
        "Eglarth",
        "Egron",
        "Ehilm",
        "Ehlmat",
        "Ehlreth",
        "Eidon",
        "Eidrinn",
        "Eilif",
        "Einar",
        "Eirecht",
        "Eithn\xe9",
        "Ejence",
        "Ekvarl",
        "Elaen",
        "Eland",
        "Elath",
        "Eldin",
        "Eldix",
        "Eldrab",
        "Eldron",
        "Eldru",
        "Elek",
        "Elem",
        "Elfreth",
        "Elgroth",
        "Elkin",
        "Elkleth",
        "Ellern",
        "Ellrass",
        "Elmral",
        "Elnume",
        "Elod",
        "Elran",
        "Elriph",
        "Elu",
        "Elvrit",
        "Elyx",
        "Elzast",
        "Emal",
        "Emberle",
        "Emdel",
        "Emerl",
        "Emgar",
        "Emton",
        "Enban",
        "Encarth",
        "Endrade",
        "Endril",
        "Enferth",
        "Englin",
        "Enkim",
        "Ennek",
        "Enris",
        "Enrost",
        "Enskel",
        "Ensorn",
        "Envess",
        "Enzhai",
        "Ephelt",
        "Ephraj",
        "Ephti",
        "Ephyre",
        "Eppent",
        "Eppin",
        "Erbmaj",
        "Erdlan",
        "Ergar",
        "Ergoth",
        "Ergron",
        "Erhil",
        "Erijn",
        "Ermon",
        "Ermor",
        "Eron",
        "Errain",
        "Errone",
        "Erson",
        "Erwat",
        "Erxab",
        "Escande",
        "Esceft",
        "Esdrix",
        "Esghar",
        "Eshrik",
        "Eshuur",
        "Eskarn",
        "Eslyn",
        "Esris",
        "Essa",
        "Estrag",
        "Estorl",
        "Estrif",
        "Esyfe",
        "Ethrene",
        "Euross",
        "Evelj",
        "Evinth",
        "Evith",
        "Evorn",
        "Evska",
        "Ewlon",
        "Eyphra",
        "Eythor",
        "Ezail",
        "Ezmi",
        "Ezri",
        "Fabolde",
        "Fadar",
        "Faendyre",
        "Faesten",
        "Faffle",
        "Fafnalg",
        "Faiorg",
        "Falbin",
        "Falcarn",
        "Falgar",
        "Falhehn",
        "Fali",
        "Falldrijn",
        "Falsfeen",
        "Falslen",
        "Falume",
        "Fanchel",
        "Faran",
        "Fardoth",
        "Fardron",
        "Farglid",
        "Farhaude",
        "Farleit",
        "Farli",
        "Farmolj",
        "Farnek",
        "Farngold",
        "Farngor",
        "Faroon",
        "Farosh",
        "Farrain",
        "Farscall",
        "Farsun",
        "Farunst",
        "Farzdoy",
        "Fasthes",
        "Fautell",
        "Favuld",
        "Favvaz",
        "Fayel",
        "Faygrenn",
        "Faylaol",
        "Faylynn",
        "Fayol",
        "Fazhal",
        "Fazzur",
        "Feeming",
        "Feikry",
        "Feirrex",
        "Felinx",
        "Felnar",
        "Felor",
        "Felstar",
        "Felthund",
        "Felvrand",
        "Femigg",
        "Fendahl",
        "Fendrabe",
        "Fenew",
        "Fenic",
        "Fenist",
        "Fenleith",
        "Fennus",
        "Fenrald",
        "Fenzil",
        "Feorth",
        "Ferman",
        "Fermern",
        "Fernath",
        "Ferndel",
        "Fernhol",
        "Fernool",
        "Fernosk",
        "Ferram",
        "Ferthel",
        "Fervigg",
        "Ferwend",
        "Fesru",
        "Fethlan",
        "Feyan",
        "Feyern",
        "Fhorat",
        "Fiantz",
        "Fictyr",
        "Figgin",
        "Fiiya",
        "Filtarg",
        "Fingril",
        "Finstar",
        "Firca",
        "Firga",
        "Firin",
        "Firon",
        "Fiskroll",
        "Fissworx",
        "Flauleck",
        "Flayna",
        "Flestrin",
        "Fletchen",
        "Flikir",
        "Flingrel",
        "Flitan",
        "Flixis",
        "Foarad",
        "Fodusk",
        "Fogrin",
        "Fohdon",
        "Folstin",
        "Fomkrin",
        "Fontand",
        "Foozan",
        "Foragh",
        "Forang",
        "Foraujh",
        "Forbulse",
        "Foren",
        "Forjisk",
        "Formki",
        "Fornoar",
        "Foros",
        "Forroosk",
        "Forstine",
        "Fortrelce",
        "Forvael",
        "Fozgiel",
        "Frama",
        "Franaard",
        "Frannon",
        "Frashtol",
        "Frayja",
        "Freasand",
        "Fremmoun",
        "Frillox",
        "Friston",
        "Frixeen",
        "Frolin",
        "Frondir",
        "Fronost",
        "Fronubb",
        "Froscele",
        "Frowal",
        "Fruwasp",
        "Ftoomi",
        "Fulshin",
        "Fulume",
        "Fumpsil",
        "Furtloft",
        "Fusraul",
        "Fylin",
        "Fylssa",
        "Fyojhkor",
        "Fy\xf6nn",
        "Fyza",
        "Gaatel",
        "Gadan",
        "Gadoc",
        "Gadra",
        "Gadri",
        "Gaenlea",
        "Gaerlind",
        "Gaerris",
        "Gafael",
        "Gaisherl",
        "Gajiste",
        "Gakaal",
        "Galaart",
        "Galach",
        "Galaij",
        "Galan",
        "Galbaaz",
        "Galchan",
        "Galdoir",
        "Galenx",
        "Galind",
        "Gallarg",
        "Gallasp",
        "Galmad",
        "Galron",
        "Galsdor",
        "Galvrix",
        "Gambrax",
        "Gamitz",
        "Gamkya",
        "Ganaek",
        "Gandril",
        "Ganerth",
        "Ganerve",
        "Ganix",
        "Gankor",
        "Ganock",
        "Gareck",
        "Gareld",
        "Garhaft",
        "Garlan",
        "Garol",
        "Garon",
        "Garos",
        "Garpast",
        "Garras",
        "Garron",
        "Garstrang",
        "Garstrith",
        "Garthag",
        "Garthaun",
        "Garven",
        "Gathen",
        "Gaunmar",
        "Gaurbal",
        "Gavrok",
        "Gawend",
        "Gaxtor",
        "Gazwylg",
        "Gearna",
        "Geaxa",
        "Gebrence",
        "Gebrow",
        "Gechart",
        "Gechrak",
        "Gedreth",
        "Geerharg",
        "Gehed",
        "Gelan",
        "Gelann",
        "Geldol",
        "Gelwik",
        "Gemal",
        "Gemelf",
        "Genglar",
        "Gerant",
        "Gerin",
        "Gerlant",
        "Geroind",
        "Gerreint",
        "Gerren",
        "Gesin",
        "Gethen",
        "Gezdrey",
        "Ghaachev",
        "Gharlane",
        "Ghatar",
        "Ghatha",
        "Ghellence",
        "Gherent",
        "Gherlan",
        "Ghirra",
        "Ghomnir",
        "Ghralence",
        "Giaj",
        "Gilboch",
        "Gildor",
        "Gildren",
        "Gildrift",
        "Gilflin",
        "Gilir",
        "Gilith",
        "Gillyn",
        "Gilmir",
        "Gilmirst",
        "Gilnar",
        "Gilorn",
        "Gilos",
        "Gilva",
        "Gilvar",
        "Gimeld",
        "Gimlej",
        "Gimnel",
        "Ginnen",
        "Ginorsh",
        "Girbeaux",
        "Girin",
        "Girzan",
        "Gisgin",
        "Githeld",
        "Githew",
        "Gitlan",
        "Gitril",
        "Gittos",
        "Gizralle",
        "Glaeloth",
        "Glaernex",
        "Glaraum",
        "Glasdray",
        "Glasquel",
        "Glaury",
        "Glayant",
        "Gleada",
        "Glebur",
        "Glethlot",
        "Gleyden",
        "Glianth",
        "Glidnimm",
        "Glimanthe",
        "Glirice",
        "Glirrish",
        "Gloisur",
        "Glowan",
        "Glufjyn",
        "Glyngal",
        "Glynzel",
        "Glystraine",
        "Gnasthor",
        "Gnasthra",
        "Gnivlah",
        "Gnohesk",
        "Gnorri",
        "Gnospret",
        "Gobar",
        "Goklod",
        "Golluer",
        "Gomar",
        "Gondrift",
        "Gonjal",
        "Gorad",
        "Gorgost",
        "Gorin",
        "Gorinssk",
        "Gorklu",
        "Gorlis",
        "Gormane",
        "Gornik",
        "Gorshay",
        "Goryon",
        "Gossparl",
        "Gothel",
        "Grachar",
        "Graequil",
        "Graghan",
        "Grahault",
        "Grainim",
        "Granik",
        "Granlon",
        "Gravec",
        "Greavdal",
        "Greelar",
        "Greethrin",
        "Greforn",
        "Grehuse",
        "Grekith",
        "Gremdahl",
        "Grendax",
        "Grennath",
        "Grenslae",
        "Grenvin",
        "Greorle",
        "Grevam",
        "Greyfell",
        "Griam",
        "Grian",
        "Griea",
        "Griffix",
        "Grifnid",
        "Grindan",
        "Grishulf",
        "Gristis",
        "Griswald",
        "Grittu",
        "Grivalx",
        "Gro\xe4xx",
        "Grombul",
        "Grondar",
        "Grortam",
        "Grulbest",
        "Grussex",
        "Grydon",
        "Gryemox",
        "Grykar",
        "Grypha",
        "Guhan",
        "Guhlnor",
        "Gulla",
        "Gulzund",
        "Gunshird",
        "Gunthal",
        "Gunthar",
        "Gunzhur",
        "Gurdam",
        "Gurjan",
        "Gustay",
        "Guthril",
        "Gwacyn",
        "Gwaihir",
        "Gweddyn",
        "Gweien",
        "Gwenca",
        "Gwendald",
        "Gwepfrath",
        "Gwesder",
        "Gwildor",
        "Gwithra",
        "Gwomyr",
        "Gwyran",
        "Gwythinst",
        "Gy\xe1n",
        "Gylrath",
        "Gy\xf3rb",
        "Gyriss",
        "Gyrlaen",
        "Gyrlath",
        "Gysankh",
        "Gyseyt",
        "Gystral",
        "Haakrim",
        "Haarstrin",
        "Habmarl",
        "Hadan",
        "Hadar",
        "Hadarg",
        "Hado",
        "Hadrim",
        "Hadron",
        "Haestan",
        "Haefgan",
        "Hafthir",
        "Hagith",
        "Hagra",
        "Haidelth",
        "Haijiss",
        "Hainen",
        "Hakhoim",
        "Haklar",
        "Haklor",
        "Hakpard",
        "Hala",
        "Halbex",
        "Halborn",
        "Haldor",
        "Haloth",
        "Halperle",
        "Halsan",
        "Hal\xfbt",
        "Halvner",
        "Hamba",
        "Hamisk",
        "Hanastre",
        "Handra",
        "Hanil",
        "Hanierth",
        "Hanith",
        "Hantar",
        "Hanthryn",
        "Hapvar",
        "Haral",
        "Harave",
        "Harchyl",
        "Harfare",
        "Hargan",
        "Harnir",
        "Harntil",
        "Harnyrse",
        "Harpann",
        "Harran",
        "Harrelm",
        "Harstar",
        "Hartaz",
        "Harthan",
        "Harthex",
        "Harthran",
        "Hartrond",
        "Harvas",
        "Harvel",
        "Harzelle",
        "Haspid",
        "Hasrick",
        "Hatchiss",
        "Hatrasd",
        "Havin",
        "Havrel",
        "Hawklin",
        "Hawkram",
        "Hawkran",
        "Hawkreld",
        "Hawleet",
        "Hawljin",
        "Hawtran",
        "Haxas",
        "Hazgarl",
        "Hazkar",
        "Hazrond",
        "Hazvelc",
        "Hazyrg",
        "Hazzal",
        "Hearroj",
        "Hedin",
        "Heenarg",
        "Heengul",
        "Hefpyre",
        "Heinvroh",
        "Helaz",
        "Heldix",
        "Helflitz",
        "Helir",
        "Helsdal",
        "Helsur",
        "Helvem",
        "Hembra",
        "Heram",
        "Herisk",
        "Herndre",
        "Herrul",
        "Herthose",
        "Herym",
        "Herzick",
        "Hespek",
        "Hesrel",
        "Hessun",
        "Hetcroft",
        "Hethar",
        "Hethra",
        "Heurhyl",
        "Hexil",
        "Hezron",
        "Heztor",
        "Hibriss",
        "Hienn",
        "Hiffelk",
        "Hifforn",
        "Hifryn",
        "Hildred",
        "Hilix",
        "Hiljin",
        "Hilxin",
        "Himlon",
        "Himon",
        "Himvli",
        "Hinthan",
        "Hinzay",
        "Hireal",
        "Hirrean",
        "Hisrilf",
        "Hisvran",
        "Hizar",
        "Hizron",
        "Hjalmar",
        "Hjeldin",
        "Hjordrik",
        "Hlyrmis",
        "Hobtalg",
        "Hoesgald",
        "Holay",
        "Holgar",
        "Hollox",
        "Holthan",
        "Homli",
        "Honturg",
        "Hophand",
        "Hoprig",
        "Horan",
        "Horglin",
        "Horjak",
        "Horlask",
        "Hormatz",
        "Horond",
        "Horros",
        "Horthoon",
        "Horzak",
        "Hotath",
        "Hothcog",
        "Hothcol",
        "Hrasha",
        "Hrasquer",
        "Hrelar",
        "Hresheuth",
        "Hrinspire",
        "Hroleur",
        "Hr\xf6nir",
        "Hrossa",
        "Hrostar",
        "Hsaptren",
        "Humbuss",
        "Humquor",
        "Hunard",
        "Hundar",
        "Hurcad",
        "Hurgal",
        "Hurnod",
        "Hurrisk",
        "Hursin",
        "Hurvin",
        "Hurym",
        "Hussuln",
        "Huusim",
        "Hyarante",
        "Hyfryn",
        "Hylar",
        "Hyssome",
        "Hyxley",
        "Hyzail",
        "Hyzen",
        "Ibchol",
        "Ibizt",
        "Ibrolg",
        "Ica",
        "Ictar",
        "Iduun",
        "Ighai",
        "Ignale",
        "Ignire",
        "Igraa",
        "Igresk",
        "Iijind",
        "Iithkin",
        "Ijeng",
        "Ikalss",
        "Ikeen",
        "Ikkrish",
        "Ikl\xe9y",
        "Ildel",
        "Ildelft",
        "Ildin",
        "Ildis",
        "Ildnarr",
        "Illa",
        "Illyis",
        "Ilnim",
        "Ilruhn",
        "Ilsuor",
        "Ilthoss",
        "Iltrilt",
        "Iltrogh",
        "Ilva",
        "Ilvar",
        "Ilxar",
        "Ilyag",
        "Imcanx",
        "Imcolg",
        "Imdiv",
        "Imhas",
        "Immak",
        "Immoyr",
        "Imnarl",
        "Impag",
        "Imrib",
        "Imrift",
        "Imtsith",
        "Indlech",
        "Indloth",
        "Indlut",
        "Indred",
        "Ingarh",
        "Ingelk",
        "Ingen",
        "Inghar",
        "Ingolm",
        "Ingrald",
        "Inilv",
        "Inis",
        "Innluu",
        "Inoke",
        "Inslar",
        "Iom",
        "Ipshoom",
        "Iraiz",
        "Iras",
        "Irauld",
        "Iraunt",
        "Irbry",
        "Irchel",
        "Irex",
        "Irglas",
        "Irlen",
        "Irough",
        "Irrash",
        "Irrax",
        "Irsai",
        "Iruste",
        "Irwick",
        "Irxeath",
        "Isbard",
        "Ishan",
        "Ishenx",
        "Ishgan",
        "Ishkar",
        "Ishlak",
        "Ishshan",
        "Ishya",
        "Islarch",
        "Ismlok",
        "Isorn",
        "Isphek",
        "Issa",
        "Isstan",
        "Itaaq",
        "Ithend",
        "Ithkaar",
        "Ithome",
        "Ivaade",
        "Ivaire",
        "Ivind",
        "Ivool",
        "Ivorn",
        "Ivral",
        "Ivran",
        "Ivrax",
        "Ivyd",
        "Ivyod",
        "Ixan",
        "Ixaq",
        "Ixor",
        "Iygin",
        "Izinth",
        "Izleng",
        "Izmisk",
        "Iztra",
        "Izvire",
        "Jaadis",
        "Jaagix",
        "Jaalmez",
        "Jaalon",
        "Jaaluth",
        "Jablant",
        "Jacor",
        "Jadir",
        "Jado",
        "Jadoorm",
        "Jaedan",
        "Jaelyss",
        "Jagan",
        "Jaggol",
        "Jagrid",
        "Jahir",
        "Jahrgrim",
        "Jaidu",
        "Jaldeer",
        "Jalmid",
        "Jalom",
        "Jama",
        "Janam",
        "Janan",
        "Jandix",
        "Janlay",
        "Jano",
        "Janrass",
        "Jantust",
        "Janu",
        "Japloon",
        "Jarad",
        "Jarilz",
        "Jariz",
        "Jarlew",
        "Jarlith",
        "Jarngor",
        "Jarra",
        "Jartak",
        "Jartusk",
        "Jarveen",
        "Jarvil",
        "Jarvix",
        "Jarzad",
        "Jasir",
        "Jasphar",
        "Jaswen",
        "Jaussig",
        "Jautan",
        "Javen",
        "Javert",
        "Javrik",
        "Javtir",
        "Jaxal",
        "Jaxel",
        "Jaylence",
        "Jazanne",
        "Jazraal",
        "Jazrel",
        "Jazrode",
        "Jebhart",
        "Jedra",
        "Jeeldor",
        "Jeelteg",
        "Jehzehr",
        "Jelthar",
        "Jekkar",
        "Jelantru",
        "Jelday",
        "Jeldor",
        "Jelym",
        "Jenbow",
        "Jendarr",
        "Jenkisk",
        "Jerdys",
        "Jerec",
        "Jerel",
        "Jerim",
        "Jessel",
        "Jetashe",
        "Jethrik",
        "Jeven",
        "Jevist",
        "Jezreel",
        "Jezzar",
        "Jezzra",
        "Jhebdaeg",
        "Jheexadh",
        "Jheluth",
        "Jherrox",
        "Jhinarr",
        "Jhinith",
        "Jhorin",
        "Jhourlann",
        "Jhumpoust",
        "Jhuvar",
        "Jiaf",
        "Jianc",
        "Jiglak",
        "Jihalg",
        "Jilsa",
        "Jiltarn",
        "Jinnow",
        "Jintlorn",
        "Jinvik",
        "Jiral",
        "Jirnon",
        "Jirnost",
        "Jisa",
        "Jithrast",
        "Jixile",
        "Joamorsk",
        "Jobel",
        "Jolrant",
        "Jolsir",
        "Jomec",
        "Jomsut",
        "Jondar",
        "Jooskan",
        "Jorad",
        "Jorael",
        "Joram",
        "Joran",
        "Jorel",
        "Jornic",
        "Joron",
        "Jorvim",
        "Joskyl",
        "Jossak",
        "Jostib",
        "Jothal",
        "Jovaine",
        "Joysair",
        "Jugeen",
        "Juldrake",
        "Julix",
        "Julphra",
        "Jultus",
        "Jungro",
        "Junnar",
        "Jurin",
        "Jurinn",
        "Jurret",
        "Jushdak",
        "Justix",
        "Juthcot",
        "Juxpire",
        "Jynyx",
        "Jyvlex",
        "Kaanpell",
        "Kadjix",
        "Kaerjeld",
        "Kaggoth",
        "Kagolm",
        "Kahlan",
        "Kahmahr",
        "Kaiya",
        "Kaklo",
        "Kaldrak",
        "Kalduk",
        "Kalen",
        "Kaliss",
        "Kallak",
        "Kalshai",
        "Kalthen",
        "Kalvek",
        "Kalvran",
        "Kalxin",
        "Kaman",
        "Kamlant",
        "Kamon",
        "Kander",
        "Kangmir",
        "Kangmor",
        "Kanliin",
        "Kanpo",
        "Kantar",
        "Kanthrix",
        "Kantran",
        "Kanven",
        "Kaplull",
        "Karchad",
        "Karchen",
        "Karchoy",
        "Karcist",
        "Karect",
        "Kareeb",
        "Kargon",
        "Karjin",
        "Karjus",
        "Karkrust",
        "Karnek",
        "Karrax",
        "Karrim",
        "Karsa",
        "Karstall",
        "Kartol",
        "Kasel",
        "Kashir",
        "Kashtuul",
        "Kaspim",
        "Kaspin",
        "Kassar",
        "Katan",
        "Kathak",
        "Kathar",
        "Kathasp",
        "Kathor",
        "Kattelg",
        "Kattra",
        "Kaukris",
        "Kavar",
        "Kavarl",
        "Kavath",
        "Kavis",
        "Kavor",
        "Kayesp",
        "Kayris",
        "Kazarn",
        "Keanca",
        "Kedern",
        "Keerlin",
        "Keermeth",
        "Kegryn",
        "Keigtril",
        "Kekkan",
        "Kelar",
        "Keldar",
        "Kelgus",
        "Kelkor",
        "Kelmar",
        "Kelner",
        "Kelrac",
        "Kelshiir",
        "Kelver",
        "Kelvon",
        "Kelvyath",
        "Kember",
        "Kembriss",
        "Kemoy",
        "Kenshlin",
        "Keraan",
        "Kerdal",
        "Kered",
        "Kerrol",
        "Kersenct",
        "Keru",
        "Kerzard",
        "Kesdric",
        "Kesnahr",
        "Kespeth",
        "Kesrack",
        "Kesrick",
        "Kethdjal",
        "Kethrak",
        "Kevlad",
        "Kexy",
        "Kezven",
        "Khadar",
        "Khadys",
        "Khalart",
        "Khaldan",
        "Khalir",
        "Kheverl",
        "Khondru",
        "Khordov",
        "Khrissa",
        "Khrithra",
        "Khrosa",
        "Khudrax",
        "Khugweb",
        "Kian",
        "Kibbath",
        "Kibha",
        "Kidash",
        "Kiirmu",
        "Kijmin",
        "Kikrasht",
        "Kilas",
        "Kilat",
        "Kilgand",
        "Kilisp",
        "Kilmin",
        "Kimda",
        "Kinduhr",
        "Kinorm",
        "Kinzroft",
        "Kipplob",
        "Kirdon",
        "Kirklen",
        "Kiroum",
        "Kirrax",
        "Kirun",
        "Kirskar",
        "Kirzav",
        "Kisarld",
        "Kishin",
        "Kismer",
        "Kismerle",
        "Kisprimn",
        "Kiston",
        "Kisvord",
        "Kithert",
        "Kithorsk",
        "Kithund",
        "Kithvor",
        "Kivan",
        "Kivooz",
        "Kivoum",
        "Kixime",
        "Kizmay",
        "Kjeldor",
        "Kjindar",
        "Koabon",
        "Kofoum",
        "Koino",
        "Kolbect",
        "Kolchash",
        "Kolduk",
        "Kolthya",
        "Kolvram",
        "Konvain",
        "Korak",
        "Korban",
        "Kordale",
        "Koren",
        "Koreth",
        "Korghil",
        "Korix",
        "Korlisk",
        "Kornor",
        "Kornud",
        "Korok",
        "Korrik",
        "Korsal",
        "Korseng",
        "Kortael",
        "Kortenj",
        "Korthoon",
        "Koruk",
        "Korusk",
        "Korvar",
        "Kosjourn",
        "Kothar",
        "Koxir",
        "Kozzir",
        "Kraatin",
        "Krallorn",
        "Krana",
        "Krangar",
        "Kranorn",
        "Krantheer",
        "Krantor",
        "Kredhal",
        "Kregnux",
        "Krelgar",
        "Krentomzh",
        "Kressen",
        "Krexnahr",
        "Krillon",
        "Krissenq",
        "Kro\xebld",
        "Krotald",
        "Krotar",
        "Krotem",
        "Kruchaen",
        "Krynerl",
        "Kugar",
        "Kuldrah",
        "Kulik",
        "Kulleest",
        "Kulxel",
        "Kunatht",
        "Kurdghar",
        "Kurgnar",
        "Kuruz",
        "Kurvos",
        "Kushish",
        "Kydra",
        "Kyladz",
        "Kylcrum",
        "Kylix",
        "Kyllam",
        "Kymen",
        "Kyrake",
        "Kyrmo",
        "Kyrsha",
        "Kyshi",
        "Kysho",
        "Laabrun",
        "Laarskim",
        "Laconde",
        "La\xebl",
        "Lagu",
        "Lailaske",
        "Laithare",
        "Lakis",
        "Lalan",
        "Lalit",
        "Lalun",
        "Lampor",
        "Lanaar",
        "Landish",
        "Landreth",
        "Langbar",
        "Lanreex",
        "Lanscitt",
        "Lanteld",
        "Lantis",
        "Lantos",
        "Lanvilt",
        "Lanycth",
        "Lanzee",
        "Lanzept",
        "Larbrun",
        "Laresm",
        "Larid",
        "Larind",
        "Larkrosp",
        "Lasquor",
        "Lathir",
        "Lathmarc",
        "Latra",
        "Laudrin",
        "Laxar",
        "Laydor",
        "Layek",
        "Lazelle",
        "Ledmai",
        "Leela",
        "Leena",
        "Leerank",
        "Leesclar",
        "Leggwyt",
        "Leghast",
        "Lehun",
        "Leistorn",
        "Lembarl",
        "Lemgaar",
        "Lemtarn",
        "Lendra",
        "Lensith",
        "Lenzeel",
        "Lephais",
        "Lephern",
        "Leqquan",
        "Lerdeln",
        "Lerlya",
        "Lermest",
        "Lerquint",
        "Lestin",
        "Letek",
        "Lexan",
        "Lextraa",
        "Leystorne",
        "Lherache",
        "Lhusark",
        "Liance",
        "Libourne",
        "Lidrill",
        "Lilir",
        "Lilnid",
        "Liltar",
        "Limdal",
        "Limhoth",
        "Limka",
        "Limson",
        "Lindarl",
        "Lindlorn",
        "Linlaith",
        "Linmer",
        "Linor",
        "Linspar",
        "Lintan",
        "Lintra",
        "Liosse",
        "Liphrodd",
        "Lirram",
        "Lishran",
        "Liskeel",
        "Lissar",
        "Lisstar",
        "Lisstra",
        "Liston",
        "Lisvorn",
        "Litheem",
        "Lithrad",
        "Littwyst",
        "Lixelle",
        "Lixeth",
        "Lixter",
        "Lizki",
        "Lobror",
        "Logas",
        "Lohmi",
        "Loiarl",
        "Loomar",
        "Loorin",
        "Loorzig",
        "Loraem",
        "Loral",
        "Lorbis",
        "Lorrhin",
        "Lorrin",
        "Lorvra",
        "Lothilv",
        "Louwend",
        "Lovoz",
        "Loxzor",
        "Luast",
        "Lubist",
        "Lucenne",
        "Lufraut",
        "Lumas",
        "Lumfa",
        "Lunzar",
        "Lurand",
        "Lurash",
        "Lurin",
        "Luscan",
        "Lutril",
        "Luzfel",
        "Lyanec",
        "Lye\xfcm",
        "Lylix",
        "Lyra",
        "Lyrin",
        "Lyron",
        "Maaga",
        "Macra",
        "Macrad",
        "Maefon",
        "Maegwin",
        "Maerraent",
        "Magalph",
        "Maghan",
        "Maglone",
        "Magmarl",
        "Magnyck",
        "Mahhri",
        "Mahrik",
        "Maidah",
        "Maidak",
        "Mairish",
        "Maisa",
        "Maisan",
        "Majan",
        "Makamb",
        "Makisp",
        "Malak",
        "Malasc",
        "Malber",
        "Malboe",
        "Malda",
        "Maldock",
        "Malfar",
        "Malgrah",
        "Malheme",
        "Malinsp",
        "Malkorf",
        "Malnurb",
        "Malthen",
        "Maltheus",
        "Malthgri",
        "Malthor",
        "Malvisp",
        "Malwer",
        "Malzh\xe9",
        "Mandrask",
        "Manggrim",
        "Mankril",
        "Manthi",
        "Manton",
        "Ma\xf6l",
        "Mapyn",
        "Marack",
        "Maraide",
        "Marasp",
        "Marath",
        "Marax",
        "Marclaw",
        "Marcoorg",
        "Mardhrene",
        "Mardix",
        "Mardur",
        "Mareft",
        "Marhalk",
        "Marhart",
        "Marjaan",
        "Markryn",
        "Marlath",
        "Marlock",
        "Marnec",
        "Maroosh",
        "Marost",
        "Marrek",
        "Marrhal",
        "Marrhan",
        "Marril",
        "Marslin",
        "Marslai",
        "Martheel",
        "Marul",
        "Marvold",
        "Marwhool",
        "Mascrox",
        "Maskrulp",
        "Masplern",
        "Masply",
        "Masquoor",
        "Masryn",
        "Massac",
        "Mastram",
        "Mastrith",
        "Mastruse",
        "Mathgi",
        "Mathlin",
        "Mattraw",
        "Matzin",
        "Maularn",
        "Maundrib",
        "Maurdax",
        "Maustere",
        "Mavasce",
        "Mavic",
        "Mavkert",
        "Mavour",
        "Maxil",
        "Mayern",
        "Maylern",
        "Maylin",
        "Mayrime",
        "Mazzyott",
        "Medarm",
        "Meder",
        "Medist",
        "Meeratz",
        "Meffroa",
        "Mefron",
        "Meglos",
        "Megwen",
        "Mejea",
        "Mekosp",
        "Melaunce",
        "Meldresc",
        "Meleas",
        "Melib",
        "Melisk",
        "Meljarn",
        "Melkur",
        "Melleg",
        "Mellore",
        "Melnayl",
        "Melnyth",
        "Melshiv",
        "Melslem",
        "Melviig",
        "Mendra",
        "Mengisp",
        "Menksoor",
        "Menna",
        "Mephyr",
        "Merdim",
        "Merewn",
        "Merkal",
        "Merkan",
        "Merley",
        "Mermold",
        "Mermoth",
        "Merngar",
        "Merophe",
        "Merresh",
        "Merrest",
        "Merrost",
        "Merryn",
        "Mershun",
        "Mersic",
        "Mersna",
        "Merssan",
        "Merthyr",
        "Merweld",
        "Mesrah",
        "Mesrawn",
        "Mestorl",
        "Mestrin",
        "Methnos",
        "Metrosq",
        "Mevid",
        "Mezard",
        "Mhoran",
        "Mhordaal",
        "Mhovair",
        "Mhurdaal",
        "Mhyrrail",
        "Mianth",
        "Mibris",
        "Micrum",
        "Mida",
        "Midor",
        "Mifrax",
        "Migglin",
        "Mijar",
        "Mijhyk",
        "Mikird",
        "Mileern",
        "Milzrik",
        "Mimur",
        "Minom",
        "Minvra",
        "Minyal",
        "Miraad",
        "Mirach",
        "Mircheld",
        "Mirdain",
        "Mirdij",
        "Mirdole",
        "Mireth",
        "Mirglish",
        "Mirhaz",
        "Mirikke",
        "Mirja",
        "Mirjanth",
        "Mirjenx",
        "Mirkaise",
        "Mirkin",
        "Mirla",
        "Mirrash",
        "Mirrin",
        "Mirrym",
        "Mirtrax",
        "Miryash",
        "Mishaar",
        "Mishim",
        "Miskin",
        "Miskul",
        "Misrach",
        "Miszlar",
        "Mithbrin",
        "Mithlerb",
        "Mitrel",
        "Mivarch",
        "Mivrid",
        "Miwarl",
        "Mixtry",
        "Mizarl",
        "Mizma",
        "Mizrab",
        "Mlenjas",
        "Mlocber",
        "Mlodach",
        "Moda",
        "Mogorn",
        "Moirulse",
        "Molez",
        "Mollith",
        "Molnyx",
        "Molrin",
        "Molvigg",
        "Molvind",
        "Mommur",
        "Monmar",
        "Moondar",
        "Mooneld",
        "Moorith",
        "Moorlow",
        "Moormish",
        "Moran",
        "Morax",
        "Morcal",
        "Morchiss",
        "Mordak",
        "Mordlaw",
        "Mordoc",
        "Mordyle",
        "Moreth",
        "Morgath",
        "Morgleeg",
        "Morglin",
        "Morgmar",
        "Morgrim",
        "Morhain",
        "Morix",
        "Morktar",
        "Morla",
        "Morlig",
        "Morlosc",
        "Mornith",
        "Morrhan",
        "Morsklon",
        "Morssen",
        "Mortan",
        "Morthyld",
        "Morvaen",
        "Moryak",
        "Moshaol",
        "Mosyerl",
        "Moyank",
        "Mozoorb",
        "Mrossard",
        "Mubfusc",
        "Mubur",
        "Mudanc",
        "Mudaz",
        "Muhlenk",
        "Muilt",
        "Mungin",
        "Munin",
        "Murgaist",
        "Murhsan",
        "Mustile",
        "Muuthas",
        "Mygon",
        "Myndax",
        "Myrii",
        "Myrnar",
        "Myronce",
        "Myrrim",
        "Myrvarth",
        "Myrya",
        "Mysind",
        "Mysmak",
        "Naadem",
        "Naadra",
        "Naafa",
        "Naalvad",
        "Naasjerth",
        "Nabdoor",
        "Nabol",
        "Nadar",
        "Nadhil",
        "Nadin",
        "Nagai",
        "Naghir",
        "Nagist",
        "Nagvar",
        "Nahar",
        "Nahoul",
        "Naia",
        "Naidel",
        "Naidis",
        "Naidule",
        "Naidusk",
        "Naion",
        "Naisnim",
        "Naithool",
        "Nakrea",
        "Nalbis",
        "Naldecc",
        "Nalkleth",
        "Nalray",
        "Namail",
        "Namat",
        "Namoin",
        "Namvert",
        "Nandrulg",
        "Namphruk",
        "Nantarth",
        "Na\xf6k",
        "Napolx",
        "Naras",
        "Nardalg",
        "Naren",
        "Narev",
        "Nargath",
        "Narjath",
        "Narkrisst",
        "Naron",
        "Narqui",
        "Narsok",
        "Narthold",
        "Nartolth",
        "Narvi",
        "Narvik",
        "Nasank",
        "Nasir",
        "Natchai",
        "Natchren",
        "Natein",
        "Nathlim",
        "Nathor",
        "Nathraq",
        "Nautcheb",
        "Navai",
        "Navairnz",
        "Navar",
        "Navesm",
        "Nazaarl",
        "Ndola",
        "Nebcherl",
        "Nebron",
        "Nectesce",
        "Neelrix",
        "Neepmire",
        "Nefhorn",
        "Negert",
        "Negort",
        "Nelat",
        "Nelbron",
        "Nelesck",
        "Nelynn",
        "Nemstere",
        "Nemweal",
        "Nenaire",
        "Nengret",
        "Nephard",
        "Nephog",
        "Neri",
        "Nerish",
        "Neruus",
        "Nerveer",
        "Nesbin",
        "Neshkem",
        "Nesser",
        "Nestra",
        "Nesvan",
        "Nethelb",
        "Netskra",
        "Nevlyn",
        "Newhar",
        "Nexoz",
        "Nextar",
        "Nexxar",
        "Neywode",
        "Nezuel",
        "Nezzdak",
        "Niand",
        "Nibine",
        "Nibor",
        "Niconde",
        "Nictroi",
        "Nida",
        "Nifeld",
        "Nigil",
        "Nigr\xe4l",
        "Nijim",
        "Nijis",
        "Nikusp",
        "Nilgorm",
        "Nilnoi",
        "Nimbol",
        "Nimir",
        "Nimon",
        "Nimrede",
        "Nindiss",
        "Nireal",
        "Nirel",
        "Nirhain",
        "Nirhath",
        "Nirloge",
        "Nirnir",
        "Nisherj",
        "Nishla",
        "Nishmir",
        "Nishran",
        "Nissac",
        "Nissal",
        "Nithilt",
        "Nithlom",
        "Nitra",
        "Nivenk",
        "Nivgrom",
        "Nixin",
        "Nizoon",
        "Nizten",
        "Nogaarn",
        "Nokelm",
        "Nolfig",
        "Noloq",
        "Nolthar",
        "Noorlim",
        "Norahl",
        "Nordell",
        "Nordran",
        "Norfroib",
        "Norin",
        "Noroj",
        "Norstoj",
        "Novvulse",
        "Noxit",
        "Nrial",
        "Nuad",
        "Nubweft",
        "Nuendo",
        "Nuhar",
        "Nulka",
        "Nulvilch",
        "Nummag",
        "Nurgan",
        "Nurrzek",
        "Nuscolg",
        "Nushla",
        "Nuuzsal",
        "Nuxile",
        "Nuzain",
        "Nyankra",
        "Nyassaed",
        "Nybron",
        "Nyconth",
        "Nydaur",
        "Nyeon",
        "Nylray",
        "Nynaeve",
        "Nyra",
        "Nyren",
        "Nysra",
        "Oaffleg",
        "Oakine",
        "Oalilse",
        "Oalyn",
        "Oarine",
        "Obron",
        "Obtin",
        "Ocarg",
        "Oedjert",
        "Oeglath",
        "Oejos",
        "Oenu",
        "Oerusk",
        "Oggran",
        "Ogmarx",
        "Ogstlang",
        "Ohmir",
        "Ohmoul",
        "Ohrool",
        "Ohwhon",
        "Ohya",
        "Olanc",
        "Olbrod",
        "Olcind",
        "Oldaar",
        "Oldac",
        "Oleird",
        "Olesk",
        "Olgeerd",
        "Olisch",
        "Olix",
        "Olney",
        "Olthang",
        "Oluode",
        "Olvoor",
        "Omag",
        "Omazd",
        "Ombaast",
        "Omdret",
        "Omfelx",
        "Omkraum",
        "Omoq",
        "Omron",
        "Onchorl",
        "Ondar",
        "Onilsh",
        "Oninsp",
        "Onolk",
        "Onvrix",
        "Oonglax",
        "Ooxaith",
        "Opaor",
        "Opchel",
        "Opild",
        "Opmar",
        "Opult",
        "Oqueln",
        "Orasch",
        "Orayl",
        "Orbern",
        "Orbohst",
        "Orbweft",
        "Ordol",
        "Orgoch",
        "Orgrool",
        "Orhomb",
        "Orinde",
        "Orisse",
        "Orix",
        "Orjasp",
        "Orkuuz",
        "Orli",
        "Orlim",
        "Ormdrad",
        "Ormerd",
        "Ormuuz",
        "Ornault",
        "Ornith",
        "Oroon",
        "Orpax",
        "Orrisk",
        "Orsind",
        "Orskog",
        "Ortain",
        "Orthmar",
        "Ortholt",
        "Orthroy",
        "Ortkuz",
        "Orvulse",
        "Orwelt",
        "Orxlorn",
        "Osgleft",
        "Oshraal",
        "Osphel",
        "Ospin",
        "Osresp",
        "Ossiz",
        "Ossvule",
        "Osthandl",
        "Othast",
        "Ottlan",
        "Ovaile",
        "Ovar",
        "Owal",
        "Owelft",
        "Owlin",
        "Ouxroul",
        "Oxdren",
        "Oxiv",
        "Oxoor",
        "Ozur",
        "Padath",
        "Palaor",
        "Palew",
        "Palifte",
        "Palvem",
        "Palzac",
        "Pamar",
        "Paminsk",
        "Panarre",
        "Pancraf",
        "Pandak",
        "Pandire",
        "Paneesh",
        "Pangaz",
        "Paono",
        "Paraerg",
        "Parbha",
        "Pargask",
        "Pargus",
        "Parmist",
        "Parnon",
        "Paroul",
        "Parrsath",
        "Paslaive",
        "Paxilp",
        "Pazot",
        "Peaflod",
        "Pelas",
        "Pelase",
        "Pelcourj",
        "Pellin",
        "Pelnos",
        "Pelvest",
        "Pemnarsc",
        "Pendoir",
        "Pendra",
        "Pengarth",
        "Pengron",
        "Peraule",
        "Percaal",
        "Perdin",
        "Perdis",
        "Perisk",
        "Perlask",
        "Perral",
        "Perreld",
        "Perrinx",
        "Perthald",
        "Perzec",
        "Pevel",
        "Pexul",
        "Pezloch",
        "Phaithor",
        "Phaleg",
        "Phanstern",
        "Phaovonce",
        "Pharan",
        "Phargon",
        "Pharvis",
        "Phatuum",
        "Phayra",
        "Phenquor",
        "Phesjan",
        "Phinerc",
        "Phinna",
        "Phinra",
        "Phislid",
        "Phlomel",
        "Pholgon",
        "Phondath",
        "Phynynx",
        "Phyzent",
        "Pidnubb",
        "Pilark",
        "Pilkarn",
        "Pirkrod",
        "Pittheus",
        "Planget",
        "Plitkin",
        "Pluroign",
        "Pnakord",
        "Poddle",
        "Pohlon",
        "Pohnoor",
        "Poroon",
        "Porsthil",
        "Portlusce",
        "Praamon",
        "Praarin",
        "Prabaar",
        "Pravdile",
        "Pressar",
        "Presta",
        "Pretil",
        "Prilsorn",
        "Pritantte",
        "Pritjan",
        "Prollel",
        "Proter",
        "Prothoon",
        "Psattor",
        "Psirrim",
        "Pteron",
        "Pulaaz",
        "Pulisk",
        "Pumish",
        "Purrdiste",
        "Puuhilsk",
        "Puvas",
        "Pyalvar",
        "Pyra",
        "Pyrafe",
        "Pyreyn",
        "Pyrjus",
        "Pyular",
        "Pyzzim",
        "Qraatin",
        "Quaestrin",
        "Quagel",
        "Quagrith",
        "Qua\xefve",
        "Quaman",
        "Quamrith",
        "Quanar",
        "Quanthon",
        "Quantra",
        "Quanvire",
        "Quardan",
        "Quargom",
        "Quarnos",
        "Quarouth",
        "Quasha",
        "Queageth",
        "Quedrech",
        "Queeden",
        "Queeyat",
        "Quekal",
        "Quelade",
        "Queldrim",
        "Quelges",
        "Quelneth",
        "Quelthar",
        "Quembras",
        "Quenna",
        "Querkez",
        "Querlo",
        "Queryl",
        "Quesan",
        "Quesparl",
        "Quesrol",
        "Quevros",
        "Queygo",
        "Quiddel",
        "Quidre",
        "Quigmoss",
        "Quilmose",
        "Quinaut",
        "Quindle",
        "Quinga",
        "Quinid",
        "Quintarl",
        "Quirrak",
        "Quirvell",
        "Quisrym",
        "Quizlo",
        "Quolbin",
        "Quondoon",
        "Quuddreus",
        "Quyssa",
        "Raaxis",
        "Raband",
        "Raberm",
        "Rablaen",
        "Rabuur",
        "Raccyx",
        "Racere",
        "Radalt",
        "Raddel",
        "Radeld",
        "Ra\xebn",
        "Ra\xebss",
        "Raethel",
        "Raevact",
        "Rafain",
        "Rafam",
        "Rafarn",
        "Rafmarth",
        "Raftwen",
        "Rafur",
        "Ragdra",
        "Ragen",
        "Rago",
        "Rahaz",
        "Raina",
        "Ra\xefre",
        "Raishauer",
        "Raistlig",
        "Raistoc",
        "Rajan",
        "Rajin",
        "Raju",
        "Rakeeg",
        "Rakhan",
        "Rakhaz",
        "Rakheer",
        "Rakkim",
        "Rakspire",
        "Rakthvi",
        "Ralik",
        "Ralir",
        "Ralise",
        "Ralith",
        "Ralkeev",
        "Ralvord",
        "Ramat",
        "Ramath",
        "Ranax",
        "Randar",
        "Randor",
        "Ranghen",
        "Rangvair",
        "Rani",
        "Ranid",
        "Ranousse",
        "Ranthur",
        "Ran\xfbk",
        "Ranyem",
        "Rascha",
        "Rascrag",
        "Raslak",
        "Rasmoth",
        "Rastagg",
        "Rastak",
        "Ratai",
        "Rater",
        "Rathdome",
        "Rathgor",
        "Rathlede",
        "Rathor",
        "Raudal",
        "Raudell",
        "Ravann",
        "Ravoe",
        "Ravthek",
        "Raxar",
        "Raxen",
        "Razdan",
        "Razdel",
        "Razul",
        "Rebesc",
        "Reddom",
        "Redlac",
        "Redleth",
        "Reeval",
        "Reevast",
        "Regwelf",
        "Relem",
        "Rellskar",
        "Rellzer",
        "Relmnar",
        "Relmund",
        "Relthar",
        "Remerst",
        "Remist",
        "Renair",
        "Rendkett",
        "Rendlorn",
        "Renjik",
        "Renlaw",
        "Renna",
        "Renquil",
        "Resfrith",
        "Reskem",
        "Resna",
        "Ressif",
        "Restid",
        "Retheer",
        "Retor",
        "Retraaj",
        "Reuzor",
        "Revas",
        "Reyga",
        "Reyna",
        "Rezbain",
        "Rezhar",
        "Rhamaine",
        "Rhandain",
        "Rhavee",
        "Rhaxdan",
        "Rhenea",
        "Rheya",
        "Rhila",
        "Rhiorn",
        "Rhobban",
        "Rhodelx",
        "Rhojann",
        "Rhylash",
        "Riaal",
        "Riak",
        "Ribos",
        "Ridun",
        "Ridya",
        "Rience",
        "Rifdos",
        "Rifgild",
        "Rigar",
        "Riklak",
        "Riksul",
        "Rila",
        "Rillif",
        "Rillu",
        "Rilmorn",
        "Rimchoze",
        "Rimnaaj",
        "Rimsall",
        "Ringool",
        "Rinquel",
        "Rinthmaw",
        "Ripurth",
        "Risnys",
        "Ristang",
        "Riswod",
        "Rivalke",
        "Rivarsh",
        "Rivcol",
        "Riveld",
        "Riverle",
        "Rivlin",
        "Rivoold",
        "Rivrook",
        "Rivvid",
        "Rixel",
        "Rixju",
        "Rizhad",
        "Rizzek",
        "Ro\xe4k",
        "Roakey",
        "Roandat",
        "Robforz",
        "Rocaltz",
        "Rodan",
        "Rodhar",
        "Ro\xeble",
        "Ro\xebll",
        "Roethord",
        "Rofloef",
        "Rokeel",
        "Rolthar",
        "R\xf6lyat",
        "Rontayn",
        "Roolenth",
        "Roqual",
        "Rorkar",
        "Rothar",
        "Roujat",
        "Roweal",
        "Roxhaast",
        "Royanse",
        "Royskyar",
        "Rubarj",
        "Rubiss",
        "Rudrisk",
        "Ruidh",
        "Rukhjan",
        "Rukuz",
        "Rulbowe",
        "Rulmool",
        "Rumael",
        "Rupaic",
        "Rupsey",
        "Rurik",
        "Rusgar",
        "Rusis",
        "Ruther",
        "Ruusul",
        "Ruvad",
        "Ruwen",
        "Ryalas",
        "Rygarn",
        "Rynell",
        "Rynrys",
        "Rysta",
        "Sabak",
        "Sabal",
        "Sabfane",
        "Sabhel",
        "Sabon",
        "Sabrok",
        "Sador",
        "Sadrouth",
        "Saerdon",
        "Saerulse",
        "Safrence",
        "Safrine",
        "Sagard",
        "Saglamne",
        "Saia",
        "Saihail",
        "Saijax",
        "Salir",
        "Sallese",
        "Samand",
        "Samar",
        "Sambrea",
        "Samler",
        "Sanald",
        "Sanan",
        "Sanar",
        "Sandice",
        "Sangol",
        "Sankor",
        "Sanpalk",
        "Sanrind",
        "Sanrow",
        "Sansal",
        "Santlor",
        "Santrul",
        "Saphyx",
        "Sarbrid",
        "Sarcyn",
        "Sardrum",
        "Sarel",
        "Sarex",
        "Sarfinn",
        "Sargash",
        "Sarik",
        "Sarla",
        "Sarlyn",
        "Sarmuld",
        "Sarnax",
        "Sarode",
        "Saroon",
        "Sarthath",
        "Sarthay",
        "Saruul",
        "Sarvan",
        "Sateer",
        "Sathla",
        "Saudraal",
        "Saugrib",
        "Savak",
        "Savar",
        "Savaunce",
        "Savay",
        "Savot",
        "Savryn",
        "Saxar",
        "Scamire",
        "Scarloth",
        "Scaroth",
        "Scarvlin",
        "Schabith",
        "Scharay",
        "Sclava",
        "Scolath",
        "Scradast",
        "Scrilisp",
        "Searan",
        "Seckba",
        "Sedrim",
        "Seethenn",
        "Segrold",
        "Seheitt",
        "Sejar",
        "Selar",
        "Seldar",
        "Selgren",
        "Selith",
        "Selkind",
        "Selnor",
        "Selris",
        "Selthen",
        "Sember",
        "Sembrith",
        "Semer",
        "Semisk",
        "Sena",
        "Sendrej",
        "Sendure",
        "Sengeld",
        "Senrin",
        "Senther",
        "Sentix",
        "Seonce",
        "Sephrone",
        "Seplacc",
        "Seprism",
        "Seraan",
        "Seranth",
        "Seray",
        "Serdu",
        "Sereste",
        "Serlarc",
        "Sermer",
        "Seroz",
        "Serrof",
        "Serryx",
        "Sersoom",
        "Sertase",
        "Seskel",
        "Sethar",
        "Sethchell",
        "Sethjen",
        "Sethran",
        "Sfa\xebl",
        "Sfennec",
        "Sferaj",
        "Sforakh",
        "Shabrum",
        "Shadar",
        "Shagold",
        "Shahile",
        "Shaifarl",
        "Shalun",
        "Shalvir",
        "Shamad",
        "Shanfa",
        "Sharaq",
        "Sharaz",
        "Sharrak",
        "Sharrel",
        "Sharva",
        "Sharzik",
        "Shastor",
        "Shathak",
        "Shaxa",
        "Shaydayl",
        "Sheerah",
        "Shembis",
        "Shenesk",
        "Shetrax",
        "Shezael",
        "Shiaf",
        "Shialk",
        "Shila",
        "Shilex",
        "Shimar",
        "Shimglor",
        "Shimren",
        "Shintar",
        "Shirak",
        "Shivan",
        "Shiza",
        "Sholmeg",
        "Shruuminth",
        "Shryffin",
        "Shudleet",
        "Shurik",
        "Shurrug",
        "Shyden",
        "Shylath",
        "Siade",
        "Sibvir",
        "Sidron",
        "Sierl",
        "Sila",
        "Silcharn",
        "Sildeed",
        "Silgast",
        "Silgool",
        "Siljenk",
        "Silmat",
        "Silon",
        "Silphane",
        "Silruum",
        "Silure",
        "Silvasp",
        "Silvryn",
        "Simbrul",
        "Sindhi",
        "Siol",
        "Siralk",
        "Sithirg",
        "Sium",
        "Skaaro",
        "Skagra",
        "Skarazk",
        "Skarloch",
        "Skayla",
        "Skedrea",
        "Skeltrin",
        "Skilon",
        "Skorafe",
        "Skurin",
        "Slanslar",
        "Slanthar",
        "Slarood",
        "Slaskren",
        "Slavgar",
        "Slazor",
        "Sleekla",
        "Sleshkeg",
        "Sleynux",
        "Slijash",
        "Slorac",
        "Slurvaum",
        "Smarag",
        "Smerdis",
        "Smialv",
        "Snargai",
        "Snayrod",
        "Sneitad",
        "Snurlix",
        "Sobeck",
        "Sodarg",
        "Solael",
        "Solbar",
        "Soldine",
        "Solis",
        "Solohe",
        "Solok",
        "Solos",
        "Soltar",
        "Sombrid",
        "Sophald",
        "Sorak",
        "Sorgas",
        "Sormtor",
        "Sorquoon",
        "Sorren",
        "Sorven",
        "Sorza",
        "Sotar",
        "Soveh",
        "Soydil",
        "Spalant",
        "Spandrell",
        "Sparveld",
        "Sperax",
        "Spereld",
        "Spirach",
        "Splinvek",
        "Sprimaine",
        "Squamgreve",
        "Srajsken",
        "Sraknis",
        "Sramine",
        "Srebold",
        "Sreeva",
        "Srendix",
        "Srennant",
        "Sriddoth",
        "Sroika",
        "Sroweb",
        "Sryxla",
        "Stajesce",
        "Stalfess",
        "Starklyn",
        "Staygus",
        "Steeglorn",
        "Stengos",
        "Stereth",
        "Steylin",
        "Sthygron",
        "Stielle",
        "Stirgan",
        "Stornrafe",
        "Strakhan",
        "Strakkar",
        "Streggen",
        "Struquil",
        "Stryast",
        "Strylax",
        "Subreen",
        "Suggner",
        "Sujaim",
        "Sulgra",
        "Sulji",
        "Sulmsy",
        "Sulnseir",
        "Sundoth",
        "Sunjeade",
        "Surast",
        "Surigg",
        "Surjan",
        "Surpy",
        "Susstark",
        "Susteelk",
        "Susur",
        "Sutekh",
        "Suukeeg",
        "Suulkas",
        "Suunall",
        "Suvael",
        "Suvrin",
        "Svringal",
        "Swarflig",
        "Swarro",
        "Swendril",
        "Swiez",
        "Syanor",
        "Sybra",
        "Sylfrix",
        "Sylvine",
        "Sylvyn",
        "Symnar",
        "Syphtar",
        "Syrag",
        "Syran",
        "Syssahz",
        "Syzaash",
        "Taarna",
        "Tabrind",
        "Tachel",
        "Tacrine",
        "Tadra",
        "Taedel",
        "Taennyn",
        "Taeral",
        "Taeya",
        "Tagor",
        "Taher",
        "Tahrjun",
        "Taiwine",
        "Talanth",
        "Talar",
        "Taldar",
        "Taleeg",
        "Taled",
        "Talesm",
        "Talgan",
        "Talgraine",
        "Talgyr",
        "Talisk",
        "Talith",
        "Talor",
        "Talthran",
        "Talune",
        "Talven",
        "Talver",
        "Tamar",
        "Tamnuz",
        "Tamone",
        "Tamoorn",
        "Tamriss",
        "Tanchilt",
        "Tandro",
        "Tanha",
        "Tanisk",
        "Tanlin",
        "Tanndo",
        "Tanoor",
        "Tanry",
        "Tan\xfbr",
        "Tanzel",
        "Tanzlor",
        "Taosar",
        "Taoyot",
        "Taran",
        "Tarath",
        "Tarax",
        "Tarcen",
        "Tareth",
        "Tarik",
        "Tarin",
        "Tarisk",
        "Tarith",
        "Tarkand",
        "Tarkrog",
        "Tarlmar",
        "Tarnor",
        "Taron",
        "Taroyn",
        "Tarqu",
        "Tarxas",
        "Tasharg",
        "Tashforn",
        "Tashlex",
        "Tashu",
        "Tashuul",
        "Tasrak",
        "Tasselt",
        "Tasvoor",
        "Taulin",
        "Taval",
        "Tavan",
        "Tavon",
        "Taxlon",
        "Tayerl",
        "Taylin",
        "Tayrsil",
        "Tazen",
        "Tazine",
        "Tchasko",
        "Tealryn",
        "Teawar",
        "Tebish",
        "Tedra",
        "Teekah",
        "Teekug",
        "Teerlin",
        "Tefaz",
        "Tefleer",
        "Tegan",
        "Tegglyn",
        "Tegoth",
        "Teiresh",
        "Teirna",
        "Telaer",
        "Telast",
        "Telcarn",
        "Telett",
        "Telglas",
        "Telgrest",
        "Telkarr",
        "Tellan",
        "Telnar",
        "Telnoom",
        "Telsar",
        "Telva",
        "Telzley",
        "Temorg",
        "Tempros",
        "Tened",
        "Tenelle",
        "Tenjal",
        "Tenlor",
        "Tenna",
        "Tensfar",
        "Tentil",
        "Teode",
        "Terare",
        "Terglaw",
        "Tergon",
        "Terlkin",
        "Terlyn",
        "Ternasse",
        "Terragg",
        "Terris",
        "Tershar",
        "Terslond",
        "Tesin",
        "Teslan",
        "Tevrin",
        "Teyvrilt",
        "Thabou",
        "Thadrum",
        "Thaiduk",
        "Thaki",
        "Thalarn",
        "Thalax",
        "Thaldok",
        "Thamin",
        "Thandart",
        "Thandrov",
        "Thandusc",
        "Thangor",
        "Tharbad",
        "Tharbolt",
        "Tharij",
        "Tharis",
        "Tharjun",
        "Tharkesh",
        "Tharquist",
        "Tharsna",
        "Tharxac",
        "Thaskam",
        "Thaval",
        "Thavarl",
        "Thawlton",
        "Thaxid",
        "Thaxis",
        "Thaxmool",
        "Thaxnar",
        "Thayvudd",
        "Theandra",
        "Thebek",
        "Thelbor",
        "Theleb",
        "Thelin",
        "Thelred",
        "Themnon",
        "Theras",
        "Therbur",
        "Therrak",
        "Therras",
        "Therrat",
        "Thervoh",
        "Thesi",
        "Thesstor",
        "Thibkern",
        "Thimmoz",
        "Thinhla",
        "Thiob",
        "Thios",
        "Thirlain",
        "Thirrild",
        "Thomilt",
        "Thondrac",
        "Thorgeir",
        "Thornix",
        "Thorskal",
        "Thorztar",
        "Thorzyl",
        "Thoskold",
        "Thoye",
        "Thranor",
        "Thraxil",
        "Thremek",
        "Thremix",
        "Thrindish",
        "Thrinyr",
        "Thrykar",
        "Thryxeer",
        "Thugar",
        "Thuldudge",
        "Thulsa",
        "Thurdis",
        "Thuvgalt",
        "Thyra",
        "Thyzlont",
        "Tiaft",
        "Tiak",
        "Tian",
        "Ticham",
        "Tiffrod",
        "Tihan",
        "Tika",
        "Tilal",
        "Tilir",
        "Timaas",
        "Timak",
        "Timdos",
        "Tira",
        "Tiralle",
        "Tirhthri",
        "Tirkan",
        "Tirnor",
        "Tirouv",
        "Tirvil",
        "Tislim",
        "Tisreth",
        "Tisseth",
        "Tithesb",
        "Tivaln",
        "Tlembic",
        "Tlichgo",
        "Tlishat",
        "Tobar",
        "Todyc",
        "Toglank",
        "Tokath",
        "Tokkreft",
        "Tokraz",
        "Tolgarm",
        "Toma",
        "Tonom",
        "Torak",
        "Torang",
        "Torbelt",
        "Torbold",
        "Torden",
        "Toreth",
        "Torghai",
        "Tormir",
        "Torsund",
        "Torthar",
        "Torvin",
        "Torxar",
        "Toscrah",
        "Tourrhok",
        "Tovak",
        "Tovis",
        "Toxathe",
        "Tozjroch",
        "Traalyr",
        "Traken",
        "Tramorn",
        "Trantain",
        "Trantle",
        "Trasven",
        "Travech",
        "Trazom",
        "Tredek",
        "Treeplin",
        "Treffaun",
        "Trefoin",
        "Treizeng",
        "Tremas",
        "Treof",
        "Treslont",
        "Tressak",
        "Trevarq",
        "Trevul",
        "Tricoj",
        "Tridusk",
        "Trilinn",
        "Trisgil",
        "Tristak",
        "Trithax",
        "Triveark",
        "Trizdoth",
        "Troiom",
        "Tromest",
        "Tronvel",
        "Troulden",
        "Trujko",
        "Tsarlit",
        "Tsavan",
        "Tsodjan",
        "Tsojwar",
        "Tsorak",
        "Tuane",
        "Tuchror",
        "Tudlech",
        "Tuezinth",
        "Tugan",
        "Tulkas",
        "Tulsoorm",
        "Tuntix",
        "Turan",
        "Turmasc",
        "Turmis",
        "Turvoost",
        "Turweld",
        "Turzeal",
        "Tuuraj",
        "Tvejasp",
        "Twenja",
        "Twinaile",
        "Twixtib",
        "Tyasaj",
        "Tydwyk",
        "Tylark",
        "Tylith",
        "Tylnen",
        "Tymarl",
        "Tymdrak",
        "Tyrbast",
        "Tyrdon",
        "Tyreen",
        "Tyrgyre",
        "Tyrinx",
        "Tyrlon",
        "Tyrum",
        "Tzichrism",
        "Tzilen",
        "Tziphrin",
        "Udraam",
        "Ufang",
        "Ufoin",
        "Ulak",
        "Ulfade",
        "Ullfrax",
        "Ulli",
        "Ulmyst",
        "Ulos",
        "Ulphar",
        "Ulsplasm",
        "Umbrask",
        "Umbresk",
        "Umchor",
        "Umleer",
        "Ummice",
        "Undreet",
        "Unfegg",
        "Ungax",
        "Unstric",
        "Unstrix",
        "Untveld",
        "Unza",
        "Uqbar",
        "Urdaa",
        "Urdain",
        "Urdal",
        "Urdryce",
        "Urlyn",
        "Urrind",
        "Urthryn",
        "Urtond",
        "Urwoon",
        "Urzvir",
        "Ushnee",
        "Usquik",
        "Ussart",
        "Ussfaal",
        "Ussit",
        "Usstrilt",
        "Ustar",
        "Ustiln",
        "Ustlin",
        "Ustor",
        "Ustorne",
        "Ustrelm",
        "Usxald",
        "Uthmal",
        "Uthnor",
        "Uvorne",
        "Uzfron",
        "Uztum",
        "Vacla",
        "Vadein",
        "Vadrelj",
        "Vadri",
        "Vadru",
        "Vaeddyn",
        "Vaelythe",
        "Va\xebrn",
        "Vagar",
        "Vaigthlu",
        "Vaitarr",
        "Valan",
        "Valaz",
        "Valbard",
        "Valek",
        "Valen",
        "Valeth",
        "Valgaard",
        "Valgar",
        "Valgarv",
        "Valka",
        "Valkarth",
        "Valken",
        "Valkesh",
        "Valkis",
        "Valkyr",
        "Valmisce",
        "Valreque",
        "Valtarb",
        "Valthoth",
        "Valyn",
        "Vamert",
        "Vamfade",
        "Vanache",
        "Vanek",
        "Vanger",
        "Vannak",
        "Vannyn",
        "Vanra",
        "Vantsled",
        "Vanyar",
        "Vaona",
        "Varat",
        "Varda",
        "Vareth",
        "Varga",
        "Varka",
        "Varlik",
        "Varmon",
        "Varmyr",
        "Varna",
        "Varnac",
        "Varnar",
        "Varnax",
        "Varnaz",
        "Varos",
        "Varrow",
        "Varsta",
        "Vartoor",
        "Vasaav",
        "Vascais",
        "Vasrind",
        "Vathan",
        "Vathar",
        "Vathek",
        "Vaudric",
        "Vayas",
        "Vaydir",
        "Vayi",
        "Vazar",
        "Vazdo",
        "Ve\xe4xe",
        "Veena",
        "Vegreth",
        "Vekil",
        "Velaunce",
        "Veldan",
        "Veldin",
        "Velex",
        "Velkind",
        "Velnard",
        "Velsant",
        "Velsard",
        "Velsin",
        "Vembrex",
        "Venast",
        "Vendik",
        "Vengkuld",
        "Venklar",
        "Vennec",
        "Vennsor",
        "Venscoth",
        "Ventorl",
        "Venzra",
        "Veor",
        "Verek",
        "Verisse",
        "Verla",
        "Verlis",
        "Vernar",
        "Vernat",
        "Vernil",
        "Veror",
        "Verren",
        "Vertence",
        "Vervitz",
        "Verwantz",
        "Verxain",
        "Verzod",
        "Veskin",
        "Veswinch",
        "Veyen",
        "Vherla",
        "Viaxx",
        "Vibsoom",
        "Vibur",
        "Vilgrax",
        "Vilraj",
        "Vilsa",
        "Vilthod",
        "Viltor",
        "Viltorc",
        "Vingverd",
        "Virainth",
        "Viran",
        "Virdla",
        "Viscanth",
        "Visharn",
        "Viskrek",
        "Vissir",
        "Vistar",
        "Vistarl",
        "Vithmard",
        "Viux",
        "Vixa",
        "Vixai",
        "Vixlim",
        "Vlastov",
        "Vlitchek",
        "Vluisc",
        "Vlustra",
        "Volcilde",
        "Voldor",
        "Volnir",
        "Vomquind",
        "Vonir",
        "Voozale",
        "Vordnaz",
        "Vorgan",
        "Vorplen",
        "Vorrmor",
        "Vorshak",
        "Vortice",
        "Vosklune",
        "Votorn",
        "Votrax",
        "Voxarl",
        "Vozkoog",
        "Vratund",
        "Vreeleth",
        "Vregom",
        "Vrithon",
        "Vrumtuun",
        "Vryxnir",
        "Vuespra",
        "Vuestri",
        "Vulpix",
        "Vuranc",
        "Vurick",
        "Vurog",
        "Vuron",
        "Vuubul",
        "Vynda",
        "Vyrnael",
        "Vywyn",
        "Vzoris",
        "Wadziq",
        "Waeytef",
        "Wairbren",
        "Walgwim",
        "Wallibt",
        "Walscrin",
        "Wanelj",
        "Wanjok",
        "Wannach",
        "Wanruum",
        "Wanthim",
        "Warbosk",
        "Warell",
        "Warisk",
        "Warthan",
        "Waryn",
        "Wastur",
        "Waylra",
        "Waznak",
        "Weardlon",
        "Wedjeeg",
        "Wedra",
        "Weftig",
        "Weftorb",
        "Weitvan",
        "Welfrede",
        "Welmek",
        "Welndar",
        "Wemsin",
        "Wendath",
        "Weppel",
        "Werclam",
        "Werin",
        "Weshap",
        "Weskin",
        "Westra",
        "Wevkinz",
        "Wextri",
        "Whilfig",
        "Whilmor",
        "Wicrore",
        "Wileert",
        "Wilnim",
        "Wilven",
        "Wilzech",
        "Wirreth",
        "Wirzanth",
        "Wistril",
        "Witrix",
        "Witrost",
        "Wizlow",
        "Wolcharn",
        "Wolkoon",
        "Wolnihr",
        "Worlit",
        "Wraxil",
        "Wrybeck",
        "Wryplax",
        "Wryxerg",
        "Wubneft",
        "Wulfrit",
        "Wurflense",
        "Wusheig",
        "Wuunal",
        "Wuxorn",
        "Wychnor",
        "Wylvin",
        "Wyndbrel",
        "Wyndra",
        "Wyrgon",
        "Wyrsis",
        "Wysholt",
        "Wyvrax",
        "Wyxef",
        "Xadair",
        "Xaedra",
        "Xaelinth",
        "Xaharl",
        "Xaidis",
        "Xaitchek",
        "Xaldreth",
        "Xalkhas",
        "Xalla",
        "Xallath",
        "Xameld",
        "Xanax",
        "Xanbarg",
        "Xandar",
        "Xandrix",
        "Xanille",
        "Xanna",
        "Xanos",
        "Xanrei",
        "Xanthon",
        "Xarafe",
        "Xarakh",
        "Xarek",
        "Xasim",
        "Xaudrin",
        "Xavest",
        "Xavin",
        "Xawnis",
        "Xaxul",
        "Xayide",
        "Xeebract",
        "Xeerha",
        "Xejem",
        "Xela",
        "Xeldon",
        "Xellosp",
        "Xenerge",
        "Xenir",
        "Xephar",
        "Xerra",
        "Xerxisp",
        "Xerys",
        "Xexal",
        "Xhagrim",
        "Xhaibar",
        "Xhomdroll",
        "Xhorald",
        "Xigil",
        "Xion",
        "Xiplin",
        "Xiri",
        "Xirrip",
        "Xloris",
        "Xoncarg",
        "Xopon",
        "Xoris",
        "Xormeer",
        "Xothun",
        "Xovro",
        "Xudeet",
        "Xulan",
        "Xundrahl",
        "Xustral",
        "Xy\xe1s",
        "Xy\xe1st",
        "Xybeuth",
        "Xycort",
        "Xydorn",
        "Xydra",
        "Xygbenth",
        "Xyhaek",
        "Xykrog",
        "Xylance",
        "Xylarz",
        "Xylvorm",
        "Xymoyl",
        "Xytrin",
        "Yaalder",
        "Yaathab",
        "Yadarl",
        "Yaddith",
        "Yadel",
        "Yadreth",
        "Yadurk",
        "Yaglaid",
        "Yagmoon",
        "Yaklar",
        "Yaklin",
        "Yako",
        "Yakthoob",
        "Yammoth",
        "Yamphut",
        "Yandorn",
        "Ya\xf6th",
        "Yarat",
        "Yarel",
        "Yari",
        "Yarin",
        "Yarnis",
        "Yarram",
        "Yastoz",
        "Yaten",
        "Yatheg",
        "Yavarre",
        "Yavood",
        "Yavroun",
        "Yazlar",
        "Ycore",
        "Yeafosk",
        "Yeifolk",
        "Yeldoj",
        "Yeldrai",
        "Yeoft",
        "Yeoun",
        "Yerdeen",
        "Yergal",
        "Yerkel",
        "Yernoold",
        "Yethler",
        "Yewrapt",
        "Yexil",
        "Yezrik",
        "Yhemnis",
        "Yhemog",
        "Yhoudeh",
        "Yiash",
        "Yildiz",
        "Yilkeyr",
        "Yimzuuem",
        "Yinaun",
        "Yiod",
        "Yirod",
        "Yivthi",
        "Ymar",
        "Ymarl",
        "Yodkin",
        "Yojra",
        "Yombris",
        "Yoorzamph",
        "Yoppulse",
        "Yorim",
        "Yorlask",
        "Yorrak",
        "Yoskan",
        "Yosneth",
        "Yothir",
        "Yottoa",
        "Yrdirr",
        "Yrgash",
        "Yrgil",
        "Yrinth",
        "Yrlmar",
        "Yrvoor",
        "Yuklat",
        "Yuleng",
        "Yurisp",
        "Yuvib",
        "Yuzan",
        "Yween",
        "Zaalit",
        "Zabal",
        "Zabil",
        "Zadko",
        "Zadom",
        "Zadool",
        "Zaelken",
        "Zaery",
        "Zaffar",
        "Zagrosk",
        "Zahur",
        "Zaihra",
        "Zalethe",
        "Zalmic",
        "Zalthen",
        "Zamar",
        "Zamewl",
        "Zamind",
        "Zamog",
        "Zamray",
        "Zanak",
        "Zaneer",
        "Zangor",
        "Zanqua",
        "Zantain",
        "Zanthu",
        "Zantir",
        "Zantyen",
        "Zanurb",
        "Zarak",
        "Zaranthe",
        "Zardal",
        "Zardence",
        "Zardirm",
        "Zardox",
        "Zargoi",
        "Zaric",
        "Zarlon",
        "Zarmarl",
        "Zarouk",
        "Zarphaut",
        "Zarquar",
        "Zarquemf",
        "Zarros",
        "Zarthule",
        "Zastor",
        "Zatarl",
        "Zatheen",
        "Zathras",
        "Zathu",
        "Zatoum",
        "Zausric",
        "Zavach",
        "Zavak",
        "Zavel",
        "Zaviv",
        "Zaxweer",
        "Zayarn",
        "Zaydrim",
        "Zebor",
        "Zebulse",
        "Zedresk",
        "Zefteel",
        "Zehain",
        "Zehirn",
        "Zekal",
        "Zeldaph",
        "Zelgad",
        "Zelgen",
        "Zelisp",
        "Zelked",
        "Zelmarth",
        "Zelminx",
        "Zelvant",
        "Zembis",
        "Zendarg",
        "Zentos",
        "Zeraa",
        "Zerai",
        "Zerakl",
        "Zermish",
        "Zerric",
        "Zervid",
        "Zesdick",
        "Zessain",
        "Zethrel",
        "Zhaizald",
        "Zhakoor",
        "Zhalore",
        "Zhantaine",
        "Zhapris",
        "Zharmele",
        "Zharvek",
        "Zhassa",
        "Zhawend",
        "Zhaya",
        "Zheral",
        "Zhirek",
        "Zhirem",
        "Zhiroq",
        "Zhirquis",
        "Zhogri",
        "Zhomrach",
        "Zhoreb",
        "Zhrana",
        "Zigmoth",
        "Zikuyth",
        "Zilar",
        "Zilmork",
        "Zincir",
        "Zindor",
        "Ziorn",
        "Zirin",
        "Zishuun",
        "Zislun",
        "Zisurgh",
        "Zlant\xe9",
        "Zlatos",
        "Zofram",
        "Zoides",
        "Zojan",
        "Zohldrom",
        "Zolfran",
        "Zoltaft",
        "Zomra",
        "Zondar",
        "Zoorkon",
        "Zopine",
        "Zorac",
        "Zorith",
        "Zorlan",
        "Zorthal",
        "Zosarde",
        "Zrufend",
        "Zugdin",
        "Zugoth",
        "Zuril",
        "Zusdhrun",
        "Zuukan",
        "Zvegnaz",
        "Zyjin",
        "Zyla",
        "Zylaax",
        "Zylyn",
        "Zyrel",
        "Zyrelx",
        "Zytan",
        "Zyxim"
    ],
    // Three syllabes
    [
        "Aathoklaa",
        "Abalore",
        "Abeli",
        "Abreyxorn",
        "Abrisen",
        "Acaena",
        "Acamar",
        "Acarnod",
        "Ackia",
        "Acozer",
        "Acravel",
        "Actinor",
        "Adalon",
        "Adalrik",
        "Adanac",
        "Adasho",
        "Adelin",
        "Adelir",
        "Adembal",
        "Aderak",
        "Aderel",
        "Aderyn",
        "Adhara",
        "Adhirman",
        "Adia",
        "Adian",
        "Adiol",
        "Aditu",
        "Adlaron",
        "Admarlen",
        "Adnirrin",
        "Adnoren",
        "Adracea",
        "Adraeran",
        "Adraewyth",
        "Adrasta",
        "Adrena",
        "Adriphaas",
        "Aelarim",
        "Aerissa",
        "Aeruin",
        "Aetharyn",
        "Aexien",
        "Afaellan",
        "Agador",
        "Agaki",
        "Agari",
        "Agella",
        "Agerquon",
        "Agetan",
        "Agexa",
        "Aginor",
        "Agior",
        "Agnaska",
        "Agraia",
        "Agrasline",
        "Agrasol",
        "Agrias",
        "Agristair",
        "Ahina",
        "Ahorra",
        "Aidaron",
        "Aililry",
        "Ainnatic",
        "Aioula",
        "Aircristir",
        "Aistomar",
        "Ajasonde",
        "Akajur",
        "Akashic",
        "Akasta",
        "Akenchi",
        "Akhrida",
        "Akiina",
        "Akirga",
        "Akirku",
        "Akritas",
        "Akura",
        "Akvaron",
        "Alamak",
        "Alanik",
        "Alanyx",
        "Alardan",
        "Alaris",
        "Alarynd",
        "Alathen",
        "Alatvair",
        "Alaxa",
        "Alaztyr",
        "Albara",
        "Albaral",
        "Alberist",
        "Alberon",
        "Alceon",
        "Alceor",
        "Alchica",
        "Aldachur",
        "Aldaka",
        "Aldamir",
        "Aldirim",
        "Aldrella",
        "Aleasna",
        "Aleaxa",
        "Aleena",
        "Aleidar",
        "Alembis",
        "Alera",
        "Aleva",
        "Alfanar",
        "Alhana",
        "Alidar",
        "Aliet",
        "Alifyan",
        "Alinaeus",
        "Alindra",
        "Alixa",
        "Aljarik",
        "Alkaios",
        "Allindren",
        "Allomir",
        "Alloran",
        "Almarisc",
        "Almeron",
        "Almiel",
        "Alnavor",
        "Alshagrel",
        "Altavan",
        "Altorlan",
        "Altria",
        "Alucard",
        "Alzamar",
        "Alzarin",
        "Amadis",
        "Amadix",
        "Amafer",
        "Amaja",
        "Amakelb",
        "Amanster",
        "Amaremne",
        "Amarette",
        "Amatin",
        "Amazya",
        "Ambrezul",
        "Amelis",
        "Amerill",
        "Amether",
        "Amethi",
        "Amharad",
        "Amilin",
        "Aminak",
        "Amintor",
        "Amlieth",
        "Amolithe",
        "Amorin",
        "Ampenden",
        "Amramyr",
        "Anandra",
        "Anara",
        "Anartig",
        "Anashea",
        "Anatsath",
        "Ancelyn",
        "Ancifer",
        "Andaraan",
        "Andistair",
        "Andolan",
        "Andrasha",
        "Andula",
        "Aneelen",
        "Anfara",
        "Anferas",
        "Anfesef",
        "Angalli",
        "Angemon",
        "Anghyrud",
        "Anhalus",
        "Anici",
        "Anina",
        "Ankrista",
        "Annoxin",
        "Anraculd",
        "Anroana",
        "Ansivlan",
        "Ansuki",
        "Antalyaar",
        "Antarlest",
        "Anterra",
        "Antesri",
        "Anthlamar",
        "Antraneyk",
        "Anzera",
        "Apelnin",
        "Aphithea",
        "Apporrosh",
        "Aquiel",
        "Aquorren",
        "Aradek",
        "Aragaj",
        "Araglas",
        "Arajist",
        "Arakbaal",
        "Arakhreen",
        "Arakin",
        "Araldar",
        "Aralik",
        "Aramil",
        "Aranat",
        "Aranis",
        "Arathorb",
        "Araxis",
        "Arbadrul",
        "Arbalac",
        "Arbalon",
        "Arbitan",
        "Arboran",
        "Arcastor",
        "Archolach",
        "Ardalanx",
        "Ardanos",
        "Ardatha",
        "Ardaxil",
        "Ardelin",
        "Ardilex",
        "Ardiseng",
        "Ardissa",
        "Aregel",
        "Arenith",
        "Arestel",
        "Arfandas",
        "Argethlam",
        "Arghesos",
        "Argion",
        "Argo\xebl",
        "Argolin",
        "Arhanen",
        "Ariann",
        "Arianth",
        "Aribeth",
        "Arien",
        "Arion",
        "Arioth",
        "Ariseph",
        "Arismacht",
        "Aristea",
        "Arivid",
        "Arkadit",
        "Arkaris",
        "Arkavyn",
        "Arkissar",
        "Arkurel",
        "Arlana",
        "Arleano",
        "Arleost",
        "Arlomma",
        "Arokair",
        "Arolant",
        "Arozan",
        "Arpiax",
        "Arrashad",
        "Arrelask",
        "Arrenol",
        "Arriam",
        "Arridor",
        "Arrivid",
        "Arrosas",
        "Arrossai",
        "Arshashi",
        "Arshavir",
        "Artithea",
        "Artlexu",
        "Arura",
        "Arvanor",
        "Arvirask",
        "Aryion",
        "Arzeela",
        "Ascarleth",
        "Ascaveen",
        "Ascomeld",
        "Asgarath",
        "Asherild",
        "Ashikri",
        "Ashilja",
        "Ashnisci",
        "Ashrodu",
        "Asilun",
        "Asius",
        "Aslior",
        "Asmacul",
        "Asmictir",
        "Aspaleed",
        "Asparind",
        "Asphodal",
        "Aspolyme",
        "Asquilla",
        "Astaedi",
        "Astalon",
        "Aste\xe4",
        "Astinus",
        "Astra\xeba",
        "Asurzel",
        "Atalis",
        "Atazra",
        "Athana",
        "Atheran",
        "Athermoj",
        "Athina",
        "Athnolan",
        "Athrasomb",
        "Athrilas",
        "Atlavan",
        "Atorin",
        "Atralan",
        "Atraxon",
        "Atrujal",
        "Attanir",
        "Atticog",
        "Aturin",
        "Atyoto",
        "Aurever",
        "Aurian",
        "Auridra",
        "Aurina",
        "Aurion",
        "Auxebaz",
        "Avalzaunt",
        "Avandir",
        "Avarath",
        "Avasceen",
        "Avenaar",
        "Aveole",
        "Averdal",
        "Avereem",
        "Avernide",
        "Av\xe8ss\xe8d",
        "Avesur",
        "Avori",
        "Avriax",
        "Avronil",
        "Awennes",
        "Axanar",
        "Axarun",
        "Aximil",
        "Ayaren",
        "Ayesra",
        "Azaka",
        "Azakour",
        "Azanakh",
        "Azanor",
        "Azarmax",
        "Azatta",
        "Azella",
        "Azergal",
        "Azfotha",
        "Azilos",
        "Azmarbi",
        "Azmeren",
        "Azolem",
        "Azraxel",
        "Azriaz",
        "Azrienne",
        "Aztira",
        "Azuva",
        "Azuzu",
        "Baeglyndven",
        "Bahnshiath",
        "Bakailis",
        "Bakiar",
        "Balandix",
        "Balanjik",
        "Balathol",
        "Balazar",
        "Balderon",
        "Baledor",
        "Baloward",
        "Baltarreg",
        "Bandibras",
        "Banira",
        "Banjasah",
        "Banjicoy",
        "Banrodi",
        "Bantirgen",
        "Baraca",
        "Barahir",
        "Baramei",
        "Barbardon",
        "Barixid",
        "Barjazan",
        "Barolio",
        "Barsimmern",
        "Bartosca",
        "Barzolo",
        "Basfui",
        "Basidrix",
        "Baslayan",
        "Basliard",
        "Batiax",
        "Baudefloy",
        "Bayazin",
        "Bayidon",
        "Bazakel",
        "Baziran",
        "Be\xe4brae",
        "Becheton",
        "Bedivere",
        "Behamkai",
        "Belaraz",
        "Belarba",
        "Belathgert",
        "Beldara",
        "Beldaran",
        "Belegern",
        "Belensarl",
        "Belgarath",
        "Belida",
        "Belimu",
        "Belinzith",
        "Belistra",
        "Belithin",
        "Bellarix",
        "Bellinus",
        "Belloram",
        "Belmalar",
        "Belmatar",
        "Benalath",
        "Beorilf",
        "Beoshar",
        "Berazan",
        "Berefex",
        "Berethan",
        "Beriam",
        "Berlemdo",
        "Bermulan",
        "Berterin",
        "Besagren",
        "Bestagar",
        "Bethalus",
        "Beztevil",
        "Bilamarj",
        "Birictzin",
        "Birimi",
        "Birrtezir",
        "Bisuneh",
        "Bithritrilb",
        "Blascarro",
        "Bo\xe4lod",
        "Bo\xe4zye",
        "Bolangi",
        "Bolgodar",
        "Boradrend",
        "Borvazan",
        "Bordvedo",
        "Boridorn",
        "Borivig",
        "Boroqual",
        "Borosov",
        "Boruja",
        "Breldiar",
        "Breyugar",
        "Brindelvix",
        "Brinzindis",
        "Brirelin",
        "Brofothin",
        "Bruyefol",
        "Bundetlan",
        "Burangald",
        "Byjagan",
        "Caadausid",
        "Cadrillan",
        "Cadxiel",
        "Caglaree",
        "Caladon",
        "Caladra",
        "Calandol",
        "Calandra",
        "Calara",
        "Caldiza",
        "Calial",
        "Calian",
        "Calibarz",
        "Caliburr",
        "Calimen",
        "Calinor",
        "Calinthor",
        "Caliroon",
        "Calrohir",
        "Calvari",
        "Calyreg",
        "Camorba",
        "Camrenard",
        "Candelisce",
        "Candralta",
        "Canteril",
        "Capsia",
        "Caradin",
        "Caraman",
        "Carano",
        "Carastac",
        "Cardannor",
        "Cardriman",
        "Carejjar",
        "Carenac",
        "Caribros",
        "Carvirras",
        "Casliet",
        "Cassira",
        "Castivin",
        "Cathloda",
        "Cauluden",
        "Cavrello",
        "Cazago",
        "Cazrogatz",
        "Cedethea",
        "Cedruin",
        "Celasli",
        "Celedrax",
        "Celeldrir",
        "Celenorb",
        "Celephais",
        "Celimbsel",
        "Celissar",
        "Celmiac",
        "Celria",
        "Cemendur",
        "Ceomyr",
        "Cerastes",
        "Cerdotur",
        "Cereden",
        "Ceremeb",
        "Cerindar",
        "Cernaia",
        "Cerrivald",
        "Cerrlemere",
        "Cervetar",
        "Chakjalom",
        "Chalberyn",
        "Chandalla",
        "Charizar",
        "Charovis",
        "Chasergha",
        "Chatony",
        "Chavrenard",
        "Chayuleth",
        "Chedynas",
        "Chemedis",
        "Cherinra",
        "Cheshinif",
        "Chesifith",
        "Chexotah",
        "Chiranin",
        "Chirophanx",
        "Chirystrad",
        "Chissaera",
        "Choriaal",
        "Chrystara",
        "Cialrak",
        "Ciarna",
        "Ciliath",
        "Cillegra",
        "Cimpelis",
        "Cirial",
        "Cirilar",
        "Cisidor",
        "Claraven",
        "Clarian",
        "Clymerice",
        "Colperat",
        "Colverslyne",
        "Conridas",
        "Coramur",
        "Corcoran",
        "Cordago",
        "Corisur",
        "Cormannon",
        "Coromis",
        "Corraemer",
        "Corstanis",
        "Coyasal",
        "Cramorul",
        "Crayeera",
        "Credori",
        "Cresbaral",
        "Crodelan",
        "Cromora",
        "Crondowys",
        "Cruirmox",
        "Crysindlyn",
        "Cthasia",
        "Cubrucol",
        "Curtifer",
        "Cveralisk",
        "Cyarium",
        "Cynalis",
        "Cynara",
        "Cyrilla",
        "Cyrissil",
        "Daakrasef",
        "Dabnavar",
        "Dacarin",
        "Dagaldsain",
        "Dagorla",
        "Daiavend",
        "Dakkiah",
        "Dakokan",
        "Dalarthra",
        "Dalimir",
        "Dallandra",
        "Dallibren",
        "Dalmaxen",
        "Damarel",
        "Damia",
        "Damisen",
        "Dammarlet",
        "Damria",
        "Danatren",
        "Danbrelaj",
        "Daqualor",
        "Daragard",
        "Darandril",
        "Darani",
        "Darimpelg",
        "Darioj",
        "Darisimp",
        "Darnien",
        "Daruda",
        "Darusor",
        "Darvenel",
        "Darvien",
        "Dasanay",
        "Dasyani",
        "Dathanja",
        "Dauro\xe4t",
        "Daximyr",
        "Dazaroth",
        "Deglavar",
        "Dekreon",
        "Delalea",
        "Delandim",
        "Delaquoth",
        "Delcardes",
        "Delgadjas",
        "Delgari",
        "Deliard",
        "Delitra",
        "Delmonda",
        "Delonos",
        "Delsinar",
        "Demels\xe0vre",
        "Deminar",
        "Demithea",
        "Dendera",
        "Denivra",
        "Deowrix",
        "Deralten",
        "Derian",
        "Derisurm",
        "Derokain",
        "Descelet",
        "Desnema",
        "Desthia",
        "Destrino",
        "Devabril",
        "Devaia",
        "Devaren",
        "Deviscind",
        "Devyna",
        "Dezelglim",
        "Dharijor",
        "Diagur",
        "Diamel",
        "Diastul",
        "Diazrax",
        "Diniwirn",
        "Dional",
        "Diony",
        "Dismarntir",
        "Distana",
        "Distiva",
        "Diurmad",
        "Divior",
        "Do\xe4lva",
        "Dokessin",
        "Dolitan",
        "Dolskior",
        "Domagren",
        "Domovoy",
        "Doniale",
        "Donivesh",
        "Dorana",
        "Doravin",
        "Doraxa",
        "Dorether",
        "Dorgrian",
        "Dorianth",
        "Dorosard",
        "Drafarna",
        "Draglios",
        "Dralgamor",
        "Drelbaran",
        "Dreleon",
        "Dreower",
        "Drusmirak",
        "Druycalid",
        "Durathor",
        "Duruis",
        "Dusoto",
        "Duvalin",
        "Dvereya",
        "Dygardo",
        "Eberyn",
        "Ecarnis",
        "Echengar",
        "Echredrisk",
        "Edalcor",
        "Edamar",
        "Edaris",
        "Edeera",
        "Edeiric",
        "Edelan",
        "Edromon",
        "Eemonil",
        "Eermiaw",
        "Efelin",
        "Efiath",
        "Egarun",
        "Egeanin",
        "Eglashor",
        "Eglathorm",
        "Ehlmargis",
        "Eilinud",
        "Einnara",
        "Ekisha",
        "Elaara",
        "Eladain",
        "Elanja",
        "Elanlir",
        "Elantir",
        "Elardoand",
        "Elayess",
        "Elbasant",
        "Elbrian",
        "Elcaros",
        "Eldikohl",
        "Eldimyr",
        "Eldivren",
        "Eleaseth",
        "Eleniin",
        "Elerasc",
        "Eleril",
        "Elesfar",
        "Elexna",
        "Elhanter",
        "Elharta",
        "Elhiri",
        "Eliaazh",
        "Elindel",
        "Elion",
        "Elispesh",
        "Elissim",
        "Elistan",
        "Eljendril",
        "Ellamoin",
        "Ellanath",
        "Ellendar",
        "Ellidyr",
        "Elmeric",
        "Elmradra",
        "Elnavor",
        "Elno\xeb",
        "Elorix",
        "Elriseth",
        "Elrodin",
        "Elrowan",
        "Elsandar",
        "Elverus",
        "Elzirtha",
        "Emeresc",
        "Emistar",
        "Emparyn",
        "Emra\xebl",
        "Enchasol",
        "Endelaer",
        "Endeltrad",
        "Endoyarl",
        "Endremen",
        "Engkalat",
        "Enifrax",
        "Enliack",
        "Ennorath",
        "Eno\xebre",
        "Ensocand",
        "Enzoray",
        "Eolair",
        "Eolglyu",
        "Eomer",
        "Eosin",
        "Eowine",
        "Eralith",
        "Erbarax",
        "Erdegron",
        "Ere\xe4d",
        "Ereboen",
        "Eregin",
        "Ereia",
        "Ereidan",
        "Ereinid",
        "Eresbor",
        "Ergamarl",
        "Erian",
        "Erihim",
        "Erijin",
        "Erilind",
        "Erilyth",
        "Erimewn",
        "Eriptil",
        "Erizael",
        "Erjesko",
        "Erkollo",
        "Erlata",
        "Erliskan",
        "Ermentej",
        "Ermiod",
        "Ermizard",
        "Erobor",
        "Erraxam",
        "Errixi",
        "Ersazern",
        "Erudin",
        "Eruna",
        "Escaloth",
        "Eshorden",
        "Eskedar",
        "Eslenix",
        "Esmeril",
        "Essamor",
        "Esselin",
        "Estelorn",
        "Estulman",
        "Esyorna",
        "Ethayan",
        "Ethilrist",
        "Ettellarn",
        "Euralen",
        "Eurayo",
        "Evarul",
        "Evedben",
        "Eveltur",
        "Evenor",
        "Everan",
        "Everard",
        "Evidor",
        "Evrilet",
        "Ewugan",
        "Exior",
        "Exorric",
        "Ezirith",
        "Ezpirasp",
        "Ezrabar",
        "Fabliain",
        "Faerlasdar",
        "Fafmalan",
        "Fahorjom",
        "Falamund",
        "Falazarm",
        "Faldian",
        "Faledra",
        "Falias",
        "Faliorn",
        "Fallonar",
        "Falmalin",
        "Famaril",
        "Famiryah",
        "Farammil",
        "Faranar",
        "Farathar",
        "Farazwen",
        "Farendal",
        "Farezar",
        "Farias",
        "Farinda",
        "Farovlem",
        "Farreflan",
        "Farrian",
        "Fassander",
        "Fassiral",
        "Fathanor",
        "Fathimlas",
        "Favular",
        "Fayenned",
        "Felacroy",
        "Felectos",
        "Felendos",
        "Felentir",
        "Felinstrod",
        "Felladin",
        "Fellathor",
        "Fellazoor",
        "Felmarus",
        "Felvia",
        "Fenhalut",
        "Fenkkara",
        "Feollan",
        "Feraanty",
        "Ferazhin",
        "Ferdithir",
        "Ferena",
        "Ferescha",
        "Feridmir",
        "Feridoth",
        "Ferilken",
        "Ferkiel",
        "Fermandra",
        "Fermazeth",
        "Ferozak",
        "Ferrandry",
        "Ferrinox",
        "Fertimqui",
        "Fesanor",
        "Fesmaran",
        "Fethijorn",
        "Fethorval",
        "Fezmirath",
        "Fiaminch",
        "Fiantzin",
        "Fiathna",
        "Fiensar",
        "Fierex",
        "Filigal",
        "Filrena",
        "Finaefin",
        "Findegil",
        "Finmanal",
        "Finrhabar",
        "Fiollix",
        "Fionlex",
        "Fiorag",
        "Fiori",
        "Fiosthan",
        "Firandaal",
        "Firimar",
        "Firmrius",
        "Fivrenesse",
        "Flaco\xeb",
        "Fluimorl",
        "Fo\xe4shroud",
        "Fomorisk",
        "Fonesco",
        "Fontaera",
        "Forambad",
        "Forizuld",
        "Foront\xe9",
        "Forrandir",
        "Foxilkin",
        "Fozdollo",
        "Fraajior",
        "Fragadin",
        "Fre\xe4laf",
        "Frinilex",
        "Frosserthil",
        "Frugansey",
        "Fuareece",
        "Fulinas",
        "Fulmerack",
        "Fumorak",
        "Furalor",
        "Fusial",
        "Gadino",
        "Gaffindur",
        "Gaherist",
        "Gaianac",
        "Galassad",
        "Galedrej",
        "Galeeya",
        "Galeia",
        "Galendil",
        "Galhambraj",
        "Galhandvis",
        "Galiel",
        "Galjiu",
        "Gallaia",
        "Galorin",
        "Galrion",
        "Galthien",
        "Galtyran",
        "Galvaris",
        "Gambrefax",
        "Gamorrand",
        "Ganatus",
        "Ganelon",
        "Ganoraz",
        "Ganscion",
        "Ganzadahl",
        "Garagrim",
        "Garalden",
        "Garathgen",
        "Garduil",
        "Gardulkar",
        "Garemo",
        "Garflion",
        "Garlenon",
        "Garriech",
        "Garziot",
        "Gastenmil",
        "Gatlatas",
        "Gatzeiros",
        "Gavendra",
        "Gavilen",
        "Gefandrall",
        "Gelsgiath",
        "Genteras",
        "Gerergol",
        "Gerexi",
        "Geskrivus",
        "Gevanarth",
        "Ghiella",
        "Gidyrrha",
        "Gildanar",
        "Gilennan",
        "Gilfangron",
        "Giljrian",
        "Giltsanos",
        "Gimika",
        "Gipideur",
        "Girazi",
        "Giridal",
        "Giridyne",
        "Giriel",
        "Girkirath",
        "Gisorath",
        "Gisriral",
        "Gisselek",
        "Givirtrik",
        "Gizarak",
        "Gizbion",
        "Gizherae",
        "Gledrion",
        "Gleocyn",
        "Gleyander",
        "Gliranna",
        "Glirfingril",
        "Goibhniu",
        "Golexar",
        "Golo\xeb",
        "Gonscevin",
        "Gontomir",
        "Goranna",
        "Gorazky",
        "Gordalis",
        "Gorias",
        "Gorion",
        "Goronwy",
        "Goronyr",
        "Gorova",
        "Gorthokon",
        "Graginar",
        "Graliath",
        "Gredanost",
        "Griarnix",
        "Griotam",
        "Grissejan",
        "Grolliax",
        "Gualat",
        "Guilmarn",
        "Gulifrith",
        "Gurnarok",
        "Gwyrion",
        "Gydrian",
        "Gymnivus",
        "Gyrelyest",
        "Hacoulede",
        "Hadowrak",
        "Hafranel",
        "Haielva",
        "Haijannod",
        "Hajandin",
        "Hakatri",
        "Halibarn",
        "Halios",
        "Haliwyn",
        "Halveron",
        "Halvia",
        "Hamadar",
        "Hamancen",
        "Hamavand",
        "Hanamere",
        "Haneran",
        "Hanorayn",
        "Hanrassu",
        "Hantaira",
        "Haplana",
        "Haprissa",
        "Harana",
        "Harandash",
        "Harezek",
        "Hargranar",
        "Harigran",
        "Harnahad",
        "Harobel",
        "Harondar",
        "Harromarl",
        "Harsinna",
        "Hartien",
        "Hartazan",
        "Hasalgar",
        "Hasprion",
        "Hathlizu",
        "Hathvoril",
        "Hautilim",
        "Hautulin",
        "Hauxpomel",
        "Haxmaraun",
        "Haxmaspar",
        "Haxmered",
        "Hazalet",
        "Hazazel",
        "Hazharat",
        "Haziran",
        "Hedrapake",
        "Heereos",
        "Hekeren",
        "Helbathil",
        "Helobaine",
        "Helphegad",
        "Helziatz",
        "Hemgarel",
        "Henalur",
        "Herecharn",
        "Heriganj",
        "Heriol",
        "Hessevet",
        "Hethica",
        "Heuleanar",
        "Hexavren",
        "Hexelin",
        "Hiabaid",
        "Hiassveil",
        "Hifridil",
        "Higlaia",
        "Hilio",
        "Himurlem",
        "Hintyrit",
        "Hirodrix",
        "Hizirin",
        "Hokry\xe4hn",
        "Holmarun",
        "Horbajir",
        "Horlabo",
        "Hralfecca",
        "Hrioncet",
        "Hulterna",
        "Hurja\xebl",
        "Huvatal",
        "Hyaliptar",
        "Hyarantar",
        "Hydrestin",
        "Hylamet",
        "Hylarel",
        "Hylissa",
        "Hyphorond",
        "Hyraskel",
        "Hyrkhalla",
        "Hyzaspes",
        "Iahaun",
        "Iarlen",
        "Iasho",
        "Ibekon",
        "Ibgali",
        "Ibrana",
        "Ibriax",
        "Ibriole",
        "Icanaar",
        "Icavra",
        "Icera",
        "Ichandrik",
        "Ichindar",
        "Idarlan",
        "Iffalon",
        "Igjaru",
        "Ijevthla",
        "Ikarin",
        "Ikirkar",
        "Ilabrem",
        "Ilairam",
        "Ilarnin",
        "Ildezir",
        "Ilenfal",
        "Ilfangir",
        "Ilfinir",
        "Ilgaeldar",
        "Ilikir",
        "Ilimvair",
        "Ilkern\xe9",
        "Ilkyarzim",
        "Illana",
        "Illara",
        "Illiarn",
        "Illsuin",
        "Illuanc",
        "Illurdan",
        "Ilkaroque",
        "Ilnitelg",
        "Ilrehjan",
        "Ilumaar",
        "Ilvelisk",
        "Imaia",
        "Imajin",
        "Imashla",
        "Imaydra",
        "Imedet",
        "Imikeer",
        "Imilxime",
        "Imisard",
        "Immelanx",
        "Immoreth",
        "Immornam",
        "Imnatris",
        "Imrahran",
        "Imravog",
        "Imrazixt",
        "Imzia",
        "Inayiss",
        "Indreju",
        "Ingrenux",
        "Inhectin",
        "Inidar",
        "Inifael",
        "Inifox",
        "Ininay",
        "Inisdex",
        "Inisfail",
        "Inkiljist",
        "Inkotai",
        "Inno\xe4k",
        "Inora",
        "Insallasc",
        "Intaphka",
        "Inzellene",
        "Ioga",
        "Iolan",
        "Iombar",
        "Iosaz",
        "Iosdil",
        "Iperi",
        "Iphara",
        "Ipholar",
        "Ipolok",
        "Iptasor",
        "Irankar",
        "Irathar",
        "Ireneemp",
        "Irial",
        "Irian",
        "Iriboth",
        "Iriga",
        "Irmaskor",
        "Irmistib",
        "Irphilin",
        "Irriosce",
        "Irshirkur",
        "Isaelsu",
        "Isamar",
        "Isarma",
        "Isbexa",
        "Isencal",
        "Isgremnir",
        "Ishmira",
        "Ishnitra",
        "Isiki",
        "Iskarrine",
        "Iskimi",
        "Iskiret",
        "Isodrost",
        "Isotu",
        "Isromant",
        "Isrotha",
        "Issakra",
        "Issanthal",
        "Issevex",
        "Issimrak",
        "Istengrem",
        "Istensanth",
        "Isthentild",
        "Istheol",
        "Isthgiol",
        "Istidom",
        "Istijed",
        "Istroval",
        "Isuxnen",
        "Itharna",
        "Ithelus",
        "Ithimryr",
        "Ithineg",
        "Ithober",
        "Iventhax",
        "Ivrishel",
        "Iwranda",
        "Ixambel",
        "Ixanthis",
        "Ixarine",
        "Ixcavar",
        "Ixium",
        "Iyenna",
        "Iyiskek",
        "Izpiizzi",
        "Jabarla",
        "Jablomeed",
        "Jaelmura",
        "Jafila",
        "Jagadis",
        "Jagaroch",
        "Jahaurin",
        "Jakalar",
        "Jakarhul",
        "Jakendar",
        "Jakharral",
        "Jakronib",
        "Jalaran",
        "Jalatha",
        "Jaleana",
        "Jaligar",
        "Jalisharn",
        "Jalnio",
        "Jalvochin",
        "Jance\xe4",
        "Jandagar",
        "Jandenor",
        "Janien",
        "Janniel",
        "Jaralor",
        "Jarantin",
        "Jaratryne",
        "Jardilan",
        "Jarien",
        "Jarioth",
        "Jaronris",
        "Jascelat",
        "Jascenant",
        "Jaslani",
        "Jassolind",
        "Jatherfar",
        "Jathlabra",
        "Jathzoril",
        "Jaukulmar",
        "Jaurelin",
        "Javennae",
        "Javrezac",
        "Jazaeron",
        "Jejaneel",
        "Jeleeya",
        "Jelerish",
        "Jelgrion",
        "Jemadar",
        "Jemkoleng",
        "Jeoric",
        "Jeoster",
        "Jeprana",
        "Jertezan",
        "Jervida",
        "Jessabra",
        "Jevalor",
        "Jevedic",
        "Jevorin",
        "Jevrian",
        "Jhessala",
        "Jhinilak",
        "Jianthi",
        "Jidesa",
        "Jifrusni",
        "Jijinjic",
        "Jilarna",
        "Jilitha",
        "Jillaro",
        "Jingaran",
        "Jiriselk",
        "Jiruik",
        "Jivessla",
        "Jivizet",
        "Jixannil",
        "Jizuret",
        "Jo\xe4sra",
        "Joplezno",
        "Jorian",
        "Joriel",
        "Jorodrin",
        "Josafyre",
        "Jothaugan",
        "Jothera",
        "Jozranal",
        "Jranahaz",
        "Juarin",
        "Jumeon",
        "Juramanx",
        "Jussondrel",
        "Juxeccan",
        "Juzawik",
        "Kacinzen",
        "Kadishir",
        "Kahora",
        "Kairaku",
        "Kajabor",
        "Kajua",
        "Kalandrin",
        "Kaledath",
        "Kalvaro",
        "Kamisu",
        "Kamundam",
        "Kandonak",
        "Kandorin",
        "Kapasin",
        "Kara\xebl",
        "Karamis",
        "Karanchir",
        "Kardarkar",
        "Kardotha",
        "Karela",
        "Karezthame",
        "Karimeg",
        "Karogan",
        "Kasiran",
        "Kasluna",
        "Kastana",
        "Kastau\xebt",
        "Kasthukras",
        "Kathanal",
        "Katryzaj",
        "Katumar",
        "Kazellor",
        "Kazu\xf6n",
        "Kedrinal",
        "Kelemon",
        "Kelmerveld",
        "Kelraiog",
        "Kelvixa",
        "Kemmergen",
        "Kerannix",
        "Kerason",
        "Kerasun",
        "Kerendul",
        "Kerfina",
        "Kernamald",
        "Keroona",
        "Kerrekril",
        "Kerrihaude",
        "Kestramel",
        "Kexranea",
        "Khadera",
        "Khalid\xfbr",
        "Kharisden",
        "Khelaret",
        "Khorenym",
        "Khosilin",
        "Khuraram",
        "Khurkula",
        "Kiarak",
        "Kiaskek",
        "Kifadli",
        "Kinbulser",
        "Kinjeon",
        "Kintarna",
        "Kioxug",
        "Kireoj",
        "Kirias",
        "Kiriok",
        "Kirithul",
        "Kirrevi",
        "Kiuspou",
        "Kizarlon",
        "Klandisar",
        "Klirundon",
        "Kodoki",
        "Korachon",
        "Korasal",
        "Kortien",
        "Korvaron",
        "Kotajad",
        "Kothenai",
        "Kovaia",
        "Kozanga",
        "Krasgalad",
        "Krienna",
        "Krisilal",
        "Krytelgaz",
        "Kuiju",
        "Kydomor",
        "Kylara",
        "Kylinsra",
        "Kymelin",
        "Kymorel",
        "Kyrembra",
        "Kyvaran",
        "Kyveler",
        "Laaraban",
        "Lacoumox",
        "Lacrion",
        "Ladamur",
        "Ladestro",
        "Laesina",
        "Lafera",
        "Lagaram",
        "Lagova",
        "Lahanolt",
        "Laklanot",
        "Lalaia",
        "Lalthilan",
        "Lamidris",
        "Lamifer",
        "Lamizjax",
        "Lampralur",
        "Lamrella",
        "Lanisor",
        "Lanival",
        "Lanstre\xe4",
        "Lantakrel",
        "Lantamar",
        "Lanumel",
        "Lappeleme",
        "Laprimal",
        "Larana",
        "Laranel",
        "Larilect",
        "Larion",
        "Larquinip",
        "Lascynthis",
        "Lasirusk",
        "Lataffin",
        "Lattremond",
        "Lazadon",
        "Ledmial",
        "Legaaruksh",
        "Lelatha",
        "Leledish",
        "Lendela",
        "Lendoweer",
        "Leodaan",
        "Leojith",
        "Leoptrin",
        "Leptenar",
        "Leptredin",
        "Leranorb",
        "Lessefren",
        "Lethrian",
        "Levasim",
        "Lhyrrhana",
        "Liamar",
        "Liambra",
        "Liammeck",
        "Lianairn",
        "Liansra",
        "Lianvrin",
        "Liarxa",
        "Liavec",
        "Liembra",
        "Lilasta",
        "Lilkauki",
        "Lilthia",
        "Limbria",
        "Linargan",
        "Linnaker",
        "Lionus",
        "Liossoor",
        "Liquemar",
        "Liroitzin",
        "Lisimbra",
        "Lissara",
        "Lissflorel",
        "Lithuir",
        "Lithyulin",
        "Litoefer",
        "Liydala",
        "Lizenna",
        "Lizinra",
        "Llanaanu",
        "Lo\xebra",
        "Logano",
        "Lorana",
        "Lorenvra",
        "Loriant",
        "Lozeneth",
        "Luciet",
        "Lucimer",
        "Lunzia",
        "Lurepusc",
        "Luspilkir",
        "Luthirring",
        "Luuranoth",
        "Lydalay",
        "Lymandal",
        "Lynaya",
        "Lyndr\xe9",
        "Lynxias",
        "Lypilla",
        "Lyraloss",
        "Lyrian",
        "Lyrossa",
        "Lyrozi",
        "Lythian",
        "Lythratole",
        "Lyzeary",
        "Maalkeyan",
        "Maceon",
        "Madaluur",
        "Madiglim",
        "Madora",
        "Maerleetlas",
        "Maeronyx",
        "Mafranic",
        "Magezatt",
        "Magithel",
        "Maglethom",
        "Magylin",
        "Mahelas",
        "Majaelith",
        "Makana",
        "Mala\xebsse",
        "Malaioc",
        "Malambard",
        "Malandor",
        "Malasire",
        "Malasquor",
        "Malavok",
        "Malbrosac",
        "Maldagon",
        "Malechan",
        "Malestrin",
        "Malgadarn",
        "Malhantis",
        "Malhemar",
        "Malidryth",
        "Malifrin",
        "Malisken",
        "Mallaran",
        "Maloroc",
        "Malsanon",
        "Mamvier",
        "Mandrezool",
        "Manjalem",
        "Mannanon",
        "Mantragan",
        "Ma\xf6ndat",
        "Mapiran",
        "Mardieth",
        "Maridan",
        "Maridisp",
        "Marindro",
        "Marinus",
        "Marivik",
        "Marliok",
        "Marmaranx",
        "Marmeron",
        "Marniel",
        "Marreldix",
        "Marsarok",
        "Marsineh",
        "Martanzix",
        "Maruis",
        "Mashalla",
        "Masira",
        "Massoran",
        "Mathannil",
        "Matzirik",
        "Maunestin",
        "Mavira",
        "Maxander",
        "Maxtibel",
        "Mazegus",
        "Mazesra",
        "Mazian",
        "Mazivel",
        "Medarinn",
        "Medrahar",
        "Medvergaal",
        "Mehalet",
        "Mejarlan",
        "Mekeesha",
        "Melamnir",
        "Melapis",
        "Melasdar",
        "Melikkhaz",
        "Meliune",
        "Melliorn",
        "Melorond",
        "Memisaire",
        "Menalor",
        "Mendobarl",
        "Menelvaour",
        "Meodas",
        "Meraleph",
        "Merama",
        "Meramel",
        "Meranshu",
        "Meraudax",
        "Meriag",
        "Meridyn",
        "Meriel",
        "Merilec",
        "Merinar",
        "Merinard",
        "Merivran",
        "Merkalo",
        "Merlience",
        "Merresil",
        "Merscianthe",
        "Mertamet",
        "Mesegrim",
        "Metrofa",
        "Mevedet",
        "Mewreddan",
        "Mezedan",
        "Mezerel",
        "Mezlehet",
        "Mezlethil",
        "Mezrian",
        "Mezrenain",
        "Mezvorax",
        "Mialdere",
        "Mialorn",
        "Midela",
        "Mierah",
        "Mikramil",
        "Milicseth",
        "Minaxa",
        "Minrioth",
        "Miranei",
        "Mirantilb",
        "Mirelith",
        "Mirenta",
        "Miriel",
        "Mirieth",
        "Mirintha",
        "Mirion",
        "Mirreschade",
        "Mirrsomi",
        "Misella",
        "Misiplum",
        "Misirim",
        "Mithelos",
        "Mo\xe4lroc",
        "Mobrias",
        "Moieddin",
        "Moisiane",
        "Molhanni",
        "Mondestin",
        "Moramin",
        "Morannel",
        "Morilimth",
        "Morleved",
        "Mormindar",
        "Morofar",
        "Morozam",
        "Morrixan",
        "Mosbelo",
        "Movellan",
        "Moxfiel",
        "Mrankali",
        "Mredisu",
        "Mujeket",
        "Mulciner",
        "Mumivor",
        "Murbahir",
        "Murias",
        "Murinja",
        "Mustesra",
        "Mylbdenir",
        "Mylenost",
        "Myllara",
        "Myloryx",
        "Myractus",
        "Myrmelesc",
        "Myrrhismir",
        "Myrstica",
        "Myruken",
        "Myvior",
        "Naadien",
        "Nabronyb",
        "Na\xebska",
        "Nagarax",
        "Naiagard",
        "Najikim",
        "Nambolar",
        "Namezlith",
        "Namien",
        "Nappolanc",
        "Naramant",
        "Naranlob",
        "Naraven",
        "Narecan",
        "Naretha",
        "Narfalax",
        "Narimas",
        "Narisdaat",
        "Narissa",
        "Narotham",
        "Narothun",
        "Narrabhar",
        "Narseldax",
        "Nasmerul",
        "Nateera",
        "Nathogan",
        "Natrifer",
        "Nauthzegam",
        "Naveiruz",
        "Navislorn",
        "Navithesk",
        "Nefaroyn",
        "Negula",
        "Nelibar",
        "Nelphina",
        "Nelthenti",
        "Nelveren",
        "Nemarhaz",
        "Nemisen",
        "Nereitra",
        "Nerevaunt",
        "Nerian",
        "Nerida",
        "Neryonid",
        "Netharna",
        "Netho\xebl",
        "Neveena",
        "Nexian",
        "Nexlio",
        "Niascynth",
        "Nidoran",
        "Nienra",
        "Niggollo",
        "Nilchauntif",
        "Nilmio",
        "Nimandest",
        "Nimfiralth",
        "Nimiax",
        "Ninozain",
        "Niomakh",
        "Nisamon",
        "Nisaqua",
        "Nissafen",
        "Nitharna",
        "Nithikin",
        "Nitoda",
        "Nivilan",
        "Nizamar",
        "Nizared",
        "Noldiruth",
        "Nolteera",
        "Nooranda",
        "Norian",
        "Norvandrel",
        "Noumander",
        "Novrima",
        "Noxalwan",
        "Nuanvi",
        "Nuarban",
        "Nujriha",
        "Nulagdi",
        "Nuskuron",
        "Nyrana",
        "Nysorat",
        "Obatzi",
        "Obelnid",
        "Ocmias",
        "Odimos",
        "Offenalke",
        "Ogola",
        "Ohranjat",
        "Ojavi",
        "Ojilinx",
        "Okalder",
        "Okpala",
        "Oktavisp",
        "Olamar",
        "Olbenos",
        "Oldarane",
        "Oldrinben",
        "Olican",
        "Ollascet",
        "Olnefkin",
        "Olondin",
        "Olonthos",
        "Oloru",
        "Oloxem",
        "Olybris",
        "Omaldras",
        "Omaphel",
        "Omarna",
        "Omarthis",
        "Omberdal",
        "Ombriand",
        "Ommarisk",
        "Omosdur",
        "Omziec",
        "Onaldrus",
        "Oneira",
        "Onfivlen",
        "Oniack",
        "Onjedrit",
        "Onoxim",
        "Oolevran",
        "Oomia",
        "Oorandehle",
        "Oquilda",
        "Oradrad",
        "Orbasdron",
        "Orbeleez",
        "Orbitan",
        "Orchellor",
        "Orebus",
        "Oremex",
        "Orenai",
        "Orennem",
        "Oridyr",
        "Oriob",
        "Oristkel",
        "Orithreyn",
        "Orivaen",
        "Orlantsu",
        "Orliend",
        "Orlopem",
        "Orluan",
        "Ormadzel",
        "Ormarit",
        "Ormion",
        "Ornulaa",
        "Orodel",
        "Oromrath",
        "Orovar",
        "Orovune",
        "Orpirrhis",
        "Orreminsk",
        "Ortazan",
        "Osgoran",
        "Oskana",
        "Osmoril",
        "Osoyrir",
        "Ossfenness",
        "Otargol",
        "Othaldon",
        "Otralinx",
        "Oujanglor",
        "Ouraia",
        "Ovarasc",
        "Ovelleau",
        "Oveselm",
        "Ovranoj",
        "Ovrenor",
        "Oxavar",
        "Oxavart",
        "Oxru\xebl",
        "Ozatris",
        "Ozgethern",
        "Ozmirall",
        "Ozringol",
        "Palabell",
        "Palarna",
        "Palegain",
        "Palidral",
        "Palimbrust",
        "Palinor",
        "Panafig",
        "Pandaxes",
        "Pandelee",
        "Pandeleur",
        "Paomelna",
        "Pardyereyk",
        "Pargascir",
        "Parlion",
        "Paskorran",
        "Pastengral",
        "Pavadahl",
        "Pavandor",
        "Paxijanc",
        "Paxilla",
        "Pazaleeb",
        "Peladon",
        "Peledor",
        "Pelendur",
        "Peleod",
        "Pelezef",
        "Peliast",
        "Pelizon",
        "Pellingale",
        "Pelmercest",
        "Pelmergol",
        "Pelsiffra",
        "Penengvik",
        "Peradal",
        "Peraga",
        "Perendan",
        "Perendor",
        "Peridor",
        "Peripril",
        "Perisgrim",
        "Peristaad",
        "Perligon",
        "Pernian",
        "Perridex",
        "Persimmid",
        "Perushka",
        "Peslivar",
        "Petreban",
        "Phaidonaz",
        "Phaneon",
        "Pharethyn",
        "Phariol",
        "Pharnioth",
        "Phascalon",
        "Phesian",
        "Phiarusk",
        "Philizim",
        "Phiniak",
        "Phiressa",
        "Phoosrotex",
        "Phoseter",
        "Phramberzond",
        "Phranzulet",
        "Piapiar",
        "Pievalp",
        "Pillia",
        "Pioma",
        "Pirigal",
        "Pirilaud",
        "Pirinweal",
        "Piritosk",
        "Pis\xe7ion",
        "Pishior",
        "Pithibryl",
        "Piynameer",
        "Plamias",
        "Plenchiel",
        "Poinellay",
        "Poinembet",
        "Polassar",
        "Polorrum",
        "Porodo",
        "Porsenna",
        "Potadu",
        "Priligrel",
        "Progneti",
        "Ptamriad",
        "Ptelian",
        "Pteraphon",
        "Pulsavra",
        "Pyrenda",
        "Pyrtolosc",
        "Pytholtus",
        "Pytrigon",
        "Quaeleon",
        "Quagrana",
        "Qualbian",
        "Qualhassan",
        "Quana\xf6ck",
        "Quandiel",
        "Queegani",
        "Quenteri",
        "Quentezard",
        "Queoddry",
        "Queridra",
        "Quero\xeb",
        "Quersemel",
        "Quilium",
        "Quilverex",
        "Quinibus",
        "Quisifrix",
        "Quolatha",
        "Quolessip",
        "Quoran\xfbl",
        "Quyzacorm",
        "Raascia",
        "Racassar",
        "Rackafel",
        "Radasman",
        "Radelon",
        "Radula",
        "Raiveral",
        "Rajiten",
        "Rajurno",
        "Rakmyrral",
        "Rakshilan",
        "Ralanzur",
        "Ralisimp",
        "Ralmanor",
        "Ralystra",
        "Ramura",
        "Ranessin",
        "Ranicroy",
        "Ranifice",
        "Ranomar",
        "Rasaleth",
        "Rashemba",
        "Rassdolim",
        "Rasseglin",
        "Rassfydel",
        "Rastilon",
        "Ravathene",
        "Ravenor",
        "Raverail",
        "Ravimo",
        "Raxia",
        "Razamor",
        "Raziel",
        "Re\xe4nkal",
        "Reepifer",
        "Regalorj",
        "Regimir",
        "Reldorin",
        "Releza",
        "Relikin",
        "Relion",
        "Rellevirk",
        "Relliapt",
        "Relundar",
        "Rendeptir",
        "Renzelath",
        "Reonin",
        "Requiek",
        "Rescorance",
        "Resmenalse",
        "Retalkin",
        "Rethia",
        "Revenal",
        "Rezmyra",
        "Rhakotis",
        "Rhendalin",
        "Rhiacind",
        "Rhimaya",
        "Rhimeren",
        "Rhisala",
        "Rhomiscele",
        "Rhydolin",
        "Rhy\xf6lar",
        "Riasine",
        "Riatar",
        "Riatha",
        "Rickata",
        "Rigisil",
        "Rigonav",
        "Riimara",
        "Rilatha",
        "Rilidtai",
        "Rilmara",
        "Rilmorban",
        "Rinxfantir",
        "Riodan",
        "Riolarn",
        "Riolba",
        "Riscintell",
        "Risgana",
        "Risia",
        "Risrinam",
        "Rithotarl",
        "Rixian",
        "Rizifire",
        "Rocapeste",
        "Rodifel",
        "Rodion",
        "Ro\xebnen",
        "Rokefyre",
        "Romela",
        "Romenom",
        "Rondolla",
        "Rophelon",
        "Rophendir",
        "Rosmarlind",
        "Rou\xe4dth",
        "Rovlerac",
        "Rozeeldin",
        "Rugiel",
        "Ruhria",
        "Rumilan",
        "Runian",
        "Rusaadi",
        "Rusalmna",
        "Rusitholk",
        "Ruvasarn",
        "Ruvatro",
        "Ry\xf6zile",
        "Rynian",
        "Rynristas",
        "Rynyris",
        "Ryxarro",
        "Sabrazsa",
        "Sabriel",
        "Sabtimon",
        "Sadabel",
        "Sadeera",
        "Sadonel",
        "Safarrinx",
        "Saffinka",
        "Sagamir",
        "Saguil",
        "Sa\xefnda",
        "Sajaerix",
        "Salaarus",
        "Salathir",
        "Salclias",
        "Salina",
        "Salinen",
        "Salioct",
        "Salitlan",
        "Salmorin",
        "Salrissa",
        "Samalend",
        "Samerlan",
        "Sancial",
        "Sannsara",
        "Sanorye",
        "Sanpellin",
        "Sanseran",
        "Sanzhara",
        "Saqavar",
        "Sarandere",
        "Saraxa",
        "Sardanak",
        "Sarendril",
        "Sargadal",
        "Sariya",
        "Sarkinos",
        "Sarkozan",
        "Sarlian",
        "Sarmasar",
        "Saro\xeb",
        "Sarozak",
        "Sarrier",
        "Sarrofo",
        "Sarsicaul",
        "Sartenna",
        "Sarupha",
        "Saschalon",
        "Sathlatta",
        "Satrothan",
        "Sav\xeama",
        "Savretos",
        "Savria",
        "Scathanar",
        "Scesefna",
        "Sebandune",
        "Selamvra",
        "Selestor",
        "Selial",
        "Selidro",
        "Selior",
        "Selmiar",
        "Selnara",
        "Selnia",
        "Selsabar",
        "Selverel",
        "Semarsen",
        "Semdalice",
        "Semmagel",
        "Semurquan",
        "Sendara",
        "Senoster",
        "Seorra",
        "Sepiroth",
        "Seprenal",
        "Sepria",
        "Serakel",
        "Serambast",
        "Seramir",
        "Serefic",
        "Serrios",
        "Sertumen",
        "Servelen",
        "Serydran",
        "Seskandal",
        "Sevandir",
        "Sevandor",
        "Severique",
        "Severlesk",
        "Sevlasn\xe9",
        "Seytarin",
        "Sfaeriqua",
        "Sferalan",
        "Sferio",
        "Shaikala",
        "Shalimed",
        "Shameera",
        "Shanatherl",
        "Shanderzoth",
        "Sharajsha",
        "Sharbremil",
        "Shardovan",
        "Sharretal",
        "Shaxe\xe4n",
        "Shehallem",
        "Shekkazad",
        "Sherethis",
        "Sherina",
        "Sherotha",
        "Shevrian",
        "Shibema",
        "Shiennith",
        "Shildakor",
        "Shimjian",
        "Sholgonda",
        "Shragonach",
        "Shrymaroyne",
        "Shurakai",
        "Shushila",
        "Sialtaan",
        "Sianar",
        "Siandar",
        "Siandor",
        "Siannem",
        "Sidanzar",
        "Siendred",
        "Sientij",
        "Sientrib",
        "Siflana",
        "Sigilla",
        "Sildengold",
        "Silifer",
        "Silistel",
        "Silivis",
        "Silmriel",
        "Silvarak",
        "Silvronom",
        "Simara",
        "Simblio",
        "Simirling",
        "Simisthir",
        "Simrana",
        "Simusha",
        "Sindaract",
        "Sindiris",
        "Sindiroq",
        "Sinhadak",
        "Sinira",
        "Sinoprin",
        "Siortlen",
        "Sioshorl",
        "Sirelu",
        "Sirenel",
        "Sirgamesc",
        "Sirifrix",
        "Sirinar",
        "Sisimar",
        "Sisimbra",
        "Siugorn",
        "Sjalara",
        "Skalidra",
        "Skelalack",
        "Skelogha",
        "Skelother",
        "Skesira",
        "Slanarra",
        "Slanria",
        "Slenlior",
        "Slevindralsk",
        "Slyrmegnel",
        "Sofrego",
        "Sofurin",
        "Soleddin",
        "Solfellan",
        "Soliroq",
        "Solliot",
        "Solmerip",
        "Soltharan",
        "Somagar",
        "Sondaardrel",
        "Sondrelen",
        "Soomerak",
        "Soquallin",
        "Sorasta",
        "Sormian",
        "Sozmerold",
        "Srandelix",
        "Sravoorin",
        "Steraval",
        "Sthinalel",
        "Stiaver",
        "Stivernach",
        "Sudevim",
        "Sufranar",
        "Suilim",
        "Sujorgni",
        "Sukratak",
        "Sulathaag",
        "Sulethri",
        "Suliane",
        "Sulien",
        "Sulimo",
        "Sulkanar",
        "Sulkari",
        "Sulron\xe9",
        "Surmaris",
        "Suruay",
        "Suzamil",
        "Svialdan",
        "Swangoren",
        "Sweiborla",
        "Sylvetane",
        "Symaril",
        "Syriolg",
        "Syzirept",
        "Szivistri",
        "Taalivex",
        "Tabusaad",
        "Tadasli",
        "Tafashic",
        "Tainbara",
        "Taladere",
        "Talareme",
        "Talarin",
        "Talertus",
        "Talien",
        "Taliess",
        "Talieux",
        "Talion",
        "Talislance",
        "Talmora",
        "Taloxar",
        "Taloxi",
        "Talunon",
        "Tamavold",
        "Tamias",
        "Tamioj",
        "Tamlivran",
        "Tamnithir",
        "Tanafin",
        "Tanakord",
        "Tanier",
        "Tanjalas",
        "Tanjara",
        "Tanseral",
        "Tanviu",
        "Tarakus",
        "Taramag",
        "Taramos",
        "Tardelin",
        "Tariaj",
        "Tarkenthos",
        "Tarmesorn",
        "Tarmioc",
        "Taroya",
        "Tasardy",
        "Taslhiot",
        "Tassafert",
        "Tassiran",
        "Taumonar",
        "Taveli",
        "Tavista",
        "Tayaren",
        "Te\xe4nyn",
        "Tegana",
        "Tegleron",
        "Teirajan",
        "Teirishir",
        "Telarna",
        "Telcyra",
        "Teldrua",
        "Telegris",
        "Telendys",
        "Teleura",
        "Telnarzim",
        "Temeris",
        "Temeslin",
        "Temmosus",
        "Temontel",
        "Tenadas",
        "Tenidrist",
        "Teotsir",
        "Terasiln",
        "Terejoen",
        "Terena",
        "Terquaelen",
        "Terrenus",
        "Terthelej",
        "Terthyrkrim",
        "Terva\xebn",
        "Tesmarrak",
        "Tevala",
        "Tezarim",
        "Thadarin",
        "Thalafer",
        "Thalaras",
        "Thalira",
        "Thalladyle",
        "Thameera",
        "Thamiel",
        "Thanalar",
        "Tharamoon",
        "Tharnia",
        "Tharomyl",
        "Tharoval",
        "Thellikkin",
        "Thelodin",
        "Thereski",
        "Thieras",
        "Thieryn",
        "Thirindon",
        "Thithrama",
        "Thitrivar",
        "Thixagen",
        "Thlenedern",
        "Thlunarna",
        "Thoorana",
        "Thrabanquo",
        "Thumithar",
        "Thurmatoth",
        "Thuuvanar",
        "Tiabrell",
        "Tiachul",
        "Tianan",
        "Tiaosut",
        "Tiaxa",
        "Tiazan",
        "Tiefkol",
        "Tifulgar",
        "Tigrana",
        "Tirages",
        "Tiregam",
        "Tirelev",
        "Tirion",
        "Tirlimist",
        "Tirrasthu",
        "Tissawane",
        "Titia",
        "Tivadul",
        "Tiveran",
        "Tivriex",
        "Tiyagar",
        "Tizvian",
        "Tolarim",
        "Tolarmej",
        "Tolenka",
        "Tolibell",
        "Toramus",
        "Torbera",
        "Torgassin",
        "Torlion",
        "Tormitran",
        "Toro\xe4sh",
        "Toroman",
        "Torquenyx",
        "Torresind",
        "Torsamant",
        "Torzundus",
        "Tothirnal",
        "Tralien",
        "Tralquien",
        "Traviod",
        "Tredestin",
        "Trellium",
        "Trenaevis",
        "Trilajo",
        "Trinezhan",
        "Triolus",
        "Trisdestrin",
        "Troviawn",
        "Trydaron",
        "Trysadon",
        "Tsacramal",
        "Tsalkoril",
        "Tuilleth",
        "Tulio",
        "Tuniger",
        "Turmalin",
        "Turobel",
        "Turvesin",
        "Twanalor",
        "Twillessin",
        "Tylastreen",
        "Tyldora",
        "Tylenea",
        "Tyradin",
        "Tyrathis",
        "Tyrtyra",
        "Tzaroli",
        "Ualosk",
        "Ubdakon",
        "Udanax",
        "Udanib",
        "Udefoin",
        "Udrahart",
        "Udria",
        "Ufanort",
        "Ufial",
        "Ugivor",
        "Uilda",
        "Uilric",
        "Uixet",
        "Ukinorn",
        "Ulanthas",
        "Ulember",
        "Ulendal",
        "Ullifan",
        "Ulnavell",
        "Ulnaxdra",
        "Ulrepin",
        "Ulro\xebnce",
        "Umaspin",
        "Umbraheed",
        "Umbrina",
        "Umerac",
        "Umeri",
        "Umikrel",
        "Umistal",
        "Undalryn",
        "Unedrinj",
        "Unkalisk",
        "Unstoffel",
        "Ura\xf6r",
        "Urghazkoy",
        "Urhankren",
        "Urimnor",
        "Urjalum",
        "Urjaya",
        "Urmalgis",
        "Urrelor",
        "Urzunift",
        "Uscrumine",
        "Usegar",
        "Ushamtar",
        "Usigul",
        "Uskanast",
        "Ussala",
        "Ussolec",
        "Ustaleaugh",
        "Uthudain",
        "Utorel",
        "Uveena",
        "Uxavis",
        "Uxinor",
        "Uxuvi",
        "Uzileth",
        "Uziprost",
        "Uzirin",
        "Uzisloj",
        "Vacru\xebx",
        "Vakrissa",
        "Valabar",
        "Valadan",
        "Valagarth",
        "Valandrib",
        "Valarend",
        "Valarom",
        "Valaxis",
        "Valdera",
        "Valfoxel",
        "Valina",
        "Valion",
        "Valistes",
        "Vallia",
        "Valmerac",
        "Valphanar",
        "Valserna",
        "Valterla",
        "Valthom\xe9",
        "Vanamon",
        "Vanara",
        "Vanathil",
        "Vandelex",
        "Vanegrin",
        "Vangrahzmid",
        "Vantarad",
        "Varamanx",
        "Varamid",
        "Varamis",
        "Varcantis",
        "Varchimas",
        "Varkellit",
        "Varlandel",
        "Varra\xebl",
        "Varrakel",
        "Vashlion",
        "Vasmarro",
        "Vaudirek",
        "Vayemis",
        "Vedaraf",
        "Veezpro\xe4",
        "Velaila",
        "Velanac",
        "Velija",
        "Velina",
        "Velior",
        "Velissa",
        "Velozma",
        "Velvermeld",
        "Vendramyr",
        "Veneska",
        "Venithros",
        "Venmarenc",
        "Vercazlyde",
        "Vereedra",
        "Verenice",
        "Vereska",
        "Verethest",
        "Verissrad",
        "Verolant",
        "Verowa",
        "Vervadesce",
        "Ververine",
        "Veslomere",
        "Vetrengarr",
        "Vettemis",
        "Vhiallon",
        "Viastin",
        "Viastra",
        "Videla",
        "Videssos",
        "Viero",
        "Vilirast",
        "Vilrokin",
        "Vilscelyn",
        "Viomer",
        "Virandisp",
        "Virenar",
        "Virensa",
        "Virjauruk",
        "Virosanne",
        "Virthuren",
        "Vismarun",
        "Visperime",
        "Vixuad",
        "Vixu\xebl",
        "Vizina",
        "Vladilesk",
        "Vlarobaal",
        "Voiop\xeb",
        "Vojeera",
        "Voldisterre",
        "Volkazen",
        "Volmaran",
        "Voluru",
        "Vonidar",
        "Voozcoreme",
        "Voranor",
        "Vorchazel",
        "Vorelgin",
        "Vorien",
        "Vornica",
        "Vornovas",
        "Vorquemand",
        "Vorunir",
        "Vorvadoss",
        "Vosmerrel",
        "Vossari",
        "Vozmarald",
        "Vrepimus",
        "Vrilestamn",
        "Vristamor",
        "Vu\xebthar",
        "Walspinore",
        "Wandalar",
        "Wanestka",
        "Wantorak",
        "Wardlanof",
        "Warlwier",
        "Warrigel",
        "Wascramin",
        "Wasmo\xebt",
        "Watreyan",
        "Wazerac",
        "Wedonal",
        "Welmerel",
        "Wendower",
        "Werrelet",
        "Werscunok",
        "Weverin",
        "Wexavin",
        "Whallifrond",
        "Whearius",
        "Whibmistle",
        "Wianna",
        "Wicardod",
        "Widzoonaev",
        "Wignaja",
        "Wiinecot",
        "Winian",
        "Wodhrian",
        "Woringel",
        "Woxethoon",
        "Wrodlian",
        "Wurzemand",
        "Wyliath",
        "Xadamos",
        "Xadogar",
        "Xaisuruk",
        "Xalorof",
        "Xanafel",
        "Xanalver",
        "Xanbiah",
        "Xania",
        "Xantenmec",
        "Xanxia",
        "Xaraata",
        "Xargusull",
        "Xarthia",
        "Xeelafarl",
        "Xeelona",
        "Xegessem",
        "Xelica",
        "Xemeret",
        "Xemindar",
        "Xenia",
        "Xeralisk",
        "Xerdelisse",
        "Xerechron",
        "Xhalsadan",
        "Xhanazlet",
        "Xhodrovan",
        "Xibalba",
        "Xiifrani",
        "Ximahlto",
        "Ximakran",
        "Ximodi",
        "Xirian",
        "Xirijasp",
        "Xo\xe4non",
        "Xomdiral",
        "Xorandor",
        "Xoryalan",
        "Xyaria",
        "Yaimondar",
        "Yakovar",
        "Yakthodah",
        "Yalduvar",
        "Yaliath",
        "Yallarna",
        "Yallorind",
        "Yalveron",
        "Yamala",
        "Yamindra",
        "Yandelar",
        "Yandrahla",
        "Yaralet",
        "Yarial",
        "Yarillo",
        "Yarzolept",
        "Yashengzeb",
        "Yathagault",
        "Yathoric",
        "Yathorlak",
        "Ybalil",
        "Ybranar",
        "Yeltranal",
        "Yelu\xf6z",
        "Yemanthal",
        "Yemboloth",
        "Yerdien",
        "Yesgolod",
        "Yevjarel",
        "Yfremoon",
        "Ygristan",
        "Yhantu\xf6r",
        "Yldejaste",
        "Ymarisce",
        "Ymbria",
        "Yncaarim",
        "Yohonough",
        "Yonraloth",
        "Yoplossa",
        "Yoredan",
        "Yormexoon",
        "Yranthis",
        "Yratos",
        "Yrcanos",
        "Yronthol",
        "Yrwelos",
        "Yryloth",
        "Ythlyra",
        "Ythribond",
        "Yurnada",
        "Yusperal",
        "Yuzigral",
        "Zaamontel",
        "Zadamun",
        "Zadipan",
        "Zadrowane",
        "Zagrenxa",
        "Zaharbif",
        "Zajrenja",
        "Zakiwya",
        "Zalagi",
        "Zalanath",
        "Zalazar",
        "Zalberek",
        "Zalremy",
        "Zamberel",
        "Zamblezur",
        "Zamora",
        "Zamordax",
        "Zamorla",
        "Zanatir",
        "Zanestra",
        "Zangabal",
        "Zanindil",
        "Zanreynad",
        "Zantifer",
        "Zanzinel",
        "Zaraana",
        "Zaranave",
        "Zaranax",
        "Zarfhaano",
        "Zarimarth",
        "Zathmandar",
        "Zayzazi",
        "Zazamanc",
        "Zazumel",
        "Zazwinoon",
        "Zebalan",
        "Zefaeran",
        "Zefrondus",
        "Zelemorn",
        "Zelgadis",
        "Zellinet",
        "Zelmarine",
        "Zelprothon",
        "Zemanthel",
        "Zemirtol",
        "Zenaxa",
        "Zenilyeth",
        "Zenithral",
        "Zenorsha",
        "Zentrigar",
        "Zeosard",
        "Zephiron",
        "Zequiel",
        "Zeranoj",
        "Zhelavon",
        "Zhemaeta",
        "Ziacalt",
        "Zifidin",
        "Zilkorlaz",
        "Ziraldra",
        "Zirdarbis",
        "Zirzihin",
        "Zo\xe4lmar",
        "Zo\xe4ndrik",
        "Zo\xe4var",
        "Zochiad",
        "Zodolin",
        "Zoltaren",
        "Zominor",
        "Zoramus",
        "Zoranji",
        "Zorashad",
        "Zorayas",
        "Zorestrel",
        "Zorewyr",
        "Zoroma",
        "Zoromesh",
        "Zosmindo",
        "Zotaquaan",
        "Zotheera",
        "Zozminod",
        "Zubvuysa",
        "Zulaeram",
        "Zulpirek",
        "Zurenkin",
        "Zurliban",
        "Zydaraf",
        "Zylarthen",
        "Zyramythe",
        "Zytavirk"
    ],
    // Multi Syllabes
    [
        "Abadapnyr",
        "Abrethendar",
        "Acrasian",
        "Adario",
        "Adieseth",
        "Adilikor",
        "Adinalar",
        "Adriaxa",
        "Afelanidd",
        "Aforvalon",
        "Agiora",
        "Agreliwin",
        "Aguidran",
        "Aguilla",
        "Aikikia",
        "Akitarka",
        "Alanahetra",
        "Alarion",
        "Alartia",
        "Alarurigu",
        "Alcidio",
        "Aldarian",
        "Alelakon",
        "Aleshmara",
        "Aletorim",
        "Aleuworust",
        "Alianala",
        "Alicindra",
        "Allessanya",
        "Alorassanz",
        "Amafeyan",
        "Amathenar",
        "Amdaramast",
        "Amiria",
        "Amriffien",
        "Anaumiantis",
        "Anelofar",
        "Angetenar",
        "Angurvidel",
        "Animeldio",
        "Anixido",
        "Ankitarla",
        "Ansamanthion",
        "Ansimantar",
        "Anspiladri",
        "Antillia",
        "Aphiana",
        "Aptolcater",
        "Aptrinuptium",
        "Aquilia",
        "Aradlum\xe9",
        "Araledek",
        "Aramanzom",
        "Aramestor",
        "Arania",
        "Arazederu",
        "Arazynxa",
        "Ardzefurith",
        "Arezia",
        "Arhilian",
        "Arianroth",
        "Ariaria",
        "Ariaxoc",
        "Arismaspia",
        "Ariyava",
        "Armalisrah",
        "Aroxian",
        "Arrolian",
        "Arsevalin",
        "Artalien",
        "Aruzustin",
        "Arzangiran",
        "Asalirin",
        "Asarlia",
        "Asicia",
        "Aslambarash",
        "Aslerion",
        "Asthania",
        "Asuricorm",
        "Atarana",
        "Athiana",
        "Athlebasia",
        "Athoriel",
        "Atiaran",
        "Aulurien",
        "Avalenar",
        "Avanimmerl",
        "Avelembai",
        "Aviathar",
        "Axajaxas",
        "Azeledim",
        "Azgelazgus",
        "Aziria",
        "Barosathlom",
        "Barylophar",
        "Bazkalia",
        "Beledira",
        "Belintraia",
        "Belrablion",
        "Borosiyan",
        "Bradullio",
        "Brodalcaflar",
        "Cajarrida",
        "Calane\xfcs",
        "Calasapia",
        "Caldiloran",
        "Caleria",
        "Calgalcandar",
        "Calidundarios",
        "Calliwelleran",
        "Calmamelis",
        "Caratrothis",
        "Carthazian",
        "Casrinian",
        "Cassrimello",
        "Cauditrice\xe4",
        "Cerelama",
        "Chaestebalon",
        "Chalirio",
        "Cha\xf6lthanesh",
        "Chisirion",
        "Cinariyan",
        "Cinnarath",
        "Cirthavion",
        "Co\xe4berul",
        "Co\xebxitaq",
        "Coranco\xe4n",
        "Coreliad",
        "Corrilisan",
        "Cossario",
        "Crotimian",
        "Cuidurjau",
        "Cymoria",
        "Dajuvius",
        "Dakrolidur",
        "Dameraxia",
        "Daraviel",
        "Daraztheon",
        "Darsimala",
        "Darsurion",
        "Dassalpian",
        "Daxxihidil",
        "Delrinian",
        "Demasaran",
        "Demeriolet",
        "Devaloka",
        "Diamerune",
        "Dicadoran",
        "Didoria",
        "Dinrudromon",
        "Dirinnia",
        "Dolohies",
        "Dophinrian",
        "Dornatentorl",
        "Drevixibrind",
        "Drexorvion",
        "Duralica",
        "Dyskilian",
        "E\xe4lisen",
        "E\xe4tinor",
        "Ebriany",
        "Eclaramon",
        "Efarion",
        "Efiranlas",
        "Egajia",
        "Eglaharant",
        "Eglantarask",
        "Elantargin",
        "Elarial",
        "Eleglorross",
        "Elianna",
        "Elisdriel",
        "Elivint\xe9",
        "Ellyria",
        "Elorta\xf6l",
        "Eltaria",
        "Elverion",
        "Elysia",
        "Emelesis",
        "Emelsyna",
        "Enstarlamyn",
        "Entalaroth",
        "Epimissia",
        "Erejitha",
        "Eremiess",
        "Erengazor",
        "Erigia",
        "Erivalda",
        "Escalinian",
        "Escamorid",
        "Eschurioz",
        "Esmerashard",
        "Esnaramik",
        "Etheriasa",
        "Etianor",
        "Etybrinel",
        "Ezaltarem",
        "Ezellohar",
        "Faedulias",
        "Falastien",
        "Falerio",
        "Falyrias",
        "Farsemnithal",
        "Favaijeness",
        "Felarica",
        "Felmarien",
        "Feresilmar",
        "Fiarazio",
        "Fiespegar",
        "Fimalemuen",
        "Finactias",
        "Fiormezath",
        "Firvintilis",
        "Flamorriwisp",
        "Flaxifyglar",
        "Fo\xe4zekov",
        "Folsalino",
        "Frixalissa",
        "Fusafandra",
        "Fuvusarooz",
        "Gaflorinos",
        "Galathanax",
        "Galdviara",
        "Galirrhyalen",
        "Gambrimanthus",
        "Ganthelios",
        "Ganvarathimyr",
        "Garlinian",
        "Gauribanon",
        "Gazaforen",
        "Geluru\xebm",
        "Gemaleon",
        "Ghondaliom",
        "Giavicel",
        "Gikishika",
        "Gorvonia",
        "Halremsolath",
        "Hanciara",
        "Harfelengol",
        "Hatuina",
        "Hazrathsimoon",
        "Hazrinivra",
        "Herazibrax",
        "Hiabezur",
        "Hidolebni",
        "Hipalonin",
        "Hizzlechaltezeme",
        "Hlantremi\xebr",
        "Hovancomi",
        "Hurania",
        "Hyfe\xe4ntio",
        "Ibaletri",
        "Idriella",
        "Ierendi",
        "Igadiax",
        "Iglithebem",
        "Ilanayom",
        "Ilerida",
        "Ilirsiya",
        "Ilizio",
        "Illemestri",
        "Ilminaris",
        "Impelia",
        "Inikia",
        "Inthe\xe4nereon",
        "Ionellza",
        "Iongua",
        "Iophroster",
        "Iptameela",
        "Irgasia",
        "Iskarnia",
        "Iuzator",
        "Ixiosyne",
        "Izmirodon",
        "Jachoriax",
        "Jakanuin",
        "Jalanochlan",
        "Jaleduin",
        "Jandrebliash",
        "Jaralectan",
        "Jarchesmadis",
        "Javethiel",
        "Jelanjaztor",
        "Jemalkhiri",
        "Jemarixtesen",
        "Jirchesmiod",
        "Juaxmanar",
        "Jurelisma",
        "Kadarion",
        "Kagilia",
        "Kalenizin",
        "Kalienlod",
        "Kalpalanin",
        "Kandathama",
        "Kanthamio",
        "Karania",
        "Kardamordax",
        "Karethezam",
        "Karisempatur",
        "Karriasal",
        "Karthassily",
        "Kastrevelda",
        "Katanmaral",
        "Kemeroxel",
        "Keolotrest",
        "Keremelar",
        "Kerisiar",
        "Khalatulajax",
        "Khrysarlion",
        "Kikianik",
        "Kiralizur",
        "Kishidega",
        "Koquilgion",
        "Kryslaria",
        "Lalarian",
        "Lamamelis",
        "Lamdiraka",
        "Lamirila",
        "Lamotridac",
        "Lantessorax",
        "Larasajan",
        "Laschiantria",
        "Lauaxeta",
        "Laziarlan",
        "Lemesprie",
        "Leoniax",
        "Lepeduin",
        "Lialasia",
        "Liquilioss",
        "Lirrissia",
        "Locrama\xebl",
        "Ludurafet",
        "Luithiole",
        "Lyzalian",
        "Lyzeoldir",
        "Maheriel",
        "Majezre\xe4l",
        "Malabderas",
        "Malantiggar",
        "Malasteon",
        "Malevila",
        "Malyremeth",
        "Manariasc",
        "Maranduax",
        "Marassumar",
        "Maresedin",
        "Marillia",
        "Marzaranax",
        "Mathranislom",
        "Maudrosnia",
        "Mayulisas",
        "Medricaeldo",
        "Meliabrak",
        "Meliadoul",
        "Melidium",
        "Meliofard",
        "Melismond\xe9",
        "Melkandoro",
        "Melozathel",
        "Melusinnia",
        "Mereniax",
        "Meresinapt",
        "Mermiculex",
        "Metebelvis",
        "Mianjira",
        "Milinderra",
        "Mirelassar",
        "Mirianis",
        "Mirtagarkarit",
        "Mo\xe4thyalond",
        "Momelsia",
        "Morasina",
        "Morciana",
        "Moriliem",
        "Morilioth",
        "Muathazaglimid",
        "Mylakhrion",
        "Myrraxion",
        "Myrristica",
        "Naburios",
        "Nanieroj",
        "Narasia",
        "Narjiona",
        "Narragazkara",
        "Narzelduin",
        "Nemmaridus",
        "Nempifermal",
        "Nerovius",
        "Nevalrimyr",
        "Nevinlemnus",
        "Nichoriam",
        "Nimrathelet",
        "Nissebaral",
        "Niziliom",
        "Nohbirrian",
        "Octramadus",
        "Ohirial",
        "Okarbia",
        "Okpralio",
        "Olemerrin",
        "Oloscendivarn",
        "Onnurian",
        "Opacalia",
        "Orathiris",
        "Orbicritis",
        "Orialex",
        "Oriastus",
        "Orissanat",
        "Ormallivir",
        "Ormeria",
        "Orrizia",
        "Orroptio",
        "Orthaxifer",
        "Orviliach",
        "Otolvian",
        "Pactinasa",
        "Palzyriax",
        "Panaxcrador",
        "Panthioleed",
        "Paolalian",
        "Pelemurto",
        "Pelluxia",
        "Pemelojurg",
        "Pemulinaan",
        "Perjauruan",
        "Phayzelobion",
        "Phomechelian",
        "Phorissital",
        "Piartamisk",
        "Pirou\xebtta",
        "Pluzemelar",
        "Pomivarno\xebn",
        "Pyrvinrian",
        "Quanamelis",
        "Quarlusian",
        "Quelidia",
        "Quelizantor",
        "Querrulian",
        "Quetradendith",
        "Rajanthesina",
        "Rakanamet",
        "Ramantasset",
        "Ranasceleb",
        "Rasanathan",
        "Rathelemen",
        "Ravannifer",
        "Reondoresin",
        "Rhazazarak",
        "Rhiadirask",
        "Roxifalcor",
        "Rozalro\xe4th",
        "Ru\xe4lia",
        "Rudliptalin",
        "Rufomella",
        "Rulinian",
        "Runevara",
        "Ruzultrejest",
        "Rylissilin",
        "Saboorakel",
        "Sadonakai",
        "Saegdondakhar",
        "Salletifian",
        "Sandurion",
        "Sanoreya",
        "Sapelintir",
        "Sarantimar",
        "Sarathia",
        "Sarpemethe\xe4n",
        "Sarrabhluil",
        "Sartenia",
        "Saterbia",
        "Scarliherin",
        "Scoramant\xe9",
        "Semnegarius",
        "Serejarand",
        "Seremnaria",
        "Seriastis",
        "Serilia",
        "Seriona",
        "Shadarabar",
        "Sharadjelamir",
        "Sharajamar",
        "Shelarinisse",
        "Shelmorian",
        "Sireelia",
        "Sirezvia",
        "Siriena",
        "Sirulia",
        "Sorolonex",
        "Soromyrium",
        "Sorosilmar",
        "Sphallurian",
        "Sreltaneema",
        "Sulparia",
        "Suularaba",
        "Sylixia",
        "Tallosia",
        "Tamarien",
        "Tapromethyna",
        "Tarachien",
        "Taralian",
        "Tarsmiria",
        "Tasambekeer",
        "Tayenias",
        "Telaswiral",
        "Telaznemor",
        "Temilion",
        "Teniliak",
        "Tercyrian",
        "Thetalia",
        "Thorosiaz",
        "Tiaskelu",
        "Tifalius",
        "Tinzlactiash",
        "Tiriala",
        "Tirunriyek",
        "Tivamtemar",
        "Toraxoran",
        "Torellian",
        "Tormosian",
        "Trystaria",
        "Tsaliveren",
        "Tsardatsira",
        "Tuivoreth",
        "Ugalius",
        "Uguesilar",
        "Uirugan",
        "Ulakrugir",
        "Ulkarien",
        "Ullibunda",
        "Ultharnarath",
        "Umasdalen",
        "Umicia",
        "Unaramand",
        "Unlasnulkai",
        "Unorrehod",
        "Unuvia",
        "Upalumo",
        "Ura\xf6sin",
        "Uttosembuluz",
        "Uxulinak",
        "Valarindio",
        "Valarion",
        "Valaronai",
        "Valeauviej",
        "Varcassian",
        "Veladamar",
        "Velorian",
        "Venzafurome",
        "Vercerenos",
        "Veridia",
        "Vialora",
        "Vilcarien",
        "Vimbrodelthion",
        "Vincarian",
        "Virunia",
        "Vistramisorn",
        "Vreniriab",
        "Vruthalidrom",
        "Vyjeremanx",
        "Vyrania",
        "Werzamerand",
        "Wiernamal",
        "Wrosceltiar",
        "Wyjezinelb",
        "Xacuahatl",
        "Xaeximinar",
        "Xalaibisad",
        "Xalisuri",
        "Xaralien",
        "Xaralyna",
        "Xarilia",
        "Xasseldasene",
        "Xavanimar",
        "Xemelenos",
        "Xilvemzarad",
        "Xiomriest",
        "Xorlanterond",
        "Xorosia",
        "Yamidala",
        "Yamovelhas",
        "Yannavalka",
        "Yarbithresin",
        "Yarmidrian",
        "Yavilana",
        "Yazarrahaj",
        "Yetlioro",
        "Yormanien",
        "Yssarion",
        "Yzaniva",
        "Zabarianx",
        "Zaharsian",
        "Zalrevliaf",
        "Zanzarathool",
        "Zatakruan",
        "Zaulizanir",
        "Zavalliar",
        "Zavalniax",
        "Zekundaloth",
        "Zekundemar",
        "Zelissinfra",
        "Zelobindio",
        "Ziandela",
        "Zicarecem",
        "Zimenaechu",
        "Zofelliara",
        "Zoramatoth",
        "Zulaaria",
        "Zuralion",
        "Zuruxeno",
        "Zuzusilmar",
        "Zwimolio",
        "Zwy\xe4clemon",
        "Zyrissalantisar"
    ]
];
const $7d7c02f63df4accb$export$7dbe142e1789c057 = {
    getFantasyName: function() {
        var d20 = Math.floor(Math.random() * 20) + 1, name = "", rngFirstName, rngSecondName;
        if (d20 < 3) // 10%
        name = $7d7c02f63df4accb$var$names[0][Math.floor(Math.random() * $7d7c02f63df4accb$var$names[0].length)];
        else if (d20 < 12) // 45%
        name = $7d7c02f63df4accb$var$names[1][Math.floor(Math.random() * $7d7c02f63df4accb$var$names[1].length)];
        else if (d20 < 17) // 25%
        name = $7d7c02f63df4accb$var$names[2][Math.floor(Math.random() * $7d7c02f63df4accb$var$names[2].length)];
        else if (d20 === 17) // 5%
        name = $7d7c02f63df4accb$var$names[3][Math.floor(Math.random() * $7d7c02f63df4accb$var$names[3].length)];
        else if (d20 === 18) // 5%
        name = $7d7c02f63df4accb$var$names[0][Math.floor(Math.random() * $7d7c02f63df4accb$var$names[0].length)] + " " + $7d7c02f63df4accb$var$names[1][Math.floor(Math.random() * $7d7c02f63df4accb$var$names[1].length)];
        else if (d20 === 19) // 5%
        name = $7d7c02f63df4accb$var$names[1][Math.floor(Math.random() * $7d7c02f63df4accb$var$names[1].length)] + " " + $7d7c02f63df4accb$var$names[0][Math.floor(Math.random() * $7d7c02f63df4accb$var$names[0].length)];
        else {
            // 5%
            rngFirstName = $7d7c02f63df4accb$var$names[Math.floor(Math.random() * $7d7c02f63df4accb$var$names.length)];
            rngSecondName = $7d7c02f63df4accb$var$names[Math.floor(Math.random() * $7d7c02f63df4accb$var$names.length)];
            name = rngFirstName[Math.floor(Math.random() * rngFirstName.length)] + " " + rngSecondName[Math.floor(Math.random() * rngSecondName.length)];
        }
        return name;
    }
};


var $4f0d8d96ef10a4e8$var$mysticOrder = {
    patterns: [
        "<group> of the <entity>",
        "<group> of the <description> <entity>",
        "<description> <group> of the <description> <entity>",
        "<description> <group>"
    ],
    group: {
        cliques: [
            "alliance",
            "association",
            "band",
            "brotherhood",
            "cabal",
            "circle",
            "conclave",
            "confraternity",
            "convocation",
            "coterie",
            "fellowship",
            "fraternity",
            "guild",
            "league",
            "order",
            "siblingship",
            "sisterhood",
            "society",
            "sorority"
        ],
        people: [
            "adepts",
            "apostles",
            "aspirants",
            "brothers",
            "children",
            "colleagues",
            "devotees",
            "disciples",
            "fellows",
            "followers",
            "gentlemen",
            "illuminants",
            "initiates",
            "keepers",
            "ladies",
            "masters",
            "probers",
            "revealers",
            "seekers",
            "servants",
            "siblings",
            "sisters",
            "votaries"
        ]
    },
    description: {
        quality: [
            "ancient",
            "arcane",
            "astral",
            "blinding",
            "bright",
            "brilliant",
            "burning",
            "bygone",
            "cardinal",
            "celestial",
            "cloudy",
            "concealed",
            "cosmic",
            "dark",
            "deep",
            "dexter",
            "difficult",
            "dusky",
            "effulgent",
            "elder",
            "elemental",
            "esoteric",
            "eternal",
            "ethereal",
            "existential",
            "forgotten",
            "gloomy",
            "glorious",
            "glowing",
            "gnostic",
            "hidden",
            "ineffable",
            "inner",
            "lost",
            "luminous",
            "lunar",
            "magical",
            "maieutical",
            "mysterious",
            "mystic",
            "occult",
            "penumbral",
            "profound",
            "pure",
            "quintessential",
            "radiant",
            "recondite",
            "resplendent",
            "revealed",
            "sacred",
            "secret",
            "shadowed",
            "shining",
            "sidereal",
            "singing",
            "sinister",
            "solemn",
            "spiral",
            "spiritual",
            "starry",
            "solar",
            "sublime",
            "supernal",
            "timeless",
            "transcendent",
            "true",
            "veiled",
            "zetetic"
        ],
        colour: [
            "amber",
            "amethyst",
            "aquamarine",
            "azure",
            "beryl",
            "black",
            "blue",
            "brazen",
            "bronze",
            "brown",
            "carmine",
            "cerulean",
            "copper",
            "crimson",
            "crystal",
            "ebony",
            "emerald",
            "golden",
            "green",
            "grey",
            "incarnadine",
            "indigo",
            "ivory",
            "jade",
            "jet",
            "malachite",
            "orange",
            "pearly",
            "purple",
            "rainbow",
            "red",
            "rosy",
            "ruby",
            "russet",
            "sable",
            "sapphire",
            "scarlet",
            "silver",
            "topaz",
            "turquoise",
            "umber",
            "vermilion",
            "violaceous",
            "violet",
            "viridian",
            "white",
            "yellow"
        ]
    },
    entities: [
        "arcana",
        "beyond",
        "chalice",
        "chamber",
        "cloud",
        "cowl",
        "crown",
        "crystal",
        "darkness",
        "dawn",
        "day",
        "doctrine",
        "dominion",
        "energy",
        "enlightenment",
        "eye",
        "faith",
        "fane",
        "fire",
        "flame",
        "fountain",
        "gate",
        "glyph",
        "grail",
        "hand",
        "harmony",
        "heart",
        "helix",
        "influence",
        "insight",
        "key",
        "knowledge",
        "learning",
        "light",
        "lore",
        "mantle",
        "mastery",
        "mind",
        "moon",
        "mystery",
        "night",
        "orb",
        "path",
        "pentacle",
        "pillar",
        "pool",
        "portal",
        "power",
        "pyramid",
        "question",
        "radiance",
        "rainbow",
        "revelation",
        "robe",
        "rod",
        "sapience",
        "sceptre",
        "scroll",
        "secret",
        "shadow",
        "shrine",
        "sigil",
        "sign",
        "sky",
        "space",
        "sphere",
        "spring",
        "staff",
        "star",
        "stone",
        "sun",
        "symbol",
        "teaching",
        "temple",
        "throne",
        "time",
        "truth",
        "twilight",
        "veil",
        "verity",
        "void",
        "wand",
        "way",
        "wisdom",
        "word",
        "world"
    ]
}, $4f0d8d96ef10a4e8$var$militaryUnit = {
    patterns: [
        "<commander>'s <group>",
        "<description> <group>",
        "<description> <description> <group>",
        "<group> of the <place>"
    ],
    groups: [
        //team
        [
            "armada",
            "army",
            "battalion",
            "brigade",
            "cohort",
            "commandos",
            "company",
            "contingent",
            "division",
            "fleet",
            "force",
            "garrison",
            "guard",
            "legion",
            "militia",
            "patrol",
            "phalanx",
            "platoon",
            "regiment",
            "section",
            "sentinel",
            "sentry",
            "squad",
            "squadron",
            "troop",
            "vanguard"
        ],
        //soldiers
        [
            "avengers",
            "champions",
            "elite",
            "fighters",
            "janissaries",
            "marines",
            "paladins",
            "riders",
            "skirmishers",
            "soldiers",
            "troopers",
            "veterans",
            "victors",
            "warriors"
        ],
        //warders
        [
            "crusaders",
            "defenders",
            "guardians",
            "guards",
            "keepers",
            "knights",
            "lords",
            "preservers",
            "protectors",
            "rangers",
            "sentinels",
            "sentries",
            "wardens",
            "warders",
            "watchers"
        ],
        //mercenaries
        [
            "bandits",
            "destroyers",
            "devourers",
            "marauders",
            "pirates",
            "raptors",
            "reavers"
        ],
        //gear
        [
            "arrows",
            "axes",
            "blades",
            "bows",
            "bucklers",
            "claws",
            "daggers",
            "darts",
            "fangs",
            "fists",
            "flails",
            "gauntlets",
            "halberds",
            "hammers",
            "helms",
            "knives",
            "lances",
            "maces",
            "pikes",
            "scythes",
            "shields",
            "spears",
            "swords",
            "talons",
            "teeth"
        ],
        //creatures
        [
            "angels",
            "basilisks",
            "cobras",
            "demons",
            "devils",
            "eagles",
            "falcons",
            "griffins",
            "hawks",
            "hounds",
            "jaguars",
            "lions",
            "panthers",
            "rats",
            "scorpions",
            "sharks",
            "tigers",
            "vipers",
            "wolves"
        ]
    ],
    description: {
        colour: [
            "black",
            "white",
            "red",
            "gold",
            "silver",
            "iron",
            "blue",
            "green",
            "grey"
        ],
        other: [
            "battle",
            "blood",
            "bolt",
            "bone",
            "chaos",
            "dark",
            "death",
            "dire",
            "doom",
            "fire",
            "flame",
            "free",
            "high",
            "law",
            "light",
            "lightning",
            "moon",
            "night",
            "rune",
            "sea",
            "skull",
            "star",
            "storm",
            "sun",
            "thunder",
            "thunderbolt",
            "torch",
            "war",
            "wave",
            "wind",
            "wing",
            "wrath"
        ]
    },
    places: {
        seas: [
            "billow",
            "breaker",
            "brine",
            "deep",
            "foam",
            "main",
            "ocean",
            "sea",
            "surf",
            "swell",
            "water",
            "wave"
        ],
        lands: [
            "cave",
            "cavern",
            "city",
            "crag",
            "dell",
            "desert",
            "earth",
            "forest",
            "grove",
            "hall",
            "hill",
            "hinterland",
            "isle",
            "lake",
            "land",
            "march",
            "marsh",
            "path",
            "plain",
            "province",
            "range",
            "river",
            "rock",
            "sand",
            "shore",
            "stone",
            "stream",
            "tower",
            "trail",
            "valley",
            "water",
            "way",
            "wood"
        ]
    }
}, $4f0d8d96ef10a4e8$var$thievesAndAssassins = {
    roles: [
        "arrangers",
        "bestowers",
        "disbursers",
        "disposers",
        "harmonisers",
        "reconcilers",
        "regulators",
        "reinstaters",
        "restorers"
    ],
    goals: [
        "balance",
        "congruity",
        "correlation",
        "correspondence",
        "equilibrium",
        "equipoise",
        "equity",
        "equivalence",
        "parity",
        "symmetry"
    ],
    adjectives: [
        "acute",
        "apposite",
        "apt",
        "decisive",
        "dependable",
        "extreme",
        "faithful",
        "final",
        "fitting",
        "impartial",
        "reliable",
        "supreme",
        "ultimate",
        "utmost"
    ],
    actions: [
        "action",
        "justice",
        "reckoning",
        "recompense",
        "redress",
        "reparation",
        "reprisal",
        "requital",
        "retribution",
        "satisfaction",
        "vindication"
    ],
    titles: [
        "alliance",
        "association",
        "company",
        "corporation",
        "organisation",
        "society",
        "syndicate"
    ],
    descriptions: [
        "black",
        "cloud",
        "dark",
        "dim",
        "dusk",
        "fog",
        "gloom",
        "grey",
        "night",
        "shade",
        "shadow",
        "smoke",
        "quiet",
        "subtle",
        "whispering",
        "bloody",
        "hidden",
        "red",
        "ready",
        "sharp",
        "sudden"
    ],
    groups: [
        //weapon
        [
            "blade",
            "bolt",
            "claw",
            "dagger",
            "dirk",
            "fang",
            "hand",
            "knife"
        ],
        //item
        [
            "balance",
            "hourglass",
            "scales",
            "cloak",
            "cowl",
            "hand",
            "hood",
            "mantle",
            "mask"
        ],
        //creature
        [
            "snake",
            "scorpion",
            "spider",
            "bat",
            "cat",
            "daw",
            "dog",
            "owl",
            "pye",
            "rat",
            "weasel"
        ],
        //action
        [
            "bring",
            "find",
            "hunt",
            "kill",
            "search",
            "seek",
            "shadow",
            "slay",
            "stalk"
        ]
    ]
};
const $4f0d8d96ef10a4e8$export$75a83ee8c92008b8 = {
    getMysticOrderName: function() {
        var options = {
            group: Math.random() < 0.5 ? $4f0d8d96ef10a4e8$var$mysticOrder.group.cliques : $4f0d8d96ef10a4e8$var$mysticOrder.group.people,
            entity: $4f0d8d96ef10a4e8$var$mysticOrder.entities,
            description: $4f0d8d96ef10a4e8$var$mysticOrder.description.quality.concat($4f0d8d96ef10a4e8$var$mysticOrder.description.colour)
        }, d10 = Math.floor(Math.random() * 10) + 1, name;
        if (d10 < 2) name = $4f0d8d96ef10a4e8$var$mysticOrder.patterns[0];
        else if (d10 < 9) name = $4f0d8d96ef10a4e8$var$mysticOrder.patterns[1];
        else if (d10 < 10) name = $4f0d8d96ef10a4e8$var$mysticOrder.patterns[2];
        else name = $4f0d8d96ef10a4e8$var$mysticOrder.patterns[3];
        return name.replace(/<([\w\W]*?)>/g, function(match) {
            match = match.replace(/<|>/g, "");
            return options[match][Math.floor(Math.random() * options[match].length)].capitalize();
        });
    },
    getMilitaryUnitsName: function() {
        var options = {
            commander: [],
            group: $4f0d8d96ef10a4e8$var$militaryUnit.groups[Math.floor(Math.random() * 6)].slice(),
            description: $4f0d8d96ef10a4e8$var$militaryUnit.description.colour.concat($4f0d8d96ef10a4e8$var$militaryUnit.description.other).slice(),
            place: $4f0d8d96ef10a4e8$var$militaryUnit.places.seas.concat($4f0d8d96ef10a4e8$var$militaryUnit.places.lands).slice()
        }, d10 = Math.floor(Math.random() * 10) + 1, name;
        if (d10 < 2) {
            options.commander = [
                (0, $7d7c02f63df4accb$export$7dbe142e1789c057).getFantasyName()
            ];
            name = $4f0d8d96ef10a4e8$var$militaryUnit.patterns[0];
        } else if (d10 < 8) name = $4f0d8d96ef10a4e8$var$militaryUnit.patterns[1];
        else if (d10 < 10) name = $4f0d8d96ef10a4e8$var$militaryUnit.patterns[2];
        else name = $4f0d8d96ef10a4e8$var$militaryUnit.patterns[3];
        return name.replace(/<([\w\W]*?)>/g, function(match) {
            var item, index;
            match = match.replace(/<|>/g, "");
            item = options[match][Math.floor(Math.random() * options[match].length)];
            index = options[match].indexOf(item);
            if (index > -1) // Remove item from copied array (.slice()) to avoid duplicates
            options[match].splice(index, 1);
            return item.capitalize();
        });
    },
    getThievesAndAssassinsName: function() {
        var d30 = Math.floor(Math.random() * 30) + 1, rngGroup, name;
        if (d30 < 6) name = $4f0d8d96ef10a4e8$var$thievesAndAssassins.roles[Math.floor(Math.random() * $4f0d8d96ef10a4e8$var$thievesAndAssassins.roles.length)].capitalize() + " of " + $4f0d8d96ef10a4e8$var$thievesAndAssassins.goals[Math.floor(Math.random() * $4f0d8d96ef10a4e8$var$thievesAndAssassins.goals.length)].capitalize();
        else if (d30 < 11) name = $4f0d8d96ef10a4e8$var$thievesAndAssassins.adjectives[Math.floor(Math.random() * $4f0d8d96ef10a4e8$var$thievesAndAssassins.adjectives.length)].capitalize() + " " + $4f0d8d96ef10a4e8$var$thievesAndAssassins.actions[Math.floor(Math.random() * $4f0d8d96ef10a4e8$var$thievesAndAssassins.actions.length)].capitalize() + " " + $4f0d8d96ef10a4e8$var$thievesAndAssassins.titles[Math.floor(Math.random() * $4f0d8d96ef10a4e8$var$thievesAndAssassins.titles.length)].capitalize();
        else {
            name = $4f0d8d96ef10a4e8$var$thievesAndAssassins.descriptions[Math.floor(Math.random() * $4f0d8d96ef10a4e8$var$thievesAndAssassins.descriptions.length)].capitalize();
            rngGroup = $4f0d8d96ef10a4e8$var$thievesAndAssassins.groups[Math.floor(Math.random() * $4f0d8d96ef10a4e8$var$thievesAndAssassins.groups.length)];
            name += " " + rngGroup[Math.floor(Math.random() * rngGroup.length)].capitalize();
        }
        return name;
    }
};



var $6279a85e34ff46c6$var$patterns = [
    "<adjective> <noun>",
    "<adjective> <noun> <title>",
    "The <adjective> <noun>",
    "The <adjective> <noun> <title>",
    "<noun> & <noun>",
    "<noun> & <noun> <title>",
    "<adjective> <title>",
    "The <adjective> <title>"
], $6279a85e34ff46c6$var$defaultValues = {
    nouns: [
        "dog",
        "wolf",
        "fox",
        "cat",
        "lion",
        "tiger",
        "kitten",
        "ox",
        "cow",
        "sow",
        "bull",
        "calf",
        "horse",
        "stallion",
        "mare",
        "foal",
        "owl",
        "eagle",
        "falcon",
        "hawk",
        "raven",
        "crow",
        "gull",
        "fish",
        "whale",
        "shark",
        "octopus",
        "squid",
        "goat",
        "sheep",
        "ewe",
        "fly",
        "butterfly",
        "dragonfly",
        "beetle",
        "ant",
        "wasp",
        "termite",
        "louse",
        "worm",
        "lizard",
        "frog",
        "toad",
        "snake",
        "chameleon",
        "unicorn",
        "gryphon",
        "dragon",
        "wyvern",
        "roc",
        "clam",
        "oyster",
        "starfish",
        "slug",
        "snail",
        "mouse",
        "rat",
        "beaver",
        "marten",
        "mink",
        "otter",
        "seal",
        "manatee",
        "chipmunk",
        "squirrel",
        "gopher",
        "tower",
        "castle",
        "dagger",
        "sword",
        "bow",
        "arrow",
        "hat",
        "boot",
        "trophy",
        "goose",
        "duck",
        "boat",
        "ship",
        "river",
        "falls",
        "forest",
        "mountain",
        "vampire",
        "skeleton",
        "witch",
        "wench",
        "lady",
        "lord",
        "knight",
        "drunk",
        "shield",
        "wand",
        "helm",
        "flask",
        "flagon",
        "pint",
        "shot"
    ],
    adjectives: [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "sanguine",
        "sepia",
        "ochre",
        "puce",
        "navy",
        "maroon",
        "pink",
        "peach",
        "cyan",
        "violet",
        "brown",
        "black",
        "gray",
        "white",
        "silver",
        "gold",
        "jumping",
        "sleeping",
        "running",
        "rolling",
        "laughing",
        "singing",
        "flying",
        "burning",
        "swimming",
        "crying",
        "roaring",
        "screaming",
        "silent",
        "petrified",
        "hiding",
        "hidden",
        "lost",
        "forgotten",
        "shiny",
        "drowning",
        "giant",
        "tiny",
        "fat",
        "skinny",
        "humorous",
        "lonely",
        "drunken",
        "slimy",
        "undead",
        "dark",
        "bright",
        "magical",
        "enchanted",
        "poor",
        "wealthy",
        "lucky",
        "unfortunate",
        "angry",
        "happy",
        "sad",
        "thieving",
        "desperate",
        "divine",
        "arcane",
        "profane",
        "discreet",
        "buried",
        "false",
        "foolish",
        "flatulent",
        "hypnotic",
        "haunted",
        "special",
        "fun",
        "drab",
        "daring",
        "stubborn",
        "sober",
        "talking",
        "naked",
        "suffering",
        "cheap",
        "smelly",
        "easy",
        "heroic",
        "hovering",
        "married",
        "pious",
        "pompous",
        "illegal",
        "sacred",
        "defiled",
        "spoilt",
        "wooden",
        "bloody",
        "yawning",
        "sleepy",
        "hungry"
    ],
    titles: [
        "bar",
        "brew house",
        "beer house",
        "mead house",
        "ale house",
        "speakeasy",
        "pub",
        "lounge",
        "brewery",
        "loft",
        "club house",
        "inn",
        "tavern",
        "den",
        "lodge"
    ]
}, $6279a85e34ff46c6$var$nouns = $6279a85e34ff46c6$var$defaultValues.nouns, $6279a85e34ff46c6$var$adjectives = $6279a85e34ff46c6$var$defaultValues.adjectives, $6279a85e34ff46c6$var$titles = $6279a85e34ff46c6$var$defaultValues.titles;
function $6279a85e34ff46c6$var$getNouns() {
    return $6279a85e34ff46c6$var$nouns;
}
function $6279a85e34ff46c6$var$getAdjectives() {
    return $6279a85e34ff46c6$var$adjectives;
}
function $6279a85e34ff46c6$var$getTitles() {
    return $6279a85e34ff46c6$var$titles;
}
function $6279a85e34ff46c6$var$setNouns(n) {
    $6279a85e34ff46c6$var$nouns = n;
}
function $6279a85e34ff46c6$var$setAdjectives(a) {
    $6279a85e34ff46c6$var$adjectives = a;
}
function $6279a85e34ff46c6$var$setTitles(t) {
    $6279a85e34ff46c6$var$titles = t;
}
function $6279a85e34ff46c6$var$setDefaultValues() {
    $6279a85e34ff46c6$var$nouns = $6279a85e34ff46c6$var$defaultValues.nouns;
    $6279a85e34ff46c6$var$adjectives = $6279a85e34ff46c6$var$defaultValues.adjectives;
    $6279a85e34ff46c6$var$titles = $6279a85e34ff46c6$var$defaultValues.titles;
}
const $6279a85e34ff46c6$export$2cb59683800e8ab7 = {
    getTavernName: function(startWith = "", endWith = "", contains = "", doesntContains = "") {
        var options = {
            noun: $6279a85e34ff46c6$var$nouns.slice(),
            adjective: $6279a85e34ff46c6$var$adjectives.slice(),
            title: $6279a85e34ff46c6$var$titles.slice()
        }, name = "", i = 0, tryReplacement = function(match) {
            var result;
            match = match.replace(/<|>/g, "");
            result = options[match][Math.floor(Math.random() * options[match].length)];
            if (result.length === 0) return "ERROR_PATTERN";
            while(result.charAt(0) === " ")result = result.substr(1);
            while(result.charAt(result.length) === " ")result = result.slice(0, -1);
            return result.capitalize();
        };
        // Try to get result for random patterns, stop after 100 attempts.
        while(name.length === 0 && i < 500){
            i += 1;
            name = $6279a85e34ff46c6$var$patterns[Math.floor(Math.random() * $6279a85e34ff46c6$var$patterns.length)];
            name = name.replace(/<([\w\W]*?)>/g, tryReplacement);
            if (name.indexOf("ERROR_PATTERN") > -1 || name.toLocaleLowerCase().substr(0, startWith.length) !== startWith.toLocaleLowerCase() || name.toLocaleLowerCase().substr(name.length - endWith.length) !== endWith.toLocaleLowerCase() || typeof contains !== "undefined" && name.toLocaleLowerCase().indexOf(contains.toLocaleLowerCase()) === -1 || typeof doesntContains !== "undefined" && doesntContains.length > 0 && name.toLocaleLowerCase().indexOf(doesntContains.toLocaleLowerCase()) > -1) name = "";
        }
        return name;
    }
};



// A is m x n. B is n x p. product is m x p.
function $2dca407f99b477df$var$multiplyMatrices(A, B) {
    let m = A.length;
    if (!Array.isArray(A[0])) // A is vector, convert to [[a, b, c, ...]]
    A = [
        A
    ];
    if (!Array.isArray(B[0])) // B is vector, convert to [[a], [b], [c], ...]]
    B = B.map((x)=>[
            x
        ]);
    let p = B[0].length;
    let B_cols = B[0].map((_, i)=>B.map((x)=>x[i])); // transpose B
    let product = A.map((row)=>B_cols.map((col)=>{
            let ret = 0;
            if (!Array.isArray(row)) {
                for (let c of col)ret += row * c;
                return ret;
            }
            for(let i = 0; i < row.length; i++)ret += row[i] * (col[i] || 0);
            return ret;
        }));
    if (m === 1) product = product[0]; // Avoid [[a, b, c, ...]]
    if (p === 1) return product.map((x)=>x[0]); // Avoid [[a], [b], [c], ...]]
    return product;
}
/**
 * Various utility functions
 */ /**
 * Check if a value is a string (including a String object)
 * @param {*} str - Value to check
 * @returns {boolean}
 */ function $2dca407f99b477df$var$isString(str) {
    return $2dca407f99b477df$var$type(str) === "string";
}
/**
 * Determine the internal JavaScript [[Class]] of an object.
 * @param {*} o - Value to check
 * @returns {string}
 */ function $2dca407f99b477df$var$type(o) {
    let str = Object.prototype.toString.call(o);
    return (str.match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();
}
/**
 * Round a number to a certain number of significant digits
 * @param {number} n - The number to round
 * @param {number} precision - Number of significant digits
 */ function $2dca407f99b477df$var$toPrecision(n, precision) {
    n = +n;
    precision = +precision;
    let integerLength = (Math.floor(n) + "").length;
    if (precision > integerLength) return +n.toFixed(precision - integerLength);
    else {
        let p10 = 10 ** (integerLength - precision);
        return Math.round(n / p10) * p10;
    }
}
/**
 * Parse a CSS function, regardless of its name and arguments
 * @param String str String to parse
 * @return {{name, args, rawArgs}}
 */ function $2dca407f99b477df$var$parseFunction(str) {
    if (!str) return;
    str = str.trim();
    const isFunctionRegex = /^([a-z]+)\((.+?)\)$/i;
    const isNumberRegex = /^-?[\d.]+$/;
    let parts = str.match(isFunctionRegex);
    if (parts) {
        // It is a function, parse args
        let args = [];
        parts[2].replace(/\/?\s*([-\w.]+(?:%|deg)?)/g, ($0, arg)=>{
            if (/%$/.test(arg)) {
                // Convert percentages to 0-1 numbers
                arg = new Number(arg.slice(0, -1) / 100);
                arg.type = "<percentage>";
            } else if (/deg$/.test(arg)) {
                // Drop deg from degrees and convert to number
                // TODO handle other units too
                arg = new Number(+arg.slice(0, -3));
                arg.type = "<angle>";
                arg.unit = "deg";
            } else if (isNumberRegex.test(arg)) {
                // Convert numerical args to numbers
                arg = new Number(arg);
                arg.type = "<number>";
            }
            if ($0.startsWith("/")) {
                // It's alpha
                arg = arg instanceof Number ? arg : new Number(arg);
                arg.alpha = true;
            }
            args.push(arg);
        });
        return {
            name: parts[1].toLowerCase(),
            rawName: parts[1],
            rawArgs: parts[2],
            args: // An argument could be (as of css-color-4):
            // a number, percentage, degrees (hue), ident (in color())
            args
        };
    }
}
function $2dca407f99b477df$var$last(arr) {
    return arr[arr.length - 1];
}
function $2dca407f99b477df$var$interpolate(start, end, p) {
    if (isNaN(start)) return end;
    if (isNaN(end)) return start;
    return start + (end - start) * p;
}
function $2dca407f99b477df$var$interpolateInv(start, end, value1) {
    return (value1 - start) / (end - start);
}
function $2dca407f99b477df$var$mapRange(from, to, value1) {
    return $2dca407f99b477df$var$interpolate(to[0], to[1], $2dca407f99b477df$var$interpolateInv(from[0], from[1], value1));
}
function $2dca407f99b477df$var$parseCoordGrammar(coordGrammars) {
    return coordGrammars.map((coordGrammar)=>{
        return coordGrammar.split("|").map((type)=>{
            type = type.trim();
            let range = type.match(/^(<[a-z]+>)\[(-?[.\d]+),\s*(-?[.\d]+)\]?$/);
            if (range) {
                let ret = new String(range[1]);
                ret.range = [
                    +range[2],
                    +range[3]
                ];
                return ret;
            }
            return type;
        });
    });
}
var $2dca407f99b477df$var$util = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    isString: $2dca407f99b477df$var$isString,
    type: $2dca407f99b477df$var$type,
    toPrecision: $2dca407f99b477df$var$toPrecision,
    parseFunction: $2dca407f99b477df$var$parseFunction,
    last: $2dca407f99b477df$var$last,
    interpolate: $2dca407f99b477df$var$interpolate,
    interpolateInv: $2dca407f99b477df$var$interpolateInv,
    mapRange: $2dca407f99b477df$var$mapRange,
    parseCoordGrammar: $2dca407f99b477df$var$parseCoordGrammar,
    multiplyMatrices: $2dca407f99b477df$var$multiplyMatrices
});
/**
 * A class for adding deep extensibility to any piece of JS code
 */ class $2dca407f99b477df$var$Hooks {
    add(name, callback, first) {
        if (typeof arguments[0] != "string") {
            // Multiple hooks
            for(var name in arguments[0])this.add(name, arguments[0][name], arguments[1]);
            return;
        }
        (Array.isArray(name) ? name : [
            name
        ]).forEach(function(name) {
            this[name] = this[name] || [];
            if (callback) this[name][first ? "unshift" : "push"](callback);
        }, this);
    }
    run(name, env) {
        this[name] = this[name] || [];
        this[name].forEach(function(callback) {
            callback.call(env && env.context ? env.context : env, env);
        });
    }
}
/**
 * The instance of {@link Hooks} used throughout Color.js
 */ const $2dca407f99b477df$var$hooks = new $2dca407f99b477df$var$Hooks();
// Global defaults one may want to configure
var $2dca407f99b477df$var$defaults = {
    gamut_mapping: "lch.c",
    precision: 5,
    deltaE: "76"
};
const $2dca407f99b477df$var$WHITES = {
    // for compatibility, the four-digit chromaticity-derived ones everyone else uses
    D50: [
        0.3457 / 0.3585,
        1.0,
        0.8251046025104602
    ],
    D65: [
        0.3127 / 0.329,
        1.0,
        1.0890577507598784
    ]
};
function $2dca407f99b477df$var$getWhite(name) {
    if (Array.isArray(name)) return name;
    return $2dca407f99b477df$var$WHITES[name];
}
// Adapt XYZ from white point W1 to W2
function $2dca407f99b477df$var$adapt$1(W1, W2, XYZ, options = {}) {
    W1 = $2dca407f99b477df$var$getWhite(W1);
    W2 = $2dca407f99b477df$var$getWhite(W2);
    if (!W1 || !W2) throw new TypeError(`Missing white point to convert ${!W1 ? "from" : ""}${!W1 && !W2 ? "/" : ""}${!W2 ? "to" : ""}`);
    if (W1 === W2) // Same whitepoints, no conversion needed
    return XYZ;
    let env = {
        W1: W1,
        W2: W2,
        XYZ: XYZ,
        options: options
    };
    $2dca407f99b477df$var$hooks.run("chromatic-adaptation-start", env);
    if (!env.M) {
        if (env.W1 === $2dca407f99b477df$var$WHITES.D65 && env.W2 === $2dca407f99b477df$var$WHITES.D50) env.M = [
            [
                1.0479298208405488,
                0.022946793341019088,
                -0.05019222954313557
            ],
            [
                0.029627815688159344,
                0.990434484573249,
                -0.01707382502938514
            ],
            [
                -0.009243058152591178,
                0.015055144896577895,
                0.7518742899580008
            ]
        ];
        else if (env.W1 === $2dca407f99b477df$var$WHITES.D50 && env.W2 === $2dca407f99b477df$var$WHITES.D65) env.M = [
            [
                0.9554734527042182,
                -0.023098536874261423,
                0.0632593086610217
            ],
            [
                -0.028369706963208136,
                1.0099954580058226,
                0.021041398966943008
            ],
            [
                0.012314001688319899,
                -0.020507696433477912,
                1.3303659366080753
            ]
        ];
    }
    $2dca407f99b477df$var$hooks.run("chromatic-adaptation-end", env);
    if (env.M) return $2dca407f99b477df$var$multiplyMatrices(env.M, env.XYZ);
    else throw new TypeError("Only Bradford CAT with white points D50 and D65 supported for now.");
}
const $2dca407f99b477df$var$ε$4 = 0.000075;
/**
 * Class to represent a color space
 */ class $2dca407f99b477df$var$ColorSpace {
    constructor(options){
        this.id = options.id;
        this.name = options.name;
        this.base = options.base ? $2dca407f99b477df$var$ColorSpace.get(options.base) : null;
        this.aliases = options.aliases;
        if (this.base) {
            this.fromBase = options.fromBase;
            this.toBase = options.toBase;
        }
        // Coordinate metadata
        let coords = options.coords ?? this.base.coords;
        this.coords = coords;
        // White point
        let white = options.white ?? this.base.white ?? "D65";
        this.white = $2dca407f99b477df$var$getWhite(white);
        // Sort out formats
        this.formats = options.formats ?? {};
        for(let name in this.formats){
            let format = this.formats[name];
            format.type ||= "function";
            format.name ||= name;
        }
        if (options.cssId && !this.formats.functions?.color) {
            this.formats.color = {
                id: options.cssId
            };
            Object.defineProperty(this, "cssId", {
                value: options.cssId
            });
        } else if (this.formats?.color && !this.formats?.color.id) this.formats.color.id = this.id;
        // Other stuff
        this.referred = options.referred;
        // Compute ancestors and store them, since they will never change
        this.#path = this.#getPath().reverse();
        $2dca407f99b477df$var$hooks.run("colorspace-init-end", this);
    }
    inGamut(coords, { epsilon: epsilon = $2dca407f99b477df$var$ε$4 } = {}) {
        if (this.isPolar) {
            // Do not check gamut through polar coordinates
            coords = this.toBase(coords);
            return this.base.inGamut(coords, {
                epsilon: epsilon
            });
        }
        let coordMeta = Object.values(this.coords);
        return coords.every((c, i)=>{
            let meta = coordMeta[i];
            if (meta.type !== "angle" && meta.range) {
                if (Number.isNaN(c)) // NaN is always in gamut
                return true;
                let [min, max] = meta.range;
                return (min === undefined || c >= min - epsilon) && (max === undefined || c <= max + epsilon);
            }
            return true;
        });
    }
    get cssId() {
        return this.formats.functions?.color?.id || this.id;
    }
    get isPolar() {
        for(let id in this.coords){
            if (this.coords[id].type === "angle") return true;
        }
        return false;
    }
    #processFormat(format) {
        if (format.coords && !format.coordGrammar) {
            format.type ||= "function";
            format.name ||= "color";
            // Format has not been processed
            format.coordGrammar = $2dca407f99b477df$var$parseCoordGrammar(format.coords);
            let coordFormats = Object.entries(this.coords).map(([id, coordMeta], i)=>{
                // Preferred format for each coord is the first one
                let outputType = format.coordGrammar[i][0];
                let fromRange = coordMeta.range || coordMeta.refRange;
                let toRange = outputType.range, suffix = "";
                // Non-strict equals intentional since outputType could be a string object
                if (outputType == "<percentage>") {
                    toRange = [
                        0,
                        100
                    ];
                    suffix = "%";
                } else if (outputType == "<angle>") suffix = "deg";
                return {
                    fromRange: fromRange,
                    toRange: toRange,
                    suffix: suffix
                };
            });
            format.serializeCoords = (coords, precision)=>{
                return coords.map((c, i)=>{
                    let { fromRange: fromRange, toRange: toRange, suffix: suffix } = coordFormats[i];
                    if (fromRange && toRange) c = $2dca407f99b477df$var$mapRange(fromRange, toRange, c);
                    c = $2dca407f99b477df$var$toPrecision(c, precision);
                    if (suffix) c += suffix;
                    return c;
                });
            };
        }
        return format;
    }
    getFormat(format) {
        if (typeof format === "object") {
            format = this.#processFormat(format);
            return format;
        }
        let ret;
        if (format === "default") // Get first format
        ret = Object.values(this.formats)[0];
        else ret = this.formats[format];
        if (ret) {
            ret = this.#processFormat(ret);
            return ret;
        }
        return null;
    }
    #path;
    #getPath() {
        let ret = [
            this
        ];
        for(let space = this; space = space.base;)ret.push(space);
        return ret;
    }
    to(space, coords) {
        if (arguments.length === 1) [space, coords] = [
            space.space,
            space.coords
        ];
        space = $2dca407f99b477df$var$ColorSpace.get(space);
        if (this === space) // Same space, no change needed
        return coords;
        // Convert NaN to 0, which seems to be valid in every coordinate of every color space
        coords = coords.map((c)=>Number.isNaN(c) ? 0 : c);
        // Find connection space = lowest common ancestor in the base tree
        let myPath = this.#path;
        let otherPath = space.#path;
        let connectionSpace, connectionSpaceIndex;
        for(let i = 0; i < myPath.length; i++){
            if (myPath[i] === otherPath[i]) {
                connectionSpace = myPath[i];
                connectionSpaceIndex = i;
            } else break;
        }
        if (!connectionSpace) // This should never happen
        throw new Error(`Cannot convert between color spaces ${this} and ${space}: no connection space was found`);
        // Go up from current space to connection space
        for(let i = myPath.length - 1; i > connectionSpaceIndex; i--)coords = myPath[i].toBase(coords);
        // Go down from connection space to target space
        for(let i = connectionSpaceIndex + 1; i < otherPath.length; i++)coords = otherPath[i].fromBase(coords);
        return coords;
    }
    from(space, coords) {
        if (arguments.length === 1) [space, coords] = [
            space.space,
            space.coords
        ];
        space = $2dca407f99b477df$var$ColorSpace.get(space);
        return space.to(this, coords);
    }
    toString() {
        return `${this.name} (${this.id})`;
    }
    getMinCoords() {
        let ret = [];
        for(let id in this.coords){
            let meta = this.coords[id];
            let range = meta.range || meta.refRange;
            ret.push(range?.min ?? 0);
        }
        return ret;
    }
    static registry = {};
    // Returns array of unique color spaces
    static get all() {
        return [
            ...new Set(Object.values($2dca407f99b477df$var$ColorSpace.registry))
        ];
    }
    static register(id, space) {
        if (arguments.length === 1) {
            space = arguments[0];
            id = space.id;
        }
        space = this.get(space);
        if (this.registry[id] && this.registry[id] !== space) throw new Error(`Duplicate color space registration: '${id}'`);
        this.registry[id] = space;
        // Register aliases when called without an explicit ID.
        if (arguments.length === 1 && space.aliases) for (let alias of space.aliases)this.register(alias, space);
        return space;
    }
    /**
   * Lookup ColorSpace object by name
   * @param {ColorSpace | string} name
   */ static get(space, ...alternatives) {
        if (!space || space instanceof $2dca407f99b477df$var$ColorSpace) return space;
        let argType = $2dca407f99b477df$var$type(space);
        if (argType === "string") {
            // It's a color space id
            let ret = $2dca407f99b477df$var$ColorSpace.registry[space.toLowerCase()];
            if (!ret) throw new TypeError(`No color space found with id = "${space}"`);
            return ret;
        }
        if (alternatives.length) return $2dca407f99b477df$var$ColorSpace.get(...alternatives);
        throw new TypeError(`${space} is not a valid color space`);
    }
    /**
   * Get metadata about a coordinate of a color space
   *
   * @static
   * @param {Array | string} ref
   * @param {ColorSpace | string} [workingSpace]
   * @return {Object}
   */ static resolveCoord(ref, workingSpace) {
        let coordType = $2dca407f99b477df$var$type(ref);
        let space, coord;
        if (coordType === "string") {
            if (ref.includes(".")) // Absolute coordinate
            [space, coord] = ref.split(".");
            else // Relative coordinate
            [space, coord] = [
                ,
                ref
            ];
        } else if (Array.isArray(ref)) [space, coord] = ref;
        else {
            // Object
            space = ref.space;
            coord = ref.coordId;
        }
        space = $2dca407f99b477df$var$ColorSpace.get(space);
        if (!space) space = workingSpace;
        if (!space) throw new TypeError(`Cannot resolve coordinate reference ${ref}: No color space specified and relative references are not allowed here`);
        coordType = $2dca407f99b477df$var$type(coord);
        if (coordType === "number" || coordType === "string" && coord >= 0) {
            // Resolve numerical coord
            let meta = Object.entries(space.coords)[coord];
            if (meta) return {
                space: space,
                id: meta[0],
                index: coord,
                ...meta[1]
            };
        }
        space = $2dca407f99b477df$var$ColorSpace.get(space);
        let normalizedCoord = coord.toLowerCase();
        let i = 0;
        for(let id in space.coords){
            let meta = space.coords[id];
            if (id.toLowerCase() === normalizedCoord || meta.name?.toLowerCase() === normalizedCoord) return {
                space: space,
                id: id,
                index: i,
                ...meta
            };
            i++;
        }
        throw new TypeError(`No "${coord}" coordinate found in ${space.name}. Its coordinates are: ${Object.keys(space.coords).join(", ")}`);
    }
    static DEFAULT_FORMAT = {
        type: "functions",
        name: "color"
    };
}
var $2dca407f99b477df$var$XYZ_D65 = new $2dca407f99b477df$var$ColorSpace({
    id: "xyz-d65",
    name: "XYZ D65",
    coords: {
        x: {
            name: "X"
        },
        y: {
            name: "Y"
        },
        z: {
            name: "Z"
        }
    },
    white: "D65",
    formats: {
        color: {
            ids: [
                "xyz-d65",
                "xyz"
            ]
        }
    },
    aliases: [
        "xyz"
    ]
});
/**
 * Convenience class for RGB color spaces
 * @extends {ColorSpace}
 */ class $2dca407f99b477df$var$RGBColorSpace extends $2dca407f99b477df$var$ColorSpace {
    /**
   * Creates a new RGB ColorSpace.
   * If coords are not specified, they will use the default RGB coords.
   * Instead of `fromBase()` and `toBase()` functions,
   * you can specify to/from XYZ matrices and have `toBase()` and `fromBase()` automatically generated.
   * @param {*} options - Same options as {@link ColorSpace} plus:
   * @param {number[][]} options.toXYZ_M - Matrix to convert to XYZ
   * @param {number[][]} options.fromXYZ_M - Matrix to convert from XYZ
   */ constructor(options){
        if (!options.coords) options.coords = {
            r: {
                range: [
                    0,
                    1
                ],
                name: "Red"
            },
            g: {
                range: [
                    0,
                    1
                ],
                name: "Green"
            },
            b: {
                range: [
                    0,
                    1
                ],
                name: "Blue"
            }
        };
        if (!options.base) options.base = $2dca407f99b477df$var$XYZ_D65;
        if (options.toXYZ_M && options.fromXYZ_M) {
            options.toBase ??= (rgb)=>{
                let xyz = $2dca407f99b477df$var$multiplyMatrices(options.toXYZ_M, rgb);
                if (this.white !== this.base.white) // Perform chromatic adaptation
                xyz = $2dca407f99b477df$var$adapt$1(this.white, this.base.white, xyz);
                return xyz;
            };
            options.fromBase ??= (xyz)=>{
                xyz = $2dca407f99b477df$var$adapt$1(this.base.white, this.white, xyz);
                return $2dca407f99b477df$var$multiplyMatrices(options.fromXYZ_M, xyz);
            };
        }
        options.referred ??= "display";
        super(options);
    }
}
// CSS color to Color object
function $2dca407f99b477df$var$parse(str) {
    let env = {
        str: String(str)?.trim()
    };
    $2dca407f99b477df$var$hooks.run("parse-start", env);
    if (env.color) return env.color;
    env.parsed = $2dca407f99b477df$var$parseFunction(env.str);
    if (env.parsed) {
        // Is a functional syntax
        let name = env.parsed.name;
        if (name === "color") {
            // color() function
            let id = env.parsed.args.shift();
            let alpha = env.parsed.rawArgs.indexOf("/") > 0 ? env.parsed.args.pop() : 1;
            for (let space of $2dca407f99b477df$var$ColorSpace.all){
                let colorSpec = space.getFormat("color");
                if (colorSpec) {
                    if (id === colorSpec.id || colorSpec.ids?.includes(id)) {
                        // From https://drafts.csswg.org/css-color-4/#color-function
                        // If more <number>s or <percentage>s are provided than parameters that the colorspace takes, the excess <number>s at the end are ignored.
                        // If less <number>s or <percentage>s are provided than parameters that the colorspace takes, the missing parameters default to 0. (This is particularly convenient for multichannel printers where the additional inks are spot colors or varnishes that most colors on the page won’t use.)
                        let argCount = Object.keys(space.coords).length;
                        let coords = Array(argCount).fill(0);
                        coords.forEach((_, i)=>coords[i] = env.parsed.args[i] || 0);
                        return {
                            spaceId: space.id,
                            coords: coords,
                            alpha: alpha
                        };
                    }
                }
            }
            // Not found
            let didYouMean = "";
            if (id in $2dca407f99b477df$var$ColorSpace.registry) {
                // Used color space id instead of color() id, these are often different
                let cssId = $2dca407f99b477df$var$ColorSpace.registry[id].formats?.functions?.color?.id;
                if (cssId) didYouMean = `Did you mean color(${cssId})?`;
            }
            throw new TypeError(`Cannot parse color(${id}). ` + (didYouMean || "Missing a plugin?"));
        } else for (let space of $2dca407f99b477df$var$ColorSpace.all){
            // color space specific function
            let format = space.getFormat(name);
            if (format && format.type === "function") {
                let alpha = 1;
                if (format.lastAlpha || $2dca407f99b477df$var$last(env.parsed.args).alpha) alpha = env.parsed.args.pop();
                let coords = env.parsed.args;
                if (format.coordGrammar) Object.entries(space.coords).forEach(([id, coordMeta], i)=>{
                    let coordGrammar = format.coordGrammar[i];
                    let providedType = coords[i]?.type;
                    // Find grammar alternative that matches the provided type
                    // Non-strict equals is intentional because we are comparing w/ string objects
                    coordGrammar = coordGrammar.find((c)=>c == providedType);
                    // Check that each coord conforms to its grammar
                    if (!coordGrammar) {
                        // Type does not exist in the grammar, throw
                        let coordName = coordMeta.name || id;
                        throw new TypeError(`${providedType} not allowed for ${coordName} in ${name}()`);
                    }
                    let fromRange = coordGrammar.range;
                    if (providedType === "<percentage>") fromRange ||= [
                        0,
                        1
                    ];
                    let toRange = coordMeta.range || coordMeta.refRange;
                    if (fromRange && toRange) coords[i] = $2dca407f99b477df$var$mapRange(fromRange, toRange, coords[i]);
                });
                return {
                    spaceId: space.id,
                    coords: coords,
                    alpha: alpha
                };
            }
        }
    } else {
        // Custom, colorspace-specific format
        for (let space of $2dca407f99b477df$var$ColorSpace.all)for(let formatId in space.formats){
            let format = space.formats[formatId];
            if (format.type !== "custom") continue;
            if (format.test && !format.test(env.str)) continue;
            let color = format.parse(env.str);
            if (color) {
                color.alpha ??= 1;
                return color;
            }
        }
    }
    // If we're here, we couldn't parse
    throw new TypeError(`Could not parse ${str} as a color. Missing a plugin?`);
}
/**
 * Resolves a color reference (object or string) to a plain color object
 * @param {Color | {space, coords, alpha} | string} color
 * @returns {{space, coords, alpha}}
 */ function $2dca407f99b477df$var$getColor(color) {
    if (!color) throw new TypeError("Empty color reference");
    if ($2dca407f99b477df$var$isString(color)) color = $2dca407f99b477df$var$parse(color);
    // Object fixup
    let space = color.space || color.spaceId;
    if (!(space instanceof $2dca407f99b477df$var$ColorSpace)) // Convert string id to color space object
    color.space = $2dca407f99b477df$var$ColorSpace.get(space);
    if (color.alpha === undefined) color.alpha = 1;
    return color;
}
/**
 * Get the coordinates of a color in another color space
 *
 * @param {string | ColorSpace} space
 * @returns {number[]}
 */ function $2dca407f99b477df$var$getAll(color, space) {
    space = $2dca407f99b477df$var$ColorSpace.get(space);
    return space.from(color);
}
function $2dca407f99b477df$var$get(color, prop) {
    let { space: space, index: index } = $2dca407f99b477df$var$ColorSpace.resolveCoord(prop, color.space);
    let coords = $2dca407f99b477df$var$getAll(color, space);
    return coords[index];
}
function $2dca407f99b477df$var$setAll(color, space, coords) {
    space = $2dca407f99b477df$var$ColorSpace.get(space);
    color.coords = space.to(color.space, coords);
    return color;
}
// Set properties and return current instance
function $2dca407f99b477df$var$set$1(color, prop, value1) {
    color = $2dca407f99b477df$var$getColor(color);
    if (arguments.length === 2 && $2dca407f99b477df$var$type(arguments[1]) === "object") {
        // Argument is an object literal
        let object = arguments[1];
        for(let p in object)$2dca407f99b477df$var$set$1(color, p, object[p]);
    } else {
        if (typeof value1 === "function") value1 = value1($2dca407f99b477df$var$get(color, prop));
        let { space: space, index: index } = $2dca407f99b477df$var$ColorSpace.resolveCoord(prop, color.space);
        let coords = $2dca407f99b477df$var$getAll(color, space);
        coords[index] = value1;
        $2dca407f99b477df$var$setAll(color, space, coords);
    }
    return color;
}
var $2dca407f99b477df$var$XYZ_D50 = new $2dca407f99b477df$var$ColorSpace({
    id: "xyz-d50",
    name: "XYZ D50",
    white: "D50",
    base: $2dca407f99b477df$var$XYZ_D65,
    fromBase: (coords)=>$2dca407f99b477df$var$adapt$1($2dca407f99b477df$var$XYZ_D65.white, "D50", coords),
    toBase: (coords)=>$2dca407f99b477df$var$adapt$1("D50", $2dca407f99b477df$var$XYZ_D65.white, coords),
    formats: {
        color: {}
    }
});
// κ * ε  = 2^3 = 8
const $2dca407f99b477df$var$ε$3 = 216 / 24389; // 6^3/29^3 == (24/116)^3
const $2dca407f99b477df$var$ε3$1 = 24 / 116;
const $2dca407f99b477df$var$κ$1 = 24389 / 27; // 29^3/3^3
let $2dca407f99b477df$var$white$1 = $2dca407f99b477df$var$WHITES.D50;
var $2dca407f99b477df$var$lab = new $2dca407f99b477df$var$ColorSpace({
    id: "lab",
    name: "Lab",
    coords: {
        l: {
            refRange: [
                0,
                100
            ],
            name: "L"
        },
        a: {
            refRange: [
                -125,
                125
            ]
        },
        b: {
            refRange: [
                -125,
                125
            ]
        }
    },
    // Assuming XYZ is relative to D50, convert to CIE Lab
    // from CIE standard, which now defines these as a rational fraction
    white: $2dca407f99b477df$var$white$1,
    base: $2dca407f99b477df$var$XYZ_D50,
    // Convert D50-adapted XYX to Lab
    //  CIE 15.3:2004 section 8.2.1.1
    fromBase (XYZ) {
        // compute xyz, which is XYZ scaled relative to reference white
        let xyz = XYZ.map((value1, i)=>value1 / $2dca407f99b477df$var$white$1[i]);
        // now compute f
        let f = xyz.map((value1)=>value1 > $2dca407f99b477df$var$ε$3 ? Math.cbrt(value1) : ($2dca407f99b477df$var$κ$1 * value1 + 16) / 116);
        return [
            116 * f[1] - 16,
            500 * (f[0] - f[1]),
            200 * (f[1] - f[2])
        ];
    },
    // Convert Lab to D50-adapted XYZ
    // Same result as CIE 15.3:2004 Appendix D although the derivation is different
    // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    toBase (Lab) {
        // compute f, starting with the luminance-related term
        let f = [];
        f[1] = (Lab[0] + 16) / 116;
        f[0] = Lab[1] / 500 + f[1];
        f[2] = f[1] - Lab[2] / 200;
        // compute xyz
        let xyz = [
            f[0] > $2dca407f99b477df$var$ε3$1 ? Math.pow(f[0], 3) : (116 * f[0] - 16) / $2dca407f99b477df$var$κ$1,
            Lab[0] > 8 ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / $2dca407f99b477df$var$κ$1,
            f[2] > $2dca407f99b477df$var$ε3$1 ? Math.pow(f[2], 3) : (116 * f[2] - 16) / $2dca407f99b477df$var$κ$1
        ];
        // Compute XYZ by scaling xyz by reference white
        return xyz.map((value1, i)=>value1 * $2dca407f99b477df$var$white$1[i]);
    },
    formats: {
        lab: {
            coords: [
                "<percentage> | <number>",
                "<number>",
                "<number>"
            ]
        }
    }
});
function $2dca407f99b477df$var$constrain(angle) {
    return (angle % 360 + 360) % 360;
}
function $2dca407f99b477df$var$adjust(arc, angles) {
    if (arc === "raw") return angles;
    let [a1, a2] = angles.map($2dca407f99b477df$var$constrain);
    let angleDiff = a2 - a1;
    if (arc === "increasing") {
        if (angleDiff < 0) a2 += 360;
    } else if (arc === "decreasing") {
        if (angleDiff > 0) a1 += 360;
    } else if (arc === "longer") {
        if (-180 < angleDiff && angleDiff < 180) {
            if (angleDiff > 0) a2 += 360;
            else a1 += 360;
        }
    } else if (arc === "shorter") {
        if (angleDiff > 180) a1 += 360;
        else if (angleDiff < -180) a2 += 360;
    }
    return [
        a1,
        a2
    ];
}
var $2dca407f99b477df$var$lch = new $2dca407f99b477df$var$ColorSpace({
    id: "lch",
    name: "LCH",
    coords: {
        l: {
            refRange: [
                0,
                100
            ],
            name: "Lightness"
        },
        c: {
            refRange: [
                0,
                150
            ],
            name: "Chroma"
        },
        h: {
            refRange: [
                0,
                360
            ],
            type: "angle",
            name: "Hue"
        }
    },
    base: $2dca407f99b477df$var$lab,
    fromBase (Lab) {
        // Convert to polar form
        let [L, a, b] = Lab;
        let hue;
        const ε = 0.02;
        if (Math.abs(a) < ε && Math.abs(b) < ε) hue = NaN;
        else hue = Math.atan2(b, a) * 180 / Math.PI;
        return [
            L,
            Math.sqrt(a ** 2 + b ** 2),
            $2dca407f99b477df$var$constrain(hue)
        ];
    },
    toBase (LCH) {
        // Convert from polar form
        let [Lightness, Chroma, Hue] = LCH;
        // Clamp any negative Chroma
        if (Chroma < 0) Chroma = 0;
         // Deal with NaN Hue
        if (isNaN(Hue)) Hue = 0;
        return [
            Lightness,
            Chroma * Math.cos(Hue * Math.PI / 180),
            Chroma * Math.sin(Hue * Math.PI / 180)
        ];
    },
    formats: {
        lch: {
            coords: [
                "<percentage> | <number>",
                "<number>",
                "<number> | <angle>"
            ]
        }
    }
});
// deltaE2000 is a statistically significant improvement
// and is recommended by the CIE and Idealliance
// especially for color differences less than 10 deltaE76
// but is wicked complicated
// and many implementations have small errors!
// DeltaE2000 is also discontinuous; in case this
// matters to you, use deltaECMC instead.
const $2dca407f99b477df$var$Gfactor = 25 ** 7;
const $2dca407f99b477df$var$π$1 = Math.PI;
const $2dca407f99b477df$var$r2d = 180 / $2dca407f99b477df$var$π$1;
const $2dca407f99b477df$var$d2r$1 = $2dca407f99b477df$var$π$1 / 180;
function $2dca407f99b477df$var$deltaE2000(color, sample, { kL: kL = 1, kC: kC = 1, kH: kH = 1 } = {}) {
    // Given this color as the reference
    // and the function parameter as the sample,
    // calculate deltaE 2000.
    // This implementation assumes the parametric
    // weighting factors kL, kC and kH
    // for the influence of viewing conditions
    // are all 1, as sadly seems typical.
    // kL should be increased for lightness texture or noise
    // and kC increased for chroma noise
    let [L1, a1, b1] = $2dca407f99b477df$var$lab.from(color);
    let C1 = $2dca407f99b477df$var$lch.from($2dca407f99b477df$var$lab, [
        L1,
        a1,
        b1
    ])[1];
    let [L2, a2, b2] = $2dca407f99b477df$var$lab.from(sample);
    let C2 = $2dca407f99b477df$var$lch.from($2dca407f99b477df$var$lab, [
        L2,
        a2,
        b2
    ])[1];
    // Check for negative Chroma,
    // which might happen through
    // direct user input of LCH values
    if (C1 < 0) C1 = 0;
    if (C2 < 0) C2 = 0;
    let Cbar = (C1 + C2) / 2; // mean Chroma
    // calculate a-axis asymmetry factor from mean Chroma
    // this turns JND ellipses for near-neutral colors back into circles
    let C7 = Cbar ** 7;
    let G = 0.5 * (1 - Math.sqrt(C7 / (C7 + $2dca407f99b477df$var$Gfactor)));
    // scale a axes by asymmetry factor
    // this by the way is why there is no Lab2000 colorspace
    let adash1 = (1 + G) * a1;
    let adash2 = (1 + G) * a2;
    // calculate new Chroma from scaled a and original b axes
    let Cdash1 = Math.sqrt(adash1 ** 2 + b1 ** 2);
    let Cdash2 = Math.sqrt(adash2 ** 2 + b2 ** 2);
    // calculate new hues, with zero hue for true neutrals
    // and in degrees, not radians
    let h1 = adash1 === 0 && b1 === 0 ? 0 : Math.atan2(b1, adash1);
    let h2 = adash2 === 0 && b2 === 0 ? 0 : Math.atan2(b2, adash2);
    if (h1 < 0) h1 += 2 * $2dca407f99b477df$var$π$1;
    if (h2 < 0) h2 += 2 * $2dca407f99b477df$var$π$1;
    h1 *= $2dca407f99b477df$var$r2d;
    h2 *= $2dca407f99b477df$var$r2d;
    // Lightness and Chroma differences; sign matters
    let ΔL = L2 - L1;
    let ΔC = Cdash2 - Cdash1;
    // Hue difference, getting the sign correct
    let hdiff = h2 - h1;
    let hsum = h1 + h2;
    let habs = Math.abs(hdiff);
    let Δh;
    if (Cdash1 * Cdash2 === 0) Δh = 0;
    else if (habs <= 180) Δh = hdiff;
    else if (hdiff > 180) Δh = hdiff - 360;
    else if (hdiff < -180) Δh = hdiff + 360;
    else console.log("the unthinkable has happened");
    // weighted Hue difference, more for larger Chroma
    let ΔH = 2 * Math.sqrt(Cdash2 * Cdash1) * Math.sin(Δh * $2dca407f99b477df$var$d2r$1 / 2);
    // calculate mean Lightness and Chroma
    let Ldash = (L1 + L2) / 2;
    let Cdash = (Cdash1 + Cdash2) / 2;
    let Cdash7 = Math.pow(Cdash, 7);
    // Compensate for non-linearity in the blue region of Lab.
    // Four possibilities for hue weighting factor,
    // depending on the angles, to get the correct sign
    let hdash;
    if (Cdash1 * Cdash2 === 0) hdash = hsum; // which should be zero
    else if (habs <= 180) hdash = hsum / 2;
    else if (hsum < 360) hdash = (hsum + 360) / 2;
    else hdash = (hsum - 360) / 2;
    // positional corrections to the lack of uniformity of CIELAB
    // These are all trying to make JND ellipsoids more like spheres
    // SL Lightness crispening factor
    // a background with L=50 is assumed
    let lsq = (Ldash - 50) ** 2;
    let SL = 1 + 0.015 * lsq / Math.sqrt(20 + lsq);
    // SC Chroma factor, similar to those in CMC and deltaE 94 formulae
    let SC = 1 + 0.045 * Cdash;
    // Cross term T for blue non-linearity
    let T = 1;
    T -= 0.17 * Math.cos((hdash - 30) * $2dca407f99b477df$var$d2r$1);
    T += 0.24 * Math.cos(2 * hdash * $2dca407f99b477df$var$d2r$1);
    T += 0.32 * Math.cos((3 * hdash + 6) * $2dca407f99b477df$var$d2r$1);
    T -= 0.2 * Math.cos((4 * hdash - 63) * $2dca407f99b477df$var$d2r$1);
    // SH Hue factor depends on Chroma,
    // as well as adjusted hue angle like deltaE94.
    let SH = 1 + 0.015 * Cdash * T;
    // RT Hue rotation term compensates for rotation of JND ellipses
    // and Munsell constant hue lines
    // in the medium-high Chroma blue region
    // (Hue 225 to 315)
    let Δθ = 30 * Math.exp(-1 * ((hdash - 275) / 25) ** 2);
    let RC = 2 * Math.sqrt(Cdash7 / (Cdash7 + $2dca407f99b477df$var$Gfactor));
    let RT = -1 * Math.sin(2 * Δθ * $2dca407f99b477df$var$d2r$1) * RC;
    // Finally calculate the deltaE, term by term as root sume of squares
    let dE = (ΔL / (kL * SL)) ** 2;
    dE += (ΔC / (kC * SC)) ** 2;
    dE += (ΔH / (kH * SH)) ** 2;
    dE += RT * (ΔC / (kC * SC)) * (ΔH / (kH * SH));
    return Math.sqrt(dE);
// Yay!!!
}
const $2dca407f99b477df$var$ε$2 = 0.000075;
/**
 * Check if a color is in gamut of either its own or another color space
 * @return {Boolean} Is the color in gamut?
 */ function $2dca407f99b477df$var$inGamut(color, space = color.space, { epsilon: epsilon = $2dca407f99b477df$var$ε$2 } = {}) {
    color = $2dca407f99b477df$var$getColor(color);
    space = $2dca407f99b477df$var$ColorSpace.get(space);
    let coords = color.coords;
    if (space !== color.space) coords = space.from(color);
    return space.inGamut(coords, {
        epsilon: epsilon
    });
}
function $2dca407f99b477df$var$clone(color) {
    return {
        space: color.space,
        coords: color.coords.slice(),
        alpha: color.alpha
    };
}
/**
 * Force coordinates to be in gamut of a certain color space.
 * Mutates the color it is passed.
 * @param {Object} options
 * @param {string} options.method - How to force into gamut.
 *        If "clip", coordinates are just clipped to their reference range.
 *        If in the form [colorSpaceId].[coordName], that coordinate is reduced
 *        until the color is in gamut. Please note that this may produce nonsensical
 *        results for certain coordinates (e.g. hue) or infinite loops if reducing the coordinate never brings the color in gamut.
 * @param {ColorSpace|string} options.space - The space whose gamut we want to map to
 */ function $2dca407f99b477df$var$toGamut(color, { method: method = $2dca407f99b477df$var$defaults.gamut_mapping, space: space = color.space } = {}) {
    if ($2dca407f99b477df$var$isString(arguments[1])) space = arguments[1];
    space = $2dca407f99b477df$var$ColorSpace.get(space);
    if ($2dca407f99b477df$var$inGamut(color, space, {
        epsilon: 0
    })) return color;
    // 3 spaces:
    // color.space: current color space
    // space: space whose gamut we are mapping to
    // mapSpace: space with the coord we're reducing
    let spaceColor = $2dca407f99b477df$var$to(color, space);
    if (method !== "clip" && !$2dca407f99b477df$var$inGamut(color, space)) {
        let clipped = $2dca407f99b477df$var$toGamut($2dca407f99b477df$var$clone(spaceColor), {
            method: "clip",
            space: space
        });
        if ($2dca407f99b477df$var$deltaE2000(color, clipped) > 2) {
            // Reduce a coordinate of a certain color space until the color is in gamut
            let coordMeta = $2dca407f99b477df$var$ColorSpace.resolveCoord(method);
            let mapSpace = coordMeta.space;
            let coordId = coordMeta.id;
            let mappedColor = $2dca407f99b477df$var$to(spaceColor, mapSpace);
            let bounds = coordMeta.range || coordMeta.refRange;
            let min = bounds[0];
            let ε = 0.01; // for deltaE
            let low = min;
            let high = $2dca407f99b477df$var$get(mappedColor, coordId);
            while(high - low > ε){
                let clipped = $2dca407f99b477df$var$clone(mappedColor);
                clipped = $2dca407f99b477df$var$toGamut(clipped, {
                    space: space,
                    method: "clip"
                });
                let deltaE = $2dca407f99b477df$var$deltaE2000(mappedColor, clipped);
                if (deltaE - 2 < ε) low = $2dca407f99b477df$var$get(mappedColor, coordId);
                else high = $2dca407f99b477df$var$get(mappedColor, coordId);
                $2dca407f99b477df$var$set$1(mappedColor, coordId, (low + high) / 2);
            }
            spaceColor = $2dca407f99b477df$var$to(mappedColor, space);
        } else spaceColor = clipped;
    }
    if (method === "clip" || // Dumb coord clipping
    // finish off smarter gamut mapping with clip to get rid of ε, see #17
    !$2dca407f99b477df$var$inGamut(spaceColor, space, {
        epsilon: 0
    })) {
        let bounds = Object.values(space.coords).map((c)=>c.range || []);
        spaceColor.coords = spaceColor.coords.map((c, i)=>{
            let [min, max] = bounds[i];
            if (min !== undefined) c = Math.max(min, c);
            if (max !== undefined) c = Math.min(c, max);
            return c;
        });
    }
    if (space !== color.space) spaceColor = $2dca407f99b477df$var$to(spaceColor, color.space);
    color.coords = spaceColor.coords;
    return color;
}
$2dca407f99b477df$var$toGamut.returns = "color";
/**
 * Convert to color space and return a new color
 * @param {Object|string} space - Color space object or id
 * @param {Object} options
 * @param {boolean} options.inGamut - Whether to force resulting color in gamut
 * @returns {Color}
 */ function $2dca407f99b477df$var$to(color, space, { inGamut: inGamut } = {}) {
    color = $2dca407f99b477df$var$getColor(color);
    space = $2dca407f99b477df$var$ColorSpace.get(space);
    let coords = space.from(color);
    let ret = {
        space: space,
        coords: coords,
        alpha: color.alpha
    };
    if (inGamut) ret = $2dca407f99b477df$var$toGamut(ret);
    return ret;
}
$2dca407f99b477df$var$to.returns = "color";
/**
 * Generic toString() method, outputs a color(spaceId ...coords) function, a functional syntax, or custom formats defined by the color space
 * @param {Object} options
 * @param {number} options.precision - Significant digits
 * @param {boolean} options.inGamut - Adjust coordinates to fit in gamut first? [default: false]
 */ function $2dca407f99b477df$var$serialize(color, { precision: precision = $2dca407f99b477df$var$defaults.precision, format: format = "default", inGamut: inGamut$1 = true, ...customOptions } = {}) {
    let ret;
    color = $2dca407f99b477df$var$getColor(color);
    let formatId = format;
    format = color.space.getFormat(format) ?? color.space.getFormat("default") ?? $2dca407f99b477df$var$ColorSpace.DEFAULT_FORMAT;
    inGamut$1 ||= format.toGamut;
    let coords = color.coords;
    // Convert NaN to zeros to have a chance at a valid CSS color
    // Also convert -0 to 0
    // This also clones it so we can manipulate it
    coords = coords.map((c)=>c ? c : 0);
    if (inGamut$1 && !$2dca407f99b477df$var$inGamut(color)) coords = $2dca407f99b477df$var$toGamut($2dca407f99b477df$var$clone(color), inGamut$1 === true ? undefined : inGamut$1).coords;
    if (format.type === "custom") {
        customOptions.precision = precision;
        if (format.serialize) ret = format.serialize(coords, color.alpha, customOptions);
        else throw new TypeError(`format ${formatId} can only be used to parse colors, not for serialization`);
    } else {
        // Functional syntax
        let name = format.name || "color";
        if (format.serializeCoords) coords = format.serializeCoords(coords, precision);
        else if (precision !== null) coords = coords.map((c)=>$2dca407f99b477df$var$toPrecision(c, precision));
        let args = [
            ...coords
        ];
        if (name === "color") {
            // If output is a color() function, add colorspace id as first argument
            let cssId = format.id || format.ids?.[0] || color.space.id;
            args.unshift(cssId);
        }
        let alpha = color.alpha;
        if (precision !== null) alpha = $2dca407f99b477df$var$toPrecision(alpha, precision);
        let strAlpha = color.alpha < 1 ? ` ${format.commas ? "," : "/"} ${alpha}` : "";
        ret = `${name}(${args.join(format.commas ? ", " : " ")}${strAlpha})`;
    }
    return ret;
}
// convert an array of linear-light rec2020 values to CIE XYZ
// using  D65 (no chromatic adaptation)
// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// 0 is actually calculated as  4.994106574466076e-17
const $2dca407f99b477df$var$toXYZ_M$5 = [
    [
        0.6369580483012914,
        0.14461690358620832,
        0.1688809751641721
    ],
    [
        0.2627002120112671,
        0.6779980715188708,
        0.05930171646986196
    ],
    [
        0.0,
        0.028072693049087428,
        1.060985057710791
    ]
];
// from ITU-R BT.2124-0 Annex 2 p.3
const $2dca407f99b477df$var$fromXYZ_M$5 = [
    [
        1.716651187971268,
        -0.355670783776392,
        -0.25336628137366
    ],
    [
        -0.666684351832489,
        1.616481236634939,
        0.0157685458139111
    ],
    [
        0.017639857445311,
        -0.042770613257809,
        0.942103121235474
    ]
];
var $2dca407f99b477df$var$REC2020Linear = new $2dca407f99b477df$var$RGBColorSpace({
    id: "rec2020-linear",
    name: "Linear REC.2020",
    white: "D65",
    toXYZ_M: $2dca407f99b477df$var$toXYZ_M$5,
    fromXYZ_M: $2dca407f99b477df$var$fromXYZ_M$5
});
// import sRGB from "./srgb.js";
const $2dca407f99b477df$var$α = 1.09929682680944;
const $2dca407f99b477df$var$β = 0.018053968510807;
var $2dca407f99b477df$var$REC2020 = new $2dca407f99b477df$var$RGBColorSpace({
    id: "rec2020",
    name: "REC.2020",
    base: $2dca407f99b477df$var$REC2020Linear,
    // Non-linear transfer function from Rec. ITU-R BT.2020-2 table 4
    toBase (RGB) {
        return RGB.map(function(val) {
            if (val < $2dca407f99b477df$var$β * 4.5) return val / 4.5;
            return Math.pow((val + $2dca407f99b477df$var$α - 1) / $2dca407f99b477df$var$α, 1 / 0.45);
        });
    },
    fromBase (RGB) {
        return RGB.map(function(val) {
            if (val >= $2dca407f99b477df$var$β) return $2dca407f99b477df$var$α * Math.pow(val, 0.45) - ($2dca407f99b477df$var$α - 1);
            return 4.5 * val;
        });
    },
    formats: {
        color: {}
    }
});
const $2dca407f99b477df$var$toXYZ_M$4 = [
    [
        0.4865709486482162,
        0.26566769316909306,
        0.1982172852343625
    ],
    [
        0.2289745640697488,
        0.6917385218365064,
        0.079286914093745
    ],
    [
        0.0,
        0.04511338185890264,
        1.043944368900976
    ]
];
const $2dca407f99b477df$var$fromXYZ_M$4 = [
    [
        2.493496911941425,
        -0.9313836179191239,
        -0.40271078445071684
    ],
    [
        -0.8294889695615747,
        1.7626640603183463,
        0.023624685841943577
    ],
    [
        0.03584583024378447,
        -0.07617238926804182,
        0.9568845240076872
    ]
];
var $2dca407f99b477df$var$P3Linear = new $2dca407f99b477df$var$RGBColorSpace({
    id: "p3-linear",
    name: "Linear P3",
    white: "D65",
    toXYZ_M: $2dca407f99b477df$var$toXYZ_M$4,
    fromXYZ_M: $2dca407f99b477df$var$fromXYZ_M$4
});
// This is the linear-light version of sRGB
// as used for example in SVG filters
// or in Canvas
// This matrix was calculated directly from the RGB and white chromaticities
// when rounded to 8 decimal places, it agrees completely with the official matrix
// see https://github.com/w3c/csswg-drafts/issues/5922
const $2dca407f99b477df$var$toXYZ_M$3 = [
    [
        0.41239079926595934,
        0.357584339383878,
        0.1804807884018343
    ],
    [
        0.21263900587151027,
        0.715168678767756,
        0.07219231536073371
    ],
    [
        0.01933081871559182,
        0.11919477979462598,
        0.9505321522496607
    ]
];
// This matrix is the inverse of the above;
// again it agrees with the official definition when rounded to 8 decimal places
const $2dca407f99b477df$var$fromXYZ_M$3 = [
    [
        3.2409699419045226,
        -1.537383177570094,
        -0.4986107602930034
    ],
    [
        -0.9692436362808796,
        1.8759675015077202,
        0.04155505740717559
    ],
    [
        0.05563007969699366,
        -0.20397695888897652,
        1.0569715142428786
    ]
];
var $2dca407f99b477df$var$sRGBLinear = new $2dca407f99b477df$var$RGBColorSpace({
    id: "srgb-linear",
    name: "Linear sRGB",
    white: "D65",
    toXYZ_M: $2dca407f99b477df$var$toXYZ_M$3,
    fromXYZ_M: $2dca407f99b477df$var$fromXYZ_M$3,
    formats: {
        color: {}
    }
});
/* List of CSS color keywords
 * Note that this does not include currentColor, transparent,
 * or system colors
 */ // To produce: Visit https://www.w3.org/TR/css-color-4/#named-colors
// and run in the console:
// copy($$("tr", $(".named-color-table tbody")).map(tr => `"${tr.cells[2].textContent.trim()}": [${tr.cells[4].textContent.trim().split(/\s+/).map(c => c === "0"? "0" : c === "255"? "1" : c + " / 255").join(", ")}]`).join(",\n"))
var $2dca407f99b477df$var$KEYWORDS = {
    aliceblue: [
        240 / 255,
        248 / 255,
        1
    ],
    antiquewhite: [
        250 / 255,
        235 / 255,
        215 / 255
    ],
    aqua: [
        0,
        1,
        1
    ],
    aquamarine: [
        127 / 255,
        1,
        212 / 255
    ],
    azure: [
        240 / 255,
        1,
        1
    ],
    beige: [
        245 / 255,
        245 / 255,
        220 / 255
    ],
    bisque: [
        1,
        228 / 255,
        196 / 255
    ],
    black: [
        0,
        0,
        0
    ],
    blanchedalmond: [
        1,
        235 / 255,
        205 / 255
    ],
    blue: [
        0,
        0,
        1
    ],
    blueviolet: [
        138 / 255,
        43 / 255,
        226 / 255
    ],
    brown: [
        165 / 255,
        42 / 255,
        42 / 255
    ],
    burlywood: [
        222 / 255,
        184 / 255,
        135 / 255
    ],
    cadetblue: [
        95 / 255,
        158 / 255,
        160 / 255
    ],
    chartreuse: [
        127 / 255,
        1,
        0
    ],
    chocolate: [
        210 / 255,
        105 / 255,
        30 / 255
    ],
    coral: [
        1,
        127 / 255,
        80 / 255
    ],
    cornflowerblue: [
        100 / 255,
        149 / 255,
        237 / 255
    ],
    cornsilk: [
        1,
        248 / 255,
        220 / 255
    ],
    crimson: [
        220 / 255,
        20 / 255,
        60 / 255
    ],
    cyan: [
        0,
        1,
        1
    ],
    darkblue: [
        0,
        0,
        139 / 255
    ],
    darkcyan: [
        0,
        139 / 255,
        139 / 255
    ],
    darkgoldenrod: [
        184 / 255,
        134 / 255,
        11 / 255
    ],
    darkgray: [
        169 / 255,
        169 / 255,
        169 / 255
    ],
    darkgreen: [
        0,
        100 / 255,
        0
    ],
    darkgrey: [
        169 / 255,
        169 / 255,
        169 / 255
    ],
    darkkhaki: [
        189 / 255,
        183 / 255,
        107 / 255
    ],
    darkmagenta: [
        139 / 255,
        0,
        139 / 255
    ],
    darkolivegreen: [
        85 / 255,
        107 / 255,
        47 / 255
    ],
    darkorange: [
        1,
        140 / 255,
        0
    ],
    darkorchid: [
        0.6,
        50 / 255,
        0.8
    ],
    darkred: [
        139 / 255,
        0,
        0
    ],
    darksalmon: [
        233 / 255,
        150 / 255,
        122 / 255
    ],
    darkseagreen: [
        143 / 255,
        188 / 255,
        143 / 255
    ],
    darkslateblue: [
        72 / 255,
        61 / 255,
        139 / 255
    ],
    darkslategray: [
        47 / 255,
        79 / 255,
        79 / 255
    ],
    darkslategrey: [
        47 / 255,
        79 / 255,
        79 / 255
    ],
    darkturquoise: [
        0,
        206 / 255,
        209 / 255
    ],
    darkviolet: [
        148 / 255,
        0,
        211 / 255
    ],
    deeppink: [
        1,
        20 / 255,
        147 / 255
    ],
    deepskyblue: [
        0,
        191 / 255,
        1
    ],
    dimgray: [
        105 / 255,
        105 / 255,
        105 / 255
    ],
    dimgrey: [
        105 / 255,
        105 / 255,
        105 / 255
    ],
    dodgerblue: [
        30 / 255,
        144 / 255,
        1
    ],
    firebrick: [
        178 / 255,
        34 / 255,
        34 / 255
    ],
    floralwhite: [
        1,
        250 / 255,
        240 / 255
    ],
    forestgreen: [
        34 / 255,
        139 / 255,
        34 / 255
    ],
    fuchsia: [
        1,
        0,
        1
    ],
    gainsboro: [
        220 / 255,
        220 / 255,
        220 / 255
    ],
    ghostwhite: [
        248 / 255,
        248 / 255,
        1
    ],
    gold: [
        1,
        215 / 255,
        0
    ],
    goldenrod: [
        218 / 255,
        165 / 255,
        32 / 255
    ],
    gray: [
        128 / 255,
        128 / 255,
        128 / 255
    ],
    green: [
        0,
        128 / 255,
        0
    ],
    greenyellow: [
        173 / 255,
        1,
        47 / 255
    ],
    grey: [
        128 / 255,
        128 / 255,
        128 / 255
    ],
    honeydew: [
        240 / 255,
        1,
        240 / 255
    ],
    hotpink: [
        1,
        105 / 255,
        180 / 255
    ],
    indianred: [
        205 / 255,
        92 / 255,
        92 / 255
    ],
    indigo: [
        75 / 255,
        0,
        130 / 255
    ],
    ivory: [
        1,
        1,
        240 / 255
    ],
    khaki: [
        240 / 255,
        230 / 255,
        140 / 255
    ],
    lavender: [
        230 / 255,
        230 / 255,
        250 / 255
    ],
    lavenderblush: [
        1,
        240 / 255,
        245 / 255
    ],
    lawngreen: [
        124 / 255,
        252 / 255,
        0
    ],
    lemonchiffon: [
        1,
        250 / 255,
        205 / 255
    ],
    lightblue: [
        173 / 255,
        216 / 255,
        230 / 255
    ],
    lightcoral: [
        240 / 255,
        128 / 255,
        128 / 255
    ],
    lightcyan: [
        224 / 255,
        1,
        1
    ],
    lightgoldenrodyellow: [
        250 / 255,
        250 / 255,
        210 / 255
    ],
    lightgray: [
        211 / 255,
        211 / 255,
        211 / 255
    ],
    lightgreen: [
        144 / 255,
        238 / 255,
        144 / 255
    ],
    lightgrey: [
        211 / 255,
        211 / 255,
        211 / 255
    ],
    lightpink: [
        1,
        182 / 255,
        193 / 255
    ],
    lightsalmon: [
        1,
        160 / 255,
        122 / 255
    ],
    lightseagreen: [
        32 / 255,
        178 / 255,
        170 / 255
    ],
    lightskyblue: [
        135 / 255,
        206 / 255,
        250 / 255
    ],
    lightslategray: [
        119 / 255,
        136 / 255,
        0.6
    ],
    lightslategrey: [
        119 / 255,
        136 / 255,
        0.6
    ],
    lightsteelblue: [
        176 / 255,
        196 / 255,
        222 / 255
    ],
    lightyellow: [
        1,
        1,
        224 / 255
    ],
    lime: [
        0,
        1,
        0
    ],
    limegreen: [
        50 / 255,
        205 / 255,
        50 / 255
    ],
    linen: [
        250 / 255,
        240 / 255,
        230 / 255
    ],
    magenta: [
        1,
        0,
        1
    ],
    maroon: [
        128 / 255,
        0,
        0
    ],
    mediumaquamarine: [
        0.4,
        205 / 255,
        170 / 255
    ],
    mediumblue: [
        0,
        0,
        205 / 255
    ],
    mediumorchid: [
        186 / 255,
        85 / 255,
        211 / 255
    ],
    mediumpurple: [
        147 / 255,
        112 / 255,
        219 / 255
    ],
    mediumseagreen: [
        60 / 255,
        179 / 255,
        113 / 255
    ],
    mediumslateblue: [
        123 / 255,
        104 / 255,
        238 / 255
    ],
    mediumspringgreen: [
        0,
        250 / 255,
        154 / 255
    ],
    mediumturquoise: [
        72 / 255,
        209 / 255,
        0.8
    ],
    mediumvioletred: [
        199 / 255,
        21 / 255,
        133 / 255
    ],
    midnightblue: [
        25 / 255,
        25 / 255,
        112 / 255
    ],
    mintcream: [
        245 / 255,
        1,
        250 / 255
    ],
    mistyrose: [
        1,
        228 / 255,
        225 / 255
    ],
    moccasin: [
        1,
        228 / 255,
        181 / 255
    ],
    navajowhite: [
        1,
        222 / 255,
        173 / 255
    ],
    navy: [
        0,
        0,
        128 / 255
    ],
    oldlace: [
        253 / 255,
        245 / 255,
        230 / 255
    ],
    olive: [
        128 / 255,
        128 / 255,
        0
    ],
    olivedrab: [
        107 / 255,
        142 / 255,
        35 / 255
    ],
    orange: [
        1,
        165 / 255,
        0
    ],
    orangered: [
        1,
        69 / 255,
        0
    ],
    orchid: [
        218 / 255,
        112 / 255,
        214 / 255
    ],
    palegoldenrod: [
        238 / 255,
        232 / 255,
        170 / 255
    ],
    palegreen: [
        152 / 255,
        251 / 255,
        152 / 255
    ],
    paleturquoise: [
        175 / 255,
        238 / 255,
        238 / 255
    ],
    palevioletred: [
        219 / 255,
        112 / 255,
        147 / 255
    ],
    papayawhip: [
        1,
        239 / 255,
        213 / 255
    ],
    peachpuff: [
        1,
        218 / 255,
        185 / 255
    ],
    peru: [
        205 / 255,
        133 / 255,
        63 / 255
    ],
    pink: [
        1,
        192 / 255,
        203 / 255
    ],
    plum: [
        221 / 255,
        160 / 255,
        221 / 255
    ],
    powderblue: [
        176 / 255,
        224 / 255,
        230 / 255
    ],
    purple: [
        128 / 255,
        0,
        128 / 255
    ],
    rebeccapurple: [
        0.4,
        0.2,
        0.6
    ],
    red: [
        1,
        0,
        0
    ],
    rosybrown: [
        188 / 255,
        143 / 255,
        143 / 255
    ],
    royalblue: [
        65 / 255,
        105 / 255,
        225 / 255
    ],
    saddlebrown: [
        139 / 255,
        69 / 255,
        19 / 255
    ],
    salmon: [
        250 / 255,
        128 / 255,
        114 / 255
    ],
    sandybrown: [
        244 / 255,
        164 / 255,
        96 / 255
    ],
    seagreen: [
        46 / 255,
        139 / 255,
        87 / 255
    ],
    seashell: [
        1,
        245 / 255,
        238 / 255
    ],
    sienna: [
        160 / 255,
        82 / 255,
        45 / 255
    ],
    silver: [
        192 / 255,
        192 / 255,
        192 / 255
    ],
    skyblue: [
        135 / 255,
        206 / 255,
        235 / 255
    ],
    slateblue: [
        106 / 255,
        90 / 255,
        205 / 255
    ],
    slategray: [
        112 / 255,
        128 / 255,
        144 / 255
    ],
    slategrey: [
        112 / 255,
        128 / 255,
        144 / 255
    ],
    snow: [
        1,
        250 / 255,
        250 / 255
    ],
    springgreen: [
        0,
        1,
        127 / 255
    ],
    steelblue: [
        70 / 255,
        130 / 255,
        180 / 255
    ],
    tan: [
        210 / 255,
        180 / 255,
        140 / 255
    ],
    teal: [
        0,
        128 / 255,
        128 / 255
    ],
    thistle: [
        216 / 255,
        191 / 255,
        216 / 255
    ],
    tomato: [
        1,
        99 / 255,
        71 / 255
    ],
    turquoise: [
        64 / 255,
        224 / 255,
        208 / 255
    ],
    violet: [
        238 / 255,
        130 / 255,
        238 / 255
    ],
    wheat: [
        245 / 255,
        222 / 255,
        179 / 255
    ],
    white: [
        1,
        1,
        1
    ],
    whitesmoke: [
        245 / 255,
        245 / 255,
        245 / 255
    ],
    yellow: [
        1,
        1,
        0
    ],
    yellowgreen: [
        154 / 255,
        205 / 255,
        50 / 255
    ]
};
let $2dca407f99b477df$var$coordGrammar = Array(3).fill("<percentage> | <number>[0, 255]");
var $2dca407f99b477df$var$sRGB = new $2dca407f99b477df$var$RGBColorSpace({
    id: "srgb",
    name: "sRGB",
    base: $2dca407f99b477df$var$sRGBLinear,
    fromBase: (rgb)=>{
        // convert an array of linear-light sRGB values in the range 0.0-1.0
        // to gamma corrected form
        // https://en.wikipedia.org/wiki/SRGB
        return rgb.map((val)=>{
            let sign = val < 0 ? -1 : 1;
            let abs = val * sign;
            if (abs > 0.0031308) return sign * (1.055 * abs ** (1 / 2.4) - 0.055);
            return 12.92 * val;
        });
    },
    toBase: (rgb)=>{
        // convert an array of sRGB values in the range 0.0 - 1.0
        // to linear light (un-companded) form.
        // https://en.wikipedia.org/wiki/SRGB
        return rgb.map((val)=>{
            let sign = val < 0 ? -1 : 1;
            let abs = val * sign;
            if (abs < 0.04045) return val / 12.92;
            return sign * ((abs + 0.055) / 1.055) ** 2.4;
        });
    },
    formats: {
        rgb: {
            coords: $2dca407f99b477df$var$coordGrammar
        },
        color: {
        },
        rgba: {
            coords: $2dca407f99b477df$var$coordGrammar,
            commas: true,
            lastAlpha: true
        },
        hex: {
            type: "custom",
            toGamut: true,
            test: (str)=>/^#([a-f0-9]{3,4}){1,2}$/i.test(str),
            parse (str) {
                if (str.length <= 5) // #rgb or #rgba, duplicate digits
                str = str.replace(/[a-f0-9]/gi, "$&$&");
                let rgba = [];
                str.replace(/[a-f0-9]{2}/gi, (component)=>{
                    rgba.push(parseInt(component, 16) / 255);
                });
                return {
                    spaceId: "srgb",
                    coords: rgba.slice(0, 3),
                    alpha: rgba.slice(3)[0]
                };
            },
            serialize: (coords, alpha, { collapse: collapse = true } = {})=>{
                if (alpha < 1) coords.push(alpha);
                coords = coords.map((c)=>Math.round(c * 255));
                let collapsible = collapse && coords.every((c)=>c % 17 === 0);
                let hex = coords.map((c)=>{
                    if (collapsible) return (c / 17).toString(16);
                    return c.toString(16).padStart(2, "0");
                }).join("");
                return "#" + hex;
            }
        },
        keyword: {
            type: "custom",
            test: (str)=>/^[a-z]+$/i.test(str),
            parse (str) {
                str = str.toLowerCase();
                let ret = {
                    spaceId: "srgb",
                    coords: null,
                    alpha: 1
                };
                if (str === "transparent") {
                    ret.coords = $2dca407f99b477df$var$KEYWORDS.black;
                    ret.alpha = 0;
                } else ret.coords = $2dca407f99b477df$var$KEYWORDS[str];
                if (ret.coords) return ret;
            }
        }
    }
});
var $2dca407f99b477df$var$P3 = new $2dca407f99b477df$var$RGBColorSpace({
    id: "p3",
    name: "P3",
    base: $2dca407f99b477df$var$P3Linear,
    // Gamma encoding/decoding is the same as sRGB
    fromBase: $2dca407f99b477df$var$sRGB.fromBase,
    toBase: $2dca407f99b477df$var$sRGB.toBase,
    formats: {
        color: {
            id: "display-p3"
        }
    }
});
// Default space for CSS output. Code in Color.js makes this wider if there's a DOM available
$2dca407f99b477df$var$defaults.display_space = $2dca407f99b477df$var$sRGB;
if (typeof CSS !== "undefined" && CSS.supports) // Find widest supported color space for CSS
for (let space of [
    $2dca407f99b477df$var$lab,
    $2dca407f99b477df$var$REC2020,
    $2dca407f99b477df$var$P3
]){
    let coords = space.getMinCoords();
    let color = {
        space: space,
        coords: coords,
        alpha: 1
    };
    let str = $2dca407f99b477df$var$serialize(color);
    if (CSS.supports("color", str)) {
        $2dca407f99b477df$var$defaults.display_space = space;
        break;
    }
}
/**
 * Returns a serialization of the color that can actually be displayed in the browser.
 * If the default serialization can be displayed, it is returned.
 * Otherwise, the color is converted to Lab, REC2020, or P3, whichever is the widest supported.
 * In Node.js, this is basically equivalent to `serialize()` but returns a `String` object instead.
 *
 * @export
 * @param {{space, coords} | Color | string} color
 * @param {*} [options={}] Options to be passed to serialize()
 * @param {ColorSpace | string} [options.space = defaults.display_space] Color space to use for serialization if default is not supported
 * @returns {String} String object containing the serialized color with a color property containing the converted color (or the original, if no conversion was necessary)
 */ function $2dca407f99b477df$var$display(color, { space: space = $2dca407f99b477df$var$defaults.display_space, ...options } = {}) {
    let ret = $2dca407f99b477df$var$serialize(color, options);
    if (typeof CSS === "undefined" || CSS.supports("color", ret) || !$2dca407f99b477df$var$defaults.display_space) {
        ret = new String(ret);
        ret.color = color;
    } else {
        // If we're here, what we were about to output is not supported
        // Fall back to fallback space
        let fallbackColor = $2dca407f99b477df$var$to(color, space);
        ret = new String($2dca407f99b477df$var$serialize(fallbackColor, options));
        ret.color = fallbackColor;
    }
    return ret;
}
/**
 * Euclidean distance of colors in an arbitrary color space
 */ function $2dca407f99b477df$var$distance(color1, color2, space = "lab") {
    space = $2dca407f99b477df$var$ColorSpace.get(space);
    let coords1 = space.from(color1);
    let coords2 = space.from(color2);
    return Math.sqrt(coords1.reduce((acc, c1, i)=>{
        let c2 = coords2[i];
        if (isNaN(c1) || isNaN(c2)) return acc;
        return acc + (c2 - c1) ** 2;
    }, 0));
}
function $2dca407f99b477df$var$equals(color1, color2) {
    color1 = $2dca407f99b477df$var$getColor(color1);
    color2 = $2dca407f99b477df$var$getColor(color2);
    return color1.space === color2.space && color1.alpha === color2.alpha && color1.coords.every((c, i)=>c === color2.coords[i]);
}
/**
 * Relative luminance
 */ function $2dca407f99b477df$var$getLuminance(color) {
    return $2dca407f99b477df$var$get(color, [
        $2dca407f99b477df$var$XYZ_D65,
        "y"
    ]);
}
function $2dca407f99b477df$var$setLuminance(color) {
    set(color, [
        $2dca407f99b477df$var$XYZ_D65,
        "y"
    ], value);
}
function $2dca407f99b477df$var$register$2(Color) {
    Object.defineProperty(Color.prototype, "luminance", {
        get () {
            return $2dca407f99b477df$var$getLuminance(this);
        },
        set (value1) {
            $2dca407f99b477df$var$setLuminance(this);
        }
    });
}
var $2dca407f99b477df$var$luminance = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getLuminance: $2dca407f99b477df$var$getLuminance,
    setLuminance: $2dca407f99b477df$var$setLuminance,
    register: $2dca407f99b477df$var$register$2
});
// WCAG 2.0 contrast https://www.w3.org/TR/WCAG20-TECHS/G18.html
function $2dca407f99b477df$var$contrastWCAG21(color1, color2) {
    color1 = $2dca407f99b477df$var$getColor(color1);
    color2 = $2dca407f99b477df$var$getColor(color2);
    let Y1 = Math.max($2dca407f99b477df$var$getLuminance(color1), 0);
    let Y2 = Math.max($2dca407f99b477df$var$getLuminance(color2), 0);
    if (Y2 > Y1) [Y1, Y2] = [
        Y2,
        Y1
    ];
    return (Y1 + 0.05) / (Y2 + 0.05);
}
// APCA 0.0.98G
// exponents
const $2dca407f99b477df$var$normBG = 0.56;
const $2dca407f99b477df$var$normTXT = 0.57;
const $2dca407f99b477df$var$revTXT = 0.62;
const $2dca407f99b477df$var$revBG = 0.65;
// clamps
const $2dca407f99b477df$var$blkThrs = 0.022;
const $2dca407f99b477df$var$blkClmp = 1.414;
const $2dca407f99b477df$var$loClip = 0.1;
const $2dca407f99b477df$var$deltaYmin = 0.0005;
// scalers
// see https://github.com/w3c/silver/issues/645
const $2dca407f99b477df$var$scaleBoW = 1.14;
const $2dca407f99b477df$var$loBoWoffset = 0.027;
const $2dca407f99b477df$var$scaleWoB = 1.14;
function $2dca407f99b477df$var$fclamp(Y) {
    if (Y >= $2dca407f99b477df$var$blkThrs) return Y;
    return Y + ($2dca407f99b477df$var$blkThrs - Y) ** $2dca407f99b477df$var$blkClmp;
}
function $2dca407f99b477df$var$linearize(val) {
    let sign = val < 0 ? -1 : 1;
    let abs = Math.abs(val);
    return sign * Math.pow(abs, 2.4);
}
// Not symmetric, requires a foreground (text) color, and a background color
function $2dca407f99b477df$var$contrastAPCA(background, foreground) {
    foreground = $2dca407f99b477df$var$getColor(foreground);
    background = $2dca407f99b477df$var$getColor(background);
    let S;
    let C;
    let Sapc;
    // Myndex as-published, assumes sRGB inputs
    let R, G, B;
    foreground = $2dca407f99b477df$var$to(foreground, "srgb");
    // Should these be clamped to in-gamut values?
    // Calculates "screen luminance" with non-standard simple gamma EOTF
    // weights should be from CSS Color 4, not the ones here which are via Myndex and copied from Lindbloom
    [R, G, B] = foreground.coords;
    let lumTxt = $2dca407f99b477df$var$linearize(R) * 0.2126729 + $2dca407f99b477df$var$linearize(G) * 0.7151522 + $2dca407f99b477df$var$linearize(B) * 0.072175;
    background = $2dca407f99b477df$var$to(background, "srgb");
    [R, G, B] = background.coords;
    let lumBg = $2dca407f99b477df$var$linearize(R) * 0.2126729 + $2dca407f99b477df$var$linearize(G) * 0.7151522 + $2dca407f99b477df$var$linearize(B) * 0.072175;
    // toe clamping of very dark values to account for flare
    let Ytxt = $2dca407f99b477df$var$fclamp(lumTxt);
    let Ybg = $2dca407f99b477df$var$fclamp(lumBg);
    // are we "Black on White" (dark on light), or light on dark?
    let BoW = Ybg > Ytxt;
    // why is this a delta, when Y is not perceptually uniform?
    // Answer: it is a noise gate, see
    // https://github.com/LeaVerou/color.js/issues/208
    if (Math.abs(Ybg - Ytxt) < $2dca407f99b477df$var$deltaYmin) C = 0;
    else if (BoW) {
        // dark text on light background
        S = Ybg ** $2dca407f99b477df$var$normBG - Ytxt ** $2dca407f99b477df$var$normTXT;
        C = S * $2dca407f99b477df$var$scaleBoW;
    } else {
        // light text on dark background
        S = Ybg ** $2dca407f99b477df$var$revBG - Ytxt ** $2dca407f99b477df$var$revTXT;
        C = S * $2dca407f99b477df$var$scaleWoB;
    }
    if (Math.abs(C) < $2dca407f99b477df$var$loClip) Sapc = 0;
    else if (C > 0) // not clear whether Woffset is loBoWoffset or loWoBoffset
    // but they have the same value
    Sapc = C - $2dca407f99b477df$var$loBoWoffset;
    else Sapc = C + $2dca407f99b477df$var$loBoWoffset;
    return Sapc * 100;
}
// Michelson  luminance contrast
function $2dca407f99b477df$var$contrastMichelson(color1, color2) {
    color1 = $2dca407f99b477df$var$getColor(color1);
    color2 = $2dca407f99b477df$var$getColor(color2);
    let Y1 = Math.max($2dca407f99b477df$var$getLuminance(color1), 0);
    let Y2 = Math.max($2dca407f99b477df$var$getLuminance(color2), 0);
    if (Y2 > Y1) [Y1, Y2] = [
        Y2,
        Y1
    ];
    let denom = Y1 + Y2;
    return denom === 0 ? 0 : (Y1 - Y2) / denom;
}
// Weber luminance contrast
// the darkest sRGB color above black is #000001 and this produces
// a plain Weber contrast of ~45647.
// So, setting the divide-by-zero result at 50000 is a reasonable
// max clamp for the plain Weber
const $2dca407f99b477df$var$max = 50000;
function $2dca407f99b477df$var$contrastWeber(color1, color2) {
    color1 = $2dca407f99b477df$var$getColor(color1);
    color2 = $2dca407f99b477df$var$getColor(color2);
    let Y1 = Math.max($2dca407f99b477df$var$getLuminance(color1), 0);
    let Y2 = Math.max($2dca407f99b477df$var$getLuminance(color2), 0);
    if (Y2 > Y1) [Y1, Y2] = [
        Y2,
        Y1
    ];
    return Y2 === 0 ? $2dca407f99b477df$var$max : (Y1 - Y2) / Y2;
}
// CIE Lightness difference, as used by Google Material Design
function $2dca407f99b477df$var$contrastLstar(color1, color2) {
    color1 = $2dca407f99b477df$var$getColor(color1);
    color2 = $2dca407f99b477df$var$getColor(color2);
    let L1 = $2dca407f99b477df$var$get(color1, [
        $2dca407f99b477df$var$lab,
        "l"
    ]);
    let L2 = $2dca407f99b477df$var$get(color2, [
        $2dca407f99b477df$var$lab,
        "l"
    ]);
    return Math.abs(L1 - L2);
}
// κ * ε  = 2^3 = 8
const $2dca407f99b477df$var$ε$1 = 216 / 24389; // 6^3/29^3 == (24/116)^3
const $2dca407f99b477df$var$ε3 = 24 / 116;
const $2dca407f99b477df$var$κ = 24389 / 27; // 29^3/3^3
let $2dca407f99b477df$var$white = $2dca407f99b477df$var$WHITES.D65;
var $2dca407f99b477df$var$lab_d65 = new $2dca407f99b477df$var$ColorSpace({
    id: "lab-d65",
    name: "Lab D65",
    coords: {
        l: {
            refRange: [
                0,
                100
            ],
            name: "L"
        },
        a: {
            refRange: [
                -125,
                125
            ]
        },
        b: {
            refRange: [
                -125,
                125
            ]
        }
    },
    white: // Assuming XYZ is relative to D65, convert to CIE Lab
    // from CIE standard, which now defines these as a rational fraction
    $2dca407f99b477df$var$white,
    base: $2dca407f99b477df$var$XYZ_D65,
    // Convert D65-adapted XYZ to Lab
    //  CIE 15.3:2004 section 8.2.1.1
    fromBase (XYZ) {
        // compute xyz, which is XYZ scaled relative to reference white
        let xyz = XYZ.map((value1, i)=>value1 / $2dca407f99b477df$var$white[i]);
        // now compute f
        let f = xyz.map((value1)=>value1 > $2dca407f99b477df$var$ε$1 ? Math.cbrt(value1) : ($2dca407f99b477df$var$κ * value1 + 16) / 116);
        return [
            116 * f[1] - 16,
            500 * (f[0] - f[1]),
            200 * (f[1] - f[2])
        ];
    },
    // Convert Lab to D65-adapted XYZ
    // Same result as CIE 15.3:2004 Appendix D although the derivation is different
    // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    toBase (Lab) {
        // compute f, starting with the luminance-related term
        let f = [];
        f[1] = (Lab[0] + 16) / 116;
        f[0] = Lab[1] / 500 + f[1];
        f[2] = f[1] - Lab[2] / 200;
        // compute xyz
        let xyz = [
            f[0] > $2dca407f99b477df$var$ε3 ? Math.pow(f[0], 3) : (116 * f[0] - 16) / $2dca407f99b477df$var$κ,
            Lab[0] > 8 ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / $2dca407f99b477df$var$κ,
            f[2] > $2dca407f99b477df$var$ε3 ? Math.pow(f[2], 3) : (116 * f[2] - 16) / $2dca407f99b477df$var$κ
        ];
        // Compute XYZ by scaling xyz by reference white
        return xyz.map((value1, i)=>value1 * $2dca407f99b477df$var$white[i]);
    },
    formats: {
        "lab-d65": {
            coords: [
                "<percentage> | <number>",
                "<number>",
                "<number>"
            ]
        }
    }
});
// Delta Phi Star perceptual lightness contrast
const $2dca407f99b477df$var$phi = Math.pow(5, 0.5) * 0.5 + 0.5; // Math.phi can be used if Math.js
function $2dca407f99b477df$var$contrastDeltaPhi(color1, color2) {
    color1 = $2dca407f99b477df$var$getColor(color1);
    color2 = $2dca407f99b477df$var$getColor(color2);
    let Lstr1 = $2dca407f99b477df$var$get(color1, [
        $2dca407f99b477df$var$lab_d65,
        "l"
    ]);
    let Lstr2 = $2dca407f99b477df$var$get(color2, [
        $2dca407f99b477df$var$lab_d65,
        "l"
    ]);
    let deltaPhiStar = Math.abs(Math.pow(Lstr1, $2dca407f99b477df$var$phi) - Math.pow(Lstr2, $2dca407f99b477df$var$phi));
    let contrast = Math.pow(deltaPhiStar, 1 / $2dca407f99b477df$var$phi) * Math.SQRT2 - 40;
    return contrast < 7.5 ? 0.0 : contrast;
}
var $2dca407f99b477df$var$contrastMethods = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    contrastWCAG21: $2dca407f99b477df$var$contrastWCAG21,
    contrastAPCA: $2dca407f99b477df$var$contrastAPCA,
    contrastMichelson: $2dca407f99b477df$var$contrastMichelson,
    contrastWeber: $2dca407f99b477df$var$contrastWeber,
    contrastLstar: $2dca407f99b477df$var$contrastLstar,
    contrastDeltaPhi: $2dca407f99b477df$var$contrastDeltaPhi
});
function $2dca407f99b477df$var$contrast(background, foreground, o = {}) {
    if ($2dca407f99b477df$var$isString(o)) o = {
        algorithm: o
    };
    let { algorithm: algorithm, ...rest } = o;
    if (!algorithm) {
        let algorithms = Object.keys($2dca407f99b477df$var$contrastMethods).map((a)=>a.replace(/^contrast/, "")).join(", ");
        throw new TypeError(`contrast() function needs a contrast algorithm. Please specify one of: ${algorithms}`);
    }
    background = $2dca407f99b477df$var$getColor(background);
    foreground = $2dca407f99b477df$var$getColor(foreground);
    for(let a in $2dca407f99b477df$var$contrastMethods){
        if ("contrast" + algorithm.toLowerCase() === a.toLowerCase()) return $2dca407f99b477df$var$contrastMethods[a](background, foreground, rest);
    }
    throw new TypeError(`Unknown contrast algorithm: ${algorithm}`);
}
// Chromaticity coordinates
function $2dca407f99b477df$var$uv(color) {
    let [X, Y, Z] = $2dca407f99b477df$var$getAll(color, $2dca407f99b477df$var$XYZ_D65);
    let denom = X + 15 * Y + 3 * Z;
    return [
        4 * X / denom,
        9 * Y / denom
    ];
}
function $2dca407f99b477df$var$xy(color) {
    let [X, Y, Z] = $2dca407f99b477df$var$getAll(color, $2dca407f99b477df$var$XYZ_D65);
    let sum = X + Y + Z;
    return [
        X / sum,
        Y / sum
    ];
}
function $2dca407f99b477df$var$register$1(Color) {
    // no setters, as lightness information is lost
    // when converting color to chromaticity
    Object.defineProperty(Color.prototype, "uv", {
        get () {
            return $2dca407f99b477df$var$uv(this);
        }
    });
    Object.defineProperty(Color.prototype, "xy", {
        get () {
            return $2dca407f99b477df$var$xy(this);
        }
    });
}
var $2dca407f99b477df$var$chromaticity = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    uv: $2dca407f99b477df$var$uv,
    xy: $2dca407f99b477df$var$xy,
    register: $2dca407f99b477df$var$register$1
});
function $2dca407f99b477df$var$deltaE76(color, sample) {
    return $2dca407f99b477df$var$distance(color, sample, "lab");
}
// More accurate color-difference formulae
// than the simple 1976 Euclidean distance in Lab
// CMC by the Color Measurement Committee of the
// Bradford Society of Dyeists and Colorsts, 1994.
// Uses LCH rather than Lab,
// with different weights for L, C and H differences
// A nice increase in accuracy for modest increase in complexity
const $2dca407f99b477df$var$π = Math.PI;
const $2dca407f99b477df$var$d2r = $2dca407f99b477df$var$π / 180;
function $2dca407f99b477df$var$deltaECMC(color, sample, { l: l = 2, c: c = 1 } = {}) {
    // Given this color as the reference
    // and a sample,
    // calculate deltaE CMC.
    // This implementation assumes the parametric
    // weighting factors l:c are 2:1
    // which is typical for non-textile uses.
    let [L1, a1, b1] = $2dca407f99b477df$var$lab.from(color);
    let [, C1, H1] = $2dca407f99b477df$var$lch.from($2dca407f99b477df$var$lab, [
        L1,
        a1,
        b1
    ]);
    let [L2, a2, b2] = $2dca407f99b477df$var$lab.from(sample);
    let C2 = $2dca407f99b477df$var$lch.from($2dca407f99b477df$var$lab, [
        L2,
        a2,
        b2
    ])[1];
    // let [L1, a1, b1] = color.getAll(lab);
    // let C1 = color.get("lch.c");
    // let H1 = color.get("lch.h");
    // let [L2, a2, b2] = sample.getAll(lab);
    // let C2 = sample.get("lch.c");
    // Check for negative Chroma,
    // which might happen through
    // direct user input of LCH values
    if (C1 < 0) C1 = 0;
    if (C2 < 0) C2 = 0;
    // we don't need H2 as ΔH is calculated from Δa, Δb and ΔC
    // Lightness and Chroma differences
    // These are (color - sample), unlike deltaE2000
    let ΔL = L1 - L2;
    let ΔC = C1 - C2;
    let Δa = a1 - a2;
    let Δb = b1 - b2;
    // weighted Hue difference, less for larger Chroma difference
    let H2 = Δa ** 2 + Δb ** 2 - ΔC ** 2;
    // due to roundoff error it is possible that, for zero a and b,
    // ΔC > Δa + Δb is 0, resulting in attempting
    // to take the square root of a negative number
    // trying instead the equation from Industrial Color Physics
    // By Georg A. Klein
    // let ΔH = ((a1 * b2) - (a2 * b1)) / Math.sqrt(0.5 * ((C2 * C1) + (a2 * a1) + (b2 * b1)));
    // This gives the same result to 12 decimal places
    // except it sometimes NaNs when trying to root a negative number
    // let ΔH = Math.sqrt(H2); we never actually use the root, it gets squared again!!
    // positional corrections to the lack of uniformity of CIELAB
    // These are all trying to make JND ellipsoids more like spheres
    // SL Lightness crispening factor, depends entirely on L1 not L2
    let SL = 0.511; // linear portion of the Y to L transfer function
    if (L1 >= 16) // cubic portion
    SL = 0.040975 * L1 / (1 + 0.01765 * L1);
    // SC Chroma factor
    let SC = 0.0638 * C1 / (1 + 0.0131 * C1) + 0.638;
    // Cross term T for blue non-linearity
    let T;
    if (Number.isNaN(H1)) H1 = 0;
    if (H1 >= 164 && H1 <= 345) T = 0.56 + Math.abs(0.2 * Math.cos((H1 + 168) * $2dca407f99b477df$var$d2r));
    else T = 0.36 + Math.abs(0.4 * Math.cos((H1 + 35) * $2dca407f99b477df$var$d2r));
    // SH Hue factor also depends on C1,
    let C4 = Math.pow(C1, 4);
    let F = Math.sqrt(C4 / (C4 + 1900));
    let SH = SC * (F * T + 1 - F);
    // Finally calculate the deltaE, term by term as root sume of squares
    let dE = (ΔL / (l * SL)) ** 2;
    dE += (ΔC / (c * SC)) ** 2;
    dE += H2 / SH ** 2;
    // dE += (ΔH / SH)  ** 2;
    return Math.sqrt(dE);
// Yay!!!
}
const $2dca407f99b477df$var$Yw$1 = 203; // absolute luminance of media white
var $2dca407f99b477df$var$XYZ_Abs_D65 = new $2dca407f99b477df$var$ColorSpace({
    // Absolute CIE XYZ, with a D65 whitepoint,
    // as used in most HDR colorspaces as a starting point.
    // SDR spaces are converted per BT.2048
    // so that diffuse, media white is 203 cd/m²
    id: "xyz-abs-d65",
    name: "Absolute XYZ D65",
    coords: {
        x: {
            refRange: [
                0,
                9504.7
            ],
            name: "Xa"
        },
        y: {
            refRange: [
                0,
                10000
            ],
            name: "Ya"
        },
        z: {
            refRange: [
                0,
                10888.3
            ],
            name: "Za"
        }
    },
    base: $2dca407f99b477df$var$XYZ_D65,
    fromBase (XYZ) {
        // Make XYZ absolute, not relative to media white
        // Maximum luminance in PQ is 10,000 cd/m²
        // Relative XYZ has Y=1 for media white
        return XYZ.map((v)=>Math.max(v * $2dca407f99b477df$var$Yw$1, 0));
    },
    toBase (AbsXYZ) {
        // Convert to media-white relative XYZ
        return AbsXYZ.map((v)=>Math.max(v / $2dca407f99b477df$var$Yw$1, 0));
    }
});
const $2dca407f99b477df$var$b$1 = 1.15;
const $2dca407f99b477df$var$g = 0.66;
const $2dca407f99b477df$var$n$1 = 2610 / 2 ** 14;
const $2dca407f99b477df$var$ninv$1 = 2 ** 14 / 2610;
const $2dca407f99b477df$var$c1$2 = 0.8359375;
const $2dca407f99b477df$var$c2$2 = 18.8515625;
const $2dca407f99b477df$var$c3$2 = 18.6875;
const $2dca407f99b477df$var$p = 1.7 * 2523 / 32;
const $2dca407f99b477df$var$pinv = 32 / (1.7 * 2523);
const $2dca407f99b477df$var$d = -0.56;
const $2dca407f99b477df$var$d0 = 1.6295499532821566e-11;
const $2dca407f99b477df$var$XYZtoCone_M = [
    [
        0.41478972,
        0.579999,
        0.014648
    ],
    [
        -0.20151,
        1.120649,
        0.0531008
    ],
    [
        -0.0166008,
        0.2648,
        0.6684799
    ]
];
// XYZtoCone_M inverted
const $2dca407f99b477df$var$ConetoXYZ_M = [
    [
        1.9242264357876067,
        -1.0047923125953657,
        0.037651404030618
    ],
    [
        0.35031676209499907,
        0.7264811939316552,
        -0.06538442294808501
    ],
    [
        -0.09098281098284752,
        -0.3127282905230739,
        1.5227665613052603
    ]
];
const $2dca407f99b477df$var$ConetoIab_M = [
    [
        0.5,
        0.5,
        0
    ],
    [
        3.524,
        -4.066708,
        0.542708
    ],
    [
        0.199076,
        1.096799,
        -1.295875
    ]
];
// ConetoIab_M inverted
const $2dca407f99b477df$var$IabtoCone_M = [
    [
        1,
        0.1386050432715393,
        0.05804731615611886
    ],
    [
        0.9999999999999999,
        -0.1386050432715393,
        -0.05804731615611886
    ],
    [
        0.9999999999999998,
        -0.09601924202631895,
        -0.8118918960560388
    ]
];
var $2dca407f99b477df$var$Jzazbz = new $2dca407f99b477df$var$ColorSpace({
    id: "jzazbz",
    name: "Jzazbz",
    coords: {
        jz: {
            refRange: [
                0,
                1
            ],
            name: "Jz"
        },
        az: {
            refRange: [
                -0.5,
                0.5
            ]
        },
        bz: {
            refRange: [
                -0.5,
                0.5
            ]
        }
    },
    base: $2dca407f99b477df$var$XYZ_Abs_D65,
    fromBase (XYZ) {
        // First make XYZ absolute, not relative to media white
        // Maximum luminance in PQ is 10,000 cd/m²
        // Relative XYZ has Y=1 for media white
        // BT.2048 says media white Y=203 at PQ 58
        let [Xa, Ya, Za] = XYZ;
        // modify X and Y
        let Xm = $2dca407f99b477df$var$b$1 * Xa - ($2dca407f99b477df$var$b$1 - 1) * Za;
        let Ym = $2dca407f99b477df$var$g * Ya - ($2dca407f99b477df$var$g - 1) * Xa;
        // move to LMS cone domain
        let LMS = $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$XYZtoCone_M, [
            Xm,
            Ym,
            Za
        ]);
        // PQ-encode LMS
        let PQLMS = LMS.map(function(val) {
            let num = $2dca407f99b477df$var$c1$2 + $2dca407f99b477df$var$c2$2 * (val / 10000) ** $2dca407f99b477df$var$n$1;
            let denom = 1 + $2dca407f99b477df$var$c3$2 * (val / 10000) ** $2dca407f99b477df$var$n$1;
            return (num / denom) ** $2dca407f99b477df$var$p;
        });
        // almost there, calculate Iz az bz
        let [Iz, az, bz] = $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$ConetoIab_M, PQLMS);
        let Jz = (1 + $2dca407f99b477df$var$d) * Iz / (1 + $2dca407f99b477df$var$d * Iz) - $2dca407f99b477df$var$d0;
        return [
            Jz,
            az,
            bz
        ];
    },
    toBase (Jzazbz) {
        let [Jz, az, bz] = Jzazbz;
        let Iz = (Jz + $2dca407f99b477df$var$d0) / (1 + $2dca407f99b477df$var$d - $2dca407f99b477df$var$d * (Jz + $2dca407f99b477df$var$d0));
        // bring into LMS cone domain
        let PQLMS = $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$IabtoCone_M, [
            Iz,
            az,
            bz
        ]);
        // convert from PQ-coded to linear-light
        let LMS = PQLMS.map(function(val) {
            let num = $2dca407f99b477df$var$c1$2 - val ** $2dca407f99b477df$var$pinv;
            let denom = $2dca407f99b477df$var$c3$2 * val ** $2dca407f99b477df$var$pinv - $2dca407f99b477df$var$c2$2;
            let x = 10000 * (num / denom) ** $2dca407f99b477df$var$ninv$1;
            return x; // luminance relative to diffuse white, [0, 70 or so].
        });
        // modified abs XYZ
        let [Xm, Ym, Za] = $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$ConetoXYZ_M, LMS);
        // restore standard D50 relative XYZ, relative to media white
        let Xa = (Xm + ($2dca407f99b477df$var$b$1 - 1) * Za) / $2dca407f99b477df$var$b$1;
        let Ya = (Ym + ($2dca407f99b477df$var$g - 1) * Xa) / $2dca407f99b477df$var$g;
        return [
            Xa,
            Ya,
            Za
        ];
    },
    formats: {
        // https://drafts.csswg.org/css-color-hdr/#Jzazbz
        color: {}
    }
});
var $2dca407f99b477df$var$jzczhz = new $2dca407f99b477df$var$ColorSpace({
    id: "jzczhz",
    name: "JzCzHz",
    coords: {
        jz: {
            refRange: [
                0,
                1
            ],
            name: "Jz"
        },
        cz: {
            refRange: [
                0,
                1
            ],
            name: "Chroma"
        },
        hz: {
            refRange: [
                0,
                360
            ],
            type: "angle",
            name: "Hue"
        }
    },
    base: $2dca407f99b477df$var$Jzazbz,
    fromBase (jzazbz) {
        // Convert to polar form
        let [Jz, az, bz] = jzazbz;
        let hue;
        const ε = 0.0002; // chromatic components much smaller than a,b
        if (Math.abs(az) < ε && Math.abs(bz) < ε) hue = NaN;
        else hue = Math.atan2(bz, az) * 180 / Math.PI;
        return [
            Jz,
            Math.sqrt(az ** 2 + bz ** 2),
            $2dca407f99b477df$var$constrain(hue)
        ];
    },
    toBase (jzczhz) {
        // Convert from polar form
        // debugger;
        return [
            jzczhz[0],
            jzczhz[1] * Math.cos(jzczhz[2] * Math.PI / 180),
            jzczhz[1] * Math.sin(jzczhz[2] * Math.PI / 180)
        ];
    },
    formats: {
        color: {}
    }
});
// More accurate color-difference formulae
// than the simple 1976 Euclidean distance in Lab
// Uses JzCzHz, which has improved perceptual uniformity
// and thus a simple Euclidean root-sum of ΔL² ΔC² ΔH²
// gives good results.
function $2dca407f99b477df$var$deltaEJz(color, sample) {
    // Given this color as the reference
    // and a sample,
    // calculate deltaE in JzCzHz.
    let [Jz1, Cz1, Hz1] = $2dca407f99b477df$var$jzczhz.from(color);
    let [Jz2, Cz2, Hz2] = $2dca407f99b477df$var$jzczhz.from(sample);
    // Lightness and Chroma differences
    // sign does not matter as they are squared.
    let ΔJ = Jz1 - Jz2;
    let ΔC = Cz1 - Cz2;
    // length of chord for ΔH
    if (Number.isNaN(Hz1) && Number.isNaN(Hz2)) {
        // both undefined hues
        Hz1 = 0;
        Hz2 = 0;
    } else if (Number.isNaN(Hz1)) // one undefined, set to the defined hue
    Hz1 = Hz2;
    else if (Number.isNaN(Hz2)) Hz2 = Hz1;
    let Δh = Hz1 - Hz2;
    let ΔH = 2 * Math.sqrt(Cz1 * Cz2) * Math.sin(Δh / 2 * (Math.PI / 180));
    return Math.sqrt(ΔJ ** 2 + ΔC ** 2 + ΔH ** 2);
}
const $2dca407f99b477df$var$c1$1 = 0.8359375;
const $2dca407f99b477df$var$c2$1 = 2413 / 128;
const $2dca407f99b477df$var$c3$1 = 18.6875;
const $2dca407f99b477df$var$m1 = 2610 / 16384;
const $2dca407f99b477df$var$m2 = 2523 / 32;
const $2dca407f99b477df$var$im1 = 16384 / 2610;
const $2dca407f99b477df$var$im2 = 32 / 2523;
// The matrix below includes the 4% crosstalk components
// and is from the Dolby "What is ICtCp" paper"
const $2dca407f99b477df$var$XYZtoLMS_M$1 = [
    [
        0.3592,
        0.6976,
        -0.0358
    ],
    [
        -0.1922,
        1.1004,
        0.0755
    ],
    [
        0.007,
        0.0749,
        0.8434
    ]
];
// linear-light Rec.2020 to LMS, again with crosstalk
// rational terms from Jan Fröhlich,
// Encoding High Dynamic Range andWide Color Gamut Imagery, p.97
// and ITU-R BT.2124-0 p.2
/*
const Rec2020toLMS_M = [
	[ 1688 / 4096,  2146 / 4096,   262 / 4096 ],
	[  683 / 4096,  2951 / 4096,   462 / 4096 ],
	[   99 / 4096,   309 / 4096,  3688 / 4096 ]
];
*/ // this includes the Ebner LMS coefficients,
// the rotation, and the scaling to [-0.5,0.5] range
// rational terms from Fröhlich p.97
// and ITU-R BT.2124-0 pp.2-3
const $2dca407f99b477df$var$LMStoIPT_M = [
    [
        0.5,
        0.5,
        0
    ],
    [
        6610 / 4096,
        -13613 / 4096,
        7003 / 4096
    ],
    [
        17933 / 4096,
        -17390 / 4096,
        -543 / 4096
    ]
];
// inverted matrices, calculated from the above
const $2dca407f99b477df$var$IPTtoLMS_M = [
    [
        0.99998889656284013833,
        0.00860505014728705821,
        0.1110343715986164786
    ],
    [
        1.0000111034371598616,
        -0.008605050147287059,
        -0.11103437159861648
    ],
    [
        1.000032063391005412,
        0.56004913547279000113,
        -0.3206339100541203
    ]
];
/*
const LMStoRec2020_M = [
	[ 3.4375568932814012112,   -2.5072112125095058195,   0.069654319228104608382],
	[-0.79142868665644156125,   1.9838372198740089874,  -0.19240853321756742626 ],
	[-0.025646662911506476363, -0.099240248643945566751, 1.1248869115554520431  ]
];
*/ const $2dca407f99b477df$var$LMStoXYZ_M$1 = [
    [
        2.0701800566956135096,
        -1.326456876103021,
        0.20661600684785517081
    ],
    [
        0.36498825003265747974,
        0.68046736285223514102,
        -0.04542175307585323
    ],
    [
        -0.04959554223893211,
        -0.04942116118675749,
        1.1879959417328034394
    ]
];
// Only the PQ form of ICtCp is implemented here. There is also an HLG form.
// from Dolby, "WHAT IS ICTCP?"
// https://professional.dolby.com/siteassets/pdfs/ictcp_dolbywhitepaper_v071.pdf
// and
// Dolby, "Perceptual Color Volume
// Measuring the Distinguishable Colors of HDR and WCG Displays"
// https://professional.dolby.com/siteassets/pdfs/dolby-vision-measuring-perceptual-color-volume-v7.1.pdf
var $2dca407f99b477df$var$ictcp = new $2dca407f99b477df$var$ColorSpace({
    id: "ictcp",
    name: "ICTCP",
    // From BT.2100-2 page 7:
    // During production, signal values are expected to exceed the
    // range E′ = [0.0 : 1.0]. This provides processing headroom and avoids
    // signal degradation during cascaded processing. Such values of E′,
    // below 0.0 or exceeding 1.0, should not be clipped during production
    // and exchange.
    // Values below 0.0 should not be clipped in reference displays (even
    // though they represent “negative” light) to allow the black level of
    // the signal (LB) to be properly set using test signals known as “PLUGE”
    coords: {
        i: {
            refRange: [
                0,
                1
            ],
            name: "I"
        },
        ct: {
            refRange: [
                -0.5,
                0.5
            ],
            name: "CT"
        },
        cp: {
            refRange: [
                -0.5,
                0.5
            ],
            name: "CP"
        }
    },
    base: $2dca407f99b477df$var$XYZ_Abs_D65,
    fromBase (XYZ) {
        // move to LMS cone domain
        let LMS = $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$XYZtoLMS_M$1, XYZ);
        return $2dca407f99b477df$var$LMStoICtCp(LMS);
    },
    toBase (ICtCp) {
        let LMS = $2dca407f99b477df$var$ICtCptoLMS(ICtCp);
        return $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$LMStoXYZ_M$1, LMS);
    },
    formats: {
        color: {}
    }
});
function $2dca407f99b477df$var$LMStoICtCp(LMS) {
    // apply the PQ EOTF
    // we can't ever be dividing by zero because of the "1 +" in the denominator
    let PQLMS = LMS.map(function(val) {
        let num = $2dca407f99b477df$var$c1$1 + $2dca407f99b477df$var$c2$1 * (val / 10000) ** $2dca407f99b477df$var$m1;
        let denom = 1 + $2dca407f99b477df$var$c3$1 * (val / 10000) ** $2dca407f99b477df$var$m1;
        return (num / denom) ** $2dca407f99b477df$var$m2;
    });
    // LMS to IPT, with rotation for Y'C'bC'r compatibility
    return $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$LMStoIPT_M, PQLMS);
}
function $2dca407f99b477df$var$ICtCptoLMS(ICtCp) {
    let PQLMS = $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$IPTtoLMS_M, ICtCp);
    // From BT.2124-0 Annex 2 Conversion 3
    let LMS = PQLMS.map(function(val) {
        let num = Math.max(val ** $2dca407f99b477df$var$im2 - $2dca407f99b477df$var$c1$1, 0);
        let denom = $2dca407f99b477df$var$c2$1 - $2dca407f99b477df$var$c3$1 * val ** $2dca407f99b477df$var$im2;
        return 10000 * (num / denom) ** $2dca407f99b477df$var$im1;
    });
    return LMS;
}
// Delta E in ICtCp space,
// which the ITU calls Delta E ITP, which is shorter
// formulae from ITU Rec. ITU-R BT.2124-0
function $2dca407f99b477df$var$deltaEITP(color, sample) {
    // Given this color as the reference
    // and a sample,
    // calculate deltaE in ICtCp
    // which is simply the Euclidean distance
    let [I1, T1, P1] = $2dca407f99b477df$var$ictcp.from(color);
    let [I2, T2, P2] = $2dca407f99b477df$var$ictcp.from(sample);
    // the 0.25 factor is to undo the encoding scaling in Ct
    // the 720 is so that 1 deltaE = 1 JND
    // per  ITU-R BT.2124-0 p.3
    return 720 * Math.sqrt((I1 - I2) ** 2 + 0.25 * (T1 - T2) ** 2 + (P1 - P2) ** 2);
}
// Recalculated for consistent reference white
// see https://github.com/w3c/csswg-drafts/issues/6642#issuecomment-943521484
const $2dca407f99b477df$var$XYZtoLMS_M = [
    [
        0.8190224432164319,
        0.3619062562801221,
        -0.12887378261216414
    ],
    [
        0.0329836671980271,
        0.9292868468965546,
        0.03614466816999844
    ],
    [
        0.048177199566046255,
        0.26423952494422764,
        0.6335478258136937
    ]
];
// inverse of XYZtoLMS_M
const $2dca407f99b477df$var$LMStoXYZ_M = [
    [
        1.2268798733741557,
        -0.5578149965554813,
        0.28139105017721583
    ],
    [
        -0.04057576262431372,
        1.1122868293970594,
        -0.07171106666151701
    ],
    [
        -0.07637294974672142,
        -0.4214933239627914,
        1.5869240244272418
    ]
];
const $2dca407f99b477df$var$LMStoLab_M = [
    [
        0.2104542553,
        0.793617785,
        -0.0040720468
    ],
    [
        1.9779984951,
        -2.428592205,
        0.4505937099
    ],
    [
        0.0259040371,
        0.7827717662,
        -0.808675766
    ]
];
// LMStoIab_M inverted
const $2dca407f99b477df$var$LabtoLMS_M = [
    [
        0.99999999845051981432,
        0.39633779217376785678,
        0.21580375806075880339
    ],
    [
        1.0000000088817607767,
        -0.10556134232365635,
        -0.06385417477170591
    ],
    [
        1.0000000546724109177,
        -0.08948418209496575,
        -1.2914855378640917
    ]
];
var $2dca407f99b477df$var$OKLab = new $2dca407f99b477df$var$ColorSpace({
    id: "oklab",
    name: "OKLab",
    coords: {
        l: {
            refRange: [
                0,
                1
            ],
            name: "L"
        },
        a: {
            refRange: [
                -0.4,
                0.4
            ]
        },
        b: {
            refRange: [
                -0.4,
                0.4
            ]
        }
    },
    // Note that XYZ is relative to D65
    white: "D65",
    base: $2dca407f99b477df$var$XYZ_D65,
    fromBase (XYZ) {
        // move to LMS cone domain
        let LMS = $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$XYZtoLMS_M, XYZ);
        // non-linearity
        let LMSg = LMS.map((val)=>Math.cbrt(val));
        return $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$LMStoLab_M, LMSg);
    },
    toBase (OKLab) {
        // move to LMS cone domain
        let LMSg = $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$LabtoLMS_M, OKLab);
        // restore linearity
        let LMS = LMSg.map((val)=>val ** 3);
        return $2dca407f99b477df$var$multiplyMatrices($2dca407f99b477df$var$LMStoXYZ_M, LMS);
    },
    formats: {
        oklab: {
            coords: [
                "<percentage>",
                "<number>",
                "<number>"
            ]
        }
    }
});
// More accurate color-difference formulae
function $2dca407f99b477df$var$deltaEOK(color, sample) {
    // Given this color as the reference
    // and a sample,
    // calculate deltaEOK, term by term as root sum of squares
    let [L1, a1, b1] = $2dca407f99b477df$var$OKLab.from(color);
    let [L2, a2, b2] = $2dca407f99b477df$var$OKLab.from(sample);
    let ΔL = L1 - L2;
    let Δa = a1 - a2;
    let Δb = b1 - b2;
    return Math.sqrt(ΔL ** 2 + Δa ** 2 + Δb ** 2);
}
var $2dca407f99b477df$var$deltaEMethods = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    deltaE76: $2dca407f99b477df$var$deltaE76,
    deltaECMC: $2dca407f99b477df$var$deltaECMC,
    deltaE2000: $2dca407f99b477df$var$deltaE2000,
    deltaEJz: $2dca407f99b477df$var$deltaEJz,
    deltaEITP: $2dca407f99b477df$var$deltaEITP,
    deltaEOK: $2dca407f99b477df$var$deltaEOK
});
function $2dca407f99b477df$var$deltaE(c1, c2, o = {}) {
    if ($2dca407f99b477df$var$isString(o)) o = {
        method: o
    };
    let { method: method = $2dca407f99b477df$var$defaults.deltaE, ...rest } = o;
    c1 = $2dca407f99b477df$var$getColor(c1);
    c2 = $2dca407f99b477df$var$getColor(c2);
    for(let m in $2dca407f99b477df$var$deltaEMethods){
        if ("deltae" + method.toLowerCase() === m.toLowerCase()) return $2dca407f99b477df$var$deltaEMethods[m](c1, c2, rest);
    }
    throw new TypeError(`Unknown deltaE method: ${method}`);
}
var $2dca407f99b477df$var$deltaE$1 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    default: $2dca407f99b477df$var$deltaE
});
function $2dca407f99b477df$var$lighten(color, amount = 0.25) {
    let space = $2dca407f99b477df$var$ColorSpace.get("oklch", "lch");
    let lightness = [
        space,
        "l"
    ];
    return $2dca407f99b477df$var$set$1(color, lightness, (l)=>l * (1 + amount));
}
function $2dca407f99b477df$var$darken(color, amount = 0.25) {
    let space = $2dca407f99b477df$var$ColorSpace.get("oklch", "lch");
    let lightness = [
        space,
        "l"
    ];
    return $2dca407f99b477df$var$set$1(color, lightness, (l)=>l * (1 - amount));
}
var $2dca407f99b477df$var$variations = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    lighten: $2dca407f99b477df$var$lighten,
    darken: $2dca407f99b477df$var$darken
});
/**
 * Functions related to color interpolation
 */ /**
 * Return an intermediate color between two colors
 * Signatures: mix(c1, c2, p, options)
 *             mix(c1, c2, options)
 *             mix(color)
 * @param {Color | string} c1 The first color
 * @param {Color | string} [c2] The second color
 * @param {number} [p=.5] A 0-1 percentage where 0 is c1 and 1 is c2
 * @param {Object} [o={}]
 * @return {Color}
 */ function $2dca407f99b477df$var$mix(c1, c2, p = 0.5, o = {}) {
    [c1, c2] = [
        $2dca407f99b477df$var$getColor(c1),
        $2dca407f99b477df$var$getColor(c2)
    ];
    if ($2dca407f99b477df$var$type(p) === "object") [p, o] = [
        0.5,
        p
    ];
    let { space: space, outputSpace: outputSpace } = o;
    let r = $2dca407f99b477df$var$range(c1, c2, {
        space: space,
        outputSpace: outputSpace
    });
    return r(p);
}
/**
 *
 * @param {Color | string | Function} c1 The first color or a range
 * @param {Color | string} [c2] The second color if c1 is not a range
 * @param {Object} [options={}]
 * @return {Color[]}
 */ function $2dca407f99b477df$var$steps(c1, c2, options = {}) {
    let colorRange;
    if ($2dca407f99b477df$var$isRange(c1)) {
        // Tweaking existing range
        [colorRange, options] = [
            c1,
            c2
        ];
        [c1, c2] = colorRange.rangeArgs.colors;
    }
    let { maxDeltaE: maxDeltaE, deltaEMethod: deltaEMethod, steps: steps = 2, maxSteps: maxSteps = 1000, ...rangeOptions } = options;
    if (!colorRange) {
        [c1, c2] = [
            $2dca407f99b477df$var$getColor(c1),
            $2dca407f99b477df$var$getColor(c2)
        ];
        colorRange = $2dca407f99b477df$var$range(c1, c2, rangeOptions);
    }
    let totalDelta = $2dca407f99b477df$var$deltaE(c1, c2);
    let actualSteps = maxDeltaE > 0 ? Math.max(steps, Math.ceil(totalDelta / maxDeltaE) + 1) : steps;
    let ret = [];
    if (maxSteps !== undefined) actualSteps = Math.min(actualSteps, maxSteps);
    if (actualSteps === 1) ret = [
        {
            p: 0.5,
            color: colorRange(0.5)
        }
    ];
    else {
        let step = 1 / (actualSteps - 1);
        ret = Array.from({
            length: actualSteps
        }, (_, i)=>{
            let p = i * step;
            return {
                p: p,
                color: colorRange(p)
            };
        });
    }
    if (maxDeltaE > 0) {
        // Iterate over all stops and find max deltaE
        let maxDelta = ret.reduce((acc, cur, i)=>{
            if (i === 0) return 0;
            let ΔΕ = $2dca407f99b477df$var$deltaE(cur.color, ret[i - 1].color, deltaEMethod);
            return Math.max(acc, ΔΕ);
        }, 0);
        while(maxDelta > maxDeltaE){
            // Insert intermediate stops and measure maxDelta again
            // We need to do this for all pairs, otherwise the midpoint shifts
            maxDelta = 0;
            for(let i = 1; i < ret.length && ret.length < maxSteps; i++){
                let prev = ret[i - 1];
                let cur = ret[i];
                let p = (cur.p + prev.p) / 2;
                let color = colorRange(p);
                maxDelta = Math.max(maxDelta, $2dca407f99b477df$var$deltaE(color, prev.color), $2dca407f99b477df$var$deltaE(color, cur.color));
                ret.splice(i, 0, {
                    p: p,
                    color: colorRange(p)
                });
                i++;
            }
        }
    }
    ret = ret.map((a)=>a.color);
    return ret;
}
/**
 * Interpolate to color2 and return a function that takes a 0-1 percentage
 * @param {Color | string | Function} color1 The first color or an existing range
 * @param {Color | string} [color2] If color1 is a color, this is the second color
 * @param {Object} [options={}]
 * @returns {Function} A function that takes a 0-1 percentage and returns a color
 */ function $2dca407f99b477df$var$range(color1, color2, options = {}) {
    if ($2dca407f99b477df$var$isRange(color1)) {
        // Tweaking existing range
        let [r, options] = [
            color1,
            color2
        ];
        return $2dca407f99b477df$var$range(...r.rangeArgs.colors, {
            ...r.rangeArgs.options,
            ...options
        });
    }
    let { space: space, outputSpace: outputSpace, progression: progression, premultiplied: premultiplied } = options;
    color1 = $2dca407f99b477df$var$getColor(color1);
    color2 = $2dca407f99b477df$var$getColor(color2);
    // Make sure we're working on copies of these colors
    color1 = $2dca407f99b477df$var$clone(color1);
    color2 = $2dca407f99b477df$var$clone(color2);
    let rangeArgs = {
        colors: [
            color1,
            color2
        ],
        options: options
    };
    if (space) space = $2dca407f99b477df$var$ColorSpace.get(space);
    else space = $2dca407f99b477df$var$ColorSpace.registry[$2dca407f99b477df$var$defaults.interpolationSpace] || color1.space;
    outputSpace = outputSpace ? $2dca407f99b477df$var$ColorSpace.get(outputSpace) : space;
    color1 = $2dca407f99b477df$var$to(color1, space);
    color2 = $2dca407f99b477df$var$to(color2, space);
    // Gamut map to avoid areas of flat color
    color1 = $2dca407f99b477df$var$toGamut(color1);
    color2 = $2dca407f99b477df$var$toGamut(color2);
    // Handle hue interpolation
    // See https://github.com/w3c/csswg-drafts/issues/4735#issuecomment-635741840
    if (space.coords.h && space.coords.h.type === "angle") {
        let arc = options.hue = options.hue || "shorter";
        let hue = [
            space,
            "h"
        ];
        let [θ1, θ2] = [
            $2dca407f99b477df$var$get(color1, hue),
            $2dca407f99b477df$var$get(color2, hue)
        ];
        [θ1, θ2] = $2dca407f99b477df$var$adjust(arc, [
            θ1,
            θ2
        ]);
        $2dca407f99b477df$var$set$1(color1, hue, θ1);
        $2dca407f99b477df$var$set$1(color2, hue, θ2);
    }
    if (premultiplied) {
        // not coping with polar spaces yet
        color1.coords = color1.coords.map((c)=>c * color1.alpha);
        color2.coords = color2.coords.map((c)=>c * color2.alpha);
    }
    return Object.assign((p)=>{
        p = progression ? progression(p) : p;
        let coords = color1.coords.map((start, i)=>{
            let end = color2.coords[i];
            return $2dca407f99b477df$var$interpolate(start, end, p);
        });
        let alpha = $2dca407f99b477df$var$interpolate(color1.alpha, color2.alpha, p);
        let ret = {
            space: space,
            coords: coords,
            alpha: alpha
        };
        if (premultiplied) // undo premultiplication
        ret.coords = ret.coords.map((c)=>c / alpha);
        if (outputSpace !== space) ret = $2dca407f99b477df$var$to(ret, outputSpace);
        return ret;
    }, {
        rangeArgs: rangeArgs
    });
}
function $2dca407f99b477df$var$isRange(val) {
    return $2dca407f99b477df$var$type(val) === "function" && !!val.rangeArgs;
}
$2dca407f99b477df$var$defaults.interpolationSpace = "lab";
function $2dca407f99b477df$var$register(Color) {
    Color.defineFunction("mix", $2dca407f99b477df$var$mix, {
        returns: "color"
    });
    Color.defineFunction("range", $2dca407f99b477df$var$range, {
        returns: "function<color>"
    });
    Color.defineFunction("steps", $2dca407f99b477df$var$steps, {
        returns: "array<color>"
    });
}
var $2dca407f99b477df$var$interpolation = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    mix: $2dca407f99b477df$var$mix,
    steps: $2dca407f99b477df$var$steps,
    range: $2dca407f99b477df$var$range,
    isRange: $2dca407f99b477df$var$isRange,
    register: $2dca407f99b477df$var$register
});
var $2dca407f99b477df$var$HSL = new $2dca407f99b477df$var$ColorSpace({
    id: "hsl",
    name: "HSL",
    coords: {
        h: {
            refRange: [
                0,
                360
            ],
            type: "angle",
            name: "Hue"
        },
        s: {
            range: [
                0,
                100
            ],
            name: "Saturation"
        },
        l: {
            range: [
                0,
                100
            ],
            name: "Lightness"
        }
    },
    base: $2dca407f99b477df$var$sRGB,
    // Adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
    fromBase: (rgb)=>{
        let max = Math.max(...rgb);
        let min = Math.min(...rgb);
        let [r, g, b] = rgb;
        let [h, s, l] = [
            NaN,
            0,
            (min + max) / 2
        ];
        let d = max - min;
        if (d !== 0) {
            s = l === 0 || l === 1 ? 0 : (max - l) / Math.min(l, 1 - l);
            switch(max){
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
            }
            h = h * 60;
        }
        return [
            h,
            s * 100,
            l * 100
        ];
    },
    // Adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
    toBase: (hsl)=>{
        let [h, s, l] = hsl;
        h = h % 360;
        if (h < 0) h += 360;
        s /= 100;
        l /= 100;
        function f(n) {
            let k = (n + h / 30) % 12;
            let a = s * Math.min(l, 1 - l);
            return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        }
        return [
            f(0),
            f(8),
            f(4)
        ];
    },
    formats: {
        hsl: {
            toGamut: true,
            coords: [
                "<number> | <angle>",
                "<percentage>",
                "<percentage>"
            ]
        },
        hsla: {
            coords: [
                "<number> | <angle>",
                "<percentage>",
                "<percentage>"
            ],
            commas: true,
            lastAlpha: true
        }
    }
});
// The Hue, Whiteness Blackness (HWB) colorspace
// See https://drafts.csswg.org/css-color-4/#the-hwb-notation
// Note that, like HSL, calculations are done directly on
// gamma-corrected sRGB values rather than linearising them first.
var $2dca407f99b477df$var$HSV = new $2dca407f99b477df$var$ColorSpace({
    id: "hsv",
    name: "HSV",
    coords: {
        h: {
            refRange: [
                0,
                360
            ],
            type: "angle",
            name: "Hue"
        },
        s: {
            range: [
                0,
                100
            ],
            name: "Saturation"
        },
        v: {
            range: [
                0,
                100
            ],
            name: "Value"
        }
    },
    base: $2dca407f99b477df$var$HSL,
    // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
    fromBase (hsl) {
        let [h, s, l] = hsl;
        s /= 100;
        l /= 100;
        let v = l + s * Math.min(l, 1 - l);
        return [
            h,
            v === 0 ? 0 : 200 * (1 - l / v),
            100 * v
        ];
    },
    // https://en.wikipedia.org/wiki/HSL_and_HSV#Interconversion
    toBase (hsv) {
        let [h, s, v] = hsv;
        s /= 100;
        v /= 100;
        let l = v * (1 - s / 2);
        return [
            h,
            l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l) * 100,
            l * 100
        ];
    },
    formats: {
        color: {
            toGamut: true
        }
    }
});
// The Hue, Whiteness Blackness (HWB) colorspace
// See https://drafts.csswg.org/css-color-4/#the-hwb-notation
// Note that, like HSL, calculations are done directly on
// gamma-corrected sRGB values rather than linearising them first.
var $2dca407f99b477df$var$hwb = new $2dca407f99b477df$var$ColorSpace({
    id: "hwb",
    name: "HWB",
    coords: {
        h: {
            refRange: [
                0,
                360
            ],
            type: "angle",
            name: "Hue"
        },
        w: {
            range: [
                0,
                100
            ],
            name: "Whiteness"
        },
        b: {
            range: [
                0,
                100
            ],
            name: "Blackness"
        }
    },
    base: $2dca407f99b477df$var$HSV,
    fromBase (hsv) {
        let [h, s, v] = hsv;
        return [
            h,
            v * (100 - s) / 100,
            100 - v
        ];
    },
    toBase (hwb) {
        let [h, w, b] = hwb;
        // Now convert percentages to [0..1]
        w /= 100;
        b /= 100;
        // Achromatic check (white plus black >= 1)
        let sum = w + b;
        if (sum >= 1) {
            let gray = w / sum;
            return [
                h,
                0,
                gray * 100
            ];
        }
        let v = 1 - b;
        let s = v === 0 ? 0 : 1 - w / v;
        return [
            h,
            s * 100,
            v * 100
        ];
    },
    formats: {
        hwb: {
            toGamut: true,
            coords: [
                "<number> | <angle>",
                "<percentage>",
                "<percentage>"
            ]
        }
    }
});
// convert an array of linear-light a98-rgb values to CIE XYZ
// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// has greater numerical precision than section 4.3.5.3 of
// https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf
// but the values below were calculated from first principles
// from the chromaticity coordinates of R G B W
const $2dca407f99b477df$var$toXYZ_M$2 = [
    [
        0.5766690429101305,
        0.1855582379065463,
        0.1882286462349947
    ],
    [
        0.29734497525053605,
        0.6273635662554661,
        0.07529145849399788
    ],
    [
        0.02703136138641234,
        0.07068885253582723,
        0.9913375368376388
    ]
];
const $2dca407f99b477df$var$fromXYZ_M$2 = [
    [
        2.0415879038107465,
        -0.5650069742788596,
        -0.34473135077832956
    ],
    [
        -0.9692436362808795,
        1.8759675015077202,
        0.04155505740717557
    ],
    [
        0.013444280632031142,
        -0.11836239223101838,
        1.0151749943912054
    ]
];
var $2dca407f99b477df$var$A98Linear = new $2dca407f99b477df$var$RGBColorSpace({
    id: "a98rgb-linear",
    name: "Linear Adobe\xae 98 RGB compatible",
    white: "D65",
    toXYZ_M: $2dca407f99b477df$var$toXYZ_M$2,
    fromXYZ_M: $2dca407f99b477df$var$fromXYZ_M$2
});
var $2dca407f99b477df$var$a98rgb = new $2dca407f99b477df$var$RGBColorSpace({
    id: "a98rgb",
    name: "Adobe\xae 98 RGB compatible",
    base: $2dca407f99b477df$var$A98Linear,
    toBase: (RGB)=>RGB.map((val)=>Math.pow(Math.abs(val), 563 / 256) * Math.sign(val)),
    fromBase: (RGB)=>RGB.map((val)=>Math.pow(Math.abs(val), 256 / 563) * Math.sign(val)),
    formats: {
        color: {
            id: "a98-rgb"
        }
    }
});
// convert an array of  prophoto-rgb values to CIE XYZ
// using  D50 (so no chromatic adaptation needed afterwards)
// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
const $2dca407f99b477df$var$toXYZ_M$1 = [
    [
        0.7977604896723027,
        0.13518583717574031,
        0.0313493495815248
    ],
    [
        0.2880711282292934,
        0.7118432178101014,
        0.00008565396060525902
    ],
    [
        0.0,
        0.0,
        0.8251046025104601
    ]
];
const $2dca407f99b477df$var$fromXYZ_M$1 = [
    [
        1.3457989731028281,
        -0.25558010007997534,
        -0.05110628506753401
    ],
    [
        -0.5446224939028347,
        1.5082327413132781,
        0.02053603239147973
    ],
    [
        0.0,
        0.0,
        1.2119675456389454
    ]
];
var $2dca407f99b477df$var$ProPhotoLinear = new $2dca407f99b477df$var$RGBColorSpace({
    id: "prophoto-linear",
    name: "Linear ProPhoto",
    white: "D50",
    base: $2dca407f99b477df$var$XYZ_D50,
    toXYZ_M: $2dca407f99b477df$var$toXYZ_M$1,
    fromXYZ_M: $2dca407f99b477df$var$fromXYZ_M$1
});
const $2dca407f99b477df$var$Et = 1 / 512;
const $2dca407f99b477df$var$Et2 = 16 / 512;
var $2dca407f99b477df$var$prophoto = new $2dca407f99b477df$var$RGBColorSpace({
    id: "prophoto",
    name: "ProPhoto",
    base: $2dca407f99b477df$var$ProPhotoLinear,
    toBase (RGB) {
        // Transfer curve is gamma 1.8 with a small linear portion
        return RGB.map((v)=>v < $2dca407f99b477df$var$Et2 ? v / 16 : v ** 1.8);
    },
    fromBase (RGB) {
        return RGB.map((v)=>v >= $2dca407f99b477df$var$Et ? v ** (1 / 1.8) : 16 * v);
    },
    formats: {
        color: {
            id: "prophoto-rgb"
        }
    }
});
var $2dca407f99b477df$var$oklch = new $2dca407f99b477df$var$ColorSpace({
    id: "oklch",
    name: "OKLCh",
    coords: {
        l: {
            refRange: [
                0,
                1
            ],
            name: "Lightness"
        },
        c: {
            refRange: [
                0,
                0.4
            ],
            name: "Chroma"
        },
        h: {
            refRange: [
                0,
                360
            ],
            type: "angle",
            name: "Hue"
        }
    },
    white: "D65",
    base: $2dca407f99b477df$var$OKLab,
    fromBase (oklab) {
        // Convert to polar form
        let [L, a, b] = oklab;
        let h;
        const ε = 0.0002; // chromatic components much smaller than a,b
        if (Math.abs(a) < ε && Math.abs(b) < ε) h = NaN;
        else h = Math.atan2(b, a) * 180 / Math.PI;
        return [
            L,
            Math.sqrt(a ** 2 + b ** 2),
            $2dca407f99b477df$var$constrain(h)
        ];
    },
    // Convert from polar form
    toBase (oklch) {
        let [L, C, h] = oklch;
        let a, b;
        // check for NaN hue
        if (isNaN(h)) {
            a = 0;
            b = 0;
        } else {
            a = C * Math.cos(h * Math.PI / 180);
            b = C * Math.sin(h * Math.PI / 180);
        }
        return [
            L,
            a,
            b
        ];
    },
    formats: {
        oklch: {
            coords: [
                "<percentage>",
                "<number>",
                "<number> | <angle>"
            ]
        }
    }
});
const $2dca407f99b477df$var$Yw = 203; // absolute luminance of media white, cd/m²
const $2dca407f99b477df$var$n = 2610 / 2 ** 14;
const $2dca407f99b477df$var$ninv = 2 ** 14 / 2610;
const $2dca407f99b477df$var$m = 78.84375;
const $2dca407f99b477df$var$minv = 32 / 2523;
const $2dca407f99b477df$var$c1 = 0.8359375;
const $2dca407f99b477df$var$c2 = 18.8515625;
const $2dca407f99b477df$var$c3 = 18.6875;
var $2dca407f99b477df$var$rec2100Pq = new $2dca407f99b477df$var$RGBColorSpace({
    id: "rec2100pq",
    name: "REC.2100-PQ",
    base: $2dca407f99b477df$var$REC2020Linear,
    toBase (RGB) {
        // given PQ encoded component in range [0, 1]
        // return media-white relative linear-light
        return RGB.map(function(val) {
            let x = (Math.max(val ** $2dca407f99b477df$var$minv - $2dca407f99b477df$var$c1, 0) / ($2dca407f99b477df$var$c2 - $2dca407f99b477df$var$c3 * val ** $2dca407f99b477df$var$minv)) ** $2dca407f99b477df$var$ninv;
            return x * 10000 / $2dca407f99b477df$var$Yw; // luminance relative to diffuse white, [0, 70 or so].
        });
    },
    fromBase (RGB) {
        // given media-white relative linear-light
        // returnPQ encoded component in range [0, 1]
        return RGB.map(function(val) {
            let x = Math.max(val * $2dca407f99b477df$var$Yw / 10000, 0); // absolute luminance of peak white is 10,000 cd/m².
            let num = $2dca407f99b477df$var$c1 + $2dca407f99b477df$var$c2 * x ** $2dca407f99b477df$var$n;
            let denom = 1 + $2dca407f99b477df$var$c3 * x ** $2dca407f99b477df$var$n;
            return (num / denom) ** $2dca407f99b477df$var$m;
        });
    },
    formats: {
        color: {
            id: "rec2100-pq"
        }
    }
});
// FIXME see https://github.com/LeaVerou/color.js/issues/190
const $2dca407f99b477df$var$a = 0.17883277;
const $2dca407f99b477df$var$b = 0.28466892; // 1 - (4 * a)
const $2dca407f99b477df$var$c = 0.55991073; // 0.5 - a * Math.log(4 *a)
var $2dca407f99b477df$var$rec2100Hlg = new $2dca407f99b477df$var$RGBColorSpace({
    id: "rec2100hlg",
    cssid: "rec2100-hlg",
    name: "REC.2100-HLG",
    referred: "scene",
    base: $2dca407f99b477df$var$REC2020Linear,
    toBase (RGB) {
        // given HLG encoded component in range [0, 1]
        // return media-white relative linear-light
        return RGB.map(function(val) {
            if (val <= 1 / 12) return Math.sqrt(3 * val);
            return $2dca407f99b477df$var$a * Math.log(12 * val - $2dca407f99b477df$var$b) + $2dca407f99b477df$var$c;
        });
    },
    fromBase (RGB) {
        // given media-white relative linear-light
        // return HLG encoded component in range [0, 1]
        // per ITU Rec BT.2390
        return RGB.map(function(val) {
            if (val <= 0.5) return val ** 2 / 3;
            return Math.exp((val - $2dca407f99b477df$var$c) / $2dca407f99b477df$var$a + $2dca407f99b477df$var$b) / 12;
        });
    },
    formats: {
        color: {
            id: "rec2100-hlg"
        }
    }
});
const $2dca407f99b477df$var$CATs = {};
$2dca407f99b477df$var$hooks.add("chromatic-adaptation-start", (env)=>{
    if (env.options.method) env.M = $2dca407f99b477df$var$adapt(env.W1, env.W2, env.options.method);
});
$2dca407f99b477df$var$hooks.add("chromatic-adaptation-end", (env)=>{
    if (!env.M) env.M = $2dca407f99b477df$var$adapt(env.W1, env.W2, env.options.method);
});
function $2dca407f99b477df$var$defineCAT({ id: id, toCone_M: toCone_M, fromCone_M: fromCone_M }) {
    // Use id, toCone_M, fromCone_M like variables
    $2dca407f99b477df$var$CATs[id] = arguments[0];
}
function $2dca407f99b477df$var$adapt(W1, W2, id = "Bradford") {
    // adapt from a source whitepoint or illuminant W1
    // to a destination whitepoint or illuminant W2,
    // using the given chromatic adaptation transform (CAT)
    // debugger;
    let method = $2dca407f99b477df$var$CATs[id];
    let [ρs, γs, βs] = $2dca407f99b477df$var$multiplyMatrices(method.toCone_M, W1);
    let [ρd, γd, βd] = $2dca407f99b477df$var$multiplyMatrices(method.toCone_M, W2);
    // all practical illuminants have non-zero XYZ so no division by zero can occur below
    let scale = [
        [
            ρd / ρs,
            0,
            0
        ],
        [
            0,
            γd / γs,
            0
        ],
        [
            0,
            0,
            βd / βs
        ]
    ];
    let scaled_cone_M = $2dca407f99b477df$var$multiplyMatrices(scale, method.toCone_M);
    let adapt_M = $2dca407f99b477df$var$multiplyMatrices(method.fromCone_M, scaled_cone_M);
    return adapt_M;
}
$2dca407f99b477df$var$defineCAT({
    id: "von Kries",
    toCone_M: [
        [
            0.40024,
            0.7076,
            -0.08081
        ],
        [
            -0.2263,
            1.16532,
            0.0457
        ],
        [
            0.0,
            0.0,
            0.91822
        ]
    ],
    fromCone_M: [
        [
            1.8599364,
            -1.1293816,
            0.2198974
        ],
        [
            0.3611914,
            0.6388125,
            -0.0000064
        ],
        [
            0.0,
            0.0,
            1.0890636
        ]
    ]
});
$2dca407f99b477df$var$defineCAT({
    id: "Bradford",
    // Convert an array of XYZ values in the range 0.0 - 1.0
    // to cone fundamentals
    toCone_M: [
        [
            0.8951,
            0.2664,
            -0.1614
        ],
        [
            -0.7502,
            1.7135,
            0.0367
        ],
        [
            0.0389,
            -0.0685,
            1.0296
        ]
    ],
    // and back
    fromCone_M: [
        [
            0.9869929,
            -0.1470543,
            0.1599627
        ],
        [
            0.4323053,
            0.5183603,
            0.0492912
        ],
        [
            -0.0085287,
            0.0400428,
            0.9684867
        ]
    ]
});
$2dca407f99b477df$var$defineCAT({
    id: "CAT02",
    // with complete chromatic adaptation to W2, so D = 1.0
    toCone_M: [
        [
            0.7328,
            0.4296,
            -0.1624
        ],
        [
            -0.7036,
            1.6975,
            0.0061
        ],
        [
            0.003,
            0.0136,
            0.9834
        ]
    ],
    fromCone_M: [
        [
            1.0961238,
            -0.278869,
            0.1827452
        ],
        [
            0.454369,
            0.4735332,
            0.0720978
        ],
        [
            -0.0096276,
            -0.005698,
            1.0153256
        ]
    ]
});
$2dca407f99b477df$var$defineCAT({
    id: "CAT16",
    toCone_M: [
        [
            0.401288,
            0.650173,
            -0.051461
        ],
        [
            -0.250268,
            1.204414,
            0.045854
        ],
        [
            -0.002079,
            0.048952,
            0.953127
        ]
    ],
    // the extra precision is needed to avoid roundtripping errors
    fromCone_M: [
        [
            1.862067855087233,
            -1.011254630531685,
            1.491867754444518e-1
        ],
        [
            3.875265432361372e-1,
            6.214474419314753e-1,
            -0.008973985167612518
        ],
        [
            -0.01584149884933386,
            -0.03412293802851557,
            1.04996443687785
        ]
    ]
});
Object.assign($2dca407f99b477df$var$WHITES, {
    // whitepoint values from ASTM E308-01 with 10nm spacing, 1931 2 degree observer
    // all normalized to Y (luminance) = 1.00000
    // Illuminant A is a tungsten electric light, giving a very warm, orange light.
    A: [
        1.0985,
        1.0,
        0.35585
    ],
    // Illuminant C was an early approximation to daylight: illuminant A with a blue filter.
    C: [
        0.98074,
        1.0,
        1.18232
    ],
    // The daylight series of illuminants simulate natural daylight.
    // The color temperature (in degrees Kelvin/100) ranges from
    // cool, overcast daylight (D50) to bright, direct sunlight (D65).
    D55: [
        0.95682,
        1.0,
        0.92149
    ],
    D75: [
        0.94972,
        1.0,
        1.22638
    ],
    // Equal-energy illuminant, used in two-stage CAT16
    E: [
        1.0,
        1.0,
        1.0
    ],
    // The F series of illuminants represent fluorescent lights
    F2: [
        0.99186,
        1.0,
        0.67393
    ],
    F7: [
        0.95041,
        1.0,
        1.08747
    ],
    F11: [
        1.00962,
        1.0,
        0.6435
    ]
});
// The ACES whitepoint
// see TB-2018-001 Derivation of the ACES White Point CIE Chromaticity Coordinates
// also https://github.com/ampas/aces-dev/blob/master/documents/python/TB-2018-001/aces_wp.py
// Similar to D60
$2dca407f99b477df$var$WHITES.ACES = [
    0.32168 / 0.33767,
    1.0,
    1.0088251843515859
];
// convert an array of linear-light ACEScc values to CIE XYZ
const $2dca407f99b477df$var$toXYZ_M = [
    [
        0.6624541811085053,
        0.13400420645643313,
        0.1561876870049078
    ],
    [
        0.27222871678091454,
        0.6740817658111484,
        0.05368951740793705
    ],
    [
        -0.005574649490394108,
        0.004060733528982826,
        1.0103391003129971
    ]
];
const $2dca407f99b477df$var$fromXYZ_M = [
    [
        1.6410233796943257,
        -0.32480329418479,
        -0.23642469523761225
    ],
    [
        -0.6636628587229829,
        1.6153315916573379,
        0.016756347685530137
    ],
    [
        0.011721894328375376,
        -0.008284441996237409,
        0.9883948585390215
    ]
];
var $2dca407f99b477df$var$ACEScg = new $2dca407f99b477df$var$RGBColorSpace({
    id: "acescg",
    name: "ACEScg",
    // ACEScg – A scene-referred, linear-light encoding of ACES Data
    // https://docs.acescentral.com/specifications/acescg/
    // uses the AP1 primaries, see section 4.3.1 Color primaries
    coords: {
        r: {
            range: [
                0,
                65504
            ],
            name: "Red"
        },
        g: {
            range: [
                0,
                65504
            ],
            name: "Green"
        },
        b: {
            range: [
                0,
                65504
            ],
            name: "Blue"
        }
    },
    referred: "scene",
    white: $2dca407f99b477df$var$WHITES.ACES,
    toXYZ_M: $2dca407f99b477df$var$toXYZ_M,
    fromXYZ_M: $2dca407f99b477df$var$fromXYZ_M,
    formats: {
        color: {}
    }
});
// export default Color;
const $2dca407f99b477df$var$ε = 2 ** -16;
// the smallest value which, in the 32bit IEEE 754 float encoding,
// decodes as a non-negative value
const $2dca407f99b477df$var$ACES_min_nonzero = -0.35828683;
// brightest encoded value, decodes to 65504
const $2dca407f99b477df$var$ACES_cc_max = (Math.log2(65504) + 9.72) / 17.52; // 1.468
var $2dca407f99b477df$var$acescc = new $2dca407f99b477df$var$RGBColorSpace({
    id: "acescc",
    name: "ACEScc",
    // see S-2014-003 ACEScc – A Logarithmic Encoding of ACES Data
    // https://docs.acescentral.com/specifications/acescc/
    // uses the AP1 primaries, see section 4.3.1 Color primaries
    // Appendix A: "Very small ACES scene referred values below 7 1/4 stops
    // below 18% middle gray are encoded as negative ACEScc values.
    // These values should be preserved per the encoding in Section 4.4
    // so that all positive ACES values are maintained."
    coords: {
        r: {
            range: [
                $2dca407f99b477df$var$ACES_min_nonzero,
                $2dca407f99b477df$var$ACES_cc_max
            ],
            name: "Red"
        },
        g: {
            range: [
                $2dca407f99b477df$var$ACES_min_nonzero,
                $2dca407f99b477df$var$ACES_cc_max
            ],
            name: "Green"
        },
        b: {
            range: [
                $2dca407f99b477df$var$ACES_min_nonzero,
                $2dca407f99b477df$var$ACES_cc_max
            ],
            name: "Blue"
        }
    },
    referred: "scene",
    base: $2dca407f99b477df$var$ACEScg,
    // from section 4.4.2 Decoding Function
    toBase (RGB) {
        const low = (9.72 - 15) / 17.52; // -0.3014
        return RGB.map(function(val) {
            if (val <= low) return (2 ** (val * 17.52 - 9.72) - $2dca407f99b477df$var$ε) * 2; // very low values, below -0.3014
            else if (val < $2dca407f99b477df$var$ACES_cc_max) return 2 ** (val * 17.52 - 9.72);
            else // val >= ACES_cc_max
            return 65504;
        });
    },
    // Non-linear encoding function from S-2014-003, section 4.4.1 Encoding Function
    fromBase (RGB) {
        return RGB.map(function(val) {
            if (val <= 0) return (Math.log2($2dca407f99b477df$var$ε) + 9.72) / 17.52; // -0.3584
            else if (val < $2dca407f99b477df$var$ε) return (Math.log2($2dca407f99b477df$var$ε + val * 0.5) + 9.72) / 17.52;
            else // val >= ε
            return (Math.log2(val) + 9.72) / 17.52;
        });
    },
    // encoded media white (rgb 1,1,1) => linear  [ 222.861, 222.861, 222.861 ]
    // encoded media black (rgb 0,0,0) => linear [ 0.0011857, 0.0011857, 0.0011857]
    formats: {
        color: {}
    }
});
var $2dca407f99b477df$var$spaces = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    XYZ_D65: $2dca407f99b477df$var$XYZ_D65,
    XYZ_D50: $2dca407f99b477df$var$XYZ_D50,
    XYZ_ABS_D65: $2dca407f99b477df$var$XYZ_Abs_D65,
    Lab_D65: $2dca407f99b477df$var$lab_d65,
    Lab: $2dca407f99b477df$var$lab,
    LCH: $2dca407f99b477df$var$lch,
    sRGB_Linear: $2dca407f99b477df$var$sRGBLinear,
    sRGB: $2dca407f99b477df$var$sRGB,
    HSL: $2dca407f99b477df$var$HSL,
    HWB: $2dca407f99b477df$var$hwb,
    HSV: $2dca407f99b477df$var$HSV,
    P3_Linear: $2dca407f99b477df$var$P3Linear,
    P3: $2dca407f99b477df$var$P3,
    A98RGB_Linear: $2dca407f99b477df$var$A98Linear,
    A98RGB: $2dca407f99b477df$var$a98rgb,
    ProPhoto_Linear: $2dca407f99b477df$var$ProPhotoLinear,
    ProPhoto: $2dca407f99b477df$var$prophoto,
    REC_2020_Linear: $2dca407f99b477df$var$REC2020Linear,
    REC_2020: $2dca407f99b477df$var$REC2020,
    OKLab: $2dca407f99b477df$var$OKLab,
    OKLCH: $2dca407f99b477df$var$oklch,
    Jzazbz: $2dca407f99b477df$var$Jzazbz,
    JzCzHz: $2dca407f99b477df$var$jzczhz,
    ICTCP: $2dca407f99b477df$var$ictcp,
    REC_2100_PQ: $2dca407f99b477df$var$rec2100Pq,
    REC_2100_HLG: $2dca407f99b477df$var$rec2100Hlg,
    ACEScg: $2dca407f99b477df$var$ACEScg,
    ACEScc: $2dca407f99b477df$var$acescc
});
/**
 * Class that represents a color
 */ class $2dca407f99b477df$export$2e2bcd8739ae039 {
    /**
   * Creates an instance of Color.
   * Signatures:
   * - `new Color(stringToParse)`
   * - `new Color(otherColor)`
   * - `new Color({space, coords, alpha})`
   * - `new Color(space, coords, alpha)`
   * - `new Color(spaceId, coords, alpha)`
   */ constructor(...args){
        let color;
        if (args.length === 1) color = $2dca407f99b477df$var$getColor(args[0]);
        let space, coords, alpha;
        if (color) {
            space = color.space || color.spaceId;
            coords = color.coords;
            alpha = color.alpha;
        } else // default signature new Color(ColorSpace, array [, alpha])
        [space, coords, alpha] = args;
        this.#space = $2dca407f99b477df$var$ColorSpace.get(space);
        this.coords = coords ? coords.slice() : [
            0,
            0,
            0
        ];
        this.alpha = alpha < 1 ? alpha : 1; // this also deals with NaN etc
        // Convert "NaN" to NaN
        for(let i = 0; i < this.coords.length; i++)if (this.coords[i] === "NaN") this.coords[i] = NaN;
        // Define getters and setters for each coordinate
        for(let id in this.#space.coords)Object.defineProperty(this, id, {
            get: ()=>this.get(id),
            set: (value1)=>this.set(id, value1)
        });
    }
    #space;
    get space() {
        return this.#space;
    }
    get spaceId() {
        return this.#space.id;
    }
    clone() {
        return new $2dca407f99b477df$export$2e2bcd8739ae039(this.space, this.coords, this.alpha);
    }
    toJSON() {
        return {
            spaceId: this.spaceId,
            coords: this.coords,
            alpha: this.alpha
        };
    }
    display(...args) {
        let ret = $2dca407f99b477df$var$display(this, ...args);
        // Convert color object to Color instance
        ret.color = new $2dca407f99b477df$export$2e2bcd8739ae039(ret.color);
        return ret;
    }
    /**
   * Get a color from the argument passed
   * Basically gets us the same result as new Color(color) but doesn't clone an existing color object
   */ static get(color, ...args) {
        if (color instanceof $2dca407f99b477df$export$2e2bcd8739ae039) return color;
        return new $2dca407f99b477df$export$2e2bcd8739ae039(color, ...args);
    }
    static defineFunction(name, code, o = code) {
        if (arguments.length === 1) [name, code, o] = [
            arguments[0].name,
            arguments[0],
            arguments[0]
        ];
        let { instance: instance = true, returns: returns } = o;
        let func = function(...args) {
            let ret = code(...args);
            if (returns === "color") ret = $2dca407f99b477df$export$2e2bcd8739ae039.get(ret);
            else if (returns === "function<color>") {
                let f = ret;
                ret = function(...args) {
                    let ret = f(...args);
                    return $2dca407f99b477df$export$2e2bcd8739ae039.get(ret);
                };
                // Copy any function metadata
                Object.assign(ret, f);
            } else if (returns === "array<color>") ret = ret.map((c)=>$2dca407f99b477df$export$2e2bcd8739ae039.get(c));
            return ret;
        };
        if (!(name in $2dca407f99b477df$export$2e2bcd8739ae039)) $2dca407f99b477df$export$2e2bcd8739ae039[name] = func;
        if (instance) $2dca407f99b477df$export$2e2bcd8739ae039.prototype[name] = function(...args) {
            return func(this, ...args);
        };
    }
    static defineFunctions(o) {
        for(let name in o)$2dca407f99b477df$export$2e2bcd8739ae039.defineFunction(name, o[name], o[name]);
    }
    static extend(exports) {
        if (exports.register) exports.register($2dca407f99b477df$export$2e2bcd8739ae039);
        else if (exports.default) $2dca407f99b477df$export$2e2bcd8739ae039.defineFunction(exports.default.name, exports.default);
        else if (typeof exports === "function") $2dca407f99b477df$export$2e2bcd8739ae039.defineFunction(exports);
        else // No register method, just add the module's functions
        for(let name in exports)$2dca407f99b477df$export$2e2bcd8739ae039.defineFunction(name, exports[name]);
    }
}
$2dca407f99b477df$export$2e2bcd8739ae039.defineFunctions({
    get: $2dca407f99b477df$var$get,
    getAll: $2dca407f99b477df$var$getAll,
    set: $2dca407f99b477df$var$set$1,
    setAll: $2dca407f99b477df$var$setAll,
    to: $2dca407f99b477df$var$to,
    equals: $2dca407f99b477df$var$equals,
    inGamut: $2dca407f99b477df$var$inGamut,
    toGamut: $2dca407f99b477df$var$toGamut,
    distance: $2dca407f99b477df$var$distance,
    toString: $2dca407f99b477df$var$serialize
});
Object.assign($2dca407f99b477df$export$2e2bcd8739ae039, {
    util: $2dca407f99b477df$var$util,
    hooks: $2dca407f99b477df$var$hooks,
    WHITES: $2dca407f99b477df$var$WHITES,
    Space: $2dca407f99b477df$var$ColorSpace,
    spaces: $2dca407f99b477df$var$ColorSpace.registry,
    parse: $2dca407f99b477df$var$parse,
    defaults: // Global defaults one may want to configure
    $2dca407f99b477df$var$defaults
});
for (let key of Object.keys($2dca407f99b477df$var$spaces))$2dca407f99b477df$var$ColorSpace.register($2dca407f99b477df$var$spaces[key]);
/**
 * This plugin defines getters and setters for color[spaceId]
 * e.g. color.lch on *any* color gives us the lch coords
 */ // Add space accessors to existing color spaces
for(let id in $2dca407f99b477df$var$ColorSpace.registry)$2dca407f99b477df$var$addSpaceAccessors(id, $2dca407f99b477df$var$ColorSpace.registry[id]);
// Add space accessors to color spaces not yet created
$2dca407f99b477df$var$hooks.add("colorspace-init-end", $2dca407f99b477df$var$addSpaceAccessors);
function $2dca407f99b477df$var$addSpaceAccessors(id, space) {
    // Coordinates can be looked up by both id and name
    Object.keys(space.coords);
    Object.values(space.coords).map((c)=>c.name);
    let propId = id.replace(/-/g, "_");
    Object.defineProperty($2dca407f99b477df$export$2e2bcd8739ae039.prototype, propId, {
        // Convert coords to coords in another colorspace and return them
        // Source colorspace: this.spaceId
        // Target colorspace: id
        get () {
            let ret = this.getAll(id);
            if (typeof Proxy === "undefined") // If proxies are not supported, just return a static array
            return ret;
            // Enable color.spaceId.coordName syntax
            return new Proxy(ret, {
                has: (obj, property)=>{
                    try {
                        $2dca407f99b477df$var$ColorSpace.resolveCoord([
                            space,
                            property
                        ]);
                        return true;
                    } catch (e) {}
                    return Reflect.has(obj, property);
                },
                get: (obj, property, receiver)=>{
                    if (property && typeof property !== "symbol" && !(property in obj)) {
                        let { index: index } = $2dca407f99b477df$var$ColorSpace.resolveCoord([
                            space,
                            property
                        ]);
                        if (index >= 0) return obj[index];
                    }
                    return Reflect.get(obj, property, receiver);
                },
                set: (obj, property, value1, receiver)=>{
                    if (property && typeof property !== "symbol" && !(property in obj) || property >= 0) {
                        let { index: index } = $2dca407f99b477df$var$ColorSpace.resolveCoord([
                            space,
                            property
                        ]);
                        if (index >= 0) {
                            obj[index] = value1;
                            // Update color.coords
                            this.setAll(id, obj);
                            return true;
                        }
                    }
                    return Reflect.set(obj, property, value1, receiver);
                }
            });
        },
        // Convert coords in another colorspace to internal coords and set them
        // Target colorspace: this.spaceId
        // Source colorspace: id
        set (coords) {
            this.setAll(id, coords);
        },
        configurable: true,
        enumerable: true
    });
}
// Import all modules of Color.js
$2dca407f99b477df$export$2e2bcd8739ae039.extend($2dca407f99b477df$var$deltaEMethods);
$2dca407f99b477df$export$2e2bcd8739ae039.extend($2dca407f99b477df$var$deltaE$1);
$2dca407f99b477df$export$2e2bcd8739ae039.extend($2dca407f99b477df$var$variations);
$2dca407f99b477df$export$2e2bcd8739ae039.extend($2dca407f99b477df$var$contrast);
$2dca407f99b477df$export$2e2bcd8739ae039.extend($2dca407f99b477df$var$chromaticity);
$2dca407f99b477df$export$2e2bcd8739ae039.extend($2dca407f99b477df$var$luminance);
$2dca407f99b477df$export$2e2bcd8739ae039.extend($2dca407f99b477df$var$interpolation);
$2dca407f99b477df$export$2e2bcd8739ae039.extend($2dca407f99b477df$var$contrastMethods);



function $3180f13c9e24a345$export$a33d8ee3eb2c1a9b(control) {
    const formGroup = control.closest(".form-group");
    formGroup.find(".mass-edit-checkbox input").prop("checked", true).trigger("change");
    formGroup.find(".mass-edit-randomize").addClass("active");
}
function $3180f13c9e24a345$export$6d9a46257e99a3f6(control, configApp) {
    const formGroup = control.closest(".form-group");
    let allRandomizedRemoved = true;
    if (configApp) formGroup.find("[name]").each(function() {
        if (allRandomizedRemoved) allRandomizedRemoved = !Boolean(configApp.randomizeFields[this.name]);
    });
    if (allRandomizedRemoved) {
        formGroup.find(".mass-edit-checkbox input").prop("checked", false).trigger("change");
        formGroup.find(".mass-edit-randomize").removeClass("active");
    }
}
function $3180f13c9e24a345$export$2ee69c6850ef1bab(form, fields) {
    if (!fields) return;
    for (const key of Object.keys(fields))$3180f13c9e24a345$export$a33d8ee3eb2c1a9b(form.find(`[name="${key}"]`));
}
async function $3180f13c9e24a345$export$4bafa436c0fa0cbb(updates, objects, randomizeFields) {
    // See if any field is to be randomized
    if (!randomizeFields || foundry.utils.isEmpty(randomizeFields)) return;
    let requiresCoordRandomization = false;
    for(let i = 0; i < updates.length; i++){
        const update = updates[i];
        for (const field of Object.keys(update))if (field in randomizeFields) {
            const obj = randomizeFields[field];
            if (obj.type === "select") update[field] = obj.selection[Math.floor(Math.random() * obj.selection.length)];
            else if (obj.type === "number") {
                if (obj.step === "any") obj.step = 1; // default to integer 1 just to avoid very large decimals
                else obj.step = Number(obj.step);
                if (obj.method === "interpolate") {
                    const stepsInRange = (obj.max - obj.min) / obj.step + 1;
                    update[field] = i % stepsInRange * obj.step + obj.min;
                } else if (obj.method === "interpolateReverse") {
                    const stepsInRange = (obj.max - obj.min) / obj.step;
                    update[field] = (stepsInRange - i % (stepsInRange + 1)) * obj.step + obj.min;
                } else {
                    const stepsInRange = (obj.max - obj.min + (Number.isInteger(obj.step) ? 1 : 0)) / obj.step;
                    update[field] = Math.floor(Math.random() * stepsInRange) * obj.step + obj.min;
                }
            } else if (obj.type === "boolean") update[field] = Math.random() < 0.5;
            else if (obj.type === "color") {
                // Convert to new format if needed
                if (obj.color1) obj.colors = [
                    {
                        hex: obj.color1,
                        offset: 0
                    },
                    {
                        hex: obj.color2,
                        offset: 100
                    }
                ];
                // If space is discrete we simple choose a color, no blending required
                if (obj.space === "discrete") {
                    if (obj.method === "interpolate") update[field] = obj.colors[i % obj.colors.length].hex;
                    else if (obj.method === "interpolateReverse") update[field] = obj.colors[obj.colors.length - 1 - i % obj.colors.length].hex;
                    else update[field] = obj.colors[Math.floor(Math.random() * obj.colors.length)].hex;
                    continue;
                }
                let colors = obj.colors.map((c)=>c);
                if (colors[0].offset > 0) colors.unshift({
                    hex: colors[0].hex,
                    offset: 0
                });
                if (colors[colors.length - 1].offset < 100) colors.push({
                    hex: colors[colors.length - 1].hex,
                    offset: 100
                });
                // Calculate random offset
                let rOffset;
                if (obj.method === "interpolate") rOffset = 1 - (i + 1) / updates.length;
                else if (obj.method === "interpolateReverse") rOffset = (i + 1) / updates.length;
                else rOffset = Math.random();
                rOffset *= 100;
                // Find the two colors the random offset falls between
                let j = 0;
                while(j < colors.length - 1 && colors[j + 1].offset < rOffset)j++;
                let color1, color2;
                if (j === colors.length - 1) {
                    color1 = colors[j - 1];
                    color2 = colors[j];
                } else {
                    color1 = colors[j];
                    color2 = colors[j + 1];
                }
                // Normalize the random offset
                let rnOffset = rOffset - color1.offset;
                rnOffset = rnOffset / (color2.offset - color1.offset);
                // Create a Color.js range
                color1 = new (0, $2dca407f99b477df$export$2e2bcd8739ae039)(color1.hex);
                color2 = new (0, $2dca407f99b477df$export$2e2bcd8739ae039)(color2.hex);
                const space = obj.space || "srgb";
                const hue = obj.hue || "shorter";
                let range = color1.range(color2, {
                    space: space,
                    hue: hue,
                    outputSpace: "srgb"
                });
                // Pick a color from range using normalized random offset
                let rgb3 = range(rnOffset);
                let hexColor = rgb3.toString({
                    format: "hex"
                });
                if (hexColor.length < 7) // 3 char hex, duplicate chars
                hexColor = "#" + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2] + hexColor[3] + hexColor[3];
                update[field] = hexColor;
            } else if (obj.type === "image") {
                if (obj.method === "sequential") update[field] = obj.images[i % obj.images.length];
                else update[field] = obj.images[Math.floor(Math.random() * obj.images.length)];
                if (obj.maintainAspect) {
                    const width = objects?.[i]?.width ?? update.width;
                    const height = objects?.[i]?.height ?? update.height;
                    if (height != null && width != null) try {
                        const tex = await loadTexture(update[field]);
                        if (tex) {
                            const tileRatio = width / height;
                            const texRatio = tex.width / tex.height;
                            if (texRatio !== tileRatio) {
                                if (texRatio > tileRatio) {
                                    update["texture.scaleX"] = 1;
                                    update["texture.scaleY"] = tileRatio;
                                } else {
                                    update["texture.scaleX"] = height / width;
                                    update["texture.scaleY"] = 1;
                                }
                            }
                        }
                    } catch (e) {}
                }
            } else if (obj.type === "text") {
                if (obj.method === "findAndReplace" || obj.method === "findAndReplaceRegex") {
                    if (objects) {
                        const data = foundry.utils.flattenObject((0, $32e43d7a62aba58c$export$7a171f172be0782e)(objects[i]).toObject());
                        if (!data[field] && !obj.find) update[field] = obj.replace;
                        else if (data[field]) {
                            // special handling for Tagger tags
                            if (field === "flags.tagger.tags") data[field] = data[field].join(",");
                            if (obj.method === "findAndReplaceRegex") update[field] = (0, $32e43d7a62aba58c$export$aef0873d63458016)(obj.find, obj.replace, data[field]);
                            else update[field] = (0, $32e43d7a62aba58c$export$79d744e95e10dc09)(obj.find, obj.replace, data[field]);
                        }
                    }
                } else if (obj.method === "unique") {
                    if (!obj.shuffled) {
                        $3180f13c9e24a345$var$shuffleArray(obj.strings);
                        obj.shuffled = true;
                        obj.i = -1;
                    }
                    obj.i++;
                    update[field] = obj.strings[obj.i % obj.strings.length];
                } else update[field] = obj.strings[Math.floor(Math.random() * obj.strings.length)];
            } else if (obj.type === "coordinate") requiresCoordRandomization = true;
        }
    }
    if (requiresCoordRandomization) {
        let coordCtrl;
        // Sort placeables based on size
        let pUpdates = [];
        for(let i = 0; i < objects.length; i++)pUpdates.push({
            p: objects[i],
            update: updates[i]
        });
        pUpdates.sort((a, b)=>(b.p.w ?? b.p.width ?? 0) + (b.p.h ?? b.p.height ?? 0) - (a.p.w ?? a.p.width ?? 0) - (a.p.h ?? a.p.height ?? 0));
        for (const pUpdate of pUpdates){
            const obj = randomizeFields.x ?? randomizeFields.y;
            if (obj.method === "noOverlap") {
                if (!coordCtrl) coordCtrl = {
                    freeId: 0,
                    boundingBox: obj.boundingBox,
                    freeRectangles: {
                        0: obj.boundingBox
                    },
                    stepX: obj.stepX,
                    stepY: obj.stepY
                };
                const [x, y] = $3180f13c9e24a345$var$randomPlace(pUpdate.p, coordCtrl);
                pUpdate.update.x = x;
                pUpdate.update.y = y;
            }
        }
    }
}
function $3180f13c9e24a345$export$527c3bc4477c9048(num, step) {
    if (num % step <= step / 2) return num - num % step;
    return num - num % step + step;
}
/**
 * Generates a random number within the given range and step increment
 * @param {*} min
 * @param {*} max
 * @param {*} step
 * @returns
 */ function $3180f13c9e24a345$var$randomNum(min, max, step) {
    if (step === "any") step = 1; // default to integer 1 just to avoid very large decimals
    else step = Number(step);
    const stepsInRange = (max - min) / step;
    return Math.floor(Math.random() * (stepsInRange + (Number.isInteger(step) ? 1 : 0))) * step + min;
}
/**
 * In-place random shuffle of an array
 * @param {*} array
 * @returns
 */ function $3180f13c9e24a345$var$shuffleArray(array) {
    var i = array.length, j = 0, temp;
    while(i--){
        j = Math.floor(Math.random() * (i + 1));
        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
/* ================================
 * === Coordinate Randomization ==
 * =============================== */ function $3180f13c9e24a345$var$randomPlace(placeable, ctrl) {
    const width = $3180f13c9e24a345$export$527c3bc4477c9048(placeable.w ?? placeable.width, ctrl.stepX);
    const height = $3180f13c9e24a345$export$527c3bc4477c9048(placeable.h ?? placeable.height, ctrl.stepY);
    const rec = {
        x: 0,
        y: 0,
        width: width,
        height: height
    };
    const freeRectangles = ctrl.freeRectangles;
    // get all free rectangles that can contain rec
    let fittingRecs = Object.keys(freeRectangles).filter((id)=>$3180f13c9e24a345$var$_canFit(freeRectangles[id], rec));
    // if there are no fitting places left, then place it randomly anywhere within the bounding box
    if (fittingRecs.length) {
        // Pick a random free rectangle and choose a random location within so that it fits rec
        const i = fittingRecs[Math.floor(Math.random() * fittingRecs.length)];
        rec.x = $3180f13c9e24a345$var$randomNum(freeRectangles[i].x, Math.max(freeRectangles[i].x + freeRectangles[i].width - rec.width, 0), ctrl.stepX);
        rec.y = $3180f13c9e24a345$var$randomNum(freeRectangles[i].y, Math.max(freeRectangles[i].y + freeRectangles[i].height - rec.height, 0), ctrl.stepY);
    } else {
        // if there are no fitting places left, then place it randomly anywhere within the bounding box
        rec.x = $3180f13c9e24a345$var$randomNum(ctrl.boundingBox.x, Math.max(ctrl.boundingBox.x + ctrl.boundingBox.width - rec.width, ctrl.boundingBox.x), ctrl.stepX);
        rec.y = $3180f13c9e24a345$var$randomNum(ctrl.boundingBox.y, Math.max(ctrl.boundingBox.y + ctrl.boundingBox.height - rec.height, ctrl.boundingBox.y), ctrl.stepY);
    }
    // Find all free rectangles that this spot overlaps
    let overlaps = Object.keys(freeRectangles).filter((id)=>$3180f13c9e24a345$var$_intersectRec(freeRectangles[id], rec));
    for (const id of overlaps){
        const overlap = freeRectangles[id];
        // remove original rectangle
        delete freeRectangles[id];
        // left split
        if (overlap.x < rec.x) $3180f13c9e24a345$var$_addAndMergeFreeRectangle(freeRectangles, {
            x: overlap.x,
            y: overlap.y,
            width: rec.x - overlap.x,
            height: overlap.height
        }, ctrl);
        // right split
        if (overlap.x + overlap.width > rec.x + rec.width) $3180f13c9e24a345$var$_addAndMergeFreeRectangle(freeRectangles, {
            x: rec.x + rec.width,
            y: overlap.y,
            width: overlap.x + overlap.width - (rec.x + rec.width),
            height: overlap.height
        }, ctrl);
        // top split
        if (overlap.y < rec.y) $3180f13c9e24a345$var$_addAndMergeFreeRectangle(freeRectangles, {
            x: overlap.x,
            y: overlap.y,
            width: overlap.width,
            height: rec.y - overlap.y
        }, ctrl);
        // bottom split
        if (overlap.y + overlap.height > rec.y + rec.height) $3180f13c9e24a345$var$_addAndMergeFreeRectangle(freeRectangles, {
            x: overlap.x,
            y: rec.y + rec.height,
            width: overlap.width,
            height: overlap.y + overlap.height - (rec.y + rec.height)
        }, ctrl);
    }
    return [
        rec.x,
        rec.y
    ];
}
/**
 * Checks if rectangle rec2 can fit within rectangle rec1
 * @param {*} rec1
 * @param {*} rec2
 * @returns
 */ function $3180f13c9e24a345$var$_canFit(rec1, rec2) {
    return rec2.width <= rec1.width && rec2.height <= rec1.height;
}
/**
 * Checks whether rectangle rec1 and rectangle rec2 intersect
 * @param {*} rec1
 * @param {*} rec2
 * @returns
 */ function $3180f13c9e24a345$var$_intersectRec(rec1, rec2) {
    if (rec1.x < rec2.x + rec2.width && rec2.x < rec1.x + rec1.width && rec1.y < rec2.y + rec2.height) return rec2.y < rec1.y + rec1.height;
    else return false;
}
/**
 * Check if rectangle rec1 fully contains rectangle rec2
 * @param {*} rec1
 * @param {*} rec
 * @returns
 */ function $3180f13c9e24a345$var$_fullyContains(rec1, rec2) {
    return rec1.x <= rec2.x && rec1.x + rec1.width >= rec2.x + rec2.width && rec1.y <= rec2.y && rec1.y + rec1.height >= rec2.y + rec2.height;
}
/**
 *
 * @param {*} freeRectangles
 * @param {*} rec
 * @param {*} ctrl
 * @returns
 */ function $3180f13c9e24a345$var$_addAndMergeFreeRectangle(freeRectangles, rec, ctrl) {
    const keys = Object.keys(freeRectangles);
    for (const key of keys){
        if ($3180f13c9e24a345$var$_fullyContains(freeRectangles[key], rec)) return;
    }
    ctrl.freeId++;
    freeRectangles[ctrl.freeId] = rec;
}




class $2693f7af118c914b$export$44fd664bcca5b6fb {
    constructor(slider, colors, { space: space = null, hue: hue = null } = {}){
        this.slider = slider;
        this.colors = colors;
        this.space = space;
        this.hue = hue;
        this.min = 0;
        this.max = 100;
        this._init();
    }
    _init() {
        (parcelRequire("kn5Qf")).then((imp)=>{
            this._createSlider();
        // // Respond better to DF Architect Color Picker
        // html.on('focusout', '.df-arch-colourpicker', (e) => {
        //   clearTimeout(inputTimer);
        //   inputTimer = setTimeout(() => this.update(), 500);
        // });
        });
    }
    update() {
        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout(()=>this._updateSlider(), 500);
    }
    _updateSlider(event, ui) {
        if (ui) this.colors[ui.handleIndex].offset = ui.value;
        this.slider.find(".slide-back").remove();
        let lVal = this.max + 1;
        let lHandle;
        let lIndex;
        let handles = this.slider.find("span").toArray();
        for(let i = 0; i < handles.length; i++){
            let sliderVal = this.slider.slider("values", i);
            this.colors[i].offset = sliderVal;
            if (sliderVal < lVal) {
                lHandle = $(this);
                lVal = sliderVal;
                lIndex = i;
            }
            $(handles[i]).css("background", this.colors[i].hex);
            if (sliderVal !== this.max) {
                let [stripColor, stripColorVal] = this._getNextColor(this.colors[i].hex, sliderVal);
                this._appendStrip(this._genGradient(stripColor, this.colors[i].hex), `${stripColorVal - sliderVal}%`, `${sliderVal}%`);
            }
        }
        if (lVal !== this.min) this._appendStrip(this._genGradient(this.colors[lIndex].hex, this.colors[lIndex].hex), `${this.slider.slider("values", lIndex)}%`, "0%");
    }
    _genGradient(color1, color2) {
        const space = this.space?.val() || "lch";
        if (space === "discrete") return "rgba(0, 0, 0, 0)";
        const hue = this.hue?.val() || "shorter";
        let r = (0, $2dca407f99b477df$export$2e2bcd8739ae039).range(color2, color1, {
            space: space,
            hue: hue
        });
        let stops = (0, $2dca407f99b477df$export$2e2bcd8739ae039).steps(r, {
            steps: 5,
            maxDeltaE: 3
        });
        return `linear-gradient(to right, ${stops.map((c)=>c.display()).join(", ")})`;
    }
    _appendStrip(color, width, offset) {
        this.slider.append($("<div></div>").addClass("slide-back").width(width).css("background", color).css("left", offset));
    }
    _getNextColor(currColor, val) {
        let nextColor = currColor;
        let nextColorVal = this.max + 1;
        for(let i = 0; i < this.colors.length; i++){
            let cVal = this.slider.slider("values", i);
            if (cVal > val && cVal < nextColorVal) {
                nextColor = this.colors[i].hex;
                nextColorVal = cVal;
            }
        }
        return [
            nextColor,
            Math.min(nextColorVal, this.max)
        ];
    }
    _onCreateSlider() {
        let handles = this.slider.find("span").toArray();
        for(let i = 0; i < handles.length; i++){
            let cPicker = $(`<input type="color" value="${this.colors[i].hex}" style='opacity:0;width:100%;height:100%;position:absolute;pointer-events:none;'>`);
            const handle = $(handles[i]);
            handle.attr("handleindex", i);
            handle.append(cPicker);
            handle.on("click", (event)=>{
                if (event.detail === 2) {
                    event.preventDefault();
                    cPicker.trigger("click");
                }
            });
            cPicker.on("input", (event)=>{
                this.colors[i].hex = cPicker.val();
                this.update();
            });
            handle.on("contextmenu", (event)=>{
                event.preventDefault();
                event.stopPropagation();
                if (this.colors.length > 2) {
                    let index = event.target.getAttribute("handleindex");
                    if (index) {
                        this.colors.splice(index, 1);
                        this._createSlider();
                    }
                }
            });
        }
        this.slider.on("contextmenu", (event)=>{
            let offset = this.slider.offset();
            var x = event.clientX - offset.left; //x position within the element.
            let percentOffset = Math.round(x / this.slider.width() * 100);
            if (!this._percentExists(percentOffset)) {
                let [col, _] = this._getNextColor(null, percentOffset);
                if (!col) col = "#ff0000";
                this.colors.push({
                    hex: col,
                    offset: percentOffset
                });
                this._createSlider();
            }
        });
        this.update();
    }
    _percentExists(percent) {
        return this.colors.some((c)=>c.offset === percent);
    }
    _createSlider = ()=>{
        if (this.slider.slider("instance")) this.slider.slider("destroy");
        this.slider.slider({
            change: (event, ui)=>this.update(event, ui),
            create: ()=>this._onCreateSlider(),
            min: this.min,
            max: this.max,
            values: this.colors.map((c)=>c.offset)
        });
    };
}


const $9d9c8b96086115aa$export$37e829338e648c57 = false;
class $9d9c8b96086115aa$export$2e2bcd8739ae039 extends FormApplication {
    constructor(title, control, configApp, options){
        let height = undefined;
        let width = 410;
        if (options.textForm) width = 465;
        else if (options.selectForm) height = 210;
        else if (options.imageForm) width = 455;
        else if (options.colorForm) {
            height = 340;
            width = 650;
        }
        super({}, {
            title: title,
            width: width,
            height: height
        });
        this.configuration = options;
        this.control = control;
        this.configApp = configApp;
        this.fieldName = control.attr("name");
        if (configApp.randomizeFields && configApp.randomizeFields[this.fieldName]) {
            if (options.rangeForm) {
                let ctrl = foundry.utils.deepClone(configApp.randomizeFields[this.fieldName]);
                ctrl.minVal = ctrl.min;
                ctrl.maxVal = ctrl.max;
                delete ctrl.min;
                delete ctrl.max;
                foundry.utils.mergeObject(this.configuration, ctrl);
            } else if (options.colorForm) {
                let ctrl = foundry.utils.deepClone(configApp.randomizeFields[this.fieldName]);
                if (ctrl.color1) {
                    ctrl.colors = [
                        {
                            hex: ctrl.color1,
                            offset: 0
                        },
                        {
                            hex: ctrl.color2,
                            offset: 100
                        }
                    ];
                    delete ctrl.color1;
                    delete ctrl.color2;
                }
                foundry.utils.mergeObject(this.configuration, ctrl);
            } else foundry.utils.mergeObject(this.configuration, configApp.randomizeFields[this.fieldName]);
            this.configuration.existing = true;
        }
    }
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "mass-edit-randomizer-form",
            classes: [
                "sheet"
            ],
            template: `modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/randomizerForm.html`,
            resizable: true,
            minimizable: false
        });
    }
    get id() {
        return `mass-edit-randomizer-${this.fieldName}`;
    }
    async getData(options) {
        const data = super.getData(options);
        foundry.utils.mergeObject(data, this.configuration);
        if (data.step != null) {
            if (data.step === "any" || data.step === "") data.step = 0.1;
        }
        data.tokenVariantsActive = game.modules.get("token-variants")?.active;
        data.fieldName = this.fieldName;
        data.title = this.title;
        data.isTile = "Tile" === this.configApp.docName;
        // Assign default values for some specific fields
        if (this.configuration.numberForm && !this.configuration.existing) {
            if ([
                "rotation",
                "sightAngle",
                "sight.angle",
                "light.angle",
                "config.angle",
                "flags.advanced-drawing-tools.fillStyle.transform.rotation"
            ].includes(this.fieldName)) {
                data.min = 0;
                data.max = 360;
            } else if ([
                "dimSight",
                "brightSight",
                "light.dim",
                "light.bright",
                "config.dim",
                "config.bright"
            ].includes(this.fieldName)) data.min = 0;
        }
        if (this.configuration.textForm) {
            // Fix for generators in v10
            if (!String.prototype.capitalize) String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1);
            };
            data.generators = {};
            const addGeneratorGroup = function(group, generators) {
                data.generators[group] = Object.keys(generators).map((k)=>{
                    return {
                        func: k,
                        label: k.substring(3, k.length).replace(/([A-Z])/g, " $1").trim()
                    };
                });
            };
            addGeneratorGroup("Fantasy", (0, $7d7c02f63df4accb$export$7dbe142e1789c057));
            addGeneratorGroup("Species", (0, $526640c45cded75e$export$3e8081ff43ae4e53));
            addGeneratorGroup("Groups", (0, $4f0d8d96ef10a4e8$export$75a83ee8c92008b8));
            addGeneratorGroup("Taverns", (0, $6279a85e34ff46c6$export$2cb59683800e8ab7));
            if (this.configuration.strings) data.strings = this.configuration.strings.join("\n");
            data.duplicates = this.configuration.method === "random";
            data.find = this.configuration.find ?? this.configuration.current;
            data.replace = this.configuration.replace ?? this.configuration.current;
        }
        if (this.configuration.imageForm) {
            if (this.configuration.images) data.images = this.configuration.images.join("\n");
            data.find = this.configuration.find ?? this.configuration.current;
            data.replace = this.configuration.replace ?? this.configuration.current;
            data.maintainAspect = this.configuration.maintainAspect;
        }
        if (this.configuration.rangeForm && !this.configuration.existing) {
            data.minVal = this.configuration.current;
            data.maxVal = this.configuration.current;
        }
        if (this.configuration.coordinateForm) {
            data.minX = this.configuration.x;
            data.maxX = this.configuration.x;
            data.minY = this.configuration.y;
            data.maxY = this.configuration.y;
            data.stepY = this.configuration.stepY ?? this.configuration.step;
            data.stepX = this.configuration.stepX ?? this.configuration.step;
            if (this.configuration.boundingBox) {
                let box = this.configuration.boundingBox;
                data.minX = box.x;
                data.maxX = box.x + box.width;
                data.minY = box.y;
                data.maxY = box.y + box.height;
            }
        }
        if (this.configuration.selectForm) this.configuration.options.forEach((opt)=>{
            opt.selected = !this.configuration.selection || this.configuration.selection.find((sel)=>sel == opt.value) != null;
        });
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        const docName = this.configApp.docName;
        $(html).find(".folder-picker").click(()=>{
            new FilePicker({
                type: "folder",
                callback: async (path, fp)=>{
                    let files = [];
                    if ($(html).find(".subfolders").is(":checked")) files = await (0, $32e43d7a62aba58c$export$80540dd209b86671)(path, fp.activeSource, fp.result.bucket);
                    else if (fp.result?.files.length) files = fp.result.files;
                    const images_ta = $(html).find(".images");
                    images_ta.val(images_ta.val().trim() + "\n" + files.filter((f)=>(0, $32e43d7a62aba58c$export$fb85bc5d6d9ef19b)(f) || (0, $32e43d7a62aba58c$export$ac5608bbe92d6fdc)(f)).join("\n"));
                }
            }).render(true);
        });
        html.find(".token-variants").click((ev)=>{
            if (game.modules.get("token-variants")?.active && docName) {
                let type = docName;
                if (type === "Actor") type = "Portrait";
                else if (type === "MeasuredTemplate") type = "Tile";
                game.modules.get("token-variants").api.showArtSelect("image", {
                    searchType: type,
                    multipleSelection: true,
                    callback: (results)=>{
                        if (!Array.isArray(results)) results = [
                            results
                        ];
                        const images_ta = $(html).find(".images");
                        images_ta.val(images_ta.val().trim() + "\n" + results.filter((f)=>(0, $32e43d7a62aba58c$export$fb85bc5d6d9ef19b)(f) || (0, $32e43d7a62aba58c$export$ac5608bbe92d6fdc)(f)).join("\n"));
                    }
                });
            }
        });
        $(html).find(".generate").click(()=>{
            const generator = $(html).find(".generator").val();
            for (const group of [
                (0, $7d7c02f63df4accb$export$7dbe142e1789c057),
                (0, $526640c45cded75e$export$3e8081ff43ae4e53),
                (0, $4f0d8d96ef10a4e8$export$75a83ee8c92008b8),
                (0, $6279a85e34ff46c6$export$2cb59683800e8ab7)
            ])if (generator in group) {
                const names = [];
                for(let i = 0; i < 20; i++)names.push(group[generator]());
                $(html).find(".strings").val($(html).find(".strings").val() + "\n" + names.join("\n"));
                break;
            }
        });
        $(html).find(".pickBounds").click(this._onPickBounds.bind(this));
        $(html).find(".snapToGrid").click(this._onSnapToGrid.bind(this));
        // Color gradient preview
        $(html).on("input", 'input[type="color"]', (e)=>{
            $(e.target).siblings(".color").val(e.target.value).trigger("input");
        });
        if (this.configuration.textForm) {
            $(html).on("input", '[name="method"]', (e)=>{
                if (e.target.value === "findAndReplace" || e.target.value === "findAndReplaceRegex") {
                    html.find(".string-list").hide();
                    html.find(".find-and-replace").show();
                } else {
                    html.find(".string-list").show();
                    html.find(".find-and-replace").hide();
                }
            });
            $(html).find('[name="method"]').trigger("input");
        } else if (this.configuration.imageForm) {
            $(html).on("input", '[name="method"]', (e)=>{
                if (e.target.value === "findAndReplace" || e.target.value === "findAndReplaceRegex") {
                    html.find(".image-controls").hide();
                    html.find(".find-and-replace").show();
                } else {
                    html.find(".image-controls").show();
                    html.find(".find-and-replace").hide();
                }
            });
            $(html).find('[name="method"]').trigger("input");
        }
        if (this.configuration.colorForm) {
            const hue = html.find('[name="hue"]');
            const space = html.find('[name="space"]');
            const method = html.find('[name="method"]');
            const colorSlider = new (0, $2693f7af118c914b$export$44fd664bcca5b6fb)(html.find(".slide"), this.configuration.colors, {
                hue: hue,
                space: space
            });
            hue.on("input", colorSlider.update.bind(colorSlider));
            space.on("input", colorSlider.update.bind(colorSlider));
            method.on("input", colorSlider.update.bind(colorSlider));
            this.colorSlider = colorSlider;
        }
    }
    async _onPickBounds(event) {
        event.preventDefault();
        if (!canvas.ready) return;
        this.minimize();
        this.configApp.minimize();
        const t = this;
        (0, $32e43d7a62aba58c$export$ba25329847403e11).activate((position)=>{
            if (position == null) return;
            const form = $(event.target).closest("form");
            const minX = Math.min(position.start.x, position.end.x);
            const maxX = Math.max(position.start.x, position.end.x);
            const minY = Math.min(position.start.y, position.end.y);
            const maxY = Math.max(position.start.y, position.end.y);
            form.find('[name="minX"]').val(Math.floor(minX));
            form.find('[name="maxX"]').val(Math.floor(maxX));
            form.find('[name="minY"]').val(Math.floor(minY));
            form.find('[name="maxY"]').val(Math.floor(maxY));
            t.maximize();
            t.configApp.maximize();
            if (game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "autoSnap")) t._onSnapToGrid(event);
        });
    }
    _onSnapToGrid(event) {
        const form = $(event.target).closest("form");
        form.find('[name="minX"], [name="maxX"]').each(function() {
            this.value = (0, $3180f13c9e24a345$export$527c3bc4477c9048)(this.value, canvas.grid.w);
        });
        form.find('[name="minY"], [name="maxY"]').each(function() {
            this.value = (0, $3180f13c9e24a345$export$527c3bc4477c9048)(this.value, canvas.grid.h);
        });
        form.find('[name="stepX"]').val(canvas.grid.w);
        form.find('[name="stepY"]').val(canvas.grid.h);
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        const fieldName = this.control.attr("name");
        if (event.submitter?.value === "delete") {
            delete this.configApp.randomizeFields[fieldName];
            (0, $3180f13c9e24a345$export$6d9a46257e99a3f6)(this.control, this.configApp);
            return;
        }
        if (this.configuration.selectForm) {
            if (formData[fieldName]?.length) this.configApp.randomizeFields[fieldName] = {
                type: "select",
                method: "random",
                selection: formData[fieldName].map((v)=>this.configuration.dtype === "Number" ? Number(v) : v)
            };
        } else if (this.configuration.numberForm || this.configuration.rangeForm) {
            if (formData.min != null && formData.max != null) this.configApp.randomizeFields[fieldName] = {
                type: "number",
                method: formData.method,
                min: formData.min,
                max: formData.max,
                step: formData.step
            };
        } else if (this.configuration.booleanForm) this.configApp.randomizeFields[fieldName] = {
            type: "boolean",
            method: "random"
        };
        else if (this.configuration.colorForm) {
            let colors = foundry.utils.deepClone(this.colorSlider.colors).sort((a, b)=>a.offset - b.offset);
            this.configApp.randomizeFields[fieldName] = {
                type: "color",
                method: formData.method,
                space: formData.space,
                hue: formData.hue,
                colors: colors
            };
        } else if (this.configuration.imageForm) {
            if (formData.method === "findAndReplace" || formData.method === "findAndReplaceRegex") this.configApp.randomizeFields[fieldName] = {
                type: "text",
                method: formData.method,
                find: formData.find,
                replace: formData.replace
            };
            else if (formData.images) {
                const images = formData.images.replace(/\r\n/g, "\n").split("\n").map((img)=>img.trim()).filter((img)=>(0, $32e43d7a62aba58c$export$fb85bc5d6d9ef19b)(img) || (0, $32e43d7a62aba58c$export$ac5608bbe92d6fdc)(img));
                this.configApp.randomizeFields[fieldName] = {
                    type: "image",
                    method: formData.method,
                    images: images,
                    maintainAspect: formData.maintainAspect
                };
            }
        } else if (this.configuration.textForm) {
            if (formData.method === "findAndReplace" || formData.method === "findAndReplaceRegex") this.configApp.randomizeFields[fieldName] = {
                type: "text",
                method: formData.method,
                find: formData.find,
                replace: formData.replace
            };
            else if (formData.strings) {
                const strings = formData.strings.replace(/\r\n/g, "\n").split("\n").map((s)=>s.trim()).filter((s)=>s);
                this.configApp.randomizeFields[fieldName] = {
                    type: "text",
                    method: formData.duplicates ? "random" : "unique",
                    strings: strings
                };
            }
        } else if (this.configuration.coordinateForm) {
            if (formData.minX != null && formData.maxX != null && formData.minY != null && formData.maxY != null) {
                const minX = Math.min(formData.minX, formData.maxX);
                const maxX = Math.max(formData.minX, formData.maxX);
                const minY = Math.min(formData.minY, formData.maxY);
                const maxY = Math.max(formData.minY, formData.maxY);
                const boundingBox = {
                    x: minX,
                    y: minY,
                    width: maxX - minX,
                    height: maxY - minY
                };
                this.configApp.randomizeFields["x"] = {
                    type: "coordinate",
                    method: "noOverlap",
                    boundingBox: boundingBox,
                    stepX: formData.stepX,
                    stepY: formData.stepY
                };
                this.configApp.randomizeFields["y"] = {
                    type: "coordinate",
                    method: "noOverlap",
                    boundingBox: boundingBox,
                    stepX: formData.stepX,
                    stepY: formData.stepY
                };
                (0, $3180f13c9e24a345$export$a33d8ee3eb2c1a9b)(this.configuration.controlY);
            } else (0, $3180f13c9e24a345$export$6d9a46257e99a3f6)(this.configuration.controlY, this.configApp);
        }
        if (this.configApp.randomizeFields[fieldName]) (0, $3180f13c9e24a345$export$a33d8ee3eb2c1a9b)(this.control);
        else (0, $3180f13c9e24a345$export$6d9a46257e99a3f6)(this.control, this.configApp);
        if (this.configApp.updateBrushFields) this.configApp.updateBrushFields();
    }
}
function $9d9c8b96086115aa$export$35c8282f7a588f99(formGroup, configApp) {
    const singleInput = formGroup.find("[name]").length === 1;
    // Special handling for coordinates
    // Depending on the placeable both x and y coordinates can either be set
    // under the same form or 2 separate forms. Either way we want to randomize
    // them both at the same time
    let ignoreXY = false;
    if (formGroup.find('[name="x"]').length || formGroup.find('[name="y"]').length) {
        ignoreXY = true;
        const inputX = formGroup.closest("form").find('[name="x"]');
        const inputY = formGroup.closest("form").find('[name="y"]');
        $9d9c8b96086115aa$var$processCoordinate(inputX, inputY, configApp, "Coordinates (X, Y)");
    }
    // Display randomize dialogs for each named element
    formGroup.find("[name]").each(function(_) {
        if (ignoreXY && [
            "x",
            "y"
        ].includes(this.name)) ;
        else {
            const type = this.nodeName;
            let label = this.name;
            if ($(this).prev("label").length) label = $(this).prev("label").html();
            else if (formGroup.find("label").length) label = formGroup.find("label").first().html();
            if (type === "SELECT") $9d9c8b96086115aa$var$_showRandomSelectDialog($(this), configApp, label);
            else if (type === "INPUT") $9d9c8b96086115aa$var$_processInput($(this), configApp, label, singleInput);
            else console.log(label, type);
        }
    });
}
// Handle <input> tag
function $9d9c8b96086115aa$var$_processInput(input, configApp, label, singleInput) {
    const type = input.attr("type");
    if (type === "number" || type === "text" && input.attr("data-dtype") === "Number") $9d9c8b96086115aa$var$_showRandomNumberDialog(input, configApp, label);
    else if (type === "range") $9d9c8b96086115aa$var$_showRandomRangeDialog(input, configApp, label);
    else if (type === "checkbox") $9d9c8b96086115aa$var$_showRandomBoolDialog(input, configApp, label, singleInput);
    else if (type === "text" && input.hasClass("color")) $9d9c8b96086115aa$var$_showRandomColorDialog(input, configApp, label);
    else if (type === "text" && input.hasClass("image")) $9d9c8b96086115aa$var$_showRandomImageDialog(input, configApp, label);
    else if (type === "text") $9d9c8b96086115aa$var$_showRandomTextDialog(input, configApp, label);
    else if (input.attr("list")) $9d9c8b96086115aa$var$_processList(input, configApp, label);
}
function $9d9c8b96086115aa$var$processCoordinate(inputX, inputY, configApp, label) {
    const x = inputX.val() ?? 0;
    const y = inputY.val() ?? 0;
    const step = 1;
    new $9d9c8b96086115aa$export$2e2bcd8739ae039(label, inputX, configApp, {
        coordinateForm: true,
        x: x,
        y: y,
        step: step,
        controlY: inputY
    }).render(true);
}
function $9d9c8b96086115aa$var$_showRandomTextDialog(input, configApp, label) {
    new $9d9c8b96086115aa$export$2e2bcd8739ae039(label, input, configApp, {
        textForm: true,
        current: input.val()
    }).render(true);
}
function $9d9c8b96086115aa$var$_showRandomImageDialog(input, configApp, label) {
    new $9d9c8b96086115aa$export$2e2bcd8739ae039(label, input, configApp, {
        imageForm: true,
        current: input.val()
    }).render(true);
}
function $9d9c8b96086115aa$var$_showRandomColorDialog(input, configApp, label) {
    new $9d9c8b96086115aa$export$2e2bcd8739ae039(label, input, configApp, {
        colorForm: true,
        colors: [
            {
                hex: "#ff0000",
                offset: 0
            },
            {
                hex: "#ff0000",
                offset: 100
            }
        ]
    }).render(true);
}
// Show dialog for checkboxes
function $9d9c8b96086115aa$var$_showRandomBoolDialog(input, configApp, label, singleInput) {
    if (singleInput) {
        const fieldName = input.attr("name");
        if (configApp.randomizeFields[fieldName]) {
            delete configApp.randomizeFields[fieldName];
            (0, $3180f13c9e24a345$export$6d9a46257e99a3f6)(input, configApp);
        } else {
            configApp.randomizeFields[fieldName] = {
                type: "boolean",
                method: "random"
            };
            (0, $3180f13c9e24a345$export$a33d8ee3eb2c1a9b)(input);
        }
    } else new $9d9c8b96086115aa$export$2e2bcd8739ae039(label, input, configApp, {
        booleanForm: true
    }).render(true);
}
// show dialog for number inputs
function $9d9c8b96086115aa$var$_showRandomNumberDialog(input, configApp, label) {
    const current = input.val() ?? 0;
    const step = input.attr("step") ?? 1;
    const min = input.attr("min") ?? current;
    const max = input.attr("max") ?? current;
    new $9d9c8b96086115aa$export$2e2bcd8739ae039(label, input, configApp, {
        numberForm: true,
        min: min,
        max: max,
        step: step,
        dtype: "Number"
    }).render(true);
}
// show dialog for range inputs
function $9d9c8b96086115aa$var$_showRandomRangeDialog(input, configApp, label) {
    const current = input.val() ?? 0;
    const step = input.attr("step") ?? 1;
    const min = input.attr("min") ?? 0;
    const max = input.attr("max") ?? 10;
    new $9d9c8b96086115aa$export$2e2bcd8739ae039(label, input, configApp, {
        rangeForm: true,
        min: min,
        max: max,
        current: current,
        step: step,
        dtype: "Number"
    }).render(true);
}
function $9d9c8b96086115aa$var$_showRandomSelectDialog(select, configApp, label) {
    const options = [];
    const dtype = select.attr("data-dtype") ?? "String";
    select.find("option").each(function(_) {
        options.push({
            value: this.value,
            label: this.innerHTML
        });
    });
    new $9d9c8b96086115aa$export$2e2bcd8739ae039(label, select, configApp, {
        selectForm: true,
        options: options,
        dtype: dtype
    }).render(true);
}
function $9d9c8b96086115aa$var$_processList(input, configApp, label) {
    const dataList = input.closest(".form-group").find(`#${input.attr("list")}`);
    const options = [];
    dataList.find("option").each(function(_) {
        options.push({
            value: this.value,
            label: this.value
        });
    });
    new $9d9c8b96086115aa$export$2e2bcd8739ae039(label, input, configApp, {
        selectForm: true,
        options: options,
        dtype: "String"
    }).render(true);
}



async function $aec7a07dafc003fd$export$8d7d9ec28b4dea56(placeable, color) {
    placeable = placeable.object ?? placeable;
    color = $aec7a07dafc003fd$var$_string2hex(color);
    if (isNaN(color)) await TokenMagic.deleteFilters(placeable, "DDTint");
    else await TokenMagic.addUpdateFilters(placeable, [
        {
            filterType: "ddTint",
            filterId: "DDTint",
            tint: PIXI.utils.hex2rgb(color)
        }
    ]);
}
function $aec7a07dafc003fd$export$8e73f2214052be9e(placeable) {
    let color = 0xff0000;
    let obj = placeable.object ?? placeable;
    if (obj._TMFXgetSprite) {
        const filter = obj._TMFXgetSprite()?.filters?.find((f)=>f.filterId === "DDTint");
        if (filter) color = PIXI.utils.rgb2hex(filter.uniforms.tint);
    }
    return $aec7a07dafc003fd$var$_hex2string(color);
}
async function $aec7a07dafc003fd$export$e43fe9e17895939b(placeable, presetName, remove = false) {
    placeable = placeable.object ?? placeable;
    if (!(placeable instanceof PlaceableObject)) return;
    if (presetName === "DELETE ALL") await TokenMagic.deleteFilters(placeable);
    else if (remove) await TokenMagic.deleteFilters(placeable, presetName);
    else {
        const preset = TokenMagic.getPreset(presetName);
        if (preset) await TokenMagic.addUpdateFilters(placeable, foundry.utils.deepClone(preset));
    }
}
function $aec7a07dafc003fd$var$_hex2string(color) {
    if (PIXI.Color) return new PIXI.Color(color).toHex();
    else return PIXI.utils.hex2string(color);
}
function $aec7a07dafc003fd$var$_string2hex(color) {
    if (PIXI.Color) return new PIXI.Color(color).toNumber();
    else return PIXI.utils.string2hex(color);
}




function $2f2bd158cac8dcd3$export$455a4bc28dcdcc44() {
    const styleInUse = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "cssStyle");
    if (styleInUse in $2f2bd158cac8dcd3$export$1c0e52168af9675e) return [
        styleInUse,
        $2f2bd158cac8dcd3$export$1c0e52168af9675e[styleInUse]
    ];
    else return [
        "CUSTOM",
        game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "cssCustom") || ""
    ];
}
class $2f2bd158cac8dcd3$export$2e2bcd8739ae039 extends FormApplication {
    constructor(){
        super({}, {});
    }
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "mass-edit-css",
            classes: [
                "sheet"
            ],
            template: `modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/cssEdit.html`,
            resizable: true,
            minimizable: false,
            title: "Edit CSS",
            width: 490,
            height: 730
        });
    }
    async getData(options) {
        const data = super.getData(options);
        const [styleInUse, css] = $2f2bd158cac8dcd3$export$455a4bc28dcdcc44();
        data.styleInUse = styleInUse;
        data.css = css;
        data.styles = Object.keys($2f2bd158cac8dcd3$export$1c0e52168af9675e);
        data.styles.push("CUSTOM");
        data.disableCSS = styleInUse !== "CUSTOM";
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        $(html).on("change", ".selectStyle", (event)=>{
            let css;
            if (event.target.value === "CUSTOM") css = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "cssCustom");
            else css = $2f2bd158cac8dcd3$export$1c0e52168af9675e[event.target.value];
            $(html).find(".cssTextArea").val(css).prop("disabled", event.target.value !== "CUSTOM");
            $(html).find(".previewStyle").html(css);
        });
        $(html).on("input", ".cssTextArea", (event)=>{
            $(html).find(".previewStyle").html(event.target.value);
        });
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        if (formData.selectedStyle === "CUSTOM") game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "cssCustom", formData.css);
        game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "cssStyle", formData.selectedStyle);
    }
}
const $2f2bd158cac8dcd3$export$1c0e52168af9675e = {
    Default: `.form-group.meCommon {
  outline: green dotted 2px;
  margin-bottom: 5px;
}

.mass-edit-checkbox.meCommon {
  outline: green solid 2px;
}

.form-group.meDiff {
  outline: rgb(255, 204, 110) dotted 2px;
  margin-bottom: 5px;
}

.mass-edit-checkbox.meDiff {
  outline: rgb(255, 204, 110) solid 2px;
}

.form-group.meFlag {
  outline: rgb(246, 175, 255) dotted 2px;
  margin-bottom: 5px;
}

.mass-edit-checkbox.meFlag {
  outline: rgb(246, 175, 255) solid 2px;
}

.form-group.meInsert {
  outline: rgb(118, 242, 255) dotted 2px;
  margin-bottom: 5px;
}

.mass-edit-checkbox.meInsert {
  outline: rgb(118, 242, 255) solid 2px;
}
`,
    // ==================
    // No Outline
    // ==================
    "No Outline": `.form-group.meCommon {}

.mass-edit-checkbox.meCommon {
  outline: green solid 2px;
}

.form-group.meDiff {}

.mass-edit-checkbox.meDiff {
  outline: rgb(255, 204, 110) solid 2px;
}

.form-group.meFlag {}

.mass-edit-checkbox.meFlag {
  outline: rgb(246, 175, 255) solid 2px;
}

.form-group.meInsert {}

.mass-edit-checkbox.meInsert {
  outline: rgb(118, 242, 255) solid 2px;
}
`,
    // ==================
    // Striped Background
    // ==================
    "Striped Background": `.form-group.meCommon {
  background: repeating-linear-gradient(
  45deg,
  rgba(155, 233, 155, 0.8),
  rgba(155, 233, 155, 0.8) 10px,
  rgba(0, 0, 0, 0) 10px,
  rgba(0, 0, 0, 0) 20px
  );
}

.mass-edit-checkbox.meCommon {
  outline: green solid 2px;
}

.form-group.meDiff {
  background: repeating-linear-gradient(
  135deg,
  rgba(255, 207, 118, 0.5),
  rgba(255, 207, 118, 0.5) 10px,
  rgba(0, 0, 0, 0) 10px,
  rgba(0, 0, 0, 0) 20px
  );
}

.mass-edit-checkbox.meDiff {
  outline: rgb(255, 204, 110) solid 2px;
}

.form-group.meFlag {
  background: repeating-linear-gradient(
  70deg,
  rgba(237, 149, 255, 0.3),
  rgba(237, 149, 255, 0.3) 10px,
  rgba(0, 0, 0, 0) 10px,
  rgba(0, 0, 0, 0) 20px
  );
}

.mass-edit-checkbox.meFlag {
  outline: rgb(246, 175, 255) solid 2px;
}

.form-group.meInsert {
  background: repeating-linear-gradient(
  70deg,
  rgba(118, 242, 255, 0.5),
  rgba(118, 242, 255, 0.5) 10px,
  rgba(0, 0, 0, 0) 10px,
  rgba(0, 0, 0, 0) 20px
  );
}

.mass-edit-checkbox.meInsert {
  outline: rgb(246, 175, 255) solid 2px;
}
`,
    // ==================
    // Solid Background
    // ==================
    "Solid Background": `.form-group.meCommon {
  background: rgba(155, 233, 155, 0.8)
}

.mass-edit-checkbox.meCommon {
outline: green solid 2px;
}

.form-group.meDiff {
  background: rgba(255, 207, 118, 0.5)
}

.mass-edit-checkbox.meDiff {
  outline: rgb(255, 204, 110) solid 2px;
}

.form-group.meFlag {
  background: rgba(237, 149, 255, 0.3)
}

.mass-edit-checkbox.meFlag {
  outline: rgb(246, 175, 255) solid 2px;
}

.form-group.meInsert {
  background: rgba(118, 242, 255, 0.5)
}

.mass-edit-checkbox.meInsert {
  outline: rgb(118, 242, 255) solid 2px;
}`
};









class $f3c44e8dfe7ab826$export$2e2bcd8739ae039 extends FormApplication {
    constructor(docName, callback){
        super({}, {});
        this.callback = callback;
        this.docName = docName;
        this.history = foundry.utils.deepClone((0, $15e9db69c2322773$export$149eb684a26496a2));
    }
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "mass-edit-history",
            classes: [
                "sheet"
            ],
            template: `modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/history.html`,
            resizable: false,
            minimizable: false,
            title: `History`,
            width: 400,
            height: "auto"
        });
    }
    get title() {
        return `[${this.docName}] ${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.history")}`;
    }
    async getData(options) {
        const data = super.getData(options);
        const historyItems = (this.history[this.docName] ?? []).reverse();
        data.updates = [];
        let formHasDiff = false;
        const getTitle = function(fields, rdm, addSubtract) {
            let title = "";
            for (const k of Object.keys(fields)){
                if ([
                    "_id",
                    "mass-edit-randomize",
                    "mass-edit-addSubtract"
                ].includes(k)) continue;
                if (k in rdm) title += `${k}: {{randomized}}\n`;
                else if (k in addSubtract) {
                    const val = "value" in addSubtract[k] ? addSubtract[k].value : fields[k];
                    title += `${k}: ${addSubtract[k].method === "add" ? "+" : "-"}${val}\n`;
                } else title += `${k}: ${fields[k]}\n`;
            }
            return title;
        };
        for (const item of historyItems){
            const rdm = item.ctrl["mass-edit-randomize"] || {};
            const addSubtract = item.ctrl["mass-edit-addSubtract"] || {};
            const fullTitle = getTitle(foundry.utils.deepClone(item.update), rdm, addSubtract);
            const title = getTitle(foundry.utils.deepClone(item.diff), rdm, addSubtract);
            const hasDifferences = fullTitle !== title;
            if (hasDifferences) formHasDiff = true;
            data.updates.push({
                label: item["timestamp"],
                title: title,
                fullTitle: fullTitle,
                id: item._id,
                hasDifferences: hasDifferences
            });
        }
        data.includeDiff = formHasDiff;
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.on("click", ".doc-id", (event)=>{
            const id = $(event.target).closest("div").find("button")[0].dataset.id;
            const layer = (0, $f3b8698a65c76e19$export$82c7bfc790fc617)[this.docName];
            if (layer) {
                let placeable = canvas[layer].placeables.find((p)=>p.id === id) || null;
                if (placeable) canvas.animatePan({
                    x: placeable.center.x,
                    y: placeable.center.y,
                    duration: 250
                });
            }
        });
        const copy = function(event, type, history, docName) {
            const index = $(event.target).closest("li")[0].dataset.index;
            const docHistory = history[docName] ?? [];
            const historyItem = docHistory[index];
            if (historyItem) {
                const preset = new (0, $d0a1f06830d69799$export$3463c369d5cc977f)({
                    documentName: docName,
                    data: foundry.utils.deepClone(historyItem[type]),
                    randomize: historyItem.ctrl["mass-edit-randomize"],
                    addSubtract: historyItem.ctrl["mass-edit-addSubtract"]
                });
                (0, $8d51a9873394e4eb$export$2cdf1b96a9f86d16)(preset);
            }
        };
        html.on("click", ".doc-copy-update", (event)=>{
            copy(event, "update", this.history, this.docName);
        });
        html.on("click", ".doc-copy-diff", (event)=>{
            copy(event, "diff", this.history, this.docName);
        });
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        const index = $(event.submitter).closest("li")[0].dataset.index;
        const docHistory = this.history[this.docName] ?? [];
        const historyItem = docHistory[index];
        if (historyItem) {
            const update = foundry.utils.deepClone(historyItem[event.submitter.name]);
            (0, $59fc6fe4c07de9fd$export$d5bbc12fef4eed7f).updateToForm(this.docName, update);
            const preset = new (0, $d0a1f06830d69799$export$3463c369d5cc977f)({
                documentName: this.docName,
                data: update,
                randomize: historyItem.ctrl["mass-edit-randomize"],
                addSubtract: historyItem.ctrl["mass-edit-addSubtract"]
            });
            this.callback(preset);
        }
    }
}





function $fd6a2dce4ab54ee1$export$7e6026dcea888586(options, docName) {
    if (options.method === "update" || options.method === "toggle") {
        let command = ``;
        if (options.method === "toggle") command += $fd6a2dce4ab54ee1$var$genToggleUtil(options);
        // Insert 'update' objects
        command += `\n// Updates to be applied
const update = ${(0, $f4363e46af180743$export$3cbb80dec8953997)(options.fields)};\n`;
        if (options.method === "toggle") command += `const update2 = ${(0, $f4363e46af180743$export$3cbb80dec8953997)(options.toggle.fields)};\n\n`;
        // Insert Mass Edit control objects
        if ((0, $f4363e46af180743$export$ac528515d0bfd647)(options)) {
            command += `\n// Mass Edit control objects\n`;
            if (options.randomize) command += `const randomizeFields = ${(0, $f4363e46af180743$export$3cbb80dec8953997)(options.randomize)};\n`;
            if (options.addSubtract) command += `const addSubtractFields = ${(0, $f4363e46af180743$export$3cbb80dec8953997)(options.addSubtract)};\n`;
            if (options.toggle) {
                if (options.toggle.randomize) command += `const randomizeFieldsToggleOff = ${(0, $f4363e46af180743$export$3cbb80dec8953997)(options.toggle?.randomize)};\n`;
                if (options.toggle.addSubtract) command += `const addSubtractFieldsToggleOff = ${(0, $f4363e46af180743$export$3cbb80dec8953997)(options.toggle?.addSubtract)};\n`;
            }
        }
        if ((0, $f4363e46af180743$export$ac528515d0bfd647)(options)) return command + $fd6a2dce4ab54ee1$var$genUpdateWithMassEditDep(options, docName);
        else return command + $fd6a2dce4ab54ee1$var$genUpdate(options, docName);
    } else if (options.method === "massEdit") return `\n// Open Mass Edit Form
await MassEdit.api.showMassEdit(targets, '${docName}');`;
    else if (options.method === "delete") return $fd6a2dce4ab54ee1$var$genDelete(options, docName);
}
function $fd6a2dce4ab54ee1$var$genDelete(options, docName) {
    let command = `\n// Delete ${docName}s`;
    if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName)) {
        if (options.target.scope === "selected" || options.target.scope === "scene") command += `\ncanvas.scene.deleteEmbeddedDocuments('${docName}', targets.map(t => t.id));`;
        else command += `\nconst toDelete = {};
targets.forEach( t => {
  const sceneID = t.parent.id;
  if(!toDelete[sceneID]) toDelete[sceneID] = [];
  toDelete[sceneID].push(t.id);
});
Object.keys(toDelete).forEach(sceneID => game.scenes.get(sceneID).deleteEmbeddedDocuments('${docName}', toDelete[sceneID]));
      `;
    } else command += `\n${docName}.deleteDocuments(targets.map( t => t.id ));`;
    return command;
}
function $fd6a2dce4ab54ee1$var$genUpdate(options, docName) {
    // Update related code
    let command = "";
    // Macro only execution, ignore update code
    if (foundry.utils.isEmpty(options.fields) && !options.toggle) return "";
    else if (options.toggle && foundry.utils.isEmpty(options.toggle.fields) && foundry.utils.isEmpty(options.fields)) return `
const toggleOnTargets = [];
const toggleOffTargets = [];

targets.forEach((t) => {
  if(toggleOn(t, update)) toggleOffTargets.push(t);
  else toggleOnTargets.push(t);
});
    `;
    // We start generating update code here
    // Are there macros to execute?
    const macroTracking = (options.macro || options.toggle?.macro) && options.toggle;
    if (macroTracking) command += `
const toggleOnTargets = [];
const toggleOffTargets = [];
  `;
    // Setting up updates
    if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName)) {
        command += "\nconst updates = {};";
        if (options.method === "toggle") command += `
targets.forEach((t) => {
  const sceneId = t.parent.id;
  if(!updates[sceneId]) updates[sceneId] = [];

  let u;
  if(toggleOn(t, update)) {
    u = foundry.utils.deepClone(update2);${macroTracking ? "\ntoggleOffTargets.push(t);" : ""}
  } else {
    u = foundry.utils.deepClone(update);${macroTracking ? "\ntoggleOnTargets.push(t);" : ""}
  }
  u._id = t.id;

  updates[sceneId].push(u);
});
  `;
        else command += `
targets.forEach((t) => {
  const sceneId = t.parent.id;
  if(!updates[sceneId]) updates[sceneId] = [];
  
  let u = foundry.utils.deepClone(update);
  u._id = t.id;
    updates[sceneId].push(u);
});
  `;
    } else {
        command += "\nconst updates = [];";
        if (options.method === "toggle") command += `
targets.forEach((t) => {
  let u;
  if(toggleOn(t, update)) {
    u = foundry.utils.deepClone(update2);${macroTracking ? "\ntoggleOffTargets.push(t);" : ""}
  } else {
    u = foundry.utils.deepClone(update);${macroTracking ? "\ntoggleOnTargets.push(t);" : ""}
  }
  u._id = t.id;
  updates.push(u);
});
  `;
        else command += `
targets.forEach((t) => {
  let u = foundry.utils.deepClone(update);
  u._id = t.id;
  updates.push(u);
});
  `;
    }
    // Executing updates
    if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName)) command += `
for(const sceneId of Object.keys(updates)) {
  game.scenes.get(sceneId)?.updateEmbeddedDocuments('${docName}', updates[sceneId]);
}
  `;
    else if (docName === "PlaylistSound") command += `
for (let i = 0; i < targets.length; i++) {
  delete updates[i]._id;
  targets[i].document.update(updates[i]);
}
  `;
    else command += `\n${docName}.updateDocuments(updates);\n`;
    return command;
}
function $fd6a2dce4ab54ee1$var$genUpdateWithMassEditDep(options, docName) {
    let context = [];
    if (options.randomize) context.push("randomizeFields");
    if (options.addSubtract) context.push("addSubtractFields");
    context = context.join(", ");
    if (options.method === "toggle") {
        let context2 = [];
        if (options.toggle?.randomize) context2.push("randomizeFields: randomizeFieldsToggleOff");
        if (options.toggle?.addSubtract) context2.push("addSubtractFields: addSubtractFieldsToggleOff");
        context2 = context2.join(", ");
        return `
const toggleOnTargets = [];
const toggleOffTargets = [];
  
targets.forEach((t) => {
  if(toggleOn(t, update)) toggleOffTargets.push(t);
  else toggleOnTargets.push(t);
});
  
await MassEdit.api.performMassUpdate.call({${context}}, update, toggleOnTargets, '${docName}');
await MassEdit.api.performMassUpdate.call({${context2}}, update2, toggleOffTargets, '${docName}');
`;
    } else return `await MassEdit.api.performMassUpdate.call({${context}}, update, targets, '${docName}');\n`;
}
function $fd6a2dce4ab54ee1$var$genToggleUtil(options) {
    let command = `\n// Toggle; Helper function`;
    if (options.toggle.method === "field") command += `
const toggleOn = function (obj, fields) {
  const data = foundry.utils.flattenObject(obj.toObject());
  fields = foundry.utils.flattenObject(fields);
  return foundry.utils.isEmpty(foundry.utils.diffObject(data, fields));
};
  `;
    else command += `
const macro = this;
const toggleOn = function (obj) {
  if (obj.getFlag('world', \`macro-\${macro.id}-toggleOn\`)) {
    obj.unsetFlag('world', \`macro-\${macro.id}-toggleOn\`);
    return true;
  } else {
    obj.setFlag('world', \`macro-\${macro.id}-toggleOn\`, true);
    return false;
  }
};
`;
    return command;
}




function $cd380b2a754ecf8a$export$fb023374f2d2d80b(options, docName, selected) {
    const target = options.target;
    if (target.method === "ids") return $cd380b2a754ecf8a$var$genIDTargets(target, docName, selected);
    else if (target.method === "search") return $cd380b2a754ecf8a$var$genSearch(target, docName);
    else if (target.method === "tagger") return $cd380b2a754ecf8a$var$genTaggerTargets(target, docName);
    else if (target.method === "all") return $cd380b2a754ecf8a$var$genAllTargets(target, docName);
    else throw new Error("Invalid target method: " + target.method);
}
function $cd380b2a754ecf8a$var$genSearch(target, docName) {
    let fields = (0, $f4363e46af180743$export$3cbb80dec8953997)(target.fields);
    if (target.scope === "selected") {
        let command = $cd380b2a754ecf8a$var$genSelected(docName);
        command += `\ntargets = await MassEdit.api.performMassSearch('search', '${docName}' , ${fields}, { scope: 'selected', selected: targets, control: false, pan: false });`;
        return command;
    } else if (target.scope === "scene") return `const targets = await MassEdit.api.performMassSearch('search', '${docName}' , ${fields}, { scope: 'scene', control: false, pan: false });`;
    else if (target.scope === "world") return `const targets = await MassEdit.api.performMassSearch('search', '${docName}' , ${fields}, { scope: 'world', control: false, pan: false });`;
}
// Construct all selected document retriever
// const selected = [...];
function $cd380b2a754ecf8a$var$genSelected(docName) {
    let command = "";
    if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName)) return `let targets = canvas.getLayerByEmbeddedName('${docName}').controlled.map(o => o.document);\n\n`;
    else if (game.modules.get("multiple-document-selection")?.active) {
        const mdsClasses = {
            Actor: "actor",
            Scene: "scene",
            JournalEntry: "journalentry",
            Playlist: "sound",
            Item: "item",
            RollTable: "RollTable",
            Cards: "cards"
        };
        command += "let targets = [];\n";
        if (docName === "Playlist") command += `
$(\`.directory-list .\${'${mdsClasses[docName]}'}.selected\`).each(function (_) {
  let d = game.collections.get('Playlist').get(this.dataset.playlistId)?.sounds.get(this.dataset.soundId);
  if (d) targets.push(d);
});
`;
        else command += `
$(\`.directory-list .\${'${mdsClasses[docName]}'}.selected\`).each(function (_) {
  let d = game.collections.get('${docName}').get(this.dataset.documentId);
  if (d) targets.push(d);
});
  `;
        return command;
    } else throw new Error(`'Selected' is not a supported options for ${docName}s`);
}
function $cd380b2a754ecf8a$var$genAllTargets(target, docName) {
    if (target.scope === "selected") return $cd380b2a754ecf8a$var$genSelected(docName);
    else if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName)) {
        if (target.scope === "scene") return `const targets = canvas.getLayerByEmbeddedName('${docName}').placeables.map(o => o.document);\n\n`;
        else if (target.scope === "world") return `const targets = [];
Array.from(game.scenes).forEach( scene => {
  Array.from( scene.getEmbeddedCollection('${docName}') ).forEach(embed => targets.push(embed));
});
  `;
    } else return `const targets = Array.from(game.collections.get('${docName}'));`;
}
function $cd380b2a754ecf8a$var$genTaggerTargets(target, docName) {
    let command = "";
    const opts = {
        matchAny: target.tagger.match === "any",
        allScenes: target.scope === "world"
    };
    if (target.scope === "selected") {
        command += $cd380b2a754ecf8a$var$genSelected(docName);
        command += `targets = Tagger.getByTag('${target.tagger.tags}', { matchAny: ${target.tagger.match === "any"}, objects: targets }).filter(t => t.documentName === '${docName}');\n\n`;
    } else if (target.scope === "scene") command += `const targets = Tagger.getByTag('${target.tagger.tags}', ${(0, $f4363e46af180743$export$3cbb80dec8953997)(opts)}).filter(t => t.documentName === '${docName}');\n\n`;
    else if (target.scope === "world") {
        command += `const targets = [];`;
        command += `Object.values(Tagger.getByTag('${target.tagger.tags}', ${(0, $f4363e46af180743$export$3cbb80dec8953997)(opts)})).forEach(item => item.forEach(t => { if(t.documentName === '${docName}') targets.push(t) }));`;
    }
    return command;
}
function $cd380b2a754ecf8a$var$genIDTargets(target, docName, selected) {
    let command = `const ids = [${selected.map((p)=>`"${p.id}"`).join(",")}];\n`;
    command += `const targets = [];`;
    if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName)) command += `
ids.forEach( id => {
  Array.from(game.scenes).forEach( scene => {
    let embed = scene.getEmbeddedDocument('${docName}', id);
    if(embed) targets.push(embed)
  });
});
`;
    else command += `
ids.forEach(id => { 
  const doc = ${docName}.get(id);
  if(doc) targets.push(doc);
});`;
    return command;
}


function $f4363e46af180743$export$3cbb80dec8953997(obj) {
    if (!obj) return null;
    return JSON.stringify(obj, null, 2);
}
async function $f4363e46af180743$export$b760ce67911c149f(docName, placeables, options) {
    let command = "";
    // Dependencies get checked first
    command += $f4363e46af180743$var$genMacroDependencies(options, docName);
    command += (0, $cd380b2a754ecf8a$export$fb023374f2d2d80b)(options, docName, placeables);
    command += (0, $fd6a2dce4ab54ee1$export$7e6026dcea888586)(options, docName);
    if (options.macro || options.toggle?.macro) command += $f4363e46af180743$var$genRunMacro(options, docName);
    if (command) {
        // Create Macro
        const macro = await Macro.create({
            name: options.name,
            type: "script",
            scope: "global",
            command: command
        });
        macro.sheet.render(true);
    }
}
function $f4363e46af180743$var$genRunMacro(options, docName) {
    let command = `\n
// ===================
// = Macro Execution =
// ===================

const advancedMacro = game.modules.get('advanced-macros')?.active;
const layer = canvas.getLayerByEmbeddedName('${docName}');
`;
    // Run macros if applicable
    if (options.macro) command += `
// Apply macro
const applyMacro = game.collections.get('Macro').find(m => m.name === '${options.macro.name}')
if (applyMacro && ${options.toggle ? "toggleOnTargets" : "targets"}.length) {
  ${options.macro.select ? `layer.activate();\n  layer.releaseAll();\n  ${options.toggle ? "toggleOnTargets" : "targets"}.forEach(t => t.object?.control({ releaseOthers: false }));\n` : ""}
  if (advancedMacro) applyMacro.execute(${options.toggle ? "toggleOnTargets" : "targets"});
  else applyMacro.execute({token, actor});
  ${options.macro.select ? "\n  layer.releaseAll();" : ""}
}
`;
    if (options.toggle?.macro) command += `
// Apply macro on toggle off
const offMacro = game.collections.get('Macro').find(m => m.name === '${options.toggle.macro.name}')
if (offMacro && toggleOffTargets.length) {
  ${options.toggle.macro.select ? "layer.activate();\n  layer.releaseAll();\n  toggleOffTargets.forEach(t => t.object?.control({ releaseOthers: false }));\n" : ""}
  if (advancedMacro) offMacro.execute(toggleOffTargets);
  else offMacro.execute({token, actor});
  ${options.toggle.macro.select ? "\n  layer.releaseAll();" : ""}
}
`;
    return command;
}
function $f4363e46af180743$export$33b5c78768d02f15(options) {
    return options.randomize || options.addSubtract || options.toggle?.randomize || options.toggle?.addSubtract || options.target.method === "search" || options.method === "massEdit" || $f4363e46af180743$export$7663fd2b0ca788b(options.fields);
}
function $f4363e46af180743$export$ac528515d0bfd647(options) {
    return options.randomize || options.addSubtract || options.toggle?.randomize || options.toggle?.addSubtract || $f4363e46af180743$export$7663fd2b0ca788b(options.fields);
}
function $f4363e46af180743$var$genMacroDependencies(options, docName) {
    let dep = "";
    const depWarning = (module)=>{
        return `ui.notifications.warn('${(0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("macro.dependency-warning", {
            module: module
        })}');`;
    };
    if (options.target.method === "tagger") dep += `
if (!game.modules.get('tagger')?.active) {
  ${depWarning("Tagger")}
  return;
}

`;
    if ($f4363e46af180743$export$33b5c78768d02f15(options)) dep += `
const MassEdit = game.modules.get('${0, $32e43d7a62aba58c$export$59dbefa3c1eecdf}');
if(!MassEdit?.active){
  ${depWarning("Mass Edit")}
  return;
}

`;
    if ((0, $32e43d7a62aba58c$export$f5ba4890ae0d16ac).includes(docName) && options.target.scope === "select") dep += `
if (!game.modules.get('multiple-document-selection')?.active) {
  ${depWarning("Multiple Document Selection")}
  return;
}

`;
    return dep;
}
function $f4363e46af180743$export$7663fd2b0ca788b(fields) {
    const specialFields = [
        "tokenmagic.ddTint",
        "tokenmagic.preset",
        "massedit.scale",
        "massedit.texture.scale"
    ];
    for (const sf of specialFields){
        if (sf in fields) return true;
    }
    return false;
}




class $0893cc7e7e2c4c85$export$2e2bcd8739ae039 extends FormApplication {
    constructor(object, placeables, docName, fields, randomizeFields, addSubtractFields){
        super({}, {});
        this.mainObject = object;
        this.placeables = placeables;
        this.docName = docName;
        this.fields = fields;
        this.randomizeFields = randomizeFields;
        this.addSubtractFields = addSubtractFields;
        if (randomizeFields && !foundry.utils.isEmpty(randomizeFields) || addSubtractFields && !foundry.utils.isEmpty(addSubtractFields)) ;
        else (0, $59fc6fe4c07de9fd$export$d5bbc12fef4eed7f).formToData(this.docName, this.mainObject, this.fields);
    }
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "mass-edit-macro",
            classes: [
                "sheet"
            ],
            template: `modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/macro.html`,
            resizable: true,
            minimizable: false,
            title: `Generate Macro`,
            width: 400,
            height: "auto"
        });
    }
    async getData(options) {
        const data = super.getData(options);
        data.docName = this.docName;
        data.fields = JSON.stringify(this.fields, null, 2);
        data.selectable = (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(this.docName);
        data.selectScopeEnabled = data.selectable || (0, $32e43d7a62aba58c$export$f5ba4890ae0d16ac).includes(this.docName) && game.modules.get("multiple-document-selection")?.active;
        // Define targeting options based on the document being updated
        const targetingOptions = [
            {
                value: "all",
                title: (0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("macro.target-all-title", {
                    document: this.docName
                }),
                label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.all")
            },
            {
                value: "ids",
                title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("macro.target-ids-title"),
                label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("macro.target-ids")
            },
            {
                value: "search",
                title: (0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("macro.target-search-title", {
                    document: this.docName
                }),
                label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("FILES.Search", false)
            }
        ];
        if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(this.docName) && game.modules.get("tagger")?.active) targetingOptions.push({
            value: "tagger",
            title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("macro.target-tagger-title"),
            label: "Tagger"
        });
        data.targetingOptions = targetingOptions;
        if (this.addSubtractFields && !foundry.utils.isEmpty(this.addSubtractFields)) {
            data.hasAddSubtract = true;
            data.addSubtract = JSON.stringify(this.addSubtractFields);
        }
        if (this.randomizeFields && !foundry.utils.isEmpty(this.randomizeFields)) {
            data.hasRandom = true;
            data.randomize = JSON.stringify(this.randomizeFields);
        }
        data.hasMEControls = data.hasAddSubtract || data.hasRandom || (0, $f4363e46af180743$export$7663fd2b0ca788b)(this.fields);
        // Visibility Toggle
        data.hiddenControl = [
            "Token",
            "Tile",
            "Drawing",
            "AmbientLight",
            "AmbientSound",
            "MeasuredTemplate"
        ].includes(this.docName);
        // Macros
        data.macros = game.collections.get("Macro").map((m)=>m.name);
        return data;
    }
    _onShowReturnJson(control, name) {
        const store = control.siblings(`[name="${name}"]`);
        const data = JSON.parse(store.val());
        let content = `<textarea name="json" style="width:100%; height: 300px;">${JSON.stringify(data, null, 2)}</textarea>`;
        new Dialog({
            title: `JSON`,
            content: content,
            buttons: {
                Ok: {
                    label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Save", false),
                    callback: (html)=>{
                        try {
                            const val = JSON.parse(html.find('[name="json"]').val() || "{}");
                            if (foundry.utils.isEmpty(val)) {
                                control.hide();
                                store.prop("disabled", true);
                                this.setPosition({
                                    height: "auto"
                                });
                            } else store.val(JSON.stringify(val));
                        } catch (e) {
                            ui.notifications.warn("Invalid data. Failed to save.");
                        }
                    }
                }
            }
        }).render(true);
    }
    _onRemoveJson(control, name) {
        const store = control.siblings(`[name="${name}"]`);
        control.hide();
        store.prop("disabled", true);
        this.setPosition({
            height: "auto"
        });
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        [
            "randomize",
            "addSubtract",
            "toggle.randomize",
            "toggle.addSubtract"
        ].forEach((name)=>{
            const className = name.replace(".", "");
            html.find(`.${className}`).click((event)=>{
                this._onShowReturnJson($(event.target).parent(), name);
            });
            html.find(`.${className}`).contextmenu((event)=>{
                this._onRemoveJson($(event.target).parent(), name);
            });
        });
        html.find(".toggleVisibility").click((event)=>{
            const fields = html.find('[name="fields"]');
            const toggleFields = html.find('[name="toggle.fields"]');
            let update, update2 = {};
            try {
                update = JSON.parse(fields.val());
                update.hidden = !update.hidden;
                fields.val(JSON.stringify(update, null, 2));
                update2 = JSON.parse(toggleFields.val());
                update2.hidden = !update.hidden;
                toggleFields.val(JSON.stringify(update2, null, 2));
            } catch (e) {}
        });
        html.find('[name="target.method"]').change((event)=>{
            // Hide/show tagger controls
            if (event.target.value === "tagger") {
                html.find(".taggerControl").show();
                html.find('[name="tags"').attr("required", true);
            } else {
                html.find(".taggerControl").hide();
                html.find('[name="tags"').attr("required", false);
            }
            // Hide/show scope
            if (event.target.value === "ids") html.find('[name="target.scope"]').closest(".form-group").hide();
            else html.find('[name="target.scope"]').closest(".form-group").show();
            if (event.target.value === "search") html.find('[name="target.fields"]').closest("div").show();
            else html.find('[name="target.fields"]').closest("div").hide();
            this.setPosition({
                height: "auto"
            });
        });
        html.find('[name="method"]').on("change", (event)=>{
            if (event.target.value === "toggle") {
                let data = foundry.utils.flattenObject($0893cc7e7e2c4c85$var$getData(this.mainObject).toObject());
                const toggleFields = {};
                Object.keys(this.fields).forEach((k)=>toggleFields[k] = data[k]);
                html.find('[name="toggle.fields"]').val(JSON.stringify(toggleFields, null, 2));
                html.find(".toggleControl").show();
                this.setPosition({
                    height: "auto"
                });
            } else {
                html.find(".toggleControl").hide();
                this.setPosition({
                    height: "auto"
                });
            }
            if (event.target.value === "massEdit" || event.target.value === "delete") {
                html.find(".fields").hide();
                this.setPosition({
                    height: "auto"
                });
            } else {
                html.find(".fields").show();
                this.setPosition({
                    height: "auto"
                });
            }
        });
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        formData = expandObject(formData);
        // Cleanup form data so that the macro generator only receives necessary information
        formData.fields = JSON.parse(formData.fields);
        if (formData.method !== "toggle") delete formData.toggle;
        else formData.toggle.fields = JSON.parse(formData.toggle.fields);
        if (!formData.macro.name) delete formData.macro;
        if (formData.toggle?.macro && !formData.toggle.macro.name) delete formData.toggle.macro;
        if (formData.target.method !== "tagger") delete formData.target.tagger;
        if (formData.target.method !== "search") delete formData.target.fields;
        else formData.target.fields = JSON.parse(formData.target.fields);
        if (formData.randomize) formData.randomize = JSON.parse(formData.randomize);
        if (formData.toggle?.randomize) formData.toggle.randomize = JSON.parse(formData.toggle.randomize);
        if (formData.addSubtract) formData.addSubtract = JSON.parse(formData.addSubtract);
        if (formData.toggle?.addSubtract) formData.toggle.addSubtract = JSON.parse(formData.toggle.addSubtract);
        (0, $f4363e46af180743$export$b760ce67911c149f)(this.docName, this.placeables, formData);
    }
}
function $0893cc7e7e2c4c85$var$getData(obj) {
    return obj.document ? obj.document : obj;
}




const $8d51a9873394e4eb$export$69134d6aac39cf4e = (cls)=>{
    class MassEditForm extends cls {
        constructor(doc, docs, options){
            super(doc, options);
            this.meObjects = docs;
            this.documentName = options.documentName ?? doc.document?.documentName ?? doc.documentName ?? "NONE";
            this.commonData = options.commonData || {};
            this.randomizerEnabled = (0, $9d9c8b96086115aa$export$37e829338e648c57) && options.massEdit;
            this.massFormButtons = [
                {
                    title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)(`common.apply`),
                    value: "permissions",
                    icon: "far fa-save"
                }
            ];
            this.randomizeFields = {};
            this.addSubtractFields = {};
            this.meForm = true;
        }
        async getData(options) {
            // During Preset editing we will be editing AmbientLight document directly, which causes the preview to be set to null
            // and Foundry complaining about being unable to read data from it. So we set the preview manually here
            if (this.documentName === "AmbientLight" && !this.preview) this.preview = this.meObjects[0].clone();
            const data = super.getData(options);
            return data;
        }
        // Add styles and controls to the sheet
        async activateListeners(html) {
            await super.activateListeners(html);
            (0, $58452d6efd8a00ed$export$3e5fd86f5f868a08)(this);
            if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(this.documentName) || (0, $32e43d7a62aba58c$export$f5ba4890ae0d16ac).includes(this.documentName)) this._injectGlobalDeleteButton(html);
            // Set style
            const [styleName, css] = (0, $2f2bd158cac8dcd3$export$455a4bc28dcdcc44)();
            $(html).prepend(`<style>${css}</style>`);
            // On any field being changed we want to automatically select the form-group to be included in the update
            html.on("input", 'textarea, input[type="text"], input[type="number"]', $8d51a9873394e4eb$var$onInputChange.bind(this));
            html.on("change", "textarea, input, select", $8d51a9873394e4eb$var$onInputChange.bind(this));
            html.on("paste", "input", $8d51a9873394e4eb$var$onInputChange.bind(this));
            html.on("click", "button", $8d51a9873394e4eb$var$onInputChange.bind(this));
            const rangeSpanToTextbox = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "rangeToTextbox");
            // Attach classes and controls to all relevant form-groups
            const commonData = foundry.utils.flattenObject(this.commonData || {});
            const insertRNGControl = this.randomizerEnabled;
            const processFormGroup = function(formGroup, typeOverride = null) {
                // We only want to attach extra controls if the form-group contains named fields
                if (!$(formGroup).find("[name]").length) return;
                // Return if a checkbox is already inserted
                if ($(formGroup).find(".mass-edit-checkbox").length) return;
                // if ($(formGroup).find('[name]:disabled').length) return;
                // Check if fields within this form-group are part of common data or control a flag
                let fieldType = "meCommon";
                if (commonData) $(formGroup).find("[name]").each(function() {
                    const name = $(this).attr("name");
                    if (rangeSpanToTextbox && $(this).attr("type") === "range") {
                        const span = $(formGroup).find("span.range-value");
                        if (span.length) {
                            span.replaceWith($(`<input name="${name}" class="range-value" type="number" step="any" value="${this.defaultValue}" min="${this.min}" max="${this.max}"></input>`));
                            $(this).removeAttr("name");
                        }
                    }
                    if (name.startsWith("flags.")) fieldType = "meFlag";
                    else if (!(name in commonData)) {
                        // We want to ignore certain fields from commonData checks e.g. light invert-radius
                        if (name === "invert-radius") ;
                        else fieldType = "meDiff";
                    }
                });
                // Add randomizer controls
                let randomControl = "";
                if (insertRNGControl) randomControl = '<div class="mass-edit-randomize"></div>';
                fieldType = typeOverride ?? fieldType;
                // Insert the checkbox
                const checkbox = $(`<div class="mass-edit-checkbox ${fieldType}">${randomControl}<input class="mass-edit-control" type="checkbox" data-dtype="Boolean"}></div>`);
                if ($(formGroup).find("p.hint, p.notes").length) $(formGroup).find("p.hint, p.notes").first().before(checkbox);
                else $(formGroup).append(checkbox);
                // Assign field type to the form group. Will be used to set appropriate visual look
                $(formGroup).addClass(fieldType);
            };
            // Add checkboxes to each form-group to control highlighting and which fields are to be saved
            $(html).find(".form-group").each(function(_) {
                processFormGroup(this);
            });
            const context = this;
            // Register randomize listener if enabled
            if (this.randomizerEnabled) $(html).on("contextmenu", ".mass-edit-checkbox", (event)=>{
                (0, $9d9c8b96086115aa$export$35c8282f7a588f99)($(event.target).closest(".form-group"), context);
            });
            // Register numerical input listeners to toggle between subtract, and add modes
            $(html).on("contextmenu", 'input[type=range], input[type=number], input[name="flags.tagger.tags"], input[type="text"], input[name="tokenmagic.preset"]', (event)=>{
                const name = event.target.name;
                if (!name) return;
                const input = $(event.target);
                if (name in this.addSubtractFields) {
                    if (this.addSubtractFields[name].method === "add") {
                        this.addSubtractFields[name].method = "subtract";
                        input.removeClass("me-add").addClass("me-subtract");
                        input.attr("title", "- Subtracting");
                        const ctrl = {
                            method: "subtract"
                        };
                        if (event.target.min) ctrl.min = parseFloat(event.target.min);
                        ctrl.type = input.attr("type");
                        this.addSubtractFields[name] = ctrl;
                    } else {
                        delete this.addSubtractFields[name];
                        input.removeClass("me-subtract");
                        input.attr("title", "");
                    }
                } else {
                    input.addClass("me-add");
                    input.attr("title", "+ Adding");
                    const ctrl = {
                        method: "add"
                    };
                    if (event.target.max) ctrl.max = parseFloat(event.target.max);
                    ctrl.type = input.attr("type");
                    this.addSubtractFields[name] = ctrl;
                }
                // Select nearest mass edit checkbox
                $8d51a9873394e4eb$var$onInputChange(event);
                // Make brush aware of add/subtract changes
                (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).refreshPreset();
            });
            // Remove all buttons in the footer
            $(html).find(".sheet-footer > button").remove();
            // Special handling for Walls sheet
            $(html).find('button[type="submit"]').remove();
            // Add submit buttons
            let htmlButtons = "";
            if (!this._meSubmitInserted) {
                this._meSubmitInserted = true;
                for (const button of this.massFormButtons){
                    htmlButtons += `<button class="me-submit" type="submit" value="${button.value}"><i class="${button.icon}"></i> ${button.title}</button>`;
                    // Auto update control
                    if (this.options.massEdit && !this.options.simplified && !this.options.presetEdit) htmlButtons += `<div class="me-mod-update" title="${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)(`form.immediate-update-title`)}"><input type="checkbox" data-submit="${button.value}"><i class="fas fa-cogs"></i></div>`;
                }
                if (this.options.massSelect && (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(this.documentName)) htmlButtons += `<div class="me-mod-update" title="${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)(`form.global-search-title`)}"><input type="checkbox" data-submit="world"><i class="far fa-globe"></i></div>`;
                let footer = $(html).find(".sheet-footer").last();
                if (footer.length) footer.append(htmlButtons);
                else {
                    footer = $(`<footer class="sheet-footer flexrow">${htmlButtons}</footer>`);
                    $(html).closest("form").append(footer);
                }
                // Auto update listeners
                footer.find(".me-mod-update > input").on("change", (event)=>{
                    event.stopPropagation();
                    const isChecked = event.target.checked;
                    footer.find(".me-mod-update > input").not(this).prop("checked", false);
                    $(event.target).prop("checked", isChecked);
                    this.modUpdate = isChecked;
                    this.modUpdateType = event.target.dataset?.submit;
                });
            }
            if (this.options.inputChangeCallback) html.on("change", "input, select", async (event)=>{
                setTimeout(()=>this.options.inputChangeCallback(this.getSelectedFields()), 100);
            });
            // Select/Deselect all Mass Edit checkboxes when right-clicking the navigation tabs
            html.on("contextmenu", "nav > .item", (event)=>{
                const tab = event.target.dataset?.tab;
                if (tab) {
                    const group = $(event.target).closest("nav").attr("data-group");
                    let meCheckboxes;
                    if (group) meCheckboxes = $(event.target).closest("form").find(`.tab[data-tab="${tab}"][data-group="${group}"], .matt-tab[data-tab="${tab}"][data-group="${group}"]`).find(".mass-edit-control");
                    if (!meCheckboxes || meCheckboxes.length === 0) meCheckboxes = $(event.target).closest("form").find(`.tab[data-tab="${tab}"], .matt-tab[data-tab="${tab}"]`).find(".mass-edit-control");
                    let selecting = true;
                    if (meCheckboxes.not(":checked").length === 0) selecting = false;
                    meCheckboxes.prop("checked", selecting);
                    // Select/Deselect tabs
                    meCheckboxes.each(function() {
                        if (selecting) $8d51a9873394e4eb$var$selectTabs(this);
                        else $8d51a9873394e4eb$var$deselectTabs(this);
                    });
                    // Trigger change on one of the checkboxes to initiate processes that respond to them
                    // being toggled
                    meCheckboxes.first().trigger("change");
                }
            });
            // =====================
            // Module specific logic
            // =====================
            // Monk's Active Tiles
            if (this.documentName === "Tile" && this._createAction) {
                let chk = $(`
          <div class="form-group">
            <label>Mass Edit: ${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)(`form.actions`)}</label>
            <div class="form-fields">
                <input type="hidden" name="flags.monks-active-tiles.actions">
            </div>
          `);
                $(html).find('.matt-tab[data-tab="trigger-actions"]').prepend(chk);
                processFormGroup(chk, "meInsert");
                chk = $(`
          <div class="form-group">
            <label>Mass Edit: ${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)(`form.images`)}</label>
            <div class="form-fields">
                <input type="hidden" name="flags.monks-active-tiles.files">
            </div>
          `);
                chk.insertBefore('.matt-tab[data-tab="trigger-images"] .files-list');
                processFormGroup(chk, "meInsert");
            }
            // 3D Canvas
            if ((this.documentName === "Tile" || this.documentName === "Token") && game.Levels3DPreview) {
                let chk = $(`
          <div class="form-group">
            <label>Mass Edit: ${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)(`form.shaders`)}</label>
            <div class="form-fields">
                <input type="hidden" name="flags.levels-3d-preview.shaders">
            </div>
          `);
                $(html).find("#shader-config").after(chk);
                processFormGroup(chk, "meInsert");
            }
            //
            // =====================
            // = Additional Fields =
            // =====================
            // // Token Magic FX
            if ((this.documentName === "Tile" || this.documentName === "Token") && !this.options?.simplified && game.modules.get("tokenmagic")?.active && game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "tmfxFieldsEnable")) {
                let content = '<datalist id="tmfxPresets"><option value="DELETE ALL">';
                TokenMagic.getPresets().forEach((p)=>content += `<option value="${p.name}">`);
                content += `</datalist><input list="tmfxPresets" name="tokenmagic.preset">`;
                let chk = $(`
          <div class="form-group">
            <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.preset")} <span class="units">(TMFX)</span></label>
            <div class="form-fields">
              ${content}
            </div>
          `);
                $(html).find('[name="texture.tint"]').closest(".form-group").after(chk);
                processFormGroup(chk, "meInsert");
                const currentDDTint = (0, $aec7a07dafc003fd$export$8e73f2214052be9e)(this.object.object ?? this.object);
                chk = $(`
          <div class="form-group">
            <label>DungeonDraft <span class="units">(TMFX)</span></label>
            <div class="form-fields">
              <input class="color" type="text" name="tokenmagic.ddTint" value="${currentDDTint}">
              <input type="color" value="${currentDDTint}" data-edit="tokenmagic.ddTint">
            </div>
          `);
                $(html).find('[name="texture.tint"]').closest(".form-group").after(chk);
                processFormGroup(chk, "meInsert");
            }
            if (this.documentName === "Tile") {
                let scaleInput = $(`
        <div class="form-group slim">
          <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Scale", false)} <span class="units">(${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.ratio")})</span></label>
          <div class="form-fields">
            <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Width", false)} | ${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Height", false)}</label>
            <input type="number" value="1" step="any" name="massedit.scale" min="0">
          </div>
        </div>`);
                $(html).find('[name="width"]').closest(".form-group").before(scaleInput);
                processFormGroup(scaleInput, "meInsert");
                if (0, $9d9c8b96086115aa$export$37e829338e648c57) {
                    scaleInput = $(`
          <div class="form-group slim">
            <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("TILE.Scale", false)} <span class="units">(${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.ratio")})</span></label>
            <div class="form-fields">
              <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("TILE.ScaleX", false)} | ${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("TILE.ScaleY", false)}</label>
              <input type="number" value="1" step="any" name="massedit.texture.scale" min="0">
            </div>
          </div>`);
                    $(html).find('[name="texture.scaleX"]').closest(".form-group").before(scaleInput);
                    processFormGroup(scaleInput, "meInsert");
                }
            }
            // Resizes the window
            this.setPosition();
            this.element[0].style.height = ""; // don't want a statically set height
            // TokenConfig might be changed by some modules after activateListeners is processed
            // Look out for these updates and add checkboxes for any newly added form-groups
            const mutate = (mutations)=>{
                mutations.forEach((mutation)=>{
                    mutation.addedNodes.forEach((node)=>{
                        if ($(node).hasClass("form-group")) processFormGroup(node);
                        else $(node).find(".form-group").each(function() {
                            if (!$(this).find(".mass-edit-checkbox").length) processFormGroup(this);
                        });
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
            if (this.documentName === "Token") $(html).find("fieldset.detection-mode").each(function(_) {
                $(this).wrap('<div class="form-group"></div>');
            });
            // Inject Flags tab
            (0, $58452d6efd8a00ed$export$6c8d0b561bdc4d96)(this);
        }
        getSelectedFields(formData) {
            if (!formData) formData = this._getSubmitData();
            // Some module flags get un-flattened
            // Flatten them again before attempting to find selected
            formData = foundry.utils.flattenObject(formData);
            // Modules Specific Logic
            // 3D Canvas
            if ("flags.levels-3d-preview.shaders" in formData) formData["flags.levels-3d-preview.shaders"] = this.object.getFlag("levels-3d-preview", "shaders");
            // == End of Module specific logic
            // Token _getSubmitData() performs conversions related to scale, we need to undo them here
            // so that named fields on the form match up and can be selected
            if (this.documentName === "Token") {
                if (formData["texture.scaleX"]) {
                    formData.scale = Math.abs(formData["texture.scaleX"]);
                    formData.mirrorX = formData["texture.scaleX"] < 0;
                    formData.mirrorY = formData["texture.scaleY"] < 0;
                }
            } else if (this.documentName === "Note") {
                if (formData["texture.src"]) {
                    formData["icon.selected"] = formData["texture.src"];
                    formData["icon.custom"] = formData["texture.src"];
                }
            }
            const selectedFields = {};
            const form = $(this.form);
            const addSubtractFields = this.addSubtractFields;
            const app = this;
            form.find(".form-group").each(function(_) {
                const me_checkbox = $(this).find(".mass-edit-checkbox > input");
                if (me_checkbox.length && me_checkbox.is(":checked")) $(this).find("[name]").each(function(_) {
                    const name = $(this).attr("name");
                    // Module specific logic
                    if (name === "flags.limits") {
                        const limits = foundry.utils.flattenObject(app.object.toObject().flags["limits"] ?? {});
                        for (const [k, v1] of Object.entries(limits))selectedFields["flags.limits." + k] = v1;
                    }
                    // == End of Module specific logic
                    // Some modules will process their flags to remove them using -= notation
                    // Need to account for this when selecting fields
                    if (formData[name] === undefined && name.startsWith("flags.")) {
                        const removeFlag = (0, $32e43d7a62aba58c$export$12582391526ed7a4)(name, formData);
                        if (removeFlag) selectedFields[removeFlag] = null;
                    } else {
                        selectedFields[name] = formData[name];
                        if (name in addSubtractFields) addSubtractFields[name].value = formData[name];
                    }
                    if (foundry.utils.getType(selectedFields[name]) === "string") {
                        const input = $(this);
                        if (input.hasClass("tva-array")) {
                            if (v.trim()) selectedFields[name] = selectedFields[name].trim().split(",").map((s)=>s.trim());
                            else selectedFields[name] = [];
                        } else if (input.hasClass("tva-jsonArray")) try {
                            selectedFields[name] = JSON.parse(selectedFields[name]);
                        } catch (e) {
                            selectedFields[name] = [];
                        }
                    }
                });
            });
            // // Module specific logic
            // if (game.modules.get('barbrawl')?.active) {
            //   for (const [k, v] of Object.entries(selectedFields)) {
            //     if (k.startsWith('flags.barbrawl')) {
            //       let details = form.find(`[name="${k}"]`).closest('.indent-details');
            //       let id = details.attr('id');
            //       if (id) selectedFields[`flags.barbrawl.resourceBars.${id}.id`] = id;
            //     }
            //   }
            // }
            // // End of Module specific logic
            return selectedFields;
        }
        // Overriding here to prevent the underlying object from being updated as inputs change on the form
        // Relevant for AmbientLight, Tile, and Token sheets
        async _onChangeInput(event) {
            if (![
                "AmbientLight",
                "Tile",
                "Token"
            ].includes(this.documentName)) {
                super._onChangeInput(event);
                return;
            }
            // // Handle form element updates
            const el = event.target;
            if (el.type === "color" && el.dataset.edit) this._onChangeColorPicker(event);
            else if (el.type === "range") this._onChangeRange(event);
        }
        _getHeaderButtons() {
            let buttons = super._getHeaderButtons();
            return buttons.filter((b)=>b.class !== "configure-sheet");
        }
        _injectGlobalDeleteButton(html) {
            const control = $(`<div class="me-global-delete"><a title="${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("form.global-delete-title")}"><i class="far fa-times-octagon fa-2x"></i></a></div>`);
            control.click((event)=>{
                new Dialog({
                    title: "Confirm",
                    content: `
          <h2 style="color: red; text-align: center;">${(0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("form.delete-warning", {
                        count: this.meObjects.length,
                        document: this.documentName
                    })}</h2>
          <p>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("form.proceed")}</p>`,
                    buttons: {
                        buttonA: {
                            label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Yes", false),
                            callback: ()=>{
                                this.meObjects.forEach((obj)=>{
                                    let doc = obj.document ?? obj;
                                    if (doc.delete) doc.delete();
                                });
                                this.close();
                            }
                        },
                        no: {
                            label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("No", false)
                        }
                    },
                    default: "buttonA"
                }).render(true);
            });
            html.closest("form").append(control);
        }
    }
    return MassEditForm;
};
const $8d51a9873394e4eb$export$ef937e3799bf3b88 = (docName = "NONE")=>{
    let cls;
    const sheets = CONFIG[docName]?.sheetClasses;
    if (!sheets || docName === "Actor") {
        cls = FormApplication;
        cls = FormApplication;
    } else cls = Object.values(Object.values(sheets).pop() ?? {}).pop()?.cls;
    const MEF = $8d51a9873394e4eb$export$69134d6aac39cf4e(cls);
    class MassConfig extends MEF {
        constructor(target, docs, options){
            if (options.massSelect) options.randomizerEnabled = false;
            const docName = options.documentName ?? (0, $32e43d7a62aba58c$export$c29f08336649747)(target);
            if (!options.commonData) options.commonData = $8d51a9873394e4eb$var$getCommonDocData(docs, docName);
            super(target.document ? target.document : target, docs, options);
            this.docName = docName;
            // Add submit buttons
            let buttons = [];
            if (this.options.massSelect) buttons = [
                {
                    title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("FILES.Search", false),
                    value: "search",
                    icon: "fas fa-search"
                },
                {
                    title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("form.search-and-edit"),
                    value: "searchAndEdit",
                    icon: "fas fa-search"
                }
            ];
            else if (this.documentName === "Note" && !this.options.presetEdit) {
                // If we're editing notes and there are some on a different scene
                if (this.meObjects.filter((n)=>(n.scene ?? n.parent).id === canvas.scene.id).length) buttons.push({
                    title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("form.apply-on-current-scene"),
                    value: "currentScene",
                    icon: "far fa-save"
                });
                if (this.meObjects.filter((n)=>(n.scene ?? n.parent).id !== canvas.scene.id).length) buttons.push({
                    title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("form.apply-on-all-scenes"),
                    value: "allScenes",
                    icon: "fas fa-globe"
                });
            } else {
                buttons = [
                    {
                        title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.apply"),
                        value: "apply",
                        icon: "far fa-save"
                    }
                ];
                // Extra control for Tokens to update their Actors Token prototype
                if (this.documentName === "Token" && !this.options.simplified && !this.meObjects[0].constructor?.name?.startsWith("PrototypeToken") && !this.options.presetEdit) buttons.push({
                    title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("form.apply-update-proto"),
                    value: "applyToPrototype",
                    icon: "far fa-save"
                });
            }
            this.massFormButtons = buttons;
        }
        async _updateObject(event, formData) {
            await this.massUpdateObject(event, formData);
            // On v11 certain placeable will freeze the canvas layer if parent _updateObject is not called
            if ([
                "Token",
                "AmbientLight"
            ].includes(this.docName) && this.preview?.object) this._resetPreview();
        }
        async massUpdateObject(event, formData) {
            if (!event.submitter?.value) return;
            // Gather up all named fields that have mass-edit-checkbox checked
            const selectedFields = this.getSelectedFields(formData);
            // Detection modes may have been selected out of order
            // Fix that here
            if (this.docName === "Token") (0, $59fc6fe4c07de9fd$export$7fe60b94e2075390).correctDetectionModeOrder(selectedFields, this.randomizeFields);
            // Preset editing
            if (this.options.presetEdit) {
                this.options.callback?.({
                    data: selectedFields,
                    addSubtract: this.addSubtractFields,
                    randomize: this.randomizeFields
                });
                return;
            }
            // Search and Select mode
            if (this.options.massSelect) return $8d51a9873394e4eb$export$3a950926bf0f8193(event.submitter.value, this.docName, selectedFields, {
                scope: this.modUpdate ? this.modUpdateType : null
            });
            else // Edit mode
            return $8d51a9873394e4eb$export$f13f6f89b098ca30.call(this, selectedFields, this.meObjects, this.docName, event.submitter.value);
        }
        _performOnInputChangeUpdate() {
            const selectedFields = this.getSelectedFields();
            $8d51a9873394e4eb$export$f13f6f89b098ca30.call(this, selectedFields, this.meObjects, this.docName, this.modUpdateType);
        }
        /**
     * Copy currently selected field to the clipboard
     */ performMassCopy({ command: command = "", selectedFields: selectedFields = null } = {}) {
            if (!selectedFields) {
                selectedFields = this.getSelectedFields();
                if (this.documentName === "Token") (0, $59fc6fe4c07de9fd$export$7fe60b94e2075390).correctDetectionModeOrder(selectedFields, this.randomizeFields);
            }
            if (foundry.utils.isEmpty(selectedFields)) return false;
            const preset = new (0, $d0a1f06830d69799$export$3463c369d5cc977f)({
                documentName: this.documentName,
                data: selectedFields,
                randomize: this.randomizeFields,
                addSubtract: this.addSubtractFields
            });
            $8d51a9873394e4eb$export$2cdf1b96a9f86d16(preset, command, this.isPrototype);
            return true;
        }
        _getHeaderButtons() {
            const buttons = super._getHeaderButtons();
            if (this.options.presetEdit) return buttons;
            // Macro Generator
            if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(this.docName) || (0, $32e43d7a62aba58c$export$f5ba4890ae0d16ac).includes(this.docName)) buttons.unshift({
                label: "",
                class: "mass-edit-macro",
                icon: "fas fa-terminal",
                onclick: ()=>{
                    const selectedFields = this.getSelectedFields();
                    new (0, $0893cc7e7e2c4c85$export$2e2bcd8739ae039)(this.object, this.meObjects, this.docName, selectedFields, this.randomizeFields, this.addSubtractFields).render(true);
                }
            });
            // Brush Tool
            if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(this.docName)) buttons.unshift({
                label: "",
                class: "mass-edit-brush",
                icon: "fas fa-paint-brush",
                onclick: ()=>{
                    (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).activate({
                        app: this
                    });
                }
            });
            // Edit Permissions
            if ([
                "Token",
                "Note",
                "Actor"
            ].includes(this.docName)) {
                let docs = [];
                const ids = new Set();
                for (const p of this.meObjects){
                    let d;
                    if (this.docName === "Actor" || this.docName === "JournalEntry") d = p;
                    else if (this.docName === "Token" && p.actor) d = p.actor;
                    else if (this.docName === "Note" && p.entry) d = p.entry;
                    // Only retain unique docs
                    if (d && !ids.has(d.id)) {
                        docs.push(d);
                        ids.add(d.id);
                    }
                }
                if (docs.length) buttons.unshift({
                    label: "",
                    class: "mass-edit-permissions",
                    icon: "fas fa-lock fa-fw",
                    onclick: ()=>{
                        let MP = $8d51a9873394e4eb$export$3800f10fd10126e9();
                        new MP(docs[0], docs).render(true);
                    }
                });
            }
            if (!this.options.simplified) // Open Preset form
            buttons.unshift({
                label: "",
                class: "mass-edit-presets",
                icon: "fas fa-box",
                onclick: ()=>{
                    this.linkedPresetForm = new (0, $d0a1f06830d69799$export$7a966e8b4abecc03)(this, null, this.docName, {
                        left: this.position.left - 370,
                        top: this.position.top,
                        preventPositionOverride: true
                    });
                    this.linkedPresetForm.render(true);
                }
            });
            // Apply JSON data onto the form
            buttons.unshift({
                label: "",
                class: "mass-edit-apply",
                icon: "far fa-money-check-edit",
                onclick: (ev)=>{
                    let selFields = expandObject(this.getSelectedFields());
                    if (foundry.utils.isEmpty(selFields)) selFields = "";
                    else selFields = JSON.stringify(selFields, null, 2);
                    let content = `<textarea class="json" style="width:100%; height: 300px;">${selFields}</textarea>`;
                    new Dialog({
                        title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("form.apply-json"),
                        content: content,
                        buttons: {
                            apply: {
                                label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.apply"),
                                callback: (html)=>{
                                    let json = {};
                                    try {
                                        json = JSON.parse(html.find(".json").val());
                                    } catch (e) {}
                                    if (!foundry.utils.isEmpty(json)) {
                                        const preset = new (0, $d0a1f06830d69799$export$3463c369d5cc977f)({
                                            documentName: this.docName,
                                            data: foundry.utils.flattenObject(json)
                                        });
                                        this._processPreset(preset);
                                    }
                                }
                            }
                        }
                    }).render(true);
                }
            });
            // History
            if (game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "enableHistory") && (0, $32e43d7a62aba58c$export$de10d55d23082cf5).includes(this.docName)) buttons.unshift({
                label: "",
                class: "mass-edit-history",
                icon: "fas fa-history",
                onclick: ()=>{
                    new (0, $f3c44e8dfe7ab826$export$2e2bcd8739ae039)(this.docName, async (preset)=>this._processPreset(preset)).render(true);
                }
            });
            // Toggle between Token and Actor forms
            if (this.documentName === "Token" && this.meObjects.filter((t)=>t.actor).length) buttons.unshift({
                label: "",
                class: "mass-edit-actors",
                icon: "fas fa-user",
                onclick: ()=>{
                    if ((0, $f3b8698a65c76e19$export$8a4c987829ae1580)(this.meObjects, {
                        massEdit: this.options.massEdit
                    })) this.close();
                }
            });
            return buttons;
        }
        async activateListeners(html) {
            await super.activateListeners(html);
            // We want to update fields used by brush control every time a field changes on the form
            html.on("input", 'textarea, input[type="text"], input[type="number"]', ()=>(0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).refreshPreset());
            html.on("change", "textarea, input, select", ()=>(0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).refreshPreset());
            html.on("paste", "input", ()=>(0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).refreshPreset());
            html.on("click", "button", ()=>(0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).refreshPreset());
        }
        async close(options = {}) {
            (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).deactivate();
            options.force = true;
            if ([
                "Token",
                "AmbientLight"
            ].includes(this.docName) && this.preview?.object) this._resetPreview();
            if (this.linkedPresetForm) this.linkedPresetForm.close();
            return super.close(options);
        }
        // Some forms will manipulate themselves via modifying internal objects and re-rendering
        // In such cases we want to preserve the selected fields
        render(force, options = {}) {
            // If it's being re-rendered with an action "update" in means it's ClientDocumentMixin response to _onUpdate
            // We can ignore these
            if (options.action === "update") return;
            // Form hasn't been rendered yet, aka first render pass, ignore it
            if (!this.form) return super.render(force, options);
            // Fetch the currently selected fields before re-rendering
            const selectedFields = this.getSelectedFields();
            const randomize = this.randomizeFields;
            const addSubtract = this.addSubtractFields;
            // Render, the selections will be wiped
            super.render(force, options);
            // Re-select fields, we're reusing preset functions here.
            // Timeout require for this module including others to apply their
            // modifications to the configuration window
            setTimeout(()=>{
                if (this.form) this._applyPreset(new (0, $d0a1f06830d69799$export$3463c369d5cc977f)({
                    data: selectedFields,
                    randomize: randomize,
                    addSubtract: addSubtract
                }));
            }, 1000);
        }
        async _processPreset(preset) {
            // This will be called when a preset or history item is selected or JSON data is being directly applied
            // The code bellow handles it being applied to the current form
            // =====================
            // Module specific logic
            // =====================
            let timeoutRequired = false;
            const data = foundry.utils.flattenObject(preset.data[0]);
            // Monk's Active Tiles
            if ("flags.monks-active-tiles.actions" in data) {
                timeoutRequired = true;
                await this.object.setFlag("monks-active-tiles", "actions", data["flags.monks-active-tiles.actions"]);
            }
            if ("flags.monks-active-tiles.files" in data) {
                timeoutRequired = true;
                await this.object.setFlag("monks-active-tiles", "files", data["flags.monks-active-tiles.files"]);
            }
            // 3D Canvas
            if ("flags.levels-3d-preview.shaders" in data) {
                timeoutRequired = true;
                await this.object.setFlag("levels-3d-preview", "shaders", data["flags.levels-3d-preview.shaders"]);
            }
            // Limits
            if ("flags.limits.light.enabled" in data) {
                timeoutRequired = true;
                await this.object.update({
                    flags: {
                        limits: expandObject(data).flags.limits
                    }
                });
            }
            if (this.documentName === "Token") timeoutRequired = (0, $59fc6fe4c07de9fd$export$7fe60b94e2075390).modifyPresetData(this, data);
            if (timeoutRequired) {
                setTimeout(()=>{
                    this._applyPreset(preset);
                }, 250);
                return;
            }
            this._applyPreset(preset);
        }
        _applyPreset(preset) {
            const form = $(this.form);
            const customMerge = (obj1, obj2)=>{
                if (!obj2) return obj1;
                for (const [k, v1] of Object.entries(obj2))obj1[k] = v1;
                return obj1;
            };
            this.randomizeFields = customMerge(this.randomizeFields, preset.randomize);
            this.addSubtractFields = customMerge(this.addSubtractFields, preset.addSubtract);
            (0, $3180f13c9e24a345$export$2ee69c6850ef1bab)(form, this.randomizeFields);
            (0, $32e43d7a62aba58c$export$cb264c2e048afacf)(form, this.addSubtractFields);
            const data = foundry.utils.flattenObject(preset.data[0]);
            (0, $59fc6fe4c07de9fd$export$d5bbc12fef4eed7f).dataToForm(this.documentName, preset.data[0], data);
            for (const key of Object.keys(data)){
                const el = form.find(`[name="${key}"]`);
                if (el.is(":checkbox")) el.prop("checked", data[key]);
                else el.val(data[key]);
                el.trigger("change");
            }
            // Make brush aware of randomized field changes
            (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).refreshPreset();
        }
        get title() {
            if (this.options.massSelect) return (0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("form.mass-search-title", {
                document: this.documentName
            });
            return (0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("form.mass-edit-title", {
                document: this.documentName,
                count: this.meObjects.length
            });
        }
    }
    const constructorName = `Mass${docName}Config`;
    Object.defineProperty(MassConfig.prototype.constructor, "name", {
        value: constructorName
    });
    return MassConfig;
};
function $8d51a9873394e4eb$export$85a626beb2f6e17a(docs, preset, suppressNotif = false, excludePosition = false) {
    if (!docs || !docs.length) return false;
    let docName = docs[0].document ? docs[0].document.documentName : docs[0].documentName;
    preset = preset ?? $8d51a9873394e4eb$export$33e5d9c131e68cf2(docName);
    let applyType;
    // Special handling for Tokens/Actors
    if (!preset) {
        if (docName === "Token") {
            if (!preset) {
                preset = $8d51a9873394e4eb$export$33e5d9c131e68cf2("TokenProto");
                applyType = "applyToPrototype";
            }
            if (!preset) {
                preset = $8d51a9873394e4eb$export$33e5d9c131e68cf2("Actor");
                docName = "Actor";
                docs = docs.filter((d)=>d.actor).map((d)=>d.actor);
            }
        }
    }
    if (preset) {
        if (preset.documentName !== docName) return;
        const context = {
            meObjects: docs
        };
        if (!foundry.utils.isEmpty(preset.randomize)) context.randomizeFields = preset.randomize;
        if (!foundry.utils.isEmpty(preset.addSubtract)) context.addSubtractFields = preset.addSubtract;
        let data = foundry.utils.deepClone(preset.data[Math.floor(Math.random() * preset.data.length)]);
        if (excludePosition) {
            delete data.x;
            delete data.y;
            delete data.c;
        }
        $8d51a9873394e4eb$export$f13f6f89b098ca30.call(context, foundry.utils.flattenObject(data), docs, preset.documentName, applyType);
        if (!suppressNotif) ui.notifications.info((0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("clipboard.paste", {
            document: preset.documentName,
            count: docs.length
        }));
        return true;
    }
    return false;
}
function $8d51a9873394e4eb$export$3a950926bf0f8193(command, docName, selectedFields, { scope: scope = null, selected: selected = null, control: control = true, pan: pan = true } = {}) {
    const found = [];
    if (scope === "selected") $8d51a9873394e4eb$var$performDocSearch(selected, docName, selectedFields, found);
    else if ((0, $32e43d7a62aba58c$export$f5ba4890ae0d16ac).includes(docName)) $8d51a9873394e4eb$var$performDocSearch(Array.from(game.collections.get(docName)), docName, selectedFields, found);
    else {
        let scenes = [];
        if (scope === "world") scenes = Array.from(game.scenes);
        else if (canvas.scene) scenes = [
            canvas.scene
        ];
        for (const scene of scenes)$8d51a9873394e4eb$var$performMassSearchScene(scene, docName, selectedFields, found);
    }
    // Select found placeables/documents
    if (control) {
        // First release/de-select the currently selected placeable on the current scene
        canvas.activeLayer.controlled.map((c)=>c).forEach((c)=>c.release());
        setTimeout(()=>{
            found.forEach((f)=>{
                let obj = f.object ?? f;
                if (obj.control) obj.control({
                    releaseOthers: false
                });
            });
            if (pan && found.length && game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "panToSearch")) (0, $32e43d7a62aba58c$export$835b3e9cf0bd96cf)(found);
        }, 100);
    }
    if (command === "searchAndEdit") setTimeout(()=>{
        (0, $f3b8698a65c76e19$export$7ac7726310ec4fa4)(found, docName);
    }, 500);
    return found;
}
function $8d51a9873394e4eb$var$performMassSearchScene(scene, docName, selectedFields, found) {
    const docs = Array.from(scene[(0, $f3b8698a65c76e19$export$eeffb68b60636a3b)[docName]]);
    $8d51a9873394e4eb$var$performDocSearch(docs, docName, selectedFields, found);
}
function $8d51a9873394e4eb$var$performDocSearch(docs, docName, selectedFields, found) {
    // Next select objects that match the selected fields
    for (const c of docs){
        let matches = true;
        const data = foundry.utils.flattenObject((0, $32e43d7a62aba58c$export$7a171f172be0782e)(c).toObject());
        // Special processing for some placeable types
        // Necessary when form data is not directly mappable to placeable
        (0, $59fc6fe4c07de9fd$export$d5bbc12fef4eed7f).dataToForm(docName, c, data);
        for (const [k, v1] of Object.entries(selectedFields)){
            // Special handling for flags
            if (k.startsWith("flags.")) {
                if (!(0, $32e43d7a62aba58c$export$be67e9bf7f25c9c4)(data, k, v1)) {
                    matches = false;
                    break;
                }
            } else if ((v1 === "" || v1 == null) && (data[k] !== "" || data[k] != null)) ;
            else if (typeof v1 === "string" && v1.includes("*") && (0, $32e43d7a62aba58c$export$60f577390164ed4f)(v1, data[k])) ;
            else if (data[k] != v1) {
                // Detection mode keys cannot be treated in isolation
                // We skip them here and will check them later
                if (docName === "Token") {
                    if (k.startsWith("detectionModes")) continue;
                }
                matches = false;
                break;
            }
        }
        if (matches) {
            // We skipped detectionMode matching in the previous step and do it now instead
            if (docName === "Token") {
                const modes = Object.values(foundry.utils.expandObject(selectedFields)?.detectionModes || {});
                if (!(0, $59fc6fe4c07de9fd$export$7fe60b94e2075390).detectionModeMatch(modes, c.detectionModes)) continue;
            }
            found.push(c);
        }
    }
}
async function $8d51a9873394e4eb$export$f13f6f89b098ca30(data, objects, docName, applyType) {
    // Used by GenericForms, we want just the data, and no updates
    if (this.options?.simplified) {
        if (this.options.callback) this.options.callback(data);
        return;
    }
    if (foundry.utils.isEmpty(data)) {
        if (this.callbackOnUpdate) this.callbackOnUpdate(objects);
        return;
    }
    // Make sure we're working with documents and not placeables
    objects = objects.map((o)=>o.document ?? o);
    // Update docs
    const updates = [];
    const context = {};
    const total = objects.length;
    for(let i = 0; i < total; i++){
        const update = foundry.utils.deepClone(data);
        update._id = objects[i].id;
        // push update
        updates.push(update);
    }
    // If history is enabled we'll want to attach additional controls to the updates
    // so that they can be tracked.
    if (game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "enableHistory")) {
        context["mass-edit-randomize"] = [
            foundry.utils.deepClone(this.randomizeFields)
        ];
        context["mass-edit-addSubtract"] = [
            foundry.utils.deepClone(this.addSubtractFields)
        ];
    }
    // Applies randomization
    if (this) await (0, $3180f13c9e24a345$export$4bafa436c0fa0cbb)(updates, objects, this.randomizeFields);
    if (this) (0, $32e43d7a62aba58c$export$1ced7b3ceb2cd439)(updates, objects, docName, this.addSubtractFields);
    // Special processing for some placeable types
    // Necessary when form data is not directly mappable to placeable
    for(let i = 0; i < total; i++)(0, $59fc6fe4c07de9fd$export$d5bbc12fef4eed7f).formToData(docName, objects[i], updates[i]);
    await $8d51a9873394e4eb$export$e6d921e6d200bb9c(docName, updates, objects);
    if (docName === "Actor") // Perform Updates
    // There is a lot of wonkiness related to updating of real/synthetic actors. It's probably best
    // to simply update the Actors directly
    for(let i = 0; i < updates.length; i++){
        const update = updates[i];
        delete update._id;
        if (this.options?.tokens) this.options.tokens[i].actor.update(update);
        else objects[i].update(update);
    }
    else if (docName === "Scene") Scene.updateDocuments(updates, context);
    else if (docName === "PlaylistSound") for(let i = 0; i < objects.length; i++){
        delete updates[i]._id;
        objects[i].update(updates[i], context);
    }
    else if (docName === "Note") {
        // Notes can be updated across different scenes
        const splitUpdates = {};
        for(let i = 0; i < updates.length; i++){
            const scene = objects[i].scene ?? objects[i].parent;
            if (applyType === "currentScene" && scene.id !== canvas.scene.id) continue;
            if (!(scene.id in splitUpdates)) splitUpdates[scene.id] = {
                scene: scene,
                updates: []
            };
            splitUpdates[scene.id].updates.push(updates[i]);
        }
        for (const sceneUpdate of Object.values(splitUpdates))sceneUpdate.scene.updateEmbeddedDocuments(docName, sceneUpdate.updates, context);
    } else if (!this.isPrototype && (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName)) {
        const splitUpdates = {};
        for(let i = 0; i < updates.length; i++){
            const scene = objects[i].parent;
            if (!splitUpdates[scene.id]) splitUpdates[scene.id] = [];
            splitUpdates[scene.id].push(updates[i]);
        }
        for (const sceneId of Object.keys(splitUpdates))game.scenes.get(sceneId)?.updateEmbeddedDocuments(docName, splitUpdates[sceneId], context);
    } else if ((0, $32e43d7a62aba58c$export$f5ba4890ae0d16ac).includes(docName)) objects[0].constructor?.updateDocuments(updates, context);
    else {
        // Note a placeable or otherwise specially handled doc type
        // Simply merge the fields directly into the object
        for(let i = 0; i < updates.length; i++){
            const update = updates[i];
            delete update._id;
            (0, $32e43d7a62aba58c$export$1c723ddaaf731bd0)(objects[i], foundry.utils.mergeObject(objects[i], update));
        }
        if (this.callbackOnUpdate) this.callbackOnUpdate(objects);
    }
    // May need to also update Token prototypes
    if ((applyType === "applyToPrototype" || this.isPrototype) && docName === "Token") {
        const actorUpdates = {};
        for(let i = 0; i < objects.length; i++){
            const actor = objects[i].actor;
            if (actor) actorUpdates[actor.id] = {
                _id: actor.id,
                prototypeToken: updates[i]
            };
        }
        if (!foundry.utils.isEmpty(actorUpdates)) {
            const updates = [];
            for (const id of Object.keys(actorUpdates))updates.push(actorUpdates[id]);
            Actor.updateDocuments(updates);
        }
    }
}
async function $8d51a9873394e4eb$export$e6d921e6d200bb9c(docName, updates, objects) {
    // Token Magic FX specific processing
    if (typeof TokenMagic !== "undefined" && (docName === "Token" || docName === "Tile")) for(let i = 0; i < updates.length; i++){
        if ("tokenmagic.ddTint" in updates[i]) await (0, $aec7a07dafc003fd$export$8d7d9ec28b4dea56)(objects[i], updates[i]["tokenmagic.ddTint"]);
        if ("tokenmagic.preset" in updates[i]) await (0, $aec7a07dafc003fd$export$e43fe9e17895939b)(objects[i], updates[i]["tokenmagic.preset"], this?.addSubtractFields?.["tokenmagic.preset"]?.method === "subtract");
    }
}
// Toggle checkbox if input has been detected inside it's form-group
async function $8d51a9873394e4eb$var$onInputChange(event) {
    if (event.target.className === "mass-edit-control") {
        if (!event.target.checked) {
            // If the checkbox has been unchecked we may need to remove highlighting from tabs
            $8d51a9873394e4eb$var$deselectTabs(event.target);
            return;
        }
    }
    const meChk = $(event.target).closest(".form-group").find(".mass-edit-checkbox input");
    meChk.prop("checked", true);
    // Highlight tabs if they exist
    $8d51a9873394e4eb$var$selectTabs(meChk[0]);
    // Immediately update the placeables
    if (this && this.options.massEdit && this._performOnInputChangeUpdate && this.modUpdate) this._performOnInputChangeUpdate();
}
function $8d51a9873394e4eb$var$selectTabs(target) {
    const tab = $(target).parent().closest("div.tab, div.matt-tab");
    if (tab.length) {
        tab.siblings("nav.tabs").find(`[data-tab="${tab.attr("data-tab")}"]`).addClass("mass-edit-tab-selected");
        $8d51a9873394e4eb$var$selectTabs(tab[0]);
    }
}
function $8d51a9873394e4eb$var$deselectTabs(target) {
    const tab = $(target).parent().closest("div.tab, div.matt-tab");
    if (tab.length && tab.find(".mass-edit-checkbox input:checked").length === 0) {
        tab.siblings("nav.tabs").find(`[data-tab="${tab.attr("data-tab")}"]`).removeClass("mass-edit-tab-selected");
        $8d51a9873394e4eb$var$deselectTabs(tab[0]);
    }
}
function $8d51a9873394e4eb$export$de8c6f734ca56d8f(obj, docName) {
    const data = foundry.utils.flattenObject((0, $32e43d7a62aba58c$export$7a171f172be0782e)(obj).toObject());
    // Special processing for some placeable types
    // Necessary when form data is not directly mappable to placeable
    (0, $59fc6fe4c07de9fd$export$d5bbc12fef4eed7f).dataToForm(docName, obj, data);
    return data;
}
// Merge all data and determine what is common between the docs
function $8d51a9873394e4eb$var$getCommonDocData(docs, docName) {
    if (!docName) (0, $32e43d7a62aba58c$export$c29f08336649747)(docs[0]);
    const objects = docs.map((d)=>$8d51a9873394e4eb$export$de8c6f734ca56d8f(d, docName));
    return (0, $32e43d7a62aba58c$export$a88e9f7fc35c8ffa)(objects);
}
const $8d51a9873394e4eb$export$3800f10fd10126e9 = ()=>{
    let MEF = $8d51a9873394e4eb$export$69134d6aac39cf4e(DocumentOwnershipConfig);
    class MassPermissions extends MEF {
        constructor(target, docs, options = {}){
            // Generate common permissions
            const data = (0, $32e43d7a62aba58c$export$7a171f172be0782e)(docs[0]);
            const commonData = foundry.utils.flattenObject(data.ownership);
            const metaLevels = CONST.DOCUMENT_META_OWNERSHIP_LEVELS;
            // Permissions are only present if they differ from default, for simplicity simple add them before comparing
            const addMissingPerms = function(perms) {
                game.users.forEach((u)=>{
                    if (!(u.id in perms)) perms[u.id] = metaLevels.DEFAULT;
                });
                if (!("default" in perms)) perms.default = metaLevels.DEFAULT;
            };
            addMissingPerms(commonData);
            for(let i = 1; i < docs.length; i++){
                const data = (0, $32e43d7a62aba58c$export$7a171f172be0782e)(docs[i]);
                const flatData = foundry.utils.flattenObject(data.ownership);
                addMissingPerms(flatData);
                const diff = foundry.utils.flattenObject(foundry.utils.diffObject(commonData, flatData));
                for (const k of Object.keys(diff))delete commonData[k];
            }
            options.commonData = commonData;
            options.massPermissions = true;
            super(target, docs, options);
        }
        async _updateObject(event, formData) {
            const selectedFields = this.getSelectedFields(formData);
            const metaLevels = CONST.DOCUMENT_META_OWNERSHIP_LEVELS;
            if (foundry.utils.isEmpty(selectedFields)) return;
            const ids = new Set();
            const updates = [];
            for (const d of this.meObjects)if (!ids.has(d.id)) {
                const data = (0, $32e43d7a62aba58c$export$7a171f172be0782e)(d);
                const ownership = foundry.utils.deepClone(data.ownership);
                for (let [user, level] of Object.entries(selectedFields))if (level === metaLevels.DEFAULT) delete ownership[user];
                else ownership[user] = level;
                ids.add(d.id);
                updates.push({
                    _id: d.id,
                    ownership: ownership
                });
            }
            this.meObjects[0].constructor.updateDocuments(updates, {
                diff: false,
                recursive: false,
                noHook: true
            });
        }
        get title() {
            return `Mass-${this.documentName} PERMISSIONS EDIT [ ${this.meObjects.length} ]`;
        }
    }
    return MassPermissions;
};
// ==================================
// ========== CLIPBOARD =============
// ==================================
const $8d51a9873394e4eb$var$CLIPBOARD = {};
function $8d51a9873394e4eb$export$2cdf1b96a9f86d16(preset, command, isPrototype) {
    $8d51a9873394e4eb$var$CLIPBOARD[preset.documentName] = preset;
    // Special handling for Actors/Tokens
    if (preset.documentName === "Token" && isPrototype) $8d51a9873394e4eb$var$CLIPBOARD["TokenProto"] = preset;
    else if (preset.documentName === "Token") {
        if (command === "copyProto") {
            delete $8d51a9873394e4eb$var$CLIPBOARD["Token"];
            $8d51a9873394e4eb$var$CLIPBOARD["TokenProto"] = preset;
        }
    }
    // Also copy the fields to the game clipboard as plain text
    game.clipboard.copyPlainText(JSON.stringify(foundry.utils.deepClone(preset.data.length === 1 ? preset.data[0] : preset.data), null, 2));
    ui.notifications.info((0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("clipboard.copy", {
        document: preset.documentName
    }));
}
function $8d51a9873394e4eb$export$9ffa5d419081ba23(docName) {
    delete $8d51a9873394e4eb$var$CLIPBOARD[docName];
    if (docName === "Token") delete $8d51a9873394e4eb$var$CLIPBOARD["TokenProto"];
}
function $8d51a9873394e4eb$export$33e5d9c131e68cf2(docName) {
    return $8d51a9873394e4eb$var$CLIPBOARD[docName];
}




class $9246b9d7680c2c9c$export$59bc2e3533b384a0 {
    static app;
    static deactivateCallback;
    // @type {Preset}
    static preset;
    static brushOverlay;
    static updatedPlaceables = new Map();
    static hoveredPlaceables = new Set();
    static hoveredPlaceable;
    static documentName;
    static active = false;
    static hitTest;
    static registered3dListener = false;
    static #_ = (()=>{
        this._boundOn3DBrushClick = this._on3DBrushClick.bind(this);
        this._boundOn3dMouseMove = this._on3dMouseMove.bind(this);
    })();
    static _performBrushDocumentUpdate(pos, placeable) {
        if (pos) this._animateCrossTranslate(pos.x, pos.y);
        (0, $8d51a9873394e4eb$export$85a626beb2f6e17a)([
            placeable
        ], this.preset, true, true);
        this.updatedPlaceables.set(placeable.id, placeable);
    }
    static _hitTestWall(point, wall) {
        return wall.line.hitArea.contains(point.x, point.y);
    }
    static _hitTestControlIcon(point, placeable) {
        return Number.between(point.x, placeable.x - placeable.controlIcon.width / 2, placeable.x + placeable.controlIcon.width / 2) && Number.between(point.y, placeable.y - placeable.controlIcon.height / 2, placeable.y + placeable.controlIcon.height / 2);
    }
    static _hitTestTile(point, placeable) {
        const foreground = ui.controls.control.foreground ?? false;
        if (placeable.document.overhead !== foreground) return false;
        return this._hitTestArea(point, placeable);
    }
    static _hoverTestArea(placeable) {
        return this.hoveredPlaceable && this.hoveredPlaceable.hitArea.width * this.hoveredPlaceable.hitArea.height > placeable.hitArea.width * placeable.hitArea.height;
    }
    static _hitTestArea(point, placeable) {
        return Number.between(point.x, placeable.x, placeable.x + placeable.hitArea.width) && Number.between(point.y, placeable.y, placeable.y + placeable.hitArea.height);
    }
    static _onBrushMove(event) {
        const pos = event.data.getLocalPosition(this.brushOverlay);
        const layer = canvas.getLayerByEmbeddedName(this.documentName);
        this._clearHover(event, pos);
        for (const p of layer.placeables)if (p.visible && this.hitTest(pos, p) && !this.updatedPlaceables.has(p.id) && this.hoveredPlaceable !== p) {
            if (this.hoverTest?.(p)) {
                this.hoveredPlaceable._onHoverOut(event);
                this.hoveredPlaceable = p;
            } else if (!this.hoverTest && this.hoveredPlaceable && this.hoveredPlaceable !== p) {
                this.hoveredPlaceable._onHoverOut(event);
                this.hoveredPlaceable = p;
            } else if (!this.hoveredPlaceable) this.hoveredPlaceable = p;
            this.hoveredPlaceable._onHoverIn(event);
        }
    }
    static _clearHover(event, pos, force = false) {
        if (this.hoveredPlaceable) {
            if (force || !this.hoveredPlaceable.visible || !this.hitTest(pos, this.hoveredPlaceable)) {
                this.hoveredPlaceable._onHoverOut(event);
                this.hoveredPlaceable = null;
            }
        }
    }
    static _onBrushClickMove(event) {
        if (this.hoveredPlaceable && this.hoveredPlaceable.visible && !this.updatedPlaceables.has(this.hoveredPlaceable.id)) this._performBrushDocumentUpdate(event.data.getLocalPosition(this.brushOverlay), this.hoveredPlaceable);
    }
    static _on3DBrushClick(event) {
        if (this.brush3d) {
            const p = game.Levels3DPreview.interactionManager.currentHover?.placeable;
            if (p && p.document.documentName === this.documentName) {
                game.Levels3DPreview.interactionManager._downCameraPosition.set(0, 0, 0);
                this._performBrushDocumentUpdate(null, p);
            }
            this.updatedPlaceables.clear();
        }
    }
    static refreshPreset() {
        if (this.active && this.app) this.preset = new (0, $d0a1f06830d69799$export$3463c369d5cc977f)({
            documentName: this.documentName,
            data: this.app.getSelectedFields(),
            randomize: this.app.randomizeFields,
            addSubtract: this.app.addSubtractFields
        });
    }
    /**
   * @param {Object} options
   * @param {MassEditForm} options.app
   * @param {Preset} options.preset
   * @returns
   */ static activate({ app: app = null, preset: preset = null, deactivateCallback: deactivateCallback = null } = {}) {
        if (this.deactivate() || !canvas.ready) return false;
        if (!app && !preset) return false;
        if (this.brushOverlay) this.brushOverlay.destroy(true);
        // Setup fields to be used for updates
        this.app = app;
        this.preset = preset;
        this.deactivateCallback = deactivateCallback;
        if (this.app) this.documentName = this.app.documentName;
        else this.documentName = this.preset.documentName;
        this.updatedPlaceables.clear();
        const interaction = canvas.app.renderer.events;
        if (!interaction.cursorStyles["brush"]) interaction.cursorStyles["brush"] = `url('modules/${0, $32e43d7a62aba58c$export$59dbefa3c1eecdf}/images/brush_icon.png'), auto`;
        this.active = true;
        this.refreshPreset();
        if (game.Levels3DPreview?._active) return this._activate3d();
        // Determine hit test test function to be used for pointer hover detection
        switch(this.documentName){
            case "Wall":
                this.hitTest = this._hitTestWall;
                break;
            case "AmbientLight":
            case "MeasuredTemplate":
            case "AmbientSound":
            case "Note":
                this.hitTest = this._hitTestControlIcon;
                break;
            case "Tile":
                this.hitTest = this._hitTestTile;
                this.hoverTest = this._hoverTestArea;
                break;
            default:
                this.hitTest = this._hitTestArea;
                this.hoverTest = this._hoverTestArea;
        }
        // Create the brush overlay
        this.brushOverlay = new PIXI.Container();
        this.brushOverlay.hitArea = canvas.dimensions.rect;
        this.brushOverlay.cursor = "brush";
        this.brushOverlay.interactive = true;
        this.brushOverlay.zIndex = Infinity;
        this.brushOverlay.on("mousemove", (event)=>{
            this._onBrushMove(event);
            if (event.buttons === 1) this._onBrushClickMove(event);
        });
        this.brushOverlay.on("mouseup", (event)=>{
            if (event.nativeEvent.which !== 2) this._onBrushClickMove(event);
            this.updatedPlaceables.clear();
        });
        this.brushOverlay.on("click", (event)=>{
            if (event.nativeEvent.which == 2) this.deactivate();
        });
        canvas.stage.addChild(this.brushOverlay);
        // Disable canvas events to prevent selects and object placements on click
        canvas.mouseInteractionManager.permissions.clickLeft = false;
        // canvas.mouseInteractionManager.permissions.longPress = false;
        return true;
    }
    static brush3dDelayMoveTimer;
    static _on3dMouseMove() {
        if (!this.brush3d || this.brush3dDelayMoveTimer) return;
        const brush = this;
        this.brush3dDelayMoveTimer = setTimeout(function() {
            const mPos = game.Levels3DPreview.interactionManager.canvas3dMousePosition;
            const cPos = game.Levels3DPreview.interactionManager.camera.position;
            const intersects = game.Levels3DPreview.interactionManager.computeSightCollisionFrom3DPositions(cPos, mPos, "collision", false, false, false, true);
            if (intersects[0]) {
                const intersect = intersects[0];
                brush.brush3d.position.set(intersect.point.x, intersect.point.y, intersect.point.z);
            }
            brush.brush3dDelayMoveTimer = null;
        }, 100); // Will do the ajax stuff after 1000 ms, or 1 s
    }
    static deactivate3DListeners() {
        game.Levels3DPreview.renderer.domElement.removeEventListener("click", this._boundOn3DBrushClick, false);
        game.Levels3DPreview.renderer.domElement.removeEventListener("mousemove", this._boundOn3dMouseMove, false);
    }
    static _activate3DListeners() {
        // Remove listeners if they are already set
        this.deactivate3DListeners();
        game.Levels3DPreview.renderer.domElement.addEventListener("click", this._boundOn3DBrushClick, false);
        game.Levels3DPreview.renderer.domElement.addEventListener("mousemove", this._boundOn3dMouseMove, false);
    }
    static _activate3d() {
        const THREE = game.Levels3DPreview.THREE;
        if (!this.brush3d) {
            this.brush3d = new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 8), new THREE.MeshBasicMaterial({
                opacity: 0.5,
                transparent: true,
                color: 0x00ff00,
                wireframe: true
            }));
            this.brush3d.userData.interactive = false;
            this.brush3d.userData.ignoreHover = true;
            const mPos = game.Levels3DPreview.interactionManager.canvas3dMousePosition;
            this.brush3d.position.set(mPos.x, mPos.y, mPos.z);
            game.Levels3DPreview.scene.add(this.brush3d);
        }
        // Activate listeners
        this._activate3DListeners();
        return true;
    }
    static deactivate() {
        if (this.active) {
            canvas.mouseInteractionManager.permissions.clickLeft = true;
            //canvas.mouseInteractionManager.permissions.longPress = true;
            if (this.brushOverlay) this.brushOverlay.parent?.removeChild(this.brushOverlay);
            if (this.brush3d && game.Levels3DPreview?._active) {
                game.Levels3DPreview.scene.remove(this.brush3d);
                this.brush3d = null;
                this.deactivate3DListeners();
            }
            this.active = false;
            this.updatedPlaceables.clear();
            this._clearHover(null, null, true);
            this.hoverTest = null;
            this.deactivateCallback?.();
            this.deactivateCallback = null;
            this.app = null;
            this.preset = null;
            return true;
        }
    }
    static async _animateCrossTranslate(x, y) {
        let cross = new PIXI.Text("+", {
            fontFamily: "Arial",
            fontSize: 11,
            fill: 0x00ff11,
            align: "center"
        });
        cross = this.brushOverlay.addChild(cross);
        cross.x = x + Math.random() * 16 - 8;
        cross.y = y;
        const translate = [
            {
                parent: cross,
                attribute: "y",
                to: y - 50
            }
        ];
        const completed = await CanvasAnimation.animate(translate, {
            duration: 700,
            name: foundry.utils.randomID(5)
        });
        if (completed) this.brushOverlay.removeChild(cross).destroy();
    }
}



/**
 * A collection of functions related to sorting objects within a parent container.
 */ class $e9281f67fc14638a$export$355a29a68ae3606b {
    /**
   * Given a source object to sort, a target to sort relative to, and an Array of siblings in the container:
   * Determine the updated sort keys for the source object, or all siblings if a reindex is required.
   * Return an Array of updates to perform, it is up to the caller to dispatch these updates.
   * Each update is structured as:
   * {
   *   target: object,
   *   update: {sortKey: sortValue}
   * }
   *
   * @param {object} source       The source object being sorted
   * @param {object} [options]    Options which modify the sort behavior
   * @param {object|null} [options.target]  The target object relative which to sort
   * @param {object[]} [options.siblings]   The Array of siblings which the source should be sorted within
   * @param {string} [options.sortKey=sort] The property name within the source object which defines the sort key
   * @param {boolean} [options.sortBefore]  Explicitly sort before (true) or sort after( false).
   *                                        If undefined the sort order will be automatically determined.
   * @returns {object[]}          An Array of updates for the caller of the helper function to perform
   */ static performIntegerSort(source, { target: target = null, siblings: siblings = [], sortKey: sortKey = "sort", sortBefore: sortBefore } = {}) {
        // Automatically determine the sorting direction
        if (sortBefore === undefined) sortBefore = (source[sortKey] || 0) > (target?.[sortKey] || 0);
        // Ensure the siblings are sorted
        siblings = Array.from(siblings);
        siblings.sort((a, b)=>a[sortKey] - b[sortKey]);
        // Determine the index target for the sort
        let defaultIdx = sortBefore ? siblings.length : 0;
        let idx = target ? siblings.findIndex((sib)=>sib === target) : defaultIdx;
        // Determine the indices to sort between
        let min, max;
        if (sortBefore) [min, max] = this._sortBefore(siblings, idx, sortKey);
        else [min, max] = this._sortAfter(siblings, idx, sortKey);
        // Easiest case - no siblings
        if (siblings.length === 0) return [
            {
                target: source,
                update: {
                    [sortKey]: CONST.SORT_INTEGER_DENSITY
                }
            }
        ];
        else if (Number.isFinite(max) && min === null) return [
            {
                target: source,
                update: {
                    [sortKey]: max - CONST.SORT_INTEGER_DENSITY
                }
            }
        ];
        else if (Number.isFinite(min) && max === null) return [
            {
                target: source,
                update: {
                    [sortKey]: min + CONST.SORT_INTEGER_DENSITY
                }
            }
        ];
        else if (Number.isFinite(min) && Number.isFinite(max) && Math.abs(max - min) > 1) return [
            {
                target: source,
                update: {
                    [sortKey]: Math.round(0.5 * (min + max))
                }
            }
        ];
        else {
            siblings.splice(idx + (sortBefore ? 0 : 1), 0, source);
            return siblings.map((sib, i)=>{
                return {
                    target: sib,
                    update: {
                        [sortKey]: (i + 1) * CONST.SORT_INTEGER_DENSITY
                    }
                };
            });
        }
    }
    static performIntegerSortMulti(sources, { target: target = null, siblings: siblings = [], sortKey: sortKey = "sort", sortBefore: sortBefore } = {}) {
        let source = sources[0];
        // Automatically determine the sorting direction
        if (sortBefore === undefined) sortBefore = (source[sortKey] || 0) > (target?.[sortKey] || 0);
        // Ensure the siblings are sorted
        siblings = Array.from(siblings);
        siblings.sort((a, b)=>a[sortKey] - b[sortKey]);
        // Determine the index target for the sort
        let defaultIdx = sortBefore ? siblings.length : 0;
        let idx = target ? siblings.findIndex((sib)=>sib === target) : defaultIdx;
        // Determine the indices to sort between
        let min, max;
        if (sortBefore) [min, max] = this._sortBefore(siblings, idx, sortKey);
        else [min, max] = this._sortAfter(siblings, idx, sortKey);
        // Easiest case - no siblings
        if (siblings.length === 0) return sources.map((s, i)=>{
            return {
                target: s,
                update: {
                    [sortKey]: CONST.SORT_INTEGER_DENSITY * (i + 1)
                }
            };
        });
        else if (Number.isFinite(max) && min === null) return sources.map((s, i)=>{
            return {
                target: s,
                update: {
                    [sortKey]: max - CONST.SORT_INTEGER_DENSITY * (sources.length - i + 1)
                }
            };
        });
        else if (Number.isFinite(min) && max === null) return sources.map((s, i)=>{
            return {
                target: s,
                update: {
                    [sortKey]: min + CONST.SORT_INTEGER_DENSITY * (i + 1)
                }
            };
        });
        else if (Number.isFinite(min) && Number.isFinite(max) && Math.abs(max - min) > sources.length) {
            let increment = Math.floor(1 / (sources.length + 1) * Math.abs(max - min));
            if (increment === 0) increment = 1;
            min = Math.min(max, min);
            return sources.map((s, i)=>{
                return {
                    target: s,
                    update: {
                        [sortKey]: min + increment * (i + 1)
                    }
                };
            });
        } else {
            siblings.splice(idx + (sortBefore ? 0 : 1), 0, ...sources);
            return siblings.map((sib, i)=>{
                return {
                    target: sib,
                    update: {
                        [sortKey]: (i + 1) * CONST.SORT_INTEGER_DENSITY
                    }
                };
            });
        }
    }
    /* -------------------------------------------- */ /**
   * Given an ordered Array of siblings and a target position, return the [min,max] indices to sort before the target
   * @private
   */ static _sortBefore(siblings, idx, sortKey) {
        let max = siblings[idx] ? siblings[idx][sortKey] : null;
        let min = siblings[idx - 1] ? siblings[idx - 1][sortKey] : null;
        return [
            min,
            max
        ];
    }
    /* -------------------------------------------- */ /**
   * Given an ordered Array of siblings and a target position, return the [min,max] indices to sort after the target
   * @private
   */ static _sortAfter(siblings, idx, sortKey) {
        let min = siblings[idx] ? siblings[idx][sortKey] : null;
        let max = siblings[idx + 1] ? siblings[idx + 1][sortKey] : null;
        return [
            min,
            max
        ];
    }
}







const $d0a1f06830d69799$var$META_INDEX_FIELDS = [
    "id",
    "img",
    "documentName"
];
const $d0a1f06830d69799$var$META_INDEX_ID = "MassEditMetaData";
const $d0a1f06830d69799$export$2a34b6e4e19d9a25 = "world.mass-edit-presets-main";
const $d0a1f06830d69799$var$DOCUMENT_FIELDS = [
    "id",
    "name",
    "sort",
    "folder"
];
// const FLAG_DATA = {
//   documentName: null,
//   data: null,
//   addSubtract: null,
//   randomize: null,
// };
const $d0a1f06830d69799$var$PRESET_FIELDS = [
    "id",
    "name",
    "data",
    "sort",
    "folder",
    "uuid",
    "documentName",
    "addSubtract",
    "randomize",
    "img",
    "gridSize",
    "modifyOnSpawn",
    "preSpawnScript",
    "postSpawnScript",
    "spawnRandom",
    "attached"
];
class $d0a1f06830d69799$export$3463c369d5cc977f {
    static name = "Preset";
    document;
    constructor(data){
        this.id = data.id ?? data._id ?? foundry.utils.randomID();
        this.name = data.name ?? "Mass Edit Preset";
        this.documentName = data.documentName;
        this.sort = data.sort ?? 0;
        this.addSubtract = data.addSubtract instanceof Array ? Object.fromEntries(data.addSubtract) : foundry.utils.deepClone(data.addSubtract ?? {});
        this.randomize = data.randomize instanceof Array ? Object.fromEntries(data.randomize) : foundry.utils.deepClone(data.randomize ?? {});
        this.data = foundry.utils.deepClone(data.data);
        this.img = data.img;
        this.folder = data.folder;
        this.uuid = data.uuid;
        this.gridSize = data.gridSize;
        this.modifyOnSpawn = data.modifyOnSpawn;
        this.preSpawnScript = data.preSpawnScript;
        this.postSpawnScript = data.postSpawnScript;
        this.attached = data.attached;
        this.spawnRandom = data.spawnRandom;
        this._visible = true;
    }
    get icon() {
        return $d0a1f06830d69799$var$DOC_ICONS[this.documentName] ?? $d0a1f06830d69799$var$DOC_ICONS.DEFAULT;
    }
    get thumbnail() {
        return this.img || CONST.DEFAULT_TOKEN;
    }
    get pages() {
        if (this.document?.pages.size) return this.document.toJSON().pages;
        else if (this._pages) return this._pages;
        return null;
    }
    set data(data) {
        if (data instanceof Array) this._data = data;
        else if (data == null) this._data = null;
        else this._data = [
            data
        ];
    }
    get isPlaceable() {
        return (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(this.documentName);
    }
    get data() {
        return this._data;
    }
    /**
   * Loads underlying JournalEntry document from the compendium
   * @returns this
   */ async load() {
        if (!this.document && this.uuid) {
            this.document = await fromUuid(this.uuid);
            if (this.document) {
                const preset = this.document.getFlag((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "preset") ?? {};
                this.documentName = preset.documentName;
                this.img = preset.img;
                this.data = preset.data;
                this.randomize = foundry.utils.getType(preset.randomize) === "Object" ? preset.randomize : Object.fromEntries(preset.randomize ?? []);
                this.addSubtract = foundry.utils.getType(preset.addSubtract) === "Object" ? preset.addSubtract : Object.fromEntries(preset.addSubtract ?? []);
                this.gridSize = preset.gridSize;
                this.modifyOnSpawn = preset.modifyOnSpawn;
                this.preSpawnScript = preset.preSpawnScript;
                this.postSpawnScript = preset.postSpawnScript;
                this.attached = preset.attached;
                this.spawnRandom = preset.spawnRandom;
            }
        }
        return this;
    }
    async openJournal() {
        if (!this.document) await this.load();
        if (this.document) this.document.sheet.render(true);
    }
    /**
   * Attach placeables
   * @param {Placeable|Array[Placeable]} placeables
   * @returns
   */ async attach(placeables) {
        if (!placeables) return;
        if (!(placeables instanceof Array)) placeables = [
            placeables
        ];
        if (!this.attached) this.attached = [];
        for (const placeable of placeables)this.attached.push({
            documentName: placeable.document.documentName,
            data: $d0a1f06830d69799$var$placeableToData(placeable)
        });
        await this.update({
            attached: this.attached
        });
    }
    /**
   * Update preset with the provided data
   * @param {Object} update
   */ async update(update) {
        if (this.document) {
            const flagUpdate = {};
            Object.keys(update).forEach((k)=>{
                if (k === "randomize" || k === "addSubtract") {
                    flagUpdate[k] = Object.entries(update[k]);
                    this[k] = update[k];
                } else if (k === "data" && !(update.data instanceof Array)) {
                    flagUpdate.data = this.data.map((d)=>{
                        return foundry.utils.mergeObject(d, update.data);
                    });
                    this.data = flagUpdate.data;
                } else if ($d0a1f06830d69799$var$PRESET_FIELDS.includes(k) && update[k] !== this[k]) {
                    flagUpdate[k] = update[k];
                    this[k] = update[k];
                }
            });
            if (!foundry.utils.isEmpty(flagUpdate)) {
                const docUpdate = {
                    flags: {
                        [(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)]: {
                            preset: flagUpdate
                        }
                    }
                };
                $d0a1f06830d69799$var$DOCUMENT_FIELDS.forEach((field)=>{
                    if (field in flagUpdate && this.document[field] !== flagUpdate[field]) docUpdate[field] = flagUpdate[field];
                });
                await this.document.update(docUpdate);
            }
            await this._updateIndex(flagUpdate);
        } else console.warn("Updating preset without document", this.id, this.uuid, this.name);
    }
    async _updateIndex(data) {
        const update = {};
        $d0a1f06830d69799$var$META_INDEX_FIELDS.forEach((field)=>{
            if (field in data) update[field] = data[field];
        });
        if (!foundry.utils.isEmpty(update)) {
            const pack = game.packs.get(this.document.pack);
            const metaDoc = await pack.getDocument($d0a1f06830d69799$var$META_INDEX_ID);
            if (metaDoc) {
                let tmp = {};
                tmp[this.id] = update;
                await metaDoc.setFlag((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "index", tmp);
            } else {
                console.warn(`META INDEX missing in ${this.document.pack}`);
                return;
            }
        }
    }
    toJSON() {
        let json = {};
        $d0a1f06830d69799$var$PRESET_FIELDS.forEach((field)=>{
            json[field] = this[field];
        });
        json.randomize = Object.entries(json.randomize ?? {});
        json.addSubtract = Object.entries(json.addSubtract ?? []);
        const pages = this.pages;
        if (pages) json.pages = pages;
        return json;
    }
    clone() {
        const clone = new $d0a1f06830d69799$export$3463c369d5cc977f(this.toJSON());
        clone.document = this.document;
        return clone;
    }
}
class $d0a1f06830d69799$export$9cea25aeb7365a59 {
    static presets;
    static workingPack;
    static async getTree(type, mainOnly = false) {
        const pack = await this._initCompendium(this.workingPack);
        const mainTree = await this.packToTree(pack, type);
        const staticFolders = [];
        if (!mainOnly) {
            let sort = 0;
            for (const p of game.packs)if (p.collection !== this.workingPack && p.index.get($d0a1f06830d69799$var$META_INDEX_ID)) {
                const tree = await this.packToTree(p, type);
                if (!tree.hasVisible) continue;
                const topFolder = {
                    id: p.collection,
                    uuid: p.collection,
                    name: p.title,
                    sorting: "m",
                    color: "#000000",
                    sort: sort++,
                    children: tree.folders.map((f)=>{
                        f.folder = p.collection;
                        return f;
                    }),
                    presets: tree.presets,
                    draggable: false,
                    expanded: $d0a1f06830d69799$export$511ed1dd332818c6.expanded(p.collection),
                    folder: null,
                    visible: true
                };
                staticFolders.push(topFolder);
                // Collate all folders with the main tree
                mainTree.allFolders.set(topFolder.uuid, topFolder);
                for (const [uuid, folder] of tree.allFolders)mainTree.allFolders.set(uuid, folder);
            }
        }
        mainTree.staticFolders = staticFolders;
        return mainTree;
    }
    static async packToTree(pack, type) {
        if (!pack) return null;
        // Setup folders ready for parent/children processing
        const folders = new Map();
        const topLevelFolders = new Map();
        const folderContents = pack.folders.contents;
        for (const f of folderContents){
            folders.set(f.uuid, {
                id: f._id,
                uuid: f.uuid,
                name: f.name,
                sorting: f.sorting,
                color: f.color,
                sort: f.sort,
                children: [],
                presets: [],
                draggable: f.pack === this.workingPack,
                expanded: $d0a1f06830d69799$export$511ed1dd332818c6.expanded(f.uuid),
                folder: f.folder?.uuid,
                visible: type ? (f.flags[0, $32e43d7a62aba58c$export$59dbefa3c1eecdf]?.types || [
                    "ALL"
                ]).includes(type) : true
            });
            topLevelFolders.set(f.uuid, folders.get(f.uuid));
        }
        // If folders have parent folders add them as children and remove them as a top level folder
        for (const f of folderContents)if (f.folder) {
            const parent = folders.get(f.folder.uuid);
            parent.children.push(folders.get(f.uuid));
            topLevelFolders.delete(f.uuid);
        }
        // Process presets
        const allPresets = [];
        const topLevelPresets = [];
        let hasVisible = false; // tracks whether there exists at least one visible preset within this tree
        let metaIndex = (await pack.getDocument($d0a1f06830d69799$var$META_INDEX_ID))?.getFlag((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "index");
        const index = pack.index.contents;
        for (const idx of index){
            if (idx._id === $d0a1f06830d69799$var$META_INDEX_ID) continue;
            const mIndex = metaIndex[idx._id];
            const preset = new $d0a1f06830d69799$export$3463c369d5cc977f({
                ...idx,
                ...mIndex,
                pack: pack.collection
            });
            // If no document name is available (missing metadata) attempt to load the preset to retrieve it
            // If still no name is found, skip it
            if (!preset.documentName) {
                console.log(`Missing MetaData. Attempting document load: ${preset.id} | ${preset.name}`);
                await preset.load();
                if (!preset.documentName) continue;
            }
            if (preset.folder) {
                let matched = false;
                for (const [uuid, folder] of folders)if (folder.id === preset.folder) {
                    folder.presets.push(preset);
                    matched = true;
                    break;
                }
                if (!matched) topLevelPresets.push(preset);
            } else topLevelPresets.push(preset);
            if (type) {
                if (type === "ALL") {
                    if (!(0, $32e43d7a62aba58c$export$6ba969594e8d224d).includes(preset.documentName)) preset._visible = false;
                } else if (preset.documentName !== type) preset._visible = false;
            }
            allPresets.push(preset);
            hasVisible |= preset._visible;
        }
        // Sort folders
        const sorting = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSortMode") === "manual" ? "m" : "a";
        const sortedFolders = this._sortFolders(Array.from(topLevelFolders.values()), sorting);
        const sortedPresets = this._sortPresets(topLevelPresets, sorting);
        return {
            folders: sortedFolders,
            presets: sortedPresets,
            allPresets: allPresets,
            allFolders: folders,
            hasVisible: hasVisible
        };
    }
    static _sortFolders(folders, sorting = "a") {
        for (const folder of folders){
            folder.children = this._sortFolders(folder.children, folder.sorting);
            folder.presets = this._sortPresets(folder.presets, folder.sorting);
        }
        if (sorting === "a") return folders.sort((f1, f2)=>f1.name.localeCompare(f2.name, "en", {
                numeric: true
            }));
        else return folders.sort((f1, f2)=>f1.sort - f2.sort);
    }
    static _sortPresets(presets, sorting = "a") {
        if (sorting === "a") return presets.sort((p1, p2)=>p1.name.localeCompare(p2.name, "en", {
                numeric: true
            }));
        else return presets.sort((p1, p2)=>p1.sort - p2.sort);
    }
    static async packToPresets(pack) {
        if (!pack) return [];
        const presets = [];
        let metaIndex = (await pack.getDocument($d0a1f06830d69799$var$META_INDEX_ID))?.getFlag((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "index");
        const index = pack.index.contents;
        for (const idx of index){
            if (idx._id === $d0a1f06830d69799$var$META_INDEX_ID) continue;
            const mIndex = metaIndex[idx._id];
            const preset = new $d0a1f06830d69799$export$3463c369d5cc977f({
                ...idx,
                ...mIndex,
                pack: pack.collection
            });
            presets.push(preset);
        }
        return presets;
    }
    static async update(preset) {
        const compendium = await this._initCompendium(this.workingPack);
        const doc = await compendium.getDocument(preset.id);
        const updateDoc = {
            name: preset.name,
            flags: {
                [(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)]: {
                    preset: preset.toJSON()
                }
            }
        };
        const pages = preset.pages;
        if (pages) updateDoc.pages = pages;
        await doc.update(updateDoc);
        const metaDoc = await this._initMetaDocument(this.workingPack);
        const update = {};
        update[preset.id] = {
            id: preset.id,
            img: preset.img,
            documentName: preset.documentName
        };
        await metaDoc.setFlag((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "index", update);
    }
    /**
   * Update multiple presets at the same time
   * @param {*} updates
   */ static async updatePresets(updates) {
        // TODO update meta and preset itself
        await JournalEntry.updateDocuments(updates, {
            pack: this.workingPack
        });
    }
    /**
   * @param {Preset|Array[Preset]} preset
   */ static async set(preset, pack) {
        if (!pack) pack = this.workingPack;
        if (preset instanceof Array) {
            for (const p of preset)await $d0a1f06830d69799$export$9cea25aeb7365a59.set(p, pack);
            return;
        }
        const compendium = await this._initCompendium(pack);
        if (compendium.index.get(preset.id)) {
            await this.update(preset);
            return;
        }
        const documents1 = await JournalEntry.createDocuments([
            {
                _id: preset.id,
                name: preset.name,
                pages: preset.pages ?? [],
                folder: preset.folder,
                flags: {
                    [(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)]: {
                        preset: preset.toJSON()
                    }
                }
            }
        ], {
            pack: pack,
            keepId: true
        });
        preset.uuid = documents1[0].uuid;
        preset.document = documents1[0];
        const metaDoc = await this._initMetaDocument(pack);
        const update = {};
        update[preset.id] = {
            id: preset.id,
            img: preset.img,
            documentName: preset.documentName
        };
        await metaDoc.setFlag((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "index", update);
    }
    static async get(uuid, { full: full = true } = {}) {
        let { collection: collection, documentId: documentId, documentType: documentType, embedded: embedded, doc: doc } = foundry.utils.parseUuid(uuid);
        const index = collection.index.get(documentId);
        if (index) {
            const metaIndex = (await collection.getDocument($d0a1f06830d69799$var$META_INDEX_ID))?.getFlag((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "index");
            const mIndex = metaIndex[index._id];
            const preset = new $d0a1f06830d69799$export$3463c369d5cc977f({
                ...index,
                ...mIndex,
                pack: collection.collection
            });
            if (full) await preset.load();
            return preset;
        }
        return null;
    }
    /**
   * @param {Preset|Array[Preset]} preset
   */ static async delete(presets) {
        if (!presets) return;
        if (!(presets instanceof Array)) presets = [
            presets
        ];
        // Sort by compendium
        const sorted = {};
        for (const preset of presets){
            let { collection: collection } = foundry.utils.parseUuid(preset.uuid);
            collection = collection.collection;
            if (!sorted[collection]) sorted[collection] = [
                preset
            ];
            else sorted[collection].push(preset);
        }
        for (const pack of Object.keys(sorted)){
            const compendium = await game.packs.get(pack);
            if (!compendium) continue;
            const metaDoc = await this._initMetaDocument(pack);
            const metaUpdate = {};
            for (const preset of sorted[pack]){
                if (compendium.index.get(preset.id)) {
                    const document = await compendium.getDocument(preset.id);
                    await document.delete();
                }
                metaUpdate["-=" + preset.id] = null;
            }
            metaDoc.setFlag((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "index", metaUpdate);
        }
    }
    static async _initCompendium(pack) {
        let compendium = game.packs.get(pack);
        if (!compendium && pack === $d0a1f06830d69799$export$2a34b6e4e19d9a25) {
            compendium = await CompendiumCollection.createCompendium({
                label: "Mass Edit: Presets (MAIN)",
                type: "JournalEntry",
                ownership: {
                    GAMEMASTER: "NONE",
                    PLAYER: "NONE",
                    ASSISTANT: "NONE"
                },
                packageType: "world"
            });
            await this._initMetaDocument($d0a1f06830d69799$export$2a34b6e4e19d9a25);
        }
        return compendium;
    }
    static async _initMetaDocument(pack) {
        const compendium = game.packs.get(pack);
        const metaDoc = await compendium.getDocument($d0a1f06830d69799$var$META_INDEX_ID);
        if (metaDoc) return metaDoc;
        const documents1 = await JournalEntry.createDocuments([
            {
                _id: $d0a1f06830d69799$var$META_INDEX_ID,
                name: "!!! METADATA: DO NOT DELETE !!!",
                flags: {
                    [(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)]: {
                        index: {}
                    }
                }
            }
        ], {
            pack: pack,
            keepId: true
        });
        return documents1[0];
    }
    static _searchPresetTree(tree, options) {
        const presets = [];
        if (!options.folder) this._searchPresetList(tree.allPresets, presets, options);
        tree.allFolders.forEach((folder)=>this._searchPresetFolder(folder, presets, options));
        return presets;
    }
    static _searchPresetFolder(folder, presets, options) {
        if (options.folder && folder.name !== options.folder) return;
        this._searchPresetList(folder.presets, presets, options, folder.name);
    }
    static _searchPresetList(toSearch, presets, { name: name = null, type: type = null } = {}, folderName) {
        for (const preset of toSearch){
            preset._folderName = folderName;
            if (name && type) {
                if (name === preset.name && type === preset.documentName) presets.push(preset);
            } else if (name) {
                if (name === preset.name) presets.push(preset);
            } else if (type) {
                if (type === preset.documentName) presets.push(preset);
            } else presets.push(preset);
        }
    }
}
class $d0a1f06830d69799$export$619760a5720f8054 {
    static name = "PresetAPI";
    /**
   * Retrieve preset
   * @param {object} [options={}]
   * @param {String} [options.uuid]    Preset UUID
   * @param {String} [options.name]    Preset name
   * @param {String} [options.type]    Preset type ("Token", "Tile", etc)
   * @param {String} [options.folder]  Folder name
   * @returns {Preset}
   */ static async getPreset({ uuid: uuid, name: name, type: type, folder: folder } = {}) {
        if (uuid) return await $d0a1f06830d69799$export$9cea25aeb7365a59.get(uuid);
        else if (!name && !type && !folder) throw Error("UUID, Name, Type, and/or Folder required to retrieve a Preset.");
        const presets = $d0a1f06830d69799$export$9cea25aeb7365a59._searchPresetTree(await $d0a1f06830d69799$export$9cea25aeb7365a59.getTree(), {
            name: name,
            type: type,
            folder: folder
        });
        const preset = presets[Math.floor(Math.random() * presets.length)];
        return preset?.clone().load();
    }
    /**
   * Retrieve presets
   * @param {object} [options={}]
   * @param {String} [options.uuid]    Preset UUID
   * @param {String} [options.name]    Preset name
   * @param {String} [options.type]    Preset type ("Token", "Tile", etc)
   * @param {String} [options.folder]  Folder name
   * @param {String} [options.format]  The form to return placeables in ('preset', 'name', 'nameAndFolder')
   * @returns {Array[Preset]|Array[String]|Array[Object]}
   */ static async getPresets({ uuid: uuid, name: name, type: type, folder: folder, format: format = "preset" } = {}) {
        if (uuid) return await $d0a1f06830d69799$export$9cea25aeb7365a59.get(uuid);
        else if (!name && !type && !folder) throw Error("UUID, Name, Type, and/or Folder required to retrieve a Preset.");
        const presets = $d0a1f06830d69799$export$9cea25aeb7365a59._searchPresetTree(await $d0a1f06830d69799$export$9cea25aeb7365a59.getTree(), {
            name: name,
            type: type,
            folder: folder
        });
        if (format === "name") return presets.map((p)=>p.name);
        else if (format === "nameAndFolder") return presets.map((p)=>{
            return {
                name: p.name,
                folder: p._folderName
            };
        });
        return presets;
    }
    /**
   * Create Presets from passed in placeables
   * @param {PlaceableObject|Array[PlaceableObject]} placeables Placeable/s to create the presets from.
   * @param {object} [options={}]                               Optional Preset information
   * @param {String} [options.name]                             Preset name
   * @param {String} [options.img]                              Preset thumbnail image
   * @returns {Preset|Array[Preset]}
   */ static async createPreset(placeables, options = {}) {
        if (!placeables) return;
        if (!(placeables instanceof Array)) placeables = [
            placeables
        ];
        // Alike placeables will be made into single presets. Lets batch them up together.
        const groups = {};
        for (const placeable of placeables){
            const docName = placeable.document.documentName;
            if (!groups.hasOwnProperty(docName)) groups[docName] = [];
            groups[docName].push(placeable);
        }
        const presets = [];
        for (const [docName, placeables] of Object.entries(groups)){
            const data = [];
            for (const placeable of placeables)data.push($d0a1f06830d69799$var$placeableToData(placeable));
            // Preset data before merging with user provided
            const defPreset = {
                name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.default-name"),
                documentName: docName,
                data: data
            };
            // Assign preset image
            switch(defPreset.documentName){
                case "Token":
                case "Tile":
                case "Note":
                    defPreset.img = data[0].texture.src;
                    break;
                case "AmbientSound":
                    defPreset.img = "icons/svg/sound.svg";
                    break;
                case "AmbientLight":
                    defPreset.img = "icons/svg/light.svg";
                    break;
                case "Drawing":
                    defPreset.img = "icons/svg/acid.svg";
                    break;
                case "MeasuredTemplate":
                    defPreset.img = "icons/svg/circle.svg";
                    break;
            }
            //  Assign preset name
            switch(defPreset.documentName){
                case "Token":
                    defPreset.name = data[0].name;
                    break;
                default:
                    const taggerTag = data[0].flags?.tagger?.tags?.[0];
                    if (taggerTag) defPreset.name = taggerTag;
                    break;
            }
            defPreset.gridSize = placeables[0].document.parent.grid.size;
            foundry.utils.mergeObject(defPreset, options, {
                inplace: true
            });
            const preset = new $d0a1f06830d69799$export$3463c369d5cc977f(defPreset);
            await $d0a1f06830d69799$export$9cea25aeb7365a59.set(preset);
            presets.push(preset);
        }
        return presets;
    }
    /**
   * Spawn a preset on the scene (uuid, name or preset itself are required).
   * By default the current mouse position is used.
   * @param {object} [options={}]
   * @param {Preset} [options.preset]             Preset
   * @param {String} [options.uuid]               Preset UUID
   * @param {String} [options.name]               Preset name
   * @param {String} [options.type]               Preset type ("Token", "Tile", etc)
   * @param {Number} [options.x]                  Spawn canvas x coordinate (mouse position used if x or y are null)
   * @param {Number} [options.y]                  Spawn canvas y coordinate (mouse position used if x or y are null)
   * @param {Number} [options.z]                  Spawn canvas z coordinate (3D Canvas)
   * @param {Boolean} [options.snapToGrid]        If 'true' snaps spawn position to the grid.
   * @param {Boolean} [options.hidden]            If 'true' preset will be spawned hidden.
   * @param {Boolean} [options.layerSwitch]       If 'true' the layer of the spawned preset will be activated.
   * @param {Boolean} [options.scaleToGrid]       If 'true' Tiles, Drawings, and Walls will be scaled relative to grid size.
   * @param {Boolean} [options.modifyPrompt]      If 'true' a field modification prompt will be shown if configured via `Preset Edit > Modify` form
   * @param {Boolean} [options.coordPicker]       If 'true' a crosshair and preview will be enabled allowing spawn position to be picked
   * @param {String} [options.pickerLabel]          Label displayed above crosshair when `coordPicker` is enabled
   * @param {String} [options.taPreview]            Designates the preview placeable when spawning a `Token Attacher` prefab.
   *                                                Accepted values are "ALL" (for all elements) and document name optionally followed by an index number
   *                                                 e.g. "ALL", "Tile", "AmbientLight.1"
   * @returns {Array[Document]}
   */ static async spawnPreset({ uuid: uuid, preset: preset, name: name, type: type, folder: folder, x: x, y: y, z: z, coordPicker: coordPicker = false, pickerLabel: pickerLabel, taPreview: taPreview, snapToGrid: snapToGrid = true, hidden: hidden = false, layerSwitch: layerSwitch = false, scaleToGrid: scaleToGrid = false, modifyPrompt: modifyPrompt = true } = {}) {
        if (!canvas.ready) throw Error("Canvas need to be 'ready' for a preset to be spawned.");
        if (!(uuid || preset || name || type || folder)) throw Error("ID, Name, Folder, or Preset is needed to spawn it.");
        if (!coordPicker && (x == null && y != null || x != null && y == null)) throw Error("Need both X and Y coordinates to spawn a preset.");
        if (preset) await preset.load();
        preset = preset ?? await $d0a1f06830d69799$export$619760a5720f8054.getPreset({
            uuid: uuid,
            name: name,
            type: type,
            folder: folder
        });
        if (!preset) throw Error(`No preset could be found matching: { uuid: "${uuid}", name: "${name}", type: "${type}"}`);
        let presetData = deepClone(preset.data);
        // Instead of using the entire data group use only one random one
        if (preset.spawnRandom && presetData.length) presetData = [
            presetData[Math.floor(Math.random() * presetData.length)]
        ];
        // Display prompt to modify data if needed
        if (modifyPrompt && preset.modifyOnSpawn?.length) {
            presetData = await $d0a1f06830d69799$var$modifySpawnData(presetData, preset.modifyOnSpawn);
            // presetData being returned as null means that the modify field form has been canceled
            // in which case we should cancel spawning as well
            if (presetData == null) return;
        }
        // Populate preset data with default placeable data
        presetData = presetData.map((data)=>{
            return $d0a1f06830d69799$var$mergePresetDataToDefaultDoc(preset, data);
        });
        // Randomize data if needed
        const randomizer = preset.randomize;
        if (!foundry.utils.isEmpty(randomizer)) {
            // Flat data required for randomizer
            presetData = presetData.map((d)=>foundry.utils.flattenObject(d));
            await (0, $3180f13c9e24a345$export$4bafa436c0fa0cbb)(presetData, null, randomizer);
            presetData = presetData.map((d)=>foundry.utils.expandObject(d));
        }
        // Scale dimensions relative to grid size
        if (scaleToGrid) $d0a1f06830d69799$var$scaleDataToGrid(presetData, preset.documentName, preset.gridSize);
        if (preset.preSpawnScript) await (0, $32e43d7a62aba58c$export$9087f1a05b437404)(preset.preSpawnScript, {
            data: presetData
        });
        // Lets sort the preset data as well as any attached placeable data into document groups
        // documentName -> data array
        const docToData = new Map();
        docToData.set(preset.documentName, presetData);
        if (preset.attached) for (const attached of preset.attached){
            if (!docToData.get(attached.documentName)) docToData.set(attached.documentName, []);
            docToData.get(attached.documentName).push(deepClone(attached.data));
        }
        // ==================
        // Determine spawn position
        if (coordPicker) {
            const coords = await new Promise(async (resolve)=>{
                (0, $32e43d7a62aba58c$export$ba25329847403e11).activate(resolve, {
                    documentName: preset.documentName,
                    previewData: docToData,
                    snap: snapToGrid,
                    label: pickerLabel,
                    taPreview: taPreview
                });
            });
            if (coords == null) return [];
            x = coords.end.x;
            y = coords.end.y;
        } else if (x == null || y == null) {
            if (game.Levels3DPreview?._active) {
                const pos3d = game.Levels3DPreview.interactionManager.canvas2dMousePosition;
                x = pos3d.x;
                y = pos3d.y;
                z = pos3d.z;
            } else {
                x = canvas.mousePosition.x;
                y = canvas.mousePosition.y;
                if (preset.documentName === "Token" || preset.documentName === "Tile") {
                    x -= canvas.dimensions.size / 2;
                    y -= canvas.dimensions.size / 2;
                }
            }
        }
        let pos = {
            x: x,
            y: y
        };
        if (snapToGrid && !game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT)) pos = canvas.grid.getSnappedPosition(pos.x, pos.y, canvas.getLayerByEmbeddedName(preset.documentName).gridPrecision);
        // ==================
        // ==================
        // Set positions taking into account relative distances between each object
        let diffX, diffY, diffZ;
        docToData.forEach((dataArr, documentName)=>{
            for (const data of dataArr){
                // We need to establish the first found coordinate as the reference point
                if (diffX == null || diffY == null) {
                    if (documentName === "Wall") {
                        if (data.c) {
                            diffX = pos.x - data.c[0];
                            diffY = pos.y - data.c[1];
                        }
                    } else if (data.x != null && data.y != null) {
                        diffX = pos.x - data.x;
                        diffY = pos.y - data.y;
                    }
                    // 3D Canvas
                    if (z != null) {
                        const property = documentName === "Token" ? "elevation" : "flags.levels.rangeBottom";
                        if (getProperty(data, property) != null) diffZ = z - getProperty(data, property);
                    }
                }
                // Assign relative position
                if (documentName === "Wall") {
                    if (!data.c || diffX == null) data.c = [
                        pos.x,
                        pos.y,
                        pos.x + canvas.grid.w * 2,
                        pos.y
                    ];
                    else {
                        data.c[0] += diffX;
                        data.c[1] += diffY;
                        data.c[2] += diffX;
                        data.c[3] += diffY;
                    }
                } else {
                    data.x = data.x == null || diffX == null ? pos.x : data.x + diffX;
                    data.y = data.y == null || diffY == null ? pos.y : data.y + diffY;
                }
                // 3D Canvas
                if (z != null) {
                    delete data.z;
                    let elevation;
                    const property = documentName === "Token" ? "elevation" : "flags.levels.rangeBottom";
                    if (diffZ !== null && getProperty(data, property) != null) elevation = getProperty(data, property) + diffZ;
                    else elevation = z;
                    setProperty(data, property, elevation);
                    if (documentName !== "Token") setProperty(data, "flags.levels.rangeTop", elevation);
                }
                // Assign ownership for Drawings and MeasuredTemplates
                if ([
                    "Drawing",
                    "MeasuredTemplate"
                ].includes(documentName)) {
                    if (documentName === "Drawing") data.author = game.user.id;
                    else if (documentName === "MeasuredTemplate") data.user = game.user.id;
                }
                // Hide
                if (hidden || game.keyboard.downKeys.has("AltLeft")) data.hidden = true;
            }
        });
        // ==================
        if (layerSwitch) {
            if (game.user.isGM || [
                "Token",
                "MeasuredTemplate",
                "Note"
            ].includes(preset.documentName)) canvas.getLayerByEmbeddedName(preset.documentName)?.activate();
        }
        // Create Documents
        const allDocuments = [];
        for (const [documentName, dataArr] of docToData.entries()){
            const documents1 = await (0, $32e43d7a62aba58c$export$24b03028f6f659d0)(documentName, dataArr, canvas.scene.id);
            documents1.forEach((d)=>allDocuments.push(d));
        }
        // Execute post spawn scripts
        if (preset.postSpawnScript) await (0, $32e43d7a62aba58c$export$9087f1a05b437404)(preset.postSpawnScript, {
            documents: allDocuments,
            objects: documents.map((d)=>d.object).filter(Boolean)
        });
        return allDocuments;
    }
}
class $d0a1f06830d69799$export$511ed1dd332818c6 {
    static scope = "world";
    static setting = "expandedFolders";
    static init() {
        game.settings.register(this.scope, this.setting, {
            scope: "world",
            config: false,
            type: Object,
            default: {}
        });
        this.states = game.settings.get(this.scope, this.setting) ?? {};
    }
    static expanded(uuid) {
        return this.states[uuid];
    }
    static setExpanded(uuid, state) {
        if (Boolean(this.states[uuid]) !== state) {
            this.states[uuid] = state;
            game.settings.set(this.scope, this.setting, this.states);
        }
    }
}
const $d0a1f06830d69799$var$DOC_ICONS = {
    ALL: "fas fa-globe",
    Token: "fas fa-user-circle",
    MeasuredTemplate: "fas fa-ruler-combined",
    Tile: "fa-solid fa-cubes",
    Drawing: "fa-solid fa-pencil-alt",
    Wall: "fa-solid fa-block-brick",
    AmbientLight: "fa-regular fa-lightbulb",
    AmbientSound: "fa-solid fa-music",
    Note: "fa-solid fa-bookmark",
    Actor: "fas fa-user-alt",
    Scene: "fas fa-map",
    DEFAULT: "fa-solid fa-question"
};
const $d0a1f06830d69799$var$SORT_MODES = {
    manual: {
        get tooltip () {
            return (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("SIDEBAR.SortModeManual", false);
        },
        icon: '<i class="fa-solid fa-arrow-down-short-wide"></i>'
    },
    alphabetical: {
        get tooltip () {
            return (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("SIDEBAR.SortModeAlpha", false);
        },
        icon: '<i class="fa-solid fa-arrow-down-a-z"></i>'
    }
};
const $d0a1f06830d69799$var$SEARCH_MODES = {
    p: {
        get tooltip () {
            return (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.search-presets");
        },
        icon: '<i class="fas fa-search"></i>'
    },
    pf: {
        get tooltip () {
            return (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.search-presets-folders");
        },
        icon: '<i class="fa-solid fa-folder-magnifying-glass"></i>'
    }
};
class $d0a1f06830d69799$export$7a966e8b4abecc03 extends FormApplication {
    static objectHover = false;
    static lastSearch;
    constructor(configApp, callback, docName, options = {}){
        if (!options.preventPositionOverride && $d0a1f06830d69799$export$7a966e8b4abecc03.lastPositionLeft) {
            options.left = $d0a1f06830d69799$export$7a966e8b4abecc03.lastPositionLeft;
            options.top = $d0a1f06830d69799$export$7a966e8b4abecc03.lastPositionTop;
        }
        super({}, options);
        this.callback = callback;
        // Drag/Drop tracking
        this.dragType = null;
        this.dragData = null;
        this.draggedElements = null;
        if (!configApp && (0, $32e43d7a62aba58c$export$6ba969594e8d224d).includes(docName)) {
            const docLock = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetDocLock");
            this.docName = docLock || docName;
        } else {
            this.configApp = configApp;
            this.docName = docName || this.configApp.documentName;
        }
        this.canvas3dActive = Boolean(game.Levels3DPreview?._active);
    }
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "mass-edit-presets",
            classes: [
                "sheet"
            ],
            template: `modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/preset/presets.html`,
            resizable: true,
            minimizable: false,
            width: 350,
            height: 900,
            scrollY: [
                "ol.item-list"
            ]
        });
    }
    get title() {
        let title = (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.presets");
        if (!(0, $32e43d7a62aba58c$export$6ba969594e8d224d).includes(this.docName)) title += ` [${this.docName}]`;
        else title += ` [${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.placeable")}]`;
        return title;
    }
    async getData(options) {
        const data = super.getData(options);
        // If we're re-rendering deactivate the brush
        if (this._activeBrush) (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).deactivate();
        // Cache partials
        await getTemplate(`modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/preset/preset.html`);
        await getTemplate(`modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/preset/presetFolder.html`);
        const displayExtCompendiums = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetExtComp");
        this.tree = await $d0a1f06830d69799$export$9cea25aeb7365a59.getTree(this.docName, !displayExtCompendiums);
        data.presets = this.tree.presets;
        data.folders = this.tree.folders;
        data.staticFolders = this.tree.staticFolders.length ? this.tree.staticFolders : null;
        data.createEnabled = Boolean(this.configApp);
        data.isPlaceable = (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(this.docName) || this.docName === "ALL";
        data.allowDocumentSwap = (0, $32e43d7a62aba58c$export$6ba969594e8d224d).includes(this.docName) && !this.configApp;
        data.docLockActive = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetDocLock") === this.docName;
        data.layerSwitchActive = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetLayerSwitch");
        data.scaling = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetScaling");
        data.extCompActive = displayExtCompendiums;
        data.sortMode = $d0a1f06830d69799$var$SORT_MODES[game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSortMode")];
        data.searchMode = $d0a1f06830d69799$var$SEARCH_MODES[game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSearchMode")];
        data.displayDragDropMessage = data.allowDocumentSwap && !(this.tree.presets.length || this.tree.folders.length);
        data.canvas3dActive = this.canvas3dActive;
        data.lastSearch = $d0a1f06830d69799$export$7a966e8b4abecc03.lastSearch;
        data.docs = (0, $32e43d7a62aba58c$export$6ba969594e8d224d).reduce((obj, key)=>{
            return {
                ...obj,
                [key]: $d0a1f06830d69799$var$DOC_ICONS[key]
            };
        }, {});
        data.documents = (0, $32e43d7a62aba58c$export$6ba969594e8d224d);
        data.currentDocument = this.docName;
        data.callback = Boolean(this.callback);
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        const hoverOverlay = html.closest(".window-content").find(".drag-drop-overlay");
        html.closest(".window-content").on("mouseover", (event)=>{
            if (canvas.activeLayer?.preview?.children.some((c)=>c._original?.mouseInteractionManager?.isDragging)) {
                hoverOverlay.show();
                $d0a1f06830d69799$export$7a966e8b4abecc03.objectHover = true;
            } else {
                hoverOverlay.hide();
                $d0a1f06830d69799$export$7a966e8b4abecc03.objectHover = false;
            }
        }).on("mouseout", ()=>{
            hoverOverlay.hide();
            $d0a1f06830d69799$export$7a966e8b4abecc03.objectHover = false;
        });
        // Create Preset from Selected
        html.find(".create-preset").on("click", ()=>{
            const controlled = canvas.activeLayer.controlled;
            if (controlled.length && (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(controlled[0].document.documentName)) this.dropPlaceable(controlled);
        });
        // =====================
        // Preset multi-select & drag Listeners
        const itemList = html.find(".item-list");
        // Multi-select
        html.on("click", ".item", (event)=>{
            $d0a1f06830d69799$var$itemSelect(event, itemList);
            if (this._activeBrush) this._toggleBrush(event);
        });
        html.on("dragstart", ".item", (event)=>{
            this.dragType = "item";
            const item = $(event.target).closest(".item");
            // Drag has been started on an item that hasn't been selected
            // Assume that this is the only item to be dragged and select it
            if (!item.hasClass("selected")) {
                itemList.find(".item.selected").removeClass("selected").removeClass("last-selected");
                item.addClass("selected").addClass("last-selected");
            }
            const uuids = [];
            itemList.find(".item.selected").each(function() {
                uuids.push($(this).data("uuid"));
            });
            this.dragData = uuids;
            this.draggedElements = itemList.find(".item.selected");
        });
        html.on("dragleave", ".item.editable", (event)=>{
            $(event.target).closest(".item").removeClass("drag-bot").removeClass("drag-top");
        });
        html.on("dragover", ".item.editable", (event)=>{
            if (this.dragType !== "item") return;
            if (!this.draggedElements.hasClass("editable")) return;
            const targetItem = $(event.target).closest(".item");
            // Check that we're not above a selected item  (i.e. item being dragged)
            if (targetItem.hasClass("selected")) return;
            // Determine if mouse is hovered over top, middle, or bottom
            var domRect = event.currentTarget.getBoundingClientRect();
            let prc = event.offsetY / domRect.height;
            if (prc < 0.2) targetItem.removeClass("drag-bot").addClass("drag-top");
            else if (prc > 0.8) targetItem.removeClass("drag-top").addClass("drag-bot");
        });
        html.on("drop", ".item.editable", (event)=>{
            if (this.dragType !== "item") return;
            if (!this.draggedElements.hasClass("editable")) return;
            const targetItem = $(event.target).closest(".item");
            const top = targetItem.hasClass("drag-top");
            targetItem.removeClass("drag-bot").removeClass("drag-top");
            const uuids = this.dragData;
            if (uuids) {
                if (!targetItem.hasClass("selected")) {
                    // Move HTML Elements
                    (top ? uuids : uuids.reverse()).forEach((uuid)=>{
                        const item = itemList.find(`.item[data-uuid="${uuid}"]`);
                        if (item) {
                            if (top) item.insertBefore(targetItem);
                            else item.insertAfter(targetItem);
                        }
                    });
                    this._onItemSort(uuids, targetItem.data("uuid"), {
                        before: top,
                        folderUuid: targetItem.closest(".folder").data("uuid")
                    });
                }
            }
            this.dragType = null;
            this.dragData = null;
            this.draggedElements = null;
        });
        html.on("dragend", ".item", (event)=>{
            if (!$d0a1f06830d69799$var$checkMouseInWindow(event)) this._onPresetDragOut(event);
        });
        // ================
        // Folder Listeners
        html.on("click", ".folder > header", (event)=>{
            const folder = $(event.target).closest(".folder");
            const uuid = folder.data("uuid");
            const icon = folder.find("header h3 i").first();
            if (!$d0a1f06830d69799$export$511ed1dd332818c6.expanded(uuid)) {
                $d0a1f06830d69799$export$511ed1dd332818c6.setExpanded(uuid, true);
                folder.removeClass("collapsed");
                icon.removeClass("fa-folder-closed").addClass("fa-folder-open");
            } else {
                $d0a1f06830d69799$export$511ed1dd332818c6.setExpanded(uuid, false);
                folder.addClass("collapsed");
                icon.removeClass("fa-folder-open").addClass("fa-folder-closed");
            }
        });
        html.on("dragstart", ".folder.editable", (event)=>{
            if (this.dragType == "item") return;
            this.dragType = "folder";
            const folder = $(event.target).closest(".folder");
            const uuids = [
                folder.data("uuid")
            ];
            $(event.target).find(".folder").each(function() {
                uuids.push($(this).data("uuid"));
            });
            this.dragData = uuids;
        });
        html.on("dragleave", ".folder.editable header", (event)=>{
            $(event.target).closest(".folder").removeClass("drag-mid").removeClass("drag-top");
        });
        html.on("dragover", ".folder.editable header", (event)=>{
            const targetFolder = $(event.target).closest(".folder");
            if (this.dragType === "folder") {
                // Check that we're not above folders being dragged
                if (this.dragData.includes(targetFolder.data("uuid"))) return;
                // Determine if mouse is hovered over top, middle, or bottom
                var domRect = event.currentTarget.getBoundingClientRect();
                let prc = event.offsetY / domRect.height;
                if (prc < 0.2) targetFolder.removeClass("drag-mid").addClass("drag-top");
                else targetFolder.removeClass("drag-top").addClass("drag-mid");
            } else if (this.dragType === "item" && this.draggedElements.hasClass("editable")) targetFolder.addClass("drag-mid");
        });
        html.on("drop", ".folder.editable header", (event)=>{
            const targetFolder = $(event.target).closest(".folder");
            if (this.dragType === "folder") {
                const top = targetFolder.hasClass("drag-top");
                targetFolder.removeClass("drag-mid").removeClass("drag-top");
                const uuids = this.dragData;
                if (uuids) {
                    if (uuids.includes(targetFolder.data("uuid"))) return;
                    const uuid = uuids[0];
                    const folder = html.find(`.folder[data-uuid="${uuid}"]`);
                    if (folder) {
                        // Move HTML Elements
                        if (top) folder.insertBefore(targetFolder);
                        else targetFolder.find(".folder-items").first().append(folder);
                        if (top) this._onFolderSort(uuid, targetFolder.data("uuid"), {
                            inside: false,
                            folderUuid: targetFolder.parent().closest(".folder").data("uuid") ?? null
                        });
                        else this._onFolderSort(uuid, null, {
                            inside: true,
                            folderUuid: targetFolder.data("uuid")
                        });
                    }
                }
            } else if (this.dragType === "item" && this.draggedElements.hasClass("editable")) {
                targetFolder.removeClass("drag-mid");
                const uuids = this.dragData;
                // Move HTML Elements
                const presetItems = targetFolder.children(".preset-items");
                uuids?.forEach((uuid)=>{
                    const item = itemList.find(`.item[data-uuid="${uuid}"]`);
                    if (item.length) presetItems.append(item);
                });
                this._onItemSort(uuids, null, {
                    folderUuid: targetFolder.data("uuid")
                });
            }
            this.dragType = null;
            this.dragData = null;
            this.draggedElements = null;
        });
        html.on("drop", ".top-level-preset-items", (event)=>{
            if (this.dragType === "folder") {
                // Move HTML Elements
                const target = html.find(".top-level-folder-items");
                const folder = html.find(`.folder[data-uuid="${this.dragData[0]}"]`);
                target.append(folder);
                this._onFolderSort(this.dragData[0], null);
            } else if (this.dragType === "item" && this.draggedElements.hasClass("editable")) {
                const uuids = this.dragData;
                // Move HTML Elements
                const target = html.find(".top-level-preset-items");
                uuids?.forEach((uuid)=>{
                    const item = itemList.find(`.item[data-uuid="${uuid}"]`);
                    if (item.length) target.append(item);
                });
                this._onItemSort(uuids, null);
            }
            this.dragType = null;
            this.dragData = null;
            this.draggedElements = null;
        });
        // End of Folder Listeners
        // ================
        html.find(".toggle-sort").on("click", this._onToggleSort.bind(this));
        html.find(".toggle-search-mode").on("click", this._onToggleSearch.bind(this));
        html.find(".toggle-doc-lock").on("click", this._onToggleLock.bind(this));
        html.find(".toggle-ext-comp").on("click", this._onToggleExtComp.bind(this));
        html.find(".toggle-scaling").on("click", this._onToggleScaling.bind(this));
        html.find(".toggle-layer-switch").on("click", this._onToggleLayerSwitch.bind(this));
        html.find(".document-select").on("click", this._onDocumentChange.bind(this));
        html.find(".item").on("contextmenu", this._onRightClickPreset.bind(this));
        html.find(".item").on("dblclick", this._onDoubleClickPreset.bind(this));
        html.find(".create-folder").on("click", this._onCreateFolder.bind(this));
        html.on("click", ".preset-create", this._onPresetCreate.bind(this));
        html.on("click", ".preset-update a", this._onPresetUpdate.bind(this));
        html.on("click", ".preset-brush", this._toggleBrush.bind(this));
        html.on("click", ".preset-callback", this._onApplyPreset.bind(this));
        const headerSearch = html.find(".header-search input");
        const items = html.find(".item");
        const folders = html.find(".folder");
        headerSearch.on("input", (event)=>this._onSearchInput(event, items, folders));
        if ($d0a1f06830d69799$export$7a966e8b4abecc03.lastSearch) headerSearch.trigger("input");
        // Activate context menu
        this._contextMenu(html.find(".item-list"));
    }
    async _onDoubleClickPreset(event) {
        if (this.canvas3dActive) return;
        const uuid = $(event.target).closest(".item").data("uuid");
        if (!uuid) return;
        const preset = await $d0a1f06830d69799$export$619760a5720f8054.getPreset({
            uuid: uuid
        });
        if (!preset) return;
        if (preset.documentName === "Scene") {
            ui.notifications.info(`Mass Edit: ${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.apply")} [${preset.name}]`);
            (0, $32e43d7a62aba58c$export$767e4c91777ecf4c)(preset);
        }
        if (!(0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(preset.documentName)) return;
        ui.notifications.info(`Mass Edit: ${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.spawning")} [${preset.name}]`);
        $d0a1f06830d69799$export$619760a5720f8054.spawnPreset({
            preset: preset,
            coordPicker: true,
            taPreview: "ALL",
            layerSwitch: game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetLayerSwitch"),
            scaleToGrid: game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetScaling")
        });
    }
    _contextMenu(html) {
        if (html.find(".item").length) ContextMenu.create(this, html, ".item", this._getItemContextOptions(), {
            hookName: "MassEditPresetContext"
        });
        ContextMenu.create(this, html, ".folder header", this._getFolderContextOptions(), {
            hookName: "MassEditFolderContext"
        });
    }
    _getItemContextOptions() {
        return [
            {
                name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("CONTROLS.CommonEdit", false),
                icon: '<i class="fas fa-edit"></i>',
                condition: (item)=>item.hasClass("editable"),
                callback: (item)=>this._onEditSelectedPresets(item)
            },
            {
                name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.open-journal"),
                icon: '<i class="fas fa-book-open"></i>',
                callback: (item)=>this._onOpenJournal(item)
            },
            {
                name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.apply-to-selected"),
                icon: '<i class="fas fa-arrow-circle-right"></i>',
                condition: (item)=>(0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(item.data("doc-name")) && canvas.getLayerByEmbeddedName(item.data("doc-name")).controlled.length,
                callback: (item)=>this._onApplyToSelected(item)
            },
            {
                name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Duplicate", false),
                icon: '<i class="fa-solid fa-copy"></i>',
                condition: (item)=>item.hasClass("editable"),
                callback: (item)=>this._onCopySelectedPresets(null, {
                        keepFolder: true,
                        keepId: false
                    })
            },
            {
                name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.copy-to-clipboard"),
                icon: '<i class="fa-solid fa-copy"></i>',
                condition: (item)=>$(this.form).find(".item-list").find(".item.selected").length === 1,
                callback: (item)=>this._onCopyPresetToClipboard()
            },
            {
                name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.export-as-json"),
                icon: '<i class="fas fa-file-export fa-fw"></i>',
                callback: (item)=>this._onExportSelectedPresets()
            },
            {
                name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.export-to-compendium"),
                icon: '<i class="fas fa-file-export fa-fw"></i>',
                callback: (item)=>this._onExportSelectedPresetsToComp()
            },
            {
                name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("CONTROLS.CommonDelete", false),
                icon: '<i class="fas fa-trash fa-fw"></i>',
                condition: (item)=>item.hasClass("editable"),
                callback: (item)=>this._onDeleteSelectedPresets(item)
            }
        ];
    }
    _getFolderContextOptions() {
        return [
            {
                name: "Edit",
                icon: '<i class="fas fa-edit"></i>',
                condition: (header)=>header.closest(".folder").hasClass("editable"),
                callback: (header)=>this._onFolderEdit(header)
            },
            {
                name: "Export to Compendium",
                icon: '<i class="fas fa-file-export fa-fw"></i>',
                callback: (header)=>this._onExportFolder(header.closest(".folder").data("uuid"))
            },
            {
                name: "Delete",
                icon: '<i class="fas fa-trash fa-fw"></i>',
                condition: (header)=>header.closest(".folder").hasClass("editable"),
                callback: (header)=>this._onFolderDelete(header.closest(".folder").data("uuid"))
            }
        ];
    }
    async _onExportFolder(uuid) {
        let { pack: pack, keepId: keepId } = await new Promise((resolve)=>$d0a1f06830d69799$var$getCompendiumDialog(resolve, {
                exportTo: true,
                keepIdSelect: true
            }));
        if (pack) this._onCopyFolder(uuid, null, pack, true, keepId);
    }
    async _onCopyFolder(uuid, parentId = null, pack, render = true, keepId = true) {
        if (!pack) pack = $d0a1f06830d69799$export$9cea25aeb7365a59.workingPack;
        const folder = this.tree.allFolders.get(uuid);
        const folderDoc = await fromUuid(uuid);
        if (folder) {
            let types;
            if (folderDoc) types = folderDoc.flags[0, $32e43d7a62aba58c$export$59dbefa3c1eecdf]?.types ?? [
                "ALL"
            ];
            else types = [
                "ALL"
            ];
            const data = {
                name: folder.name,
                color: folder.color,
                sorting: folder.sorting,
                folder: parentId,
                flags: {
                    [(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)]: {
                        types: types
                    }
                },
                type: "JournalEntry"
            };
            const nFolder = await Folder.create(data, {
                pack: pack
            });
            for (const preset of folder.presets){
                const p = (await preset.load()).clone();
                p.folder = nFolder.id;
                if (!keepId) p.id = foundry.utils.randomID();
                await $d0a1f06830d69799$export$9cea25aeb7365a59.set(p, pack);
            }
            for (const child of folder.children)await this._onCopyFolder(child.uuid, nFolder.id, pack, false, keepId);
            if (render) this.render(true);
        }
    }
    async _onExportSelectedPresetsToComp() {
        let { pack: pack, keepId: keepId } = await new Promise((resolve)=>$d0a1f06830d69799$var$getCompendiumDialog(resolve, {
                exportTo: true,
                keepIdSelect: true
            }));
        if (pack) this._onCopySelectedPresets(pack, {
            keepId: keepId
        });
    }
    async _onCopySelectedPresets(pack, { keepFolder: keepFolder = false, keepId: keepId = true } = {}) {
        const [selected, _] = await this._getSelectedPresets();
        for (const preset of selected){
            const p = preset.clone();
            if (!keepFolder) p.folder = null;
            if (!keepId) p.id = foundry.utils.randomID();
            await $d0a1f06830d69799$export$9cea25aeb7365a59.set(p, pack);
        }
        if (selected.length) this.render(true);
    }
    async _onCopyPresetToClipboard() {
        const [selected, _] = await this._getSelectedPresets();
        if (selected.length) (0, $8d51a9873394e4eb$export$2cdf1b96a9f86d16)(selected[0]);
    }
    async _getSelectedPresets({ editableOnly: editableOnly = false } = {}) {
        const uuids = [];
        const items = $(this.form).find(".item-list").find(".item.selected" + (editableOnly ? ".editable" : ""));
        items.each(function() {
            const uuid = $(this).data("uuid");
            uuids.push(uuid);
        });
        const selected = [];
        for (const uuid of uuids){
            const preset = await $d0a1f06830d69799$export$9cea25aeb7365a59.get(uuid);
            if (preset) selected.push(preset);
        }
        return [
            selected,
            items
        ];
    }
    async _onExportSelectedPresets() {
        const [selected, _] = await this._getSelectedPresets();
        $d0a1f06830d69799$var$exportPresets(selected);
    }
    async _onEditSelectedPresets(item) {
        const [selected, _] = await this._getSelectedPresets({
            editableOnly: true
        });
        if (selected.length) {
            // Position edit window just bellow the item
            const options = item.offset();
            options.top += item.height();
            this._editPresets(selected, options);
        }
    }
    async _onDeleteSelectedPresets(item) {
        const [selected, items] = await this._getSelectedPresets({
            editableOnly: true
        });
        if (selected.length) {
            const confirm = selected.length < 3 ? true : await Dialog.confirm({
                title: `${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.delete")} [ ${selected.length} ]`,
                content: `<p>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("AreYouSure", false)}</p><p>${(0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("presets.delete-presets-warn", {
                    count: selected.length
                })}</p>`
            });
            if (confirm) {
                await $d0a1f06830d69799$export$9cea25aeb7365a59.delete(selected);
                items.remove();
            }
        }
    }
    async _onOpenJournal(item) {
        const [selected, _] = await this._getSelectedPresets({
            editableOnly: false
        });
        selected.forEach((p)=>p.openJournal());
    }
    async _onApplyToSelected(item) {
        const [selected, _] = await this._getSelectedPresets({
            editableOnly: false
        });
        if (!selected.length) return;
        // Confirm that all presets are of the same document type
        const types = new Set();
        for (const s of selected){
            types.add(s.documentName);
            if (types.size > 1) {
                ui.notifications.warn((0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.apply-to-selected-warn"));
                return;
            }
        }
        const controlled = canvas.getLayerByEmbeddedName(selected[0].documentName).controlled;
        if (!controlled.length) return;
        for (const s of selected)(0, $8d51a9873394e4eb$export$85a626beb2f6e17a)(controlled, s, false, true);
    }
    async _onCreateFolder(event) {
        const types = [];
        if (this.docName === "ALL") types.push("ALL");
        else if ((0, $32e43d7a62aba58c$export$6ba969594e8d224d).includes(this.docName)) types.push("ALL", this.docName);
        else types.push(this.docName);
        const folder = new Folder.implementation({
            name: Folder.defaultName(),
            type: "JournalEntry",
            sorting: "m",
            flags: {
                [(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)]: {
                    types: types
                }
            }
        }, {
            pack: $d0a1f06830d69799$export$9cea25aeb7365a59.workingPack
        });
        await new Promise((resolve)=>{
            new $d0a1f06830d69799$var$PresetFolderConfig(folder, {
                resolve: resolve
            }).render(true);
        });
        this.render(true);
    }
    async _onFolderEdit(header) {
        const folder = await fromUuid($(header).closest(".folder").data("uuid"));
        new Promise((resolve)=>{
            const options = {
                resolve: resolve,
                ...header.offset()
            };
            options.top += header.height();
            new $d0a1f06830d69799$var$PresetFolderConfig(folder, options).render(true);
        }).then(()=>this.render(true));
    }
    async _onFolderDelete(uuid, render = true) {
        const folder = this.tree.allFolders.get(uuid);
        if (folder) {
            const confirm = await Dialog.confirm({
                title: `${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("FOLDER.Remove", false)}: ${folder.name}`,
                content: `<h4>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("AreYouSure", false)}</h4><p>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("FOLDER.RemoveWarning", false)}</p>`
            });
            if (confirm) {
                const folderDoc = await fromUuid(uuid);
                await folderDoc.delete({
                    deleteSubfolders: false,
                    deleteContents: false
                });
                if (render) this.render(true);
            }
        }
    }
    _onSearchInput(event, items, folder) {
        $d0a1f06830d69799$export$7a966e8b4abecc03.lastSearch = event.target.value;
        if (!$d0a1f06830d69799$export$7a966e8b4abecc03.lastSearch) {
            this.render(true);
            return;
        }
        const matchedFolderUuids = new Set();
        const filter = event.target.value.trim().toLowerCase();
        $(event.target).addClass("active");
        // First hide/show items
        const app = this;
        items.each(function() {
            const item = $(this);
            if (item.attr("name").toLowerCase().includes(filter)) {
                item.show();
                let folderUuid = item.closest(".folder").data("uuid");
                while(folderUuid){
                    matchedFolderUuids.add(folderUuid);
                    const folder = app.tree.allFolders.get(folderUuid);
                    if (folder.folder) folderUuid = folder.folder;
                    else folderUuid = null;
                }
            } else item.hide();
        });
        const parentMatchedFolderUuids = new Set();
        // Next hide/show folders depending on whether they contained matched items
        folder.each(function() {
            const folder = $(this);
            const uuid = folder.data("uuid");
            if (matchedFolderUuids.has(uuid)) {
                folder.removeClass("collapsed");
                folder.show();
            } else if (game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSearchMode") === "pf" && folder.data("name").toLowerCase().includes(filter)) {
                folder.show();
                if (!$d0a1f06830d69799$export$511ed1dd332818c6.expanded(uuid)) folder.addClass("collapsed");
                folder.find(".item").show();
                folder.find(".folder").each(function() {
                    const folder = $(this);
                    const uuid = folder.data("uuid");
                    parentMatchedFolderUuids.add(uuid);
                    folder.show();
                    if (!matchedFolderUuids.has(uuid) && !$d0a1f06830d69799$export$511ed1dd332818c6.expanded(uuid)) folder.addClass("collapsed");
                });
                let parent = folder.parent().closest(".folder");
                while(parent.length){
                    parent.show();
                    parent.removeClass("collapsed");
                    parent = parent.parent().closest(".folder");
                }
            } else if (!parentMatchedFolderUuids.has(uuid)) folder.hide();
        });
    }
    async _onFolderSort(sourceUuid, targetUuid, { inside: inside = true, folderUuid: folderUuid = null } = {}) {
        let source = this.tree.allFolders.get(sourceUuid);
        let target = this.tree.allFolders.get(targetUuid);
        let folders;
        if (folderUuid) folders = this.tree.allFolders.get(folderUuid).children;
        else folders = this.tree.folders;
        const siblings = [];
        for (const folder of folders)if (folder.uuid !== sourceUuid) siblings.push(folder);
        const result = (0, $e9281f67fc14638a$export$355a29a68ae3606b).performIntegerSort(source, {
            target: target,
            siblings: siblings,
            sortBefore: true
        });
        if (result.length) {
            const updates = [];
            result.forEach((ctrl)=>{
                const update = ctrl.update;
                update._id = ctrl.target.id;
                update.folder = this.tree.allFolders.get(folderUuid)?.id ?? null;
                updates.push(update);
                ctrl.target.sort = update.sort;
            });
            await Folder.updateDocuments(updates, {
                pack: $d0a1f06830d69799$export$9cea25aeb7365a59.workingPack
            });
        }
    }
    async _onItemSort(sourceUuids, targetUuid, { before: before = true, folderUuid: folderUuid = null } = {}) {
        const sourceUuidsSet = new Set(sourceUuids);
        const sources = this.tree.allPresets.filter((p)=>sourceUuidsSet.has(p.uuid));
        let target = this.tree.allPresets.find((p)=>p.uuid === targetUuid);
        // Determine siblings based on folder
        let presets;
        if (folderUuid) presets = this.tree.allFolders.get(folderUuid).presets;
        else presets = this.tree.presets;
        const siblings = [];
        for (const preset of presets)if (!sourceUuidsSet.has(preset.uuid)) siblings.push(preset);
        const result = (0, $e9281f67fc14638a$export$355a29a68ae3606b).performIntegerSortMulti(sources, {
            target: target,
            siblings: siblings,
            sortBefore: before
        });
        if (result.length) {
            const updates = [];
            result.forEach((ctrl)=>{
                const update = ctrl.update;
                update._id = ctrl.target.id;
                update.folder = this.tree.allFolders.get(folderUuid)?.id ?? null;
                updates.push(update);
                ctrl.target.sort = update.sort;
            });
            await $d0a1f06830d69799$export$9cea25aeb7365a59.updatePresets(updates);
        }
    // this.render(true);
    }
    async _onToggleSort(event) {
        const currentSort = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSortMode");
        const newSort = currentSort === "manual" ? "alphabetical" : "manual";
        await game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSortMode", newSort);
        this.render(true);
    }
    async _onToggleSearch(event) {
        const searchControl = $(event.target).closest(".toggle-search-mode");
        const currentMode = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSearchMode");
        const newMode = currentMode === "p" ? "pf" : "p";
        await game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSearchMode", newMode);
        const mode = $d0a1f06830d69799$var$SEARCH_MODES[newMode];
        searchControl.attr("data-tooltip", mode.tooltip).html(mode.icon);
        $(this.form).find(".header-search input").trigger("input");
    }
    _onToggleLock(event) {
        const lockControl = $(event.target).closest(".toggle-doc-lock");
        let currentLock = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetDocLock");
        let newLock = this.docName;
        if (newLock !== currentLock) lockControl.addClass("active");
        else {
            lockControl.removeClass("active");
            newLock = "";
        }
        game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetDocLock", newLock);
    }
    _onToggleLayerSwitch(event) {
        const switchControl = $(event.target).closest(".toggle-layer-switch");
        const value = !game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetLayerSwitch");
        if (value) switchControl.addClass("active");
        else switchControl.removeClass("active");
        game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetLayerSwitch", value);
    }
    async _onToggleExtComp(event) {
        const switchControl = $(event.target).closest(".toggle-ext-comp");
        const value = !game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetExtComp");
        if (value) switchControl.addClass("active");
        else switchControl.removeClass("active");
        await game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetExtComp", value);
        this.render(true);
    }
    async _onToggleScaling(event) {
        const switchControl = $(event.target).closest(".toggle-scaling");
        const value = !game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetScaling");
        if (value) switchControl.addClass("active");
        else switchControl.removeClass("active");
        game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetScaling", value);
    }
    _onDocumentChange(event) {
        const newDocName = $(event.target).closest(".document-select").data("name");
        if (newDocName != this.docName) {
            this.docName = newDocName;
            if (this.docName !== "ALL") {
                if (game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetLayerSwitch")) canvas.getLayerByEmbeddedName(this.docName === "Actor" ? "Token" : this.docName)?.activate();
            }
            this.render(true);
        }
    }
    async _onRightClickPreset(event) {
        const item = $(event.target).closest(".item");
        // If right-clicked item is not selected, de-select the others and select it
        if (!item.hasClass("selected")) {
            item.closest(".item-list").find(".item.selected").removeClass("selected").removeClass("last-selected");
            item.addClass("selected").addClass("last-selected");
        }
    }
    _editPresets(presets, options = {}, event) {
        options.callback = ()=>this.render(true);
        if (!("left" in options) && event) {
            options.left = event.originalEvent.x - $d0a1f06830d69799$export$c7d846246fcba8fd.defaultOptions.width / 2;
            options.top = event.originalEvent.y;
        }
        new $d0a1f06830d69799$export$c7d846246fcba8fd(presets, options).render(true);
    }
    async _onApplyPreset(event) {
        if (this.callback) {
            const uuid = $(event.target).closest(".item").data("uuid");
            this.callback(await $d0a1f06830d69799$export$9cea25aeb7365a59.get(uuid));
        }
    }
    async _onPresetDragOut(event) {
        const uuid = $(event.originalEvent.target).closest(".item").data("uuid");
        const preset = await $d0a1f06830d69799$export$9cea25aeb7365a59.get(uuid);
        if (!preset) return;
        // If released on top of a Mass Edit form, apply the preset to it instead of spawning it
        const form = $d0a1f06830d69799$var$hoverMassEditForm(event.pageX, event.pageY, preset.documentName);
        if (form) {
            form._applyPreset(preset);
            return;
        }
        // If it's a scene preset apply it to the currently active scene
        if (preset.documentName === "Scene") {
            (0, $32e43d7a62aba58c$export$767e4c91777ecf4c)(preset);
            return;
        }
        if (!(0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(preset.documentName)) return;
        // For some reason canvas.mousePosition does not get updated during drag and drop
        // Acquire the cursor position transformed to Canvas coordinates
        let mouseX;
        let mouseY;
        let mouseZ;
        if (this.canvas3dActive) {
            game.Levels3DPreview.interactionManager._onMouseMove(event, true);
            const { x: x, y: y, z: z } = game.Levels3DPreview.interactionManager.canvas2dMousePosition;
            mouseX = x;
            mouseY = y;
            mouseZ = z;
        } else {
            const [x, y] = [
                event.clientX,
                event.clientY
            ];
            const t = canvas.stage.worldTransform;
            mouseX = (x - t.tx) / canvas.stage.scale.x;
            mouseY = (y - t.ty) / canvas.stage.scale.y;
            if (preset.documentName === "Token" || preset.documentName === "Tile") {
                mouseX -= canvas.dimensions.size / 2;
                mouseY -= canvas.dimensions.size / 2;
            }
        }
        $d0a1f06830d69799$export$619760a5720f8054.spawnPreset({
            preset: preset,
            x: mouseX,
            y: mouseY,
            z: mouseZ,
            mousePosition: false,
            layerSwitch: game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetLayerSwitch"),
            scaleToGrid: game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetScaling")
        });
    }
    async _toggleBrush(event) {
        const item = $(event.target).closest(".item");
        const brushControl = item.find(".preset-brush");
        if (brushControl.hasClass("active")) {
            (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).deactivate();
            this._onPresetBrushDeactivate();
        } else {
            const uuid = item.data("uuid");
            const preset = await $d0a1f06830d69799$export$9cea25aeb7365a59.get(uuid);
            if (!preset) {
                (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).deactivate();
                this._onPresetBrushDeactivate();
                return;
            }
            if (this._activeBrush) (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).deactivate();
            const activated = (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).activate({
                preset: preset,
                deactivateCallback: this._onPresetBrushDeactivate.bind(this)
            });
            if (activated) {
                brushControl.addClass("active").addClass("fa-bounce");
                this._activeBrush = true;
            } else this._onPresetBrushDeactivate();
        }
    }
    _onPresetBrushDeactivate() {
        $(this.form).find(".preset-brush").removeClass("active").removeClass("fa-bounce");
        this._activeBrush = false;
    }
    setPosition(options) {
        super.setPosition(options);
        if (!this.options.preventPositionOverride) {
            $d0a1f06830d69799$export$7a966e8b4abecc03.lastPositionLeft = this.position.left;
            $d0a1f06830d69799$export$7a966e8b4abecc03.lastPositionTop = this.position.top;
        }
    }
    async close(options = {}) {
        if (!Boolean(this.configApp)) (0, $9246b9d7680c2c9c$export$59bc2e3533b384a0).deactivate();
        $d0a1f06830d69799$export$7a966e8b4abecc03.objectHover = false;
        return super.close(options);
    }
    async _onPresetUpdate(event) {
        const preset = await $d0a1f06830d69799$export$9cea25aeb7365a59.get($(event.target).closest(".item").data("uuid"));
        if (!preset) return;
        const selectedFields = this.configApp instanceof ActiveEffectConfig ? this._getActiveEffectFields() : this.configApp.getSelectedFields();
        if (!selectedFields || foundry.utils.isEmpty(selectedFields)) {
            ui.notifications.warn((0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.warn-no-fields"));
            return;
        }
        const randomize = foundry.utils.deepClone(this.configApp.randomizeFields || {});
        const addSubtract = foundry.utils.deepClone(this.configApp.addSubtractFields || {});
        // Detection modes may have been selected out of order
        // Fix that here
        if (this.docName === "Token") (0, $59fc6fe4c07de9fd$export$7fe60b94e2075390).correctDetectionModeOrder(selectedFields, randomize);
        preset.update({
            data: selectedFields,
            randomize: randomize,
            addSubtract: addSubtract
        });
        ui.notifications.info(`Preset "${preset.name}" updated`);
        this.render(true);
    }
    async _onPresetCreate(event) {
        const selectedFields = this.configApp instanceof ActiveEffectConfig ? this._getActiveEffectFields() : this.configApp.getSelectedFields();
        if (!selectedFields || foundry.utils.isEmpty(selectedFields)) {
            ui.notifications.warn((0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.warn-no-fields"));
            return;
        }
        const preset = new $d0a1f06830d69799$export$3463c369d5cc977f({
            name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.default-name"),
            documentName: this.docName,
            data: selectedFields,
            addSubtract: this.configApp.addSubtractFields,
            randomize: this.configApp.randomizeFields
        });
        await $d0a1f06830d69799$export$9cea25aeb7365a59.set(preset);
        this.render(true);
        this._editPresets([
            preset
        ], {
            isCreate: true
        }, event);
    }
    /**
   * Create a preset from placeables dragged and dropped ont he form
   * @param {Array[Placeable]} placeables
   * @param {Event} event
   */ async dropPlaceable(placeables, event) {
        const presets = await $d0a1f06830d69799$export$619760a5720f8054.createPreset(placeables);
        // Switch to just created preset's category before rendering if not set to 'ALL'
        const documentName = placeables[0].document.documentName;
        if (this.docName !== "ALL" && this.docName !== documentName) this.docName = documentName;
        const options = {
            isCreate: true
        };
        options.left = this.position.left + this.position.width + 20;
        options.top = this.position.top;
        this._editPresets(presets, options, event);
        this.render(true);
    }
    _getActiveEffectFields() {
        return {
            changes: foundry.utils.deepClone(this.configApp.object.changes ?? [])
        };
    }
    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        buttons.unshift({
            label: "",
            class: "mass-edit-change-compendium",
            icon: "fa-solid fa-gear",
            onclick: (ev)=>this._onWorkingPackChange()
        });
        buttons.unshift({
            label: "",
            class: "mass-edit-export",
            icon: "fas fa-file-export",
            onclick: (ev)=>this._onExport(ev)
        });
        buttons.unshift({
            label: "",
            class: "mass-edit-import",
            icon: "fas fa-file-import",
            onclick: (ev)=>this._onImport(ev)
        });
        return buttons;
    }
    async _onWorkingPackChange() {
        let pack = await new Promise((resolve)=>$d0a1f06830d69799$var$getCompendiumDialog(resolve, {}));
        if (pack && pack !== $d0a1f06830d69799$export$9cea25aeb7365a59.workingPack) {
            await game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "workingPack", pack);
            this.render(true);
        }
    }
    async _onExport() {
        const tree = await $d0a1f06830d69799$export$9cea25aeb7365a59.getTree(null, true);
        $d0a1f06830d69799$var$exportPresets(tree.allPresets);
    }
    async _onImport() {
        const json = await (0, $159f597adada9fb6$export$54355b03ee60ee6e)();
        if (!json) return;
        let importCount = 0;
        if (foundry.utils.getType(json) === "Array") for (const p of json){
            if (!("documentName" in p)) continue;
            if (!("data" in p) || foundry.utils.isEmpty(p.data)) continue;
            const preset = new $d0a1f06830d69799$export$3463c369d5cc977f(p);
            preset._pages = p.pages;
            await $d0a1f06830d69799$export$9cea25aeb7365a59.set(preset);
            importCount++;
        }
        ui.notifications.info(`Mass Edit: ${(0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("presets.imported", {
            count: importCount
        })}`);
        if (importCount) this.render(true);
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        if (this.callback) this.callback(await $d0a1f06830d69799$export$9cea25aeb7365a59.get(event.submitter.data.id));
    }
}
async function $d0a1f06830d69799$var$exportPresets(presets, fileName) {
    if (!presets.length) return;
    for (const preset of presets)await preset.load();
    presets = presets.map((p)=>{
        const preset = p.clone();
        preset.folder = null;
        preset.uuid = null;
        return preset;
    });
    saveDataToFile(JSON.stringify(presets, null, 2), "text/json", (fileName ?? "mass-edit-presets") + ".json");
}
class $d0a1f06830d69799$export$c7d846246fcba8fd extends FormApplication {
    static name = "PresetConfig";
    /**
   * @param {Array[Preset]} presets
   */ constructor(presets, options){
        super({}, options);
        this.presets = presets;
        this.callback = options.callback;
        this.isCreate = options.isCreate;
    }
    /** @inheritdoc */ static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "sheet"
            ],
            template: `modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/preset/presetEdit.html`,
            width: 360
        });
    }
    /* -------------------------------------------- */ /** @override */ get id() {
        return "mass-edit-preset-edit";
    }
    /* -------------------------------------------- */ /** @override */ get title() {
        if (this.presets.length > 1) return `Presets [${this.presets.length}]`;
        else return `Preset: ${this.presets[0].name}`;
    }
    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        buttons.unshift({
            label: "",
            class: "mass-edit-export",
            icon: "fas fa-file-export",
            onclick: (ev)=>this._onExport(ev)
        });
        return buttons;
    }
    _onExport() {
        let fileName;
        if (this.presets.length === 1) fileName = "mass-edit-preset-" + this.presets[0].name.replace(" ", "_").replace(/\W/g, "");
        $d0a1f06830d69799$var$exportPresets(this.presets, fileName);
    }
    /* -------------------------------------------- */ /** @inheritdoc */ async close(options = {}) {
        if (!this.options.submitOnClose) this.options.resolve?.(null);
        return super.close(options);
    }
    /* -------------------------------------------- */ /** @override */ async getData(options = {}) {
        const data = {};
        data.advancedOpen = this.advancedOpen;
        data.preset = {};
        if (this.presets.length === 1) {
            data.preset = this.presets[0];
            data.displayFieldDelete = true;
            data.displayFieldModify = true;
            data.attached = this.attached || data.preset.attached;
            if (data.attached) data.attached = data.attached.map((at)=>{
                let tooltip = at.documentName;
                if (at.documentName === "Token" && at.data.name) tooltip += ": " + at.data.name;
                return {
                    icon: $d0a1f06830d69799$var$DOC_ICONS[at.documentName] ?? $d0a1f06830d69799$var$DOC_ICONS.DEFAULT,
                    tooltip: tooltip
                };
            });
        }
        data.minlength = this.presets.length > 1 ? 0 : 1;
        data.tva = game.modules.get("token-variants")?.active;
        if (this.data && !(this.data instanceof Array)) {
            data.modifyDisabled = true;
            data.deleteDisabled = true;
        }
        // Check if all presets are for the same document type and thus can be edited using a Mass Edit form
        const docName = this.presets[0].documentName;
        if (docName !== "Actor" && this.presets.every((p)=>p.documentName === docName)) {
            data.documentEdit = docName;
            data.isPlaceable = (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName);
        }
        return data;
    }
    activateListeners(html) {
        super.activateListeners(html);
        // Auto-select so that the pre-defined names can be conveniently erased
        html.find('[name="name"]').select();
        html.find(".edit-document").on("click", this._onEditDocument.bind(this));
        html.find(".assign-document").on("click", this._onAssignDocument.bind(this));
        html.find(".delete-fields").on("click", this._onDeleteFields.bind(this));
        html.find(".spawn-fields").on("click", this._onSpawnFields.bind(this));
        html.find("summary").on("click", ()=>setTimeout(()=>this.setPosition({
                    height: "auto"
                }), 30));
        html.find(".attached").on("click", this.onAttachedRemove.bind(this));
        html.find(".attach-selected").on("click", ()=>{
            const controlled = canvas.activeLayer.controlled;
            if (controlled.length && (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(controlled[0].document.documentName)) this.dropPlaceable(controlled);
        });
        // TVA Support
        const tvaButton = html.find(".token-variants-image-select-button");
        tvaButton.on("click", (event)=>{
            game.modules.get("token-variants").api.showArtSelect("Preset", {
                callback: (imgSrc, name)=>{
                    tvaButton.siblings(`[name="${tvaButton.data("target")}"]`).val(imgSrc);
                },
                searchType: "Item"
            });
        });
        // Advanced Options tracking between renders
        html.find("details").on("toggle", (event)=>{
            this.advancedOpen = Boolean($(event.target).attr("open"));
        });
        //Hover
        const hoverOverlay = html.closest(".window-content").find(".drag-drop-overlay");
        html.closest(".window-content").on("mouseover", (event)=>{
            if (this.presets.length !== 1) return;
            if (canvas.activeLayer?.preview?.children.some((c)=>c._original?.mouseInteractionManager?.isDragging)) {
                hoverOverlay.show();
                $d0a1f06830d69799$export$c7d846246fcba8fd.objectHover = true;
            } else {
                hoverOverlay.hide();
                $d0a1f06830d69799$export$c7d846246fcba8fd.objectHover = false;
            }
        }).on("mouseout", ()=>{
            if (this.presets.length !== 1) return;
            hoverOverlay.hide();
            $d0a1f06830d69799$export$c7d846246fcba8fd.objectHover = false;
        });
    }
    /**
   * Create a preset from placeables dragged and dropped ont he form
   * @param {Array[Placeable]} placeables
   * @param {Event} event
   */ async dropPlaceable(placeables, event) {
        this.advancedOpen = true;
        if (!this.attached) this.attached = deepClone(this.presets[0].attached ?? []);
        placeables.forEach((p)=>this.attached.push({
                documentName: p.document.documentName,
                data: $d0a1f06830d69799$var$placeableToData(p)
            }));
        await this.render(true);
        setTimeout(()=>this.setPosition({
                height: "auto"
            }), 30);
    }
    async onAttachedRemove(event) {
        const index = $(event.target).closest(".attached").data("index");
        this.attached = this.attached || deepClone(this.presets[0].attached);
        this.attached.splice(index, 1);
        await this.render(true);
        setTimeout(()=>this.setPosition({
                height: "auto"
            }), 30);
    }
    async _onSpawnFields() {
        new $d0a1f06830d69799$var$PresetFieldModify(this.data ?? this.presets[0].data, (modifyOnSpawn)=>{
            this.modifyOnSpawn = modifyOnSpawn;
        }, this.modifyOnSpawn ?? this.presets[0].modifyOnSpawn).render(true);
    }
    async _onDeleteFields() {
        new $d0a1f06830d69799$var$PresetFieldDelete(this.data ?? this.presets[0].data, (data)=>{
            this.data = data;
        }).render(true);
    }
    async _onAssignDocument() {
        const layer = canvas.getLayerByEmbeddedName(this.presets[0].documentName);
        if (!layer) return;
        const data = layer.controlled.map((p)=>$d0a1f06830d69799$var$placeableToData(p));
        if (data.length) {
            this.data = data;
            ui.notifications.info((0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("presets.assign", {
                count: data.length,
                document: this.presets[0].documentName
            }));
            this.gridSize = canvas.grid.size;
            this.modifyOnSpawn = [];
            this.render(true);
        }
    }
    async _onEditDocument() {
        const documents1 = [];
        const cls = CONFIG[this.presets[0].documentName].documentClass;
        for (const p of this.presets)p.data.forEach((d)=>documents1.push(new cls($d0a1f06830d69799$var$mergePresetDataToDefaultDoc(p, d))));
        const app = await (0, $f3b8698a65c76e19$export$7ac7726310ec4fa4)(documents1, null, {
            presetEdit: true,
            callback: (obj)=>{
                this.addSubtract = {};
                this.randomize = {};
                for (const k of Object.keys(obj.data)){
                    if (k in obj.randomize) this.randomize[k] = obj.randomize[k];
                    if (k in obj.addSubtract) this.addSubtract[k] = obj.addSubtract[k];
                }
                this.data = obj.data;
                this.render(true);
            },
            forceForm: true
        });
        // For randomize and addSubtract only take into account the first preset
        // and apply them to the form
        const preset = new $d0a1f06830d69799$export$3463c369d5cc977f({
            data: {},
            randomize: this.presets[0].randomize,
            addSubtract: this.presets[0].addSubtract
        });
        setTimeout(()=>{
            app._applyPreset(preset);
        }, 400);
    }
    async _updatePresets(formData) {
        formData.name = formData.name.trim();
        formData.img = formData.img.trim() || null;
        formData.preSpawnScript = formData.preSpawnScript?.trim();
        formData.postSpawnScript = formData.postSpawnScript?.trim();
        for (const preset of this.presets){
            let update;
            if (this.isCreate) update = {
                name: formData.name || preset.name || (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.default-name"),
                img: formData.img ?? preset.img
            };
            else update = {
                name: formData.name || preset.name,
                img: formData.img || preset.img
            };
            if (this.data) update.data = this.data;
            if (this.addSubtract) update.addSubtract = this.addSubtract;
            if (this.randomize) update.randomize = this.randomize;
            if (this.modifyOnSpawn) update.modifyOnSpawn = this.modifyOnSpawn;
            if (this.gridSize) update.gridSize = this.gridSize;
            if (this.attached) update.attached = this.attached;
            if (formData.preSpawnScript != null) update.preSpawnScript = formData.preSpawnScript;
            if (formData.postSpawnScript != null) update.postSpawnScript = formData.postSpawnScript;
            if (formData.spawnRandom != null) update.spawnRandom = formData.spawnRandom;
            await preset.update(update);
        }
    }
    /* -------------------------------------------- */ /** @override */ async _updateObject(event, formData) {
        await this._updatePresets(formData);
        if (this.callback) this.callback(this.presets);
        return this.presets;
    }
}
class $d0a1f06830d69799$var$PresetFieldSelect extends FormApplication {
    static name = "PresetFieldSelect";
    constructor(data, callback){
        super();
        this.presetData = data;
        this.isObject = !(data instanceof Array);
        this.callback = callback;
    }
    /** @inheritdoc */ static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "sheet",
                "preset-field-select"
            ],
            template: `modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/preset/presetFieldSelect.html`,
            width: 600,
            resizable: false
        });
    }
    /* -------------------------------------------- */ activateListeners(html) {
        super.activateListeners(html);
        html.find(".item").on("click", this._onFieldClick);
    }
    _onFieldClick(e) {
        $d0a1f06830d69799$var$itemSelect(e, $(e.target).closest(".preset-field-list"));
    }
    /** @override */ async getData(options = {}) {
        let data = foundry.utils.flattenObject(this.presetData);
        const singleData = !this.isObject && this.presetData.length === 1;
        let index;
        let fields = [];
        for (const [k, v] of Object.entries(data)){
            if (!singleData) {
                const i = k.split(".")[0];
                if (!index) fields.push({
                    header: true,
                    index: 0
                });
                else if (i !== index) fields.push({
                    header: true,
                    index: i
                });
                index = i;
            }
            let label = k;
            if (singleData) label = label.substring(label.indexOf(".") + 1);
            let value;
            const t = foundry.utils.getType(v);
            if (t === "Object" || t === "Array" || t === "null") value = JSON.stringify(v);
            else value = v;
            fields.push({
                name: k,
                label: label,
                value: value,
                selected: false
            });
        }
        return {
            fields: fields
        };
    }
}
class $d0a1f06830d69799$var$PresetFieldDelete extends $d0a1f06830d69799$var$PresetFieldSelect {
    static name = "PresetFieldDelete";
    /* -------------------------------------------- */ /** @override */ get title() {
        return (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.select-delete");
    }
    /** @override */ async getData(options = {}) {
        const data = await super.getData(options);
        data.button = {
            icon: '<i class="fas fa-trash"></i>',
            text: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.delete")
        };
        return data;
    }
    /* -------------------------------------------- */ /** @override */ async _updateObject(event, formData) {
        let data = foundry.utils.flattenObject(this.presetData);
        const form = $(event.target).closest("form");
        form.find(".item.selected").each(function() {
            const name = $(this).attr("name");
            delete data[name];
        });
        data = expandObject(data);
        if (!this.isObject) {
            let reorganizedData = [];
            for(let i = 0; i < this.presetData.length; i++){
                if (!data[i]) continue;
                reorganizedData.push(data[i]);
            }
            data = reorganizedData;
        }
        this.callback(data);
    }
}
class $d0a1f06830d69799$var$PresetFieldModify extends $d0a1f06830d69799$var$PresetFieldSelect {
    static name = "PresetFieldModify";
    constructor(data, callback, modifyOnSpawn){
        super(data, callback);
        this.modifyOnSpawn = modifyOnSpawn ?? [];
    }
    /* -------------------------------------------- */ /** @override */ get title() {
        return (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.select-modify");
    }
    /** @override */ async getData(options = {}) {
        const data = await super.getData(options);
        data.button = {
            icon: '<i class="fas fa-check"></i>',
            text: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("CONTROLS.CommonSelect", false)
        };
        for (const field of data.fields)if (this.modifyOnSpawn.includes(field.name)) field.selected = true;
        return data;
    }
    /* -------------------------------------------- */ /** @override */ async _updateObject(event, formData) {
        const form = $(event.target).closest("form");
        const modifyOnSpawn = [];
        form.find(".item.selected").each(function() {
            let name = $(this).attr("name");
            modifyOnSpawn.push(name);
        });
        this.callback(modifyOnSpawn);
    }
}
class $d0a1f06830d69799$var$PresetFolderConfig extends FolderConfig {
    static name = "PresetFolderConfig";
    /** @inheritdoc */ static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [
                "sheet",
                "folder-edit"
            ],
            template: `modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/preset/presetFolderEdit.html`,
            width: 360
        });
    }
    /* -------------------------------------------- */ /** @override */ get id() {
        return this.object.id ? super.id : "folder-create";
    }
    /* -------------------------------------------- */ /** @override */ get title() {
        if (this.object.id) return `${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("FOLDER.Update", false)}: ${this.object.name}`;
        return (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("FOLDER.Create", false);
    }
    activateListeners(html) {
        super.activateListeners(html);
        html.find(".document-select").on("click", this._onDocumentChange.bind(this));
    }
    _onDocumentChange(event) {
        $(event.target).closest(".document-select").toggleClass("active");
    }
    /* -------------------------------------------- */ /** @inheritdoc */ async close(options = {}) {
        if (!this.options.submitOnClose) this.options.resolve?.(null);
        return super.close(options);
    }
    /* -------------------------------------------- */ /** @override */ async getData(options = {}) {
        const folder = this.document.toObject();
        const label = (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)(Folder.implementation.metadata.label, false);
        let folderDocs = folder.flags[0, $32e43d7a62aba58c$export$59dbefa3c1eecdf]?.types ?? [
            "ALL"
        ];
        let docs;
        // This is a non-placeable folder type, so we will not display controls to change types
        if (folderDocs.length === 1 && !(0, $32e43d7a62aba58c$export$6ba969594e8d224d).includes(folderDocs[0])) this.nonPlaceable = true;
        else {
            docs = [];
            (0, $32e43d7a62aba58c$export$6ba969594e8d224d).forEach((type)=>{
                docs.push({
                    name: type,
                    icon: $d0a1f06830d69799$var$DOC_ICONS[type],
                    active: folderDocs.includes(type)
                });
            });
        }
        return {
            folder: folder,
            name: folder._id ? folder.name : "",
            newName: (0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("DOCUMENT.New", {
                type: label
            }, false),
            safeColor: folder.color ?? "#000000",
            sortingModes: {
                a: "FOLDER.SortAlphabetical",
                m: "FOLDER.SortManual"
            },
            submitText: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)(folder._id ? "FOLDER.Update" : "FOLDER.Create", false),
            docs: docs
        };
    }
    /* -------------------------------------------- */ /** @override */ async _updateObject(event, formData) {
        if (!this.nonPlaceable) {
            let visibleTypes = [];
            $(this.form).find(".document-select.active").each(function() {
                visibleTypes.push($(this).data("name"));
            });
            if (!visibleTypes.length) visibleTypes.push("ALL");
            formData[`flags.${0, $32e43d7a62aba58c$export$59dbefa3c1eecdf}.types`] = visibleTypes;
        }
        let doc = this.object;
        if (!formData.name?.trim()) formData.name = Folder.implementation.defaultName();
        if (this.object.id) await this.object.update(formData);
        else {
            this.object.updateSource(formData);
            doc = await Folder.create(this.object, {
                pack: this.object.pack
            });
        }
        this.options.resolve?.(doc);
        return doc;
    }
}
function $d0a1f06830d69799$var$checkMouseInWindow(event) {
    let app = $(event.target).closest(".window-app");
    var offset = app.offset();
    let appX = offset.left;
    let appY = offset.top;
    let appW = app.width();
    let appH = app.height();
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    if (mouseX > appX && mouseX < appX + appW && mouseY > appY && mouseY < appY + appH) return true;
    return false;
}
function $d0a1f06830d69799$var$getCompendiumDialog(resolve, { excludePack: excludePack, exportTo: exportTo = false, keepIdSelect: keepIdSelect = false } = {}) {
    let config;
    if (exportTo) config = {
        title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.select-compendium"),
        message: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.export-directory-message"),
        buttonLabel: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("FOLDER.Export", false)
    };
    else config = {
        title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.select-compendium"),
        message: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.working-directory-message"),
        buttonLabel: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.swap")
    };
    let options = "";
    for (const p of game.packs)if (!p.locked && p.documentName === "JournalEntry") {
        if (p.collection === excludePack) continue;
        const workingPack = p.collection === $d0a1f06830d69799$export$9cea25aeb7365a59.workingPack;
        options += `<option value="${p.collection}" ${workingPack ? 'selected="selected"' : ""}>${p.title}</option>`;
    }
    let content = `
  <p style="color: orangered;">${config.message}</p>
  <div class="form-group">
    <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("PACKAGE.TagCompendium", false)}</label>
    <div class="form-fields">
      <select style="width: 100%; margin-bottom: 10px;">${options}</select>
    </div>
  </div>`;
    if (keepIdSelect) content += `
<div class="form-group">
    <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.keep-preset-ids")}</label>
    <input type="checkbox" name="keepId">
    <p style="font-size: smaller;">${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.keep-preset-ids-hint")}</p>
</div>`;
    new Dialog({
        title: config.title,
        content: content,
        buttons: {
            export: {
                label: config.buttonLabel,
                callback: (html)=>{
                    const pack = $(html).find("select").val();
                    if (keepIdSelect) resolve({
                        pack: pack,
                        keepId: $(html).find('[name="keepId"]').is(":checked")
                    });
                    else resolve(pack);
                }
            },
            cancel: {
                label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Cancel", false),
                callback: ()=>resolve(keepIdSelect ? {} : null)
            }
        },
        close: ()=>resolve(keepIdSelect ? {} : null),
        default: "cancel"
    }).render(true);
}
function $d0a1f06830d69799$var$mergePresetDataToDefaultDoc(preset, presetData) {
    let data;
    // Set default values if needed
    switch(preset.documentName){
        case "Token":
            data = {
                name: preset.name
            };
            break;
        case "Tile":
            data = {
                width: canvas.grid.w,
                height: canvas.grid.h
            };
            break;
        case "AmbientSound":
            data = {
                radius: 20
            };
            break;
        case "Drawing":
            data = {
                shape: {
                    width: canvas.grid.w * 2,
                    height: canvas.grid.h * 2,
                    strokeWidth: 8,
                    strokeAlpha: 1.0
                }
            };
            break;
        case "MeasuredTemplate":
            data = {
                distance: 10
            };
            break;
        case "AmbientLight":
            if (presetData.config?.dim == null && presetData.config?.bright == null) {
                data = {
                    config: {
                        dim: 20,
                        bright: 20
                    }
                };
                break;
            }
        case "Scene":
            data = {
                name: preset.name
            };
            break;
        default:
            data = {};
    }
    return foundry.utils.mergeObject(data, presetData);
}
function $d0a1f06830d69799$var$placeableToData(placeable) {
    const data = placeable.document.toCompendium();
    // Check if `Token Attacher` has attached elements to this token
    if (placeable.document.documentName === "Token" && game.modules.get("token-attacher")?.active && tokenAttacher?.generatePrototypeAttached) {
        const attached = data.flags?.["token-attacher"]?.attached || {};
        if (!foundry.utils.isEmpty(attached)) {
            const prototypeAttached = tokenAttacher.generatePrototypeAttached(data, attached);
            setProperty(data, "flags.token-attacher.attached", null);
            setProperty(data, "flags.token-attacher.prototypeAttached", prototypeAttached);
            setProperty(data, "flags.token-attacher.grid", {
                size: canvas.grid.size,
                w: canvas.grid.w,
                h: canvas.grid.h
            });
        }
    }
    return data;
}
/**
 * Controls select/multi-select flow for item lists
 * @param {*} e item click event
 * @param {*} itemList list of items that this item exists within
 */ function $d0a1f06830d69799$var$itemSelect(e, itemList) {
    const item = $(e.target).closest(".item");
    const items = itemList.find(".item");
    const lastSelected = items.filter(".last-selected");
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
        lastSelected.removeClass("last-selected");
        items.removeClass("selected");
        item.addClass("selected").addClass("last-selected");
    } else if (e.ctrlKey || e.metaKey) {
        item.toggleClass("selected");
        if (item.hasClass("selected")) {
            lastSelected.removeClass("last-selected");
            item.addClass("last-selected");
        } else item.removeClass("last-index");
    } else if (e.shiftKey) {
        if (lastSelected.length) {
            let itemIndex = items.index(item);
            let lastSelectedIndex = items.index(lastSelected);
            if (itemIndex === lastSelectedIndex) {
                item.toggleClass("selected");
                if (item.hasClass("selected")) item.addClass("last-selected");
                else lastSelected.removeClass("last-selected");
            } else {
                let itemArr = items.toArray();
                if (itemIndex > lastSelectedIndex) for(let i = lastSelectedIndex; i <= itemIndex; i++)$(itemArr[i]).addClass("selected");
                else for(let i = lastSelectedIndex; i >= itemIndex; i--)$(itemArr[i]).addClass("selected");
            }
        } else {
            lastSelected.removeClass("last-selected");
            item.toggleClass("selected");
            if (item.hasClass("selected")) item.addClass("last-selected");
        }
    }
}
function $d0a1f06830d69799$var$scaleDataToGrid(data, documentName, gridSize) {
    if (![
        "Tile",
        "Drawing",
        "Wall"
    ].includes(documentName)) return;
    if (!gridSize) gridSize = 100;
    const ratio = canvas.grid.size / gridSize;
    for (const d of data)switch(documentName){
        case "Tile":
            if ("width" in d) d.width *= ratio;
            if ("height" in d) d.height *= ratio;
            break;
        case "Drawing":
            if (d.shape?.width != null) d.shape.width *= ratio;
            if (d.shape?.height != null) d.shape.height *= ratio;
            break;
        case "Wall":
            if ("c" in d) for(let i = 0; i < d.c.length; i++)d.c[i] *= ratio;
            break;
    }
}
/**
 * Opens a GenericMassEdit form to modify specific fields within the provided data
 * @param {Object} data            data to be modified
 * @param {Array[String]} toModify fields within data to be modified
 * @returns modified data or null if form was canceled
 */ async function $d0a1f06830d69799$var$modifySpawnData(data, toModify) {
    const fields = {};
    const flatData = foundry.utils.flattenObject(data);
    for (const field of toModify)if (field in flatData) {
        if (flatData[field] == null) fields[field] = "";
        else fields[field] = flatData[field];
    }
    if (!foundry.utils.isEmpty(fields)) await new Promise((resolve)=>{
        (0, $f3b8698a65c76e19$export$609bf259f643e4ef)(fields, "PresetFieldModify", {
            callback: (modified)=>{
                if (foundry.utils.isEmpty(modified)) {
                    if (modified == null) data = null;
                    resolve();
                    return;
                }
                for (const [k, v] of Object.entries(modified))flatData[k] = v;
                const tmpData = foundry.utils.expandObject(flatData);
                const reorganizedData = [];
                for(let i = 0; i < data.length; i++)reorganizedData.push(tmpData[i]);
                data = reorganizedData;
                resolve();
            },
            simplified: true,
            noTabs: true
        });
    });
    return data;
}
/**
 * Return Mass Edit form that the mouse is over if any
 * @param {Number} mouseX
 * @param {Number} mouseY
 * @param {String} documentName
 * @returns {Application|null} MassEdit form
 */ function $d0a1f06830d69799$var$hoverMassEditForm(mouseX, mouseY, documentName) {
    const hitTest = function(app) {
        const position = app.position;
        const appX = position.left;
        const appY = position.top;
        if (mouseX > appX && mouseX < appX + position.width && mouseY > appY && mouseY < appY + position.height) return true;
        return false;
    };
    return Object.values(ui.windows).find((app)=>app.meForm && app.documentName === documentName && hitTest(app));
}



const $32e43d7a62aba58c$export$b4bbd936310fc9b9 = [
    "Token",
    "MeasuredTemplate",
    "Tile",
    "Drawing",
    "Wall",
    "AmbientLight",
    "AmbientSound",
    "Note"
];
const $32e43d7a62aba58c$export$6ba969594e8d224d = [
    "ALL",
    ...$32e43d7a62aba58c$export$b4bbd936310fc9b9
];
const $32e43d7a62aba58c$export$957755bc1004817b = [
    ...$32e43d7a62aba58c$export$b4bbd936310fc9b9,
    "Actor",
    "PlaylistSound",
    "Scene"
];
const $32e43d7a62aba58c$export$de10d55d23082cf5 = [
    ...$32e43d7a62aba58c$export$b4bbd936310fc9b9,
    "Scene",
    "Actor",
    "PlaylistSound"
];
const $32e43d7a62aba58c$export$f5ba4890ae0d16ac = [
    "Item",
    "Cards",
    "RollTable",
    "Actor",
    "JournalEntry",
    "Scene"
];
function $32e43d7a62aba58c$export$5931e35698b46017(u, c1, c2) {
    return c1.map((a, i)=>Math.floor((1 - u) * a + u * c2[i]));
}
const $32e43d7a62aba58c$export$59dbefa3c1eecdf = "multi-token-edit";
function $32e43d7a62aba58c$export$fb85bc5d6d9ef19b(path) {
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
function $32e43d7a62aba58c$export$ac5608bbe92d6fdc(path) {
    var extension = path.split(".");
    extension = extension[extension.length - 1].toLowerCase();
    return [
        "mp4",
        "ogg",
        "webm",
        "m4v"
    ].includes(extension);
}
async function $32e43d7a62aba58c$export$80540dd209b86671(path, source, bucket, files = []) {
    const result = await FilePicker.browse(source, path, {
        bucket: bucket
    });
    if (result) {
        for (const file of result.files)files.push(file);
        for (const dir of result.dirs)await $32e43d7a62aba58c$export$80540dd209b86671(dir, source, bucket, files);
    }
    return files;
}
function $32e43d7a62aba58c$export$7a171f172be0782e(obj) {
    return obj.document ? obj.document : obj;
}
function $32e43d7a62aba58c$export$be67e9bf7f25c9c4(data, flag, flagVal) {
    if (data[flag] == flagVal) return true;
    const falseyFlagVal = flagVal == null || flagVal === false || flagVal === "" || foundry.utils.getType(flagVal) === "Object" && foundry.utils.isEmpty(flagVal);
    const falseyDataVal = data[flag] == null || data[flag] === false || data[flag] === "" || foundry.utils.getType(data[flag]) === "Object" && foundry.utils.isEmpty(data[flag]);
    if (falseyFlagVal && falseyDataVal) return true;
    // Special treatment for Tagger module's tags
    // Instead of directly comparing string we check if it contains the string
    if (flag === "flags.tagger.tags") {
        const tags = data[flag] || [];
        let compTags = flagVal;
        if (!Array.isArray(compTags)) compTags = flagVal ? flagVal.split(",").map((s)=>s.trim()) : [];
        for (const t of compTags){
            if (!tags.includes(t)) return false;
        }
        return true;
    }
    if (flagVal && typeof flagVal === "string" && flagVal.includes("*")) return $32e43d7a62aba58c$export$60f577390164ed4f(flagVal, data[flag]);
    return false;
}
function $32e43d7a62aba58c$export$12582391526ed7a4(flag, formData) {
    const comp = flag.split(".");
    for(let i = comp.length - 1; i >= 1; i--){
        const tempFlag = comp.slice(0, i).join(".") + ".-=" + comp[i];
        if (tempFlag in formData) return tempFlag;
    }
    return null;
}
function $32e43d7a62aba58c$export$cb264c2e048afacf(form, fields) {
    if (!fields) return;
    for (const key of Object.keys(fields))form.find(`[name="${key}"]`).removeClass("me-add").removeClass("me-subtract").addClass(fields[key].method === "add" ? "me-add" : "me-subtract").attr("title", fields[key].method === "add" ? `+ ${$32e43d7a62aba58c$export$b3bd0bc58e36cd63("form.adding")}` : `- ${$32e43d7a62aba58c$export$b3bd0bc58e36cd63("form.subtracting")}`);
}
function $32e43d7a62aba58c$export$1ced7b3ceb2cd439(updates, objects, docName, addSubtractFields) {
    // See if any field need to be added or subtracted
    if (!addSubtractFields || foundry.utils.isEmpty(addSubtractFields)) return;
    for(let i = 0; i < updates.length; i++){
        const update = updates[i];
        const data = foundry.utils.flattenObject($32e43d7a62aba58c$export$7a171f172be0782e(objects[i]).toObject());
        (0, $59fc6fe4c07de9fd$export$d5bbc12fef4eed7f).dataToForm(docName, objects[i], data);
        for (const field of Object.keys(update))if (field in addSubtractFields && field in data) {
            const ctrl = addSubtractFields[field];
            let val = data[field];
            // Special processing for Tagger module fields
            if (field === "flags.tagger.tags") {
                const currentTags = Array.isArray(val) ? val : (val ?? "").split(",").map((s)=>s.trim());
                const modTags = (update[field] ?? "").split(",").map((s)=>s.trim());
                for (const tag of modTags){
                    if (ctrl.method === "add") {
                        if (!currentTags.includes(tag)) currentTags.push(tag);
                    } else if (ctrl.method === "subtract") {
                        const index = currentTags.indexOf(tag);
                        if (index > -1) currentTags.splice(index, 1);
                    }
                }
                update[field] = currentTags.filter((t)=>t).join(",");
                continue;
            } else if (ctrl.type === "text") {
                if (ctrl.method === "add") {
                    const toAdd = "value" in ctrl ? ctrl.value : update[field];
                    if (toAdd.startsWith(">>")) val = toAdd.replace(">>", "") + val;
                    else val += toAdd;
                } else val = val.replace("value" in ctrl ? ctrl.value : update[field], "");
                update[field] = val;
                continue;
            }
            if (ctrl.method === "add") val += "value" in ctrl ? ctrl.value : update[field];
            else val -= "value" in ctrl ? ctrl.value : update[field];
            if ("min" in ctrl && val < ctrl.min) val = ctrl.min;
            else if ("max" in ctrl && val > ctrl.max) val = ctrl.max;
            update[field] = val;
        }
    }
}
function $32e43d7a62aba58c$export$a88e9f7fc35c8ffa(objects) {
    if (!objects || !objects.length) return {};
    const commonData = foundry.utils.flattenObject(objects[0]);
    for(let i = 1; i < objects.length; i++){
        const diff = foundry.utils.flattenObject(foundry.utils.diffObject(commonData, foundry.utils.flattenObject(objects[i])));
        for (const k of Object.keys(diff)){
            // Special handling for empty/undefined data
            if ((diff[k] === "" || diff[k] == null) && (commonData[k] === "" || commonData[k] == null)) ;
            else delete commonData[k];
        }
    }
    return commonData;
}
function $32e43d7a62aba58c$export$1c723ddaaf731bd0(original, other = {}, nestedKey = "") {
    if (!other) return;
    for (const [key, val] of Object.entries(original)){
        const fullKey = nestedKey ? nestedKey + "." + key : key;
        const t = foundry.utils.getType(val);
        if (t === "Object") $32e43d7a62aba58c$export$1c723ddaaf731bd0(val, other, fullKey);
        else {
            const prop = getProperty(other, fullKey);
            if (prop !== undefined) original[key] = prop;
        }
    }
}
function $32e43d7a62aba58c$export$835b3e9cf0bd96cf(placeables) {
    placeables = placeables.map((p)=>p.object ?? p).filter((p)=>p.center);
    if (placeables.length) {
        if (placeables.length === 1) {
            if (placeables[0].center?.x) canvas.animatePan({
                x: placeables[0].center.x,
                y: placeables[0].center.y,
                duration: 250
            });
        } else {
            // Determine top left and bottom right corners to later determine the view's center position and scale
            const topLeft = {
                x: 999999999,
                y: 999999999
            };
            const bottomRight = {
                x: -999999999,
                y: -999999999
            };
            for (let p of placeables){
                let tlc = p;
                if (p instanceof Wall) tlc = {
                    x: p.center.x - p.width / 2,
                    y: p.center.y - p.height / 2
                };
                if (tlc.x < topLeft.x) topLeft.x = tlc.x;
                if (tlc.y < topLeft.y) topLeft.y = tlc.y;
                if (tlc.x + p.width > bottomRight.x) bottomRight.x = tlc.x + p.width;
                if (tlc.y + p.height > bottomRight.y) bottomRight.y = tlc.y + p.height;
            }
            // Checking if screen at current scale fits placeables along x and y axis
            let scale = canvas.scene._viewPosition.scale;
            // Adjust the size of the rectangle that placeable occupy in our scale calculations
            // to account for UI elements
            const padding = 100;
            if (bottomRight.x - topLeft.x + padding > canvas.screenDimensions[0] / scale) scale = canvas.screenDimensions[0] / (bottomRight.x - topLeft.x + padding);
            if (bottomRight.y - topLeft.y + padding > canvas.screenDimensions[1] / scale) scale = canvas.screenDimensions[1] / (bottomRight.y - topLeft.y + padding);
            canvas.animatePan({
                duration: 250,
                scale: scale,
                x: (bottomRight.x - topLeft.x) / 2 + topLeft.x,
                y: (bottomRight.y - topLeft.y) / 2 + topLeft.y
            });
        }
    }
}
function $32e43d7a62aba58c$export$d41d9ab3de2def3d(str) {
    let hash = 0;
    for(let i = 0, len = str.length; i < len; i++){
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
function $32e43d7a62aba58c$var$escapeRegex(string) {
    return string.replace(/[/\-\\^$+?.()|[\]{}]/g, "\\$&");
}
function $32e43d7a62aba58c$export$60f577390164ed4f(sw, s2) {
    return new RegExp("^" + $32e43d7a62aba58c$var$escapeRegex(sw).replaceAll("*", ".*") + "$").test(s2);
}
function $32e43d7a62aba58c$export$79d744e95e10dc09(sw, replaceWith, s2) {
    let re = new RegExp($32e43d7a62aba58c$var$escapeRegex(sw).replaceAll("*", ".*"), "g");
    return s2.replaceAll(re, replaceWith);
}
function $32e43d7a62aba58c$export$aef0873d63458016(sw, replaceWith, s2) {
    try {
        let re = new RegExp(sw, "g");
        return s2.replaceAll(re, replaceWith);
    } catch (e) {}
    return s2;
}
function $32e43d7a62aba58c$export$8aed4ff85b767892(obj, d = 0) {
    if (d === 0) return obj;
    const flat = {};
    for (let [k, v] of Object.entries(obj)){
        let t = foundry.utils.getType(v);
        if (t === "Object") {
            if (foundry.utils.isEmpty(v)) flat[k] = v;
            let inner = $32e43d7a62aba58c$export$8aed4ff85b767892(v, d - 1);
            for (let [ik, iv] of Object.entries(inner))flat[`${k}.${ik}`] = iv;
        } else flat[k] = v;
    }
    return flat;
}
function $32e43d7a62aba58c$export$1eeaf2f7f77dcac8(aeConfig) {
    const showPresetGeneric = function(docName) {
        new (0, $d0a1f06830d69799$export$7a966e8b4abecc03)(aeConfig, async (preset)=>{
            if (!foundry.utils.isEmpty(preset.randomize)) await (0, $3180f13c9e24a345$export$4bafa436c0fa0cbb)(preset.data, null, preset.randomize);
            const changes = aeConfig.object.changes ?? [];
            let nChanges = [];
            Object.keys(preset.data[0]).forEach((k)=>{
                let value;
                if (foundry.utils.getType(preset.data[0][k]) === "string") value = preset.data[0][k];
                else value = JSON.stringify(preset.data[0][k]);
                nChanges.push({
                    key: docName === "Token" ? "ATL." + k : k,
                    mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
                    priority: 20,
                    value: value
                });
            });
            for(let i = changes.length - 1; i >= 0; i--)if (!nChanges.find((nc)=>nc.key === changes[i].key)) nChanges.unshift(changes[i]);
            aeConfig.object.update({
                changes: nChanges
            });
        }, docName).render(true);
    };
    const showPresetActiveEffect = function() {
        new (0, $d0a1f06830d69799$export$7a966e8b4abecc03)(aeConfig, (preset)=>{
            const changes = aeConfig.object.changes ?? [];
            let nChanges = [];
            preset.data[0].changes?.forEach((change)=>{
                if (change.key) nChanges.push(foundry.utils.mergeObject({
                    mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
                    priority: 20
                }, change));
            });
            for(let i = changes.length - 1; i >= 0; i--)if (!nChanges.find((nc)=>nc.key === changes[i].key)) nChanges.unshift(changes[i]);
            aeConfig.object.update({
                changes: nChanges
            });
        }, "ActiveEffect").render(true);
    };
    new Dialog({
        title: $32e43d7a62aba58c$export$b3bd0bc58e36cd63("common.presets"),
        content: ``,
        buttons: {
            activeEffect: {
                label: "ActiveEffect",
                callback: ()=>showPresetActiveEffect()
            },
            token: {
                label: "Token",
                callback: ()=>showPresetGeneric("Token")
            },
            actor: {
                label: "Actor",
                callback: ()=>showPresetGeneric("Actor")
            }
        }
    }).render(true);
}
function $32e43d7a62aba58c$export$c29f08336649747(doc) {
    const docName = doc.document ? doc.document.documentName : doc.documentName;
    return docName ?? "NONE";
}
const $32e43d7a62aba58c$export$3bb8c85ed320ac91 = {};
async function $32e43d7a62aba58c$export$24b03028f6f659d0(documentName, data, sceneID) {
    if (game.user.isGM) return game.scenes.get(sceneID).createEmbeddedDocuments(documentName, data);
    const requestID = foundry.utils.randomID();
    const message = {
        handlerName: "document",
        args: {
            sceneID: sceneID,
            documentName: documentName,
            data: data,
            requestID: requestID
        },
        type: "CREATE"
    };
    game.socket.emit(`module.${$32e43d7a62aba58c$export$59dbefa3c1eecdf}`, message);
    // Self resolve in 4s if no response from a GM is received
    setTimeout(()=>{
        $32e43d7a62aba58c$export$3bb8c85ed320ac91[requestID]?.([]);
    }, 4000);
    return new Promise((resolve)=>{
        $32e43d7a62aba58c$export$3bb8c85ed320ac91[requestID] = resolve;
    });
}
function $32e43d7a62aba58c$export$c36e29304d06f075({ requestID: requestID, sceneID: sceneID, documentName: documentName, documentIDs: documentIDs } = {}) {
    if (!$32e43d7a62aba58c$export$3bb8c85ed320ac91.hasOwnProperty(requestID)) return;
    const scene = game.scenes.get(sceneID);
    const documents = [];
    for (const docID of documentIDs)documents.push(scene.getEmbeddedDocument(documentName, docID));
    $32e43d7a62aba58c$export$3bb8c85ed320ac91[requestID](documents);
    delete $32e43d7a62aba58c$export$3bb8c85ed320ac91[requestID];
}
class $32e43d7a62aba58c$export$ba25329847403e11 {
    static pickerOverlay;
    static boundStart;
    static boundEnd;
    static callback;
    /**
   * Activates the picker overlay.
   * @param {Function} callback callback function with coordinates returned as starting and ending bounds of a rectangles
   *                            { start: {x1, y1}, end: {x2, y2} }
   * @param {Object}  preview
   * @param {String}  preview.documentName (optional) preview placeables document name
   * @param {Map[String,Array]}  preview.previewData    (req) preview placeables data
   * @param {String}  preview.taPreview            (optional) Designates the preview placeable when spawning a `Token Attacher` prefab.
   *                                                e.g. "Tile", "Tile.1", "MeasuredTemplate.3"
   * @param {Boolean} preview.snap                  (optional) if true returned coordinates will be snapped to grid
   * @param {String}  preview.label                  (optional) preview placeables document name
   */ static async activate(callback, preview) {
        if (this.pickerOverlay) {
            canvas.stage.removeChild(this.pickerOverlay);
            this.pickerOverlay.destroy(true);
            this.pickerOverlay.children?.forEach((c)=>c.destroy(true));
            this.callback?.(null);
        }
        const pickerOverlay = new PIXI.Container();
        this.callback = callback;
        if (preview) {
            let label;
            if (preview.label) {
                label = new PreciseText(preview.label, {
                    ...CONFIG.canvasTextStyle,
                    _fontSize: 24
                });
                label.anchor.set(0.5, 1);
                pickerOverlay.addChild(label);
            }
            const { previews: previews, layer: layer, previewDocuments: previewDocuments } = await this._genPreviews(preview);
            const setPositions = function(pos) {
                if (!pos) return;
                if (preview.snap && layer && !game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT)) pos = canvas.grid.getSnappedPosition(pos.x, pos.y, layer.gridPrecision);
                for (const preview of previews){
                    if (preview.document.documentName === "Wall") {
                        const c = preview.document.c;
                        c[0] = pos.x + preview._previewOffset[0];
                        c[1] = pos.y + preview._previewOffset[1];
                        c[2] = pos.x + preview._previewOffset[2];
                        c[3] = pos.y + preview._previewOffset[3];
                        preview.document.c = c;
                    } else {
                        preview.document.x = pos.x + preview._previewOffset.x;
                        preview.document.y = pos.y + preview._previewOffset.y;
                    }
                    preview.document.alpha = 0.4;
                    preview.renderFlags.set({
                        refresh: true
                    });
                    preview.visible = true;
                    if (preview.controlIcon && !preview.controlIcon._meVInsert) {
                        preview.controlIcon.alpha = 0.4;
                        // ControlIcon visibility is difficult to set and keep as true
                        // Lets hack it by defining a getter that always returns true
                        Object.defineProperty(preview.controlIcon, "visible", {
                            get: function() {
                                return true;
                            },
                            set: function() {}
                        });
                        preview.controlIcon._meVInsert = true;
                    }
                }
                if (label) {
                    label.x = pos.x;
                    label.y = pos.y - 38;
                }
                pickerOverlay.previewDocuments = previewDocuments;
            };
            pickerOverlay.on("pointermove", (event)=>{
                setPositions(event.data.getLocalPosition(pickerOverlay));
            });
            setPositions(canvas.mousePosition);
        }
        pickerOverlay.hitArea = canvas.dimensions.rect;
        pickerOverlay.cursor = "crosshair";
        pickerOverlay.interactive = true;
        pickerOverlay.zIndex = Infinity;
        pickerOverlay.on("remove", ()=>pickerOverlay.off("pick"));
        pickerOverlay.on("mousedown", (event)=>{
            $32e43d7a62aba58c$export$ba25329847403e11.boundStart = event.data.getLocalPosition(pickerOverlay);
        });
        pickerOverlay.on("mouseup", (event)=>$32e43d7a62aba58c$export$ba25329847403e11.boundEnd = event.data.getLocalPosition(pickerOverlay));
        pickerOverlay.on("click", (event)=>{
            if (event.nativeEvent.which == 2) this.callback?.(null);
            else this.callback?.({
                start: this.boundStart,
                end: this.boundEnd
            });
            pickerOverlay.parent.removeChild(pickerOverlay);
            if (pickerOverlay.previewDocuments) pickerOverlay.previewDocuments.forEach((name)=>canvas.getLayerByEmbeddedName(name)?.clearPreviewContainer());
        });
        this.pickerOverlay = pickerOverlay;
        canvas.stage.addChild(this.pickerOverlay);
    }
    // Modified Foundry _createPreview
    // Does not throw warning if user lacks document create permissions
    static async _createPreview(createData) {
        const documentName = this.constructor.documentName;
        const cls = getDocumentClass(documentName);
        createData._id = foundry.utils.randomID(); // Needed to allow rendering of multiple previews at the same time
        const document = new cls(createData, {
            parent: canvas.scene
        });
        const object = new CONFIG[documentName].objectClass(document);
        this.preview.addChild(object);
        await object.draw();
        return object;
    }
    static async _genPreviews(preview) {
        if (!preview.previewData) return {
            previews: []
        };
        const previewDocuments = new Set();
        const previews = [];
        let mainPreviewX;
        let mainPreviewY;
        for (const [documentName, dataArr] of preview.previewData.entries()){
            const layer = canvas.getLayerByEmbeddedName(documentName);
            for (const data of dataArr){
                // Create Preview
                const previewObject = await this._createPreview.call(layer, deepClone(data));
                previews.push(previewObject);
                previewDocuments.add(documentName);
                // Determine point around which other previews are to be placed
                if (mainPreviewX == null) {
                    if (documentName === "Wall") {
                        if (data.c != null) {
                            mainPreviewX = previewObject.document.c[0];
                            mainPreviewY = previewObject.document.c[1];
                        }
                    } else if (data.x != null && data.y != null) {
                        mainPreviewX = previewObject.document.x;
                        mainPreviewY = previewObject.document.y;
                    }
                }
                // Calculate offset from first preview
                if (documentName === "Wall") {
                    const off = [
                        previewObject.document.c[0] - (mainPreviewX ?? 0),
                        previewObject.document.c[1] - (mainPreviewY ?? 0),
                        previewObject.document.c[2] - (mainPreviewX ?? 0),
                        previewObject.document.c[3] - (mainPreviewY ?? 0)
                    ];
                    previewObject._previewOffset = off;
                } else previewObject._previewOffset = {
                    x: previewObject.document.x - (mainPreviewX ?? 0),
                    y: previewObject.document.y - (mainPreviewY ?? 0)
                };
                if (preview.taPreview && documentName === "Token") {
                    const documentNames = await this._genTAPreviews(data, preview.taPreview, previewObject, previews);
                    documentNames.forEach((dName)=>previewDocuments.add(dName));
                }
            }
        }
        return {
            previews: previews,
            layer: canvas.getLayerByEmbeddedName(preview.documentName),
            previewDocuments: previewDocuments
        };
    }
    static _parseTAPreview(taPreview, attached) {
        if (taPreview === "ALL") return attached;
        const attachedData = {};
        taPreview = taPreview.split(",");
        for (const taIndex of taPreview){
            let [name, index] = taIndex.trim().split(".");
            if (!attached[name]) continue;
            if (index == null) attachedData[name] = attached[name];
            else if (attached[name][index]) {
                if (!attachedData[name]) attachedData[name] = [];
                attachedData[name].push(attached[name][index]);
            }
        }
        return attachedData;
    }
    static async _genTAPreviews(data, taPreview, parent, previews) {
        if (!game.modules.get("token-attacher")?.active) return [];
        const attached = getProperty(data, "flags.token-attacher.prototypeAttached");
        const pos = getProperty(data, "flags.token-attacher.pos");
        const grid = getProperty(data, "flags.token-attacher.grid");
        if (!(attached && pos && grid)) return [];
        const documentNames = new Set();
        const ratio = canvas.grid.size / grid.size;
        const attachedData = this._parseTAPreview(taPreview, attached);
        for (const [name, dataList] of Object.entries(attachedData))for (const data of dataList){
            if ([
                "Token",
                "Tile",
                "Drawing"
            ].includes(name)) {
                data.width *= ratio;
                data.height *= ratio;
            }
            const taPreviewObject = await this._createPreview.call(canvas.getLayerByEmbeddedName(name), data);
            documentNames.add(name);
            previews.push(taPreviewObject);
            // Calculate offset from parent preview
            if (name === "Wall") taPreviewObject._previewOffset = [
                (data.c[0] - pos.xy.x) * ratio + parent._previewOffset.x,
                (data.c[1] - pos.xy.y) * ratio + parent._previewOffset.y,
                (data.c[2] - pos.xy.x) * ratio + parent._previewOffset.x,
                (data.c[3] - pos.xy.y) * ratio + parent._previewOffset.y
            ];
            else taPreviewObject._previewOffset = {
                x: (data.x - pos.xy.x) * ratio + parent._previewOffset.x,
                y: (data.y - pos.xy.y) * ratio + parent._previewOffset.y
            };
        }
        return documentNames;
    }
}
function $32e43d7a62aba58c$export$b3bd0bc58e36cd63(path, moduleLocalization = true) {
    if (moduleLocalization) return game.i18n.localize(`MassEdit.${path}`);
    return game.i18n.localize(path);
}
function $32e43d7a62aba58c$export$6ea486f4767e8a74(path, insert, moduleLocalization = true) {
    if (moduleLocalization) return game.i18n.format(`MassEdit.${path}`, insert);
    return game.i18n.format(path, insert);
}
async function $32e43d7a62aba58c$export$767e4c91777ecf4c(preset) {
    if (preset && canvas.scene) {
        const data = foundry.utils.flattenObject(preset.data[0]);
        const randomizer = preset.randomize;
        if (!foundry.utils.isEmpty(randomizer)) await (0, $3180f13c9e24a345$export$4bafa436c0fa0cbb)([
            data
        ], null, randomizer);
        await canvas.scene.update(data);
        // Grid doesn't redraw on scene update, do it manually here
        if ("grid.color" in data || "grid.alpha" in data) canvas.grid.grid.draw({
            color: (data["grid.color"] ?? canvas.scene.grid.color).replace("#", "0x"),
            alpha: Number(data["grid.alpha"] ?? canvas.scene.grid.alpha)
        });
    }
}
async function $32e43d7a62aba58c$export$9087f1a05b437404(command, { actor: actor, token: token, ...scope } = {}) {
    // Add variables to the evaluation scope
    const speaker = ChatMessage.implementation.getSpeaker({
        actor: actor,
        token: token
    });
    const character = game.user.character;
    token = token || (canvas.ready ? canvas.tokens.get(speaker.token) : null);
    actor = actor || token?.actor || game.actors.get(speaker.actor);
    // Unpack argument names and values
    const argNames = Object.keys(scope);
    if (argNames.some((k)=>Number.isNumeric(k))) throw new Error("Illegal numeric Macro parameter passed to execution scope.");
    const argValues = Object.values(scope);
    // Define an AsyncFunction that wraps the macro content
    const AsyncFunction = (async function() {}).constructor;
    // eslint-disable-next-line no-new-func
    const fn = new AsyncFunction("speaker", "actor", "token", "character", "scope", ...argNames, `{${command}\n}`);
    // Attempt macro execution
    try {
        return await fn.call(this, speaker, actor, token, character, scope, ...argValues);
    } catch (err) {
        ui.notifications.error("MACRO.Error", {
            localize: true
        });
    }
}


function $159f597adada9fb6$export$22f14d854f7eba2() {
    let content = "";
    for (const config of (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).concat((0, $32e43d7a62aba58c$export$f5ba4890ae0d16ac)))content += `<option value="${config}">${config}</option>`;
    content = `<label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("dialog.search-document")}</label>
    <select style="width: 100%;" name="documentName">${content}</select>`;
    new Dialog({
        title: "Document SEARCH",
        content: content,
        buttons: {
            select: {
                icon: '<i class="fas fa-check"></i>',
                label: "Select",
                callback: (html)=>{
                    const documentName = html.find("select[name='documentName']").val();
                    let docs = [];
                    if ((0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(documentName)) {
                        const layer = (0, $f3b8698a65c76e19$export$82c7bfc790fc617)[documentName];
                        if (layer && canvas[layer].placeables.length) docs = canvas[layer].placeables;
                    } else docs = Array.from(game.collections.get(documentName));
                    if (docs.length) (0, $f3b8698a65c76e19$export$5092c3abb1d2db42)(docs[0]);
                    else ui.notifications.warn((0, $32e43d7a62aba58c$export$6ea486f4767e8a74)("dialog.document-not-found", {
                        document: documentName
                    }));
                }
            }
        }
    }).render(true);
}
async function $159f597adada9fb6$export$54355b03ee60ee6e() {
    const content = `
  <div class="form-group">
      <label for="data">${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("FILES.SelectFile", false)} </label>
      <input type="file" name="data">
  </div>
  `;
    let dialog = new Promise((resolve, reject)=>{
        new Dialog({
            title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("presets.import"),
            content: content,
            buttons: {
                import: {
                    icon: '<i class="fas fa-file-import"></i>',
                    label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.import"),
                    callback: async (html)=>{
                        let presets;
                        readTextFromFile(html.find('[name="data"]')[0].files[0]).then((json)=>{
                            try {
                                presets = JSON.parse(json);
                            } catch (e) {}
                            resolve(presets);
                        });
                    }
                },
                no: {
                    icon: '<i class="fas fa-times"></i>',
                    label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Cancel", false),
                    callback: ()=>resolve(false)
                }
            },
            default: "no"
        }, {
            width: 400
        }).render(true);
    });
    return await dialog;
}





const $d90d2371b0027c40$export$549879c0f3abf4f2 = {
    field: {
        shieldType: {
            range: true,
            min: "0",
            max: "13",
            step: "1"
        },
        blend: {
            range: true,
            min: "0",
            max: "16",
            step: "1"
        },
        scale: {
            range: true,
            min: "0",
            max: "5",
            step: "0.01"
        },
        radius: {
            range: true,
            min: "0",
            max: "5",
            step: "0.01"
        },
        intensity: {
            range: true,
            min: "0",
            max: "5",
            step: "0.01"
        },
        lightAlpha: {
            range: true,
            min: "0",
            max: "50",
            step: "0.1"
        },
        gridPadding: {
            range: true,
            min: "0",
            max: "5",
            step: "0.01"
        },
        lightSize: {
            range: true,
            min: "0",
            max: "20",
            step: "0.1"
        },
        animated: {
            time: {
                speed: {
                    range: true,
                    min: "0",
                    max: "0.05",
                    step: "0.0001"
                }
            }
        }
    },
    fire: {
        fireBlend: {
            range: true,
            min: "0",
            max: "13",
            step: "1"
        },
        blend: {
            range: true,
            min: "0",
            max: "13",
            step: "1"
        },
        animated: {
            intensity: {
                animType: {
                    select: true,
                    options: [
                        "syncChaoticOscillation",
                        "syncSinOscillation",
                        "syncCosOscillation",
                        "chaoticOscillation",
                        "halfSinOscillation",
                        "sinOscillation",
                        "halfCosOscillation",
                        "cosOscillation",
                        "syncColorOscillation",
                        "halfColorOscillation",
                        "colorOscillation"
                    ]
                },
                val2: {
                    range: true,
                    min: "0",
                    max: "5",
                    step: "0.1"
                },
                val1: {
                    range: true,
                    min: "0",
                    max: "5",
                    step: "0.1"
                },
                loopDuration: {
                    range: true,
                    min: "0",
                    max: "50000",
                    step: "100"
                }
            },
            amplitude: {
                animType: {
                    select: true,
                    options: [
                        "syncChaoticOscillation",
                        "syncSinOscillation",
                        "syncCosOscillation",
                        "chaoticOscillation",
                        "halfSinOscillation",
                        "sinOscillation",
                        "halfCosOscillation",
                        "cosOscillation",
                        "syncColorOscillation",
                        "halfColorOscillation",
                        "colorOscillation"
                    ]
                },
                loopDuration: {
                    range: true,
                    min: "0",
                    max: "50000",
                    step: "100"
                },
                val1: {
                    range: true,
                    min: "0",
                    max: "5",
                    step: "0.1"
                },
                val2: {
                    range: true,
                    min: "0",
                    max: "5",
                    step: "0.1"
                }
            }
        },
        intensity: {
            range: true,
            min: "0",
            max: "100",
            step: "0.1"
        }
    },
    electric: {
        blend: {
            range: true,
            min: "0",
            max: "13",
            step: "1"
        }
    },
    xglow: {
        auraType: {
            range: true,
            min: "0",
            max: "2",
            step: "1"
        },
        scale: {
            range: true,
            min: "0",
            max: "30",
            step: "0.1"
        },
        auraIntensity: {
            range: true,
            min: "0",
            max: "20",
            step: "0.1"
        },
        subAuraIntensity: {
            range: true,
            min: "0",
            max: "20",
            step: "0.1"
        },
        threshold: {
            range: true,
            min: "0",
            max: "2",
            step: "0.01"
        },
        thickness: {
            range: true,
            min: "0",
            max: "20",
            step: "0.1"
        }
    },
    glow: {
        outerStrength: {
            range: true,
            min: "0",
            max: "50",
            step: "0.1"
        },
        innerStrength: {
            range: true,
            min: "0",
            max: "50",
            step: "0.1"
        },
        padding: {
            range: true,
            min: "0",
            max: "100",
            step: "1"
        },
        alpha: {
            range: true,
            min: "0",
            max: "1",
            step: "0.01"
        }
    },
    zapshadow: {
        alphaTolerance: {
            range: true,
            min: "0",
            max: "1",
            step: "0.01"
        }
    },
    sprite: {
        blendMode: {
            range: true,
            min: "0",
            max: "16",
            step: "1"
        },
        gridPadding: {
            range: true,
            min: "0",
            max: "5",
            step: "0.1"
        },
        scaleX: {
            range: true,
            min: "0",
            max: "3",
            step: "0.01"
        },
        scaleY: {
            range: true,
            min: "0",
            max: "3",
            step: "0.01"
        },
        translationX: {
            range: true,
            min: "-1",
            max: "1",
            step: "0.001"
        },
        translationY: {
            range: true,
            min: "-1",
            max: "1",
            step: "0.001"
        },
        rotation: {
            range: true,
            min: "0",
            max: "360",
            step: "1"
        },
        alpha: {
            range: true,
            min: "0",
            max: "1",
            step: "0.01"
        }
    },
    xfire: {
        blend: {
            range: true,
            min: "0",
            max: "16",
            step: "1"
        },
        amplitude: {
            range: true,
            min: "0",
            max: "10",
            step: "0.01"
        },
        dispersion: {
            range: true,
            min: "0",
            max: "20",
            step: "0.1"
        },
        scaleX: {
            range: true,
            min: "0",
            max: "5",
            step: "0.01"
        },
        scaleY: {
            range: true,
            min: "0",
            max: "5",
            step: "0.01"
        },
        animated: {
            time: {
                speed: {
                    range: true,
                    min: "-0.0050",
                    max: "0.0050",
                    step: "0.0001"
                }
            }
        }
    },
    transform: {
        gridPadding: {
            range: true,
            min: "0",
            max: "50",
            step: "0.1"
        },
        scaleX: {
            range: true,
            min: "0",
            max: "5",
            step: "0.1"
        },
        scaleY: {
            range: true,
            min: "0",
            max: "5",
            step: "0.1"
        }
    },
    ascii: {
        animated: {
            size: {
                val1: {
                    range: true,
                    min: "-5",
                    max: "5",
                    step: "0.01"
                },
                val2: {
                    range: true,
                    min: "-5",
                    max: "5",
                    step: "0.01"
                }
            }
        },
        size: {
            range: true,
            min: "1",
            max: "64",
            step: "1"
        }
    },
    dot: {
        scale: {
            range: true,
            min: "0",
            max: "10",
            step: "0.1"
        },
        angle: {
            range: true,
            min: "0",
            max: "360",
            step: "1"
        }
    },
    godray: {
        blendMode: {
            range: true,
            min: "0",
            max: "20",
            step: "1"
        },
        padding: {
            range: true,
            min: "-5",
            max: "50",
            step: "0.1"
        }
    },
    rgbSplit: {
        redX: {
            range: true,
            min: "-50",
            max: "50",
            step: "1"
        },
        redY: {
            range: true,
            min: "-50",
            max: "50",
            step: "1"
        },
        greenX: {
            range: true,
            min: "-50",
            max: "50",
            step: "1"
        },
        greenY: {
            range: true,
            min: "-50",
            max: "50",
            step: "1"
        },
        blueX: {
            range: true,
            min: "-50",
            max: "50",
            step: "1"
        },
        blueY: {
            range: true,
            min: "-50",
            max: "50",
            step: "1"
        }
    },
    polymorph: {
        type: {
            range: true,
            min: "0",
            max: "9",
            step: "1"
        }
    },
    shadow: {
        blur: {
            range: true,
            min: "0",
            max: "20",
            step: "1"
        }
    },
    flood: {
        billowy: {
            range: true,
            min: "0",
            max: "5",
            step: "0.01"
        },
        tintIntensity: {
            range: true,
            min: "0.0",
            max: "1",
            step: "0.01"
        },
        glint: {
            range: true,
            min: "0",
            max: "1",
            step: "0.01"
        },
        scale: {
            range: true,
            min: "5",
            max: "500",
            step: "1"
        },
        animated: {
            time: {
                speed: {
                    range: true,
                    min: "0.00001",
                    max: "0.001",
                    step: "0.00001"
                }
            }
        }
    }
};






const $581145b22b1135a9$var$WMC = (0, $8d51a9873394e4eb$export$ef937e3799bf3b88)();
class $581145b22b1135a9$export$4f38aa0fdb126771 extends $581145b22b1135a9$var$WMC {
    constructor(docs, options = {}){
        const objects = docs.map((a)=>a.toObject ? a.toObject() : a);
        let allData = {};
        for(let i = objects.length; i >= 0; i--)foundry.utils.mergeObject(allData, objects[i]);
        if (options.noTabs) allData = foundry.utils.flattenObject(allData);
        let documentName = options.documentName ?? "NONE";
        let customControls = foundry.utils.mergeObject((0, $d90d2371b0027c40$export$549879c0f3abf4f2)[documentName] ?? {}, game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "customControls")[documentName] ?? {});
        customControls = foundry.utils.mergeObject(customControls, options.customControls?.[documentName] ?? {});
        const [nav, tabSelectors] = (0, $2d0c7cad90c7ba3c$export$6171357ef4337306)(allData, documentName, customControls, !options.noTabs);
        const commonData = (0, $32e43d7a62aba58c$export$a88e9f7fc35c8ffa)(objects);
        super(docs[0], docs, {
            tabs: tabSelectors,
            commonData: commonData,
            ...options
        });
        this.allData = allData;
        this.nav = nav;
        this.editableLabels = {};
        this.pinnedFields = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "pinnedFields")[this.documentName] ?? {};
        this.customControls = customControls;
        if (options.callback) this.callbackOnUpdate = options.callback;
    }
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "mass-edit-generic-form",
            classes: [
                "sheet"
            ],
            template: `modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/generic/genericForm.html`,
            resizable: true,
            minimizable: false,
            title: `Generic`,
            width: 500,
            height: "auto"
        });
    }
    _getHeaderButtons() {
        const buttons = super._getHeaderButtons();
        if (this.options.tokens) buttons.unshift({
            label: "",
            class: "mass-edit-tokens",
            icon: "fas fa-user-circle",
            onclick: ()=>{
                (0, $f3b8698a65c76e19$export$7ac7726310ec4fa4)(this.options.tokens, "Token");
                this.close();
            }
        });
        return buttons;
    }
    async getData(options) {
        const data = await super.getData(options);
        // Cache partials
        await getTemplate(`modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/generic/navHeaderPartial.html`);
        await getTemplate(`modules/${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}/templates/generic/form-group.html`);
        data.nav = this.nav;
        return data;
    }
    /**
   * @param {JQuery} html
   */ activateListeners(html) {
        super.activateListeners(html);
        html.find(".me-pinned").click((event)=>{
            const star = $(event.target).parent();
            const control = star.closest(".form-group").find("[name]");
            const name = control.attr("name");
            if (star.hasClass("active")) {
                star.removeClass("active");
                delete this.pinnedFields[name];
            } else {
                star.addClass("active");
                this.pinnedFields[name] = {
                    label: name
                };
            }
        });
        html.find(".me-editable-label").on("input", (event)=>{
            const name = $(event.target).closest(".form-group").find("[name]").attr("name");
            this.editableLabels[name] = event.target.value;
        });
        html.find(".color-number").on("change", (event)=>{
            if (event.target.dataset?.editNumber) {
                let col = 0;
                try {
                    col = Number(Color.fromString(event.target.value));
                } catch (e) {}
                $(event.target).siblings(`[name="${event.target.dataset.editNumber}"]`).val(col).trigger("input");
            }
        });
        html.find(".me-editable-label, label").on("contextmenu", (event)=>{
            const formGroup = $(event.target).closest(".form-group");
            if (!formGroup.length) return;
            const input = formGroup.find("[name]");
            const name = input.attr("name");
            if (name) {
                if ((0, $2d0c7cad90c7ba3c$export$3bc23beea9300df4)(name)) return;
                const type = input.attr("type");
                if (type === "range") {
                    $581145b22b1135a9$var$unsetCustomControl(name, this.documentName);
                    return;
                } else if (type === "number") $581145b22b1135a9$var$defineRangeControl(name, input.val(), this.customControls, this.documentName);
                else if (type === "text") $581145b22b1135a9$var$defineSelectControl(name, input.val(), this.customControls, this.documentName);
            }
        });
        if (this.options.inputChangeCallback) html.on("change", "input, select", async (event)=>{
            setTimeout(()=>this.options.inputChangeCallback(this.getSelectedFields()), 100);
        });
    }
    /**
   * @param {Event} event
   * @param {Object} formData
   */ async _updateObject(event, formData) {
        super._updateObject(event, formData);
        // Save pinned field values and labels
        const pinned = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "pinnedFields");
        pinned[this.documentName] = this.pinnedFields;
        for (const name of Object.keys(this.pinnedFields))this.pinnedFields[name].value = formData[name];
        if (!foundry.utils.isEmpty(this.editableLabels)) {
            for (const [name, label] of Object.entries(this.editableLabels))if (name in this.pinnedFields) {
                this.pinnedFields[name].label = label;
                this.pinnedFields[name].value = formData[name];
            }
            this.editableLabels = {};
        }
        game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "pinnedFields", pinned);
    }
    async close(options = {}) {
        if (this.callbackOnUpdate) this.callbackOnUpdate(null);
        return super.close(options);
    }
}
function $581145b22b1135a9$var$defineRangeControl(name, val, customControls, docName, { min: min = null, max: max = null, step: step = null } = {}) {
    let content = `
<div class="form-group slim">
  <label>Range</label>
  <div class="form-fields">
    <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Minimum", false)}</label>
    <input type="number" value="${min ?? val}" name="min" step="any">
    <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Maximum", false)}</label>
    <input type="number" value="${max ?? val}" name="max" step="any">
    <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("generic-form.step-size")}</label>
    <input type="number" value="${step ?? 1}" name="step" step="any">
  </div>
</div>
  `;
    new Dialog({
        title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("generic-form.define-range"),
        content: content,
        buttons: {
            save: {
                label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Save", false),
                callback: async (html)=>{
                    const min = html.find('[name="min"]').val() || val;
                    const max = html.find('[name="max"]').val() || val;
                    const step = html.find('[name="step"]').val() || 1;
                    setProperty(customControls, name, {
                        range: true,
                        min: min,
                        max: max,
                        step: step
                    });
                    const allControls = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "customControls");
                    allControls[docName] = customControls;
                    game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "customControls", allControls);
                }
            }
        }
    }).render(true);
}
function $581145b22b1135a9$var$defineSelectControl(name, val, customControls, docName, { options: options = null } = {}) {
    let content = `
<div class="form-group slim">
  <label>${(0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("common.options")}</label>
  <textarea name="options">${options ? options.join("\n") : val}</textarea>
</div>
  `;
    new Dialog({
        title: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("generic-form.define-dropdown"),
        content: content,
        buttons: {
            save: {
                label: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("Save", false),
                callback: async (html)=>{
                    const options = html.find('[name="options"]').val().trim();
                    if (options) {
                        setProperty(customControls, name, {
                            select: true,
                            options: options.split("\n").filter((o)=>o)
                        });
                        const allControls = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "customControls");
                        allControls[docName] = customControls;
                        game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "customControls", allControls);
                    }
                }
            }
        }
    }).render(true);
}
function $581145b22b1135a9$var$unsetCustomControl(name, docName) {
    const allControls = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "customControls");
    let docControls = allControls[docName] || {};
    setProperty(docControls, name, null);
    game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "customControls", allControls);
}



const $f3b8698a65c76e19$export$82c7bfc790fc617 = {
    Token: "tokens",
    Tile: "tiles",
    Drawing: "drawings",
    Wall: "walls",
    AmbientLight: "lighting",
    AmbientSound: "sounds",
    MeasuredTemplate: "templates",
    Note: "notes"
};
const $f3b8698a65c76e19$export$eeffb68b60636a3b = {
    Token: "tokens",
    Tile: "tiles",
    Drawing: "drawings",
    Wall: "walls",
    AmbientLight: "lights",
    AmbientSound: "sounds",
    MeasuredTemplate: "templates",
    Note: "notes"
};
function $f3b8698a65c76e19$export$1d6fdca4b4e85087() {
    if (canvas.activeLayer.controlled.length) return canvas.activeLayer.controlled;
    return null;
}
// Retrieve hovered over placeable
function $f3b8698a65c76e19$var$getHover() {
    let docName = canvas.activeLayer.constructor.documentName;
    // Walls do not properly cleanup hover state
    if (![
        "Wall"
    ].includes(docName)) {
        if (canvas.activeLayer.hover) return [
            canvas.activeLayer.hover
        ];
    }
    return null;
}
// Retrieve documents selected using Multiple Document Selection module (https://github.com/ironmonk88/multiple-document-selection)
function $f3b8698a65c76e19$var$getSelectedDocuments(placeableSelect) {
    const supportedDocs = [
        {
            name: "Actor",
            class: "actor"
        },
        {
            name: "Scene",
            class: "scene"
        },
        {
            name: "JournalEntry",
            class: "journalentry"
        },
        {
            name: "Playlist",
            class: "sound"
        },
        {
            name: "Item",
            class: "item"
        },
        {
            name: "RollTable",
            class: "rolltable"
        },
        {
            name: "Cards",
            class: "cards"
        }
    ];
    for (const doc of supportedDocs){
        const selected = [];
        $(`.directory-list .${doc.class}.selected`).each(function(_) {
            let d;
            if (doc.name === "Playlist") d = game.collections.get(doc.name).get(this.dataset.playlistId)?.sounds.get(this.dataset.soundId);
            else d = game.collections.get(doc.name).get(this.dataset.documentId);
            if (d) {
                // JournalEntries themselves do not have configs, but notes that they correspond to on the scene do
                if (placeableSelect && doc.name === "JournalEntry") game.collections.get("Scene").forEach((s)=>s.notes.forEach((n)=>{
                        const eid = n.entryId ?? n.data.entryId;
                        if (d.id === eid) selected.push(n);
                    }));
                else if (d) selected.push(d);
            }
        });
        if (selected.length) return selected;
    }
    return null;
}
function $f3b8698a65c76e19$export$f9f1f4119b3df74(base, placeable = true) {
    let selected;
    if (base) {
        if (Array.isArray(base)) selected = base;
        else selected = [
            base
        ];
    }
    if (!selected) selected = $f3b8698a65c76e19$var$getSelectedDocuments(placeable);
    if (!selected) selected = $f3b8698a65c76e19$export$1d6fdca4b4e85087();
    // Sort placeable on the scene using their (x, y) coordinates
    if (selected && selected.length > 1 && selected[0].x != null && selected[0].y != null) selected.sort((p1, p2)=>{
        const c = p1.y - p2.y;
        if (c === 0) return p1.x - p2.x;
        return c;
    });
    // We want one object to be treated as the target for the form
    // Will prioritize hovered placeable for this purpose
    let hover = $f3b8698a65c76e19$var$getHover();
    hover = hover ? hover[0] : hover;
    if (!selected && hover) selected = [
        hover
    ];
    if (!hover && selected) hover = selected[0];
    if (!hover && !selected) return [
        null,
        null
    ];
    if (hover && (0, $32e43d7a62aba58c$export$c29f08336649747)(hover) !== (0, $32e43d7a62aba58c$export$c29f08336649747)(selected[0])) hover = selected[0];
    return [
        hover,
        selected
    ];
}
function $f3b8698a65c76e19$export$5092c3abb1d2db42(basePlaceable) {
    let [target, selected] = $f3b8698a65c76e19$export$f9f1f4119b3df74(basePlaceable);
    if (!target) {
        (0, $159f597adada9fb6$export$22f14d854f7eba2)();
        return;
    }
    const docName = (0, $32e43d7a62aba58c$export$c29f08336649747)(target);
    const options = {
        commonData: foundry.utils.flattenObject((0, $32e43d7a62aba58c$export$7a171f172be0782e)(target).toObject()),
        massSelect: true,
        documentName: docName
    };
    if ((0, $32e43d7a62aba58c$export$957755bc1004817b).includes(docName) && docName !== "Actor") {
        const MassConfig = (0, $8d51a9873394e4eb$export$ef937e3799bf3b88)(docName);
        new MassConfig(target, selected, options).render(true, {});
    } else if ((0, $32e43d7a62aba58c$export$f5ba4890ae0d16ac).includes(docName)) new (0, $581145b22b1135a9$export$4f38aa0fdb126771)(selected, options).render(true);
}
async function $f3b8698a65c76e19$export$7ac7726310ec4fa4(found = null, documentName, options = {}) {
    let [target, selected] = $f3b8698a65c76e19$export$f9f1f4119b3df74(found);
    // If there are no placeable in control or just one, then either exit or display the default config window
    if (!selected || !selected.length) return;
    if (!options.forceForm && game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "singleDocDefaultConfig")) {
        if (selected.length === 1) {
            if (selected[0].sheet) selected[0].sheet.render(true, {});
            return;
        }
    }
    // Display modified config window
    if (!documentName) documentName = (0, $32e43d7a62aba58c$export$c29f08336649747)(target);
    options = {
        ...options,
        massEdit: true,
        documentName: documentName
    };
    if ((0, $32e43d7a62aba58c$export$957755bc1004817b).includes(documentName)) {
        if (documentName === "Actor") {
            target = target.prototypeToken;
            selected = selected.map((s)=>s.prototypeToken);
            options.documentName = "Token";
        }
        const MassConfig = (0, $8d51a9873394e4eb$export$ef937e3799bf3b88)(options.documentName);
        return new MassConfig(target, selected, options).render(true, {});
    } else return new (0, $581145b22b1135a9$export$4f38aa0fdb126771)(selected, options).render(true);
}
function $f3b8698a65c76e19$export$8a4c987829ae1580(selectedTokens, options) {
    const tokens = [];
    const actors = [];
    selectedTokens.forEach((s)=>{
        if (s.actor) {
            tokens.push(s);
            actors.push(s.actor);
        }
    });
    if (actors.length) {
        new (0, $581145b22b1135a9$export$4f38aa0fdb126771)(actors, {
            tokens: tokens,
            documentName: "Actor",
            ...options
        }).render(true);
        return true;
    }
    return false;
}
function $f3b8698a65c76e19$export$c5485820df61364() {
    let selected;
    if (!selected) selected = $f3b8698a65c76e19$var$getSelectedDocuments();
    if (!selected) selected = $f3b8698a65c76e19$export$1d6fdca4b4e85087();
    if (!selected) selected = $f3b8698a65c76e19$var$getHover();
    if (selected) return (0, $8d51a9873394e4eb$export$85a626beb2f6e17a)(selected);
    else if (0, $9d9c8b96086115aa$export$37e829338e648c57) {
        let docName = canvas.activeLayer.constructor.documentName;
        const preset = (0, $8d51a9873394e4eb$export$33e5d9c131e68cf2)(docName);
        if (preset) {
            (0, $d0a1f06830d69799$export$619760a5720f8054).spawnPreset({
                preset: preset
            });
            return true;
        }
    }
    return false;
}
function $f3b8698a65c76e19$export$609bf259f643e4ef(data, name = "GenericData", options) {
    return new Promise((resolve)=>{
        new (0, $581145b22b1135a9$export$4f38aa0fdb126771)(Array.isArray(data) ? data : [
            data
        ], {
            documentName: name,
            callback: ()=>resolve(),
            ...options
        }).render(true);
    });
}










// SPDX-License-Identifier: MIT
// Copyright © 2021 fvtt-lib-wrapper Rui Pinheiro
"use strict";
let $82712238b276cf54$export$a5fe556005dcec2e = undefined;
const $82712238b276cf54$export$aa5307f1aca77413 = [
    1,
    12,
    2
];
const $82712238b276cf54$export$1b439fdbb9e84137 = new RegExp("([^.[]+|\\[('([^'\\\\]|\\\\.)+?'|\"([^\"\\\\]|\\\\.)+?\")\\])", "g");
const $82712238b276cf54$export$481cd3c6b064bcef = new RegExp("(^\\['|'\\]$|^\\[\"|\"\\]$)", "g");
// Main shim code
Hooks.once("init", ()=>{
    // Check if the real module is already loaded - if so, use it
    if (globalThis.libWrapper && !(globalThis.libWrapper.is_fallback ?? true)) {
        $82712238b276cf54$export$a5fe556005dcec2e = globalThis.libWrapper;
        return;
    }
    // Fallback implementation
    $82712238b276cf54$export$a5fe556005dcec2e = class {
        static get is_fallback() {
            return true;
        }
        static get WRAPPER() {
            return "WRAPPER";
        }
        static get MIXED() {
            return "MIXED";
        }
        static get OVERRIDE() {
            return "OVERRIDE";
        }
        static register(package_id, target, fn, type = "MIXED", { chain: chain, bind: bind = [] } = {}) {
            const is_setter = target.endsWith("#set");
            target = !is_setter ? target : target.slice(0, -4);
            const split = target.match($82712238b276cf54$export$1b439fdbb9e84137).map((x)=>x.replace(/\\(.)/g, "$1").replace($82712238b276cf54$export$481cd3c6b064bcef, ""));
            const root_nm = split.splice(0, 1)[0];
            let obj, fn_name;
            if (split.length == 0) {
                obj = globalThis;
                fn_name = root_nm;
            } else {
                const _eval = eval;
                fn_name = split.pop();
                obj = split.reduce((x, y)=>x[y], globalThis[root_nm] ?? _eval(root_nm));
            }
            let iObj = obj;
            let descriptor = null;
            while(iObj){
                descriptor = Object.getOwnPropertyDescriptor(iObj, fn_name);
                if (descriptor) break;
                iObj = Object.getPrototypeOf(iObj);
            }
            if (!descriptor || descriptor?.configurable === false) throw new Error(`libWrapper Shim: '${target}' does not exist, could not be found, or has a non-configurable descriptor.`);
            let original = null;
            const wrapper = chain ?? (type.toUpperCase?.() != "OVERRIDE" && type != 3) ? function(...args) {
                return fn.call(this, original.bind(this), ...bind, ...args);
            } : function(...args) {
                return fn.call(this, ...bind, ...args);
            };
            if (!is_setter) {
                if (descriptor.value) {
                    original = descriptor.value;
                    descriptor.value = wrapper;
                } else {
                    original = descriptor.get;
                    descriptor.get = wrapper;
                }
            } else {
                if (!descriptor.set) throw new Error(`libWrapper Shim: '${target}' does not have a setter`);
                original = descriptor.set;
                descriptor.set = wrapper;
            }
            descriptor.configurable = true;
            Object.defineProperty(obj, fn_name, descriptor);
        }
    };
});


const $15e9db69c2322773$export$149eb684a26496a2 = {};
// Initialize module
Hooks.once("init", ()=>{
    // Register Settings
    (0, $d0a1f06830d69799$export$511ed1dd332818c6).init();
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "cssStyle", {
        scope: "world",
        config: false,
        type: String,
        default: "Solid Background"
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "cssCustom", {
        scope: "world",
        config: false,
        type: String,
        default: (0, $2f2bd158cac8dcd3$export$1c0e52168af9675e).Default
    });
    game.settings.registerMenu((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "cssEdit", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.cssEdit.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.cssEdit.hint"),
        label: "",
        scope: "world",
        icon: "fas fa-cog",
        type: (0, $2f2bd158cac8dcd3$export$2e2bcd8739ae039),
        restricted: true
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "singleDocDefaultConfig", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.singleDocDefaultConfig.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.singleDocDefaultConfig.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "rangeToTextbox", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.rangeToTextbox.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.rangeToTextbox.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });
    // Deprecated
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presets", {
        scope: "world",
        config: false,
        type: Object,
        default: {}
    });
    // ===============
    // Preset Settings
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "workingPack", {
        scope: "world",
        config: false,
        type: String,
        default: "world.mass-edit-presets-main",
        onChange: (val)=>{
            (0, $d0a1f06830d69799$export$9cea25aeb7365a59).workingPack = val;
        }
    });
    (0, $d0a1f06830d69799$export$9cea25aeb7365a59).workingPack = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "workingPack");
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "docPresets", {
        scope: "world",
        config: false,
        type: Array,
        default: []
    });
    // Temp setting needed for migration
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetsMigrated", {
        scope: "world",
        config: false,
        type: Boolean,
        default: false
    });
    // Temp setting needed for migration
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetsCompMigrated", {
        scope: "world",
        config: false,
        type: Boolean,
        default: false
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetDocLock", {
        scope: "world",
        config: false,
        type: String,
        default: ""
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetLayerSwitch", {
        scope: "world",
        config: false,
        type: Boolean,
        default: true
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetExtComp", {
        scope: "world",
        config: false,
        type: Boolean,
        default: true
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetScaling", {
        scope: "world",
        config: false,
        type: Boolean,
        default: true
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSortMode", {
        scope: "world",
        config: false,
        type: String,
        default: "manual"
    });
    // p = preset only
    // pf = preset & folder
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSearchMode", {
        scope: "world",
        config: false,
        type: String,
        default: "pf"
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSceneControl", {
        name: "Scene Controls: Preset Button",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        onChange: ()=>{
            ui.controls.render();
        }
    });
    // end of Preset Settings
    // ======================
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "pinnedFields", {
        scope: "world",
        config: false,
        type: Object,
        default: {}
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "customControls", {
        scope: "world",
        config: false,
        type: Object,
        default: {}
    });
    // Disable until duplicate flag value bug is fixed
    // game.settings.register(MODULE_ID, 'enableFlagsTab', {
    //   name: localize('settings.enableFlagsTab.name'),
    //   hint: localize('settings.enableFlagsTab.hint'),
    //   scope: 'world',
    //   config: true,
    //   type: Boolean,
    //   default: true,
    // });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "enableHistory", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.enableHistory.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.enableHistory.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "historyMaxLength", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.historyMaxLength.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.historyMaxLength.hint"),
        scope: "world",
        config: true,
        type: Number,
        default: 10
    });
    if (0, $9d9c8b96086115aa$export$37e829338e648c57) game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "autoSnap", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.autoSnap.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.autoSnap.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });
    game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "panToSearch", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.panToSearch.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.panToSearch.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });
    if (game.modules.get("tokenmagic")?.active) game.settings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "tmfxFieldsEnable", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.tmfxFieldsEnable.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("settings.tmfxFieldsEnable.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });
    // Register history related hooks
    if (game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "enableHistory")) (0, $32e43d7a62aba58c$export$de10d55d23082cf5).forEach((docName)=>{
        Hooks.on(`preUpdate${docName}`, (doc, update, options, userId)=>{
            $15e9db69c2322773$var$updateHistory(doc, update, options, userId);
        });
    });
    game.keybindings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "editKey", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.editKey.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.editKey.hint"),
        editable: [
            {
                key: "KeyE",
                modifiers: [
                    "Shift"
                ]
            }
        ],
        onDown: ()=>{
            const app = Object.values(ui.windows).find((w)=>w.meObjects);
            if (app) {
                app.close();
                return;
            }
            (0, $f3b8698a65c76e19$export$7ac7726310ec4fa4)();
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "selectKey", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.selectKey.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.selectKey.hint"),
        editable: [
            {
                key: "KeyF",
                modifiers: [
                    "Shift"
                ]
            }
        ],
        onDown: ()=>{
            (0, $f3b8698a65c76e19$export$5092c3abb1d2db42)();
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetApply", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.presetApply.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.presetApply.hint"),
        editable: [
            {
                key: "KeyX",
                modifiers: [
                    "Shift"
                ]
            }
        ],
        onDown: ()=>{
            const app = Object.values(ui.windows).find((w)=>w instanceof (0, $d0a1f06830d69799$export$7a966e8b4abecc03));
            if (app) {
                app.close(true);
                return;
            }
            // Special logic for populating Active Effect
            const aeConfig = Object.values(ui.windows).find((x)=>x instanceof ActiveEffectConfig);
            if (aeConfig) {
                (0, $32e43d7a62aba58c$export$1eeaf2f7f77dcac8)(aeConfig);
                return;
            }
            const docName = canvas.activeLayer.constructor.documentName;
            if (!(0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName)) return;
            new (0, $d0a1f06830d69799$export$7a966e8b4abecc03)(null, null, docName).render(true);
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetApplyScene", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.presetApplyScene.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.presetApplyScene.hint"),
        editable: [],
        onDown: ()=>{
            const app = Object.values(ui.windows).find((w)=>w instanceof (0, $d0a1f06830d69799$export$7a966e8b4abecc03));
            if (app) {
                app.close(true);
                return;
            }
            new (0, $d0a1f06830d69799$export$7a966e8b4abecc03)(null, null, "Scene").render(true);
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    game.keybindings.register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "genericFormKey", {
        name: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.genericForm.name"),
        hint: (0, $32e43d7a62aba58c$export$b3bd0bc58e36cd63)("keybindings.genericForm.hint"),
        editable: [
            {
                key: "KeyR",
                modifiers: [
                    "Shift"
                ]
            }
        ],
        onDown: ()=>{
            let [target, selected] = (0, $f3b8698a65c76e19$export$f9f1f4119b3df74)(null, false);
            if (!target) return;
            const docName = (0, $32e43d7a62aba58c$export$c29f08336649747)(target);
            if (![
                ...(0, $32e43d7a62aba58c$export$f5ba4890ae0d16ac),
                "Token"
            ].includes(docName)) return;
            if (docName === "Token") (0, $f3b8698a65c76e19$export$8a4c987829ae1580)(selected, {
                massEdit: true
            });
            else new (0, $581145b22b1135a9$export$4f38aa0fdb126771)(selected, {
                massEdit: true,
                documentName: docName
            }).render(true);
        },
        restricted: true,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
    // Register copy-paste wrappers
    (0, $82712238b276cf54$export$a5fe556005dcec2e).register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "ClientKeybindings._onCopy", function(wrapped, ...args) {
        if (window.getSelection().toString() === "") {
            // Check if a Mass Config form is open and if so copy data from there
            const meForm = Object.values(ui.windows).find((app)=>app.meObjects != null);
            if (meForm?.performMassCopy()) return true;
        }
        const result = wrapped(...args);
        // Clear Mass Edit clipboard to allows core pasting again
        if (result) (0, $8d51a9873394e4eb$export$9ffa5d419081ba23)(canvas.activeLayer.constructor.documentName);
        return result;
    }, "MIXED");
    (0, $82712238b276cf54$export$a5fe556005dcec2e).register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "ClientKeybindings._onPaste", function(wrapped, ...args) {
        if ((0, $f3b8698a65c76e19$export$c5485820df61364)()) return true;
        return wrapped(...args);
    }, "MIXED");
    // Add SceneControl option to open Mass Edit form
    if (game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSceneControl")) (0, $82712238b276cf54$export$a5fe556005dcec2e).register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "SceneNavigation.prototype._getContextMenuOptions", function(wrapped, ...args) {
        const options = wrapped(...args);
        options.push({
            name: "Mass Edit",
            icon: '<i class="fa-solid fa-pen-to-square"></i>',
            condition: game.user.isGM,
            callback: (li)=>{
                const sceneId = li.attr("data-scene-id");
                (0, $f3b8698a65c76e19$export$7ac7726310ec4fa4)(game.scenes.get(sceneId));
            }
        });
        return options;
    }, "WRAPPER");
    // Intercept and prevent certain placeable drag and drop if they are hovering over the MassEditPresets form
    // passing on the placeable to it to perform preset creation.
    const dragDropHandler = function(wrapped, ...args) {
        if ((0, $d0a1f06830d69799$export$7a966e8b4abecc03).objectHover || (0, $d0a1f06830d69799$export$c7d846246fcba8fd).objectHover) {
            this.mouseInteractionManager.cancel(...args);
            const app = Object.values(ui.windows).find((x)=>(0, $d0a1f06830d69799$export$7a966e8b4abecc03).objectHover && x instanceof (0, $d0a1f06830d69799$export$7a966e8b4abecc03) || (0, $d0a1f06830d69799$export$c7d846246fcba8fd).objectHover && x instanceof (0, $d0a1f06830d69799$export$c7d846246fcba8fd));
            if (app) {
                const placeables = canvas.activeLayer.controlled.length ? [
                    ...canvas.activeLayer.controlled
                ] : [
                    this
                ];
                app.dropPlaceable(placeables, ...args);
            }
            // Pass in a fake event that hopefully is enough to allow other modules to function
            this._onDragLeftCancel(...args);
        } else return wrapped(...args);
    };
    (0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).forEach((name)=>{
        (0, $82712238b276cf54$export$a5fe556005dcec2e).register((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), `${name}.prototype._onDragLeftDrop`, dragDropHandler, "MIXED");
    });
    // Handle broadcasts
    // Needed to allow players to spawn Presets by delegating create document request to GMs
    game.socket?.on(`module.${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}`, async (message)=>{
        const args = message.args;
        if (message.handlerName === "document" && message.type === "CREATE") {
            const isResponsibleGM = !game.users.filter((user)=>user.isGM && (user.active || user.isActive)).some((other)=>other.id < game.user.id);
            if (!isResponsibleGM) return;
            const documents = await (0, $32e43d7a62aba58c$export$24b03028f6f659d0)(args.documentName, args.data, args.sceneID);
            const documentIDs = documents.map((d)=>d.id);
            const message = {
                handlerName: "document",
                args: {
                    requestID: args.requestID,
                    sceneID: args.sceneID,
                    documentName: args.documentName,
                    documentIDs: documentIDs
                },
                type: "RESOLVE"
            };
            game.socket.emit(`module.${(0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)}`, message);
        } else if (message.handlerName === "document" && message.type === "RESOLVE") (0, $32e43d7a62aba58c$export$c36e29304d06f075)(args);
    });
    globalThis.MassEdit = {
        GeneralDataAdapter: $59fc6fe4c07de9fd$export$d5bbc12fef4eed7f,
        MassEditGenericForm: $581145b22b1135a9$export$4f38aa0fdb126771,
        showGenericForm: $f3b8698a65c76e19$export$609bf259f643e4ef,
        performMassUpdate: $8d51a9873394e4eb$export$f13f6f89b098ca30,
        performMassSearch: $8d51a9873394e4eb$export$3a950926bf0f8193,
        showMassEdit: $f3b8698a65c76e19$export$7ac7726310ec4fa4,
        getPreset: (0, $d0a1f06830d69799$export$619760a5720f8054).getPreset,
        getPresets: (0, $d0a1f06830d69799$export$619760a5720f8054).getPresets,
        createPreset: (0, $d0a1f06830d69799$export$619760a5720f8054).createPreset,
        spawnPreset: (0, $d0a1f06830d69799$export$619760a5720f8054).spawnPreset
    };
    game.modules.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf)).api = {
        ...globalThis.MassEdit,
        applyRandomization: $3180f13c9e24a345$export$4bafa436c0fa0cbb,
        applyAddSubtract: $32e43d7a62aba58c$export$1ced7b3ceb2cd439,
        checkApplySpecialFields: $8d51a9873394e4eb$export$e6d921e6d200bb9c
    };
});
// Preset Scene Control
Hooks.on("renderSceneControls", (sceneControls, html, options)=>{
    if (!game.user.isGM) return;
    if (!game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetSceneControl")) return;
    const presetControl = $(`
<li class="scene-control mass-edit-scene-control" data-control="me-presets" aria-label="Mass Edit: Presets" role="tab" data-tooltip="Mass Edit: Presets">
  <i class="fa-solid fa-books"></i>
</li>
  `);
    presetControl.on("click", ()=>{
        let docName = canvas.activeLayer.constructor.documentName;
        if (!(0, $32e43d7a62aba58c$export$b4bbd936310fc9b9).includes(docName)) docName = "ALL";
        const presetForm = Object.values(ui.windows).find((app)=>app instanceof (0, $d0a1f06830d69799$export$7a966e8b4abecc03));
        if (presetForm) {
            presetForm.close();
            return;
        }
        new (0, $d0a1f06830d69799$export$7a966e8b4abecc03)(null, null, docName, {
            left: presetControl.position().left + presetControl.width() + 40
        }).render(true);
    });
    html.find(".control-tools").find(".scene-control").last().after(presetControl);
});
// Migrate Presets (02/11/2023)
Hooks.on("ready", async ()=>{
    if (!game.packs.get((0, $d0a1f06830d69799$export$9cea25aeb7365a59).workingPack)) game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "workingPack", (0, $d0a1f06830d69799$export$2a34b6e4e19d9a25));
    if (!game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetsMigrated")) {
        const presets = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presets");
        if (foundry.utils.getType(presets) === "Object" && !foundry.utils.isEmpty(presets)) {
            let newPresets = [];
            for (const documentName of Object.keys(presets)){
                for (const name of Object.keys(presets[documentName])){
                    let oldPreset = presets[documentName][name];
                    let newPreset = {
                        id: foundry.utils.randomID()
                    };
                    newPreset.name = name;
                    newPreset.documentName = documentName;
                    newPreset.color = oldPreset["mass-edit-preset-color"] !== "#ffffff" ? oldPreset["mass-edit-preset-color"] : null;
                    newPreset.order = oldPreset["mass-edit-preset-order"] ?? -1;
                    newPreset.addSubtract = oldPreset["mass-edit-addSubtract"] ?? {};
                    newPreset.randomize = oldPreset["mass-edit-randomize"] ?? {};
                    delete oldPreset["mass-edit-preset-color"];
                    delete oldPreset["mass-edit-preset-order"];
                    delete oldPreset["mass-edit-addSubtract"];
                    delete oldPreset["mass-edit-randomize"];
                    delete oldPreset["mass-edit-keybind"];
                    newPreset.data = foundry.utils.deepClone(oldPreset);
                    newPresets.push(newPreset);
                }
                game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "docPresets", newPresets);
            }
        }
        game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetsMigrated", true);
    }
    if (!game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetsCompMigrated")) {
        const docPresets = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "docPresets");
        const presets = docPresets.map((p)=>new (0, $d0a1f06830d69799$export$3463c369d5cc977f)(p));
        if (presets.length) (0, $d0a1f06830d69799$export$9cea25aeb7365a59).set(presets);
        game.settings.set((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "presetsCompMigrated", true);
    }
});
// Attach Mass Config buttons to Token and Tile HUDs
Hooks.on("renderTokenHUD", (hud, html, tokenData)=>{
    if (canvas.tokens.controlled.length >= 2) {
        $(html).find('.control-icon[data-action="config"]').after(`<div class="control-icon" data-action="massConfig">
          <i class="fas fa-cogs"></i>
        </div>`);
        $(html).on("click", '[data-action="massConfig"]', ()=>{
            (0, $f3b8698a65c76e19$export$7ac7726310ec4fa4)();
        });
    }
});
Hooks.on("renderTileHUD", (hud, html, tileData)=>{
    const controlledTiles = canvas.background ? canvas.background.controlled.concat(canvas.foreground.controlled) : canvas.tiles.controlled;
    if (controlledTiles.length >= 2) {
        $(html).find('.control-icon[data-action="underfoot"]').after(`<div class="control-icon" data-action="massConfig">
          <i class="fas fa-cogs"></i>
        </div>`);
        $(html).on("click", '[data-action="massConfig"]', ()=>{
            (0, $f3b8698a65c76e19$export$7ac7726310ec4fa4)();
        });
    }
});
//
// History Utilities
//
// Retrieve only the data that is different
function $15e9db69c2322773$var$getDiffData(obj, docName, update, protoData = true) {
    const flatUpdate = foundry.utils.flattenObject(update);
    const flatObjData = (0, $8d51a9873394e4eb$export$de8c6f734ca56d8f)(obj, docName, protoData);
    const diff = foundry.utils.diffObject(flatObjData, flatUpdate);
    for (const [k, v] of Object.entries(diff)){
        // Special handling for empty/undefined data
        if ((v === "" || v == null) && (flatObjData[k] === "" || flatObjData[k] == null)) // matches
        delete diff[k];
        if (k.startsWith("flags.")) {
            if ((0, $32e43d7a62aba58c$export$be67e9bf7f25c9c4)(flatObjData, k, v)) delete diff[k];
        }
        if (docName === "Token" && [
            "light.angle",
            "rotation"
        ].includes(k)) {
            if (v % 360 === flatObjData[k] % 360) delete diff[k];
        }
    }
    return diff;
}
function $15e9db69c2322773$var$updateHistory(obj, update, options, userId) {
    if (game.user.id !== userId || !game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "enableHistory")) return;
    const historyItem = {
        timestamp: new Date().toLocaleTimeString(),
        ctrl: {}
    };
    [
        "mass-edit-randomize",
        "mass-edit-addSubtract"
    ].forEach((ctrl)=>{
        if (ctrl in options) historyItem.ctrl[ctrl] = options[ctrl][0];
    });
    let cUpdate = foundry.utils.deepClone(update);
    delete cUpdate._id;
    let docName = obj.document ? obj.document.documentName : obj.documentName;
    if (docName === "Actor") {
        if (cUpdate.prototypeToken || cUpdate.token) $15e9db69c2322773$var$saveHistory(obj.prototypeToken ?? obj.token, cUpdate.prototypeToken ?? cUpdate.token, foundry.utils.deepClone(historyItem), update._id, "Token");
    }
    $15e9db69c2322773$var$saveHistory(obj, cUpdate, historyItem, update._id, docName);
}
function $15e9db69c2322773$var$saveHistory(obj, update, historyItem, _id, docName) {
    if (!obj || foundry.utils.isEmpty(update)) return;
    historyItem.update = foundry.utils.flattenObject(update);
    historyItem.diff = $15e9db69c2322773$var$getDiffData(obj, docName, update);
    historyItem._id = _id;
    const maxLength = game.settings.get((0, $32e43d7a62aba58c$export$59dbefa3c1eecdf), "historyMaxLength") ?? 0;
    const docHistory = $15e9db69c2322773$export$149eb684a26496a2[docName] ?? [];
    docHistory.push(historyItem);
    if (docHistory.length > maxLength) docHistory.splice(0, 1);
    $15e9db69c2322773$export$149eb684a26496a2[docName] = docHistory;
}
Hooks.on("renderActiveEffectConfig", (app)=>{
    const el = $(app.form).find(".effects-header .key");
    if (el.length) {
        const me = $('<i title="Apply \'Mass Edit\' preset" style="font-size:smaller;color:brown;"> <a>[ME]</a></i>');
        me.on("click", ()=>(0, $32e43d7a62aba58c$export$1eeaf2f7f77dcac8)(app));
        el.append(me);
    }
});


export {$15e9db69c2322773$export$149eb684a26496a2 as HISTORY};
//# sourceMappingURL=bundle.js.map
