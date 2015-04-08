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

var InlineSVG = require('react-inlinesvg');

var home = require('../home/index.jsx'),
	react = require('../react/index.jsx'),
	routing = require('../routing/index.jsx'),
	animation = require('../animation/index.jsx'),
	links = require('../links/index.jsx'),
	example_card = require('../example_card/index.jsx'),
	cards = require('../cards/index.jsx');

var slide_names = [ 'home', 'react', 'example_card', 'cards', 'animation', 'routing', 'links'];

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

		slide_count = slide_names.indexOf(this.context.router.getCurrentRoutes()[1].name);

		if (slide_count ==  slide_names.length ) {
			slide_count = 0;
		} else {
			slide_count++;
		}

		this.setState({currentTransition: 'slide-forward'});

		this.context.router.transitionTo(slide_names[slide_count% slide_names.length ]);
	},

	onClickLeft: function(){

		slide_count = slide_names.indexOf(this.context.router.getCurrentRoutes()[1].name);

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

		var name = this.context.router.getCurrentRoutes()[1].name;

		var transition = self.state.currentTransition;

		return (
		  <div className={name}>
		    <header>
		    	<InlineSVG className="react_logo" src="/img/react_logo.svg" uniquifyIDs={false} />
		    	<h1 className="title"><Link to="/">React.js</Link></h1>
		    	<div className="slide_controls">
	     			<span className="slide_control" onClick={self.onClickLeft}>{'<'}</span>
	     			<span className="slide_control" onClick={self.onClickRight}>{'>'}</span>
	     		</div>
		    </header>

	    	<TransitionGroup transitionName={transition} className="router" component="div">
		    	<RouteHandler />
		    </TransitionGroup>

		  </div>
		);
	}
});

var routes = (
  <Route handler={App}>
  	<DefaultRoute handler={home} />
  	<Route name="home" path="/" handler={home} />
  	<Route name="react" handler={react} />
  	<Route name="routing" handler={routing} />
  	<Route name="animation" handler={animation} />
  	<Route name="links" handler={links} />
  	<Route name="example_card" handler={example_card} />
  	<Route name="card/:suit/:sort" handler={example_card} />
  	<Route name="cards/:suit" handler={cards} />
    <Route name="cards" handler={cards} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});