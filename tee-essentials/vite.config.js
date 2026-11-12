import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site load from any GitHub Pages sub-folder
export default defineConfig({
  plugins: [react()],
  base: './',
});
