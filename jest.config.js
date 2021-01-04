module.exports = {
    testEnvironment: 'jsdom',

    collectCoverage: true,
    coverageReporters: ['text'],
    collectCoverageFrom: ['**/*.tsx'],

    transform: {
        '\\.tsx?$': 'ts-jest',
    },

    setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
