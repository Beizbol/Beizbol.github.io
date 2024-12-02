import { defineConfig } from "astro/config";
// import wasmPack from "vite-plugin-wasm-pack";
// https://astro.build/config
import sitemap from "@astrojs/sitemap";
import robotsTxt from 'astro-robots-txt';


// https://astro.build/config
export default defineConfig({
  site: "https://jakesite.ca",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  integrations: [sitemap(), robotsTxt()],
  // vite: {
  //   plugins:[wasmPack('./my-crate')],
  // },
  redirects: {
    //'/old-page': '/new-page'
    '/dad/': '/dad/hbd',
    '/photo-pin-tool': '/tools/photo-pin',
    '/photo-pin': '/tools/photo-pin',
    '/pin-tool/': '/tools/photo-pin',
    '/pin': '/tools/photo-pin',
    '/jab': '/apps/jab'

  },
  build: {
    assets: "astrosets",
  },
});
