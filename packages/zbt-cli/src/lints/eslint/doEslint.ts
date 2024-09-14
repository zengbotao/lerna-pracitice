

import { ESLint } from 'eslint'; // 导入eslint库
import fg from 'fast-glob'; // 导入fast-glob库
import { extname, join } from 'path'; // 导入path库
import { Config, PKG, ScanOptions } from '../../types'; // 导入自定义类型
import { ESLINT_FILE_EXT, ESLINT_IGNORE_PATTERN } from '../../utils/constants'; // 导入常量
import { formatESLintResults } from './formatESLintResults'; // 导入格式化函数
import { getESLintConfig } from './getESLintConfig'; // 导入获取ESLint配置函数

// 定义DoESLintOptions类型，继承ScanOptions类型并添加pkg和config属性
export interface DoESLintOptions extends ScanOptions {
  pkg: PKG;
  config?: Config;
}

// 执行ESLint扫描的主要函数
export async function doESLint(options: DoESLintOptions) {
  // 根据options.files是否存在来确定要扫描的文件列表
  let files: string[];
  if (options.files) {
    // 如果提供了文件列表，则只保留符合ESLint文件扩展名的文件
    files = options.files.filter((name) => ESLINT_FILE_EXT.includes(extname(name)));
  } else {
    // 如果未提供文件列表，则使用fast-glob查找所有ESLint文件，并忽略匹配ESLint忽略模式的文件
    files = await fg(`**/*.{${ESLINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`, {
      cwd: options.cwd,
      ignore: ESLINT_IGNORE_PATTERN,
    });
  }

  // 创建一个新的ESLint实例，并传入配置
  const eslint = new ESLint(getESLintConfig(options, options.pkg, options.config));
  // 使用ESLint实例对文件列表进行扫描，得到报告列表
  const reports = await eslint.lintFiles(files);
  // 如果设置了fix选项，则输出修复建议
  if (options.fix) {
    await ESLint.outputFixes(reports);
  }

  // 使用格式化函数处理报告列表，并返回结果
  return formatESLintResults(reports, options.quiet, eslint);
}
