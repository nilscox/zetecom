describe('authentication', () => {

  it('signup', () => {
    cy.resetdb();

    cy.visitPopup();

    cy.contains('Inscription').click();
    cy.get('input[name="email"]').type('user@domain.tld');
    cy.get('input[name="password"]').type('secure p4ssword');
    cy.get('input[name="nick"]').type('User');
    cy.contains('J\'accepte la charte.').closest('label').children().eq(0).click();
    cy.contains('J\'accepte la charte.').closest('label').children().eq(0).click();
    cy.get('button[type="submit"]').contains('Inscription').click();
    cy.contains('un email vous a été envoyé à user@domain.tld.');

    cy.visitPopup();

    cy.contains('User');
    cy.contains('Email : user@domain.tld');
    cy.get('button').contains('Déconnexion');
  });

  it('login', () => {
    const data = {
      users: [
        { nick: 'user1', email: 'user1@domain.tld', password: 'secure p4ssword' },
      ],
      informations: [],
    };

    cy.resetdb();
    cy.populatedb(data);

    cy.visitPopup();

    cy.get('input[name="email"]').type('user1@domain.tld');

    cy.get('input[name="password"]').type('wrong p4ssword');
    cy.get('button[type="submit"]').contains('Connexion').click();

    cy.contains('Combinaison email / mot de passe non valide');

    cy.get('input[name="password"]').clear();
    cy.get('input[name="password"]').type('secure p4ssword');

    cy.get('button[type="submit"]').contains('Connexion').click();

    cy.contains('user1');
    cy.contains('Email : user1@domain.tld');

    cy.get('button').contains('Déconnexion');
    cy.visitPopup();
    cy.get('button').contains('Déconnexion');
  });

  it('logout', () => {
    const data = {
      users: [
        { nick: 'user1', email: 'user1@domain.tld', password: 'secure p4ssword' },
      ],
      informations: [],
    };

    cy.resetdb();
    cy.populatedb(data);
    cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });

    cy.visitPopup();

    cy.get('button').contains('Déconnexion').click();

    cy.contains('Connexion');
    cy.visitPopup();
    cy.contains('Connexion');
  });

  it('ask email connection', () => {
    cy.resetdb();

    cy.visitPopup();
    cy.contains('Mot de passe oublié ?').click();

    cy.contains('Connexion par email').should('exist');

    cy.get('input[name="email"]').type('user1@domain.tld');
    cy.get('button[type="submit"]').contains('Envoyer').click();

    cy.contains('L\'email de connexion a bien été envoyé à l\'adresse user1@domain.tld.');
  });

});
