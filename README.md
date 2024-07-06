<!--
 * @Description:
 * @Autor: zengbotao@myhexin.com
 * @Date: 2024-07-06 15:42:34
 * @LastEditTime: 2024-07-06 17:44:17
-->

[lerna](https://github.com/lerna/lerna)

# 笔记

前端工程化篇---- monorepo、lerna
解决了多个包互相依赖，且发布时需要手动维护多个包的问题
https://article.juejin.cn/post/6964360888430264351
https://blog.csdn.net/xgangzai/article/details/115423425

pnpm link <dir> 和 pnpm link --dir <dir> 之间的区别
pnpm link <dir> 将包从 <dir> 链接到执行命令的包的 node_modules。pnpm link --dir <dir> 将包从当前工作目录链接到 <dir>。

# The current directory is foo

pnpm link ../bar

- foo
  - node_modules
    - bar -> ../../bar
- bar

# The current directory is bar

pnpm link --dir ../foo

- foo
  - node_modules
    - bar -> ../../bar
- bar
