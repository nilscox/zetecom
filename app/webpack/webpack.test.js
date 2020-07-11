const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = ({ OUTPUT_PATH_INSTRUMENTED }) => ({

  mode: 'development',

  output: {
    path: OUTPUT_PATH_INSTRUMENTED,
  },

  plugins: [

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      API_URL: 'http://localhost:3000',
      WEBSITE_URL: 'http://localhost:8080',
    }),

    new ForkTsCheckerWebpackPlugin({
      measureCompilationTime: true,
    }),

  ],

});
