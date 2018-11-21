import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../utils/api';

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
    api.fetchPopularRepos(this.state.SelectLanguage)
      .then(repos => console.log(repos));
  }

  updateLanguage = (lang) => {
    this.setState({
      selectedLanguage: lang
    });
  };

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    );
  }
}


// SelectLanguage can be rewritten like this, to make a stateless functional component
// const SelectLanguage = (props) => {
//   const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

//   return (
//     <ul className='languages'>
//       {languages.map((lang) => (
//         <li 
//           key={lang}
//           onClick={props.onSelect.bind(null, lang)}
//           style={
//             lang === props.selectedLanguage ? {color: '#d0021b'} : null
//           }
//         >
//           {lang}
//         </li>
//         ))}
//     </ul>
//   );
// }

// SelectLanguage.propTypes = {
//   selectedLanguage: PropTypes.string.isRequired,
//   onSelect: PropTypes.func.isRequired
// };

// SelectLanguage.defaultProps = {
//   selectedLanguage: 'All'
// };