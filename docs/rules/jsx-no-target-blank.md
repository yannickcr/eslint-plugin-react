# Prevent usage of unsafe `target='_blank'` (react/jsx-no-target-blank)

When creating a JSX element that has an `a` tag or a `form` tag, it is often desired to have
the link open in a new tab using the `target='_blank'` attribute. Using this
attribute unaccompanied by `rel='noreferrer noopener'`, however, is a severe
security vulnerability ([see here for more details](https://mathiasbynens.github.io/rel-noopener))
This rules requires that you accompany `target='_blank'` attributes with `rel='noreferrer noopener'`.

## Rule Details

This rule aims to prevent user generated link hrefs and form actions from creating security vulnerabilities by requiring `rel='noreferrer noopener'` for external link hrefs and form actions, and optionally any dynamically generated link hrefs and form actions.

## Rule Options
```json
...
"react/jsx-no-target-blank": [<enabled>, {
  "enforceDynamicLinks": <enforce>,
  "links": <boolean>,
  "forms": <boolean>,
}]
...
```

* enabled: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
* `enforceDynamicLinks` - enforce: optional string, 'always' or 'never'
* `links` - Prevent usage of unsafe `target='_blank'` inside links, defaults to `true`
* `forms` - Prevent usage of unsafe `target='_blank'` inside forms, defaults to `false`

### `enforceDynamicLinks`

#### always

`{"enforceDynamicLinks": "always"}` enforces the rule if the href is a dynamic link (default)

When {"enforceDynamicLinks": "always"} is set, the following patterns are considered errors:

```jsx
var Hello = <a target='_blank' href="http://example.com/"></a>
var Hello = <a target='_blank' href={dynamicLink}></a>
```

The following patterns are **not** considered errors:

```jsx
var Hello = <p target="_blank"></p>
var Hello = <a target="_blank" rel="noopener noreferrer" href="http://example.com"></a>
var Hello = <a target="_blank" href="relative/path/in/the/host"></a>
var Hello = <a target="_blank" href="/absolute/path/in/the/host"></a>
var Hello = <a></a>
```

#### never

`{"enforceDynamicLinks": "never"}` does not enforce the rule if the href is a dynamic link

When {"enforceDynamicLinks": "never"} is set, the following patterns are **not** considered errors:

```jsx
var Hello = <a target='_blank' href={dynamicLink}></a>
```

### `links` / `forms`

When option `forms` is set to `true`, the following is considered an error:

```jsx
var Hello = <form target='_blank' action="http://example.com/"></form>
```
When option `links` is set to `true`, the following is considered an error:

```jsx
var Hello = <a target='_blank' href="http://example.com/"></form>
```

### Custom link components

This rule supports the ability to use custom components for links, such as `<Link />` which is popular in libraries like `react-router`, `next.js` and `gatsby`. To enable this, define your custom link components in the global [shared settings](https://github.com/yannickcr/eslint-plugin-react/blob/master/README.md#configuration) under the `linkComponents` configuration area. Once configured, this rule will check those components as if they were `<a />` elements.

The following patterns are considered errors:

```jsx
var Hello = <Link target="_blank" to="http://example.com/"></Link>
var Hello = <Link target="_blank" to={dynamicLink}></Link>
```

The following patterns are **not** considered errors:

```jsx
var Hello = <Link target="_blank" rel="noopener noreferrer" to="http://example.com"></Link>
var Hello = <Link target="_blank" to="relative/path/in/the/host"></Link>
var Hello = <Link target="_blank" to="/absolute/path/in/the/host"></Link>
var Hello = <Link />
```

### Custom form components

This rule supports the ability to use custom components for forms. To enable this, define your custom form components in the global [shared settings](https://github.com/yannickcr/eslint-plugin-react/blob/master/README.md#configuration) under the `formComponents` configuration area. Once configured, this rule will check those components as if they were `<form />` elements.


## When Not To Use It

If you do not have any external links or forms, you can disable this rule
