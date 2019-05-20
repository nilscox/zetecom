/* eslint-disable */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const JS_PATH = path.resolve(__dirname, 'public', 'assets', 'js');

const loadEntries = () => {
  return fs.readdirSync(JS_PATH)
    .filter(filename => filename !== 'dist')
    .map(filename => path.resolve(JS_PATH, filename))
    .reduce((o, p) => {
      o[path.basename(p)] = p;
      return o;
    }, {});
};

module.exports = {

  mode: 'development',
  entry: loadEntries,
  devtool: 'inline-source-map',

  output: {
    filename: '[name]',
    path: path.resolve(JS_PATH, 'dist'),
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      BASE_URL: 'http://localhost:8000',
    }),
  ],

};
