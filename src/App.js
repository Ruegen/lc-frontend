import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={PropertiesPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
