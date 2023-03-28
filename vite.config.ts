import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      dts: "./config/components.d.ts",
      dirs: ["./src/components"],
    }),
    AutoImport({
      dirs: ["./src/stores", "./src/composables", "./src/common"],
      imports: ["vue", "pinia"],
      vueTemplate: true,
      dts: "./config/auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  define: {
    global: "window",
    "process.env": {},
  },
});
