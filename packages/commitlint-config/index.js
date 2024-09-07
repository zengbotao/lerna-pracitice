/*
 * @Description: 
 * @Autor: zengbotao@myhexin.com
 * @Date: 2024-09-07 15:46:30
 * @LastEditTime: 2024-09-07 15:55:56
 */
module.exports = {
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore', 'revert'],
    ],
    'header-case': [
      2,
      'always',
      /^\d{6} (feat|fix|docs|style|test|refactor|chore|revert) .+$/,
    ],
    'body-case': [
      2,
      'always',
      /^\d{6} (feat|fix|docs|style|test|refactor|chore|revert) .+$/,
    ]
  },
};
