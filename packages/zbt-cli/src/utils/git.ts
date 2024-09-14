import execa from 'execa';

/**
 * 获取此次 commit 修改的文件列表
 * @param options - execa.Options，可选，默认为空对象
 * @returns - Promise<string[]>，resolve 为文件路径字符串数组，reject 则返回空数组
 */
export const getCommitFiles = async (options: execa.Options = {}): Promise<string[]> => {
  try {
    const { stdout } = await execa(
      'git',
      [
        'diff', // 执行 git diff 命令，比较暂存区与上次commit的差异
        '--staged', // 只比较暂存区，忽略工作区
        '--diff-filter=ACMR', // 过滤出添加、复制、修改和重命名的文件
        '--name-only', // 只返回文件名，不包含其他信息
        '--ignore-submodules', // 忽略子模块
      ],
      {
        ...options, // 扩展 options 配置
        all: true, // 捕获所有的 stdout 和 stderr 输出
        cwd: options.cwd || process.cwd(), // 执行命令的工作目录，默认为当前进程的工作目录
      },
    );

    // 以空格作为分隔符，分割出每个文件路径，并过滤掉空字符串
    return stdout ? stdout.split(/\s/).filter(Boolean) : [];
  } catch (e) {
    // 如果捕获到异常，返回空数组
    return [];
  }
};

/**
 * 获取未 add 的修改文件数量
 * @param options - execa.Options，可选，默认为空对象
 * @returns - Promise<string>，resolve 为文件路径字符串，reject 则返回空字符串
 */
export const getAmendFiles = async (options: execa.Options = {}): Promise<string> => {
  try {
    const { stdout } = await execa(
      'git',
      [
        'diff', // 执行 git diff 命令，比较工作区与暂存区的差异
        '--name-only', // 只返回文件名，不包含其他信息
      ],
      {
        ...options, // 扩展 options 配置
        all: true, // 捕获所有的 stdout 和 stderr 输出
        cwd: options.cwd || process.cwd(), // 执行命令的工作目录，默认为当前进程的工作目录
      },
    );

    // 返回文件路径字符串
    return stdout;
  } catch (e) {
    // 如果捕获到异常，返回空字符串
    return '';
  }
};
