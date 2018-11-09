import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';

const BarChart = props => {

    const monthsArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    function getMonth(index) {
        return monthsArr[index - 1];
    }

    return (
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={props.barChartData.map((key, index) => index)}
                tickFormat={props.barChartData.map(key => getMonth(key.month))}
            />
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how y ticks should be displayed
                tickFormat={(x) => (`$${x}`)}
            />
            {/* <VictoryLine
                interpolation="natural"
                data={props.barChartData}
            /> */}
            <VictoryBar
                labelComponent={<VictoryTooltip />}
                style={{ data: { fill: "#84DCC6" } }}
                data={props.barChartData}
                x="month"
                y="totalRevenue"
            />
        </VictoryChart>
    );
}

export default BarChart;