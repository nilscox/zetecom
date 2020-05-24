const { NODE_ENV } = process.env;

const plugins = () => {
  if (NODE_ENV === 'development') {
    return [
      '@babel/plugin-transform-runtime',
      'react-refresh/babel',
      'istanbul',
    ];
  }

  return [];
};

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: plugins(),
};
