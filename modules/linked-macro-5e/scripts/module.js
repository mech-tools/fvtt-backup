class LinkedMacro5e {
  static MODULE_NAME = 'linked-macro-5e'
  static MODULE_TITLE = 'Linked Macro 5e'

  static init = async () => {
    console.log(`${this.MODULE_NAME} | Initializing ${this.MODULE_TITLE}`)

    this.handleHotbarDrop()

    libWrapper.register(
      this.MODULE_NAME,
      'game.dnd5e.rollItemMacro',
      this.onHotbarMacro,
      libWrapper.OVERRIDE
    )
  }

  static handleHotbarDrop = () => {
    Hooks._hooks.hotbarDrop = [(bar, data, slot) => {
      if (data.type !== 'Item') return true
      this.assignMacro(data, slot)
      return false
    }].concat(Hooks._hooks.hotbarDrop || [])
  }

  static assignMacro = async (item, slot, mode) => {
    function command() {
      return `
// HotbarUses5e: ActorID="${item.actorId}" ItemID="${item.data._id}"
const actorId = '${item.actorId}'
const itemId = '${item.data._id}'
const actorToRoll = canvas.tokens.placeables.find(t => t.actor?.id === actorId)?.actor ?? game.actors.get(actorId)
const itemToRoll = actorToRoll?.items.get(itemId)

if (!itemToRoll) {
  return ui.notifications.warn(game.i18n.format('DND5E.ActionWarningNoItem', { item: itemId, name: actorToRoll?.name ?? '[Not Found]' }))
}

if (game.modules.get('itemacro')?.active && itemToRoll.hasMacro()) {
  return itemToRoll.executeMacro()
}

game.dnd5e.rollItemMacro(itemToRoll.data.name, actorToRoll.data._id, itemToRoll.data._id)
      `
    }

    let macro = game.macros.find(m => (m.name === item.name) && (m.command === command))

    if (!macro) {
      macro = await Macro.create({
        name: item.data.name,
        type: 'script',
        img: item.data.img,
        command: command(),
        flags: { 'dnd5e.itemMacro': true }
      }, { displaySheet: false })
    }

    game.user.assignHotbarMacro(macro, slot)
  }

  static onHotbarMacro = async (itemName, actorId, itemId) => {
    const actorToRoll = canvas.tokens.placeables.find(t => t.actor?.id === actorId)?.actor ?? game.actors.get(actorId)
    const itemToRoll = actorToRoll?.items.get(itemId)

    return itemToRoll.roll()
  }
}

Hooks.on('ready', LinkedMacro5e.init)
