import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'C:\\Users\\jkinn\\Desktop\\Tomcat\\apache-tomcat-11.0.14\\webapps\\ROOT', // Your desired output folder name
  },
})
