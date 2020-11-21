/* eslint-disable */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('dotenv').config();

module.exports = {

  mode: process.env.NODE_ENV,

  entry: {
    popup: {
      import: './' + path.join('src', 'popup', 'popup.ts'),
      filename: 'popup/[name].js',
    },
    background: './src/background.ts',
    content_script: './src/content_script.ts',
  },

  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,

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
      {
        test: /.css$/,
        use: ['style-loader','css-loader'],
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
      APP_URL: 'http://localhost:8000',
    }),
    new CopyWebpackPlugin([
      'manifest.json',
      { from: 'src/popup/popup.html', to: 'popup/popup.html' },
      { from: 'icons', to: 'icons' },
    ]),
  ],

};

// console.log(JSON.stringify(module.exports, null, 2));
