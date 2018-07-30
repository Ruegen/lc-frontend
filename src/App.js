import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import PropertiesPage from './pages/PropertiesPage'

import './App.css';

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
