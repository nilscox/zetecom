import { Integration } from '../integration/IntegrationHost';

export class Liberation implements Integration {
  static LIBERATION_REGEXP = /liberation\.fr\/([-a-z]+)\/(\d{4}\/\d{2}\/\d{2})\/[-a-z0-9]+_([0-9]+)$/;

  name = 'liberation';
  domains = ['www.liberation.fr'];
  type = 'append' as const;

  getElement() {
    return document.getElementsByClassName('article-body')[0].closest('.container-column') as HTMLElement;
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
