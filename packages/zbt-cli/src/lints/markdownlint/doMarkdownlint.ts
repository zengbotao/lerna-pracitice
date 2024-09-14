import fg from 'fast-glob'; // fast-glob库用于查找文件
import { readFile, writeFile } from 'fs-extra'; // fs-extra库用于文件读写操作
import markdownlint, { LintError } from 'markdownlint'; // markdownlint库用于lint markdown文件
import markdownlintRuleHelpers from 'markdownlint-rule-helpers'; // markdownlint规则帮助器
import { extname, join } from 'path'; // path库用于处理文件路径
import { Config, PKG, ScanOptions } from '../../types'; // 导入自定义类型
import { MARKDOWN_LINT_FILE_EXT, MARKDOWN_LINT_IGNORE_PATTERN } from '../../utils/constants'; // 导入常量
import { formatMarkdownlintResults } from './formatMarkdownlintResults'; // 导入格式化结果函数
import { getMarkdownlintConfig } from './getMarkdownlintConfig'; // 导入获取markdownlint配置函数

// 定义DoMarkdownlintOptions类型，继承ScanOptions类型并添加pkg和config属性
export interface DoMarkdownlintOptions extends ScanOptions {
  pkg: PKG;
  config?: Config;
}

// 执行markdownlint的函数
export async function doMarkdownlint(options: DoMarkdownlintOptions) {
  // 根据options中的files或者cwd、include等参数查找所有markdown文件
  let files: string[];
  if (options.files) {
    files = options.files.filter((name) => MARKDOWN_LINT_FILE_EXT.includes(extname(name)));
  } else {
    const pattern = join(
      options.include,
      `**/*.{${MARKDOWN_LINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`,
    );
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: MARKDOWN_LINT_IGNORE_PATTERN,
    });
  }
  
  // 使用markdownlint库进行lint操作
  const results = await markdownlint.promises.markdownlint({
    ...getMarkdownlintConfig(options, options.pkg, options.config),
    files,
  });
  
  // 如果options中开启了fix选项，则对有问题的文件进行修复
  if (options.fix) {
    await Promise.all(
      Object.keys(results).map((filename) => formatMarkdownFile(filename, results[filename])),
    );
    for (const file in results) {
      if (!Object.prototype.hasOwnProperty.call(results, file)) continue;
    }
  }
  
  // 使用formatMarkdownlintResults函数格式化结果并返回
  return formatMarkdownlintResults(results, options.quiet);
}

// 修复markdown文件的函数
async function formatMarkdownFile(filename: string, errors: LintError[]) {
  const fixes = errors?.filter((error) => error.fixInfo); // 过滤出需要修复的错误

  // 如果有需要修复的错误，则读取原始文件内容，应用修复，并重新写入
  if (fixes?.length > 0) {
    const originalText = await readFile(filename, 'utf8'); // 读取原始文件内容
    const fixedText = markdownlintRuleHelpers.applyFixes(originalText, fixes); // 应用修复
    if (originalText !== fixedText) { // 如果内容发生了变化，则写入新的内容
      await writeFile(filename, fixedText, 'utf8'); // 写入新的内容
      return errors.filter((error) => !error.fixInfo); // 返回未修复的错误
    }
  }
  
  // 返回所有的错误
  return errors;
}
