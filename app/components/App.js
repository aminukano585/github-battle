import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Battle from './Battle';
import Popular from './Popular';
import Results from './Results';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <NavBar />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route exact path='/popular' component={Popular} />
            <Route exact path='/battle/results' component={Results} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}