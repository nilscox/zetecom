/* eslint-disable */

const path = require('path');
const webpack = require('webpack');

module.exports = {

  mode: 'development',
  entry: './popup.js',
  devtool: 'inline-source-map',

  output: {
    filename: 'popup.js',
    path: path.resolve(__dirname, 'assets', 'js', 'dist'),
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      BASE_URL: 'http://localhost:8000',
    }),
  ],

};
