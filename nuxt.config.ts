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
  proxy: {
    '/api/matkul/update': {
      target: 'http://localhost:5000',
      pathRewrite: (path, req) => {
        const id = path.split('/').pop(); // Extract the dynamic :id parameter from the path
        return `/matkul/${id}`;
      },
      changeOrigin: true,
    },
  },
  routeRules: {
    '/api/rumpun/post': {
      proxy: { to: "http://localhost:5000/rumpun" }
    },
    '/api/matkul': {
      proxy: {
        to: "http://localhost:5000/matkul",
      }
    },
    '/api/rumpun': {
      proxy: {
        to: "http://localhost:5000/rumpun",

      }
    },
    '/api/matkul/**': {
      proxy: {
        to: "http://localhost:5000/matkul/**",
      }
    },

  }
})
