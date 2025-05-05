import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/deluxe-auto', // قم بتغيير هذا إلى اسم مستودع GitHub الخاص بك
});



