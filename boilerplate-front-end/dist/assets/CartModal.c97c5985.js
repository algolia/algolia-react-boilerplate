import{B as b,a6 as k,x as h,D as P,y as j,a7 as T,R as u,w as R,e as I,j as e,F as S,a as s,G as c,Q as A,a8 as M,S as D,a9 as z,H,U as O,Y as F,a5 as w,a3 as q,a4 as E,r as y,aa as V,ab as G,W,ac as B,ad as Q,ae as U,af as Y,a1 as $,a0 as J,ag as K}from"./index.84b31f96.js";const L=({item:a,sendEvent:i})=>{const[t,l]=b(k),p=h(P),N=h(j),_=h(T),{mobile:f}=u(R),{t:m}=I("translation",{keyPrefix:"cartModal"}),{image:C,productName:g,brand:x,sizeFilter:d,colour:v,colourHexa:r}=H;return e(S,{children:s("div",{className:f?"articles__item articles__item-mobile":"articles__item",children:[e("div",{className:"image-wrapper",children:e("img",{src:c(a,C),loading:"lazy",alt:c(a,g)})}),s("div",{className:"infos",children:[e("p",{className:"brand",children:c(a,x)}),e("p",{className:"productName",children:c(a,g)}),c(a,d)&&s("p",{className:"size",children:[m("sizeTitle"),":",e("span",{children:c(a,d)[Math.floor(Math.random()*c(a,d).length)]})]}),c(a,v)&&s("div",{className:"colors",children:[s("p",{children:[m("colorTitle"),":"]})," ",e("span",{children:c(a,v)})," ",c(a,r)&&e("span",{className:"colors__badge",style:{background:c(a,r).split(";")[1]}})]}),e("p",{className:"price",children:e(A,{hit:a.totalPrice.toFixed(2)})})]}),e("div",{className:"articles__IconWrapper",children:s("div",{className:"icons",children:[e("div",{className:"minusIcon",onClick:()=>{a.qty===1&&(t.length===1&&localStorage.removeItem("myCart"),l(o=>o.filter(n=>n.objectID!==a.objectID))),_(a)},children:e(M,{})}),e("p",{children:a.qty}),e("div",{className:"plusIcon",onClick:()=>{i("conversion",a,"Cart: Add to cart"),N(a)},children:e(D,{})})]})}),e("div",{className:"articles__removeProduct",onClick:()=>{p(!0),l(o=>o.filter(n=>n.objectID!==a.objectID)),localStorage.removeItem("myCart")},children:e(z,{})})]})})},X=({objectIds:a})=>{const i=u(O),{t}=I("translation",{keyPrefix:"pdp"}),{recommendations:l}=F({recommendClient:w,indexName:i,maxRecommendations:3,objectIDs:a});return e(S,{children:l.length?s("div",{className:"recommend-cart",children:[e("h3",{className:"title",children:t("relatedTitle")}),e(q,{itemComponent:E,items:l})]}):""})};const ee=()=>{const[a,i]=b(P),[t,l]=b(k),[p,N]=y.exports.useState([]),_=y.exports.useRef(),f=u(V),{isDesktop:m}=u(R),{sendEvent:C}=G(),g=u(W);B(a);const x=h(Q),d=h(U),v=o=>{d(!0),x(o),setTimeout(()=>d(!1),5e3)};Y(_,f,()=>{i(!1)});const{t:r}=I("translation",{keyPrefix:"cartModal"});return y.exports.useEffect(()=>{t.length&&N(t.reduce((o,n)=>[...o,n.objectID],[]))},[t]),s($.div,{initial:{opacity:0,x:"120%"},animate:{opacity:1,x:0},exit:{opacity:0,x:"100%"},transition:J,className:`${m?"modal-container":"modal-container-mobile modal-container"}`,ref:_,children:[!m&&e("a",{className:"modal-container-mobile__close",onClick:()=>{i(!1)},children:"x"}),s("h3",{className:"modal-container__title",children:[r("title"),(a==null?void 0:a.length)>0&&s("span",{className:"modal-container__title",children:["(",a.length,")"]})]}),e("div",{className:"modal-container__line"}),e("div",{className:"articles",children:t.map((o,n)=>{if(o.qty!==0)return e(L,{item:o,sendEvent:C},n)})}),t.length===0&&e("p",{children:r("yourCartIsEmpty")}),t.length!==0&&s("div",{className:"modal-container__buttons",children:[e("a",{className:"modal-container__emptyCart",onClick:()=>{l([]),localStorage.removeItem("myCart")},children:e("p",{children:r("emptyCart")})}),s("a",{className:"modal-container__checkout",onClick:()=>{C("conversion",t,"Cart: Checkout"),v("Thanks using Algolia \u{1F499}"),l([]),localStorage.removeItem("myCart")},children:[e("p",{children:r("checkout")}),e(K,{})]})]}),e("div",{className:"modal-container__recommend",children:g&&p&&t.length!==0&&e(X,{objectIds:p})})]})};export{ee as default};
