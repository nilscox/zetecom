/* eslint-disable */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('dotenv').config();

const INTEGRATIONS_PATH = path.resolve(__dirname, 'src', 'integrations');

const makeEntry = (filepath, filename) => ({
  import: './' + path.join('src', filepath, filename),
  filename: filepath + '/[name].js',
});

const loadIntegrationsEntries = () => {
  return fs.readdirSync(INTEGRATIONS_PATH)
    .reduce((obj, filename) => ({
      ...obj,
      [path.parse(filename).name]: makeEntry('integrations', filename),
    }), {});
};

module.exports = {

  mode: process.env.NODE_ENV,

  entry: {
    popup: makeEntry('popup', 'popup.ts'),
    background: './src/background.ts',
    ...loadIntegrationsEntries(),
  },

  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.json', '.js', '.ts']
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      EXTENSION_URL: 'http://localhost:8000',
    }),
    new CopyWebpackPlugin([
      'manifest.json',
      { from: 'src/popup/popup.html', to: 'popup/popup.html' },
      { from: 'icons', to: 'icons' },
    ]),
  ],

};

// console.log(JSON.stringify(module.exports, null, 2));
