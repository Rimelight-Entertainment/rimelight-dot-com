export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
      '@nuxt/ui',
      '@nuxtjs/i18n',
      '@nuxt/content',
      '@nuxt/image',
      'nuxt-og-image',
      '@vueuse/nuxt',
      '@nuxthub/core',
      '@nuxt/scripts',
      '@nuxtjs/turnstile',
      'nuxt-auth-utils'
    ],
    hub: {
      blob: true,
      database: true,
    },
    i18n: {
        defaultLocale: 'en',
        locales: [
            { code: 'ar', name: 'العربية' },
            { code: 'en', name: 'English' },
            { code: 'es', name: 'Español' },
            { code: 'fr', name: 'Français' },
            { code: 'ja', name: '日本語' },
            { code: 'ko', name: '한국어' },
            { code: 'pt', name: 'Português' },
            { code: 'ro', name: 'Română' },
            { code: 'zh_cn', name: '简体中文' },
        ]
    },
    ui: {
        prefix: 'U',
        theme: {
            colors: [
                'primary',
                'secondary',
                'tertiary',
                'info',
                'success',
                'warning',
                'error',
                'neutral',
            ]
        }
    },
    icon: {
        provider: 'server',
        class: 'icon',
        size: '24px',
        mode: 'svg',
        customCollections: [
            {
                prefix: 'first-party',
                dir: './app/assets/icons/first-party',
                normalizeIconName: false,
            },
            {
                prefix: 'third-party',
                dir: './app/assets/icons/third-party',
                normalizeIconName: false,
            }
        ],
    },
    content: {
        build: {
            markdown: {
                toc: {
                    depth: 3,
                }
            }
        }
    },
    app: {
        head: {
            title: 'Rimelight Entertainment',
            titleTemplate: '%s | Rimelight Entertainment',
            meta: [
                { name: 'description', content: 'Tell your story.' },
                { name: 'author', content: 'Rimelight Entertainment' },
                { name: 'creator', content: 'Rimelight Entertainment' },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
            ],
        },
      pageTransition: { name: 'page', mode: 'out-in' },
      layoutTransition: { name: 'layout', mode: 'out-in' },
    },
    css: ["./app/assets/css/main.css"],
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: [
                '/',
            ]
        }
    },
  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
  runtimeConfig: {
      session: {
        name: 'user-session',
        password: '',
        cookie: {
          maxAge: 60 * 60 * 24 * 30
        }
      },
    public: {
      constructionPassword: process.env.SITE_PASSWORD || 'secret'
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
    },
    databaseUrl: process.env.DATABASE_URL,
    authSecret: process.env.AUTH_SECRET,
  },
  routeRules: {
    '/api/**': {
      cors: true
    }
  },
    components: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ]
})