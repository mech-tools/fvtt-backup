const l = "gm-screen", u = "GMSCR", S = {
  settings: `modules/${l}/templates/settings.hbs`,
  screen: `modules/${l}/templates/screen.hbs`,
  screenContent: `modules/${l}/templates/parts/screen-content.hbs`,
  screenTabs: `modules/${l}/templates/parts/screen-tabs.hbs`,
  screenCell: `modules/${l}/templates/parts/screen-cell.hbs`,
  screenGrid: `modules/${l}/templates/parts/screen-grid.hbs`,
  grids: {
    tableRow: `modules/${l}/templates/parts/settings-grid-config-table-row.hbs`
  }
}, x = "gmScreen-primary";
var c = /* @__PURE__ */ ((d) => (d.columns = "columns", d.displayDrawer = "display-as-drawer", d.drawerHeight = "drawer-height", d.drawerOpacity = "drawer-opacity", d.drawerWidth = "drawer-width", d.gmScreenConfig = "gm-screen-config", d.migrated = "migrated", d.condensedButton = "condensedButton", d.reset = "reset", d.rightMargin = "right-margin", d.rows = "rows", d))(c || {}), R = /* @__PURE__ */ ((d) => (d.openCloseScreen = "openCloseScreen", d.changeTab = "changeTab", d))(R || {});
const O = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?/;
function a() {
  if (!(game instanceof foundry.Game))
    throw new Error("game is not initialized yet!");
  return game;
}
function b() {
  const { i18n: d } = a();
  return d || {
    localize: (t) => t
  };
}
function g(d, ...t) {
  (d || a().modules.get("_dev-mode")?.api?.getPackageDebugValue(l)) && console.log(l, "|", ...t);
}
function V(d, t) {
  return new Promise((e, r) => {
    new foundry.applications.api.DialogV2({
      window: { title: b().localize(`${u}.cellConfigDialog.CellConfig`) },
      modal: !0,
      content: `
    <div class="form-group">
      <label for="spanRows">${b().localize(`${u}.cellConfigDialog.RowSpan`)}</label>
      <input type="number" step="1" name="spanRows" id="spanRows" min="1" max="${t.rows + 1 - d.y}" value="${d.spanRows || 1}">
    </div>
    <div class="form-group">
      <label for="spanCols">${b().localize(`${u}.cellConfigDialog.ColSpan`)}</label>
      <input type="number" step="1" name="spanCols" id="spanCols" min="1" max="${t.columns + 1 - d.x}" value="${d.spanCols || 1}">
    </div>  
`,
      buttons: [
        {
          action: "no",
          icon: "fas fa-times",
          label: b().localize("Cancel"),
          callback: () => {
            r();
          }
        },
        {
          action: "reset",
          icon: "fas fa-undo",
          label: b().localize("Default"),
          callback: () => {
            const s = {
              newSpanRows: 1,
              newSpanCols: 1
            };
            g(!1, "dialog formValues", s), e(s);
          }
        },
        {
          action: "yes",
          icon: "fas fa-check",
          label: b().localize("Submit"),
          default: !0,
          callback: (s, n, i) => {
            const o = $(i.element), p = {
              newSpanRows: Number(o.find('[name="spanRows"]').val()),
              newSpanCols: Number(o.find('[name="spanCols"]').val())
            };
            g(!1, "dialog formValues", p), e(p);
          }
        }
      ]
    }).render({ force: !0 });
  });
}
function I(d) {
  const t = d.parents(".gm-screen-grid")[0], e = window.getComputedStyle(t);
  g(!1, "getGridElementsPosition", {
    element: d,
    relevantGridElement: t,
    vanillaGridElementStyles: e,
    gap: e.gap,
    // wtf this is '' in firefox
    gridRowGap: e["grid-row-gap"],
    gridColGap: e["grid-column-gap"]
  });
  const r = Number(e["grid-row-gap"].match(O)[0]), s = e["grid-template-columns"].split(" "), n = Number(s[0].match(O)[0]), i = e["grid-template-rows"].split(" "), o = Number(i[0].match(O)[0]), p = d[0].getBoundingClientRect(), h = t.getBoundingClientRect(), f = Math.floor((p.left - (h.left - r)) / (n + r)) + 1, m = Math.floor((p.top - (h.top - r)) / (o + r)) + 1;
  return g(!1, "getGridElementsPosition", {
    setup: {
      gap: r,
      cols: s,
      rows: i,
      elementBounds: p,
      gridBounds: h,
      colWidth: n,
      rowHeight: o
    },
    results: {
      elementColumn: f,
      elementRow: m
    }
  }), { y: m, x: f };
}
function N(d) {
  return a().user?.isGM ? d.grids : Object.keys(d.grids).reduce((e, r) => (d.grids[r].isShared && (e[r] = d.grids[r]), e), {});
}
function z(d, t, e, r) {
  d.find(t).each((s, n) => {
    const i = window.getComputedStyle(n)[e];
    n.style.setProperty(r, String(i));
  });
}
function L(d) {
  return async function() {
    this.cellId = d, $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const e = $(this.cellId).find(".gm-screen-grid-cell-content");
    e.removeClass().addClass(["gm-screen-grid-cell-content"]), e.html(this.form), e.find(".window-header").css("visibility", "hidden");
  };
}
function T() {
  return this;
}
async function j() {
  if (!a().user?.isGM) return;
  const d = "2.0.1", t = a().settings.get(l, c.migrated);
  if (t.status && (foundry.utils.isNewerVersion(a().modules.get(l)?.version ?? "0", d) || t.version === d))
    return;
  ui.notifications?.notify("GM Screen | Beginning Migration to updated schema.", "info");
  const e = a().settings.get(l, c.gmScreenConfig);
  if (e?.grid?.entries && Array.isArray(e.grid.entries)) {
    const r = e.grid.entries.reduce((n, i) => {
      const o = `${i.x}-${i.y}`;
      return n[o] = {
        ...i,
        entryId: o
      }, n;
    }, {}), s = {
      activeGridId: "default",
      grids: {
        default: {
          ...e.grid,
          entries: r,
          id: "default",
          name: "Main",
          isShared: !1,
          cssClass: "active"
        }
      }
    };
    g(!0, "migration output", {
      output: s
    }), await a().settings.set(l, c.gmScreenConfig, s);
  }
  ui.notifications?.notify("GM Screen | Migration Complete.", "info"), await a().settings.set(l, c.migrated, { status: !0, version: d });
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
  static init() {
    a().settings.registerMenu(l, "menu", {
      name: `${u}.settings.${c.gmScreenConfig}.Name`,
      label: `${u}.settings.${c.gmScreenConfig}.Label`,
      icon: "fas fa-table",
      type: D,
      restricted: !0,
      hint: `${u}.settings.${c.gmScreenConfig}.Hint`
    }), a().settings.register(l, c.gmScreenConfig, {
      default: A,
      scope: "world",
      config: !1,
      onChange(...t) {
        g(!1, "gmScreenConfig changed", {
          args: t,
          currentConfig: { ...a().settings.get(l, c.gmScreenConfig) }
        }), a().modules.get(l)?.api?.refreshGmScreen();
      }
    }), a().settings.register(l, c.migrated, {
      config: !1,
      default: { status: !1, version: "1.2.2" },
      scope: "world",
      type: Object
    }), a().settings.register(l, c.columns, {
      name: `${u}.settings.${c.columns}.Name`,
      default: 4,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${u}.settings.${c.columns}.Hint`
    }), a().settings.register(l, c.rows, {
      name: `${u}.settings.${c.rows}.Name`,
      default: 3,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${u}.settings.${c.rows}.Hint`
    }), a().settings.register(l, c.displayDrawer, {
      name: `${u}.settings.${c.displayDrawer}.Name`,
      default: !0,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${u}.settings.${c.displayDrawer}.Hint`,
      onChange: () => window.location.reload()
    }), a().settings.register(l, c.rightMargin, {
      name: `${u}.settings.${c.rightMargin}.Name`,
      default: 0,
      type: Number,
      scope: "client",
      range: { min: 0, max: 75, step: 5 },
      config: !0,
      hint: `${u}.settings.${c.rightMargin}.Hint`
    }), a().settings.register(l, c.drawerWidth, {
      name: `${u}.settings.${c.drawerWidth}.Name`,
      default: 100,
      type: Number,
      scope: "client",
      range: { min: 25, max: 100, step: 1 },
      config: !0,
      hint: `${u}.settings.${c.drawerWidth}.Hint`
    }), a().settings.register(l, c.drawerHeight, {
      name: `${u}.settings.${c.drawerHeight}.Name`,
      default: 60,
      type: Number,
      scope: "client",
      range: { min: 10, max: 90, step: 1 },
      config: !0,
      hint: `${u}.settings.${c.drawerHeight}.Hint`
    }), a().settings.register(l, c.drawerOpacity, {
      name: `${u}.settings.${c.drawerOpacity}.Name`,
      default: 1,
      type: Number,
      scope: "client",
      range: { min: 0.1, max: 1, step: 0.05 },
      config: !0,
      hint: `${u}.settings.${c.drawerOpacity}.Hint`
    }), a().settings.register(l, c.condensedButton, {
      name: `${u}.settings.${c.condensedButton}.Name`,
      default: !1,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${u}.settings.${c.condensedButton}.Hint`
    }), a().settings.register(l, c.reset, {
      name: `${u}.settings.${c.reset}.Name`,
      default: !1,
      type: Boolean,
      scope: "world",
      config: !0,
      hint: `${u}.settings.${c.reset}.Hint`,
      onChange: (t) => {
        t && a().settings.set(l, c.gmScreenConfig, A);
      }
    }), a().keybindings?.register(l, R.openCloseScreen, {
      name: b().localize(`${u}.keybindings.openCloseScreen`),
      editable: [
        {
          key: "KeyO"
        }
      ],
      onDown: () => {
        a().modules.get(l)?.api?.toggleGmScreenVisibility();
      },
      onUp: () => {
      },
      restricted: !1,
      precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    }), a().keybindings?.register(l, R.changeTab, {
      name: b().localize(`${u}.keybindings.changeTab`),
      editable: [
        {
          key: "KeyP"
        }
      ],
      onDown: () => {
        a().modules.get(l)?.api?.switchTab();
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
    return b().localize(`${u}.gridConfig.GridConfig`);
  }
  get rows() {
    return a().settings.get(l, c.rows);
  }
  get columns() {
    return a().settings.get(l, c.columns);
  }
  get settingsData() {
    const t = a().settings.get(l, c.gmScreenConfig);
    return g(!1, "getSettingsData", {
      gmScreenConfig: t
    }), {
      grids: t.grids
    };
  }
  async _prepareContext(t) {
    const e = foundry.utils.mergeObject(t, {
      settings: this.settingsData,
      defaultRows: this.rows,
      defaultColumns: this.columns
    });
    return g(!1, e), e;
  }
  _dragListeners(t) {
    let e;
    t.on("dragstart", (r) => {
      e = r.target;
    }), t.on("dragover", (r) => {
      if (!e)
        return;
      const s = $(r.target).parents("tbody tr")[0];
      if (!s)
        return;
      const n = Array.from($(r.target).parents("tbody").children());
      n.indexOf(s) > n.indexOf(e) ? s.after(e) : s.before(e);
    }), t.on("dragend", () => {
      e = void 0;
    });
  }
  async _onRender() {
    const t = $(this.element);
    g(!1, "activateListeners", {
      html: t
    });
    const e = async (s) => {
      g(!1, "add row clicked", {
        data: s.data()
      });
      const { table: n } = s.data(), i = $(t).find("tbody"), o = {
        gridId: foundry.utils.randomID(),
        grid: {
          name: "",
          columnOverride: "",
          rowOverride: ""
        },
        defaultColumns: this.columns,
        defaultRows: this.rows
      }, p = $(
        await foundry.applications.handlebars.renderTemplate(S[n].tableRow, o)
      );
      i.append(p), this.setPosition({});
    }, r = (s) => {
      g(!1, "delete row clicked", {
        currentTarget: s
      }), s.parentsUntil("tbody").remove(), this.setPosition({});
    };
    this._dragListeners(t), t.on("click", (s) => {
      const n = $(s.target).closest("button")[0];
      if (!n)
        return;
      const i = $(n);
      g(!1, "a button was clicked", { e: s, currentTarget: n }), i.hasClass("add-row") && e(i), i.hasClass("delete-row") && r(i);
    });
  }
  // grids: {
  //   default: {
  //     name: 'Main',
  //     id: 'default',
  //     entries: {},
  //   },
  // },
  static async #e(t, e, r) {
    const s = a().settings.get(l, c.gmScreenConfig), n = foundry.utils.expandObject(r.object);
    if (g(!1, {
      formData: r,
      data: n
    }), Object.keys(n).length === 0)
      throw ui.notifications?.error(b().localize(`${u}.gridConfig.errors.empty`)), new Error("Cannot save the grid with no tabs.");
    const i = Object.keys(n.grids), o = i.reduce((f, m) => {
      const C = n.grids[m];
      return Object.hasOwn(s.grids, m) ? (f[m] = {
        ...s.grids[m],
        ...C
      }, f) : (f[m] = {
        ...C,
        entries: {},
        name: C.name ?? "",
        isShared: C.isShared ?? !1,
        id: m
      }, f);
    }, {}), p = i.includes(s.activeGridId) ? s.activeGridId : i[0], h = {
      ...s,
      grids: o,
      activeGridId: p
    };
    g(!0, "setting settings", {
      newGmScreenConfig: h
    }), await a().settings.set(l, c.gmScreenConfig, h), a().modules.get("gm-screen")?.api?.refreshGmScreen();
  }
}
class B extends foundry.applications.sheets.RollTableSheet {
  cellId;
  constructor(t) {
    super(t), g(!1, "CompactRollTableDisplay constructor", {
      options: t
    }), this.cellId = t.cellId;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(t, e, r) {
    if (super._replaceHTML(t, e, r), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const s = $(this.cellId).find(".gm-screen-grid-cell-content");
    s.html(this.form), s.find(".window-header").remove(), this.setPosition({
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
  async close(...t) {
    return t.length === 0 ? super.close(...t) : this;
  }
}
class U extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet {
  cellId;
  constructor(t) {
    super(t), this.cellId = t.cellId;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(t, e, r) {
    if (super._replaceHTML(t, e, r), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.options.document.name);
    const s = $(this.cellId).find(".gm-screen-grid-cell-content");
    switch (this.options.document.type) {
      case "image":
        s.html(
          `<img src="${this.options.document.src}" alt="${this.options.document.image.caption || "image"}"></img>`
        );
        break;
      case "pdf":
        s.html(
          `<iframe src="scripts/pdfjs/web/viewer.html?file=/${this.options.document.src}"></iframe>`
        );
        break;
      case "video":
        s.html(
          `<video src="${this.options.document.src}" ${this.options.document.video.controls ? "controls" : ""} ${this.options.document.video.autoplay ? "autoplay" : ""}></video>`
        );
        break;
      default:
        this.options.document.text.content && s.html(this.options.document.text.content);
    }
    $(this.form).hide();
  }
  /** @override */
  get id() {
    return `gmscreen-journal-page-${this.document.id}`;
  }
  async close(...t) {
    return t.length === 0 ? super.close(...t) : this;
  }
}
class J extends foundry.applications.sheets.journal.JournalEntrySheet {
  cellId;
  constructor(t) {
    super(t), this.cellId = t.cellId, this.options.position.width = "auto", this.options.position.height = "auto";
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(t, e, r) {
    if (super._replaceHTML(t, e, r), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const s = $(this.cellId).find(".gm-screen-grid-cell-content");
    s.html(this.form), s.find(".window-header").remove(), this.setPosition({
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
  async close(...t) {
    return t.length === 0 ? super.close(...t) : this;
  }
}
class E extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  expanded;
  data;
  apps;
  // used to allow players to switch tabs
  currentTab;
  constructor(t = {}) {
    super(t), this.expanded = !1, this.data = a().settings.get(l, c.gmScreenConfig), this.apps = {}, this.currentTab = this.data.activeGridId;
    const e = a().settings.get(l, c.columns), r = a().settings.get(l, c.rows), s = a().settings.get(l, c.displayDrawer), n = {
      window: {
        ...this.options.window,
        resizable: !1,
        frame: !1
      }
    }, i = [
      {
        action: "clearGrid",
        label: b().localize(`${u}.gmScreen.Reset`),
        class: "clear",
        icon: "fas fa-ban",
        onClick: () => this.handleClear.bind(this)()
      }
    ], o = {
      classes: ["window-app", "gm-screen-popOut"],
      width: Number(e) * 400,
      height: Number(r) * 300,
      window: {
        ...this.options.window,
        resizable: !0,
        frame: !0,
        controls: [
          {
            action: "refresh",
            label: b().localize(`${u}.gmScreen.Refresh`),
            class: "refresh",
            icon: "fas fa-sync",
            onClick: () => this.refresh()
          },
          ...a().user?.isGM ? i : []
        ]
      }
    };
    g(!1, {
      displayDrawer: s,
      options: s ? n : o
    }), this.options = {
      ...this.options,
      ...s ? n : o
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
    return a().settings.get(l, c.rows);
  }
  get columns() {
    return a().settings.get(l, c.columns);
  }
  get displayDrawer() {
    return a().settings.get(l, c.displayDrawer);
  }
  get userViewableGrids() {
    return N(this.data);
  }
  get hasUserViewableGrids() {
    return !!Object.keys(this.userViewableGrids).length;
  }
  get title() {
    return this.displayDrawer ? "" : b().localize(`${u}.gmScreen.Title`);
  }
  get activeGrid() {
    return this.data.grids[this.data.activeGridId];
  }
  static getNumOccupiedCells(t) {
    return Object.values(t.entries).reduce((e, r) => {
      const s = (r.spanCols || 1) * (r.spanRows || 1);
      return e + s;
    }, 0);
  }
  /**
   * Helper function to update the gmScreenConfig setting with a new grid's worth of data
   * @param {GmScreenGrid} newGridData - the complete grid object to set
   */
  async setGridData(t) {
    const e = foundry.utils.deepClone(this.data);
    if (!foundry.utils.setProperty(e, `grids.${t.id}`, t)) {
      g(!0, "error occurred trying to set a grid data");
      return;
    }
    await a().settings.set(l, c.gmScreenConfig, e);
  }
  /**
   * Adds an Entry to the proper place on the active grid's data.
   * Replaces an existing entry if the entryId matches
   * @param {GmScreenGridEntry} newEntry The Entry being added.
   */
  async addEntryToActiveGrid(t) {
    const e = { ...this.activeGrid.entries };
    e[t.entryId] = {
      ...e[t.entryId],
      ...t
    };
    const r = {
      ...this.activeGrid,
      entries: e
    };
    g(!1, "addEntryToActiveGrid", {
      activeGridData: this.activeGrid,
      newEntries: e,
      newEntry: t,
      newGridData: r
    }), this.setGridData(r);
  }
  /**
   * Remove a given entry from the Active Grid
   * @param {string} entryId - entry to remove from the active grid's entries
   */
  async removeEntryFromActiveGrid(t, e) {
    const r = foundry.utils.deepClone(this.activeGrid.entries[t]), s = r.spanCols || r.spanRows, n = {
      ...this.activeGrid.entries
    };
    if (s ? (delete r.entityUuid, delete r.type, delete r.isDndNpc, delete r.isDndNpcStatBlock, n[t] = r) : delete n[t], e) {
      const o = `#${e}`;
      await this.apps[o]?.close(), delete this.apps[o];
    }
    const i = {
      ...this.activeGrid,
      entries: n
    };
    this.setGridData(i);
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
  toggleGmScreenVisibility(t = !this.expanded) {
    this.expanded = t, this.expanded ? (this.bringToFront(), $(".gm-screen-app").addClass("expanded"), $(".gm-screen-app").css("z-index", this.position.zIndex)) : $(".gm-screen-app").removeClass("expanded");
  }
  /**
   * Double confirms Clearing the Active Grid
   */
  async handleClear() {
    g(!1, "handleClear"), await foundry.applications.api.DialogV2.confirm({
      title: b().localize(`${u}.warnings.clearConfirm.Title`),
      content: b().localize(`${u}.warnings.clearConfirm.Content`)
    }) && (this.apps = {}, this.setGridData({
      ...this.activeGrid,
      entries: {}
    }));
  }
  _dragListeners(t) {
    let e;
    const r = t.find(".gm-screen-tabs");
    r.on("dragstart", ".item", (s) => {
      e = s.target;
    }), r.on("dragover", (s) => {
      if (!e)
        return;
      const n = Array.from($(s.target).closest(".gm-screen-tabs").children());
      n.indexOf(s.target) > n.indexOf(e) ? s.target.after(e) : s.target.before(e);
    }), r.on("dragend", async (s) => {
      if (!e)
        return;
      const n = foundry.utils.deepClone(this.data);
      n.grids = {}, $(s.target).closest(".gm-screen-tabs").children().each((i, o) => {
        const p = $(o).attr("data-tab");
        p && (n.grids[p] = this.data.grids[p]);
      }), e = void 0, await a().settings.set(l, c.gmScreenConfig, n);
    });
  }
  async handleClickEvent(t) {
    t.preventDefault();
    const e = t.currentTarget.dataset.action, r = $(t.currentTarget).parents("[data-entity-uuid]")?.data()?.entityUuid, s = $(t.currentTarget).parents("[data-entry-id]")?.data()?.entryId, n = $(t.currentTarget).parents("[data-entry-id]")?.attr("id");
    switch (g(!1, "handleClickEvent", {
      e: t,
      action: e
    }), e) {
      case "clearCell": {
        if (!s)
          return;
        this.removeEntryFromActiveGrid(s, n);
        break;
      }
      case "clearGrid": {
        this.handleClear();
        break;
      }
      case "configureCell": {
        try {
          const { x: i, y: o } = I($(t.target).parent()), p = this.activeGrid.entries[s] || {
            x: i,
            y: o,
            entryId: `${i}-${o}`
          };
          g(!1, "configureCell cellToConfigure", p);
          const { newSpanRows: h, newSpanCols: f } = await V(p, {
            rows: this.rows,
            columns: this.columns
          });
          g(!1, "new span values from dialog", {
            newSpanRows: h,
            newSpanCols: f
          });
          const m = {
            ...p,
            spanRows: h,
            spanCols: f
          }, C = {
            ...this.activeGrid.entries,
            [m.entryId]: m
          }, w = [...Array(m.spanCols).keys()].map((G, k) => {
            const M = m.x + k;
            return [...Array(m.spanRows).keys()].map((Y, _) => {
              const P = m.y + _;
              return `${M}-${P}`;
            });
          }).flat();
          g(!1, {
            problemCoordinates: w
          }), Object.values(C).forEach((G) => {
            w.includes(G.entryId) && G.entryId !== m.entryId && delete C[G.entryId];
          }), g(!1, "newEntries", C);
          const v = {
            ...this.activeGrid,
            entries: C
          };
          this.setGridData(v);
        } catch (i) {
          g(!1, "User exited configure cell Dialog.", i);
        }
        break;
      }
      case "open": {
        if (!r)
          return;
        try {
          const i = await this.getRelevantGmScreenDocument(r), o = i?.sheet;
          if (g(!1, "trying to edit entity", { relevantEntitySheet: o }), !o)
            return;
          if (o.rendered) {
            o.maximize(), o.bringToTop();
            return;
          }
          if (i instanceof JournalEntryPage && i.type === "image") {
            new foundry.applications.apps.ImagePopout({
              src: o.options.document.src,
              uuid: r,
              window: { title: i.name }
            }).render({ force: !0 });
            return;
          }
          o.render(!0);
        } catch (i) {
          g(!0, "error opening entity sheet", i);
        }
        break;
      }
      case "refresh": {
        this.refresh();
        break;
      }
      case "tab": {
        const i = t.currentTarget.dataset.tab;
        if (this.currentTab = i ?? this.currentTab, !a().user?.isGM || i === this.data.activeGridId || !i)
          return;
        g(!1, "trying to set active grid", { newActiveGridId: i });
        try {
          const o = {
            ...this.data,
            activeGridId: i
          };
          await a().settings.set(l, c.gmScreenConfig, o);
        } catch (o) {
          g(!0, "error setting active tab", o);
        }
        break;
      }
      case "toggle-gm-screen": {
        try {
          this.toggleGmScreenVisibility();
        } catch (i) {
          g(!0, "error toggling GM Screen", i);
        }
        break;
      }
      case "statBlock": {
        if (!n)
          return;
        const i = {
          ...this.activeGrid.entries
        };
        i[s].isDndNpcStatBlock = !i[s].isDndNpcStatBlock;
        const o = {
          ...this.activeGrid,
          entries: i
        };
        await this.setGridData(o);
        break;
      }
    }
  }
  async switchTab() {
    const t = Object.keys(this.userViewableGrids);
    if (t.length <= 1)
      return;
    const e = a().user?.isGM, s = (t.indexOf(e ? this.data.activeGridId : this.currentTab) + 1) % t.length, n = t[s];
    g(!1, "trying to set active grid", { newActiveGridId: n });
    try {
      if (this.changeTab(n, x), this.currentTab = n, !e)
        return;
      const i = {
        ...this.data,
        activeGridId: n
      };
      await a().settings.set(l, c.gmScreenConfig, i);
    } catch (i) {
      g(!0, "error setting active tab", i);
    }
  }
  updateClassesAndFixButtons() {
    const t = $("#gm-screen-app");
    this.displayDrawer || (t.addClass("application"), t.find(".window-content").prepend(t.find(".window-header")));
  }
  async _renderFrame(t) {
    if (!this.displayDrawer)
      return super._renderFrame(t);
    const e = $(
      await foundry.applications.handlebars.renderTemplate(S.screen, await this._prepareContext(this.options))
    ).get(0);
    if (!e)
      throw new Error("Failed to render GmScreenApplication frame template");
    return e;
  }
  /**
   * @override
   */
  render(...t) {
    return !this.hasUserViewableGrids && this.rendered && this.close(), super.render(...t);
  }
  /**
   * This currently thinly wraps `this.render`, but might be more complicated in the future.
   */
  async refresh() {
    const t = a().settings.get(l, c.gmScreenConfig), e = foundry.utils.deepClone(this.data), r = foundry.utils.diffObject(e, t);
    if (g(!1, "refreshing gm screen", {
      newData: foundry.utils.deepClone(t),
      data: e,
      diffData: r
    }), this.data = t, Object.keys(r).length) {
      if (Object.keys(r).every((f) => f === "activeGridId") || Object.values(r.grids || {}).every((f) => Object.keys(f).every((m) => m === "cssClass"))) {
        g(!1, "not rerendering because only activeGridId changed or cssClass changed");
        return;
      }
      const s = Object.keys(r?.grids ?? {}), n = Object.keys(this.userViewableGrids), i = Object.keys(N(e)), o = !s.filter((f) => n.includes(f)).length, p = n.length === i.length && n.every((f) => i.includes(f)), h = o && p;
      if (g(!1, "gridIdChecks", {
        diffGridIds: s,
        myOldGridIds: i,
        myNewGridIds: n,
        diffOverlapsNewGridIds: o,
        oldAndNewGridIdsAreEqual: p,
        shouldNotRerender: h
      }), h) {
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
    }).bind(this.element), this.displayDrawer ? this.setPosition({
      left: NaN,
      top: NaN
    }) : this.setPosition({
      width: Number(this.columns) * 400,
      height: Number(this.rows) * 300
    });
    const e = $(this.element);
    if ($(".gm-screen-button").on("contextmenu", async () => {
      if (!a().user?.isGM)
        return;
      await new D({}).render({ force: !0 });
    }), !this.hasUserViewableGrids)
      return;
    this.injectCellContents(e), this.updateClassesAndFixButtons();
    const r = document.querySelector(".gm-screen-grid");
    if (!r)
      return;
    const i = getComputedStyle(r)["grid-template-columns"].split(" ")[0];
    $(e).find(".gm-screen-grid").each((o, p) => {
      p.style.setProperty("--grid-cell-width", i);
    });
  }
  /**
   * @override
   */
  async _attachFrameListeners() {
    super._attachFrameListeners();
    const t = $(this.element);
    a().user?.isGM && this._dragListeners(t), $(t).on("click", ".gm-screen-actions button", this.handleClickEvent.bind(this)), $(t).on("click", ".gm-screen-grid-cell-header a", this.handleClickEvent.bind(this));
  }
  /**
   * Utility method to help typescript understand that these are only
   * actors, items, journals, or rolltables
   *
   * @param entityUuid - relevant entityUuid
   */
  async getRelevantGmScreenDocument(t) {
    const e = await fromUuid(t);
    if (e instanceof Actor || e instanceof Item || e instanceof JournalEntry || e instanceof RollTable || e instanceof JournalEntryPage)
      return e;
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
  async getCellApplicationClass(t, e, r, s) {
    const n = await this.getRelevantGmScreenDocument(t);
    if (!n) {
      await this.apps[e]?.close(), delete this.apps[e], console.warn("One of the grid cells tried to render an entity that does not exist.", t);
      return;
    }
    this.apps[e] && this.apps[e]?.document.uuid !== t && (await this.apps[e].close(), delete this.apps[e]);
    const { sheet: i } = n, o = i?.constructor;
    if (this.apps[e] && this.apps[e].constructor.name !== o?.name && (await this.apps[e].close(), delete this.apps[e]), this.apps[e] && this.apps[e].constructor.name === o?.name && (!r || this.apps[e].id.includes(s ? "gmscreen-npc-" : "gmscreen-actor-")))
      return g(!1, `using cached application instance for "${n.name}"`, {
        entityUuid: t,
        app: this.apps[e]
      }), this.apps[e];
    if (g(!1, "relevantEntity sheet", {
      sheet: i,
      name: o?.name
    }), !o) {
      g(!0, "no sheet class found for relevantDocument", {
        relevantDocument: n,
        entityUuid: t
      });
      return;
    }
    switch (!0) {
      case n instanceof JournalEntry:
        g(!1, `creating compact journal entry for "${n.name}"`, {
          cellId: e
        }), this.apps[e] = new J({
          document: n,
          editable: !1,
          cellId: e
        });
        break;
      // special case when the sheet is a journal text page. We need to use the SheetClass to resolve UUID links
      case (i instanceof foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet && n instanceof JournalEntryPage && i.options.document.type === "text"):
        g(!1, `creating compact JournalEntryPage for "${n.name}"`, {
          cellId: e
        });
        const p = new o({
          ...i.options,
          mode: "view",
          id: `gmscreen-text-${i.document.id}`,
          // needed to show the journal page with styles
          classes: ["application", "sheet", "journal-sheet", "journal-entry", "maximizing"],
          document: n,
          window: {
            ...i.options.window,
            frame: !1,
            positioned: !1,
            resizable: !1
          }
        });
        p._postRender = async function() {
          this.cellId = e, $(this.cellId).find(".gm-screen-grid-cell-title").text(this.options.document.name);
          const w = $(this.cellId).find(".gm-screen-grid-cell-content");
          w.removeClass().addClass(["gm-screen-grid-cell-content"]), w.html(this.form), w.children().wrapInner("<section class='journal-entry-content journal-entry-page overflow-y'></section>"), w.find(".window-header").remove();
        }, p.close = T, this.apps[e] = p;
        break;
      case n instanceof JournalEntryPage:
        g(!1, `creating compact JournalEntryPage for "${n.name}"`, {
          cellId: e
        }), this.apps[e] = new U({ document: n, cellId: e });
        break;
      case n instanceof RollTable:
        g(!1, `creating compact rollTableDisplay for "${n.name}"`, {
          cellId: e
        }), this.apps[e] = new B({ document: n, cellId: e });
        break;
      case (i instanceof foundry.applications.sheets.ActorSheetV2 && n instanceof Actor):
        g(!1, `creating ActorSheetV2 for "${n.name}"`, {
          cellId: e
        });
        const h = new o({
          ...i.options,
          id: s ? `gmscreen-npc-${i.document.id}` : `gmscreen-actor-${i.document.id}`,
          classes: [],
          document: n,
          window: {
            ...i.options.window,
            frame: !0,
            positioned: !1,
            resizable: !1
          }
        });
        h._postRender = async function() {
          this.cellId = e, $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
          const w = $(this.cellId).find(".gm-screen-grid-cell-content");
          if (w.removeClass().addClass(["gm-screen-grid-cell-content"]), w.html(this.form), !s) {
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
        }, h.close = T, this.apps[e] = h;
        break;
      case (i instanceof foundry.applications.api.DocumentSheetV2 && n instanceof Item):
        g(!1, `creating ItemSheetV2 for "${n.name}"`, {
          cellId: e
        });
        const f = new o({
          ...i.options,
          id: `gmscreen-item-${i.document.id}`,
          document: n,
          window: {
            ...i.options.window,
            frame: !0,
            positioned: !1,
            resizable: !1
          }
        });
        f._postRender = L(e), f.close = T, this.apps[e] = f;
        break;
      default:
        g(!1, `creating compact generic for "${n.name}"`, {
          cellId: e
        });
        const m = new o(n, {
          ...i.options,
          width: "100%",
          height: "100%",
          positioned: !1,
          resizable: !1
        });
        m.options.editable = !1, m.options.popOut = !1, m.cellId = e, m._injectHTML = function(w) {
          $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
          const v = $(this.cellId).find(".gm-screen-grid-cell-content");
          g(!1, "CompactEntitySheet overwritten _injectHTML", {
            targetElement: v,
            gridCellContent: v,
            cellId: this.cellId,
            html: w
          }), v.append(w), v.children().wrap("<section class='window-content'></section>"), this._element = w;
        }, m._replaceHTML = function(w, v) {
          $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
          const G = $(this.cellId).find(".gm-screen-grid-cell-content"), k = v.get(0);
          k && (G.html(k), G.children().wrap("<section class='window-content'></section>"), this._element = v);
        }, g(!1, `created compact generic for "${n.name}"`, {
          sheet: m
        }), this.apps[e] = m;
    }
    return this.apps[e];
  }
  injectCellContents(t) {
    return $(t).find("[data-entity-uuid]").each((e, r) => {
      try {
        const s = r.dataset.entityUuid;
        if (!s)
          return;
        const n = `#${r.id}`, { entryId: i, dndNpc: o, dndNpcStatBlock: p } = r.dataset;
        g(!1, "gridEntry with uuid defined found", { relevantUuid: s, cellId: n, gridEntry: r }), this.getCellApplicationClass(s, n, o === "true", p === "true").then(async (h) => {
          if (g(!1, `got application for "${n}"`, {
            application: h
          }), !h)
            throw i && await this.removeEntryFromActiveGrid(i, n.replace("#", "")), new Error("no application exists to render");
          const f = h.options.classes.join(" ");
          $(r).find(".gm-screen-grid-cell-content").addClass(f), h.render(!0);
        }).catch((h) => {
          g(!0, "error trying to render a gridEntry", {
            gridEntry: r,
            cellId: n,
            relevantUuid: s,
            error: h
          });
        });
      } catch (s) {
        g(!1, "erroring", s, {
          gridEntry: r
        });
      }
    }), z(t, ".gm-screen-grid-cell", "width", "--this-cell-width"), t;
  }
  /**
   * All grids with entries hydrated with empty cells
   */
  getHydratedGrids() {
    return g(!1, "getHydratedGrids", {
      userViewableGrids: this.userViewableGrids
    }), Object.values(this.userViewableGrids).reduce((t, e) => {
      const r = e.columnOverride ?? this.columns, s = e.rowOverride ?? this.rows, n = Number(r) * Number(s) - E.getNumOccupiedCells(e), i = n > 0 ? Array.from({ length: n }).map(() => ({})) : [];
      return t[e.id] = {
        grid: e,
        gridEntries: [...Object.values(e.entries), ...i]
      }, t;
    }, {});
  }
  /**
   * @override
   */
  async _prepareContext(t) {
    const e = a().settings.get(l, c.rightMargin), r = a().settings.get(l, c.drawerWidth), s = a().settings.get(l, c.drawerHeight), n = a().settings.get(l, c.drawerOpacity), i = a().settings.get(l, c.condensedButton), o = this.getHydratedGrids(), p = Object.keys(o).indexOf(this.data.activeGridId);
    this.tabGroups[x] = p !== -1 ? this.data.activeGridId : Object.keys(o)[0], Object.keys(o).forEach((f) => {
      o[f].grid.cssClass = this.tabGroups[x] === o[f].grid.id ? "active" : "";
    });
    const h = foundry.utils.mergeObject(t, {
      grids: o,
      isGM: !!a().user?.isGM,
      condensedButton: i,
      data: this.data,
      columns: this.columns,
      rows: this.rows,
      drawerWidth: r,
      drawerHeight: s,
      rightMargin: e,
      drawerOpacity: n,
      expanded: this.expanded,
      hidden: !this.hasUserViewableGrids,
      displayDrawer: this.displayDrawer,
      darkTheme: a().settings.get("core", "uiConfig")?.colorScheme?.interface === "dark"
    });
    return h.tabs = Object.keys(o).map((f) => ({
      id: o[f].grid.id,
      group: x,
      label: o[f].grid.name,
      cssClass: o[f].grid.cssClass
    })), g(!1, "_prepareContext", {
      data: this.data,
      newAppData: h
    }), h;
  }
  async _onDrop(t) {
    if (t.stopPropagation(), !a().user?.isGM) return;
    let e;
    try {
      e = JSON.parse(t.dataTransfer.getData("text/plain"));
    } catch (p) {
      g(!1, "error parsing data from drag and drop", p);
      return;
    }
    if (g(!1, "onDrop", {
      event: t,
      data: e,
      closestGridCell: $(t.currentTarget).closest(".gm-screen-grid-cell")
    }), !["JournalEntry", "JournalEntryPage", "RollTable", "Item", "Actor"].includes(e.type))
      return;
    const r = e.pack ? `Compendium.${e.pack}.${e.uuid}` : e.uuid, s = I($(t.target).closest(".gm-screen-grid-cell")), n = `${s.x}-${s.y}`, i = await this.getRelevantGmScreenDocument(r), o = {
      ...s,
      entryId: n,
      entityUuid: r,
      type: e.type,
      isDndNpc: i instanceof Actor && typeof dnd5e < "u" && i.sheet instanceof dnd5e.applications.actor.NPCActorSheet,
      isDndNpcStatBlock: !1
    };
    this.addEntryToActiveGrid(o);
  }
}
let y;
async function H(d) {
  const t = a().settings.get(l, c.gmScreenConfig), e = N(t);
  if (!Object.keys(e).length) {
    ui.notifications?.notify(b().localize(`${u}.warnings.noGrids`), "error");
    return;
  }
  if (a().settings.get(l, c.displayDrawer) && y) {
    y.toggleGmScreenVisibility(d);
    return;
  }
  y || (y = new E());
  const s = d ?? y.state < 1, n = y.state < 1;
  try {
    s ? (n && await y.render(!0), y.minimized && y.maximize(), y.bringToFront()) : y.close();
  } catch (i) {
    g(!1, "error occurred trying to toggle the GM screen", i);
  }
}
function F() {
  y && y.refresh();
}
async function W() {
  y && await y.switchTab();
}
Handlebars.registerHelper(`${u}-switch`, function(t, e) {
  return this.switch_value = t, e.fn(this);
});
Handlebars.registerHelper(`${u}-case`, function(t, e) {
  return t === this.switch_value ? e.fn(this) : e.inverse(this);
});
Handlebars.registerHelper(
  `${u}-enrich`,
  (d) => foundry.applications.ux.TextEditor.implementation.enrichHTML(d)
);
Hooks.once("init", async () => {
  g(!0, `Initializing ${l}`), D.init(), await foundry.applications.handlebars.loadTemplates(Object.values(foundry.utils.flattenObject(S)));
});
Hooks.once("ready", async () => {
  await j(), window[l] = { migration: j }, a().settings.get(l, c.displayDrawer) && (y = new E(), y.render(!0));
  const t = a().modules.get(l);
  t && (t.api = {
    toggleGmScreenVisibility: H,
    refreshGmScreen: F,
    switchTab: W
  }), a().user?.isGM && a().settings.set(l, c.reset, !1);
});
function K(d) {
  const t = $(d), e = t.find(".header-actions"), r = `<button class="gm-screen-button">
          <i class="fas fa-book-reader"></i> ${b().localize(`${u}.gmScreen.Open`)}
      </button>`;
  e.append(r), t.find("button.gm-screen-button").on("click", (n) => {
    n.preventDefault(), H(!0);
  });
}
Hooks.on("renderJournalDirectory", (d, t) => {
  a().settings.get(l, c.displayDrawer) || K(t);
});
Hooks.once("devModeReady", ({ registerPackageDebugFlag: d }) => {
  d(l);
});
//# sourceMappingURL=foundryvtt-gmScreen.js.map
