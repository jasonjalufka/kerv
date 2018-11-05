import React, { Component } from 'react';
import { connect } from 'react-redux';

const API = '/api/sales/';
const DEFAULT_QUERY = '';

class Sales extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalRevenue: 'before',
        };
    }
    componentDidMount() {
        this.fetchSalesData(DEFAULT_QUERY)
      }

    fetchSalesData = (subRoute) => {
        let filter = (subRoute ? subRoute : DEFAULT_QUERY)
        console.log(API + filter);
        fetch(API + filter)
        .then(response => response.json())
        .then(data => {
            this.setState(data)
            console.log(this.state);
        })
        .catch(err => console.log('ERROR: ', err));
    }
    render() {
        return (
            <div>
                <h1>Welcome to Sales</h1>
                <button onClick={() => {this.fetchSalesData('drink')}}>DISPLAY DRINK</button>
                {this.state.latte&&<div>
                    espresso {this.state.espresso.total}
                    cortado {this.state.cortado.total}
                    macchiato {this.state.macchiato.total}
                    cappuccino {this.state.cappuccino.total}
                    latte {this.state.latte.total}
                </div>}
                <h2>${this.state.totalRevenue}</h2>   
                <button onClick={() => {this.fetchSalesData('milk')}}>DISPLAY Milk Sales</button>
                {this.state.whole&&<div>
                    whole {this.state.whole.total}
                    oat {this.state.oat.total}
                    almond {this.state.almond.total}
                </div>}
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
