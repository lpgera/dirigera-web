import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const target = process.env.BACKEND_URL ?? 'http://localhost:4000'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        short_name: 'Dirigera',
        name: 'Dirigera web',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64',
            type: 'image/x-icon',
          },
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
          {
            src: 'logo192_maskable.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: 'logo512_maskable.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#0059aa',
        background_color: '#1f1f1f',
      },
    }),
  ],
  base: './',
  build: {
    outDir: 'build',
  },
  define: {
    __VERSION__: JSON.stringify(
      process.env.VERSION ??
        (await (async () => {
          const { execSync } = await import('child_process')
          const commitHash = execSync('git rev-parse --short HEAD')
            .toString()
            .trim()
          return `dev-${commitHash}`
        })())
    ),
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/graphql': {
        target,
        changeOrigin: true,
      },
      '/websocket': {
        target,
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
