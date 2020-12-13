import useAxios from 'src/hooks/use-axios';

import { CommentsArea } from '../../../types/CommentsArea';

const useCreateCommentsArea = () => {
  return useAxios(
    {
      method: 'POST',
      url: '/api/comments-area',
    },
    { manual: true },
    CommentsArea,
  );
};

export default useCreateCommentsArea;
