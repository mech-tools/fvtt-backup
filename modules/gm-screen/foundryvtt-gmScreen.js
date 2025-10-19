const d = "gm-screen", u = "GMSCR", S = {
  settings: `modules/${d}/templates/settings.hbs`,
  screen: `modules/${d}/templates/screen.hbs`,
  screenContent: `modules/${d}/templates/parts/screen-content.hbs`,
  screenTabs: `modules/${d}/templates/parts/screen-tabs.hbs`,
  screenCell: `modules/${d}/templates/parts/screen-cell.hbs`,
  screenGrid: `modules/${d}/templates/parts/screen-grid.hbs`,
  grids: {
    tableRow: `modules/${d}/templates/parts/settings-grid-config-table-row.hbs`
  }
}, E = "gmScreen-primary";
var c = /* @__PURE__ */ ((l) => (l.columns = "columns", l.displayDrawer = "display-as-drawer", l.drawerHeight = "drawer-height", l.drawerOpacity = "drawer-opacity", l.drawerWidth = "drawer-width", l.gmScreenConfig = "gm-screen-config", l.migrated = "migrated", l.condensedButton = "condensedButton", l.reset = "reset", l.rightMargin = "right-margin", l.rows = "rows", l))(c || {}), R = /* @__PURE__ */ ((l) => (l.openCloseScreen = "openCloseScreen", l.changeTab = "changeTab", l))(R || {});
const k = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?/, z = ["DeltaGreenActor", "DeltaGreenItem"];
function a() {
  if (!(game instanceof foundry.Game))
    throw new Error("game is not initialized yet!");
  return game;
}
function y() {
  const { i18n: l } = a();
  return l || {
    localize: (e) => e
  };
}
function g(l, ...e) {
  (l || a().modules.get("_dev-mode")?.api?.getPackageDebugValue(d)) && console.log(d, "|", ...e);
}
function L(l, e) {
  return new Promise((t, r) => {
    new foundry.applications.api.DialogV2({
      window: { title: y().localize(`${u}.cellConfigDialog.CellConfig`) },
      modal: !0,
      content: `
    <div class="form-group">
      <label for="spanRows">${y().localize(`${u}.cellConfigDialog.RowSpan`)}</label>
      <input type="number" step="1" name="spanRows" id="spanRows" min="1" max="${e.rows + 1 - l.y}" value="${l.spanRows || 1}">
    </div>
    <div class="form-group">
      <label for="spanCols">${y().localize(`${u}.cellConfigDialog.ColSpan`)}</label>
      <input type="number" step="1" name="spanCols" id="spanCols" min="1" max="${e.columns + 1 - l.x}" value="${l.spanCols || 1}">
    </div>  
`,
      buttons: [
        {
          action: "no",
          icon: "fas fa-times",
          label: y().localize("Cancel"),
          callback: () => {
            r();
          }
        },
        {
          action: "reset",
          icon: "fas fa-undo",
          label: y().localize("Default"),
          callback: () => {
            const i = {
              newSpanRows: 1,
              newSpanCols: 1
            };
            g(!1, "dialog formValues", i), t(i);
          }
        },
        {
          action: "yes",
          icon: "fas fa-check",
          label: y().localize("Submit"),
          default: !0,
          callback: (i, n, s) => {
            const o = $(s.element), h = {
              newSpanRows: Number(o.find('[name="spanRows"]').val()),
              newSpanCols: Number(o.find('[name="spanCols"]').val())
            };
            g(!1, "dialog formValues", h), t(h);
          }
        }
      ]
    }).render({ force: !0 });
  });
}
function I(l) {
  const e = l.parents(".gm-screen-grid")[0], t = window.getComputedStyle(e);
  g(!1, "getGridElementsPosition", {
    element: l,
    relevantGridElement: e,
    vanillaGridElementStyles: t,
    gap: t.gap,
    // wtf this is '' in firefox
    gridRowGap: t["grid-row-gap"],
    gridColGap: t["grid-column-gap"]
  });
  const r = Number(t["grid-row-gap"].match(k)[0]), i = t["grid-template-columns"].split(" "), n = Number(i[0].match(k)[0]), s = t["grid-template-rows"].split(" "), o = Number(s[0].match(k)[0]), h = l[0].getBoundingClientRect(), p = e.getBoundingClientRect(), m = Math.floor((h.left - (p.left - r)) / (n + r)) + 1, f = Math.floor((h.top - (p.top - r)) / (o + r)) + 1;
  return g(!1, "getGridElementsPosition", {
    setup: {
      gap: r,
      cols: i,
      rows: s,
      elementBounds: h,
      gridBounds: p,
      colWidth: n,
      rowHeight: o
    },
    results: {
      elementColumn: m,
      elementRow: f
    }
  }), { y: f, x: m };
}
function N(l) {
  return a().user?.isGM ? l.grids : Object.keys(l.grids).reduce((t, r) => (l.grids[r].isShared && (t[r] = l.grids[r]), t), {});
}
function B(l, e, t, r) {
  l.find(e).each((i, n) => {
    const s = window.getComputedStyle(n)[t];
    n.style.setProperty(r, String(s));
  });
}
function U(l) {
  return async function() {
    this.cellId = l, $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const t = $(this.cellId).find(".gm-screen-grid-cell-content");
    t.removeClass().addClass(["gm-screen-grid-cell-content"]), t.html(this.form), t.find(".window-header").css("visibility", "hidden");
  };
}
function x() {
  return this;
}
function _(l) {
  return z.includes(l);
}
async function M() {
  if (!a().user?.isGM) return;
  const l = "2.0.1", e = a().settings.get(d, c.migrated);
  if (e.status && (foundry.utils.isNewerVersion(a().modules.get(d)?.version ?? "0", l) || e.version === l))
    return;
  ui.notifications?.notify("GM Screen | Beginning Migration to updated schema.", "info");
  const t = a().settings.get(d, c.gmScreenConfig);
  if (t?.grid?.entries && Array.isArray(t.grid.entries)) {
    const r = t.grid.entries.reduce((n, s) => {
      const o = `${s.x}-${s.y}`;
      return n[o] = {
        ...s,
        entryId: o
      }, n;
    }, {}), i = {
      activeGridId: "default",
      grids: {
        default: {
          ...t.grid,
          entries: r,
          id: "default",
          name: "Main",
          isShared: !1,
          cssClass: "active"
        }
      }
    };
    g(!0, "migration output", {
      output: i
    }), await a().settings.set(d, c.gmScreenConfig, i);
  }
  ui.notifications?.notify("GM Screen | Migration Complete.", "info"), await a().settings.set(d, c.migrated, { status: !0, version: l });
}
const A = {
  activeGridId: "default",
  grids: {
    default: {
      name: "Main",
      id: "default",
      isShared: !1,
      entries: {},
      cssClass: "active"
    }
  }
};
class D extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  draggedRow;
  static init() {
    a().settings.registerMenu(d, "menu", {
      name: `${u}.settings.${c.gmScreenConfig}.Name`,
      label: `${u}.settings.${c.gmScreenConfig}.Label`,
      icon: "fas fa-table",
      type: D,
      restricted: !0,
      hint: `${u}.settings.${c.gmScreenConfig}.Hint`
    }), a().settings.register(d, c.gmScreenConfig, {
      default: A,
      scope: "world",
      config: !1,
      onChange(...e) {
        g(!1, "gmScreenConfig changed", {
          args: e,
          currentConfig: { ...a().settings.get(d, c.gmScreenConfig) }
        }), a().modules.get(d)?.api?.refreshGmScreen();
      }
    }), a().settings.register(d, c.migrated, {
      config: !1,
      default: { status: !1, version: "1.2.2" },
      scope: "world",
      type: Object
    }), a().settings.register(d, c.columns, {
      name: `${u}.settings.${c.columns}.Name`,
      default: 4,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${u}.settings.${c.columns}.Hint`
    }), a().settings.register(d, c.rows, {
      name: `${u}.settings.${c.rows}.Name`,
      default: 3,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${u}.settings.${c.rows}.Hint`
    }), a().settings.register(d, c.displayDrawer, {
      name: `${u}.settings.${c.displayDrawer}.Name`,
      default: !0,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${u}.settings.${c.displayDrawer}.Hint`,
      onChange: () => window.location.reload()
    }), a().settings.register(d, c.rightMargin, {
      name: `${u}.settings.${c.rightMargin}.Name`,
      default: 0,
      type: Number,
      scope: "client",
      range: { min: 0, max: 75, step: 5 },
      config: !0,
      hint: `${u}.settings.${c.rightMargin}.Hint`
    }), a().settings.register(d, c.drawerWidth, {
      name: `${u}.settings.${c.drawerWidth}.Name`,
      default: 100,
      type: Number,
      scope: "client",
      range: { min: 25, max: 100, step: 1 },
      config: !0,
      hint: `${u}.settings.${c.drawerWidth}.Hint`
    }), a().settings.register(d, c.drawerHeight, {
      name: `${u}.settings.${c.drawerHeight}.Name`,
      default: 60,
      type: Number,
      scope: "client",
      range: { min: 10, max: 90, step: 1 },
      config: !0,
      hint: `${u}.settings.${c.drawerHeight}.Hint`
    }), a().settings.register(d, c.drawerOpacity, {
      name: `${u}.settings.${c.drawerOpacity}.Name`,
      default: 1,
      type: Number,
      scope: "client",
      range: { min: 0.1, max: 1, step: 0.05 },
      config: !0,
      hint: `${u}.settings.${c.drawerOpacity}.Hint`
    }), a().settings.register(d, c.condensedButton, {
      name: `${u}.settings.${c.condensedButton}.Name`,
      default: !1,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${u}.settings.${c.condensedButton}.Hint`
    }), a().settings.register(d, c.reset, {
      name: `${u}.settings.${c.reset}.Name`,
      default: !1,
      type: Boolean,
      scope: "world",
      config: !0,
      hint: `${u}.settings.${c.reset}.Hint`,
      onChange: (e) => {
        e && a().settings.set(d, c.gmScreenConfig, A);
      }
    }), a().keybindings?.register(d, R.openCloseScreen, {
      name: y().localize(`${u}.keybindings.openCloseScreen`),
      editable: [
        {
          key: "KeyO"
        }
      ],
      onDown: () => {
        a().modules.get(d)?.api?.toggleGmScreenVisibility();
      },
      onUp: () => {
      },
      restricted: !1,
      precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    }), a().keybindings?.register(d, R.changeTab, {
      name: y().localize(`${u}.keybindings.changeTab`),
      editable: [
        {
          key: "KeyP"
        }
      ],
      onDown: () => {
        a().modules.get(d)?.api?.switchTab();
      },
      onUp: () => {
      },
      restricted: !1,
      precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
  }
  static PARTS = {
    content: {
      template: S.settings
    }
  };
  static DEFAULT_OPTIONS = {
    id: "gm-screen-tabs-config",
    classes: ["gm-screen-config"],
    height: "auto",
    width: 600,
    tag: "form",
    form: {
      handler: D.#e,
      submitOnClose: !1,
      submitOnChange: !1,
      closeOnSubmit: !0
    }
  };
  get title() {
    return y().localize(`${u}.gridConfig.GridConfig`);
  }
  get rows() {
    return a().settings.get(d, c.rows);
  }
  get columns() {
    return a().settings.get(d, c.columns);
  }
  get settingsData() {
    const e = a().settings.get(d, c.gmScreenConfig);
    return g(!1, "getSettingsData", {
      gmScreenConfig: e
    }), {
      grids: e.grids
    };
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), r = foundry.utils.mergeObject(t, {
      settings: this.settingsData,
      defaultRows: this.rows,
      defaultColumns: this.columns
    });
    return g(!1, r), r;
  }
  _dragStartTab(e) {
    e.target instanceof HTMLElement && (this.draggedRow = e.target);
  }
  _dragOverTab(e) {
    if (!this.draggedRow || !(e.target instanceof HTMLElement))
      return;
    const t = $(e.target).parents("tbody tr")[0];
    if (!t)
      return;
    const r = Array.from($(e.target).parents("tbody").children());
    r.indexOf(t) > r.indexOf(this.draggedRow) ? t.after(this.draggedRow) : t.before(this.draggedRow);
  }
  async _dragEndTab() {
    this.draggedRow = void 0;
  }
  async _onRender() {
    const e = $(this.element);
    g(!1, "activateListeners", {
      html: e
    });
    const t = async (n) => {
      g(!1, "add row clicked", {
        data: n.data()
      });
      const { table: s } = n.data(), o = $(e).find("tbody"), h = {
        gridId: foundry.utils.randomID(),
        grid: {
          name: "",
          columnOverride: "",
          rowOverride: ""
        },
        defaultColumns: this.columns,
        defaultRows: this.rows
      }, p = $(
        await foundry.applications.handlebars.renderTemplate(S[s].tableRow, h)
      );
      o.append(p), this.setPosition({});
    }, r = (n) => {
      g(!1, "delete row clicked", {
        currentTarget: n
      }), n.parentsUntil("tbody").remove(), this.setPosition({});
    };
    new foundry.applications.ux.DragDrop({
      dragSelector: "tbody tr",
      dropSelector: "tbody tr",
      permissions: { dragstart: () => !!a().user?.isGM, drop: () => !!a().user?.isGM },
      callbacks: {
        dragstart: this._dragStartTab.bind(this),
        dragover: this._dragOverTab.bind(this),
        dragend: this._dragEndTab.bind(this)
      }
    }).bind(this.element), e.on("click", (n) => {
      const s = $(n.target).closest("button")[0];
      if (!s)
        return;
      const o = $(s);
      g(!1, "a button was clicked", { e: n, currentTarget: s }), o.hasClass("add-row") && t(o), o.hasClass("delete-row") && r(o);
    });
  }
  // grids: {
  //   default: {
  //     name: 'Main',
  //     id: 'default',
  //     entries: {},
  //   },
  // },
  static async #e(e, t, r) {
    const i = a().settings.get(d, c.gmScreenConfig), n = foundry.utils.expandObject(r.object);
    if (g(!1, {
      formData: r,
      data: n
    }), Object.keys(n).length === 0)
      throw ui.notifications?.error(y().localize(`${u}.gridConfig.errors.empty`)), new Error("Cannot save the grid with no tabs.");
    const s = Object.keys(n.grids), o = s.reduce((m, f) => {
      const C = n.grids[f];
      return Object.hasOwn(i.grids, f) ? (m[f] = {
        ...i.grids[f],
        ...C
      }, m) : (m[f] = {
        ...C,
        entries: {},
        name: C.name ?? "",
        isShared: C.isShared ?? !1,
        id: f
      }, m);
    }, {}), h = s.includes(i.activeGridId) ? i.activeGridId : s[0], p = {
      ...i,
      grids: o,
      activeGridId: h
    };
    g(!0, "setting settings", {
      newGmScreenConfig: p
    }), await a().settings.set(d, c.gmScreenConfig, p), a().modules.get("gm-screen")?.api?.refreshGmScreen();
  }
}
class J extends foundry.applications.sheets.RollTableSheet {
  cellId;
  constructor(e) {
    super(e), g(!1, "CompactRollTableDisplay constructor", {
      options: e
    }), this.cellId = e.cellId;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(e, t, r) {
    if (super._replaceHTML(e, t, r), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const i = $(this.cellId).find(".gm-screen-grid-cell-content");
    i.html(this.form), i.find(".window-header").remove(), this.setPosition({
      width: "auto",
      height: "auto",
      left: 0,
      top: 0
    });
  }
  /** @override */
  get id() {
    return `gmscreen-rolltable-${this.document.id}`;
  }
  async close(...e) {
    return e.length === 0 ? super.close(...e) : this;
  }
}
class F extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet {
  cellId;
  constructor(e) {
    super(e), this.cellId = e.cellId;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(e, t, r) {
    if (super._replaceHTML(e, t, r), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.options.document.name);
    const i = $(this.cellId).find(".gm-screen-grid-cell-content");
    switch (this.options.document.type) {
      case "image":
        i.html(
          `<img src="${this.options.document.src}" alt="${this.options.document.image.caption || "image"}"></img>`
        );
        break;
      case "pdf":
        i.html(
          `<iframe src="scripts/pdfjs/web/viewer.html?file=/${this.options.document.src}"></iframe>`
        );
        break;
      case "video":
        i.html(
          `<video src="${this.options.document.src}" ${this.options.document.video.controls ? "controls" : ""} ${this.options.document.video.autoplay ? "autoplay" : ""}></video>`
        );
        break;
      default:
        this.options.document.text.content && i.html(this.options.document.text.content);
    }
    $(this.form).hide();
  }
  /** @override */
  get id() {
    return `gmscreen-journal-page-${this.document.id}`;
  }
  async close(...e) {
    return e.length === 0 ? super.close(...e) : this;
  }
}
class W extends foundry.applications.sheets.journal.JournalEntrySheet {
  cellId;
  constructor(e) {
    super(e), this.cellId = e.cellId, this.options.position.width = "auto", this.options.position.height = "auto";
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(e, t, r) {
    if (super._replaceHTML(e, t, r), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const i = $(this.cellId).find(".gm-screen-grid-cell-content");
    i.html(this.form), i.find(".window-header").remove(), this.setPosition({
      width: "auto",
      height: "auto",
      left: 0,
      top: 0
    });
  }
  /** @override */
  get id() {
    return `gmscreen-journal-${this.document.id}`;
  }
  async close(...e) {
    return e.length === 0 ? super.close(...e) : this;
  }
}
class O extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  expanded;
  data;
  apps;
  // used to allow players to switch tabs
  currentTab;
  draggedTab;
  constructor(e = {}) {
    super(e), this.expanded = !1, this.data = a().settings.get(d, c.gmScreenConfig), this.apps = {}, this.currentTab = this.data.activeGridId;
    const t = a().settings.get(d, c.columns), r = a().settings.get(d, c.rows), i = a().settings.get(d, c.displayDrawer), n = {
      window: {
        ...this.options.window,
        resizable: !1,
        frame: !1
      }
    }, s = [
      {
        action: "clearGrid",
        label: y().localize(`${u}.gmScreen.Reset`),
        class: "clear",
        icon: "fas fa-ban",
        onClick: () => this.handleClear.bind(this)()
      }
    ], o = {
      classes: ["window-app", "gm-screen-popOut"],
      width: Number(t) * 400,
      height: Number(r) * 300,
      window: {
        ...this.options.window,
        resizable: !0,
        frame: !0,
        controls: [
          {
            action: "refresh",
            label: y().localize(`${u}.gmScreen.Refresh`),
            class: "refresh",
            icon: "fas fa-sync",
            onClick: () => this.refresh()
          },
          ...a().user?.isGM ? s : []
        ]
      }
    };
    g(!1, {
      displayDrawer: i,
      options: i ? n : o
    }), this.options = {
      ...this.options,
      ...i ? n : o
    };
  }
  static PARTS = {
    tabs: {
      template: S.screenTabs
    },
    content: {
      template: S.screenContent
    }
  };
  static DEFAULT_OPTIONS = {
    id: "gm-screen-app"
  };
  get rows() {
    return a().settings.get(d, c.rows);
  }
  get columns() {
    return a().settings.get(d, c.columns);
  }
  get displayDrawer() {
    return a().settings.get(d, c.displayDrawer);
  }
  get userViewableGrids() {
    return N(this.data);
  }
  get hasUserViewableGrids() {
    return !!Object.keys(this.userViewableGrids).length;
  }
  get title() {
    return this.displayDrawer ? "" : y().localize(`${u}.gmScreen.Title`);
  }
  get activeGrid() {
    return this.data.grids[this.data.activeGridId];
  }
  static getNumOccupiedCells(e) {
    return Object.values(e.entries).reduce((t, r) => {
      const i = (r.spanCols || 1) * (r.spanRows || 1);
      return t + i;
    }, 0);
  }
  /**
   * Helper function to update the gmScreenConfig setting with a new grid's worth of data
   * @param {GmScreenGrid} newGridData - the complete grid object to set
   */
  async setGridData(e) {
    const t = foundry.utils.deepClone(this.data);
    if (!foundry.utils.setProperty(t, `grids.${e.id}`, e)) {
      g(!0, "error occurred trying to set a grid data");
      return;
    }
    await a().settings.set(d, c.gmScreenConfig, t);
  }
  /**
   * Adds an Entry to the proper place on the active grid's data.
   * Replaces an existing entry if the entryId matches
   * @param {GmScreenGridEntry} newEntry The Entry being added.
   */
  async addEntryToActiveGrid(e) {
    const t = { ...this.activeGrid.entries };
    t[e.entryId] = {
      ...t[e.entryId],
      ...e
    };
    const r = {
      ...this.activeGrid,
      entries: t
    };
    g(!1, "addEntryToActiveGrid", {
      activeGridData: this.activeGrid,
      newEntries: t,
      newEntry: e,
      newGridData: r
    }), this.setGridData(r);
  }
  /**
   * Remove a given entry from the Active Grid
   * @param {string} entryId - entry to remove from the active grid's entries
   */
  async removeEntryFromActiveGrid(e, t) {
    const r = foundry.utils.deepClone(this.activeGrid.entries[e]), i = r.spanCols || r.spanRows, n = {
      ...this.activeGrid.entries
    };
    if (i ? (delete r.entityUuid, delete r.type, delete r.isDndNpc, delete r.isDndNpcStatBlock, n[e] = r) : delete n[e], t) {
      const o = `#${t}`;
      await this.apps[o]?.close(), delete this.apps[o];
    }
    const s = {
      ...this.activeGrid,
      entries: n
    };
    this.setGridData(s);
  }
  bringToFront() {
    if (!this.displayDrawer) {
      super.bringToFront();
      return;
    }
    this.position.zIndex !== foundry.applications.api.ApplicationV2._maxZ && (foundry.applications.api.ApplicationV2._maxZ += 1, this.setPosition({
      zIndex: foundry.applications.api.ApplicationV2._maxZ
    }));
  }
  /**
   * Set the GM Screen Visibility. By default will toggle the current state.
   * @param {boolean} expanded
   */
  toggleGmScreenVisibility(e = !this.expanded) {
    this.expanded = e, this.expanded ? (this.bringToFront(), $(".gm-screen-app").addClass("expanded"), $(".gm-screen-app").css("z-index", this.position.zIndex)) : $(".gm-screen-app").removeClass("expanded");
  }
  /**
   * Double confirms Clearing the Active Grid
   */
  async handleClear() {
    g(!1, "handleClear"), await foundry.applications.api.DialogV2.confirm({
      title: y().localize(`${u}.warnings.clearConfirm.Title`),
      content: y().localize(`${u}.warnings.clearConfirm.Content`)
    }) && (this.apps = {}, this.setGridData({
      ...this.activeGrid,
      entries: {}
    }));
  }
  _dragStartTab(e) {
    e.target instanceof HTMLElement && (this.draggedTab = e.target);
  }
  _dragOverTab(e) {
    if (!this.draggedTab || !(e.target instanceof HTMLElement))
      return;
    const t = Array.from($(e.target).closest(".gm-screen-tabs").children());
    t.indexOf(e.target) > t.indexOf(this.draggedTab) ? e.target.after(this.draggedTab) : e.target.before(this.draggedTab);
  }
  async _dragEndTab(e) {
    if (!this.draggedTab || !(e.target instanceof HTMLElement))
      return;
    const t = foundry.utils.deepClone(this.data);
    t.grids = {}, $(e.target).closest(".gm-screen-tabs").children().each((r, i) => {
      const n = $(i).attr("data-tab");
      n && (t.grids[n] = this.data.grids[n]);
    }), this.draggedTab = void 0, await a().settings.set(d, c.gmScreenConfig, t);
  }
  async handleClickEvent(e) {
    e.preventDefault();
    const t = e.currentTarget.dataset.action, r = $(e.currentTarget).parents("[data-entity-uuid]")?.data()?.entityUuid, i = $(e.currentTarget).parents("[data-entry-id]")?.data()?.entryId, n = $(e.currentTarget).parents("[data-entry-id]")?.attr("id");
    switch (g(!1, "handleClickEvent", {
      e,
      action: t
    }), t) {
      case "clearCell": {
        if (!i)
          return;
        this.removeEntryFromActiveGrid(i, n);
        break;
      }
      case "clearGrid": {
        this.handleClear();
        break;
      }
      case "configureCell": {
        try {
          const { x: s, y: o } = I($(e.target).parent()), h = this.activeGrid.entries[i] || {
            x: s,
            y: o,
            entryId: `${s}-${o}`
          };
          g(!1, "configureCell cellToConfigure", h);
          const { newSpanRows: p, newSpanCols: m } = await L(h, {
            rows: this.rows,
            columns: this.columns
          });
          g(!1, "new span values from dialog", {
            newSpanRows: p,
            newSpanCols: m
          });
          const f = {
            ...h,
            spanRows: p,
            spanCols: m
          }, C = {
            ...this.activeGrid.entries,
            [f.entryId]: f
          }, w = [...Array(f.spanCols).keys()].map((v, T) => {
            const H = f.x + T;
            return [...Array(f.spanRows).keys()].map((q, P) => {
              const V = f.y + P;
              return `${H}-${V}`;
            });
          }).flat();
          g(!1, {
            problemCoordinates: w
          }), Object.values(C).forEach((v) => {
            w.includes(v.entryId) && v.entryId !== f.entryId && delete C[v.entryId];
          }), g(!1, "newEntries", C);
          const G = {
            ...this.activeGrid,
            entries: C
          };
          this.setGridData(G);
        } catch (s) {
          g(!1, "User exited configure cell Dialog.", s);
        }
        break;
      }
      case "open": {
        if (!r)
          return;
        try {
          const s = await this.getRelevantGmScreenDocument(r), o = s?.sheet;
          if (g(!1, "trying to edit entity", { relevantEntitySheet: o }), !o)
            return;
          if (o.rendered) {
            o.maximize(), o.bringToTop();
            return;
          }
          if (s instanceof JournalEntryPage && s.type === "image") {
            new foundry.applications.apps.ImagePopout({
              src: o.options.document.src,
              uuid: r,
              window: { title: s.name }
            }).render({ force: !0 });
            return;
          }
          o.render(!0);
        } catch (s) {
          g(!0, "error opening entity sheet", s);
        }
        break;
      }
      case "refresh": {
        this.refresh();
        break;
      }
      case "tab": {
        const s = e.currentTarget.dataset.tab;
        if (this.currentTab = s ?? this.currentTab, !a().user?.isGM || s === this.data.activeGridId || !s)
          return;
        g(!1, "trying to set active grid", { newActiveGridId: s });
        try {
          const o = {
            ...this.data,
            activeGridId: s
          };
          await a().settings.set(d, c.gmScreenConfig, o);
        } catch (o) {
          g(!0, "error setting active tab", o);
        }
        break;
      }
      case "toggle-gm-screen": {
        try {
          this.toggleGmScreenVisibility();
        } catch (s) {
          g(!0, "error toggling GM Screen", s);
        }
        break;
      }
      case "statBlock": {
        if (!n)
          return;
        const s = {
          ...this.activeGrid.entries
        };
        s[i].isDndNpcStatBlock = !s[i].isDndNpcStatBlock;
        const o = {
          ...this.activeGrid,
          entries: s
        };
        await this.setGridData(o);
        break;
      }
    }
  }
  async switchTab() {
    const e = Object.keys(this.userViewableGrids);
    if (e.length <= 1)
      return;
    const t = a().user?.isGM, i = (e.indexOf(t ? this.data.activeGridId : this.currentTab) + 1) % e.length, n = e[i];
    g(!1, "trying to set active grid", { newActiveGridId: n });
    try {
      if (this.changeTab(n, E), this.currentTab = n, !t)
        return;
      const s = {
        ...this.data,
        activeGridId: n
      };
      await a().settings.set(d, c.gmScreenConfig, s);
    } catch (s) {
      g(!0, "error setting active tab", s);
    }
  }
  updateClassesAndFixButtons() {
    const e = $("#gm-screen-app");
    this.displayDrawer || (e.addClass("application"), e.find(".window-content").prepend(e.find(".window-header")));
  }
  async _renderFrame(e) {
    if (!this.displayDrawer)
      return super._renderFrame(e);
    const t = $(
      await foundry.applications.handlebars.renderTemplate(S.screen, await this._prepareContext(this.options))
    ).get(0);
    if (!t)
      throw new Error("Failed to render GmScreenApplication frame template");
    return t;
  }
  /**
   * @override
   */
  render(...e) {
    return !this.hasUserViewableGrids && this.rendered && this.close(), super.render(...e);
  }
  /**
   * This currently thinly wraps `this.render`, but might be more complicated in the future.
   */
  async refresh() {
    const e = a().settings.get(d, c.gmScreenConfig), t = foundry.utils.deepClone(this.data), r = foundry.utils.diffObject(t, e);
    if (g(!1, "refreshing gm screen", {
      newData: foundry.utils.deepClone(e),
      data: t,
      diffData: r
    }), this.data = e, Object.keys(r).length) {
      if (Object.keys(r).every((m) => m === "activeGridId") || Object.values(r.grids || {}).every((m) => Object.keys(m).every((f) => f === "cssClass"))) {
        g(!1, "not rerendering because only activeGridId changed or cssClass changed");
        return;
      }
      const i = Object.keys(r?.grids ?? {}), n = Object.keys(this.userViewableGrids), s = Object.keys(N(t)), o = !i.filter((m) => n.includes(m)).length, h = n.length === s.length && n.every((m) => s.includes(m)), p = o && h;
      if (g(!1, "gridIdChecks", {
        diffGridIds: i,
        myOldGridIds: s,
        myNewGridIds: n,
        diffOverlapsNewGridIds: o,
        oldAndNewGridIdsAreEqual: h,
        shouldNotRerender: p
      }), p) {
        g(!1, "not rerendering because none of my visible grids changed");
        return;
      }
    }
    this.displayDrawer || await this.close(), this.render(!0);
  }
  async _onRender() {
    new foundry.applications.ux.DragDrop({
      dragSelector: ".gm-screen-grid-cell",
      dropSelector: ".gm-screen-grid-cell",
      permissions: { dragstart: () => !!a().user?.isGM, drop: () => !!a().user?.isGM },
      callbacks: { drop: this._onDrop.bind(this) }
    }).bind(this.element), new foundry.applications.ux.DragDrop({
      dragSelector: ".gm-screen-tabs button",
      dropSelector: ".gm-screen-tabs button",
      permissions: { dragstart: () => !!a().user?.isGM, drop: () => !!a().user?.isGM },
      callbacks: {
        dragstart: this._dragStartTab.bind(this),
        dragover: this._dragOverTab.bind(this),
        dragend: this._dragEndTab.bind(this)
      }
    }).bind(this.element), this.displayDrawer ? this.setPosition({
      left: NaN,
      top: NaN
    }) : this.setPosition({
      width: Number(this.columns) * 400,
      height: Number(this.rows) * 300
    });
    const r = $(this.element);
    if ($(".gm-screen-button").on("contextmenu", async () => {
      if (!a().user?.isGM)
        return;
      await new D({}).render({ force: !0 });
    }), !this.hasUserViewableGrids)
      return;
    this.injectCellContents(r), this.updateClassesAndFixButtons();
    const i = document.querySelector(".gm-screen-grid");
    if (!i)
      return;
    const o = getComputedStyle(i)["grid-template-columns"].split(" ")[0];
    $(r).find(".gm-screen-grid").each((h, p) => {
      p.style.setProperty("--grid-cell-width", o);
    });
  }
  /**
   * @override
   */
  async _attachFrameListeners() {
    super._attachFrameListeners();
    const e = $(this.element);
    $(e).on("click", ".gm-screen-actions button", this.handleClickEvent.bind(this)), $(e).on("click", ".gm-screen-grid-cell-header a", this.handleClickEvent.bind(this));
  }
  /**
   * Utility method to help typescript understand that these are only
   * actors, items, journals, or rolltables
   *
   * @param entityUuid - relevant entityUuid
   */
  async getRelevantGmScreenDocument(e) {
    const t = await fromUuid(e);
    if (t instanceof Actor || t instanceof Item || t instanceof JournalEntry || t instanceof RollTable || t instanceof JournalEntryPage)
      return t;
  }
  /**
   * create and cache the custom Application when we need to during GmScreenApplication.render();
   * and then use that cached Application instance to render
   *
   * @param entityUuid - Identifier for the Entity in the cell
   * @param cellId - Identifier for the Cell
   * @param gridCellContentElement - the element to inject into
   * @returns
   */
  async getCellApplicationClass(e, t, r, i) {
    const n = await this.getRelevantGmScreenDocument(e);
    if (!n) {
      await this.apps[t]?.close(), delete this.apps[t], console.warn("One of the grid cells tried to render an entity that does not exist.", e);
      return;
    }
    this.apps[t] && this.apps[t]?.document.uuid !== e && (await this.apps[t].close(), delete this.apps[t]);
    const { sheet: s } = n, o = s?.constructor;
    if (this.apps[t] && this.apps[t].constructor.name !== o?.name && (await this.apps[t].close(), delete this.apps[t]), this.apps[t] && this.apps[t].constructor.name === o?.name && (!r || this.apps[t].id.includes(i ? "gmscreen-npc-" : "gmscreen-actor-")))
      return g(!1, `using cached application instance for "${n.name}"`, {
        entityUuid: e,
        app: this.apps[t]
      }), this.apps[t];
    if (g(!1, "relevantEntity sheet", {
      sheet: s,
      name: o?.name
    }), !o) {
      g(!0, "no sheet class found for relevantDocument", {
        relevantDocument: n,
        entityUuid: e
      });
      return;
    }
    switch (!0) {
      case n instanceof JournalEntry:
        g(!1, `creating compact journal entry for "${n.name}"`, {
          cellId: t
        }), this.apps[t] = new W({
          document: n,
          editable: !1,
          cellId: t
        });
        break;
      // special case when the sheet is a journal text page. We need to use the SheetClass to resolve UUID links
      case (s instanceof foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet && n instanceof JournalEntryPage && s.options.document.type === "text"):
        g(!1, `creating compact JournalEntryPage for "${n.name}"`, {
          cellId: t
        });
        const h = new o({
          ...s.options,
          mode: "view",
          id: `gmscreen-text-${s.document.id}`,
          // needed to show the journal page with styles
          classes: ["application", "sheet", "journal-sheet", "journal-entry", "maximizing"],
          document: n,
          window: {
            ...s.options.window,
            frame: !1,
            positioned: !1,
            resizable: !1
          }
        });
        h._postRender = async function() {
          this.cellId = t, $(this.cellId).find(".gm-screen-grid-cell-title").text(this.options.document.name);
          const w = $(this.cellId).find(".gm-screen-grid-cell-content");
          w.removeClass().addClass(["gm-screen-grid-cell-content"]), w.html(this.form), w.children().wrapInner("<section class='journal-entry-content journal-entry-page overflow-y'></section>"), w.find(".window-header").remove();
        }, h.close = x, this.apps[t] = h;
        break;
      case n instanceof JournalEntryPage:
        g(!1, `creating compact JournalEntryPage for "${n.name}"`, {
          cellId: t
        }), this.apps[t] = new F({ document: n, cellId: t });
        break;
      case n instanceof RollTable:
        g(!1, `creating compact rollTableDisplay for "${n.name}"`, {
          cellId: t
        }), this.apps[t] = new J({ document: n, cellId: t });
        break;
      case (s instanceof foundry.applications.sheets.ActorSheetV2 && n instanceof Actor):
        g(!1, `creating ActorSheetV2 for "${n.name}"`, {
          cellId: t
        });
        const p = new o({
          ...s.options,
          id: i ? `gmscreen-npc-${s.document.id}` : `gmscreen-actor-${s.document.id}`,
          classes: [],
          document: n,
          window: {
            ...s.options.window,
            frame: !0,
            positioned: !1,
            resizable: _(n.constructor.name)
          }
        });
        p._postRender = async function() {
          this.cellId = t, $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
          const w = $(this.cellId).find(".gm-screen-grid-cell-content");
          if (w.removeClass().addClass(["gm-screen-grid-cell-content"]), w.html(this.form), !i) {
            w.find(".window-header").css("visibility", "hidden");
            return;
          }
          w.addClass("dnd5e2"), w.html(
            await n.toEmbed({
              label: "",
              values: ["statblock"],
              inline: !1,
              cite: !0,
              caption: !1,
              captionPosition: "bottom"
            }) || this.form
          ), w.children().wrap("<div class='dnd5e2-journal journal-entry-content journal-page-content'></div>");
        }, p.close = x, this.apps[t] = p;
        break;
      case (s instanceof foundry.applications.api.DocumentSheetV2 && n instanceof Item):
        g(!1, `creating ItemSheetV2 for "${n.name}"`, {
          cellId: t
        });
        const m = new o({
          ...s.options,
          id: `gmscreen-item-${s.document.id}`,
          document: n,
          window: {
            ...s.options.window,
            frame: !0,
            positioned: !1,
            resizable: !1
          }
        });
        m._postRender = U(t), m.close = x, this.apps[t] = m;
        break;
      default:
        g(!1, `creating compact generic for "${n.name}"`, {
          cellId: t
        });
        const f = new o(n, {
          ...s.options,
          width: "100%",
          height: "100%",
          positioned: !1,
          resizable: _(n.constructor.name)
        });
        f.options.editable = !1, f.options.popOut = !1, f.cellId = t, f._injectHTML = function(w) {
          $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
          const G = $(this.cellId).find(".gm-screen-grid-cell-content");
          g(!1, "CompactEntitySheet overwritten _injectHTML", {
            targetElement: G,
            gridCellContent: G,
            cellId: this.cellId,
            html: w
          }), G.append(w), G.children().wrap("<section class='window-content'></section>"), this._element = w;
        }, f._replaceHTML = function(w, G) {
          $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
          const v = $(this.cellId).find(".gm-screen-grid-cell-content"), T = G.get(0);
          T && (v.html(T), v.children().wrap("<section class='window-content'></section>"), this._element = G);
        }, g(!1, `created compact generic for "${n.name}"`, {
          sheet: f
        }), this.apps[t] = f;
    }
    return this.apps[t];
  }
  injectCellContents(e) {
    return $(e).find("[data-entity-uuid]").each((t, r) => {
      try {
        const i = r.dataset.entityUuid;
        if (!i)
          return;
        const n = `#${r.id}`, { entryId: s, dndNpc: o, dndNpcStatBlock: h } = r.dataset;
        g(!1, "gridEntry with uuid defined found", { relevantUuid: i, cellId: n, gridEntry: r }), this.getCellApplicationClass(i, n, o === "true", h === "true").then(async (p) => {
          if (g(!1, `got application for "${n}"`, {
            application: p
          }), !p)
            throw s && await this.removeEntryFromActiveGrid(s, n.replace("#", "")), new Error("no application exists to render");
          const m = p.options.classes.join(" ");
          $(r).find(".gm-screen-grid-cell-content").addClass(m), p.render(!0);
        }).catch((p) => {
          g(!0, "error trying to render a gridEntry", {
            gridEntry: r,
            cellId: n,
            relevantUuid: i,
            error: p
          });
        });
      } catch (i) {
        g(!1, "erroring", i, {
          gridEntry: r
        });
      }
    }), B(e, ".gm-screen-grid-cell", "width", "--this-cell-width"), e;
  }
  /**
   * All grids with entries hydrated with empty cells
   */
  getHydratedGrids() {
    return g(!1, "getHydratedGrids", {
      userViewableGrids: this.userViewableGrids
    }), Object.values(this.userViewableGrids).reduce((e, t) => {
      const r = t.columnOverride ?? this.columns, i = t.rowOverride ?? this.rows, n = Number(r) * Number(i) - O.getNumOccupiedCells(t), s = n > 0 ? Array.from({ length: n }).map(() => ({})) : [];
      return e[t.id] = {
        grid: t,
        gridEntries: [...Object.values(t.entries), ...s]
      }, e;
    }, {});
  }
  /**
   * @override
   */
  async _prepareContext(e) {
    const t = a().settings.get(d, c.rightMargin), r = a().settings.get(d, c.drawerWidth), i = a().settings.get(d, c.drawerHeight), n = a().settings.get(d, c.drawerOpacity), s = a().settings.get(d, c.condensedButton), o = this.getHydratedGrids(), h = Object.keys(o).indexOf(this.data.activeGridId);
    this.tabGroups[E] = h !== -1 ? this.data.activeGridId : Object.keys(o)[0], Object.keys(o).forEach((m) => {
      o[m].grid.cssClass = this.tabGroups[E] === o[m].grid.id ? "active" : "";
    });
    const p = foundry.utils.mergeObject(e, {
      grids: o,
      isGM: !!a().user?.isGM,
      condensedButton: s,
      data: this.data,
      columns: this.columns,
      rows: this.rows,
      drawerWidth: r,
      drawerHeight: i,
      rightMargin: t,
      drawerOpacity: n,
      expanded: this.expanded,
      hidden: !this.hasUserViewableGrids,
      displayDrawer: this.displayDrawer,
      darkTheme: a().settings.get("core", "uiConfig")?.colorScheme?.interface === "dark"
    });
    return p.tabs = Object.keys(o).map((m) => ({
      id: o[m].grid.id,
      group: E,
      label: o[m].grid.name,
      cssClass: o[m].grid.cssClass
    })), g(!1, "_prepareContext", {
      data: this.data,
      newAppData: p
    }), p;
  }
  async _onDrop(e) {
    if (e.stopPropagation(), !a().user?.isGM) return;
    let t;
    try {
      t = JSON.parse(e.dataTransfer.getData("text/plain"));
    } catch (h) {
      g(!1, "error parsing data from drag and drop", h);
      return;
    }
    if (g(!1, "onDrop", {
      event: e,
      data: t,
      closestGridCell: $(e.currentTarget).closest(".gm-screen-grid-cell")
    }), !["JournalEntry", "JournalEntryPage", "RollTable", "Item", "Actor"].includes(t.type))
      return;
    const r = t.pack ? `Compendium.${t.pack}.${t.uuid}` : t.uuid, i = I($(e.target).closest(".gm-screen-grid-cell")), n = `${i.x}-${i.y}`, s = await this.getRelevantGmScreenDocument(r), o = {
      ...i,
      entryId: n,
      entityUuid: r,
      type: t.type,
      isDndNpc: s instanceof Actor && a().system.id === "dnd5e" && s?.sheet?.constructor.name === "NPCActorSheet",
      isDndNpcStatBlock: !1
    };
    this.addEntryToActiveGrid(o);
  }
}
let b;
async function j(l) {
  const e = a().settings.get(d, c.gmScreenConfig), t = N(e);
  if (!Object.keys(t).length) {
    ui.notifications?.notify(y().localize(`${u}.warnings.noGrids`), "error");
    return;
  }
  if (a().settings.get(d, c.displayDrawer) && b) {
    b.toggleGmScreenVisibility(l);
    return;
  }
  b || (b = new O());
  const i = l ?? b.state < 1, n = b.state < 1;
  try {
    i ? (n && await b.render(!0), b.minimized && b.maximize(), b.bringToFront()) : b.close();
  } catch (s) {
    g(!1, "error occurred trying to toggle the GM screen", s);
  }
}
function K() {
  b && b.refresh();
}
async function Z() {
  b && await b.switchTab();
}
Handlebars.registerHelper(`${u}-switch`, function(e, t) {
  return this.switch_value = e, t.fn(this);
});
Handlebars.registerHelper(`${u}-case`, function(e, t) {
  return e === this.switch_value ? t.fn(this) : t.inverse(this);
});
Hooks.once("init", async () => {
  g(!0, `Initializing ${d}`), D.init(), await foundry.applications.handlebars.loadTemplates(Object.values(foundry.utils.flattenObject(S)));
});
Hooks.once("ready", async () => {
  await M(), window[d] = { migration: M }, a().settings.get(d, c.displayDrawer) && (b = new O(), b.render(!0));
  const e = a().modules.get(d);
  e && (e.api = {
    toggleGmScreenVisibility: j,
    refreshGmScreen: K,
    switchTab: Z
  }), a().user?.isGM && a().settings.set(d, c.reset, !1);
});
function Y(l) {
  const e = $(l), t = e.find(".header-actions"), r = `<button class="gm-screen-button">
          <i class="fas fa-book-reader"></i> ${y().localize(`${u}.gmScreen.Open`)}
      </button>`;
  t.append(r), e.find("button.gm-screen-button").on("click", (n) => {
    n.preventDefault(), j(!0);
  });
}
Hooks.on("renderJournalDirectory", (l, e) => {
  a().settings.get(d, c.displayDrawer) || Y(e);
});
Hooks.once("devModeReady", ({ registerPackageDebugFlag: l }) => {
  l(d);
});
//# sourceMappingURL=foundryvtt-gmScreen.js.map
