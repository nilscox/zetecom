import { BackgroundScriptMessage } from '../types';
import log from '../utils/log';
import { BackgroundScript } from './BackgroundScript';

export class BackgroundScriptMessages {
  constructor(private readonly backgroundScript: BackgroundScript) {
    this.backgroundScript.runtime.onMessage.addListener(this.handleMessage);
  }

  handleMessage = (
    request: BackgroundScriptMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void,
  ) => {
    if (request.type === 'setExtensionActive' && sender.tab?.id) {
      log('set extension active');

      this.backgroundScript.setExtensionActive(request.comments, sender.tab.id);
    }

    if (request.type === 'unsetExtensionActive' && sender.tab?.id) {
      log('unset extension active');

      this.backgroundScript.unsetExtensionActive(sender.tab.id);
    }

    if (request.type === 'getExtensionConfig') {
      log('get extension config');

      this.backgroundScript.getExtensionConfig().then((config) => {
        log('send response', config);
        sendResponse(config);
      });

      return true;
    }

    if (request.type === 'setExtensionConfig') {
      log('set extension config', request.config);

      this.backgroundScript.setExtensionConfig(request.config).then(() => {
        log('send response');
        sendResponse();
      });

      return true;
    }
  };
}
