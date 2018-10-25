import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuConfig from '../../components/MenuConfig';
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
        open: true,
        editSelection: null
    };

    handleExpand = () => {
        this.setState(state =>({open: !state.open}))
    }

    handleSelectEdit = () => {
        this.setState(state =>({editSelection: "key" }));
        console.log(this.state.editSelection);

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
                                        <List component="div" disablePadding subheader={<ListSubheader component="div">Edit</ListSubheader>}>
                                            <ListItem button onClick={this.handleSelectEdit}>
                                                <ListItemText inset primary={"Drinks"}/>
                                            </ListItem>
                                            <ListItem button onClick={this.handleSelectEdit}>
                                                <ListItemText inset primary={"Beans"}/>
                                            </ListItem>
                                            <ListItem button onClick={this.handleSelectEdit}>
                                                <ListItemText inset primary={"Milk"}/>
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                    <ListItem button>
                                        <ListItemText primary={"Inventory Options"}/>
                                    </ListItem>
                                </List>
                            </Card>
                            {/* insert list options */}
                        </Grid>
                        <Grid item xs>
                            <Card>
                            {/* insert conditional rendered component of either menu or inventory */}
                                <MenuConfig/>
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
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KervConfig);
