import"./hoisted.3bf6e513.js";let a=new Image;a.src="/puzzle/images/lobster.jpg";a.onload=()=>{const e=new headbreaker.Canvas("puzzle",{width:1e3,height:700,pieceSize:100,proximity:20,borderFill:10,strokeWidth:2,lineSoftness:.18,outline:new headbreaker.outline.Rounded,image:a,maxPiecesCount:{x:7,y:6}});e.adjustImagesToPuzzleHeight(),e.autogenerate({horizontalPiecesCount:7,verticalPiecesCount:6}),e.shuffle(.7),e.draw(),e.onConnect((s,o,r,t)=>{o.shape.stroke("orange"),t.shape.stroke("orange"),e.redraw(),setTimeout(()=>{o.shape.stroke("black"),t.shape.stroke("black"),e.redraw()},200)})};