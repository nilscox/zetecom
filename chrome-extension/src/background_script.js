const activeTabs = [];

chrome.browserAction.setBadgeBackgroundColor({ color: '#4BB543' });

chrome.tabs.onActivated.addListener(function({ tabId }) {
  if (activeTabs.some(id => id === tabId))
    chrome.browserAction.setBadgeText({ text: ' ' });
  else
    chrome.browserAction.setBadgeText({ text: '' });
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (!request.type)
    return;

  if (request.type === 'SET_EXTENSION_ACTIVE') {
    chrome.browserAction.setBadgeText({ text: ' ' });
    activeTabs.push(sender.tab.id);
  }
});
