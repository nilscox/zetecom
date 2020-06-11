import setupIntegration from '../integration';

const getElement = () => document.getElementById('comments');

const getIdentifier = () => {
  const match = /article\/([0-9]+)/.exec(window.location.href);

  if (!match)
    return null;

  return ['test', match[1]].join(':');
};

setupIntegration({
  getElement,
  getIdentifier,
  healthcheck: () => true,
  type: 'switch',
  originalText: 'Commentaires Test',
  integrationText: 'Commentaires Zétécom',
});
