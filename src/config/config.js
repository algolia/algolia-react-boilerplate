import { atom } from 'recoil';

// ------------------------------------------
// Config feature, change by true or false to remove them or change the value
// ------------------------------------------
export const isVoiceSearch = atom({
  key: 'voiceSearch',
  default: true,
});

export const isStats = atom({
  key: 'stats',
  default: true,
});

export const isBannerSrp = atom({
  key: 'bannerSrp',
  default: true,
});

export const isInjectedHits = atom({
  key: 'injectedHits',
  default: true,
});

export const isFederatedAtom = atom({
  key: 'isFederatedAtom', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const isRelatedProducts = atom({
  key: 'isRelatedProductsAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const isFbtProducts = atom({
  key: 'isFbtProductsAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const currency = atom({
  key: 'currencyAtom', // unique ID (with respect to other atoms/selectors)
  default: '£', // default value (aka initial value)
});

// ------------------------------------------
// Federated Search Atoms
// ------------------------------------------

export const searchBoxAtom = atom({
  key: 'searchBoxAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const selectButtonAtom = atom({
  key: 'selectButtonAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const selectSortByIndex = atom({
  key: 'selectSortByIndexAtom', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});


// ------------------------------------------
// Category Pages
// ------------------------------------------

// This export is used for Category pages. It will create a filters in a Configure widget in SRP to filter out the right products
export const hierarchicalFacet = {
  hierarchicalLvl0: 'hierarchicalCategories.lvl0',
};


