function isEnv(name) {
  const env = process.env.NODE_ENV || "development";

  return env === name;
}

function isDevelopment() {
  return isEnv("development");
}

function isTest() {
  return isEnv("test");
}

function isProduction() {
  return isEnv("production");
}

module.exports = {
  isDevelopment,
  isTest,
  isProduction
};
