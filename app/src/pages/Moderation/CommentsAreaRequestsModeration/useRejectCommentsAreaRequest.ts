import useAxios from 'src/hooks/use-axios';

const useRejectCommentsAreaRequest = (requestId: number) => {
  const [{ loading, status }, reject] = useAxios<{ toto: number }>(
    {
      method: 'POST',
      url: `/api/comments-area/request/${requestId}/reject`,
    },
    { manual: true },
  );

  return {
    loading,
    rejected: status(200),
    reject,
  };
};

export default useRejectCommentsAreaRequest;
