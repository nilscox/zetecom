/* eslint-disable */

const path = require('path');
const glob = require('glob');
const { EnvironmentPlugin } = require('webpack');

const webpackConfig = require('./webpack.config');

const getComponents = (basePath) => {
  const entries = glob(basePath + '/**/*.md', { sync: true })
    .map((filePath) => filePath.replace(basePath + '/', ''))
    .map((filePath) => filePath.replace(/\.md$/, '.tsx'));

  return `${basePath}/{${entries.join(',')}}`;
};

/** @type {import('webpack').Configuration} */
const styleguidistWebpackConfig = {
  plugins: [
    ...webpackConfig.plugins,
    new EnvironmentPlugin({
      WDS_SOCKET_HOST: 'localhost',
      WDS_SOCKET_PORT: '6060',
      WDS_SOCKET_PATH: '/sockjs-node',
      FAST_REFRESH: 'true',
    }),
  ],
  devServer: {
    ...webpackConfig.devServer,
    port: 6060,
  },
};

console.log(getComponents('src/components/elements'));

/** @type {import('react-styleguidist').StyleguidistConfig} */
module.exports = {
  webpackConfig: Object.assign({}, webpackConfig, styleguidistWebpackConfig),
  sections: [
    {
      name: 'Elements',
      components: getComponents('src/components/elements'),
    },
    {
      name: 'Layout',
      components: getComponents('src/components/layout'),
    },
    {
      name: 'Domain',
      components: getComponents('src/components/domain'),
    },
    {
      name: 'Theme',
      content: 'src/theme/theme.md',
    },
    {
      name: 'Icons',
      content: 'src/components/icons/_icons.md',
    },
    // {
    //   name: 'Guidelines',
    //   content: 'src/components/guidelines.md',
    // },
  ],
  pagePerSection: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/StyleguidistWrapper'),
  },
};
