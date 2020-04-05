describe('navigation', () => {

  it('write reaction', () => {
    cy.populatedbFromFixture('data.json');
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
