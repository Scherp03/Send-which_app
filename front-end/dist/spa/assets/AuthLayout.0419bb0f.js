import{r as u,u as C,a as L,o as f,c as S,w as t,b as e,Q as l,d as i,e as _,av as v,h as r,f as k,g as V,F as A,v as x,m as T}from"./index.d75b9d65.js";import{Q as B,a as D,b as q,c,d as F,e as P}from"./QDrawer.a0444874.js";import{Q as U,a as H}from"./QCard.a5c6b69d.js";import{Q as N}from"./QCardActions.54cf2e5e.js";import{Q as $}from"./QDialog.c6ea9b2d.js";import{Q as E,_ as I}from"./EssentialLink.a3f28547.js";import{Q as O}from"./QItemLabel.0ac87a2f.js";import{Q as R}from"./QList.75f726ed.js";import{Q as W,a as G}from"./QLayout.d2ebaba8.js";import{_ as M,C as h}from"./Send-WhichLogo.371ff28c.js";import{u as Y}from"./use-quasar.0c0ee1e7.js";import"./uid.937d8ee7.js";import"./QScrollObserver.b508ddad.js";import"./use-prevent-scroll.b6b7592a.js";import"./use-dark.ef90c1ea.js";import"./format.6b9ba967.js";import"./focus-manager.40072c15.js";import"./QItem.1d059bbf.js";const j=r("body",null,[r("div",null,[r("div",{class:"wave"}),r("div",{class:"wave"}),r("div",{class:"wave"})])],-1),z=r("span",{class:"q-ml-sm"},"Are you sure to log out?",-1),J=r("img",{src:M,alt:"Send-Which Logo"},null,-1),ve={__name:"AuthLayout",setup(K){const n=u(!1),d=Y(),g=C(),Q=async()=>{try{localStorage.removeItem("token"),g.push("/login"),d.notify({type:"positive",message:"You have logged out"})}catch(p){d.notify({type:"negative",message:"An error occurred. Please try again later."}),console.error("Error:",p)}},m=u(""),b=[{title:"SandWichApp",caption:"quasar.dev",icon:"school",link:"https://quasar.dev"},{title:"Github",caption:"github.com/Send-which-app",icon:"code",link:"https://github.com/Scherp03/Send-which_app"}],s=u(!1);function w(){s.value=!s.value}return(p,o)=>{const y=L("router-view");return f(),S(W,{view:"lHh Lpr lFf"},{default:t(()=>[e(E,{elevated:""},{default:t(()=>[e(B,null,{default:t(()=>[e(l,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:w}),i(e(D,null,{default:t(()=>[_(" Sendwhich App ")]),_:1},512),[[x,!1]]),e(l,{flat:"",label:"Home",to:"/auth"}),e(l,{flat:"",label:"Contact",to:"/auth/contacts"}),e(l,{flat:"",label:"Order",to:"/auth/order"}),j,e(l,{flat:"",name:"Logout",color:"red",label:"Logout",onClick:o[0]||(o[0]=a=>n.value=!0)}),e($,{modelValue:n.value,"onUpdate:modelValue":o[1]||(o[1]=a=>n.value=a),persistent:""},{default:t(()=>[e(U,null,{default:t(()=>[e(H,{class:"row items-center"},{default:t(()=>[e(v,{icon:"logout",color:"primary","text-color":"white"}),z]),_:1}),e(N,{align:"right"},{default:t(()=>[i(e(l,{flat:"",label:"Cancel",color:"primary"},null,512),[[h]]),i(e(l,{flat:"",label:"Logout",color:"red",onClick:Q},null,512),[[h]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),r("div",null,[e(l,{flat:"",round:"",to:"/auth/account"},{default:t(()=>[e(v,null,{default:t(()=>[J]),_:1})]),_:1})])]),_:1})]),_:1}),e(F,null,{default:t(()=>[e(q,{modelValue:m.value,"onUpdate:modelValue":o[2]||(o[2]=a=>m.value=a),class:"text-teal"},{default:t(()=>[e(c,{name:"Sendwich",icon:"home",label:"Sendwich",to:"/auth"}),e(c,{name:"Contacts",icon:"contacts",label:"Contact",to:"/auth/contacts"}),e(c,{name:"Setting",icon:"settings",label:"Settings",to:"/auth/settings"})]),_:1},8,["modelValue"])]),_:1}),e(P,{modelValue:s.value,"onUpdate:modelValue":o[3]||(o[3]=a=>s.value=a),breakpoint:767,width:250,bordered:""},{default:t(()=>[e(R,null,{default:t(()=>[e(O,{header:""},{default:t(()=>[_(" Util links ")]),_:1}),(f(),k(A,null,V(b,a=>e(I,T({key:a.title,ref_for:!0},a),null,16)),64))]),_:1})]),_:1},8,["modelValue"]),e(G,null,{default:t(()=>[e(y)]),_:1})]),_:1})}}};export{ve as default};
