export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(ol)/)"
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  rootDir: '.',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
};