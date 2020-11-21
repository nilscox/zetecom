import setupIntegration, { Integration } from '../integration';

const getElement = () => document.getElementById('comments');

const getIdentifier = () => {
  const match = /article\/([0-9]+)/.exec(window.location.href);

  if (!match)
    return null;

  return ['test', match[1]].join(':');
};

const test: Integration = {
  getElement,
  getIdentifier,
  healthcheck: () => true,
  type: 'switch',
  originalText: 'Commentaires Test',
  integrationText: 'Commentaires Zétécom',
};

export default test;
