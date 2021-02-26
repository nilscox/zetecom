import { useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { Comment } from 'src/types/Comment';

const reportComment = async (comment?: Comment) => {
  if (!comment) {
    throw new Error('reportComment: comment is undefined');
  }

  await axios.post(`/api/comment/${comment.id}/report`);
};

const CLOSE_AFTER_SUCCESS_TIMEOUT = 3000;

const useReportComment = (comment?: Comment) => {
  const [reported, setReported] = useState(false);

  const { mutate, isLoading: loadingReport } = useMutation(() => reportComment(comment), {
    onSuccess: () => setReported(true),
    onError: (e: AxiosError) => {
      if (e.response?.data.message === 'COMMENT_ALREADY_REPORTED') {
        setReported(true);
      }
    },
  });

  useEffect(() => {
    if (reported) {
      setTimeout(() => window.close(), CLOSE_AFTER_SUCCESS_TIMEOUT);
    }
  }, [reported]);

  return [mutate, { loadingReport, reported }] as const;
};

export default useReportComment;
