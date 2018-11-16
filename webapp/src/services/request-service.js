const API_BASE_URL = process.env.CDV_PUBLIC_URL;

module.exports = async (route, opts = {}, handlers = {}) => {
  opts.headers = opts.headers || {};

  if (typeof opts.body === 'object') {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(API_BASE_URL + route, {
    credentials: 'include',
    ...opts,
  });

  const handler = handlers[res.status] || handlers.default;

  if (handler)
    await handler(res.status !== 204 ? await res.json() : undefined, res);
};
