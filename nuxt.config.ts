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
  plugins: [
    // Other plugins
    { src: '~/plugins/pdf.js', mode: 'client' },
  ],
  runtimeConfig: {
    public: {
      PROJECT_ID: process.env.NUXT_PROJECT_ID,
      API_ENDPOINT: process.env.NUXT_API_ENDPOINT,
      PRODUCT_DATABASE_ID: process.env.NUXT_PRODUCT_DATABASE_ID,
      PRODUCT_COLLECTION_ID: process.env.NUXT_PRODUCT_COLLECTION,
      COURSE_DB_ID: process.env.NUXT_COURSE_DATABASE_ID,
      COURSE_COLLECTION: process.env.NUXT_COURSE_COLLECTION_ID,
      COURSE_BUCKET_ID: process.env.NUXT_COURSE_BUCKET_ID,
      TICKET_DB_ID: process.env.NUXT_TICKET_DATABASE_ID,
      TICKET_COLLECTION: process.env.NUXT_TICKET_COLLECTION_ID,
      TICKET_BUCKET_ID: process.env.NUXT_TICKET_BUCKET_ID,
      ACCOUNT_DETAILS_DB_ID: process.env.NUXT_ACCOUNT_DETAILS_DATABASE_ID,
      ACCOUNT_DETAILS_COLLECTION: process.env.NUXT_ACCOUNT_DETAILS_COLLECTION_ID,
      SUPPORT_DATABASE_ID: process.env.NUXT_SUPPORT_DB_ID,
      SUPPORT_COLLECTION_ID: process.env.NUXT_SUPPORT_COLLECTION_ID
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
