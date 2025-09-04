const l = "gm-screen", u = "GMSCR", C = {
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
var o = /* @__PURE__ */ ((d) => (d.columns = "columns", d.displayDrawer = "display-as-drawer", d.drawerHeight = "drawer-height", d.drawerOpacity = "drawer-opacity", d.drawerWidth = "drawer-width", d.gmScreenConfig = "gm-screen-config", d.migrated = "migrated", d.condensedButton = "condensedButton", d.reset = "reset", d.rightMargin = "right-margin", d.rows = "rows", d))(o || {}), k = /* @__PURE__ */ ((d) => (d.openCloseScreen = "openCloseScreen", d.changeTab = "changeTab", d))(k || {});
const T = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?/;
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
function z(d, t) {
  return new Promise((e, n) => {
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
            n();
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
          callback: (s, i, r) => {
            const c = $(r.element), p = {
              newSpanRows: Number(c.find('[name="spanRows"]').val()),
              newSpanCols: Number(c.find('[name="spanCols"]').val())
            };
            g(!1, "dialog formValues", p), e(p);
          }
        }
      ]
    }).render({ force: !0 });
  });
}
function N(d) {
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
  const n = Number(e["grid-row-gap"].match(T)[0]), s = e["grid-template-columns"].split(" "), i = Number(s[0].match(T)[0]), r = e["grid-template-rows"].split(" "), c = Number(r[0].match(T)[0]), p = d[0].getBoundingClientRect(), h = t.getBoundingClientRect(), m = Math.floor((p.left - (h.left - n)) / (i + n)) + 1, f = Math.floor((p.top - (h.top - n)) / (c + n)) + 1;
  return g(!1, "getGridElementsPosition", {
    setup: {
      gap: n,
      cols: s,
      rows: r,
      elementBounds: p,
      gridBounds: h,
      colWidth: i,
      rowHeight: c
    },
    results: {
      elementColumn: m,
      elementRow: f
    }
  }), { y: f, x: m };
}
function R(d) {
  return a().user?.isGM ? d.grids : Object.keys(d.grids).reduce((e, n) => (d.grids[n].isShared && (e[n] = d.grids[n]), e), {});
}
function L(d, t, e, n) {
  d.find(t).each((s, i) => {
    const r = window.getComputedStyle(i)[e];
    i.style.setProperty(n, String(r));
  });
}
function I(d) {
  return async function() {
    this.cellId = d, $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const e = $(this.cellId).find(".gm-screen-grid-cell-content");
    e.removeClass().addClass(["gm-screen-grid-cell-content"]), e.html(this.form), e.find(".window-header").css("visibility", "hidden");
  };
}
function E() {
  return this;
}
async function j() {
  if (!a().user?.isGM) return;
  const d = "2.0.1", t = a().settings.get(l, o.migrated);
  if (t.status && (foundry.utils.isNewerVersion(a().modules.get(l)?.version ?? "0", d) || t.version === d))
    return;
  ui.notifications?.notify("GM Screen | Beginning Migration to updated schema.", "info");
  const e = a().settings.get(l, o.gmScreenConfig);
  if (e?.grid?.entries && Array.isArray(e.grid.entries)) {
    const n = e.grid.entries.reduce((i, r) => {
      const c = `${r.x}-${r.y}`;
      return i[c] = {
        ...r,
        entryId: c
      }, i;
    }, {}), s = {
      activeGridId: "default",
      grids: {
        default: {
          ...e.grid,
          entries: n,
          id: "default",
          name: "Main",
          isShared: !1,
          cssClass: "active"
        }
      }
    };
    g(!0, "migration output", {
      output: s
    }), await a().settings.set(l, o.gmScreenConfig, s);
  }
  ui.notifications?.notify("GM Screen | Migration Complete.", "info"), await a().settings.set(l, o.migrated, { status: !0, version: d });
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
class v extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  static init() {
    a().settings.registerMenu(l, "menu", {
      name: `${u}.settings.${o.gmScreenConfig}.Name`,
      label: `${u}.settings.${o.gmScreenConfig}.Label`,
      icon: "fas fa-table",
      type: v,
      restricted: !0,
      hint: `${u}.settings.${o.gmScreenConfig}.Hint`
    }), a().settings.register(l, o.gmScreenConfig, {
      default: A,
      scope: "world",
      config: !1,
      onChange(...t) {
        g(!1, "gmScreenConfig changed", {
          args: t,
          currentConfig: { ...a().settings.get(l, o.gmScreenConfig) }
        }), a().modules.get(l)?.api?.refreshGmScreen();
      }
    }), a().settings.register(l, o.migrated, {
      config: !1,
      default: { status: !1, version: "1.2.2" },
      scope: "world",
      type: Object
    }), a().settings.register(l, o.columns, {
      name: `${u}.settings.${o.columns}.Name`,
      default: 4,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${u}.settings.${o.columns}.Hint`
    }), a().settings.register(l, o.rows, {
      name: `${u}.settings.${o.rows}.Name`,
      default: 3,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${u}.settings.${o.rows}.Hint`
    }), a().settings.register(l, o.displayDrawer, {
      name: `${u}.settings.${o.displayDrawer}.Name`,
      default: !0,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${u}.settings.${o.displayDrawer}.Hint`,
      onChange: () => window.location.reload()
    }), a().settings.register(l, o.rightMargin, {
      name: `${u}.settings.${o.rightMargin}.Name`,
      default: 0,
      type: Number,
      scope: "client",
      range: { min: 0, max: 75, step: 5 },
      config: !0,
      hint: `${u}.settings.${o.rightMargin}.Hint`
    }), a().settings.register(l, o.drawerWidth, {
      name: `${u}.settings.${o.drawerWidth}.Name`,
      default: 100,
      type: Number,
      scope: "client",
      range: { min: 25, max: 100, step: 1 },
      config: !0,
      hint: `${u}.settings.${o.drawerWidth}.Hint`
    }), a().settings.register(l, o.drawerHeight, {
      name: `${u}.settings.${o.drawerHeight}.Name`,
      default: 60,
      type: Number,
      scope: "client",
      range: { min: 10, max: 90, step: 1 },
      config: !0,
      hint: `${u}.settings.${o.drawerHeight}.Hint`
    }), a().settings.register(l, o.drawerOpacity, {
      name: `${u}.settings.${o.drawerOpacity}.Name`,
      default: 1,
      type: Number,
      scope: "client",
      range: { min: 0.1, max: 1, step: 0.05 },
      config: !0,
      hint: `${u}.settings.${o.drawerOpacity}.Hint`
    }), a().settings.register(l, o.condensedButton, {
      name: `${u}.settings.${o.condensedButton}.Name`,
      default: !1,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${u}.settings.${o.condensedButton}.Hint`
    }), a().settings.register(l, o.reset, {
      name: `${u}.settings.${o.reset}.Name`,
      default: !1,
      type: Boolean,
      scope: "world",
      config: !0,
      hint: `${u}.settings.${o.reset}.Hint`,
      onChange: (t) => {
        t && a().settings.set(l, o.gmScreenConfig, A);
      }
    }), a().keybindings?.register(l, k.openCloseScreen, {
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
    }), a().keybindings?.register(l, k.changeTab, {
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
      template: C.settings
    }
  };
  static DEFAULT_OPTIONS = {
    id: "gm-screen-tabs-config",
    classes: ["gm-screen-config"],
    height: "auto",
    width: 600,
    tag: "form",
    form: {
      handler: v.#e,
      submitOnClose: !1,
      submitOnChange: !1,
      closeOnSubmit: !0
    }
  };
  get title() {
    return b().localize(`${u}.gridConfig.GridConfig`);
  }
  get rows() {
    return a().settings.get(l, o.rows);
  }
  get columns() {
    return a().settings.get(l, o.columns);
  }
  get settingsData() {
    const t = a().settings.get(l, o.gmScreenConfig);
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
    t.on("dragstart", (n) => {
      e = n.target;
    }), t.on("dragover", (n) => {
      if (!e)
        return;
      const s = $(n.target).parents("tbody tr")[0];
      if (!s)
        return;
      const i = Array.from($(n.target).parents("tbody").children());
      i.indexOf(s) > i.indexOf(e) ? s.after(e) : s.before(e);
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
      const { table: i } = s.data(), r = $(t).find("tbody"), c = {
        gridId: foundry.utils.randomID(),
        grid: {
          name: "",
          columnOverride: "",
          rowOverride: ""
        },
        defaultColumns: this.columns,
        defaultRows: this.rows
      }, p = $(
        await foundry.applications.handlebars.renderTemplate(C[i].tableRow, c)
      );
      r.append(p), this.setPosition({});
    }, n = (s) => {
      g(!1, "delete row clicked", {
        currentTarget: s
      }), s.parentsUntil("tbody").remove(), this.setPosition({});
    };
    this._dragListeners(t), t.on("click", (s) => {
      const i = $(s.target).closest("button")[0];
      if (!i)
        return;
      const r = $(i);
      g(!1, "a button was clicked", { e: s, currentTarget: i }), r.hasClass("add-row") && e(r), r.hasClass("delete-row") && n(r);
    });
  }
  // grids: {
  //   default: {
  //     name: 'Main',
  //     id: 'default',
  //     entries: {},
  //   },
  // },
  static async #e(t, e, n) {
    const s = a().settings.get(l, o.gmScreenConfig), i = foundry.utils.expandObject(n.object);
    if (g(!1, {
      formData: n,
      data: i
    }), Object.keys(i).length === 0)
      throw ui.notifications?.error(b().localize(`${u}.gridConfig.errors.empty`)), new Error("Cannot save the grid with no tabs.");
    const r = Object.keys(i.grids), c = r.reduce((m, f) => {
      const w = i.grids[f];
      return Object.hasOwn(s.grids, f) ? (m[f] = {
        ...s.grids[f],
        ...w
      }, m) : (m[f] = {
        ...w,
        entries: {},
        name: w.name ?? "",
        isShared: w.isShared ?? !1,
        id: f
      }, m);
    }, {}), p = r.includes(s.activeGridId) ? s.activeGridId : r[0], h = {
      ...s,
      grids: c,
      activeGridId: p
    };
    g(!0, "setting settings", {
      newGmScreenConfig: h
    }), await a().settings.set(l, o.gmScreenConfig, h), a().modules.get("gm-screen")?.api?.refreshGmScreen();
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
  _replaceHTML(t, e, n) {
    if (super._replaceHTML(t, e, n), !this.form)
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
  _replaceHTML(t, e, n) {
    if (super._replaceHTML(t, e, n), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
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
  _replaceHTML(t, e, n) {
    if (super._replaceHTML(t, e, n), !this.form)
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
class O extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  expanded;
  data;
  apps;
  // used to allow players to switch tabs
  currentTab;
  constructor(t = {}) {
    super(t), this.expanded = !1, this.data = a().settings.get(l, o.gmScreenConfig), this.apps = {}, this.currentTab = this.data.activeGridId;
    const e = a().settings.get(l, o.columns), n = a().settings.get(l, o.rows), s = a().settings.get(l, o.displayDrawer), i = {
      window: {
        ...this.options.window,
        resizable: !1,
        frame: !1
      }
    }, r = [
      {
        action: "clearGrid",
        label: b().localize(`${u}.gmScreen.Reset`),
        class: "clear",
        icon: "fas fa-ban",
        onClick: () => this.handleClear.bind(this)()
      }
    ], c = {
      classes: ["window-app", "gm-screen-popOut"],
      width: Number(e) * 400,
      height: Number(n) * 300,
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
          ...a().user?.isGM ? r : []
        ]
      }
    };
    g(!1, {
      displayDrawer: s,
      options: s ? i : c
    }), this.options = {
      ...this.options,
      ...s ? i : c
    };
  }
  static PARTS = {
    tabs: {
      template: C.screenTabs
    },
    content: {
      template: C.screenContent
    }
  };
  static DEFAULT_OPTIONS = {
    id: "gm-screen-app"
  };
  get rows() {
    return a().settings.get(l, o.rows);
  }
  get columns() {
    return a().settings.get(l, o.columns);
  }
  get displayDrawer() {
    return a().settings.get(l, o.displayDrawer);
  }
  get userViewableGrids() {
    return R(this.data);
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
    return Object.values(t.entries).reduce((e, n) => {
      const s = (n.spanCols || 1) * (n.spanRows || 1);
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
    await a().settings.set(l, o.gmScreenConfig, e);
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
    const n = {
      ...this.activeGrid,
      entries: e
    };
    g(!1, "addEntryToActiveGrid", {
      activeGridData: this.activeGrid,
      newEntries: e,
      newEntry: t,
      newGridData: n
    }), this.setGridData(n);
  }
  /**
   * Remove a given entry from the Active Grid
   * @param {string} entryId - entry to remove from the active grid's entries
   */
  async removeEntryFromActiveGrid(t, e) {
    const n = foundry.utils.deepClone(this.activeGrid.entries[t]), s = n.spanCols || n.spanRows, i = {
      ...this.activeGrid.entries
    };
    if (s ? (delete n.entityUuid, delete n.type, i[t] = n) : delete i[t], e) {
      const c = `#${e}`;
      await this.apps[c]?.close(), delete this.apps[c];
    }
    const r = {
      ...this.activeGrid,
      entries: i
    };
    this.setGridData(r);
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
    const n = t.find(".gm-screen-tabs");
    n.on("dragstart", ".item", (s) => {
      e = s.target;
    }), n.on("dragover", (s) => {
      if (!e)
        return;
      const i = Array.from($(s.target).closest(".gm-screen-tabs").children());
      i.indexOf(s.target) > i.indexOf(e) ? s.target.after(e) : s.target.before(e);
    }), n.on("dragend", async (s) => {
      if (!e)
        return;
      const i = foundry.utils.deepClone(this.data);
      i.grids = {}, $(s.target).closest(".gm-screen-tabs").children().each((r, c) => {
        const p = $(c).attr("data-tab");
        p && (i.grids[p] = this.data.grids[p]);
      }), e = void 0, await a().settings.set(l, o.gmScreenConfig, i);
    });
  }
  async handleClickEvent(t) {
    t.preventDefault();
    const e = t.currentTarget.dataset.action, n = $(t.currentTarget).parents("[data-entity-uuid]")?.data()?.entityUuid, s = $(t.currentTarget).parents("[data-entry-id]")?.data()?.entryId, i = $(t.currentTarget).parents("[data-entry-id]")?.attr("id");
    switch (g(!1, "handleClickEvent", {
      e: t,
      action: e
    }), e) {
      case "clearCell": {
        if (!s)
          return;
        this.removeEntryFromActiveGrid(s, i);
        break;
      }
      case "clearGrid": {
        this.handleClear();
        break;
      }
      case "configureCell": {
        try {
          const { x: r, y: c } = N($(t.target).parent()), p = this.activeGrid.entries[s] || {
            x: r,
            y: c,
            entryId: `${r}-${c}`
          };
          g(!1, "configureCell cellToConfigure", p);
          const { newSpanRows: h, newSpanCols: m } = await z(p, {
            rows: this.rows,
            columns: this.columns
          });
          g(!1, "new span values from dialog", {
            newSpanRows: h,
            newSpanCols: m
          });
          const f = {
            ...p,
            spanRows: h,
            spanCols: m
          }, w = {
            ...this.activeGrid.entries,
            [f.entryId]: f
          }, G = [...Array(f.spanCols).keys()].map((D, M) => {
            const _ = f.x + M;
            return [...Array(f.spanRows).keys()].map((Y, P) => {
              const V = f.y + P;
              return `${_}-${V}`;
            });
          }).flat();
          g(!1, {
            problemCoordinates: G
          }), Object.values(w).forEach((D) => {
            G.includes(D.entryId) && D.entryId !== f.entryId && delete w[D.entryId];
          }), g(!1, "newEntries", w);
          const S = {
            ...this.activeGrid,
            entries: w
          };
          this.setGridData(S);
        } catch (r) {
          g(!1, "User exited configure cell Dialog.", r);
        }
        break;
      }
      case "open": {
        if (!n)
          return;
        try {
          const r = await this.getRelevantGmScreenDocument(n), c = r?.sheet;
          if (g(!1, "trying to edit entity", { relevantEntitySheet: c }), !c)
            return;
          if (c.rendered) {
            c.maximize(), c.bringToTop();
            return;
          }
          if (r instanceof JournalEntryPage && r.type === "image") {
            new foundry.applications.apps.ImagePopout({
              src: c.options.document.src,
              uuid: n,
              window: { title: r.name }
            }).render({ force: !0 });
            return;
          }
          c.render(!0);
        } catch (r) {
          g(!0, "error opening entity sheet", r);
        }
        break;
      }
      case "refresh": {
        this.refresh();
        break;
      }
      case "tab": {
        const r = t.currentTarget.dataset.tab;
        if (this.currentTab = r ?? this.currentTab, !a().user?.isGM || r === this.data.activeGridId || !r)
          return;
        g(!1, "trying to set active grid", { newActiveGridId: r });
        try {
          const c = {
            ...this.data,
            activeGridId: r
          };
          await a().settings.set(l, o.gmScreenConfig, c);
        } catch (c) {
          g(!0, "error setting active tab", c);
        }
        break;
      }
      case "toggle-gm-screen": {
        try {
          this.toggleGmScreenVisibility();
        } catch (r) {
          g(!0, "error toggling GM Screen", r);
        }
        break;
      }
    }
  }
  async switchTab() {
    const t = Object.keys(this.userViewableGrids);
    if (t.length <= 1)
      return;
    const e = a().user?.isGM, s = (t.indexOf(e ? this.data.activeGridId : this.currentTab) + 1) % t.length, i = t[s];
    g(!1, "trying to set active grid", { newActiveGridId: i });
    try {
      if (this.changeTab(i, x), this.currentTab = i, !e)
        return;
      const r = {
        ...this.data,
        activeGridId: i
      };
      await a().settings.set(l, o.gmScreenConfig, r);
    } catch (r) {
      g(!0, "error setting active tab", r);
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
      await foundry.applications.handlebars.renderTemplate(C.screen, await this._prepareContext(this.options))
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
    const t = a().settings.get(l, o.gmScreenConfig), e = foundry.utils.deepClone(this.data), n = foundry.utils.diffObject(e, t);
    if (g(!1, "refreshing gm screen", {
      newData: foundry.utils.deepClone(t),
      data: e,
      diffData: n
    }), this.data = t, Object.keys(n).length) {
      if (Object.keys(n).every((m) => m === "activeGridId") || Object.values(n.grids || {}).every((m) => Object.keys(m).every((f) => f === "cssClass"))) {
        g(!1, "not rerendering because only activeGridId changed or cssClass changed");
        return;
      }
      const s = Object.keys(n?.grids ?? {}), i = Object.keys(this.userViewableGrids), r = Object.keys(R(e)), c = !s.filter((m) => i.includes(m)).length, p = i.length === r.length && i.every((m) => r.includes(m)), h = c && p;
      if (g(!1, "gridIdChecks", {
        diffGridIds: s,
        myOldGridIds: r,
        myNewGridIds: i,
        diffOverlapsNewGridIds: c,
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
      await new v({}).render({ force: !0 });
    }), !this.hasUserViewableGrids)
      return;
    this.injectCellContents(e), this.updateClassesAndFixButtons();
    const n = document.querySelector(".gm-screen-grid");
    if (!n)
      return;
    const r = getComputedStyle(n)["grid-template-columns"].split(" ")[0];
    $(e).find(".gm-screen-grid").each((c, p) => {
      p.style.setProperty("--grid-cell-width", r);
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
  async getCellApplicationClass(t, e) {
    const n = await this.getRelevantGmScreenDocument(t);
    if (!n) {
      await this.apps[e]?.close(), delete this.apps[e], console.warn("One of the grid cells tried to render an entity that does not exist.", t);
      return;
    }
    this.apps[e] && this.apps[e]?.document.uuid !== t && (await this.apps[e].close(), delete this.apps[e]);
    const { sheet: s } = n, i = s?.constructor;
    if (this.apps[e] && this.apps[e].constructor.name !== i?.name && (await this.apps[e].close(), delete this.apps[e]), this.apps[e] && this.apps[e].constructor.name === i?.name)
      return g(!1, `using cached application instance for "${n.name}"`, {
        entityUuid: t,
        app: this.apps[e]
      }), this.apps[e];
    if (g(!1, "relevantEntity sheet", {
      sheet: s,
      name: i?.name
    }), !i) {
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
      case (s instanceof foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet && n instanceof JournalEntryPage && s.options.document.type === "text"):
        g(!1, `creating compact JournalEntryPage for "${n.name}"`, {
          cellId: e
        });
        const r = new i({
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
        r._postRender = async function() {
          this.cellId = e, $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
          const f = $(this.cellId).find(".gm-screen-grid-cell-content");
          f.removeClass().addClass(["gm-screen-grid-cell-content"]), f.html(this.form), f.children().wrapInner("<section class='journal-entry-content journal-entry-page overflow-y'></section>"), f.find(".window-header").remove();
        }, r.close = E, this.apps[e] = r;
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
      case (s instanceof foundry.applications.sheets.ActorSheetV2 && n instanceof Actor):
        g(!1, `creating ActorSheetV2 for "${n.name}"`, {
          cellId: e
        });
        const c = new i({
          ...s.options,
          id: `gmscreen-actor-${s.document.id}`,
          classes: [],
          document: n,
          window: {
            ...s.options.window,
            frame: !0,
            positioned: !1,
            resizable: !1
          }
        });
        c._postRender = I(e), c.close = E, this.apps[e] = c;
        break;
      case (s instanceof foundry.applications.api.DocumentSheetV2 && n instanceof Item):
        g(!1, `creating ItemSheetV2 for "${n.name}"`, {
          cellId: e
        });
        const p = new i({
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
        p._postRender = I(e), p.close = E, this.apps[e] = p;
        break;
      default:
        g(!1, `creating compact generic for "${n.name}"`, {
          cellId: e
        });
        const h = new i(n, {
          ...s.options,
          width: "100%",
          height: "100%",
          positioned: !1,
          resizable: !1
        });
        h.options.editable = !1, h.options.popOut = !1, h.cellId = e, h._injectHTML = function(f) {
          $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
          const w = $(this.cellId).find(".gm-screen-grid-cell-content");
          g(!1, "CompactEntitySheet overwritten _injectHTML", {
            targetElement: w,
            gridCellContent: w,
            cellId: this.cellId,
            html: f
          }), w.append(f), w.children().wrap("<section class='window-content'></section>"), this._element = f;
        }, h._replaceHTML = function(f, w) {
          $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
          const G = $(this.cellId).find(".gm-screen-grid-cell-content"), S = w.get(0);
          S && (G.html(S), G.children().wrap("<section class='window-content'></section>"), this._element = w);
        }, g(!1, `created compact generic for "${n.name}"`, {
          sheet: h
        }), this.apps[e] = h;
    }
    return this.apps[e];
  }
  injectCellContents(t) {
    return $(t).find("[data-entity-uuid]").each((e, n) => {
      try {
        const s = n.dataset.entityUuid;
        if (!s)
          return;
        const i = `#${n.id}`, { entryId: r } = n.dataset;
        g(!1, "gridEntry with uuid defined found", { relevantUuid: s, cellId: i, gridEntry: n }), this.getCellApplicationClass(s, i).then(async (c) => {
          if (g(!1, `got application for "${i}"`, {
            application: c
          }), !c)
            throw r && await this.removeEntryFromActiveGrid(r, i.replace("#", "")), new Error("no application exists to render");
          const p = c.options.classes.join(" ");
          $(n).find(".gm-screen-grid-cell-content").addClass(p), c.render(!0);
        }).catch((c) => {
          g(!0, "error trying to render a gridEntry", {
            gridEntry: n,
            cellId: i,
            relevantUuid: s,
            error: c
          });
        });
      } catch (s) {
        g(!1, "erroring", s, {
          gridEntry: n
        });
      }
    }), L(t, ".gm-screen-grid-cell", "width", "--this-cell-width"), t;
  }
  /**
   * All grids with entries hydrated with empty cells
   */
  getHydratedGrids() {
    return g(!1, "getHydratedGrids", {
      userViewableGrids: this.userViewableGrids
    }), Object.values(this.userViewableGrids).reduce((t, e) => {
      const n = e.columnOverride ?? this.columns, s = e.rowOverride ?? this.rows, i = Number(n) * Number(s) - O.getNumOccupiedCells(e), r = i > 0 ? Array.from({ length: i }).map(() => ({})) : [];
      return t[e.id] = {
        grid: e,
        gridEntries: [...Object.values(e.entries), ...r]
      }, t;
    }, {});
  }
  /**
   * @override
   */
  async _prepareContext(t) {
    const e = a().settings.get(l, o.rightMargin), n = a().settings.get(l, o.drawerWidth), s = a().settings.get(l, o.drawerHeight), i = a().settings.get(l, o.drawerOpacity), r = a().settings.get(l, o.condensedButton), c = this.getHydratedGrids(), p = Object.keys(c).indexOf(this.data.activeGridId);
    this.tabGroups[x] = p !== -1 ? this.data.activeGridId : Object.keys(c)[0], Object.keys(c).forEach((m) => {
      c[m].grid.cssClass = this.tabGroups[x] === c[m].grid.id ? "active" : "";
    });
    const h = foundry.utils.mergeObject(t, {
      grids: c,
      isGM: !!a().user?.isGM,
      condensedButton: r,
      data: this.data,
      columns: this.columns,
      rows: this.rows,
      drawerWidth: n,
      drawerHeight: s,
      rightMargin: e,
      drawerOpacity: i,
      expanded: this.expanded,
      hidden: !this.hasUserViewableGrids,
      displayDrawer: this.displayDrawer,
      darkTheme: a().settings.get("core", "uiConfig")?.colorScheme?.interface === "dark"
    });
    return h.tabs = Object.keys(c).map((m) => ({
      id: c[m].grid.id,
      group: x,
      label: c[m].grid.name,
      cssClass: c[m].grid.cssClass
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
    } catch (c) {
      g(!1, "error parsing data from drag and drop", c);
      return;
    }
    if (g(!1, "onDrop", {
      event: t,
      data: e,
      closestGridCell: $(t.currentTarget).closest(".gm-screen-grid-cell")
    }), !["JournalEntry", "JournalEntryPage", "RollTable", "Item", "Actor"].includes(e.type))
      return;
    const n = e.pack ? `Compendium.${e.pack}.${e.uuid}` : e.uuid, s = N($(t.target).closest(".gm-screen-grid-cell")), i = `${s.x}-${s.y}`, r = {
      ...s,
      entryId: i,
      entityUuid: n,
      type: e.type
    };
    this.addEntryToActiveGrid(r);
  }
}
let y;
async function H(d) {
  const t = a().settings.get(l, o.gmScreenConfig), e = R(t);
  if (!Object.keys(e).length) {
    ui.notifications?.notify(b().localize(`${u}.warnings.noGrids`), "error");
    return;
  }
  if (a().settings.get(l, o.displayDrawer) && y) {
    y.toggleGmScreenVisibility(d);
    return;
  }
  y || (y = new O());
  const s = d ?? y.state < 1, i = y.state < 1;
  try {
    s ? (i && await y.render(!0), y.minimized && y.maximize(), y.bringToFront()) : y.close();
  } catch (r) {
    g(!1, "error occurred trying to toggle the GM screen", r);
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
  g(!0, `Initializing ${l}`), v.init(), await foundry.applications.handlebars.loadTemplates(Object.values(foundry.utils.flattenObject(C)));
});
Hooks.once("ready", async () => {
  await j(), window[l] = { migration: j }, a().settings.get(l, o.displayDrawer) && (y = new O(), y.render(!0));
  const t = a().modules.get(l);
  t && (t.api = {
    toggleGmScreenVisibility: H,
    refreshGmScreen: F,
    switchTab: W
  }), a().user?.isGM && a().settings.set(l, o.reset, !1);
});
function K(d) {
  const t = $(d), e = t.find(".header-actions"), n = `<button class="gm-screen-button">
          <i class="fas fa-book-reader"></i> ${b().localize(`${u}.gmScreen.Open`)}
      </button>`;
  e.append(n), t.find("button.gm-screen-button").on("click", (i) => {
    i.preventDefault(), H(!0);
  });
}
Hooks.on("renderJournalDirectory", (d, t) => {
  a().settings.get(l, o.displayDrawer) || K(t);
});
Hooks.once("devModeReady", ({ registerPackageDebugFlag: d }) => {
  d(l);
});
//# sourceMappingURL=foundryvtt-gmScreen.js.map
