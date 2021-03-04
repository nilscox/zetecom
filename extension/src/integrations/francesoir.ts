import { Integration } from '../integration/IntegrationHost';

export class FranceSoir implements Integration {
  static FRANCESOIR_REGEXP = /francesoir\.fr\/([-a-z]+)\/([-a-z0-9]+)/;

  name = 'francesoir';
  domains = ['www.francesoir.fr'];
  type = 'switch' as const;
  externalElementTabText = 'Commentaires FranceSoir';

  getElement() {
    const dsqs = document.querySelectorAll('[id^="dsq-app"]');

    return dsqs[dsqs.length - 1] as HTMLElement;
  }

  getIdentifier(url: string) {
    const match = FranceSoir.FRANCESOIR_REGEXP.exec(url);

    if (!match) {
      return null;
    }

    const [, topic, title] = match;

    return ['francesoir', topic, btoa(title)].join(':');
  }
}
