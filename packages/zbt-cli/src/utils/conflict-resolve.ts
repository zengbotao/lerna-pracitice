import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import inquirer from 'inquirer';
import log from './log';
import { PKG_NAME } from './constants';
import type { PKG } from '../types';

// 精确移除依赖
const packageNamesToRemove = [
  '@babel/eslint-parser',
  '@iceworks/spec',
  'babel-eslint',
  'eslint',
  'husky',
  'markdownlint',
  'prettier',
  'stylelint',
  'tslint',
];

// 按前缀移除依赖
const packagePrefixesToRemove = [
  '@typescript-eslint/',
  'eslint-',
  'stylelint-',
  'markdownlint-',
  'commitlint-',
];

/**
 * 待删除的无用配置
 * @param cwd
 */
const checkUselessConfig = (cwd: string): string[] => {
  return []
    .concat(glob.sync('.eslintrc?(.@(yaml|yml|json))', { cwd }))
    .concat(glob.sync('.stylelintrc?(.@(yaml|yml|json))', { cwd }))
    .concat(glob.sync('.markdownlint@(rc|.@(yaml|yml|jsonc))', { cwd }))
    .concat(
      glob.sync('.prettierrc?(.@(cjs|config.js|config.cjs|yaml|yml|json|json5|toml))', { cwd }),
    )
    .concat(glob.sync('tslint.@(yaml|yml|json)', { cwd }))
    .concat(glob.sync('.kylerc?(.@(yaml|yml|json))', { cwd }));
};

/**
 * 待重写的配置
 * @param cwd
 */
const checkReWriteConfig = (cwd: string) => {
  return glob
    .sync('**/*.ejs', { cwd: path.resolve(__dirname, '../config') })
    .map((name) => name.replace(/^_/, '.').replace(/\.ejs$/, ''))
    .filter((filename) => fs.existsSync(path.resolve(cwd, filename)));
};

/**
 * 检查并清理项目中的冲突依赖和配置。
 * 该函数会检查项目中的package.json，识别并移除与指定包冲突的依赖和配置文件。
 * 
 * @param cwd 项目根目录路径。
 * @param rewriteConfig 是否重写配置文件，如果未提供，将提示用户确认。
 * @returns 修改后的package.json内容。
 */
export default async (cwd: string, rewriteConfig?: boolean) => {
  // 解析项目中的package.json文件路径
  const pkgPath = path.resolve(cwd, 'package.json');
  // 读取并解析package.json文件内容
  const pkg: PKG = fs.readJSONSync(pkgPath);
  // 获取所有依赖包名称，包括dependencies和devDependencies
  const dependencies = [].concat(
    Object.keys(pkg.dependencies || {}),
    Object.keys(pkg.devDependencies || []),
  );
  // 过滤出需要移除的依赖包
  const willRemovePackage = dependencies.filter(
    (name) =>
      packageNamesToRemove.includes(name) ||
      packagePrefixesToRemove.some((prefix) => name.startsWith(prefix)),
  );
  // 检查并获取无用的配置文件列表
  const uselessConfig = checkUselessConfig(cwd);
  // 检查并获取需要重写的配置文件列表
  const reWriteConfig = checkReWriteConfig(cwd);
  // 计算需要更改的项的总数
  const willChangeCount = willRemovePackage.length + uselessConfig.length + reWriteConfig.length;

  // 如果存在需要更改的项，提示用户确认
  if (willChangeCount > 0) {
    log.warn(`检测到项目中存在可能与 ${PKG_NAME} 冲突的依赖和配置，为保证正常运行将`);

    if (willRemovePackage.length > 0) {
      log.warn('删除以下依赖：');
      log.warn(JSON.stringify(willRemovePackage, null, 2));
    }

    if (uselessConfig.length > 0) {
      log.warn('删除以下配置文件：');
      log.warn(JSON.stringify(uselessConfig, null, 2));
    }

    if (reWriteConfig.length > 0) {
      log.warn('覆盖以下配置文件：');
      log.warn(JSON.stringify(reWriteConfig, null, 2));
    }

    if (typeof rewriteConfig === 'undefined') {
      const { isOverWrite } = await inquirer.prompt({
        type: 'confirm',
        name: 'isOverWrite',
        message: '请确认是否继续：',
      });

      if (!isOverWrite) process.exit(0);
    } else if (!rewriteConfig) {
      process.exit(0);
    }
  }

  // 删除无用的配置文件
  for (const name of uselessConfig) {
    fs.removeSync(path.resolve(cwd, name));
  }

  // 修正 package.json
  delete pkg.eslintConfig;
  delete pkg.eslintIgnore;
  delete pkg.stylelint;
  for (const name of willRemovePackage) {
    delete (pkg.dependencies || {})[name];
    delete (pkg.devDependencies || {})[name];
  }
  // 将修改后的package.json写回文件
  fs.writeFileSync(path.resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8');

  return pkg;
};
