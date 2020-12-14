describe('integration', () => {
  it('should request to open a new comments area from the integration', () => {
    cy.visitIntegration('test:request-open');

    cy.contains("L'espace de commentaires n'est pas ouvert sur cette page.");
    cy.contains("Connectez-vous pour demander l'ouverture d'une nouvelle zone de commentaire.");

    cy.didTrack({ category: 'Extension', action: 'View Integration', name: 'View Integration Closed' });
  });
});
