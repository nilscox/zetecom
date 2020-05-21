import setupIntegration from '../integration';

const getElement = () => document.getElementsByClassName('pagination')[0] as HTMLElement || null;

const getIdentifier = () => {
  const match = /project\/([0-9]+)/.exec(window.location.href);

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
  integrationText: 'Commentaires Réagir à l\'information',
});
