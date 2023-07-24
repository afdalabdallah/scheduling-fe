// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-proxy',
  ],
  css: ['~/assets/css/main.css'],
  proxy:{
    '/rumpun': 'http://localhost:5000/rumpun'
  }
  
})
