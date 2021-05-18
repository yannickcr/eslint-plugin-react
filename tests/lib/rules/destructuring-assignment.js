/**
 * @fileoverview Rule to forbid or enforce destructuring assignment consistency.
 */

'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/destructuring-assignment');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('destructuring-assignment', rule, {
  valid: [{
    code: `const MyComponent = ({ id, className }) => (
      <div id={id} className={className} />
    );`
  }, {
    code: `const MyComponent = (props) => {
      const { id, className } = props;
      return <div id={id} className={className} />
    };`,
    parser: parsers.BABEL_ESLINT
  }, {
    code: `const MyComponent = ({ id, className }) => (
      <div id={id} className={className} />
    );`,
    options: ['always']
  }, {
    code: `const MyComponent = (props) => {
      const { id, className } = props;
      return <div id={id} className={className} />
    };`
  }, {
    code: `const MyComponent = (props) => {
      const { id, className } = props;
      return <div id={id} className={className} />
    };`,
    options: ['always']
  }, {
    code: `const MyComponent = (props) => (
      <div id={id} props={props} />
    );`
  }, {
    code: `const MyComponent = (props) => (
      <div id={id} props={props} />
    );`,
    options: ['always']
  }, {
    code: `const MyComponent = (props, { color }) => (
      <div id={id} props={props} color={color} />
    );`
  }, {
    code: `const MyComponent = (props, { color }) => (
      <div id={id} props={props} color={color} />
    );`,
    options: ['always']
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    };`,
    options: ['never']
  }, {
    code: `class Foo extends React.Component {
      doStuff() {}
      render() {
        return <div>{this.props.foo}</div>;
      }
    }`,
    options: ['never']
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`,
    options: ['always']
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`,
    options: ['always'],
    parser: parsers.BABEL_ESLINT
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`,
    options: ['always'],
    parser: parsers.TYPESCRIPT_ESLINT
  }, {
    code: `const MyComponent = (props) => {
      const { h, i } = hi;
      return <div id={props.id} className={props.className} />
    };`,
    options: ['never'],
    parser: parsers.BABEL_ESLINT
  }, {
    code: `const Foo = class extends React.PureComponent {
      constructor() {
        this.state = {};
        this.state.foo = 'bar';
      }
    };`,
    options: ['always']
  }, {
    code: [
      'const div = styled.div`',
      '  & .button {',
      '    border-radius: ${props => props.borderRadius}px;',
      '  }',
      '`'
    ].join('\n')
  }, {
    code: `
      export default (context: $Context) => ({
        foo: context.bar
      });
    `,
    parser: parsers.BABEL_ESLINT
  }, {
    code: `
      class Foo {
        bar(context) {
          return context.baz;
        }
      }
    `
  }, {
    code: `
      class Foo {
        bar(props) {
          return props.baz;
        }
      }
    `
  }, {
    code: `
      class Foo extends React.Component {
        bar = this.props.bar
      }
    `,
    options: ['always', {ignoreClassFields: true}],
    parser: parsers.BABEL_ESLINT
  }, {
    code: [
      'class Input extends React.Component {',
      '  id = `${this.props.name}`;',
      '  render() {',
      '    return <div />;',
      '  }',
      '}'
    ].join('\n'),
    options: ['always', {ignoreClassFields: true}],
    parser: parsers.BABEL_ESLINT
  },
  // https://github.com/yannickcr/eslint-plugin-react/issues/2911
  {
    code: `
      function Foo({context}) {
        const d = context.describe()
        return <div>{d}</div>
      }
    `,
    options: ['always'],
    parser: parsers.BABEL_ESLINT
  }],

  invalid: [{
    code: `const MyComponent = (props) => {
      return (<div id={props.id} />)
    };`,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `const MyComponent = ({ id, className }) => (
      <div id={id} className={className} />
    );`,
    options: ['never'],
    errors: [{
      messageId: 'noDestructPropsInSFCArg'
    }]
  }, {
    code: `const MyComponent = (props, { color }) => (
      <div id={props.id} className={props.className} />
    );`,
    options: ['never'],
    errors: [{
      messageId: 'noDestructContextInSFCArg'
    }]
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    };`,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        return <div>{this.state.foo}</div>;
      }
    };`,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'state'}
    }]
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        return <div>{this.context.foo}</div>;
      }
    };`,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'context'}
    }]
  }, {
    code: `class Foo extends React.Component {
      render() { return this.foo(); }
      foo() {
        return this.props.children;
      }
    }`,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `var Hello = React.createClass({
      render: function() {
        return <Text>{this.props.foo}</Text>;
      }
    });`,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `
      module.exports = {
        Foo(props) {
          return <p>{props.a}</p>;
        }
      }
    `,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `
      export default function Foo(props) {
        return <p>{props.a}</p>;
      }
    `,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `
      function HOF() {
        return (props) => <p>{props.a}</p>;
      }
    `,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        const foo = this.props.foo;
        return <div>{foo}</div>;
      }
    };`,
    errors: [{
      messageId: 'useDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`,
    options: ['never'],
    parser: parsers.BABEL_ESLINT,
    errors: [{
      messageId: 'noDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `const MyComponent = (props) => {
      const { id, className } = props;
      return <div id={id} className={className} />
    };`,
    options: ['never'],
    parser: parsers.BABEL_ESLINT,
    errors: [{
      messageId: 'noDestructAssignment',
      data: {type: 'props'}
    }]
  }, {
    code: `const Foo = class extends React.PureComponent {
      render() {
        const { foo } = this.state;
        return <div>{foo}</div>;
      }
    };`,
    options: ['never'],
    parser: parsers.BABEL_ESLINT,
    errors: [{
      messageId: 'noDestructAssignment',
      data: {type: 'state'}
    }]
  }]
});
