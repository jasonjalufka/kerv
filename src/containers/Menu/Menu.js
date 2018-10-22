import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import drinks from "../../data/drinks";
import inventory from "../../data/inventory";
import Inventory from "../../components/Inventory";
import Sales from "../../components/Sales";
import MenuForm from '../../components/MenuForm';
import OrderSummary from '../../components/OrderSummary';
import Card from '@material-ui/core/Card';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDrink: null,
      selectedBean: null,
      selectedMilk: null
    };

    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
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

  handleAddToOrder = order => {
    this.props.onAddToOrder(order);
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
        <Card>
          <h2>Menu</h2>
            <MenuForm onSubmit={this.handleAddToOrder} />
        </Card>

        <Card>
          <h2>ORDER SUMMARY</h2>
          {
              console.log('this is after order summary', this.props.order[0])
              
            }
          {this.props.order[0]&&<OrderSummary order={this.props.order}/>}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sales: state.sales,
    milk: state.inventory.milk,
    order: state.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToOrder: order => {
      dispatch({ type: actionTypes.ADD_ORDER_ITEM, order: order });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
