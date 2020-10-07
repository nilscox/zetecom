const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const HOST = process.env.WDS_HOST || 'localhost';
const PORT = process.env.WDS_PORT || '8000';
const HTTPS = process.env.WDS_HTTPS === 'true';

module.exports = ({ PUBLIC_PATH, SOURCES_PATH }) => ({

  mode: 'development',
  devtool: 'source-map',

  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: true,
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
