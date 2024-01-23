import { defineConfig } from "astro/config";
// import wasmPack from "vite-plugin-wasm-pack";
// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://jakesite.ca",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  integrations: [sitemap()],
  // vite: {
  //   plugins:[wasmPack('./my-crate')],
  // },
  build: {
    assets: "astrosets",
  },
});
