import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class BeanMenu extends Component {
    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
    }

    render() {
        return (
            <ListItem button>
                <ListItemText primary={this.props.name} />

            </ ListItem>
        );
    }
}
export default BeanMenu;