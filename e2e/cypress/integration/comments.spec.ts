import users from '../fixtures/users.json';
import commentsAreas from '../fixtures/comments-areas.json';

const [, , user1, user2, user3, user4, me] = users;
const [
  commentsAreaEmpty,
  commentsAreaOneComment,
  commentsAreaScore,
  commentsAreaPaginationImported,
  commentsAreaWithMyself,
] = commentsAreas;

const createComments = (num) => {
  return new Array(num).fill(null).map(() => ({
    author: 'user1',
    reactions: {
      approve: [],
      refute: [],
      skeptic: [],
    },
    text: 'comment',
    history: [],
    replies: [],
  }));
};

const commentsAreaPagination = {
  ...commentsAreaPaginationImported,
  comments: [
    ...createComments(20).map((comment) => ({
      ...commentsAreaPaginationImported.comments[0],
      ...comment,
    })),
    {
      ...commentsAreaPaginationImported.comments[0],
      replies: createComments(11),
    },
  ],
};

describe('comments', () => {
  describe('view comments', () => {
    before(() => {
      cy.seed({
        users: [user1, user2, user3, user4],
        commentsAreas: [commentsAreaEmpty, commentsAreaOneComment, commentsAreaScore, commentsAreaPagination],
      });
    });

    it('list', () => {
      cy.visitIntegration('test:news1', 'https://page.url');

      cy.contains("Aucun commentaire n'a été publié pour le moment");

      cy.didTrack({ category: 'Extension', action: 'View Integration', name: 'View Integration "test:news1"' });

      cy.visitIntegration('test:news2', 'https://page.url');

      cy.contains('user2');
      cy.contains(/Le \d{2}\.\d{2}\.\d{4} à \d{2}:\d{2}/);

      cy.visitIntegration('test:news3', 'https://page.url');

      cy.getCommentAt(2).within(() => {
        cy.contains('2 réponses').click();
        cy.contains('comment 2.1');
        cy.contains('comment 2.2');
      });

      cy.getCommentAt(5).within(() => {
        cy.contains('1 réponse').click();
        cy.contains('comment 1.1');
      });

      cy.getCommentAt(4).within(() => {
        cy.contains('1 réponse').click();
        cy.contains('comment 2.2.1');
      });

      cy.getCommentAt(2).within(() => {
        cy.contains('2 réponses').click();
      });

      cy.contains('comment 2.1').should('not.be.visible');
      cy.contains('comment 2.2').should('not.be.visible');
      cy.contains('comment 2.2.1').should('not.be.visible');
    });

    it('sort', () => {
      cy.visitIntegration('test:news3', 'https://page.url');

      // SORT ASC
      cy.getCommentAt(0).should('contain', 'comment 4');
      cy.getCommentAt(1).should('contain', 'comment 3');
      cy.getCommentAt(2).should('contain', 'comment 2');
      cy.getCommentAt(3).should('contain', 'comment 1');

      // SORT DESC
      cy.get('[title=Tri]').click();
      cy.contains('Les plus anciens en premier').click();
      cy.fixCI();

      cy.getCommentAt(0).should('contain', 'comment 1');
      cy.getCommentAt(1).should('contain', 'comment 2');
      cy.getCommentAt(2).should('contain', 'comment 3');
      cy.getCommentAt(3).should('contain', 'comment 4');

      // SORT RELEVANCE
      cy.get('[title=Tri]').click();
      cy.contains('Les plus pertinents en premier').click();
      cy.fixCI();

      cy.getCommentAt(0).should('contain', 'comment 2');
      cy.getCommentAt(1).should('contain', 'comment 1');
      cy.getCommentAt(2).should('contain', 'comment 3');
      cy.getCommentAt(3).should('contain', 'comment 4');
    });

    it('search', () => {
      const search = (query) => {
        cy.get('input[name="search"]').clear();
        cy.get('input[name="search"]').type(query);
        cy.fixCI();
        cy.fixCI();
      };

      cy.visitIntegration('test:news3', 'https://page.url');

      search('1 text');
      cy.countComments(4);
      cy.getCommentAt(0).should('contain', 'comment 2.2.1 text');
      cy.getCommentAt(1).should('contain', 'comment 2.1 text');
      cy.getCommentAt(2).should('contain', 'comment 1.1 text');
      cy.getCommentAt(3).should('contain', 'comment 1 text');

      search('1.1 text');
      cy.countComments(1);
      cy.getCommentAt(0).should('contain', 'comment 1.1 text');

      search('3 text');
      cy.countComments(1);
      cy.getCommentAt(0).should('contain', 'comment 3 text');

      search('Gullible');
      cy.contains('Aucun résultat ne correspond à cette recherche');

      search('@user1');
      cy.countComments(3);
      cy.getCommentAt(0).should('contain', 'comment 3 text');
      cy.getCommentAt(1).should('contain', 'comment 2.2.1 text');
      cy.getCommentAt(2).should('contain', 'comment 1 text');
    });

    it('pagination', () => {
      const expectPage = (str) => {
        cy.fixCI();
        cy.get('[role="Numéro de page"]').contains(str);
      };

      cy.visitIntegration('test:news4', 'https://page.url');

      expectPage('1 / 3');
      cy.countComments(10);

      cy.get('[title="Page suivante"]').click();
      expectPage('2 / 3');
      cy.countComments(10);

      cy.get('[title="Page suivante"]').click();
      expectPage('3 / 3');
      cy.countComments(1);

      cy.get('[title="Page précédente"]').click();
      expectPage('2 / 3');

      cy.get('[title="Page précédente"]').click();
      expectPage('1 / 3');

      cy.get('[title="Dernière page"]').click();
      expectPage('3 / 3');

      cy.get('[title="Première page"]').click();
      expectPage('1 / 3');
    });

    it('replies pagination', () => {
      cy.visitIntegration('test:news4', 'https://page.url');

      cy.getCommentAt(0).within(() => {
        cy.contains('11 réponses').click();
        cy.countComments(10);
        cy.contains('1 commentaire restant').click();
        cy.countComments(11);
      });
    });

    it('history', () => {
      cy.visitIntegration('test:news3', 'https://page.url');

      cy.getCommentAt(0).find('[title="Édité"]').should('not.exist');

      cy.visitIntegration('test:news2', 'https://page.url');

      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      cy.getCommentId(0).then((id) => {
        cy.get('[title="Édité"]').click();
        cy.get('@windowOpen').should('be.calledWith', '/integration/comment/' + id + '/history');

        cy.visitHistory(id);

        cy.get('[data-e2e="history-list"]').children().eq(0).contains('text');
        cy.get('[data-e2e="history-list"]').children().eq(1).contains('edit');
      });
    });
  });

  describe('create / edit comments', () => {
    before(() => {
      cy.seed({
        users: [user1, me],
        commentsAreas: [commentsAreaEmpty],
      });
    });

    it('post comment', () => {
      cy.visitIntegration('test:news1', 'https://page.url');

      cy.get('[placeholder="Composez votre message..."]').should('not.exist');

      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news1', 'https://page.url');

      cy.get('.comment-form').within(() => {
        cy.get('button[type="submit"]').should('be.disabled');
        cy.get('[placeholder="Composez votre message..."]').type('Commentaire \n\n * élément1 \n * élément2');
        cy.contains('Aperçu').click();
        cy.get('p').contains('Commentaire');
        cy.get('ul').first().contains('élément1');
        cy.get('ul').children().eq(1).contains('élément2');
        cy.contains('Editer').click();
        cy.get('button[type="submit"]').contains('Envoyer').click();
        cy.get('[placeholder="Composez votre message..."]').should('be.empty');
        cy.didTrack({ category: 'Comment', action: 'Create' });
      });

      cy.getCommentAt(0).within(() => {
        cy.get('button[title="Se désabonner"]').should('exist');
      });
    });

    it('post reply', () => {
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news1', 'https://page.url');

      cy.getCommentAt(0).within(() => {
        cy.contains('Répondre').click();

        cy.get('[role="Fermer le formulaire"]').click();
        cy.get('form.comment-form').should('not.be.visible');

        cy.contains('Répondre').click();

        cy.get('[placeholder="Répondez à myself"]').type('reply');
        cy.get('button[type="submit"]').contains('Envoyer').click();

        cy.get('form.comment-form').should('not.be.visible');

        cy.didTrack({ category: 'Comment', action: 'Create' });
      });

      cy.getComment(2).within(() => {
        cy.contains('reply');
        cy.get('button[title="Se désabonner"]').should('exist');
      });
    });

    it('edit comment', () => {
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news1', 'https://page.url');

      cy.getCommentAt(0).within(() => {
        cy.get('[title="Éditer votre message"]').click();

        cy.get('.comment-form').first().contains('Commentaire').clear().type('edit');
        cy.get('button[type="submit"]').contains('Envoyer').click();

        cy.didTrack({ category: 'Comment', action: 'Edit' });

        cy.get('form').should('not.be.visible');

        cy.contains('edit');
        cy.get('[title="Édité"]');
      });
    });
  });

  describe('reactions', () => {
    before(() => {
      cy.seed({
        users: [user1, me],
        commentsAreas: [commentsAreaWithMyself],
      });
    });

    it('create / update / delete reaction', () => {
      cy.visitIntegration('test:news5', 'https://page.url');
      cy.get('.reaction--approve').should('be.disabled');

      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news5', 'https://page.url');

      // user's own comment
      cy.getCommentAt(0).within(() => {
        cy.get('.reaction--approve').should('be.disabled');
      });

      cy.getCommentAt(1).within(() => {
        // add
        cy.get('.reaction--approve').click();

        cy.didTrack({ category: 'Comment', action: 'Set Reaction', name: 'Set Reaction "approve"' });

        cy.get('.reaction--approve').contains('1');
        cy.get('.reaction--approve').should('have.class', 'user-reaction');
        cy.get('.reaction--refute').contains('0');
        cy.get('.reaction--refute').should('not.have.class', 'user-reaction');
        cy.get('.reaction--skeptic').contains('0');
        cy.get('.reaction--skeptic').should('not.have.class', 'user-reaction');

        // update
        cy.get('.reaction--skeptic').click();

        cy.get('.reaction--approve').contains('0');
        cy.get('.reaction--approve').should('not.have.class', 'user-reaction');
        cy.get('.reaction--refute').contains('0');
        cy.get('.reaction--refute').should('not.have.class', 'user-reaction');
        cy.get('.reaction--skeptic').contains('1');
        cy.get('.reaction--skeptic').should('have.class', 'user-reaction');

        // remove
        cy.get('.reaction--skeptic').click();

        cy.get('.reaction--approve').contains('0');
        cy.get('.reaction--approve').should('not.have.class', 'user-reaction');
        cy.get('.reaction--refute').contains('0');
        cy.get('.reaction--refute').should('not.have.class', 'user-reaction');
        cy.get('.reaction--skeptic').contains('0');
        cy.get('.reaction--skeptic').should('not.have.class', 'user-reaction');
      });
    });
  });

  describe('report', () => {
    before(() => {
      cy.seed({
        users: [user1, me],
        commentsAreas: [commentsAreaWithMyself],
      });
    });

    it('open report popup', () => {
      cy.visitIntegration('test:news5', 'https://page.url');

      cy.getCommentAt(0).within(() => {
        cy.contains('Signaler').should('not.exist');
      });

      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news5', 'https://page.url');

      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      cy.getCommentAt(0).within(() => {
        cy.contains('Signaler').should('not.exist');
      });

      cy.getCommentAt(1).within(() => {
        cy.contains('Signaler').click();
      });

      cy.get('@windowOpen').should('be.calledWith', '/integration/comment/1/report');
    });

    it('report a comment', () => {
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitReport(1);

      cy.contains('Signaler le commentaire de user1');
      cy.contains('text');

      cy.get('[placeholder="Précisez en quelques mots le motif du signalement si nécessaire"]').type('blah');
      cy.get('button[type="button"]').contains('Signaler').click();
      cy.contains('Le commentaire a été signalé, merci pour votre contribution ! 💪');

      cy.didTrack({ category: 'Comment', action: 'Report' });

      cy.reload();

      cy.get('button[type="button"]').contains('Signaler').click();
      cy.contains('Vous avez déjà signalé ce commentaire');
    });
  });

  describe('subscription', () => {
    before(() => {
      cy.seed({
        users: [user1, user2, me],
        commentsAreas: [commentsAreaOneComment],
      });
    });

    it('subscribe', () => {
      cy.visitIntegration('test:news2', 'https://page.url');

      cy.get('[title="S\'abonner"]').should('not.exist');

      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news2', 'https://page.url');

      cy.get('[title="S\'abonner"]').click();
      cy.get('[title="S\'abonner"]').should('not.exist');

      cy.didTrack({
        category: 'Comment',
        action: 'Subscribe',
      });

      cy.logout();
      cy.login({ email: 'user1@domain.tld', password: 'p4ssword' });
      cy.postComment({ commentsAreaId: 1, parentId: 1, text: 'reply' });

      cy.logout();
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.getNotificationsCount().should('equal', 1);
    });

    it('unsubscribe', () => {
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news2', 'https://page.url');

      cy.get('[title="Se désabonner"]').click();
      cy.get('[title="Se désabonner"]').should('not.exist');

      cy.didTrack({
        category: 'Comment',
        action: 'Unsubscribe',
      });

      cy.logout();
      cy.login({ email: 'user1@domain.tld', password: 'p4ssword' });
      cy.postComment({ commentsAreaId: 1, parentId: 1, text: 'reply' });

      cy.logout();
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.getNotificationsCount().should('equal', 1);
    });
  });
});
