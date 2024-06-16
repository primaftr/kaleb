/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  overrides: [
    {
      files: ['**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
