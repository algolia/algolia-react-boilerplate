// ------------------------------------------
// Configuration for refinements/facets
// ------------------------------------------
import { atom } from 'recoil';
import { hitsConfig } from './hitsConfig';

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
        hitsConfig.hierarchicalCategoriesLvl0,
        hitsConfig.hierarchicalCategoriesLvl1,
        hitsConfig.hierarchicalCategoriesLvl2,
        hitsConfig.hierarchicalCategoriesLvl3,
      ],
      searchable: true,
    },
  },
  {
    type: 'price',
    header: 'Price',
    label: 'Price',
    options: {
      attribute: hitsConfig.price,
    },
  },
  {
    type: 'list',
    header: 'Brand',
    label: 'Brand',
    options: {
      attribute: hitsConfig.brand,
      searchable: true,
    },
  },
  {
    type: 'colour',
    header: 'Colour',
    label: 'Colour',
    options: {
      attribute: hitsConfig.colourHexa,
    },
  },
  {
    type: 'list',
    header: 'Gender',
    label: 'Gender',
    options: {
      attribute: hitsConfig.genderFilter,
    },
  },
  {
    type: 'size',
    header: 'Sizes',
    label: 'Size',
    options: {
      attribute: hitsConfig.sizeFilter,
      limit: 8,
    },
  },
];

// This const defines the labels used in price refinements
export const refinementPriceLabels = {
  moreThan: 'More than',
  lessThan: 'Less than',
};

// Please ignore this atom
export const currentRefinementsAtom = atom({
  key: 'currentRefinements', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const refineFunctionAtom = atom({
  key: 'refineFunction', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
