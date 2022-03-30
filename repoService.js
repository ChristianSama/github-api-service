const fetch = require('node-fetch');
const fs = require('fs');

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
  const filteredRepos = repos.filter(repo => {
    return repo.stargazers_count >= 5
  });
  return filteredRepos;
}

const getLastUpdatedRepos = (repos) => { //updated_at
  return repos.sort((a, b) => {
    return new Date(a.updated_at) - new Date(b.updated_at);
  }).slice(0, 5)
}

const main = async (url) => {
  const repos = await getRepos(url);
  const fiveStarRepos = getFiveStarRepos(repos);
  console.log(fiveStarRepos);
  const lastUpdated = getLastUpdatedRepos(repos)
  console.log(lastUpdated);
  console.log(repos);
}

module.exports = {
  getRepos,
  getFiveStarRepos,
  getLastUpdatedRepos
}

// const sbUrl = 'https://api.github.com/orgs/stackbuilders/repos';
// main(sbUrl);
