/**
 * @fileoverview No named imports on React
 * @author Angelo Abdoelsamath
 */

'use strict';

const arrayIncludes = require('array-includes');

const docsUrl = require('../util/docsUrl');

const DEFAULT_TYPE = 'import';
const DEFAULT_MODULES = [];

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
        type: 'array',
        items: {
          type: 'string'
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
    const type = options[0] || DEFAULT_TYPE;
    const modules = options[1] || DEFAULT_MODULES;

    const shouldReportImportDeclaration = (name) => {
      if (!modules.length || arrayIncludes(modules, name)) {
        return type === 'property';
      }

      return type === 'import';
    };

    const shouldReportMemberExpression = (name) => {
      if (!modules.length || arrayIncludes(modules, name)) {
        return type === 'import';
      }
      return type === 'property';
    };

    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'react') {
          return;
        }
        node.specifiers.forEach((importNode) => {
          if (importNode.type === 'ImportSpecifier') {
            if (shouldReportImportDeclaration(importNode.imported.name)) {
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
          if (shouldReportMemberExpression(property.name)) {
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
