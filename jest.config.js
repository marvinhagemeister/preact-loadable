module.exports = {
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.test.json",
    },
  },
  transform: {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
  },
  testRegex: "(/__tests__/.*(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
