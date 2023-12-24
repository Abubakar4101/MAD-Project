const { getJson } = require("serpapi");

const fetchJobsData = async (query) => {
  return new Promise((resolve, reject) => {
    getJson({
      engine: "google_jobs",
      q: query,
      hl: "en",
      api_key: "02bc2bdbf6040b7f22a49cb247d6f0baff7f72ce4d991f02e37e4e196c7670d2"
    }, (json) => {
      if (json && json["jobs_results"]) {
        resolve(json["jobs_results"]);
      } else {
        reject(new Error("Failed to fetch jobs data"));
      }
    });
  });
};

module.exports = {
  fetchJobsData,
};
