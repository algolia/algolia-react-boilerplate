import { atom } from 'recoil';

export const simplePlaceholderAtom = atom({
  key: 'placeholderAtom', // unique ID (with respect to other atoms/selectors)
  default: 'Search...', // default value (aka initial value)
});

export const customPlaceholderAtom = atom({
  key: 'customplaceholderAtom', // unique ID (with respect to other atoms/selectors)
  default: 'Search', // default value (aka initial value)
});

export const queryAtom = atom({
  key: 'queryAtom', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

// This remove the "Search in [CATEGORY]" from the searchbox
export const SearchInCategoryConfig = {
  isSearchInCategory: true,
};
