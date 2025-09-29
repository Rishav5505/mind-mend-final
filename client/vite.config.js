import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      strict: false, // optional
    },
    proxy: {
      // 💡 All API requests will go to Express backend
      "/api": {
        target: "http://localhost:5000",  // backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',  // This specifies the build directory (default is 'dist')
  },
});
