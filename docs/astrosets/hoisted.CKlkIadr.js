import{c as d}from"./confetti.module.aNA1zn9t.js";import"./hoisted.CmKvcf_A.js";const a=()=>{const r=[...document.querySelectorAll(".tile")];o();function o(){r.forEach((t,e)=>{t.dataset.letter="",t.innerText="",t.onclick=()=>{c(e)}})}function c(t){if(r[t].dataset.letter!=="")return;if(i(r[t],"X"),u()){l();return}const e=[...document.querySelectorAll('[data-letter=""]')];if(e.length===0){s();return}const n=e[Math.floor(Math.random()*e.length)];if(i(n,"O"),u()){f();return}}function i(t,e){t.dataset.letter=e,t.textContent=e}function u(){const t=r.flatMap(e=>e.textContent);for(let e=0;e<3;e++){const n=3*e;if(t[n]!==""&&t[n]===t[n+1]&&t[n]===t[n+2]||t[e]!==""&&t[e]===t[e+3]&&t[e]===t[e+6])return!0}return t[4]!=""&&(t[0]===t[4]&&t[4]===t[8]||t[2]===t[4]&&t[4]===t[6])}function l(){d().then(o)}function f(){setTimeout(()=>{alert("You lose. Better luck next time."),o()},50)}function s(){setTimeout(()=>{alert("It's a draw. Try again."),o()},50)}};a();document.addEventListener("astro:after-swap",a);