import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router';

import useQueryString from 'src/hooks/use-query-string';
import { Comment } from 'src/types/Comment';

const usePin = (comment?: Comment) => {
  const history = useHistory();
  const location = useLocation();

  const { pin, ...query } = useQueryString();
  const pinCommentId = typeof pin === 'string' ? Number(pin) : undefined;
  const isPin = pinCommentId === comment?.id;

  const onPin = () => {
    if (isPin) {
      return onUnpin();
    }

    history.push({ ...location, search: queryString.stringify({ ...query, pin: comment?.id }) });
  };

  const onUnpin = () => {
    history.push({ ...location, search: queryString.stringify(query) });
  };

  return [isPin, { onPin, onUnpin }] as const;
};

export default usePin;
