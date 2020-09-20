const user1 = { nick: 'user1', email: 'user1@domain.tld', password: 'p4ssword' };
const user2 = { nick: 'user2', email: 'user2@domain.tld', password: 'p4ssword' };
const user3 = { nick: 'user3', email: 'user3@domain.tld', password: 'p4ssword' };
const user4 = { nick: 'user4', email: 'user4@domain.tld', password: 'p4ssword' };
const me = { nick: 'myself', email: 'me@domain.tld', password: 'p4ssword' };

const commentsAreaEmpty = {
  identifier: 'test:news1',
  informationTitle: 'News',
  informationUrl: 'https://info.url/1',
  informationAuthor: 'anyone',
  creator: 'user1',
  comments: [],
};

const commentsAreaOneComment = {
  identifier: 'test:news2',
  informationTitle: 'News',
  informationUrl: 'https://info.url/2',
  informationAuthor: 'anyone',
  creator: 'user1',
  comments: [
    {
      author: 'user2',
      reactions: {
        approve: [],
        refute: [],
        skeptic: []
      },
      text: 'edit',
      history: ['text'],
      replies: [],
    },
  ],
};

const commentsArea = {
  identifier: 'test:news3',
  informationTitle: 'News',
  informationUrl: 'https://info.url/3',
  informationAuthor: 'anyone',
  creator: 'user1',
  comments: [

    { // score = 3
      author: "user1",
      reactions: {
        approve: [],
        refute: [],
        skeptic: [],
      },
      text: "comment 1 text",
      history: [],
      replies: [
        { // score = 1
          author: "user2",
          reactions: {
            approve: ["user3"],
            refute: [],
            skeptic: [],
          },
          text: "comment 1.1 text",
          history: [],
          replies: [],
        },
      ],
    },

    { // score = 6
      author: "user2",
      reactions: {
        approve: [],
        refute: [],
        skeptic: [],
      },
      text: "comment 2 text",
      history: [],
      replies: [

        { // score = 0
          author: "user2",
          reactions: {
            approve: [],
            refute: [],
            skeptic: [],
          },
          text: "comment 2.1 text",
          history: [],
          replies: [],
        },

        { // score = 2
          author: "user3",
          reactions: {
            approve: [],
            refute: [],
            skeptic: [],
          },
          text: "comment 2.2 text",
          history: [],
          replies: [

            { // score = 0
              author: "user1",
              reactions: {
                approve: [],
                refute: [],
                skeptic: [],
              },
              text: "comment 2.2.1 text",
              history: [],
              replies: [],
            }

          ],
        },

      ],
    },

    { // score = 2
      author: "user1",
      reactions: {
        approve: ["user2", "user3"],
        refute: [],
        skeptic: [],
      },
      text: "comment 3 text",
      history: [],
      replies: [],
    },

    { // score = 0
      author: "user3",
      reactions: {
        approve: [],
        refute: [],
        skeptic: [],
      },
      text: "comment 4 text",
      history: [],
      replies: [],
    },

  ],
};

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
  identifier: 'test:news4',
  informationTitle: 'News',
  informationUrl: 'https://info.url/4',
  informationAuthor: 'anyone',
  creator: 'user1',
  comments: [
    ...createComments(20),
    {
      author: 'user1',
      reactions: {
        approve: [],
        refute: [],
        skeptic: [],
      },
      text: 'comment',
      history: [],
      replies: createComments(11),
    },
  ],
};

const commentsAreaWithMyself = {
  identifier: 'test:news5',
  informationTitle: 'News',
  informationUrl: 'https://info.url/5',
  informationAuthor: 'anyone',
  creator: 'user1',
  comments: [
    {
      author: 'user1',
      text: 'text',
    },
    {
      author: 'myself',
      text: 'text',
    },
  ],
};

