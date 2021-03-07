import { Integration } from '../integration/IntegrationHost';

export class LeParisien implements Integration {
  static LEPARISIEN_REGEXP = /leparisien\.fr\/.*-(\d{2})-(\d{2})-(\d{4})-([A-Z\d]+)\.php$/;

  name = 'leparisien';
  domains = ['www.leparisien.fr'];
  type = 'append' as const;

  getElement() {
    return document.getElementsByClassName('comments-wrapper')[0] as HTMLElement;
  }

  getIdentifier(url: string) {
    const match = LeParisien.LEPARISIEN_REGEXP.exec(url);

    if (!match) {
      return null;
    }

    const [, day, month, year, id] = match;

    return ['leparisien', [year, month, day].join('-'), id].join(':');
  }

  onIFrameLoaded(iframe: HTMLIFrameElement) {
    iframe.style.paddingTop = '24px';
  }
}
