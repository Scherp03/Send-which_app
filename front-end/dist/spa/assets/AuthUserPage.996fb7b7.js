import{r,s as p,W as h,o as u,c as _,w as n,b as i,h as e,e as m,T as f,A as g,ae as v,ar as w,as as y}from"./index.d75b9d65.js";import{Q as x}from"./QPage.44405011.js";import{a as A}from"./axios.bf56c3c5.js";import{u as I}from"./use-quasar.0c0ee1e7.js";import{_ as b}from"./plugin-vue_export-helper.21dcd24c.js";const c=t=>(w("data-v-65a7b873"),t=t(),y(),t),k={class:"fixed-center-center",style:{width:"100%"}},C={class:"fixed-center-center",key:"Enter message",style:{"font-weight":"bolder",color:"white","font-size":"300%"}},S={class:"first-name"},N=c(()=>e("h2",null,"About Send-Which App",-1)),P=c(()=>e("p",null," The Send-Which App is designed to provide an intuitive and efficient way to send and manage your packages. With user-friendly features, real-time tracking, and seamless integration with multiple delivery services, we ensure your packages are always on the right path. Our app is committed to enhancing your shipping experience by offering reliable, fast, and secure service. ",-1)),T=[N,P],U={__name:"AuthUserPage",setup(t){const s=r(""),o=r(null);I();const l=a=>`https://send-which-app.onrender.com/api/v1/users/${a}`,d=()=>{o.value.scrollIntoView({behavior:"smooth"})};return p(async()=>{try{const a=await A.get(l(localStorage.getItem("id")),{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});s.value=a.data.firstName}catch(a){console.error("Error fetching user data:",a)}}),h(()=>{console.log("Component is unmounted")}),(a,W)=>(u(),_(x,{padding:""},{default:n(()=>[i(v,{appear:"","enter-active-class":"animated fadeIn slower delay-0.5s repeat-2","leave-active-class":"animated fadeOut"},{default:n(()=>[e("div",k,[e("h1",C,[m(" WELCOME TO SEND-WHICH APP "),e("span",S,f(s.value.charAt(0).toUpperCase()+s.value.slice(1)),1)]),e("div",{class:"arrow-container",onClick:d},[i(g,{name:"arrow_downward",size:"55px",class:"pulse-arrow",color:"white"})])])]),_:1}),e("div",{ref_key:"scrollContent",ref:o,class:"scroll-content hide-scrollbar"},T,512)]),_:1}))}};var z=b(U,[["__scopeId","data-v-65a7b873"]]);export{z as default};
