import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Popular from './Popular';
import NavBar from './NavBar';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <NavBar />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>
    );
  }
}