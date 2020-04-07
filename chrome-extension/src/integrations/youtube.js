var setupIntegration = require('../integration');

setupIntegration({
  getElementToSwitchWith: () => document.getElementById('comments') || document.getElementById('comment-section-renderer'),
  pageUrl: window.location.href,
  otherText: 'Commentaires YouTube',
  riText: 'Commentaires Réagir à l\'information',
  buttonsStyles: {
    common: {
      'font-size': '16px',
      'color': '#444',
      'background-color': 'transparent',
      'border-bottom': 'none',
    },
    selected: {
      'border-bottom': '2px solid #ccc',
      'cursor': 'initial',
      'font-weight': 'bold',
    },
    unselected: {
      'cursor': 'pointer',
      'font-weight': 'initial',
    },
  },
});
