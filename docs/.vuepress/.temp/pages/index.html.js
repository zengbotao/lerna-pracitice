import comp from 'D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/index.html.vue';
const data = JSON.parse(
  '{"path":"/","title":"不问为何机会不来，只问机会来时你准备好了没","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"欢迎浏览","slug":"欢迎浏览","link":"#欢迎浏览","children":[]}],"git":{"updatedTime":1720494171000,"contributors":[{"name":"zengbotao","email":"2898487084@qq.com","commits":2}]},"filePathRelative":"README.md"}',
);
export { comp, data };

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data);
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data);
  });
}
