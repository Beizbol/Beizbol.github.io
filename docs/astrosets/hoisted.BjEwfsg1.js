import"./hoisted.B1_uNwtp.js";function g(){const n=document.getElementById("canvas"),t=n.getContext("2d"),r=document.getElementById("plane"),o="NAVCANADA".split("");let c=0;const l=t.createLinearGradient(0,0,0,n.height);l.addColorStop(0,"deepskyblue"),l.addColorStop(1,"lightskyblue");const d=[1,1,1,2,2,3,3,4,4,5,5],h=[0,-1,1,-2,2,-3,3,-4,4,-5,5];function f(e,a){return 125+25*Math.sin(c*(1/e))*a}function i(){t.clearRect(0,0,n.width,n.height),c+=.01,t.fillStyle=l,t.fillRect(0,0,n.width,n.height);for(let e=0;e<o.length;e++){t.fillStyle="black",t.font="30px Arial";const a=24+e*64,s=f(d[e],h[e]);t.fillText(o[e],a,s),t.translate(38,38),t.rotate(Math.PI),t.translate(-38,-38),t.drawImage(r,27-a,-s),t.resetTransform()}requestAnimationFrame(i)}i()}document.addEventListener("astro:page-load",g);