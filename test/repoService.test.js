const fs = require("fs");
const path = require("path");
const {
  getRepos,
  getFiveStarRepos,
  getLastUpdatedRepos,
  getTotalStars,
  getTopFive,
  sortByStars,
  getReposAlphabeticallyWithoutH,
  sortAlphabetically,
  removeReposWithH,
} = require("../build/repoService");

let fakeRepos = fs.readFileSync(path.resolve(__dirname, "./repos.json"));
fakeRepos = JSON.parse(fakeRepos);

const testClient = {
  get: (url) => {
    return new Promise((resolve) => {
      if (url === "https://api.github.com/orgs/stackbuilders/repos") {
        resolve({status: 200, 
                 statusText: "OK",
                 json: () => {
                   return Promise.resolve(fakeRepos.repos)
                 }});
      }
    })
  }
}

describe("getRepos", () => {
  describe("when given an http client and a url",() => {
    test("returns a response with a json containing repository data", async () => {
      const url = "https://api.github.com/orgs/stackbuilders/repos"
      const data = await getRepos(testClient, url)
      expect(data).not.toBeNull()
    })
  })
})

describe("getFiveStarRepos", () => {
  describe("when given a list of repositories", () => {
    test("returns the repositories with 5 stars or more", () => {
      expect(getFiveStarRepos(fakeRepos.repos)).toEqual(
        fakeRepos.fiveStarRepos
      );
    });
  });
  describe("when given a list without 5 star repositories", () => {
    test("returns an empty list", () => {
      expect(getFiveStarRepos(fakeRepos.reposWithoutFiveStars)).toEqual([]);
    });
  });
  describe("when given an empty list", () => {
    test("returns an empty list", () => {
      expect(getFiveStarRepos([])).toEqual([]);
    });
  });
});

describe("getLastUpdatedRepos", () => {
  describe("when given a list of repositories", () => {
    test("returns the last 5 updated repositories", () => {
      expect(getLastUpdatedRepos(fakeRepos.repos)).toEqual(
        fakeRepos.lastUpdated
      );
    });
  });
  describe("when given an empty list", () => {
    test("returns an empty list", () => {
      expect(getLastUpdatedRepos([])).toEqual([]);
    });
  });
});

describe("getTotalStars", () => {
  describe("when given a list of repositories", () => {
    test("returns the sum of all stars", () => {
      expect(getTotalStars(fakeRepos.repos)).toEqual(85);
    });
  });
  describe("when given an empty list", () => {
    test("returns 0", () => {
      expect(getTotalStars([])).toEqual(0);
    });
  });
  describe("when given a list of repositories with 0 stars", () => {
    test("returns 0", () => {
      expect(getTotalStars(fakeRepos.reposWithoutStars)).toEqual(0);
    });
  });
});

describe("getTopFive", () => {
  describe("when given a list of repositories", () => {
    test("returns the top 5 repositories with most stars", () => {
      expect(getTopFive(fakeRepos.repos)).toEqual(fakeRepos.topFive);
    });
  });
  describe("when given an empty list", () => {
    test("returns an empty list", () => {
      expect(getTopFive([])).toEqual([]);
    });
  });
});

describe("sortByStars", () => {
  describe("when given a list of repositories", () => {
    test("returns a list with the repositories sorted by stars", () => {
      expect(sortByStars(fakeRepos.repos)).toEqual(
        fakeRepos.reposSortedByStars
      );
    });
  });
});

describe("getReposAlphabeticallyWithoutH", () => {
  describe("when given a list of repositories", () => {
    test("returns the list alphabetically sorted without repositories starting with 'h' in it's name", () => {
      expect(getReposAlphabeticallyWithoutH(fakeRepos.repos)).toEqual(
        fakeRepos.alphabeticallySortedWithoutH
      );
    });
  });
  describe("when given an empty list", () => {
    test("returns an empty list", () => {
      expect(getReposAlphabeticallyWithoutH([])).toEqual([]);
    });
  });
});

describe("sortAlphabetically", () => {
  describe("when given a list of repositories", () => {
    test("returns a list with the repositories sorted alphabetically", () => {
      expect(sortAlphabetically(fakeRepos.repos)).toEqual(
        fakeRepos.alphabeticallySorted
      );
    });
  });
});

describe("removeReposWithH", () => {
  describe("when given a list of repositories", () => {
    test("returns a list with the repositories that do not start with the letter 'h'", () => {
      expect(removeReposWithH(fakeRepos.repos)).toEqual(
        fakeRepos.reposWithoutH
      );
    });
  });
});
