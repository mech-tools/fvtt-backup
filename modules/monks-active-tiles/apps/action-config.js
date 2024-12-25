import { MonksActiveTiles, log, error, setting, i18n, makeid } from '../monks-active-tiles.js';
import { LocationEdit } from './location-edit.js';
import { EntityEdit } from './entity-edit.js';

export class ActionConfig extends FormApplication {
    constructor(object, options = {}) {
        super(object, options);

        this.tokenAttr = [];
        this.tileAttr = [];

        //let's just grab the first player character we can find
        let token = canvas.scene.tokens?.contents[0];
        if (token) {
            try {
                let attributes = getDocumentClass("Token").getTrackedAttributes(token ?? {});
                if (attributes)
                    this.tokenAttr = (this.tokenAttr || []).concat(attributes.value.concat(attributes.bar).map(a => a.join('.')));
            } catch { }
        }
        let player = game.actors.find(a => a.type == 'character');
        if (player) {
            try {
                let attributes = getDocumentClass("Token").getTrackedAttributes(player.system ?? {});
                if (attributes)
                    this.tokenAttr = (this.tokenAttr || []).concat(attributes.value.concat(attributes.bar).map(a => a.join('.')));
            } catch {}
        }

        let tile = canvas.scene.tiles?.contents[0];
        if (tile) {
            try {
                this.tileAttr = (ActionConfig.getTileTrackedAttributes(tile.schema ?? {}) || [])
                    .filter(a => a && a.length > 0)
                    .map(a => a.join('.'));
            } catch (e) {
                log(e);
            }
        }

        this.autoanchors = [
            "_enter",
            "_exit",
            "_movement",
            "_stop",
            "_elevation",
            "_rotation",
            "_darkness",
            "_time",
            "_click",
            "_rightclick",
            "_dblrightclick",
            "_dblclick",
            "_create",
            "_hoverin",
            "_hoverout",
            "_combatstart",
            "_round",
            "_turn",
            "_turnend",
            "_combatend",
            "_ready",
            "_manual",
            "_gm",
            "_player",
            "_dooropen",
            "_doorclose",
            "_doorsecret",
            "_doorlock",
            "_left",
            "_up",
            "_right",
            "_down",
            "_up-left",
            "_up-right",
            "_down-left",
            "_down-right"
        ];
    }

