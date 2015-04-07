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


var page1 = require('../page1/index.jsx');



var slide_names = [ 'page1', 'page2'];

var slide_count = 0;

var hotkey = require('react-hotkey');

hotkey.activate(); 

var App = React.createClass({
	mixins: [Router.State, Router.Navigation, hotkey.Mixin('handleKeyDown')], 

	getHandlerKey: function () {
		var childDepth = 1; // assuming App is top-level route
		var key = this.getRoutes()[childDepth].name;
		var id = this.getParams().id;
		if (id) { key += id; }
		return key;
	},

	getInitialState: function () { 
		return { currentTransition: '' };
	},

	onClickRight: function(){
		console.log('onClickRight:');
		if (slide_count ==  slide_names.length ) {
			slide_count = 0;
		} else {
			slide_count++;
		}

		this.setState({currentTransition: 'slide-forward'});

		console.log(' slide_count: ' + slide_count);
		console.log(' slide_names[slide_count% slide_names.length ]: ' + slide_names[slide_count% slide_names.length ]);

		this.transitionTo(slide_names[slide_count% slide_names.length ]);
	},

	onClickLeft: function(){

		console.log('onClickLeft:');
		if (slide_count == 0) {
			slide_count = slide_names.length - 1;
		} else {
			slide_count--;
		}
		
		this.setState({currentTransition: 'slide-back'});

		console.log(' slide_count: ' + slide_count);
		console.log(' slide_names[slide_count% slide_names.length ]: ' + slide_names[slide_count% slide_names.length ]);

		this.transitionTo(slide_names[slide_count% slide_names.length ]);
	},

	handleKeyDown: function(e) {
		var self = this;
		console.log('handleKeyDown: ' + util.inspect(e.key));
		var self = this;
	  if (e.key === 'ArrowLeft') {
			self.onClickLeft();
	  } else if (e.key === 'ArrowRight') {
			self.onClickRight();
	  }
	},

	render: function () {
		var self = this;
		var name = this.getHandlerKey();

		var transition = self.state.currentTransition;

		console.log("names: " + name);
		return (
		  <div className="container">
		    <header>
		    	<h1> React.js </h1>
		    	<div className="slide_controls">
		     		<span className="left slider_button" onClick={self.onClickLeft}>Left</span>
		     		<span className="right slider_button" onClick={self.onClickRight}>Right</span>
		     	</div>
		    </header>
		    <div className="main_content">
		    	<TransitionGroup transitionName={transition} className="router" component="div">
			    	<RouteHandler key={name} />
			    </TransitionGroup>
		    </div>
		  </div>
		);
	}
});

var routes = (
  <Route handler={App}>
  	<DefaultRoute handler={page1} />
    <Route name="page1" path="/1" handler={page1} addHandlerKey={true}/>
    <Route name="page2" path="/2" handler={page1} addHandlerKey={true}/>
  </Route>
);


Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});