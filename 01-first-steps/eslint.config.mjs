import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
    rules: {
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'comma-dangle': [2, 'always-multiline'],
      'prettier/prettier': 'error',
    },
  },
  // {
  //   files: ["**/*.{jsx,tsx}"],
  //   languageOptions: { globals: globals.browser },
  //   rules: {
  //     quotes: ["error", "double", { avoidEscape: true }],
  //     "jsx-quotes": ["error", "prefer-double"],
  //   },
  // },
  tseslint.configs.recommended,
  'plugin:prettier/recommended',
])
