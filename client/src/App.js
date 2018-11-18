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
      //verify later from server... 
      this.props.onRefreshToken(obj)
    }
  }
  componentDidUpdate() {
    console.log('I got called yo', this.props.kerv.token)
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
            <NavBar barista={this.props.kerv.barista} />
            <Route path="/login" render={(props) => <LoginForm {...props} barista={this.props.kerv.barista} onSubmit={this.handleSubmit} />} />
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
    onRefreshToken: (token) => dispatch({ type: 'REFRESH_TOKEN', token: token })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
