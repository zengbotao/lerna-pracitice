/*
 * @Description:
 * @Autor: zengbotao@myhexin.com
 * @Date: 2022-11-08 16:30:15
 * @LastEditors: zengbotao 2898487084@qq.com
 * @LastEditTime: 2024-07-08 21:58:09
 */


module.exports = {
  title: "zengbotao",
  // base: '/docs/',
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ],
  plugins: [
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: {
          message: "New content is available.",
          buttonText: "Refresh",
        },
      },
    ],
    [
      "@vssue/vuepress-plugin-vssue",
      {
        // 设置 `platform` 而不是 `api`
        platform: "github-v4",

        // 其他的 Vssue 配置
        owner: "zengbotao",
        repo: "docs",
        clientId: "ab4f92230febd748188f",
        clientSecret: "4df9463808c8b8775b3e3b6c02c9cd64503f4835",
      },
    ],
  ],

  themeConfig: {
    author: "zengbotao",
    searchPlaceholder: "Search",
    searchMaxSuggestions: 10, // Search 建议列表条目数
    logo: "/assets/img/logo.png",
    lastUpdated: "Last Updated",
    smoothScroll: true,
    nav: [
      { text: "关于我", link: "/about/jianli.md" },
      { text: "git项目", link: "https://github.com/zengbotao" },
    ],
    sidebar:[
      {
        title: 'commitlint-config',
        path: './coding/commitlint.md'
      },
      {
        title: 'markdownlint-config',
        path: './coding/markdownlint.md'
      }
    ]
  },
};
