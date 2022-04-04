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

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Structure</h2>

Index.jsx

- entry point to the application
- renders App.js into #root element in DOM
- #root is defined in index.html

App.jsx

- called by Index.jsx
- wraps child components with key functionality including:
  - [React router](https://reactrouter.com/docs/en/v6/getting-started/overview)
  - [Algolia instantsearch](https://github.com/algolia/react-instantsearch)
  - [Recoil state management](https://recoiljs.org/)
- calls Main.jsx

Main.jsx

- contains static elements like header and footer (found in `./components`)
- contains routes for each page (found in `./pages`)
- wraps pages in AnimatePresence from [Framer Motion](https://www.framer.com/docs/animate-presence/), which helps animate loading of pages
- it loads a single route (page), depending on the current URL

Homepage.jsx

- if federated search is true in configuration, loads federated search
- loads a banners component from `./components`
- maps over carousels from configuration and renders each carousel
- wraps all components in animations from framer-motion

SearchResultsPage.jsx

- called by Main.jsx for route `/search`
- loads components related to results

ProductDetails.jsx

- Display attributes of an individual product
  - Image
  - Brand
  - Name
  - Colour
  - Size
  - Price
- Recommend components
  - Related Products
  - Frequently Bought Together

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Dependencies</h2>

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">💻 State Manager</h3>

[Recoil](https://recoiljs.org/)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🚧Router</h3>

[React Router](https://v5.reactrouter.com/web/guides/quick-start)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🎚 Slider</h3>

[Slider](https://slider-react-component.vercel.app/)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🖲 Personas Select</h3>

[React-Select](https://www.npmjs.com/package/react-select)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🎨 Style</h3>

[SCSS](https://sass-lang.com/)
with
[BEM Naming](https://css-tricks.com/bem-101/)

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Config</h2>

There are two places where application configuration is defined:

- utils/env.js contains the env variables like the algolia app ID, index names etc.

- config/config.js contains layout variables like the refinements, sorts etc.
  - the config is exported via an object which is controlled by a state atom (see state section for more details)

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Instantsearch State</h2>

By default, instantsearch manages its own state, as long as everything is wrapped in the <Instantsearch> component. Therefore generally we do not have direct access to state, it is all managed by IS (instantsearch) even with connected, customised widgets, but we do get access to many props provided by each widget.

However, there can be times when we want to access the inside of the instantsearch directly to manipulate it or do something that IS widgets cannot.

In order to do that, we use [StateResults](https://www.algolia.com/doc/api-reference/widgets/state-results/react/#connector) which can give us access to the internal state. It lives in its own component.

Every time the search results change, we store them in our own internal state as well as letting instantsearch store them in it's state. Our own state for search results lives in `/config/results`.

This means that you should first only use the Instantsearch state if you can and not access our own, but if needed, you can access our own using recoil (see state manager section).

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

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Category Pages</h3>

[Category Pages]

In order to configure Category Pages (Add or Remove) go in config > header.js. From there you can add some link in the Navigation tab

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👩‍💼🧑‍💼 Personas</h3>

[Personalization](https://www.algolia.com/doc/guides/personalization/what-is-personalization/)

The user stories : - Younger male 'Stephen James', likes Basketball and he lives in NYC.
-Likes **Sneakers**, size 24, also likes **tracksuit**
The user stories : 
   - Younger male 'Stephen James', likes Basketball and he lives in NYC.
      -Likes **Sneakers**, size 24, also likes **tracksuit**

   - Older female: 'Elizabeth Aniston', likes fashion and she lives in Paris.
      -Likes **black** dresses, size M, also likes blue jeans

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 💉 Injected Content</h3>

We use the [Magazine Layout](https://github.com/algolia/magazine-layout)

There are two kinds of injected content:

1. Using rules in the main index
2. Using a seperate index

<h4 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">Main Index Rules</h4>

We have two kinds of rules. If you want to trigger these rules for your own demo, please use the following JSON source for the rules which you must add as a consequence (please edit the values as you see fit):
  
1. Free returns (always displayed)
```
{
  "type": "noCta",
  "title": "",
  "image": {
    "desktop_url": "https://res.cloudinary.com/hugo-valla/image/upload/v1641220366/L_ptpbwc.png",
    "mobile_url": "https://api.lorem.space/image/shoes?w-300&h-300"
  },
  "position": 7,
  "isSalesCardDisplay": 6,
  "gridSpanLaptop": 1,
  "gridSpanMobile": 1,
  "size": {
    "width": 3,
    "height": 1
  }
```

2. Sales card ('nike' trigger)
```
{
  "type": "salesCard",
  "title": "Receive an extra 20% off nike items",
  "subtitle": "",
  "coupon": "Code: NIKE20",
  "image": {
    "desktop_url": "https://static.dezeen.com/uploads/2021/03/lil-nas-x-mschf-nike-satan-shoes-blood-pentagram-bible-verse-design-fashion-footwear_dezeen_2364_col_3-scaled.jpg",
    "mobile_url": "https://"
  },
  "position": 3,
  "size": {
    "width": 1,
    "height": 1
  }
}
```

You can see these rules for reference in the Flagship Fashion [Dashboard](https://www.algolia.com/apps/853MYZ81KY/rules/flagship_fashion).

  <h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⏰ Debounce</h3>

[Debounce Lodash](https://www.npmjs.com/package/lodash.debounce)

The Utility of this package is to wait before action, for example on the SearchBox, onChange wait some time before send query.
