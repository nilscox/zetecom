require('dotenv').config();

const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack/webpack.common');
const development = require('./webpack/webpack.development');
const production = require('./webpack/webpack.production');

const NODE_ENV = process.env.NODE_ENV || 'development';

const paths = {
  SOURCES_PATH: path.resolve(__dirname, 'src'),
  OUTPUT_PATH: path.resolve(__dirname, 'dist'),
  OUTPUT_PATH_INSTRUMENTED: path.resolve(__dirname, 'instrumented'),
  PUBLIC_PATH: path.resolve(__dirname, 'public'),
};

const mergeConfig = merge.smartStrategy({
  'entry.main': 'prepend',
  'module.rules.use': 'append',
  'plugins': 'prepend',
});

const config = {
  development,
  production,
};

module.exports = mergeConfig(common(paths), config[NODE_ENV](paths));

// console.dir({
//   entry: module.exports.entry,
//   output: module.exports.output,
//   resolve: module.exports.resolve,
//   module: module.exports.module,
//   devServer: module.exports.devServer,
// }, { depth: null });

// console.dir({
//   plugins: module.exports.plugins,
// }, { depth: 1 });
