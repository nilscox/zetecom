/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const { EnvironmentPlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: './src/index.tsx',

  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.BASENAME ?? '/',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@zetecom/app-core': path.resolve(__dirname, '..', 'app-core', 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
        },
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
      },

      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new ProvidePlugin({ React: 'react' }),
    new EnvironmentPlugin({
      BASENAME: '/',
      DEMO: 'false',
      API_URL: 'http://localhost:3000',
      WEBSITE_URL: 'http://localhost:8080',
      ANALYTICS_URL: '',
      ANALYTICS_SITE_ID: 'stub',
    }),
    new CopyWebpackPlugin({
      patterns: [path.resolve(__dirname, 'public', 'robots.txt'), path.resolve(__dirname, 'public', 'favicon.ico')],
    }),
    new HtmlWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],

  devServer: {
    host: '0.0.0.0',
    port: 8000,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, './avatars'),
      publicPath: '/avatars',
    },
  },
};

if (module.exports.output.publicPath !== '/') {
  module.exports.output.publicPath += '/';
}
