import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        dir: './dist',
        entryFileNames: "admin-[name].min.js",
        assetFileNames: "admin-[name].[ext]",
      },
    }
  }
})
