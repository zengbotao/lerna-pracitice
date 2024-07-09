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
        text: 'npm包',
        prefix: '/npm/',
        link: '/npm/',
        children: [
          {
            text: 'commitlint-config手册',
            link: 'commitlint.md',
          },
          {
            text: 'markdownlint-config手册',
            link: 'markdownlint.md',
          },
        ],
      },
      {
        text: '编码规范',
        prefix: '/coding/',
        link: '/coding/',
        children: [
          {
            text: 'css规范',
            link: 'css.md',
          },
          {
            text: 'html规范',
            link: 'html.md',
          },
          {
            text: 'JavaScript规范',
            link: 'JavaScript.md',
          },
          {
            text: 'node规范',
            link: 'node.md',
          },
          {
            text: 'typescript规范',
            link: 'typescript.md',
          },
        ],
      },
    ],
  }),
});
