/**
 * @fileoverview Prefer exact proptype definitions
 */
'use strict';

const Components = require('../util/Components');
const docsUrl = require('../util/docsUrl');
const propsUtil = require('../util/props');
const propWrapperUtil = require('../util/propWrapper');
const variableUtil = require('../util/variable');

const PROP_TYPES_MESSAGE = 'Component propTypes should be exact by using {{exactPropWrappers}}.';
const FLOW_MESSAGE = 'Component flow props should be set with exact objects.';

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prefer exact proptype definitions',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('prefer-exact-props')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    const exactWrappers = propWrapperUtil.getExactPropWrapperFunctions(context);

    function getPropTypesErrorMessage() {
      const formattedWrappers = propWrapperUtil.formatPropWrapperFunctions(exactWrappers);
      const message = exactWrappers.size > 1 ? `one of ${formattedWrappers}` : formattedWrappers;
      return {exactPropWrappers: message};
    }

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
        } else if (isNonEmptyObjectExpression(node.value) && exactWrappers.size > 0) {
          context.report({
            node: node,
            message: PROP_TYPES_MESSAGE,
            data: getPropTypesErrorMessage()
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
        if (!propsUtil.isPropTypesDeclaration(node) || exactWrappers.size === 0) {
          return;
        }

        const right = node.parent.right;
        if (isNonEmptyObjectExpression(right)) {
          context.report({
            node: node,
            message: PROP_TYPES_MESSAGE,
            data: getPropTypesErrorMessage()
          });
        } else if (right.type === 'Identifier') {
          const identifier = right.name;
          const propsDefinition = variableUtil.findVariableByName(context, identifier);
          if (isNonEmptyObjectExpression(propsDefinition)) {
            context.report({
              node: node,
              message: PROP_TYPES_MESSAGE,
              data: getPropTypesErrorMessage()
            });
          }
        }
      }
    };
  })
};
