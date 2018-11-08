import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import MenuForm from '../../components/MenuForm';
import OrderSummary from '../../components/OrderSummary';
import {addSale} from '../../store/actions'
import {Grid, Card} from '@material-ui/core';

class Menu extends Component {
  state = {
    tip: 0
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ tip: 0});
}
  componentDidMount(){
    if(!this.props.kerv.barista){
      this.props.history.push('/login')
    }
  }
  handleAddTip = (tipAmount) => {
    this.setState({tip: tipAmount});
  }
  
  handlePlaceOrder = (order, tip) => {
    order["tip"] = tip
    order["barista"] = this.props.kerv.barista
    this.props.onAddSale({order, "inventory" : { "milk" : this.props.kerv.milk, 
                          "bean":this.props.kerv.bean}});

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
      <Grid style={{paddingTop: 60, height: '100%'}}container spacing={0} justify='center' >
        <Grid item xs={8}>
          <MenuForm kerv={ this.props.kerv } onSubmit={this.handleAddToOrder} />
        </Grid>
        <Grid item xs={3}>
            <OrderSummary addTip = {this.handleAddTip} hasTip={this.state.tip} milk={this.props.kerv.milk}
                          order={this.props.order} placeOrder={this.handlePlaceOrder}/> 
        </Grid>
      </Grid> 
    );
  }
}

const mapStateToProps = state => {
  return {
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
