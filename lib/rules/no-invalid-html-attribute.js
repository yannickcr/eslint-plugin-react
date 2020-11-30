/**
 * @fileoverview Check if tag attributes to have non-valid value
 * @author Sebastian Malton
 */

'use strict';

const matchAll = require('string.prototype.matchall');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/**
 * Map between attributes and a mapping between valid values and a set of tags they are valid on
 * @type {Map<string, Map<string, Set<string>>>}
 */
const VALID_VALUES = new Map();

const rel = new Map([
  ['alternate', new Set(['link', 'area', 'a'])],
  ['author', new Set(['link', 'area', 'a'])],
  ['bookmark', new Set(['area', 'a'])],
  ['canonical', new Set(['link'])],
  ['dns-prefetch', new Set(['link'])],
  ['external', new Set(['area', 'a', 'form'])],
  ['help', new Set(['link', 'area', 'a', 'form'])],
  ['icon', new Set(['link'])],
  ['license', new Set(['link', 'area', 'a', 'form'])],
  ['manifest', new Set(['link'])],
  ['modulepreload', new Set(['link'])],
  ['next', new Set(['link', 'area', 'a', 'form'])],
  ['nofollow', new Set(['area', 'a', 'form'])],
  ['noopener', new Set(['area', 'a', 'form'])],
  ['noreferrer', new Set(['area', 'a', 'form'])],
  ['opener', new Set(['area', 'a', 'form'])],
  ['pingback', new Set(['link'])],
  ['preconnect', new Set(['link'])],
  ['prefetch', new Set(['link'])],
  ['preload', new Set(['link'])],
  ['prerender', new Set(['link'])],
  ['prev', new Set(['link', 'area', 'a', 'form'])],
  ['search', new Set(['link', 'area', 'a', 'form'])],
  ['stylesheet', new Set(['link'])],
  ['tag', new Set(['area', 'a'])]
]);
VALID_VALUES.set('rel', rel);

/**
* Map between attributes and set of tags that the attribute is valid on
* @type {Map<string, Set<string>>}
*/
const COMPONENT_ATTRIBUTE_MAP = new Map();
COMPONENT_ATTRIBUTE_MAP.set('rel', new Set(['link', 'a', 'area', 'form']));

function splitIntoRangedParts(node, regex) {
  const valueRangeStart = node.range[0] + 1; // the plus one is for the initial quote

  return Array.from(matchAll(node.value, regex), (match) => {
    const start = match.index + valueRangeStart;
    const end = start + match[0].length;

    return {
      reportingValue: `"${match[1]}"`,
      value: match[1],
      range: [start, end]
    };
  });
}

function checkLiteralValueNode(context, attributeName, node, parentNode, parentNodeName) {
  if (typeof node.value !== 'string') {
    return context.report({
      node,
      message: `"${attributeName}" attribute only supports strings.`,
      fix(fixer) {
        return fixer.remove(parentNode);
      }
    });
  }

  if (!node.value.trim()) {
    return context.report({
      node,
      message: `An empty "${attributeName}" attribute is meaningless.`,
      fix(fixer) {
        return fixer.remove(parentNode);
      }
    });
  }

  const parts = splitIntoRangedParts(node, /([^\s]+)/g);
  for (const part of parts) {
    const allowedTags = VALID_VALUES.get(attributeName).get(part.value);
    if (!allowedTags) {
      context.report({
        node,
        message: `${part.reportingValue} is never a valid "${attributeName}" attribute value.`,
        fix(fixer) {
          return fixer.removeRange(part.range);
        }
      });
    } else if (!allowedTags.has(parentNodeName)) {
      context.report({
        node,
        message: `${part.reportingValue} is not a valid "${attributeName}" attribute value for <${parentNodeName}>.`,
        fix(fixer) {
          return fixer.removeRange(part.range);
        }
      });
    }
  }

  const whitespaceParts = splitIntoRangedParts(node, /(\s+)/g);
  for (const whitespacePart of whitespaceParts) {
    if (whitespacePart.value !== ' ' || whitespacePart.range[0] === (node.range[0] + 1) || whitespacePart.range[1] === (node.range[1] - 1)) {
      context.report({
        node,
        message: `"${attributeName}" attribute values should be space delimited.`,
        fix(fixer) {
          return fixer.removeRange(whitespacePart.range);
        }
      });
    }
  }
}

const DEFAULT_ATTRIBUTES = ['rel'];

function checkAttribute(context, node) {
  const attribute = node.name.name;

  function fix(fixer) {
    return fixer.remove(node);
  }

  const parentNodeName = node.parent.name.name;
  if (!COMPONENT_ATTRIBUTE_MAP.has(attribute) || !COMPONENT_ATTRIBUTE_MAP.get(attribute).has(parentNodeName)) {
    const tagNames = Array.from(
      COMPONENT_ATTRIBUTE_MAP.get(attribute).values(),
      (tagName) => `"<${tagName}>"`
    ).join(', ');
    return context.report({
      node,
      message: `The "${attribute}" attribute only has meaning on the tags: ${tagNames}`,
      fix
    });
  }

  if (!node.value) {
    return context.report({
      node,
      message: `An empty "${attribute}" attribute is meaningless.`,
      fix
    });
  }

  if (node.value.type === 'Literal') {
    return checkLiteralValueNode(context, attribute, node.value, node, parentNodeName);
  }

  if (node.value.expression.type === 'Literal') {
    return checkLiteralValueNode(context, attribute, node.value.expression, node, parentNodeName);
  }

  if (node.value.type !== 'JSXExpressionContainer') {
    return;
  }

  if (node.value.expression.type === 'ObjectExpression') {
    return context.report({
      node,
      message: `"${attribute}" attribute only supports strings.`,
      fix
    });
  }

  if (node.value.expression.type === 'Identifier' && node.value.expression.name === 'undefined') {
    return context.report({
      node,
      message: `"${attribute}" attribute only supports strings.`,
      fix
    });
  }
}

module.exports = {
  meta: {
    fixable: 'code',
    docs: {
      description: 'Forbid attribute with an invalid values`',
      category: 'Possible Errors',
      url: docsUrl('no-invalid-html-attribute')
    },
    schema: [{
      type: 'array',
      uniqueItems: true,
      items: {
        enum: ['rel']
      }
    }]
  },

  create(context) {
    return {
      JSXAttribute(node) {
        const attributes = new Set(context.options[0] || DEFAULT_ATTRIBUTES);

        // ignore attributes that aren't configured to be checked
        if (!attributes.has(node.name.name)) {
          return;
        }

        checkAttribute(context, node);
      }
    };
  }
};
