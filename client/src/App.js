import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import NavBar from './components/NavBar';
import { getKervData } from './store/actions';

class App extends Component {

  componentDidMount() {
    this.props.onGetKervData();
  }
 
  render() {
    return (
      <div className="App">
        <h1>K E R V</h1>
        <NavBar />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetKervData: () => dispatch(getKervData())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
