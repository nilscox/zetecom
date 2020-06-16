declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export type TrackingEvent = {
  category: 'authentication';
  action: string;
  // label: string;
};

const track = (event: TrackingEvent) => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-unused-expressions
    window?.dataLayer?.push({ event: 'ga-event', label: event.action, ...event });
  }
};

export default track;
