import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sales extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Sales</h1>
                <h3>Sales Processed: {this.props.sales.salesCount}</h3>
                <h3>{this.props.sales[0].orderTotal ?
                    'Oh, Oscar: $' + Object.keys(this.props.sales).map((order, index) => {
                        return this.props.sales[order].orderTotal
                    }).filter(element => element !== undefined).reduce((total, amount) => (
                        total + amount
                    )).toFixed(2) : 'You keep the money'}</h3>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sales: state.sales
    }
}

export default connect(mapStateToProps)(Sales);
