import"./hoisted.B1_uNwtp.js";function l(){const t=document.documentElement,e=document.documentElement;let o=0;function n(){o!==t.scrollTop&&(o=t.scrollTop,e.style.setProperty("--scrollPos",o+"px")),window.requestAnimationFrame(n)}window.requestAnimationFrame(n)}document.addEventListener("astro:page-load",l);