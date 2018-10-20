import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import DrinkMenu from "../../components/DrinkMenu";
import drinks from "../../data/drinks";
import Inventory from "../../components/Inventory";
import Sales from "../../components/Sales";
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null
    };

    this.handleIncreaseDrink = this.handleIncreaseDrink.bind(this);
    this.handleDecreaseDrink = this.handleDecreaseDrink.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleSelectDrink = this.handleSelectDrink.bind(this);
  }

  handleIncreaseDrink(drink) {
    this.setState(state => state[drink]++);
    console.log(this.state[drink]);
  }

  handleDecreaseDrink(drink) {
    this.setState(state => state[drink]--);
    console.log(this.state[drink]);
  }

  handleSelectDrink(index) {
    console.log(index);
    this.setState({ selectedIndex: index });
  }

  //Resets order state to 0 to be used for the next order
  handlePlaceOrder(order) {
    this.props.onSubmitOrder(order);

    Object.keys(drinks).map(drink => {
      order[drink] = 0;
      return null;
    });

    this.setState(order);
  }

  //Initialized state of order upon mounting component
  componentDidMount() {
    let order = {};

    Object.keys(drinks).map(drink => {
      order[drink] = 0;
      return null;
    });

    this.setState(order);
  }

  render() {
    return (
      <div className="menu">
        <h1>Menu</h1>
        <Card raised>
          <List>
            {Object.keys(drinks).map((drink, index) => (
              <DrinkMenu key={index}
                name={drink}
                total={this.state[drink]}
                handleIncrease={this.handleIncreaseDrink}
                handleDecrease={this.handleDecreaseDrink}
                handleSelect={this.handleSelectDrink}
                selectedIndex={this.state.selectedIndex}
                index={index}
              />
            ))}
          </List>
        </Card>
        <button onClick={() => this.handlePlaceOrder(this.state)}>Order</button>

        <Inventory milk={this.props.milk} />
        <Sales sales={this.props.sales} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sales: state.sales,
    milk: state.inventory.milk
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitOrder: order => {
      dispatch({ type: actionTypes.ADD_SALE, order: order });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
