// ------------------------------------------
// Sort By Config
// ------------------------------------------

import { indexNames } from './algoliaEnvConfig';

export const sortBy = {
  value: true,
  labelIndex: [
    { value: indexNames.mainIndex, label: 'All' },
    { value: `${indexNames.mainIndex}_price_desc`, label: 'Price Desc' },
    { value: `${indexNames.mainIndex}_price_asc`, label: 'Price Asc' },
  ],
};
