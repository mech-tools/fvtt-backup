// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

function registerSettings() {
  game.settings.register('journal-improvements', 'integratedEditor', {
    name: 'journalImprovements.settings.integratedEditorName',
    hint: 'journalImprovements.settings.integratedEditorHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: Boolean,
    default: true,
    onChange: refreshJournals,
  });

  game.settings.register('journal-improvements', 'editorEngine', {
    name: 'journalImprovements.settings.editorEngineName',
    hint: 'journalImprovements.settings.editorEngineHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: String,
    default: 'prosemirror',
    choices: {
      tinymce: 'TinyMCE',
      prosemirror: 'ProseMirror',
      markdown: 'Markdown',
    },
    onChange: refreshJournals,
  });

  game.settings.register('journal-improvements', 'autosave', {
    name: 'journalImprovements.settings.autosaveName',
    hint: 'journalImprovements.settings.autosaveHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: Boolean,
    default: true,
    onChange: refreshJournals,
  });

  game.settings.register('journal-improvements', 'moveJournalTitle', {
    name: 'journalImprovements.settings.moveJournalTitleName',
    hint: 'journalImprovements.settings.moveJournalTitleHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: Boolean,
    default: true,
    onChange: refreshJournals,
  });

  game.settings.register('journal-improvements', 'createDefaultPage', {
    name: 'journalImprovements.settings.createDefaultPageName',
    hint: 'journalImprovements.settings.createDefaultPageHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
    onChange: refreshJournals,
  });

  game.settings.register('journal-improvements', 'createSilent', {
    name: 'journalImprovements.settings.createSilentPageName',
    hint: 'journalImprovements.settings.createSilentPageHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
    onChange: refreshJournals,
  });

  game.settings.register('journal-improvements', 'pinIcons', {
    name: 'journalImprovements.settings.pinIconsName',
    hint: 'journalImprovements.settings.pinIconsHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
  });

  game.settings.register('journal-improvements', 'pasteToPageImage', {
    name: 'journalImprovements.settings.pasteToPageImageName',
    hint: 'journalImprovements.settings.pasteToPageImageHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: Boolean,
    default: false,
    onChange: refreshJournals,
  });

  game.settings.register('journal-improvements', 'uploadFolder', {
    name: 'journalImprovements.settings.uploadFolderName',
    hint: 'journalImprovements.settings.uploadFolderHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: String,
    default: 'uploads/journal',
  });

  game.settings.register('journal-improvements', 'editorHeight', {
    name: 'journalImprovements.settings.editorHeightName',
    hint: 'journalImprovements.settings.editorHeightHint',
    scope: 'client',
    config: true,
    requiresReload: false,
    type: Number,
    default: 610,
    onChange: (value) => setEditorHeight(value),
  });

  for (const t of ['Text', 'Image', 'Pdf', 'Video']) {
    game.settings.register('journal-improvements', `hideButton${t}`, {
      name: `journalImprovements.settings.hideButtons.${t}`,
      hint: `journalImprovements.settings.hideButtons.${t}Hint`,
      scope: 'client',
      config: true,
      requiresReload: false,
      type: Boolean,
      default: false,
      onChange: refreshJournals,
    });
  }
}

function getHiddenButtons() {
  const g = (t) => game.settings.get('journal-improvements', `hideButton${t}`);
  return {
    text: g('Text'),
    image: g('Image'),
    pdf: g('Pdf'),
    video: g('Video'),
  };
}

const noteIcons = {
  text: 'modules/journal-improvements/assets/file.svg',
  image: 'modules/journal-improvements/assets/file-image.svg',
  pdf: 'modules/journal-improvements/assets/file-pdf.svg',
  video: 'modules/journal-improvements/assets/file-video.svg',
};

function getNoteIcon(type) {
  return noteIcons[type];
}

function refreshJournals() {
  Object.values(ui.windows)
    .filter((w) => w instanceof JournalSheet)
    .forEach((w) => w.render());
}

