!function(){"use strict";var e="modules/share-media",a="share-media";class t extends FormApplication{static init(){game.settings.registerMenu(a,n.BLACKLIST_FORM,{label:game.i18n.localize("share-media.settings.blacklist-label-menu"),icon:"fas fa-ban",type:t,restricted:!0}),game.settings.register(a,n.BLACKLIST,{type:t,scope:"world",config:!1,default:"",type:String})}static get defaultOptions(){return mergeObject(super.defaultOptions,{...super.defaultOptions,template:`${e}/templates/blacklist-settings.hbs`,height:375,title:game.i18n.localize("share-media.dialogs.blacklist-settings.title"),width:400,id:"share-media-blacklist-settings"})}getData(){let e=super.getData();const t=game.settings.get(a,n.BLACKLIST).split(";");return e.players=game.users.map((e=>({id:e.id,name:e.name,color:e.color,active:e.active,checked:t.includes(e.id)}))),e}_updateObject(e,t){const i=expandObject(t);game.settings.set(a,n.BLACKLIST,i.playerId?.join(";")||"")}}const i=foundry.utils.debounce((()=>window.location.reload()),500),n={DISABLE_CONTEXT_OPTIONS:"disable-context-options",VIDEO_LOOPING_OPTION:"video-looping-option",VIDEO_MUTE_OPTION:"video-muted-option",ENABLE_TOKEN_HUD_BUTTON:"enable-token-hud-button",ENABLE_TILE_HUD_BUTTON:"enable-tile-hud-button",FULLSCREEN_IMMERSIVE_MODE:"fullscreen-immersive-mode",FULLSCREEN_DARKNESS_MODE:"fullscreen-darkness-mode",FULLSCREEN_BUTTONS_BOTTOM:"fullscreen-buttons-bottom",POPOUT_DARKNESS_MODE:"popout-darkness-mode",SHARE_ACTOR_TOKEN_NAME:"popout-share-name",ENABLE_SCENE_COVER:"enable-scene-cover",BLACKLIST_FORM:"blacklist-form",BLACKLIST:"blacklist"};class s extends ImagePopout{constructor(a,t={}){super(a,t),this.video=[".mp4","webm"].includes(a.slice(-4).toLowerCase()),this.options.template=`${e}/templates/media-popout-dialog.hbs`}async getData(e){let t=await super.getData();t.isVideo=this.video;const i=game.settings.get(a,n.POPOUT_DARKNESS_MODE);return t.darkness=game.scenes.current&&i?game.scenes.current.darkness:0,t.darknessColor=CONFIG.Canvas.darknessColor.toString(16),t}static updateDarkness(e){game.settings.get(a,n.POPOUT_DARKNESS_MODE)&&document.querySelectorAll(".image-popout .darkness").forEach((a=>{a.style.opacity=e,a.style.backgroundColor=`#${CONFIG.Canvas.darknessColor.toString(16)}`}))}static _handleShareMedia(e,a="",t=!1,i=!0){const n=new this(e,{title:a,shareable:!1,editable:!1}).render(!0);n.video&&setTimeout((()=>{const e=n.element.find("video")[0];e.loop=t,e.muted=i,e.onended=t?null:()=>n.close(!0),e.play().catch((a=>{e.muted=!0,e.play()}))}),250)}}var o=new class{init(){this._createContainer(),this._activateListeners()}_createContainer(){const t=game.user.isGM?`<button class="dismiss"><i class="fas fa-times"></i> ${game.i18n.localize(`${a}.share.fullscreen-dismiss-button`)}</button>`:"",i=game.settings.get(a,n.FULLSCREEN_BUTTONS_BOTTOM)?"bottom":"";this.container=$('<div id="fullscreen-layer" class="hidden"></div>').append(`\n                <div class="background"></div>\n                <img src="${e}/images/transparent.png" alt="">\n                <video playsinline src="" class="disabled"></video>\n                <div class="darkness"></div>\n                <div class="buttons ${i}">\n                    ${t}\n                    <button class="minimize" title="${game.i18n.localize(`${a}.share.fullscreen-minimize-button`)}">\n                        <i class="fas fa-window-minimize"></i>\n                    </button>\n                    <button class="maximize hidden" title="${game.i18n.localize(`${a}.share.fullscreen-maximize-button`)}">\n                        <i class="fas fa-window-maximize"></i>\n                    </button>\n                </div>\n                <div class="title hidden"></div>\n            `);const s=document.querySelectorAll(".gm-screen-app, #dice-box-canvas");s?.[0]?this.container.insertBefore($(s[0])):this.container.insertBefore($(document.getElementById("pause")))}_activateListeners(){this.container.find("button.dismiss").click((e=>d())),this.container.find("button.minimize").click((e=>this.toggleMinimize())),this.container.find("button.maximize").click((e=>this.toggleMinimize()))}handleShare(t,i="image",s="",o=!1,l=!1,c=!0){const r=this.container.find(".background"),d=this.container.find("img"),m=this.container.find("video"),g=m.get(0),u=this.container.find(".minimize"),p=this.container.find(".maximize"),h=this.container.find(".title"),f=this.container.find(".darkness");if(o?this.container.addClass("immersive-mode"):this.container.removeClass("immersive-mode"),"image"===i&&(t.endsWith(".jpg")?r.css("background-image",`url("${t}")`):r.css("background-image",`url("${e}/images/black.png")`),m.addClass("disabled"),d.attr("src",t),d.removeClass("disabled")),"video"===i&&(r.css("background-image",`url("${e}/images/black.png")`),d.addClass("disabled"),m.attr("src",t),m.removeClass("disabled"),g.loop=l,g.muted=c,g.onended=l?null:()=>this.handleDismiss(),g.play().catch((e=>{g.muted=!0,g.play()}))),s?(h.html(s),h.removeClass("hidden")):h.addClass("hidden"),game.settings.get(a,n.FULLSCREEN_DARKNESS_MODE)&&game.scenes.current){const e=game.scenes.current;f.css("opacity",e.darkness),f.css("background-color",`#${CONFIG.Canvas.darknessColor.toString(16)}`)}this.container.removeClass("hidden"),this.container.removeClass("minimized"),u.removeClass("hidden"),p.addClass("hidden")}handleDismiss(){const a=this.container.find(".background"),t=this.container.find("img"),i=this.container.find("video"),n=i.get(0),s=this.container.find(".title"),o=this.container.find(".darkness");a.css("background-image",`url("${e}/images/transparent.png")`),t.attr("src",`${e}/images/transparent.png`),n.pause(),i.attr("src",""),s.html(""),s.addClass("hidden"),o.css("opacity",0),o.css("background-color","transparent"),this.container.addClass("hidden")}toggleMinimize(e){const a=this.container.find(".minimize"),t=this.container.find(".maximize"),i=this.container.find(".title"),n=this.container.find(".darkness");a.toggleClass("hidden"),t.toggleClass("hidden"),i.toggleClass("hidden"),n.toggleClass("hidden"),this.container.toggleClass("minimized")}updateDarkness(e){if(game.settings.get(a,n.FULLSCREEN_DARKNESS_MODE)&&!this.container.hasClass("hidden")){const a=this.container.find(".darkness");a.css("opacity",e),a.css("background-color",`#${CONFIG.Canvas.darknessColor.toString(16)}`)}}};let l;Hooks.once("socketlib.ready",(()=>{l=socketlib.registerModule(a),l.register("sharePopoutMedia",c),l.register("shareFullscreenMedia",r),l.register("dismissFullscreenMedia",m)}));const c=(e,a="",t=!1,i=!0)=>{s._handleShareMedia(e,a,t,i)},r=(e,a="image",t="",i=!1,n=!1,s=!0)=>{o.handleShare(e,a,t,i,n,s)},d=async()=>await l.executeForEveryone("dismissFullscreenMedia"),m=()=>{o.handleDismiss()},g=async(t,i,s="image",o="",c=!1,r=!1,d=!0)=>{const m=game.settings.get(a,n.BLACKLIST).split(";"),g="all"===i?game.users.filter((e=>e.active&&!m.includes(e.id))).map((e=>e.id)):await async function(t){t.sort(((e,a)=>+a.active-+e.active||e.name.localeCompare(a.name)));const i=await renderTemplate(`${e}/templates/players-selection-dialog.hbs`,{players:t});return v({id:"player-selection-dialog",title:game.i18n.localize(`${a}.dialogs.players-selection.title`),content:i,cancelLabel:game.i18n.localize(`${a}.dialogs.players-selection.cancel-button`),validateLabel:game.i18n.localize(`${a}.dialogs.players-selection.share-button`),validateCallback:e=>e.find("input:checkbox[name=playerId]:checked").get().map((e=>$(e).val()))})}(game.users.filter((e=>!m.includes(e.id))).map((e=>({id:e.id,name:e.name,color:e.color,active:e.active,isGM:e.isGM}))));await(async(e,a,t="image",i="",n=!1,s=!1,o=!0)=>await l.executeForUsers("shareFullscreenMedia",a,e,t,i,n,s,o))(t,g,s,o,c,r,d),ui.notifications.info(game.i18n.localize(`${a}.share.fullscreen-success-${i}`))},u=async(t,i,s="",o=!1,c=!0)=>{const r=game.settings.get(a,n.BLACKLIST).split(";"),d="all"===i?game.users.filter((e=>e.active&&!r.includes(e.id))).map((e=>e.id)):await async function(t){t.sort(((e,a)=>+a.active-+e.active||e.name.localeCompare(a.name)));const i=await renderTemplate(`${e}/templates/players-selection-dialog.hbs`,{players:t});return v({id:"player-selection-dialog",title:game.i18n.localize(`${a}.dialogs.players-selection.title`),content:i,cancelLabel:game.i18n.localize(`${a}.dialogs.players-selection.cancel-button`),validateLabel:game.i18n.localize(`${a}.dialogs.players-selection.share-button`),validateCallback:e=>e.find("input:checkbox[name=playerId]:checked").get().map((e=>$(e).val()))})}(game.users.filter((e=>!r.includes(e.id))).map((e=>({id:e.id,name:e.name,color:e.color,active:e.active,isGM:e.isGM}))));await(async(e,a,t="",i=!1,n=!0)=>await l.executeForUsers("sharePopoutMedia",a,e,t,i,n))(t,d,s,o,c),ui.notifications.info(game.i18n.localize(`${a}.share.popout-success-${i}`))};async function p(t=""){const i=b();if(!i.length)return ui.notifications.warn(game.i18n.localize(`${a}.bounding-tile.not-found`));let n;t&&(n=i.filter((e=>e.data.flags[a].name===t))),n||(n=i.length>1?await async function(t){const i=t.map((e=>({id:e.id,name:e.flags[a].name}))).sort(((e,a)=>e.name.localeCompare(a.name))),n=await renderTemplate(`${e}/templates/clear-bounding-tile-selection-dialog.hbs`,{boundingTiles:i});return v({id:"clear-bounding-tile-selection-dialog",title:game.i18n.localize(`${a}.dialogs.clear-bounding-tile-selection.title`),content:n,cancelLabel:game.i18n.localize(`${a}.dialogs.clear-bounding-tile-selection.cancel-button`),validateLabel:game.i18n.localize(`${a}.dialogs.clear-bounding-tile-selection.clear-button`),validateCallback:e=>{const a=e.find("input:radio[name=boundingTileId]:checked").get().map((e=>$(e).val()))[0];return[t.find((e=>e.id===a))]},otherButtons:[{id:"all",icon:'<i class="fas fa-check-double"></i>',label:game.i18n.localize(`${a}.dialogs.clear-bounding-tile-selection.clear-all-button`),callback:e=>t}],defaultButton:"all",top:ui.controls.element.position().top+110,left:ui.controls.element.position().left+110})}(i):i),n.forEach((async e=>{const t=e.parent.flags?.[a]?.[e.flags[a].name];t&&(delete foundry.utils.deepClone(e.parent.flags[a])[e.flags[a].name],await e.parent.unsetFlag(a,e.flags[a].name))})),ui.notifications.info(game.i18n.localize(`${a}.bounding-tile.clear-success`))}const h=async(t,i,n="image",s=!1,o=!0,l="")=>{if(!canvas.scene)return ui.notifications.warn(game.i18n.localize(`${a}.share.scene-no-scene`));const c=b();if(!c.length)return ui.notifications.warn(game.i18n.localize(`${a}.bounding-tile.not-found`));let r;l&&(r=c.find((e=>e.data.flags[a].name===l))),r||(r=c.length>1?await async function(t){const i=t.map((e=>({id:e.id,name:e.flags[a].name}))).sort(((e,a)=>e.name.localeCompare(a.name))),n=await renderTemplate(`${e}/templates/share-bounding-tile-selection-dialog.hbs`,{boundingTiles:i});return v({id:"share-bounding-tile-selection-dialog",title:game.i18n.localize(`${a}.dialogs.share-bounding-tile-selection.title`),content:n,cancelLabel:game.i18n.localize(`${a}.dialogs.share-bounding-tile-selection.cancel-button`),validateLabel:game.i18n.localize(`${a}.dialogs.share-bounding-tile-selection.share-button`),validateCallback:e=>{const a=e.find("input:radio[name=boundingTileId]:checked").get().map((e=>$(e).val()))[0];return t.find((e=>e.id===a))}})}(c):c[0]),await r.parent.setFlag(a,r.flags[a].name,{url:t,style:i,type:n,loop:s,mute:o}),ui.notifications.info(game.i18n.localize(`${a}.share.scene-success`))},f=e=>canvas.scene.tiles.find((t=>t.flags?.[a]?.isBounding&&t.flags?.[a]?.name===e)),b=()=>canvas.scene.tiles.filter((e=>e.flags?.[a]?.isBounding)),v=async({id:e,title:t,content:i,cancelLabel:n,validateLabel:s,validateCallback:o,otherButtons:l=[],defaultButton:c="validate",render:r=null,top:d=null,left:m=null})=>new Promise(((g,u)=>{const p={};l.forEach((e=>{p[e.id]={icon:e.icon,label:e.label,callback:a=>{g(e.callback(a))}}}));let h={};n&&(h=foundry.utils.mergeObject(h,{cancel:{icon:'<i class="fas fa-times"></i>',label:n,callback:()=>u}})),s&&o&&(h=foundry.utils.mergeObject(h,{validate:{icon:'<i class="fas fa-check"></i>',label:s,callback:e=>{g(o(e))}}})),h=foundry.utils.mergeObject(h,p),new Dialog({title:t,content:i,buttons:h,default:c,render:r},{id:`${a}-${e}`,top:d,left:m}).render(!0)})),y=async(t,i="")=>{const n=[{id:"share-popout-all",icon:'<i class="fas fa-book-open"></i>',label:game.i18n.localize(`${a}.dialogs.share-action.share-popout-all`),callback:e=>u(t,"all",i)},{id:"share-popout-some",icon:'<i class="fas fa-book-open"></i>',label:game.i18n.localize(`${a}.dialogs.share-action.share-popout-some`),callback:e=>u(t,"some",i)},{id:"share-fullscreen-all",icon:'<i class="fas fa-expand-arrows-alt"></i>',label:game.i18n.localize(`${a}.dialogs.share-action.share-fullscreen-all`),callback:e=>g(t,"all","image",i)},{id:"share-fullscreen-some",icon:'<i class="fas fa-expand-arrows-alt"></i>',label:game.i18n.localize(`${a}.dialogs.share-action.share-fullscreen-some`),callback:e=>g(t,"some","image",i)},{id:"share-scene-fit",icon:'<i class="fas fas fa-map"></i>',label:game.i18n.localize(`${a}.dialogs.share-action.share-scene-fit`),callback:e=>h(t,"fit")},{id:"share-scene-cover",icon:'<i class="fas fas fa-map"></i>',label:game.i18n.localize(`${a}.dialogs.share-action.share-scene-cover`),callback:e=>h(t,"cover")}],s=await renderTemplate(`${e}/templates/choose-share-action-dialog.hbs`);return v({id:"choose-share-action-dialog",content:s,title:game.i18n.localize(`${a}.dialogs.share-action.title`),otherButtons:n})};class C extends CanvasLayer{constructor(){super(),this.containers=[]}async _draw(){}static get layerOptions(){return foundry.utils.mergeObject(super.layerOptions,{name:a,canDragCreate:!1,controllableObjects:!1,rotatableObjects:!1,snapToGrid:!1,quadtree:!1,elevationSorting:!1,sortActiveTop:!1,zIndex:0})}async createBoundedSprite(e,t,i,s=!1,o=!1,l=!0){if(game.settings.get(a,n.BLACKLIST).split(";").includes(game.user.id))return;const c=f(e);if(!c)return;const r=this._prepareContainer(e,c.z),d=await this._createSprite(t,s,c,o,l),m="fit"===i?this._calculateScaleFactorFit(d.width,d.height,c.width,c.height):this._calculateScaleFactorCover(d.width,d.height,c.width,c.height);d.scale.set(m);const g=this._calculateAspectRatioCoordinates(c.x,c.y,c.width,c.height);d.position.set(g.x,g.y),"cover"===i&&this._addMask(r,c.x,c.y,c.width,c.height,c.rotation),r.addChild(d)}deleteBoundedSprite(e){game.settings.get(a,n.BLACKLIST).split(";").includes(game.user.id)||(this.containers=this.containers.filter((a=>(a.parentName===e&&a.destroy({children:!0}),a.parentName!==e))))}_prepareContainer(e,a){this.deleteBoundedSprite(e);const t=new PIXI.Container;return t.sortableChildren=!0,t.parentName=e,t.zIndex=a,this.containers.push(t),this.addChild(t),this.sortChildren(),t}_addMask(e,a,t,i,n,s){const o=new PIXI.Graphics;o.beginFill(16724736),o.position.set(a+i/2,t+n/2),o.drawRect(-i/2,-n/2,i,n).endFill(),o.rotation=Math.toRadians(s),e.mask=o,e.addChild(o)}async _createSprite(e,t,i,n=!1,s=!0){const o=await loadTexture(e),l=new PIXI.Sprite(o);return t&&(game.user.isGM&&l.texture.baseTexture.resource.source.addEventListener("ended",(()=>{n||i.parent.unsetFlag(a,i.flags[a].name)})),l.texture.baseTexture.resource.source.loop=n,l.texture.baseTexture.resource.source.muted=s,l.texture.baseTexture.resource.source.play().catch((e=>{l.texture.baseTexture.resource.source.muted=!0,l.texture.baseTexture.resource.source.play()}))),l.anchor.set(.5),l.rotation=Math.toRadians(i.rotation),l}_calculateScaleFactorFit(e,a,t,i){return t/i>e/a?i/a:t/e}_calculateScaleFactorCover(e,a,t,i){return t/i>e/a?t/e:i/a}_calculateAspectRatioCoordinates(e,a,t,i){return{x:e+t/2,y:a+i/2}}}const E=e=>{e.find(["article.journal-entry-page.text :not(header) > img","article.journal-entry-page.text :not(header) > video","article.journal-entry-page.image :not(header) > img","article.journal-entry-page.video :not(header) > video","div.editor-content img:not([data-edit])","div.editor-content video:not([data-edit])","section.tab-container img:not([data-edit])",'section.tab-container input[type="image"]'].join(",")).each(((e,t)=>{const i=$(t);if("show-media"===i.parent().attr("id"))return;const s=i.is("img")||i.is('input[type="image"]')?"image":"video",o=i.innerWidth()<=350;!function(e,t,i="image",s=!1){const o=(e=>{const a=($(e).attr("style")||"").split(";");let t=a.length;const i=[];let n,s,o;for(;t--;)n=a[t].split(":"),s=$.trim(n[0]),o=$.trim(n[1]),s.length>0&&o.length>0&&(i[s]=o);return i})(e),l=["display","float","margin","margin-left","margin-right"].reduce(((e,a)=>o.hasOwnProperty(a)?`${e} ${a}: ${o[a]};`:e),"");if($(e).wrap(`<div id="show-media" class="clickable-media" style="${l||""}"></div>`).after('<div class="media-actions-container"></div>'),game.user.isGM){const o=game.settings.get(a,n.FULLSCREEN_IMMERSIVE_MODE);$(e).parent().find("div.media-actions-container").append(`\n                <div class="media-actions">\n                    <i class="drawer fas fa-book-open" title="${game.i18n.localize(`${a}.share.popout-button`)}"></i>\n                    <div class="actions">\n                            <span data-action="share-popout" data-mode="all" data-type="${i}" data-url="${t}" title="${game.i18n.localize(`${a}.share.popout-all-button`)}"><i class="fas fa-users"></i>${s?"":`&nbsp;&nbsp;${game.i18n.localize(`${a}.share.popout-all-button`)}`}</span>\n                            <span data-action="share-popout" data-mode="some" data-type="${i}" data-url="${t}" title="${game.i18n.localize(`${a}.share.popout-some-button`)}"><i class="fas fa-user-friends"></i>${s?"":`&nbsp;&nbsp;${game.i18n.localize(`${a}.share.popout-some-button`)}`}</span>\n                    </div>\n                </div>\n                <div class="media-actions">\n                    <i class="drawer fas fa-expand-arrows-alt" title="${game.i18n.localize(`${a}.share.fullscreen-button`)}"></i>\n                    <div class="actions">\n                        <span data-action="share-fullscreen" data-mode="all" data-url="${t}" data-type="${i}" title="${game.i18n.localize(`${a}.share.fullscreen-all-button`)}"><i class="fas fa-users"></i>${s?"":`&nbsp;&nbsp;${game.i18n.localize(`${a}.share.fullscreen-all-button`)}`}</span>\n                        <span data-action="share-fullscreen" data-mode="some" data-url="${t}" data-type="${i}" title="${game.i18n.localize(`${a}.share.fullscreen-some-button`)}"><i class="fas fa-user-friends"></i>${s?"":`&nbsp;&nbsp;${game.i18n.localize(`${a}.share.fullscreen-some-button`)}`}</span>\n                        <span data-action="share-fullscreen-immersive" data-action="immersive-mode" class="immersive-action ${o?"active":""}" data-value="${o}" title="${game.i18n.localize(`${a}.share.fullscreen-immersive-button`)}"><i class="fa-thin fa-arrows-maximize"></i>${s?"":`&nbsp;&nbsp;${game.i18n.localize(`${a}.share.fullscreen-immersive-button`)}`}</span>\n                    </div>\n                </div>\n                <div class="media-actions">\n                    <i class="drawer fas fa-map" title="${game.i18n.localize(`${a}.share.scene-button`)}"></i>\n                    <div class="actions">\n                        <span data-action="share-scene" data-style="fit" data-type="${i}" data-url="${t}" title="${game.i18n.localize(`${a}.share.scene-fit-button`)}"><i class="fas fa-compress-arrows-alt"></i>${s?"":`&nbsp;&nbsp;${game.i18n.localize(`${a}.share.scene-fit-button`)}`}</span>\n                        <span data-action="share-scene" data-style="cover" data-type="${i}" data-url="${t}" title="${game.i18n.localize(`${a}.share.scene-cover-button`)}"><i class="fas fa-expand"></i>${s?"":`&nbsp;&nbsp;${game.i18n.localize(`${a}.share.scene-cover-button`)}`}</span>\n                    </div>\n                </div>\n            `)}if("image"===i&&game.modules.get("foundryvtt-miro-connector")?.active&&window["foundryvtt-miro-connector"].MiroAPI){const i=game.settings.get("foundryvtt-miro-connector","player-api-access");(game.user.isGM||i)&&$(e).parent().find("div.media-actions-container").append(`\n                    <div class="media-actions miro-action" data-action="share-miro" data-url="${t}">\n                        <i class="drawer fas fa-cloud-upload-alt" title="${game.i18n.localize(`${a}.share.miro-button`)}"></i>\n                    </div>\n                `)}if(game.user.isGM&&"video"===i){const t=game.settings.get(a,n.VIDEO_LOOPING_OPTION),i=game.settings.get(a,n.VIDEO_MUTE_OPTION);$(e).parent().find("div.media-actions-container").append(`\n                    <div class="media-actions loop-action ${t?"active":""}" data-action="share-loop" data-value="${t}">\n                        <i class="drawer fas fa-undo" title="${game.i18n.localize(`${a}.share.loop-button`)}"></i>\n                    </div>\n                    <div class="media-actions mute-action ${i?"active":""}" data-action="share-mute" data-value="${i}">\n                        <i class="drawer fas fa-volume-mute" title="${game.i18n.localize(`${a}.share.mute-button`)}"></i>\n                    </div>\n                `)}}(t,"image"===s?i.attr("src"):i.attr("src")||i.find("source:first").attr("src"),s,o)}))},_=e=>{e.find(['span[data-action="share-popout"]'].join(",")).each(((e,a)=>{$._data(a,"events")||$(a).click((e=>{e.preventDefault(),e.stopPropagation();const a=$(e.currentTarget)[0];if(a){const e=k(a),t=T(a),i="";u(a.dataset.url,a.dataset.mode,i,e,t)}}))})),e.find(['span[data-action="share-scene"]'].join(",")).each(((e,a)=>{$._data(a,"events")||$(a).click((e=>{e.preventDefault(),e.stopPropagation();const a=$(e.currentTarget)[0];if(a){const e=k(a),t=T(a);h(a.dataset.url,a.dataset.style,a.dataset.type,e,t)}}))})),e.find(['span[data-action="share-fullscreen"]'].join(",")).each(((e,a)=>{$._data(a,"events")||$(a).click((e=>{e.preventDefault(),e.stopPropagation();const a=$(e.currentTarget)[0];if(a){const e=k(a),t=T(a),i=function(e){const a=$(e).closest("div.actions").find("span.immersive-action");return 0!==a.length&&"true"===a.attr("data-value")}(a),n="";g(a.dataset.url,a.dataset.mode,a.dataset.type,n,i,e,t)}}))})),e.find(['span[data-action="share-fullscreen-immersive"]'].join(",")).each(((e,a)=>{$._data(a,"events")||$(a).click((e=>{e.preventDefault(),e.stopPropagation();const a=$(e.currentTarget)[0];a&&($(a).toggleClass("active"),$(a).attr("data-value",$(a).hasClass("active")))}))})),e.find(['div[data-action="share-loop"]'].join(",")).each(((e,a)=>{$._data(a,"events")||$(a).click((e=>{e.preventDefault(),e.stopPropagation();const a=$(e.currentTarget)[0];a&&($(a).toggleClass("active"),$(a).attr("data-value",$(a).hasClass("active")))}))})),e.find(['div[data-action="share-mute"]'].join(",")).each(((e,a)=>{$._data(a,"events")||$(a).click((e=>{e.preventDefault(),e.stopPropagation();const a=$(e.currentTarget)[0];a&&($(a).toggleClass("active"),$(a).attr("data-value",$(a).hasClass("active")))}))})),e.find(['div[data-action="share-miro"]'].join(",")).each(((e,a)=>{$._data(a,"events")||$(a).click((e=>{e.preventDefault(),e.stopPropagation();const a=$(e.currentTarget)[0];a&&window["foundryvtt-miro-connector"].MiroAPI.sendJournalEntryImage(a.dataset.url)}))}))};function k(e){const a=$(e).closest("div.media-actions-container").find("div.media-actions.loop-action");return 0!==a.length&&"true"===a.attr("data-value")}function T(e){const a=$(e).closest("div.media-actions-container").find("div.media-actions.mute-action");return 0!==a.length&&"true"===a.attr("data-value")}function O(e=[],t){let i,s;"actors"===t?(i="actors",s="SIDEBAR.CharArt"):(i="items",s="ITEM.ViewArt");const o=e.find((e=>e.name===s)),l=e.findIndex((e=>e.name===s));o&&!l&&[{name:game.i18n.localize("share-media.context-entries.options"),icon:'<i class="fas fa-square-share-nodes"></i>',action:y}].forEach(((t,s)=>{const c=deepClone(o);c.name=t.name,c.icon=t.icon,c.callback=e=>{const s=game[i].get(e.data("documentId")),o=game.settings.get(a,n.SHARE_ACTOR_TOKEN_NAME)?s.name:"";t.action(s.img,o)},e.splice(l+1+s,0,c)}))}class w{static shareDialog(e,a="",t=!1,i=!0){this._validate(e,t,i),y(e,a)}static async sharePopoutMediaToAll(e,a="",t=!1,i=!0){this._validate(e,t,i),await u(e,"all",a,t,i)}static async sharePopoutMediaToSome(e,a="",t=!1,i=!0){this._validate(e,t,i),await u(e,"some",a,t,i)}static async shareFullscreenMediaToAll(e,a="",t=!1,i=!1,n=!0){this._validate(e,i,n);const s=[".mp4","webm"].includes(e.slice(-4).toLowerCase())?"video":"image";await g(e,"all",s,a,t,i,n)}static async shareFullscreenMediaToSome(e,a="",t=!1,i=!1,n=!0){this._validate(e,i,n);const s=[".mp4","webm"].includes(e.slice(-4).toLowerCase())?"video":"image";await g(e,"some",s,a,t,i,n)}static async shareSceneMediaFit(e,a=!1,t=!0,i=""){this._validate(e,a,t);const n=[".mp4","webm"].includes(e.slice(-4).toLowerCase())?"video":"image";await h(e,"fit",n,a,t,i)}static async shareSceneMediaCover(e,a=!1,t=!0,i=""){this._validate(e,a,t);const n=[".mp4","webm"].includes(e.slice(-4).toLowerCase())?"video":"image";await h(e,"cover",n,a,t,i)}static _validate(e,a,t){if(!e)throw new Error("Missing url parameter");if("boolean"!=typeof a)throw new Error("Loop parameter is not a valid boolean");if("boolean"!=typeof t)throw new Error("Mute parameter is not a valid boolean")}static clearBoundingTile(e=""){p(e)}}Hooks.once("init",(()=>{game.settings.register(a,n.DISABLE_CONTEXT_OPTIONS,{name:game.i18n.localize("share-media.settings.disable-context-options-name"),hint:game.i18n.localize("share-media.settings.disable-context-options-hint"),scope:"world",config:!0,default:!1,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.VIDEO_LOOPING_OPTION,{name:game.i18n.localize("share-media.settings.video-looping-option-name"),hint:game.i18n.localize("share-media.settings.video-looping-option-hint"),scope:"world",config:!0,default:!1,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.VIDEO_MUTE_OPTION,{name:game.i18n.localize("share-media.settings.video-mute-option-name"),hint:game.i18n.localize("share-media.settings.video-mute-option-hint"),scope:"world",config:!0,default:!0,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.ENABLE_TOKEN_HUD_BUTTON,{name:game.i18n.localize("share-media.settings.enable-token-hud-button-name"),hint:game.i18n.localize("share-media.settings.enable-token-hud-button-hint"),scope:"world",config:!0,default:!0,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.ENABLE_TILE_HUD_BUTTON,{name:game.i18n.localize("share-media.settings.enable-tile-hud-button-name"),hint:game.i18n.localize("share-media.settings.enable-tile-hud-button-hint"),scope:"world",config:!0,default:!0,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.FULLSCREEN_IMMERSIVE_MODE,{name:game.i18n.localize("share-media.settings.fullscreen-immersive-mode-name"),hint:game.i18n.localize("share-media.settings.fullscreen-immersive-mode-hint"),scope:"world",config:!0,default:!1,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.FULLSCREEN_DARKNESS_MODE,{name:game.i18n.localize("share-media.settings.fullscreen-darkness-mode-name"),hint:game.i18n.localize("share-media.settings.fullscreen-darkness-mode-hint"),scope:"world",config:!0,default:!0,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.FULLSCREEN_BUTTONS_BOTTOM,{name:game.i18n.localize("share-media.settings.fullscreen-buttons-bottom-name"),hint:game.i18n.localize("share-media.settings.fullscreen-buttons-bottom-hint"),scope:"world",config:!0,default:!1,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.POPOUT_DARKNESS_MODE,{name:game.i18n.localize("share-media.settings.popout-darkness-mode-name"),hint:game.i18n.localize("share-media.settings.popout-darkness-mode-hint"),scope:"world",config:!0,default:!1,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.SHARE_ACTOR_TOKEN_NAME,{name:game.i18n.localize("share-media.settings.share-actor-token-name-name"),hint:game.i18n.localize("share-media.settings.share-actor-token-name-hint"),scope:"world",config:!0,default:!1,type:Boolean,onChange:()=>i()}),game.settings.register(a,n.ENABLE_SCENE_COVER,{name:game.i18n.localize("share-media.settings.enable-scene-cover-name"),hint:game.i18n.localize("share-media.settings.enable-scene-cover-hint"),scope:"world",config:!0,default:!1,type:Boolean,onChange:()=>i()}),t.init(),function(){const e=game.settings.get(a,n.ENABLE_SCENE_COVER)?"interface":"primary";CONFIG.Canvas.layers.shareMedia={layerClass:C,group:e}}()})),Hooks.once("ready",(()=>{o.init(),setProperty(window,`${a}.API`,w),game.modules.get(a).API=w})),Hooks.on("getSceneControlButtons",(t=>{game.user.isGM&&(t=>{const i=t.find((e=>"tiles"===e.name));i&&i.tools.push({name:"create-bounding-tile",title:game.i18n.localize(`${a}.bounding-tile.create-button`),icon:"fas fa-border-style",visible:!0,onClick:()=>{!async function(){const t=b().length+1,i=await async function(t){const i=await renderTemplate(`${e}/templates/bounding-tile-creation-dialog.hbs`,{defaultName:game.i18n.localize(`${a}.dialogs.bounding-tile-creation.default-tile-name`)+` ${t}`});return v({id:"bounding-tile-creation-dialog",title:game.i18n.localize(`${a}.dialogs.bounding-tile-creation.title`),content:i,cancelLabel:game.i18n.localize(`${a}.dialogs.bounding-tile-creation.cancel-button`),validateLabel:game.i18n.localize(`${a}.dialogs.bounding-tile-creation.create-button`),validateCallback:e=>e.find("input").val().trim(),render:e=>e.find("input").focus(),top:ui.controls.element.position().top+80,left:ui.controls.element.position().left+110})}(t),n=f(i);if(n)return n.object.control(),ui.notifications.info(game.i18n.localize(`${a}.bounding-tile.create-already-exists`));const s={img:`${e}/images/transparent.png`,flags:{[a]:{isBounding:!0,name:i}},hidden:!0,width:canvas.scene.width,height:canvas.scene.height,x:canvas.scene.dimensions.sceneX,y:canvas.scene.dimensions.sceneY};await canvas.scene.createEmbeddedDocuments("Tile",[s]);const o=f(i);ui.notifications.info(game.i18n.localize(`${a}.bounding-tile.create-success`)),o.object.control()}()},button:!0},{name:"clear-bounding-tile",title:game.i18n.localize(`${a}.bounding-tile.clear-button`),icon:"fas fa-eraser",visible:!0,onClick:()=>{p()},button:!0})})(t)})),Hooks.on("renderTokenHUD",((e,t)=>{const i=game.settings.get(a,n.ENABLE_TOKEN_HUD_BUTTON);game.user.isGM&&i&&((e,t)=>{const i=$(`\n        <div class="control-icon " data-action="share-actor-img" title="${game.i18n.localize(`${a}.share.token-button`)}">\n            <i class="fas fa-book-open"></i>\n        </div>\n    `);i.click((()=>{const t=game.settings.get(a,n.SHARE_ACTOR_TOKEN_NAME)?e.object.document.name:"";y(e.object.document.texture.src,t)})),i.contextmenu((()=>{const t=game.settings.get(a,n.SHARE_ACTOR_TOKEN_NAME)?e.object.actor.name:"";y(e.object.actor.img,t)})),t.find(".col.left").append(i)})(e,t)})),Hooks.on("renderTileHUD",((e,t)=>{const i=game.settings.get(a,n.ENABLE_TILE_HUD_BUTTON);game.user.isGM&&i&&!e.object.document?.flags?.[a]?.isBounding&&e.object.document.texture?.src&&((e,t)=>{const i=$(`\n        <div class="control-icon " data-action="share-tile-img" title="${game.i18n.localize(`${a}.share.tile-button`)}">\n            <i class="fas fa-book-open"></i>\n        </div>\n    `);i.click((()=>{y(e.object.document.texture.src)})),t.find(".col.left").append(i)})(e,t)})),Hooks.on("renderJournalPageSheet",((e,a)=>{E(a.closest(".journal-entry-pages")),_(a.closest(".journal-entry-pages"))})),Hooks.on("renderJournalSheet",((e,a)=>{"JournalSheet"!==e.constructor.name&&(E(a),_(a))})),Hooks.on("renderItemSheet",((e,a)=>{E(a),_(a)})),Hooks.on("renderActorSheet",((e,a)=>{E(a),_(a)})),Hooks.on("getActorDirectoryEntryContext",((e,t)=>{game.settings.get(a,n.DISABLE_CONTEXT_OPTIONS)||O(t,"actors")})),Hooks.on("getItemDirectoryEntryContext",((e,t)=>{game.settings.get(a,n.DISABLE_CONTEXT_OPTIONS)||O(t,"items")})),Hooks.on("renderGMNote",((e,a)=>{E(a),_(a)})),Hooks.on("canvasReady",(()=>{const e=canvas.scene.flags?.[a];if(e)for(let[a,{url:t,style:i,type:n,loop:s,mute:o}=value]of Object.entries(e))canvas.shareMedia.createBoundedSprite(a,t,i,"video"===n,s,o)})),Hooks.on("updateScene",((e,t)=>{if(t.flags?.[a]&&e.id===canvas.scene.id)for(let e of Object.keys(t.flags[a]))if(e.startsWith("-="))canvas.shareMedia.deleteBoundedSprite(e.substring(2));else{const t=canvas.scene.flags[a][e];canvas.shareMedia.createBoundedSprite(e,t.url,t.style,"video"===t.type,t.loop,t.mute)}t.hasOwnProperty("darkness")&&e.id===game.scenes.active?.id&&(o.updateDarkness(t.darkness),s.updateDarkness(t.darkness))})),Hooks.on("updateTile",(e=>{if(e.flags?.[a]?.isBounding&&e.parent.id===canvas.scene.id){const t=canvas.scene.flags?.[a]?.[e.flags[a].name];t&&canvas.shareMedia.createBoundedSprite(e.flags[a].name,t.url,t.style,"video"===t.type,t.loop,t.mute)}})),Hooks.on("deleteTile",(e=>{if(game.user.isGM&&e.flags?.[a]?.isBounding&&e.parent.id===canvas.scene.id){const t=canvas.scene.flags?.[a]?.[e.flags[a].name];t&&canvas.scene.unsetFlag(a,e.flags[a].name)}}))}();