var React = require('react'),
    Router = require('react-router');

var Markdown2HTML = require('react-markdown-to-html');
var Card = require('../../components/card.jsx');

var Highlight = require('react-highlight');

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

            <Markdown2HTML src="/md/react.md" />            

            <Card suit="Heart" sort={5} />

          </div>
        </div>
      
    )
  }
});

module.exports = Main;