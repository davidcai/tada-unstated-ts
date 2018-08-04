const { join } = require("path");
const yargs = require("yargs");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components")
  .default;
const { isDevelopment } = require("@tada/tools");

const isBundleAnalyzerEnabled = yargs.argv.analyze;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  mode: isDevelopment() ? "development" : "production",

  context: join(process.cwd(), "app"),

  entry: [
    "./index.tsx",
    // Hot Module Reloading (HMR) is tricky to set up. To simplify things,
    // in development mode, we use HMR but only to reload the entire page.
    isDevelopment() ? "webpack-hot-middleware/client?reload=true" : null
  ].filter(Boolean),

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            // Enable friendly styled-component names for development mode
            getCustomTransformers: () => ({
              before: isDevelopment() ? [styledComponentsTransformer] : []
            })
          }
        },
        exclude: /node_modules/
      },

      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    isDevelopment() ? new webpack.HotModuleReplacementPlugin() : null,
    isBundleAnalyzerEnabled
      ? new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: join(process.cwd(), "bundle-analysis.html")
        })
      : null
  ].filter(Boolean),

  devtool: isDevelopment() ? "cheap-module-eval-source-map" : "source-map",

  performance: {
    maxEntrypointSize: 400000, // 400KB
    maxAssetSize: 400000 // 400KB
  }
};
