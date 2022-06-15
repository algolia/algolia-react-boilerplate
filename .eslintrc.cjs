// eslint-disable-next-line import/no-commonjs
module.exports = {
<<<<<<< HEAD
  // Comment the Algolia EsLint Config too strict
  // extends: ['algolia', 'algolia/react'],
=======
  extends: [
    'algolia',
    'algolia/react',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
>>>>>>> 1f8924f474a3b6d217a12320fda15868c9a9165d
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
};
