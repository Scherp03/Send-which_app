import{a6 as n,y as a}from"./index.d75b9d65.js";import{g as d,c as i}from"./QDialog.c6ea9b2d.js";function s(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const t=parseInt(e,10);return isNaN(t)?0:t}var u=n({name:"close-popup",beforeMount(e,{value:t}){const o={depth:s(t),handler(r){o.depth!==0&&setTimeout(()=>{const p=d(e);p!==void 0&&i(p,r,o.depth)})},handlerKey(r){a(r,13)===!0&&o.handler(r)}};e.__qclosepopup=o,e.addEventListener("click",o.handler),e.addEventListener("keyup",o.handlerKey)},updated(e,{value:t,oldValue:o}){t!==o&&(e.__qclosepopup.depth=s(t))},beforeUnmount(e){const t=e.__qclosepopup;e.removeEventListener("click",t.handler),e.removeEventListener("keyup",t.handlerKey),delete e.__qclosepopup}}),_="/assets/Send-WhichLogo.ae4d353a.svg";export{u as C,_};
