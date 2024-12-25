export class SearchChat {
  /**
   * Constructor.
   */
  constructor() {
    this.chat = null;
    this.searchPattern = null;
    this.content = null;
    this.template = null;
    this.highlighted = false;
    this.data = {
      pageResultCollection: [],
      itemResultCollection: [],
      actorResultCollection: [],
    };
    this.template = "modules/fullsearch/templates/chat/search-result.hbs";
  }

  /**
   * Creates the chat message with the search pattern.
   * @return this instance.
   */
  async create(searchPattern) {
    this.searchPattern = searchPattern;
    this.data.user = game.user.id;

    // GM only
    this.data.whisper = ChatMessage.getWhisperRecipients("GM").map((u) => u.id);
    // Create the chat
    return this;
  }

  /**
   * Create the message content from the registered template.
   * @returns the message content or null if an error occurs.
   */
  async _createContent() {
    // Update the data to provide to the template
    const data = foundry.utils.duplicate(this.data);

    data.searchPattern = this.searchPattern;
    data.highlighted = this.highlighted;
    // Call the template renderer.
    return await renderTemplate(this.template, data);
  }

  /**
   * @description Displays the chat message
   * @returns this instance
   */
  async display() {
    // Create the chat content
    this.content = await this._createContent();

    // Create the chat data
    const chatData = foundry.utils.duplicate(this.data);
    chatData.user = game.user.id;
    chatData.content = this.content;
    chatData.flags = { world: { type: "searchPage", searchPattern: this.searchPattern, searchData: this.data, highlighted: this.highlighted } };
    ChatMessage.applyRollMode(chatData, "selfroll");

    this.chat = await ChatMessage.create(chatData);
    return this;
  }

  /**
   * @description Search the pattern and update data with the results
   * @returns this instance
   */
  async searchWorld() {
    let pages = [];
    const groupedByJournal = await this.searchPages();

    /*
    // Group by journal
    const groupedByJournal = pages.reduce((acc, page) => {
      // Create a new group for the journal if it doesn't exist
      acc[page.journalId] = acc[page.journalId] || {
        journalName: page.journalName,
        journalId: page.journalId,
        pages: [],
      };
      // Add the page to the journal's group
      acc[page.journalId].pages.push({ pageId: page.id });
      return acc;
    }, {});
*/
    const maxResults = parseInt(game.settings.get("fullsearch", "maxResults"));

    this.data.pageResultCollection = groupedByJournal;
    this.data.pageresults = Object.keys(groupedByJournal).length;
    console.log("groupedByJournal", groupedByJournal);

    const itemResults = await game.items.search({ query: this.searchPattern }).filter((obj) => obj.permission);
    this.data.itemResultCollection = itemResults.map((item) => item._id);
    this.data.itemresults = this.data.itemResultCollection.length;

    const actorResults = await game.actors.search({ query: this.searchPattern }).filter((obj) => obj.permission);
    this.data.actorResultCollection = actorResults.map((actor) => actor._id);
    this.data.actorresults = this.data.actorResultCollection.length;

    this.data.hasresults = this.data.pageresults + this.data.itemresults + this.data.actorresults;
    this.data.tooMuchResults = this.data.hasresults > maxResults ? game.i18n.format("FULLSEARCH.too_many_results", { maxResults: maxResults }) : false;

    return this;
  }

  /**
   * @description Toggle highlighting of pattern in documents
   */
  static async toggleEnricher(event, searchPattern, messageId) {
    event.preventDefault();
    const element = event.currentTarget;

    // g for global, multiple replacements, i for case insensitive; the rest is for not replacing the html markup's content when the pattern appears in it
    const regexPattern = await new RegExp("(" + searchPattern + ")(?![^<]*>)", "gim");

    let isAlreadyHighlighted = CONFIG.TextEditor.enrichers.findIndex((element) => element.namePattern === searchPattern);
    if (isAlreadyHighlighted >= 0) {
      // Remove
      CONFIG.TextEditor.enrichers.splice(isAlreadyHighlighted, 1);
    } else {
      // Add
      CONFIG.TextEditor.enrichers = await CONFIG.TextEditor.enrichers.concat([
        {
          pattern: regexPattern,
          namePattern: searchPattern,
          enricher: async (match, options) => {
            const awdoc = document.createElement("mark");
            awdoc.innerHTML = `${match[1]}`;
            return awdoc;
          },
        },
      ]);
    }
    const journals = Object.values(ui.windows).filter((x) => x instanceof JournalSheet);

    for (const journal of journals) {
      ui.windows[journal.appId].render(true);
    }

    // Update the chat message
    await SearchChat.updateMessage(messageId);
  }

  // Reset the chat message with no highlighting
  static async updateMessage(messageId, reset = false) {
    const message = game.messages.get(messageId);
    const searchPattern = message.getFlag("world", "searchPattern");
    const searchData = message.getFlag("world", "searchData");
    const highlighted = message.getFlag("world", "highlighted");

    let newChatMessage = await new SearchChat();
    newChatMessage.data = searchData;
    newChatMessage.data.searchPattern = searchPattern;
    newChatMessage.data.highlighted = reset ? false : !highlighted;

    const newContent = await renderTemplate(newChatMessage.template, newChatMessage.data);
    message.update({ content: newContent, "flags.world.highlighted": reset ? false : !highlighted });
  }

  async searchPages() {
    const groupedByJournal = {};
    game.journal.forEach(async (doc) => {
      let pagesArray = await doc.pages.search({ query: this.searchPattern });
      pagesArray.forEach((page) => {
        if (page.permission) {
          // Create a new group for the journal if it doesn't exist
          groupedByJournal[doc._id] = groupedByJournal[doc._id] || {
            journalName: doc.name,
            journalId: doc._id,
            pages: [],
          };
          groupedByJournal[doc._id].pages.push({ pageId: page.id });
        }
      });
    });
    return groupedByJournal;
  }
}
/**
 * Prompt the user to perform a search.
 * @extends {Dialog}
 */
export class SearchDialog extends Dialog {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 400,
      height: 230,
      template: `modules/fullsearch/templates/search/search-dialog.hbs`,
    });
  }
  data = {
    title: game.i18n.localize("FULLSEARCH.window_title"),
    buttons: {
      research: {
        label: game.i18n.localize("FULLSEARCH.button_search"),
        callback: async (html) => {
          let searchPattern = html.find("[name=searchtext]")[0].value;
          if (searchPattern) {
            let search = await new SearchChat().create(searchPattern);
            await search.searchWorld();
            await search.display();
          }
        },
        icon: `<i class="fas fa-magnifying-glass"></i>`,
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: game.i18n.localize("FULLSEARCH.button_cancel"),
        callback: () => {},
      },
    },
    default: "research",
    close: () => {},
  };
}
