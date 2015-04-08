var React = require('react'),
    request = require('superagent'),
    util = require('util'),
    Velocity = require('velocity-animate/velocity'),
    Cards = require('cards'),
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

  filterAll: function(){
    var self = this;

    self.setState({ current_cards: self.state.cards });
  },

  filterHearts: function(){
    var self = this;
    var hearts = self.state.cards.filter(function(object){
      return object.suit === 'Heart';
    })
    self.setState({ current_cards: hearts });
  },

  filterDiamonds: function(){
    var self = this;
    var diamonds = self.state.cards.filter(function(object){
      return object.suit === 'Diamond';
    })
    self.setState({ current_cards: diamonds });
  },

  filterSpades: function(){
    var self = this;
    var spades = self.state.cards.filter(function(object){
      return object.suit === 'Spade';
    })
    self.setState({ current_cards: spades });
  },

  filterClubs: function(){
    var self = this;
    var clubs = self.state.cards.filter(function(object){
      return object.suit === 'Club';
    });
    self.setState({ current_cards: clubs });
  },

  randomDeck: function(){
    var self = this;

    var cards = Shuffle.shuffle().cards;

    self.setState({ cards: cards, current_cards: cards });
  },

  resetDeck: function(){
    var self = this;

    self.setState({ cards: Shuffle.playingCards(), current_cards: Shuffle.playingCards() });
  },


  shuffleCurrent: function(){
    var self = this;

    var deck = self.state.current_cards;

    var new_deck = Shuffle.shuffle({deck: deck});

    self.setState({ current_cards: new_deck.cards });
  },

  sortOrder: function() {
    var self = this;
    var sorted_cards = self.state.current_cards.sort(function(a, b) {
      return a.sort - b.sort;
    });
    self.setState({ current_cards: sorted_cards });
  },

  componentDidMount: function () { 
    Velocity(
      document.getElementsByClassName('card_wrapper'), 
      "transition.slideUpBigIn",
      { stagger: 50 , display: "inline-block", duration: 150, delay: 0 }
    );
  }, 

  componentDidUpdate: function () { 
    Velocity(
      document.getElementsByClassName('card_wrapper'), 
      "transition.slideUpBigIn",
      { stagger: 50 , display: "inline-block", duration: 150, delay: 0 }
    );
  }, 


  componentWillMount: function() { 
    var self = this;
    var router = self.context.router;
    var suit = router.getCurrentParams().suit;
    if ( suit ) {

      var the_suit = self.state.cards.filter(function(object){
        return object.suit === suit;
      });
      self.setState({ current_cards: the_suit });

    }

  },

  render: function() {
    var self = this;

    var cards = self.state.current_cards.map(function(object){
      return <Card suit={object.suit} sort={object.sort} key={object.suit + object.sort} />
    });

    return (
        <div className="page">
          <div className="controls">
            <span onClick={self.filterHearts}>Hearts</span>
            <span onClick={self.filterDiamonds}>Diamonds</span>
            <span onClick={self.filterClubs}>Clubs</span>
            <span onClick={self.filterSpades}>Spades</span>
            <span onClick={self.sortOrder}>Sort</span>
            <span onClick={self.shuffleCurrent}>Shuffle</span>
            <span onClick={self.resetDeck}>Reset</span>
            <span onClick={self.randomDeck}>Random Deck</span>
            <span onClick={self.filterAll}>Show All</span>
          </div>
          {cards}
        </div>
      
    )
  }
});

module.exports = Main;