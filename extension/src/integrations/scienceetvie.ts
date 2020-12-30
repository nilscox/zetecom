import { Integration } from '../integration/IntegrationHost';

export class ScienceEtVie implements Integration {
  static SCIENCEETVIE_REGEXP = /science-et-vie\.com\/.*-(\d+)$/;

  name = 'scienceetvie';
  domains = ['www.science-et-vie.com'];
  type = 'append' as const;

  getElement() {
    return document.getElementsByClassName('article-content')[0] as HTMLElement;
  }

  getIdentifier(url: string) {
    const match = ScienceEtVie.SCIENCEETVIE_REGEXP.exec(url);

    if (!match) {
      return null;
    }

    const [, id] = match;

    return ['scienceetvie', id].join(':');
  }
}
