/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  packageOptions: {
    // knownEntrypoints: ['chai', 'sinon'],
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
