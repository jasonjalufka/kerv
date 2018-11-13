import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Grid, CircularProgress } from '@material-ui/core';
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
            baristaTipData: [],
            isLoading: true,
            baristaView: false
        };
        this.handleSelectMonth = this.handleSelectMonth.bind(this);
    }

    componentDidMount() {
        (!this.props.kerv.barista ? this.props.history.push('/login') : this.fetchSalesByMonth());
    }

    handleSelectMonth(month) {
        this.setState({ monthSelected: month });
    }
    
    // Fetch sales data for all months
    fetchSalesByMonth = () => {
        this.setState({
            ...this.state,
            isLoading: true
        })
        fetch('/api/sales/dates')
            .then(res => res.json())
            .then(data => { console.log('this is data from ', data)
                this.updateTotalRevenue(data);
                this.updateBarChartData(data);
                this.updatePieChartData(data);
            })
    }

    updateBaristaTipData=(data) =>{
        let baristaTipArr = []
        Object.keys(data).forEach(monthKey => {
            console.log('deeez tips', data[monthKey].tips)
            baristaTipArr.push({"month": monthKey, "tips": data[monthKey].tips})
        })

        this.setState({
            ...this.state,
            baristaTipData: baristaTipArr
        });
        console.log(this.state.baristaTipData)
    }
    updateTotalRevenue = data => {
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
        const barArr = []

        Object.keys(data).forEach(monthKey => {
            barArr.push({ "month": monthKey, "totalRevenue": data[monthKey].totalRevenue, "label": "Total Drinks: " + data[monthKey].drinkCount });
        });

        this.setState({
            ...this.state,
            barChartData: barArr
        });
        console.log(this.state.barChartData)
    }
    getBaristaStats = () => {
        console.log('get these stats...');
        this.setState({
            ...this.state,
            isLoading: true
        })
        fetch(`/api/sales/${this.props.kerv.barista}/dates`)
            .then(res => res.json())
            .then(data => { console.log('this is data from ', data)
                this.updateTotalRevenue(data);
                this.updateBarChartData(data);
                this.updatePieChartData(data);
                this.updateBaristaTipData(data);
                this.setState({baristaView: true})
            })

    }
    updatePieChartData = data => {
        let pieArr = []
        let index
        Object.keys(data).forEach(month => {
            Object.keys(data[month].drinks).forEach(drinkName => {
                index = pieArr.findIndex(o => o.drinkName === drinkName);
                (index > -1 ? pieArr[index].totalSold += data[month].drinks[drinkName].drinkCount : pieArr.push({ "drinkName": drinkName, "totalSold": data[month].drinks[drinkName].drinkCount }))
            })
        })

        this.setState({
            ...this.state,
            pieChartData: pieArr,
            isLoading: false
        })
    }

    fetchSalesData = (subRoute) => {
        let filter = (subRoute ? subRoute : DEFAULT_QUERY)
        let dataArr = []
        fetch(API + filter)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).map(month => {
                    dataArr.push({ x: month, y: data[month].totalRevnue })
                    return null;
                });
                this.setState({
                    ...this.state,
                    graphData: dataArr
                });
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
                <Button onClick={()=>this.getBaristaStats()}>View Personal Sales</Button>
                {this.state.isLoading === true ?
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="stretch">
                        <Grid
                            item
                            style={{ padding: '200px' }}
                            xs={12}>
                            <CircularProgress size={75} />
                        </Grid>
                    </Grid> :
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center">
                        <Grid item xs={4} alignItems="stretch">
                            <h2 style={{ padding: '10px', fontWeight: '100', fontSize: '2em' }}>Total Revenue: ${parseFloat(this.state.totalRevenue).toFixed(2)}</h2>
                        </Grid>
                        <Grid item xs={4} alignItems="stretch">
                            <BarChart barChartData={this.state.barChartData} />
                        </Grid>
                        <Grid item xs={4} alignItems="stretch">
                            <PieChart pieChartData={this.state.pieChartData} />
                        </Grid>
                        {this.state.baristaView&&
                        <Grid item xs={4} alignItems="stretch">
                            {this.state.baristaTipData.map(index =><div>Month:{index.month}: ${index.tips}</div>)}
                        </Grid>
                        }
                    </Grid>
                    
                }
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
