/**
 * @fileoverview No named imports on React
 * @author Angelo Abdoelsamath
 */

'use strict';

const docsUrl = require('../util/docsUrl');

module.exports = {
  meta: {
    docs: {
      description: 'No named imports on React',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-named-import')
    }
  },
  create(context) {
    // ignore non-modules
    if (context.parserOptions.sourceType !== 'module') {
      return {};
    }

    const message = 'Named imports are not allowed on React.';

    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'react') {
          return;
        }

        node.specifiers.forEach(node => {
          if (node.type === 'ImportSpecifier') {
            context.report({ node, message });
          }
        });
      }
    };
  }
};
