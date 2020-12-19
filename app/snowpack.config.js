/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  installOptions: {
    polyfillNode: true,
  },
  devOptions: {
    open: 'none',
    port: 8000,
  },
  buildOptions: {
    clean: true,
    sourceMaps: true,
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
