# eslint-plugin-zbt 必须已eslint-plugin开头

## 安装

除了本包，你需要同时安装 [ESlint](https://eslint.org/),注意eslint版本8.7.0

```shell
$ npm install eslint-plugin-zbt eslint --save-dev
```

## 使用

### 引入插件

```js
// .eslintrc.js
module.exports = {
  plugins: ['eslint-plugin-zbt'],//先定义插件
  rules: {
    'zbt/no-secret-info': 'error',//再使用，参考官网 eslint-plugin-省略
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

## 支持的规则

- [`no-broad-semantic-versioning`](https://encode-studio-fe.github.io/fe-spec/plugin/no-broad-semantic-versioning.html) 不要指定宽泛的版本范围
- [`no-http-url`](https://encode-studio-fe.github.io/fe-spec/plugin/no-http-url.html) 使用 HTTPS 协议头的 URL，而不是 HTTP
- [`no-js-in-ts-project`](https://encode-studio-fe.github.io/fe-spec/plugin/no-js-in-ts-project.html) 不要在 TS 项目中使用 JS
- [`no-secret-info`](https://encode-studio-fe.github.io/fe-spec/plugin/no-secret-info.html) 不要在代码中直接设置 `password` `token` and `secret` 信息
