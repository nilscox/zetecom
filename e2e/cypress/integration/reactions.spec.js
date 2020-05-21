const user1 = { nick: 'user1', email: 'user1@domain.tld', password: 'secure p4ssword' };
const user2 = { nick: 'user2', email: 'user2@domain.tld', password: 'secure p4ssword' };

const information = {
  title: 'News',
  identifier: 'test:news1',
  creator: 'user1',
  reactions: [],
};

const reaction = {
  author: 'user1',
  quickReactions: {
    approve: [],
    refute: [],
    skeptic: []
  },
  text: 'reaction 1 text',
  history: [],
  replies: [],
};

describe('reactions', () => {

  describe('not authentified', () => {

    it('should display fallback message if comment zone is not enable', () => {
      cy.resetdb();
      cy.visitIntegration('test:news2');

      cy.contains('L\'espace de commentaires n\'est pas activé sur cette page.');
    });

    it('should display no reaction message', () => {
      const data = {
        users: [user1],
        informations: [information],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.visitIntegration('test:news1');

      cy.contains('Aucune réaction n\'a été publiée pour le moment.');
      cy.contains('1 / 1');
    });

    it('should list reactions', () => {
      const data = {
        users: [user1, user2],
        informations: [
          {
            ...information,
            reactions: [
              {
                ...reaction,
                quickReactions: {
                  ...reaction.quickReactions,
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

      cy.getReaction(1).within(() => {
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
        informations: [
          {
            ...information,
            reactions: [
              {
                ...reaction,
                replies: [
                  {
                    ...reaction,
                    text: 'reaction 1.1 text',
                  },
                  {
                    ...reaction,
                    text: 'reaction 1.2 text',
                    replies: [
                      {
                        ...reaction,
                        text: 'reaction 1.2.1 text',
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

      cy.getReaction(1).contains('reaction 1 text');

      cy.getReaction(1).contains('2 réponses').click();

      cy.getReaction(1).within(() => {
        cy.countReactions(2);
        cy.contains('reaction 1.1 text');
        cy.contains('reaction 1.2 text');

        cy.getReaction(3).contains('1 réponse').click();

        cy.getReaction(3).within(() => {
          cy.contains('reaction 1.2.1 text');
        });
      });

      cy.getReaction(1).contains('2 réponses').click();

      cy.getReaction(2).should('not.be.visible');
      cy.getReaction(3).should('not.be.visible');
      cy.getReaction(4).should('not.be.visible');
    });

    it('should not have history', () => {
      const data = {
        users: [user1],
        informations: [
          {
            ...information,
            reactions: [reaction],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.visitIntegration('test:news1');

      cy.getReaction(1).find('[title="Édité"]').should('not.exist');
    });

    it('should open reaction history popup', () => {
      const data = {
        users: [user1],
        informations: [
          {
            ...information,
            reactions: [
              {
                ...reaction,
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
      cy.get('@windowOpen').should('be.calledWith', '/integration/reaction/1/history');
    });

    // TODO: fix test and assert the messages order
    it.skip('should display reaction history', () => {
      const data = {
        users: [user1],
        informations: [
          {
            ...information,
            reactions: [
              {
                ...reaction,
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
      cy.contains('reaction 1 text');
    });

  });

  describe('authenticated', () => {

    it('should add a reaction', () => {
      const data = {
        users: [user1],
        informations: [information],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      cy.get('button[type="submit"]').should('be.disabled');

      cy.get('[placeholder="Composez votre message..."]').type('Réaction depuis le test \n\n * élément1 \n * élément2');
      cy.get('.reaction-form').within(() => {
        cy.contains('Aperçu').click();
        cy.get('p').contains('Réaction depuis le test');
        cy.get('ul').first().contains('élément1');
        cy.get('ul').children().eq(1).contains('élément2');
        cy.contains('Editer').click();
        cy.get('button[type="submit"]').contains('Envoyer').click();
        cy.get('[placeholder="Composez votre message..."]').children().should('have.length', 0);
      });

      cy.getReaction(1).within(() => {
        cy.get('p').contains('Réaction depuis le test');
        cy.get('ul').first().contains('élément1');
        cy.get('ul').children().eq(1).contains('élément2');
        cy.get('button[title="Se désabonner"]').should('exist');
      });
    });

    it('should add a reply', () => {
      const data = {
        users: [user1],
        informations: [
          {
            ...information,
            reactions: [reaction],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      cy.getReaction(1).within(() => {
        cy.contains('Répondre').click();

        cy.get('[role="Fermer le formulaire"]').click();
        cy.get('form.reaction-form').should('not.be.visible');

        cy.contains('Répondre').click();

        cy.get('[placeholder="Répondez à user1"]').type('Réponse depuis le test');
        cy.get('button[type="submit"]').contains('Envoyer').click();

        cy.get('form.reaction-form').should('not.be.visible');
      });

      cy.getReaction(2).within(() => {
        cy.contains('Réponse depuis le test');
        cy.get('button[title="Se désabonner"]').should('exist');
      });
    });

    it('should edit current user reaction', () => {
      const data = {
        users: [user1, user2],
        informations: [
          {
            ...information,
            reactions: [
              reaction,
              {
                ...reaction,
                "author": "user2",
                "text": "reaction 2 text",
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      cy.getReaction(2).within(() => {
        cy.get('[title="Éditer votre message"]').should('not.exist');
      });

      cy.getReaction(1).within(() => {
        cy.get('[title="Éditer votre message"]').click();

        cy.get('.reaction-form').first().contains('reaction 1 text').clear().type('edited 1 text');
        cy.get('button[type="submit"]').contains('Envoyer').click();

        cy.get('form').should('not.be.visible');

        cy.contains('edited 1 text');
        cy.get('[title="Édité"]');
      });
    });

    it('should add / remove / update quick reactions', () => {
      const data = {
        users: [user1, user2],
        informations: [
          {
            ...information,
            reactions: [
              reaction,
              {
                ...reaction,
                "author": "user2",
                "text": "reaction 2 text",
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('test:news1');

      // user's own reaction
      cy.getReaction(1).within(() => {
        cy.get('[title="Approuver"]').should('be.disabled');
      });

      cy.getReaction(2).within(() => {
        // add
        cy.get('[title="Approuver"]').click();

        cy.get('[title="Approuver"]').contains('1');
        cy.get('[title="Approuver"]').should('have.class', 'user-quick-reaction');
        cy.get('[title="Réfuter"]').contains('0');
        cy.get('[title="Réfuter"]').should('not.have.class', 'user-quick-reaction');
        cy.get('[title="Sceptique"]').contains('0');
        cy.get('[title="Sceptique"]').should('not.have.class', 'user-quick-reaction');

        // update
        cy.get('[title="Sceptique"]').click();

        cy.get('[title="Approuver"]').contains('0');
        cy.get('[title="Approuver"]').should('not.have.class', 'user-quick-reaction');
        cy.get('[title="Réfuter"]').contains('0');
        cy.get('[title="Réfuter"]').should('not.have.class', 'user-quick-reaction');
        cy.get('[title="Sceptique"]').contains('1');
        cy.get('[title="Sceptique"]').should('have.class', 'user-quick-reaction');

        // remove
        cy.get('[title="Sceptique"]').click();

        cy.get('[title="Approuver"]').contains('0');
        cy.get('[title="Approuver"]').should('not.have.class', 'user-quick-reaction');
        cy.get('[title="Réfuter"]').contains('0');
        cy.get('[title="Réfuter"]').should('not.have.class', 'user-quick-reaction');
        cy.get('[title="Sceptique"]').contains('0');
        cy.get('[title="Sceptique"]').should('not.have.class', 'user-quick-reaction');
      });
    });

    it('should open the reaction report popup', () => {
      const data = {
        users: [user1, user2],
        informations: [
          {
            ...information,
            reactions: [
              reaction,
              {
                ...reaction,
                author: 'user2',
                text: 'reaction 2 text',
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

      cy.getReaction(1).within(() => {
        cy.contains('Signaler').should('not.exist');
      });

      cy.getReaction(2).within(() => {
        cy.contains('Signaler').click();
      });

      cy.get('@windowOpen').should('be.calledWith', '/integration/reaction/2/report');
    });

    it('should report a reaction', () => {
      const data = {
        users: [user1, user2],
        informations: [
          {
            ...information,
            reactions: [
              {
                ...reaction,
                author: "user2",
                text: 'reaction 2 text',
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitReport(1);

      cy.contains('Signaler la réaction de user2');
      cy.contains('reaction 2 text');

      cy.get('[placeholder="Précisez en quelques mots le motif du signalement si nécessaire..."]').type('Contenu non pertinent');
      cy.get('button[type="button"]').contains('Signaler').click();
      cy.contains('La réaction a été signalée, merci pour votre contribution ! 💪');
    });

    it('should unsubscribe and resubscribe to a reaction', () => {
      const data = {
        users: [user1],
        informations: [
          {
            ...information,
            reactions: [reaction],
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
