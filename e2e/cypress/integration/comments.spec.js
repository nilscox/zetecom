const user1 = { nick: 'user1', email: 'user1@domain.tld', password: 'secure p4ssword' };
const user2 = { nick: 'user2', email: 'user2@domain.tld', password: 'secure p4ssword' };

const commentsArea = {
  identifier: 'test:news1',
  informationTitle: 'News',
  informationUrl: 'https://info.url',
  informationAuthor: 'anyone',
  creator: 'user1',
  comments: [],
};

const comment = {
  author: 'user1',
  reactions: {
    approve: [],
    refute: [],
    skeptic: []
  },
  text: 'comment 1 text',
  history: [],
  replies: [],
};

describe('comments', () => {

  describe('not authentified', () => {

    it('should display no comment message', () => {
      const data = {
        users: [user1],
        commentsAreas: [commentsArea],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.visitIntegration('test:news1');

      cy.contains('Aucun commentaire n\'a été publié pour le moment.');
      cy.contains('1 / 1');

      cy.didTrack({ category: 'Integration', action: 'ViewIntegration', label: 'View integration test:news1' });
    });

    it('should list comments', () => {
      const data = {
        users: [user1, user2],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [
              {
                ...comment,
                reactions: {
                  ...comment.reactions,
                  approve: ['user2'],
                },
                history: ['edited 1 text'],
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.visitIntegration('test:news1');

      cy.getComment(1).within(() => {
        cy.contains('edited 1 text');
        cy.contains('user1');
        // cy.get('img[src="/assets/images/default-avatar.png"]');
        cy.get('[title="Édité"]');
        cy.get('button[type="button"]').contains('Signaler').should('not.exist');
        cy.get('[title="Éditer votre message"]').should('not.exist');
        cy.get('[title="Approuver"]').contains('1');
      });
    });

    it('should view replies', () => {
      // KAMEHAMEHA
      const data = {
        users: [user1],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [
              {
                ...comment,
                replies: [
                  {
                    ...comment,
                    text: 'comment 1.1 text',
                  },
                  {
                    ...comment,
                    text: 'comment 1.2 text',
                    replies: [
                      {
                        ...comment,
                        text: 'comment 1.2.1 text',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.visitIntegration('test:news1');

      cy.getComment(1).contains('comment 1 text');

      cy.getComment(1).contains('2 réponses').click();

      cy.getComment(1).within(() => {
        cy.countComments(2);
        cy.contains('comment 1.1 text');
        cy.contains('comment 1.2 text');

        cy.getComment(3).contains('1 réponse').click();

        cy.getComment(3).within(() => {
          cy.contains('comment 1.2.1 text');
        });
      });

      cy.getComment(1).contains('2 réponses').click();

      cy.getComment(2).should('not.be.visible');
      cy.getComment(3).should('not.be.visible');
      cy.getComment(4).should('not.be.visible');
    });

    it('should not have history', () => {
      const data = {
        users: [user1],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [comment],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.visitIntegration('test:news1');

      cy.getComment(1).find('[title="Édité"]').should('not.exist');
    });

    it('should open comment history popup', () => {
      const data = {
        users: [user1],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [
              {
                ...comment,
                history: ['previous 1 text'],
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.visitIntegration('test:news1');
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      cy.get('[title="Édité"]').click();
      cy.get('@windowOpen').should('be.calledWith', '/integration/comment/1/history');
    });

    it('should display comment history', () => {
      const data = {
        users: [user1],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [
              {
                ...comment,
                history: ['previous 1 text', 'edited 1 text'],
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.visitHistory(1);

      cy.get('[data-e2e="history-list"]').first().contains('edited 1 text');
      cy.contains('previous 1 text');
      cy.contains('comment 1 text');
    });

  });

  describe('authenticated', () => {

    it('should add a comment', () => {
      const data = {
        users: [user1],
        commentsAreas: [commentsArea],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      cy.get('button[type="submit"]').should('be.disabled');

      cy.get('[placeholder="Composez votre message..."]').type('Commentaire \n\n * élément1 \n * élément2');
      cy.get('.comment-form').within(() => {
        cy.contains('Aperçu').click();
        cy.get('p').contains('Commentaire');
        cy.get('ul').first().contains('élément1');
        cy.get('ul').children().eq(1).contains('élément2');
        cy.contains('Editer').click();
        cy.get('button[type="submit"]').contains('Envoyer').click();
        cy.get('[placeholder="Composez votre message..."]').children().should('have.length', 0);
        cy.didTrack({ category: 'Comment', action: 'Create' });
      });

      cy.getComment(1).within(() => {
        cy.get('p').contains('Commentaire');
        cy.get('ul').first().contains('élément1');
        cy.get('ul').children().eq(1).contains('élément2');
        cy.get('button[title="Se désabonner"]').should('exist');
      });
    });

    it('should add a reply', () => {
      const data = {
        users: [user1],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [comment],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      cy.getComment(1).within(() => {
        cy.contains('Répondre').click();

        cy.get('[role="Fermer le formulaire"]').click();
        cy.get('form.comment-form').should('not.be.visible');

        cy.contains('Répondre').click();

        cy.get('[placeholder="Répondez à user1"]').type('Réponse depuis le test');
        cy.get('button[type="submit"]').contains('Envoyer').click();

        cy.get('form.comment-form').should('not.be.visible');
      });

      cy.getComment(2).within(() => {
        cy.contains('Réponse depuis le test');
        cy.get('button[title="Se désabonner"]').should('exist');
      });
    });

    it('should edit a comment', () => {
      const data = {
        users: [user1, user2],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [
              comment,
              {
                ...comment,
                "author": "user2",
                "text": "comment 2 text",
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      cy.getComment(2).within(() => {
        cy.get('[title="Éditer votre message"]').should('not.exist');
      });

      cy.getComment(1).within(() => {
        cy.get('[title="Éditer votre message"]').click();

        cy.get('.comment-form').first().contains('comment 1 text').clear().type('edited 1 text');
        cy.get('button[type="submit"]').contains('Envoyer').click();

        cy.get('form').should('not.be.visible');

        cy.contains('edited 1 text');
        cy.get('[title="Édité"]');

        cy.didTrack({ category: 'Comment', action: 'Edit' });
      });
    });

    it('should add / remove / update reaction', () => {
      const data = {
        users: [user1, user2],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [
              comment,
              {
                ...comment,
                "author": "user2",
                "text": "comment 2 text",
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.visitIntegration('test:news1');
      cy.get('[title="Approuver"]').should('be.disabled');

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      // user's own comment
      cy.getComment(1).within(() => {
        cy.get('[title="Approuver"]').should('be.disabled');
      });

      cy.getComment(2).within(() => {
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

    it('should open the comment report popup', () => {
      const data = {
        users: [user1, user2],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [
              comment,
              {
                ...comment,
                author: 'user2',
                text: 'comment 2 text',
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      cy.getComment(1).within(() => {
        cy.contains('Signaler').should('not.exist');
      });

      cy.getComment(2).within(() => {
        cy.contains('Signaler').click();
      });

      cy.get('@windowOpen').should('be.calledWith', '/integration/comment/2/report');
    });

    it('should report a comment', () => {
      const data = {
        users: [user1, user2],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [
              {
                ...comment,
                author: "user2",
                text: 'comment 2 text',
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitReport(1);

      cy.contains('Signaler le commentaire de user2');
      cy.contains('comment 2 text');

      cy.get('[placeholder="Précisez en quelques mots le motif du signalement si nécessaire"]').type('Contenu non pertinent');
      cy.get('button[type="button"]').contains('Signaler').click();
      cy.contains('Le commentaire a été signalée, merci pour votre contribution ! 💪');

      cy.didTrack({ category: 'Comment', action: 'Report' });

      cy.reload();

      cy.get('button[type="button"]').contains('Signaler').click();
      cy.contains('Vous avez déjà signalé ce commentaire');
    });

    it('should unsubscribe and resubscribe to a comment', () => {
      const data = {
        users: [user1],
        commentsAreas: [
          {
            ...commentsArea,
            comments: [comment],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      cy.get('button[title="Se désabonner"]').click();
      cy.reload();

      cy.get('button[title="S\'abonner"]').should('exist');

      cy.get('button[title="S\'abonner"]').click();
      cy.reload();

      cy.get('button[title="Se désabonner"]').should('exist');
    });

  });

});
