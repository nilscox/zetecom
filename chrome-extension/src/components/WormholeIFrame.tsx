import React, { useRef, useEffect } from 'react';

import { Wormhole, WormholeInEvent, WormholeOutEvent } from '../types/Wormhole';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Handlers = { [key: string]: ((event: any) => void)[] };

type WormholeIFrameProps = {
  setWormhole: (wormhole: Wormhole) => void;
};

const WormholeIFrame: React.FC<WormholeIFrameProps> = ({ setWormhole }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlersRef = useRef<Handlers>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const postEvent = (event: WormholeOutEvent) => {
    if (!iframeRef.current) {
      console.warn('WormholeIFrame.postEvent: iframe is not loaded');
      return;
    }

    if (iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        event,
        'https://cdv.localhost'
      );
    }
  };

  type OnEventType = <T extends WormholeInEvent>(
    type: T['type'],
    callback: (event: T) => void,
  ) => void;

  const onEvent: OnEventType = (type, callback) => {
    if (!handlersRef.current[type])
      handlersRef.current[type] = [];

    handlersRef.current[type].push(callback);
  };

  useEffect(() => {
    const handler = (evt: MessageEvent) => {
      const { data } = evt;

      if (data && data.type === 'IFRAME_READY') {
        setWormhole({ onEvent, postEvent });
        return;
      }

      if (data && typeof data.type === 'string') {
        const callbacks = handlersRef.current[data.type];

        if (callbacks)
          callbacks.forEach(cb => cb(data));
        else {
          console.warn(
            'WormholeIFrame.onMessage: No handlers for event:',
            data.type
          );
        }
      }
    };

    window.addEventListener('message', handler, false);

    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <iframe
      src={process.env.IFRAME_URL}
      style={{ width: 0, height: 0, border: 'none' }}
      ref={iframeRef}
    />
  );
};

export default WormholeIFrame;
