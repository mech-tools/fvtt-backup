//token_action_hud addition
import { coriolisRoll, coriolisModifierDialog } from "../coriolis-roll.js";
/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
 
 /**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class yzecoriolisActor extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === "character")
      this._prepareCharacterData(actorData, true);
    if (actorData.type === "npc") this._prepareCharacterData(actorData, false);
  }

  async _preCreate(initData, options, user) {
    await super._preCreate(initData, options, user);
    //setup default images for ships
    if (
      initData.type === "ship" &&
      ((hasProperty(initData, "img") && initData.img === Actor.DEFAULT_ICON) ||
        !hasProperty(initData, "img"))
    ) {
      this.updateSource({ img: CONFIG.YZECORIOLIS.DEFAULT_SHIP_KEY_ART });
    }

    // we check the incoming data to make sure we aren't overriding a 'cloning'
    // operation.
    if (
      !hasProperty(initData, "img") &&
      (initData.type === "character" || initData.type === "npc")
    ) {
      this.updateSource({
        img: CONFIG.YZECORIOLIS.DEFAULT_PLAYER_KEY_ART,
        prototypeToken: {
          texture: {
            src: CONFIG.YZECORIOLIS.DEFAULT_PLAYER_KEY_ART_TOKEN,
          },
        },
      });
    }
  }

  async _onCreate(data, ...args) {
    await super._onCreate(data, ...args);
  }

  async _preUpdate(updateData, options, user) {
    await super._preUpdate(updateData, options, user);
  }
  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData, capCharPoints) {
    const sysData = actorData.system;

    if (capCharPoints) {
      // Cap attribute scores
      Object.keys(sysData.attributes).forEach((k) => {
        let attr = sysData.attributes[k];
        if (attr.value > attr.max) {
          attr.value = attr.max;
        }
        if (attr.value < attr.min) {
          attr.value = attr.min;
        }
      });

      //Cap Skill scores
      Object.keys(sysData.skills).forEach((k) => {
        let skl = sysData.skills[k];
        if (skl.value > skl.max) {
          skl.value = skl.max;
        }
        if (skl.value < skl.min) {
          skl.value = skl.min;
        }
      });
    }

    let hpBonuses = this._prepHPBonuses();
    let mpBonuses = this._prepMPBonuses();
    sysData.hitPoints.max =
      sysData.attributes.strength.value +
      sysData.attributes.agility.value +
      hpBonuses;
    sysData.mindPoints.max =
      sysData.attributes.wits.value +
      sysData.attributes.empathy.value +
      mpBonuses;

    if (sysData.hitPoints.value > sysData.hitPoints.max) {
      sysData.hitPoints.value = sysData.hitPoints.max;
    }
    if (sysData.mindPoints.value > sysData.mindPoints.max) {
      sysData.mindPoints.value = sysData.mindPoints.max;
    }
  }

  _prepareChatRollOptions(template, title) {
    let chatOptions = {
      speaker: {
        alias: this.prototypeToken.name,
        actor: this._id,
      },
      title: title,
      template: template,
      rollMode: game.settings.get("core", "rollMode"),
      sound: CONFIG.sounds.dice,
      flags: {
        img: this.prototypeToken.randomImg
          ? this.img
          : this.prototypeToken.texture.src,
      },
      // img to be displayed next to the name on the test card - if it's a wildcard img, use the actor image
    };

    // If the test is coming from a token sheet
    if (this.token) {
      chatOptions.speaker.alias = this.token.name; // Use the token name instead of the actor name
      chatOptions.speaker.token = this.token._id;
      chatOptions.speaker.scene = canvas.scene._id;
      chatOptions.flags.img = this.token.texture.src; // Use the token image instead of the actor image
    } // If a linked actor - use the currently selected token's data if the actor id matches
    else {
      let speaker = ChatMessage.getSpeaker();
      if (speaker.actor == this._id) {
        chatOptions.speaker.alias = speaker.alias;
        chatOptions.speaker.token = speaker.token;
        chatOptions.speaker.scene = speaker.scene;
        chatOptions.flags.img = speaker.token
          ? canvas.tokens.get(speaker.token).document.texture.src
          : chatOptions.flags.img;
      }
    }

    return chatOptions;
  }

  _prepHPBonuses() {
    // look through talents for any HPBonuses
    let bonus = 0;
    for (let t of this.items) {
      if (t.type !== "talent") {
        continue;
      }
      const tData = t.system;
      bonus += Number(tData.hpBonus);
    }
    return bonus;
  }

  _prepMPBonuses() {
    // look through talents for any MPBonuses
    let bonus = 0;
    for (let t of this.items) {
      if (t.type !== "talent") {
        continue;
      }
      const tData = t.system;
      bonus += Number(tData.mpBonus);
    }
    return bonus;
  }

  /** @override */
  static async create(initData, options = {}) {
    initData.prototypeToken = initData.prototypeToken || {};
    if (initData.type === "character" || initData.type === "npc") {
      foundry.utils.mergeObject(
        initData.prototypeToken,
        {
          actorLink: true,
        },
        { overwrite: false }
      );
    }
    return super.create(initData, options);
  }

  //token_action_hud addition
    async roll(skillName,inputRollType, actorData) {
    //const item = this.actor.system.attributes.wits: null;
	console.log('debug');
	console.log(skillName);
	console.log(inputRollType);
    console.log(actorData.system);
	const actor = actorData;
	let attributeForSkill= 'wits';
	switch (skillName){
					  case 'technology' :
					  case 'dataDjinn' :
					  case 'science' :
					  case 'medicurgy' :
					  case 'observation' :
					  case 'survival' :
					  attributeForSkill= 'wits';
					  break;
					  case 'manipulation' :
					  case 'command' : 
					  case 'mysticPowers' :
					  case 'culture' :
					  attributeForSkill= 'empathy';
					  break;
					  case 'dexterity' :
					  case 'infiltration' :
					  case 'rangedCombat' :
					  case 'pilot' :
					  attributeForSkill= 'agility';
					  break;
					  case 'meleeCombat' :
					  case 'force' :
					  attributeForSkill= 'strength';
					  break;
					}
	let rollData;
	
	switch (inputRollType) {
			case 'attribute':
                rollData = {
				  actorType: actorData.type,
				  rollType: inputRollType,
				  attributeKey: skillName,
				  attribute: actorData.system.attributes[skillName].value, 
				  modifier: 0,
				  bonus: 0,
				  rollTitle: game.i18n.localize(`YZECORIOLIS.Attr${skillName.capitalize()}`)+' Roll', 
				  pushed: false
				};
				break;
			case 'general' :
			case 'advanced' :
                rollData = {
					//{rollType, skill, attribute, modifier} rollData
					//attributes[rollData.attributeKey]
				  actorType: actorData.type,
				  rollType: inputRollType,
				  attributeKey: attributeForSkill,
				  attribute: actorData.system.attributes[attributeForSkill].value, 
			      skillKey: skillName.toLowerCase(),
			      skill: actorData.system.skills[skillName.toLowerCase()].value,//dataset.skillkey ? actorData.skills[dataset.skillkey].value : 0,
				  modifier: 0,
				  bonus: 0,
				  rollTitle: game.i18n.localize(`YZECORIOLIS.Skill${skillName.capitalize()}`)+' Roll', //import nice name
				  pushed: false
				  //features: item?.special ? Object.values(item.special).join(", ") : "",
				};
			break;
			
	}
	
    const chatOptions = actor._prepareChatRollOptions(
      "systems/yzecoriolis/templates/sidebar/roll.html",
     inputRollType
    );

    coriolisModifierDialog((modifier, additionalData) => {
      rollData.modifier = modifier;
      rollData.additionalData = additionalData;
      coriolisRoll(chatOptions, rollData);
    }, false);
    
  }
  
  
}
