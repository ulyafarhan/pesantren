import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-07-11',
  future: { compatibilityVersion: 4 },
  
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],
  
  supabase: {
    redirectOptions: {
      login: '/admin/login',
      callback: '/confirm',
      exclude: ['/', '/artikel/*', '/galeri', '/sejarah', '/fasilitas'], 
    }
  },

  css: ['~/assets/css/main.css'],
  
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    },
    server: {
      watch: { usePolling: true }
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/sejarah': { prerender: true },
    '/artikel/**': { swr: 3600 },
    '/galeri': { swr: 3600 },
    '/admin/**': { ssr: false },
    '/api/**': { cors: true }
  }
})