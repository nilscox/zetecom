/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import queryString from 'query-string';

import {
  ContentScriptToIFrameMessage,
  ExtensionConfig,
  ExtensionConfigResult,
  IFrameToContentScriptMessage,
  IFrameToPopupMessage,
  IntegrationState,
  IntegrationStateResult,
  PopupToIFrameMessage,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (...args: Parameters<typeof console.log>) => {
  // return console.log(...args);
};

const { pageUrl } = queryString.parse(window.location.search);

type OutMessage = IFrameToContentScriptMessage | IFrameToPopupMessage;
type InMessage = ContentScriptToIFrameMessage | PopupToIFrameMessage;

const postMessage = (message: OutMessage) => {
  if (typeof pageUrl !== 'string') {
    console.warn('not sending message: pageUrl is not set');
    return;
  }

  if (window.parent === window) {
    console.warn('not sending message: not in an iframe');
    return;
  }

  log('iframe postMessage to parent', message, pageUrl);
  window.parent.postMessage(message, pageUrl);
};

const addListener = (cb: (message: InMessage) => void) => {
  const listener = (event: MessageEvent<InMessage>) => {
    if (typeof event.data?.type === 'string') {
      log('iframe receive from parent', event.data);
      cb(event.data);
    }
  };

  // TODO: check origin
  window.addEventListener('message', listener);

  return () => window.removeEventListener('message', listener);
};

const postMessageResponse = <T extends InMessage>(
  message: OutMessage,
  isResponse: (data: any) => data is T,
  onResponse: (response: T) => void,
) => {
  const removeEventListener = addListener(data => {
    if (isResponse(data)) {
      removeEventListener();
      onResponse(data);
    }
  });

  postMessage(message);
};

export const onFocusApp = () => {
  postMessage({ type: 'focusApp' });
};

export const onIntegrationLoaded = (commentsAreaId: number, comments: number) => {
  postMessage({ type: 'integrationLoaded', commentsAreaId, comments });
};

const is = (type: InMessage['type']) => <T extends InMessage>(data: any): data is T => {
  return data.type === type;
};

export const getExtensionConfig = (cb: (config: ExtensionConfig) => void) => {
  postMessageResponse<ExtensionConfigResult>({ type: 'getExtensionConfig' }, is('extensionConfig'), ({ config }) =>
    cb(config),
  );
};

export const updateExtensionConfig = (config: ExtensionConfig) => {
  postMessage({ type: 'setExtensionConfig', config });
};

export const getIntegrationState = (cb: (state: IntegrationState) => void) => {
  postMessageResponse<IntegrationStateResult>({ type: 'getIntegrationState' }, is('integrationState'), ({ state }) =>
    cb(state),
  );
};
