/*! @license DOMPurify 3.1.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.5/LICENSE */
const{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:o,getOwnPropertyDescriptor:r}=Object;let{freeze:a,seal:i,create:l}=Object,{apply:c,construct:s}="undefined"!=typeof Reflect&&Reflect;a||(a=function(e){return e}),i||(i=function(e){return e}),c||(c=function(e,t,n){return e.apply(t,n)}),s||(s=function(e,t){return new e(...t)});const u=unapply(Array.prototype.forEach),d=unapply(Array.prototype.pop),p=unapply(Array.prototype.push),m=unapply(String.prototype.toLowerCase),f=unapply(String.prototype.toString),h=unapply(String.prototype.match),T=unapply(String.prototype.replace),g=unapply(String.prototype.indexOf),y=unapply(String.prototype.trim),E=unapply(Object.prototype.hasOwnProperty),S=unapply(RegExp.prototype.test),_=(A=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return s(A,t)});var A;function unapply(e){return function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return c(e,t,o)}}function addToSet(e,o){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:m;t&&t(e,null);let a=o.length;for(;a--;){let t=o[a];if("string"==typeof t){const e=r(t);e!==t&&(n(o)||(o[a]=e),t=e)}e[t]=!0}return e}function cleanArray(e){for(let t=0;t<e.length;t++)E(e,t)||(e[t]=null);return e}function clone(t){const n=l(null);for(const[o,r]of e(t))E(t,o)&&(Array.isArray(r)?n[o]=cleanArray(r):r&&"object"==typeof r&&r.constructor===Object?n[o]=clone(r):n[o]=r);return n}function lookupGetter(e,t){for(;null!==e;){const n=r(e,t);if(n){if(n.get)return unapply(n.get);if("function"==typeof n.value)return unapply(n.value)}e=o(e)}return function(){return null}}const N=a(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),b=a(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),R=a(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),w=a(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),D=a(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),C=a(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),L=a(["#text"]),O=a(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),v=a(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),k=a(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),x=a(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),M=i(/\{\{[\w\W]*|[\w\W]*\}\}/gm),I=i(/<%[\w\W]*|[\w\W]*%>/gm),U=i(/\${[\w\W]*}/gm),P=i(/^data-[\-\w.\u00B7-\uFFFF]/),F=i(/^aria-[\-\w]+$/),H=i(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),z=i(/^(?:\w+script|data):/i),G=i(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),B=i(/^html$/i),W=i(/^[a-z][.\w]*(-[.\w]+)+$/i);var Y=Object.freeze({__proto__:null,MUSTACHE_EXPR:M,ERB_EXPR:I,TMPLIT_EXPR:U,DATA_ATTR:P,ARIA_ATTR:F,IS_ALLOWED_URI:H,IS_SCRIPT_OR_DATA:z,ATTR_WHITESPACE:G,DOCTYPE_NAME:B,CUSTOM_ELEMENT:W});const getGlobal=function(){return"undefined"==typeof window?null:window};var j=function createDOMPurify(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:getGlobal();const DOMPurify=e=>createDOMPurify(e);if(DOMPurify.version="3.1.5",DOMPurify.removed=[],!t||!t.document||9!==t.document.nodeType)return DOMPurify.isSupported=!1,DOMPurify;let{document:n}=t;const o=n,r=o.currentScript,{DocumentFragment:i,HTMLTemplateElement:c,Node:s,Element:A,NodeFilter:M,NamedNodeMap:I=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:U,DOMParser:P,trustedTypes:F}=t,z=A.prototype,G=lookupGetter(z,"cloneNode"),W=lookupGetter(z,"nextSibling"),j=lookupGetter(z,"childNodes"),X=lookupGetter(z,"parentNode");if("function"==typeof c){const e=n.createElement("template");e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let q,$="";const{implementation:K,createNodeIterator:V,createDocumentFragment:Z,getElementsByTagName:J}=n,{importNode:Q}=o;let ee={};DOMPurify.isSupported="function"==typeof e&&"function"==typeof X&&K&&void 0!==K.createHTMLDocument;const{MUSTACHE_EXPR:te,ERB_EXPR:ne,TMPLIT_EXPR:oe,DATA_ATTR:re,ARIA_ATTR:ae,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:le,CUSTOM_ELEMENT:ce}=Y;let{IS_ALLOWED_URI:se}=Y,ue=null;const de=addToSet({},[...N,...b,...R,...D,...L]);let pe=null;const me=addToSet({},[...O,...v,...k,...x]);let fe=Object.seal(l(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),he=null,Te=null,ge=!0,ye=!0,Ee=!1,Se=!0,_e=!1,Ae=!0,Ne=!1,be=!1,Re=!1,we=!1,De=!1,Ce=!1,Le=!0,Oe=!1,ve=!0,ke=!1,xe={},Me=null;const Ie=addToSet({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ue=null;const Pe=addToSet({},["audio","video","img","source","image","track"]);let Fe=null;const He=addToSet({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ze="http://www.w3.org/1998/Math/MathML",Ge="http://www.w3.org/2000/svg",Be="http://www.w3.org/1999/xhtml";let We=Be,Ye=!1,je=null;const Xe=addToSet({},[ze,Ge,Be],f);let qe=null;const $e=["application/xhtml+xml","text/html"];let Ke=null,Ve=null;const Ze=n.createElement("form"),isRegexOrFunction=function(e){return e instanceof RegExp||e instanceof Function},_parseConfig=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!Ve||Ve!==e){if(e&&"object"==typeof e||(e={}),e=clone(e),qe=-1===$e.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,Ke="application/xhtml+xml"===qe?f:m,ue=E(e,"ALLOWED_TAGS")?addToSet({},e.ALLOWED_TAGS,Ke):de,pe=E(e,"ALLOWED_ATTR")?addToSet({},e.ALLOWED_ATTR,Ke):me,je=E(e,"ALLOWED_NAMESPACES")?addToSet({},e.ALLOWED_NAMESPACES,f):Xe,Fe=E(e,"ADD_URI_SAFE_ATTR")?addToSet(clone(He),e.ADD_URI_SAFE_ATTR,Ke):He,Ue=E(e,"ADD_DATA_URI_TAGS")?addToSet(clone(Pe),e.ADD_DATA_URI_TAGS,Ke):Pe,Me=E(e,"FORBID_CONTENTS")?addToSet({},e.FORBID_CONTENTS,Ke):Ie,he=E(e,"FORBID_TAGS")?addToSet({},e.FORBID_TAGS,Ke):{},Te=E(e,"FORBID_ATTR")?addToSet({},e.FORBID_ATTR,Ke):{},xe=!!E(e,"USE_PROFILES")&&e.USE_PROFILES,ge=!1!==e.ALLOW_ARIA_ATTR,ye=!1!==e.ALLOW_DATA_ATTR,Ee=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Se=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,_e=e.SAFE_FOR_TEMPLATES||!1,Ae=!1!==e.SAFE_FOR_XML,Ne=e.WHOLE_DOCUMENT||!1,we=e.RETURN_DOM||!1,De=e.RETURN_DOM_FRAGMENT||!1,Ce=e.RETURN_TRUSTED_TYPE||!1,Re=e.FORCE_BODY||!1,Le=!1!==e.SANITIZE_DOM,Oe=e.SANITIZE_NAMED_PROPS||!1,ve=!1!==e.KEEP_CONTENT,ke=e.IN_PLACE||!1,se=e.ALLOWED_URI_REGEXP||H,We=e.NAMESPACE||Be,fe=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&isRegexOrFunction(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(fe.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&isRegexOrFunction(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(fe.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(fe.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),_e&&(ye=!1),De&&(we=!0),xe&&(ue=addToSet({},L),pe=[],!0===xe.html&&(addToSet(ue,N),addToSet(pe,O)),!0===xe.svg&&(addToSet(ue,b),addToSet(pe,v),addToSet(pe,x)),!0===xe.svgFilters&&(addToSet(ue,R),addToSet(pe,v),addToSet(pe,x)),!0===xe.mathMl&&(addToSet(ue,D),addToSet(pe,k),addToSet(pe,x))),e.ADD_TAGS&&(ue===de&&(ue=clone(ue)),addToSet(ue,e.ADD_TAGS,Ke)),e.ADD_ATTR&&(pe===me&&(pe=clone(pe)),addToSet(pe,e.ADD_ATTR,Ke)),e.ADD_URI_SAFE_ATTR&&addToSet(Fe,e.ADD_URI_SAFE_ATTR,Ke),e.FORBID_CONTENTS&&(Me===Ie&&(Me=clone(Me)),addToSet(Me,e.FORBID_CONTENTS,Ke)),ve&&(ue["#text"]=!0),Ne&&addToSet(ue,["html","head","body"]),ue.table&&(addToSet(ue,["tbody"]),delete he.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw _('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw _('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=e.TRUSTED_TYPES_POLICY,$=q.createHTML("")}else void 0===q&&(q=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}}(F,r)),null!==q&&"string"==typeof $&&($=q.createHTML(""));a&&a(e),Ve=e}},Je=addToSet({},["mi","mo","mn","ms","mtext"]),Qe=addToSet({},["foreignobject","annotation-xml"]),et=addToSet({},["title","style","font","a","script"]),tt=addToSet({},[...b,...R,...w]),nt=addToSet({},[...D,...C]),_forceRemove=function(e){p(DOMPurify.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}},_removeAttribute=function(e,t){try{p(DOMPurify.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){p(DOMPurify.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!pe[e])if(we||De)try{_forceRemove(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},_initDocument=function(e){let t=null,o=null;if(Re)e="<remove></remove>"+e;else{const t=h(e,/^[\r\n\t ]+/);o=t&&t[0]}"application/xhtml+xml"===qe&&We===Be&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const r=q?q.createHTML(e):e;if(We===Be)try{t=(new P).parseFromString(r,qe)}catch(e){}if(!t||!t.documentElement){t=K.createDocument(We,"template",null);try{t.documentElement.innerHTML=Ye?$:r}catch(e){}}const a=t.body||t.documentElement;return e&&o&&a.insertBefore(n.createTextNode(o),a.childNodes[0]||null),We===Be?J.call(t,Ne?"html":"body")[0]:Ne?t.documentElement:a},_createNodeIterator=function(e){return V.call(e.ownerDocument||e,e,M.SHOW_ELEMENT|M.SHOW_COMMENT|M.SHOW_TEXT|M.SHOW_PROCESSING_INSTRUCTION|M.SHOW_CDATA_SECTION,null)},_isClobbered=function(e){return e instanceof U&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof I)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},_isNode=function(e){return"function"==typeof s&&e instanceof s},_executeHook=function(e,t,n){ee[e]&&u(ee[e],(e=>{e.call(DOMPurify,t,n,Ve)}))},_sanitizeElements=function(e){let t=null;if(_executeHook("beforeSanitizeElements",e,null),_isClobbered(e))return _forceRemove(e),!0;const n=Ke(e.nodeName);if(_executeHook("uponSanitizeElement",e,{tagName:n,allowedTags:ue}),e.hasChildNodes()&&!_isNode(e.firstElementChild)&&S(/<[/\w]/g,e.innerHTML)&&S(/<[/\w]/g,e.textContent))return _forceRemove(e),!0;if(7===e.nodeType)return _forceRemove(e),!0;if(Ae&&8===e.nodeType&&S(/<[/\w]/g,e.data))return _forceRemove(e),!0;if(!ue[n]||he[n]){if(!he[n]&&_isBasicCustomElement(n)){if(fe.tagNameCheck instanceof RegExp&&S(fe.tagNameCheck,n))return!1;if(fe.tagNameCheck instanceof Function&&fe.tagNameCheck(n))return!1}if(ve&&!Me[n]){const t=X(e)||e.parentNode,n=j(e)||e.childNodes;if(n&&t)for(let o=n.length-1;o>=0;--o){const r=G(n[o],!0);r.__removalCount=(e.__removalCount||0)+1,t.insertBefore(r,W(e))}}return _forceRemove(e),!0}return e instanceof A&&!function(e){let t=X(e);t&&t.tagName||(t={namespaceURI:We,tagName:"template"});const n=m(e.tagName),o=m(t.tagName);return!!je[e.namespaceURI]&&(e.namespaceURI===Ge?t.namespaceURI===Be?"svg"===n:t.namespaceURI===ze?"svg"===n&&("annotation-xml"===o||Je[o]):Boolean(tt[n]):e.namespaceURI===ze?t.namespaceURI===Be?"math"===n:t.namespaceURI===Ge?"math"===n&&Qe[o]:Boolean(nt[n]):e.namespaceURI===Be?!(t.namespaceURI===Ge&&!Qe[o])&&!(t.namespaceURI===ze&&!Je[o])&&!nt[n]&&(et[n]||!tt[n]):!("application/xhtml+xml"!==qe||!je[e.namespaceURI]))}(e)?(_forceRemove(e),!0):"noscript"!==n&&"noembed"!==n&&"noframes"!==n||!S(/<\/no(script|embed|frames)/i,e.innerHTML)?(_e&&3===e.nodeType&&(t=e.textContent,u([te,ne,oe],(e=>{t=T(t,e," ")})),e.textContent!==t&&(p(DOMPurify.removed,{element:e.cloneNode()}),e.textContent=t)),_executeHook("afterSanitizeElements",e,null),!1):(_forceRemove(e),!0)},_isValidAttribute=function(e,t,o){if(Le&&("id"===t||"name"===t)&&(o in n||o in Ze))return!1;if(ye&&!Te[t]&&S(re,t));else if(ge&&S(ae,t));else if(!pe[t]||Te[t]){if(!(_isBasicCustomElement(e)&&(fe.tagNameCheck instanceof RegExp&&S(fe.tagNameCheck,e)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(e))&&(fe.attributeNameCheck instanceof RegExp&&S(fe.attributeNameCheck,t)||fe.attributeNameCheck instanceof Function&&fe.attributeNameCheck(t))||"is"===t&&fe.allowCustomizedBuiltInElements&&(fe.tagNameCheck instanceof RegExp&&S(fe.tagNameCheck,o)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(o))))return!1}else if(Fe[t]);else if(S(se,T(o,le,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==g(o,"data:")||!Ue[e])if(Ee&&!S(ie,T(o,le,"")));else if(o)return!1;return!0},_isBasicCustomElement=function(e){return"annotation-xml"!==e&&h(e,ce)},_sanitizeAttributes=function(e){_executeHook("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe};let o=t.length;for(;o--;){const r=t[o],{name:a,namespaceURI:i,value:l}=r,c=Ke(a);let s="value"===a?l:y(l);if(n.attrName=c,n.attrValue=s,n.keepAttr=!0,n.forceKeepAttr=void 0,_executeHook("uponSanitizeAttribute",e,n),s=n.attrValue,n.forceKeepAttr)continue;if(_removeAttribute(a,e),!n.keepAttr)continue;if(!Se&&S(/\/>/i,s)){_removeAttribute(a,e);continue}if(Ae&&S(/((--!?|])>)|<\/(style|title)/i,s)){_removeAttribute(a,e);continue}_e&&u([te,ne,oe],(e=>{s=T(s,e," ")}));const p=Ke(e.nodeName);if(_isValidAttribute(p,c,s)){if(!Oe||"id"!==c&&"name"!==c||(_removeAttribute(a,e),s="user-content-"+s),q&&"object"==typeof F&&"function"==typeof F.getAttributeType)if(i);else switch(F.getAttributeType(p,c)){case"TrustedHTML":s=q.createHTML(s);break;case"TrustedScriptURL":s=q.createScriptURL(s)}try{i?e.setAttributeNS(i,a,s):e.setAttribute(a,s),_isClobbered(e)?_forceRemove(e):d(DOMPurify.removed)}catch(e){}}}_executeHook("afterSanitizeAttributes",e,null)},ot=function _sanitizeShadowDOM(e){let t=null;const n=_createNodeIterator(e);for(_executeHook("beforeSanitizeShadowDOM",e,null);t=n.nextNode();)_executeHook("uponSanitizeShadowNode",t,null),_sanitizeElements(t)||(t.content instanceof i&&_sanitizeShadowDOM(t.content),_sanitizeAttributes(t));_executeHook("afterSanitizeShadowDOM",e,null)};return DOMPurify.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,r=null,a=null,l=null;if(Ye=!e,Ye&&(e="\x3c!--\x3e"),"string"!=typeof e&&!_isNode(e)){if("function"!=typeof e.toString)throw _("toString is not a function");if("string"!=typeof(e=e.toString()))throw _("dirty is not a string, aborting")}if(!DOMPurify.isSupported)return e;if(be||_parseConfig(t),DOMPurify.removed=[],"string"==typeof e&&(ke=!1),ke){if(e.nodeName){const t=Ke(e.nodeName);if(!ue[t]||he[t])throw _("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof s)n=_initDocument("\x3c!----\x3e"),r=n.ownerDocument.importNode(e,!0),1===r.nodeType&&"BODY"===r.nodeName||"HTML"===r.nodeName?n=r:n.appendChild(r);else{if(!we&&!_e&&!Ne&&-1===e.indexOf("<"))return q&&Ce?q.createHTML(e):e;if(n=_initDocument(e),!n)return we?null:Ce?$:""}n&&Re&&_forceRemove(n.firstChild);const c=_createNodeIterator(ke?e:n);for(;a=c.nextNode();)_sanitizeElements(a)||(a.content instanceof i&&ot(a.content),_sanitizeAttributes(a));if(ke)return e;if(we){if(De)for(l=Z.call(n.ownerDocument);n.firstChild;)l.appendChild(n.firstChild);else l=n;return(pe.shadowroot||pe.shadowrootmode)&&(l=Q.call(o,l,!0)),l}let d=Ne?n.outerHTML:n.innerHTML;return Ne&&ue["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&S(B,n.ownerDocument.doctype.name)&&(d="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+d),_e&&u([te,ne,oe],(e=>{d=T(d,e," ")})),q&&Ce?q.createHTML(d):d},DOMPurify.setConfig=function(){_parseConfig(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),be=!0},DOMPurify.clearConfig=function(){Ve=null,be=!1},DOMPurify.isValidAttribute=function(e,t,n){Ve||_parseConfig({});const o=Ke(e),r=Ke(t);return _isValidAttribute(o,r,n)},DOMPurify.addHook=function(e,t){"function"==typeof t&&(ee[e]=ee[e]||[],p(ee[e],t))},DOMPurify.removeHook=function(e){if(ee[e])return d(ee[e])},DOMPurify.removeHooks=function(e){ee[e]&&(ee[e]=[])},DOMPurify.removeAllHooks=function(){ee={}},DOMPurify}();export{j as default};
//# sourceMappingURL=DOMPurify.js.map
