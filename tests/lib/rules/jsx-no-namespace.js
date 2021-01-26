/**
 * @fileoverview Tests for jsx-no-namespace
 * @author Yacine Hmito
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/jsx-no-namespace');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('jsx-no-namespace', rule, {
  valid: [{
    code: '<testcomponent />'
  }, {
    code: '<testComponent />'
  }, {
    code: '<test_component />'
  }, {
    code: '<TestComponent />'
  }, {
    code: '<object.testcomponent />'
  }, {
    code: '<object.testComponent />'
  }, {
    code: '<object.test_component />'
  }, {
    code: '<object.TestComponent />'
  }, {
    code: '<Object.testcomponent />'
  }, {
    code: '<Object.testComponent />'
  }, {
    code: '<Object.test_component />'
  }, {
    code: '<Object.TestComponent />'
  }],

  invalid: [{
    code: '<ns:testcomponent />',
    errors: [{message: 'JSX component ns:testcomponent must not be in a namespace as React does not support them'}]
  }, {
    code: '<ns:testComponent />',
    errors: [{message: 'JSX component ns:testComponent must not be in a namespace as React does not support them'}]
  }, {
    code: '<ns:test_component />',
    errors: [{message: 'JSX component ns:test_component must not be in a namespace as React does not support them'}]
  }, {
    code: '<ns:TestComponent />',
    errors: [{message: 'JSX component ns:TestComponent must not be in a namespace as React does not support them'}]
  }, {
    code: '<Ns:testcomponent />',
    errors: [{message: 'JSX component Ns:testcomponent must not be in a namespace as React does not support them'}]
  }, {
    code: '<Ns:testComponent />',
    errors: [{message: 'JSX component Ns:testComponent must not be in a namespace as React does not support them'}]
  }, {
    code: '<Ns:test_component />',
    errors: [{message: 'JSX component Ns:test_component must not be in a namespace as React does not support them'}]
  }, {
    code: '<Ns:TestComponent />',
    errors: [{message: 'JSX component Ns:TestComponent must not be in a namespace as React does not support them'}]
  }]
});
