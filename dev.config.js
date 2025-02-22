const { merge } = require("webpack-merge");
const common = require("./common.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  target: "web",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  devtool: "inline-source-map",
  output: {
    filename: "[name].[contenthash].js"
  },
});
