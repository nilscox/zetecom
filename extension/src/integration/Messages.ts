import log from './log';

export type Message = {
  [key: string]: any;
  type: string;
};

type Actor = 'iframe' | 'contentScript' | 'runtime';

const runtimeMessages = ['GET_INTEGRATION_STATE', 'SCROLL_IFRAME_INTO_VIEW'];
const iframeMessages = ['INTEGRATION_LOADED'];

export class Messages {
  public static iframe?: HTMLIFrameElement;

  static send(to: Actor, message: Message) {
    log('content script send', message, to);

    if (to === 'runtime') {
      chrome.runtime.sendMessage(message);
    } else if (to === 'iframe') {
      Messages.iframe?.contentWindow?.postMessage(message, process.env.APP_URL!);
    } else if (to === 'contentScript') {
      window.postMessage(message, window.location.origin);
    }
  };

  static listen(from: Actor, cb: (message: Message) => void) {
    if (from === 'runtime') {
      chrome.runtime.onMessage.addListener((data) => {
        if (!runtimeMessages.includes(data.type)) {
          return;
        }

        log('content script recv from runtime', data);
        cb(data);
      });
    } else if (from === 'iframe') {
      window.addEventListener('message', ({ data }) => {
        if (!iframeMessages.includes(data.type)) {
          return;
        }

        log('content script recv from iframe', data);
        cb(data);
      });
    }
  };
}
