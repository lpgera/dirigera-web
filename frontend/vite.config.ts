import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const target = process.env.BACKEND_URL ?? 'http://localhost:4000'

export default defineConfig({
  plugins: [reactRefresh()],
  base: './',
  build: {
    outDir: 'build',
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
