// ------------------------------------------
// Configuration for the header
// ------------------------------------------
import { atom } from 'recoil'

// ------------------------------------------
// This exported attribute name is used to generate results for Category pages
// It will create a filter which will be used when a category page link is clicked on
// Please refer to linksHeader to define the category page values which will be filtered
// ------------------------------------------
export const categoryPageFilterAttribute = 'hierarchicalCategories.lvl0'

// ------------------------------------------
// This const defines the navigation aspect of the header
// The name is for display purposes for each navigation title
// The filter is the value to filter on to show results for the linked category page
// Please use rawFilter type and rawFilter attribute to pass your own filters directly to the API
// https://www.algolia.com/doc/api-reference/api-parameters/filters/?client=javascript
// ------------------------------------------
export const linksHeader = atom({
  key: 'linksHeader', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      name: 'All',
      type: 'filter',
      filter: '',
    },
    {
      name: 'Mens',
      type: 'filter',
      filter: 'Mens',
    },
    {
      name: 'Womens',
      type: 'filter',
      filter: 'Womens',
    },
    // For an uilisation of your own made filter
    {
      name: 'Womens accessories by Even & Odd',
      type: 'rawFilter',
      filter: '',
      rawFilter:
        "hierarchicalCategories.lvl0:'Womens' AND hierarchicalCategories.lvl1:'Womens > Accessories' AND brand:'even&odd'",
    },
    // This uses context from the Algolia dashboard, configured using Visual Editor
    {
      name: 'Accessories',
      type: 'context',
      context: 'accessories',
    },
  ],
})

export const selectorNavigationRef = atom({
  key: 'selectorNavigationRef', // unique ID (with respect to other atoms/selectors)
  default: '',
})

export const categorySelectionAtom = atom({
  key: 'categorySelectionAtom',
  default: null,
})

export const navigationStateAtom = atom({
  key: 'navigationStateAtom',
  default: {},
})
