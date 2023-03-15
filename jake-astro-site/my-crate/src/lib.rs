extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn take_number_by_value(x: u32) {}

#[wasm_bindgen]
pub fn return_number() -> f64 {
    42.0
}

#[wasm_bindgen]
pub fn take_option_number(x: Option<u8>) {}

#[wasm_bindgen]
pub fn return_option_number(n: u32) -> Option<u32> {
    if n == 0 {
        None
    } else {
        Some(n - 1)
    }
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello,{}!", name));
}

#[wasm_bindgen]
pub fn deck(name: &str) {
    alert(&format!("Hello,{}!", name));
}
