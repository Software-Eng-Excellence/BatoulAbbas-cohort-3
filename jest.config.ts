import type { Config } from "jest";     

const config: Config ={
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: '**/*.test.ts',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [ 'src/**/*.ts' ],
  coverageDirectory: 'coverage',

}

export default config;