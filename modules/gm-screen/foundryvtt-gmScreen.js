const c = "gm-screen", p = "GMSCR", D = {
  settings: `modules/${c}/templates/settings.hbs`,
  screen: `modules/${c}/templates/screen.hbs`,
  screenContent: `modules/${c}/templates/parts/screen-content.hbs`,
  screenTabs: `modules/${c}/templates/parts/screen-tabs.hbs`,
  screenCell: `modules/${c}/templates/parts/screen-cell.hbs`,
  screenGrid: `modules/${c}/templates/parts/screen-grid.hbs`,
  grids: {
    tableRow: `modules/${c}/templates/parts/settings-grid-config-table-row.hbs`
  }
}, M = "gmScreen-primary";
var o = /* @__PURE__ */ ((d) => (d.columns = "columns", d.displayDrawer = "display-as-drawer", d.drawerHeight = "drawer-height", d.drawerOpacity = "drawer-opacity", d.drawerWidth = "drawer-width", d.gmScreenConfig = "gm-screen-config", d.migrated = "migrated", d.condensedButton = "condensedButton", d.reset = "reset", d.rightMargin = "right-margin", d.rows = "rows", d))(o || {}), x = /* @__PURE__ */ ((d) => (d.openCloseScreen = "openCloseScreen", d.changeTab = "changeTab", d))(x || {});
const H = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?/, V = ["DeltaGreenActor", "DeltaGreenItem"];
function a() {
  if (!(game instanceof foundry.Game))
    throw new Error("game is not initialized yet!");
  return game;
}
function S() {
  const { i18n: d } = a();
  return d || {
    localize: (e) => e
  };
}
function u(d, ...e) {
  (d || a().modules.get("_dev-mode")?.api?.getPackageDebugValue(c)) && console.log(c, "|", ...e);
}
function z(d, e) {
  return new Promise((t, n) => {
    new foundry.applications.api.DialogV2({
      window: { title: S().localize(`${p}.cellConfigDialog.CellConfig`) },
      modal: !0,
      content: `
    <div class="form-group">
      <label for="spanRows">${S().localize(`${p}.cellConfigDialog.RowSpan`)}</label>
      <input type="number" step="1" name="spanRows" id="spanRows" min="1" max="${e.rows + 1 - d.y}" value="${d.spanRows || 1}">
    </div>
    <div class="form-group">
      <label for="spanCols">${S().localize(`${p}.cellConfigDialog.ColSpan`)}</label>
      <input type="number" step="1" name="spanCols" id="spanCols" min="1" max="${e.columns + 1 - d.x}" value="${d.spanCols || 1}">
    </div>  
`,
      buttons: [
        {
          action: "no",
          icon: "fas fa-times",
          label: S().localize("Cancel"),
          callback: () => {
            n();
          }
        },
        {
          action: "reset",
          icon: "fas fa-undo",
          label: S().localize("Default"),
          callback: () => {
            const i = {
              newSpanRows: 1,
              newSpanCols: 1
            };
            u(!1, "dialog formValues", i), t(i);
          }
        },
        {
          action: "yes",
          icon: "fas fa-check",
          label: S().localize("Save"),
          default: !0,
          callback: (i, s, r) => {
            const l = r.element, g = {
              newSpanRows: Number(l.querySelector('[name="spanRows"]')?.value),
              newSpanCols: Number(l.querySelector('[name="spanCols"]')?.value)
            };
            u(!1, "dialog formValues", g), t(g);
          }
        }
      ]
    }).render({ force: !0 });
  });
}
function N(d) {
  const e = d.parentElement?.closest(".gm-screen-grid");
  if (!e)
    return { x: 1, y: 1 };
  const t = window.getComputedStyle(e);
  u(!1, "getGridElementsPosition", {
    element: d,
    relevantGridElement: e,
    vanillaGridElementStyles: t,
    gap: t.gap,
    // wtf this is '' in firefox
    gridRowGap: t["grid-row-gap"],
    gridColGap: t["grid-column-gap"]
  });
  const n = Number(t["grid-row-gap"].match(H)[0]), i = t["grid-template-columns"].split(" "), s = Number(i[0].match(H)[0]), r = t["grid-template-rows"].split(" "), l = Number(r[0].match(H)[0]), g = d.getBoundingClientRect(), m = e.getBoundingClientRect(), f = Math.floor((g.left - (m.left - n)) / (s + n)) + 1, w = Math.floor((g.top - (m.top - n)) / (l + n)) + 1;
  return u(!1, "getGridElementsPosition", {
    setup: {
      gap: n,
      cols: i,
      rows: r,
      elementBounds: g,
      gridBounds: m,
      colWidth: s,
      rowHeight: l
    },
    results: {
      elementColumn: f,
      elementRow: w
    }
  }), { y: w, x: f };
}
function O(d) {
  return a().user?.isGM ? d.grids : Object.keys(d.grids).reduce((t, n) => (d.grids[n].isShared && (t[n] = d.grids[n]), t), {});
}
function q(d, e, t, n) {
  d.querySelectorAll(e).forEach((i) => {
    if (!(i instanceof HTMLElement))
      return;
    const s = window.getComputedStyle(i)[t];
    i.style.setProperty(n, String(s));
  });
}
function U(d) {
  return async function() {
    this.cellId = d;
    const t = document.getElementById(this.cellId.replace("#", ""));
    if (!t)
      return;
    const n = t.querySelector(".gm-screen-grid-cell-title");
    n && (n.textContent = this.title);
    const i = t.querySelector(".gm-screen-grid-cell-content");
    if (!i)
      return;
    i.classList.remove(...Array.from(i.classList)), i.classList.add("gm-screen-grid-cell-content"), i.replaceChildren(this.form);
    const s = i.querySelector(".window-header");
    s instanceof HTMLElement && (s.style.visibility = "hidden");
  };
}
function R() {
  return this;
}
function A(d) {
  return V.includes(d);
}
async function I() {
  if (!a().user?.isGM) return;
  const d = "2.0.1", e = a().settings.get(c, o.migrated);
  if (e.status && (foundry.utils.isNewerVersion(a().modules.get(c)?.version ?? "0", d) || e.version === d))
    return;
  ui.notifications?.notify("GM Screen | Beginning Migration to updated schema.", "info");
  const t = a().settings.get(c, o.gmScreenConfig);
  if (t?.grid?.entries && Array.isArray(t.grid.entries)) {
    const n = t.grid.entries.reduce((s, r) => {
      const l = `${r.x}-${r.y}`;
      return s[l] = {
        ...r,
        entryId: l
      }, s;
    }, {}), i = {
      activeGridId: "default",
      grids: {
        default: {
          ...t.grid,
          entries: n,
          id: "default",
          name: "Main",
          isShared: !1,
          cssClass: "active"
        }
      }
    };
    u(!0, "migration output", {
      output: i
    }), await a().settings.set(c, o.gmScreenConfig, i);
  }
  ui.notifications?.notify("GM Screen | Migration Complete.", "info"), await a().settings.set(c, o.migrated, { status: !0, version: d });
}
const _ = {
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
class L extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  draggedRow;
  static init() {
    a().settings.registerMenu(c, "menu", {
      name: `${p}.settings.${o.gmScreenConfig}.Name`,
      label: `${p}.settings.${o.gmScreenConfig}.Label`,
      icon: "fas fa-table",
      type: L,
      restricted: !0,
      hint: `${p}.settings.${o.gmScreenConfig}.Hint`
    }), a().settings.register(c, o.gmScreenConfig, {
      default: _,
      scope: "world",
      config: !1,
      onChange(...e) {
        u(!1, "gmScreenConfig changed", {
          args: e,
          currentConfig: { ...a().settings.get(c, o.gmScreenConfig) }
        }), a().modules.get(c)?.api?.refreshGmScreen();
      }
    }), a().settings.register(c, o.migrated, {
      config: !1,
      default: { status: !1, version: "1.2.2" },
      scope: "world",
      type: Object
    }), a().settings.register(c, o.columns, {
      name: `${p}.settings.${o.columns}.Name`,
      default: 4,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${p}.settings.${o.columns}.Hint`
    }), a().settings.register(c, o.rows, {
      name: `${p}.settings.${o.rows}.Name`,
      default: 3,
      type: Number,
      scope: "world",
      config: !0,
      hint: `${p}.settings.${o.rows}.Hint`
    }), a().settings.register(c, o.displayDrawer, {
      name: `${p}.settings.${o.displayDrawer}.Name`,
      default: !0,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${p}.settings.${o.displayDrawer}.Hint`,
      onChange: () => window.location.reload()
    }), a().settings.register(c, o.rightMargin, {
      name: `${p}.settings.${o.rightMargin}.Name`,
      default: 0,
      type: Number,
      scope: "client",
      range: { min: 0, max: 75, step: 5 },
      config: !0,
      hint: `${p}.settings.${o.rightMargin}.Hint`
    }), a().settings.register(c, o.drawerWidth, {
      name: `${p}.settings.${o.drawerWidth}.Name`,
      default: 100,
      type: Number,
      scope: "client",
      range: { min: 25, max: 100, step: 1 },
      config: !0,
      hint: `${p}.settings.${o.drawerWidth}.Hint`
    }), a().settings.register(c, o.drawerHeight, {
      name: `${p}.settings.${o.drawerHeight}.Name`,
      default: 60,
      type: Number,
      scope: "client",
      range: { min: 10, max: 90, step: 1 },
      config: !0,
      hint: `${p}.settings.${o.drawerHeight}.Hint`
    }), a().settings.register(c, o.drawerOpacity, {
      name: `${p}.settings.${o.drawerOpacity}.Name`,
      default: 1,
      type: Number,
      scope: "client",
      range: { min: 0.1, max: 1, step: 0.05 },
      config: !0,
      hint: `${p}.settings.${o.drawerOpacity}.Hint`
    }), a().settings.register(c, o.condensedButton, {
      name: `${p}.settings.${o.condensedButton}.Name`,
      default: !1,
      type: Boolean,
      scope: "client",
      config: !0,
      hint: `${p}.settings.${o.condensedButton}.Hint`
    }), a().settings.register(c, o.reset, {
      name: `${p}.settings.${o.reset}.Name`,
      default: !1,
      type: Boolean,
      scope: "world",
      config: !0,
      hint: `${p}.settings.${o.reset}.Hint`,
      onChange: (e) => {
        e && a().settings.set(c, o.gmScreenConfig, _);
      }
    }), a().keybindings?.register(c, x.openCloseScreen, {
      name: S().localize(`${p}.keybindings.openCloseScreen`),
      editable: [
        {
          key: "KeyO"
        }
      ],
      onDown: () => {
        a().modules.get(c)?.api?.toggleGmScreenVisibility();
      },
      onUp: () => {
      },
      restricted: !1,
      precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    }), a().keybindings?.register(c, x.changeTab, {
      name: S().localize(`${p}.keybindings.changeTab`),
      editable: [
        {
          key: "KeyP"
        }
      ],
      onDown: () => {
        a().modules.get(c)?.api?.switchTab();
      },
      onUp: () => {
      },
      restricted: !1,
      precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
  }
  static PARTS = {
    content: {
      template: D.settings
    }
  };
  static DEFAULT_OPTIONS = {
    id: "gm-screen-tabs-config",
    classes: ["gm-screen-config"],
    height: "auto",
    width: 600,
    tag: "form",
    form: {
      handler: L.#e,
      submitOnClose: !1,
      submitOnChange: !1,
      closeOnSubmit: !0
    }
  };
  get title() {
    return S().localize(`${p}.gridConfig.GridConfig`);
  }
  get rows() {
    return a().settings.get(c, o.rows);
  }
  get columns() {
    return a().settings.get(c, o.columns);
  }
  get settingsData() {
    const e = a().settings.get(c, o.gmScreenConfig);
    return u(!1, "getSettingsData", {
      gmScreenConfig: e
    }), {
      grids: e.grids
    };
  }
  async _prepareContext(e) {
    const t = await super._prepareContext(e), n = foundry.utils.mergeObject(t, {
      settings: this.settingsData,
      defaultRows: this.rows,
      defaultColumns: this.columns
    });
    return u(!1, n), n;
  }
  _dragStartTab(e) {
    e.target instanceof HTMLElement && (this.draggedRow = e.target);
  }
  _dragOverTab(e) {
    if (!this.draggedRow || !(e.target instanceof HTMLElement))
      return;
    const t = e.target.parentElement?.hasAttribute("draggable") ? e.target.parentElement : e.target.parentElement?.parentElement;
    if (!(t instanceof HTMLElement) || !t.hasAttribute("draggable"))
      return;
    const n = t.parentElement?.children;
    if (!n)
      return;
    let i = -1, s = -1;
    for (let r = 0; r < (n?.length ?? 0); r += 1)
      n?.item(r) === t && (i = r), n?.item(r) === this.draggedRow && (s = r);
    i > s ? t.after(this.draggedRow) : t.before(this.draggedRow);
  }
  async _dragEndTab() {
    this.draggedRow = void 0;
  }
  async handleNewRowClick(e) {
    const t = this.element;
    u(!1, "add row clicked", {
      data: e.dataset
    });
    const { table: n } = e.dataset, i = t.querySelector("tbody");
    if (!i || !n)
      return;
    const s = {
      gridId: foundry.utils.randomID(),
      grid: {
        name: "",
        columnOverride: "",
        rowOverride: ""
      },
      defaultColumns: this.columns,
      defaultRows: this.rows
    }, r = await foundry.applications.handlebars.renderTemplate(
      D[n].tableRow,
      s
    );
    i.insertAdjacentHTML("beforeend", r), this.setPosition({});
  }
  handleDeleteRowClick(e) {
    u(!1, "delete row clicked", {
      currentTarget: e
    }), e.closest("tr")?.remove(), this.setPosition({});
  }
  addEventListeners() {
    this.element.addEventListener("click", (t) => {
      if (t == null || !(t.target instanceof HTMLElement))
        return;
      const n = t.target.closest("button");
      n && (u(!1, "a button was clicked", { e: t, currentTarget: n }), n.classList.contains("add-row") && this.handleNewRowClick(n), n.classList.contains("delete-row") && this.handleDeleteRowClick(n));
    });
  }
  async _onRender() {
    const e = this.element;
    u(!1, "activateListeners", {
      html: e
    }), new foundry.applications.ux.DragDrop({
      dragSelector: "tbody tr",
      dropSelector: "tbody tr",
      permissions: { dragstart: () => !!a().user?.isGM, drop: () => !!a().user?.isGM },
      callbacks: {
        dragstart: this._dragStartTab.bind(this),
        dragover: this._dragOverTab.bind(this),
        dragend: this._dragEndTab.bind(this)
      }
    }).bind(this.element), this.addEventListeners();
  }
  // grids: {
  //   default: {
  //     name: 'Main',
  //     id: 'default',
  //     entries: {},
  //   },
  // },
  static async #e(e, t, n) {
    const i = a().settings.get(c, o.gmScreenConfig), s = foundry.utils.expandObject(n.object);
    if (u(!1, {
      formData: n,
      data: s
    }), Object.keys(s).length === 0)
      throw ui.notifications?.error(S().localize(`${p}.gridConfig.errors.empty`)), new Error("Cannot save the grid with no tabs.");
    const r = Object.keys(s.grids), l = r.reduce((f, w) => {
      const v = s.grids[w];
      return Object.hasOwn(i.grids, w) ? (f[w] = {
        ...i.grids[w],
        ...v
      }, f) : (f[w] = {
        ...v,
        entries: {},
        name: v.name ?? "",
        isShared: v.isShared ?? !1,
        id: w
      }, f);
    }, {}), g = r.includes(i.activeGridId) ? i.activeGridId : r[0], m = {
      ...i,
      grids: l,
      activeGridId: g
    };
    u(!0, "setting settings", {
      newGmScreenConfig: m
    }), await a().settings.set(c, o.gmScreenConfig, m), a().modules.get("gm-screen")?.api?.refreshGmScreen();
  }
}
class J extends foundry.applications.sheets.RollTableSheet {
  cellId;
  constructor(e) {
    super(e), u(!1, "CompactRollTableDisplay constructor", {
      options: e
    }), this.cellId = e.cellId;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(e, t, n) {
    if (super._replaceHTML(e, t, n), !this.form)
      return;
    const i = document.getElementById(this.cellId.replace("#", ""));
    if (!i)
      return;
    const s = i.querySelector(".gm-screen-grid-cell-title");
    s && (s.textContent = this.title);
    const r = i.querySelector(".gm-screen-grid-cell-content");
    if (r) {
      r.replaceChildren(this.form);
      const l = r.querySelector(".window-header");
      l && l.remove();
    }
    this.setPosition({
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
  _replaceHTML(e, t, n) {
    if (super._replaceHTML(e, t, n), !this.form)
      return;
    const i = document.getElementById(this.cellId.replace("#", ""));
    if (!i)
      return;
    const s = i.querySelector(".gm-screen-grid-cell-title");
    s && (s.textContent = this.options.document.name);
    const r = i.querySelector(".gm-screen-grid-cell-content");
    if (r) {
      switch (this.options.document.type) {
        case "image":
          r.innerHTML = `<img src="${this.options.document.src}" alt="${this.options.document.image.caption || "image"}"></img>`;
          break;
        case "pdf":
          r.innerHTML = `<iframe src="scripts/pdfjs/web/viewer.html?file=/${this.options.document.src}"></iframe>`;
          break;
        case "video":
          r.innerHTML = `<video src="${this.options.document.src}" ${this.options.document.video.controls ? "controls" : ""} ${this.options.document.video.autoplay ? "autoplay" : ""}></video>`;
          break;
        default:
          this.options.document.text.content && (r.innerHTML = this.options.document.text.content);
      }
      this.form.style.display = "none";
    }
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
    super(e), this.cellId = e.cellId;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isEditable() {
    return !1;
  }
  _replaceHTML(e, t, n) {
    if (super._replaceHTML(e, t, n), !this.form)
      return;
    const i = document.getElementById(this.cellId.replace("#", ""));
    if (!i)
      return;
    const s = i.querySelector(".gm-screen-grid-cell-title");
    s && (s.textContent = this.title);
    const r = i.querySelector(".gm-screen-grid-cell-content");
    if (r) {
      r.replaceChildren(this.form);
      const l = r.querySelector(".window-header");
      l && l.remove(), r.classList.remove(...r.classList), r.classList.add("gm-screen-grid-cell-content");
    }
    this.toggleSidebar();
  }
  /** @override */
  get id() {
    return `gmscreen-journal-${this.document.id}`;
  }
  async close(...e) {
    return e.length === 0 ? super.close(...e) : this;
  }
}
class k extends foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
) {
  expanded;
  data;
  apps;
  // used to allow players to switch tabs
  currentTab;
  draggedTab;
  constructor(e = {}) {
    super(e), this.expanded = !1, this.data = a().settings.get(c, o.gmScreenConfig), this.apps = {}, this.currentTab = this.data.activeGridId;
    const t = a().settings.get(c, o.columns), n = a().settings.get(c, o.rows), i = a().settings.get(c, o.displayDrawer), s = {
      window: {
        ...this.options.window,
        resizable: !1,
        frame: !1
      }
    }, r = [
      {
        action: "clearGrid",
        label: S().localize(`${p}.gmScreen.Reset`),
        class: "clear",
        icon: "fas fa-ban",
        onClick: () => this.handleClear.bind(this)()
      }
    ], l = {
      classes: ["window-app", "gm-screen-popOut"],
      width: Number(t) * 400,
      height: Number(n) * 300,
      window: {
        ...this.options.window,
        resizable: !0,
        frame: !0,
        controls: [
          {
            action: "refresh",
            label: S().localize(`${p}.gmScreen.Refresh`),
            class: "refresh",
            icon: "fas fa-sync",
            onClick: () => this.refresh()
          },
          ...a().user?.isGM ? r : []
        ]
      }
    };
    u(!1, {
      displayDrawer: i,
      options: i ? s : l
    }), this.options = {
      ...this.options,
      ...i ? s : l
    };
  }
  static PARTS = {
    tabs: {
      template: D.screenTabs
    },
    content: {
      template: D.screenContent
    }
  };
  static DEFAULT_OPTIONS = {
    id: "gm-screen-app"
  };
  get rows() {
    return a().settings.get(c, o.rows);
  }
  get columns() {
    return a().settings.get(c, o.columns);
  }
  get displayDrawer() {
    return a().settings.get(c, o.displayDrawer);
  }
  get userViewableGrids() {
    return O(this.data);
  }
  get hasUserViewableGrids() {
    return !!Object.keys(this.userViewableGrids).length;
  }
  get title() {
    return this.displayDrawer ? "" : S().localize(`${p}.gmScreen.Title`);
  }
  get activeGrid() {
    return this.data.grids[this.data.activeGridId];
  }
  static getNumOccupiedCells(e) {
    return Object.values(e.entries).reduce((t, n) => {
      const i = (n.spanCols || 1) * (n.spanRows || 1);
      return t + i;
    }, 0);
  }
  /**
   * Helper function to update the gmScreenConfig setting with a new grid's worth of data
   */
  async setGridData(e) {
    const t = foundry.utils.deepClone(this.data);
    if (!foundry.utils.setProperty(t, `grids.${e.id}`, e)) {
      u(!0, "error occurred trying to set a grid data");
      return;
    }
    await a().settings.set(c, o.gmScreenConfig, t);
  }
  /**
   * Adds an Entry to the proper place on the active grid's data.
   * Replaces an existing entry if the entryId matches
   */
  async addEntryToActiveGrid(e) {
    const t = { ...this.activeGrid.entries };
    t[e.entryId] = {
      ...t[e.entryId],
      ...e
    };
    const n = {
      ...this.activeGrid,
      entries: t
    };
    u(!1, "addEntryToActiveGrid", {
      activeGridData: this.activeGrid,
      newEntries: t,
      newEntry: e,
      newGridData: n
    }), this.setGridData(n);
  }
  /**
   * Remove a given entry from the Active Grid
   */
  async removeEntryFromActiveGrid(e, t) {
    const n = foundry.utils.deepClone(this.activeGrid.entries[e]), i = n.spanCols || n.spanRows, s = {
      ...this.activeGrid.entries
    };
    if (i ? (delete n.entityUuid, delete n.type, delete n.isDndNpc, delete n.isDndNpcStatBlock, s[e] = n) : delete s[e], t) {
      const l = `#${t}`;
      await this.apps[l]?.close(), delete this.apps[l];
    }
    const r = {
      ...this.activeGrid,
      entries: s
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
   */
  toggleGmScreenVisibility(e = !this.expanded) {
    this.expanded = e, this.expanded ? (this.bringToFront(), this.element.classList.add("expanded"), this.element.style.setProperty("z-index", this.position.zIndex.toString())) : this.element.classList.remove("expanded");
  }
  /**
   * Double confirms Clearing the Active Grid
   */
  async handleClear() {
    u(!1, "handleClear"), await foundry.applications.api.DialogV2.confirm({
      title: S().localize(`${p}.warnings.clearConfirm.Title`),
      content: S().localize(`${p}.warnings.clearConfirm.Content`)
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
    const t = e.target.closest(".gm-screen-tabs")?.children;
    if (!t)
      return;
    let n = -1, i = -1;
    Array.from(t).forEach((s, r) => {
      s instanceof HTMLElement && (t?.item(r) === e.target && (n = r), t?.item(r) === this.draggedTab && (i = r));
    }), n > i ? e.target.after(this.draggedTab) : e.target.before(this.draggedTab);
  }
  async _dragEndTab(e) {
    if (!this.draggedTab || !(e.target instanceof HTMLElement))
      return;
    const t = foundry.utils.deepClone(this.data);
    t.grids = {}, Array.from(e.target.closest(".gm-screen-tabs")?.children || []).forEach((n) => {
      if (!(n instanceof HTMLElement))
        return;
      const i = n.dataset.tab;
      i && (t.grids[i] = this.data.grids[i]);
    }), this.draggedTab = void 0, await a().settings.set(c, o.gmScreenConfig, t);
  }
  async handleClickEvent(e) {
    if (e.preventDefault(), !(e.currentTarget instanceof HTMLElement))
      return;
    const t = e.currentTarget.dataset.action, n = e.currentTarget.closest("[data-entity-uuid]"), i = n instanceof HTMLElement ? n.dataset.entityUuid : void 0, s = e.currentTarget.closest("[data-entry-id]"), r = s instanceof HTMLElement ? s.dataset.entryId : void 0, l = s instanceof HTMLElement ? s.id : void 0;
    switch (u(!1, "handleClickEvent", {
      e,
      action: t
    }), t) {
      case "clearCell": {
        if (!r)
          return;
        this.removeEntryFromActiveGrid(r, l);
        break;
      }
      case "clearGrid": {
        this.handleClear();
        break;
      }
      case "configureCell": {
        try {
          if (!(e.target instanceof HTMLElement) || !(e.target.parentElement instanceof HTMLElement))
            return;
          const { x: g, y: m } = N(e.target.parentElement), f = r ? this.activeGrid.entries[r] : {
            x: g,
            y: m,
            entryId: `${g}-${m}`
          };
          u(!1, "configureCell cellToConfigure", f);
          const { newSpanRows: w, newSpanCols: v } = await z(f, {
            rows: this.rows,
            columns: this.columns
          });
          u(!1, "new span values from dialog", {
            newSpanRows: w,
            newSpanCols: v
          });
          const y = {
            ...f,
            spanRows: w,
            spanCols: v
          }, b = {
            ...this.activeGrid.entries,
            [y.entryId]: y
          }, h = [...Array(y.spanCols).keys()].map((G, T) => {
            const $ = y.x + T;
            return [...Array(y.spanRows).keys()].map((X, P) => {
              const B = y.y + P;
              return `${$}-${B}`;
            });
          }).flat();
          u(!1, {
            problemCoordinates: h
          }), Object.values(b).forEach((G) => {
            h.includes(G.entryId) && G.entryId !== y.entryId && delete b[G.entryId];
          }), u(!1, "newEntries", b);
          const E = {
            ...this.activeGrid,
            entries: b
          };
          this.setGridData(E);
        } catch (g) {
          u(!1, "User exited configure cell Dialog.", g);
        }
        break;
      }
      case "open": {
        if (!i)
          return;
        try {
          const g = await this.getRelevantGmScreenDocument(i), m = g?.sheet;
          if (u(!1, "trying to edit entity", { relevantEntitySheet: m }), !m)
            return;
          if (m.rendered) {
            m.maximize(), m.bringToTop();
            return;
          }
          if (g instanceof JournalEntryPage && g.type === "image") {
            new foundry.applications.apps.ImagePopout({
              src: m.options.document.src,
              uuid: i,
              window: { title: g.name }
            }).render({ force: !0 });
            return;
          }
          m.render(!0);
        } catch (g) {
          u(!0, "error opening entity sheet", g);
        }
        break;
      }
      case "refresh": {
        this.refresh();
        break;
      }
      case "tab": {
        const g = e.currentTarget.dataset.tab;
        if (this.currentTab = g ?? this.currentTab, !a().user?.isGM || g === this.data.activeGridId || !g)
          return;
        u(!1, "trying to set active grid", { newActiveGridId: g });
        try {
          const m = {
            ...this.data,
            activeGridId: g
          };
          await a().settings.set(c, o.gmScreenConfig, m);
        } catch (m) {
          u(!0, "error setting active tab", m);
        }
        break;
      }
      case "toggle-gm-screen": {
        try {
          this.toggleGmScreenVisibility();
        } catch (g) {
          u(!0, "error toggling GM Screen", g);
        }
        break;
      }
      case "statBlock": {
        if (!l || !r)
          return;
        const g = {
          ...this.activeGrid.entries
        };
        g[r].isDndNpcStatBlock = !g[r].isDndNpcStatBlock;
        const m = {
          ...this.activeGrid,
          entries: g
        };
        await this.setGridData(m);
        break;
      }
    }
  }
  async switchTab() {
    const e = Object.keys(this.userViewableGrids);
    if (e.length <= 1)
      return;
    const t = a().user?.isGM, i = (e.indexOf(t ? this.data.activeGridId : this.currentTab) + 1) % e.length, s = e[i];
    u(!1, "trying to set active grid", { newActiveGridId: s });
    try {
      if (this.changeTab(s, M), this.currentTab = s, !t)
        return;
      const r = {
        ...this.data,
        activeGridId: s
      };
      await a().settings.set(c, o.gmScreenConfig, r);
    } catch (r) {
      u(!0, "error setting active tab", r);
    }
  }
  updateClassesAndFixButtons() {
    if (this.displayDrawer)
      return;
    const e = document.getElementById("gm-screen-app");
    if (!e)
      return;
    e?.classList.add("application");
    const t = e?.querySelector(".window-header");
    t && e?.querySelector(".window-content")?.prepend(t);
  }
  async _renderFrame(e) {
    if (!this.displayDrawer)
      return super._renderFrame(e);
    const t = await foundry.applications.handlebars.renderTemplate(
      D.screen,
      await this._prepareContext(this.options)
    ), n = document.createElement("div");
    if (n.innerHTML = t, !(n.children[0] instanceof HTMLElement))
      throw new Error("Failed to render GmScreenApplication frame template");
    return n.children[0];
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
    const e = a().settings.get(c, o.gmScreenConfig), t = foundry.utils.deepClone(this.data), n = foundry.utils.diffObject(t, e);
    if (u(!1, "refreshing gm screen", {
      newData: foundry.utils.deepClone(e),
      data: t,
      diffData: n
    }), this.data = e, Object.keys(n).length) {
      if (Object.keys(n).every((f) => f === "activeGridId") || Object.values(n.grids || {}).every((f) => Object.keys(f).every((w) => w === "cssClass"))) {
        u(!1, "not rerendering because only activeGridId changed or cssClass changed");
        return;
      }
      const i = Object.keys(n?.grids ?? {}), s = Object.keys(this.userViewableGrids), r = Object.keys(O(t)), l = !i.filter((f) => s.includes(f)).length, g = s.length === r.length && s.every((f) => r.includes(f)), m = l && g;
      if (u(!1, "gridIdChecks", {
        diffGridIds: i,
        myOldGridIds: r,
        myNewGridIds: s,
        diffOverlapsNewGridIds: l,
        oldAndNewGridIdsAreEqual: g,
        shouldNotRerender: m
      }), m) {
        u(!1, "not rerendering because none of my visible grids changed");
        return;
      }
    }
    this.displayDrawer || await this.close(), this.render(!0);
  }
  async _onRender() {
    if (new foundry.applications.ux.DragDrop({
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
    }).bind(this.element), this.addListeners(), this.displayDrawer ? this.setPosition({
      left: NaN,
      top: NaN
    }) : this.setPosition({
      width: Number(this.columns) * 400,
      height: Number(this.rows) * 300
    }), !this.hasUserViewableGrids)
      return;
    this.injectCellContents(), this.updateClassesAndFixButtons();
    const n = document.querySelector(".gm-screen-grid");
    if (!n)
      return;
    const r = getComputedStyle(n)["grid-template-columns"].split(" ")[0];
    this.element.querySelectorAll(".gm-screen-grid").forEach((l) => {
      l instanceof HTMLElement && l.style.setProperty("--grid-cell-width", r);
    });
  }
  addListeners() {
    this.element.querySelectorAll(".gm-screen-actions button, .gm-screen-grid-cell-header a").forEach((e) => {
      e.addEventListener("click", this.handleClickEvent.bind(this));
    }), this.element.querySelector(".gm-screen-button")?.addEventListener("contextmenu", async () => {
      if (!a().user?.isGM)
        return;
      await new L({}).render({ force: !0 });
    });
  }
  /**
   * Utility method to help typescript understand that these are only
   * actors, items, journals, or rolltables
   *
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
   */
  async getCellApplicationClass(e, t, n, i) {
    const s = await this.getRelevantGmScreenDocument(e);
    if (!s) {
      await this.apps[t]?.close(), delete this.apps[t], console.warn("One of the grid cells tried to render an entity that does not exist.", e);
      return;
    }
    this.apps[t] && this.apps[t]?.document.uuid !== e && (await this.apps[t].close(), delete this.apps[t]);
    const { sheet: r } = s, l = r?.constructor;
    if (this.apps[t] && this.apps[t].constructor.name !== l?.name && (await this.apps[t].close(), delete this.apps[t]), this.apps[t] && this.apps[t].constructor.name === l?.name && (!n || this.apps[t].id.includes(i ? "gmscreen-npc-" : "gmscreen-actor-")))
      return u(!1, `using cached application instance for "${s.name}"`, {
        entityUuid: e,
        app: this.apps[t]
      }), this.apps[t];
    if (u(!1, "relevantEntity sheet", {
      sheet: r,
      name: l?.name
    }), !l) {
      u(!0, "no sheet class found for relevantDocument", {
        relevantDocument: s,
        entityUuid: e
      });
      return;
    }
    switch (!0) {
      case s instanceof JournalEntry:
        u(!1, `creating compact journal entry for "${s.name}"`, {
          cellId: t
        }), this.apps[t] = new W({
          document: s,
          editable: !1,
          cellId: t,
          window: {
            ...r.options.window,
            positioned: !1,
            resizable: !1
          }
        });
        break;
      // special case when the sheet is a journal text page. We need to use the SheetClass to resolve UUID links
      case (r instanceof foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet && s instanceof JournalEntryPage && r.options.document.type === "text"):
        u(!1, `creating compact JournalEntryPage for "${s.name}"`, {
          cellId: t
        });
        const g = new l({
          ...r.options,
          mode: "view",
          id: `gmscreen-text-${r.document.id}`,
          // needed to show the journal page with styles
          classes: ["application", "sheet", "journal-sheet", "journal-entry", "maximizing"],
          document: s,
          window: {
            ...r.options.window,
            frame: !1,
            positioned: !1,
            resizable: !1
          }
        });
        g._postRender = async function() {
          this.cellId = t;
          const y = document.getElementById(this.cellId.replace("#", ""));
          if (!y)
            return;
          const b = y.querySelector(".gm-screen-grid-cell-title");
          b && (b.textContent = this.options.document.name);
          const h = y.querySelector(".gm-screen-grid-cell-content");
          if (!h)
            return;
          h.classList.remove(...h.classList), h.classList.add("gm-screen-grid-cell-content"), h.replaceChildren(this.form);
          const E = document.createElement("section");
          E.classList.add("journal-entry-content", "journal-entry-page", "overflow-y"), E.replaceChildren(...h.children[0].childNodes), h.children[0].replaceChildren(E), h.querySelector(".window-header")?.remove();
        }, g.close = R, this.apps[t] = g;
        break;
      case s instanceof JournalEntryPage:
        u(!1, `creating compact JournalEntryPage for "${s.name}"`, {
          cellId: t
        }), this.apps[t] = new F({ document: s, cellId: t });
        break;
      case s instanceof RollTable:
        u(!1, `creating compact rollTableDisplay for "${s.name}"`, {
          cellId: t
        }), this.apps[t] = new J({ document: s, cellId: t });
        break;
      case (r instanceof foundry.applications.sheets.ActorSheetV2 && s instanceof Actor):
        u(!1, `creating ActorSheetV2 for "${s.name}"`, {
          cellId: t
        });
        const m = new l({
          ...r.options,
          id: i ? `gmscreen-npc-${r.document.id}` : `gmscreen-actor-${r.document.id}`,
          classes: [],
          document: s,
          window: {
            ...r.options.window,
            frame: !0,
            positioned: !1,
            resizable: A(s.constructor.name)
          }
        });
        m._postRender = async function() {
          this.cellId = t;
          const y = document.getElementById(this.cellId.replace("#", ""));
          if (!y)
            return;
          const b = y.querySelector(".gm-screen-grid-cell-title");
          b && (b.textContent = this.title);
          const h = y.querySelector(".gm-screen-grid-cell-content");
          if (!h)
            return;
          if (h.classList.remove(...h.classList), h.classList.add("gm-screen-grid-cell-content"), h.replaceChildren(this.form), !i) {
            const T = h.querySelector(".window-header");
            T instanceof HTMLElement && (T.style.visibility = "hidden");
            return;
          }
          h.classList.add("dnd5e2");
          const E = await s.toEmbed({
            label: "",
            values: ["statblock"],
            inline: !1,
            cite: !0,
            caption: !1,
            captionPosition: "bottom"
          }) || this.form, G = document.createElement("div");
          G.classList.add("dnd5e2-journal", "journal-entry-content", "journal-page-content"), G.appendChild(E), h.replaceChildren(G);
        }, m.close = R, this.apps[t] = m;
        break;
      case (r instanceof foundry.applications.api.DocumentSheetV2 && s instanceof Item):
        u(!1, `creating ItemSheetV2 for "${s.name}"`, {
          cellId: t
        });
        const f = new l({
          ...r.options,
          id: `gmscreen-item-${r.document.id}`,
          document: s,
          window: {
            ...r.options.window,
            frame: !0,
            positioned: !1,
            resizable: !1
          }
        });
        f._postRender = U(t), f.close = R, this.apps[t] = f;
        break;
      default:
        u(!1, `creating compact generic for "${s.name}"`, {
          cellId: t
        });
        const w = new l(s, {
          ...r.options,
          width: "100%",
          height: "100%",
          positioned: !1,
          resizable: A(s.constructor.name)
        });
        w.options.editable = !1, w.options.popOut = !1, w.cellId = t, w._injectHTML = function(y) {
          const b = document.getElementById(this.cellId.replace("#", ""));
          if (!b)
            return;
          const h = b.querySelector(".gm-screen-grid-cell-title");
          h && (h.textContent = this.title);
          const E = b.querySelector(".gm-screen-grid-cell-content");
          if (!E)
            return;
          const G = y.get(0);
          if (!G)
            return;
          u(!1, "CompactEntitySheet overwritten _injectHTML", {
            targetElement: E,
            gridCellContent: E,
            cellId: this.cellId,
            pureHTML: G
          });
          const T = document.createElement("section");
          T.classList.add("window-content"), T.appendChild(G), E.appendChild(T), this._element = y;
        }, w._replaceHTML = function(y, b) {
          const h = document.getElementById(this.cellId.replace("#", ""));
          if (!h)
            return;
          const E = h.querySelector(".gm-screen-grid-cell-title");
          E && (E.textContent = this.title);
          const G = h.querySelector(".gm-screen-grid-cell-content");
          if (!G)
            return;
          const T = b.get(0);
          if (!T)
            return;
          const $ = document.createElement("section");
          $.classList.add("window-content"), $.appendChild(T), G.appendChild($), this._element = b;
        }, u(!1, `created compact generic for "${s.name}"`, {
          sheet: w
        }), this.apps[t] = w;
    }
    return this.apps[t];
  }
  injectCellContents() {
    this.element.querySelectorAll("[data-entity-uuid]").forEach((e) => {
      try {
        if (!(e instanceof HTMLElement))
          return;
        const t = e.dataset.entityUuid;
        if (!t)
          return;
        const n = `#${e.id}`, { entryId: i, dndNpc: s, dndNpcStatBlock: r } = e.dataset;
        u(!1, "gridEntry with uuid defined found", { relevantUuid: t, cellId: n, gridEntry: e }), this.getCellApplicationClass(t, n, s === "true", r === "true").then(async (l) => {
          if (u(!1, `got application for "${n}"`, {
            application: l
          }), !l)
            throw i && await this.removeEntryFromActiveGrid(i, n.replace("#", "")), new Error("no application exists to render");
          const g = e.querySelector(".gm-screen-grid-cell-content");
          l.options.classes.length > 0 && g?.classList.add(...l.options.classes), l.render(!0);
        }).catch((l) => {
          u(!0, "error trying to render a gridEntry", {
            gridEntry: e,
            cellId: n,
            relevantUuid: t,
            error: l
          });
        });
      } catch (t) {
        u(!1, "erroring", t, {
          gridEntry: e
        });
      }
    }), q(this.element, ".gm-screen-grid-cell", "width", "--this-cell-width");
  }
  /**
   * All grids with entries hydrated with empty cells
   */
  getHydratedGrids() {
    return u(!1, "getHydratedGrids", {
      userViewableGrids: this.userViewableGrids
    }), Object.values(this.userViewableGrids).reduce((e, t) => {
      const n = t.columnOverride ?? this.columns, i = t.rowOverride ?? this.rows, s = Number(n) * Number(i) - k.getNumOccupiedCells(t), r = s > 0 ? Array.from({ length: s }).map(() => ({})) : [];
      return e[t.id] = {
        grid: t,
        gridEntries: [...Object.values(t.entries), ...r]
      }, e;
    }, {});
  }
  /**
   * @override
   */
  async _prepareContext(e) {
    const t = a().settings.get(c, o.rightMargin), n = a().settings.get(c, o.drawerWidth), i = a().settings.get(c, o.drawerHeight), s = a().settings.get(c, o.drawerOpacity), r = a().settings.get(c, o.condensedButton), l = this.getHydratedGrids(), g = Object.keys(l).indexOf(this.data.activeGridId);
    this.tabGroups[M] = g !== -1 ? this.data.activeGridId : Object.keys(l)[0], Object.keys(l).forEach((f) => {
      l[f].grid.cssClass = this.tabGroups[M] === l[f].grid.id ? "active" : "";
    });
    const m = foundry.utils.mergeObject(e, {
      grids: l,
      isGM: !!a().user?.isGM,
      condensedButton: r,
      data: this.data,
      columns: this.columns,
      rows: this.rows,
      drawerWidth: n,
      drawerHeight: i,
      rightMargin: t,
      drawerOpacity: s,
      expanded: this.expanded,
      hidden: !this.hasUserViewableGrids,
      displayDrawer: this.displayDrawer,
      darkTheme: a().settings.get("core", "uiConfig")?.colorScheme?.interface === "dark"
    });
    return m.tabs = Object.keys(l).map((f) => ({
      id: l[f].grid.id,
      group: M,
      label: l[f].grid.name,
      cssClass: l[f].grid.cssClass
    })), u(!1, "_prepareContext", {
      data: this.data,
      newAppData: m
    }), m;
  }
  async _onDrop(e) {
    if (e.stopPropagation(), !a().user?.isGM) return;
    const t = foundry.applications.ux.TextEditor.implementation.getDragEventData(e);
    if (!t || !e.currentTarget || !e.target || (u(!1, "onDrop", {
      event: e,
      data: t,
      closestGridCell: e.currentTarget instanceof HTMLElement ? e.currentTarget.closest(".gm-screen-grid-cell") : null
    }), !["JournalEntry", "JournalEntryPage", "RollTable", "Item", "Actor"].includes(t.type)))
      return;
    const n = t.pack ? `Compendium.${t.pack}.${t.uuid}` : t.uuid;
    if (!(e.target instanceof HTMLElement))
      return;
    const i = e.target.closest(".gm-screen-grid-cell");
    if (!(i instanceof HTMLElement))
      return;
    const s = N(i), r = `${s.x}-${s.y}`, l = await this.getRelevantGmScreenDocument(n), g = {
      ...s,
      entryId: r,
      entityUuid: n,
      type: t.type,
      isDndNpc: l instanceof Actor && a().system.id === "dnd5e" && l?.sheet?.constructor.name === "NPCActorSheet",
      isDndNpcStatBlock: !1
    };
    this.addEntryToActiveGrid(g);
  }
}
let C;
async function j(d) {
  const e = a().settings.get(c, o.gmScreenConfig), t = O(e);
  if (!Object.keys(t).length) {
    ui.notifications?.notify(S().localize(`${p}.warnings.noGrids`), "error");
    return;
  }
  if (a().settings.get(c, o.displayDrawer) && C) {
    C.toggleGmScreenVisibility(d);
    return;
  }
  C || (C = new k());
  const i = d ?? C.state < 1, s = C.state < 1;
  try {
    i ? (s && await C.render(!0), C.minimized && C.maximize(), C.bringToFront()) : C.close();
  } catch (r) {
    u(!1, "error occurred trying to toggle the GM screen", r);
  }
}
function K() {
  C && C.refresh();
}
async function Z() {
  C && await C.switchTab();
}
Handlebars.registerHelper(`${p}-switch`, function(e, t) {
  return this.switch_value = e, t.fn(this);
});
Handlebars.registerHelper(`${p}-case`, function(e, t) {
  return e === this.switch_value ? t.fn(this) : t.inverse(this);
});
Hooks.once("init", async () => {
  u(!0, `Initializing ${c}`), L.init(), await foundry.applications.handlebars.loadTemplates(Object.values(foundry.utils.flattenObject(D)));
});
Hooks.once("ready", async () => {
  await I(), window[c] = { migration: I }, a().settings.get(c, o.displayDrawer) && (C = new k(), C.render(!0));
  const e = a().modules.get(c);
  e && (e.api = {
    toggleGmScreenVisibility: j,
    refreshGmScreen: K,
    switchTab: Z
  }), a().user?.isGM && a().settings.set(c, o.reset, !1);
});
function Y(d) {
  const e = d.querySelector(".header-actions"), t = `<button class="gm-screen-button">
          <i class="fas fa-book-reader"></i> ${S().localize(`${p}.gmScreen.Open`)}
      </button>`;
  e?.insertAdjacentHTML("afterend", t), d.querySelector("button.gm-screen-button")?.addEventListener("click", (i) => {
    i.preventDefault(), j(!0);
  });
}
Hooks.on("renderJournalDirectory", (d, e) => {
  a().settings.get(c, o.displayDrawer) || Y(e);
});
Hooks.once("devModeReady", ({ registerPackageDebugFlag: d }) => {
  d(c);
});
//# sourceMappingURL=foundryvtt-gmScreen.js.map
