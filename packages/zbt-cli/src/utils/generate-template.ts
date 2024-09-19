import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';
import glob from 'glob';
import ejs from 'ejs';
import {
  ESLINT_IGNORE_PATTERN,
  STYLELINT_FILE_EXT,
  STYLELINT_IGNORE_PATTERN,
  MARKDOWN_LINT_IGNORE_PATTERN,
} from './constants';


/**
 * 根据模板生成文件，可以根据不同的模板生成不同的文件，如.eslintignore，.stylelintignore等。
 * @param {string} cwd - 当前工作目录。
 * @param {Record<string, any>} data - 数据对象，包含需要插入到模板中的数据。
 */
export default (cwd: string, data: Record<string, any>) => {
  // 获取模板路径
  const templatePath = path.resolve(__dirname, '../config');
  
  // 获取所有模板文件路径
  const templates = glob.sync(`**/*.ejs`, { cwd: templatePath });
  
  // 遍历每个模板
  for (const name of templates) {
    // 获取输出文件路径
    const filepath = path.resolve(cwd, name.replace(/\.ejs$/, '').replace(/^_/, '.'));
    
    // 使用EJS模板引擎渲染模板
    const content = ejs.render(fs.readFileSync(path.resolve(templatePath, name), 'utf8'), {
      eslintIgnores: ESLINT_IGNORE_PATTERN,
      stylelintExt: STYLELINT_FILE_EXT,
      stylelintIgnores: STYLELINT_IGNORE_PATTERN,
      markdownLintIgnores: MARKDOWN_LINT_IGNORE_PATTERN,
      ...data,
    });

    // 如果内容为空，则跳过生成文件
    if (!content.trim()) continue;

    // 写入文件
    fs.outputFileSync(filepath, content, 'utf8');
  }
};

