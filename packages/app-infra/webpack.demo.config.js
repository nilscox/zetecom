/* eslint-disable */

const webpackConfig = require('./webpack.config');

module.exports = {
  ...webpackConfig,

  entry: './src/demos.tsx',

  devServer: {
    ...webpackConfig.devServer,
    port: 6660,
  },
};
