import { debug } from "./util.js";

class BaseMessage {
  constructor(actor, targetActor) {
    this.actor = actor;

    /** @type {EffectChangeData[]} */
    this.changes = this._getActiveEffectChanges(actor);

    /** @type {EffectChangeData[]} */
    this.targetChanges = this._getActiveEffectChanges(targetActor);
  }

  get messageKeys() {
    return ["flags.adv-reminder.message.all"];
  }

  get grantsMessageKeys() {
    return ["flags.adv-reminder.grants.message.all"];
  }

  async addMessage(options) {
    // actor messages
    const keys = this.messageKeys;
    const actorMessages = this._filterMessagesByKeys(this.changes, keys);

    // target messages (grants)
    const grantsKeys = this.grantsMessageKeys;
    const targetActorMessages = this._filterMessagesByKeys(this.targetChanges, grantsKeys);

    // final messages array. Own fist, target last
    let messages = actorMessages.concat(targetActorMessages);

    if (messages.length > 0) {
      messages = messages.map(message => {
        message.value = message.value.replace("{label}", message.label);

        return message;
      });

      // build message
      const message = await renderTemplate(
        "modules/adv-reminder/templates/roll-dialog-messages.hbs",
        { messages }
      );
      // enrich message, specifically replacing rolls
      const enriched = TextEditor.enrichHTML(message, {
        secrets: true,
        documents: false,
        links: false,
        rolls: true,
        rollData: this.actor.getRollData(),
      });
      debug("message", message, "enriched", enriched);
      setProperty(options, "dialogOptions.adv-reminder.message", enriched);
    }

    return messages;
  }

  /**
 * Return the relevant effect changes
 * @param {Actor} actor actor or target
 * @returns {Array} empty if no changes found
 */
  _getActiveEffectChanges(actor) {
    return actor ? actor.effects
      .filter((effect) => !effect.isSuppressed && !effect.data.disabled)
      .flatMap((effect) => effect.data.changes)
      .filter((change) => change.key.startsWith("flags.adv-reminder."))
      .sort((a, b) => a.priority - b.priority) : [];
  }

  /**
 * Filter the changes by the keys passed
 * @param {Array} changes the changes to be filetered
 * @param {Array} keys the keys to filter by
 * @returns {array} array of object containing value, label found
 */
  _filterMessagesByKeys(changes, keys) {
    return changes
      .filter((change) => keys.includes(change.key))
      .map((change) => ({ value: change.value, label: change.document?.data?.label }));
  }
}

export class AttackMessage extends BaseMessage {
  constructor(actor, targetActor, item) {
    super(actor, targetActor);

    /** @type {string} */
    this.itemName = item.data.name;
    /** @type {string} */
    this.actionType = item.data.data.actionType;
    /** @type {string} */
    this.abilityId = item.abilityMod;
  }

  /** @override */
  get messageKeys() {
    return super.messageKeys.concat(
      "flags.adv-reminder.message.attack.all",
      `flags.adv-reminder.message.attack.${this.itemName}`,
      `flags.adv-reminder.message.attack.${this.actionType}`,
      `flags.adv-reminder.message.attack.${this.abilityId}`
    );
  }

  /** @override */
  get grantsMessageKeys() {
    return super.grantsMessageKeys.concat(
      "flags.adv-reminder.grants.message.attack.all",
      `flags.adv-reminder.grants.message.attack.${this.actionType}`,
      `flags.adv-reminder.grants.message.attack.${this.abilityId}`
    );
  }
}

class AbilityBaseMessage extends BaseMessage {
  constructor(actor, abilityId) {
    super(actor);

    /** @type {string} */
    this.abilityId = abilityId;
  }

  /** @override */
  get messageKeys() {
    return super.messageKeys.concat("flags.adv-reminder.message.ability.all");
  }
}

export class AbilityCheckMessage extends AbilityBaseMessage {
  /** @override */
  get messageKeys() {
    return super.messageKeys.concat(
      "flags.adv-reminder.message.ability.check.all",
      `flags.adv-reminder.message.ability.check.${this.abilityId}`
    );
  }
}

export class AbilitySaveMessage extends AbilityBaseMessage {
  /** @override */
  get messageKeys() {
    return super.messageKeys.concat(
      "flags.adv-reminder.message.ability.save.all",
      `flags.adv-reminder.message.ability.save.${this.abilityId}`
    );
  }
}

export class SkillMessage extends AbilityCheckMessage {
  constructor(actor, skillId) {
    super(actor, actor.data.data.skills[skillId].ability);

    /** @type {string} */
    this.skillId = skillId;
  }

  /** @override */
  get messageKeys() {
    return super.messageKeys.concat(
      "flags.adv-reminder.message.skill.all",
      `flags.adv-reminder.message.skill.${this.skillId}`
    );
  }
}

export class DeathSaveMessage extends AbilityBaseMessage {
  constructor(actor) {
    super(actor, null);
  }

  /** @override */
  get messageKeys() {
    return super.messageKeys.concat(
      "flags.adv-reminder.message.ability.save.all",
      "flags.adv-reminder.message.deathSave"
    );
  }
}

export class DamageMessage extends BaseMessage {
  constructor(actor, targetActor, item) {
    super(actor, targetActor);

    /** @type {string} */
    this.itemName = item.data.name;
    /** @type {string} */
    this.actionType = item.data.data.actionType;
  }

  /** @override */
  get messageKeys() {
    return super.messageKeys.concat(
      "flags.adv-reminder.message.damage.all",
      `flags.adv-reminder.message.damage.${this.itemName}`,
      `flags.adv-reminder.message.damage.${this.actionType}`
    );
  }

  /** @override */
  get grantsMessageKeys() {
    return super.grantsMessageKeys.concat(
      "flags.adv-reminder.grants.message.damage.all",
      `flags.adv-reminder.grants.message.damage.${this.actionType}`
    );
  }

  async addMessage(options) {
    // Damage options has a nested options variable, add that and pass it to super
    options.options = options.options || {};
    return super.addMessage(options.options);
  }
}
