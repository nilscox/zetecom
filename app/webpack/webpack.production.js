const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = ({ OUTPUT_PATH }) => ({

  mode: 'production',

  // publish source maps in production
  devtool: 'source-map',

  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],

});
