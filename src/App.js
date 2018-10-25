import React, { Component } from 'react';
import './App.css';
import Menu from './containers/Menu/Menu';
import Sales from './containers/Sales/Sales';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>K E R V</h1>
        <Router>
          <div>
            <ul>
              <button><Link to="/">Home</Link></button>
              <button><Link to="/sales">Sales</Link></button>
            </ul>
            <hr />
            <Route exact path="/" component={Menu} />
            <Route path="/sales" component={Sales} />
          </div>
        </Router>
        {/* <Menu /> */}
        {/* <Sales /> */}
      </div>
    );
  }
}

export default App;
