# Prevent named imports from react (react/no-named-import)

Prevent the use of named imports from React, so it's visible in code that it's React and not custom code. This rule
also creates consistency inside a codebase because some people use named imports and some don't.

## Rule Details

The following patterns are considered warnings:

```jsx
import React, { Component } from 'react';
import { Component } from 'react';
```

The following patterns are **not** considered warnings:

```jsx
import React from 'react';
import * as React from 'react';
```
