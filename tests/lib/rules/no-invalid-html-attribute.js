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
    {code: 'React.createElement("a", { rel: "alternate" })'},
    {code: 'React.createElement("a", { rel: ["alternate"] })'},
    {code: '<a rel="author"></a>'},
    {code: 'React.createElement("a", { rel: "author" })'},
    {code: 'React.createElement("a", { rel: ["author"] })'},
    {code: '<a rel="bookmark"></a>'},
    {code: 'React.createElement("a", { rel: "bookmark" })'},
    {code: 'React.createElement("a", { rel: ["bookmark"] })'},
    {code: '<a rel="external"></a>'},
    {code: 'React.createElement("a", { rel: "external" })'},
    {code: 'React.createElement("a", { rel: ["external"] })'},
    {code: '<a rel="help"></a>'},
    {code: 'React.createElement("a", { rel: "help" })'},
    {code: 'React.createElement("a", { rel: ["help"] })'},
    {code: '<a rel="license"></a>'},
    {code: 'React.createElement("a", { rel: "license" })'},
    {code: 'React.createElement("a", { rel: ["license"] })'},
    {code: '<a rel="next"></a>'},
    {code: 'React.createElement("a", { rel: "next" })'},
    {code: 'React.createElement("a", { rel: ["next"] })'},
    {code: '<a rel="nofollow"></a>'},
    {code: 'React.createElement("a", { rel: "nofollow" })'},
    {code: 'React.createElement("a", { rel: ["nofollow"] })'},
    {code: '<a rel="noopener"></a>'},
    {code: 'React.createElement("a", { rel: "noopener" })'},
    {code: 'React.createElement("a", { rel: ["noopener"] })'},
    {code: '<a rel="noreferrer"></a>'},
    {code: 'React.createElement("a", { rel: "noreferrer" })'},
    {code: 'React.createElement("a", { rel: ["noreferrer"] })'},
    {code: '<a rel="opener"></a>'},
    {code: 'React.createElement("a", { rel: "opener" })'},
    {code: 'React.createElement("a", { rel: ["opener"] })'},
    {code: '<a rel="prev"></a>'},
    {code: 'React.createElement("a", { rel: "prev" })'},
    {code: 'React.createElement("a", { rel: ["prev"] })'},
    {code: '<a rel="search"></a>'},
    {code: 'React.createElement("a", { rel: "search" })'},
    {code: 'React.createElement("a", { rel: ["search"] })'},
    {code: '<a rel="tag"></a>'},
    {code: 'React.createElement("a", { rel: "tag" })'},
    {code: 'React.createElement("a", { rel: ["tag"] })'},
    {code: '<area rel="alternate"></area>'},
    {code: 'React.createElement("area", { rel: "alternate" })'},
    {code: 'React.createElement("area", { rel: ["alternate"] })'},
    {code: '<area rel="author"></area>'},
    {code: 'React.createElement("area", { rel: "author" })'},
    {code: 'React.createElement("area", { rel: ["author"] })'},
    {code: '<area rel="bookmark"></area>'},
    {code: 'React.createElement("area", { rel: "bookmark" })'},
    {code: 'React.createElement("area", { rel: ["bookmark"] })'},
    {code: '<area rel="external"></area>'},
    {code: 'React.createElement("area", { rel: "external" })'},
    {code: 'React.createElement("area", { rel: ["external"] })'},
    {code: '<area rel="help"></area>'},
    {code: 'React.createElement("area", { rel: "help" })'},
    {code: 'React.createElement("area", { rel: ["help"] })'},
    {code: '<area rel="license"></area>'},
    {code: 'React.createElement("area", { rel: "license" })'},
    {code: 'React.createElement("area", { rel: ["license"] })'},
    {code: '<area rel="next"></area>'},
    {code: 'React.createElement("area", { rel: "next" })'},
    {code: 'React.createElement("area", { rel: ["next"] })'},
    {code: '<area rel="nofollow"></area>'},
    {code: 'React.createElement("area", { rel: "nofollow" })'},
    {code: 'React.createElement("area", { rel: ["nofollow"] })'},
    {code: '<area rel="noopener"></area>'},
    {code: 'React.createElement("area", { rel: "noopener" })'},
    {code: 'React.createElement("area", { rel: ["noopener"] })'},
    {code: '<area rel="noreferrer"></area>'},
    {code: 'React.createElement("area", { rel: "noreferrer" })'},
    {code: 'React.createElement("area", { rel: ["noreferrer"] })'},
    {code: '<area rel="opener"></area>'},
    {code: 'React.createElement("area", { rel: "opener" })'},
    {code: 'React.createElement("area", { rel: ["opener"] })'},
    {code: '<area rel="prev"></area>'},
    {code: 'React.createElement("area", { rel: "prev" })'},
    {code: 'React.createElement("area", { rel: ["prev"] })'},
    {code: '<area rel="search"></area>'},
    {code: 'React.createElement("area", { rel: "search" })'},
    {code: 'React.createElement("area", { rel: ["search"] })'},
    {code: '<area rel="tag"></area>'},
    {code: 'React.createElement("area", { rel: "tag" })'},
    {code: 'React.createElement("area", { rel: ["tag"] })'},
    {code: '<link rel="alternate"></link>'},
    {code: 'React.createElement("link", { rel: "alternate" })'},
    {code: 'React.createElement("link", { rel: ["alternate"] })'},
    {code: '<link rel="author"></link>'},
    {code: 'React.createElement("link", { rel: "author" })'},
    {code: 'React.createElement("link", { rel: ["author"] })'},
    {code: '<link rel="canonical"></link>'},
    {code: 'React.createElement("link", { rel: "canonical" })'},
    {code: 'React.createElement("link", { rel: ["canonical"] })'},
    {code: '<link rel="dns-prefetch"></link>'},
    {code: 'React.createElement("link", { rel: "dns-prefetch" })'},
    {code: 'React.createElement("link", { rel: ["dns-prefetch"] })'},
    {code: '<link rel="help"></link>'},
    {code: 'React.createElement("link", { rel: "help" })'},
    {code: 'React.createElement("link", { rel: ["help"] })'},
    {code: '<link rel="icon"></link>'},
    {code: 'React.createElement("link", { rel: "icon" })'},
    {code: 'React.createElement("link", { rel: ["icon"] })'},
    {code: '<link rel="license"></link>'},
    {code: 'React.createElement("link", { rel: "license" })'},
    {code: 'React.createElement("link", { rel: ["license"] })'},
    {code: '<link rel="manifest"></link>'},
    {code: 'React.createElement("link", { rel: "manifest" })'},
    {code: 'React.createElement("link", { rel: ["manifest"] })'},
    {code: '<link rel="modulepreload"></link>'},
    {code: 'React.createElement("link", { rel: "modulepreload" })'},
    {code: 'React.createElement("link", { rel: ["modulepreload"] })'},
    {code: '<link rel="next"></link>'},
    {code: 'React.createElement("link", { rel: "next" })'},
    {code: 'React.createElement("link", { rel: ["next"] })'},
    {code: '<link rel="pingback"></link>'},
    {code: 'React.createElement("link", { rel: "pingback" })'},
    {code: 'React.createElement("link", { rel: ["pingback"] })'},
    {code: '<link rel="preconnect"></link>'},
    {code: 'React.createElement("link", { rel: "preconnect" })'},
    {code: 'React.createElement("link", { rel: ["preconnect"] })'},
    {code: '<link rel="prefetch"></link>'},
    {code: 'React.createElement("link", { rel: "prefetch" })'},
    {code: 'React.createElement("link", { rel: ["prefetch"] })'},
    {code: '<link rel="preload"></link>'},
    {code: 'React.createElement("link", { rel: "preload" })'},
    {code: 'React.createElement("link", { rel: ["preload"] })'},
    {code: '<link rel="prerender"></link>'},
    {code: 'React.createElement("link", { rel: "prerender" })'},
    {code: 'React.createElement("link", { rel: ["prerender"] })'},
    {code: '<link rel="prev"></link>'},
    {code: 'React.createElement("link", { rel: "prev" })'},
    {code: 'React.createElement("link", { rel: ["prev"] })'},
    {code: '<link rel="search"></link>'},
    {code: 'React.createElement("link", { rel: "search" })'},
    {code: 'React.createElement("link", { rel: ["search"] })'},
    {code: '<link rel="stylesheet"></link>'},
    {code: 'React.createElement("link", { rel: "stylesheet" })'},
    {code: 'React.createElement("link", { rel: ["stylesheet"] })'},
    {code: '<form rel="external"></form>'},
    {code: 'React.createElement("form", { rel: "external" })'},
    {code: 'React.createElement("form", { rel: ["external"] })'},
    {code: '<form rel="help"></form>'},
    {code: 'React.createElement("form", { rel: "help" })'},
    {code: 'React.createElement("form", { rel: ["help"] })'},
    {code: '<form rel="license"></form>'},
    {code: 'React.createElement("form", { rel: "license" })'},
    {code: 'React.createElement("form", { rel: ["license"] })'},
    {code: '<form rel="next"></form>'},
    {code: 'React.createElement("form", { rel: "next" })'},
    {code: 'React.createElement("form", { rel: ["next"] })'},
    {code: '<form rel="nofollow"></form>'},
    {code: 'React.createElement("form", { rel: "nofollow" })'},
    {code: 'React.createElement("form", { rel: ["nofollow"] })'},
    {code: '<form rel="noopener"></form>'},
    {code: 'React.createElement("form", { rel: "noopener" })'},
    {code: 'React.createElement("form", { rel: ["noopener"] })'},
    {code: '<form rel="noreferrer"></form>'},
    {code: 'React.createElement("form", { rel: "noreferrer" })'},
    {code: 'React.createElement("form", { rel: ["noreferrer"] })'},
    {code: '<form rel="opener"></form>'},
    {code: 'React.createElement("form", { rel: "opener" })'},
    {code: 'React.createElement("form", { rel: ["opener"] })'},
    {code: '<form rel="prev"></form>'},
    {code: 'React.createElement("form", { rel: "prev" })'},
    {code: 'React.createElement("form", { rel: ["prev"] })'},
    {code: '<form rel="search"></form>'},
    {code: 'React.createElement("form", { rel: "search" })'},
    {code: 'React.createElement("form", { rel: ["search"] })'},
    {code: '<form rel={callFoo()}></form>'},
    {code: 'React.createElement("form", { rel: callFoo() })'},
    {code: 'React.createElement("form", { rel: [callFoo()] })'},
    {code: '<a rel={{a: "noreferrer"}["a"]}></a>'},
    {code: '<a rel={{a: "noreferrer"}["b"]}></a>'},
    {code: '<Foo rel></Foo>'},
    {code: 'React.createElement("Foo", { rel: true })'}
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
      code: 'React.createElement("html", { rel: 1 })',
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
      code: 'React.createElement("a", { rel: 1 })',
      errors: [{
        message: '1 is never a valid "rel" attribute value.'
      }]
    },
    {
      code: 'React.createElement("a", { rel() { return 1; } })',
      errors: [{
        message: 'The "rel" attribute cannot be a method.'
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
      code: 'React.createElement("a", { rel: ["noreferrer", "noopener", "foobar" ] })',
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
