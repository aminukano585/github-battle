import axios from 'axios';

const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile(username) {
  const user = await axios.get(`https://api.github.com/users/${username}${params}`);
  return user.data;
}

async function getRepos(username) {
  return await axios.get(`https://api.github.com/users/${username}/repos/${params}&per_page=100`);
}

function getStarCount(repos) {
  return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

async function getUserData(player) {
  const data = await axios.all([getProfile(player), getRepos(player)]);
  [profile, repos] = data;

  return { profile, score: calculateScore(profile, repos) };
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

async function battle(players) {
  return await axios.all(players.map(getUserData)).then(sortPlayers).catch(handleError);
}

async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
  const response = await axios.get(encodedURI);
  return response.data.items;
}

export { fetchPopularRepos, battle };