/**
 * @fileoverview No named imports on React
 * @author Angelo Abdoelsamath
 */

'use strict';

const docsUrl = require('../util/docsUrl');

const DEFAULT_TYPE = 'import';

module.exports = {
  meta: {
    fixable: 'code',
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
      usePropertyAccessor: 'use React.{{name}}',
      useNamedImport: 'Import {{name}} from React',
      fixImportStatement: 'Fix import statement'
    }
  },
  /**
   *
   * @param {RuleContext} context
   * @returns {any}
   */
  create(context) {
    // ignore non-modules
    if (context.parserOptions.sourceType !== 'module') {
      return {};
    }
    const options = context.options;
    const mode = options[0] || DEFAULT_TYPE;
    const overrides = options[1] || {};

    const specifiers = [];

    /** @type {Context} */
    const sourceCode = context.getSourceCode();

    function isNameOfType(name, type) {
      return (overrides[name] || mode) === type;
    }

    function getImportDeclarationString() {
      let str = 'React';

      if (specifiers.length) {
        str += ', { ';
        str += specifiers.join(', ');
        str += ' }';
      }

      return str;
    }

    function fixImportDeclaration(node) {
      const tokens = sourceCode.getTokens(node);

      const importToken = tokens[0];
      const fromToken = tokens.filter((token) => token.value === 'from')[0];

      const range = [
        importToken.range[1] + 1,
        fromToken.range[0] - 1
      ];

      return (fixer) => fixer.replaceTextRange(range, getImportDeclarationString(specifiers));
    }

    function shouldUpdateImportStatement(node) {
      let shouldUpdate = false;
      const currentSpecifiers = node.specifiers
        .filter((specifier) => specifier.type !== 'ImportDefaultSpecifier')
        .map((specifier) => specifier.imported.name);

      specifiers.forEach((spec) => {
        shouldUpdate = currentSpecifiers.indexOf(spec) === -1;
      });

      currentSpecifiers.forEach((spec) => {
        shouldUpdate = isNameOfType(spec, 'property');
      });

      return shouldUpdate;
    }

    function getFixer(node, type) {
      if (type === 'import') {
        return (fixer) => fixer.replaceTextRange(node.parent.range, node.name);
      }

      return (fixer) => fixer.insertTextBefore(node, 'React.');
    }

    function getDeclaredNodes(node, type) {
      if (type === 'import') {
        return [node];
      }

      const variables = context.getDeclaredVariables(node);

      return variables[0].references.map((reference) => reference.identifier);
    }

    function reporter(node, type) {
      if (isNameOfType(node.name, type)) {
        if (type === 'import') { specifiers.push(node.name); }

        const nodes = getDeclaredNodes(node, type);

        nodes.forEach((reportNode) => context.report({
          node: reportNode,
          messageId: type === 'import' ? 'useNamedImport' : 'usePropertyAccessor',
          data: {name: reportNode.name},
          fix: getFixer(reportNode, type)
        }));
      }
    }

    return {
      'ImportDeclaration[source.value=\'react\']'(node) {
        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportDefaultSpecifier') {
            const variables = context.getDeclaredVariables(specifier);
            variables[0].references.forEach((reference) => {
              const memberExpression = reference.identifier.parent;

              reporter(memberExpression.property, 'import');
            });

            return;
          }

          if (isNameOfType(specifier.imported.name, 'property')) {
            reporter(specifier, 'property');
          } else {
            specifiers.push(specifier.imported.name);
          }
        });

        if (shouldUpdateImportStatement(node)) {
          context.report({
            node,
            messageId: 'fixImportStatement',
            fix: fixImportDeclaration(node, specifiers)
          });
        }
      }
    };
  }
};
