import { Integration } from '../integration/IntegrationHost';

export class LesEchos implements Integration {
  static LESECHOS_REGEXP = /lesechos\.fr\/.*-(\d+)$/;

  name = 'lesechos';
  domains = ['www.lesechos.fr'];
  type = 'append' as const;

  getElement() {
    return document.getElementsByTagName('section')[0]?.lastChild as HTMLElement;
  }

  getIdentifier(url: string) {
    const match = LesEchos.LESECHOS_REGEXP.exec(url);

    if (!match) {
      return null;
    }

    const [, id] = match;

    return ['lesechos', id].join(':');
  }
}
