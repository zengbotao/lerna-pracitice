export const themeData = JSON.parse("{\"navbar\":[{\"text\":\"关于我\",\"link\":\"/about/jianli.md\"},{\"text\":\"git项目\",\"link\":\"https://github.com/zengbotao\"}],\"logo\":\"/assets/img/logo.png\",\"author\":\"zengbotao\",\"sidebar\":[{\"text\":\"zbt的npm包\",\"prefix\":\"/npm/\",\"link\":\"/npm/\",\"children\":[{\"text\":\"commitlint-config手册\",\"link\":\"commitlint.md\"},{\"text\":\"markdownlint-config手册\",\"link\":\"markdownlint.md\"},{\"text\":\"stylelint-config手册\",\"link\":\"stylelint.md\"},{\"text\":\"eslint-config手册\",\"link\":\"eslint.md\"}]},{\"text\":\"编码规范\",\"prefix\":\"/coding/\",\"link\":\"/coding/\",\"children\":[{\"text\":\"css规范\",\"link\":\"css.md\"},{\"text\":\"html规范\",\"link\":\"html.md\"},{\"text\":\"JavaScript规范\",\"link\":\"JavaScript.md\"},{\"text\":\"node规范\",\"link\":\"node.md\"},{\"text\":\"typescript规范\",\"link\":\"typescript.md\"}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
