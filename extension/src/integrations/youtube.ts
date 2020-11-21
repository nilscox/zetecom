import queryString from 'query-string';

import setupIntegration from '../integration';

const getElement = () =>
  document.getElementById('comments') ||
  document.getElementsByTagName('ytm-comment-section-renderer')[0] as HTMLElement;

const getIdentifier = (url: string) => {
  const { v } = queryString.parse(url);

  if (!v)
    return null;

  return ['youtube', v].join(':');
};

const healthcheck = () => {
  const comments = getElement();

  if (comments?.previousElementSibling?.getAttribute('id') === 'related')
    return false;

  return true;
};

const youtube = {
  getElement,
  getIdentifier,
  healthcheck,
  type: 'switch',
  originalText: 'Commentaires YouTube',
  integrationText: 'Commentaires Zétécom',
};

export default youtube;
