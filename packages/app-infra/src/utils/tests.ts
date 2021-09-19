import { waitFor as TLWaitFor, waitForOptions, within as TLWithin } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const type = (element: HTMLElement, text: string) => {
  return userEvent.type(element, text, { delay: 1 });
};

export const within = (element: HTMLElement, cb: (queries: ReturnType<typeof TLWithin>) => void) => {
  cb(TLWithin(element));
};

export const waitFor = <T>(cb: () => T | Promise<T>, options?: waitForOptions) => {
  return TLWaitFor(cb, { timeout: 490, ...options });
};
