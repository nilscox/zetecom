const activeTabs = [];

const isActiveTab = (tabId) => activeTabs.some(id => id === tabId);
const setActive = (tabId) => chrome.browserAction.setBadgeText({ text: ' ' });;
const unsetActive = (tabId) => chrome.browserAction.setBadgeText({ text: '' });;

chrome.browserAction.setBadgeBackgroundColor({ color: '#4BB543' });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (isActiveTab(tabId)) {
    if (changeInfo && changeInfo.status === 'loading') {
      unsetActive();
      activeTabs.splice(activeTabs.indexOf(tabId), 1);
    }
  }

  if (activeTabs.some(id => id === tabId))
    setActive();
  else
    unsetActive();
});

chrome.tabs.onActivated.addListener(function({ tabId }) {
  if (isActiveTab(tabId))
    setActive();
  else
    unsetActive();
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (!request.type)
    return;

  if (request.type === 'SET_EXTENSION_ACTIVE') {
    setActive();
    activeTabs.push(sender.tab.id);
  }
});
