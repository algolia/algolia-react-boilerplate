// ------------------------------------------
// Sort By Config
// ------------------------------------------

import { indexName } from './algoliaEnvConfig';

export const sortBy = {
  value: true,
  labelIndex: [
    { value: indexName.index, label: 'All' },
    { value: `${indexName.index}_price_desc`, label: 'Price Desc' },
    { value: `${indexName.index}_price_asc`, label: 'Price Asc' },
  ],
};
