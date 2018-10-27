import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuConfigFormContainer from '../../components/MenuConfigFormContainer';
import InventoryConfig from '../../components/InventoryConfig';
import * as actionTypes from "../../store/actions";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

class KervConfig extends Component {
    state ={
        open: false,
        editSelection: null, 
        displayInventory: false
    };
    
    handleDisplayInventory = () => {
        this.setState(state =>({displayInventory: true, editSelection: null}));
    }

    handleExpand = () => {
        this.setState(state =>({open: !state.open}));
    }

    handleSelectEdit(key){
        this.setState(({editSelection: key, displayInventory: false }));
    }

    handleSubmit = formValues =>{
        console.log("attempting submit on drink" );
        this.props.onSubmitChange(formValues);
    }

    render() {
        return (
            <div>
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs>
                            <Card>
                                <List subheader={<ListSubheader component="div">Configurations</ListSubheader>}>
                                    <ListItem button onClick={this.handleExpand}>
                                        <ListItemText primary={"Menu Options"}/>
                                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding subheader={<ListSubheader component="div">Choose one to view</ListSubheader>}>
                                            <ListItem button onClick={()=>{this.handleSelectEdit("drink")}}>
                                                <ListItemText inset primary={"Drinks"}/>
                                            </ListItem>
                                            <ListItem button onClick={()=>{this.handleSelectEdit("bean")}}>
                                                <ListItemText inset primary={"Beans"}/>
                                            </ListItem>
                                            <ListItem button onClick={()=>{this.handleSelectEdit("milk")}}>
                                                <ListItemText inset primary={"Milk"}/>
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                    <ListItem button onClick={this.handleDisplayInventory}>
                                        <ListItemText primary={"Inventory Options"}/>
                                    </ListItem>
                                </List>
                            </Card>
                            {/* insert list options */}
                        </Grid>
                        <Grid item xs>
                            <Card>
                            {/* conditional rendering of either menu or inventory config component */}
                                {this.state.editSelection&&
                                <MenuConfigFormContainer selection={this.state.editSelection} onSubmit={this.handleSubmit}/>
                                }
                                {this.state.displayInventory&&<InventoryConfig />}
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
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
