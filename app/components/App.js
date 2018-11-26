import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Popular from './Popular';
import NavBar from './NavBar';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <NavBar />

          <Route exact path='/' component={Home} />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>
    );
  }
}