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
 * 将 VSCode 配置文件与指定的内容进行合并。
 * 如果目标文件不存在，则直接返回内容。
 * 
 * @param {string} filepath - VSCode 配置文件的路径。
 * @param {string} content - 需要合并的配置内容。
 * @returns {string} 合并后的配置内容。如果合并失败，则返回空字符串。
 */
const mergeVSCodeConfig = (filepath: string, content: string) => {
  // 如果目标文件不存在，则直接返回内容。
  if (!fs.existsSync(filepath)) return content;
  
  try {
    const targetData = fs.readJSONSync(filepath);
    const sourceData = JSON.parse(content);
    // 使用 Lodash 的 _.mergeWith() 方法来合并两个对象，
    // 如果两个字段都是数组，则将它们合并并去重。
    return JSON.stringify(
      _.mergeWith(targetData, sourceData, (target, source) => {
        if (Array.isArray(target) && Array.isArray(source)) {
          return [...new Set(source.concat(target))];
        }
      }),
      null,
      2, // 缩进两个空格。
    );
  } catch (e) {
    // 如果在读取或解析文件时出现错误，则返回空字符串。
    return '';
  }
};


/**
 * 根据模板生成文件，可以根据不同的模板生成不同的文件，如.eslintignore，.stylelintignore等。
 * @param {string} cwd - 当前工作目录。
 * @param {Record<string, any>} data - 数据对象，包含需要插入到模板中的数据。
 * @param {boolean} [vscode] - 是否生成vscode配置文件，默认为false。
 */
export default (cwd: string, data: Record<string, any>, vscode?: boolean) => {
  // 获取模板路径
  const templatePath = path.resolve(__dirname, '../config');
  
  // 获取所有模板文件路径
  const templates = glob.sync(`${vscode ? '_vscode' : '**'}/*.ejs`, { cwd: templatePath });
  
  // 遍历每个模板
  for (const name of templates) {
    // 获取输出文件路径
    const filepath = path.resolve(cwd, name.replace(/\.ejs$/, '').replace(/^_/, '.'));
    
    // 使用EJS模板引擎渲染模板
    let content = ejs.render(fs.readFileSync(path.resolve(templatePath, name), 'utf8'), {
      eslintIgnores: ESLINT_IGNORE_PATTERN,
      stylelintExt: STYLELINT_FILE_EXT,
      stylelintIgnores: STYLELINT_IGNORE_PATTERN,
      markdownLintIgnores: MARKDOWN_LINT_IGNORE_PATTERN,
      ...data,
    });

    // 如果生成的是vscode配置文件，则合并配置
    if (/^_vscode/.test(name)) {
      content = mergeVSCodeConfig(filepath, content);
    }

    // 如果内容为空，则跳过生成文件
    if (!content.trim()) continue;

    // 写入文件
    fs.outputFileSync(filepath, content, 'utf8');
  }
};

