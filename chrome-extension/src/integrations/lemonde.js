var setupIntegration = require('../integration');

setupIntegration({
  getElementToAppendAfter: () => document.getElementsByClassName('article__content')[0],
  pageUrl: window.location.href,
});
