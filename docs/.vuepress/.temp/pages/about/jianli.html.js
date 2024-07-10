import comp from 'D:/BaiduNetdiskDownload/seven/lerna-pracitice/docs/.vuepress/.temp/pages/about/jianli.html.vue';
const data = JSON.parse(
  '{"path":"/about/jianli.html","title":"个人信息","lang":"en-US","frontmatter":{},"headers":[],"git":{"updatedTime":1720494076000,"contributors":[{"name":"zengbotao","email":"2898487084@qq.com","commits":2}]},"filePathRelative":"about/jianli.md"}',
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
