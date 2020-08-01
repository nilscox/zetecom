process.env.TZ = 'UTC';

module.exports = {
  verbose: true,
  notify: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  testEnvironment: 'node',
  testMatch: ['**/*.e2e-test.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    // 'src/(.*)': '<rootDir>/$1',
    'Common/(.*)': '<rootDir>/common/$1',
  },
  // reporters: [
  //   'default',
  //   ['./node_modules/jest-html-reporter', {
  //     pageTitle: 'Jest - API e2e',
  //   }],
  // ],
};
