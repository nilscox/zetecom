import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';

import { seed, getComment, login, logout, User } from '../../api';
import { click, expectEvent, visitIntegration, within } from '../../utils';
import { reactionEmoji, reactionTitle } from '../../utils/reactions';

import commentsAreas from '../../fixtures/comments-areas.json';
import users from '../../fixtures/users.json';

import { getCommentAt, getCommentId } from './index';

const [, , me, user1, user2, user3] = users as User[];
const [, , commentsArea3] = commentsAreas;

describe('Reaction', () => {
  let iframe: IFrame;

  before('get iframe', function () {
    iframe = this.iframe;
  });

  before('seed', async () => {
    await seed({ users: [user1, user2, user3, me], commentsAreas: [commentsArea3] });
  });

  it('unauthenticated', async () => {
    await visitIntegration(commentsArea3.identifier, window.location.href);

    const commentsArea = await waitFor(() => getCommentAt(0));
    const { getByTitle } = within(commentsArea);

    await waitFor(() => expect(commentsArea).to.be.visible);

    expect(getByTitle(reactionTitle.approve)).to.have.attr('disabled');
  });

  it('authenticated as author', async () => {
    await login(user2);
    await visitIntegration(commentsArea3.identifier, window.location.href);

    const commentsArea = await waitFor(() => getCommentAt(0));
    const { getByTitle } = within(commentsArea);

    await waitFor(() => expect(commentsArea).to.be.visible);

    expect(getByTitle(reactionTitle.approve)).to.have.attr('disabled');

    await logout();
  });

  it('add / update / unset reaction', async () => {
    await login(me);
    await visitIntegration(commentsArea3.identifier, window.location.href);

    const commentsArea = await waitFor(() => getCommentAt(0));

    await waitFor(() => expect(commentsArea).to.be.visible);

    const comment = getCommentAt(2);
    const commentId = getCommentId(comment);
    const { getByTitle } = within(comment);

    const like = getByTitle(reactionTitle.like);
    const approve = getByTitle(reactionTitle.approve);
    const think = getByTitle(reactionTitle.think);
    const disagree = getByTitle(reactionTitle.disagree);
    const dontUnderstand = getByTitle(reactionTitle.dontUnderstand);

    const mapReactions = {
      like,
      approve,
      think,
      disagree,
      dontUnderstand,
    };

    type Reaction = keyof typeof mapReactions;
    const reactions = Object.keys(mapReactions) as Array<Reaction>;

    const makeReactions = (override: Partial<Record<Reaction, number>>) => ({
      ...reactions.reduce((obj, type) => ({ ...obj, [type]: 0 }), {} as Record<Reaction, number>),
      ...override,
    });

    const expectReactions = async (userReaction: Reaction | null, expected: { [key in Reaction]: number }) => {
      for (const reaction of reactions) {
        const reactionElement = mapReactions[reaction];

        expect(reactionElement).to.have.text(reactionEmoji[reaction] + String(expected[reaction]));

        if (reaction === userReaction) {
          expect(reactionElement).to.have.class('user-reaction');
        } else {
          expect(reactionElement).not.to.have.class('user-reaction');
        }
      }

      await waitFor(async () => {
        const comment = await getComment(commentId);

        for (const reaction of reactions) {
          expect(comment).to.have.nested.property(`reactionsCount.${reaction}`, expected[reaction]);
        }
      });
    };

    click(approve!);

    await expectEvent({ category: 'comment', action: 'set reaction', name: 'set reaction approve' });
    await expectReactions('approve', makeReactions({ approve: 3 }));

    click(think!);

    await expectEvent({ category: 'comment', action: 'set reaction', name: 'set reaction think' });
    await expectReactions('think', makeReactions({ approve: 2, think: 1 }));

    click(think!);

    await expectEvent({ category: 'comment', action: 'unset reaction' });
    await expectReactions(null, makeReactions({ approve: 2 }));
  });
});
