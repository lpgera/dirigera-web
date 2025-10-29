import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

const target = process.env.BACKEND_URL ?? "http://localhost:4000";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/components/ui": path.resolve(__dirname, "./src/components/ui"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/stores": path.resolve(__dirname, "./src/stores"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 3000000,
      },
      manifest: {
        short_name: "Dirigera",
        name: "Dirigera web",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64",
            type: "image/x-icon",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "logo192_maskable.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "logo512_maskable.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#0059aa",
        background_color: "#1f1f1f",
      },
    }),
  ],
  base: "./",
  build: {
    outDir: "build",
  },
  define: {
    __COMMIT_SHA__: JSON.stringify(process.env.COMMIT_SHA ?? null),
  },
  server: {
    port: 3099,
    host: true,
    proxy: {
      "/graphql": {
        target,
        changeOrigin: true,
      },
      "/websocket": {
        target,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
