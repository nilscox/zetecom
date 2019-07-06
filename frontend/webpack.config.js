const path = require('path');
const webpack = require('webpack');

require('dotenv').config();

const HOST = process.env.WEBPACK_DEV_SERVER_HOST || 'localhost';
const PORT = process.env.WEBPACK_DEV_SERVER_PORT || '8000';
const HTTPS = process.env.WEBPACK_DEV_SERVER_HTTPS === 'true';

module.exports = {

  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      API_URL: 'http://localhost:3000',
      BASE_URL: 'http://localhost:8000',
      CHROME_EXTENSION_ID: null,
      GITHUB_REPO_URL: null,
    }),
  ],

  devServer: {
    host: HOST,
    port: PORT,
    https: HTTPS,
    publicPath: '/assets/js/',
    contentBase: path.resolve(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
  },

};
