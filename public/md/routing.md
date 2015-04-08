# Routing

There's been a lot of great work on routing in react, in this site I'm using <a href="https://github.com/rackt/react-router" target="_blank">react-router</a>

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

You can use HTML5 history with a fallback to hash URLs:

    Router.run(routes, Router.HistoryLocation, function (Handler) {
      React.render(<Handler/>, document.body);
    });

And you can wrap the router in a transition group to animate the transitions with Velocity:

    <TransitionGroup transitionName={transition} className="router" component="div">
      <RouteHandler />
    </TransitionGroup>