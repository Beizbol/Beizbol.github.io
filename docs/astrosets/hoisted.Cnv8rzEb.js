import"./hoisted.CcPGgC7n.js";WebAssembly.instantiateStreaming(fetch("/wasm/plus.wasm"),{env:{print(t){console.log("Zig add(1,2):",t)}}}).then(t=>{const e=t.instance.exports.add;e(1,2)});
