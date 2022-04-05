// ------------------------------------------
// Configuration for Sort By
// ------------------------------------------

import { indexNames } from './algoliaEnvConfig';

// This const defines the indices for sorts, please add or remove from the array as needed
// The values for each index use the prefix of the main index for convenience
export const sortBy = {
  value: true,
  labelIndex: [
    { value: indexNames.mainIndex, label: 'All' },
    { value: `${indexNames.mainIndex}_price_desc`, label: 'Price Desc' },
    { value: `${indexNames.mainIndex}_price_asc`, label: 'Price Asc' },
  ],
};
