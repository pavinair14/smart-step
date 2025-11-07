import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: { drop: ["console", "debugger"] },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        compact: true,
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers/zod'],
          'ui-vendor': ['framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-progress', '@radix-ui/react-label'],
          'zustand-vendor': ['zustand'],
        },
      },
    },
    modulePreload: { polyfill: true },
    chunkSizeWarningLimit: 600,
  },
});
