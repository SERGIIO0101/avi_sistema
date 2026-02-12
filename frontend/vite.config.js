import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <--- Corregido aquí
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})