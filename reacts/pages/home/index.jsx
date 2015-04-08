var React = require('react'),
    Router = require('react-router');

var Main = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {  };
  },

  render: function() {
    var self = this;

    return (
        <div className="page">
          <div className="container">
            <h2>Hello</h2>

            <h3>Routing</h3>
            <p><a href="https://github.com/rackt/react-router" target="_blank">react-router</a></p>

            <h3>Animation</h3>
            <p><a href="https://facebook.github.io/react/docs/animation.html" target="_blank">ReactCSSTransitionGroup</a></p>
            <p><a href="https://github.com/julianshapiro/velocity" target="_blank">Velocity.js</a></p>
            <p><a href="https://gist.github.com/tkafka/0d94c6ec94297bb67091" target="_blank">VelocityTransitionGroup.jsx</a></p>

            <h3>Tools</h3>
            <p><a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en" target="_blank">React Developer Tools for Chrome</a></p>
            <p><a href="https://github.com/facebook/react/wiki/Complementary-Tools" target="_blank">Complimentary Tools List</a></p>

            <h3>Components</h3>
            <p><a href="https://github.com/matthewwithanm/react-inlinesvg" target="_blank">react-inlinesvg</a></p>
            <p><a href="https://github.com/troygoode/node-shuffle" target="_blank">node-shuffle</a></p>
            <p><a href="https://github.com/glenjamin/react-hotkey" target="_blank">React Hotkeys</a></p>

          </div>
        </div>
      
    )
  }
});

module.exports = Main;