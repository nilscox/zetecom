/* eslint-disable */

const path = require('path');
const webpack = require('webpack');

require('dotenv').config();

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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      EXTENSION_URL: 'http://localhost:8000',
    }),
  ],

};
