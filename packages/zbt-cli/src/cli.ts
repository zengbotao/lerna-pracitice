#!/usr/bin/env node
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import glob from 'glob'; //一个用于从文件系统中检索匹配特定模式的文件集合的工具
import { program } from 'commander';
import spawn from 'cross-spawn'; //是一个包装器，用于 child_process 模块，它提供了一种跨平台的方式来解析和执行命令。这意味着无论您在哪个操作系统上运行 Node.js 应用程序，cross-spawn 都能以相同的方式处理命令。
import { execSync } from 'child_process'; //Node.js 的一个内置模块，它允许您创建子进程来执行系统命令。这个模块提供了多种方法来启动和管理子进程，例如 spawn(), exec(), 和 fork()。
import init from './actions/init';
import scan from './actions/scan';
import update from './actions/update';
import log from './utils/log';
import printReport from './utils/print-report';
import npmType from './utils/npm-type';
import { getCommitFiles, getAmendFiles } from './utils/git';
import generateTemplate from './utils/generate-template';
import { PKG_NAME, PKG_VERSION } from './utils/constants';

const cwd = process.cwd();

/**
 * 若无 node_modules，则帮用户 install（否则会找不到 config）
 */
/**
 * 安装依赖项，如果项目中尚未安装。
 * 该方法检查项目中是否存在任何 Lint 配置文件（如 .eslintrc、.stylelintrc 等）。
 * 如果发现 Lint 配置文件且项目尚未安装依赖，它将尝试使用项目的默认包管理器（npm 或 yarn）来安装依赖。
 */
const installDepsIfThereNo = async () => {
  // 查找项目中的所有 Lint 配置文件（.eslintrc、.stylelintrc 等）
  const lintConfigFiles = [].concat(
    glob.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('.markdownlint(.@(yaml|yml|json))', { cwd }),
  );

  // 获取 node_modules 目录的绝对路径
  const nodeModulesPath = path.resolve(cwd, 'node_modules');

  // 检查 node_modules 目录是否存在以及是否有 Lint 配置文件
  if (!fs.existsSync(nodeModulesPath) && lintConfigFiles.length > 0) {
    // 获取项目的默认包管理器（npm 或 yarn）
    const npm = await npmType;

    // 记录日志，告知用户项目尚未安装依赖，正在进行安装
    log.info(`使用项目 Lint 配置，检测到项目未安装依赖，将进行安装（执行 ${npm} install）`);

    // 在项目目录中执行安装命令
    execSync(`cd ${cwd} && ${npm} i`);
  }
};

program
  .version(PKG_VERSION)
  .description(
    `${PKG_NAME} 是 前端编码规范工程化 的配套 Lint 工具，并为项目配置 git commit 卡点，降低项目实施规范的成本`,
  );

program
  .command('init')
  .description('一键接入：为项目初始化规范工具和配置，可以根据项目类型和需求进行定制')
  .option('--vscode', '写入.vscode/setting.json配置')
  .action(async (cmd) => {
    if (cmd.vscode) {
      const configPath = path.resolve(cwd, `${PKG_NAME}.config.js`);
      generateTemplate(cwd, require(configPath), true);
    } else {
      await init({
        cwd,
        checkVersionUpdate: true,
      });
    }
  });

program
  .command('scan')
  .description('一键扫描：对项目进行代码规范问题扫描')
  .option('-q, --quiet', '仅报告错误信息 - 默认: false')
  .option('-o, --output-report', '输出扫描出的规范问题日志')
  .option('-i, --include <dirpath>', '指定要进行规范扫描的目录')
  .option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则')
  .action(async (cmd) => {
    await installDepsIfThereNo(); //安装依赖

    const checking = ora();
    checking.start(`执行 ${PKG_NAME} 代码检查`);

    const { results, errorCount, warningCount, runErrors } = await scan({
      cwd,
      fix: false,
      include: cmd.include || cwd,
      quiet: Boolean(cmd.quiet),
      outputReport: Boolean(cmd.outputReport),
      ignore: cmd.ignore, // 对应 --no-ignore
    });
    let type = 'succeed';
    if (runErrors.length > 0 || errorCount > 0) {
      type = 'fail';
    } else if (warningCount > 0) {
      type = 'warn';
    }

    checking[type]();
    if (results.length > 0) printReport(results, false);

    // 输出 lint 运行错误
    runErrors.forEach((e) => console.log(e));
  });

program
  .command('commit-msg-scan')
  .description('commit message 检查: git commit 时对 commit message 进行检查')
  .action(() => {
    const result = spawn.sync('commitlint', ['-E', 'HUSKY_GIT_PARAMS'], { stdio: 'inherit' });
    // 同步方法可能会阻塞主线程，直到子进程完成或发生错误。在生产环境中，通常建议使用异步方法，如 spawn() 函数，以避免阻塞主线程
    if (result.status !== 0) {
      process.exit(result.status);
    }
  });

program
  .command('commit-file-scan')
  .description('代码提交检查: git commit 时对提交代码进行规范问题扫描')
  .option('-s, --strict', '严格模式，对 warn 和 error 问题都卡口，默认仅对 error 问题卡口')
  .action(async (cmd) => {
    await installDepsIfThereNo();//安装依赖

    // git add 检查
    const files = await getAmendFiles();
    if (files) log.warn(`[${PKG_NAME}] changes not staged for commit: \n${files}\n`);

    const checking = ora();
    checking.start(`执行 ${PKG_NAME} 代码提交检查`);

    const { results, errorCount, warningCount } = await scan({
      cwd,
      include: cwd,
      quiet: !cmd.strict,
      files: await getCommitFiles(),
    });

    if (errorCount > 0 || (cmd.strict && warningCount > 0)) {
      checking.fail();
      printReport(results, false);
      process.exitCode = 1;
    } else {
      checking.succeed();
    }
  });

program
  .command('fix')
  .description('一键修复：自动修复项目的代码规范扫描问题')
  .option('-i, --include <dirpath>', '指定要进行修复扫描的目录')
  .option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则')
  .action(async (cmd) => {
    await installDepsIfThereNo();

    const checking = ora();
    checking.start(`执行 ${PKG_NAME} 代码修复`);

    const { results } = await scan({
      cwd,
      fix: true,
      include: cmd.include || cwd,
      ignore: cmd.ignore, // 对应 --no-ignore
    });

    checking.succeed();
    if (results.length > 0) printReport(results, true);
  });

program
  .command('update')
  .description(`更新 ${PKG_NAME} 至最新版本`)
  .action(() => update(true));

program.parse(process.argv);
