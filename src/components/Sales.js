import React from 'react';

const Sales = props => (
    <div>
        <ul>
            {Object.keys(props.sales).map((drink, index) => (
                <li key={index}>
                    {drink}: {props.sales[drink]}
                </li>
            ))}
        </ul>
    </div>
);

export default Sales;
