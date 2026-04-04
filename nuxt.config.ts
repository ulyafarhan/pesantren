import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  
  future: { 
    compatibilityVersion: 4 
  },
  
  // BYPASS DARURAT: Matikan SSR agar Vite tidak mengeksekusi backend di memori saat development
  ssr: false, 
  
  devtools: { enabled: false },
  
  modules: ['@nuxtjs/tailwindcss'],
  
  components: {
    dirs: [
      { 
        path: '~/components/ui', 
        prefix: 'Ui',
        extensions: ['.vue'] 
      },
      {
        path: '~/components',
        ignore: ['ui/**']
      }
    ]
  },
  
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: false,
  },
  
  vite: {
    optimizeDeps: {
      exclude: ['better-sqlite3']
    },
    // PROTEKSI TAMBAHAN: Memaksa mesin SSR Vite mengabaikan library C++
    ssr: {
      external: ['better-sqlite3']
    },
    server: {
      watch: {
        usePolling: true,
        ignored: ['**/db/data.db*']
      }
    }
  },

  nitro: {
    externals: {
      external: ['better-sqlite3']
    }
  },
  
  routeRules: {
    '/': { prerender: true, swr: 3600 },
    '/sejarah': { prerender: true, swr: 86400 },
    '/fasilitas': { prerender: true, swr: 86400 },
    '/brosur': { prerender: true, swr: 86400 },
    '/artikel': { swr: 3600 },
    '/artikel/**': { swr: 3600 },
    '/galeri': { swr: 3600 },
    '/admin/**': { ssr: false }, 
    '/api/articles/**': { swr: 300, cors: true }, 
    '/api/galleries/**': { swr: 300, cors: true }, 
    '/api/facilities/**': { swr: 86400, cors: true }, 
    '/api/class-programs/**': { swr: 86400, cors: true }, 
    '/api/testimonials/**': { swr: 3600, cors: true },
    '/api/**': { cors: true }
  }
});