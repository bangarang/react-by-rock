var React = require('react'),
    InlineSVG = require('react-inlinesvg');

var Router = require('react-router');
var Link = Router.Link;

var Card = React.createClass({

  getInitialState: function() {
    return { value: '' }
  },

  componentWillMount: function(){
    var self = this;
    var value;
    switch(self.props.sort){
      case 11:
        value = 'J';
        break;
      case 12:
        value = 'Q';
        break;
      case 13:
        value = 'K';
        break;
      case 14:
        value = 'A';
        break;
      default:
        value = self.props.sort;
    }

    self.setState({value: value})
  },

  render: function() {
    var self = this;
    var color = "black";

    if (self.props.suit == "Diamond" || self.props.suit == "Heart" ) {
      color = "red";
    }

    return ( 
      <div className="card_wrapper">
        <div className={"card " + color}>
          <div className="face">
            <span>{self.state.value}</span>
            <InlineSVG src={"/img/suits/" + self.props.suit + ".svg"} />
          </div>
        </div>
      </div>
      )
  }
});

module.exports = Card;