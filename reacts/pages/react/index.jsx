var React = require('react'),
    Router = require('react-router');

var Markdown2HTML = require('react-markdown-to-html');
var Card = require('../../components/card.jsx');


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
            <div className="card_demo">
              <Card suit="Heart" sort={5} />
            </div>
            <a href="https://facebook.github.io/react/" target="_blank" >Here are the React Docs for the record.</a>

          </div>
        </div>
      
    )
  }
});

module.exports = Main;