

import { ESLint } from 'eslint';
import type { ScanResult } from '../../types';

/**
 * 格式化 ESLint 输出结果
 */
export function formatESLintResults(
  results: ESLint.LintResult[],
  quiet: boolean,
  eslint: ESLint,
): ScanResult[] {
  const rulesMeta = eslint.getRulesMetaForResults(results); // 获取 ESLint 规则的元数据

  // 过滤出有错误或警告的结果，并映射成新的 ScanResult 对象
  return results
    .filter(({ warningCount, errorCount }) => errorCount || warningCount)
    .map(
      ({
        filePath, // 文件路径
        messages, // 消息数组
        errorCount, // 错误数量
        warningCount, // 警告数量
        fixableErrorCount, // 可修复的错误数量
        fixableWarningCount, // 可修复的警告数量
      }) => ({
        filePath, // 文件路径
        errorCount, // 错误数量
        // 如果设置了安静模式，则警告数量为零，否则为真实的警告数量
        warningCount: quiet ? 0 : warningCount, 
        fixableErrorCount, // 可修复的错误数量
        // 如果设置了安静模式，则警告数量为零，否则为真实的警告数量
        fixableWarningCount: quiet ? 0 : fixableWarningCount, 
        messages: messages
          .map(({ line = 0, column = 0, ruleId, message, fatal, severity }) => {
            // 对于每条消息，返回一个新的对象，包含行号、列号、规则ID、URL、消息文本、是否错误等信息
            return {
              line, // 行号
              column, // 列号
              rule: ruleId || '', // 规则ID
              // 如果有文档URL，则使用文档URL，否则为空字符串
              url: rulesMeta[ruleId || '']?.docs?.url || '', 
              // 去除消息文本结尾的句号
              message: message.replace(/([^ ])\.$/u, '$1'), 
              // 如果消息严重级别为 2 或者 fatal 为真，则标记为错误
              errored: fatal || severity === 2, 
            };
          })
          // 过滤出没有 ruleId 的消息
          .filter(({ errored }) => (quiet ? errored : true)) // 如果设置了安静模式，则只保留错误消息
      }),
    );
}

