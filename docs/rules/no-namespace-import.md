# Prevent namespace import from react (react/no-named-import)

Prevent the use of namespace import from react (import \* as React from 'react').

## Rule Details

The following patterns are considered warnings:

```jsx
import * as React from 'react';
```

The following patterns are **not** considered warnings:

```jsx
import React from 'react';
```
