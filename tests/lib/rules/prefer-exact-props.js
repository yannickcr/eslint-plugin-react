/**
 * @fileoverview Prefer exact proptype definitions
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/prefer-exact-props');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

const PROP_TYPES_MESSAGE = 'Component propTypes should be exact by using prop-types-exact.';
const FLOW_MESSAGE = 'Component flow props should be set with exact objects.';

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('prefer-exact-props', rule, {
  valid: [{
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.propTypes = {};
    `
  }, {
    code: `
      class Component extends React.Component {
        static propTypes = {};
        render() {
          return <div />;
        }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Component extends React.Component {
        props: {};
        render() {
          return <div />;
        }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      function Component(props) {
        return <div />;
      }
      Component.propTypes = {};
    `
  }],
  invalid: [{
    code: `
      class Component extends React.Component {
        render() {
          return <div />;
        }
      }
      Component.propTypes = {
        foo: PropTypes.string
      };
    `,
    errors: [{message: PROP_TYPES_MESSAGE}]
  }, {
    code: `
      class Component extends React.Component {
        static propTypes = {
          foo: PropTypes.string
        }
        render() {
          return <div />;
        }
      }
    `,
    parser: 'babel-eslint',
    errors: [{message: PROP_TYPES_MESSAGE}]
  }, {
    code: `
      class Component extends React.Component {
        props: {
          foo: string
        }
        render() {
          return <div />;
        }
      }
    `,
    parser: 'babel-eslint',
    errors: [{message: FLOW_MESSAGE}]
  }]
});
