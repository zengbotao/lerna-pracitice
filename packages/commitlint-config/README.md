<!--
 * @Description: 
 * @Autor: zengbotao@myhexin.com
 * @Date: 2024-09-07 15:46:30
 * @LastEditTime: 2024-09-08 23:44:28
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
pnpm i -save-dev  @wavesdean/commitlint-config @commitlint/cli conventional-changelog-conventionalcommits

```

## Usage

```js
pnpm i -save-dev  @wavesdean/commitlint-config @commitlint/cli conventional-changelog-conventionalcommits

"@commitlint/cli": "^19.3.0",
"conventional-changelog-conventionalcommits": "^8.0.0",
"husky": "^9.0.11"

//主目录添加`c` 中继承本包
module.exports ={
  "extends": ["@wavesdean/commitlint-config"]
}

```
commit规范必须是 6位数字的任务号 type 描述
type包含feat|fix|docs|style|test|refactor|chore|revert


# 设置 git hook

可通过 [husky](https://www.npmjs.com/package/husky) 设置在 `git commit` 时触发 `commitlint`。

首先安装 husky：

```bash
npm install husky --save-dev
```

然后执行添加`commit-msg`:

```bash
npx husky install
npx husky add .husky/commit-msg

#!/usr/bin/env sh

npx --no -- commitlint --edit
```

conventional-changelog-conventionalcommits暂时取消了该预设
chore: run tests on travis ci
fix(server): send cors headers
更多信息可参考 [commitlint 文档](https://commitlint.js.org/#/guides-local-setup?id=install-husky)。
