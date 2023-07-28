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
  proxy:{
    '/rumpun': 'http://localhost:5000/rumpun'
  },
  routeRules:{
    '/rumpun/post':{
      proxy: {to: "http://localhost:5000/rumpun"}
    }
  }
})
