import React, { Component } from 'react';
import { connect } from 'react-redux';

const API = '/api/sales/';
const DEFAULT_QUERY = '';

class Sales extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: 'before'
        };
    }
    componentDidMount() {
        this.fetchSalesData(DEFAULT_QUERY)
      }

    fetchSalesData = (subRoute) => {
        let filter = (subRoute ? subRoute : DEFAULT_QUERY)
        fetch(API + filter)
        .then(response => response.json())
        .then(data => this.setState(data))
        .catch(err => console.log('ERROR: ', err));
    }
    render() {
        return (
            <div>
                <h1>Welcome to Sales</h1>
                <button onClick={() => {this.fetchSalesData('drink')}}>DISPLAY DRINK</button>
                <h2>${this.state.data}</h2>                
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