function setEditorHeight(value = undefined) {
  value = value ?? game.settings.get('journal-improvements', 'editorHeight');
  const r = document.querySelector(':root');
  r.style.setProperty('--ji-editor-height', value + 'px');
}

// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

async function preloadTemplates() {
  const templatePaths = [
    // Add paths to "modules/journal-improvements/templates"
    'modules/journal-improvements/templates/journal-sheet.html',
    'modules/journal-improvements/templates/journal-sheet-text-page.html',
  ];

  return loadTemplates(templatePaths);
}

/* globals JournalTextPageSheet JournalTextTinyMCESheet MarkdownJournalPageSheet JournalEntryPage*/
class ImprovedJournalSheet extends JournalSheet {
  static get defaultOptions() {
    const classes = ['sheet', 'journal-sheet', 'journal-entry', 'journal-improvements'];
    if (game.modules.get('pf2e-dorako-ui')?.active) classes.push('ij-dorako-fix');
    if (game.modules.get('ernies-modern-layout')?.active) {
      classes.push('ij-ernies-fix');
      if (game.settings.get('ernies-modern-layout', 'compactMode')) classes.push('ij-ernies-fix-compact');
    }

    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: classes,
      template: 'modules/journal-improvements/templates/journal-sheet.html',
      submitOnClose: game.settings.get('journal-improvements', 'autosave'),
    });
  }

  static get textPageTemplate() {
    return 'modules/journal-improvements/templates/journal-sheet-text-page.html';
  }

  get _isDefaultEdit() {
    return !game.settings.get('journal-improvements', 'integratedEditor');
  }

  get jiEngine() {
    return game.settings.get('journal-improvements', 'editorEngine') ?? 'tinymce';
  }

  get jiAutosave() {
    return game.settings.get('journal-improvements', 'autosave');
  }

  getData(options) {
    const data = super.getData(options);
    data.hiddenButtons = getHiddenButtons();
    data.moveJournalTitle = game.settings.get('journal-improvements', 'moveJournalTitle');
    return data;
  }

  /**
   * Prepare pages for display.
   * @returns {JournalEntryPage[]}  The sorted list of pages.
   * @protected
   * @override
   */
  _getPageData() {
    const _pageData = super._getPageData();
    // Make pages start from 1 instead of 0 (if pages start from 0)
    if (_pageData[0]?.number === 0) _pageData.forEach((p) => p.number++);
    return _pageData;
  }

  /**
   * Handle clicking the previous and next page buttons.
   * @param {JQuery.TriggeredEvent} event  The button click event.
   * @protected
   */
  _onAction(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const action = button.dataset.action;
    switch (action) {
      case 'quickCreate':
        return this.quickCreatePage(button.dataset.type);
      default:
        return super._onAction(event);
    }
  }

  /**
   * @param {string} type  The type of page to create
   */
  async quickCreatePage(type) {
    await this.document.createQuickPage({ type: type });
    // Render the last page
    await this.renderLastPage();
    // Activate the editor if using the integrated editor and page is text.
    if (!this._isDefaultEdit && type === 'text') this.dispatchEditorEditClick();
  }

  async renderLastPage() {
    const lastPageIndex = this._pages.length - 1;
    return await this.render(false, { pageIndex: lastPageIndex });
  }

  async dispatchEditorEditClick(timeout = 50) {
    // For some reason the render await doesn't wait the rendered page views. TODO: improve here, instead of using timeout
    return setTimeout(() => {
      const editBtn = this.element.find(`a.editor-edit`).last()[0];
      const clickEvent = new Event('click');
      editBtn?.dispatchEvent(clickEvent);
    }, timeout);
  }

  /**
   * Update child views inside the main sheet.
   * @returns {Promise<void>}
   * @protected
   */
  async _renderPageViews() {
    if (this._isDefaultEdit) return super._renderPageViews();

    for (const pageNode of this.element[0].querySelectorAll('.journal-entry-page')) {
      const id = pageNode.dataset.pageId;
      if (!id) continue;
      const sheet = this.getPageSheet(id);
      const data = await sheet.getData();

      /* <- Begin custom code */
      let view, edit;
      const isText = data.data.type === 'text';
      edit = pageNode.querySelector(':scope > .edit-container');

      // If is text page, render the editor in this sheet
      if (isText) {
        data.editable = edit != null;
        data.engine = this.jiEngine;
        // data.enrichedPageContent = await TextEditor.enrichHTML(data.data?.text?.content, { async: true });
        view = await renderTemplate('modules/journal-improvements/templates/journal-sheet-text-page.html', data);
        view = $(view); // to Jquery
        pageNode.replaceChildren(...view.get());
        sheet._activateCoreListeners(view.parent());
        // sheet.activateListeners(view);

        // If the page is editable, activate the editors
        if (data.editable) {
          const editorContent = view.find('.editor-content[data-edit]');
          editorContent.each((i, div) => this._activateEditor(div));
          if (this.jiAutosave) editorContent.on('focusout', (event) => this._onEditorFocusout(event));
        }

        // Build the toc
        // For some reason, pf2e gets duplicated 1st level heading, but other systems don't
        if (game.system.id === 'pf2e') {
          sheet.toc = JournalEntryPage.buildTOC(view.find('.editor-content').get());
        } else {
          sheet.toc = JournalEntryPage.buildTOC(view.get());
        }

        // If is markdown, add custom dropping of links and autosave
        if (data.engine === 'markdown') {
          sheet._onDropContentLink = (eventData) => this._markdownEditor_onDropContentLink(eventData, view);
          if (this.jiAutosave)
            view
              .find('textarea.markdown-editor')
              .on('focusout', (event) => this._saveMarkdownFromEditor($(event.currentTarget).parent(), true));
        }
      }

      // Otherwise, default behavior
      else {
        view = await sheet._renderInner(data);
        pageNode.replaceChildren(...view.get());
        if (edit) pageNode.appendChild(edit);
        sheet._activateCoreListeners(view.parent());
        sheet.activateListeners(view);
      }
      /* -> End custom code */

      await this._renderHeadings(pageNode, sheet.toc);
      for (const cls of sheet.constructor._getInheritanceChain()) {
        Hooks.callAll(`render${cls.name}`, sheet, view, data);
      }
    }
    this._observeHeadings();
  }

  /**
   * Retrieve the sheet instance for rendering this page inline.
   * Custom code to handle Markdown conversion easily, by instancing the page sheet as a MarkdownJournalPageSheet
   * @param {string} pageId  The ID of the page.
   * @returns {JournalPageSheet}
   */
  getPageSheet(pageId) {
    const page = this.object.pages.get(pageId);
    if (this._isDefaultEdit || page.type !== 'text') return super.getPageSheet(pageId);

    const privateSheets = this['#sheets'] ?? {};
    switch (this.jiEngine) {
      case 'prosemirror':
        return (privateSheets[pageId] ??= new JournalTextPageSheet(page, { editable: false }));
      case 'tinymce':
        return (privateSheets[pageId] ??= new JournalTextTinyMCESheet(page, { editable: false }));
      case 'markdown':
        return (privateSheets[pageId] ??= new MarkdownJournalPageSheet(page, { editable: false }));
    }
  }

  /**
   * Turn to a specific page.
   * @param {string} pageId    The ID of the page to turn to.
   * @param {string} [anchor]  Optionally an anchor slug to focus within that page.
   */
  goToPage(pageId, anchor) {
    if (this._isDefaultEdit) return super.goToPage(pageId, anchor);

    if (this.mode === this.constructor.VIEW_MODES.SINGLE) {
      const currentPageId = this._pages[this.pageIndex]?._id;
      if (currentPageId !== pageId) return this.render(true, { pageId, anchor });
    }
    const page = this.element[0].querySelector(`.journal-entry-page[data-page-id="${pageId}"]`);
    if (anchor) {
      // <- CUSTOM CODE START
      const element = this.element[0].querySelector(`.journal-entry-content [data-anchor="${anchor}"]`);
      // -> CUSTOM CODE END
      if (element) {
        element.scrollIntoView();
        return;
      }
    }
    page?.scrollIntoView();
  }

  /**
   * Handles the event when a page edit button is clicked
   * @param event
   * @return {*}
   * @private
   */
  _onEditPage(event) {
    if (this._isDefaultEdit) return super._onEditPage(event);

    // Do the default editpage behavior only if the page is not text
    const ct = $(event.currentTarget);
    const articlePage = ct.closest('article');
    const isText = articlePage.hasClass('text');
    if (!isText) return super._onEditPage(event);

    // Replace the h1 with an input
    const headerH1 = articlePage.find('header h1');
    const pageId = articlePage.data('pageId');
    const pageName = headerH1.text();
    const nameInput = $(`<input type="text" value="${pageName}">`);
    const that = this;
    nameInput.on('change', async function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const newPageName = $(this).val();
      await that.document.updateEmbeddedDocuments('JournalEntryPage', [{ _id: pageId, name: newPageName }], {
        render: false,
      });

      // Change the first level TOC for the page
      that.element.find(`nav.pages-list [data-page-id="${pageId}"] .page-title`)?.text(newPageName);
    });
    headerH1.replaceWith(nameInput);

    // If markdown, toggle between the markdown and the enriched content view, saving the markdown
    if (this.jiEngine === 'markdown') {
      const enrichedContent = articlePage.find('.enriched-content');
      const markdownEditorContent = articlePage.find('.markdown-editor-content');

      // If the md editor is currently displayed, then we can update the data and trigger a render
      if (markdownEditorContent.is(':visible')) {
        this._saveMarkdownFromEditor(markdownEditorContent);
      }

      // Otherwise display the editor and hide the enriched (+ set the height)
      else {
        enrichedContent.hide();
        markdownEditorContent.show();
        this.autosetEditorHeight();
      }
    }
  }

  /**
   * Saves the markdown to the page, converting it to html and triggering a rendering
   * @param markDownEditor
   * @param preventPostUpdateRender
   * @private
   */
  _saveMarkdownFromEditor(markDownEditor, preventPostUpdateRender = false) {
    const mdTextarea = markDownEditor.find('textarea.markdown-editor');
    if (!mdTextarea) throw 'Markdown editor not found';
    const k = mdTextarea.attr('name');
    const md = mdTextarea.val();
    // eslint-disable-next-line no-undef
    const html = JournalTextPageSheet._converter.makeHtml(md);
    const split = k.split('.');
    const pageId = split[1];

    this.document
      .updateEmbeddedDocuments('JournalEntryPage', [{ _id: pageId, 'text.markdown': md, 'text.content': html }], {
        render: false,
      })
      .then(() => {
        if (!preventPostUpdateRender) this.render();
      });
  }

  /**
   * Activate an editor instance present within the form
   * Custom code starts at symbol <-
   * @param {HTMLElement} div  The element which contains the editor
   * @protected
   */
  _activateEditor(div) {
    // Get the editor content div
    const name = div.dataset.edit;
    const engine = div.dataset.engine || 'tinymce';
    const collaborate = div.dataset.collaborate === 'true';
    const button = div.previousElementSibling;
    const hasButton = button && button.classList.contains('editor-edit');
    const wrap = div.parentElement.parentElement;
    const wc = div.closest('.window-content');

    // Determine the preferred editor height
    const heights = [wrap.offsetHeight, wc ? wc.offsetHeight : null];
    if (div.offsetHeight > 0) heights.push(div.offsetHeight);
    const height = Math.min(...heights.filter((h) => Number.isFinite(h)));

    // Get initial content
    const options = {
      target: div,
      fieldName: name,
      save_onsavecallback: () => this.saveEditor(name),
      height,
      engine,
      collaborate,
    };

    if (engine === 'prosemirror') options.plugins = this._configureProseMirrorPlugins(name, { remove: hasButton });

    /**
     * Handle legacy data references.
     * @deprecated since v10
     */
    const isDocument = this.object instanceof foundry.abstract.Document;
    const data = name?.startsWith('data.') && isDocument ? this.object.data : this.object;

    // Define the editor configuration
    const editor = (this.editors[name] = {
      options,
      target: name,
      button: button,
      hasButton: hasButton,
      mce: null,
      instance: null,
      active: !hasButton,
      changed: false,
      initial: foundry.utils.getProperty(data, name),
    });

    // Activate the editor immediately, or upon button click
    const activate = async () => {
      // <- Custom code, everything above is untouched
      if (name.startsWith('pages.')) {
        const split = name.split('.');
        const pageId = split[1];
        const prop = split.slice(2).join('.');
        editor.initial = foundry.utils.getProperty(data.pages.get(pageId), prop);
      } else {
        editor.initial = foundry.utils.getProperty(data, name);
      }
      // -> End custom code
      await this.activateEditor(name, {}, editor.initial);
      this.autosetEditorHeight();
    };
    if (hasButton) button.onclick = activate;
    else activate();
  }

  /**
   * Handle the editor focus out
   * @param {FocusEvent} event
   * @private
   */
  _onEditorFocusout(event) {
    const isInsidePage = event.relatedTarget?.matches('section.journal-entry-content *') ?? false;
    this._onSubmit(event, { preventRender: isInsidePage });
  }

  /**
   * Handles the form update
   * @param event
   * @param formData
   * @return {Promise<undefined|*>}
   * @private
   */
  async _updateObject(event, formData) {
    if (this._isDefaultEdit) return super._updateObject(event, formData);

    // Check for formData with name equals to page ids, collecting the contents for updating
    const pagesUpdateData = [];
    for (const k of Object.keys(formData)) {
      if (!k.startsWith('pages.')) continue;
      const split = k.split('.');
      const pageId = split[1];
      const prop = split.slice(2).join('.');

      pagesUpdateData.push({
        _id: pageId,
        [prop]: formData[k],
      });
      delete formData[k];
    }

    // Update the pages
    if (pagesUpdateData.length > 0) {
      await this.document.updateEmbeddedDocuments('JournalEntryPage', pagesUpdateData, { render: false });
    }

    // const pageIds = this.pages;
    return super._updateObject(event, formData);
  }

  /**
   * Handles the dropping of content links in integrated markdown editors
   * @param eventData
   * @param pageView
   * @return {Promise<void>}
   * @private
   */
  async _markdownEditor_onDropContentLink(eventData, pageView) {
    const link = await TextEditor.getContentLink(eventData, { relativeTo: this.object });
    if (!link) return;
    const editor = pageView.find('textarea.markdown-editor').get(0);
    const content = editor.value;
    editor.value = content.substring(0, editor.selectionStart) + link + content.substring(editor.selectionStart);
  }

  /**
   * Automatically sets the editor height to properly fit the application
   * Currently works only on single view mode
   */
  autosetEditorHeight() {
    const article = this.element.find('article');
    const scrollable = this.element.find('.journal-entry-content .scrollable');
    if (this.mode === this.constructor.VIEW_MODES.SINGLE) {
      const editor = article.find('.editor, textarea.markdown-editor');
      if (!editor?.length) return;
      const scrollableBRect = scrollable.get(0).getBoundingClientRect();
      const editorBRect = editor.get(0).getBoundingClientRect();

      let h = scrollableBRect.height - (editorBRect.top - scrollableBRect.top);
      if (editor.hasClass('markdown-editor')) h -= 8;
      editor.css('min-height', h + 'px');
    }
  }

  setPosition({ left, top, width, height, scale } = {}) {
    super.setPosition({ left, top, width, height, scale });
    this.autosetEditorHeight();
  }
}

