import React from 'react';
import { VictoryPie, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';

const PieChart = props => {

    return (
        <VictoryPie
            style={{ labels: { fill: "white" } }}
            innerRadius={100}
            labelRadius={120}
            data={props.pieChartData}
            x="drink"
            y="amount" >
        </VictoryPie>
    );
}

export default PieChart;