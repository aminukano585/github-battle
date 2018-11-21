import axios from 'axios';

async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
  const response = await axios.get(encodedURI);
  return response.data.items;
};

export { fetchPopularRepos };