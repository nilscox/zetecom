const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = () => ({

  mode: 'production',

  // publish source maps in production
  devtool: 'source-map',

  plugins: [

    new ForkTsCheckerWebpackPlugin({
      measureCompilationTime: true,
    }),

    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_PATH, 'index.ejs'),
      templateParameters: {
        ENABLE_TRACKING: 'true',
        GTM_CONTAINER_ID: 'GTM-KM3DQMX',
        GA_ID: 'UA-169280449-1',
      },
    }),

  ],

});
