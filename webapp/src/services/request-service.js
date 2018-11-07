module.exports = async (route, opts = {}, handlers = {}) => {
  opts.headers = opts.headers || {};

  if (typeof opts.body === 'object') {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch('http://localhost:4242' + route, {
    credentials: 'include',
    ...opts,
  });

  const handler = handlers[res.status] || handlers.default;

  if (handler)
    await handler(res.status !== 204 ? await res.json() : undefined, res);
};
