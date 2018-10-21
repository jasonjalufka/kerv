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
			<ListItem button onClick={(e) => this.props.handleSelect(e, this.props.index)} selected={this.props.index === this.props.selectedIndex}>
				<ListItemText primary={this.props.name} />

			</ ListItem>
		);
	}
}

export default DrinkMenu;