function i18n(x) {
  return game.i18n.localize(x);
}

// Thanks to https://github.com/saif-ellafi/foundryvtt-clipboard-image/blob/main/clipboard-image.js#L13
/* globals ForgeVTT */
function getSource() {
  let source = 'data';
  if (typeof ForgeVTT != 'undefined' && ForgeVTT.usingTheForge) {
    source = 'forgevtt';
  }
  return source;
}

async function createFolder(source, folderPath) {
  const progressivePaths = [];
  const split = folderPath.split('/'); // TODO: check if other OS use backslash
  split.forEach((subPath) => {
    const p = (progressivePaths.at(-1) ?? '') + '/' + subPath;
    progressivePaths.push(p);
  });

  for (const path of progressivePaths) {
    try {
      await FilePicker.browse(source, path);
      return;
    } catch (error) {
      await FilePicker.createDirectory(source, path);
    }
  }
}

/**
 * Uploads a blob (image) to local storage
 * @param {Blob} blob
 * @returns {string} the path to the image
 */
async function jiUploadImageBlob(blob) {
  // Determine extension
  const mime = blob.type;
  const extension = mime.replace('image/', '');

  // Name
  const name = new Date().toISOString().slice(0, 19).replace(/:/g, '');
  const filename = `${name}.${extension}`;

  // Source and folder
  const source = getSource();
  const folderPath = game.settings.get('journal-improvements', 'uploadFolder');
  await createFolder(source, folderPath);

  // Create file
  const file = new File([blob], filename, { type: blob.type });

  // Upload and manage response
  const createResponse = await FilePicker.upload(source, folderPath, file);
  if (createResponse.status !== 'success') return; // TODO: better error
  return createResponse.path;
}

