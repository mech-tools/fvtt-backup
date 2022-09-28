import { ItemEffectsToChat5e } from '../item-effects-to-chat-5e.js'
import { ItemEffectsToChat5eCanvas } from './canvas.js';

/**
 * Handles user interactions with created chat cards.
 *
 * Most of this class is adapted directly from Core's handling of Combatants
 * in the combat tracker.
 */
export class ItemEffectsToChat5eChat {
  _highlighted = null;

  /**
   * Set up listeners for the chat log and remove individual messages that should be hidden
   */
  static init() {
    Hooks.on('renderChatLog', (_chatLog, html) => this._registerChatListeners(html));

    Hooks.on('renderChatMessage', this.handleRenderChatMessage);

    Hooks.on('renderChatPopout', (app, html) => {
      if (app.message?.data.flags?.["item-effects-to-chat-5e"]?.isEffectListCard) {
        this._registerChatListeners(html);
      }
    })
  }


  /**
   * Register the chatLog-wide event listeners to handle hovering over names and dragging effects.
   * Also used for chat popouts
   */
  static _registerChatListeners = (html) => {
    html.on('mouseenter', '.item-effects-to-chat-combatant-list > li', this._onCombatantHoverIn);
    html.on('mouseleave', '.item-effects-to-chat-combatant-list > li', this._onCombatantHoverOut);
    html.on('click', '.item-effects-to-chat-combatant-list > li', this._onCombatantMouseDown);

    html.on('click', '.item-effects-to-chat-card button', this._onClickApply);
  }

  /**
   * Adapted directly from Core's handling of Combatants in the combat tracker.
   * Allows actors hovered in chat to highlight on canvas.
   */
  static _onCombatantHoverIn = (event) => {
    event.preventDefault();

    if (!canvas.ready) return;
    const li = event.currentTarget;
    const token = canvas.tokens.get(li.dataset.tokenId);
    if (token?.isVisible) {
      if (!token._controlled) token._onHoverIn(event);
      this._highlighted = token;
    }
  }

  /**
   * Adapted directly from Core's handling of Combatants in the combat tracker.
   * Allows actors hovered in chat to highlight on canvas.
   */
  static _onCombatantHoverOut = (event) => {
    event.preventDefault();
    if (!canvas.ready) return;

    if (this._highlighted) this._highlighted._onHoverOut(event);
    this._highlighted = null;
  }

  /**
   * Adapted directly from Core's handling of Combatants in the combat tracker.
   * Allows actors hovered in chat to highlight on canvas.
   */
  static _onCombatantMouseDown = async (event) => {
    event.preventDefault();

    const li = event.currentTarget;
    const token = canvas.tokens.get(li.dataset.tokenId);
    if (!token?.actor?.testUserPermission(game.user, "OBSERVED")) return;
    const now = Date.now();

    // Handle double-left click to open sheet
    const dt = now - this._clickTime;
    this._clickTime = now;
    if (dt <= 250) {
      if (token.actor) token.actor.sheet.render(true);
    }

    if (!canvas.ready) return;

    // Control and pan on single-left
    else {
      token.control({ releaseOthers: true });
    }
  }

