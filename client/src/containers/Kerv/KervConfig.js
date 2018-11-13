import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import MenuConfig from '../../components/MenuConfig';
import InventoryConfig from '../../components/InventoryConfig';
import {Grid, Card, List, ListItem, ListSubheader, IconButton} from '@material-ui/core/';
import { updateMenu } from '../../store/actions';
import { updatedDiff, addedDiff } from 'deep-object-diff';
import {LocalCafe, LocalShipping} from '@material-ui/icons/';

class KervConfig extends Component {
    state ={
        displayMenu: true, 
        displayInventory: false,
        drinkEditMode: false,
        milkEditMode: false,
        newDrinkMode: false,
        beanEditMode: false,
        milkInvEditMode: false, 
        newInvMode: false,
        originalData: null
    };

    componentDidMount(){
        if(!this.props.kerv.barista){
            this.props.history.push('/login')
          }
        this.getInitialFormData()
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
        : type === 'bean'?
            this.setState({beanEditMode: true})
        : type === 'milkInv'?
            this.setState({milkInvEditMode: true})
        : type === 'newInvItem'?
            this.setState({newInvMode: true})
        : this.setState({milkEditMode: false, drinkEditMode: false, newDrinkMode: false, 
                        newInvMode: false, beanEditMode: false, milkInvEditMode: false})
    }
    getInitialFormData = () => {
        const { kerv } = this.props
        let data = {
            bean: [],
            drink: [],
            milk: [],
        }

        // type === 'drink'?
        //                 data[type].push({'name': key, 'price': kerv[type][key].price})
        //             : type === 'bean'?
        //                 data[type].push({'name': key, 'type': kerv[type][key].type, 'amount': kerv[type][key].amount})
        //             : type === 'milk' ? () => {
        //                 let price = 0
        //                 key === 'whole' ?
        //                     price = 0 : price=kerv[type][key].price
        //                 data[type].push({'name': key, 'price': price})
        //                 data.milkInv.push({'name': key, 'type': kerv[type][key].type, 'amount': kerv[type][key].amount})}
        //             : console.log('Invalid type...')
        Object.keys(kerv).map(type => {
            type !== 'barista'?
                Object.keys(kerv[type]).map(key => {
                    type === 'drink'?
                        data[type].push({'name': key, 'price': kerv[type][key].price})
                    : type === 'bean'? 
                        data[type].push({'name': key, 'type': kerv[type][key].type, 'amount': kerv[type][key].amount}) 
                    : type === 'milk' && key === 'whole'?
                        data[type].push({'name': key, 'price': 0, 'type': kerv[type][key].type, 'amount': kerv[type][key].amount})
                    : type === 'milk'?    
                        data[type].push({'name': key, 'price': kerv[type][key].price,'type': kerv[type][key].type, 'amount': kerv[type][key].amount})
                    : console.log('notinot')
                    return null;
            })
            : console.log("Cant iterate over barista...")
            return null;
        })
        this.setState({originalData: data})
        this.props.onLoadFormData(data);
    }
    onSubmit = (formValues) => {
        let original = this.state.originalData
        // replace original with call to get the initial values
        this.setState({drinkEditMode: false, milkEditMode: false, newDrinkMode: false});
        let diff = updatedDiff(original, formValues)
        let additional = addedDiff(original, formValues);
        let payload = {}
        Object.keys(additional).length !== 0?
            payload['newDrinks'] = additional
        : console.log('no new drinks')

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
            <Card>
                <IconButton onClick={this.handleDisplayMenu}><LocalCafe /></IconButton>
                <IconButton onClick={this.handleDisplayInventory}><LocalShipping /></IconButton>                
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    {this.state.displayMenu&&
                        <MenuConfig kerv={this.props.kerv} onEditMode={this.handleEditMode}
                                    drinkEditMode={this.state.drinkEditMode} milkEditMode={this.state.milkEditMode} newDrinkMode={this.state.newDrinkMode}/>
                    }
                    {this.state.displayInventory&&
                        <InventoryConfig kerv={this.props.kerv} onEditMode={this.handleEditMode}
                                            beanEditMode={this.state.beanEditMode} milkInvEditMode={this.state.milkInvEditMode} newInvMode={this.state.newInvMode}/>}
                </form>
            </Card>
        );
    }
}

KervConfig = reduxForm({
    form: 'kervConfig'
})(KervConfig)

const mapStateToProps = state => {
    return {
      kerv: state.kerv,
      initialValues: state.config.data
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        onUpdateMenu: (payload) => dispatch(updateMenu(payload)),
        onLoadFormData: (data) => {
            dispatch({type: 'LOAD', data: data})
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KervConfig);
