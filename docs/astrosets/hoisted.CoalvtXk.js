import"./hoisted.CcPGgC7n.js";async function b(){const i=document.getElementById("canvas");if(!i)throw new Error("Canvas not found.");if(!navigator.gpu)throw new Error("WebGPU not supported on this browser.");const u=await navigator.gpu.requestAdapter();if(!u)throw new Error("No appropriate GPUAdapter found.");const n=navigator.gpu.getPreferredCanvasFormat();if(!n)throw new Error("No appropriate CanvasFormat found.");const e=await u.requestDevice(),o=i.getContext("webgpu");if(!o)throw new Error("WebGPU context not supported on this browser.");o.configure({device:e,format:n});const r=32,a=new Float32Array([-.8,-.8,.8,-.8,.8,.8,-.8,-.8,.8,.8,-.8,.8]),c=e.createBuffer({label:"Cell vertices",size:a.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(c,0,a);const g={arrayStride:8,attributes:[{format:"float32x2",offset:0,shaderLocation:0}]},s=e.createShaderModule({label:"Cell shader",code:`
    struct VertexInput {
        @location(0) pos: vec2f,
        @builtin(instance_index) instance: u32,
    };

    struct VertexOutput {
        @builtin(position) pos: vec4f,
        @location(0) cell: vec2f, // New line!
    };

    @group(0) @binding(0) var<uniform> grid: vec2f;

    @vertex
    fn vertexMain(input: VertexInput) -> VertexOutput  {
        let i = f32(input.instance);
        let cell = vec2f(i % grid.x, floor(i / grid.x));
        let cellOffset = cell / grid * 2;
        let gridPos = (input.pos + 1) / grid - 1 + cellOffset;
        
        var output: VertexOutput;
        output.pos = vec4f(gridPos, 0, 1);
        output.cell = cell; // New line!
        return output;
    }

    struct FragInput {
        @location(0) cell: vec2f,
    };

    @fragment
    fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
        let c = input.cell / grid;
        return vec4f(c, 1-c.x, 1);
    }
  `}),l=e.createRenderPipeline({label:"Cell pipeline",layout:"auto",vertex:{module:s,entryPoint:"vertexMain",buffers:[g]},fragment:{module:s,entryPoint:"fragmentMain",targets:[{format:n}]}}),f=new Float32Array([r,r]),p=e.createBuffer({label:"Grid Uniforms",size:f.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(p,0,f);const v=e.createBindGroup({label:"Cell renderer bind group",layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:p}}]}),d=e.createCommandEncoder(),t=d.beginRenderPass({colorAttachments:[{view:o.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:0,b:.4,a:1},storeOp:"store"}]});t.setPipeline(l),t.setVertexBuffer(0,c),t.setBindGroup(0,v),t.draw(a.length/2,r*r),t.end(),e.queue.submit([d.finish()])}document.addEventListener("astro:page-load",b);
