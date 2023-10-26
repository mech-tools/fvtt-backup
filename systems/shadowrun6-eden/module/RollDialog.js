import { SYSTEM_NAME } from "./constants.js";
import { SR6ChatMessageData } from "./dice/RollTypes.js";
function isLifeform(obj) {
    return obj.attributes != undefined;
}
function isGear(obj) {
    return obj.skill != undefined;
}
function isWeapon(obj) {
    return obj.attackRating != undefined;
}
function isSpell(obj) {
    return obj.drain != undefined;
}
function attackRatingToString(val) {
    return (val[0] +
        "/" +
        (val[1] != 0 ? val[1] : "-") +
        "/" +
        (val[2] != 0 ? val[2] : "-") +
        "/" +
        (val[3] != 0 ? val[3] : "-") +
        "/" +
        (val[4] != 0 ? val[4] : "-"));
}
function isItemRoll(obj) {
    return obj.rollType != undefined;
}
function isSkillRoll(obj) {
    return obj.skillId != undefined;
}
function getSystemData(obj) {
    if (game.release.generation >= 10)
        return obj.system;
    return obj.data.data;
}
function getActorData(obj) {
    if (game.release.generation >= 10)
        return obj;
    return obj.data;
}
/**
 * Special Shadowrun 6 instance of the RollDialog
 */
