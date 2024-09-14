# eslint-plugin-zbt 必须已 eslint-plugin 开头

## 安装

除了本包，你需要同时安装 [ESlint](https://eslint.org/),注意 eslint 版本 8.7.0

```shell
$ npm install eslint-plugin-zbt eslint --save-dev
```

## 使用

### 引入插件

```js
// .eslintrc.js
module.exports = {
  plugins: ['eslint-plugin-zbt'], //先定义插件
  rules: {
    'zbt/no-secret-info': 'error', //再使用，参考官网 eslint-plugin-省略
  },
};
```

### 使用 presets

```js
// .eslintrc.js
module.exports = {
  extends: 'plugin:eslint-plugin-zbt/recommended',
};
```
