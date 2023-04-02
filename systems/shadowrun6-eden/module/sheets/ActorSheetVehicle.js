import { VehicleRoll } from "../dice/RollTypes.js";
import { Shadowrun6ActorSheet } from "./SR6ActorSheet.js";
/**
 * Sheet for Vehicle actors
 * @extends {ActorSheet}
 */
export class Shadowrun6ActorSheetVehicle extends Shadowrun6ActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["shadowrun6", "sheet", "actor"],
            template: "systems/shadowrun6-eden/templates/actor/shadowrun6-Vehicle-sheet.html",
            width: 600,
            height: 800,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "overview" }],
            scrollY: [".items", ".attributes"],
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
            allVehicleUser: game.actors.filter((actor) => actor.type == "Player" || actor.type == "NPC")
        });
    }
    activateListeners(html) {
        super.activateListeners(html);
        //	   if (this.actor && this.actor.isOwner) { console.log("is owner"); } else { console.log("is not owner");}
        // Owner Only Listeners
        if (this.actor.isOwner) {
            html.find(".vehicle-slower").click((ev) => this._onDecelerate(ev, html));
            html.find(".vehicle-faster").click((ev) => this._onAccelerate(ev, html));
            html.find(".vehicleskill-roll").click(this._onRollVehicleSkillCheck.bind(this));
        }
    }
    _onDecelerate(event, html) {
        console.log("_onDecelerate");
        let actorData = this.actor.data.data;
        let currentSpeed = actorData.vehicle.speed;
        let newSpeed = currentSpeed - (actorData.vehicle.offRoad ? actorData.accOff : actorData.accOn);
        if (newSpeed < 0)
            newSpeed = 0;
        const field = "data.vehicle.speed";
        this.actor.update({ [field]: newSpeed });
    }
    _onAccelerate(event, html) {
        console.log("_onAccelerate");
        let actorData = this.actor.data.data;
        let currentSpeed = actorData.vehicle.speed;
        let newSpeed = currentSpeed + (actorData.vehicle.offRoad ? actorData.accOff : actorData.accOn);
        if (newSpeed > actorData.tspd)
            newSpeed = actorData.tspd;
        const field = "data.vehicle.speed";
        this.actor.update({ [field]: newSpeed });
    }
    //-----------------------------------------------------
    /**
     * Handle rolling a Skill check
     * @param {Event} event   The originating click event
     * @private
     */
    _onRollVehicleSkillCheck(event, html) {
        console.log("_onRollVehicleSkillCheck");
        event.preventDefault();
        if (!event.currentTarget)
            return;
        if (!event.currentTarget.dataset)
            return;
        let dataset = event.currentTarget.dataset;
        console.log("dataset", dataset);
        console.log("actorData", this.actor.data.data);
        const skillId = dataset.skill;
        let actorData = this.actor.data.data;
        let vSkill = actorData.skills[skillId];
        console.log("Roll skill " + skillId + " with pool " + vSkill.pool + " and a threshold " + actorData.vehicle.modifier);
        let roll = new VehicleRoll(actorData, skillId);
        roll.threshold = actorData.vehicle.modifier;
        console.log("onRollSkillCheck before ", roll);
        this.actor.rollVehicle(roll);
    }
}
//# sourceMappingURL=ActorSheetVehicle.js.map