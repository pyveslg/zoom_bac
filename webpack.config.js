const path = require('path');

module.exports = {
  entry: "./javascript/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  devtool: "sourcemap",
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            /node_modules/
          ],
          use: [
            { loader: "babel-loader" }
          ]
        }
      ]
    }
};
