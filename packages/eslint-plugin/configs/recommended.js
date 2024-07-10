module.exports = {
  plugins: ['@wavesdean/eslint-plugin'],
  rules: {
    '@wavesdean/eslint-plugin/no-http-url': 'warn',
    '@wavesdean/eslint-plugin/no-secret-info': 'error',
  },
};
