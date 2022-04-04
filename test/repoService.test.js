const {getRepos, getFiveStarRepos, getLastUpdatedRepos, getTotalStars} = require('../build/repoService');
const fs = require('fs');
const path = require('path');

let fakeRepos = fs.readFileSync(path.resolve(__dirname,'./repos.json'));
fakeRepos = JSON.parse(fakeRepos);

describe('getRepos', () => {
  describe('when given an invalid URL', () => {
    test('throws an error', async () => {
      await expect(
        getRepos('https://apii.github.com/orgs/stacckbbuilders/repos')
      ).rejects.toThrowError();
    })
  })
})

describe('getFiveStarRepos', () => {
  describe('when given a list of repositories', () => {
    test('returns the repositories with 5 stars or more', () => {
      expect(getFiveStarRepos(fakeRepos.repos)).toEqual([
        {"id": 2, "name": "test-repo2", "stargazers_count": 5, "updated_at": "2018-12-05T06:33:54Z"},
        {"id": 3, "name": "test-repo3", "stargazers_count": 14, "updated_at": "2017-12-05T06:33:54Z"},
        {"id": 6, "name": "test-repo6", "stargazers_count": 6, "updated_at": "2022-12-05T06:33:54Z"},
        {"id": 8, "name": "test-repo8", "stargazers_count": 7, "updated_at": "2019-12-05T06:33:54Z"},
        {"id": 9, "name": "test-repo9", "stargazers_count": 9, "updated_at": "2022-12-05T06:33:54Z"},
        {"id": 10, "name": "test-repo10", "stargazers_count": 27, "updated_at": "2022-12-05T06:33:54Z"},
      ])
    })
  })
  describe('when given a list without 5 star repositories', () => {
    test('returns an empty list', () => {
      expect(getFiveStarRepos(fakeRepos.reposWithoutFiveStars)).toEqual([])
    })
  })
  describe('when given an empty list', () => {
    test('returns an empty list', () => {
      expect(getFiveStarRepos([])).toEqual([])
    })
  })
})

describe('getLastUpdatedRepos', () => {
  describe('when given a list of repositories', () => {
    test('returns the last 5 updated repositories', () => {
      expect(getLastUpdatedRepos(fakeRepos.repos)).toEqual([
        {"id": 6, "name": "test-repo6", "stargazers_count": 6, "updated_at": "2022-12-05T06:33:54Z"},
        {"id": 7, "name": "test-repo7", "stargazers_count": 3, "updated_at": "2022-12-05T06:33:54Z"},
        {"id": 9, "name": "test-repo9", "stargazers_count": 9, "updated_at": "2022-12-05T06:33:54Z"},
        {"id": 10, "name": "test-repo10", "stargazers_count": 27, "updated_at": "2022-12-05T06:33:54Z"},
        {"id": 12, "name": "test-repo12", "stargazers_count": 1, "updated_at": "2022-12-05T06:33:54Z"}
      ])
    })
  })
  describe('when given an empty list', () => {
    test('returns an empty list', () => {
      expect(getLastUpdatedRepos([])).toEqual([])
    })
  })
})

describe('getTotalStars', () => {
  describe('when given a list of repositories', () => {
    test('returns the sum of all stars', () => {
      expect(getTotalStars(fakeRepos.repos)).toEqual(85)
    })
  })
  describe('when given an empty list', () => {
    test('returns 0', () => {
      expect(getTotalStars([])).toEqual(0)
    })
  })
  describe('when given a list of repositories with 0 stars', () => {
    test('returns 0', () => {
      expect(getTotalStars(fakeRepos.reposWithoutStars)).toEqual(0)
    })
  })
})

