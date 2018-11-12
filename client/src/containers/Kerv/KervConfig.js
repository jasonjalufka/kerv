import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuConfig from '../../components/MenuConfig';
import InventoryConfig from '../../components/InventoryConfig';
import {Grid, Card, List, ListItem, ListSubheader, IconButton} from '@material-ui/core/';
import { updateMenu } from '../../store/actions';
import { updatedDiff, addedDiff } from 'deep-object-diff';
import {LocalCafe, LocalShipping} from '@material-ui/icons/';

class KervConfig extends Component {
    state ={
        displayMenu: false, 
        displayInventory: false,
        drinkEditMode: false,
        milkEditMode: false,
        newDrinkMode: false
    };

    componentDidMount(){
        if(!this.props.kerv.barista){
            this.props.history.push('/login')
          }
      }

    handleDisplayInventory = () => {
        this.setState(state =>({displayInventory: true, displayMenu: false}));
    }

    handleDisplayMenu = () => {
        this.setState(state => ({displayMenu: true, displayInventory: false }));
    }
    handleEditMode = (type) => {
        type === 'drink'?
            this.setState(state => ({drinkEditMode: !state.drinkEditMode}))
        : type === 'milk'?
            this.setState(state => ({milkEditMode: !state.milkEditMode}))
        : type === 'newDrink'?
            this.setState({newDrinkMode: true})
        : this.setState({milkEditMode: false, drinkEditMode: false})
    }

    handleSubmit = (formValues, original) => {
        this.setState({drinkEditMode: false, milkEditMode: false, newDrinkMode: false});
        let diff = updatedDiff(original, formValues)
        let additional = addedDiff(original, formValues);
        let payload = {}
        payload['newDrinks'] = additional;

        Object.keys(diff).map(type => {
            payload[type] = {}
            Object.keys(diff[type]).map(key => {
                payload[type][original[type][key].name] = {}
                Object.keys(diff[type][key]).map(data => {
                    payload[type][original[type][key].name][data] = diff[type][key][data]
                    return null;
                })
                return null;
            })
            return null;
        })
        this.props.onUpdateMenu({'payload' : payload, 'user': this.props.kerv.barista});
    }

    render() {
        return (  
                <Grid container spacing={24}>
                    <Grid item xs={2}>
                        <Card>
                            <List subheader={<ListSubheader component="div">Configurations</ListSubheader>}>
                                <ListItem button onClick={this.handleDisplayMenu}>
                                    <IconButton><LocalCafe /></IconButton>
                                </ListItem>
                                <ListItem button onClick={this.handleDisplayInventory}>
                                    <IconButton><LocalShipping /></IconButton>
                                </ListItem>
                            </List>
                        </Card>
                        {/* insert list options */}
                    </Grid>
                    <Grid item xs>
                        <Card>
                        {/* conditional rendering of either menu or inventory config component */}
                            {this.state.displayMenu&&
                            <MenuConfig onSubmit={this.handleSubmit} onEditMode={this.handleEditMode}
                            drinkEditMode={this.state.drinkEditMode} milkEditMode={this.state.milkEditMode} newDrinkMode={this.state.newDrinkMode}/>
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
        onUpdateMenu: (payload) => dispatch(updateMenu(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KervConfig);
