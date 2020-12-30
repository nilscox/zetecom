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

  onIFrameLoaded(iframe: HTMLIFrameElement) {
    iframe.style.width = '100%';
    iframe.style.minWidth = 'unset';
    iframe.style.maxWidth = '1000px';
    iframe.style.margin = '0 auto 15px auto';
    iframe.style.padding = '0 15px';
  }
}
