const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  ENABLE_TRACKING,
  GTM_CONTAINER_ID,
  GA_ID,
} = process.env;

module.exports = ({ SOURCES_PATH, OUTPUT_PATH, PUBLIC_PATH }) => ({

  entry: {
    main: [
      './src/index.tsx',
    ],
  },

  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: '[name].js',
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
        test: /\.(j|t)sx?$/,
        include: SOURCES_PATH,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
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
        use: 'file-loader',
      },

      {
        test: /\.(svg|png)$/,
        use: 'file-loader',
      },

    ],
  },

  plugins: [

    new CleanWebpackPlugin(),

    new EnvironmentPlugin({
      NODE_ENV: 'development',
      API_URL: 'http://localhost:3000',
      WEBSITE_URL: 'http://localhost:8080',
    }),

    // new webpack.NamedModulesPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        path.join(PUBLIC_PATH, 'robots.txt'),
      ],
    }),

    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_PATH, 'index.ejs'),
      templateParameters: {
        ENABLE_TRACKING,
        GTM_CONTAINER_ID,
        GA_ID,
      },
    }),

  ],

});
