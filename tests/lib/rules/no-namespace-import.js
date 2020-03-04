/**
 * @fileoverview Tests for no-named-import
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-namespace-import');

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

const ERROR_MESSAGE = 'Namespace import is not allowed on React.';

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('no-namespace-import', rule, {
  valid: [
    {
      code: "import React from 'react';"
    }
  ],
  invalid: [
    {
      code: "import * as React from 'react';",
      errors: [
        {
          message: ERROR_MESSAGE
        }
      ]
    }
  ]
});
