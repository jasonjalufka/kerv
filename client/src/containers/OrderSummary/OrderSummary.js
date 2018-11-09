import React , {Component} from 'react';
import Orders from '../../components/Orders';
import {addSale} from '../../store/actions'
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

class OrderSummary extends Component {
  constructor (props) {
    super(props);
    this.state={
      tip: props.tip,
      isHovering: false,
      hoverOver: null,
      orderPlaced: false,
      completed: 0,
      confirmation: false
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.state.tip !== nextProps.tip)
      this.setState({tip: nextProps.tip})
  }
  handleRemove = (orderKey) => {
      this.props.onRemoveOrder(orderKey)
      console.log('removing.....')
  }
  handleMouseHover = (index) => {
      ((index !== this.state.hoverOver && this.state.hoverOver == null) || (index!== this.state.hoverOver && this.state.hoverOver!==null)) ? 
        this.setState({isHovering: true, hoverOver: index})
        : this.setState({isHovering: !this.state.isHovering, hoverOver:index});
  }
  handleAddTip = (tipAmount) => {
      this.setState({tip: tipAmount});
  }
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1, orderPlaced: true});
  }
  handlePlaceOrder = (order, tip) => {
    this.timer = setInterval(this.progress, 20);
    order["tip"] = tip
    order["barista"] = this.props.kerv.barista
    setTimeout(()=> {
      clearInterval(this.timer);
      this.setState({orderPlaced: false, confirmation: true})
      this.props.onAddSale({order, "inventory" : { "milk" : this.props.kerv.milk, 
                          "bean":this.props.kerv.bean}})
      setTimeout(() => this.setState({confirmation: false}), 1500)
    }, 2000);
  }

  render() {
    return (
      <Orders milk={this.props.kerv.milk} order={this.props.order} placeOrder={this.handlePlaceOrder}
              orderPlaced={this.state.orderPlaced} completed={this.state.completed} confirmation={this.state.confirmation}
              addTip={this.handleAddTip} hasTip={this.state.tip} remove={this.handleRemove}
              handleHover={this.handleMouseHover} hovering={this.state.isHovering} hoverOver={this.state.hoverOver}/>
    );
  }
}

const mapStateToProps = state => {
    return {
      order: state.order,
      kerv: state.kerv
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      
      onAddSale: (order) => dispatch(addSale(order)),
      onRemoveOrder: orderKey => {
        dispatch({type: actionTypes.REMOVE_ORDER_ITEM, orderKey: orderKey})
      }
     
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(OrderSummary);
