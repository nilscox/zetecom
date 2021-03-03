import { Integration } from '../integration/IntegrationHost';

export class Liberation implements Integration {
  static LIBERATION_REGEXP_OLD = /liberation\.fr\/([-a-z]+)\/(\d{4}\/\d{2}\/\d{2})\/[-a-z0-9]+_([0-9]+)$/;
  static LIBERATION_REGEXP = /liberation\.fr\/([-a-z]+)\/?.*\/[-a-z0-9]+-(\d{8})_([A-Z0-9]+)\/?$/;

  name = 'liberation';
  domains = ['www.liberation.fr'];
  type = 'append' as const;

  getElement() {
    return document.getElementsByClassName('tag-container')[0] as HTMLElement;
  }

  getIdentifier(url: string) {
    const match = Liberation.LIBERATION_REGEXP_OLD.exec(url) ?? Liberation.LIBERATION_REGEXP.exec(url);

    if (!match) {
      return null;
    }

    const [, topic, date, id] = match;

    let formatedDate;

    if (date.includes('/')) {
      formatedDate = date.replace(/\//g, '-');
    } else {
      formatedDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6);
    }

    return ['liberation', topic, formatedDate, id].join(':');
  }

  onIFrameLoaded(iframe: HTMLIFrameElement) {
    iframe.style.padding = '0 24px';
  }
};
