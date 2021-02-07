import { Integration } from '../integration/IntegrationHost';

export class Liberation implements Integration {
  static LIBERATION_REGEXP = /liberation\.fr(\/[-a-z0-9]+)+\/[-a-z0-9]+_([A-Z0-9]+)/;

  name = 'liberation';
  domains = ['www.liberation.fr'];
  type = 'append' as const;

  getElement() {
    return document.getElementsByClassName('tag-container')[0] as HTMLElement;
  }

  getIdentifier(url: string) {
    const match = Liberation.LIBERATION_REGEXP.exec(url);

    if (!match)
      return null;

    const [, topic, date, id] = match;

    return ['liberation', topic, date.replace(/\//g, '-'), id].join(':');
  }

  onIFrameLoaded(iframe: HTMLIFrameElement) {
    iframe.style.padding = '0 24px';
  }
};
