import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import MenuItem from '../../components/MenuItem';
import drinks from '../../data/drinks';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.handleIncreaseDrink = this.handleIncreaseDrink.bind(this);
        this.handleDecreaseDrink = this.handleDecreaseDrink.bind(this);
        this.handlePlaceOrder    = this.handlePlaceOrder.bind(this);
     }

     handleIncreaseDrink(drink) {
        this.setState(state =>state[drink]++);
        console.log(this.state[drink]);

     }

     handleDecreaseDrink(drink) {
        this.setState(state => state[drink]--);
        console.log(this.state[drink]);

     }

     handlePlaceOrder(order) {
        this.props.onSubmitOrder(order);

        for(let n of drinks) {
            order[n.name] = 0;
        }
        this.setState(order);
     }

     componentDidMount() {
        let order = {};
        
        for(let n of drinks) {
            order[n.name] = 0;
        }
        this.setState(order);
     }

    render() {
        return (
            <div className="menu">
                <h1>Menu</h1>
                <ul>
                    {drinks.map(drink => (
                        <MenuItem name={drink.name} total={this.state[drink.name]} handleIncrease={this.handleIncreaseDrink} 
                        handleDecrease={this.handleDecreaseDrink} />
                    ))}
                </ul>
                <button onClick={() => this.props.onSubmitOrder(this.state)}>Order</button>
            </div>
            
        );
    }
};

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitOrder: order => {dispatch({type: actionTypes.ADD_SALE, order: order})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);