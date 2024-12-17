// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/image', 'nuxt-purgecss', 'nuxt-gtag'],

  css: ['@/assets/styles/normalize.css','@/assets/styles/reset.css', '@/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
            @use "@/assets/styles/mixins.scss" as *;
          `
        }
      }
    },
  },

  image: {
    dir: 'public',
    format: ['avif']
  },

  app: {
    pageTransition: false, 
    head: {
      title: 'Sheba Gold Capital',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'Sheba Gold Capital' },
        { name: 'apple-mobile-web-app-title', content: 'Sheba Gold Capital' },
        { name: 'application-name', content: 'Sheba Gold Capital' },
        { name: 'theme-color', content: '#ffffff' } 
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
    },
  },

  gtag: {
    id: 'G-08J21DYCS5'
  },

  compatibilityDate: '2024-12-06',
});