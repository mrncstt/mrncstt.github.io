import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/quizzes/",        
  build: {
    outDir: "../quizzes",   
    emptyOutDir: true
  }
});
