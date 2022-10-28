// ------------------------------------------
// Configuration for results and individual hits
// Holds both content results and product results
// ------------------------------------------

import { atom } from 'recoil'

// ------------------------------------------
// This const defines a map of attributes used in the app to the names of the attributes in your own index
// Please change only the values in this const i.e. the strings on the right of the semi-colons
// If you do not have an attribute in your data please do not remove it from here, contact #help-demos
// ------------------------------------------
export const hitsConfig = {
  objectID: 'objectID',
  productName: 'name',
  brand: 'brand',
  category: 'category',
  reviewScore: 'reviewScore',
  reviewCount: 'reviewCount',
  categories: 'categories',
  colour: 'colour',
  genderFilter: 'genderFilter',
  hierarchicalCategories: 'hierarchicalCategories',
  sizeFilter: 'sizeFilter',
  price: 'unformated_price',
  onSale: 'onSale',
  onSalePrice: 'onSalePrice',
  image: 'img_optimised',
  imageAlt: 'imageAlt',
  hierarchicalCategoriesLvl0: 'hierarchicalCategories.lvl0',
  hierarchicalCategoriesLvl1: 'hierarchicalCategories.lvl1',
  hierarchicalCategoriesLvl2: 'hierarchicalCategories.lvl2',
  hierarchicalCategoriesLvl3: 'hierarchicalCategories.lvl3',
  colourHexa: 'colour_hexa_v6',
}

// ------------------------------------------
// This const defines what parts of a hit you want to show on the PDP or not
// ------------------------------------------
export const PDPHitSections = {
  price: true,
  productName: true,
  brand: true,
  sizeFilter: false,
  colour: true,
}

// Similar structure to previous const, please do not remove if you don't use articles
export const contentArticlesConfig = atom({
  key: 'contentArticlesConfig', // unique ID (with respect to other atoms/selectors)
  default: {
    objectID: 'objectID',
    title: 'Title',
    headings: 'Subtitle',
    content: 'content',
    date: 'Date',
    description: 'description',
    image: 'Image Link',
  },
})

// Choose number of records the app should display per results page
export const hitsPerPage = {
  numberNotInjected: 15,
  numberInjected: 14,
}

// Please ignore this atom
export const hitAtom = atom({
  key: 'hitAtom', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
})

// Please ignore this atom
export const hitsNumber = atom({
  key: 'hitsNumber', // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
})
// Please ignore this atom
export const setNbHitsAtom = atom({
  key: 'setNbHitsAtom', // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
})
