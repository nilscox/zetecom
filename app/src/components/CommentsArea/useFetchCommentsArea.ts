import useAxios from '../../hooks/use-axios';
import { CommentsArea } from '../../types/CommentsArea';

const validateStatus = (status: number) => [200, 404].includes(status);

const useFetchCommentsArea = ({ id, identifier }: { id?: number; identifier?: string }) => {
  const url = `/api/comments-area/${identifier ? `by-identifier/${identifier}` : id}`;
  const result = useAxios({ url, validateStatus }, undefined, CommentsArea);

  const [{ error }] = result;

  if (error) {
    throw error;
  }

  return result;
};

export default useFetchCommentsArea;
