/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.WDS_HOST || 'localhost';
const PORT = process.env.WDS_PORT || '8000';
const HTTPS = process.env.WDS_HTTPS === 'true';

module.exports = {

  mode: NODE_ENV,

  // publish source maps in production
  devtool: NODE_ENV === 'development' ? 'cheap-module-source-map' : 'source-map',

  entry: {
    main: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      src: path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [

      {
        test: /\.(j|t)sx?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      API_URL: 'http://localhost:3000',
      WEBSITE_URL: 'http://localhost:8080',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public', 'assets'),
          to: path.resolve(__dirname, 'dist', 'assets'),
        },
        path.resolve(__dirname, 'public', 'robots.txt')
      ],
    }),
  ],

  devServer: {
    host: HOST,
    port: PORT,
    https: HTTPS,
    contentBase: path.resolve(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
  },

};