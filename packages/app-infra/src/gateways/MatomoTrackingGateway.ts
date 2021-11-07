import MatomoTracker from '@datapunt/matomo-tracker-js';
import { TrackingEvent, TrackingGateway } from '@zetecom/app-core';

export class MatomoTrackingGateway implements TrackingGateway {
  private matomo: MatomoTracker;

  constructor(url: string, siteId: number) {
    this.matomo = new MatomoTracker({
      urlBase: url,
      siteId,
    });
  }

  track(event: TrackingEvent): void {
    this.matomo.trackEvent(event);
  }

  pageView() {
    this.matomo.trackPageView();
  }
}
