// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    devtools: {enabled: true},
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
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
        'nuxt-security',
        '@vueform/nuxt',
        '@nuxt/content',
    ],
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
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
    security: {
        headers: {
            contentSecurityPolicy: {
                'img-src': ["'self'", "data:", "https://maps.gstatic.com/", "https://maps.googleapis.com/"],
                'script-src': ["'self'", "data:", "https://maps.googleapis.com"],
            }
        },
    },
    content: {
        markdown: {
            toc: {
                depth: 3,
                searchDepth: 3
            },
            rehypePlugins: [
                'rehype-external-links'
            ]
        }
    },
})
