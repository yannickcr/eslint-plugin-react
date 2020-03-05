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
      code: "import { useEffect } from 'react';",
      options: [{allow: ['useEffect']}]
    },
    {
      code: "import { useEffect } from 'react';",
      options: [{forbid: ['Component']}]
    },
    {
      code: 'const [loading,setLoading] = React.useState(false);',
      options: [{forbid: ['useState']}]
    },
    {
      code: "import { useState } from 'react'; const [loading,setLoading] = useState(false);",
      options: [{forbid: ['useEffect'], forceImport: true}]
    },
    {
      code: 'const [loading,setLoading] = React.useState(false);',
      options: [{allow: ['useState']}]
    },
    {
      code: "import { useState } from 'react'; const [loading,setLoading] = useState(false);",
      options: [{allow: ['useState'], forceImport: true}]
    }
  ],
  invalid: [
    {
      code: "import React, { Component } from 'react';",
      errors: [
        {
          messageId: 'dontImport',
          data: {name: 'Component'}
        }
      ]
    },
    {
      code: "import { useEffect } from 'react';",
      options: [{allow: ['Component']}],
      errors: [
        {
          messageId: 'dontImport',
          data: {name: 'useEffect'}
        }
      ]
    },
    {
      code: "import React, { Component } from 'react';",
      options: [{forbid: ['Component']}],
      errors: [
        {
          messageId: 'dontImport',
          data: {name: 'Component'}
        }
      ]
    },
    {
      code: "import { Component } from 'react';",
      options: [{forbid: ['Component']}],
      errors: [
        {
          messageId: 'dontImport',
          data: {name: 'Component'}
        }
      ]
    },
    {
      code: "import { useState } from 'react'; const [loading,setLoading] = useState(false);",
      options: [{forbid: ['useState']}],
      errors: [
        {
          messageId: 'dontImport',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: "import React from 'react'; const [loading,setLoading] = React.useState(false);",
      options: [{forbid: ['useEffect'], forceImport: true}],
      errors: [
        {
          messageId: 'shouldImport',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: "import React from 'react'; const [loading,setLoading] = React.useState(false);",
      options: [{allow: ['useState'], forceImport: true}],
      errors: [
        {
          messageId: 'shouldImport',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: 'const [loading,setLoading] = React.useState(false);',
      options: [{forbid: [], forceImport: true}],
      errors: [
        {
          messageId: 'shouldImport',
          data: {name: 'useState'}
        }
      ]
    }
  ]
});
