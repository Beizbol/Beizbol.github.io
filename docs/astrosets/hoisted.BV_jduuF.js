import"./hoisted.BrocnPgX.js";async function E(){const s=document.getElementById("canvas-life");if(!s)throw new Error("Canvas not found.");if(!navigator.gpu)throw new Error("WebGPU not supported on this browser.");const f=await navigator.gpu.requestAdapter();if(!f)throw new Error("No appropriate GPUAdapter found.");const e=await f.requestDevice(),d=s.getContext("webgpu"),g=navigator.gpu.getPreferredCanvasFormat();d.configure({device:e,format:g});const a=new Float32Array([-.8,-.8,.8,-.8,.8,.8,-.8,-.8,.8,.8,-.8,.8]),p=e.createBuffer({label:"Cell vertices",size:a.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(p,0,a);const m={arrayStride:8,attributes:[{format:"float32x2",offset:0,shaderLocation:0}]},o=e.createBindGroupLayout({label:"Cell Bind Group Layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.COMPUTE,buffer:{}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),b=e.createPipelineLayout({label:"Cell Pipeline Layout",bindGroupLayouts:[o]}),v=e.createShaderModule({label:"Cell shader",code:`
        struct VertexOutput {
            @builtin(position) position: vec4f,
            @location(0) cell: vec2f,
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
            let gridPos = (position*scale+1) / grid - 1 + cellOffset;

            output.position = vec4f(gridPos, 0, 1);
            output.cell = cell / grid;
            return output;
          }

          @fragment
          fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
            return vec4f(input.cell, 1.0 - input.cell.x, 1);
          }
        `}),h=e.createRenderPipeline({label:"Cell pipeline",layout:b,vertex:{module:v,entryPoint:"vertexMain",buffers:[m]},fragment:{module:v,entryPoint:"fragmentMain",targets:[{format:g}]}}),G=e.createShaderModule({label:"Life simulation shader",code:`
          @group(0) @binding(0) var<uniform> grid: vec2f;

          @group(0) @binding(1) var<storage> cellStateIn: array<u32>;
          @group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;

          fn cellIndex(cell: vec2u) -> u32 {
            return (cell.y % u32(grid.y)) * u32(grid.x) +
                   (cell.x % u32(grid.x));
          }

          fn cellActive(x: u32, y: u32) -> u32 {
            return cellStateIn[cellIndex(vec2(x, y))];
          }

          @compute @workgroup_size(8, 8)
          fn computeMain(@builtin(global_invocation_id) cell: vec3u) {
            // Determine how many active neighbors this cell has.
            let activeNeighbors = cellActive(cell.x+1, cell.y+1) +
                                  cellActive(cell.x+1, cell.y) +
                                  cellActive(cell.x+1, cell.y-1) +
                                  cellActive(cell.x, cell.y-1) +
                                  cellActive(cell.x-1, cell.y-1) +
                                  cellActive(cell.x-1, cell.y) +
                                  cellActive(cell.x-1, cell.y+1) +
                                  cellActive(cell.x, cell.y+1);

            let i = cellIndex(cell.xy);

            // Conway's game of life rules:
            switch activeNeighbors {
              case 2: { // Active cells with 2 neighbors stay active.
                cellStateOut[i] = cellStateIn[i];
              }
              case 3: { // Cells with 3 neighbors become or stay active.
                cellStateOut[i] = 1;
              }
              default: { // Cells with < 2 or > 3 neighbors become inactive.
                cellStateOut[i] = 0;
              }
            }
          }
        `}),x=e.createComputePipeline({label:"Simulation pipeline",layout:b,compute:{module:G,entryPoint:"computeMain"}}),y=new Float32Array([32,32]),c=e.createBuffer({label:"Grid Uniforms",size:y.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(c,0,y);const r=new Uint32Array(32*32),l=[e.createBuffer({label:"Cell State A",size:r.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),e.createBuffer({label:"Cell State B",size:r.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})];for(let t=0;t<r.length;++t)r[t]=Math.random()>.6?1:0;e.queue.writeBuffer(l[0],0,r);const S=[e.createBindGroup({label:"Cell renderer bind group A",layout:o,entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:l[0]}},{binding:2,resource:{buffer:l[1]}}]}),e.createBindGroup({label:"Cell renderer bind group B",layout:o,entries:[{binding:0,resource:{buffer:c}},{binding:1,resource:{buffer:l[1]}},{binding:2,resource:{buffer:l[0]}}]})];let u=0;function U(){const t=e.createCommandEncoder(),n=t.beginComputePass();n.setPipeline(x),n.setBindGroup(0,S[u%2]);const P=Math.ceil(32/8);n.dispatchWorkgroups(P,P),n.end(),u++;const i=t.beginRenderPass({colorAttachments:[{view:d.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:0,b:.4,a:1},storeOp:"store"}]});i.setPipeline(h),i.setBindGroup(0,S[u%2]),i.setVertexBuffer(0,p),i.draw(a.length/2,32*32),i.end(),e.queue.submit([t.finish()])}setInterval(U,250)}document.addEventListener("astro:page-load",E);
