import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  configureWebpack: {
    devtool: "source-map",
  },
  head: {
    css: [
      '~/assets/css/particle_optimization.scss'
    ]
  }
});
