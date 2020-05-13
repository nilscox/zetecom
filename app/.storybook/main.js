const path = require('path');

const babelConfig = require('../babel.config');

module.exports = {

  stories: ['../src/**/*.stories.tsx'],

  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: babelConfig,
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias['react-dom'] = '@hot-loader/react-dom';
    config.resolve.alias.src = path.resolve(__dirname, '..', 'src');

    return config;
  },

};
