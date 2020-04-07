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

    cy.get('#reaction-1').contains('edited 1 text');
    cy.get('#reaction-1').contains('user1');
    cy.get('#reaction-1').find('img[src="/assets/images/default-avatar.png"]');
    cy.get('#reaction-1').find('[title="Édité"]');
    cy.get('[data-e2e="qr-approve"]').contains('1');
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

    cy.get('#reaction-1').contains('reaction 1 text');
    cy.get('#reaction-1').contains('2 réponses').click();

    cy.contains('reaction 1.1 text');
    cy.contains('reaction 1.2 text');

    cy.get('#reaction-3').contains('1 réponse').click();

    cy.get('#reaction-4').contains('reaction 1.2.1 text');

    cy.get('#reaction-1').contains('2 réponses').click();

    cy.get('#reaction-2').should('not.be.visible');
    cy.get('#reaction-3').should('not.be.visible');
    cy.get('#reaction-4').should('not.be.visible');
  });

});
