// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";
export default defineNuxtConfig({
  compatibilityDate: "2025-09-05",
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  modules: ["@nuxt/fonts", "@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  fonts: {
    families: [
      {
        name: "Noto Sans Thai",
        provider: "google",
        weights: [
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
        ],
      },
    ],
  },
  alias: {
    images: fileURLToPath(new URL("./assets/images", import.meta.url)),
    style: fileURLToPath(new URL("./assets/style", import.meta.url)),
  },
  runtimeConfig: {
    public: {
      apiCurrency: "",
      apiBase: "/api",
    },
  },
  nitro: {
    preset: "github_pages",
  },
  app: {
    head: {
      title: "Anan - Currency Converter",
      meta: [
        {
          name: "description",
          content:
            "A simple currency converter app built with Nuxt 4 and ExchangeRate-API",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
