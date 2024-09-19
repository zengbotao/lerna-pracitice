'use strict';

const rule = require('../rules/no-http-url');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('no-http-url', rule, {
  valid: [
    {
      code: "var test = 'https://zengbotao.com';",
    },
  ],

  invalid: [
    {
      code: "var test = 'http://zengbotao.com';",
      output: "var test = 'http://zengbotao.com';",
      errors: [
        {
          message: 'Recommended "http://zengbotao.com" switch to HTTPS',
        },
      ],
    },
    {
      code: "<img src='http://zengbotao.com' />",
      output: "<img src='http://zengbotao.com' />",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [
        {
          message: 'Recommended "http://zengbotao.com" switch to HTTPS',
        },
      ],
    },
  ],
});
