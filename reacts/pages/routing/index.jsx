var React = require('react'),
    Router = require('react-router');

var Markdown2HTML = require('react-markdown-to-html');

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

            <Markdown2HTML src="/md/routing.md" />            

          </div>
        </div>
      
    )
  }
});

module.exports = Main;