export class RollDialog extends Dialog {
    html;
    actor;
    prepared;
    /** This field is used to return all settings made in the roll dialog */
    dialogResult;
    /** Edge after applying gain and boost cost */
    edge = 0;
    /** Dice added or substracted to the pool */
    modifier = 0;
    constructor(data, options) {
        super(data, options);
        let rOptions = options;
        console.log("In RollDialog<init>()", rOptions);
        this.actor = rOptions.actor;
        this.prepared = rOptions.prepared;
        this.dialogResult = rOptions.dialogResult;
        this.edge = this.actor ? getSystemData(this.actor).edge.value : 0;
    }
    /********************************************
     * React to changes on the dialog
     ********************************************/
    activateListeners(html) {
        super.activateListeners(html);
        this.html = html;
        // React to attack/defense rating changes
        //    	html.find('.calc-edge').show(this._onCalcEdge.bind(this));
        html.find("select[name='distance']").change(this._recalculateBaseAR.bind(this));
        html.find("select[name='fireMode']").change(this._onFiringModeChange.bind(this));
        html.find("select[name='bfType']").change(this._onBurstModeChange.bind(this));
        html.find("select[name='fullAutoArea']").change(this._onAreaChange.bind(this));
        /*
    if (!this.data.target) {
      html.find('.calc-edge').show(this._onNoTarget.bind(this));
    }
    */
        html.find(".calc-edge-edit").change(this._onCalcEdge.bind(this));
        html.find(".calc-edge-edit").keyup(this._onCalcEdge.bind(this));
        html.show(this._onCalcEdge.bind(this));
        // React to changed edge boosts and actions
        html.find(".edgeBoosts").change(this._onEdgeBoostActionChange.bind(this));
        html.find(".edgeBoosts").keyup(this._onEdgeBoostActionChange.bind(this));
        html.find(".edgeActions").change(this._onEdgeBoostActionChange.bind(this));
        html.find(".edgeActions").keyup(this._onEdgeBoostActionChange.bind(this));
        html.show(this._onFiringModeChange.bind(this));
        // React to changed amp up
        html.find("#ampUp").change(this._onSpellConfigChange.bind(this));
        // React to changed amp up
        html.find("#incArea").change(this._onSpellConfigChange.bind(this));
        this._recalculateBaseAR();
        // React to attribute change
        html.find(".rollAttributeSelector").change(this._onAttribChange.bind(this));
        // React to Wound Modifier checkbox
        html.find("#useWoundModifier").change(this._updateDicePool.bind(this));
        // React to change in modifier
        html.find("#modifier").change(this._updateDicePool.bind(this));
    }
    //-------------------------------------------------------------
    _recalculateBaseAR() {
        const options = this.options;
        let prepared = options.prepared;
        const distanceElement = document.getElementById("distance");
        if (!distanceElement)
            return;
        let ar = parseInt(distanceElement.value);
        const arElement = document.getElementById("baseAR");
        arElement.textContent = ar.toString();
        prepared.baseAR = ar;
        this._onCalcEdge(event);
    }
    //-------------------------------------------------------------
    /*
     * Called when something edge gain relevant changes on the
     * HTML form
     */
    _onCalcEdge(event) {
        let configured = this.dialogResult;
        let prepared = this.prepared;
        if (!configured.actor)
            return;
        try {
            configured.edgePlayer = 0;
            configured.edgeTarget = 0;
            // Check situational edge
            const situationA = document.getElementById("situationalEdgeA");
            if (situationA && situationA.checked) {
                configured.edgePlayer++;
            }
            const situationD = document.getElementById("situationalEdgeD");
            if (situationD && situationD.checked) {
                configured.edgeTarget++;
            }
            const drElement = document.getElementById("dr");
            if (drElement) {
                const dr = parseInt(drElement.value);
                const arModElem = document.getElementById("arMod");
                if (isItemRoll(prepared)) {
                    const arElement = document.getElementById("baseAR");
                    let ar = arElement.textContent ? parseInt(arElement.textContent) : 0;
                    //					let ar = parseInt( (arElement.children[arElement.selectedIndex] as HTMLOptionElement).value );
                    if (arModElem.value && parseInt(arModElem.value) != 0) {
                        ar += parseInt(arModElem.value);
                    }
                    let finalAR = ar;
                    let result = ar - dr;
                    if (result >= 4) {
                        configured.edgePlayer++;
                    }
                    else if (result <= -4) {
                        configured.edgeTarget++;
                    }
                }
                else {
                    let ar = prepared.calcAttackRating[0];
                    if (arModElem.value && parseInt(arModElem.value) != 0) {
                        ar += parseInt(arModElem.value);
                    }
                    let result = ar - dr;
                    if (result >= 4) {
                        configured.edgePlayer++;
                    }
                    else if (result <= -4) {
                        configured.edgeTarget++;
                    }
                }
            }
            // Set new edge value
            let actor = getSystemData(configured.actor);
            let capped = false;
            // Limit the maximum edge
            let max = game.settings.get(SYSTEM_NAME, "maxEdgePerRound");
            let combat = game.combat;
            if (combat) {
                max = combat.getMaxEdgeGain(configured.actor);
            }
            // Check if the gained edge would be more than the player may get per round
            if (configured.edgePlayer > max) {
                console.log("Reduce edge gain of attacker to " + max);
                configured.edgePlayer = Math.min(configured.edgePlayer, max);
                capped = true;
            }
            // Check if new Edge value would be >7
            if (actor.edge.value + configured.edgePlayer > 7) {
                configured.edgePlayer = Math.max(0, 7 - actor.edge.value);
                capped = true;
            }
            this.edge = Math.min(7, actor.edge.value + configured.edgePlayer);
            // Update in dialog
            let edgeValue = this._element[0].getElementsByClassName("edge-value")[0];
            if (edgeValue) {
                edgeValue.innerText = this.edge.toString();
            }
            // Update selection of edge boosts
            this._updateEdgeBoosts(this._element[0].getElementsByClassName("edgeBoosts")[0], this.edge);
            let newEdgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter((boost) => boost.when == "PRE" && boost.cost <= this.edge);
            // Prepare text for player
            let innerText = "";
            let speaker = configured.speaker;
            if (configured.edgePlayer) {
                if (capped) {
                    configured.edgePlayer = max;
                    innerText = game.i18n.format("shadowrun6.roll.edge.gain_player_capped", {
                        name: speaker.alias,
                        value: configured.edgePlayer,
                        capped: max
                    });
                }
                else {
                    innerText = game.i18n.format("shadowrun6.roll.edge.gain_player", { name: speaker.alias, value: configured.edgePlayer });
                }
            }
            if (configured.edgeTarget != 0) {
                //configured.targets
                let targetName = "To Do"; //this.targetName ? this.targetName : (game as Game).i18n.localize("shadowrun6.roll.target");
                innerText += "  " + game.i18n.format("shadowrun6.roll.edge.gain_player", { name: targetName, value: configured.edgeTarget });
            }
            if (configured.edgePlayer == 0 && configured.edgeTarget == 0) {
                innerText += "  " + game.i18n.localize("shadowrun6.roll.edge.no_gain");
            }
            configured.edge_message = innerText;
            let edgeLabel = document.getElementById("edgeLabel");
            if (edgeLabel) {
                edgeLabel.innerText = innerText;
            }
        }
        catch (err) {
            console.log("Oh NO! " + err.stack);
        }
    }
    //-------------------------------------------------------------
    _updateEdgeBoosts(elem, available) {
        let newEdgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter((boost) => boost.when == "PRE" && boost.cost <= available);
        // Node for inserting new data before
        let insertBeforeElem;
        // Remove previous data
        var array = Array.from(elem.children);
        array.forEach((child) => {
            if (child.value != "none" && child.value != "edge_action") {
                elem.removeChild(child);
            }
            if (child.value == "edge_action") {
                insertBeforeElem = child;
            }
        });
        // Add new data
        newEdgeBoosts.forEach((boost) => {
            let opt = document.createElement("option");
            opt.setAttribute("value", boost.id);
            opt.setAttribute("data-item-boostid", boost.id);
            let cont = document.createTextNode(game.i18n.localize("shadowrun6.edge_boost." + boost.id) + " - (" + boost.cost + ")");
            opt.appendChild(cont);
            elem.insertBefore(opt, insertBeforeElem);
        });
    }
    //-------------------------------------------------------------
    _updateEdgeActions(elem, available) {
        let newEdgeActions = CONFIG.SR6.EDGE_ACTIONS.filter((action) => action.cost <= available);
        // Remove previous data
        var array = Array.from(elem.children);
        array.forEach((child) => {
            /*
            if (child.value!="none") {
                elem.removeChild(child)
            }
                    */
        });
        // Add new data
        newEdgeActions.forEach((action) => {
            let opt = document.createElement("option");
            opt.setAttribute("value", action.id);
            opt.setAttribute("data-item-actionid", action.id);
            let cont = document.createTextNode(game.i18n.localize("shadowrun6.edge_action." + action.id) + " - (" + action.cost + ")");
            opt.appendChild(cont);
            elem.appendChild(opt);
        });
    }
    //-------------------------------------------------------------
    /*
     * Called when a change happens in the Edge Action or Edge Action
     * selection.
     */
    _onEdgeBoostActionChange(event) {
        console.log("_onEdgeBoostActionChange");
        console.log("_onEdgeBoostActionChange  this=", this);
        let actor = this.options.actor;
        let prepared = this.options.prepared;
        let configured = this.dialogResult;
        // Ignore this, if there is no actor
        if (!actor) {
            return;
        }
        if (!event || !event.currentTarget) {
            return;
        }
        if (event.currentTarget.name === "edgeBoost") {
            const boostsSelect = event.currentTarget;
            let boostId = boostsSelect.children[boostsSelect.selectedIndex].dataset.itemBoostid;
            console.log(" boostId = " + boostId);
            configured.edgeBoost = boostId;
            if (boostId === "edge_action") {
                this._updateEdgeActions(this._element[0].getElementsByClassName("edgeActions")[0], this.edge);
            }
            else {
                this._updateEdgeActions(this._element[0].getElementsByClassName("edgeActions")[0], 0);
            }
            if (boostId != "none") {
                configured.edge_use = game.i18n.localize("shadowrun6.edge_boost." + boostId);
            }
            else {
                configured.edge_use = "";
            }
            this._performEdgeBoostOrAction(configured, boostId);
        }
        else if (event.currentTarget.name === "edgeAction") {
            const actionSelect = event.currentTarget;
            let actionId = actionSelect.children[actionSelect.selectedIndex].dataset.itemActionid;
            console.log(" actionId = " + actionId);
            configured.edgeAction = actionId;
            configured.edge_use = game.i18n.localize("shadowrun6.edge_action." + actionId);
            this._performEdgeBoostOrAction(configured, actionId);
        }
    }
    //-------------------------------------------------------------
    _updateDicePool(data) {
        // Get the value of the user entered modifier ..
        let userModifier = parseInt(document.getElementById("modifier").value);
        // .. and update the roll
        this.modifier = userModifier ? userModifier : 0;
        // Get the value of the checkbox if the calculated wound penality should be used
        let useWoundModifier = document.getElementById("useWoundModifier").checked;
        // Calculate new sum
        console.log("updateDicePool: ", this);
        let woundMod = (this.actor) ? this.actor.getWoundModifier() : 0;
        if (this.actor) {
            console.log("updateDicePool2: ", this.prepared.pool, this.modifier, woundMod);
        }
        //this.prepared.calcPool = this.prepared.pool + this.modifier - (useWoundModifier?woundMod:0);
        $("label[name='dicePool']")[0].innerText = this.prepared.calcPool.toString();
    }
    //-------------------------------------------------------------
    _performEdgeBoostOrAction(data, boostOrActionId) {
        console.log("ToDo: performEgdeBoostOrAction " + boostOrActionId);
        if (boostOrActionId == "edge_action") {
            return;
        }
        data.explode = false;
        this.modifier = 0;
        switch (boostOrActionId) {
            case "add_edge_pool":
                data.explode = true;
                this.modifier = getSystemData(data.actor).edge.max;
                break;
        }
        // Update content on dialog
        $("input[name='modifier']")[0].value = this.modifier.toString();
        //($("input[name='explode' ]")[0] as HTMLInputElement).value = data.explode;
        $("input[name='explode' ]")[0].checked = data.explode;
        this._updateDicePool(data);
    }
    //-------------------------------------------------------------
    _onSpellConfigChange() {
        let ampUpElement = document.getElementById("ampUp");
        let incElement = document.getElementById("incArea");
        let prepared = this.options.prepared;
        if (!isLifeform(getSystemData(prepared.actor)))
            return;
        let lifeform = getSystemData(prepared.actor);
        const baseMagic = lifeform.attributes.mag.pool;
        let ampUpSelect = ampUpElement ? parseInt(ampUpElement.value) : 0;
        let incSelect = incElement ? parseInt(incElement.value) : 0;
        prepared.calcDamage = (prepared.spell.damage === "physical" || prepared.spell.damage === "physical_special" ? baseMagic / 2 : 0) + ampUpSelect;
        prepared.calcDrain = (+prepared.spell.drain + +ampUpSelect * 2 + +incSelect);
        prepared.calcArea = 2 + incSelect * 2;
        this.html.find("td[id='spellDrain']").text(prepared.calcDrain.toString());
        this.html.find("span[id='spellDmg']").text(prepared.calcDamage.toString());
        this.html.find("span[id='spellArea']").text(prepared.calcArea.toString());
    }
    //-------------------------------------------------------------
    _onFiringModeChange(event) {
        let prepared = this.options.prepared;
        let fireModeElement = document.getElementById("fireMode");
        if (!fireModeElement)
            return;
        let newMode = fireModeElement.value;
        let poolMod = 0;
        let arMod = 0;
        let dmgMod = 0;
        let rounds = 1;
        prepared.fireMode = newMode;
        switch (newMode) {
            case "SS":
                this.html.find(".onlyFA").css("display", "none");
                this.html.find(".onlyBF").css("display", "none");
                break;
            case "SA":
                this.html.find(".onlyFA").css("display", "none");
                this.html.find(".onlyBF").css("display", "none");
                rounds = 2;
                arMod = -2;
                dmgMod = 1;
                break;
            case "BF":
                this.html.find(".onlyFA").css("display", "none");
                this.html.find(".onlyBF").css("display", "table-cell");
                rounds = 4;
                arMod = -4;
                dmgMod = 2;
                break;
            case "FA":
                rounds = 10;
                arMod = -6;
                this.html.find(".onlyFA").css("display", "table-cell");
                this.html.find(".onlyBF").css("display", "none");
                break;
        }
        // Calculate reduced attack rating
        prepared.calcAttackRating = [...prepared.weapon.attackRating];
        prepared.calcAttackRating.forEach((element, index) => {
            prepared.calcAttackRating[index] = parseInt(element) + parseInt(arMod);
            if (prepared.calcAttackRating[index] <= 0)
                prepared.calcAttackRating[index] = 0;
        });
        this.html.find("td[name='calcAR']").text(attackRatingToString(prepared.calcAttackRating));
        // Update the range selector for attack rating
        this.html
            .find("select[name='distance']")
            .children("option")
            .each(function () {
            let idx = parseInt(this.getAttribute("name"));
            this.setAttribute("data-item-ar", prepared.calcAttackRating[idx].toString());
            this.setAttribute("value", prepared.calcAttackRating[idx].toString());
            this.text = game.i18n.localize("shadowrun6.roll.ar_" + idx) + " (" + prepared.calcAttackRating[idx].toString() + ")";
        });
        this.html.find("select[name='distance']").change();
        // Calculate modified damage
        prepared.calcDmg = prepared.weapon.dmg + dmgMod;
        this.html.find("span[name='calcDmg']").text(prepared.calcDmg.toString());
        // Calculate modified pool
        prepared.calcPool = prepared.pool + poolMod;
        prepared.calcRounds = rounds;
        this.html.find("td[name='calcRounds']").text(prepared.calcRounds.toString());
        this._recalculateBaseAR();
    }
    //-------------------------------------------------------------
    _onBurstModeChange(event) {
        console.log("ToDo: _onBurstModeChanged");
        let prepared = this.options.prepared;
        let fireModeElement = document.getElementById("bfType");
        if (!fireModeElement)
            return;
        prepared.burstMode = fireModeElement.value;
    }
    //-------------------------------------------------------------
    _onAreaChange(event) {
        console.log("ToDo: _onAreaChanged");
        let prepared = this.options.prepared;
        let fireModeElement = document.getElementById("fullAutoArea");
        if (!fireModeElement)
            return;
        prepared.faArea = fireModeElement.value;
    }
    //-------------------------------------------------------------
    _onAttribChange(event) {
        console.log("_onAttribChange ", this.options);
        let actor = this.options.actor;
        let prepared = this.options.prepared;
        let configured = this.options.dialogResult;
        // Ignore this, if there is no actor
        if (!actor) {
            return;
        }
        if (!event || !event.currentTarget) {
            return;
        }
        if (isSkillRoll(prepared)) {
            console.log("isSkillRoll ", prepared.skillId);
            const attribSelect = event.currentTarget;
            let newAttrib = attribSelect.children[attribSelect.selectedIndex].value;
            console.log(" use attribute = " + newAttrib);
            prepared.attrib = newAttrib;
            actor.updateSkillRoll(prepared, newAttrib);
            prepared.actionText = prepared.checkText;
        }
        console.log("new check: " + prepared.checkText);
        console.log("new pool: " + prepared.pool);
        configured.checkText = prepared.checkText;
        configured.pool = prepared.pool;
        document.getElementById("rolldia-checkText").textContent = prepared.checkText;
        this._updateDicePool(configured);
    }
    //-------------------------------------------------------------
    _onNoTarget() {
        document.getElementById("noTargetLabel").innerText = game.i18n.localize("shadowrun6.roll.notarget");
    }
    //-------------------------------------------------------------
    onClose() {
        console.log("To Do: onClose()------------------------------------");
        const options = this.options;
        let prepared = options.prepared;
        let configured = options.dialogResult;
        return new SR6ChatMessageData(configured);
    }
}
//# sourceMappingURL=RollDialog.js.map