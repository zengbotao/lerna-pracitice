

import fg from 'fast-glob'; // 导入fast-glob模块进行文件查找操作
import { extname, join } from 'path'; // 导入path模块进行路径操作
import stylelint from 'stylelint'; // 导入stylelint进行样式检查
import { PKG, ScanOptions } from '../../types'; // 导入自定义类型定义
import { STYLELINT_FILE_EXT, STYLELINT_IGNORE_PATTERN } from '../../utils/constants'; // 导入常量定义
import { formatStylelintResults } from './formatStylelintResults'; // 导入格式化stylelint结果函数
import { getStylelintConfig } from './getStylelintConfig'; // 导入获取stylelint配置函数

// 定义DoStylelintOptions类型接口，继承ScanOptions并包含pkg属性
export interface DoStylelintOptions extends ScanOptions {
  pkg: PKG;
}

// 执行stylelint的函数
export async function doStylelint(options: DoStylelintOptions) {
  // 根据传入的options筛选需要进行stylelint的文件
  let files: string[];
  if (options.files) {
    files = options.files.filter((name) => STYLELINT_FILE_EXT.includes(extname(name)));
  } else {
    const pattern = join(
      options.include,
      `**/*.{${STYLELINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`,
    );
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: STYLELINT_IGNORE_PATTERN,
    });
  }
  
  // 使用stylelint对筛选出来的文件进行lint检查
  const data = await stylelint.lint({
    ...getStylelintConfig(options, options.pkg, options.config),
    files,
  });
  
  // 将stylelint的结果数据进行格式化
  return formatStylelintResults(data.results, options.quiet);
}
