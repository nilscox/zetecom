const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ESBuildPlugin } = require('esbuild-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ SOURCES_PATH, OUTPUT_PATH, PUBLIC_PATH }) => ({
  entry: {
    main: ['./src/index.tsx'],
  },

  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: SOURCES_PATH,
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },

      {
        test: /\.(j|t)sx?$/,
        include: SOURCES_PATH,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
              tsconfigRaw: require('../tsconfig.json'),
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'fonts',
        },
      },

      {
        test: /\.(svg|png)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'images',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new EnvironmentPlugin({
      NODE_ENV: 'development',
      API_URL: 'http://localhost:3000',
      WEBSITE_URL: 'http://localhost:8080',
      ANALYTICS_URL: null,
      ANALYTICS_SITE_ID: null,
      SENTRY_DSN: null,
      DEBUG: null,
    }),

    // new webpack.NamedModulesPlugin(),
    new ESBuildPlugin(),

    new CopyWebpackPlugin({
      patterns: [path.join(PUBLIC_PATH, 'robots.txt')],
    }),

    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_PATH, 'index.html'),
    }),
  ],
});
