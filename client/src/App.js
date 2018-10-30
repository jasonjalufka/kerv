import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import NavBar from './components/NavBar';
import { getData } from './store/actions';

class App extends Component {

  componentDidMount() {
    console.log(this.props.onGetData());
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
    onGetData: () => dispatch(getData())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
