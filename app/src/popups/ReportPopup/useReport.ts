import { useEffect } from 'react';

import useAxios from 'src/hooks/useAxios';
import { Comment } from 'src/types/Comment';

const CLOSE_AFTER_SUCCESS_TIMEOUT = 3000;

const useReport = (comment?: Comment) => {
  const [, { loading, status, error }, onReport] = useAxios<unknown, { message?: string }>(
    {
      method: 'POST',
      url: `/api/comment/${comment?.id}/report`,
    },
    { manual: true },
  );

  const reported = status(200) || (status(400) && error?.response?.data.message === 'COMMENT_ALREADY_REPORTED');

  useEffect(() => {
    if (reported) {
      setTimeout(() => window.close(), CLOSE_AFTER_SUCCESS_TIMEOUT);
    }
  }, [reported]);

  return [{ loading, reported }, onReport] as const;
};

export default useReport;
