import useAxios from 'src/hooks/use-axios';

const useCommentsAreaRequest = () => {
  return useAxios(
    {
      method: 'POST',
      url: '/api/comments-area-request',
    },
    { manual: true },
  );
};

export default useCommentsAreaRequest;
