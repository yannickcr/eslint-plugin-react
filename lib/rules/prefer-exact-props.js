/**
 * @fileoverview Prefer exact proptype definitions
 */
'use strict';

const Components = require('../util/Components');
const propsUtil = require('../util/props');
const variableUtil = require('../util/variable');

const PROP_TYPES_MESSAGE = 'Component propTypes should be exact by using prop-types-exact.';
const FLOW_MESSAGE = 'Component flow props should be set with exact objects.';

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prefer exact proptype definitions',
      category: 'Possible Errors',
      recommended: false
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    function isNonExactObjectTypeAnnotation(node) {
      return (
        node &&
        node.type === 'ObjectTypeAnnotation' &&
        node.properties.length > 0 &&
        !node.exact
      );
    }

    function hasNonExactObjectTypeAnnotation(node) {
      const typeAnnotation = node.typeAnnotation;
      return (
        typeAnnotation &&
        typeAnnotation.typeAnnotation &&
        isNonExactObjectTypeAnnotation(typeAnnotation.typeAnnotation)
      );
    }

    function hasGenericTypeAnnotation(node) {
      const typeAnnotation = node.typeAnnotation;
      return (
        typeAnnotation &&
        typeAnnotation.typeAnnotation &&
        typeAnnotation.typeAnnotation.type === 'GenericTypeAnnotation'
      );
    }

    function isNonEmptyObjectExpression(node) {
      return (
        node &&
        node.type === 'ObjectExpression' &&
        node.properties.length > 0
      );
    }

    return {
      ClassProperty: function(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }

        if (hasNonExactObjectTypeAnnotation(node)) {
          context.report({
            node: node,
            message: FLOW_MESSAGE
          });
        } else if (isNonEmptyObjectExpression(node.value)) {
          context.report({
            node: node,
            message: PROP_TYPES_MESSAGE
          });
        }
      },

      Identifier: function(node) {
        if (!utils.getParentStatelessComponent(node)) {
          return;
        }
        if (hasNonExactObjectTypeAnnotation(node)) {
          context.report({
            node: node,
            message: FLOW_MESSAGE
          });
        } else if (hasGenericTypeAnnotation(node)) {
          const identifier = node.typeAnnotation.typeAnnotation.id.name;
          const propsDefinition = variableUtil.findVariableByName(context, identifier);
          if (isNonExactObjectTypeAnnotation(propsDefinition)) {
            context.report({
              node: node,
              message: FLOW_MESSAGE
            });
          }
        }
      },

      MemberExpression: function(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }

        const right = node.parent.right;
        if (isNonEmptyObjectExpression(right)) {
          context.report({
            node: node,
            message: PROP_TYPES_MESSAGE
          });
        } else if (right.type === 'Identifier') {
          const identifier = right.name;
          const propsDefinition = variableUtil.findVariableByName(context, identifier);
          if (isNonEmptyObjectExpression(propsDefinition)) {
            context.report({
              node: node,
              message: PROP_TYPES_MESSAGE
            });
          }
        }
      }
    };
  })
};
