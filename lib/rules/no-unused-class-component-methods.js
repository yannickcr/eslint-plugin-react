/**
 * @fileoverview Prevent declaring unused methods of component class
 * @author Paweł Nowak
 */

'use strict';

const Components = require('../util/Components');
const astUtil = require('../util/ast');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const internalMethods = [
  'constructor',
  'componentDidCatch',
  'componentDidMount',
  'componentDidUpdate',
  'componentWillMount',
  'componentWillReceiveProps',
  'componentWillUnmount',
  'componentWillUpdate',
  'getSnapshotBeforeUpdate',
  'render',
  'shouldComponentUpdate',
  'UNSAFE_componentWillMount',
  'UNSAFE_componentWillReceiveProps',
  'UNSAFE_componentWillUpdate'
];

module.exports = {
  meta: {
    docs: {
      description: 'Prevent declaring unused methods of component class',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unused-class-component-methods')
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false
      }
    ]
  },

  create: Components.detect((context, components, utils) => {
    const isNotComponent = node => (
      !utils.isES5Component(node) &&
      !utils.isES6Component(node) &&
      !utils.isCreateElement(node)
    );
    const filterAllMethods = node => {
      const isMethod = node.type === 'MethodDefinition';
      const isArrowFunction = (
        node.type === 'ClassProperty' &&
        node.value.type === 'ArrowFunctionExpression'
      );
      const isFunctionExpression = (
        node.type === 'ClassProperty' &&
        node.value.type === 'FunctionExpression'
      );

      return isMethod || isArrowFunction || isFunctionExpression;
    };
    const checkMethods = node => {
      const properties = astUtil.getComponentProperties(node);
      let methods = properties
        .filter(property => (
          filterAllMethods(property) &&
          internalMethods.indexOf(astUtil.getPropertyName(property)) === -1
        ));
      const getThisExpressions = subnode => {
        if (!methods.length) {
          return;
        }

        switch (subnode.type) {
          case 'ClassProperty':
          case 'JSXAttribute':
          case 'MethodDefinition':
            getThisExpressions(subnode.value);
            break;
          case 'ArrowFunctionExpression':
          case 'FunctionExpression':
            getThisExpressions(subnode.body);
            break;
          case 'BlockStatement':
            subnode.body.forEach(getThisExpressions);
            break;
          case 'ReturnStatement':
            getThisExpressions(subnode.argument);
            break;
          case 'JSXElement':
            getThisExpressions(subnode.openingElement);
            subnode.children.forEach(getThisExpressions);
            break;
          case 'JSXOpeningElement':
            subnode.attributes.forEach(getThisExpressions);
            break;
          case 'JSXExpressionContainer':
          case 'ExpressionStatement':
            getThisExpressions(subnode.expression);
            break;
          case 'CallExpression':
            getThisExpressions(subnode.callee);
            break;
          case 'VariableDeclaration':
            subnode.declarations.forEach(getThisExpressions);
            break;
          case 'VariableDeclarator':
            getThisExpressions(subnode.init);
            break;
          case 'MemberExpression':
            if (subnode.object.type !== 'ThisExpression') {
              return;
            }

            methods = methods.filter(method =>
              subnode.property.name !== astUtil.getPropertyName(method)
            );
            break;
          default:
            break;
        }
      };

      properties.forEach(getThisExpressions);

      if (!methods.length) {
        return;
      }

      methods.forEach(method => {
        context.report({
          node: method,
          message: 'Unused method "{{method}}" of class "{{class}}"',
          data: {
            class: node.id.name,
            method: astUtil.getPropertyName(method)
          }
        });
      });
    };

    return {
      'Program:exit': () => {
        const list = components.list();

        Object.values(list).forEach(({ node }) => {
          if (isNotComponent(node)) {
            return;
          }

          checkMethods(node);
        });
      }
    };
  })
};
