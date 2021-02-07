# Limit maximum of props on a single line in JSX (react/jsx-max-props-per-line)

Limiting the maximum of props on a single line can improve readability.

**Fixable:** This rule is automatically fixable using the `--fix` flag on the command line. However, fix does not include indentation. Please rerun lint to correct those errors.

## Rule Details

This rule checks all JSX elements and verifies that the number of props per line do not exceed the maximum allowed. Props are considered to be in a new line if there is a line break between the start of the prop and the end of the previous prop. A spread attribute counts as one prop. This rule is off by default and when on the default maximum of props on one line is `1` for multiple and single line tags.

Examples of **incorrect** code for this rule:

```jsx
<Hello lastName="Smith" firstName="John" />;

<Hello foo={{
  bar
}} baz />;

<Hello lastName="Smith"
  firstName="John" 
/>;
```

Examples of **correct** code for this rule:

```jsx
<Hello
  firstName="John"
  lastName="Smith"
/>;

<Hello
  {...this.props}
  firstName="John"
  lastName="Smith"
/>;

<Hello lastName="Smith" />;
```

## Rule Options

```js
...
"react/jsx-max-props-per-line": [<enabled>, { "maximum": <object>, "when": <string> }]
...
```

### `maximum`

An array specifying the names of props that are forbidden. The default value of this option is `['className', 'style']`.

Maximum is an object that specifies the maximum allowed number of props for multiple and single line tags. The default value is `{single : 1, multi: 1}`. A single and multi line tag can have only one prop by default. And multiple line tags should have props starting from a new line.

Examples of **incorrect** code for this rule:

```jsx
// [1, { "maximum": { single : 2 } }]
<Hello firstName="John" lastName="Smith" tel={5555555} />;

// [2, { "maximum": { multi : 2 } }]
<Hello firstName="John" lastName="Smith"
  tel={5555555}
/>;

// [3, { "maximum": { multi : 2 } }]
<Hello
  firstName="John" lastName="Smith" tel={5555555}
/>;
```

Examples of **correct** code for this rule:

```jsx
// [1, { "maximum": { single : 2 } }]
<Hello firstName="John" lastName="Smith" />;

// [2, { "maximum": {} }]
<Hello firstName="John" />;

// [3, { "maximum": { multi : 2 } }]
<Hello
  firstName="John" lastName="Smith"
  tel={5555555}
/>;

// [4, { "maximum": {} }]
<Hello
  firstName="John" 
  lastName="Smith"
  tel={5555555}
/>;```

### `when`

Possible values:
- `always` (default) - Always check for max props per line.
- `multiline` - Only check for max props per line when jsx tag spans multiple lines.

Examples of **incorrect** code for this rule:
```jsx
// [1, { "when": "always" }]
<Hello firstName="John" lastName="Smith" />
```

Examples of **correct** code for this rule:
```jsx
// [1, { "when": "multiline" }]
<Hello firstName="John" lastName="Smith" />
<Hello
  firstName="John"
  lastName="Smith"
/>
```

## When not to use

If you are not using JSX then you can disable this rule.