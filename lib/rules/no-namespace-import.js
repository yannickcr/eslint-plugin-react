/**
 * @fileoverview No namespace import on React
 * @author Angelo Abdoelsamath
 */

'use strict';

const docsUrl = require('../util/docsUrl');

module.exports = {
  meta: {
    docs: {
      description: 'No namespace import on React',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-namespace-import')
    },
    fixable: true
  },
  create(context) {
    // ignore non-modules
    if (context.parserOptions.sourceType !== 'module') {
      return {};
    }

    const message = 'Namespace import is not allowed on React.';

    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'react') {
          return;
        }

        node.specifiers.forEach(importNode => {
          if (importNode.type === 'ImportNamespaceSpecifier') {
            context.report({
              node: importNode,
              message,
              fix: fixer => fixer.replaceTextRange(node.range, 'React')
            });
          }
        });
      }
    };
  }
};