  /**
   * Handle the Button presses for "Apply All" and "Apply All to All"
   */
  static _onClickApply = async (event) => {
    ItemEffectsToChat5e.log('_onClickApply running');
    event.stopPropagation();
    const button = event.currentTarget;
    const action = button.dataset?.action;

    const chatCard = $(button).closest('[data-message-id]');
    const chatId = chatCard.data('messageId');
    const chatMessage = game.messages.get(chatId);
    const { actorId, sceneId, tokenId } = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'sourceActor');
    let targetTokenIds = [];
    switch (action) {
      case 'apply-all-effects': {
        const li = $(button).closest('[data-token-id]');
        targetTokenIds.push(li.data('tokenId'));
        break;
      }
      case 'apply-all-effects-to-all': {
        const targetedTokenIds = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'targetedTokenIds');
        targetTokenIds.push(...targetedTokenIds);
        break;
      }
    }

    const effectDatas = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'effectData').map((data) => ({
      ...data,
      disabled: false,
      transfer: false,
    }));

    if (!effectDatas) {
      ui.notifications.warn('This chat card is from before Effects to Chat 2.0, make a new card by reusing the item.');
      return;
    }

    ItemEffectsToChat5e.log('_onClickApply', {
      chatMessage,
      sceneId,
      targetTokenIds,
      effectDatas,
    });

    if (game.modules.get('dae')?.active) {
      let item = await fromUuid(effectDatas[0].origin);

      if (!item) {
        const { actorUuid } = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'sourceActor');
        const actor = await fromUuid(actorUuid);

        if (actor) {
          const itemData = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'itemData');

          item = new CONFIG.Item.documentClass(itemData, { parent: actor })
        }
      }

      if (!item) {
        ui.notifications.error('There was an error applying the effect, the item and/or the actor might no longer exist.')
        return false;
      }

      const spellLevel = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'spellLevel');

      DAE.doEffects(item, true, targetTokenIds, { whisper: false, spellLevel });
    } else {
      ItemEffectsToChat5eCanvas.applyEffectsToTokens(sceneId, targetTokenIds, effectDatas);
    }
  }

  /**
   * Register drag drop listeners if GM, otherwise remove the card if player
   */
  static handleRenderChatMessage = async (chatmessage, html) => {

    const dragDroppable = chatmessage.data.flags?.['auto-roll-npc-save-5e']?.isResultCard
      || chatmessage.data.flags?.['attack-roll-check-5e']?.isResultCard
      || chatmessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'isEffectListCard');

    if (dragDroppable) {
      this._registerDragDropListeners(chatmessage, html);
    }
  }

  /**
   * Register a drag and drop listener individually so that popped out chat cards work
   */
  static _registerDragDropListeners = (chatmessage, html) => {
    const dragDrop = new DragDrop({
      dragSelector: '[data-effect-uuid]',
      dropSelector: '[data-token-id]',
      permissions: { drag: () => true, drop: () => true },
      callbacks: { dragstart: this._onDragStart, drop: this._onDrop }
    });

    dragDrop.bind(html[0]);
  }

  /**
   * The Drag Start event which populates data to create an effect on drop
   * @param {*} event
   */
  static _onDragStart = (event) => {
    const li = event.currentTarget;
    const chatCard = $(li).closest('[data-message-id]');
    const chatId = chatCard.data('messageId');
    const chatMessage = game.messages.get(chatId);

    if (!li.dataset.effectUuid || !chatMessage) {
      return;
    }

    const effectDatas = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'effectData');

    if (!effectDatas) {
      ui.notifications.warn('This chat card is from before Effects to Chat 2.0, make a new card by reusing the item.');
      return;
    }

    const { actorId, sceneId, tokenId, actorUuid } = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'sourceActor');
    const spellLevel = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'spellLevel');
    const itemData = chatMessage.getFlag(ItemEffectsToChat5e.MODULE_NAME, 'itemData');

    const effectData = effectDatas?.find((data) => data.id === li.dataset.effectUuid);

    if (!effectData) {
      return;
    }

    // Create drag data
    const dragData = {
      actorId,
      sceneId,
      tokenId,
      actorUuid,
      spellLevel,
      itemData,
      type: "ActiveEffect",
      data: {
        ...effectData,
        disabled: false,
        transfer: false,
      }
    };

    ItemEffectsToChat5e.log('DragDrop dragStart:', {
      chatMessage,
      li,
      dataset: li.dataset,
      event,
      dragData
    });

    // Set data transfer
    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  };

  /**
   * When an effect is dropped on a target token, apply that effect
   */
  static _onDrop = async (event) => {
    ItemEffectsToChat5e.log('DragDrop drop', {
      event,
    });
    // Try to extract the data
    let dropData;
    try {
      dropData = JSON.parse(event.dataTransfer.getData('text/plain'));
      ItemEffectsToChat5e.log('DragDrop drop', {
        event,
        dropData,
      });

    } catch (err) {
      ItemEffectsToChat5e.log('DragDrop drop', {
        err,
      });

      return false;
    }


    if (dropData.type !== 'ActiveEffect') return false;

    const li = event.currentTarget;
    const chatCard = $(li).closest('[data-message-id]');
    const chatId = chatCard.data('messageId');
    const chatMessage = game.messages.get(chatId);
    const targetTokenId = li.dataset?.tokenId;

    ItemEffectsToChat5e.log('DragDrop drop starting:', {
      event,
      chatMessage,
      li,
      targetTokenId,
      dropData,
    });

    if (game.modules.get('dae')?.active) {
      let item = await fromUuid(dropData.data.origin);

      if (!item) {
        const actor = await fromUuid(dropData.actorUuid);

        if (actor) item = new CONFIG.Item.documentClass(dropData.itemData, { parent: actor })
      }

      if (!item) {
        ui.notifications.error('There was an error applying the effect, the item and/or the actor might no longer exist.')
        return false;
      }

      DAE.doEffects(item, true, targets, { whisper: false, spellLevel: dropData.spellLevel, effectsToApply: [dropData.data._id], removeMatchLabel: true });
    } else {
      ItemEffectsToChat5eCanvas.applyEffectsToTokens(dropData.sceneId, [targetTokenId], [dropData.data]);
    }
  }
}