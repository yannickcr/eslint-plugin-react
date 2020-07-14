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

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('no-named-import', rule, {
  valid: [
    {
      code: "import React from 'react';"
    },
    {
      code: "import React, { useState } from 'react';"
    },
    {
      code: "import React from 'react'; const [loading,setLoading] = React.useState(false);",
      options: ['property']
    },
    {
      code: "import React, { useState } from 'react'; const [loading,setLoading] = useState(false);",
      options: ['import']
    },
    {
      code: "import { useEffect, Component } from 'react'; const [loading,setLoading] = React.useState(false);",
      options: ['import', {
        useEffect: 'import',
        useState: 'property'
      }]
    },
    {
      code: "import { useEffect } from 'react'; const [loading,setLoading] = React.useState(false); const a = React.Component;",
      options: ['property', {
        useEffect: 'import',
        useState: 'property'
      }]
    }
  ],
  invalid: [
    {
      code: 'const [loading, setLoading] = React.useState(false);',
      errors: [
        {
          messageId: 'useImport',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: "import React, { useState } from 'react'",
      options: ['property'],
      errors: [
        {
          messageId: 'useProperty',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: 'const [loading, setLoading] = React.useState(false);',
      options: ['import'],
      errors: [
        {
          messageId: 'useImport',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: 'const [loading, setLoading] = React.useState(false);',
      options: ['property', {
        useState: 'import'
      }],
      errors: [
        {
          messageId: 'useImport',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: "import React, { useState } from 'react'",
      options: ['import', {useState: 'property'}],
      errors: [
        {
          messageId: 'useProperty',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: 'const comp = React.Component;',
      options: ['import', {useState: 'property'}],
      errors: [
        {
          messageId: 'useImport',
          data: {name: 'Component'}
        }
      ]
    }
  ]
});
