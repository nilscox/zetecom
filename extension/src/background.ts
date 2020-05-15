declare const browser: any;

const main = ({ browserAction, runtime }: typeof chrome) => {
  let text = ' ';

  browserAction.setBadgeBackgroundColor({ color: '#4BB543' });

  // firefox doesn't support a space for the addon's badge text
  if (typeof browser !== 'undefined') {
    browser.browserAction.setBadgeTextColor({ color: '#4BB543' });
    text = '*';
  }

  runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender) => {
    if (request.type === 'SET_EXTENSION_ACTIVE' && sender.tab?.id) {
      browserAction.setBadgeText({ text, tabId: sender.tab.id });
    }

    if (request.type === 'UNSET_EXTENSION_ACTIVE' && sender.tab?.id) {
      browserAction.setBadgeText({ text: '', tabId: sender.tab.id });
    }
  });
};

main(chrome);
