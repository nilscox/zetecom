import setupIntegration from '../integration';

const getElement = () => document.getElementById('comments') || document.getElementById('comment-section-renderer');

setupIntegration({
  getElement,
  type: 'switch',
  originalText: 'Commentaires YouTube',
  integrationText: 'Commentaires Réagir à l\'information',
});
