import { act, renderHook } from '@testing-library/react-hooks';
import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest';

import useAxios from '../../../../../hooks/use-axios';
import { Comment, ReactionType } from '../../../../../types/Comment';
import useSetReaction from '../useSetReaction';

jest.mock('../../../../../hooks/use-axios');
const mockUseAxios = mocked(useAxios);

const makeComment = (): Comment => ({
  id: 1,
  quote: null,
  text: 'text',
  date: new Date(),
  edited: false,
  repliesCount: 0,
  author: {
    id: 1,
    avatar: null,
    nick: 'author',
  },
  reactionsCount: {
    APPROVE: 1,
    REFUTE: 2,
    SKEPTIC: 3,
  },
  userReaction: null,
  subscribed: false,
  score: 0,
});

describe('useReactions', () => {
  const comment = makeComment();
  const postReaction = jest.fn();
  const status = jest.fn();

  beforeEach(() => {
    mockUseAxios.mockReturnValue([
      {
        data: undefined,
        raw: undefined,
        loading: false,
        error: null,
        response: {} as AxiosResponse,
        status,
      },
      postReaction,
    ]);
  });

  it('should not do anything when the reaction do not change', () => {
    const setComment = jest.fn();
    const targetComment = { ...comment };

    const { result, rerender } = renderHook(() => useSetReaction(targetComment, setComment));

    act(() => {
      result.current(null);
    });

    expect(setComment).not.toHaveBeenCalled();
    expect(postReaction).not.toHaveBeenCalled();

    targetComment.userReaction = ReactionType.APPROVE;
    rerender();

    act(() => {
      result.current(ReactionType.APPROVE);
    });

    expect(setComment).not.toHaveBeenCalled();
    expect(postReaction).not.toHaveBeenCalled();
  });

  it('should call the api to set a reaction', () => {
    const setComment = jest.fn();

    const { result } = renderHook(() => useSetReaction(comment, setComment));

    act(() => {
      result.current(ReactionType.APPROVE);
    });

    expect(postReaction).toHaveBeenCalledWith(
      expect.objectContaining({ data: { commentId: comment.id, type: ReactionType.APPROVE } }),
    );

    expect(setComment).toHaveBeenCalledWith(
      expect.objectContaining({
        userReaction: ReactionType.APPROVE,
        reactionsCount: { APPROVE: 2, REFUTE: 2, SKEPTIC: 3 },
      }),
    );
  });

  it('should call the api to update a reaction', () => {
    const setComment = jest.fn();

    const { result } = renderHook(() => useSetReaction({ ...comment, userReaction: ReactionType.SKEPTIC }, setComment));

    act(() => {
      result.current(ReactionType.REFUTE);
    });

    expect(postReaction).toHaveBeenCalledWith(
      expect.objectContaining({ data: { commentId: comment.id, type: ReactionType.REFUTE } }),
    );

    expect(setComment).toHaveBeenCalledWith(
      expect.objectContaining({
        userReaction: ReactionType.REFUTE,
        reactionsCount: { APPROVE: 1, REFUTE: 3, SKEPTIC: 2 },
      }),
    );
  });

  it('should call the api to unset a reaction', () => {
    const setComment = jest.fn();

    const { result } = renderHook(() => useSetReaction({ ...comment, userReaction: ReactionType.REFUTE }, setComment));

    act(() => {
      result.current(null);
    });

    expect(postReaction).toHaveBeenCalledWith(
      expect.objectContaining({ data: { commentId: comment.id, type: null } }),
    );

    expect(setComment).toHaveBeenCalledWith(
      expect.objectContaining({
        userReaction: null,
        reactionsCount: { APPROVE: 1, REFUTE: 1, SKEPTIC: 3 },
      }),
    );
  });
});
