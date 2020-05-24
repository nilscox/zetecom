const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = () => ({

  mode: 'production',

  // publish source maps in production
  devtool: 'source-map',

  plugins: [

    new ForkTsCheckerWebpackPlugin({
      measureCompilationTime: true,
    }),

  ],

});
