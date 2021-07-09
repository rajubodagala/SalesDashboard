// import Raven from "raven.js";
function init() {
  // Raven.config("https://b5396b9b6910461395377ec58d3d9dae@sentry.io/1506147", {
  //   release: "1-0-0",
  //   environment: "development-test"
  // }).install();
}
function log(error) {
  console.error(error);
  // Raven.captureException(error);
}

export default {
  init,
  log
};
