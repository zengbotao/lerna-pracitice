<template>
  <div>
    <h2 id="self-create" tabindex="-1">
      <a class="header-anchor" href="#self-create"><span>self create</span></a>
    </h2>
    <div
      class="language-bash line-numbers-mode"
      data-highlighter="prismjs"
      data-ext="sh"
      data-title="sh"
    >
      <pre
        v-pre
        class="language-bash"
      ><code><span class="line">lerna create commitlint-config </span>
<span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> conventional-changelog-conventionalcommits <span class="token parameter variable">--filter</span> commitlint-config </span>
<span class="line"><span class="token comment">#添加名为index.json的config，修改packsge.json中的name,main.publishConfig,repository</span></span>
<span class="line"></span></code></pre>
      <div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
        <div class="line-number"></div>
        <div class="line-number"></div>
        <div class="line-number"></div>
      </div>
    </div>
    <h2 id="dev-test" tabindex="-1">
      <a class="header-anchor" href="#dev-test"><span>dev test</span></a>
    </h2>
    <ol>
      <li>
        全局安装<code v-pre>@commitlint/cli</code>,主目录添加<code v-pre>commitlint.config.js</code>
        中集成本包
      </li>
    </ol>
    <div
      class="language-javascript line-numbers-mode"
      data-highlighter="prismjs"
      data-ext="js"
      data-title="js"
    >
      <pre
        v-pre
        class="language-javascript"
      ><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string-property property">"extends"</span><span class="token operator">:</span> <span class="token string">"@wavesdean/commitlint-config"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
      <div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
        <div class="line-number"></div>
        <div class="line-number"></div>
        <div class="line-number"></div>
      </div>
    </div>
    <div
      class="language-bash line-numbers-mode"
      data-highlighter="prismjs"
      data-ext="sh"
      data-title="sh"
    >
      <pre
        v-pre
        class="language-bash"
      ><code><span class="line"><span class="token function">pnpm</span> i -save-dev  @wavesdean/commitlint-config @commitlint/cli conventional-changelog-conventionalcommits</span>
<span class="line"></span>
<span class="line"></span></code></pre>
      <div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
        <div class="line-number"></div>
        <div class="line-number"></div>
      </div>
    </div>
    <h2 id="usage" tabindex="-1">
      <a class="header-anchor" href="#usage"><span>Usage</span></a>
    </h2>
    <div
      class="language-javascript line-numbers-mode"
      data-highlighter="prismjs"
      data-ext="js"
      data-title="js"
    >
      <pre
        v-pre
        class="language-javascript"
      ><code><span class="line">pnpm i <span class="token operator">-</span>save<span class="token operator">-</span>dev  @wavesdean<span class="token operator">/</span>commitlint<span class="token operator">-</span>config @commitlint<span class="token operator">/</span>cli conventional<span class="token operator">-</span>changelog<span class="token operator">-</span>conventionalcommits</span>
<span class="line"></span>
<span class="line"><span class="token comment">//主目录添加`commitlint.config.js` 中继承本包</span></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string-property property">"extends"</span><span class="token operator">:</span> <span class="token string">"@wavesdean/commitlint-config"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
      <div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
        <div class="line-number"></div>
        <div class="line-number"></div>
        <div class="line-number"></div>
        <div class="line-number"></div>
        <div class="line-number"></div>
        <div class="line-number"></div>
      </div>
    </div>
    <h1 id="设置-git-hook" tabindex="-1">
      <a class="header-anchor" href="#设置-git-hook"><span>设置 git hook</span></a>
    </h1>
    <p>
      可通过
      <a href="https://www.npmjs.com/package/husky" target="_blank" rel="noopener noreferrer"
        >husky</a
      >
      设置在 <code v-pre>git commit</code> 时触发 <code v-pre>commitlint</code>。
    </p>
    <p>首先安装 husky：</p>
    <div
      class="language-bash line-numbers-mode"
      data-highlighter="prismjs"
      data-ext="sh"
      data-title="sh"
    >
      <pre
        v-pre
        class="language-bash"
      ><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> husky --save-dev</span>
<span class="line"></span></code></pre>
      <div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
        <div class="line-number"></div>
      </div>
    </div>
    <p>然后执行添加<code v-pre>commit-msg</code>:</p>
    <div
      class="language-bash line-numbers-mode"
      data-highlighter="prismjs"
      data-ext="sh"
      data-title="sh"
    >
      <pre
        v-pre
        class="language-bash"
      ><code><span class="line">husky <span class="token function">install</span></span>
<span class="line">npx husky <span class="token function">add</span> .husky/commit-msg <span class="token string">'npx commitlint --edit $1'</span></span>
<span class="line"></span></code></pre>
      <div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
        <div class="line-number"></div>
        <div class="line-number"></div>
      </div>
    </div>
    <p>
      更多信息可参考
      <a
        href="https://commitlint.js.org/#/guides-local-setup?id=install-husky"
        target="_blank"
        rel="noopener noreferrer"
        >commitlint 文档</a
      >。
    </p>
  </div>
</template>
