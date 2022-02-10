import {
  Layout,
  Shape,
} from '@algolia/react-instantsearch-widget-color-refinement-list';
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

const refinements = [
  {
    type: 'hierarchical',
    header: 'Categories',
    label: 'Category',
    isExpanded: true,
    options: {
      attributes: [
        'hierarchical_categories.lvl0',
        'hierarchical_categories.lvl1',
        'hierarchical_categories.lvl2',
      ],
    },
  },
  {
    type: 'price',
    header: 'Price',
    label: 'Price',
    options: {
      attribute: 'price.value',
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
    layout: Layout.Grid,
    shape: Shape.Circle,
    header: 'Color',
    label: 'Color',
    options: {
      attribute: 'color.filter_group',
    },
  },
  {
    type: 'list',
    header: 'Gender',
    label: 'Gender',
    options: {
      attribute: 'gender',
    },
  },
  {
    type: 'size',
    header: 'Sizes',
    label: 'Size',
    options: {
      attribute: 'available_sizes',
      limit: 8,
    },
  },
  {
    type: 'rating',
    header: 'Rating',
    label: 'Rating',
    options: {
      attribute: 'reviews.rating',
    },
  },
  {
    type: 'list',
    header: 'On Sale',
    label: 'On Sale',
    options: {
      attribute: 'price.on_sales',
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
  key: 'isFederatedVisible', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

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
};

export const configAtom = atom({
  key: 'configAtom', // unique ID (with respect to other atoms/selectors)
  default: config, // default value (aka initial value)
});
