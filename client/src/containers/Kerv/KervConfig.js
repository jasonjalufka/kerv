import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import MenuConfig from '../../components/MenuConfig';
import InventoryConfig from '../../components/InventoryConfig';
import UserConfig from '../../components/UserConfig';
import { Card, IconButton } from '@material-ui/core/';
import { updateMenu, getUsers } from '../../store/actions';
import { updatedDiff, addedDiff } from 'deep-object-diff';
import { LocalCafe, LocalShipping, Group } from '@material-ui/icons/';

class KervConfig extends Component {
    state = {
        displayMenu: true,
        displayInventory: false,
        displayUsers: false,
        drinkEditMode: false,
        milkEditMode: false,
        newDrinkMode: false,
        beanEditMode: false,
        milkInvEditMode: false,
        newInvMode: false,
        originalData: null
    };

    componentDidMount() {
        if (!this.props.kerv.token) {
            this.props.history.push('/login')
        }
        this.getInitialFormData()
        this.props.onGetUsers()

    }
    handleDisplayView = (view) => {
        view === 'menu' ?
            this.setState({ displayMenu: true, displayInventory: false, displayUsers: false })
            : view === 'inventory' ?
                this.setState({ displayInventory: true, displayMenu: false, displayUsers: false })
                : view === 'users' ?
                    this.setState({ displayUsers: true, displayInventory: false, displayMenu: false })
                    : console.log('Invalid view option')

    }

    handleEditMode = (type) => {
        type === 'drink' ?
            this.setState(state => ({ drinkEditMode: !state.drinkEditMode }))
            : type === 'milk' ?
                this.setState(state => ({ milkEditMode: !state.milkEditMode }))
                : type === 'newDrink' ?
                    this.setState({ newDrinkMode: true })
                    : type === 'bean' ?
                        this.setState({ beanEditMode: true })
                        : type === 'milkInv' ?
                            this.setState({ milkInvEditMode: true })
                            : type === 'newInvItem' ?
                                this.setState({ newInvMode: true })
                                : this.setState({
                                    milkEditMode: false, drinkEditMode: false, newDrinkMode: false,
                                    newInvMode: false, beanEditMode: false, milkInvEditMode: false
                                })
    }

    getInitialFormData = () => {
        const { kerv } = this.props
        let data = {
            bean: [],
            drink: [],
            milk: [],
        }
        Object.keys(kerv).map(type => {
            type !== 'barista' ?
                Object.keys(kerv[type]).map(key => {
                    type === 'drink' ?
                        data[type].push({ 'name': key, 'price': kerv[type][key].price })
                        : type === 'bean' ?
                            data[type].push({ 'name': key, 'type': kerv[type][key].type, 'amount': kerv[type][key].amount })
                            : type === 'milk' && key === 'whole' ?
                                data[type].push({ 'name': key, 'price': 0, 'type': kerv[type][key].type, 'amount': kerv[type][key].amount })
                                : type === 'milk' ?
                                    data[type].push({ 'name': key, 'price': kerv[type][key].price, 'type': kerv[type][key].type, 'amount': kerv[type][key].amount })
                                    : console.log('notinot')
                    return null;
                })
                : console.log("Cant iterate over barista...")
            return null;
        })
        this.setState({ originalData: data })
        this.props.onLoadFormData(data);
    }
    onSubmit = (formValues) => {
        let original = this.state.originalData
        // replace original with call to get the initial values
        this.setState({ drinkEditMode: false, milkEditMode: false, newDrinkMode: false });
        let diff = updatedDiff(original, formValues)
        let additional = addedDiff(original, formValues);
        let payload = {}
        Object.keys(additional).length !== 0 ?
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
        this.props.onUpdateMenu({ 'payload': payload, 'user': this.props.kerv.barista });
    }

    render() {
        return (
            <Card>
                <IconButton onClick={() => this.handleDisplayView('menu')}><LocalCafe /></IconButton>
                <IconButton onClick={() => this.handleDisplayView('inventory')}><LocalShipping /></IconButton>
                <IconButton onClick={() => this.handleDisplayView('users')}><Group /></IconButton>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    {this.state.displayMenu &&
                        <MenuConfig kerv={this.props.kerv} onEditMode={this.handleEditMode}
                            drinkEditMode={this.state.drinkEditMode} milkEditMode={this.state.milkEditMode} newDrinkMode={this.state.newDrinkMode} />
                    }
                    {this.state.displayInventory &&
                        <InventoryConfig kerv={this.props.kerv} onEditMode={this.handleEditMode}
                            beanEditMode={this.state.beanEditMode} milkInvEditMode={this.state.milkInvEditMode} newInvMode={this.state.newInvMode} />}
                </form>
                {this.state.displayUsers &&
                    <UserConfig />}
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
        onGetUsers: () => dispatch(getUsers()),
        onLoadFormData: (data) => {
            dispatch({ type: 'LOAD', data: data })
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KervConfig);
