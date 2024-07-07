<!--
 * @Description:
 * @Autor: zengbotao@myhexin.com
 * @Date: 2024-07-07 10:00:57
 * @LastEditTime: 2024-07-07 15:35:08
-->

## self create

```bash
lerna create commitlint-config 
pnpm add -D conventional-changelog-conventionalcommits --filter commitlint-config 
#添加名为index.json的config，修改packsge.json中的name,main.publishConfig,repository
```

## dev test

1. 全局安装`@commitlint/cli`,主目录添加`commitlint.config.js` 中集成本包

```js
{
  "extends": "@wavesdean/commitlint-config"
}
```

```bash
npm i @commitlint/cli @wavesdean/commitlint-config --save-dev

```

## Usage

```js
pnpm i -D  @wavesdean/commitlint-config @commitlint/cli

//主目录添加`commitlint.config.js` 中继承本包
module.exports ={
  "extends": "@wavesdean/commitlint-config"
}
```
# 设置 git hook

可通过 [husky](https://www.npmjs.com/package/husky) 设置在 `git commit` 时触发 `commitlint`。

首先安装 husky：

```bash
npm install husky --save-dev
```

然后执行添加`commit-msg`:

```bash
husky install
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

更多信息可参考 [commitlint 文档](https://commitlint.js.org/#/guides-local-setup?id=install-husky)。