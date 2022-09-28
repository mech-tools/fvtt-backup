import { ItemEffectsToChat5e } from '../item-effects-to-chat-5e.js'

/**
 * Handles all the logic related to Item usage and the display of its effects
 */
export class ItemEffectsToChat5eItem {
  constructor(item, actor, spellLevel) {
    this.actor = actor;

    this.spellLevel = spellLevel;

    this.item = item;
    this.itemHasEffect = this.item.effects.filter(effect => effect.data.transfer === false).length;

    this.ammo = this.item.data.data.consume?.type === 'ammo' && this.item.data.data.consume?.target ?
      this.actor.items.get(this.item.data.data.consume.target) :
      null;
    this.ammoHasEffect = this.ammo && this.ammo.effects.filter(effect => effect.data.transfer === false).length;

    this.self = item.data.data.target?.type === 'self';
    this.hasSave = !!item.data.data.save?.ability;
    this.hasAttack = item.data.data.actionType === 'mwak' ||
      item.data.data.actionType === 'rwak' ||
      item.data.data.actionType === 'msak' ||
      item.data.data.actionType === 'rsak';
  }

  /**
   * Register Hooks
   */
  static init() {
    Hooks.on('Item5e.roll', ItemEffectsToChat5eItem.handleItemRoll);
  }

  /**
   * When an item is rolled create a card for the GM to easily apply Targeted Effects
   * @param {*} item
   * @returns
   */
  static handleItemRoll = async (item, chatMessage) => {
    const actor = item.parent;

    if (!(actor instanceof Actor)) {
      return;
    }

    const spellLevel = parseInt($(chatMessage.data.content)[0].dataset.spellLevel) || null;

    const itemEffectToChatItem = new ItemEffectsToChat5eItem(item, actor, spellLevel);

    itemEffectToChatItem.preCreateListChatCard()
  }

  /**
   * When an item is rolled which has temporary effects, create a chat card
   * for the GM only which allows them to see all effects from that item
   * as well as all the tokens the caster targeted (if any).
   *
   * @see ItemEffectsToChat5eChat - for where the chat event listeners are registered
   */
  async preCreateListChatCard() {
    if (!this.itemHasEffect && !this.ammoHasEffect) {
      return;
    }

    // some items might have templates to be placed
    const itemHasTemplateFirst = this.item.hasAreaTarget && game.user.can("TEMPLATE_CREATE") && canvas.activeLayer instanceof TemplateLayer;

    // run the check after measured template is placed
    if (itemHasTemplateFirst) {
      console.log('waiting for template first!');

      const callback = () => this._createListChatCards.bind(this)();

      Hooks.once('createMeasuredTemplate', callback);

      const cancelBack = (controls) => {
        if (controls.activeControl !== 'measure') {
          Hooks.off('createMeasuredTemplate', callback);
          this._createListChatCards();
        }
      }

      // cleans up createMeasuredTemplate hook if the user cancels out of the measure template
      // happens before createMeasuredTemplate sometimes
      Hooks.once('renderSceneControls', cancelBack);

      // always happens before renderSceneControls in cases where the user is actually placing a
      // measured template
      Hooks.once('preCreateMeasuredTemplate', () => {
        Hooks.off('renderSceneControls', cancelBack);
      });

      return;
    }

    this._createListChatCards();
  }

  async _createListChatCards() {

    this._autoApplyEffects();

    if (this.itemHasEffect) await this.createChatCard(this.item);

    if (this.ammo && this.ammoHasEffect) this.createChatCard(this.ammo);
  }

  _autoApplyEffects() {
    const effects = this.item.effects.filter(effect => effect.data.transfer === false)

    const selfTemporaryEffects = effects.filter(effect =>
      (effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.self || (this.self && !effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.target)) &&
      !effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.none &&
      !effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.force
    )

    if(selfTemporaryEffects.length && !this.hasSave && !this.hasAttack) {
      DAE.doEffects(this.item, true, [this.actor], { whisper: false, spellLevel: this.spellLevel, effectsToApply: selfTemporaryEffects.map(e => e.data._id), removeMatchLabel: true });
    }

    const selfForceTemporaryEffects = effects.filter(effect =>
      (effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.self || (this.self && !effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.target)) &&
      effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.force
    )

    if(selfForceTemporaryEffects.length) {
      DAE.doEffects(this.item, true, [this.actor], { whisper: false, spellLevel: this.spellLevel, effectsToApply: selfForceTemporaryEffects.map(e => e.data._id), removeMatchLabel: true });
    }

    const targetTemporaryEffects = effects.filter(effect =>
      effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.target &&
      !effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.none &&
      !effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.force
    )

    if (targetTemporaryEffects.length && !this.hasSave && !this.hasAttack) {
      const targetedTokens = [...(game.user.targets?.values() ?? [])].filter(t => !!t.actor);
      DAE.doEffects(this.item, true, targetedTokens, { whisper: false, spellLevel: this.spellLevel, effectsToApply: targetTemporaryEffects.map(e => e.data._id), removeMatchLabel: true });
    }

    const targetForceTemporaryEffects = effects.filter(effect =>
      effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.target &&
      effect.data.flags?.[ItemEffectsToChat5e.MODULE_NAME]?.force
    )

    if (targetForceTemporaryEffects.length) {
      const targetedTokens = [...(game.user.targets?.values() ?? [])].filter(t => !!t.actor);
      DAE.doEffects(this.item, true, targetedTokens, { whisper: false, spellLevel: this.spellLevel, effectsToApply: targetForceTemporaryEffects.map(e => e.data._id), removeMatchLabel: true });
    }
  }

  async createChatCard(item) {
    const targetedTokens = [...(game.user.targets?.values() ?? [])].filter(t => !!t.actor);
    const temporaryEffects = item.effects.filter(effect => effect.data.transfer === false)

    const html = await renderTemplate(
      `modules/${ItemEffectsToChat5e.MODULE_NAME}/templates/item-effects-to-chat-card.hbs`,
      {
        item: item,
        targetedTokens,
        effects: temporaryEffects
      });

    ItemEffectsToChat5e.log('Creating Card:', {
      effects: item.effects,
      targetedTokens,
      html
    });

    const messageData = {
      whisper: game.user.isGM ? ChatMessage.getWhisperRecipients('gm') : [],
      blind: game.user.isGM,
      user: game.user.data._id,
      flags: {
        core: {
          canPopout: true
        },
        [ItemEffectsToChat5e.MODULE_NAME]: {
          isEffectListCard: true,
          sourceActor: {
            actorId: this.actor.id,
            sceneId: canvas.scene?.id,
            tokenId: this.actor.isToken ? this.actor.token.id : null,
            actorUuid: this.actor.uuid,
          },
          spellLevel: this.spellLevel,
          targetedTokenIds: targetedTokens.map(token => token.id),
          effectUuids: this.item.effects.map(effect => effect.uuid),
          itemData: item.data,
          effectData: temporaryEffects.map(effect => ({
            ...effect.toJSON(),
            id: effect.uuid, // fake statusId for Token.toggleEffect
            origin: this.item.uuid,
          })), // necessary for consumables which destroy themselves
        }
      },
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      speaker: ChatMessage.getSpeaker({ actor: this.item.actor }),
      flavor: game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.MESSAGE_HEADER`),
      content: html,
    }

    ChatMessage.create(messageData);
  }
}
