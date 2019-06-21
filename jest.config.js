module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  },
  testMatch: [
    "**/tests/**.test.+(ts|js)"
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!node-formatter)"
  ],
  moduleNameMapper: {
    "node-formatter": "<rootDir>/node_modules/node-formatter"
  }
};
