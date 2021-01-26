/**
 * @fileoverview Prevent usage of referential-type variables as default param in functional component
 * @author Chang Yan
 */

'use strict';

const docsUrl = require('../util/docsUrl');

const FORBIDDEN_TYPES_MAP = {
  ArrowFunctionExpression: 'arrow function',
  FunctionExpression: 'function expression',
  ObjectExpression: 'object literal',
  ArrayExpression: 'array literal',
  ClassExpression: 'class expression',
  NewExpression: 'construction expression',
  JSXElement: 'JSX element'
};

const FORBIDDEN_TYPES = new Set(Object.keys(FORBIDDEN_TYPES_MAP));
const MESSAGE_ID = 'forbiddenTypeDefaultParam';

function isReactComponentName(node) {
  if (node.id && node.id.type === 'Identifier' && node.id.name) {
    const firstLetter = node.id.name[0];
    if (firstLetter.toUpperCase() === firstLetter) {
      return true;
    }
  }

  return false;
}

function isReactComponentVariableDeclarator(variableDeclarator) {
  if (!isReactComponentName(variableDeclarator)) {
    return false;
  }
  return (
    variableDeclarator.init != null
    && variableDeclarator.init.type === 'ArrowFunctionExpression'
  );
}

function hasUsedObjectDestructuringSyntax(params) {
  if (
    params == null
    || params.length !== 1
    || params[0].type !== 'ObjectPattern'
  ) {
    return false;
  }
  return true;
}

function verifyDefaultPropsDestructuring(context, properties) {
  // Loop through each of the default params
  properties.forEach((prop) => {
    if (prop.type !== 'Property') {
      return;
    }

    const propName = prop.key.name;
    const propDefaultValue = prop.value;

    if (propDefaultValue.type !== 'AssignmentPattern') {
      return;
    }

    const propDefaultValueType = propDefaultValue.right.type;

    if (
      propDefaultValueType === 'Literal'
      && propDefaultValue.right.regex != null
    ) {
      context.report({
        node: propDefaultValue,
        messageId: MESSAGE_ID,
        data: {
          propName,
          forbiddenType: 'regex literal'
        }
      });
    } else if (propDefaultValueType === 'CallExpression'
      && propDefaultValue.right.callee.type === 'Identifier'
      && propDefaultValue.right.callee.name === 'Symbol'
    ) {
      context.report({
        node: propDefaultValue,
        messageId: MESSAGE_ID,
        data: {
          propName,
          forbiddenType: 'Symbol literal'
        }
      });
    } else if (FORBIDDEN_TYPES.has(propDefaultValueType)) {
      context.report({
        node: propDefaultValue,
        messageId: MESSAGE_ID,
        data: {
          propName,
          forbiddenType: FORBIDDEN_TYPES_MAP[propDefaultValueType]
        }
      });
    }
  });
}

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of referential-type variables as default param in functional component',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-object-type-as-default-prop')
    },
    messages: {
      [MESSAGE_ID]:
        '{{propName}} has a/an {{forbiddenType}} as default prop.\n'
        + 'This could lead to potential infinite render loop in React. \n'
        + 'Use a variable reference instead of {{forbiddenType}}.'
    }
  },
  create(context) {
    return {
      FunctionDeclaration(node) {
        if (
          !isReactComponentName(node)
          || !hasUsedObjectDestructuringSyntax(node.params)
        ) {
          return;
        }

        const properties = node.params[0].properties;
        verifyDefaultPropsDestructuring(context, properties);
      },
      'VariableDeclarator > :matches(ArrowFunctionExpression, FunctionExpression).init'(
        node
      ) {
        if (
          !isReactComponentVariableDeclarator(node.parent)
          || !hasUsedObjectDestructuringSyntax(node.params)
        ) {
          return;
        }
        const properties = node.params[0].properties;
        verifyDefaultPropsDestructuring(context, properties);
      }
    };
  }
};
