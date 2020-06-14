declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export type TrackArguments =
  | ['login']
  | ['signup']
  | ['logout', { from: 'popup' | 'app' }]
  | ['ask-email-login']
  | ['change-password'];

const track = (...args: TrackArguments) => {
  const [event, parameters = {}] = args;

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-unused-expressions
    window?.dataLayer?.push({ event, ...parameters });
  }
};

export default track;
