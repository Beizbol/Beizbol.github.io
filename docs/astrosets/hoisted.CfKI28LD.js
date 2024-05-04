import"./hoisted.CcPGgC7n.js";async function d(){console.log("astro:page-load");const n=document.getElementById("canvas");if(!n)throw new Error("Canvas not found.");if(!navigator.gpu)throw new Error("WebGPU not supported on this browser.");const s=await navigator.gpu.requestAdapter();if(!s)throw new Error("No appropriate GPUAdapter found.");const r=navigator.gpu.getPreferredCanvasFormat();if(!r)throw new Error("No appropriate CanvasFormat found.");const e=await s.requestDevice(),o=n.getContext("webgpu");if(!o)throw new Error("WebGPU context not supported on this browser.");o.configure({device:e,format:r});const a=new Float32Array([-.8,-.8,0,.8,.8,-.8]),i=e.createBuffer({label:"Cell vertices",size:a.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(i,0,a);const u={arrayStride:8,attributes:[{format:"float32x2",offset:0,shaderLocation:0}]},c=e.createShaderModule({label:"Cell shader",code:`
    @vertex
    fn vertexMain(@location(0) pos: vec2f) ->
      @builtin(position) vec4f {
      return vec4f(pos, 0, 1);
    }

    @fragment
    fn fragmentMain() -> @location(0) vec4f {
      return vec4f(1, 0, 0, 1);
    }
  `}),l=e.createRenderPipeline({label:"Cell pipeline",layout:"auto",vertex:{module:c,entryPoint:"vertexMain",buffers:[u]},fragment:{module:c,entryPoint:"fragmentMain",targets:[{format:r}]}}),f=e.createCommandEncoder(),t=f.beginRenderPass({colorAttachments:[{view:o.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:0,b:.4,a:1},storeOp:"store"}]});t.setPipeline(l),t.setVertexBuffer(0,i),t.draw(a.length/2),t.end(),e.queue.submit([f.finish()])}document.addEventListener("astro:page-load",d);
