import { getRepository, Repository } from 'typeorm';

import { createAuthenticatedModerator, createAuthenticatedUser, setupE2eTest } from '../../testing/setup-e2e-test';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Comment } from '../comment/comment.entity';
import { CommentFactory } from '../comment/comment.factory';
import { CommentModule } from '../comment/comment.module';
import { Report, ReportModerationAction } from '../comment/report/report.entity';
import { ReportFactory } from '../comment/report/report.factory';
import { UserFactory } from '../user/user.factory';
import { UserModule } from '../user/user.module';

import { ModerationModule } from './moderation.module';

describe('moderation', () => {
  const { server } = setupE2eTest({
    imports: [UserModule, AuthenticationModule, CommentModule, ModerationModule],
  });

  let commentRepository: Repository<Comment>;
  let reportRepository: Repository<Report>;

  const userFactor = new UserFactory();
  const commentFactory = new CommentFactory();
  const reportFactory = new ReportFactory();

  const [asUser] = createAuthenticatedUser(server);
  const [asModerator, moderator] = createAuthenticatedModerator(server);

  beforeAll(() => {
    commentRepository = getRepository(Comment);
    reportRepository = getRepository(Report);
  });

  describe('list reports', () => {
    it('should not list reports when not a moderator', async () => {
      await asUser.get('/api/moderation/reports').expect(403);
    });

    it('should list reports waiting for an action', async () => {
      const comment1 = await commentFactory.create();
      const user1 = await userFactor.create();
      const report1 = await reportFactory.create({ reportedBy: user1, comment: comment1 });

      const comment2 = await commentFactory.create();
      const user2 = await userFactor.create();
      const report2 = await reportFactory.create({ reportedBy: user2, comment: comment2 });

      const user3 = await userFactor.create();
      const report3 = await reportFactory.create({ reportedBy: user3, comment: comment2 });

      const report4 = await reportFactory.create({ reportedBy: await userFactor.create(), comment: comment2 });
      await reportFactory.markAsModerated(report4, moderator, ReportModerationAction.IGNORED);

      const report5 = await reportFactory.create({
        reportedBy: await userFactor.create(),
        comment: await commentFactory.create(),
      });
      await reportFactory.markAsModerated(report5, moderator, ReportModerationAction.IGNORED);

      const { body } = await asModerator.get('/api/moderation/reports').expect(200);

      expect(body).toMatchObject({
        total: 2,
        items: [
          {
            id: comment2.id,
            reports: [{ id: report3.id }, { id: report2.id }],
          },
          {
            id: comment1.id,
            reports: [
              {
                id: report1.id,
                reportedBy: { id: user1.id },
              },
            ],
          },
        ],
      });
    });
  });

  describe('ignore reported comment', () => {
    it('should not ignore reports when not a moderator', async () => {
      const comment = await commentFactory.create();
      await reportFactory.create({ reportedBy: await userFactor.create(), comment });

      await asUser.put('/api/moderation/ignore-reports').send({ commentId: comment.id }).expect(403);
    });

    it('should ignore reports', async () => {
      const comment = await commentFactory.create();
      const report1 = await reportFactory.create({ reportedBy: await userFactor.create(), comment });
      const report2 = await reportFactory.create({ reportedBy: await userFactor.create(), comment });

      await asModerator.put('/api/moderation/ignore-reports').send({ commentId: comment.id }).expect(204);

      const [reportDb1, reportDb2] = await reportRepository.findByIds([report1.id, report2.id]);

      expect(reportDb1).toMatchObject({
        moderationAction: ReportModerationAction.IGNORED,
        moderatedBy: expect.objectContaining({ id: moderator.id }),
      });

      expect(reportDb2).toMatchObject({
        moderationAction: ReportModerationAction.IGNORED,
        moderatedBy: expect.objectContaining({ id: moderator.id }),
      });
    });
  });

  describe('delete reported comment', () => {
    it('should not delete a comment when not a moderator', async () => {
      const comment = await commentFactory.create();
      await reportFactory.create({ reportedBy: await userFactor.create(), comment });

      await asUser.put('/api/moderation/delete-comment').send({ commentId: comment.id }).expect(403);
    });

    it('should delete a comment', async () => {
      const comment = await commentFactory.create();
      const report1 = await reportFactory.create({ reportedBy: await userFactor.create(), comment });
      const report2 = await reportFactory.create({ reportedBy: await userFactor.create(), comment });

      await asModerator.put('/api/moderation/delete-comment').send({ commentId: comment.id }).expect(204);

      const [reportDb1, reportDb2] = await reportRepository.findByIds([report1.id, report2.id]);

      expect(reportDb1).toMatchObject({
        moderationAction: ReportModerationAction.DELETED,
        moderatedBy: expect.objectContaining({ id: moderator.id }),
      });

      expect(reportDb2).toMatchObject({
        moderationAction: ReportModerationAction.DELETED,
        moderatedBy: expect.objectContaining({ id: moderator.id }),
      });

      const commentDb = await commentRepository.findOne({ id: comment.id }, { withDeleted: true });

      expect(commentDb).toMatchObject({ deleted: expect.any(Date) });
    });
  });
});
