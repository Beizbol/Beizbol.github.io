import{c as M}from"./confetti.module.249a7e39.js";import"./hoisted.3bf6e513.js";const E=5,L=500,b=500,_=document.querySelector("[data-keyboard]"),m=document.querySelector("[data-alert]"),y=document.querySelector("[data-guess-grid]"),j=Date.now()-Date.UTC(new Date().getFullYear(),0,1),O=Math.floor(j/1e3/60/60/24),r=targetWords[O];U();p();function U(){const t=new Date,e=[t.getDate(),t.getMonth(),t.getFullYear()].join(" ");if(localStorage.getItem("date")!=e)return;const n=[...l("*")],u=localStorage.getItem("tiles").split(" ");let c=[];u.forEach((i,a,f)=>{if(n[a].dataset.letter=i,n[a].textContent=i.toUpperCase(),n[a].dataset.state="active",(a+1)%5==0){const h=f.slice(a-4,a+1).join("");c.push(h)}}),c.forEach((i,a)=>{const f=q(i);n.slice(5*a,5*a+5).forEach((N,T)=>C(N,f[T],T*L/2))}),setTimeout(()=>S(c[c.length-1]),1500)}function k(){const t=[...l('[data-state="active"]')];if(t.length!==E){d("Not enough letters"),v(t);return}const e=t.reduce((n,o)=>n+o.dataset.letter,"");if(!e)return;if(!dictionary.includes(e)){d("Not in word list"),v(t);return}g(),G();const s=q(e);t.forEach((n,o)=>{C(n,s[o],o*L/2)}),S(e)}function l(t){return[...y.querySelectorAll(t)].filter(n=>n instanceof HTMLElement).map(n=>n)}function F(t){const e=y.querySelector(t);return e instanceof HTMLElement?e:null}function p(){console.log("start"),console.log(r),document.querySelector("button.del").addEventListener("click",w),document.addEventListener("click",D),document.addEventListener("keydown",I)}function g(){console.log("stop"),document.removeEventListener("click",D),document.removeEventListener("keydown",I)}function D(t){if(t.target.matches("[data-key]")){A(t.target.dataset.key);return}if(t.target.matches("[data-enter]")){k();return}}function A(t){if(l('[data-state="active"]').length>=E)return;const s=F(":not([data-letter])");s.dataset.letter=t.toLowerCase(),s.textContent=t,s.dataset.state="active"}function w(){const t=l('[data-state="active"]');console.log(t);const e=t[t.length-1];if(console.log(e),e==null){console.log("no last tile");return}e.textContent="",delete e.dataset.state,delete e.dataset.letter}function I(t){if(t.key==="Enter"){k();return}if(t.key==="Backspace"||t.key==="Delete"){w();return}if(t.key.match(/^[a-z]$/)){A(t.key);return}}function G(){const s=[...l("[data-letter]")].map((u,c,i)=>u.dataset.letter).join(" ");localStorage.setItem("tiles",s);const n=new Date,o=[n.getDate(),n.getMonth(),n.getFullYear()].join(" ");localStorage.setItem("date",o)}function S(t){if(t===r){d("You Win",5e3),W(),M(),g();return}y.querySelectorAll(":not([data-letter])").length===0&&(d(r.toUpperCase(),null),g()),p()}function q(t){if(t===r)return Array(5).fill("correct");let e=Array(5).fill("wrong-location"),s=r.split("");for(let n=0;n<t.length;n++)r.charAt(n)===t.charAt(n)?(e[n]="correct",s[n]=""):(!s.includes(t[n])||t.substring(n).includes(t[n]))&&(e[n]="wrong");return e}function C(t,e,s){const n=t.dataset.letter,o=_.querySelector(`[data-key="${n}"i]`);setTimeout(()=>{t.classList.add("flip")},s),t.addEventListener("transitionend",()=>{t.classList.remove("flip"),o.classList.add(e),t.dataset.state=e},{once:!0})}function d(t,e=5e3){m.textContent=t,m.classList.remove("hide"),e!=null&&setTimeout(()=>{m.classList.add("hide")},e)}function v(t){t.forEach(e=>{e.classList.add("shake"),e.addEventListener("animationend",()=>{e.classList.remove("shake")},{once:!0})})}function W(){l("*").forEach((e,s)=>{setTimeout(()=>{e.classList.add("dance"),e.addEventListener("animationend",()=>{e.classList.remove("dance")},{once:!0})},s*b/5)})}