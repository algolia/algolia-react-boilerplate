import { atom } from 'recoil';

// ------------------------------------------
// Config Index and Search Client
// ------------------------------------------
export const searchClient = {
  APIKey: 'b5fcdde4a6fd2c831a2706fec93c48b7',
  appID: '853MYZ81KY',
};

export const indexName = {
  index: 'flagship_fashion',
  indexSuggestion: 'flagship_fashion_query_suggestions',
  indexBlog: 'canda_customDemo_articles',
};

// Ignore this, generated from indexConfig
export const indexNameAtom = atom({
  key: 'indexName',
  default: 'flagship_fashion',
});

export const indexInfluencer = {
  index: 'flagship_fashion_influencers',
};

// ------------------------------------------
// Config feature, change by true or false to remove them or change the value
// ------------------------------------------
const voiceSearch = {
  value: true,
};
const stats = {
  value: true,
};
const bannerSrp = {
  value: true,
};
const currency = {
  value: '$',
};

const injectedHits = {
  value: true,
};

export const isFederatedAtom = atom({
  key: 'isFederatedAtom', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

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
// Refinements
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
    type: 'color',
    header: 'Color',
    label: 'Color',
    options: {
      attribute: 'colour',
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

// ------------------------------------------
// Carousel Config
// ------------------------------------------

export const carouselConfig = [
  {
    attribute: "brand:'polo ralph lauren'",
    title: 'Ralph Lauren Products',
  },
  {
    attribute: "category:'pullover'",
    title: 'Our PullOver',
  },
];

// ------------------------------------------
// Sort By
// ------------------------------------------

const sortBy = {
  value: true,
  labelIndex: [
    { value: indexName.index, label: 'All' },
    { value: `${indexName.index}_price_desc`, label: 'Price Desc' },
    { value: `${indexName.index}_price_asc`, label: 'Price Asc' },
  ],
};

// This export is used for Category pages. It will create a filters in a Configure widget in SRP to filter out the right products
export const hierarchicalFacet = {
  hierarchicalLvl0: 'hierarchicalCategories.lvl0',
};

const federatedCategory = {
  categoryInFederated: 'hierarchicalCategories.lvl2',
};

// FEDERATED SEARCHES
const federatedSearchConfig = {
  isRecentSearch: true,
  isQuerySuggestions: true,
  isCategory: true,
  isProduct: true,
  isBlogPosts: true,
};

// ------------------------------------------
// Hits and Framer Motion
// ------------------------------------------
export const listItem = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
};

export const mainTransition = { delay: 0.1, duration: 0.6,  ease: [0.43, 0.13, 0.23, 0.96] }

export const pageItem = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  animate: { opacity: 1, },
  transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] },
}

export const federatedItem = {
  initial: { y: '-100%', opacity: 0 },
  exit: { y: "-100%", opacity: 0 },
  animate: { y:0, opacity: 1 },
  transition: {  duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
}
export const facetItem = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  animate: { opacity: 1, },
  transition: { delay: 0.2, duration: 1, ease: [0.43, 0.13, 0.23, 0.96] },
}

const config = {
  refinements,
  indexName,
  searchClient,
  federatedSearchConfig,
  federatedCategory,
  voiceSearch,
  stats,
  hitsPerPage,
  bannerSrp,
  currency,
  injectedHits,
  sortBy,
};

export const configAtom = atom({
  key: 'configAtom', // unique ID (with respect to other atoms/selectors)
  default: config, // default value (aka initial value)
});
