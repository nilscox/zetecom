const path = require('path');

module.exports = {
  sections: [
    {
      name: 'Elements',
      components: 'src/components-v2/elements/**/*.tsx',
      ignore: ['src/components-v2/elements/Button/LoadingIndicator.tsx'],
    },
    {
      name: 'Guidelines',
      content: 'src/components-v2/guidelines.md',
    },
  ],
  pagePerSection: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src', 'utils', 'StyleguidistWrapper.tsx'),
  },
};
