import React from 'react';

function Sales(props) {
	return (
		<div>
			<ul>
				{Object.keys(props.sales).map(drink => (
					<li>
						{' '}
						{drink} : {props.sales[drink]}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Sales;
