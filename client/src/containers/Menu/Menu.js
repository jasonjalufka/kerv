import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import MenuForm from '../../components/MenuForm';
import OrderSummary from '../../components/OrderSummary';
import {addSale} from '../../store/actions'
import Grid from '@material-ui/core/Grid';

class Menu extends Component {
  state = {
    openModal: false,
    tip: 0
  }

  handleAddTip = (tipAmount) => {
    this.setState({tip: tipAmount});
  }
  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  //Resets order state to 0 to be used for the next order
  handlePlaceOrder = (order,tip) => {
    order["tip"] = tip
    order["barista"] = this.props.kerv.barista
    this.props.onAddSale({order, "inventory" : { "milk" : this.props.kerv.milk, 
                          "bean":this.props.kerv.bean}});
  }

  handleAddToOrder = order => {
    this.setState({tip: 0})
    let itemCost = 0;
    itemCost = this.props.kerv.drink[order.drinkOption].price;
    if (order.milkOption)
      if(this.props.kerv.milk[order.milkOption].price)
        itemCost += this.props.kerv.milk[order.milkOption].price;
    order.total = itemCost;
    this.props.onAddToOrder(order);
    this.handleClose();
  }

  render() {
    console.log('kerv state in menu', this.props.kerv)
    return (
      <Grid container spacing ={24}>
      <Grid item xs={6}>
        <h3>Menu</h3><MenuForm 
        openModal={this.state.openModal} onCloseModal={this.handleClose} onOpenModal={this.handleOpen} kerv={ this.props.kerv } onSubmit={this.handleAddToOrder} />
        
        </Grid>
        <Grid item xs={4}>
        <h3>Current Order</h3>

          {
            this.props.order[0] && <div>
              <OrderSummary addTip = {this.handleAddTip} hasTip={this.state.tip} milk={this.props.kerv.milk}order={this.props.order} placeOrder={this.handlePlaceOrder}/>
            </div>
          }
        </Grid>
      </Grid>
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
    onAddSale: (order) => dispatch(addSale(order))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
