"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[927],{5927:(e,t,i)=>{i.r(t),i.d(t,{openSmartLinkMenu:()=>a});var s=i(6596),n=i(638);function a(e){new SmartMenu(e).render(!0)}class SmartMenu extends FormApplication{constructor(e){const t=ui.controls.element.find('[data-control="me-presets"]').position();super({},{left:t.left+50,top:t.top}),this.placeable=e}static get defaultOptions(){return foundry.utils.mergeObject(super.defaultOptions,{id:"mass-edit-smart-linker-menu",template:`modules/${s.Do}/templates/smartLinker.html`,classes:["mass-edit-linker","smart-linker-menu","mass-edit-dark-window","mass-edit-window-fill"],resizable:!1,minimizable:!1,width:200,height:190})}async getData(e={}){const t={},i=this.placeable.document??this.placeable;return"Token"===i.documentName||"Tile"===i.documentName?t.img=i.texture.src:t.img=s.SV[i.documentName],t}activateListeners(e){super.activateListeners(e),e.find(".selectedToLink").on("click",(()=>n.sy.smartLink({multiLayer:!1}))),e.find(".pickerSelectToLink").on("click",(()=>n.sy.smartLink({multiLayer:!0}))),e.find(".image img").on("mouseenter",(()=>{n.sy._highlightDocuments(n.sy.getLinkedDocuments(this.placeable).add(this.placeable))})).on("mouseleave",n.sy._clearHighlight)}unlink(e){e.find((e=>e.id===this.placeable.id))&&this.close(!0)}get title(){return"Smart Link"}async close(e={}){return n.sy._smartLink=null,n.sy._clearHighlight(),super.close(e)}}}}]);
//# sourceMappingURL=927.mass-edit.js.map