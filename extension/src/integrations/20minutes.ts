import { Integration } from '../integration/IntegrationHost';

export class Minutes20 implements Integration {
  static MINUTES20_REGEXP = /20minutes\.fr\/.+\/([0-9]+-[0-9]+)[-a-z0-9]+$/;

  name = '20minutes';
  domains = ['www.20minutes.fr'];
  type = 'switch' as const;
  externalElementTabText = 'Commentaires 20 Minutes';

  getElement() {
    return document.querySelector('#comments-container') as HTMLElement;
  }

  getIdentifier(url: string) {
    const match = Minutes20.MINUTES20_REGEXP.exec(url);

    if (!match) {
      return null;
    }

    const [, id] = match;

    return ['20minutes', id].join(':');
  }
}
