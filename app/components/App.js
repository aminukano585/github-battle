import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Battle from './Battle';
import Popular from './Popular';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <NavBar />

          <Route exact path='/' component={Home} />
          <Route path='/battle' component={Battle} />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>
    );
  }
}