const jestCLI = (jest = require("jest"));

let response;

exports.lambdaHandler = async () => {
  const options = {
    projects: [__dirname],
    testMatch: ["<rootDir>/__api-tests__/**/*.js"],
    silent: true,
  };

  try {
    await jestCLI
      .runCLI(options, options.projects)
      .then((success) => {
        response = {
          statusCode: success.results.numFailedTests > 0 ? 500 : 200,
          body: JSON.stringify({
            message: success.results.numFailedTests > 0 ? "Failed" : "Passed",
          }),
        };
      })
      .catch((failure) => {
        console.error(failure);
        response = {
          statusCode: 500,
          body: JSON.stringify({ message: "Tests failed to run" }),
        };
      });
  } catch (err) {
    console.error(err);
    return err;
  }

  return response;
};
