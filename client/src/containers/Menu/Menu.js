import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import MenuForm from '../../components/MenuForm';
import OrderSummary from '../../components/OrderSummary';
import {addSale} from '../../store/actions'
import Grid from '@material-ui/core/Grid';

class Menu extends Component {
  state = {
    tip: 0
  }
  componentDidMount(){
    if(!this.props.kerv.barista){
      this.props.history.push('/login')
    }
  }
  handleAddTip = (tipAmount) => {
    this.setState({tip: tipAmount});
  }
  
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
  }

  render() {
    return (
      <Grid container spacing={16} justify='space-evenly' >
        <Grid item xs={8}>
          <h3>Menu</h3>
          <MenuForm kerv={ this.props.kerv } onSubmit={this.handleAddToOrder} />
        </Grid>
        <Grid item xs={3}>
          <h3>Current Order</h3>
            <OrderSummary addTip = {this.handleAddTip} hasTip={this.state.tip} milk={this.props.kerv.milk}
                          order={this.props.order} placeOrder={this.handlePlaceOrder}/> 
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
