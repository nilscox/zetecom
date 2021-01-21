/** @type {import("snowpack").SnowpackUserConfig } */

const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
  packageOptions: {
    polyfillNode: true,
    rollup: {
      plugins: [require('rollup-plugin-pnp-resolve')()],
    },
  },
  devOptions: {
    open: 'none',
    port: 8000,
  },
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  buildOptions: {
    // clean: true,
    sourcemap: true,
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: config => {
          config.resolve = { plugins: [PnpWebpackPlugin] };
          config.resolveLoader = { plugins: [PnpWebpackPlugin.moduleLoader(module)] };
          return config;
        },
      },
    ],
  ],
  mount: {
    public: { url: '/', static: true },
    src: '/dist',
  },
  alias: {
    src: './src',
  },
  // optimize: {
  //   bundle: true,
  //   minify: true,
  //   target: 'es2020',
  // },
};
