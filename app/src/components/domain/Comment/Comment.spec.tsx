/* eslint-disable max-lines */
jest.mock('../../layout/Collapse/Collapse');

import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ReactionType } from 'src/components/domain/Comment/CommentFooter/Reactions/ReactionType';
import makeComment from 'src/test/makeComment';
import makeUser from 'src/test/makeUser';
import theme from 'src/theme';
import { Comment as CommentType } from 'src/types/Comment';

import Comment, { CommentProps } from './Comment';

const user = makeUser();
const comment = makeComment();

const noop = () => {};

const props: CommentProps = {
  user,
  comment,
  repliesLoading: false,
  submittingEdition: false,
  submittingReply: false,
  onEdit: noop,
  onReport: noop,
  onUserReactionChange: noop,
  onToggleSubscription: noop,
  onReply: noop,
  fetchReplies: noop,
  getReplies: () => [],
};

const Test: React.FC<Partial<CommentProps>> = override => (
  <ThemeProvider theme={theme}>
    <Comment {...props} {...override} />
  </ThemeProvider>
);

describe('Comment', () => {
  describe('edition', () => {
    it('switch to edition mode', () => {
      const formTestId = 'comment-edition-form-' + comment.id;

      render(<Test />);

      expect(screen.queryByTestId(formTestId)).toBeNull();

      act(() => userEvent.click(screen.getByTitle('Éditer')));

      expect(screen.queryByTestId(formTestId)).not.toBeNull();
      expect(screen.queryByTitle('Éditer')).toBeNull();

      act(() => userEvent.click(screen.getByTitle("Fermer le formulaire d'édition")));

      expect(screen.queryByTestId(formTestId)).toBeNull();
      expect(screen.queryByTitle('Éditer')).not.toBeNull();
    });

    it('edit a comment', async () => {
      const onEdit = jest.fn();

      render(<Test onEdit={onEdit} />);

      act(() => userEvent.click(screen.getByTitle('Éditer')));

      await act(async () => {
        const textArea = screen.getByPlaceholderText('Éditez votre message...');

        userEvent.clear(textArea);
        await userEvent.type(textArea, 'Some message', { delay: 1 });
      });

      act(() => userEvent.click(screen.getByText('Envoyer')));

      expect(onEdit).toHaveBeenCalledWith(comment.id, 'Some message');
    });
  });

  describe('reply', () => {
    it('open the reply form', () => {
      const formTestId = 'comment-reply-form-' + comment.id;

      render(<Test />);

      expect(screen.queryByTestId(formTestId)).not.toBeVisible();

      act(() => userEvent.click(screen.getByRole('button', { name: `Répondre à ${comment.author.nick}` })));

      expect(screen.queryByTestId(formTestId)).toBeVisible();

      act(() => userEvent.click(screen.getByTitle('Fermer le formulaire de réponse')));

      expect(screen.queryByTestId(formTestId)).not.toBeVisible();
    });

    it('reply to a comment', async () => {
      const nick = comment.author.nick;
      const onReply = jest.fn();

      render(<Test onReply={onReply} />);

      act(() => userEvent.click(screen.getByTitle(`Répondre à ${nick}`)));

      await act(async () => {
        await userEvent.type(screen.getByPlaceholderText(`Répondez à ${nick}...`), 'Some reply', { delay: 1 });
        userEvent.click(screen.getByText('Envoyer'));
      });

      expect(onReply).toHaveBeenCalledWith(comment.id, 'Some reply');
    });
  });

  describe('replies', () => {
    it('fetch the replies', () => {
      const comment: CommentType = { ...props.comment, repliesCount: 2 };
      const fetchReplies = jest.fn();

      render(<Test comment={comment} fetchReplies={fetchReplies} />);

      act(() => userEvent.click(screen.getByRole('button', { name: 'Voir les réponses' })));

      expect(fetchReplies).toHaveBeenCalledWith(comment.id);
    });

    it('display the replies', () => {
      const comment: CommentType = { ...props.comment, repliesCount: 2 };
      const replies = [makeComment({ id: 2 }), makeComment({ id: 3 })];

      const getReplies = (commentId: number) => (commentId === props.comment.id ? replies : []);

      render(<Test comment={comment} getReplies={getReplies} />);

      expect(screen.getByTestId('comment-2')).not.toBeVisible();
      expect(screen.getByTestId('comment-3')).not.toBeVisible();

      act(() => userEvent.click(screen.getByText('2 réponses')));

      expect(screen.getByTestId('comment-2')).toBeVisible();
      expect(screen.getByTestId('comment-3')).toBeVisible();

      act(() => userEvent.click(screen.getByText('2 réponses')));

      expect(screen.getByTestId('comment-2')).not.toBeVisible();
      expect(screen.getByTestId('comment-3')).not.toBeVisible();
    });

    it('open the replies when opening the reply form', async () => {
      const comment: CommentType = { ...props.comment, repliesCount: 1 };
      const replies = [makeComment({ id: 2 })];

      const getReplies = (commentId: number) => (commentId === props.comment.id ? replies : []);

      render(<Test comment={comment} getReplies={getReplies} />);

      act(() => userEvent.click(screen.getAllByText('Répondre')[0]));

      await waitFor(() => {
        expect(screen.getByTestId('comment-2')).toBeVisible();
      });

      expect(screen.getAllByText('Répondre')[0]).toBeDisabled();
      expect(screen.getByText('1 réponse')).toBeDisabled();
    });
  });

  describe('report', () => {
    it('report a comment', () => {
      const onReport = jest.fn();

      render(<Test onReport={onReport} />);

      act(() => userEvent.click(screen.getByText('Signaler')));

      expect(onReport).toHaveBeenCalledWith(comment.id);
    });
  });

  describe('reactions', () => {
    it('set a reaction', () => {
      const comment = { ...props.comment };
      const onUserReactionChange = jest.fn();

      const { rerender } = render(<Test comment={comment} onUserReactionChange={onUserReactionChange} />);

      const expectReactionsState = () => {
        for (const type of Object.values(ReactionType)) {
          const reaction = screen.getByTestId(`reaction-${type}`);

          expect(reaction.textContent).toMatch(new RegExp(String(comment.reactionsCount[type]) + '$'));

          if (type === comment.userReaction) {
            expect(reaction).toHaveClass('user-reaction');
          } else {
            expect(reaction).not.toHaveClass('user-reaction');
          }
        }
      };

      expectReactionsState();

      act(() => userEvent.click(screen.getByTestId(`reaction-${ReactionType.think}`)));

      comment.reactionsCount[ReactionType.think]++;
      comment.userReaction = ReactionType.think;

      expect(onUserReactionChange).toHaveBeenCalledWith(comment.id, ReactionType.think);
      onUserReactionChange.mockReset();

      expectReactionsState();

      rerender(<Test comment={comment} onUserReactionChange={onUserReactionChange} />);
      expectReactionsState();

      act(() => userEvent.click(screen.getByTestId(`reaction-${ReactionType.dontUnderstand}`)));

      comment.reactionsCount[ReactionType.think]--;
      comment.reactionsCount[ReactionType.dontUnderstand]++;
      comment.userReaction = ReactionType.dontUnderstand;

      expect(onUserReactionChange).toHaveBeenCalledWith(comment.id, ReactionType.dontUnderstand);
      onUserReactionChange.mockReset();

      expectReactionsState();

      rerender(<Test comment={comment} onUserReactionChange={onUserReactionChange} />);
      expectReactionsState();

      act(() => userEvent.click(screen.getByTestId(`reaction-${ReactionType.dontUnderstand}`)));

      comment.reactionsCount[ReactionType.dontUnderstand]--;
      comment.userReaction = null;

      expect(onUserReactionChange).toHaveBeenCalledWith(comment.id, null);
      onUserReactionChange.mockReset();

      expectReactionsState();

      rerender(<Test comment={comment} onUserReactionChange={onUserReactionChange} />);
      expectReactionsState();
    });
  });

  describe('subscribe', () => {
    it('toggle the subscription to a comment', () => {
      const onToggleSubscription = jest.fn();

      render(<Test onToggleSubscription={onToggleSubscription} />);

      expect(screen.getByTestId('subscribe-button')).not.toHaveClass('active');

      act(() => userEvent.click(screen.getByTestId('subscribe-button')));

      expect(onToggleSubscription).toHaveBeenCalledWith(comment.id);
      expect(screen.getByTestId('subscribe-button')).toHaveClass('active');

      act(() => userEvent.click(screen.getByTestId('subscribe-button')));

      expect(screen.getByTestId('subscribe-button')).not.toHaveClass('active');
      expect(onToggleSubscription).toHaveBeenCalledTimes(2);
    });
  });

  describe('report', () => {
    it('report a comment', () => {
      const onReport = jest.fn();

      render(<Test onReport={onReport} />);

      act(() => userEvent.click(screen.getByText('Signaler')));

      expect(onReport).toHaveBeenCalledWith(comment.id);
    });
  });
});
