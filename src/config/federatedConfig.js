// ------------------------------------------
// Configuration for the federated search modal
// ------------------------------------------
import { atom } from 'recoil';

// This const defines the attribute used to show category suggestions if turned on
export const federatedCategoriesAttribute = 'hierarchicalCategories.lvl2';

// This const defines what sections should be shown in federated search or not
// Adjust each value to true or false depending on what you wish to show
export const federatedSearchConfig = {
  showRecentSearches: true,
  showQuerySuggestions: false,
  showCategories: true,
  showProducts: true,
  showBlogPosts: true,
};

export const shouldHaveOpenFederatedSearch = atom({
  key: 'shouldHaveOpenFederatedSearch', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
