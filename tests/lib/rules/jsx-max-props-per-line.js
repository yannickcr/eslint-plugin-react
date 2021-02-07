/**
 * @fileoverview Limit maximum of props on a single line in JSX
 * @author Yannick Croissant
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/jsx-max-props-per-line');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const getConfigs = (single, multi, when) => {
  const configs = {
    maximum: {
      single,
      multi
    },
    when
  };

  if (!single && !multi) {
    delete configs.maximum;
  }

  return configs;
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('jsx-max-props-per-line', rule, {
  valid: [{
    code: '<App />'
  }, {
    code: '<App foo />'
  }, {
    code: '<App foo bar />',
    options: [getConfigs(2)]
  }, {
    code: '<App foo bar />',
    options: [getConfigs(undefined, undefined, 'multiline')]
  }, {
    code: '<App foo {...this.props} />',
    options: [getConfigs(undefined, undefined, 'multiline')]
  }, {
    code: '<App foo bar baz />',
    options: [getConfigs(2, undefined, 'multiline')]
  }, {
    code: '<App {...this.props} bar />',
    options: [getConfigs(2)]
  }, {
    code: [
      '<App',
      '  boom',
      '  foo',
      '  bar',
      '/>'
    ].join('\n')
  }, {
    code: [
      '<App',
      '  foo bar',
      '  baz',
      '/>'
    ].join('\n'),
    options: [getConfigs(undefined, 2)]
  }, {
    code: [
      '<div>',
      '  <App',
      '    foo bar',
      '    baz',
      '  />',
      '  <App2 bar baz />',
      '</div>'
    ].join('\n'),
    options: [getConfigs(2, 2)]
  }],

  invalid: [{
    code: '<App foo bar baz />;',
    output: [
      '<App foo',
      'bar',
      'baz />;'
    ].join('\n'),
    errors: [{message: 'Prop `bar` must be placed on a new line'}],
    parserOptions
  }, {
    code: '<App foo bar baz />;',
    output: [
      '<App foo bar',
      'baz />;'
    ].join('\n'),
    options: [getConfigs(2)],
    errors: [{message: 'Prop `baz` must be placed on a new line'}]
  }, {
    code: '<App {...this.props} bar />;',
    output: [
      '<App {...this.props}',
      'bar />;'
    ].join('\n'),
    errors: [{message: 'Prop `bar` must be placed on a new line'}],
    parserOptions
  }, {
    code: '<App bar {...this.props} />;',
    output: [
      '<App bar',
      '{...this.props} />;'
    ].join('\n'),
    errors: [{message: 'Prop `this.props` must be placed on a new line'}],
    parserOptions
  }, {
    code: [
      '<App',
      '  foo bar',
      '  baz',
      '/>'
    ].join('\n'),
    output: [
      '<App',
      '  foo',
      'bar',
      '  baz',
      '/>'
    ].join('\n'),
    errors: [{message: 'Prop `bar` must be placed on a new line'}],
    parserOptions
  }, {
    code: [
      '<App',
      '  foo {...this.props}',
      '  baz',
      '/>'
    ].join('\n'),
    output: [
      '<App',
      '  foo',
      '{...this.props}',
      '  baz',
      '/>'
    ].join('\n'),
    errors: [{message: 'Prop `this.props` must be placed on a new line'}],
    parserOptions
  }, {
    code: [
      '<App',
      '  foo={{',
      '  }} bar',
      '/>'
    ].join('\n'),
    output: [
      '<App',
      '  foo={{',
      '  }}',
      'bar',
      '/>'
    ].join('\n'),
    errors: [{message: 'Prop `bar` must be placed on a new line'}],
    parserOptions
  }, {
    code: [
      '<App foo={{',
      '}} bar />'
    ].join('\n'),
    output: [
      '<App foo={{',
      '}}',
      'bar />'
    ].join('\n'),
    errors: [{message: 'Prop `bar` must be placed on a new line'}],
    parserOptions
  }, {
    code: [
      '<App foo bar={{',
      '}} baz />'
    ].join('\n'),
    output: [
      '<App foo bar={{',
      '}}',
      'baz />'
    ].join('\n'),
    options: [getConfigs(2)],
    errors: [{message: 'Prop `baz` must be placed on a new line'}]
  }, {
    code: [
      '<App foo={{',
      '}} {...rest} />'
    ].join('\n'),
    output: [
      '<App foo={{',
      '}}',
      '{...rest} />'
    ].join('\n'),
    errors: [{message: 'Prop `rest` must be placed on a new line'}],
    parserOptions
  }, {
    code: [
      '<App {',
      '  ...this.props',
      '} bar />'
    ].join('\n'),
    output: [
      '<App {',
      '  ...this.props',
      '}',
      'bar />'
    ].join('\n'),
    errors: [{message: 'Prop `bar` must be placed on a new line'}],
    parserOptions
  }, {
    code: [
      '<App {',
      '  ...this.props',
      '} {',
      '  ...rest',
      '} />'
    ].join('\n'),
    output: [
      '<App {',
      '  ...this.props',
      '}',
      '{',
      '  ...rest',
      '} />'
    ].join('\n'),
    errors: [{message: 'Prop `rest` must be placed on a new line'}],
    parserOptions
  }, {
    code: [
      '<App',
      '  foo={{',
      '  }} bar baz bor',
      '/>'
    ].join('\n'),
    output: [
      '<App',
      '  foo={{',
      '  }} bar',
      'baz bor',
      '/>'
    ].join('\n'),
    options: [getConfigs(2)],
    errors: [{message: 'Prop `baz` must be placed on a new line'}]
  }, {
    code: [
      '<div>',
      '  <App',
      '    foo bar',
      '    baz',
      '  />',
      '  <App2 boom box />',
      '</div>'
    ].join('\n'),
    output: [
      '<div>',
      '  <App',
      '    foo bar',
      '    baz',
      '  />',
      '  <App2 boom',
      'box />',
      '</div>'
    ].join('\n'),
    options: [getConfigs(undefined, 2)],
    errors: [{message: 'Prop `box` must be placed on a new line'}]
  }, {
    code: [
      '<App boom',
      '  foo',
      '  bar',
      '/>'
    ].join('\n'),
    output: [
      '<App',
      'boom',
      '  foo',
      '  bar',
      '/>'
    ].join('\n'),
    errors: [{message: 'Prop `boom` must be placed on a new line'}]
  }, {
    code: [
      '<App boom foo',
      '  bar',
      '/>'
    ].join('\n'),
    output: [
      '<App',
      'boom foo',
      '  bar',
      '/>'
    ].join('\n'),
    options: [getConfigs(undefined, 2)],
    errors: [{message: 'Prop `boom` must be placed on a new line'}]
  }, {
    code: [
      '<App boom foo',
      '  bar',
      '/>'
    ].join('\n'),
    output: [
      '<App',
      'boom foo',
      '  bar',
      '/>'
    ].join('\n'),
    options: [getConfigs(undefined, 1)],
    errors: [
      {message: 'Prop `boom` must be placed on a new line'},
      {message: 'Prop `foo` must be placed on a new line'}
    ]

  }]
});
