import queryString from 'query-string';

import { Integration } from '../integration/IntegrationHost';

export class YouTube implements Integration {
  name = 'youtube';
  domains = ['www.youtube.com', 'm.youtube.com'];
  type = 'switch' as const;
  externalElementTabText = 'Commentaires YouTube';

  getElement() {
    return document.getElementById('comments') ||
      document.getElementsByTagName('ytm-comment-section-renderer')[0] as HTMLElement;
  }

  getIdentifier(url: string) {
    const { query: { v } } = queryString.parseUrl(url);

    if (!v)
      return null;

    return ['youtube', v].join(':');
  }
}
