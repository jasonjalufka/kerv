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
        this.fetchSalesByMonth()
    }

    handleSelectMonth(month) {
        this.setState({ monthSelected: month })
    }

    // Fetch sales data for all months
    fetchSalesByMonth = () => {
        console.log('[fetchSalesByMonth()]');
        fetch('/api/sales/dates')
            .then(res => res.json())
            .then(data => {
                this.updateTotalRevenue(data);
                this.updateBarChartData(data);
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
        console.log('Data: ', data);
        const barArr = []

        Object.keys(data).forEach(monthKey => {
            barArr.push({ "month": monthKey, "totalRevenue": data[monthKey].totalRevenue });
        });

        this.setState({
            ...this.state,
            barChartData: barArr
        });
    }

    // updates this.state.barChartData
    // ["month": 1, "totalRevenue": 45],
    fetchSales = () => {
        const barArr = []
        const pieArr = []
        let totalRev = 0
        let pieIndex = -1
        this.setState({
            ...this.state,
            isLoading: true
        })
        fetch('/api/sales/dates')
            .then(res => res.json())
            .then(salesInfo => {
                console.log("SalesInfo: ", salesInfo);
                Object.keys(salesInfo).map(month => {
                    barArr.push({ "month": month, "totalRevenue": salesInfo[month].totalRevenue, "label": "Drinks: " + salesInfo[month].drinkCount });
                    totalRev += parseFloat(salesInfo[month].totalRevenue);
                    Object.keys(salesInfo[month].drinks).map(drinkName => {
                        console.log("DrinkName: ", drinkName)
                        // pieIndex = salesInfo[month].drinks.findIndex(o => o.name == drinkName);
                        if (pieIndex > -1) {
                            pieArr[pieIndex].amount += parseFloat(salesInfo[month].drinks[drinkName].drinkCount);
                        }
                        else {
                            pieArr.push({ "drink": drinkName, "amount": salesInfo[month].drinks[drinkName].drinkCount });
                        }
                    })
                })
                this.setState({
                    ...this.state,
                    barChartData: barArr,
                    pieChartData: pieArr,
                    totalRevenue: totalRev.toFixed(2),
                    isLoading: false
                })
                console.log('State', this.state);
            });
    }
    if(!this.props.kerv.barista)
            this.props.history.push('/login')
        else this.fetchSalesData(DEFAULT_QUERY)
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
            <div className="button-container" style={{ padding: "15px" }}>
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
            </div>
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center">
                <Grid item xl>
                    <Paper><h2 style={{ padding: '10px' }}>{this.state.isLoading ? 'Total Revenue: $...' : 'Total Revenue: $' + parseFloat(this.state.totalRevenue).toFixed(2)}</h2></Paper>
                </Grid>
                <Grid item xl>
                    <Paper><BarChart barChartData={this.state.barChartData} /></Paper>
                </Grid>
                <Grid item xl>
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
