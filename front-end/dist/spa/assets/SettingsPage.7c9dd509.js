import{Q as m}from"./QItemLabel.0ac87a2f.js";import{a as v,Q as y}from"./QItem.1d059bbf.js";import{u as he,a as Ce}from"./use-dark.ef90c1ea.js";import{i as re,j as n,k as b,C as oe,A as D,r as h,q as Xe,ac as Je,O as Ye,af as Ze,ag as Z,H as el,x as ll,o as V,f as al,b as t,w as r,e as f,d as I,c as R,R as N}from"./index.d75b9d65.js";import{u as tl,a as nl,b as rl,Q as ee}from"./QCheckbox.b563db11.js";import{u as ol,a as ul,b as sl}from"./private.use-form.189d1252.js";import{b as P,T as il}from"./format.6b9ba967.js";import{Q as cl}from"./QList.75f726ed.js";import{_ as dl}from"./plugin-vue_export-helper.21dcd24c.js";const vl={true:"inset",item:"item-inset","item-thumbnail":"item-thumbnail-inset"},le={xs:2,sm:4,md:8,lg:16,xl:24};var ae=re({name:"QSeparator",props:{...he,spaced:[Boolean,String],inset:[Boolean,String],vertical:Boolean,color:String,size:String},setup(a){const s=oe(),_=Ce(a,s.proxy.$q),o=n(()=>a.vertical===!0?"vertical":"horizontal"),e=n(()=>` q-separator--${o.value}`),S=n(()=>a.inset!==!1?`${e.value}-${vl[a.inset]}`:""),i=n(()=>`q-separator${e.value}${S.value}`+(a.color!==void 0?` bg-${a.color}`:"")+(_.value===!0?" q-separator--dark":"")),k=n(()=>{const w={};if(a.size!==void 0&&(w[a.vertical===!0?"width":"height"]=a.size),a.spaced!==!1){const Q=a.spaced===!0?`${le.md}px`:a.spaced in le?`${le[a.spaced]}px`:a.spaced,C=a.vertical===!0?["Left","Right"]:["Top","Bottom"];w[`margin${C[0]}`]=w[`margin${C[1]}`]=Q}return w});return()=>b("hr",{class:i.value,style:k.value,"aria-orientation":o.value})}}),te=re({name:"QToggle",props:{...tl,icon:String,iconColor:String},emits:nl,setup(a){function s(_,o){const e=n(()=>(_.value===!0?a.checkedIcon:o.value===!0?a.indeterminateIcon:a.uncheckedIcon)||a.icon),S=n(()=>_.value===!0?a.iconColor:null);return()=>[b("div",{class:"q-toggle__track"}),b("div",{class:"q-toggle__thumb absolute flex flex-center no-wrap"},e.value!==void 0?[b(D,{name:e.value,color:S.value})]:void 0)]}return rl("toggle",s)}});const pe="q-slider__marker-labels",ml=a=>({value:a}),fl=({marker:a})=>b("div",{key:a.value,style:a.style,class:a.classes},a.label),_e=[34,37,40,33,39,38],bl={...he,...ol,min:{type:Number,default:0},max:{type:Number,default:100},innerMin:Number,innerMax:Number,step:{type:Number,default:1,validator:a=>a>=0},snap:Boolean,vertical:Boolean,reverse:Boolean,color:String,markerLabelsClass:String,label:Boolean,labelColor:String,labelTextColor:String,labelAlways:Boolean,switchLabelSide:Boolean,markers:[Boolean,Number],markerLabels:[Boolean,Array,Object,Function],switchMarkerLabelsSide:Boolean,trackImg:String,trackColor:String,innerTrackImg:String,innerTrackColor:String,selectionColor:String,selectionImg:String,thumbSize:{type:String,default:"20px"},trackSize:{type:String,default:"4px"},disable:Boolean,readonly:Boolean,dense:Boolean,tabindex:[String,Number],thumbColor:String,thumbPath:{type:String,default:"M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"}},gl=["pan","update:modelValue","change"];function kl({updateValue:a,updatePosition:s,getDragging:_,formAttrs:o}){const{props:e,emit:S,slots:i,proxy:{$q:k}}=oe(),w=Ce(e,k),Q=ul(o),C=h(!1),z=h(!1),M=h(!1),F=h(!1),x=n(()=>e.vertical===!0?"--v":"--h"),K=n(()=>"-"+(e.switchLabelSide===!0?"switched":"standard")),q=n(()=>e.vertical===!0?e.reverse===!0:e.reverse!==(k.lang.rtl===!0)),$=n(()=>isNaN(e.innerMin)===!0||e.innerMin<e.min?e.min:e.innerMin),L=n(()=>isNaN(e.innerMax)===!0||e.innerMax>e.max?e.max:e.innerMax),g=n(()=>e.disable!==!0&&e.readonly!==!0&&$.value<L.value),B=n(()=>{if(e.step===0)return u=>u;const l=(String(e.step).trim().split(".")[1]||"").length;return u=>parseFloat(u.toFixed(l))}),A=n(()=>e.step===0?1:e.step),xe=n(()=>g.value===!0?e.tabindex||0:-1),U=n(()=>e.max-e.min),ue=n(()=>L.value-$.value),E=n(()=>H($.value)),G=n(()=>H(L.value)),j=n(()=>e.vertical===!0?q.value===!0?"bottom":"top":q.value===!0?"right":"left"),se=n(()=>e.vertical===!0?"height":"width"),ye=n(()=>e.vertical===!0?"width":"height"),ie=n(()=>e.vertical===!0?"vertical":"horizontal"),Se=n(()=>{const l={role:"slider","aria-valuemin":$.value,"aria-valuemax":L.value,"aria-orientation":ie.value,"data-step":e.step};return e.disable===!0?l["aria-disabled"]="true":e.readonly===!0&&(l["aria-readonly"]="true"),l}),we=n(()=>`q-slider q-slider${x.value} q-slider--${C.value===!0?"":"in"}active inline no-wrap `+(e.vertical===!0?"row":"column")+(e.disable===!0?" disabled":" q-slider--enabled"+(g.value===!0?" q-slider--editable":""))+(M.value==="both"?" q-slider--focus":"")+(e.label||e.labelAlways===!0?" q-slider--label":"")+(e.labelAlways===!0?" q-slider--label-always":"")+(w.value===!0?" q-slider--dark":"")+(e.dense===!0?" q-slider--dense q-slider--dense"+x.value:""));function O(l){const u="q-slider__"+l;return`${u} ${u}${x.value} ${u}${x.value}${K.value}`}function ce(l){const u="q-slider__"+l;return`${u} ${u}${x.value}`}const Me=n(()=>{const l=e.selectionColor||e.color;return"q-slider__selection absolute"+(l!==void 0?` text-${l}`:"")}),$e=n(()=>ce("markers")+" absolute overflow-hidden"),Ve=n(()=>ce("track-container")),qe=n(()=>O("pin")),Le=n(()=>O("label")),Be=n(()=>O("text-container")),Te=n(()=>O("marker-labels-container")+(e.markerLabelsClass!==void 0?` ${e.markerLabelsClass}`:"")),Ie=n(()=>"q-slider__track relative-position no-outline"+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),Re=n(()=>{const l={[ye.value]:e.trackSize};return e.trackImg!==void 0&&(l.backgroundImage=`url(${e.trackImg}) !important`),l}),Ne=n(()=>"q-slider__inner absolute"+(e.innerTrackColor!==void 0?` bg-${e.innerTrackColor}`:"")),de=n(()=>{const l=G.value-E.value,u={[j.value]:`${100*E.value}%`,[se.value]:l===0?"2px":`${100*l}%`};return e.innerTrackImg!==void 0&&(u.backgroundImage=`url(${e.innerTrackImg}) !important`),u});function Ae(l){const{min:u,max:c,step:d}=e;let p=u+l*(c-u);if(d>0){const T=(p-$.value)%d;p+=(Math.abs(T)>=d/2?(T<0?-1:1)*d:0)-T}return p=B.value(p),P(p,$.value,L.value)}function H(l){return U.value===0?0:(l-e.min)/U.value}function ze(l,u){const c=Je(l),d=e.vertical===!0?P((c.top-u.top)/u.height,0,1):P((c.left-u.left)/u.width,0,1);return P(q.value===!0?1-d:d,E.value,G.value)}const ve=n(()=>Ze(e.markers)===!0?e.markers:A.value),me=n(()=>{const l=[],u=ve.value,c=e.max;let d=e.min;do l.push(d),d+=u;while(d<c);return l.push(c),l}),fe=n(()=>{const l=` ${pe}${x.value}-`;return pe+`${l}${e.switchMarkerLabelsSide===!0?"switched":"standard"}${l}${q.value===!0?"rtl":"ltr"}`}),W=n(()=>e.markerLabels===!1?null:Pe(e.markerLabels).map((l,u)=>({index:u,value:l.value,label:l.label||l.value,classes:fe.value+(l.classes!==void 0?" "+l.classes:""),style:{...ge(l.value),...l.style||{}}}))),be=n(()=>({markerList:W.value,markerMap:Qe.value,classes:fe.value,getStyle:ge})),Fe=n(()=>{const l=ue.value===0?"2px":100*ve.value/ue.value;return{...de.value,backgroundSize:e.vertical===!0?`2px ${l}%`:`${l}% 2px`}});function Pe(l){if(l===!1)return null;if(l===!0)return me.value.map(ml);if(typeof l=="function")return me.value.map(c=>{const d=l(c);return Z(d)===!0?{...d,value:c}:{value:c,label:d}});const u=({value:c})=>c>=e.min&&c<=e.max;return Array.isArray(l)===!0?l.map(c=>Z(c)===!0?c:{value:c}).filter(u):Object.keys(l).map(c=>{const d=l[c],p=Number(c);return Z(d)===!0?{...d,value:p}:{value:p,label:d}}).filter(u)}function ge(l){return{[j.value]:`${100*(l-e.min)/U.value}%`}}const Qe=n(()=>{if(e.markerLabels===!1)return null;const l={};return W.value.forEach(u=>{l[u.value]=u}),l});function De(){if(i["marker-label-group"]!==void 0)return i["marker-label-group"](be.value);const l=i["marker-label"]||fl;return W.value.map(u=>l({marker:u,...be.value}))}const Ue=n(()=>[[il,Ee,void 0,{[ie.value]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]);function Ee(l){l.isFinal===!0?(F.value!==void 0&&(s(l.evt),l.touch===!0&&a(!0),F.value=void 0,S("pan","end")),C.value=!1,M.value=!1):l.isFirst===!0?(F.value=_(l.evt),s(l.evt),a(),C.value=!0,S("pan","start")):(s(l.evt),a())}function ke(){M.value=!1}function je(l){s(l,_(l)),a(),z.value=!0,C.value=!0,document.addEventListener("mouseup",X,!0)}function X(){z.value=!1,C.value=!1,a(!0),ke(),document.removeEventListener("mouseup",X,!0)}function Oe(l){s(l,_(l)),a(!0)}function Ke(l){_e.includes(l.keyCode)&&a(!0)}function Ge(l){if(e.vertical===!0)return null;const u=k.lang.rtl!==e.reverse?1-l:l;return{transform:`translateX(calc(${2*u-1} * ${e.thumbSize} / 2 + ${50-100*u}%))`}}function He(l){const u=n(()=>z.value===!1&&(M.value===l.focusValue||M.value==="both")?" q-slider--focus":""),c=n(()=>`q-slider__thumb q-slider__thumb${x.value} q-slider__thumb${x.value}-${q.value===!0?"rtl":"ltr"} absolute non-selectable`+u.value+(l.thumbColor.value!==void 0?` text-${l.thumbColor.value}`:"")),d=n(()=>({width:e.thumbSize,height:e.thumbSize,[j.value]:`${100*l.ratio.value}%`,zIndex:M.value===l.focusValue?2:void 0})),p=n(()=>l.labelColor.value!==void 0?` text-${l.labelColor.value}`:""),T=n(()=>Ge(l.ratio.value)),J=n(()=>"q-slider__text"+(l.labelTextColor.value!==void 0?` text-${l.labelTextColor.value}`:""));return()=>{const Y=[b("svg",{class:"q-slider__thumb-shape absolute-full",viewBox:"0 0 20 20","aria-hidden":"true"},[b("path",{d:e.thumbPath})]),b("div",{class:"q-slider__focus-ring fit"})];return(e.label===!0||e.labelAlways===!0)&&(Y.push(b("div",{class:qe.value+" absolute fit no-pointer-events"+p.value},[b("div",{class:Le.value,style:{minWidth:e.thumbSize}},[b("div",{class:Be.value,style:T.value},[b("span",{class:J.value},l.label.value)])])])),e.name!==void 0&&e.disable!==!0&&Q(Y,"push")),b("div",{class:c.value,style:d.value,...l.getNodeData()},Y)}}function We(l,u,c,d){const p=[];e.innerTrackColor!=="transparent"&&p.push(b("div",{key:"inner",class:Ne.value,style:de.value})),e.selectionColor!=="transparent"&&p.push(b("div",{key:"selection",class:Me.value,style:l.value})),e.markers!==!1&&p.push(b("div",{key:"marker",class:$e.value,style:Fe.value})),d(p);const T=[Ye("div",{key:"trackC",class:Ve.value,tabindex:u.value,...c.value},[b("div",{class:Ie.value,style:Re.value},p)],"slide",g.value,()=>Ue.value)];if(e.markerLabels!==!1){const J=e.switchMarkerLabelsSide===!0?"unshift":"push";T[J](b("div",{key:"markerL",class:Te.value},De()))}return T}return Xe(()=>{document.removeEventListener("mouseup",X,!0)}),{state:{active:C,focus:M,preventFocus:z,dragging:F,editable:g,classes:we,tabindex:xe,attributes:Se,roundValueFn:B,keyStep:A,trackLen:U,innerMin:$,innerMinRatio:E,innerMax:L,innerMaxRatio:G,positionProp:j,sizeProp:se,isReversed:q},methods:{onActivate:je,onMobileClick:Oe,onBlur:ke,onKeyup:Ke,getContent:We,getThumbRenderFn:He,convertRatioToModel:Ae,convertModelToRatio:H,getDraggingRatio:ze}}}const pl=()=>({});var ne=re({name:"QSlider",props:{...bl,modelValue:{required:!0,default:null,validator:a=>typeof a=="number"||a===null},labelValue:[String,Number]},emits:gl,setup(a,{emit:s}){const{proxy:{$q:_}}=oe(),{state:o,methods:e}=kl({updateValue:x,updatePosition:q,getDragging:K,formAttrs:sl(a)}),S=h(null),i=h(0),k=h(0);function w(){k.value=a.modelValue===null?o.innerMin.value:P(a.modelValue,o.innerMin.value,o.innerMax.value)}el(()=>`${a.modelValue}|${o.innerMin.value}|${o.innerMax.value}`,w),w();const Q=n(()=>e.convertModelToRatio(k.value)),C=n(()=>o.active.value===!0?i.value:Q.value),z=n(()=>{const g={[o.positionProp.value]:`${100*o.innerMinRatio.value}%`,[o.sizeProp.value]:`${100*(C.value-o.innerMinRatio.value)}%`};return a.selectionImg!==void 0&&(g.backgroundImage=`url(${a.selectionImg}) !important`),g}),M=e.getThumbRenderFn({focusValue:!0,getNodeData:pl,ratio:C,label:n(()=>a.labelValue!==void 0?a.labelValue:k.value),thumbColor:n(()=>a.thumbColor||a.color),labelColor:n(()=>a.labelColor),labelTextColor:n(()=>a.labelTextColor)}),F=n(()=>o.editable.value!==!0?{}:_.platform.is.mobile===!0?{onClick:e.onMobileClick}:{onMousedown:e.onActivate,onFocus:$,onBlur:e.onBlur,onKeydown:L,onKeyup:e.onKeyup});function x(g){k.value!==a.modelValue&&s("update:modelValue",k.value),g===!0&&s("change",k.value)}function K(){return S.value.getBoundingClientRect()}function q(g,B=o.dragging.value){const A=e.getDraggingRatio(g,B);k.value=e.convertRatioToModel(A),i.value=a.snap!==!0||a.step===0?A:e.convertModelToRatio(k.value)}function $(){o.focus.value=!0}function L(g){if(!_e.includes(g.keyCode))return;ll(g);const B=([34,33].includes(g.keyCode)?10:1)*o.keyStep.value,A=([34,37,40].includes(g.keyCode)?-1:1)*(o.isReversed.value===!0?-1:1)*(a.vertical===!0?-1:1)*B;k.value=P(o.roundValueFn.value(k.value+A),o.innerMin.value,o.innerMax.value),x()}return()=>{const g=e.getContent(z,o.tabindex,F,B=>{B.push(M())});return b("div",{ref:S,class:o.classes.value+(a.modelValue===null?" q-slider--no-value":""),...o.attributes.value,"aria-valuenow":a.modelValue},g)}}});const hl={setup(){return{check1:h(!0),check2:h(!1),check3:h(!1),notif1:h(!0),notif2:h(!0),notif3:h(!1),volume:h(6),brightness:h(3),mic:h(8)}}},Cl={class:"q-pa-md",style:{"max-width":"350px"}};function _l(a,s,_,o,e,S){return V(),al("div",Cl,[t(cl,{bordered:"",padding:""},{default:r(()=>[t(m,{header:""},{default:r(()=>[f("User Controls")]),_:1}),I((V(),R(y,{clickable:""},{default:r(()=>[t(v,null,{default:r(()=>[t(m,null,{default:r(()=>[f("Content filtering")]),_:1}),t(m,{caption:""},{default:r(()=>[f(" Set the content filtering level to restrict apps that can be downloaded ")]),_:1})]),_:1})]),_:1})),[[N]]),I((V(),R(y,{clickable:""},{default:r(()=>[t(v,null,{default:r(()=>[t(m,null,{default:r(()=>[f("Password")]),_:1}),t(m,{caption:""},{default:r(()=>[f(" Require password for purchase or use password to restrict purchase ")]),_:1})]),_:1})]),_:1})),[[N]]),t(ae,{spaced:""}),t(m,{header:""},{default:r(()=>[f("General")]),_:1}),I((V(),R(y,{tag:"label"},{default:r(()=>[t(v,{side:"",top:""},{default:r(()=>[t(ee,{modelValue:o.check1,"onUpdate:modelValue":s[0]||(s[0]=i=>o.check1=i)},null,8,["modelValue"])]),_:1}),t(v,null,{default:r(()=>[t(m,null,{default:r(()=>[f("Notifications")]),_:1}),t(m,{caption:""},{default:r(()=>[f(" Notify me about updates to apps or games that I downloaded ")]),_:1})]),_:1})]),_:1})),[[N]]),I((V(),R(y,{tag:"label"},{default:r(()=>[t(v,{side:"",top:""},{default:r(()=>[t(ee,{modelValue:o.check2,"onUpdate:modelValue":s[1]||(s[1]=i=>o.check2=i)},null,8,["modelValue"])]),_:1}),t(v,null,{default:r(()=>[t(m,null,{default:r(()=>[f("Sound")]),_:1}),t(m,{caption:""},{default:r(()=>[f(" Auto-update apps at anytime. Data charges may apply ")]),_:1})]),_:1})]),_:1})),[[N]]),I((V(),R(y,{tag:"label"},{default:r(()=>[t(v,{side:"",top:""},{default:r(()=>[t(ee,{modelValue:o.check3,"onUpdate:modelValue":s[2]||(s[2]=i=>o.check3=i)},null,8,["modelValue"])]),_:1}),t(v,null,{default:r(()=>[t(m,null,{default:r(()=>[f("Auto-add widgets")]),_:1}),t(m,{caption:""},{default:r(()=>[f(" Automatically add home screen widgets ")]),_:1})]),_:1})]),_:1})),[[N]]),t(ae,{spaced:""}),t(m,{header:""},{default:r(()=>[f("Notifications")]),_:1}),I((V(),R(y,{tag:"label"},{default:r(()=>[t(v,null,{default:r(()=>[t(m,null,{default:r(()=>[f("Battery too low")]),_:1})]),_:1}),t(v,{side:""},{default:r(()=>[t(te,{color:"blue",modelValue:o.notif1,"onUpdate:modelValue":s[3]||(s[3]=i=>o.notif1=i),val:"battery"},null,8,["modelValue"])]),_:1})]),_:1})),[[N]]),I((V(),R(y,{tag:"label"},{default:r(()=>[t(v,null,{default:r(()=>[t(m,null,{default:r(()=>[f("Friend request")]),_:1}),t(m,{caption:""},{default:r(()=>[f("Allow notification")]),_:1})]),_:1}),t(v,{side:"",top:""},{default:r(()=>[t(te,{color:"green",modelValue:o.notif2,"onUpdate:modelValue":s[4]||(s[4]=i=>o.notif2=i),val:"friend"},null,8,["modelValue"])]),_:1})]),_:1})),[[N]]),I((V(),R(y,{tag:"label"},{default:r(()=>[t(v,null,{default:r(()=>[t(m,null,{default:r(()=>[f("Picture uploaded")]),_:1}),t(m,{caption:""},{default:r(()=>[f("Allow notification when uploading images")]),_:1})]),_:1}),t(v,{side:"",top:""},{default:r(()=>[t(te,{color:"red",modelValue:o.notif3,"onUpdate:modelValue":s[5]||(s[5]=i=>o.notif3=i),val:"picture"},null,8,["modelValue"])]),_:1})]),_:1})),[[N]]),t(ae,{spaced:""}),t(m,{header:""},{default:r(()=>[f("Other settings")]),_:1}),t(y,null,{default:r(()=>[t(v,{side:""},{default:r(()=>[t(D,{color:"teal",name:"volume_down"})]),_:1}),t(v,null,{default:r(()=>[t(ne,{modelValue:o.volume,"onUpdate:modelValue":s[6]||(s[6]=i=>o.volume=i),min:0,max:10,label:"",color:"teal"},null,8,["modelValue"])]),_:1}),t(v,{side:""},{default:r(()=>[t(D,{color:"teal",name:"volume_up"})]),_:1})]),_:1}),t(y,null,{default:r(()=>[t(v,{side:""},{default:r(()=>[t(D,{color:"deep-orange",name:"brightness_medium"})]),_:1}),t(v,null,{default:r(()=>[t(ne,{modelValue:o.brightness,"onUpdate:modelValue":s[7]||(s[7]=i=>o.brightness=i),min:0,max:10,label:"",color:"deep-orange"},null,8,["modelValue"])]),_:1})]),_:1}),t(y,null,{default:r(()=>[t(v,{side:""},{default:r(()=>[t(D,{color:"primary",name:"mic"})]),_:1}),t(v,null,{default:r(()=>[t(ne,{modelValue:o.mic,"onUpdate:modelValue":s[8]||(s[8]=i=>o.mic=i),min:0,max:50,label:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})])}var Bl=dl(hl,[["render",_l]]);export{Bl as default};