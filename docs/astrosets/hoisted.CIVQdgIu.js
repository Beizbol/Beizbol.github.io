import"./hoisted.B1_uNwtp.js";const t=document.getElementById("book"),l=document.getElementById("play"),c=window.AudioContext||window.webkitAudioContext;new c;let i;t.addEventListener("change",async()=>{if(!t.files)return;const n=t.files[0],e=await n.slice(0,127).arrayBuffer();for(let o=0;o<e.byteLength;o++)console.log(e[o]);console.log(e),i=new Audio(URL.createObjectURL(n)),console.log("Picked")});l.addEventListener("click",()=>{i.play(),console.log("Playing")});