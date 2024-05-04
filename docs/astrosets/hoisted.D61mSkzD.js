import"./hoisted.CcPGgC7n.js";async function R(){const g=document.getElementById("canvas");if(!g)throw new Error("Canvas not found.");if(!navigator.gpu)throw new Error("WebGPU not supported on this browser.");const b=await navigator.gpu.requestAdapter();if(!b)throw new Error("No appropriate GPUAdapter found.");const r=await b.requestDevice(),l=g.getContext("webgpu"),f=navigator.gpu.getPreferredCanvasFormat();l.configure({device:r,format:f});const I=new Float32Array([-.8,-.8,.8,-.8,.8,.8,-.8,-.8,.8,.8,-.8,.8,-1,-1,1,-1,1,1,-1,-1,1,1,-1,1]),d=r.createBuffer({label:"Cell vertices",size:I.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});r.queue.writeBuffer(d,0,I);const _={arrayStride:8,attributes:[{format:"float32x2",offset:0,shaderLocation:0}]},h=r.createBindGroupLayout({label:"Cell Bind Group Layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.COMPUTE,buffer:{}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}}]}),E=r.createPipelineLayout({label:"Bg Pipeline Layout",bindGroupLayouts:[]}),S=r.createPipelineLayout({label:"Cell Pipeline Layout",bindGroupLayouts:[h]}),i=r.createShaderModule({label:"Cell shader",code:`
        struct VertexOutput {
            @builtin(position) position: vec4f,
            @location(0) color: vec4f,
          };

          @group(0) @binding(0) var<uniform> grid: vec2f;
          @group(0) @binding(1) var<storage> cellState: array<u32>;

          @vertex
          fn vertexMain(@location(0) position: vec2f,
                        @builtin(instance_index) instance: u32) -> VertexOutput {
            var output: VertexOutput;

            let i = f32(instance);
            let cell = vec2f(i % grid.x, floor(i / grid.x));

            let scale = f32(cellState[instance]);
            let cellOffset = cell / grid * 2;
            let gridPos = (position+1) / grid - 1 + cellOffset;

            output.position = vec4f(gridPos, 0, 1);
            
            switch (cellState[instance]) {
              case 4: {
                output.color = vec4f(0.8, 0, 0, 1);
              }
              case 3: {
                output.color = vec4f(0, 0.7, 0, 1);
              }
              case 2: {
                output.color = vec4f(0, 1, 0, 1);
              }
              case 1: {
                let c = cell / grid;
                output.color = vec4f(c, 1.0 - c.x, 1);
              }
              default: {
                output.color = vec4f(0,0,0,0);
              }
            }

            return output;
          }

          @fragment
          fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
            return input.color;
          }

          @vertex
          fn bgVert(@location(0) pos: vec2f) -> VertexOutput{
              var output: VertexOutput;
              output.position = vec4f(pos, 0, 1);
              output.color = vec4f(pos.x * 0.3,pos.y * 0.3, 0.3-pos.x*0.3, 1);
              return output;
          }

          @fragment
            fn bgFrag(input: VertexOutput) -> @location(0) vec4f {
                return input.color;
          }
        `}),w=r.createRenderPipeline({label:"Bg pipeline",layout:E,vertex:{module:i,entryPoint:"bgVert",buffers:[_]},fragment:{module:i,entryPoint:"bgFrag",targets:[{format:f}]}}),P=r.createRenderPipeline({label:"Cell pipeline",layout:S,vertex:{module:i,entryPoint:"vertexMain",buffers:[_]},fragment:{module:i,entryPoint:"fragmentMain",targets:[{format:f}]}}),v=new Float32Array([32,32]),x=r.createBuffer({label:"Grid Uniforms",size:v.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});r.queue.writeBuffer(x,0,v);const a=new Uint32Array(32*32),u=r.createBuffer({label:"Grid State",size:a.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});r.queue.writeBuffer(u,0,a);const y=r.createBindGroup({label:"Cell renderer bind group A",layout:h,entries:[{binding:0,resource:{buffer:x}},{binding:1,resource:{buffer:u}}]}),e={facing:"right",step:0,toggle:!0,spawn:!1,head_idx:34,food_idx:32,snek:[]};function D(){for(let t=0;t<a.length;++t)a[t]=0;G(),a[e.head_idx-1]=3,e.snek.push(e.head_idx),e.snek.push(e.head_idx-1),a[e.head_idx]=3,r.queue.writeBuffer(u,0,a)}function G(){let t=0;do t=Math.floor(Math.random()*32*32);while(a[t]!==0);a[t]=4,e.food_idx=t,e.spawn=!1}function p(){switch(e.spawn&&G(),e.facing){case"up":{e.head_idx=(e.head_idx+32)%(32*32);break}case"down":{e.head_idx<32&&(e.head_idx+=32*32),e.head_idx=(e.head_idx-32)%(32*32);break}case"right":{e.head_idx=(e.head_idx+1)%(32*32);break}case"left":{e.head_idx=(e.head_idx-1)%(32*32);break}}for(let n=0;n<e.snek.length;n++)a[e.snek[n]]=3;if(a[e.head_idx]=2,e.snek.unshift(e.head_idx),e.head_idx!==e.food_idx){const n=e.snek.pop();a[n]=0}else e.spawn=!0;r.queue.writeBuffer(u,0,a),e.step++;const t=r.createCommandEncoder(),c=t.beginRenderPass({colorAttachments:[{view:l.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:.8,b:.8,a:1},storeOp:"store"}]});c.setPipeline(w),c.setVertexBuffer(0,d),c.draw(6,1,6),c.end();const o=t.beginRenderPass({colorAttachments:[{view:l.getCurrentTexture().createView(),loadOp:"load",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]});o.setPipeline(P),o.setBindGroup(0,y),o.setVertexBuffer(0,d),o.draw(6,32*32),o.end(),r.queue.submit([t.finish()])}document.addEventListener("keydown",t=>{switch(t.key){case"ArrowUp":case"w":{t.preventDefault(),e.facing="up";break}case"ArrowDown":case"s":{t.preventDefault(),e.facing="down";break}case"ArrowLeft":case"a":{t.preventDefault(),e.facing="left";break}case"ArrowRight":case"d":{t.preventDefault(),e.facing="right";break}case" ":{t.preventDefault(),s?(console.log("Pausing game"),clearInterval(s),s=null):(console.log("Starting game"),s=setInterval(p,200));break}}}),D(),p();let s=setInterval(p,200)}document.addEventListener("astro:page-load",R);
