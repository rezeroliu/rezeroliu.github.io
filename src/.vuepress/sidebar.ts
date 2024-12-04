import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "随笔",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "编程",
      icon: "code",
      prefix: "code/",
      expanded: true,
      children: [
        "leetcode/",
        "machineLearning/",
        "linux/",
        "programming/"
      ],
    },
  ],
});
