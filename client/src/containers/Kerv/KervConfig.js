import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuConfig from '../../components/MenuConfig';
import InventoryConfig from '../../components/InventoryConfig';
import * as actionTypes from "../../store/actions";
import {Grid, Card, List, ListItem, ListItemText, ListSubheader} from '@material-ui/core/';

class KervConfig extends Component {
    state ={
        // open: false,
        displayMenu: false, 
        displayInventory: false
    };

    handleDisplayInventory = () => {
        this.setState(state =>({displayInventory: true, displayMenu: false}));
    }

    handleDisplayMenu = () => {
        this.setState(state => ({displayMenu: true, displayInventory: false }));
    }

    handleSubmit = formValues =>{
        console.log("attempting submit on drink" );
        this.props.onSubmitChange(formValues);
    }

    render() {
        return (  
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <Card>
                            <List subheader={<ListSubheader component="div">Configurations</ListSubheader>}>
                                <ListItem button onClick={this.handleDisplayMenu}>
                                    <ListItemText primary={"Update Menu"}/>
                                    {/* {this.state.open ? <ExpandLess /> : <ExpandMore />} */}
                                </ListItem>
                                <ListItem button onClick={this.handleDisplayInventory}>
                                    <ListItemText primary={"Update Inventory"}/>
                                </ListItem>
                            </List>
                        </Card>
                        {/* insert list options */}
                    </Grid>
                    <Grid item xs>
                        <Card>
                        {/* conditional rendering of either menu or inventory config component */}
                            {this.state.displayMenu&&
                            <MenuConfig kerv={this.props.kerv} onSubmit={this.handleSubmit}/>
                            }
                            {this.state.displayInventory&&<InventoryConfig kerv={this.props.kerv} />}
                        </Card>
                    </Grid>
                </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
      kerv: state.kerv
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        onSubmitChange: test => {
            dispatch({ type: actionTypes.TEST, test: test });
          }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KervConfig);
