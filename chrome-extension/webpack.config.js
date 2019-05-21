/* eslint-disable */

const path = require('path');
const webpack = require('webpack');

const EXTENSION = path.resolve(__dirname, 'extension');

module.exports = {

  mode: 'development',
  entry: './popup/popup.js',
  devtool: 'inline-source-map',

  output: {
    filename: 'popup.js',
    path: EXTENSION,
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      BASE_URL: 'http://localhost:8000',
    }),
  ],

};
