import { defineConfig } from 'astro/config';
import wasmPack from "vite-plugin-wasm-pack";
// https://astro.build/config
import sitemap from "@astrojs/sitemap";
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://jakesite.ca',
  integrations: [sitemap(), AstroPWA()],
  vite: {
    plugins:[wasmPack('./my-crate')],
  },
  build: {
    assets: 'assets'
  }
});