<!--
 * @Description:
 * @Autor: zengbotao@myhexin.com
 * @Date: 2024-07-07 10:00:57
 * @LastEditTime: 2024-07-07 12:18:42
-->

# `markdownlint-config`

> TODO: description

## create

```bash
lerna create markdownlint-config
pnpm add -D markdownlint --filter markdownlint-config
#添加名为index.json的config，修改packsge.json中的name以及"main": "index.json"

```

## dev test

1. 全局安装`markdownlint-cli`,主目录添加`.markdownlint.json` 中继承本包

```js
{
  "extends": "@wavesdean/markdownlint-config"
}
```

```bash
npm i -g markdownlint-cli
markdownlint README.md

```

## Usage

```js
pnpm add -D  @wavesdean/markdownlint-config markdownlint --filter markdownlint-config

//主目录添加`.markdownlint.json` 中继承本包
{
  "extends": "markdownlint-config-encode"
}
```

## issue

lerna 问题根据提示来，需不需要"useWorkspaces": true,

```json
  "command": {
    "publish": {
      "message": "chore(release): publish %v"
    },
    "packages": ["packages/*"]
  }
```

husky - Git hooks installedpack: info lifecycle lerna-pracitice@undefined
lerna ERR! E401 [UNAUTHORIZED] Login first

```bash
npm login
lerna publish
```
lerna ERR! E402 You must sign up for private packages
解决：在package.json中加上
```json
“publishConfig”: {
“access”: “public”
}
```