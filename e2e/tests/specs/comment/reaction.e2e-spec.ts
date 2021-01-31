import { waitFor } from '@testing-library/dom';
import { expect } from 'chai';
import { IFrame } from 'testea';

import { seed, getComment, login, logout, User } from '../../api';
import { click, expectEvent, visitIntegration } from '../../utils';

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

    await waitFor(() => expect(getCommentAt(0)).to.be.visible);

    expect(iframe.body?.querySelectorAll('.reaction--approve')[0]).to.have.attr('disabled');
  });

  it('authenticated as author', async () => {
    await login(user3);
    await visitIntegration(commentsArea3.identifier, window.location.href);

    await waitFor(() => expect(getCommentAt(0)).to.be.visible);

    expect(iframe.body?.querySelectorAll('.reaction--approve')[0]).to.have.attr('disabled');

    await logout();
  });

  it('add / update / unset reaction', async () => {
    await login(me);
    await visitIntegration(commentsArea3.identifier, window.location.href);

    await waitFor(() => expect(getCommentAt(0)).to.be.visible);

    const comment = getCommentAt(1);
    const commentId = getCommentId(comment);

    // TODO: use labels
    const approve = iframe.body?.querySelectorAll('.reaction--approve')[1];
    const refute = iframe.body?.querySelectorAll('.reaction--refute')[1];
    const skeptic = iframe.body?.querySelectorAll('.reaction--skeptic')[1];

    const mapReactions = { approve, refute, skeptic };

    const reactions = ['approve', 'refute', 'skeptic'] as const;
    type Reaction = typeof reactions[number];

    const expectReactions = async (userReaction: Reaction | null, expected: { [key in Reaction]: number }) => {
      for (const reaction of reactions) {
        const reactionElement = mapReactions[reaction];

        expect(reactionElement).to.have.text(String(expected[reaction]));

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
    await expectReactions('approve', { approve: 3, refute: 0, skeptic: 0 });

    click(skeptic!);

    await expectEvent({ category: 'Comment', action: 'Set Reaction', name: 'Set Reaction "skeptic"' });
    await expectReactions('skeptic', { approve: 2, refute: 0, skeptic: 1 });

    click(skeptic!);

    // TODO: Uset Reaction
    await expectEvent({ category: 'Comment', action: 'Set Reaction', name: 'Set Reaction "null"' });
    await expectReactions(null, { approve: 2, refute: 0, skeptic: 0 });
  });
});
