var pkg = require('../package.json');

var EXTENSION_URL = process.env.EXTENSION_URL;

function setupExtensionActiveHandler() {
  window.addEventListener('message', (evt) => {
    var data = evt.data;

    if (data.type === 'INTEGRATION_LOADED')
      chrome.runtime.sendMessage({ type: 'SET_EXTENSION_ACTIVE', url: window.location.url });
  });
}

function createIframe(url) {
  var iframe = document.createElement('iframe');
  var query = [
    ['url', encodeURIComponent(url)].join('='),
    ['extensionVersion', pkg.version].join('='),
  ].join('&');

  iframe.id = 'ri-iframe';
  iframe.src = EXTENSION_URL + '/integration?' + query;
  iframe.scrolling = 'no';
  iframe.style.width = '1px';
  iframe.style.minWidth = '100%';
  iframe.style.border = 'none';
  iframe.style.display = 'block';

  return iframe;
}

function createSwitcherButtons(riText, otherText, defaultStyles) {
  var commonButtonsStyle = {};

  commonButtonsStyle['border'] = 'none';
  commonButtonsStyle['padding'] = '10px 25px';
  commonButtonsStyle['margin'] = '0';
  commonButtonsStyle['outline'] = 'none';

  var buttonOther = document.createElement('button');
  var buttonRI = document.createElement('button');

  Object.assign(buttonOther.style, commonButtonsStyle, defaultStyles);
  Object.assign(buttonRI.style, commonButtonsStyle, defaultStyles);

  buttonOther.style['border-bottom-left-radius'] = '4px';
  buttonOther.style['border-top-left-radius'] = '4px';
  buttonRI.style['border-bottom-right-radius'] = '4px';
  buttonRI.style['border-top-right-radius'] = '4px';

  buttonOther.innerText = otherText;
  buttonRI.innerText = riText;

  var buttons = document.createElement('div');

  buttons.style['text-align'] = 'center';
  buttons.style['margin'] = '30px 0';

  buttons.appendChild(buttonOther);
  buttons.appendChild(buttonRI);

  return {
    buttonRI,
    buttonOther,
    buttons,
  };
}

function createSwitchHandler(selected, unselected, buttonSelected, buttonUnselected, styles) {
  return function() {
    unselected.style.display = 'none';
    selected.style.display = 'block';

    Object.assign(buttonUnselected.style, styles.unselected);
    Object.assign(buttonSelected.style, styles.selected);
  }
}

function createStyles(styles, riSelected) {
  return {
    selected: Object.assign({}, styles.common, styles.selected, riSelected ? styles.ri : styles.other),
    unselected: Object.assign({}, styles.common, styles.unselected, !riSelected ? styles.ri : styles.other),
  };
}

function createSwitcher(opts, integration, originalElement) {
  var switchButtons = createSwitcherButtons(opts.riText, opts.otherText, opts.buttonsStyles.unselected);
  var iframe = createIframe(opts.pageUrl);
  var buttonOther = switchButtons.buttonOther;
  var buttonRI = switchButtons.buttonRI;

  buttonOther.addEventListener('click', createSwitchHandler(originalElement, iframe, buttonOther, buttonRI, createStyles(opts.buttonsStyles, false)));
  buttonRI.addEventListener('click', createSwitchHandler(iframe, originalElement, buttonRI, buttonOther, createStyles(opts.buttonsStyles, true)));

  var initialStyles = createStyles(opts.buttonsStyles, true);

  Object.assign(buttonOther.style, initialStyles.unselected);
  Object.assign(buttonRI.style, initialStyles.selected);

  integration.appendChild(switchButtons.buttons);
  integration.appendChild(originalElement);
  integration.appendChild(iframe);
  originalElement.style.display = 'none';

  iFrameResize({ log: false, checkOrigin: false }, iframe);
}

function createAppendIntegration(opts, integration) {
  var iframe = createIframe(opts.pageUrl);

  integration.appendChild(iframe);
  iFrameResize({ log: false, checkOrigin: false }, iframe);
}

function setupIntegration(opts) {
  var integration = document.createElement('div');
  var getElementToSwitchWith = opts.getElementToSwitchWith;
  var getElementToAppendAfter = opts.getElementToAppendAfter;

  if (getElementToSwitchWith) {
    var element = getElementToSwitchWith();

    if (!element)
      return setTimeout(() => setupIntegration(opts), 1000);

    element.replaceWith(integration);
    createSwitcher(opts, integration, element);
    setupExtensionActiveHandler();
  } else if (getElementToAppendAfter) {
    var element = getElementToAppendAfter();

    if (!element)
      return setTimeout(() => setupIntegration(opts), 1000);

    element.insertAdjacentElement('afterend', integration);
    createAppendIntegration(opts, integration);
    setupExtensionActiveHandler();
  }
}

module.exports = (opts) => {
  if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive')
    setupIntegration(opts);

  window.addEventListener('DOMContentLoaded', () => setupIntegration(opts));
};
