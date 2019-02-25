const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '..', 'frontend'),
  entry: ['@babel/polyfill', './src/chrome-extension.js'],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'content.js',
  },
  devtool: 'source-map',
};
