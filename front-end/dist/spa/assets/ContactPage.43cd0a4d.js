import{a as d,Q as p}from"./QCard.a5c6b69d.js";import{Q as u}from"./QInput.10305cb2.js";import{r as i,o as c,c as f,w as o,b as t,Q as b,ar as g,as as v,h as _}from"./index.d75b9d65.js";import{Q as y}from"./QCardActions.54cf2e5e.js";import{Q as q}from"./QForm.8ff2fb10.js";import{Q}from"./QPage.44405011.js";import{u as V}from"./use-quasar.0c0ee1e7.js";import{a as S}from"./axios.bf56c3c5.js";import{_ as x}from"./plugin-vue_export-helper.21dcd24c.js";import"./use-dark.ef90c1ea.js";import"./uid.937d8ee7.js";import"./focus-manager.40072c15.js";import"./private.use-form.189d1252.js";const w={name:"ContactForm",setup(){const s=V(),l=i(""),r=i(""),a=i(""),m=i("");return{name:l,email:r,subject:a,message:m,onSubmit:async()=>{if(!l.value||!r.value||!a.value||!m.value){s.notify({type:"warning",message:"All fields are required"});return}try{await S.post("https://send-which-app.onrender.com/api/contact",{name:l.value,email:r.value,subject:a.value,message:m.value}),s.notify({type:"positive",message:"Message sent successfully"}),l.value="",r.value="",a.value="",m.value=""}catch{s.notify({type:"negative",message:"Failed to send message"})}}}}},C=s=>(g("data-v-0680b7b0"),s=s(),v(),s),j=C(()=>_("div",{class:"text-h6"},"Contact Us",-1));function h(s,l,r,a,m,n){return c(),f(Q,{padding:""},{default:o(()=>[t(p,{class:"q-pa-md",style:{"max-width":"600px",margin:"auto"}},{default:o(()=>[t(d,null,{default:o(()=>[j]),_:1}),t(q,{onSubmit:a.onSubmit},{default:o(()=>[t(d,null,{default:o(()=>[t(u,{modelValue:a.name,"onUpdate:modelValue":l[0]||(l[0]=e=>a.name=e),label:"Name",filled:"",required:"",rules:[e=>!!e||"Name is required"],class:"q-mb-md"},null,8,["modelValue","rules"]),t(u,{modelValue:a.email,"onUpdate:modelValue":l[1]||(l[1]=e=>a.email=e),label:"Email",type:"email",filled:"",required:"",rules:[e=>!!e||"Email is required",e=>/.+@.+\..+/.test(e)||"Email must be valid"],class:"q-mb-md"},null,8,["modelValue","rules"]),t(u,{modelValue:a.subject,"onUpdate:modelValue":l[2]||(l[2]=e=>a.subject=e),label:"Subject",filled:"",required:"",rules:[e=>!!e||"Subject is required"],class:"q-mb-md"},null,8,["modelValue","rules"]),t(u,{modelValue:a.message,"onUpdate:modelValue":l[3]||(l[3]=e=>a.message=e),label:"Message",type:"textarea",filled:"",required:"",rules:[e=>!!e||"Message is required"],class:"q-mb-md",autogrow:""},null,8,["modelValue","rules"])]),_:1}),t(y,{align:"right"},{default:o(()=>[t(b,{type:"submit",label:"Submit",color:"primary"})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})}var H=x(w,[["render",h],["__scopeId","data-v-0680b7b0"]]);export{H as default};
