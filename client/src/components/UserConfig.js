import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewUser from './NewUserForm';
import Users from './Users';
import { Grid, IconButton, Card} from '@material-ui/core';
import {Person, PersonAdd} from '@material-ui/icons/';
import { addUser, deleteUser } from '../store/actions';

class UserConfig extends Component{
    state = {
        userEditMode: false,
        confirmDelete: false, 
        newUserForm: false,
        userRemoved: {},
        selectedUser: {}
    }
    componentDidMount(){
        this.setState({selectedUser: this.props.users[0]})
    }    
    confirmDetails = (user) => {
        this.setState({userRemoved: user})
    }
    handleRemoveUser = () => {
        console.log('Remove this user... : ', this.state.userRemoved)
        this.props.onDeleteUser({'user': this.state.userRemoved})
        this.setState({confirmDelete: false, userRemoved: {}})

    }
    handleSelectUser = (user) => {
        this.setState({selectedUser: user, newUserForm: false})
    }
    handleDisplayView = (view) => {
        view === 'confirmDelete'?
            this.setState(state => ({confirmDelete: !state.confirmDelete}))
        : view === 'user'?
        this.setState(state => ({userEditMode: !state.userEditMode}))
        : view === 'newUser'?
            this.setState({userEditMode: false, newUserForm: true, selectedUser: {}})
        : view === 'cancelDelete'?
            this.setState({confirmDelete: false, userRemove: {}})
        : console.log('Invalid view option')
    }
    onSubmit = (data) => {
        console.log('submit new user...', data)
        data['password'] = "temp123"
        this.props.onAddUser({'user': data });
    }

    render(){
        return (
            <Card>
                <IconButton onClick={()=> this.handleDisplayView("user")}>-<Person /></IconButton>
                <IconButton onClick={() => this.handleDisplayView('newUser')}><PersonAdd/></IconButton>
                <Grid container>
                    <Users userEditMode={this.state.userEditMode} users={this.props.users} toggleView={this.handleDisplayView} confirmDetails={this.confirmDetails} 
                           newUserForm={this.state.newUserForm} removeUser={this.handleRemoveUser} user={this.state.userRemoved} confirmDelete={this.state.confirmDelete}
                           handleSelectUser={this.handleSelectUser} selectedUser={this.state.selectedUser}/>
                    { this.state.newUserForm&&
                        <Grid item xs={6}>
                            <NewUser onSubmit={this.onSubmit} />
                        </Grid>
                    }
                </Grid>
            </Card>
        );
    }           
}

const mapStateToProps = state => {
    return {
      users: state.config.users
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
        onAddUser: (user) => dispatch(addUser(user)),
        onDeleteUser: (user) => dispatch(deleteUser(user))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConfig);