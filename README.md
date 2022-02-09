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

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🗳 Features Config</h2>

[Banner](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/add-banners/)

How Configure it 👇

- In rules Section on the Dashboard, you have 2 rules without query conditions.
- You can edit or create one, and personalise the diferents fields:
  - Images (For the background, or for the thumbnails)
  - Link or Text for the buttons
  - Titles and Subtitles
-In the code you have a condition, actually they are called together, but you can keep by type :
  - HomeBannerOne or HomeBannerTwo