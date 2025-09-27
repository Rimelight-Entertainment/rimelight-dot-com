export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "nuxt-zod-i18n",
    "@nuxt/content",
    "@nuxt/image",
    "nuxt-og-image",
    "@vueuse/nuxt",
    "@nuxthub/core",
    "@nuxt/scripts",
    "@nuxtjs/turnstile",
    "nuxt-auth-utils",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@pinia/nuxt",
    "magic-regexp/nuxt",
    "@nuxtjs/device",
    "nuxt-echarts"
  ],
  components: [
    {
      path: "~/components/article",
      pathPrefix: false,
      prefix: "RL"
    },
    {
      path: "~/components/content",
      pathPrefix: false,
      prefix: "RL"
    },
    {
      path: "~/components/dashboard",
      pathPrefix: false,
      prefix: "RL"
    },
    {
      path: "~/components/feedback",
      pathPrefix: false,
      prefix: "RL"
    },
    {
      path: "~/components/headings",
      pathPrefix: false,
      prefix: "RL"
    },
    {
      path: "~/components/navigation",
      pathPrefix: false,
      prefix: "RL"
    },
    {
      path: "~/components/temp",
      pathPrefix: false,
      prefix: "RL"
    },
    {
      path: "~/components",
      prefix: "RL"
    }
  ],
  devtools: {
    enabled: true
  },
  app: {
    head: {
      title: "Rimelight Entertainment",
      titleTemplate: "%s | Rimelight Entertainment",
      meta: [
        {
          name: "description",
          content: "Tell your story."
        },
        {
          name: "author",
          content: "Rimelight Entertainment"
        },
        {
          name: "creator",
          content: "Rimelight Entertainment"
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg"
        }
      ]
    },
    pageTransition: {
      name: "page",
      mode: "out-in"
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in"
    }
  },
  css: ["./app/assets/css/main.css"],
  site: {
    url: "https://rimelight.com",
    name: "Rimelight Entertainment",
    // Should be changed to true upon release to the public.
    indexable: false
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3
        }
      }
    }
  },
  ui: {
    prefix: "U",
    theme: {
      colors: [
        "primary",
        "secondary",
        "tertiary",
        "info",
        "success",
        "warning",
        "error",
        "commentary",
        "ideation",
        "creator",
        "neutral"
      ]
    }
  },
  runtimeConfig: {
    session: {
      name: "user-session",
      password: "",
      cookie: {
        maxAge: 60 * 60 * 24 * 30
      }
    },
    public: {
      constructionPassword: process.env.SITE_PASSWORD || "secret"
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY
    }
  },
  routeRules: {
    "/api/**": {
      cors: true
    }
  },
  compatibilityDate: "2025-07-15",
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"]
    }
  },
  hub: {
    blob: true,
    database: true
  },
  fonts: {
    defaults: {
      weights: [
        // Thin
        100,
        // ExtraLight
        200,
        // Light
        300,
        // Regular
        400,
        // Medium
        500,
        // SemiBold
        600,
        // Bold
        700,
        // Extra Bold
        800
      ],
      styles: ["normal", "italic"]
    },
    families: [
      {
        name: "JetBrains Mono",
        global: true,
        provider: "local"
      }
    ]
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "ar",
        name: "العربية"
      },
      {
        code: "en",
        name: "English"
      },
      {
        code: "es",
        name: "Español"
      },
      {
        code: "fr",
        name: "Français"
      },
      {
        code: "ja",
        name: "日本語"
      },
      {
        code: "ko",
        name: "한국어"
      },
      {
        code: "pt",
        name: "Português"
      },
      {
        code: "ro",
        name: "Română"
      },
      {
        code: "zh_cn",
        name: "简体中文"
      }
    ]
  },
  icon: {
    provider: "server",
    class: "icon",
    size: "24px",
    mode: "svg",
    customCollections: [
      {
        prefix: "first-party",
        dir: "./app/assets/icons/first-party",
        normalizeIconName: false
      },
      {
        prefix: "third-party",
        dir: "./app/assets/icons/third-party",
        normalizeIconName: false
      }
    ]
  },
  robots: {
    blockAiBots: false,
    blockNonSeoBots: false,
    disallow: ["/internal"]
  },
  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY
  }
})