var React = require('react'),
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
    var deck = Shuffle.shuffle();
    var card = deck.draw(1);
    return { cards: [card], deck: deck };
  },

  componentWillMount: function () {
    var self = this;
    var router = self.context.router;
    var suit = router.getCurrentParams().suit;
    var sort = router.getCurrentParams().sort;

    self.setState({suit: suit, sort: sort});

  },

  addCard: function(){
    var self = this;
    var cards = self.state.cards;
    var deck = self.state.deck;

    var tmp_cards = deck.draw(1);
    var new_cards = cards.concat(tmp_cards);
    self.setState({cards: new_cards});
  },

  addFive: function(){
    var self = this;
    var cards = self.state.cards;
    var deck = self.state.deck;

    var tmp_cards = deck.draw(5);
    var new_cards = cards.concat(tmp_cards);
    self.setState({cards: new_cards});
  },


  render: function() {
    var self = this;

    var cards = self.state.cards.map(function(object){
      return <Card suit={object.suit} sort={object.sort} key={object.suit + object.sort} show_code={true}/>
    });

    return (
        <div className="page">
          <div className="controls">
            <span className="button" onClick={self.addCard}>Add Card</span>
            <span className="button" onClick={self.addFive}>Add 5</span>
          </div>

          <TransitionGroup transitionName="slide-up" className="example-cards" component="div">
            {cards}
          </TransitionGroup> 

          
        </div>
    )
  }
});

module.exports = Main;