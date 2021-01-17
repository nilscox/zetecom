/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  packageOptions: {
    polyfillNode: true,
  },
  devOptions: {
    open: 'none',
    port: 8000,
  },
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  buildOptions: {
    clean: true,
    sourcemap: true,
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    [
      '@snowpack/plugin-webpack',
      {
        sourceMap: true,
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
  // experiments: {
  //   optimize: {
  //     bundle: true,
  //     minify: true,
  //     target: 'es2020',
  //   },
  // },
};
