import { setupE2eTest } from '../../testing/setup-e2e-test';
import { Information } from '../information/information.entity';
import { InformationFactory } from '../information/information.factory';
import { User } from '../user/user.entity';
import { UserFactory } from '../user/user.factory';

import { Comment } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { CommentModule } from './comment.module';

describe('CommentResolver', () => {
  const { graph, getModule } = setupE2eTest({
    imports: [CommentModule],
  });

  let information: Information;
  let user: User;

  let comment1: Comment;
  let comment2: Comment;
  let comment3: Comment;
  let comment4: Comment;

  beforeAll(async () => {
    const module = getModule();

    const informationFactory = module.get(InformationFactory);
    const userFactory = module.get(UserFactory);
    const commentFactory = module.get(CommentFactory);

    information = await informationFactory.create();
    user = await userFactory.create();
    comment1 = await commentFactory.create();
    comment2 = await commentFactory.create({ information });
    comment3 = await commentFactory.create({ author: user });
    comment4 = await commentFactory.create({ information, author: user });
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
