import users from '../fixtures/users.json';
import commentsAreas from '../fixtures/comments-areas.json';

const [admin, moderator, user1, user2, user3] = users;
const [, commentsArea2] = commentsAreas;

describe('notifications', () => {
  describe('rules update', () => {
    before(() => {
      cy.seed({ users: [admin, user1] });
      cy.createRulesUpdateNotification('4.2');
    });

    it('should send a notification when the rules are updated', () => {
      cy.login(user1);
      cy.visitApp();

      cy.get('.user-menu').within(() => {
        cy.contains('1');
      });

      cy.visitApp('/notifications');

      cy.countNotifications(1);

      cy.contains('La charte a été mise à jour !');
      cy.contains('La version 4.2 de la charte est disponible sur le site de Zétécom.');
      cy.contains('Voir les détails');

      cy.contains('Marquer comme lue').click();
    });
  });

  describe('subscription reply', () => {
    before(() => {
      cy.seed({ users: [user1, user2], commentsAreas: [commentsArea2] });
    });

    it('should send a notification when a subscribed comment gets a new reply', () => {
      cy.login(user1);
      cy.postComment({ commentsAreaId: 1, parentId: 1, text: 'reply' });
      cy.logout();

      cy.login(user2);
      cy.visitApp('/notifications');

      cy.countNotifications(1);

      cy.contains('user1 a répondu à un commentaire');
      cy.contains('Sur la zone de commentaires One comment');
      cy.contains('reply');

      cy.contains('Marquer comme lue').click();
    });
  });

  describe('comments area request', () => {
    beforeEach(() => {
      cy.seed({ users: [moderator, user1] });
    });

    it('should send a notification when a comments area request was approved', () => {
      cy.login(user1);
      cy.requestCommentsArea({ informationUrl: 'https://info.url' });
      cy.logout();

      cy.login(moderator);
      cy.createCommentsArea({
        informationTitle: 'information title',
        informationUrl: 'https://info.url',
        informationAuthor: 'anyone',
        informationPublicationDate: new Date(2020, 0, 1).toISOString(),
      });
      cy.logout();

      cy.login(user1);
      cy.visitApp('/notifications');

      cy.countNotifications(1);

      cy.contains("Votre demande d'ouverture de zone de commentaires a été acceptée !");

      cy.contains("Vous avez demandé l'ouverture d'une zone de commentaire sur la page :");
      cy.contains('https://info.url');

      cy.contains('Marquer comme lue').click();
    });

    it('should send a notification when a comments area request was rejected', () => {
      cy.login(user1);
      cy.requestCommentsArea({ informationUrl: 'https://info.url' });
      cy.logout();

      cy.login(moderator);
      cy.rejectCommentsAreaRequest(1);
      cy.logout();

      cy.login(user1);
      cy.visitApp('/notifications');

      cy.countNotifications(1);

      cy.contains("Votre demande d'ouverture de zone de commentaires n'a pas été retenue");
      cy.contains("Cette demande concernait l'ouverture d'une nouvelle zone de commentaire sur la page :");
      cy.contains('https://info.url');

      cy.contains('Marquer comme lue').click();
    });
  });
});
