import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import DrinkMenu from "../../components/DrinkMenu";
import BeanMenu from "../../components/BeanMenu";
import drinks from "../../data/drinks";
import inventory from "../../data/inventory";
import Inventory from "../../components/Inventory";
import Sales from "../../components/Sales";
import List from '@material-ui/core/List';
import MenuForm from '../../components/MenuForm';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDrink: null,
      selectedBean: null,
      selectedMilk: null
    };

    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleSelectDrink = this.handleSelectDrink.bind(this);
  }

  handleSelectDrink(e, index) {
    console.log(index);
    console.log(e.target.value);
    this.setState({ selectedDrink: index });
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

  handleSubmit = order => {
    console.log(order);
    this.props.onSubmitOrder(order);
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
          <MenuForm onSubmit={this.handleSubmit} />
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
