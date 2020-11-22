import { Integration } from '../integration/IntegrationHost';

export class LeFigaro implements Integration {
  static LEFIGARO_REGEXP = /lefigaro\.fr\/([-a-z]+)\/[-a-z0-9]+-([0-9]{8})$/;

  name = 'lefigaro';
  domains = ['www.lefigaro.fr'];
  type = 'append' as const;

  getElement() {
    return document.getElementsByTagName('article')[0] as HTMLElement;
  }

  getIdentifier(url: string) {
    const match = LeFigaro.LEFIGARO_REGEXP.exec(url);

    if (!match)
      return null;

    const [, topic, date] = match;

    return ['lefigaro', topic, [date.slice(0, 4), date.slice(4, 6), date.slice(6, 8)].join('-')].join(':');
  }
};
