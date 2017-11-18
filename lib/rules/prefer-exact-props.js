/**
 * @fileoverview Prefer exact proptype definitions
 */
'use strict';

const propsUtil = require('../util/props');

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

  create: function(context) {
    return {
      ClassProperty: function(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }

        const typeAnnotation = node.typeAnnotation;
        if (
          typeAnnotation &&
          typeAnnotation.typeAnnotation &&
          typeAnnotation.typeAnnotation.type === 'ObjectTypeAnnotation' &&
          typeAnnotation.typeAnnotation.properties.length > 0 &&
          !typeAnnotation.typeAnnotation.exact
        ) {
          context.report({
            node: node,
            message: FLOW_MESSAGE
          });
        } else if (node.value && node.value.type === 'ObjectExpression' && node.value.properties.length > 0) {
          context.report({
            node: node,
            message: PROP_TYPES_MESSAGE
          });
        }
      },

      MemberExpression: function(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }

        const right = node.parent.right;
        if (right.type === 'ObjectExpression' && right.properties.length > 0) {
          context.report({
            node: node,
            message: PROP_TYPES_MESSAGE
          });
        }
      }
    };
  }
};
