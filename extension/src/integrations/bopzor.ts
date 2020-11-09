import setupIntegration from '../integration';

const getElement = () => document.getElementsByClassName('pagination')[0] as HTMLElement || null;

const getIdentifier = (url: string) => {
  const match = /project\/([0-9]+)/.exec(url);

  if (!match)
    return null;

  return ['bopzor', match[1]].join(':');
};

setupIntegration({
  getElement,
  getIdentifier,
  healthcheck: () => true,
  type: 'switch',
  originalText: 'Pagination',
  integrationText: 'Commentaires Zétécom',
});
