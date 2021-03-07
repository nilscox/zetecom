import { useCallback, useState } from 'react';

import useQueryString from 'src/hooks/use-query-string';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (...args: Parameters<typeof console.log>) => {
  // return console.log(...args);
};

export type Message = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  type: string;
};

const useIFrameMessages = () => {
  const query = useQueryString();
  // query params are lost when the route changes
  const [pageUrl] = useState(query.pageUrl as string);

  const sendMessage = useCallback(
    (message: Message) => {
      if (typeof pageUrl !== 'string') {
        // eslint-disable-next-line no-console
        console.warn('cannot send message: pageUrl is not set');
        return;
      }

      if (window.parent !== window) {
        log('iframe send', message, pageUrl);
        window.parent.postMessage(message, pageUrl);
      }
    },
    [pageUrl],
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
