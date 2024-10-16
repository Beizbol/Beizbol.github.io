struct VertexOutput {
    @builtin(position) pos: vec4<f32>,
};

struct DefaultInput {
    res: vec2<f32>,
    time: f32,
};

@group(0) @binding(0)
var<uniform> si: DefaultInput;

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    let li = in.pos.xy/si.res;
    let r = li.x * abs(sin(si.time * 0.1));
    let g = li.y * abs(cos(si.time * 0.2));
    return vec4<f32>(r, g , 1.0, 1.0);
}