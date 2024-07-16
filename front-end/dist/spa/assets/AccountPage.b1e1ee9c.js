import{a as V,Q as P}from"./QCard.a5c6b69d.js";import{Q as f}from"./QInput.10305cb2.js";import{r as s,u as B,V as F,s as $,o as m,c as d,w as c,b as p,aq as z,h as v,aE as g,S as _,A as D,Q as j,ar as L,as as M}from"./index.d75b9d65.js";import{Q as R}from"./QForm.8ff2fb10.js";import{Q as T}from"./QPage.44405011.js";import{u as G}from"./use-quasar.0c0ee1e7.js";import{a as q}from"./axios.bf56c3c5.js";import{_ as H}from"./plugin-vue_export-helper.21dcd24c.js";import"./use-dark.ef90c1ea.js";import"./uid.937d8ee7.js";import"./focus-manager.40072c15.js";import"./private.use-form.189d1252.js";const Q=h=>(L("data-v-17986d1b"),h=h(),M(),h),J=Q(()=>v("div",{class:"text-h6"},"Account Settings",-1)),K={class:"q-layout"},O={class:"q-column"},W=Q(()=>v("div",{class:"q-column",style:{width:"50px"}},null,-1)),X={class:"q-column"},Y={class:"q-mt-md q-flex q-justify-end"},Z={__name:"AccountPage",setup(h){const o=s(""),r=s(""),u=s(""),n=s(""),i=s(""),y=s(!1),b=G(),S=B(),U=s(!0),k=s(!0),x=s(!0),I=s(!0),E=s(!0),t=F({username:"",email:"",firstName:"",lastName:""}),w=e=>`https://send-which-app.onrender.com/api/v1/users/${e}`,N=async()=>{try{const e=await q.get(w(localStorage.getItem("id")),{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});o.value=e.data.username,r.value=e.data.email,u.value=e.data.firstName,n.value=e.data.lastName,t.username=e.data.username,t.email=e.data.email,t.firstName=e.data.firstName,t.lastName=e.data.lastName}catch(e){b.notify({type:"negative",message:"Error fetching user data"}),console.error("Error fetching user data:",e)}};$(N);const A=()=>{y.value=!y.value},C=async()=>{const e={};o.value!==t.username&&(e.username=o.value),r.value!==t.email&&(e.email=r.value),u.value!==t.firstName&&(e.firstName=u.value),n.value!==t.lastName&&(e.lastName=n.value),i.value!==""&&(e.password=i.value),console.log("Updating user data:",e);try{const a=await q.patch(w(localStorage.getItem("id")),e,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}});if(a.status===200)b.notify({type:"positive",message:"Account settings updated successfully!"}),await N(),e.password&&(i.value=""),localStorage.clear(),S.push("/login");else throw new Error(a.data.message||"Error updating account settings")}catch(a){b.notify({type:"negative",message:a.message||"Error updating account settings"}),console.error("Error updating account settings:",a)}};return(e,a)=>(m(),d(T,{padding:""},{default:c(()=>[p(P,{class:"q-mt-md q-pa-md"},{default:c(()=>[p(V,null,{default:c(()=>[J]),_:1}),p(V,{class:"q-gutter-md"},{default:c(()=>[p(R,{onSubmit:z(C,["prevent"])},{default:c(()=>[v("div",K,[v("div",O,[U.value?(m(),d(f,{key:0,modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=l=>o.value=l),label:"Username",filled:"",clearable:"",class:g(["q-mb-md",{changed:o.value!==t.username}])},null,8,["modelValue","class"])):_("",!0),k.value?(m(),d(f,{key:1,modelValue:r.value,"onUpdate:modelValue":a[1]||(a[1]=l=>r.value=l),label:"Email",type:"email",filled:"",clearable:"",class:g(["q-mb-md",{changed:r.value!==t.email}])},null,8,["modelValue","class"])):_("",!0),x.value?(m(),d(f,{key:2,modelValue:u.value,"onUpdate:modelValue":a[2]||(a[2]=l=>u.value=l),label:"First Name",filled:"",clearable:"",class:g(["q-mb-md",{changed:u.value!==t.firstName}])},null,8,["modelValue","class"])):_("",!0)]),W,v("div",X,[I.value?(m(),d(f,{key:0,modelValue:n.value,"onUpdate:modelValue":a[3]||(a[3]=l=>n.value=l),label:"Last Name",filled:"",clearable:"",class:g(["q-mb-md",{changed:n.value!==t.lastName}])},null,8,["modelValue","class"])):_("",!0),E.value?(m(),d(f,{key:1,modelValue:i.value,"onUpdate:modelValue":a[4]||(a[4]=l=>i.value=l),type:y.value?"text":"password",label:"Password",filled:"",clearable:"",class:g(["q-mb-md",{changed:i.value!==""}])},{append:c(()=>[p(D,{name:y.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:A},null,8,["name"])]),_:1},8,["modelValue","type","class"])):_("",!0)])]),v("div",Y,[p(j,{label:"Save Changes",type:"submit",color:"primary"})])]),_:1})]),_:1})]),_:1})]),_:1}))}};var ce=H(Z,[["__scopeId","data-v-17986d1b"]]);export{ce as default};