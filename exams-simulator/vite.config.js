// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/exams-simulator/',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['cookie'],
    },
  },
});
