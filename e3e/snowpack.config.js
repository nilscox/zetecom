/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  install: ['chai', 'sinon'],
  installOptions: {
    polyfillNode: true,
  },
  mount: {
    public: { url: '/', static: true },
    tests: { url: '/dist' },
  },
  plugins: ['@snowpack/plugin-typescript'],
  devOptions: {
    open: 'none',
    port: 7357,
  },
};
