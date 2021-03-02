/* eslint-disable max-lines */
jest.mock('../../layout/Collapse/Collapse');

import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ReactionType } from 'src/components/domain/Comment/CommentFooter/Reactions/ReactionType';
import makeComment from 'src/test/makeComment';
import makeUser from 'src/test/makeUser';
import theme from 'src/theme';
import { Comment as CommentType } from 'src/types/Comment';

import Comment, { CommentProps } from './Comment';

const CommentContainer: React.FC<{ comment: CommentType }> = ({ comment }) => (
  <div data-testid={`comment-${comment.id}`} />
);

const user = makeUser({ id: 1 });
const author = makeUser({ id: 2 });
const comment = makeComment({ author });

const noop = () => {};

const props: CommentProps = {
  CommentContainer,
  user,
  comment,
  repliesLoading: false,
  submittingEdition: false,
  submittingReply: false,
  onEdit: noop,
  onReport: noop,
  onSetReaction: noop,
  onSetSubscription: noop,
  onReply: noop,
  onViewHistory: noop,
  fetchReplies: noop,
};

const Test: React.FC<Partial<CommentProps>> = override => (
  <ThemeProvider theme={theme}>
    <Comment {...props} {...override} />
  </ThemeProvider>
);

describe('Comment', () => {
  describe('edition', () => {
    const formTestId = 'comment-edition-form';

    it('cannot switch to edition mode when not the author', () => {
      render(<Test user={user} />);

      expect(screen.queryByTitle('Éditer')).toBeNull();
    });

    it('switch to edition mode', () => {
      render(<Test user={author} />);

      expect(screen.queryByTestId(formTestId)).toBeNull();

      act(() => userEvent.click(screen.getByTitle('Éditer votre message')));

      expect(screen.queryByTestId(formTestId)).not.toBeNull();
      expect(screen.queryByTitle('Éditer votre message')).toBeNull();

      act(() => userEvent.click(screen.getByTitle("Fermer le formulaire d'édition")));

      expect(screen.queryByTestId(formTestId)).toBeNull();
      expect(screen.queryByTitle('Éditer votre message')).not.toBeNull();
    });

    it('edit a comment', async () => {
      const onEdit = jest.fn();

      render(<Test user={author} onEdit={onEdit} />);

      act(() => userEvent.click(screen.getByTitle('Éditer votre message')));

      const textArea = screen.getByPlaceholderText('Éditez votre message...');

      await act(async () => {
        userEvent.clear(textArea);
        await userEvent.type(textArea, 'Some message', { delay: 1 });
      });

      act(() => userEvent.click(within(screen.getByTestId(formTestId)).getByText('Envoyer')));

      expect(onEdit).toHaveBeenCalledWith('Some message');
    });
  });

  describe('reply', () => {
    const formTestId = 'comment-reply-form';

    it('cannot reply when unauthenticated', () => {
      render(<Test user={null} />);

      expect(screen.queryByText('Répondre')).toBeNull();
      expect(screen.queryByTestId(formTestId)).toBeNull();
    });

    it('open the reply form', () => {
      render(<Test user={user} />);

      expect(screen.getByTestId(formTestId)).not.toBeVisible();

      act(() => userEvent.click(screen.getByRole('button', { name: `Répondre à ${comment.author.nick}` })));

      expect(screen.getByTestId(formTestId)).toBeVisible();

      act(() => userEvent.click(screen.getByTitle('Fermer le formulaire de réponse')));

      expect(screen.getByTestId(formTestId)).not.toBeVisible();
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

      expect(onReply).toHaveBeenCalledWith('Some reply');
    });
  });

  describe('replies', () => {
    it('fetch the replies', () => {
      const comment: CommentType = { ...props.comment, repliesCount: 2 };
      const fetchReplies = jest.fn();

      render(<Test comment={comment} fetchReplies={fetchReplies} />);

      act(() => userEvent.click(screen.getByRole('button', { name: 'Voir les réponses' })));

      expect(fetchReplies).toHaveBeenCalled();
    });

    it('display the replies', () => {
      const comment: CommentType = { ...props.comment, repliesCount: 2 };
      const replies = [makeComment({ id: 2 }), makeComment({ id: 3 })];

      render(<Test comment={comment} replies={replies} />);

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

      render(<Test comment={comment} replies={replies} />);

      act(() => userEvent.click(screen.getAllByText('Répondre')[0]));

      await waitFor(() => {
        expect(screen.getByTestId('comment-2')).toBeVisible();
      });

      expect(screen.getAllByText('Répondre')[0]).toBeDisabled();
      expect(screen.getByText('1 réponse')).toBeDisabled();
    });
  });

  describe('report', () => {
    it('cannot report when unauthenticated', () => {
      render(<Test user={null} />);

      expect(screen.queryByText('Signaler')).toBeNull();
    });

    it('cannot report own comment', () => {
      render(<Test user={author} />);

      expect(screen.queryByText('Signaler')).toBeNull();
    });

    it('report a comment', () => {
      const onReport = jest.fn();

      render(<Test onReport={onReport} />);

      act(() => userEvent.click(screen.getByText('Signaler')));

      expect(onReport).toHaveBeenCalled();
    });
  });

  describe('reactions', () => {
    it('cannot set a reaction when unauthenticated', () => {
      render(<Test user={null} />);

      expect(screen.queryByTitle("J'aime")).toBeDisabled();
    });

    it('cannot set a reaction own comment', () => {
      render(<Test user={author} />);

      expect(screen.queryByTitle("Je suis plutôt d'accord")).toBeDisabled();
    });

    it('set a reaction', () => {
      const comment = { ...props.comment };
      const onSetReaction = jest.fn();

      render(<Test user={user} comment={comment} onSetReaction={onSetReaction} />);

      act(() => userEvent.click(screen.getByTestId(`reaction-${ReactionType.think}`)));

      expect(onSetReaction).toHaveBeenCalledWith(ReactionType.think);
    });

    it('unset a reaction', () => {
      const comment = { ...props.comment, userReaction: ReactionType.disagree };
      const onSetReaction = jest.fn();

      render(<Test user={user} comment={comment} onSetReaction={onSetReaction} />);

      act(() => userEvent.click(screen.getByTestId(`reaction-${ReactionType.disagree}`)));

      expect(onSetReaction).toHaveBeenCalledWith(null);
    });
  });

  describe('subscribe', () => {
    it('cannot subscribe when unauthenticated', () => {
      render(<Test user={null} />);

      expect(screen.queryByTestId('subscribe-button')).toBeNull();
    });

    it('set the subscription to a comment', () => {
      const onSetSubscription = jest.fn();

      render(<Test user={user} onSetSubscription={onSetSubscription} />);

      expect(screen.getByTestId('subscribe-button')).not.toHaveClass('active');

      act(() => userEvent.click(screen.getByTestId('subscribe-button')));

      expect(onSetSubscription).toHaveBeenCalledWith(true);
    });

    it('set the subscription to a comment', () => {
      const onSetSubscription = jest.fn();

      render(<Test user={user} comment={{ ...comment, subscribed: true }} onSetSubscription={onSetSubscription} />);

      expect(screen.getByTestId('subscribe-button')).toHaveClass('active');

      act(() => userEvent.click(screen.getByTestId('subscribe-button')));

      expect(onSetSubscription).toHaveBeenCalledWith(false);
    });
  });

  describe('view history', () => {
    it('cannot view history when the comment was not edited', () => {
      render(<Test user={null} />);

      expect(screen.queryByTitle("Voir l'historique d'édition")).toBeNull();
    });

    it("toggle view a comment's history", () => {
      const onViewHistory = jest.fn();

      render(<Test comment={{ ...comment, edited: new Date() }} user={user} onViewHistory={onViewHistory} />);

      act(() => userEvent.click(screen.getByTitle("Voir l'historique d'édition")));

      expect(onViewHistory).toHaveBeenCalled();
    });
  });
});
