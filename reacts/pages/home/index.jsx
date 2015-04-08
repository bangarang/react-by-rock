var React = require('react'),
    Router = require('react-router');
    Link = Router.Link;

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
            <h2>Hello, I'm Alex Rock and this is about React.</h2>
            <h3>Contents:</h3>
            <ul>
              <li><Link to="react">React</Link></li>
              <li><Link to="example_card">Example Card</Link></li>
              <li><Link to="cards">Sortable Deck of Cards</Link></li>
              <li><Link to="animation">Animation</Link></li>
              <li><Link to="routing">Routing</Link></li>
              <li><Link to="links">Links</Link></li>
            </ul> 

            <p>Find the repo on Github at <a href="https://github.com/bangarang/react-by-rock" target="_blank">https://github.com/bangarang/react-by-rock</a></p>

            <hr />

            <p>Twitter: <a href="https://twitter.com/lxrck" target="_blank">@lxrck</a></p>
            <p>Github: <a href="https://github.com/bangarang/" target="_blank">@bangarang</a></p>

          </div>
        </div>
      
    )
  }
});

module.exports = Main;