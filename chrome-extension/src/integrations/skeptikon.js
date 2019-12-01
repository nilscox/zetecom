var setupIntegration = require('../integration');

setupIntegration({
  getElementToSwitchWith: () => document.querySelector('my-video-comments'),
  pageUrl: window.location.href,
  otherText: 'Commentaires Skepitkón',
  riText: 'Commentaires Réagir à l\'information',
  buttonsStyles: {
    common: {
      'font-size': '18px',
      'color': '#ffffff',
    },
    selected: {
      'background-color': '#f1680d',
      'cursor': 'initial',
      'font-weight': 'bold',
    },
    unselected: {
      'background-color': '#404040',
      'cursor': 'pointer',
      'font-weight': 'initial',
    },
  },
});
