const user1 = { nick: 'user1', email: 'user1@domain.tld', password: 'secure p4ssword' };
const user2 = { nick: 'user2', email: 'user2@domain.tld', password: 'secure p4ssword' };

const information = {
  title: 'News',
  url: 'https://news.fake/article/1',
  creator: 'user1',
  reactions: [],
};

const reaction = {
  "author": "user1",
  "quickReactions": {
    "approve": [],
    "refute": [],
    "skeptic": []
  },
  "text": "reaction 1 text",
  "history": [],
  "replies": [],
};

describe('reactions', () => {

  describe('not authentified', () => {

    it('should display fallback message if comment zone is not enable', () => {
      cy.resetdb();
      cy.visitIntegration('https://news.fake/article/2');

      cy.contains('L\'espace de commentaires n\'est pas activé sur cette page.');
    });

    it('should display no reaction message', () => {
      const data = {
        users: [user1],
        informations: [information],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.visitIntegration('https://news.fake/article/1');

      cy.contains('Aucune réaction n\'a été publiée pour le moment.');
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
      cy.visitIntegration('https://news.fake/article/1');

      cy.getReaction(1).contains('edited 1 text');
      cy.getReaction(1).contains('user1');
      cy.getReaction(1).find('img[src="/assets/images/default-avatar.png"]');
      cy.getReaction(1).find('[title="Édité"]');
      cy.get('[title="Approuver"]').contains('1');
    });

    it('should view replies', () => {
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
      cy.visitIntegration('https://news.fake/article/1');

      cy.getReaction(1).contains('reaction 1 text');
      cy.getReaction(1).contains('2 réponses').click();

      cy.contains('reaction 1.1 text');
      cy.contains('reaction 1.2 text');

      cy.getReaction(3).contains('1 réponse').click();

      cy.getReaction(4).contains('reaction 1.2.1 text');

      cy.getReaction(1).contains('2 réponses').click();
      cy.get('#reactions-list-1').children().should('have.length', 2);

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

      cy.visitIntegration('https://news.fake/article/1');

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

      cy.visitIntegration('https://news.fake/article/1');
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      cy.get('[title="Édité"]').click();
      cy.get('@windowOpen').should('be.calledWith', 'http://localhost:8000/integration/reaction/1/history');
    });

    it('should display reaction history', () => {
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

  describe('authentified', () => {

    it('should add a reaction', () => {
      const data = {
        users: [user1],
        informations: [information],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('https://news.fake/article/1');

      cy.get('button[type="submit"]').should('be.disabled');

      cy.get('[placeholder="Composez votre message..."]').type('Réaction depuis le test \n\n * élément1 \n * élément2');
      cy.get('.reaction-form').contains('Aperçu').click();
      cy.get('.reaction-form').get('p').contains('Réaction depuis le test');
      cy.get('.reaction-form').get('ul').first().contains('élément1');
      cy.get('.reaction-form').get('ul').children().eq(1).contains('élément2');
      cy.get('.reaction-form').contains('Editer').click();
      cy.get('button[type="submit"]').contains('Envoyer').click();

      cy.get('[placeholder="Composez votre message..."]').children().should('have.length', 0);
      cy.getReaction(1).get('p').contains('Réaction depuis le test');
      cy.getReaction(1).get('ul').first().contains('élément1');
      cy.getReaction(1).get('ul').children().eq(1).contains('élément2');
    });

    it('should add a replie', () => {
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
      cy.visitIntegration('https://news.fake/article/1');

      cy.getReaction(1).contains('Répondre').click();
      cy.getReaction(1).siblings().find('span').contains('×').click();
      cy.getReaction(1).siblings().find('form.reaction-form').should('not.be.visible');

      cy.getReaction(1).contains('Répondre').click();
      cy.getReaction(1).siblings().find('[placeholder="Répondez à user1"]').type('Réponse depuis le test');
      cy.getReaction(1).siblings().find('button[type="submit"]').contains('Envoyer').click();

      cy.getReaction(1).siblings().find('form.reaction-form').should('not.be.visible');

      cy.getReaction(2).contains('Réponse depuis le test');
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
      cy.visitIntegration('https://news.fake/article/1');

      cy.getReaction(2).contains('✎').should('not.exist');

      cy.getReaction(1).contains('✎').click();
      cy.getReaction(1).should('not.exist');
      cy.get('#reaction-1-form').contains('reaction 1 text').clear().type('edited 1 text');
      cy.get('#reaction-1-form').find('button[type="submit"]').contains('Envoyer').click();

      cy.get('#reaction-1-form').should('not.exist');
      cy.getReaction(1).contains('edited 1 text');
      cy.getReaction(1).find('[title="Édité"]');
    });

    it('should add a quick reaction', () => {
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
      cy.visitIntegration('https://news.fake/article/1');

      cy.getReaction(1).within(() => {
        cy.get('[title="Approuver"]').should('be.disabled');
      });
      cy.getReaction(2).within(() => {
        cy.get('[title="Approuver"]').click();
        cy.get('[title="Approuver"]').contains('1');
        cy.get('[title="Approuver"]').children().first().should('have.css', 'background-color', 'rgb(255, 238, 170)');
      });
    });

    it('should remove a quick reaction', () => {
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
              },
            ],
          },
        ],
      };

      cy.resetdb();
      cy.populatedb(data);
      cy.login({ email: 'user2@domain.tld', password: 'secure p4ssword' });
      cy.visitIntegration('https://news.fake/article/1');

      cy.getReaction(1).within(() => {
        cy.get('[title="Approuver"]').children().first().should('have.css', 'background-color', 'rgb(255, 238, 170)');
        cy.get('[title="Approuver"]').click();
        cy.get('[title="Approuver"]').contains('0');
        cy.get('[title="Approuver"]').children().first().should('not.have.css', 'background-color', 'rgb(255, 238, 170)');
      });
    });

    it('should open report reaction popup', () => {
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
      cy.visitIntegration('https://news.fake/article/1');
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      cy.getReaction(1).within(() => {
        cy.get('button').contains('Signaler').should('not.exist');
      });
      cy.getReaction(2).within(() => {
        cy.get('button').contains('Signaler').click();
      });

      cy.get('@windowOpen').should('be.calledWith', 'http://localhost:8000/integration/reaction/2/report');
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

  });

});
