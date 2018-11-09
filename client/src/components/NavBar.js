import React from 'react';
import { Route, Link ,Redirect} from "react-router-dom";
import { AppBar, withStyles, Divider, Toolbar, Typography, BottomNavigation, BottomNavigationAction } from '@material-ui/core/';
import Menu from '../containers/Menu/Menu';
import Sales from '../containers/Sales/Sales';
import KervConfig from '../containers/Kerv/KervConfig';
import {Settings, BarChart, FreeBreakfast} from '@material-ui/icons';

const styles = theme => ({
    appBar: {
         color: 'black',
        backgroundColor: 'white',
        boxShadow: 'none'
     }
})

let NavBar = props => {
    const { classes} = props
        return ( 
            <div> 
                <div style={{flexGrow: 1}}>
                    <AppBar position="static" className={classes.appBar} >
                    <Toolbar >
                            <Typography variant="h3" style={{flexGrow: 1}}>K E R V</Typography>
                        </Toolbar>
                    </AppBar>
                    <Divider />
                </div>
                { props.barista ?
                <div> 
                    <BottomNavigation style={{width: '100%',position: 'fixed', bottom: 0}}>
                        <BottomNavigationAction
                            component={Link}
                            to="/"
                            label="Order"
                            value="order"
                            icon={<FreeBreakfast />}
                        />
                        <BottomNavigationAction
                            component={Link}
                            to="/sales"
                            label="Sales"
                            value="sales"
                            icon={<BarChart />}
                        />
                        <BottomNavigationAction
                            component={Link}
                            to="/config"
                            label="Settings"
                            value="settings"
                            icon={<Settings />}
                        />
                    </BottomNavigation>
                    <Route exact path="/" component={Menu} />
                    <Route path="/sales" component={Sales} />
                    <Route path="/config" component={KervConfig} />
                </div>
                :                         
                <Redirect to="/login"/>
                }
            </div>          
        )
}

export default withStyles(styles)(NavBar);