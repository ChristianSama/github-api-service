import fetch from 'node-fetch';

interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: Date;
}

//get all repos from url
const getRepos = async (url: string) => {
  let response = await fetch(url);

  if (response.status == 200) {
    let repos = await response.json();
    return repos;
  }
  throw new Error(response.statusText);
}

//get 5 star repositories from list
const getFiveStarRepos = (repos: Array<Repository>) => {
  if (!Array.isArray(repos)) throw new Error('Invalid repos object');

  const filteredRepos = repos.filter(repo => repo.stargazers_count >= 5)
  return filteredRepos;
}

//get 5 most recently updated repositories from list
const getLastUpdatedRepos = (repos: Array<Repository>) => {
  if (!Array.isArray(repos)) throw new Error('Invalid repos object');
  return sortRepos(repos).slice(0, 5)
}

//sort repos list
const sortRepos = (repos: Array<Repository>) => {
  return repos.sort((a, b) => (new Date(b.updated_at)).valueOf() - (new Date(a.updated_at)).valueOf());
}

//get total stars from a list of repositories
const getTotalStars = (repos: Array<Repository>) => {
  if (!Array.isArray(repos)) throw new Error('Invalid repos object');

  return repos.reduce((acc, el) => {
    return acc + el.stargazers_count
  }, 0);
}

//for visibility only
const mapFields = (repos: Array<Repository>) => {
  return repos.map(repo => ({
    id: repo.id,
    name: repo.name,
    stargazers_count: repo.stargazers_count,
    updated_at: repo.updated_at
  }));
}

const main = async (url: string) => {
  try {
    const repos = await getRepos(url);
    const fiveStarRepos = getFiveStarRepos(repos as Array<Repository>);
    console.log('-----REPOSITORIES WITH MORE THAN 5 STARS-----')
    console.log(mapFields(fiveStarRepos));
    const lastUpdated = getLastUpdatedRepos(repos as Array<Repository>)
    console.log('-----LAST FIVE UPDATED REPOSITORIES----')
    console.log(mapFields(lastUpdated));
    const totalStars = getTotalStars(repos as Array<Repository>);
    console.log('-----SUM OF ALL REPOSITORY STARS----')
    console.log(totalStars);
  } catch (err) {
    console.error(err);
  }
}

const sbUrl = 'https://api.github.com/orgs/stackbuilders/repos';
main(sbUrl);
