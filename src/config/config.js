import { atom } from 'recoil';

// import { indexName } from "../utils/env";

export const searchClient = {
  APIKey: 'b5fcdde4a6fd2c831a2706fec93c48b7',
  appID: '853MYZ81KY',
};

export const indexName = {
  index: 'flagship_fashion',
};

const voiceSearch = {
  value: true,
};

const refinements = [
  {
    type: 'hierarchical',
    header: 'Categories',
    label: 'Category',
    options: {
      attribute: 'categories',
      searchable: true,
    },
  },
  {
    type: 'price',
    header: 'Price',
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

const breadcrumbAttributes = [
  'hierarchical_categories.lvl0',
  'hierarchical_categories.lvl1',
  'hierarchical_categories.lvl2',
];

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

const config = {
  refinements,
  sorts,
  breadcrumbAttributes,
  searchParameters,
  autocomplete,
  url,
  indexName,
  searchClient,
  voiceSearch,
};

export const configAtom = atom({
  key: 'configAtom', // unique ID (with respect to other atoms/selectors)
  default: config, // default value (aka initial value)
});
