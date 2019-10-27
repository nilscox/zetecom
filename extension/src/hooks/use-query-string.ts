import queryString from 'query-string';

const useQueryString = (search: string = window.location.search) => {
  return queryString.parse(search);
};

export default useQueryString;