/* globals JournalEntryPage */

class ImprovedJournalEntry extends JournalEntry {
  /**
   * @override
   * @param data
   * @param options
   * @param userId
   * @private
   */
  _onCreate(data, options, userId) {
    super._onCreate(data, options, userId);

    // After creating, add a text page with the same name
    // TODO: check if we need to handle packs and folders. See JournalEntryPage.implementation.createDialog

    if (game.settings.get('journal-improvements', 'createDefaultPage')) {
      const options = { renderSheet: false };
      const newPage = this.createQuickPage({ name: this.name, options });
      // Refresh apps after creating the page
      newPage.then(() => Object.values(this.apps).forEach((app) => app.render()));
    }
  }

  /**
   * Creates a page in the journal
   * @param name page name
   * @param type page type
   * @param data other object creation data
   * @param options creation options
   * @private
   */
  createQuickPage({ name = undefined, type = 'text', data = {}, options = {} }) {
    if (name == null) name ??= i18n(`journalImprovements.defaultPageNames.${type}`);
    options.parent ??= this;
    options.renderSheet ??= !(
      game.settings.get('journal-improvements', 'createSilent') ||
      game.settings.get('journal-improvements', 'integratedEditor')
    );
    data = mergeObject(data, { name, type });
    const lastSort = this.pages.reduce((acc, page) => Math.max(acc, page.sort), 0);
    data.sort ??= (lastSort ?? 0) + CONST.SORT_INTEGER_DENSITY;
    return JournalEntryPage.create(data, options);
  }
}

