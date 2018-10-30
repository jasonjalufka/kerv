import React from 'react';
import Menu from '../containers/Menu/Menu';
import Sales from '../containers/Sales/Sales';
import KervConfig from '../containers/Kerv/KervConfig';
import { Tab, Tabs, AppBar } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    appBar: {
        color: 'black',
        backgroundColor: '#f3f1ef'
    }
})

let NavBar = props => {
    const { classes } = props

    return (
        < Router >
            <div>
                <AppBar position="static" className={classes.appBar}>
                    <Tabs value={0} fullWidth>
                        <Tab value={0} component={Link} to="/" label="Order" />
                        <Tab value={1} component={Link} to="/sales" label="Sales" />
                        <Tab value={2} component={Link} to="/config" label="Settings" />
                    </Tabs>
                </AppBar>
                <Route exact path="/" component={Menu} />
                <Route path="/sales" component={Sales} />
                <Route path="/config" component={KervConfig} />
            </div>
        </Router >
    )
}

export default withStyles(styles)(NavBar);