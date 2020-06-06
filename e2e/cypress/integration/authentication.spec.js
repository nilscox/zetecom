describe('authentication', () => {

  it('navigation', () => {
    cy.visitPopup();

    cy.location(location => expect(location).to.eq('/popup/connexion'));
    cy.contains('Connectez-vous sur Réagir à l\'information').should('be.visible');
    cy.contains('Créer un compte').should('be.visible');
    cy.contains('Mot de passe oublié').should('be.visible');

    cy.contains('Créer un compte').click();
    cy.location(location => expect(location).to.eq('/popup/inscription'));
    cy.contains('Créez votre compte sur Réagir à l\'information').should('be.visible');
    cy.contains('Connexion').should('be.visible');
    cy.contains('Mot de passe oublié').should('be.visible');

    cy.contains('Mot de passe oublié').click();
    cy.location(location => expect(location).to.eq('/popup/connexion-par-email'));
    cy.contains('via un email contenant un lien de connexion sans mot de passe.').should('be.visible');
    cy.contains('Connexion').should('be.visible');
    cy.contains('Mot de passe oublié').should('be.visible');
  });

  it('signup', () => {
    cy.resetdb();

    cy.visitPopup('/inscription');

    cy.get('input[name="email"]').type('user@domain.tld');
    cy.get('input[name="password"]').type('secure p4ssword');
    cy.get('input[name="nick"]').type('User');
    cy.contains('J\'accepte la charte.').closest('label').children().eq(0).click();
    cy.contains('J\'accepte la charte.').closest('label').children().eq(0).click();
    cy.get('button[type="submit"]').click();
    cy.contains('un email vous a été envoyé à user@domain.tld');

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

  it('ask email login', () => {
    cy.resetdb();

    cy.visitPopup('/connexion-par-email');

    cy.get('input[name="email"]').type('user1@domain.tld');
    cy.get('button[type="submit"]').contains('Envoyer').click();

    cy.contains('L\'email de connexion a bien été envoyé à l\'adresse user1@domain.tld');
  });

  it('change password', () => {
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

    cy.contains('Changer de mot de passe').click();

    cy.get('input[name="password"]').type('sec');
    cy.get('form').submit();

    cy.contains('Ce mot de passe est trop court.').should('exist');

    cy.get('input[name="password"]').clear().type('n3w p4ssword');
    cy.get('form').submit();

    cy.contains('Votre mot de passe a bien été mis à jour !').should('be.visible');
    cy.contains('Changer de mot de passe').should('be.visible');

    cy.contains('Déconnexion').click();

    cy.get('input[name="email"]').type('user1@domain.tld');
    cy.get('input[name="password"]').type('secure p4ssword');
    cy.get('button[type="submit"]').contains('Connexion').click();

    cy.contains('Combinaison email / mot de passe non valide');

    cy.get('input[name="password"]').clear().type('n3w p4ssword');
    cy.get('button[type="submit"]').contains('Connexion').click();

    cy.contains('Déconnexion');
  });

});
