// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/styles/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    '/blogs': { ssr: false }
  },
  modules: ['@nuxtjs/supabase','nuxt-icon',['@nuxtjs/google-fonts', {
    families: {
      Rubik: [300,400,500,600,700,800,900]
    }
  }]],
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },
  googleFonts: {
    display: 'swap'
  }
})
