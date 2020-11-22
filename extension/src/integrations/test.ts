import { Integration } from '../integration/IntegrationHost';

export class Test implements Integration {
  name = 'test';
  domains = ['localhost:8080'];
  type = 'switch' as const;
  externalElementTabText = 'Commentaires Test';

  getElement() {
    return document.getElementById('comments');
  }

  getIdentifier(url: string) {
    const match = /article\/([0-9]+)/.exec(url);

    if (!match)
      return null;

    return ['test', match[1]].join(':');
  }
};
