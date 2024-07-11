const path = require('path');
const requireAll = require('require-all');
// 参考https://eslint.org/docs/latest/extend/plugins自定义插件
// meta - 有关插件的信息。
// configs - 包含命名配置的对象。
// rules - 包含自定义规则定义的对象。
// processors - 包含命名处理器的对象。
exports.rules = requireAll({
  dirname: path.resolve(__dirname, 'rules'),
});

exports.configs = requireAll({
  dirname: path.resolve(__dirname, 'configs'),
});

exports.processors = {
  '.json': {
    preprocess(text) {
      // As JS file
      return [`module.exports = ${text}`];
    },
  },
};
