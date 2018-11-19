import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popular from './Popular';

export default class App extends Component {
  // static propTypes = {
  //   routine: PropTypes.array.isRequired
  // };
  
  // static defaultProps = {
  //   routine: [],
  // };

  render() {
    return (
      <div className='container'>
        <Popular />
        {/* {this.props.routine.map((r, i) => <li key={i}>{r}</li>)} */}
      </div>
    );
  }
}