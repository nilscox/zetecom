import log from './log';

type SetExtensionActive = { type: 'SET_EXTENSION_ACTIVE' };
type UnsetExtensionActive = { type: 'UNSET_EXTENSION_ACTIVE' };
type BackgroundScriptMessage = SetExtensionActive | UnsetExtensionActive;

export const sendMessageToBackgroundScript = (message: BackgroundScriptMessage) => {
  log('send message to background script', message)
  chrome.runtime.sendMessage(message);
};

export const onMessageFromIFrame = <T extends string>(type: T, cb: ({ type }: { type: T }) => void) => {
  window.addEventListener('message', ({ data }) => {
    if (data.type === type) {
      log('message from iframe', data);
      cb(data);
    }
  });
};

type IdentifierChanged = { type: 'IDENTIFIER_CHANGED', identifier: string };
type IFrameMessage = IdentifierChanged;

export const sendMessageToIFrame = (iframe: HTMLIFrameElement, message: IFrameMessage) => {
  log('send message to iframe', message);
  iframe.contentWindow?.postMessage(message, process.env.APP_URL!);
};
