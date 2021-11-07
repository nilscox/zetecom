import { BoundFunctions, getQueriesForElement, waitFor, queries } from '@testing-library/dom';
import userEvent, { IClickOptions, TargetElement } from '@testing-library/user-event';
import { expect } from 'chai';
import { IFrame } from 'testea';

const delay = 1;
let iframe: IFrame;

beforeEach(function () {
  iframe = this.iframe;
});

export const type = (element: TargetElement, text: string) => {
  return userEvent.type(element, text, { delay });
};

export const click = (element: TargetElement, init?: MouseEventInit, options?: IClickOptions) => {
  return userEvent.click(element, init, options);
};

export const clear = (element: TargetElement) => userEvent.clear(element);

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
  const events = zetecom().tracking.events;
  const matchEvent = (e: any) => Object.entries(event).every(([k, v]) => e[k] === v);

  await waitFor(() => {
    const idx = events.findIndex(matchEvent);

    if (idx < 0) {
      expect.fail(`Event was not tracked: ${JSON.stringify(event)}\n\nAll events: ${JSON.stringify(events, null, 2)}`);
    } else {
      events.splice(idx, 1);
    }
  });
};

export const getQueriesForIframe = () => {
  if (iframe.body === undefined) {
    throw new Error('Cannot get queries for iframe: body is undefined');
  }

  return getQueriesForElement(iframe.body);
};

export const visitApp = async (path = '') => {
  await iframe.navigate('http://localhost:8000' + path);
  return getQueriesForIframe();
};

export const visitIntegration = async (identifier: string, pageUrl = window.location.href) => {
  await iframe.navigate(`http://localhost:8000/integration/${identifier}?pageUrl=${pageUrl}`);
  return getQueriesForIframe();
};

export const visitPopup = async (path = '', pageUrl = window.location.href) => {
  await iframe.navigate(`http://localhost:8000/popup${path}?pageUrl=${pageUrl}`);
  const queries = getQueriesForIframe();
  await waitFor(() => expect(queries.getByText('Commentaires')).to.be.visible);
  return queries;
};

export const visitCommentHistory = async (commentId: number) => {
  await iframe.navigate(`http://localhost:8000/commentaire/${commentId}/historique`);
  return getQueriesForIframe();
};

export const visitCommentReport = async (commentId: number) => {
  await iframe.navigate(`http://localhost:8000/commentaire/${commentId}/signaler`);
  return getQueriesForIframe();
};

export function within(elem: HTMLElement): BoundFunctions<typeof queries>;
export function within<R>(elem: HTMLElement, cb?: (q: BoundFunctions<typeof queries>) => R): R;

export function within<R>(
  elem: HTMLElement,
  cb?: (q: BoundFunctions<typeof queries>) => R
): R | ReturnType<typeof getQueriesForElement> {
  const queries = getQueriesForElement(elem);

  if (!cb) {
    return queries;
  }

  return cb(queries);
}
