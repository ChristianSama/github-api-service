import fetch from "node-fetch";

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
  throw new Error(`${response.status} ${response.statusText}`);
};

//get 5 star repositories from list
const getFiveStarRepos = (repos: Array<Repository>) => {
  const filteredRepos = repos.filter((repo) => repo.stargazers_count >= 5);
  return filteredRepos;
};

//get 5 most recently updated repositories from list
const getLastUpdatedRepos = (repos: Array<Repository>) => {
  return sortByUpdateDate(repos).slice(0, 5);
};

//sort repos list
const sortByUpdateDate = (repos: Array<Repository>) => {
  return [...repos].sort(
    (a, b) =>
      new Date(b.updated_at).valueOf() - new Date(a.updated_at).valueOf()
  );
};

//get total stars from a list of repositories
const getTotalStars = (repos: Array<Repository>) => {
  return repos.reduce((acc, el) => acc + el.stargazers_count, 0);
};

//get top 5 repositories with more stars
const getTopFive = (repos: Array<Repository>) => {
  return sortByStars(repos).slice(0, 5);
};

//sort repositories by number of stars
const sortByStars = (repos: Array<Repository>) => {
  return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
};

//get repositories sorted alphabetically and remove the ones that start with letter 'h'
const getReposAlphabeticallyWithoutH = (repos: Array<Repository>) => {
  return sortAlphabetically(removeReposWithH(repos));
};

//sort repositories in alphabetical order
const sortAlphabetically = (repos: Array<Repository>) => {
  return [...repos].sort((a, b) => a.name.localeCompare(b.name));
};

//filter out the repositories that start with letter 'h'
const removeReposWithH = (repos: Array<Repository>) => {
  return repos.filter((repo) => repo.name[0].toLowerCase() !== "h");
};

//for visibility only
const mapFields = (repos: Array<Repository>) => {
  return repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    stargazers_count: repo.stargazers_count,
    updated_at: repo.updated_at,
  }));
};

const main = (url: string) => {
  getRepos(url)
    .then((repos) => {
      console.log("-----Repositories with more than 5 stars-----");
      console.log(mapFields(getFiveStarRepos(repos)));

      console.log("-----Last 5 updated repositories-----");
      console.log(mapFields(getLastUpdatedRepos(repos)));

      console.log("-----Sum of all repository stars-----");
      console.log(getTotalStars(repos));

      console.log("-----List of top 5 repositories with most stars-----");
      console.log(mapFields(getTopFive(repos)));

      console.log(
        "-----List all repositories alphabetically and remove all repositories that start with 'h'-----"
      );
      console.log(mapFields(getReposAlphabeticallyWithoutH(repos)));
    })
    .catch((err) => {
      console.error(err);
    });
};

const sbUrl = "https://api.github.com/orgs/stackbuilders/repos";
main(sbUrl);

export {
  getRepos,
  getFiveStarRepos,
  getLastUpdatedRepos,
  getTotalStars,
  getTopFive,
  sortByStars,
  getReposAlphabeticallyWithoutH,
  sortAlphabetically,
  removeReposWithH,
};
