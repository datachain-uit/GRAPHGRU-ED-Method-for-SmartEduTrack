import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import the 'path' module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // Chạy trên port 3000
    allowedHosts: ['demo-2-liv2.onrender.com'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Configure the '@' alias to point to the 'src' directory
    },
  },
});
