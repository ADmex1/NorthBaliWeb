import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss' // <-- Impor tailwindcss

export default defineConfig({
  // Tambahkan konfigurasi css ini
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react()],
})