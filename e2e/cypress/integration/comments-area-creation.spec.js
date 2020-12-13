const users = require('../fixtures/users.json');
const commentsAreas = require('../fixtures/comments-areas.json');

const [admin, moderator, user1] = users;
const [commentsArea1] = commentsAreas;

const publicationDate = new Date(commentsArea1.informationPublicationDate);
const typePublicationDate = [
  publicationDate.getDate(),
  publicationDate.getMonth() + 1,
  publicationDate.getFullYear(),
].join('');

describe('comments area creation', () => {
  describe('comments area request', () => {
    before(() => {
      cy.seed({ users: [user1] });
    });

    it('should request to open a new comments area', () => {
      cy.login(user1);
      cy.visitApp();

      cy.contains('Ouvrir une zone de commentaires').click();
      cy.contains('Valider').should('be.visible');

      cy.contains('Annuler').click();
      cy.contains('Valider').should('not.be.visible');

      cy.contains('Ouvrir une zone de commentaires').click();
      cy.getField("URL de l'information *").type(commentsArea1.informationUrl);

      cy.contains('Valider').click();

      cy.contains("L'ouverture a bien été prise en compte, les modérateurs vont traiter votre demande.").should(
        'be.visible'
      );

      cy.didTrack({
        category: 'CommentsArea',
        action: 'Request',
        name: 'Comments Area Request From App',
      });
    });

    it('should request to open a new comments area with full payload', () => {
      cy.login({ email: user1.email, password: user1.password });
      cy.visitApp('');

      cy.contains('Ouvrir une zone de commentaires').click();
      cy.contains('Valider').should('be.visible');

      cy.contains('Annuler').click();
      cy.contains('Valider').should('not.be.visible');

      cy.contains('Ouvrir une zone de commentaires').click();
      cy.getField("Titre de l'information").type(commentsArea1.informationTitle);
      cy.getField("URL de l'information *").type(commentsArea1.informationUrl);
      cy.getField("URL de l'image").type(commentsArea1.imageUrl);
      cy.getField("Auteur de l'information").type(commentsArea1.informationAuthor);
      cy.getField('Date de publication').type(typePublicationDate);

      cy.contains('Valider').click();
    });

    it.skip('should request to open a new comments area from the integration', () => {
      cy.visitIntegration('test:request-open');

      cy.contains("L'espace de commentaires n'est pas ouvert sur cette page.");
      cy.contains("Connectez-vous pour demander l'ouverture d'une nouvelle zone de commentaire.");

      cy.didTrack({ category: 'Extension', action: 'View Integration', name: 'View Integration Closed' });

      cy.login({ email: 'user1@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:request-open');

      cy.contains("L'espace de commentaires n'est pas ouvert sur cette page.");
      cy.contains("Demander l'ouverture").click();

      cy.didTrack({
        category: 'CommentsArea',
        action: 'Request',
        name: 'Request From Integration',
      });

      cy.contains("L'ouverture a bien été prise en compte !");
      cy.contains('Les modérateurs traiteront votre demande au plus vite.');

      cy.reload();

      cy.contains("Demander l'ouverture").click();
    });
  });

  describe('comments area creation', () => {
    before(() => {
      cy.seed({ users: [moderator, user1] });
    });

    beforeEach(() => {
      cy.login(user1);
      cy.visitApp();

      cy.contains('Ouvrir une zone de commentaires').click();
      cy.getField("URL de l'information *").type(commentsArea1.informationUrl);
      cy.contains('Valider').click();

      cy.logout();
    });

    it('should reject a comments area request', () => {
      cy.login(moderator);
      cy.visitApp('/moderation/ouvertures');

      cy.contains('Refuser').click();

      cy.contains("La demande d'ouverture a bien été refusée.").click();

      cy.didTrack({
        category: 'CommentsArea',
        action: 'Request Rejected',
      });
    });

    it('should create a comments area', () => {
      cy.login(moderator);
      cy.visitApp('/moderation/ouvertures');

      cy.getField("Titre de l'information *").type(commentsArea1.informationTitle);
      cy.getField("URL de l'information *").clear();
      cy.getField("URL de l'information *").type('https://some.other/url');
      cy.getField("URL de l'image *").type(commentsArea1.imageUrl);
      cy.getField("Auteur de l'information *").type(commentsArea1.informationAuthor);
      cy.getField('Date de publication *').type(typePublicationDate);

      cy.contains('Ouvrir').click();

      cy.contains('La nouvelle zone de commentaires a bien été créé. Voir');

      cy.didTrack({
        category: 'CommentsArea',
        action: 'Create',
      });

      cy.contains('Voir').click();

      cy.pathname('/commentaires/1');
    });
  });

  it('full comments area request and creation by a single user', () => {
    cy.seed({ users: [moderator] });

    cy.login(moderator);
    cy.visitApp();

    cy.contains('Ouvrir une zone de commentaires').click();
    cy.getField("URL de l'information *").type(commentsArea1.informationUrl);
    cy.getField("URL de l'image").type(commentsArea1.imageUrl);
    cy.getField('Date de publication').type(typePublicationDate);

    cy.contains('Valider').click();

    cy.contains('moderator').click();
    cy.contains('Modération').click();
    cy.contains('Ouvertures').click();

    cy.getField("Titre de l'information *").type(commentsArea1.informationTitle);
    cy.getField("Auteur de l'information *").clear();
    cy.getField("Auteur de l'information *").type('himself');

    cy.contains('Ouvrir').click();

    cy.getField('jj / mm / aaaa').type(typePublicationDate);
    cy.contains('Ouvrir').click();

    cy.contains('La nouvelle zone de commentaires a bien été créé.');
  });
});
