import{u as c,o as d,c as n,w as u,h as o,b as p,Q as l,ar as _,as as i}from"./index.d75b9d65.js";import{Q as h}from"./QPage.44405011.js";import{u as m}from"./use-quasar.0c0ee1e7.js";import{_ as f}from"./plugin-vue_export-helper.21dcd24c.js";const g={setup(){const e=m(),t=c();return{handleLogout:()=>{localStorage.clear(),e.notify({type:"positive",message:" see you soon."}),t.push("/")}}}},s=e=>(_("data-v-31bcd342"),e=e(),i(),e),v={class:"q-pa-md row justify-center items-center text-center"},y=s(()=>o("h1",{style:{color:"white"}},"Order Completed",-1)),w=s(()=>o("p",{style:{color:"white"}},"Press the button to return to the home page.",-1));function x(e,t,a,r,S,b){return d(),n(h,{padding:""},{default:u(()=>[o("div",v,[o("div",null,[y,w,p(l,{color:"primary",onClick:r.handleLogout,label:"Go to Home and Logout",class:"q-mt-md"},null,8,["onClick"])])])]),_:1})}var I=f(g,[["render",x],["__scopeId","data-v-31bcd342"]]);export{I as default};