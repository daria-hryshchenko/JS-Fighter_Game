var D=Object.defineProperty;var q=(e,t,n)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var E=(e,t,n)=>(q(e,typeof t!="symbol"?t+"":t,n),n),j=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)};var P=(e,t,n)=>(j(e,t,"read from private field"),n?n.call(e):t.get(e)),F=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)};(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function s({tagName:e,className:t,attributes:n={}}){const a=document.createElement(e);if(t){const i=t.split(" ").filter(Boolean);a.classList.add(...i)}return Object.keys(n).forEach(i=>a.setAttribute(i,n[i])),a}function I(e,t){const a=s({tagName:"div",className:`fighter-preview___root ${t==="right"?"fighter-preview___right":"fighter-preview___left"}`});return e&&(a.appendChild(B(e)),a.appendChild(x(e))),a}function B(e){const{source:t,name:n}=e;return s({tagName:"img",className:"fighter-preview___img",attributes:{src:t,title:n,alt:n}})}function x(e){const t=s({tagName:"div",className:"fighter-preview___description"});return t.innerHTML=`
    <h1>${e.name}</h1>
    <span>Health: ❤️${e.health}HP</span></br>
    <span>Attack: 🗡️${e.attack}</span></br>
    <defence>Defence: 🛡️${e.defense}</defence></br>
  `,t}const l={PlayerOneAttack:"KeyA",PlayerOneBlock:"KeyD",PlayerTwoAttack:"KeyJ",PlayerTwoBlock:"KeyL",PlayerOneCriticalHitCombination:["KeyQ","KeyW","KeyE"],PlayerTwoCriticalHitCombination:["KeyU","KeyI","KeyO"]};async function R(e,t){return new Promise(n=>{const a=document.querySelector("#left-fighter-indicator"),i=document.querySelector("#right-fighter-indicator"),r={...e},o={...t};r.currenthealth=e.health,o.currenthealth=t.health,r.isCriticalActive=!0,o.isCriticalActive=!0;const p=(c,d,_,C,k)=>{const g=d,b=C;if(!c.isBlock&&!d.isBlock||k){g.currenthealth-=_(c,d);const m=d.currenthealth/d.health;b.style.width=d.currenthealth>=0?`${m*100}%`:"0%",m<.55&&(b.style.backgroundColor="yellow"),m<.25&&(b.style.backgroundColor="red")}g.currenthealth<=0&&n(c)},y=(c,d)=>d.every(_=>c.includes(_)),h=(c,d,_,C,k,g,b)=>{const m=c,N=d;m.pressedCombo||(m.pressedCombo=new Set),m.pressedCombo.has(g)?m.pressedCombo.delete(g):m.pressedCombo.add(g);const{isCriticalActive:K,isBlock:M}=N;y(Array.from(N.pressedCombo),b)&&K&&!M&&(C(N,_,W,k,!0),N.isCriticalActive=!1,setTimeout(()=>{N.isCriticalActive=!0},1e4))};document.addEventListener("keydown",c=>{switch(c.code){case l.PlayerOneBlock:r.isBlock=!0,u("left",r);break;case l.PlayerTwoBlock:o.isBlock=!0,u("right",o);break;default:l.PlayerOneCriticalHitCombination.includes(c.code)&&h(r,o,p,u,i,c.code,l.PlayerOneCriticalHitCombination),l.PlayerTwoCriticalHitCombination.includes(c.code)&&h(o,r,p,u,a,c.code,l.PlayerTwoCriticalHitCombination);break}}),document.addEventListener("keyup",c=>{switch(c.code){case l.PlayerOneAttack:p(r,o,A,i);break;case l.PlayerOneBlock:r.isBlock=!1,u("left",r);break;case l.PlayerTwoAttack:p(o,r,A,a);break;case l.PlayerTwoBlock:o.isBlock=!1,u("right",o);break;default:l.PlayerOneCriticalHitCombination.includes(c.code)&&h(r,c.code),l.PlayerTwoCriticalHitCombination.includes(c.code)&&h(o,c.code);break}})})}function L(e,t){return Math.random()*(t-e)+e}function A(e,t){const n=G(e)-J(t);return n>0?n:0}function G(e){const{attack:t}=e,n=L(1,2);return t*n}function J(e){const{defense:t}=e,n=L(1,2);return t*n}function W(e){const{attack:t}=e;return t*2}const u=(e,t)=>{const n=document.getElementById(`${e}-shield`),{isBlock:a}=t;a===!0&&(n.style.visibility="visible"),a===!1&&(n.style.visibility="hidden")};function U(){return document.getElementById("root")}function Y(){const e=document.getElementsByClassName("modal-layer")[0];e==null||e.remove()}function Z(e,t){const n=s({tagName:"div",className:"modal-header"}),a=s({tagName:"span"}),i=s({tagName:"div",className:"close-btn"});a.innerText=e,i.innerText="×";const r=()=>{Y(),t()};return i.addEventListener("click",r),n.append(a,i),n}function Q({title:e,bodyElement:t,onClose:n}){const a=s({tagName:"div",className:"modal-layer"}),i=s({tagName:"div",className:"modal-root"}),r=Z(e,n);return i.append(r,t),a.append(i),a}function V({title:e,bodyElement:t,onClose:n=()=>{}}){const a=U(),i=Q({title:e,bodyElement:t,onClose:n});a.append(i)}function z(e){const t=B(e),n={title:`${e.name.toUpperCase()} WON 🏆`,bodyElement:t,onClose:()=>document.location.reload()};V(n)}function H(e,t){const n=B(e),i=s({tagName:"div",className:`arena___fighter ${t==="right"?"arena___right-fighter":"arena___left-fighter"}`});return i.append(n),i}function X(e,t){const n=s({tagName:"div",className:"arena___battlefield"}),a=H(e,"left"),i=H(t,"right");return n.append(a,i),n}function T(e,t){const{name:n}=e,a=s({tagName:"div",className:"arena___fighter-indicator"}),i=s({tagName:"span",className:"arena___fighter-name"}),r=s({tagName:"div",className:"arena___health-indicator"}),o=s({tagName:"div",className:"arena___health-bar",attributes:{id:`${t}-fighter-indicator`}});return i.innerText=n,r.append(o),a.append(i,r),a}function ee(e,t){const n=s({tagName:"div",className:"arena___fight-status"}),a=s({tagName:"div",className:"arena___versus-sign"}),i=T(e,"left"),r=T(t,"right");return n.append(i,a,r),n}function te(e){const t=s({tagName:"div",className:"arena___root"}),n=ee(...e),a=X(...e),i=ie(...e);return t.append(n,a,i),t}function ne(e){const t=document.getElementById("root"),n=te(e);t.innerHTML="",t.append(n),R(...e).then(a=>{z(a)})}function ie(e,t){const n=s({tagName:"div",className:"arena___shields-container"}),a=O(e,"left"),i=O(t,"right");return n.append(a,i),n}function O(e,t){const n=ae(),i=s({tagName:"div",className:`${t==="right"?"right-shield":"left-shield"}`,attributes:{id:`${t}-shield`}});return i.append(n),console.log(i),i}function ae(){return s({tagName:"img",className:"shield-img",attributes:{src:"./../../../resources/shield-model.png",alt:"shield"}})}const re="/JS-Fighter_Game/assets/versus-768a076e.png",se=[{_id:"1",name:"Ryu",source:"https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif"},{_id:"2",name:"Dhalsim",source:"https://i.pinimg.com/originals/c0/53/f2/c053f2bce4d2375fee8741acfb35d44d.gif"},{_id:"3",name:"Guile",source:"https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif"},{_id:"4",name:"Zangief",source:"https://media1.giphy.com/media/nlbIvY9K0jfAA/source.gif"},{_id:"5",name:"Ken",source:"https://i.pinimg.com/originals/46/4b/36/464b36a7aecd988e3c51e56a823dbedc.gif"},{_id:"6",name:"Bison",source:"http://www.fightersgeneration.com/np5/char/ssf2hd/bison-hdstance.gif"}],oe=[{_id:"1",name:"Ryu",health:45,attack:4,defense:3,source:"https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif"},{_id:"2",name:"Dhalsim",health:60,attack:3,defense:1,source:"https://i.pinimg.com/originals/c0/53/f2/c053f2bce4d2375fee8741acfb35d44d.gif"},{_id:"3",name:"Guile",health:45,attack:4,defense:3,source:"https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif"},{_id:"4",name:"Zangief",health:60,attack:4,defense:1,source:"https://media1.giphy.com/media/nlbIvY9K0jfAA/source.gif"},{_id:"5",name:"Ken",health:45,attack:3,defense:4,source:"https://i.pinimg.com/originals/46/4b/36/464b36a7aecd988e3c51e56a823dbedc.gif"},{_id:"6",name:"Bison",health:45,attack:5,defense:4,source:"http://www.fightersgeneration.com/np5/char/ssf2hd/bison-hdstance.gif"}];function ce(e){const t=e.lastIndexOf("/"),n=e.lastIndexOf(".json"),a=e.substring(t+1,n);return oe.find(i=>i._id===a)}async function le(e){const t=e==="fighters.json"?se:ce(e);return new Promise((n,a)=>{setTimeout(()=>t?n(t):a(Error("Failed to load")),500)})}async function S(e,t="GET"){return le(e)}var w;class de{constructor(){F(this,w,"fighters.json")}async getFighters(){try{return await S(P(this,w))}catch(t){throw t}}async getFighterDetails(t){try{return await S(`details/fighter/${t}.json`)}catch(n){throw n}}}w=new WeakMap;const $=new de,me=new Map;async function he(e){const t=await $.getFighterDetails(e);return me.set(e,t),t}function ge(e){ne(e)}function ue(e){const t=e.filter(Boolean).length===2,n=()=>ge(e),a=s({tagName:"div",className:"preview-container___versus-block"}),i=s({tagName:"img",className:"preview-container___versus-img",attributes:{src:re}}),o=s({tagName:"button",className:`preview-container___fight-btn ${t?"":"disabled"}`});return o.addEventListener("click",n,!1),o.innerText="Fight",a.append(i,o),a}function fe(e){const t=document.querySelector(".preview-container___root"),[n,a]=e,i=I(n,"left"),r=I(a,"right"),o=ue(e);t.innerHTML="",t.append(i,o,r)}function pe(){const e=[];return async(t,n)=>{const a=await he(n),[i,r]=e;(i??a)!==(i?r??a:r)&&e.push(a);const y=[];e.slice(-2).filter(h=>{y.some(c=>c._id===h._id)||y.push(h)}),fe(y)}}function ye(e){const{source:t,name:n}=e;return s({tagName:"img",className:"fighter___fighter-image",attributes:{src:t,title:n,alt:n}})}function _e(e,t){const n=s({tagName:"div",className:"fighters___fighter"}),a=ye(e),i=r=>t(r,e._id);return n.append(a),n.addEventListener("click",i,!1),n}function be(e){const t=pe(),n=s({tagName:"div",className:"fighters___root"}),a=s({tagName:"div",className:"preview-container___root"}),i=s({tagName:"div",className:"fighters___list"}),r=e.map(o=>_e(o,t));return i.append(...r),n.append(a,i),n}const f=class{static async startApp(){try{f.loadingElement.style.visibility="visible";const t=await $.getFighters(),n=be(t);f.rootElement.appendChild(n)}catch(t){console.warn(t),f.rootElement.innerText="Failed to load data"}finally{f.loadingElement.style.visibility="hidden"}}};let v=f;E(v,"rootElement",document.getElementById("root")),E(v,"loadingElement",document.getElementById("loading-overlay"));v.startApp();
