//receive props.increment && props.decrement amount
//label for each menu item
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class DrinkMenu extends Component {
	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
	}

	render() {
		return (
			<ListItem button onClick={() => this.props.handleSelect(this.props.index)} selected={this.props.index === this.props.selectedIndex}>
				<ListItemText primary={this.props.name} />
				{/* <div>
					<button onClick={() => this.props.handleDecrease(this.props.name)}>-</button>
					<button onClick={() => this.props.handleIncrease(this.props.name)}>+</button>
				</div> */}
			</ ListItem>
		);
	}
}

export default DrinkMenu;
