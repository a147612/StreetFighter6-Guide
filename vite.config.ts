import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Served from https://<user>.github.io/StreetFighter6-Guide/, so every asset
// URL needs that prefix. Override with BASE_PATH for other hosts (Cloudflare
// Pages / Netlify serve from the root, where the prefix would 404).
const base = process.env.BASE_PATH ?? '/StreetFighter6-Guide/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    // Content is data-heavy; keep the JSON out of the entry chunk so the shell
    // paints before the situation tables arrive.
    chunkSizeWarningLimit: 700,
  },
})
