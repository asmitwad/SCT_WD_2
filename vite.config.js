
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/SCT_WD_2/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
