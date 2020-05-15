import queryString from 'query-string';

import setupIntegration from '../integration';

const getElement = () => document.getElementById('comments') || document.getElementById('comment-section-renderer');

const getIdentifier = () => {
  const { v } = queryString.parse(window.location.search);

  if (!v)
    return null;

  return ['youtube', v].join(':');
};

setupIntegration({
  getElement,
  getIdentifier,
  type: 'switch',
  originalText: 'Commentaires YouTube',
  integrationText: 'Commentaires Réagir à l\'information',
});
