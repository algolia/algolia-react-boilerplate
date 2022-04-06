// ------------------------------------------
// Configuration for features, adjust the default value to turn them on or off
// ------------------------------------------

import { atom } from 'recoil';

// ------------------------------------------
// TODO: add perso and other features here including what to have on federated
// ------------------------------------------

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

export const shouldHaveInjectedHits = atom({
  key: 'shouldHaveInjectedHits',
  default: true,
});

export const shouldHaveFederatedSearch = atom({
  key: 'shouldHaveFederatedSearch', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const shouldHaveRelatedProducts = atom({
  key: 'shouldHaveRelatedProductsAtom', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const shouldHaveFbtProducts = atom({
  key: 'shouldHaveFbtProducts', // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});
