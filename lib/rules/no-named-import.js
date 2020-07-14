/**
 * @fileoverview No named imports on React
 * @author Angelo Abdoelsamath
 */

'use strict';

const arrayIncludes = require('array-includes');

const docsUrl = require('../util/docsUrl');

const DEFAULT_TYPE = 'import';

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
        type: 'string',
        enum: ['property', 'import']
      },
      {
        type: 'object',
        patternProperties: {
          '.': {
            type: 'string',
            enum: ['property', 'import']
          }
        },
        additionalProperties: false
      }

    ],
    messages: {
      useProperty:
        'Don\'t import {{name}} from React. Use React.{{name}} to be consistent.',
      useImport: 'Import {{name}} from React'
    }
  },
  create(context) {
    // ignore non-modules
    if (context.parserOptions.sourceType !== 'module') {
      return {};
    }
    const options = context.options;
    const mode = options[0] || DEFAULT_TYPE;
    const overrides = options[1] || {};

    const shouldReport = (name, type) => (overrides[name] || mode) !== type;

    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'react') {
          return;
        }
        node.specifiers.forEach((importNode) => {
          if (importNode.type === 'ImportSpecifier') {
            if (shouldReport(importNode.imported.name, 'import')) {
              context.report({
                node: importNode,
                messageId: 'useProperty',
                data: {
                  name: importNode.imported.name
                }
              });
            }
          }
        });
      },
      MemberExpression(node) {
        if (node.object.type === 'Identifier') {
          const identifier = node.object;
          if (identifier.name !== 'React' || node.property.type !== 'Identifier') {
            return;
          }
          const property = node.property;
          if (shouldReport(property.name, 'property')) {
            context.report({
              node,
              messageId: 'useImport',
              data: {
                name: property.name
              }
            });
          }
        }
      }
    };
  }
};
