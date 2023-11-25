// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-proxy',
    'nuxt-csurf',
  ],
  css: [
    '~/assets/css/main.css',
    // '~/assets/css/dashforge.css',
    // '~/assets/css/dashforge.customs.css',
    // '~/assets/css/dashforge.dashboard.css'
  ],
  routeRules: {
    '/api/rumpun/post': {
      proxy: { to: "http://localhost:5000/rumpun" }
    },
    '/api/matkul': {
      proxy: {
        to: "http://localhost:5000/matkul",
      }
    },
    '/api/rumpun/**': {
      proxy: {
        to: "http://localhost:5000/rumpun/**",

      }
    },
    '/api/matkul/**': {
      proxy: {
        to: "http://localhost:5000/matkul/**",
      }
    },
    '/api/dosen/**': {
      proxy: {
        to: "http://localhost:5000/dosen/**",
      }
    },
    '/api/**':{
      proxy: {
        to: "http://localhost:5000/**"
      }
    },
    '/api/generate':{
      proxy: {
        to: "http://127.0.0.1:8080/schedule"
      }
    }

  }
})
