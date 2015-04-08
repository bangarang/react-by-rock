# React.js
##### "A declarative, efficient, and flexible JavaScript library for building user interfaces.""

------

React is based on Components that display data. They have two ways of storing data: Props and State. 
- Props are immutable objects passed to the component on creation
- State are fluid objects stored in the component. 

### Let's make a Playing Card.


#### React.js Render Component

    var Card = React.createClass({
      ...
      getInitialState: function() {
        return { value: '', slected: false }
      },

      ...

      selectCard: function(){
        this.setState({selected: !this.state.selected });
      },
      render: function() {
        var self = this;
        var color = self.state.color,
            selected = self.state.selected;
        return (
          <div className={ selected ? "card_wrapper selected" : "card_wrapper" } onClick={self.selectCard}>
            <div className={"card " + color}>
              <div className="face">
                <span className="value">{self.state.value}</span>
                <InlineSVG src={"/img/suits/" + self.props.suit + ".svg"} />
              </div>
            </div>
          </div>
        )
    });  

#### JSX Component Declaration

    <Card suit="Heart" sort={5} />
