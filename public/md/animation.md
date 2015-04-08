# Animation
##### React has a Animation add-on called ReactCSSTransitionGroup


    <ReactCSSTransitionGroup transitionName="example">
      {transitions}
    </ReactCSSTransitionGroup>

It looks for entry and exit changes in the DOM and applies css classes accordingly. It's also pretty easy to extend this feature with third party/custom animations such as [Velocity.js](https://github.com/julianshapiro/velocity) like how I did in this site.

    <TransitionGroup transitionName="slide-up" className="example-cards" component="div">
      {cards}
    </TransitionGroup> 

Then, you can customize the animation with Velocty syntax and forcefeeding:

    'slide-up': {
      duration: 250,
      stagger: 250,
      enter: {
        opacity: [ 1, 0 ], 
        translateY: [ 0, 75 ], 
        translateZ: 0 
      },
      leave: {
        opacity: [ 0 , 1 ], 
        translateY: [ 75, 0 ], 
        translateZ: 0 
      }
    },