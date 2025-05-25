export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(groq-sdk)/)'
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  verbose: true
};