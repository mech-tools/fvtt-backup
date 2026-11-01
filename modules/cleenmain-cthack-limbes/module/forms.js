// Register forms and forms contents
export function registerForms() {
    game.settings.register("cleenmain-cthack-limbes", "suiviSmallForm", {
        name: "Formulaire suivi des evenements en cases a cocher",
        type: SuiviSmallForm,
        config: false,
        default: false,
        scope: "world"
    });
    game.settings.register("cleenmain-cthack-limbes", "suiviapform", {
        name: "Formulaire suivi des APs",
        type: SuiviAPForm,
        config: false,
        default: false,
        scope: "world"
    });
    game.settings.register("cleenmain-cthack-limbes", "suivichaudronform", {
        name: "Formulaire suivi du chaudron",
        type: SuiviChaudronForm,
        config: false,
        default: false,
        scope: "world"
    });
    game.settings.register("cleenmain-cthack-limbes", "suivirituelclementineform", {
        name: "Formulaire suivi du rituel",
        type: SuiviRituelClementineForm,
        config: false,
        default: false,
        scope: "world"
    });
    game.settings.register("cleenmain-cthack-limbes", "suiviassauts3form", {
        name: "Formulaire suivi du rituel",
        type: SuiviAssautS3Form,
        config: false,
        default: false,
        scope: "world"
    });
    game.settings.register("cleenmain-cthack-limbes", "s3jaugetempsform", {
        name: "Jauge de temps",
        type: S3JaugeTempsForm,
        config: false,
        default: false,
        scope: "world"
    });
    game.settings.register("cleenmain-cthack-limbes", "s5jaugeeffroiform", {
        name: "Jauge de temps",
        type: S5JaugeEffroiForm,
        config: false,
        default: false,
        scope: "world"
    });
    game.settings.register("cleenmain-cthack-limbes", "s5jaugeprogressionform", {
        name: "Jauge de progression",
        type: S5JaugeProgressionForm,
        config: false,
        default: false,
        scope: "world"
    });
    game.settings.register("cleenmain-cthack-limbes", "s5jaugedecompteform", {
        name: "Jauge de décompte",
        type: S5JaugeDecompteForm,
        config: false,
        default: false,
        scope: "world"
    });
    game.settings.register("cleenmain-cthack-limbes", "bilansform", {
        name: "Bilan des scénarios",
        type: BilansForm,
        config: false,
        default: false,
        scope: "world"
    });
    SuiviChaudronForm.registerDefault();
    SuiviRituelClementineForm.registerDefault();
    SuiviAssautS3Form.registerDefault();
    SuiviAPForm.registerDefault();
    BilansForm.registerDefault();
    S3JaugeTempsForm.registerDefault();
    S5JaugeEffroiForm.registerDefault();
    S5JaugeProgressionForm.registerDefault();
    S5JaugeDecompteForm.registerDefault();
}
export class SuiviSmallForm extends FormApplication {
    constructor(registry) {
        super();
        this.registry = registry;
    }

    static get getDefaults() {
        return {
        };
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: game.i18n.localize("limbes.gmtools.suivi_small"),
            id: 'suivi-small-form',
            template: 'modules/cleenmain-cthack-limbes/templates/suivismallform.html',
            width: 400,
            height: 200,
            resizable: true,
            closeOnSubmit: false
        });
    }
    getData(options) {
        const newData = {
            formdata: game.settings.get('cleenmain-cthack-limbes', this.registry)
        };
        return newData;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("input[name='boxelement']").change((ev) => this._changeCheckbox(ev));
    }

    async _changeCheckbox(event) {
        event.preventDefault();
        let modifiedBox = event.currentTarget.dataset.field;
        let reference = game.settings.get('cleenmain-cthack-limbes', this.registry);
        reference.boxes[modifiedBox].value = !reference.boxes[modifiedBox].value;
        await game.settings.set('cleenmain-cthack-limbes', this.registry, reference);
        this.render();
    }
};