async function _onPaste(plain) {
  console.log(`journal-improvements | _onPaste called with plain = ${plain}`);

  // Check if we are pasting in the journal
  const activeApp = ui.activeWindow;
  if (!(activeApp instanceof ImprovedJournalSheet) || !activeApp.rendered) return;
  const journal = activeApp.document;
  console.log('journal-improvements | pasting in journal');

  // Try to get the clipboard contents
  const clipboardItems = await _getClipboardItems();
  if (!clipboardItems) return;

  // Definitions
  const type = plain ? 'text/plain' : 'text/html';
  const getImgType = (ci) => ci.types.find((t) => t.includes('image'));
  const pasteToPageImage = game.settings.get('journal-improvements', 'pasteToPageImage');
  const parser = new DOMParser();

  for (const ci of clipboardItems) {
    // If the item is not an image, create a journal page with the text or html data
    const imgType = getImgType(ci);
    if (!imgType) {
      const text = await (await ci.getType(type)).text();
      if (!text) continue;
      await journal.createQuickPage({ type: 'text', data: { 'text.content': text } });
      continue;
    }

    // Otherwise, two behaviors, depending on if the image has html or not and if the setting is enabled
    let htmlText;
    if (ci.types.includes('text/html')) htmlText = await (await ci.getType('text/html'))?.text();

    // If no html, image should be uploaded, setting the html text for further processing
    if (!htmlText) {
      const imgBlob = await ci.getType(imgType);
      const src = await jiUploadImageBlob(imgBlob);
      if (!src) throw 'Image Upload failed';
      htmlText = `<img src="${src}">`;
    }

    // If the setting is on, create a new image page with the image's src, otherwise paste the image html in a text page
    if (pasteToPageImage) {
      const parsed = parser.parseFromString(htmlText, 'text/html');
      const imgElement = parsed.querySelector('img');
      const src = imgElement?.src;
      await journal.createQuickPage({ type: 'image', data: { src: src } });
    } else {
      await journal.createQuickPage({ type: 'text', data: { 'text.content': htmlText } });
    }
  }

  await activeApp.renderLastPage();
}

