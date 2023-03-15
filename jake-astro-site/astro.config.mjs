import { defineConfig } from 'astro/config';
import wasmPack from "vite-plugin-wasm-pack";
// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://jakesite.ca',
  integrations: [sitemap()],
  vite: {
    plugins:[wasmPack('./my-crate')],
  },
  build: {
    assets: 'assets'
  }
});