// eslint-disable-next-line import/no-commonjs
module.exports = {
  extends: ['plugin:prettier/recommended'],

  parser: '@babel/eslint-parser',
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
  },
  plugins: ['react', 'import', 'jsx-a11y', 'react-hooks'], // here we include the plugins as well, this is like new abilities for ESLint
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect', // you have to tell eslint which version React are using, "detect" will say can you just figure out yourself (from package.json)
    },
  },
}
