/**
 * @fileoverview Forbid target='_blank' attribute
 * @author Kevin Miller
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-invalid-html-attribute');

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

ruleTester.run('no-invalid-html-attribute', rule, {
  valid: [
    {code: '<a rel="alternate"></a>'},
    {code: '<a rel="author"></a>'},
    {code: '<a rel="bookmark"></a>'},
    {code: '<a rel="external"></a>'},
    {code: '<a rel="help"></a>'},
    {code: '<a rel="license"></a>'},
    {code: '<a rel="next"></a>'},
    {code: '<a rel="nofollow"></a>'},
    {code: '<a rel="noopener"></a>'},
    {code: '<a rel="noreferrer"></a>'},
    {code: '<a rel="opener"></a>'},
    {code: '<a rel="prev"></a>'},
    {code: '<a rel="search"></a>'},
    {code: '<a rel="tag"></a>'},
    {code: '<area rel="alternate"></area>'},
    {code: '<area rel="author"></area>'},
    {code: '<area rel="bookmark"></area>'},
    {code: '<area rel="external"></area>'},
    {code: '<area rel="help"></area>'},
    {code: '<area rel="license"></area>'},
    {code: '<area rel="next"></area>'},
    {code: '<area rel="nofollow"></area>'},
    {code: '<area rel="noopener"></area>'},
    {code: '<area rel="noreferrer"></area>'},
    {code: '<area rel="opener"></area>'},
    {code: '<area rel="prev"></area>'},
    {code: '<area rel="search"></area>'},
    {code: '<area rel="tag"></area>'},
    {code: '<link rel="alternate"></link>'},
    {code: '<link rel="author"></link>'},
    {code: '<link rel="canonical"></link>'},
    {code: '<link rel="dns-prefetch"></link>'},
    {code: '<link rel="help"></link>'},
    {code: '<link rel="icon"></link>'},
    {code: '<link rel="license"></link>'},
    {code: '<link rel="manifest"></link>'},
    {code: '<link rel="modulepreload"></link>'},
    {code: '<link rel="next"></link>'},
    {code: '<link rel="pingback"></link>'},
    {code: '<link rel="preconnect"></link>'},
    {code: '<link rel="prefetch"></link>'},
    {code: '<link rel="preload"></link>'},
    {code: '<link rel="prerender"></link>'},
    {code: '<link rel="prev"></link>'},
    {code: '<link rel="search"></link>'},
    {code: '<link rel="stylesheet"></link>'},
    {code: '<form rel="external"></form>'},
    {code: '<form rel="help"></form>'},
    {code: '<form rel="license"></form>'},
    {code: '<form rel="next"></form>'},
    {code: '<form rel="nofollow"></form>'},
    {code: '<form rel="noopener"></form>'},
    {code: '<form rel="noreferrer"></form>'},
    {code: '<form rel="opener"></form>'},
    {code: '<form rel="prev"></form>'},
    {code: '<form rel="search"></form>'},
    {code: '<form rel={callFoo()}></form>'},
    {code: '<a rel={{a: "noreferrer"}["a"]}></a>'},
    {code: '<a rel={{a: "noreferrer"}["b"]}></a>'}
  ],
  invalid: [
    {
      code: '<html rel></html>',
      output: '<html ></html>',
      errors: [{
        message: 'The "rel" attribute only has meaning on the tags: "<link>", "<a>", "<area>", "<form>"'
      }]
    },
    {
      code: '<Foo rel></Foo>',
      output: '<Foo ></Foo>',
      errors: [{
        message: 'The "rel" attribute only has meaning on the tags: "<link>", "<a>", "<area>", "<form>"'
      }]
    },
    {
      code: '<a rel></a>',
      output: '<a ></a>',
      errors: [{
        message: 'An empty "rel" attribute is meaningless.'
      }]
    },
    {
      code: '<any rel></any>',
      output: '<any ></any>',
      errors: [{
        message: 'The "rel" attribute only has meaning on the tags: "<link>", "<a>", "<area>", "<form>"'
      }]
    },
    {
      code: '<a rel={null}></a>',
      output: '<a ></a>',
      errors: [{
        message: '"rel" attribute only supports strings.'
      }]
    },
    {
      code: '<a rel={5}></a>',
      output: '<a ></a>',
      errors: [{
        message: '"rel" attribute only supports strings.'
      }]
    },
    {
      code: '<a rel={true}></a>',
      output: '<a ></a>',
      errors: [{
        message: '"rel" attribute only supports strings.'
      }]
    },
    {
      code: '<a rel={{}}></a>',
      output: '<a ></a>',
      errors: [{
        message: '"rel" attribute only supports strings.'
      }]
    },
    {
      code: '<a rel={undefined}></a>',
      output: '<a ></a>',
      errors: [{
        message: '"rel" attribute only supports strings.'
      }]
    },
    {
      code: '<a rel="noreferrer noopener foobar"></a>',
      output: '<a rel="noreferrer noopener "></a>',
      errors: [{
        message: '"foobar" is never a valid "rel" attribute value.'
      }]
    },
    {
      code: '<a rel="noreferrer noopener   "></a>',
      output: '<a rel="noreferrer noopener"></a>',
      errors: [{
        message: '"rel" attribute values should be space delimited.'
      }]
    },
    {
      code: '<a rel={"noreferrer noopener foobar"}></a>',
      output: '<a rel={"noreferrer noopener "}></a>',
      errors: [{
        message: '"foobar" is never a valid "rel" attribute value.'
      }]
    },
    {
      code: '<a rel={"foobar noreferrer noopener"}></a>',
      output: '<a rel={" noreferrer noopener"}></a>',
      errors: [{
        message: '"foobar" is never a valid "rel" attribute value.'
      }]
    },
    {
      code: '<a rel={"foobar batgo       noopener"}></a>',
      output: '<a rel={"        noopener"}></a>',
      errors: [{
        message: '"foobar" is never a valid "rel" attribute value.'
      }, {
        message: '"batgo" is never a valid "rel" attribute value.'
      }, {
        message: '"rel" attribute values should be space delimited.'
      }]
    },
    {
      code: '<a rel={"        noopener"}></a>',
      output: '<a rel={"noopener"}></a>',
      errors: [{
        message: '"rel" attribute values should be space delimited.'
      }]
    },
    {
      code: '<a rel={"noopener        "}></a>',
      output: '<a rel={"noopener"}></a>',
      errors: [{
        message: '"rel" attribute values should be space delimited.'
      }]
    },
    {
      code: '<a rel={" batgo noopener"}></a>',
      output: '<a rel={"batgo noopener"}></a>',
      errors: [{
        message: '"batgo" is never a valid "rel" attribute value.'
      }, {
        message: '"rel" attribute values should be space delimited.'
      }]
    },
    {
      code: '<a rel={"batgo noopener"}></a>',
      output: '<a rel={" noopener"}></a>',
      errors: [{
        message: '"batgo" is never a valid "rel" attribute value.'
      }]
    },
    {
      code: '<a rel={" noopener"}></a>',
      output: '<a rel={"noopener"}></a>',
      errors: [{
        message: '"rel" attribute values should be space delimited.'
      }]
    },
    {
      code: '<a rel="canonical"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"canonical" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="dns-prefetch"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"dns-prefetch" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="icon"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"icon" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="manifest"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"manifest" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="modulepreload"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"modulepreload" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="pingback"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"pingback" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="preconnect"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"preconnect" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="prefetch"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"prefetch" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="preload"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"preload" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="prerender"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"prerender" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<a rel="stylesheet"></a>',
      output: '<a rel=""></a>',
      errors: [{
        message: '"stylesheet" is not a valid "rel" attribute value for <a>.'
      }]
    },
    {
      code: '<area rel="canonical"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"canonical" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="dns-prefetch"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"dns-prefetch" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="icon"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"icon" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="manifest"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"manifest" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="modulepreload"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"modulepreload" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="pingback"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"pingback" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="preconnect"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"preconnect" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="prefetch"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"prefetch" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="preload"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"preload" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="prerender"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"prerender" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<area rel="stylesheet"></area>',
      output: '<area rel=""></area>',
      errors: [{
        message: '"stylesheet" is not a valid "rel" attribute value for <area>.'
      }]
    },
    {
      code: '<link rel="bookmark"></link>',
      output: '<link rel=""></link>',
      errors: [{
        message: '"bookmark" is not a valid "rel" attribute value for <link>.'
      }]
    },
    {
      code: '<link rel="external"></link>',
      output: '<link rel=""></link>',
      errors: [{
        message: '"external" is not a valid "rel" attribute value for <link>.'
      }]
    },
    {
      code: '<link rel="nofollow"></link>',
      output: '<link rel=""></link>',
      errors: [{
        message: '"nofollow" is not a valid "rel" attribute value for <link>.'
      }]
    },
    {
      code: '<link rel="noopener"></link>',
      output: '<link rel=""></link>',
      errors: [{
        message: '"noopener" is not a valid "rel" attribute value for <link>.'
      }]
    },
    {
      code: '<link rel="noreferrer"></link>',
      output: '<link rel=""></link>',
      errors: [{
        message: '"noreferrer" is not a valid "rel" attribute value for <link>.'
      }]
    },
    {
      code: '<link rel="opener"></link>',
      output: '<link rel=""></link>',
      errors: [{
        message: '"opener" is not a valid "rel" attribute value for <link>.'
      }]
    },
    {
      code: '<link rel="tag"></link>',
      output: '<link rel=""></link>',
      errors: [{
        message: '"tag" is not a valid "rel" attribute value for <link>.'
      }]
    },
    {
      code: '<form rel="alternate"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"alternate" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="author"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"author" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="bookmark"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"bookmark" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="canonical"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"canonical" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="dns-prefetch"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"dns-prefetch" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="icon"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"icon" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="manifest"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"manifest" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="modulepreload"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"modulepreload" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="pingback"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"pingback" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="preconnect"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"preconnect" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="prefetch"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"prefetch" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="preload"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"preload" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="prerender"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"prerender" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="stylesheet"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"stylesheet" is not a valid "rel" attribute value for <form>.'
      }]
    },
    {
      code: '<form rel="tag"></form>',
      output: '<form rel=""></form>',
      errors: [{
        message: '"tag" is not a valid "rel" attribute value for <form>.'
      }]
    }
  ]
});
