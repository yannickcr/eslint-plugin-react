/**
 * @fileoverview Limit maximum of props on a single line in JSX
 * @author Yannick Croissant
 */

'use strict';

const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Limit maximum of props on a single line in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-max-props-per-line')
    },
    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        maximum: {
          type: 'object',
          properties: {
            single: {
              type: 'integer',
              minimum: 1
            },
            multi: {
              type: 'integer',
              minimum: 1
            }
          }
        },
        when: {
          type: 'string',
          enum: ['always', 'multiline']
        }
      }
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};

    const maximum = configuration.maximum || {};
    const maximumSingle = maximum.single || 1;
    const maximumMultiple = maximum.multi || 1;

    const when = configuration.when || 'always';

    function getPropName(propNode) {
      if (propNode.type === 'JSXSpreadAttribute') {
        return context.getSourceCode().getText(propNode.argument);
      }
      return propNode.name.name;
    }

    function reportError(propInLine, fix) {
      const name = getPropName(propInLine);

      context.report({
        node: propInLine,
        message: `Prop \`${name}\` must be placed on a new line`,
        fix
      });
    }

    function generateFixFunction(line, max) {
      const sourceCode = context.getSourceCode();
      const output = [];
      const front = line[0].range[0];
      const back = line[line.length - 1].range[1];

      for (let i = 0; i < line.length; i += max) {
        const nodes = line.slice(i, i + max);

        output.push(nodes.reduce((prev, curr) => {
          if (prev === '') {
            return sourceCode.getText(curr);
          }

          return `${prev} ${sourceCode.getText(curr)}`;
        }, ''));
      }

      const code = output.join('\n');

      return function fix(fixer) {
        return fixer.replaceTextRange([front, back], code);
      };
    }

    function generateTagNewLineFixFunction(node) {
      const sourceCode = context.getSourceCode();
      const output = [];
      const front = node.range[0];
      const back = node.attributes[0].range[1];

      output.push(`<${node.name.name}`);
      output.push(sourceCode.getText(node.attributes[0]));

      const code = output.join('\n');

      return function fix(fixer) {
        return fixer.replaceTextRange([front, back], code);
      };
    }

    return {
      JSXOpeningElement(node) {
        if (!node.attributes.length) {
          return;
        }

        if (when === 'multiline' && node.loc.start.line === node.loc.end.line) {
          return;
        }

        const firstProp = node.attributes[0];
        const linePartitionedProps = [[firstProp]];

        node.attributes.reduce((last, decl) => {
          if (last.loc.end.line === decl.loc.start.line) {
            linePartitionedProps[linePartitionedProps.length - 1].push(decl);
          } else {
            linePartitionedProps.push([decl]);
          }
          return decl;
        });

        const isSingleLineTag = linePartitionedProps.length <= 1;
        const maxPropsCountPerLine = isSingleLineTag
          ? maximumSingle
          : maximumMultiple;

        linePartitionedProps.forEach((propsInLine, index) => {
          if (
            !isSingleLineTag
            && index === 0
            && propsInLine[0].loc.start.line === node.loc.start.line
          ) {
            reportError(
              propsInLine[0],
              generateTagNewLineFixFunction(node)
            );
          }

          if (propsInLine.length > maxPropsCountPerLine) {
            reportError(
              propsInLine[maxPropsCountPerLine],
              generateFixFunction(propsInLine, maxPropsCountPerLine)
            );
          }
        });
      }
    };
  }
};
