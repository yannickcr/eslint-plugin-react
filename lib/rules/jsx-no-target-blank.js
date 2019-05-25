/**
 * @fileoverview Forbid target='_blank' attribute
 * @author Kevin Miller
 */

'use strict';

const docsUrl = require('../util/docsUrl');
const linkComponentsUtil = require('../util/linkComponents');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function isTargetBlank(attr) {
  return attr.name &&
    attr.name.name === 'target' &&
    attr.value &&
    attr.value.type === 'Literal' &&
    attr.value.value.toLowerCase() === '_blank';
}

function hasExternalLink(element, linkAttribute) {
  return element.attributes.some(attr => attr.name &&
      attr.name.name === linkAttribute &&
      attr.value.type === 'Literal' &&
      /^(?:\w+:|\/\/)/.test(attr.value.value));
}

function hasDynamicLink(element, linkAttribute) {
  return element.attributes.some(attr => attr.name &&
    attr.name.name === linkAttribute &&
    attr.value.type === 'JSXExpressionContainer');
}

function hasSecureRel(element) {
  return element.attributes.find((attr) => {
    if (attr.type === 'JSXAttribute' && attr.name.name === 'rel') {
      const tags = attr.value && attr.value.type === 'Literal' && attr.value.value.toLowerCase().split(' ');
      return tags && (tags.indexOf('noopener') >= 0 && tags.indexOf('noreferrer') >= 0);
    }
    return false;
  });
}

module.exports = {
  meta: {
    docs: {
      description: 'Forbid target="_blank" attribute without rel="noopener noreferrer"',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('jsx-no-target-blank')
    },
    schema: [{
      type: 'object',
      properties: {
        enforceDynamicLinks: {
          enum: ['always', 'never']
        },
        links: {
          type: 'boolean',
          default: true
        },
        forms: {
          type: 'boolean',
          default: false
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = Object.assign({
      links: true,
      forms: false
    }, context.options[0]);

    const enforceDynamicLinks = configuration.enforceDynamicLinks || 'always';
    const linkComponents = linkComponentsUtil.getLinkComponents(context);
    const formComponents = linkComponentsUtil.getFormComponents(context);

    return {
      JSXAttribute(node) {
        const parent = node.parent;
        const tagName = parent.name.name;

        if (linkComponents.has(tagName)) {
          if (!configuration.links || !isTargetBlank(node) || hasSecureRel(parent)) {
            return;
          }

          const linkAttribute = linkComponents.get(tagName);

          if (hasExternalLink(parent, linkAttribute) || (enforceDynamicLinks === 'always' && hasDynamicLink(parent, linkAttribute))) {
            context.report(node, 'Using target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopener');
          }
        } else if (formComponents.has(tagName)) {
          if (!configuration.forms || !isTargetBlank(node) || hasSecureRel(parent)) {
            return;
          }

          const formAttribute = formComponents.get(tagName);

          if (hasExternalLink(parent, formAttribute) || (enforceDynamicLinks === 'always' && hasDynamicLink(parent, formAttribute))) {
            context.report(node, 'Using target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopener');
          }
        }
      }
    };
  }
};
