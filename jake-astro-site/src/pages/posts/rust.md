---

layout: ../../layouts/BlogPost.astro
slug: "rust"
title: "Diving Into Rust"
author: "Jake"
date: "1 Sep 2022"
---

## Why Rust?

Mozilla maintains Firefox (2-3 million lines of C++). Over the years they hired the best engineers and developed/used the best static analysis tools to manage it all. Nonetheless, 70% of their security issues were memory safety related. Thus they spawned a research team to create a language to avoid these many issues outright.

**Compiler**

- Guarantees memory safety at compile time  
- No runtime memory errors (aka security vulnerabilities)
- No race conditions (mutex required by compiler when needed)
- No Garbage Collector (thus no unscheduled pauses to execution)
- Cached Incremental Builds (fast rebuilds)

**Type System**

- Very powerful type system allows for explicitly correct programs
- Supports a state-machine-like code style (valid states and transitions between)
- Allows compiler to understand more and be more helpful
- Type-safe compile-time !macros (less like text insertion more like full functions)
- ex. println!("hello world") compiles to the proper stdout system call for the target

**Performance**

- Compiles to native binaries just like C/C++ (no overhead)
- Zero cost abstractions (map, filter, collect, etc. same speed as manual loops)
- Immutable by default (no **const** keyword, **mut** instead)
- Powerful optimizations thanks to the compiler/type system

**Bonus**

- Rust is open source, with an active community and large industry support
- Built in package manager Cargo (like pip for python)
- Built in test framework (no junit needed)

**What's the catch?**

- The borrow-checker learning curve (enforces memory safety - bit of a pain in the ass)
- Pay the cost of the worst runtime bugs (race conditions, memory leaks, etc) at compile time instead of too late
- First builds can be slow (Rust team roadmap for improvement)
- Return keyword optional - a line with no semicolon returns (I hated this so much that [I made a VS Code extension](/blog/rsturn) to fix it)

**Vids:**

- [**Dank Rust Hype**](https://www.youtube.com/c/NoBoilerplate) Best Rust YouTube channel for getting into Rust
- [**Rust Versus C++**](https://www.youtube.com/watch?v=OhCjnyBc448&ab_channel=Rust) Software talk from an experienced engineer

**Tools:**

- [**Axum**](https://github.com/tokio-rs/axum) (like Flask.py) Fast async web api framework
  - <https://github.com/shanesveller/axum-rest-example>
- [**Yew**](https://yew.rs/) (like React.js) Multi-threaded web apps using [wasm](https://webassembly.org/).
- [**Tauri**](https://tauri.app/) (like Electron.js) Cross-platform desktop apps with a web ui
- [**Clap**](https://github.com/clap-rs/clap) Command Line Argument Parser for rich, polished cli apps
- [**Bevy**](https://bevyengine.org/) Rust Game Engine
- [**Flutter Bridge**](https://github.com/fzyzcjy/flutter_rust_bridge) Use Rust from Flutter mobile apps
- [**PyO3**](https://github.com/PyO3/pyo3) Use Rust from Python or vise versa
- [**rusqlite**](https://github.com/rusqlite/rusqlite) easy SQLite in Rust
