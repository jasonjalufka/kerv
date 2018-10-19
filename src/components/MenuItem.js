//receive props.increment && props.decrement amount
//label for each menu item
import React, { Component } from 'react';
class MenuItem extends Component {
	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
	}

	render() {
		return (
			<li>
				<div>{this.props.name}</div>
				<div>{this.props.total}</div>
				<div>
					<button
						onClick={() =>
							this.props.handleDecrease(this.props.name)
						}
					>
						-
					</button>
					<button
						onClick={() =>
							this.props.handleIncrease(this.props.name)
						}
					>
						+
					</button>
				</div>
			</li>
		);
	}
}

export default MenuItem;
