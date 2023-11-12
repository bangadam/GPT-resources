import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePluginRadar } from "vite-plugin-radar";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: "G-292798669",
      },
    }),
  ],
});
