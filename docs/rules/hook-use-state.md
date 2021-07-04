# Ensure destructuring and symmetric naming of useState hook value and setter variables (react/hook-use-state)

**Fixable:** In some cases, this rule is automatically fixable using the `--fix` flag on the command line.

## Rule Details

This rule checks whether the value and setter variables destructured from a `React.useState()` call are named symmetrically.

Examples of **incorrect** code for this rule:

```js
import React from 'react';
const useStateResult = React.useState();
```

```js
import { useState } from 'react';
const useStateResult = useState();
```

```js
import React from 'react';
const [color, updateColor] = React.useState();
```

Examples of **correct** code for this rule:


```js
import { useState } from 'react';
const [color, setColor] = useState();
```

```js
import React from 'react';
const [color, setColor] = React.useState();
```
