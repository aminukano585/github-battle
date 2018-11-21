import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../utils/api';

class RepoGrid extends Component {
  static propTypes = {
    repos: PropTypes.array.isRequired
  };

  render() {
    return (
      <ul className='popular-list'>
        {this.props.repos.map((repo, index) => (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img 
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </li>
              <li><a href={repo.html_url} target='_blank'>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

class SelectLanguage extends Component {
  static propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    selectedLanguage: 'All',
    repos: null
  };

  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className='languages'>
        {languages.map((lang) => (
          <li 
            key={lang}
            onClick={this.props.onSelect.bind(null, lang)}
            style={
              lang === this.props.selectedLanguage ? {color: '#d0021b'} : null
            }
          >
            {lang}
          </li>
          ))}
      </ul>
    );
  }
}

export default class Popular extends Component {
  state = {
    selectedLanguage: 'All',
    repos: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (lang) => {
    this.setState({
      selectedLanguage: lang,
      repos: null
    });

    api.fetchPopularRepos(lang)
      .then(repos => this.setState({ repos }));
  };

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos 
          ? <p>Loading...</p>
          : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}