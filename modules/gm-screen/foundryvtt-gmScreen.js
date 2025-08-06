const l = "gm-screen", p = "GMSCR", C = {
  settings: `modules/${l}/templates/settings.hbs`,
  screen: `modules/${l}/templates/screen.hbs`,
  screenContent: `modules/${l}/templates/parts/screen-content.hbs`,
  screenTabs: `modules/${l}/templates/parts/screen-tabs.hbs`,
  screenCell: `modules/${l}/templates/parts/screen-cell.hbs`,
  screenGrid: `modules/${l}/templates/parts/screen-grid.hbs`,
  grids: {
    tableRow: `modules/${l}/templates/parts/settings-grid-config-table-row.hbs`
  }
};
var a = /* @__PURE__ */ ((g) => (g.columns = "columns", g.displayDrawer = "display-as-drawer", g.drawerHeight = "drawer-height", g.drawerOpacity = "drawer-opacity", g.drawerWidth = "drawer-width", g.gmScreenConfig = "gm-screen-config", g.migrated = "migrated", g.condensedButton = "condensedButton", g.reset = "reset", g.rightMargin = "right-margin", g.rows = "rows", g))(a || {});
const D = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?/;
function c() {
  if (!(game instanceof foundry.Game))
    throw new Error("game is not initialized yet!");
  return game;
}
function y() {
  const { i18n: g } = c();
  return g || {
    localize: (t) => t
  };
}
function d(g, ...t) {
  (g || c().modules.get("_dev-mode")?.api?.getPackageDebugValue(l)) && console.log(l, "|", ...t);
}
function I(g, t) {
  return new Promise((e, s) => {
    new foundry.applications.api.DialogV2({
      window: { title: y().localize(`${p}.cellConfigDialog.CellConfig`) },
      modal: !0,
      content: `
    <div class="form-group">
      <label for="spanRows">${y().localize(`${p}.cellConfigDialog.RowSpan`)}</label>
      <input type="number" step="1" name="spanRows" id="spanRows" min="1" max="${t.rows + 1 - g.y}" value="${g.spanRows || 1}">
    </div>
    <div class="form-group">
      <label for="spanCols">${y().localize(`${p}.cellConfigDialog.ColSpan`)}</label>
      <input type="number" step="1" name="spanCols" id="spanCols" min="1" max="${t.columns + 1 - g.x}" value="${g.spanCols || 1}">
    </div>  
`,
      buttons: [
        {
          action: "no",
          icon: "fas fa-times",
          label: y().localize("Cancel"),
          callback: () => {
            s();
          }
        },
        {
          action: "reset",
          icon: "fas fa-undo",
          label: y().localize("Default"),
          callback: () => {
            const n = {
              newSpanRows: 1,
              newSpanCols: 1
            };
            d(!1, "dialog formValues", n), e(n);
          }
        },
        {
          action: "yes",
          icon: "fas fa-check",
          label: y().localize("Submit"),
          default: !0,
          callback: (n, i, r) => {
            const o = $(r.element), u = {
              newSpanRows: Number(o.find('[name="spanRows"]').val()),
              newSpanCols: Number(o.find('[name="spanCols"]').val())
            };
            d(!1, "dialog formValues", u), e(u);
          }
        }
      ]
    }).render({ force: !0 });
  });
}
function x(g) {
  const t = g.parents(".gm-screen-grid")[0], e = window.getComputedStyle(t);
  d(!1, "getGridElementsPosition", {
    element: g,
    relevantGridElement: t,
    vanillaGridElementStyles: e,
    gap: e.gap,
    // wtf this is '' in firefox
    gridRowGap: e["grid-row-gap"],
    gridColGap: e["grid-column-gap"]
  });
  const s = Number(e["grid-row-gap"].match(D)[0]), n = e["grid-template-columns"].split(" "), i = Number(n[0].match(D)[0]), r = e["grid-template-rows"].split(" "), o = Number(r[0].match(D)[0]), u = g[0].getBoundingClientRect(), f = t.getBoundingClientRect(), h = Math.floor((u.left - (f.left - s)) / (i + s)) + 1, m = Math.floor((u.top - (f.top - s)) / (o + s)) + 1;
  return d(!1, "getGridElementsPosition", {
    setup: {
      gap: s,
      cols: n,
      rows: r,
      elementBounds: u,
      gridBounds: f,
      colWidth: i,
      rowHeight: o
    },
    results: {
      elementColumn: h,
      elementRow: m
    }
  }), { y: m, x: h };
}
function E(g) {
  return c().user?.isGM ? g.grids : Object.keys(g.grids).reduce((e, s) => (g.grids[s].isShared && (e[s] = g.grids[s]), e), {});
}
function j(g, t, e, s) {
  g.find(t).each((n, i) => {
    const r = window.getComputedStyle(i)[e];
    i.style.setProperty(s, String(r));
  });
}
async function T() {
  if (!c().user?.isGM) return;
  const g = "2.0.1", t = c().settings.get(l, a.migrated);
  if (t.status && (foundry.utils.isNewerVersion(c().modules.get(l)?.version ?? "0", g) || t.version === g))
    return;
  ui.notifications?.notify("GM Screen | Beginning Migration to updated schema.", "info");
  const e = c().settings.get(l, a.gmScreenConfig);
  if (e?.grid?.entries && Array.isArray(e.grid.entries)) {
    const s = e.grid.entries.reduce((i, r) => {
      const o = `${r.x}-${r.y}`;
      return i[o] = {
        ...r,
        entryId: o
      }, i;
    }, {}), n = {
      activeGridId: "default",
      grids: {
        default: {
          ...e.grid,
          entries: s,
          id: "default",
          name: "Main",
          isShared: !1,
          cssClass: "active"
        }
      }
    };
    d(!0, "migration output", {
      output: n
    }), await c().settings.set(l, a.gmScreenConfig, n);
  }
  ui.notifications?.notify("GM Screen | Migration Complete.", "info"), await c().settings.set(l, a.migrated, { status: !0, version: g });
}
const k = {
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
    c().settings.registerMenu(l, "menu", {
      name: `${p}.settings.${a.gmScreenConfig}.Name`,
      label: `${p}.settings.${a.gmScreenConfig}.Label`,
      icon: "fas fa-table",
      type: v,
      restricted: !0,
      hint: `${p}.settings.${a.gmScreenConfig}.Hint`
    }), c().settings.register(l, a.gmScreenConfig, {
      default: k,
      scope: "world",
      config: !1,
      onChange(...t) {
        d(!1, "gmScreenConfig changed", {
          args: t,
          currentConfig: { ...c().settings.get(l, a.gmScreenConfig) }
        }), c().modules.get(l)?.api?.refreshGmScreen();
      }
    }), c().settings.register(l, a.migrated, {
      config: !1,
      default: { status: !1, version: "1.2.2" },
      scope: "world",
      type: Object
    }), c().settings.register(l, a.columns, {
      name: `${p}.settings.${a.columns}.Name`,
      default: 4,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${p}.settings.${a.columns}.Hint`
    }), c().settings.register(l, a.rows, {
      name: `${p}.settings.${a.rows}.Name`,
      default: 3,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${p}.settings.${a.rows}.Hint`
    }), c().settings.register(l, a.displayDrawer, {
      name: `${p}.settings.${a.displayDrawer}.Name`,
      default: !0,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${p}.settings.${a.displayDrawer}.Hint`,
      onChange: () => window.location.reload()
    }), c().settings.register(l, a.rightMargin, {
      name: `${p}.settings.${a.rightMargin}.Name`,
      default: 0,
      type: Number,
      scope: "client",
      range: { min: 0, max: 75, step: 5 },
      config: !0,
      hint: `${p}.settings.${a.rightMargin}.Hint`
    }), c().settings.register(l, a.drawerWidth, {
      name: `${p}.settings.${a.drawerWidth}.Name`,
      default: 100,
      type: Number,
      scope: "client",
      range: { min: 25, max: 100, step: 1 },
      config: !0,
      hint: `${p}.settings.${a.drawerWidth}.Hint`
    }), c().settings.register(l, a.drawerHeight, {
      name: `${p}.settings.${a.drawerHeight}.Name`,
      default: 60,
      type: Number,
      scope: "client",
      range: { min: 10, max: 90, step: 1 },
      config: !0,
      hint: `${p}.settings.${a.drawerHeight}.Hint`
    }), c().settings.register(l, a.drawerOpacity, {
      name: `${p}.settings.${a.drawerOpacity}.Name`,
      default: 1,
      type: Number,
      scope: "client",
      range: { min: 0.1, max: 1, step: 0.05 },
      config: !0,
      hint: `${p}.settings.${a.drawerOpacity}.Hint`
    }), c().settings.register(l, a.condensedButton, {
      name: `${p}.settings.${a.condensedButton}.Name`,
      default: !1,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${p}.settings.${a.condensedButton}.Hint`
    }), c().settings.register(l, a.reset, {
      name: `${p}.settings.${a.reset}.Name`,
      default: !1,
      type: Boolean,
      scope: "world",
      config: !0,
      hint: `${p}.settings.${a.reset}.Hint`,
      onChange: (t) => {
        t && c().settings.set(l, a.gmScreenConfig, k);
      }
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
    return y().localize(`${p}.gridConfig.GridConfig`);
  }
  get rows() {
    return c().settings.get(l, a.rows);
  }
  get columns() {
    return c().settings.get(l, a.columns);
  }
  get settingsData() {
    const t = c().settings.get(l, a.gmScreenConfig);
    return d(!1, "getSettingsData", {
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
    return d(!1, e), e;
  }
  _dragListeners(t) {
    let e;
    t.on("dragstart", (s) => {
      e = s.target;
    }), t.on("dragover", (s) => {
      if (!e)
        return;
      const n = $(s.target).parents("tbody tr")[0];
      if (!n)
        return;
      const i = Array.from($(s.target).parents("tbody").children());
      i.indexOf(n) > i.indexOf(e) ? n.after(e) : n.before(e);
    }), t.on("dragend", () => {
      e = void 0;
    });
  }
  async _onRender() {
    const t = $(this.element);
    d(!1, "activateListeners", {
      html: t
    });
    const e = async (n) => {
      d(!1, "add row clicked", {
        data: n.data()
      });
      const { table: i } = n.data(), r = $(t).find("tbody"), o = {
        gridId: foundry.utils.randomID(),
        grid: {
          name: "",
          columnOverride: "",
          rowOverride: ""
        },
        defaultColumns: this.columns,
        defaultRows: this.rows
      }, u = $(
        await foundry.applications.handlebars.renderTemplate(C[i].tableRow, o)
      );
      r.append(u), this.setPosition({});
    }, s = (n) => {
      d(!1, "delete row clicked", {
        currentTarget: n
      }), n.parentsUntil("tbody").remove(), this.setPosition({});
    };
    this._dragListeners(t), t.on("click", (n) => {
      const i = $(n.target).closest("button")[0];
      if (!i)
        return;
      const r = $(i);
      d(!1, "a button was clicked", { e: n, currentTarget: i }), r.hasClass("add-row") && e(r), r.hasClass("delete-row") && s(r);
    });
  }
  // grids: {
  //   default: {
  //     name: 'Main',
  //     id: 'default',
  //     entries: {},
  //   },
  // },
  static async #e(t, e, s) {
    const n = c().settings.get(l, a.gmScreenConfig), i = foundry.utils.expandObject(s.object);
    if (d(!1, {
      formData: s,
      data: i
    }), Object.keys(i).length === 0)
      throw ui.notifications?.error(y().localize(`${p}.gridConfig.errors.empty`)), new Error("Cannot save the grid with no tabs.");
    const r = Object.keys(i.grids), o = r.reduce((h, m) => {
      const b = i.grids[m];
      return Object.hasOwn(n.grids, m) ? (h[m] = {
        ...n.grids[m],
        ...b
      }, h) : (h[m] = {
        ...b,
        entries: {},
        name: b.name ?? "",
        isShared: b.isShared ?? !1,
        id: m
      }, h);
    }, {}), u = r.includes(n.activeGridId) ? n.activeGridId : r[0], f = {
      ...n,
      grids: o,
      activeGridId: u
    };
    d(!0, "setting settings", {
      newGmScreenConfig: f
    }), await c().settings.set(l, a.gmScreenConfig, f), c().modules.get("gm-screen")?.api?.refreshGmScreen();
  }
}
class V extends foundry.applications.sheets.RollTableSheet {
  cellId;
  constructor(t) {
    super(t), d(!1, "CompactRollTableDisplay constructor", {
      options: t
    }), this.cellId = t.cellId;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(t, e, s) {
    if (super._replaceHTML(t, e, s), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const n = $(this.cellId).find(".gm-screen-grid-cell-content");
    n.html(this.form), n.find(".window-header").remove(), this.setPosition({
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
}
class L extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet {
  cellId;
  constructor(t) {
    super(t), this.cellId = t.cellId;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(t, e, s) {
    if (super._replaceHTML(t, e, s), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const n = $(this.cellId).find(".gm-screen-grid-cell-content");
    switch (this.options.document.type) {
      case "image":
        n.html(
          `<img src="${this.options.document.src}" alt="${this.options.document.image.caption || "image"}"></img>`
        );
        break;
      case "pdf":
        n.html(
          `<iframe src="scripts/pdfjs/web/viewer.html?file=/${this.options.document.src}"></iframe>`
        );
        break;
      case "video":
        n.html(
          `<video src="${this.options.document.src}" ${this.options.document.video.controls ? "controls" : ""} ${this.options.document.video.autoplay ? "autoplay" : ""}></video>`
        );
        break;
      default:
        this.options.document.text.content && n.html(this.options.document.text.content);
    }
    $(this.form).hide();
  }
  /** @override */
  get id() {
    return `gmscreen-journal-page-${this.document.id}`;
  }
}
class P extends foundry.applications.sheets.journal.JournalEntrySheet {
  cellId;
  constructor(t) {
    super(t), this.cellId = t.cellId, this.options.position.width = "auto", this.options.position.height = "auto";
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(t, e, s) {
    if (super._replaceHTML(t, e, s), !this.form)
      return;
    $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
    const n = $(this.cellId).find(".gm-screen-grid-cell-content");
    n.html(this.form), n.find(".window-header").remove(), this.setPosition({
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
class S extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  expanded;
  data;
  apps;
  constructor(t = {}) {
    super(t), this.expanded = !1, this.data = c().settings.get(l, a.gmScreenConfig), this.apps = {};
    const e = c().settings.get(l, a.columns), s = c().settings.get(l, a.rows), n = c().settings.get(l, a.displayDrawer), i = {
      window: {
        ...this.options.window,
        resizable: !1,
        frame: !1
      }
    }, r = [
      {
        action: "clearGrid",
        label: y().localize(`${p}.gmScreen.Reset`),
        class: "clear",
        icon: "fas fa-ban",
        onClick: () => this.handleClear.bind(this)()
      }
    ], o = {
      classes: ["window-app", "gm-screen-popOut"],
      width: Number(e) * 400,
      height: Number(s) * 300,
      window: {
        ...this.options.window,
        resizable: !0,
        frame: !0,
        controls: [
          {
            action: "refresh",
            label: y().localize(`${p}.gmScreen.Refresh`),
            class: "refresh",
            icon: "fas fa-sync",
            onClick: () => this.refresh()
          },
          ...c().user?.isGM ? r : []
        ]
      }
    };
    d(!1, {
      displayDrawer: n,
      options: n ? i : o
    }), this.options = {
      ...this.options,
      ...n ? i : o
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
    return c().settings.get(l, a.rows);
  }
  get columns() {
    return c().settings.get(l, a.columns);
  }
  get displayDrawer() {
    return c().settings.get(l, a.displayDrawer);
  }
  get userViewableGrids() {
    return E(this.data);
  }
  get hasUserViewableGrids() {
    return !!Object.keys(this.userViewableGrids).length;
  }
  get title() {
    return this.displayDrawer ? "" : y().localize(`${p}.gmScreen.Title`);
  }
  get activeGrid() {
    return this.data.grids[this.data.activeGridId];
  }
  static getNumOccupiedCells(t) {
    return Object.values(t.entries).reduce((e, s) => {
      const n = (s.spanCols || 1) * (s.spanRows || 1);
      return e + n;
    }, 0);
  }
  /**
   * Helper function to update the gmScreenConfig setting with a new grid's worth of data
   * @param {GmScreenGrid} newGridData - the complete grid object to set
   */
  async setGridData(t) {
    const e = foundry.utils.deepClone(this.data);
    if (!foundry.utils.setProperty(e, `grids.${t.id}`, t)) {
      d(!0, "error occurred trying to set a grid data");
      return;
    }
    await c().settings.set(l, a.gmScreenConfig, e);
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
    const s = {
      ...this.activeGrid,
      entries: e
    };
    d(!1, "addEntryToActiveGrid", {
      activeGridData: this.activeGrid,
      newEntries: e,
      newEntry: t,
      newGridData: s
    }), this.setGridData(s);
  }
  /**
   * Remove a given entry from the Active Grid
   * @param {string} entryId - entry to remove from the active grid's entries
   */
  async removeEntryFromActiveGrid(t, e) {
    const s = foundry.utils.deepClone(this.activeGrid.entries[t]), n = s.spanCols || s.spanRows, i = {
      ...this.activeGrid.entries
    };
    if (n ? (delete s.entityUuid, delete s.type, i[t] = s) : delete i[t], e) {
      const o = `#${e}`;
      await this.apps[o]?.close(), delete this.apps[o];
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
    d(!1, "handleClear"), await foundry.applications.api.DialogV2.confirm({
      title: y().localize(`${p}.warnings.clearConfirm.Title`),
      content: y().localize(`${p}.warnings.clearConfirm.Content`)
    }) && (this.apps = {}, this.setGridData({
      ...this.activeGrid,
      entries: {}
    }));
  }
  _dragListeners(t) {
    let e;
    const s = t.find(".gm-screen-tabs");
    s.on("dragstart", ".item", (n) => {
      e = n.target;
    }), s.on("dragover", (n) => {
      if (!e)
        return;
      const i = Array.from($(n.target).closest(".gm-screen-tabs").children());
      i.indexOf(n.target) > i.indexOf(e) ? n.target.after(e) : n.target.before(e);
    }), s.on("dragend", async (n) => {
      if (!e)
        return;
      const i = foundry.utils.deepClone(this.data);
      i.grids = {}, $(n.target).closest(".gm-screen-tabs").children().each((r, o) => {
        const u = $(o).attr("data-tab");
        u && (i.grids[u] = this.data.grids[u]);
      }), e = void 0, await c().settings.set(l, a.gmScreenConfig, i);
    });
  }
  async handleClickEvent(t) {
    t.preventDefault();
    const e = t.currentTarget.dataset.action, s = $(t.currentTarget).parents("[data-entity-uuid]")?.data()?.entityUuid, n = $(t.currentTarget).parents("[data-entry-id]")?.data()?.entryId, i = $(t.currentTarget).parents("[data-entry-id]")?.attr("id");
    switch (d(!1, "handleClickEvent", {
      e: t,
      action: e
    }), e) {
      case "clearCell": {
        if (!n)
          return;
        this.removeEntryFromActiveGrid(n, i);
        break;
      }
      case "clearGrid": {
        this.handleClear();
        break;
      }
      case "configureCell": {
        try {
          const { x: r, y: o } = x($(t.target).parent()), u = this.activeGrid.entries[n] || {
            x: r,
            y: o,
            entryId: `${r}-${o}`
          };
          d(!1, "configureCell cellToConfigure", u);
          const { newSpanRows: f, newSpanCols: h } = await I(u, {
            rows: this.rows,
            columns: this.columns
          });
          d(!1, "new span values from dialog", {
            newSpanRows: f,
            newSpanCols: h
          });
          const m = {
            ...u,
            spanRows: f,
            spanCols: h
          }, b = {
            ...this.activeGrid.entries,
            [m.entryId]: m
          }, O = [...Array(m.spanCols).keys()].map((G, N) => {
            const M = m.x + N;
            return [...Array(m.spanRows).keys()].map((F, A) => {
              const _ = m.y + A;
              return `${M}-${_}`;
            });
          }).flat();
          d(!1, {
            problemCoordinates: O
          }), Object.values(b).forEach((G) => {
            O.includes(G.entryId) && G.entryId !== m.entryId && delete b[G.entryId];
          }), d(!1, "newEntries", b);
          const H = {
            ...this.activeGrid,
            entries: b
          };
          this.setGridData(H);
        } catch (r) {
          d(!1, "User exited configure cell Dialog.", r);
        }
        break;
      }
      case "open": {
        if (!s)
          return;
        try {
          const o = (await this.getRelevantGmScreenDocument(s))?.sheet;
          if (d(!1, "trying to edit entity", { relevantEntitySheet: o }), !o)
            return;
          o.rendered ? (o.maximize(), o.bringToTop()) : o.render(!0);
        } catch (r) {
          d(!0, "error opening entity sheet", r);
        }
        break;
      }
      case "refresh": {
        this.refresh();
        break;
      }
      case "tab": {
        const r = t.currentTarget.dataset.tab;
        if (!c().user?.isGM || r === this.data.activeGridId || !r)
          return;
        d(!1, "trying to set active grid", { newActiveGridId: r });
        try {
          const o = {
            ...this.data,
            activeGridId: r
          };
          await c().settings.set(l, a.gmScreenConfig, o);
        } catch (o) {
          d(!0, "error setting active tab", o);
        }
        break;
      }
      case "toggle-gm-screen": {
        try {
          this.toggleGmScreenVisibility();
        } catch (r) {
          d(!0, "error toggling GM Screen", r);
        }
        break;
      }
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
    const t = c().settings.get(l, a.gmScreenConfig), e = foundry.utils.deepClone(this.data), s = foundry.utils.diffObject(e, t);
    if (d(!1, "refreshing gm screen", {
      newData: foundry.utils.deepClone(t),
      data: e,
      diffData: s
    }), this.data = t, Object.keys(s).length) {
      if (Object.keys(s).every((h) => h === "activeGridId")) {
        d(!1, "not rerendering because only activeGridId changed");
        return;
      }
      const n = Object.keys(s?.grids ?? {}), i = Object.keys(this.userViewableGrids), r = Object.keys(E(e)), o = !n.filter((h) => i.includes(h)).length, u = i.length === r.length && i.every((h) => r.includes(h)), f = o && u;
      if (d(!1, "gridIdChecks", {
        diffGridIds: n,
        myOldGridIds: r,
        myNewGridIds: i,
        diffOverlapsNewGridIds: o,
        oldAndNewGridIdsAreEqual: u,
        shouldNotRerender: f
      }), f) {
        d(!1, "not rerendering because none of my visible grids changed");
        return;
      }
    }
    this.displayDrawer || await this.close(), this.render(!0);
  }
  async _onRender() {
    new foundry.applications.ux.DragDrop({
      dragSelector: ".gm-screen-grid-cell",
      dropSelector: ".gm-screen-grid-cell",
      permissions: { dragstart: () => !!c().user?.isGM, drop: () => !!c().user?.isGM },
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
      await new v({}).render({ force: !0 });
    }), !this.hasUserViewableGrids)
      return;
    this.injectCellContents(e), this.updateClassesAndFixButtons();
    const s = document.querySelector(".gm-screen-grid");
    if (!s)
      return;
    const r = getComputedStyle(s)["grid-template-columns"].split(" ")[0];
    $(e).find(".gm-screen-grid").each((o, u) => {
      u.style.setProperty("--grid-cell-width", r);
    });
  }
  /**
   * @override
   */
  async _attachFrameListeners() {
    super._attachFrameListeners();
    const t = $(this.element);
    c().user?.isGM && this._dragListeners(t), $(t).on("click", "button", this.handleClickEvent.bind(this)), $(t).on("click", "a", this.handleClickEvent.bind(this)), $(t).on("change", "select", async (e) => {
      const s = x($(e.target).parent()), n = `${s.x}-${s.y}`, i = {
        ...s,
        entryId: n,
        entityUuid: e.target.value
      };
      this.addEntryToActiveGrid(i);
    });
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
    const s = await this.getRelevantGmScreenDocument(t);
    if (!s) {
      await this.apps[e]?.close(), delete this.apps[e], console.warn("One of the grid cells tried to render an entity that does not exist.", t);
      return;
    }
    this.apps[e] && this.apps[e]?.document.uuid !== t && (await this.apps[e].close(), delete this.apps[e]);
    const { sheet: n } = s, i = n?.constructor;
    if (this.apps[e] && this.apps[e].constructor.name !== i?.name && (await this.apps[e].close(), delete this.apps[e]), this.apps[e] && this.apps[e].constructor.name === i?.name)
      return d(!1, `using cached application instance for "${s.name}"`, {
        entityUuid: t,
        app: this.apps[e]
      }), this.apps[e];
    if (d(!1, "relevantEntity sheet", {
      sheet: n,
      name: i?.name
    }), !i) {
      d(!0, "no sheet class found for relevantDocument", {
        relevantDocument: s,
        entityUuid: t
      });
      return;
    }
    if (s instanceof JournalEntry)
      d(!1, `creating compact journal entry for "${s.name}"`, {
        cellId: e
      }), this.apps[e] = new P({
        document: s,
        editable: !1,
        cellId: e
      });
    else if (s instanceof JournalEntryPage)
      d(!1, `creating compact JournalEntryPage for "${s.name}"`, {
        cellId: e
      }), this.apps[e] = new L({ document: s, cellId: e });
    else if (s instanceof RollTable)
      d(!1, `creating compact rollTableDisplay for "${s.name}"`, {
        cellId: e
      }), this.apps[e] = new V({ document: s, cellId: e });
    else if (n instanceof foundry.applications.sheets.ActorSheetV2 && s instanceof Actor) {
      d(!1, `creating ActorSheetV2 for "${s.name}"`, {
        cellId: e
      });
      const r = new i({
        document: s,
        window: {
          ...this.options.window,
          frame: !1
        }
      });
      r._replaceHTML = function() {
        this.cellId = e, $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
        const u = $(this.cellId).find(".gm-screen-grid-cell-content");
        u.html(this.form), u.find(".window-header").remove(), u.children().wrap("<div class='window-content'></div>");
      }, this.apps[e] = r;
    } else {
      d(!1, `creating compact generic for "${s.name}"`, {
        cellId: e
      });
      const r = new i(s, {
        width: "100%",
        height: "100%"
      });
      r.options.editable = !1, r.options.popOut = !1, r.cellId = e, r._injectHTML = function(u) {
        $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
        const f = $(this.cellId).find(".gm-screen-grid-cell-content");
        d(!1, "CompactEntitySheet overwritten _injectHTML", {
          targetElement: f,
          gridCellContent: f,
          cellId: this.cellId,
          html: u
        }), f.append(u), f.children().wrap("<div class='window-content'></div>"), this._element = u;
      }, r._replaceHTML = function(u, f) {
        $(this.cellId).find(".gm-screen-grid-cell-title").text(this.title);
        const h = $(this.cellId).find(".gm-screen-grid-cell-content"), m = f.get(0);
        m && (h.html(m), h.children().wrap("<div class='window-content'></div>"), this._element = f);
      }, d(!1, `created compact generic for "${s.name}"`, {
        sheet: r
      }), this.apps[e] = r;
    }
    return this.apps[e];
  }
  injectCellContents(t) {
    return $(t).find("[data-entity-uuid]").each((e, s) => {
      try {
        const n = s.dataset.entityUuid;
        if (!n)
          return;
        const i = `#${s.id}`, { entryId: r } = s.dataset;
        d(!1, "gridEntry with uuid defined found", { relevantUuid: n, cellId: i, gridEntry: s }), this.getCellApplicationClass(n, i).then(async (o) => {
          if (d(!1, `got application for "${i}"`, {
            application: o
          }), !o)
            throw r && await this.removeEntryFromActiveGrid(r, i.replace("#", "")), new Error("no application exists to render");
          const u = o.options.classes.join(" ");
          $(s).find(".gm-screen-grid-cell-content").addClass(u), o.render(!0);
        }).catch((o) => {
          d(!0, "error trying to render a gridEntry", {
            gridEntry: s,
            cellId: i,
            relevantUuid: n,
            error: o
          });
        });
      } catch (n) {
        d(!1, "erroring", n, {
          gridEntry: s
        });
      }
    }), j(t, ".gm-screen-grid-cell", "width", "--this-cell-width"), t;
  }
  /**
   * All grids with entries hydrated with empty cells
   */
  getHydratedGrids() {
    return d(!1, "getHydratedGrids", {
      userViewableGrids: this.userViewableGrids
    }), Object.values(this.userViewableGrids).reduce((t, e) => {
      const s = e.columnOverride ?? this.columns, n = e.rowOverride ?? this.rows, i = Number(s) * Number(n) - S.getNumOccupiedCells(e), r = i > 0 ? Array.from({ length: i }).map(() => ({})) : [];
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
    const e = c().settings.get(l, a.rightMargin), s = c().settings.get(l, a.drawerWidth), n = c().settings.get(l, a.drawerHeight), i = c().settings.get(l, a.drawerOpacity), r = c().settings.get(l, a.condensedButton), o = this.getHydratedGrids();
    this.tabGroups.primary = this.data.activeGridId || "default", Object.keys(o).forEach((f) => {
      o[f].grid.cssClass = this.tabGroups.primary === o[f].grid.id ? "active" : "";
    });
    const u = foundry.utils.mergeObject(t, {
      grids: o,
      isGM: !!c().user?.isGM,
      condensedButton: r,
      data: this.data,
      columns: this.columns,
      rows: this.rows,
      drawerWidth: s,
      drawerHeight: n,
      rightMargin: e,
      drawerOpacity: i,
      expanded: this.expanded,
      hidden: !this.hasUserViewableGrids,
      displayDrawer: this.displayDrawer
    });
    return u.tabs = Object.keys(o).map((f) => ({
      id: o[f].grid.id,
      group: "primary",
      label: o[f].grid.name,
      cssClass: o[f].grid.cssClass
    })), d(!1, "_prepareContext", {
      data: this.data,
      newAppData: u
    }), u;
  }
  async _onDrop(t) {
    if (t.stopPropagation(), !c().user?.isGM) return;
    let e;
    try {
      e = JSON.parse(t.dataTransfer.getData("text/plain"));
    } catch (o) {
      d(!1, "error parsing data from drag and drop", o);
      return;
    }
    if (d(!1, "onDrop", {
      event: t,
      data: e,
      closestGridCell: $(t.currentTarget).closest(".gm-screen-grid-cell")
    }), !["JournalEntry", "JournalEntryPage", "RollTable", "Item", "Actor"].includes(e.type))
      return;
    const s = e.pack ? `Compendium.${e.pack}.${e.uuid}` : e.uuid, n = x($(t.target).closest(".gm-screen-grid-cell")), i = `${n.x}-${n.y}`, r = {
      ...n,
      entryId: i,
      entityUuid: s,
      type: e.type
    };
    this.addEntryToActiveGrid(r);
  }
}
let w;
async function R(g) {
  const t = c().settings.get(l, a.gmScreenConfig), e = E(t);
  if (!Object.keys(e).length) {
    ui.notifications?.notify(y().localize(`${p}.warnings.noGrids`), "error");
    return;
  }
  if (c().settings.get(l, a.displayDrawer) && w) {
    w.toggleGmScreenVisibility(g);
    return;
  }
  w || (w = new S());
  const n = g ?? w.state < 1, i = w.state < 1;
  try {
    n ? (i && await w.render(!0), w.minimized && w.maximize(), w.bringToFront()) : w.close();
  } catch (r) {
    d(!1, "error occurred trying to toggle the GM screen", r);
  }
}
function z() {
  w && w.refresh();
}
Handlebars.registerHelper(`${p}-switch`, function(t, e) {
  return this.switch_value = t, e.fn(this);
});
Handlebars.registerHelper(`${p}-case`, function(t, e) {
  return t === this.switch_value ? e.fn(this) : e.inverse(this);
});
Handlebars.registerHelper(
  `${p}-enrich`,
  (g) => foundry.applications.ux.TextEditor.implementation.enrichHTML(g)
);
Hooks.once("init", async () => {
  d(!0, `Initializing ${l}`), v.init(), await foundry.applications.handlebars.loadTemplates(Object.values(foundry.utils.flattenObject(C)));
});
Hooks.once("ready", async () => {
  await T(), window[l] = { migration: T }, c().settings.get(l, a.displayDrawer) && (w = new S(), w.render(!0));
  const t = c().modules.get(l);
  t && (t.api = {
    toggleGmScreenVisibility: R,
    refreshGmScreen: z
  }), c().user?.isGM && c().settings.set(l, a.reset, !1);
});
function B(g) {
  const t = $(g), e = t.find(".header-actions"), s = `<button class="gm-screen-button">
          <i class="fas fa-book-reader"></i> ${y().localize(`${p}.gmScreen.Open`)}
      </button>`;
  e.append(s), t.find("button.gm-screen-button").on("click", (i) => {
    i.preventDefault(), R(!0);
  });
}
Hooks.on("renderJournalDirectory", (g, t) => {
  c().settings.get(l, a.displayDrawer) || B(t);
});
Hooks.once("devModeReady", ({ registerPackageDebugFlag: g }) => {
  g(l);
});
//# sourceMappingURL=foundryvtt-gmScreen.js.map
