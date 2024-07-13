module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    "^.+\\.css$": "jest-css-modules-transform"
  },
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|pdfjs-dist))'],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironmentOptions: {
    nodeOptions: {
      // Suppress all warnings
      NODE_OPTIONS: '--no-warnings'
    }
  }
};