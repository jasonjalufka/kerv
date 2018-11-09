import React from 'react';
import { VictoryPie, VictoryLegend, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';

const PieChart = props => {

    let legendName = []
    props.pieChartData.forEach(o => legendName.push({ "name": o.drinkName }));
    console.log('LegendName:', legendName);
    console.log('props: ', props.pieChartData);
    return (
        <VictoryPie
            style={{ labels: { fill: "white" } }}
            labelRadius={80}
            innerRadius={100}
            padAngle={3}
            data={props.pieChartData}
            style={{ labels: { fill: "#A9A9A9", fontSize: 16 } }}
            colorScale={["#222222", "#E8E8E8", "#4B4E6D", "#84DCC6", "#95A3B3"]}
            x="drinkName"
            y="totalSold" >
        </VictoryPie>
    );
}

export default PieChart;