/**
 * Parse the clipboard
 * @return {Promise<ClipboardItem[]>}
 * @private
 */
async function _getClipboardItems() {
  let clipboard;
  try {
    clipboard = await navigator.clipboard.read();
  } catch (error) {
    if (!error) {
      console.warn(i18n('journalImprovements.notifications.warnPastePermission'));
    } else if (error instanceof DOMException) {
      console.log('journal-improvements: Clipboard is empty');
    } else throw error;
  }
  return clipboard;
}

// Initialize module
Hooks.once('init', async () => {
  console.log('journal-improvements | Initializing journal-improvements');

  CONFIG.JournalEntry.documentClass = ImprovedJournalEntry;
  Journal.registerSheet('journal-improvements', ImprovedJournalSheet, {
    makeDefault: true,
    label: i18n('journalImprovements.sheetName'),
  });

  game.keybindings.register('journal-improvements', 'paste', {
    name: 'journalImprovements.keybindings.paste',
    restricted: true,
    editable: [{ key: 'KeyV', modifiers: [KeyboardManager.MODIFIER_KEYS.CONTROL] }],
    onDown: () => _onPaste(false),
    precedence: CONST.KEYBINDING_PRECEDENCE.DEFERRED,
  });

  game.keybindings.register('journal-improvements', 'pastePlain', {
    name: 'journalImprovements.keybindings.pastePlain',
    restricted: true,
    editable: [
      { key: 'KeyV', modifiers: [KeyboardManager.MODIFIER_KEYS.CONTROL, KeyboardManager.MODIFIER_KEYS.SHIFT] },
    ],
    onDown: () => _onPaste(true),
    precedence: CONST.KEYBINDING_PRECEDENCE.DEFERRED,
  });

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();
});

