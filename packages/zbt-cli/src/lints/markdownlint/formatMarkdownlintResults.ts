import markdownlint from 'markdownlint'; // 引入 markdownlint 库
import type { ScanResult } from '../../types'; // 引入 ScanResult 类型

/**
 * 格式化 markdownlint 输出结果
 * 
 * @param results - markdownlint 输出的 LintResults 对象
 * @param quiet - 布尔值，决定是否静默模式
 * @returns 格式化后的 ScanResult 数组
 */
export function formatMarkdownlintResults(
  results: markdownlint.LintResults, // markdownlint 输出的 LintResults 对象
  quiet: boolean, // 布尔值，决定是否静默模式
): ScanResult[] { // 返回格式化后的 ScanResult 数组
  const parsedResults = []; // 存储解析后的结果

  // 遍历结果中的每个文件
  for (const file in results) {
    if (!Object.prototype.hasOwnProperty.call(results, file) || quiet) continue; // 如果文件不在结果中或者处于静默模式，则继续下一次迭代

    // 初始化警告计数和可修复警告计数
    let warningCount = 0;
    let fixableWarningCount = 0;

    // 将每个文件的警告消息映射为新的格式
    const messages = results[file].map(
      ({ lineNumber, ruleNames, ruleDescription, ruleInformation, errorRange, fixInfo }) => {
        if (fixInfo) fixableWarningCount++; // 如果有 fixInfo，则增加可修复警告计数
        warningCount++; // 增加警告计数

        // 返回新的消息对象
        return {
          line: lineNumber, // 行号
          column: Array.isArray(errorRange) ? errorRange[0] : 1, // 列号
          rule: ruleNames[0], // 规则名称
          url: ruleInformation, // 规则信息链接
          message: ruleDescription, // 规则描述
          errored: false, // 是否错误
        };
      },
    );

    // 将新的文件对象添加到解析结果数组中
    parsedResults.push({
      filePath: file, // 文件路径
      messages, // 消息数组
      errorCount: 0, // 错误计数
      warningCount, // 警告计数
      fixableErrorCount: 0, // 可修复错误计数
      fixableWarningCount, // 可修复警告计数
    });
  }

  // 返回解析结果数组
  return parsedResults;
}

