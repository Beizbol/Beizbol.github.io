struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
};

@group(0) @binding(0) var<uniform> grid: vec2f;
@group(0) @binding(1) var<storage> cellState: array<u32>;

@vertex
fn vertexMain(@location(0) position: vec2f, @builtin(instance_index) instance: u32) -> VertexOutput {
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