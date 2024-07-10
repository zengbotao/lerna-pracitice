export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"不问为何机会不来，只问机会来时你准备好了没"} }],
  ["/about/jianli.html", { loader: () => import(/* webpackChunkName: "about_jianli.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/about/jianli.html.js"), meta: {"title":"个人信息"} }],
  ["/npm/commitlint.html", { loader: () => import(/* webpackChunkName: "npm_commitlint.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/npm/commitlint.html.js"), meta: {"title":"设置 git hook"} }],
  ["/npm/eslint.html", { loader: () => import(/* webpackChunkName: "npm_eslint.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/npm/eslint.html.js"), meta: {"title":"@wavesdean/eslint-config"} }],
  ["/npm/markdownlint.html", { loader: () => import(/* webpackChunkName: "npm_markdownlint.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/npm/markdownlint.html.js"), meta: {"title":""} }],
  ["/npm/stylelint.html", { loader: () => import(/* webpackChunkName: "npm_stylelint.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/npm/stylelint.html.js"), meta: {"title":"@wavesdean/stylelint-config"} }],
  ["/coding/css.html", { loader: () => import(/* webpackChunkName: "coding_css.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/coding/css.html.js"), meta: {"title":"CSS 编码规范"} }],
  ["/coding/html.html", { loader: () => import(/* webpackChunkName: "coding_html.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/coding/html.html.js"), meta: {"title":"HTML 编码规范"} }],
  ["/coding/JavaScript.html", { loader: () => import(/* webpackChunkName: "coding_JavaScript.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/coding/JavaScript.html.js"), meta: {"title":"JavaScript 编码规范"} }],
  ["/coding/node.html", { loader: () => import(/* webpackChunkName: "coding_node.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/coding/node.html.js"), meta: {"title":"Node 编码规范"} }],
  ["/coding/typescript.html", { loader: () => import(/* webpackChunkName: "coding_typescript.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/coding/typescript.html.js"), meta: {"title":"TypeScript 编码规范"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
