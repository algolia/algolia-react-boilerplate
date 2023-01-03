// ------------------------------------------
// Configuration for the header
// ------------------------------------------
import { atom } from 'recoil'

// ------------------------------------------
// This exported attribute name is used to generate results for Category pages
// It will create a filter which will be used when a category page link is clicked on
// Please refer to linksHeader to define the category page values which will be filtered
// ------------------------------------------
export const categoryPageFilterAttribute = 'categories'

// ------------------------------------------
// This exported attribute is used to detect whether the filter is hierarchical or not
// It will use a virtual hierarchicalMenu or a virtual refinementList depending on the value
// ------------------------------------------
export const isHierarchicalFilterAttribute = true

// ------------------------------------------
// This const defines the navigation aspect of the header
// The name is for display purposes for each navigation title
// The value is the value to value on to show results for the linked category page
// You can have three values for the type: category, filter and context
// category will apply a filter on the categoryPageFilterAttribute
// filter will apply a filter using the value directly against the API
// https://www.algolia.com/doc/api-reference/api-parameters/filters/?client=javascript
// context will be applied as a ruleContext directly against the API
// ------------------------------------------
export const linksHeader = atom({
  key: 'linksHeader', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      name: 'All',
      type: '',
      value: '',
    },
    {
      name: 'Mens',
      type: 'category',
      value: 'Mens',
    },
    {
      name: 'Womens',
      type: 'category',
      value: 'Womens',
    },
    // For an uilisation of your own made filter
    {
      name: 'Womens accessories by Even & Odd',
      type: 'filter',
      value:
        "hierarchicalCategories.lvl0:'Womens' AND hierarchicalCategories.lvl1:'Womens > Accessories' AND brand:'even&odd'",
    },
    // This uses context from the Algolia dashboard, configured using Visual Editor
    {
      name: 'Accessories',
      type: 'context',
      value: 'accessories',
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
