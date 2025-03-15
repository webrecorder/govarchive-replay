const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// Copyright banner text
const BANNER_TEXT = `proxyui.js is a component of the ReplayWeb.page (https://replayweb.page) system, Copyright (C) 2020-${new Date().getFullYear()}, Webrecorder Software. Licensed under the Affero General Public License v3.'`;

/** @type {import("webpack").Configuration} */
module.exports = {
  target: "web",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "content"),
    filename: `proxyui.js`,
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  devServer: {
    static: __dirname,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        include: path.resolve(__dirname, "src"),
        options: {
          onlyCompileBundledFiles: true,
        },
      },
      {
        // CSS loaded as raw string and used as a CSSStyleSheet
        test: /\.css$/,
        type: "asset/source",
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        type: "asset/source",
      },
    ],
  },
  plugins: [new webpack.BannerPlugin(BANNER_TEXT)],
};
