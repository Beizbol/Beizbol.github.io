import{c as R}from"./confetti.module.aNA1zn9t.js";import"./hoisted.CmKvcf_A.js";function S(){function f(){c.classList.contains("tilted")?c.classList.remove("tilted"):c.classList.add("tilted")}function L(){if(p.checked){document.querySelectorAll(".slot").forEach(t=>{t.classList.add("backface-on")}),c.style.animation="tiltin 2s 1",setTimeout(f,2e3);return}c.style.animation="tiltout 2s 1",setTimeout(()=>{f(),document.querySelectorAll(".slot").forEach(t=>{t.classList.contains("backface-on")&&t.classList.remove("backface-on")})},1900)}const y=document.querySelector("dialog"),c=document.getElementById("rotate"),p=document.getElementById("xray");p.addEventListener("click",L);const d=document.getElementById("spin");d.addEventListener("click",P);const u=12,h=document.getElementById("ring1"),b=document.getElementById("ring2"),E=document.getElementById("ring3"),I=document.getElementById("ring4"),w=document.getElementById("ring5");function i(t){const e=t.querySelectorAll(".slot");for(var s=0;s<u;s++)e[s].classList.add("pos-"+s)}function v(t){for(let e=0;e<13;e++){const s="spin-"+e;t.classList.contains(s)&&t.classList.remove(s)}}function q(t){let e=1,s=1;t.length-1;let o=t[0];const n=Math.floor(u/2);for(let l=1;l<t.length;l++){const r=t[l];r%n===o%n?s+=1:s=1,e=Math.max(e,s),o=r}return e}function A(t){switch(q(t)){case 5:return console.log("5 in a row"),500;case 4:return console.log("4 in a row"),250;case 3:return console.log("3 in a row"),100;case 2:return console.log("2 in a row"),20;default:return console.log("L"),0}}function B(t=5){const e=[];for(let s=0;s<t;s++){const o=Math.floor(Math.random()*u);e.push(o)}return e}function T(t,e=1){for(;;){const s=B(t),o=A(s),n={seeds:s,score:o};if(e<.3){if(o>40)return n}else if(e<.5){if(o>0)return n}else return n}}function x(t,e){t.querySelectorAll(".slot")[e].classList.add("win")}function M(t){const e=t.querySelectorAll(".slot");for(let s=0;s<e.length;s++){const o=e[s];o.classList.contains("win")&&o.classList.remove("win")}}const g=document.querySelector("[data-alert]");function _(t,e=5e3){g.textContent=t,g.classList.remove("hide"),e!=null&&setTimeout(()=>{g.classList.add("hide")},e)}function k(t){_(`Winner! +${t}`,2500),t>200&&R()}function P(){const t=document.querySelector(".bet.placed"),e=parseInt(t.innerHTML);if(e>a){y.showModal();return}document.querySelectorAll(".bets .bet").forEach(n=>{n.disabled=!0}),d.disabled=!0,m(-e);const s=document.querySelectorAll(".ring"),o=T(s.length);for(let n=0;n<s.length;n++){const l=s[n],r=o.seeds[n];v(l),M(l),l.classList.add("spin"),setTimeout(()=>{l.classList.remove("spin"),l.classList.add("spin-"+r),x(l,r)},3e3+n*250)}setTimeout(()=>{if(o.score>0){const n=o.score*Math.floor(e/50);console.log("win",n),m(n),k(n)}document.querySelectorAll(".bets .bet").forEach(n=>{n.disabled=!1}),d.disabled=!1},4500)}function W(){let t=parseInt(localStorage.getItem("slots-pts")||"2500");const e=parseInt(localStorage.getItem("game-wins")||"0"),s=parseInt(localStorage.getItem("prev-wins")||"0");return t+=(e-s)*2500,localStorage.setItem("slots-pts",t.toString()),localStorage.setItem("prev-wins",e.toString()),t}function j(){const t=document.querySelectorAll(".bet");for(let e=0;e<t.length;e++){const s=t[e];s.classList.contains("placed")&&s.classList.remove("placed")}}function H(){const t=document.querySelectorAll(".bet");t[0].classList.add("placed");for(let e=0;e<t.length;e++){const s=t[e];s.addEventListener("click",()=>{j(),s.classList.add("placed")})}}function m(t){a+=t;const e=document.getElementById("score");e.innerHTML=a.toString(),localStorage.setItem("slots-pts",a.toString())}i(h),i(b),i(E),i(I),i(w),H();let a=0;m(W())}S();document.addEventListener("astro:after-swap",()=>{console.log("astro page load"),S()});