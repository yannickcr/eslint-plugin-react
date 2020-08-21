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
      code: [
        'import React from \'react\';',
        'const [loading,setLoading] = React.useState(false);'
      ].join('\n'),
      options: ['property']
    },
    {
      code: "import React, { useState } from 'react'; const [loading,setLoading] = useState(false);",
      options: ['import']
    },
    {
      code: `
        import React, { useEffect, Component } from 'react';
        const [loading,setLoading] = React.useState(false);
      `,
      options: ['import', {
        useEffect: 'import',
        useState: 'property'
      }]
    },
    {
      code: `
        import { useEffect } from 'react';
        const [loading,setLoading] = React.useState(false);
        const a = React.Component;
      `,
      options: ['property', {
        useEffect: 'import',
        useState: 'property'
      }]
    }
  ],
  invalid: [
    {
      code: `
        import React from 'react';
        const [value, setValue] = React.useState('');
      `,
      output: `
        import React, { useState } from 'react';
        const [value, setValue] = useState('');
      `,
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: `
        import React from 'react';
        const [value, setValue] = React.useState('');
      `,
      output: `
        import React, { useState } from 'react';
        const [value, setValue] = useState('');
      `,
      options: ['import'],
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: `
        import React, { useState } from 'react';
        const [value, setValue] = useState('');
      `,
      output: `
        import React from 'react';
        const [value, setValue] = React.useState('');
      `,
      options: ['property'],
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'usePropertyAccessor',
          data: {name: 'useState'}
        }
      ]
    },
    {
      code: `
        import React from 'react';
        const [value, setValue] = React.useState('');
        React.useEffect(() => {},[]);
      `,
      output: `
        import React, { useEffect } from 'react';
        const [value, setValue] = React.useState('');
        useEffect(() => {},[]);
      `,
      options: ['property', {useEffect: 'import'}],
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'useEffect'}
        }
      ]
    },
    {
      code: `
        import React from 'react';
        const [value, setValue] = React.useState('');
        React.useEffect(() => {},[]);
      `,
      output: `
        import React, { useEffect } from 'react';
        const [value, setValue] = React.useState('');
        useEffect(() => {},[]);
      `,
      options: ['import', {useState: 'property'}],
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'useEffect'}
        }
      ]
    }
  ]
});