    /** @inheritdoc */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "trigger-action",
            classes: ["form", "action-sheet"],
            title: "MonksActiveTiles.TriggerAction",
            template: "modules/monks-active-tiles/templates/action-config.html",
            width: 550,
            height: 'auto',
            dragDrop: [
                { dragSelector: ".document.actor", dropSelector: ".action-container" },
                { dragSelector: ".document.item", dropSelector: ".action-container" },
                { dragSelector: ".items-list .button-list .file-row", dropSelector: ".items-list .button-list" }
            ]
        });
    }

    getData(options) {
        let groups = {};
        for (let group of Object.keys(MonksActiveTiles.triggerGroups))
            groups[group] = [];
        for (let [k, v] of Object.entries(MonksActiveTiles.triggerActions)) {
            let group = v.group || 'actions';
            if (groups[group] == undefined) {
                error(`${group} is not a registered Tile Group`);
                continue;
            }
            if (v.visible === false)
                continue;
            groups[group].push({ id: k, name: i18n(v.name)});
        }

        let availableActions = Object.entries(groups).map(([k, v]) => {
            return (v.length > 0 ? {
                text: i18n(MonksActiveTiles.triggerGroups[k].name),
                groups: v.sort((a, b) => {
                    // Sort by name
                    return a.name.localeCompare(b.name);

                }).reduce(function (result, item) {
                    result[item.id] = item.name;
                    return result;
                }, {})
            } : null);
        }).filter(g => g);

        /*
        let availableActions = temp.sort((a, b) => { return (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)) }).reduce(function (result, item) {
            result[item.id] = item.name;
            return result;
        }, {});*/

        return foundry.utils.mergeObject(super.getData(options), {
            availableActions: availableActions
        });
    }

    activateListeners(html) {
        var that = this;
        super.activateListeners(html);

        this.changeAction.call(this, this.object.action);
        
        $('select[name="action"]', html).change(function () {
            //clear out these before saving the new information so we don't get data bleed through
            if (that.object.data) {
                that.object.data.location = {};
                that.object.data.entity = {};
                that.object.data.item = {};
                that.object.data.actor = {};
                that.object.data.token = {};
            }
            that.changeAction.call(that);
        });
    }

    _activateFilePicker(event) {
        event.preventDefault();
        const options = this._getFilePickerOptions(event);
        options.wildcard = true;
        const fp = new FilePicker(options);
        if (event.currentTarget.dataset.type == "html")
            fp.extensions = [".html"];
        this.filepickers.push(fp);
        return fp.browse();
    }

    static getTileTrackedAttributes(schema, _path = [], depth = 0) {
        if (!schema)
            return [];
        if (depth > 5)
            return [];

        // Track the path and record found attributes
        const attributes = [];

        for (const [name, field] of Object.entries(schema.fields)) {
            const p = _path.concat([name]);
            if (field instanceof foundry.data.fields.NumberField)
                attributes.push(p);
            else {
                const isSchema = field instanceof foundry.data.fields.SchemaField;
                const isModel = field instanceof foundry.data.fields.EmbeddedDataField;
                if (isSchema || isModel) {
                    const schema = isModel ? field.model.schema : field;

                    const inner = this.getTileTrackedAttributes(schema, p, depth + 1);
                    attributes.push(...inner);
                }
            }
        }
        return attributes;
    }

    _onDragStart(event) {
        let li = event.currentTarget.closest(".file-row");
        let list = event.currentTarget.closest(".items-list");
        if (list) {
            const dragData = {
                type: "button",
                tileId: this.object.id,
                collection: list.dataset.collection,
                id: li.dataset.id
            };
            event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
            this._dragType = dragData.type;
        }
    }

    _canDragStart(selector) {
        return true;
    }

    async _onDrop(event) {
        let data;
        try {
            data = JSON.parse(event.dataTransfer.getData('text/plain'));
        }
        catch (err) {
            return false;
        }

        let action = $('[name="action"]', this.element).val();

        if (data.type == "Macro" && action == "runmacro") {
            let id = (data.pack ? `Compendium.${data.pack}.${data.id}` : `Macro.${data.id}`);
            $('input[name="data.macroid"]').val(id).data("value", { id });
        } else if (data.type == "Scene" && action == "scene") {
            $('input[name="data.sceneid"]').val(data.id).data("value", { id: data.id });
        } else if (data.type == "RollTable" && action == "rolltable") {
            let id = (data.pack ? `Compendium.${data.pack}.${data.id}` : `RollTable.${data.id}`);
            $('input[name="data.rolltableid"]').val(id).data("value", { id });
        } else if (data.type == "Actor" && action == "attack") {
            let field = $('input[name="data.actor"]', this.element);
            if (field.length == 0)
                return;

            let actor = await fromUuid(data.uuid);
            if (!actor) return;

            this.waitingfield = field;
            ActionConfig.updateSelection.call(this, { id: actor.uuid, name: actor.name });
        } else if (data.type == "Item" && action == "additem") {
            let field = $('input[name="data.item"]', this.element);

            if (field.length == 0)
                return;

            let item = await fromUuid(data.uuid);

            if (!item) return;

            this.waitingfield = field;
            ActionConfig.updateSelection.call(this, { id: item.uuid, name: (item?.parent?.name ? item.parent.name + ": " : "") + item.name });
        } else if (data.type == "button") {
            // Call the drop handler
            if (target && target.dataset.id) {
                let items = foundry.utils.duplicate(this.buttonlist);

                if (data.id === target.dataset.id) return; // Don't drop on yourself

                let from = items.findIndex(a => a.id == data.id);
                let to = items.findIndex(a => a.id == target.dataset.id);
                log('from', from, 'to', to);
                items.splice(to, 0, items.splice(from, 1)[0]);

                this.object.flags["monks-active-tiles"].buttonlist = items;
                if (from < to)
                    $('.item[data-id="' + data.id + '"]', this.element).insertAfter(target);
                else
                    $('.item[data-id="' + data.id + '"]', this.element).insertBefore(target);
            }
        } else {
            //check to see if there's an entity field on the form, or an item field if it's adding an item.
            let field = $(`input[name="data.${action == "attack" ? "actor" : "entity"}"]`, this.element);
            if (field.length == 0)
                return;

            let entity;
            if (data.pack) {
                const pack = game.packs.get(data.pack);
                if (!pack) return;
                entity = await pack.getDocument(data.id);
            } else {
                if (data.type == "PlaylistSound") {
                    let playlist = game.playlists.get(data.playlistId);
                    entity = playlist.sounds.get(data.soundId);
                } else {
                    let collection = game.collections.get(data.type);
                    if (!collection)
                        return;

                    entity = collection.get(data.id);
                }
            }

            if (!entity) return;

            let restrict = field.data('restrict');

            if (restrict && !restrict(entity)) {
                ui.notifications.error(i18n("MonksActiveTiles.msg.invalid-entity"));
                return;
            }

            this.waitingfield = field;
            if (entity.document)
                ActionConfig.updateSelection.call(this, { id: entity.document.uuid, name: entity.document.name || (entity.document.documentName + ": " + entity.document.id) });
            else
                ActionConfig.updateSelection.call(this, { id: entity.uuid, name: (entity?.parent?.name ? entity.parent.name + ": " : "") + entity.name });
        }

        log('drop data', event, data);
    }

    fillList(list, id) {
        if (!list)
            return;

        if (list instanceof Array) {
            return list
                .map(g => {
                    if (g.groups) {
                        let gtext = g.label ?? g.text ?? g.id;
                        if (game.i18n.has(gtext))
                            gtext = i18n(gtext);
                        return $('<optgroup>')
                            .attr('label', gtext)
                            .append(Object.entries(g.groups)
                                .map(([k, v]) => {
                                    let gid = (g.id ? g.id + ":" : '') + (g.groups instanceof Array ? v.id : k);
                                    let text = typeof v == "string" ? v : v.label ?? v.name;
                                    if (game.i18n.has(text))
                                        text = i18n(text);
                                    return $('<option>')
                                        .attr('value', gid)
                                        .html(text)
                                        .prop('selected', gid == id)
                                }))
                    } else {
                        let gid = g.id ?? g;
                        let text = typeof g == "string" ? g : g.label ?? g.name;
                        if (game.i18n.has(text))
                            text = i18n(text);
                        return $('<option>').attr('value', gid).html(text).prop('selected', gid == id)
                    }
                });
        } else {
            return Object.entries(list)
                .map(([k, v]) => {
                    if (!v) return null;
                    let text = typeof v == "string" ? v : v?.label ?? v?.name;
                    if (game.i18n.has(text))
                        text = i18n(text);

                    return $('<option>')
                        .attr('value', k)
                        .html(text)
                        .prop('selected', k == id)
                }).filter(o => !!o);
        }
    }

    static async selectEntity(event) {
        let btn = $(event.currentTarget);
        let field = $('input[name="' + btn.attr('data-target') + '"],select[name="' + btn.attr('data-target') + '"]', this.element);

        this.attributes = this.tokenAttr;
        //$('input[name="data.attribute"]', this.element).data('typeahead').source = this.tokenAttr;

        let defType = field.data('deftype') || "";

        if (btn.attr('data-type') == 'tile') {
            field.val('{"id":"tile","name":"' + i18n("MonksActiveTiles.ThisTile") + '"}').data("value", { "id": "tile", "name": i18n("MonksActiveTiles.ThisTile") }).next().html(i18n("MonksActiveTiles.ThisTile"));
            //$('input[name="data.attribute"]', this.element).data('typeahead').source = this.tileAttr;
            this.attributes = this.tileAttr;
        }
        else if (btn.attr('data-type') == 'token') {
            let displayName = defType == "scenes" ? i18n("MonksActiveTiles.TriggeringTokenScene") : i18n("MonksActiveTiles.TriggeringToken");
            field.val('{"id":"token","name":"' + displayName + '"}').data("value", { "id": "token", "name": displayName }).next().html(displayName);
        } else if (btn.attr('data-type') == 'scene')
            field.val('{"id":"scene","name":"' + i18n("MonksActiveTiles.ActiveScene") + '"}').data("value", { "id": "scene", "name": i18n("MonksActiveTiles.ActiveScene") }).next().html(i18n("MonksActiveTiles.ActiveScene"));
        else if (btn.attr('data-type') == 'players')
            field.val('{"id":"players","name":"' + i18n("MonksActiveTiles.PlayerTokens") + '"}').data("value", { "id": "players", "name": i18n("MonksActiveTiles.PlayerTokens") }).next().html(i18n("MonksActiveTiles.PlayerTokens"));
        else if (btn.attr('data-type') == 'users')
            field.val('{"id":"users","name":"' + i18n("MonksActiveTiles.Players") + '"}').data("value", { "id": "users", "name": i18n("MonksActiveTiles.Players") }).next().html(i18n("MonksActiveTiles.Players"));
        else if (btn.attr('data-type') == 'within') {
            let collection = $(event.currentTarget).closest(".trigger-action").find('[name="data.collection"]').val();
            let displayName = game.i18n.format("MonksActiveTiles.WithinTile", { collection: (collection || field.data("deftype") || "tokens").capitalize() });
            field.val(`{"id":"within","name":"${displayName}"}`).data("value", { "id": "within", "name": displayName }).next().html(displayName);
        } else if (btn.attr('data-type') == 'controlled') {
            let displayName = field.data("deftype") == "playlists" ? i18n("MonksActiveTiles.CurrentlyPlaying") : i18n("MonksActiveTiles.Controlled");
            field.val(`{"id":"controlled","name":"${displayName}"}`).data("value", { "id": "controlled", "name": displayName }).next().html(displayName);
        } else if (btn.attr('data-type') == 'previous') {
            let collection = $(event.currentTarget).closest(".trigger-action").find('[name="data.collection"]').val();
            let displayName = (field.data('type') == 'entity' ? game.i18n.format("MonksActiveTiles.CurrentCollection", { collection: collection || field.data("deftype") || "tokens" }) : i18n("MonksActiveTiles.CurrentLocation"));
            field.val(`{"id":"previous","name":"${displayName}"}`).data("value", { "id": "previous", "name": displayName }).next().html(displayName);
        } else if (btn.attr('data-type') == 'origin')
            field.val('{"id":"origin","name":"' + i18n("MonksActiveTiles.Origin") + '"}').data("value", { "id": "origin", "name": i18n("MonksActiveTiles.Origin")}).next().html(i18n("MonksActiveTiles.Origin"));
        else {
            if (!this._minimized)
                await this.minimize();
            if (this.options.parent && !this.options.parent._minimized)
                await this.options.parent.minimize();

            this.waitingfield = field;
            MonksActiveTiles.waitingInput = this;

            MonksActiveTiles.lasttab = null;
            if (defType == 'rolltables')
                defType = 'tables';

            let tab = ui.sidebar.tabs[defType];
            if (tab) {
                if (tab.tabName !== ui.sidebar.activeTab) {
                    MonksActiveTiles.lasttab = ui.sidebar.activeTab;
                    tab.activate();
                }
            }

            MonksActiveTiles.lasttool = null;
            let tool = ui.controls.controls.find(t => t.name == field.data('deftype'));
            if (tool) {
                if (tool.name !== ui.controls.activeControl) {
                    MonksActiveTiles.lasttool = ui.controls.activeControl;
                    canvas[tool.layer].activate();
                }
            }
        }

        field.trigger('change');
    }

    static async updateSelection(selection, event) {
        if (!this.waitingfield)
            return;

        await this.maximize();
        if (this.options.parent)
            await this.options.parent.maximize();

        if (MonksActiveTiles.lasttab) {
            ui.sidebar.activateTab(MonksActiveTiles.lasttab);
            delete MonksActiveTiles.lasttab;
        }

        if (MonksActiveTiles.lasttool) {
            let tool = ui.controls.controls.find(t => t.name == MonksActiveTiles.lasttool);
            canvas[tool.layer].activate();
            delete MonksActiveTiles.lasttool;
        }

        if (this.options.parent) {
            if (canvas.scene.id != this.options.parent.object.parent.id)
                await game.scenes.get(this.options.parent.object.parent.id).view();
        }

        if (this.waitingfield.attr('name') == 'data.actor') {
            let select = $('select[name="data.attack"]', this.element);
            select.empty();
            if (selection.id) {
                let ctrl = select.parent().data('ctrl');

                //this, this, action, data
                //let list = await ctrl.list.call(ctrl, { actor: { id: selection.id } });
                let list = await ctrl.list.call(this, this, null, { actor: { id: selection.id } }) || [];

                select.append(this.fillList(list, ''));
            }
        }

        if (selection) {
            let entityName = "";
            let entityType = this.waitingfield.data('type');
            if (entityType == 'for') {
                entityName = MonksActiveTiles.forPlayersName(selection);
                let custom = $("option[custom='true']", this.waitingfield);
                if (custom.length == 0) {
                    custom = $('<option>').attr({ value: JSON.stringify(selection), 'custom': 'true' }).data({ "value": selection }).html(entityName);
                    this.waitingfield.prepend(custom);
                } else
                    custom.attr('value', JSON.stringify(selection)).data({ "value": selection }).prop("selected", true).html(entityName);
            } else if (["entity", "location", "either", "position"].includes(entityType)) {
                if (selection.x != undefined || selection.y != undefined)
                    entityName = await MonksActiveTiles.locationName(selection);
                else
                    entityName = await MonksActiveTiles.entityName(selection);                      

                this.waitingfield.next().html(entityName);
            }
            this.waitingfield.val(JSON.stringify(selection)).data("value", selection).trigger('change');
        }

        delete this.waitingfield;
        delete MonksActiveTiles.waitingInput;
    }

    async selectPosition(event) {
        let btn = $(event.currentTarget);
        let field = $('input[name="' + btn.attr('data-target') + '"]', this.element);

        let x = parseInt(canvas.stage.pivot.x);
        let y = parseInt(canvas.stage.pivot.y);
        let scale = canvas.stage.scale.x;

        field.val(`{"x":${x},"y":${y},"scale":${scale}}`).data("value", {x, y, scale}).next().html(`x:${x}, y:${y}, scale:${scale}`);
        field.trigger('change');
    }

    static async addTag(event) {
        let data = foundry.utils.expandObject(this._getSubmitData());
        let prop = event.currentTarget.dataset["target"]
        let entity = $(`input[name="${prop}"]`).data("value") || {};
        entity["tag-name"] = entity?.id?.substring(7);
        entity.match = entity.match || "all";
        entity.scene = entity.scene || "_active";

        let scenes = [{ id: "_active", name: "-- Active Scene --" }, {id: "_all", name: "-- All Scenes --" }];
        for (let s of game.scenes)
            scenes.push({ id: s.id, name: s.name });

        const html = await renderTemplate(`modules/monks-active-tiles/templates/tagger-dialog.html`, {
            data: entity,
            scenes: scenes
        });

        let adjustTags = function (tagName) {
            if (game.modules.get("tagger")?.active) {

                let tags = tagName.split(",");

                const rules = {
                    /**
                     * Replaces a portion of the tag with a number based on how many objects in this scene has the same numbered tag
                     * @private
                     */
                    "{#}": (tag, regx) => {
                        const findTag = new RegExp("^" + tag.replace(regx, "([1-9]+[0-9]*)") + "$");
                        const existingDocuments = Tagger.getByTag(findTag)
                        if (!existingDocuments.length) return tag.replace(regx, 1);

                        const numbers = existingDocuments.map(existingDocument => {
                            return Number(Tagger.getTags(existingDocument).find(tag => {
                                return tag.match(findTag);
                            }).match(findTag)[1]);
                        })

                        const length = Math.max(...numbers) + 1;
                        for (let i = 1; i <= length; i++) {
                            if (!numbers.includes(i)) {
                                return tag.replace(regx, i)
                            }
                        }
                    },

                    /**
                     *  Replaces the section of the tag with a random ID
                     *  @private
                     */
                    "{id}": (tag, regx, index) => {
                        let id = temporaryIds?.[tag]?.[index];
                        if (!id) {
                            if (!temporaryIds?.[tag]) {
                                temporaryIds[tag] = []
                            }
                            id = foundry.utils.randomID();
                            temporaryIds[tag].push(id);
                        }
                        return tag.replace(regx, id);
                    }
                }

                const tagRules = Object.entries(rules).filter(entry => {
                    entry[0] = new RegExp(`${entry[0]}`, "g");
                    return entry;
                });

                tags = Tagger._validateTags(tags, "TaggerHandler");

                tags = tags.map((tag, index) => {

                    const applicableTagRules = tagRules.filter(([regx]) => {
                        return tag.match(regx)
                    });
                    if (!applicableTagRules.length) return tag;

                    applicableTagRules.forEach(([regx, method]) => {
                        tag = method(tag, regx, index);
                    })

                    return tag;
                });

                return tags.join(",");
            }
        }

        // Render the confirmation dialog window
        return Dialog.prompt({
            title: "Enter tag",
            content: html,
            label: i18n("MonksActiveTiles.Save"),
            callback: async (html) => {
                let tagName = $('input[name="tag-name"]', html).val();
                let match = $('select[name="match"]', html).val();
                let scene = $('select[name="scene"]', html).val();
                let btn = $(event.currentTarget);
                let field = $('input[name="' + btn.attr('data-target') + '"]', this.element);
                let entity = { id: `tagger:${tagName}`, match: match, scene: scene };
                entity.name = await MonksActiveTiles.entityName(entity);
                field.val(JSON.stringify(entity)).data("value", entity).next().html(entity.name);
                field.trigger('change');
            },
            rejectClose: false,
            options: {
                width: 400
            },
            render: (html) => {
                $('.alter-tags', html).on("click", (event) => {
                    let tagName = $('input[name="tag-name"]', html).val();
                    tagName = adjustTags(tagName);
                    $('input[name="tag-name"]', html).val(tagName).data("value", tagName);
                })
            }
        });
    }

    async editEntityId(event) {
        let data = foundry.utils.expandObject(super._getSubmitData());
        let entity = JSON.parse(data?.data?.entity || "{}");

        const html = await renderTemplate(`modules/monks-active-tiles/templates/entity-dialog.html`, {
            data: entity
        });

        // Render the confirmation dialog window
        return Dialog.prompt({
            title: "Enter entity id",
            content: html,
            label: i18n("MonksActiveTiles.Save"),
            callback: async (html) => {
                let entityId = $('input[name="entity-id"]').val();
                let entity = canvas.tokens.get(entityId);
                if (entity)
                    entityId = entity.document.uuid;
                let field = $(event.currentTarget).prev();
                let name = !entityId ? `<span class="placeholder-style">${i18n(field.data("placeholder") || "MonksActiveTiles.msg.select-entity")}</span>` : await MonksActiveTiles.entityName({ id: entityId });
                let data = !entityId ? null : { id: entityId, name };
                
                field.val(JSON.stringify(data)).data("value", data).next().html(name);
                field.trigger('change');
            },
            rejectClose: false,
            options: {
                width: 400
            }
        });
    }

    async editLocationId(event) {
        let sceneList = { "": "" };
        for (let scene of game.scenes) {
            sceneList[scene.id] = scene.name;
        }

        let data = foundry.utils.expandObject(super._getSubmitData());
        let location = JSON.parse(data?.data?.location || "{}");

        const html = await renderTemplate(`modules/monks-active-tiles/templates/location-dialog.html`, {
            action: data.action,
            data: location,
            sceneList: sceneList
        });

        // Render the confirmation dialog window
        return Dialog.prompt({
            title: "Edit location details",
            content: html,
            label: i18n("MonksActiveTiles.Save"),
            callback: async (html) => {
                let form = $('form', html)[0];
                const fd = new FormDataExtended(form);
                let data = foundry.utils.expandObject(fd.object);

                if (!isNaN(data.location.x)) {
                    data.location.x = parseInt(data.location.x);
                    data.location.id = "";
                }
                if (!isNaN(data.location.y)) {
                    data.location.y = parseInt(data.location.y);
                    data.location.id = "";
                }

                let location = data.location;
                location.name = await MonksActiveTiles.locationName(location);
                let field = $(event.currentTarget).prev();
                field.val(JSON.stringify(location)).data("value", location).next().html(location.name);
                field.trigger('change');
            },
            rejectClose: false,
            options: {
                width: 400
            }
        });
    }

    /*
    async editEntityId(event) {
        let data = foundry.utils.expandObject(super._getSubmitData());
        new EntityEdit($(event.currentTarget).prev(), { action: data.action }).render(true);
    }

    async editLocationId(event) {
        let data = super._getSubmitData();
        new LocationEdit($(event.currentTarget).prev(), { action: data.action }).render(true);
    }
    */

    addToFileList(event) {
        let filename = $(event.currentTarget).val();
        if (filename != '') {
            let id = makeid();
            $('.file-list', this.element).append($('<li>').attr('data-id', id)
                .addClass('flexrow')
                .append($('<input>').attr({ 'type': 'hidden', 'name': 'files.id' }).val(id))
                .append($('<input>').attr({ 'type': 'hidden', 'name': 'files.name' }).val(filename))
                .append($('<span>').addClass('image-name').html(filename))
                .append($('<a>').css({'flex':'0 0 28px', height: '28px', width: '28px'}).html('<i class="fas fa-trash fa-sm"></i>').click(this.removeFile.bind(this, id))));
            $(event.currentTarget).val('');
            this.setPosition({height: 'auto'});
        }
    }

    removeFile(id, event) {
        $(`.file-list li[data-id="${id}"]`, this.element).remove();
        this.setPosition({ height: 'auto' });
    }

    async _editButton(data = {}, event) {
        let content = await renderTemplate("modules/monks-active-tiles/templates/button-edit.html", data);
        await Dialog.confirm({
            title: "Edit Button",
            content,
            yes: (html) => {
                const form = html[0].querySelector("form");
                if (form) {
                    const fd = new FormDataExtended(form);
                    data = foundry.utils.mergeObject(data, fd.object);

                    let buttons = JSON.parse($('input[name="data.buttons"', this.element).val() || "[]");
                    if (!data.id) {
                        data.id = foundry.utils.randomID();
                        buttons.push(data);
                    } else {
                        let button = buttons.find(b => b.id == data.id);
                        Object.assign(button, data);
                    }

                    $('input[name="data.buttons"', this.element).val(JSON.stringify(buttons)).data("value", buttons).change();
                }
            }
        })
    }

    refreshButtonList(ul, event) {
        let buttons = event instanceof Array ? event : JSON.parse($(event.currentTarget).val() || "[]");
        this.getButtonList.call(this, ul, buttons);
        this.setPosition({ height: 'auto' });
    }

    removeButton(id, event) {
        let buttons = JSON.parse($('input[name="data.buttons"', this.element).val() || "[]");
        buttons.findSplice((b) => { return b.id == id });
        $('input[name="data.buttons"', this.element).val(JSON.stringify(buttons)).data("value", buttons).change();
    }

    getButtonList(element, buttons = []) {
        element.empty();
        for (let button of buttons) {
            element.append($('<li>').attr('data-id', button.id)
                .addClass('flexrow file-row')
                .append($('<span>').addClass('button-name').html(button.name))
                .append($('<span>').addClass('button-goto').html(button.goto))
                .append($('<a>').html('<i class="fas fa-pencil fa-sm"></i>').click(this._editButton.bind(this, button)))
                .append($('<a>').html('<i class="fas fa-trash fa-sm"></i>').click(this.removeButton.bind(this, button.id)))
            );
        }
    }

    async _onSubmit(...args) {
        let event = args[0];
        event.preventDefault();
        let that = this;
        //confirm that all required fields have a value
        let allGood = true;
        $('.required[name]', this.element).each(function () {
            if (($(this).is(':visible') || ($(this).attr("type") == "hidden" && $(this).next().is(':visible'))) && !$(this).val() && $(this).children().length == 0)
                allGood = false;
        })

        if (!allGood) {
            ui.notifications.error('Cannot save, not all required fields have been filled in.');
            return false;
        }

        let cond;
        $('.check', this.element).each(function () {
            cond = $(this).data('check').call(that, that);
            if(!!cond)
                allGood = false;
        });

        if (!!cond) {
            ui.notifications.error(cond);
            return false;
        }

        return super._onSubmit.call(this, ...args);
    }

    _getSubmitData(updateData = {}) {
        let data = foundry.utils.expandObject(super._getSubmitData(updateData));

        let files = null;
        if (data.files) {
            for (let [k, v] of Object.entries(data.files)) {
                let values = (v instanceof Array ? v : [v]);
                if (files == undefined) {
                    files = values.map(file => { let obj = {}; obj[k] = file; return obj; });
                } else {
                    for (let i = 0; i < values.length; i++) {
                        files[i][k] = values[i];
                    }
                }
            }
            delete data.files;
            data.data.files = files;
        }
        /*
        if (data.buttons) {
            data.data.buttons = JSON.parse(data.buttons || "[]");
            delete data.buttons;
        }
        */

        $('input.range-value', this.element).each(function () {
            if ($(this).val() == "") foundry.utils.setProperty(data, $(this).prev().attr("name"), "");
        });

        return foundry.utils.flattenObject(data);
    }

    async _updateObject(event, formData) {
        log('updating action', event, formData, this.object);
        /*
        $('[needs-parse="true"]', this.element).each(function () {
            let name = $(this).attr("name");
            if (formData[name])
                formData[name] = (formData[name].startsWith('{') ? JSON.parse(formData[name]) : formData[name]);
        });
        */

        for(let [k, v] of Object.entries(formData)) {
            $(`input[name="${k}"],select[name="${k}"]`, this.element).each(function () {
                let value = $(this).data("value");
                if (value !== undefined)
                    formData[k] = value;
            });
        }

        if (formData['data.attack'])
            formData['data.attack'] = { id: formData['data.attack'], name: $('select[name="data.attack"] option:selected', this.element).text()};

        if (this.object.id == undefined) {
            foundry.utils.mergeObject(this.object, formData);
            this.object.id = makeid();
            let actions = foundry.utils.duplicate(this.options.parent.object.getFlag("monks-active-tiles", "actions") || []);
            let append = this.options.index === -1 || this.options.index === actions.length;
            if (append)
                actions.push(this.object);
            else
                actions.splice(this.options.index, 0, this.object);
            foundry.utils.mergeObject(this.options.parent.object.flags, {
                "monks-active-tiles": { actions: actions }
            });
            //add this row to the parent
            let trigger = MonksActiveTiles.triggerActions[this.object.action];
            let content = i18n(trigger.name);
            if (trigger.content) {
                try {
                    content = await trigger.content(trigger, this.object, this.options.parent.actions);
                } catch {}
            }
            let li = $('<li>').addClass('item flexrow').attr('data-id', this.object.id).attr('data-collection', 'actions').attr('draggable', true)
                .append($('<div>').addClass('item-name flexrow').append($('<h4>').css({ 'white-space': 'normal' }).html(content)))
                .append($('<div>').addClass('item-controls flexrow')
                    .append($('<a>').addClass('item-control action-edit').attr('title', 'Edit Action').html('<i class="fas fa-edit"></i>').click(this.options.parent._editAction.bind(this.options.parent)))
                    .append($('<a>').addClass('item-control action-delete').attr('title', 'Delete Action').html('<i class="fas fa-trash"></i>').click(this.options.parent._deleteAction.bind(this.options.parent))));
            if (append)
                li.appendTo($(`.action-items .item-list`, this.options.parent.element));
            else
                $(`.action-items .item-list li`, this.options.parent.element).eq(this.options.index).before(li);

            li[0].ondragstart = this.options.parent._dragDrop[0]._handleDragStart.bind(this.options.parent._dragDrop[0]);

            this.options.parent.setPosition({height: 'auto'});
        } else {
            let actions = foundry.utils.duplicate(this.options.parent.object.getFlag("monks-active-tiles", "actions") || []);
            let action = actions.find(a => a.id == this.object.id);
            if (action) {
                //clear out these before saving the new information so we don't get data bleed through
                if (action.data) {
                    if (action.data.location) action.data.location = {};
                    if (action.data.entity) action.data.entity = {};
                    if (action.data.item) action.data.item = {};
                    if (action.data.actor) action.data.actor = {};
                }
                if (this.options.parent.object._sounds) {
                    this.options.parent.object._sounds[this.object.id] = [];
                }
                foundry.utils.mergeObject(action, formData);
                this.options.parent.object.flags["monks-active-tiles"].actions = actions;
                //update the text for this row
                let trigger = MonksActiveTiles.triggerActions[action.action];
                let content = i18n(trigger.name);
                if (trigger.content) {
                    try {
                        content = await trigger.content(trigger, action);
                    } catch { }
                }
                $(`.action-items .item[data-id="${action.id}"] .item-name h4`, this.options.parent.element).html(content);
            }
        }

        this.options.parent.setPosition({height:'auto'});
    }

    async checkConditional() {
        for (let elem of $('.form-group', this.element)) {
            if ($(elem).data('conditional')) {
                let cond = await $(elem).data('conditional').call(this, this);
                $(elem).toggle(cond);
                if (!$(elem).data('helpcond'))
                    $(elem).next("p.notes").toggle(cond);
            }
            if ($(elem).data('helpcond')) {
                let cond = await $(elem).data('helpcond').call(this, this);
                $(elem).next("p.notes").toggle(cond);
            }
        }
        this.setPosition({ height: 'auto' });
    }

    async changeAction(command) {
        let that = this;

        command = command || $('select[name="action"]', this.element).val();
        let action = MonksActiveTiles.triggerActions[command];

        let loadingid = this.loadingid = makeid();
        $('.action-controls', this.element).empty();

        let data = this.object.data || {};

        //$('.gmonly', this.element).toggle(action.requiresGM);

        for (let ctrl of (action?.ctrls || [])) {
            let options = foundry.utils.mergeObject({ hide: [], show: [] }, ctrl.options);
            let field = $('<div>').addClass('form-fields').data('ctrl', ctrl);
            if (ctrl["class"]) field.addClass(ctrl["class"]);
            let id = 'data.' + ctrl.id + (ctrl.variation ? '.value' : '');
            let val = data[ctrl.id] != undefined ? (data[ctrl.id].value != undefined ? data[ctrl.id].value : data[ctrl.id]) : (data[ctrl.id] === null ? "" : ctrl.defvalue);

            switch (ctrl.type) {
                case 'line':
                    field = $('<hr>');
                    break;
                case 'filepicker':
                    field
                        .append($('<button>').attr({ 'type': 'button', 'data-type': ctrl.subtype, 'data-target': id, 'title': game.i18n.localize("FILES.BrowseTooltip") }).addClass('file-picker').html('<i class="fas fa-file-import fa-sm"></i>').click(this._activateFilePicker.bind(this)))
                        .append($('<input>').toggleClass('required', !!ctrl.required).attr({ type: 'text', name: id, placeholder: (ctrl.subtype == 'audio' ? 'path/audio.mp3' : (ctrl.subtype == 'image' || ctrl.subtype == 'imagevideo' ? 'path/image.png' : 'File Path')) }).val(data[ctrl.id]));
                    break;
                case 'colorpicker':
                    field
                        .append($('<input>').addClass("color").attr({ type: "text", name: id, "data-dtype": "String" }).css({ flex: "0 0 100px" }).val(val).on("blur", function () { $(this).next().val($(this).val()) }))
                        .append($('<input>').attr({ type: "color", "data-edit": id }).css({ flex: "0 0 100px" }).val(val));
                    break;
                case 'filelist':
                    {
                        let ul = $('<ul>').addClass('file-list');
                        field
                            .append($('<div>').addClass('flexcol')
                            .append($('<ol>')
                            .addClass("files-list items-list")
                            .append($('<li>').addClass('item-header flexrow')
                                .append($('<div>').addClass('item-controls').css({'text-align':'right'})
                                    .append($('<a>').css({'margin-right': '12px'}).attr({ 'title': game.i18n.localize("FILES.BrowseTooltip") }).html('<i class="fas fa-plus"></i> Add').on('click', (ev) => { $(ev.currentTarget).next().click(); }))
                                    .append($('<button>').attr({ 'type': 'button', 'data-type': ctrl.subtype, 'data-target': '_file-list' }).css({ 'display': 'none' }).addClass('file-picker').click(this._activateFilePicker.bind(this))))
                                .append($('<input>').css({ "margin-right": "0px !important" }).attr({ type: 'hidden', name: '_file-list' }).change(this.addToFileList.bind(this)))
                            )
                            .append(ul)));
                        
                        for (let file of (data.files || [])) {
                            ul.toggleClass('required', !!ctrl.required)
                                .append($('<li>').attr('data-id', file.id)
                                    .addClass('flexrow file-row')
                                    .append($('<input>').attr({ 'type': 'hidden', 'name': 'files.id' }).val(file.id))
                                    .append($('<input>').attr({ 'type': 'hidden', 'name': 'files.name' }).val(file.name))
                                    .append($('<span>').addClass('image-name').html(file.name))
                                    .append($('<a>').html('<i class="fas fa-trash fa-sm"></i>').click(this.removeFile.bind(this, file.id)))
                                );
                        }
                    }
                    break;
                case 'buttonlist':
                    {
                        let ul = $('<ul>').addClass('button-list').toggleClass('required', !!ctrl.required)
                        field
                            .append($('<div>').addClass('flexcol')
                                .append($('<ol>')
                                    .addClass("buttons-list items-list")
                                    .append($('<li>').addClass('item-header flexrow')
                                        .append($('<div>').addClass('item-controls').css({ 'text-align': 'right' })
                                            .append($('<a>').css({ 'margin-right': '12px' }).attr({ 'title': "Add button" }).html('<i class="fas fa-plus"></i> Add').on('click', this._editButton.bind(this, undefined))))
                                        .append($('<input>').css({ "margin-right": "0px !important" }).attr({ type: 'hidden', name: id }).val(JSON.stringify(data.buttons || [])).data("value", data.buttons || []).change(this.refreshButtonList.bind(this, ul)))
                                    )
                                    .append(ul)));

                        this.getButtonList.call(this, ul, data.buttons);
                    }
                    break;
                case 'list':
                    {
                        let list;
                        if (typeof ctrl.list == 'function') {
                            list = ctrl.list.call(this, this, action, data);
                            if (list instanceof Promise)
                                list = await list;
                        }
                        else
                            list = (action?.values && action?.values[ctrl.list]);

                        let select = $('<select>').toggleClass('required', !!ctrl.required).attr({ name: id, 'data-dtype': 'String' });
                        if (ctrl.onChange)
                            select.on('change', ctrl.onChange.bind(select, this, select, action, data));
                        field.append(select);
                        if (list != undefined) {
                            if (ctrl.subtype == 'for') {
                                let types = ["trigger", "token", "owner", "previous", "everyone", "players", "gm"];
                                if (!types.includes(data[ctrl.id]) && data[ctrl.id] != undefined) {
                                    //if the current value is not in the list, add it
                                    select.append($('<option>').attr({ value: JSON.stringify(data[ctrl.id]), custom: "true" }).data({ value: data[ctrl.id] }).html(MonksActiveTiles.forPlayersName(data[ctrl.id] || ctrl.defvalue)));
                                }
                            }
                            select.append(this.fillList(list, (data[ctrl.id]?.id || data[ctrl.id] || ctrl.defvalue)));
                        }
                        if (ctrl.subtype == 'for') {
                            field.append($('<button>').attr({ 'type': 'button', 'data-type': ctrl.subtype, 'data-target': id, 'title': i18n("MonksActiveTiles.msg.select-user") }).toggle(!options.hide.includes('select')).addClass('location-picker').html('<i class="fas fa-crosshairs fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)));
                            select.data({ 'type': ctrl.subtype, value: data[ctrl.id] }).on("change", () => {
                                let opt = $('option:selected', select);
                                if (opt.data("value"))
                                    select.data("value", opt.data("value"));
                                else
                                    select.data("value", opt.val());
                            });
                        }
                    }
                    break;
                case 'select':
                    //so this is the fun one, when the button is pressed, I need to minimize the windows, and wait for a selection
                    if (ctrl.subtype == 'location' || ctrl.subtype == 'either' || ctrl.subtype == 'position') {
                        field.addClass("select-field-group")
                            .append($('<input>').toggleClass('required', !!ctrl.required).attr({ type: 'hidden', name: id }).val(JSON.stringify(data[ctrl.id])).data({ 'type': ctrl.subtype, deftype: ctrl.defaultType, placeholder: ctrl.placeholder, value: data[ctrl.id] }))
                            .append($('<span>').dblclick(this.editLocationId.bind(this)).addClass('display-value').html(await MonksActiveTiles.locationName(data[ctrl.id]) || `<span class="placeholder-style">${i18n(ctrl.placeholder) || 'Please select a location'}</style>`)) //(data[ctrl.id] ? (data[ctrl.id].name ? data[ctrl.id].name : 'x:' + data[ctrl.id].x + ', y:' + data[ctrl.id].y) + (scene ? ', scene:' + scene.name : '') : '')
                            .append($('<button>').attr({ 'type': 'button', 'data-type': ctrl.subtype, 'data-target': id, 'title': i18n("MonksActiveTiles.msg.selectlocation") }).toggle(!options.hide.includes('select')).addClass('location-picker').html('<i class="fas fa-crosshairs fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'position', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.setposition") }).toggle(ctrl.subtype == 'position').addClass('location-picker').html('<i class="fas fa-crop-alt fa-sm"></i>').click(this.selectPosition.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'tile', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.usetile") }).toggle(options.show.includes('tile')).addClass('entity-picker').html('<i class="fas fa-cubes fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'token', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.usetoken") }).toggle(options.show.includes('token')).addClass('entity-picker').html('<i class="fas fa-user-alt fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').css({ "padding-left": "5px" }).attr({ 'type': 'button', 'data-type': 'players', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.useplayerlocation") }).toggle(options.show.includes('players')).addClass('location-picker').html('<i class="fas fa-users fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'previous', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.usepreviouslocation") }).toggle(options.show.includes('previous')).addClass('location-picker').html('<i class="fas fa-arrow-up-from-bracket fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'origin', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.useorigin") }).toggle(options.show.includes('origin')).addClass('location-picker').html('<i class="fas fa-walking fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'tagger', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.usetagger") }).toggle(options.show.includes('tagger') && game.modules.get('tagger')?.active).addClass('location-picker').html('<i class="fas fa-tag fa-sm"></i>').click(ActionConfig.addTag.bind(this)));

                    } else if (ctrl.subtype == 'entity') {
                        let displayValue = (ctrl.placeholder && !data[ctrl.id] && (!!ctrl.required || ctrl.defvalue === null) ? `<span class="placeholder-style">${i18n(ctrl.placeholder)}</style>` : await MonksActiveTiles.entityName(data[ctrl.id] ?? ctrl.defvalue, (data?.collection || ctrl.defaultType)) || `<span class="placeholder-style">${i18n("MonksActiveTiles.msg.select-entity")}</style>`);
                        field.addClass("select-field-group")//.css({ 'flex-direction': 'row', 'align-items': 'flex-start' })
                            .append($('<input>').toggleClass('required', !!ctrl.required).attr({ type: 'hidden', name: id }).val(typeof data[ctrl.id] == 'object' ? JSON.stringify(data[ctrl.id]) : data[ctrl.id]).data({ 'restrict': ctrl.restrict, 'type': 'entity', deftype: ctrl.defaultType, placeholder: ctrl.placeholder, value: data[ctrl.id] }))
                            .append($('<span>').dblclick(this.editEntityId.bind(this)).addClass('display-value').html(displayValue))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': ctrl.subtype, 'data-target': id, 'title': i18n("MonksActiveTiles.msg.selectentity") }).toggle(!options.hide.includes('select')).addClass('entity-picker').html('<i class="fas fa-crosshairs fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'tile', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.usetile") }).toggle(options.show.includes('tile')).addClass('entity-picker').html('<i class="fas fa-cubes fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'token', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.usetoken") }).toggle(options.show.includes('token')).addClass('entity-picker').html('<i class="fas fa-user-alt fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'scene', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.usescene") }).toggle(options.show.includes('scene')).addClass('entity-picker').html('<i class="fas fa-map fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'within', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.usewithin") }).toggle(options.show.includes('within')).addClass('entity-picker').html('<i class="fas fa-street-view fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').css({ "padding-left": "5px" }).attr({ 'type': 'button', 'data-type': 'players', 'data-target': id, 'title': (command == "openjournal" ? i18n("MonksActiveTiles.msg.useplayersjournal") : i18n("MonksActiveTiles.msg.useplayers")) }).toggle(options.show.includes('players')).addClass('entity-picker').html('<i class="fas fa-users fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').css({ "padding-left": "5px" }).attr({ 'type': 'button', 'data-type': 'users', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.useusers") }).toggle(options.show.includes('users')).addClass('entity-picker').html('<i class="fas fa-user fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'previous', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.useprevious") }).toggle(options.show.includes('previous')).addClass('entity-picker').html('<i class="fas fa-arrow-up-from-bracket fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'controlled', 'data-target': id, 'title': ctrl.defaultType == "playlists" ? i18n("MonksActiveTiles.msg.currentlyplaying") : i18n("MonksActiveTiles.msg.usecontrolled") }).toggle(options.show.includes('controlled')).addClass('entity-picker').html('<i class="fas fa-bullhorn fa-sm"></i>').click(ActionConfig.selectEntity.bind(this)))
                            .append($('<button>').attr({ 'type': 'button', 'data-type': 'tagger', 'data-target': id, 'title': i18n("MonksActiveTiles.msg.usetagger") }).toggle(options.show.includes('tagger') && game.modules.get('tagger')?.active).addClass('entity-picker').html('<i class="fas fa-tag fa-sm"></i>').click(ActionConfig.addTag.bind(this)));
                    }
                    let input = $('input[type="hidden"]', field);
                    if (ctrl.onChange) {
                        input.on('change', ctrl.onChange.bind(input, this, input, action, data));
                    }
                    break;
                case 'text':
                case 'number':
                    {
                        let input = $(`<${ctrl.subtype == "multiline" ? "textarea" : "input"}>`).css({ resize: "vertical" }).toggleClass('required', !!ctrl.required).attr({ type: ctrl.type, name: id }).val(val);
                        if (ctrl.placeholder)
                            input.attr('placeholder', i18n(ctrl.placeholder));
                        if (ctrl.subtype == "multiline") {
                            new ResizeObserver(() => { if (that.element.length) that.setPosition() }).observe(input.get(0));
                        }
                        if (ctrl.attr)
                            input.attr(ctrl.attr);
                        if (ctrl.type == 'number') {
                            if (ctrl.min)
                                input.attr('min', ctrl.min);
                            if (ctrl.max)
                                input.attr('max', ctrl.max);
                            if (ctrl.step)
                                input.attr('step', ctrl.step);
                            input.css({ 'text-align': 'right' });
                            field.addClass("small-field");
                        }
                        if (ctrl.onBlur)
                            input.on('blur', ctrl.onBlur.bind(this, this));
                        field.append(input);
                    }
                    break;
                case 'slider':
                    field.append($('<input>').attr({ type: 'range', name: id, min: ctrl.min || 0, max: ctrl.max || 1.0, step: ctrl.step || 0.1 }).val(val != undefined ? val : 1.0))
                        .append($('<input>').attr("type", "text").addClass('range-value').val(val != undefined ? val : '').on('blur', function () { $(this).prev().val($(this).val()) }));
                    break
                case 'checkbox':
                    {
                        let input = $('<input>').attr({ type: 'checkbox', name: id }).prop('checked', val);
                        if (ctrl.onClick)
                            input.on('click', ctrl.onClick.bind(this, this));
                        field.append(input).css({ flex: '0 0 30px' });
                    }
                    break;
            }

            if (ctrl.type == "line") {
                $('.action-controls', this.element).append(field);
                if (ctrl.help && setting("show-help"))
                    $('.action-controls', this.element).append($('<p>').addClass("notes").html(ctrl.help));
            } else {
                let cond = ctrl.conditional == undefined || (typeof ctrl.conditional == 'function' ? await ctrl.conditional.call(this, this) : ctrl.conditional);
                const div = $('<div>')
                    .addClass('form-group')
                    .toggle(cond)
                    .append($('<label>').html(i18n(ctrl.name) + (!!ctrl.required ? '<span class="req-field" title="This is a required field">*</span>' : '')))
                    .append(field);

                if (typeof ctrl.conditional == 'function')
                    div.data('conditional', ctrl.conditional);
                if (typeof ctrl.helpConditional == 'function')
                    div.data('helpcond', ctrl.helpConditional);
                if (typeof ctrl.check == 'function')
                    div.addClass('check').data('check', ctrl.check);

                if (ctrl.variation) {
                    let list = (action?.values && action?.values[ctrl.variation]);

                    let select = $('<select>').addClass('variant').attr({ name: 'data.' + ctrl.id + '.var', 'data-dtype': 'String' });
                    field.append(select);
                    if (list != undefined) {
                        select.append(this.fillList(list, (data[ctrl.id]?.var)));
                    }
                }

                if (loadingid != this.loadingid)
                    break;

                div.appendTo($('.action-controls', this.element));

                if (ctrl.help && setting("show-help")) {
                    let helpcond = ctrl.helpConditional == undefined || (typeof ctrl.helpConditional == 'function' ? await ctrl.helpConditional.call(this, this, action) : ctrl.helpConditional);
                    $('.action-controls', this.element).append($('<p>').addClass("notes").html(ctrl.help).toggle(ctrl.helpConditional ? helpcond : cond));
                }

                if ((ctrl.id == "attribute" && ctrl.id == 'attribute') || (ctrl.id == "tag" && command == "anchor")) {
                    this.attributes = this.tokenAttr;

                    var substringMatcher = function () {
                        return function findMatches(q, cb) {
                            var matches, substrRegex;

                            q = q.replace(/[^a-zA-Z.]/gi, '');
                            if (q == "")
                                return;

                            // an array that will be populated with substring matches
                            matches = [];

                            // regex used to determine if a string contains the substring `q`
                            substrRegex = new RegExp(q, 'i');

                            // iterate through the pool of strings and for any string that
                            // contains the substring `q`, add it to the `matches` array
                            let values = ctrl.id == 'attribute' ? that.attributes : that.autoanchors;
                            $.each(values, function (i, str) {
                                if (substrRegex.test(str)) {
                                    matches.push(str);
                                }
                            });

                            cb(matches);
                        };
                    };

                    $('input[name="data.attribute"],input[name="data.tag"]', field).typeahead(
                        {
                            minLength: 1,
                            hint: true,
                            highlight: true
                        },
                        {
                            source: substringMatcher()
                        }
                    );
                }
            }
        }

        if(this.rendered)
            this.setPosition();
    }
}
