import { Integration } from '../integration/IntegrationHost';

export class LeMonde implements Integration {
  static LEMONDE_REGEXP = /lemonde\.fr\/([-a-z]+)\/[a-z]+\/(\d{4}\/\d{2}\/\d{2})\/[-a-z0-9]+_([0-9_]+)\.html/;

  name = 'lemonde';
  domains = ['www.lemonde.fr'];
  type = 'append' as const;

  getElement() {
    return document.getElementsByClassName('article__content')[0] as HTMLElement;
  }

  getIdentifier(url: string) {
    const match = LeMonde.LEMONDE_REGEXP.exec(url);

    if (!match)
      return null;

    const [, topic, date, id] = match;

    return ['lemonde', topic, date.replace(/\//g, '-'), id].join(':');
  }
};
