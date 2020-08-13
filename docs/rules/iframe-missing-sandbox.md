# Enforce sandbox attribute on iframe elements (react/iframe-missing-sandbox)

The sandbox attribute enables an extra set of restrictions for the content in the iframe. Using sandbox attribute is considered a good security practice.

See https://www.w3schools.com/tags/att_iframe_sandbox.asp

## Rule Details

This rule checks all JSX iframe elements and verifies that there is sandbox attribute and that it's value is valid. In addition to that it also reports cases where attribute contains `allow-scripts` and `allow-same-origin` at the same time as this combination allows the embedded document to remove the sandbox attribute and bypass the restrictions.

The following patterns are considered warnings:

```jsx
var React = require('react');

var Frame = <iframe></iframe>;
```

The following patterns are **not** considered warnings:

```jsx
var React = require('react');

var Frame = <iframe sandbox="allow-popups"/>;
```

## When not to use

If you don't want to enforce sandbox attribute on iframe elements.
