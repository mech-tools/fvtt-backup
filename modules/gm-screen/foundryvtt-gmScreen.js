//#region src/module/constants.ts
var e = "gm-screen", t = "GMSCR", n = {
	settings: `modules/${e}/templates/settings.hbs`,
	screen: `modules/${e}/templates/screen.hbs`,
	screenContent: `modules/${e}/templates/parts/screen-content.hbs`,
	screenTabs: `modules/${e}/templates/parts/screen-tabs.hbs`,
	screenCell: `modules/${e}/templates/parts/screen-cell.hbs`,
	screenGrid: `modules/${e}/templates/parts/screen-grid.hbs`,
	grids: { tableRow: `modules/${e}/templates/parts/settings-grid-config-table-row.hbs` }
}, r = "gmScreen-primary", i = /* @__PURE__ */ function(e) {
	return e.columns = "columns", e.displayDrawer = "display-as-drawer", e.drawerHeight = "drawer-height", e.drawerOpacity = "drawer-opacity", e.drawerWidth = "drawer-width", e.gmScreenConfig = "gm-screen-config", e.migrated = "migrated", e.condensedButton = "condensedButton", e.reset = "reset", e.rightMargin = "right-margin", e.rows = "rows", e;
}({}), a = /* @__PURE__ */ function(e) {
	return e.openCloseScreen = "openCloseScreen", e.changeTab = "changeTab", e;
}({}), o = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?/, s = ["DeltaGreenActor", "DeltaGreenItem"];
//#endregion
//#region src/module/helpers.ts
function c() {
	if (!(game instanceof foundry.Game)) throw Error("game is not initialized yet!");
	return game;
}
function l() {
	let { i18n: e } = c();
	return e || { localize: (e) => e };
}
function u(t, ...n) {
	(t || c().modules.get("_dev-mode")?.api?.getPackageDebugValue("gm-screen")) && console.log(e, "|", ...n);
}
function d(e, n) {
	return new Promise((r, i) => {
		new foundry.applications.api.DialogV2({
			window: { title: l().localize(`${t}.cellConfigDialog.CellConfig`) },
			modal: !0,
			content: `
    <div class="form-group">
      <label for="spanRows">${l().localize(`${t}.cellConfigDialog.RowSpan`)}</label>
      <input type="number" step="1" name="spanRows" id="spanRows" min="1" max="${n.rows + 1 - e.y}" value="${e.spanRows || 1}">
    </div>
    <div class="form-group">
      <label for="spanCols">${l().localize(`${t}.cellConfigDialog.ColSpan`)}</label>
      <input type="number" step="1" name="spanCols" id="spanCols" min="1" max="${n.columns + 1 - e.x}" value="${e.spanCols || 1}">
    </div>  
`,
			buttons: [
				{
					action: "no",
					icon: "fas fa-times",
					label: l().localize("Cancel"),
					callback: () => {
						i();
					}
				},
				{
					action: "reset",
					icon: "fas fa-undo",
					label: l().localize("Default"),
					callback: () => {
						let e = {
							newSpanRows: 1,
							newSpanCols: 1
						};
						u(!1, "dialog formValues", e), r(e);
					}
				},
				{
					action: "yes",
					icon: "fas fa-check",
					label: l().localize("Save"),
					default: !0,
					callback: (e, t, n) => {
						let i = n.element, a = {
							newSpanRows: Number(i.querySelector("[name=\"spanRows\"]")?.value),
							newSpanCols: Number(i.querySelector("[name=\"spanCols\"]")?.value)
						};
						u(!1, "dialog formValues", a), r(a);
					}
				}
			]
		}).render({ force: !0 });
	});
}
function f(e) {
	let t = e.parentElement?.closest(".gm-screen-grid");
	if (!t) return {
		x: 1,
		y: 1
	};
	let n = window.getComputedStyle(t);
	u(!1, "getGridElementsPosition", {
		element: e,
		relevantGridElement: t,
		vanillaGridElementStyles: n,
		gap: n.gap,
		gridRowGap: n["grid-row-gap"],
		gridColGap: n["grid-column-gap"]
	});
	let r = Number(n["grid-row-gap"].match(o)[0]), i = n["grid-template-columns"].split(" "), a = Number(i[0].match(o)[0]), s = n["grid-template-rows"].split(" "), c = Number(s[0].match(o)[0]), l = e.getBoundingClientRect(), d = t.getBoundingClientRect(), f = Math.floor((l.left - (d.left - r)) / (a + r)) + 1, p = Math.floor((l.top - (d.top - r)) / (c + r)) + 1;
	return u(!1, "getGridElementsPosition", {
		setup: {
			gap: r,
			cols: i,
			rows: s,
			elementBounds: l,
			gridBounds: d,
			colWidth: a,
			rowHeight: c
		},
		results: {
			elementColumn: f,
			elementRow: p
		}
	}), {
		y: p,
		x: f
	};
}
function p(e) {
	return c().user?.isGM ? e.grids : Object.keys(e.grids).reduce((t, n) => (e.grids[n].isShared && (t[n] = e.grids[n]), t), {});
}
function m(e, t, n, r) {
	e.querySelectorAll(t).forEach((e) => {
		if (!(e instanceof HTMLElement)) return;
		let t = window.getComputedStyle(e)[n];
		e.style.setProperty(r, String(t));
	});
}
function h(e) {
	return async function() {
		this.cellId = e;
		let t = document.getElementById(this.cellId.replace("#", ""));
		if (!t) return;
		let n = t.querySelector(".gm-screen-grid-cell-title");
		n && (n.textContent = this.title);
		let r = t.querySelector(".gm-screen-grid-cell-content");
		if (!r) return;
		r.classList.remove(...Array.from(r.classList)), r.classList.add("gm-screen-grid-cell-content"), r.replaceChildren(this.form);
		let i = r.querySelector(".window-header");
		i instanceof HTMLElement && (i.style.visibility = "hidden");
	};
}
function g() {
	return this;
}
function _(e) {
	return s.includes(e);
}
//#endregion
//#region src/module/migration.ts
async function v() {
	if (!c().user?.isGM) return;
	let t = "2.0.1", n = c().settings.get(e, i.migrated);
	if (n.status && (foundry.utils.isNewerVersion(c().modules.get("gm-screen")?.version ?? "0", t) || n.version === t)) return;
	ui.notifications?.notify("GM Screen | Beginning Migration to updated schema.", "info");
	let r = c().settings.get(e, i.gmScreenConfig);
	if (r?.grid?.entries && Array.isArray(r.grid.entries)) {
		let t = r.grid.entries.reduce((e, t) => {
			let n = `${t.x}-${t.y}`;
			return e[n] = {
				...t,
				entryId: n
			}, e;
		}, {}), n = {
			activeGridId: "default",
			grids: { default: {
				...r.grid,
				entries: t,
				id: "default",
				name: "Main",
				isShared: !1,
				cssClass: "active"
			} }
		};
		u(!0, "migration output", { output: n }), await c().settings.set(e, i.gmScreenConfig, n);
	}
	ui.notifications?.notify("GM Screen | Migration Complete.", "info"), await c().settings.set(e, i.migrated, {
		status: !0,
		version: t
	});
}
//#endregion
//#region src/module/classes/GmScreenSettings.ts
var y = {
	activeGridId: "default",
	grids: { default: {
		name: "Main",
		id: "default",
		isShared: !1,
		entries: {},
		cssClass: "active"
	} }
}, b = class r extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {
	draggedRow;
	static init() {
		c().settings.registerMenu(e, "menu", {
			name: `${t}.settings.${i.gmScreenConfig}.Name`,
			label: `${t}.settings.${i.gmScreenConfig}.Label`,
			icon: "fas fa-table",
			type: r,
			restricted: !0,
			hint: `${t}.settings.${i.gmScreenConfig}.Hint`
		}), c().settings.register(e, i.gmScreenConfig, {
			default: y,
			scope: "world",
			config: !1,
			onChange(...t) {
				u(!1, "gmScreenConfig changed", {
					args: t,
					currentConfig: { ...c().settings.get(e, i.gmScreenConfig) }
				}), c().modules.get(e)?.api?.refreshGmScreen();
			}
		}), c().settings.register(e, i.migrated, {
			config: !1,
			default: {
				status: !1,
				version: "1.2.2"
			},
			scope: "world",
			type: Object
		}), c().settings.register(e, i.columns, {
			name: `${t}.settings.${i.columns}.Name`,
			default: 4,
			type: Number,
			scope: "world",
			config: !0,
			hint: `${t}.settings.${i.columns}.Hint`
		}), c().settings.register(e, i.rows, {
			name: `${t}.settings.${i.rows}.Name`,
			default: 3,
			type: Number,
			scope: "world",
			config: !0,
			hint: `${t}.settings.${i.rows}.Hint`
		}), c().settings.register(e, i.displayDrawer, {
			name: `${t}.settings.${i.displayDrawer}.Name`,
			default: !0,
			type: Boolean,
			scope: "client",
			config: !0,
			hint: `${t}.settings.${i.displayDrawer}.Hint`,
			onChange: () => window.location.reload()
		}), c().settings.register(e, i.rightMargin, {
			name: `${t}.settings.${i.rightMargin}.Name`,
			default: 0,
			type: Number,
			scope: "client",
			range: {
				min: 0,
				max: 75,
				step: 5
			},
			config: !0,
			hint: `${t}.settings.${i.rightMargin}.Hint`
		}), c().settings.register(e, i.drawerWidth, {
			name: `${t}.settings.${i.drawerWidth}.Name`,
			default: 100,
			type: Number,
			scope: "client",
			range: {
				min: 25,
				max: 100,
				step: 1
			},
			config: !0,
			hint: `${t}.settings.${i.drawerWidth}.Hint`
		}), c().settings.register(e, i.drawerHeight, {
			name: `${t}.settings.${i.drawerHeight}.Name`,
			default: 60,
			type: Number,
			scope: "client",
			range: {
				min: 10,
				max: 90,
				step: 1
			},
			config: !0,
			hint: `${t}.settings.${i.drawerHeight}.Hint`
		}), c().settings.register(e, i.drawerOpacity, {
			name: `${t}.settings.${i.drawerOpacity}.Name`,
			default: 1,
			type: Number,
			scope: "client",
			range: {
				min: .1,
				max: 1,
				step: .05
			},
			config: !0,
			hint: `${t}.settings.${i.drawerOpacity}.Hint`
		}), c().settings.register(e, i.condensedButton, {
			name: `${t}.settings.${i.condensedButton}.Name`,
			default: !1,
			type: Boolean,
			scope: "client",
			config: !0,
			hint: `${t}.settings.${i.condensedButton}.Hint`
		}), c().settings.register(e, i.reset, {
			name: `${t}.settings.${i.reset}.Name`,
			default: !1,
			type: Boolean,
			scope: "world",
			config: !0,
			hint: `${t}.settings.${i.reset}.Hint`,
			onChange: (t) => {
				t && c().settings.set(e, i.gmScreenConfig, y);
			}
		}), c().keybindings?.register(e, a.openCloseScreen, {
			name: l().localize(`${t}.keybindings.openCloseScreen`),
			editable: [{ key: "KeyO" }],
			onDown: () => {
				c().modules.get(e)?.api?.toggleGmScreenVisibility();
			},
			onUp: () => {},
			restricted: !1,
			precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
		}), c().keybindings?.register(e, a.changeTab, {
			name: l().localize(`${t}.keybindings.changeTab`),
			editable: [{ key: "KeyP" }],
			onDown: () => {
				c().modules.get(e)?.api?.switchTab();
			},
			onUp: () => {},
			restricted: !1,
			precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
		});
	}
	static PARTS = { content: { template: n.settings } };
	static DEFAULT_OPTIONS = {
		id: "gm-screen-tabs-config",
		classes: ["gm-screen-config"],
		height: "auto",
		width: 600,
		tag: "form",
		form: {
			handler: r.#e,
			submitOnClose: !1,
			submitOnChange: !1,
			closeOnSubmit: !0
		}
	};
	get title() {
		return l().localize(`${t}.gridConfig.GridConfig`);
	}
	get rows() {
		return c().settings.get(e, i.rows);
	}
	get columns() {
		return c().settings.get(e, i.columns);
	}
	get settingsData() {
		let t = c().settings.get(e, i.gmScreenConfig);
		return u(!1, "getSettingsData", { gmScreenConfig: t }), { grids: t.grids };
	}
	async _prepareContext(e) {
		let t = await super._prepareContext(e), n = foundry.utils.mergeObject(t, {
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
		if (!this.draggedRow || !(e.target instanceof HTMLElement)) return;
		let t = e.target.parentElement?.hasAttribute("draggable") ? e.target.parentElement : e.target.parentElement?.parentElement;
		if (!(t instanceof HTMLElement) || !t.hasAttribute("draggable")) return;
		let n = t.parentElement?.children;
		if (!n) return;
		let r = -1, i = -1;
		for (let e = 0; e < (n?.length ?? 0); e += 1) n?.item(e) === t && (r = e), n?.item(e) === this.draggedRow && (i = e);
		r > i ? t.after(this.draggedRow) : t.before(this.draggedRow);
	}
	async _dragEndTab() {
		this.draggedRow = void 0;
	}
	async handleNewRowClick(e) {
		let t = this.element;
		u(!1, "add row clicked", { data: e.dataset });
		let { table: r } = e.dataset, i = t.querySelector("tbody");
		if (!i || !r) return;
		let a = {
			gridId: foundry.utils.randomID(),
			grid: {
				name: "",
				columnOverride: "",
				rowOverride: ""
			},
			defaultColumns: this.columns,
			defaultRows: this.rows
		}, o = await foundry.applications.handlebars.renderTemplate(n[r].tableRow, a);
		i.insertAdjacentHTML("beforeend", o), this.setPosition({});
	}
	handleDeleteRowClick(e) {
		u(!1, "delete row clicked", { currentTarget: e }), e.closest("tr")?.remove(), this.setPosition({});
	}
	addEventListeners() {
		this.element.addEventListener("click", (e) => {
			if (e == null || !(e.target instanceof HTMLElement)) return;
			let t = e.target.closest("button");
			t && (u(!1, "a button was clicked", {
				e,
				currentTarget: t
			}), t.classList.contains("add-row") && this.handleNewRowClick(t), t.classList.contains("delete-row") && this.handleDeleteRowClick(t));
		});
	}
	async _onRender() {
		let e = this.element;
		u(!1, "activateListeners", { html: e }), new foundry.applications.ux.DragDrop({
			dragSelector: "tbody tr",
			dropSelector: "tbody tr",
			permissions: {
				dragstart: () => !!c().user?.isGM,
				drop: () => !!c().user?.isGM
			},
			callbacks: {
				dragstart: this._dragStartTab.bind(this),
				dragover: this._dragOverTab.bind(this),
				dragend: this._dragEndTab.bind(this)
			}
		}).bind(this.element), this.addEventListeners();
	}
	static async #e(n, r, a) {
		let o = c().settings.get(e, i.gmScreenConfig), s = foundry.utils.expandObject(a.object);
		if (u(!1, {
			formData: a,
			data: s
		}), Object.keys(s).length === 0) throw ui.notifications?.error(l().localize(`${t}.gridConfig.errors.empty`)), Error("Cannot save the grid with no tabs.");
		let d = Object.keys(s.grids), f = d.reduce((e, t) => {
			let n = s.grids[t];
			return Object.hasOwn(o.grids, t) ? (e[t] = {
				...o.grids[t],
				...n
			}, e) : (e[t] = {
				...n,
				entries: {},
				name: n.name ?? "",
				isShared: n.isShared ?? !1,
				id: t
			}, e);
		}, {}), p = d.includes(o.activeGridId) ? o.activeGridId : d[0], m = {
			...o,
			grids: f,
			activeGridId: p
		};
		u(!1, "setting settings", { newGmScreenConfig: m }), await c().settings.set(e, i.gmScreenConfig, m), c().modules.get("gm-screen")?.api?.refreshGmScreen();
	}
}, x = class extends foundry.applications.sheets.RollTableSheet {
	cellId;
	constructor(e) {
		super(e), u(!1, "CompactRollTableDisplay constructor", { options: e }), this.cellId = e.cellId;
	}
	get isEditable() {
		return !1;
	}
	_replaceHTML(e, t, n) {
		if (super._replaceHTML(e, t, n), !this.form) return;
		let r = document.getElementById(this.cellId.replace("#", ""));
		if (!r) return;
		let i = r.querySelector(".gm-screen-grid-cell-title");
		i && (i.textContent = this.title);
		let a = r.querySelector(".gm-screen-grid-cell-content");
		if (a) {
			a.replaceChildren(this.form);
			let e = a.querySelector(".window-header");
			e && e.remove();
		}
		this.setPosition({
			width: "auto",
			height: "auto",
			left: 0,
			top: 0
		});
	}
	get id() {
		return `gmscreen-rolltable-${this.document.id}`;
	}
	async close(...e) {
		return e.length === 0 ? super.close(...e) : this;
	}
}, S = class extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet {
	cellId;
	constructor(e) {
		super(e), this.cellId = e.cellId;
	}
	get isEditable() {
		return !1;
	}
	_replaceHTML(e, t, n) {
		if (super._replaceHTML(e, t, n), !this.form) return;
		let r = document.getElementById(this.cellId.replace("#", ""));
		if (!r) return;
		let i = r.querySelector(".gm-screen-grid-cell-title");
		i && (i.textContent = this.options.document.name);
		let a = r.querySelector(".gm-screen-grid-cell-content");
		if (!a) return;
		let o = r.querySelector("a[data-link]");
		switch (this.options.document.type) {
			case "image":
				if (a.innerHTML = `<img src="${this.options.document.src}" alt="${this.options.document.image.caption || "image"}"></img>`, !o) break;
				o.removeAttribute("data-link"), o.setAttribute("data-action", "open");
				break;
			case "pdf":
				a.innerHTML = `<iframe src="scripts/pdfjs/web/viewer.html?file=${this.options.document.src?.startsWith("https://") || this.options.document.src?.startsWith("http://") ? this.options.document.src : `/${this.options.document.src}`}"></iframe>`;
				break;
			case "video":
				a.innerHTML = `<video src="${this.options.document.src}" ${this.options.document.video.controls ? "controls" : ""} ${this.options.document.video.autoplay ? "autoplay" : ""}></video>`;
				break;
			default: this.options.document.text.content && (a.innerHTML = this.options.document.text.content);
		}
		this.form.style.display = "none";
	}
	get id() {
		return `gmscreen-journal-page-${this.document.id}`;
	}
	async close(...e) {
		return e.length === 0 ? super.close(...e) : this;
	}
}, C = class extends foundry.applications.sheets.journal.JournalEntrySheet {
	cellId;
	constructor(e) {
		super(e), this.cellId = e.cellId;
	}
	get isEditable() {
		return !1;
	}
	_replaceHTML(e, t, n) {
		if (super._replaceHTML(e, t, n), !this.form) return;
		let r = document.getElementById(this.cellId.replace("#", ""));
		if (!r) return;
		let i = r.querySelector(".gm-screen-grid-cell-title");
		i && (i.textContent = this.title);
		let a = r.querySelector(".gm-screen-grid-cell-content");
		if (a) {
			a.replaceChildren(this.form);
			let e = a.querySelector(".window-header");
			e && e.remove(), a.classList.remove(...a.classList), a.classList.add("gm-screen-grid-cell-content");
		}
		this.toggleSidebar();
	}
	get id() {
		return `gmscreen-journal-${this.document.id}`;
	}
	async close(...e) {
		return e.length === 0 ? super.close(...e) : this;
	}
}, w = /* @__PURE__ */ function(e) {
	return e.clearGrid = "clearGrid", e.refresh = "refresh", e.clearCell = "clearCell", e.configureCell = "configureCell", e.open = "open", e.statBlock = "statBlock", e.toggleGmScreen = "toggle-gm-screen", e.tab = "tab", e.chooseImage = "chooseImage", e;
}(w || {}), T = class a extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {
	expanded;
	data;
	apps;
	currentTab;
	draggedTab;
	constructor(n = {}) {
		super(n), this.expanded = !1, this.data = c().settings.get(e, i.gmScreenConfig), this.apps = {}, this.currentTab = this.data.activeGridId;
		let r = c().settings.get(e, i.columns), a = c().settings.get(e, i.rows), o = c().settings.get(e, i.displayDrawer), s = { window: {
			...this.options.window,
			resizable: !1,
			frame: !1
		} }, d = [{
			action: w.clearGrid,
			label: l().localize(`${t}.gmScreen.Reset`),
			class: "clear",
			icon: "fas fa-ban",
			onClick: () => this.handleClear.bind(this)()
		}], f = {
			classes: ["window-app", "gm-screen-popOut"],
			width: Number(r) * 400,
			height: Number(a) * 300,
			window: {
				...this.options.window,
				resizable: !0,
				frame: !0,
				controls: [
					...this.options.window.controls,
					{
						action: w.refresh,
						label: l().localize(`${t}.gmScreen.Refresh`),
						class: "refresh",
						icon: "fas fa-sync",
						onClick: () => this.refresh()
					},
					...c().user?.isGM ? d : []
				]
			}
		};
		u(!1, {
			displayDrawer: o,
			options: o ? s : f
		}), this.options = {
			...this.options,
			...o ? s : f
		};
	}
	static PARTS = {
		tabs: { template: n.screenTabs },
		content: { template: n.screenContent }
	};
	static DEFAULT_OPTIONS = { id: "gm-screen-app" };
	get rows() {
		return c().settings.get(e, i.rows);
	}
	get columns() {
		return c().settings.get(e, i.columns);
	}
	get displayDrawer() {
		return c().settings.get(e, i.displayDrawer);
	}
	get userViewableGrids() {
		return p(this.data);
	}
	get hasUserViewableGrids() {
		return !!Object.keys(this.userViewableGrids).length;
	}
	get title() {
		return this.displayDrawer ? "" : l().localize(`${t}.gmScreen.Title`);
	}
	get activeGrid() {
		return this.data.grids[this.data.activeGridId];
	}
	static getNumOccupiedCells(e) {
		return Object.values(e.entries).reduce((e, t) => e + (t.spanCols || 1) * (t.spanRows || 1), 0);
	}
	async setGridData(t) {
		let n = foundry.utils.deepClone(this.data);
		if (!foundry.utils.setProperty(n, `grids.${t.id}`, t)) {
			u(!0, "error occurred trying to set a grid data");
			return;
		}
		await c().settings.set(e, i.gmScreenConfig, n);
	}
	async addEntryToActiveGrid(e) {
		let t = { ...this.activeGrid.entries };
		t[e.entryId] = {
			...t[e.entryId],
			...e
		};
		let n = {
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
	async removeEntryFromActiveGrid(e, t) {
		let n = foundry.utils.deepClone(this.activeGrid.entries[e]), r = n.spanCols || n.spanRows, i = { ...this.activeGrid.entries };
		if (r ? (delete n.entityUuid, delete n.type, delete n.isDndNpc, delete n.isDndNpcStatBlock, delete n.imagePath, i[e] = n) : delete i[e], t) {
			let e = `#${t}`;
			await this.apps[e]?.close(), delete this.apps[e];
		}
		let a = {
			...this.activeGrid,
			entries: i
		};
		this.setGridData(a);
	}
	bringToFront() {
		if (!this.displayDrawer) {
			super.bringToFront();
			return;
		}
		this.position.zIndex !== foundry.applications.api.ApplicationV2._maxZ && (foundry.applications.api.ApplicationV2._maxZ += 1, this.setPosition({ zIndex: foundry.applications.api.ApplicationV2._maxZ }));
	}
	toggleGmScreenVisibility(e = !this.expanded) {
		this.expanded = e, this.expanded ? (this.bringToFront(), this.element.classList.add("expanded"), this.element.style.setProperty("z-index", this.position.zIndex.toString())) : this.element.classList.remove("expanded");
	}
	async handleClear() {
		u(!1, "handleClear"), await foundry.applications.api.DialogV2.confirm({
			title: l().localize("GMSCR.warnings.clearConfirm.Title"),
			content: l().localize("GMSCR.warnings.clearConfirm.Content")
		}) && (this.apps = {}, this.setGridData({
			...this.activeGrid,
			entries: {}
		}));
	}
	_dragStartTab(e) {
		e.target instanceof HTMLElement && (this.draggedTab = e.target);
	}
	_dragOverTab(e) {
		if (!this.draggedTab || !(e.target instanceof HTMLElement)) return;
		let t = e.target.closest(".gm-screen-tabs")?.children;
		if (!t) return;
		let n = -1, r = -1;
		Array.from(t).forEach((i, a) => {
			i instanceof HTMLElement && (t?.item(a) === e.target && (n = a), t?.item(a) === this.draggedTab && (r = a));
		}), n > r ? e.target.after(this.draggedTab) : e.target.before(this.draggedTab);
	}
	async _dragEndTab(t) {
		if (!this.draggedTab || !(t.target instanceof HTMLElement)) return;
		let n = foundry.utils.deepClone(this.data);
		n.grids = {}, Array.from(t.target.closest(".gm-screen-tabs")?.children || []).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = e.dataset.tab;
			t && (n.grids[t] = this.data.grids[t]);
		}), this.draggedTab = void 0, await c().settings.set(e, i.gmScreenConfig, n);
	}
	async handleClickEvent(t) {
		if (t.preventDefault(), !(t.currentTarget instanceof HTMLElement)) return;
		let n = t.currentTarget.dataset.action, r = t.currentTarget.closest("[data-entity-uuid]"), a = r instanceof HTMLElement ? r.dataset.entityUuid : void 0, o = t.currentTarget.closest("[data-entry-id]"), s = o instanceof HTMLElement ? o.dataset.entryId : void 0, l = o instanceof HTMLElement ? o.id : void 0;
		switch (u(!1, "handleClickEvent", {
			e: t,
			action: n
		}), n) {
			case w.clearCell:
				if (!s) return;
				this.removeEntryFromActiveGrid(s, l);
				break;
			case w.clearGrid:
				this.handleClear();
				break;
			case w.configureCell:
				try {
					if (!(t.target instanceof HTMLElement) || !(t.target.parentElement instanceof HTMLElement)) return;
					let { x: e, y: n } = f(t.target.parentElement), r = s ? this.activeGrid.entries[s] : {
						x: e,
						y: n,
						entryId: `${e}-${n}`
					};
					u(!1, "configureCell cellToConfigure", r);
					let { newSpanRows: i, newSpanCols: a } = await d(r, {
						rows: this.rows,
						columns: this.columns
					});
					u(!1, "new span values from dialog", {
						newSpanRows: i,
						newSpanCols: a
					});
					let o = {
						...r,
						spanRows: i,
						spanCols: a
					}, c = {
						...this.activeGrid.entries,
						[o.entryId]: o
					}, l = [...Array(o.spanCols).keys()].map((e, t) => {
						let n = o.x + t;
						return [...Array(o.spanRows).keys()].map((e, t) => `${n}-${o.y + t}`);
					}).flat();
					u(!1, { problemCoordinates: l }), Object.values(c).forEach((e) => {
						l.includes(e.entryId) && e.entryId !== o.entryId && delete c[e.entryId];
					}), u(!1, "newEntries", c);
					let p = {
						...this.activeGrid,
						entries: c
					};
					this.setGridData(p);
				} catch (e) {
					u(!1, "User exited configure cell Dialog.", e);
				}
				break;
			case w.open: {
				if (!a || !s) return;
				let e = this.activeGrid.entries[s];
				if (e.type === "Image") {
					if (!e.imagePath) return;
					new foundry.applications.apps.ImagePopout({
						src: e.imagePath,
						uuid: a,
						window: { title: e.imagePath }
					}).render({ force: !0 });
					return;
				}
				try {
					let e = await this.getRelevantGmScreenDocument(a), t = e?.sheet;
					if (u(!1, "trying to edit entity", { relevantEntitySheet: t }), !t) return;
					if (t.rendered) {
						t.maximize(), t.bringToTop();
						return;
					}
					if (e instanceof JournalEntryPage && e.type === "image" && t instanceof foundry.applications.sheets.journal.JournalEntryPageImageSheet) {
						new foundry.applications.apps.ImagePopout({
							src: t.options.document.src,
							uuid: a,
							window: { title: e.name }
						}).render({ force: !0 });
						return;
					}
					t.render(!0);
				} catch (e) {
					u(!0, "error opening entity sheet", e);
				}
				break;
			}
			case w.refresh:
				this.refresh();
				break;
			case w.tab: {
				let n = t.currentTarget.dataset.tab;
				if (this.currentTab = n ?? this.currentTab, !c().user?.isGM || n === this.data.activeGridId || !n) return;
				u(!1, "trying to set active grid", { newActiveGridId: n });
				try {
					let t = {
						...this.data,
						activeGridId: n
					};
					await c().settings.set(e, i.gmScreenConfig, t);
				} catch (e) {
					u(!0, "error setting active tab", e);
				}
				break;
			}
			case w.toggleGmScreen:
				try {
					this.toggleGmScreenVisibility();
				} catch (e) {
					u(!0, "error toggling GM Screen", e);
				}
				break;
			case w.statBlock: {
				if (!l || !s) return;
				let e = { ...this.activeGrid.entries };
				e[s].isDndNpcStatBlock = !e[s].isDndNpcStatBlock;
				let t = {
					...this.activeGrid,
					entries: e
				};
				await this.setGridData(t);
				break;
			}
			case w.chooseImage: {
				let e = t.currentTarget.closest(".gm-screen-grid-cell");
				if (!(e instanceof HTMLElement)) return;
				let n = f(e), r = `${n.x}-${n.y}`;
				new foundry.applications.apps.FilePicker({
					type: "image",
					callback: (e) => {
						let t = {
							...n,
							entryId: r,
							entityUuid: `Image.${foundry.utils.randomID()}`,
							type: "Image",
							isDndNpc: !1,
							isDndNpcStatBlock: !1,
							imagePath: e
						};
						this.addEntryToActiveGrid(t);
					}
				}).render({ force: !0 });
				break;
			}
			default:
		}
	}
	async switchTab() {
		let t = Object.keys(this.userViewableGrids);
		if (t.length <= 1) return;
		let n = c().user?.isGM, a = t[(t.indexOf(n ? this.data.activeGridId : this.currentTab) + 1) % t.length];
		u(!1, "trying to set active grid", { newActiveGridId: a });
		try {
			if (this.changeTab(a, r), this.currentTab = a, !n) return;
			let t = {
				...this.data,
				activeGridId: a
			};
			await c().settings.set(e, i.gmScreenConfig, t);
		} catch (e) {
			u(!0, "error setting active tab", e);
		}
	}
	updateClassesAndFixButtons() {
		if (this.displayDrawer) return;
		let e = document.getElementById("gm-screen-app");
		if (!e) return;
		e?.classList.add("application");
		let t = e?.querySelector(".window-header");
		t && e?.querySelector(".window-content")?.prepend(t);
	}
	async _renderFrame(e) {
		if (!this.displayDrawer) return super._renderFrame(e);
		let t = await foundry.applications.handlebars.renderTemplate(n.screen, await this._prepareContext(this.options)), r = document.createElement("div");
		if (r.innerHTML = t, !(r.children[0] instanceof HTMLElement)) throw Error("Failed to render GmScreenApplication frame template");
		return r.children[0];
	}
	render(...e) {
		return !this.hasUserViewableGrids && this.rendered && this.close(), super.render(...e);
	}
	async refresh() {
		let t = c().settings.get(e, i.gmScreenConfig), n = foundry.utils.deepClone(this.data), r = foundry.utils.diffObject(n, t);
		if (u(!1, "refreshing gm screen", {
			newData: foundry.utils.deepClone(t),
			data: n,
			diffData: r
		}), this.data = t, Object.keys(r).length) {
			if (Object.keys(r).every((e) => e === "activeGridId") || Object.values(r.grids || {}).every((e) => Object.keys(e).every((e) => e === "cssClass"))) {
				u(!1, "not rerendering because only activeGridId changed or cssClass changed");
				return;
			}
			let e = Object.keys(r?.grids ?? {}), t = Object.keys(this.userViewableGrids), i = Object.keys(p(n)), a = !e.filter((e) => t.includes(e)).length, o = t.length === i.length && t.every((e) => i.includes(e)), s = a && o;
			if (u(!1, "gridIdChecks", {
				diffGridIds: e,
				myOldGridIds: i,
				myNewGridIds: t,
				diffOverlapsNewGridIds: a,
				oldAndNewGridIdsAreEqual: o,
				shouldNotRerender: s
			}), s) {
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
			permissions: {
				dragstart: () => !!c().user?.isGM,
				drop: () => !!c().user?.isGM
			},
			callbacks: { drop: this._onDrop.bind(this) }
		}).bind(this.element), new foundry.applications.ux.DragDrop({
			dragSelector: ".gm-screen-tabs button",
			dropSelector: ".gm-screen-tabs button",
			permissions: {
				dragstart: () => !!c().user?.isGM,
				drop: () => !!c().user?.isGM
			},
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
		}), !this.hasUserViewableGrids) return;
		this.injectCellContents(), this.updateClassesAndFixButtons();
		let e = document.querySelector(".gm-screen-grid");
		if (!e) return;
		let t = getComputedStyle(e)["grid-template-columns"].split(" ")[0];
		this.element.querySelectorAll(".gm-screen-grid").forEach((e) => {
			e instanceof HTMLElement && e.style.setProperty("--grid-cell-width", t);
		});
	}
	addListeners() {
		this.element.querySelectorAll(".gm-screen-actions button, .gm-screen-grid-cell-header a").forEach((e) => {
			e.addEventListener("click", this.handleClickEvent.bind(this));
		}), this.element.querySelector(".gm-screen-button")?.addEventListener("contextmenu", async () => {
			c().user?.isGM && await new b({}).render({ force: !0 });
		});
	}
	async getRelevantGmScreenDocument(e) {
		let t = await fromUuid(e);
		if (t instanceof Actor || t instanceof Item || t instanceof JournalEntry || t instanceof RollTable || t instanceof JournalEntryPage) return t;
	}
	async getCellApplicationClass(e, t, n, r) {
		let i = await this.getRelevantGmScreenDocument(e);
		if (!i) {
			await this.apps[t]?.close(), delete this.apps[t], console.warn("One of the grid cells tried to render an entity that does not exist.", e);
			return;
		}
		this.apps[t] && this.apps[t]?.document.uuid !== e && (await this.apps[t].close(), delete this.apps[t]);
		let { sheet: a } = i, o = a?.constructor;
		if (this.apps[t] && this.apps[t].constructor.name !== o?.name && (await this.apps[t].close(), delete this.apps[t]), this.apps[t] && this.apps[t].constructor.name === o?.name && (!n || this.apps[t].id.includes(r ? "gmscreen-npc-" : "gmscreen-actor-"))) return u(!1, `using cached application instance for "${i.name}"`, {
			entityUuid: e,
			app: this.apps[t]
		}), this.apps[t];
		if (u(!1, "relevantEntity sheet", {
			sheet: a,
			name: o?.name
		}), !o) {
			u(!0, "no sheet class found for relevantDocument", {
				relevantDocument: i,
				entityUuid: e
			});
			return;
		}
		switch (!0) {
			case i instanceof JournalEntry:
				if (u(!1, `creating compact journal entry for "${i.name}"`, { cellId: t }), a instanceof foundry.applications.sheets.journal.JournalEntrySheet) return this.apps[t] = new C({
					document: i,
					editable: !1,
					cellId: t,
					id: `gmscreen-journal-${i.id}`,
					window: {
						...a.options.window,
						positioned: !1,
						resizable: !1
					}
				}), this.apps[t];
				this.apps[t] = new C({
					document: i,
					editable: !1,
					cellId: t,
					id: `gmscreen-journal-${i.id}`,
					window: {
						positioned: !1,
						resizable: !1
					}
				});
				break;
			case a instanceof foundry.applications.sheets.journal.JournalEntryPageProseMirrorSheet && i instanceof JournalEntryPage && a.options.document.type === "text":
				u(!1, `creating compact JournalEntryPage for "${i.name}"`, { cellId: t });
				let e = new o({
					...a.options,
					mode: "view",
					id: `gmscreen-text-${a.document.id}`,
					classes: [
						"application",
						"sheet",
						"journal-sheet",
						"journal-entry",
						"maximizing"
					],
					document: i,
					window: {
						...a.options.window,
						frame: !1,
						positioned: !1,
						resizable: !1
					}
				});
				e._postRender = async function() {
					this.cellId = t;
					let e = document.getElementById(this.cellId.replace("#", ""));
					if (!e) return;
					let n = e.querySelector(".gm-screen-grid-cell-title");
					n && (n.textContent = this.options.document.name);
					let r = e.querySelector(".gm-screen-grid-cell-content");
					if (!r) return;
					r.classList.remove(...r.classList), r.classList.add("gm-screen-grid-cell-content"), r.replaceChildren(this.form);
					let i = document.createElement("section");
					i.classList.add("journal-entry-content", "journal-entry-page", "overflow-y"), i.replaceChildren(...r.children[0].childNodes), r.children[0].replaceChildren(i), r.querySelector(".window-header")?.remove();
				}, e.close = g, this.apps[t] = e;
				break;
			case i instanceof JournalEntryPage:
				u(!1, `creating compact JournalEntryPage for "${i.name}"`, { cellId: t }), this.apps[t] = new S({
					document: i,
					id: `gmscreen-journalentrypage-${i.id}`,
					cellId: t
				});
				break;
			case i instanceof RollTable:
				u(!1, `creating compact rollTableDisplay for "${i.name}"`, { cellId: t }), this.apps[t] = new x({
					document: i,
					id: `gmscreen-rolltable-${i.id}`,
					cellId: t
				});
				break;
			case a instanceof foundry.applications.sheets.ActorSheetV2 && i instanceof Actor:
				u(!1, `creating ActorSheetV2 for "${i.name}"`, { cellId: t });
				let n = new o({
					...a.options,
					id: r ? `gmscreen-npc-${a.document.id}` : `gmscreen-actor-${a.document.id}`,
					classes: [],
					document: i,
					window: {
						...a.options.window,
						frame: !0,
						positioned: !1,
						resizable: _(i.constructor.name)
					}
				});
				n._postRender = async function() {
					this.cellId = t;
					let e = document.getElementById(this.cellId.replace("#", ""));
					if (!e) return;
					let n = e.querySelector(".gm-screen-grid-cell-title");
					n && (n.textContent = this.title);
					let a = e.querySelector(".gm-screen-grid-cell-content");
					if (!a) return;
					if (a.classList.remove(...a.classList), a.classList.add("gm-screen-grid-cell-content"), a.replaceChildren(this.form), !r) {
						let e = a.querySelector(".window-header");
						e instanceof HTMLElement && (e.style.visibility = "hidden");
						return;
					}
					a.classList.add("dnd5e2");
					let o = await i.toEmbed({
						label: "",
						values: ["statblock"],
						inline: !1,
						cite: !0,
						caption: !1,
						captionPosition: "bottom"
					}) || this.form, s = document.createElement("div");
					s.classList.add("dnd5e2-journal", "journal-entry-content", "journal-page-content"), s.appendChild(o), a.replaceChildren(s);
				}, n.close = g, this.apps[t] = n;
				break;
			case a instanceof foundry.applications.api.DocumentSheetV2 && i instanceof Item:
				u(!1, `creating ItemSheetV2 for "${i.name}"`, { cellId: t });
				let s = new o({
					...a.options,
					id: `gmscreen-item-${a.document.id}`,
					document: i,
					window: {
						...a.options.window,
						frame: !0,
						positioned: !1,
						resizable: !1
					}
				});
				s._postRender = h(t), s.close = g, this.apps[t] = s;
				break;
			default:
				u(!1, `creating compact generic for "${i.name}"`, { cellId: t });
				let c = new o(i, {
					...a.options,
					width: "100%",
					height: "100%",
					positioned: !1,
					resizable: _(i.constructor.name)
				});
				c.options.id = `gmscreen-compact-${i.id}`, c.options.editable = !1, c.options.popOut = !1, c.cellId = t, c._injectHTML = function(e) {
					let t = document.getElementById(this.cellId.replace("#", ""));
					if (!t) return;
					let n = t.querySelector(".gm-screen-grid-cell-title");
					n && (n.textContent = this.title);
					let r = t.querySelector(".gm-screen-grid-cell-content");
					if (!r) return;
					let i = e.get(0);
					if (!i) return;
					u(!1, "CompactEntitySheet overwritten _injectHTML", {
						targetElement: r,
						gridCellContent: r,
						cellId: this.cellId,
						pureHTML: i
					});
					let a = document.createElement("section");
					a.classList.add("window-content"), a.appendChild(i), r.replaceChildren(a), this._element = e;
				}, c._replaceHTML = function(e, t) {
					let n = document.getElementById(this.cellId.replace("#", ""));
					if (!n) return;
					let r = n.querySelector(".gm-screen-grid-cell-title");
					r && (r.textContent = this.title);
					let i = n.querySelector(".gm-screen-grid-cell-content");
					if (!i) return;
					let a = t.get(0);
					if (!a) return;
					let o = document.createElement("section");
					o.classList.add("window-content"), o.appendChild(a), i.replaceChildren(o), this._element = t;
				}, u(!1, `created compact generic for "${i.name}"`, { sheet: c }), this.apps[t] = c;
		}
		return this.apps[t];
	}
	injectCellContents() {
		this.element.querySelectorAll("[data-entity-uuid]").forEach((e) => {
			try {
				if (!(e instanceof HTMLElement)) return;
				let t = e.dataset.entityUuid;
				if (!t) return;
				let n = `#${e.id}`, { entryId: r, dndNpc: i, dndNpcStatBlock: a, imagePath: o } = e.dataset;
				if (u(!1, "gridEntry with uuid defined found", {
					relevantUuid: t,
					cellId: n,
					gridEntry: e,
					imagePath: o
				}), o) return;
				this.getCellApplicationClass(t, n, i === "true", a === "true").then(async (t) => {
					if (u(!1, `got application for "${n}"`, { application: t }), !t) throw r && await this.removeEntryFromActiveGrid(r, n.replace("#", "")), Error("no application exists to render");
					let i = e.querySelector(".gm-screen-grid-cell-content");
					t.options.classes.length > 0 && i?.classList.add(...t.options.classes), t.render(!0);
				}).catch((r) => {
					u(!0, "error trying to render a gridEntry", {
						gridEntry: e,
						cellId: n,
						relevantUuid: t,
						error: r
					});
				});
			} catch (t) {
				u(!1, "erroring", t, { gridEntry: e });
			}
		}), m(this.element, ".gm-screen-grid-cell", "width", "--this-cell-width");
	}
	getHydratedGrids() {
		return u(!1, "getHydratedGrids", { userViewableGrids: this.userViewableGrids }), Object.values(this.userViewableGrids).reduce((e, t) => {
			let n = t.columnOverride ?? this.columns, r = t.rowOverride ?? this.rows, i = Number(n) * Number(r) - a.getNumOccupiedCells(t), o = i > 0 ? Array.from({ length: i }).map(() => ({})) : [];
			return e[t.id] = {
				grid: t,
				gridEntries: [...Object.values(t.entries), ...o]
			}, e;
		}, {});
	}
	async _prepareContext(t) {
		let n = c().settings.get(e, i.rightMargin), a = c().settings.get(e, i.drawerWidth), o = c().settings.get(e, i.drawerHeight), s = c().settings.get(e, i.drawerOpacity), l = c().settings.get(e, i.condensedButton), d = this.getHydratedGrids(), f = Object.keys(d).indexOf(this.data.activeGridId);
		this.tabGroups[r] = f === -1 ? Object.keys(d)[0] : this.data.activeGridId, Object.keys(d).forEach((e) => {
			d[e].grid.cssClass = this.tabGroups["gmScreen-primary"] === d[e].grid.id ? "active" : "";
		});
		let p = foundry.utils.mergeObject(t, {
			grids: d,
			isGM: !!c().user?.isGM,
			condensedButton: l,
			data: this.data,
			columns: this.columns,
			rows: this.rows,
			drawerWidth: a,
			drawerHeight: o,
			rightMargin: n,
			drawerOpacity: s,
			expanded: this.expanded,
			hidden: !this.hasUserViewableGrids,
			displayDrawer: this.displayDrawer,
			darkThemeUI: c().settings.get("core", "uiConfig")?.colorScheme?.interface === "dark",
			darkThemeApps: c().settings.get("core", "uiConfig")?.colorScheme?.applications === "dark"
		});
		return p.tabs = Object.keys(d).map((e) => ({
			id: d[e].grid.id,
			group: r,
			label: d[e].grid.name,
			cssClass: d[e].grid.cssClass
		})), u(!1, "_prepareContext", {
			data: this.data,
			newAppData: p
		}), p;
	}
	async _onDrop(e) {
		if (e.stopPropagation(), !c().user?.isGM) return;
		let t = foundry.applications.ux.TextEditor.implementation.getDragEventData(e);
		if (!t || !e.currentTarget || !e.target || (u(!1, "onDrop", {
			event: e,
			data: t,
			closestGridCell: e.currentTarget instanceof HTMLElement ? e.currentTarget.closest(".gm-screen-grid-cell") : null
		}), ![
			"JournalEntry",
			"JournalEntryPage",
			"RollTable",
			"Item",
			"Actor"
		].includes(t.type))) return;
		let n = t.pack ? `Compendium.${t.pack}.${t.uuid}` : t.uuid;
		if (!(e.target instanceof HTMLElement)) return;
		let r = e.target.closest(".gm-screen-grid-cell");
		if (!(r instanceof HTMLElement)) return;
		let i = f(r), a = `${i.x}-${i.y}`, o = await this.getRelevantGmScreenDocument(n), s = {
			...i,
			entryId: a,
			entityUuid: n,
			type: t.type,
			isDndNpc: o instanceof Actor && c().system.id === "dnd5e" && o?.sheet?.constructor.name === "NPCActorSheet",
			isDndNpcStatBlock: !1
		};
		this.addEntryToActiveGrid(s);
	}
}, E;
async function D(n) {
	let r = p(c().settings.get(e, i.gmScreenConfig));
	if (!Object.keys(r).length) {
		ui.notifications?.notify(l().localize(`${t}.warnings.noGrids`), "error");
		return;
	}
	if (c().settings.get("gm-screen", i.displayDrawer) && E) {
		E.toggleGmScreenVisibility(n);
		return;
	}
	E ||= new T();
	let a = n ?? E.state < 1, o = E.state < 1;
	try {
		a ? (o && await E.render(!0), E.minimized && E.maximize(), E.bringToFront()) : E.close();
	} catch (e) {
		u(!1, "error occurred trying to toggle the GM screen", e);
	}
}
function O() {
	E && E.refresh();
}
async function k() {
	E && await E.switchTab();
}
Handlebars.registerHelper(`${t}-switch`, function(e, t) {
	return this.switch_value = e, t.fn(this);
}), Handlebars.registerHelper(`${t}-case`, function(e, t) {
	return e === this.switch_value ? t.fn(this) : t.inverse(this);
}), Hooks.once("init", async () => {
	u(!0, `Initializing ${e}`), b.init(), await foundry.applications.handlebars.loadTemplates(Object.values(foundry.utils.flattenObject(n)));
}), Hooks.once("ready", async () => {
	await v(), window[e] = { migration: v }, c().settings.get("gm-screen", i.displayDrawer) && (E = new T(), E.render(!0));
	let t = c().modules.get(e);
	t && (t.api = {
		toggleGmScreenVisibility: D,
		refreshGmScreen: O,
		switchTab: k
	}), c().user?.isGM && c().settings.set(e, i.reset, !1);
});
function A(e) {
	let n = e.querySelector(".header-actions"), r = `<button class="gm-screen-button">
          <i class="fas fa-book-reader"></i> ${l().localize(`${t}.gmScreen.Open`)}
      </button>`;
	n?.insertAdjacentHTML("afterend", r), e.querySelector("button.gm-screen-button")?.addEventListener("click", (e) => {
		e.preventDefault(), D(!0);
	});
}
Hooks.on("renderJournalDirectory", (e, t) => {
	c().settings.get("gm-screen", i.displayDrawer) || A(t);
}), Hooks.once("devModeReady", ({ registerPackageDebugFlag: t }) => {
	t(e);
});
//#endregion

//# sourceMappingURL=foundryvtt-gmScreen.js.map