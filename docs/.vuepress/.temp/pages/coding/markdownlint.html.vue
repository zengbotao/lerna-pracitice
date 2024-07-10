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
      ><code><span class="line">lerna create markdownlint-config</span>
<span class="line"><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> markdownlint <span class="token parameter variable">--filter</span> markdownlint-config</span>
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
        全局安装<code v-pre>markdownlint-cli</code>,主目录添加<code v-pre>.markdownlint.json</code>
        中继承本包
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
<span class="line">  <span class="token string-property property">"extends"</span><span class="token operator">:</span> <span class="token string">"@wavesdean/markdownlint-config"</span></span>
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
      ><code><span class="line"><span class="token function">npm</span> i <span class="token parameter variable">-g</span> markdownlint-cli</span>
<span class="line">markdownlint README.md</span>
<span class="line"></span>
<span class="line"></span></code></pre>
      <div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
        <div class="line-number"></div>
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
      ><code><span class="line">pnpm i <span class="token operator">-</span><span class="token constant">D</span>  @wavesdean<span class="token operator">/</span>markdownlint<span class="token operator">-</span>config markdownlint</span>
<span class="line"></span>
<span class="line"><span class="token comment">//主目录添加`.markdownlint.json` 中继承本包</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string-property property">"extends"</span><span class="token operator">:</span> <span class="token string">"@wavesdean/markdownlint-config"</span></span>
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
    <p>run markdownlint &quot;*.md&quot;</p>
    <h2 id="issue" tabindex="-1">
      <a class="header-anchor" href="#issue"><span>issue</span></a>
    </h2>
    <p>lerna 问题根据提示来，需不需要&quot;useWorkspaces&quot;: true,</p>
    <div
      class="language-json line-numbers-mode"
      data-highlighter="prismjs"
      data-ext="json"
      data-title="json"
    >
      <pre
        v-pre
        class="language-json"
      ><code><span class="line">  <span class="token property">"command"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"publish"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"chore(release): publish %v"</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"packages"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"packages/*"</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
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
    <p>
      husky - Git hooks installedpack: info lifecycle lerna-pracitice@undefined lerna ERR! E401
      [UNAUTHORIZED] Login first
    </p>
    <div
      class="language-bash line-numbers-mode"
      data-highlighter="prismjs"
      data-ext="sh"
      data-title="sh"
    >
      <pre
        v-pre
        class="language-bash"
      ><code><span class="line"><span class="token function">npm</span> login</span>
<span class="line">lerna publish</span>
<span class="line"></span></code></pre>
      <div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
        <div class="line-number"></div>
        <div class="line-number"></div>
      </div>
    </div>
    <p>lerna ERR! E402 You must sign up for private packages 解决：在 package.json 中加上</p>
    <div
      class="language-json line-numbers-mode"
      data-highlighter="prismjs"
      data-ext="json"
      data-title="json"
    >
      <pre
        v-pre
        class="language-json"
      ><code><span class="line">“publishConfig”<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token property">"access"</span><span class="token operator">:</span> <span class="token string">"public"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
      <div class="line-numbers" aria-hidden="true" style="counter-reset: line-number 0">
        <div class="line-number"></div>
        <div class="line-number"></div>
        <div class="line-number"></div>
      </div>
    </div>
  </div>
</template>
