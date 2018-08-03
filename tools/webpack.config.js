const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components")
  .default;
const { isDevelopment } = require("./utils");

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  mode: isDevelopment() ? "development" : "production",

  context: resolve(process.cwd(), "app"),

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
    isDevelopment() ? new webpack.HotModuleReplacementPlugin() : null
  ].filter(Boolean),

  devtool: isDevelopment() ? "cheap-module-eval-source-map" : "source-map",

  performance: {
    maxEntrypointSize: 400000, // 400KB
    maxAssetSize: 400000 // 400KB
  }
};
