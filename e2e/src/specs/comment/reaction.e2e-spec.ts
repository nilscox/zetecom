import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';

import { seed, getComment, login, logout, User } from '../../api';
import { click, expectEvent, visitIntegration, within } from '../../utils';
import { reactions, Reaction, reactionEmoji } from '../../utils/reactions';

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
    const { getByTestId } = within(commentsArea);

    await waitFor(() => expect(commentsArea).to.be.visible);

    expect(getByTestId('reaction-approve')).to.have.attr('disabled');
  });

  it('authenticated as author', async () => {
    await login(user3);
    await visitIntegration(commentsArea3.identifier, window.location.href);

    const commentsArea = await waitFor(() => getCommentAt(0));
    const { getByTestId } = within(commentsArea);

    await waitFor(() => expect(commentsArea).to.be.visible);

    expect(getByTestId('reaction-approve')).to.have.attr('disabled');

    await logout();
  });

  it('add / update / unset reaction', async () => {
    await login(me);
    await visitIntegration(commentsArea3.identifier, window.location.href);

    const commentsArea = await waitFor(() => getCommentAt(0));

    await waitFor(() => expect(commentsArea).to.be.visible);

    const comment = getCommentAt(1);
    const commentId = getCommentId(comment);
    const { getByTestId } = within(comment);

    const like = getByTestId('reaction-like');
    const approve = getByTestId('reaction-approve');
    const think = getByTestId('reaction-think');
    const disagree = getByTestId('reaction-disagree');
    const dontUnderstand = getByTestId('reaction-dontUnderstand');

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

    await expectEvent({ category: 'Comment', action: 'Set Reaction', name: 'Set Reaction "approve"' });
    await expectReactions('approve', makeReactions({ approve: 3 }));

    click(think!);

    await expectEvent({ category: 'Comment', action: 'Set Reaction', name: 'Set Reaction "think"' });
    await expectReactions('think', makeReactions({ approve: 2, think: 1 }));

    click(think!);

    // TODO: Uset Reaction
    await expectEvent({ category: 'Comment', action: 'Set Reaction', name: 'Set Reaction "null"' });
    await expectReactions(null, makeReactions({ approve: 2 }));
  });
});
