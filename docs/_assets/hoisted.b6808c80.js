import"./hoisted.d5332371.js";class s{id;x;y;w;h;text;icon;bg;font;color;constructor(t,i,l,d,c,r){this.id=r??Math.random()*1e3,this.x=t.left,this.y=t.top,this.w=t.width,this.h=t.height,this.text=i,this.icon=new Image,this.icon.src=c,this.bg=l,this.color=d,this.font="16px sans-serif"}updateIcon(t){this.icon.src=t}updateText(t){this.text=t,this.w=t.length*8+50}move(t,i){this.x=t,this.y=i}drawPin(t){t.fillStyle=this.bg,t.fillRect(this.x-24,this.y-this.h/2,this.w,this.h),t.beginPath();const i=this.x+this.w/2-24;t.moveTo(i-10,this.y+5),t.lineTo(i,this.y+25),t.lineTo(i+10,this.y+5),t.closePath(),t.fill(),t.drawImage(this.icon,this.x-20,this.y-12,24,24),t.fillStyle=this.color,t.font=this.font,t.fillText(this.text,this.x+8,this.y+6)}isMouseOver(t,i){return t>this.x-36&&t<this.x-12+this.w&&i>this.y-20&&i<this.y+this.h}twin(){return new s({left:this.x,top:this.y,width:this.w,height:this.h},this.text,this.bg,this.color,this.icon.src)}clone(){return new s({left:this.x,top:this.y,width:this.w,height:this.h},this.text,this.bg,this.color,this.icon.src,this.id)}}console.log("Pin Script Start");console.log("Pin imported");const a=document.getElementById("pcanvas"),e=a.getContext("2d");let o=null;const n=document.getElementById("icon-img");n.onload=()=>{console.log("icon loaded"),h()};document.getElementById("icons");document.getElementById("pinColor");document.getElementById("txtColor");document.getElementById("pinText");function h(){o||(o=new s({top:20,left:40,width:100,height:30},"Pin Text","Indigo","white",n.src)),e.clearRect(0,0,e.canvas.width,e.canvas.height),o.drawPin(e),console.log("preview drawn")}h();document.addEventListener("astro:page-load",h);document.addEventListener("astro:after-swap",h);