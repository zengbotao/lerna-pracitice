import fg from 'fast-glob'; // fast-glob是一个用于查找文件的库
import { readFile, writeFile } from 'fs-extra'; // fs-extra是一个增强版的Node.js文件系统模块
import { extname, join } from 'path'; // path是Node.js内置的一个处理路径的模块
import prettier from 'prettier'; // prettier是一个代码格式化工具
import { ScanOptions } from '../../types'; // 导入扫描选项类型
import { PRETTIER_FILE_EXT, PRETTIER_IGNORE_PATTERN } from '../../utils/constants'; // 导入常量

// 定义DoPrettierOptions类型接口，继承ScanOptions类型接口
export interface DoPrettierOptions extends ScanOptions {}

// 执行Prettier格式化的函数
export async function doPrettier(options: DoPrettierOptions) {
  let files: string[] = []; // 初始化文件列表
  
  // 如果提供了文件列表，则过滤出支持的文件类型
  if (options.files) {
    files = options.files.filter((name) => PRETTIER_FILE_EXT.includes(extname(name)));
  } else {
    // 否则，根据include和ignore选项生成文件列表
    const pattern = join(
      options.include,
      `**/*.{${PRETTIER_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`,
    );
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: PRETTIER_IGNORE_PATTERN,
    });
  }
  
  // 对于每个文件，都进行格式化处理
  await Promise.all(files.map(formatFile));
}

// 格式化文件的函数
async function formatFile(filepath: string) {
  // 读取文件内容
  const text = await readFile(filepath, 'utf8');
  
  // 获取prettier配置
  const options = await prettier.resolveConfig(filepath);
  
  // 使用prettier格式化文件内容
  const formatted = prettier.format(text, { ...options, filepath });
  
  // 将格式化后的内容写回到文件中
  await writeFile(filepath, formatted, 'utf8');
}
