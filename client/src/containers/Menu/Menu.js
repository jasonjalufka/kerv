import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import drinks from '../../data/drinks';
import milkCost from '../../data/milkCost';
import MenuForm from '../../components/MenuForm';
import OrderSummary from '../../components/OrderSummary';
import Card from '@material-ui/core/Card';
import { getData } from '../../store/actions';

class Menu extends Component {
  componentDidMount() {
    console.log(this.props.onGetData());
    
  }
  //Resets order state to 0 to be used for the next order
  handlePlaceOrder = order => {
    console.log("[handlePlaceOrder]");
    this.props.onSubmitOrder(order);
  }

  handleAddToOrder = order => {
    let itemCost = 0;

    itemCost = drinks[order.drinkOption].price;
    if (order.milkOption)
      itemCost += milkCost[order.milkOption];
    order.total = itemCost;
    this.props.onAddToOrder(order);
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
            this.props.order[0] && <div>
              <OrderSummary order={this.props.order} placeOrder={this.handlePlaceOrder} />
            </div>
          }
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
    },
    onSubmitOrder: order => {
      dispatch({ type: actionTypes.ADD_SALE, order: order });
    }, 
    onGetData: () => dispatch(getData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
