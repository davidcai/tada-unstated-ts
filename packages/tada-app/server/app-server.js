const { resolve } = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const history = require("connect-history-api-fallback");
const { isDevelopment } = require("@tada/tools");
const webpackConfig = require("../webpack.config");

const app = express();

// Add catch-all route to enable HTML5 history for react-router's BrowserRouter
app.use(history());

if (!isDevelopment()) {
  app.use(express.static(resolve(process.cwd(), "dist")));
} else {
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(webpackCompiler, { stats: "minimal" }));
  app.use(webpackHotMiddleware(webpackCompiler));
}

module.exports = app;
