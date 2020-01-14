module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'react-hot-loader/babel',
  ],
};
