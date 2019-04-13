/**
 * @fileoverview Prevent declaring unused methods of component class
 * @author Paweł Nowak
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-unused-class-component-methods');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('no-unused-class-component-methods', rule, {
  valid: [
    {
      code: `
        class Foo extends React.Component {
          handleClick() {}
          render() {
            return <button onClick={this.handleClick}>Text</button>;
          }
        }
      `
    },
    {
      code: `
        class Foo extends React.Component {
          action() {}
          componentDidMount() {
            this.action();
          }
          render() {
            return null;
          }
        }
      `
    },
    {
      code: `
        class Foo extends React.Component {
          action() {}
          componentDidMount() {
            const action = this.action;
            action();
          }
          render() {
            return null;
          }
        }
      `
    },
    {
      code: `
        class Foo extends React.Component {
          getValue() {}
          componentDidMount() {
            const action = this.getValue();
          }
          render() {
            return null;
          }
        }
      `
    },
    {
      code: `
        class Foo extends React.Component {
          handleClick = () => {}
          render() {
            return <button onClick={this.handleClick}>Button</button>;
          }
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        class Foo extends React.Component {
          renderContent() {}
          render() {
            return <div>{this.renderContent()}</div>;
          }
        }
      `
    },
    {
      code: `
        class Foo extends React.Component {
          renderContent() {}
          render() {
            return (
              <div>
                <div>{this.renderContent()}</div>;
              </div>
            );
          }
        }
      `
    },
    {
      code: `
        class Foo extends React.Component {
          property = {}
          render() {
            return <div>Example</div>;
          }
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        class Foo extends React.Component {
          action = () => {}
          anotherAction = () => {
            this.action();
          }
          render() {
            return <button onClick={this.anotherAction}>Example</button>;
          }
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        class Foo extends React.Component {
          action = () => {}
          anotherAction = () => this.action()
          render() {
            return <button onClick={this.anotherAction}>Example</button>;
          }
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        class Foo extends React.Component {
          getValue = () => {}
          value = this.getValue()
          render() {
            return null;
          }
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        var Foo = React.createClass({
          action: function () {},
          render: function () {
            return <button onClick={this.action}>Example</button>;
          }
        });
      `
    },
    {
      code: `
        class Foo {
          action = () => {}
          anotherAction = () => this.action()
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        class Foo extends React.Component {
          action = async () => {}
          render() {
            return <button onClick={this.action}>Click</button>;
          }
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        class Foo extends React.Component {
          async action() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        class Foo extends React.Component {
          * action() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        class Foo extends React.Component {
          async * action() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
      parser: 'babel-eslint'
    },
    {
      code: `
        class Foo extends React.Component {
          action = function() {
            console.log('error');
          }
          render() {
            return <button onClick={() => this.action()}>Click</button>;
          }
        }
      `,
      parser: 'babel-eslint'
    }
  ],

  invalid: [
    {
      code: `
        class Foo extends React.Component {
          handleClick() {}
          render() {
            return null;
          }
        }
      `,
      errors: [{
        message: 'Unused method "handleClick" of class "Foo"',
        line: 3,
        column: 11
      }]
    },
    {
      code: `
        class Foo extends React.Component {
          handleScroll() {}
          handleClick() {}
          render() {
            return null;
          }
        }
      `,
      errors: [{
        message: 'Unused method "handleScroll" of class "Foo"',
        line: 3,
        column: 11
      }, {
        message: 'Unused method "handleClick" of class "Foo"',
        line: 4,
        column: 11
      }]
    },
    {
      code: `
        class Foo extends React.Component {
          handleClick = () => {}
          render() {
            return null;
          }
        }
      `,
      parser: 'babel-eslint',
      errors: [{
        message: 'Unused method "handleClick" of class "Foo"',
        line: 3,
        column: 11
      }]
    },
    {
      code: `
        class Foo extends React.Component {
          action = async () => {}
          render() {
            return null;
          }
        }
      `,
      parser: 'babel-eslint',
      errors: [{
        message: 'Unused method "action" of class "Foo"',
        line: 3,
        column: 11
      }]
    },
    {
      code: `
        class Foo extends React.Component {
          async action() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      parser: 'babel-eslint',
      errors: [{
        message: 'Unused method "action" of class "Foo"',
        line: 3,
        column: 11
      }]
    },
    {
      code: `
        class Foo extends React.Component {
          * action() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      parser: 'babel-eslint',
      errors: [{
        message: 'Unused method "action" of class "Foo"',
        line: 3,
        column: 11
      }]
    },
    {
      code: `
        class Foo extends React.Component {
          async * action() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      parser: 'babel-eslint',
      errors: [{
        message: 'Unused method "action" of class "Foo"',
        line: 3,
        column: 11
      }]
    },
    {
      code: `
        class Foo extends React.Component {
          action = function() {
            console.log('error');
          }
          render() {
            return null;
          }
        }
      `,
      parser: 'babel-eslint',
      errors: [{
        message: 'Unused method "action" of class "Foo"',
        line: 3,
        column: 11
      }]
    }
  ]
});
