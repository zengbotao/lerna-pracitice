/*
 * @Description:https://commitlint.js.org/reference/plugins.html
 * @Autor: zengbotao@myhexin.com
 * @Date: 2024-09-07 15:46:30
 * @LastEditTime: 2024-09-08 23:43:14
 */
module.exports = {
  // parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'ths-rule': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'ths-rule': (config) => {
          const types = ['feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore', 'revert'];
          let [taskNum, type, msg] = config?.header.split(' ');
          if (!/\d{6}/.exec(taskNum)) return [false, '未输入正确的任务号，任务号为6位数字'];
          if (!types.includes(type)) return [false, '未输入正确修改类型(feat|fix|docs|style|test|refactor|chore|revert)'];
          if (!msg.length) return [false, '未输入描述信息'];
          return [true, 'commit规范审核通过'];
        },
      },
    },
  ],
};
