var React = require('react'),
    request = require('superagent'),
    util = require('util'),
    Velocity = require('velocity-animate/velocity'),
    Router = require('react-router');

var TransitionGroup = require('../../components/VelocityTransitionGroup.jsx');

require('velocity-animate/velocity.ui');

var Shuffle = require('shuffle');

var Card = require('../../components/card.jsx');


var Main = React.createClass({

  contextTypes: {
      router: React.PropTypes.func
  },

  getInitialState: function() {

    return { cards: Shuffle.playingCards(), current_cards: Shuffle.playingCards() };
  },

  componentWillMount: function () {
    var self = this;
    var router = self.context.router;
    var suit = router.getCurrentParams().suit;
    var sort = router.getCurrentParams().sort;

    console.log(router.getCurrentParams());
    self.setState({suit: suit, sort: sort});

  },

  componentDidMount: function () { 
    Velocity(
      document.getElementsByClassName('card_wrapper'), 
      "transition.slideUpBigIn",
      { stagger: 50 , display: "inline-block", duration: 150, delay: 0 }
    );
  }, 

  render: function() {
    var self = this;

    return (
        <div className="page">
          <Card suit={self.state.suit} sort={self.state.sort} key={self.state.suit + self.state.sort} />
        </div>
      
    )
  }
});

module.exports = Main;