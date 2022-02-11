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

[Husky](https://typicode.github.io/husky/#/)

```sh
npx husky install
```

🐶

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

- In rules Section in the Dashboard, you have 2 rules without query conditions.
- You can edit or create one, and personalise the differrent fields:
  - Images (For the background, or for the thumbnails)
  - Link or Text for the buttons
  - Titles and Subtitles
- In the code you have a condition, actually they are called together, but you can keep by type :

  - HomeBannerOne or HomeBannerTwo

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 FacetDisplay</h3>

[Facet Display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/react/)

The ability to control the facets to display and their order works by sending a dedicated.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 💉 InjectedContent</h3>

[Magazine Layout](https://github.com/algolia/magazine-layout)

Thanks to the work from the 'Front End Team', we customized their injected content about 2 rules, on for free returns always display, and the 2nd for 'Nike Products'. All its rules are modifiable in [Dashboard](https://www.algolia.com/apps/853MYZ81KY/rules/flagship_fashion).

  <h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⏰ Debounce</h3>

[Debounce Lodash](https://www.npmjs.com/package/lodash.debounce)

The Utility of this package is to wait before action, for example on the SearchBox, onChange wait some time before send query.
