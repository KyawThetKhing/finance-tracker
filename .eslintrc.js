module.exports = {
  extends: [
    "eslint:recommended", // Use recommended rules
    "plugin:vue/vue3-recommended", // Vue 3 recommended rules
    "plugin:prettier/recommended", // Integrates Prettier with ESLint
  ],
  parserOptions: {
    parser: "babel-eslint", // To support modern JavaScript syntax
  },
  rules: {
    // Add or override rules here
  },
};
