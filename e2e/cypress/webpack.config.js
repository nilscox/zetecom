const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  node: { fs: 'empty', child_process: 'empty', readline: 'empty' },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.feature$/,
        use: [
          {
            loader: 'cypress-cucumber-preprocessor/loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      API_URL: 'http://localhost:3000',
      RESTOREDB_URL: 'http://localhost:4242',
    }),
  ],
};
