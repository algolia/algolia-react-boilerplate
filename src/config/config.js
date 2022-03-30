import { atom } from 'recoil';

import { indexName } from './algoliaEnvConfig';

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
// Refinements Config
// ------------------------------------------

const refinements = [
  {
    type: 'hierarchical',
    header: 'Categories',
    label: 'Category',
    options: {
      attribute: [
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2',
        'hierarchicalCategories.lvl3',
      ],
      searchable: true,
    },
  },
  {
    type: 'price',
    header: 'Price',
    currency: '$',
    label: 'Price',
    options: {
      attribute: 'unformated_price',
    },
  },
  {
    type: 'list',
    header: 'Brand',
    label: 'Brand',
    options: {
      attribute: 'brand',
      searchable: true,
    },
  },
  {
    type: 'colour',
    header: 'Colour',
    label: 'Colour',
    options: {
      attribute: 'colour_hexa_v6',
    },
  },
  {
    type: 'list',
    header: 'Gender',
    label: 'Gender',
    options: {
      attribute: 'genderFilter',
    },
  },
  {
    type: 'size',
    header: 'Sizes',
    label: 'Size',
    options: {
      attribute: 'sizeFilter',
      limit: 8,
    },
  },
];

const hitsPerPage = {
  numberNotInjected: 15,
  numberInjected: 14,
};

const refinementPrice = {
  moreThan: 'More than',
  lessThan: 'Less than',
};

// ------------------------------------------
// Sort By Config
// ------------------------------------------

const sortBy = {
  value: true,
  labelIndex: [
    { value: indexName.index, label: 'All' },
    { value: `${indexName.index}_price_desc`, label: 'Price Desc' },
    { value: `${indexName.index}_price_asc`, label: 'Price Asc' },
  ],
};

// ------------------------------------------
// Category Pages
// ------------------------------------------

// This export is used for Category pages. It will create a filters in a Configure widget in SRP to filter out the right products
export const hierarchicalFacet = {
  hierarchicalLvl0: 'hierarchicalCategories.lvl0',
};

const config = {
  refinements,
  hitsPerPage,
  sortBy,
  refinementPrice,
};

export const configAtom = atom({
  key: 'configAtom', // unique ID (with respect to other atoms/selectors)
  default: config, // default value (aka initial value)
});
