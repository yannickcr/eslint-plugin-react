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

    let propertySpecifiers = [];
    let specifiers = [];

    let importDeclaration;

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

    function fixImportDeclaration() {
      const node = importDeclaration;
      const tokens = sourceCode.getTokens(node);

      const importToken = tokens[0];
      const fromToken = tokens.find((token) => token.value === 'from');

      const range = [
        importToken.range[1] + 1,
        fromToken.range[0] - 1
      ];

      return (fixer) => fixer.replaceTextRange(range, getImportDeclarationString());
    }

    function shouldUpdateImportStatement() {
      const currentSpecifiers = importDeclaration.specifiers
        .filter((specifier) => specifier.type !== 'ImportDefaultSpecifier')
        .map((specifier) => specifier.imported.name);

      return specifiers.some((spec) => currentSpecifiers.indexOf(spec) === -1)
        || currentSpecifiers.some((spec) => isNameOfType(spec, 'property'));
    }

    function getFixer(name, range, newType) {
      const newText = `${newType === 'property' ? 'React.' : ''}${name}`;

      return (fixer) => fixer.replaceTextRange(range, newText);
    }

    function getReferenceIdentifiers(node) {
      const variables = context.getDeclaredVariables(node);
      return variables[0].references.map((reference) => reference.identifier);
    }

    function report(node, newType, _name, _range) {
      const name = _name || node.name;
      const range = _range || node.range;

      if (newType === 'import') {
        specifiers.push(name);
      }

      context.report({
        node,
        messageId: newType === 'property' ? 'usePropertyAccessor' : 'useNamedImport',
        data: {name},
        fix: getFixer(name, range, newType)
      });
    }

    function getTypeNamespace(node) {
      if (node.type === 'TSQualifiedName') {
        if (node.left) {
          return getTypeNamespace(node.left);
        }
      }

      if (node.type === 'Identifier') {
        return node.name;
      }
    }

    function getTypeProperties(node) {
      if (!node) {
        return;
      }
      if (node.type === 'TSQualifiedName') {
        const namespace = getTypeNamespace(node);
        return {
          namespace,
          name: node.right.name
        };
      }

      if (node.type === 'Identifier') {
        return {
          namespace: null,
          name: node.name
        };
      }
    }

    const typeSelector = (node) => {
      const tsType = getTypeProperties(node);
      if (!tsType) { return; }

      let type;

      if (tsType.namespace === 'React') {
        type = 'import';
      } else if (propertySpecifiers.indexOf(tsType.name) > -1) {
        type = 'property';
      }

      if (!type) { return; }

      if (isNameOfType(tsType.name, type)) {
        report(
          node,
          type,
          tsType.name
        );
      }
    };

    return {
      'Program:exit'(node) {
        if (shouldUpdateImportStatement()) {
          context.report({
            node,
            messageId: 'fixImportStatement',
            fix: fixImportDeclaration()
          });
        }

        importDeclaration = null;
        specifiers = [];
        propertySpecifiers = [];
      },
      TSTypeReference: (node) => typeSelector(node.typeName),
      'ImportDeclaration[source.value=\'react\']'(node) {
        importDeclaration = node;
        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportDefaultSpecifier') {
            const variables = context.getDeclaredVariables(specifier);

            const firstVariableWithRefs = variables.find((_variable) => _variable.references.length);

            if (!firstVariableWithRefs) { return; }

            firstVariableWithRefs.references.forEach((reference) => {
              /** @type ASTNode */
              const memberExpression = sourceCode.getNodeByRangeIndex(reference.identifier.range[0]);

              const nodeName = memberExpression.parent.property.name;

              if (isNameOfType(nodeName, 'import')) {
                report(memberExpression.parent.property, 'import', null, memberExpression.parent.range);
              }
            });

            return;
          }

          if (isNameOfType(specifier.imported.name, 'property')) {
            propertySpecifiers.push(specifier.imported.name);
            const nodes = getReferenceIdentifiers(specifier);
            nodes.forEach((_node) => report(_node, 'property'));
          } else {
            specifiers.push(specifier.imported.name);
          }
        });
      }
    };
  }
};
