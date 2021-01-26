# Enforce that namespaces are not used in JSX (react/jsx-no-namespace)

Enforces the absence of a namespace in JSX components, such as with `svg:circle`, as they are not supported in React.

## Rule Details

The following patterns are considered warnings:

```jsx
<ns:TestComponent />
```

```jsx
<Ns:TestComponent />
```

The following patterns are **not** considered warnings:

```jsx
<TestComponent />
```

```jsx
<testComponent />
```

## When not to use

If you are not using JSX.
