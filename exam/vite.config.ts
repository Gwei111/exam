
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteImagemin   from "vite-plugin-imagemin";
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),viteImagemin(),viteCompression()],
  base: './',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
  },

})
