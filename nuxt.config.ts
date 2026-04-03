import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-07-11',
  future: { compatibilityVersion: 4 },
  
  modules: [
    '@vueuse/nuxt'
  ],

  components: {
    dirs: [
      {
        path: '~/components/ui',
        extensions: ['.vue'],
        pathPrefix: false,
        prefix: 'Ui'
      },
      {
        path: '~/components'
      }
    ]
  },

  css: ['~/assets/css/main.css'],
  
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
      exclude: ['better-sqlite3']
    },
    server: {
      watch: { 
        usePolling: true,
        ignored: ['**/db/**']
      }
    }
  },

  nitro: {
    externals: {
      inline: ['better-sqlite3']
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
    '/api/articles/**': { swr: 300, cors: true }, // Cache articles for 5 mins
    '/api/galleries/**': { swr: 300, cors: true }, 
    '/api/facilities/**': { swr: 86400, cors: true }, // Cache facilities for 1 day
    '/api/class-programs/**': { swr: 86400, cors: true }, 
    '/api/testimonials/**': { swr: 3600, cors: true },
    '/api/**': { cors: true }
  }
})