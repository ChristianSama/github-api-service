const {getRepos, getFiveStarRepos, getLastUpdatedRepos} = require('./repoService');
const fs = require('fs');

let repos = fs.readFileSync('repos.json');
repos = JSON.parse(repos);

describe('getFiveStarRepos', () => {
  describe('when given a list of repos', () => {
    test('returns the repos with 5 stars or more', () => {

      expect(getFiveStarRepos(repos)).toEqual([
        {"id": 2, "name": "test-repo2", "stargazers_count": 5},
        {"id": 3, "name": "test-repo3", "stargazers_count": 14},
        {"id": 6, "name": "test-repo6", "stargazers_count": 6},
        {"id": 8, "name": "test-repo8", "stargazers_count": 7},
        {"id": 9, "name": "test-repo9", "stargazers_count": 9},
        {"id": 10, "name": "test-repo10", "stargazers_count": 27},
      ])
    })
  })
})

