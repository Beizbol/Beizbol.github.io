import"./hoisted.B1_uNwtp.js";class g{id;ctx;x;y;w;h;text;icon;bg;font_size;color;side;static scale=1.69;constructor(s,i,r,w,v,L,E,a){this.id=a??Math.random()*1e6,this.ctx=s,this.x=i.left,this.y=i.top,this.w=i.width,this.h=i.height,this.text=r,this.icon=new Image,this.icon.src=L,this.icon.onload=()=>{this.drawIcon()},this.bg=w,this.color=v,this.side=E??"bottom",this.font_size=16}updateIcon(s){this.icon.src=s}updateText(s){this.text=s;const i=this.ctx.measureText(s);this.w=i.width+48}move(s,i){this.x=s,this.y=i}drawTip(){const s=g.scale,i=this.x+s*this.w/2-s*24;switch(this.side){case"left":this.ctx.beginPath(),this.ctx.moveTo(i-s*40,this.y-s*10),this.ctx.lineTo(i-s*60,this.y),this.ctx.lineTo(i-s*40,this.y+s*10),this.ctx.closePath(),this.ctx.fill();break;case"right":this.ctx.beginPath(),this.ctx.moveTo(i+s*40,this.y-s*10),this.ctx.lineTo(i+s*60,this.y),this.ctx.lineTo(i+s*40,this.y+s*10),this.ctx.closePath(),this.ctx.fill();break;case"top":this.ctx.beginPath(),this.ctx.moveTo(i-s*10,this.y-s*5),this.ctx.lineTo(i,this.y-s*25),this.ctx.lineTo(i+s*10,this.y-s*5),this.ctx.closePath(),this.ctx.fill();break;default:this.ctx.beginPath(),this.ctx.moveTo(i-s*10,this.y+s*5),this.ctx.lineTo(i,this.y+s*25),this.ctx.lineTo(i+s*10,this.y+s*5),this.ctx.closePath(),this.ctx.fill();break}}drawBody(){const s=g.scale;this.ctx.beginPath(),this.ctx.roundRect(this.x-s*24,this.y-s*this.h/2,s*this.w,s*this.h,s*5),this.ctx.closePath(),this.ctx.fill()}drawIcon(){this.color&&(this.ctx.filter="invert(1)");const s=g.scale;this.ctx.drawImage(this.icon,this.x-s*20,this.y-s*12,s*24,s*24),this.ctx.filter="none"}drawPin(){this.ctx.fillStyle=this.bg,this.drawTip(),this.drawBody(),this.ctx.fillStyle=this.color,this.drawIcon();const s=g.scale,i=this.font_size*s;this.ctx.font=`${i}px sans-serif`,this.ctx.fillText(this.text,this.x+s*8,this.y+s*6)}isMouseOver(s,i){const r=g.scale;return s>this.x-r*30&&s<this.x-r*16+r*this.w&&i>this.y-r*20&&i<this.y+r*this.h}twin(s){return new g(s,{left:this.x,top:this.y,width:this.w,height:this.h},this.text,this.bg,this.color,this.icon.src,this.side)}clone(){return new g(this.ctx,{left:this.x,top:this.y,width:this.w,height:this.h},this.text,this.bg,this.color,this.icon.src,this.side,this.id)}}function q(){const I=document.getElementById("hi-menu");I.addEventListener("close",()=>{console.log("hi dialog closed")}),s();function s(){const t=localStorage.getItem("show-hi");t&&t==="never"?console.log("show-hi:",t):I.showModal()}const i=document.getElementById("again");i.addEventListener("change",t=>{const n=i.checked?"never":"yes";localStorage.setItem("show-hi",n)});const r=document.getElementById("open-menu");r.addEventListener("close",()=>{console.log("help dialog closed")});const w=document.getElementById("help-menu");w.addEventListener("close",()=>{console.log("help dialog closed")});const v=document.getElementById("save-menu");v.addEventListener("close",()=>{console.log("save dialog closed:",v.returnValue),v.returnValue==="save"&&B()}),document.getElementById("btnEsc").addEventListener("click",()=>{v.close()});const E=document.getElementById("btnStart");E.addEventListener("click",()=>{console.log("start clicked"),e.placed=[],e.held=null,_(),h()});const a=document.getElementById("pcanvas"),x=a.getContext("2d"),l=document.getElementById("canvas"),f=l.getContext("2d");document.onkeyup=t=>{t.ctrlKey&&t.key==="s"&&B()};const j=document.getElementById("open");j.onclick=()=>{r.showModal()};function B(){const t=document.createElement("a");t.download=O,t.href=l.toDataURL("image/jpeg",1),t.click()}const b=document.getElementById("review"),k=document.getElementById("save");k.onclick=()=>{b.style.width=l.width+"px",b.style.aspectRatio=l.width/l.height+"",v.showModal(),setTimeout(()=>{b.style.backgroundImage="none",b.src=l.toDataURL("image/jpeg",1)},1)};const D=document.getElementById("help");D.onclick=()=>{w.showModal()};const U=document.getElementById("pick"),y=new Image;let p=new g(x,{top:40,left:60,width:100,height:30},"Pin Text","#7711BB","#FFFFFF","/assets/pins/outlined/dot.svg");function d(){x.clearRect(0,0,x.canvas.width,x.canvas.height),p.drawPin()}const T=new Image;T.src="/assets/pins/outlined/dot.svg",T.onload=()=>{console.log("icon loaded"),d()};const R=document.getElementById("sides"),C=document.getElementById("icons"),P=document.getElementById("pinColor"),M=document.getElementById("txtColor"),z=document.getElementById("pinText"),e={placed:[],held:null,edit_pin:null,canvas_hover:!1,pcanvas_hover:!1,edit_hover:!1,pin_offset_x:0,pin_offset_y:0,scaleImg:!1};l.addEventListener("mouseenter",t=>{e.canvas_hover=!0,e.held&&(p.move(60,40),e.held=e.held.twin(f),d())}),a.addEventListener("mouseenter",t=>{e.pcanvas_hover=!0}),l.addEventListener("mouseleave",t=>{e.canvas_hover=!1,e.held&&(e.held=null,h())}),a.addEventListener("mouseleave",t=>{e.pcanvas_hover=!1}),document.addEventListener("mousemove",t=>{if(e.held){if(e.canvas_hover){const n=l.getBoundingClientRect(),c=t.clientX-n.left,o=t.clientY-n.top;e.held.move(c,o),h()}if(e.pcanvas_hover){const n=a.getBoundingClientRect(),c=t.clientX-n.left,o=t.clientY-n.top;e.held.move(c,o),d()}}}),l.addEventListener("mousedown",t=>{if(!e.canvas_hover)return;const n=l.getBoundingClientRect(),c=t.clientX-n.left,o=t.clientY-n.top;for(let u=0;u<e.placed.length;u++){const S=e.placed[u];if(S.isMouseOver(c,o)){l.style.cursor="grabbing",e.held=S,e.placed.splice(u,1),_();return}}}),a.addEventListener("mousedown",t=>{const n=a.getBoundingClientRect(),c=t.clientX-n.left,o=t.clientY-n.top;p.isMouseOver(c,o)&&(a.style.cursor="grabbing",e.held=p,_())});function V(){if(!e.held)return;const t=a.getBoundingClientRect(),n=e.held.x,c=e.held.y+t.top;F(n,c);const o=e.held.clone();e.placed.push(o),X(o),e.held=null,h()}function X(t){e.edit_pin=t,R.value=t.side;const n=t.icon.src.indexOf("/assets");if(n<0){console.log("no assets");return}const c=t.icon.src.slice(n);C.value=c,P.value=t.bg,M.value=t.color,z.value=t.text}const m=document.getElementById("edit");m.addEventListener("mouseenter",t=>{e.edit_hover=!0}),m.addEventListener("mouseleave",t=>{e.edit_hover=!1});function F(t,n){m.style.top=n+"px",m.style.left=t+"px",m.classList.add("show")}function _(){m.classList.contains("show")&&(m.classList.remove("show"),e.edit_pin=null)}document.addEventListener("mouseup",t=>{if(l.style.cursor="grab",a.style.cursor="grab",!e.held){e.edit_hover||_();return}if(e.canvas_hover)V();else if(e.pcanvas_hover){e.held=null,p.move(60,40);const n=a.getBoundingClientRect(),c=p.x+n.left,o=p.y+n.top;e.edit_pin=p,F(c,o),d()}e.pin_offset_x=0,e.pin_offset_y=0}),R.addEventListener("change",t=>{if(!e.edit_pin)return;const n=t.target;e.edit_pin.side=n.value,d(),h()}),C.addEventListener("change",t=>{if(!e.edit_pin)return;const n=t.target;e.edit_pin.updateIcon(n.value),d(),h()}),P.addEventListener("change",t=>{if(!e.edit_pin)return;const n=t.target;e.edit_pin.bg=n.value,d(),h()}),M.addEventListener("change",t=>{if(!e.edit_pin)return;const n=t.target;e.edit_pin.color=n.value,d(),h()}),z.addEventListener("change",t=>{if(!e.edit_pin)return;const n=t.target;e.edit_pin.updateText(n.value),d(),h()}),document.getElementById("sizes").addEventListener("change",t=>{const n=t.target;g.scale=parseFloat(n.value),d(),h()});let O="";U.addEventListener("change",t=>{const n=t.target;if(!n.files||n.files.length<1){alert("No image files selected.");return}if(n.files.length>1){alert("One image file at a time.");return}const c=n.files[0],o=URL.createObjectURL(c);y.src=o,y.onload=()=>{O=c.name.slice(0,-3)+"jpg",k.disabled=!1,window.addEventListener("beforeunload",u=>{u.preventDefault(),u.returnValue=!0}),window.addEventListener("astro:before-preparation",u=>{u.preventDefault(),u.returnValue=!0}),Y(y),d(),h(),E.disabled=!1}});function Y(t){const{width:n,height:c}=t;let o=1;n<600&&(o=600/n),f.canvas.width=o*n,f.canvas.height=o*c,x.canvas.width=o*n,a.style.width=o*n+"px",l.style.width=o*n+"px",l.style.height=o*c+"px"}function h(){f.clearRect(0,0,l.width,l.height),y.src&&f.drawImage(y,0,0,f.canvas.width,f.canvas.height);for(let t=0;t<e.placed.length;t++)e.placed[t].drawPin();e.held&&e.held.drawPin()}}document.addEventListener("astro:page-load",q);