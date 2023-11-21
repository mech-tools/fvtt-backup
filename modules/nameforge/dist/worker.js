var g=Object.defineProperty;var p=(c,f)=>g(c,"name",{value:f,configurable:!0});(()=>{"use strict";var c={},f={};function o(a){var t=f[a];if(t!==void 0)return t.exports;var e=f[a]={exports:{}};return c[a].call(e.exports,e,e.exports,o),e.exports}p(o,"__webpack_require__"),o.m=c,(()=>{var a=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,t;o.t=function(e,r){if(r&1&&(e=this(e)),r&8||typeof e=="object"&&e&&(r&4&&e.__esModule||r&16&&typeof e.then=="function"))return e;var n=Object.create(null);o.r(n);var i={};t=t||[null,a({}),a([]),a(a)];for(var s=r&2&&e;typeof s=="object"&&!~t.indexOf(s);s=a(s))Object.getOwnPropertyNames(s).forEach(l=>i[l]=()=>e[l]);return i.default=()=>e,o.d(n,i),n}})(),o.d=(a,t)=>{for(var e in t)o.o(t,e)&&!o.o(a,e)&&Object.defineProperty(a,e,{enumerable:!0,get:t[e]})},o.f={},o.e=a=>Promise.all(Object.keys(o.f).reduce((t,e)=>(o.f[e](a,t),t),[])),o.u=a=>"vendor.js",o.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),o.o=(a,t)=>Object.prototype.hasOwnProperty.call(a,t),o.r=a=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},o.p="/modules/nameforge/dist/",(()=>{var a={348:1},t=p(n=>{var[i,s,l]=n;for(var u in s)o.o(s,u)&&(o.m[u]=s[u]);for(l&&l(o);i.length;)a[i.pop()]=1;r(n)},"installChunk");o.f.i=(n,i)=>{a[n]||importScripts(o.p+o.u(n))};var e=self.webpackChunk_elvispereira_nameforge=self.webpackChunk_elvispereira_nameforge||[],r=e.push.bind(e);e.push=t})();var w={};class m{prepareData(t){if(!t||t?.length===0)throw new Error("Provided list don't contain any names.");const e=[...new Set(t.toLowerCase().split(","))].sort();if(e.length===1)throw new Error("The list is too short");return e.map(r=>r.trim())}async createModel(t={path:null,json:null}){const{recurrent:e}=await o.e(736).then(o.t.bind(o,291,19)),r=new e.LSTM({activation:"tanh"});if(t.path){const n=await fetch(t.path);return n.ok?(r.fromJSON(await n.json()),r):null}return t.json&&r.fromJSON(JSON.parse(t.json)),r}trainModel(t,e,r={}){const n={iterations:500,errorThreshold:.1,callback:null,callbackPeriod:10,learningRate:.01,timeout:"Infinity",...r},i=e.train(t,n);return console.info(`Training completed after ${i.iterations} iterations, loss ${i.error}`),e}static async getModels(){const t={userModels:null,defaultModels:null},e=await fetch("nameforge-models/models.json"),r=await fetch("modules/nameforge/models/models.json");return e.ok&&(t.userModels=await e.json()),r.ok&&(t.defaultModels=await r.json()),t}static filterModels(t){return{userModels:{names:Object.values(t.userModels).filter(e=>!e?.type||e?.type==="name"),surnames:Object.values(t.userModels).filter(e=>e?.type==="surname")},defaultModels:{names:Object.values(t.defaultModels).filter(e=>!e?.type||e?.type==="name"),surnames:Object.values(t.defaultModels).filter(e=>e?.type==="surname")}}}selectRandom(t){const e=t.map(i=>{const s=i?.weight??1;return{value:i,weight:s}}),r=e.reduce((i,s)=>i+Number(s.weight),0);let n=Math.random()*r;for(let i=0;i<e.length;i++){const s=e[i];if(n<s.weight)return s.value;n-=s.weight}}capitalize(t,e=game.i18n.lang){const[r,...n]=t;return r===void 0?"":r.toLocaleUpperCase(e)+n.join("")}generateName(t,e={}){const r={count:1,original:!1,seed:"",temperature:1,...e},n=t.options.dataFormatter.values;if((r.temperature<=0||isNaN(r.temperature))&&(r.temperature=1),r.count>1){const s=new Set;for(;s.size<r.count;)r.original?(r.count>n.length&&(r.count=n.length),s.add(this.capitalize(this.selectRandom(n)))):s.add(this.capitalize(r.seed+t.run(r.seed.toLowerCase(),!0,r.temperature)));return Array.from(s)}return r.original?[this.capitalize(this.selectRandom(n))]:[this.capitalize(r.seed+t.run(r.seed.toLowerCase(),!0,r.temperature))]}generateFullName(t,e,r={name:{},surname:{}}){const n={name:{count:1,original:!1,seed:"",temperature:1,...r.name},surname:{count:1,original:!1,seed:"",temperature:1,...r.surname}};return this.generateName(t,n.name).map(l=>{const u=Math.round(Math.random()*(n.surname.count-1)+1),h=this.generateName(e,{...n.surname,count:u});return`${l} ${h.join(" ")}`})}}p(m,"NameForge");const d=new m;self.onmessage=async a=>{if(a.data.name==="train"){const t=await d.createModel(),e=a.data.options,r=d.prepareData(a.data.names);e.callbackPeriod=1,e.callback=n=>{self.postMessage({name:"progress",details:n,model:JSON.stringify(t.toJSON(),null,2)})},d.trainModel(r,t,e),self.postMessage({name:"complete",model:JSON.stringify(t.toJSON(),null,2)})}}})();

//# sourceMappingURL=worker.js.map