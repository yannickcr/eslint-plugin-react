/**
 * @fileoverview Lifecycle methods should be methods on the prototype, not class fields
 * @author Tan Nguyen
 */
'use strict';

const Components = require('../util/Components');
const astUtil = require('../util/ast');
const docsUrl = require('../util/docsUrl');
const lifecycleMethods = require('../util/lifecycleMethods');

module.exports = {
  meta: {
    docs: {
      description: 'Lifecycle methods should be methods on the prototype, not class fields',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-arrow-function-lifecycle')
    },
    schema: []
  },

  create: Components.detect((context, components) => {
    /**
     * @param {Array} properties list of component properties
     */
    function reportNoArrowFunctionLifecycle(properties) {
      properties.forEach(node => {
        const propertyName = astUtil.getPropertyName(node);
        const nodeType = node.value && node.value.type;
        const isLifecycleMethod = lifecycleMethods.indexOf(propertyName) !== -1;

        if (nodeType === 'ArrowFunctionExpression' && isLifecycleMethod) {
          context.report({
            node,
            message: '{{propertyName}} is a React lifecycle method, and should not be an arrow function or in a class field. Use an instance method instead.',
            data: {
              propertyName
            }
          });
        }
      });
    }

    return {
      'Program:exit': function() {
        const list = components.list();
        Object.keys(list).forEach(component => {
          const properties = astUtil.getComponentProperties(list[component].node);
          reportNoArrowFunctionLifecycle(properties);
        });
      }
    };
  })
};
