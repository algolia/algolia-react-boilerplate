# React Boilerplate for Demo Engineer

![Algolia](https://assets.codepen.io/707316/internal/avatars/users/default.png?fit=crop&format=auto&height=256&version=5&width=256)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">✍️ V2</h3>

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Get started</h2>

To run this project locally, install the dependencies and run the local server:

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">👊 Before use please install</h3>

[GitFlow](https://danielkummer.github.io/git-flow-cheatsheet/)

On Mac 👇

```sh
brew install git-flow-avh
git flow init
```

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Dependencies</h2>

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">💻 State Manager</h3>

[Recoil](https://recoiljs.org/)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🚧Router</h3>

[React Router](https://v5.reactrouter.com/web/guides/quick-start)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🎨 Style</h3>

[SCSS](https://sass-lang.com/)
with
[BEM Naming](https://css-tricks.com/bem-101/)

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Config</h2>

There are two places where application configuration is defined:

- utils/env.js contains the env variables like the algolia app ID, index names etc.

- config/config.js contains layout variables like the refinements, sorts etc.
  - the config is exported via an object which is controlled by a state atom (see state section for more details)

  <h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⏰ Debounce</h3>

[Debounce Lodash](https://www.npmjs.com/package/lodash.debounce)

The Utility of this package is to wait before action, for example on the SearchBox, onChange wait some time before send query.

