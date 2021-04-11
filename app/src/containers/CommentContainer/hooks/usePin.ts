import { useHistory, useRouteMatch } from 'react-router';

import useQueryString from 'src/hooks/use-query-string';
import { Comment } from 'src/types/Comment';

const usePin = (comment: Comment) => {
  const history = useHistory();
  const match = useRouteMatch<{ commentsAreaId: string }>('/commentaires/:commentsAreaId');

  const { pin } = useQueryString();
  const pinCommentId = typeof pin === 'string' ? Number(pin) : undefined;
  const isPin = pinCommentId === comment.id;

  const location = isPin
    ? `/commentaires/${match?.params.commentsAreaId ?? ''}`
    : `/commentaires/${match?.params.commentsAreaId ?? ''}?pin=${comment.id}`;

  const onPin = () => history.push(location);

  return [isPin, onPin] as const;
};

export default usePin;
