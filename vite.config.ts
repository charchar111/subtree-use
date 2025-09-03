import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      // shardcn 설정과 연결되어 있으니, 함께 변경할 것
      '@': path.resolve(__dirname, './src'),
    },
  },
});
