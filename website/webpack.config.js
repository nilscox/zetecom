const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  mode: 'development',
  entry: './index.tsx',
  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  module: {
    rules: [

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },

    ],
  },


  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'src': path.resolve(__dirname, 'src'),
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      ignoreOrder: false,
    }),

    new StaticSiteGeneratorPlugin({
      paths: [
        '/',
      ],
      locals: {
        greet: 'Hello'
      },
      globals: {
        window: {}
      }
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  devServer: {
    port: 8000,
    inline: false,
  },

};
