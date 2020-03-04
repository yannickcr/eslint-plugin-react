# Prevent named imports from react (react/no-named-import)

Prevent the use of named imports from React, so it's visible in code that it's React and not custom code. This rule
also creates consistency inside a codebase because some people use named imports and some don't.

## Rule Details

### Options

This rule has two different properties that can be used (not at the same time): `whitelist` and `blacklist`. Both are an array of strings. By default this rule whitelists nothing, so every named import will error.

Example configurations:

```javascript
// Blacklist
{
  "rules": {
    "react/no-named-import": ["error", {
      "blacklist": ["Component", "useEffect"]
    }]
  }
}

// Whitelist
{
  "rules": {
    "react/no-named-import": ["error", {
      "whitelist": ["Component", "useEffect"]
    }]
  }
}
```

The following patterns are considered warnings:

```jsx
// With { blacklist: ['Component']}
import React, { Component } from 'react';
import { Component } from 'react';

// With { whitelist: ['useEffect'] }
import React, { Component } from 'react';

// With no options provided
import React, { Component, useEffect } from 'react';
```

The following patterns are **not** considered warnings:

```jsx
// With { blacklist: ['Component']}
import React, { useEffect } from 'react';
import { useEffect } from 'react';

// With { whitelist: ['useEffect'] }
import React, { useEffect } from 'react';

// With no options provided
import React from 'react';
```
