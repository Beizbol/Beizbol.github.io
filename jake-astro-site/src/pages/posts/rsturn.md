---

layout: ../../layouts/BlogPost.astro
slug: "rsturn"
title: "Solving my Gripe with Rust"
author: "Jake"
date: "16 Sep 2022"

---

## Motivation

On the road to learning the Rust programming language, one will inevitably hit some speed bumps along the way. One such is coming to terms with the borrow checker, which enables Rust's incredible memory safety guarantees. It takes some adjustment to overcome the strict rules but those efforts are fruitful. In stark contrast stands the optional return keyword.

In Rust, functions can return without using the keyword by omitting the trailing semicolon. So instead of just skimming for the glowing return keyword at the start of the line, one must also squint at the end of each line to see if there's a semicolon. This too takes some getting used to, as most other languages don't share this trait. However, much unlike the borrow checker, there is no gain to be had. In fact, I'd argue it makes Rust objectively worse.

On the surface, it may seem to just be a minor quirk of the language. Upon closer inspection, one might notice that newcomers to Rust are already adjusting to multiple unfamiliar concepts. They might also reason that each newcomer has a breaking point at which they will give up their pursuit of learning Rust. It feels like such an unnecessary straw to risk the camel's back for.

Why go out of the way to complicate something normally so straightforward? Why the barrier to entry to working with Rust? To save a few measly keystrokes... sometimes? After much grief, I finally decided to do something about it, something more than merely shaking fist at sky. So I set out to find a permanent solution to my biggest pet peeve in Rust.

## Introducing Rsturn

Without further adieu, I am proud to introduce **Rsturn**. An extension for VS Code which shows a decoration on lines of Rust code that return by omitting a trailing semicolon. By default, the decoration says "rsturn" styled to mimic the return keyword. This way there's no need to squint at your Rust code. Lines that return will be clear to see at a glance - as they should be. I hope I've managed to alleviate this unnecessary mental burden for anyone and everyone who shares this gripe with Rust.

## Getting Started

1. Download & install **Rsturn** in the "Extensions" tab or from the [Visual Studio Marketplace]()

2. Enjoy!