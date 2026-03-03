import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    viteImagemin({
      mozjpeg: { quality: 70 },
      optipng: { optimizationLevel: 5 },

      // ⭐ THIS creates WEBP automatically
      webp: {
        quality: 70
      }
    }),

  ],
})
