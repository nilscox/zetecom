const setExtensionActive = (active: boolean) => {
  if (active)
    chrome.runtime.sendMessage({ type: 'SET_EXTENSION_ACTIVE' });
  else
    chrome.runtime.sendMessage({ type: 'UNSET_EXTENSION_ACTIVE' });
};

const setupBadgeListener = () => {
  let href = window.location.href;
  const activeUrls: string[] = [];

  setInterval(() => {
    if (href !== window.location.href) {
      href = window.location.href;
      setExtensionActive(activeUrls.includes(href));
    }
  }, 1000);

  window.addEventListener('message', ({ data }) => {
    if (data.type === 'INTEGRATION_LOADED') {
      if (!activeUrls.includes(href))
        activeUrls.push(href);

      chrome.runtime.sendMessage({ type: 'SET_EXTENSION_ACTIVE' });
    }
  });
};

export default setupBadgeListener;
