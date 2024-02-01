import { RollDialog } from "./RollDialog.js";
import SR6Roll from "./SR6Roll.js";
import { ConfiguredRoll, ReallyRoll, RollType } from "./dice/RollTypes.js";
function isLifeform(obj) {
    return obj.attributes != undefined;
}
function isWeapon(obj) {
    return obj.attackRating != undefined;
}
function isSpell(obj) {
    return obj.drain != undefined;
}
function getSystemData(obj) {
    if (!obj)
        return null;
    if (game.release.generation >= 10)
        return obj.system;
    return obj.data.data;
}
export async function doRoll(data) {
    console.log("ENTER doRoll ", data);
    try {
        // Create ll instance
        const _r = await _showRollDialog(data);
        console.log("returned from _showRollDialog with ", _r);
        if (_r) {
            console.log("==============Calling toRoll() with ", data);
            _r.toMessage(data, { rollMode: data.rollMode });
        }
        return _r;
    }
    finally {
        console.log("LEAVE doRoll");
    }
}
//-------------------------------------------------------------
/**
 * @param data { PreparedRoll} Roll configuration from the UI
 * @return {Promise<Roll>}
 * @private
 */
async function _showRollDialog(data) {
    console.log("ENTER _showRollDialog", this);
    try {
        let lifeform;
        let dia2;
        if (data.actor) {
            if (!isLifeform(getSystemData(data.actor))) {
                console.log("Actor is not a lifeform");
            }
            lifeform = getSystemData(data.actor);
            data.edge = data.actor ? lifeform.edge.value : 0;
        }
        if (!data.calcPool || data.calcPool == 0) {
            data.calcPool = data.pool;
            if (data.actor) {
                data.calcPool -= data.actor.getWoundModifier();
                data.calcPool -= data.actor._getSustainedSpellsModifier() * 2;
            }
        }
        /*
         * Edge, Edge Boosts and Edge Actions
         */
        data.edgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter((boost) => boost.when == "PRE" && boost.cost <= data.edge);
        if (data.rollType == RollType.Weapon) {
            data.calcPool = data.pool;
            data.calcAttackRating = [...data.weapon.attackRating];
            data.calcDmg = data.weapon.dmg;
        }
        if (data.rollType == RollType.Spell && lifeform != null) {
            data.calcDamage = lifeform.attributes.mag.pool / 2;
        }
        // Render modal dialog
        let template = "systems/shadowrun6-eden/templates/chat/configurable-roll-dialog.html";
        let dialogData = {
            //checkText: data.extraText,
            data: data,
            CONFIG: CONFIG,
            rollModes: CONFIG.Dice.rollModes
        };
        const html = await renderTemplate(template, dialogData);
        const title = data.title;
        // Also prepare a ConfiguredRoll
        console.log("###Create ConfiguredRoll");
        let dialogResult = new ConfiguredRoll();
        dialogResult.copyFrom(data);
        dialogResult.updateSpecifics(data);
        // Create the Dialog window
        return new Promise((resolve) => {
            console.log("_showRollDialog prepared buttons");
            let buttons;
            if (data.allowBuyHits) {
                buttons = {
                    bought: {
                        icon: '<i class="fas fa-dollar-sign"></i>',
                        label: game.i18n.localize("shadowrun6.rollType.bought"),
                        callback: (html) => resolve(_dialogClosed(ReallyRoll.AUTOHITS, html[0].querySelector("form"), data, dia2, dialogResult))
                    },
                    normal: {
                        icon: '<i class="fas fa-dice-six"></i>',
                        label: game.i18n.localize("shadowrun6.rollType.normal"),
                        callback: (html) => resolve(_dialogClosed(ReallyRoll.ROLL, html[0].querySelector("form"), data, dia2, dialogResult))
                    }
                };
            }
            else {
                buttons = {
                    normal: {
                        icon: '<i class="fas fa-dice-six"></i>',
                        label: game.i18n.localize("shadowrun6.rollType.normal"),
                        callback: (html) => {
                            console.log("doRoll: in callback");
                            resolve(_dialogClosed(ReallyRoll.ROLL, html[0].querySelector("form"), data, dia2, dialogResult));
                            console.log("end callback");
                        }
                    }
                };
            }
            const diagData = {
                title: title,
                content: html,
                render: (html) => {
                    console.log("Register interactivity in the rendered dialog", this);
                    // Set roll mode to default from chat window
                    let chatRollMode = $(".roll-type-select").val();
                    $("select[name='rollMode']").not(".roll-type-select").val(chatRollMode);
                },
                buttons: buttons,
                default: "normal"
            };
            const myDialogOptions = {
                width: 520,
                jQuery: true,
                resizeable: true,
                actor: data.actor,
                prepared: data,
                dialogResult: dialogResult
            };
            console.log("create RollDialog");
            dia2 = new RollDialog(diagData, myDialogOptions);
            dia2.render(true);
            console.log("showRollDialog after render()");
        });
        return new Promise((resolve) => { });
    }
    finally {
        console.log("LEAVE _showRollDialog");
    }
}
function _dialogClosed(type, form, prepared, dialog, configured) {
    console.log("ENTER _dialogClosed(type=" + type + ")##########");
    console.log("dialogClosed: prepared=", prepared);
    configured.updateSpecifics(prepared);
    console.log("dialogClosed: configured=", configured);
    /* Check if attacker gets edge */
    if (configured.actor && configured.edgePlayer > 0) {
        console.log("Actor " + configured.actor.data._id + " gets " + configured.edgePlayer + " Edge");
        let newEdge = getSystemData(configured.actor).edge.value + configured.edgePlayer;
        configured.actor.update({ ["data.edge.value"]: newEdge });
        let combat = game.combat;
        if (combat) {
            console.log("In combat: mark edge gained in combatant " + configured.edgePlayer + " Edge");
            let combatant = combat.getCombatantByActor(configured.actor.data._id);
            if (combatant) {
                combatant.edgeGained += configured.edgePlayer;
            }
        }
    }
    try {
        if (!dialog.modifier)
            dialog.modifier = 0;
        let system = getSystemData(prepared.actor);
        if (prepared.actor && isLifeform(system)) {
            // Pay eventuallly selected edge boost
            if (configured.edgeBoost && configured.edgeBoost != "none") {
                console.log("Edge Boost selected: " + configured.edgeBoost);
                if (configured.edgeBoost === "edge_action") {
                    console.log("ToDo: handle edge action");
                }
                else {
                    let boost = CONFIG.SR6.EDGE_BOOSTS.find((boost) => boost.id == configured.edgeBoost);
                    console.log("Pay " + boost.cost + " egde for Edge Boost: " + game.i18n.localize("shadowrun6.edge_boost." + configured.edgeBoost));
                    system.edge.value = prepared.edge - boost.cost;
                    // Pay Edge cost
                    console.log("Update Edge to " + (prepared.edge - boost.cost));
                    prepared.actor.update({ ["data.edge.value"]: system.edge.value });
                }
            }
            else {
                if (prepared.edge > 0) {
                    console.log("Update Edge to " + prepared.edge);
                    prepared.actor.update({ ["data.edge.value"]: prepared.edge });
                }
            }
        }
        //configured.edgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter(boost => boost.when=="POST");
        let formula = "";
        let isPrivate = false;
        if (form) {
            console.log("---prepared.targets = ", prepared.targets);
            console.log("---configured.targetIds = ", configured.targetIds);
            configured.threshold = form.threshold ? parseInt(form.threshold.value) : 0;
            configured.useWildDie = form.useWildDie.checked ? 1 : 0;
            configured.explode = form.explode.checked;
            configured.buttonType = type;
            dialog.modifier = parseInt(form.modifier.value);
            if (!dialog.modifier)
                dialog.modifier = 0;
            configured.defRating = form.defRating ? parseInt(form.defRating.value) : 0;
            console.log("rollMode = ", form.rollMode.value);
            configured.rollMode = form.rollMode.value;
            let base = configured.pool ? configured.pool : 0;
            let mod = dialog.modifier ? dialog.modifier : 0;
            let woundMod = (form.useWoundModifier.checked && prepared.actor) ? prepared.actor.getWoundModifier() : 0;
            let sustMod = (form.useSustainedSpellModifier.checked && prepared.actor) ? prepared.actor._getSustainedSpellsModifier() * 2 : 0;
            configured.pool = +base + +mod + -woundMod + -sustMod;
            prepared.calcPool = configured.pool;
            /* Check for a negative pool! Set to 0 if negative so the universe doesn't explode */
            if (configured.pool < 0)
                configured.pool = 0;
            /* Build the roll formula */
            formula = createFormula(configured, dialog);
        }
        console.log("_dialogClosed: ", formula);
        // Execute the roll
        return new SR6Roll(formula, configured);
    }
    catch (err) {
        console.log("Oh NO! " + err.stack);
    }
    finally {
        console.log("LEAVE _dialogClosed()");
    }
    return this;
}
/*
 * Convert ConfiguredRoll into a Foundry roll formula
 */
function createFormula(roll, dialog) {
    console.log("createFormula-------------------------------");
    console.log("--pool = " + roll.pool);
    console.log("--modifier = " + dialog.modifier);
    dialog.modifier = 0;
    let regular = +(roll.pool ? roll.pool : 0) + (dialog.modifier ? dialog.modifier : 0);
    let wild = 0;
    if (roll.useWildDie > 0) {
        regular -= roll.useWildDie;
        wild = roll.useWildDie;
    }
    let formula = `${regular}d6`;
    if (roll.explode) {
        formula += "x6";
    }
    formula += "cs>=5";
    if (wild > 0) {
        formula += " + " + wild + "d6";
        if (roll.explode) {
            formula += "x6";
        }
        formula += "cs>=5";
    }
    return formula;
}
//# sourceMappingURL=Rolls.js.map