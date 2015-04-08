var React = require('react'),
    InlineSVG = require('react-inlinesvg');

var Router = require('react-router');
var Link = Router.Link;

var Card = React.createClass({
  contextTypes: {
      router: React.PropTypes.func
  },

  getInitialState: function() {
    return { value: '', slected: false }
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

    var color = "black";
      
    if (self.props.suit == "Diamond" || self.props.suit == "Heart" ) {
      color = "red";
    }

    self.setState({value: value, color: color});
  },

  selectCard: function(){
    this.setState({selected: !this.state.selected });
  },

  gotoCard: function(){
    var self = this;
    this.context.router.transitionTo( 'card', {suit: self.props.suit, sort: self.props.sort} );
  },

  render: function() {
    var self = this;
    var color = self.state.color,
        selected = self.state.selected,
        show_code = self.props.show_code;
    if (show_code){
      return ( 
        <div className="example_card">
          <div className={ selected ? "card_wrapper selected" : "card_wrapper" } onClick={self.selectCard}>
            <div className={"card " + color}>
              <div className="face">
                <span className="value">{self.state.value}</span>
                <InlineSVG src={"/img/suits/" + self.props.suit + ".svg"} />
              </div>
            </div>
          </div>
          <span className="code">
            <pre>this.state: {JSON.stringify(this.state)}</pre>
            <pre>this.props: {JSON.stringify(this.props)}</pre>
          </span>
        </div>

      )
    } else {
      return ( 
        <div className={ selected ? "card_wrapper selected" : "card_wrapper" } onClick={self.selectCard}>
          <div className={"card " + color}>
            <div className="face">
              <span className="value">{self.state.value}</span>
              <InlineSVG src={"/img/suits/" + self.props.suit + ".svg"} />
            </div>
          </div>
        </div>
      ) 
    }
  }
});

module.exports = Card;