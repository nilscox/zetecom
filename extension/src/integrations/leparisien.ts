import { Integration } from '../integration/IntegrationHost';

export class LeParisien implements Integration {
  static LEPARISIEN_REGEXP = /leparisien\.fr\/.*-(\d+)\.php$/;

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

    const [, id] = match;

    return ['leparisien', id].join(':');
  }

  onIFrameLoaded(iframe: HTMLIFrameElement) {
    iframe.style.paddingTop = '24px';
  }
}
