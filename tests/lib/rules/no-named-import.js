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

const ERROR_MESSAGE = 'Named imports are not allowed on React.';

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-named-import', rule, {
  valid: [
    {
      code: "import React from 'react';"
    },
    {
      code: "import * as React from 'react';"
    }
  ],
  invalid: [
    {
      code: "import React, { Component } from 'react';",
      errors: [
        {
          message: ERROR_MESSAGE
        }
      ]
    },
    {
      code: "import { Component } from 'react';",
      errors: [
        {
          message: ERROR_MESSAGE
        }
      ]
    }
  ]
});
