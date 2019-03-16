const path = require('path');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '8000';

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
  },
  devServer: {
    host: HOST,
    port: PORT,
    https: false,
    publicPath: '/assets/js/',
    contentBase: path.resolve(__dirname, 'public'),
  },
};
