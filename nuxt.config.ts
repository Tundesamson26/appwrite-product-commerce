// https://nuxt.com/docs/api/configuration/nuxt-config
export default({  
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
  vite: {
    css: {
      postcss: false
    }
  },
})
