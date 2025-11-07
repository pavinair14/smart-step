import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers/zod'],
          'ui-vendor': ['framer-motion', 'lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-progress', '@radix-ui/react-label', '@radix-ui/react-slot'],
          'zustand-vendor': ['zustand'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
