const path = require('path');

module.exports = {

  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
  ],

  stories: ['../src/**/*.stories.tsx'],

  webpackFinal: (config) => {
    config.resolve.alias.src = path.resolve(__dirname, '..', 'src');
    return config;
  },

};
