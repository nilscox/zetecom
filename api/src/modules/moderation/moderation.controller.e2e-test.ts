import { getRepository, Repository } from 'typeorm';

import { createAuthenticatedModerator, createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CommentFactory } from '../comment/comment.factory';
import { CommentModule } from '../comment/comment.module';
import { Report } from '../comment/report/report.entity';
import { ReportFactory } from '../comment/report/report.factory';
import { UserFactory } from '../user/user.factory';
import { UserModule } from '../user/user.module';

import { ModerationModule } from './moderation.module';

describe('moderation', () => {

  const { server, getTestingModule } = setupE2eTest({
    imports: [UserModule, AuthenticationModule, CommentModule, ModerationModule],
  });

  let reportRepository: Repository<Report>;

  let createUser: UserFactory['create'];
  let createComment: CommentFactory['create'];
  let reportComment: ReportFactory['create'];

  const [asUser] = createAuthenticatedUser(server);
  const [asModerator] = createAuthenticatedModerator(server);

  beforeAll(() => {
    const module = getTestingModule();

    const userFactory = module.get<UserFactory>(UserFactory);
    const commentFactory = module.get<CommentFactory>(CommentFactory);
    const reportFactory = module.get<ReportFactory>(ReportFactory);

    createUser = userFactory.create.bind(userFactory);
    createComment = commentFactory.create.bind(commentFactory);
    reportComment = reportFactory.create.bind(reportFactory);

    reportRepository = getRepository(Report);
  });

  it('should list reported comments waiting for review when not a moderator', async () => {
    await asUser.get('/api/moderation/reports').expect(403);
  });

  it('should list reported comments waiting for review', async () => {
    const comment1 = await createComment();
    const user1 = await createUser();
    const report1 = await reportComment({ user: user1, comment: comment1 });

    const comment2 = await createComment();
    const user2 = await createUser();
    const report2 = await reportComment({ user: user2, comment: comment2 });

    const user3 = await createUser();
    const report3 = await reportComment({ user: user3, comment: comment2 });

    const report4 = await reportComment({ user: await createUser(), comment: comment2 });
    await reportRepository.update(report4.id, { waitingForReview: false });

    const report5 = await reportComment({ user: await createUser(), comment: await createComment() });
    await reportRepository.update(report5.id, { waitingForReview: false });

    const { body } = await asModerator
      .get('/api/moderation/reports')
      .expect(200);

    expect(body).toMatchObject({
      total: 2,
      items: [
        {
          id: comment2.id,
          reports: [
            { id: report3.id },
            { id: report2.id },
          ],
        },
        {
          id: comment1.id,
          reports: [
            {
              id: report1.id,
              user: { id: user1.id },
            },
          ],
        },
      ],
    });
  });

});
