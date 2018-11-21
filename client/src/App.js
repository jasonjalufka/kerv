import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getLogin } from './store/actions';
import * as storage from './utils/storage';

import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import './App.css';

class App extends Component {

  componentDidMount() {
    const obj = storage.getFromStorage('the_main_app');
    if (obj && obj.token) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })
      .then(response => response.json())
      .then(data => {
        this.props.onValidToken(data)
      })
    }
    console.log('token?: ', this.props.kerv.token)

  }
  componentDidUpdate(nextProps) {
    console.log('I got called yo', this.props.kerv.token)
    if (nextProps.kerv.token != this.props.kerv.token)
      storage.setInStorage('the_main_app', { token: this.props.kerv.token })
  }

  handleSubmit = (user) => {
    this.props.onAttemptLogin({ 'user': user.user, 'password': user.password });
  }

  render() {
    return (
      <div className="App">

        {/* <Divider /> */}
        <Router>
          <div>
            <NavBar token={this.props.kerv.token} />
            <Route path="/login" render={(props) => <LoginForm {...props} token={this.props.kerv.token} onSubmit={this.handleSubmit} />} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    kerv: state.kerv,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAttemptLogin: (user) => dispatch(getLogin(user)),
    onValidToken: (payload) => dispatch({ type: 'VALID_TOKEN', payload: payload }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
