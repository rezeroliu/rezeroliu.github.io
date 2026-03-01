import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "分类",
    icon: "folder",
    link: "/category/",
  },
  {
    text: "时间轴",
    icon: "clock",
    link: "/timeline/",
  },
  {
    text: "浮光 · 掠影",
    icon: "image",
    link: "/photography/",
  },
  {
    text: "关于",
    icon: "user",
    link: "/intro",
  },
]);
