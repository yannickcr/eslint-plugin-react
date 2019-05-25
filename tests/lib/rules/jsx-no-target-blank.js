/**
 * @fileoverview Forbid target='_blank' attribute
 * @author Kevin Miller
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/jsx-no-target-blank');

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
const defaultErrors = [{
  message: 'Using target="_blank" without rel="noopener noreferrer" is a security risk:' +
  ' see https://mathiasbynens.github.io/rel-noopener'
}];

ruleTester.run('jsx-no-target-blank', rule, {
  valid: [
    {code: '<a href="foobar"></a>'},
    {code: '<a randomTag></a>'},
    {code: '<a target />'},
    {code: '<a href="foobar" target="_blank" rel="noopener noreferrer"></a>'},
    {code: '<a target="_blank" {...spreadProps} rel="noopener noreferrer"></a>'},
    {code: '<a {...spreadProps} target="_blank" rel="noopener noreferrer" href="http://example.com">s</a>'},
    {code: '<a target="_blank" rel="noopener noreferrer" {...spreadProps}></a>'},
    {code: '<p target="_blank"></p>'},
    {code: '<a href="foobar" target="_BLANK" rel="NOOPENER noreferrer"></a>'},
    {code: '<a target="_blank" rel={relValue}></a>'},
    {code: '<a target={targetValue} rel="noopener noreferrer"></a>'},
    {code: '<a target={targetValue} href="relative/path"></a>'},
    {code: '<a target={targetValue} href="/absolute/path"></a>'},
    {
      code: '<a target="_blank" href={ dynamicLink }></a>',
      options: [{enforceDynamicLinks: 'never'}]
    },
    {
      code: '<Link target="_blank" href={ dynamicLink }></Link>',
      options: [{enforceDynamicLinks: 'never'}],
      settings: {linkComponents: ['Link']}
    },
    {
      code: '<Link target="_blank" to={ dynamicLink }></Link>',
      options: [{enforceDynamicLinks: 'never'}],
      settings: {linkComponents: {name: 'Link', linkAttribute: 'to'}}
    },
    {
      code: '<a target="_blank" href="/absolute/path"></a>',
      options: [{forms: false}]
    },
    {
      code: '<a target="_blank" href="/absolute/path"></a>',
      options: [{forms: false, links: true}]
    },
    {
      code: '<form action="http://example.com" target="_blank"></form>',
      options: []
    },
    {
      code: '<form action="http://example.com" target="_blank" rel="noopener noreferrer"></form>',
      options: [{forms: true}]
    },
    {
      code: '<form action="http://example.com" target="_blank" rel="noopener noreferrer"></form>',
      options: [{forms: true, links: false}]
    }
  ],

  invalid: [{
    code: '<a target="_blank" href="http://example.com"></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_blank" rel="" href="http://example.com"></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_blank" rel="noopenernoreferrer" href="http://example.com"></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_BLANK" href="http://example.com"></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href="//example.com"></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href="//example.com" rel={true}></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href="//example.com" rel={3}></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href="//example.com" rel={null}></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href="//example.com" rel></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href={ dynamicLink }></a>',
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href={ dynamicLink }></a>',
    options: [{enforceDynamicLinks: 'always'}],
    errors: defaultErrors
  }, {
    code: '<Link target="_blank" href={ dynamicLink }></Link>',
    options: [{enforceDynamicLinks: 'always'}],
    settings: {linkComponents: ['Link']},
    errors: defaultErrors
  }, {
    code: '<Link target="_blank" to={ dynamicLink }></Link>',
    options: [{enforceDynamicLinks: 'always'}],
    settings: {linkComponents: {name: 'Link', linkAttribute: 'to'}},
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href="//example.com" rel></a>',
    options: [{links: true}],
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href="//example.com" rel></a>',
    options: [{links: true, forms: true}],
    errors: defaultErrors
  }, {
    code: '<a target="_blank" href="//example.com" rel></a>',
    options: [{links: true, forms: false}],
    errors: defaultErrors
  }, {
    code: '<form method="POST" action="http://example.com" target="_blank"></form>',
    options: [{forms: true}],
    errors: defaultErrors
  }, {
    code: '<form method="POST" action="http://example.com" rel="" target="_blank"></form>',
    options: [{forms: true}],
    errors: defaultErrors
  }, {
    code: '<form method="POST" action="http://example.com" rel="noopenernoreferrer" target="_blank"></form>',
    options: [{forms: true}],
    errors: defaultErrors
  }, {
    code: '<form method="POST" action="http://example.com" rel="noopenernoreferrer" target="_blank"></form>',
    options: [{forms: true, links: false}],
    errors: defaultErrors
  }]
});
