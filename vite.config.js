import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Squash Club",
        name: "Squash Club App",
        icons: [
          {
            src: "icon-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "icon-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,json}"], // Cache all assets
      },
    }),
  ],
})
