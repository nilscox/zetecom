const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = ({ OUTPUT_PATH }) => ({
  mode: 'production',

  // publish source maps in production
  devtool: 'source-map',

  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },

  plugins: [new ForkTsCheckerWebpackPlugin()],
});
