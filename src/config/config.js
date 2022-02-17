import { atom } from 'recoil';

// import { indexName } from "../utils/env";

export const searchClient = {
  APIKey: 'b5fcdde4a6fd2c831a2706fec93c48b7',
  appID: '853MYZ81KY',
};

export const indexName = {
  index: 'flagship_fashion',
  indexSuggestion: 'flagship_fashion_query_suggestions',
  indexBlog: 'canda_customDemo_articles',
};

export const indexInfluencer = {
  index: 'flagship_fashion_influencers',
};

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

const sorts = [
  { value: indexName, label: 'Most popular', isDefault: true },
  {
    value: `${indexName}_asc_price`,
    label: 'Price Low to High (Traditional Sort)',
  },
  {
    value: `${indexName}_asc_price_virtual_replica`,
    label: 'Price Low to High (Relevant Sort)',
  },
  { value: `${indexName}_desc_price`, label: 'Price High to Low' },
];

const hitsPerPage = {
  numberNotInjected: 15,
  numberInjected: 14,
};

const breadcrumbAttributes = [
  'hierarchical_categories.lvl0',
  'hierarchical_categories.lvl1',
  'hierarchical_categories.lvl2',
];

// This export is used for Category pages. It will create a filters in a Configure widget in SRP to filter out the right products
export const hierarchicalFacet = {
  hierarchicalLvl0: 'hierarchicalCategories.lvl0',
};

const federatedCategory = {
  categoryInFederated: 'hierarchicalCategories.lvl2',
};

const searchParameters = {
  hitsPerPage: 10,
  maxValuesPerFacet: 50,
  attributesToSnippet: ['description:30'],
  snippetEllipsisText: '…',
  analytics: true,
  clickAnalytics: true,
};

const autocomplete = {
  placeholders: ['products', 'articles', 'faq'],
  debouncing: 800, // in ms
  detachedMediaQuery: '(max-width: 1439px)',
};

const url = {
  debouncing: 1500, // in ms
};

// FEDERATED SEARCHES
const federatedSearchConfig = {
  isRecentSearch: true,
  isQuerySuggestions: true,
  isCategory: true,
  isProduct: true,
  isBlogPosts: true,
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

// Hits and Framer Motion
export const listItem = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay: 0.2 },
};

const config = {
  refinements,
  sorts,
  breadcrumbAttributes,
  searchParameters,
  autocomplete,
  url,
  indexName,
  searchClient,
  federatedSearchConfig,
  federatedCategory,
  voiceSearch,
  stats,
  hitsPerPage,
  bannerSrp,
  currency,
};

export const configAtom = atom({
  key: 'configAtom', // unique ID (with respect to other atoms/selectors)
  default: config, // default value (aka initial value)
});
