import { act, renderHook } from '@testing-library/react-hooks';
import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import useAxios from '../../../../../hooks/use-axios';
import makeComment from '../../../../../test/makeComment';
import { ReactionType } from '../../../../../types/Comment';
import useSetReaction from '../useSetReaction';

jest.mock('../../../../../hooks/use-axios');
const mockUseAxios = mocked(useAxios);

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
        reactionsCount: {
          [ReactionType.APPROVE]: 2,
          [ReactionType.REFUTE]: 2,
          [ReactionType.SKEPTIC]: 3,
        },
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
        reactionsCount: {
          [ReactionType.APPROVE]: 1,
          [ReactionType.REFUTE]: 3,
          [ReactionType.SKEPTIC]: 2,
        },
      }),
    );
  });

  it('should call the api to unset a reaction', () => {
    const setComment = jest.fn();

    const { result } = renderHook(() => useSetReaction({ ...comment, userReaction: ReactionType.REFUTE }, setComment));

    act(() => {
      result.current(null);
    });

    expect(postReaction).toHaveBeenCalledWith(expect.objectContaining({ data: { commentId: comment.id, type: null } }));

    expect(setComment).toHaveBeenCalledWith(
      expect.objectContaining({
        userReaction: null,
        reactionsCount: {
          [ReactionType.APPROVE]: 1,
          [ReactionType.REFUTE]: 1,
          [ReactionType.SKEPTIC]: 3,
        },
      }),
    );
  });
});
