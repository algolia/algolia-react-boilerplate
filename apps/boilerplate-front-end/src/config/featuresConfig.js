// ------------------------------------------
// Configuration for features, adjust the default value to turn them on or off
// ------------------------------------------

import { atom } from 'recoil'

// ------------------------------------------
// TODO: add perso and other features here including what to have on federated
// ------------------------------------------

export const shouldHaveQRCode = atom({
  key: 'shouldHaveQRCode',
  default: true,
})

// Should we show the demo guide in this demo
// Demo guide is here to help you demo your POC. Before turning the feature ON you can configure it in demoGuideConfig.js
export const shouldHaveDemoGuide = atom({
  key: 'shouldHaveDemoGuide',
  default: false,
})

// Should the segment selector be displayed on the screen
export const shouldHaveSegments = atom({
  key: 'shouldHaveSegments', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// Make sure to go into languageConfig.js to set everything up
// Should the language selector be displayed on the screen
export const shouldHaveLanguages = atom({
  key: 'shouldHaveLanguages', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// Make sure to create replicas in the dashboard
export const shouldHaveSorts = atom({
  key: 'shouldHaveSorts', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})

export const shouldHaveCarousels = atom({
  key: 'shouldHaveCarousels', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})

export const shouldHaveVoiceSearch = atom({
  key: 'shouldHaveVoiceSearch',
  default: true,
})

export const shouldHaveStats = atom({
  key: 'shouldHaveStats',
  default: true,
})

// Make sure you create a rule in the dahsboard before turn it on
export const shouldHaveInjectedBanners = atom({
  key: 'shouldHaveInjectedBanners',
  default: false,
})

// Make sure your sending event and create userToken before turn it on
// You can set up personas details in personaConfig.js
export const shouldHavePersona = atom({
  key: 'shouldHavePersona',
  default: false,
})

// Make sure you create the injected content in rules or through another index before turning this on, to avoid errors
// Please see https://github.com/algolia/algolia-react-boilerplate#--injected-content for more info on injected content
export const shouldHaveInjectedHits = atom({
  key: 'shouldHaveInjectedHits',
  default: false,
})

export const shouldHaveFederatedSearch = atom({
  key: 'shouldHaveFederatedSearch', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})

// RECOMMEND
// Make sure you trained the models into the dashboards first
export const shouldHaveRelatedProducts = atom({
  key: 'shouldHaveRelatedProductsAtom', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// RECOMMEND
// Make sure you trained the models into the dashboards first
export const shouldHaveFbtProducts = atom({
  key: 'shouldHaveFbtProducts', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// RECOMMEND
// Make sure you trained the models into the dashboards first
// this feature will be visible on home, results and category pages if activated -> (activated by default)
export const shouldHaveTrendingProducts = atom({
  key: 'shouldHaveTrendingProductsAtom', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// RECOMMEND
// Make sure you trained the models into the dashboards first
// this feature will be visible on home, results and category pages if activated -> (activated by default)
export const shouldHaveTrendingFacets = atom({
  key: 'shouldHaveTrendingFacetsAtom', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export const shouldHaveDynamicFacet = atom({
  key: 'shouldHaveDynamicFacet', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// Make sure to create a rule in the dashboard to make it work
export const shouldHaveRedirect = atom({
  key: 'shouldHaveRedirect', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export const shouldHaveCartFunctionality = atom({
  key: 'shouldHaveCartFunctionality', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
})
