/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const EXTENSION = path.resolve(__dirname, '..', 'extension');

module.exports = {

  mode: 'development',
  entry: './src/popup.js',
  devtool: 'inline-source-map',

  output: {
    filename: 'popup.js',
    path: path.join(EXTENSION, 'popup'),
  },

  plugins: [
    new Dotenv({
      safe: true,
    }),
  ],

};
