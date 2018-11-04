module.exports = (route, opts = {}) => {
  opts.headers = opts.headers || {};

  if (typeof opts.body === 'object') {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }

  return fetch('http://localhost:4242' + route, {
    credentials: 'include',
    ...opts,
  });
};
