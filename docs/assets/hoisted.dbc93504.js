import"./hoisted.6482272e.js";class l{x=0;y=0;constructor(t,s){this.x=t,this.y=s}}class y{turns=[];end;start;constructor(t){this.turns=t,this.start=t[0],this.end=t[t.length-1]}}class v{size=30;pos=new l(340,135);get center(){return{x:this.pos.x+this.size/2,y:this.pos.y+this.size/2}}name;description;damage=24;range=100;cooldown=0;reload_delay=50;shot_delay=50;price=10;color="darkblue";selected=!0;bullets=[];constructor(){this.name="Tower",this.description="A tower"}fire(t){t.damage(this.damage),this.cooldown=this.shot_delay,this.color="darkblue"}getName(){return this.name}getDescription(){return this.description}}class p{pos=new l(0,0);health=100;color="hsl(100, 100%, 50%)";delay=0;value=10;speed=1;shield=0;description;target=0;get isWaiting(){return this.delay>=0}get isDead(){return this.health<=0}constructor(t){this.delay=t,this.description="An enemy"}hasReached(t){return this.pos.x==t.x&&this.pos.y==t.y}kill(){this.health=0}wait(){this.delay-=1}move(t){let s=t.x-this.pos.x,a=t.y-this.pos.y;s==0&&a==0?this.target+=1:s>0?this.pos.x+=this.speed:s<0?this.pos.x-=this.speed:a>0?this.pos.y+=this.speed:a<0&&(this.pos.y-=this.speed)}damage(t){this.shield>0?(this.shield-=t,this.shield<0&&(this.shield=0)):(this.health-=t,this.color=`hsl(${this.health}, 100%, 50%)`)}isAlive(){return this.health>0}}class u{mobs=[];waveDelay=0;remaining=0;living=0;get isOver(){return this.remaining<=0&&this.living<=0}constructor(t,s){const a=t+(s-2)*.125*t;this.remaining=a,this.waveDelay=-5*s-t+100;for(let r=0;r<a;r++)this.mobs.push(new p(this.waveDelay*(r+1)))}spawn(){this.remaining-=1,this.living+=1}kill(t){this.mobs[t].kill(),this.living-=1}}const c=document.getElementById("waveDialog"),o=document.getElementById("canvas"),x=document.getElementById("play"),w=document.getElementById("lives"),f=document.getElementById("round"),b=document.getElementById("coins"),n=o.getContext("2d",{alpha:!1});let i={x:0,y:0,running:!0,frame:0,lives:100,name:"JTD",description:"A tower defence game.",version:"0.0.1",round:1,shield:0,coins:0,difficulty:2,road:new y([new l(100,0),new l(100,100),new l(500,100),new l(500,200),new l(300,200),new l(300,300),new l(400,300),new l(400,400)]),towers:[new v],wave:new u(1,2)};function k(){if(!n){console.error("Canavas not supported :(");return}const e=window.devicePixelRatio,t=o.getBoundingClientRect();o.width=t.width*e,o.height=t.height*e,n.scale(e,e),i.x=o.width/2,i.y=o.height-25,o.addEventListener("click",g),x.addEventListener("click",g),w.innerHTML=i.lives.toString(),f.innerHTML=i.round.toString(),console.log("starting "+i.name),D()}function g(){i.running?(o.classList.add("paused"),h()):(o.classList.remove("paused"),d())}function D(){console.log("Game started"),d()}function M(){console.log("Next Wave"),i.round+=1,f.innerHTML=i.round.toString(),i.wave=new u(i.round,i.difficulty)}c.addEventListener("close",()=>{console.log("close"),M(),d()});function E(){i.wave.isOver&&(console.log("Next Wave"),c.show(),h());for(let e of i.towers){if(e.cooldown>0){e.cooldown-=1,e.color="darkgrey";continue}for(let t=0;t<i.wave.mobs.length;t++){const s=i.wave.mobs[t];if(!(s.isDead||s.isWaiting||L(e.pos,s.pos)>e.range)){if(e.fire(s),s.isDead){i.coins+=s.value,b.innerHTML=i.coins.toString(),i.wave.kill(t),i.wave.isOver&&(console.log("Next Wave"),c.show(),h());continue}break}}}for(let e=0;e<i.wave.mobs.length;e++){const t=i.wave.mobs[e];if(t.isDead)continue;if(t.isWaiting){t.wait(),t.delay==0&&i.wave.spawn();continue}if(t.hasReached(i.road.end)){i.lives-=1,w.innerHTML=i.lives.toString(),i.wave.kill(e);continue}const s=i.road.turns[t.target];s&&t.move(s)}}function m(){if(!n){console.log("no ctx");return}n.fillStyle="green",n.fillRect(0,0,o.width,o.height);for(let e of i.towers)e.selected&&(n.fillStyle="grey",n.beginPath(),n.arc(e.pos.x,e.pos.y,e.range,0,Math.PI*2),n.fill(),n.closePath()),n.fillStyle=e.color,n.fillRect(e.pos.x-Math.floor(e.size/2),e.pos.y-Math.floor(e.size/2),e.size,e.size);n.fillStyle="white";for(let e=0;e<i.road.turns.length-1;e++){const t=i.road.turns[e],s=i.road.turns[e+1];n.beginPath(),n.moveTo(t.x,t.y),n.lineTo(s.x,s.y),n.stroke()}for(let e of i.wave.mobs)e.isDead||e.isWaiting||(n.fillStyle=e.color,n.beginPath(),n.arc(e.pos.x,e.pos.y,10,0,Math.PI*2),n.fill(),n.closePath());E(),i.frame=window.requestAnimationFrame(m)}function L(e,t){let s=Math.abs(e.x-t.x),a=Math.abs(e.y-t.y);return Math.sqrt(s*s+a*a)}function d(){console.log("resume"),i.running=!0,i.frame=window.requestAnimationFrame(m)}function h(){i.running=!1,window.cancelAnimationFrame(i.frame),console.log("paused",i)}window.addEventListener("load",k);