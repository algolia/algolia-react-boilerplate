import{ah as U,ai as w,aj as L,ak as $,al as y,am as D,an as q,ao as W,B as _,ap as E,j as g}from"./index.0541b32f.js";function S(e){var r=e.helper,t=e.attributesToClear,n=t===void 0?[]:t,a=r.state.setPage(0);return a=n.reduce(function(i,u){return a.isNumericRefined(u)?i.removeNumericRefinement(u):a.isHierarchicalFacet(u)?i.removeHierarchicalFacetRefinement(u):a.isDisjunctiveFacet(u)?i.removeDisjunctiveFacetRefinement(u):a.isConjunctiveFacet(u)?i.removeFacetRefinement(u):i},a),n.indexOf("query")!==-1&&(a=a.setQuery("")),a}function F(e){return M(e)||k(e)||N(e)||H()}function H(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function N(e,r){if(!!e){if(typeof e=="string")return b(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return b(e,r)}}function k(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function M(e){if(Array.isArray(e))return b(e)}function b(e,r){(r==null||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function A(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,n)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?A(Object(t),!0).forEach(function(n){Q(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):A(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function Q(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var C=U({name:"clear-refinements",connector:!0}),B=function(r){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:y;return w(r,C()),function(n){var a=n||{},i=a.includedAttributes,u=i===void 0?[]:i,s=a.excludedAttributes,O=s===void 0?["query"]:s,R=a.transformItems,x=R===void 0?function(o){return o}:R;if(n&&n.includedAttributes&&n.excludedAttributes)throw new Error(C("The options `includedAttributes` and `excludedAttributes` cannot be used together."));var f={refine:y,createURL:function(){return""},attributesToClear:[]},I=function(){return f.refine()},j=function(){return f.createURL()};return{$$type:"ais.clearRefinements",init:function(c){var d=c.instantSearchInstance;r(p(p({},this.getWidgetRenderState(c)),{},{instantSearchInstance:d}),!0)},render:function(c){var d=c.instantSearchInstance;r(p(p({},this.getWidgetRenderState(c)),{},{instantSearchInstance:d}),!1)},dispose:function(){t()},getRenderState:function(c,d){return p(p({},c),{},{clearRefinements:this.getWidgetRenderState(d)})},getWidgetRenderState:function(c){var d=c.createURL,T=c.scopedResults,P=c.results;f.attributesToClear=T.reduce(function(l,m){return l.concat(G({scopedResult:m,includedAttributes:u,excludedAttributes:O,transformItems:x,results:P}))},[]),f.refine=function(){f.attributesToClear.forEach(function(l){var m=l.helper,h=l.items;m.setState(S({helper:m,attributesToClear:h})).search()})},f.createURL=function(){return d(D.apply(void 0,F(f.attributesToClear.map(function(l){var m=l.helper,h=l.items;return S({helper:m,attributesToClear:h})}))))};var v=f.attributesToClear.some(function(l){return l.items.length>0});return{canRefine:v,hasRefinements:v,refine:I,createURL:j,widgetParams:n}}}}};function G(e){var r=e.scopedResult,t=e.includedAttributes,n=e.excludedAttributes,a=e.transformItems,i=e.results,u=t.indexOf("query")!==-1||n.indexOf("query")===-1;return{helper:r.helper,items:a(L($(r.results,r.helper.state,u).map(function(s){return s.attribute}).filter(function(s){return t.length===0||t.indexOf(s)!==-1}).filter(function(s){return s==="query"&&u||n.indexOf(s)===-1})),{results:i})}}const K=B;function z(e,r){return q(K,e,r)}function V(e){const{canRefine:r,refine:t}=z(e);let[n,a]=W();const[i,u]=_(E),s=()=>{i.type==="context"&&(n.delete(i.type),n.append(i.type,i.value),a(n))};return r?g("button",{className:"button-clear-refinement",onClick:()=>{t(""),u({}),setTimeout(()=>s(),500)},children:g("p",{children:"Clear all refinements"})}):null}export{V as default};