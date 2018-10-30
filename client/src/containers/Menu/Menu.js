import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import MenuForm from '../../components/MenuForm';
import OrderSummary from '../../components/OrderSummary';
import Card from '@material-ui/core/Card';
import {addSale} from '../../store/actions'

class Menu extends Component {
  //Resets order state to 0 to be used for the next order
  handlePlaceOrder = order => {
    console.log("[handlePlaceOrder]", order);
    this.props.onAddSale({"order": order, "inventory" : { "milk" : this.props.kerv.milk, 
                          "bean":this.props.kerv.bean}});
    this.props.onSubmitOrder(order);
  }

  handleAddToOrder = order => {
    let itemCost = 0;

    itemCost = this.props.kerv.drink[order.drinkOption].price;
    if (order.milkOption)
      if(this.props.kerv.milk[order.milkOption].price)
        itemCost += this.props.kerv.milk[order.milkOption].price;
    order.total = itemCost;
    this.props.onAddToOrder(order);
  }

  render() {
    return (
      <div className="menu">
        <Card>
          <h2>Menu</h2>
          <MenuForm kerv={ this.props.kerv } onSubmit={this.handleAddToOrder} />
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
    kerv: state.kerv,
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
    onAddSale: (order) => dispatch(addSale(order))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
