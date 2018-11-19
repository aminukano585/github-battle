import React, { Component } from 'react';

export default class Popular extends Component {
  state = {
    selectedLanguage: 'All'
  };

  updateLanguage = (lang) => {
    this.setState({
      selectedLanguage: lang
    });
  };

  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className='languages'>
        {languages.map((lang, i) => (
          <li 
            key={lang}
            onClick={this.updateLanguage.bind(null, lang)}
            style={
              lang === this.state.selectedLanguage ? {color: '#d0021b'} : null
            }
          >
            {lang}
          </li>
          ))}
      </ul>
    );
  }
}