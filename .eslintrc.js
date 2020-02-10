module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": 0,
    "class-methods-use-this": "off",
    "no-param-reassing": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
  },
}
