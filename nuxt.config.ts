import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: { compatibilityVersion: 4 },
  modules: ['@nuxtjs/supabase'],
  
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
    '/admin/**': { ssr: false }
  }
})