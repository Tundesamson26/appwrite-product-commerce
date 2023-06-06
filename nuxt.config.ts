// https://nuxt.com/docs/api/configuration/nuxt-config
export default({  
  buildModules: [
    '@nuxtjs/vite'
  ],
  vite: {
    css: {
      postcss: false
    }
  },
  runtimeConfig: {
    public: {
      PROJECT_ID: process.env.NUXT_PROJECT_ID,
      API_ENDPOINT: process.env.NUXT_API_ENDPOINT,
    },
  },  
  router: {
    extendRoutes(routes: { path: string; component: any; }[], resolve: (arg0: string, arg1: string) => any) {
      routes.push(
        {
          path: '/dashboard',
          component: resolve(__dirname, 'pages/dashboard.vue')
        },
        {
          path: '/wallet',
          component: resolve(__dirname, 'pages/wallet.vue')
        },
        {
          path: '/products',
          component: resolve(__dirname, 'pages/products.vue')
        },
        {
          path: '/customers',
          component: resolve(__dirname, 'pages/courses.vue')
        },
        {
          path: '/sales',
          component: resolve(__dirname, 'pages/sales.vue')
        }
      );
    }
  },
})
