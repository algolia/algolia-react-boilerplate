# React Boilerplate for Custom Demos

[![Deploy To Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/algolia/algolia-react-boilerplate)


- [Get started](#️-get-started)
- [Structure](#️-structure)
- [Features Config](#-features-config)
  - [ Redirects](#--redirects)
  - [ Federated Search](#--federated-search)
  - [ Voice Search](#--voice-search)
  - [ Sorts](#--sorts)
  - [ Carousels](#--carousels)
  - [ Recommend](#--recommend)
  - [ Styling](#--styling)
  - [ Demo Guide](#--demo-guide)
  - [ Network Error Messages](#--network-error-messages)
  - [ Languages](#--languages)
  - [ Banners](#--banners)
  - [ Segments](#--segments)
  - [ Badges](#--badges)
  - [ Facet Display](#--facet-display)
  - [ Category Pages](#--category-pages)
  - [ Collection Pages](#--collection-pages)
  - [ Personas](#--personas)
  - [ Injected Content](#--injected-content)
    - [From Main Index](#from-main-index)
    - [From Seperate Index](#from-seperate-index)
  - [ Icons](#-icons)
- [Dependencies](#️-dependencies)
  - [State Manager](#-state-manager)
  - [Router](#-router)
  - [Slider](#-slider)
  - [Select Menus](#-select-menus)
  - [Style](#-style)
  - [Debounce](#-debounce)
  - [Lazy Loading](#-lazy-loading)
- [Develop on this project](#️-develop-on-this-project)
  - [Before use please install](#-before-use-please-install)

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Get started</h2>

1. Clone this repo under a new name for your own demo.

2. Run `yarn install` in the root directory and `yarn start` to view your project on [http://localhost:3000](http://localhost:3000/)

3. Visit `src/config` and adjust `algoliaEnvConfig` to point to your own app, indices and API keys. If you do not need an index which is present in that file i.e. for articles, please do not remove it, just leave it as is, and you can turn off the relevant feature in the next step.

4. Visit `src/config` and adjust `featuresConfig` to activate/deactivate the features you would like to see in the app.

5. Go through the other files in `src/config` and adjust them according to your own data and requirements, each file describes itself.

6. In `src/config` , pay particular attention to `hitsConfig` as this is where we map your own attribute names to those used in the app. You should never adjust the attributes used in the app itself, only this map.

7. Run and test your app locally, if you have any questions or find any issues please raise an issue with us here https://github.com/algolia/algolia-react-boilerplate/issues.

8. In the `src/scss` folder, adjust any styling you need to based on what you see.

9. Preferrably you can use Netlify to deploy your project, but you can use other deployment tools.

10. Log into Netlify on the Algolia Demos team (again ask #help-demos if you don't have access) and deploy your demo from Github, making sure to password protect it!

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

- Recommend components
  - Trending Products

SearchResultsPage.jsx

- called by Main.jsx for route `/search`
- loads components related to results

- Recommend components
  - Trending Products
  - Trending Facet Values

ProductDetails.jsx

- Display attributes of an individual product
  - Image
  - Brand
  - Name
  - Colour
  - Size
  - Price
    - The price should display correctly according to the currency. Please check the price component file where you can change the decimals as well.

You can define whether you want each attribute shown by adjusting `PDPHitSections` in `/config/hitsConfig`

- Recommend components
  - Related Products
  - Frequently Bought Together

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🗳 Features Config</h2>

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Demo Tour</h3>

This app offers the ability to present a guided tour to the user, highlighting different elements and explaining them. The feature is currently in BETA, and is subject to change. It is on by default; it can be turned off by going to `config/demoTourConfig` and setting the `default` value of `shouldShowDemoTour` to `false`.

You can configure your tour by adjusting the `steps` const, also found in `config/demoTourConfig`.


<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Network Error Messages</h3>

This feature will guide you to see what in the configuration is failing. We render the InstantSearch api errors in a modal.

You can turn this feature off by switching `showNetworkErorrs` default value to `false` in `config/demoGuideConfig`.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Insights</h3>

On the product details page, if you have chosen not to show the size filter, you will see an add to cart button. By clicking this button, an event will be sent to algolia using the Insights API and an alert will be shown to the user.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Redirects</h3>

Redirects are already activated in the application. In order to trigger one, simply create a rule in the dashboard where the consequence is:

```
{
 "isRedirected": true,
 "redirect": "URL TO REDIRECT TO GOES HERE"
}
```

You can find an example redirect rule by searching for `qr-1634733813616` in `rules/example-rules.json`

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Federated Search</h3>

You can turn on federated search in `config/featuresConfig` by setting the `default` value of `shouldHaveFederatedSearch` to true. You can then define which sections are shown by going to `config/federatedConfig`.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Voice Search</h3>

You can turn on voice search by going to `config/featuresConfig` and setting the `default` value of `shouldHaveVoiceSearch` to true.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Sorts</h3>

You can turn on sorts by going to `config/featuresConfig` and setting the `default` value of `shouldHaveSorts` to true.

You can then define your sorts by going to `config/sortByConfig` and adjusting the values in the export called `sortBy`.

To sort by Price ascending or descending please configure the dashboard by creating a new virtual replica and name it exactly like the main index name and add `_price_asc` or `_price_desc`. Please see `config/sortByConfig`

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Carousels</h3>

You can turn on sorts by going to `config/featuresConfig` and setting the `default` value of `shouldHaveCarousels` to true.

Carousels are configured using [rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#using-context). You can configure your carousels by going to `config/carouselConfig` and adjusting the values for each `context`. You must ensure you have a rule in the algolia dashboard for each context, which pins products as this is what powers the carousels.

You can find an example carousel rule by searching for `qr-1651497727816` in `rules/example-rules.json`.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Recommend</h3>

Use FIG to generate the CSVs needed for Recommend, which you can then upload to the dashboard, and following this, enable FBT and Related in the appropriate config of this application.

We wrote a Gdoc to detail how use [FIG](https://github.com/algolia/fake-insights-generator). You can find it [here](https://docs.google.com/document/d/1T8ClZX5I06D-NpV9ZehFCXA_yx095cCFd7P2e3VeM5U/edit?usp=sharing).

Recommend is present in this app on the homepage, search results page, product details page, and also on the NoResultsPage.

Homepage: Trending products
Results Page: Trending products and trending facet values
PDP: Related and FBT
NRP: Related

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Styling</h3>

You can adjust all of the styling of this application by adjusting anything found in the `scss` folder. It is recommended to start with the `mixin` folder.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Demo Guide</h3>

The demo guide is opened by clicking on the three dots in the top right of the application and serves to guide the user through the features available in the app.

It is all defined and adjusted in `config/demoGuideConfig` and is self described.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 🧱 Rules Applied Mode</h3>

In order to turn on this feature, go to `config/demoGuideConfig` and set `shouldShowAppliedRulesSwitcher` to true.

If turn to true you will find this feature in the Demo Guide panel.
Switch on, you will find at the bottom of your screen information about the rules that are applied live while you are browsing the app. Switch off, no information will be disclosed.
You can change description of the rules directly in the dashboard under the rule description input.

You might notice `config/appliedRulesConfig` file, please ignore it.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Languages</h3>

In order to turn on this feature, go to `config/featuresConfig` and set `shouldHaveLanguages` to true.

Use it by making sure you have an index per language, and that the attribute names are always in the default language, but the values change in each index according to the local language.

Then, go to `config/languagesConfig` and adjust each export to what you need. Specifically, in `languageSwitchConfig` you must make sure each node has an `index` defined, and this index will be used when that language is selected.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Banners</h3>

https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/add-banners/

There are two types of banners in this demo - Homepage banners and Search Result Page banners. Check out the existing examples on the flagship fashion index to see some examples.

How Configure it 👇

- In rules Section in the Dashboard, you have 2 'HomeBanner' rules without query conditions.
- You can edit or duplicate one of these, and personalise the differrent fields:
  - Images (For the background, or for the thumbnails)
  - Link or Text for the buttons
  - Titles and Subtitles
- In the code you have a condition, actually they are called together, but you can keep by type :

  - HomeBannerOne or HomeBannerTwo

- The Search Result Page banners are generally set to queries (eg 'shoes'). It'll contain:
  - type: set this to "bannersrp"
  - title
  - banner: this is an image url

You can find an example of a bannersrp rule by searching for `qr-1634719042792` in `rules/example-rules.json`.

You can find an example of a homeBannerTwo rule by searching for `qr-1645197289062` in `rules/example-rules.json`.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Segments</h3>

You can add segments to the application to represent algolia being told that the current user has certain characteristics. It is not 1:1 personalisation and would be fed in by an external system such as Dynamic Yield.

These "segments" are sent to Algolia as [optional filters](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/how-to-promote-with-optional-filters/), which are used to boost hits that match those filters.

Use this feature by adjusting `config/segmentConfig` and turn on or off this feature in `config/featuresConfig`.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Badges</h3>

You can dynamically add badges based on any condition for an attribute returned in a hit.

There are two examples already defined in `/config/badgesConfig`, please follow the same example by adjusting that file.

When two triggers are matched, the one found first in the configuration array will be the one which is shown, more than one badge is not currently supported.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Facet Display</h3>

[Facet Display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/react/)

The ability to control the facets which get displayed including their order. When adding your facets inside this app via `config/refinementsConfig`, you _must_ ensure those facets are also added in the dashboard not just in the Facets section, but also in the Facet Display section, otherwise they will not show.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Category Pages</h3>

In order to configure Category Pages, first got to `config/categoryConfig` and edit the value for `categoryPageFilterAttribute`. This represents the attribute you will filter on to create your individual category pages.

Next, go to `config/headerConfig`. From there you can add links in the Navigation tab, if they are a category page, the type must be `filter`, and the value for `filter` must match the value of the category you are filtering on to create the resulting page.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Collection Pages</h3>

In order to configure Collection Pages, go in `config/headerConfig`. From there you can add links to the Navigation tab. Collection pages are powered by rule contexts. In order for this to work, you must set the type to `context` and make sure that you have a rule set up in the Algolia dashboard matching the context trigger which you define as the value of `context`.

You can find an example of a collection page rule by searching for `qr-1651145630794` in `rules/example-rules.json`.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 No Results Page</h3>

To have the best UI, we defined the no results page with 3 parts:

- First we just display the wrong query ex: yellow pant nike with an apologize message.
- Secondly we incorporate the query suggestions to help the customer on navigation behaviour.
- Third we stored, if the person already go on our website, his previous articles see. Them if he types a wrong query, we use Recommend and Related product with his last article seen, to create a carousel.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👩‍💼🧑‍💼 Personas</h3>

[Personalization](https://www.algolia.com/doc/guides/personalization/what-is-personalization/)

To configure personalisation please first make sure you have the Personalization feature enabled on your plan, and that you have the correct strategy created. For example, if you want to boost colour: blue for a persona, you need to make sure that colour is in your strategy as a facet.

Then, you can visit `config/personaConfig` and update the `value`s to match the user tokens you need to send, and update the personalizationFilters array to contain the attributes and values you want to boost for each persona. The `description` will also show up in the demo guide component.

You can also adjust the personalizationImpact number in `config/personaConfig` to control how much personalization applies to the results where personalization is turned on.

Personalization is currently active by default in the search results page, and in the main section (normally products) of the federated search.

The current user stories are:

- Younger male 'Stephen James', likes Basketball and he lives in NYC.
  -Likes **Sneakers**, size 24, also likes **tracksuit**

- Older female: 'Elizabeth Aniston', likes fashion and she lives in Paris.
  -Likes **black** dresses, size M, also likes blue jeans

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 💉 Injected Content</h3>

We use the [Magazine Layout](https://github.com/algolia/magazine-layout)

There are two kinds of injected content:

1. Using rules in the main index
2. Using a seperate index

<h4 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">From Main Index</h4>

We have two kinds of rules. If you want to trigger these rules for your own demo, please use the given JSON source for the rules which you must add as a consequence (please edit the values as you see fit):

1. Free returns (always displayed)

- You can edit the displayed hit by going to `/components/hits/NoCtaCard.js`

You can find an example of this injected content rule by searching for `qr-1644582034227` in `rules/example-rules.json`.

2. Sales card ('nike' trigger)

- You can edit the displayed hit by going to `/components/hits/SalesCard.js`

You can find an example of this injected content rule by searching for `qr-1649055462539` in `rules/example-rules.json`.

<h4 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">From Seperate Index</h4>

- You can edit the displayed hit by going to `/components/hits/InfluencerCard.js`

For this we define a new index in `algoliaEnvConfig.js` called `injectedContentIndex` and if there is a result in this index, we inject it as a result into the Hits.

Here is a sample record structure which is expected for records in the index to inject:

```
{
  "name": "Curry Stephen Under Armour",
  "gender": "Man",
  "influencer": {
    "name": "Stephen Curry",
    "slug": "steph_curry",
    "image": "https://about.underarmour.com/sites/default/files/styles/1600xauto/public/2020-11/SC_Curry%20Brand%20FW20%20%284%29.jpg?itok=Rx555Up8"
  },
  "category": "Shoes",
  "sku": "M0E20000000EL70",
  "objectID": "fab81fae69624_dashboard_generated_id"
}
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> Icons</h3>

This project comes with fontawesome added by default so you can adjust or add icons at will. It has been installed by being added in `/src/assets/fontawesome/js/all.js` and linked in the head tag of `index.html`

It is then as simple as adding in your HTML the correct fontawesome tags i.e. `<i className="fa-solid fa-shopping-cart"></i>`

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Dependencies</h2>

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🚌 Tour</h3>

[Reactour](https://reactour.js.org/)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">💻 State Manager</h3>

[Recoil](https://recoiljs.org/)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🚧 Router</h3>

[React Router](https://v5.reactrouter.com/web/guides/quick-start)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🎚 Slider</h3>

[Slider](https://slider-react-component.vercel.app/)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🖲 Select Menus</h3>

[React-Select](https://www.npmjs.com/package/react-select)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🎨 Style</h3>

[SCSS](https://sass-lang.com/)
with
[BEM Naming](https://css-tricks.com/bem-101/)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⏰ Debounce</h3>

[Debounce Lodash](https://www.npmjs.com/package/lodash.debounce)

The Utility of this package is to wait before action, for example on the SearchBox, onChange wait some time before send query.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⏰ Lazy Loading</h3>

We use the React library Suspense and lazy to load components when needed, and a wrapper called lazily because the default react library doesn't support named exports.

- https://reactjs.org/docs/code-splitting.html#reactlazy
- https://www.npmjs.com/package/react-lazily

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⌨️ Develop on this project</h2>

To run this project locally, install the dependencies and run the local server:

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">👊 Before use please install</h3>

[GitFlow](https://danielkummer.github.io/git-flow-cheatsheet/)

On Mac 👇

```sh
brew install git-flow-avh
git flow init
```

[Husky](https://typicode.github.io/husky/#/) 🐶

```sh
npx husky install
```
