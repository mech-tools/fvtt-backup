class DiceSystem{static SETTING_SCOPE={LOCAL:0,SHARED:1};static SETTING_TYPE={BOOLEAN:"boolean",SELECT:"select",COLOR:"color",FILE:"file",RANGE:"range",STRING:"string"};static SETTING_FORMATING={SEPARATOR:"separator",HTML:"html"};static DICE_EVENT_TYPE={SPAWN:0,CLICK:1,RESULT:2,COLLIDE:3,DESPAWN:4};constructor(e,t,i="default",s=null){this._id=e,this._name=t,this._dice=new DiceMap(this),this._mode=i,this._group=s,this._settings=[],this._scopedSettings=new Map,this._listeners=[],this._registeredProcessMaterialCallbacks=[],this._registeredBeforeShaderCompileCallbacks=[]}get id(){return this._id}get name(){return this._name}get dice(){return this._dice}get mode(){return this._mode}get group(){return this._group}get settings(){const e=Object.values(DiceSystem.SETTING_TYPE);return this._settings.filter((t=>e.includes(t.type)))}on(e,t){if(!Object.values(DiceSystem.DICE_EVENT_TYPE).includes(e))throw new Error(`[DiceSystem.fire] Invalid dice event type: ${e}`);this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t)}off(e,t){if(!this._listeners[e])return;const i=this._listeners[e].indexOf(t);i>-1&&this._listeners[e].splice(i,1)}fire(e,t){if(!Object.values(DiceSystem.DICE_EVENT_TYPE).includes(e))throw new Error(`[DiceSystem.fire] Invalid dice event type: ${e}`);this._dispatchEvent(e,t)}_dispatchEvent(e,t){if(this._listeners[e])for(const i of this._listeners[e])i(t)}getSettingsByDiceType(e){return this._scopedSettings.get(e)||this._scopedSettings.get("global")}getCacheString(e){return this.id+JSON.stringify(Object.values(e))}processMaterial(e,t,i){if(this.dice.has(e)){for(const s of this._registeredProcessMaterialCallbacks)s(e,t,i);t.userData.diceType=e,t.userData.system=this.id,t.userData.appearance=i}return t}beforeShaderCompile(e,t){let i=e.fragmentShader,s=e.vertexShader;for(const i of this._registeredBeforeShaderCompileCallbacks)i(e,t,t.userData.diceType,t.userData.appearance);i==e.fragmentShader&&s==e.vertexShader||(t.customProgramCacheKey=()=>e.fragmentShader+e.vertexShader,t.needsUpdate=!0)}registerProcessMaterialCallback(e){this._registeredProcessMaterialCallbacks.push(e)}registerBeforeShaderCompileCallback(e){this._registeredBeforeShaderCompileCallbacks.push(e)}updateSettings(e="global",t){this._scopedSettings.set(e,{...t})}loadSettings(){this._scopedSettings=new Map;const e=game.user.getFlag("dice-so-nice","appearance"),t=this.settings.reduce(((e,{id:t,defaultValue:i})=>({...e,[t]:i})),{});if(this._scopedSettings.set("global",t),e)for(let t of Object.keys(e))e[t].system===this.id&&this._scopedSettings.set(t,{...e[t].systemSettings})}_createSetting(e,t,i,s,a,n={}){if(!Object.values(DiceSystem.SETTING_TYPE).includes(e)&&!Object.values(DiceSystem.SETTING_FORMATING).includes(e))throw new Error(`[DiceSystem._createSetting] Invalid setting type: ${e}`);if(!Object.values(DiceSystem.SETTING_SCOPE).includes(s)&&!Object.values(DiceSystem.SETTING_SCOPE).includes(s))throw new Error(`[DiceSystem._createSetting] Invalid setting scope: ${s}`);if(DiceSystem.SETTING_TYPE.hasOwnProperty(e)){if(!t)throw new Error(`[DiceSystem._createSetting] Invalid setting id: ${t}`);if(!i)throw new Error(`[DiceSystem._createSetting] Invalid setting name: ${i}`)}this._settings.push({type:e,id:t,name:i,defaultValue:a,scope:s,...n})}addSettingSeparator({name:e=""}={}){this._createSetting("separator",null,e,DiceSystem.SETTING_SCOPE.LOCAL,null)}addSettingHTML({name:e}){this._createSetting("html",null,e,DiceSystem.SETTING_SCOPE.LOCAL,null)}addSettingBoolean({id:e,name:t,scope:i=DiceSystem.SETTING_SCOPE.SHARED,defaultValue:s=!1}){this._createSetting("boolean",e,t,i,s)}addSettingColor({id:e,name:t,scope:i=DiceSystem.SETTING_SCOPE.SHARED,defaultValue:s="#ffffff"}){this._createSetting("color",e,t,i,s)}addSettingRange({id:e,name:t,scope:i=DiceSystem.SETTING_SCOPE.SHARED,defaultValue:s=0,min:a=0,max:n=100,step:l=1}){this._createSetting("range",e,t,i,s,{min:a,max:n,step:l})}addSettingFile({id:e,name:t,scope:i=DiceSystem.SETTING_SCOPE.SHARED,defaultValue:s=""}){s=s||"",this._createSetting("file",e,t,i,s)}addSettingSelect({id:e,name:t,scope:i=DiceSystem.SETTING_SCOPE.SHARED,defaultValue:s=null,options:a={}}){this._createSetting("select",e,t,i,s,{options:a})}addSettingString({id:e,name:t,scope:i=DiceSystem.SETTING_SCOPE.SHARED,defaultValue:s=""}){s=s||"",this._createSetting("string",e,t,i,s)}getDiceByShapeAndValues(e,t){for(let i of this.dice.values())if(i.shape==e&&i.values.length==t.length)return i;return null}getScopedSettingValue(e,t){return this._scopedSettings.get(e)?.[t]??this._scopedSettings.get("global")?.[t]}getSettingsDialogLine(e,t){let i={content:"",data:{}};switch(e.type){case DiceSystem.SETTING_TYPE.BOOLEAN:i.content=`\n                    <div class="form-group">\n                        <label>${e.name}</label>\n                        <div class="form-fields">\n                            <input type="checkbox" name="appearance[${t}][systemSettings][${e.id}]" data-dtype="Boolean" {{checked ${e.id}.value}} />\n                        </div>\n                    </div>\n                `,i.data={value:this.getScopedSettingValue(t,e.id)};break;case DiceSystem.SETTING_TYPE.STRING:i.content=`\n                    <div class="form-group">\n                        <label>${e.name}</label>\n                        <div class="form-fields">\n                            <input type="text" name="appearance[${t}][systemSettings][${e.id}]" value="{{${e.id}.value}}" data-dtype="String" />\n                        </div>\n                    </div>\n                `,i.data={value:this.getScopedSettingValue(t,e.id)};break;case DiceSystem.SETTING_TYPE.COLOR:i.content=`\n                    <div class="form-group">\n                        <label>${e.name}</label>\n                        <div class="form-fields">\n                            <input type="text" data-colorpicker name="appearance[${t}][systemSettings][${e.id}]" value="{{${e.id}.value}}" data-dtype="String" />\n                            <input type="color" name="appearance[${t}][systemSettings][${e.id}Selector]" value="{{${e.id}.value}}"\n                                data-edit="appearance[${t}][systemSettings][${e.id}]" data-${e.id}Selector />\n                        </div>\n                    </div>\n                `,i.data={value:this.getScopedSettingValue(t,e.id)};break;case DiceSystem.SETTING_TYPE.RANGE:i.content=`\n                    <div class="form-group">\n                        <label>${e.name}</label>\n                        <div class="form-fields">\n                            <input type="range" name="appearance[${t}][systemSettings][${e.id}]" value="{{${e.id}.value}}" min="{{${e.id}.min}}" max="{{${e.id}.max}}" step="{{${e.id}.step}}" data-dtype="Number">\n                            <span class="range-value">{{${e.id}.value}}</span>\n                        </div>\n                    </div>\n                `,i.data={value:this.getScopedSettingValue(t,e.id),min:e.min,max:e.max,step:e.step};break;case DiceSystem.SETTING_TYPE.FILE:i.content=`\n                    <div class="form-group">\n                        <label>${e.name}</label>\n                        <div class="form-fields">\n                            <input type="file" name="appearance[${t}][systemSettings][${e.id}]" value="{{${e.id}.value}}"\n                                data-edit="appearance[${t}][systemSettings][${e.id}]" data-${e.id} />\n                        </div>\n                    </div>\n                `,i.data={value:this.getScopedSettingValue(t,e.id)};break;case DiceSystem.SETTING_TYPE.SELECT:i.content=`\n                    <div class="form-group">\n                        <label>${e.name}</label>\n                        <div class="form-fields">\n                            <select name="appearance[${t}][systemSettings][${e.id}]" data-dtype="String">\n                                {{selectOptions ${e.id}.options selected=${e.id}.value}}\n                            </select>\n                        </div>\n                    </div>\n                `,i.data={value:this.getScopedSettingValue(t,e.id),options:e.options};break;case DiceSystem.SETTING_FORMATING.SEPARATOR:""!=e.name?i.content=`<h2>${e.name}</h2>`:i.content="<hr />";break;case DiceSystem.SETTING_FORMATING.HTML:i.content=e.name}return i}getSettingsDialogContent(e){let t={content:"",data:{}};if(!this._settings.length)return t;for(let i of this._settings){let s=this.getSettingsDialogLine(i,e);t.content+=s.content,t.data[i.id]=s.data}return t.content=`<div data-systemSettings="${this.id}">${t.content}</div>`,t}getDefaultSettings(){let e=this.settings,t={};for(let i of e)t[i.id]=i.defaultValue;return t}}class DiceMap extends Map{constructor(e,...t){super(...t),this._diceSystem=e}set(e,t){return this.has(e)||(t.diceSystem=this._diceSystem),super.set(e,t)}}class DiceSFX{get nameLocalized(){return game.i18n.localize(this._name)}constructor(e,t,i){this.options=foundry.utils.mergeObject({isGlobal:!1,muteSound:!1},i),this.dicemesh=t,this.box=e,this.destroyed=!1,this.enableGC=!1,this.renderReady=!1,this.volume=t.options.secretRoll&&e.muteSoundSecretRolls||this.options.muteSound?0:this.box.volume}static async init(){return!0}async play(){return Promise.resolve()}static async loadAsset(e,t){return new Promise(((i,s)=>{e.load(t,(e=>i(e)),null,s)}))}static getDialogContent(e,t){let i={},s=game.user.isGM?"":'disabled="disabled"';return i.content=`<div class="form-group">\n                                    <label>{{localize "DICESONICE.sfxOptionsIsGlobal"}}</label>\n                                    <div class="form-fields">\n                                        <input type="checkbox" name="sfxLine[{{id}}][options][isGlobal]" data-dtype="Boolean" ${s} {{checked isGlobal}} />\n                                    </div>\n                                </div>\n                                <div class="form-group">\n                                    <label>{{localize "DICESONICE.sfxOptionsMuteSound"}}</label>\n                                    <div class="form-fields">\n                                        <input type="checkbox" name="sfxLine[{{id}}][options][muteSound]" data-dtype="Boolean" ${s} {{checked muteSound}} />\n                                    </div>\n                                </div>`,i.data={isGlobal:!!e.options&&e.options.isGlobal,muteSound:!!e.options&&e.options.muteSound,id:t},i}}export{DiceSFX,DiceSystem};
