import { IntegrationHost } from './IntegrationHost';
import log from '../utils/log';
import { IFrameToContentScriptMessage, BackgroundScriptMessage, PopupToContentScriptMessage } from '../types';

export class ContentScriptMessages {
  public static iframe?: HTMLIFrameElement;

  constructor(private readonly integrationHost: IntegrationHost) {
    chrome.runtime.onMessage.addListener((data, _sender, sendResponse) => {
      if (typeof data.type === 'string') {
        log('content script receive from popup', data);
      }

      this.handlePopupMessage(data, sendResponse);
    });

    window.addEventListener('message', ({ data }) => {
      if (typeof data.type === 'string') {
        log('content script receive from app', data);
      }

      this.handleAppMessage(data);
    });
  }

  handlePopupMessage(message: PopupToContentScriptMessage, sendResponse: (data: unknown) => void) {
    if (message.type === 'focusApp') {
      this.integrationHost.showCommentsArea();
    } else if (message.type === 'getIntegrationState') {
      sendResponse(this.integrationHost.state);
    }
  }

  handleAppMessage(message: IFrameToContentScriptMessage) {
    if (message.type === 'integrationLoaded') {
      this.integrationHost.onIntegrationLoaded(message.commentsAreaId, message.comments);
    }
  }

  async sendToBackgroundScript<T>(type: string, message: Omit<BackgroundScriptMessage, 'type'> = {}): Promise<T> {
    log('content script send to background script', message);

    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type, ...message }, resolve);
    });
  }
}
