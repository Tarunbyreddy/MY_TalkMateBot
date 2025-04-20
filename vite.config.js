import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MY_TalkMateBot/',  // 👈 IMPORTANT
  plugins: [react()],
})
