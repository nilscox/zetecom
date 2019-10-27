const path = require('path');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {
  HOST = '0.0.0.0',
  PORT = 8080,
} = process.env;

module.exports = {

  mode: 'development',
  entry: './src/index.tsx',
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
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.(svg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                optimizationLevel: 2,
              },
            },
          },
        ],
      },

    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'assets'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/styles.css',
      ignoreOrder: false,
    }),

    new StaticSiteGeneratorPlugin({
      paths: '/',
      locals: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        EXTENSION_URL: process.env.EXTENSION_URL || 'http://localhost:8000',
        WEBSITE_URL: process.env.WEBSITE_URL || 'http://localhost:8080',
        CHROME_EXTENSION_URL: process.env.CHROME_EXTENSION_URL,
        REPOSITORY_URL: process.env.REPOSITORY_URL,
      },
      globals: {
        window: {}
      }
    }),

    new CopyPlugin([
      {
        from: 'static/**/*',
        transformPath: target => target.replace(/^static/, 'assets'),
      },
    ]),
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
    host: HOST,
    port: PORT,
    inline: false,
  },

};
