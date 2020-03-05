# Prevent named imports from react (react/no-named-import)

Prevent the use of named imports from React, so it's visible in code that it's React and not custom code. This rule
also creates consistency inside a codebase because some people use named imports and some don't.

## Rule Details

### Options

This rule has two different properties that can be used (not at the same time): `allow` and `forbid`. Both are an array of strings. By default this rule allows nothing, so every named import will error.

Example configurations:

```javascript
// forbid
{
  "rules": {
    "react/no-named-import": ["error", {
      "forbid": ["Component", "useEffect"]
    }]
  }
}

// allow
{
  "rules": {
    "react/no-named-import": ["error", {
      "allow": ["Component", "useEffect"]
    }]
  }
}
```

The following patterns are considered warnings:

```jsx
// With { forbid: ['Component']}
import React, { Component } from 'react';
import { Component } from 'react';

// With { allow: ['useEffect'] }
import React, { Component } from 'react';

// With { allow: ['useState'], forceImport: true }
import React from 'react';
const [loading, setLoading] = React.useState(false);

// With { allow: [], forceImport: true }
import React, { useState } from 'react';
const [loading, setLoading] = React.useState(false);

// With no options provided (equals { allow: [], forceImport: false})
import React, { Component, useEffect } from 'react';
```

The following patterns are **not** considered warnings:

```jsx
// With { forbid: ['Component']}
import React, { useState } from 'react';
import { useState } from 'react';
const [loading, setLoading] = React.useState(false);

// With { forbid: ['Component'], forceImport: true }
import React, { useState } from 'react';
import { useState } from 'react';
const [loading, setLoading] = useState(false);

// With { forbid: [], forceImport: true }
import React, { useState } from 'react';
const [loading, setLoading] = useState(false);

// With { allow: ['useEffect'] }
import React, { useEffect } from 'react';

// With { allow: ['useState'], forceImport: true }
import React, { useState } from 'react';
const [loading, setLoading] = useState(false);

// With no options provided
import React from 'react';
```
