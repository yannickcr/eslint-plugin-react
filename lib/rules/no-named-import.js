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
              allow: {
                type: 'array',
              },
              forceImport: {
                type: 'boolean',
              },
            },
            additionalProperties: false,
          },
          {
            type: 'object',
            properties: {
              forbid: {
                type: 'array',
              },
              forceImport: {
                type: 'boolean',
              },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
    messages: {
      dontImport:
        "Don't import {{name}} from React. Use React.{{name}} to be consistent.",
      shouldImport: 'Import {{name}} from React',
    },
  },
  create(context) {
    // ignore non-modules
    if (context.parserOptions.sourceType !== 'module') {
      return {};
    }
    const options = context.options;
    const config = options[0] || {
      allow: [],
    };
    const forbidConfig = Array.isArray(config.forbid)
      ? ['forbid', config.forbid]
      : ['allow', config.allow];

    const type = forbidConfig[0];
    const list = forbidConfig[1];

    const forceImport = config.forceImport || false;

    const shouldReportImportDeclaration = (name) => {
      if (list.includes(name)) {
        return type === 'forbid';
      }
      return type === 'allow';
    };

    const shouldReportMemberExpression = (name) => {
      if (forceImport) {
        if (list.includes(name)) {
          return type === 'allow';
        }
        return type === 'forbid';
      }
      return false;
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
                messageId: 'dontImport',
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
              messageId: 'shouldImport',
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
