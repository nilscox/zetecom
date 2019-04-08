export const getBaseUrl = () => {
  return [
    localStorage.getItem('BASE_URL'),
    process.env.BASE_URL,
  ].filter(u => !!u)[0];
};
