import { Integration } from '../integration/IntegrationHost';

export class Skeptikon implements Integration {
  name = 'skeptikon';
  domains = ['skeptikon.fr'];
  type = 'switch' as const;
  externalElementTabText = 'Commentaires Skepitkón';
  darkMode = true;

  getElement() {
    return document.querySelector<HTMLElement>('my-video-comments');
  }

  getIdentifier(url: string) {
    const match = /watch\/([-a-z0-9]+)/.exec(url);

    if (!match)
      return null;

    return ['skeptikon', match[1]].join(':');
  };
}
