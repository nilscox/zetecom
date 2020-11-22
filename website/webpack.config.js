const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');

require('dotenv').config();

const {
  NODE_ENV = 'development',
  HOST = '0.0.0.0',
  PORT = '8000',
  BETA = 'false',
} = process.env;

const dev = NODE_ENV === 'development';
const prod = NODE_ENV === 'production';

const commonConfig = {

  mode: prod ? 'production' : 'development',
  devtool: dev ? 'source-map' : false,

  entry: BETA === 'true' ? './src/HowToBeta/index.tsx' : './src/index.tsx',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [

      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.(png|gif|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash].[ext]',
            publicPath: '/',
          },
        },
      },

    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      CHROME_EXTENSION_URL: null,
      FIREFOX_ADDON_URL: null,
      CHROME_EXTENSION_STAGING_URL: null,
      FIREFOX_ADDON_STAGING_URL: null,
      REPOSITORY_URL: null,
      GOOGLE_ANALYTICS_ID: null,
      CONTACT_EMAIL: null,
      DISCORD_ID: null,
      FACEBOOK_PAGE: null,
      TWITTER_ACCOUNT: null,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static/robots.txt', to: './robots.txt' },
        { from: 'static/extension', to: './extension', noErrorOnMissing: true },
        { from: 'static/logo.png', to: './logo.png' },
        { from: 'static/favicon.ico', to: './favicon.ico' },
        { from: 'static/updates.json', to: './updates.json', noErrorOnMissing: true },
      ],
    }),
  ],

};

const devConfig = {
  output: {
    publicPath: '/',
  },

  // mini-css-extract-plugin is not yet compatible with webpack 5
  // https://github.com/webpack/webpack-dev-server/issues/1485
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],

  devServer: {
    host: HOST,
    port: Number(PORT),
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /\.html$/, to: '/index.html' },
      ],
    },
  },
};

const prodConfig = {
  output: {
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new CompressionWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new StaticSiteGeneratorPlugin({
      globals: {
        self: {},
      },
    }),
  ],
};

module.exports = merge(commonConfig, dev && devConfig, prod && prodConfig);
