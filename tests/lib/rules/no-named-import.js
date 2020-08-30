/**
 * @fileoverview Tests for no-named-import
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-named-import');
const parsers = require('../../helpers/parsers');

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

  ].concat(parsers.TS([
    {
      code: `
        import React from 'react';
        const Comp: React.AType = () => {}
        const a = (p: React.BType) => {}

        type A = {
          b: React.CType;
        }

        type B<C> = {
          d: C
        }

        type A = B<React.DType>;
      `,
      output: `
        import React, { AType, BType, CType, DType } from 'react';
        const Comp: AType = () => {}
        const a = (p: BType) => {}

        type A = {
          b: CType;
        }

        type B<C> = {
          d: C
        }

        type A = B<DType>;
      `,
      options: ['import'],
      parser: parsers['@TYPESCRIPT_ESLINT'],
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'AType'}
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'BType'}
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'CType'}
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'DType'}
        }
      ]
    },
    {
      code: `
        import React, { AType, BType, CType, DType } from 'react';
        const Comp: AType = () => {}
        const a = (p: BType) => {}

        type A = {
          b: CType;
        }

        type B<C> = {
          d: C
        }

        type A = B<DType>;
      `,
      output: `
        import React from 'react';
        const Comp: React.AType = () => {}
        const a = (p: React.BType) => {}

        type A = {
          b: React.CType;
        }

        type B<C> = {
          d: C
        }

        type A = B<React.DType>;
      `,
      options: ['property'],
      parser: parsers['@TYPESCRIPT_ESLINT'],
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'usePropertyAccessor',
          data: {name: 'AType'}
        },
        {
          messageId: 'usePropertyAccessor',
          data: {name: 'BType'}
        },
        {
          messageId: 'usePropertyAccessor',
          data: {name: 'CType'}
        },
        {
          messageId: 'usePropertyAccessor',
          data: {name: 'DType'}
        }
      ]
    },
    {
      code: `
        import React, { AType, BType } from 'react';
        type Props = {
          a: AType,
          b: BType
        }
      `,
      output: `
        import React, { BType } from 'react';
        type Props = {
          a: React.AType,
          b: BType
        }
      `,
      options: ['property', {BType: 'import'}],
      parser: parsers['@TYPESCRIPT_ESLINT'],
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'usePropertyAccessor',
          data: {name: 'AType'}
        }
      ]
    },
    {
      code: `
        import React from 'react';
        type Props = {
          a: React.AType,
          b: React.BType
        }
      `,
      output: `
        import React, { BType } from 'react';
        type Props = {
          a: React.AType,
          b: BType
        }
      `,
      options: ['import', {AType: 'property'}],
      parser: parsers['@TYPESCRIPT_ESLINT'],
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'BType'}
        }
      ]
    },
    {
      code: `
        import React, { AType } from 'react';
        type Props = {
          a: AType,
          b: React.BType
        }
      `,
      output: `
        import React, { BType } from 'react';
        type Props = {
          a: React.AType,
          b: BType
        }
      `,
      options: ['property', {BType: 'import'}],
      parser: parsers['@TYPESCRIPT_ESLINT'],
      errors: [
        {
          messageId: 'fixImportStatement'
        },
        {
          messageId: 'usePropertyAccessor',
          data: {name: 'AType'}
        },
        {
          messageId: 'useNamedImport',
          data: {name: 'BType'}
        }
      ]
    }
  ]))
});
