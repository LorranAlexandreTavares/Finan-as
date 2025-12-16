import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // <--- ESSA LINHA CORRIGE A PÁGINA EM BRANCO
  plugins: [react()],
})
