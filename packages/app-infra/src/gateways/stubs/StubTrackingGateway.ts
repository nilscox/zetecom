import { TrackingEvent, TrackingGateway } from '@zetecom/app-core';

export class StubTrackingGateway implements TrackingGateway {
  private events: TrackingEvent[] = [];

  private pageViews: string[] = [];

  constructor() {
    window.zetecom.tracking = {
      events: this.events,
      pageViews: this.pageViews,
    };
  }

  track(event: TrackingEvent): void {
    console.log(`track event ${event.action}`, event);
    this.events.push(event);
  }

  pageView() {
    const url = window.location.href;

    console.log(`track page view ${url}`);
    this.pageViews.push(url);
  }
}
