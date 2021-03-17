import { Integration } from '../integration/IntegrationHost';

export class LePoint implements Integration {
  static LEPOINT_REGEXP = /lepoint\.fr\/([-a-z]+)\/[-a-z0-9]+-(\d{2}-\d{2}-\d{4})-([0-9_]+)\.php/;

  name = 'lepoint';
  domains = ['www.lepoint.fr'];
  type = 'switch' as const;
  externalElementTabText = 'Commentaires Le Point';

  getElement() {
    return document.getElementById('section-commentaires') ?? document.getElementById('Comments');
  }

  getIdentifier(url: string) {
    const match = LePoint.LEPOINT_REGEXP.exec(url);

    if (!match) {
      return null;
    }

    const [, topic, date, id] = match;

    return ['lepoint', topic, date.split('-').reverse().join('-'), id].join(':');
  }
}
