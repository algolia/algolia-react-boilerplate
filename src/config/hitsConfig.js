// ------------------------------------------
// Configuration for results and individual hits
// Holds both content results and product results
// ------------------------------------------

import { atom } from 'recoil';

// ------------------------------------------
// This const defines a map of attributes used in the app to the names of the attributes in your own index
// Please change only the values in this const i.e. the strings on the right of the semi-colons
// If you do not have an attribute in your data please do not remove it from here, contact #help-demos
// ------------------------------------------
export const hitsConfig = {
  objectID: 'objectID',
  productName: 'title',
  brand: 'brand',
  category: 'hierarchical_categories.lvl1',
  reviewScore: 'reviewScore',
  reviewCount: 'reviewCount',
  categories: 'categories',
  colour: 'color',
  genderFilter: 'gender',
  hierarchicalCategories: 'hierarchical_categories.lvl0',
  sizeFilter: 'size',
  price: 'unformated_price',
  unformated_price: 'unformated_price',
  onSale: '',
  onSalePrice: '',
  image: 'image_link1',
  imageAlt: 'image_link2',
  hierarchicalCategoriesLvl0: 'hierarchical_categories.lvl0',
  hierarchicalCategoriesLvl1: 'hierarchical_categories.lvl1',
  hierarchicalCategoriesLvl2: 'hierarchical_categories.lvl2',
  hierarchicalCategoriesLvl3: '',
  colourHexa: '',
};

// ------------------------------------------
// This const defines what parts of a hit you want to show on the PDP or not
// ------------------------------------------
export const PDPHitSections = {
  price: true,
  productName: true,
  brand: true,
  sizeFilter: false,
  colour: true,
};

// Similar structure to previous const, please do not remove if you don't use articles
export const contentArticlesConfig = atom({
  key: 'contentArticlesConfig', // unique ID (with respect to other atoms/selectors)
  default: {
    objectID: 'objectID',
    title: 'title',
    headings: 'subtitle',
    content: '',
    date: '',
    description: '',
    image: 'image',
  },
});

// Choose number of records the app should display per results page
export const hitsPerPage = {
  numberNotInjected: 15,
  numberInjected: 14,
};

// Please ignore this atom
export const hitsAtom = atom({
  key: 'hitsAtom', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

// Please ignore this atom
export const hitAtom = atom({
  key: 'hitAtom', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

// Please ignore this atom
export const hitsNumber = atom({
  key: 'hitsNumber', // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});
