var setupIntegration = require('../integration');

setupIntegration({
  getElementToSwitchWith: () => document.getElementById('comments') || document.getElementById('comment-section-renderer'),
  pageUrl: window.location.href,
  otherText: 'Commentaires YouTube',
  riText: 'Commentaires Réagir à l\'information',
  buttonsStyles: {
    common: {
      'font-size': '16px',
      'border': '1px solid #CCC',
    },
    ri: {
      'border-left': 'none',
    },
    selected: {
      'background-color': '#eee',
      'cursor': 'initial',
      'font-weight': 'bold',
    },
    unselected: {
      'background-color': '#fff',
      'cursor': 'pointer',
      'font-weight': 'initial',
    },
  },
});
