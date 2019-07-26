module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0
  }
};
