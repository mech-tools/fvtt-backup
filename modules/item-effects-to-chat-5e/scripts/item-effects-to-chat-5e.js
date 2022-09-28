import HandlebarHelpers from './handlebar-helpers.js';
import { ItemEffectsToChat5eCanvas } from "./classes/canvas.js";
import { ItemEffectsToChat5eChat } from "./classes/chat.js";
import { ItemEffectsToChat5eItem } from "./classes/item.js";

export class ItemEffectsToChat5e {
  static MODULE_NAME = "item-effects-to-chat-5e";
  static MODULE_TITLE = "Item Effects to Chat DnD5e";

  static log(...args) {
    if (game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.MODULE_NAME)) {
      console.log(this.MODULE_TITLE, '|', ...args);
    }
  }
}

Hooks.on("init", async () => {
  new HandlebarHelpers().registerHelpers();
});

Hooks.on("ready", async () => {
  console.log(`${ItemEffectsToChat5e.MODULE_NAME} | Initializing ${ItemEffectsToChat5e.MODULE_TITLE}`);

  // initialize item hooks
  ItemEffectsToChat5eItem.init();
});

Hooks.on('renderActiveEffectConfig', async (sheet, html) => {
  const flags = sheet.object.data.flags ?? {};
  const tab = `<a class="item" data-tab="ItemEffectToChat"><i class="fas fa-bullseye"></i> ${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.EFFECT_TAB.TAB_TITLE`)}</a>`;

  const content = `
    <div class="tab" data-tab="ItemEffectToChat">
      <div class="help-text" style="font-weight: bold; text-align: center;"></div>
      <div class="form-group">
        <label>${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.EFFECT_TAB.SELF`)}</label>
        <input name="flags.${ItemEffectsToChat5e.MODULE_NAME}.self" type="checkbox" ${flags[ItemEffectsToChat5e.MODULE_NAME]?.self ? 'checked' : ''}></input>
      </div>
      <div class="form-group">
        <label>${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.EFFECT_TAB.TARGET`)}</label>
        <input name="flags.${ItemEffectsToChat5e.MODULE_NAME}.target" type="checkbox" ${flags[ItemEffectsToChat5e.MODULE_NAME]?.target ? 'checked' : ''}></input>
      </div>
      <div class="form-group">
        <label>${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.EFFECT_TAB.FORCE-APPLY`)}</label>
        <input name="flags.${ItemEffectsToChat5e.MODULE_NAME}.force" type="checkbox" ${flags[ItemEffectsToChat5e.MODULE_NAME]?.force ? 'checked' : ''}></input>
      </div>
      <div class="form-group">
        <label>${game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.EFFECT_TAB.DONT-APPLY`)}</label>
        <input name="flags.${ItemEffectsToChat5e.MODULE_NAME}.none" type="checkbox" ${flags[ItemEffectsToChat5e.MODULE_NAME]?.none ? 'checked' : ''}></input>
      </div>
    </div>
  `

  html.find(".tabs .item").last().after(tab);
  html.find(".tab").last().after(content);

  const $self = html.find(`input[name="flags.${ItemEffectsToChat5e.MODULE_NAME}.self"]`);
  const $target = html.find(`input[name="flags.${ItemEffectsToChat5e.MODULE_NAME}.target"]`);
  const $force = html.find(`input[name="flags.${ItemEffectsToChat5e.MODULE_NAME}.force"]`);
  const $none = html.find(`input[name="flags.${ItemEffectsToChat5e.MODULE_NAME}.none"]`);

  if (sheet.object.parent?.data.data?.target?.type === 'self') {
    $self.prop('checked', false);
    $self.val(false);
    $self.prop('disabled', true)
  }

  if (
    !!sheet.object.parent?.data.data.save?.ability ||
    sheet.object.parent?.data.data.actionType === 'mwak' ||
    sheet.object.parent?.data.data.actionType === 'rwak' ||
    sheet.object.parent?.data.data.actionType === 'msak' ||
    sheet.object.parent?.data.data.actionType === 'rsak'
    ) {
      const $helpText = html.find(`div.help-text`);
      $helpText.text(game.i18n.localize(`${ItemEffectsToChat5e.MODULE_NAME}.EFFECT_TAB.WONT-APPLY`));
  }

  const newChanges = function (source, target) {
    source.on("change", function() {
      const sourceValue = this.checked;

      if (sourceValue) {
        target.prop('checked', false);
        target.val(false);
      }
    });
  };

  newChanges($self, $target)
  newChanges($target, $self)
  newChanges($force, $none)
  newChanges($none, $force)

  html.css({ height: "auto" });
});

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(ItemEffectsToChat5e.MODULE_NAME);
});

// initialize chat hooks
ItemEffectsToChat5eChat.init();

// initialize canvas hooks
ItemEffectsToChat5eCanvas.init();
