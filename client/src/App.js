import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import NavBar from './components/NavBar';
import { getKervData, getLogin } from './store/actions';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';

class App extends Component {
  
  handleSubmit = (user) => {
      this.props.onAttemptLogin({'user': user.user, 'password': user.password});
  }

  render() {
      return (
        <div className="App">
            <h1>K E R V</h1>

            <Router>
              <div>
                <NavBar barista={this.props.kerv.barista} showApp={this.props.kerv.showApp}/>
                <Route path="/login" render={(props) => <LoginForm {...props} onSubmit={this.handleSubmit}/>} />
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
    onGetKervData: () => dispatch(getKervData()),
    onAttemptLogin: (user) => dispatch(getLogin(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
