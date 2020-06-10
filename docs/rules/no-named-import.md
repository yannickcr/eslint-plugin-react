# Prevent named imports from react (react/no-named-import)

Prevent the use of named imports from React, so it's visible in code that it's React and not custom code. This rule
also creates consistency inside a codebase because some people use named imports and some don't.

## Rule Details

### Options

This rule has two different modes: 'import' and 'property' which can be set using the first argument. The second arguments accepts an array of strings, which are the allowed modules to be imported or accessed via property.

```
"react/no-named-import": [<enabled>, 'import' | 'property', []]
```

By default the rule is set to `import` with an empty array, which means that all modules should be imported



Example configurations:

```javascript
// import
{
  "rules": {
    "react/no-named-import": ["error", 'import', ['Component', 'useState']]
  }
}

// property
{
  "rules": {
    "react/no-named-import": ["error", 'property', ['Component', 'useState']]
  }
}
```

The following patterns are considered warnings:

```jsx
const [loading, setLoading] = React.useState(false);

// ['property', []]
import React, { Component } from 'react';

// ['property', ['useState']]
import React, { useState } from 'react';

// ['property', ['useEffect']]
const [loading, setLoading] = React.useState(false);

// ['import', []]
const [loading, setLoading] = React.useState(false);

// ['import', ['useEffect']]
import React, { useState } from 'react';

// ['import', ['useState']]
const [loading, setLoading] = React.useState(false);


```

The following patterns are **not** considered warnings:

```jsx
import React, { useState } from 'react';

// ['property', []]
import React from 'react'; const [loading,setLoading] = React.useState(false);

// ['property', ['useState']]
import { useEffect } from 'react';

// ['property', ['useState']]
const [loading,setLoading] = React.useState(false);

// ['import', []]
import React, { useState } from 'react'; const [loading,setLoading] = useState(false);

// ['import', ['useEffect']]
import { useEffect } from 'react';

// ['import', ['useState']]
import { useState } from 'react'; const [loading,setLoading] = useState(false);

```
