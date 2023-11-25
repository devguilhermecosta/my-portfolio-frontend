import type {Config} from 'jest';

const config: Config = {
   verbose: true,
   testEnvironment: 'jest-environment-jsdom',
   setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
   moduleNameMapper: {
      '\\.css$': '<rootDir>/emptyModule.js',
    },
   collectCoverageFrom: [
      '<rootDir>/src/**/*.{js, ts, jsx, tsx}'
   ],
   resetMocks: false
};

export default config;