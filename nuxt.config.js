import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 8080,
    host: "localhost"
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: true,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: "ja"
    },
    titleTemplate:
      "%s - " + "ディスコード速報 | Discordサーバー・友達募集・Bot掲示板",
    title: "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "ディスコード速報はDiscordサーバー・友達募集・Bot等を掲載しているDiscordの総合掲示板です。Discordに関することはディス速にお任せください。ぴったりの友達やボットがきっと見つかります！"
      },
      { hid: "og:url", property: "og:url", content: "https://dissoku.net/" },
      {
        hid: "og:title",
        property: "og:title",
        content: "ディスコード速報 | Discordサーバー・友達募集・Bot掲示板"
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "ディスコード速報はDiscordサーバー・友達募集・Bot等を掲載しているDiscordの総合掲示板です。Discordに関することはディス速にお任せください。ぴったりの友達やボットがきっと見つかります！"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://dissoku.net/favicon.ico"
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "ディスコード速報"
      },
      { hid: "og:locale", property: "og:locale", content: "ja_JP" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: [],
  loading: {
    color: "#7E8DE3"
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "@/plugins/vuetify",
    "@/plugins/axios",
    "@/plugins/const",
    "@/plugins/utils",
    "@/plugins/metas"
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxtjs/vuetify",
    ["@nuxtjs/google-analytics", { id: "UA-179585630-1" }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/dotenv",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/robots",
    "@nuxtjs/markdownit",
    "@nuxtjs/i18n",
    "cookie-universal-nuxt",
    [
      "@nuxtjs/google-adsense",
      {
        id: "ca-pub-7803004113878648",
        pageLevelAds: true,
        overlayBottom: true,
        onPageLoad: true,
        includeQuery: true,
        analyticsUacct: "UA-179585630-1",
        analyticsDomainName: "dissoku.net",
        test: process.env.GOOGLE_ADSENSE_TEST_MODE === "true" || false
      }
    ]
    // { filename: process.env.NODE_ENV !== 'production' ? "./config/.env.dev" : "./config/.env.prod" }
  ],
  robots: {
    UserAgent: "*",
    Disallow: "app.dissoku.net/discordlogin/"
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    defaultAssets: {
      font: {
        family: "Roboto"
      },
      icons: false
    },
    icons: {
      iconfont: "mdiSvg"
    },
    customVariables: ["~/assets/variables.scss"],
    // treeShake: true,
    options: {
      customProperties: true
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  router: {
    trailingSlash: false,
    stringifyQuery: query => {
      let qs = require("qs");
      let result = qs.stringify(query, { format: "RFC1738" });
      return result ? "?" + result : "";
    }
  },
  auth: {
    localStorage: false,
    cookie: {
      options: {
        expires: 7
      }
    },
    redirect: {
      logout: "/"
    },
    strategies: {
      local: {
        tokenType: "JWT",
        endpoints: {
          user: { url: "/getuser/", method: "get", propertyName: false },
          logout: false
        }
      }
    }
  },
  axios: {
    baseURL: process.env.DISSOKUAPP_URL
  },
  render: {
    static: {
      maxAge: 60 * 60 * 24 * 1000
    }
  },
  markdownit: {
    runtime: true
  },
  i18n: {
    locales: [
      { code: "ja", name: "日本語 (Japanese)", iso: "ja_JP", file: "ja.json" },
      { code: "en", name: "English", iso: "en-US", file: "en.json" }
    ],
    defaultLocale: "ja",
    langDir: "~/locales/",
    strategy: "prefix_except_default",
    vueI18n: {
      fallbackLocale: "ja"
    },
    vueI18nLoader: true,
    lazy: true
  }
};
