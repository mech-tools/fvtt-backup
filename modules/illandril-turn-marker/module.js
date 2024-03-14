const moduleMetadata = {"id":"illandril-turn-marker","version":"1.1.0","title":"Illandril's Turn Marker","bugs":"https://github.com/illandril/FoundryVTT-turn-marker/issues"};

const validationPattern=/^[a-z_][a-z0-9\-_]*[a-z0-9_]$/i,assertValidPrefixSection=a=>{if(!validationPattern.test(a))throw new Error("CSS prefixes must be at least two characters, start and end with a letter or \"_\", and contain only letters, numbers, \"_\", or \"-\"")};class CSSPrefix{#prefix;constructor(a){assertValidPrefixSection(a),this.#prefix=`${a}--`;}child(a){return assertValidPrefixSection(a),`${this.#prefix}${a}`}childPrefix(a){return assertValidPrefixSection(a),new CSSPrefix(this.child(a))}}

class Logger{#logName;#logColor;#logPrefix;#logStyle;#logLevel;constructor(a,b){let c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:"#4f0104";this.#logName=a,this.#logLevel=b,this.#logColor=c,this.#logPrefix=`%c${a}`,this.#logStyle=`background-color: ${c}; color: #fff; padding: 0.1em 0.5em;`;}child(a){let b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:this.#logColor;return new Logger(`${this.#logName} - ${a}`,this.#logLevel,b)}debug(){if(this.#logLevel.debug){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];console.debug(this.#logPrefix,this.#logStyle,...b);}}info(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];console.info(this.#logPrefix,this.#logStyle,...b);}warn(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];console.warn(this.#logPrefix,this.#logStyle,...b);}error(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];console.error(this.#logPrefix,this.#logStyle,...b);}}

const isChoicesArray=Array.isArray;let canRegister=!1;const pendingRegistrations=[];let pendingDebugRegistration;Hooks.once("init",()=>{canRegister=!0,pendingRegistrations.forEach(a=>a()),pendingDebugRegistration?.();});class Settings{#namespace;#localize;constructor(a,b){this.#namespace=a,this.#localize=b;}registerMenu(a,b){const c={...b,name:`${this.#namespace}.setting.menu.${a}.name`,label:`${this.#namespace}.setting.menu.${a}.label`,hint:`${this.#namespace}.setting.menu.${a}.hint`},d=()=>{game.settings.registerMenu(this.#namespace,a,c);};return canRegister?d():pendingRegistrations.push(d),{id:`${this.#namespace}--menu--${a}`,title:`${this.#namespace}.setting.menu.${a}.title`,template:`modules/${this.#namespace}/templates/menu-${a}.html`}}#mapChoices(a,b){let c;return b&&(isChoicesArray(b)?c={choices:Object.fromEntries(b.map(b=>[b,this.#localize(`setting.${a}.choice.${b}`)]))}:c={choices:Object.fromEntries(Object.entries(b).map(a=>[a[0],"function"==typeof a[1]?a[1]():a[1]]))}),c}register(a,b,c){let{scope:i="world",hasHint:d,config:j=!0,requiresReload:k=!1,choices:e,callOnChangeOnInit:f,onChange:g,...h}=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{};const l={set:b=>{game.settings.set(this.#namespace,a,b);},get:()=>game.settings.get(this.#namespace,a)},m=()=>{const m=this.#mapChoices(a,e);game.settings.register(this.#namespace,a,{name:this.#localize(`setting.${a}.label`),hint:d?this.#localize(`setting.${a}.hint`):void 0,config:"function"==typeof j?j():j,scope:i,type:b,default:c,requiresReload:k,onChange:g,...m,...h}),f&&g?.(l.get());};return canRegister?m():"debug"===a?pendingDebugRegistration=m:pendingRegistrations.push(m),l}registerKeybinding(a,b,c){let{hasHint:d,defaultKeybindings:e,precedence:g=foundry.CONST.KEYBINDING_PRECEDENCE.NORMAL,...f}=3<arguments.length&&arguments[3]!==void 0?arguments[3]:{};const h=()=>{game.keybindings.register(this.#namespace,a,{name:this.#localize(`hotkey.${a}.label`),hint:d?this.#localize(`hotkey.${a}.hint`):void 0,editable:e??[],onDown:b,onUp:c,precedence:g,...f});};canRegister?h():pendingRegistrations.push(h);}}

class ModuleSocket{#socketKey;constructor(a){this.#socketKey=`module.${a}`;}emit(a){if(!game.socket)throw new Error("emit was called before game.socket was initialized or after it was torn down");game.socket.emit(this.#socketKey,a);}on(a){if(!game.socket)throw new Error("on was called before game.socket was initialized or after it was torn down");game.socket.on(this.#socketKey,a);}}

class Template{#path;constructor(a,b){this.#path=`modules/${a}/templates/${b}`,Hooks.on("init",()=>{void getTemplate(this.#path);});}async render(a){return renderTemplate(this.#path,a)}}

class ModuleUtils{#id;#logger;#settings;#cssPrefix;#socketInitialized=!1;constructor(a){let{id:b,title:c,version:d,bugs:e,color:f}=a;const g=this.localize.bind(this);this.localize=g,this.#id=b,this.#settings=new Settings(b,g);const h={debug:!1};this.#settings.register("debug",Boolean,!1,{scope:"client",hasHint:!0,callOnChangeOnInit:!0,onChange:a=>{h.debug=a;}}),this.#logger=new Logger(`${c} v${d}`,h,f),e?this.logger.info(`Started. To report bugs, go to: ${e}`):this.logger.info("Started");}get id(){return this.#id}get logger(){return this.#logger}get cssPrefix(){return this.#cssPrefix||(this.#cssPrefix=new CSSPrefix(this.#id)),this.#cssPrefix}get settings(){return this.#settings}localize(a,b){let c=!!(2<arguments.length&&arguments[2]!==void 0)&&arguments[2];const d=`${this.#id}.${a}`;return !0!==c||game.i18n.has(d)?b?game.i18n.format(d,b):game.i18n.localize(d):void 0}registerTemplate(a){return new Template(this.#id,a)}initializeSocket(){if(this.#socketInitialized)throw new Error("Socket should only be initialized once (to ensure the same generic type is used for all socket messages sent by this module, since they will all use the same message key)");return this.#socketInitialized=!0,new ModuleSocket(this.#id)}}

const module=new ModuleUtils(moduleMetadata);

let allowMovement=!1;Hooks.once("init",()=>{module.settings.registerKeybinding("allowMovement",()=>{module.logger.debug("Allow movement hotkey pressed"),allowMovement=!0;},()=>{module.logger.debug("Allow movement hotkey released"),allowMovement=!1;},{hasHint:!0,defaultKeybindings:[{key:"KeyM"}],precedence:foundry.CONST.KEYBINDING_PRECEDENCE.NORMAL,restricted:!0});});const isAllowMovement=()=>allowMovement;const getMovementHotkeyName=()=>{const a=game.keybindings.get(module.id,"allowMovement")?.[0];return a?[...(a.modifiers??[]),KeyboardManager.getKeycodeDisplayString(a.key)].join(" + "):null};

const getEffectiveCombatant=(a,b)=>{let c=null;return b.combatant?(module.logger.debug("getEffectiveCombatant: token.combatant"),c=b.combatant):"combatant"in b.actor&&b.actor.combatant instanceof Combatant?(module.logger.debug("getEffectiveCombatant: token.actor.combatant"),c=b.actor.combatant):(module.logger.debug("getEffectiveCombatant: combat.getCombatantByActor(token.actor)"),c=a.getCombatantByActor(b.actor)??null),module.logger.debug("getEffectiveCombatant",a,b,c),c};

const BlockPlayerOffTurnMovement=module.settings.register("blockPlayerOffTurnMovement",Boolean,!0,{hasHint:!0});const BlockGMOffTurnMovement=module.settings.register("blockGMOffTurnMovement",Boolean,!0,{hasHint:!0});const AllowSameInitiativeMovement=module.settings.register("allowSameInitiativeMovement",Boolean,!1,{hasHint:!0});const AllowNonCombatantMovement=module.settings.register("allowNonCombatantMovement",Boolean,!1,{hasHint:!0});

const isActiveCombatant=a=>{const b=game.combat;if(!b?.started)return module.logger.debug("isActiveCombatant: true - combat not started"),!0;const c=getEffectiveCombatant(b,a);return c?b.combatant?b.combatant===c?(module.logger.debug("isActiveCombatant: true - combat.combatant === combatant"),!0):AllowSameInitiativeMovement.get()&&c.initiative===b.combatant.initiative?(module.logger.debug("isActiveCombatant: true - same initiative",a,c,b),!0):(module.logger.debug("isActiveCombatant: false - all other checks failed",a,b),!1):(module.logger.debug("isActiveCombatant: false - no active combatant"),!1):AllowNonCombatantMovement.get()?(module.logger.debug("isActiveCombatant: true - non-combatant and AllowNonCombatMovement enabled"),!0):(module.logger.debug("isActiveCombatant: false - non-combatant and AllowNonCombatMovement disabled"),!1)};

const WARN_DELAY=3e3;let lastWarnedToken=null,lastWarnedTime=0;const showOffTurnWarning=a=>{if(lastWarnedToken!==a||Date.now()-lastWarnedTime>=WARN_DELAY){lastWarnedToken=a,lastWarnedTime=Date.now();const b=game.user?.isGM?getMovementHotkeyName():null;ui.notifications.warn(module.localize(`notification.offTurnMovementBlocked.${b?"GM":"player"}`,{token:a.name,...(b?{hotkey:b}:{})}));}};

const movementFields=["x","y","elevation","rotation"];Hooks.on("preUpdateToken",(a,b)=>{const c=movementFields.some(a=>b[a]!==void 0);if(!c)return;if(isActiveCombatant(a))return;module.logger.debug("preUpdateToken with off-turn movement",b);const d=!!game.user?.isGM,e=d?BlockGMOffTurnMovement.get()&&!isAllowMovement():BlockPlayerOffTurnMovement.get();if(e){module.logger.debug("Blocking movement"),showOffTurnWarning(a);for(const a of movementFields)delete b[a];if(module.logger.debug("Remaining changes",b),1===Object.keys(b).length)return !1}});

const callbacks=[];Hooks.on("updateCombat",(a,b,c,d)=>{const e=game.user?.id===d;if(module.logger.debug("updateCombat",a,b,d,e),void 0===b.turn&&void 0===b.round)return void module.logger.debug("Combat turn did not change");for(const f of callbacks)try{f(a,e);}catch(a){module.logger.error("Error in turnChangeCallback",a);}});const registerListener=a=>{callbacks.push(a);};

const EnableTurnAnnouncer=module.settings.register("enableTurnAnnouncer",Boolean,!0,{hasHint:!0});registerListener((a,b)=>{b&&EnableTurnAnnouncer.get()&&a.combatant&&ChatMessage.create({speaker:{alias:module.localize("turnStartedMessage",{name:(a.combatant.hidden?void 0:a.combatant.name)||module.localize("unknownTurnAlias")}),actor:a.combatant.hidden?void 0:a.combatant.actor||void 0,token:a.combatant.hidden?void 0:a.combatant.token||void 0,scene:a.scene||void 0}});});

const getTokenPosition=a=>{const b=a?.object?.bounds;return b?{x:b.x,y:b.y,width:b.width,height:b.height}:void 0};

const getCombatantPosition=a=>getTokenPosition(a?.token);

const isTokenVisible=a=>a?a.object?a.object.scene===game.scenes.current?!a.hidden||game.user?.isGM||(module.logger.debug("Token not visible - it is hidden"),!1):(module.logger.debug("Token not visible - it is on a different scene"),!1):(module.logger.debug("Token not visible - it has no associated object"),!1):(module.logger.debug("Token not visible - it is null/undefined"),!1);

const VISIBILITY_OPTIONS={ALL:`${module.id}.setting.visibility.choice.ALL`,GMS:`${module.id}.setting.visibility.choice.GMS`,PLAYERS:`${module.id}.setting.visibility.choice.PLAYERS`,NONE:`${module.id}.setting.visibility.choice.NONE`};const showMarker=a=>{const b=a.get();return !("ALL"!==b)||"NONE"!==b&&("GMS"===b?!!game.user?.isGM:"PLAYERS"===b?!game.user?.isGM:(module.logger.error("Unexpected visibility setting value",b),!1))};

const markerCSS=module.cssPrefix.child("marker"),markerWrapperCSS=module.cssPrefix.child("marker-wrapper"),markerCounterCSS=module.cssPrefix.child("marker-counter");class Marker{constructor(a,b,c){this.setting=a,this.type=b;const d=document.createElement("div");d.classList.add(markerCSS);const e=document.createElement("img");if(e.src=`/modules/${encodeURIComponent(module.id)}/images/${encodeURIComponent(b)}.svg`,d.appendChild(e),c){const a=document.createElement("div");a.classList.add(markerCounterCSS),a.appendChild(document.createTextNode(`${c}`)),d.appendChild(a);}this.marker=d;}hide(){this.marker.parentElement?.removeChild(this.marker);}update(a){if(!showMarker(this.setting))return module.logger.debug("Not showing marker - configured as hidden for this user",this.type,this.setting.get()),void this.hide();if(!a)return module.logger.debug("Not showing marker - position could not be determined",this.type),void this.hide();const b=document.getElementById("hud");if(!b)return void module.logger.error("Cannot update marker - no hud element found");let c=b.querySelector(`.${markerWrapperCSS}`);c||(c=document.createElement("div"),c.classList.add(markerWrapperCSS),b.appendChild(c)),this.marker.style.left=`${a.x}px`,this.marker.style.top=`${a.y}px`,this.marker.style.width=`${a.width}px`,this.marker.style.height=`${a.height}px`,c.appendChild(this.marker);}}

const START_POSITION_KEY="startPosition";const getStartPosition=a=>a?a.getFlag(module.id,START_POSITION_KEY):void 0;const setStartPosition=a=>{const b=a.started?getCombatantPosition(a.combatant):null;if(b){const c={combatant:a.combatant.id,...b};a.setFlag(module.id,START_POSITION_KEY,c);}else a.unsetFlag(module.id,START_POSITION_KEY);};

const clearMarkers=()=>{startMarker.hide(),activeMarker.hide(),clearFootsteps();},_refreshMarkers=()=>{if(module.logger.debug("refreshMarkers"),!game.combat)return module.logger.debug("No combat"),void clearMarkers();if(!game.combat.combatant)return module.logger.debug("No combatant"),void clearMarkers();if(!isTokenVisible(game.combat.combatant.token))return module.logger.debug("Combatant not visible"),void clearMarkers();const a=getStartPosition(game.combat);return a?void(startMarker.update(a),activeMarker.update(getCombatantPosition(game.combat.combatant))):(module.logger.debug("No start position"),void clearMarkers())},refreshMarkers=foundry.utils.debounce(_refreshMarkers,10);const EnableCurrentTurnMarker=module.settings.register("enableCurrentTurnMarker",String,"ALL",{hasHint:!0,choices:VISIBILITY_OPTIONS,onChange:refreshMarkers});const EnableTurnStartMarker=module.settings.register("enableTurnStartMarker",String,"ALL",{hasHint:!0,choices:VISIBILITY_OPTIONS,onChange:refreshMarkers});const EnableMovementMarkers=module.settings.register("enableMovementMarkers",String,"ALL",{hasHint:!0,choices:VISIBILITY_OPTIONS,onChange:()=>{showMarker(EnableMovementMarkers)||clearFootsteps(),refreshMarkers();}});const startMarker=new Marker(EnableTurnStartMarker,"start"),activeMarker=new Marker(EnableCurrentTurnMarker,"active"),footsteps=[],clearFootsteps=()=>{for(const a of footsteps)a.hide();footsteps.splice(0,footsteps.length);};Hooks.on("updateToken",(a,b)=>{if(game.combat?.combatant?.token===a&&(refreshMarkers(),isTokenVisible(a)&&(void 0!==b.x||void 0!==b.y))){const b=new Marker(EnableMovementMarkers,"footsteps",footsteps.length+1);b.update(getTokenPosition(a)),footsteps.push(b);}}),Hooks.on("refreshToken",a=>{game.combat?.combatant?.token===a.document&&refreshMarkers();}),Hooks.on("renderHeadsUpDisplay",()=>{refreshMarkers();}),Hooks.on("ready",()=>{game.user?.isGM&&game.combats.forEach(a=>{const b=getStartPosition(a);a.started&&!b&&(module.logger.debug("initializing start position",a),setStartPosition(a));}),refreshMarkers();}),Hooks.on("deleteCombat",a=>{module.logger.debug("deleteCombat",a),refreshMarkers();}),Hooks.on("deleteCombatant",(a,b,c)=>{if(module.logger.debug("deleteCombatant",a),c===game.userId){const b=getStartPosition(a.combat);b?.combatant===a.id&&(module.logger.debug("deleted combatant was active combatant - resetting start position"),setStartPosition(a.combat));}refreshMarkers();}),Hooks.on("updateCombat",()=>{refreshMarkers();}),registerListener(a=>{clearFootsteps(),game.user?.isGM&&setStartPosition(a);});
