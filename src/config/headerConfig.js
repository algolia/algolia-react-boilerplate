// ------------------------------------------
// Configuration for the header
// ------------------------------------------
import { atom } from 'recoil';

// This const defines the logo shown on the header
export const logoUrl = 'https://zupimages.net/up/22/13/jv0t.png';

// ------------------------------------------
// This const defines the navigation aspect of the header
// The name is for display purposes for each navigation title
// The filter is the value to filter on to show results for the linked category page
// The filter value should directly correspond to the attribute you're filtering on
// See categoryConfig to define the attribute matching these values correctly
// The url should be the lower case URL friendly version of the filter value
// ------------------------------------------
export const linksHeader = atom({
  key: 'linksHeader', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      name: 'All',
      filter: '',
      url: '/search',
    },
    {
      name: 'Mens',
      filter: 'Mens',
      url: '/mens',
    },
    {
      name: 'Womens',
      filter: 'Womens',
      url: '/womens',
    },
  {
      name: 'Home',
      type: 'filter',
      filter: 'Home',
      url: '/home',
    },
    {
      name: 'Summer 22 Collection',
      type: 'context',
      context: 'summer-22-collection',
      url: '/summer-22-collection',
    },
  ],
});

export const selectorNavigationRef = atom({
  key: 'selectorNavigationRef', // unique ID (with respect to other atoms/selectors)
  default: '',
})