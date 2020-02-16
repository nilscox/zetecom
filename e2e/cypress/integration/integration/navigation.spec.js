describe('navigation', () => {

  it('view reactions and open replies', () => {
    cy.populatedb();
    cy.visitIntegration('https://news.fake/article/1');

    cy.get('#reaction-1').contains('reaction 1 text');
    cy.get('#reaction-1').contains('2 réponses').click();

    cy.contains('reaction 1.1 text');
    cy.contains('reaction 1.2 text');
  });

  it('write reaction', () => {
    cy.populatedb();
    cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });

    cy.visitIntegration('https://news.fake/article/1');

    cy.get('textarea[placeholder="Composez votre message..."]').type('message\n\n- item 1\n- item 2\n');
    cy.get('button[type="submit"]').contains('Envoyer').click();

    const reaction = cy.get('#reaction-4');

    reaction.contains('message');
    reaction.get('ul').get('li').contains('item 1');
    reaction.get('ul').get('li').contains('item 2');
  });

});
