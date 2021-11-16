/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpackConfig = require('./webpack.config');

/** @type {import('webpack').Configuration} */
module.exports = {
  ...webpackConfig,

  entry: './src/demos.tsx',

  output: {
    ...webpackConfig.output,
    path: path.resolve(__dirname, 'demo'),
  },

  devServer: {
    ...webpackConfig.devServer,
    port: 6660,
  },
};
