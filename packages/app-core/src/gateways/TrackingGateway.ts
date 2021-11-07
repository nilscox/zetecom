type TrackingEventCategory = 'authentication' | 'comment' | 'comments-area' | 'notification' | 'extension';

export type TrackingEvent = {
  category: TrackingEventCategory;
  action: string;
  name?: string;
};

export interface TrackingGateway {
  track(event: TrackingEvent): void;
  pageView(): void;
}
