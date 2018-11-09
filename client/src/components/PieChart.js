import React from 'react';
import { VictoryPie } from 'victory';

const PieChart = props => {

    let legendName = []
    props.pieChartData.forEach(o => legendName.push({ "name": o.drinkName }));
    console.log('LegendName:', legendName);
    console.log('props: ', props.pieChartData);
    return (
        <div>
            <VictoryPie
                labelRadius={80}
                innerRadius={100}
                padAngle={3}
                data={props.pieChartData}
                // labelRadius={90}
                style={{ labels: { fill: "#A9A9A9", fontSize: 20, fontWeight: "bold" } }}
                colorScale={["#222222", "#E8E8E8", "#4B4E6D", "#84DCC6", "#95A3B3"]}

                x="drinkName"
                y="totalSold" >
            </VictoryPie>
        </div>
    );
}

export default PieChart;