import"./hoisted.CmKvcf_A.js";const B=document.getElementById("resume");B.addEventListener("click",q);const I=document.documentElement,b=document.getElementById("btnGo");b.addEventListener("click",x);const o=document.getElementById("player"),m=document.getElementById("obstacle"),d=document.getElementById("hole"),r=document.getElementById("car"),p=document.getElementById("game");p.addEventListener("mousedown",y);p.addEventListener("mouseup",j);document.addEventListener("keydown",y);document.addEventListener("keyup",j);let u=!1,f=0,L=0,g=0,n=0;const k=localStorage.getItem("best")||"0";let l=+k;l||(l=0);function y(e){if(u){console.log("spaused");return}o.classList.contains("squat")||o.classList.contains("jump")||o.classList.contains("fall")||e.key!==" "&&e.key!=="ArrowUp"&&e.key!=="w"&&e.button!==0||(L=performance.now(),o.classList.add("squat"),console.log("squat"))}function j(e){if(u){console.log("jpaused");return}if(o.classList.contains("jump")||o.classList.contains("fall")||!o.classList.contains("squat")){console.log("already jumping");return}if(e.key!==" "&&e.key!=="ArrowUp"&&e.key!=="w"&&e.button!==0)return;const t=performance.now();console.log(`t: ${t}, start: ${g}`);const s=w(t);v(s);const c=T(t);if(c===null){console.log("forgiven");return}E(c),f=_(t),g=t}function v(e){I.style.setProperty("--jump-y",e+"rem"),o.classList.remove("squat"),o.classList.add("jump"),setTimeout(()=>{o.classList.remove("jump"),o.classList.add("fall"),setTimeout(()=>{o.classList.remove("fall")},400)},600)}function w(e){const t=e-L;let s=Math.min(t,1800)/50;return s=Math.min(s,16),s=Math.max(s,10),-s}function T(e){const t=document.getElementById("floor"),s=e-f,c=document.getElementById("dt");if(c&&(c.innerText=`dt: ${s}`),s<-500)return null;const i=105<s&&s<365;return i?(t.classList.add("good"),setTimeout(()=>{t.classList.remove("good")},400)):n>0&&(t.classList.add("fail"),setTimeout(()=>{t.classList.remove("fail")},400)),i}function E(e){const t=document.getElementById("jumps"),s=document.getElementById("best");e?n+=1:n=0,t.innerText=`Score: ${n}`,n>l&&(l=n,localStorage.setItem("best",l.toString())),s.innerText=`Best: ${l}`}function _(e){let t=Math.random()*2e3+2e3;return console.log(`next jump in ${t}ms`),setTimeout(()=>{m.classList.add("jump"),d.classList.add("jump"),r.classList.add("jump")},t),setTimeout(()=>{m.classList.remove("jump"),d.classList.remove("jump"),r.classList.remove("jump")},t+1e3),e+t}E(!1);const h=document.getElementById("pauseDialog"),a=document.getElementsByClassName("bg");function x(){u=!0;for(let e=0;e<a.length;e++)a[e].classList.add("paused");h.showModal()}function q(){h.close();for(let e=0;e<a.length;e++)a[e].classList.remove("paused");u=!1}