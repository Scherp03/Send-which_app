import{Q as S}from"./QInput.10305cb2.js";import{i as Y,ai as Z,ah as $,j as y,O as ee,k as I,A as K,aF as te,R as z,x as ne,C as ae,r as _,s as le,o as v,c as D,w as i,b as l,h as o,aG as A,f as C,F as E,g as N,S as M,Q as L,e as h,T as u,d as G,ar as oe,as as se}from"./index.d75b9d65.js";import{u as ie,a as re}from"./use-dark.ef90c1ea.js";import{Q as H,a as j}from"./QItem.1d059bbf.js";import{Q as J}from"./QList.75f726ed.js";import{Q as O,a as U}from"./QCard.a5c6b69d.js";import{Q as W}from"./QPage.44405011.js";import{a as de,Q as ce}from"./QLayout.d2ebaba8.js";import{a as Q}from"./axios.bf56c3c5.js";import{u as ue}from"./use-quasar.0c0ee1e7.js";import{_ as me}from"./plugin-vue_export-helper.21dcd24c.js";import"./uid.937d8ee7.js";import"./focus-manager.40072c15.js";import"./private.use-form.189d1252.js";import"./QScrollObserver.b508ddad.js";const ge={xs:8,sm:10,md:14,lg:20,xl:24};var he=Y({name:"QChip",props:{...ie,...Z,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:s,emit:g}){const{proxy:{$q:t}}=ae(),f=re(e,t),w=$(e,ge),n=y(()=>e.selected===!0||e.icon!==void 0),d=y(()=>e.selected===!0?e.iconSelected||t.iconSet.chip.selected:e.icon),q=y(()=>e.iconRemove||t.iconSet.chip.remove),k=y(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),T=y(()=>{const a=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(a?` text-${a} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(k.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(f.value===!0?" q-chip--dark q-dark":"")}),V=y(()=>{const a=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},r={...a,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||t.lang.label.remove};return{chip:a,remove:r}});function R(a){a.keyCode===13&&x(a)}function x(a){e.disable||(g("update:selected",!e.selected),g("click",a))}function c(a){(a.keyCode===void 0||a.keyCode===13)&&(ne(a),e.disable===!1&&(g("update:modelValue",!1),g("remove")))}function p(){const a=[];k.value===!0&&a.push(I("div",{class:"q-focus-helper"})),n.value===!0&&a.push(I(K,{class:"q-chip__icon q-chip__icon--left",name:d.value}));const r=e.label!==void 0?[I("div",{class:"ellipsis"},[e.label])]:void 0;return a.push(I("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},te(s.default,r))),e.iconRight&&a.push(I(K,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&a.push(I(K,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:q.value,...V.value.remove,onClick:c,onKeyup:c})),a}return()=>{if(e.modelValue===!1)return;const a={class:T.value,style:w.value};return k.value===!0&&Object.assign(a,V.value.chip,{onClick:x,onKeyup:R}),ee("div",a,p(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[z,e.ripple]])}}});const ve={setup(){const e=ue(),s=_({name:"",price:"",description:"",tags:["sandwich-app"],quantity:100}),g=_(""),t=_([]),f=_([]),w=_([]),n=_([]),d=_([]),q=()=>{s.value.name&&s.value.price?(t.value.push({...s.value}),s.value={name:"",price:"",description:"",tags:["sandwich-app"],quantity:100}):e.notify({type:"warning",message:"Please enter both name and price"})},k=c=>{t.value.splice(c,1)},T=async()=>{try{const c=t.value.map(p=>Q.patch("https://send-which-app.onrender.com/api/v1/ingredients/add",p));await Promise.all(c),e.notify({type:"positive",message:"Ingredients submitted successfully"}),t.value=[]}catch(c){console.error("Error submitting ingredients:",c),e.notify({type:"negative",message:"Error submitting ingredients"})}},V=async()=>{try{const c=await Q.get("https://send-which-app.onrender.com/api/v1/order");if(c.data.success){f.value=c.data.orders;const p=f.value.map(r=>r.slotID),a=f.value.map(r=>r.content);for(let r=0;r<p.length;r++)try{const b=await Q.get(`https://send-which-app.onrender.com/api/v1/slots/${p[r]}`);w.value.push(b.data.time)}catch(b){console.error(`Error fetching slot with ID ${p[r]}:`,b)}for(let r=0;r<a.length;r++){let b=[];try{const B=await Q.get(`https://send-which-app.onrender.com/api/v1/sandwich/${a[r]}`),F=B.data.sandwichIngredientsId;n.value.push(B.data.sandwichBreadType);for(let P=0;P<F.length;P++){const X=await Q.get(`https://send-which-app.onrender.com/api/v1/ingredients/${F[P]}`);b.push(X.data.ingredient.name)}d.value.push(b)}catch(B){console.error(`Error fetching slot with ID ${p[r]}:`,B)}}console.log(d)}}catch{e.notify({type:"negative",message:"Error fetching orders"})}},R=()=>{g.value&&(s.value.tags.push(g.value),g.value="")},x=c=>{s.value.tags.splice(c,1)};return le(()=>{V()}),{newIngredient:s,tagInput:g,ingredients:t,orders:f,slot:w,breadType:n,sandwichcontent:d,addIngredient:q,removeIngredient:k,submitIngredients:T,addTag:R,removeTag:x}}},m=e=>(oe("data-v-5ed98545"),e=e(),se(),e),pe={class:"row q-col-gutter-md"},fe={class:"col-6"},_e=m(()=>o("div",{class:"text-h6"},"Add Ingredients",-1)),be={key:0,class:"q-mb-sm"},ye=m(()=>o("br",null,null,-1)),Ie=m(()=>o("br",null,null,-1)),we={key:0},qe=m(()=>o("br",null,null,-1)),ke={class:"col-6"},Se=m(()=>o("div",{class:"text-h6"},"Orders",-1)),Ce=m(()=>o("strong",null,"Slot:",-1)),Qe=m(()=>o("strong",null,"Bread Type:",-1)),Ve=m(()=>o("strong",null,"Ingredients:",-1)),xe=m(()=>o("strong",null,"Total:",-1)),Be=m(()=>o("strong",null,"Status:",-1)),De=m(()=>o("strong",null,"Date:",-1));function Te(e,s,g,t,f,w){return v(),D(W,{padding:""},{default:i(()=>[l(ce,{view:"hHh lpR fFf"},{default:i(()=>[l(de,null,{default:i(()=>[l(W,{padding:""},{default:i(()=>[l(O,null,{default:i(()=>[l(U,null,{default:i(()=>[o("div",pe,[o("div",fe,[l(O,null,{default:i(()=>[l(U,null,{default:i(()=>[_e,l(S,{modelValue:t.newIngredient.name,"onUpdate:modelValue":s[0]||(s[0]=n=>t.newIngredient.name=n),label:"New Ingredient",filled:"",class:"q-mb-sm",onKeyup:A(t.addIngredient,["enter"])},null,8,["modelValue","onKeyup"]),l(S,{modelValue:t.newIngredient.price,"onUpdate:modelValue":s[1]||(s[1]=n=>t.newIngredient.price=n),label:"Price in \u20AC",type:"number",filled:"",class:"q-mb-sm",onKeyup:A(t.addIngredient,["enter"])},null,8,["modelValue","onKeyup"]),l(S,{modelValue:t.newIngredient.description,"onUpdate:modelValue":s[2]||(s[2]=n=>t.newIngredient.description=n),label:"Description",type:"textarea",filled:"",class:"q-mb-sm"},null,8,["modelValue"]),l(S,{modelValue:t.tagInput,"onUpdate:modelValue":s[3]||(s[3]=n=>t.tagInput=n),label:"Tags (press enter to add)",filled:"",class:"q-mb-sm",onKeyup:A(t.addTag,["enter"])},null,8,["modelValue","onKeyup"]),t.newIngredient.tags.length?(v(),C("div",be,[(v(!0),C(E,null,N(t.newIngredient.tags,(n,d)=>(v(),D(he,{key:d,removable:"",onRemove:q=>t.removeTag(d)},{default:i(()=>[h(u(n),1)]),_:2},1032,["onRemove"]))),128))])):M("",!0),l(S,{modelValue:t.newIngredient.quantity,"onUpdate:modelValue":s[4]||(s[4]=n=>t.newIngredient.quantity=n),label:"Quantity",type:"number",filled:"",class:"q-mb-sm"},null,8,["modelValue"]),l(L,{icon:"add",color:"primary",onClick:t.addIngredient,class:"q-mb-md"},{default:i(()=>[h(" Add ")]),_:1},8,["onClick"]),l(J,{bordered:""},{default:i(()=>[(v(!0),C(E,null,N(t.ingredients,(n,d)=>G((v(),D(H,{key:d,class:"q-pa-xs",clickable:""},{default:i(()=>[l(j,null,{default:i(()=>[h(u(n.name)+" - \u20AC"+u(n.price),1),ye,o("span",null,u(n.description),1),Ie,n.tags&&n.tags.length?(v(),C("span",we,"Tags: "+u(n.tags.join(", ")),1)):M("",!0),qe,o("span",null,"Quantity: "+u(n.quantity),1)]),_:2},1024),l(j,{side:""},{default:i(()=>[l(L,{dense:"",flat:"",round:"",icon:"close",color:"negative",onClick:q=>t.removeIngredient(d)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)),[[z]])),128))]),_:1}),l(L,{color:"green",onClick:t.submitIngredients,class:"q-mt-md"},{default:i(()=>[h(" Submit Ingredients ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),o("div",ke,[l(O,null,{default:i(()=>[l(U,null,{default:i(()=>[Se,l(J,{bordered:""},{default:i(()=>[(v(!0),C(E,null,N(t.orders,(n,d)=>G((v(),D(H,{key:d,class:"q-pa-xs",clickable:""},{default:i(()=>[l(j,null,{default:i(()=>[o("div",null,[Ce,h(" "+u(t.slot[d]),1)]),o("div",null,[Qe,h(" "+u(t.breadType[d]),1)]),o("div",null,[Ve,h(" "+u(t.sandwichcontent[d]),1)]),o("div",null,[xe,h(" \u20AC"+u(n.total),1)]),o("div",null,[Be,h(" "+u(n.status),1)]),o("div",null,[De,h(" "+u(n.date),1)])]),_:2},1024)]),_:2},1024)),[[z]])),128))]),_:1})]),_:1})]),_:1})])])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}var Je=me(ve,[["render",Te],["__scopeId","data-v-5ed98545"]]);export{Je as default};
