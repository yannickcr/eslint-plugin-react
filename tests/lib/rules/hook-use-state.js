/**
 * @fileoverview Ensure symmetric naming of setState hook value and setter variables
 * @author Duncan Beevers
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/hook-use-state');
const parsers = require('../../helpers/parsers');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
});

const tests = {
  valid: [
    {
      code: `import { useState } from 'react';
      const [color, setColor] = useState()`
    },
    {
      code: `import { useState } from 'react';
      const [color, setColor] = useState('#ffffff')`
    },
    {
      code: `import { useState } from 'react';
      const [color, setColor] = React.useState()`
    },
    {
      code: `import { useState } from 'react';
      const [color1, setColor1] = useState()`
    },
    {
      code: 'const result = useState()'
    },
    {
      code: `import { useRef } from 'react';
      const result = useState()`
    },
    {
      code: 'const result = React.useState()'
    },
    {
      code: `import { useState } from 'react';
      const [color, setColor] = useState<string>()`,
      parser: parsers.TYPESCRIPT_ESLINT
    },
    {
      code: `import { useState } from 'react';
      const [color, setColor] = useState<string>('#ffffff')`,
      parser: parsers.TYPESCRIPT_ESLINT
    }
  ].concat(parsers.TS([
    {
      code: `import { useState } from 'react';
      const [color, setColor] = useState<string>()`,
      parser: parsers['@TYPESCRIPT_ESLINT']
    },
    {
      code: `import { useState } from 'react';
      const [color, setColor] = useState<string>('#ffffff')`,
      parser: parsers['@TYPESCRIPT_ESLINT']
    }
  ])
  ),
  invalid: [
    {
      code: `import { useState } from 'react';
      useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState as useStateAlternativeName } from 'react';
      useStateAlternativeName()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState } from 'react';
      const result = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState } from 'react';
      const result = React.useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState } from 'react';
      const [, , extra1] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState } from 'react';
      const [, setColor] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState } from 'react';
      const { color } = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState } from 'react';
      const [] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState } from 'react';
      const [, , , ,] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState } from 'react';
      const [color] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }],
      output: `import { useState } from 'react';
      const [color, setColor] = useState()`
    },
    {
      code: `import { useState } from 'react';
      const [color, , extra1] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }],
      output: `import { useState } from 'react';
      const [color, setColor] = useState()`
    },
    {
      code: `import { useState } from 'react';
      const [color, setColor, extra1, extra2, extra3] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }],
      output: `import { useState } from 'react';
      const [color, setColor] = useState()`
    },
    {
      code: `import { useState } from 'react';
      const [, makeColor] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }]
    },
    {
      code: `import { useState } from 'react';
      const [color, setFlavor, extraneous] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }],
      output: `import { useState } from 'react';
      const [color, setColor] = useState()`
    },
    {
      code: `import { useState } from 'react';
      const [color, setFlavor] = useState()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }],
      output: `import { useState } from 'react';
      const [color, setColor] = useState()`
    },
    {
      code: `import { useState } from 'react';
      const [color, setFlavor] = useState<string>()`,
      errors: [{
        message: 'setState call is not destructured into value + setter pair'
      }],
      output: `import { useState } from 'react';
      const [color, setColor] = useState<string>()`,
      parser: parsers.TYPESCRIPT_ESLINT
    }
  ].concat(
    parsers.TS([
      {
        code: `import { useState } from 'react';
        const [color, setFlavor] = useState<string>()`,
        errors: [{
          message: 'setState call is not destructured into value + setter pair'
        }],
        output: `import { useState } from 'react';
        const [color, setColor] = useState<string>()`,
        parser: parsers['@TYPESCRIPT_ESLINT']
      }
    ])
  )
};

ruleTester.run('hook-set-state-names', rule, tests);
