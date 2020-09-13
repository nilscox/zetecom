import path from 'path';
import webpack, { EnvironmentPlugin } from 'webpack';
import {} from 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
// @ts-ignore
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// @ts-ignore
import CopyWebpackPlugin from 'copy-webpack-plugin';

const {
  NODE_ENV = 'development',
  HOST = '0.0.0.0',
  PORT = '8000',
} = process.env;

const dev = NODE_ENV === 'development';
const prod = NODE_ENV === 'production';

let config: webpack.Configuration = {

  mode: prod ? 'production' : 'development',
  devtool: dev ? 'source-map' : false,

  entry: './src/index.tsx',

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
      FACEBOOK_PAGE: null,
      TWITTER_ACCOUNT: null,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static/robots.txt', to: './robots.txt' },
        { from: 'static/extension', to: './extension' },
        { from: 'static/favicon.ico', to: './favicon.ico' },
        { from: 'static/updates.json', to: './updates.json' },
      ],
    }),
  ],

};

if (dev) {
  config = {
    ...config,

    output: {
      ...config.output,
      publicPath: '/',
    },

    // mini-css-extract-plugin is not yet compatible with webpack 5
    // https://github.com/webpack/webpack-dev-server/issues/1485
    module: {
      ...config.module,
      rules: [
        ...config.module?.rules,

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
      ...config.plugins,
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
}

if (prod) {
  config = {
    ...config,

    output: {
      ...config.output,
      libraryTarget: 'umd',
    },

    module: {
      ...config.module,
      rules: [
        ...config.module?.rules,

        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },

      ],
    },

    plugins: [
      ...config.plugins,
      new MiniCssExtractPlugin(),
      new StaticSiteGeneratorPlugin({
        globals: {
          self: {},
        },
      }),
    ],

  };
}

export default config;
