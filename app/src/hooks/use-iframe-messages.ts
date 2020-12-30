import { useCallback, useRef } from 'react';

import useQueryString from 'src/hooks/use-query-string';

const log = (...args: Parameters<typeof console.log>) => {
  // return console.log(...args);
};

const getOrigin = (url: string) => {
  const a = document.createElement('a');

  a.href = url;

  return a.origin;
};

export type Message = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  type: string;
};

const useIFrameMessages = () => {
  const params = useQueryString();
  const pageUrl = decodeURIComponent(params.pageUrl as string);

  // pageUrl becomes undefined for some reason
  const { current: origin } = useRef(getOrigin(pageUrl));

  const sendMessage = useCallback(
    (message: Message) => {
      if (!origin) {
        // eslint-disable-next-line no-console
        console.warn('cannot send message: origin is not set');
        return;
      }

      if (window.parent !== window) {
        log('iframe send', message, origin);
        window.parent.postMessage(message, origin);
      }
    },
    [origin],
  );

  const addListener = useCallback((cb: (message: Message) => void) => {
    // TODO: check origin
    window.addEventListener('message', (event: MessageEvent<Message>) => {
      if (typeof event.data?.type === 'string') {
        log('iframe recv', event.data);
        cb(event.data);
      }
    });
  }, []);

  return [sendMessage, addListener] as const;
};

export default useIFrameMessages;