export class SuiviChaudronForm extends FormApplication {
    static get getDefaults() {
        return {
        };
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: "Suivi du remplissage du chaudron",
            id: 'suivi-chaudron',
            template: 'modules/cleenmain-cthack-limbes/templates/suivichaudron.html',
            width: 600,
            height: 431,
            resizable: false,
            closeOnSubmit: false,
        });
    }
    getData(options) {
        const newData = {
            formdata: game.settings.get('cleenmain-cthack-limbes', "suivi_chaudron")
        };
        return newData;
    }
    static registerDefault() {
        game.settings.register("cleenmain-cthack-limbes", "suivi_chaudron", {
            name: "Suivi du chaudron",
            type: null,
            config: false,
            scope: "world",
            default: {
                boxes: {
                    box1: { name: "box1", value: true },
                    box2: { name: "box2", value: true },
                    box3: { name: "box3", value: true },
                    box4: { name: "box4", value: true },
                },
            },
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("input[name='boxelement']").change((ev) => this._changeCheckbox(ev));
    }

    async _changeCheckbox(event) {
        event.preventDefault();
        let modifiedBox = event.currentTarget.dataset.field;
        let reference = game.settings.get('cleenmain-cthack-limbes', "suivi_chaudron");
        reference.boxes[modifiedBox].value = !reference.boxes[modifiedBox].value;
        await game.settings.set('cleenmain-cthack-limbes', "suivi_chaudron", reference);
        this.render();
    }
};
export class SuiviRituelClementineForm extends FormApplication {
    static get getDefaults() {
        return {
        };
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: "Suivi du rituel de Clémentine",
            id: 'suivi-rituel-clementine',
            template: 'modules/cleenmain-cthack-limbes/templates/suivirituelclementine.html',
            width: 800,
            height: 600,
            resizable: false,
            closeOnSubmit: false,
        });
    }
    getData(options) {
        const newData = {
            formdata: game.settings.get('cleenmain-cthack-limbes', "suivi_rituelclementine")
        };
        return newData;
    }
    static registerDefault() {
        game.settings.register("cleenmain-cthack-limbes", "suivi_rituelclementine", {
            name: "Suivi du rituel de Clémentine",
            type: null,
            config: false,
            scope: "world",
            default: {
                boxes_corruption: {
                    box1: { name: "box1", value: false },
                    box2: { name: "box2", value: false },
                    box3: { name: "box3", value: false },
                    box4: { name: "box4", value: false },
                    box5: { name: "box5", value: false },
                    box6: { name: "box6", value: false },
                    box7: { name: "box7", value: false },
                    box8: { name: "box8", value: false },
                    box9: { name: "box9", value: false },
                    box10: { name: "box10", value: false }
                },
                boxes_rituel: {
                    box1: { name: "box1", value: false },
                    box2: { name: "box2", value: false },
                    box3: { name: "box3", value: false },
                    box4: { name: "box4", value: false },
                    box5: { name: "box5", value: false },
                    box6: { name: "box6", value: false },
                    box7: { name: "box7", value: false },
                    box8: { name: "box8", value: false }
                },
            },
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("input[name='boxelement']").change((ev) => this._changeCheckbox(ev));
    }

    async _changeCheckbox(event) {
        event.preventDefault();
        let modifiedBox = event.currentTarget.dataset.field;
        let modifiedGroup = event.currentTarget.dataset.group;
        let reference = game.settings.get('cleenmain-cthack-limbes', "suivi_rituelclementine");
        reference[modifiedGroup][modifiedBox].value = !reference[modifiedGroup][modifiedBox].value;
        await game.settings.set('cleenmain-cthack-limbes', "suivi_rituelclementine", reference);
        this.render();
    }
};
export class S3JaugeTempsForm extends SuiviSmallForm {
    constructor() {
        super("s3JaugeTemps");
        this.settingTitle = "Jauge de temps";        
    }   
    getData(options) {
        return super.getData(options);
    }

    static registerDefault() {
        game.settings.register("cleenmain-cthack-limbes", "s3JaugeTemps", {
            name: this.settingTitle,
            type: null,
            config: false,
            scope: "world",
            default: {
                title: "La jauge de temps",
                boxes: {
                    box1: { name: "box1", value: false },
                    box2: { name: "box2", value: false },
                    box3: { name: "box3", value: false },
                    box4: { name: "box4", value: false },
                    box5: { name: "box5", value: false },
                    box6: { name: "box6", value: false },
                    box7: { name: "box7", value: false },
                    box8: { name: "box8", value: false }
                },
            },
        });
    }
}
export class S5JaugeEffroiForm extends SuiviSmallForm {
    constructor() {
        super("s5JaugeEffroi");
        this.settingTitle = "Jauge d'effroi"; 
    }

    getData(options) {
        return super.getData(options);
    }

    static registerDefault() {
        game.settings.register("cleenmain-cthack-limbes", "s5JaugeEffroi", {
            name: this.settingTitle,
            type: null,
            config: false,
            scope: "world",
            default: {
                title: "La jauge d'effroi",
                boxes: {
                    box1: { name: "box1", value: false },
                    box2: { name: "box2", value: false },
                    box3: { name: "box3", value: false },
                    box4: { name: "box4", value: false },
                    box5: { name: "box5", value: false },
                    box6: { name: "box6", value: false },
                    box7: { name: "box7", value: false }
                },
            },
        });
    }
}
export class S5JaugeProgressionForm extends SuiviSmallForm {
    constructor() {
        super("s5JaugeProgression");
        this.settingTitle = "Jauge de progression";        
    } 

    getData(options) {
        return super.getData(options);
    }

    static registerDefault() {
        game.settings.register("cleenmain-cthack-limbes", "s5JaugeProgression", {
            name: this.settingTitle,
            type: null,
            config: false,
            scope: "world",
            default: {
                title: "La jauge de progression",
                boxes: {
                    box1: { name: "box1", value: false },
                    box2: { name: "box2", value: false },
                    box3: { name: "box3", value: false },
                    box4: { name: "box4", value: false },
                    box5: { name: "box5", value: false },
                    box6: { name: "box6", value: false },
                    box7: { name: "box7", value: false },
                    box8: { name: "box8", value: false },
                    box9: { name: "box9", value: false },
                    box10: { name: "box10", value: false }
                },
            },
        });
    }
}

export class S5JaugeDecompteForm extends SuiviSmallForm {
    constructor() {
        super("s5JaugeDecompte");
        this.settingTitle = "Jauge de décompte";        
    } 

    getData(options) {
        return super.getData(options);
    }

    static registerDefault() {
        game.settings.register("cleenmain-cthack-limbes", "s5JaugeDecompte", {
            name: this.settingTitle,
            type: null,
            config: false,
            scope: "world",
            default: {
                title: "La jauge de décompte",
                boxes: {
                    box1: { name: "box1", value: false },
                    box2: { name: "box2", value: false },
                    box3: { name: "box3", value: false },
                    box4: { name: "box4", value: false },
                    box5: { name: "box5", value: false },
                    box6: { name: "box6", value: false },
                    box7: { name: "box7", value: false },
                    box8: { name: "box8", value: false },
                    box9: { name: "box9", value: false },
                    box10: { name: "box10", value: false },
                    box11: { name: "box11", value: false }
                },
            },
        });
    }
}

export class SuiviAssautS3Form extends FormApplication {
    static get getDefaults() {
        return {
        };
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: "Suivi de l'assaut scénario 3",
            id: 'suivi-assaut-s3',
            template: 'modules/cleenmain-cthack-limbes/templates/combats3.html',
            width: 800,
            height: 600,
            resizable: false,
            closeOnSubmit: false,
        });
    }
    getData(options) {
        const newData = {
            formdata: game.settings.get('cleenmain-cthack-limbes', "suivi_s3_assaut")
        };
        return newData;
    }
    static registerDefault() {
        game.settings.register("cleenmain-cthack-limbes", "suivi_s3_assaut", {
            name: "Suivi de l'assault et du combat mental",
            type: null,
            config: false,
            scope: "world",
            default: {
                boxes_sor_rep: {
                    box1: { name: "box1", value: false }
                },
                boxes_aurelia: {
                    box1: { name: "box1", value: false }
                },
                boxes_animaux: {
                    box1: { name: "box1", value: false }
                },
                boxes_prog_sor: {
                    box1: { name: "box1", value: true },
                    box2: { name: "box2", value: true },
                    box3: { name: "box3", value: true },
                    box4: { name: "box4", value: false },
                    box5: { name: "box5", value: false },
                    box6: { name: "box6", value: false },
                    box7: { name: "box7", value: false },
                    box8: { name: "box8", value: false },
                    box9: { name: "box9", value: false },
                    box10: { name: "box10", value: false }
                },
                boxes_prog_pj: {
                    box1: { name: "box1", value: false },
                    box2: { name: "box2", value: false },
                    box3: { name: "box3", value: false },
                    box4: { name: "box4", value: false },
                    box5: { name: "box5", value: false },
                    box6: { name: "box6", value: false },
                    box7: { name: "box7", value: false },
                    box8: { name: "box8", value: false },
                    box9: { name: "box9", value: false },
                    box10: { name: "box10", value: false }
                },
                boxes_sor_attrapee: {
                    box1: { name: "box1", value: false }
                },
                boxes_combatmental: {
                    box1: { name: "box1", value: true },
                    box2: { name: "box2", value: true },
                    box3: { name: "box3", value: true },
                    box4: { name: "box4", value: false }
                },
            },
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("input[name='boxelement']").change((ev) => this._changeCheckbox(ev));
    }

    async _changeCheckbox(event) {
        event.preventDefault();
        let modifiedBox = event.currentTarget.dataset.field;
        let modifiedGroup = event.currentTarget.dataset.group;
        let reference = game.settings.get('cleenmain-cthack-limbes', "suivi_s3_assaut");
        reference[modifiedGroup][modifiedBox].value = !reference[modifiedGroup][modifiedBox].value;
        await game.settings.set('cleenmain-cthack-limbes', "suivi_s3_assaut", reference);
        this.render();
    }
};
export class SuiviAPForm extends FormApplication {
    static get getDefaults() {
        return {
        };
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: "Suivi des Accomplissements Personnels",
            id: 'suiviapform',
            template: 'modules/cleenmain-cthack-limbes/templates/suivi_ap_form.html',
            width: 700,
            height: 600,
            resizable: true,
            closeOnSubmit: false,
        });
    }
    getData(options) {
        const newData = {
            formdata: game.settings.get('cleenmain-cthack-limbes', "suivi_ap")
        };
        return newData;
    }
    static registerDefault() {
        game.settings.register("cleenmain-cthack-limbes", "suivi_ap", {
            name: "Suivi des AP",
            type: null,
            config: false,
            scope: "world",
            default: {
                box1: { name: "box1", pj: "Bogdan", valueA: false, valueB: false, valueC: false },
                box2: { name: "box2", pj: "David" },
                box3: { name: "box3", pj: "Jeanne" },
                box4: { name: "box4", pj: "Lisa" },
                box5: { name: "box5", pj: "Malik" },
                box6: { name: "box6", pj: "Marion" },
            },
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("input[name='boxelement']").change((ev) => this._changeCheckbox(ev));
    }

    async _changeCheckbox(event) {
        event.preventDefault();
        let modifiedBox = event.currentTarget.dataset.field;
        let modifiedValue = event.currentTarget.dataset.el;
        let reference = game.settings.get('cleenmain-cthack-limbes', "suivi_ap");
        reference[modifiedBox][modifiedValue] = !reference[modifiedBox][modifiedValue];

        await game.settings.set('cleenmain-cthack-limbes', "suivi_ap", reference);
        this.render();
    }
};
export class BilansForm extends FormApplication {
    static get getDefaults() {
        return {
        };
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: "Bilans des scénarios",
            id: 'bilansform',
            template: 'modules/cleenmain-cthack-limbes/templates/bilanscenariosform.html',
            width: 700,
            height: 600,
            resizable: true,
            closeOnSubmit: false,
        });
    }
    getData(options) {
        const newData = {
            formdata: game.settings.get('cleenmain-cthack-limbes', "bilans")
        };
        newData.formdata.boxes_combatmental = game.settings.get('cleenmain-cthack-limbes', "suivi_s3_assaut").boxes_combatmental;
        newData.formdata.jauge_demon_consolidee = newData.formdata.jauge_demon + parseInt(newData.formdata.jauge_demon_free);
        newData.formdata.jauge_oussomate_consolidee = newData.formdata.jauge_oussomate + parseInt(newData.formdata.jauge_oussomate_free);
        for (let ind of ["box1", "box2", "box3", "box4"]) {
            newData.formdata.jauge_demon_consolidee += newData.formdata.boxes_combatmental[ind].value ? 1 : 0;
        }
        return newData;
    }
    static registerDefault() {
        game.settings.register('cleenmain-cthack-limbes', 'bilans', {
            name: 'Bilan des scénarios',
            type: null,
            config: false,
            scope: 'world',
            default: {
                jauge_oussomate: 0,
                jauge_demon: 3,
                jauge_demon_free: 0,
                jauge_oussomate_free: 0,
                scenario1: {
                    box1: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box2: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box3: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box4: {
                        value: false,
                        jauge_demon: 0,
                        jauge_oussomate: 1
                    },
                    box5: {
                        value: false,
                        jauge_demon: 0,
                        jauge_oussomate: -1
                    },
                    box6: {
                        value: false,
                        jauge_demon: 0,
                        jauge_oussomate: 1
                    }
                },
                scenario2: {
                    box1: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box2: {
                        value: false,
                        jauge_demon: -1,
                        jauge_oussomate: 0
                    },
                    box3: {
                        value: false,
                        jauge_demon: 2,
                        jauge_oussomate: 0
                    },
                    box4: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box5: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box6: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box7: {
                        value: false,
                        jauge_demon: -1,
                        jauge_oussomate: 2
                    },
                    box8: {
                        value: false,
                        jauge_demon: 2,
                        jauge_oussomate: 0
                    }
                },
                scenario3: {
                    box1: {
                        value: false,
                        jauge_demon: -1,
                        jauge_oussomate: 2
                    },
                    box2: {
                        value: false,
                        jauge_demon: 2,
                        jauge_oussomate: 0
                    }
                },
                scenario4: {
                    box1: {
                        value: false,
                        jauge_demon: -1,
                        jauge_oussomate: 0
                    },
                    box2: {
                        value: false,
                        jauge_demon: 0,
                        jauge_oussomate: 1
                    },
                    box3: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box4: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box5: {
                        value: false,
                        jauge_demon: 0,
                        jauge_oussomate: 1
                    },
                    box6: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 2
                    },
                    box7: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box8: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    },
                    box9: {
                        value: false,
                        jauge_demon: 1,
                        jauge_oussomate: 0
                    }
                }
            }
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("input[name='jaugebox']").change((ev) => this._changeCheckbox(ev));
        html.find("input[name='inputtext']").change((ev) => this._changeInput(ev));
    }

    async _changeCheckbox(event) {
        event.preventDefault();
        let modifiedGroup = event.currentTarget.dataset.group;
        let modifiedBox = event.currentTarget.dataset.field;
        let reference = game.settings.get('cleenmain-cthack-limbes', "bilans");
        reference[modifiedGroup][modifiedBox].value = !reference[modifiedGroup][modifiedBox].value;
        reference.jauge_demon += reference[modifiedGroup][modifiedBox].jauge_demon * (reference[modifiedGroup][modifiedBox].value ? 1 : -1);
        reference.jauge_oussomate += reference[modifiedGroup][modifiedBox].jauge_oussomate * (reference[modifiedGroup][modifiedBox].value ? 1 : -1);
        await game.settings.set('cleenmain-cthack-limbes', "bilans", reference);
        this.render();
    }

    async _changeInput(event) {
        event.preventDefault();
        let reference = game.settings.get('cleenmain-cthack-limbes', "bilans");
        let modifiedValue = event.currentTarget.dataset.field;
        let newValue = event.currentTarget.value;
        reference[modifiedValue] = newValue;

        await game.settings.set('cleenmain-cthack-limbes', "bilans");
        this.render();
    }
};