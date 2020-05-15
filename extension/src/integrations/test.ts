import setupIntegration from '../integration';

const getElement = () => document.getElementById('comments');

setupIntegration({
  getElement,
  type: 'switch',
  originalText: 'Commentaires Test',
  integrationText: 'Commentaires Réagir à l\'information',
});
