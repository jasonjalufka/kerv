import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';

const API = '/api/sales/';
const DEFAULT_QUERY = '';

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalRevenue: 'before',
            monthSelected: '',
            barChartData: [],
            pieChartData: [],
            isLoading: false
        };
        this.handleSelectMonth = this.handleSelectMonth.bind(this);
    }

    componentDidMount() {
        console.log('[componentDidMount()]');
        (!this.props.kerv.barista ? this.props.history.push('/login') : this.fetchSalesByMonth());
    }

    handleSelectMonth(month) {
        console.log('[handleSelectMonth()]');
        this.setState({ monthSelected: month });
    }

    // Fetch sales data for all months
    fetchSalesByMonth = () => {
        console.log('[fetchSalesByMonth()]');
        fetch('/api/sales/dates')
            .then(res => res.json())
            .then(data => {
                this.updateTotalRevenue(data);
                this.updateBarChartData(data);
                this.updatePieChartData(data);
            })
    }

    updateTotalRevenue = data => {
        console.log('[updateTotalRevenue]', data);
        let totalRev = 0;
        Object.keys(data).forEach(monthKey => {
            totalRev += data[monthKey].totalRevenue;
        })

        this.setState({
            ...this.state,
            totalRevenue: totalRev
        });
    }

    updateBarChartData = data => {
        console.log('[updateBarChartData()]');
        const barArr = []

        Object.keys(data).forEach(monthKey => {
            barArr.push({ "month": monthKey, "totalRevenue": data[monthKey].totalRevenue, "label": "Total Drinks: " + data[monthKey].drinkCount });
        });

        this.setState({
            ...this.state,
            barChartData: barArr
        });
    }

    updatePieChartData = data => {
        console.log('[updatePieChartData()]');
        let pieArr = []
        let index
        Object.keys(data).forEach(month => {
            Object.keys(data[month].drinks).forEach(drinkName => {
                index = pieArr.findIndex(o => o.drinkName === drinkName);
                (index > -1 ? pieArr[index].totalSold += data[month].drinks[drinkName].drinkCount : pieArr.push({ "drinkName": drinkName, "totalSold": data[month].drinks[drinkName].drinkCount }))
                console.log('Index: ', index);
                console.log(pieArr);
            })
        })

        this.setState({
            ...this.state,
            pieChartData: pieArr
        })
    }

    fetchSalesData = (subRoute) => {
        let filter = (subRoute ? subRoute : DEFAULT_QUERY)
        let dataArr = []
        console.log(API + filter);
        fetch(API + filter)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).map(month => {
                    dataArr.push({ x: month, y: data[month].totalRevnue })
                });
                this.setState({
                    ...this.state,
                    graphData: dataArr
                });
                console.log('State: ', this.state);
            })
            .catch(err => console.log('ERROR: ', err));
    }

    render() {
        return (
            <Card>
                {/* <div className="button-container" style={{ padding: "15px" }}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start">
                        <Grid item xs>
                            <Button variant="contained" color="primary" onClick={() => { this.fetchSalesData('by/drink') }}>Display Drink Sales</Button>
                        </Grid>
                        <Grid item xs>
                            <Button variant="contained" color="primary" onClick={() => { this.fetchSalesData('by/milk') }}>Display Milk Sales</Button>
                        </Grid>
                        <Grid item xs>
                            <Button variant="contained" color="primary" onClick={() => { this.fetchSalesByMonth() }}>Display Sales by Dates</Button>
                        </Grid>
                    </Grid>
                </div> */}
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center">
                    <Grid item xs={4} alignItems="stretch">
                        <h2 style={{ padding: '10px' }}>{this.state.isLoading ? 'Total Revenue: $...' : 'Total Revenue: $' + parseFloat(this.state.totalRevenue).toFixed(2)}</h2>
                    </Grid>
                    <Grid item xs={4} alignItems="stretch">
                        <BarChart barChartData={this.state.barChartData} />
                    </Grid>
                    <Grid item xs={4} alignItems="stretch">
                        <PieChart pieChartData={this.state.pieChartData} />
                    </Grid>
                </Grid>
            </Card >
        )
    }
}

const mapStateToProps = state => {
    return {
        kerv: state.kerv
    }
}

export default connect(mapStateToProps)(Sales);
