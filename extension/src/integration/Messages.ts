import log from './log';

export type Message = {
  [key: string]: any;
  type: string;
};

type Actor = 'iframe' | 'contentScript' | 'backgroundScript';

export class Messages {
  public static iframe?: HTMLIFrameElement;

  static send(to: Actor, message: Message) {
    log(`send message to ${to}`, message)

    if (to === 'backgroundScript') {
      chrome.runtime.sendMessage(message);
    } else if (to === 'iframe') {
      Messages.iframe?.contentWindow?.postMessage(message, process.env.APP_URL!);
    } else if (to === 'contentScript') {
      window.postMessage(message, window.location.origin);
    }
  };

  static listen(cb: (message: Message) => void) {
    window.addEventListener('message', ({ data }) => {
      if (data.type !== 'INTEGRATION_LOADED') {
        return;
      }

      log('message', data);
      cb(data);
    });
  };
}
