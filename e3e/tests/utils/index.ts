import { waitFor, within as withinTLD } from '@testing-library/dom';
import userEvent, { IClickOptions, TargetElement } from '@testing-library/user-event';
import { expect } from 'chai';
import { IFrame } from 'test-runner';

const delay = 1;
let iframe: IFrame;

beforeEach(function () {
  iframe = this.iframe;
});

export const type = (element: TargetElement, text: string) => {
  return userEvent.type(element, text, { delay });
};

export const click = (element: TargetElement | any, init?: MouseEventInit, options?: IClickOptions) => {
  return userEvent.click(element, init, options);
};

export const clear = userEvent.clear;

export const wait = (ms: number) => {
  if (ms === 0) {
    return Promise.resolve();
  }

  return new Promise(resolve => setTimeout(resolve, ms));
};

export const zetecom = () => {
  return (iframe.contentWindow as any).zetecom;
};

export const nextEvent = () => {
  return zetecom().tracking.events.pop();
};

export const noMoreEvents = () => {
  return zetecom().tracking.events.length === 0;
};

export const expectEvent = async (event: { category: string; action: string; name?: string }) => {
  await waitFor(() => {
    expect(nextEvent()).to.eql(event, 'Event was not tracked: ' + JSON.stringify(event));
  });
};

export const visitApp = (path = '') => {
  return iframe.navigate('http://localhost:8000' + path);
};

export const visitIntegration = (identifier: string, pageUrl: string) => {
  return iframe.navigate('http://localhost:8000/integration?identifier=' + identifier + '&pageUrl=' + pageUrl);
};

export const visitCommentHistory = (commentId: number) => {
  return iframe.navigate(`http://localhost:8000/integration/comment/${commentId}/history`);
};

export const within = (elem: HTMLElement, cb: (queries: ReturnType<typeof withinTLD>) => void) => {
  return cb(withinTLD(elem));
};
