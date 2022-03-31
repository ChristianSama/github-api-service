const fetch = require('node-fetch');

//get all repos from url
const getRepos = async (url) => {
  let response = await fetch(url);

  if (response.status == 200) {
    let repos = await response.json();
    return repos;
  }
  throw new Error(response.status);
}

//get 5 star repositories from list
const getFiveStarRepos = (repos) => {
  if (!Array.isArray(repos)) throw new Error('Invalid repos object');

  const filteredRepos = repos.filter(repo => repo.stargazers_count >= 5)
  return filteredRepos;
}

//get 5 most recently updated repositories from list
const getLastUpdatedRepos = (repos) => {
  if (!Array.isArray(repos)) throw new Error('Invalid repos object');
  sortRepos(repos)
  .slice(0, 5)
}

//sort repos list
const sortRepos = (repos) => {
  return repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

//get total stars from a list of repositories
const getTotalStars = (repos) => {
  if (!Array.isArray(repos)) throw new Error('Invalid repos object');

  return repos.reduce((acc, el) => {
    return acc + el.stargazers_count
  }, 0);
}

//for visibility only
const mapFields = (repos) => {
  repos.map(repo => ({
    id: repo.id,
    name: repo.name,
    stargazers_count: repo.stargazers_count,
    updated_at: repo.updated_at
  }));
}

const main = async (url) => {
  try {
    const repos = await getRepos(url);
    const fiveStarRepos = getFiveStarRepos(repos);
    console.log('-----REPOSITORIES WITH MORE THAN 5 STARS-----')
    console.log(fiveStarRepos.mapFields);
    const lastUpdated = getLastUpdatedRepos(repos)
    console.log('-----LAST FIVE UPDATED REPOSITORIES----')
    console.log(lastUpdated.mapFields);
    const totalStars = getTotalStars(repos);
    console.log('-----SUM OF ALL REPOSITORY STARS----')
    console.log(totalStars);
  } catch (err) {
    console.error(err);
  }
}

const sbUrl = 'https://api.github.com/orgs/stackbuilders/repos';
main(sbUrl);

module.exports = {
  getRepos,
  getFiveStarRepos,
  getLastUpdatedRepos,
  getTotalStars
}
