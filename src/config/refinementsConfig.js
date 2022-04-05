// ------------------------------------------
// Configuration for refinements/facets
// ------------------------------------------

// Used in the price slider facet
import { currencySymbol } from './currencyConfig';

// This const defines the refinements to be shown
// There are five possible types: hierarchical, price, colour, size, list
// Generally you should use type list if you are adding a new facet here
export const refinements = [
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
    currency: currencySymbol,
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

// This const defines the labels used in price refinements
export const refinementPriceLabels = {
  moreThan: 'More than',
  lessThan: 'Less than',
};
