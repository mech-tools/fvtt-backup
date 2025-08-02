/* Scripts des Compendiums FR de Toc pour le système CoC7 pour Foundry VTT */

// message d'accueil à l'activation du module
async function welcomeMessage() {
  ChatMessage.create({
    type: CONST.CHAT_MESSAGE_TYPES.OTHER,
    content: '🐙 Ph\'n glui,<br />Cliquez @UUID[Compendium.coc7-module-fr-toc-off.fr-compendiums-journalentry.JournalEntry.ew3N9xBidfE8M2td]{ici} pour accéder à toute la documentation de ces compendiums pour l\'Appel V7. Bon jeu !',
    speaker: { alias: "Cthulhu" }
  })
  game.user.setFlag("coc7-module-fr-toc-off", "welcomeMessageShown092024", true)
}

Hooks.on('ready', async function () {
  // message d'accueil à l'activation du module
  if (!game.user.getFlag("coc7-module-fr-toc-off", "welcomeMessageShown092024")) {
      welcomeMessage()
  }
})

Hooks.once('init', async () => {
  // ajout des époques Achtung Cthulhu et Achtung Pulp
  game.CoC7.eras('achtung', 'Achtung Cthulhu')
  game.CoC7.eras('achtungPulp', 'Achtung Cthulhu Pulp')
  game.CoC7.eras('deltagreen', 'Delta Green')
  game.CoC7.eras('deltagreenVN', 'Delta Green Viet Nam')
  game.CoC7.eras('contreesReve', 'Les Contrées du Rêve')
  game.CoC7.eras('findestemps', 'Fin des Temps')
  game.CoC7.eras('futuriste', 'Futuriste')
})
