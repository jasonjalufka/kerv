import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import MenuForm from '../../components/MenuForm';
import OrderSummary from '../OrderSummary/OrderSummary';
import {Grid} from '@material-ui/core';

class Menu extends Component {
  state = {
    tip: 0
  }

  componentDidMount(){
    if(!this.props.kerv.barista){
      this.props.history.push('/login')
    }
  }

   handleAddToOrder = (order ) => {
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
            <Grid style={{paddingTop: 60, height: '100%'}}container spacing={0} justify='center' >
              <Grid item xs={8}>
                <MenuForm kerv={ this.props.kerv } onSubmit={this.handleAddToOrder} />
              </Grid>
              <Grid item xs={4}>
                <OrderSummary tip={this.state.tip}/>
              </Grid>
            </Grid>   
    );
  }
}

const mapStateToProps = state => {
  return {
    kerv: state.kerv
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
