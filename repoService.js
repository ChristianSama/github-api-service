const fetch = require('node-fetch');

const getRepos = async (url) => {
  try {
    let response = await fetch(url);
    let repos = await response.json();
    return repos;
  } catch (err) {
    console.error(err);
  }
}

const getFiveStarRepos = (repos) => {
  if (typeof repos.filter === 'undefined'){
    throw new Error('Invalid repos object');
  } 
  const filteredRepos = repos.filter(repo => {
    return repo.stargazers_count >= 5
  });
  return filteredRepos;
}

const getLastUpdatedRepos = (repos) => { //updated_at
  if (typeof repos.filter === 'undefined'){
    throw new Error('Invalid repos object');
  } 
  return repos.sort((a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  }).slice(0, 5);
}

const getTotalStars = (repos) => {
  if (typeof repos.filter === 'undefined'){
    throw new Error('Invalid repos object');
  } 
  return repos.reduce((acc, el) => {
    return acc + el.stargazers_count
  }, 0);
}

const main = async (url) => {
  // const repos = await getRepos(url);
  // console.log(repos);
  const fiveStarRepos = getFiveStarRepos('str');
  // console.log(fiveStarRepos);
  // const lastUpdated = getLastUpdatedRepos(repos)
  // console.log(lastUpdated);
  // const totalStars = getTotalStars(repos);
  // console.log(totalStars);
}

// const sbUrl = 'https://api.github.com/orgs/stackbuilders/repos';
// main(sbUrl);

module.exports = {
  getRepos,
  getFiveStarRepos,
  getLastUpdatedRepos,
  getTotalStars
}
