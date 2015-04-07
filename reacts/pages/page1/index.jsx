var React = require('react'),
    request = require('superagent'),
    util = require('util'),
    Velocity = require('velocity-animate/velocity'),
    InlineSVG = require('react-inlinesvg'),
    cards = require('cards'),
    Router = require('react-router'),
    Shuffle = require('shuffle');

require('velocity-animate/velocity.ui');

var poster_image, map_image;


var Main = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function() {
    var deck_cards = new cards.PokerDeck();
    deck_cards.shuffleAll();
    var card_cards = deck_cards.draw();
    console.log('card_cards: ');
    console.log(card_cards);

    var deck_shuffle = Shuffle.shuffle();
    var card_shuffle = deck_shuffle.draw();
    console.log('card_shuffle: ');
    console.log(card_shuffle);
    return { card_shuffle: card_shuffle, card_cards: card_cards };
  },

  componentDidMount: function () { }, 

  componentWillUnmount: function() { },

  render: function() {
    var self = this;
    var card_shuffle = self.state.card_shuffle;
    var card_cards = self.state.card_cards;

    return (
      <div className="page">
        <h1>card_shuffle</h1>
        <ul>
          <li>{card_shuffle.suit}</li>
          <li>{card_shuffle.description}</li>
          <li>{card_shuffle.sort}</li>
          <li>{card_shuffle.toString()}</li>
          <li>{card_shuffle.toShortDisplayString()}</li>
        </ul>
        <h1>card_cards</h1>
        <ul>
          <li>{card_cards.suit}</li>
          <li>{card_cards.value}</li>
          <li>{card_cards.toString()}</li>
          <li>{card_cards.unicodeString()}</li>
        </ul>
      </div>
    )
  }
});

module.exports = Main;
