import{Q as m}from"./QScrollArea.46d2dc3b.js";import{Q as u}from"./QPage.44405011.js";import{r as n,s as y,o as e,c as f,w as d,h as c,b as p,ap as b,f as t,F as h,g as _,T as l}from"./index.d75b9d65.js";import{a as v}from"./axios.bf56c3c5.js";import{_ as x}from"./plugin-vue_export-helper.21dcd24c.js";import"./use-dark.ef90c1ea.js";import"./QScrollObserver.b508ddad.js";import"./format.6b9ba967.js";const k={setup(){const o=n([]),i=n(!0),g=n(["Whole Wheat","Rye","Sourdough","Multigrain","Baguette","Ciabatta"]),a=async()=>{try{const s=await v.get("https://send-which-app.onrender.com/api/v1/ingredients");o.value=s.data.ingredients}catch(s){console.error("Error fetching ingredients:",s)}finally{i.value=!1}};return y(async()=>{await a()}),{ingredients:o,loading:i,breads:g,thumbStyle:{right:"4px",borderRadius:"5px",backgroundColor:"#027be3",width:"5px",opacity:.75},barStyle:{right:"2px",borderRadius:"7px",backgroundColor:"#027be3",width:"9px",opacity:.2}}}},w={class:"q-pa-md"},S={class:"fixed-center"},I=c("div",{style:{color:"white","font-size":"25px","font-family":"Verdana","font-weight":"bold"}}," LIST OF INGREDIENTS FOR THE SANDWICH ",-1),B={key:0,class:"loading-message"},C={key:1},E={key:2,class:"loading-message"},F={key:3};function N(o,i,g,a,s,R){return e(),f(u,{padding:""},{default:d(()=>[c("div",w,[c("div",S,[p(b,{appear:"","enter-active-class":"animated fadeIn slower delay-1s"},{default:d(()=>[I]),_:1}),p(m,{"thumb-style":a.thumbStyle,"bar-style":a.barStyle,style:{height:"350px","background-color":"whitesmoke","border-radius":"2px",border:"2px solid #73ad21","border-color":"black"}},{default:d(()=>[o.loadingBreads?(e(),t("div",B," Loading bread types... ")):(e(),t("div",C,[(e(!0),t(h,null,_(a.breads,r=>(e(),t("div",{key:r,class:"ingredient-item"},l(r)+" - \u20AC2.00 ",1))),128))])),a.loading?(e(),t("div",E,"Loading...")):(e(),t("div",F,[(e(!0),t(h,null,_(a.ingredients,r=>(e(),t("div",{key:r.id,class:"ingredient-item"},l(r.name)+" - \u20AC"+l(r.price.toFixed(2)),1))),128))]))]),_:1},8,["thumb-style","bar-style"])])])]),_:1})}var H=x(k,[["render",N]]);export{H as default};
