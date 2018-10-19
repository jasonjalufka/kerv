import React, { Component } from 'react';
import './App.css';
import Menu from './containers/Menu/Menu'
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>K E R V</h1>
        <Menu />
      </div>
    );
  }
}

export default App;
