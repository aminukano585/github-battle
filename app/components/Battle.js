import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class PlayerPreview extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <div className='column'>
          <img
            className='avatar'
            src={this.props.avatar}
            alt={`Avatar for ${this.props.username}`}
          />
          <h2 className='username'>@{this.props.username}</h2>
        </div>
        <button
          className='reset'
          onClick={this.props.onReset.bind(null, this.props.id)}
        >
          Reset
        </button>
      </div>
    );
  }
}

class PlayerInput extends Component {
  state = {
    username: '',
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    label: 'Username'
  };

  handleChange = (event) => {
    const value = event.target.value;

    this.setState({
      username: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  };

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input 
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default class Battle extends Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null
  };

  handleSubmit = (id, username) => {
    this.setState({
      [`${id}Name`]: username,
      [`${id}Image`]: `https://github.com/${username}.png?size=200`
    });
  };

  handleReset = (id) => {
    this.setState({
      [`${id}Name`]: '',
      [`${id}Image`]: null
    });
  };
  
  render() {
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
    const { match } = this.props;

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />
          }

          {playerOneImage !== null &&
            <PlayerPreview
              id='playerOne'
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
            />
          }

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
          }

          {playerTwoImage !== null &&
            <PlayerPreview
              id='playerTwo'
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
            />
          }
        </div>
        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
            Battle
          </Link>
        }
      </div>
    );
  }
}