const path = require('path');
const webpack = require('webpack');

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

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      API_URL: 'http://localhost:3000',
      BASE_URL: 'http://localhost:8000',
      CHROME_EXTENSION_ID: 'pnppgdnmhjaoafcadennndpcdoglilcn',
    }),
  ],

  devServer: {
    host: HOST,
    port: PORT,
    https: false,
    publicPath: '/assets/js/',
    contentBase: path.resolve(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
  },

};
