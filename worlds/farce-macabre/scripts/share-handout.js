const handoutJournalId = "S6aznYGv3dgiOkP9";
const sharedJournalId = "eXcuHr6rkbYWuniT";

Hooks.on("getJournalSheetHeaderButtons", (app, buttons) => {
  if (!game.users.current.isGM) return;
  if (buttons.find((button) => button.class === "share-handout")) return;
  if (app instanceof DocumentSheet) {
    const journal = app;
    if (app.document.id !== handoutJournalId) return;

    buttons.unshift({
      icon: "fas fa-square-share-nodes fa-fw",
      label: "Partager aux joueurs",
      class: "share-handout",
      onclick: () => {
        // Get current page and clone
        const pageId = journal.pagesInView[0].dataset.pageId;
        const page = Object.assign(
          {},
          journal.document.pages.find((p) => p.id === pageId).toObject()
        );

        // Check if sharedJournal exists
        const sharedJournal = game.journal.get(sharedJournalId);
        if (!sharedJournal) return ui.notifications.error("Aucun journal de découvertes trouvé !");

        // Figure out new sort (so this will be the last page added)
        const allSort = sharedJournal.pages.map((p) => p.sort);
        const currentMaxSort = allSort.length ? Math.max(...allSort) : 0;
        page.sort = currentMaxSort + 10_000;

        // Add a creation flag
        page.flags["share-handout"] = true;

        // Create new page in sharedJournal
        sharedJournal.createEmbeddedDocuments("JournalEntryPage", [page]);
        ui.notifications.info("Aide de jeu partagée avec succès !");
      }
    });
  }
});

Hooks.on("createJournalEntryPage", (entryPage) => {
  // Make sure the new page is from this script
  if (entryPage.parent.id !== sharedJournalId || !entryPage.flags["share-handout"]) return;

  // Show the journal page to all
  entryPage.parent.sheet.render(true, {
    pageId: entryPage.id,
    sheetMode: JournalSheet.VIEW_MODES.SINGLE
  });
});

