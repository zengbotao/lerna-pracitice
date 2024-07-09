export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"不问为何机会不来，只问机会来时你准备好了没"} }],
  ["/coding/commitlint.html", { loader: () => import(/* webpackChunkName: "coding_commitlint.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/coding/commitlint.html.js"), meta: {"title":"设置 git hook"} }],
  ["/coding/markdownlint.html", { loader: () => import(/* webpackChunkName: "coding_markdownlint.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/coding/markdownlint.html.js"), meta: {"title":""} }],
  ["/about/jianli.html", { loader: () => import(/* webpackChunkName: "about_jianli.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/about/jianli.html.js"), meta: {"title":"个人信息"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
