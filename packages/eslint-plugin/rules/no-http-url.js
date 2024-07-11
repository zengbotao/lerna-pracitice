const RULE_NAME = 'no-http-url';
//参考https://eslint.org/docs/latest/extend/custom-rule-tutorial自定义规则
module.exports = {
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    fixable: null,
  },
  create(context) {
    return {
      //定义规则的 create 函数，该函数接受 context 对象并返回一个对象，
      //其中包含要处理的每个语法节点类型的属性。
      //在本例中，您想要处理 Literal 字面量节点。您可以选择任何 ESTree 节点类型或选择器。
      //https://www.jianshu.com/p/b3f1ff0b3cdf ESTree 节点类型
      // {
      //   type: 'Literal',
      //   loc: SourceLocation {
      //     start: Position { line: 1, column: 11 },
      //     end: Position { line: 1, column: 34 }
      //   },
      //   range: [ 11, 34 ],
      //   value: 'https://chenghuai.com',
      //   raw: "'https://chenghuai.com'",
      //   parent: <ref *1> Node {
      //     type: 'VariableDeclarator',
      //     loc: SourceLocation { start: [Position], end: [Position] },
      //     range: [ 4, 34 ],
      //     id: Node {
      //       type: 'Identifier',
      //       loc: [SourceLocation],
      //       range: [Array],
      //       name: 'test',
      //       parent: [Circular *1]
      //     },
      //     init: [Circular *2],
      //     parent: Node {
      //       type: 'VariableDeclaration',
      //       loc: [SourceLocation],
      //       range: [Array],
      //       declarations: [Array],
      //       kind: 'var',
      //       parent: [Node]
      //     }
      //   }
      // }
      Literal: function handleRequires(node) {
       
        if (node.value && typeof node.value === 'string' && node.value.indexOf('http:') === 0) {
          context.report({
            node,
            message: "Recommended '{{url}} 'switch to HTTPS",//meta中定义的数据
            data: {
              url: node.value,
            },
          });
           console.log(node);
        }
      },
    };
  },
};
