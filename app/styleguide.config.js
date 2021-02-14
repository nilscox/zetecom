const path = require('path');

module.exports = {
  sections: [
    {
      name: 'Elements',
      components: 'src/components-v2/elements/**/*.tsx',
      ignore: [
        'src/components-v2/elements/Button/LoadingIndicator.tsx',
        'src/components-v2/elements/Dialog/ConfirmDialog.tsx',
      ],
    },
    {
      name: 'Layout',
      components: 'src/components-v2/layout/**/*.tsx',
    },
    {
      name: 'Domain',
      components: 'src/components-v2/domain/**/*.tsx',
      ignore: [
        'src/components-v2/domain/AuthenticationForm/!(AuthenticationForm.tsx)/**/*',
        'src/components-v2/domain/Comment/!(Comment.tsx)/**/*',
        'src/components-v2/domain/CommentForm/!(CommentForm.tsx)/**/*',
        'src/components-v2/domain/CommentsAreaForm/!(CommentsAreaForm.tsx)/**/*',
        'src/components-v2/domain/CommentsAreaOutline/!(CommentsAreaOutline.tsx)/**/*',
        'src/components-v2/domain/FiltersBar/!(FiltersBar.tsx)/**/*',
        'src/components-v2/domain/Notification/!(Notification.tsx)/**/*',
        'src/components-v2/domain/UserMenu/AuthenticatedUserMenu.tsx',
        'src/components-v2/domain/UserMenu/UnauthenticatedUserMenu.tsx',
      ],
    },
    {
      name: 'Theme',
      content: 'src/theme/theme.md',
    },
    {
      name: 'Icons',
      content: 'src/components-v2/icons/_icons.md',
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
