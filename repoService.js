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
  if (!Array.isArray(repos)) throw new Error('Invalid repos object');
  const filteredRepos = repos.filter(repo => {
    return repo.stargazers_count >= 5
  })
  //map for visibility only
  .map(repo => ({
    id: repo.id,
    name: repo.name,
    stargazers_count: repo.stargazers_count,
    updated_at: repo.updated_at
  }));
  return filteredRepos;
}

const getLastUpdatedRepos = (repos) => {
  if (!Array.isArray(repos)) throw new Error('Invalid repos object');
  return repos.sort((a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  }).slice(0, 5)
  //map for visibility only
  .map(repo => ({
    id: repo.id,
    name: repo.name,
    stargazers_count: repo.stargazers_count,
    updated_at: repo.updated_at
  }));
}

const getTotalStars = (repos) => {
  if (!Array.isArray(repos)) throw new Error('Invalid repos object');
  return repos.reduce((acc, el) => {
    return acc + el.stargazers_count
  }, 0);
}

const main = async (url) => {
  const repos = await getRepos(url);
  const fiveStarRepos = getFiveStarRepos(repos);
  console.log('-----REPOSITORIES WITH MORE THAN 5 STARS-----')
  console.log(fiveStarRepos);
  const lastUpdated = getLastUpdatedRepos(repos)
  console.log('-----LAST FIVE UPDATED REPOSITORIES----')
  console.log(lastUpdated);
  const totalStars = getTotalStars(repos);
  console.log('-----SUM OF ALL REPOSITORY STARS----')
  console.log(totalStars);
}

// const sbUrl = 'https://api.github.com/orgs/stackbuilders/repos';
// main(sbUrl);

module.exports = {
  getRepos,
  getFiveStarRepos,
  getLastUpdatedRepos,
  getTotalStars
}
