// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     routes: [
  //       '/',
  //     ]
  //   }
  // },
  devtools: { enabled: true },
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
  modules: ['@nuxtjs/supabase', 'nuxt-icon', ['@nuxtjs/google-fonts', {
    families: {
      Rubik: [300, 400, 500, 600, 700, 800, 900]
    }
  }], '@nuxt/image', 'nuxt-simple-sitemap', 'nuxt-simple-robots'],
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },
  googleFonts: {
    display: 'swap'
  },
  image: {
    domains: [process.env.SUPABASE_URL as string]
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
  },
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL as string,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      siteName: process.env.SITE_NAME,
      siteDescription: process.env.SITE_DESC,
      language: 'id'
    }
  },
  sitemap: {
    include: ['/blogs', '/', '/blog'],
    sitemaps: true,
    enabled: true,
  },
  robots: {
    enabled: true,
    allow: []
  }
})
