import { createThunk } from '../../../../store/createThunk';

export const reportComment = createThunk(({ commentGateway }, commentId: string, reason: unknown, message?: string) => {
  commentGateway.reportComment(commentId, reason, message);
});
