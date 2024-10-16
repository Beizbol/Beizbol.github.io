import"./hoisted.BrocnPgX.js";const f=`
struct VSOut {
    @builtin(position) Position: vec4<f32>,
    @location(0) color: vec3<f32>,
 };

@vertex
fn main(@location(0) inPos: vec3<f32>,
        @location(1) inColor: vec3<f32>) -> VSOut {
    var vsOut: VSOut;
    vsOut.Position = vec4<f32>(inPos, 1.0);
    vsOut.color = inColor;
    return vsOut;
}`,p=`
@fragment
fn main(@location(0) inColor: vec3<f32>) -> @location(0) vec4<f32> {
    return vec4<f32>(inColor, 1.0);
}
`,d={vert:f,frag:p},g=new Float32Array([1,-1,0,-1,-1,0,0,1,0]),m=new Float32Array([1,0,0,0,1,0,0,0,1]),h=new Uint16Array([0,1,2]),v=navigator.gpu,w=await v.requestAdapter(),t=await w.requestDevice(),x=t.queue,r=document.getElementById("canvas"),l=r.getContext("webgpu"),A={device:t,alphaMode:"opaque",format:"bgra8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC};l.configure(A);const y={size:[r.width,r.height,1],dimension:"2d",format:"depth24plus-stencil8",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC},P=t.createTexture(y),C=P.createView(),E=c(g,GPUBufferUsage.VERTEX),T=c(m,GPUBufferUsage.VERTEX),U=c(h,GPUBufferUsage.INDEX),b={code:d.vert},O=t.createShaderModule(b),S={code:d.frag},B=t.createShaderModule(S),D={shaderLocation:0,offset:0,format:"float32x3"},V={shaderLocation:1,offset:0,format:"float32x3"},M={attributes:[D],arrayStride:4*3,stepMode:"vertex"},R={attributes:[V],arrayStride:4*3,stepMode:"vertex"},L={depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus-stencil8"},G={bindGroupLayouts:[]},q=t.createPipelineLayout(G),F={module:O,entryPoint:"main",buffers:[M,R]},N={format:"bgra8unorm",writeMask:GPUColorWrite.ALL},I={module:B,entryPoint:"main",targets:[N]},W={frontFace:"cw",cullMode:"none",topology:"triangle-list"},_={layout:q,vertex:F,fragment:I,primitive:W,depthStencil:L},k=t.createRenderPipeline(_);function c(o,s){let n={size:o.byteLength+3&-4,usage:s,mappedAtCreation:!0},e=t.createBuffer(n);return(o instanceof Uint16Array?new Uint16Array(e.getMappedRange()):new Float32Array(e.getMappedRange())).set(o),e.unmap(),e}const u={view:{},clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"},X={view:C,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store",stencilClearValue:0,stencilLoadOp:"clear",stencilStoreOp:"store"},a={paused:!1};document.addEventListener("keydown",o=>{o.key===" "&&(a.paused=!a.paused)});function i(){const o=l.getCurrentTexture();u.view=o.createView();const s={colorAttachments:[u],depthStencilAttachment:X},n=t.createCommandEncoder(),e=n.beginRenderPass(s);e.setPipeline(k),e.setViewport(0,0,r.width,r.height,0,1),e.setScissorRect(0,0,r.width,r.height),e.setVertexBuffer(0,E),e.setVertexBuffer(1,T),e.setIndexBuffer(U,"uint16"),e.drawIndexed(3,1),e.end(),x.submit([n.finish()]),!a.paused&&requestAnimationFrame(i)}i();document.addEventListener("astro:page-load",i);
