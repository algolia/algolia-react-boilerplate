import{r as t,x,y as S,I as k,J as H,R as u,K as I,a as o,j as e,G as p,Q as P,E,H as W,U as _,aI as b,aJ as j,i as A,aP as R,aQ as T,aS as y,ab as F,F as w,aT as B,a1 as N,aU as J,aV as M}from"./index.0541b32f.js";const O=({hit:s,sendEvent:a})=>{const{objectID:n,image:l,productName:i,brand:d}=W,[m,h]=t.exports.useState(!1),[f,c]=t.exports.useState(!1),r=x(S),C=k(),v=x(H),L=u(I);return o("div",{className:"item",onMouseEnter:()=>{h(!0)},onMouseLeave:()=>{h(!1)},children:[e("div",{className:`${m?"carousel__imageWrapper hovered":"carousel__imageWrapper"}`,children:e("img",{src:p(s,l),alt:p(s,i),onError:g=>g.currentTarget.src=placeHolderError})}),o("div",{className:"item__infos",children:[o("div",{className:"item__infos-up",onClick:()=>{v(s),C(`/search/product/${s[n]}`),a("click",s,"Homepage: Product clicked")},children:[e("p",{className:"brand",children:p(s,d)}),e("p",{className:"name",children:p(s,i)})]}),o("div",{className:"item__infos-down",children:[e("p",{className:"price",children:e(P,{hit:s})}),L&&e("div",{className:f?"cart cart-active":"cart",onClick:g=>{g.stopPropagation(),c(!0),setTimeout(()=>c(!1),300),r(s),a("conversion",s,"Homepage: Add to cart")},children:e(E,{})})]})]})]})},$=({context:s,title:a})=>{const n=u(_),l=u(b),i=u(j),d=x(A);return t.exports.useEffect(()=>d(!0),[]),e("div",{className:"home-carousel",children:o(R,{indexId:a,indexName:n,children:[e(T,{hitsPerPage:y,ruleContexts:s,optionalFilters:i.value,userToken:l.value,query:""}),e(Q,{title:a})]})})};function Q(s){const{hits:a,sendEvent:n}=F(s),{title:l}=s,[i,d]=t.exports.useState(0),[m,h]=t.exports.useState(!0),f=u(_),c=t.exports.useRef(),r=t.exports.useRef();return t.exports.useEffect(()=>{m||d(c.current.scrollWidth-c.current.offsetWidth)},[r]),t.exports.useEffect(()=>{a.length>0&&h(!1)},[a]),o(w,{children:[e("h3",{className:"title",children:l}),m?e(B,{type:"carousel"}):o(N.div,{ref:c,className:"carousel",children:[e("div",{className:"prevBtn",onClick:()=>{r.current.scrollLeft=0},children:e(J,{})}),e(N.div,{className:"inner-carousel",ref:r,children:a.map((C,v)=>e(O,{hit:C,index:f,sendEvent:n},v))}),e("div",{className:"nextBtn",onClick:()=>{r.current.scrollLeft=r.current.scrollWidth},children:e(M,{})})]})]})}export{$ as default};