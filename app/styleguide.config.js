const path = require('path');
const glob = require('glob');

const getComponents = basePath => {
  const entries = glob(basePath + '/**/*.md', { sync: true })
    .map(filePath => filePath.replace(basePath + '/', ''))
    .map(filePath => filePath.replace(/\.md$/, '.tsx'));

  return `${basePath}/{${entries.join(',')}}`;
};

module.exports = {
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
    {
      name: 'Guidelines',
      content: 'src/components/guidelines.md',
    },
  ],
  pagePerSection: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src', 'utils', 'StyleguidistWrapper.tsx'),
  },
};
