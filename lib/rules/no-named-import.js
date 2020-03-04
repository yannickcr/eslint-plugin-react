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
    },
    schema: [
      {
        oneOf: [
          {
            type: 'object',
            properties: {
              whitelist: {
                type: 'array'
              }
            },
            additionalProperties: false
          },
          {
            type: 'object',
            properties: {
              blacklist: {
                type: 'array'
              }
            },
            additionalProperties: false
          }
        ]
      }
    ],
    messages: {
      dontImport: `Don't import {{name}} from React. Use React.{{name}} to be consistent.`
    }
  },
  create(context) {
    // ignore non-modules
    if (context.parserOptions.sourceType !== 'module') {
      return {};
    }

    const { options } = context;
    const config = options[0] || {
      whitelist: []
    };

    const [type, list] = Array.isArray(config.blacklist)
      ? ['blacklist', config.blacklist]
      : ['whitelist', config.whitelist];

    function shouldReport(name) {
      if (list.includes(name)) {
        return type !== 'whitelist';
      }

      return type === 'whitelist';
    }

    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'react') {
          return;
        }

        node.specifiers.forEach(importNode => {
          if (importNode.type === 'ImportSpecifier') {
            if (shouldReport(importNode.imported.name)) {
              context.report({
                node: importNode,
                messageId: 'dontImport',
                data: {
                  name: importNode.imported.name
                }
              });
            }
          }
        });
      }
    };
  }
};
