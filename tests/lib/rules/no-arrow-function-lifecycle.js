/**
 * @fileoverview It is not necessary to use arrow function for lifecycle methods
 * @author Tan Nguyen
 */
'use strict';

const rule = require('../../../lib/rules/no-arrow-function-lifecycle');
const RuleTester = require('eslint').RuleTester;

require('babel-eslint');

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
ruleTester.run('no-arrow-function-lifecycle', rule, {
  valid: [{
    code: `
      var Hello = createReactClass({
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        getDefaultProps: function() { return {}; },
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        getInitialState: function() { return {}; },
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        getChildContext: function() { return {}; },
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        getDerivedStateFromProps: function() { return {}; },
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        componentWillMount: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        UNSAFE_componentWillMount: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        componentDidMount: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        componentWillReceiveProps: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        UNSAFE_componentWillReceiveProps: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        shouldComponentUpdate: function() { return true; },
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        componentWillUpdate: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        UNSAFE_componentWillUpdate: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        getSnapshotBeforeUpdate: function() { return {}; },
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        componentDidUpdate: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        componentDidCatch: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        componentWillUnmount: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      var Hello = createReactClass({
        componentWillUnmount: function() {},
        render: function() { return <div />; }
      });
    `
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getDefaultProps() { return {}; }
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getInitialState() { return {}; }
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getChildContext() { return {}; }
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getDerivedStateFromProps() { return {}; }
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentWillMount() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        UNSAFE_componentWillMount() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentDidMount() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentWillReceiveProps() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        UNSAFE_componentWillReceiveProps() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        shouldComponentUpdate() { return true; }
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentWillUpdate() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        UNSAFE_componentWillUpdate() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getSnapshotBeforeUpdate() { return {}; }
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentDidUpdate() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentDidCatch() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentWillUnmount() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentWillUnmount() {}
        render() { return <div />; }
      }
    `,
    parser: 'babel-eslint'
  }],

  invalid: [{
    code: `
      var Hello = createReactClass({
        render: () => { return <div />; }
      });
    `,
    errors: [{
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        getDefaultProps: () => { return {}; },
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'getDefaultProps is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        getInitialState: () => { return {}; },
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'getInitialState is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        getChildContext: () => { return {}; },
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'getChildContext is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        getDerivedStateFromProps: () => { return {}; },
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'getDerivedStateFromProps is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        componentWillMount: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'componentWillMount is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        UNSAFE_componentWillMount: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'UNSAFE_componentWillMount is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        componentDidMount: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'componentDidMount is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        componentWillReceiveProps: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'componentWillReceiveProps is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        UNSAFE_componentWillReceiveProps: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'UNSAFE_componentWillReceiveProps is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        shouldComponentUpdate: () => { return true; },
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'shouldComponentUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        componentWillUpdate: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'componentWillUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        UNSAFE_componentWillUpdate: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'UNSAFE_componentWillUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        getSnapshotBeforeUpdate: () => { return {}; },
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'getSnapshotBeforeUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        componentDidUpdate: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'componentDidUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        componentDidCatch: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'componentDidCatch is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        componentWillUnmount: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'componentWillUnmount is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      var Hello = createReactClass({
        componentWillUnmount: () => {},
        render: function() { return <div />; }
      });
    `,
    errors: [{
      message: 'componentWillUnmount is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getDefaultProps = () => { return {}; }
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'getDefaultProps is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getInitialState = () => { return {}; }
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'getInitialState is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getChildContext = () => { return {}; }
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'getChildContext is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getDerivedStateFromProps = () => { return {}; }
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'getDerivedStateFromProps is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentWillMount = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'componentWillMount is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        UNSAFE_componentWillMount = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'UNSAFE_componentWillMount is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentDidMount = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'componentDidMount is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentWillReceiveProps = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'componentWillReceiveProps is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        UNSAFE_componentWillReceiveProps = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'UNSAFE_componentWillReceiveProps is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        shouldComponentUpdate = () => { return true; }
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'shouldComponentUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentWillUpdate = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'componentWillUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        UNSAFE_componentWillUpdate = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'UNSAFE_componentWillUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        getSnapshotBeforeUpdate = () => { return {}; }
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'getSnapshotBeforeUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentDidUpdate = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'componentDidUpdate is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentDidCatch = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'componentDidCatch is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }, {
    code: `
      class Hello extends React.Component {
        handleEventMethods = () => {}
        componentWillUnmount = () => {}
        render = () => { return <div />; }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'componentWillUnmount is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }, {
      message: 'render is a React lifecycle method, and should not be an arrow function. Use an instance method instead.'
    }]
  }]
});