Hooks.once('setup', async () => {});

Hooks.once('ready', async () => {
  setEditorHeight();
});

Hooks.on('renderNoteConfig', async (app, element, data) => {
  // TODO: fix commented lines
  // if (app.document.getFlag('journal-improvements', 'configured')) return;
  renderNoteConfig(app, element);
  // app.document.setFlag('journal-improvements', 'configured', true);
});

function renderNoteConfig(app, element, _data) {
  if (!game.settings.get('journal-improvements', 'pinIcons')) return;
  const fd = new FormDataExtended(app.form);

  const iconSelected = fd.object['icon.selected'];
  const isDefaultIcon = iconSelected == null || iconSelected === 'icons/svg/book.svg';
  if (!isDefaultIcon) return;

  const entryId = fd.object.entryId;
  const pageId = fd.object.pageId;
  if (!entryId || !pageId) return;

  const page = game.journal.get(entryId)?.pages?.get(pageId);
  if (!page) return;

  const improvedIcon = getNoteIcon(page.type);
  if (!improvedIcon) return;

  const imgSelector = element.find('select[name="icon.selected"]');
  const customImgInput = element.find('input[name="icon.custom"]');
  imgSelector.val('');
  customImgInput.val(improvedIcon);
  customImgInput.prop('disabled', false);
}
//# sourceMappingURL=journal-improvements.js.map
