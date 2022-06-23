// ------------------------------------------
// Configuration for features, adjust the default value to turn them on or off
// ------------------------------------------

import { atom } from 'recoil';

// ------------------------------------------
// TODO: add perso and other features here including what to have on federated
// ------------------------------------------

// Should the segment selector be displayed on the screen
export const shouldHaveSegments = atom({
  key: 'shouldHaveSegments', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

// Should the language selector be displayed on the screen
export const shouldHaveLanguages = atom({
  key: 'shouldHaveLanguages', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const shouldHaveSorts = atom({
  key: 'shouldHaveSorts', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const shouldHaveCarousels = atom({
  key: 'shouldHaveCarousels', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const shouldHaveVoiceSearch = atom({
  key: 'shouldHaveVoiceSearch',
  default: true,
});

export const shouldHaveStats = atom({
  key: 'shouldHaveStats',
  default: true,
});

export const shouldHaveInjectedBanners = atom({
  key: 'shouldHaveInjectedBanners',
  default: true,
});

export const shouldHavePersona = atom({
  key: 'shouldHavePersona',
  default: true,
});

// Make sure you create the injected content before turning this on, to avoid errors
// Please see https://github.com/algolia/algolia-react-boilerplate#--injected-content for more info on injected content
export const shouldHaveInjectedHits = atom({
  key: 'shouldHaveInjectedHits',
  default: true,
});

export const shouldHaveFederatedSearch = atom({
  key: 'shouldHaveFederatedSearch', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const shouldHaveRelatedProducts = atom({
  key: 'shouldHaveRelatedProductsAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const shouldHaveFbtProducts = atom({
  key: 'shouldHaveFbtProducts', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

// this feature will be visible on home, results and category pages if activated -> (activated by default)
export const shouldHaveTrendingProducts = atom({
  key: 'shouldHaveTrendingProductsAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

// this feature will be visible on home, results and category pages if activated -> (activated by default)
export const shouldHaveTrendingFacets = atom({
  key: 'shouldHaveTrendingFacetsAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const shouldHaveDynamicFacet = atom({
  key: 'shouldHaveDynamicFacet', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const shouldHaveRedirect = atom({
  key: 'shouldHaveRedirect', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});
