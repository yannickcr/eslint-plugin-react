/**
 * @fileoverview Tests for no-named-import
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-named-import');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-named-import', rule, {
  valid: [
    {
      code: `import React from 'react';`
    },
    {
      code: `import { useEffect } from 'react';`,
      options: [{ whitelist: ['useEffect'] }]
    },
    {
      code: `import { useEffect } from 'react';`,
      options: [{ blacklist: ['Component'] }]
    }
  ],
  invalid: [
    {
      code: `import React, { Component } from 'react';`,
      errors: [
        {
          messageId: 'dontImport',
          data: { name: 'Component' }
        }
      ]
    },
    {
      code: `import { useEffect } from 'react';`,
      options: [{ whitelist: ['Component'] }],
      errors: [
        {
          messageId: 'dontImport',
          data: { name: 'useEffect' }
        }
      ]
    },
    {
      code: "import React, { Component } from 'react';",
      options: [{ blacklist: ['Component'] }],
      errors: [
        {
          messageId: 'dontImport',
          data: { name: 'Component' }
        }
      ]
    },
    {
      code: "import { Component } from 'react';",
      options: [{ blacklist: ['Component'] }],
      errors: [
        {
          messageId: 'dontImport',
          data: { name: 'Component' }
        }
      ]
    },
    {
      code: "import { useEffect } from 'react';",
      options: [{ whitelist: ['Component'] }],
      errors: [
        {
          messageId: 'dontImport',
          data: { name: 'useEffect' }
        }
      ]
    }
  ]
});
