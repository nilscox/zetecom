const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshPlugin = require('@webhotelier/webpack-fast-refresh');
const ErrorOverlayPlugin = require('@webhotelier/webpack-fast-refresh/error-overlay');

const HOST = process.env.WDS_HOST || 'localhost';
const PORT = process.env.WDS_PORT || '8000';
const HTTPS = process.env.WDS_HTTPS === 'true';

module.exports = ({ PUBLIC_PATH, SOURCES_PATH }) => ({

  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: {
    main: [
      '@webhotelier/webpack-fast-refresh/runtime.js',
    ],
  },

  module: {
    rules: [

      {
        test: /\.(j|t)sx?$/,
        include: SOURCES_PATH,
        use: [
          { loader: '@webhotelier/webpack-fast-refresh/loader.js' },
        ],
      },

    ],
  },

  plugins: [

    new ReactRefreshPlugin(),
    new ErrorOverlayPlugin(),

    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: true,
      formatter: 'codeframe',
      formatterOptions: {
        linesAbove: 5,
        linesBelow: 5,
        highlightCode: true,
      },
    }),

  ],

  devServer: {
    host: HOST,
    port: PORT,
    https: HTTPS,
    contentBase: PUBLIC_PATH,
    disableHostCheck: true,
    historyApiFallback: true,
    progress: false,
    overlay: true,
    hot: true,
  },

});
