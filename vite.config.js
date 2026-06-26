import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from /ashini/ — must match for assets to load.
  base: '/ashini/',
  server: {
    host: true,
    port: 5173,
  },
})
