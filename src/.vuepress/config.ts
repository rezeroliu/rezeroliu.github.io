import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "旺仔珍知棒",
  description: "",
  theme,
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue",
    ),
  },

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});