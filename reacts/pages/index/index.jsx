var React = require('react');
var Router = require('react-router');
// var TransitionGroup = require('../../components/timeoutTransitionGroup.jsx');
var TransitionGroup = require('../../components/VelocityTransitionGroup.jsx');

var util = require('util');

var Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,
	NotFoundRoute = Router.NotFoundRoute,
	RouteHandler = Router.RouteHandler,
	Link = Router.Link;


var cards = require('../cards/index.jsx'),
	card = require('../card/index.jsx');

var slide_names = [ 'cards', 'cards2'];

var slide_count = 0;

var hotkey = require('react-hotkey');

hotkey.activate(); 

var App = React.createClass({

	contextTypes: {
		router: React.PropTypes.func
	},

	mixins: [hotkey.Mixin('handleKeyDown')], 


	getInitialState: function () { 
		return { currentTransition: '' };
	},

	onClickRight: function(){

		if (slide_count ==  slide_names.length ) {
			slide_count = 0;
		} else {
			slide_count++;
		}

		this.setState({currentTransition: 'slide-forward'});

		 this.context.router.transitionTo(slide_names[slide_count% slide_names.length ]);
	},

	onClickLeft: function(){
		if (slide_count == 0) {
			slide_count = slide_names.length - 1;
		} else {
			slide_count--;
		}
		
		this.setState({currentTransition: 'slide-back'});

		 this.context.router.transitionTo(slide_names[slide_count% slide_names.length ]);
	},

	handleKeyDown: function(e) {
		var self = this;
	  if (e.key === 'ArrowLeft') {
			self.onClickLeft();
	  } else if (e.key === 'ArrowRight') {
			self.onClickRight();
	  }
	},

	render: function () {
		var self = this;
		var name = this.context.router.getCurrentPath();

		var transition = self.state.currentTransition;

		return (
		  <div>
		    <header>
		    	<h1> React.js </h1>
		    	<div className="slide_controls">
		     		<span className="left slider_button" onClick={self.onClickLeft}>Left</span>
		     		<span className="right slider_button" onClick={self.onClickRight}>Right</span>
		     	</div>
		    </header>

	    	<TransitionGroup transitionName={transition} className="router" component="div">
		    	<RouteHandler key={name}/>
		    </TransitionGroup>

		  </div>
		);
	}
});

var routes = (
  <Route handler={App}>
  	<DefaultRoute handler={cards} />
  	<Route name="card" handler={card} />
  	<Route name="card/:suit/:sort" handler={card} />
  	<Route name="cards/:suit" handler={cards} />
    <Route name="cards" handler={cards} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});