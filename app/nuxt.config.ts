// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},

    runtimeConfig: {
        public: {
            apiUrl: process.env.AWS_API_URL,
            apiKey: process.env.GOOGLE_MAPS_API_KEY,
            gtagId: process.env.GAG_ID,
        }
    },

    ssr: false,

    modules: [
      '@nuxtjs/tailwindcss',
      '@nuxt/image',
      'nuxt-keen-slider',
      '@nuxtjs/google-fonts',
      'nuxt-svgo',
    ],

    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    plugins: [
        '~/plugins/vue3-google-map',
        '~/plugins/fontawesome',
    ],

    googleFonts: {
        families: {
            "Lato": true
        },
        preload: true
    },

    build: {
        transpile: [
            '@fortawesome/vue-fontawesome'
        ]
    },
})