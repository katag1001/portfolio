import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",  // Keep this if deploying to root domain
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
})
