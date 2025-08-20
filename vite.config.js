import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcssPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  base: '/contact-manager/', 
  css: {
    postcss: {
      plugins: [tailwindcssPostcss(), autoprefixer()],
    },
  },
})