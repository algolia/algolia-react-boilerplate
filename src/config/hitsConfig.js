import { atom } from 'recoil';

// Change string attribute here with the attribute of your index
export const hitsConfig = atom({
  key: 'hitsConfig', // unique ID (with respect to other atoms/selectors)
  default: {
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
    price: 'price',
    image: 'img_optimised',
    hierarchicalCategoriesLvl0: 'hierarchicalCategories.lvl0',
    hierarchicalCategoriesLvl1: 'hierarchicalCategories.lvl1',
    hierarchicalCategoriesLvl2: 'hierarchicalCategories.lvl2',
    hierarchicalCategoriesLvl3: 'hierarchicalCategories.lvl3',
    colourHexa: 'colour_hexa_v6',
  }, // default value (aka initial value)
});

//Content blog & articles

// Change string attribute here with the attribute of your index
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
  }, // default value (aka initial value)
});

// Choose number of hit the app should display.
export const hitsPerPage = {
  numberNotInjected: 15,
  numberInjected: 14,
};

export const hitsAtom = atom({
  key: 'hitsAtom', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const hitAtom = atom({
  key: 'hitAtom', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});
