const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/** @type {import("webpack").Configuration} */
module.exports = {
  target: "web",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
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
        test: /\.svg$/,
        use: ["raw-loader"],
      },
    ],
  },
};
