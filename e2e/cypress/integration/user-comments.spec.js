const user1 = { nick: 'user1', email: 'user1@domain.tld', password: 'secure p4ssword' };

const makeInformation = information => ({
  title: 'News',
  identifier: 'identifier',
  url: 'https://info.url',
  creator: 'user1',
  comments: [],
  ...information,
});

const makeComment = comment => ({
  author: 'user1',
  reactions: {
    approve: [],
    refute: [],
    skeptic: []
  },
  text: 'text',
  history: [],
  replies: [],
  ...comment,
});

describe.skip('user comments', () => {

  describe('authenticated', () => {

    it('should display a user\'s comments', () => {
      const data = {
        users: [user1],
        informations: [
          makeInformation({
            identifier: 'info:1',
            comments: [
              makeComment({ text: 'text 1' }),
              makeComment({ text: 'text 2' }),
            ]
          }),
          makeInformation({
            identifier: 'info:2',
          }),
          makeInformation({
            identifier: 'info:3',
            comments: [
              makeComment({ text: 'text 3' }),
            ]
          }),
        ],
      };

      cy.resetdb();
      cy.populatedb(data);

      cy.login({ email: 'user1@domain.tld', password: 'secure p4ssword' });
      cy.visitApp();

      // to be continued...
    });

  });

});
