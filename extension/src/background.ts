declare const browser: any;

type Chrome = typeof chrome;
type BrowserAction = Chrome['browserAction'];
type Runtime = Chrome['runtime'];
type MessageSender = chrome.runtime.MessageSender;
type Tab = chrome.tabs.Tab;

type Message = {
  [key: string]: any;
  type: string;
};

class BackgroundScript {
  private color = '#45A63D';

  constructor(private readonly chrome: Chrome) {
    this.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender) => {
      this.handleMessage(request, sender);
    });
  }

  get runtime() {
    return this.chrome.runtime;
  }

  get browserAction() {
    return this.chrome.browserAction;
  }

  handleMessage(request: any, sender: MessageSender) {
    if (request.type === 'SET_EXTENSION_ACTIVE' && sender.tab?.id) {
      const text = request.comments >= 100 ? '99+' : request.comments.toString();

      this.browserAction.setBadgeText({ text, tabId: sender.tab.id });
      this.browserAction.setBadgeBackgroundColor({ color: this.color, tabId: sender.tab.id });
    }

    if (request.type === 'UNSET_EXTENSION_ACTIVE' && sender.tab?.id) {
      this.browserAction.setBadgeText({ text: '', tabId: sender.tab.id });
    }
  }

  getCurrentTab(cb: (tab: Tab) => void) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        cb(tabs[0]);
      }
    });
  }

  sendMessageToCurrentTab(message: Message) {
    this.getCurrentTab((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  }
}

const main = () => {
  new BackgroundScript(chrome);
};

main();
