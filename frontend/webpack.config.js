const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  babelrc: true,
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
        options: { presets: ['@babel/env','@babel/preset-react'] },
      },
      
    ],
  },
  optimization: {
    minimize: true,
  },
  presets:[
    "@babel/preset-env",
    "@babel/preset-react"
],
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};