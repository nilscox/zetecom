import { createInformation } from '../../testing/factories/information.factory';
import { createUser } from '../../testing/factories/user.factory';
import { GraphQLClient } from '../../testing/GraphQLClient';
import { setupE2eTest } from '../../testing/setup-e2e-test';
import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';

import { Comment } from './comment.entity';
import { createComment } from './comment.factory';
import { CommentModule } from './comment.module';

describe('CommentResolver', () => {
  const server = setupE2eTest({
    imports: [CommentModule],
  });

  const graph = new GraphQLClient();

  let information: Information;
  let user: User;

  let comment1: Comment;
  let comment2: Comment;
  let comment3: Comment;
  let comment4: Comment;

  beforeAll(async () => {
    graph.server = server;

    information = await createInformation();
    user = await createUser();
    comment1 = await createComment();
    comment2 = await createComment({ information });
    comment3 = await createComment({ author: user });
    comment4 = await createComment({ information, author: user });
  });

  describe('query comments', () => {

    it('should query the comments list', async () => {
      const commentsQuery = `
        query {
          comments {
            id
          }
        }
      `;

      const { body } = await graph.execute(commentsQuery);

      expect(body).toMatchObject({
        data: {
          comments: [
            { id: comment4.id },
            { id: comment3.id },
            { id: comment2.id },
            { id: comment1.id },
          ],
        },
      });
    });

    it('should query the comments list paginated', async () => {
      const commentsQuery = `
        query {
          comments(limit: 1, offset: 1) {
            id
          }
        }
      `;

      const { body } = await graph.execute(commentsQuery);

      expect(body).toMatchObject({
        data: {
          comments: [
            { id: comment3.id },
          ],
        },
      });
    });

    it('should query the comments list for a specific information', async () => {
      const commentsQuery = `
        query {
          comments(informationId: ${information.id}) {
            id
          }
        }
      `;

      const { body } = await graph.execute(commentsQuery);

      expect(body).toMatchObject({
        data: {
          comments: [
            { id: comment4.id },
            { id: comment2.id },
          ],
        },
      });
    });

    it('should query the comments list for a specific user', async () => {
      const commentsQuery = `
        query {
          comments(authorId: ${user.id}) {
            id
          }
        }
      `;

      const { body } = await graph.execute(commentsQuery);

      expect(body).toMatchObject({
        data: {
          comments: [
            { id: comment4.id },
            { id: comment3.id },
          ],
        },
      });
    });

    it('should query the comments list for a specific information and user', async () => {
      const commentsQuery = `
        query {
          comments(informationId: ${information.id}, authorId: ${user.id}) {
            id
          }
        }
      `;

      const { body } = await graph.execute(commentsQuery);

      expect(body).toMatchObject({
        data: {
          comments: [
            { id: comment4.id },
          ],
        },
      });
    });

  });

});
