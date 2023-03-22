# React Boilerplate for Custom Demos

[![Deploy To Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/algolia/algolia-react-boilerplate)

- [Get started](#️-get-started)
- [Structure](#️-structure)
- [Features Config](#-features-config)
  - [ Landing Pages](#--landing-pages)
  - [ Predict](#--predict)
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
  - [ Cart](#-cart)
  - [ OKTA](#-okta)
  - [ Query Categorization](#-QueryCategorization)
- [Dependencies](#️-dependencies)
  - [State Manager](#-state-manager)
  - [Router](#-router)
  - [Slider](#-slider)
  - [Select Menus](#-select-menus)
  - [Style](#-style)
  - [Debounce](#-debounce)
  - [Lazy Loading](#-lazy-loading)
  - [React i18](#-Translation)
  - [Before use please install](#-before-use-please-install)
- [How to Contribute](#-how-to-contribute-)
- [Troubleshooting](#️-troubleshooting)

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">Pre-requisites</h2>
Before proceeding, please make sure you have the following:

- Node v16.14+ installed
- pnpm install [here](https://pnpm.io/).

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Get started</h2>

[There are more visual step by step guides here](https://drive.google.com/drive/folders/19Bb4EPT7IMG8ziDUJlu3TG31KanSCJ0T?usp=sharing)

1. Clone this repo under a new name for your own demo. You can use the `main` branch that has some features turned off for easier integration

2. Run `pnpm install` in the root directory and `pnpm start:front` to view your project on [http://localhost:3000](http://localhost:3000/)

3. Visit [src/config](./src/config/) and adjust [algoliaEnvConfig](./src/config/algoliaEnvConfig.js) to point to your own app, indices and API keys. If you do not need an index which is present in that file i.e. for articles, please do not remove it, just leave it as is, and you can turn off the relevant feature in the next step.

4. Visit [src/config](./src/config/) and adjust [featuresConfig](./src/config/featuresConfig.js) to activate/deactivate the features you would like to see in the app.

5. Go through the other files in [src/config](./src/config/) and adjust them according to your own data and requirements, each file describes itself.

6. In [src/config](./src/config/) , pay particular attention to [hitsConfig](./src/config/hitsConfig.js) as this is where we map your own attribute names to those used in the app. You should never adjust the attributes used in the app itself, only this map.

7. Run and test your app locally, if you have any questions or find any issues please raise an issue with us here https://github.com/algolia/algolia-react-boilerplate/issues.

8. In the `src/scss` folder, adjust any styling you need to based on what you see.

9. Preferrably you can use Netlify to deploy your project, but you can use other deployment tools.

10. Log into Netlify on the Algolia Demos team (again ask #help-demos if you don't have access) and deploy your demo from Github, making sure to password protect it!

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Structure</h2>

Index.jsx

- entry point to the application
- wraps child components with Recoil, React Router
  - [React router](https://reactrouter.com/docs/en/v6/getting-started/overview)
  - [Recoil state management](https://recoiljs.org/)
- includes a screen resizer component
- renders App.js into #root element in DOM
- #root is defined in index.html

App.jsx

- called by Index.jsx
- calls Main.jsx
- Wraps child components in Algolia Predict and Algolia Instantsearch
  - [Algolia instantsearch](https://github.com/algolia/react-instantsearch)
  - [Algolia predict](https://www.algolia.com/doc/ui-libraries/predict/api-reference/predict-react/Predict/)

Main.jsx

- contains static elements like header and footer (found in `./components`)
- contains some helper components used to display things like the applied rules
- contains routes for each page (found in `./pages`)
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

You can define whether you want each attribute shown by adjusting `PDPHitSections` in [hitsConfig](./src/config/hitsConfig.js)

- Recommend components
  - Related Products
  - Frequently Bought Together

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🗳 Features Config</h2>

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 📄 Landing Pages</h3>

The search results page has the ability to turn itself into a custom landing page, using Algolia rules. You must first set up a rule with a context trigger, and the JSON response of:

```
{
  "type": "LandingPageHeader",
  "title": "Title of your landing page",
  "text": "Any text description to display on the landing page",
  "banner": "image link to show as the banner",
  "link": "link to visit when the banner is clicked on"
}
```

You can then, on the SRP, add `context=?your-context-trigger-here` to the end of the URL, and this should trigger your landing page header.

You can text an example on the deployed version of this repository by adding `?context=my-landing-page`

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 🔮 Predict</h3>

The app has access to predict through the PredictUserProfileProvider component, found in `./src/components/predict`.

In order for predict to function, it must have a predict App ID, API key and region set in algoliaEnvConfig, found in [algoliaEnvConfig](./src/config/algoliaEnvConfig.js). Please contact Algolia if you are not sure what values they should have.

You must also adjust the values found in [predictConfig](./src/config/predictConfig.js). We store a default value for `predictUserIdAtom` to ensure the app works with the default demo flow, but you should replace it with your own predict user ID for your own demo purposes.

```
// ADJUST YOUR VALUES
export const predictUserProfileAtom = atom({
  key: 'predictUserProfileAtom', // unique ID
  default: { user: 'anonymous' }, // default value
})
export const predictUserIdAtom = atom({
  key: 'predictUserIdAtom', // unique ID
  default: '100023285.994839327', // default value
})
```

You can feel free to keep the default values for all of these atoms and configurations, and follow the default demo flow outlined below (TBD).

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Network Error Messages</h3>

This feature will guide you to see what in the configuration is failing. We render the InstantSearch api errors in a modal.

You can turn this feature off by switching `showNetworkErorrs` default value to `false` in [demoGuideConfig](./src/config/demoGuideConfig.js).

```
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const showNetworkErorrs = atom({
  key: 'showNetworkErorrs',
  default: true,
})
```

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

You can turn on federated search in [featuresConfig](./src/config/featuresConfig.js) by setting the `default` value of `shouldHaveFederatedSearch` to true. You can then define which sections are shown by going to [federatedConfig](./src/config/federatedConfig.js).

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveFederatedSearch = atom({
  key: 'shouldHaveFederatedSearch', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})

//config/federatedConfig
// ADJUST YOUR VALUE
// This const defines the attribute used to show category suggestions if turned on
export const federatedCategoriesAttribute = 'hierarchicalCategories.lvl2'

// This const defines what sections should be shown in federated search or not
// Adjust each value to true or false depending on what you wish to show
// Do not delete anything from this object please.
export const federatedSearchConfig = {
  showRecentSearches: true,
  showQuerySuggestions: true,
  showCategories: true,
  showProducts: true,
  showBlogPosts: true,
  showQueryCat: true,
}

// Change here your probability to show the query category by default prediction score > 60 will be displayed
export const probabilityToShowQueryCat = atom({
  key: 'probabilityToShowQueryCat', // unique ID (with respect to other atoms/selectors)
  default: 0.6, // default value (aka initial value)
})

// Please ignore
export const shouldHaveOpenFederatedSearch = atom({
  key: 'shouldHaveOpenFederatedSearch', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// Please ignore
export const federatedRef = atom({
  key: 'federatedRef', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Voice Search</h3>

You can turn on voice search by going to [featuresConfig](./src/config/featuresConfig.js) and setting the `default` value of `shouldHaveVoiceSearch` to true.

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveVoiceSearch = atom({
  key: 'shouldHaveVoiceSearch',
  default: true,
})
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Sorts</h3>

You can turn on sorts by going to [featuresConfig](./src/config/featuresConfig.js) and setting the `default` value of `shouldHaveSorts` to true.

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveSorts = atom({
  key: 'shouldHaveSorts', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
```

You can then define your sorts by going to [sortByConfig](./src/config/sortByConfig.js) and adjusting the values in the export called `sortBy`.

To sort by Price ascending or descending please configure the dashboard by creating a new virtual replica and name it exactly like the main index name and add `_price_asc` or `_price_desc`. Please see [sortByConfig](./src/config/sortByConfig.js)

```
// config/sortByConfig
// ADJUST YOUR VALUES
// This const defines the indices for sorts, please add or remove from the array as needed
// The values for each index use the prefix of the main index for convenience
export const sortBy = selector({
  key: 'sortBy', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    return {
      value: true,
      labelIndex: [
        { value: get(mainIndex), label: 'All' },
        { value: `${get(mainIndex)}_price_desc`, label: 'Price Desc' },
        { value: `${get(mainIndex)}_price_asc`, label: 'Price Asc' },
      ],
    }
  },
})
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Carousels</h3>

You can turn on sorts by going to [featuresConfig](./src/config/featuresConfig.js) and setting the `default` value of `shouldHaveCarousels` to true.

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveCarousels = atom({
  key: 'shouldHaveCarousels', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
```

Carousels are configured using [rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#using-context). You can configure your carousels by going to [carouselConfig](./src/config/carouselConfig.js) and adjusting the values for each `context`. You must ensure you have a rule in the algolia dashboard for each context, which pins products as this is what powers the carousels.

```
// config/carouselConfig
// ADJUST YOUR VALUES
export const carouselConfig = [
  {
    context: 'homepage-carousel-one',
  },
  {
    context: 'homepage-carousel-two',
  },
]
// Indicates how many records should be shown in an individual carousel
export const hitsPerCarousel = 8
```

You can find an example carousel rule by searching for `qr-1651497727816` in `rules/example-rules.json`.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Recommend</h3>

Use [FIG](https://github.com/algolia/fake-insights-generator) to generate the CSVs needed for Recommend, which you can then upload to the dashboard, and following this, enable FBT and Related in the appropriate config of this application.

We wrote a Gdoc to detail how use [FIG](https://github.com/algolia/fake-insights-generator). You can find it [here](https://docs.google.com/document/d/1T8ClZX5I06D-NpV9ZehFCXA_yx095cCFd7P2e3VeM5U/edit?usp=sharing).

Recommend is present in this app on the homepage, search results page, product details page, and also on the NoResultsPage.

Homepage: Trending products
Results Page: Trending products and trending facet values
PDP: Related and FBT
NRP: Related

You can turn on Recommend features by going to [featuresConfig](./src/config/featuresConfig.js).

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE

// Make sure you trained the models into the dashboards first
export const shouldHaveRelatedProducts = atom({
  key: 'shouldHaveRelatedProductsAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})

// Make sure you trained the models into the dashboards first
export const shouldHaveFbtProducts = atom({
  key: 'shouldHaveFbtProducts', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})

// Make sure you trained the models into the dashboards first
// this feature will be visible on home, results and category pages if activated -> (activated by default)
export const shouldHaveTrendingProducts = atom({
  key: 'shouldHaveTrendingProductsAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})

// Make sure you trained the models into the dashboards first
// this feature will be visible on home, results and category pages if activated -> (activated by default)
export const shouldHaveTrendingFacets = atom({
  key: 'shouldHaveTrendingFacetsAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Styling</h3>

You can adjust all of the styling of this application by adjusting anything found in the `scss` folder. It is recommended to start with the `mixin` folder.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Demo Guide</h3>

The demo guide is opened by clicking on the three dots in the top right of the application and serves to guide the user through the features available in the app.

It is all defined and adjusted in [demoGuideConfig](./src/config/demoGuideConfig.js) and is self described.

You can turn on the demo guide by going to [featuresConfig](./src/config/featuresConfig.js)

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveDemoGuide = atom({
  key: 'shouldHaveDemoGuide',
  default: true,
})
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 🧱 Algolia Explain</h3>

You will find this feature in the Demo Guide panel, toggle it on to activate it.

It will provide information about the rules currently being applied, the facet ordering applied, and any other behind the scenes information being returned by the API.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Languages</h3>

In order to turn on this feature, go to [featuresConfig](./src/config/featuresConfig.js) and set `shouldHaveLanguages` to true.

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveLanguages = atom({
  key: 'shouldHaveLanguages', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
```

Use it by making sure you have an index per language, and that the attribute names are always in the default language, but the values change in each index according to the local language.

Then, go to [languagesConfig](./src/config/languagesConfig.js) and adjust each export to what you need. Specifically, in `languageSwitchConfig` you must make sure each node has an `index` defined, and this index will be used when that language is selected.

Currently in :

- 🇬🇧 English
- 🇫🇷 French
- 🇩🇪 German
- 🇮🇹 Italian

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

You can turn on Banners by going to [featuresConfig](./src/config/featuresConfig.js).

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveInjectedBanners = atom({
  key: 'shouldHaveInjectedBanners',
  default: true,
})
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Segments</h3>

You can add segments to the application to represent algolia being told that the current user has certain characteristics. It is not 1:1 personalisation and would be fed in by an external system such as Dynamic Yield.

These "segments" are sent to Algolia as [optional filters](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/how-to-promote-with-optional-filters/), which are used to boost hits that match those filters.

Use this feature by adjusting [segmentConfig](./src/config/segmentConfig.js) and turn on or off this feature in [featuresConfig](./src/config/featuresConfig.js).

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveSegments = atom({
  key: 'shouldHaveSegments', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
```

```
// config/segmentConfig
export const segmentConfig = [
  {
    value: '',
    label: 'No Segment',
    labelFr: 'Pas de segment',
    labelGer: 'Kein abschnitt',
    type: 'segment',
  },
  {
    value: ['hierarchicalCategories.lvl0:Womens'],
    label: 'Female Segment',
    type: 'segment',
  },
  {
    value: ['hierarchicalCategories.lvl0:Mens'],
    label: 'Male Segment',
    type: 'segment',
  },
]
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Badges</h3>

You can dynamically add badges based on any condition for an attribute returned in a hit.

There are two examples already defined in [badgesConfig](./src/config/badgeConfig.js), please follow the same example by adjusting that file.

```
// /config/badgesConfig
// ADJUST YOUR VALUES
const criteriaConditionals = [
  {
    conditional: {
      // if the item is promoted by a rule
      attribute: '_rankingInfo.promoted',
      condition: true,
      badgeTitle: 'Pinned',
    },
  }]
```

When two triggers are matched, the one found first in the configuration array will be the one which is shown, more than one badge is not currently supported.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Facet Display</h3>

[Facet Display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/react/)

The ability to control the facets which get displayed including their order. When adding your facets inside this app via [refinementsConfig](./src/config/refinementsConfig.js), you _must_ ensure those facets are also added in the dashboard not just in the Facets section, but also in the Facet Display section, otherwise they will not show.

You can turn on Facet Display by going to [featuresConfig](./src/config/featuresConfig.js).

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveDynamicFacet = atom({
  key: 'shouldHaveDynamicFacet', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Category Pages</h3>

In order to configure Category Pages, go to [navigationConfig](./src/config/navigationConfig.js).

Edit the value for `categoryPageFilterAttribute`. This represents the attribute you will filter on to create your individual category pages.

```
// config/navigationConfig
// EDIT THE VALUE
export const categoryPageFilterAttribute = 'categories'
```

Then you can adjust the linksHeader atom. The value for `value` must match the value of the category you are filtering on to create the resulting page.

```
// config/navigationConfig
// EXAMPLE
export const linksHeader = atom({
  key: 'linksHeader', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      name: 'All',
      type: '',
      value: '',
    }
  ]
})
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 Collection Pages</h3>

In order to configure Collection Pages, go in [navigationConfig](./src/config/navigationConfig.js). From there you can add links to the Navigation tab. Collection pages are powered by rule contexts. In order for this to work, you must set the type to `context` and make sure that you have a rule set up in the Algolia dashboard matching the context trigger which you define as the value of `context`.

```
// config/navigationConfig
// EXAMPLE
export const linksHeader = atom({
  key: 'linksHeader', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      name: 'Accessories',
      type: 'context',
      value: 'accessories',
    },
  ]
})
```

You can find an example of a collection page rule by searching for `qr-1651145630794` in `rules/example-rules.json`.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👀 No Results Page</h3>

To have the best UI, we defined the no results page with 3 parts:

- First we just display the wrong query ex: yellow pant nike with an apologize message.
- Secondly we incorporate the query suggestions to help the customer on navigation behaviour.
- Third we stored, if the person already go on our website, his previous articles see. Them if he types a wrong query, we use Recommend and Related product with his last article seen, to create a carousel.

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;"> 👩‍💼🧑‍💼 Personas</h3>

[Personalization](https://www.algolia.com/doc/guides/personalization/what-is-personalization/)

To configure personalisation please first make sure you have the Personalization feature enabled on your plan, and that you have the correct strategy created. For example, if you want to boost colour: blue for a persona, you need to make sure that colour is in your strategy as a facet.

Then, you can visit [personaConfig](./src/config/personaConfig.js) and update the `value`s to match the user tokens you need to send, and update the personalizationFilters array to contain the attributes and values you want to boost for each persona. The `description` will also show up in the demo guide component.

```
// config/personaConfig
// EXAMPLE
export const personaConfig = [
  {
    value: 'anon',
    label: 'No Persona',
    labelFr: 'Pas de persona',
    labelGer: 'Keine persönlichkeit',
    description: 'Anonymous user',
    type: 'persona',
    personalizationFilters: [],
  }]
```

You can also adjust the personalizationImpact number in [personaConfig](./src/config/personaConfig.js) to control how much personalization applies to the results where personalization is turned on.

```
// config/personaConfig
// EXAMPLE
export const personalizationImpact = 98
```

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

For this we define a new index in [algoliaEnvConfig](./src/config/algoliaEnvConfig.js) called `injectedContentIndex` and if there is a result in this index, we inject it as a result into the Hits.

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

This project comes with react-icons free solid icons added by default

You can use an icon with the following syntax inside any component:

```
import { FaBeer } from 'react-icons/fa';
<h3> Lets go for a <FaBeer />? </h3>
```

You can find the names of the available icons here:
https://react-icons.github.io/react-icons/

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🛒 Cart</h3>

This project comes with Cart feature based on what you'll put into it and it stores in Local Storage to have always your cart. It's linked to event sending [Insights](https://www.algolia.com/doc/rest-api/insights/)

You can turn on the Cart feature by going to [featuresConfig](./src/config/featuresConfig.js)

```
// config/featuresConfig
// ADJUST YOUR VALUES TO TRUE OR FALSE
export const shouldHaveCartFunctionality = atom({
  key: 'shouldHaveCartFunctionality', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
```

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🔒 Okta</h3>

This project comes with Okta Log in feature based on okta react app [Okta-React-App](https://github.com/okta/okta-react)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">📈 QueryCategorization</h3>

This project comes with Query Categorization feature [Query Categorization](https://algolia.atlassian.net/wiki/spaces/GR/pages/3931537871/Query+Categorization)

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Dependencies</h2>

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">💻 State Manager</h3>

[Recoil](https://recoiljs.org/)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🚧 Router</h3>

[React Router](https://v5.reactrouter.com/web/guides/quick-start)

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🎚 Slider</h3>

[Slider](https://slider-react-component.vercel.app/)

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

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⭐️ Translation</h3>

We use the React library [React i18n](https://react.i18next.com/), to translate all the content code part like Button, Title,....
And you have the Select option to switch between the languages.
To start it's by default in english if you don't have any other language,you can just put false in the Translation Config option.

- You have to use this feature configure your others language index, and make sure you have the correct facet translation for example

1. First Step: Go into the translation file and configure languages expected by default you are in english. If no other language is expected let just english be the default, or modify the content.
2. Second Step: Define the content translated in each language.
3. Third Step: In the selector file don't forget to define the i18 language for example actually, we have only ger fr and en, but add for example jap for japanese :  
    case 'Japanese':
   ...
   i18n.changeLanguage('jap');

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">👊 Before use please install</h3>

[GitFlow](https://danielkummer.github.io/git-flow-cheatsheet/)

On Mac 👇

```sh
brew install git-flow-avh
git flow init
```

The repository is working around 3 branches :

- `main` branch, this branch is created for you to be able to fork the project with features turned off
- `develop` branch, this branch is our feature branch where we're adding new feature before pushing it into production
- `production`branch, this branch is our stable production branch

[Husky](https://typicode.github.io/husky/#/) 🐶

```sh
npx husky install
```

<h2 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">🤝 How to contribute</h2>

# Welcome to Algolia Boilerplate contributing guide

Thank you for investing your time in contributing to our project! Any contribution you make will be reflected on [Our documentation](https://boilerplate-docs.netlify.app/) :sparkles:.

Read our [Code of Conduct](../../codeOfConduct.md) to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## New contributor guide

To get an overview of the project, read the [README](./README.md) or [Our documentation](https://boilerplate-docs.netlify.app/). Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Getting started

### Issues

#### Create a new issue

If you spot a problem with the app or the docs, [please search if an issue already exists](https://github.com/algolia/algolia-react-boilerplate/issues). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/algolia/algolia-react-boilerplate/issues/new).

#### Solve an issue

Scan through our [existing issues](https://github.com/algolia/algolia-react-boilerplate/issues) to find one that interests you. You can narrow down the search using `labels` as filters. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make Changes

#### Make changes locally

1. Fork the repository.

- Using GitHub Desktop:

  - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
  - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

- Using the command line:
  - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

2. Install or update all the needed dependancies. You can do so by following our [Getting started Section](#️-get-started)

3. Create a working branch and start with your changes!

### Commit your update

Commit the changes once you are happy with them. Don't forget to fill in the [PR template](./pull_request_template.md)

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request. [PR template](./pull_request_template.md)
- Don't forget to [link PR to issue](https://github.com/algolia/algolia-react-boilerplate/issues) if you are solving one.
- We may ask for changes to be made before a PR can be merged, either using suggested changes or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as resolved
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: The Algolia Demo team thanks you :sparkles:.

Once your PR is merged, your contributions will be publicly visible on the [BP docs](https://boilerplate-docs.netlify.app/).

<h3 style="font-family='Helvetica'; font-size=15px; font-weight=bold; color=grey;">⛑️ Troubleshooting</h3>

If you encounter any issues while working with the Algolia React Boilerplate, the following troubleshooting guide may help you resolve them.

### Node.js version

One common issue is related to the Node.js version used by the project. The Algolia React Boilerplate requires Node.js version 14 or higher. To check the version of Node.js installed on your machine, run the following command in your terminal:

```
node -v
```

If your version is lower than 14, you can download the latest version from the [official Node.js website](https://nodejs.org/).

To update the Node.js version used by the project, you can use a version manager such as [nvm](https://github.com/nvm-sh/nvm). Once installed, you can run the following commands to install and use Node.js version 14:

```
nvm install 14
nvm use 14
```

### Other Issues

If you encounter other issues while working with the Algolia React Boilerplate, please check the [project's issues page](https://github.com/algolia/algolia-react-boilerplate/issues) to see if your issue has already been reported. If not, feel free to open a new issue with a detailed description of the problem and steps to reproduce it.

If you have any questions or need further assistance, please don't hesitate to reach out to our support team.

We appreciate your help in improving the Algolia React Boilerplate and making it a better tool for everyone.
