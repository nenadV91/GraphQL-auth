import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from './navbar';
import Home from './pages/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App
