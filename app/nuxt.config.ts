export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    app: {
        head: {
            htmlAttrs: {
                lang: 'en' // default
            },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    devtools: {enabled: true},
    runtimeConfig: {
        apiUrl: process.env.API_URL ?? '',
        public: {
            gtagId: process.env.GTAG_ID ?? '',
            honeypotThreshold: process.env.HONEYPOT_THRESHOLD ?? "5",
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
        '@nuxtjs/i18n',
    ],
    css: [
        '~/app/assets/css/tailwind.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    plugins: [
        '~/app/plugins/fontawesome',
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
    vue: {
        compilerOptions: {
            isCustomElement: (tag: string) => tag === 'qr-code'
        }
    },
    security: {
        headers: {
            contentSecurityPolicy: {
                'img-src': ["'self'", "data:", "https://maps.gstatic.com/", "https://maps.googleapis.com/"],
                'script-src': [
                    "'self'",
                    "'unsafe-eval'",  // Required for the QR code library
                    'https:',
                    "'unsafe-inline'"
                ],
            }
        },
    },
    i18n: {
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en-US.json'
            },
            {
                code: 'es',
                name: 'Español',
                file: 'es-MX.json'
            }
        ],
        langDir: 'locales/',
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            alwaysRedirect: false,
            fallbackLocale: 'en'
        }
    },
})
