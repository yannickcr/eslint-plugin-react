/**
 * @fileoverview Enforce that namespaces are not used in JSX
 * @author Yacine Hmito
 */

'use strict';

const elementType = require('jsx-ast-utils/elementType');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce that namespaces are not used in JSX',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('jsx-no-namespace')
    },

    schema: [{
      type: 'object',
      additionalProperties: false
    }]
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        const name = elementType(node);
        if (name.indexOf(':') === -1) return undefined;
        const message = `JSX component ${name} must not be in a namespace as React does not support them`;
        context.report({node, message});
      }
    };
  }
};
