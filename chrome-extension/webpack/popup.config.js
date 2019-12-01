/* eslint-disable */

const path = require('path');
const webpack = require('webpack');

require('dotenv').config();

const EXTENSION = path.resolve(__dirname, '..', 'extension');

module.exports = {

  mode: process.env.NODE_ENV,
  entry: './src/popup.js',
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,

  output: {
    filename: 'popup.js',
    path: path.join(EXTENSION, 'popup'),
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      EXTENSION_URL: 'http://localhost:8000',
    }),
  ],

};
