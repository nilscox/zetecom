import { useCallback } from 'react';

import { useIntegrationPageUrl } from 'src/contexts/IntegrationPageUrlContext';

const useOrigin = (url: string) => {
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
  const pageUrl = useIntegrationPageUrl();
  const origin = useOrigin(pageUrl);

  const sendMessage = useCallback(
    (message: Message) => {
      if (!origin) {
        // eslint-disable-next-line no-console
        console.warn('cannot send message: origin is not set');
        return;
      }

      if (window.parent !== window) {
        // console.log('iframe send', message);
        window.parent.postMessage(message, origin);
      }
    },
    [origin],
  );

  const addListener = useCallback((cb: (message: Message) => void) => {
    // TODO: check origin
    window.addEventListener('message', (event: MessageEvent<Message>) => {
      if (typeof event.data?.type === 'string') {
        // console.log('iframe recv', event.data);
        cb(event.data);
      }
    });
  }, []);

  return [sendMessage, addListener] as const;
};

export default useIFrameMessages;
