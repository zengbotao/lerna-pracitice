import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';

export default defineUserConfig({
  bundler: viteBundler(),
  title: 'zengbotao-pk',
  theme: defaultTheme({
    navbar: [
      { text: '关于我', link: '/about/jianli.md' },
      { text: 'git项目', link: 'https://github.com/zengbotao' },
    ],
    logo: '/assets/img/logo.png',
    author: 'zengbotao',
    sidebar: [
      {
        text: '工程规范',
        prefix: '/coding/',
        link: '/coding/',
        children: [
          {
            text: 'commitlint-config',
            link: 'commitlint.md',
          },
          {
            text: 'markdownlint-config',
            link: 'markdownlint.md',
          },
        ],
      },
    ],
  }),
});
