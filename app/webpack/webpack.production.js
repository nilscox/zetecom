const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = ({ PUBLIC_PATH }) => ({

  mode: 'production',

  // publish source maps in production
  devtool: 'source-map',

  plugins: [

    new ForkTsCheckerWebpackPlugin({
      measureCompilationTime: true,
    }),

  ],

});