describe('comments', () => {

  describe('view comments', () => {

    before(() => {
      cy.resetdb();
      cy.populatedb({
        users: [user1, user2, user3, user4],
        commentsAreas: [commentsAreaEmpty, commentsAreaOneComment, commentsArea, commentsAreaPagination],
      });
    });

    it('list', () => {
      cy.visitIntegration('test:news1');

      cy.contains("Aucun commentaire n'a été publié pour le moment");

      cy.visitIntegration('test:news2');

      cy.contains('user2');
      cy.contains(/Le \d{2}\.\d{2}\.\d{4} à \d{2}:\d{2}/);

      cy.visitIntegration('test:news3');

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
      cy.visitIntegration('test:news3');

      // SORT ASC
      cy.getCommentAt(0).should('contain', 'comment 4');
      cy.getCommentAt(1).should('contain', 'comment 3');
      cy.getCommentAt(2).should('contain', 'comment 2');
      cy.getCommentAt(3).should('contain', 'comment 1');

      // SORT DESC
      cy.get('[title=Tri]').click();
      cy.contains('Les plus anciens en premier').click();

      cy.getCommentAt(0).should('contain', 'comment 1');
      cy.getCommentAt(1).should('contain', 'comment 2');
      cy.getCommentAt(2).should('contain', 'comment 3');
      cy.getCommentAt(3).should('contain', 'comment 4');

      // SORT RELEVANCE
      cy.get('[title=Tri]').click();
      cy.contains('Les plus pertinents en premier').click();
      cy.wait(500); // fix ci

      cy.getCommentAt(0).should('contain', 'comment 2');
      cy.getCommentAt(1).should('contain', 'comment 1');
      cy.getCommentAt(2).should('contain', 'comment 3');
      cy.getCommentAt(3).should('contain', 'comment 4');
    });

    it('search', () => {
      const debugWait = 500;

      const search = (query) => {
        cy.get('input[name="search"]').clear();
        cy.get('input[name="search"]').type(query);
        cy.wait(debugWait);
      };

      cy.visitIntegration('test:news3');

      search('1');
      cy.countComments(4);
      cy.getCommentAt(0).should('contain', 'comment 2.2.1 text');
      cy.getCommentAt(1).should('contain', 'comment 2.1 text');
      cy.getCommentAt(2).should('contain', 'comment 1.1 text');
      cy.getCommentAt(3).should('contain', 'comment 1 text');

      search('1.1');
      cy.countComments(1);
      cy.getCommentAt(0).should('contain', 'comment 1.1 text');

      search('3');
      cy.countComments(1);
      cy.getCommentAt(0).should('contain', 'comment 3 text');

      search('0');
      cy.contains('Aucun résultat ne correspond à cette recherche');

      search('@user1');
      cy.countComments(3);
      cy.getCommentAt(0).should('contain', 'comment 3 text');
      cy.getCommentAt(1).should('contain', 'comment 2.2.1 text');
      cy.getCommentAt(2).should('contain', 'comment 1 text');
    });

    it('pagination', () => {
      const expectPage = (str) => cy.get('[role="Numéro de page"]').contains(str);

      cy.visitIntegration('test:news4');

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
      cy.visitIntegration('test:news4');

      cy.getCommentAt(0).within(() => {
        cy.contains('11 réponses').click()
        cy.countComments(10);
        cy.contains('1 commentaire restant').click();
        cy.countComments(11);
      });
    });

    it('history', () => {
      cy.visitIntegration('test:news3');

      cy.getCommentAt(0).find('[title="Édité"]').should('not.exist');

      cy.visitIntegration('test:news2');

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

    it('request to open a new comments area', () => {
      cy.visitIntegration('test:request-open');

      cy.contains("L'espace de commentaires n'est pas ouvert sur cette page.");
      cy.contains("Connectez-vous pour demander l'ouverture d'une nouvelle zone de commentaire.");

      cy.login({ email: 'user1@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:request-open');

      cy.contains("L'espace de commentaires n'est pas ouvert sur cette page.");
      cy.contains("Demander l'ouverture").click();

      cy.contains("L'ouverture a bien été prise en compte !");
      cy.contains('Les modérateurs traiteront votre demande au plus vite.');
    });

  });

  describe('create / edit comments', () => {

    before(() => {
      cy.resetdb();
      cy.populatedb({
        users: [user1, me],
        commentsAreas: [commentsAreaEmpty],
      });
    });

    it('post comment', () => {
      cy.visitIntegration('test:news1');

      cy.get('[placeholder="Composez votre message..."]').should('not.exist');

      cy.login({ email: 'me@domain.tld', password: 'p4ssword' })
      cy.visitIntegration('test:news1');

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
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' })
      cy.visitIntegration('test:news1');

      cy.getCommentAt(0).within(() => {
        cy.contains('Répondre').click();

        cy.get('[role="Fermer le formulaire"]').click();
        cy.get('form.comment-form').should('not.be.visible');

        cy.contains('Répondre').click();

        cy.get('[placeholder="Répondez à myself"]').type('reply');
        cy.get('button[type="submit"]').contains('Envoyer').click();

        cy.get('form.comment-form').should('not.be.visible');
      });

      cy.getComment(2).within(() => {
        cy.contains('reply');
        cy.get('button[title="Se désabonner"]').should('exist');
      });
    });

    it('edit comment', () => {
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' })
      cy.visitIntegration('test:news1');

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
      cy.resetdb();
      cy.populatedb({
        users: [user1, me],
        commentsAreas: [commentsAreaWithMyself],
      });
    });

    it('create / update / delete reaction', () => {
      cy.visitIntegration('test:news5');
      cy.get('[title="Approuver"]').should('be.disabled');

      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news5');

      // user's own comment
      cy.getCommentAt(0).within(() => {
        cy.get('[title="Approuver"]').should('be.disabled');
      });

      cy.getCommentAt(1).within(() => {
        // add
        cy.get('[title="Approuver"]').click();

        cy.didTrack({ category: 'Comment', action: 'SetReaction' });

        cy.get('[title="Approuver"]').contains('1');
        cy.get('[title="Approuver"]').should('have.class', 'user-reaction');
        cy.get('[title="Réfuter"]').contains('0');
        cy.get('[title="Réfuter"]').should('not.have.class', 'user-reaction');
        cy.get('[title="Sceptique"]').contains('0');
        cy.get('[title="Sceptique"]').should('not.have.class', 'user-reaction');

        // update
        cy.get('[title="Sceptique"]').click();

        cy.get('[title="Approuver"]').contains('0');
        cy.get('[title="Approuver"]').should('not.have.class', 'user-reaction');
        cy.get('[title="Réfuter"]').contains('0');
        cy.get('[title="Réfuter"]').should('not.have.class', 'user-reaction');
        cy.get('[title="Sceptique"]').contains('1');
        cy.get('[title="Sceptique"]').should('have.class', 'user-reaction');

        // remove
        cy.get('[title="Sceptique"]').click();

        cy.get('[title="Approuver"]').contains('0');
        cy.get('[title="Approuver"]').should('not.have.class', 'user-reaction');
        cy.get('[title="Réfuter"]').contains('0');
        cy.get('[title="Réfuter"]').should('not.have.class', 'user-reaction');
        cy.get('[title="Sceptique"]').contains('0');
        cy.get('[title="Sceptique"]').should('not.have.class', 'user-reaction');
      });

    });

  });

  describe('report', () => {

    before(() => {
      cy.resetdb();
      cy.populatedb({
        users: [user1, me],
        commentsAreas: [commentsAreaWithMyself],
      });
    });

    it('open report popup', () => {
      cy.visitIntegration('test:news5');

      cy.getCommentAt(0).within(() => {
        cy.contains('Signaler').should('not.exist');
      });

      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news5');

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
      cy.contains('Le commentaire a été signalée, merci pour votre contribution ! 💪');

      cy.didTrack({ category: 'Comment', action: 'Report' });

      cy.reload();

      cy.get('button[type="button"]').contains('Signaler').click();
      cy.contains('Vous avez déjà signalé ce commentaire');
    });

  });

  describe('subscription', () => {

    before(() => {
      cy.resetdb();
      cy.populatedb({
        users: [user1, user2, me],
        commentsAreas: [commentsAreaOneComment],
      });
    });

    it('subscribe', () => {
      cy.visitIntegration('test:news2');

      cy.get('[title="S\'abonner"]').should('not.exist');

      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news2');

      cy.get('[title="S\'abonner"]').click();
      cy.get('[title="S\'abonner"]').should('not.exist');

      cy.logout();
      cy.login({ email: 'user1@domain.tld', password: 'p4ssword' });
      cy.postComment({ commentsAreaId: 1, parentId: 1, text: 'reply' });

      cy.logout();
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.getNotificationsCount().should('equal', 1);
    });

    it('unsubscribe', () => {
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.visitIntegration('test:news2');

      cy.get('[title="Se désabonner"]').click();
      cy.get('[title="Se désabonner"]').should('not.exist');

      cy.logout();
      cy.login({ email: 'user1@domain.tld', password: 'p4ssword' });
      cy.postComment({ commentsAreaId: 1, parentId: 1, text: 'reply' });

      cy.logout();
      cy.login({ email: 'me@domain.tld', password: 'p4ssword' });
      cy.getNotificationsCount().should('equal', 1);
    });

  });

});
